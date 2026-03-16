# ABLE — Error States: Path to 10
**Created: 2026-03-16 | Updated: 2026-03-16 | Current: 3.5/10 | Spec-complete target: 9/10**

---

## P0 — Fix before any production traffic

These are crashes or near-crashes visible to real users. They must be fixed before sharing able-v7.html publicly.

### P0.1 — `safeGet()` / `safeSet()` in all pages

**Files:** able-v7.html, admin.html, start.html, fan.html
**Change:** Replace every `JSON.parse(localStorage.getItem(...))` call with `safeGet(key, fallback)`.
**Why P0:** A single malformed localStorage entry currently crashes the page silently. Artists who have been experimenting with the build are already at risk.

**Exact `safeGet` — 8 lines. Add at the top of each file's `<script>` section:**

```javascript
function safeGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`[ABLE] localStorage parse error for "${key}"`, e);
    return fallback;
  }
}
```

**Exact `safeSet` — 6 lines. Add immediately after `safeGet`:**

```javascript
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      showToast('Your device is running low on storage. Time to sync your data.', 'amber', {
        action: { label: 'Learn more', href: '/docs/sync' }
      });
    } else {
      console.error(`[ABLE] localStorage write error for "${key}"`, e);
    }
    return false;
  }
}
```

**The 5 most dangerous bare reads in able-v7.html — wrap these first:**

1. **The `DOMContentLoaded` handler that reads `able_v3_profile`** — the main profile init call. This is the first read and the most impactful: if it crashes, the entire page is blank.
   ```javascript
   // Before (crashes on corrupt data):
   const profile = JSON.parse(localStorage.getItem('able_v3_profile')) || {};
   // After:
   const profile = safeGet('able_v3_profile', {});
   ```

2. **The fan sign-up handler that reads `able_fans`** — checks for duplicate emails. A crash here means the fan sees a broken form.
   ```javascript
   const fans = safeGet('able_fans', []);
   ```

3. **The CTA click handler that reads `able_clicks`** — records the click event. A crash here loses analytics data silently.
   ```javascript
   const clicks = safeGet('able_clicks', []);
   ```

4. **The page view recording call that reads `able_views`** — crash here means a page visit goes unrecorded.
   ```javascript
   const views = safeGet('able_views', []);
   ```

5. **The shows section renderer that reads `able_shows`** — if shows data is corrupt, the events section blanks out with no error.
   ```javascript
   const shows = safeGet('able_shows', []);
   ```

**Empty state when `able_v3_profile` returns null:**

When `safeGet('able_v3_profile', null)` returns null (profile genuinely not set up, or corrupt), render this graceful state instead of a blank page or JS error:

```html
<!-- Shown when profile is not yet configured or data is unreadable -->
<div class="profile-not-configured" id="profileNotConfigured" hidden>
  <div class="pnc-inner">
    <p class="pnc-headline">This page isn't set up yet.</p>
    <p class="pnc-body">If you're the artist, <a href="/start.html">set up your page here</a>.</p>
  </div>
</div>
```

Show it with:
```javascript
const profile = safeGet('able_v3_profile', null);
if (!profile || !profile.name) {
  document.getElementById('profileNotConfigured').hidden = false;
  document.getElementById('mainContent').hidden = true;
  return; // stop init
}
```

Copy is intentionally neutral — it does not assume the visitor is the artist or a fan. It gives the artist a path forward without exposing internal details to fans who stumble on an unconfigured page.

**Estimate:** 1–2 hours across all pages (mechanical replacement).

**Test:** Open browser console. Run:
```javascript
localStorage.setItem('able_v3_profile', 'not valid json{{{');
location.reload();
```
Expected: page loads with fallback values, `console.warn` printed, no crash. If profile is null, the "page not set up yet" state renders.

---

### P0.2 — Image fallback with initials avatar

**Files:** able-v7.html, admin.html
**Change:** Add `onerror="..."` to every `<img>` that loads from a URL. Use `generateInitialsAvatarSVG()`.
**Why P0:** Artwork is the visual centrepiece of the artist profile. A broken image icon is brand-damaging and entirely avoidable.

See SPEC.md PATTERN 3 for the complete `generateInitialsAvatarSVG()` function and usage.

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
**Why P0:** Artists will open admin.html on a phone on a poor connection. Silent data loss is worse than a quiet "no connection" message.

See SPEC.md PATTERN 2 for the complete `showToast()` implementation and CSS tokens.

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
**Why P1:** Artists using the dashboard need to know whether their shows disappeared or just haven't been added yet.

**Estimate:** 1 hour.

**Sections to audit:** fan list, shows list, snap cards, analytics (stats), connections.

---

## P2 — Post-launch quality improvements

### P2.1 — Offline mode for artist profile page (service worker)

**File:** sw.js (new), able-v7.html
**Dependency:** See `docs/systems/pwa/SPEC.md` for the complete service worker — use that directly, do not rewrite.

---

### P2.2 — localStorage corruption recovery in admin.html

After `safeGet()` returns fallback on corruption, show a recovery nudge in admin: "Your profile data may be incomplete. Re-run setup or contact support." with a "Re-run setup →" link to start.html.

**Estimate:** 1 hour.

---

### P2.3 — localStorage quota recovery

`safeSet()` already catches `QuotaExceededError` and shows the toast. P2.3 is building the `/docs/sync` destination: a simple page explaining how to export profile data and clear old keys.

**Estimate:** 30 minutes.

---

## What gets to 10

10/10 requires:

1. **Playwright tests for every error state** — each failure mode in the P0–P1 list has an automated test. `localStorage.setItem('able_v3_profile', 'corrupt')` → test expects graceful render. Mock network offline → test expects toast. These tests run in CI.

2. **Real device testing** — iOS Safari, Android Chrome. Service worker tested on device. Offline mode tested without devtools. Image failures tested on a slow connection. localStorage quota tested with a large dataset.

3. **Error state copy reviewed by James** — the canonical copy in SPEC.md is the proposed final copy. It needs sign-off.

4. **Supabase error states** — when the backend lands, new failure modes appear: auth failure, Supabase rate limit, real-time subscription drop. These need a second pass of this spec at that point.

With P0 + P1 complete: **8/10** (safeGet/safeSet + empty states = 8/10 on implementation alone).
With all try/catch wrapped and all error states with UI: **9/10**.
With Playwright tests + device testing: **10/10**.
