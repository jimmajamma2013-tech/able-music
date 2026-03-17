# Dimension E7 — Portrait and Landscape Usability
**Category:** Mobile UX & Touch
**Phase:** 3 (Mobile)
**Status:** Not started

While most users interact with ABLE in portrait mode, a meaningful percentage will rotate their phone — particularly when watching a video embedded in the artist profile, checking a show ticket barcode, or filling in the wizard on a small screen where landscape gives more width. Full compliance means all four ABLE pages are fully usable in landscape mobile orientation (667×375, iPhone SE landscape) without any broken layout, overflow, disappearing content, or obscured controls. The hero artwork on V8 is the primary risk: it fills the viewport in portrait but at 375px tall in landscape it can consume the entire screen height, hiding the CTAs below. Safe-area horizontal insets in landscape also need handling to prevent content from being hidden behind notches.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | On V8, limit the hero artwork container to `max-height: 60vh` in landscape (use `@media (orientation: landscape)`) so CTAs remain visible | V8 | 5 | 1 | L | 1 |
| 2 | On V8 in landscape, reduce the hero artwork `min-height` from its portrait value to allow the CTA buttons to appear above the fold | V8 | 5 | 1 | L | 1 |
| 3 | Test V8 at exactly 667×375 (iPhone SE landscape) and confirm both hero CTAs are visible without scrolling | V8 | 5 | 2 | M | 1 |
| 4 | Test V8 at 844×390 (iPhone 14 landscape) and confirm the same | V8 | 5 | 2 | M | 1 |
| 5 | Add `padding-left: env(safe-area-inset-left)` and `padding-right: env(safe-area-inset-right)` to the main content wrapper on all pages for landscape notch clearance | ALL | 5 | 1 | L | 1 |
| 6 | Add the same horizontal safe-area padding to `.nav`, `.bottom-nav`, and `.fan-capture` in landscape | V8 | 5 | 1 | L | 1 |
| 7 | Add horizontal safe-area padding to `admin.html` `.nav` and any full-width toolbar in landscape | ADM | 4 | 1 | L | 1 |
| 8 | Add horizontal safe-area padding to `start.html` in landscape | STR | 4 | 1 | L | 1 |
| 9 | Confirm there is no horizontal overflow at 667×375 on V8 — open DevTools and check for scrollbar or `document.body.scrollWidth > 667` | V8 | 5 | 1 | L | 1 |
| 10 | Confirm there is no horizontal overflow at 667×375 on `admin.html` | ADM | 5 | 1 | L | 1 |
| 11 | Confirm there is no horizontal overflow at 667×375 on `start.html` | STR | 5 | 1 | L | 1 |
| 12 | Confirm there is no horizontal overflow at 667×375 on `landing.html` | LND | 5 | 1 | L | 1 |
| 13 | In the `@media (orientation: landscape)` block on V8, shrink the hero artist name font size so it doesn't overflow a single line | V8 | 4 | 1 | L | 1 |
| 14 | In landscape on V8, reduce the hero subtitle/bio text size if it wraps to more than 3 lines | V8 | 3 | 1 | L | 2 |
| 15 | Confirm the `.bottom-nav` on V8 is not taller than 54px in landscape — reduce its padding in `@media (orientation: landscape)` | V8 | 4 | 1 | L | 1 |
| 16 | Confirm the `.bottom-nav` icon labels are still readable in landscape at reduced heights | V8 | 3 | 1 | L | 2 |
| 17 | Confirm the `.nav` top bar on V8 does not double-stack its content in landscape — set a reduced height and single-row layout | V8 | 4 | 1 | L | 1 |
| 18 | Confirm the `.nav` on `admin.html` does not double-stack in landscape | ADM | 4 | 1 | L | 1 |
| 19 | Test that the snap card grid on V8 reflows correctly in landscape — snap cards should use 2 columns not 1 in landscape | V8 | 3 | 2 | M | 2 |
| 20 | Test that the music section on V8 remains fully functional in landscape and no tracks overflow the container | V8 | 4 | 2 | M | 2 |
| 21 | Test that the events/bento grid on V8 reflows to a 2-column layout in landscape without overflow | V8 | 3 | 2 | M | 2 |
| 22 | Test that the merch grid on V8 uses at least 2 columns in landscape for efficient use of horizontal space | V8 | 3 | 2 | M | 2 |
| 23 | Confirm that the fan capture bar on V8 remains anchored to the bottom in landscape and does not drift or overlap content | V8 | 5 | 1 | L | 1 |
| 24 | Confirm that in landscape on V8, the fan capture bar does not obscure the last section's content — add extra bottom padding | V8 | 4 | 1 | L | 1 |
| 25 | On `admin.html`, test that the Campaign HQ section reflows in landscape without any cards overflowing their container | ADM | 4 | 2 | M | 2 |
| 26 | On `admin.html`, test that the analytics stat cards wrap to 2 columns in landscape | ADM | 3 | 2 | M | 2 |
| 27 | On `admin.html`, test that the snap card management list is scrollable and usable in landscape | ADM | 3 | 2 | M | 2 |
| 28 | On `admin.html`, test that the fan list table/grid is scrollable and shows at least 3 columns in landscape | ADM | 3 | 2 | M | 2 |
| 29 | On `start.html`, test that the wizard steps are fully visible and the Next button is reachable in landscape | STR | 5 | 2 | M | 1 |
| 30 | On `start.html`, ensure the fixed bottom CTA bar in landscape leaves enough content visible above it — increase scroll container height | STR | 5 | 2 | M | 1 |
| 31 | On `start.html`, test the genre/vibe colour picker in landscape — swatch grid should not overflow | STR | 3 | 2 | M | 2 |
| 32 | On `start.html`, confirm the Spotify link input step shows the input and the Next CTA without scrolling in landscape | STR | 4 | 2 | M | 2 |
| 33 | On `landing.html`, test the hero section in landscape — headline and CTA should both be visible without scrolling | LND | 4 | 2 | M | 2 |
| 34 | On `landing.html`, confirm the feature comparison grid reflows to 2 columns in landscape | LND | 3 | 2 | M | 2 |
| 35 | On `landing.html`, confirm the testimonial/quote section does not overflow horizontally in landscape | LND | 3 | 1 | L | 2 |
| 36 | On `landing.html`, confirm the fixed nav bar in landscape has correct horizontal safe-area padding | LND | 4 | 1 | L | 1 |
| 37 | Test orientation change mid-session on V8 — rotate from portrait to landscape while fan capture bar is visible and confirm no glitch | V8 | 4 | 2 | M | 2 |
| 38 | Test orientation change mid-session on V8 while a modal is open — modal should reflow correctly or close and re-open | V8 | 3 | 2 | M | 2 |
| 39 | Test orientation change on `admin.html` while a bottom sheet is open — sheet should reflow or close gracefully | ADM | 3 | 2 | M | 2 |
| 40 | Test orientation change on `start.html` during wizard step 3 — no data loss and layout should reflow | STR | 4 | 2 | M | 2 |
| 41 | Confirm that the `--vh` CSS variable is updated on orientation change by the `resize` listener so any `100vh`-based heights reflow correctly | ALL | 4 | 1 | L | 2 |
| 42 | Confirm that the `visualViewport` resize handler fires on orientation change and updates any layout-dependent variables | ALL | 4 | 1 | L | 2 |
| 43 | Confirm that background artwork/video on V8 correctly covers the viewport in landscape without cropping artist's face (use `object-position: top center`) | V8 | 3 | 2 | M | 3 |
| 44 | Confirm that the glass theme blur effect on V8 in landscape does not clip or bleed outside the container | V8 | 3 | 2 | M | 3 |
| 45 | Confirm that the light theme on V8 in landscape does not cause any white overflow or exposed background-color gaps | V8 | 3 | 1 | L | 2 |
| 46 | Confirm that the contrast theme on V8 in landscape renders correctly at all section boundaries | V8 | 3 | 1 | L | 2 |
| 47 | Add a Playwright test at `{ width: 667, height: 375 }` viewport that asserts the V8 hero CTA button is in the visible viewport | V8 | 4 | 3 | M | 3 |
| 48 | Add a Playwright test at `{ width: 667, height: 375 }` that asserts no horizontal scrollbar is present on V8 | V8 | 4 | 3 | M | 3 |
| 49 | Add a Playwright test at `{ width: 667, height: 375 }` that asserts no horizontal scrollbar is present on `admin.html` | ADM | 4 | 3 | M | 3 |
| 50 | Add a Playwright test at `{ width: 667, height: 375 }` for `start.html` — assert the wizard's Next button is visible | STR | 4 | 3 | M | 3 |
| 51 | Add a Playwright test at `{ width: 667, height: 375 }` for `landing.html` — assert the primary CTA button is visible | LND | 3 | 3 | M | 3 |
| 52 | Confirm that text does not overflow its container at 375px height in landscape — particularly the artist tagline on V8 | V8 | 4 | 1 | L | 2 |
| 53 | Confirm that `white-space: nowrap` is not applied to any headline that could overflow the viewport in landscape | ALL | 4 | 1 | L | 2 |
| 54 | On V8, ensure that the pre-release countdown timer section in landscape does not hide the pre-save CTA below the fold | V8 | 4 | 2 | M | 2 |
| 55 | On V8 in gig mode landscape, ensure the "on tonight" banner and ticket CTA are both visible above the fold | V8 | 4 | 2 | M | 2 |
| 56 | Confirm that fixed-width pixel values in CSS do not exceed 375px — replace them with `max-width: 100%` or percentage widths | ALL | 4 | 1 | L | 2 |
| 57 | Run a grep for any CSS value wider than `375px` (e.g., `width: 400px`) that is not inside a min-width media query | ALL | 4 | 1 | L | 1 |
| 58 | Confirm that the `admin.html` sidebar (if it exists in desktop view) collapses correctly to a bottom nav in landscape mobile | ADM | 4 | 2 | M | 2 |
| 59 | Confirm that any CSS `grid` layout uses `auto-fit` or `minmax()` columns so they automatically reflow in landscape without overflow | ALL | 4 | 1 | L | 2 |
| 60 | Confirm that `flex-wrap: wrap` is set on any flex row that could overflow in landscape | ALL | 4 | 1 | L | 2 |
| 61 | Confirm that the `landing.html` pricing section does not clip or overflow in landscape mobile | LND | 3 | 2 | M | 2 |
| 62 | Confirm that the `landing.html` FAQ accordion section is scrollable and usable in landscape | LND | 3 | 1 | L | 2 |
| 63 | On V8, ensure the social platform pills in the hero do not overflow horizontally in landscape and wrap correctly | V8 | 4 | 1 | L | 2 |
| 64 | On V8, confirm the quick-action pill bar wraps or scrolls horizontally in landscape without clipping | V8 | 4 | 1 | L | 2 |
| 65 | On V8, confirm that the floating gig-mode badge does not overlap critical content in landscape | V8 | 3 | 1 | L | 2 |
| 66 | Test `start.html` accent colour picker in landscape — ensure swatches don't overflow or collapse to a single visible row | STR | 3 | 2 | M | 2 |
| 67 | Confirm that the `start.html` artwork upload preview does not exceed viewport height in landscape | STR | 4 | 2 | M | 2 |
| 68 | Confirm that modals on `admin.html` have `max-height: 85dvh` in landscape so they are scrollable and the close button is reachable | ADM | 4 | 2 | M | 2 |
| 69 | Confirm that the snap card editor sheet on `admin.html` is scrollable in landscape and the save button is not hidden below the viewport | ADM | 4 | 2 | M | 2 |
| 70 | Confirm that all bottom sheets on `admin.html` in landscape do not cover the entire screen — cap at `75vh` in landscape | ADM | 4 | 2 | M | 2 |
| 71 | In landscape on `start.html`, the wizard progress bar should reduce in height to preserve content space | STR | 3 | 1 | L | 2 |
| 72 | Confirm the upgrade prompt overlay on `admin.html` is scrollable in landscape and the upgrade CTA is visible | ADM | 3 | 2 | M | 2 |
| 73 | Confirm that the Spotify import loading overlay on `start.html` is correctly positioned in landscape | STR | 3 | 1 | L | 2 |
| 74 | Confirm that the tour dates section on V8 scrolls internally (not the page) if it has more than 3 events in landscape | V8 | 3 | 2 | M | 3 |
| 75 | Confirm that in landscape the artist profile in V8 does not require more than 2 thumb-lengths of scrolling to reach the fan capture bar | V8 | 3 | 2 | M | 3 |
| 76 | Add `@media (orientation: landscape) and (max-height: 480px)` specific rules for small phones in landscape (iPhone SE) | V8 | 4 | 2 | M | 2 |
| 77 | Add the same narrow landscape media query to `admin.html`, `start.html`, and `landing.html` | ALL | 4 | 2 | M | 2 |
| 78 | In the narrow landscape media query, reduce all section `padding-top` and `padding-bottom` values to `8px` to maximise visible content area | ALL | 3 | 1 | L | 3 |
| 79 | In the narrow landscape media query on V8, set `--section-gap` token to a reduced value | V8 | 3 | 1 | L | 3 |
| 80 | Confirm that the `.nav` height is reduced in landscape to free up vertical space — target 44px in landscape vs. 56px in portrait | ALL | 3 | 1 | L | 2 |
| 81 | Confirm that reducing `.nav` height in landscape does not clip the ABLE logo or nav icons | ALL | 3 | 1 | L | 2 |
| 82 | Add Playwright screenshot tests at `{ width: 844, height: 390 }` (iPhone 14 landscape) for all four pages | ALL | 3 | 3 | M | 4 |
| 83 | Add Playwright screenshot tests at `{ width: 667, height: 375 }` (iPhone SE landscape) for all four pages | ALL | 3 | 3 | M | 4 |
| 84 | Compare portrait and landscape screenshots using Playwright's `toMatchSnapshot` with a 10% pixel-diff tolerance | ALL | 3 | 3 | M | 4 |
| 85 | Confirm that the YouTube/Spotify embed on V8 switches to a smaller height in landscape to remain within the viewport | V8 | 4 | 2 | M | 2 |
| 86 | In landscape on V8, set the embed iframe to `max-height: 40vh` to prevent it from consuming the full screen | V8 | 4 | 1 | L | 2 |
| 87 | Confirm that no `position: absolute` element with `bottom: 0` positioning causes content to overflow in landscape due to the shorter viewport | ALL | 4 | 2 | M | 2 |
| 88 | Confirm that the font scale tokens do not increase in landscape — responsive type should only scale up for wider viewports, not shorter ones | ALL | 3 | 1 | L | 2 |
| 89 | Confirm that ABLE's `Barlow Condensed` display font is used for the hero artist name in landscape to save vertical space | V8 | 3 | 1 | L | 2 |
| 90 | In landscape on `landing.html`, confirm the hero headline uses `Barlow Condensed` at a reduced size to fit above the fold | LND | 3 | 1 | L | 2 |
| 91 | Add a landscape CSS comment in each file documenting which elements have landscape-specific overrides | ALL | 2 | 1 | L | 5 |
| 92 | Test landscape usability on iPad mini (744px wide, 1024px tall) to confirm it is also clean | ALL | 2 | 2 | M | 4 |
| 93 | Confirm that the `admin.html` dashboard header greeting does not truncate in landscape mobile | ADM | 3 | 1 | L | 2 |
| 94 | Confirm that the tier badge on `admin.html` is visible in landscape without being cut off | ADM | 2 | 1 | L | 3 |
| 95 | Confirm that the `landing.html` footer is readable and not clipped in landscape mobile | LND | 2 | 1 | L | 3 |
| 96 | Confirm that the `start.html` success/completion screen at the end of the wizard renders correctly in landscape | STR | 3 | 2 | M | 3 |
| 97 | Test that switching from landscape back to portrait while on `admin.html` does not lose any form input data | ADM | 4 | 1 | L | 2 |
| 98 | Add a QA checklist item: "Rotate to landscape on a physical iPhone SE during V8 visit and confirm hero CTA is visible" | ALL | 4 | 1 | L | 4 |
| 99 | Document the `@media (orientation: landscape) and (max-height: 480px)` breakpoint pattern in the ABLE CSS comment guide | ALL | 2 | 1 | L | 5 |
| 100 | After all landscape fixes, run a full Playwright audit at both landscape dimensions and confirm zero overflow warnings | ALL | 4 | 2 | M | 4 |
