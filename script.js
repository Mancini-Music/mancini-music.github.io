// Mobile navigation toggle
const toggle = document.querySelector('.toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('open')) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }
});

// Contact form: sends to Formspree if a form ID is set, otherwise falls back to email
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const EMAIL = 'carol@example.com'; // TODO: replace with Carol's real email

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const endpoint = form.dataset.endpoint;

  if (endpoint && !endpoint.includes('YOUR_FORM_ID')) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error();
      form.reset();
      statusEl.textContent = 'Thank you! Your message has been sent.';
    } catch {
      statusEl.textContent = 'Sorry, something went wrong. Please email directly.';
    }
    return;
  }

  const subject = encodeURIComponent('Inquiry: ' + data.get('topic'));
  const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  statusEl.textContent = 'Opening your email app…';
});

document.getElementById('year').textContent = new Date().getFullYear();
