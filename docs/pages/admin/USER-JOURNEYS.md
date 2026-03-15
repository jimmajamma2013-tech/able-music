# Admin Dashboard — User Journeys
**File: `admin.html` | Created: 2026-03-15**

> Three distinct artist types interact with admin.html differently. Each journey must work perfectly.

---

## JOURNEY 1 — The New Artist (Day 0)

**Who:** Just finished the onboarding wizard (start.html). Arrived in admin for the first time.
**State:** Empty. No fans, no clicks, no shows. Profile partially filled from wizard.
**Emotional state:** Curious + nervous. "Did this actually work? What do I do next?"

### The journey

1. **Lands on Home page** after wizard redirect
   - Sees: "Good to see you, [Name]. Your page is live."
   - First-run checklist is prominent (not yet dismissed)
   - Stats: all show 0 with "Day 1 ✦" instead of shimmer
   - Campaign HQ: Profile state (default), invitation to set a release date
   - No upgrade nudge yet (too early)

2. **Reads first-run checklist**
   - Step 1 already done (artwork/profile from wizard) ✓
   - Taps "Copy your page link" → copies → marks done ✓
   - Taps "Put the link in your Instagram and TikTok bio" → marks done ✓
   - Taps "Add your latest release" → goes to Music page

3. **Music page**
   - Empty state: "Paste a Spotify, YouTube, or SoundCloud link — artwork fills in automatically."
   - Artist pastes a link → embed appears → back to Home

4. **First-run checklist completes**
   - Progress bar fills to 100%
   - Brief completion moment: "Your page is ready. This is where your fans start."
   - Checklist fades and dismisses

5. **Returns to Home**
   - Campaign HQ now has a gentle prompt: "Releasing something? Set a date →"
   - Stats still 0, but the 0s feel right now (not broken)

**What must work:** First-run checklist → each step navigates correctly → completion animation → Campaign HQ invitation.

**Current gaps:**
- Name not in greeting
- Day 1 stats shimmer forever (looks broken)
- No completion moment for checklist
- Upgrade nudge appears too early (before checklist complete)

---

## JOURNEY 2 — The Active Artist (Day 14)

**Who:** Has been using ABLE for 2 weeks. 40 fans, 300 visits, pre-release campaign running.
**State:** Pre-release active. Release date in 3 days. Some fans, some clicks.
**Emotional state:** Focused. "The release is coming. Is everything ready? How are the numbers?"

### The journey

1. **Returns to Home**
   - Greeting: "Good to see you, Nadia. 3 days until Echoes."
   - Stats: sparklines visible (7-day data), numbers real
   - Campaign HQ is the dominant card: countdown ticking, timeline arc showing Pre-release as active
   - First-run checklist is dismissed

2. **Checks Campaign HQ**
   - Sees: "Echoes | Release countdown: 3d 14h 22m"
   - Timeline arc: ────●────────────
   - Auto-switch hint: "Switches to Live automatically on [date]"
   - Taps "Edit release →" to confirm pre-save URL is correct

3. **Checks Fans**
   - 40 fans in list
   - Source badges: 28 Instagram, 8 TikTok, 4 Direct
   - Thinks "most came from Instagram, should post again"
   - Stars 3 superfans manually

4. **Sees nudge: "You've got 40 fans. Add a snap card to update them on the release"**
   - Taps → goes to Updates page
   - Adds snap card: "3 days away."

5. **Returns to home**
   - Greeting sub-line: "3 days until Echoes. Everything's set."

**What must work:** Contextual greeting with release info. Campaign HQ countdown visible immediately. Fan list with source filtering. Snap card add flow.

**Current gaps:**
- Greeting sub-line never updates (hardcoded)
- No auto-switch confirmation copy on Campaign HQ
- Snap card add requires navigating away from Home — no quick-add

---

## JOURNEY 3 — The Gig Night Artist

**Who:** Playing tonight at a venue. Activated gig mode.
**State:** Gig mode active. Show tonight. Wants to make sure page is right.
**Emotional state:** Pre-show energy. Focused. Time-sensitive.

### The journey

1. **Opens dashboard before the show**
   - Greeting: "You're on tonight."
   - Campaign HQ: Gig Tonight state — dominant, urgent
   - C16 countdown bar showing time remaining (e.g. "3h 22m until midnight")
   - Gig toggle: active (filled, pulsing)
   - "Edit show details →" visible

2. **Taps Campaign HQ → show details**
   - Sees venue, time, ticket URL
   - Edits if needed

3. **Views live page**
   - Taps "View live page ↗"
   - Sees gig mode: tickets front and centre, "On tonight" badge
   - Returns to admin satisfied

4. **During the show: fans are signing up**
   - Later checks fans: new fans from QR code (source: `?src=qr`)
   - "Show → 8 new fans tonight"

5. **After midnight: gig mode auto-deactivates**
   - Returns to Profile state automatically
   - Greeting: "Last night was [venue]. 8 fans joined."

**What must work:** Gig mode activation. Countdown bar. Contextual greeting changes. QR code (accent-coloured, `?src=qr`).

**Current gaps:**
- Greeting never says "You're on tonight"
- QR code not built
- Post-show "X fans joined last night" moment not implemented
- Gig mode auto-deactivation confirmed (localStorage check) but post-show state not specced

---

## JOURNEY 4 — The Release Day Artist

**Who:** Release date has arrived. Switches from Pre-release to Live.
**State:** Live state, just went live.
**Emotional state:** Excited/nervous. "Is it working? Are people finding it?"

### The journey

1. **Release day morning: auto-switch**
   - Was in Pre-release, now in Live (auto-switched at releaseDate)
   - Greeting: "[Release title] is out. This is your window."
   - Campaign HQ: Live state — countdown showing "12 days left in Live window"
   - Stats: showing first-day numbers as they come in

2. **Watches fans roll in**
   - Stats update (debounced, not real-time — but fast)
   - Source badges show Instagram/TikTok spike after posting
   - "It's working." card appears when clicks arrive

3. **Posts a snap card update**
   - "Echoes is out. Stream it here."
   - Updates section visible on profile immediately

4. **14 days after release**
   - Live window ends. Greeting: "Your Live window has closed. Your page is back to its base state."
   - Campaign HQ: back to Profile
   - Nudge: "Setting up your next release? →"

**What must work:** Auto-switch Profile→Live. Live window countdown. "It's working" card. Post-live nudge for next release.

**Current gaps:**
- Auto-switch visible indicator missing
- Greeting never says "[Release title] is out"
- Live window end state not specced in detail

---

## AI USER STORY CHECK

The admin.html must also work well when navigated by AI tools (Supabase AI, future ABLE AI features).

**AI agent scenarios:**
- An AI assistant that helps the artist set up their page: "Can you set my release date to next Friday?"
  → Admin must expose clear state controls, not just visual UI
- An AI that reads the artist's stats and gives advice: "You had 40 fans from Instagram — when did you post?"
  → Stats data must be structured (not just visual)
- Automated monitoring: "Notify me if my fan count drops"
  → Data architecture must be localStorage-first with clear schema

**Current AI readiness:** The localStorage schema is well-defined. The admin.html could theoretically be programmatically driven. No specific AI hooks needed yet, but the data model is clean.

---

## CROSS-JOURNEY PRINCIPLES

1. **The greeting is the pulse** — every artist who opens admin.html should feel that the dashboard knows what moment they're in. This is the single highest-leverage thing.

2. **Campaign HQ is the heartbeat** — whatever state the campaign is in, this card should dominate the page. The artist's primary action is always "what is my page doing right now?"

3. **Fans are people, not numbers** — the fan list should feel like a growing roster, not a spreadsheet. Source badges and timestamps make it personal.

4. **The exit to the live page is always there** — "Edit page →" and "View live page ↗" are never more than one tap away. The artist should never feel stuck in admin.
