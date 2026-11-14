// Build-Archetypen. Item-Namen sind die englischen Riot-Namen und werden zur Laufzeit
// gegen Data Dragon (en_US) aufgelöst; angezeigt werden dann deutsche Namen + Icons.
// Runen nutzen die sprachneutralen Data-Dragon-Keys.
window.BUILDS = {
  bruiser: {
    label: 'Bruiser', dmg: 'AD', cls: 'fighter',
    keystone: 'Conqueror', primary: 'Precision', secondary: 'Resolve',
    starter: ["Doran's Blade", 'Health Potion'], boots: 'Plated Steelcaps',
    core: ['Black Cleaver', 'Sundered Sky', "Sterak's Gage"],
    late: ["Death's Dance", 'Spear of Shojin', 'Maw of Malmortius', 'Guardian Angel'],
  },
  duelist: {
    label: 'Duellant', dmg: 'AD', cls: 'fighter',
    keystone: 'Conqueror', primary: 'Precision', secondary: 'Resolve',
    starter: ["Doran's Blade", 'Health Potion'], boots: "Plated Steelcaps",
    core: ['Blade of The Ruined King', 'Trinity Force', "Sterak's Gage"],
    late: ["Death's Dance", "Wit's End", 'Spirit Visage', 'Guardian Angel'],
  },
  crit_fighter: {
    label: 'Crit-Kämpfer', dmg: 'AD', cls: 'fighter',
    keystone: 'LethalTempo', primary: 'Precision', secondary: 'Resolve',
    starter: ["Doran's Blade", 'Health Potion'], boots: "Berserker's Greaves",
    core: ['Kraken Slayer', 'Infinity Edge', 'Navori Flickerblade'],
    late: ["Death's Dance", 'Bloodthirster', "Wit's End", 'Guardian Angel'],
  },
  lethality: {
    label: 'Assassine (AD)', dmg: 'AD', cls: 'squishy',
    keystone: 'Electrocute', primary: 'Domination', secondary: 'Precision',
    starter: ['Long Sword', 'Health Potion'], boots: 'Ionian Boots of Lucidity',
    core: ["Youmuu's Ghostblade", 'Profane Hydra', 'Opportunity'],
    late: ["Serylda's Grudge", 'Edge of Night', 'Axiom Arc', 'Guardian Angel'],
  },
  tank: {
    label: 'Tank', dmg: 'AP/AD', cls: 'tank',
    keystone: 'GraspOfTheUndying', primary: 'Resolve', secondary: 'Precision',
    starter: ["Doran's Shield", 'Health Potion'], boots: 'Plated Steelcaps',
    core: ['Sunfire Aegis', 'Heartsteel', 'Thornmail'],
    late: ['Kaenic Rookern', 'Jak\'Sho, The Protean', "Randuin's Omen", 'Force of Nature'],
  },
  ap_bruiser: {
    label: 'AP-Kämpfer', dmg: 'AP', cls: 'fighter',
    keystone: 'Conqueror', primary: 'Precision', secondary: 'Resolve',
    starter: ["Doran's Ring", 'Health Potion'], boots: 'Plated Steelcaps',
    core: ["Liandry's Torment", 'Riftmaker', "Rylai's Crystal Scepter"],
    late: ["Zhonya's Hourglass", "Rabadon's Deathcap", 'Void Staff', 'Kaenic Rookern'],
  },
  ap_burst: {
    label: 'Burst-Magier', dmg: 'AP', cls: 'squishy',
    keystone: 'Electrocute', primary: 'Domination', secondary: 'Sorcery',
    starter: ["Doran's Ring", 'Health Potion'], boots: "Sorcerer's Shoes",
    core: ["Luden's Companion", 'Stormsurge', 'Shadowflame'],
    late: ["Rabadon's Deathcap", 'Void Staff', "Zhonya's Hourglass", "Banshee's Veil"],
  },
  ap_assassin: {
    label: 'Assassine (AP)', dmg: 'AP', cls: 'squishy',
    keystone: 'Electrocute', primary: 'Domination', secondary: 'Sorcery',
    starter: ["Doran's Ring", 'Health Potion'], boots: "Sorcerer's Shoes",
    core: ['Hextech Rocketbelt', 'Lich Bane', 'Shadowflame'],
    late: ["Rabadon's Deathcap", 'Void Staff', "Zhonya's Hourglass", "Banshee's Veil"],
  },
  ap_control: {
    label: 'Kontroll-Magier', dmg: 'AP', cls: 'squishy',
    keystone: 'ArcaneComet', primary: 'Sorcery', secondary: 'Inspiration',
    starter: ["Doran's Ring", 'Health Potion'], boots: "Sorcerer's Shoes",
    core: ['Malignance', "Luden's Companion", 'Shadowflame'],
    late: ["Rabadon's Deathcap", 'Void Staff', "Zhonya's Hourglass", "Banshee's Veil"],
  },
  ap_dps: {
    label: 'Dauerschaden-Magier', dmg: 'AP', cls: 'squishy',
    keystone: 'ArcaneComet', primary: 'Sorcery', secondary: 'Inspiration',
    starter: ["Doran's Ring", 'Health Potion'], boots: "Sorcerer's Shoes",
    core: ["Liandry's Torment", 'Blackfire Torch', "Rylai's Crystal Scepter"],
    late: ["Rabadon's Deathcap", 'Void Staff', "Zhonya's Hourglass", 'Morellonomicon'],
  },
  ap_onhit: {
    label: 'On-Hit (AP)', dmg: 'AP', cls: 'squishy',
    keystone: 'LethalTempo', primary: 'Precision', secondary: 'Sorcery',
    starter: ["Doran's Ring", 'Health Potion'], boots: "Berserker's Greaves",
    core: ["Nashor's Tooth", 'Riftmaker', "Guinsoo's Rageblade"],
    late: ["Rabadon's Deathcap", 'Void Staff', "Zhonya's Hourglass", "Banshee's Veil"],
  },
  marksman_crit: {
    label: 'Schütze (Crit)', dmg: 'AD', cls: 'squishy',
    keystone: 'LethalTempo', primary: 'Precision', secondary: 'Inspiration',
    starter: ["Doran's Blade", 'Health Potion'], boots: "Berserker's Greaves",
    core: ['Kraken Slayer', 'Infinity Edge', 'Phantom Dancer'],
    late: ["Lord Dominik's Regards", 'Bloodthirster', 'Rapid Firecannon', 'Guardian Angel'],
  },
  marksman_onhit: {
    label: 'Schütze (On-Hit)', dmg: 'AD', cls: 'squishy',
    keystone: 'LethalTempo', primary: 'Precision', secondary: 'Resolve',
    starter: ["Doran's Blade", 'Health Potion'], boots: "Berserker's Greaves",
    core: ['Blade of The Ruined King', "Guinsoo's Rageblade", 'Terminus'],
    late: ["Wit's End", "Runaan's Hurricane", "Lord Dominik's Regards", 'Guardian Angel'],
  },
  marksman_spell: {
    label: 'Schütze (Fähigkeiten)', dmg: 'AD', cls: 'squishy',
    keystone: 'PressTheAttack', primary: 'Precision', secondary: 'Inspiration',
    starter: ["Doran's Blade", 'Health Potion'], boots: 'Ionian Boots of Lucidity',
    core: ['Essence Reaver', 'Navori Flickerblade', 'Infinity Edge'],
    late: ["Lord Dominik's Regards", 'Bloodthirster', "Mercurial Scimitar", 'Guardian Angel'],
  },
  enchanter: {
    label: 'Verzauberer', dmg: 'AP', cls: 'squishy',
    keystone: 'SummonAery', primary: 'Sorcery', secondary: 'Resolve',
    starter: ['World Atlas', 'Health Potion'], boots: 'Ionian Boots of Lucidity',
    core: ['Dream Maker', 'Moonstone Renewer', 'Redemption'],
    late: ['Ardent Censer', "Mikael's Blessing", 'Staff of Flowing Water', 'Echoes of Helia'],
  },
  engage_support: {
    label: 'Engage-Support', dmg: 'AP/AD', cls: 'tank',
    keystone: 'VeteranAftershock', primary: 'Resolve', secondary: 'Inspiration',
    starter: ['World Atlas', 'Health Potion'], boots: 'Plated Steelcaps',
    core: ['Celestial Opposition', 'Locket of the Iron Solari', "Knight's Vow"],
    late: ["Zeke's Convergence", 'Redemption', 'Thornmail', 'Kaenic Rookern'],
  },
};

// Beschwörerzauber je Lane (Data-Dragon-IDs)
window.SPELLS_BY_ROLE = {
  top: ['SummonerFlash', 'SummonerTeleport'],
  jungle: ['SummonerFlash', 'SummonerSmite'],
  mid: ['SummonerFlash', 'SummonerDot'],
  adc: ['SummonerFlash', 'SummonerHeal'],
  support: ['SummonerFlash', 'SummonerDot'],
};

// Support-Questitem je Archetyp
window.SUPPORT_ITEM = {
  enchanter: 'Dream Maker',
  engage_support: 'Celestial Opposition',
  tank: 'Celestial Opposition',
  ap_control: "Zaz'Zak's Realmspike",
  ap_dps: "Zaz'Zak's Realmspike",
  ap_burst: "Zaz'Zak's Realmspike",
  default: 'Bloodsong',
};

// Jungle-Begleiter je Archetyp
window.JUNGLE_PET = {
  tank: 'Mosstomper Seedling',
  engage_support: 'Mosstomper Seedling',
  ap_dps: 'Scorchclaw Pup',
  ap_burst: 'Scorchclaw Pup',
  ap_assassin: 'Scorchclaw Pup',
  ap_control: 'Scorchclaw Pup',
  default: 'Gustwalker Hatchling',
};

// Situative Gegen-Items: [mein Klassentyp][Bedrohung]
window.COUNTER_ITEMS = {
  squishy: {
    AD: ["Zhonya's Hourglass", 'Guardian Angel', 'Plated Steelcaps', "Randuin's Omen"],
    AP: ["Banshee's Veil", "Mercury's Treads", "Maw of Malmortius", "Wit's End"],
    heal: ['Morellonomicon', 'Mortal Reminder', 'Chempunk Chainsword'],
    tank: ['Void Staff', "Lord Dominik's Regards", "Liandry's Torment", "Serylda's Grudge"],
    cc: ["Mercury's Treads", "Mercurial Scimitar", "Mikael's Blessing"],
  },
  fighter: {
    AD: ["Death's Dance", 'Plated Steelcaps', 'Thornmail', "Randuin's Omen"],
    AP: ["Maw of Malmortius", "Mercury's Treads", 'Spirit Visage', "Wit's End"],
    heal: ['Chempunk Chainsword', 'Thornmail', 'Morellonomicon'],
    tank: ['Black Cleaver', "Lord Dominik's Regards", 'Void Staff', 'Blade of The Ruined King'],
    cc: ["Mercury's Treads", "Sterak's Gage", 'Spirit Visage'],
  },
  tank: {
    AD: ['Thornmail', 'Plated Steelcaps', "Randuin's Omen", 'Frozen Heart'],
    AP: ['Kaenic Rookern', 'Force of Nature', "Mercury's Treads", 'Spirit Visage'],
    heal: ['Thornmail', 'Morellonomicon', 'Chempunk Chainsword'],
    tank: ['Heartsteel', "Jak'Sho, The Protean", 'Unending Despair', 'Hollow Radiance'],
    cc: ["Mercury's Treads", 'Force of Nature', "Jak'Sho, The Protean"],
  },
};

// Champions mit starker Selbstheilung (für Anti-Heal-Empfehlung)
window.HEAL_HEAVY = new Set([
  'Aatrox', 'Soraka', 'Vladimir', 'DrMundo', 'Yuumi', 'Sylas', 'Warwick', 'Fiddlesticks', 'Swain',
  'Briar', 'Olaf', 'Illaoi', 'Nami', 'Sona', 'Darius', 'Volibear', 'Trundle', 'Nasus', 'Irelia',
  'Fiora', 'Gwen', 'Samira', 'Senna', 'Kayn', 'Viego', 'Belveth', 'Renata', 'Milio', 'Seraphine', 'Udyr',
]);

// Champions mit viel harter Kontrolle (für Tenacity-Empfehlung)
window.CC_HEAVY = new Set([
  'Leona', 'Nautilus', 'Thresh', 'Blitzcrank', 'Alistar', 'Rell', 'Amumu', 'Sejuani', 'Maokai',
  'Lissandra', 'Malzahar', 'Annie', 'Morgana', 'Lux', 'TwistedFate', 'Vi', 'Skarner',
  'Rammus', 'Zac', 'Ashe', 'Galio', 'Poppy', 'Sion', 'Ornn', 'Rakan', 'Neeko', 'Seraphine', 'Pyke',
]);

// Allgemeine Tipps gegen Archetypen
window.ARCH_TIPS = {
  bruiser: 'Nicht lange Trades eingehen – kurz traden und Abstand halten. Rüstung + Anti-Heal früh einplanen.',
  duelist: 'Vermeide 1-gegen-1 im Midgame. Mit Team spielen und harte Kontrolle auf ihn sparen.',
  crit_fighter: 'Früh aggressiv sein, bevor die Items (Crit) stehen. Rüstung wirkt sehr gut.',
  lethality: 'Bleib in der Nähe deines Teams, ward die Flanken. Früh Rüstung oder Zhonya/Guardian Angel.',
  tank: 'Nicht stur auf den Tank schlagen – Prozent-Schaden (Liandry / Black Cleaver / Lord Dominik) kaufen und Wellen pushen.',
  ap_bruiser: 'Magieresistenz früh (Mercury / Maw / Spirit Visage). Seine Engage-Fähigkeit abwarten, dann kontern.',
  ap_burst: 'Wichtige Fähigkeit abwarten, danach traden. Früh Magieresistenz oder Banshee.',
  ap_assassin: 'Level 6 respektieren! Wards an den Seiten, Zhonya oder Banshee vorbereiten.',
  ap_control: 'Er ist immobil – engagiere, wenn seine Kontroll-Fähigkeit auf Abklingzeit ist. Gank-anfällig.',
  ap_dps: 'In kurzen Bursts handeln, nicht in Dauerkämpfen. Anti-Heal / MR je nach Bedarf.',
  ap_onhit: 'Früh Druck machen und ihn vom Farmen abhalten – er skaliert extrem.',
  marksman_crit: 'Im frühen Spiel Druck aufbauen. Schütze im Teamfight ist Hauptziel – mit Engage auf ihn gehen.',
  marksman_onhit: 'Früh punishen, sie skalieren hart. Rüstung (Randuin / Frozen Heart) hilft gegen Attack-Speed.',
  marksman_spell: 'Skillshots seitlich ausweichen; nach verschossenen Fähigkeiten traden.',
  enchanter: 'Früh auf den Support gehen, Anti-Heal/Schild-Durchbruch (Serpent/Morellonomicon) erwägen.',
  engage_support: 'Abstand halten, Positionierung beachten und nach verschossenem Engage hart zurückschlagen.',
};
