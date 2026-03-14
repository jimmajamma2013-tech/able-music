# ABLE — Live Moments: Cross-Surface UI Implementation Spec
**Created:** 2026-03-14
**Status:** ACTIVE — implementation-facing
**Companion spec:** `STREAMING_MOMENTS_SPEC.md` (conceptual decisions; this doc does not re-debate them)

---

## Overview

This spec translates the Live Moments product decisions into concrete UI instructions per surface. It specifies CSS class names, JS function names to add or extend, data shape additions, exact copy, and lifecycle state tables. It does not contain implementation code.

Three surfaces are covered: `able-v6.html` (public profile), `admin.html` (artist dashboard), `landing.html` (marketing page).

---

## 1. Data Shape

### 1.1 Moment object additions

Live Moments are entries in `profile.moments[]` with `type: 'livestream'`. The full object shape is defined in `STREAMING_MOMENTS_SPEC.md` §5. The following fields are the key additions implementors must be aware of when extending the World Map and top card code:

| Field | Role in UI |
|---|---|
| `livestreamType` | Drives the type badge label and tile icon in creation flow |
| `time` + `timezone` | Used by `lmComputeState()` to determine scheduled/live/ended |
| `coverImageUrl` | Overrides artist artwork in top card and share card; nullable |
| `platform` | Determines embed vs link-out in `lmGetEmbedBehaviour()` |
| `embedUrl` | The iframe `src`; null for link-out platforms |
| `rsvpEnabled` | Shows/hides RSVP capture UI in the moment panel |
| `replayUrl` | Unlocks replay CTA in ended state |
| `replayAccess` | Separate access gate applied to replay CTA |
| `state` | Never persisted; computed at render time by `lmComputeState()` |
| `featuredInTopCard` | Boolean; set by admin toggle; drives promoted top card hero |
| `liveOverride` | Boolean; set by "Go live" in admin; bypasses time-based state logic |

### 1.2 New localStorage keys

| Key | Shape | Purpose |
|---|---|---|
| `able_reminders` | `[{momentId, scheduledFor, artistHandle}]` | Reminder intents stored until SW fires |

`able_fans` is extended only by source tag — no schema change. RSVP entries use `source: 'rsvp_lm_[id]'`.

### 1.3 Lifecycle state computation

`lmComputeState(moment)` — new function, called at render time wherever a Live Moment is displayed.

Logic:
1. If `moment.liveOverride === true` → return `'live'`
2. Compute `streamStart = Date.parse(moment.date + 'T' + moment.time)` adjusted for `moment.timezone`
3. If now < streamStart → return `'scheduled'`
4. If now < streamStart + 7200000 (2 hours) → return `'live'`
5. Else → return `'ended'`

This function is the single source of truth for lifecycle state across all three surfaces.

### 1.4 Embed behaviour helper

`lmGetEmbedBehaviour(moment)` — returns an object `{canEmbed: boolean, embedUrl: string|null, linkUrl: string}`.

Platform routing:
- `youtube` or `vimeo` with a valid `embedUrl` → `canEmbed: true`
- `twitch` with channel slug confirmed → `canEmbed: true`, `embedUrl` includes `parent=able.fm`
- All others → `canEmbed: false`, `linkUrl = moment.streamUrl`

---

## 2. able-v6.html — Public Profile

### 2.1 Top card: lifecycle state table

| State | Computed by | Top card treatment | CTA |
|---|---|---|---|
| Scheduled (>7 days out) | `lmComputeState()` | No top card change — calendar chip only | State 4 chip with contextual text |
| Scheduled (<7 days, not featured) | `lmComputeState()` | State 4 chip fires; standard hero remains | Chip CTA: "Set a reminder" |
| Scheduled + `featuredInTopCard: true` | `lmComputeState()` + `featuredInTopCard` | Dedicated countdown hero renders (see §2.2) | "Set a reminder" + RSVP |
| Live | `lmComputeState()` | Full live top card; overrides all campaign states | "Join" |
| Ended + `replayUrl` set | `lmComputeState()` | Standard hero returns; replay chip fires | Chip CTA: "Watch replay" |
| Ended + no replay | `lmComputeState()` | Standard hero returns; chip: next moment | Chip CTA: "Catch the next one" |

The live state takes unconditional priority over the existing `stateOverride` campaign state machine. The check order in `applyHeroState()` should be: live moment check first, then existing campaign state logic.

### 2.2 Promoted top card (featured, scheduled state)

Rendered only when `moment.featuredInTopCard === true` and `lmComputeState(moment) === 'scheduled'`.

DOM structure — new element, class `.lm-hero`:

```
.lm-hero
  .lm-hero__artwork          ← coverImageUrl or artist artwork; full bleed; dark overlay
  .lm-hero__type-badge       ← livestream type label (e.g. "Listening session")
  .lm-hero__countdown        ← "2d 14h 32m" — updates every 60s via setInterval
  .lm-hero__title            ← moment title, display font
  .lm-hero__access-badge     ← "Public" / "Supporters only" / etc.
  .lm-hero__ctas
    .btn.btn--primary        ← "Set a reminder"
    .btn.btn--ghost          ← "I'm in" (RSVP, if rsvpEnabled)
```

**Countdown format:** `Xd Yh Zm` — days, hours, minutes. No seconds. If under 1 hour: `Yh Zm`. If under 1 minute: "Starting soon."

**Reduced motion:** When `prefers-reduced-motion: reduce` is active, hide `.lm-hero__countdown` and show `.lm-hero__date-text` instead — a static string formatted as "Thursday 8 May · 8pm BST".

**ARIA:** `aria-label="Stream starts in [countdown text]"` on `.lm-hero__countdown`. `aria-live="polite"` on the outer `.lm-hero` for state transition announcements.

### 2.3 Live top card

Rendered when `lmComputeState(moment) === 'live'`. Replaces the standard hero content. The top card element gains class `.hero--live`.

DOM structure:

```
.hero--live
  .hero__live-artwork        ← coverImageUrl or artist artwork; full bleed; dark overlay (rgba 0 0 0 / 0.45)
  .lm-live-badge             ← green dot + "LIVE NOW" text; absolute, top-left
    .lm-live-dot             ← pulsing green dot
    span                     ← "LIVE NOW"
  .lm-live-title             ← moment title; display font; bottom-third of card
  .hero__ctas
    .btn.btn--primary        ← "Join" — triggers embed expansion or link-out
```

**Live badge ARIA:** `role="status"` on `.lm-live-badge`. When the page transitions from scheduled to live state, emit an `aria-live="polite"` announcement: "Stream is now live."

**"Join" behaviour:**
- `lmGetEmbedBehaviour(moment).canEmbed === true` → `lmExpandEmbed(moment)` — expands the top card into an iframe panel (see §2.4)
- `canEmbed === false` → `window.open(moment.streamUrl, '_blank')` — opens in new tab

**State chip override:** The `.hero__state-chip` text is replaced with "Live now" and the chip element gains class `.hero__state-chip--live` (green accent).

### 2.4 Embed expansion panel

`lmExpandEmbed(moment)` — new function. Mirrors the existing video top card expansion pattern.

Behaviour:
1. Append `.lm-embed-panel` inside `.hero--live`, below the artwork
2. Insert a skeleton placeholder `.lm-embed-skeleton` immediately (matches artwork dimensions)
3. Create iframe with `src = moment.embedUrl`, `allow="autoplay; fullscreen"`, `loading="lazy"`
4. On iframe `load` event → remove `.lm-embed-skeleton`
5. If iframe has not fired `load` after 8 seconds → show `.lm-embed-timeout` inside the panel: "Stream not loading? [Open on [Platform]]" — link to `moment.streamUrl`

The iframe is constrained to 16:9 aspect ratio, `width: 100%` of the top card, `height` auto. A `scroll-snap-stop: always` container wraps the embed so the card does not scroll out of view mid-stream.

**Skeleton styles:**
- Background: `rgba(255,255,255,0.05)`
- Shimmer: same CSS `@keyframes lm-shimmer` keyframe used by other skeleton states in able-v6.html — reuse the existing animation name if it exists, else define once and share.

### 2.5 Ended state

`lmComputeState(moment) === 'ended'`. Standard hero returns. The State 4 chip fires one of two texts:

With replay (`moment.replayUrl` set, within 48h of stream end):
- Chip label: "Replay available"
- Chip CTA: "Watch replay" → `lmGetEmbedBehaviour({...moment, streamUrl: moment.replayUrl, embedUrl: null})` — same embed-or-link logic, applied to replay URL
- Chip class: `.hero__state-chip--replay`

Without replay (or >48h after stream ended):
- Chip label: next upcoming Live Moment title if one exists ("What's next: [title]")
- Chip CTA: "Catch the next one" → scrolls to World Map, auto-selects next moment date
- Chip class: `.hero__state-chip--ended`

### 2.6 World Map panel extensions

`openWorldMapPanel()` already renders a half-sheet for moments. For `type: 'livestream'`, the panel content is lifecycle-aware. Extend `renderWorldMapMomentPanel(moment)` to call `lmComputeState(moment)` and branch on the result.

**Scheduled state panel:**

```
[.wm-panel__type-badge .wm-type--livestream]  "Listening session"
[.wm-panel__title]                             Moment title — display font
[.wm-panel__datetime]                          "Thursday 8 May · 8:00pm BST"
[.wm-panel__artist-note]                       Artist note text — if set
[.wm-panel__access-badge]                      "Public — anyone can join"
[.wm-panel__actions]
  .btn.btn--primary  "Set a reminder"          → lmRequestReminder(moment)
  .btn.btn--ghost    "I'm in"                  → lmExpandRsvp(moment)  — if rsvpEnabled
```

**Live state panel:**

```
[.wm-panel__type-badge .wm-type--live]  green pulse dot + "LIVE NOW"
[.wm-panel__title]                       Moment title
[.wm-panel__artist-note]                 Artist note — if set
[.wm-panel__actions]
  .btn.btn--primary  "Join now →"        → embed or link-out (same lmGetEmbedBehaviour logic)
```

**Ended + replay panel:**

```
[.wm-panel__type-badge .wm-type--ended]  "Ended" — muted colour
[.wm-panel__title]                        Moment title
[.wm-panel__actions]
  .btn.btn--primary  "Watch replay"       → lmGetEmbedBehaviour replay
  .wm-panel__next-link                    "What's next: [next moment title] →"
```

**Ended + no replay panel:**

```
[.wm-panel__type-badge .wm-type--ended]  "Ended"
[.wm-panel__artist-note]                  Artist note — kept visible
[.wm-panel__actions]
  .btn.btn--ghost  "Catch the next one →" → scrolls calendar to next moment
```

### 2.7 RSVP inline expansion

`lmExpandRsvp(moment)` — expands inline within the World Map panel half-sheet. No new panel, no navigation.

DOM change: the `.wm-panel__actions` section is replaced by `.lm-rsvp-form`:

```
.lm-rsvp-form
  input[type="email"]  placeholder: "your@email.com"
  .btn.btn--primary    "I'm in"
  .lm-rsvp__hint       "No account needed."
```

On submit:
1. Validate email format client-side
2. Read `able_fans` from localStorage; check for existing entry with same email
3. If new: push `{email, ts: Date.now(), source: 'rsvp_lm_[moment.id]'}`
4. If existing: append source tag to existing record (no duplicate)
5. Replace `.lm-rsvp-form` with `.lm-rsvp-confirm`:

**Confirmation copy (if reminder was already granted):**
"You're in. I'll remind you before it starts."

**Confirmation copy (if no notification permission):**
"Saved. [Add to calendar]" — the link triggers `lmGenerateIcs(moment)`.

### 2.8 Reminder system

`lmRequestReminder(moment)` — called from "Set a reminder" button.

Flow:
1. `Notification.requestPermission()` — async
2. On `'granted'`: write to `able_reminders` in localStorage: `{momentId: moment.id, scheduledFor: lmGetStreamStart(moment), artistHandle: profile.handle}`. Register SW if not already. Replace button with "Reminder set" (disabled state).
3. On `'denied'` or `'default'`: call `lmShowCalendarFallback(moment)` — inline expansion showing three options:
   - "Add to Google Calendar" → URL-encoded Google Calendar link
   - "Add to Apple Calendar" → triggers `lmGenerateIcs(moment)` download
   - "Copy date" → copies formatted date string to clipboard

`lmGenerateIcs(moment)` — generates a `.ics` file client-side. Fields:
- `SUMMARY`: `[Artist name] — [Moment title]`
- `DTSTART`: moment date/time in UTC, computed from `moment.date + moment.time + moment.timezone`
- `DURATION`: PT2H (2 hours default)
- `DESCRIPTION`: `moment.artistNote` + `\n\n` + ABLE moment URL
- `URL`: `able.fm/[handle]#lm_[moment.id]`

### 2.9 World Map dot states for Live Moments

The existing dot rendering in the calendar grid is extended. `renderWorldMapDot(moment)` checks `type` and `lmComputeState()`:

| Computed state | Dot treatment | CSS class on dot element |
|---|---|---|
| `scheduled` (not featured) | Standard blue dot `#4b8fd4` | `.wm-dot--livestream` |
| `scheduled` (featured, nearest upcoming) | Blue dot + thin blue ring | `.wm-dot--livestream .wm-dot--featured` |
| `live` | Blue dot with slow 4s opacity pulse | `.wm-dot--livestream .wm-dot--live` |
| `ended` | Dot at 50% opacity | `.wm-dot--livestream .wm-dot--ended` |

**Reduced motion:** `.wm-dot--live` pulse animation is suppressed. The dot is rendered slightly larger (`width: 10px` vs standard `7px`) as a static differentiation cue.

### 2.10 Deep link handling

On profile load, `lmHandleDeepLink()` checks `window.location.hash` for `#lm_[id]` pattern.

If matched:
1. Find the matching moment in `profile.moments[]`
2. Call `lmComputeState(moment)` — if `'live'`, apply live top card immediately
3. Scroll to the World Map section (`#world-map-section`)
4. Auto-select the moment's date in the calendar
5. Call `openWorldMapPanel(moment)` to open the half-sheet

---

## 3. admin.html — Artist Dashboard

### 3.1 Extended creation flow

Live Moments are created through the existing "Your World" 5-step creation sheet (`ywOpenCreateSheet()`). No new sheet is needed. When `type === 'livestream'` is selected, additional fields activate in Steps 2, 3, 4, and 5.

**Step 1 — Type picker (existing):**
The existing moment type tile grid includes "Live Moment". Selecting it reveals a secondary 6-tile subtype picker within Step 1 (or as a Step 1b transition). Subtype tiles:

| Tile | Icon suggestion | Label |
|---|---|---|
| `listening_session` | headphones | "Listening session" |
| `premiere` | film frame | "Premiere" |
| `qa` | speech bubble | "Q&A" |
| `supporter_performance` | mic | "Supporter performance" |
| `studio_session` | mixing board | "Studio session" |
| `virtual_show` | stage | "Virtual show" |

Selected subtype writes to `moment.livestreamType`. Single-select only.

**Step 2 — Date (extended):**
Below the existing date picker, two new fields activate:

- `.yw-time-field`: `<input type="time">` — label "Time" — writes to `moment.time`
- `.yw-tz-select`: `<select>` — label "Timezone" — short list of 10 common zones, default from `Intl.DateTimeFormat().resolvedOptions().timeZone` — writes to `moment.timezone`

Timezone short list (display name → IANA value):
London (GMT/BST), Paris/Berlin (CET), Lagos (WAT), Nairobi (EAT), New York (ET), Chicago (CT), Los Angeles (PT), Toronto (ET), Sydney (AEST), Auckland (NZST).

**Step 3 — Details (extended):**
After the standard title and artist note fields:

- `.yw-cover-url-field`: text input — label "Poster image (optional)" — placeholder "Paste image URL" — writes to `moment.coverImageUrl`
- `.yw-platform-tiles`: 5-tile platform picker — YouTube / Twitch / Vimeo / Instagram / Other — writes to `moment.platform`
- `.yw-stream-url-field`: text input — label "Stream link" — placeholder "Paste your stream URL" — writes to `moment.streamUrl`
- On `streamUrl` input blur: call `lmAutoDetectEmbed(streamUrl)` → if YouTube or Vimeo URL detected, auto-populate a preview: "Embed detected — fans on supported devices will see the stream directly." If Twitch: "Twitch stream — works if your channel slug is [detected slug]." If other: "This will open in a new tab for fans."

**Step 4 — Access (extended):**
After the standard four-tier access picker:

- `.yw-replay-access-select`: dropdown — label "Replay access" — options: "Same as above / Public / Fan list / Supporters / No replay" — helper text: "Replay access can be more open than live access."
- `.yw-rsvp-toggle`: toggle switch — label "Let fans RSVP for this moment" — default on — writes to `moment.rsvpEnabled`

**Step 5 — Stream setup (simplified for live moments):**
Standard Step 5 (CTA) is replaced for `type === 'livestream'` with:

- Informational block: "During the stream, the 'Join' button appears automatically." (no action required)
- `.yw-notify-fans-toggle`: toggle — label "Notify fans when you go live" — helper: "Coming soon — we'll send a push to fans who RSVPd." — disabled state with "Coming soon" pill. Stores `moment.notifyOnLive = true` for future use, does not send anything in v1.
- Review summary shown inline: moment type, title, date/time/timezone, platform, access tier, RSVP status.

### 3.2 Moment list: Live Moment list item

`ywRenderMomentList()` renders each moment as a list item. For `type === 'livestream'`, the list item extends:

```
.yw-moment-item .yw-moment-item--livestream
  .yw-moment-item__type-badge        "Listening session" — small label
  .yw-moment-item__title             Moment title
  .yw-moment-item__meta              Date · Time · Platform
  .yw-moment-item__state-chip        Computed state chip (Scheduled / Live / Ended)
  .yw-moment-item__rsvp-count        "[N] RSVPs" — if rsvpEnabled; count from able_fans
  .yw-moment-item__actions
    [state-dependent action buttons — see §3.3]
  .yw-moment-item__feature-toggle    "Feature in top card" — toggle
```

**RSVP count:** `lmGetRsvpCount(momentId)` — filters `able_fans` for entries where `source` contains `momentId`. Returns integer. Shown inline as "[N] RSVPs" in muted text.

### 3.3 State-dependent admin actions

`lmRenderAdminActions(moment)` — called within each list item. Returns action buttons based on computed state.

| Computed state | Actions rendered |
|---|---|
| `scheduled` | Edit, Delete, "Go live" (`lmSetLiveOverride(moment)`) |
| `live` | "End stream" (`lmClearLiveOverride(moment)`), "Extend by 1 hour" (`lmExtendLiveWindow(moment)`) |
| `ended` (no replay) | "Add replay" (`lmExpandReplayField(moment)`), Edit, Archive |
| `ended` (replay set) | "Edit replay URL" (`lmExpandReplayField(moment, edit=true)`), Archive |

**"Go live":** Sets `moment.liveOverride = true`, saves to localStorage, re-renders the moment item and triggers `applyHeroState()` if the artist is previewing.

**"Add replay" inline expansion:** Tapping "Add replay" expands an inline field within the list item (no modal):
```
.lm-replay-field
  input[type="url"]  placeholder "Paste replay URL"
  .yw-replay-access-select   dropdown — Replay access tier
  .btn.btn--primary  "Save replay"
```
On save: updates `moment.replayUrl` and `moment.replayAccess`, re-renders the list item.

### 3.4 "Feature in top card" toggle

`.yw-moment-item__feature-toggle` — toggle switch with label "Feature in top card."

Behaviour:
- Only one moment can be featured at a time. Toggling one on automatically sets `featuredInTopCard: false` on all other moments in `profile.moments[]`.
- When active, the list item gains a `.yw-moment-item--featured` modifier and shows "Featured in top card" as a green inline label.
- `lmSetFeatured(momentId)` — sets `featuredInTopCard: true` on the specified moment, clears all others, saves profile.

### 3.5 Preview toggle

The existing "See as fan" preview concept from the World Map spec applies. For live moments, the preview toggle in the "Your World" section (`ywTogglePreview()`) also cycles through lifecycle states:

- While in preview mode, a secondary control appears: "Preview as: Scheduled / Live / Ended" — a 3-option pill selector
- Selecting a state calls `lmSetPreviewOverride(state)` which stores a session-only override (not persisted) and re-renders the top card and World Map panel as a fan would see each state
- This override is cleared when preview mode is exited

---

## 4. landing.html — Marketing Page

### 4.1 New demo state: dp-livestream

The existing phone demo cycle gains one new state. It is inserted after the World Map state and before the light theme state.

**Activation:** `showDemoState('dp-livestream')` — follows the same pattern as other demo states in the landing page cycle. Duration in cycle: 3 seconds.

**Visual content (static mockup — no actual embed):**

The demo phone top card renders in live state using static demo data:
- Background: same demo artwork used in other states; dark overlay `rgba(0,0,0,0.45)`
- `.dp-live-badge`: absolute, top-left — green dot + "LIVE NOW" text
- `.dp-live-title`: stream title text in display font, bottom-third of card — demo copy: "Resonance — listening session"
- `.dp-live-cta`: "Join" button, accent fill, centered bottom of card

**New CSS classes (landing.html scope only):**

`.dp-live-badge` — flexbox row; `gap: 6px`; `align-items: center`; `padding: 6px 10px`; `border-radius: 20px`; `background: rgba(0,0,0,0.5)`; `font-size: 11px`; `font-weight: 600`; `letter-spacing: 0.08em`; `color: #ffffff`; positioned absolute, `top: 16px; left: 16px`.

`.dp-live-dot` — `width: 8px; height: 8px; border-radius: 50%; background: #22c55e`. Animation: same 4s opacity pulse keyframe as World Map pulse ring (define once, reference by name). Reduced motion: static, no animation.

`.dp-live-title` — absolute, `bottom: 72px; left: 16px; right: 16px`; display font; `font-size: 22px`; `color: #ffffff`; `line-height: 1.2`.

`.dp-live-cta` — styled as `.btn.btn--primary` at demo scale; centered, `bottom: 24px`.

### 4.2 Caption / proof line

Below or alongside the demo phone during the `dp-livestream` state, the existing demo caption area shows:

> "Live when it matters. Yours when it's over."

This line requires no new DOM element if the existing caption slot is used. It replaces whatever caption is shown during this state in the demo cycle.

### 4.3 What is not added to landing.html

- No new feature callout section for Live Moments
- No "streaming platform" messaging
- No screenshots of admin creation flow
- No bullet-point feature list
- The single demo phone state and proof line are the complete landing treatment

---

## 5. Share Surface

### 5.1 Share card generation

`lmGenerateShareCard(moment, profile)` — extends the existing client-side Canvas share card pipeline.

Canvas dimensions: 1080×1920 (9:16 portrait). Drawing order:

1. Background: `coverImageUrl` if set, else `profile.artworkUrl`. Scale to fill.
2. Gradient overlay: linear, top `rgba(0,0,0,0)` to bottom `rgba(0,0,0,0.7)`.
3. If `lmComputeState(moment) === 'live'`: draw green dot (`radius: 6px`, `fill: #22c55e`) and "LIVE" text at top-left (relative to canvas, `top: 80px, left: 60px`).
4. Livestream type label — small caps — `top-centre or left-aligned`, `font: 'Barlow Condensed'`, muted.
5. Moment title — `font: 'Barlow Condensed'`, large, white, centre-bottom area.
6. Date/time string — below title — `font: 'DM Sans'`, smaller, muted white.
7. `able.fm/[handle]` — bottom of card — small, `opacity: 0.7`.

Triggered from: "Share card" button in the admin moment list item (`.yw-moment-item__share-btn`). Opens canvas preview in an overlay with a "Download" button.

### 5.2 In Showcase Mode

A Live Moment can serve as the Showcase Object (per `SHOWCASE_CAMPAIGN_MODE_SPEC.md`). When `profile.showcaseObject.type === 'livestream'`:

| Computed state | Showcase primary action |
|---|---|
| `scheduled` | "Set a reminder" — countdown visible |
| `live` | "Watch live" → embed or link-out |
| `ended` + replayUrl | "Watch replay" → replay embed or link |
| `ended` + no replay | Showcase falls back to next upcoming moment |

`lmGetShowcaseContent(moment)` — returns the correct title, CTA label, and action for the current computed state, consumed by the Showcase renderer.

---

## 6. Micro-interaction Reference

All animations defined here should reuse existing keyframe names where they exist in able-v6.html. Define new keyframes only when no existing one applies.

| Element | Animation | Duration | Easing | Reduced motion |
|---|---|---|---|---|
| `.lm-live-dot` | opacity 1→0.4→1 pulse | 4s | ease-in-out | Static |
| `.wm-dot--live` | Same opacity pulse | 4s | ease-in-out | Static, slightly larger |
| `.lm-embed-skeleton` | shimmer (background-position slide) | 1.5s | linear | Static background |
| `.lm-hero` state transitions | opacity fade | 300ms | `cubic-bezier(0.25,0.46,0.45,0.94)` | Instant |
| RSVP form expansion | `max-height` 0→auto + opacity | 250ms | `cubic-bezier(0.25,0.46,0.45,0.94)` | Instant |

---

## 7. Copy Reference

All copy follows the ABLE copy philosophy (no exclamation marks, no marketing-speak, first-person where appropriate).

| Surface | Context | Copy |
|---|---|---|
| State 4 chip — scheduled <7d | Listening session | "Listening session — Thursday 8pm" |
| State 4 chip — scheduled <7d | Premiere | "Premiere tonight — 9pm" |
| State 4 chip — live | Any type | "Live now" |
| State 4 chip — ended, replay available | Any type | "Replay available" |
| State 4 chip — ended, no replay | Any type | "Catch the next one" |
| Top card live state | CTA | "Join" |
| Top card live state, link-out | CTA | "Join" (behaviour differs, label is the same) |
| World Map panel — scheduled | Primary CTA | "Set a reminder" |
| World Map panel — scheduled, RSVP | Secondary CTA | "I'm in" |
| World Map panel — live | Primary CTA | "Join now →" |
| World Map panel — ended + replay | Primary CTA | "Watch replay" |
| World Map panel — ended, no replay | CTA | "Catch the next one →" |
| RSVP confirmation — reminder granted | Confirmation | "You're in. I'll remind you before it starts." |
| RSVP confirmation — no permission | Confirmation | "Saved. [Add to calendar]" |
| Embed load timeout (8s) | Fallback | "Stream not loading? [Open on YouTube]" — platform name is dynamic |
| Admin — notify toggle | Helper text | "Coming soon — we'll send a push to fans who RSVPd." |
| Landing demo caption | Proof line | "Live when it matters. Yours when it's over." |
| Access badge — fan list | Inline badge | "Your list — sign up to join" |
| Access badge — supporter | Inline badge | "Supporters only" |
| Access badge — private | Inline badge | "Invite only" |
| Access gate — supporter (non-supporter sees) | Panel text | "This one's for supporters. [Find out more]" |

---

## 8. V1 Build Checklist

Grouped by surface for implementation sequencing.

**able-v6.html:**
- [ ] `lmComputeState(moment)` — core state function
- [ ] `lmGetEmbedBehaviour(moment)` — embed vs link-out routing
- [ ] Live top card treatment (`.hero--live`, `.lm-live-badge`, `.lm-live-dot`)
- [ ] `lmExpandEmbed(moment)` — iframe expansion with skeleton and timeout
- [ ] Promoted top card hero (`.lm-hero`) — countdown, reduced-motion fallback
- [ ] `lmHandleDeepLink()` — hash parsing on load
- [ ] World Map panel extension — lifecycle-aware content in `renderWorldMapMomentPanel()`
- [ ] World Map dot state extensions — live pulse, ended opacity, featured ring
- [ ] `lmExpandRsvp(moment)` — inline RSVP form in moment panel
- [ ] `lmRequestReminder(moment)` — permission request + localStorage intent
- [ ] `lmGenerateIcs(moment)` — .ics file client-side
- [ ] `lmShowCalendarFallback(moment)` — Google Calendar URL + ICS download
- [ ] State chip variants for replay and ended states
- [ ] ARIA roles and aria-live announcements on state transitions

**admin.html:**
- [ ] Step 1: livestream subtype tile picker (6 tiles)
- [ ] Step 2: time + timezone fields
- [ ] Step 3: cover image URL, platform tiles, stream URL, embed auto-detection (`lmAutoDetectEmbed()`)
- [ ] Step 4: replay access picker, RSVP toggle
- [ ] Step 5: replacement for standard CTA step; notify toggle (disabled, "Coming soon")
- [ ] `ywRenderMomentList()` extension for `type === 'livestream'` list item
- [ ] `lmGetRsvpCount(momentId)` — filters able_fans
- [ ] `lmRenderAdminActions(moment)` — state-dependent action buttons
- [ ] `lmSetLiveOverride()` / `lmClearLiveOverride()` / `lmExtendLiveWindow()`
- [ ] `lmExpandReplayField(moment)` — inline replay URL entry
- [ ] `lmSetFeatured(momentId)` — exclusive feature toggle
- [ ] Preview state override control (Scheduled / Live / Ended pill)

**landing.html:**
- [ ] `dp-livestream` demo state — static mockup, `.dp-live-badge`, `.dp-live-dot`, `.dp-live-title`
- [ ] Demo cycle integration — 3s duration, correct position in sequence
- [ ] Caption slot: proof line "Live when it matters. Yours when it's over."

**Share / canvas:**
- [ ] `lmGenerateShareCard(moment, profile)` — canvas pipeline
- [ ] "Share card" button in admin moment list items
- [ ] `lmGetShowcaseContent(moment)` — Showcase Mode integration

---

*The profile becomes the stage. Everything else is infrastructure.*
