#!/usr/bin/env python3
"""Sync deploy-only files from config/ and assets/ to the GitHub Pages repo root."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent


def sync_cname_to_root() -> None:
    src = ROOT / "config" / "CNAME"
    if src.is_file():
        shutil.copy2(src, ROOT / "CNAME")
        print("Synced config/CNAME -> CNAME")


def sync_favicon_to_root() -> None:
    src = ROOT / "assets" / "icons" / "favicon.ico"
    if src.is_file():
        shutil.copy2(src, ROOT / "favicon.ico")
        print("Synced assets/icons/favicon.ico -> favicon.ico")


if __name__ == "__main__":
    sync_cname_to_root()
    sync_favicon_to_root()
