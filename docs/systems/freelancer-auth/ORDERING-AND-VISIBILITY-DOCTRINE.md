# ABLE — Recommendation Ordering, Visibility, and Control Doctrine
**Authority: Claude (final product authority for this phase)**
**Date: 2026-03-16**
**Companion to: ARTIST-PROFILE-RECOMMENDATIONS-DOCTRINE.md**
**Status: CANONICAL**

This document goes deeper on ordering, rotation, pinning, and control. The broader doctrine is in ARTIST-PROFILE-RECOMMENDATIONS-DOCTRINE.md. Where they touch, this is more specific.

---

## The governing principle

> ABLE should not ask artists or professionals to publish a definitive ranking of their world.
> It should let them surface the right people at the right time.

This is not a soft aspiration. It is the architectural rule. Every ordering decision, every admin control, every copy choice should be tested against it. "Does this ask the artist to publish a ranking?" If yes, refuse it.

---

## 1. Direct Responses to GPT's Ordering Instincts

### Principle 1: Larger private pool + smaller visible public set
**Agree fully.**

This is the only model that avoids ranking energy while still allowing curation. A fixed public list of N people creates immediate hierarchy: first = most important, last = least. A pool where only some are in view at any time decouples "being in my world" from "being visible right now."

The pool is the artist's trust map. The visible set is the window. What's in the window changes. What's in the artist's world does not.

### Principle 2: Automatic weekly reordering should NOT be the default
**Agree completely.**

Random weekly rotation is the worst possible outcome. It:
- Removes artist intention (the section no longer reflects what they chose)
- Creates social weirdness (a producer who was visible is now not — did something happen?)
- Makes the section feel unstable and untrustworthy
- Signals to the professional: "you're one of several people being rotated through a slot"

That last point is the most damaging. If being shown by an artist should feel like an honour, it must feel permanent-until-changed, not "you got this week's slot." Random rotation converts honour into lottery. Refuse it.

### Principle 3: Curated and alive, not random
**Agree, and the mechanism is campaign state, not time.**

The way the section stays alive without feeling random: it changes in response to meaningful creative events (a release, a gig, the end of a tour) — not in response to time passing. "This changed because my new record dropped" feels intentional. "This changed because it's been seven days" feels arbitrary.

The section should feel alive because the artist's life is moving. Not because a cron job ran.

### Principle 4: Artist/professional control must come first
**Agree without qualification.**

ABLE is a tool for artists. This section exists for artists to express something real. If the system can silently override that expression, it is no longer a tool — it is an algorithm with an artist-themed skin. That is exactly what ABLE is not.

Control is not a UX nicety here. It is a product integrity requirement.

### Principle 5: ABLE can suggest, but should not silently decide
**Agree, with one sharpening.**

ABLE's suggestions should be visible in admin as suggestions — not as things that have already happened. The admin UI should say "Maya Beats is connected to this release — show her during pre-release?" with a one-tap accept. Not "we've automatically surfaced Maya because she's relevant."

The distinction: a suggestion you can accept or ignore feels helpful. A change that already happened feels like the product took something away from you. Never the latter.

### Principle 6: Pinned + contextual + flexible slots
**Agree. This is the correct three-slot model.**

This is the cleanest way to achieve intentional, alive, non-random ordering:

- **Pinned slots:** artist's deliberate "always show this person in this context"
- **Contextual slots:** people connected to the current campaign state (release credits, gig collaborators) — surfaces automatically when relevant, disappears when not
- **Flexible slots:** remaining visible positions filled from the general pool in artist-set order

This creates a section that:
- Always reflects artist intention (pinned)
- Automatically responds to creative moments (contextual)
- Has stable fallback order (flexible)
- Never feels random (all three have explicit logic)

### Principle 7: Any rotation should be limited and controlled
**Agree, with one clarification: "rotation" is the wrong word for what we want.**

Rotation implies cycle — person A is shown this week, person B next week, person A the week after. That is what we don't want.

What we want is **context-based surfacing**: the contextual slots respond to the campaign state, and when that state ends, those slots return to the general pool order. This is not rotation. It is relevance. Person A was in the contextual slot because they worked on this release. When the release window closes, they go back to where they were in the general pool order. They were never replaced. The context changed.

If there is a "flexible rotation" concept — some controlled randomness within the flexible slots — it should be opt-in, affect only flexible slots, and be limited to cycling within a smaller "eligible for rotation" list that the artist explicitly defines. Even then, I would not build this in V1 or V1.5. It is Phase 2 at earliest, and possibly never necessary.

### Principle 8: Ordering should be tied to meaning, not time
**Agree completely.**

The full list of valid reasons for the visible set to change:
1. Artist manually changes it
2. Campaign state changes (triggering contextual slots to update)
3. Artist enters/exits gig mode
4. A new release is published (contextual link updates)
5. Artist uses "preview" to check how it looks before committing

The list of invalid reasons:
- A week has passed
- Someone else was surfaced more recently
- An algorithm decided this person is "trending"
- A cron job ran

If ordering changes, the artist made it change or the campaign state made it change. Nothing else.

---

## 2. Final Doctrine

### Honour
Being in the pool is the honour. Being visible is the current expression of that. The two are decoupled. An artist can have someone in their world — genuinely valued — and not have them in the visible set right now. That is not a judgement. It is context.

The system must make this psychologically comfortable for everyone. The mechanism: nothing in the public-facing section implies "these are the most important people." The headings reference moments, not rankings. The visible count is small enough to feel like curation, not a list.

### Visibility
Visibility is earned by the moment, not by position. When an artist's album drops, the people who worked on that album are relevant. When a gig happens, the people around that gig are relevant. When neither is active, the artist's general trusted people are shown.

This is not algorithmic. It is calendar-driven and artist-controlled. The algorithm does not rank people. The campaign state creates a context, and the artist's pin choices fill that context.

### Ordering
Three-tier model:
1. **Pinned:** artist explicitly said "show this person in this context"
2. **Contextual:** person has a confirmed connection to the current campaign state (release credit, gig note)
3. **Flexible:** remaining pool in artist's default order

Within each tier, order is artist-set and stable. The only dynamic element is which tier each person is in, which changes with campaign state.

### Control
The artist controls:
- Who is in the pool
- Who is pinned for which campaign state
- The default order of the pool
- The visible count (3–6)
- The section heading per state
- Whether to accept or ignore ABLE's contextual suggestions

ABLE controls:
- Nothing in V1. ABLE renders what the artist set.
- In V1.5: ABLE offers suggestions. Artist accepts or ignores.

### Rotation
**No rotation in V1 or V1.5.** The three-tier model achieves contextual aliveness without any rotation. If we get to Phase 2 and artists genuinely want a "rotate among these N people" mechanism within the flexible slots, we can build it as an opt-in feature with explicit admin controls. But the default must always be stable, artist-determined order.

### Public interpretation
Fans should read the section as: "these are the people in view around this moment."
Not: "these are the artist's top N collaborators."
Not: "these are the only people this artist values."

The copy enforces this. The heading changes with the campaign state, always referencing a specific context ("Behind this one", "Tonight's crew") rather than implying permanence.

---

## 3. Full Product Model

```
THE POOL (private, in admin only)
│
│  Contains everyone the artist has added.
│  Can be 2 people or 40.
│  No public-facing visibility.
│  Ordered by artist.
│  Each item has: type, name, handle, role/genre, context, pinnedFor[], releaseIds[]
│
├─── PINNED ITEMS
│    │  Explicitly marked by artist for a specific campaign state.
│    │  "Show Maya during pre-release."
│    │  Multiple states possible: "Show Tom for both pre-release and live."
│    │  Always appear first in their pinned state's visible set.
│    │  In other states: fall back to flexible slots if within visible count.
│
├─── CONTEXTUAL ITEMS (V1.5)
│    │  Automatically surfaced because they are connected to the current state.
│    │  Connection = confirmed credit on the current release | gig note | project tag.
│    │  Not pinned by artist — suggested by ABLE.
│    │  Artist sees suggestion in admin and accepts or ignores.
│    │  Once accepted, behave like a soft pin for that state's duration.
│    │  When state ends, they return to flexible slots.
│
└─── FLEXIBLE ITEMS
     │  The remaining visible slots after pinned and contextual.
     │  Filled from the pool in the artist's default order.
     │  Stable. Not rotated. Not reordered by time.
     │  Artist can reorder the pool at any time to affect which flexible items show.

VISIBLE SET
  = pinned items for current state (in order of artist's pool order within pinned)
    + contextual items (if any)
    + flexible items to fill remaining visible slots
  Total: visibleCount (artist sets: 3, 4, 5, or 6. Default: 4.)
  Rule: never exceed visibleCount. Never pad with empty slots.
  If pool has fewer items than visibleCount: show what exists, no empty spaces.
```

---

## 4. Admin Model

### The admin section (Profile tab → "Your world")

**Two panels:**

**Panel A: In view now**
- Shows the current visible set as it will appear on the profile
- Live preview: small card renders of each visible item
- Includes a campaign state indicator: "Showing for: pre-release" (or "profile" etc.)
- One-tap "refresh preview" button
- "Change who's in view" link → opens Panel B

**Panel B: Your world (the pool)**
- Full list of all pool items, in order
- Each item shows:
  - Item card (name + type chip)
  - Drag handle for reordering (or up/down arrows on mobile)
  - "In view" indicator (green dot if currently visible based on current state)
  - Pin control: dropdown "Pin for: — / pre-release / live / gig / all" (V1.5)
  - Edit button: opens inline edit for name, handle, role/genre, context note
  - Remove button (removes from pool, no public effect)

**Settings:**
- "How many to show at once" — radio: 3 / 4 / 5 / 6
- Section heading per campaign state (one text field per state with placeholder default)

**V1.5 additions:**
- "ABLE suggestions" section: "Maya Beats has a confirmed credit on this release — show her during pre-release?" Accept / Dismiss
- Pin control becomes active (V1 just uses pool order)

**What is never in admin:**
- Any metric showing how many people saw each recommendation (Phase 2 only)
- Any algorithmic "we recommend you surface X" without artist trigger
- Any public ranking view

---

## 5. Public-Facing Behaviour

**What the fan sees:**
- The section heading (campaign-state-aware, artist-set or default)
- Up to visibleCount items, in visible-set order
- Each item: name + role chip (professional) or artwork + genre (artist) + arrow if ABLE link
- No count ("6 of 12 people in my world")
- No "see my full team" link in V1 (V1.5 may add a collapse if visibleCount > 4 and more items exist)

**What the fan understands (by design):**
- These are people the artist has chosen to surface right now
- Not a definitive list. Not a ranking.
- The heading orients them: "Behind this one" = release context, "Tonight's crew" = gig context

**What the fan does not see:**
- The pool
- The total pool count
- Who is pinned
- Who is in contextual vs flexible slots
- Any change history

---

## 6. Copy Rules

### Safe headings (reference a moment or context)
- "Worth knowing" — timeless, neutral ✓
- "Behind this one" — release-specific ✓
- "Who made this" — release day ✓
- "Tonight's crew" — gig context ✓
- "Around this project" — project context ✓
- "In my world" — neutral, connective ✓
- "People I work with" — honest, simple ✓
- "Around this release" — clear context ✓
- "Worth your time" — editorial, no hierarchy ✓

### Dangerous headings (imply ranking or permanence)
- "My top artists" ✗ — top = ranked
- "My favourite collaborators" ✗ — favourite = hierarchy
- "Best people I know" ✗ — best = superlative
- "My team" ✗ — implies employment relationship
- "Recommended" as standalone ✗ — too HR, sounds like a LinkedIn endorsement
- "My definitive collaborators" ✗ — definitiveness is the enemy

### Admin copy (for pool management)
- Pool = "Your world"
- Visible set = "In view right now" — not "shown" or "featured"
- Pinned = "Always show for [state]" — not "featured" or "highlighted"
- Contextual suggestion = "Relevant to this release" — not "recommended by ABLE"
- Remove from visible = "Not in view" — not "hidden" or "removed"
- Remove from pool = "Remove from your world" — consequential, needs confirmation

### Copy for contextual suggestion prompt (admin — V1.5)
"Maya Beats has a confirmed credit on this release — show her while you're in pre-release?"
→ "Yes, add her" / "Not now"
Not: "We recommend surfacing Maya Beats" (implies ABLE is making editorial decisions)
Not: "Maya Beats wants to be shown on your page" (implies agency on Maya's part)

### Copy for fan empty state (section hidden when empty)
Never show an empty section to fans. The section does not appear until the pool has at least one item.

### Copy for owner empty state
"Your world. Add the people around your music."
→ Small link: "Manage in admin"
Not: "Recommend other artists to your fans!"
Not: "Add collaborators to strengthen your profile!"

---

## 7. V1 / V1.5 / Phase 2

### V1 — Clean foundation

**What exists:**
- Pool: artist adds/removes/reorders items manually
- Two item types: artist and professional (different card rendering)
- Visible count: artist sets 3–6, default 4
- Campaign-state headings: ABLE picks default per state; artist can override each state's heading in admin
- Pool order = visible order (first N items in pool are visible for current state)
- Pinned items: `pinnedFor` field stored on each pool item, not yet used in V1 rendering
- Admin: full pool list, reorder, add/remove, visible count control, heading control
- **No automated suggestions**
- **No rotation**
- **No campaign-state filtering beyond heading change**

**What V1 achieves:** the artist has full manual control. They reorder their pool and set their visible count, and that's what shows. Simple. Clean. Intentional.

### V1.5 — Context and campaign intelligence

**What's added:**
- `pinnedFor` becomes active: items pinned for a state are promoted to the front of the visible set for that state
- `releaseIds` connection: items linked to the current release are promoted into contextual slots automatically
- ABLE suggestion prompt in admin: "This person has a confirmed credit on this release — show them now?" (one-tap accept)
- Admin "In view" preview panel shows the current visible set live

**What V1.5 achieves:** the section now responds to creative moments (releases, gigs) without requiring the artist to manually update it every time. But the artist still controls the pool and can override anything.

### Phase 2 — Optional depth

**What's added (all optional):**
- "Rotate within flexible slots" toggle: if artist wants the flexible slots to cycle among a defined eligible list on each page load, they can turn this on. Off by default. Never affects pinned or contextual slots.
- Pool analytics: which visible items drove taps to external profiles
- "Visibility window": ability to set a start/end date for a pool item's visibility (e.g. "show during album campaign, October–December")
- Professional-side: professionals can add a small "artists I've worked with" list to their profile, same pool model, same admin logic

---

## 8. What to Refuse

- **Random weekly rotation** — removes artist intention, creates social weirdness, makes the section feel untrustworthy
- **Silent algorithmic reordering** — any change the artist didn't make or consent to
- **Public visible count** — "6 people in my world" shown to fans creates completeness pressure and implicit ranking
- **"Featured" or "highlighted" badges visible to fans** — internal admin concept only
- **"Why am I not on the list?" dynamics** — prevented by pool/visible split and context-based copy
- **Any copy using: top, best, favourite, most important, definitive** — all imply ranking
- **ABLE making editorial decisions without surfacing them to the artist** — ABLE suggests, artist decides
- **Rotation that affects pinned slots** — pinned items are the artist's deliberate choices; they should never be randomly rotated away
- **Phase 2 rotation as the default** — opt-in only, flexible slots only, clearly labeled in admin

---

## 9. File Updates Required

| File | What to add/change | Why |
|---|---|---|
| `able-v7.html` | `renderRecommendations()`: three-tier rendering (pinned → contextual → flexible), campaign-state heading logic, visibleCount | Core rendering needs the model |
| `admin.html` | Recommendations management: "Your world" pool panel + "In view now" panel, visibleCount control, per-state heading control, pinnedFor field on items | Artist control interface |
| `docs/systems/freelancer-auth/ARTIST-PROFILE-RECOMMENDATIONS-DOCTRINE.md` | Update §14 V1 build details to reference this ordering model explicitly | Keep docs consistent |
| `docs/systems/freelancer-auth/ORDERING-AND-VISIBILITY-DOCTRINE.md` | This file — new | Canonical ordering authority |
| `docs/pages/profile/DESIGN-SPEC.md` | §6.12: replace with reference to this doctrine + brief rendering spec | Spec must reflect current doctrine |

### Data model (for `able_v3_profile.recommendations`):

```javascript
recommendations: {
  pool: [
    {
      id: 'uid_' + Date.now(),    // stable identifier
      type: 'artist' | 'professional',
      name: 'Maya Beats',
      handle: null,               // ABLE handle, null if not on ABLE
      role: 'Production',         // professionals only (required)
      genre: 'Electronic',        // artists only (optional)
      artworkUrl: null,           // artists only (optional)
      context: '',                // artist-written note, max 60 chars (optional)
      confirmedCredit: false,     // true if this person has a confirmed credit on any release
      pinnedFor: [],              // [] | ['pre-release'] | ['live'] | ['gig'] | ['profile'] | multiple
      releaseIds: [],             // release IDs this person is connected to (V1.5)
      addedAt: Date.now(),
    }
  ],
  visibleCount: 4,                // 3 | 4 | 5 | 6
  headings: {
    profile:       null,          // null = use default "Worth knowing"
    'pre-release': null,          // null = use default "Behind this one"
    live:          null,          // null = use default "Who made this"
    gig:           null,          // null = use default "Tonight's crew"
  }
}
```

**Backwards compatibility:** on load, if `profile.recommendations` is an array (old format), migrate to `{pool: [...], visibleCount: 4, headings: {}}`. One-way, no data loss.

**Rendering order (in `renderRecommendations()`):**
1. Get `currentState` from `computeState(profile)` or `profile.stateOverride`
2. Get heading: `recommendations.headings[currentState] || DEFAULTS[currentState] || 'Worth knowing'`
3. Sort pool: pinned-for-current-state items first (in pool order within pinned), then non-pinned (in pool order)
4. Slice to `visibleCount` (default 4)
5. Render each item per type

---

*This document is the canonical authority on recommendation ordering, visibility, and control.*
*Build order: data model first → `renderRecommendations()` update → admin panel.*
