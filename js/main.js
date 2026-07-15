/* ============================================================
   Inertia 中国子公司官网 — 交互脚本
   广州易纳 (Guangzhou Yina)
   ============================================================ */

(function () {
  'use strict';

  /* ---- NavController ---- */
  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var dropdowns = document.querySelectorAll('.nav-dropdown');

  var scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        if (window.scrollY > 80) header.classList.add('site-header--compact');
        else header.classList.remove('site-header--compact');
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('nav-toggle--open');
      navLinks.classList.toggle('nav-links--open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('nav-toggle--open');
        navLinks.classList.remove('nav-links--open');
      });
    });
  }

  dropdowns.forEach(function (dd) {
    var t = dd.querySelector('a');
    if (!t) return;
    t.addEventListener('click', function (e) {
      if (window.innerWidth <= 1024) { e.preventDefault(); dd.classList.toggle('nav-dropdown--open'); }
    });
  });

  /* ---- ScrollReveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var ob = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('reveal--visible'); ob.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(function (el) { ob.observe(el); });
  } else if (reveals.length) {
    reveals.forEach(function (el) { el.classList.add('reveal--visible'); });
  }

  /* ---- LangSwitch ---- */
  document.querySelectorAll('[data-lang-switch]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var lang = link.getAttribute('data-lang-switch');
      var p = window.location.pathname;
      if (p.indexOf('/zh/') !== -1 && lang === 'en') window.location.href = p.replace('/zh/', '/en/');
      else if (p.indexOf('/en/') !== -1 && lang === 'zh') window.location.href = p.replace('/en/', '/zh/');
      else window.location.href = lang === 'en' ? '../en/index.html' : '../zh/index.html';
    });
  });

  /* ---- CaseSlider: 无限循环拖拽 ---- */
  var grid = document.querySelector('.cases-grid');
  var dots = document.querySelectorAll('.cases-dot');

  if (grid && dots.length) {
    var N = 7, PAD = 3;
    var orig = Array.from(grid.querySelectorAll('.case-card')).slice(0, N);

    // 克隆垫片
    for (var a = N - PAD; a < N; a++) {
      var c1 = orig[a].cloneNode(true); c1.setAttribute('data-clone','pre'); grid.insertBefore(c1, grid.firstChild);
    }
    for (var b = 0; b < PAD; b++) {
      var c2 = orig[b].cloneNode(true); c2.setAttribute('data-clone','post'); grid.appendChild(c2);
    }

    var all = grid.querySelectorAll('.case-card');
    var step = orig[0].offsetWidth + 24;
    grid.scrollLeft = step * PAD;

    var down = false, sx, sl;
    grid.addEventListener('mousedown', function (e) {
      down = true; grid.style.cursor = 'grabbing';
      sx = e.pageX; sl = grid.scrollLeft;
      e.preventDefault();
    });
    window.addEventListener('mouseup', function () { down = false; grid.style.cursor = 'grab'; });
    window.addEventListener('mousemove', function (e) {
      if (!down) return;
      var ns = sl + (sx - e.pageX) * 1.2;
      // 边界循环
      var minEdge = step * (PAD - 1);
      var maxEdge = step * (PAD + N) - grid.offsetWidth + step;
      while (ns > maxEdge) { ns -= step * N; sl -= step * N; }
      while (ns < minEdge) { ns += step * N; sl += step * N; }
      grid.scrollLeft = ns;
    });

    function dotsUp() {
      var ctr = grid.scrollLeft + grid.offsetWidth / 2;
      var best = 0, min = Infinity;
      all.forEach(function (c, i) {
        var d = Math.abs(ctr - (c.offsetLeft + c.offsetWidth / 2));
        if (d < min) { min = d; best = i; }
      });
      var real = ((best - PAD) % N + N) % N;
      dots.forEach(function (d) { d.classList.remove('cases-dot--active'); });
      if (dots[real]) dots[real].classList.add('cases-dot--active');
    }
    grid.addEventListener('scroll', dotsUp);

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var idx = parseInt(dot.getAttribute('data-index'));
        var tgt = all[idx + PAD];
        if (!tgt) return;
        grid.scrollTo({ left: tgt.offsetLeft - (grid.offsetWidth - tgt.offsetWidth) / 2, behavior: 'smooth' });
      });
    });

    // 左右箭头
    function curIdx() {
      var ctr = grid.scrollLeft + grid.offsetWidth / 2;
      var best = 0, min = Infinity;
      all.forEach(function (c, i) {
        var d = Math.abs(ctr - (c.offsetLeft + c.offsetWidth / 2));
        if (d < min) { min = d; best = i; }
      });
      return ((best - PAD) % N + N) % N;
    }
    function goTo(i) {
      var tgt = all[i + PAD];
      if (!tgt) return;
      grid.scrollTo({ left: tgt.offsetLeft - (grid.offsetWidth - tgt.offsetWidth) / 2, behavior: 'smooth' });
    }
    var arrowL = document.querySelector('.cases-arrow--left');
    var arrowR = document.querySelector('.cases-arrow--right');
    if (arrowL) arrowL.addEventListener('click', function () { goTo((curIdx() - 1 + N) % N); });
    if (arrowR) arrowR.addEventListener('click', function () { goTo((curIdx() + 1) % N); });

  }

  /* ---- 平滑滚动 ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

})();
