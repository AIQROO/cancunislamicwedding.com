# Cancun Islamic Weddings 

Sitio web estático de **Cancun Islamic Weddings** — bodas islámicas de destino, 100% halal, en Cancún, Playa del Carmen y Tulum.

Operado por **Muslimin International Halal Group SA. de CV.**

---

## Stack

- **HTML / CSS / Vanilla JS** — sin framework, sin build step
- **Vercel** — hosting estático con `cleanUrls`, headers de seguridad y redirects
- **i18n** — bilingüe ES/EN vía atributos `data-es` / `data-en` y `localStorage`

## Estructura

```
.
├── index.html              Home
├── about.html              Nosotros
├── services.html           Servicios
├── packages.html           Paquetes (Nikah Ceremony · Riviera · Luxury)
├── venues.html             Venues (resorts, playas, cenotes, haciendas)
├── why-cancun.html         ¿Por qué Cancún?
├── process.html            Proceso (5 pasos)
├── inspiration.html        Galería + historias reales
├── blog.html               Blog
├── blog-post.html          Post de blog (template único)
├── faq.html                FAQ
├── contact.html            Contacto + formulario
├── privacy.html            Aviso de privacidad
├── terms.html              Términos y condiciones
├── 404.html                Página de error
├── robots.txt
├── sitemap.xml
├── vercel.json             Config Vercel (cleanUrls, headers, redirects)
├── favicon.ico
├── og-image.jpg            Imagen para Open Graph (1200×630)
├── apple-touch-icon.png
└── assets/
    ├── styles.css          CSS global
    ├── site.js             Header/footer compartidos, i18n, mobile menu
    ├── pattern.svg         Patrón islámico de fondo
    ├── logo.png            Logo principal
    ├── logo.svg
    ├── logo-symbol.png     Símbolo aislado (footer + favicon)
    └── img/                Fotos (44 archivos, ~4.5 MB)
```

## Desarrollo local

```bash
python3 -m http.server 8000
# Abre http://localhost:8000
```

No requiere instalación de dependencias.

## Deploy en Vercel

```bash
npx vercel --prod
```

O conecta el repo desde el dashboard de Vercel — detecta sitio estático automáticamente y aplica `vercel.json`.

### Configuración Vercel incluida

- `cleanUrls: true` — `/about` en vez de `/about.html`
- Cache `immutable` 1 año para `/assets/*`
- HSTS, X-Frame-Options, Permissions-Policy, Referrer-Policy
- Redirects ES → EN: `/nosotros → /about`, `/servicios → /services`, etc.
- Custom `404.html`

## Editar contenido

### Texto bilingüe
Los textos usan atributos `data-es` y `data-en`. Edita ambos:

```html
<h1 data-es="Tu Nikah en el Caribe" data-en="Your Nikah on the Caribbean">
  Tu Nikah en el Caribe
</h1>
```

El JS muestra el correcto según el idioma activo (`localStorage.ciw_lang`).

### Header / Footer compartidos
Se inyectan vía `assets/site.js`. Para modificar nav, footer o redes sociales, edita ese archivo. Cualquier cambio se refleja en las 15 páginas automáticamente.

### Imágenes
Las 44 fotos están en `assets/img/` con nombres `photo-{id}-w{width}.jpg`. Para sustituirlas por fotos reales, mantén el mismo nombre o actualiza la referencia en el HTML.

## Contacto operativo

- WhatsApp: +52 55 4911 4170
- Email: admin@islamicaqr.com
- Instagram: [@cancunislamicwedding](https://instagram.com/cancunislamicwedding)

## Licencia

© 2026 Muslimin International Halal Group SA. de CV. Todos los derechos reservados.
