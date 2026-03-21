# M3Pivot website

Static site for **[www.m3pivot.com](https://www.m3pivot.com)**. Built as plain HTML/CSS/JS, deployed with **GitHub Pages** from the repo root.

## Live site

- **Primary URL (after DNS + GitHub custom domain):** **https://www.m3pivot.com**
- **Preview on GitHub (current):** **https://msathiamurthy.github.io/m3pivot-website/** — including **`/option3/`** for staging feedback.

The repo **does not include a `CNAME` file right now** so GitHub Pages **does not redirect** `github.io` → `www`. That keeps **`/option3/`** shareable while GoDaddy DNS is pending.

**When `www` should go live on GitHub:** copy **`CNAME.example`** to **`CNAME`** (one line: `www.m3pivot.com`), push, then in **GitHub → Settings → Pages** set **Custom domain** to `www.m3pivot.com` and save. After the DNS check passes, enable **Enforce HTTPS**. (GitHub will then redirect `github.io` URLs to `www` again—that’s normal.)

**GoDaddy DNS instructions:** **[GODADDY-DNS-STEPS.md](./GODADDY-DNS-STEPS.md)**.

### Temporary staging: `option3/`

Full duplicate under **`option3/`** with canonical/OG aimed at **`https://msathiamurthy.github.io/m3pivot-website/option3/`**. Remove the folder once you no longer need that URL.

**Also clear the custom domain in GitHub if it’s still set:** **Settings → Pages → Custom domain → Remove**. If the UI still lists `www.m3pivot.com` after you push without `CNAME`, remove it there—otherwise GitHub can keep redirecting until that field is empty.

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
- **`CNAME`** (when present) tells GitHub Pages to use **www.m3pivot.com**; it is **omitted** during staging so `github.io` URLs don’t redirect. Use **`CNAME.example`** to restore.

Optional: add **`favicon.ico`** and **LinkedIn** URLs in JSON-LD `sameAs` on `index.html`.

## Project layout

| Path | Purpose |
|------|---------|
| `CNAME.example` | Template: copy to `CNAME` when enabling **www** on GitHub Pages |
| `index.html` | Home |
| `startups.html` · `investors.html` · `contact.html` | Subpages |
| `styles.css` | All styles |
| `nav.js` | Mobile navigation drawer |
| `assets/` | Logo(s), team photos (`team-*.jpg`), etc. |
| `sitemap.xml` · `robots.txt` | SEO discovery |
| `GODADDY-DNS-STEPS.md` | DNS checklist for GoDaddy |
| `option3/` | **Temporary** full copy for staging URL (remove after DNS is live) |

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
