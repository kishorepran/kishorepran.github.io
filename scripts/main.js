/* ============================================================
   LIQUID GLASS — main.js
   Theme toggle · Navbar scroll · Mobile menu ·
   Scroll animations · Active nav · Hero parallax
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Helpers ──────────────────────────────────────────────── */
  function getStoredTheme() {
    try { return localStorage.getItem('lg-theme'); } catch (e) { return null; }
  }
  function storeTheme(t) {
    try { localStorage.setItem('lg-theme', t); } catch (e) {}
  }

  /* ── Theme ────────────────────────────────────────────────── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    if (theme === 'light') {
      btn.innerHTML =
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
        'stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      btn.innerHTML =
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
        'stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="5"/>' +
        '<line x1="12" y1="1" x2="12" y2="3"/>' +
        '<line x1="12" y1="21" x2="12" y2="23"/>' +
        '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>' +
        '<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
        '<line x1="1" y1="12" x2="3" y2="12"/>' +
        '<line x1="21" y1="12" x2="23" y2="12"/>' +
        '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>' +
        '<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
      btn.setAttribute('aria-label', 'Switch to light mode');
    }
  }

  function initTheme() {
    var stored = getStoredTheme();
    var theme  = stored || 'dark';
    applyTheme(theme);

    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'dark';
      var next    = current === 'light' ? 'dark' : 'light';
      storeTheme(next);
      applyTheme(next);
    });
  }

  /* ── Navbar Scroll ────────────────────────────────────────── */
  function initNavScroll() {
    var nav = document.getElementById('main-nav');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Menu ──────────────────────────────────────────── */
  function initMobileMenu() {
    var hamburger = document.getElementById('nav-hamburger');
    var menu      = document.getElementById('mobile-menu');
    if (!hamburger || !menu) return;

    function openMenu() {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      hamburger.classList.contains('open') ? closeMenu() : openMenu();
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ── Scroll Animations ────────────────────────────────────── */
  function initScrollAnimations() {
    if (prefersReducedMotion)           return;
    if (!window.IntersectionObserver)   return;

    var els = document.querySelectorAll('.fade-up, .fade-in, .stagger');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── Active Nav ───────────────────────────────────────────── */
  function initActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-pill, .mobile-nav-pill').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ── Hero Parallax ────────────────────────────────────────── */
  function initHeroParallax() {
    if (prefersReducedMotion) return;
    var bg = document.querySelector('.hero-bg');
    if (!bg) return;

    var vh = window.innerHeight;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < vh) {
        bg.style.transform = 'translateY(' + (y * 0.28) + 'px)';
      }
    }, { passive: true });
  }

  /* ── Init ─────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initNavScroll();
    initMobileMenu();
    initScrollAnimations();
    initActiveNav();
    initHeroParallax();
  });

}());
