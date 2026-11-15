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

// Dismissible announcement bar (remembered per visitor; change the key for a new announcement)
const announce = document.getElementById('announce');
// The holiday banner and the regular banner are remembered separately.
const ANNOUNCE_KEY = document.body.classList.contains('holiday-theme')
  ? 'mm-announce-holiday-2026'
  : 'mm-announce-winter-spring-2027';
if (announce) {
  let dismissed = false;
  try { dismissed = localStorage.getItem(ANNOUNCE_KEY) === '1'; } catch (err) { /* storage unavailable */ }
  if (dismissed) announce.hidden = true;

  const close = announce.querySelector('.announce-close');
  if (close) {
    close.addEventListener('click', () => {
      announce.hidden = true;
      try { localStorage.setItem(ANNOUNCE_KEY, '1'); } catch (err) { /* storage unavailable */ }
      const skip = document.querySelector('.skip');
      if (skip) skip.focus();
    });
  }
}

// Inquiry form (Formspree). Replace YOUR_FORM_ID in index.html with the real form ID to turn it on.
const form = document.getElementById('inquiry-form');
const formStatus = document.getElementById('form-status');
const FALLBACK = 'Please text Carol at (774) 804-1274 or call (330) 590-1161.';

function setStatus(message, kind) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = 'form-status' + (kind ? ' is-' + kind : '');
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (form.action.includes('YOUR_FORM_ID')) {
      setStatus('Online messages are not set up yet. ' + FALLBACK, 'error');
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }
    setStatus('', '');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setStatus('Thank you! Your message was sent. Carol will be in touch soon.', 'success');
    } catch (err) {
      setStatus('Sorry, your message could not be sent. ' + FALLBACK, 'error');
    } finally {
      if (button) { button.disabled = false; button.textContent = 'Send message'; }
    }
  });
}

// Keep the copyright year current
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
