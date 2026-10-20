/**
 * Western Railway Museum - Digital Archives
 * Interactive UI Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header with Scroll Effect ---
  const header = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Drawer Navigation ---
  const mobileDrawer = document.getElementById('mobileDrawer');
  const toggleMobileMenuBtn = document.getElementById('toggleMobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (toggleMobileMenuBtn) toggleMobileMenuBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- 3. Search Modal ---
  const searchModal = document.getElementById('searchModal');
  const openSearchBtn = document.getElementById('openSearchBtn');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const archiveSearchInput = document.getElementById('archiveSearchInput');
  const suggChips = document.querySelectorAll('.sugg-chip');

  const openSearch = () => {
    searchModal.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (archiveSearchInput) archiveSearchInput.focus();
    }, 100);
  };

  const closeSearch = () => {
    searchModal.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (openSearchBtn) openSearchBtn.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);
  
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // Suggestion chips populate search
  suggChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (archiveSearchInput) {
        archiveSearchInput.value = chip.textContent.trim();
        archiveSearchInput.focus();
      }
    });
  });

  // Keyboard shortcut (Escape closes modals)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeDrawer();
    }
    // Command/Ctrl + K opens search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // --- 4. Stories Carousel Functionality ---
  const carouselPrevBtn = document.getElementById('carouselPrevBtn');
  const carouselNextBtn = document.getElementById('carouselNextBtn');
  const carouselCounter = document.getElementById('carouselCounter');
  const storyCards = document.querySelectorAll('.story-card');
  const totalSlides = storyCards.length;
  let currentSlideIndex = 0;

  const updateCarouselUI = () => {
    // Update active class on cards
    storyCards.forEach((card, idx) => {
      if (idx === currentSlideIndex) {
        card.classList.add('active');
        // Scroll card into view if needed
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        card.classList.remove('active');
      }
    });

    // Update counter
    const slideNumberFormatted = String(currentSlideIndex + 1).padStart(2, '0');
    const totalFormatted = String(totalSlides).padStart(2, '0');
    if (carouselCounter) {
      carouselCounter.innerHTML = `<span class="current-slide">${slideNumberFormatted}</span> / <span class="total-slides">${totalFormatted}</span>`;
    }
  };

  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
      updateCarouselUI();
    });
  }

  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
      updateCarouselUI();
    });
  }

  // Clicking any story card activates it
  storyCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      currentSlideIndex = idx;
      updateCarouselUI();
    });
  });

  // --- 5. Active Navigation Highlighting on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 180;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // --- 6. Hero Slider Indicators ---
  const heroIndicators = document.querySelectorAll('.hero-carousel-indicators span');
  heroIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      heroIndicators.forEach(ind => ind.classList.remove('active', 'indicator-bar'));
      heroIndicators.forEach(ind => ind.classList.add('indicator-dot'));

      indicator.classList.remove('indicator-dot');
      indicator.classList.add('indicator-bar', 'active');
    });
  });

  // --- 7. Learn More Modal Demo ---
  const learnMoreBtn = document.getElementById('learnMoreBtn');
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
      const collectionsSec = document.getElementById('collections');
      if (collectionsSec) {
        collectionsSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
