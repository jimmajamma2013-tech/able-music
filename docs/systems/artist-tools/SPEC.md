# Artist Tools — Manifest Spec
**Date: 2026-03-16 | File: admin.html | Authority: Primary build spec**

> What every tool in admin.html should do at 10/10.
> Analysis in `ANALYSIS.md`. Priority fixes in `PATH-TO-10.md`.

---

## Purpose Statement

Admin.html is the artist's daily home. Every tool in it serves one of three jobs:
1. **See** — know what's happening with your page and fans
2. **Control** — change what fans experience
3. **Act** — take the next useful step

A 10/10 admin.html never makes the artist feel like they're configuring software. It feels like talking to someone who knows their situation and asks the right question.

---

## 1. Campaign HQ

**Purpose:** Artist controls their page state — what fans experience when they visit.

**V1 scope (must work at launch):**
- Four states: profile / pre-release / live / gig
- State switch with spring animation (280ms, `--spring` easing)
- Auto-switch on release date (computed by `computeAutoState()`)
- Gig mode: 24-hour countdown with live-ticking bar (updates every 1 second)
- Timeline arc showing position relative to release window
- Auto-switch hint: "Switches to Live automatically on [date]"
- State pill in header (shows current state, colour-coded)
- Accent left border changes by state: amber (pre), red (live), orange (gig)
- Mini phone preview (desktop only, aria-hidden)
- Toast on state change: "Profile mode." / "Pre-release." / "Live." / "Gig mode on."

**V2 improvements:**
- Timeline arc with milestone markers (7 days out, release day, 7 days in, 14 days in)
- "Quick preview" button — opens live page in a side-by-side pane showing that state
- "What does this mean for fans?" tooltip on each state button

**Bugs and gaps to fix:**
- Countdown bar should animate to current fill on mount (not jump). Use a 300ms transition after a 50ms delay.
- State change needs a toast confirmation (currently only the pill updates — no feedback for mobile where the pill may be off-screen)

---

## 2. Fan List + Export

**Purpose:** Artist sees who has joined their list and can take action on that data.

**V1 scope:**
- Fan rows: email, timestamp (relative: "3 hours ago"), source badge
- Filter pills: All / Instagram / Spotify / TikTok / Direct
- "New" badge (24h) per fan row
- Source breakdown bar (% visual breakdown)
- Export as CSV: `email,timestamp,source` — always accessible on free tier
- "These emails are yours." note — always visible
- Star toggle per fan row (writes to `able_starred_fans`)
- Fan detail sheet on tap: email, source, full timestamp, copy email button

**V2 improvements:**
- Search/filter by email (important for lists >50)
- "Your most dedicated fans" section (starred fans first, then sort by — Artist Pro gate)
- Superfan score column (Artist Pro gate)
- Date-range filter ("fans this week", "fans this month")

**Bugs and gaps to fix:**
- Confirm star toggle is wired to UI — `able_starred_fans` key exists in localStorage spec but the star icon in the fan row is not confirmed as connected
- Fan support pack summary (`renderFanSupportPacksSummary`) renders empty until Stripe is wired — add "Support packs: coming soon" placeholder instead of empty div

---

## 3. Snap Card Manager

**Purpose:** Artist creates and manages the snap cards that appear on their profile.

**V1 scope:**
- Card types: text, link, image, video (oEmbed)
- CRUD: add, remove, toggle published/unpublished, edit, save
- Reorder with up/down arrows
- oEmbed auto-fill for YouTube/SoundCloud URLs
- Embed preview on URL paste
- Free tier gate: 1 snap card (with pro blur overlay for cards 2+)
- Published/unpublished toggle per card (fan sees only published)
- Empty state: ABLE voice ("Your snap cards live here. Think of them as posts that don't disappear.")

**V2 improvements:**
- Drag-to-reorder (touch-friendly — replaces up/down arrows)
- Duplicate card function
- Mini card preview thumbnail within admin (shows approximate fan view)
- AI copy suggestion in card edit view (surface `aiSuggestCta()` here)

**Bugs and gaps to fix:**
- Confirm AI copy suggestions (`aiSuggestCta()`) surface in snap card edit flow — the function exists but it's not confirmed wired to the snap card UI
- Card preview within admin would prevent unnecessary round-trips to the live page

---

## 4. Shows Manager

**Purpose:** Artist manages their upcoming shows so fans can discover and buy tickets.

**V1 scope:**
- Manual add show: venue, city, date, doors time, ticket URL, featured toggle
- Remove show (with undo option, 5-second window)
- Date-sorted list (chronological, ascending)
- Past shows auto-hidden (shows with date < today collapsed by default, expandable)
- Ticket URL validation (must start with http:// or https://)
- Featured show gets a distinct visual treatment in admin list (amber left border)
- Empty state: ABLE voice ("No shows yet. When you add one, fans on your page will see it straight away.")

**V2 improvements:**
- Ticketmaster import ("Import shows" button — `netlify/functions/ticketmaster-import.js`)
- Bandsintown opt-in connect flow (secondary, for artists with existing Bandsintown account)
- Multi-date support for festivals
- "Add to calendar" export (.ics) per show for artist's own use

**Bugs and gaps to fix:**
- Shows currently display in entry order, not chronological — add date sort on render
- No ticket URL validation — accepts any string
- Past shows don't auto-archive — they stay in the list indefinitely
- Featured toggle exists but no distinct visual treatment in admin (only on fan-facing profile)

---

## 5. Music/Releases Manager

**Purpose:** Artist manages their releases so fans can discover and stream them.

**V1 scope:**
- Release CRUD: add, remove, update
- Fields: title, type (album/EP/single/live), release date, artwork URL, platform links
- Track listing per release: add/remove/reorder tracks, with title and stream URL
- Credits per release: add/remove, with role and name
- oEmbed auto-fill: paste Spotify/YouTube/SoundCloud URL → fills title, artwork
- Embed preview on URL paste
- Release status badges: upcoming / live / archive (computed from release date)
- "Latest release" concept — explicit pin or auto from most-recent date

**V2 improvements:**
- Spotify discography import (pull from wizard import payload — artist already connected Spotify in onboarding)
- 30-second preview player for imported Spotify tracks (preview_url from Spotify API)
- MusicBrainz credits lookup (async enrichment job — fills known credits from public database)
- Per-release analytics (which releases get the most clicks)

**Bugs and gaps to fix:**
- No release status indicators (upcoming/live/archive) — all releases treated equally
- No explicit "set as latest release" control — profile picks by date automatically but artist can't override
- No character limits enforced on title/track name fields
- Spotify discography import is in the function payload (`/v1/artists/{id}/albums`) but admin doesn't pull or display it

---

## 6. Merch Manager

**Purpose:** Artist manages their merch items so fans can buy directly.

**V1 scope:**
- Merch shop URL: link to Shopify/Bandcamp/other external shop
- Individual merch item CRUD: add, remove, update
- Fields: name, price, image URL, buy URL, sold-out toggle
- Reorder items with up/down arrows (matches snap card UX pattern)
- Empty state: ABLE voice ("Nothing here yet. Paste a link to your shop, or add items one by one.")

**V2 improvements:**
- Shopify Storefront API import (Artist tier) — pull featured products: image, price, buy URL
- Big Cartel API import (same pattern as Shopify, different endpoint)
- Gumroad import (for digital products: sample packs, stems, behind-the-scenes)
- Sold-out items visually de-emphasised (grey, "Sold out" badge)

**Bugs and gaps to fix:**
- No reorder arrows on merch items (snap cards have them, merch doesn't — inconsistency)
- No sold-out toggle per item
- Image URL field only — no upload (requires hosted image). Fine for V1, note in UX.

---

## 7. Support / Close Circle Setup

**Purpose:** Artist enables their Close Circle so dedicated fans can support them directly.

**V1 scope (what must work at V1):**
- Enable/disable Close Circle toggle
- Support pack CRUD: name, description, price
- Thank-you message to supporters
- "0% taken by ABLE. Stripe standard fee only." always visible
- "Payments setup required" state — shown when Close Circle is enabled but Stripe not connected
- Stripe Connect setup link (external — Stripe's onboarding flow)
- After Stripe Connect: test payment capability

**V2 improvements:**
- Full Stripe Connect flow in admin (no redirect — embedded)
- Payout history view
- Supporter notification ("A fan just supported you")
- Delivery tracking for digital support packs

**Bugs and gaps to fix (critical):**
- Currently Close Circle is a UI shell. No Stripe wiring. The "Payments setup required" state should be shown immediately when Close Circle is enabled, so artists understand it's not operational.
- `renderFanSupportPacksSummary()` renders empty — replace with placeholder until Stripe is live
- Price fields accept any string — add currency/format validation

**Copy for "payments setup required" state:**
```
You've set up your support packs.
Now connect Stripe to start receiving payments.
0% taken by ABLE. Stripe standard fee only.

[Connect Stripe →]
```

---

## 8. Analytics

**Purpose:** Artist understands how their page is performing and where their fans are coming from.

**V1 scope:**
- Page views: total + today delta + 7-day sparkline
- CTA clicks: total + today delta + 7-day sparkline
- Fan sign-ups: total + today delta + 7-day sparkline
- Click rate: clicks/views as %
- Day-1 zero state: "Day 1 ✦" in amber (not "0 views")
- Sparklines hidden until 3+ days of data
- Activity feed: recent events (sign-up, click, view) with relative time
- Top CTAs: which links/buttons get tapped most
- Source breakdown on fans page (extends to analytics)

**V2 improvements:**
- Time-range selector: 7 days / 30 days / all time
- Conversion funnel view: views → clicks → sign-ups with % at each step
- UTM source breakdown: how many visitors came from Instagram vs TikTok vs direct
- PostHog integration (`docs/apis/posthog.md`) — persistent cross-device analytics
- Weekly summary email to artist ("Here's how your page did this week")
- CSV export of analytics data by day

**Bugs and gaps to fix:**
- No UTM tracking — source attribution is "unknown" for most visits. UTM implementation is a P1 item (see `docs/systems/integrations/PATH-TO-10.md P1-3`)
- Sparklines hidden for first 72 hours of data — correct behaviour but could show a message: "Sparklines appear after 3 days of data"
- Click rate calculation: currently `clicks/views` — should be unique CTA click rate, not raw ratio

---

## 9. Section Order + Visibility

**Purpose:** Artist controls which sections appear on their profile and in what order.

**V1 scope:**
- Toggle visibility per section: music, events, merch, snap cards, support, recommendations
- Reorder sections with up/down arrows
- Order and visibility persist to `able_v3_profile.sectionOrder` and `.hiddenSections`
- Changes propagate to fan-facing profile in real time (via shared localStorage)
- "Empty" badge on sections that have no content (visible to fans but empty)
- Reset to default order button

**V2 improvements:**
- Drag-to-reorder (consistent with snap cards)
- "Preview this order" button (shows live page in current order without navigating away)

**Bugs and gaps to fix:**
- Sections with no content show a visible section header to fans (empty music section says "Music" with nothing below it) — the "empty" badge in admin would help artists catch this before it goes live
- No reset to default — artist who reorders can't easily get back to the recommended order

---

## 10. Connections (Platform Links)

**Purpose:** Artist lists their platforms so fans can find them everywhere.

**V1 scope:**
- Platform fields: Spotify, Instagram, TikTok, YouTube, SoundCloud, Bandcamp, Apple Music, Twitter/X, Discord, Facebook
- Additional fields: RA (Resident Advisor — critical for electronic/club artists), Twitch, Patreon
- URL validation per field (debounced, inline — "That doesn't look like a Spotify URL")
- Paste-and-detect: paste any URL → auto-detect platform and fill correct field
- Preview of active pills (which pills will show on the live page based on filled fields)
- All mutations debounced and call `syncProfile()`

**V2 improvements:**
- "Import from Linktree" shortcut — paste Linktree URL, detect platform links, auto-fill fields
- QR code for page link (confirmed as built via `renderQR()` / `downloadQR()`)

**Bugs and gaps to fix:**
- No URL validation — any string accepted
- No RA field — Resident Advisor is a first-class credibility signal for electronic/club/DJ artists
- Preview of active pills not shown in Connections panel

---

## 11. Profile Identity (Genre/Feel/Accent)

**Purpose:** Artist sets the aesthetic of their profile — the colour, genre, and feel that make it unmistakably theirs.

**V1 scope:**
- Accent colour picker: hex input with live preview swatch + 8 preset colour swatches
- Genre selector: dropdown or chip selector from the 20+ genre options
- Feel selector: 7 vibes (electronic / hiphop / rnb / indie / pop / rock / folk) with visual preview
- `data-feel` effect shown in admin preview (not just in name — the visual effect)
- AI bio suggestions: `aiSuggestBio()` — 3 variants, artist can use/dismiss
- AI CTA suggestions: `aiSuggestCta()`
- Nudge hints based on profile completeness
- All changes call `syncProfile()` and propagate to live page

**V2 improvements:**
- Brand colour extraction from artwork (dominant colour from uploaded artwork → suggest as accent)
- More feel variants (genre-specific sub-vibes)

**Bugs and gaps to fix:**
- No accent colour picker in admin — accent is set in wizard but can't be changed in admin after. This is a missing feature for artists who want to update their brand colour.
- AI copy functions require `ANTHROPIC_API_KEY` in Netlify environment variables — this is not documented in the environment variable setup checklist. Add it.
- `data-feel` effect is not previewed in admin identity card — artist can't see how it changes their profile look

**Accent colour picker implementation:**
```html
<div class="accent-picker-row">
  <div class="accent-presets">
    <!-- 8 swatches: coral, amber, blue, green, purple, red, pink, cyan -->
    <button class="acc-swatch" style="--c:#e05242" onclick="setAccent('#e05242')"></button>
    <!-- ... etc -->
  </div>
  <label class="acc-custom">
    <input type="color" id="accentInput" value="#e05242" oninput="setAccent(this.value)">
    <span class="acc-hex" id="accentHex">#e05242</span>
  </label>
</div>
```

---

## 12. Broadcasts (Pro Tier)

**Purpose:** Artist sends email messages to their fan list directly from ABLE.

**V1 scope (what must work at launch for Pro tier):**
- Compose: subject, body (rich text or plain text), from name
- Recipient count preview: "This will go to [N] fans"
- Preview email step: artist reviews before sending
- Send via `netlify/functions/broadcast-send.js` using Resend API
- Sent history: list of past broadcasts with date and recipient count
- Pro tier gate with specific value prop: "Broadcasts let you message your fans directly — no algorithm, no feed. Artist Plan, £9/month."

**V2 improvements:**
- Delivery tracking (open rate, click rate) via Resend webhooks
- Draft save
- Schedule future send
- Segment by source (Instagram fans only, fans from last 30 days, etc.)
- Test send to artist's own email before broadcast

**Bugs and gaps to fix:**
- `netlify/functions/broadcast-send.js` does not exist — this is the core build
- `RESEND_API_KEY` not documented in environment variable checklist — add it
- Spec in `docs/systems/email/SPEC.md` is complete but not wired to any function
- No draft save — artist can lose work if they navigate away mid-compose

---

## 13. Your World (Moments/Calendar)

**Purpose:** Artist tracks their important milestones — releases, shows, anniversaries — and uses them to tell a story.

**V1 scope:**
- Moment CRUD: add, edit, remove
- Types: release, gig, anniversary, milestone, personal, other
- Fields: type, date, title, note (optional)
- List view: chronological, with relative dates and type icons
- "Next moment" display on admin home page (e.g. "Next: Manchester Academy — 11 April")
- State integration nudge: adding a release-type moment offers "Switch to pre-release mode →"
- Adding a gig-type moment for today offers "Turn on gig mode →"

**V2 improvements:**
- Calendar grid view (month view with dots on event days)
- Fan-facing moments timeline on `able-v7.html` (world map section)
- Recurring moments (e.g. "I release every Friday")
- Moments shared as snap cards (one tap: "Share this milestone as a snap card")

**Bugs and gaps to fix:**
- No moment editing (remove only) — add edit-in-place with the same form as add
- "Next moment" is not displayed on admin home — the greeting sub-line only references gig mode and release dates from Campaign HQ, not the moments list
- No state integration — a gig-type moment doesn't offer to enable gig mode, even when the date is today

---

## Environment Variables Required for Full Tool Functionality

| Variable | Service | Enables |
|---|---|---|
| `SPOTIFY_CLIENT_ID` | Spotify | Spotify artist import |
| `SPOTIFY_CLIENT_SECRET` | Spotify | Spotify artist import |
| `TICKETMASTER_API_KEY` | Ticketmaster | Shows auto-import |
| `LASTFM_API_KEY` | Last.fm | Reach proxy metric |
| `ANTHROPIC_API_KEY` | Anthropic | AI bio + CTA copy suggestions |
| `RESEND_API_KEY` | Resend | Fan confirmation emails + Broadcasts |
| `STRIPE_SECRET_KEY` | Stripe | Close Circle payments (P2) |
| `STRIPE_WEBHOOK_SECRET` | Stripe | Payment confirmations (P2) |

All set in Netlify UI → Site settings → Environment variables. Never committed to git.
