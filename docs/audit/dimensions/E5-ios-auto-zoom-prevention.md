# Dimension E5 — iOS Auto-Zoom Prevention
**Category:** Mobile UX & Touch
**Phase:** 3 (Mobile)
**Status:** Not started

iOS Safari automatically zooms the viewport when any input field has a font size smaller than 16px. This zoom persists even after the user taps away from the field, leaving the page awkwardly scaled until the user manually pinches out. The fix is simple and universal: every `<input>`, `<textarea>`, and `<select>` element must render at 16px or larger. This applies inside modals, bottom sheets, inline forms, and search bars — any focusable field anywhere on the page. Full compliance means every input on all four ABLE pages has been audited, every field that previously used 14px (a common mistake) has been corrected, and the fix is enforced via a CSS rule that targets the base input selector so future additions don't regress.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Set `font-size: 16px` on the fan email capture `<input>` on V8 if it is currently below 16px | V8 | 5 | 1 | L | 1 |
| 2 | Add a global CSS rule `input, textarea, select { font-size: max(16px, 1rem); }` as a defensive base rule on V8 | V8 | 5 | 1 | L | 1 |
| 3 | Add a global CSS rule `input, textarea, select { font-size: max(16px, 1rem); }` as a defensive base rule on `admin.html` | ADM | 5 | 1 | L | 1 |
| 4 | Add a global CSS rule `input, textarea, select { font-size: max(16px, 1rem); }` as a defensive base rule on `start.html` | STR | 5 | 1 | L | 1 |
| 5 | Add a global CSS rule `input, textarea, select { font-size: max(16px, 1rem); }` as a defensive base rule on `landing.html` | LND | 5 | 1 | L | 1 |
| 6 | Audit every `<input>` in `admin.html` CTA editor modal and ensure none are styled below 16px | ADM | 5 | 1 | L | 1 |
| 7 | Audit every `<input>` in `admin.html` snap card editor and ensure none are styled below 16px | ADM | 5 | 1 | L | 1 |
| 8 | Audit every `<input>` in `admin.html` event/show editor and ensure none are styled below 16px | ADM | 5 | 1 | L | 1 |
| 9 | Audit every `<input>` in `admin.html` profile edit modal and ensure none are styled below 16px | ADM | 5 | 1 | L | 1 |
| 10 | Audit every `<input>` in `start.html` wizard steps 1 through 6 and ensure none are styled below 16px | STR | 5 | 1 | L | 1 |
| 11 | Audit `landing.html` email signup field and ensure font size is 16px or larger | LND | 5 | 1 | L | 1 |
| 12 | Check that the CSS rule for `input` in `admin.html` does not use `font-size: 0.875rem` (14px at base 16) | ADM | 5 | 1 | L | 1 |
| 13 | Check that the CSS rule for `input` in V8 does not use `font-size: 0.875rem` (14px at base 16) | V8 | 5 | 1 | L | 1 |
| 14 | Check that the CSS rule for `input` in `start.html` does not use `font-size: 0.875rem` | STR | 5 | 1 | L | 1 |
| 15 | Ensure that any `small` or `caption` CSS class applied to form inputs does not reduce font size below 16px | ALL | 5 | 1 | L | 1 |
| 16 | Confirm that `<select>` elements on `admin.html` (tier selector, genre picker) render at 16px or larger | ADM | 4 | 1 | L | 1 |
| 17 | Confirm that `<select>` elements on `start.html` (genre picker, vibe picker) render at 16px or larger | STR | 4 | 1 | L | 1 |
| 18 | Confirm that `<textarea>` in the `admin.html` bio editor renders at 16px or larger | ADM | 4 | 1 | L | 1 |
| 19 | Confirm that `<textarea>` in the `admin.html` snap card body editor renders at 16px or larger | ADM | 4 | 1 | L | 1 |
| 20 | Confirm that `<textarea>` in the `start.html` bio input step renders at 16px or larger | STR | 4 | 1 | L | 1 |
| 21 | Confirm that the accent colour hex `<input>` in `admin.html` renders at 16px or larger | ADM | 4 | 1 | L | 1 |
| 22 | Confirm that the release date `<input type=date>` in `admin.html` renders at 16px or larger | ADM | 4 | 1 | L | 1 |
| 23 | Confirm that the ticket URL `<input>` in `admin.html` event editor renders at 16px or larger | ADM | 4 | 1 | L | 1 |
| 24 | Confirm that any search `<input>` on `admin.html` (fan list search, analytics filter) renders at 16px or larger | ADM | 4 | 1 | L | 1 |
| 25 | Confirm that any inline filter or search `<input>` on V8 renders at 16px or larger | V8 | 4 | 1 | L | 1 |
| 26 | Verify that no media query reduces any input font size below 16px at mobile viewport widths | ALL | 5 | 2 | M | 1 |
| 27 | Search all `@media` blocks in V8 for any `font-size` applied to `input` or `textarea` that results in sub-16px | V8 | 5 | 1 | L | 1 |
| 28 | Search all `@media` blocks in `admin.html` for any `font-size` applied to `input` or `textarea` that results in sub-16px | ADM | 5 | 1 | L | 1 |
| 29 | Search all `@media` blocks in `start.html` for any `font-size` applied to `input` or `textarea` that results in sub-16px | STR | 5 | 1 | L | 1 |
| 30 | Ensure that the base `font-size` on `<html>` is exactly 16px (not 62.5% or 10px) so `1rem` = 16px across all pages | ALL | 5 | 1 | L | 1 |
| 31 | If `html { font-size: 62.5% }` is used as a rem-reset trick, either remove it or set inputs to `font-size: 1.6rem` to compensate | ALL | 5 | 1 | L | 1 |
| 32 | Confirm that the CSS custom property `--font-size-input` (if it exists) resolves to 16px or larger | ALL | 4 | 1 | L | 1 |
| 33 | Use `font-size: clamp(16px, 4vw, 18px)` rather than a fixed 16px for inputs to allow graceful scaling at larger viewports | ALL | 3 | 1 | L | 3 |
| 34 | Audit the ABLE design token `--font-size-sm` — if it is 14px, do not apply it to any input element | ALL | 5 | 1 | L | 1 |
| 35 | Audit the ABLE design token `--font-size-xs` — if it is 12px or smaller, ensure it is never applied to inputs | ALL | 5 | 1 | L | 1 |
| 36 | Add a JS assertion in development mode that logs a warning if any focused `<input>` has a computed `fontSize` below 16px | ALL | 3 | 2 | M | 4 |
| 37 | Add a Playwright test that iterates over every `<input>` on V8 and asserts `window.getComputedStyle(el).fontSize >= '16px'` | V8 | 4 | 3 | M | 3 |
| 38 | Add a Playwright test that iterates over every `<input>` on `admin.html` and asserts computed font size is at least 16px | ADM | 4 | 3 | M | 3 |
| 39 | Add a Playwright test that iterates over every `<input>` on `start.html` and asserts computed font size is at least 16px | STR | 4 | 3 | M | 3 |
| 40 | Add a Playwright test that iterates over every `<input>` on `landing.html` and asserts computed font size is at least 16px | LND | 3 | 2 | M | 3 |
| 41 | Verify the fix on a physical iPhone SE (375px) — focus the email field on V8 and confirm no zoom occurs | V8 | 5 | 1 | L | 2 |
| 42 | Verify the fix on a physical iPhone 14 (390px) — focus the email field on V8 and confirm no zoom occurs | V8 | 5 | 1 | L | 2 |
| 43 | Verify on iPhone SE that `start.html` wizard step 1 (name input) does not zoom on focus | STR | 4 | 1 | L | 2 |
| 44 | Verify on iPhone SE that `admin.html` CTA editor URL field does not zoom on focus | ADM | 4 | 1 | L | 2 |
| 45 | Verify on iPhone SE that `admin.html` snap card title field does not zoom on focus | ADM | 4 | 1 | L | 2 |
| 46 | Verify on iPhone SE that `landing.html` email capture field does not zoom on focus | LND | 4 | 1 | L | 2 |
| 47 | Confirm that placeholder text in inputs also renders at 16px by targeting `::placeholder` pseudo-element with `font-size: inherit` | ALL | 3 | 1 | L | 2 |
| 48 | Ensure that `::placeholder` colour meets WCAG AA contrast ratio against the input background in all themes | ALL | 3 | 1 | L | 2 |
| 49 | Confirm that zooming does not occur in any of the four themes (dark, light, glass, contrast) on V8 | V8 | 4 | 2 | M | 2 |
| 50 | In the glass theme on V8, confirm that the `backdrop-filter` on the fan capture bar does not inherit a reduced font size | V8 | 3 | 1 | L | 2 |
| 51 | In the contrast theme on V8, confirm that high-contrast input styles do not inadvertently set a small font size | V8 | 3 | 1 | L | 2 |
| 52 | Confirm that inputs inside `<dialog>` elements on `admin.html` inherit the 16px minimum and are not reset by a dialog base style | ADM | 4 | 1 | L | 2 |
| 53 | Confirm that inputs inside absolutely-positioned dropdowns or autocomplete panels on `admin.html` also meet the 16px threshold | ADM | 3 | 1 | L | 2 |
| 54 | Confirm that inputs inside bottom sheet overlays on `admin.html` are not resized by the sheet's scoped CSS | ADM | 4 | 1 | L | 2 |
| 55 | Confirm that the colour picker hex input field inside a popover on `admin.html` is at least 16px | ADM | 3 | 1 | L | 2 |
| 56 | Check that no third-party embedded UI (e.g., future payment form) injects inputs smaller than 16px | ALL | 4 | 2 | M | 3 |
| 57 | If any third-party form is embedded, add a scoped override rule to ensure minimum 16px input font size | ALL | 4 | 2 | M | 3 |
| 58 | Confirm that `<input type=range>` sliders (if used) are not affected by the 16px rule in a way that distorts their visual appearance | ALL | 2 | 1 | L | 4 |
| 59 | Confirm that `<input type=checkbox>` and `<input type=radio>` custom styled elements are not affected by the font-size rule | ALL | 2 | 1 | L | 4 |
| 60 | Confirm that the `font-size` fix does not make inputs taller in the layout than the design intends — adjust `line-height` and `padding` as needed | ALL | 3 | 2 | M | 2 |
| 61 | Confirm that increasing input font size to 16px does not cause the fan capture bar on V8 to exceed its allocated height | V8 | 4 | 1 | L | 2 |
| 62 | Confirm that increasing input font size to 16px on `start.html` does not push wizard step content below the viewport | STR | 3 | 2 | M | 2 |
| 63 | After increasing font sizes, re-test that all tap targets remain at 44px minimum height | ALL | 4 | 1 | L | 2 |
| 64 | Use `user-scalable=no` in the viewport meta tag only as a last resort — prefer fixing font sizes rather than disabling user zoom | ALL | 3 | 1 | L | 1 |
| 65 | Confirm that `user-scalable=no` is NOT present in any viewport meta tag on any ABLE page — this harms accessibility | ALL | 5 | 1 | L | 1 |
| 66 | Confirm that `maximum-scale=1` is NOT set in any viewport meta tag — this prevents iOS from auto-zooming but also prevents user-initiated zoom | ALL | 4 | 1 | L | 1 |
| 67 | If `maximum-scale=1` was previously used as an auto-zoom fix, remove it and fix font sizes instead — this is the correct approach | ALL | 5 | 2 | M | 1 |
| 68 | Document in a CSS comment block that the 16px minimum is an iOS Safari anti-zoom requirement, not a design preference | ALL | 2 | 1 | L | 5 |
| 69 | Add a CSS lint rule (if a linter is ever added) that flags `font-size` values below 16px on input selectors | ALL | 3 | 2 | M | 5 |
| 70 | Confirm that the font-size fix also applies to iOS Chrome (which uses WebKit under the hood and has the same zoom behaviour) | ALL | 3 | 1 | L | 2 |
| 71 | Confirm the fix applies to iOS Firefox (which also uses WebKit on iOS) | ALL | 3 | 1 | L | 2 |
| 72 | Confirm the fix applies correctly on iPadOS Safari — iPads don't auto-zoom but confirming the 16px rule does no harm | ALL | 2 | 1 | L | 3 |
| 73 | Verify that the fix does not break Android Chrome behaviour — Android also benefits from 16px inputs but handles zoom differently | ALL | 3 | 1 | L | 2 |
| 74 | Confirm that the ABLE admin dashboard font-size scale uses `--font-size-body: 16px` as the base token | ADM | 4 | 1 | L | 1 |
| 75 | Confirm that the artist profile font-size scale uses `--font-size-body: 16px` as the base token | V8 | 4 | 1 | L | 1 |
| 76 | Confirm that `start.html` uses `--font-size-body: 16px` or equivalent as its base token | STR | 4 | 1 | L | 1 |
| 77 | Confirm that `landing.html` uses `--font-size-body: 16px` or equivalent as its base token | LND | 4 | 1 | L | 1 |
| 78 | After applying all fixes, confirm that the visual weight of input text in the ABLE design system is unchanged | ALL | 3 | 2 | M | 3 |
| 79 | Consider using `font-size: 16px; transform: scale(0.875)` on inputs that must visually appear smaller — this tricks iOS while keeping the logical font size at 16px | ALL | 2 | 2 | M | 5 |
| 80 | Confirm that using `transform: scale()` on inputs (if chosen) does not break tap target size calculations | ALL | 3 | 2 | M | 5 |
| 81 | Confirm that `start.html` multi-step wizard does not briefly show a smaller font in inputs during step-transition animations | STR | 3 | 2 | M | 3 |
| 82 | Confirm that `admin.html` modal open animation does not briefly render inputs at a smaller computed size before settling | ADM | 3 | 2 | M | 3 |
| 83 | Add a note to `CONTEXT.md` or `docs/STATUS.md` that all inputs must be 16px minimum and must not regress | ALL | 3 | 1 | L | 4 |
| 84 | Add a QA checklist item: "Focus each form field on a physical iPhone and confirm no viewport zoom occurs" | ALL | 4 | 1 | L | 4 |
| 85 | After all fixes, run the full Playwright audit suite at 390px and confirm no visual regressions from the font-size changes | ALL | 4 | 2 | M | 4 |
| 86 | Confirm that the fan capture success state (post-submission) does not show a smaller font in any confirmation text | V8 | 3 | 1 | L | 3 |
| 87 | Confirm that read-only `<input readonly>` fields (if any) also meet the 16px threshold since they can still receive focus on iOS | ALL | 3 | 1 | L | 2 |
| 88 | Confirm that `<input disabled>` fields (if any) visually indicate they are disabled without reducing font size | ALL | 2 | 1 | L | 3 |
| 89 | Verify that the `admin.html` upgrade/tier prompt modal does not contain a small-font email confirmation input | ADM | 3 | 1 | L | 2 |
| 90 | Verify that any future Supabase auth UI (magic link email input) is also scoped to 16px minimum | ALL | 4 | 2 | M | 3 |
| 91 | Ensure the `netlify.toml` does not serve any CSS override that could reset input font sizes below 16px | ALL | 3 | 1 | L | 2 |
| 92 | Confirm the `shared/style.css` file (if it exists) sets the 16px input minimum so all pages inherit it | ALL | 4 | 1 | L | 1 |
| 93 | If `shared/style.css` does not exist, place the input 16px rule at the top of each page's `<style>` block as the first form-related rule | ALL | 4 | 1 | L | 1 |
| 94 | Run a grep for `font-size: 14` and `font-size: 0.875` across all four HTML files and flag every match that applies to an input context | ALL | 5 | 1 | L | 1 |
| 95 | Run a grep for `font-size: 12` and `font-size: 0.75` across all four HTML files and confirm none apply to input elements | ALL | 5 | 1 | L | 1 |
| 96 | Run a grep for `font-size: 13` across all four HTML files and confirm none apply to input elements | ALL | 4 | 1 | L | 1 |
| 97 | After fixing, capture a before/after Playwright screenshot of each form on mobile to visually verify the font size change is minimal | ALL | 3 | 2 | M | 4 |
| 98 | Confirm that no CSS `zoom: 0.875` or similar browser-zoom trick is applied to input containers, as this can re-introduce sub-16px effective sizes | ALL | 4 | 1 | L | 2 |
| 99 | Add `font-size: 16px` to the CSS design token docs as a documented constraint for all input elements | ALL | 3 | 1 | L | 4 |
| 100 | After full remediation, run a Lighthouse mobile audit and confirm no "tap targets too small" or zoom-related issues remain | ALL | 4 | 2 | M | 4 |
