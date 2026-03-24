#!/usr/bin/env python3
"""Build favicon.ico and PNG sizes from assets/small-logo.png (requires Pillow)."""
# From repo root: PYTHONPATH=.deps python3 scripts/build_favicon.py

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "small-logo.png"


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    sizes_ico = [(16, 16), (32, 32), (48, 48)]
    imgs = [src.resize(s, Image.Resampling.LANCZOS) for s in sizes_ico]
    ico_path = ROOT / "assets" / "favicon.ico"
    imgs[0].save(
        ico_path,
        format="ICO",
        sizes=[(s[0], s[1]) for s in sizes_ico],
        append_images=imgs[1:],
    )
    (ROOT / "favicon.ico").write_bytes(ico_path.read_bytes())

    for s in (32, 180):
        out = ROOT / "assets" / f"favicon-{s}x{s}.png"
        src.resize((s, s), Image.Resampling.LANCZOS).save(out, format="PNG")
    print("Wrote assets/favicon.ico, favicon.ico, assets/favicon-32x32.png, assets/favicon-180x180.png")


if __name__ == "__main__":
    main()
