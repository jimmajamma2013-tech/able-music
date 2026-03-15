# Admin Dashboard — 20-Angle Analysis
**File: `admin.html` | Created: 2026-03-15 | Starting score: 6.8/10**

> This document scores the current admin.html against 20 critical design angles. Each angle scored 1–10. Findings feed directly into PATH-TO-10.md.

---

## THE 20 ANGLES

---

### 1. First 3 Seconds
**Score: 7/10**

What the artist sees when they open their dashboard:
- "Good to see you." (greeting — but no name)
- "Your page, your list, your relationship." (sub-line — always this, never contextual)
- Upgrade nudge bar (immediately commercial — wrong priority for a returning artist)
- First-run checklist (if not dismissed)
- Stats row with skeleton shimmer

**What works:** The greeting tone is right. The sub-line is strong ABLE copy. Stats row is well-placed.

**What doesn't:** Artist name is missing from greeting. Upgrade nudge appears before first-run checklist — the first thing an artist sees is a commercial prompt, which breaks the "backstage, not SaaS" feeling. Stats shimmer for a beat before numbers resolve.

**What a 10 looks like:** "Good to see you, Nadia." Contextual sub-line. Greeting resolves instantly from localStorage. Upgrade nudge is dismissed by default after first view, not persistent.

---

### 2. Primary Job
**Score: 7/10**

The page's job: give the artist confidence that their page is working + surface the right next action.

**What works:** Stats row tells the story. Campaign HQ is present. First-run checklist directs action. Nudge system surfaces context-aware next steps.

**What doesn't:** Campaign HQ sits below the stats row — visually, the four stat cards dominate. For an artist who just set a release date, the most important thing is the countdown in Campaign HQ, not "248 visits." The page hierarchy doesn't match the functional hierarchy.

**What a 10 looks like:** Campaign HQ is the most visually prominent card on the page. Stats row is secondary. The page communicates "this is your control room" not "here are numbers."

---

### 3. Copy Voice
**Score: 7/10**

ABLE's copy principle: artist's voice, direct, honest, specific. No generic SaaS micro-copy.

**Excellent current moments:**
- "Your page, your list, your relationship." — perfect
- "It's working." — perfect
- "When fans sign up on your page, they'll appear here." — good
- Nudge copy: "Playing anywhere soon? Your fans want to know →" — excellent
- Export copy: "Export as CSV →" — clean

**Weak current moments:**
- First-run checklist title: "Get your page working — 4 quick things" — functional but could be sharper
- Upgrade bar: "Broadcasts, full analytics, and deeper fan insight when you're ready." — decent but generic
- Page titles: "Profile", "Music", "Shows", "Updates", "Connections" — functional, correct per SPEC
- First-run step titles are slightly bland ("Copy your page link" vs something more intentional)

**What a 10 looks like:** Every piece of copy in the admin feels like it was written specifically for an independent musician, not adapted from a generic SaaS product. The bar for "first-run" onboarding is raised.

---

### 4. Information Architecture
**Score: 7/10**

Current home page order:
1. Greeting + URL + member since
2. Upgrade nudge bar (persistent, not dismissed)
3. First-run checklist
4. "It's working" card (conditional)
5. Stats row (4 cards + sparklines)
6. Campaign HQ
7. Pre-release nudge (conditional)
8. Gig mode nudge (conditional)
9. Context nudge card
10. Recent activity feed (implied)

**What works:** General flow from identity → motivation → data → action is right.

**What doesn't:** Two key problems:
1. Upgrade nudge (commercial) appears before first-run checklist (functional) — wrong priority
2. Campaign HQ should be ABOVE the stats row for returning artists — it's the primary action, not a secondary card
3. Activity feed is referenced in spec but position/implementation is unclear

**What a 10 looks like:**
- New artist: greeting → first-run checklist → stats → Campaign HQ → nudge
- Returning artist: greeting → Campaign HQ → stats → "it's working" (if applicable) → nudge
- Upgrade nudge: only shown after first-run is complete, and only once per session

---

### 5. Campaign HQ
**Score: 7/10**

The product differentiator. The artist's control room for their page's current moment.

**What works:**
- State machine implemented (profile/pre-release/live/gig)
- Release timeline arc — excellent visual
- Gig toggle with C16 countdown bar — standout feature
- State pills with colour coding
- Live pulse animation on the live state pill

**What doesn't:**
- Visual weight: Campaign HQ is a `dash-card` — same visual weight as "Merch" or "Connections." It should feel like the most important card on the page.
- State switcher buttons are `min-width:80px` flex items — adequate but not the 56px tap-height guaranteed in SPEC
- State descriptions below each button exist in SPEC but aren't confirmed as built
- No "automatic switch" confirmation copy visible (auto-switches at releaseDate are mentioned but no user-visible indicator of the auto-switch)

**What a 10 looks like:** Campaign HQ card is visually larger, bolder, more prominent than any other card. State buttons have explicit tap heights. Auto-switch behaviour has a visible "auto" indicator ("Switches automatically on [date]").

---

### 6. Data Trust
**Score: 6/10**

Do the numbers feel real and meaningful, or could they be anything?

**What works:**
- Numbers come from localStorage (real data, not demo)
- Skeleton loading states (shimmer) communicate "loading real data"
- Sparklines give 7-day context
- Deltas ("+ 18 today") add meaning to raw numbers

**What doesn't:**
- No distinction between "zero because new" vs "zero because broken" — a new artist sees 0, 0, 0, 0% with no explanation
- Sparklines render as empty/flat lines on day 1, which looks broken
- No "your page went live X days ago" context — numbers without timeline feel arbitrary
- Click rate is shown for all artists, including those with 0 fans — "0%" means nothing

**What a 10 looks like:** Day 1 zero states have copy ("Your first visitor is on their way."). Sparklines only render after day 3. "Since you went live [date]" appears below stats when baseline is small.

---

### 7. Empty State Experience
**Score: 6/10**

For a brand new artist with zero data across all sections.

**What works:**
- First-run checklist is visible and actionable
- Section-specific empty states exist for Music, Shows, Updates, etc.
- Empty states in many sections are directive ("Paste a Spotify, YouTube, or SoundCloud link")

**What doesn't:**
- Stats row empty state: skeleton shimmer runs indefinitely — looks broken, not motivating
- Fan list empty state ("When fans sign up on your page, they'll appear here. Your list, your relationship — no algorithm between you.") is good copy but the visual design isn't confirmed
- Snap cards empty state copy not audited
- No "Day 0" home page experience — artist finishing onboarding and landing in admin for the first time gets the same home page as a returning artist

**What a 10 looks like:** The very first visit to admin.html (immediately post-wizard) has a distinct, warm welcome state. Stats show "Day 1 ✦" rather than shimmer. Each empty section has an honest, motivating empty state that sounds like ABLE, not generic SaaS.

---

### 8. Fan Relationship
**Score: 7/10**

The fan list is the most emotionally important page in the admin. Does it feel like a relationship or a database?

**What works:**
- Stagger entrance animation (D13 — first load, session-flagged)
- Star system for saving specific fans
- Source badges (Instagram/Spotify/TikTok/Direct) — tells the story of where fans come from
- Filter pills for source filtering (confirmed in STATUS.md)
- "It's working" card appears on home when first click data arrives
- "Your list, your relationship — no algorithm between you." in empty state

**What doesn't:**
- First fan milestone: no celebration when fan #1 arrives. Just appears in the list.
- 100-fan gate: copy exists in SPEC but exact emotional register needs audit
- No "newest fan" indicator — which of these people just signed up?
- Export is listed in SPEC but unclear if implemented and visible

**What a 10 looks like:** First fan gets a moment ("Your first fan just signed up — this is how it starts."). The list has a heartbeat. Newest fans have a "new" tag that fades after 24h. Export is always visible, prominent enough to communicate "this is yours."

---

### 9. Mobile Experience
**Score: 5/10**

Does admin.html work at 375px?

**Current state:**
- CSS for `.mobile-nav` exists with `display:none` — but appears to be set to `display:none` twice (possible bug)
- Sidebar collapses to 0 on mobile implicitly (via `--sidebar:220px` with `margin-left:var(--sidebar)` — this means the content is offset by 220px off-screen on mobile)
- No confirmed media queries that collapse the sidebar
- Bottom tab bar items exist (`.mn-item`) but not wired

**Critical issues:**
- The sidebar navigation is likely unusable on mobile — entire page potentially offset or sidebar overlapping content
- Campaign HQ state buttons: `min-width:80px` flex items may overflow on 375px
- Stats row: `grid-template-columns:repeat(4,1fr)` will create very small cards at 375px

**What a 10 looks like:** Sidebar collapses completely below 768px. Bottom tab bar appears and works. Stats row goes 2×2. Campaign HQ state buttons stack. All tap targets 56px minimum.

---

### 10. Performance
**Score: 8/10**

Does the page feel instant?

**What works:**
- Renders from localStorage immediately — no API wait
- Skeleton loading states for stats (shimmer)
- Spring/decel easing for animations — feels alive not sluggish
- Grain texture uses inline SVG data URI — no additional request
- Fonts preloaded via Google Fonts preconnect

**What doesn't:**
- Skeleton shimmer has no maximum duration — if localStorage is empty, shimmer runs forever
- First contentful paint may be delayed by font loading on slow connections

**What a 10 looks like:** Shimmer has a max 600ms after DOMContentLoaded before resolving to zero state. Font display swap or fallback so content reads immediately.

---

### 11. Edit Mode Connection
**Score: 7/10**

Does the artist clearly understand the relationship between admin actions and what fans see?

**What works:**
- "Edit page →" in topbar — persistent, always one tap away
- "View live page ↗" button — good
- "Edit page →" links to `able-v7.html?edit=1`

**What doesn't:**
- No preview thumbnail of the live page in admin — artist has no visual sense of what fans currently see without tapping out
- Changes in admin (Campaign HQ state, section visibility) have no "what this looks like on your page" preview
- QR code mentioned in V8_BUILD_AUTHORITY.md is not implemented

**What a 10 looks like:** The topbar shows a small live preview chip — a 40px thumbnail of the current live page state, tappable to view full. Campaign HQ state changes have "preview" tooltips or a mini phone mockup showing the result.

---

### 12. Tier Gating
**Score: 7/10**

Do Pro gates feel earned, honest, and specific? Or do they feel like paywalls?

**What works:**
- Gold lock overlay on Broadcasts: blur + gradient + specific value prop
- Tier badge in topbar ("✦ Free") — always visible
- Upgrade bar in home page
- Fan list gate at 90/100 fans: specific copy

**What doesn't:**
- Upgrade bar copy: "Broadcasts, full analytics, and deeper fan insight when you're ready." — decent but not specific enough (which analytics? how much deeper?)
- Gold lock button: "See what's included →" — leads to Settings page, not a proper upgrade flow
- No per-feature gate explainer for Analytics page (mentioned in SPEC as Pro-gated for 90-day history)
- Gate copy for Close Circle (when built) not specced

**What a 10 looks like:** Every gate has a one-line specific value prop ("Full analytics: see which Instagram post sent your fans, for £19/month"). Upgrade flow is a bottom sheet, not a settings page redirect.

---

### 13. Contextual Intelligence
**Score: 5/10**

Does the dashboard change its voice and emphasis based on the artist's current situation?

**What works:**
- Nudge system surfaces one context-aware prompt
- Pre-release nudge card (§9.1 moment 2) — appears when future release date is saved
- Gig mode nudge (§9.1 moment 3) — appears when gig is activated

**What doesn't:**
- Greeting sub-line is hardcoded to "Your page, your list, your relationship." — never updates
- Home page title "Good to see you." never includes name (ID `homeGreeting`)
- Campaign HQ contextual copy doesn't ripple to the home page greeting
- Pre-release state: the home greeting should say "X days until [release title]" — it doesn't
- Gig tonight: the home page should feel urgently different — it doesn't

**What a 10 looks like:** The home page greeting is a live sentence. If gig mode is on: "You're on tonight." If pre-release: "3 days until Echoes. Everything's set." If just released: "Echoes dropped. This is your window." If quiet: "Your page, your list, your relationship."

---

### 14. First-Run Experience
**Score: 7/10**

For an artist finishing the onboarding wizard and landing in admin for the first time.

**What works:**
- First-run checklist: 4 steps, progress bar, each step is tappable
- Steps are actionable — tap "Add your latest release" → goes to Music page
- Steps are specific and honest

**What doesn't:**
- Checklist title: "Get your page working — 4 quick things" — slightly generic
- When all 4 are checked, checklist dismisses — but there's no celebration moment
- Artist comes from the wizard (which has great voice and momentum) and lands in a dashboard that feels neutral by comparison — the momentum drops

**What a 10 looks like:**
- Title: "Four things, then you're live."
- When all done: brief celebration ("Your page is ready. This is where your fans start.") before dismissing
- Coming from wizard: admin first-load has a subtle "welcome" state — not a banner, but the greeting reads "Good to see you, Nadia. Your page is live." the first time

---

### 15. Motivation and Milestones
**Score: 4/10**

Does the dashboard make the artist feel like they're building something? Does it celebrate progress?

**What works:**
- "It's working." card — good start
- Activity feed implied (but position/implementation unclear)
- Stats counter animation (G14) — first load, session-flagged — adds life

**What doesn't:**
- No milestone system: fan #1, fan #10, fan #50, fan #100 — nothing
- No streak or consistency signal ("You've had visitors every day this week")
- "It's working" card is dismissible but doesn't auto-refresh to new milestones
- No share moment ("You hit 100 fans — share this") — missed organic growth opportunity
- Activity feed: implied in design but not confirmed built or positioned

**What a 10 looks like:** A quiet milestone system. Fan #1 gets a moment. Fan #10 gets a moment. Not gamification — more like "Your first 10 people found you on their own." First week of consecutive views: "Your page has had visitors every day this week." These should feel like natural observations, not achievements.

---

### 16. Accessibility
**Score: 8/10**

WCAG 2.2 AA compliance across all interactive elements.

**What works:**
- Focus visibility: `*:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }` — confirmed
- `*:focus:not(:focus-visible) { outline: none; }` — correct pattern
- aria-labels on icon-only delete buttons (confirmed in STATUS.md)
- Grain texture: `pointer-events:none` — correct

**What doesn't:**
- Focus ring is a flat 2px outline — good but could be the glow pattern from onboarding (`box-shadow: 0 0 0 3px rgba(var(--acc-rgb), 0.25)`)
- Color contrast: `--dash-t3: #888888` on `--dash-card: #ffffff` — this is 4.1:1 ratio for regular text. Borderline AA for small text below 18px.
- Stats skeleton shimmer elements: are they aria-hidden?
- Mobile: if tab bar isn't implemented, keyboard navigation on mobile is unusable

**What a 10 looks like:** Focus ring matches onboarding glow pattern for visual coherence. All text ≥ 4.5:1 contrast ratio. Skeleton shimmer is aria-hidden. Mobile nav functional for keyboard users.

---

### 17. Trust and Data Ownership
**Score: 8/10**

Does the artist feel their data is theirs? Do they trust what ABLE is showing them?

**What works:**
- "Your list, your relationship — no algorithm between you." — strong trust copy
- Export always available, even on free tier — this is a trust commitment, explicitly in SPEC
- Support section: "0% taken by ABLE. Stripe standard fee only." — excellent
- Fan data comes from localStorage — the artist owns it literally (not just by policy)

**What doesn't:**
- Export implementation not confirmed as built/visible
- No "your data is stored locally until you connect your account" explanation for new users
- Magic link auth hasn't landed yet — until then, artist has no login and the page is not truly "theirs"

**What a 10 looks like:** Export is visible on the Fans page, not hidden. A small line at the bottom of the fan list: "These emails are yours. We never contact your fans without your permission." When Supabase auth lands, a "Your account, your data" security section in Settings.

---

### 18. Copy Details
**Score: 6/10**

Are all micro-copy moments right? Labels, hints, descriptions, empty states, button text.

**Audit of specific issues:**
- Stats labels: "Visits", "Link clicks", "Fans joined", "Click rate" — "Fans joined" is slightly passive ("Your fans" or just "Fans")
- First-run checklist: "Get your page working — 4 quick things" — border SaaS
- Profile page title: just "Profile" — could be "Your page"
- Section titles: "Fan support" is good. "Updates" is good. "Connections" could be "Your platforms"
- Toast messages: not audited for ABLE voice
- Snap card empty state: "Updates are one of the most-clicked things on an artist's page. Tell fans what's happening." — excellent, but not confirmed as currently live
- Shows empty state: same — excellent in SPEC, not confirmed live

**What a 10 looks like:** Every piece of copy has been audited against the ABLE voice guide. No generic SaaS patterns remain. Every label, hint, and button text sounds like it was written for independent musicians.

---

### 19. Animation and Delight
**Score: 7/10**

Do animations serve the experience, or do they get in the way?

**What works:**
- Spring easing on state transitions
- D13 fan list row stagger entrance (first load, session-flagged)
- G14 stats counter animation (first load, session-flagged)
- C16 gig countdown bar — excellent
- Live pulse on state pills (gig/live states)
- fadeSlide on snap card inline edit
- fadeInUp on AI suggestions panel

**What doesn't:**
- First-run checklist completion: no animation when all steps done
- "It's working" card: plain `display:none` → `display:block` reveal — should have a gentle entrance
- State transitions in Campaign HQ: do the state buttons animate when switching? Not confirmed
- No "save" feedback animations on profile fields — only toast, which is small

**What a 10 looks like:** Every state change has a micro-motion. Checklist completion: steps fade-out individually then card fades to a single completion line. "It's working" card entrance: gentle translateY + fade. Campaign HQ state switch: active button springs in.

---

### 20. Big Picture Coherence
**Score: 6/10**

Does admin.html feel like it belongs with able-v7.html? Does the whole system feel designed?

**What works:**
- Deliberately different visual language (warm cream vs midnight navy) — this is correct and intentional
- Same Barlow Condensed display font — bridges the two pages
- Amber accent carries through from dashboard to some elements on profile

**What doesn't:**
- The transition between "editing in admin" and "seeing on profile" is never shown — there's no moment where the artist sees their change reflected
- QR code (accent-coloured, in V8 spec) not implemented — missed opportunity for coherence
- No visual reference on admin.html to what the live page looks like
- Artist's own accent colour is amber in admin — but their profile might be red/indigo/whatever. No visual connection.

**What a 10 looks like:** A small "live preview" pill in the topbar shows the artist's actual current page accent colour, not admin amber. When artist changes Campaign HQ state, a phone preview chip in Campaign HQ shows the change. The dashboard and the profile feel like two views of the same thing.

---

## SCORE SUMMARY

| Angle | Score | Priority |
|---|---|---|
| 1. First 3 Seconds | 7/10 | Medium |
| 2. Primary Job | 7/10 | Medium |
| 3. Copy Voice | 7/10 | Medium |
| 4. Information Architecture | 7/10 | High |
| 5. Campaign HQ | 7/10 | High |
| 6. Data Trust | 6/10 | Medium |
| 7. Empty State Experience | 6/10 | High |
| 8. Fan Relationship | 7/10 | High |
| 9. Mobile Experience | 5/10 | Critical |
| 10. Performance | 8/10 | Low |
| 11. Edit Mode Connection | 7/10 | Medium |
| 12. Tier Gating | 7/10 | Medium |
| 13. Contextual Intelligence | 5/10 | High |
| 14. First-Run Experience | 7/10 | Medium |
| 15. Motivation and Milestones | 4/10 | High |
| 16. Accessibility | 8/10 | Low |
| 17. Trust and Data Ownership | 8/10 | Low |
| 18. Copy Details | 6/10 | Medium |
| 19. Animation and Delight | 7/10 | Medium |
| 20. Big Picture Coherence | 6/10 | Medium |

**Overall: 6.8/10**

---

## TOP 5 GAPS (highest-impact fixes)

1. **Mobile Experience (5/10)** — sidebar likely unusable on mobile, bottom tab bar not implemented. This affects every mobile artist.
2. **Contextual Intelligence (5/10)** — greeting and home page never adapt to artist's current situation. This is what separates a 7 from a 9.
3. **Motivation and Milestones (4/10)** — no milestone moments, no "first fan" celebration, no progression story. Artists need to feel the build.
4. **Information Architecture (7/10 but high priority)** — Campaign HQ should be above stats. Upgrade nudge timing is wrong.
5. **Empty State Experience (6/10)** — stats shimmer forever when empty, day-1 experience is undefined.
