# ABLE — Spotify Import System: Analysis
**Date: 2026-03-15 | Current score: 5.2/10**

> Pre-spec analysis of the Spotify import system. Scores reflect the current implementation state against what is needed for the quality gate: "Artist should not need to type their name if Spotify import succeeds. Profile 70% complete before Screen 3."

---

## Overview

The Spotify import system is the quality gateway for the onboarding wizard. If it works well, artists arrive at Screen 3 with their name, genre/vibe, and artwork already set — they are oriented, the wizard feels fast, and the profile is substantive before a single field has been manually typed. If it fails — or is never implemented — the wizard becomes a plain form and the quality gate is not met.

The architecture is described in `docs/pages/onboarding/DESIGN-SPEC.md §17.1`. The client-side surface is defined in `DESIGN-SPEC.md §5` (Screen 0). What is unclear is whether the Netlify function exists, whether the client-side debounce fires correctly, and whether the pre-population chain from import response → wizard state → profile write is complete.

Current estimate: **5.2/10** — architecture described and partially specified, but not end-to-end.

---

## Dimension Scores

### 1. URL Detection — 5/10

**What exists:** Screen 0 DESIGN-SPEC describes URL detection rules (`§17.2`): if URL contains `open.spotify.com/artist` → trigger `spotify-import`. Platform icon badges appear on URL paste via `oninput`. The spec names a regex-friendly pattern.

**What is missing:**
- No verified regex in the codebase. The spec mentions detection but does not define the regex formally.
- URL normalisation is not specced: tracking parameters (`?si=xxx`) are stripped? Are they passed as-is to the Netlify function?
- `spotify:artist:ID` URI scheme (the desktop copy format) is not listed in the detection rules.
- Paste vs. keyboard entry: the spec says "immediately trigger import" on URL paste but does not spec how `oninput` differs from `onpaste` for debounce purposes.

**Gap:** The regex and normalisation behaviour need formal definition before implementation.

---

### 2. Prefetch Timing — 5/10

**What exists:** The spec says "immediately trigger import" on URL detection (§5.6), with no mention of a debounce specifically for the URL case. The spec also says debounce 400ms for the typing/live-preview path elsewhere in the wizard. Section 17.1 says `AbortController` with 8s timeout.

**What is missing:**
- No explicit debounce strategy for Screen 0: should it be zero-debounce on paste (correct for paste events) or 400ms debounced on `oninput` (correct for manual typing)?
- Recommended pattern: zero-debounce on paste event (`onpaste` + `setTimeout(0)` to read pasted value), 400ms debounce on `oninput` for keyboard entry. Neither is formally specced.
- What happens if the artist pastes a URL, the import fires, then they edit the URL mid-flight? Abort logic for the in-flight request is not specced.

**Gap:** Trigger strategy needs a precise definition for both paste and keyboard input paths.

---

### 3. Data Completeness — 6/10

**What exists:** Spotify Client Credentials flow gives: name, images[], genres[], followers.total, popularity, top tracks (via a second endpoint call). The DESIGN-SPEC success response shape includes: name, genres, avatarUrl, spotifyId. Cross-page journeys spec shows followers count rendered as "45,200 monthly listeners."

**What is missing:**
- **Upcoming releases:** Not available without user auth. This is a hard API constraint. Current spec does not document this gap or provide the fallback (search by artist name, filter newest).
- **Monthly listeners vs. followers:** Spotify exposes `followers.total` (cumulative followers) not monthly listeners. Monthly listeners is a different metric visible on artist pages but not in the public API. The spec copy "45,200 monthly listeners" is inaccurate — it would be followers.
- **Top tracks:** A second API call is required (`GET /v1/artists/{id}/top-tracks?market=GB`). Not specced in detail.
- **Artwork dimensions:** Spotify returns multiple image sizes. Which to use? Spec says `avatarUrl` but does not specify which index from `images[]`.

**Gap:** Monthly listeners copy needs correction to "followers". Image selection strategy needs a rule. Upcoming releases fallback needs speccing.

---

### 4. Pre-population Accuracy — 6/10

**What exists:** DESIGN-SPEC §6 specifies: if `wizardState.importedName !== null` → pre-fill name input, contextual headline "Is [importedName] right?", micro-copy "From your Spotify profile — edit if needed." Screen 2 specifies: pre-selected vibe card shows "matched" tag when genre came from Spotify genres. `§17.1` shows `wizardState.vibe = detectVibeFromGenres(data.genres)`.

**What is missing:**
- `detectVibeFromGenres` function is referenced but not defined in the spec. The genre → vibe mapping table needs to be the single source of truth.
- What happens when Spotify returns no genres (common for new/small artists)? The spec does not address the empty-genres case explicitly.
- Artwork pre-population: avatarUrl is not tracked in `wizardState` shape shown in §2. It would need to be stored and written to `able_v3_profile.artworkUrl`.
- `spotifyUrl` storage: the original URL needs to be stored for the "Listening on Spotify" platform pill on the live profile, but this is not in the `wizardState` shape shown.

**Gap:** `wizardState` needs two additional fields: `importedArtworkUrl` and `importedSpotifyUrl`. Genre → vibe mapping needs formal definition.

---

### 5. Loading State UX — 6/10

**What exists:** DESIGN-SPEC §5.5 specifies the loading state: dot-pulse animation (3 dots, 4px, `var(--color-muted)`), input disabled, border 1.5px solid `var(--color-border)`. Success state: green border, check icon, "There you are." copy, followers + releases count line. Auto-advance to Screen 1 after 1200ms.

**What is missing:**
- The artist spotlight mini-card (§5.7b) is specced with a container but the exact content hierarchy (image + name + follower count) is not fully resolved with the loading state. Does the card animate in as part of the success state, or does it replace the loading dots?
- The 1200ms auto-advance may be too fast on a slow connection if the success state needs to be read. The delay is from fetch completion, not from the moment the success animation finishes.
- No specced progress indication for the fetch itself (the dots pulse but don't indicate elapsed time or a spinner with progress).

**Gap:** Mini-card entrance animation relative to the success state needs sequencing. Auto-advance timing should be from animation-complete, not fetch-complete.

---

### 6. Failure Handling — 7/10

**What exists:** DESIGN-SPEC §5.5 defines 5 error codes with specific copy:

| Code | Copy |
|---|---|
| `RATE_LIMITED` | "Spotify is busy right now — enter your name below and we'll skip it." |
| `BLOCKED` | "Couldn't reach that page. Enter your name below and carry on." |
| `NOT_FOUND` | "We couldn't find that artist. Check the link or start from scratch." |
| `TIMEOUT` | "Couldn't reach Spotify right now — that's on us. Enter your name below →" |
| `PARSE_ERROR` | "Something went wrong reading that page. Enter your name below and carry on." |

The fallback path (skip import, proceed manually) is explicitly specced. "I'm not on Spotify →" link advances directly to Screen 1.

**What is missing:**
- The Netlify function error response shape is defined in DESIGN-SPEC (`{ "error": "...", "code": "..." }`) but the HTTP status codes for each error type are not specified (e.g. does `NOT_FOUND` return HTTP 404 or HTTP 200 with an error body?).
- Network error (fetch throws, not a structured error response) is handled by the catch block in the client spec, but the copy for this case uses the `default` fallback which is identical to TIMEOUT copy — unclear if this is intentional.
- What happens if the Netlify function returns HTTP 500? Not specced.
- Retry logic: is there one automatic retry on TIMEOUT? Not specced.

**Gap:** HTTP status codes for each error case need formal definition. A decision on automatic retry for TIMEOUT is needed.

---

### 7. API Security — 4/10

**What exists:** DESIGN-SPEC §17.1 shows the client calling `/.netlify/functions/spotify-import` — a Netlify serverless function. This correctly keeps credentials server-side.

**What is missing:**
- `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are not documented as environment variables in any config file (no `.env.example`, no Netlify env var documentation).
- Token caching: the Netlify function should cache the Client Credentials token (valid for 1 hour) in memory or a KV store. Without caching, every wizard session makes a redundant token exchange call to Spotify. Not specced.
- Rate limiting on the Netlify function itself: nothing prevents a bot from hammering `/.netlify/functions/spotify-import` with arbitrary URLs. No rate-limiting middleware is specced.
- CORS headers: the Netlify function needs to return appropriate CORS headers if the frontend is on a different origin during development. Not specced.
- Credentials in `.gitignore`/Netlify UI: not documented anywhere in the project.

**Gap:** This dimension needs the most work before production. Token caching, function-level rate limiting, and credential documentation are all pre-production requirements.

---

### 8. Fallback Experience — 8/10

**What exists:** The wizard is explicitly designed so Spotify import is a shortcut, not a requirement. Screen 0 has:
- "I'm not on Spotify →" link (direct skip to Screen 1, no data pre-filled)
- Pressing Enter on empty input → advance to Screen 1
- All failure states show path forward ("enter your name below")
- All fields on Screen 1–7 work without any import data

**What is missing:**
- If an artist uses the skip path, the wizard is fully functional but there is no guidance toward connecting their Spotify profile later (post-wizard nudge in admin.html).
- The resume-from-draft behaviour (§16.1) when an import was partial — e.g. artist pasted URL, import failed, they left the wizard, they return — is the error state preserved or is Screen 0 shown clean? Not specced.

**Gap:** Post-wizard Spotify connection nudge is not specced (admin.html concern). Draft resume state after import failure needs a rule.

---

## Summary Table

| Dimension | Score | Critical gap |
|---|---|---|
| URL detection | 5/10 | No formal regex; URI scheme missing; no normalisation spec |
| Prefetch timing | 5/10 | No explicit debounce strategy for paste vs. keyboard |
| Data completeness | 6/10 | Monthly listeners vs. followers error; no releases fallback |
| Pre-population accuracy | 6/10 | `wizardState` missing artwork + spotifyUrl fields; no genre fallback |
| Loading state UX | 6/10 | Mini-card sequencing unresolved; auto-advance timing |
| Failure handling | 7/10 | HTTP status codes unspecced; retry logic missing |
| API security | 4/10 | Token caching, rate limiting, CORS, credential docs all missing |
| Fallback experience | 8/10 | Post-wizard Spotify nudge; draft resume after import failure |
| **Overall** | **5.2/10** | |

---

## Key architectural decision not yet resolved

The Netlify function does not exist. Nothing in the codebase implements `functions/spotify-import.js`. Until the function exists (with real Spotify credentials), the entire system is a client-side stub that will fail silently or throw on any real URL paste. The spec is detailed enough to implement from — but it has not been built.

This is the single highest-priority gap. Everything else is refinement.
