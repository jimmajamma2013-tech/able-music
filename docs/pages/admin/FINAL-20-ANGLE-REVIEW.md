# Admin Dashboard — Final 20-Angle Review
**Created: 2026-03-15 | All prior docs synthesised.**
**This is the definitive pre-build score. Do not build until Pass 2 is complete.**

---

## SYNTHESIS: SPEC + 20-ANGLE-ANALYSIS + PATH-TO-10 + USER-JOURNEYS + STRATEGY-REVIEW-FINAL

---

### 1. First 3 Seconds
**Score: 8/10** *(specced → 8 after P0 fixes)*

With P0.2 (contextual greeting) and P0.4 (Campaign HQ above stats):
- "Good to see you, Nadia. 3 days until Echoes." — immediate, contextual, no shimmer
- Campaign HQ is the first card the artist reads after the greeting
- Stats resolve from localStorage in < 100ms (no API wait)
- Upgrade nudge is deferred until first-run is complete

**Why not 10:** The very first render on a new device still has a 1-frame flash before localStorage resolves. Imperceptible but not zero.

**What would make it 11:** Zero flash — SSR or persistent session state. Not possible in single-file HTML.

---

### 2. Primary Job
**Score: 9/10** *(with P0.4 Campaign HQ hierarchy fix)*

With Campaign HQ above stats, the page's job is visible in its structure:
1. Greeting: who you are and what moment you're in
2. Campaign HQ: what your page is doing and what to do about it
3. Stats: confirmation that it's working
4. Nudge: one specific next step

**Why not 10:** The hierarchy on day 1 (no campaign active, no stats) is slightly ambiguous — the artist has Campaign HQ with nothing meaningful in it yet. The first-run checklist temporarily takes over as the primary directive, which is correct but creates a hierarchy inconsistency.

**What would make it 11:** Adaptive hierarchy — on day 1, checklist IS Campaign HQ. On day 14 with active campaign, Campaign HQ dominates. The page structure shifts based on lifecycle stage.

---

### 3. Copy Voice
**Score: 9/10** *(with COPY.md audit applied)*

With all COPY.md changes applied:
- Greeting: "Good to see you, [Name]. [contextual sub]"
- First-run: "Four things, then you're live."
- Stats: "Visits", "Clicks", "Fans", "Click rate"
- Empty states: all in ABLE voice
- Milestone moments: all written and specced
- Nudge copy: already good, maintained

**Why not 10:** Some copy in deep sections (settings, broadcasts) has not been fully audited. The tier gate copy is good but "See Artist Pro →" as upgrade CTA is slightly product-centric (the user doesn't know what "Artist Pro" means yet).

**What would make it 11:** Fully contextual copy that references the artist's own music — "Tell fans about Echoes →" rather than generic prompts.

---

### 4. Information Architecture
**Score: 9/10** *(with P0.4 Campaign HQ moved above stats)*

New home page order:
1. Greeting (name + contextual sub-line)
2. Campaign HQ (primary action — dominant card)
3. Stats row (confirmation)
4. "It's working" card (conditional — first click data)
5. Milestone card (conditional — fan milestones)
6. Nudge (one context-aware prompt)
7. Upgrade bar (deferred until after first-run)

**Why not 10:** The Home page still contains a lot. At full state (active campaign + stats + milestone + nudge + upgrade bar), it can feel busy. But each card has clear conditional logic — they don't all appear at once.

**What would make it 11:** A layout system that collapses older cards (milestone, first-run) into a timeline/history strip at the bottom of the page, keeping the top section clean.

---

### 5. Campaign HQ
**Score: 9/10** *(with P0.4 hierarchy + P2.2 auto-switch copy + state description confirmations)*

With fixes:
- Campaign HQ is the first card after the greeting
- State buttons: min-height 56px confirmed
- State descriptions: one-line per state, confirmed in spec
- Auto-switch indicator: "Switches automatically on [date]"
- Accent left border when a campaign is active
- C16 gig countdown bar remains (excellent, existing)
- Release timeline arc remains (excellent, existing)

**Why not 10:** The state transitions in Campaign HQ (pressing a state button) need a micro-animation spec — currently the on/off state changes but doesn't spring. This is a detail but it matters.

**What would make it 11:** A state transition animation — the active state button springs in with `var(--spring)`, and the timeline arc re-draws to reflect the new state. This turns state switching from a UI action into a meaningful moment.

---

### 6. Data Trust
**Score: 8/10** *(with P0.3 day-1 zero state)*

With P0.3 applied:
- Day 1: "0 visits yet. Your first visitor is on their way." instead of infinite shimmer
- Day 2+: real numbers from localStorage, sparklines from day 3
- "Day 1 ✦" delta on first day
- Sparklines hidden on days 1–2 (no misleading flat line)

**Why not 10:** Until Supabase auth lands, there's no confirmation that the data is backed up anywhere. Artist can lose all data if they clear localStorage or switch device. A small "Your data is stored locally until you connect your account" note in Settings would help.

**What would make it 11:** Real-time sync to Supabase — artist opens admin on new device and all their data is there. This is the Supabase migration, not a design change.

---

### 7. Empty State Experience
**Score: 8/10** *(with P0.3 + P1.5 copy audit + first-run completion moment)*

With fixes:
- Stats: day-1 zero state instead of shimmer
- First-run: "Four things, then you're live." → completion moment
- All section empty states: COPY.md spec applied
- Fan list empty state: confirmed and strong
- Music empty state: directive and honest

**Why not 10:** The very first landing from the wizard (day 0, post-wizard redirect) isn't distinctly different from the regular day-1 experience. An artist who just finished the wizard should feel a "you made it" moment.

**What would make it 11:** A one-time "welcome to admin" state — "Your page is live. Share the link and your first fans will find you." — shown only on the very first ever admin.html load, for 3 seconds, then transitions to normal home view.

---

### 8. Fan Relationship
**Score: 9/10** *(with P1.1 milestones + confirmation that fan list elements are built)*

With P1.1:
- First fan: "Your first fan. This is how every list starts."
- 10 fans, 50 fans, 100 fans: each has a moment
- Fan list: stagger entrance, star system, source badges, filter pills — confirmed
- Export always visible: "Export as CSV →"

**Why not 10:** "Newest fan" indicator (24h "new" tag on fresh sign-ups) not yet specced. This would make the fan list feel alive — the artist can see who just signed up in the last day.

**What would make it 11:** Real-time fan sign-up notifications — a gentle toast when a new fan signs up ("Someone just signed up from TikTok."). Only possible with Supabase realtime.

---

### 9. Mobile Experience
**Score: 8/10** *(with P0.1 sidebar collapse + bottom tab bar)*

With P0.1:
- Sidebar collapses completely below 768px
- Bottom tab bar: Home / Fans / Campaign / Content / More
- Stats row: 2×2 grid on mobile
- Campaign HQ state buttons: stack vertically on mobile
- All tap targets: 56px minimum
- Bottom padding: 88px for tab bar safe area

**Why not 10:** Campaign bottom sheet (opening Campaign HQ as a full-screen sheet on mobile) is more complex than in-page scrolling. The spec says "Campaign tab opens Campaign HQ as a full-screen sheet" but the implementation will be non-trivial and is subject to jank.

**What would make it 11:** PWA install ("Add to Home Screen") with service worker — the admin becomes a native-feeling app on the artist's phone. Beyond V1 scope.

---

### 10. Performance
**Score: 9/10** *(current, no changes needed)*

- localStorage renders immediately, no API dependency
- Skeleton shimmer resolves max 600ms (P0.3)
- Fonts preloaded
- Grain texture: inline data URI
- Spring/decel easing throughout

**Why not 10:** Font display swap not confirmed. If Google Fonts is slow, body text reflows after load.

**What would make it 11:** Self-hosted fonts. Sub-100ms TTI on 3G. Beyond V1 scope.

---

### 11. Edit Mode Connection
**Score: 8/10** *(with P1.3 live preview chip)*

With P1.3:
- Live preview chip in topbar: small indicator with artist's accent colour + pulsing dot
- Chip taps to open live page in new tab
- "Edit page →" still in topbar
- "View live page ↗" still in topbar actions

**Why not 10:** No phone preview thumbnail — artist can't see what their page currently looks like without leaving admin. This would require an `<iframe>` thumbnail of able-v7.html in Campaign HQ or a floating preview.

**What would make it 11:** Mini phone preview (80px wide) in Campaign HQ that updates when state changes — shows the current page state in miniature. Technically feasible with an `<iframe src="able-v7.html" style="width:390px; height:844px; transform:scale(0.2)">`.

---

### 12. Tier Gating
**Score: 8/10** *(with copy improvements from COPY.md)*

With COPY.md applied:
- Broadcasts gate: "Write to your fans directly. Not a broadcast. Not a newsletter. Just you and the people who signed up."
- Analytics gate: "Full analytics: see exactly which post sent you fans, for 90 days."
- Fan cap: "Your list is full. These are 100 people who wanted to stay close to your music."
- Upgrade bar: deferred to after first-run complete

**Why not 10:** "See Artist Pro →" as the upgrade CTA is still product-centric. Artists on day 14 don't know what "Artist Pro" is. The upgrade flow (Settings page redirect) isn't a proper upgrade experience.

**What would make it 11:** Upgrade bottom sheet — when artist taps any gate, a sheet rises showing all three tiers (Free/Artist/Artist Pro/Label) with the relevant tier highlighted. Price, features, specific value props. No redirect.

---

### 13. Contextual Intelligence
**Score: 9/10** *(with P0.2 contextual greeting)*

With P0.2:
- Greeting sub-line is a live sentence reflecting the artist's exact state
- Gig mode: "You're on tonight."
- Pre-release: "[N] days until [release title]. Your page is set."
- Live window: "[Release title] is out. This is your window."
- Post-gig: "Last night at [venue]. [N] fans joined."
- Quiet: "Your page, your list, your relationship."
- Returning: "+[N] fans since you last checked."

**Why not 10:** The dashboard pages (Fans, Analytics, Shows) don't adapt to context — they're always in the same state regardless of what's happening. Contextual intelligence stops at the greeting.

**What would make it 11:** The entire dashboard changes register during key moments — pre-release week has a subtle urgency to the whole layout, gig night has a slightly different energy. Subtle background tint or font weight shift.

---

### 14. First-Run Experience
**Score: 9/10** *(with P1.2 checklist improvements)*

With P1.2:
- "Four things, then you're live."
- Each step is actionable and specific
- Completion: "Your page is ready. This is where your fans start."
- Checklist fades gracefully after completion
- Milestone card takes over after first fan

**Why not 10:** The redirect from wizard to admin doesn't carry any contextual handoff. The artist could see a "Just imported from Spotify" banner or "Welcome back, you just set up your page" moment on the very first visit.

**What would make it 11:** Cross-page transition — wizard Done screen says "Opening your dashboard…" and admin first load says "Good to meet you, Nadia. Your page is live." (referencing the wizard completion, not just a generic greeting).

---

### 15. Motivation and Milestones
**Score: 9/10** *(with P1.1 milestone system)*

With P1.1:
- Fan #1: "Your first fan. This is how every list starts."
- Fan #10: "10 fans. 10 people who said yes."
- Fan #50: "50 fans. 50 people your music reached directly."
- Fan #100: "100 fans. This is the free tier limit — and it means 100 people found you on their own."
- "It's working." card when first click data arrives
- Stats counter animation on first load (G14, existing)

**Why not 10:** No streak/consistency signals. No "your page has had visitors every day this week." These are subtle but they make artists feel like something is building, not just one-time moments.

**What would make it 11:** A subtle progression bar or "momentum" indicator — not gamification, but a quiet signal: "3 consecutive days of visitors." "5 consecutive days." This creates a reason to keep the page active.

---

### 16. Accessibility
**Score: 9/10** *(with P2.4 skeleton aria-hidden + P1.6 focus ring glow)*

With P1.6 + P2.4:
- Focus ring: glow pattern (matching onboarding)
- Skeleton shimmer: aria-hidden
- All aria-labels: confirmed
- WCAG 2.2 AA: confirmed for focus visibility

**Why not 10:** `--dash-t3: #888888` on `--dash-card: #ffffff` is 4.1:1 — borderline for small text. Should be `#777777` (4.5:1) for full AA compliance on text below 18px.

**What would make it 11:** Full automated accessibility audit (axe-core) as part of Playwright tests, run on every commit.

---

### 17. Trust and Data Ownership
**Score: 9/10** *(with P2.5 toast voice + export confirmation)*

Currently strong. With minor additions:
- Export always visible and clearly labelled
- "These emails are yours." note in fan list
- "0% taken by ABLE. Stripe standard fee only." on support page (confirmed existing)

**Why not 10:** Until Supabase auth, artist's data is not truly portable — device-bound. This is a fundamental V1 limitation, not a design fix.

**What would make it 11:** After Supabase auth: "Your account. Your data. Export, delete, or take it elsewhere at any time." in Settings.

---

### 18. Copy Details
**Score: 9/10** *(with COPY.md audit applied)*

With full copy audit:
- All labels updated: "Visits", "Clicks", "Fans", "Click rate"
- All empty states in ABLE voice
- Toast messages: all audited
- Nudge copy: confirmed
- Milestone copy: written and specced

**Why not 10:** A full audit of every single line in admin.html (5936 lines) hasn't been done. Deep sections (settings inner copy, broadcasts preview copy, individual field hints) need a line-by-line pass.

**What would make it 11:** Grep-level audit of all visible text, each line evaluated against COPY.md rules.

---

### 19. Animation and Delight
**Score: 9/10** *(with P1.4 "It's working" entrance + checklist completion animation)*

With additions:
- "It's working" card: fadeSlide entrance (translateY + opacity)
- Checklist completion: individual steps fade, then completion line appears
- Campaign HQ state button: spring transition when switching states
- Milestone card: gentle entrance animation

Existing (already good):
- D13 fan row stagger entrance
- G14 stats counter animation
- C16 gig countdown bar
- Live pulse animations
- Spring easing throughout

**Why not 10:** Campaign HQ state switch doesn't yet have a micro-animation spec for the button-press itself. The timeline arc doesn't redraw on state change.

**What would make it 11:** Campaign HQ state switch = the most satisfying button press in the dashboard. Active state springs in, inactive states gently fade. Timeline arc re-animates to show new position.

---

### 20. Big Picture Coherence
**Score: 8/10** *(with P1.3 live preview chip + accent colour bridge)*

With P1.3:
- Live chip in topbar uses artist's accent colour (not admin amber) — creates visual bridge
- Barlow Condensed display font shared between admin and profile pages
- "Edit page →" / "View live page ↗" always available
- Warm cream = backstage; midnight navy = fan-facing — intentional and correct

**Why not 10:** The visual difference between admin (cream) and profile (dark/themed) is intentional but can feel jarring on mobile when switching. No transition animation between them.

**What would make it 11:** `@view-transition { navigation: auto }` with a matching `view-transition-name` on the topbar logo — so when the artist taps "View live page ↗", there's a shared-element transition (logo flies from admin topbar to artist name on profile). Progressive enhancement.

---

## SCORE SUMMARY — PASS 1

| Angle | Baseline | Pass 1 | Change |
|---|---|---|---|
| 1. First 3 Seconds | 7 | 8 | +1 |
| 2. Primary Job | 7 | 9 | +2 |
| 3. Copy Voice | 7 | 9 | +2 |
| 4. Information Architecture | 7 | 9 | +2 |
| 5. Campaign HQ | 7 | 9 | +2 |
| 6. Data Trust | 6 | 8 | +2 |
| 7. Empty State Experience | 6 | 8 | +2 |
| 8. Fan Relationship | 7 | 9 | +2 |
| 9. Mobile Experience | 5 | 8 | +3 |
| 10. Performance | 8 | 9 | +1 |
| 11. Edit Mode Connection | 7 | 8 | +1 |
| 12. Tier Gating | 7 | 8 | +1 |
| 13. Contextual Intelligence | 5 | 9 | +4 |
| 14. First-Run Experience | 7 | 9 | +2 |
| 15. Motivation and Milestones | 4 | 9 | +5 |
| 16. Accessibility | 8 | 9 | +1 |
| 17. Trust and Data Ownership | 8 | 9 | +1 |
| 18. Copy Details | 6 | 9 | +3 |
| 19. Animation and Delight | 7 | 9 | +2 |
| 20. Big Picture Coherence | 6 | 8 | +2 |
| **Overall** | **6.8** | **8.8** | **+2.0** |

---

## PASS 2 GAPS (for FINAL-20-ANGLE-REVIEW-2.md)

To get from 8.8 → 9.9:

| Angle | Gap | Fix needed |
|---|---|---|
| 1. First 3 Seconds (8→9) | 1-frame flash | Font display swap |
| 2. Primary Job (9→10) | Day-1 hierarchy | Adaptive hierarchy by lifecycle stage |
| 3. Copy Voice (9→10) | Deep section copy not audited | Full line-by-line pass |
| 4. IA (9→10) | Busy state | Card collapsing system |
| 5. Campaign HQ (9→10) | No state switch animation | Spring animation on button press |
| 6. Data Trust (8→9) | No backup warning | "Stored locally" note in Settings |
| 7. Empty State (8→9) | No wizard handoff moment | One-time "welcome to admin" first load |
| 8. Fan Relationship (9→10) | No "newest" indicator | 24h "new" tag on fresh sign-ups |
| 9. Mobile (8→9) | Campaign bottom sheet jank risk | Smooth bottom sheet animation spec |
| 10. Performance (9→10) | Font reflow risk | Font display: swap confirmed |
| 11. Edit Mode (8→9) | No phone preview | Mini iframe preview in Campaign HQ |
| 12. Tier Gating (8→9) | Upgrade flow is Settings redirect | Upgrade bottom sheet spec |
| 13. Contextual (9→10) | Context stops at greeting | Sub-pages don't adapt |
| 14. First-Run (9→10) | No wizard handoff | Cross-page greeting on first admin load |
| 15. Milestones (9→10) | No streak signals | Consecutive day visitor tracking |
| 16. Accessibility (9→10) | t3 colour borderline | #888888 → #777777 |
| 17. Trust (9→10) | Device-bound until Supabase | Settings trust copy |
| 18. Copy (9→10) | Deep section not audited | Full line-by-line pass |
| 19. Animation (9→10) | No Campaign HQ state switch anim | Spring on button press + arc redraw |
| 20. Coherence (8→9) | Jarring transition | view-transition on Edit page link |
