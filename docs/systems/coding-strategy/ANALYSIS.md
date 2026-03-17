# ABLE — Code Quality Analysis
**Honest assessment of the current codebase across all 4 active files.**
**Files assessed: `able-v7.html` (10,214 lines) · `admin.html` (5,936 lines) · `start.html` (1,958 lines) · `landing.html` (1,725 lines)**
**Date: 2026-03-16**

---

> This document is not a celebration of what's been built. It is an honest inventory of where the codebase stands and what needs to improve before build agents can be trusted to extend it without causing regressions. Scores are conservative. When in doubt, the lower score is more useful.

---

## 1. CSS Architecture — 7/10

**What "good" looks like:** Every colour, spacing value, and easing is a CSS custom property. No hardcoded values outside `:root`. Mobile-first breakpoints only. Theme tokens are declared once and cascade correctly through all four themes.

**Current state:**
- `able-v7.html` has a comprehensive, well-structured token system in `:root` (static tokens) with full spacing scale, typography scale, easing variables, duration variables, and state colours. This is the model all other files should follow.
- `admin.html` has a simpler but functional token set. The critical known bug: `--dash-t3` is `#888888` — it should be `#777777` per the design system spec. This hex also appears hardcoded inline at lines 182, 184, 536, 617, and in JS at line 3135 (`colour: '#888'`), bypassing the token system entirely.
- `start.html` and `landing.html` have lighter token sets that are functional but do not match the richness of `able-v7.html`. Some values that should be tokens are hardcoded.
- Breakpoint discipline is mostly correct: `able-v7.html` uses only 3 `min-width` media queries. `admin.html` uses a different pattern (sidebar + responsive layout).
- `touch-action: manipulation` confirmed on `*` in `able-v7.html`. Not confirmed on all other files.

**What drops this from 10:**
- Hardcoded `#888` / `#888888` appearing in multiple places in `admin.html`, bypassing `--dash-t3`
- Inconsistent token richness across files — `able-v7.html` is at a different quality level to the others
- Some inline style attributes used in `admin.html` for dynamic JS values where a data attribute + CSS would be cleaner

**Path to 10:**
1. Fix `--dash-t3: #888888` → `#777777` in `admin.html` `:root` (L44) and wherever `#888` appears outside of CSS custom property definitions
2. Audit `start.html` and `landing.html` for any hardcoded colours not covered by their `:root` blocks
3. Confirm `touch-action: manipulation` is on `*` in all four files

---

## 2. JS Architecture — 6/10

**What "good" looks like:** All JS blocks are parse-safe. All localStorage reads have fallbacks. All JSON.parse calls are inside try/catch. No globals. Event listeners attached after DOMContentLoaded. Debounced input handlers.

**Current state:**
- `able-v7.html`: 23 `try {}` blocks — defensive coverage is present but not universal. 13 `localStorage.getItem` calls, 7 of which use `|| defaultValue` pattern correctly. 6 bare reads remain a risk.
- `admin.html`: Has a comment noting debounce usage ("Debounce Supabase sync — don't fire on every keystroke") but no dedicated `debounce()` utility function was found in the file. Debounce is inline/commented. `DOMContentLoaded` used twice — correct.
- `start.html`: Has an `able_profile` legacy key fallback in one place (`safeLS('able_profile', {})`) — this is the key naming conflict documented in STATUS.md.
- JSON.parse safety: 7 uses of `JSON.parse(...||'null')` pattern in `admin.html` — but the total localStorage read count suggests many more reads need this treatment.
- No `document.write()`, no `eval()`, no unescaped `innerHTML` with user content found.
- External links use `rel="noopener noreferrer"` in `able-v7.html` (18 instances) but only 1 in `admin.html` — the admin dashboard opens several external URLs that are missing this.

**What drops this from 10:**
- Bare `localStorage.getItem()` calls without fallbacks — exact count not audited but present in all files
- Missing dedicated `debounce()` utility in `admin.html` — inline timing workarounds are fragile
- `able_profile` vs `able_v3_profile` key conflict still present in `start.html` (legacy fallback)
- Missing `rel="noopener noreferrer"` on several external links in `admin.html`, `start.html`, `landing.html`

**Path to 10:**
1. Audit all `localStorage.getItem()` calls across all 4 files — every one must have `|| fallback`
2. Add a named `debounce(fn, ms)` utility function near the top of `admin.html`'s script block
3. Resolve `able_profile` key: remove the legacy fallback read once confirmed no active wizard sessions use it
4. Grep all `target="_blank"` links — each must have `rel="noopener noreferrer"`

---

## 3. Mobile Compliance — 8/10

**What "good" looks like:** No horizontal scroll at 375px. All interactive elements ≥ 44px in both dimensions. `viewport-fit=cover` set. `overscroll-behavior: contain`. Keyboard does not hide primary actions on iOS Safari.

**Current state:**
- `able-v7.html`: `--tap-min: 44px` token exists and is referenced. `viewport-fit=cover` set. `touch-action: manipulation` on `*`. `overscroll-behavior` not confirmed in this audit — spot-check required.
- `admin.html`: Dashboard is designed for desktop-first (sidebar layout). Mobile layout collapses correctly but was not designed with 375px as primary — some admin panels may be tight. Tap targets in the sidebar and action buttons are variable.
- `start.html` and `landing.html`: Both are mobile-first. `start.html`'s wizard is single-column and designed for phone-first interactions.
- Lazy loading: `able-v7.html` has 11 `loading="lazy"` attributes. `admin.html` has 2. `start.html` and `landing.html` have 0 — this is partially acceptable for short pages but should be audited.

**What drops this from 10:**
- `admin.html` is not genuinely mobile-first — it is a desktop dashboard that collapses to mobile. Fine for v1, but tap targets in mobile admin view need auditing.
- `loading="lazy"` missing from `start.html` and `landing.html` images
- `overscroll-behavior: contain` not confirmed on all files

**Path to 10:**
1. Playwright audit: check every button in admin.html at 375px — confirm `getBoundingClientRect()` height ≥ 44px
2. Add `loading="lazy"` to all `<img>` tags below the fold in `start.html` and `landing.html`
3. Confirm `overscroll-behavior: contain` on `html` or `body` in all four files

---

## 4. Theme Compliance — 8/10

**What "good" looks like:** All four themes (Dark / Light / Glass / Contrast) render correctly on every section of every page. No dark-only assumptions. Glass theme works with backdrop-filter. Contrast theme is maximum legibility.

**Current state:**
- `able-v7.html`: Four themes are implemented, documented, and present throughout. The token cascade is correctly structured. `data-theme` attribute drives all theme switching. This is the reference implementation.
- `admin.html`: Uses `--dash-*` tokens for a distinct dashboard palette. The dashboard has its own light theme but does not implement the full four-theme system. This is intentional (admin is not themed by artist accent) but means the glass and contrast themes are absent.
- `start.html`: Onboarding wizard uses a subset of the profile tokens. Theme switching may not work correctly in onboarding — needs Playwright verification.
- `landing.html`: Marketing page is dark-only. Light theme is not implemented here. This is a known acceptable gap for the marketing page but should be documented.

**What drops this from 10:**
- `admin.html` glass and contrast themes absent — intentional but undocumented
- `start.html` theme coverage unverified by Playwright across all four themes
- `landing.html` is dark-only — no light or contrast theme

**Path to 10:**
1. Document explicitly in `admin.html` which themes are intentionally absent and why
2. Playwright verification: switch all four themes in `start.html`, screenshot every screen
3. Decide and document whether `landing.html` needs light/contrast themes (marketing page may never need them, but the decision should be explicit)

---

## 5. Accessibility — 6/10

**What "good" looks like:** WCAG 2.2 AA throughout. Focus management on modal/sheet open. `aria-label` on all icon-only buttons. Logical tab order. `aria-live` on dynamic content. Semantic HTML (`nav`, `main`, `section`). Focus rings visible in all four themes.

**Current state:**
- `able-v7.html`: 61 `aria-label` attributes — good coverage. 21 `prefers-reduced-motion` instances — strong motion accessibility. Focus rings: `focus-visible` pattern present but coverage is partial.
- `admin.html`: 19 `aria-label` attributes. `focus-visible` pattern confirmed (`*:focus:not(:focus-visible) { outline: none; } *:focus-visible { outline: 2px solid var(--acc); }`). `prefers-reduced-motion` absent from admin.html — animations in the dashboard do not respect this setting.
- `start.html` and `landing.html`: `focus-visible` present (2 instances each). `prefers-reduced-motion` present in both (1 and 4 instances respectively) but coverage is light.
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>` usage not confirmed in this audit — spot check required.
- `aria-live` on error messages: confirmed for `able-v7.html` (E11 delayed reveal pattern), but not confirmed on admin forms or wizard input validation.

**What drops this from 10:**
- `admin.html` has zero `prefers-reduced-motion` CSS — all dashboard animations (counter animation, stagger, etc.) play regardless of user preference
- `aria-live` on dynamic regions is partial — wizard screen transitions and admin toast messages need checking
- Focus management on bottom sheet / admin panel open is specced but not confirmed implemented in this audit
- axe-core has not been run on any of the four files in this build

**Path to 10:**
1. Add `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }` to `admin.html`
2. Run axe-core on all four files — fix all critical violations before shipping
3. Audit `aria-live` on: wizard screen transitions, admin toast messages, error messages in all forms
4. Confirm focus trap on bottom sheets in `able-v7.html` and `admin.html`

---

## 6. Performance — 7/10

**What "good" looks like:** LCP ≤ 2.5s. CLS = 0. No render-blocking resources. Fonts preloaded. Images lazy-loaded below fold. Service worker registered. No synchronous XHR.

**Current state:**
- `able-v7.html`: Font preloading confirmed (`rel="preload"` + `rel="stylesheet"` for DM Sans + Barlow Condensed). 11 lazy-loaded images. CSP header present. File size 78kB gzipped — well within budget.
- `admin.html`: Font loading without `rel="preload"` — fonts load synchronously. No service worker confirmed. 45kB gzipped.
- `start.html` and `landing.html`: Lightweight files (31kB and 18kB). No lazy loading on images.
- Lighthouse scores: not run in this audit. Known gap.
- No synchronous XHR in any file.
- The grain texture in `admin.html` (SVG data URI, `body::before`) is a tiny cost but is rendered on every page load with a fixed background-size — harmless.

**What drops this from 10:**
- Font preloading absent in `admin.html` — fonts may cause FOUT on first load
- Lighthouse not run — actual LCP/CLS numbers unknown
- Service worker not confirmed in any file — no offline capability or cache strategy
- `loading="lazy"` missing from `start.html` and `landing.html` images

**Path to 10:**
1. Add `<link rel="preload" as="style">` for fonts in `admin.html`, `start.html`, `landing.html`
2. Run Lighthouse on all four files — target 90+ Performance, 0 CLS
3. Implement service worker (basic cache strategy) — referenced in docs as planned but not confirmed built
4. Add `loading="lazy"` to below-fold images in all files that are missing it

---

## 7. Animation Quality — 8/10

**What "good" looks like:** Spring physics on press interactions and sheet openings. Decel easing on scroll entrances and tab switches. Consistent easing tokens used throughout (`--ease-spring`, `--ease-decel`). Stagger ≤ 50ms between sequential elements. `prefers-reduced-motion` disables all animation. No animation > 600ms except page state transitions.

**Current state:**
- `able-v7.html`: Spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) confirmed via `--ease-spring` token. 21 `prefers-reduced-motion` instances — comprehensive coverage. Specific animations documented in STATUS.md (pill entrance, CTA flash, bio error reveal, pre-release ambient, etc.) — all confirmed built. Stagger patterns present (50ms, confirmed).
- `admin.html`: Spring and ease tokens present (`--spring`, `--ease`). Animation quality is good but `prefers-reduced-motion` is absent — a known regression (scored in §5 above).
- `start.html`: E10 progress bar spring easing confirmed. Animation coverage light compared to `able-v7.html`.
- `landing.html`: Animation usage is conservative — appropriate for a marketing page. `prefers-reduced-motion` present (4 instances).

**What drops this from 10:**
- `admin.html` animations do not respect `prefers-reduced-motion` — P0 accessibility bug that also affects animation quality score
- Easing token names are inconsistent: `able-v7.html` uses `--ease-spring` / `--ease-decel`, while `admin.html` uses `--spring` / `--ease` — same values, different names. A build agent could use the wrong token in the wrong file.

**Path to 10:**
1. Fix `prefers-reduced-motion` in `admin.html` (see §5)
2. Decide on canonical easing token names and document them in `docs/systems/DESIGN_SYSTEM_SPEC.md` — then audit all four files for consistency
3. Verify no animation exceeds 600ms outside of documented exceptions

---

## 8. Error Handling — 6/10

**What "good" looks like:** Every JSON.parse has a try/catch. Every localStorage read has a fallback. Network failures (API calls to Netlify functions) show graceful degradation states. Malformed data from a previous session does not break the current session.

**Current state:**
- `able-v7.html`: 23 `try {}` blocks — present but likely not universal. 7 localStorage reads with `|| fallback` pattern. The file has 13 `localStorage.getItem` calls — several without visible fallbacks in this audit.
- `admin.html`: More complex data handling. `JSON.parse(...|| 'null')` pattern used 23 times. `try/catch` around JSON operations. Error handling for Netlify function calls (Spotify import, oEmbed proxy) — graceful fallback states specced and partially implemented.
- `start.html`: Wizard draft recovery logic present (checks `able_wizard_draft` age). Error handling on import flows documented in spec but build completeness unconfirmed.
- `landing.html`: Minimal data operations — error handling less critical here.

**What drops this from 10:**
- Bare `localStorage.getItem()` calls without fallbacks present in all files — exact count requires full audit
- `start.html` import error states (amber fallback state) — confirmed specced, build completeness unconfirmed
- `able_profile` key (legacy) read in `start.html` without handling the case where the key exists but has incompatible schema (old wizard data)

**Path to 10:**
1. Full audit: grep every `localStorage.getItem` call across all 4 files — wrap bare reads
2. Test with empty localStorage (private/incognito) — does every page load without errors?
3. Test with malformed localStorage data (manually corrupt a key) — does every page degrade gracefully?
4. Confirm import flow error states are built and Playwright-verified in `start.html`

---

## 9. Data Integrity — 7/10

**What "good" looks like:** Canonical localStorage keys used everywhere (no variants, no typos). All mutations call sync functions. Fan data has FIFO cap (max 200 records for clicks/views). No key invented without being added to the canonical list. Supabase migration is trivial because keys map 1:1 to table rows.

**Current state:**
- Canonical key list in CONTEXT.md is authoritative and well-documented.
- `able_v3_profile` vs `able_profile` conflict: `start.html` reads `able_profile` as a legacy fallback (`safeLS('able_profile', {})`). This is documented as a known gap. The risk is low (wizard-only fallback) but it is a canonical violation that should be resolved.
- `able_shows`, `able_dismissed_nudges`, `able_starred_fans` — confirmed in CONTEXT.md and STATUS.md but not in this code audit.
- `able_wizard_draft` — used in `start.html` for session recovery. Not in the canonical CONTEXT.md key list as of this audit.
- All mutations in `admin.html` call `syncProfile()` — confirmed in session 6 fix list.
- FIFO cap on `able_clicks` and `able_views`: documented in SPEC.md, implementation not confirmed in this audit.

**What drops this from 10:**
- `able_profile` legacy read in `start.html` — canonical violation, even if low risk
- `able_wizard_draft` not in canonical key list in CONTEXT.md
- FIFO cap implementation not confirmed via code audit — needs grep + Playwright verification

**Path to 10:**
1. Add `able_wizard_draft` to the canonical key list in CONTEXT.md
2. Remove the `able_profile` legacy read from `start.html` once confirmed safe to do so
3. Grep for `able_clicks` and `able_views` writes — confirm FIFO cap (max 200 records) is implemented

---

## 10. Commenting and Readability — 7/10

**What "good" looks like:** Section headers in CSS with doc references. Function names are self-explanatory. Complex logic has a one-line comment explaining "why", not "what". Magic numbers are either tokens or have a comment. No dead code.

**Current state:**
- `able-v7.html`: Strong CSS commenting — section headers reference the authority doc (`/* === §3.3 STATIC TOKENS === */`) and the build checkpoint. JS function names are descriptive (`applyIdentity`, `syncProfile`, `renderFanCapture`). Complex logic (e.g. ambient intensification formula, H9) is commented with the spec reference.
- `admin.html`: CSS is less commented than `able-v7.html`. JS has function-level comments but fewer inline explanations for complex operations.
- `start.html` and `landing.html`: Lighter files with proportionally lighter commenting — appropriate for their size.
- Magic numbers: easing cubic-bezier values are stored as tokens and named. Duration values are tokens. Some pixel values appear without token equivalents (e.g. specific layout values in admin).
- Dead code: not audited. Files have grown organically and may contain unreferenced CSS selectors or unused JS functions.

**What drops this from 10:**
- `admin.html` CSS commenting does not match the quality of `able-v7.html` — harder for a build agent to navigate
- Dead code not audited — in 10,000+ line files, unreferenced code is likely present
- Some magic pixel numbers in `admin.html` that should either be tokens or have explanatory comments

**Path to 10:**
1. Audit `admin.html` CSS for uncommented sections — add section headers matching `able-v7.html` pattern
2. Run a dead code pass on all four files (look for CSS classes defined but never referenced in HTML; JS functions defined but never called)
3. Document any magic numbers in `admin.html` that are not tokens

---

## Summary scorecard

| Dimension | Score | Primary gap |
|---|---|---|
| CSS architecture | 7/10 | `#888` hardcoded in admin.html, token inconsistency across files |
| JS architecture | 6/10 | Bare localStorage reads, missing debounce utility, key conflict |
| Mobile compliance | 8/10 | admin.html tap targets unaudited, lazy loading gaps |
| Theme compliance | 8/10 | admin.html glass/contrast absent, landing.html dark-only |
| Accessibility | 6/10 | admin.html missing prefers-reduced-motion, axe-core not run |
| Performance | 7/10 | Font preloading gaps, Lighthouse not run, no service worker |
| Animation quality | 8/10 | admin.html prefers-reduced-motion bug, token name inconsistency |
| Error handling | 6/10 | Bare localStorage reads, import error state build unconfirmed |
| Data integrity | 7/10 | Legacy key read, wizard draft key not in canonical list |
| Commenting + readability | 7/10 | admin.html CSS uncommenting, dead code unaudited |
| **Overall** | **7/10** | **Primary: accessibility + JS safety. Secondary: cross-file consistency.** |

---

## The single most important improvement

Fix the accessibility gap in `admin.html` first. Add `@media (prefers-reduced-motion: reduce)` and run axe-core. This affects a real category of users (vestibular disorder, epilepsy) and is a WCAG 2.2 AA legal requirement. Every other gap in this doc is a quality issue. This one is a compliance issue.

The second most important: audit and fix all bare `localStorage.getItem()` calls. Real users arrive with corrupted or absent localStorage data. A single unguarded read can break the entire page silently.
