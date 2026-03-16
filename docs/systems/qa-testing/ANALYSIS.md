# ABLE — QA Coverage Analysis
**Created: 2026-03-16 | Current overall score: 2/10**

> This is the baseline audit. It scores current QA coverage across 8 dimensions before any structured test suite exists. The purpose is to document the gap honestly so the SPEC.md and PATH-TO-10.md can address it precisely.

---

## Summary

| Dimension | Score | Status |
|---|---|---|
| 1. Unit test coverage | 0/10 | No test files exist |
| 2. Integration tests | 1/10 | Manual only — no automation |
| 3. Visual regression | 1/10 | Playwright configured, no snapshot tests |
| 4. Interaction tests | 2/10 | 5 tests specced in MICRO_INTERACTIONS_PATH_TO_10.md, not wired |
| 5. Accessibility tests | 1/10 | Checklist exists in DESIGN-SPEC.md §16, not automated |
| 6. Performance tests | 0/10 | No Lighthouse runs in CI or ad hoc |
| 7. Copy/content tests | 0/10 | Banned phrase list exists, no scanner |
| 8. Cross-browser tests | 2/10 | Playwright MCP installed, no browser matrix defined |

**Overall: ~2/10**

---

## Dimension 1 — Unit test coverage (0/10)

**What exists:** None. All business logic lives as inline `<script>` blocks in HTML files. No `.js` modules, no test runner, no Jest/Vitest configuration.

**Critical untested functions:**

- `getLifecycleStage()` — determines home page layout, wrong result is catastrophic
- `buildGreetingSub()` — 6 conditional branches, each with different date arithmetic
- `resolveStats()` — reads 3 localStorage keys, computes deltas, manages skeleton state
- `checkAndShowMilestone()` — once-per-threshold logic with localStorage guard
- `exportFansCSV()` — data integrity risk if email encoding is wrong
- `calcViewStreak()` — streak calculation over 7-day rolling window
- Auto-switch state logic: `if now < releaseDate → pre-release; if now < releaseDate + 14d → live`

**Risk:** Any regression in date arithmetic or localStorage reads is invisible until a user encounters it.

---

## Dimension 2 — Integration tests (1/10)

**What exists:** No automated cross-page tests. Manual verification is done ad hoc via browser.

**Critical untested flows:**

- `start.html` writes `able_v3_profile` → `admin.html` reads and renders profile data correctly
- Fan signs up on `able-v7.html` → fan appears in `admin.html` Fans page with correct timestamp
- Gig mode toggled in `admin.html` → `able-v7.html` renders gig state with "on tonight" tag
- Campaign state set in `admin.html` → `able-v7.html` reflects correct state (pre-release/live/profile)
- `able_gig_expires` Unix timestamp expires → `able-v7.html` reverts to profile state automatically

**Score basis:** 1/10 because one journey (start → profile) was manually verified during v3 development. No test records exist.

---

## Dimension 3 — Visual regression tests (1/10)

**What exists:** Playwright MCP is configured. `screenshots/` directory exists as Playwright audit output. No baseline snapshots established. No comparison tests written.

**Critical untested visual states:**

- All 4 themes (dark/light/glass/contrast) on `able-v7.html` — 4 × 1 = 4 baseline screenshots needed
- All 4 campaign states (profile/pre-release/live/gig) on `able-v7.html` — 4 more
- Admin home at day-1 zero state vs. active state
- Mobile (375px) vs. desktop (1280px) layout for admin sidebar/bottom-nav split
- Gold lock (blur overlay) pattern on Pro-gated features
- Skeleton shimmer state vs. resolved state

**Score basis:** 1/10 because Playwright is installed, giving the capability. No baselines means any visual regression is silent.

---

## Dimension 4 — Interaction tests (2/10)

**What exists:** `docs/systems/MICRO_INTERACTIONS_PATH_TO_10.md` contains 5 Playwright test patterns with pseudocode (scale-down on press, tab indicator spring, bottom sheet slide-up, focus ring glow, view-transition guard). These are specifications, not wired test files.

**30+ interactions implemented in `able-v7.html`** — confirmed in `MICRO_INTERACTIONS_SPEC.md`. None have automated tests.

**Critical untested interactions:**

- Scale-down on press (0.97 transform) — B1
- Tab sliding indicator spring with overshoot — C1
- Countdown digit flip (split-flap clock) — C5
- Bottom sheet swipe-to-dismiss — B9
- Fan sign-up spring confirmation + confetti — E9, G1
- Sticky artist bar trigger at 70% hero scroll — A4
- Campaign HQ state button spring — NEW-1
- Greeting sub-line cross-fade — NEW-6

**Score basis:** 2/10 because the test patterns exist as written specs. The gap is wiring them into a test runner.

---

## Dimension 5 — Accessibility tests (1/10)

**What exists:** `docs/pages/admin/DESIGN-SPEC.md §16` contains a written accessibility checklist (9 items). Not automated. `prefers-reduced-motion` compliance is noted in the micro-interactions spec.

**Critical untested accessibility requirements (from spec):**

- All interactive elements have min 44px tap targets (CLAUDE.md working rule #3)
- `*:focus-visible` glow ring visible on every interactive element
- All images have `alt` text
- `aria-label` on all icon-only buttons
- `aria-hidden="true"` on skeleton shimmer elements
- `role="navigation"` + `aria-label` on bottom tab bar
- Campaign bottom sheet has focus trap on open, returns focus on close
- Mini phone preview iframe has `tabindex="-1"` + `aria-hidden="true"`
- `prefers-reduced-motion` disables all CSS animations and JS-driven transforms

**WCAG target:** AA (2.1). Current coverage: unknown.

**Score basis:** 1/10 because the checklist exists and was written against real spec decisions. No scanner has run.

---

## Dimension 6 — Performance tests (0/10)

**What exists:** No Lighthouse runs on record. No performance budget defined in any spec doc.

**Known performance considerations:**

- `able-v7.html` is a single large HTML file — parse time risk
- `backdrop-filter: blur(28px) saturate(180%)` on glass theme — GPU cost
- `@font-face` for DM Sans, Barlow Condensed, Plus Jakarta Sans — FOUT risk
- Artwork `<img>` with no explicit `width`/`height` — CLS risk
- iFrame in Campaign HQ mini preview — nested document cost

**Target budget (from task brief):** LCP ≤ 2.5s, CLS ≤ 0.1. No INP target set — should be ≤ 200ms per Web Vitals spec.

**Score basis:** 0/10. No tooling, no budget, no runs.

---

## Dimension 7 — Copy/content tests (0/10)

**What exists:** `docs/systems/copy/SPEC.md` and `CLAUDE.md` both list banned phrases. `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` has the full register. No automated scanner exists.

**Banned phrase list (from CLAUDE.md and design specs):**

- "dashboard" (artist-facing UI)
- "superfan" / "turn fans into superfans"
- "going viral"
- "monetise" / "monetize"
- "content creator"
- "engage your followers" / "engage"
- "newsletter" / "mailing list"
- "welcome aboard"
- "get started" (as a button or CTA)
- "you're all set"
- "upgrade to continue"
- Exclamation marks on dashboard copy

**Additional register rules not yet scannable:**

- Greeting must contain first name when available — requires DOM query
- Toast copy must be exactly: "Saved." / "Copied." / "Removed." — not variations

**Score basis:** 0/10. The list exists as documentation. No file has been parsed programmatically.

---

## Dimension 8 — Cross-browser tests (2/10)

**What exists:** Playwright MCP is configured for Chromium (the default). No multi-browser configuration. `@view-transition` browser support gap is documented in `MICRO_INTERACTIONS_PATH_TO_10.md` — Chrome 126+ only for shared element transitions.

**Required browser matrix:**

| Browser | Engine | Priority | Known risk |
|---|---|---|---|
| Chrome 126+ | Blink | P0 | Primary dev browser — baseline |
| Safari 17+ (iOS) | WebKit | P0 | Primary user browser (mobile-first product) |
| Firefox 124+ | Gecko | P1 | `@view-transition` fallback must be clean |
| Chrome Android | Blink | P1 | Mobile viewport, touch interactions |
| Safari iOS (375px) | WebKit | P0 | Tap target testing, safe-area-inset |

**Specific cross-browser risks:**

- `@view-transition` / `view-transition-name` — Chrome only, needs `@supports` guard
- `backdrop-filter` on glass theme — Safari requires `-webkit-backdrop-filter`
- `env(safe-area-inset-bottom)` — iOS Safari critical for bottom tab bar
- `color-mix()` — baseline Chrome/Safari; Firefox 113+
- CSS `@property` if used for animated custom properties — patchy support

**Score basis:** 2/10 because Playwright is installed and runs Chromium. Safari and Firefox are not in any test run.

---

## What closes the gap

Reaching 8/10 overall requires:

1. A `tests/` directory with `.spec.js` files Playwright can discover
2. A Node script that parses HTML files for banned phrases
3. Lighthouse CLI run on the 4 active pages with a budget assertion
4. At minimum, Playwright running in 3 browsers (Chromium, Firefox, WebKit)
5. localStorage state injection helpers so tests can set up pre-conditions without UI walkthroughs

Reaching 9/10 additionally requires:

6. Screenshot baselines for all 4 themes × 4 pages
7. Accessibility audit via `axe-playwright` or equivalent
8. CI equivalent (pre-commit hook or git hook that runs smoke tests)

Reaching 10/10 requires real CI (GitHub Actions or Netlify build hooks) with test history.
