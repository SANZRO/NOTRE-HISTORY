// stars.js
const bgStars = document.getElementById('bgStars');

export function generateStars(count = 140) {
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
