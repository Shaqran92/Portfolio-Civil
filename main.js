/* =====================================================
   PORTFOLIO — JavaScript (main.js)
   Ghulam Rasool Memon · Civil Engineer
   Responsive Interactive Logic
   ===================================================== */

(function () {
  'use strict';

  /* ── 1. Mobile Navigation & Backdrop ── */
  const navToggle   = document.getElementById('nav-toggle');
  const navLinks    = document.getElementById('nav-links');
  const navBackdrop = document.getElementById('nav-backdrop');

  function openNav() {
    if (navLinks) navLinks.classList.add('open');
    if (navToggle) {
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
    }
    if (navBackdrop) navBackdrop.classList.add('active');
  }

  function closeNav() {
    if (navLinks) navLinks.classList.remove('open');
    if (navToggle) {
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    if (navBackdrop) navBackdrop.classList.remove('active');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navLinks.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close when clicking nav links
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeNav());
    });

    // Close when clicking outside on backdrop
    if (navBackdrop) {
      navBackdrop.addEventListener('click', () => closeNav());
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    // Auto-close on resize to desktop (> 840px)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 840) closeNav();
    });
  }

  /* ── 2. Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('#nav-links a');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const secObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navAs.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`#nav-links a[href="#${e.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.25, rootMargin: '-58px 0px 0px 0px' });

    sections.forEach(s => secObs.observe(s));
  }

  /* ── 3. Scroll fade-up animations ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length > 0) {
    const fadeObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          fadeObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.06 });

    fadeEls.forEach(el => fadeObs.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 4. ABAQUS Contour tab switcher ── */
  document.querySelectorAll('.ctab-btns').forEach(tabGroup => {
    tabGroup.querySelectorAll('.ctab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target  = btn.dataset.target;
        const display = tabGroup.closest('.rvis-card-body').querySelector('.ctour-display');
        tabGroup.querySelectorAll('.ctab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (display) {
          display.querySelectorAll('img').forEach(img => {
            img.classList.toggle('active', img.id === target);
          });
        }
      });
    });
  });

  /* ── 5. Research area tab switcher ── */
  const rtabBtns   = document.querySelectorAll('.rtab-btn');
  const rtabPanels = document.querySelectorAll('.rtab-panel');
  rtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      rtabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      rtabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById('rtab-' + target);
      if (panel) {
        panel.classList.add('active');
        // If on small mobile, scroll to content area smoothly
        if (window.innerWidth <= 640) {
          const tabsNav = document.querySelector('.research-tabs-nav');
          if (tabsNav) {
            const rect = tabsNav.getBoundingClientRect();
            if (rect.top < 0) {
              tabsNav.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
      }
    });
  });

  /* ── 6. PDF viewer tab switcher ── */
  const pdfTabBtns = document.querySelectorAll('.pdf-tab-btn');
  pdfTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pdfTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.dataset.target;
      const pdfSrc   = btn.dataset.pdf;

      document.querySelectorAll('.pdf-frame').forEach(frame => {
        frame.classList.remove('active');
      });

      const activeFrame = document.getElementById(targetId);
      if (activeFrame) {
        if (!activeFrame.src || activeFrame.src === 'about:blank' || activeFrame.src === window.location.href) {
          activeFrame.src = pdfSrc;
        }
        activeFrame.classList.add('active');
      }
    });
  });

  /* ── 7. Smooth scrolling for internal anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ── 8. Bar chart animate on visible ── */
  const barFills = document.querySelectorAll('.bar-fill, .s-fill, .seismic-fill, .perf-fill');
  if ('IntersectionObserver' in window && barFills.length > 0) {
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = e.target;
          target.style.width = target.dataset.width || target.style.width;
          barObs.unobserve(target);
        }
      });
    }, { threshold: 0.25 });

    barFills.forEach(b => {
      const w = b.style.width;
      b.style.width = '0';
      b.dataset.width = w;
      barObs.observe(b);
    });
  }

})();
