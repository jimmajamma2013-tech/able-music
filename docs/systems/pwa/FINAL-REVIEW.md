# ABLE — PWA / Installability: Final Review
**Created: 2026-03-16 | Score: 8.5/10 spec-complete**

---

## Summary verdict

ABLE has no PWA infrastructure today. This is a meaningful gap for fan.html specifically — the page that is designed for returning fans who want ABLE "one tap away." Without a manifest and service worker, that experience doesn't exist.

The good news: PWA implementation is well-understood, entirely static (no backend needed for P0+P1), and the ABLE design system is already dark-themed and full-bleed — it will look excellent as a home screen app.

---

## Why this matters for ABLE

fan.html's core premise is that fans return to it the way they used to open Instagram. That only works if it's genuinely easy to return — which means home screen presence + offline load speed. Without PWA, ABLE is a website fans vaguely remember the URL of. With PWA, it's an app icon on their home screen that they open as instinctively as Spotify.

The install prompt after 3 visits is the right moment. By then the fan has signed up, seen their followed artists, and established that fan.html is worth returning to. A quiet "Add ABLE to your home screen" is a natural next step, not an interruption.

---

## What 8.5/10 means

Spec-complete 8.5/10:
- manifest.json present, valid, all icons resolved
- iOS meta tags on fan.html and able-v7.html
- Service worker registered on fan.html and able-v7.html
- Offline fan.html loads from cache with offline indicator
- Add to home screen prompt on fan.html after visit 3
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

| Dimension | Before | After P0+P1 |
|---|---|---|
| Web manifest | 0/10 | 9/10 |
| Service worker | 0/10 | 8/10 |
| Add to home screen prompt | 1/10 | 9/10 |
| Offline experience | 1/10 | 8/10 |
| iOS specifics | 1/10 | 9/10 |
| Performance impact | N/A | +ve |
| **Average** | **0.6/10** | **8.6/10** |

---

## Implementation order

1. Export ABLE logo as icon-192.png and icon-512.png (maskable, square) — prerequisite
2. Create manifest.json (30 min)
3. Add iOS meta tags to fan.html (10 min)
4. Add iOS meta tags to able-v7.html (5 min)
5. Create sw.js (1.5 hrs)
6. Register service worker in fan.html and able-v7.html (15 min)
7. Add to home screen prompt in fan.html (1 hr)
8. iOS install hint in fan.html (30 min)
9. Offline banner in fan.html (30 min)

**Total: ~4 hours + icon export time**

The biggest hidden dependency is the ABLE icon in the right format. The `able-logo-instagram.svg` exists in the project root — but it needs to be adapted to a square format suitable for a home screen icon (consider: does the current logo work as a 192×192 square? Or does it need a background circle/square added?).

---

## Cross-references

- SPEC.md — complete implementation code for all PWA components
- ANALYSIS.md — full audit of current PWA state across 6 dimensions
- PATH-TO-10.md — prioritised implementation tasks with test criteria
- `able-logo-instagram.svg` — source asset for icon export
- `docs/systems/error-states/PATH-TO-10.md` — P2.1 offline mode (service worker cache of profile)
