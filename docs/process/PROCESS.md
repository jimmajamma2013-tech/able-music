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

## STAGE 8 — BUILD PHILOSOPHY ADDENDUM
**What the mechanical checklist (8.0–8.7) does not cover.**

The sections above define *what* to verify. These sections define *how to think* during the build. They are not optional. They are the difference between shipping a correct page and shipping a great one.

---

### 8a — Pre-build setup (every session before first line of code)

Before writing a single line of code, complete the following in order:

1. **Read `docs/BUILD-READY-INDEX.md`** — this file (when it exists) contains the build order, known pre-existing bugs, and any deferred decisions from the strategy phase. Read it completely. If it doesn't exist yet, create it before proceeding.
2. **Read `docs/PRE-BUILD-CHECKLIST.md`** — confirm the environment is correct: Playwright installed, Chromium available, target file is the right one, no uncommitted changes on top of a previous build session.
3. **Confirm branch:** `git status` — you should be on `build/[page-name]` branched from main. If not, create it: `git checkout -b build/[page-name]`.
4. **Confirm Playwright works:** Run `npx playwright install chromium` (idempotent — safe to run again). Take a test screenshot of the current file to confirm the environment is live before touching any code.
5. **Parse-check the current file before editing:** `node -e "require('fs').readFileSync('able-v7.html','utf8')"` — confirms the file is readable. Optionally extract the `<script>` block and run `node -e "new Function(src)"` to confirm the existing JS is already parse-safe before any changes.
6. **Write the orientation sentence:** *"This page is for [user], who fears [fear], and the P0 thing that must work is [P0]."* This must be possible to write without re-reading docs. If it isn't, re-read docs. Do not proceed until this sentence is written.

**Time budget: 15 minutes.** Do not skip this setup. A broken environment wastes more time than the setup saves.

---

### 8b — The build loop (repeat for every section)

Every section of every page follows this loop. Not some sections. Every section.

**1. Read the spec completely.**
Open `DESIGN-SPEC.md` and read the section for this component from top to bottom before writing any code. Do not skim. If the spec says "16px gap between items at mobile", that is what gets built. No improvisation at this stage.

**2. Write the code.**
Implement exactly to spec. Resist the temptation to improve during this step — that comes in step 6. The goal here is faithful translation, not interpretation.

**3. Parse-check every JS block touched.**
For any JavaScript modified: `node -e "new Function(jsBlock)"`. A parse error caught here takes 10 seconds to fix. A parse error caught in production breaks every artist's profile. Run this every time without exception.

**4. Playwright verify.**
Take screenshots at 375px and 1280px. Rename the document title before taking the screenshot so the tab is identifiable later:
```js
document.title = 'ABLE v7 — [section name] — mobile 375'
```
Use the Playwright MCP tools: `mcp__playwright__browser_navigate`, `mcp__playwright__browser_resize`, `mcp__playwright__browser_take_screenshot`.

**5. Compare to spec.**
Place the screenshot mentally against the relevant DESIGN-SPEC section. Check every element:
- Spacing correct?
- Colour tokens correct (no loose hex)?
- Typography matches spec (size, weight, line-height)?
- Animation timing correct?
- Copy matches COPY.md exactly?

If anything differs from spec: fix it before proceeding to step 6. The spec is the authority. Do not rationalise differences.

**6. Rethink.**
Now that you can see it built and verified — is the spec still right? This is the deliberate pause. Ask honestly:
- Does this feel like ABLE, or does it feel like something else?
- Is there anything that looks technically correct but feels off?
- Would an independent musician landing on this page feel respected, or processed?
- Is there a better solution that the spec didn't anticipate because specs are written before building?

If the answer to any of these is "this could be better", note it. Do not implement yet — go to Stage 8c. If the spec is correct and the build is faithful: proceed to step 7.

**7. Commit.**
`git commit -m "feat([page]): [section] — exact description of what was built"`

One section = one commit. Do not batch sections into a single commit. The commit history is the build log.

---

### 8c — The enhancement loop (continuous during build)

This is not an extra step added at the end. It runs continuously throughout the build, triggered by intuition and by scheduled scans.

**Scheduled scans — at least once per page:**

At the midpoint of building any page, open all strategy docs simultaneously and read them looking for anything not yet implemented:
- `DESIGN-SPEC.md` — any section marked "spec complete" that hasn't been built yet?
- `PATH-TO-10.md` — any improvements listed there not yet in the build?
- `FINAL-20-ANGLE-REVIEW-2.md` — any "what would make this an 11" notes that could be implemented now?
- `docs/systems/MICRO_INTERACTIONS_SPEC.md` — any interactions that apply to this section that weren't in the original spec?
- `docs/systems/DESIGN_SYSTEM_SPEC.md` — any tokens or patterns defined at the system level that the section spec missed?

**Intuition triggers — any time:**

Stop and enter the enhancement loop when:
- Playwright shows something that looks wrong even if technically correct
- Copy feels off when read aloud in the context of a real user's flow
- An interaction feels mechanical rather than alive — it works but it doesn't feel like anything
- A section doesn't feel like ABLE — feels like it could be Beacons, or Linktree, or a generic SaaS form

**Enhancement protocol:**

When you find an enhancement worth implementing:

1. **Write it in `ENHANCEMENT-LOG.md`** (create in `docs/pages/[page-name]/` if it doesn't exist). Entry format:
   ```
   ## [Date] — [Section] — [Enhancement title]
   **What:** [one sentence description]
   **Why:** [why this is better than the spec]
   **Impact:** minor tweak / significant change / cross-page change
   **Status:** discovered / in-progress / implemented / deferred
   ```

2. **If it's a minor tweak** (copy refinement, spacing adjustment, colour token swap): implement immediately. Update DESIGN-SPEC.md to mark the change. Commit as `fix([page]): [description]`.

3. **If it's a significant change** (new interaction, layout rethink, new section): stop. Write a 2-paragraph mini-spec in ENHANCEMENT-LOG.md. Answer: (a) what exactly is the enhancement, and (b) why is this genuinely better, not just different? If the answer to (b) is clear: implement it. If it's not clear, defer and continue.

4. **If it's a cross-page change** (affects design system, multiple pages, or shared components): document it in the relevant system spec (`docs/systems/`) and log a note in STATUS.md. Do not implement cross-page changes during a single-page build session — they get their own session.

**Doc sync after every enhancement:**
- Mark the section in DESIGN-SPEC.md as "implemented (enhanced)" with a note of what changed
- If the enhancement modifies a cross-page system: update the relevant system spec
- Update STATUS.md with what was added and why
- If an animation or interaction was enhanced: re-run `docs/systems/MICRO_INTERACTIONS_SPEC.md` check to confirm no contradictions

**Score re-check after enhancement:**
After implementing a significant enhancement, re-score the relevant 20 angles. Did the score move? Show the updated scorecard. The enhancement is not done until the score impact is confirmed.

---

### 8d — Playwright verification protocol

Playwright verification is not a step that happens once at the end. It runs after every significant section during the build. It is as much part of the build process as writing the code.

**What to verify — the minimum set per section:**

| Check | How | Pass criteria |
|---|---|---|
| Mobile layout (375px) | `browser_resize({width:375})` → screenshot | No horizontal scroll. No clipped elements. All text readable. |
| Desktop layout (1280px) | `browser_resize({width:1280})` → screenshot | Layout matches spec. No excess whitespace. |
| Tap targets | `browser_evaluate({script: 'Array.from(document.querySelectorAll("button,a,[role=button]")).map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,w:r.width,h:r.height,text:el.textContent.trim().slice(0,20)}})'})` | Every interactive element: min 44px in both dimensions. |
| Console errors | `browser_console_messages()` | Zero errors. Zero undefined references. |
| Theme: Dark | Apply dark theme via JS, screenshot | All surfaces use correct tokens. No hardcoded colours visible. |
| Theme: Light | Apply light theme, screenshot | Readable on cream background. No dark-only assumptions. |
| Theme: Glass | Apply glass theme (requires background image), screenshot | Backdrop-filter renders. No broken surfaces. |
| Theme: Contrast | Apply contrast theme, screenshot | Maximum legibility. Accent still visible. |
| Animation | Trigger the animation, screenshot (or use `browser_evaluate` to check computed styles) | Animation fires. Duration and easing match spec. |
| Reduced motion | `browser_evaluate({script: "document.documentElement.setAttribute('data-reduced-motion','true')"})` + screenshot | No movement. Static state is correct. |

**After every screenshot, rename the tab:**
```js
document.title = 'ABLE — [page] — [section] — [viewport] — [theme]'
// Example: 'ABLE — v7 — hero — 375px — dark'
```
This creates a consistent audit trail in the Playwright browser history.

**Failure protocol — no exceptions:**
If Playwright reveals something wrong:
1. Note exactly what is wrong, at which viewport, on which theme.
2. Fix the CSS or JS.
3. Re-run the exact same Playwright check.
4. Do not proceed to the next section until the current section passes all checks.

There is no "I'll fix it later." Defects compound. A layout bug at the hero section will cascade into everything built on top of it.

---

### 8e — The rethink trigger

This is the stage most agents skip. It is the most important one.

A build agent that only follows specs produces technically correct work. The rethink is what produces work that feels like it was made by someone who cares.

**Stop and rethink when any of these are true:**

- **"Technically correct but feels wrong."** Playwright shows something that passes every check but doesn't look right. Trust this feeling. It is data. Something is off. Find it.

- **"Copy sounds like copy."** Read the section's text aloud, as if you are Declan (26, Manchester, 2.4k Instagram followers, slight sceptic). Does it sound like something he'd read and think "yes, this is for me"? Or does it sound like something a marketing team wrote about him? If the latter: rewrite before shipping.

- **"The interaction is mechanical."** The button press works, the animation fires, the state updates — but there's no delight. No surprise. No moment where a user thinks "oh, that's nice." This is the hardest thing to spec but the easiest to feel. If an interaction feels like form-filling rather than music, it needs more.

- **"This could be any app."** A competitor could ship this exact section unchanged. If that is true, it is not ABLE. ABLE has opinions. Every section should have at least one moment that would not exist on Linktree or Beacons — something that says: we understand what music actually is.

**What happens when a rethink triggers:**
1. Stop. Do not commit what you have.
2. Open FINAL-20-ANGLE-REVIEW-2.md and re-read angle 20 (North star) and angle 14 (Emotional resonance).
3. Read the copy from COPY.md for this section aloud.
4. Look at the Playwright screenshot one more time.
5. Write down in one sentence what feels wrong.
6. Fix it. Then go back to 8b step 5 and verify the fix is actually an improvement, not just a change.

The rethink is not a delay. It is the build. The spec is the floor, not the ceiling.

---

### 8f — Coherence maintenance

After every completed page — before merging, before calling it done — run the full coherence check. This takes 30–45 minutes and is not optional.

**1. Cross-page coherence.**
Open the current page and the previous completed page side-by-side in Playwright. Do they feel like the same product? Check:
- Typography: same fonts, same scale relationships, same hierarchy pattern?
- Motion: same easing variables, same duration range, same spring physics?
- Voice: does the copy on this page sound like the same person who wrote the other pages?
- Colour: accent colour is different per artist (by design), but admin amber, system red, system green — are they consistent?

**2. Copy audit.**
Read every piece of user-facing text in the page against the banned phrases list in `docs/systems/copy/SPEC.md`. Any violation must be fixed before merge. Common regressions to check:
- "Get started" / "Sign up" appearing in CTAs
- Exclamation marks in dashboard or admin copy
- "Grow" / "unlock" / "superfans" / "content creator" appearing anywhere
- Generic placeholder copy that wasn't replaced with ABLE voice

**3. Token audit.**
Grep for hardcoded hex values anywhere outside `:root` or `@media (prefers-color-scheme)` blocks:
```bash
grep -n "#[0-9a-fA-F]\{3,6\}" [file].html | grep -v "^[0-9]*:.*:root\|^[0-9]*:.*--\|^[0-9]*:.*<!--"
```
Every hit that is not a CSS custom property definition or a comment is a regression. Fix it.

**4. Data audit.**
Scan every `localStorage.getItem()` and `localStorage.setItem()` call:
- Is the key name in the canonical list from CONTEXT.md? If not: it must be added to the canonical list before shipping.
- Does every `getItem` have a fallback? `localStorage.getItem('key') || defaultValue` — never a bare read.
- Does every `JSON.parse` have a `try/catch`? Malformed localStorage data from a previous session will break a real user's page without error handling.

**5. Theme audit.**
Switch through all four themes in Playwright and take a screenshot of every section on each theme:
- Dark: everything readable, no overflow, accent visible
- Light: cream background renders, text is dark enough, no dark-only assumptions
- Glass: backdrop-filter renders (Chrome + Safari), no broken backgrounds
- Contrast: pure black base, maximum legibility, accent still visible against black

If any theme breaks any section: fix before merge. Theme support is not progressive enhancement — it is a core feature.

**6. Doc update.**
At the end of the coherence check, update:
- `docs/STATUS.md` — mark sections as built, add any new known issues discovered
- `DESIGN-SPEC.md` — mark every built section as "implemented" with the commit SHA
- `ENHANCEMENT-LOG.md` — mark any implemented enhancements as complete
- The date at the top of STATUS.md

This is not optional housekeeping. It is how the next session starts with orientation rather than confusion.

---

## STAGE 9 — POST-PAGE FINAL REVIEW

After an entire page is built and the coherence check (8f) is complete, run the final review before any PR or merge.

This takes approximately 60–90 minutes. It is not a formality. It is a fresh-eyes pass that treats the live built page as the primary document, not the spec.

---

### 9.1 — Fresh 20-angle analysis on the live page

Open the page in Playwright. Take screenshots at 375px, 390px, 768px, and 1280px. Then run the full 20-angle analysis from scratch — not from the spec. Do not look at the spec scores. Score what you actually see.

| Angle | What to look for in the screenshots | Known ceiling |
|---|---|---|
| 1. First impression | What does a non-artist see in 3 seconds? | — |
| 2. Primary job | Does the page deliver its one job from Stage 1? | — |
| 3. Headline / entry copy | Read the first line aloud. Does it land? | — |
| 4. CTA design and weight | Is the primary action visible without scrolling at 375px? | — |
| 5. Copy voice | Read 10 random pieces of copy. ABLE voice or generic? | — |
| 6. Primary differentiator | Does this page make the ABLE vs Linktree argument without needing words? | — |
| 7. Mobile experience | 375px screenshot: any clipping, overflow, small tap targets? | — |
| 8. Performance | Check Lighthouse. LCP, CLS, Performance score. | — |
| 9. Social proof | Does any section earn belief? Or is it assertion? | Requires real users to hit 10 |
| 10. Trust signals | What makes an artist trust this page? Does it exist? | — |
| 11. Visual hierarchy | Can a scanner understand it without reading? | — |
| 12. End-to-end pathway | Does the flow through and beyond this page work? | — |
| 13. Conversion clarity | Is the outcome of taking action obvious? | — |
| 14. Emotional resonance | Does it make an independent musician feel understood? | — |
| 15. The 13-year-old test | Show screenshot to a hypothetical non-technical user. Confusing? | — |
| 16. Single memory | If they leave after this page, what sticks? | — |
| 17. Secondary user | Is any secondary user type served if they land here? | — |
| 18. Discoverability | Check OG tags in source. Are they populated dynamically? | — |
| 19. AI red team | What would break this page's effectiveness? Still valid? | — |
| 20. North star | Does this feel like ABLE, or like a tool? | — |

Show the full scorecard. Do not hide any angle. Compare scores to the spec target from FINAL-20-ANGLE-REVIEW-2.md.

**If any built score is below spec target:** it is a regression. Find the cause and fix it before the final review is complete.

**If any built score exceeds spec target:** note it. Update FINAL-20-ANGLE-REVIEW-2.md. This is valuable data for the next page.

---

### 9.2 — Copy calibration test

Run the copy through the calibration test from `docs/systems/copy/SPEC.md`. For every piece of user-facing text:

1. **The first-person test:** Read it as if you are the artist. Does it sound like you, or does it sound like someone describing you to an investor?
2. **The aloud test:** Read it out loud. Does it sound natural? Or does it sound like it was written?
3. **The banned phrase scan:** Does any line contain a banned phrase, a synonym of a banned phrase, or the spirit of a banned phrase even if the exact words are absent?
4. **The specific claim test:** Every trust line and empty state — is it a specific claim or a platitude? Platitudes must be replaced with specific claims before shipping.

Copy that fails any of these tests must be rewritten. Copy fixes are not minor — they are the difference between ABLE feeling like a product and feeling like a person.

---

### 9.3 — Playwright smoke test

Run the 15-minute manual checklist:

1. Full user flow from entry to completion (simulate the target user journey end-to-end)
2. All CTAs fire correctly (Playwright click + verify state change)
3. All four themes render correctly at 375px
4. localStorage is written and read correctly (check after each flow step)
5. No console errors at any point in the flow
6. Fan sign-up (if applicable): data written to `able_fans`, confirmation state renders
7. Profile state transitions (if applicable): cycle through all four states, verify each renders
8. Links: all external links open in new tab with `rel="noopener noreferrer"`
9. Keyboard nav: tab through all interactive elements, confirm logical order
10. Reduced motion: force `prefers-reduced-motion: reduce`, confirm no movement

If any check fails: it is a P0. Fix before shipping.

---

### 9.4 — AI agent compatibility check

Run the check from Stage 8.7 against the final build. Specifically:

- Can every interactive element be addressed by a CSS selector or data attribute?
- Is every localStorage schema documented in CONTEXT.md?
- Does the page work when loaded with a pre-seeded localStorage profile?
- Are there any actions that require mouse hover to reveal (invisible to agents)?

Any "no" answer is a defect. Add the programmatic interface before calling the page done.

---

### 9.5 — Post-build session summary

Write a summary and add it to STATUS.md under "Last session summary". The summary must include:

- What was built (bullet list of sections, in order)
- Final scores achieved (vs spec targets)
- Any enhancements added beyond spec (and why)
- Any known gaps or honest ceilings (with reasoning)
- Any deferred items (moved to roadmap or next session)
- The final commit SHA

Format:
```
## Last session summary (session [N]) — [page name]
Built: [list]
Final scores: [scorecard table or summary]
Enhancements: [list or "none"]
Known gaps: [list or "none — all spec targets met"]
Deferred: [list or "none"]
Final SHA: [sha]
```

---

### 9.6 — Final commit

```bash
git commit -m "feat([page]): complete build — [X.X/10] — [one-sentence description of what was built]"
```

The commit message must include the final score. This makes the build history searchable and honest.

Do not open a PR until all of 9.1–9.5 are complete and passing.

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
