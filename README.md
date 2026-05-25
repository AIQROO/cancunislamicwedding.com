# Cancun Islamic Weddings

Multilingual static site for **Cancun Islamic Weddings** — halal Islamic destination weddings in Cancún, Playa del Carmen and Tulum.

Operated by **Muslimin International Halal Group SA. de CV.**

---

## Languages

- 🇺🇸 **English** — `/` (default, x-default)
- 🇲🇽 **Spanish** — `/es/`
- 🇫🇷 **French** — `/fr/`
- 🇸🇦 **Arabic** — `/ar/` (RTL, with Tajawal + Amiri fonts)

First-visit auto-redirect from `/` to `/es/`, `/fr/` or `/ar/` based on the browser's `Accept-Language`. Choice is sticky via `localStorage`.

## Structure

```
.
├── index.html              Home (EN)
├── about.html              About (EN)
├── … 13 EN pages
├── privacy.html            Privacy notice (EN)
├── terms.html              Terms & conditions (EN)
├── 404.html                Multilingual 404 (detects lang from path)
├── robots.txt              Allows GPTBot, ChatGPT-User, PerplexityBot, Claude-Web
├── sitemap.xml             56 URLs with xhtml:link hreflang
├── vercel.json             cleanUrls, headers, multilang redirects
├── es/                     Spanish versions (14 pages)
├── fr/                     French versions (14 pages)
├── ar/                     Arabic versions (14 pages, RTL)
├── favicon.ico + og-image.jpg
└── assets/
    ├── styles.css          Global CSS + RTL support
    ├── site.js             Language detection, nav/footer injection, lang switching
    ├── pattern.svg, logo.png, logo-symbol.png
    └── img/                44 venue/blog/testimonial photos
```

**Total: 57 HTML pages × 4 languages = served from one static repo.**

## SEO / GEO

Each page has:
- `<html lang="…">` (and `dir="rtl"` on Arabic)
- Localized `<title>` and `<meta name="description">`
- `<link rel="canonical">`
- 5 `<link rel="alternate" hreflang>` tags (EN, ES, FR, AR, x-default)
- Open Graph (`og:title`, `og:description`, `og:image`, `og:locale`, `og:locale:alternate × 3`)
- Twitter Card
- **JSON-LD structured data**:
  - Homepage: `ProfessionalService` (LocalBusiness) + `WebSite`
  - Services page: `Service` schema
  - Blog post: `Article` schema
  - Inner pages: `BreadcrumbList`

`sitemap.xml` lists 56 URLs (14 pages × 4 languages) each with their hreflang alternates.

`robots.txt` explicitly allows GPTBot, ChatGPT-User, PerplexityBot, Claude-Web, anthropic-ai, Google-Extended — for **GEO (Generative Engine Optimization)**.

## Stack

- **Pure HTML / CSS / vanilla JS** — no framework, no build step at deploy time
- **Vercel** — static hosting with `cleanUrls`, security headers, edge cache
- **No data-attr swap in HTML** — each language has its own pre-rendered HTML, so crawlers and LLMs see the right content immediately (no JS execution required)

## Develop locally

```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

## Deploy

```bash
npx vercel --prod
```

Vercel auto-detects static site, picks up `vercel.json` config.

## Edit content

### Single-language edits
Edit the file in that language's folder. `index.html` is EN; `es/index.html` is ES; `fr/index.html` is FR; `ar/index.html` is AR.

### Cross-language edits
Edits must be made in **all 4 versions** of the file. The helper scripts that generated these files are in `/tmp/` (not committed). For ongoing maintenance, edit each language directly or rebuild from scratch via the team.

### Shared nav/footer
Edit `assets/site.js` — the header and footer are injected per page and read localized labels from the `I18N` object inside.

## Build scripts (not in repo)

- `/tmp/i18n_split.py` — split bilingual source into EN root + ES `/es/`
- `/tmp/i18n_fr_ar.py` — generate FR/AR from EN via translation dict
- `/tmp/gen_legal.py` — generate 8 legal pages (privacy + terms × 4 langs)
- `/tmp/inject_jsonld.py` — inject structured data per page

These ran one-time to produce the current state. Keep them in `/tmp/` or commit to a `scripts/` folder if you want them in the repo.

## Contact

- WhatsApp: +52 55 4911 4170
- Email: admin@islamicaqr.com
- Instagram: [@cancunislamicwedding](https://instagram.com/cancunislamicwedding)

## Disclaimer

The French and Arabic translations are professional-quality drafts produced by AI. Native-speaker review is recommended before publishing to a production audience — especially the religious terminology in Arabic and the legal language in `privacy.html` / `terms.html`.

## License

© 2026 Muslimin International Halal Group SA. de CV. All rights reserved.
