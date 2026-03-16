# ABLE — Build Confidence
**Created: 2026-03-16 | Score: see §9**
*Honest assessment of what it takes to build this product perfectly, and how confident we are.*

---

## Purpose of this document

This is not a motivational document. It is an honest audit of every factor that determines whether the ABLE build goes well or badly — the strengths, the real risks, the mitigation for each, and a current confidence score per dimension.

Read this before any major build session. Update it when something changes.

---

## 1. What "build this perfectly" means

Perfect build = all of the following are true:

1. All 4 active files (`able-v7.html`, `admin.html`, `start.html`, `landing.html`) implement their DESIGN-SPEC.md exactly
2. All P0 bugs are fixed before any real user touches the product
3. All 4 themes work on all 4 pages
4. Playwright smoke tests pass on all pages
5. No console errors on any page
6. GDPR consent is in place before any fan email is collected
7. The copy passes the calibration test (no banned phrases, first-person, honest)
8. Mobile-first: no horizontal scroll at 375px, all tap targets ≥44px
9. The product does what it says — every CTA fires, every state switches, every form submits
10. James could hand the product to a real artist today and not be embarrassed

---

## 2. Confidence strengths — what gives us confidence

### 2.1 Documentation depth (9.5/10)
Every page has a DESIGN-SPEC.md. Every system has an ANALYSIS.md, SPEC.md, PATH-TO-10.md, and FINAL-REVIEW.md. There are 350+ documents covering every decision, every token, every animation curve, every copy string, every data schema. The documentation is more complete than most funded startups have at Series A. A developer reading these docs for the first time has everything they need.

**What this means in practice:** No guessing. No "I think the accent colour was..." — it's in CONTEXT.md. No "what does the pre-release state look like?" — it's in `docs/pages/profile/DESIGN-SPEC.md §6.2`. Every build decision is pre-made.

### 2.2 Existing codebase quality (7.5/10)
`able-v7.html` is 10,214 lines. `admin.html` is 5,936 lines. These are not empty files — they are working implementations with real functionality. The spring physics, the theme system, the CTA zone logic, the campaign states, the bottom sheet pattern — all of it exists and works. The build task is not "build from scratch" — it is "bring working code to specification."

**What this means in practice:** The hard parts (animation system, CSS token architecture, localStorage data model) are done. The remaining work is implementing the gap list, not architecting from zero.

### 2.3 Parse-check discipline (8/10)
Every JS block can be validated with `node -e "new Function(src)"` in under 5 seconds. This catches syntax errors before Playwright runs. CLAUDE.md rule 1.

**What this means in practice:** JS regressions are caught within seconds of writing, not after 10 minutes of debugging why the page is blank.

### 2.4 Playwright MCP (8/10)
Visual verification after every significant change. Tab renaming pattern. Screenshot comparison. The Playwright setup means the build loop is: write → parse-check → Playwright → compare to spec → commit. This is faster than a human reviewing by eye and more reliable.

**What this means in practice:** Regressions are caught within one build cycle, not discovered by James when he opens the file later.

### 2.5 Design token architecture (8.5/10)
CSS custom properties mean a single token change propagates to every usage. `--color-accent`, `--bg`, `--font`, easing curves — all are variables. This means the risk of implementing the wrong colour in one place but not another is near-zero. The accent system is the most important token: one line of CSS changes the entire artist theme.

**What this means in practice:** Theme consistency bugs — the most common visual regression — are structurally prevented.

### 2.6 Copy system (8.5/10)
VOICE-BIBLE.md. 20 banned phrases. The calibration test. DECISION-LOG.md with 14 locked decisions. These mean copy regressions — "dashboard" reappearing, exclamation marks creeping in — are caught by a systematic check rather than by re-reading everything.

**What this means in practice:** The product will not accidentally sound like a generic SaaS tool.

---

## 3. Real risks — where things could go wrong

### 3.1 Context window limits during build (Risk: HIGH)
`able-v7.html` is 10,214 lines. `admin.html` is 5,936 lines. These are large files. When editing a file this large, there is a risk that changes in one section break something in another section — because the full file may not be in working memory simultaneously.

**Mitigation:**
- Always read the specific function/section being edited, not just the area being changed
- Parse-check after every edit: `node -e "new Function(src)"`
- Playwright smoke test after every section — not just at the end
- Commit after each logical chunk so regressions are isolatable
- COMPONENT-LIBRARY.md documents all reusable patterns — use it, don't reinvent

**Residual risk:** Medium. The parse-check catches most issues. The remaining risk is semantic regressions (something works syntactically but does the wrong thing).

### 3.2 Theme testing gap (Risk: MEDIUM-HIGH)
There are 4 themes (Dark, Light, Glass, Contrast) and 4 pages. That is 16 combinations to verify after every CSS change. Manually testing all 16 is impractical. Currently no automated theme-switching test exists in the Playwright suite.

**Mitigation:**
- DESIGN-SPEC.md §6 specifies exactly what changes in each theme — test those deltas specifically
- Glass theme requires a background image to render correctly — test with a known image URL
- CSS token architecture means most theme changes are additive, not destructive
- Priority order for theme testing: Dark (default) → Light → Glass → Contrast

**Residual risk:** Medium. Glass and Contrast themes are most likely to have regressions that Dark/Light testing won't catch.

### 3.3 Mobile Safari behaviour (Risk: MEDIUM)
`backdrop-filter: blur()` (Glass theme) has known performance issues on older iOS devices. Spring physics at 60fps vs 30fps on lower-end iPhones. iOS keyboard pushing layout. These cannot be caught by Playwright (which uses Chromium) — only by real device testing.

**Mitigation:**
- Test on real iPhone (Safari, iOS 17+) before any section is considered done
- `backdrop-filter` fallback: if performance is unacceptable on real device, add `@supports not (backdrop-filter)` fallback
- Input fields: `font-size: 16px` minimum to prevent iOS auto-zoom
- `env(safe-area-inset-*)` for notch/home indicator — already in DESIGN-SPEC.md

**Residual risk:** Low-medium. The spec accounts for it. Real device testing is the gate.

### 3.4 localStorage data integrity (Risk: MEDIUM)
Five separate localStorage keys. Two of them have a known naming conflict (`able_profile` vs `able_v3_profile`). The wizard writes to `able_profile`. The profile page reads from `able_v3_profile`. A migration function is specified in BUILD-READY-INDEX.md but not yet implemented.

**Mitigation:**
- Fix the key conflict first — this is P0 in BUILD-READY-INDEX.md
- The migration function is 8 lines of JS — implement it at the top of `admin.html`'s `DOMContentLoaded`
- All localStorage reads should be wrapped in try/catch (`safeGet()` pattern from error-states spec)

**Residual risk:** Low once the key conflict is fixed. The safeGet() pattern handles corrupted data.

### 3.5 GDPR compliance gap (Risk: HIGH — legal risk)
Fan emails are currently collected without a consent line. This is the highest-risk item in the codebase — not a performance bug or a design regression, but a legal risk. Under UK GDPR, collecting personal data without informed consent is an ICO reportable violation.

**Mitigation:**
- The fix is specified in `docs/systems/legal-compliance/SPEC.md` — a 3-line HTML addition to the fan sign-up form
- This is P0. Do not let a real user touch the product until this is live
- Privacy policy must be published at `/privacy` before launch
- The consent flow stores `consent: true, consentMethod: 'explicit_checkbox'` in the fan record

**Residual risk:** Near-zero once implemented. The fix is simple and the spec is complete.

### 3.6 The "I'll fix it later" regression (Risk: HIGH — process risk)
The most common build failure pattern: an issue is noticed during build, it is noted but not fixed immediately, and it is forgotten. The doc system mitigates this — every known bug is documented in BUILD-READY-INDEX.md — but only if the discipline holds.

**Mitigation:**
- PROCESS.md Stage 8b Step 4: Playwright verification before moving to the next section
- If a bug is found: either fix it now, or add it to BUILD-READY-INDEX.md with exact location before moving on
- No "TODO" comments in code — if it's important enough to flag, it's important enough to document properly
- Commit messages include the current section score so regressions are visible in git log

**Residual risk:** Low with discipline. High without it.

### 3.7 Cross-page coherence drift (Risk: MEDIUM)
Changes to a shared pattern in one file (e.g. the bottom sheet component) can leave the same pattern inconsistent in another file. With 4 active files sharing many UI patterns, drift is a real risk.

**Mitigation:**
- COMPONENT-LIBRARY.md documents all shared components with their canonical implementation
- After any change to a shared pattern: grep all 4 active files for the pattern and check for consistency
- PROCESS.md Stage 8f: coherence check before final commit on any file

**Residual risk:** Low with the component library as a reference. Medium without it.

---

## 4. What perfect execution looks like day-to-day

**Before any session:**
1. `git status` — clean working tree
2. Read `CONTEXT.md` — 2 minutes
3. Check `docs/STATUS.md` — current state
4. Check `BUILD-READY-INDEX.md` — today's P0 list
5. Open the specific DESIGN-SPEC.md for today's file

**During each section:**
1. Read the spec for the section
2. Write the implementation
3. `node -e "new Function(src)"` — parse-check immediately
4. Playwright screenshot + compare to spec
5. If it matches: commit. If it doesn't: fix before moving on.

**Before claiming a section is done:**
- Playwright passes
- All 4 themes render correctly (spot-check)
- No console errors
- Copy passes the calibration test
- Mobile: no horizontal scroll, tap targets ≥44px

**Before claiming the file is done:**
- Full 20-angle review (PROCESS.md Stage 9.1)
- Copy calibration test (Stage 9.2)
- 15-step Playwright smoke test (Stage 9.3)
- Commit with score in message

---

## 5. The known unknowns

Things that will be discovered during build that cannot be fully anticipated:

1. **Edge cases in campaign state switching** — the auto-switch logic (`if now < releaseDate → pre-release`) has timing edge cases that only appear with real date arithmetic. These are findable by writing a Playwright test that sets localStorage to a specific date state.

2. **Embed performance on mobile** — oEmbed renders from third-party sources. On slow connections, iframes can block paint. This needs testing with network throttling in DevTools before sign-off.

3. **Theme + vibe combination matrix** — 4 themes × 7 vibes = 28 combinations. Some combinations (e.g. Glass + Bedroom Pop with its muted palettes) may produce unreadable contrast. These need to be found and fixed, not designed in advance.

4. **Fan sign-up form on older Android** — Chrome on Android 10 has known issues with `backdrop-filter`. The fan sign-up form is the most critical conversion point — it must work everywhere.

---

## 6. What would disqualify a release

**Non-negotiable pre-launch gates:**

| Gate | Current state | Fix |
|---|---|---|
| GDPR consent on fan sign-up | ❌ Not implemented | 3-line HTML fix |
| Privacy policy at `/privacy` | ❌ Not published | Write + deploy |
| OG image is a real URL (not `data:`) | ❌ `data:` URI | Fix in DESIGN-SPEC §10 |
| oEmbed hostname allowlist | ❌ Substring regex (P0 security bug) | ALLOWED_HOSTS Set |
| `able_profile` / `able_v3_profile` conflict | ❌ Not fixed | 8-line migration function |
| No console errors on any page | Unknown | Run Playwright, check DevTools |
| Fan deletion query tested | ❌ Not tested | Run SQL in Supabase dashboard |
| Real device tested (iPhone Safari) | ❌ Not done | Test before ship |

**If any of these are not done, do not give the URL to a real artist.**

---

## 7. The honest ceiling

With this codebase, this documentation, and this process:

- **Perfect V1 is achievable.** The spec is complete, the existing code is strong, the patterns are established. There are no architectural blockers.
- **The build is not trivial.** `able-v7.html` is 10,214 lines and has 7 vibes, 4 themes, 4 campaign states, and a complex animation system. Build sessions need focus and process discipline, not just hours.
- **Some things will be found during build that aren't in the spec.** This is expected. The process for handling them is: document in BUILD-READY-INDEX.md, fix in the same session if P0, log for next session if P1/P2.
- **The quality bar is high.** A 7/10 implementation is worse than no implementation for ABLE — because the product makes a specific promise (this is for artists with taste) that a mediocre build breaks. Build each section to spec, not to "good enough."

---

## 8. The single most important thing

The documentation is done. The spec is complete. The existing code is working.

**The build will succeed or fail based on one thing: whether each section is verified before moving to the next.**

A build that proceeds without verification accumulates debt. A build that verifies as it goes produces a clean, shippable product. The 5 minutes of Playwright verification per section is not overhead — it is the build.

---

## 9. Confidence scores

| Dimension | Score | Notes |
|---|---|---|
| Documentation completeness | 9.5/10 | 350+ docs, all major decisions pre-made |
| Existing codebase quality | 7.5/10 | Works, but 10k lines is complex |
| Design system clarity | 9/10 | Tokens, themes, vibes all specced |
| Process discipline (PROCESS.md) | 8/10 | Process is there — discipline is a human choice |
| Copy system | 8.5/10 | VOICE-BIBLE.md + DECISION-LOG locked |
| GDPR / legal readiness | 2/10 | Not implemented — P0 |
| Mobile testing coverage | 5/10 | Playwright = Chromium only. Real device needed |
| Theme test coverage | 6/10 | Manual process, 16 combinations |
| Build verification loop | 8/10 | Parse-check + Playwright specified |
| Regression risk | 6/10 | Large files, shared patterns, manual process |

**Overall build confidence: 7.5/10**

The 2.5-point gap is honest:
- 1 point: GDPR not implemented (fixable in 1 hour)
- 0.75 points: No real device testing yet (fixable in 1 day)
- 0.5 points: Theme coverage is manual (fixable with Playwright theme-switching tests)
- 0.25 points: Context window limits on 10k-line files (mitigated by parse-check, not eliminable)

**After P0s are fixed and real device tested: 9/10.**

The remaining 1 point is the honest cost of building something ambitious without a build pipeline, bundler, or automated test suite beyond Playwright screenshots.

---

## 10. Path to 10/10 build confidence

1. Fix GDPR consent (1 hour) → +1 point
2. Real device test after first Playwright pass (1 day) → +0.75 points
3. Add theme-switching Playwright tests (2 hours) → +0.5 points
4. Add `safeGet()`/`safeSet()` wrappers before any localStorage read (1 hour) → builds error-state confidence
5. Fix `able_profile` / `able_v3_profile` key conflict (30 minutes) → removes data corruption risk

**With those 5 things done before the first artist uses the product: build confidence = 9.5/10.**

The remaining 0.5 is earned over time — through 10 artists using it, Playwright finding edge cases, and the codebase proving itself in production.

---

---

## 11. The Build Confidence Protocol

Run this checklist at the start of every major build session. All 8 items must pass before writing a single line of implementation code. If any fails, fix it before starting.

**This is not bureaucracy. It is the 8-minute check that prevents 8-hour debugging sessions.**

---

**1. Parse-check test — verify the JS toolchain is working**

Run:
```bash
node -e "new Function('const x = 1; const y = x + 1; return y')();"
```
Expected: exits 0, no output. If this fails, Node is broken. Fix before proceeding.

When editing a file: after every JS block is written, run:
```bash
node -e "$(cat able-v7.html | grep -o '<script.*</script>' | head -1)"
```
Or, more reliably, extract the script block and parse-check it directly. Exit 0 = valid syntax. Non-zero = syntax error, do not commit.

---

**2. Git status — clean working tree before starting**

Run:
```bash
git status
```
Expected: "nothing to commit, working tree clean" or a clear list of only the files you intend to work on today.

If unexpected modified files appear: understand why before proceeding. Do not start a build session on a dirty tree — you will not know what you changed.

---

**3. Context check — read the spec before touching the file**

Open the relevant DESIGN-SPEC.md for today's file. Read the section(s) being worked on. Confirm:
- The section has a spec (if not, write the spec first)
- The current score for that section is known (from ANALYSIS.md)
- The target state is clear

This takes 3 minutes. It prevents 30-minute detours.

---

**4. localStorage key audit — confirm no key name drift**

Before touching any localStorage read/write, confirm the active key names against `CLAUDE.md §Data architecture`:
```
able_v3_profile  — artist profile
able_fans        — fan sign-ups
able_clicks      — CTA tap events
able_views       — page view events
able_gig_expires — gig mode expiry timestamp
able_shows       — shows list
able_dismissed_nudges — dismissed nudge IDs
able_starred_fans     — starred fan emails
```
If a read or write uses a key not in this list, it is either a new key (add it to CLAUDE.md) or a drift that will cause a data bug. Do not proceed without confirming.

---

**5. Playwright smoke — take a baseline screenshot before making changes**

Before editing any UI section, run a Playwright screenshot of the current state:
```javascript
// In Playwright MCP:
// Navigate to the page, rename the tab, take screenshot
// This is the "before" image.
```
After making changes, take another screenshot. Compare. The delta should be only what you intended to change.

Without the before screenshot, you cannot know what you changed vs. what was already there.

---

**6. Theme spot-check — verify the default dark theme renders correctly after any CSS change**

After any CSS change, open the file in a browser (or Playwright) and confirm:
- `[data-theme="dark"]` or default: the page renders correctly
- No new console errors related to CSS

If the change affects token variables (anything with `var(--...)`), also spot-check light theme:
```javascript
// Playwright: document.documentElement.setAttribute('data-theme', 'light')
// Take screenshot, confirm readability
```

The dark → light check costs 90 seconds. The alternative is discovering a light theme regression when a real user reports it.

---

**7. Mobile width check — confirm 375px has no horizontal scroll**

After any layout change, run:
```javascript
// Playwright:
// await page.setViewportSize({ width: 375, height: 812 })
// await page.screenshot({ path: 'mobile-check.png' })
// document.documentElement.scrollWidth > document.documentElement.clientWidth — must be false
```

Or manually resize the browser to 375px. Any horizontal scroll at 375px is a blocking bug. Do not move to the next section until this passes.

---

**8. Copy calibration — run the banned-phrase check before committing any text change**

Before committing any UI text change, scan the changed text against the CLAUDE.md banned phrases:
```
"Turn fans into superfans" / "Grow your audience" / "Monetise your fanbase" /
"Engage your followers" / "Content creator" / "Going viral" / exclamation marks in dashboard copy /
Generic SaaS micro-copy ("Get started!", "You're all set!")
```

Also confirm: is this text in the artist's voice (first person) where it should be? Does it sound like something a real person would say, or like a SaaS template?

This check costs 30 seconds per text change. It protects the single most important characteristic of ABLE.

---

**Protocol summary:**

| Item | Tool | Time | Pass criterion |
|---|---|---|---|
| 1. Parse-check test | `node -e` | 30s | Exit 0 |
| 2. Git status | `git status` | 10s | Clean tree or known state |
| 3. Context check | Read DESIGN-SPEC.md | 3 min | Section spec read and score known |
| 4. localStorage key audit | CLAUDE.md §Data | 1 min | All keys match canonical list |
| 5. Playwright baseline screenshot | Playwright MCP | 2 min | "Before" image captured |
| 6. Theme spot-check | Browser / Playwright | 90s | Dark theme renders, no console errors |
| 7. Mobile width check | Playwright 375px | 1 min | No horizontal scroll |
| 8. Copy calibration | Banned phrase scan | 30s | Zero banned phrases, voice correct |

**Total: ~10 minutes.** Every major build session should begin with this protocol complete.

---

## 12. Confidence by Page

Scores are based on the current implementation state and the specific risk profile of each file.

---

### `able-v7.html` — Artist public profile

**Current confidence: 7/10**

**What gives confidence:**
- The file exists and works. 10,214 lines of functional code. Spring physics, theme system, CTA zones, campaign states, bottom sheet pattern — all implemented.
- Design token architecture means most visual changes are additive. Changing `--color-accent` changes the whole page. No hunt-and-replace for individual colour values.
- Section-by-section structure (hero, music, events, merch, world map, fan capture) means changes are mostly isolated to their section.
- Playwright test loop is proven: write → parse-check → screenshot → compare works on this file.

**What is the specific risk:**
- 10,214 lines is genuinely large. A change to a shared utility function (e.g. `safeGet()`, `isSafeUrl()`, `escHtml()`) at line 400 can break something at line 9,000. This is the hardest class of bug to catch — it passes parse-check and may pass a targeted Playwright screenshot test but fails in a specific user flow.
- The World Map section (lines ~5900–6450) has the highest internal complexity: 9 moment types, 4 access levels, multi-moment panels, featured moment logic, swipe navigation, focus trap. Any change here needs its own isolated Playwright test, not just a page-level screenshot.
- Glass theme uses `backdrop-filter: blur(28px)` — this works in Chromium (Playwright) but has known Safari performance issues. Safari testing is not automated.

**Confidence ceiling without specific mitigations:** 7/10. With P0 fixes (GDPR consent, oEmbed hostname allowlist, OG image) and real Safari test: 8.5/10.

---

### `admin.html` — Artist dashboard

**Current confidence: 7.5/10**

**What gives confidence:**
- 5,936 lines — significantly smaller than able-v7.html. Sections are well separated: Campaign HQ, Analytics, Fan List, Shows, Your World, Connections.
- The admin page does not need to handle 4 themes — it uses its own design system (amber `--acc`, Plus Jakarta Sans, `--bg: #09090f`). Fewer theme combinations to test.
- Bottom sheet component is proven across multiple sections. The shared `openAdminSheet()` / `closeAdminSheet()` pattern reduces duplication.
- localStorage write path is clear: almost all mutations go through `saveProfile()` → `syncProfile()`. This makes data flow easier to trace.

**What is the specific risk:**
- The admin page has the most business-logic density in the product. Campaign state switching, gig mode with expiry countdown, fan list filtering + starring + sorting, show CRUD, moment CRUD, nudge dismissal — all in one file. A change to the campaign state logic can have unexpected side effects on the UI rendering.
- The "Your World" moment list has a known type vocabulary mismatch with the canonical model (ANALYSIS.md §Dimension 5). A build session that adds moment types without reconciling the canonical model will widen this gap.
- No test for the edge case of 0 fans / 0 shows / 0 moments — the empty state behaviours need explicit Playwright tests, not assumption.

**Confidence ceiling:** 7.5/10 currently. With edit-moment functionality added and canonical type reconciliation done: 8.5/10.

---

### `start.html` — Onboarding wizard

**Current confidence: 8/10**

**What gives confidence:**
- The wizard has 3 clearly separated steps plus a done screen. Scope is bounded. A change to Step 1 does not touch Step 3.
- The wizard writes to `able_v3_profile` (via `able_profile` → migration function). This is a known data flow.
- Onboarding completion rate is the single most important metric for this page. The UX is deliberately minimal — fewer things to break.
- The live preview (artist's profile updates as they fill in the wizard) is the riskiest dynamic element, but it reads from the wizard's local state, not from localStorage. Clean data path.

**What is the specific risk:**
- The `able_profile` → `able_v3_profile` key conflict. The migration function is specced (8 lines, in BUILD-CONFIDENCE.md §3.4) but it is not yet implemented. If a user completes the wizard on a device that has an old `able_profile` key from the v1 wizard, their data will be in the wrong key and admin.html will show an empty profile.
- The done screen's share options (copy link, WhatsApp, Instagram story share) involve `navigator.share()` API which behaves differently across browsers and platforms. Safari, Chrome, and Chrome-on-Android all handle this differently. Test on at least 2 browsers before calling this done.

**Confidence ceiling:** 8/10 currently. With `able_profile` migration function implemented and share API tested: 9/10.

---

### `landing.html` — Marketing landing page

**Current confidence: 8.5/10**

**What gives confidence:**
- Landing page is the most static file in the build. It does not read from localStorage, does not have complex state machine, does not have bottom sheets or campaign modes.
- The conversion goal is single: get an artist to click "Get started" → `start.html`. The CTA is the only critical path.
- OG image meta tag is the one known issue (currently `data:` URI instead of a hosted image URL). This is a known, bounded fix.
- No localStorage writes. If something breaks on this page, it does not break the artist's data.

**What is the specific risk:**
- Copy regression risk is higher on this page than anywhere else, because it is the first thing a new artist sees and the tone sets their expectation for the whole product. A single exclamation mark in a hero headline, or a "grow your audience" phrase sneaking in, would be a copy regression that CLAUDE.md explicitly prohibits.
- The OG image being a `data:` URI means the link preview on Twitter/X, LinkedIn, and iMessage does not work. This is the most visible broken state for an unfamiliar visitor sharing the link. It blocks organic word-of-mouth before it even starts.
- Responsiveness at 375px: the landing page has the most content-dense sections. Hero, features grid, testimonials, pricing — any of these can break horizontal scroll at 375px if a content element has a fixed width.

**Confidence ceiling:** 8.5/10 currently. With OG image fixed and a Playwright 375px check run: 9.5/10.

---

### Page confidence summary

| Page | Current | After P0 fixes | Ceiling |
|---|---|---|---|
| `able-v7.html` | 7/10 | 8.5/10 | 9.5/10 (after real Safari test) |
| `admin.html` | 7.5/10 | 8.5/10 | 9/10 (after edit-moment + canonical types) |
| `start.html` | 8/10 | 9/10 | 9.5/10 (after share API test) |
| `landing.html` | 8.5/10 | 9.5/10 | 9.5/10 |

**Overall build confidence after P0 fixes: 9/10** (from 7.5/10 currently).

The remaining 1 point is earned through real users and real devices — not through more spec writing.

---

*Updated: 2026-03-16*
