# ABLE — Artist Profile Recommendation Layer: Product Doctrine
**Authority: Claude (final product authority for this phase)**
**Date: 2026-03-16**
**Status: CANONICAL — governs "Artists I recommend" + "Professionals I work with" + pool/visibility model**

This document supersedes §6.12 of `docs/pages/profile/DESIGN-SPEC.md` and refines the professional layer doctrine in `PRODUCT-DOCTRINE.md`. Where they conflict, this wins.

---

## 1. Core Judgment

This system is a **living creative context layer on the artist profile**.

Not a directory. Not an endorsement wall. Not a following list. Not a marketplace.

The artist's profile is a snapshot of who they are right now — this release, this period, this creative moment. The recommendation section is the people-shaped part of that snapshot. It tells fans: these are the people in my world at this moment. Not my definitive ranking. Not my permanent list. My world, as it stands now.

That framing — **moment, not monument** — is the entire governing principle. Every design decision, every copy choice, every data model should be tested against it. "Does this feel like a moment or a monument?" If it feels like a monument (permanent, definitive, social-status-laden), refuse it.

The professional layer is the thing that grows underneath this. It is the infrastructure that makes "this person has an ABLE profile" meaningful. But the centre of gravity is always the artist profile. The recommendations section is the surface. The professional system is what gives it depth over time.

---

## 2. Responses to the 8 Principles

### Principle 1: This is primarily an artist-profile feature, not a freelancer feature
**Agree fully.**

The artist profile is where fans are. It is where discovery happens. The recommendations section on the artist profile is the primary surface. The professional profile is what a fan lands on when they tap a name — it is downstream, not upstream.

This has a direct build consequence: you can ship the recommendations section on the artist profile before any professional infrastructure exists. An artist can add Maya Beats as a credited producer right now — handle null, renders as plain text — and the section is live and real. Maya's profile can come later. The section doesn't wait for the ecosystem to exist. It seeds it.

### Principle 2: Artists I recommend + Professionals I recommend — one section or two?
**One section. Two rendered types. One artist-owned heading.**

Two separate sections would create visual weight and naming pressure. "Artists I recommend" as its own header creates implicit obligation: "why isn't X on my recommendations list?" "Professionals I work with" as a separate section creates a services-directory smell.

One section with an artist-owned heading and two internally-rendered item types is the right answer:
- The section heading belongs to the artist ("Worth knowing", "Around this release", "Tonight's crew", "In my world" — their words)
- Within the section, artist-type items and professional-type items render differently (artwork card vs role card)
- Fans read it as: "these are the people in this artist's world." They don't need a sub-heading taxonomy.

The internal distinction (artist vs professional) is meaningful for logic and link routing. It is not meaningful as a public label.

### Principle 3: Trust should be the entry mechanism for professionals
**Agree, with nuance.**

The primary professional entry paths in order of value:
1. Artist credits them on a release (strongest — peer-created, tied to specific work)
2. Artist adds them to their recommendations pool (strong — editorial endorsement)
3. Professional claims their profile after being credited/recommended (activation of existing trust)
4. Professional signs up cold before being credited (valid, but quiet until trust is earned)

Cold sign-up is not wrong. It is just low-value until the first credit or recommendation arrives. A cold profile should exist but should not be surfaced via any discovery mechanic until it has at least one confirmed connection to an artist on ABLE.

### Principle 4: The asymmetry rule should stay
**Agree, and it should be four states, not two.**

The current implementation is binary: handle set = link, handle null = plain text. That is correct. But the full system has four trust states that should be visually distinct:

| State | Display treatment |
|---|---|
| No ABLE profile | Plain text, 70% opacity, no arrow, no link |
| Has ABLE profile, 0 confirmed credits | Live link, full opacity, arrow — but profile signals it's early |
| Has ABLE profile, 1+ confirmed credits | Live link, full opacity, arrow — profile shows trust signal |
| Has ABLE profile, 3+ confirmed credits from different artists | Live link + subtle ✓ mark on the rec item card (not a badge, just a mark) |

In V1, the implementation can be simpler: handle set = link + ✓ if credited on a release. Handle null = plain text. The four-state model is V1.5.

### Principle 5: Deepen, don't widen
**Agree. The test is: does this make the artist's world feel richer, or does it make ABLE feel bigger?**

Richer: a fan taps "Maya Beats" on a release card and lands on Maya's profile, which shows the two other ABLE artists she's worked with and a SoundCloud sample. The fan discovers two new artists they didn't know. ABLE got culturally richer.

Bigger: a "Browse producers" directory page with 500 names, filter by genre, sort by "top rated." ABLE got wider but not richer.

Every feature decision in this layer should be evaluated on richer vs bigger, not bigger vs bigger.

### Principle 6: Professionals are proof-of-work first, selling second
**Agree completely.** The professional profile structure (Section 7 below) enforces this. Credits come before rates. Identity comes before services. The enquiry form is at the bottom, not the top.

### Principle 7: Enquiries should feel calm and serious
**Agree.** The enquiry section below. The key principle: ABLE should make it easy to send one good message, not easy to send ten bad ones.

### Principle 8: V1 should start narrow and elegant
**Agree, and the right V1 is even narrower than previously specced.**

V1 is:
1. The recommendations section on the artist profile (extended model: artist + professional types)
2. Admin management for the pool (add, remove, pin, set visibility count)
3. Campaign-state-linked heading logic
4. Plain-text-vs-link asymmetry (handle-based)
5. That's it.

No professional profiles in V1. No claiming flow. No onboarding. Just the artist profile surface and the admin management for it. The professional infrastructure follows in V1.5.

---

## 3. Product Doctrine

### What it is
A living context section on the artist's profile that surfaces the people in their creative world — artists they rate, people they work with — filtered by the current moment (campaign state, release, gig) rather than presented as a permanent ranked list.

### Why it belongs on the artist profile
Because artists exist in ecosystems, not in isolation. A profile that shows only the artist's own work, with nothing of the world around them, is a promotional page. A profile that also shows who they trust, who they work with, who they rate — that is a window into a real creative life. ABLE should be the latter.

### Why it starts here
Because this section is valuable from the first item added, with no professional infrastructure needed. An artist adding "mixed by Tom H." as plain text, on day one, before Tom has ever heard of ABLE — that is already real. The link upgrades when Tom joins. The value doesn't wait.

### What makes it ABLE-native
1. It is editorial, not algorithmic. The artist chose every item.
2. It is moment-based, not permanent. The visible set reflects now.
3. It is asymmetric. Claimed profiles look different from unclaimed ones. Trust is visible.
4. It is about real creative relationships, not curated follower lists.

### What it must never become
- A public ranking ("my top 5 collaborators")
- A social status ladder
- A directory page
- A testimonials wall
- A followable list with counts
- A marketplace tile grid
- Something that creates social anxiety for people who aren't currently shown

---

## 4. Complete System Model

```
ARTIST adds Maya Beats to their recommendations pool
  → type: professional, role: Production, handle: null (Maya not on ABLE)
  → On artist profile: "Maya Beats · Production" — plain text, no link
  → Maya joins ABLE later → artist's credit auto-converts to live link
  → Maya's profile now shows "worked with [Artist]" in her confirmed connections

ARTIST enters pre-release state for new album
  → ABLE reads: Maya Beats has releaseId matching upcoming album
  → Suggests Maya as a visible recommendation for the pre-release period
  → Artist pins Maya for this period: visible in the "Behind this one" context
  → Artist's profile now shows Maya as a live link alongside the featured artist

FAN lands on artist profile in pre-release state
  → Sees "Behind this one" section with Maya Beats + featured artist
  → Taps Maya Beats → lands on Maya's professional profile
  → Sees Maya's confirmed credits across 3 artists
  → Finds an artist they didn't know via Maya's credit list
  → ABLE's creative network deepens through real trust paths

ANOTHER ARTIST looks at the first artist's profile
  → Sees Maya Beats in "Behind this one"
  → Recognises the production sound
  → Sends Maya an enquiry via ABLE's relay form
  → ABLE made a professional introduction without a directory

CAMPAIGN STATE CHANGES to live (release day)
  → Section heading changes to "Who made this"
  → Maya remains visible (credited on this release)
  → Featured artist surfaces alongside her
  → Section reflects release day reality

GIG MODE activates
  → Section heading: "Tonight's crew" (if artist has set gig-pinned people)
  → Visual collaborator / support act / live band member surfaces
  → Maya not in gig context — drops back into pool, not visible tonight
  → Pool is preserved, context changes
```

---

## 5. HONOUR, VISIBILITY, AND ROTATING RECOMMENDATION LOGIC

This is the most important section. Get this wrong and the feature becomes socially corrosive. Get it right and it becomes one of the most distinctly ABLE things on the platform.

### Direct response to the instinct

The instinct is correct. The private pool + smaller public visible set + campaign-linked rotation is the right model. Here's why in full:

A static public list of 6 people creates:
- Obligation to include certain people ("if I don't put my manager, is that a statement?")
- Awkwardness when someone is removed ("did they fall out?")
- Ranking energy (why is person X above person Y?)
- Permanence pressure (it becomes a document, not a window)

A pool-based system with contextual visibility creates:
- The feeling of curation, not ranking
- The ability to surface the right people for the right moment
- Graceful state changes (what shows in pre-release is different from what shows post-gig)
- No social wounds — "not visible right now" is completely different from "not recommended"

### The final model

**Private pool:** the full set of people in the artist's creative world. No cap. Could be 2, could be 40. Private. Only visible in admin.

**Public visible set:** max 4 by default (artist can set 3–6). What shows at any moment. Determined by:
1. Campaign-state pins (if the artist has explicitly pinned someone for this state)
2. Release-linked items (if the upcoming/current release has credited/recommended people)
3. The rest of the pool, in the order the artist set them

**Campaign-linked visibility:**
| Campaign state | Section heading | Who surfaces |
|---|---|---|
| `profile` (default) | Artist's set heading, or "Worth knowing" | General pool, artist-ordered, artist-pinned items first |
| `pre-release` | "Behind this one" (overridable) | pinnedFor: 'pre-release' first, then pool items with matching releaseId, then general pool |
| `live` | "Who made this" (overridable) | pinnedFor: 'live' first, then credited items on the current release, then general pool |
| `gig` | "Tonight's crew" (overridable) | pinnedFor: 'gig' first, then general pool |

**Manual pinning:** artist can explicitly pin someone for a campaign state in admin. "Show Maya for pre-release." Simple toggle. Not required — the system can use release-connection logic if the artist doesn't pin manually.

**ABLE suggestions:** in V1.5, ABLE can suggest who is contextually relevant ("Maya Beats has a confirmed credit on this release — show her in pre-release?"). The artist accepts or ignores. ABLE never decides alone. The artist's pool and pins always override.

**In V1:** no automated campaign-linked suggestions. Artist manually controls who is visible and what state they're pinned for. Simple pool with `pinnedFor` field. The rendering logic uses campaign state to filter. The artist does the curation.

### How many items visible at once

Default: 4. Artist can choose 3, 4, 5, or 6.

4 is the right default because:
- On mobile, 4 items stack cleanly without requiring a "see more"
- 4 feels curated; 6 starts to feel like a list
- The moment you need 7, you have ranking energy again

**Max cap: 6.** Above 6, a "See more" collapse is needed — and that collapse creates a visible hierarchy (first 6 > the rest) which is exactly what we're trying to avoid. Keep it at 4–6 and trust the pool to hold the rest.

### Avoiding ranking energy — the complete rules

**Copy rules:**
- Heading must reference a moment or context, never a ranking
- "Worth knowing" — neutral, relational ✓
- "Behind this one" — release context ✓
- "Tonight's crew" — gig context ✓
- "In my world" — neutral, connective ✓
- "Worked with recently" — temporal, not hierarchical ✓
- **Never:** "My top artists" ✗
- **Never:** "My favourite collaborators" ✗
- **Never:** "Recommended" as a standalone heading (too HR-sounding) ✗
- **Never:** "Best people I know" ✗
- **Never:** Any ordinal language (first, top, best, most) ✗

**Visual rules:**
- No order numbers visible to fans ("1. Maya Beats")
- No "featured" or "top pick" badges
- Items should not have visual weight hierarchy between them (same card size, same font weight)
- The section should look like a list of names the artist chose, not a leaderboard

**Interaction rules:**
- No public count shown ("6 people in my world") — this creates completeness pressure
- No "add more" prompt visible to fans
- No "follow all" or "discover similar" mechanic
- Removing someone from the visible set does not remove them from the pool — this distinction matters and should be reflected in admin copy

**Admin copy for the pool distinction:**
- "Visible now" vs "In your world" — not "shown" vs "hidden"
- "Change who's in view" — not "edit your recommendations"
- "Your world" = full pool. "In view" = current visible set.

### Artists vs professionals — same visibility model?

**Yes, same pool model.** An artist's pool can contain both artists and professionals. They render differently but live in the same pool and the same visibility logic applies.

**One distinction for professionals:** if a professional has a confirmed credit on one of the artist's releases, they get a subtle ✓ mark on their rec card. This is not a ranking signal — it is a trust signal. It means "this is more than a recommendation; they worked on my music." Artists without the ✓ can still appear; the mark just communicates more.

For the professional's own profile: their "worked with" section is auto-generated from confirmed credits (not a manual pool). They do not need to manage a separate pool. What shows on their profile is the evidence of real work.

### V1 / V1.5 / Phase 2 for this model

**V1:**
- Pool stored in `able_v3_profile.recommendations` (extended model below)
- `pinnedFor` field on each item (stored even if not used in V1 rendering)
- `visibleCount` field (default 4, artist sets in admin)
- Campaign-state heading logic: rendering reads current campaign state, picks heading
- Artist can manually set a custom heading per state in admin
- Basic admin management: add, remove, reorder, toggle visible
- **No automated campaign-state suggestion in V1**

**V1.5:**
- ABLE suggests contextually relevant pool items based on release connections
- Artist can accept/ignore suggestions
- `releaseIds` field used for automatic pre-release / live surfacing
- "In view for: pre-release / live / gig" toggle per pool item in admin

**Phase 2:**
- Full professional claiming flow activates pool links (unclaimed → claimed auto-converts)
- Pool analytics: which visible items drove taps/profile visits
- "Fans who loved your music also looked at Maya Beats" private insight (not public)

---

## 6. Artist Profile Feature Design

### The section

**HTML id:** `#recs-section` (existing — keep)
**Section heading:** `#recs-heading` — computed per campaign state or artist-set custom heading
**Item list:** `#recs-list` — contains mixed artist-type and professional-type items

**Default headings per state:**
- `profile` → "Worth knowing"
- `pre-release` → "Behind this one"
- `live` → "Who made this"
- `gig` → "Tonight's crew"

All overridable. Artist sets custom heading in admin per state, stored in `recommendations.headings{}`.

### Item visual treatment — two types

**Artist-type item:**
```
[56×56 artwork]  [Name — 14px semi-bold]
                 [Genre — 11px, accent-tinted]   [↗]
```
- Artwork: `border-radius: 8px` (rounded square, not circle)
- If no artwork: initial letter in accent-tinted block, same dimensions
- Arrow (↗) only if ABLE handle exists (live link). No arrow = plain text, no hover state.
- Link target: `ablemusic.co/[handle]` or external URL (V1.5: external URLs)

**Professional-type item:**
```
[ROLE CHIP]     [Name — 14px semi-bold]
                [Context line — 11px, 60% opacity, optional]   [↗ or nothing]
```
- Role chip: `8px uppercase, letter-spacing: .12em, background: rgba(accent, 0.12), color: accent-tinted`
- Chip replaces the artwork square — professionals are identified by role, not image
- Context line (artist-written, max 60 chars): "Produced my last three releases"
- ✓ mark at end of name if they have a confirmed credit on any of this artist's releases
  - ✓ is 11px, accent at 55% opacity — not a badge, just punctuation-weight
  - No label. No tooltip in V1. The mark speaks.
- Arrow (↗) if ABLE handle exists. No arrow if not on ABLE.

**Unclaimed / no ABLE profile:**
- Both types: name at 70% opacity, no arrow, no hover state, no link
- Renders as plain text styled to look deliberate, not broken
- No "(not on ABLE)" label — this would create negative framing

**Zero items (owner view):**
- Empty state: "Your world. Add the people around your music." + "Manage in admin →"
- Hidden from fan view until at least one item exists

**Zero items (fan view):**
- Section hidden. Never show an empty section to fans.

### Section placement on profile

Current position in the DOM: after credits-section, before secondary fan-capture. This is correct.

The section should have slightly more breathing room than it currently gets — `margin-top: 32px` on the section header, same as other major sections. It is editorial, not functional. It deserves the visual weight of a considered choice.

### Mobile behaviour

At 375px:
- Items stack vertically, one per row
- Full width, 44px+ tap target
- Artist-type: artwork thumbnail collapses to 44×44px
- Professional-type: role chip + name on same line, context below (if set)
- Max 4 items shown before "See more" (if visibleCount is set > 4)

---

## 7. Release Credits Design

Release credits and profile recommendations are **two distinct trust mechanisms** that share an underlying data connection but must not be conflated in the UI.

**Credits** = specific attribution to specific work. "Maya Beats produced this track."
**Recommendations** = editorial endorsement. "Maya Beats is someone I trust and fans should know."

A person can be credited without being recommended (credited on one deep cut, not featured on the profile section). A person can be recommended without having a credit (an artist the artist rates who hasn't collaborated directly yet).

### How credits on release cards behave

Current model: `credits[]` array on each release: `{name, role, handle}`.

**Rendering rules (current — confirmed correct):**
- `handle` set → renders as `<a href="/[handle]">[name]</a>` at full opacity
- `handle` null → renders as `<span>[name]</span>` at 70% opacity (no link)

**Role shows:** "Production: Maya Beats" or "Mixed by Tom H." The role label is required. Without role context, a credit is just a name.

**How many credits show by default:** 3. If more than 3, a "See [N] more credits" expand link. Fans who want to go deep can. Fans who don't aren't overwhelmed.

**Connection to recommendations pool:**
- In V1: no automatic connection. Credits live on releases. Recommendations live on the profile. The artist manually adds someone to the recommendations pool.
- In V1.5: when an artist adds a credit with a handle on a release, ABLE asks "Want to add Maya to your world?" — one tap to add to pool. Not automatic. Offered.

---

## 8. Professional Profile Design

### Purpose

The professional profile is a creative record. It answers one question: "Who is this person, and what have they made with people I trust?"

It is not a services page. It is not a CV. It is the accumulated evidence of a real creative practice, filtered through real trust relationships.

### Structure (top to bottom)

**Identity header**
- Name: Barlow Condensed, 28px
- Primary role: 13px uppercase, accent-tinted (MIXING ENGINEER / PRODUCER)
- Location: city only, optional ("London · Remote")
- One-line bio: max 120 chars, first person. "I mix for artists who care about the room between the notes."

**Work — the proof section**
- Heading: "Work"
- Credits in reverse chronological order: [Artist] — [Release] — [Role]
- Confirmed credits: full opacity, artist name is live link to their ABLE profile
- Pending credits: 70% opacity, small "(awaiting confirmation)" in 10px below
- Unverified: hidden from public profile
- Max 6 visible before "See all" collapse
- 0 confirmed: "Credits in progress — building their record on ABLE."

**Artists on ABLE** (auto-generated)
- Heading: "Artists on ABLE"
- Compact strip of 32×32 artist avatars with names on hover
- Only artists with confirmed credits shown
- Hidden until first confirmed credit exists

**Listen / Watch** (portfolio — V1.5)
- Max 2 oEmbed items in V1.5 (free tier)
- One-line label each

**Available for work** (bottom of profile)
- Availability chip: "Open for new work" / "Limited availability" / "Not available right now"
- If open: "Send an enquiry" → 4-field form
- Rate card: brief, below the fold, optional. "Production from £300/track." Not a table.

---

## 9. Onboarding and Claiming Flow

### Entry paths (in trust order)

1. **Claim path:** Artist has credited them → they receive "You were credited on ABLE" email → follow link → 3-step claim wizard → profile live
2. **Recommendation path:** Artist has added them to their recommendations pool with a handle → similar claim notification
3. **Cold path:** Professional finds ABLE independently → freelancer-start.html → 4-step wizard → profile live but quiet until first credit

**Claim wizard (3 steps — simpler than cold onboarding):**
1. "This is you — confirm your details" (name, role, handle)
2. "Confirm your credit on [Artist]'s [Release]" — one tap
3. "You're live. ablemusic.co/[handle]"
Done. The credit was already there. Claiming just activates the link.

**Cold wizard (freelancer-start.html — 4 steps):**
1. Role + handle
2. Credits search (add manually)
3. One-line bio
4. Done — profile live, credits pending

**The live moment for claims:**
"Your name is now a live link on [Artist]'s page." That is the moment. Surface it explicitly in the done state.

---

## 10. Enquiry / Booking Flow

### The 4-field form

1. Your name
2. What you're working on (280 chars — enough for context, not a full brief)
3. When you need it (free text: "End of May", "No rush, just want to discuss")
4. Your email

**No budget field in V1.** Budget conversations happen in the reply. A budget field either filters out people who don't know their budget yet (legitimate) or attracts low-budget commodity enquiries. Neither is right.

**Optional in V1.5:** "Are you an ABLE artist?" checkbox. If yes, the professional can see the artist's profile context — this creates a warm handoff and is genuinely useful.

**Rate limit:** 3 enquiries per email per professional per 24 hours. Silent, server-side.

**After submit:**
- Enquirer: "Sent to [Name]. They'll be in touch if it's a good fit."
- Professional receives relayed email with full enquiry + enquirer's email for direct reply
- Professional's email never exposed to enquirer before they choose to reply

---

## 11. Copy System

### Tone

The register is: one trusted creative person talking to another. Not HR. Not SaaS. Not Instagram caption. Not a pitch deck. The person writing this has been in a studio, been on a tour, been broke between releases, and knows what it means to actually do this work.

### Section headings (artist profile)

| State | Default heading | Feel |
|---|---|---|
| profile | "Worth knowing" | Neutral, editorial, timeless |
| pre-release | "Behind this one" | Release-specific, credits the work |
| live | "Who made this" | Release day — direct, factual |
| gig | "Tonight's crew" | Live context, present tense |
| custom | artist sets | Their words, their world |

### Empty states

**Owner, empty pool:**
"Your world. Add the people around your music."
→ "Manage in admin"

Never: "Add recommendations to grow your network!" — wrong register entirely.

**Owner, pool has items but 0 visible:**
"No one's in view right now. Pin people for this campaign state."

### Item states

**Professional — no ABLE profile:**
"Maya Beats · Production" — plain text, 70% opacity
No label like "(not on ABLE)". The absence of a link speaks.

**Professional — confirmed credit mark:**
"Maya Beats ✓" — the ✓ requires no explanation. Anyone who cares will understand. Anyone who doesn't, won't be confused by it.

### Claim prompts (V1.5)

When a professional lands on their claim link:
"[Artist] credited you on '[Release]'. This is your ABLE profile waiting to be claimed."
→ "That's me — set up my profile"
→ "This isn't me"

Not: "Congratulations — you've been credited!" (exclamation mark, wrong register)
Not: "Claim your free profile" (sounds like prize draw copy)

### Enquiry prompts

Enquiry button: "Send an enquiry" — direct, no pressure
Form intro: no intro copy needed. The fields are self-evident.
After submit: "Sent to [Name]. They'll be in touch if it's a good fit."
Not: "Message sent! We'll let [Name] know you're interested." — too chatty

### Professional onboarding

Step 1 prompt: "What do you do?"
Not: "Tell us about your skills!"

Step 2 prompt: "Who have you worked with?"
Not: "Add credits to stand out!"
Not: "Build your reputation by adding your work history"

Done state: "Your profile is live at ablemusic.co/[handle]."
Sub-line: "Credits are what make it worth finding. We'll let you know when artists confirm yours."

---

## 12. Visual / UX System

### Artist item
```css
.rec-item--artist {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(var(--color-accent-rgb), 0.08);
}
.rec-item__artwork {
  width: 56px; height: 56px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  background: rgba(var(--color-accent-rgb), 0.1);
}
.rec-item__name { font-size: 14px; font-weight: 600; color: var(--color-text); }
.rec-item__genre { font-size: 11px; color: var(--color-accent); opacity: 0.7; margin-top: 2px; }
```

### Professional item
```css
.rec-item--professional {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(var(--color-accent-rgb), 0.08);
}
.rec-item__role-chip {
  font-size: 9px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase;
  padding: 3px 8px; border-radius: 100px;
  background: rgba(var(--color-accent-rgb), 0.12);
  color: var(--color-accent);
  flex-shrink: 0; white-space: nowrap;
}
.rec-item__confirm-mark {
  font-size: 10px; color: var(--color-accent);
  opacity: 0.55; margin-left: 4px;
}
.rec-item__context {
  font-size: 11px; color: var(--color-text-2);
  opacity: 0.6; margin-top: 2px;
}
```

### Arrow
- Only rendered if a live link exists
- `↗` in SVG, 14×14, accent at 45%
- On hover: translates +3px right, spring easing, accent goes to full opacity

### No-link state
- No arrow rendered
- Name at 70% opacity
- Not styled differently otherwise — just quieter

### Confirmed credit mark (✓)
- Inline, after name: `[Name] ✓`
- Not a badge element — literally a character after the name span
- 10px, accent at 55%
- No tooltip in V1

---

## 13. V1 / V1.5 / Phase 2

### V1 — Narrowest real version

**What ships:**

**able-v7.html:**
- Extended `renderRecommendations()` function handles two item types (artist vs professional)
- Professional-type renders role chip instead of artwork
- Campaign-state-aware heading (reads `computeState(profile)`, picks default heading)
- Handles `pool[]` model with `visibleCount` (defaults to 4 if not set)
- ✓ mark rendered if `confirmedCredit: true` on pool item
- Plain text (no link, 70% opacity) if `handle` null

**admin.html:**
- Recommendations section under Profile tab
- "Your world" heading for the full pool list
- "In view" label on items that are currently visible (based on visibleCount and order)
- Add item: type toggle (artist / professional) + name + handle + role (professional) / genre (artist) + context (optional)
- Reorder (drag or up/down arrows)
- "Visible" count setter: 3 / 4 / 5 / 6 radio
- Section heading: text field per campaign state with default placeholder
- No campaign-state pinning in V1 — just ordering + visible count

**Data model extension:**
```js
// able_v3_profile.recommendations becomes:
recommendations: {
  pool: [
    {
      id: 'uid_[timestamp]',
      type: 'artist' | 'professional',
      name: 'Maya Beats',
      handle: null,
      role: 'Production',      // professionals only
      genre: 'Electronic',     // artists only
      artworkUrl: null,        // artists only
      context: '',             // optional artist-written note, max 60 chars
      confirmedCredit: false,  // set manually by artist in V1; auto in V1.5
      addedAt: Date.now(),
    }
  ],
  visibleCount: 4,
  headings: {                  // null = use default per state
    profile: null,
    'pre-release': null,
    live: null,
    gig: null,
  }
}
```

**Backwards compatibility:** current `recommendations[]` array format (if present) migrates to `recommendations.pool[]` at load time. One-way migration, no data loss.

### V1.5 — Structure and confidence

- Campaign-state pinning: `pinnedFor: null | 'pre-release' | 'live' | 'gig'` on pool items
- ABLE suggests contextually relevant pool items based on confirmed release credits
- External URLs for artist-type items (not just ABLE handles)
- Professional profile page (able-v7.html renders professional mode)
- freelancer-start.html claim flow (3-step)
- Enquiry relay (Netlify function)
- Admin: "Who's in view right now" live preview panel

### Phase 2 — Full network

- Automated credit-to-recommendation connection (ABLE offers to surface credited professionals for relevant campaign states)
- Pool analytics (which visible items drive the most taps)
- Professional claiming flow from email notification
- "Artists on ABLE" auto-strip on professional profile
- Before/after audio player for engineers
- Discovery via mutual collaborators ("also worked with artists you follow")

---

## 14. What to Refuse

- Public item count ("6 people in my world" shown to fans)
- Ordinal signals (first, top, most, best, favourite)
- Any badge meaning "endorsed" vs "not endorsed"
- "Featured" or "pinned" labels visible to fans (visible in admin only)
- Social metrics on rec items (profile views, follower count, response rate)
- Fan-facing "follow this person" mechanic on rec items
- "Recommended by X artists" shown as a public count
- Any design that lets fans sort or filter the recommendations section
- "Browse all collaborators" link to a directory
- Any copy using: hire, marketplace, certified, verified, top-rated, trending
- Star ratings or review scores on professionals anywhere
- "Why isn't X on my list?" — prevent this by ensuring the section copy always implies "in view now" not "definitive list"

---

## 15. Exact Build Order

**Now (no backend required, V1):**

1. **Extend data model** in `able-v7.html` and `admin.html`:
   - Migrate `recommendations[]` → `recommendations.pool[]` with type + role + confirmedCredit fields
   - Add `visibleCount` and `headings` to the model
   - Migration shim for existing data

2. **Update `renderRecommendations()` in `able-v7.html`:**
   - Read `profile.recommendations.pool`
   - Slice to `visibleCount` (default 4)
   - Apply campaign-state heading logic
   - Render artist-type items (artwork card) and professional-type items (role chip card) differently
   - Apply ✓ mark for confirmedCredit items
   - Apply 70% opacity / no-link for handle-null items

3. **Update admin.html — recommendations management:**
   - New section under Profile tab
   - Add/remove/reorder pool items
   - Toggle type (artist / professional)
   - visibleCount control
   - Custom heading per campaign state
   - "In view" indicator per item

**V1.5 (next phase, requires above to be solid):**

4. `pinnedFor` field + campaign-state visibility logic
5. `freelancer-start.html` claim wizard
6. `netlify/functions/enquiry-relay.js`
7. Professional rendering mode in `able-v7.html`
8. External URLs for artist-type items

---

## 16. File Updates Required

| File | What changes | Why |
|---|---|---|
| `able-v7.html` | `renderRecommendations()` — two item types, campaign heading, visibleCount, pool model | Core profile rendering |
| `admin.html` | Recommendations management section — pool CRUD, type toggle, visibleCount, headings | Artist manages their world |
| `docs/pages/profile/DESIGN-SPEC.md` | Replace §6.12 with this doctrine's spec | Keep spec authoritative |
| `docs/systems/freelancer-auth/ARTIST-PROFILE-RECOMMENDATIONS-DOCTRINE.md` | This file | New canonical authority |
| `docs/systems/freelancer-auth/PRODUCT-DOCTRINE.md` | Add note: artist profile doctrine supersedes where they conflict | Prevent spec confusion |
| `CLAUDE.md` | Update doc files table to include this doctrine | Claude needs to check it |

---

## 17. Final Verdict

**Yes. Start building now. First chunk: data model migration + renderRecommendations() update.**

The artist profile is the right centre of gravity. The recommendations section already exists (HTML, CSS, basic render function). The gap is the data model (no type distinction, no visibleCount, no pool structure) and the rendering (one type only, no campaign-state headings, no professional card treatment).

That gap is closeable in one session.

**First chunk:**
1. Extend the data model in `able-v7.html` (pool structure with type/role/confirmedCredit fields, backwards-compatible migration shim)
2. Update `renderRecommendations()` to handle two card types and campaign-state headings
3. Update `admin.html` recommendations management to match the new model

This is entirely localStorage, no backend, and immediately makes the artist profile's recommendations section into something that can hold both artists and professionals, display the asymmetry correctly, and change its heading with the campaign state.

The result is a section that an artist can fill with real people today — producers, engineers, artists they rate — and which will deepen automatically as those people join ABLE. Every item added now is an investment in the network. The links will come when the people do.

**Governing principle for everything that follows:**
> ABLE should not ask artists to publish a definitive ranking of their world.
> It should let them surface the right people at the right time.
