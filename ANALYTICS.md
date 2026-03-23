# Analytics: Google Analytics 4 & Microsoft Clarity

This site can load **GA4** and **Clarity** from one file: **`analytics.js`**.  
Edit the two variables at the top of that file, commit, and push — no need to touch every HTML page.

---

## Who owns Google Analytics (team reference)

| | |
|--|--|
| **Google login used for GA4** | **`smraman@gmail.com`** |
| **Where to sign in** | [analytics.google.com](https://analytics.google.com/) |

To give others access: **Admin** (gear) → **Account access management** or **Property access management** → **Add users**.

*(This is documentation for the team. The Measurement ID in `analytics.js` is still what the website loads; it is not tied to the email in code.)*

---

## GA4: what to enter as **Account name** (and related names)

Google Analytics is organized as **Account** → **Property** → **Data stream** (your website).

| Level | Suggested name | Notes |
|--------|----------------|--------|
| **Account name** | **`M3Pivot`** | Use the **company / brand** name here. One account can hold several properties later (e.g. another site or app). Avoid putting a personal name in the *Account* unless this login is only for personal experiments. |
| **Property name** | **`M3Pivot website`** or **`M3Pivot — www`** | Describes *this* site’s data and reports. |
| **Web data stream name** | **`M3Pivot production`** | Matches the stream where you set `https://www.m3pivot.com`. |

**Summary:** Enter **`M3Pivot`** as the **Account name** unless you already have a company GA account—then add a **new Property** under that account instead of creating a second account.

---

## 1. Google Analytics 4 (GA4)

### Create the property

1. Go to **[Google Analytics](https://analytics.google.com/)** and sign in with **`smraman@gmail.com`** (see [team reference](#who-owns-google-analytics-team-reference) above).
2. If prompted to create an **Account**, use **Account name:** **`M3Pivot`** (see table above).
3. **Admin** (gear, bottom left) → **Create** → **Property** (or finish the setup wizard).
4. Name the **Property** (e.g. `M3Pivot website`).
5. Choose timezone and currency.
6. Under **Data collection**, create a **Web** data stream:
   - **Website URL:** `https://www.m3pivot.com`
   - **Stream name:** e.g. `M3Pivot production`
7. After creating the stream, open it and copy the **Measurement ID** — it looks like **`G-XXXXXXXXXX`**.

### Put the ID in the site

1. Open **`analytics.js`** in this repo.
2. Set:
   ```js
   var GA4_MEASUREMENT_ID = "G-XXXXXXXXXX"; // your real ID
   ```
3. Commit and push. After GitHub Pages deploys, traffic will start flowing (allow **24–48 hours** for reports to feel “full”; **Realtime** works within minutes).

### Where to view GA4 data

| What you want | Where in GA4 |
|---------------|----------------|
| **Right now — is it working?** | **Reports** → **Realtime** — open your site in another tab and you should see **1 user** (you). |
| Traffic over time | **Reports** → **Acquisition** → **Traffic acquisition** |
| Pages viewed | **Reports** → **Engagement** → **Pages and screens** |
| Where users come from | **Reports** → **Acquisition** |

**Tip:** Link **[Google Search Console](https://search.google.com/search-console)** to the same property (Admin → Search Console links) to see search queries alongside GA.

---

## 2. Microsoft Clarity

### Create the project

1. Go to **[Microsoft Clarity](https://clarity.microsoft.com/)** and sign in (Microsoft account).
2. **New project** → name it (e.g. `M3Pivot`).
3. Enter site URL: **`https://www.m3pivot.com`**
4. Accept terms and create. Copy the **Project ID** (short alphanumeric string shown in the install snippet).

### Put the ID in the site

1. Open **`analytics.js`**.
2. Set:
   ```js
   var CLARITY_PROJECT_ID = "your_project_id_here";
   ```
3. Commit and push.

### Where to view Clarity data

| What you want | Where in Clarity |
|---------------|-------------------|
| **Dashboard** | Overview of sessions, dead clicks, scroll depth |
| **Recordings** | Replay individual visitor sessions (masking available in project settings) |
| **Heatmaps** | Click / scroll heatmaps per URL |

Data can take **a few hours** to appear after first traffic; recordings need enough sessions on a given page.

---

## 3. Verify both are firing

1. Deploy **`analytics.js`** with both IDs set.
2. Open **`https://www.m3pivot.com`** in a normal window (not only localhost — production URL matters for stream filters).
3. **GA4:** **Reports** → **Realtime** — you should see activity.
4. **Clarity:** **Dashboard** — session count should increase; **Recordings** may lag slightly.
5. In the browser, **DevTools** → **Network**:
   - Filter `google-analytics` / `googletagmanager` — GA requests.
   - Filter `clarity` — Clarity script and beacons.

---

## 4. Learning notes (GA vs Clarity)

| | **GA4** | **Clarity** |
|--|---------|-------------|
| **Strength** | Audiences, conversions, funnels, ads linking, long-term trends | Heatmaps, session replay, frustration signals (rage/dead clicks) |
| **Privacy** | Often needs cookie consent in EU/UK; configure IP anonymization (already set in `analytics.js`) | Recordings capture the page; review Clarity masking settings |
| **Good for** | “How many people, from where, which pages?” | “What did they actually do on the page?” |

You can keep both while learning; later you might rely on one more depending on compliance and needs.

---

## 5. Optional: disable one tool

Set its variable back to `""` in **`analytics.js`** and redeploy. That script will not load.

---

## 6. IDs in Git — are they secret?

**No.** Measurement ID and Clarity project ID appear in the browser anyway. Still avoid committing personal notes or API keys in the same file.

If you prefer not to commit real IDs, you could keep them empty in the repo and inject at build time — for a static GitHub Pages site, most teams commit **`analytics.js`** with IDs filled in.
