# Dimension J3 — Service Worker Cache
**Category:** Launch Readiness & Cross-Page Coherence
**Phase:** 10 (Launch)
**Status:** Not started

SW cache version bumped. HTML pages use network-first. Static assets use cache-first. Offline fallback shows the correct page, not a browser error. Tested by toggling airplane mode. Full compliance means fans who visit an artist profile while offline (e.g. at a gig with no signal) see the last-cached version of the profile rather than a browser "No internet" screen. It also means that when ABLE ships updates, old cached HTML does not serve stale JS that breaks against new data schemas — which is a silent, hard-to-debug failure mode that has historically broken single-file apps like this one.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Bump the `CACHE_NAME` constant in `sw.js` — stale cache version means users continue serving the old HTML after a deployment | NET | 5 | 1 | H | 1 |
| 2 | Confirm `sw.js` registration script calls `registration.update()` on every page load to force SW update check | ALL | 5 | 1 | H | 1 |
| 3 | Confirm `able-v7.html` is served with a network-first strategy — fans should always receive the latest profile data | V8 | 5 | 2 | H | 1 |
| 4 | Confirm `admin.html` is served with a network-first strategy — dashboard reads live localStorage and must not serve stale shell | ADM | 5 | 2 | H | 1 |
| 5 | Confirm `start.html` is served with a network-first strategy — onboarding must not run against a cached outdated wizard | STR | 5 | 2 | H | 1 |
| 6 | Confirm `landing.html` is served with a network-first strategy — marketing copy and pricing must not be stale | LND | 4 | 2 | M | 1 |
| 7 | Confirm CSS files are served with cache-first strategy — they change only on deployment, which bumps the cache version | ALL | 4 | 2 | M | 2 |
| 8 | Confirm JS files are served with cache-first strategy — same rationale as CSS | ALL | 4 | 2 | M | 2 |
| 9 | Confirm font files are served with cache-first strategy — fonts never change, and network fetching them on every load adds latency | ALL | 3 | 2 | L | 2 |
| 10 | Confirm icon files (192px, 512px, apple-touch) are served with cache-first strategy | ALL | 3 | 1 | L | 3 |
| 11 | Confirm `manifest.json` is served with network-first strategy — a cached manifest can prevent install prompt updates | ALL | 4 | 1 | M | 2 |
| 12 | Create an offline fallback page `offline.html` that shows the ABLE brand and a message: "You're offline. This artist's page will load when you're back." | ALL | 5 | 2 | H | 1 |
| 13 | Confirm the offline fallback page is pre-cached during SW install — it must be available before the user ever goes offline | NET | 5 | 1 | H | 1 |
| 14 | Confirm the SW `fetch` handler returns the offline fallback for navigation requests when the network fails | NET | 5 | 2 | H | 1 |
| 15 | Test offline fallback by loading able-v7.html, toggling airplane mode, and refreshing — confirm `offline.html` appears, not a browser error screen | V8 | 5 | 1 | H | 1 |
| 16 | Test offline fallback on iOS Safari — iOS SW support is limited; confirm the offline page still shows | V8 | 4 | 2 | M | 2 |
| 17 | Test offline fallback on Chrome Android — confirm correct behaviour on the target platform | V8 | 4 | 2 | M | 2 |
| 18 | Confirm the SW `install` event calls `self.skipWaiting()` so the new SW activates immediately after being installed | NET | 4 | 1 | M | 2 |
| 19 | Confirm the SW `activate` event calls `clients.claim()` so the new SW takes control of all open tabs immediately | NET | 4 | 1 | M | 2 |
| 20 | Confirm the SW `activate` event deletes all caches whose names do not match the current `CACHE_NAME` | NET | 5 | 2 | H | 1 |
| 21 | Confirm the list of files pre-cached in SW `install` includes all four active HTML pages | NET | 4 | 2 | M | 2 |
| 22 | Confirm the pre-cache list does not include files that no longer exist — a single 404 in the pre-cache list causes the entire SW install to fail | NET | 5 | 1 | H | 1 |
| 23 | Remove any references to `able-v3.html`, `able-v4.html`, `able-v5.html`, `able-v6.html` from the SW pre-cache list | NET | 4 | 1 | M | 1 |
| 24 | Confirm the SW does not attempt to cache cross-origin requests (Google Fonts, Supabase API, Resend) — this causes CORS errors | NET | 4 | 1 | M | 2 |
| 25 | Add a cross-origin exclusion guard in the SW `fetch` handler: `if (!event.request.url.startsWith(self.location.origin)) return;` | NET | 4 | 1 | M | 2 |
| 26 | Confirm the SW does not cache POST requests — caching mutations is incorrect | NET | 4 | 1 | M | 2 |
| 27 | Confirm the SW does not cache Netlify function responses — these must always be live | NET | 4 | 1 | M | 2 |
| 28 | Add a request method guard: `if (event.request.method !== 'GET') return;` before any caching logic | NET | 4 | 1 | M | 2 |
| 29 | Confirm the SW handles `opaque` responses (CORS-blocked) correctly — do not store them in the cache as they have status 0 | NET | 3 | 2 | L | 3 |
| 30 | Confirm the SW cache size does not grow unboundedly — add a cache size limit or LRU eviction for runtime cache entries | NET | 3 | 3 | L | 4 |
| 31 | Run Chrome DevTools Application > Service Workers panel — confirm the SW status is "Activated and is running" not "Waiting to activate" | NET | 5 | 1 | H | 1 |
| 32 | Run Chrome DevTools Application > Cache Storage panel — confirm the cache contains the expected files | NET | 4 | 1 | M | 2 |
| 33 | Confirm the SW version string in `sw.js` comments matches the `CACHE_NAME` constant — easier debugging | NET | 2 | 1 | L | 5 |
| 34 | Add a console log in the SW `install` event that prints the cache name and list of pre-cached URLs — for debugging only, remove before final launch | NET | 2 | 1 | L | 5 |
| 35 | Confirm there are no JS syntax errors in `sw.js` — a syntax error silently prevents the SW from registering | NET | 5 | 1 | H | 1 |
| 36 | Run `node -e "require('fs').readFileSync('sw.js', 'utf8')"` to confirm `sw.js` is valid JS | NET | 4 | 1 | M | 1 |
| 37 | Confirm the SW is scoped correctly: it must be registered at `/sw.js`, not `/js/sw.js` or a subdirectory | NET | 4 | 1 | M | 2 |
| 38 | Confirm Netlify serves `sw.js` with `Cache-Control: no-cache` — a cached SW file prevents updates from deploying | NET | 5 | 1 | H | 1 |
| 39 | Add `sw.js` to Netlify `_headers` file with `Cache-Control: no-cache, no-store` | NET | 5 | 1 | H | 1 |
| 40 | Confirm Netlify serves all active HTML files with `Cache-Control: no-cache` — HTML must always be fresh | NET | 5 | 1 | H | 1 |
| 41 | Test the cache-busting cycle: deploy a change to able-v7.html, open the installed app, and confirm the new version is shown within one page load | V8 | 5 | 2 | H | 1 |
| 42 | Confirm `offline.html` does not reference any external resources that won't be available offline | NET | 4 | 1 | M | 2 |
| 43 | Confirm `offline.html` uses the ABLE design tokens and matches the visual style of the app | NET | 3 | 2 | L | 3 |
| 44 | Confirm the offline fallback message uses ABLE copy voice — not "Connection error" but something intentional | NET | 3 | 1 | L | 3 |
| 45 | Confirm the SW does not use `Cache.addAll` with a URL list derived from dynamic content — only static filenames | NET | 3 | 1 | L | 3 |
| 46 | Confirm `CACHE_NAME` follows a versioned naming convention like `able-v8-shell-v3` so it's easy to reason about in DevTools | NET | 3 | 1 | L | 3 |
| 47 | Confirm the stale-while-revalidate strategy is used for Google Fonts CSS (not network-first) — avoids blocking render | ALL | 3 | 2 | L | 3 |
| 48 | Confirm the SW does not cache the Supabase anon key URL or any auth token | NET | 5 | 1 | H | 1 |
| 49 | Confirm there is no `sw.js` cached from a previous version still active on any test device before launch | NET | 4 | 1 | M | 2 |
| 50 | Unregister all existing service workers in DevTools before final pre-launch testing to simulate a clean first install | NET | 4 | 1 | M | 2 |
| 51 | Confirm the pre-cache list references versioned filenames or a hash if any shared assets (e.g. `shared/style.css`) are used | NET | 4 | 2 | M | 2 |
| 52 | Confirm the SW handles a network timeout gracefully — if a network-first request hangs > 3 seconds, fall back to cache | NET | 3 | 3 | L | 4 |
| 53 | Implement a 3-second network timeout for navigation requests using `Promise.race` with a `setTimeout` rejection | NET | 3 | 3 | L | 4 |
| 54 | Confirm the SW activation does not cause the page to reload unexpectedly — `clients.claim()` can trigger a reload in some browsers | NET | 3 | 2 | L | 3 |
| 55 | Confirm the SW update cycle has been tested with two consecutive deployments to Netlify — no stuck SW state | NET | 4 | 2 | M | 2 |
| 56 | Confirm `sw.js` is referenced in the `manifest.json` `serviceworker` field if that field is supported | NET | 2 | 1 | L | 5 |
| 57 | Confirm `sw.js` has no `importScripts` calls for external URLs — external scripts can fail and break the SW | NET | 3 | 1 | L | 3 |
| 58 | Add a `LAST_UPDATED` constant to `sw.js` with the ISO date of the last edit — aids debugging in production | NET | 2 | 1 | L | 5 |
| 59 | Confirm the background sync API is not used in the current SW — it is not supported on iOS and adding it can cause errors | NET | 3 | 1 | L | 3 |
| 60 | Confirm periodic background sync is not registered — it requires additional permissions and is unsupported on iOS | NET | 3 | 1 | L | 3 |
| 61 | Confirm push notification logic is not in `sw.js` — push is Phase 2 and the current SW must stay simple | NET | 3 | 1 | L | 3 |
| 62 | Confirm the SW pre-cache does not include `index.html` — that file is a redirect-only stub | NET | 3 | 1 | L | 2 |
| 63 | Confirm the SW pre-cache does not include `_archive/` files | NET | 3 | 1 | L | 2 |
| 64 | Confirm the SW pre-cache does not include `privacy.html` or `terms.html` — static legal pages don't need offline support | NET | 2 | 1 | L | 5 |
| 65 | Test the SW on a slow 2G connection in Chrome DevTools — confirm network-first falls through to cache without a white screen | ALL | 3 | 2 | L | 3 |
| 66 | Confirm the cache-first response for CSS and JS sets correct MIME type headers | NET | 3 | 1 | L | 3 |
| 67 | Confirm the SW does not intercept requests to `resend.com` or `supabase.co` — external API calls must go direct | NET | 4 | 1 | M | 2 |
| 68 | Confirm the SW does not intercept requests to `fonts.googleapis.com` or `fonts.gstatic.com` | NET | 3 | 1 | L | 3 |
| 69 | Add a separate runtime cache for Google Fonts with stale-while-revalidate and a 30-day max age | NET | 3 | 2 | L | 4 |
| 70 | Confirm the SW file is linted for `no-console` in production build — console logs in SW spam the browser console for every fan | NET | 2 | 1 | L | 5 |
| 71 | Confirm the SW installation is tested from an incognito window — confirms clean-state install path | NET | 3 | 1 | L | 3 |
| 72 | Confirm the SW does not cache the `/.netlify/functions/` path prefix | NET | 4 | 1 | M | 2 |
| 73 | Confirm that if the SW cache returns a stale response for HTML, the page still shows a meaningful UI (not a blank) | ALL | 4 | 2 | M | 2 |
| 74 | Confirm that SW errors (e.g. a failed cache open) are caught and logged without crashing the SW thread | NET | 4 | 2 | M | 2 |
| 75 | Add a `self.addEventListener('error', ...)` handler in `sw.js` to surface uncaught SW errors | NET | 3 | 2 | L | 3 |
| 76 | Confirm the SW `fetch` handler does not await inside a loop — async inside SW event handlers can cause event lifetime issues | NET | 3 | 2 | L | 3 |
| 77 | Confirm `event.respondWith` is called synchronously, not after an `await` — the spec requires synchronous invocation | NET | 4 | 2 | M | 2 |
| 78 | Confirm `event.waitUntil` is used correctly in `install` and `activate` events to extend the event lifetime | NET | 4 | 1 | M | 2 |
| 79 | Test the SW on Firefox — confirm it registers and pre-caches correctly (Firefox has full SW support) | ALL | 3 | 2 | L | 4 |
| 80 | Test the SW on Safari macOS 17 — confirm registration and basic caching works | ALL | 3 | 2 | L | 4 |
| 81 | Confirm the `CACHE_NAME` constant is the single source of truth — do not hardcode the cache name in multiple places | NET | 3 | 1 | L | 3 |
| 82 | Confirm the SW version is included in the Netlify deployment notes so future developers know when it was last updated | DOC | 2 | 1 | L | 5 |
| 83 | Document the SW caching strategy (which strategies apply to which resource types) in `docs/systems/pwa/SPEC.md` | DOC | 3 | 2 | L | 4 |
| 84 | Document the expected offline behaviour for each page in `docs/systems/pwa/SPEC.md` | DOC | 3 | 2 | L | 4 |
| 85 | Confirm that when a new SW activates and takes control, the page does not flicker or re-render unnecessarily | ALL | 3 | 2 | L | 3 |
| 86 | Confirm the offline fallback page includes a retry button that calls `window.location.reload()` | NET | 3 | 1 | L | 3 |
| 87 | Confirm the offline fallback page does not have any broken image references | NET | 3 | 1 | L | 3 |
| 88 | Confirm the offline fallback page file size is under 20KB — it must load instantly from the pre-cache | NET | 3 | 1 | L | 3 |
| 89 | Confirm there is no race condition between SW registration and the page's first fetch — registration must complete before the SW can intercept | NET | 3 | 2 | L | 3 |
| 90 | Confirm the SW does not attempt to respond to WebSocket upgrade requests | NET | 3 | 1 | L | 3 |
| 91 | Confirm the SW is compatible with the current Netlify headers — no CORS or CSP policy blocks SW script execution | NET | 4 | 2 | M | 2 |
| 92 | Add an `X-SW-Version` response header to cached responses for debugging — allows identification of SW version serving each request | NET | 2 | 2 | L | 6 |
| 93 | Confirm the SW is tested across two different WiFi networks — not just localhost and production | NET | 3 | 1 | L | 4 |
| 94 | Confirm a second device (not the development machine) is used for final SW testing | NET | 4 | 1 | L | 2 |
| 95 | Confirm the SW test covers the scenario where the user visits the app, goes offline, then closes and reopens — must load from cache, not show error | ALL | 4 | 2 | M | 2 |
| 96 | Confirm the SW test covers the scenario where the user is offline and navigates from able-v7.html to admin.html | ALL | 3 | 2 | L | 3 |
| 97 | Confirm the SW test covers the scenario where a deployment happens while the user has the app open — new SW must activate on next navigation | ALL | 4 | 2 | M | 2 |
| 98 | Add a user-facing "Update available" banner when a new SW is waiting — prompt the fan to refresh | ALL | 3 | 3 | L | 4 |
| 99 | Confirm `docs/systems/pwa/SPEC.md` includes a cache version change checklist for future deployments | DOC | 3 | 2 | L | 4 |
| 100 | Confirm `STATUS.md` is updated to mark J3 complete with the SW cache version number at time of verification | DOC | 2 | 1 | L | 6 |
