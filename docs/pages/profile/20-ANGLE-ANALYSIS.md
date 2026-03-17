# Artist Profile — 20-Angle Analysis
**File: `able-v7.html` | Scored: 2026-03-15**
**Methodology: honest assessment against the conduit principle. V8 authority says 8/10 with demo data, 3/10 empty.**

---

## SCORING SUMMARY

| # | Angle | Score | Direction |
|---|---|---|---|
| 1 | First 3 Seconds | 7/10 | Room to tighten the above-fold hierarchy |
| 2 | Primary Job | 7/10 | CTA clarity varies by state |
| 3 | Hero CTA Zone | 7/10 | Max-2 rule enforced, copy could be stronger |
| 4 | Page State System | 8/10 | State machine works; gig mode weakest link |
| 5 | Copy Voice | 6/10 | Defaults lean ABLE, not artist |
| 6 | Fan Sign-up | 7/10 | UI good; no confirmation email |
| 7 | Music Section | 7/10 | Release cards good; empty state weak |
| 8 | Empty State Experience | 3/10 | Placeholder text visible; feels broken |
| 9 | Mobile Experience | 8/10 | Strong; minor tap target edge cases |
| 10 | Performance | 7/10 | Single-file is correct; font loading can improve |
| 11 | Theme System | 8/10 | All 4 work; Glass theme has minor edge cases |
| 12 | Identity System | 8/10 | applyIdentity() is strong; vibe motion is distinctive |
| 13 | Gig Mode | 6/10 | Works; missing tonight note + post-show state |
| 14 | Pre-release Mode | 7/10 | Countdown works; anticipation register is functional but not electric |
| 15 | Micro-interactions | 8/10 | 30+ interactions; most serve the page well |
| 16 | Edit Mode | 5/10 | Floating pill exists; zone coverage patchy |
| 17 | Accessibility | 6/10 | Focus rings exist; skip nav missing; reduced-motion partial |
| 18 | Trust and Data Ownership | 6/10 | No visible trust copy near sign-up |
| 19 | Cross-page Coherence | 7/10 | Shared tokens; view-transition specced not wired |
| 20 | Big Picture | 7/10 | With data: beautiful; without: generic |

**Weighted average: 6.9/10**

---

## ANGLE 1 — First 3 Seconds (7/10)

**What a fan sees in the first 3 seconds:**
They land from an Instagram bio link. Their first visual hit is the hero artwork (if set), the artist name, and two CTAs. The artist name is large, display-font, accent-coloured. The artwork fills the top third of the screen.

**What works:**
- Artist name is dominant — Barlow Condensed at `clamp(48px, 14vw, 80px)` fills the viewport width
- Artwork or gradient fills the hero with the artist's colour
- Two CTAs are immediately visible above the fold on a 375px screen
- No navigation chrome, no ABLE branding in the hero — the artist's world from pixel 1

**What doesn't:**
- The default meta description is still "Artist profile powered by ABLE" — the page hasn't announced the artist before the fan even arrives
- If no artwork is set, the hero is a gradient placeholder — not distinctive
- The location + genre tags are present but their styling competes with the name at small sizes
- No "above the fold" optimisation pass — some phones cut the CTAs at the fold

**Gap:** The first 3 seconds are artist-dependent. With good artwork and a set name, it's 8+. With defaults or empty state, it drops to 4.

---

## ANGLE 2 — Primary Job (7/10)

**The primary job changes by state.** In `profile` mode the primary job is relationship-building (fan sign-up). In `live` mode it's streaming conversion. In `pre-release` it's pre-save. In `gig` it's tickets.

**What works:**
- The state machine does change the hero CTA text and arrangement
- Primary CTA is always accent-filled, secondary is always ghost — the hierarchy is clear
- The campaign state system is unique in the landscape

**What doesn't:**
- In `profile` mode, the relationship-building CTA competes with platform pills that are equally prominent
- In `live` mode, the stream CTA is correct but the artwork behind it could be doing more work (countdown fade out, album art scale up)
- The max-2 rule is enforced in code but the platform pills row below it adds 4–6 more tappable elements — above-the-fold action density is high

**Gap:** The primary job is structurally correct. The execution needs one more pass to sharpen the hierarchy by state.

---

## ANGLE 3 — Hero CTA Zone (7/10)

**Max-2 rule:** enforced. Primary = accent fill. Secondary = ghost. This is correct.

**What works:**
- The rule prevents the scatter-gun approach of Linktree et al.
- The ghost button has sufficient contrast in all 4 themes (verified in code)
- Tap targets are 44px minimum on both CTAs

**What doesn't:**
- Default CTA copy ("Pre-save" / "Stream") is functional but not artist-owned — feels like the platform wrote it
- No vibe-specific CTA copy variants — a rock artist saying "Stream now" hits differently than an acoustic artist saying "Listen"
- The secondary CTA in `profile` mode defaults to "About" — this is a weak choice; a better default is "My music" or the artist-specific link

**Gap:** The architecture is correct. The copy is too generic. The CTAs need artist-voice defaults by vibe.

---

## ANGLE 4 — Page State System (8/10)

**The campaign state machine is the page's highest-leverage feature.**

**What works:**
- `computeState()` is clean, documented, correct
- Auto-switch from `pre-release` to `live` on release date fires correctly
- Visual hierarchy actually changes between states — not just a banner
- Gig mode overrides all other states and auto-expires after 24h

**What doesn't:**
- Gig mode is currently pre-show only — no post-show state (CTA should shift from "Get tickets" to "Stay close" after the show-end time)
- No "tonight note" field — the most human gig mode addition is absent
- No "Going tonight" social tap counter
- Pre-release countdown is accurate but the visual treatment could build more tension as the date approaches (e.g., colour shift, larger countdown digits in final 24h)
- The 14-day post-release `live` window is somewhat arbitrary — works but could be smarter (tracks activity signals)

**Gap:** The state system architecture scores 9/10. The gig mode implementation lags at 6/10 and brings the overall score down.

---

## ANGLE 5 — Copy Voice (6/10)

**The hardest angle.** Copy voice is where ABLE's ambition and the current implementation diverge most.

**What works:**
- Fan sign-up heading can be set by the artist
- Artist bio renders as written by the artist
- No SaaS phrases in the visible UI

**What doesn't:**
- Default section headers are "Music", "Events", "Merch" — neutral but not personal. Should be "My music", "Shows", "Stuff I'm selling"
- The fan sign-up default placeholder text is "Your email address" — generic
- Default hero CTA text is platform-generated
- The "Made with ABLE" footer is fine but positioned prominently enough to break the conduit illusion at scroll end
- Zero copy is in the artist's first person by default — the page only sounds like the artist if the artist customises every field

**Gap:** The copy architecture supports artist voice but defaults to platform voice. Every default needs to be written as if the artist wrote it, using first-person where possible. This is a significant gap.

---

## ANGLE 6 — Fan Sign-up (7/10)

**What works:**
- Single field (email only) — correct
- Confetti + echo animation on submit — optimistic UI feels ceremonial
- Stored to `able_fans` localStorage immediately
- Trust line "Just [Artist Name]. No spam." is settable

**What doesn't:**
- No confirmation email is sent — this is the biggest gap in the entire fan activation chain. A fan who signs up but gets no email is not a double-opted-in subscriber. They're just a local storage entry.
- The default heading is "Stay close" — correct register but not in the artist's voice
- No "You're in" confirmation state after submission — just a toast. The ceremony should feel bigger.
- The secondary fan sign-up module (lower in the page) is weaker — almost invisible

**Gap:** The UI is 7/10. The backend wiring makes it 0/10 for actually converting a fan. This is a Phase 1 must-fix.

---

## ANGLE 7 — Music Section (7/10)

**What works:**
- Release cards have artwork, title, type badge (Album/EP/Single), release date
- Stream and Watch buttons are distinct with platform icons
- Credits section is present (collapsed by default)
- Left border in accent colour is a strong editorial marker

**What doesn't:**
- Empty state: "No releases added yet" — functional but not honest or interesting. Should be: "Nothing here yet — check back soon." or (even better) the artist's own empty-state message.
- No 30s preview — tapping Stream immediately leaves the page. A hover/tap preview would keep fans engaged longer.
- Credits section is present but credits are plain text — not live links to freelancer profiles
- The "Latest release" designation is always the most recent by date — no manual pinning

**Gap:** Solid with data. The credits-as-links opportunity is a structural gap that V8 must close.

---

## ANGLE 8 — Empty State Experience (3/10)

**V8 assessment confirmed: 3/10 for empty state.**

**What the current empty state looks like:**
- Artist name: "Artist Name" (default placeholder)
- Hero artwork: gradient in default accent colour
- Bio: empty or placeholder text
- Music section: "No releases added yet"
- Events: "No shows added yet"
- Snap cards: none

**Why this scores 3/10:**
- The page looks like a template, not a profile
- A fan who lands on an artist's empty ABLE page will assume the artist abandoned it
- No guidance for the artist about what to fill in first
- No Spotify import flow to pre-populate the page
- No "coming soon" register that could at least frame emptiness as intentional

**What 9/10 looks like:**
The Spotify auto-import flow (paste one URL → profile 70% populated in 10 seconds) eliminates this problem entirely. Until that's built, the empty state needs copy that frames incompleteness as temporary and intentional: "Still setting up. Back soon." rather than placeholder fields.

---

## ANGLE 9 — Mobile Experience (8/10)

**This page was designed mobile-first. It largely shows.**

**What works:**
- All tap targets are 44px minimum
- No horizontal scroll at 375px
- Artwork fills the full viewport width
- Snap cards scroll horizontally with momentum
- Tab bar (sticky nav) is 64px with safe area insets
- Bottom-sheet patterns used for forms (fan sign-up, Close Circle)
- `viewport-fit=cover` with safe area insets respected

**What doesn't:**
- The hero CTA zone can get cut by the fold on smaller screens (SE/mini) when the artwork is tall
- iOS audio tap: the 30s Spotify preview embed takes ~800ms to respond on Safari iOS — feels laggy
- The edit pill (owner mode) is 44px but positioned near the bottom where iOS gestures can interfere
- Long artist names don't always compress gracefully — Barlow Condensed helps but very long names can still wrap awkwardly

**Gap:** Solid. A few edge cases remain on smaller devices and older iOS Safari.

---

## ANGLE 10 — Performance (7/10)

**What works:**
- Single HTML file — no framework overhead, no JS bundle
- localStorage renders instantly on load — no waiting for APIs
- Font preloading with `rel="preload"` on critical fonts
- Content Security Policy is set

**What doesn't:**
- File is ~5000+ lines of HTML/CSS/JS — gzipped size needs auditing
- All 7 vibe fonts are declared in the Google Fonts URL even if only one is used — adds ~200ms font load
- External embeds (Spotify, YouTube, SoundCloud) can block INP
- `color-mix()` usage may cause recalc on older Chrome
- No explicit `width` and `height` on artwork `<img>` elements — potential CLS

**Gap:** LCP and CLS targets are likely met with good data. Font loading strategy needs tightening for all-vibe declaration.

---

## ANGLE 11 — Theme System (8/10)

**All 4 themes exist and work.**

**What works:**
- Dark: luxurious graphite with warm cream text — distinctive, not pure black
- Light: warm cream base, dark text — clean, works well for folk/acoustic vibes
- Contrast: pure black, maximum contrast — genuine accessibility choice, not cosmetic
- Glass: backdrop-filter blur/saturate — stunning with background artwork

**What doesn't:**
- Glass theme requires a background image to function — empty-state glass theme looks broken (blurring nothing)
- A few third-party embed (Spotify, YouTube) containers don't inherit the card colour on Glass theme correctly
- Light theme on some vibe × accent combinations has contrast ratio issues (pale accent on cream background)
- Theme is set at artist level, not fan preference — fan cannot choose their preferred mode

**Gap:** Solid. The Glass theme empty-state is the main edge case.

---

## ANGLE 12 — Identity System (8/10)

**`applyIdentity()` is one of ABLE's strongest technical differentiators.**

**What works:**
- Single function reads the artist's profile (vibe, feel, accent, theme) and applies all tokens
- All 7 vibes have distinct: font family, weight, case, letter-spacing, and motion timing
- All 4 feel quadrants (intimate-raw, intimate-refined, bold-raw, bold-refined) modify radius, weight, and easing
- The result: two artists with the same vibe but different feels look meaningfully different
- Accent colour propagates to every accent-tinted element via CSS custom properties — one JS assignment = full rebrand

**What doesn't:**
- `applyIdentity()` runs after DOM ready — there's a brief flash of the default accent/vibe before the artist's identity applies
- The vibe motion personality (different spring curves per vibe) is set but rarely perceptible to users — it's subtle by design, but perhaps too subtle
- The feel quadrant image filters (saturate, sepia, contrast) are applied to artwork — this could conflict with artist photography

**Gap:** Minor. The FOUI (flash of unstyled identity) is the main issue. A CSS `<link rel="preload">` for the computed vibe CSS would solve it.

---

## ANGLE 13 — Gig Mode (6/10)

**Gig mode is structurally correct but emotionally thin.**

**What works:**
- Activates with a 24h toggle — simple, correct
- Auto-expires — prevents ghost gig state
- Ticket CTA becomes primary — hierarchy shifts correctly
- "On tonight" chip appears in the hero

**What doesn't:**
- No "tonight note" — the most important missing feature. The artist has nothing to say in their own voice about tonight. Every gig mode page looks the same.
- No post-show state — when gig mode expires, the page returns to `profile` or `live` mode. The post-show window (24–72h after a show) is peak fan receptivity. The CTA should shift to "Stay close" / fan sign-up.
- No "Going tonight" tap counter — a lightweight social signal that creates genuine urgency without manufactured scarcity
- No show time displayed in the hero — the fan doesn't know when to arrive
- Gig mode copy is functional ("Get tickets") not personal ("I'm playing tonight")

**Gap:** This is the page's most significant missed opportunity after empty state. A human tonight note transforms gig mode from a functional CTA to a genuine communication.

---

## ANGLE 14 — Pre-release Mode (7/10)

**What works:**
- Countdown renders correctly
- Pre-save CTA is primary in this state
- The countdown creates visible anticipation — a fan who lands with 3 days left feels something
- The release date auto-switches to `live` mode — no manual intervention

**What doesn't:**
- The countdown is functional but visually static — no colour/weight shift as the date approaches
- The pre-save flow still exits the page (Spotify pre-save link opens external) — no native pre-save capture
- In the final 24h, the page should shift register completely — larger countdown, more urgent copy, maybe a different background treatment
- No "Tell a friend" CTA in pre-release mode — this is peak shareability moment

**Gap:** Good foundation. The register doesn't change as tension builds. The final 24h should feel different from day 14.

---

## ANGLE 15 — Micro-interactions (8/10)

**30+ interactions are documented and implemented. Most serve the page.**

**What works:**
- Spring easing on tap — buttons physically respond to touch
- CTA pulse animation draws the eye to primary action
- Confetti + echo on fan sign-up — the moment feels ceremonial
- Tab indicator springs to the active tab
- Artwork parallax on scroll — subtle depth
- Artist bar fade-in at 70% scroll — clean, not jarring
- Artist name compresses on scroll (A11) — elegant, technical

**What doesn't:**
- Micro-interactions are consistent across vibes — an electronic artist's page should feel more mechanical/snappy than an acoustic artist's. The vibe timing is set but the interaction personality doesn't diverge enough.
- Some interactions (section pulse on deep-link) are visible only in very specific scenarios — effectively invisible to most users
- The fan sign-up confetti, while good, could be more vibe-appropriate — confetti on a post-punk rock page might feel incongruous

**Gap:** Minor. The system is strong. Vibe-differentiated interaction personality is the next frontier.

---

## ANGLE 16 — Edit Mode (5/10)

**Edit mode is the page's weakest functional area.**

**What works:**
- Floating pill exists (owner-only)
- Edit mode shows dashed rings around editable zones
- Bottom sheet slides in for editing

**What doesn't:**
- Edit zone coverage is patchy — not every field is editable from the profile page itself
- The edit panel slides in from the side, scaling the page to 95% — this interaction is nice but can disorient the user
- No visual confirmation of save — changes auto-save but the user gets a toast, not visible change on the field they just edited
- Credits cannot be edited from the profile view — requires admin
- Shows cannot be edited from the profile view — requires admin
- The dashed edit rings are small and easy to miss on mobile

**Gap:** This is a Phase 1 fix. The V8 plan is to consolidate edit mode into a single system that covers all 6 zones. Until then, it scores 5/10.

---

## ANGLE 17 — Accessibility (6/10)

**What works:**
- Focus rings are defined (`*:focus-visible`)
- Contrast on Dark theme with default accent passes AA
- `prefers-reduced-motion` is respected for most animations
- ARIA labels on icon-only buttons exist in most cases
- `lang="en"` is set on the HTML element
- Bottom sheet focus trap exists

**What doesn't:**
- No skip navigation link — keyboard users must tab through the entire hero before reaching main content
- The Glass theme with some accents fails WCAG AA contrast ratios
- The Light theme with pale accent colours (sage, cyan) can fail contrast against cream background
- Tap target audit: most pass 44px, but some section action links (`"See all"` etc.) are 13px text without padding
- The snap card horizontal scroll is keyboard-accessible only via arrow keys — not discoverable
- No ARIA `role="region"` or `aria-label` on major page sections
- Screen reader order for campaign state content may not match visual order

**Gap:** Functional but needs a dedicated accessibility pass. Focus on: skip nav, Light/Glass theme contrast, section ARIA landmarks.

---

## ANGLE 18 — Trust and Data Ownership (6/10)

**The relationship ownership claim is ABLE's core proposition. It's underrepresented on the fan-facing page.**

**What works:**
- Trust line near the sign-up: "Just [Artist Name]. No spam." — correct register
- CSV export available in admin (artist-facing, not fan-facing)

**What doesn't:**
- The fan sees no explicit ownership signal — nothing that says "this email goes directly to the artist, not to ABLE"
- "ABLE never contacts your fans without your permission" is in the admin fan list, not on the public profile
- No privacy link visible near the sign-up form
- The fan confirmation email (not yet wired) is the main trust-building moment — its absence is a 0/10 in practice
- Close Circle payment terms ("you can leave whenever") are in the spec but need implementation

**Gap:** The trust language is defined but not surfaced on the fan-facing page. A single line near the sign-up — "Your email goes directly to [Artist Name]. Not to any platform." — would score this 8/10.

---

## ANGLE 19 — Cross-page Coherence (7/10)

**What works:**
- Design token alignment between `able-v7.html` and `start.html` — same font, same accent system, same easing
- DM Sans used in both profile and onboarding
- `@view-transition` specced in both pages — shared element transition is defined
- The ABLE logo has matching `view-transition-name: able-logo` in both pages

**What doesn't:**
- The `view-transition-name: artist-name` from start.html Done screen → profile hero is specced but not verified as wired
- Admin uses Plus Jakarta Sans — deliberate design divide (backstage vs public) — but the contrast is stark enough that switching pages feels like a different product
- No shared colour between pages: onboarding uses `#0d0e1a` base, profile uses `#0a0b10` — tiny but perceptible
- The "your page is live" moment in admin should visually echo the Done screen in onboarding — currently these feel disconnected

**Gap:** Good intention, partial execution. The view-transition wire-up needs verification.

---

## ANGLE 20 — Big Picture (7/10)

**With good data, this page is genuinely beautiful. It is among the best link-in-bio experiences in the market.**

**What works:**
- The vibe × feel × accent × theme system creates genuine artist-specific identity — not a generic template
- The campaign state machine is unique — no competitor can match it
- The conduit principle is architecturally sound: the artist's world is foregrounded, ABLE is invisible
- The micro-interaction system is refined and purposeful
- The typography system is distinctive — Barlow Condensed at hero scale is bold and correct

**What doesn't:**
- Empty state breaks the illusion completely — from 8/10 to 3/10 with no data
- The fan activation chain is incomplete (no confirmation email = no real relationship)
- The page's distinctiveness is latent in defaults — an artist who doesn't customise gets a generic page
- "Made with ABLE" footer, while small, still punctures the conduit principle

**Gap:** The gap between "with data" and "without data" is the biggest strategic risk. Spotify auto-import (one URL → 70% populated) closes this gap. Until it's built, every new artist has a 3/10 first impression.

---

## OVERALL ASSESSMENT

**Current state: 6.9/10 (honest average)**
**With good data and customisation: 8/10**
**Empty state: 3/10**
**V8 target: 9.7/10**

### The three gaps that matter most:

1. **Empty state** (3/10 → 9/10 via Spotify import + better defaults)
2. **Fan activation chain** (7/10 UI → 0/10 in practice, no confirmation email)
3. **Copy voice** (6/10 → needs artist-first defaults everywhere)

These three gaps account for the largest share of the distance to 10. Everything else is refinement.
