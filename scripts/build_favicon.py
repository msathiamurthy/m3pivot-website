#!/usr/bin/env python3
"""Build favicon.ico and PNG sizes from assets/small-logo.png (requires Pillow).

1. Trim transparent margins from the source.
2. Pad to a square (so the mark is not squashed).
3. **Scale to fit** inside each output size with **uniform padding** — the full logo
   stays inside the canvas (no edge clipping). Slightly larger logo = smaller padding
   fraction (still never crop).

From repo root: PYTHONPATH=.deps python3 scripts/build_favicon.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "small-logo.png"

# Padding as a fraction of output edge (each side). Full mark must fit in (1 - 2*frac).
# Lower = bigger logo, less white — raise if any browser clips the outermost pixels.
PAD_FRAC_32 = 0.085  # ~2.7px per side at 32px; keeps M3 + swoosh fully inside
PAD_FRAC_180 = 0.055
PAD_FRAC_ICO = 0.08  # 16 / 32 / 48 layers in .ico


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


def prep_base() -> Image.Image:
    im = Image.open(SRC).convert("RGBA")
    im = trim_alpha(im)
    return square_pad(im)


def fit_square_canvas(
    src_square: Image.Image,
    out_size: int,
    pad_fraction: float,
    bg=(255, 255, 255, 255),
) -> Image.Image:
    """Scale the full square logo down so it fits in (out_size - 2*pad), centered."""
    pad = max(1, round(out_size * pad_fraction))
    inner = out_size - 2 * pad
    inner = max(1, inner)
    scaled = src_square.resize((inner, inner), Image.Resampling.LANCZOS)
    out = Image.new("RGBA", (out_size, out_size), bg)
    out.paste(scaled, (pad, pad), scaled)
    return out


def main() -> None:
    base = prep_base()

    fit_square_canvas(base, 180, PAD_FRAC_180).save(
        ROOT / "assets" / "favicon-180x180.png", format="PNG"
    )
    fit_square_canvas(base, 32, PAD_FRAC_32).save(
        ROOT / "assets" / "favicon-32x32.png", format="PNG"
    )

    sizes_ico = [(16, 16), (32, 32), (48, 48)]
    imgs = [fit_square_canvas(base, s[0], PAD_FRAC_ICO) for s in sizes_ico]
    ico_path = ROOT / "assets" / "favicon.ico"
    imgs[0].save(
        ico_path,
        format="ICO",
        sizes=[(s[0], s[1]) for s in sizes_ico],
        append_images=imgs[1:],
    )
    (ROOT / "favicon.ico").write_bytes(ico_path.read_bytes())

    print(
        "Wrote assets/favicon.ico, favicon.ico, favicon-32x32.png, favicon-180x180.png "
        f"(fit + pad: 32={PAD_FRAC_32}, 180={PAD_FRAC_180}, ico={PAD_FRAC_ICO})"
    )


if __name__ == "__main__":
    main()
