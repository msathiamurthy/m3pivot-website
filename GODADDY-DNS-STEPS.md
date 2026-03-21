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

3. **Bare domain `m3pivot.com`** (no `www`) — use **one** of these:  
   - **Forwarding:** `https://m3pivot.com` → `https://www.m3pivot.com`, type **Permanent (301)**, **or**  
   - **Four A records** for **`@`**:  
     `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153`

4. **Do not** change **MX** unless you mean to change email.

5. Save. Propagation is often under an hour; can take longer.

---

Someone with **GitHub** access must also add the **`CNAME`** file and set the **custom domain** in the repo’s Pages settings — that’s separate from GoDaddy.
