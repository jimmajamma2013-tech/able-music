# ABLE — PWA / Installability: Final Review
**Created: 2026-03-16 | Updated: 2026-03-16 | Score: 8.5/10 spec-complete**

---

## Summary verdict

ABLE has no PWA infrastructure today. This is a meaningful gap for fan.html specifically — the page designed for returning fans who want ABLE one tap away. Without a manifest and service worker, that experience does not exist.

The good news: PWA implementation is well-understood, entirely static (no backend needed for P0+P1), and the ABLE design system is already dark-themed and full-bleed — it will look excellent as a home screen app.

---

## Why this matters for ABLE

fan.html's core premise is that fans return to it the way they used to open Instagram. That only works if it is genuinely easy to return — which means home screen presence and offline load speed. Without PWA, ABLE is a website fans vaguely remember the URL of. With PWA, it is an app icon on their home screen that they open as instinctively as Spotify.

The install prompt after 3 visits is the right moment. By then the fan has signed up, seen their followed artists, and established that fan.html is worth returning to. A quiet "Add ABLE to your home screen" is a natural next step, not an interruption.

---

## Score milestones

**After manifest + service worker implemented = 7/10**

The manifest and `<link rel="manifest">` tag satisfy Chrome's installability criteria. The service worker enables offline use. Together they take ABLE from "website" to "installable web app" — the structural change. Score is 7 rather than 8.5 because the install prompt is not yet built (fans cannot be prompted to install) and iOS has not been tested.

**After offline support + install prompt = 8.5/10**

The install prompt (shown after 3 visits, iOS variant included) completes the fan install flow. Offline support (fan.html serves from cache, offline banner shows) means fans who add ABLE to their home screen get a native-feeling experience even on a poor connection. At 8.5/10 the PWA experience is complete for the current phase.

**After 60fps on iOS confirmed = 9/10**

iOS has historically been the most divergent platform for PWA behaviour. Status bar rendering, service worker scope, Add to Home Screen icon rendering — all require physical device testing to confirm. Lighthouse 100 on Chrome desktop does not guarantee a correct iOS experience. The jump from 8.5 to 9 is real-device QA, not code.

---

## What 8.5/10 means

Spec-complete 8.5/10:
- manifest.json present, valid, all icons resolved
- iOS meta tags on fan.html and able-v7.html
- Service worker registered on fan.html and able-v7.html
- Offline fan.html loads from cache with offline indicator
- Add to Home Screen prompt on fan.html after visit 3
- iOS Safari install hint (share sheet instruction) after visit 3
- Install accepted → confirmation toast, prompt never shown again

At 8.5/10 the PWA experience is complete for the current phase. Fans can install ABLE, use it offline, and it looks and feels like a native app.

---

## What stops it reaching 10

1. **Lighthouse PWA audit at 100.** This is a checklist — each item has a specific fix. Getting from "valid PWA" to "Lighthouse 100" typically takes one pass of audit + fix. The biggest gaps tend to be: maskable icon format, valid `start_url` reachable, service worker correctly scoped.

2. **Real iOS + Android testing.** The iOS install experience has historically been the most divergent from spec. Testing on physical hardware is non-negotiable for a confident score.

3. **Push notifications.** End-to-end push notification delivery is the feature that makes a PWA feel like a native app to the fan. It requires Supabase backend and careful opt-in design. This is a Phase 2 feature — not needed for launch, but the spec is ready when it is.

---

## Scores after P0 + P1 complete

| Dimension | Before | After manifest + SW | After install prompt + offline |
|---|---|---|---|
| Web manifest | 0/10 | 9/10 | 9/10 |
| Service worker | 0/10 | 8/10 | 8/10 |
| Add to home screen prompt | 1/10 | 3/10 | 9/10 |
| Offline experience | 1/10 | 8/10 | 8/10 |
| iOS specifics | 1/10 | 7/10 | 9/10 |
| Performance impact | N/A | positive | positive |
| **Average** | **0.6/10** | **7/10** | **8.6/10 → 8.5/10** |

---

## Implementation order

1. Export ABLE logo as icon-192.png and icon-512.png (maskable, square) — prerequisite for manifest
2. Create manifest.json (5 min)
3. Add `<link rel="manifest">` to fan.html, able-v7.html, landing.html (5 min)
4. Add iOS meta tags to fan.html (10 min) → **P0 complete (30 min)**
5. Add iOS meta tags to able-v7.html (5 min)
6. Create sw.js (30 min — paste from PATH-TO-10.md P1.2)
7. Add service worker registration to fan.html and able-v7.html (5 min)
8. Add offline indicator to fan.html (30 min)
9. Add to Home Screen prompt in fan.html (1 hr)
10. iOS install hint in fan.html (30 min)

**Total: ~3.5 hours + icon export time**

The biggest hidden dependency is the ABLE icon in the right format. The `able-logo-instagram.svg` exists in the project root — but it needs to be adapted to a square format suitable for a home screen icon. The logo needs a background square at `#0d0e1a` to ensure it looks intentional on both light and dark home screens. Maskable icons place their core content in the central 80% circle — check the logo fits within that safe zone.

---

## Cross-references

- SPEC.md — complete implementation code for all PWA components
- ANALYSIS.md — full audit of current PWA state across 6 dimensions
- PATH-TO-10.md — copy-paste implementation guide
- `able-logo-instagram.svg` — source asset for icon export
- `docs/systems/error-states/PATH-TO-10.md` — P2.1 offline mode (service worker cache of profile)
