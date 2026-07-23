# Testimonials ("What our partners say")

The **Startups** page (`startups.html`) embeds the client testimonials carousel in
the `#testimonials` section. Built with **React** + **TypeScript**, mounted via
`src/mount-testimonials.tsx`.

## Layout

| Path | Purpose |
|------|---------|
| `components/ui/stagger-testimonials.tsx` | Testimonial data array + carousel UI |
| `src/mount-testimonials.tsx` | Mounts `<StaggerTestimonials />` into `[data-testimonials]`, renders the section heading |
| `js/testimonials.js` / `js/testimonials.css` | Built output — this is what the live site actually loads |

## Edit a testimonial

1. Open `components/ui/stagger-testimonials.tsx` and edit the `testimonials` array (see the
   "HOW TO ADD A NEW TESTIMONIAL" comment at the top of the file for field descriptions —
   `testimonial`, `by`, `imgSrc`, `isLogo`).
2. Rebuild the bundle — the site loads `js/testimonials.js`, not the `.tsx` source directly:
   ```bash
   npm run build:testimonials
   ```
3. Commit **both** the `.tsx` source and the rebuilt `js/testimonials.js` (and `.css` if it
   changed) — the source alone has no effect on the live site until it's rebuilt.

## Branch, commit, and publish workflow

GitHub Pages serves the live site straight from the **root of `main`**, so pushing to
`origin/main` is the actual "go live" step. For any content change:

```bash
# 1. Branch from main (carries any uncommitted edits with you)
git checkout -b <short-descriptive-branch-name>

# 2. Make your edit, then rebuild
npm run build:testimonials

# 3. Stage and commit both the source and the built bundle
git add components/ui/stagger-testimonials.tsx js/testimonials.js
git commit -m "<describe the change>"

# 4. Push the branch
git push -u origin <short-descriptive-branch-name>

# 5. Merge into main — either:
#    a) Recommended: open a PR and merge on GitHub (review trail)
gh pr create --fill
#    b) Or merge locally for small copy tweaks:
git checkout main && git pull && git merge <short-descriptive-branch-name>

# 6. Publish — push main to origin
git push origin main

# 7. Clean up the branch now that it's merged
git branch -d <short-descriptive-branch-name>
git push origin --delete <short-descriptive-branch-name>
```

## Verifying a change

Before publishing, it's worth confirming the rebuilt bundle actually contains the new
text and renders correctly:

```bash
grep -o "your new quote text" js/testimonials.js
python3 -m http.server 8934   # serve the repo root
# open http://localhost:8934/startups.html and check the "What our partners say" section
```
