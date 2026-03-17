# Dimension A8 — Border Radius System
**Category:** Visual Design & Design System
**Phase:** 2 (Visual)
**Status:** Not started

All `border-radius` values across the four active pages must use the defined token set — `--r-sm`, `--r-md`, `--r-lg`, `--r-xl`, `--r-pill` — rather than arbitrary hardcoded pixel values. Currently the codebase contains a significant number of hardcoded values: V8 alone has `4px`, `6px`, `8px`, `14px`, and `border-radius: 4px` (line 2211), `8px` (line 2306), `6px` (lines 2333, 2368, 2383, 2394), `14px` (line 2416), `12px` (line 2451), and `6px` (line 2465). Admin.html is worse: dozens of hardcoded values including `10px`, `12px`, `14px`, `20px`, `100px` (should be `--r-pill`), and `5px`. Start.html and landing.html use almost entirely hardcoded values with only occasional token references. Full compliance means every `border-radius` declaration uses a token variable, `50%` is permitted only for true circles, and no fallback `var(--r-lg, 16px)` pattern exists in favour of direct token references.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm the five radius tokens (`--r-sm`, `--r-md`, `--r-lg`, `--r-xl`, `--r-pill`) are defined in the `:root` CSS block of every page with appropriate pixel defaults | ALL | 5 | 1 | L | 1 |
| 2 | Replace the hardcoded `border-radius: 4px` at V8 line 2211 with `var(--r-sm)` | V8 | 4 | 1 | L | 1 |
| 3 | Replace the hardcoded `border-radius: 8px` at V8 line 2306 with `var(--r-md)` | V8 | 4 | 1 | L | 1 |
| 4 | Replace the hardcoded `border-radius: 6px` at V8 line 2333 with `var(--r-sm)` | V8 | 3 | 1 | L | 1 |
| 5 | Replace the hardcoded `border-radius: 6px` at V8 line 2368 with `var(--r-sm)` | V8 | 3 | 1 | L | 1 |
| 6 | Replace the hardcoded `border-radius: 6px` at V8 line 2383 with `var(--r-sm)` | V8 | 3 | 1 | L | 1 |
| 7 | Replace the hardcoded `border-radius: 6px` at V8 line 2394 with `var(--r-sm)` | V8 | 3 | 1 | L | 1 |
| 8 | Replace the hardcoded `border-radius: 14px` at V8 line 2416 with `var(--r-lg)` | V8 | 3 | 1 | L | 1 |
| 9 | Replace the hardcoded `border-radius: 6px` at V8 line 2437 with `var(--r-sm)` | V8 | 3 | 1 | L | 1 |
| 10 | Replace the hardcoded `border-radius: 12px` at V8 line 2451 with `var(--r-md)` | V8 | 3 | 1 | L | 1 |
| 11 | Replace the hardcoded `border-radius: 6px` at V8 line 2465 with `var(--r-sm)` | V8 | 3 | 1 | L | 1 |
| 12 | Replace the `var(--r-lg, 16px)` fallback pattern at V8 line 2195 with a direct `var(--r-lg)` reference, trusting the `:root` default | V8 | 3 | 1 | L | 1 |
| 13 | Replace the hardcoded `border-radius:12px` at admin.html line 140 with `var(--r-lg)` | ADM | 4 | 1 | L | 1 |
| 14 | Replace the hardcoded `border-radius:10px` at admin.html line 146 with `var(--r-md)` | ADM | 4 | 1 | L | 1 |
| 15 | Replace the hardcoded `border-radius:10px` at admin.html line 159 with `var(--r-md)` | ADM | 4 | 1 | L | 1 |
| 16 | Replace the hardcoded `border-radius:8px` at admin.html line 172 (QR canvas) with `var(--r-md)` | ADM | 3 | 1 | L | 1 |
| 17 | Replace the hardcoded `border-radius:10px` at admin.html line 177 with `var(--r-md)` | ADM | 4 | 1 | L | 1 |
| 18 | Replace the hardcoded `border-radius:20px` at admin.html line 201 with `var(--r-pill)` | ADM | 3 | 1 | L | 1 |
| 19 | Replace the hardcoded `border-radius:100px` at admin.html line 206 with `var(--r-pill)` | ADM | 3 | 1 | L | 1 |
| 20 | Replace the hardcoded `border-radius:100px` at admin.html line 216 with `var(--r-pill)` | ADM | 3 | 1 | L | 1 |
| 21 | Replace the hardcoded `border-radius:14px` at admin.html line 237 with `var(--r-xl)` | ADM | 3 | 1 | L | 1 |
| 22 | Replace the hardcoded `border-radius:6px` at admin.html line 262 with `var(--r-sm)` | ADM | 3 | 1 | L | 1 |
| 23 | Replace the hardcoded `border-radius:14px` at admin.html line 283 with `var(--r-xl)` | ADM | 3 | 1 | L | 1 |
| 24 | Replace the hardcoded `border-radius:14px` at admin.html line 298 with `var(--r-xl)` | ADM | 3 | 1 | L | 1 |
| 25 | Replace the hardcoded `border-radius:100px` at admin.html line 309 with `var(--r-pill)` | ADM | 3 | 1 | L | 1 |
| 26 | Replace the hardcoded `border-radius:5px` at admin.html line 360 with `var(--r-sm)` | ADM | 3 | 1 | L | 1 |
| 27 | Replace the hardcoded `border-radius:12px` at admin.html line 389 with `var(--r-lg)` | ADM | 3 | 1 | L | 1 |
| 28 | Replace the hardcoded `border-radius:100px` at admin.html line 414 with `var(--r-pill)` | ADM | 3 | 1 | L | 1 |
| 29 | Replace the hardcoded `border-radius:100px` at admin.html line 443 with `var(--r-pill)` | ADM | 3 | 1 | L | 1 |
| 30 | Replace the hardcoded `border-radius:6px` at admin.html line 450 with `var(--r-sm)` | ADM | 3 | 1 | L | 1 |
| 31 | Replace the hardcoded `border-radius:6px` at admin.html line 456 with `var(--r-sm)` | ADM | 3 | 1 | L | 1 |
| 32 | Replace the hardcoded `border-radius:5px` at admin.html line 469 with `var(--r-sm)` | ADM | 3 | 1 | L | 1 |
| 33 | Replace the hardcoded `border-radius:5px` at admin.html line 474 with `var(--r-sm)` | ADM | 3 | 1 | L | 1 |
| 34 | Replace all hardcoded `border-radius:10px` values in start.html with `var(--r-md)` | STR | 4 | 2 | M | 2 |
| 35 | Replace all hardcoded `border-radius:12px` values in start.html with `var(--r-lg)` | STR | 4 | 2 | M | 2 |
| 36 | Replace all hardcoded `border-radius:13px` values in start.html (lines 320, 331, 375) with `var(--r-lg)` | STR | 3 | 1 | L | 2 |
| 37 | Replace the hardcoded `border-radius:14px` at start.html line 434 with `var(--r-xl)` | STR | 3 | 1 | L | 2 |
| 38 | Replace all hardcoded `border-radius:100px` values in start.html with `var(--r-pill)` | STR | 3 | 1 | L | 2 |
| 39 | Replace the hardcoded `border-radius:9px` at start.html line 297 with `var(--r-md)` | STR | 3 | 1 | L | 2 |
| 40 | Replace the hardcoded `border-radius:7px` values at start.html lines 304, 324, 398 with `var(--r-md)` | STR | 3 | 1 | L | 2 |
| 41 | Replace the hardcoded `border-radius:11px` at start.html line 397 with `var(--r-lg)` | STR | 3 | 1 | L | 2 |
| 42 | Replace the hardcoded `border-radius:6px` at start.html line 287 with `var(--r-sm)` | STR | 3 | 1 | L | 2 |
| 43 | Replace the hardcoded `border-radius:9px` at start.html line 343 with `var(--r-md)` | STR | 2 | 1 | L | 2 |
| 44 | Replace all hardcoded `border-radius:8px` values in landing.html with `var(--r-md)` | LND | 4 | 2 | M | 2 |
| 45 | Replace all hardcoded `border-radius:10px` values in landing.html with `var(--r-md)` | LND | 4 | 2 | M | 2 |
| 46 | Replace hardcoded `border-radius:18px` values in landing.html (lines 380, 802) with `var(--r-xl)` | LND | 3 | 1 | L | 2 |
| 47 | Replace the hardcoded `border-radius: 44px` at landing.html line 380 with `var(--r-pill)` | LND | 3 | 1 | L | 2 |
| 48 | Replace all hardcoded `border-radius:20px` values in landing.html with `var(--r-pill)` | LND | 3 | 1 | L | 2 |
| 49 | Introduce `--r-phone-frame: 36px` in landing.html's `:root` for the phone mockup border-radius and replace the hardcoded `36px` at line 296 | LND | 2 | 1 | L | 2 |
| 50 | Replace the hardcoded `border-radius: 0 0 18px 18px` at landing.html line 411 with `0 0 var(--r-xl) var(--r-xl)` | LND | 2 | 1 | L | 2 |
| 51 | Replace hardcoded `border-radius:6px` values in landing.html (lines 309, 835) with `var(--r-sm)` | LND | 3 | 1 | L | 2 |
| 52 | Replace the hardcoded `border-radius:4px` at landing.html line 524 with `var(--r-sm)` | LND | 3 | 1 | L | 2 |
| 53 | Introduce `--r-track: 2px` in `:root` for progress bar tracks and replace the hardcoded `border-radius:2px` at landing.html lines 543, 548 | LND | 2 | 1 | L | 2 |
| 54 | Replace the hardcoded `border-radius:5px` at landing.html line 585 with `var(--r-sm)` | LND | 2 | 1 | L | 2 |
| 55 | Replace hardcoded `border-radius:9px` at landing.html lines 471 and 479 with `var(--r-md)` | LND | 2 | 1 | L | 2 |
| 56 | Confirm all `border-radius: 50%` usages in every page are on elements with equal `width` and `height` (true circles) and document any that are not | ALL | 3 | 1 | L | 3 |
| 57 | Confirm that no `border-radius` value uses `em` or `rem` units — all must use `px`-based tokens | ALL | 3 | 1 | L | 3 |
| 58 | Confirm that no `border-radius` value uses `%` other than `50%` for circles | ALL | 3 | 1 | L | 3 |
| 59 | Confirm admin.html's `--r-pill: 100px` and V8's `--r-pill: 999px` produce the same visible result on pill elements at all relevant sizes | ADM | 3 | 1 | L | 3 |
| 60 | Align admin.html `--r-pill` to `999px` to eliminate the theoretical divergence at pill heights above 200px | ADM | 2 | 1 | L | 3 |
| 61 | Document the intentional divergence between admin.html radius token values (`--r-lg: 12px`) and V8 values (`--r-lg: 20px`) in `docs/v6/core/V6_BUILD_AUTHORITY.md` with the design rationale | ADM | 3 | 1 | L | 3 |
| 62 | Add radius token definitions (`--r-sm/md/lg/xl/pill`) to start.html's `:root` block if they are absent | STR | 4 | 1 | L | 3 |
| 63 | Add radius token definitions to landing.html's `:root` block if they are absent | LND | 4 | 1 | L | 3 |
| 64 | Confirm landing.html's radius token values match the design spec (landing uses tighter radii, `--r-xl: 18px`) | LND | 3 | 1 | L | 3 |
| 65 | Confirm that `applyDerivedTokens()` radius changes in V8 do not cascade into admin.html's token scope | ADM | 4 | 1 | L | 3 |
| 66 | Add a pre-commit CSS lint step that greps all HTML files for `border-radius:\s*[0-9]` (excluding `50%` and `var(`) and exits non-zero | ALL | 4 | 2 | L | 3 |
| 67 | Confirm that after token replacement the V8 `.btn-primary` radius remains `var(--r-sm)` per V6_BUILD_AUTHORITY §3.5, not `--r-pill` | V8 | 5 | 1 | L | 3 |
| 68 | Add a comment near the `.btn-primary` radius rule citing V6_BUILD_AUTHORITY §3.5 to prevent future contributors from changing it to `--r-pill` | V8 | 3 | 1 | L | 3 |
| 69 | Confirm the V8 hero top card `border-radius: var(--r-card, var(--r-lg))` resolves correctly when `--r-card` is set by `applyIdentity()` sharpness refinements | V8 | 3 | 1 | L | 3 |
| 70 | Confirm that `applyIdentity()` uses the vibe-derived `--r-card` base value from `getComputedStyle` and not a hardcoded number | V8 | 4 | 1 | M | 3 |
| 71 | Add a Playwright test that reads all computed `border-radius` values on V8 `.card` elements and asserts they match the `--r-lg` computed value | V8 | 4 | 3 | M | 4 |
| 72 | Add a Playwright test that reads all computed `border-radius` values on V8 `.btn-primary` elements and asserts they match `--r-sm` | V8 | 4 | 3 | M | 4 |
| 73 | Add a Playwright test that reads all computed `border-radius` values on V8 `.pill` elements and asserts they match `--r-pill` | V8 | 4 | 3 | M | 4 |
| 74 | Add a Playwright test asserting the electronic vibe `--r-sm` computed value equals `2px` (Math.round(4 * 0.6)) | V8 | 3 | 2 | M | 4 |
| 75 | Add a Playwright test asserting the pop vibe `--r-xl` computed value equals `32px` after the maximum clamp | V8 | 3 | 2 | M | 4 |
| 76 | Add a Playwright test on admin.html asserting all card-equivalent elements use `var(--r-lg)` (12px admin token) | ADM | 3 | 2 | M | 4 |
| 77 | Add a Playwright test on start.html asserting all primary CTA buttons use `var(--r-pill)` | STR | 3 | 2 | M | 4 |
| 78 | Add a Playwright test on landing.html asserting feature cards use the `--r-xl` token value | LND | 3 | 2 | M | 4 |
| 79 | Confirm the glass theme's card elements retain `var(--r-lg)` radius and do not override with a hardcoded value | V8 | 3 | 1 | L | 4 |
| 80 | Confirm the contrast theme's card elements retain token-based radius | V8 | 3 | 1 | L | 4 |
| 81 | Confirm the light theme's card elements retain token-based radius | V8 | 3 | 1 | L | 4 |
| 82 | Confirm landing.html phone mockup's `--r-phone-frame: 36px` does not clip or overflow inner content at any viewport width | LND | 3 | 1 | L | 4 |
| 83 | Confirm start.html vibe selector tiles render consistently after `border-radius:9px` is replaced with `var(--r-md)` | STR | 3 | 1 | L | 4 |
| 84 | Confirm admin.html QR canvas renders correctly after `border-radius:8px` is replaced with `var(--r-md)` | ADM | 2 | 1 | L | 4 |
| 85 | Confirm all admin.html bottom-sheet/modal containers use `var(--r-xl) var(--r-xl) 0 0` for top corners after token replacement | ADM | 3 | 1 | L | 4 |
| 86 | Confirm all V8 bottom-sheet containers use `var(--r-xl) var(--r-xl) 0 0` for top corners after token replacement | V8 | 3 | 1 | L | 4 |
| 87 | After full token replacement, run Playwright screenshots of all four pages to confirm no visual regression from the indie-vibe pixel baseline | ALL | 5 | 2 | M | 5 |
| 88 | Confirm the electronic vibe produces visibly sharper corners than indie in a Playwright side-by-side screenshot | V8 | 4 | 2 | M | 5 |
| 89 | Confirm the pop vibe produces visibly rounder corners than indie in a Playwright side-by-side screenshot | V8 | 4 | 2 | M | 5 |
| 90 | Run a full mobile Playwright test at 375 px and 390 px confirming no layout overflow from maximum-rMult pop vibe radius values | V8 | 4 | 2 | M | 5 |
| 91 | Document the radius token scale and the V8 vs admin divergence in `docs/systems/DESIGN_SYSTEM_SPEC.md` under "Border Radius" | ALL | 3 | 1 | L | 5 |
| 92 | Document the `--r-phone-frame` exception and similar intentional named overrides in `docs/systems/DESIGN_SYSTEM_SPEC.md` with rationale | LND | 2 | 1 | L | 5 |
| 93 | Document the `border-radius: 50%` rule (circles only, not pills) in `docs/systems/DESIGN_SYSTEM_SPEC.md` | ALL | 2 | 1 | L | 5 |
| 94 | Document the `--r-track: 2px` exception for progress bar tracks in `docs/systems/DESIGN_SYSTEM_SPEC.md` | ALL | 2 | 1 | L | 5 |
| 95 | Add the radius token contract (`--r-sm/md/lg/xl/pill` — no hardcoded px values) to `CLAUDE.md` working rules under "CSS custom properties" | ALL | 3 | 1 | L | 5 |
| 96 | After token replacement pass, run a final grep for any remaining hardcoded `border-radius:\s*[0-9]` values and fix any residuals | ALL | 4 | 1 | L | 6 |
| 97 | Confirm the pre-commit CSS lint hook for hardcoded radius values passes cleanly with zero violations | ALL | 4 | 1 | L | 6 |
| 98 | Confirm all 28 vibe × theme combinations render with correct radius after full tokenisation, using Playwright screenshots | V8 | 4 | 2 | M | 6 |
| 99 | Confirm admin.html renders correctly at all breakpoints after all hardcoded radius values are replaced | ADM | 4 | 1 | L | 6 |
| 100 | Update this dimension's status to "Complete" once the pre-commit hook passes, all Playwright radius tests pass, and documentation is published | ALL | 2 | 1 | L | 6 |
