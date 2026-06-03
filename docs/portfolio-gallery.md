# Portfolio feature carousel (React)

The **Startups** and **Investors** pages embed a 3D-style **feature carousel** for the sample portfolio. Built with **React**, **TypeScript**, **Tailwind CSS**, **lucide-react**, and shadcn-style components under `components/ui/`.

## shadcn layout

| Path | Purpose |
|------|---------|
| `components/ui/feature-carousel.tsx` | Carousel + optional full `HeroSection` |
| `components/ui/button.tsx` | shadcn `Button` (nav arrows) |
| `lib/utils.ts` | `cn()` helper |
| `components.json` | shadcn paths (`@/components/ui`) |

## Setup

```bash
npm install
npm run build:gallery
```

Outputs `js/portfolio-gallery.js` and `js/portfolio-gallery.css`. Commit these before deploying to GitHub Pages.

### New shadcn project (reference)

```bash
npx shadcn@latest init
npx shadcn@latest add button
```

Dependencies: `lucide-react`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`.

## Edit portfolio slides

Update `src/portfolio-data.ts`, then `npm run build:gallery`.

## HTML usage

```html
<div data-portfolio-gallery></div>
<link rel="stylesheet" href="/js/portfolio-gallery.css?v=3" />
<script src="/js/portfolio-gallery.js?v=3" defer></script>
```
