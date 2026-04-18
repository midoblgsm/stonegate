document.getElementById('year').textContent = new Date().getFullYear();

const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const btn = this.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    status.style.color = '';

    const data = Object.fromEntries(new FormData(this));

    try {
      await new Promise(r => setTimeout(r, 800));
      status.textContent = 'Request received — we\'ll be in touch shortly. For urgent loads call (510) 786-8209.';
      this.reset();
    } catch {
      status.style.color = '#e05555';
      status.textContent = 'Something went wrong. Please call us directly at (510) 786-8209.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Quote Request →';
    }
  });
}

/* Shrink nav on scroll */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}, { passive: true });
