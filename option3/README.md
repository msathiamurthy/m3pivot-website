# M3Pivot — option3 (active site variant)

This is the **working copy** of the marketing site: same structure as the repo root (`index.html`, `startups.html`, `investors.html`, `contact.html`) with URLs and metadata aimed at the **`/option3/`** path on GitHub Pages.

## Local preview

From repo root:

```bash
python3 -m http.server 8080
```

Open **http://localhost:8080/option3/**

## Assets

Images and logos live in the repo root **`../assets/`** (shared with the main site). HTML here uses **`../assets/...`** so nothing is duplicated.

## Published URL

**https://msathiamurthy.github.io/m3pivot-website/option3/**

*(If GitHub Pages custom domain is set to `www.m3pivot.com`, GitHub may redirect `github.io` to `www`—then use local preview or temporarily clear the custom domain to test `option3` on `github.io`.)*

## Files

| File | Role |
|------|------|
| `index.html` | Home, team, contact section |
| `startups.html` | Founders |
| `investors.html` | Investors |
| `contact.html` | Dedicated contact page |
| `styles.css` | Styles for this variant |
| `nav.js` | Mobile nav |
| `footer.js` | **Global footer** (logo + copy + nav). Edit this file to change the footer on every page. Each HTML file sets `data-footer-context` on `<html>` (`home` \| `sub` \| `contact`) so Home / Team / Contact links resolve correctly. |

When you’re ready to make **option3** the live homepage, merge or replace the root HTML/CSS with this folder (and update canonicals to `https://www.m3pivot.com/`).
