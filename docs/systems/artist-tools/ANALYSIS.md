# Artist Tools — Current State Analysis
**Last updated: 2026-03-16 | File: admin.html | Authority: Primary build reference**
**Overall score: 6.8/10 → 8/10 after 4 P0 fixes → 9/10 after Stripe Connect**

> Audit of every tool available to artists in admin.html. Score = current implementation quality.
> Companion: `SPEC.md`, `PATH-TO-10.md`, `FINAL-REVIEW.md` in this directory.

---

## What this file is

A scored, function-level audit of every tool in `admin.html`. Each tool is assessed against what a 10/10 version would look like at V1 launch quality.

The three tiers of admin tool quality:

**Fully working** (the core three that prove the product):
- Campaign HQ — state system, auto-switch, gig countdown all functional
- Fan list — export, filter pills, source badges, fan detail sheet all working
- Snap card manager — full CRUD, publish toggle, reorder, oEmbed auto-fill

**UI shells** (built but not functional — require backend work):
- Close Circle / Support — UI and data model complete, but no Stripe wiring means payments don't work
- Broadcasts — Pro gate and compose UI exist, but no send function means nothing can actually be sent

**Minor bugs** (working but with specific gaps):
- Shows manager — no date sorting, no past-show archiving
- Profile identity — no accent colour picker post-wizard
- Analytics — no UTM source tracking (source attribution effectively broken)
- Your World — no moment editing, no "next moment" on home page

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
- No visual confirmation after releasing a state change beyond the pill update — a subtle toast would reinforce the action on mobile where the pill is often off-screen
- The gig countdown bar depletion has no animation easing on bar fill — bar jumps on first render
- No "quick test" button to preview what a fan sees in each state
- The timeline arc has no milestone markers (e.g., "7 days out", "today", "2 weeks in")

**Path to 10:** Add state-change confirmation toast (30 min). Smooth countdown bar animation. Add milestone markers to timeline arc.

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
- Starring fans: `able_starred_fans` localStorage key exists and is documented, but the star toggle in the fan row UI is not confirmed as wired. If the key exists but the UI doesn't write to it, the data is dead.
- No search/filter by email — for lists exceeding 50 fans this becomes immediately important
- No "most engaged fans" section — that's Artist Pro gated, but even the gated preview is missing
- Fan support pack summary (`renderFanSupportPacksSummary`) renders empty — no Stripe data to display

**Path to 10:** Confirm and wire star toggle. Add email search input (debounced, client-side filter). "Top fans" section behind Pro gate with specific upgrade copy.

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
- No duplicate card function
- No card preview within admin — artist must open the live page to see how the card looks
- AI copy suggestions (`aiSuggestCta`) not confirmed as surfacing in snap card editing flow specifically

**Path to 10:** Add card preview thumbnail in admin. Add drag-to-reorder (touch-friendly). Surface AI copy suggestions in card edit view.

---

### 4. Shows manager — 6/10

**What's working:**
- Add show: venue, date, doors time, ticket URL, featured toggle
- Remove show with confirmation
- Shows list renders with all fields
- Save to `able_shows` localStorage
- Featured toggle for "headline" show promotion

**What's missing (P0 bugs — fix before launch):**
- **No date sorting** — shows display in entry order, not chronological. An artist who enters their 5 shows out of order (common) sees them scrambled. This will be immediately visible to every artist who adds more than 2 shows.
- **No past-show archiving** — expired shows stay in the active list permanently until manually removed. An artist with 3 past shows and 2 upcoming sees a confusing mixed list.
- No ticket URL validation (accepts any string)
- No events import — every show is manual entry
- No multi-day or recurring event support
- Featured show has no distinct visual treatment in the admin list (only on fan-facing profile)

**Path to 10:** Date sort (P0 — 1 hour). Past-show archiving (P0 — 1 hour). Ticket URL validation (P1 — 30 min). Ticketmaster import (P2).

---

### 5. Music/releases manager — 7/10

**What's working:**
- Add/remove releases (`addRelease`, `removeRelease`)
- Fields: title, release type (album/EP/single), release date, artwork URL, platform links
- Track listing within each release (`addTrack`, `removeTrack`, `updateTrack`)
- Credits within each release (`addCredit`, `removeCredit`, `updateCredit`)
- oEmbed auto-fill: paste Spotify/YouTube/SoundCloud URL → title, artwork fill
- Embed preview when URL is pasted (`showEmbedPreview`)

**What's missing:**
- No release status indicators (upcoming / live / archive) — all releases look the same regardless of date
- No "latest release" explicit control — profile picks by date but artist can't override
- Credits system is manual entry only — no peer-confirm flow
- Track preview player missing (Spotify preview_url is in the import payload but no UI)
- Character limits on title/track name fields not enforced

**Path to 10:** Release status badges computed from date (P1 — 2 hours). Explicit "set as featured release" control. 30s preview player for Spotify tracks (P2).

---

### 6. Merch manager — 6/10

**What's working:**
- Merch shop URL input (link to Shopify/Bandcamp/etc)
- Individual merch item CRUD: add, remove, update fields (name, price, image URL, buy URL)
- Save to localStorage via `saveAllMerch()`

**What's missing:**
- No reorder arrows on merch items — inconsistent with snap cards, which have up/down arrows
- No sold-out toggle per item
- No image upload — URL only (requires externally hosted image)
- No Shopify/Big Cartel import — every item is manual
- No stock indicator field

**Path to 10:** Add reorder arrows (P2 — mirrors snap card pattern). Add sold-out toggle (P2). Shopify Storefront API import (P3 — after first paid tiers exist).

---

### 7. Support (Close Circle) — 5/10

**Status: UI shell. Payments do not work.**

This is not a criticism of the UI quality — the interface, data model, and copy are all correct. The problem is that Close Circle cannot process payments without Stripe Connect, and Stripe Connect is not wired. An artist who enables Close Circle and shares their page will present fans with support packs they cannot purchase. This erodes trust immediately.

**What's working:**
- Enable/disable toggle
- Support pack CRUD (name, price, description)
- Thank-you note field
- `saveCloseCircle()` persists to localStorage
- "0% taken by ABLE. Stripe standard fee only." copy confirmed present

**What's missing (P0 — show this state before any artist enables Close Circle):**
- **"Payments setup required" state** — when Close Circle is enabled but Stripe is not connected, this state must appear immediately and clearly so artists understand the section is not yet operational
- No Stripe Connect onboarding flow
- `renderFanSupportPacksSummary()` renders empty — replace with a placeholder
- Price fields accept any string — no currency/format validation
- No test payment flow

**Score note:** 5/10 because the gap between the UI promise and the actual capability is exactly the kind of disconnect that makes artists distrust a product. The fix is not Stripe (that is P2) — it is the honest gate state that says "you've set it up, now connect Stripe to make it work." That gate state should show before Stripe is wired.

**Path to 8/10:** Add "Payments setup required" gate state with the exact copy below (P0 — 2 hours). Replace empty `renderFanSupportPacksSummary()` with a placeholder.
**Path to 10/10:** Wire Stripe Connect (P3).

**Copy for the "payments setup required" gate state:**
See PATH-TO-10.md P0-2 for the exact HTML. The copy is:
```
You've set up your support packs.
Now connect Stripe to start receiving payments.
0% taken by ABLE. Stripe standard fee only.
[Connect Stripe →]
```

---

### 8. Analytics — 6/10

**What's working:**
- Stats counters: views, clicks, fans, click rate — with counter animation (G14)
- Sparklines (7-day trend lines) — hidden until 3+ days of data
- Day-1 zero state with "Day 1 ✦" label in amber
- Activity feed: recent events (fan sign-up, CTA click, page view)
- Top clicks list
- Source breakdown on fan list
- Delta labels: "+X today" per stat

**What's missing:**
- **No UTM source tracking** — without this, almost all traffic shows as "direct." The source breakdown chart is effectively meaningless. An artist who uses "Instagram link" vs "TikTok link" copy in their bio needs UTM parameters to attribute sign-ups correctly. This is the single most impactful analytics gap.
- No time-range selector (always all-time)
- No geographic breakdown
- No conversion funnel view
- No comparison period ("this week vs last week")
- No CSV export of analytics data

**Path to 10:** UTM tracking on the "Copy link" buttons in admin (P1 — 3 hours, no API required). Time-range selector (P2). PostHog integration for cross-device persistence (P3).

---

### 9. Section order + visibility — 8/10

**What's working:**
- All sections toggleable
- Section reorder with up/down arrows
- Order and visibility persist to `able_v3_profile.sectionOrder` and `.hiddenSections`
- Changes propagate to `able-v7.html` via shared localStorage

**What's missing:**
- No empty-section warnings — an artist can leave a visible section with no content, creating an empty section header for fans
- No drag-to-reorder
- No "reset to default order" option

**Path to 10:** Add "Empty" badge to sections with no content in the order list (P1 — 2 hours). Reset to default button.

---

### 10. Connections (platform links) — 7/10

**What's working:**
- Platform link fields for major platforms
- `savePlatformLinks()` debounced save
- Links appear as platform pills on `able-v7.html`
- All mutations call `syncProfile()`
- Copy link button and QR code confirmed working

**What's missing:**
- No URL validation — any string accepted, including typos and incomplete URLs
- No RA (Resident Advisor) field — significant gap for electronic/DJ/club artists
- No Twitch field
- No preview of which pills will appear on the live page

**Path to 10:** URL validation (P1 — 2 hours). RA field (P1 — 30 min). Preview of active pills.

---

### 11. Profile identity (genre/feel/accent) — 7/10

**What's working:**
- Genre selector
- Feel selector — applies `data-feel` to profile
- `updateIdentityPreview()` renders a live mini-preview
- AI bio suggestions: `aiSuggestBio()` — calls `netlify/functions/ai-copy.js`
- AI CTA suggestions: `aiSuggestCta()`
- Nudge hints based on profile completeness
- Accent colour from profile applied as CSS variable

**What's missing (P0):**
- **No accent colour picker** — colour is set in the wizard but cannot be changed in admin after onboarding. This is a basic editing operation that is completely absent. Artists change their brand colour. A new EP might use a completely different palette.
- AI copy functions require `ANTHROPIC_API_KEY` in Netlify environment — not documented in any deployment checklist. Result: AI copy buttons silently fail.
- `data-feel` effect not shown in admin identity preview — artist can't see how the feel changes their profile

**Path to 10:** Accent colour picker (P0 — 2 hours, see PATH-TO-10.md P0-3 for exact HTML). Document `ANTHROPIC_API_KEY` in deployment checklist.

---

### 12. Broadcasts (Artist Pro tier) — 4/10

**Status: UI shell. Cannot send.**

The broadcasts compose UI exists and is correctly gated behind Artist Pro. The gate shows a specific value proposition (correct). The compose form exists as a preview. But `netlify/functions/broadcast-send.js` does not exist, meaning no broadcast can actually be sent.

**What's working:**
- Pro gate is present
- Compose UI is behind gate (shown in preview)
- The spec for what the send function should do exists in `docs/systems/email/SPEC.md`

**What's missing:**
- `netlify/functions/broadcast-send.js` — the core build that makes this tool real
- `RESEND_API_KEY` not documented in deployment checklist
- No draft save
- No preview-before-send step
- No delivery tracking

**Score note:** 4/10 is honest. The UI looks like it works. It does not work. This is a P2 item — correctly deferred until there are paying artists who need it.

**Path to 10:** Build `broadcast-send.js` using Resend (P2 — 6 hours). Wire compose UI. Add preview step. This is the biggest single gap in the Pro tier value proposition.

---

### 13. Your World (moments/calendar) — 6/10

**What's working:**
- Moments CRUD: add, remove (edit is missing — see below)
- Moment types: release, gig, anniversary, milestone, other
- Moments persist to `able_v3_profile.moments`
- `ywRenderMomentList(profile)` renders chronologically

**What's missing:**
- **No moment editing** — remove only. An artist who makes a typo in a moment title has to delete and re-add.
- **No "next moment" on admin home** — the greeting system doesn't reference the moments list. The line "Next: Manchester Academy — 11 April" would be trivial to add and would make the admin home feel genuinely aware of the artist's situation.
- No calendar grid view — list only
- No integration with gig mode — a gig-type moment for today doesn't offer to activate gig mode
- No fan-facing display of moments from the admin list

**Path to 10:** Add moment editing (P1 — 3 hours). "Next moment" on admin home (P1 — 2 hours). State integration nudges (P2).

---

## Summary: Admin Tool Scores

| # | Tool | Score | Category | Primary gap |
|---|---|---|---|---|
| 1 | Campaign HQ | 8/10 | Fully working | Toast on state change, timeline markers |
| 2 | Fan list + export | 8/10 | Fully working | Star toggle confirmation, email search |
| 3 | Snap card manager | 8/10 | Fully working | Drag reorder, card preview in admin |
| 4 | Shows manager | 6/10 | Minor bugs | No date sorting, no past-show archive |
| 5 | Music/releases | 7/10 | Minor bugs | No release status badges |
| 6 | Merch manager | 6/10 | Minor bugs | No reorder, no sold-out toggle |
| 7 | Close Circle | 5/10 | UI shell | Stripe not wired — payments non-functional |
| 8 | Analytics | 6/10 | Minor bugs | No UTM tracking — source attribution broken |
| 9 | Section order | 8/10 | Fully working | Empty-section badges, reset option |
| 10 | Connections | 7/10 | Minor bugs | URL validation, RA/Twitch fields |
| 11 | Profile identity | 7/10 | Minor bugs | No accent picker post-wizard |
| 12 | Broadcasts | 4/10 | UI shell | Send function not built |
| 13 | Your World | 6/10 | Minor bugs | No moment editing, no state integration |

**Overall: 6.8/10**

- 3 tools fully working (1, 2, 3)
- 2 tools are UI shells with no backend (7, 12)
- 8 tools working with specific gaps

**Score trajectory:**
- After 4 P0 fixes (shows sort + past archive, Close Circle gate, accent picker, star toggle): **8/10**
- After P1 fixes (UTM, release badges, section empty warnings, moment edit, connections validation): **8.5/10**
- After Stripe Connect wired (Close Circle fully functional): **9/10**
- After Broadcasts send function built: **9.5/10**
