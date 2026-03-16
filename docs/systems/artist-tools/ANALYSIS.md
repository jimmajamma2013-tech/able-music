# Artist Tools — Current State Analysis
**Date: 2026-03-16 | File: admin.html | Authority: Primary build reference**

> Audit of every tool available to artists in admin.html. Score = current implementation quality.
> Companion: `SPEC.md`, `PATH-TO-10.md`, `FINAL-REVIEW.md` in this directory.

---

## What this file is

A scored, function-level audit of every tool in `admin.html`. Each tool is assessed against what a 10/10 version would look like at V1 launch quality.

---

## Tool Scores

### 1. Campaign HQ (page state control) — 8/10

**What's working:**
- Four states (profile / pre-release / live / gig) all implemented
- State buttons with spring animation (min-height 56px)
- Auto-switch logic: `computeAutoState()` correctly reads release date
- Gig toggle with 24-hour expiry, countdown bar (C16) with tick every 1s
- Release date picker + title field
- Timeline arc renders relative to current date and release window
- State pill in header updates to reflect active state
- Accent left border changes by state (pre = amber, live = red, gig = orange)
- Mini phone preview (desktop only, iframe, aria-hidden)
- Auto-switch hint copy: "Switches to Live automatically on [date]"

**What's missing:**
- No visual confirmation after releasing a state change beyond the pill update — a subtle toast or card flash would reinforce the action
- The gig countdown bar depletion is specced but no animation easing on bar fill — bar jumps on first render
- No "quick test" button to preview what a fan sees in each state without navigating to the live page
- The timeline arc has no milestone markers (e.g., "7 days out", "today", "2 weeks in") — currently just a arc with a position dot

**Path to 10:** Add state-change confirmation toast. Smooth countdown bar animation. Add milestone markers to timeline arc (low-effort improvement, high visual clarity).

---

### 2. Fan list + export — 8/10

**What's working:**
- Fan list renders with: email, timestamp, source badge (Instagram/Spotify/TikTok/Direct), relative time
- Stagger entrance animation (D13 — first load)
- "New" badge for fans signed up within 24 hours
- Export as CSV button — always visible at bottom of Fans page
- "These emails are yours. ABLE never contacts your fans without your permission." note
- Filter pills: All / Instagram / Spotify / TikTok / Direct
- Source breakdown bars (visual % breakdown by source)
- Fan detail sheet: opens on tap, shows email, source, timestamp
- Fan counter animation on first load (G14)
- Streak signal nudge (5+ view days in last 7)

**What's missing:**
- Starring fans is in `able_starred_fans` localStorage key but no star toggle in the current fan row UI (the spec mentions it, the storage key exists, but the UI element is not confirmed as wired)
- No "most engaged fans" or superfan scoring — that's Artist Pro, but not even behind a gate currently
- No search/filter by email (for lists >50 fans this becomes important)
- Fan support pack summary is specced (`renderFanSupportPacksSummary`) but Close Circle is not connected to Stripe — so it renders empty
- No "fans who came from Instagram this week" smart summary

**Path to 10:** Wire star toggle in fan row UI. Add email search for large lists. "Top fans" section (even as a static list sorted by sign-up date) behind Pro gate.

---

### 3. Snap card manager (add/edit/delete/reorder) — 8/10

**What's working:**
- CRUD fully implemented: `addSnapCard`, `removeSnapCard`, `toggleSnapPublished`, `toggleSnapEdit`, `saveSnapCard`, `moveSnapCard`
- Card types supported (text, link, image, video)
- Published/unpublished toggle per card
- Reorder via up/down arrows
- oEmbed auto-fill for YouTube/SoundCloud URLs via `autoFillFromUrl()`
- Preview of embed when URL is pasted
- Free tier limit (1 snap card) is correctly gated

**What's missing:**
- No drag-and-drop reorder — up/down arrows work but are less intuitive than drag
- No duplicate card function (useful for artists creating similar cards)
- No "card preview" within admin — artist must open the live page to see how the card looks to a fan
- Snap card count display ("3 of ∞ snap cards") not confirmed as rendered
- AI copy suggestions are wired (`aiSuggestCta`) but it's not clear if they surface in the snap card editing flow specifically

**Path to 10:** Add card preview thumbnail in admin. Add drag-to-reorder (touch-friendly). Surface AI copy suggestions in card edit view.

---

### 4. Shows manager — 6/10

**What's working:**
- Add show: venue, date, doors time, ticket URL, featured toggle
- Remove show with confirmation
- Shows list renders with all fields
- Save to `able_shows` localStorage
- Featured toggle for "headline" show promotion

**What's missing:**
- No events import (Ticketmaster or Bandsintown) — every show must be entered manually (see `docs/systems/integrations/`)
- No sorting by date — shows display in entry order, not chronological
- No "past shows" auto-archiving — expired shows stay in the list until manually removed
- No ticket URL validation (accepts any string, including non-URLs)
- No "add to Google Calendar" / calendar export for fans — this is a fan-facing feature but requires the data to be clean
- No support for multi-day festivals or recurring events
- Featured show does not have a dedicated visual treatment in the admin list

**Path to 10:** Add date-sorted rendering. Add past show auto-archiving (shows older than today hidden by default, collapsible). Integrate Ticketmaster import (P0 in integrations). Ticket URL validation.

---

### 5. Music/releases manager — 7/10

**What's working:**
- Add/remove releases (`addRelease`, `removeRelease`)
- Fields: title, release type (album/EP/single), release date, artwork URL, platform links
- Track listing within each release (`addTrack`, `removeTrack`, `updateTrack`)
- Credits within each release (`addCredit`, `removeCredit`, `updateCredit`)
- oEmbed auto-fill: paste Spotify/YouTube/SoundCloud URL → title, artwork fill
- Embed preview when URL is pasted (`showEmbedPreview`)
- Save all to localStorage

**What's missing:**
- No Spotify import of full discography — the Spotify function returns top tracks but admin doesn't pull the full release history
- No "latest release" concept — all releases are equal weight; the fan-facing profile picks the most recent by date but admin doesn't make this explicit
- Credits system is manual entry only — no MusicBrainz lookup or peer-confirm flow (Phase 2)
- No release status indicators (upcoming / just released / archive)
- Track preview player (30-second Spotify preview URL is in the import payload but no player UI in admin)
- Character limit on title/track name fields is not enforced

**Path to 10:** Add "set as latest release" explicit control. Add release status badges (upcoming / live / archive). Wire Spotify discography import from the existing function payload. Add 30s preview player for imported tracks.

---

### 6. Merch manager — 6/10

**What's working:**
- Merch shop URL input (link to Shopify/Bandcamp/etc)
- Individual merch item CRUD: add, remove, update fields (name, price, image URL, buy URL)
- Save to localStorage via `saveAllMerch()`

**What's missing:**
- No Shopify Storefront API integration — items must be entered manually (prices, images, buy links)
- No image upload for merch items — only URL input, which requires an externally hosted image
- No "sold out" toggle per item
- No item reordering (unlike snap cards, which have up/down arrows)
- No stock indicator field
- Merch items display order in admin does not mirror fan-facing order confirmation
- The Big Cartel API (well-documented, similar to Shopify) is not wired

**Path to 10:** Add reorder arrows to merch items. Add sold-out toggle. Shopify/Big Cartel import is a P2 feature (spec in `docs/reference/research/INTEGRATIONS_AND_AI_RESEARCH.md §4`). Basic quality improvements are achievable without API work.

---

### 7. Support (Close Circle) setup — 5/10

**What's working:**
- Close Circle toggle (enabled/disabled)
- Support pack CRUD: add, remove, update (name, price, description)
- Thank-you note / message to supporters field
- `saveCloseCircle()` persists to localStorage
- "0% taken by ABLE. Stripe standard fee only" copy confirmed present

**What's missing:**
- No Stripe wiring — Close Circle cannot process actual payments; it is a UI shell
- No Stripe Connect onboarding for artists (they need to connect their bank account)
- Support pack prices are stored as strings — no currency/format validation
- No preview of what the support section looks like to a fan from admin
- `renderFanSupportPacksSummary()` exists but renders empty (no Stripe data)
- No "test payment" flow for the artist to verify their setup
- No notification to artist when they receive support (Stripe webhook not built)

**Score note:** 5/10 because the UI and data model are correct, but the product doesn't actually work without Stripe. This is a known P2 item in `docs/STATUS.md`.

**Path to 10:** Stripe Connect setup flow (P2). Until then, add a clear "Payments setup required" state in the Close Circle section so artists understand it's not yet operational.

---

### 8. Analytics view — 6/10

**What's working:**
- Stats counters: views, clicks, fans, click rate — with counter animation (G14)
- Sparklines (7-day trend lines) — hidden until 3+ days of data
- Day-1 zero state with "Day 1 ✦" label in amber (not "0 views" which feels bad)
- Activity feed: `loadActivityFeed()` — recent events (fan sign-up, CTA click, page view)
- Top clicks list (which CTAs are getting tapped most)
- Streak signal nudge (5+ days of views)
- Source breakdown on fan list (Instagram/TikTok/Direct)
- Delta labels: "+X today" per stat

**What's missing:**
- No PostHog integration — analytics are localStorage-only, which means data is per-device and lost on clear/new device
- No time-range selector — always shows "all time" with no way to filter to last 7 days, 30 days, etc.
- No geographic breakdown (where fans are from)
- No conversion funnel view (views → CTA clicks → fan sign-ups)
- No comparison period ("this week vs last week")
- UTM source tracking is not wired — can't distinguish Instagram traffic from direct
- Clicks tracking currently logs all CTA clicks but the click rate calculation is views/clicks — not segmented by CTA type
- No export of analytics data (CSV of views/clicks/fans by day)

**Path to 10:** UTM tracking (P1 in integrations — 3-hour build). PostHog integration (`docs/apis/posthog.md`). Time-range selector on analytics page (P1). Conversion funnel card (P2).

---

### 9. Section order + visibility — 8/10

**What's working:**
- All sections toggleable (visible/hidden): `toggleSectionVis()`
- Section reorder: `moveSectionOrder()` — up/down arrows
- Order persists to `able_v3_profile.sectionOrder`
- Visibility persists to `able_v3_profile.hiddenSections`
- `renderSectionOrder()` renders the current order correctly
- Change propagates to `able-v7.html` via shared localStorage key

**What's missing:**
- No drag-to-reorder (up/down arrows work but less intuitive)
- No preview of how the reorder looks without visiting the live page
- No "reset to default order" option
- Sections that have no content (e.g. empty merch section) don't have a visual indicator in the order list — easy to have a visible-but-empty section showing to fans

**Path to 10:** Add "empty" badge to sections with no content in the order list. Add reset to default button.

---

### 10. Connections (platform links) — 7/10

**What's working:**
- Platform link fields: Spotify, Instagram, TikTok, YouTube, SoundCloud, Bandcamp, etc.
- `savePlatformLinks()` debounced save
- `hydratePlatformFields()` reads from profile
- Links appear as platform pills on `able-v7.html`
- All mutations call `syncProfile()` (fixed in session 6)

**What's missing:**
- No URL validation — any string accepted, including invalid URLs
- No "paste and detect" — artist must know which field corresponds to which platform
- No RA (Resident Advisor) field — specifically relevant for electronic/club artists
- No Twitch field
- Platform pills on the live page appear from the connections here, but the Connections admin page doesn't show a preview of what pills will appear
- Copy link button on live page and admin slug copy both confirmed working

**Path to 10:** Add URL validation per field (debounced, inline). Add RA and Twitch fields. Preview of active pills.

---

### 11. Profile identity (genre/feel/accent) — 7/10

**What's working:**
- Genre selector: `identityChangeGenre()`
- Feel selector: `selectFeel()` — applies `data-feel` to profile
- `updateIdentityPreview()` renders a live mini-preview using the current vibe settings
- AI bio suggestions: `aiSuggestBio()` — calls `netlify/functions/ai-copy.js`
- AI CTA suggestions: `aiSuggestCta()`
- Nudge hints update based on completeness of profile: `updateNudgeHint()`
- Accent colour from profile applied as `--artist-accent` CSS variable across admin

**What's missing:**
- The AI copy functions (`ai-copy.js`) exist and are specced but the Netlify function requires `ANTHROPIC_API_KEY` — not set in any documented environment variable setup
- No colour picker for accent — colour is set via Spotify import or wizard, but admin.html doesn't have an accent colour picker for post-wizard editing
- The feel system has 7 vibes but the admin identity card doesn't surface the `data-feel` visual effect in its preview — artist can't see how the feel changes their profile appearance
- No "reset to defaults" option for identity settings

**Path to 10:** Add accent colour picker (inline, hex input with preview swatch). Add `ANTHROPIC_API_KEY` to Netlify environment variable setup checklist. Show `data-feel` effect in the admin preview.

---

### 12. Broadcasts (Pro tier) — 4/10

**What's working:**
- Broadcasts page exists in admin navigation
- Pro tier gate is present — page shows locked state for non-Pro users
- Broadcast compose UI is behind the gate (shown in preview)

**What's missing:**
- Resend API is specced (`docs/apis/resend.md`, `docs/systems/email/SPEC.md`) but not wired
- No send infrastructure — broadcast compose exists but cannot actually send emails
- `netlify/functions/fan-confirmation.js` handles sign-up confirmation emails but there is no broadcast-send Netlify function
- No draft save for broadcasts in progress
- No send confirmation or "preview email" step before sending
- No delivery tracking (opens, clicks) — would require Resend webhook integration
- The specced copy for broadcasts in `docs/systems/email/SPEC.md` is complete but none of it is wired to a send function

**Score note:** 4/10 because the UI shell and gate are correct, but the feature genuinely doesn't work. This is honest — not a criticism, just the current state.

**Path to 10:** Build `netlify/functions/broadcast-send.js` using Resend API. Wire the compose UI to this function. Add preview step. Set `RESEND_API_KEY` in Netlify environment variables. This is a P2 feature per `docs/STATUS.md`.

---

### 13. Your World (moments/calendar) — 6/10

**What's working:**
- Moments list: `ywRenderMomentList(profile)` renders all saved moments
- Add moment: `ywSaveMoment()` — type, date, title, note fields
- Remove moment: `removeMoment(id)`
- Moments persist to `able_v3_profile.moments` array
- Moment types appear to include: release, gig, anniversary, milestone, other
- `ywInit(profile)` initialises the panel

**What's missing:**
- No visual calendar view — moments are a list, not a calendar grid
- No integration with gig mode — adding a gig-type moment doesn't auto-trigger gig mode toggle
- No "next moment" display on the admin home page (admin home shows greeting and stats but not "your next show is in X days")
- No fan-facing display of moments (the world map on `able-v7.html` shows a calendar view but it's unclear if admin moments feed into it directly)
- No moment editing — remove only, no edit in place
- No recurring moment type (e.g. "I release every Friday")

**Path to 10:** Add "next moment" display on admin home. Wire moment types to profile state suggestions ("You have a release moment — should we switch to pre-release mode?"). Add edit-in-place.

---

## Summary: Admin Tool Scores

| # | Tool | Score | Primary gap |
|---|---|---|---|
| 1 | Campaign HQ | 8/10 | Toast on state change, timeline markers |
| 2 | Fan list + export | 8/10 | Star toggle UI, email search for large lists |
| 3 | Snap card manager | 8/10 | Drag reorder, card preview in admin |
| 4 | Shows manager | 6/10 | No events import, no date sorting |
| 5 | Music/releases manager | 7/10 | No discography import, no release status |
| 6 | Merch manager | 6/10 | No API import, no reorder, no sold-out toggle |
| 7 | Support (Close Circle) | 5/10 | Stripe not wired — functionally incomplete |
| 8 | Analytics | 6/10 | No UTM tracking, no time-range filter |
| 9 | Section order + visibility | 8/10 | Empty-section badges, reset option |
| 10 | Connections | 7/10 | URL validation, RA/Twitch fields |
| 11 | Profile identity | 7/10 | Accent picker, ANTHROPIC_API_KEY gap |
| 12 | Broadcasts | 4/10 | Send function not built |
| 13 | Your World | 6/10 | Calendar view, moment editing, state integration |

**Overall admin toolset score: 6.8/10**
Strong core (Campaign HQ, fan list, snap cards) but significant gaps in three areas: events import, payments, and analytics.
