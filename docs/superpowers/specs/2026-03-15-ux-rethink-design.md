# ABLE — UX Rethink Design Spec
**Date:** 2026-03-15
**Status:** Approved for implementation
**Scope:** Dashboard, Edit mode, Artist profile (fan view), Onboarding, Fan list, Shows/Events

---

## Overview

This spec covers a full UX rethink of the ABLE platform across five surfaces. The core principle: **editing happens on the artist page, the dashboard is for reading data and switching modes**. Everything should feel like one product — not a CMS bolted onto a profile page.

---

## 0. Design Tokens (Dashboard)

The dashboard (admin.html) uses a distinct light-with-dark-brackets theme, separate from the artist profile's dark theme.

| Token | Value | Usage |
|---|---|---|
| `--dash-bg` | `#e8e4dd` | Page background (warm off-white — dashboard-specific, not the v6 light profile token) |
| `--dash-card` | `#ffffff` | Stat cards, campaign strip, nudge card |
| `--dash-border` | `#d4cfc8` | Section gaps, card dividers |
| `--dash-shell` | `#1a1a2e` | Topbar + bottom nav (dashboard-specific dark shell) |
| `--dash-field` | `#f5f2ee` | Bottom sheet fields |
| `--dash-amber` | `#f4b942` | Primary accent — same amber as existing admin.html |
| `--dash-green` | `#1e9650` | Positive delta |
| `--dash-red` | `#c04030` | Alert / negative |

**Source badge colours (canonical — used consistently in fan rows, filter pills, and bar charts):**
- Instagram: `#e1306c` (pink)
- Spotify: `#1ed760` (green)
- TikTok: `#888` (grey — no official API, muted)
- Direct: `#999` (neutral)

---

## 1. Dashboard

### 1.1 Layout — Merged "Brief + Grid"

The dashboard combines the information depth of "The Brief" with the visual premium of "The Grid".

**Structure (top to bottom):**

1. **Topbar** — `--dash-shell`, artist avatar + name + URL, "Edit page →" amber CTA (right)
2. **Campaign strip** — white, release timeline arc (see §1.2), release countdown right
3. **Stat cards** — 4 white cards with `--dash-border` gaps, sparklines, tappable (see §1.3)
4. **Nudge card** — contextual, one at a time, dismissible (see §1.4)
5. **Two-column body** — Latest fans (left) | What fans tapped today (right)
6. **Bottom nav** — `--dash-shell`, 5 items: Today · Fans · Snaps · Shows · Settings

### 1.2 Campaign Strip — Release Timeline Arc

Replace the four-pill mode selector with a visual timeline arc.

**Nodes (left to right):** Announce → Pre-release → Release day → After
**Visual:** Track line with fill to current position. Done nodes = amber fill. Active node = amber with glow ring. Future nodes = empty circle.
**Header:** Current mode badge (amber pill) + release countdown right-aligned ("Drift drops in 7 days →")
**Gig mode:** Separate — not part of the arc. Lives as a large first-person toggle card in the Shows section: "I'm playing tonight. Put tickets front and centre for 24 hours." Uses the `able_gig_expires` timestamp (24 hours from activation, not midnight). See §7.2.
**Tap any node:** Jumps to that campaign mode. No confirmation — mode changes are immediate and visible to fans. Artists can tap another node at any time to switch back. The current mode badge in the header always reflects live state.

### 1.3 Stat Cards

Four white cards separated by `--dash-border` gaps. Each card contains:
- Delta badge (green up arrow + %, or neutral grey)
- Big number (Barlow Condensed 900, 40px+)
- Label (10px uppercase, #bbb)
- Mini sparkline (7-day SVG line, top-right of card)
- "See breakdown →" action link (amber, 10px)

**Four stats:** Page views (amber) · Fans signed up (green) · Link taps (neutral) · Top action today (red text, no number — e.g. "Pre-save")
**Cards are tappable:** Views → analytics chart, Fans → full fan list, Taps → breakdown by link.
**"Today" definition:** Calendar day, midnight-to-midnight in the browser's local timezone. Sparklines show rolling 7 calendar days.

### 1.4 Nudge Card

One contextual suggestion between stats and fan body. Rules:
- One at a time only. Never stack nudges.
- Dismissible (✕ right side)
- Has a direct action link that resolves the issue in one tap
- Never generic — always specific to the artist's current state

**Trigger examples:**
- Release in N days + hero CTA not set to Pre-save → "7 days to release — your hero button is Follow. Switch to Pre-save now →"
- 0 shows listed + gig mode available → "Playing anywhere soon? Add a show and fans on your page will see it."
- Fan list at 80+ (approaching free tier limit) → "Your list is nearly full. [X] people who asked to hear from you — don't leave them waiting."

### 1.5 Fan Body — Two Columns

**Left — Latest fans:**
- Row: coloured initial avatar + email + source badge (colour-coded per §0) + time ago
- "View all N fans →" amber link at bottom

**Right — What fans tapped today:**
- Row: platform icon chip + label + sub-label (which zone it came from) + count (Barlow Condensed 900)
- Ordered by count descending
- "Today" = calendar day, midnight-to-midnight local timezone (same as §1.3)

### 1.6 Bottom Nav Labels

`Today · Fans · Snaps · Shows · Settings`
Not "Overview" — "Today". Artist voice, not system language.
Active item: amber label + subtle amber background.

### 1.7 Theme

**Light mode with dark brackets.**
- Page background: `--dash-bg` (#e8e4dd)
- Cards: `--dash-card` (#ffffff)
- Section gaps / dividers: `--dash-border` (#d4cfc8)
- Topbar + bottom nav: `--dash-shell` (#1a1a2e)
- Amber accent: `--dash-amber` (#f4b942)

---

## 2. Edit Mode on the Artist Page

### 2.1 Entry

Edit mode is entered via:
- "Edit page →" button from dashboard — opens able-v7.html with `?edit=1` URL param
- Page reads the flag and activates edit mode without a redirect
- **Auth gate:** Before activating edit mode, the page checks localStorage for a valid session token. If none exists, redirect to start.html (or magic link prompt). When Supabase auth lands, this becomes a server-side session check. For now, check `localStorage.getItem('able_session')` is non-null.

### 2.2 Edit Mode Indicators

No amber bar covering content. Instead:
- Dashed amber rings (1.5px, rgba(244,185,66,0.7)) around every editable zone
- Small ✎ chip badges (top-right of each zone, amber bg, dark text)
- Floating "Edit / Fan view" pill at bottom of screen (not top)

### 2.3 Floating Edit/Fan View Pill

`[ ✎ Edit | 👁 Fan view ]` — pill with two tabs, floats at bottom-right.
- Edit tab active: dashed rings + ✎ chips visible
- Fan view tab active: all editing indicators hidden, page looks exactly as fans see it
- Switching is instant — no reload

### 2.4 Bottom Sheet Pattern

Tapping any editable zone slides up a white bottom sheet from the bottom:
- **Style:** white (#fff) background, `--dash-border` top border, 14px top border-radius
- **Handle:** 28px wide, 3px tall, #e0dbd4, centred at top
- **Header:** section icon + section name + ✕ close
- **Fields:** `--dash-field` (#f5f2ee) background, #e0dbd4 1.5px border, 8px border-radius. Active field: #c4880a border.
- **Labels:** 9px uppercase, #bbb, above each field
- **Multi-step sheets:** step dots below body (filled amber = current, empty = upcoming)
- **Actions:** Cancel (ghost, `--dash-field` bg) + Save/Next (`--dash-shell` bg)

### 2.5 Auto-Save

- Text fields: save on blur (leaving the field)
- Toggles: save instantly on change
- Uploads: save on upload completion
- "Saved ✓" confirmation shows in sheet footer (fades after 2s)
- No explicit Save button for single-field sheets
- **Discard for single-step sheets:** swipe down or tap Cancel — no data saved
- **Discard for multi-step sheets:** each step saves to a draft object in memory (not localStorage) when advancing. Discarding at any step discards the entire draft — nothing is committed until the final Save. Sheet footer shows "Cancel" on all steps, which discards all progress.

### 2.6 Fan Preview

Bottom of sheet: "Auto-saved ✓" left + "Fan preview →" right (amber, tappable)
"Fan preview →" switches to Fan view tab on the floating pill — instant preview.

### 2.7 Editable Zones

| Zone | Tap target | Sheet contents | Tier |
|---|---|---|---|
| Top card | Entire top card area | Step 1: Name, tagline, accent colour. Step 2: Profile photo, background artwork/video URL | Free |
| Hero CTAs | CTA row | Primary action type dropdown, secondary action type, custom label + URL option | Free |
| Link pills | Pills row | Toggle each platform on/off, drag handle to reorder, "+ Add link" for custom | Free |
| Music section | Section card | List of releases. Each: artwork, title, type, date, streaming links, music video URL, "Set as current" toggle. AI copy assist on title/tagline (Artist+) shown as chip below field. | Free (manual); Artist (AI assist) |
| Videos section | Section card | List of video-only entries (live sessions, vlogs, BTS). Add via YouTube URL or YouTube auto-import. Each: title, type tag, thumbnail auto-fetched. Music videos are attached to release cards — not here. | Free |
| Section ordering | Long-press any section header in edit mode | Drag handles appear on all section headers. Drag to reorder. Changes save on drop. | Artist |
| Events section | Section card | List of shows. Each: venue, date, doors time, ticket URL, featured toggle | Free |
| Snap cards | Any snap card | Edit card content. Reorder via drag. Add new card. | Free (1 card); Artist (unlimited) |
| Fan capture | Section card | Toggle on/off, edit heading text, edit sub-copy | Free |
| Merch | Section card | Store URL, toggle on/off | Free |
| Support packs | Section card | Pack list, toggle on/off | Artist Pro |

### 2.8 AI Copy Assist

Available on Artist and Artist Pro tiers. Surfaces inline in edit mode — not a separate screen.

- **Where it appears:** Below text fields in the Music section (title, tagline), Snap card editor (headline, body), and Fan capture (heading, sub-copy)
- **Trigger:** After typing 3+ characters, a "Try AI →" chip appears below the field
- **Behaviour:** Single tap generates 2–3 short variants. Artist taps one to insert. No variants → field unchanged
- **Rate limits:** As defined in V6_BUILD_AUTHORITY.md §11 (10 generations/day Artist, 50/day Artist Pro)
- **Label:** "AI" chip, amber outline — not hidden, not prominent

---

## 3. Artist Profile — V2 (Fan View)

### 3.1 Top Card

- Full-bleed artwork/gradient (artist-set, defaults to themed gradient)
- Ambient colour glow at bottom: radial gradient from extracted artwork colour, fades to transparent — subtle, auto-extracted, degrades gracefully on CORS failure
- Artist avatar: bottom-left, accent-coloured ring + soft glow
- Artist name: Barlow Condensed 900, 26px+, uppercase, full visual weight
- Tagline (optional): 9px, rgba(255,255,255,0.45), below name

### 3.2 CTA Hierarchy

**Hero CTAs — max 2, never equal weight:**
- Primary: solid accent fill, full width, 44px height, Barlow Condensed 800
- Secondary: completely ghost (transparent bg, 30% white border, 70% white text)

**Quick link pills — max 4 visible:**
- Platform icon + name, consistent height 18px
- If more than 4: "+N more" overflow pill — tap to expand
- Deduplication: if a platform appears in hero CTAs, it's removed from pills automatically

**Section actions — max 2 per section**

### 3.3 Music Section — Option C

Release cards, not a track list.

**Release card:**
- 40×40 artwork thumbnail (rounded 5px)
- Title (10px, 800 weight, white)
- Type badge: `Single · 2026` or `EP · 3 tracks` (8px, muted)
- Action buttons: `▶ Stream` (accent-filled, small) + `▶ Watch` (ghost, small) — Watch only shown if music video URL exists
- Left border colour: green = audio only, purple = release + music video

**Videos section** (separate, below Music):
- Only renders if artist has added video-only content (live sessions, vlogs, BTS)
- Music videos live on their release card — not here
- Each entry: YouTube thumbnail (60×36px, rounded, play overlay) + title + duration + "YouTube →" link

### 3.4 Events Section

**Featured show** (large card):
- Date block: big day number (Barlow Condensed 900, accent colour) + month text
- Venue name + doors time
- "Get tickets →" button (accent filled, full width)

**Additional shows** (compact rows):
- Date block (smaller) + venue + "Tickets →" link right-aligned

**Gig night active state:**
- "TONIGHT" badge (amber, pulsing animation) on featured show
- Tickets CTA becomes even more prominent

### 3.5 Fan Capture

**Heading:** "Stay close." (not "Join the list", not "Subscribe")
**Sub-copy:** "No noise. Just the things that matter." (or similar honest line)
**CTA:** "I'm in" (not "Subscribe", not "Sign up")
**Toggle:** Artists can customise heading and sub-copy via edit mode

**GDPR / double opt-in:** On submit, the fan sees an immediate optimistic success state ("You're in — check your inbox."). A confirmation email is sent in the background. Unconfirmed fans are stored in `able_fans` with `confirmed: false`. They appear in the fan list with a hollow circle indicator (○) instead of filled initial avatar. Unconfirmed fans are excluded from CSV exports and broadcasts. Artists are not shown unconfirmed emails until confirmed. See V6_BUILD_AUTHORITY.md §8.4 for full double opt-in spec.

### 3.6 Section Ordering

Default: Music → Events → Snap cards → Fan capture → Support packs → Merch
Section reordering is an Artist-tier feature, controlled via edit mode (see §2.7 — long-press section header to reveal drag handles).

---

## 4. Platform Auto-Import (Spotify + YouTube)

**Tier gate:** Spotify and YouTube auto-import are **Artist tier and above**. Free tier artists can add releases and videos manually only.

**Infrastructure dependency:** Platform auto-import requires a Netlify serverless function to proxy API calls (API keys must never be in client-side code). Until this function is deployed, the import UI should degrade gracefully: show manual entry fields as the primary path, with an "Auto-import coming soon" note where the import button would appear.

### 4.1 Spotify

- Entry point: Settings → Connected platforms
- Input: Spotify Artist ID (from URL or Spotify for Artists)
- On connect: ABLE fetches all releases via Spotify public API (client credentials, no user auth)
- Artist sees: list of all releases — tick to include on page, untick to hide
- Auto-sync: when a new release appears on Spotify, ABLE flags it with a nudge ("New release found on Spotify — add it to your page?") or auto-adds if preference set
- Read only — cannot push back to Spotify

**Error states:**
- Invalid Artist ID → inline error: "That doesn't look right — paste your Spotify artist URL and we'll find the ID"
- No results / 404 → "We couldn't find an artist with that ID. Check it in Spotify for Artists → Settings → Your profile."
- API timeout → "Spotify isn't responding. Try again in a minute." — fallback: manual entry
- Ambiguous name match (Apple Music fallback only — not Spotify) → show top 3 results with artwork, ask "Which one?"

### 4.2 YouTube

- Entry point: Settings → Connected platforms
- Input: YouTube Channel ID
- On connect: ABLE fetches all videos — filter by type (music videos, live, vlogs)
- Videos surface in the Videos section (§3.3) and can be attached to releases
- Auto-adds new uploads or notifies via nudge

**Error states:**
- Invalid Channel ID → "Paste your YouTube channel URL and we'll extract the ID"
- No videos found → "No public videos on this channel yet."
- API timeout → "YouTube isn't responding. Try again in a minute." — fallback: manual URL entry

### 4.3 Apple Music

- Matched by artist name via MusicKit
- Less precise than Spotify ID — used as fallback for streaming links only
- Ambiguous matches: show top 3 results with artwork for artist to confirm

### 4.4 Instagram / TikTok

- APIs locked down — manual link entry only
- Listed in connected platforms as "Add link manually"

---

## 5. Onboarding (start.html) — V2

### 5.1 Philosophy

Three required steps to a live page. Everything else becomes a dashboard nudge after signup. Minimum path: under 90 seconds.

### 5.2 Step A — Auto-Import (Optional)

**Screen:** "Are you on Spotify?"
Paste Spotify artist URL → ABLE fetches name, artwork, bio, releases in ~10 seconds.
Confirmation screen: "Is this you?" — shows artwork, artist name, releases found count, "Yes, that's me →" / "Not me" options.
Skip link: "Skip — I'll add my music manually →"

**On "Yes, that's me →":** The artist's name, profile image, and up to 5 most recent releases are pre-imported. Step 1 (§5.3) pre-populates the name field with the Spotify artist name — editable. Vibe and accent colour still require selection.

**Error states:**
- Invalid URL / no match → "We couldn't find that artist. Try the Skip link and add your music manually."
- API unavailable → same message, bypass to Step 1 without import data

### 5.3 Step 1 — Identity (Required)

**Screen:** "Make it yours."
One screen containing:
- Artist name (text input, large, 13px, 800 weight — pre-filled from Step A if completed)
- Vibe picker: 4 cards in 2×2 grid — Atmospheric 🌙 / Hype 🔥 / Raw 🎸 / Chill 🌊 (and more — these are the top 4)
- Accent colour: 6 swatches + "Custom →"

Live preview visible as artist types — name and colour update on the preview in real time.
Progress bar: 33%

### 5.4 Step 2 — Right Now (Required)

**Screen:** "What's happening?"
Four options in artist language:
- "Just existing" → Profile mode
- "Something's coming" → Pre-release mode
- "Just dropped" → Live mode
- "Playing tonight" → Gig mode

Progress bar: 66%

### 5.5 Step 3 — Save (Required)

**Screen:** "Where do we send the link?"
Single email input. Magic link only — no password.
Shows artist's page URL: `able.fm/[slug]` (auto-generated from name, editable in settings).
Progress bar: 90%
CTA: "Make it real →" (amber)

### 5.6 Done Screen

Progress bar: 100%, green fill.
Large celebration moment: "Your page is real."
Page URL displayed as amber pill: `able.fm/novavega`
Share buttons immediately: Copy · Instagram · TikTok (while dopamine is fresh)
Primary CTA: "Go to your dashboard →"

### 5.7 Post-Signup Nudges (Dashboard)

These replace optional wizard steps — one at a time, dismissible:
1. "Add a one-liner" — city, mood, fact — under your name on the page
2. "Got any shows coming up?" — add a show, fans see it automatically
3. "Connect YouTube" — videos pull in automatically on every upload
4. "Sell anything? Add your store" — merch, samples, tap straight to it

---

## 6. Fan List

### 6.1 List View

- Dark topbar: "← Fans" + "Export CSV" (amber, always available — free tier)
- Search input
- Filter pills: All · Instagram · TikTok · Spotify · Direct (selected = amber; pill colours match §0 source badge colours)
- Stat strip: Total · This week (amber) · % from social
- Fan rows: coloured initial avatar (confirmed fans) or hollow circle ○ (unconfirmed, GDPR pending) + email + source badge (colour-coded per §0) + time ago + ★ mark as close (star icon, no "superfan" label — internal word only)
- Tap a row → fan detail bottom sheet

### 6.2 Fan Detail Sheet (Bottom Sheet)

- Large avatar, email, joined date, source
- Stats: "Tapped N links · Visited N times · Signed up via [source]"
- "Close to you" badge if starred (artist-facing label, not "Superfan")
- "Send a message" — this triggers a single-recipient email via the broadcast pathway (Artist tier). Not a separate direct messaging thread. Gold lock overlay on Free tier.
- "Remove from list" — red, confirmation required

### 6.3 Export + Broadcast

**Export CSV:** Free on all tiers. "Your list, your data." Downloads confirmed fans only — emails + timestamps + sources. Unconfirmed fans (○ indicator) are excluded from exports until they confirm. The CSV includes a `confirmed` column (all values will be `true` for exported rows, serving as a record).
**Broadcast:** Locked behind Artist tier. Gold lock overlay with fan count personalised: "Reach all 147 directly. Unlock Artist — £9/mo."

### 6.4 Source Breakdown

Horizontal bar chart (not pie):
- Instagram · TikTok · Spotify · Direct
- Bars in the canonical source colours defined in §0
- Percentage label on each bar

---

## 7. Shows / Events

### 7.1 Add a Show — Bottom Sheet

Three steps (step dots shown):
1. Venue name + date + doors time + ticket URL
2. Featured toggle ("Show at top of your page")
3. Confirmation / preview

### 7.2 Shows List

Rows with: venue + date + time + FEATURED amber badge (if featured) + edit icon
Gig mode card at bottom: "I'm playing tonight. Put tickets front and centre for 24 hours." Toggle OFF by default.
**Gig mode expiry:** Uses `able_gig_expires` timestamp — expires 24 hours after activation. The note shown to artists: "Turns off automatically 24 hours after you switch it on." (Not midnight — midnight would cut short a late-night activation.)

### 7.3 Fan-Facing Events

**Featured show** (large): accent-colour date block (big day + month), venue, doors, "Get tickets →" full-width button
**Additional shows** (compact): smaller date block + venue + "Tickets →" right
**Gig night active:** "TONIGHT" amber pulsing badge on featured show

---

## 8. What This Doesn't Cover (Phase 2)

Per V6_BUILD_AUTHORITY.md §15, these remain Phase 2:
- Press pack / EPK
- Showcase Mode
- Streaming Moments
- Close Circle
- Freelancer profile
- Fan dashboard (fan.html)
- Email broadcasts backend (UI specified in §6.3 — gated, backend TBD)
- PostHog analytics
- Supabase auth migration
- Landing page redesign

---

## Implementation Notes

- All edit mode changes save to `localStorage` keys (`able_v3_profile`, etc.) immediately
- Spotify / YouTube import requires a Netlify serverless function to proxy API calls (keys never in client). **This is a prerequisite — the import UI must degrade to manual entry until the function exists.**
- Sparklines are inline SVG — no chart library needed
- Timeline arc is pure CSS + a few JS date calculations — no external dependencies
- Auto-save on blur: `input.addEventListener('blur', save)` pattern
- `?edit=1` URL param: `new URLSearchParams(location.search).get('edit') === '1'`
- Auth check before edit mode: `localStorage.getItem('able_session')` must be non-null
- All localStorage keys must remain unchanged (map 1:1 to future Supabase tables)
- Source colours are canonical (§0) — use CSS variables, not hardcoded per-use values
- Gig mode uses `able_gig_expires` Unix timestamp (24h from activation) — not midnight
- "Today" always means midnight-to-midnight calendar day in `new Date()` local timezone
