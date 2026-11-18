/* Rift Counter – Renderer */
'use strict';

const CDN = 'https://ddragon.leagueoflegends.com/cdn';
const ROLES = [
  ['top', 'Top'], ['jungle', 'Jungle'], ['mid', 'Mid'], ['adc', 'ADC'], ['support', 'Support'],
];
const ROLE_NAME = Object.fromEntries(ROLES);
const LCU_POS = { top: 'top', jungle: 'jungle', middle: 'mid', bottom: 'adc', utility: 'support' };
const SUPPORT_QUEST_ITEMS = new Set(['Dream Maker', 'Celestial Opposition', "Zaz'Zak's Realmspike", 'Bloodsong', 'Solstice Sleigh', 'World Atlas']);

const S = {
  version: '',
  champs: {},     // id -> Data-Dragon-Champion
  byKey: {},      // numerischer Key -> id
  db: {},         // id -> kuratierte Daten
  itemIdByName: {},
  itemsDe: {},
  runes: [],
  spells: {},
  current: null,
  currentRole: null,
  matchEnemy: null,
  roleFilter: 'all',
  finderEnemy: null,
  finderRole: 'top',
  lcu: null,
};

const $ = (sel, el = document) => el.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const strip = (html) => String(html || '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/\n{2,}/g, '\n').trim();
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* egal */ } },
};

// ---------------------------------------------------------------------------
// Daten laden
// ---------------------------------------------------------------------------
async function loadData() {
  if (window.api && window.api.loadData) return window.api.loadData();
  // Fallback: direkt im Browser (z. B. zum Testen ohne Electron)
  const versions = await (await fetch('https://ddragon.leagueoflegends.com/api/versions.json')).json();
  const v = versions[0];
  const get = (loc, f) => fetch(`${CDN}/${v}/data/${loc}/${f}`).then((r) => r.json());
  const [champions, itemsDe, itemsEn, runes, summoners] = await Promise.all([
    get('de_DE', 'champion.json'), get('de_DE', 'item.json'), get('en_US', 'item.json'),
    get('de_DE', 'runesReforged.json'), get('de_DE', 'summoner.json'),
  ]);
  return { version: v, offline: false, champions, itemsDe, itemsEn, runes, summoners };
}

function parseTable() {
  const db = {};
  for (const line of window.CHAMPION_TABLE.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const [id, roles, arch, counters, strong, keystone, core, boots] = t.split('|');
    const list = (s) => (s ? s.split(',').map((x) => x.trim()).filter(Boolean) : []);
    db[id] = {
      roles: list(roles), arch, counters: list(counters), strong: list(strong),
      keystone: keystone || null, core: core ? list(core) : null, boots: boots || null, curated: true,
    };
  }
  return db;
}

// Für neue Champions ohne kuratierte Daten: Archetyp/Lane aus Riot-Tags ableiten
function guessEntry(c) {
  const tags = c.tags || [];
  const magic = (c.info?.magic || 0) > (c.info?.attack || 0);
  let arch = 'bruiser', roles = ['top'];
  if (tags[0] === 'Marksman') { arch = 'marksman_crit'; roles = ['adc']; }
  else if (tags[0] === 'Support') { arch = magic ? 'enchanter' : 'engage_support'; roles = ['support']; }
  else if (tags[0] === 'Mage') { arch = 'ap_burst'; roles = ['mid']; }
  else if (tags[0] === 'Assassin') { arch = magic ? 'ap_assassin' : 'lethality'; roles = ['mid']; }
  else if (tags[0] === 'Tank') { arch = 'tank'; roles = ['top']; }
  else if (magic) { arch = 'ap_bruiser'; }
  return { roles, arch, counters: [], strong: [], keystone: null, core: null, boots: null, curated: false };
}

function indexItems(itemsEn, itemsDe) {
  const map = {};
  for (const [id, it] of Object.entries(itemsEn.data)) {
    if (it.maps && it.maps['11'] === false) continue;
    if (it.requiredAlly || it.requiredChampion) continue;
    const key = it.name.toLowerCase();
    if (!map[key] || Number(id) < Number(map[key])) map[key] = id;
  }
  S.itemIdByName = map;
  S.itemsDe = itemsDe.data;
}

async function init() {
  setupStaticUi();
  let data;
  try {
    data = await loadData();
  } catch (e) {
    $('#patch').textContent = 'Fehler beim Laden';
    $('#champEmpty').innerHTML = `<h2>Daten konnten nicht geladen werden</h2><p>${esc(e.message || e)}</p><p>Beim ersten Start wird eine Internetverbindung benötigt.</p>`;
    return;
  }
  S.version = data.version;
  S.champs = data.champions.data;
  for (const c of Object.values(S.champs)) S.byKey[c.key] = c.id;
  const table = parseTable();
  for (const id of Object.keys(S.champs)) S.db[id] = table[id] || guessEntry(S.champs[id]);
  indexItems(data.itemsEn, data.itemsDe);
  S.runes = data.runes;
  S.spells = data.summoners.data;
  $('#patch').textContent = `Patch ${data.version}${data.offline ? ' · offline (Cache)' : ''}`;
  renderGrid();
  renderFinder();
  setupManualCs();
  setupLcu();
  const last = store.get('lastChamp', null);
  if (last && S.champs[last]) openChampion(last);
  else if (isMobile()) setListOpen(true);
}

// ---------------------------------------------------------------------------
// Helfer für Bilder / Namen
// ---------------------------------------------------------------------------
const champName = (id) => S.champs[id]?.name || id;
const champImg = (id) => (S.champs[id] ? `${CDN}/${S.version}/img/champion/${S.champs[id].image.full}` : '');
const exists = (id) => !!S.champs[id];

function itemHtml(name) {
  const id = S.itemIdByName[name.toLowerCase()];
  const it = id && S.itemsDe[id];
  if (!it) return `<div class="item missing" data-tip-title="${esc(name)}">${esc(name)}</div>`;
  return `<div class="item" data-item="${id}"><img src="${CDN}/${S.version}/img/item/${id}.png" alt="${esc(it.name)}" loading="lazy"></div>`;
}
const itemsHtml = (names, sep = '') => names.map(itemHtml).join(sep);

function findRune(key) {
  for (const tree of S.runes) {
    if (tree.key === key) return { tree, rune: null };
    for (const slot of tree.slots) for (const r of slot.runes) if (r.key === key) return { tree, rune: r };
  }
  return null;
}
function spellHtml(id) {
  const sp = S.spells[id];
  if (!sp) return '';
  return `<div class="item" data-spell="${id}"><img src="${CDN}/${S.version}/img/spell/${sp.image.full}" alt="${esc(sp.name)}"></div>`;
}

// ---------------------------------------------------------------------------
// Counter-Logik
// ---------------------------------------------------------------------------
// Wer countert "id"? (explizit + Rückschluss aus "countert selbst" der anderen)
function countersOf(id) {
  const res = new Map();
  (S.db[id]?.counters || []).forEach((c, i) => exists(c) && res.set(c, (res.get(c) || 0) + 3 - i * 0.2));
  for (const [other, d] of Object.entries(S.db)) {
    if (other !== id && d.strong.includes(id)) res.set(other, (res.get(other) || 0) + 1.5);
  }
  return res;
}
// Wen countert "id"?
function strongVs(id) {
  const res = new Map();
  (S.db[id]?.strong || []).forEach((c, i) => exists(c) && res.set(c, (res.get(c) || 0) + 3 - i * 0.2));
  for (const [other, d] of Object.entries(S.db)) {
    if (other !== id && d.counters.includes(id)) res.set(other, (res.get(other) || 0) + 1.5);
  }
  return res;
}
function sortedByRole(map, role) {
  let arr = [...map.entries()].sort((a, b) => b[1] - a[1]);
  if (role) {
    const inLane = arr.filter(([c]) => S.db[c]?.roles.includes(role));
    if (inLane.length >= 3) arr = inLane;
  }
  return arr;
}
// > 0 = Vorteil für "me"
function matchupScore(me, enemy) {
  const a = S.db[me], b = S.db[enemy];
  let s = 0;
  if (a.strong.includes(enemy)) s += 2;
  if (b.counters.includes(me)) s += 2;
  if (a.counters.includes(enemy)) s -= 2;
  if (b.strong.includes(me)) s -= 2;
  return s;
}
function verdict(score) {
  if (score >= 2) return { cls: 'good', text: score >= 4 ? 'Starker Vorteil' : 'Vorteil' };
  if (score <= -2) return { cls: 'bad', text: score <= -4 ? 'Schweres Matchup' : 'Nachteil' };
  return { cls: 'mid', text: 'Ausgeglichen' };
}
// ---------------------------------------------------------------------------
// Team-Score: wie gut passt ein Champion gegen das ganze Gegnerteam?
// ---------------------------------------------------------------------------
const GROUP = {
  lethality: 'assassin', ap_assassin: 'assassin',
  tank: 'tank', engage_support: 'tank',
  bruiser: 'fighter', duelist: 'fighter', crit_fighter: 'fighter', ap_bruiser: 'fighter',
  ap_control: 'squishy', ap_dps: 'squishy', ap_burst: 'squishy', ap_onhit: 'squishy',
  marksman_crit: 'squishy', marksman_onhit: 'squishy', marksman_spell: 'squishy', enchanter: 'squishy',
};
const MARKSMEN = new Set(['marksman_crit', 'marksman_onhit', 'marksman_spell']);
// Wie stark Archetyp a Archetyp b "schlägt" (nur positive Vorteile, wird unten gegeneinander verrechnet)
function archBeats(a, b) {
  const ga = GROUP[a], gb = GROUP[b];
  let v = 0;
  if (ga === 'assassin' && gb === 'squishy') v += 1;                       // Assassinen töten Squishies
  if (ga === 'tank' && gb === 'assassin') v += 1;                          // Tanks lassen Assassinen abprallen
  if (ga === 'fighter' && gb === 'assassin') v += 0.5;                     // Kämpfer überleben den Burst
  if (ga === 'fighter' && (MARKSMEN.has(b) || b === 'enchanter')) v += 0.5; // Kämpfer springen auf die Backline
  if (a === 'ap_control' && gb === 'fighter') v += 0.5;                    // Kontroll-Magier kiten Kämpfer
  if (gb === 'tank' && ['duelist', 'marksman_onhit', 'ap_dps', 'ap_bruiser'].includes(a)) v += 1; // %-Schaden gegen Tanks
  if (gb === 'tank' && a === 'bruiser') v += 0.5;
  if (a === 'engage_support' && (MARKSMEN.has(b) || b === 'ap_control')) v += 0.5;
  if (ga === 'tank' && b === 'marksman_crit') v += 0.5;                    // Rüstung gegen Crit
  return v;
}
const archAdv = (a, b) => archBeats(a, b) - archBeats(b, a);

// Bewertet Champion c gegen alle Gegner. Direkte Matchups zählen voll (gleiche Lane 1,5-fach),
// die Klassen-Logik ergänzt das für Gegner ohne direkte Daten.
function teamScore(c, enemies, pos) {
  let total = 0;
  const good = [], bad = [];
  for (const e of enemies) {
    const direct = matchupScore(c, e) * (S.db[e].roles[0] === pos ? 1.5 : 1);
    const cls = archAdv(S.db[c].arch, S.db[e].arch);
    const v = direct + cls;
    total += v;
    if (v >= 0.5) good.push(e); else if (v <= -0.5) bad.push(e);
  }
  return { c, score: Math.round(total * 10) / 10, good, bad };
}

function enemySummary(enemies) {
  const n = { AD: 0, AP: 0, tank: 0, assassin: 0, heal: 0, cc: 0 };
  for (const e of enemies) {
    const a = window.BUILDS[S.db[e].arch] || window.BUILDS.bruiser;
    if (a.dmg === 'AD') n.AD++; else if (a.dmg === 'AP') n.AP++;
    if (GROUP[S.db[e].arch] === 'tank') n.tank++;
    if (GROUP[S.db[e].arch] === 'assassin') n.assassin++;
    if (window.HEAL_HEAVY.has(e)) n.heal++;
    if (window.CC_HEAVY.has(e)) n.cc++;
  }
  const tips = [];
  if (n.AD >= 3) tips.push(`${n.AD}× AD-Schaden → Rüstung lohnt sich (Plated Steelcaps, Randuin, Thornmail)`);
  if (n.AP >= 3) tips.push(`${n.AP}× AP-Schaden → Magieresistenz lohnt sich (Mercury, Force of Nature, Maw)`);
  if (n.tank >= 2) tips.push(`${n.tank} Tanks → Prozent-Schaden einplanen (Black Cleaver, BotRK, Liandry, Lord Dominik)`);
  if (n.assassin >= 2) tips.push(`${n.assassin} Assassinen → nicht allein rumlaufen, ggf. Zhonya / Guardian Angel / Death's Dance`);
  if (n.heal >= 2) tips.push(`${n.heal} Champions mit viel Heilung → Anti-Heal früh kaufen`);
  if (n.cc >= 3) tips.push(`Viel Kontrolle (${n.cc}) → Mercury's Treads / Tenacity`);
  return tips;
}

const strengthLabel = (v, good) => (v >= 4 ? (good ? 'Hart-Counter' : 'Countert dich hart') : v >= 2.5 ? (good ? 'Guter Pick' : 'Countert dich') : (good ? 'Leichter Vorteil' : 'Leicht im Nachteil'));

// ---------------------------------------------------------------------------
// Build-Zusammenstellung
// ---------------------------------------------------------------------------
function buildFor(id, role) {
  const d = S.db[id];
  const a = window.BUILDS[d.arch] || window.BUILDS.bruiser;
  let core = [...(d.core || a.core)];
  let late = a.late.filter((x) => !core.includes(x));
  let starter = a.starter;

  if (role === 'support') {
    starter = ['World Atlas', 'Health Potion'];
    const sItem = window.SUPPORT_ITEM[d.arch] || window.SUPPORT_ITEM.default;
    if (!core.some((x) => SUPPORT_QUEST_ITEMS.has(x))) core = [sItem, ...core.slice(0, 2)];
  } else {
    core = core.filter((x) => !SUPPORT_QUEST_ITEMS.has(x));
    while (core.length < 3 && late.length) core.push(late.shift());
    if (role === 'jungle') starter = [window.JUNGLE_PET[d.arch] || window.JUNGLE_PET.default, 'Health Potion'];
    else if (SUPPORT_QUEST_ITEMS.has(starter[0])) starter = ["Doran's Ring", 'Health Potion'];
  }
  const boots = d.boots === '-' ? null : d.boots || a.boots;
  const keystone = d.keystone || a.keystone;
  const primary = findRune(keystone)?.tree.key || a.primary;
  let secondary = a.secondary;
  if (secondary === primary) secondary = primary === 'Inspiration' ? 'Resolve' : 'Inspiration';
  let spells = window.SPELLS_BY_ROLE[role] || window.SPELLS_BY_ROLE.mid;
  if (role === 'top' && d.arch === 'crit_fighter') spells = ['SummonerFlash', 'SummonerDot'];
  return { arch: a, core, late, starter, boots, keystone, primary, secondary, spells };
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------
const isMobile = () => window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;
const setListOpen = (open) => document.body.classList.toggle('list-open', open);

function setupStaticUi() {
  $('#listToggle').addEventListener('click', () => setListOpen(!document.body.classList.contains('list-open')));
  $('#tabs').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-view]');
    if (b) showView(b.dataset.view);
  });
  const rf = $('#roleFilter');
  rf.innerHTML = `<button data-role="all" class="active">Alle</button>` + ROLES.map(([k, n]) => `<button data-role="${k}">${n}</button>`).join('');
  rf.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    S.roleFilter = b.dataset.role;
    rf.querySelectorAll('button').forEach((x) => x.classList.toggle('active', x === b));
    renderGrid();
  });
  $('#search').addEventListener('input', renderGrid);
  $('#search').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const first = $('#champGrid .champ-tile');
      if (first) openChampion(first.dataset.id);
    }
  });
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-open]');
    if (t) { openChampion(t.dataset.open, t.dataset.role || null, t.dataset.vs || null); return; }
    const m = e.target.closest('[data-vs-only]');
    if (m) { setMatchup(m.dataset.vsOnly); }
  });
  setupTooltip();
}

function showView(v) {
  setListOpen(false);
  document.querySelectorAll('#tabs button').forEach((b) => b.classList.toggle('active', b.dataset.view === v));
  document.querySelectorAll('.view').forEach((s) => s.classList.toggle('active', s.id === `view-${v}`));
}

function normalize(s) { return s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, ''); }

function renderGrid() {
  const q = normalize($('#search').value || '');
  const list = Object.values(S.champs)
    .filter((c) => !q || normalize(c.name).includes(q) || normalize(c.id).includes(q))
    .filter((c) => S.roleFilter === 'all' || S.db[c.id].roles.includes(S.roleFilter))
    .sort((a, b) => a.name.localeCompare(b.name, 'de'));
  $('#champGrid').innerHTML = list.map((c) => `
    <button class="champ-tile${c.id === S.current ? ' active' : ''}" data-id="${c.id}" data-open="${c.id}" ${S.roleFilter !== 'all' ? `data-role="${S.roleFilter}"` : ''} title="${esc(c.name)}">
      <img src="${champImg(c.id)}" alt="" loading="lazy"><span>${esc(c.name)}</span>
    </button>`).join('') || '<p class="none">Kein Champion gefunden.</p>';
}

// ---------------------------------------------------------------------------
// Champion-Seite
// ---------------------------------------------------------------------------
function openChampion(id, role = null, vs = null) {
  if (!S.champs[id]) return;
  const d = S.db[id];
  S.current = id;
  S.currentRole = role && d.roles.includes(role) ? role : role || d.roles[0];
  if (!d.roles.includes(S.currentRole)) S.currentRole = d.roles[0];
  if (vs !== null) S.matchEnemy = vs;
  else if (S.matchEnemy === id) S.matchEnemy = null;
  store.set('lastChamp', id);
  showView('champion');
  renderChampion();
  document.querySelectorAll('.champ-tile').forEach((t) => t.classList.toggle('active', t.dataset.id === id));
  $('.content').scrollTop = 0;
}

function uggUrl(id, role) {
  const slug = id === 'MonkeyKing' ? 'wukong' : id.toLowerCase();
  return `https://u.gg/lol/champions/${slug}/build?role=${role === 'mid' ? 'middle' : role}`;
}

function centry(id, val, good, role) {
  return `<button class="centry ${good ? 'good' : 'bad'}" data-open="${id}" ${role && S.db[id].roles.includes(role) ? `data-role="${role}"` : ''} title="${esc(champName(id))} öffnen">
    <img src="${champImg(id)}" alt=""><div><div class="n">${esc(champName(id))}</div><div class="s">${strengthLabel(val, good)}</div></div></button>`;
}

function renderChampion() {
  const id = S.current, role = S.currentRole, c = S.champs[id], d = S.db[id];
  const b = buildFor(id, role);
  const key = findRune(b.keystone);
  const prim = findRune(b.primary)?.tree, sec = findRune(b.secondary)?.tree;
  const runeImg = (r) => (r ? `https://ddragon.leagueoflegends.com/cdn/img/${r.icon}` : '');

  const bad = sortedByRole(countersOf(id), role).slice(0, 10);
  const good = sortedByRole(strongVs(id), role).slice(0, 10);

  $('#champEmpty').hidden = true;
  const page = $('#champPage');
  page.hidden = false;
  page.innerHTML = `
    <div class="hero" style="background-image:url('${CDN}/img/champion/splash/${id}_0.jpg')">
      <img class="portrait" src="${champImg(id)}" alt="">
      <div>
        <h1>${esc(c.name)}</h1>
        <div class="title">${esc(c.title)}</div>
        <span class="tag">${esc(b.arch.label)}</span><span class="tag">Schaden: ${b.arch.dmg}</span>
        ${d.roles.map((r) => `<span class="tag">${ROLE_NAME[r]}</span>`).join('')}
      </div>
      <div class="actions">
        <button class="btn" id="uggBtn">Live-Statistik auf u.gg ↗</button>
      </div>
    </div>

    <div class="role-tabs" id="roleTabs">
      ${d.roles.map((r) => `<button data-r="${r}" class="${r === role ? 'active' : ''}">${ROLE_NAME[r]}</button>`).join('')}
    </div>

    <div class="cols">
      <div class="panel span">
        <h3>Beste Build – ${ROLE_NAME[role]}</h3>
        <div class="build-row"><div class="lbl">Runen</div>
          <div class="rune-block">
            ${key?.rune ? `<img class="key" src="${runeImg(key.rune)}" data-rune="${b.keystone}" alt="">` : ''}
            <div><b>${esc(key?.rune?.name || b.keystone)}</b><div class="small">${esc(prim?.name || '')} + ${esc(sec?.name || '')}</div></div>
            ${prim ? `<img class="tree" src="${runeImg(prim)}" alt="" title="${esc(prim.name)}">` : ''}
            ${sec ? `<img class="tree" src="${runeImg(sec)}" alt="" title="${esc(sec.name)}">` : ''}
          </div>
        </div>
        <div class="build-row"><div class="lbl">Beschwörer</div><div class="items">${b.spells.map(spellHtml).join('')}</div></div>
        <div class="build-row"><div class="lbl">Start-Items</div><div class="items">${itemsHtml(b.starter)}</div></div>
        <div class="build-row"><div class="lbl">Kern-Build</div><div class="items">${itemsHtml(b.core, '<span class="arrow">▶</span>')}${b.boots ? `<span class="arrow">+</span>${itemHtml(b.boots)}` : ''}</div></div>
        <div class="build-row"><div class="lbl">Spätes Spiel</div><div class="items">${itemsHtml(b.late)}</div></div>
        ${d.curated ? '' : '<p class="small">Für diesen Champion gibt es noch keine kuratierten Daten – Build wurde aus der Champion-Klasse abgeleitet. Für genaue Werte: u.gg-Button oben.</p>'}
      </div>

      <div class="panel list-bad">
        <h3>Schwer gegen (diese countern ${esc(c.name)})</h3>
        <div class="clist">${bad.map(([o, v]) => centry(o, v, false, role)).join('') || '<p class="none">Keine Daten.</p>'}</div>
      </div>
      <div class="panel list-good">
        <h3>Stark gegen (${esc(c.name)} countert diese)</h3>
        <div class="clist">${good.map(([o, v]) => centry(o, v, true, role)).join('') || '<p class="none">Keine Daten.</p>'}</div>
      </div>

      <div class="panel span" id="matchupPanel">
        <h3>Matchup-Check</h3>
        <p class="muted">Gegen wen spielst du? Wähle den gegnerischen Champion für Einschätzung, Tipps und Gegen-Items.</p>
        <div class="picker" id="matchPicker"></div>
        <div id="matchupResult"></div>
      </div>
    </div>
    <p class="disclaimer">Counter- und Build-Daten sind kuratierte Erfahrungswerte und ändern sich mit Patches. Champion-, Item- und Runendaten kommen live von Riot (Data Dragon). Rift Counter ist nicht mit Riot Games verbunden.</p>
  `;
  $('#roleTabs').addEventListener('click', (e) => {
    const t = e.target.closest('button[data-r]');
    if (t) { S.currentRole = t.dataset.r; renderChampion(); }
  });
  $('#uggBtn').addEventListener('click', () => {
    const url = uggUrl(id, role);
    if (window.api) window.api.openExternal(url); else window.open(url, '_blank');
  });
  makePicker($('#matchPicker'), (enemy) => { S.matchEnemy = enemy; renderMatchup(); }, S.matchEnemy, 'Gegner wählen …');
  renderMatchup();
}

function setMatchup(enemy) {
  S.matchEnemy = enemy;
  renderChampion();
  $('#matchupPanel')?.scrollIntoView({ behavior: 'smooth' });
}

function counterItemsFor(me, enemy) {
  const mine = window.BUILDS[S.db[me].arch] || window.BUILDS.bruiser;
  const theirs = window.BUILDS[S.db[enemy].arch] || window.BUILDS.bruiser;
  const pool = window.COUNTER_ITEMS[mine.cls] || window.COUNTER_ITEMS.fighter;
  const out = [];
  const dmg = theirs.dmg === 'AP' ? 'AP' : theirs.dmg === 'AD' ? 'AD' : null;
  if (dmg) out.push([`Gegen ${dmg}-Schaden`, pool[dmg]]);
  else out.push(['Gegen gemischten Schaden', [pool.AD[0], pool.AP[0], pool.AD[1], pool.AP[1]]]);
  if (window.HEAL_HEAVY.has(enemy)) out.push(['Anti-Heilung', pool.heal]);
  if (theirs.cls === 'tank') out.push(['Gegen Tanks', pool.tank]);
  if (window.CC_HEAVY.has(enemy)) out.push(['Gegen Kontrolle (CC)', pool.cc]);
  return out;
}

function renderMatchup() {
  const box = $('#matchupResult');
  if (!box) return;
  const me = S.current, enemy = S.matchEnemy;
  if (!enemy || !S.champs[enemy]) { box.innerHTML = ''; return; }
  const sc = matchupScore(me, enemy);
  const v = verdict(sc);
  const ea = window.BUILDS[S.db[enemy].arch] || window.BUILDS.bruiser;
  const known = sc !== 0 || S.db[me].counters.includes(enemy) || S.db[me].strong.includes(enemy);
  let advice;
  if (v.cls === 'good') advice = `Du hast hier den Vorteil. Spiele aggressiv in deinen Stärke-Phasen, zwinge Trades und baue früh einen Vorsprung auf.`;
  else if (v.cls === 'bad') advice = `${esc(champName(enemy))} ist ein unangenehmer Gegner. Spiele sicher, farme unter dem Turm, hol dir Hilfe vom Jungler und skaliere in Teamfights.`;
  else advice = known ? 'Ausgeglichenes Matchup – Skill und Jungle-Hilfe entscheiden.' : 'Keine speziellen Daten zu diesem Matchup – spiele es nach Klassen-Stärken.';
  box.innerHTML = `
    <div class="verdict">
      <div class="vs"><img src="${champImg(me)}" alt=""> VS <img src="${champImg(enemy)}" alt=""></div>
      <span class="badge ${v.cls}">${v.text}</span>
      <span class="small">Gegner: ${esc(ea.label)} · ${ea.dmg}-Schaden</span>
      <button class="btn" data-open="${enemy}" data-vs="${me}">Aus Sicht von ${esc(champName(enemy))} ansehen</button>
    </div>
    <div class="tip">${advice}</div>
    <div class="tip">${esc(window.ARCH_TIPS[S.db[enemy].arch] || '')}</div>
    <h3 style="margin-top:14px">Situative Items in diesem Matchup</h3>
    ${counterItemsFor(me, enemy).map(([l, items]) => `<div class="build-row"><div class="lbl">${l}</div><div class="items">${itemsHtml(items)}</div></div>`).join('')}
  `;
}

// ---------------------------------------------------------------------------
// Champion-Auswahl (Suchfeld mit Dropdown)
// ---------------------------------------------------------------------------
function makePicker(root, onPick, selected, placeholder) {
  root.innerHTML = `
    <div class="sel">${selected && S.champs[selected] ? `<img src="${champImg(selected)}" alt="">` : ''}
      <input class="search" placeholder="${esc(placeholder)}" value="${selected && S.champs[selected] ? esc(champName(selected)) : ''}" autocomplete="off">
    </div><div class="dropdown" hidden></div>`;
  const input = $('input', root), dd = $('.dropdown', root);
  let hl = 0, matches = [];
  const render = () => {
    const q = normalize(input.value);
    matches = Object.values(S.champs).filter((c) => !q || normalize(c.name).includes(q) || normalize(c.id).includes(q))
      .sort((a, b) => {
        const as = normalize(a.name).startsWith(q) ? 0 : 1, bs = normalize(b.name).startsWith(q) ? 0 : 1;
        return as - bs || a.name.localeCompare(b.name, 'de');
      }).slice(0, 40);
    hl = 0;
    dd.innerHTML = matches.map((c, i) => `<button data-p="${c.id}" class="${i === 0 ? 'hl' : ''}"><img src="${champImg(c.id)}" alt="">${esc(c.name)}</button>`).join('');
    dd.hidden = !matches.length;
  };
  input.addEventListener('focus', () => { input.select(); render(); });
  input.addEventListener('input', render);
  input.addEventListener('blur', () => setTimeout(() => (dd.hidden = true), 150));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      hl = Math.max(0, Math.min(matches.length - 1, hl + (e.key === 'ArrowDown' ? 1 : -1)));
      dd.querySelectorAll('button').forEach((b, i) => b.classList.toggle('hl', i === hl));
      dd.children[hl]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && matches[hl]) {
      dd.hidden = true; onPick(matches[hl].id);
    }
  });
  dd.addEventListener('mousedown', (e) => {
    const b = e.target.closest('button[data-p]');
    if (b) { e.preventDefault(); dd.hidden = true; onPick(b.dataset.p); }
  });
}

// ---------------------------------------------------------------------------
// Counter-Finder
// ---------------------------------------------------------------------------
function renderFinder() {
  makePicker($('#finderPicker'), (id) => {
    S.finderEnemy = id;
    if (!S.db[id].roles.includes(S.finderRole)) S.finderRole = S.db[id].roles[0];
    renderFinder();
  }, S.finderEnemy, 'Gegnerischen Champion wählen …');
  const fr = $('#finderRoles');
  fr.innerHTML = ROLES.map(([k, n]) => `<button data-r="${k}" class="${k === S.finderRole ? 'active' : ''}">${n}</button>`).join('');
  fr.onclick = (e) => {
    const b = e.target.closest('button[data-r]');
    if (b) { S.finderRole = b.dataset.r; renderFinder(); }
  };
  const out = $('#finderResult');
  const enemy = S.finderEnemy;
  if (!enemy) { out.innerHTML = ''; return; }
  const role = S.finderRole;
  const strict = (map) => [...map.entries()].filter(([c]) => S.db[c].roles.includes(role)).sort((a, b) => b[1] - a[1]);
  const picks = strict(countersOf(enemy));
  const avoid = strict(strongVs(enemy));
  const entry = ([id, v], good) => `<button class="centry ${good ? 'good' : 'bad'}" data-open="${id}" data-role="${role}" data-vs="${enemy}">
      <img src="${champImg(id)}" alt=""><div><div class="n">${esc(champName(id))}</div><div class="s">${good ? strengthLabel(v, true) : 'Wird gecountert'}</div></div></button>`;
  out.innerHTML = `
    <div class="panel list-good">
      <h3>Beste Counter gegen ${esc(champName(enemy))} – ${ROLE_NAME[role]}</h3>
      <div class="clist">${picks.map((p) => entry(p, true)).join('') || '<p class="none">Keine Lane-spezifischen Daten. Versuche eine andere Lane.</p>'}</div>
    </div>
    <div class="panel list-bad">
      <h3>Lieber nicht picken (${esc(champName(enemy))} ist stark gegen)</h3>
      <div class="clist">${avoid.map((p) => entry(p, false)).join('') || '<p class="none">Keine Daten.</p>'}</div>
    </div>
    <p class="small">Klick auf einen Champion öffnet dessen Build inklusive Matchup gegen ${esc(champName(enemy))}.</p>`;
}

// ---------------------------------------------------------------------------
// Live Champ-Select (League Client)
// ---------------------------------------------------------------------------
// Manueller Champ-Select (funktioniert überall, auch im Browser / am Handy)
function setupManualCs() {
  S.cs = store.get('cs', null) || { pos: 'mid', me: null, enemies: [null, null, null, null, null] };
  S.cs.pool = S.cs.pool || [];
  $('#csReset').onclick = () => { S.cs = { pos: S.cs.pos, pool: S.cs.pool, me: null, enemies: [null, null, null, null, null] }; renderManualCs(); };
  $('#manualPanel').addEventListener('click', (e) => {
    const pr = e.target.closest('[data-pool-rm]');
    if (pr) { S.cs.pool = S.cs.pool.filter((x) => x !== pr.dataset.poolRm); renderManualCs(); return; }
    const b = e.target.closest('[data-cs-clear]');
    if (!b) return;
    const k = b.dataset.csClear;
    if (k === 'me') S.cs.me = null; else S.cs.enemies[+k] = null;
    renderManualCs();
  });
  renderManualCs();
}

function renderManualCs() {
  const cs = S.cs;
  store.set('cs', cs);
  const rr = $('#csRoles');
  rr.innerHTML = ROLES.map(([k, n]) => `<button data-r="${k}" class="${k === cs.pos ? 'active' : ''}">${n}</button>`).join('');
  rr.onclick = (e) => { const b = e.target.closest('button[data-r]'); if (b) { cs.pos = b.dataset.r; renderManualCs(); } };
  makePicker($('#csMe'), (id) => { cs.me = id; renderManualCs(); }, cs.me, 'Noch nicht gewählt …');
  $('#csPool').innerHTML = cs.pool.filter((c) => S.champs[c]).map((c) =>
    `<button class="chip" data-pool-rm="${c}" title="Aus Pool entfernen"><img src="${champImg(c)}" alt="">${esc(champName(c))} <span>×</span></button>`).join('')
    || '<span class="small">Noch leer – füge deine Main-Champions hinzu.</span>';
  makePicker($('#csPoolAdd'), (id) => { if (!cs.pool.includes(id)) cs.pool.push(id); renderManualCs(); }, null, 'Champion zum Pool hinzufügen …');
  $('#csEnemies').innerHTML = cs.enemies.map((_, i) =>
    `<div class="cs-slot"><div class="picker" id="csE${i}"></div><button class="cs-clear" data-cs-clear="${i}" aria-label="Entfernen">×</button></div>`).join('');
  cs.enemies.forEach((id, i) => makePicker($(`#csE${i}`), (pick) => { cs.enemies[i] = pick; renderManualCs(); }, id, `Gegner ${i + 1} …`));
  const enemies = cs.enemies.filter((e) => e && S.champs[e]);
  const myId = cs.me && S.champs[cs.me] ? cs.me : null;
  const out = $('#manualResult');
  if (!myId && !enemies.length) { out.innerHTML = ''; return; }
  renderChampSelect(out, myId, cs.pos, enemies, [], cs.pool);
}

function setupLcu() {
  const toggle = $('#lcuToggle'), auto = $('#lcuAutoOpen');
  if (!window.api || !window.api.enableLcu) {
    $('#lcuPanel').hidden = true; // Browser darf nicht auf den League-Client zugreifen
    $('#lcuDot').hidden = true;
    return;
  }
  toggle.checked = store.get('lcuOn', true);
  auto.checked = store.get('lcuAuto', true);
  toggle.onchange = () => { store.set('lcuOn', toggle.checked); window.api.enableLcu(toggle.checked); };
  auto.onchange = () => store.set('lcuAuto', auto.checked);
  window.api.onLcuUpdate(onLcu);
  window.api.enableLcu(toggle.checked);
}

function onLcu(p) {
  const dot = $('#lcuDot'), st = $('#lcuStatus'), out = $('#liveResult');
  const prev = S.lcu;
  S.lcu = p;
  dot.className = 'dot' + (p.status === 'champ-select' ? ' on' : p.status === 'connected' ? ' wait' : '');
  const msg = {
    off: 'Aus',
    'no-client': 'League-Client nicht gefunden – starte den Client.',
    connected: 'Mit Client verbunden – warte auf Champ-Select …',
    'champ-select': 'Champ-Select erkannt!',
  };
  st.textContent = msg[p.status] || p.status;
  if (p.status !== 'champ-select') { out.innerHTML = ''; return; }

  const myId = S.byKey[p.myChampionId];
  const pos = LCU_POS[p.myPosition] || (myId ? S.db[myId].roles[0] : 'mid');
  const enemies = p.enemies.map((k) => S.byKey[k]).filter(Boolean);
  const allies = p.allies.map((k) => S.byKey[k]).filter(Boolean);

  // Neuer Champion im Champ-Select -> automatisch öffnen
  if (myId && $('#lcuAutoOpen').checked && (!prev || prev.myChampionId !== p.myChampionId)) {
    openChampion(myId, pos);
  }

  renderChampSelect(out, myId, pos, enemies, allies, (S.cs && S.cs.pool) || []);
}

function renderChampSelect(out, myId, pos, enemies, allies = [], pool = []) {
  const taken = new Set([...enemies, ...allies]);
  const scored = enemies.length
    ? Object.keys(S.champs).filter((c) => S.db[c].roles.includes(pos) && !taken.has(c)).map((c) => teamScore(c, enemies, pos))
    : [];
  const recs = scored.filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 10);
  const avoid = scored.filter((r) => r.score < 0).sort((a, b) => a.score - b.score).slice(0, 6);
  const poolScored = enemies.length ? pool.filter((c) => S.champs[c] && !taken.has(c)).map((c) => teamScore(c, enemies, pos)).sort((a, b) => b.score - a.score) : [];
  const names = (ids) => ids.map(champName).join(', ');
  const scoreCls = (v) => (v >= 1 ? 'good' : v <= -1 ? 'bad' : 'mid');
  const recCard = (r) => `<button class="centry rec ${scoreCls(r.score)}" data-open="${r.c}" data-role="${pos}">
      <img src="${champImg(r.c)}" alt=""><div><div class="n">${esc(champName(r.c))} <span class="sc ${scoreCls(r.score)}">${r.score > 0 ? '+' : ''}${r.score}</span></div>
      ${r.good.length ? `<div class="s good">Gut gegen: ${esc(names(r.good))}</div>` : ''}
      ${r.bad.length ? `<div class="s bad">Schwer gegen: ${esc(names(r.bad))}</div>` : ''}</div></button>`;

  const card = (e) => {
    const v = myId ? verdict(matchupScore(myId, e) + archAdv(S.db[myId].arch, S.db[e].arch)) : null;
    return `<button class="centry ${v ? v.cls : ''}" ${myId ? `data-open="${myId}" data-role="${pos}" data-vs="${e}"` : `data-open="${e}"`}>
      <img src="${champImg(e)}" alt=""><div><div class="n">${esc(champName(e))}</div>
      ${v ? `<div class="s ${v.cls}">${v.text}</div>` : ''}</div></button>`;
  };
  const mine = myId && enemies.length ? teamScore(myId, enemies, pos) : null;
  const tips = enemySummary(enemies);
  out.innerHTML = `
    ${poolScored.length ? `<div class="panel list-good"><h3>Dein Pool gegen dieses Team – Bester zuerst</h3>
      <div class="clist wide">${poolScored.map(recCard).join('')}</div></div>` : ''}
    ${enemies.length ? `<div class="panel list-good"><h3>Beste Picks gegen das ganze Gegnerteam – ${ROLE_NAME[pos]}</h3>
      <p class="small">Bewertet jeden Champion gegen alle eingetragenen Gegner: direkte Matchups (gleiche Lane zählt stärker) plus Klassen-Vorteile (z. B. Assassine gegen Schützen, Tank gegen Assassinen).</p>
      <div class="clist wide">${recs.map(recCard).join('') || '<p class="none">Keine klaren Vorteile gefunden.</p>'}</div></div>` : ''}
    ${avoid.length ? `<div class="panel list-bad"><h3>Lieber nicht picken</h3>
      <div class="clist wide">${avoid.map(recCard).join('')}</div></div>` : ''}
    ${tips.length ? `<div class="panel"><h3>Gegnerteam-Analyse</h3>${tips.map((t) => `<div class="tip">${esc(t)}</div>`).join('')}</div>` : ''}
    <div class="panel">
      <h3>Du: ${myId ? esc(champName(myId)) : 'noch kein Pick'} · ${ROLE_NAME[pos] || ''}${mine ? ` <span class="sc ${scoreCls(mine.score)}">${mine.score > 0 ? '+' : ''}${mine.score}</span>` : ''}</h3>
      ${myId ? `<button class="btn" data-open="${myId}" data-role="${pos}">Build für ${esc(champName(myId))} öffnen</button>` : ''}
      <h3 style="margin-top:14px">Gegnerteam ${myId ? '(Klick = Matchup-Details)' : ''}</h3>
      <div class="team">${enemies.map(card).join('') || '<p class="none">Gegner hat noch nicht gepickt.</p>'}</div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Tooltips für Items / Runen / Zauber
// ---------------------------------------------------------------------------
function setupTooltip() {
  const tip = $('#tooltip');
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('[data-item],[data-spell],[data-rune],[data-tip-title]');
    if (!el) { tip.hidden = true; return; }
    let html = '';
    if (el.dataset.item) {
      const it = S.itemsDe[el.dataset.item];
      html = `<b>${esc(it.name)}</b><div class="gold">${it.gold?.total ?? ''} Gold</div><div>${esc(strip(it.description)).replace(/\n/g, '<br>')}</div>`;
    } else if (el.dataset.spell) {
      const sp = S.spells[el.dataset.spell];
      html = `<b>${esc(sp.name)}</b><div>${esc(sp.description)}</div>`;
    } else if (el.dataset.rune) {
      const r = findRune(el.dataset.rune)?.rune;
      html = r ? `<b>${esc(r.name)}</b><div>${esc(strip(r.shortDesc))}</div>` : '';
    } else {
      html = `<b>${esc(el.dataset.tipTitle)}</b><div>Item im aktuellen Patch nicht gefunden.</div>`;
    }
    tip.innerHTML = html;
    tip.hidden = !html;
  });
  document.addEventListener('mousemove', (e) => {
    if (tip.hidden) return;
    const x = Math.min(e.clientX + 16, window.innerWidth - tip.offsetWidth - 8);
    const y = Math.min(e.clientY + 16, window.innerHeight - tip.offsetHeight - 8);
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
  });
}

init();
