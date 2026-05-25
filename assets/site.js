/* ============================================================
   CancunIslamicWeddings — shared scripts (multilingual)
   - Languages: EN (root), ES (/es/), FR (/fr/), AR (/ar/, RTL)
   - Header/footer injected per page, localized server-side via path
   - Mobile menu, sticky header, language switching via URL navigation
   - Auto-redirect to user's browser language on first visit (root only)
   ============================================================ */

(function () {
  'use strict';

  // ---------- Language detection from URL ----------
  function detectLang() {
    const p = location.pathname;
    if (p.startsWith('/es/') || p === '/es') return 'es';
    if (p.startsWith('/fr/') || p === '/fr') return 'fr';
    if (p.startsWith('/ar/') || p === '/ar') return 'ar';
    return 'en';
  }

  function currentPage() {
    const parts = location.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    if (!last || ['es','fr','ar'].indexOf(last) >= 0) return 'index.html';
    return last.includes('.') ? last : last + '.html';
  }

  // ---------- Localized labels ----------
  const I18N = {
    en: {
      nav: { home: 'Home', contact: 'Contact' },
      cta: 'Get a quote',
      ctaMobile: 'Book a video call',
      menuOpen: 'Open menu', menuClose: 'Close menu',
      skip: 'Skip to content',
      langLabel: 'Language',
      footer: {
        brandLine: 'Halal · Cancún · Riviera Maya',
        lead: 'Halal destination weddings in Cancún and the Riviera Maya.',
        meta: 'Operated by Muslimin International Halal Group SA. de CV. · Endorsed by the Islamic Association of Quintana Roo · In partnership with Muslim Friendly Halal Certification.',
        services: 'Services',
        destinations: 'Destinations',
        contact: 'Contact',
        language: 'Language',
        community: 'Community',
        privacy: 'Privacy policy',
        terms: 'Terms & conditions',
        copyright: '© 2026 Cancun Islamic Wedding · Muslimin International Halal Group SA. de CV.',
        address: 'Cancún, Quintana Roo, Mexico',
        servicesItems: 'Nikah planning · Destination weddings · Certified halal catering · Imam service · Guest experience · Multi-day coordination',
        destinationsItems: 'Cancún · Playa del Carmen · Tulum · Akumal · Holbox · Bacalar',
        languageItems: 'ES · EN · FR',
        communityItems: 'Islamic Association of Quintana Roo · Muslim Friendly Halal Certification · Muslimin International Halal Group SA. de CV.',
      }
    },
    es: {
      nav: { home: 'Inicio', contact: 'Contacto' },
      cta: 'Cotizar',
      ctaMobile: 'Agendar videollamada',
      menuOpen: 'Abrir menú', menuClose: 'Cerrar menú',
      skip: 'Saltar al contenido',
      langLabel: 'Idioma',
      footer: {
        brandLine: 'Halal · Cancún · Riviera Maya',
        lead: 'Bodas halal de destino en Cancún y la Riviera Maya.',
        meta: 'Operado por Muslimin International Halal Group SA. de CV. · Avalados por la Asociación Islámica de Quintana Roo · En alianza con Muslim Friendly Halal Certification.',
        services: 'Servicios',
        destinations: 'Destinos',
        contact: 'Contacto',
        language: 'Idioma',
        community: 'Comunidad',
        privacy: 'Política de privacidad',
        terms: 'Términos y condiciones',
        copyright: '© 2026 Cancun Islamic Wedding · Muslimin International Halal Group SA. de CV.',
        address: 'Cancún, Quintana Roo, México',
        servicesItems: 'Planeación de Nikah · Bodas destino · Catering halal certificado · Servicio de Imam · Experiencia para invitados · Coordinación multi-día',
        destinationsItems: 'Cancún · Playa del Carmen · Tulum · Akumal · Holbox · Bacalar',
        languageItems: 'ES · EN · FR',
        communityItems: 'Asociación Islámica de Quintana Roo · Muslim Friendly Halal Certification · Muslimin International Halal Group SA. de CV.',
      }
    },
    fr: {
      nav: { home: 'Accueil', contact: 'Contact' },
      cta: 'Demander un devis',
      ctaMobile: 'Réserver un appel vidéo',
      menuOpen: 'Ouvrir le menu', menuClose: 'Fermer le menu',
      skip: 'Aller au contenu',
      langLabel: 'Langue',
      footer: {
        brandLine: 'Halal · Cancún · Riviera Maya',
        lead: 'Mariages halal de destination à Cancún et la Riviera Maya.',
        meta: "Opéré par Muslimin International Halal Group SA. de CV. · Approuvé par l'Association Islamique du Quintana Roo · En partenariat avec Muslim Friendly Halal Certification.",
        services: 'Services',
        destinations: 'Destinations',
        contact: 'Contact',
        language: 'Langue',
        community: 'Communauté',
        privacy: 'Politique de confidentialité',
        terms: 'Conditions générales',
        copyright: '© 2026 Cancun Islamic Wedding · Muslimin International Halal Group SA. de CV.',
        address: 'Cancún, Quintana Roo, Mexique',
        servicesItems: "Planification du Nikah · Mariages de destination · Traiteur halal certifié · Service d'imam · Expérience invités · Coordination multi-jours",
        destinationsItems: 'Cancún · Playa del Carmen · Tulum · Akumal · Holbox · Bacalar',
        languageItems: 'ES · EN · FR',
        communityItems: "Association Islamique du Quintana Roo · Muslim Friendly Halal Certification · Muslimin International Halal Group SA. de CV.",
      }
    },
    ar: {
      nav: { home: 'الرئيسية', contact: 'تواصل معنا' },
      cta: 'اطلب عرض سعر',
      ctaMobile: 'احجز مكالمة فيديو',
      menuOpen: 'افتح القائمة', menuClose: 'أغلق القائمة',
      skip: 'تخطَّ إلى المحتوى',
      langLabel: 'اللغة',
      footer: {
        brandLine: 'حلال · كانكون · ريفييرا مايا',
        lead: 'حفلات زفاف حلال في الوجهة بكانكون وريفييرا مايا.',
        meta: 'تشغّلها Muslimin International Halal Group SA. de CV. · باعتماد الجمعية الإسلامية في كينتانا رو · بالشراكة مع Muslim Friendly Halal Certification.',
        services: 'الخدمات',
        destinations: 'الوجهات',
        contact: 'تواصل معنا',
        language: 'اللغة',
        community: 'المجتمع',
        privacy: 'سياسة الخصوصية',
        terms: 'الشروط والأحكام',
        copyright: '© ٢٠٢٦ Cancun Islamic Wedding · Muslimin International Halal Group SA. de CV.',
        address: 'كانكون، كينتانا رو، المكسيك',
        servicesItems: 'تخطيط النكاح · حفلات زفاف الوجهة · تموين حلال معتمد · خدمة الإمام · تجربة الضيوف · تنسيق متعدد الأيام',
        destinationsItems: 'كانكون · بلايا ديل كارمن · تولوم · أكومال · هولبوكس · باكالار',
        languageItems: 'ES · EN · FR',
        communityItems: 'الجمعية الإسلامية في كينتانا رو · Muslim Friendly Halal Certification · Muslimin International Halal Group SA. de CV.',
      }
    }
  };

  const lang = detectLang();
  const t = I18N[lang];
  const root = lang === 'en' ? '' : '/' + lang;

  function pageHref(filename) {
    if (filename === 'index.html') return root + '/';
    return root + '/' + filename;
  }

  function switchLangHref(newLang) {
    const page = currentPage();
    const prefix = newLang === 'en' ? '' : '/' + newLang;
    if (page === 'index.html') return prefix + '/';
    return prefix + '/' + page;
  }

  function assetHref(rel) {
    const depth = location.pathname.split('/').filter(Boolean);
    const inSubdir = depth.length && ['es','fr','ar'].indexOf(depth[0]) >= 0;
    return (inSubdir ? '../' : '/') + rel;
  }

  // ---------- Auto-redirect on first visit (EN root only) ----------
  function maybeRedirect() {
    if (lang !== 'en') return;
    if (location.pathname !== '/' && location.pathname !== '/index.html') return;
    try {
      if (localStorage.getItem('ciw_lang_chosen') === '1') return;
    } catch (_) { return; }
    const accept = (navigator.languages || [navigator.language || 'en']).map(s => (s||'').toLowerCase());
    let target = null;
    for (const a of accept) {
      if (a.startsWith('es')) { target = 'es'; break; }
      if (a.startsWith('fr')) { target = 'fr'; break; }
      if (a.startsWith('ar')) { target = 'ar'; break; }
      if (a.startsWith('en')) { break; }
    }
    if (target) {
      try { localStorage.setItem('ciw_lang_chosen', '1'); } catch (_) {}
      location.replace('/' + target + '/');
    }
  }

  // ---------- Header ----------
  function buildHeader() {
    const navItems = [
      ['index.html',   t.nav.home],
      ['contact.html', t.nav.contact],
    ];
    const linksHtml = navItems.map(([href, label]) => {
      const active = href === currentPage() ? ' class="active"' : '';
      return `<li><a href="${pageHref(href)}"${active}>${label}</a></li>`;
    }).join('');
    const logo = assetHref('assets/logo.png');

    return `
    <a class="skip-link" href="#main">${t.skip}</a>
    <header class="site-header">
      <div class="container nav">
        <a href="${pageHref('index.html')}" class="logo" aria-label="Cancun Islamic Wedding">
          <img class="logo-img" src="${logo}" alt="Cancun Islamic Wedding" width="180" height="44">
        </a>
        <ul class="nav-links">${linksHtml}</ul>
        <div class="nav-actions">
          <div class="lang-toggle" role="group" aria-label="${t.langLabel} / Language">
            <a href="${switchLangHref('en')}" data-l="en" aria-label="English"${lang==='en'?' class="active"':''}>EN</a>
            <a href="${switchLangHref('es')}" data-l="es" aria-label="Español"${lang==='es'?' class="active"':''}>ES</a>
            <a href="${switchLangHref('fr')}" data-l="fr" aria-label="Français"${lang==='fr'?' class="active"':''}>FR</a>
            <a href="${switchLangHref('ar')}" data-l="ar" aria-label="العربية"${lang==='ar'?' class="active"':''}>AR</a>
          </div>
          <a href="https://wa.me/525549114170" target="_blank" rel="noopener" class="btn btn--primary nav-cta">${t.cta}</a>
          <button class="menu-toggle" aria-label="${t.menuOpen}" aria-expanded="false" aria-controls="mobile-menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
    <nav class="mobile-menu" id="mobile-menu" aria-hidden="true" aria-label="Mobile navigation">
      <div class="lang-toggle" role="group" aria-label="${t.langLabel} / Language">
        <a href="${switchLangHref('en')}" aria-label="English"${lang==='en'?' class="active"':''}>EN</a>
        <a href="${switchLangHref('es')}" aria-label="Español"${lang==='es'?' class="active"':''}>ES</a>
        <a href="${switchLangHref('fr')}" aria-label="Français"${lang==='fr'?' class="active"':''}>FR</a>
        <a href="${switchLangHref('ar')}" aria-label="العربية"${lang==='ar'?' class="active"':''}>AR</a>
      </div>
      <ul>${navItems.map(([href, label]) => `<li><a href="${pageHref(href)}">${label}</a></li>`).join('')}</ul>
      <a href="https://wa.me/525549114170" target="_blank" rel="noopener" class="btn btn--primary" style="width:100%;justify-content:center">${t.ctaMobile}</a>
    </nav>`;
  }

  // ---------- Footer: exact structure as client provided ----------
  function buildFooter() {
    const f = t.footer;
    const logoSymbol = assetHref('assets/logo-symbol.png');
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand-block">
            <div class="footer-brand">
              <img src="${logoSymbol}" alt="" class="footer-symbol">
              <div>
                <small>${f.brandLine}</small>
                Cancun Islamic Wedding
              </div>
            </div>
            <p class="footer-lead">${f.lead}</p>
            <p class="footer-meta">${f.meta}</p>
          </div>

          <div class="footer-cols">
            <div>
              <h4>${f.services}</h4>
              <p class="footer-text">${f.servicesItems}</p>
            </div>
            <div>
              <h4>${f.destinations}</h4>
              <p class="footer-text">${f.destinationsItems}</p>
            </div>
            <div>
              <h4>${f.contact}</h4>
              <ul>
                <li><a href="https://wa.me/525549114170" target="_blank" rel="noopener">WhatsApp</a></li>
                <li><a href="https://instagram.com/cancunislamicwedding" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="mailto:admin@islamicaqr.com">Email</a></li>
                <li><span>${f.address}</span></li>
              </ul>
            </div>
            <div>
              <h4>${f.language}</h4>
              <p class="footer-text footer-lang-text">
                <a href="${switchLangHref('es')}"${lang==='es'?' class="is-active"':''}>ES</a>
                <span>·</span>
                <a href="${switchLangHref('en')}"${lang==='en'?' class="is-active"':''}>EN</a>
                <span>·</span>
                <a href="${switchLangHref('fr')}"${lang==='fr'?' class="is-active"':''}>FR</a>
              </p>
              <h4 style="margin-top:24px">${f.community}</h4>
              <p class="footer-text">${f.communityItems}</p>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>${f.copyright}</span>
          <span class="footer-legal">
            <a href="${pageHref('privacy.html')}">${f.privacy}</a>
            <span>·</span>
            <a href="${pageHref('terms.html')}">${f.terms}</a>
          </span>
        </div>
      </div>
    </footer>`;
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    maybeRedirect();

    const headerSlot = document.getElementById('site-header');
    const footerSlot = document.getElementById('site-footer');
    if (headerSlot) headerSlot.outerHTML = buildHeader();
    if (footerSlot) footerSlot.outerHTML = buildFooter();

    document.querySelectorAll('[data-l], .footer-lang-text a').forEach(a => {
      a.addEventListener('click', () => {
        try { localStorage.setItem('ciw_lang_chosen', '1'); } catch (_) {}
      });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (menuToggle && mobileMenu) {
      const setOpen = (open) => {
        mobileMenu.classList.toggle('is-open', open);
        mobileMenu.setAttribute('aria-hidden', String(!open));
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? t.menuClose : t.menuOpen);
        document.body.style.overflow = open ? 'hidden' : '';
      };
      menuToggle.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('is-open')));
      mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) setOpen(false);
      });
    }

    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  });
})();
