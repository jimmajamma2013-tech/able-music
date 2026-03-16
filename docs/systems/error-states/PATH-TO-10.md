# ABLE — Error States: Path to 10
**Created: 2026-03-16 | Current: 3.5/10 | Spec-complete target: 9/10**

---

## P0 — Fix before any production traffic

These are crashes or near-crashes visible to real users. They must be fixed before sharing able-v7.html publicly.

### P0.1 — `safeGet()` / `safeSet()` in all pages

**Files:** able-v7.html, admin.html, start.html, fan.html
**Change:** Replace every `JSON.parse(localStorage.getItem(...))` call with `safeGet(key, fallback)`.
**Why P0:** A single malformed localStorage entry currently crashes the page silently. Artists who have been experimenting with the build are already at risk.

**Estimate:** 1–2 hours across all pages (mechanical replacement).

**Test:** Open browser console. Run:
```javascript
localStorage.setItem('able_v3_profile', 'not valid json{{{');
location.reload();
```
Expected: page loads with fallback values, `console.warn` printed, no crash.

---

### P0.2 — Image fallback with initials avatar

**Files:** able-v7.html, admin.html
**Change:** Add `onerror="..."` to every `<img>` that loads from a URL. Use `generateInitialsAvatarSVG()`.
**Why P0:** Artwork is the visual centrepiece of the artist profile. A broken image icon is brand-damaging and entirely avoidable.

**All images to cover:**
- able-v7.html: hero artwork, avatar
- admin.html: profile artwork thumbnail in Campaign HQ
- start.html: Spotify import artwork preview

**Estimate:** 30 minutes.

**Test:** Load able-v7.html. In devtools, block the artwork URL. Expected: initials avatar renders in accent colour, no broken image icon.

---

### P0.3 — Network offline toast (admin.html + start.html)

**Files:** admin.html, start.html
**Change:** Add `window.addEventListener('offline', ...)` and `window.addEventListener('online', ...)`. Check `navigator.onLine` on page load.
**Why P0:** Artists will open admin.html on a phone on a poor connection. Silent data loss (changes not saved, import not tried) is worse than a quiet "no connection" message.

**Estimate:** 30 minutes.

**Test:** Open admin.html. In Chrome devtools, toggle "Offline". Expected: amber toast appears. Toggle back online. Expected: "Back online." green toast appears.

---

## P1 — Fix before beta launch

These are degraded experiences — not crashes, but user-visible failures that erode trust.

### P1.1 — Spotify import all failure states

**File:** start.html
**Change:** Implement the full failure handler from SPEC.md Pattern 4. Five error branches, each with specific copy. "Skip and fill in manually" button appears on any failure.
**Why P1:** The Spotify import is the first interaction. A silent failure here loses artists at step zero.

**Estimate:** 2 hours (implement + test each failure mode with mock fetch responses).

**Test matrix:**
- [ ] Valid artist URL: import succeeds, fields populate
- [ ] Non-Spotify URL: format error shown inline
- [ ] Valid URL, artist not found (404): "Couldn't find that artist" shown
- [ ] Rate limit (mock 429): "Spotify is busy" shown
- [ ] Offline on submit: "No connection" shown
- [ ] Skip button: skips import, moves to next screen with empty fields

---

### P1.2 — Fan sign-up validation copy audit

**File:** able-v7.html
**Change:** Replace browser-default validation with custom inline error copy from SPEC.md Pattern 5. Duplicate email check. "Already on the list" reassurance state.
**Why P1:** The fan sign-up is the core conversion event. Bad error copy here directly costs sign-ups.

**Estimate:** 1 hour.

**Test:**
- [ ] Submit empty email: custom copy appears under field
- [ ] Submit bad format: custom copy appears
- [ ] Submit duplicate email: green "You're already on the list." shown
- [ ] Submit valid email: confirmation state, no error

---

### P1.3 — Empty vs error state distinction in admin.html

**File:** admin.html
**Change:** Audit every list/section in admin.html. Apply `.state-empty` to "no data yet" states, `.state-error` to "data failed to load" states. Verify copy matches the canonical table in SPEC.md.
**Why P1:** Artists using the dashboard to manage their career need to know whether their shows disappeared or just haven't been added yet.

**Estimate:** 1 hour.

**Sections to audit:** fan list, shows list, snap cards, analytics (stats), connections.

---

## P2 — Post-launch quality improvements

### P2.1 — Offline mode for artist profile page (service worker)

**File:** sw.js (new), able-v7.html
**Change:** Register a service worker that cache-first serves able-v7.html and all static assets. Network-first for profile data.
**Why P2:** Fans discovering an artist on a poor connection should still see the page. Currently a network failure on the CDN would blank the page.

**Estimate:** 3 hours (service worker strategy + registration + offline fallback page).

Note: requires HTTPS in production. Will not work on `file://` local testing.

---

### P2.2 — localStorage corruption recovery in admin.html

**File:** admin.html
**Change:** After `safeGet()` returns fallback on corruption, show a recovery nudge in admin: "Your profile data may be incomplete. Re-run setup or contact support." with a "Re-run setup →" link to start.html.
**Why P2:** P0.1 (safeGet) prevents the crash. P2.2 tells the artist what to do to recover their data.

**Estimate:** 1 hour.

---

### P2.3 — localStorage quota recovery

**File:** All pages (via `safeSet`)
**Change:** `safeSet()` already catches `QuotaExceededError` and shows the toast. P2.3 is building the "/docs/sync" destination: a simple page explaining how to export profile data and clear old keys.
**Why P2:** Without this, the toast's "Learn more" link goes nowhere. Rare but important for power users.

**Estimate:** 30 minutes.

---

## What gets to 10

10/10 requires:

1. **Playwright tests for every error state** — each failure mode in the P0–P1 list has an automated test. `localStorage.setItem('able_v3_profile', 'corrupt')` → test expects graceful render. Mock network offline → test expects toast. These tests run in CI.

2. **Real device testing** — iOS Safari, Android Chrome. Service worker tested on device. Offline mode tested without devtools. Image failures tested on a slow connection. localStorage quota tested with a large dataset.

3. **Error state copy reviewed by James** — the canonical copy in SPEC.md is the proposed final copy. It needs sign-off.

4. **Supabase error states** — when the backend lands, new failure modes appear: auth failure, Supabase rate limit, real-time subscription drop. These need a second pass of this spec at that point.

With P0 + P1 complete: **9/10**.
With P2 complete: **9.5/10**.
With Playwright tests + device testing: **10/10**.
