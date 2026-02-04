/* =========================================================
       1) RACES PAR DÉFAUT (Injection automatique)
       - Ici tu définis les cartes de race qui doivent exister au chargement.
       - IMPORTANT : on ne les duplique pas si elles sont déjà présentes.
       ========================================================= */
    
    const DEFAULT_RACES = [
      'Beastman 🦁','Kadmerian (Nain)','Seishin 👻','Dunkel 😈','Géant 🪓',
      'Qoog','Lizardman','Chitine','Samshioune','Riviera','Witch','Manifest','Vampire','Driade','Dokaebi',
      'Ouga','Undead','Shinobi',/*'Deep Sea',*/'Elf','Yaugestor','Oni','Aid','Volture','Emporium','Humain',
      'Hymne'/*,'TAZ'*/];

      if (!Array.isArray(appState.races.cards)) appState.races.cards = [];
    DEFAULT_RACES.forEach(raceLabel => {
      if (!appState.races.cards.includes(raceLabel)) {
        appState.races.cards.push(raceLabel);
      }
    });

/* =========================================================
       2) talent PAR DÉFAUT (Injection automatique)
       - Ici tu définis les cartes de talent qui doivent exister au chargement.
       - IMPORTANT : on ne les duplique pas si elles sont déjà présentes.
       ========================================================= */
    const DEFAULT_talent = [

    'Force' , 'Agiliter' , 'Fortidude' , 'auto-dodge' , 'aura farm' , 'tank passive' , 'Charisme' , 'Inteligeance' , 'Gilga drafting passive' ,
    'gilga draft' , 'health passive' ,'m1 passive' , 'willpower' ,'ki passive' ,'chi'];

    if (!Array.isArray(appState.talent.cards)) appState.talent.cards = [];
    DEFAULT_talent.forEach(talentLabel => {
      if (!appState.talent.cards.includes(talentLabel)) {
        appState.talent.cards.push(talentLabel);
      }
    });
/* =========================================================
       3) classes MAIN / SECONDARY / SPECIAL / RACIAL PAR DÉFAUT (Injection automatique)
       - Ici tu définis les cartes de classes qui doivent exister au chargement.
       - IMPORTANT : on ne les duplique pas si elles sont déjà présentes.
       ========================================================= */

// --- Définition des classes par catégorie ---
const DEFAULT_CLASSES = {
  main: [
    'Dominator', 'Save', 'Henkan', 'Mancer', 'Rampage', 'Blader'
  ],
  secondary: [
    'Gilga Crit', 'Weaponery', 'Mirror', 'Shinobi', 'Bladed Caster', 'Wicked'
  ],
  special: [
    'Tomodachi', 'Pordigy', 'Powers', 'Warlock', 'Savage', 'Scale', 'Kodex'
  ],
  racial: [
    'Shinobi²', 'Wicked²'
  ]
};

// --- Fonction générique pour synchroniser une catégorie ---
function syncClasseCategory(categoryName) {
  const defaultList = DEFAULT_CLASSES[categoryName];

  if (!Array.isArray(appState[`classe_${categoryName}`].cards)) {
    appState[`classe_${categoryName}`].cards = [];
  }

  defaultList.forEach(label => {
    if (!appState[`classe_${categoryName}`].cards.includes(label)) {
      appState[`classe_${categoryName}`].cards.push(label);
    }
  });
}

// --- Appels pour chaque catégorie ---
syncClasseCategory('main');
syncClasseCategory('secondary');
syncClasseCategory('special');
syncClasseCategory('racial');

/* =========================================================
       4) armes PAR DÉFAUT (Injection automatique)
       - Ici tu définis les cartes de armes qui doivent exister au chargement.
       - IMPORTANT : on ne les duplique pas si elles sont déjà présentes.
       ========================================================= */

    const DEFAULT_ARMES = [
      'Weapon Type ⚔️ : Lames', 'Weapon Type 🗡️ : Caché/ Petite Armes', 'Weapon Type 🥊 : Arme Non Contendante',
      'Weapon Type 🪄 : Arme Magique', 'Weapon Type 🏹 : Arme a Distance', 'Weapon Type 🎤 : Arme Musical',
      'Weapon Type 👊 : Non Armé', 'Weapon Type ✂️ : Arme Non Conventionel', 'Weapon type🔱: Trident, Lance, Hallebard'
    ]

    if (!Array.isArray(appState.armes.cards)) appState.armes.cards = [];
    DEFAULT_ARMES.forEach(armesLabel => {
      if (!appState.armes.cards.includes(armesLabel)) {
        appState.armes.cards.push(armesLabel);
      }
    });

    

    /* =========================================================
       5) ***** PAR DÉFAUT (Injection automatique)
       - Ici tu définis les cartes de ***** qui doivent exister au chargement.
       - IMPORTANT : on ne les duplique pas si elles sont déjà présentes.
       ========================================================= */


saveState(appState);