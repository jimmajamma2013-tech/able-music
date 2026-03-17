# Reels Feed — Path to 10
**System: `docs/systems/reels-feed/`**
**Date: 2026-03-16**
**Baseline: 0/10**
**V1 ceiling: 6.5/10**
**V2 ceiling: 8.5/10**
**V3 target: 10/10**

---

## The governing constraint

The clips system cannot reach a high score in a single phase. It depends on:
1. **Volume** — clips only feel good when there are enough of them. A clips section
   with one video looks sparse. A fan.html following feed with clip items feels alive
   only when multiple followed artists are posting. Volume comes from artist adoption,
   not from engineering.
2. **Auth** — enforcing fan/supporter access gating requires knowing who the fan is.
   That requires Supabase auth. Without it, access gating is UI-only (not enforced).
3. **Storage** — file upload requires Supabase Storage. Without it, artists can only
   link to clips hosted elsewhere.

These three constraints explain why V1 scores 6.5 rather than 9+. The engineering
is straightforward. The score ceiling is set by product maturity, not technical difficulty.

---

## Phase progression

### V1 — URL embeds + artist profile + admin management (0 → 6.5/10)

**What ships:**
- Clips section on `able-v7.html` — horizontal scroll, 9:16 cards, full-screen player modal
- Clips management in `admin.html` — URL paste, oEmbed thumbnail, caption, publish toggle
- Clip items in `fan.html` following feed — standard card format with thumbnail + play
- YouTube Short and TikTok embed support
- Access selector in admin UI (UI only — not enforced without auth)

**Score rationale at 6.5:**
- The core loop works: artist adds clip → fans see it
- Mobile experience is correct (9:16 aspect ratio, full-screen on tap, tap-to-unmute)
- Artist management is clean and in the same pattern as snap cards
- Platform compatibility covers the two most common sources at V1
- Access gating is visible but not enforced — conscious known gap, not a mistake
- fan.html clips are cards in the feed, not a dedicated player view — correct for
  the volume expected at launch
- Gaps that prevent a higher score: no upload, no auth-enforced gating, no analytics,
  fan.html cross-origin limitation means clips only appear in the same-browser demo

**V1 build files:**
- `able-v7.html` — add Clips section to page content hierarchy
- `admin.html` — add Clips management section
- `fan.html` — add `clip` item type to following feed renderer
- `netlify/functions/oembed-proxy.js` — extend to handle clip-specific oEmbed fields

---

### V2 — Supabase + auth-enforced gating + upload (6.5 → 8.5/10)

**What ships:**
- `clips` table in Supabase (see SPEC.md Section 9 for schema)
- Fan auth via magic link — fan identity established on sign-up
- Access gating enforced: fan clips only show to authenticated fans, supporter clips
  only show to Close Circle members before `supporter_unlocks_at`
- File upload via Supabase Storage — direct .mp4 upload, stored as
  `clips/{artistSlug}/{clipId}.mp4`
- Server-side thumbnail generation for uploaded files (FFmpeg on Netlify function — runs
  at upload time, not at play time)
- Real cross-device fan following — fan.html reads from Supabase, not localStorage
- Clip items in fan.html now reliably show for all fans, not just same-browser demos
- `supporter_unlocks_at` timer works correctly — subscriber gated until embargo expires

**Score rationale at 8.5:**
- The core loop is now complete and production-ready
- Access gating works as intended — supporter exclusivity is real, not cosmetic
- Upload works — artists are not dependent on external platforms to host clips
- The fan experience is reliable across devices, not just in the demo browser
- Remaining gap: no analytics, no clip completion tracking, no notifications
- Volume is still the ceiling — the product works well but the clips tab on fan.html
  is not yet the right UX at typical clip volume

---

### V3 — Analytics + notifications + dedicated clips view (8.5 → 10/10)

**What ships:**
- Clip play analytics in admin.html — plays, completion rate, most watched this week
- Push notifications: "Nova Reign just posted a clip" — Web Push via Supabase
  realtime (SPEC.md P2.4 pattern from fan PATH-TO-10.md)
- Dedicated clips tab on fan.html — vertical full-screen swipe-up player,
  conditionally enabled when fan follows 5+ artists with recent clips
- Swipe-between-clips on the artist profile full-screen player
- Instagram Reel support (if Instagram oEmbed becomes feasible — conditional on
  platform changes, do not build until it works reliably)
- Clip sharing: artist shares a direct link to a specific clip
  (`able-v7.html?clip={id}` — opens in fullscreen player immediately)
- Clip performance in artist's Campaign HQ — show which clips drove sign-ups

**Score rationale at 10/10:**
- The artist gets real data about what resonates
- Fans get notified in real time — the "staying close" promise is fully delivered
- The dedicated clips tab works because there is now sufficient volume
- The experience end-to-end — from clip creation to fan notification to fan view to
  artist analytics — is a complete, closed loop
- Nothing material is missing

---

## Priority order for V1 build

These are the decisions that must be made before writing any V1 code, in order:

### P0 — Blocking decisions

1. **Clips section placement on able-v7.html** — below snap cards, above music. Confirmed
   in SPEC.md Section 3. This affects page content hierarchy order.

2. **Full-screen player pattern** — modal overlay, not page navigation. Confirmed in
   SPEC.md Section 3. Affects the JS architecture significantly.

3. **able_clips localStorage key** — named and documented in SPEC.md Section 2.
   Must be added to `CLAUDE.md` data architecture table and CONTEXT.md before build.

4. **oEmbed proxy extension** — `oembed-proxy.js` must be extended to return
   `thumbnail_url`, `provider_name`, and `embed_url` for clip-specific use. This is
   a Netlify function change, not an HTML file change.

### P1 — V1 build order (sequential, in this order)

1. Admin management UI — add/edit/delete clips in admin.html
2. able-v7.html Clips section — renders from `able_clips` localStorage
3. Full-screen player modal — shared component used by both admin preview and profile view
4. fan.html clip item type — adds `clip` to the feed item renderer

**Why admin first?** The artist needs to add a clip before any fan-facing view can be
tested. Build the data creation path before the display path.

---

## What 10/10 looks like in practice

A fan follows Nova Reign on ABLE. Nova Reign records a 25-second clip in the studio the
day before the album drops — raw, no edit, just her talking over the track playing through
the monitors. She adds it to admin.html, sets access to "Supporters first", publishes it.

Her Close Circle members get a push notification: "Nova Reign posted something." They
open fan.html, the clip is at the top of their following view. They play it. They can
hear the album before anyone else.

48 hours later, the embargo lifts. All fans see it in their following view with the
type badge "Clip." The artist's admin shows 340 plays, 68% completion rate, and that 12
fans clicked through to pre-save after watching it.

No algorithm decided any of that. The fan who signed up from her Instagram bio months ago
saw it because they signed up. The relationship belongs to them.

That is 10/10.

---

## Score trajectory

| Phase | Score | Primary change |
|---|---|---|
| Baseline | 0/10 | Nothing exists |
| V1 complete | 6.5/10 | Clips on profile + admin + fan feed (embeds only, no auth) |
| V2 complete | 8.5/10 | Supabase + upload + auth-enforced gating |
| V3 complete | 10/10 | Analytics + push notifications + dedicated clips tab |
