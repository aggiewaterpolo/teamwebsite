document.addEventListener("DOMContentLoaded", () => {
  // =====================================================================
  // USER INPUTS - PAGE CONTROLS
  // =====================================================================

  // All true/false MUST BE LOWERCASE

  
  // --- STREAM.HTML CONTROLS (Only applies to stream.html) ---
  const streamOnline = false; // Set to 'false' to show the offline overlay
  const nextStreamDate = "10/18/2025";
  const showSchedule = false; // Set to 'false' to show "Schedule TBD"

  // --- ANNOUNCEMENT CONTROLS (Applies to pages with announcement containers) ---
  
  // A. STREAM.HTML Announcement (Single notice)
  const streamShowAnnouncement = false; // Set to 'false' to hide the entire bar on stream.html
  const streamAnnouncementText = "Game will start 15 minutes late due to weather delay."; 

  // B. INDEX.HTML Announcements (Multiple notices)
  // To add/remove announcements, simply add/remove strings from this list.
  // Use HTML tags (<strong>, <a>, etc.) for formatting!
  const indexAnnouncements = [
    'Good luck to the athletes playing <strong>THIS WEEKEND.</strong> Check out our new live stream with an updated Tournament Schedule under <strong> "Stream"</strong>.',
    'Fill out your <strong>DRIVER\'S AGREEMENT</strong> <a href="https://sportclubs.tamu.edu/driverrecord/create" style="text-decoration: underline;">here!</a> Also don\'t forget to pay dues <a href="http://sofctamu.estore.flywire.com/products/2025-2026-team-dues-367218" style="text-decoration: underline;">here</a>.'
  ];


  // =====================================================================
  // STREAM.HTML ANNOUNCEMENT BAR LOGIC
  // =====================================================================
  const streamAnnouncementEl = document.getElementById('announcement');
  if (streamAnnouncementEl) {
    if (streamShowAnnouncement && streamAnnouncementText) {
      // Inject the custom text into the announcement bar
      streamAnnouncementEl.innerHTML = `<p><strong>Announcement:</strong> ${streamAnnouncementText}</p>`;
    } else {
      // Remove the announcement element if the switch is false
      streamAnnouncementEl.remove();
    }
  }
  
  // =====================================================================
  // INDEX.HTML ANNOUNCEMENT SECTION LOGIC (Handles multiple notices)
  // =====================================================================
  // This looks for a container with the ID 'index-announcement-section' 
  // which should be inside a <section class="section container"> wrapper in index.html
  const indexAnnouncementContainer = document.getElementById('index-announcement-section');

  if (indexAnnouncementContainer && indexAnnouncements.length > 0) {
    let announcementsHtml = '<h2>Announcements</h2>'; // Start with the section title
    
    // Build the HTML for all announcements, wrapping each in <div class="notice"><p>...</p></div>
    indexAnnouncements.forEach(text => {
        announcementsHtml += `
          <div class="notice">
            <p>${text}</p>
          </div>
        `;
    });

    indexAnnouncementContainer.innerHTML = announcementsHtml;

  } else if (indexAnnouncementContainer) {
    // If the list is empty, but the container exists, remove it.
    indexAnnouncementContainer.remove();
  }

  // =====================================================================
  // STREAM OFFLINE LOGIC
  // =====================================================================
  const pageContent = document.getElementById('page-content');
  const hero = document.querySelector('.hero');
  const offlineOverlay = document.getElementById('offline-overlay');

  if (streamOnline) {
    if (offlineOverlay) offlineOverlay.style.display = 'none';
  } else {
    // 1. Hide main content and show overlay
    if (pageContent) pageContent.style.display = 'none';
    if (hero) hero.style.display = 'none';
    if (offlineOverlay) offlineOverlay.style.display = 'flex';
    
    const offlineMessageContainer = document.querySelector('#offline-overlay .offline-message');
    const sourceTableRows = document.querySelectorAll('.schedule table tbody tr');

    if (offlineMessageContainer) {
      // 2. Build the new overlay content (Title and Date first)
      let overlayContentHtml = '';

      // TITLE: Generate the Stream Offline text
      overlayContentHtml += `<div class="offline-title">Stream is Offline</div>`;

      // SUBTITLE: Generate the Next Expected Stream Date text
      overlayContentHtml += `<div class="offline-subtitle">Next Expected Stream Date<br>${nextStreamDate}</div>`;
      
      // 3. Add the schedule or "Schedule TBD" text based on the switch
      if (showSchedule && sourceTableRows.length > 0) {
        // --- SHOW SCHEDULE TABLE ---
        overlayContentHtml += '<h3>Weekend Schedule</h3><table>';
        overlayContentHtml += '<thead><tr><th>Day</th><th>Time</th><th>Matchup</th></tr></thead><tbody>';

        sourceTableRows.forEach(row => {
          const cells = row.querySelectorAll('td');
          // Ensure the row has the correct number of cells before adding it
          if (cells.length === 3) {
            overlayContentHtml += `<tr><td>${cells[0].textContent}</td><td>${cells[1].textContent}</td><td>${cells[2].textContent}</td></tr>`;
          }
        });

        overlayContentHtml += '</tbody></table>';
      } else {
        // --- SHOW "Schedule TBD" TEXT ---
        overlayContentHtml += '<h3>Schedule TBD</h3>';
      }

      // 4. Inject all content into the container at once
      offlineMessageContainer.innerHTML = overlayContentHtml;
    }
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

  // --- IMAGE LIGHTBOX LOGIC ---
  const lightbox = document.getElementById('lightbox');
  document.querySelectorAll('.team-photos img, .officers-group-photo img').forEach(img => {
    img.addEventListener('click', (e) => {
      // Prevent the default link navigation
      e.preventDefault();
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
