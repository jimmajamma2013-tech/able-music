# ABLE — Explainer System: Current State Analysis
**Date: 2026-03-16 | Status: ACTIVE**

> "Explainers" are every piece of in-product text, tooltip, orientation card, and contextual hint that helps an artist understand what ABLE is doing and what to do next — without needing to ask anyone. This analysis scores every surface where explainers exist (or should exist) against the standard: a 22-year-old indie artist, no Linktree experience, sets up their page in 5 minutes and shares it without asking for help.

---

## The Gap

ABLE currently has no systematic explainer approach. Copy and guidance has been specced screen by screen, but no document defines the *system* — what types of explanation exist, where they live, what they say, and how they behave. This means:

- Some screens have excellent contextual guidance; others have none.
- Tooltip-worthy concepts exist throughout admin.html with no tooltips.
- New features (Close Circle, Broadcasts, Gig Mode) are introduced with no orientation.
- The import flow has a fully specced technical backend but was missing UI copy until §7 was added to the Spotify import spec (done in this session).

The result: artists who are confident in their music but unfamiliar with product concepts (campaign states, gig mode, page states) encounter real friction with no resolution path.

---

## Surface-by-Surface Scoring

### 1. start.html wizard guidance — 6/10

**What exists:**
- Step counters ("Step N of 7") correctly set expectations
- Screen headings are question-form and direct ("What do you go by?", "How should your page feel?")
- Most screens have a sub-headline that gives permission ("You can change everything later.")
- Import detection states have correct copy (COPY.md, approved and locked)
- Error states have fallback paths (no dead ends)

**What's missing:**
- No `ⓘ` tooltip on "Accent colour" — artists may not immediately understand that one colour variable controls the whole page
- No `ⓘ` tooltip on "Page state / current moment" screen — "gig mode" and "pre-release mode" are ABLE-specific concepts that need a one-line explanation the first time an artist encounters them
- Screen 3 (Accent) contextual copy exists ("This is the colour your fans will tap…") but is easily missed — no visual callout
- Screen 7 (Current Moment) sub-inputs (date picker, venue, time) are well-specced but the page-state concept itself has no brief orientation before the four choices appear
- "Something else — I'll set it myself" on Screen 2 has no guidance on what happens next; an artist who selects it should see a brief reassurance that they can fine-tune in their dashboard

**Score rationale:** The fundamental flow is clear and well-copywritten. The gaps are at concept-introduction moments — points where an artist encounters an ABLE-specific idea for the first time.

---

### 2. admin.html section explainers — 4/10

**What exists:**
- Empty states in key sections (fan list, shows, snap cards) do exist and follow the "No X yet. Add one." pattern
- Campaign HQ section has page state labels and a toggle for gig mode
- Stats section shows correct terminology ("People who came to your page")

**What's missing:**
- No `ⓘ` tooltips anywhere in the current admin.html build
- Close Circle / Supporter section has no orientation — artists landing on this for the first time have no idea what it means, what ABLE takes, or who it's for
- Broadcasts section has no orientation — distinction between email broadcast and fan capture sign-up is not made clear
- Gig mode toggle has no explanation of the 24-hour auto-reset
- Page state system (Campaign HQ) is shown but not explained — an artist who hasn't gone through the onboarding wizard with "Something's coming" selected will not understand why there are four states or when to use them
- "Connections" section is unexplained — the peer-verify concept for credits is entirely invisible in the current admin
- Snap cards: the distinction between a snap card and a platform link is not explained on first encounter
- Tier lock overlays exist in spec but the "what you get" value proposition in each lock is inconsistently written

**Score rationale:** The dashboard is built for artists who have completed the onboarding and have context. For any other artist — someone who jumps straight to admin.html, or who explores sections they haven't used before — orientation is nearly absent.

---

### 3. able-v7.html owner onboarding hints — 5/10

**What exists:**
- Edit bar at the top of the page (owner-view only) signals that the page is editable
- Edit mode pill / floating action button from the v2 edit mode spec is partially built

**What's missing:**
- No contextual tips in the edit bar about what can be changed and what requires the dashboard
- No indication to a new artist that the page state (what fans see) is controlled from admin.html, not from this page directly
- No "first visit" orientation card that briefly explains the page they're looking at
- Platform pills in edit mode have no tooltip explaining the global dedupe rule
- The live preview of different campaign states is not accessible from the artist's view of their own page

**Score rationale:** The edit experience is functional but sparse. An artist's first impression of their own live page needs a moment of orientation — not an instruction manual, just a brief signal that they're in the right place and that the dashboard is where they manage things.

---

### 4. Import flow guidance — 7/10

**What existed before this session:** 9.0/10 technical spec with no UI copy defined.

**What exists after this session:**
- §7 added to `docs/systems/spotify-import/SPEC.md` — every import state now has exact copy
- All error states have specific headings and sub-copy (not generic errors)
- "What gets imported / what we don't import" explainer defined for transparency
- Partial match state and wrong-URL inline validation both specced

**Remaining gaps:**
- The "what gets imported" explainer is specced in the doc but not yet assigned a specific UI component (tooltip, collapsible panel, or inline list) — this needs to be resolved in the build spec
- The help text for artists not on Spotify ("Not on Spotify? Skip this") is present but doesn't proactively explain that the wizard works equally well without a Spotify link — it reads as slightly apologetic rather than confident

**Score rationale:** The copy is now fully defined. The remaining question is implementation — how the "what gets imported" explainer surfaces in the actual UI.

---

### 5. Tier gate explainers — 7/10

**What exists:**
- Tier gate spec defines the lock pattern (blurred preview + overlay)
- Lock overlays are specced to include specific value propositions, not just "Upgrade"
- Gold lock pattern is defined with the instruction: "Always say what they get"

**What's missing:**
- Copy for each individual lock overlay is not written out in full — the spec says "specific value proposition" but doesn't give the actual text for each gated feature
- No proactive tier education — artists on Free may not understand what's locked until they encounter a gate; there's no dashboard summary of what their current tier includes
- The transition from "gate encountered" to "pricing page" is not specced — artists should land on a pricing comparison, not a generic paywall

**Score rationale:** The philosophy is right and the pattern is spec'd. The missing piece is the actual copy for each gate, written out in full before implementation.

---

### 6. Error message clarity — 7/10

**What exists:**
- Error state spec exists (`docs/systems/error-states/SPEC.md` — in progress)
- Copy philosophy is clear: human language, always a path forward
- Import error states are now fully specced (§7 of spotify-import/SPEC.md)
- Network error fallbacks in the wizard are defined in COPY.md

**What's missing:**
- The error state spec is listed as "in progress" — it may not cover admin.html errors (save failures, API failures, Supabase errors)
- Validation errors in admin.html edit flows are not systematically specced
- Empty state messages exist but are inconsistently specific — some are excellent ("No shows listed yet. Add one and ABLE will surface it to fans automatically."), others are generic

**Score rationale:** The approach is right and most user-visible errors are handled. The gap is systematic coverage of admin.html validation states.

---

## Overall Score: 5.5/10

The product has the *intent* of good explainer design throughout — the copy philosophy is strong, the voice is consistent, and the worst offences of SaaS over-explanation are avoided. The gap is systemic: no document defines the explainer system as a whole, so surfaces get specced piecemeal and guidance is inconsistently applied.

The highest-impact gaps, in priority order:

1. **Admin.html has no tooltips** — the most-used surface post-onboarding has no contextual help on any concept-heavy element
2. **Section orientation is absent** — Close Circle, Broadcasts, and Gig Mode are complex enough that first-encounter orientation is essential
3. **The import flow UX copy was unspecced** — now fixed (§7 of spotify-import SPEC.md)
4. **Wizard step context is thin on the concept-introduction screens** (Screen 7: Current Moment; Screen 3: Accent) — these are the moments where ABLE-specific ideas are introduced for the first time
5. **Tier gates lack their specific overlay copy** — the pattern is right, the words aren't there yet

The path to 10/10 is in `PATH-TO-10.md`.
