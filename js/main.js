// Toggle de tema (oscuro/claro) con persistencia
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function setTheme(mode) {
  if (mode === 'light') {
    root.classList.add('theme-light');
    localStorage.setItem('twd-theme', 'light');
  } else {
    root.classList.remove('theme-light');
    localStorage.setItem('twd-theme', 'dark');
  }
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('theme-light');
    localStorage.setItem('twd-theme', isLight ? 'light' : 'dark');
  });
}

// Modal de tráiler YouTube
const trailerBtn = document.querySelector('[data-open-trailer]');
const trailerModal = document.getElementById('trailerModal');
const trailerFrame = document.getElementById('trailerFrame');

function openModal() {
  if (!trailerModal) return;
  trailerModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // Podes cambiar el ID del video por tu tráiler favorito:
  trailerFrame.src = 'https://www.youtube.com/embed/sfAc2U20uyg?autoplay=1&rel=0';
}
function closeModal() {
  if (!trailerModal) return;
  trailerModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  trailerFrame.src = ''; // detener reproducción
}

trailerBtn && trailerBtn.addEventListener('click', openModal);
document.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', closeModal);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && trailerModal && trailerModal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

// Countdown (seteá tu fecha objetivo acá)
const targetDate = new Date('2025-12-01T00:00:00-03:00'); // EJEMPLO
const cdEls = {
  d: document.getElementById('cd-days'),
  h: document.getElementById('cd-hours'),
  m: document.getElementById('cd-mins'),
  s: document.getElementById('cd-secs'),
};

function pad(n) { return String(n).padStart(2, '0'); }
function tick() {
  const now = new Date();
  let diff = Math.max(0, targetDate - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  diff -= hours * 3600000;
  const mins = Math.floor(diff / 60000);
  diff -= mins * 60000;
  const secs = Math.floor(diff / 1000);

  if (cdEls.d) cdEls.d.textContent = pad(days);
  if (cdEls.h) cdEls.h.textContent = pad(hours);
  if (cdEls.m) cdEls.m.textContent = pad(mins);
  if (cdEls.s) cdEls.s.textContent = pad(secs);
}
tick();
setInterval(tick, 1000);

// Timeline: animación on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.25 });

document.querySelectorAll('.tl-item').forEach(el => io.observe(el));
