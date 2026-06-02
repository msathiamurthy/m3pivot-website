#!/usr/bin/env python3
"""One-time helper: sync pages/*.html and public/* to repo root for GitHub Pages."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
PAGES = ROOT / "pages"
PUBLIC = ROOT / "public"


def sync_pages_to_root() -> None:
    for html in PAGES.glob("*.html"):
        shutil.copy2(html, ROOT / html.name)
        print(f"Synced {html.name} -> root")


def sync_public_to_root() -> None:
    for name in ("robots.txt", "sitemap.xml"):
        src = PUBLIC / name
        if src.is_file():
            shutil.copy2(src, ROOT / name)
            print(f"Synced public/{name} -> root")


def sync_cname_to_root() -> None:
    src = ROOT / "config" / "CNAME"
    if src.is_file():
        shutil.copy2(src, ROOT / "CNAME")
        print("Synced config/CNAME -> root/CNAME")


def sync_favicon_to_root() -> None:
    src = ROOT / "assets" / "icons" / "favicon.ico"
    if src.is_file():
        shutil.copy2(src, ROOT / "favicon.ico")
        print("Synced assets/icons/favicon.ico -> root/favicon.ico")


if __name__ == "__main__":
    sync_pages_to_root()
    sync_public_to_root()
    sync_cname_to_root()
    sync_favicon_to_root()
