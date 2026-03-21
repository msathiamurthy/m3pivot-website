# M3Pivot website

Static site for **[www.m3pivot.com](https://www.m3pivot.com)**. Built as plain HTML/CSS/JS, deployed with **GitHub Pages** from the repo root.

## Live site

- **Primary URL:** **https://www.m3pivot.com**  
- After DNS is configured, GitHub may still show the old `*.github.io` URL in settings; visitors should use **www.m3pivot.com**.

**GoDaddy DNS instructions** (for someone with domain access): see **[GODADDY-DNS-STEPS.md](./GODADDY-DNS-STEPS.md)**.

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
- **`CNAME`** in the repo root tells GitHub Pages to serve **www.m3pivot.com**.

Optional: add **`favicon.ico`** and **LinkedIn** URLs in JSON-LD `sameAs` on `index.html`.

## Project layout

| Path | Purpose |
|------|---------|
| `CNAME` | Custom hostname for GitHub Pages (`www.m3pivot.com`) |
| `index.html` | Home |
| `startups.html` · `investors.html` · `contact.html` | Subpages |
| `styles.css` | All styles |
| `nav.js` | Mobile navigation drawer |
| `assets/` | Logo(s), team photos (`team-*.jpg`), etc. |
| `sitemap.xml` · `robots.txt` | SEO discovery |
| `GODADDY-DNS-STEPS.md` | DNS checklist for GoDaddy |

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
