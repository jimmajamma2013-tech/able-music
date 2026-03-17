# World Map — Implementation Analysis
**Created: 2026-03-16 | Based on: able-v7.html, admin.html, fan.html code audit**

> This document scores the current World Map implementation across 10 dimensions. It is the honest baseline from which PATH-TO-10.md is written. Nothing is inflated.

---

## What was audited

- `able-v7.html` — lines 2770–3057 (CSS), 5054–5109 (HTML), 5927–6449 (JS)
- `admin.html` — lines 2149–2213 (HTML), 4959–5157 (JS), `ywRenderMomentList`, `ywSaveMoment`, `ywToggleAddForm`
- `fan.html` — `renderFollowing()`, feed data model, `able_fan_following` / `able_fan_feed` localStorage keys
- `docs/v6/data/CANONICAL_OBJECT_MODEL.md` — §3 Moment object definition

---

## Dimension 1 — Artist profile view (fan sees artist's calendar)

**Score: 7/10**

**What is built:**
- Full monthly calendar grid renders via `renderWorldMapGrid()`. Seven-column layout, Monday-start.
- Month navigation (prev/next buttons + swipe gesture on touch).
- Today's cell is highlighted in accent colour. Past dates are dimmed (opacity 0.35/0.40).
- Moment dots appear on days that have moments. Up to 3 dots per day; overflow shown as "+N" text.
- Dot colour is type-coded via `WM_TYPE_COLOR` — 8 types covered with distinct colours.
- Tapping a date cell opens a bottom sheet panel (`wm-panel`) with type label, title, date string, access badge, and CTA.
- The panel slides in with spring easing (`cubic-bezier(0.34,1.56,0.64,1)`), closes on swipe-down or backdrop tap.
- Section is hidden (`hidden` attribute) when there are no upcoming moments in the next 12 months — not shown when empty.
- Featured moment within 7 days gets a `wm-cell--featured` class (corner accent dot).
- An attention-pulse animation (`wm-attention`) fires once on the nearest upcoming moment cell.
- On initial load, the calendar jumps to the month of the nearest upcoming moment.
- Light theme is handled (`[data-theme="light"]` overrides throughout).
- `aria-label` on each cell includes the date and moment types for screen readers.

**What is missing or weak:**
- The month label (`wm-month-label`) is 32px Barlow Condensed. It is a standard size, not the "oversized, dramatic" calendar vision in the spec. The calendar cells are `min-height: 48px` — functional, not dramatic.
- No "oversized" treatment. A standard 7-column grid with 48px cells is not the signature visual it should be. This is the biggest gap between spec and implementation.
- Only the first moment's panel body renders when multiple moments fall on the same day. A multi-moment day shows all dots but `dayMoments[0]` is the only one displayed in the panel.
- No month-header "What's coming" label or intro copy above the grid. The section has `aria-label="What's coming"` but no visible heading.
- `"See all shows"` footer link in the calendar only appears when `show` or `on_sale` typed moments exist — reasonable, but the link goes to `#shows-section` inline rather than a richer shows context.
- Section is promoted in `STATE_PROMOTIONS` for `pre-release` (position 4) and `near-future` (position 2). `near-future` is a computed state not in the Campaign HQ spec — it appears when moments exist within 30 days.

**Verdict:** Functionally solid. Visually adequate. The "oversized, dramatic" character described in the spec is absent.

---

## Dimension 2 — Admin management (artist manages their moments)

**Score: 6/10**

**What is built:**
- "Your World" panel in admin.html with a moment list (`yw-moment-list`) and an "Add moment" button.
- Add moment form has: type selector (8 types as button grid), title text input, date picker, access level selector (Everyone / Fans / Supporters / Just me), optional CTA URL + button label, optional artist note textarea.
- Form validates on save: requires type, date, and non-empty title.
- Saved moments are written to `profile.moments[]` in `able_v3_profile` localStorage and synced via `syncProfile()`.
- Moment list shows: type colour dot, date (short), title, access level tag, "● In hero" badge for the featured moment, delete (×) button.
- Auto-generated moments from `profile.events` (shows) appear in the list with an "from shows" tag and no delete button.
- Auto-generated release moment appears when `profile.releaseDate` is set (type: release, linked to release).
- Private access toggle on the panel enables/disables an enquiry window on the profile.
- Pending enquiry count shown when enquiries exist.

**What is missing or weak:**
- No edit functionality. Once a moment is saved, it cannot be edited — only deleted and re-added. This is a significant UX gap.
- The type vocabulary in admin (8 types: release, show, on_sale, merch_drop, early_access, livestream, private_access, announcement) does not exactly match the canonical object model (9 types: show, release, livestream, early_access, rehearsal, interview, session, remix, collab). Admin has `on_sale`, `merch_drop`, `private_access`, `announcement` — the canonical model has `rehearsal`, `interview`, `session`, `remix`, `collab`. There is a vocabulary mismatch that will cause problems when Supabase lands.
- No `teaser text` field in the add form. The canonical `access.teaserText` field is absent from the UI. The `access.earlyAccessHours` field is also absent.
- No `inviteList` management for invite-only access.
- No auto-suggest to create a release moment when a release date is set in Campaign HQ (it auto-generates at render time, not as a user-facing prompt).
- Moment list truncates at 12 items — no "see more" option.
- No link between a `show`-type moment and the events section data beyond the auto-generate mechanism. An artist cannot manually link a hand-created moment to a specific show record.

**Verdict:** Add works, edit is absent, canonical model has drifted. Functional for simple cases, not sufficient for full spec.

---

## Dimension 3 — Fan dashboard view (fan.html shows moments from all followed artists)

**Score: 2/10**

**What is built:**
- `fan.html` has a Following view with a Today strip and a This week strip.
- Feed items are typed as `release`, `event`, `merch`, `snap`.
- When a fan signs up on an artist's profile, `writeFanFollow()` in `able-v7.html` seeds `able_fan_following` and `able_fan_feed` with artist data, release items, and event items from the current profile state.
- Feed items render with artist accent colour, type badge, relative timestamp, and tap-to-URL.

**What is missing or weak:**
- There is no calendar view in fan.html. The "Your calendar" concept described in the World Map spec does not exist. The Following view is a chronological feed, not a calendar.
- Feed items are seeded once at sign-up time, not dynamically pulled from moment objects. A moment added by the artist after a fan signs up will not appear in the fan's feed.
- The feed model uses `age` (relative time from now) not `date` (future-facing). It is a news-feed, not a calendar. Upcoming shows and releases that are in the future are seeded as if they are "now", which makes the age display misleading.
- Fan-gated and supporter-gated moments from the World Map are not represented in fan.html at all.
- No filter by type (Shows / Releases / Early Access) in the following view.
- No "Tonight" special treatment.
- No cross-artist merged calendar view.

**Verdict:** The following feed exists but is a news-feed approximation, not a calendar. The World Map's cross-surface fan view is essentially not built.

---

## Dimension 4 — Cross-page data flow

**Score: 5/10**

**What is built:**
- Moments are stored in `able_v3_profile.moments[]` (localStorage). Both admin.html writes and able-v7.html reads from this key correctly.
- `syncProfile()` in admin.html calls Supabase `upsert` when `able_artist_id` is set — moments are included in the sync payload as `JSON.stringify(data.moments)`.
- Shows in `profile.events[]` auto-generate moment objects at render time in both able-v7.html (`buildWorldMapMoments()`) and admin.html (`ywRenderMomentList()`). Both surfaces derive from the same source data — no divergence.
- Fan sign-up triggers `writeFanFollow()` which seeds `able_fan_feed` in localStorage — this is the only cross-surface moment propagation currently working.

**What is missing or weak:**
- `fan.html` reads from `able_fan_feed` (a static snapshot seeded at sign-up), not from `able_v3_profile.moments`. There is no live connection between moment changes and the fan dashboard.
- No Supabase realtime subscription in fan.html. The `fan_following` and `fan_feed` tables/keys are only ever written on artist profile sign-up, not on moment add/edit.
- The CANONICAL_OBJECT_MODEL.md defines `moments` as a field on `able_v3_profile`, but the data-architecture SPEC.md likely has a separate `moments` table. This needs reconciliation before Supabase migration.

**Verdict:** Artist profile ↔ admin is solid. Admin ↔ fan.html is a stub.

---

## Dimension 5 — Moment types coverage

**Score: 4/10**

**Canonical model defines 9 types:** show, release, livestream, early_access, rehearsal, interview, session, remix, collab.

**Profile page (`WM_TYPE_COLOR` / `WM_TYPE_LABEL`) defines 8 types:**
- release, show, on_sale, merch_drop, early_access, livestream, private_access, announcement

**Admin add form defines 8 types (same set).**

**Match analysis:**
| Canonical | Profile/Admin | Status |
|---|---|---|
| show | show | Match |
| release | release | Match |
| livestream | livestream | Match |
| early_access | early_access | Match |
| rehearsal | — | Missing |
| interview | — | Missing |
| session | — | Missing |
| remix | — | Missing |
| collab | — | Missing |
| — | on_sale | Extension (not in canonical) |
| — | merch_drop | Extension (not in canonical) |
| — | private_access | Extension (maps to `access: 'private'` concept) |
| — | announcement | Extension (not in canonical) |

The profile-side type set is practical and reasonable for the current build. However, it has drifted from the canonical model. The 5 canonical types that are missing (rehearsal, interview, session, remix, collab) are all "behind the scenes" moments with high value for fan engagement. The extensions (on_sale, merch_drop, announcement) are sensible additions not yet reflected back into the canonical model.

**Verdict:** Functional subset built, canonical model not updated to reflect implementation reality.

---

## Dimension 6 — Access gating

**Score: 5/10**

**What is built:**
- `resolveAccess()` checks `moment.access` against `userState.isFan` and `userState.isSupporter`.
- Fan-gated moments (`access: 'fan'`) show a "Join the list to access this" button that scrolls to the fan sign-up section.
- Supporter-gated moments (`access: 'supporter'`) show a "Join the close circle →" button that opens the Close Circle join sheet.
- Private moments (`access: 'private'`) show an enquiry form (message + email, 50-char minimum).
- Enquiries are stored in `profile.privateAccessEnquiries[]` in localStorage.
- Admin shows pending enquiry count.
- Access badge in the panel uses distinct colours: public (subtle white), fan (teal), supporter (gold), private (dim).

**What is missing or weak:**
- `userState.isFan` is determined by `able_fans.length > 0` — this means if *any* fan has signed up on this device, the current visitor is considered a fan. This is a prototype approximation, not real identity. On a shared device or when testing, every visitor would appear as a fan.
- `userState.isSupporter` is determined by `profile.supporterSince` — this field is set on the artist's own profile, not on a fan's record. It conflates artist and fan supporter state.
- `access.earlyAccessHours` is defined in the canonical model but has no implementation. There is no time-based early access window logic.
- `access.teaserText` is defined in the canonical model but teaser text is not rendered when a moment is locked. Locked moments in the panel show only the gate button, not a teaser.
- `access.teaserVisible` is defined in the canonical model but not implemented. Currently all locked moments show the gate, regardless of this flag.
- Invite-only access (`access.level: 'invite'`) is listed as `private` in the implementation. The canonical model's invite list (`access.inviteList: string[]`) is not implemented.

**Verdict:** Basic gating structure is correct. Identity resolution is prototype-grade, not production-ready. Early access time window, teaser, and invite list are not built.

---

## Dimension 7 — Visual design

**Score: 5/10**

**What is built:**
- A clean, functional monthly calendar. Light and dark themes. Correct accent colour integration.
- Type-coded dot colours (8 types, each with a distinct colour).
- Today cell has accent-coloured date number. Past cells are dimmed.
- Selected cell has a `color-mix` accent background and a 2px type-colour bottom bar.
- Featured cell has a corner dot.
- Month navigation is clean.
- Slide animation between months (translateX 40px, 220ms decel easing).
- Attention pulse on nearest upcoming moment.
- Bottom sheet panel with spring animation, handle, and swipe-to-close.
- Panel access badges have distinct colour treatments per access level.

**What is missing or weak:**
- The calendar is not "oversized" or "dramatic". Cells are 48px minimum height — a standard mobile calendar grid. Nothing in the visual design says "this is a signature ABLE feature". A standard iOS calendar looks bigger.
- The month label (Barlow Condensed, 32px, 700 weight) is the only display-scale element. It is not sufficient to create the "World Map" feeling.
- No section heading. The section has `aria-label="What's coming"` but no visible H2 or label. The world map appears without introduction.
- The card background is `--color-surface` (standard card colour). It does not feel distinct from the rest of the page.
- No visual treatment differentiating "nothing here yet" cells from "empty future" cells. All empty days look the same.
- Featured moment cell has a corner dot but no "happening soon" call-out above the grid.
- Multi-moment days show stacked dots but the panel only shows one moment. There is no list of all moments for that day.

**Verdict:** The implementation is clean and correct but not distinctive. The "World Map" brand identity is absent from the visual execution.

---

## Dimension 8 — Mobile experience

**Score: 8/10**

**What is built:**
- Swipe left/right on the grid navigates months (40px threshold, with vertical scroll protection).
- `touch-action: pan-y` on the grid correctly allows vertical page scroll.
- Swipe down on the panel sheet closes it.
- `overscroll-behavior: contain` on the panel prevents scroll chaining.
- Cells have min-height 48px, satisfying the 44px tap target rule.
- `wm-nav-btn` is 36px — below the 44px rule. This is a minor violation.
- The grid uses `padding: 0 var(--sp-3)` inside the card, which fits within 375px without horizontal scroll.
- No iframe, no fixed-width element that would cause overflow.

**What is missing or weak:**
- `wm-nav-btn` at 36px is below the 44px minimum tap target. Should be 44px.
- The panel opens at `position: fixed; bottom: 0; left: 0; right: 0` — correct for mobile. No max-width constraint on desktop, which will look stretched at wider viewports.
- Focus management: `panel.focus()` is called on open, but focus is not trapped inside the panel. This is an accessibility gap on keyboard/screen reader.

**Verdict:** Good mobile experience. Two fixable gaps (nav button tap target, panel focus trap).

---

## Dimension 9 — Linking (tap a moment → somewhere useful)

**Score: 6/10**

**What is built:**
- Panel renders a CTA link for moments with a `cta.url` and `cta.type === 'link'`. Opens `target="_blank" rel="noopener noreferrer"`. URL is validated via `isSafeUrl()`.
- Auto-generated release moments link to `profile.ctaPrimary.url` (the artist's primary CTA).
- Auto-generated show moments link to `show.ticketUrl`.
- "Get tickets" button appears for shows with ticket URLs.
- "Pre-save" vs "Stream now" CTA label switches based on whether `releaseDate` is future or past.
- Moments with `cta.type === 'notify'` render a notify button (no backend action yet).
- Fan-gate button scrolls to the fan sign-up section — smooth and correct.
- Supporter-gate button opens the Close Circle join sheet via `wm-supporter-gate` global click handler.

**What is missing or weak:**
- Moments without a CTA URL show no button. There is no fallback CTA (e.g., "Watch for updates" → fan sign-up, or "Follow on Spotify").
- The `notify` CTA type renders a button but clicking it does nothing — no subscriber registration, no feedback.
- Multi-moment days: only the first moment is shown in the panel. If a fan taps a day with a release and a show, they see only one.
- No deep-link routing. There is no URL scheme like `?moment=abc123` to share a specific moment directly. Sharing a moment means sharing the full profile URL and hoping the fan finds it.

**Verdict:** Linking works for the primary cases. Edge cases (multi-moment, notify CTA, no-URL moments, deep-links) are unfinished.

---

## Dimension 10 — Empty state

**Score: 4/10**

**What is built:**
- If no upcoming moments exist in the next 12 months, the entire `world-map-section` is hidden. The section simply does not appear.
- No empty state message is shown to the visitor — the section is invisible.

**What is missing or weak:**
- On the fan profile page, an empty World Map with a message ("Nothing announced yet. Check back.") would be valuable — it communicates that the artist uses ABLE and moments will come. Currently the section disappears entirely.
- In owner mode, there is no empty state invite to add a moment. The section hides, and the owner must go to admin to add moments.
- Admin empty state is better: "No upcoming moments yet. Add shows in the Events page, or add a moment here." with a link to the events section. This is functional and honest.

**Verdict:** Admin empty state is adequate. Profile empty state is absent — the section hides rather than communicating with fans.

---

## Summary scorecard

| Dimension | Score | Key gap |
|---|---|---|
| 1. Artist profile view | 7/10 | Not oversized/dramatic; multi-moment panel only shows first |
| 2. Admin management | 6/10 | No edit; type vocabulary mismatch; no teaser/earlyAccessHours |
| 3. Fan dashboard view | 2/10 | Calendar view not built; feed is static snapshot not live moments |
| 4. Cross-page data flow | 5/10 | Admin ↔ profile solid; profile ↔ fan.html is stub |
| 5. Moment type coverage | 4/10 | 5 canonical types missing; 4 extensions not in canonical model |
| 6. Access gating | 5/10 | Identity resolution prototype-grade; earlyAccessHours/teaser not built |
| 7. Visual design | 5/10 | Functional not distinctive; no "World Map" drama |
| 8. Mobile experience | 8/10 | Nav button 36px (< 44px rule); no focus trap in panel |
| 9. Linking | 6/10 | Notify CTA inert; multi-moment day shows only first; no deep-links |
| 10. Empty state | 4/10 | Profile hides entirely rather than showing a meaningful empty state |

**Overall: 5.2/10**

The implementation is not broken — it works for the primary case (artist has a show or release, fan taps, sees the moment, taps CTA). But it is not yet the World Map as specced: not visually distinctive, not connected to fan.html in a meaningful way, and not supporting the full canonical moment object.
