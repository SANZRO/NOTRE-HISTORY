// card.js
import { normalizeText } from './utils.js';
import { openBeastmanModal, openKadmerianModal, openSeishinModal, openDunkelModal, openGeantModal } from './modals.js';

let draggedCard = null;

export function createCard(text) {
  const card = document.createElement('div');
  card.className = 'trello-card';
  card.textContent = text;
  card.draggable = true;

  // Drag & Drop
  card.addEventListener('dragstart', () => {
    draggedCard = card;
    card.style.opacity = '0.5';
  });
  card.addEventListener('dragend', () => {
    draggedCard = null;
    card.style.opacity = '1';
  });

  // Click pour ouvrir modal
  card.addEventListener('click', () => {
    const key = normalizeText(text);
    if (key.includes('beastman')) openBeastmanModal();
    else if (key.includes('kadmerian')) openKadmerianModal();
    else if (key.includes('seishin')) openSeishinModal();
    else if (key.includes('dunkel')) openDunkelModal();
    else if (key.includes('geant')) openGeantModal();
  });

  return card;
}

export { draggedCard };
