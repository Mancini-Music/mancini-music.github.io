// Mobile navigation toggle
const toggle = document.querySelector('.toggle');
const menu = document.getElementById('menu');

function closeMenu() {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') closeMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
