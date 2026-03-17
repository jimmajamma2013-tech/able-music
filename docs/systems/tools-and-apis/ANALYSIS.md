# ABLE — Tools and APIs: Analysis
**Date: 2026-03-16 | Status: Pre-build | Analyst: Claude Code**

---

## Overview

The FREE-TOOLS-AND-APIS.md document is the most technically accurate reference in the ABLE documentation stack. Primary-source research, honest complexity ratings, verified status on deprecated APIs, and production-ready code patterns. The PATH-TO-10 gave it 9.5/10 with five specific gaps — none blocking. This analysis adds a build-sequence assessment, effort-versus-impact scoring, identifies the hidden risks in the P0 integrations, and examines the gap between what the spec describes and what is currently implemented.

---

## 1. The oEmbed Proxy — Score: 10/10 (spec), 0/10 (operational)

The oEmbed proxy Netlify function is the single most important technical infrastructure decision in the spec. Twenty lines of code that unlock Spotify, YouTube, SoundCloud, Vimeo, Bandcamp, Mixcloud, and TikTok embeds simultaneously. This is leverage.

**The spec is correct about build priority:** build the proxy before building any individual embed. Once the proxy exists, each embed is 15 minutes of copy-paste work. Without the proxy, each embed requires its own CORS workaround.

**Current operational state:** The proxy function is specified in code but not confirmed as deployed to Netlify. This is the first thing to build and the first thing to verify. Until it is live and tested, no media embeds work reliably.

**The CORS note missing from the spec (PATH-TO-10 Gap 4):** The proxy function in the spec does not account for the fact that some oEmbed providers set `Access-Control-Allow-Origin: *` on their oEmbed endpoints and others do not. Spotify's oEmbed endpoint does not require proxying in practice — it responds correctly to cross-origin requests. SoundCloud's does. YouTube's oEmbed endpoint responds to cross-origin requests but their `Data API v3` does not. The proxy handles all cases correctly, but the explanation of *why* some endpoints need it and some don't is missing from the spec. Add a CORS behaviour note for each provider in the proxy's comments.

**Wavesurfer.js Shadow DOM note from FINAL-REVIEW:** Wavesurfer.js v7 uses Shadow DOM, meaning global CSS does not penetrate it. Styles must be passed as constructor options. This matters for ABLE's tokenised CSS system — the waveform will not inherit `--color-accent` via CSS inheritance. Pass the colour explicitly: `waveColor: getComputedStyle(document.documentElement).getPropertyValue('--color-accent')`. Add this note to the spec before building.

---

## 2. P0 Integration Readiness

The four P0 integrations (Spotify oEmbed, oEmbed proxy, YouTube oEmbed + Data API v3, SoundCloud oEmbed, Bandsintown API) are specified at production quality. The build sequence below reflects actual dependencies.

### Build sequence for P0:

**Step 1: oEmbed proxy Netlify function**
Deploy the 20-line function from the spec. Verify it handles all eight providers listed. Test each provider URL manually with a curl command before building any UI. Time: 2–3 hours including testing.

**Step 2: Spotify oEmbed in release cards**
Once proxy is live, paste a Spotify track URL into a release card and render the embed. Time: 1 hour. Dependency: oEmbed proxy deployed.

**Step 3: YouTube oEmbed in release cards**
Same pattern as Spotify. Time: 30 minutes. Dependency: oEmbed proxy deployed.

**Step 4: SoundCloud oEmbed**
Same pattern. Time: 30 minutes. Dependency: oEmbed proxy deployed.

**Step 5: Bandsintown shows import**
Register a free `app_id` at `artists.bandsintown.com`. Build the shows fetch in admin.html. Populate `able_shows` from the API response. Time: 3–4 hours. Dependency: nothing beyond the `app_id` registration.

**Total P0 build time from scratch: approximately 8 hours of focused work.**

This is the correct state of affairs — P0 should not be expensive. The cost has been kept low by the oEmbed philosophy decision. Without it, each embed would require its own authentication flow and CORS handling.

---

## 3. P1 Integration Effort vs. Impact Scoring

The P1 integrations are where effort-versus-impact varies significantly:

| Integration | Artist value | Fan delight | Build effort | Implementation risk | Verdict |
|---|---|---|---|---|---|
| Wavesurfer.js waveform | High — visual craft signal | Very high — waveform communicates music | 2–3 hours | Medium (Shadow DOM CSS) | Build early |
| Last.fm similar artists | Medium — discovery signal | High — fans explore | 3–4 hours | Low | Month 1 |
| MusicBrainz release import | High — solves empty state | Low (invisible to fans) | 3–4 hours | Low | Month 1 |
| Howler.js audio playback | Low (replaces HTML5 Audio) | Medium — smoother UX | 2–3 hours | Low | Month 2 |
| Lottie animations | Low (polish) | High — product feels alive | 2 hours per animation | Low | Month 2 |
| TheAudioDB artwork | Medium — artwork fallback | Medium | 2 hours | Low (dev key is "2") | Month 1 |
| Genius link | Low | Medium — lyric curiosity | 2 hours | Low | Month 2 |

**Highest immediate priority in P1:** MusicBrainz release import (solves the empty-state problem for artists who know their ISRC or Spotify URI) and TheAudioDB artwork (makes profiles look complete from day one with zero artist effort).

**Lowest immediate priority in P1:** Howler.js. HTML5 Audio works for the use cases ABLE has right now. Howler is an enhancement for the clips feed, which does not yet exist. Defer until clips feed is specced.

---

## 4. APIs to Avoid — Assessment of Current Decisions

The "avoid" list is the most valuable section in the spec. Each decision is verified and correct.

**Twitter/X — correctly avoided.** The $100–200/month cost for read operations is economically indefensible for the value it would provide (showing an artist's recent tweets). Direct link to the artist's X profile is the correct alternative. No artist will complain that their ABLE page links to their X rather than embedding it.

**Instagram — correctly avoided.** The deprecation of the Basic Display API and the complexity of the Graph API review process makes this a months-long effort for uncertain benefit. Instagram embedding via oEmbed for individual posts is still available without auth and handles the rare case where an artist wants to embed a specific post.

**AcousticBrainz — correctly avoided.** The database stopped accepting new data in 2022. For any artist who released music in the last three years, the coverage is zero. TheAudioDB is the correct substitute for genre/mood data.

**Every Noise at Once — correctly avoided.** The site stopped being updated in December 2023. Last.fm `artist.getSimilar` is the live alternative.

**Songkick — correctly noted as closed.** As of March 2026, Songkick is not accepting new API applications. Build Bandsintown first. Monitor Songkick quarterly — two independent tour data sources would significantly improve gig mode reliability.

---

## 5. Audiomack Gap (PATH-TO-10 Gap 3)

Audiomack is the dominant streaming platform for hip-hop, Afrobeats, and underground/emerging genres. Not mentioned in the spec. This is a real gap for ABLE's stated goal of serving UK independent artists across genre diversity.

**The Audiomack oEmbed endpoint:** `https://audiomack.com/oembed?url={url}` — yes, it exists and is free. No API key required. Adding Audiomack to the oEmbed proxy takes 3 minutes: one additional entry in the providers object.

**Why this matters for ABLE:** An independent UK grime artist, Afrobeats producer, or UK drill act whose primary streaming presence is Audiomack currently has no native embed option in ABLE. They can link to Audiomack but cannot show the player. Adding Audiomack oEmbed support makes ABLE genuinely genre-neutral rather than Spotify-first.

**Action:** Add `'audiomack.com': 'https://audiomack.com/oembed'` to the proxy function providers object. Add a brief entry to the spec alongside SoundCloud.

---

## 6. Bandcamp API Status (PATH-TO-10 Gap 2)

Bandcamp's ownership history since 2022 (Epic Games acquisition → Songtradr acquisition → Songtradr bankruptcy → current ownership) has created uncertainty about API access.

**Current state:** The Bandcamp oEmbed endpoint (`https://bandcamp.com/oembed`) still functions for embedding individual albums and tracks. No authentication required. This is the correct integration path for ABLE.

**The full Bandcamp API** (fan purchase data, sales analytics) was restricted and its status under current ownership is unclear. Do not build against the full Bandcamp API until its status is confirmed. Use oEmbed only.

**For ABLE's use case:** Bandcamp oEmbed covers the primary need — an artist who releases on Bandcamp can embed their album or track on their ABLE profile. Fan purchase data is a feature gap, not a launch blocker.

---

## 7. The Priority Matrix — Assessment of Current Scoring

The integration priority matrix is well-constructed. One reordering is warranted:

**Wavesurfer.js should be P0, not P1.** The spec lists it as P1 (artist value: 8, fan delight: 9, easy build). The argument for P0: the waveform is a visual signal that differentiates ABLE from every other link-in-bio tool at first glance. A fan who sees a waveform on a release card immediately understands that ABLE is built for music, not for "creatives" in general. The waveform is brand communication as much as it is a feature. 2–3 hours of build time for that signal is worth advancing to P0.

**Lottie animations should be P1, not delayed.** Empty states in admin.html are the most common view for new artists (they have no fans yet, no shows, no data). A Lottie animation on the empty fan list state — subtle, thematic, not distracting — transforms the empty state from "this product has nothing for me yet" to "this product is alive and waiting." The build time is 2 hours per animation. The LottieFiles free library has a sufficient selection. Build two: fan list empty state and shows empty state.

---

## 8. Cool / Fun Tier — Assessment of Scheduling

The Phase 2 integrations (audioMotion-analyzer, Tonal.js, P5.js, Three.js) are correctly deferred. Honest complexity assessment:

**audioMotion-analyzer:** The cross-origin iframe CORS restriction is a real technical barrier. The workaround (use audioMotion only when the artist uploads their own audio file, not from Spotify/SoundCloud iframes) reduces the use case significantly. Build this when the release card supports direct audio file upload — not before.

**Tonal.js:** The use case (chord progression display on snap cards) is genuinely music-native and differentiating. But it requires understanding which artists would use it and designing a UX for chord entry. This is a musician-specific feature that requires consultation with musicians to design well. Correct to defer.

**P5.js generative identity:** The highest potential cool factor in the spec. "Each artist has a procedurally generated background pattern derived from their name or accent colour" — if this is done well, it is the feature that gets screenshotted and shared. But it is 🔴 Complex for good reason. Defer to post-PMF.

**Three.js 3D backgrounds:** Correctly marked as V3 or V4. Don't build this until ABLE has product-market fit.

---

## 9. Implementation Infrastructure Gaps

Several infrastructure elements are required before any API integrations can be used reliably in production:

**API key management:** The spec uses API keys for Last.fm, YouTube Data API, Genius, TheAudioDB, and Setlist.fm. These must be stored in Netlify environment variables (`process.env.LASTFM_KEY` etc.), not in frontend JavaScript where they are visible in source. The oEmbed proxy function already demonstrates this pattern — extend it to all authenticated API calls.

**Rate limit handling:** MusicBrainz is 1 request/second unauthenticated. At 1,000 artists all having their profiles refreshed, this becomes a queue management problem. Build a simple delay mechanism (using `setTimeout`) before any MusicBrainz integration sees significant volume.

**Error state handling:** The spec documents the happy path for each API. The production experience requires graceful degradation for: API unavailability (503), rate limit exceeded (429), and not found (404). The Bandsintown case is the most important — if Bandsintown is unavailable, shows should fall back to the `able_shows` localStorage data without visible error.

**Cache invalidation:** The spec documents TTLs (24-hour for Spotify, 6-hour for Bandsintown) but does not specify where caches live. For now, localStorage is appropriate. The cache keys should be prefixed consistently: `able_cache_spotify_{artistId}`, `able_cache_bandsintown_{artistName}`. When Supabase lands, these move to the database.

---

## 10. Priority Actions

**This week:**
1. Deploy the oEmbed proxy Netlify function. Test all 8 providers. This is the infrastructure unlock.
2. Add Audiomack to the proxy providers object — 3 minutes, meaningful for genre diversity.
3. Verify Wavesurfer.js v7 Shadow DOM CSS behaviour before building the waveform feature.
4. Register Bandsintown `app_id` — free, 5 minutes, prerequisite for all shows features.

**This month:**
5. Build Spotify oEmbed in release card (15 minutes post-proxy).
6. Build YouTube + SoundCloud oEmbed (30 minutes combined).
7. Build Bandsintown shows import in admin.html (3–4 hours).
8. Implement MusicBrainz release metadata import in onboarding (3–4 hours).
9. Add TheAudioDB artwork fallback for profiles without custom artwork (2 hours).
10. Build Wavesurfer.js waveform on release cards (2–3 hours, accounting for Shadow DOM).

**Month 2–3:**
11. Last.fm similar artists on artist profile.
12. Lottie animations for empty states (fan list, shows).
13. Genius lyric page links on release cards.
14. Re-check Songkick API availability.
15. Research Bandcamp API status under current ownership.

| Metric | Target |
|---|---|
| P0 integrations complete | Launch day |
| P1 integrations complete | Month 2 |
| API keys in Netlify env vars | Before first deployment |
| Error handling on all APIs | Before 100th artist |
