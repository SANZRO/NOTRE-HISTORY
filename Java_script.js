

/* =========================================================
   1) FOND ÉTOILÉ
   ========================================================= */
const bgStars = document.getElementById('bgStars');

function generateStars(count = 160) {
  bgStars.querySelectorAll('.star').forEach(s => s.remove());
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() < 0.85 ? 4 : 6;
    star.style.width  = size + 'px';
    star.style.height = size + 'px';
    star.style.left   = (Math.random() * 100) + 'vw';
    star.style.top    = (Math.random() * 100) + 'vh';
    star.style.animationDuration = (1.6 + Math.random() * 2.4) + 's';
    star.style.animationDelay    = (Math.random() * 2) + 's';
    bgStars.appendChild(star);
  }
  const meteor = document.getElementById('meteorOne');
  if (meteor) meteor.style.animationDelay = (Math.random() * 3) + 's';
}

document.addEventListener('DOMContentLoaded', () => generateStars(160));


/* =========================================================
   2) PERSISTANCE (localStorage)
   ========================================================= */
const STORAGE_KEY = 'trello_categories_v1';

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (e) {}
}


/* =========================================================
   3) STATE + DEFAULTS
   ========================================================= */
let appState = {
  races:  { desc: '', cards: [] },
  talent: { desc: '', cards: [] },
  classe: { desc: '', cards: [] },
  trait:  { desc: '', cards: [] },
  magie:  { desc: '', cards: [] },
  arme:   { desc: '', cards: [] },
  ...loadState()
};

const DEFAULT_RACES = [
  'Beastman 🦁','Kadmerian (Nain)','Seishin 👻','Dunkel 😈','Géant 🪓',
  'Qoog','Lizardman','Chitine','Samshioune','Riviera','Witch','Manifest',
  'Vampire','Driade','Dokaebi','Ouga','Undead','Shinobi','Elf','Yaugestor',
  'Oni','Aid','Volture','Emporium','Humain','Hymne'
];

const DEFAULT_TALENT = [
  'Force','Agiliter','Fortidude','auto-dodge','aura farm','tank passive',
  'Charisme','Inteligeance','Gilga drafting passive','gilga draft',
  'health passive','m1 passive','willpower','ki passive','chi'
];

// inject races
if (!Array.isArray(appState.races.cards)) appState.races.cards = [];
DEFAULT_RACES.forEach(label => {
  if (!appState.races.cards.includes(label)) appState.races.cards.push(label);
});

// inject talents
if (!Array.isArray(appState.talent.cards)) appState.talent.cards = [];
DEFAULT_TALENT.forEach(label => {
  if (!appState.talent.cards.includes(label)) appState.talent.cards.push(label);
});

saveState(appState);


/* =========================================================
   4) UTILS
   ========================================================= */
let draggedCard = null;

function normalizeText(s) {
  return (s || '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}


/* =========================================================
   5) MODAL INFRASTRUCTURE
   ========================================================= */
const infoModalOverlay = document.getElementById('infoModalOverlay');
const modalTitleEl = document.getElementById('modalTitle');
const modalBodyEl  = document.getElementById('modalBody');
const closeModalBtn = document.getElementById('closeModalBtn');

function openModal(title, htmlBody) {
  modalTitleEl.textContent = title;
  modalBodyEl.innerHTML = htmlBody;
  infoModalOverlay.style.display = 'flex';
}
function closeModal() {
  infoModalOverlay.style.display = 'none';
  modalTitleEl.textContent = 'Fiche';
  modalBodyEl.innerHTML = '';
}

closeModalBtn.addEventListener('click', closeModal);
infoModalOverlay.addEventListener('click', (e) => {
  if (e.target === infoModalOverlay) closeModal();
});


/* =========================================================
   6) ROUTAGE TALENTS (corrigé)
   ========================================================= */
// ⚠️ Mets ici tes vrais openAgiliterModal/openFortidudeModal etc quand tu les auras.
// Pour éviter crash, je mets des stubs qui ouvrent une modal vide.
function stubTalent(name) {
  openModal(name, `<div class="mono">Fiche "${name}" à compléter.</div>`);
}

const TALENT_ROUTES = {
  'force': openforceModal,
  'agiliter': () => stubTalent('Agiliter'),
  'fortidude': () => stubTalent('Fortidude'),
  'auto-dodge': () => stubTalent('auto-dodge'),
  'aura farm': () => stubTalent('aura farm'),
  'tank passive': () => stubTalent('tank passive'),
  'charisme': () => stubTalent('Charisme'),
  'inteligeance': () => stubTalent('Inteligeance'),
  'gilga drafting passive': () => stubTalent('Gilga drafting passive'),
  'gilga draft': () => stubTalent('gilga draft'),
  'health passive': () => stubTalent('health passive'),
  'm1 passive': () => stubTalent('m1 passive'),
  'willpower': () => stubTalent('willpower'),
  'ki passive': () => stubTalent('ki passive'),
  'chi': () => stubTalent('chi')
};

function tryOpenTalentByKey(keyNorm) {
  for (const token in TALENT_ROUTES) {
    if (keyNorm.includes(token)) {
      TALENT_ROUTEStoken;   // ✅ correction ici
      return true;
    }
  }
  return false;
}


/* =========================================================
   7) createCard + click routes
   ========================================================= */
function createCard(text) {
  const card = document.createElement('div');
  card.className = 'trello-card';
  card.textContent = text;
  card.draggable = true;

  card.addEventListener('dragstart', () => {
    draggedCard = card;
    card.style.opacity = '0.5';
  });
  card.addEventListener('dragend', () => {
    draggedCard = null;
    card.style.opacity = '1';
  });

  card.addEventListener('click', () => {
    const key = normalizeText(text);

    // talents d'abord
    if (tryOpenTalentByKey(key)) return;

    // races
    if (key.includes('beastman')) openBeastmanModal();
    else if (key.includes('kadmerian')) openKadmerianModal();
    else if (key.includes('seishin')) openSeishinModal();
    else if (key.includes('dunkel')) openDunkelModal();
    else if (key.includes('geant')) openGeantModal();
    else if (key.includes('qoog')) openQoogModal();
    else if (key.includes('lizardman')) openLizardmanModal();
    else if (key.includes('chitine')) openChitineModal();
    else if (key.includes('samshioune')) openSamshiouneModal();
    else if (key.includes('riviera')) openRivieraModal();
    else if (key.includes('witch')) openWitchModal();
    else if (key.includes('manifest')) openManifestModal();
    else if (key.includes('vampire')) openVampireModal();
    else if (key.includes('driade')) openDriadeModal();
    else if (key.includes('dokaebi')) openDokaebiModal();
    else if (key.includes('ouga')) openOugaModal();
    else if (key.includes('undead')) openUndeadModal();
    else if (key.includes('shinobi')) openShinobiModal();
    else if (key.includes('elf')) openElfModal();
    else if (key.includes('yaugestor')) openYaungestorModal();
    else if (key.includes('oni')) openOniModal();
    else if (key.includes('aid')) openAidModal();
    else if (key.includes('volture')) openVoltureModal();
    else if (key.includes('emporium')) openEmporiumModal();
    else if (key.includes('humain')) openHumainModal();
    else if (key.includes('hymne')) openHymneModal();
  });

  return card;
}


/* =========================================================
   8) sync + render
   ========================================================= */
function syncFromDOMToState(colKey) {
  const colEl = document.querySelector(`.trello-column[data-column="${colKey}"]`);
  const listEl = colEl.querySelector('.trello-list');
  const cards = Array.from(listEl.querySelectorAll('.trello-card')).map(c => c.textContent);
  const desc = colEl.querySelector('.hidden-content').value || '';
  appState[colKey] = { desc, cards };
  saveState(appState);
}

function renderState() {
  ['races', 'talent', 'classe', 'trait', 'magie', 'arme'].forEach(colKey => {
    const colEl = document.querySelector(`.trello-column[data-column="${colKey}"]`);
    if (!colEl) return;
    const listEl = colEl.querySelector('.trello-list');
    const area   = colEl.querySelector('.hidden-content');

    area.value = appState[colKey]?.desc || '';
    listEl.innerHTML = '';

    (appState[colKey]?.cards || []).forEach(cardText => {
      listEl.appendChild(createCard(cardText));
    });
  });
}

renderState();


/* =========================================================
   9) Add card buttons
   ========================================================= */
document.querySelectorAll('.addCardBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const colEl = btn.closest('.trello-column');
    const colKey = colEl.dataset.column;

    const text = prompt('Nom de la carte :');
    if (!text) return;

    const listEl = colEl.querySelector('.trello-list');
    const existing = Array.from(listEl.querySelectorAll('.trello-card')).map(c => c.textContent);
    if (existing.includes(text)) {
      alert('Cette carte existe déjà dans cette colonne.');
      return;
    }

    listEl.appendChild(createCard(text));
    syncFromDOMToState(colKey);
  });
});


/* =========================================================
   10) Drag & Drop
   ========================================================= */
document.querySelectorAll('.trello-list').forEach(list => {
  list.addEventListener('dragover', e => e.preventDefault());
  list.addEventListener('drop', () => {
    if (!draggedCard) return;

    const fromCol = draggedCard.closest('.trello-column').dataset.column;
    list.appendChild(draggedCard);
    const toCol = list.closest('.trello-column').dataset.column;

    syncFromDOMToState(fromCol);
    syncFromDOMToState(toCol);
  });
});


/* =========================================================
   11) Toggle textarea
   ========================================================= */
document.querySelectorAll('.toggleBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const area = btn.closest('.trello-column').querySelector('.hidden-content');
    const visible = area.style.display === 'block';
    area.style.display = visible ? 'none' : 'block';
  });
});


/* =========================================================
   12) Autosave textarea
   ========================================================= */
document.querySelectorAll('.hidden-content').forEach(area => {
  area.addEventListener('input', () => {
    const colKey = area.closest('.trello-column').dataset.column;
    syncFromDOMToState(colKey);
  });
});


/* =========================================================
   13) Back button
   ========================================================= */
document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});


/* =========================================================
   14) MODALS — ICI tu colles toutes tes fonctions openXXXModal()
   ========================================================= */

/* ========= Force (talent) ========= */
function openforceModal() {
  const contentHTML = `
    <h4>Force — Talents Pool <small style="opacity:.7">[⚪]</small></h4>

    <p class="mono" style="margin-bottom:10px">
      <strong>Conditions d’obtention</strong> : chaque talent se débloque si sa condition est remplie.
      <br>Le MJ peut ajuster les seuils/émoticônes selon le système (💪 = Force, 🩷 = HP, ❤️ = Dégâts, 🥊🤜 = m1 / coup de poing).
    </p>

    <h4>Talents</h4>
    <div class="mono">
      <ol style="padding-left:18px; margin: 0;">
        <li><strong>Bulk Up</strong> — <em>Condition</em> : posséder <strong>25(💪)+</strong><br>
            <u>Effet</u> : La stat <strong>(💪)</strong> influe désormais sur les <strong>(🩷)</strong> du personnage.
        </li><br>
        <li><strong>Pump Up</strong> — <em>Condition</em> : avoir donné <strong>10+ m1 (🥊🤜)</strong> dans la run<br>
            <u>Effet</u> : Les Dmg <strong>(❤️)</strong> au <strong>(🥊🤜)</strong> sont augmentés de <strong>((💪)/2)</strong>.
        </li><br>
        <li><strong>Arms Up</strong> — <em>Condition</em> : avoir <strong>bloqué 15+ m1 (🥊🤜)</strong><br>
            <u>Effet</u> : La stat <strong>(💪)</strong> est prise en compte lorsqu’il doit bloquer une attaque.
        </li><br>
        <li><strong>Push Down</strong> — <em>Condition</em> : posséder <strong>45(💪)+</strong> et faire <strong>1m75+</strong><br>
            <u>Effet</u> : Pour chaque point de <strong>(💪)</strong> au-dessus de la cible, le personnage inflige <strong>+2 Dmg (❤️)</strong>.
        </li><br>
        <li><strong>Rush Down</strong> — <em>Condition</em> : avoir subi un dégât retirant <strong>25% (🩷)+</strong> une fois<br>
            <u>Effet</u> : À chaque palier de <strong>25% (🩷)</strong> perdu, le <strong>prochain coup (❤️)</strong> est <strong>Gilga drafté</strong>.
        </li><br>
        <li><strong>Hunt Down</strong> — <em>Condition</em> : avoir asséné <strong>5 attaques (❤️)</strong> à la tête sur une même cible<br>
            <u>Effet</u> : Les coups vers une zone sensible n’ont plus de changement au dés (20) (12) (10).
        </li>
      </ol>
    </div>

    <h4>@SPECIALZ</h4>
    <div class="mono">Test d’affichage et refonte de certains talents obsolètes.</div>
  `;
  openModal('Force — Talents Pool', contentHTML);
}

/* ========= RACE MODALS (copie EXACT de ton contenu) ========= */
/* Beastman */
function openBeastmanModal() {
  const contentHTML = `
    <h4>Stats</h4>
    <pre class="mono">{170 Hp, 10 Str, 10 Agi, 10 Ftd, Lvl 3 Poing/Pied}</pre>

    <h4>Talents</h4>
    <div class="mono">
[Animal Instinct] = Lorsque le personnage tombe à moins de 25% Hp il devra faire moins au dés (20) pour esquivé (-3)
[Primitive Instinct] = Lorsque le Personnage tombe à moins de 50% Hp il fait +75% de Dmg avec son corp
[Survival Instinct] = Le personnage peux détecté lorsqu'un individue a une plus grande valeurs de stats sur une de ses stats physique, il peux dire laquelle.
    </div>

    <h4>Apparence</h4>
    <pre class="mono">{Oreille animal, Queue (Si il y a), Dents/Moustache/Yeux}</pre>

    <h4>Capacité Spé</h4>
    <div class="mono">
{La Race a la capacité Shapeshift de naissance, leurs permettant de changé entre humanoïde et animal/monstre}
{Le Shapeshift des beastman leurs fait perdre le control mais leurs donne le scaling statistique des monstres}
{Cette race Nullifie les CC Physique non Mystic}
    </div>
  `;
  openModal('Beastman 🦁', contentHTML);
}

/* Kadmerian */
function openKadmerianModal() {
  const contentHTML = `
    <h4>Stats</h4>
    <pre class="mono">{165 Hp, 20 Str, 10 Int, +5 MnaAff}</pre>

    <h4>Talents</h4>
    <div class="mono">
[Shatter] = Le personnage peux nullifié tout les Dmg provenant d'une arme peux importe laquelle.
[Frostbite] = Le personnage résiste à tout les changement de température, le personnage est immunisé au effets de température (gel, brulure)
[Prime Prana] = Lorsqu'une arme est tenu par le personnage sa value de prana augmente de 50%
    </div>

    <h4>Apparence</h4>
    <pre class="mono">{Extrêmement Vieux/Très Jeune, Cheveux Brun/Roux/Blond, Humanoïde, Muscle Visible}</pre>

    <h4>Capacité Spé</h4>
    <div class="mono">
{Le Scaling de Hp par Ftd passe de 5 -> 10 par Ftd}
{Cette race peux manipulé tout ce qu'ils considère comme une arme dans un rayon de 10m autour d'eux}
{Cette race née avec la Possibilité d'avoir la magie Catastrophique Quake}
    </div>
  `;
  openModal('Kadmerian (Nain)', contentHTML);
}

/* Seishin */
function openSeishinModal() {
  const contentHTML = `
    <h4>Stats</h4>
    <pre class="mono">{60 Hp, Lvl 5 Magie, 20 Spirit, 10 Agi}</pre>

    <h4>Talents</h4>
    <div class="mono">
[Harmonie] = Le personnage peux être lié a un autre, La personne lié au personnage gagne 5 Pts de Stats sur toute ses stats Physique, Le personnage lié est marqué.
[Ripple] = Lorsque le personnage entre en contact direct avec la personne qu'il a marqué leurs actions demande -1 au dés, Le personnage marqué gagne dès lors 5 Pts de Stats sur toute ses stat mental.
[Sym Bio Tic] = Le personnage peux entrer dans la marque placé sur la personne lié, rentrer dans une marque supprime tout les effets de statu et les Cc du personnage, si le personnage est entrer dans la marque il régénère +5 Hp +15 Mna.
    </div>

    <h4>Apparence</h4>
    <pre class="mono">{Forme Totalement élémentaire (base Elément Lock, 15+ Ftd humanoïde élémentaire, 35+ Ftd Total Humanization), 35+ Ftd Yeux de la même couleurs que l'élément}</pre>

    <h4>Capacité Spé</h4>
    <div class="mono">
{Le race n'est touchable que par la Magie et le Mana tant qu'il possède moins de 35 Ftd}
{La race est incapable de faire des Dmg physique tant qu'il possède moins de 35 Ftd}
{La race peux passé de forme éthérique (1~34 Ftd) à forme Physique (35+ Ftd) pour 5 au dés (20)}
{Les personne marqué par cette race se Régénère 15 Hp et 10 Mna Par Tours tant que La race se trouve dans la marque}
    </div>
  `;
  openModal('Seishin 👻', contentHTML);
}

/* Dunkel */
function openDunkelModal() {
  const contentHTML = `
    <h4>Stats</h4>
    <pre class="mono">{120  Hp| 180 Hp, 10 Str, 5 Agi, 10 Ftd| 20 Ftd}</pre>

    <h4>Talents</h4>
    <div class="mono">
[Maou] = Le personnage est Obligé de Commencer Lvl 0 de Maitrise sur tout, Le personnage a besoin de 25% Moins de SparExp
[Spiritualisme] = Le personnage Gagne -2(-4 si Génis) au dés pour réussir une Suppression d'action
[Perfection] = Le personnage n'a plus aucun Elément de base ni évolué, Le personnage gagne L'élément parfait Darkness, Le Lvl cap de ça magie passe au Lvl 25
    </div>

    <h4>Apparence</h4>
    <pre class="mono">{Aucun Changement, Humanoïde, Cheveux NOIR LOCK, yeux NOIR/ROUGE LOCK}</pre>

    <h4>Capacités Spé</h4>
    <div class="mono">
{La Race peux mimique n'importe quel élément avec Darkness, Le darkness fait aucun Dmg Physique avant le Lvl 5}
{La Race peux bloqué l'usage d'une tech/atk de n'importe qui en usant du Darkness, ceci block toute ses autre action tant qu'il est maintenu}
    </div>
  `;
  openModal('Dunkel 😈', contentHTML);
}

/* Géant */
function openGeantModal() {
  const contentHTML = `
    <h4>Stats</h4>
    <pre class="mono">{500|210 Hp, 35|25 Str, 15|5 Ftd}</pre>

    <h4>Talents</h4>
    <div class="mono">
[Stronghold] = Si le personnage est immobile de sa position pendant 2+ tours alors il prend 50% moins de Dmg Physique
[AltTab] = Toute atk ou Tech que le personnage charge ou compresse est 20% plus efficace
[Kill Monger] = Tuer 5+ Ennemie dans le meme combat augmente la Str de 1x le nombre d'ennemie vaincu (Solo=100% des Dmg) apres le 5
    </div>

    <h4>Apparence</h4>
    <pre class="mono">{Blond Brun ou Roux, yeux bleu ou marron, 17~25m de haut}</pre>

    <h4>Capacité Spé</h4>
    <div class="mono">
{La Race est capable d'effectué un rituel permettant de condensé leurs force dans leurs corp en réduisant considérablement leurs volume (1/10e de leurs taille normale) au Lvl 2}
{La race Possède naturellement la capacité d'usé du prana, Leurs prana est Dorée}
    </div>
  `;
  openModal('Géant 🪓', contentHTML);
}

/* Qoog */
function openQoogModal() {
  const contentHTML = `
    <h4>Stats</h4>
    <pre class="mono">{110 Hp, 5 int, 5 will, 5 char, 10 Str, 5 Agi, 100 Mna}</pre>

    <h4>Talents</h4>
    <div class="mono">
[Nullified] = Le personnage a 3/20 chance de nullifier n'importe quel sort, tech ou atk de magie/mana dans la zone (allié compris)
[Voiding] = Le personnage devient insensible aux effets magiques ou de mana lui étant imposés (heal compris)
[Erased] = Après avoir été touché par une atk magique, une tech magique/de mana, elle a 1/40 de disparaître de la liste de skill de l'envoyeur à vie
    </div>

    <h4>Apparence</h4>
    <pre class="mono">{Porte un morceau conséquent du myth, Yeux cachés, Peau très Mâte (la mélanine)}</pre>

    <h4>Capacité Spé</h4>
    <div class="mono">
{La Race est liée à une entité mythic/mythologique et/ou mystique NATUREL du monde réel ou de notre histoire}
    </div>
  `;
  openModal('Qoog', contentHTML);
}

/* ========= FICHE : Lizardman 🦎 ========= */
function openLizardmanModal() {
  const contentHTML = `
    <h4>Stats</h4>
    <pre class="mono">{220 Hp, 10 Agi, 5 Str, 5 Will, 10 Ftd, Base Magic Resistance 15%}</pre>

    <h4>Talents</h4>
    <div class="mono">
[Mold] = Tous les effets présents sur le personnage sont annulés tous les 2 tours, s’il y a au moins 1 effet actif
[Cold Blood] = Le personnage a 5% de chance de s'endormir sur place si la température est en dessous de 0°C ; sa Stamina est triplée s’il fait “chaud”
[Tresher Scale] = Le personnage possède un shield passif de 300 Hp absorbant 90% des Dmg reçus, par Safe Zone
    </div>

    <h4>Apparence</h4>
    <pre class="mono">{Queue, Écailles, peau verte/grise, yeux noir/rouge, dents acérées, Aucun changement}</pre>

    <h4>Capacité Spé</h4>
    <div class="mono">
{3/7 individus de la race possèdent un type de poison}
{La race gagne +2 Hp pour chaque 3 de StmMax de base}
{Tous les Shields reçus par la race se transforment en Hp (ce n’est PAS un Heal)}
    </div>

    <!--
      💡 Lizardman :
      - “Base Magic Resistance 15%” est interprété comme une réduction des dégâts magiques.
      - “Tresher Scale” : le shield se régénère par Safe Zone (ta mécanique).
    -->
  `;
  openModal('Lizardman 🦎', contentHTML);
}

/* ========= FICHE : Chitine 🦗 ========= */
function openChitineModal() {
  const contentHTML = `
    <h4>Stats</h4>
    <pre class="mono">{105 | 95 | 135 Hp, 30 Str | 30 Agi | 30 Ftd}</pre>

    <h4>Talents</h4>
    <div class="mono">
[Resilience] = Le personnage a 35% de chance de ne pas mourir d'un coup fatal (1 fois par combat)
[Hemolymphe] = Le personnage ne peut pas saigner
[Arthro] = Overwhelm : utiliser la Str pour Suppress un adversaire | Pursuit : Lock-on sur un ennemi et ne viser que lui | Bulk : Tank automatiquement 5 atk/Tech/Sort par Safe Zone
    </div>

    <h4>Apparence</h4>
    <pre class="mono">{Insecte/Arachnide, Humanoïde, peau Verte/Jaune/Mate}</pre>

    <h4>Capacité Spé</h4>
    <div class="mono">
[La race possède 3 variantes : Puissant, Rapide/Volant, Résistant — chacune avec une capacité spéciale]
[La race est capable d'infliger des morsures particulières selon le type de Chitine]
    </div>

    <!--
      💡 Chitine :
      - Les trois lignes de stats/traits suggèrent 3 sous-espèces (Puissant/Volant/Résistant).
      - “Bulk” s’applique une fois par Safe Zone (à confirmer selon tes règles).
    -->
  `;
  openModal('Chitine 🦗', contentHTML);
}

/* ========= FICHE : Samshioune ========= */
function openSamshiouneModal() {
  const contentHTML = `
    <h4>Stats</h4>
    <pre class="mono">{105 Hp, 30 Will, 5 Ftd}</pre>

    <h4>Talents</h4>
    <div class="mono">
[Oogoai] = Le CC (Crowd Control / Stun) du personnage dure 2× la durée originale
[Taki-Otekuro] = Les Dmg Mentaux du personnage font 2× les Dmg ; frapper un ennemi sous CC augmente les Dmg de base de 25%
[Tan a Land] = Le Chi du personnage met 3× plus de temps à se dépléter ; les Ult touchant un ennemi sous CC peuvent être réutilisés à la suite
    </div>

    <h4>Apparence</h4>
    <pre class="mono">{Cheveux longs, Peau mate, Yeux bridés, Armure naturelle, Boucles d’oreille}</pre>

    <h4>Capacité Spé</h4>
    <div class="mono">
{La race peut convertir ses Dmg de Maîtrise en Dmg de Blade's Will}
{La race peut réduire les CC alliés en les frappant}
    </div>

    <!--
      💡 Samshioune :
      - “Convertir Maîtrise → Blade’s Will” : précise si c’est temporaire ou permanent par combat.
      - “Réduire CC alliés en les frappant” : ajoute une formule (ex : -1 tour par coup).
    -->
  `;
  openModal('Samshioune', contentHTML);
}

/* ========= FICHE : Riviera ========= */
function openRivieraModal() {
  const contentHTML = `
    <h4>Stats</h4>
    <pre class="mono">{190 Hp, 5 Str, 5 Agi, 5 Ftd, 5 Int, 5 Will, 5 Char, -30% Mana Base & Gain, -5 MnaAff, +3 MnaPwr}</pre>

    <h4>Talents</h4>
    <div class="mono">
[Neuroplasticity] = Le personnage peut manier un élément dans toutes ses formes
[Will o' Wisp] = Le personnage possède un drone élémentaire réduisant les coûts en mana de 50%
[Glorious Dawn] = Le personnage ne peut avoir qu’un seul élément dans sa vie ; le niveau de celui-ci n’a plus de limite (Lvl 20 Max)
    </div>

    <h4>Apparence</h4>
    <pre class="mono">{Aucun changement, Tatouages élémentaires, Cheveux bouclés}</pre>

    <h4>Capacité Spé</h4>
    <div class="mono">
{La race peut obtenir naturellement le Legendary}
{La race peut prier directement le dieu qu’elle worship ; l’inverse est impossible}
{La race est dans l’incapacité de manier une arme}
    </div>

    <!--
      💡 Riviera :
      - “Drone élémentaire” : clarifie sa portée, sa vitesse et ses règles de focus.
      - “Un seul élément” : boosté par Neuroplasticity → toutes ses facettes (solide/liquide/gaz/plasma…)
    -->
  `;
  openModal('Riviera', contentHTML);
}


/* ========= FICHE : Witch ========= */
function openWitchModal() {
  const contentHTML = `
<h4>Stats</h4>
<pre class="mono">{90 Hp, 20 Int, 10 Char, 75 Vis, 2 VisPwr}</pre>
<h4>Talents</h4>
<div class="mono">[!?.Birth.?!] = Talent adaptatif, change en fonction de la Witch<br>[Witch Hat] = Le personnage a un couvre-chef spécial<br>[!?.404 no Trans.?!] = Talent adaptatif, change en fonction de la Witch</div>
<h4>Apparence</h4>
<pre class="mono">{Aucun changement, Couvre-chef (Obligatoire), Femelle (99,7%)}</pre>
<h4>Capacité Spé</h4>
<div class="mono">{Peut créer jusqu'à 2 talents innés en rapport direct avec elle}<br>{Peut invoquer et/ou créer jusqu'à 10 @Aid🌙 }<br>{Cette race possède la capacité de convertir le cycle de la vie en énergie}<br>{Cette race n'a aucun besoin de nourriture ni d'eau}</div>
  `.trim();
  openModal('Witch 🧙', contentHTML);
}

/* ========= FICHE : Manifest ========= */
function openManifestModal() {
  const contentHTML = `
<h4>Stats</h4>
<pre class="mono">{Hp = Hp de l'Hôte, Str Agi Ftd = Hôte x2 OU Will Char Int = Hôte x1.5, -15 Will}</pre>
<h4>Talents</h4>
<div class="mono">[Parasite] = Le personnage n'existe qu'à moitié, il est donc insensible à tout effet positif comme négatif quand il est dans son Hôte. Sortir de celui-ci consomme de la Stm<br>[Hoarder] = Le personnage hérite des 3 premiers talents hors raciaux de son Hôte<br>[Etheir Conduit] = Le personnage prend le contrôle de son Hôte lorsque celui-ci n'est pas conscient</div>
<h4>Apparence</h4>
<pre class="mono">{Apparence libre}</pre>
<h4>Capacité Spé</h4>
<div class="mono">{Peut communiquer télépathiquement avec son Hôte de force}<br>{Peut, lorsque son Hôte meurt, sacrifier la moitié de l'espérance de vie de son Hôte (avant sa mort) contre un revive, de force}<br>{Mourir fait mourir son Hôte et vice versa}</div>
  `.trim();
  openModal('Manifest 👹', contentHTML);
}

/* ========= FICHE : Vampire ========= */
function openVampireModal() {
  const contentHTML = `
<h4>Stats</h4>
<pre class="mono">{120 | 150 | 180 Hp, 5 | 10 | 15 Str, 15 | 5 | 10 Agi, 10 | 15 | 5 Ftd, 10 Will}</pre>
<h4>Talents</h4>
<div class="mono">[Blood Child] = Le personnage gagne un Blood Meter, il peut sucer le sang de personnes<br>[Blood Tie] = Le personnage obtient la Magie de l'Homophage (Magie du Sang). Boire le sang d'un autre Vampire est nocif et empoisonne sévèrement le personnage<br>[Dawn and Dusk] = Le personnage modifie ses Stats par rapport à la position du Soleil (temps de la journée)</div>
<h4>Apparence</h4>
<pre class="mono">{Canines développées, Peau Pâle/Bronzée, Cheveux Sombres/Blancs, Humanoïde, Oreilles pointues, Aucun changement}</pre>
<h4>Capacité Spé</h4>
<div class="mono">{Les Vampires ont 3 variantes : Semi-Vampire, Vampire Diurne et Dhampire}<br><br>{Semi-Vampire : +75% Blood Meter Capacity, +20 Hp lors de la régénération, Stats -25% en journée ou face au Soleil}<br>{Vampire Diurne : +25% Stats en journée, immunisé à tous les débuffs de Vampire}<br>{Dhampire : +25% Hp si Blood Meter full, +10% Blood Meter Capacity, +10 Def, Stats -50% en journée ou face au Soleil}</div>
  `.trim();
  openModal('Vampire 🧛', contentHTML);
}


/* ========= FICHE : Driade ========= */
function openDriadeModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{110 Hp, 10 Will, 10 Char, 10 ManaAff, 40% Mana Base}</pre>
<h4>Talents</h4><div class="mono">[Friendship] = Incapable de toucher ses alliés avec une attaque/tech offensive. [Bud] = Magie spéciale de la nature, communication avec toute créature terrestre. [Green Hand] = +25% Dmg en zone verte, booste la croissance des êtres vivants.</div>
<h4>Apparence</h4><pre class="mono">{Détails de fleur/plante/arbre, Cheveux vert/rose/violet/bleu/jaune, Oreilles pointues}</pre>
<h4>Capacité Spé</h4><div class="mono">{Prend racine et se régénère Hp/Mana après 5 tours immobiles. Alliés font -50% Dmg sur lui. Friendship Meter augmente avec actions bénéfiques pour la nature.}</div>
  `.trim();
  openModal('Driade 💫', contentHTML);
}

/* ========= FICHE : Dokaebi ========= */
function openDokaebiModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{135 Hp, 25 Char, 5 Int, Lvl2 Magie}</pre>
<h4>Talents</h4><div class="mono">[Genjutsu{0/3}] = Magie illusoire, pupilles selon énergie dominante. [Bulkkoch] = Chaque stun mental génère une flamme bleue infligeant 25x stuns en Dmg. [Jiǔjīng] = Toute condition mentale donne +20 Agi et +1 perception (stackable).</div>
<h4>Apparence</h4><pre class="mono">{Cheveux blanc/noir, Taille 1m50~1m75, Corne unique, Croc développé, Peau pâle}</pre>
<h4>Capacité Spé</h4><div class="mono">{Flammes peuvent devenir bleues/vertes si Jnouné Feu. Magie Vent/Eau/Feu gagne trait Illusoire. Peut dissimuler la présence de n’importe qui sauf lui-même.}</div>
  `.trim();
  openModal('Dokaebi 🧌', contentHTML);
}

/* ========= FICHE : Ouga ========= */
function openOugaModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{200 Hp, 0 -> 5 -> 15 -> 25 Ftd, Str, Agi}</pre>
<h4>Talents</h4><div class="mono">[Hoshoku]{0/3} = Prépare à évoluer. [Yǐnlì]{0/5} = Augmente puissance. [Hoebog] = Gagne passivement Ki et Essence d’existence (EXP).</div>
<h4>Apparence</h4><pre class="mono">{Détails bestiaux, Cheveux longs, 2+m, Yeux couleur élément principal}</pre>
<h4>Capacité Spé</h4><div class="mono">{Magie gravitationnelle avec 5 branches (Attraction, Répulsion, Vecteur, Espace, Fractal). Augmente ses capacités à chaque kill.}</div>
  `.trim();
  openModal('Ouga ☄️', contentHTML);
}

/* ========= FICHE : Undead ========= */
function openUndeadModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{70 Hp, 10 Str, -5 Agi, -5 Int, -5 Char, 5 Will, Unholy}</pre>
<h4>Talents</h4><div class="mono">[Reignite] = Évolution tous les 3 niveaux. [Taboo] = +4 points de stats par level, attributs deviennent Unholy. [Miracle Bane] = Holy = mort instant, Chi = 2x Dmg.</div>
<h4>Apparence</h4><pre class="mono">{Squelette ou mort-vivant}</pre>
<h4>Capacité Spé</h4><div class="mono">{Régénère tant qu’il n’y a pas de lumière. Peut tomber à 0 Hp sans mourir tant que son Core est intact. Touché par Chi empêche régénération.}</div>
  `.trim();
  openModal('Undead ☠️', contentHTML);
}

/* ========= FICHE : Shinobi ========= */
function openShinobiModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{135 Hp, Ninjutsu(1), 25 Agi, 15 Will}</pre>
<h4>Talents</h4><div class="mono">[Ninjutsu] = Stat pour tech Ki. [Nindo] = Attribut aléatoire, Ki = Mana, +3 slots tech Ki. [Taijutsu] = Tech physiques enduites de Ki, DouQi change de stage.</div>
<h4>Apparence</h4><pre class="mono">{Yeux dorés/argentés/bronze}</pre>
<h4>Capacité Spé</h4><div class="mono">{Peut faire des tech inédites de Ki (dés 13+).}</div>
  `.trim();
  openModal('Shinobi 🥷', contentHTML);
}

/* ========= FICHE : Deep Sea ========= */
/*function openDeepSeaModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{210 Hp, 30 Ftd, 75 Ki, Lvl 2 Magie Eau}</pre>
<h4>Talents</h4><div class="mono">[Deep Clash] = Magie de pression, +25 Def, mental réduit. [Deepen] = Tech aquatiques obtiennent sous-attribut depth. [Deep Mentality] = -300 SparExp pour up maitrises aquatiques.</div>
<h4>Apparence</h4><pre class="mono">{Poisson marin des profondeurs, Écailles}</pre>
<h4>Capacité Spé</h4><div class="mono">{-75% Dmg sur coups non tranchants. Water Droplet booste alliés avec 650+ Hp ou 50 Ftd.}</div>
  `.trim();
  openModal('Deep Sea 🐙', contentHTML);
} */

/* ========= FICHE : Elf ========= */
function openElfModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{100 Hp, 10 Agi, 10 Char, +100% Mana Base, +30 ManaAff, +1 ManaPwr, Lvl 3 Magie}</pre>
<h4>Talents</h4><div class="mono">[Loved] = +Dmg magique selon ManaAff/ManaPwr. [Ultime] = Pour chaque 175 Mana, +4 Char. [Elfenheim] = En zone nature : +30 Int, +45 Will (+50% si autre Elf).</div>
<h4>Apparence</h4><pre class="mono">{Oreilles longues, Yeux verts/bleus, Cheveux clairs/foncés}</pre>
<h4>Capacité Spé</h4><div class="mono">{Peut avoir 30+ années dans création perso. Charisme permanent basé sur beauté/élégance.}</div>
  `.trim();
  openModal('Elf 🧝', contentHTML);
}

/* ========= FICHE : Yaungestor ========= */
function openYaungestorModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{130 Hp, +50% Mana Base, +4 ManaPwr}</pre>
<h4>Talents</h4><div class="mono">[Dragon Heart] = Rayon d’énergie concentré. [Dragon Scale] = Augmente ManaPwr/ManaAff, reverse scale = incapacité 2 tours si touchée. [Dragon Tongue] = Parle toutes les langues, obtient trait Mystic si art mystique.</div>
<h4>Apparence</h4><pre class="mono">{Écaille inversée, Cornes, Héritage draconique}</pre>
<h4>Capacité Spé</h4><div class="mono">{Connexion avec ancêtre draconique, invocation possible. Ne peut pas créer/améliorer de mode.}</div>
  `.trim();
  openModal('Yaungestor 🐉', contentHTML);
}

/* ========= FICHE : Oni ========= */
function openOniModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{140 Hp, 30 Str, +10% Mana Base, +20 ChiMax, +1 ManaPwr}</pre>
<h4>Talents</h4><div class="mono">[Nigen-sei] = Moins d’HP = plus de Dmg (max 50%). [Cuīhuàjì] = Charge énergie via cornes, incapacité si cornes touchées. [Cheonsang] = +exp combat et SparExp arme, peut utiliser Chi.</div>
<h4>Apparence</h4><pre class="mono">{Humanoïde, Cornes, Yeux élémentaires}</pre>
<h4>Capacité Spé</h4><div class="mono">{Chi augmente après combat, boost Dmg si Chi max. Peut invoquer une Kee pour accéder au Realm.}</div>
  `.trim();
  openModal('Oni 👺', contentHTML);
}

/* ========= FICHE : Aid ========= */
function openAidModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{@Witch CursePwr x10, 130 Hp}</pre>
<h4>Talents</h4><div class="mono">[Link] = Lié à une sorcière, accumule Curse pour elle. [????] = Talent se transforme en signature de la vraie forme. [Cursed Energy] = Plus de Curse = plus de Charisme (peur).</div>
<h4>Apparence</h4><pre class="mono">{Non humanoïde, même couleur yeux/cheveux que Witch}</pre>
<h4>Capacité Spé</h4><div class="mono">{Peut prendre forme humanoïde. Gagne certains talents/capacités de sa Witch.}</div>
  `.trim();
  openModal('Aid 🌙', contentHTML);
}

/* ========= FICHE : Volture ========= */
function openVoltureModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{120 Hp, 15 Str, 15 Agi, +100 ChiMax, +25 Chi Sortable, +1 Perception}</pre>
<h4>Talents</h4><div class="mono">[Mystik Feather] = Contrôle total sur ses plumes, connexion aux arts mystiques. [Tactician] = Atk/Tech aériennes -3 au dés, boost si Int > 25. [Preying] = Cible désignée pour plus de Dmg selon perception.</div>
<h4>Apparence</h4><pre class="mono">{Humanoïde, manteau de plumes}</pre>
<h4>Capacité Spé</h4><div class="mono">{Tech Shapeshift total, conserve tech/sorts/intellect. Fly si partiellement shapeshift, boost si total.}</div>
  `.trim();
  openModal('Volture 🦅', contentHTML);
}

/* ========= FICHE : Emporium ========= */
function openEmporiumModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{180 Hp, 20 Char, 5 Str, 5 Will, Lvl 2 Arme(Med), Lvl 1 Magie, -30 Ki, -2 ManaPwr}</pre>
<h4>Talents</h4><div class="mono">[Epitate] = Copie tech/sort pendant 5 tours (dés 9). [Sophistications] = Assimile parties du corps (dés 6), change apparence. [Calibrage] = Perte mental = regen Hp, perte Hp = regen mental.</div>
<h4>Apparence</h4><pre class="mono">{Mana blanc, ailes, corne unique, yeux cyan/magenta}</pre>
<h4>Capacité Spé</h4><div class="mono">{Naît avec 2 modes Tarsal et Hive. Peut copier un talent racial permanent (dés 17) ou en tuant solo.}</div>
  `.trim();
  openModal('Emporium', contentHTML);
}

/* ========= FICHE : Humain ========= */
function openHumainModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{130 Hp, 20 Int, 10 Will, Lvl 2 Arme(Gun/Arc/Lance)}</pre>
<h4>Talents</h4><div class="mono">[Mahō] = -250 SparExp sur toutes les maîtrises. [Spiritisme] = -1 (-3 si génis) au dés pour tech/sort. [Évolution] = Gagne exp sur tech/sort, chaque lvl ajoute dés de Dmg.</div>
<h4>Apparence</h4><pre class="mono">{Humanoïde}</pre>
<h4>Capacité Spé</h4><div class="mono">{Sous 25% Hp : +60 mental et +15 physique (1 fois par combat).}</div>
  `.trim();
  openModal('Humain 👨', contentHTML);
}

/* ========= FICHE : Hymne ========= */
function openHymneModal() {
  const contentHTML = `
<h4>Stats</h4><pre class="mono">{100 Hp, 0 -> 10 Will, 0 -> 20 Char}</pre>
<h4>Talents</h4><div class="mono">Innate Chanting = Chante une hymne, boost aléatoire à un allié (durée/efficacité scale sur Char). [Saviour's Song] = 50% chance de sortir d’un statut. [Hero's Song] = Pareil mais pour alliés (20%). [Rythm] = Voit entités et leur état Hp. Lvl 4 ERIKA = Cri de guerre, effraie ennemis 1 tour. Lvl 7 Burst = Sous 30% Hp, stun tout le monde autour.</div>
<h4>Apparence</h4><pre class="mono">{Libre}</pre>
<h4>Capacité Spé</h4><div class="mono">{Boosts et chants évoluent avec Char.}</div>
  `.trim();
  openModal('Hymne 🎶', contentHTML);
}

function openforceModal() {
  const contentHTML = `
    <h4>Force — Talents Pool <small style="opacity:.7">[⚪]</small></h4>

    <p class="mono" style="margin-bottom:10px">
      <strong>Conditions d’obtention</strong> : chaque talent se débloque si sa condition est remplie.
      <br>Le MJ peut ajuster les seuils/émoticônes selon le système (💪 = Force, 🩷 = HP, ❤️ = Dégâts, 🥊🤜 = m1 / coup de poing).
    </p>

    <h4>Talents</h4>
    <div class="mono">
      <ol style="padding-left:18px; margin: 0;">
        <li><strong>Bulk Up</strong> — <em>Condition</em> : posséder <strong>25(💪)+</strong><br>
            <u>Effet</u> : La stat <strong>(💪)</strong> influe désormais sur les <strong>(🩷)</strong> du personnage.
        </li>
        <br>
        <li><strong>Pump Up</strong> — <em>Condition</em> : avoir donné <strong>10+ m1 (🥊🤜)</strong> dans la run<br>
            <u>Effet</u> : Les Dmg <strong>(❤️)</strong> au <strong>(🥊🤜)</strong> sont augmentés de <strong>( (💪)/2 )</strong>.
        </li>
        <br>
        <li><strong>Arms Up</strong> — <em>Condition</em> : avoir <strong>bloqué 15+ m1 (🥊🤜)</strong><br>
            <u>Effet</u> : La stat <strong>(💪)</strong> est prise en compte lorsqu’il doit bloquer une attaque.
        </li>
        <br>
        <li><strong>Push Down</strong> — <em>Condition</em> : posséder <strong>45(💪)+</strong> et faire <strong>1m75+</strong><br>
            <u>Effet</u> : Pour chaque point de <strong>(💪)</strong> au-dessus de la cible, le personnage inflige <strong>+2 Dmg (❤️)</strong>.
        </li>
        <br>
        <li><strong>Rush Down</strong> — <em>Condition</em> : avoir subi un dégât retirant <strong>25% (🩷)+</strong> une fois<br>
            <u>Effet</u> : À chaque palier de <strong>25% (🩷)</strong> perdu, le <strong>prochain coup (❤️)</strong> est <strong>Gilga drafté</strong>.
        </li>
        <br>
        <li><strong>Hunt Down</strong> — <em>Condition</em> : avoir asséné <strong>5 attaques (❤️)</strong> à la tête sur une même cible<br>
            <u>Effet</u> : Les coups vers une zone sensible n’ont plus de changement au dés (20) (12) (10).
        </li>
      </ol>
    </div>

    <h4>@SPECIALZ</h4>
    <div class="mono">
      Test d’affichage et refonte de certains talents obsolètes.
    </div>
  `;
  openModal('Force — Talents Pool', contentHTML);
}
/* =========================================================
   ✅ COLLE ICI toutes tes autres fonctions openLizardmanModal(),
   openChitineModal(), openSamshiouneModal(), ... EXACTEMENT
   comme dans ton ancien fichier.
   ========================================================= */
