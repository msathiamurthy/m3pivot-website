#!/usr/bin/env python3
"""Apply root-absolute asset paths to pages/*.html."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ROOT / "pages"

REPLACEMENTS = [
    ('href="styles.css"', 'href="/css/styles.css"'),
    ('src="analytics.js"', 'src="/js/analytics.js"'),
    ('src="legacy-redirects.js"', 'src="/js/legacy-redirects.js"'),
    ('src="footer.js?v=2"', 'src="/js/footer.js?v=2"'),
    ('src="nav.js?v=2"', 'src="/js/nav.js?v=2"'),
    ('href="assets/', 'href="/assets/images/'),
    ('src="assets/', 'src="/assets/images/'),
    ('href="/assets/images/favicon', 'href="/assets/icons/favicon'),
    ('content="https://www.m3pivot.com/assets/full-logo.png"', 'content="https://www.m3pivot.com/assets/images/full-logo.png"'),
    ('"logo": "https://www.m3pivot.com/assets/full-logo.png"', '"logo": "https://www.m3pivot.com/assets/images/full-logo.png"'),
    ('href="/assets/images/favicon-180x180.png"', 'href="/assets/icons/favicon-180x180.png"'),
    ('href="/assets/images/favicon-32x32.png"', 'href="/assets/icons/favicon-32x32.png"'),
]


def main() -> None:
    for path in PAGES.glob("*.html"):
        text = path.read_text(encoding="utf-8")
        for old, new in REPLACEMENTS:
            text = text.replace(old, new)
        path.write_text(text, encoding="utf-8")
        print(f"Updated {path.name}")


if __name__ == "__main__":
    main()
