document.addEventListener("DOMContentLoaded", () => {
  // Toggle: show/hide announcement -- STREAM
  const showAnnouncement = false; // toggle here
  const announcementEl = document.getElementById('announcement');
  if (!showAnnouncement && announcementEl) {
    announcementEl.remove();
  }

  // Toggle: stream online/offline -- STREAM
  const streamOnline = TRUE; // toggle here
  const pageContent = document.getElementById('page-content');
  const hero = document.querySelector('.hero');
  const offlineOverlay = document.getElementById('offline-overlay');

  if (streamOnline) {
    if (offlineOverlay) offlineOverlay.style.display = 'none';
  } else {
    if (pageContent) pageContent.style.display = 'none';
    if (hero) hero.style.display = 'none';
    if (offlineOverlay) offlineOverlay.style.display = 'flex';
  }

  // Set your next stream date here
  const nextStreamDate = "10/05/2025";
  const subtitle = document.querySelector(".offline-subtitle");
  if (subtitle) {
    subtitle.innerHTML = `Next Expected Stream Date<br>${nextStreamDate}`;
  }

  // Mobile navigation toggle
  const btn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close if a link is clicked
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Image Lightbox from about.html
  const lightbox = document.getElementById('lightbox');
  document.querySelectorAll('.team-photos img').forEach(img => {
    img.addEventListener('click', () => {
      if (lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
      }
    });
  });

  if (lightbox) {
    // This listener allows you to click the overlay to close the lightbox.
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }
  
  const lightboxCloseBtn = document.querySelector('.lightbox-close');
  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('lightbox').style.display = 'none';
    });
  }

  // Scores smooth scroll and menu toggle
  const scoresToggleBtn = document.getElementById('nav-toggle');
  const eventList = document.getElementById('event-nav');
  const links = document.querySelectorAll('.event-list a');

  if (scoresToggleBtn && eventList) {
    scoresToggleBtn.addEventListener('click', () => {
      eventList.classList.toggle('collapsed');
      if (eventList.classList.contains('collapsed')) {
        scoresToggleBtn.textContent = '⮜ Expand';
      } else {
        scoresToggleBtn.textContent = '☰ Events';
      }
    });
  }

  if (links.length > 0) {
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }
});