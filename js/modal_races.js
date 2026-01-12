// modals.js
import { openModal } from './modal.js';

export function openBeastmanModal() {
  const contentHTML = `<h4>Stats</h4> ...`; // le contenu complet
  openModal('Beastman 🦁', contentHTML);
}

export function openKadmerianModal() {
  const contentHTML = `<h4>Stats</h4> ...`;
  openModal('Kadmerian (Nain)', contentHTML);
}

export function openSeishinModal() {
  const contentHTML = `<h4>Stats</h4> ...`;
  openModal('Seishin 👻', contentHTML);
}

export function openDunkelModal() {
  const contentHTML = `<h4>Stats</h4> ...`;
  openModal('Dunkel 😈', contentHTML);
}

export function openGeantModal() {
  const contentHTML = `<h4>Stats</h4> ...`;
  openModal('Géant 🪓', contentHTML);
}
