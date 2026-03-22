# GoDaddy DNS — **m3pivot.com**

**Goal:** **https://www.m3pivot.com** loads the site hosted on GitHub Pages (`msathiamurthy.github.io`).  
The public homepage is **`index.html`** at the root of that site (you don’t add `index.html` in DNS).

---

1. GoDaddy → **My Products** → **m3pivot.com** → **DNS** (Manage DNS).

2. **`www` record**  
   - **Type:** CNAME  
   - **Name / Host:** `www`  
   - **Value / Points to:** `msathiamurthy.github.io`  
   - Exactly that — no `https://`, no slashes.

3. **Bare domain `m3pivot.com`** (no `www`) — pick **one** approach (don’t mix with extra A records):  
   - **Recommended with GitHub Pages:** **Only** these **four A records** for **`@`**:  
     `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153`  
   - **Or** GoDaddy **Forwarding** apex → `https://www.m3pivot.com` (301) — but then you **must not** also point `@` at random/other A records, or HTTPS on the apex will break.

4. **Locked / “Can’t delete” A records on `@`** (e.g. `15.197.x.x`, `3.33.x.x`)  
   GoDaddy adds these for **Forwarding**, **Website / Website Builder**, or similar. They **break** `https://m3pivot.com` because traffic can land on **non-GitHub** IPs and get the **wrong certificate** (`NET::ERR_CERT_COMMON_NAME_INVALID`).  
   **Fix:** In GoDaddy, turn **off** the feature that owns those records (e.g. **Domain → Forwarding**, **Websites** on this domain), or call **GoDaddy support** and ask to remove the locked `@` A records so **only** the four GitHub IPs remain.

5. **Do not** change **MX** unless you mean to change email.

6. Save. Propagation is often under an hour; can take longer.

---

Someone with **GitHub** access must also add the **`CNAME`** file and set the **custom domain** in the repo’s Pages settings — that’s separate from GoDaddy.

**GitHub:** After apex DNS is **only** GitHub’s four A’s, in **Settings → Pages** use **Check again** if needed. GitHub can then serve **`https://m3pivot.com`** with a valid cert (may take a short time after DNS is clean).
