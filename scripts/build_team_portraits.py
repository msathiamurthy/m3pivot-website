#!/usr/bin/env python3
"""
Build square team portraits for option2 from root assets/.
- Optional whitespace trim (for headshots on white backgrounds).
- Center-crop cover to OUT_SIZE x OUT_SIZE.
"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEPS = ROOT / ".deps"
if DEPS.is_dir():
    sys.path.insert(0, str(DEPS))

from PIL import Image  # noqa: E402

OUT_SIZE = 560
JPEG_QUALITY = 88

# (source relative to repo root, dest relative to option2/, trim whitespace?)
JOBS: list[tuple[str, str, bool]] = [
    ("assets/murali.jpeg", "option2/assets/team-murali.jpg", True),
    ("assets/sankar.jpeg", "option2/assets/team-sankar.jpg", True),
    ("assets/muthu.jpg", "option2/assets/team-muthu.jpg", False),
    ("assets/sanjeev.jpeg", "option2/assets/team-sanjeev.jpg", False),
]


def trim_near_white_bbox(im: Image.Image, thresh: int = 248) -> Image.Image:
    """Crop to bounding box of pixels that are not uniformly near-white."""
    rgb = im.convert("RGB")
    w, h = rgb.size
    px = rgb.load()
    assert px is not None

    def is_near_white(x: int, y: int) -> bool:
        r, g, b = px[x, y]
        return r >= thresh and g >= thresh and b >= thresh

    left, top, right, bottom = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if not is_near_white(x, y):
                found = True
                left = min(left, x)
                right = max(right, x)
                top = min(top, y)
                bottom = max(bottom, y)

    if not found:
        return im

    # If we'd remove almost everything, skip (bad threshold for this image).
    area = (right - left + 1) * (bottom - top + 1)
    if area < 0.15 * w * h:
        return im

    return rgb.crop((left, top, right + 1, bottom + 1))


def cover_square(im: Image.Image, size: int) -> Image.Image:
    im = im.convert("RGB")
    w, h = im.size
    scale = max(size / w, size / h)
    nw, nh = max(1, int(round(w * scale))), max(1, int(round(h * scale)))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - size) // 2
    top = (nh - size) // 2
    return im.crop((left, top, left + size, top + size))


def main() -> None:
    for rel_src, rel_dst, do_trim in JOBS:
        src = ROOT / rel_src
        dst = ROOT / rel_dst
        if not src.is_file():
            print(f"skip missing: {src}")
            continue
        im = Image.open(src)
        im.load()
        if do_trim:
            im = trim_near_white_bbox(im)
        im = cover_square(im, OUT_SIZE)
        dst.parent.mkdir(parents=True, exist_ok=True)
        im.save(dst, "JPEG", quality=JPEG_QUALITY, optimize=True)
        print(f"wrote {dst.relative_to(ROOT)} ({OUT_SIZE}x{OUT_SIZE})")


if __name__ == "__main__":
    main()
