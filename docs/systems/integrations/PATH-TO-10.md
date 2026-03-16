# Integrations — Path to 10
**Date: 2026-03-16 | Current score: 4/10 | Target: 9/10**

> Prioritised fix list. P0 = blocks launch quality. P1 = ships in V1. P2 = V2. P3 = Phase 2+.
> All function code in `SPEC.md`. Analysis in `ANALYSIS.md`.

---

## P0 — Blocking (Build Before Launch)

### P0-1: Ticketmaster Discovery API — events auto-import
**Why P0:** For any artist with upcoming shows, manually entering events is a conversion-killer during onboarding. This eliminates that friction entirely with zero artist setup.
- Register for a free Ticketmaster Discovery API key (developer.ticketmaster.com)
- Set `TICKETMASTER_API_KEY` in Netlify environment variables
- Build `netlify/functions/ticketmaster-import.js` (full code in `SPEC.md §2.1`)
- Add "Import shows" button to `admin.html` shows manager
- Add artist name lookup step to onboarding — after Spotify import, offer "Import your shows →"
- Wire `mergeShows()` function to deduplicate against manually-entered shows
- Add "Shows via Ticketmaster" attribution below the imported events list

**Effort:** ~4 hours. API is free and well-documented. No per-artist setup.
**Impact:** Eliminates the biggest manual data entry task in onboarding.

---

### P0-2: Spotify import — deploy and make operational
**Why P0:** The function is built but the product is not deployed. No integration works until Netlify + ablemusic.co DNS is live.
- Deploy to Netlify
- Set `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` environment variables
- Apply for Extended Quota Mode in Spotify Developer Dashboard
- Verify `/v1/artists/{id}` endpoint is still live (Spotify has a history of undocumented deprecations)
- Test `start.html` import flow end-to-end

**Effort:** ~2 hours (mostly deployment config). Function code is complete.

---

## P1 — Ships in V1

### P1-1: Last.fm listener proxy
**Why P1:** Without this, admin.html has no reach metric to show artists. Spotify monthly listeners is unavailable. Last.fm is free, requires no per-artist setup, and returns a genuine 30-day listener count.
- Register for free Last.fm API key (last.fm/api)
- Set `LASTFM_API_KEY` in Netlify environment variables
- Build `netlify/functions/lastfm-lookup.js` — single call by artist name
- In `admin.html` stats area: show "X Last.fm listeners" with tooltip explaining what it is
- Do not show on public `able-v7.html` — admin only
- Fail silently if artist not found on Last.fm

**Effort:** ~2 hours. API is simple and well-documented.

---

### P1-2: Linktree import
**Why P1:** The majority of ABLE's acquisition targets are currently on Linktree. This removes the switching cost entirely.
- Build `netlify/functions/linktree-import.js` (full code in `SPEC.md §2.3`)
- Add Linktree paste option to `start.html` step 0 — alongside or as an alternative to Spotify import
- Build preview step: "We found [N] links. Pick the ones to keep."
- Map selected links to Quick Action pills in `able_v3_profile.ctaLinks`
- Copy: "Coming from Linktree? Paste your URL and we'll bring your links across."

**Effort:** ~4 hours. No Linktree API required — parses public HTML via `__NEXT_DATA__` JSON.
**Risk:** Linktree page structure could change. Build with fallback to "paste your links manually."

---

### P1-3: UTM parameter tracking for Instagram and TikTok
**Why P1:** Right now, ABLE cannot tell an artist how many fans came from Instagram vs TikTok vs direct. This is achievable without any API access.
- Add UTM parameter appending when artist copies their page link from admin.html
- "Copy Instagram link" → appends `?utm_source=instagram&utm_medium=bio`
- "Copy TikTok link" → appends `?utm_source=tiktok&utm_medium=bio`
- `able-v7.html` reads UTM on load, stores in `able_views` and `able_clicks`
- `admin.html` analytics: "Where your fans came from" breakdown

**Effort:** ~3 hours. Pure client-side JavaScript. No API required.

---

## P2 — V2 Improvements

### P2-1: Bandsintown opt-in connect (secondary to Ticketmaster)
- "Connect Bandsintown" flow in `admin.html` settings panel
- Artist generates API key from Bandsintown for Artists → pastes into ABLE settings
- ABLE calls `netlify/functions/bandsintown-import.js` (code in `SPEC.md §2.2`)
- Merges with Ticketmaster-imported and manually-entered shows
- Relevant for artists who already maintain their Bandsintown profile

**Effort:** ~3 hours. Depends on P0-1 (shows merge function).

### P2-2: YouTube Data API v3 — latest video import
- Register for YouTube Data API v3 key
- Build `netlify/functions/youtube-import.js`
- Artist pastes YouTube channel URL → ABLE fetches latest video, thumbnail, title
- Auto-creates video snap card in onboarding
- Enhancement only — oEmbed handles the core embed use case

**Effort:** ~4 hours.

### P2-3: Mailchimp / Kit fan export sync
- One-click "Export to Mailchimp" from `admin.html` fans page
- Also: Artist Pro auto-sync — new ABLE fan sign-up → Mailchimp audience updated
- Trust signal: data portability = artist trust
- Spec: separate `docs/systems/email/` directory

**Effort:** ~6 hours for basic export. ~12 hours for real-time sync.

---

## P3 — Phase 2+

### P3-1: Stripe Connect (payments infrastructure)
- Enables Close Circle support packs and Stage Can tips
- Complex: requires Stripe Connect, webhook handling, payout logic
- Must work before Close Circle section has real functionality
- Spec: `docs/apis/stripe.md`

### P3-2: Apple Music MusicKit JS
- Embed Apple Music player on profile
- Requires Apple Developer Program ($99/year)
- Low priority: Spotify + YouTube + SoundCloud cover the core streaming use case

### P3-3: Patreon patron count display
- `artist.stats.patrons` on public profile
- OAuth integration — artist authenticates with Patreon
- Artist Pro tier feature

### P3-4: Kickstarter live progress snap card
- Paste Kickstarter URL → ABLE fetches live funding %, days remaining, backer count
- Displays as progress bar on snap card
- Public Kickstarter API is available and well-documented

---

## What NOT to Build

| Integration | Why not |
|---|---|
| Facebook API | API access costs money + privacy concerns. Link paste is sufficient. |
| Twitter/X API | Free tier severely rate-limited since 2023. Not viable. |
| DistroKid API | No public API. No developer programme. |
| AI song generation (Suno, Udio) | ABLE artists create original music. Off-brand. Both under RIAA litigation. |
| Instagram API | App review required. Too much friction. Deprecated Basic Display API. |
| Any platform charging ABLE recurring API fees | ABLE is a low-margin product — integration costs must be near-zero |

---

## Revised Integration Priority Stack (from Part 8 of research doc)

Corrected from `MASTER_PLAN.md Section 16`:

1. **Ticketmaster Discovery API** — free, single key, events by name, zero per-artist setup (P0)
2. **Spotify Web API** — artist photos, top tracks, discography, genres (P0, deploy existing function)
3. **Linktree import** — Linktree page parse, no API (P1)
4. **Last.fm artist.getInfo** — reach proxy + bio text (P1)
5. **YouTube Data API v3** — latest video auto-import (P2)
6. **Bandsintown** — opt-in secondary events source (P2)
7. **Mailchimp/Kit export** — data portability trust signal (P2)

---

## Score Projection

| After | Expected score |
|---|---|
| P0 complete (Ticketmaster + Spotify deployed) | 6.5/10 |
| P1 complete (Last.fm + Linktree + UTM) | 8/10 |
| P2 complete (Bandsintown + YouTube + email export) | 9/10 |
| P3 complete (Stripe + Apple Music) | 9.5/10 |
