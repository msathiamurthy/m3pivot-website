#!/usr/bin/env python3
"""Stack PDF pages from M3Pivot A5 poster into one vertical JPG.

Requires: pip install pymupdf pillow

Usage (from repo root):
  python3 pamphlet/scripts/build-a5-poster-jpg.py

Reads:  pamphlet/M3Pivot-A5-poster.pdf (export first from Chrome; see README)
Writes: pamphlet/M3Pivot-A5-poster-front-back.jpg
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
    from PIL import Image
except ImportError as e:
    print("Install deps: pip install pymupdf pillow", file=sys.stderr)
    raise SystemExit(1) from e

ROOT = Path(__file__).resolve().parents[2]
PDF = ROOT / "pamphlet" / "M3Pivot-A5-poster.pdf"
OUT = ROOT / "pamphlet" / "M3Pivot-A5-poster-front-back.jpg"
ZOOM = 4.0


def main() -> None:
    if not PDF.is_file():
        print(f"Missing PDF: {PDF}", file=sys.stderr)
        raise SystemExit(1)

    doc = fitz.open(PDF)
    mat = fitz.Matrix(ZOOM, ZOOM)
    images: list[Image.Image] = []
    for i in range(len(doc)):
        pix = doc[i].get_pixmap(matrix=mat, alpha=False)
        images.append(Image.frombytes("RGB", [pix.width, pix.height], pix.samples))
    doc.close()

    if not images:
        raise SystemExit("PDF has no pages")

    max_w = max(im.width for im in images)
    total_h = sum(im.height for im in images)
    composite = Image.new("RGB", (max_w, total_h), (255, 255, 255))
    y = 0
    for im in images:
        x = (max_w - im.width) // 2
        composite.paste(im, (x, y))
        y += im.height

    composite.save(OUT, quality=93, optimize=True, subsampling=0)
    print(f"Wrote {OUT} ({composite.size[0]}×{composite.size[1]} px, {len(images)} panels)")


if __name__ == "__main__":
    main()
