# M3Pivot — A5 duplex poster

**File:** **`m3pivot-a5-poster.html`** · **CSS:** **`css/m3pivot-a5-poster.css`** (+ **`css/m3pivot-a5-poster-base.css`**) · **Theme:** **`css/brand.css`**

Duplex **A5 portrait** (148 × 210 mm): gradient front with headline, story, Money / Market / Management; back with logo, SVCE line, partner names, QR, URL.

## Preview

From repo root:

```bash
python3 -m http.server 8080
```

Open **http://localhost:8080/pamphlet/** → **Open A5 poster**, or go straight to **`m3pivot-a5-poster.html`**.

## Print / PDF

1. Open **`m3pivot-a5-poster.html`** (not only the hub — the hub hides on print).
2. Chrome or Edge: **Print → Save as PDF** · paper **A5 portrait** · margins **None** if available.

## Optional: stacked JPG from PDF

1. Save PDF as **`pamphlet/M3Pivot-A5-poster.pdf`** (2 pages).
2. With `pip install pymupdf pillow`:

   ```bash
   python3 pamphlet/scripts/build-a5-poster-jpg.py
   ```

   Output: **`pamphlet/M3Pivot-A5-poster-front-back.jpg`**

## Assets

- **`qr-website.png`** — QR → https://www.m3pivot.com/
- Logo: **`../assets/full-logo.png`**

## Regenerate QR

```bash
npx qrcode "https://www.m3pivot.com/" -o pamphlet/qr-website.png -w 512 -m 2
```

## Iterate

See **`ITERATE.md`** for where to edit copy vs CSS.
