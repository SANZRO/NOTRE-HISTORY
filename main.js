// main.js
import { loadState } from './js/localStorage.js';
import { initDefaultRaces } from './js/races_liste.js';
import { renderState, setupAddCardButtons, setupDragAndDrop } from './js/trello.js';

let appState = {
  races:  { desc: '', cards: [] },
  talent: { desc: '', cards: [] },
  classe: { desc: '', cards: [] },
  ...loadState()
};

initDefaultRaces(appState);
renderState(appState);
setupAddCardButtons(appState);
setupDragAndDrop(appState);
