# Dimension J2 — PWA Install
**Category:** Launch Readiness & Cross-Page Coherence
**Phase:** 10 (Launch)
**Status:** Not started

The PWA manifest is complete. App icons at 192px and 512px are correct dimensions and not blurry. The install prompt fires at the right moment. Installed app opens correctly. Tested on real iOS and Android. Full compliance means a fan who taps "Add to Home Screen" on their artist's profile page gets a clean, branded installed experience: correct icon, correct splash, opens to the right URL, no browser chrome, correct theme colour. iOS requires Apple-specific meta tags that `manifest.json` alone does not cover — both surfaces must be correct for cross-platform install to work.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm `manifest.json` is linked from every active HTML page via `<link rel="manifest" href="/manifest.json">` | ALL | 5 | 1 | H | 1 |
| 2 | Fix `manifest.json` icons array: split `"purpose": "any maskable"` into two separate entries — one `"purpose": "any"` and one `"purpose": "maskable"` | ALL | 5 | 1 | H | 1 |
| 3 | Confirm the 192px icon file exists at the path declared in `manifest.json` — a missing file prevents install on Android | ALL | 5 | 1 | H | 1 |
| 4 | Confirm the 512px icon file exists at the path declared in `manifest.json` | ALL | 5 | 1 | H | 1 |
| 5 | Open both icon files visually — confirm they are not blurry, not pixelated, and show the ABLE logotype clearly | ALL | 4 | 1 | M | 1 |
| 6 | Confirm the maskable icon has sufficient safe-zone padding — the logo must be entirely within the central 80% of the canvas | ALL | 4 | 2 | M | 1 |
| 7 | Add `apple-touch-icon` meta tag to every active HTML page: `<link rel="apple-touch-icon" href="/icons/icon-180.png">` | ALL | 5 | 1 | H | 1 |
| 8 | Create the 180px Apple touch icon file — iOS ignores `manifest.json` icons and uses only `apple-touch-icon` | ALL | 5 | 2 | H | 1 |
| 9 | Add `<meta name="apple-mobile-web-app-capable" content="yes">` to every active HTML page for iOS standalone mode | ALL | 5 | 1 | H | 1 |
| 10 | Add `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">` for correct iOS status bar appearance | ALL | 4 | 1 | M | 1 |
| 11 | Add `<meta name="apple-mobile-web-app-title" content="ABLE">` so iOS home screen uses the correct app name | ALL | 4 | 1 | M | 1 |
| 12 | Confirm `manifest.json` `theme_color` matches `<meta name="theme-color">` on all pages — mismatches cause a flash on install | ALL | 3 | 1 | L | 2 |
| 13 | Confirm `manifest.json` `background_color` `#0d0e1a` matches the `--color-bg` design token | ALL | 3 | 1 | L | 2 |
| 14 | Confirm `manifest.json` `start_url` has a trailing `?source=pwa` parameter for install-source attribution | ALL | 3 | 1 | L | 2 |
| 15 | Confirm `manifest.json` `scope` is set to `"/"` — prevents installed app from navigating outside ABLE | ALL | 4 | 1 | M | 2 |
| 16 | Confirm `manifest.json` `display` is `"standalone"` — removes browser chrome on Android install | ALL | 4 | 1 | M | 1 |
| 17 | Confirm `manifest.json` `orientation` is `"portrait"` — enforces portrait layout for the fan experience | ALL | 3 | 1 | L | 2 |
| 18 | Confirm `manifest.json` is served with `Content-Type: application/manifest+json` by Netlify | NET | 4 | 1 | M | 2 |
| 19 | Confirm `manifest.json` is valid JSON — run through jsonlint.com or equivalent | ALL | 5 | 1 | H | 1 |
| 20 | Test install prompt on Chrome Android (real device) — confirm the "Add to Home Screen" banner appears | ALL | 5 | 2 | M | 1 |
| 21 | Test the installed app on Android — confirm it opens to `start_url`, not the last visited URL | ALL | 4 | 2 | M | 2 |
| 22 | Test the installed app on Android — confirm the splash screen shows the correct background colour and icon | ALL | 4 | 2 | M | 2 |
| 23 | Test "Add to Home Screen" on iOS Safari 17 — confirm it saves to the home screen with the correct icon | ALL | 5 | 2 | M | 1 |
| 24 | Test the installed app on iOS — confirm it opens without Safari chrome (standalone mode) | ALL | 5 | 2 | H | 1 |
| 25 | Test the installed app on iOS — confirm navigation links within the app do not open a new Safari tab | ALL | 4 | 2 | M | 2 |
| 26 | Confirm the install prompt logic fires after meaningful engagement (e.g. fan has viewed 3 artist cards) not on first page load | V8 | 3 | 3 | L | 3 |
| 27 | Confirm the install prompt is not shown to users who have already installed the app — check `navigator.standalone` | V8 | 3 | 2 | L | 3 |
| 28 | Confirm the install prompt is not shown to users who have already dismissed it in the current session | V8 | 3 | 2 | L | 3 |
| 29 | Add a manual "Install app" CTA in the admin sidebar as a fallback trigger for the deferred install prompt | ADM | 3 | 3 | L | 3 |
| 30 | Confirm `beforeinstallprompt` event is captured and stored as a deferred prompt for later use | V8 | 3 | 2 | L | 3 |
| 31 | Confirm `appinstalled` event is logged to the analytics `able_clicks` store with `type: 'pwa_install'` | ALL | 3 | 2 | L | 3 |
| 32 | Confirm the ABLE service worker is registered in every active HTML page via `navigator.serviceWorker.register('/sw.js')` | ALL | 5 | 1 | H | 1 |
| 33 | Confirm the service worker registration is inside a feature-detect guard: `if ('serviceWorker' in navigator)` | ALL | 4 | 1 | M | 2 |
| 34 | Confirm Lighthouse PWA audit scores "Installable" on able-v7.html — run in Chrome DevTools | V8 | 5 | 1 | H | 1 |
| 35 | Confirm Lighthouse PWA audit scores "PWA Optimised" — addresses HTTPS, manifest, and icon requirements | ALL | 4 | 2 | M | 2 |
| 36 | Confirm the app is served over HTTPS in production — PWA install requires a secure origin | NET | 5 | 1 | H | 1 |
| 37 | Confirm the service worker file `sw.js` is served at the root scope (`/sw.js`), not in a subdirectory | NET | 4 | 1 | M | 1 |
| 38 | Add `<meta name="mobile-web-app-capable" content="yes">` for Chrome Android legacy support | ALL | 2 | 1 | L | 4 |
| 39 | Add iOS splash screen meta tags for iPhone 14 Pro resolution (1179×2556) | ALL | 3 | 2 | L | 4 |
| 40 | Add iOS splash screen meta tags for iPhone SE resolution (750×1334) | ALL | 3 | 2 | L | 4 |
| 41 | Create the iOS splash screen PNG files referenced in the meta tags | ALL | 3 | 3 | L | 4 |
| 42 | Confirm `manifest.json` `categories` field is set to `["music", "entertainment"]` for Play Store discoverability | ALL | 2 | 1 | L | 5 |
| 43 | Confirm `manifest.json` `lang` is set to `"en-GB"` matching the ABLE copy locale | ALL | 2 | 1 | L | 5 |
| 44 | Confirm `manifest.json` `dir` is set to `"ltr"` | ALL | 2 | 1 | L | 5 |
| 45 | Add a 384px icon for Samsung Internet compatibility — Samsung's manifest validator recommends it | ALL | 2 | 2 | L | 5 |
| 46 | Add a 96px icon for Android legacy devices | ALL | 2 | 2 | L | 5 |
| 47 | Confirm all icon files are PNG not SVG in the manifest — Safari does not support SVG manifest icons | ALL | 4 | 1 | M | 2 |
| 48 | Confirm icon files are exported at exact pixel dimensions (192×192, 512×512) — not CSS-scaled raster files | ALL | 4 | 1 | M | 2 |
| 49 | Confirm icon files are optimised (compressed) — use squoosh.app or similar; target < 50KB for 512px icon | ALL | 3 | 1 | L | 3 |
| 50 | Test install flow after clearing Chrome Android cache — confirm the prompt still fires correctly from a cold start | ALL | 3 | 2 | L | 3 |
| 51 | Confirm installed app home screen icon label reads "ABLE" not a truncated URL | ALL | 4 | 1 | M | 2 |
| 52 | Confirm the installed app does not show a loading spinner on cold launch — service worker should pre-cache the shell | ALL | 3 | 3 | L | 3 |
| 53 | Confirm the `display_override` field is not set to `"fullscreen"` — fullscreen hides the iOS status bar entirely | ALL | 3 | 1 | L | 3 |
| 54 | Confirm Android Chrome add-to-home-screen icon appears round (adaptive icon treatment via maskable icon) not square | ALL | 3 | 2 | L | 3 |
| 55 | Confirm the install prompt is A/B tested for timing — document the chosen trigger and rationale in `docs/systems/pwa/SPEC.md` | DOC | 2 | 2 | L | 5 |
| 56 | Confirm Lighthouse performance score is 90+ for able-v7.html — a slow page suppresses the install prompt on Android | V8 | 4 | 3 | M | 2 |
| 57 | Confirm the manifest `screenshots` field is populated for Android install sheet preview (min 1 screenshot at 1080×1920) | ALL | 3 | 3 | L | 4 |
| 58 | Add screenshot depicting the fan experience for the manifest `screenshots` array | ALL | 3 | 3 | L | 4 |
| 59 | Confirm `manifest.json` `shortcuts` array includes a "View my profile" shortcut for artist quick-action from Android launcher | ALL | 2 | 2 | L | 5 |
| 60 | Confirm `manifest.json` is accessible at `https://ablemusic.co/manifest.json` — no 404 in production | NET | 5 | 1 | H | 1 |
| 61 | Confirm Netlify does not cache `manifest.json` too aggressively — set `Cache-Control: no-cache` for manifest | NET | 3 | 1 | L | 3 |
| 62 | Test on Samsung Galaxy S23 (Chrome) — confirm install prompt appears and works | ALL | 3 | 2 | L | 3 |
| 63 | Test on iPad Safari — confirm "Add to Home Screen" works and icon appears correctly | ALL | 3 | 2 | L | 4 |
| 64 | Test the installed app on iOS — confirm the back-swipe gesture works to navigate within the app | ALL | 3 | 2 | L | 3 |
| 65 | Confirm that links opening external URLs (Spotify, Bandcamp) from the installed app correctly open in the browser, not within the app shell | ALL | 4 | 2 | M | 2 |
| 66 | Confirm `target="_blank"` links on V8 open in the system browser not the app's WebView | V8 | 4 | 1 | M | 2 |
| 67 | Test PWA install on Firefox for Android — confirm graceful degradation (banner not shown, but page still works) | ALL | 3 | 2 | L | 4 |
| 68 | Confirm `window.matchMedia('(display-mode: standalone)').matches` returns `true` in the installed app — used for conditional UI | ALL | 3 | 2 | L | 3 |
| 69 | Show a subtle "Open in browser" link in the installed standalone app header for users who want full browser | ALL | 2 | 3 | L | 6 |
| 70 | Confirm the ABLE icon is dark-mode adaptive — the icon should not appear washed-out on iOS dark home screen | ALL | 3 | 2 | L | 3 |
| 71 | Confirm the maskable icon safe zone is tested with the Maskable App editor (maskable.app) | ALL | 3 | 1 | L | 3 |
| 72 | Add a 1024px icon for potential future Mac Catalyst or web-app listing use | ALL | 2 | 2 | L | 6 |
| 73 | Confirm `manifest.json` `related_applications` is not set or set to empty array — prevents unwanted Play Store redirect | ALL | 3 | 1 | L | 3 |
| 74 | Confirm `manifest.json` `prefer_related_applications` is `false` — ensures the browser install prompt is shown | ALL | 4 | 1 | M | 2 |
| 75 | Confirm the install prompt dismissal is tracked: log `{ type: 'pwa_prompt_dismissed', ts }` to `able_clicks` | ALL | 2 | 2 | L | 5 |
| 76 | Confirm the install acceptance is tracked: log `{ type: 'pwa_prompt_accepted', ts }` to `able_clicks` | ALL | 2 | 2 | L | 5 |
| 77 | Confirm the 192px and 512px icons use the same artwork source — do not let them diverge | ALL | 3 | 1 | L | 3 |
| 78 | Export icon set from the canonical `able-logo-instagram.svg` source file — ensures brand alignment | ALL | 3 | 2 | L | 3 |
| 79 | Confirm the PWA spec document at `docs/systems/pwa/SPEC.md` is up to date and reflects the current manifest.json | DOC | 2 | 1 | L | 5 |
| 80 | Confirm `CONTEXT.md` lists `manifest.json` in the active files section | DOC | 2 | 1 | L | 5 |
| 81 | Test install banner timing on a 3G throttled connection — confirm it does not fire before the page is usable | ALL | 3 | 2 | L | 3 |
| 82 | Confirm the install prompt CTA copy follows the ABLE voice — not "Install App!" but something like "Stay close. Add ABLE to your home screen." | V8 | 3 | 1 | L | 3 |
| 83 | Confirm install prompt is not modal — it must not block the fan from viewing the artist page | V8 | 4 | 1 | M | 2 |
| 84 | Confirm the install prompt is dismissible with a single tap and the dismissal is respected for the session | V8 | 3 | 1 | L | 3 |
| 85 | Confirm the install prompt re-surfaces after 7 days if previously dismissed — not every session | V8 | 2 | 2 | L | 5 |
| 86 | Confirm the app renders correctly in `display: standalone` mode — check that no layout depends on the browser address bar height | ALL | 4 | 2 | M | 2 |
| 87 | Confirm `env(safe-area-inset-bottom)` is used for bottom-anchored UI in the installed app to account for iPhone home indicator | ALL | 4 | 2 | M | 2 |
| 88 | Confirm `env(safe-area-inset-top)` is used for top-anchored elements in standalone mode to account for notch | ALL | 4 | 2 | M | 2 |
| 89 | Run the Web App Manifest validator at web.dev/measure and fix any warnings | ALL | 3 | 1 | L | 3 |
| 90 | Confirm `sw.js` is not listed in `manifest.json` icons — this is a common copy-paste error | ALL | 3 | 1 | L | 3 |
| 91 | Confirm the install prompt flow is documented with screenshots in `docs/systems/pwa/SPEC.md` | DOC | 2 | 2 | L | 5 |
| 92 | Test install on Chrome desktop (Windows) — confirm the install icon appears in the omnibar | ALL | 3 | 2 | L | 4 |
| 93 | Test the installed desktop app on macOS — confirm it opens as a standalone window | ALL | 2 | 2 | L | 5 |
| 94 | Confirm the installed desktop app does not display the address bar | ALL | 3 | 1 | L | 4 |
| 95 | Confirm `manifest.json` `id` field is set to `"/"` — enables future cross-origin manifest identity | ALL | 2 | 1 | L | 5 |
| 96 | Confirm `manifest.json` `protocol_handlers` is not set unless ABLE has a custom URI scheme registered | ALL | 2 | 1 | L | 6 |
| 97 | Add a periodic sync registration in the service worker for background fan notification updates (Phase 2) | ALL | 2 | 4 | L | 6 |
| 98 | Confirm PWA install was tested by a person who was not the developer — fresh device, no prior knowledge | ALL | 4 | 1 | L | 2 |
| 99 | Document known iOS PWA limitations (no push notifications on iOS < 16.4, no background sync) in `docs/systems/pwa/SPEC.md` | DOC | 2 | 1 | L | 5 |
| 100 | Confirm `STATUS.md` is updated to mark J2 complete with the device and OS version on which install was tested | DOC | 2 | 1 | L | 6 |
