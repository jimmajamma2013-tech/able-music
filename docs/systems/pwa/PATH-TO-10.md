# ABLE — PWA / Installability: Path to 10
**Created: 2026-03-16 | Current: 2/10 | Spec-complete target: 8.5/10**

---

## P0 — Manifest + iOS meta tags

**Effort: 30 minutes**
**Impact: 2 → 5/10**

These are static file additions. No JavaScript. No service worker. Just files and `<head>` tags.

### P0.1 — Create manifest.json

Create `/manifest.json` per SPEC.md File 1. No decisions to make — the spec is complete.

Required supporting work:
- Create `/icons/` directory
- Export ABLE logo as `icon-192.png` (192×192 PNG, maskable — content in 80% safe zone circle)
- Export ABLE logo as `icon-512.png` (512×512 PNG, maskable)
- Use the existing `able-logo-instagram.svg` as source, adapt to square format

**Test (P0.1):**
- Open fan.html in Chrome
- Open DevTools → Application → Manifest
- Confirm manifest parses with no errors
- Confirm all icon paths resolve (200 OK)

---

### P0.2 — Add iOS meta tags to fan.html

Add the block from SPEC.md File 2 to fan.html `<head>`.

Also add to able-v7.html for consistency (fans may arrive directly at the artist page and add to home screen from there).

Add `env(safe-area-inset-top)` padding to fan.html body for `black-translucent` status bar.

**Test (P0.2):**
- On a real iPhone or iOS Simulator: open fan.html in Safari
- Tap Share → "Add to Home Screen"
- Confirm: app name shows "ABLE", icon shows ABLE logo (not a screenshot)
- Confirm: opens in standalone mode (no browser chrome)
- Confirm: status bar is translucent over page content

---

## P1 — Service worker + add to home screen prompt

**Effort: 3–4 hours**
**Impact: 5 → 8/10**

### P1.1 — Create and register sw.js

Create `/sw.js` per SPEC.md File 3.

Register in fan.html and able-v7.html per SPEC.md registration snippet.

**Deployment note:** Service workers require HTTPS. On local development (`file://` or `http://localhost`), they work on `localhost` only. Netlify deploy (even a preview URL) uses HTTPS — service worker will function correctly in any Netlify preview.

**Test (P1.1):**
- Open fan.html in Chrome (must be served over HTTP, not file://)
- DevTools → Application → Service Workers → confirm registered
- Load the page, then toggle Network to "Offline"
- Reload page — expect: fan.html serves from cache, not browser offline screen
- Update `CACHE_VERSION` to `'able-v2'` → reload → confirm old caches cleared

**Test matrix:**
- [ ] SW registers without errors on fan.html
- [ ] SW registers without errors on able-v7.html
- [ ] Offline reload: fan.html serves from cache
- [ ] Offline reload: able-v7.html serves from cache
- [ ] After CACHE_VERSION bump: old caches deleted, new content served

---

### P1.2 — Add to home screen prompt (fan.html)

Implement the JavaScript from SPEC.md File 4 in fan.html.

Add the iOS-specific hint variant.

**Do not implement for admin.html or able-v7.html.** The prompt is for fans building a habit. Artists access admin via bookmark or typing the URL — they don't need a prompt.

**Test (P1.2):**
- Simulate 3 visits: set `localStorage.setItem('able_fan_visits', '2')` in console, reload
- On Chrome Android / devtools mobile: `beforeinstallprompt` should fire, hint should slide up after 2s
- Tap "Add": browser install prompt appears
- On "accepted": "ABLE added to your home screen." toast, hint removed
- Tap ✕: hint dismissed, never reappears
- On iOS Safari: share sheet hint shown (different copy/UI) after 3 visits

---

## P2 — Background sync + push notifications

**Effort: 6–8 hours**
**Impact: 8 → 9/10**
**Dependency: Supabase backend (not yet built)**

### P2.1 — Background sync for new releases

When a followed artist publishes a new release, fan.html should update without the fan opening the app.

Implementation requires:
1. Supabase realtime subscription in sw.js (or periodic background sync)
2. `BackgroundSync` API in sw.js for queued writes
3. Badge API: `navigator.setAppBadge(count)` when there are new releases

This is entirely dependent on the Supabase backend. Do not implement until Supabase is live.

---

### P2.2 — Push notification opt-in

After fan installs the app, offer push notification opt-in for: new releases from followed artists, show announcements, limited-time offers.

**Copy:**
- Opt-in prompt: "Get notified when the artists you follow drop something." (no exclamation mark)
- Permission request copy: follows browser-native — cannot customise
- Notification title: "[Artist Name] just dropped [Release Title]"
- Notification body: "Tap to stream."

**iOS note:** Web Push on iOS requires iOS 16.4+ and the site installed as a PWA. This is the primary reason P0 (manifest + iOS meta tags) must come first.

**Estimate:** 4 hours implementation + 2 hours testing across iOS/Android.

---

## What gets to 10

**10/10 requires:**

1. **Lighthouse PWA audit at 100.** Open Chrome DevTools → Lighthouse → PWA. Currently: 0. After P0+P1: target 80+. 100 requires every PWA check to pass including HTTPS, valid manifest, service worker, maskable icons, and installability.

2. **Tested on real iOS Safari.** Devtools cannot simulate the full iOS PWA experience. Must test on a physical iPhone:
   - Add to Home Screen flow
   - Standalone launch
   - Status bar rendering
   - iOS-specific install hint
   - Service worker functioning under iOS WebKit

3. **Tested on real Android Chrome.** Install flow, icon, standalone mode, `beforeinstallprompt` timing.

4. **Push notification delivery.** End-to-end test: artist publishes release → fan receives push notification on locked screen within 60 seconds. This requires Supabase backend + P2.2 implementation.

With P0+P1 complete: **8.5/10** (spec-complete).
With Lighthouse 100 + real device testing: **9.5/10**.
With push notifications working end-to-end: **10/10**.

---

## Summary table

| Phase | Tasks | Effort | Score gain |
|---|---|---|---|
| P0 | manifest.json + iOS meta tags + icons | 30 min | 2 → 5 |
| P1 | sw.js + install prompt (fan.html) | 3–4 hrs | 5 → 8.5 |
| P2 | Background sync + push opt-in | 6–8 hrs + Supabase | 8.5 → 9.5 |
| QA | Lighthouse 100 + real device testing | 2–3 hrs | 9.5 → 10 |

**P0 should happen immediately** — it's 30 minutes and unblocks P1. P1 can follow in a focused session. P2 waits for Supabase.
