# M3Pivot website

Static site for [M3Pivot](https://www.m3pivot.com) (draft).

## Brand — logo typography & colors

The **M3Pivot** wordmark in logo assets (e.g. `full-logo.png`, `small-logo.png` under each variant’s `assets/`) is set in:

| | |
|--|--|
| **Font** | [Montserrat](https://fonts.google.com/specimen/Montserrat) |
| **Style** | **Bold** |

**Logo colors**

| | |
|--|--|
| **Navy blue** | `#034285` |
| **Gold** | `#E1A935` |

Use the same face, weight, and colors when creating new raster or vector lockups that should match the official logo.

**Option 3** (`option3/styles.css`) uses Montserrat site-wide and maps UI accents to this navy + gold palette (primary actions and nav highlights: navy; secondary labels / hero eyebrow: gold).

## Live site (GitHub Pages)

- **Root (current default):** `https://msathiamurthy.github.io/m3pivot-website/`

## Partner preview variants (subfolders)

Short-term URLs to compare layouts and copy:

| Variant   | URL |
|-----------|-----|
| **Option 1** | `https://msathiamurthy.github.io/m3pivot-website/option1/` |
| **Option 2** | `https://msathiamurthy.github.io/m3pivot-website/option2/` *(simplified narrative layout + team section)* |
| **Option 3** | `https://msathiamurthy.github.io/m3pivot-website/option3/` |

Each folder is a **full copy** of the site (`index.html`, `styles.css`, `startups.html`, `investors.html`, `contact.html`, `assets/`). Edit files inside the folder you’re iterating on so paths stay correct.

### Option 2 — partner headshots

The site expects **560×560** JPEGs in `option2/assets/`:

- `team-murali.jpg` · `team-sankar.jpg` · `team-muthu.jpg` · `team-sanjeev.jpg`

You can drop first-name sources in repo root `assets/` (e.g. `murali.jpeg`, `sankar.jpeg`, `muthu.jpg`, `sanjeev.jpeg`) and re-run square crop + export to `option2/assets/team-*.jpg` with `sips` (see commit history) or replace the `team-*.jpg` files directly. If a file is missing, initials placeholders still show.

## Local preview

Open `index.html` in a browser, or use a static server from the repo root:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/option2/` etc.

## Repo

`https://github.com/msathiamurthy/m3pivot-website`
