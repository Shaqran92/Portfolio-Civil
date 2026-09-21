/* =====================================================
   PORTFOLIO — JavaScript (main.js)
   Ghulam Rasool Memon · Civil Engineer
   ===================================================== */

(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('#nav-links a');
  const secObs   = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`#nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.25, rootMargin: '-56px 0px 0px 0px' });
  sections.forEach(s => secObs.observe(s));

  /* ── Scroll fade-up ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  fadeEls.forEach(el => fadeObs.observe(el));

  /* ── ABAQUS Contour tab switcher ── */
  document.querySelectorAll('.ctab-btns').forEach(tabGroup => {
    tabGroup.querySelectorAll('.ctab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target  = btn.dataset.target;
        const display = tabGroup.closest('.rvis-card-body').querySelector('.ctour-display');
        tabGroup.querySelectorAll('.ctab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        display.querySelectorAll('img').forEach(img => {
          img.classList.toggle('active', img.id === target);
        });
      });
    });
  });

  /* ── Research area tab switcher ── */
  const rtabBtns   = document.querySelectorAll('.rtab-btn');
  const rtabPanels = document.querySelectorAll('.rtab-panel');
  rtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      rtabBtns.forEach(b => b.classList.remove('active'));
      rtabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('rtab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── PDF tab switcher (lazy load iframes) ── */
  document.querySelectorAll('.pdf-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pdf-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const frameId = btn.dataset.target;
      const pdfSrc  = btn.dataset.pdf;
      document.querySelectorAll('.pdf-frame').forEach(f => f.classList.remove('active'));
      const frame = document.getElementById(frameId);
      if (frame) {
        if (!frame.src || frame.src === window.location.href || frame.src === 'about:blank') {
          frame.src = pdfSrc;
        }
        frame.classList.add('active');
      }
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Bar chart animate on visible ── */
  const barFills = document.querySelectorAll('.bar-fill, .s-fill, .seismic-fill');
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width || e.target.style.width;
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  barFills.forEach(b => {
    const w = b.style.width;
    b.style.width = '0';
    b.dataset.width = w;
    b.style.transition = 'width 1s ease';
    barObs.observe(b);
  });

})();
