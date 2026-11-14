// Kuratierte Matchup-Daten (Erfahrungswerte aus High-Elo-Statistiken, patch-unabhängig gerundet).
// Format pro Zeile:
//   ChampionID | Lanes | Archetyp | Wird gecountert von | Countert selbst | Keystone (optional) | Kern-Items (optional) | Stiefel (optional)
// ChampionID = Data-Dragon-ID (z. B. MonkeyKing = Wukong). Lanes: top, jungle, mid, adc, support.
// Du kannst diese Datei frei anpassen – die App liest sie beim Start ein.
window.CHAMPION_TABLE = `
Aatrox|top|bruiser|Fiora,Irelia,Kayle,Vayne,Quinn,Gwen|Malphite,Renekton,Yorick,Nasus,Kled,Gnar
Ahri|mid|ap_burst|Fizz,Kassadin,Yasuo,Yone,Akali,Talon|Lux,Xerath,Velkoz,Karthus,Ziggs,Brand
Akali|mid,top|ap_assassin|Galio,Malzahar,Lissandra,Vex,Annie,Renekton|Xerath,Velkoz,Lux,Ziggs,Ryze,Orianna|Conqueror
Akshan|mid,top|marksman_crit|Galio,Malzahar,Annie,Lissandra,Vex,Pantheon|Yasuo,Yone,Katarina,Akali,Velkoz,Xerath|PressTheAttack|Kraken Slayer,Statikk Shiv,Infinity Edge
Alistar|support|engage_support|Janna,Morgana,Braum,Zyra,Brand,Velkoz,Xerath|Sona,Soraka,Yuumi,Nami,Lulu,Milio,Renata
Ambessa|top,jungle|bruiser|Fiora,Vayne,Quinn,Kayle,Teemo,Poppy|Gwen,Garen,Mordekaiser,Aatrox,Sion,Yorick
Amumu|jungle,support|tank|Karthus,Lillia,Shyvana,Graves,Kindred,Fiddlesticks|MasterYi,Belveth,Viego,Briar,Khazix,Rengar,Kayn|Aftershock|Sunfire Aegis,Liandry's Torment,Heartsteel
Anivia|mid|ap_control|Kassadin,Fizz,Zed,Talon,Ekko,Yasuo|Katarina,Yone,Irelia,Akali,Galio,Lissandra|ArcaneComet|Malignance,Seraph's Embrace,Rabadon's Deathcap
Annie|mid,support|ap_burst|Xerath,Velkoz,Orianna,Syndra,Viktor,Ziggs|Yasuo,Yone,Akali,Katarina,Fizz,Zed
Aphelios|adc|marksman_crit|Draven,Lucian,Kalista,Caitlyn,Varus,Samira,Nilah|Jinx,Twitch,Smolder|LethalTempo|Infinity Edge,Lord Dominik's Regards,Bloodthirster
Ashe|adc,support|marksman_onhit|Draven,Lucian,Kalista|Samira,Nilah,Vayne,KogMaw,Jinx,Kaisa,Zeri|LethalTempo|Kraken Slayer,Blade of The Ruined King,Runaan's Hurricane
AurelionSol|mid|ap_dps|Zed,Fizz,Kassadin,Talon,Katarina,Akali|Malzahar,Lux,Velkoz,Annie,Syndra,Ziggs|FirstStrike
Aurora|mid,top|ap_burst|Fizz,Kassadin,Talon,Zed,Galio,Malzahar|Yone,Yasuo,Irelia,Sylas,Akali,Katarina
Azir|mid|ap_onhit|Fizz,Kassadin,Zed,Talon,Akali,Yasuo|Viktor,Velkoz,Lux,Xerath,Ziggs,Orianna|LethalTempo|Nashor's Tooth,Liandry's Torment,Rabadon's Deathcap
Bard|support|engage_support|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Sona,Soraka,Yuumi,Milio|Guardian|Celestial Opposition,Redemption,Locket of the Iron Solari
Belveth|jungle|duelist|LeeSin,Elise,XinZhao,JarvanIV,RekSai,Nidalee,Graves|Ivern,Fiddlesticks|LethalTempo|Blade of The Ruined King,Kraken Slayer,Sterak's Gage
Blitzcrank|support|engage_support|Janna,Morgana,Braum,TahmKench|Zyra,Brand,Xerath,Velkoz,Lux,Seraphine,Swain
Brand|support,mid,jungle|ap_dps|Blitzcrank,Thresh,Nautilus,Pyke|Leona,Rell,Alistar,Rakan,Taric,Janna,Morgana|ArcaneComet|Liandry's Torment,Rylai's Crystal Scepter,Blackfire Torch
Braum|support|engage_support|Zyra,Brand|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Guardian
Briar|jungle|duelist|Amumu,Sejuani,Zac,Nunu,Rammus,Skarner|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego|Conqueror|Eclipse,Ravenous Hydra,Sterak's Gage
Caitlyn|adc|marksman_crit|Draven|Samira,Nilah,Tristana,Jinx,KogMaw,Twitch,Aphelios|FleetFootwork|Kraken Slayer,Infinity Edge,Rapid Firecannon
Camille|top|duelist|Jax,Renekton,Poppy,Darius,Sett,Kled|Nasus,Malphite,Ornn,Sion,Mordekaiser,Gangplank|GraspOfTheUndying|Trinity Force,Ravenous Hydra,Sterak's Gage
Cassiopeia|mid,top|ap_dps|Xerath,Syndra,Ziggs,Velkoz,Orianna,Zoe|Yasuo,Yone,Akali,Katarina,Irelia,Sylas|Conqueror|Rod of Ages,Liandry's Torment,Rylai's Crystal Scepter|-
Chogath|top,mid|tank|Vayne,Fiora,Gwen,Kayle,Darius,Trundle|Yasuo,Yone,Kled,Pantheon,Aatrox
Corki|mid|marksman_spell|Zed,Fizz,Talon,Yasuo,Katarina,Kassadin|Lux,Xerath,Velkoz,Ziggs,Veigar,Viktor|FleetFootwork|Trinity Force,Navori Flickerblade,Infinity Edge
Darius|top|bruiser|Vayne,Quinn,Gnar,Teemo,Kennen|Garen,Sett,Nasus,Mordekaiser,Gwen|Conqueror|Stridebreaker,Sterak's Gage,Dead Man's Plate
Diana|jungle,mid|ap_assassin|Galio,Malzahar,Lissandra,Annie,Kassadin|Katarina,Akali,Zed,Xerath,Lux,Velkoz|Conqueror|Nashor's Tooth,Lich Bane,Zhonya's Hourglass
DrMundo|top,jungle|tank|Vayne,Fiora,Gwen,Mordekaiser,Darius,Kayle|Teemo,Riven,Yasuo,Yone,Aatrox,Gangplank|GraspOfTheUndying|Heartsteel,Spirit Visage,Warmog's Armor
Draven|adc|marksman_crit|Varus,Ziggs|Jhin,Ezreal,MissFortune,Xayah,Ashe,Jinx,KogMaw|Conqueror|Bloodthirster,Infinity Edge,Lord Dominik's Regards
Ekko|mid,jungle|ap_assassin|Galio,Malzahar,Lissandra,Annie,Pantheon,Vex|Lux,Xerath,Ziggs,Velkoz,Orianna,Syndra
Elise|jungle|ap_burst|Khazix,Rengar,Nocturne,Shaco|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego
Evelynn|jungle|ap_assassin|LeeSin,Elise,XinZhao,JarvanIV,RekSai,Graves,Vi|Karthus,Lillia
Ezreal|adc|marksman_spell|Draven,Lucian,Kalista,Samira,Nilah,Tristana,Kaisa|Jinx,KogMaw,Smolder,Aphelios,Vayne,Varus|Conqueror|Manamune,Trinity Force,Serylda's Grudge
Fiddlesticks|jungle,support|ap_dps|LeeSin,Elise,XinZhao,JarvanIV,RekSai,Nidalee,Graves|Amumu,Nunu,Zac|DarkHarvest|Liandry's Torment,Zhonya's Hourglass,Rylai's Crystal Scepter
Fiora|top|duelist|Poppy,Malphite,Pantheon,Warwick,Quinn,Kennen|Ornn,Sion,Chogath,Garen,Aatrox,Renekton|Conqueror|Ravenous Hydra,Trinity Force,Sterak's Gage
Fizz|mid|ap_assassin|Galio,Malzahar,Lissandra,Annie,Vex,Diana|Ahri,Xerath,Lux,Velkoz,Ziggs,Orianna
Galio|mid,support|ap_bruiser|Kassadin,Vladimir,Cassiopeia,Swain,Ryze,Viktor|Akali,Fizz,Katarina,Zed,Yasuo,Leblanc|Aftershock|Riftmaker,Hollow Radiance,Zhonya's Hourglass
Gangplank|top|crit_fighter|Irelia,Riven,Pantheon,Renekton,Akshan,Kled|Nasus,Ornn,Mordekaiser,Kayle,Sion,Chogath|GraspOfTheUndying|Trinity Force,Navori Flickerblade,Infinity Edge|Ionian Boots of Lucidity
Garen|top|bruiser|Vayne,Quinn,Teemo,Kayle,Darius,Mordekaiser|Yasuo,Yone,Gwen,Aatrox,Akali,Riven|Conqueror|Stridebreaker,Phantom Dancer,Infinity Edge
Gnar|top|bruiser|Irelia,Jax,Riven,Sett,Kled,Renekton|Darius,Garen,Nasus,Sion,Mordekaiser|FleetFootwork|Trinity Force,Black Cleaver,Sterak's Gage
Gragas|jungle,top,mid|ap_dps|Kindred,Graves,Nidalee|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego|PhaseRush|Liandry's Torment,Zhonya's Hourglass,Rabadon's Deathcap
Graves|jungle|lethality|Khazix,Rengar,Nocturne,Shaco|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego|FleetFootwork|The Collector,Youmuu's Ghostblade,Infinity Edge
Gwen|top,jungle|ap_bruiser|Darius,Garen,Kled,Sett,Olaf|Chogath,Sion,Ornn,Malphite,KSante,Maokai|Conqueror|Nashor's Tooth,Riftmaker,Rabadon's Deathcap
Hecarim|jungle|bruiser|Rammus,Nunu,JarvanIV,Poppy|Karthus,Ivern,Fiddlesticks,Evelynn,Kindred|PressTheAttack|Trinity Force,Sundered Sky,Spear of Shojin
Heimerdinger|mid,top,support|ap_dps|Zed,Fizz,Kassadin,Talon,Malphite,Irelia|Yasuo,Yone,Darius,Garen,Akali,Katarina|FirstStrike
Hwei|mid,support|ap_control|Zed,Fizz,Kassadin,Talon,Akali,Katarina|Lux,Ziggs,Velkoz,Annie,Malzahar,Viktor
Illaoi|top|bruiser|Vayne,Gwen,Fiora,Quinn,Kayle,Teemo|Darius,Garen,Sett,Nasus,Sion,Yorick|GraspOfTheUndying
Irelia|top,mid|duelist|Warwick,Volibear,Poppy,Sett,Pantheon,Malphite|Gangplank,Kayle,Vayne,Gwen,Aatrox,Riven
Ivern|jungle|enchanter|LeeSin,Elise,XinZhao,JarvanIV,RekSai,Nidalee,Graves|Shyvana,Lillia|SummonAery|Moonstone Renewer,Redemption,Ardent Censer
Janna|support|enchanter|Zyra,Brand,Velkoz,Xerath|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar
JarvanIV|jungle,top|bruiser|Kindred,Graves,Nidalee|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego|Conqueror|Eclipse,Black Cleaver,Sterak's Gage
Jax|top,jungle|duelist|Malphite,Poppy,Kled,Pantheon,Teemo,Garen|Fiora,Irelia,Camille,Riven,Gnar,Tryndamere|GraspOfTheUndying|Trinity Force,Sundered Sky,Sterak's Gage
Jayce|top,mid|lethality|Malphite,Pantheon,Irelia,Renekton,Kled,Gragas|Nasus,Kayle,Sion,Gangplank,Gwen,Vladimir|FirstStrike|Youmuu's Ghostblade,The Collector,Serylda's Grudge
Jhin|adc|marksman_crit|Draven,Lucian,Kalista,Samira,Nilah,Tristana|Jinx,KogMaw,Twitch,Aphelios,Vayne|FleetFootwork|The Collector,Infinity Edge,Rapid Firecannon
Jinx|adc|marksman_crit|Draven,Lucian,Kalista,Caitlyn,Varus,Samira,Nilah|KogMaw,Smolder,Vayne
KSante|top|tank|Vayne,Gwen,Fiora,Kayle,Olaf,Mordekaiser|Aatrox,Riven,Renekton,Sett,Yasuo,Yone|GraspOfTheUndying|Black Cleaver,Sundered Sky,Kaenic Rookern
Kaisa|adc|marksman_onhit|Draven,Lucian,Kalista,Caitlyn,Varus,Samira,Nilah|Ezreal,Smolder|LethalTempo|Kraken Slayer,Nashor's Tooth,Guinsoo's Rageblade
Kalista|adc|marksman_onhit|Caitlyn,Varus,Ziggs|Jhin,Ezreal,MissFortune,Xayah,Ashe,Jinx,KogMaw
Karma|support,mid|enchanter|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Sona,Soraka,Yuumi,Milio,Nami,Lulu,Renata|SummonAery|Malignance,Imperial Mandate,Redemption
Karthus|jungle,mid|ap_dps|LeeSin,Elise,XinZhao,JarvanIV,RekSai,Nidalee,Graves|Amumu,Sejuani,Zac,Nunu,Rammus,Skarner|DarkHarvest|Liandry's Torment,Blackfire Torch,Rabadon's Deathcap
Kassadin|mid|ap_burst|Talon,Zed,Pantheon,Irelia,Yone,Qiyana|Ahri,Syndra,Orianna,Viktor,Anivia,Veigar|FleetFootwork|Rod of Ages,Malignance,Rabadon's Deathcap
Katarina|mid|ap_assassin|Galio,Lissandra,Malzahar,Diana,Annie,Kayle|Lux,Xerath,Velkoz,Ziggs,Orianna,Syndra|Electrocute|Nashor's Tooth,Shadowflame,Rabadon's Deathcap
Kayle|top|ap_onhit|Irelia,Jax,Darius,Renekton,Pantheon,Riven|Ornn,Malphite,Chogath,Sion,Nasus,Maokai
Kayn|jungle|lethality|LeeSin,Elise,XinZhao,JarvanIV,RekSai,Graves,Vi|Karthus,Lillia|Electrocute|Youmuu's Ghostblade,Opportunity,Edge of Night
Kennen|top|ap_burst|Irelia,Renekton,Malphite,Pantheon,Riven,Yone|Garen,Nasus,Sion,Chogath,Gnar,Ornn|FirstStrike|Stormsurge,Zhonya's Hourglass,Shadowflame
Khazix|jungle|lethality|Amumu,Sejuani,Zac,Nunu,Rammus,Skarner,Poppy|Karthus,Lillia,Kindred,Nidalee,Elise,Graves,Ivern
Kindred|jungle|marksman_crit|Khazix,Rengar,Nocturne,Shaco,Hecarim|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego|LethalTempo|Kraken Slayer,Blade of The Ruined King,Infinity Edge
Kled|top|bruiser|Quinn,Vayne,Kennen,Teemo,Malphite,Ornn|Camille,Jayce,Nasus,Gwen,Sion,Riven|Conqueror|Black Cleaver,Sundered Sky,Sterak's Gage
KogMaw|adc|marksman_onhit|Draven,Lucian,Kalista,Caitlyn,Varus,Samira,Nilah|Kaisa,Zeri
Leblanc|mid|ap_burst|Galio,Malzahar,Kassadin,Vex,Lissandra,Diana|Xerath,Lux,Velkoz,Ziggs,Ahri,Syndra
LeeSin|jungle|bruiser|Rammus,Poppy,Sejuani|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego|Conqueror|Eclipse,Black Cleaver,Sterak's Gage
Leona|support|engage_support|Janna,Morgana,Braum,Zyra,Brand,Velkoz,Xerath|Sona,Soraka,Yuumi,Nami,Lulu,Milio,Renata
Lillia|jungle,top|ap_bruiser|LeeSin,Elise,XinZhao,JarvanIV,RekSai,Nidalee,Graves|Amumu,Sejuani,Zac,Nunu,Rammus,Skarner|Conqueror|Liandry's Torment,Riftmaker,Rylai's Crystal Scepter
Lissandra|mid|ap_control|Kassadin,Cassiopeia,Ryze,Viktor,Swain,Anivia|Zed,Katarina,Akali,Fizz,Talon,Qiyana|Electrocute|Luden's Companion,Zhonya's Hourglass,Shadowflame
Lucian|adc,mid|marksman_spell|Varus|Jhin,Ezreal,MissFortune,Xayah,Ashe,Jinx,KogMaw
Lulu|support|enchanter|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Yuumi,Soraka
Lux|mid,support|ap_control|Fizz,Kassadin,Zed,Talon,Yasuo,Katarina|Anivia,Malzahar,Veigar,Galio,Lissandra,Annie
Malphite|top,mid,support|tank|Mordekaiser,Gwen,Olaf,Sylas,Garen,Kayle|Yasuo,Yone,Fiora,Tryndamere,Jax,Irelia|PhaseRush|Sunfire Aegis,Thornmail,Frozen Heart
Malzahar|mid|ap_dps|Kassadin,Xerath,Velkoz,Syndra,Orianna,Ziggs|Akali,Fizz,Katarina,Ekko,Leblanc,Zed
Maokai|top,jungle,support|tank|Fiora,Vayne,Gwen,Kayle,Olaf,Mordekaiser|Riven,Yasuo,Yone,Irelia,Akali,Kled
MasterYi|jungle|marksman_onhit|LeeSin,Elise,XinZhao,JarvanIV,RekSai,Nidalee,Graves|Ivern,Fiddlesticks
Mel|mid,support|ap_burst|Fizz,Kassadin,Zed,Katarina,Akali,Talon|Xerath,Lux,Velkoz,Ziggs,Syndra,Orianna
Milio|support|enchanter|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Yuumi
MissFortune|adc|marksman_crit|Draven,Lucian,Kalista|KogMaw,Jinx,Twitch,Vayne,Aphelios,Sivir|PressTheAttack|The Collector,Youmuu's Ghostblade,Infinity Edge
MonkeyKing|jungle,top|bruiser|Rammus,Poppy,Sejuani|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego
Mordekaiser|top|ap_bruiser|Vayne,Fiora,Gwen,Quinn,Olaf,Teemo|Malphite,Ornn,Sion,Chogath,KSante,Garen|Conqueror|Riftmaker,Liandry's Torment,Rylai's Crystal Scepter
Morgana|support,mid,jungle|ap_dps|Zyra,Brand,Velkoz,Xerath|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|ArcaneComet|Zhonya's Hourglass,Liandry's Torment,Rylai's Crystal Scepter
Naafiri|mid|lethality|Galio,Malzahar,Lissandra,Annie,Vex,Pantheon|Xerath,Lux,Velkoz,Ziggs,Syndra,Orianna
Nami|support|enchanter|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Yuumi,Soraka,Sona
Nasus|top|duelist|Darius,Teemo,Vayne,Quinn,Kennen,Illaoi|Malphite,Ornn,Sion,Chogath,Yorick|FleetFootwork|Trinity Force,Iceborn Gauntlet,Spirit Visage
Nautilus|support|engage_support|Janna,Morgana,Braum,TahmKench|Zyra,Brand,Xerath,Velkoz,Lux,Seraphine,Swain
Neeko|mid,support|ap_burst|Zed,Fizz,Kassadin,Talon,Yasuo,Xerath|Akali,Katarina,Yone,Irelia,Sylas,Annie
Nidalee|jungle|ap_burst|Khazix,Rengar,Nocturne,Shaco|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego|DarkHarvest|Luden's Companion,Shadowflame,Rabadon's Deathcap
Nilah|adc|marksman_crit|Caitlyn,Varus,Ashe,Ziggs|Jinx,KogMaw,Twitch,Aphelios,Smolder,Sivir,Vayne|Conqueror
Nocturne|jungle|bruiser|Rammus,Poppy,Udyr,Warwick,JarvanIV,XinZhao|Karthus,Lillia,Kindred,Nidalee,Elise,Graves,Ivern|Conqueror|Stridebreaker,Black Cleaver,Death's Dance
Nunu|jungle|tank|Karthus,Lillia,Shyvana,Graves,Kindred,Fiddlesticks|MasterYi,Belveth,Viego,Briar,Khazix,Rengar,Kayn|PhaseRush|Liandry's Torment,Sunfire Aegis,Heartsteel
Olaf|top,jungle|bruiser|Teemo,Quinn,Kennen,Vayne,Poppy|Mordekaiser,Gwen,Sion,Chogath,Ornn,Garen
Orianna|mid|ap_control|Zed,Fizz,Kassadin,Talon,Akali,Katarina|Lux,Veigar,Annie,Malzahar,Galio,Lissandra
Ornn|top|tank|Fiora,Vayne,Gwen,Mordekaiser,Kayle,Olaf|Riven,Yasuo,Yone,Gnar,Aatrox,Renekton
Pantheon|top,mid,support,jungle|lethality|Malphite,Poppy,Sion,Ornn,Garen|Kayle,Fiora,Irelia,Vayne,Jayce,Gangplank|Conqueror|Eclipse,Black Cleaver,Serylda's Grudge
Poppy|top,jungle,support|tank|Vayne,Mordekaiser,Gwen,Kayle,Gragas|Irelia,Jax,Fiora,Yasuo,Yone,Camille
Pyke|support|lethality|Janna,Morgana,Braum,TahmKench|Zyra,Brand,Xerath,Velkoz,Lux,Seraphine,Swain|HailOfBlades|Youmuu's Ghostblade,Opportunity,Umbral Glaive
Qiyana|mid,jungle|lethality|Galio,Lissandra,Malzahar,Annie,Vex,Pantheon|Xerath,Lux,Velkoz,Ziggs,Syndra,Orianna
Quinn|top|lethality|Malphite,Poppy,Pantheon,Riven,Irelia,Jax|Darius,Nasus,Garen,Mordekaiser,Illaoi,Kled|PressTheAttack|Youmuu's Ghostblade,The Collector,Lord Dominik's Regards
Rakan|support|engage_support|Janna,Morgana,Braum,Zyra,Brand,Velkoz,Xerath|Sona,Soraka,Yuumi,Nami,Lulu,Milio,Renata|Guardian|Celestial Opposition,Redemption,Locket of the Iron Solari
Rammus|jungle|tank|Karthus,Lillia,Shyvana,Graves,Kindred|MasterYi,Belveth,Viego,Briar,Khazix,Rengar,Kayn|PhaseRush|Thornmail,Sunfire Aegis,Randuin's Omen
RekSai|jungle|bruiser|Rammus,Poppy,Sejuani|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego
Rell|support|engage_support|Janna,Morgana,Braum,Zyra,Brand,Velkoz,Xerath|Sona,Soraka,Yuumi,Nami,Lulu,Milio,Renata|Aftershock
Renata|support|enchanter|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Yuumi,Sona|Guardian|Dream Maker,Imperial Mandate,Redemption
Renekton|top|bruiser|Quinn,Vayne,Teemo,Malphite,Illaoi,Poppy|Kayle,Gangplank,Jayce,Yasuo,Riven,Kennen
Rengar|jungle,top|lethality|Amumu,Sejuani,Zac,Nunu,Rammus,Skarner,Poppy|Karthus,Lillia,Kindred,Nidalee,Elise,Graves,Ivern
Riven|top|bruiser|Renekton,Poppy,Malphite,Jax,Garen,Kled|Gangplank,Kayle,Teemo,Chogath,Tryndamere,Gnar|Conqueror|Eclipse,Profane Hydra,Sterak's Gage
Rumble|top,mid|ap_dps|Irelia,Fiora,Olaf,Kled,Gwen,Mordekaiser|Garen,Nasus,Sion,Chogath,Malphite,Ornn|PhaseRush|Liandry's Torment,Riftmaker,Zhonya's Hourglass
Ryze|mid,top|ap_control|Zed,Talon,Kassadin,Fizz,Yasuo|Viktor,Velkoz,Anivia,Lux,Xerath,Syndra|PhaseRush|Rod of Ages,Archangel's Staff,Cosmic Drive
Samira|adc|marksman_crit|Caitlyn,Varus,Ashe,Ziggs|Jinx,KogMaw,Twitch,Aphelios,Smolder,Sivir,Vayne|Conqueror|The Collector,Infinity Edge,Bloodthirster
Sejuani|jungle|tank|Karthus,Lillia,Shyvana,Graves,Kindred|MasterYi,Belveth,Viego,Briar,Khazix,Rengar,Kayn|GraspOfTheUndying
Senna|support,adc|lethality|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Soraka,Sona,Yuumi,Milio|FleetFootwork|Youmuu's Ghostblade,The Collector,Lord Dominik's Regards
Seraphine|support,mid,adc|ap_control|Blitzcrank,Thresh,Nautilus,Pyke|Sona,Yuumi,Soraka,Milio|SummonAery|Moonstone Renewer,Malignance,Redemption
Sett|top,support|bruiser|Vayne,Quinn,Kayle,Teemo,Kennen|Irelia,Yasuo,Yone,Camille,Garen,Riven|Conqueror|Stridebreaker,Sterak's Gage,Death's Dance
Shaco|jungle,support|lethality|Rammus,Poppy,Udyr,Warwick,JarvanIV,XinZhao|Karthus,Lillia,Kindred,Nidalee,Elise,Graves,Ivern
Shen|top,support|tank|Gwen,Mordekaiser,Vayne,Illaoi,Darius,Gangplank|Tryndamere,Yasuo,Yone,Kled,Pantheon,Riven
Shyvana|jungle|ap_bruiser|LeeSin,Elise,XinZhao,JarvanIV,RekSai,Nidalee,Graves|Amumu,Sejuani,Zac,Nunu,Rammus,Skarner
Singed|top|tank|Vayne,Quinn,Kayle,Teemo,Mordekaiser,Gwen|Darius,Garen,Nasus,Sion,Chogath,Sett|Conqueror|Riftmaker,Liandry's Torment,Rylai's Crystal Scepter
Sion|top|tank|Fiora,Vayne,Gwen,Mordekaiser,Darius,Olaf|Yorick,Aatrox,Riven,Yasuo
Sivir|adc|marksman_crit|Draven,Lucian,Kalista,Caitlyn,Samira,Nilah,Tristana|KogMaw,Twitch
Skarner|jungle,top|tank|Karthus,Lillia,Shyvana|MasterYi,Belveth,Viego,Briar,Khazix,Rengar,Kayn
Smolder|adc,mid|marksman_spell|Draven,Lucian,Kalista,Caitlyn,Varus,Samira,Nilah|KogMaw|FleetFootwork|Essence Reaver,Navori Flickerblade,Infinity Edge
Sona|support|enchanter|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Yuumi
Soraka|support|enchanter|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Yuumi
Swain|mid,support,adc|ap_dps|Xerath,Ziggs,Velkoz,Orianna,Kassadin,Viktor|Yasuo,Yone,Akali,Katarina,Fizz,Zed|Conqueror|Liandry's Torment,Rylai's Crystal Scepter,Riftmaker
Sylas|mid,jungle|ap_assassin|Galio,Pantheon,Renekton,Cassiopeia,Lissandra,Annie|Lux,Brand,Ahri,Syndra,Xerath,Velkoz|Electrocute|Hextech Rocketbelt,Shadowflame,Rabadon's Deathcap
Syndra|mid|ap_control|Fizz,Kassadin,Zed,Yasuo,Talon,Akali|Lux,Veigar,Annie,Lissandra,Malzahar,Galio
TahmKench|support,top|tank|Zyra,Brand,Velkoz,Xerath|Blitzcrank,Pyke,Nautilus
Taliyah|mid,jungle|ap_control|Zed,Fizz,Kassadin,Talon,Yasuo,Qiyana|Ryze,Viktor,Velkoz,Lux,Xerath,Galio
Talon|mid,jungle|lethality|Malphite,Galio,Lissandra,Malzahar,Pantheon,Vex|Xerath,Lux,Velkoz,Ziggs,Orianna,Syndra
Taric|support|engage_support|Janna,Morgana,Braum,Zyra,Brand,Velkoz,Xerath|Sona,Soraka,Yuumi,Nami,Lulu,Milio,Renata|Guardian
Teemo|top|ap_onhit|Pantheon,Irelia,Jayce,Kennen,Quinn,Vayne|Darius,Garen,Nasus,Sett,Olaf,Mordekaiser|PressTheAttack|Nashor's Tooth,Liandry's Torment,Malignance
Thresh|support|engage_support|Janna,Morgana,Braum|Zyra,Brand,Xerath,Velkoz,Lux,Seraphine,Swain
Tristana|adc,mid|marksman_crit|Caitlyn,Varus|Jinx,KogMaw,Twitch,Aphelios,Smolder,Sivir,Vayne|Electrocute|The Collector,Infinity Edge,Lord Dominik's Regards
Trundle|top,jungle|duelist|Vayne,Quinn,Teemo,Kennen,Darius,Kayle|Chogath,Sion,Ornn,Malphite,Maokai,KSante|LethalTempo
Tryndamere|top,mid|crit_fighter|Malphite,Poppy,Shen,Teemo,Quinn,Jax|Kayle,Gangplank,Sion,Nasus,Yorick,Chogath
TwistedFate|mid|ap_burst|Zed,Talon,Fizz,Katarina,Kassadin,Qiyana|Lux,Veigar,Galio,Anivia,Orianna,Malzahar|LethalTempo|Nashor's Tooth,Lich Bane,Rabadon's Deathcap
Twitch|adc,support|marksman_onhit|Draven,Lucian,Kalista,Caitlyn,Varus,Samira,Nilah|Smolder,Ezreal
Udyr|jungle,top|tank|Kindred,Graves,Nidalee|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego|PhaseRush|Sunfire Aegis,Iceborn Gauntlet,Spirit Visage
Urgot|top|bruiser|Vayne,Quinn,Kayle,Fiora,Gwen,Teemo|Darius,Garen,Sett,Ornn,Sion,Chogath|Conqueror
Varus|adc|marksman_onhit|Ezreal|Samira,Nilah,Tristana,Jinx,KogMaw,Twitch,Aphelios|LethalTempo
Vayne|adc,top|marksman_onhit|Draven,Lucian,Kalista,Caitlyn,Varus,Samira,Nilah|KogMaw,Kaisa
Veigar|mid,support|ap_control|Xerath,Velkoz,Ziggs,Lux,Kassadin,Syndra|Katarina,Akali,Yasuo,Yone,Irelia,Sylas|Electrocute|Luden's Companion,Rabadon's Deathcap,Shadowflame
Velkoz|mid,support|ap_control|Zed,Fizz,Kassadin,Talon,Katarina,Akali|Malzahar,Lux,Annie,Galio,Veigar,Lissandra
Vex|mid|ap_burst|Xerath,Velkoz,Ziggs,Lux,Orianna,Syndra|Akali,Fizz,Katarina,Yasuo,Yone,Ekko
Vi|jungle|bruiser|Rammus,Poppy,Sejuani|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego
Viego|jungle|duelist|LeeSin,Elise,XinZhao,JarvanIV,RekSai,Nidalee,Graves|Ivern,Fiddlesticks|Conqueror|Blade of The Ruined King,Kraken Slayer,Sterak's Gage
Viktor|mid|ap_control|Zed,Fizz,Kassadin,Talon,Katarina,Akali|Malzahar,Lux,Orianna,Anivia,Veigar,Galio|FirstStrike
Vladimir|mid,top|ap_dps|Talon,Zed,Syndra,Annie,Xerath,Pantheon|Galio,Lissandra,Malzahar,Kassadin,Veigar,Sylas|PhaseRush|Hextech Rocketbelt,Cosmic Drive,Rabadon's Deathcap
Volibear|top,jungle|ap_bruiser|Vayne,Quinn,Kayle,Teemo,Gwen,Fiora|Irelia,Yasuo,Yone,Riven,Akali,Camille|GraspOfTheUndying|Riftmaker,Liandry's Torment,Sunfire Aegis
Warwick|jungle,top|duelist|Rammus,Poppy,Sejuani|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego|Conqueror
XinZhao|jungle|bruiser|Rammus,Poppy,Sejuani|Karthus,Shyvana,MasterYi,Lillia,Fiddlesticks,Belveth,Viego|Conqueror|Trinity Force,Sundered Sky,Sterak's Gage
Xayah|adc|marksman_crit|Draven,Lucian,Kalista|Jinx,KogMaw,Smolder,Aphelios
Xerath|mid,support|ap_control|Zed,Fizz,Kassadin,Talon,Katarina,Akali|Malzahar,Annie,Veigar,Lissandra,Anivia,Galio
Yasuo|mid,top,adc|crit_fighter|Malphite,Pantheon,Renekton,Annie,Lissandra,Vex|Xerath,Ziggs,Velkoz,Lux,Ahri,Syndra
Yone|top,mid|crit_fighter|Pantheon,Malphite,Renekton,Annie,Lissandra,Vex|Zed,Ahri,Syndra,Viktor,Lux,Xerath|Conqueror
Yorick|top|bruiser|Gwen,Jax,Irelia,Renekton,Riven,Pantheon|Chogath,Ornn,Malphite,Kayle|Conqueror|Trinity Force,Sundered Sky,Black Cleaver
Yunara|adc|marksman_onhit|Draven,Lucian,Kalista,Caitlyn,Varus,Samira,Nilah|KogMaw,Smolder|LethalTempo
Yuumi|support|enchanter|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar||SummonAery
Zac|jungle,top,support|tank|Karthus,Lillia,Shyvana,Graves,Kindred,Fiddlesticks|MasterYi,Belveth,Viego,Briar,Khazix,Rengar,Kayn|Aftershock
Zed|mid,jungle|lethality|Lissandra,Malzahar,Galio,Vex,Annie,Malphite|Xerath,Velkoz,Lux,Ziggs,Syndra,Orianna
Zeri|adc|marksman_crit|Draven,Lucian,Kalista,Caitlyn,Varus,Samira,Nilah|Aphelios,Smolder|LethalTempo|Kraken Slayer,Runaan's Hurricane,Infinity Edge
Ziggs|mid,adc|ap_control|Zed,Fizz,Kassadin,Talon,Yasuo,Katarina|Malzahar,Annie,Veigar,Lissandra,Galio,Vladimir|FirstStrike
Zilean|support,mid|enchanter|Blitzcrank,Thresh,Nautilus,Pyke,Leona,Rell,Alistar|Yuumi,Soraka|ArcaneComet
Zoe|mid|ap_burst|Fizz,Kassadin,Zed,Talon,Yasuo,Yone|Malzahar,Annie,Lux,Veigar,Galio,Lissandra
Zyra|support,mid|ap_dps|Blitzcrank,Thresh,Nautilus,Pyke|Leona,Rell,Alistar,Rakan,Taric,Janna,Morgana|ArcaneComet
`;
