# ABLE — The Build Process
**The exact sequence for taking any page from current state to 10/10.**
**Created: 2026-03-15 | Refined through: landing page exercise**

> This process was defined in theory, then battle-tested on the landing page. Every stage below is the refined version — what actually produced a 9.5/10 strategy score, ready to build. Follow it exactly. Do not skip stages. Do not reorder.

---

## THE FULL PROCESS — 8 STAGES

```
Stage 0 → Context Load
Stage 1 → Purpose
Stage 2 → Competitive Research
Stage 3 → 20-Angle Analysis (first pass)
Stage 4 → User Journey Maps
Stage 5 → Copy First
Stage 6 → Path to 10 + Design Spec
Stage 7 → Strategy Review + Final 20-Angle
Stage 8 → Build + Playwright Verify
```

---

## STAGE 0 — CONTEXT LOAD
**Time: 10 minutes. Every session, before anything else.**

Read or confirm:
1. `CONTEXT.md` — active files, tokens, rules
2. `docs/STATUS.md` — current build state
3. `docs/ABLE_STRATEGY.md` — who this is for, what we're building toward
4. `docs/process/FEAR_MAPS.md` — which user type hits this page, what they fear
5. The relevant `SPEC.md` if it already exists

**Output:** One sentence: *"This page is for [user], who is afraid of [fear], and the constraint is [constraint]."*

Do not proceed until you can write that sentence.

---

## STAGE 1 — PURPOSE
**What must this page DO?**

Define the job of the page, not its features.

Questions to answer:
- What is the one thing this page must make a visitor think, feel, or do?
- What breaks if this page doesn't exist?
- Which of the three visitor types (new artist / switcher / fan) is this primarily for?
- What is the ordering logic — what comes before and after this in the user's journey?

**Output:** One sentence job statement.

Example from landing page: *"Convert a curious independent artist into someone who starts building their profile — by showing the product actually working, making the Linktree comparison explicit, and removing every reason to hesitate."*

If you cannot write that sentence clearly, you don't understand the page well enough. Do not proceed.

---

## STAGE 2 — COMPETITIVE RESEARCH
**What do real users say? What does world-class look like?**

Use web search + web fetch to find:

1. **Direct competitor analysis** — how does Linktree / Beacons / Feature.fm handle this page/flow? What are they doing well? What are their users complaining about?
2. **Real user complaints** — Trustpilot, Reddit (r/WeAreTheMusicMakers, r/musicproduction), App Store reviews. What do artists actually say?
3. **Adjacent world-class examples** — who does this type of page/flow brilliantly, even outside music? (Notion onboarding, Stripe Atlas, Duolingo, etc.)
4. **Switching barriers** — what stops users switching even when they know a better product exists?
5. **Conversion data** — any benchmarks for this type of page in this category?

**Output:** 5–8 specific, concrete findings. Not opinions — facts. Each finding should be actionable.

Example: *"Linktree's linktr.ee domain gets flagged as spam by Instagram/TikTok. ABLE's domain is clean. This is a real differentiator worth naming in copy."*

Run this as a background agent while doing other stages.

---

## STAGE 3 — FIRST-PASS 20-ANGLE ANALYSIS
**Score the current state. Identify the P0 gaps.**

Apply all 20 angles. Score each 1–10. For each:
- Current score
- What's wrong
- Path to 10

The 20 angles:

| # | Angle | What it tests |
|---|---|---|
| 1 | First impression | What's understood in 3 seconds before reading? |
| 2 | Primary job | Does the page deliver its one job (Stage 1 output)? |
| 3 | Headline / entry copy | Does the first thing they read resonate? |
| 4 | CTA design and weight | Is the action clear, visible, and sized correctly? |
| 5 | Copy voice | Does every line sound like ABLE, not generic SaaS? |
| 6 | Primary differentiator | Is the core "why ABLE not X" made explicit? |
| 7 | Mobile experience | Does this work at 375px? All tap targets ≥ 48px? |
| 8 | Performance | Does this add meaningful load time? |
| 9 | Social proof | Does this section earn belief? |
| 10 | Trust signals | Does this build or erode trust? |
| 11 | Visual hierarchy | Can a scanner understand it without reading? |
| 12 | End-to-end pathway | Does the full user journey through and beyond this page work? |
| 13 | Conversion clarity | Is the outcome of taking action clear? |
| 14 | Emotional resonance | Does it make the target user feel understood? |
| 15 | The "13-year-old" test | Non-technical user: does this confuse them? |
| 16 | Single memory | If they leave after this page, what sticks? |
| 17 | Secondary user | Is there a secondary user type who lands here? Are they served? |
| 18 | Discoverability | SEO basics, OG tags, shareability |
| 19 | AI red team | What would kill this page's effectiveness? List all threats. |
| 20 | North star | Does this feel like ABLE, or like "a tool"? |

**Output:** Scored analysis document. P0 gaps identified. At least 3 paths-to-10 written before proceeding.

---

## STAGE 4 — USER JOURNEY MAPS
**NEW STAGE — added after landing page exercise.**

Before writing copy, map who actually uses this page and what they experience.

For each user type that lands on this page:
- **The person** — name, context, what they already know, what they fear
- **First contact** — how did they get here? What were they doing before?
- **The path** — every step, including pre-page steps
- **Emotions at each step** — what are they feeling?
- **Decision points** — where could they drop? Where do they convert?
- **What ABLE must do** — exactly what the page must deliver at each moment

**Why this stage exists:** Without journey maps, you design for hypothetical users. With them, you design for Declan (27, Manchester, 2.4k Instagram followers, has a Linktree he never updates). Every design decision becomes testable against a real person.

**Output:** Journey map document. Usually 2–3 journeys per page. Each journey ends with a "what the page must do" summary table.

---

## STAGE 5 — COPY FIRST
**Write every word before designing anything.**

Copy tells you:
- How much space you need
- What visual hierarchy is required
- What the page must communicate at each point

**Copy document structure (in hierarchy order):**
1. Section headline
2. Sub-headline / eyebrow
3. Body copy
4. CTAs (first person where possible)
5. Trust lines
6. Empty states
7. Micro-copy (labels, hints, placeholders)

**Copy rules (apply to every line):**
- No exclamation marks on dashboard or admin copy
- No: "Sign up", "Get started", "Unlock", "Grow your audience", "Turn fans into superfans", "Content creator", "Going viral"
- CTAs specific: `Your page is free →` not `Create account`
- Trust lines: specific claims, not platitudes (`No card required. Free forever.` not `We value your privacy`)
- Read every line aloud. If it sounds like SaaS, rewrite it.
- First person on profile page: `Stay close.` not `Sign up for updates`

**Output:** COPY.md for the page — every word locked, in hierarchy order, annotated with placement.

Do not design or code anything until this document is written.

---

## STAGE 6 — PATH TO 10 + DESIGN SPEC

**Part A: Path to 10**

Go back to the 20-angle analysis. For each angle below 10:
- What exactly makes it a 10?
- What specific design decisions, copy changes, or technical implementations get it there?
- What are the honest ceilings? (social proof requires real users — can't fake it)

**Output:** PATH-TO-10.md — every angle addressed, honest about what's build-dependent vs strategy-dependent.

---

**Part B: Design Spec**

With purpose clear, research done, angles scored, journeys mapped, copy written, paths to 10 defined — now spec the design.

**Design spec must include (for every section):**

*Layout:*
- Desktop and mobile layout (grid/flex values, column counts, gaps)
- Max-width and centering
- Padding values (specific px, desktop and mobile)

*Typography (for every text element):*
- Font family
- Font size (desktop and mobile)
- Font weight
- Line-height
- Letter-spacing (if non-default)
- Colour (token reference)
- Margin/spacing

*Colour:*
- Token references only — no loose hex codes except where tokens don't cover it
- Background per section
- Border colours
- State colours (hover, active, disabled)

*Animation:*
- What triggers it (scroll, click, page load, hover)
- What moves (opacity + transform only — never width/height/colour)
- Duration (ms)
- Easing (reference token or cubic-bezier value)
- `prefers-reduced-motion` fallback always specified

*States:*
- Default
- Hover
- Active / pressed
- Disabled
- Error
- Empty / loading (where applicable)

*Interaction:*
- What happens when user taps/clicks/scrolls
- What changes in the UI
- Any side effects (e.g. state saved to localStorage)

**Output:** DESIGN-SPEC.md — a developer can build the entire page from this document without asking a single question.

---

## STAGE 7 — STRATEGY REVIEW + FINAL 20-ANGLE

**Part A: Strategy Review**

Synthesise everything. Run a final check:
1. Does the research (Stage 2) reveal anything not yet addressed in the spec?
2. Are there new findings from user journey mapping (Stage 4) that change the design?
3. Are there any strategic risks (domain, competitive, trust) that need guardrails in the product roadmap?
4. Check for honest ceilings: what genuinely can't be 10/10 at this stage, and why?

**Output:** STRATEGY-REVIEW-FINAL.md — final synthesis, any copy additions, updated angle scores, guardrails for product roadmap.

---

**Part B: Final 20-Angle Review**

Re-score all 20 angles with every stage incorporated.

For each angle:
- New score (1–10)
- What it took to get there
- If not 10: exactly what makes it a 10, and what's blocking it

**Output:** FINAL-20-ANGLE-REVIEW.md — the definitive pre-build authority document.

---

## STAGE 8 — BUILD + PLAYWRIGHT VERIFY

This is not just a coding stage. It is a verification stage. The build earns the spec scores.

---

### 8.0 Pre-build orientation (every session, before first line of code)

**Load ALL authority documents for the page being built:**

| Document | What to extract |
|---|---|
| `FINAL-20-ANGLE-REVIEW-2.md` | Target scores for every angle. Build earns these — do not assume them. |
| `DESIGN-SPEC.md` | Every px, every colour token, every animation spec. Build from this exactly. No improvising. |
| `COPY.md` | Every word locked. Do not change copy in HTML. If copy needs changing, update COPY.md first. |
| `PATH-TO-10.md` | Build order. Follow the sequence — it reflects dependency chains. |
| `USER-JOURNEYS.md` | Who is using this. Test against Declan (Spotify import), Sofia (Linktree), Amir (scratch) at each milestone. |
| `STRATEGY-REVIEW-FINAL.md` | The "why" behind each decision. If a spec decision seems wrong during build, check here before changing it. |

**Write this sentence before coding:** *"This page is for [user], who fears [fear], and the P0 thing that must work is [P0]."* If you cannot write it, re-read the docs.

---

### 8.1 Pre-build research check

Before each major section, spend 5–10 minutes on targeted research:

```
web search: "[section name] UX best practice 2025 2026"
web search: "[competitor] how does [feature] work"
```

Specific checks per section type:
- **Import flows:** Search for how Spotify/Linktree API failures are handled in production. Find real error rate data.
- **Live preview:** Search for CSS variable update performance. Test if 0ms debounce is actually perceptible.
- **Mobile keyboard:** Always test `visualViewport` API before assuming it works on the target iOS version.
- **Animations:** Check `@starting-style` browser support table before using. Use `@supports` guard if needed.
- **Accessibility:** Run axe-core scan after every interactive component is built.

---

### 8.2 Build order

Follow the build order in `PATH-TO-10.md` exactly. For onboarding specifically:

1. HTML scaffold + CSS design tokens + font loading
2. Screen 0 (Hook + import input + import Netlify function integration)
3. Live preview panel (desktop layout first, then mobile pill/sheet)
4. Screens 1–4 (Name, Vibe, Colour, Theme) — the core OQPS flow
5. Screens 5–7 (Links, Fan CTA, Moment) — the choices
6. Screen 8 (Done — labor illusion → celebration sequence)
7. Step transitions (`@starting-style`, View Transitions API, stagger)
8. Error and fallback states for all import paths
9. Mobile polish (keyboard handling, touch targets, overscroll)
10. Accessibility audit (axe-core + manual keyboard nav + focus management)
11. Animation polish (`prefers-reduced-motion`, spring easing, done screen beats)
12. End-to-end smoke test (full flow → able-v7.html renders correctly)

**Do not skip steps. Do not batch them.** Each step is a commit.

---

### 8.3 After each section: score check

After each section in the build order is complete:

1. Take Playwright screenshots at 375px, 390px, 768px, 1280px
2. Look at each screenshot against the relevant DESIGN-SPEC section
3. Score the relevant angles against target (from FINAL-20-ANGLE-REVIEW-2.md)
4. If any angle is below target: fix before proceeding
5. Commit with descriptive message

**Show the current scorecard after each major section.** Keep a running tally. Never hide scores.

---

### 8.4 Playwright verification checklist (run after EVERY significant section)

**Visual:**
- [ ] Screenshot at 375px (iPhone SE) — no horizontal scroll
- [ ] Screenshot at 390px (iPhone 14 Pro) — matches mobile spec
- [ ] Screenshot at 768px (iPad) — two-column or single-column correctly
- [ ] Screenshot at 1280px (laptop) — matches desktop spec
- [ ] Vibe card grid: exactly 2 columns at 375px, 3 columns at 768px+
- [ ] Preview panel: hidden on mobile, floating pill visible from Step 2
- [ ] Done screen: centered single column, accent gradient visible

**Interaction:**
- [ ] All tap targets ≥ 48px — measure with Playwright `getBoundingClientRect()`
- [ ] Import input: focus state shows accent border, spinner visible during import
- [ ] Import success: green confirmation state visible, auto-advance fires
- [ ] Import failure: amber state visible, fallback path functional
- [ ] Vibe card selection: spring animation plays, selected state visible
- [ ] Colour swatch: preview updates in 0 frames (CSS variable change)
- [ ] Back navigation: correct directional transition, state preserved
- [ ] Screen 8 CTA: "See your live page →" opens able-v7.html with correct data

**Mobile-specific:**
- [ ] Virtual keyboard does not hide Continue button (iOS Safari + Chrome Android)
- [ ] `overscroll-behavior: contain` prevents iOS bounce
- [ ] `touch-action: manipulation` removes tap delay on all cards/buttons
- [ ] Preview pill appears at Step 2, opens bottom sheet correctly
- [ ] Bottom sheet: 92vh height, drag handle visible, closes on backdrop tap

**Performance:**
- [ ] Lighthouse mobile: LCP ≤ 2.5s, Performance ≥ 85, no CLS
- [ ] Fonts: DM Sans + Barlow Condensed loaded via preload (no FOUT)
- [ ] Service worker registers on first load
- [ ] Step 2 assets preloaded after first Step 1 input interaction
- [ ] Import API calls: timeout ≤ 8s, fallback state appears on timeout

**Accessibility:**
- [ ] axe-core: zero critical violations
- [ ] Keyboard: tab order is logical across all 8 screens
- [ ] Vibe grid: arrow keys navigate between cards (native radio)
- [ ] Focus moves to screen headline on each step transition
- [ ] `aria-live="assertive"` on error messages — test with VoiceOver

**Animation:**
- [ ] `@starting-style` entrance plays on screen entry (Chrome + Safari + Firefox)
- [ ] Content stagger: heading → subtitle → cards in sequence
- [ ] Card selection: `scale(0.97)` press response visible
- [ ] Done screen: building sequence (3 steps), pulse ring (one loop), headline spring
- [ ] All animations disabled correctly under `prefers-reduced-motion: reduce`

**Data:**
- [ ] `able_wizard_draft` written to localStorage after each screen advance
- [ ] `able_v3_profile` written on Screen 7 submit
- [ ] `able_wizard_draft` deleted after Screen 7 submit
- [ ] Session recovery: close mid-wizard, return, sees "Picking up where you left off."
- [ ] `able_wizard_draft` older than 24 hours is ignored (clean start)

**End-to-end flow:**
- [ ] Full journey (Spotify import path): Screen 0 → Screen 8 in one session
- [ ] Full journey (Linktree import path): `?import=linktree` → Screen 8
- [ ] Full journey (scratch): type name → Screen 8
- [ ] After Screen 8: "See your live page →" → able-v7.html shows correct profile
- [ ] Profile renders with correct name, accent colour, theme, CTA text

**Commit after each section is verified.** Do not batch commits.

---

### 8.5 Two-pass review per section

When a section passes the Playwright checklist:

**Pass 1 — Spec fidelity:** Does it match DESIGN-SPEC.md exactly?
- Every pixel value
- Every colour token (no loose hex codes)
- Every copy string (matches COPY.md exactly)
- Every animation timing

**Pass 2 — User perspective:** Would the target user be impressed or confused?
- Put yourself in Declan's position (26, Manchester, slight sceptic)
- Look at the 390px screenshot only
- Is there anything that looks like a form? Fix it.
- Is there anything that looks generic SaaS? Fix it.

Both passes must pass. Neither is optional.

---

### 8.6 Final build score

After all sections are built and verified, run the full 20-angle analysis against the **live built page** — not the spec. Open the page in Playwright. Screenshot all viewports. Score every angle honestly.

Show the full scorecard:

| Angle | Spec target | Built score | Gap | Action |
|---|---|---|---|---|

If any angle is below spec target: fix it. Do not ship below spec.

If any angle exceeded spec: note it. Update FINAL-20-ANGLE-REVIEW-2.md.

---

### 8.7 AI user story check (before any PR or release)

Before calling a build complete, run every AI-native user story:

> "An AI agent wants to update my artist profile. Can it do everything a human can do through the UI?"

Specifically for onboarding:
- Can an AI agent drive the wizard programmatically? (headless Playwright)
- Are all interactive elements accessible by ID/data attribute?
- Can the import be triggered via a direct API call rather than UI?
- Is the localStorage profile schema documented for programmatic reads?

If the answer to any is "no": add the programmatic interface before calling it done. ABLE must be agent-native from the start.

---

## THE FILING STRUCTURE (one page, all docs)

For each page, create this folder structure:

```
docs/pages/[page-name]/
├── SPEC.md                      ← Stage 1 — purpose + vision
├── 20-ANGLE-ANALYSIS.md         ← Stage 3 — first-pass scored analysis
├── USER-JOURNEYS.md             ← Stage 4 — journey maps
├── COPY.md                      ← Stage 5 — every word, locked
├── PATH-TO-10.md                ← Stage 6A — systematic path to 10
├── DESIGN-SPEC.md               ← Stage 6B — exact build spec
├── STRATEGY-REVIEW-FINAL.md    ← Stage 7A — final synthesis
├── FINAL-20-ANGLE-REVIEW.md    ← Stage 7B — definitive pre-build score (3 passes)
└── FINAL-20-ANGLE-REVIEW-2.md  ← Stage 7C — second final push (Pass 4 + 5, challenges every ceiling)
```

**Stage 7C is mandatory.** After FINAL-20-ANGLE-REVIEW.md is written, always produce FINAL-20-ANGLE-REVIEW-2.md. Challenge every ceiling from Stage 7B. Ask: "what did we miss? What would a world-class competitor do here that we haven't specced?" Run a dedicated research pass targeting the specific angles that didn't reach 10 in Stage 7B. Show Pass 4 and Pass 5 scores. If Pass 5 overall is the same as Pass 3, write exactly why — that is also valuable. The second final is about proving there is nothing left on the table.

---

## CURRENT STATUS BY PAGE

| Page | Stage 0 | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 | Stage 6 | Stage 7 | Stage 8 |
|---|---|---|---|---|---|---|---|---|---|
| **Landing** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **Onboarding** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **Artist Profile** | ✅ | — | — | — | — | — | — | — | — |
| **Admin** | ✅ | ✅ | — | — | — | — | — | — | — |
| **Fan** | ✅ | — | — | — | — | — | — | — | — |

**Next: Onboarding — Stage 4 through Stage 7.**

---

## RULES THAT CANNOT BE BROKEN

1. **Copy before design.** Never spec a layout before copy is written.
2. **20 angles before building.** Never write code on an unscored section.
3. **User journeys before copy.** Never write for a hypothetical user.
4. **Research before angles.** Never score based on assumptions.
5. **Playwright after building.** Never ship unverified.
6. **One page at a time.** Finish all stages on one page before starting another.
7. **Honest ceilings.** Never inflate a score. Social proof at 2 isn't 8 because you wrote it in the spec.
8. **Guardrails in the roadmap.** Any risk found in Stage 7 that isn't a copy fix goes into the product roadmap, not the landing page.
9. **Keep going until you surpass 10.** Do not stop at what seems like a ceiling. When a score feels like a 10, do at least one more pass and ask: "is there genuinely nothing left?" Sometimes what looks like a 10 has further to go. Keep pushing until every angle is challenged at least twice after the first 10 score is recorded.
10. **Multiple revision passes — keep going.** Minimum 3 passes after the first-pass scores. Show updated scores after every single pass. Never stop because the score looks high.
11. **A score of 10 is not the end.** After reaching 10, ask: "What would make this an 11 if 11 existed?" Those answers become the next design iteration or product roadmap item.
12. **Always show scores.** Every time scores are produced or updated, display the full scorecard table. Never hide scores.
13. **Always use every tool available.** Before scoring or reviewing any page/section, run web search, web fetch, and research agents to find: real user complaints, competitor patterns, world-class examples, conversion data. Assume there is always something online that will sharpen the thinking. Never score from assumptions alone.
14. **Research runs in background.** Dispatch research agents in parallel with document writing — never block progress waiting for research. Fold findings in at Stage 7.
15. **Always think product-wide.** Every page decision must be tested against: does this serve the ABLE brand? Does it serve this specific user type? Does it connect to the journey before and after this page? A technically perfect page that breaks product coherence is not a 10.
