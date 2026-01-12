// trello.js
import { createCard, draggedCard } from './cards.js';
import { saveState } from './localStorage.js';

export function syncFromDOMToState(colKey, appState) {
  const colEl = document.querySelector(`.trello-column[data-column="${colKey}"]`);
  const listEl = colEl.querySelector('.trello-list');
  const cards = Array.from(listEl.querySelectorAll('.trello-card')).map(c => c.textContent);
  const desc = colEl.querySelector('.hidden-content').value || '';
  appState[colKey] = { desc, cards };
  saveState(appState);
}

export function renderState(appState) {
  ['races', 'talent', 'classe'].forEach(colKey => {
    const colEl = document.querySelector(`.trello-column[data-column="${colKey}"]`);
    const listEl = colEl.querySelector('.trello-list');
    const area   = colEl.querySelector('.hidden-content');

    area.value = appState[colKey]?.desc || '';
    listEl.innerHTML = '';
    (appState[colKey]?.cards || []).forEach(cardText => {
      listEl.appendChild(createCard(cardText));
    });
  });
}

export function setupAddCardButtons(appState) {
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
      syncFromDOMToState(colKey, appState);
    });
  });
}

export function setupDragAndDrop(appState) {
  document.querySelectorAll('.trello-list').forEach(list => {
    list.addEventListener('dragover', e => e.preventDefault());
    list.addEventListener('drop', () => {
      if (draggedCard) {
        const fromCol = draggedCard.closest('.trello-column').dataset.column;
        list.appendChild(draggedCard);
        const toCol = list.closest('.trello-column').dataset.column;
        syncFromDOMToState(fromCol, appState);
        syncFromDOMToState(toCol, appState);
      }
    });
  });
}
