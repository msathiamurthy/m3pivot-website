# M3Pivot website

Static site for **[www.m3pivot.com](https://www.m3pivot.com)**. Built as plain HTML/CSS/JS, deployed with **GitHub Pages** from the repo root.

## Live site

- **Production:** **https://www.m3pivot.com** — homepage is **`index.html`** at the repo root (GitHub Pages publishes **`/`** on branch **`main`**).
- **GitHub URL:** https://msathiamurthy.github.io/m3pivot-website/

**GoDaddy DNS (share with whoever has domain access):** **[GODADDY-DNS-STEPS.md](./GODADDY-DNS-STEPS.md)**

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
- **`CNAME`** at the repo root should contain **`www.m3pivot.com`** for the custom domain. See **`CNAME.example`**.

Favicons are generated from **`assets/small-logo.png`**. All main HTML pages use **`assets/favicon-180x180.png`** for both **`rel="icon"`** and **`apple-touch-icon`** (browsers downscale for tabs). The build script also writes **`favicon.ico`** (repo root + `assets/`) and **`favicon-32x32.png`** for optional legacy use or tools that request `/favicon.ico` without parsing HTML. The script **trims transparent margins**, **pads to a square**, then **fits** the mark in each output with a small **uniform gutter**. Regenerate after logo changes:

```bash
PYTHONPATH=.deps python3 scripts/build_favicon.py
```

Tune **`PAD_FRAC_32`** / **`PAD_FRAC_180`** / **`PAD_FRAC_ICO`** in **`scripts/build_favicon.py`** (lower = bigger logo, less white; too low risks looking tight in some browsers).

Optional: add **LinkedIn** URLs in JSON-LD `sameAs` on `index.html`.

## Project layout

| Path | Purpose |
|------|---------|
| `CNAME.example` | Template: copy to `CNAME` when enabling **www** on GitHub Pages |
| `index.html` | Home |
| `startups.html` · `investors.html` · `contact.html` | Subpages |
| `styles.css` | All styles |
| `nav.js` | Mobile navigation drawer |
| `footer.js` | Shared footer (logo + links); edit once for all pages |
| `analytics.js` | Optional GA4 + Microsoft Clarity — see **`ANALYTICS.md`** |
| `assets/` | Logo(s), team photos (`team-*.jpg`), etc. |
| `sitemap.xml` · `robots.txt` | SEO discovery |
| `GODADDY-DNS-STEPS.md` | Short GoDaddy DNS steps (for whoever manages the domain) |
| `formspree.md` | Contact form backend (Formspree endpoint, account, fields) |
| `pamphlet/` | A5 duplex poster; see `pamphlet/README.md` |

## Partner headshots

The site expects **560×560** JPEGs in `assets/`:

- `team-murali.jpg` · `team-sankar.jpg` · `team-muthu.jpg` · `team-sanjeev.jpg`

Drop sources in `assets/` (e.g. `murali.jpeg`, `sankar.jpeg`, `muthu.jpg`, `sanjeev.jpeg`) and run:

```bash
PYTHONPATH=.deps python3 scripts/build_team_portraits.py
```

(requires Pillow in `.deps/` or install). Or replace the `team-*.jpg` files directly. If a file is missing, initials placeholders still show.

## Local preview

```bash
python3 -m http.server 8080
```

Then open **http://localhost:8080/**

## Repo

`https://github.com/msathiamurthy/m3pivot-website`
