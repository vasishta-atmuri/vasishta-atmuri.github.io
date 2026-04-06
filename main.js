/* ═══════════════════════════════════════════════════
   VASISHTA ATMURI — Portfolio Interactions & Animations
═══════════════════════════════════════════════════ */

// ── SCROLL PROGRESS BAR ──────────────────────────────
const progressBar = document.querySelector('.scroll-progress-bar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.width = (scrolled * 100) + '%';
  }, { passive: true });
}

// ── TOP NAV SCROLL SPY & BACKGROUND ─────────────────
const sections = document.querySelectorAll('#impact, #expertise, #experience, #projects, #skills, #education, #contact');
const navLinks = document.querySelectorAll('.nav-links a');
const topNav = document.querySelector('.top-nav');

const spyObserver = new IntersectionObserver((entries) => {
  let activeId = '';
  entries.forEach(entry => {
    if (entry.isIntersecting) activeId = entry.target.id;
  });
  if (activeId) {
    navLinks.forEach(link => {
      link.classList.toggle('nav-active', link.getAttribute('href') === '#' + activeId);
    });
  }
}, { rootMargin: '-30% 0px -70% 0px' });

sections.forEach(s => { if (s) spyObserver.observe(s); });

window.addEventListener('scroll', () => {
  if (topNav) topNav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── MARQUEE TICKER ───────────────────────────────────
const marqueeWrapper = document.querySelector('.marquee-wrapper');
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeWrapper && marqueeTrack) {
  const clone = marqueeTrack.cloneNode(true);
  marqueeWrapper.appendChild(clone);
}

// ── ANIMATED NUMBER COUNTERS ─────────────────────────
function animateCounter(el) {
  const raw = el.dataset.target || el.textContent.trim();
  const isM = raw.includes('M');
  const isPlus = raw.includes('+');
  const isPercent = raw.includes('%');
  const hasDollar = raw.includes('$');
  const num = parseFloat(raw.replace(/[^0-9.]/g, ''));

  if (isNaN(num)) return;

  let start = null;
  const duration = 1800;
  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);
    const current = num * eased;

    let display;
    if (num >= 100) display = Math.round(current);
    else if (num >= 10) display = Math.round(current * 10) / 10;
    else display = (Math.round(current * 10) / 10).toFixed(1);

    el.textContent = (hasDollar ? '$' : '') + display + (isM ? 'M' : '') + (isPercent ? '%' : '') + (isPlus ? '+' : '');

    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = raw;
  }

  requestAnimationFrame(step);
}

// ── INTERSECTION OBSERVER REVEAL SYSTEM ──────────────
// Unified scroll-reveal powered by IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

// Reveal sections: impact cards, edu cards, chart cards, skills categories, etc.
function setupRevealElements() {
  // Section headers (eyebrow + title + subtitle)
  document.querySelectorAll('.section-eyebrow, .section-title, .section-subtitle').forEach((el, i) => {
    if (!el.closest('.hero-wrapper')) {
      el.classList.add('reveal');
      el.style.setProperty('--delay', `${(i % 3) * 0.1}s`);
      el.style.transitionDelay = `${(i % 3) * 0.1}s`;
      revealObserver.observe(el);
    }
  });

  // Impact cards with stagger
  document.querySelectorAll('.impact-card').forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.style.transitionDelay = `${i * 0.1}s`;
    revealObserver.observe(el);
  });

  // Chart cards
  document.querySelectorAll('.chart-card').forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.style.transitionDelay = `${i * 0.15}s`;
    revealObserver.observe(el);
  });

  // Education cards
  document.querySelectorAll('.edu-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.15}s`;
    revealObserver.observe(el);
  });

  // Certs card
  document.querySelectorAll('.certs-card').forEach(el => {
    el.classList.add('reveal');
    el.style.transitionDelay = '0.3s';
    revealObserver.observe(el);
  });

  // Skills categories with stagger
  document.querySelectorAll('.skills-category').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
    revealObserver.observe(el);
  });

  // Contact section
  document.querySelectorAll('.contact-link').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
    revealObserver.observe(el);
  });

  // Expertise content area
  document.querySelectorAll('.expertise-tabs').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // SD showcase
  document.querySelectorAll('.sd-showcase').forEach(el => {
    el.classList.add('reveal-scale');
    revealObserver.observe(el);
  });
}

// Timeline items reveal with stagger
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

function setupTimelineReveal() {
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    timelineObserver.observe(el);
  });
}

// Skill chip cascade
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Stagger each chip
      const chips = entry.target.querySelectorAll('.skill-chip');
      chips.forEach((chip, i) => {
        chip.style.transitionDelay = `${i * 0.04}s`;
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

function setupSkillChipCascade() {
  document.querySelectorAll('.skills-category').forEach(el => {
    skillsObserver.observe(el);
  });
}

// SD product card stagger
const sdObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      const cards = entry.target.querySelectorAll('.sd-product-card');
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
      });
      sdObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function setupSDReveal() {
  document.querySelectorAll('.sd-showcase').forEach(el => {
    sdObserver.observe(el);
  });
}

// ── HERO APP ICON STAGGER ────────────────────────────
function setupHeroIconStagger() {
  document.querySelectorAll('.app-icon-wrapper').forEach((icon, i) => {
    icon.style.setProperty('--icon-delay', `${0.6 + i * 0.06}s`);
  });
}

// ── GENERAL SCROLL REVEAL (legacy fade-in support) ───
function revealOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in:not(.visible)');
  const counterEls = document.querySelectorAll('.impact-number:not(.counted)');
  const animUpEls = document.querySelectorAll('.animate-up:not(.in-view)');

  const checkInView = (el, threshold = 0.1) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight * (1 - threshold + 0.05) && rect.bottom >= 0;
  };

  fadeEls.forEach(el => {
    if (checkInView(el, 0.08)) {
      const parent = el.parentElement;
      const siblings = parent ? Array.from(parent.querySelectorAll('.fade-in')) : [];
      const idx = siblings.indexOf(el);
      const delay = Math.min(idx * 80, 400);
      setTimeout(() => el.classList.add('visible'), delay);
    }
  });

  counterEls.forEach(el => {
    if (checkInView(el, 0.2)) {
      el.classList.add('counted');
      animateCounter(el);
    }
  });

  animUpEls.forEach(el => {
    if (checkInView(el, 0.1)) {
      el.classList.add('in-view');
    }
  });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('resize', revealOnScroll, { passive: true });
setTimeout(revealOnScroll, 100);

// ── PARALLAX ON HERO VISUAL ──────────────────────────
const heroVisual = document.querySelector('.app-icon-grid');

if (heroVisual) {
  heroVisual.style.transition = 'transform 0.3s ease-out';
  heroVisual.style.transformStyle = 'preserve-3d';

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroVisual.style.transform = `perspective(600px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
  }, { passive: true });

  const heroSection = document.querySelector('.hero-wrapper');
  if (heroSection) {
    heroSection.addEventListener('mouseleave', () => {
      heroVisual.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    });
  }
}

// ── 3D CARD TILT EFFECT ──────────────────────────────
function setupCardTilt() {
  const tiltCards = document.querySelectorAll('.pro-card, .edu-card, .impact-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -4;
      const rotateY = (x - centerX) / centerX * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── EXPERTISE TABS ───────────────────────────────────
document.querySelectorAll('.expertise-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const t = tab.dataset.tab;
    document.querySelectorAll('.expertise-tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.expertise-content').forEach(x => x.classList.remove('active'));
    tab.classList.add('active');
    const content = document.querySelector(`[data-content="${t}"]`);
    if (content) content.classList.add('active');
  });
});

// ── PROFESSIONAL WORK TABS ───────────────────────────
document.querySelectorAll('.pro-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const t = tab.dataset.proTab;
    document.querySelectorAll('.pro-tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.pro-content').forEach(x => x.classList.remove('active'));
    tab.classList.add('active');
    const el = document.getElementById(t);
    if (el) el.classList.add('active');
  });
});

// ── TOGGLE EXPAND ────────────────────────────────────
function toggleExtra(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('open');
  const isOpen = el.classList.contains('open');
  btn.textContent = isOpen ? 'Hide details \u2191' : 'Show details \u2193';
  btn.classList.toggle('is-open', isOpen);
}
window.toggleExtra = toggleExtra;

// ── MAGNETIC BUTTON EFFECT ───────────────────────────
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-btn-primary, .sd-link.primary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ── CHARTS ───────────────────────────────────────────
let impactChartInstance = null;
let progressionChartInstance = null;
let chartResizeTimer = null;

function getChartViewport() {
  return {
    isCompact: window.matchMedia('(max-width: 768px)').matches,
    isNarrow: window.matchMedia('(max-width: 560px)').matches
  };
}

function renderCharts() {
  if (typeof Chart === 'undefined') return;

  const { isCompact, isNarrow } = getChartViewport();
  const accent = '#2563EB';
  const purple = '#8B5CF6';
  const grid = 'rgba(0,0,0,0.04)';
  const tick = '#94A3B8';
  const fontFamily = "'Manrope', -apple-system, sans-serif";
  const impactLabels = isNarrow
    ? ['CPI', 'CTR', 'Install CVR', 'C-SAT']
    : isCompact
      ? ['CPI Reduction', 'CTR Lift', 'Install CVR', 'C-SAT Lift']
      : ['CPI Reduction', 'CTR Lift', 'Install Conv. Lift', 'C-SAT Lift'];
  const impactTooltipLabels = [
    '40% CPI reduction',
    '25% CTR lift',
    '15% install conversion lift',
    '20% C-SAT lift'
  ];
  const progressionRoles = [
    'Deloitte Analyst',
    'MBA Studies',
    'Global Strategist',
    'Mgr Partnerships',
    'Lead PM',
    'Sr. Mgr Canada',
    'Sr. Mgr Canada',
    'Lead, Gaming Platform Partnerships'
  ];
  const impactScales = isNarrow
    ? {
        x: {
          ticks: {
            color: tick,
            callback: value => `${value}%`,
            font: { size: 10, weight: '600', family: fontFamily },
            maxTicksLimit: 5
          },
          grid: { color: grid },
          suggestedMax: 50
        },
        y: {
          ticks: {
            color: tick,
            font: { size: 10, weight: '600', family: fontFamily }
          },
          grid: { display: false }
        }
      }
    : {
        x: {
          ticks: {
            color: tick,
            font: { size: isCompact ? 10 : 11, weight: '600', family: fontFamily },
            maxRotation: 0,
            minRotation: 0
          },
          grid: { color: grid }
        },
        y: {
          ticks: {
            color: tick,
            callback: value => `${value}%`,
            font: { size: isCompact ? 10 : 11, family: fontFamily }
          },
          grid: { color: grid },
          suggestedMax: 50
        }
      };

  const impactEl = document.getElementById('impactChart');
  if (impactEl) {
    impactChartInstance?.destroy();
    impactChartInstance = new Chart(impactEl.getContext('2d'), {
      type: 'bar',
      data: {
        labels: impactLabels,
        datasets: [{
          data: [40, 25, 15, 20],
          backgroundColor: [accent, '#3B82F6', '#6366F1', purple],
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: isNarrow ? 24 : isCompact ? 34 : 42
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 150,
        indexAxis: isNarrow ? 'y' : 'x',
        animation: { duration: isCompact ? 800 : 1200, easing: 'easeOutQuart' },
        layout: {
          padding: {
            top: 4,
            right: isNarrow ? 4 : 8,
            bottom: isNarrow ? 0 : 4,
            left: isNarrow ? 0 : 4
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => impactTooltipLabels[ctx.dataIndex]
            },
            titleFont: { family: fontFamily },
            bodyFont: { family: fontFamily }
          }
        },
        scales: impactScales
      }
    });
  }

  const progressEl = document.getElementById('progressionChart');
  if (progressEl) {
    progressionChartInstance?.destroy();
    progressionChartInstance = new Chart(progressEl.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['2010', '2013', '2015', '2017', '2020', '2021', '2025', '2026'],
        datasets: [{
          data: [1, 2, 3.5, 5, 6, 7.5, 9, 9.5],
          borderColor: accent,
          backgroundColor: 'rgba(37,99,235,0.08)',
          borderWidth: 2.5,
          pointBackgroundColor: accent,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: isCompact ? 3 : 5,
          pointHoverRadius: isCompact ? 5 : 8,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 150,
        animation: { duration: isCompact ? 900 : 1500, easing: 'easeOutQuart' },
        layout: {
          padding: {
            top: 4,
            right: isNarrow ? 6 : 10,
            bottom: 0,
            left: isNarrow ? 0 : 6
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => progressionRoles[ctx.dataIndex] || ''
            },
            titleFont: { family: fontFamily },
            bodyFont: { family: fontFamily }
          }
        },
        scales: {
          x: {
            ticks: {
              color: tick,
              font: { size: isCompact ? 10 : 11, weight: '600', family: fontFamily },
              autoSkip: true,
              maxTicksLimit: isNarrow ? 4 : isCompact ? 5 : 8
            },
            grid: { color: grid }
          },
          y: { display: false, min: 0, max: 11 }
        }
      }
    });
  }
}

window.addEventListener('load', () => {
  renderCharts();

  window.addEventListener('resize', () => {
    window.clearTimeout(chartResizeTimer);
    chartResizeTimer = window.setTimeout(renderCharts, 180);
  });
});

// ── CAROUSEL DOT NAVIGATION ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const setupCarousel = (trackSelector, dotsContainerId) => {
    const track = document.querySelector(trackSelector);
    const documentDotsContainer = document.getElementById(dotsContainerId);
    if (!track || !documentDotsContainer) return;

    const items = Array.from(track.children).filter(el => el.classList.contains('carousel-item'));
    if (items.length === 0) return;

    documentDotsContainer.innerHTML = '';

    items.forEach((item, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

      dot.addEventListener('click', () => {
        const trackPadding = parseInt(window.getComputedStyle(track).paddingLeft) || 0;
        track.scrollTo({ left: item.offsetLeft - trackPadding, behavior: 'smooth' });
      });
      documentDotsContainer.appendChild(dot);
    });

    const updateDots = () => {
      const scrollPos = track.scrollLeft;
      const trackPadding = parseInt(window.getComputedStyle(track).paddingLeft) || 0;
      let closestIndex = 0;
      let minDiff = Infinity;

      items.forEach((item, index) => {
        const itemPos = item.offsetLeft - trackPadding;
        const diff = Math.abs(itemPos - scrollPos);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      });

      Array.from(documentDotsContainer.children).forEach((dot, index) => {
        dot.classList.toggle('active', index === closestIndex);
      });
    };

    track.addEventListener('scroll', () => {
      requestAnimationFrame(updateDots);
    }, { passive: true });

    window.addEventListener('resize', updateDots);
  };

  setupCarousel('#impact .carousel-track', 'dots-impact');
  setupCarousel('#partnerships-work .carousel-track', 'dots-partnerships');
  setupCarousel('#product-work .carousel-track', 'dots-product');

  // Initialize all animation systems
  setupRevealElements();
  setupTimelineReveal();
  setupSkillChipCascade();
  setupSDReveal();
  setupHeroIconStagger();
  setupCardTilt();
});
