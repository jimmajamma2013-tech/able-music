# ABLE — Killer Features: Path to 10
**Created: 2026-03-16 | Status: ACTIVE — scoring milestones + implementation path**

---

## How to read this document

Each feature is scored at three points:
- **Now (0/10)** — current state
- **After V1 build** — what's achievable with localStorage only, no backend
- **After V2 build** — with Supabase + Netlify functions live

The path shows exactly what moves the needle and where the biggest jumps come from.

---

## Feature 1 — Auto-gig mode from calendar

### Current: 0/10

Nothing auto-activates. Manual toggle only. Artists forget. The feature exists; the activation mechanism is wrong.

### After V1 build: 8/10

What changes:
- `checkAutoGig()` runs on page load and every 60 seconds in `able-v7.html`
- Reads `able_shows` for today's shows, activates at `doorsTime`, deactivates 4 hours later
- Admin indicator: "On tonight — auto from your shows list." Source flag distinguishes manual vs auto
- "Turn on now" prompt when show is today but pre-doors

Why 8/10 not 10/10:
- Device clock can be wrong (no server-side time authority)
- Multiple shows same day requires priority logic edge case
- Artist notification (push/email) when auto-activates — not built until V2

### After V2 build: 9/10

What changes:
- Server-side time check via Supabase function (correct device clock drift)
- Push notification: "Gig mode activated — your page shows tonight's show."
- Edge case: show cancelled after doors time started (admin cancel override)

Why 9/10 not 10/10:
- 10/10 would require multi-venue same-day support and broadcast trigger (email fans "I'm on tonight") — that's a separate feature (tonight draft automation)

### Implementation path

Step 1 (admin.html): Add "Turn on now" prompt when `able_shows` has a show today.
Step 2 (able-v7.html + admin.html): Add `checkAutoGig()` function, wire to gig state resolver.
Step 3 (admin.html): Update gig mode indicator to show source (auto vs manual).
Step 4 (able-v7.html): Add `setInterval(checkAutoGig, 60000)` for real-time check during long sessions.
Step 5: Test edge cases — no doors time, multiple shows today, show in past.

Estimated build time: 2–3 hours.
No new dependencies.

---

## Feature 2 — Deep link campaigns

### Current: 0/10

All traffic looks identical. No campaign tagging. No section auto-scroll from external links. Analytics cannot distinguish Instagram Story traffic from TikTok traffic.

### After V1 build: 9/10

What changes:
- URL parameter parsing: `new URLSearchParams(window.location.search).get('campaign')`
- Campaign source injected into all event writes (fans, clicks, views)
- Section auto-scroll: map campaign type to section ID, smooth scroll on page load
- Contextual fan chip: non-intrusive, 5-second auto-dismiss, "You came from [campaign name]."
- Admin campaign link generator: UI to name + create + copy campaign URLs
- Analytics breakdown: visits/sign-ups/clicks segmented by campaign source

Why 9/10 not 10/10:
- V1 analytics are localStorage only — if the artist clears storage, data is lost
- No comparison view between campaigns (chart/table showing campaign A vs B)
- No UTM passthrough for Google Analytics / PostHog

### After V2 build: 10/10

What changes:
- Campaign events stored in Supabase (permanent, not browser-local)
- Campaign comparison charts in admin analytics
- UTM parameter generation alongside campaign parameter
- Campaign-specific hero copy override: artist writes custom line for each campaign

### Implementation path

Step 1 (able-v7.html): URL parameter parsing + section auto-scroll on load.
Step 2 (able-v7.html): Source injection into `writeFanSignup()`, `writeClick()`, `writeView()`.
Step 3 (able-v7.html): Contextual fan chip component (auto-dismiss, reduced-motion safe).
Step 4 (admin.html): Campaign link generator UI (name input, section picker, copy button).
Step 5 (admin.html): Analytics view extension — source breakdown table per campaign.

Estimated build time: 6–8 hours.
No new dependencies.

---

## Feature 3 — True Spotify pre-save

### Current: 0/10 (email only, wrongly labelled as pre-save in some contexts)

Email collection exists but is not a real Spotify pre-save. Fan hits "be first to know", types email, nothing goes to Spotify. The album does not appear in their library on release day.

### After V1 build: 4/10 (honest email collection)

What changes (V1 only — no Spotify OAuth yet):
- Copy correction: "Be first to know when it drops." — no fake "Pre-save" labelling until OAuth is live
- Fan confirmation email (already exists via `fan-confirmation.js`) mentions the release title
- Release date shown on confirmation: "We'll remind you on [date]."

Why only 4/10:
- Still no real Spotify integration
- The delta between honest email collection and true pre-save is large
- 4/10 reflects that it works for a subset of the value proposition (keeping fans informed) but misses the core mechanic (album in Spotify library on release day)

### After V2 build: 10/10

What changes:
- Spotify PKCE OAuth flow — no client secret exposed in browser
- Netlify function `spotify-presave.js` handles token exchange and stores in Supabase
- Netlify cron `spotify-presave-fulfil.js` runs on release date, adds album to each fan's Spotify library
- Admin: "X fans have pre-saved on Spotify" — real number
- Fan: "You're set. It goes straight to your library on [date]."
- Email captured from Spotify profile (fallback: request in UI)

### Implementation path

V1 (honest framing, 30 minutes):
- Audit all "pre-save" copy in `able-v7.html` and `admin.html`
- Replace with "Be first to know" until OAuth is live

V2 (3–5 days):
Step 1: Register Spotify Developer app, configure redirect URI.
Step 2: Build `spotify-presave.js` Netlify function (PKCE exchange, store token + fan data in Supabase).
Step 3: Build `spotify-presave-fulfil.js` cron function.
Step 4: Add Supabase `presaves` table, `spotifyUri` field on release model.
Step 5: Update fan-facing pre-save CTA in `able-v7.html` (OAuth trigger).
Step 6: Update admin pre-release stats to show real pre-save count.

---

## Feature 4 — "Tonight" draft automation

### Current: 0/10

No show-night content is generated. Artist has to write their own posts from scratch. ABLE has all the data (venue, time, ticket URL) but does nothing with it.

### After V1 build: 8/10

What changes:
- Show-day detection: if `able_shows` has a show today, admin surfaces "You're playing tonight."
- Draft generation: snap card draft + Instagram/TikTok caption, pre-filled from show data
- One-tap snap card publish via existing snap card write function
- Caption copy to clipboard

Why 8/10 not 10/10:
- No email broadcast (V2 — requires Resend)
- No scheduling ("post this at 2pm") — V2
- Draft quality depends on show data completeness (no venue name → weaker draft)

### After V2 build: 9/10

What changes:
- Email broadcast trigger: "Email your list at [time]?" — sends to fans via Resend
- AI draft improvement via `ai-copy.js` (already exists)
- Scheduling: send at optimal time (ABLE suggests based on fan engagement patterns — very V2)

### Implementation path

Step 1 (admin.html): Show-day detection on admin load.
Step 2 (admin.html): Tonight draft panel — shares bottom sheet infrastructure with one-tap announcement.
Step 3 (admin.html): Snap card draft write + caption copy.
Step 4: Test with shows data including missing optional fields (no doors time, no ticket URL).

Estimated build time: 3–4 hours (shares infrastructure with one-tap announcement — build together).

---

## Feature 5 — Fan location heatmap

### Current: 0/10

No location data collected. No map UI. No city-level intelligence.

### After V1 build: 2/10 (data collection only, no map)

What changes:
- Opt-in geolocation prompt on fan sign-up form: "Can we save your city? (Optional — helps the artist plan shows near you.)"
- `navigator.geolocation` — city-level only (reverse-geocode to city name, discard precise coordinates)
- City stored in `able_fans` entry: `{ email, ts, source, city: 'Manchester' }`
- Admin: text-only summary in fan list ("Manchester · London · Bristol")

Why only 2/10 in V1:
- localStorage cannot aggregate across sessions — city data only visible to the artist if they're on the same browser
- No map visualisation
- No tour routing intelligence

This V1 step is worth doing only to start collecting data. The display value is minimal until Supabase lands.

### After V2 build: 8/10

What changes:
- City stored in Supabase `fans` table with geolocation column
- Server-side aggregation: top cities by fan count
- Admin map: clean dot map showing fan concentration (lightweight Mapbox or canvas-based)
- "Your fans are concentrated in [City] — [X] people." prominent in dashboard
- Tier gate: Artist Pro

Why 8/10 not 10/10:
- Opt-in rates will be below 100% — map will always be partial
- City-level only (intentional for privacy) — less granular than postal area would be useful for venue capacity decisions

### Implementation path

V1 (2 hours):
- Add optional geolocation step to fan sign-up in `able-v7.html`
- Reverse-geocode via free Nominatim API (no key required)
- Store city in fan object

V2 (2–3 days):
- Supabase geolocation column
- Aggregation query
- Admin map component (Artist Pro tier gate)

---

## Feature 6 — Snap card read receipts

### Current: 0/10

No per-card view data. Artist has no idea how many fans read any given snap card.

### After V1 build: 5/10

What changes:
- `IntersectionObserver` on snap cards in `able-v7.html`: when card is 50% visible for >2 seconds, write a view event
- New event type stored in `able_clicks` (reuse existing key, new type): `{ type: 'card_view', cardId, ts, source }`
- Admin snap card list: "Seen by [X]" per card (count matching events from localStorage)

Why 5/10 not higher:
- localStorage-only means views only count if the fan visits on the same browser/device as the artist's account — not cross-device
- Small audiences will see low numbers (2, 3, 4 views) which can feel discouraging
- No time-range filtering (all time vs last 7 days)

### After V2 build: 8/10

What changes:
- View events stored in Supabase (cross-device, accurate)
- Admin: "Seen by 47 fans (last 7 days)" — relative framing reduces discouragement
- Engagement rate: "47 of your 340 fans read this" — percentage framing better than raw count

Why 8/10 not 10/10:
- True "read receipt" (complete read, not just scroll-past) is hard to measure on a scrollable page
- 10/10 would require scroll depth tracking per card — overkill

### Implementation path

V1 (3–4 hours):
- `IntersectionObserver` in `able-v7.html` snap card renderer
- Write card view events, keyed by card ID
- Admin snap card list: count events per card ID, display "Seen by [X]"

V2 (1–2 days):
- Supabase `card_views` table
- Server-side count query
- Time-range filtering in admin

---

## Feature 7 — One-tap release announcement

### Current: 0/10

Release goes live. ABLE does nothing. Artist has to write everything from scratch across every channel.

### After V1 build: 8/10

What changes:
- Release-live detection on admin load (release date passed, `announced` flag false)
- Admin announcement panel: "Your release is live. Let your fans know?"
- Draft generation: snap card, Instagram/TikTok caption — templated from release data
- Bottom sheet (existing component) with three tabs: Snap card / Caption / Email
- Snap card: one-tap publish
- Caption: copy to clipboard
- Email: copy draft (send locked at Artist tier, copy available on free)
- `announced` flag set, panel dismisses

Why 8/10 not 10/10:
- Email send is tier-locked in V1 (requires Resend)
- Draft quality is template-based, not AI-generated (though `ai-copy.js` exists for V2)
- No scheduling

### After V2 build: 9/10

What changes:
- Email broadcast trigger: Resend integration sends to fan list
- AI-improved draft: `ai-copy.js` function generates more specific copy from genre/feel/bio
- Scheduling: "Send at [time]" option

Why 9/10 not 10/10:
- 10/10 would include automatic social post scheduling (Instagram API — not ABLE's domain)

### Implementation path

Step 1 (admin.html): Release-live detection + `announced` flag logic.
Step 2 (admin.html): Announcement panel component (above Campaign HQ).
Step 3 (admin.html): Draft generation functions — snap card draft, caption draft.
Step 4 (admin.html): Bottom sheet with three tabs (existing component, new content).
Step 5 (admin.html): Snap card publish write + caption clipboard copy.
Step 6: Test with empty/partial release data (no description, no Spotify link).

Estimated build time: 5–7 hours.

---

## Feature 8 — QR code for gig-mode URL

### Current: 0/10

No QR code. Artists who want one use a third-party tool and generate a generic URL.

### After V1 build: 8/10

What changes:
- `qrcode.js` loaded from CDN (15kB)
- Admin gig mode panel: "Download QR code" button when gig mode is active or show is today
- QR encodes: `ablemusic.co/[slug]?mode=gig`
- Canvas element renders QR, exported as PNG download (or share sheet on mobile)
- Copy in admin: "Put this on your flyers. It takes people straight to tonight's show."

Why 8/10 not 10/10:
- Static PNG — if the artist cancels the show, the QR still points to gig mode
- No branded frame around the QR code (artist name, ABLE watermark) — nice but not P0
- Artist must still physically get the QR onto a flyer

### After V2 build: 9/10

What changes:
- Hosted QR page: `ablemusic.co/qr/[slug]` — always current state, scannable
- Branded QR with artist accent colour + name overlaid
- Dynamic QR that updates when show is cancelled

### Implementation path

Step 1: Add `qrcode.js` CDN include to `admin.html`.
Step 2 (admin.html): QR generation function, canvas render in gig mode panel.
Step 3 (admin.html): Download/share button — PNG export, mobile share sheet via Web Share API.
Step 4: Test on mobile (share sheet) and desktop (download).

Estimated build time: 2–3 hours.

---

## Summary: score trajectory

| Feature | Now | After V1 | After V2 | V1 build time |
|---|---|---|---|---|
| Auto-gig from calendar | 0 | 8 | 9 | 2–3h |
| Deep link campaigns | 0 | 9 | 10 | 6–8h |
| One-tap announcement | 0 | 8 | 9 | 5–7h |
| Tonight draft automation | 0 | 8 | 9 | 3–4h |
| True Spotify pre-save | 0 | 4 (honest framing) | 10 | 30min (V1) / 3–5d (V2) |
| Fan location heatmap | 0 | 2 (data collection) | 8 | 2h (V1) / 2–3d (V2) |
| Snap card read receipts | 0 | 5 | 8 | 3–4h |
| QR code gig-mode | 0 | 8 | 9 | 2–3h |

**Total V1 build time (all features): ~25–35 hours.**
**P0 only (auto-gig + deep links): ~9–11 hours.**

---

*See `FINAL-REVIEW.md` for build sequencing decision.*
