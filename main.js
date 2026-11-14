// Rift Counter – Electron Hauptprozess
// - lädt offizielle Riot Data-Dragon-Daten (Champions, Items, Runen) und cached sie lokal
// - verbindet sich optional mit dem laufenden League-Client (LCU), um den Champ-Select zu erkennen
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { execFile } = require('child_process');

const DDRAGON = 'https://ddragon.leagueoflegends.com';
let win = null;

function cacheDir() {
  const dir = path.join(app.getPath('userData'), 'ddragon-cache');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'RiftCounter-Desktop' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} für ${url}`);
  return res.json();
}

// Holt die aktuelle Patch-Version, fällt offline auf die zuletzt gecachte zurück.
async function getVersion() {
  const metaFile = path.join(cacheDir(), 'version.json');
  try {
    const versions = await fetchJson(`${DDRAGON}/api/versions.json`);
    fs.writeFileSync(metaFile, JSON.stringify({ version: versions[0] }));
    return { version: versions[0], offline: false };
  } catch (e) {
    if (fs.existsSync(metaFile)) {
      return { version: JSON.parse(fs.readFileSync(metaFile, 'utf8')).version, offline: true };
    }
    throw new Error('Keine Internetverbindung und kein Cache vorhanden.');
  }
}

async function getDDragonFile(version, locale, file) {
  const safe = `${version}_${locale}_${file}`.replace(/[^a-zA-Z0-9._-]/g, '_');
  const cached = path.join(cacheDir(), safe);
  if (fs.existsSync(cached)) return JSON.parse(fs.readFileSync(cached, 'utf8'));
  const data = await fetchJson(`${DDRAGON}/cdn/${version}/data/${locale}/${file}`);
  fs.writeFileSync(cached, JSON.stringify(data));
  return data;
}

ipcMain.handle('ddragon:load', async () => {
  const { version, offline } = await getVersion();
  const [champions, itemsDe, itemsEn, runes, summoners] = await Promise.all([
    getDDragonFile(version, 'de_DE', 'champion.json'),
    getDDragonFile(version, 'de_DE', 'item.json'),
    getDDragonFile(version, 'en_US', 'item.json'),
    getDDragonFile(version, 'de_DE', 'runesReforged.json'),
    getDDragonFile(version, 'de_DE', 'summoner.json'),
  ]);
  return { version, offline, champions, itemsDe, itemsEn, runes, summoners };
});

ipcMain.handle('open:external', (_e, url) => {
  if (typeof url === 'string' && /^https:\/\/(u\.gg|www\.op\.gg|op\.gg|lolalytics\.com)\//.test(url)) {
    shell.openExternal(url);
  }
});

// ---------------------------------------------------------------------------
// League Client (LCU) – Champ-Select-Erkennung
// ---------------------------------------------------------------------------
const LOCKFILE_PATHS = [
  'C:\\Riot Games\\League of Legends\\lockfile',
  'D:\\Riot Games\\League of Legends\\lockfile',
  'E:\\Riot Games\\League of Legends\\lockfile',
  'C:\\Program Files\\Riot Games\\League of Legends\\lockfile',
  '/Applications/League of Legends.app/Contents/LoL/lockfile',
];

function readLockfile() {
  for (const p of LOCKFILE_PATHS) {
    try {
      if (fs.existsSync(p)) {
        const [, , port, password, protocol] = fs.readFileSync(p, 'utf8').split(':');
        return { port, password, protocol };
      }
    } catch { /* ignorieren */ }
  }
  return null;
}

// Fallback für abweichende Installationspfade: Port/Token aus der Prozess-Kommandozeile lesen.
function readFromProcess() {
  return new Promise((resolve) => {
    if (process.platform !== 'win32') return resolve(null);
    execFile('powershell.exe', ['-NoProfile', '-Command',
      "Get-CimInstance Win32_Process -Filter \"name='LeagueClientUx.exe'\" | Select-Object -ExpandProperty CommandLine"],
      { windowsHide: true, timeout: 5000 }, (err, stdout) => {
        if (err || !stdout) return resolve(null);
        const port = /--app-port=(\d+)/.exec(stdout);
        const token = /--remoting-auth-token=([\w-]+)/.exec(stdout);
        resolve(port && token ? { port: port[1], password: token[1], protocol: 'https' } : null);
      });
  });
}

let lcuCreds = null;
let lcuTimer = null;
let lastPayload = '';

function lcuGet(creds, endpoint) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      host: '127.0.0.1',
      port: creds.port,
      path: endpoint,
      method: 'GET',
      rejectUnauthorized: false, // Der lokale Client nutzt ein selbstsigniertes Riot-Zertifikat
      headers: { Authorization: 'Basic ' + Buffer.from(`riot:${creds.password}`).toString('base64') },
      timeout: 3000,
    }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        if (res.statusCode === 404) return resolve(null);
        try { resolve(JSON.parse(body)); } catch { resolve(null); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.end();
  });
}

function send(payload) {
  const s = JSON.stringify(payload);
  if (s === lastPayload || !win) return;
  lastPayload = s;
  win.webContents.send('lcu:update', payload);
}

async function pollLcu() {
  try {
    if (!lcuCreds) lcuCreds = readLockfile() || (await readFromProcess());
    if (!lcuCreds) return send({ status: 'no-client' });
    const session = await lcuGet(lcuCreds, '/lol-champ-select/v1/session');
    if (!session || !session.myTeam) return send({ status: 'connected' });
    const me = session.myTeam.find((p) => p.cellId === session.localPlayerCellId) || {};
    const pick = (p) => p.championId || p.championPickIntent || 0;
    send({
      status: 'champ-select',
      myChampionId: pick(me),
      myPosition: me.assignedPosition || '',
      allies: session.myTeam.filter((p) => p !== me).map(pick).filter(Boolean),
      enemies: (session.theirTeam || []).map((p) => p.championId).filter(Boolean),
    });
  } catch {
    lcuCreds = null; // Client wurde geschlossen oder neu gestartet
    send({ status: 'no-client' });
  }
}

ipcMain.handle('lcu:enable', (_e, enabled) => {
  clearInterval(lcuTimer);
  lcuTimer = null;
  lastPayload = '';
  if (enabled) {
    pollLcu();
    lcuTimer = setInterval(pollLcu, 2000);
  } else {
    send({ status: 'off' });
  }
});

function createWindow() {
  win = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1000,
    minHeight: 640,
    backgroundColor: '#0a0e17',
    title: 'Rift Counter',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  win.loadFile(path.join(__dirname, 'src', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
