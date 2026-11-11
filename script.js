'use strict';

// Mobile navigation menu
const toggle = document.querySelector('.toggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
}

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    setMenu(!menu.classList.contains('open'));
  });

  // Close after choosing a link
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });

  // Close when clicking anywhere outside the menu
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      setMenu(false);
    }
  });

  // Close with the Escape key and return focus to the button
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Reset when the window grows past the mobile breakpoint
  window.matchMedia('(min-width: 761px)').addEventListener('change', (mq) => {
    if (mq.matches) setMenu(false);
  });
}

// Keep the copyright year current
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
