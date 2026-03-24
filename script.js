 * THANU NAYAK — PORTFOLIO
 * script.js  |  All client-side behaviour
 *
 * 1. Scroll Reveal
 * 2. Active Nav Link Highlight
 * 3. Message Wall — helpers
 * 4. Feedback Form — submit handler
 */

'use strict';

/* ── 1. Scroll Reveal ─────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.1 }
  );

  els.forEach((el) => observer.observe(el));
})();


/* ── 2. Active Nav Highlight ──────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const active = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((sec) => observer.observe(sec));
})();


/* ── 3. Message Wall Helpers ──────────────────────────────── */

// Avatar colours cycling through a neutral professional palette
const AVATAR_PALETTE = [
  '#2d5a3d', // accent green
  '#1a1917', // near-black
  '#6b7c6e', // muted sage
  '#8c7b5e', // warm tan
  '#4a6580', // slate blue
];
let colorIdx = 0;

/**
 * Returns up to 2 uppercase initials from a name string.
 * @param {string} name
 * @returns {string}
 */
function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

/**
 * Renders a filled/empty star string from a numeric rating.
 * @param {string|number} val  1–5
 * @returns {string}  e.g. "★★★☆☆"
 */
function renderStars(val) {
  const n = parseInt(val, 10);
  if (!n || n < 1 || n > 5) return '';
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

/**
 * Returns a formatted timestamp: "03:45 PM · Mar 22"
 * @returns {string}
 */
function now() {
  const d = new Date();
  return (
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) +
    ' · ' +
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  );
}

/**
 * Escapes HTML to prevent XSS injection.
 * @param {string} str
 * @returns {string}
 */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Builds and prepends a message card into the wall.
 * @param {{ name, type, rating, message, time }} msg
 */
function renderMessage(msg) {
  const list  = document.getElementById('messagesList');
  const empty = document.getElementById('noMessages');
  if (empty) empty.remove();

  // Pick and advance avatar colour
  const color = AVATAR_PALETTE[colorIdx % AVATAR_PALETTE.length];
  colorIdx++;

  // Build card element
  const card = document.createElement('article');
  card.className = 'msg-card';

  const stars    = renderStars(msg.rating);
  const typeHTML = msg.type
    ? `<span class="msg-type">${esc(msg.type)}</span>`
    : '';
  const starsHTML = stars
    ? `<span class="msg-stars">${stars}</span>`
    : '';

  card.innerHTML = `
    <div class="msg-header">
      <div class="msg-meta">
        <div class="msg-avatar" style="background-color:${color}">${getInitials(msg.name)}</div>
        <div>
          <div class="msg-name">${esc(msg.name)}</div>
          ${typeHTML}
        </div>
      </div>
      <div class="msg-right">
        ${starsHTML}
        <span class="msg-time">${esc(msg.time || now())}</span>
      </div>
    </div>
    <p class="msg-body">${esc(msg.message)}</p>
  `;

  // Prepend — newest message at top
  list.insertBefore(card, list.firstChild);

  // Animate the count badge
  const badge = document.getElementById('msgCount');
  if (badge) {
    const current = parseInt(badge.textContent, 10) || 0;
    badge.textContent = current + 1;
    badge.style.transform = 'scale(1.4)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 300);
  }
}


/* ── 4. Feedback Form ─────────────────────────────────────── */
(function initForm() {
  const form      = document.getElementById('feedbackForm');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  /**
   * Show a toast notification for 4 seconds.
   * @param {'success'|'error'} type
   */
  function showToast(type) {
    const id    = type === 'success' ? 'successToast' : 'errorToast';
    const toast = document.getElementById(id);
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Read values
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const type    = document.getElementById('ftype').value;
    const ratingEl = document.querySelector('input[name="rating"]:checked');
    const rating  = ratingEl ? ratingEl.value : '';
    const message = document.getElementById('fmsg').value.trim();

    // Basic validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !message) {
      showToast('error');
      return;
    }
    if (!emailPattern.test(email)) {
      showToast('error');
      return;
    }

    // Disable while "submitting"
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    // Simulate async (replace with real fetch() call to your backend)
    setTimeout(() => {
      renderMessage({ name, type, rating, message, time: now() });

      showToast('success');
      form.reset();

      // Scroll message wall into view
      setTimeout(() => {
        document.getElementById('messagesList')
          .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);

      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message';
    }, 600);

    /*
    // ── Real backend version ────────────────────────────────
    // Uncomment to connect to your Node.js or PHP backend.

    fetch('http://localhost:3000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, type, rating, message })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Server error');
        return res.json();
      })
      .then((data) => {
        renderMessage({ name, type, rating, message, time: data.time || now() });
        showToast('success');
        form.reset();
        setTimeout(() => {
          document.getElementById('messagesList')
            .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      })
      .catch(() => showToast('error'))
      .finally(() => {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Send Message';
      });
    */
  });
})();