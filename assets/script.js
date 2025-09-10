  // Toggle: show/hide announcement -- STREAM
  const showAnnouncement = false;                     // toggle here
  const announcementEl = document.getElementById('announcement');
  if (!showAnnouncement && announcementEl) {
    announcementEl.remove();
  }

  // Toggle: stream online/offline -- STREAM
  const streamOnline = false;                         // toggle here

  const pageContent = document.getElementById('page-content');
  const hero = document.querySelector('.hero');
  const offlineOverlay = document.getElementById('offline-overlay');

  if (streamOnline) {
    offlineOverlay.style.display = 'none';
  } else {
    if (pageContent) pageContent.style.display = 'none';
    if (hero) hero.style.display = 'none';
    offlineOverlay.style.display = 'flex';
  }

  // Set your next stream date here
  const nextStreamDate = "10/05/2025";

  // Update the overlay subtitle
  document.addEventListener("DOMContentLoaded", () => {
    const subtitle = document.querySelector(".offline-subtitle");
    if (subtitle) {
      subtitle.innerHTML = `Next Expected Stream Date<br>${nextStreamDate}`;
    }
  });



document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#menuBtn');
  const menu = document.querySelector('#menu');
  if(btn && menu){
    btn.addEventListener('click', () => menu.classList.toggle('open'));
  }
});
