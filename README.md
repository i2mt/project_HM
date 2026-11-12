# Project HM — GitHub Pages landing page

A responsive, single-page invitation with a twilight sky, a subtle red-thread motif, a Persian code label, and a reveal step for the Narcissu link.

## Hosting

This project uses **GitHub Pages only**. It does not require Cloudflare, a Worker, KV, a backend, or external access-control services.

## Configure the access gate

Open `script.js` and replace:

```js
const ACCESS_CODE = "REPLACE_WITH_A_RANDOM_10_DIGIT_CODE";
```

with a separate, random 10-digit code that is **not** anyone's national ID, account number, or other personal identifier.

The Narcissu destination is currently set to:

`https://i2mt.github.io/Narcissu/`

Change `GAME_URL` in `script.js` only if the game's published address changes.

### Important limitation

GitHub Pages is static hosting. The access code and destination URL are included in public client-side JavaScript and can be discovered by inspecting the page source or browser files. This gate is only a courtesy screen that keeps the link out of the visible page until the code is entered; it is **not secure authentication** and cannot prevent someone from sharing the link.

Do not use a real national ID or any sensitive personal information as the code.

## Privacy

The page does not intentionally record page visits, successful entries, IP addresses, location, device identifiers, or fingerprints. GitHub and network providers may independently process standard hosting/request metadata under their own policies.

## Files

- `index.html` — page structure and copy
- `style.css` — responsive visual design
- `script.js` — local code check and link reveal

## Publish with GitHub Pages

In the repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`.
4. Save and wait for GitHub Pages to publish.

## Test

- Check the page on an iPhone-sized viewport in portrait.
- Try a wrong 10-digit code and confirm the error appears.
- Try the configured code and confirm the Narcissu link appears.
- Open the revealed link and confirm it loads the game.
