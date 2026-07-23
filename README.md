# M3Pivot website

Static site for **[www.m3pivot.com](https://www.m3pivot.com)**. Built as plain HTML/CSS/JS, deployed with **GitHub Pages** from the repo root.

## Live site

- **Production:** **https://www.m3pivot.com** — homepage is **`index.html`** at the repo root (GitHub Pages publishes **`/`** on branch **`main`**).
- **GitHub URL:** https://msathiamurthy.github.io/m3pivot-website/

**GoDaddy DNS (share with whoever has domain access):** **[docs/GODADDY-DNS-STEPS.md](./docs/GODADDY-DNS-STEPS.md)**

**You (GitHub):** Add **`CNAME`** at repo root with `www.m3pivot.com` (see **`CNAME.example`**) → push → **Settings → Pages** → Custom domain `www.m3pivot.com` → after it works, **Enforce HTTPS**.

## Brand — logo typography & colors

The **M3Pivot** wordmark in logo assets under `assets/` (e.g. `full-logo.png`, `small-logo.png`) is set in:

| | |
|--|--|
| **Font** | [Montserrat](https://fonts.google.com/specimen/Montserrat) |
| **Style** | **Bold** |

**Logo colors**

| | |
|--|--|
| **Navy blue** | `#034285` |
| **Gold** | `#E1A935` |

The site stylesheet (`styles.css`) uses **Montserrat** and maps UI accents to this navy + gold palette.

## SEO

- Each page has **unique `meta description`**, **`canonical`**, **Open Graph**, and **Twitter** tags using **https://www.m3pivot.com**.
- **`sitemap.xml`** and **`robots.txt`** use the same base URL.
- **Home** includes **JSON-LD** (`Organization`).
- **`CNAME`** at the repo root should contain **`www.m3pivot.com`** for the custom domain. See **`config/CNAME.example`**.

Favicons are generated from **`assets/small-logo.png`**. All main HTML pages use **`assets/favicon-180x180.png`** for both **`rel="icon"`** and **`apple-touch-icon`** (browsers downscale for tabs). The build script also writes **`favicon.ico`** (repo root + `assets/`) and **`favicon-32x32.png`** for optional legacy use or tools that request `/favicon.ico` without parsing HTML. The script **trims transparent margins**, **pads to a square**, then **fits** the mark in each output with a small **uniform gutter**. Regenerate after logo changes:

```bash
PYTHONPATH=.deps python3 scripts/build_favicon.py
```

Tune **`PAD_FRAC_32`** / **`PAD_FRAC_180`** / **`PAD_FRAC_ICO`** in **`scripts/build_favicon.py`** (lower = bigger logo, less white; too low risks looking tight in some browsers).

Optional: add **LinkedIn** URLs in JSON-LD `sameAs` on `index.html`.

## Project layout

GitHub Pages serves **HTML and SEO files from the repo root**. Edit those directly — there is no separate `pages/` mirror.

| Path | Purpose |
|------|---------|
| **Site (repo root)** | |
| `index.html` | Home |
| `team.html` · `startups.html` · `investors.html` · `contact.html` | Subpages |
| `sitemap.xml` · `robots.txt` · `CNAME` | SEO + custom domain (deployed as-is) |
| **`css/`** | |
| `styles.css` | Global styles (light/dark theme, layout, components) |
| **`js/`** | |
| `header.js` · `footer.js` | Shared chrome — edit once for all pages |
| `nav.js` | Mobile navigation drawer |
| `theme.js` | Light/dark theme (OS default + session toggle) |
| `home-sidebar-nav.js` | Homepage floating section nav |
| `legacy-redirects.js` | Old anchor and `/pages/*` URL redirects |
| `analytics.js` | Optional GA4 + Microsoft Clarity — see **`docs/ANALYTICS.md`** |
| `portfolio-gallery.js` · `.css` | Built carousel widget (do not edit by hand) |
| **`assets/`** | Images, icons, team photos |
| **`src/`** · **`components/`** | Portfolio carousel source (React + Vite) |
| **`scripts/`** | Build helpers (`build_favicon.py`, `build_team_portraits.py`, `sync_github_pages.py`) |
| **`config/`** | `CNAME` template for custom domain |
| **`docs/`** | Formspree, analytics, DNS, gallery, testimonials notes |
| **`pamphlet/`** | A5 print poster (not part of live site) |

## Maintaining pages

1. Edit **`index.html`** and subpages at the **repo root** only.
2. Shared UI lives in **`js/header.js`**, **`js/footer.js`**, and **`css/styles.css`** — change once, all pages update.
3. After portfolio carousel changes, run **`npm run build:gallery`**.
4. After testimonial changes, run **`npm run build:testimonials`** — see **[docs/testimonials.md](./docs/testimonials.md)** for the full edit + branch + publish workflow.
5. Optional: **`python scripts/sync_github_pages.py`** copies **`config/CNAME`** and **`favicon.ico`** to the repo root after regenerating icons.

## Partner headshots

The site expects **560×560** JPEGs in `assets/`:

- `team-murali.jpg` · `team-sankar.jpg` · `team-muthu.jpg` · `team-sanjeev.jpg`

Drop sources in `assets/` (e.g. `murali.jpeg`, `sankar.jpeg`, `muthu.jpg`, `sanjeev.jpeg`) and run:

```bash
PYTHONPATH=.deps python3 scripts/build_team_portraits.py
```

(requires Pillow in `.deps/` or install). Or replace the `team-*.jpg` files directly. If a file is missing, initials placeholders still show.

## Sample portfolio carousel (Startups & Investors)

Those pages embed a **feature carousel** (React + Tailwind + shadcn `Button`). Source lives under `components/ui/feature-carousel.tsx`. After changing it or `src/portfolio-data.ts`, rebuild:

```bash
npm install
npm run build:gallery
```

This writes `js/portfolio-gallery.js` and `js/portfolio-gallery.css`. See **`docs/portfolio-gallery.md`** for shadcn paths and setup notes.

## Local preview

```bash
npm run build:gallery
python3 -m http.server 8080
```

Then open **http://localhost:8080/**

## Repo

`https://github.com/msathiamurthy/m3pivot-website`
