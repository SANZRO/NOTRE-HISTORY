// modal.js
const infoModalOverlay = document.getElementById('infoModalOverlay');
const modalTitleEl = document.getElementById('modalTitle');
const modalBodyEl  = document.getElementById('modalBody');
const closeModalBtn = document.getElementById('closeModalBtn');

export function openModal(title, htmlBody) {
  modalTitleEl.textContent = title;
  modalBodyEl.innerHTML = htmlBody;
  infoModalOverlay.style.display = 'flex';
}

export function closeModal() {
  infoModalOverlay.style.display = 'none';
  modalTitleEl.textContent = 'Fiche';
  modalBodyEl.innerHTML = '';
}

closeModalBtn.addEventListener('click', closeModal);
infoModalOverlay.addEventListener('click', (e) => {
  if (e.target === infoModalOverlay) closeModal();
});
