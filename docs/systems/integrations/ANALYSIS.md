# Integrations — Current State Analysis
**Date: 2026-03-16 | System: Integrations | Authority: Primary build reference**

> Companion to `SPEC.md`, `PATH-TO-10.md`, `FINAL-REVIEW.md` in this directory.
> Research source: `docs/reference/research/INTEGRATIONS_AND_AI_RESEARCH.md`

---

## What this file is

A scored audit of every integration currently present or absent across all active ABLE files (`able-v7.html`, `admin.html`, `start.html`, `landing.html`). Score = how close the integration is to fully working, not how important it is.

---

## Integration Scores

### 1. Spotify (data import via API) — 6/10

**What exists:**
- Netlify function `netlify/functions/spotify-import.js` is built and complete
- `start.html` pre-step 0 accepts Spotify URL paste
- Full spec in `docs/systems/spotify-import/SPEC.md` (scored 9/10)
- Response shape: name, image, genres, top tracks, discography
- Client-side import flow, sessionStorage cache, genre→feel mapping all specced

**What is missing:**
- The Netlify function exists but is not deployed — no live Netlify + ablemusic.co DNS yet
- No artist-facing "Connect Spotify" panel in `admin.html` for post-wizard reconnect
- No handling for when Spotify artist profile changes after initial import (stale data)
- Monthly listeners is correctly omitted (not in public API) but no proxy metric (Last.fm) is wired yet
- No `docs/apis/spotify.md` audit against the corrected Part 7 findings (API reality check)

**Path to 10:** Deploy Netlify. Wire Last.fm as listener proxy. Add reconnect flow in admin.

---

### 2. YouTube (oEmbed embeds) — 7/10

**What exists:**
- `netlify/functions/oembed-proxy.js` built and handles YouTube oEmbed
- Paste YouTube URL → embed appears in profile
- Video snap cards work via oEmbed

**What is missing:**
- YouTube Data API v3 (thumbnail pull, view count, auto-populate video card) not built — oEmbed is the embed layer only, not the data import layer
- No auto-population flow from YouTube URL in `start.html`
- No "latest video" auto-import for artist profiles

**Path to 10:** Build YouTube Data API import as secondary step (after Spotify). Netlify function `youtube-import.js` — single call by artist name returns latest video + thumbnail.

---

### 3. SoundCloud (oEmbed embeds) — 7/10

**What exists:**
- `netlify/functions/oembed-proxy.js` handles SoundCloud oEmbed
- SoundCloud URLs produce embedded players

**What is missing:**
- No SoundCloud data import (track list, play counts)
- No dedicated SoundCloud connection in `start.html` or `admin.html`
- For artists whose primary platform is SoundCloud (electronic, lo-fi, hip-hop) this is a gap

**Path to 10:** SoundCloud has a public API. Low priority to build — oEmbed covers the core use case. If built, `soundcloud-import.js` Netlify function for track list pull.

---

### 4. Bandcamp (oEmbed embeds) — 7/10

**What exists:**
- `netlify/functions/oembed-proxy.js` handles Bandcamp oEmbed
- Bandcamp URLs produce embedded players

**What is missing:**
- Bandcamp has no public API — this is not a gap that can be closed
- "Connect Bandcamp" is not a meaningful feature — link paste is the correct approach

**Score ceiling:** 7/10 is correct. Bandcamp is intentionally closed. Link paste + embed is the right model. No further work needed.

---

### 5. Bandsintown (gig listings import) — 0/10

**What exists:**
- Referenced in `docs/reference/research/INTEGRATIONS_AND_AI_RESEARCH.md` as a primary integration target
- Not built anywhere in any active file
- No Netlify function
- No `admin.html` connection flow
- No `start.html` import step

**Critical finding:** Bandsintown is the de facto gig listing tool for independent artists. An integration would auto-import all upcoming shows in a single paste. This eliminates one of the most time-consuming onboarding steps (manually entering 5–20 upcoming shows). **It is as high-value as Spotify import.**

**Additional finding from Part 7 (API Reality Check):** Bandsintown API keys are per-artist (not platform-wide). Each key is generated from a Bandsintown for Artists account. Two options:
1. Artist generates key and pastes into ABLE settings (one-time setup, ~2 minutes)
2. ABLE applies to Bandsintown partnership programme (`api@bandsintown.com`)

**Recommended workaround (Ticketmaster Discovery API):** A free, single platform-wide API key covers approximately 80% of ABLE's target artists (UK independent acts, 200–2,000 capacity venues). No per-artist setup. Search by artist name. Returns: event name, date, venue, city, ticket URL. Coverage gap is artists self-promoting via Eventbrite, Dice, or door sales — manual entry fallback covers these.

**Path to 10:** Build Ticketmaster Discovery as primary events import. Build Bandsintown as opt-in secondary (for artists who already have a Bandsintown for Artists account). See `SPEC.md` for full function code.

---

### 6. Instagram (link paste only — API restricted) — 5/10

**What exists:**
- Instagram links work as Quick Action pills in `able-v7.html`
- Correct icon appears in platform pills
- Link paste model is correct — Instagram Basic Display API was deprecated late 2024

**What is missing:**
- No "link in bio" back-tracking analytics (how many fans came from Instagram)
- UTM parameter tracking is not implemented — can't distinguish Instagram traffic from direct
- No Instagram-specific landing page state optimisation

**Score ceiling:** 5/10 is correct given API restrictions. The right path is UTM tracking, not API integration. Instagram is a source channel, not a data import source.

---

### 7. TikTok (link paste only) — 5/10

**What exists:**
- TikTok links work as Quick Action pills
- Correct icon appears in platform pills

**What is missing:**
- Same UTM tracking gap as Instagram
- TikTok API integration has high friction and is not worth pursuing
- TikTok-optimised link-in-bio landing is a future consideration (separate page variant)

**Score ceiling:** 5/10 is correct. Same reasoning as Instagram.

---

### 8. Stripe (payments) — 2/10

**What exists:**
- `docs/apis/stripe.md` documents the integration
- "0% ABLE cut, Stripe standard fee only" copy is in `able-v7.html` and `admin.html`
- Architecture decision: Stripe Connect for marketplace splits is specced
- Close Circle (support packs) is designed around Stripe payments

**What is missing:**
- No Stripe integration is wired in any active file
- No `netlify/functions/stripe-*` functions exist
- Close Circle cannot actually process payments — it's a UI shell only
- No Stripe Connect setup flow for artists

**Note:** Score of 2 (not 0) because the architecture is correctly designed and the API spec exists. The build is a known P2 item in `docs/STATUS.md`.

---

### 9. Linktree import — 0/10

**What exists:**
- Referenced in `docs/reference/research/INTEGRATIONS_AND_AI_RESEARCH.md` as "single best quick win"
- `docs/systems/spotify-import/SPEC.md` §8 mentions `DESIGN-SPEC.md §17.2` as covering linktree-import function — but that spec does not appear to be written
- No Netlify function exists
- No `start.html` Linktree import step exists

**Critical finding:** This is the highest-value onboarding conversion tool. The majority of ABLE's acquisition targets are currently on Linktree. A Linktree importer removes the switching cost entirely — artist pastes their Linktree URL, all their CTAs appear in ABLE. Low-effort build (Linktree pages are public HTML, no API required, parse with a Netlify function). Extremely high onboarding value.

**Path to 10:** Build `netlify/functions/linktree-import.js`. Parses public Linktree HTML → extracts link titles and URLs → returns as Quick Action pill candidates. See `SPEC.md` for full implementation approach.

---

### 10. DistroKid / distributor data — 0/10

**What exists:**
- Listed as "link paste + partner programme exploration" in the research doc
- No integration specced or built

**Why this stays at 0 for now:** No major distributor has a public API. DistroKid has no developer programme. The only path is ISRC-based metadata via MusicBrainz (specced in Part 7 of the research doc). MusicBrainz is an async background job, not a real-time import — and data quality for emerging UK artists is sparse.

**What to build instead:** An educational prompt in `start.html` or `admin.html`: "Are you registered with PRS for Music? Here's how to make sure you're getting paid." Zero technical cost, high artist value.

---

### 11. oEmbed proxy (Spotify, YouTube, SoundCloud, Bandcamp, Vimeo, Mixcloud) — 5/10

**What exists:**
- `netlify/functions/oembed-proxy.js` is built and handles YouTube, SoundCloud, Bandcamp
- Spec in `docs/systems/oembed-proxy/SPEC.md` (complete canonical spec)
- Supports Spotify oEmbed at `open.spotify.com/oembed`
- Vimeo and Mixcloud support specced

**What is missing:**
- Not deployed — the function exists but Netlify is not live yet
- Security: the spec (`oembed-proxy/SPEC.md §3`) identifies a URL allowlist gap — current regex-based check is insufficient against crafted URLs; must use parsed hostname validation before deploying
- No Bandcamp embed construction (Bandcamp has no oEmbed endpoint — requires URL parsing to construct the embed iframe)
- Rate limiting not implemented (spec calls for it)
- No caching layer (spec recommends 1-hour TTL)

**This is the highest-leverage V1 integration: one function, once deployed, unlocks rich embeds for Spotify, YouTube, SoundCloud, Bandcamp, TikTok across all ABLE pages.** Every snap card with a music URL depends on it.

**Path to 10:** Fix hostname allowlist security issue first. Deploy to Netlify. Implement caching. Score jumps to 9/10 immediately on deploy.

---

## Summary: Score by Category

| # | Integration | Current Score | Max Possible | Gap |
|---|---|---|---|---|
| 1 | Spotify import | 6/10 | 10/10 | Deploy + reconnect flow |
| 2 | YouTube oEmbed | 7/10 | 8/10 | Data API is a bonus, not required |
| 3 | SoundCloud oEmbed | 7/10 | 7/10 | Correct as-is |
| 4 | Bandcamp oEmbed | 7/10 | 7/10 | Correct as-is |
| 5 | Bandsintown gig import | 0/10 | 10/10 | Full build needed |
| 6 | Instagram link paste | 5/10 | 6/10 | UTM tracking only |
| 7 | TikTok link paste | 5/10 | 6/10 | UTM tracking only |
| 8 | Stripe payments | 2/10 | 10/10 | Full build (P2) |
| 9 | Linktree import | 0/10 | 10/10 | Full build needed |
| 10 | DistroKid/distributor | 0/10 | 3/10 | MusicBrainz async job only |
| 11 | oEmbed proxy | 5/10 | 9/10 | Fix security + deploy |

**Overall integrations system score: 4/10**
The infrastructure is sound (oEmbed proxy, Spotify function) but the three highest-leverage immediate actions are all undeployed or unbuilt: oEmbed proxy needs security fix + deployment, Ticketmaster events import needs building, and Linktree import needs building.

---

## Key Finding

**The oEmbed proxy is the single highest-leverage undeployed asset in the entire integrations stack.**

It already exists as `netlify/functions/oembed-proxy.js`. The canonical spec is at `docs/systems/oembed-proxy/SPEC.md`. One fix (hostname allowlist security) + one deployment unlocks rich embeds for Spotify, YouTube, SoundCloud, Bandcamp, Vimeo, and Mixcloud across every ABLE page. Every snap card, every release card, every top card media embed depends on this function being live.

This is a 1–2 hour task. The function is already written.

**Second finding: Bandsintown/Ticketmaster integration is completely missing from all active build files.**

For any artist with a touring presence — which is ABLE's primary audience — manually entering upcoming shows is painful, repetitive, and a conversion-killer during onboarding. An events auto-import (via Ticketmaster Discovery API) would:
- Require zero per-artist setup (single platform-wide API key)
- Return up to 20 upcoming shows with dates, venues, and ticket URLs
- Map directly to `able_shows` localStorage
- Eliminate the most time-consuming piece of manual onboarding

This is available and achievable. It should be built alongside the Spotify import, not after it.
