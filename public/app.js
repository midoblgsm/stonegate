import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('year').textContent = new Date().getFullYear();

const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const btn = this.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.textContent = 'Sending…';
  status.style.color = '#c8922a';
  status.textContent = '';

    const data = Object.fromEntries(new FormData(this));

  try {
    await addDoc(collection(db, 'quotes'), {
      ...data,
      submittedAt: serverTimestamp(),
    });
    status.textContent = 'Request sent! We\'ll be in touch shortly.';
    this.reset();
  } catch (err) {
    console.error('Quote submission failed:', err);
    status.style.color = '#e05555';
    status.textContent = 'Something went wrong. Please try again or call us directly.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Request';
  }
}, { passive: true });
