// defaultRaces.js
import { saveState } from './localStorage';

export const DEFAULT_RACES = [
  'Beastman 🦁','Kadmerian (Nain)','Seishin 👻','Dunkel 😈','Géant 🪓',
  'Qoog','Lizardman','Chitine','Samshioune','Riviera','Witch','Manifest',
  'Vampire','Driade','Dokaebi','Ouga','Undead','Shinobi','Deep Sea','Elf',
  'Yaugestor','Oni','AID','Volture','Emporium','Humain','Fishman','Hymne','TAZ'
];

export function initDefaultRaces(appState) {
  if (!Array.isArray(appState.races.cards)) appState.races.cards = [];
  DEFAULT_RACES.forEach(raceLabel => {
    if (!appState.races.cards.includes(raceLabel)) {
      appState.races.cards.push(raceLabel);
    }
  });
  saveState(appState);
}
