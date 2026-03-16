# Artist Profile — Strategy Review Final
**File: `able-v7.html` | Created: 2026-03-15**
**Synthesising: SPEC + 20-ANGLE-ANALYSIS + USER-JOURNEYS + COPY + PATH-TO-10**

---

## THE STRATEGIC INSIGHT

The artist profile page has one job: disappear.

When it works, the fan feels like they tapped a link and landed directly in the artist's world. ABLE is not there. There is no platform. There is just this person's music, their voice, their invitation to stay close. The page is a window, not a room.

The gap between that ideal and the current state is not architectural. The architecture is largely right. The gap is in defaults, empty states, and edit mode — the three places where the platform's voice bleeds through the artist's page.

This document names the strategic core of that gap, explains why it matters more than any other decision in the current build cycle, and sets the priority stack for closing it.

---

## THE CONDUIT PRINCIPLE AS GOVERNING IDEA

The conduit principle is stated in SPEC.md: "ABLE is the door, not the room."

This is not a tagline. It is the governing constraint for every decision on this page. It means:

- The page speaks in the artist's voice, not ABLE's
- The platform's branding is invisible in the hero and body
- The confirmation email sounds like the artist wrote it
- Section headers say "My music", not "Music"
- The trust copy near the sign-up names the artist, not the platform
- "Made with ABLE" appears once, small, at the bottom — never the point

Every deviation from the conduit principle is a brand leak. Brand leaks are not aesthetic failures. They are trust failures. The fan who arrives expecting an artist's world and finds a platform template will leave. The artist who publishes their page and sees a generic form-output will feel embarrassed by it.

The conduit principle is what separates ABLE from every link-in-bio competitor. Linktree, Beacons, Koji, and Koji's successors all optimise for platform visibility. ABLE optimises for its own invisibility. This is the right bet. The artist's world converting fans is more valuable than ABLE's brand converting artists — because artists go where the fans are.

---

## THE THREE GAPS THAT ACTUALLY MATTER

After reviewing all 20 angles, the distance from 6.9 to 10 is not evenly distributed. Three gaps account for the majority of the distance.

### Gap 1 — Empty State (3/10 — the highest single-issue risk in the product)

The empty state is the first impression for every artist who completes onboarding. It is also the first impression for every fan of that artist who taps the bio link before the artist has finished setting up their page.

At 3/10, this is not a polish gap. It is a trust destroyer.

The current state: "No releases added yet." "No shows added yet." "Artist Name" in the hero. These are not placeholder strings. They are evidence that the artist is using a template, and that the template is unfinished. A fan who lands here leaves. An artist who sees this gets anxious.

The fix at P0 is not to add better placeholder copy — it is to hide empty sections entirely. A page with three complete sections is better than a page with six half-empty ones. The principle is clarity through subtraction: show only what exists; let silence do the rest.

The deeper fix — the one that scores 9.5 — is Spotify auto-import: the artist pastes one URL, the page is 70% populated in ten seconds. That is a Phase 2 infrastructure item. Until it ships, the empty state is managed by disciplined silence rather than by filling gaps with copy the artist didn't write.

### Gap 2 — Edit Mode (5/10 — the #1 friction point for artists post-setup)

An artist finishes onboarding. They land on their page. They want to change a CTA. They tap the page. A dashed ring appears around the hero. Good. They tap the events section. Nothing happens. They try to add a show. They're redirected to admin. Their edit mode context is gone.

This is a broken journey. The artist is on their own page — the most natural place to edit it — and half the page is not editable from it. The floating pill exists. The concept is right. The zone coverage is not.

The P0 fix specifies all 6 zones editable from the profile page itself, with auto-save and no navigation away. Shows, releases, snap cards, CTAs, fan capture copy — all editable in context. The admin remains the backstage (analytics, fan list, campaign management), but the profile page content is editable from the profile page.

This matters strategically because edit mode is the most frequent artist interaction with the product after initial setup. If it is frustrating, the artist stops updating their page. If the page stops updating, it stops converting fans. The gig mode feature, the snap cards, the upcoming release — all of these require the artist to keep editing. Edit mode friction is indirect churn.

### Gap 3 — Copy Voice (6/10 — the #1 brand leak)

The copy defaults are the most pervasive gap. Every section header, every CTA default, every placeholder is an opportunity for the artist's voice — and most of them currently express the platform's voice instead.

"Music" as a section header is neutral. It is not wrong. But "My music" is what the artist would write. "Events" is a CMS label. "Shows" is what a person says. "Sign up" is a platform instruction. "I'm in" is a fan's natural response.

These are not cosmetic changes. They define whether the fan feels like they're signing up for a newsletter (low conversion, high unsubscribe) or making a commitment to an artist they care about (high conversion, high retention). The language sets the emotional register before the fan has consciously evaluated it.

The P0 fix is a complete audit and replacement of all default strings. Every default must be written as if the artist wrote it. Where first person is natural, use first person. Where a section header is platform language, replace it with natural language.

---

## SCORE TRAJECTORY AND BUILD PRIORITY STACK

**Current: 6.9/10**

The three gaps above account for roughly 1.5 points of the 3.1-point gap to 10. The remaining 1.6 points are distributed across the other 17 angles, with accessibility (6/10), gig mode (6/10), and trust copy (6/10) as the secondary priorities.

**Priority stack:**

1. Empty state silence (P0) — highest fan trust impact, minimum build effort
2. Copy defaults (P0) — pervasive, fast to fix, highest brand coherence impact
3. Trust copy near sign-up (P0) — single line addition, outsized conversion impact
4. Edit mode zone coverage (P0) — highest artist experience impact
5. Accessibility: skip nav + reduced-motion coverage (P0) — product integrity
6. Gig mode: tonight note + post-show state (P1) — human voice in the highest-stakes moment
7. Pre-release: release note + final 24h shift (P1) — register change when tension is highest
8. Hero CTA state × vibe matrix (P1) — defaults that serve the state, not just the feature
9. Cross-page view transitions (P1) — the moment the artist name flies from Done screen to profile
10. Font loading per-vibe (P2) — performance, invisible to user but measurable

**Build order observation:** P0 items 1, 2, 3 are all copy and logic changes. They require no new components. Items 4 and 5 require new CSS patterns and edit-zone wiring. The fastest path to 8.5 is to ship items 1–3 in a single commit, then address 4–5 in the following commit.

---

## WHAT WOULD MAKE IT A 10

A theoretical 10/10 requires three things that are not on the current build path:

1. **Supabase backend live** — the confirmation email is the single most impactful missing piece in the fan activation chain. A fan who signs up and gets no email has not started a relationship. They have stored a local entry. The relationship starts when the email arrives and the fan confirms. Every fan currently stored in `able_fans` is unconfirmed. A 10/10 profile needs the backend to close the loop.

2. **Spotify auto-import** — the empty state scores 3/10. The only structural solution is pre-populating the page before the artist has to fill it manually. One URL paste → profile 70% complete → no empty sections → no template feel → no fan embarrassment on the first day. Until this is built, empty state will remain a ceiling for new artist onboarding quality.

3. **`@view-transition` cross-browser coverage** — the moment the artist name flies from the onboarding Done screen to the profile hero is the moment the product feels like a premium product. It currently fires in Chrome 126+ only. Firefox and Safari navigate normally. A JavaScript polyfill using `startViewTransition` with a CSS fallback would extend this to ~95% of mobile browsers. The implementation cost is moderate. The impact on the onboarding climax moment is significant.

Without these three items, the profile page has a hard ceiling of approximately 9.7/10. That is the V1 target and it is the right target. Chasing the final 0.3 before the infrastructure exists would be premature optimisation.

---

## V8 CROSS-CHECK: ALIGNMENT WITH CLAUDE.MD AND DESIGN SYSTEM

The recommendations in this document align with the project rules:

**Mobile-first:** Every P0 fix is specified for 375px screens first. The skip nav, the dashed rings in edit mode, the trust copy sizing — all specified at mobile scale.

**Token-only CSS:** All CSS in PATH-TO-10.md uses design system tokens (`--color-accent-rgb`, `--text-xs`, `--sp-2`, `--r-md`). No inline styles except where JS requires dynamic values.

**4 themes verified:** The Glass theme fallback (P2-2) and Light theme contrast fixes (P0-5) are explicit theme-specific patches. No theme is left as an assumption.

**Copy philosophy:** Every string replacement in P0-3 and P0-4 follows the copy laws in COPY.md. No exclamation marks. No "subscribe". No platform voice in artist-facing strings. First-person where natural.

**No redesign:** None of the P0 items redesign existing components. They fix content in existing structures, add a single CSS rule for skip nav, and adjust existing defaults. The architecture does not change. The conduit principle is better served by the existing architecture than it was when it was built — the work is in the defaults, not the components.

**CLAUDE.md working rule 3 — parse check after every JS block:** The JavaScript specs in PATH-TO-10.md are spec pseudocode, not implementation code. The implementation engineer must parse-check the actual code after every edit using the `node -e "new Function(src)"` pattern from CLAUDE.md rule 1.

---

## SINGLE SENTENCE SUMMARY

The artist profile is architecturally sound and strategically distinctive — the conduit principle, the identity system, and the campaign state machine are all right. The gap to 10 is entirely in the defaults, the empty state, and edit mode coverage, and every one of these is a fixable output of prioritised build work, not a structural redesign.
