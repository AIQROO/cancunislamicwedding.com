/* ============================================================
   CancunIslamicWeddings — shared scripts
   - bilingual (ES/EN) via [data-es]/[data-en]
   - shared header/footer injection
   - mobile menu, scroll reveal, sticky header
   - tweaks panel (font, gold intensity, density)
   ============================================================ */

(function () {
  /* ---- i18n ---- */
  const STORE_LANG = 'ciw_lang';
  const STORE_TWEAKS = 'ciw_tweaks';

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
      const txt = el.getAttribute('data-' + lang);
      if (txt !== null) {
        // preserve nested HTML if data attr contains <
        if (/<[a-z]/i.test(txt)) el.innerHTML = txt;
        else el.textContent = txt;
      }
    });
    document.querySelectorAll('[data-es-attr]').forEach(el => {
      try {
        const map = JSON.parse(el.getAttribute('data-' + lang + '-attr'));
        Object.entries(map).forEach(([k, v]) => el.setAttribute(k, v));
      } catch (e) {}
    });
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    localStorage.setItem(STORE_LANG, lang);
  }

  window.CIW_setLang = applyLang;
  window.CIW_getLang = () => localStorage.getItem(STORE_LANG) || 'es';

  /* ---- Tweaks ---- */
  const defaultTweaks = {
    headingFont: 'playfair', // 'playfair' | 'cormorant'
    goldIntensity: 1,        // 0.4 – 1.6
    density: 'comfortable',  // 'comfortable' | 'compact'
  };

  function loadTweaks() {
    try { return { ...defaultTweaks, ...JSON.parse(localStorage.getItem(STORE_TWEAKS) || '{}') }; }
    catch { return { ...defaultTweaks }; }
  }

  function applyTweaks(t) {
    const root = document.documentElement;
    root.style.setProperty('--font-display',
      t.headingFont === 'cormorant'
        ? "'Cormorant Garamond', Georgia, serif"
        : "'Playfair Display', 'Cormorant Garamond', Georgia, serif"
    );
    root.style.setProperty('--gold-intensity', t.goldIntensity);
    root.setAttribute('data-density', t.density);
    localStorage.setItem(STORE_TWEAKS, JSON.stringify(t));
  }

  window.CIW_applyTweaks = applyTweaks;
  window.CIW_loadTweaks = loadTweaks;

  /* ---- Header / Footer markup ---- */
  const NAV_ITEMS = [
    { href: 'index.html',     es: 'Inicio',         en: 'Home' },
    { href: 'about.html',     es: 'Nosotros',       en: 'About' },
    { href: 'services.html',  es: 'Servicios',      en: 'Services' },
    { href: 'packages.html',  es: 'Paquetes',       en: 'Packages' },
    { href: 'venues.html',    es: 'Venues',         en: 'Venues' },
    { href: 'why-cancun.html',es: '¿Por qué Cancún?',en: 'Why Cancún' },
    { href: 'process.html',   es: 'Proceso',        en: 'Process' },
    { href: 'inspiration.html',es: 'Inspiración',   en: 'Inspiration' },
    { href: 'blog.html',      es: 'Blog',           en: 'Blog' },
    { href: 'faq.html',       es: 'FAQ',            en: 'FAQ' },
  ];

  function buildHeader(currentPage) {
    const links = NAV_ITEMS.map(i =>
      `<li><a href="${i.href}" data-es="${i.es}" data-en="${i.en}" class="${i.href === currentPage ? 'active' : ''}">${i.es}</a></li>`
    ).join('');

    return `
    <a class="skip-link" href="#main" data-es="Saltar al contenido" data-en="Skip to content">Saltar al contenido</a>
    <header class="site-header">
      <div class="container nav">
        <a href="index.html" class="logo" aria-label="Cancun Islamic Wedding">
          <img class="logo-img" src="assets/logo.png" alt="Cancun Islamic Wedding" width="180" height="44">
        </a>
        <ul class="nav-links">${links}</ul>
        <div class="nav-actions">
          <div class="lang-toggle" role="group" aria-label="Idioma / Language">
            <button data-lang="es" aria-label="Español">ES</button>
            <button data-lang="en" aria-label="English">EN</button>
          </div>
          <a href="contact.html" class="btn btn--primary nav-cta" data-es="Cotizar" data-en="Get a quote">Cotizar</a>
          <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
    <nav class="mobile-menu" id="mobile-menu" aria-hidden="true" aria-label="Mobile navigation">
      <div class="lang-toggle" role="group" aria-label="Idioma / Language">
        <button data-lang="es" aria-label="Español">ES</button>
        <button data-lang="en" aria-label="English">EN</button>
      </div>
      <ul>${NAV_ITEMS.map(i => `<li><a href="${i.href}" data-es="${i.es}" data-en="${i.en}">${i.es}</a></li>`).join('')}</ul>
      <a href="contact.html" class="btn btn--primary" style="width:100%;justify-content:center" data-es="Agendar videollamada" data-en="Book a video call">Agendar videollamada</a>
    </nav>`;
  }

  function buildFooter() {
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand-block">
            <div class="footer-brand">
              <img src="assets/logo-symbol.png" alt="" class="footer-symbol">
              <div>
                <small>Halal · Cancún · Riviera Maya</small>
                Cancun Islamic Wedding
              </div>
            </div>
            <p class="footer-lead" data-es="Bodas halal de destino en Cancún y la Riviera Maya." data-en="Halal destination weddings in Cancún and the Riviera Maya.">
              Bodas halal de destino en Cancún y la Riviera Maya.
            </p>
            <p class="footer-meta" data-es="Operado por Muslimin International Halal Group SA. de CV. · Avalados por la Asociación Islámica de Quintana Roo · En alianza con Muslim Friendly Halal Certification." data-en="Operated by Muslimin International Halal Group SA. de CV. · Endorsed by the Islamic Association of Quintana Roo · In partnership with Muslim Friendly Halal Certification.">
              Operado por Muslimin International Halal Group SA. de CV. · Avalados por la Asociación Islámica de Quintana Roo · En alianza con Muslim Friendly Halal Certification.
            </p>
            <div class="footer-lang">
              <button class="lang-link" data-set-lang="es">ES</button>
              <span>·</span>
              <button class="lang-link" data-set-lang="en">EN</button>
              <span>·</span>
              <button class="lang-link" data-set-lang="fr" title="Coming soon">FR</button>
            </div>
          </div>

          <div class="footer-cols">
            <div>
              <h4 data-es="Servicios" data-en="Services">Servicios</h4>
              <ul>
                <li><a href="services.html#nikah" data-es="Planeación de Nikah" data-en="Nikah planning">Planeación de Nikah</a></li>
                <li><a href="services.html#destination" data-es="Bodas destino" data-en="Destination weddings">Bodas destino</a></li>
                <li><a href="services.html#catering" data-es="Catering halal certificado" data-en="Certified halal catering">Catering halal certificado</a></li>
                <li><a href="services.html#imam" data-es="Servicio de Imam" data-en="Imam service">Servicio de Imam</a></li>
                <li><a href="services.html#guests" data-es="Experiencia para invitados" data-en="Guest experience">Experiencia para invitados</a></li>
                <li><a href="services.html#multiday" data-es="Coordinación multi-día" data-en="Multi-day coordination">Coordinación multi-día</a></li>
              </ul>
            </div>
            <div>
              <h4 data-es="Destinos" data-en="Destinations">Destinos</h4>
              <ul>
                <li><a href="venues.html#cancun">Cancún</a></li>
                <li><a href="venues.html#playa">Playa del Carmen</a></li>
                <li><a href="venues.html#tulum">Tulum</a></li>
                <li><a href="venues.html#akumal">Akumal</a></li>
                <li><a href="venues.html#holbox">Holbox</a></li>
                <li><a href="venues.html#bacalar">Bacalar</a></li>
              </ul>
            </div>
            <div>
              <h4 data-es="Contacto" data-en="Contact">Contacto</h4>
              <ul>
                <li><a href="https://wa.me/525549114170" target="_blank" rel="noopener">WhatsApp</a></li>
                <li><a href="https://instagram.com/cancunislamicwedding" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="mailto:admin@islamicaqr.com">Email</a></li>
                <li><span data-es="Cancún, Quintana Roo, México" data-en="Cancún, Quintana Roo, Mexico">Cancún, Quintana Roo, México</span></li>
              </ul>
            </div>
            <div>
              <h4 data-es="Comunidad" data-en="Community">Comunidad</h4>
              <ul>
                <li><span data-es="Asociación Islámica de Quintana Roo" data-en="Islamic Association of Quintana Roo">Asociación Islámica de Quintana Roo</span></li>
                <li><span>Muslim Friendly Halal Certification</span></li>
                <li><span>Muslimin International Halal Group SA. de CV.</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© 2026 Cancun Islamic Wedding · Muslimin International Halal Group SA. de CV.</span>
          <span class="footer-legal">
            <a href="privacy.html" data-es="Política de privacidad" data-en="Privacy policy">Política de privacidad</a>
            <span>·</span>
            <a href="terms.html" data-es="Términos y condiciones" data-en="Terms & conditions">Términos y condiciones</a>
          </span>
        </div>
      </div>
    </footer>`;
  }

  /* ---- Tweaks panel ---- */
  function buildTweaksPanel() {
    return `
    <div id="tweaks-panel" class="tweaks-panel" hidden>
      <div class="tweaks-head">
        <strong>Tweaks</strong>
        <button id="tweaks-close" aria-label="Close">×</button>
      </div>
      <div class="tweaks-body">
        <div class="tweak-row">
          <label>Heading font</label>
          <div class="seg" data-tweak="headingFont">
            <button data-val="playfair">Playfair</button>
            <button data-val="cormorant">Cormorant</button>
          </div>
        </div>
        <div class="tweak-row">
          <label>Gold intensity</label>
          <input type="range" min="0.2" max="1.6" step="0.1" data-tweak="goldIntensity">
          <span class="tweak-val" data-val-for="goldIntensity"></span>
        </div>
        <div class="tweak-row">
          <label>Density</label>
          <div class="seg" data-tweak="density">
            <button data-val="comfortable">Airy</button>
            <button data-val="compact">Compact</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  const TWEAKS_CSS = `
    .tweaks-panel{position:fixed;right:24px;bottom:24px;width:300px;background:#fff;border:1px solid var(--warm-gray);border-radius:14px;box-shadow:0 24px 60px rgba(15,76,58,.18);z-index:80;font-family:var(--font-body);}
    .tweaks-head{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid var(--warm-gray);}
    .tweaks-head strong{font-family:var(--font-display);color:var(--emerald);font-weight:500;font-size:18px;}
    #tweaks-close{background:transparent;border:0;font-size:22px;color:var(--charcoal-soft);cursor:pointer;line-height:1;}
    .tweaks-body{padding:18px;display:flex;flex-direction:column;gap:18px;}
    .tweak-row{display:flex;flex-direction:column;gap:8px;}
    .tweak-row label{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--charcoal-soft);font-weight:500;}
    .seg{display:inline-flex;border:1px solid var(--warm-gray);border-radius:8px;overflow:hidden;}
    .seg button{flex:1;padding:8px 12px;background:#fff;border:0;cursor:pointer;font-size:13px;color:var(--charcoal-soft);transition:all .2s;}
    .seg button.active{background:var(--emerald);color:#fff;}
    .tweak-row input[type=range]{accent-color:var(--emerald);}
    .tweak-val{font-size:12px;color:var(--charcoal-soft);align-self:flex-end;}
  `;

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', () => {
    const currentPage = location.pathname.split('/').pop() || 'index.html';

    // Inject header / footer if placeholders exist
    const headerSlot = document.getElementById('site-header');
    const footerSlot = document.getElementById('site-footer');
    if (headerSlot) headerSlot.outerHTML = buildHeader(currentPage);
    if (footerSlot) footerSlot.outerHTML = buildFooter();

    // Apply tweaks
    const styleEl = document.createElement('style');
    styleEl.textContent = TWEAKS_CSS;
    document.head.appendChild(styleEl);
    document.body.insertAdjacentHTML('beforeend', buildTweaksPanel());

    const tweaks = loadTweaks();
    applyTweaks(tweaks);

    // Lang
    const lang = window.CIW_getLang();
    applyLang(lang);
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      b.addEventListener('click', () => applyLang(b.dataset.lang));
    });
    // Footer language links (skip FR — coming soon)
    document.querySelectorAll('[data-set-lang]').forEach(b => {
      const target = b.dataset.setLang;
      if (target === 'fr') {
        b.addEventListener('click', () => {
          b.classList.add('is-active');
          setTimeout(() => b.classList.remove('is-active'), 400);
        });
        return;
      }
      b.addEventListener('click', () => applyLang(target));
      if (target === window.CIW_getLang()) b.classList.add('is-active');
    });

    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (menuToggle && mobileMenu) {
      const setOpen = (open) => {
        mobileMenu.classList.toggle('is-open', open);
        mobileMenu.setAttribute('aria-hidden', String(!open));
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        document.body.style.overflow = open ? 'hidden' : '';
      };
      menuToggle.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('is-open')));
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => setOpen(false));
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) setOpen(false);
      });
    }

    // Sticky header style
    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Reveal — show everything immediately (animation disabled)
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

    // Tweaks panel wiring
    const panel = document.getElementById('tweaks-panel');
    panel.querySelectorAll('[data-tweak]').forEach(el => {
      const key = el.dataset.tweak;
      if (el.tagName === 'INPUT') {
        el.value = tweaks[key];
        const valSpan = panel.querySelector(`[data-val-for="${key}"]`);
        if (valSpan) valSpan.textContent = (+tweaks[key]).toFixed(1);
        el.addEventListener('input', () => {
          tweaks[key] = +el.value;
          if (valSpan) valSpan.textContent = (+el.value).toFixed(1);
          applyTweaks(tweaks);
        });
      } else {
        el.querySelectorAll('button').forEach(b => {
          b.classList.toggle('active', b.dataset.val === tweaks[key]);
          b.addEventListener('click', () => {
            tweaks[key] = b.dataset.val;
            el.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
            applyTweaks(tweaks);
          });
        });
      }
    });
    const isEmbedded = window.parent && window.parent !== window;
    const notifyParent = (msg) => {
      if (!isEmbedded) return;
      try { window.parent.postMessage(msg, '*'); } catch (_) { /* noop */ }
    };

    document.getElementById('tweaks-close').addEventListener('click', () => {
      panel.hidden = true;
      notifyParent({ type: '__edit_mode_dismissed' });
    });

    // Tweaks host wiring (only when embedded in the design editor)
    if (isEmbedded) {
      window.addEventListener('message', (e) => {
        if (!e.data || typeof e.data !== 'object') return;
        if (e.data.type === '__activate_edit_mode') panel.hidden = false;
        if (e.data.type === '__deactivate_edit_mode') panel.hidden = true;
      });
      notifyParent({ type: '__edit_mode_available' });
    }
  });
})();
