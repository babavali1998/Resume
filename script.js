/* ================================================================
   BABAVALI KOTCHERLA — PORTFOLIO SCRIPT
   Handles: Loader · Cursor · Nav · Canvas · Typewriter ·
            Scroll Animations · Counters · Mobile Menu
================================================================ */

'use strict';

/* ─── CONSTANTS ──────────────────────────────────────────────── */
const PHRASES = [
  'AI-Powered Solutions',
  'Enterprise Applications',
  'Intelligent Systems',
  'Full-Stack Products',
  'ML Pipelines',
  'Conversational AI',
];

/* ─── LOADER ─────────────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('loader');
  const body   = document.body;

  window.addEventListener('load', () => {
    // Give the fill animation time to complete (1.9s defined in CSS)
    setTimeout(() => {
      loader.classList.add('done');
      body.classList.remove('is-loading');

      // Stagger-reveal the hero elements once loader is gone
      setTimeout(revealHeroItems, 400);
    }, 2000);
  });

  function revealHeroItems() {
    document.querySelectorAll('#hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 130);
    });
  }
})();

/* ─── SCROLL PROGRESS BAR ────────────────────────────────────── */
(function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const max   = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ─── CUSTOM CURSOR (pointer devices) ───────────────────────── */
(function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0;      // mouse position
  let rx = 0, ry = 0;      // ring position (lagged)
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    if (!raf) raf = requestAnimationFrame(trackRing);
  });

  function trackRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = Math.abs(rx - mx) > 0.5 || Math.abs(ry - my) > 0.5
      ? requestAnimationFrame(trackRing)
      : null;
  }

  // Expand ring on hoverable elements
  const hoverEls = 'a, button, .proj-card, .skill-group, .stat-card, .tl-card, .edu-card, .cert-card';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

/* ─── NAVIGATION ─────────────────────────────────────────────── */
(function initNav() {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobile-menu');
  let menuOpen = false;

  // Scroll state
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    highlightActiveSection();
  }, { passive: true });

  // Hamburger toggle
  if (burger && menu) {
    burger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      burger.classList.toggle('open', menuOpen);
      menu.classList.toggle('open', menuOpen);
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    });

    // Close when a mobile nav link is clicked
    menu.querySelectorAll('.mobile-nav-a, .btn').forEach(el => {
      el.addEventListener('click', closeMenu);
    });
  }

  function closeMenu() {
    menuOpen = false;
    burger && burger.classList.remove('open');
    menu   && menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Keyboard: Escape closes menu
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  // Active section highlighting
  function highlightActiveSection() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-a');
    let current = '';

    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });

    navLinks.forEach(link => {
      const matches = link.getAttribute('href') === '#' + current;
      link.classList.toggle('active', matches);
    });
  }
})();

/* ─── SMOOTH SCROLL (for anchor links) ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── HERO CANVAS — animated gradient orbs ───────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const orbs = [
    { px: .15, py: .28, r: 380, hue: '37,99,235',  a: .16, sp: .00028, phase: 0    },
    { px: .72, py: .55, r: 480, hue: '124,58,237', a: .11, sp: .00020, phase: 1.2  },
    { px: .48, py: .82, r: 300, hue: '6,182,212',  a: .09, sp: .00036, phase: 2.4  },
    { px: .85, py: .18, r: 240, hue: '16,185,129', a: .07, sp: .00030, phase: 3.6  },
  ];

  let w, h, t = 0;

  function resize() {
    w = canvas.width  = canvas.clientWidth;
    h = canvas.height = canvas.clientHeight;
  }

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  function draw() {
    ctx.clearRect(0, 0, w, h);

    orbs.forEach(o => {
      const x = (o.px + Math.sin(t * o.sp * 1000 + o.phase) * .14) * w;
      const y = (o.py + Math.cos(t * o.sp * 800  + o.phase) * .12) * h;
      const g = ctx.createRadialGradient(x, y, 0, x, y, o.r);
      g.addColorStop(0, `rgba(${o.hue},${o.a})`);
      g.addColorStop(1, `rgba(${o.hue},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, o.r, 0, Math.PI * 2);
      ctx.fill();
    });

    t += 16;
    requestAnimationFrame(draw);
  }

  draw();
})();

/* ─── TYPEWRITER ─────────────────────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  let pi = 0, ci = 0, deleting = false, delay = 110;

  function tick() {
    const phrase = PHRASES[pi];

    if (deleting) {
      el.textContent = phrase.slice(0, ci - 1);
      ci--;
      delay = 55;
    } else {
      el.textContent = phrase.slice(0, ci + 1);
      ci++;
      delay = 110;
    }

    if (!deleting && ci === phrase.length) {
      deleting = true;
      delay = 2200;
    } else if (deleting && ci === 0) {
      deleting = false;
      pi = (pi + 1) % PHRASES.length;
      delay = 450;
    }

    setTimeout(tick, delay);
  }

  // Delay first run until after loader clears
  setTimeout(tick, 2600);
})();

/* ─── SCROLL REVEAL (IntersectionObserver) ───────────────────── */
(function initReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe all reveal elements (excluding hero — handled by loader)
  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.closest('#hero')) observer.observe(el);
  });

  // Stagger items inside grids
  const gridObserver = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.reveal').forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 90);
        });
        gridObserver.unobserve(entry.target);
      }
    }),
    { threshold: 0.05 }
  );

  document.querySelectorAll(
    '.projects-grid, .skills-grid, .stats-grid, .edu-grid, .certs-grid, .timeline'
  ).forEach(grid => gridObserver.observe(grid));
})();

/* ─── COUNTER ANIMATION ──────────────────────────────────────── */
(function initCounters() {
  const section = document.getElementById('about');
  if (!section) return;

  let animated = false;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      runCounters();
      observer.disconnect();
    }
  }, { threshold: 0.35 });

  observer.observe(section);

  function runCounters() {
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
      const target   = parseInt(el.getAttribute('data-target'), 10);
      const suffix   = el.nextElementSibling; // .stat-suffix
      const duration = 1600;
      const start    = performance.now();

      // Temporarily hide suffix while counting
      if (suffix) suffix.style.opacity = '0';

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
          if (suffix) {
            suffix.style.opacity = '1';
            suffix.style.transition = 'opacity .3s';
          }
        }
      }

      requestAnimationFrame(step);
    });
  }
})();

/* ─── HERO PARALLAX (subtle) ─────────────────────────────────── */
(function initParallax() {
  const heroBody = document.querySelector('.hero-body');
  if (!heroBody) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const s   = window.scrollY;
        const vh  = window.innerHeight;
        if (s < vh) {
          const t = s / vh;
          heroBody.style.transform = `translateY(${s * 0.13}px)`;
          heroBody.style.opacity   = Math.max(0, 1 - t * 1.4);
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── CARD TILT (subtle 3D on desktop) ──────────────────────── */
(function initCardTilt() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll('.proj-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const dx  = (e.clientX - cx) / (r.width  / 2);
      const dy  = (e.clientY - cy) / (r.height / 2);
      const deg = 4;                        // max tilt degrees
      card.style.transform =
        `translateY(-8px) rotateX(${-dy * deg}deg) rotateY(${dx * deg}deg)`;
      card.style.transition = 'transform .05s linear';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform .4s cubic-bezier(0.4,0,0.2,1)';
    });
  });
})();

/* ─── BACK TO TOP VISIBILITY ─────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.style.opacity    = window.scrollY > 600 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 600 ? 'auto' : 'none';
  }, { passive: true });

  btn.style.opacity     = '0';
  btn.style.transition  = 'opacity .3s, transform .3s, background .3s, border-color .3s, color .3s';
})();
