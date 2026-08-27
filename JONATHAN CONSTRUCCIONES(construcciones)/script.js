/* ============================================================================
   JyS JONATHAN CONSTRUCCIÓN — script.js
   Vanilla JS · progressive enhancement
   ----------------------------------------------------------------------------
   01 Configuración y utilidades
   02 Placeholders de assets ausentes
   03 WhatsApp
   04 Header al scroll + scrollspy
   05 Navegación mobile
   06 Servicios interactivos
   07 Selector de revestimientos
   08 Reveals y parallax
   09 Progreso del proceso
   10 Año dinámico
   11 Init
   ========================================================================== */

(function () {
  'use strict';

  /* ==========================================================================
     01 — CONFIGURACIÓN Y UTILIDADES
     ========================================================================== */

  var WA_PHONE = '5491131038679';
  var WA_TEXT  = 'Hola Jonathan, vi la web de JyS y quería consultar por un presupuesto para mi proyecto.';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktopQuery  = window.matchMedia('(min-width: 1024px)');

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function hasGsap() {
    return typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  }

  function onFrame(fn) {
    var ticking = false;
    return function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        fn();
      });
    };
  }

  /* ==========================================================================
     02 — PLACEHOLDERS DE ASSETS AUSENTES
     Si un asset todavía no existe, se oculta la imagen rota y queda visible
     el bloque con el nombre de archivo y la resolución esperada.
     ========================================================================== */

  function initAssetPlaceholders() {
    document.addEventListener('error', function (event) {
      var el = event.target;
      if (!el || el.tagName !== 'IMG') return;
      var holder = el.closest('.ph');
      if (holder) holder.classList.add('is-missing');
    }, true);

    // Imágenes ya fallidas antes de registrar el listener
    $$('.ph img').forEach(function (img) {
      if (img.complete && img.naturalWidth === 0) {
        var holder = img.closest('.ph');
        if (holder) holder.classList.add('is-missing');
      }
    });
  }

  /* ==========================================================================
     03 — WHATSAPP
     ========================================================================== */

  function initWhatsapp() {
    var href = 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(WA_TEXT);
    $$('[data-wa]').forEach(function (link) {
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }

  /* ==========================================================================
     04 — HEADER AL SCROLL + SCROLLSPY
     ========================================================================== */

  function initHeader() {
    var header = $('#siteHeader');
    if (!header) return;

    var update = onFrame(function () {
      header.dataset.scrolled = window.scrollY > 40 ? 'true' : 'false';
    });

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initScrollSpy() {
    var links = $$('.nav-desktop .nav-link');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) return;
      map[id] = link;
      sections.push(section);
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('is-current'); });
        var link = map[entry.target.id];
        if (link) link.classList.add('is-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ==========================================================================
     05 — NAVEGACIÓN MOBILE
     ========================================================================== */

  function initMobileNav() {
    var burger = $('#burger');
    var panel  = $('#mobileNav');
    if (!burger || !panel) return;

    var isOpen = false;

    function open() {
      isOpen = true;
      panel.hidden = false;
      // Forzar reflow para que la transición de entrada se aplique
      void panel.offsetWidth;
      panel.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Cerrar menú');
      document.body.classList.add('is-locked');
      var firstLink = $('a', panel);
      if (firstLink) firstLink.focus({ preventScroll: true });
    }

    function close(returnFocus) {
      if (!isOpen) return;
      isOpen = false;
      panel.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menú');
      document.body.classList.remove('is-locked');
      if (returnFocus) burger.focus({ preventScroll: true });
      window.setTimeout(function () {
        if (!isOpen) panel.hidden = true;
      }, 600);
    }

    burger.addEventListener('click', function () {
      if (isOpen) { close(true); } else { open(); }
    });

    panel.addEventListener('click', function (event) {
      if (event.target === panel) { close(true); return; }
      if (event.target.closest('a')) close(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen) close(true);
    });

    desktopQuery.addEventListener('change', function (event) {
      if (event.matches) close(false);
    });
  }

  /* ==========================================================================
     06 — SERVICIOS INTERACTIVOS
     ========================================================================== */

  function initServices() {
    var root = $('#services');
    if (!root) return;

    var services = $$('.service', root);
    var heads    = $$('.service__head', root);
    if (!services.length) return;

    function activate(index) {
      root.dataset.active = String(index);

      services.forEach(function (service, i) {
        var on = i === index;
        service.classList.toggle('is-active', on);
        var head = $('.service__head', service);
        if (head) {
          head.setAttribute('aria-selected', on ? 'true' : 'false');
          head.tabIndex = on ? 0 : -1;
        }
      });
    }

    heads.forEach(function (head, index) {
      head.addEventListener('click', function () {
        var isActive = services[index].classList.contains('is-active');
        // En mobile funciona como acordeón: permitir cerrar el ítem abierto
        if (isActive && !desktopQuery.matches) {
          services[index].classList.remove('is-active');
          head.setAttribute('aria-selected', 'false');
          return;
        }
        activate(index);
      });

      head.addEventListener('mouseenter', function () {
        if (desktopQuery.matches) activate(index);
      });

      head.addEventListener('keydown', function (event) {
        var next = null;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % heads.length;
        if (event.key === 'ArrowUp'   || event.key === 'ArrowLeft')  next = (index - 1 + heads.length) % heads.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End')  next = heads.length - 1;
        if (next === null) return;
        event.preventDefault();
        activate(next);
        heads[next].focus();
      });
    });

    activate(0);
  }

  /* ==========================================================================
     07 — SELECTOR DE REVESTIMIENTOS
     ========================================================================== */

  function initMaterials() {
    var section = $('#revestimientos');
    if (!section) return;

    var swatches = $$('.swatch', section);
    var layers   = $$('.mat-bg', section);
    var nameEl   = $('[data-mat-name]', section);
    var descEl   = $('[data-mat-desc]', section);
    var featEl   = $('[data-mat-features]', section);
    if (!swatches.length || layers.length < 2) return;

    var current = 0;

    // Chips del selector: usan la misma textura que el fondo
    swatches.forEach(function (swatch) {
      var chip = $('.swatch__chip', swatch);
      if (chip) chip.style.setProperty('--tex', 'url("' + swatch.dataset.texture + '")');
    });

    function paintLayer(layer, swatch) {
      layer.dataset.mat = swatch.dataset.mat;
      layer.style.setProperty('--bg', 'url("' + swatch.dataset.bg + '")');
    }

    /* El fondo se cruza recién cuando la foto está lista: si no, la sección
       parpadea al color de respaldo mientras descarga. */
    function whenReady(src, done) {
      if (!src) { done(); return; }
      var image = new Image();
      var settled = false;
      var finish = function () {
        if (settled) return;
        settled = true;
        done();
      };
      image.addEventListener('load', finish);
      image.addEventListener('error', finish);
      image.src = src;
      if (image.complete) finish();
      window.setTimeout(finish, 1500);
    }

    function paintFeatures(swatch) {
      if (!featEl || !swatch.dataset.features) return;
      featEl.textContent = '';
      swatch.dataset.features.split('|').forEach(function (feature) {
        var item = document.createElement('li');
        item.textContent = feature.trim();
        featEl.appendChild(item);
      });
    }

    function swapText(swatch) {
      if (reducedMotion.matches) {
        nameEl.textContent = swatch.dataset.name;
        descEl.textContent = swatch.dataset.desc;
        paintFeatures(swatch);
        return;
      }
      nameEl.classList.add('is-swapping');
      descEl.classList.add('is-swapping');
      window.setTimeout(function () {
        nameEl.textContent = swatch.dataset.name;
        descEl.textContent = swatch.dataset.desc;
        paintFeatures(swatch);
        nameEl.classList.remove('is-swapping');
        descEl.classList.remove('is-swapping');
      }, 220);
    }

    function select(index) {
      if (index === current) return;
      var swatch = swatches[index];

      var activeLayer = layers.filter(function (l) { return l.classList.contains('is-active'); })[0] || layers[0];
      var hiddenLayer = layers.filter(function (l) { return l !== activeLayer; })[0];

      paintLayer(hiddenLayer, swatch);
      whenReady(swatch.dataset.bg, function () {
        hiddenLayer.classList.add('is-active');
        activeLayer.classList.remove('is-active');
      });

      swapText(swatch);

      swatches.forEach(function (s, i) {
        var on = i === index;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      current = index;
    }

    swatches.forEach(function (swatch, index) {
      swatch.addEventListener('click', function () { select(index); });
    });

    // Estado inicial
    paintLayer(layers[0], swatches[0]);
    layers[0].classList.add('is-active');
    layers[1].classList.remove('is-active');
    paintFeatures(swatches[0]);

    initMaterialsCarousel(section);
  }

  /* Carrusel del selector: sólo desplaza la vista.
     Elegir un material sigue siendo responsabilidad del click en la muestra. */
  function initMaterialsCarousel(section) {
    var viewport = $('[data-swatch-viewport]', section);
    var prev     = $('[data-swatch-prev]', section);
    var next     = $('[data-swatch-next]', section);
    var progress = $('[data-swatch-progress]', section);
    if (!viewport || !prev || !next) return;

    var STEP_ITEMS = 2;

    function stepDistance() {
      var item = $('li', viewport);
      if (!item) return viewport.clientWidth;
      var styles = window.getComputedStyle(viewport.firstElementChild);
      var gap = parseFloat(styles.columnGap || styles.gap) || 0;
      return (item.getBoundingClientRect().width + gap) * STEP_ITEMS;
    }

    function maxScroll() {
      return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    }

    function refresh() {
      var limit = maxScroll();
      var left = viewport.scrollLeft;

      prev.disabled = left <= 1;
      next.disabled = left >= limit - 1;

      if (progress) {
        // Sin desplazamiento posible no hay nada que indicar: se oculta el tramo
        // amarillo y queda sólo la regla, para no mover el layout.
        progress.parentElement.classList.toggle('is-static', limit <= 1);
        var ratio = viewport.scrollWidth > 0
          ? viewport.clientWidth / viewport.scrollWidth
          : 1;
        var offset = viewport.scrollWidth > 0
          ? left / viewport.scrollWidth
          : 0;
        progress.style.width = (Math.min(1, ratio) * 100).toFixed(2) + '%';
        progress.style.left = (offset * 100).toFixed(2) + '%';
      }
    }

    function scrollByStep(direction) {
      viewport.scrollBy({
        left: direction * stepDistance(),
        behavior: reducedMotion.matches ? 'auto' : 'smooth'
      });
    }

    prev.addEventListener('click', function () { scrollByStep(-1); });
    next.addEventListener('click', function () { scrollByStep(1); });

    viewport.addEventListener('scroll', onFrame(refresh), { passive: true });
    window.addEventListener('resize', onFrame(refresh));
    refresh();
  }

  /* ==========================================================================
     08 — REVEALS Y PARALLAX
     ========================================================================== */

  function initReveals() {
    var targets = $$('[data-anim]');
    if (!targets.length) return;

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  function initHeroIntro() {
    // El hero está sobre el fold: se revela sin esperar scroll
    $$('.hero [data-anim]').forEach(function (el, i) {
      window.setTimeout(function () { el.classList.add('is-revealed'); }, 120 + i * 110);
    });
  }

  function initParallax() {
    var items = $$('[data-parallax]');
    if (!items.length || reducedMotion.matches) return;

    if (hasGsap()) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      items.forEach(function (item) {
        var amount = parseFloat(item.dataset.parallax) || 0.05;
        window.gsap.to(item, {
          yPercent: amount * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: item.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
      return;
    }

    var update = onFrame(function () {
      var viewport = window.innerHeight;
      items.forEach(function (item) {
        var parent = item.parentElement;
        var rect = parent.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) return;
        var amount = parseFloat(item.dataset.parallax) || 0.05;
        var progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        item.style.transform = 'translate3d(0,' + (progress * amount * 100).toFixed(2) + '%,0)';
      });
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ==========================================================================
     09 — PROCESO: narrativa de scroll "De la idea a la entrega"
     ========================================================================== */

  function initProcessSection() {
    var section = $('#proceso');
    if (!section) return;

    var track  = $('.process__track', section);
    var list   = $('.process__steps', section);
    var steps  = $$('.pstep', section);
    var fill   = $('[data-process-fill]', section);
    var ghost  = $('[data-process-ghost]', section);
    var noteTitle = $('[data-process-note-title]', section);
    var noteText  = $('[data-process-note-text]', section);
    if (!track || !steps.length) return;

    var current = -1;

    function setActiveProcessStep(index) {
      if (index === current) return;
      current = index;

      steps.forEach(function (step, i) {
        var on = i === index;
        step.classList.toggle('is-active', on);
        var button = $('.pstep__btn', step);
        if (!button) return;
        if (on) {
          button.setAttribute('aria-current', 'step');
        } else {
          button.removeAttribute('aria-current');
        }
      });

      var active = steps[index];
      if (ghost) ghost.textContent = $('.pstep__num', active).textContent;
      if (noteTitle) noteTitle.textContent = $('.pstep__title', active).textContent.replace(/\.$/, '');
      if (noteText) noteText.textContent = $('.pstep__text', active).textContent.trim();
    }

    /* Progreso: en desktop lo marca el recorrido del track sticky;
       en mobile, el avance del listado por el viewport. */
    function readProgress() {
      var rect, distance;

      if (desktopQuery.matches) {
        rect = track.getBoundingClientRect();
        distance = rect.height - window.innerHeight;
        if (distance <= 0) return 0;
        return Math.max(0, Math.min(1, -rect.top / distance));
      }

      rect = list.getBoundingClientRect();
      distance = rect.height;
      if (distance <= 0) return 0;
      return Math.max(0, Math.min(1, (window.innerHeight * 0.6 - rect.top) / distance));
    }

    var RAIL_INSET = 28; // 14px arriba + 14px abajo, igual que en el CSS

    var update = onFrame(function () {
      var progress = readProgress();
      if (fill) {
        var rail = Math.max(0, fill.clientHeight - RAIL_INSET);
        fill.style.setProperty('--process-fill', (rail * progress).toFixed(1) + 'px');
      }
      var index = Math.floor(progress * steps.length);
      setActiveProcessStep(Math.max(0, Math.min(steps.length - 1, index)));
    });

    /* Click en una etapa: lleva el scroll al tramo que le corresponde */
    steps.forEach(function (step, index) {
      var button = $('.pstep__btn', step);
      if (!button) return;

      button.addEventListener('click', function () {
        if (!desktopQuery.matches) {
          step.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
          setActiveProcessStep(index);
          return;
        }
        var rect = track.getBoundingClientRect();
        var distance = rect.height - window.innerHeight;
        var target = rect.top + window.scrollY + ((index + 0.5) / steps.length) * distance;
        window.scrollTo({ top: target, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      });
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    desktopQuery.addEventListener('change', update);
    update();
  }

  /* ==========================================================================
     10 — AÑO DINÁMICO
     ========================================================================== */

  function initYear() {
    $$('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ==========================================================================
     11 — INIT
     ========================================================================== */

  function init() {
    document.documentElement.classList.add('js');

    initAssetPlaceholders();
    initWhatsapp();
    initHeader();
    initScrollSpy();
    initMobileNav();
    initServices();
    initMaterials();
    initReveals();
    initHeroIntro();
    initParallax();
    initProcessSection();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
