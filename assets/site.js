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

  function rootPath() {
    // For pages inside /es/ /fr/ /ar/, use that prefix; otherwise empty
    const lang = detectLang();
    return lang === 'en' ? '' : '/' + lang;
  }

  function langPrefix(lang) {
    return lang === 'en' ? '' : '/' + lang;
  }

  // Extract current page slug (e.g. 'about.html' or 'index.html')
  function currentPage() {
    const parts = location.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    if (!last || ['es','fr','ar'].indexOf(last) >= 0) return 'index.html';
    return last.includes('.') ? last : last + '.html';
  }

  // ---------- Localized labels for nav, footer, errors ----------
  const I18N = {
    en: {
      nav: ['Home','About','Services','Packages','Venues','Why Cancún','Process','Inspiration','Blog','FAQ'],
      cta: 'Get a quote',
      ctaMobile: 'Book a video call',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      skip: 'Skip to content',
      langLabel: 'Language',
      footer: {
        tagline: 'Halal · Cancún · Riviera Maya',
        lead: 'Halal destination weddings in Cancún and the Riviera Maya.',
        meta: 'Operated by Muslimin International Halal Group SA. de CV. · Endorsed by the Islamic Association of Quintana Roo · In partnership with Muslim Friendly Halal Certification.',
        services: 'Services', destinations: 'Destinations', contact: 'Contact', community: 'Community',
        privacy: 'Privacy policy', terms: 'Terms & conditions',
        copyright: '© 2026 Cancun Islamic Weddings · Muslimin International Halal Group SA. de CV.',
        addressShort: 'Cancún, Quintana Roo, Mexico',
        servicesItems: [
          ['services.html#nikah','Nikah planning'],
          ['services.html#destination','Destination weddings'],
          ['services.html#catering','Certified halal catering'],
          ['services.html#imam','Imam service'],
          ['services.html#guests','Guest experience'],
          ['services.html#multiday','Multi-day coordination'],
        ],
        communityItems: [
          'Islamic Association of Quintana Roo',
          'Muslim Friendly Halal Certification',
          'Muslimin International Halal Group SA. de CV.',
        ],
      }
    },
    es: {
      nav: ['Inicio','Nosotros','Servicios','Paquetes','Venues','¿Por qué Cancún?','Proceso','Inspiración','Blog','FAQ'],
      cta: 'Cotizar',
      ctaMobile: 'Agendar videollamada',
      menuOpen: 'Abrir menú',
      menuClose: 'Cerrar menú',
      skip: 'Saltar al contenido',
      langLabel: 'Idioma',
      footer: {
        tagline: 'Halal · Cancún · Riviera Maya',
        lead: 'Bodas halal de destino en Cancún y la Riviera Maya.',
        meta: 'Operado por Muslimin International Halal Group SA. de CV. · Avalados por la Asociación Islámica de Quintana Roo · En alianza con Muslim Friendly Halal Certification.',
        services: 'Servicios', destinations: 'Destinos', contact: 'Contacto', community: 'Comunidad',
        privacy: 'Política de privacidad', terms: 'Términos y condiciones',
        copyright: '© 2026 Cancun Islamic Weddings · Muslimin International Halal Group SA. de CV.',
        addressShort: 'Cancún, Quintana Roo, México',
        servicesItems: [
          ['services.html#nikah','Planeación de Nikah'],
          ['services.html#destination','Bodas destino'],
          ['services.html#catering','Catering halal certificado'],
          ['services.html#imam','Servicio de Imam'],
          ['services.html#guests','Experiencia para invitados'],
          ['services.html#multiday','Coordinación multi-día'],
        ],
        communityItems: [
          'Asociación Islámica de Quintana Roo',
          'Muslim Friendly Halal Certification',
          'Muslimin International Halal Group SA. de CV.',
        ],
      }
    },
    fr: {
      nav: ['Accueil','À propos','Services','Forfaits','Lieux','Pourquoi Cancún','Processus','Inspiration','Blog','FAQ'],
      cta: 'Demander un devis',
      ctaMobile: 'Réserver un appel vidéo',
      menuOpen: 'Ouvrir le menu',
      menuClose: 'Fermer le menu',
      skip: 'Aller au contenu',
      langLabel: 'Langue',
      footer: {
        tagline: 'Halal · Cancún · Riviera Maya',
        lead: 'Mariages halal de destination à Cancún et la Riviera Maya.',
        meta: "Opéré par Muslimin International Halal Group SA. de CV. · Approuvé par l'Association Islamique du Quintana Roo · En partenariat avec Muslim Friendly Halal Certification.",
        services: 'Services', destinations: 'Destinations', contact: 'Contact', community: 'Communauté',
        privacy: 'Politique de confidentialité', terms: 'Conditions générales',
        copyright: '© 2026 Cancun Islamic Weddings · Muslimin International Halal Group SA. de CV.',
        addressShort: 'Cancún, Quintana Roo, Mexique',
        servicesItems: [
          ['services.html#nikah','Planification du Nikah'],
          ['services.html#destination','Mariages de destination'],
          ['services.html#catering','Traiteur halal certifié'],
          ['services.html#imam',"Service d'imam"],
          ['services.html#guests','Expérience invités'],
          ['services.html#multiday','Coordination multi-jours'],
        ],
        communityItems: [
          'Association Islamique du Quintana Roo',
          'Muslim Friendly Halal Certification',
          'Muslimin International Halal Group SA. de CV.',
        ],
      }
    },
    ar: {
      nav: ['الرئيسية','من نحن','الخدمات','الباقات','الأماكن','لماذا كانكون','العملية','إلهام','المدوّنة','الأسئلة الشائعة'],
      cta: 'اطلب عرض سعر',
      ctaMobile: 'احجز مكالمة فيديو',
      menuOpen: 'افتح القائمة',
      menuClose: 'أغلق القائمة',
      skip: 'تخطَّ إلى المحتوى',
      langLabel: 'اللغة',
      footer: {
        tagline: 'حلال · كانكون · ريفييرا مايا',
        lead: 'حفلات زفاف حلال في الوجهة بكانكون وريفييرا مايا.',
        meta: 'تشغّلها Muslimin International Halal Group SA. de CV. · باعتماد الجمعية الإسلامية في كينتانا رو · بالشراكة مع Muslim Friendly Halal Certification.',
        services: 'الخدمات', destinations: 'الوجهات', contact: 'تواصل معنا', community: 'المجتمع',
        privacy: 'سياسة الخصوصية', terms: 'الشروط والأحكام',
        copyright: '© ٢٠٢٦ Cancun Islamic Weddings · Muslimin International Halal Group SA. de CV.',
        addressShort: 'كانكون، كينتانا رو، المكسيك',
        servicesItems: [
          ['services.html#nikah','تخطيط النكاح'],
          ['services.html#destination','حفلات زفاف الوجهة'],
          ['services.html#catering','تموين حلال معتمد'],
          ['services.html#imam','خدمة الإمام'],
          ['services.html#guests','تجربة الضيوف'],
          ['services.html#multiday','تنسيق متعدد الأيام'],
        ],
        communityItems: [
          'الجمعية الإسلامية في كينتانا رو',
          'Muslim Friendly Halal Certification',
          'Muslimin International Halal Group SA. de CV.',
        ],
      }
    }
  };

  const NAV_HREFS = [
    'index.html','about.html','services.html','packages.html','venues.html',
    'why-cancun.html','process.html','inspiration.html','blog.html','faq.html',
  ];

  // ---------- Helpers ----------
  const lang = detectLang();
  const t = I18N[lang];
  const root = lang === 'en' ? '' : '/' + lang;

  // Compute href to a page in CURRENT language
  function pageHref(filename) {
    if (filename === 'index.html') return root + '/';
    return root + '/' + filename;
  }

  // Compute href to switch to a different language, preserving the current page
  function switchLangHref(newLang) {
    const page = currentPage();
    const prefix = newLang === 'en' ? '' : '/' + newLang;
    if (page === 'index.html') return prefix + '/';
    return prefix + '/' + page;
  }

  // Asset paths from current page depth
  function assetHref(rel) {
    // From subpath /xx/page.html, assets are at ../assets/ ; from root, at /assets/
    const depth = location.pathname.split('/').filter(Boolean);
    const inSubdir = depth.length && ['es','fr','ar'].indexOf(depth[0]) >= 0;
    return (inSubdir ? '../' : '/') + rel;
  }

  // ---------- Auto-redirect on first visit ----------
  function maybeRedirect() {
    // Only redirect from EN root index.html, never from sub-pages or other langs
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
      if (a.startsWith('en')) { break; }  // stay EN
    }
    if (target) {
      try { localStorage.setItem('ciw_lang_chosen', '1'); } catch (_) {}
      location.replace('/' + target + '/');
    }
  }

  // ---------- Header / Footer markup ----------
  function buildHeader() {
    const linksHtml = NAV_HREFS.map((href, i) => {
      const active = href === currentPage() ? ' class="active"' : '';
      return `<li><a href="${pageHref(href)}"${active}>${t.nav[i]}</a></li>`;
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
          <a href="${pageHref('contact.html')}" class="btn btn--primary nav-cta">${t.cta}</a>
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
      <ul>${NAV_HREFS.map((h, i) => `<li><a href="${pageHref(h)}">${t.nav[i]}</a></li>`).join('')}</ul>
      <a href="${pageHref('contact.html')}" class="btn btn--primary" style="width:100%;justify-content:center">${t.ctaMobile}</a>
    </nav>`;
  }

  function buildFooter() {
    const f = t.footer;
    const logoSymbol = assetHref('assets/logo-symbol.png');
    const servicesLis = f.servicesItems.map(([href,label]) =>
      `<li><a href="${pageHref(href.split('#')[0]) + (href.includes('#') ? '#' + href.split('#')[1] : '')}">${label}</a></li>`
    ).join('');
    const venueAnchors = ['cancun','playa','tulum','akumal','holbox','bacalar'];
    const venueLabels = lang === 'ar' ? ['كانكون','بلايا ديل كارمن','تولوم','أكومال','هولبوكس','باكالار']
      : ['Cancún','Playa del Carmen','Tulum','Akumal','Holbox','Bacalar'];
    const venuesLis = venueAnchors.map((a,i) => `<li><a href="${pageHref('venues.html')}#${a}">${venueLabels[i]}</a></li>`).join('');
    const communityLis = f.communityItems.map(item => `<li><span>${item}</span></li>`).join('');

    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand-block">
            <div class="footer-brand">
              <img src="${logoSymbol}" alt="" class="footer-symbol">
              <div>
                <small>${f.tagline}</small>
                Cancun Islamic Wedding
              </div>
            </div>
            <p class="footer-lead">${f.lead}</p>
            <p class="footer-meta">${f.meta}</p>
            <div class="footer-lang">
              <a class="lang-link${lang==='en'?' is-active':''}" href="${switchLangHref('en')}">EN</a>
              <span>·</span>
              <a class="lang-link${lang==='es'?' is-active':''}" href="${switchLangHref('es')}">ES</a>
              <span>·</span>
              <a class="lang-link${lang==='fr'?' is-active':''}" href="${switchLangHref('fr')}">FR</a>
              <span>·</span>
              <a class="lang-link${lang==='ar'?' is-active':''}" href="${switchLangHref('ar')}">AR</a>
            </div>
          </div>

          <div class="footer-cols">
            <div>
              <h4>${f.services}</h4>
              <ul>${servicesLis}</ul>
            </div>
            <div>
              <h4>${f.destinations}</h4>
              <ul>${venuesLis}</ul>
            </div>
            <div>
              <h4>${f.contact}</h4>
              <ul>
                <li><a href="https://wa.me/525549114170" target="_blank" rel="noopener">WhatsApp</a></li>
                <li><a href="https://instagram.com/cancunislamicwedding" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="mailto:admin@islamicaqr.com">Email</a></li>
                <li><span>${f.addressShort}</span></li>
              </ul>
            </div>
            <div>
              <h4>${f.community}</h4>
              <ul>${communityLis}</ul>
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

    // Inject header/footer
    const headerSlot = document.getElementById('site-header');
    const footerSlot = document.getElementById('site-footer');
    if (headerSlot) headerSlot.outerHTML = buildHeader();
    if (footerSlot) footerSlot.outerHTML = buildFooter();

    // Mark language as chosen when user clicks any lang toggle (so we don't redirect again)
    document.querySelectorAll('[data-l], .footer-lang a').forEach(a => {
      a.addEventListener('click', () => {
        try { localStorage.setItem('ciw_lang_chosen', '1'); } catch (_) {}
      });
    });

    // Mobile menu
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

    // Sticky header on scroll
    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Reveal — show everything (animation disabled, but class still applied for any CSS hooks)
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  });
})();
