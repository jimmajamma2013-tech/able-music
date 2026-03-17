# ABLE — PWA / Installability: Analysis
**Created: 2026-03-16 | Score: 2/10**

> Scored across 6 dimensions. The current build has no PWA infrastructure. This is the baseline audit before the spec is applied.

---

## Scoring rubric
- **0**: Not implemented, no consideration
- **3**: Partial implementation or documented intention
- **5**: Basic implementation present, incomplete
- **7**: Fully implemented, not tested
- **9**: Fully implemented and tested in devtools
- **10**: Fully implemented, Lighthouse PWA 100, tested on real iOS + Android devices

---

## Dimension 1 — Web manifest

**Score: 0/10**

No `manifest.json` exists in the project root. No `<link rel="manifest">` in any page's `<head>`. Chrome, Safari, and Firefox will not offer "Add to Home Screen" for any ABLE page in its current state.

The lack of a manifest means:
- No custom app name (device shows the URL instead)
- No custom icon (device shows a screenshot)
- No theme colour (browser chrome uses system default)
- No `start_url` (install opens the exact URL visited, not the intended entry point)
- No `display: standalone` (browser chrome always shown, even if "added")

This is the most visible and most fixable gap. manifest.json is a single static file. It takes 20 minutes to implement correctly.

---

## Dimension 2 — Service worker

**Score: 0/10**

No `sw.js` exists. No service worker is registered in any page. This means:
- No offline capability — without a connection, any ABLE page shows the browser's generic "no connection" page
- No background sync
- No push notification infrastructure (even if we wanted it)
- No cache-first performance strategy for static assets

The irony: able-v7.html already works from localStorage data when online, so an offline-first service worker would make the fan experience genuinely good offline. The data is already there — we just need the service worker to intercept the initial page request.

---

## Dimension 3 — Add to home screen prompt

**Score: 1/10**

No prompt exists. The `beforeinstallprompt` event is not captured anywhere. No UI element invites fans to install.

Score is 1 (not 0) because the design clearly contemplates fan.html as a returning-user experience — "saved to home screen" is mentioned in CROSS_PAGE_JOURNEYS.md. The intent exists; the mechanism does not.

Current situation: fans who want to add ABLE to their home screen can do so via their browser's "Add to Home Screen" menu item, but:
- They have to discover this themselves
- The experience is unbranded (no custom icon, no custom name without manifest)
- iOS Safari does not show the native prompt at all — requires manual action from the share sheet

A well-timed, quiet prompt after a fan's 3rd visit would meaningfully increase retention. This is one of the highest-leverage PWA features for fan.html specifically.

---

## Dimension 4 — Offline experience

**Score: 1/10**

No offline experience is designed or implemented. If a fan opens fan.html without a connection:
- They see the browser's generic offline page
- They have no information about the artists they follow
- They cannot take any action

Score is 1 (not 0) because the localStorage architecture means all the data needed for an offline fan.html experience already exists locally. The service worker is the only missing piece.

Offline fan experience (what it should be):
- fan.html loads from cache
- Shows followed artists from `fan_following` (localStorage)
- Shows last-known today strip
- Shows "offline" indicator at top: "No connection — showing your last update."
- No functionality is lost for existing followed data

Note: able-v7.html is even simpler — all profile data is in localStorage. An offline artist profile page is trivially achievable with a service worker.

---

## Dimension 5 — iOS specifics

**Score: 1/10**

None of the iOS-specific PWA meta tags are present in any page. On iOS Safari:
- No `apple-mobile-web-app-capable` → "Add to Home Screen" creates a bookmark, not a standalone app
- No `apple-mobile-web-app-status-bar-style` → status bar defaults to white on light pages, looks wrong
- No `apple-touch-icon` → device uses a screenshot of the page as the home screen icon (not branded)

iOS is the primary platform for ABLE's target users (music industry skews heavily iOS). PWA on iOS has been progressively improving since iOS 16.4 (service workers, Web Push now supported). ABLE should be a model PWA on iOS, not an afterthought.

iOS-specific considerations:
- `apple-mobile-web-app-capable: yes` required for standalone display on iOS < 16.4
- Status bar style: `black-translucent` allows the page content to extend behind the status bar (important for full-bleed artwork on able-v7.html)
- Touch icon: must be provided at 192×192 minimum; iOS will not use the manifest icon

---

## Dimension 6 — Performance impact of PWA setup

**Score: N/A (no PWA setup to measure)**

Once implemented, the performance impact of manifest + service worker should be:
- manifest.json: negligible (small JSON file, fetched once, cached)
- Service worker registration: ~2ms overhead on registration, zero on subsequent loads
- Cache-first strategy: faster on repeat visits (no network round-trip for static assets)

Net performance impact of correct PWA implementation: **positive**, particularly for fans on slow connections or repeat visits.

Risk: a poorly configured service worker (stale cache not invalidated) can cause stale content to be served. The SPEC.md service worker strategy addresses this with a cache versioning system.

---

## Overall score: 2/10

| Dimension | Score |
|---|---|
| Web manifest | 0/10 |
| Service worker | 0/10 |
| Add to home screen prompt | 1/10 |
| Offline experience | 1/10 |
| iOS specifics | 1/10 |
| Performance impact | N/A |
| **Average** | **0.7/10** |
| **With spec-complete P0+P1** | **8.5/10** |

The gap is large but the implementation is well-understood. PWA for ABLE is mostly about fan.html — that is the page that benefits most from installability, offline support, and the home screen presence. Start there.

See SPEC.md for implementation, PATH-TO-10.md for prioritised tasks.
