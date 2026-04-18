document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('quoteForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  const btn = this.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.textContent = 'Sending…';
  status.textContent = '';

  const data = Object.fromEntries(new FormData(this));

  try {
    // TODO: replace with your Firebase Function or Firestore write endpoint
    await new Promise(r => setTimeout(r, 800)); // simulate network
    status.textContent = 'Request sent! We\'ll be in touch shortly.';
    this.reset();
  } catch {
    status.style.color = '#e05555';
    status.textContent = 'Something went wrong. Please try again or call us directly.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Request';
  }
});
