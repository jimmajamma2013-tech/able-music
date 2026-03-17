# ABLE — Hierarchy Refinement System
**Version 1.0 — 2026-03-14**
**Status: ACTIVE**

*Cross-cutting refinement layer. Affects: Moment Engine (section promotion), Fan Product (capture variants), Credits Ecosystem (inline credits), Gig Mode (full spec). All engines remain authoritative within their domain — this spec defines how they interact through the hierarchy.*

---

## Internal product truth

> ABLE is a living artist page that changes with the moment and turns attention into connection.

This is the governing sentence. Every product decision in this spec derives from it. "Living" = state-driven hierarchy. "Attention" = one clear action. "Connection" = contextual capture and Close Circle.

---

## Public-facing message hierarchy

**Hero line:** "When they click, be ready."
Direct address to the artist. Implies the page matches the moment of the click.

**Supporting line:** "Your page changes with your moment. One action leads. The right fans stay close."

**Sub-truths the product repeatedly proves:**
1. The page matches the moment they clicked from
2. One clear action is always leading
3. The right fans naturally stay closer
4. This is your relationship, not the platform's
5. Every profile looks like someone built it

---

## Product-wide hierarchy rules

Hard rules. Not guidelines.

**Rule 1 — One main current moment.**
The page is always "about" one thing. Pre-release: the upcoming release. Live: the album. Gig: tonight's show. Default: the artist's world. Never two equal-weight things competing for primary.

**Rule 2 — One main action.**
One CTA leads. Everything else supports. Two equally loud CTAs is a product failure.

**Rule 3 — State re-ranks, never rebuilds.**
Structure is stable. The user always knows where they are. State changes which section rises, not which sections exist.

**Rule 4 — Public value before private asks.**
The fan must receive something before being asked for something. Email capture, supporter asks, and gated content always follow value delivery. Exception: pre-release early access, where the ask IS the value.

**Rule 5 — Depth after clarity.**
Credits, deeper layers, supporter content — only after the primary content is understood.

**Rule 6 — Credits live where the work lives.**
Credits are meaningful adjacent to the work they describe. Credits only in a bottom section are for archivists.

**Rule 7 — The artist controls the middle, not the top or bottom.**
Hero, CTAs, and fan capture position are system-governed. Credits and footer are fixed. The middle (Music, Shows, Merch, Support, Snap Cards) is where artist control lives.

**Rule 8 — Monetisation never outranks public value on cold visits.**
Supporter CTAs and upgrade prompts do not appear before the fan has experienced primary content. Gig exception: "Get tickets" is both commercial and value-delivering simultaneously.

---

## State-driven hierarchy model

**Stable backbone (never changes):**
```
Identity layer (name, top card, CTAs, bio)
Quick action pills
Fan capture zone [position varies by state]
Content sections [order varies by state + artist preference]
Credits [fixed near bottom]
Footer [fixed]
```

**Dynamic emphasis by state:**

### Default / profile
- Primary: artist identity + latest release
- Main action: Stream latest
- Fan capture: "Stay close." — screenful 3, standard warm placement
- Credits: bottom section, closed accordion
- Shows, Merch, Snap Cards: artist-preference order

### Pre-release
- Primary: anticipation — countdown, release artwork, release title
- Main action: Pre-save / "Be the first to hear it"
- Fan capture: screenful 2 — the capture IS the action in this state
- Credits: hidden — the work isn't out yet
- Listen: secondary (tease only, no full player)
- Shows: secondary unless concurrent gig

### Live (out now)
- Primary: the release — top card is the album, full player
- Main action: Stream now (full-width, accent fill)
- Fan capture: screenful 3, "Stay on everything I do."
- Credits: appear inline on release card + optional top card credit line
- Shows: rises if tour is concurrent
- Merch: rises if release has associated merch item

### Gig mode
- Primary: tonight's show — venue, time, practical info
- Main action: "Get tickets" / "I'm going" / "Sold out — join waitlist"
- Fan capture: after show info block, "I'll let you know about future dates."
- Credits: hidden — wrong moment
- Listen: secondary ("while you wait" framing)
- Shows section: rises to top of configurable zone — tonight's show first

### Near-future bridge (≤7 days to any public moment)
- Primary: the upcoming moment
- Main action: Reminder CTA or ticket CTA depending on moment type
- Fan capture: "Remind me." / "Get the invite."
- World Map: hero chip surfaced, World Map section rises above standard position

**The priority formula:**
```javascript
final_order = [
  ...protected_top,           // hero, pills, fan-capture
  ...state_promoted_sections, // state wins regardless of artist preference
  ...artist_ordered_remaining,// artist preference for everything else
  ...protected_bottom         // credits, footer
]
```

---

## Section promotion table

```javascript
const STATE_PROMOTIONS = {
  'profile':     {},
  'pre-release': { listen: 6,    'world-map': 4 },
  'live':        { listen: 2,    shows: 4, merch: 5 },
  'gig':         { shows: 2,     listen: 6, 'world-map': null },
  'near-future': { 'world-map':  2 }
}

function computeSectionOrder(profile) {
  const state = computeState(profile)
  const base = profile.sectionOrder
    || ['listen','shows','world-map','snap-cards','merch','support','recommendations']
  const promotions = STATE_PROMOTIONS[state] || {}
  return base
    .filter(s => profile.sectionVisibility?.[s] !== false)
    .sort((a, b) => {
      const pa = promotions[a] !== undefined ? promotions[a] : (base.indexOf(a) + 10)
      const pb = promotions[b] !== undefined ? promotions[b] : (base.indexOf(b) + 10)
      if (pa === null) return 1   // null = remove from promotion (still shows, unranked)
      if (pb === null) return -1
      return pa - pb
    })
}
```

---

## Contextual email capture model

**Rule:** Capture urgency is proportional to how directly the capture is tied to the current moment.

**Four variants:**

```javascript
const CAPTURE_VARIANTS = {
  'profile':     {
    heading: 'Stay close.',
    cta:     "I'm in",
    trust:   'Just {artist}. No spam.'
  },
  'pre-release': {
    heading: 'Be the first to hear it.',
    cta:     'Notify me',
    trust:   'First listen, nothing else.'
  },
  'live':        {
    heading: 'Stay on everything I do.',
    cta:     'Count me in',
    trust:   'Just {artist}. No spam.'
  },
  'gig':         {
    heading: "I'll let you know about future dates.",
    cta:     'Let me know',
    trust:   'Show news only.'
  },
  'near-future': {
    heading: 'Remind me.',
    cta:     "I'm coming",
    trust:   'One email, when it matters.'
  }
}
```

**Position logic:**
- `pre-release`: screenful 2 (capture IS the action)
- `live`: screenful 3 (after experiencing the music)
- `gig`: after show info block (practical ask, practical position)
- `profile`: screenful 3 (standard warm placement)
- `near-future`: below the World Map chip / upcoming moment info

**Never:**
- Generic "Stay close." copy while a specific state is active
- Above fold on cold visit in any state except pre-release early access (which is a specific gated experience, not the general capture form)
- Two capture forms at equal prominence

---

## Guided reordering with guardrails

**Three tiers:**

**Protected — system-governed, artist cannot move:**
- Hero / identity layer (name, top card, CTAs, bio strip)
- Quick action pills
- Fan capture zone (position governed by state rule)
- Credits section
- Footer

**Artist-configurable (V1: show/hide; Phase 2: reorder):**
- Listen / Music
- Shows / Events
- World Map
- Snap cards
- Merch
- Support
- Recommendations

**Profile schema additions:**
```javascript
profile.sectionOrder = ['listen','shows','world-map','snap-cards','merch','support','recommendations']
profile.sectionVisibility = {
  listen: true, shows: true, 'world-map': true,
  'snap-cards': true, merch: false, support: true, recommendations: true
}
```

**V1 implementation:** Section visibility toggles in admin (show/hide per section). State still governs promotion within the visible set.

**Phase 2:** Drag-and-drop reorder list in admin with live preview.

---

## Gig mode — full spec

**Before the show (gig mode active, pre-event):**

Top card:
- If `event.venueImageUrl` exists → full-bleed venue photo, `object-fit: cover`, `brightness(0.75)`, white text over gradient overlay
- If no venue image → artist artwork + "On tonight" overlay chip
- "On tonight" chip: accent background, top-left position

Hero chip text: "On tonight — [Venue], [City] — doors [time]"

CTA hierarchy:
- Primary: "Get tickets" (if `ticketUrl`) / "I'm going" (RSVP, no ticketUrl) / "Sold out — join waitlist" (if `soldOut`)
- Secondary: "Add to calendar" / "Share"

Shows section: rises to position 2 in configurable zone. Tonight's show card first — full detail (venue, address, doors, set time, support act if configured). Upcoming dates below in compact format.

Fan capture: "I'll let you know about future dates." — positioned after shows block. Not screenful 3.

Listen: secondary, brief — small card "in the meantime"

Merch: surfaces if `merch.availableAtVenue: true` on any merch item

Credits: hidden in gig state

**During / on stage (Phase 2):**
"I'm on now" toggle in admin. Top card becomes live status card with current song, setlist position, live status chip.

**Post-show auto-transition (24hr after `able_gig_expires`):**
- No "gig mode ended" message
- Profile transitions to: `live` (if active release), `near-future` (if next show ≤7d), else `profile`
- Next show surfaces immediately if it exists

**Gig mode tone:** Urgent, practical, event-first. Warm urgency — not loud, not flyer-like.

---

## Contextual credits system

### Three layers

**Layer 1 — Inline (on the content object):**

Top card credit line (optional, artist-configured):
- `profile.topCard.creditLine` — one text string, artist-entered
- Renders below genre/location tag in hero
- `font-size: 11px`, `color: var(--color-text-3)`, `letter-spacing: 0.04em`
- Default: null (hidden). Artist opts in via admin.
- Tappable → opens expanded release/video panel

Release card inline credits:
- `release.credits.slice(0, 2)` → compact line: "Prod. [Name] · Mix. [Name]"
- If more than 2 credits: "Prod. [Name] + [N] others →"
- Separator line above: `border-top: 1px solid var(--color-border)`, `padding-top: 8px`
- Tappable names → ABLE profile if `credit.ableHandle` exists

Video cards: "Dir. [Name]" caption line if director credit exists

Snap cards: no inline credits

**Layer 2 — Expandable object detail:**
Tap a release card → expanded panel → full credits list for that release (all roles, all names, verification badges, links to ABLE profiles)

**Layer 3 — Credits section (full archive):**
Bottom of page, collapsed accordion. Listed by person across all works. "James Reid — Mastering (3 releases)." Professional discovery layer.

### Display logic

```javascript
function renderInlineCredits(credits) {
  if (!credits || credits.length === 0) return null
  const shown = credits.slice(0, 2)
  const overflow = credits.length - 2
  const line = shown.map(c => `${roleAbbr(c.role)} ${c.name}`).join(' · ')
  return overflow > 0 ? `${line} + ${overflow} others` : line
}

const ROLE_ABBR = {
  'Production': 'Prod.', 'Mastering': 'Mstrd.', 'Mixing': 'Mix.',
  'Direction': 'Dir.', 'Photography': 'Photo.'
  // Full role name used as fallback
}
```

---

## Cross-surface translation

### `able-v6.html`

**V1:**
- `computeSectionOrder()` function replaces hardcoded section insertion order
- `renderFanCapture()` reads `CAPTURE_VARIANTS[computeState(profile)]` for copy
- `renderInlineCredits()` added to release card render
- `profile.topCard.creditLine` rendered in hero if non-null
- Gig mode: venue photo logic + full copy/CTA spec
- Fan capture position: conditional on state (after shows block in gig; screenful 2 in pre-release; screenful 3 elsewhere)

**Not in V1:** "I'm on stage now" live mode, post-gig prompt, drag-to-reorder on profile

### `admin.html`

**V1:**
- Section visibility toggles — per configurable section, boolean, persists to `profile.sectionVisibility`
- Top card credit line field — text input in release edit form
- Gig mode panel extended: venue photo URL field, set time field
- Profile Identity card — already planned

**Phase 2:** Drag-and-drop section reorder with live preview, "I'm on stage now" toggle

### `start.html`

**V1:** No changes for this spec. Wizard outputs `sectionOrder` and `sectionVisibility` as defaults, nothing artist-configured in onboarding.

### `landing.html`

**V1:**
- Demo cycling: add gig mode state — "On tonight" chip, ticket CTA, shows prominent
- Release card in demo: show inline credits — "Prod. [Name]" proves the system
- Hero: "When they click, be ready." confirmed
- Sub-truths visible through demo cycling (state proves "changes with the moment")

---

## Visual and interaction implications

**State transitions:**
- Hero chip: opacity 0 (80ms) → apply new chip → opacity 1 (150ms)
- CTA label: crossfade in place (button doesn't disappear)
- Section reorder: `transform: translateY` over 250ms `ease-decel`, not instant swap

**Email capture register by state:**
- `pre-release`: slight forward lean — slightly larger heading, accent-tinted `background`
- `gig`: compact, practical — smaller heading, utility over warmth
- `profile`: warm, unhurried — standard treatment
- `gig` submit: no confetti. Checkmark + "Done. I'll let you know." — restrained register.

**Top card credit line:** `11px`, `var(--color-text-3)`. Separator: `·` between names. Touchable. Sits between genre tag and bio strip — never near CTAs.

**Inline credits on release cards:** `border-top: 1px solid var(--color-border)`, `padding-top: 8px`. Secondary text, not bold. Names tappable.

**Gig mode top card with venue image:** Full-bleed, `brightness(0.75)`, white text, gradient overlay bottom-up. "On tonight" chip accent-coloured, top-left. Full-width ticket CTA below.

**Reduced motion:** Section reorder transitions instant. State chip crossfade: opacity only. Credits expand: instant opacity, no height animation.

---

## V1 scope (strict)

**In V1:**
1. State-driven section promotion via `computeSectionOrder()` — full 5-state spec
2. Email capture copy variants — 5 variants from `CAPTURE_VARIANTS[state]`
3. Inline credits on release cards — compact render, 2 names + overflow
4. Top card optional credit line — `profile.topCard.creditLine`, one text field in admin
5. Section visibility toggles in admin — show/hide per configurable section
6. Gig mode extended — venue photo, set time, full hierarchy spec, reframed fan capture

**Phase 2:**
- Drag-and-drop section reorder in admin
- "I'm on stage now" real-time toggle + live setlist
- Post-gig momentum prompt
- Close Circle integration with gig mode (backstage, future date first access)
- Showcase / press mode full implementation
- State-specific Open Graph images

**Never:**
- Algorithmic section ordering (system decides based on engagement data)
- Fan-visible hierarchy scoring
- Per-fan personalised page order
- Section-level visual overrides

---

*This spec is subordinate to `core/V6_BUILD_AUTHORITY.md` on all technical decisions. It extends the Moment Engine, Fan Product, and Credits Ecosystem engines without overriding their core logic. When this spec and an engine doc disagree, escalate to `core/V6_BUILD_AUTHORITY.md` and resolve there.*
