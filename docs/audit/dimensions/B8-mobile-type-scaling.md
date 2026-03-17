# Dimension B8 — Mobile Type Scaling
**Category:** Typography & Spacing
**Phase:** 5

No text should render below 12px on any ABLE page. No input text should be below 16px (which would trigger iOS auto-zoom). Hero text must scale gracefully from 375px to 430px without overflow. Currently V8 has at least one confirmed 10px label, admin has several 9–10px values, and start.html has values as small as 9px in some chip hints. Several `clamp()` expressions need minimum values audited.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | V8 hero name `clamp(72px, 20vw, 108px)` — at 375px, 20vw = 75px; above minimum; no scaling issue | V8 | 3 | 1 | L | 1 |
| 2 | V8 `--text-hero: clamp(48px, 14vw, 80px)` — at 375px, 14vw = 52.5px; above minimum; confirm no overflow | V8 | 3 | 1 | L | 1 |
| 3 | V8 countdown `clamp(56px, 16vw, 96px)` — at 375px, 16vw = 60px; confirm no overflow at 375px | V8 | 3 | 1 | L | 1 |
| 4 | V8 `--text-xs: 11px` — this is the floor for the V8 type scale; below the 12px recommended minimum; evaluate raising to 12px | V8 | 4 | 1 | M | 1 |
| 5 | V8 fan capture trust text at `var(--text-xs)` = 11px — small but acceptable if only decorative supplementary text; confirm readability | V8 | 4 | 2 | L | 1 |
| 6 | V8 platform pill text at `var(--text-xs)` — 11px for interactive platform names is marginal; evaluate raising to 12px | V8 | 5 | 1 | M | 1 |
| 7 | V8 hero eyebrow label at `11px` — uppercase at 11px with 0.16em letter-spacing; test readability at 375px | V8 | 4 | 2 | L | 1 |
| 8 | V8 `font-size: 10px` at line 1424 — this is the `snap-eyebrow` equivalent on V8; a comment says "9px is below accessible threshold; 10px minimum" — correct the value to 11px to match `--text-xs` | V8 | 5 | 1 | L | 1 |
| 9 | V8 has `font-size: 10px` appearing at multiple points — grep all occurrences and evaluate each against the 12px standard | V8 | 5 | 2 | L | 1 |
| 10 | V8 fan capture input — confirm `font-size: 16px` or higher to prevent iOS auto-zoom | V8 | 5 | 1 | L | 1 |
| 11 | V8 email sign-up field — confirm type="email" and font-size: 16px | V8 | 5 | 1 | L | 1 |
| 12 | V8 any bottom sheet textarea — confirm font-size: 16px to prevent iOS zoom | V8 | 5 | 1 | L | 1 |
| 13 | V8 bottom sheet text inputs — audit each input/textarea for font-size: 16px minimum | V8 | 5 | 2 | L | 1 |
| 14 | V8 bio text input in edit mode — confirm font-size: 16px | V8 | 4 | 1 | L | 1 |
| 15 | V8 `--text-base: 15px` — this is body copy at 15px, slightly below the 16px recommendation for input text but fine for non-interactive text | V8 | 3 | 1 | L | 1 |
| 16 | V8 hero name at 375px: `clamp(72px, 20vw, 108px)` = 75px — confirm no horizontal overflow or text wrapping at 375px for a long artist name | V8 | 4 | 2 | L | 2 |
| 17 | V8 hero name long names (20+ characters): at 75px on 375px viewport, a 20-char name will wrap; confirm wrapping looks correct | V8 | 4 | 2 | L | 2 |
| 18 | V8 hero name `white-space: nowrap` setting? Or does it wrap? Confirm expected behaviour | V8 | 4 | 1 | L | 1 |
| 19 | V8 quick action pills at 375px: multiple pills may not all fit in one row; confirm the overflow/more toggle fires correctly | V8 | 4 | 2 | L | 2 |
| 20 | V8 stats row at 375px: three stat cards side-by-side at 125px each; confirm text doesn't overflow | V8 | 4 | 2 | L | 2 |
| 21 | V8 stat value at `var(--text-3xl)` = 32px in a ~125px card at 375px — confirm stat value doesn't clip | V8 | 3 | 2 | L | 2 |
| 22 | V8 stat label at 10px at 375px — this is very small in a small card column; consider 11px | V8 | 4 | 1 | L | 1 |
| 23 | V8 hero CTA button text at `var(--text-base)` 15px — confirm buttons are at least 44px tall with this font size | V8 | 5 | 1 | L | 1 |
| 24 | Admin `.snap-eyebrow` at `9.5px` — the single most problematic value; raise to 11px minimum | ADM | 5 | 1 | L | 1 |
| 25 | Admin `.stat-label` at `10px` — below the 11px floor of V8; raise to 11px and tokenise | ADM | 5 | 1 | L | 1 |
| 26 | Admin `.sb-section` sidebar section label at `9.5px` — raise to 11px minimum | ADM | 5 | 1 | L | 1 |
| 27 | Admin `.sb-artist-url` at `10px` — raise to 11px | ADM | 4 | 1 | L | 1 |
| 28 | Admin `.sb-qr-download` at `10px` — raise to 11px | ADM | 3 | 1 | L | 1 |
| 29 | Admin `.ci-status` at `10px` — raise to 11px | ADM | 3 | 1 | L | 1 |
| 30 | Admin `.field-label` at `10px` — raise to 11px | ADM | 4 | 1 | L | 1 |
| 31 | Admin `.gig-hint` at `10px` — raise to 11px | ADM | 3 | 1 | L | 1 |
| 32 | Admin `.mc-hint` at `10px` — raise to 11px | ADM | 3 | 1 | L | 1 |
| 33 | Admin `.ai-trigger__count` or similar small count badges at `10px` — raise | ADM | 3 | 1 | L | 1 |
| 34 | Admin `font-size: 8px` (recs-type-badge) — below 10px; raise to 11px minimum or remove text label | ADM | 5 | 1 | L | 1 |
| 35 | Admin `font-size: 8.5px` in campaign state mini-labels — raise to 11px minimum | ADM | 5 | 1 | L | 1 |
| 36 | Admin `font-size: 9px` (at least one occurrence in campaign UI) — raise to 11px | ADM | 5 | 1 | L | 1 |
| 37 | Admin field inputs `font-size: 13px` — below 16px; confirm iOS auto-zoom fires; raise to 16px | ADM | 5 | 1 | L | 1 |
| 38 | Admin textarea `font-size: 13px` (`.field-textarea` inherits 13px from `.field-input`) — raise to 16px | ADM | 5 | 1 | L | 1 |
| 39 | Admin all other input elements — grep for any `input, textarea, select` with font-size below 16px | ADM | 5 | 2 | L | 1 |
| 40 | Admin `.snap-card` edit input — confirm 16px font-size | ADM | 5 | 1 | L | 1 |
| 41 | Admin at 375px: stats row with three cards — confirm stat values don't overflow at mobile width | ADM | 4 | 2 | L | 2 |
| 42 | Admin at 375px: Campaign HQ state buttons row — confirm buttons don't overflow or wrap in a confusing way | ADM | 4 | 2 | L | 2 |
| 43 | Admin `#homeGreeting` at `22px` Plus Jakarta Sans — confirm this renders correctly at 375px | ADM | 2 | 1 | L | 2 |
| 44 | Admin `.chq-title` at `13px` uppercase — on 375px, this should still be legible with the 0.06em tracking | ADM | 3 | 2 | L | 2 |
| 45 | Landing `clamp(52px, 6vw, 84px)` hero headline — at 375px, 6vw = 22.5px which is the clamp minimum (52px wins); confirm 52px is the floor | LND | 4 | 1 | L | 1 |
| 46 | Landing `clamp(34px, 4.5vw, 58px)` section title — at 375px, 4.5vw = 16.9px, clamp minimum 34px; confirm 34px renders correctly | LND | 4 | 1 | L | 1 |
| 47 | Landing `clamp(17px, 1.8vw, 20px)` hero sub — at 375px, 1.8vw = 6.75px, clamp minimum 17px; confirm correct | LND | 3 | 1 | L | 1 |
| 48 | Landing `font-size: 9px` inside demo mockup elements — confirm all `aria-hidden="true"` so screen readers skip them | LND | 4 | 1 | L | 1 |
| 49 | Landing `font-size: 8px` in demo elements — same aria-hidden check | LND | 4 | 1 | L | 1 |
| 50 | Landing `font-size: 7.5px` in demo — same check | LND | 4 | 1 | L | 1 |
| 51 | Landing `font-size: 7px` in demo — same check | LND | 4 | 1 | L | 1 |
| 52 | Landing `font-size: 6px` in demo — same check | LND | 4 | 1 | L | 1 |
| 53 | Landing `font-size: 5px` in demo — confirm aria-hidden | LND | 3 | 1 | L | 1 |
| 54 | Landing input fields (email form if present) — confirm font-size: 16px minimum | LND | 5 | 1 | L | 1 |
| 55 | Landing `.hero__platforms-label` at `11px` — small but non-interactive; confirm acceptable | LND | 3 | 1 | L | 2 |
| 56 | Landing `font-size: 11px` on eyebrow label — confirm readability at 375px with uppercase and letter-spacing | LND | 3 | 2 | L | 2 |
| 57 | Landing at 375px: does the proof strip three-column layout hold, or do stats stack? Confirm mobile layout | LND | 4 | 2 | L | 2 |
| 58 | Landing at 375px: feature cards grid — confirm single column, no horizontal overflow | LND | 3 | 2 | L | 2 |
| 59 | Landing at 375px: pricing grid — confirm single column layout | LND | 3 | 2 | L | 2 |
| 60 | Landing at 375px: comparison grid switches to single column at 768px — confirm correct | LND | 3 | 1 | L | 2 |
| 61 | start.html `.cg-hint` at `9.5px` — raise to 11px minimum | STR | 5 | 1 | L | 1 |
| 62 | start.html `.cg-sm .cg-hint` at `9px` — raise to 11px minimum | STR | 5 | 1 | L | 1 |
| 63 | start.html `.cta-eyebrow` at `9px` — raise to 11px minimum | STR | 5 | 1 | L | 1 |
| 64 | start.html `.cg-sm .cg-label` at `11px` — borderline; consider raising to 12px | STR | 4 | 1 | L | 1 |
| 65 | start.html `field-input` at `font-size: 15px` — below 16px; will trigger iOS auto-zoom; raise to 16px | STR | 5 | 1 | L | 1 |
| 66 | start.html `font-size: 14px` on `.import-input` — below 16px; raise to 16px | STR | 5 | 1 | L | 1 |
| 67 | start.html `font-size: 13px` on option buttons — below 16px for interactive elements; confirm if these are buttons or non-input interactive elements | STR | 4 | 1 | L | 1 |
| 68 | start.html `.field-hint` at `11.5px` — round to 12px and raise to 12px minimum | STR | 4 | 1 | L | 1 |
| 69 | start.html `.field-error-msg` at `11.5px` — error messages must be readable; raise to 12px | STR | 4 | 1 | L | 1 |
| 70 | start.html hero step number `52px` at 375px — at 375px it takes up ~14% of width; test long names don't overflow step 1 | STR | 3 | 2 | L | 2 |
| 71 | start.html at 375px: ensure each wizard step doesn't require vertical scroll to see the continue button | STR | 5 | 2 | L | 2 |
| 72 | start.html at 375px: colour picker swatches grid — confirm no horizontal overflow | STR | 3 | 2 | L | 2 |
| 73 | start.html at 375px: CTA type option grid — confirm wraps correctly | STR | 3 | 2 | L | 2 |
| 74 | start.html at 375px: done screen with next-steps list — confirm all items visible without horizontal scroll | STR | 3 | 2 | L | 2 |
| 75 | V8 at 390px: hero name clamp recalculates to `clamp(72px, 20vw, 108px)` = 78px; confirm still correct | V8 | 2 | 1 | L | 2 |
| 76 | The 12px rule: define clearly that 12px is the absolute floor for any rendered text (excluding decorative SVG/canvas content) | ALL | 5 | 1 | L | 1 |
| 77 | The 16px input rule: define that all `input`, `textarea`, and `select` elements must have `font-size: 16px` minimum | ALL | 5 | 1 | L | 1 |
| 78 | Add a grep check in QA smoke tests that flags any input/textarea/select with font-size below 16px | ALL | 5 | 2 | L | 4 |
| 79 | Add a grep check in QA smoke tests that flags any font-size below 12px outside aria-hidden elements | ALL | 5 | 2 | L | 4 |
| 80 | V8 secondary action button text at `var(--text-xs)` = 11px — this is an interactive element (button) at 11px text; raise to 12px | V8 | 5 | 1 | L | 1 |
| 81 | Admin `.tier-badge` at `11px` — the tier badge is informational; confirm 11px is acceptable | ADM | 3 | 1 | L | 2 |
| 82 | Admin `.chq-state-btn` label at `11px` — this is an interactive button label at 11px; raise to 12px | ADM | 5 | 1 | L | 1 |
| 83 | V8 `.page-nav` tab bar labels — confirm font-size of navigation tab labels | V8 | 3 | 1 | L | 1 |
| 84 | V8 quick action pill labels at `var(--text-xs)` = 11px — these are interactive pill buttons; consider 12px | V8 | 4 | 1 | L | 2 |
| 85 | V8 overflow toggle pill "More +" — confirm minimum font-size for interactive element | V8 | 3 | 1 | L | 2 |
| 86 | Landing CTA button text at 15px — confirm 15px is sufficient for a cold-traffic CTA; consider 16px | LND | 3 | 1 | L | 2 |
| 87 | Landing secondary CTA at 15px — same consideration | LND | 2 | 1 | L | 2 |
| 88 | After raising all sub-12px text: take Playwright screenshot at 375px and compare readability | ALL | 4 | 2 | L | 3 |
| 89 | After raising all input font-sizes to 16px: test in iOS Safari simulator to confirm no auto-zoom fires | ALL | 5 | 2 | L | 3 |
| 90 | V8 gig mode "I'm playing tonight" banner text — confirm minimum font-size for this temporary overlay text | V8 | 3 | 1 | L | 2 |
| 91 | V8 pre-save CTA copy in pre-release state — confirm font-size of pre-save text | V8 | 3 | 1 | L | 2 |
| 92 | All four pages: confirm that `<meta name="viewport" content="width=device-width, initial-scale=1">` is set correctly and does not prevent user scaling | ALL | 5 | 1 | L | 1 |
| 93 | Confirm `user-scalable=no` is not set on any page's viewport meta — this is an accessibility violation | ALL | 5 | 1 | L | 1 |
| 94 | V8 `--text-xs: 11px` is 1px below the recommended 12px floor — the recommendation is a guideline, not a strict rule; document the decision to keep 11px for label text | V8 | 3 | 1 | L | 2 |
| 95 | Landing at 375px with device pixel ratio 2x (retina): confirm all clamp() minimum values look crisp, not blurry | LND | 3 | 2 | L | 3 |
| 96 | V8 at 375px DPR 3x (iPhone 14 Pro): confirm hero name clamp renders correctly | V8 | 3 | 2 | L | 3 |
| 97 | Admin field labels raised to 11px: confirm forms still have adequate visual hierarchy after the raise | ADM | 3 | 2 | L | 2 |
| 98 | start.html: after raising all sub-11px text, confirm CTA preview still fits within its container | STR | 3 | 2 | L | 2 |
| 99 | Document the mobile type scaling rules in DESIGN_SYSTEM_SPEC.md: minimum 12px for all text, 16px for inputs, hero uses clamp() with 48px floor | ALL | 3 | 1 | L | 3 |
| 100 | Add to QA smoke tests: "At 375px, no visible text content is below 12px, and no input field is below 16px" | ALL | 5 | 2 | L | 5 |

## Wave Summary
- **Wave 1** — 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 66, 68, 69, 76, 77, 80, 82, 83, 92, 93
- **Wave 2** — 16, 17, 19, 20, 21, 41, 42, 43, 44, 55, 56, 57, 58, 59, 60, 67, 70, 71, 72, 73, 74, 75, 81, 84, 85, 86, 87, 90, 91, 94, 97, 98
- **Wave 3** — 88, 89, 95, 96, 99
- **Wave 4** — 78, 79
- **Wave 5** — 100
- **Wave 6** — (none)
