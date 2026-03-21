# Point `www.m3pivot.com` to GitHub Pages (GoDaddy)

**For:** Whoever has GoDaddy access for the domain **m3pivot.com**  
**Site is hosted on:** GitHub Pages, repo `msathiamurthy/m3pivot-website`  
**Public URL we want:** **https://www.m3pivot.com**

---

## Part A — GitHub (repo owner: Muthu / team with GitHub access)

Do this **first** (or in parallel with DNS):

1. Open **https://github.com/msathiamurthy/m3pivot-website**
2. Go to **Settings** → **Pages** (left sidebar).
3. Under **Custom domain**, enter: **`www.m3pivot.com`**
4. Click **Save**.
5. Wait until GitHub shows a **DNS check** (may show errors until GoDaddy is updated — that’s normal).
6. After DNS propagates and the site loads on **www**, enable **Enforce HTTPS** (checkbox on the same Pages screen).

> The repo includes a **`CNAME`** file containing `www.m3pivot.com`, which GitHub Pages expects for this domain.

---

## Part B — GoDaddy DNS (partner with GoDaddy login)

1. Log in to **GoDaddy** → **My Products** → domain **m3pivot.com** → **DNS** (or **Manage DNS**).

2. **For `www` (subdomain):**  
   - **Add** a record (or **edit** the existing `www` record if one conflicts).  
   - **Type:** `CNAME`  
   - **Name / Host:** `www`  
   - **Value / Points to:** **`msathiamurthy.github.io`**  
     - Must be **exactly** that (no `https://`, no `/m3pivot-website`).  
   - **TTL:** 1 hour (or default).

3. **For bare domain `m3pivot.com` (no www)** — pick **one** approach:

   **Option 1 — Recommended (forward to www)**  
   - In GoDaddy, use **Domain → Forwarding** (or similar):  
     - Forward **`https://m3pivot.com`** → **`https://www.m3pivot.com`**  
     - Type: **Permanent (301)**  

   **Option 2 — A records to GitHub (apex hosting)**  
   - Remove conflicting **A** records for `@` if any.  
   - Add **four** **A** records for **`@`** (host/name may show as `@` or blank):  

     | Type | Name | Value            |
     |------|------|------------------|
     | A    | @    | `185.199.108.153` |
     | A    | @    | `185.199.109.153` |
     | A    | @    | `185.199.110.153` |
     | A    | @    | `185.199.111.153` |

   - If you use **Option 2**, you do **not** need to forward `m3pivot.com` to `www` unless you still want one canonical URL (usually **www** is simpler with GitHub).

4. **Do not** change **MX** (email) or other records unless you know they’re unused.

5. **Wait:** DNS can take **15 minutes to 48 hours** (often under an hour). Then open **https://www.m3pivot.com** in a private window.

6. When the site loads, the GitHub repo owner should return to **Settings → Pages** and turn on **Enforce HTTPS** if it’s available.

---

## Quick checklist

| Step | Where        | Action |
|------|--------------|--------|
| 1    | GitHub Pages | Custom domain = `www.m3pivot.com`, Save |
| 2    | GoDaddy DNS  | CNAME `www` → `msathiamurthy.github.io` |
| 3    | GoDaddy      | Forward `m3pivot.com` → `https://www.m3pivot.com` **or** add 4 GitHub A records on `@` |
| 4    | GitHub Pages | After site works: **Enforce HTTPS** |

---

## If something fails

- **“Domain not loading”:** Wait longer; clear browser cache; try https://www.m3pivot.com from another network or https://dnschecker.org for `www` CNAME → `msathiamurthy.github.io`.  
- **Certificate errors:** Wait for GitHub to issue SSL (can take up to ~24h after DNS is correct), then enable **Enforce HTTPS**.  
- **Wrong site / 404:** Confirm the **GitHub** repo’s Pages source is **`main`** branch, **`/` (root)** folder.

Official reference: [GitHub Docs — Configuring a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
