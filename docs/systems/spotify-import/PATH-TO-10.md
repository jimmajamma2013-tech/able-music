# ABLE — Spotify Import System: Path to 10
**Date: 2026-03-15 | Starting score: 5.2/10 | Target: 9.0/10 (spec-complete) → 10/10 (live + verified)**

> This document is the execution roadmap. Each phase is a discrete unit of work. P0 must be done before P1. P1 must be done before P2. P3 is post-launch hardening.

---

## Starting position

**5.2/10** — Architecture described in DESIGN-SPEC. No Netlify function exists. Client-side debounce strategy is ambiguous. Pre-population chain has two missing `wizardState` fields. `detectVibeFromGenres` is referenced but not defined. Failure copy is defined but HTTP status codes are not. API security has significant gaps.

---

## P0 — Foundation (5.2 → 7.0)

**What this phase delivers:** A fully specced, buildable system. No code yet — but every decision is made. Anyone can sit down with SPEC.md and build the whole thing without asking a question.

### P0.1 — Formalise the Netlify function interface

- [x] Define request/response shape (done: SPEC.md §3.3, §3.4)
- [x] Define all error codes and their HTTP status codes (done: SPEC.md §3.5 error table)
- [x] Specify environment variables and where they are set (done: SPEC.md §3.1)
- [x] Clarify token caching strategy: in-memory, 55-min TTL (done: SPEC.md §3.2)

**Deliverable:** `SPEC.md §3` — complete. Anyone can build `functions/spotify-import.js` from it.

### P0.2 — Define client-side URL detection and debounce

- [x] Formal regex for all 3 URL formats (done: SPEC.md §1)
- [x] Normalisation rules: strip `?si=` (done: SPEC.md §1)
- [x] Debounce strategy: immediate on paste, 400ms on oninput (done: SPEC.md §1)
- [x] In-flight abort on URL edit (done: SPEC.md §4.3 — AbortController per call)

**Deliverable:** `SPEC.md §1 + §4.3` — complete.

### P0.3 — Define all failure states and their copy

- [x] 5 error codes with copy (inherited from DESIGN-SPEC, confirmed in SPEC.md §3.5)
- [x] HTTP status for each error code (done: SPEC.md §3.5)
- [x] Client-side vs. function-side error codes distinguished (done: ANALYSIS.md §6, SPEC.md §3.5 footnote)
- [x] Fallback path copy: all point artist toward Screen 1 manually

**Deliverable:** `SPEC.md §3.5` — error reference table complete.

### P0.4 — Fix the `wizardState` gap

- [x] Add `importedArtworkUrl` field (done: SPEC.md §4.1)
- [x] Add `importedSpotifyUrl` field (done: SPEC.md §4.1)
- [x] Add `importedFollowers` field (done: SPEC.md §4.1)
- [x] Define Screen 8 profile write that includes artwork + spotifyUrl (done: SPEC.md §5)

**Deliverable:** `SPEC.md §4.1 + §5` — wizardState and profile write complete.

### P0.5 — Define `detectVibeFromGenres`

- [x] Full GENRE_TO_FEEL mapping table (done: SPEC.md §4.2)
- [x] Null return on no match (not 'indie' fallback) — reasoning documented (done: SPEC.md §4.2)
- [x] Partial match logic for compound genre strings (done: SPEC.md §4.2)

**Deliverable:** `SPEC.md §4.2` — function defined, ready to copy-paste.

**Score after P0: 7.0/10**

---

## P1 — Core Implementation (7.0 → 8.5)

**What this phase delivers:** The Netlify function exists, the client integration is wired, the loading state and mini-card render correctly. A real Spotify URL can be pasted and the wizard auto-advances to Screen 1 with name pre-filled.

### P1.1 — Build `functions/spotify-import.js`

Work directly from `SPEC.md §3.2`.

Steps:
1. Create `functions/` directory at project root
2. Create `functions/spotify-import.js` using the pattern in SPEC.md §3.2
3. Set `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in Netlify UI
4. Local test with `netlify dev` + curl:

```bash
curl -X POST http://localhost:8888/.netlify/functions/spotify-import \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"}'
# Expected: 200 with name "The Weeknd" and genres array
```

5. Verify token caching: two sequential calls should not make two token exchange requests (check Netlify function logs)
6. Verify error cases: send a non-existent artist ID, expect HTTP 404 + `code: "NOT_FOUND"`

### P1.2 — Wire client-side detection in `start.html`

Work directly from `SPEC.md §1 + §4`.

Steps:
1. Add `extractSpotifyArtistId()` function to `start.html` JS
2. Add `onpaste` handler to `#import-input`: extract ID after `setTimeout(0)`, trigger import if found
3. Add `oninput` debounce handler (400ms): extract ID, trigger import if found
4. Add `runSpotifyImport()` function (SPEC.md §4.3)
5. Abort in-flight request when a new URL is detected (track current AbortController in closure)
6. Add sessionStorage cache check before every Netlify call (SPEC.md §4.4)

### P1.3 — Pre-population logic

Steps:
1. After successful import, `wizardState.importedName`, `importedArtworkUrl`, `importedSpotifyUrl` are set
2. When Screen 1 mounts: if `wizardState.importedName !== null` → pre-fill `#name-input`, show contextual headline
3. When Screen 2 mounts: if `wizardState.vibe !== null` → mark matching card as pre-selected, show "matched" tag
4. At Screen 8 Done write: merge `importedArtworkUrl` and `importedSpotifyUrl` into profile (SPEC.md §5)

### P1.4 — Loading state and mini-card

Work directly from `SPEC.md §6`.

Steps:
1. `showImportLoading()`: disable input, show dot-pulse, hide button
2. `showImportSuccess(data)`: green border, check icon, mini spotlight card (SPEC.md §6.2)
3. Format followers with `toLocaleString()` (comma separator)
4. Mini-card entrance animation: translateY + opacity, 300ms spring
5. `showImportError(code)`: amber border, look up copy from error table, show below input
6. `showImportError` always re-enables input and keeps "Start from scratch →" visible

**Score after P1: 8.5/10**

---

## P2 — Polish and Resilience (8.5 → 9.5)

**What this phase delivers:** The system is robust, delightful, and handles every edge case gracefully. Spotify top tracks are surfaced in the wizard and on the profile.

### P2.1 — sessionStorage cache (implemented in P1, validated in P2)

- Test: paste same URL twice in same session → second call is instant (no network round-trip)
- Test: paste URL, close tab, reopen → cache is gone (sessionStorage, not localStorage)
- Test: paste URL, wait 31 minutes (simulate by mocking `Date.now()`) → cache expired, network call fires

### P2.2 — Top tracks pre-loading into music section

When `data.topTracks.length > 0`:
- On the wizard Done screen, pre-populate `able_v3_profile.releases` with the first top track as a placeholder release card
- This means the artist profile has a music section populated on first visit, before the artist manually adds releases
- The release card should be clearly marked as "From Spotify — edit or remove any time" to give the artist autonomy
- Copy: "Your top track on Spotify — it's a start." (Below the track card on Done screen)

### P2.3 — Artist image as default artwork

When `data.image` is available:
- At the Done screen write, if `wizardState.artworkUrl` is null (artist did not manually set artwork), use `importedArtworkUrl` as `able_v3_profile.artworkUrl`
- The profile hero on `able-v7.html` shows the Spotify artist image as the default artwork
- Nudge in admin.html: "Your Spotify photo is your current artwork — swap it any time."

### P2.4 — Retry logic for TIMEOUT

- On TIMEOUT, show error copy and a "Try again →" inline link (not a button)
- Clicking "Try again →" re-fires `runSpotifyImport(rawUrl)` once
- Maximum 1 automatic retry. After a second TIMEOUT, show the manual fallback copy and do not offer retry again

### P2.5 — `netlify.toml` configuration

Create `netlify.toml` at project root if it doesn't exist:

```toml
[build]
  functions = "functions"

[[headers]]
  for = "/.netlify/functions/*"
  [headers.values]
    Access-Control-Allow-Origin = "https://ablemusic.co"
    Access-Control-Allow-Methods = "POST, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type"
```

This restricts CORS to the production domain (not `*` as in the development pattern).

### P2.6 — Post-wizard Spotify nudge in admin.html

If `able_v3_profile.spotifyUrl` is null after wizard:
- Add a low-priority nudge in admin.html (nudge system already exists)
- Nudge ID: `'connect-spotify'`
- Copy: "Add your Spotify link to show your listener count on your page."
- On dismiss: add to `able_dismissed_nudges`

**Score after P2: 9.5/10**

---

## What gets to 10

A 10/10 requires all of the following:

1. **Netlify function live in production** — real Spotify credentials, deployed to Netlify, responding correctly to real artist URLs. Test with at least 5 real Spotify artist URLs across different genres.

2. **Playwright test covering success path:**
```javascript
// Test: paste valid Spotify URL → success state → Screen 1 pre-filled
await page.goto('/start.html');
await page.fill('#import-input', 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ');
await page.waitForSelector('.import-success', { timeout: 10000 });
await expect(page.locator('.import-success')).toBeVisible();
// Auto-advance
await page.waitForSelector('#screen-name.active', { timeout: 3000 });
await expect(page.locator('#name-input')).not.toBeEmpty();
```

3. **Playwright test covering failure path:**
```javascript
// Test: paste invalid Spotify URL → error state → can proceed manually
await page.fill('#import-input', 'https://open.spotify.com/artist/INVALID_ID_00000');
await page.waitForSelector('.import-error', { timeout: 10000 });
await expect(page.locator('.import-error')).toBeVisible();
await page.click('[data-action="skip-import"]');
await expect(page.locator('#screen-name')).toHaveClass(/active/);
```

4. **Profile write verified:** After a full wizard run with Spotify import, `able_v3_profile` in localStorage contains `artworkUrl` and `spotifyUrl` populated from Spotify data.

5. **Quality gate met:** Time from paste to Screen 1 pre-filled is under 3 seconds on a typical connection (P50 response time < 1.5s from Netlify function).

**Score at 10: live, tested, verified, quality gate met.**

---

## Summary table

| Phase | Score | Key deliverable |
|---|---|---|
| Current | 5.2/10 | Architecture described, not built |
| P0 (spec) | 7.0/10 | All decisions made, SPEC.md complete |
| P1 (core build) | 8.5/10 | Function live, client wired, pre-population works |
| P2 (polish) | 9.5/10 | Cache, top tracks, retry, CORS, nudge |
| 10 | 10/10 | Live + Playwright verified + quality gate met |
