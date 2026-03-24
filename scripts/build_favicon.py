#!/usr/bin/env python3
"""Build favicon.ico and PNG sizes from assets/small-logo.png (requires Pillow).

Trims transparent margins, pads to a square, then applies a center "zoom" crop so
the mark fills more of the pixel grid — especially important at 16–32px where the
full wordmark was illegible.

From repo root: PYTHONPATH=.deps python3 scripts/build_favicon.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "small-logo.png"

# Fraction of width/height to keep (center crop). Lower = tighter zoom = larger logo in frame.
ZOOM_APPLE = 0.92  # 180×180 — trim outer whitespace, keep composition balanced
ZOOM_PNG32 = 0.70  # 32×32 tab icon — stronger zoom so M3 reads at a glance
ZOOM_ICO = 0.78  # 16 / 32 / 48 inside .ico


def trim_alpha(im: Image.Image) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        raise ValueError(f"No opaque pixels in {SRC}")
    return im.crop(bbox)


def square_pad(im: Image.Image, fill=(255, 255, 255, 0)) -> Image.Image:
    w, h = im.size
    side = max(w, h)
    out = Image.new("RGBA", (side, side), fill)
    out.paste(im, ((side - w) // 2, (side - h) // 2), im)
    return out


def zoom_center(im: Image.Image, keep: float) -> Image.Image:
    """Keep the middle `keep` fraction of width and height (0 < keep <= 1)."""
    if keep >= 1.0:
        return im
    w, h = im.size
    nw = max(1, int(w * keep))
    nh = max(1, int(h * keep))
    x0 = (w - nw) // 2
    y0 = (h - nh) // 2
    return im.crop((x0, y0, x0 + nw, y0 + nh))


def prep_base() -> Image.Image:
    im = Image.open(SRC).convert("RGBA")
    im = trim_alpha(im)
    return square_pad(im)


def resize_square(im: Image.Image, side: int) -> Image.Image:
    return im.resize((side, side), Image.Resampling.LANCZOS)


def main() -> None:
    base = prep_base()

    # Apple touch + general large icon
    apple_src = zoom_center(base, ZOOM_APPLE)
    apple_path = ROOT / "assets" / "favicon-180x180.png"
    resize_square(apple_src, 180).save(apple_path, format="PNG")

    # Browser tab PNG
    tab_src = zoom_center(base, ZOOM_PNG32)
    tab_path = ROOT / "assets" / "favicon-32x32.png"
    resize_square(tab_src, 32).save(tab_path, format="PNG")

    # Multi-size ICO
    ico_src = zoom_center(base, ZOOM_ICO)
    sizes_ico = [(16, 16), (32, 32), (48, 48)]
    imgs = [resize_square(ico_src, s[0]) for s in sizes_ico]
    ico_path = ROOT / "assets" / "favicon.ico"
    imgs[0].save(
        ico_path,
        format="ICO",
        sizes=[(s[0], s[1]) for s in sizes_ico],
        append_images=imgs[1:],
    )
    (ROOT / "favicon.ico").write_bytes(ico_path.read_bytes())

    print(
        "Wrote assets/favicon.ico, favicon.ico, "
        "assets/favicon-32x32.png, assets/favicon-180x180.png "
        f"(zoom: ico={ZOOM_ICO}, 32={ZOOM_PNG32}, 180={ZOOM_APPLE})"
    )


if __name__ == "__main__":
    main()
