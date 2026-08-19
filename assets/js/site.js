/* Portfolio — comportements minimaux, sans dependance externe. */

(function () {
  'use strict';

  /* ---- Fond interactif : points connectes ------------------------------- */
  function initNetworkBackground() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    var canvas = document.createElement('canvas');
    canvas.className = 'network-bg';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var points = [];
    var mouse = { x: -9999, y: -9999 };

    function resize() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.max(95, Math.min(180, Math.floor((w * h) / 8200)));
      points = [];
      for (var i = 0; i < count; i += 1) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28
        });
      }
    }

    function movePoint(p, w, h) {
      var dx = p.x - mouse.x;
      var dy = p.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        var force = (150 - dist) / 150;
        p.vx += (dx / (dist || 1)) * force * 0.018;
        p.vy += (dy / (dist || 1)) * force * 0.018;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.985;
      p.vy *= 0.985;

      if (p.x < 0 || p.x > w) { p.vx *= -1; }
      if (p.y < 0 || p.y > h) { p.vy *= -1; }
      p.x = Math.max(0, Math.min(w, p.x));
      p.y = Math.max(0, Math.min(h, p.y));
    }

    function draw() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      points.forEach(function (p) { movePoint(p, w, h); });

      var drawn = {};
      points.forEach(function (a, i) {
        var neighbors = [];
        points.forEach(function (b, j) {
          if (i === j) { return; }
          var dx = a.x - b.x;
          var dy = a.y - b.y;
          neighbors.push({ index: j, point: b, dist: Math.sqrt(dx * dx + dy * dy) });
        });
        neighbors.sort(function (a, b) { return a.dist - b.dist; });

        neighbors.slice(0, 2).forEach(function (n, rank) {
          var key = i < n.index ? i + '-' + n.index : n.index + '-' + i;
          if (drawn[key]) { return; }
          drawn[key] = true;
          var strength = Math.max(0.055, 1 - n.dist / 190) * (rank === 0 ? 0.20 : 0.12);
          ctx.strokeStyle = 'rgba(153, 163, 172, ' + strength.toFixed(3) + ')';
          ctx.lineWidth = rank === 0 ? 1 : 0.75;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(n.point.x, n.point.y);
          ctx.stroke();
        });
      });

      points.forEach(function (p) {
        var mdx = p.x - mouse.x;
        var mdy = p.y - mouse.y;
        var nearMouse = Math.sqrt(mdx * mdx + mdy * mdy) < 150;
        ctx.fillStyle = nearMouse ? 'rgba(111, 207, 139, .74)' : 'rgba(233, 236, 238, .38)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, nearMouse ? 2.1 : 1.45, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('pointerleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    resize();
    draw();
  }

  initNetworkBackground();

  /* ---- Langue ----------------------------------------------------------- */
  var STORE = 'portfolio-lang';
  var root = document.documentElement;

  function readStored() {
    try { return window.localStorage.getItem(STORE); } catch (e) { return null; }
  }
  function writeStored(v) {
    try { window.localStorage.setItem(STORE, v); } catch (e) { /* mode prive */ }
  }

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    writeStored(lang);
    document.querySelectorAll('.langswitch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    var t = document.querySelector('title[data-' + lang + ']');
    if (t) { document.title = t.getAttribute('data-' + lang); }
  }

  var initial = readStored();
  if (!initial) {
    initial = (navigator.language || 'en').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
  }
  setLang(initial);

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.langswitch button');
    if (btn) { setLang(btn.dataset.lang); }
  });

  /* ---- Images absentes : cadre etiquete au lieu d'une icone cassee ------- */
  document.querySelectorAll('img[data-label]').forEach(function (img) {
    img.addEventListener('error', function () {
      img.classList.add('missing');
      var wipe = img.closest('.wipe');
      if (wipe && img.parentElement.classList.contains('wipe__top')) {
        // Pas d'image d'overlay : on retombe sur une image simple.
        wipe.querySelector('.wipe__top').remove();
        var line = wipe.querySelector('.wipe__line'); if (line) { line.remove(); }
        var range = wipe.querySelector('input'); if (range) { range.remove(); }
        var hint = wipe.querySelector('.wipe__hint'); if (hint) { hint.remove(); }
        return;
      }
      var ph = document.createElement('div');
      ph.className = 'ph';
      ph.textContent = img.dataset.label;
      img.parentElement.insertBefore(ph, img);
    });
  });

  /* ---- Comparateur avant / apres ---------------------------------------- */
  document.querySelectorAll('.wipe').forEach(function (wipe) {
    var range = wipe.querySelector('input[type="range"]');
    if (!range) { return; }
    var apply = function () { wipe.style.setProperty('--pos', range.value + '%'); };
    range.addEventListener('input', apply);
    apply();
  });

  /* ---- Lien de navigation actif ----------------------------------------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    if (a.getAttribute('href') === here) { a.setAttribute('aria-current', 'page'); }
  });
})();
