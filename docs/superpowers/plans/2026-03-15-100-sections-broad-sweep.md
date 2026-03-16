# ABLE — 100 Sections Broad Sweep
**Created: 2026-03-15 | Phase 2 of section review process**
**Scoring: Current state /10. Priority: P0 (blocks everything) / P1 (high) / P2 (medium) / P3 (polish)**

> Quick scores based on reading all files + applying fear maps. Deep dives come next — each P0/P1 gets the 20-angle treatment.

---

## SECTION INVENTORY + QUICK SCORES

### LANDING PAGE (landing.html)

| # | Section | Current /10 | Priority | Primary issue |
|---|---|---|---|---|
| 1 | Navigation bar | 3 | P1 | No clear paths for 3 visitor types (new artist / returning artist / fan). "Sign in" + "Get started" creates confusion. Doesn't reflect ABLE's voice. |
| 2 | Hero headline + sub | 7 | P2 | "100 real fans beat 10,000 strangers" is correct and strong. Sub copy needs minor tightening. |
| 3 | Hero CTA buttons | 5 | P1 | Buttons too small and understated. "Your page is free →" is right but visual weight doesn't match the stakes. |
| 4 | Demo phone (interactive proof) | 2 | **P0** | 280px wide — too small to see. CSS mockup Spotify/YouTube — not real embeds. Fails the primary job: showing what ABLE actually does. Can't understand product without this working. |
| 5 | Demo state buttons (4 states) | 3 | P1 | Buttons too small, understated — doesn't communicate that you can switch between states. Primary value prop is the state-shifting and it's barely visible. |
| 6 | Social proof section | 4 | P2 | Exists but generic. No real artist names, no real numbers, no specific claims. Could be any SaaS product. |
| 7 | Feature section — campaign states | 6 | P2 | Concept is communicated but needs better visual treatment. "The page shifts with your moment" is the line. |
| 8 | Feature section — email ownership | 6 | P2 | "Your fans' emails belong to you" is clear. "0% cut" claim should be more prominent. |
| 9 | Feature section — Linktree comparison | 4 | P1 | Too subtle. This is the primary acquisition pitch for 80% of ABLE's target market. Needs to be direct: "You've had a Linktree for 2 years. What does it know about your release dropping in 3 days?" |
| 10 | Pricing section | 6 | P2 | Correct tiers and prices. Visual presentation OK. "Most popular" badge removed (correct). Could use more specificity on what each tier delivers at a glance. |
| 11 | FAQ | 6 | P2 | Covers main questions. Copy is reasonably ABLE-voiced. Could add Q about Linktree import and data ownership. |
| 12 | Footer | 5 | P3 | Functional. Links present. No strong brand statement. |
| 13 | Fan entry point | 1 | P2 | Essentially doesn't exist. Fans who land here have no path. "Not an artist?" is missing entirely. |
| 14 | Auth/sign-in flow from landing | 5 | P2 | Magic link only (correct). Flow is unclear — what happens after you enter email? |

**Landing page average: 4.5/10. Biggest gap: demo phone (P0), Linktree pitch, fan entry path.**

---

### ONBOARDING (start.html)

| # | Section | Current /10 | Priority | Primary issue |
|---|---|---|---|---|
| 15 | Universal link input (step 0) | 4 | **P0** | Currently Spotify-focused import, not universal. Doesn't accept Linktree, SoundCloud, Bandcamp, YouTube URLs. Doesn't explain what it does before asking. Artist doesn't know what to paste. |
| 16 | Linktree importer results | 1 | **P0** | Doesn't exist. Netlify function needed. This is the #1 acquisition feature for Linktree switchers. |
| 17 | Spotify import confirmation | 5 | P1 | Works but UX needs polish. Need clear "we found your artist page — is this you?" moment with artwork visible. |
| 18 | Artist name input | 7 | P2 | Simple and clear. Minor: should show what the name looks like in their chosen display font, not just a text input. |
| 19 | Vibe/genre selection | 6 | P1 | 4-option grid (atmospheric/hype/raw/chill) is under-specified relative to the 7 full vibes. Artist doesn't know what they're choosing or what it changes. Needs live preview showing the actual typography + colour change. |
| 20 | Accent colour picker | 6 | P1 | Works. Could be smarter — auto-suggest accent pulled from Spotify artwork. 3-column swatch grid is fine but could show more samples of what that accent looks like in context. |
| 21 | CTA type selection | 5 | P1 | The "what do you want people to do first?" question is right. Options need to feel like real choices with real explanations, not abstract categories. |
| 22 | Release info (title, date) | 6 | P2 | Works. Could auto-fill from Spotify import. "Escape hatch" for artists without a release coming needs to be obvious, not hidden. |
| 23 | "Just a profile" escape hatch | 3 | P1 | Currently unclear/hard to find. Artist who doesn't have an active release should be able to say "I just want a beautiful profile" and be respected for that choice. |
| 24 | Email/auth step | 5 | P1 | Magic link is correct. But "check your inbox" state doesn't communicate the time expectation. First-time auth should feel exciting not anxious. |
| 25 | Live preview phone | 4 | P1 | Exists but shows static mockup, not real profile. Needs to update as artist fills in each answer. This is the key conversion moment: seeing your actual page being built. |
| 26 | Progress bar + step indicators | 6 | P2 | E10 spring easing is in. Could feel more alive — countdown of what's left, not just step X of Y. |
| 27 | One-question-at-a-time UX | 4 | P1 | Currently feels like a form, not a conversation. Questions presented in groups rather than one at a time. Needs architectural rethink: each question gets its own screen. |
| 28 | Onboarding success/done screen | 3 | P1 | Currently no strong "done" moment. The transition from onboarding to seeing your live page for the first time should be the most memorable moment in ABLE. Currently a non-event. |

**Onboarding average: 4.6/10. Biggest gaps: Linktree import, universal link detector, live preview, one-question-per-screen.**

---

### ARTIST PROFILE (able-v7.html)

| # | Section | Current /10 | Priority | Primary issue |
|---|---|---|---|---|
| 29 | Sticky artist bar (scroll-triggered) | 7 | P2 | A4 implemented — fan-view only, triggers at 70% scroll, frosted glass. Good. Minor: artist name compression (A11) is in. Small refinements possible but not P0/P1. |
| 30 | Top card — artwork state | 7 | P2 | Looks good. Artwork fills the card. Placeholder shimmer is correct. Minor: could use more life when no artwork is set. |
| 31 | Top card — YouTube/video embed | 5 | P1 | YouTube lazy-load pattern exists. But: landscape vs portrait (Shorts) detection not confirmed. Portrait = 9:16 card, landscape = 16:9 card — this shifts the entire page feel. Demo doesn't show this working with real embed. |
| 32 | Top card — Spotify embed | 6 | P2 | Native Spotify embed works with 30s preview. Visual integration good. Note: monthly listeners stat is not available via public API — correctly removed. |
| 33 | Top card — SoundCloud embed | 5 | P1 | Exists. But the visual player height and style needs confirming — does the SoundCloud widget look good inside the top card or awkward? |
| 34 | Campaign state chip | 8 | P2 | Clear, correct. Gig badge glow pulse (C7) confirmed. Pre-release ambient intensification (H9) confirmed. This is one of the best parts of the build. |
| 35 | Hero CTA zone | 7 | P2 | Max 2 enforced. Accent + ghost pattern correct. B3/B4 press feedback confirmed. Good. |
| 36 | Fan capture section | 6 | P1 | Email form exists. But: Does the copy feel like the artist wrote it? "Stay close." is correct but the surrounding copy may be too generic. E15 blur validation is in. GDPR double opt-in needed. |
| 37 | Quick Action pills | 7 | P2 | Max 4/6 + overflow. A10/D3 entrance animation confirmed (horizontal wave). Good. |
| 38 | Music section — release cards | 7 | P2 | Release cards exist with type badge (single/EP/album), stream/watch buttons. Stream/Watch button fixes (left border, type badge) confirmed in recent commits. Good. |
| 39 | Music section — SoundCloud catalogue | 4 | P1 | Basic SoundCloud embed exists but the full catalogue card (full playlist widget, scrollable tracklist) needs proper treatment for artists who use SoundCloud as their primary platform. |
| 40 | Music section — empty state | 7 | P2 | Owner empty state exists and is ABLE-voiced. Good. |
| 41 | Videos section | 3 | P1 | Currently doesn't exist as a separate section. Videos are buried under Music. The two-section architecture (Music separate from Videos) needs building. TikTok/Instagram correctly in pills not here. |
| 42 | Videos section — empty state | 1 | P1 | Doesn't exist yet (section doesn't exist). |
| 43 | Platform pills | 8 | P2 | Strong. Correct icons, platforms, overflow handling. D15 first-load shimmer confirmed. |
| 44 | Events / bento grid | 7 | P2 | Bento grid layout good. Shows data structure works. Owner empty state confirmed. |
| 45 | Events — gig mode (tonight view) | 8 | P1 | One of the best features. Tickets front, venue prominent, 24hr countdown. Tonight-specific note from artist is a strong detail. |
| 46 | Events — empty state | 7 | P2 | Good ABLE-voiced copy. |
| 47 | Merch section | 7 | P2 | Works. Merch bento grid. Empty state confirmed. |
| 48 | Snap cards | 7 | P2 | Snap cards + owner empty state + locked state confirmed. |
| 49 | Support section | 7 | P2 | "0% ABLE cut, Stripe fee only" language confirmed. Good. |
| 50 | Recommendations | 6 | P2 | Exists. Could feel more curated — the copy should feel personal (what does the artist actually recommend and why). |
| 51 | World map / calendar | 6 | P2 | Moment calendar exists. Data structure works. Visual treatment needs refinement. |
| 52 | Page footer | 6 | P2 | "Made with ABLE" + referral slug. Free tier only. Correct. |
| 53 | Edit pill (owner view) | 7 | P1 | V2 pill confirmed. Bottom sheet system exists. Good foundation. Coverage needs extending — does every section have an edit trigger? |
| 54 | Edit bottom sheet — zones | 6 | P1 | Zone-based editing exists. But: mobile keyboard interaction with bottom sheet is unresolved (open question from spec). |
| 55 | Owner empty states | 7 | P2 | Confirmed across sections. ABLE-voiced. Good. |

**Artist profile average: 6.4/10. Biggest gaps: Videos section (missing), YouTube portrait detection, fan capture GDPR, SoundCloud catalogue.**

---

### ADMIN DASHBOARD (admin.html)

| # | Section | Current /10 | Priority | Primary issue |
|---|---|---|---|---|
| 56 | Admin nav bar | 4 | P1 | Currently page-switching nav. Should be scroll + anchor nav. Single-scroll page with left sidebar anchors is the new architecture. This is a structural change. |
| 57 | Admin sidebar + anchor nav | 1 | **P0** | Doesn't exist in new form. Key to making admin feel navigable not anxiety-inducing. Each section needs a left anchor + visual section identity (border stripe). |
| 58 | Campaign HQ — state selector | 8 | P2 | Strong. Pre-release / live / gig toggle clear. Visual representation of current state is good. |
| 59 | Campaign HQ — pre-release setup | 7 | P2 | Release date picker, countdown setup. Works. Minor: date picker on mobile needs verification. |
| 60 | Campaign HQ — gig mode toggle | 8 | P2 | 24hr countdown bar (C16) confirmed. Gig mode trial nudge (§9.1 moment 3) confirmed. Strong. |
| 61 | Stats overview | 7 | P2 | Counter animation (G14) confirmed. Shows views/fans/clicks. Good first impression. Fan count dynamic subtitle confirmed. |
| 62 | Fan list — table view | 7 | P1 | Stagger animation (D13) confirmed. But: The fan list is a HIGH-STAKES product moment (first time artist sees 47 real names). Does it feel like a revelation? Or does it look like a spreadsheet? Needs the "revelation" design treatment. |
| 63 | Fan list — star/filter | 6 | P2 | Starring works. Filter exists. Could add: source filter (Instagram vs TikTok vs direct), date range. |
| 64 | Fan list — export | 6 | P2 | Export function exists. Copy compliance confirmed ("export" not "get started"). Works. |
| 65 | First-run checklist | 7 | P2 | Auto-dismisses. Copy confirmed correct. Good. |
| 66 | Snap card management | 7 | P2 | CRUD works. Drag reorder confirmed. |
| 67 | Section visibility + order controls | 7 | P2 | Toggle + reorder works. Confirmed. |
| 68 | Connections panel | 6 | P1 | Exists. But: Linktree import flow should live here (or in onboarding). Is the connections panel the right place for "add your Linktree and we'll pull your links"? Probably yes. |
| 69 | Profile identity card | 7 | P2 | Genre/feel nudges. Good. |
| 70 | Analytics — top clicks | 6 | P2 | Data present. Visual presentation could be stronger — bar chart with breakdown. |
| 71 | Analytics — activity feed | 6 | P2 | Feed exists. Format clear. |
| 72 | Broadcast page | 5 | P2 | Pro tier locked. Preview exists. The blurred preview should show enough to be compelling. Currently may be too generic. |
| 73 | Your World moments panel | 6 | P2 | Exists. Moments log works. |
| 74 | Admin empty states | 7 | P2 | Section-specific empty states with ABLE voice confirmed. Good. |
| 75 | Admin mobile view | 4 | P1 | Admin is designed primarily as a desktop view. But artists check their fan list on their phone constantly. Mobile admin must work. Does it? Needs verification. |

**Admin average: 6.1/10. Biggest gaps: Single-scroll + anchor nav architecture (P0), fan list revelation moment, mobile view.**

---

### FAN DASHBOARD (fan.html)

| # | Section | Current /10 | Priority | Primary issue |
|---|---|---|---|---|
| 76 | Fan header | 5 | P2 | Demo data only. Supabase wiring needed. |
| 77 | Today strip | 4 | P1 | Demo data. Cold-start problem unresolved — if fan follows 1 artist who hasn't done anything, strip is empty. Needs "no activity, here's what you'll see" state. |
| 78 | Artist card strip | 5 | P1 | Demo data. The relationship between fan and artist should feel personal here, not generic. |
| 79 | Following feed | 4 | P1 | Demo data. Feed architecture needs real artist events wired. The discovery-of-second-artist problem is real. |
| 80 | Near me section | 4 | P2 | Demo data. Geo permission request UX needs care — asking for location must feel worth it. |
| 81 | Discover section | 5 | P2 | 4 tabs. Demo data. Non-algorithmic design is correct. |
| 82 | Fan settings sheet | 5 | P2 | Demo. Unsubscribe flow must be real and accessible. |
| 83 | Zero state (no new activity) | 6 | P2 | Copy is correct per spec. |

**Fan average: 4.8/10. Most sections are demo data. Real wiring is Phase 2 backend work.**

---

### CROSS-CUTTING CONCERNS

| # | Section | Current /10 | Priority | Primary issue |
|---|---|---|---|---|
| 84 | Mobile responsiveness (all pages) | 7 | P1 | Generally good. Admin on mobile is the weak point. Touch targets confirmed at 44px. No horizontal scroll at 375px confirmed. |
| 85 | Four themes (all pages) | 7 | P2 | All 4 themes confirmed on able-v7.html. Need verification on start.html and fan.html. |
| 86 | Performance (LCP, INP, CLS) | 6 | P1 | Gzipped sizes within budget. But: no Lighthouse run since content was added. LCP may be impacted by top card embeds. iframe containment needed. |
| 87 | Animation system | 8 | P2 | opacity/transform only confirmed throughout. prefers-reduced-motion confirmed. Strong. |
| 88 | Typography system | 7 | P2 | DM Sans on profile, Plus Jakarta Sans on admin, vibe-specific display fonts. Frozen tokens. Consistent. |
| 89 | Accent colour system | 8 | P2 | Single CSS var, artist-owned. Works across all themes. Strong. |
| 90 | Vibe system (7 vibes) | 7 | P2 | applyIdentity() and data-feel CSS system confirmed. Frozen tokens. Strong. |

---

### NETLIFY FUNCTIONS

| # | Section | Current /10 | Priority | Primary issue |
|---|---|---|---|---|
| 91 | oembed-proxy | 7 | P2 | Works. YouTube, Spotify, SoundCloud, Vimeo. Deployed. |
| 92 | Spotify import function | 7 | P2 | Works. Auto-pulls profile from Spotify artist URL. |
| 93 | **Linktree importer** | 1 | **P0** | Doesn't exist. Most important acquisition function. Parses public Linktree HTML, maps known platforms to ABLE pills, returns array for import UI. |
| 94 | AI copy generator | 7 | P2 | Claude Haiku bio writer + CTA suggestions. Works. |
| 95 | Fan confirmation email | 6 | P1 | Template exists. But GDPR double opt-in flow is not confirmed complete. This is non-negotiable for UK/EU. |

---

### FUTURE PAGES (for awareness, not active work yet)

| # | Section | Current /10 | Priority | Primary issue |
|---|---|---|---|---|
| 96 | freelancer.html profile | 1 | P3 | Phase 2. Needs artist base first. |
| 97 | freelancer-start.html | 1 | P3 | Phase 2. |
| 98 | Discovery / directory page | 1 | P3 | Phase 3. Needs 500+ artists. |
| 99 | Privacy policy page | 2 | P1 | Legal requirement for UK/EU data collection. Needed before any real users. |
| 100 | Index.html redirect | 8 | P3 | Works. Redirect only. Fine. |

---

## PRIORITY ORDER — P0 SECTIONS (Act First)

These are blockers. Nothing else matters until these work.

| # | Section | Why P0 |
|---|---|---|
| 4 | Demo phone (landing page) | Primary job of landing page. Nobody understands ABLE without seeing it in action. |
| 57 | Admin sidebar + anchor nav | Structural architecture change to admin. All admin work should build on this foundation. |
| 93 | Linktree importer function | #1 acquisition feature. Most ABLE target users currently use Linktree. Without this, the "paste your Linktree" pitch is fiction. |
| 15/16 | Universal link input + Linktree import UI | Onboarding cannot convert Linktree switchers without this. |

---

## P1 SECTIONS (High priority — do next)

Ordered by impact:

1. **#27** Onboarding one-question-per-screen UX — architectural (most of start.html rebuild)
2. **#25** Onboarding live preview phone — updating in real time per answer
3. **#28** Onboarding done/success screen — first time they see their live page
4. **#41** Videos section on artist profile — separate from Music, needs building
5. **#3** Landing hero CTAs — visual weight doesn't match stakes
6. **#5** Landing demo state buttons — too small, understated
7. **#9** Landing Linktree comparison section — too subtle, primary acquisition pitch
8. **#31** YouTube portrait/landscape detection on top card
9. **#36** Fan capture GDPR compliance — non-negotiable for UK
10. **#99** Privacy policy — legal requirement before real users
11. **#75** Admin mobile view — artists check fan list on phones
12. **#62** Fan list revelation moment — this is when ABLE earns the subscription

---

## OVERALL SCORES BY PAGE

| Page | Avg score | Status |
|---|---|---|
| landing.html | 4.5/10 | Needs demo rebuild (P0) + Linktree pitch |
| start.html | 4.6/10 | Needs full architectural rebuild |
| able-v7.html | 6.4/10 | Strong foundation, Videos section missing |
| admin.html | 6.1/10 | Needs anchor nav architecture (P0) |
| fan.html | 4.8/10 | Demo data only, Phase 2 backend wiring |

---

## THE SEQUENCE

Given the above, here's the build sequence that makes sense:

**Sprint 1 (Unblocks everything):**
- Linktree importer Netlify function (P0 — #93)
- Admin anchor nav architecture (P0 — #57)
- Demo phone real embeds (P0 — #4)

**Sprint 2 (Onboarding overhaul):**
- Universal link detector + Linktree import UI (#15, #16)
- One-question-per-screen architecture (#27)
- Live preview updating per answer (#25)
- Success/done screen (#28)

**Sprint 3 (Artist profile completeness):**
- Videos section separate from Music (#41, #42)
- YouTube portrait vs landscape detection (#31)
- Fan capture GDPR double opt-in (#36)
- SoundCloud catalogue card (#39)

**Sprint 4 (Admin overhaul):**
- Fan list revelation redesign (#62)
- Admin mobile view (#75)
- Connections panel + Linktree import UI here too (#68)

**Sprint 5 (Landing page):**
- Landing hero CTA weight (#3)
- Demo state buttons (#5)
- Linktree comparison section (#9)
- Fan entry point (#13)

**Sprint 6 (Backend):**
- Supabase auth + data layer (from 100-steps-to-10-out-of-10.md)
- Privacy policy (#99)
- GDPR compliance throughout

---

*Next: Section deep-dives starting with P0 items. Each gets the 20-angle treatment before any code is written.*
