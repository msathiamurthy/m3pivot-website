# Formspree — contact forms on www.m3pivot.com

Contact forms submit to **[Formspree](https://formspree.io/)** (hosted form backend). No server code is required on GitHub Pages.

---

## Account (team reference)

| | |
|--|--|
| **Formspree login** | **`muthu.sathiamurthy@gmail.com`** |
| **Plan** | **Free** — sufficient for light traffic; **about 50 submissions per month** on the free tier (limits can change — check **[Formspree pricing](https://formspree.io/plans)**). |

Create new forms or manage submissions by signing in at **[formspree.io](https://formspree.io/)** with that Google account.

---

## Form in this repo

| | |
|--|--|
| **Endpoint** | `https://formspree.io/f/mojknrgk` |
| **Used on** | **`contact.html`** (repo root) |

The form uses:

- `method="POST"`
- `data-formspree="true"` (enables the inline `fetch` + thank-you behavior)

### Fields sent to Formspree

| HTML `name` | Purpose |
|-------------|---------|
| `full_name` | Visitor’s name |
| `email` | Reply-to email |
| `role` | `startup-founder` or `investor` |
| `message` | Free text |

---

## Changing the Formspree form

1. In Formspree (logged in as **`muthu.sathiamurthy@gmail.com`**), create a form or copy the new form ID from the dashboard.
2. Update the `action` URL in **`contact.html`** — search for `formspree.io/f/`.
3. In the Formspree UI, set **redirect** / **notifications** as needed (optional; the site already shows an on-page thank-you state after a successful `fetch`).

---

## Behavior (client-side)

- Submits via **`fetch`** to the `action` URL with `Accept: application/json`.
- **`sessionStorage`** key `m3pivot_form_submitted` prevents duplicate submissions in the same browser session after a success.
- Errors show in **`.form-status`**; success hides the form and shows **`.submission-message`**.

---

## Related files

- **`contact.html`** — contact page form + script block
- **`M3Pivot_Website_Content.txt`** — also references the Formspree URL (keep in sync if the endpoint changes)
