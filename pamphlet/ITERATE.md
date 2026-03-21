# Iterating on the M3Pivot A5 poster

| What you want to change | Where |
|-------------------------|--------|
| **Words** (headlines, body, partner names, footer) | `m3pivot-a5-poster.html` |
| **Fonts, spacing, print density, layout** | `css/m3pivot-a5-poster.css` (tuning) and `css/m3pivot-a5-poster-base.css` (structure) |
| **Colours / brand tokens** | `css/brand.css` |
| **“Pivot” highlight** | Navy override in `m3pivot-a5-poster.css` (`.m3pivot-a5-poster .pivot-word`); default gold is in `brand.css` |

## Check print

Open **`m3pivot-a5-poster.html`** → **Print → Save as PDF** (A5 portrait).

## If text overflows

Lower `--scale` on `:root` in **`css/m3pivot-a5-poster.css`** (e.g. `1.12` instead of `1.16`), or reduce specific `font-size` rules there.
