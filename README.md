# Brew Card — installable app (PWA)

A self-contained homebrew app: recipes, boil/mash/chill timers, water calculator,
ingredient editor, and a brew log. Now installable to your phone's home screen
with its own icon, full-screen, and **works offline**.

## Files
- `index.html` — the whole app
- `manifest.webmanifest` — app name/icon/colors
- `sw.js` — service worker (offline caching)
- `icon-192.png`, `icon-512.png`, `icon-180.png` — app icons
- `functions/`, `netlify/`, `netlify.toml` — only needed for the photo-recognition
  backend (optional; ignored by GitHub Pages)

## Put it on your phone with GitHub Pages (free)
1. Create a GitHub account, then **New repository** (e.g. `brew-card`), Public.
2. **Add file → Upload files** → drag in ALL the files above → **Commit changes**.
3. **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main`, folder `/ (root)` → **Save**.
4. Wait ~1 minute; the page shows your URL: `https://<you>.github.io/brew-card/`.
5. Open that URL in **Safari** → **Share** → **Add to Home Screen**.

You now have an app icon that opens full-screen and runs offline.
To update later: upload the new `index.html` (same name) and commit — the URL refreshes in ~1 min.
When you change the app, bump the cache name in `sw.js` (e.g. `brewcard-v2`) so phones fetch the new version.

## Photo recognition (optional)
The 📷 photo feature needs a tiny backend with an API key, which GitHub Pages can't run.
Everything else works on Pages. For the photo feature, deploy the same folder to
**Cloudflare Pages** or **Netlify** instead and set an `ANTHROPIC_API_KEY` environment
variable (the `functions/` and `netlify/` files are the proxy).
