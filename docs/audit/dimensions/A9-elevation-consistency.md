# Dimension A9 — Elevation Consistency
**Category:** Visual Design & Design System
**Phase:** 2 (Visual)
**Status:** Not started

Cards, modals, tooltips, and bottom sheets must each occupy a consistent and correct elevation tier, expressed through a documented `z-index` scale. No two unrelated components should share the same z-index value, and no component should use an arbitrarily large value (e.g. `9999`) unless it genuinely sits above everything else. Currently V8 uses values spanning `z-index: -1` through `z-index: 9999` with multiple components sharing `9999` (toast, tooltip, floating labels, a debug overlay) and `300` (two unrelated fixed elements). Admin.html uses values from `z-index: 0` through `z-index: 9000` with no apparent scale. Full compliance means a named z-index scale is defined as CSS custom properties (`--z-base`, `--z-card`, `--z-dropdown`, `--z-sheet`, `--z-modal`, `--z-tooltip`, `--z-toast`, `--z-overlay`) with values that never overlap between layers, and every `z-index` declaration in every page references one of these tokens.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Define a named z-index scale in `shared/style.css` or each page's `:root`: `--z-base:1`, `--z-card:10`, `--z-sticky:50`, `--z-dropdown:100`, `--z-sheet:200`, `--z-modal:300`, `--z-overlay:400`, `--z-tooltip:500`, `--z-toast:600` | ALL | 5 | 2 | L | 1 |
| 2 | Document the z-index scale with a rationale for each layer in a comment block above the definitions | ALL | 4 | 1 | L | 1 |
| 3 | Replace V8's `z-index: 9999` on the toast at line 5216 with `var(--z-toast)` | V8 | 5 | 1 | L | 1 |
| 4 | Replace V8's `z-index: 9999` on the floating debug overlay at line 937 with `var(--z-toast)` or a named `--z-debug: 9999` if it must be above everything | V8 | 4 | 1 | L | 1 |
| 5 | Replace V8's `z-index: 9999` tooltip at line 4889 with `var(--z-tooltip)` | V8 | 4 | 1 | L | 1 |
| 6 | Replace V8's `z-index: 9999` at line 4903 with `var(--z-tooltip)` | V8 | 4 | 1 | L | 1 |
| 7 | Replace V8's `z-index: 9999` at line 5040 with `var(--z-tooltip)` | V8 | 4 | 1 | L | 1 |
| 8 | Replace V8's `z-index: 9999` at line 10370 with `var(--z-toast)` | V8 | 4 | 1 | L | 1 |
| 9 | Replace V8's `z-index: 9000` fixed overlay at line 2405 with `var(--z-overlay)` | V8 | 4 | 1 | L | 1 |
| 10 | Replace V8's `z-index: 8500` element at line 2450 with `var(--z-modal)` | V8 | 4 | 1 | L | 1 |
| 11 | Replace V8's `z-index: 2001` at line 5111 with `var(--z-modal)` or a unique `--z-sheet-close` token | V8 | 4 | 1 | L | 1 |
| 12 | Replace V8's `z-index: 2000` at line 5100 with `var(--z-modal)` | V8 | 4 | 1 | L | 1 |
| 13 | Replace V8's `z-index: 900` at line 3684 with `var(--z-dropdown)` | V8 | 4 | 1 | L | 1 |
| 14 | Replace V8's `z-index: 586` (bottom tab bar) at line 586 with `var(--z-sticky)` | V8 | 4 | 1 | L | 1 |
| 15 | Replace V8's `z-index: 300` at lines 3290 and 3304 with `var(--z-modal)` | V8 | 4 | 1 | L | 1 |
| 16 | Replace V8's `z-index: 300` at line 3071 with `var(--z-dropdown)` if it is a dropdown, or `var(--z-modal)` if it is a sheet | V8 | 3 | 1 | L | 1 |
| 17 | Replace V8's `z-index: 200` at lines 4312 and 4337 with `var(--z-sheet)` | V8 | 3 | 1 | L | 1 |
| 18 | Replace V8's `z-index: 210` at line 4369 with `var(--z-sheet)` + 1 (or introduce `--z-sheet-content`) | V8 | 3 | 1 | L | 1 |
| 19 | Replace V8's `z-index: 220` at line 4382 with `var(--z-sheet)` + 2 (or introduce `--z-sheet-header`) | V8 | 3 | 1 | L | 1 |
| 20 | Replace V8's `z-index: 140` at line 4978 with `var(--z-dropdown)` | V8 | 3 | 1 | L | 1 |
| 21 | Replace V8's `z-index: 100` at line 923 with `var(--z-sticky)` | V8 | 3 | 1 | L | 1 |
| 22 | Replace V8's `z-index: 10` at line 3723 with `var(--z-card)` | V8 | 3 | 1 | L | 1 |
| 23 | Replace V8's `z-index: 10` at line 5085 with `var(--z-card)` | V8 | 3 | 1 | L | 1 |
| 24 | Replace V8's `z-index: 5` at line 2304 with `var(--z-card)` | V8 | 3 | 1 | L | 1 |
| 25 | Replace V8's `z-index: 5` at line 3510 with `var(--z-card)` | V8 | 3 | 1 | L | 1 |
| 26 | Confirm V8's negative `z-index: -1` at lines 442, 515, and 1036 are only used for pseudo-element or ambient-glow layers that must sit behind content and document each with a comment | V8 | 3 | 1 | L | 1 |
| 27 | Replace V8's `z-index: 0` at line 2581 and `z-index: 1` at line 2599 with `var(--z-base)` | V8 | 2 | 1 | L | 1 |
| 28 | Replace V8's `z-index: 1` at lines 923, 3030 with `var(--z-base)` | V8 | 2 | 1 | L | 1 |
| 29 | Replace admin.html's `z-index: 9000` at line 107 (loading overlay) with `var(--z-overlay)` | ADM | 5 | 1 | L | 1 |
| 30 | Replace admin.html's `z-index: 9999` toast at line 2288 with `var(--z-toast)` | ADM | 5 | 1 | L | 1 |
| 31 | Replace admin.html's `z-index: 9999` tooltip at line 1075 with `var(--z-tooltip)` | ADM | 4 | 1 | L | 1 |
| 32 | Replace admin.html's `z-index: 9999` at line 1103 with `var(--z-tooltip)` | ADM | 4 | 1 | L | 1 |
| 33 | Replace admin.html's `z-index: 2162` at line 2162 with `var(--z-modal)` | ADM | 4 | 1 | L | 1 |
| 34 | Replace admin.html's `z-index: 2172` at line 2172 with `var(--z-modal)` + 10 or introduce `--z-modal-close` | ADM | 4 | 1 | L | 1 |
| 35 | Replace admin.html's `z-index: 1001` at line 1045 with `var(--z-sheet)` | ADM | 4 | 1 | L | 1 |
| 36 | Replace admin.html's `z-index: 200` at line 1045 with `var(--z-sheet)` if this is a different element | ADM | 4 | 1 | L | 1 |
| 37 | Replace admin.html's `z-index: 100` sidebar at line 118 with `var(--z-sticky)` | ADM | 3 | 1 | L | 1 |
| 38 | Replace admin.html's `z-index: 50` sticky header at line 194 with `var(--z-sticky)` — 1 (ensuring it sits below the sidebar) | ADM | 3 | 1 | L | 1 |
| 39 | Resolve the conflict where admin sidebar (`z-index: 100`) and sticky header (`z-index: 50`) share the same named layer but with different raw values — confirm the current ordering is intentional | ADM | 4 | 1 | L | 1 |
| 40 | Replace admin.html's `z-index: 10` at lines 973, 1045 with `var(--z-card)` | ADM | 3 | 1 | L | 1 |
| 41 | Replace admin.html's `z-index: 2` at line 795 with `var(--z-base)` + 1 | ADM | 2 | 1 | L | 1 |
| 42 | Replace admin.html's `z-index: 1` at lines 788 with `var(--z-base)` | ADM | 2 | 1 | L | 1 |
| 43 | Replace admin.html's `z-index: 0` at line 778 with `var(--z-base)` - 1 or an explicit `0` named token `--z-flat: 0` | ADM | 2 | 1 | L | 1 |
| 44 | Add `z-index` token definitions to start.html's `:root` and replace any hardcoded `z-index` values | STR | 3 | 2 | M | 2 |
| 45 | Add `z-index` token definitions to landing.html's `:root` and replace any hardcoded `z-index` values | LND | 3 | 2 | M | 2 |
| 46 | Confirm that V8's bottom sheet (fan join sheet) uses `var(--z-sheet)` and its overlay backdrop uses `var(--z-overlay)` — 1 | V8 | 4 | 1 | L | 2 |
| 47 | Confirm that V8's presave sheet uses `var(--z-sheet)` | V8 | 4 | 1 | L | 2 |
| 48 | Confirm that V8's gold lock overlay uses `var(--z-overlay)` | V8 | 4 | 1 | L | 2 |
| 49 | Confirm that V8's toast uses `var(--z-toast)` and always renders above all other layers including sheets and overlays | V8 | 5 | 1 | L | 2 |
| 50 | Confirm that V8's tooltips use `var(--z-tooltip)` and render above dropdowns but below toasts | V8 | 3 | 1 | L | 2 |
| 51 | Confirm that admin.html's modal dialogs use `var(--z-modal)` consistently | ADM | 4 | 1 | L | 2 |
| 52 | Confirm that admin.html's toast uses `var(--z-toast)` and renders above all modals | ADM | 5 | 1 | L | 2 |
| 53 | Confirm that admin.html's sidebar does not overlap the modal overlay when a modal is open — if it does, add `z-index: var(--z-flat)` to the sidebar when a modal class is active on `body` | ADM | 4 | 2 | M | 2 |
| 54 | Confirm that admin.html's sticky header does not appear above bottom sheets or modals | ADM | 3 | 1 | L | 2 |
| 55 | Confirm that V8's `z-index: 9000` and `z-index: 8500` fan-join overlay at lines 2405 and 2450 form a proper stacking context pair (overlay behind panel) | V8 | 4 | 1 | L | 2 |
| 56 | Confirm that the two unrelated V8 elements sharing `z-index: 300` at lines 3071, 3290, and 3304 do not cause rendering conflicts in any browser | V8 | 3 | 1 | L | 2 |
| 57 | Confirm that the two admin.html elements sharing implicit high z-index values do not conflict when both are visible simultaneously | ADM | 3 | 1 | L | 2 |
| 58 | Confirm that V8's hero ambient glow (`z-index: -1` pseudo-element) does not appear above any interactive element due to stacking context changes | V8 | 3 | 1 | L | 2 |
| 59 | Confirm that V8's frosted-glass card overlay (`z-index: -1`) creates a correct stacking context and does not bleed outside its parent | V8 | 3 | 1 | L | 2 |
| 60 | Confirm that the pill overflow toggle dropdown in V8 appears above other pills but below any open bottom sheet | V8 | 3 | 1 | L | 2 |
| 61 | Confirm that the campaign state badge in V8 (fixed, top of hero) renders above the hero card but below any sheet | V8 | 3 | 1 | L | 2 |
| 62 | Add a Playwright test that opens V8's fan join sheet and confirms the sheet z-index is visually above all page cards | V8 | 4 | 2 | M | 3 |
| 63 | Add a Playwright test that triggers a V8 toast while a sheet is open and confirms the toast appears above the sheet | V8 | 4 | 2 | M | 3 |
| 64 | Add a Playwright test that opens an admin modal and confirms the sidebar is visually below the modal overlay | ADM | 4 | 2 | M | 3 |
| 65 | Add a Playwright test that triggers an admin toast while a modal is open and confirms the toast renders on top | ADM | 4 | 2 | M | 3 |
| 66 | Add a Playwright test that opens the admin tooltip and confirms it renders above dropdowns but below any open modal | ADM | 3 | 2 | M | 3 |
| 67 | Confirm that start.html's multi-step wizard overlay uses the `--z-modal` token and does not conflict with any fixed nav element | STR | 3 | 1 | L | 3 |
| 68 | Confirm that landing.html's sticky navigation bar uses the `--z-sticky` token | LND | 3 | 1 | L | 3 |
| 69 | Confirm that landing.html's any modal or full-screen overlay uses `--z-overlay` or `--z-modal` | LND | 3 | 1 | L | 3 |
| 70 | Confirm that the V8 bottom tab bar (fixed, z-index: 100 after token replacement) sits above all scrolled content but below sheets | V8 | 4 | 1 | L | 3 |
| 71 | Confirm that the V8 bottom tab bar does not overlap an open bottom sheet on mobile | V8 | 4 | 1 | M | 3 |
| 72 | If the bottom tab bar overlaps open sheets, add logic in the sheet open handler to add `z-index: var(--z-flat)` to the tab bar and restore it on sheet close | V8 | 4 | 2 | M | 3 |
| 73 | Confirm that the V8 presave countdown timer (fixed or sticky element) uses the correct `--z-sticky` token and does not overlap the sheet | V8 | 3 | 1 | L | 3 |
| 74 | Confirm that opening the gold lock overlay in V8 does not allow background content to receive pointer events | V8 | 4 | 1 | L | 3 |
| 75 | Confirm that opening the admin loading overlay does not allow background content to receive pointer events | ADM | 4 | 1 | L | 3 |
| 76 | Confirm that the admin QR code share panel uses `--z-modal` and renders above all other admin panels | ADM | 3 | 1 | L | 3 |
| 77 | Confirm that the admin snap card editor panel uses `--z-sheet` | ADM | 3 | 1 | L | 3 |
| 78 | Confirm that the admin nudge tooltips use `--z-tooltip` and do not clip behind the sidebar | ADM | 3 | 1 | L | 3 |
| 79 | Confirm that no component in any page creates an unintentional stacking context (via `transform`, `filter`, `opacity < 1` on a parent) that causes a child to be clipped below an expected layer | ALL | 4 | 2 | M | 4 |
| 80 | Audit V8 for any `transform: translateY()` entrance animations that create a stacking context, and confirm they do not trap the z-index of child sheets or tooltips | V8 | 3 | 2 | M | 4 |
| 81 | Audit admin.html for any `filter` rules on container elements that create stacking contexts, trapping z-index of descendant elements | ADM | 3 | 2 | M | 4 |
| 82 | Audit start.html for unintentional stacking context creation during step transition animations | STR | 3 | 2 | M | 4 |
| 83 | Audit landing.html for any `opacity` fade animations on sections that create stacking contexts and interfere with sticky nav z-index | LND | 3 | 2 | M | 4 |
| 84 | Confirm that `backdrop-filter` on V8 glass-theme cards does not create a stacking context that clips tooltips or toasts | V8 | 4 | 1 | M | 4 |
| 85 | Confirm that `backdrop-filter` on V8 bottom sheets does not trap child elements below the overlay | V8 | 4 | 1 | M | 4 |
| 86 | Add a Playwright test that verifies all four themes in V8 render toasts above all other elements | V8 | 3 | 2 | M | 4 |
| 87 | Add a Playwright test that verifies the glass theme does not cause any z-index layering regressions compared to the dark theme | V8 | 3 | 2 | M | 4 |
| 88 | Confirm the V8 `z-index: 1` and `z-index: 0` values used inside the hero card scroller (lines 2581, 2599) create a valid local stacking context without escaping to the page level | V8 | 3 | 1 | L | 4 |
| 89 | Confirm the admin `z-index: 1` and `z-index: 2` values at lines 788 and 795 are local stacking contexts inside a positioned parent and do not conflict with page-level z-index tokens | ADM | 3 | 1 | L | 4 |
| 90 | Confirm that admin.html's `z-index: 10` at line 973 (inside a positioned card) does not visually bleed above the modal layer when a modal is open | ADM | 3 | 1 | L | 4 |
| 91 | Document the full z-index scale and all named tokens in `docs/systems/DESIGN_SYSTEM_SPEC.md` under "Elevation & z-index" | ALL | 3 | 1 | L | 5 |
| 92 | Document any intentional exceptions to the scale (e.g. negative z-index for ambient glow layers) in the same section with rationale | ALL | 2 | 1 | L | 5 |
| 93 | Document the rule "toasts must always be the highest z-index layer" in `docs/systems/DESIGN_SYSTEM_SPEC.md` | ALL | 3 | 1 | L | 5 |
| 94 | Document the stacking context creation rules (which CSS properties create stacking contexts and where they are intentionally used) in `docs/systems/DESIGN_SYSTEM_SPEC.md` | ALL | 2 | 1 | L | 5 |
| 95 | Add the z-index token contract to `CLAUDE.md` working rules with a note that `z-index: 9999` is never acceptable without adding a named `--z-*` token first | ALL | 3 | 1 | L | 5 |
| 96 | Add a pre-commit grep step that fails if any HTML file contains `z-index:\s*[0-9][0-9][0-9][0-9]` (4+ digit z-index) outside of a `--z-*` variable definition | ALL | 4 | 2 | L | 5 |
| 97 | Confirm that all four pages pass the pre-commit z-index lint hook with zero violations after token replacement | ALL | 4 | 1 | L | 6 |
| 98 | Run a full cross-browser test (Chrome, Safari iOS, Firefox) confirming z-index layer ordering is consistent after token replacement | ALL | 4 | 3 | M | 6 |
| 99 | Confirm admin.html sidebar and header do not flicker or reorder on rapid modal open/close in a Playwright test | ADM | 3 | 2 | M | 6 |
| 100 | Update this dimension's status to "Complete" once all z-index tokens are in place, documentation is published, and Playwright elevation tests pass | ALL | 2 | 1 | L | 6 |
