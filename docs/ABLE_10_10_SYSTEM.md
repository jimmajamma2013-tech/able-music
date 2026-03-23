# ABLE — 10/10 Product System
**Version: 2026-03-22. Changes require explicit justification — see §12.**

---

## 1. PRODUCT DEFINITION

**What ABLE is:**
A conversion-first artist profile. One link. One page. One job.

**Who it is for:**
- **Artists** — independent musicians who want direct fan relationships without an algorithm in the way.
- **Fans** — people who want to stay close to artists they actually care about.
- **Freelancers** (Phase 2+) — producers, mixers, videographers discoverable via credits.

**The core job:**
Turn a stranger arriving from social media into a fan with a direct relationship to the artist — email captured, release saved, ticket bought, or stream started. Everything on the page exists to serve this job. Nothing else is justified.

**What success looks like:**
A fan lands, understands who the artist is in 3 seconds, does one meaningful thing, and leaves knowing they're connected. An artist opens their dashboard and sees exactly who showed up and what they did.

**What ABLE is NOT:**
Not a social network. Not a streaming platform. Not a marketing tool. Not a content feed.

---

## 2. WHAT 10/10 MEANS FOR ABLE

**Functional standard:**
- Every feature either works completely or does not appear.
- Every state (profile, pre-release, live, gig) produces a materially different, correctly prioritised page.
- Every user journey has a destination — no dead ends.
- Fan capture, CTA, and section order are always appropriate for the active campaign state.
- Zero placeholder labels, zero broken flows, zero stale signals from other states.

**Emotional standard:**
- A fan lands and feels like they are in the right place for this artist — not on a template.
- An artist opens their dashboard and feels like this product was made for them specifically.
- The primary action is obvious without reading anything.
- The post-conversion moment feels like something happened — not like hitting a wall.

---

## 3. SCORING FRAMEWORK

### Dimension 1 — First impression / hero
| Score | Standard |
|---|---|
| 10 | Artist identity is clear in <3 seconds. State is unambiguous. Primary action is visible without scrolling. |
| 7 | Clear identity. State readable. CTA present but not commanding. |
| 3 | Generic layout. State unclear. No dominant action. |

### Dimension 2 — Typography
| Score | Standard |
|---|---|
| 10 | Every size, weight, and spacing decision is intentional. Hierarchy is unambiguous. |
| 7 | Strong pairing. Some inconsistency in weight or size across sections. |
| 3 | Inconsistent sizing. Multiple elements at equal visual weight. |

### Dimension 3 — Visual hierarchy
| Score | Standard |
|---|---|
| 10 | One dominant element per viewport. The eye has a clear path. Nothing competes equally. |
| 7 | Hero is clear. Below fold: sections at similar weight, no clear progression. |
| 3 | Every section the same visual weight. No path. |

### Dimension 4 — Information architecture
| Score | Standard |
|---|---|
| 10 | Section order matches the active campaign state. Every section appears because a user needs it, in the order they need it. |
| 7 | Default order is logical. State changes affect CTAs but not section order. |
| 3 | Fixed section order regardless of state. Sections appear because they were built, not because they're needed. |

### Dimension 5 — Mobile UX
| Score | Standard |
|---|---|
| 10 | One-thumb everything. No accidental taps. Tap targets ≥44px. Feels native. |
| 7 | Targets correct. Occasional layout issue. Doesn't feel designed for thumb. |
| 3 | Cut-off elements. Tap targets too small. Horizontal scroll. |

### Dimension 6 — Brand consistency
| Score | Standard |
|---|---|
| 10 | Any surface is identifiable as ABLE. Token, type voice, and interaction quality are consistent at each surface's purpose level. |
| 7 | Strong on primary surfaces. Secondary surfaces feel adjacent but not fully coherent. |
| 3 | Different surfaces feel like different products. |

### Dimension 7 — Interaction design
| Score | Standard |
|---|---|
| 10 | Every state handled (loading, empty, error, success). Transitions are intentional. |
| 7 | Happy path polished. Empty states present but uneven. Error states generic. |
| 3 | Missing states. No feedback on interactions. |

### Dimension 8 — Completeness / finish
| Score | Standard |
|---|---|
| 10 | No placeholder copy. No dead-end flows. Every feature either complete or invisible. Every label is real. |
| 7 | Core features complete. Secondary features have empty states. A few rough edges. |
| 3 | Placeholder labels visible. Dead-end flows. Features in the DOM that don't work. |

### Dimension 9 — Performance perception
| Score | Standard |
|---|---|
| 10 | CLS <0.1. LCP <2.5s. No FOUT. Hero painted before user can scroll. |
| 7 | Fast. Occasional CLS on font load or image swap. |
| 3 | Layout shift visible. Images pop in. Feels slow. |

### Dimension 10 — Conversion design
| Score | Standard |
|---|---|
| 10 | One dominant action per state. CTAs speak outcome not mechanism. No confusion about what to do. |
| 7 | Primary CTA present. Secondary clutters. Post-submit is functional but not memorable. |
| 3 | Multiple competing CTAs. Submit goes nowhere meaningful. |

### Dimension 11 — Copy quality
| Score | Standard |
|---|---|
| 10 | Every word earns its place. Artist voice on profile. No generic SaaS microcopy. Banned phrases absent. |
| 7 | Most copy is clean. A few generic labels. Tone is mostly right. |
| 3 | Generic SaaS copy throughout. Exclamation marks on dashboard. |

### Dimension 12 — State fidelity
| Score | Standard |
|---|---|
| 10 | Profile / pre-release / live / gig each produce a materially different page. No state signals from other states leak through. |
| 7 | State chip and CTA change per state. Section order does not meaningfully change. |
| 3 | Only the chip changes. Page feels identical across states. |

---

## 4. TOP FAILURE MODES

1. **Placeholder copy in production** — "Stuff", "Worth knowing", "Get Tickets" as static defaults. Credibility killers visible to every user.
2. **Dead-end flows** — fan submits email, nothing happens. Artist completes onboarding, no destination.
3. **State bleed** — pre-release countdown visible in live mode. Gig signals in profile mode.
4. **Empty sections with no invitation** — sections that show nothing and say nothing are worse than not existing.
5. **Campaign state not changing the page** — if profile / pre-release / live / gig look the same, the state system doesn't exist to the user.
6. **Hierarchy collapse below the fold** — hero is strong, everything below is equal weight.
7. **SaaS tone** — "Turn fans into superfans." "Grow your audience." Signals inauthenticity immediately.
8. **Gig treated as a peer of campaign states** — gig is an overlay. Implying parity creates the wrong mental model.
9. **Accidental surface divergence** — token or font differences between surfaces that weren't decided, just happened.
10. **CTAs with no destination** — "Follow" with no explanation. "Stay close" with no payoff.

---

## 5. PHASE SYSTEM

### Phase 1 — Finish what exists
**Objective:** Every feature that exists works completely or is invisible. No placeholders. No dead ends. No broken flows.

**Allowed:**
- Fix placeholder labels
- Complete missing empty states
- Wire up flows that end prematurely
- Fix state-specific display bugs
- Remove features that cannot be completed this phase

**Not allowed:**
- New features
- Redesign of any existing component
- Backend wiring (Supabase) unless it directly fixes a broken flow
- Scope expansion of any kind

**Success criteria:**
- Zero placeholder labels visible in any state on any surface (verified in DOM)
- Every user journey reaches a rendered destination — no blank screens, no broken routes
- Campaign HQ state selector writes `stateOverride` to storage and the profile page reflects the change
- Fan email submit: form hides, confirmation element becomes visible (verified by DOM check)
- All four campaign states produce distinct `data-campaign-state` values and visibly different hero content

---

> **Terminology note:** "Phase" in this document refers to **Quality Phases** in the 10/10 improvement cycle (Phase 1 = Foundation, Phase 2 = Structure, etc.). This is distinct from the product **Roadmap Phases** in `docs/STATUS.md` (Phase 1 = pre-launch, Phase 2 = post-launch backend). When referencing these phases in conversation or other docs, use the qualified forms: **Quality Phase 2** and **Roadmap Phase 2**.

### Phase 2 — Structure and hierarchy
**Objective:** Below-the-fold hierarchy supports the hero. Section order reflects campaign state. Visual weight differentiates primary from secondary sections.

**Allowed:**
- Section weight adjustment (sizing, spacing)
- State-aware section reordering verification and fixes
- Fan capture elevation in profile mode
- Removal of sections that add no value in any state

**Not allowed:**
- New sections or features
- Typography overhaul
- Token changes (Phase 3)
- Admin changes unless they have a structural hierarchy problem within this objective's scope

**Success criteria:**
- Fan capture section is visually above all other below-fold sections in profile mode
- Section order changes are verifiable between pre-release, live, and gig states
- No two adjacent sections share identical visual weight

**✅ COMPLETE — 2026-03-22**
All three criteria passed:
1. Fan capture elevated in profile mode — visually above all other below-fold sections.
2. No adjacent sections at equal visual weight in profile mode — three-tier system (primary 35.1px/w700/accent border → secondary 17px/w500/4.3% white border → tertiary 15px/w500/2.4% white border) applied via `[data-campaign-state="profile"]` CSS.
3. Cross-state section order verified by Playwright (computed + rendered DOM match):
   - Pre-release: world-map → listen → shows (world-map promoted; listen demoted)
   - Live: listen → shows → merch → world-map (merch promoted to position 3)
   - Gig: shows → listen → world-map (shows/listen swap; tickets-first)
   All three are structurally distinct from profile order in their top 2 visible sections.

Quality Phases 3, 4, and 5 are complete.

---

### Phase 3 — Brand and consistency
**Objective:** Any surface is identifiable as ABLE. Token differences between surfaces are justified, not accidental. Typography voice is consistent. All surfaces feel like the same product at their respective quality level.

**✅ COMPLETE — 2026-03-22**
All four success criteria passed. Key items resolved:
1. **landing.html Artist World register** — retired blue-steel palette (#0f1624 system) across all tokens, borders, text, and gradients. Midnight Navy doctrine applied. Accent confirmed as terracotta #d4704e.
2. **start.html Artist World register** — same correction applied. Blue accent (#8ab4ce) replaced with terracotta. All 13 inline hardcoded blue values updated. Start and landing now share one coherent arrival world.
3. **Atmospheric gradient drift** — hero::before and footer-cta::before blue-purple stops cleaned across landing. Zero cool-register stops remain.
4. **Barlow Condensed italic loading** — Google Fonts request updated to load true italic cuts at 700/900 (was upright-only; browser was synthesising oblique for all italic editorial text).
5. **Quote weight doctrine violations** — .quote__mark and .quote__text declared weights 300/400 despite only 700 being loaded. CSS corrected to 700 to match rendered output. Dead font-variation-settings (opsz on non-variable font) removed.

Surface background doctrine written to `docs/systems/brand-identity/DOCTRINE.md` — two surface categories (Artist World / Tool World), retired value (#0f1624) documented.

**Remaining housekeeping items (not QP3 blockers):**
- --wisp-gold token name (now terracotta-tinted — semantic mismatch, no rendering impact)
- opsz settings on other Barlow elements (dead, no rendering impact)
- --font-editorial / --font-d naming duplication (cosmetic)

**Allowed:**
- Token audit and unification within each surface
- Typography weight/size audit
- Admin theme alignment to shared design language
- Copy voice audit (banned phrases check)

**Not allowed:**
- Visual redesign of any surface
- New components
- Feature work
- Applying artist page layout patterns to other surfaces

**Success criteria:**
- Each surface has one resolved background token; any difference from other surfaces is documented
- Font choice per surface is resolved (DM Sans vs Plus Jakarta Sans decision closed)
- All section headings pass the banned-phrases check across all surfaces
- All surfaces share design language (ABLE-identifiable) without sharing layout

---

### Phase 4 — Conversion and UX polish
**Objective:** Key moments feel intentional. Fan post-submit is distinct from a generic form response. CTA copy speaks outcome.

**✅ COMPLETE — 2026-03-23**
All three success criteria passed. Key items resolved:
1. **Fan echo hierarchy corrected** — `.fan-capture__echo-confirm` ("You're in. I'll keep you close.") was styled as a footnote (text-xs, dimmed). Now primary: text-base, weight 600, full colour, flex-ordered first. Contextual line demoted to secondary. CSS-only change.
2. **Gig-state CTA corrected** — "Let me know" → "Keep me posted". Directional fix: fan-facing, pairs with "I'm playing tonight." and trust line "Show news only."
3. **Gig-post CTA corrected** — "Let me know" → "I'll be there". Forward-looking, pairs with "Were you there tonight?" and "Next show. Nothing else." "Let me know" is now gone from all states.
4. **Close circle opt-in visual treatment** — moved from naked inline-styled checkbox at 65% opacity to CSS class `fan-capture__cc-opt` with border-top separator, sp-4 padding, and 82% opacity. Reads as a deliberate secondary ask.
5. **Gig-post secondary heading** — was absent, falling through to generic "Want to stay in the loop?" Added "Don't miss the next one." — all active states now have specific secondary headings.

**Minor polish item (not a QP4 blocker, carried forward):**
- Profile secondary heading "Want to hear when something drops?" — question form is softer than the rest of the set but not broken. No misleading or generic fallback.

**Allowed:**
- Post-submit state redesign (fan capture)
- CTA copy improvement per state
- Micro-interaction polish on conversion moments
- Empty state copy improvement

**Not allowed:**
- Structural changes (Phase 2 work)
- Token changes (Phase 3 work)
- New features

**Success criteria:**
- Fan email submit: confirmation copy is contextual to the active state, not generic ✓
- Every primary CTA label describes what happens next, not the mechanism ✓
- Pre-save confirmation appears within 300ms of submit ✓ (echo-enter: 280ms)

---

### Phase 5 — Performance and final quality
**Objective:** Page feels instant. Accessibility passes. No jank.

**✅ COMPLETE — 2026-03-23**
All font-loading and CLS issues resolved across all active surfaces. Key items:
1. **display=optional applied to landing, start, admin** — all three surfaces were using `display=swap`, causing font-swap layout shift on every load. Switched to `display=optional` (same strategy as able-v8.html). Zero font-swap CLS across all active pages.
2. **start.html font request weight cleanup** — removed DM Sans weight 300 and Barlow Condensed weight 600 (neither referenced in CSS). Request now matches actual usage exactly.
3. **DM Sans italic loaded correctly in start.html** — `.ai-draft--loading` and `.feel-card__eg` both use `font-style: italic` with DM Sans. Browser was synthesising oblique. Added `ital,opsz,wght` axis with `1,9..40,400`. True italic cut now loads.
4. **admin.html Barlow weight cleanup** — removed Barlow Condensed weight 500 (unused). Retained 600 (offline banner inline style), 700 (headings/stats), 900 (tap-count metric).
5. **OG image references verified** — both `/og-default.jpg` (root) and `/assets/og/og-landing.jpg` confirmed present in the repository. All active surface OG tags resolve correctly at deploy time. Not a blocker.

**Remaining housekeeping (not QP5 blockers):**
- `og-landing.png` unused duplicate alongside `og-landing.jpg` in `assets/og/` — can delete anytime
- `freelancer.html` / `freelancer-start.html` use relative `/og-default.jpg` vs absolute URL elsewhere — functionally identical, minor inconsistency
- DM Sans direct woff2 preload not added to landing/start/admin (Google Fonts CDN URLs include hashes — brittle to hardcode; defer to self-hosting phase)

**Allowed:**
- CLS fixes
- LCP optimisation
- Accessibility audit and fix
- Font loading strategy
- Image preloading

**Not allowed:**
- Feature work
- Copy changes
- Structural changes

**Success criteria:**
- CLS <0.1 on all states (Lighthouse mobile)
- LCP <2.5s on all states (Lighthouse mobile)
- Accessibility score >95 (Lighthouse)
- Zero FOUT on hero artist name

---

## 6. EXECUTION RULES

1. **Read before editing.** Never modify code that hasn't been read in the current session.
2. **Smallest correct change.** If the change can be smaller, make it smaller.
3. **One issue per task.** Identify the issue, fix only that issue, stop.
4. **Parse-check every JS edit.** Run `node -e "new Function(src)"` after any script block change.
5. **No scope expansion.** A label fix is not a copy pass. A CTA fix is not a CTA redesign.
6. **No preemptive abstractions.** Don't build utilities for one-time fixes.
7. **No backwards-compat shims.** If something is removed, remove it completely.
8. **Verify before claiming done.** Run the test. See the output. Then state pass or fail.
9. **Stop at the boundary.** Each task has a scope. Reach the boundary and stop.

---

## 7. NON-NEGOTIABLE PRODUCT RULES

**CTA architecture:**
- Hero: max 2 CTAs. Primary = accent fill. Secondary = ghost.
- Quick Action pills: max 4 narrow / 6 wide.
- Section actions: max 2 per section.
- Same URL cannot appear in multiple zones. Hero wins.

**Labels:**
- No placeholder labels in any user-visible element on any surface.
- Every section heading must describe what is in it.
- No generic SaaS copy (full list in docs/systems/copy/SPEC.md).

**Flows:**
- Every journey has a destination.
- Fan submits email → confirmation state visible.
- Artist completes onboarding → routed to their live page.
- No interactive element goes nowhere.

**Mobile:**
- Minimum 44px tap targets on all interactive elements.
- No horizontal scroll at 375px.
- iframes must be contained.
- Test at 375px (iPhone SE) and 390px (iPhone 14) after every HTML change.

**State integrity:**
- No signals from other campaign states leak through.
- Gig is always an overlay, never a peer of profile/pre-release/live.
- Campaign mode and gig are visually and semantically distinct.

**Hierarchy:**
- One dominant element per viewport.
- Section order must reflect the active campaign state.
- Fan capture is above or at first scroll in profile mode.

**Copy voice — phrases that must not appear in production:**
- "Turn fans into superfans"
- "Grow your audience"
- "Monetise your fanbase"
- "Engage your followers"
- "Content creator" (when referring to artists)
- Exclamation marks in dashboard copy
- Generic success copy ("You're all set!", "Get started!")

These are not style preferences. They signal the wrong product to the target user.

---

## 8. SURFACE CONSISTENCY RULE

**The artist page is the quality benchmark — not the template.**

The artist page (able-v8.html) defines what ABLE quality looks and feels like. Every other surface must reach that quality standard. No other surface copies its layout, interaction model, or visual character.

### Surface roles

| Surface | Role | Character |
|---|---|---|
| Artist page | Fan-facing conversion | Expressive, cinematic, emotional. Serves the fan's experience of the artist. |
| Admin dashboard | Artist-facing tool | Fast, clear, utilitarian. Information and control over atmosphere. |
| Onboarding | Artist setup wizard | Guided, frictionless. One decision at a time. |
| Landing page | Marketing / acquisition | Persuasive, proof-driven. Earns trust from a cold visitor. |

### Must be consistent across all surfaces

- **Language clarity** — no placeholder labels, vague headings, or dead states anywhere.
- **Naming** — feature names and state names are identical across surfaces. If the artist page calls it "pre-release", admin does too.
- **Interaction completeness** — every tap has feedback. Every state (loading, empty, error) is handled.
- **Copy register** — no SaaS tone on any surface. Tone adapts by role (warmer on profile, more direct in admin), but banned phrases apply everywhere.

### Intentionally different across surfaces

- **Background tokens** — Artist page: `--color-bg: #0d0e1a`. Admin: `--bg: #09090f`. Onboarding/landing: `--bg: #0f1624`. Each difference is justified by surface role. Undocumented divergence is not acceptable.
- **Typography** — Artist page: DM Sans + Barlow Condensed. Admin: Plus Jakarta Sans + Barlow Condensed. These are separate coherent systems, not inconsistencies.
- **Layout model** — Admin surfaces data tables, charts, and forms. Artist page surfaces media, events, and fan capture. Do not merge them.
- **CTA density** — Artist page: one dominant CTA per state. Admin: multiple controls visible simultaneously. Both correct for their context.

---

## 9. ITERATION LOOP

After every change:

1. **Parse-check** — `node -e "new Function(src)"` on any edited script block.
2. **Playwright screenshot** — 390px viewport, hero clip + full page.
3. **State check** — verify `data-campaign-state` is correct, no signals from other states visible.
4. **Judgment** — is the change visible? Did it fix only what was targeted?
5. **Verdict** — pass / partial / fail with specific evidence.
6. **Stop** — do not begin the next task without a verdict on the current one.

**Pass criteria by task type:**
- Label fix: correct label in DOM; no other labels changed.
- State fix: correct chip, CTA, and section behaviour in target state; other states unaffected.
- Flow fix: journey reaches a rendered destination; adjacent state journeys unaffected.
- Performance fix: Lighthouse metric improved; no regression in other metrics.

---

## 10. DEFINITION OF DONE

### Launch-critical (hard blockers)
- [ ] Zero placeholder labels visible to any user in any state on any surface
- [ ] All four campaign states produce visibly different pages with distinct `data-campaign-state`
- [ ] Fan email submit: form hides, confirmation renders
- [ ] Music, shows, snap cards, clips, merch, and support sections each have a functional empty state or are hidden when empty
- [ ] Campaign HQ state selector writes to storage and profile reflects the change
- [ ] Artist completing onboarding is routed to their live page
- [ ] No duplicate URLs across CTA zones
- [ ] No state bleed across any state transition
- [ ] No banned phrases in any user-visible copy on any surface

### Quality targets (should ship with, but do not block launch if minor)
- [ ] Primary CTA speaks outcome in every state
- [ ] Fan capture is the dominant below-fold element in profile mode
- [ ] All surfaces share design language without sharing layout
- [ ] Each surface has a justified, documented token set
- [ ] CLS <0.1 on mobile Lighthouse for all four states
- [ ] LCP <2.5s on mobile Lighthouse
- [ ] Accessibility >95
- [ ] Zero FOUT on hero artist name
- [ ] Gig overlay correctly supersedes campaign mode and reverts on expiry
- [ ] Campaign mode selector persists correctly after page reload

---

## 11. PRIORITISATION LOGIC

**Fix in this order:**

1. **Broken flows** — dead ends block the core product promise.
2. **Placeholder copy** — visible to every user; immediate credibility damage.
3. **State integrity** — incorrect state signals break the campaign system.
4. **Empty states** — sections with no content and no invitation are worse than hidden.
5. **Hierarchy** — section order and weight after the above are clean.
6. **Brand consistency** — token and typography unification after structure is solid.
7. **Conversion polish** — micro-moments and emotional payoff last.

**Within each category, fix by surface priority:**
`able-v8.html` > `admin.html` > `start.html` > `landing.html`

**Decision filter:**
Does fixing this directly help the fan convert, or help the artist complete a meaningful action? If no, defer it.

---

## 12. CHANGE CONTROL

This document defines the product system. It is not a living scratchpad.

**When changes are permitted:**
- A product decision has been made that contradicts the current rules (e.g. a new state is introduced, a surface is removed).
- A rule is found to be unenforceable or untestable in practice.
- A phase is completed and its success criteria need updating to reflect the new baseline.

**When changes are not permitted:**
- A task is harder than expected and the rule is inconvenient.
- A new idea emerged mid-session that hasn't been evaluated against the full system.
- A single surface decision implies a system-wide change that hasn't been reviewed.

**How to make a change:**
1. State the rule being changed and why it no longer holds.
2. Propose the replacement rule.
3. Check for contradictions with other sections before committing.
4. Update the version date.

**What must not change without explicit product-level sign-off:**
- The core job (§1)
- The phase sequence and phase boundaries (§5)
- The surface consistency rule (§8)
- The launch-critical blockers (§10)
