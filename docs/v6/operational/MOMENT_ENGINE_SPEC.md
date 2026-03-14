# ABLE — The Moment Engine: Unified System Spec
**Created:** 2026-03-14
**Status:** ACTIVE — authoritative synthesis of all moment-related product decisions
**Supersedes:** Individual moment specs where they are in conflict with this document.
**Companion specs:** MOMENT_CALENDAR_SPEC.md, WORLD_MAP_CROSS_PRODUCT.md, STREAMING_MOMENTS_SPEC.md, SHOWCASE_CAMPAIGN_MODE_SPEC.md, PROFESSIONAL_ECOSYSTEM_SPEC.md

---

## 1. Diagnosis: what exists, what is fragmented

**Already strong:**
- The top card / campaign state machine (profile / pre-release / live / gig) — built and deployed
- State 4 (near-future): any non-private moment within 7 days surfaces a chip — built
- Artist World Map: month grid, 8 types, 4 access tiers, auto-population — built
- The credits trail and professional discovery logic — specced
- Showcase Mode: three contexts (Release/Booking/Press), Showcase Object as nucleus — specced
- Live Moments: external streaming, ABLE-owned campaign wrapper — specced

**What is fragmented:**
- The state machine, World Map, Live Moments, Early Access, Showcase, and share cards are designed as separate features that happen to relate to each other — not as expressions of one underlying object
- There is no single canonical name for the unit that powers all of these
- The top card's role as "the currently promoted moment" is implied but never stated explicitly
- Share cards, OG images, and showcase objects are designed separately but should all derive from the same source
- Admin has "Your World" for the World Map but no unified view of the current promoted moment vs. upcoming moments

**What this spec resolves:**
ABLE is fundamentally built around one thing: **Moments**. Every significant point in an artist's timeline is a Moment. The entire product — top card, calendar, supporter logic, streaming, showcase, share cards, admin, landing page — is the infrastructure that surfaces, gates, shares, and archives Moments.

---

## 2. The unified system: definition

**The Moment Engine** is ABLE's core product logic. It is not a feature — it is the organising principle.

Every action-worth-taking point in an artist's world is a Moment:

| Moment type | What it is |
|---|---|
| `release` | A track, EP, or album drop |
| `show` | A live performance |
| `on_sale` | Tickets or merch going on sale |
| `merch_drop` | A product launch |
| `early_access` | Fan-list or supporter-first preview |
| `livestream` | Live or scheduled streaming moment |
| `private_access` | Invitation-only or enquiry-only opportunity |
| `announcement` | Any other notable point in the artist's world |

Every Moment has:
- An **access tier** (public / fan / supporter / private)
- A **lifecycle state** (scheduled / active / ended)
- A **promotion priority** (is it the current top card?)
- A **shareable representation** (card, link, OG image)

The top card is always the **currently promoted Moment**. The World Map is the **next N Moments**. The fan's progression from public attention to private connection is expressed through the access tiers on those Moments. Everything else is derived from these.

**The core loop:**

```
Artist creates a Moment
  → Moment appears in World Map (calendar)
  → If within 7 days: State 4 chip fires in hero
  → If promoted: becomes the top card
  → Each Moment generates a shareable link + share card
  → Fan finds the Moment (via social, share, profile)
  → Access tier determines what the fan can do
  → Engaging with the Moment moves the fan closer
  → Artist sees RSVP count / enquiry count in admin
```

---

## 3. Final structural decisions

### The top card is always the Promoted Moment

The top card is not a design element with a state machine bolted on. It IS the window into the currently promoted Moment. The state machine determines *which* Moment is promoted:

**Promotion priority (highest to lowest):**

| Priority | Source | Condition |
|---|---|---|
| 1 | Manual | Artist explicitly promotes a specific Moment in admin |
| 2 | `gig` state | Manual "on tonight" toggle — overrides everything |
| 3 | `live` state | Release date reached, within release window |
| 4 | `pre-release` state | Upcoming release within 30 days |
| 5 | Near-future (State 4) | Any non-private Moment within 7 days |
| 6 | Profile default | Latest release, no active Moment |

When a Moment is promoted, the top card renders from its data:
- artwork/cover image
- title (or artist name in profile mode)
- lifecycle-aware CTA ("Pre-save" / "Stream now" / "Get tickets" / "Join" / "Watch replay")
- state chip text ("Playing tomorrow" / "Live now" / "Out now")

Manual promotion (Priority 1) bypasses the auto-priority entirely. The artist knows their situation better than the algorithm.

### State logic does not change — it is now named

The existing state machine (profile / pre-release / live / gig) maps directly onto Moment promotion priority 2–4 above. The naming is the same. The behaviour is unchanged. This spec gives it a conceptual home: these states are not "modes" — they are ways the system describes which Moment is currently promoted.

### The World Map is the Moment timeline

Not an events calendar. Not a booking tool. The full arc of upcoming Moments — everything the artist has committed to happening in their world, across all types and access tiers.

The fan understands the access system by *looking at the calendar*, not by reading an explanation. Public moments are open. Fan moments show "join the list." Supporter moments show what they're missing. Private moments show a locked tile. The progression is visible.

### Early Access is a first-class Moment type

An `early_access` Moment:
- Appears on the calendar (gold dot)
- Has a two-date system: `previewDate` (when supporters hear it) and `releaseDate` (when everyone does)
- When promoted: top card shows "Hear it first — [previewDate]" for supporters, "Early access — Thursday" for everyone else
- Not a separate product — it IS a Moment with `access: 'supporter'` and a type-specific display

### Live Moments (streaming) are Moments

A `livestream` Moment is just a Moment with additional fields:
- `livestreamType` — the subtype (session, premiere, Q&A, etc.)
- `time` + `timezone` — precise timing, not just a date
- `platform` + `streamUrl` — where the stream actually is
- `embedUrl` — optional iframe-compatible URL (YouTube/Vimeo)
- `replayUrl` — set after the stream ends
- `state` — `scheduled` / `live` / `ended` (time-computed, manually overridable)

The lifecycle changes the top card CTA and the World Map panel content. Nothing else changes structurally.

### Showcase Mode is a *view* on Moments, not a separate system

A Showcase is configured by picking a Moment (or a Moment-derived object like a release) as the **Showcase Object** and selecting a context (Release / Booking / Press). The Showcase renders that Moment's content with different emphasis and section ordering.

The Showcase does NOT have its own object model. It reads from the same `moments[]` array. If the artist changes the underlying release or removes a Moment, the Showcase updates automatically.

### Share cards are Moment-derived

Every Moment can generate:
- A **share link**: `able.fm/[handle]?m=[momentId]` — deep links to the profile, auto-selects the moment in the World Map
- A **share card** (portrait 9:16): cover image / artwork + artist name + moment type + date + `able.fm/[handle]`
- An **OG image**: moment cover or artist artwork + moment title — used as link preview when the share link is pasted anywhere

These are generated on demand from the Moment object. No manual duplication. One Moment → three shareable outputs.

---

## 4. Canonical Moment object

This is the single source of truth. All surfaces derive from it.

```json
{
  "id": "m_[nanoid]",

  // Core identity
  "type": "release|show|on_sale|merch_drop|early_access|livestream|private_access|announcement",
  "date": "2026-05-08",           // ISO date — when the Moment happens
  "endDate": null,                // Optional — for windows (private_access, merch_drop)
  "title": "Resonance — Supporter Preview",
  "artistNote": "Optional artist voice note shown in panel",

  // Access
  "access": "public|fan|supporter|private",

  // CTA
  "cta": {
    "label": "Listen early",
    "url": "https://...",
    "type": "link|stream|notify|enquire"
  },

  // Lifecycle
  "active": true,
  "isPromoted": false,           // True if artist manually promoted to top card

  // Linking
  "linkedId": null,              // Links to a release.id or show.id (auto-populated)
  "imageUrl": null,              // Override cover image for this Moment

  // Livestream-specific (only when type = 'livestream')
  "livestream": {
    "subtype": "listening_session|premiere|qa|supporter_performance|studio_session|virtual_show",
    "time": "20:00",
    "timezone": "Europe/London",
    "platform": "youtube|twitch|vimeo|instagram|url",
    "streamUrl": "https://...",
    "embedUrl": null,
    "rsvpEnabled": true,
    "replayUrl": null,
    "replayAccess": "public|fan|supporter|none",
    "liveState": "scheduled|live|ended"   // Time-computed, manually overridable
  },

  // Early access-specific (only when type = 'early_access')
  "earlyAccess": {
    "previewDate": "2026-05-08",  // When supporters hear it
    "releaseDate": "2026-05-10"   // When everyone does
  },

  // Metadata
  "createdAt": "2026-03-14T...",
  "updatedAt": "2026-03-14T..."
}
```

**Derived outputs (not stored, computed on render):**

| Output | Computed from |
|---|---|
| State 4 chip text | `type` + `date` relative to today |
| Top card promotion | `isPromoted` + state priority logic |
| World Map dot colour | `type` → `WM_TYPE_COLOR` map |
| Panel content | `type` + `livestream.liveState` + `access` |
| Share link | `id` + artist handle |
| Share card | `imageUrl` || artwork + `title` + `date` |
| OG image | `imageUrl` || artwork |

**localStorage schema** (v1, maps 1:1 to Supabase `moments` table):

```javascript
// In able_v3_profile:
{
  moments: [MomentObject],
  privateAccessEnquiries: [{ momentId, fanEmail, message, submittedAt, status }],
  livestreamRSVPs: [{ momentId, fanEmail, source, ts }]  // subset of able_fans
}
```

---

## 5. Cross-surface translation

### able-v6.html — public profile

**Top card:**
- Renders the currently promoted Moment
- CTA, state chip, and hero media all derive from the Moment object
- Lifecycle transitions (scheduled → live → ended) auto-update based on time
- Reduced-motion: transitions are instant (no crossfades), chip text still updates

**World Map section (`#world-map-section`):**
- Shows all upcoming active Moments in a month grid
- Auto-navigates to nearest upcoming Moment on load
- Auto-selects nearest date
- Moment dots use type colours (release=accent, show=coral, on_sale=gold, etc.)
- Featured Moment (promoted) gets a thin ring on its dot
- Livestream Moments in live state: dot pulses slowly (4s opacity cycle)
- Ended Moments: dot becomes 50% opacity
- Panel (half-sheet): lifecycle-aware content per Moment type
- No section if no upcoming Moments — the section is hidden by default, shown only when `hasUpcoming` is true

**Access gating (all surfaces, fan-facing):**
- Public: full content, no gate
- Fan: gated — "Join the list to access this" CTA → fan capture form, pre-filled with Moment title
- Supporter: gated — "Supporters get this" → Support section
- Private: visible locked tile — enquiry textarea + email field

**No dedicated "streaming" or "live" section:**
All Moments live in the World Map. The top card handles what's live *now*. There is no redundant "upcoming streams" list — the calendar is the upcoming stream list.

**Performance:**
- World Map section uses `IntersectionObserver` — grid renders when section enters viewport
- Images in panels: lazy-loaded with `loading="lazy"` where applicable
- Embeds (livestream): not loaded until user taps the Moment — prevents iframe weight on page load
- Share cards: canvas-generated on demand — no preloading

### admin.html — artist dashboard

**Your World section (existing `ywInit` / `ywRenderMomentList`):**
The single admin surface for all Moments. Current behaviour (chronological list, + Add moment button) is already correct. Extensions needed:

**Moment list item enhancements:**
- Each item shows: type icon (coloured) + date + title + access tier chip + lifecycle state (for livestreams)
- Actions: [Edit] [Share card ↓] [Feature ⭐] [•••]
- "Feature ⭐" toggles `isPromoted: true` — immediately makes this the top card
- Only one Moment can be featured at a time (toggling one on turns others off)
- Featured item shows "● In top card" label
- Livestream items show current `liveState`: "Scheduled" / "LIVE NOW" / "Ended — add replay"

**Top card indicator:**
At the top of "Your World": small status line showing what's currently in the top card — "Current: [Moment title] · [auto/featured]". Auto-computed moments are labelled "Auto"; manually promoted are labelled "Featured".

**Creation flow extensions (5-step sheet, existing):**
- When type = `livestream`: Step 2 adds Time + Timezone; Step 3 adds platform selector + stream URL + subtype picker
- When type = `early_access`: Step 2 adds Preview date + Release date (two-date picker)
- Replay field: appears on ended livestream items inline ("Add replay URL")

**"See as fan" preview toggle:**
Shows the profile as a fan would see it, in each access tier. Already specced in WORLD_MAP_CROSS_PRODUCT.md. Should reflect the full Moment Engine state — not just the calendar.

**Share card generation:**
In the Moment list, the [Share card ↓] action opens a bottom sheet showing:
- Portrait card preview (canvas-rendered)
- Download button
- Share link: `able.fm/[handle]?m=[id]` (copy button)

### start.html — onboarding

Minimal. One optional step after the release info step:

> **"What's coming up?"**
> Date picker + short text (60 chars) + skip link

If filled: auto-creates a Moment (`type: 'announcement'`, upgraded to `release` if date matches `releaseDate`).

If skipped: World Map section exists on the profile but is empty. First admin visit shows: "Add your first upcoming moment so fans know what's coming."

**What does NOT belong in onboarding:**
- No access tier explanation
- No streaming setup
- No showcase configuration
- No early access configuration
- No private access

### landing.html — marketing page

**Demo phone states (in cycle order):**

| State | Content | Duration | Caption |
|---|---|---|---|
| Profile | Latest release, pre-save CTA | 3s | Standard profile |
| Pre-release | Countdown, pre-save | 3s | "The page becomes the campaign" |
| World Map | Month grid, type-coloured dots | 4s | "A living artist world. Not a static page." |
| Live | Green dot, LIVE NOW, Join CTA | 3s | "The page becomes the stage." |
| Gig | On tonight, tickets CTA | 3s | (no caption needed — gig is obvious) |
| Light theme | Standard profile, light colours | 2s | "Yours to own. Fully." |

**Narrative structure (landing page copy, existing sections):**
The Moment Engine should never appear by name in public copy. The public story is:
1. **"The page changes with the moment."** — Not a static bio. It becomes the pre-save before the release, the tickets push on show day, the listening session on premiere night.
2. **"What's next, always."** — Fans can see what's coming: the tour, the early access, the private session. You show them the arc, not just the now.
3. **"The right fan gets the right version."** — Supporters see what supporters see. Public fans see the public world. The access is honest and automatic.

These three lines power the entire landing narrative. Every demo state proves one of them.

---

## 6. Interaction and performance layer

**Motion principles:**
- All Moment-related transitions are slow and deliberate — 300–400ms, deceleration easing
- State chip transitions: 150ms opacity crossfade (already implemented)
- World Map panel: 350ms spring entry, 250ms acceleration exit (already implemented)
- Live state top card: no animation on the green dot — a static dot with a slow 4s opacity pulse (0.5 → 1.0) is premium. A bouncing dot is not.
- Reduced motion: all animations suppressed, state changes are instant, pulse is static

**Progressive reveal:**
- World Map section: `IntersectionObserver` with 60px rootMargin — section renders just before it enters view
- Panel content: fades in over 200ms after the panel opens (not simultaneous with slide)
- Share cards: canvas renders on demand (tap action), not pre-rendered

**Loading states:**
- Livestream embeds: skeleton placeholder while iframe loads (matching artwork dimensions, `rgba(255,255,255,0.05)` shimmer)
- Embed timeout (8s): show "Not loading? [Open in YouTube/Twitch]" fallback link
- World Map grid: if moments array takes more than 100ms to compute — show a simple month skeleton (7 × 6 grey cells, 100ms delay before showing to prevent flash)

**Interaction specifics:**
- Empty date tap in World Map: 120ms accent scale flash on the cell, then deselect. No message.
- Multi-moment date: panel shows the first Moment; future navigation between multiple Moments on one date is a Phase 2 refinement (v1: always shows first)
- State chip click (State 4): scrolls to World Map section, smooth behaviour — already implemented

**Mobile specifics:**
- 44px minimum tap targets on all Moment-related interactive elements (cells are 48px min-height)
- Swipe to navigate months: already implemented
- Panel draggable to dismiss: the `wm-panel-handle` is the primary dismiss target

---

## 7. V1 scope: strict definition

### In v1

| Feature | Surface |
|---|---|
| Canonical Moment object (all fields above) | Data model |
| World Map: all 8 types, 4 tiers, month grid, panel | `able-v6.html` |
| Top card promotion: auto-priority (1–6) + manual `isPromoted` | `able-v6.html` + `admin.html` |
| State 4 near-future chip | `able-v6.html` |
| Livestream Moments: full lifecycle (scheduled/live/ended) | `able-v6.html` + `admin.html` |
| Embed support: YouTube + Vimeo | `able-v6.html` |
| Link-out: Twitch, Instagram, any URL | `able-v6.html` |
| RSVP email capture (extends `able_fans`) | `able-v6.html` |
| Reminder intent storage in localStorage | `able-v6.html` |
| .ics calendar fallback | `able-v6.html` |
| Access gating (fan/supporter/private) in panel | `able-v6.html` |
| Share link: `able.fm/[handle]?m=[id]` | All surfaces |
| Share card: client-side canvas | `admin.html` |
| Admin "Your World": all Moment types, full CRUD | `admin.html` |
| Admin `isPromoted` toggle | `admin.html` |
| Admin "top card status" indicator | `admin.html` |
| Admin replay URL field on ended livestreams | `admin.html` |
| Onboarding: one optional "What's coming up?" step | `start.html` |
| Landing: 6 demo states (profile/pre-release/world map/live/gig/light) | `landing.html` |
| Showcase Mode: 3 contexts, Showcase Object, share card | `able-v6.html` + `admin.html` |

### Deferred to Phase 2

| Feature | Reason |
|---|---|
| Push notifications for reminders (service worker) | Requires SW infrastructure |
| "Notify supporters" batch push | Requires auth + notification stack |
| Multi-moment date panel navigation | Edge case, adds complexity |
| Moment analytics (tap-throughs, RSVP counts in admin) | Requires analytics infra |
| Recurring moments | Scheduling complexity |
| Per-Moment OG image (server-rendered) | Requires server; client canvas is v1 |
| Showcase Mode Project context | Low v1 demand |
| Supabase `moments` table migration | When auth lands |

### Intentionally out of scope

| Feature | Why |
|---|---|
| Native streaming infrastructure | ABLE is the wrapper; Twitch/YouTube are the stream |
| In-platform chat / community | Adds support obligations, changes product character |
| Ticketed streaming / payment processing | Separate product area |
| "Top moments" leaderboard or discovery ranking | Contradicts premium, trust-based positioning |
| Automated moment scheduling via platform OAuth | Overcomplicated, low v1 value |

---

## 8. Public product story: three user-facing truths

These are the only three things the public needs to understand about the Moment Engine. They should never hear the name "Moment Engine."

**1. "Your page matches the moment they clicked from."**
When a fan taps a link in your Story about tomorrow's show, they land on a page that's about tomorrow's show — not your generic bio. The page is always about the thing that matters right now.

**2. "Show what's coming, not just what's done."**
Your fans can see the arc: the release date, the early access window, the listening session next week. Not a dead bio. Not a list of old links. A world with momentum.

**3. "The right fan gets the right version."**
Supporters see what supporters get. People on your list see their rewards. Everyone else sees what they need to see to get closer. The access is automatic and honest — no popups, no upgrades, no sales copy.

---

## 9. The 10/10 system: final summary

**One object.** A Moment is the unit. Everything — the top card, the calendar, the streaming moment, the early access window, the private booking slot, the share card — is an expression of the same canonical object.

**One promotion logic.** The top card is always the promoted Moment. Promotion is either auto-computed by the priority logic or manually set by the artist. One toggle. No confusion.

**One timeline.** The World Map shows all upcoming Moments in one place. Public, fan, supporter, private — all visible, access-gated. The fan understands the system by looking at the calendar, not by reading documentation.

**One access model.** Four tiers — public, fan, supporter, private — applied uniformly across every Moment type. The same logic that gates a supporter-only stream gates a supporter-only early access track. One system.

**One share surface.** Every Moment generates a share link, a share card, and an OG image. The artist shares the ABLE link — not the raw YouTube URL, not a Linktree. ABLE owns the context, the countdown, the access gate, and the replay transition.

**One admin.** "Your World" is where everything lives. No separate "streams" admin, no separate "press pack" admin, no separate "calendar" admin. The artist creates a Moment, promotes it, shares it, and moves on.

The result: a profile that feels alive because it IS alive — it changes with the artist's world, it anticipates what's coming, it rewards the fans who are closest, and it turns every piece of attention into a path toward genuine connection.

---

*This document is the authoritative synthesis of the Moment Engine. All future feature decisions that touch moments, the top card, the calendar, access gating, streaming, or sharing must be grounded here before diverging into individual surface specs.*
