# Artist Profile — Strategy Review Final
**File: `able-v7.html` | Created: 2026-03-15**
**Synthesising: SPEC + 20-ANGLE-ANALYSIS + USER-JOURNEYS + COPY + PATH-TO-10**

---

## THE VERDICT

`able-v7.html` is ABLE's best work and its most important gap in the same page.

**Best work:** With good data and customisation, it is genuinely the most distinctive link-in-bio experience in the market. The vibe × feel × theme × accent system creates real artist identity. The campaign state machine is unique — no competitor has it. The micro-interaction system is refined. The conduit principle is architecturally sound.

**Biggest gap:** Without data, it collapses to 3/10. The empty state looks like an abandoned template. The fan activation chain is broken (no confirmation email means no real relationship). The copy defaults are generic. An artist who finishes onboarding and arrives on their page can feel let down.

The distance between 3/10 and 8/10 is closed by a single product decision: Spotify auto-import. One URL paste → profile 70% populated in 10 seconds. This eliminates the empty state problem entirely and transforms the artist's first impression of their own page.

---

## THE THREE STRUCTURAL GAPS

### 1. Empty state (3/10 → 9/10 after Spotify import)

The empty state is not a design problem. It is an onboarding problem. The profile page looks empty because onboarding doesn't pre-populate it.

The Spotify import flow (already specced in V8_BUILD_AUTHORITY.md §2.2) closes this gap. Until it's built:
- Hide empty sections entirely from fan view (no placeholder text)
- Show edit prompts in owner mode only
- Fix: "Artist Name" default placeholder — show nothing if name not set

**Priority: Phase 1. Most impactful single change.**

### 2. Fan activation chain (7/10 UI → broken in practice)

The fan sign-up UI is good. The optimistic UI (confetti, toast) is ceremonial. But without a Supabase write and Resend confirmation email, the fan's email is a localStorage entry that disappears when they clear their cache.

The chain must be: fan submits → localStorage write (immediate) → Supabase write → Resend confirmation email in artist's voice → fan confirms → double_opted_in: true → artist owns this email.

Until this chain is wired, the fan sign-up module is a beautiful placeholder, not a functional feature.

**Priority: Phase 1. Must ship before ABLE can claim to solve the "artist owns the fan relationship" problem.**

### 3. Copy voice (6/10 → 9/10 with copy changes only)

This is the cheapest fix with the highest strategic leverage. The copy defaults are what most artists will never change. They set their name, their bio, and ship. Everything else defaults.

Current defaults: "Music" / "Events" / "Subscribe" / "Sign up" / "Your email address"
Target defaults: "My music" / "Shows" / "Stay close." / "I'm in" / "Your email"

This is a copy change, not a code change. It costs a few hours and moves the conduit principle from aspiration to reality.

**Priority: Phase 1. No build required, just copy replacement.**

---

## THE CONDUIT PRINCIPLE IN PRACTICE

The conduit principle ("ABLE is the door, not the room") is the philosophical foundation of the product. It manifests on this page in a specific, testable way:

**Test:** If you removed the "Made with ABLE" footer, would a new fan know they're on a platform? Would the page feel generic?

**Current answer:** With good data — almost no. With empty state — yes, clearly.

To fully honour the conduit principle:
1. Spotify import fills the room before the fan arrives
2. Every default copy is in the artist's voice, not the platform's
3. The fan sign-up confirmation says "You're in. I'll keep you close." — not "Registration successful."
4. The tonight note in gig mode is the artist's voice, not a CTA factory
5. ABLE's branding is visible exactly once: in the footer, small, at the bottom

---

## THE CAMPAIGN STATE MACHINE IS THE MOAT

Every other link-in-bio platform (Linktree, Beacons, Stan.store, Fanlink) has static pages. The same page shows on tour day as on release day as on a quiet Sunday.

ABLE's campaign state machine transforms the entire visual hierarchy based on what the artist is doing right now. The moat is not just the state machine itself — it is the combination of:
- The identity system (the page already feels like the artist's world)
- The state machine (that world shifts based on the campaign moment)
- The conduit principle (both are in service of the fan-artist relationship, not the platform)

No competitor can quickly copy this because it requires all three layers to work together.

---

## WHAT SUCCESS LOOKS LIKE FOR A NEW ARTIST

1. Artist pastes Spotify URL in onboarding
2. Profile is 70% populated in 10 seconds
3. They pick a vibe, accent colour, theme
4. They land on their profile: it looks like their world, not a template
5. They put the link in their Instagram bio
6. A fan taps the link
7. The fan sees the artist's world
8. The fan signs up with their email
9. A confirmation email arrives from the artist within 2 minutes
10. The fan confirms
11. The artist has their first real fan relationship — email owned, not rented

Steps 1–5 and 9–11 require changes that don't exist yet. Steps 6–8 work now.

---

## SCORING CONTEXT

**Why 3/10 for empty state despite great architecture:**
The empty state is what most new artists see. If ABLE's first impression for artists is a blank template, it doesn't matter how good the full experience is. The score reflects reality.

**Why the overall average (6.9/10) is below the "8/10 with data" V8 claim:**
The 20-angle analysis includes angles that degrade significantly without data (empty state, copy voice, fan activation). The V8 claim of 8/10 is for the full-data experience. Both are true.

**Why big picture scores 7/10 despite the page being "genuinely beautiful":**
Because beautiful + broken is still not 10/10. The page is beautiful with data and broken without. The score is an average of both states. After empty state fix and copy defaults fix, big picture should reach 9.5/10.

---

## THE PATH FROM HERE

### Phase 1 (must ship for V8)
- Spotify auto-import in onboarding
- Fan sign-up → Supabase → Resend
- Copy voice defaults (copy change, no build)
- Tonight note field in gig mode
- Trust line near fan sign-up
- OG/meta description fix
- FOUI fix (inline identity CSS in head)

### Phase 1.5 (polish pass)
- Gig mode post-show state
- Pre-release: release note + final-day intensity
- Skip nav + ARIA landmarks accessibility pass
- View-transition: artist-name wiring verification

### Phase 2
- Edit mode rebuild (all 6 zones from profile page)
- Vibe-specific interaction personality tuning
- Close Circle payment wiring (Stripe)

---

## FINAL STATEMENT

The artist profile page (`able-v7.html`) is 80% of what it needs to be to be the best product in its category. The 20% gap is mostly in the fan activation chain and the empty state — both of which are solved by decisions already made in V8_BUILD_AUTHORITY.md.

The architecture is sound. The design system is distinctive. The conduit principle is operational in the full-data experience.

Build the Spotify import. Wire the confirmation email. Fix the copy defaults. The page goes from 6.9/10 to 9.2/10 with those three changes. Everything else is refinement from 9.2 to 9.7+.
