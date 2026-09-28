/* ============================================================
   CAFFYO by Zauq - Main Application Controller
   Glues 3D Physics, Living Cup Assembly, Testimonial Slider,
   Mobile Drawer, Bottom Dock, and Interactive Controls
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();   // Must be first — prevents auto-scroll on load
  initPreloader();
  initLiveCafeStatus();
  initNavbarScroll();
  initHeroSlider();
  initExplosionTriggers();
  initHUDControls();
  initAudioToggle();
  initBrewLabControls();
  initMobileDrawer();
  initTestimonialSlider();
  initBestSellersTabs();
  initBrewGuideTabs();
  initBottomDock();
});

/* ============================================================
   SMOOTH SCROLL — JS Controlled
   Intercepts all internal #anchor clicks and scrolls smoothly.
   The CSS scroll-behavior:smooth is intentionally removed so the
   browser does NOT auto-scroll on page load or hash changes.
   ============================================================ */
function initSmoothScroll() {
  // Remove the hash from URL on load so browser doesn't jump
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }

  // Intercept all same-page anchor clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update URL hash silently without triggering browser scroll
    history.pushState(null, '', hash);
  });
}


/* ============================================================
   DRIBBLE-INSPIRED HERO CAROUSEL CONTROLLER (reference.mp4)
   Cycles through signature roasts & updates background kinetic text,
   brew details, and triggers subtle 3D aroma bursts
   ============================================================ */
function initHeroSlider() {
  const slides = [
    {
      word: 'INSANE',
      name: 'Customer Favorite: Insane Burger',
      tag: 'House Special',
      desc: 'Double-breaded crispy chicken, molten cheddar, and house relish on toasted brioche.'
    },
    {
      word: 'SPANISH',
      name: 'Signature Iced Spanish Latte',
      tag: 'Handcrafted',
      desc: 'Chilled condensed milk layered with bold Arabica espresso and velvety crema.'
    },
    {
      word: 'PIZZA',
      name: 'Stone-Baked Margherita Pizza',
      tag: 'Stone-Baked',
      desc: 'San Marzano tomato concassé, bubbly mozzarella, and sweet garden basil.'
    },
    {
      word: 'ALFREDO',
      name: 'Creamy Garlic Parmesan Alfredo',
      tag: 'Comfort Classic',
      desc: 'Silky butter, garlic cream, and aged parmesan folded over al dente penne.'
    },
    {
      word: 'COLD BREW',
      name: '18-Hr Caffyo On The Rocks',
      tag: '18-Hr Steep',
      desc: 'Slow-steeped Arabica cold brew poured over a crystal rock with lingering sweetness.'
    }
  ];

  let currentSlide = 0;
  const kineticText = document.getElementById('kinetic-text');
  const brewName = document.getElementById('hero-brew-name');
  const brewPrice = document.getElementById('hero-brew-price');
  const heroDesc = document.querySelector('.hero-desc');
  const prevBtn = document.getElementById('btn-hero-prev');
  const nextBtn = document.getElementById('btn-hero-next');

  function goToSlide(index, direction = 'next') {
    currentSlide = (index + slides.length) % slides.length;
    const slide = slides[currentSlide];

    if (kineticText) {
      kineticText.style.opacity = '0';
      kineticText.style.transform = direction === 'next' ? 'translateY(-20px) scale(0.96)' : 'translateY(20px) scale(0.96)';

      setTimeout(() => {
        kineticText.textContent = slide.word;
        kineticText.style.transform = direction === 'next' ? 'translateY(20px) scale(0.96)' : 'translateY(-20px) scale(0.96)';

        requestAnimationFrame(() => {
          kineticText.style.opacity = '1';
          kineticText.style.transform = 'translateY(0) scale(1)';
        });
      }, 180);
    }

    if (brewName) brewName.textContent = slide.name;
    if (brewPrice) brewPrice.textContent = slide.tag;
    if (heroDesc) heroDesc.textContent = slide.desc;

    // Trigger gentle liquid surface ripple in 3D cup
    if (window.caffyo3D && window.caffyo3D.triggerLiquidRipple) {
      window.caffyo3D.triggerLiquidRipple();
    }

    // Play subtle bean click sound
    if (window.caffyoAudio) {
      window.caffyoAudio.playBeanClick();
    }
  }

  // Provide global access to cycle roasts
  window.cycleHeroRoast = () => {
    goToSlide(currentSlide + 1, 'next');
  };
}

/* Sticky Navbar Blur Effect */
function initNavbarScroll() {
  const navbar = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* Roast Cycle & 3D Interactive Triggers (No Explosions) */
function initExplosionTriggers() {
  // Hero rotate roast button
  const rotateRoastBtn = document.getElementById('btn-hero-explode');
  if (rotateRoastBtn) {
    rotateRoastBtn.addEventListener('click', () => {
      if (window.cycleHeroRoast) {
        window.cycleHeroRoast();
      }
      rotateRoastBtn.style.transform = 'scale(0.96)';
      setTimeout(() => { rotateRoastBtn.style.transform = ''; }, 160);
    });
  }
}

/* HUD Camera Controls */
function initHUDControls() {
  const hudButtons = document.querySelectorAll('.hud-btn');
  hudButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      hudButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-mode');
      if (window.caffyo3D) {
        window.caffyo3D.setViewMode(mode);
      }
      if (window.caffyoAudio) {
        window.caffyoAudio.playBeanClick();
      }
    });
  });
}

/* Audio Player & Toggle */
function initAudioToggle() {
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (window.caffyoAudio) {
      const isPlaying = window.caffyoAudio.toggleSound();
      if (isPlaying) {
        soundBtn.classList.add('playing');
        soundBtn.innerHTML = '🔊';
        soundBtn.title = 'Mute Cafe Soundscape';
        if (window.caffyoCart) window.caffyoCart.showToast('Cozy Cafe Soundscape Playing 🎶');
      } else {
        soundBtn.classList.remove('playing');
        soundBtn.innerHTML = '🔈';
        soundBtn.title = 'Play Ambient Soundscape';
      }
    }
  });
}

/* Mobile Slide-in Drawer */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('btn-mobile-menu');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('btn-close-mobile-drawer');

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) closeMenu();
    else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close when clicking mobile nav links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/* Brew Lab / Living Cup Interactive Assembler */
function initBrewLabControls() {
  let currentRoast = 'signature';
  let currentExtraction = 'double';
  let currentMilk = 'oat';
  let currentFlavor = 'caramel';

  // Base & Extra prices matching official menu
  const basePrices = {
    blonde: 119, // Cafe Latte base
    signature: 149, // Spanish Latte base
    dark: 139 // Smooth Mocha base
  };

  const extraPrices = {
    single: 0,
    double: 30,
    nitro: 50,
    none: 0,
    whole: 0,
    oat: 30,
    caramel: 20,
    hazelnut: 20,
    vanilla: 20
  };

  function calculatePrice() {
    let price = (basePrices[currentRoast] || 149) +
                (extraPrices[currentExtraction] || 0) +
                (extraPrices[currentMilk] || 0) +
                (extraPrices[currentFlavor] || 0);

    const priceEl = document.getElementById('brew-calculated-price');
    if (priceEl) priceEl.textContent = `₹${price}`;

    const summaryEl = document.getElementById('brew-summary-text');
    if (summaryEl) {
      summaryEl.textContent = `${currentRoast.toUpperCase()} Roast • ${currentExtraction.toUpperCase()} Extraction • ${currentMilk.toUpperCase()} Milk • ${currentFlavor.toUpperCase()} Drizzle`;
    }

    // Update 3D Model
    if (window.brewLab) {
      window.brewLab.updateConfig(currentRoast, currentExtraction, currentMilk, currentFlavor);
    }
  }

  // Roast Selection
  document.querySelectorAll('[data-roast]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-roast]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentRoast = btn.getAttribute('data-roast');
      const label = document.getElementById('label-roast');
      if (label) label.textContent = btn.textContent;
      calculatePrice();
    });
  });

  // Extraction Selection
  document.querySelectorAll('[data-extract]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-extract]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentExtraction = btn.getAttribute('data-extract');
      const label = document.getElementById('label-extract');
      if (label) label.textContent = btn.textContent;
      calculatePrice();
    });
  });

  // Milk Selection
  document.querySelectorAll('[data-milk]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-milk]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentMilk = btn.getAttribute('data-milk');
      const label = document.getElementById('label-milk');
      if (label) label.textContent = btn.textContent;
      calculatePrice();
    });
  });

  // Flavor Selection
  document.querySelectorAll('[data-flavor]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-flavor]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentFlavor = btn.getAttribute('data-flavor');
      const label = document.getElementById('label-flavor');
      if (label) label.textContent = btn.textContent;
      calculatePrice();
    });
  });

  // Add Custom Brew to Cart
  const addBrewBtn = document.getElementById('btn-add-custom-brew');
  if (addBrewBtn) {
    addBrewBtn.addEventListener('click', () => {
      const priceText = document.getElementById('brew-calculated-price').textContent;
      const price = parseInt(priceText.replace('₹', '')) || 199;

      const customItem = {
        id: `assembled-brew-${Date.now()}`,
        name: `The Living Cup (${currentRoast.toUpperCase()})`,
        price: price,
        qty: 1,
        dietary: currentMilk === 'oat' ? 'vegan' : 'veg',
        description: `Custom ${currentExtraction} extraction with ${currentMilk} milk and ${currentFlavor} drizzle.`
      };

      if (window.caffyoCart) {
        window.caffyoCart.addCustomBrew(customItem);
      }
    });
  }

  calculatePrice();
}

/* Testimonial Carousel (Real Google Maps Reviews) */
function initTestimonialSlider() {
  const reviews = [
    {
      author: 'Sana Kousar',
      avatar: 'S',
      sub: 'Verified Dine-in • 5/5 Food, Service & Atmosphere',
      quote: '“A cozy little café with such a warm and welcoming atmosphere. This was my second visit, and I had another lovely experience. A special thank you to <strong>Anushka</strong>, who welcomed me both times with such kindness and a genuine smile. It may seem like a small gesture, but it really made me feel valued as a customer. The staff is friendly, the service is great, and the café has a comfortable vibe that makes you want to come back. Definitely looking forward to visiting again!”'
    },
    {
      author: 'Yumna Syed',
      avatar: 'Y',
      sub: 'Local Foodie • Insane Burger Fan',
      quote: '“I tried their <strong>Insane Chicken Burger</strong> and it was totally insane! The quantity and the concept of the burger was awesome. The price is very reasonable but the quality and quantity is great. Special appreciation to the staff — they are very friendly and cooperative 🫶”'
    },
    {
      author: 'MasterNotOpYT',
      avatar: 'M',
      sub: 'Verified Reviewer • 7 Google Reviews',
      quote: '“Burger is a solid <strong>10/10</strong> and the food is so tasty! I’ve tried the <strong>Cranberry Cold Brew</strong> and <strong>Ginger Ale Cold Brew</strong> — both were awesome and budget friendly. Must visit in Nagpur!”'
    },
    {
      author: 'Aryan Dhomne',
      avatar: 'A',
      sub: 'Verified Dine-in • Pizza Connoisseur',
      quote: '“We tried their <strong>Margherita Pizza</strong> and it was the bomb! Had a great time with friends. Amazing taste, great vibes, and lovely seating.”'
    },
    {
      author: 'Ayushi Dhengula',
      avatar: 'A',
      sub: 'Google Local Guide • 24 Reviews',
      quote: '“Very yum food! I tried the <strong>Alfredo Pasta</strong>, <strong>Caramel Salt</strong>, and <strong>Caffyo On The Rocks</strong> — all highly recommended! The staff is very friendly and the ambiance is super cozy.”'
    },
    {
      author: 'Samreen Khan',
      avatar: 'S',
      sub: 'Verified Foodie • Wholesome Sandwiches',
      quote: '“Loved the healthier twist! The multigrain bread and generous amount of seeds made the sandwich delicious and wholesome. Perfect crunch and fresh herbs. Highly recommend! ❤️”'
    },
    {
      author: 'Pawan Choudhari',
      avatar: 'P',
      sub: 'Local Guide • 3 Reviews',
      quote: '“Our overall experience was very pleasant. The staff members were exceptionally kind and welcoming throughout our visit. We found the flavors of the food to be quite delightful. It was a truly enjoyable occasion. We appreciate the positive atmosphere and excellent service.”'
    },
    {
      author: 'Rahil Khan',
      avatar: 'R',
      sub: 'Verified Guest • Late Night Cravings',
      quote: '“Perfect place for late night cravings. Cozy place, delicious mocktails and specialty coffee with very helpful staff. The vibe here is unbeatable.”'
    }
  ];

  let currentIndex = 0;
  const quoteEl = document.getElementById('testimonial-quote');
  const authorEl = document.getElementById('testimonial-author');
  const subEl = document.getElementById('testimonial-sub');
  const avatarEl = document.getElementById('testimonial-avatar');

  function updateTestimonial(idx) {
    const card = document.querySelector('.testimonial-card');
    if (card) card.style.opacity = '0.35';
    setTimeout(() => {
      const rev = reviews[idx];
      if (quoteEl) quoteEl.innerHTML = rev.quote;
      if (authorEl) authorEl.textContent = rev.author;
      if (subEl) subEl.textContent = rev.sub;
      if (avatarEl) avatarEl.innerHTML = `<span>${rev.avatar}</span>`;
      if (card) card.style.opacity = '1';
    }, 120);
  }

  const prevBtn = document.getElementById('btn-prev-testimonial');
  const nextBtn = document.getElementById('btn-next-testimonial');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
      updateTestimonial(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % reviews.length;
      updateTestimonial(currentIndex);
    });
  }
}

/* Best Sellers Category Filter Tabs */
function initBestSellersTabs() {
  const tabs = document.querySelectorAll('.editorial-tab-btn');
  const cards = document.querySelectorAll('.reference-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   INTERACTIVE BARISTA BREW GUIDE CONTROLLER (Bean & Brew Reference)
   Switches between brew tabs: espresso, pourover, frenchpress, coldbrew
   ============================================================ */
function initBrewGuideTabs() {
  const tabs = document.querySelectorAll('.brew-tab-btn');
  const panes = document.querySelectorAll('.brew-tab-pane');
  if (!tabs.length || !panes.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      if (!targetId) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panes.forEach(pane => {
        if (pane.id === `tab-${targetId}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });

      // Play soft bean click
      if (window.caffyoAudio && window.caffyoAudio.playBeanClick) {
        window.caffyoAudio.playBeanClick();
      }
    });
  });
}


/* ============================================================
   PRELOADER CONTROLLER
   Smooth luxury intro animation before website reveal
   ============================================================ */
function initPreloader() {
  const preloader = document.getElementById('caffyo-preloader');
  if (!preloader) return;

  const bar = document.getElementById('preloader-progress-bar');
  const percentText = document.getElementById('preloader-percent');
  const statusText = document.getElementById('preloader-status-text');

  let current = 0;
  const target = 100;
  const startTime = performance.now();
  const duration = 1350; // 1.35 seconds smooth entrance

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const ease = 1 - Math.pow(1 - progress, 3);
    current = Math.round(ease * target);

    if (bar) bar.style.width = `${current}%`;
    if (percentText) percentText.textContent = `${current}%`;

    if (current < 45) {
      if (statusText) statusText.textContent = 'BREWING AMBIENCE';
    } else if (current < 85) {
      if (statusText) statusText.textContent = 'PREPARING YOUR BREW';
    } else {
      if (statusText) statusText.textContent = 'WELCOME TO CAFFYO';
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      setTimeout(() => {
        preloader.classList.add('loaded');

        // 🎬 Fire cup entry animation as soon as preloader starts fading
        if (window.caffyo3D && window.caffyo3D.triggerCupEntry) {
          window.caffyo3D.triggerCupEntry();
        }

        setTimeout(() => {
          preloader.style.display = 'none';
        }, 850);
      }, 180);
    }
  }

  requestAnimationFrame(step);

  // Safety fallback after 2.5s
  setTimeout(() => {
    if (!preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
    }
  }, 2500);
}

/* ============================================================
   DYNAMIC GOOGLE MAPS HOURS ENGINE (IST Real-Time Clock)
   Syncs live open/closed status against Indian Standard Time
   ============================================================ */
function initLiveCafeStatus() {
  function update() {
    // Current Indian Standard Time (IST, UTC+5:30)
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utcTime + (5.5 * 3600000));

    const currentHour = istTime.getHours();
    const currentMin = istTime.getMinutes();
    const timeInMins = currentHour * 60 + currentMin;

    // CAFFYO Google Maps Hours: 10:00 AM to 11:30 PM (600 mins to 1410 mins)
    const openTimeMins = 10 * 60;        // 10:00 AM = 600
    const closeTimeMins = 23 * 60 + 30; // 11:30 PM = 1410

    const isOpen = timeInMins >= openTimeMins && timeInMins < closeTimeMins;

    const statusBadge = document.getElementById('live-status-badge');
    const statusCountdown = document.getElementById('live-time-countdown');
    const pulseDot = document.querySelector('.live-pulse-dot');
    const mobileStatus = document.getElementById('mobile-live-status');

    if (isOpen) {
      const remainingMins = closeTimeMins - timeInMins;
      const remHours = Math.floor(remainingMins / 60);
      const remM = remainingMins % 60;
      const countdownStr = remHours > 0 ? `${remHours}h ${remM}m` : `${remM}m`;

      if (statusBadge) {
        statusBadge.textContent = 'Open Now';
        statusBadge.classList.remove('closed');
      }
      if (statusCountdown) {
        statusCountdown.textContent = `Closes at 11:30 PM IST (in ${countdownStr}) • Mon–Sun 10:00 AM – 11:30 PM`;
      }
      if (pulseDot) pulseDot.classList.remove('closed');
      if (mobileStatus) {
        mobileStatus.textContent = `Open Now • Closes 11:30 PM (in ${countdownStr})`;
      }
    } else {
      let minsUntilOpen;
      if (timeInMins < openTimeMins) {
        minsUntilOpen = openTimeMins - timeInMins;
      } else {
        minsUntilOpen = (24 * 60 - timeInMins) + openTimeMins;
      }
      const remHours = Math.floor(minsUntilOpen / 60);
      const remM = minsUntilOpen % 60;
      const countdownStr = remHours > 0 ? `${remHours}h ${remM}m` : `${remM}m`;

      if (statusBadge) {
        statusBadge.textContent = 'Closed Now';
        statusBadge.classList.add('closed');
      }
      if (statusCountdown) {
        statusCountdown.textContent = `Opens at 10:00 AM IST (in ${countdownStr}) • Daily 10:00 AM – 11:30 PM`;
      }
      if (pulseDot) pulseDot.classList.add('closed');
      if (mobileStatus) {
        mobileStatus.textContent = `Closed Now • Opens 10:00 AM (in ${countdownStr})`;
      }
    }
  }

  update();
  setInterval(update, 30000); // Live sync every 30 seconds

}

/* ============================================================
   BOTTOM DOCK: Scroll-Driven Active State
   Highlights the correct tab as the user scrolls
   ============================================================ */
function initBottomDock() {
  const dockItems = document.querySelectorAll('.dock-item[data-dock]');
  if (!dockItems.length) return;

  // Map section IDs to dock data-dock keys
  const sectionToDock = {
    'hero': 'hero',
    'interactive-assembly': 'craft',
    'editorial-story': 'story',
    'roasting-spectrum': 'story',
    'best-sellers': 'story',
    'visit': 'visit'
  };

  function setActiveTab(dockKey) {
    dockItems.forEach(item => {
      const key = item.getAttribute('data-dock');
      if (key === dockKey) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // IntersectionObserver for section tracking
  const observed = Object.keys(sectionToDock);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const dockKey = sectionToDock[entry.target.id];
        if (dockKey) setActiveTab(dockKey);
      }
    });
  }, { threshold: 0.4 });

  observed.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

