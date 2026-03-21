# M3Pivot website

Static site for [M3Pivot](https://www.m3pivot.com) (draft). Built as plain HTML/CSS/JS, deployable on **GitHub Pages** from the repo root.

## Live site (GitHub Pages)

**https://msathiamurthy.github.io/m3pivot-website/**

*(After you connect a custom domain in repo Settings → Pages, that URL may redirect to `www.m3pivot.com`.)*

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

- Each page has **unique `meta description`**, **`canonical`**, **Open Graph**, and **Twitter** tags.
- **`sitemap.xml`** and **`robots.txt`** (with sitemap URL) live at the repo root.
- **Home** includes **JSON-LD** (`Organization`) for rich results.

**When `www.m3pivot.com` is the primary URL**, find-and-replace  
`https://msathiamurthy.github.io/m3pivot-website` → `https://www.m3pivot.com` in:

`index.html`, `contact.html`, `startups.html`, `investors.html`, `sitemap.xml`, `robots.txt`, and the JSON-LD block on the home page.

Optional: add **`favicon.ico`** (or PNG + `<link rel="icon">`) and put **LinkedIn** URLs in `sameAs` inside the JSON-LD on `index.html`.

## Project layout

| Path | Purpose |
|------|---------|
| `index.html` | Home |
| `startups.html` · `investors.html` · `contact.html` | Subpages |
| `styles.css` | All styles |
| `nav.js` | Mobile navigation drawer |
| `assets/` | Logo(s), team photos (`team-*.jpg`), etc. |
| `sitemap.xml` · `robots.txt` | SEO discovery |

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
