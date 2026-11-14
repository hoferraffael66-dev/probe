# Rift Counter – League of Legends Counter & Build Helfer (Desktop)

Desktop-App für Windows (Electron) im Stil von u.gg:

- **Champions** – für jeden Champion und jede Lane:
  - **Schwer gegen**: wer dich countert
  - **Stark gegen**: wen du counterst
  - **Beste Build**: Runen (Keystone + Bäume), Beschwörerzauber, Start-Items, Kern-Items, Stiefel, Late-Game-Items – mit Original-Icons und deutschen Item-Beschreibungen (Tooltip)
  - **Matchup-Check**: Gegner wählen → Einschätzung (Vorteil/Nachteil), Tipps und situative Items (gegen AD/AP, Anti-Heal, Tanks, CC)
  - Button **„Live-Statistik auf u.gg“** für aktuelle Winrates
- **Counter-Finder** – Gegner hat gepickt? Champion + Lane wählen → beste Counter-Picks und welche Champions du lieber nicht nehmen solltest.
- **Champ-Select (live)** – erkennt automatisch deinen Champ-Select über die lokale League-Client-Schnittstelle (nur lesend): öffnet deinen Champion, zeigt das Gegnerteam mit Matchup-Bewertung und schlägt Counter-Picks für deine Position vor.

Champion-, Item-, Runen- und Zauberdaten (inkl. Bilder) kommen **live von Riots offizieller Data Dragon** und werden bei jedem neuen Patch automatisch aktualisiert und lokal gecached (danach auch offline nutzbar).
Die Counter-/Build-Zuordnungen sind kuratierte Erfahrungswerte in `src/data/champions.js` und `src/data/builds.js` – du kannst sie dort jederzeit anpassen.

## Im Browser nutzen (ohne Download)

Die App läuft auch als Webseite – am PC und am Handy. Einmalig aktivieren:

1. Auf GitHub im Repo **Settings → Pages** öffnen.
2. Bei **Source** „Deploy from a branch“ wählen, Branch `claude/lol-counter-guide-desktop-renog5`, Ordner `/ (root)`, **Save**.
3. Nach ca. 1 Minute ist sie erreichbar unter: `https://hoferraffael66-dev.github.io/probe/`

Alles funktioniert im Browser, außer der automatischen Champ-Select-Erkennung (die braucht Zugriff auf den League-Client und geht nur in der Desktop-App).

## Installation (fertige .exe)

1. Auf GitHub im Repo auf **Actions → Windows-Build** gehen, den neuesten Lauf öffnen.
2. Unten unter **Artifacts** `RiftCounter-Windows` herunterladen und entpacken.
3. Entweder `RiftCounter-Portable-*.exe` direkt starten (ohne Installation) oder `Rift Counter Setup *.exe` installieren.

> Windows SmartScreen kann warnen, weil die App nicht signiert ist: „Weitere Informationen“ → „Trotzdem ausführen“.

## Selbst bauen / starten

Voraussetzung: [Node.js](https://nodejs.org) (LTS).

```bash
npm install
npm start        # App starten
npm run dist     # Windows-Installer + portable .exe nach ./dist bauen
```

## Daten anpassen

Jede Zeile in `src/data/champions.js`:

```
ChampionID | Lanes | Archetyp | Wird gecountert von | Countert selbst | Keystone | Kern-Items | Stiefel
```

Archetypen (Item-/Runen-Vorlagen) stehen in `src/data/builds.js`. Item-Namen sind die englischen Riot-Namen; angezeigt werden automatisch die deutschen Namen und Icons.

*Rift Counter ist nicht mit Riot Games verbunden. League of Legends ist eine Marke von Riot Games, Inc.*
