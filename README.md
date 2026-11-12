# Project HM — private Narcissu landing page

A responsive, single-page invitation with a twilight sky, a subtle red-thread motif, a Persian code label, and a reveal step for the Narcissu link.

## Important privacy note

The field label is `کد ملی` because that is the wording requested for the page. **Do not use anyone's actual national ID as the credential.** Use a separate, random 10-digit access code. The credential is stored as a Cloudflare Worker secret and is not committed to this repository or sent to the browser as an expected value.

The page records only:
- a page-open event;
- a successful code-entry event;
- the event timestamp.

It does not intentionally store IP addresses, location, device identifiers, or fingerprints. Hosting/network providers may independently process standard request metadata.

## Files

- `index.html` — page structure and copy
- `style.css` — responsive visual design
- `script.js` — form behavior; contains only the Worker endpoint placeholder
- `worker.js` — server-side validation and optional timestamp-only KV logging

## Setup

### 1. Create a Cloudflare Worker

Create a Worker and paste the contents of `worker.js`.

Add these Worker variables/secrets:
- `ACCESS_CODE` — a separate 10-digit access code. Add it as a **secret**, not a plain variable.
- `GAME_URL` — the full HTTPS URL of the Narcissu game.

Create a Cloudflare KV namespace and bind it to the Worker as `EVENTS`.

### 2. Restrict CORS

In `worker.js`, replace the wildcard `Access-Control-Allow-Origin` value with the exact GitHub Pages origin, for example:

`https://i2mt.github.io`

If using a custom domain, use that exact origin instead.

### 3. Connect the page to the Worker

After deployment, copy the Worker URL into `WORKER_URL` in `script.js`.

### 4. Publish with GitHub Pages

Push these files to the root of the `project_HM` repository. In GitHub:
- open **Settings → Pages**;
- choose **Deploy from a branch**;
- select `main` and `/ (root)`;
- save and wait for deployment.

## Testing checklist

- Test the layout at an iPhone-sized viewport in portrait.
- Try an invalid code: the page should show a neutral error.
- Try the configured code: the Narcissu link should appear.
- Check the Worker KV namespace: only event type and timestamp should be present.
- Confirm the Worker URL is configured and CORS is restricted before sharing the page.

## Notes

This is a lightweight access gate, not a full authentication system. Anyone who receives the revealed game URL can share it. The gate keeps the link out of the landing-page HTML and public repository source; it cannot prevent an authorized visitor from copying the link.
