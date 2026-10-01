/* ============================================================
   FOODPAO — COMING SOON  |  script.js
   Modern, Interactive App Behaviors & Waitlist Handler
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     1. COUNTDOWN TIMER — Target: Dec 31, 2026
     ================================================ */
  const LAUNCH_DATE = new Date('2026-12-31T00:00:00');

  function pad(n) {
    return String(Math.floor(n)).padStart(2, '0');
  }

  function updateCountdown() {
    const diff = LAUNCH_DATE - new Date();

    if (diff <= 0) {
      ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    setCountdownValue('cd-days', pad(days));
    setCountdownValue('cd-hours', pad(hours));
    setCountdownValue('cd-mins', pad(mins));
    setCountdownValue('cd-secs', pad(secs));
  }

  function setCountdownValue(id, val) {
    const el = document.getElementById(id);
    if (!el || el.textContent === val) return;
    el.textContent = val;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* ================================================
     2. HEADER ELEVATION ON SCROLL
     ================================================ */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 8px 30px rgba(15, 23, 42, 0.08)';
      header.style.background = 'rgba(255, 255, 255, 0.96)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(255, 255, 255, 0.88)';
    }
  }, { passive: true });


  /* ================================================
     3. SMOOTH SCROLL FOR IN-PAGE NAV
     ================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ================================================
     4. APP STORE BADGE FEEDBACK
     ================================================ */
  document.querySelectorAll('.store-badge').forEach(badge => {
    badge.addEventListener('click', () => {
      const topLabel = badge.querySelector('.badge-top');
      if (!topLabel) return;
      const prevText = topLabel.textContent;
      topLabel.textContent = '🚀 Launching Soon!';
      badge.style.borderColor = '#E8001D';

      setTimeout(() => {
        topLabel.textContent = prevText;
        badge.style.borderColor = '';
      }, 2400);
    });
  });


  /* ================================================
     5. SCROLL REVEAL OBSERVER
     ================================================ */
  const revealElements = document.querySelectorAll(
    '.feature-card, .step-card, .merchant-card, .store-badge'
  );

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(index % 4) * 90}ms`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach(el => revealObserver.observe(el));

});
