# Dimension E3 — iOS Safari Fixed Positioning
**Category:** Mobile UX & Touch
**Phase:** 3 (Mobile)
**Status:** Not started

On iOS Safari, the appearance of the virtual keyboard causes the viewport to resize, which can shift `position: fixed` elements up or down by as much as 72px. This affects ABLE's bottom navigation bar, any sticky CTAs, and the fan capture form. Full compliance means every fixed element remains visually anchored when a keyboard opens or closes, the bottom nav accounts for `env(safe-area-inset-bottom)` on notched devices, and no content jump is visible to the user. The correct fix combines `position: fixed` with explicit `bottom: env(safe-area-inset-bottom)`, use of the `interactive-widget=resizes-content` viewport meta value where applicable, and JavaScript keyboard-detection to temporarily adjust layout when inputs are focused.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add `env(safe-area-inset-bottom)` to the `padding-bottom` of `.bottom-nav` so it clears the iPhone home indicator on all notched devices | V8 | 5 | 1 | L | 1 |
| 2 | Add `env(safe-area-inset-bottom)` to the `padding-bottom` of `.bottom-nav` on `admin.html` | ADM | 5 | 1 | L | 1 |
| 3 | Set `interactive-widget=resizes-content` in the `<meta name="viewport">` tag on V8 so the keyboard resize doesn't shift fixed elements | V8 | 5 | 1 | L | 1 |
| 4 | Set `interactive-widget=resizes-content` in the `<meta name="viewport">` tag on `admin.html` | ADM | 5 | 1 | L | 1 |
| 5 | Set `interactive-widget=resizes-content` in the `<meta name="viewport">` tag on `start.html` | STR | 5 | 1 | L | 1 |
| 6 | Set `interactive-widget=resizes-content` in the `<meta name="viewport">` tag on `landing.html` | LND | 4 | 1 | L | 1 |
| 7 | Add a `focusin` event listener on V8 that adds a `.keyboard-open` class to `<body>` when any `<input>` or `<textarea>` is focused | V8 | 5 | 2 | M | 1 |
| 8 | Add a `focusout` event listener on V8 that removes `.keyboard-open` from `<body>` when focus leaves all inputs | V8 | 5 | 2 | M | 1 |
| 9 | In `.keyboard-open` state on V8, set `.fan-capture` to `position: absolute` so it scrolls with the page rather than fighting the keyboard | V8 | 5 | 2 | M | 1 |
| 10 | Ensure `.nav` (top navbar) has an explicit `top: 0` combined with `env(safe-area-inset-top)` for notch/Dynamic Island clearance | ALL | 4 | 1 | L | 1 |
| 11 | Set `padding-top: env(safe-area-inset-top)` on `.nav` so content is never hidden behind the status bar on iPhone 14 Pro and newer | V8 | 4 | 1 | L | 1 |
| 12 | Set `padding-top: env(safe-area-inset-top)` on `.nav` on `admin.html` | ADM | 4 | 1 | L | 1 |
| 13 | Add `padding-bottom: env(safe-area-inset-bottom)` to `.fan-capture` sticky container so the submit button is not obscured on iPhone | V8 | 5 | 1 | L | 1 |
| 14 | Wrap all safe-area token usages in a `@supports (padding: env(safe-area-inset-bottom))` guard so older browsers don't see blank values | ALL | 3 | 1 | L | 1 |
| 15 | Verify `<meta name="viewport">` includes `viewport-fit=cover` on all four pages — required before `env()` tokens work | ALL | 5 | 1 | L | 1 |
| 16 | Test that adding `viewport-fit=cover` does not cause horizontal overflow on any page at 375px | ALL | 4 | 1 | L | 1 |
| 17 | Set an explicit `z-index` stack in a single CSS comment block so `.nav`, `.bottom-nav`, `.fan-capture`, and modals never overlap incorrectly | ALL | 3 | 1 | L | 1 |
| 18 | Set `.bottom-nav` `z-index: 100`, `.fan-capture` `z-index: 90`, modals `z-index: 200`, and `.nav` `z-index: 100` as the canonical stack | V8 | 4 | 1 | L | 1 |
| 19 | On `start.html`, verify that the wizard's fixed progress bar at the top does not shift when a form field is focused on iOS Safari | STR | 4 | 2 | M | 1 |
| 20 | On `start.html`, add a `focusin` handler that scrolls the active input into view with `scrollIntoView({ block: 'center', behavior: 'smooth' })` | STR | 5 | 2 | M | 1 |
| 21 | Add `scrollIntoView` on input focus for the fan email capture field on V8 so the field isn't hidden below the keyboard | V8 | 5 | 2 | M | 1 |
| 22 | Add `scrollIntoView` on input focus for all `admin.html` form fields (snap card editor, CTA editor, profile edit modal) | ADM | 4 | 2 | M | 2 |
| 23 | Test the bottom nav bar on iPhone SE (375px) to confirm it does not shift vertically when a search or form field is focused | V8 | 5 | 1 | L | 1 |
| 24 | Test the bottom nav bar on iPhone 14 (390px) to confirm it does not shift vertically when a search or form field is focused | V8 | 5 | 1 | L | 1 |
| 25 | Test the bottom nav bar on iPhone 15 Pro Max (430px) to confirm it does not shift vertically when a field is focused | V8 | 4 | 1 | L | 1 |
| 26 | Verify that the fixed `.nav` on `landing.html` does not jump on keyboard open when the email sign-up form is focused | LND | 4 | 2 | M | 2 |
| 27 | Add `will-change: transform` to `.bottom-nav` to promote it to its own compositor layer and reduce layout thrashing on scroll | V8 | 3 | 1 | L | 2 |
| 28 | Add `will-change: transform` to `.nav` on all pages so the GPU composites it independently from the main scroll layer | ALL | 3 | 1 | L | 2 |
| 29 | Add `transform: translateZ(0)` to `.fan-capture` as a hardware-acceleration hint for iOS Safari compositing | V8 | 3 | 1 | L | 2 |
| 30 | Confirm that no fixed element uses `height: 100vh` — on iOS Safari `100vh` includes the browser chrome and causes overflow; replace with `100dvh` where supported | ALL | 4 | 2 | M | 2 |
| 31 | Replace `height: 100vh` with `height: 100dvh` for any full-screen modal or overlay on V8 | V8 | 4 | 1 | L | 2 |
| 32 | Replace `height: 100vh` with `height: 100dvh` for any full-screen modal or overlay on `admin.html` | ADM | 4 | 1 | L | 2 |
| 33 | Replace `height: 100vh` with `height: 100dvh` for any full-screen modal or overlay on `start.html` | STR | 4 | 1 | L | 2 |
| 34 | Use a CSS custom property `--vh` updated via a `resize` JS listener as a `100vh` fallback for browsers that don't support `dvh` | ALL | 3 | 2 | M | 2 |
| 35 | Confirm that `.bottom-nav` never uses `bottom: 0` without a `env(safe-area-inset-bottom)` fallback — patch both V8 and admin | ALL | 5 | 1 | L | 1 |
| 36 | Add a CSS `@media (display-mode: standalone)` rule that increases `.bottom-nav` padding-bottom by an additional `4px` for installed PWA mode | ALL | 3 | 1 | L | 3 |
| 37 | Audit all uses of `position: sticky` on V8 and confirm none of them conflict with fixed-position siblings during keyboard transitions | V8 | 3 | 2 | M | 2 |
| 38 | Audit all uses of `position: sticky` on `admin.html` for the same keyboard-conflict issue | ADM | 3 | 2 | M | 2 |
| 39 | Confirm that the profile edit modal on `admin.html` sets the underlying page to `overflow: hidden` while open so body does not scroll behind it | ADM | 4 | 1 | L | 2 |
| 40 | Confirm that the snap-card edit sheet on `admin.html` sets the underlying page to `overflow: hidden` while open | ADM | 4 | 1 | L | 2 |
| 41 | Add a `focusin` handler on `admin.html` modals that detects keyboard open and adjusts the modal's `max-height` to `calc(100dvh - 300px)` | ADM | 4 | 2 | M | 2 |
| 42 | Confirm that the CTA editor modal on `admin.html` scrolls internally rather than relying on fixed positioning when the keyboard is open | ADM | 4 | 2 | M | 2 |
| 43 | Add `overscroll-behavior: contain` to all bottom-sheet and modal scroll containers so body scroll doesn't bleed through | ALL | 4 | 1 | L | 2 |
| 44 | Test that the fan email capture field on V8 does not push `.bottom-nav` upward when focused on iOS 17 Safari | V8 | 5 | 2 | M | 1 |
| 45 | Test that no part of the hero section on V8 jumps or reflows when the fan email field is focused and the keyboard appears | V8 | 4 | 2 | M | 2 |
| 46 | Add a CSS transition `transition: bottom 0.2s ease` to `.fan-capture` so any position change on keyboard open is animated rather than a hard jump | V8 | 3 | 1 | L | 3 |
| 47 | Ensure `.nav` has `transition: none` so keyboard-triggered reflows don't animate the navbar | ALL | 3 | 1 | L | 2 |
| 48 | Add Playwright test: open V8 in mobile viewport, focus the email input, assert `.bottom-nav` `getBoundingClientRect().bottom` is within 4px of expected | V8 | 4 | 3 | M | 3 |
| 49 | Add Playwright test: open `admin.html`, focus a modal input, assert `.nav` position does not change | ADM | 4 | 3 | M | 3 |
| 50 | Document the safe-area token usage in a CSS comment block at the top of each file's `<style>` section | ALL | 2 | 1 | L | 4 |
| 51 | Set `padding-left: env(safe-area-inset-left)` and `padding-right: env(safe-area-inset-right)` on `.nav` for landscape iPad/iPhone orientation | ALL | 3 | 1 | L | 3 |
| 52 | Set `padding-left: env(safe-area-inset-left)` and `padding-right: env(safe-area-inset-right)` on `.bottom-nav` for landscape orientation | V8 | 3 | 1 | L | 3 |
| 53 | Confirm that the tour/gig modal on V8 does not sit behind the keyboard when the ticket URL field is focused | V8 | 4 | 2 | M | 2 |
| 54 | On `start.html`, confirm the wizard's fixed bottom CTA bar ("Next" button) clears `env(safe-area-inset-bottom)` | STR | 5 | 1 | L | 1 |
| 55 | On `start.html`, test that the wizard bottom CTA does not shift on keyboard open for every step that contains a text input | STR | 5 | 2 | M | 1 |
| 56 | On `landing.html`, verify the fixed top nav does not jump when the hero email CTA field is focused | LND | 4 | 2 | M | 2 |
| 57 | Ensure no `transform` is applied to a parent of a `position: fixed` element — this creates a new stacking context and breaks fixed positioning entirely | ALL | 5 | 2 | H | 1 |
| 58 | Audit V8 for any animated parent containers that use `transform` and could break fixed children | V8 | 5 | 2 | H | 1 |
| 59 | Audit `admin.html` for the same transform/fixed-child conflict | ADM | 5 | 2 | H | 1 |
| 60 | Confirm that glass-theme `backdrop-filter` on parent elements does not create a new stacking context that traps fixed children | V8 | 4 | 2 | M | 2 |
| 61 | Add a Playwright visual regression test that captures a screenshot of V8 before and after email field focus and diffs the `.bottom-nav` region | V8 | 4 | 3 | M | 3 |
| 62 | Verify that on iOS 15 and 16 Safari (not just 17) the bottom nav does not jump — these versions have a different keyboard resize model | V8 | 4 | 2 | M | 2 |
| 63 | Confirm that the iOS 15 bottom toolbar (URL bar) resize does not cause `.fan-capture` to reflow — it should use `dvh` or a JS `--vh` var | V8 | 4 | 2 | M | 2 |
| 64 | Confirm that no `@keyframes` animation on a fixed element causes it to repaint on every frame and stutter on keyboard open | ALL | 3 | 2 | M | 3 |
| 65 | Verify that `.bottom-nav` uses `display: flex` with a fixed `height` rather than `min-height` so it doesn't grow when safe-area is added | V8 | 3 | 1 | L | 2 |
| 66 | Check that the admin bottom tab bar (if present) also has correct safe-area handling and does not overlap home indicator | ADM | 4 | 1 | L | 1 |
| 67 | Add a `meta` comment in the HTML `<head>` of each page listing which fixed elements exist, their z-index, and their safe-area handling | ALL | 2 | 1 | L | 5 |
| 68 | Ensure that on landscape iPhone, the `env(safe-area-inset-left)` and `env(safe-area-inset-right)` are respected on all fixed elements | ALL | 3 | 1 | L | 3 |
| 69 | Test that no fixed element overlaps the Dynamic Island area on iPhone 14 Pro (top-centre notch at 34px) | ALL | 4 | 2 | M | 2 |
| 70 | Set `top: calc(env(safe-area-inset-top) + 0px)` explicitly on `.nav` rather than relying on default browser behaviour | ALL | 4 | 1 | L | 2 |
| 71 | Verify that the bottom sheet drag handle on `admin.html` is not obscured by the keyboard when a field inside the sheet is focused | ADM | 4 | 2 | M | 2 |
| 72 | Add a `resize` event listener that recalculates the `--vh` CSS variable on both portrait and landscape changes | ALL | 3 | 2 | M | 2 |
| 73 | Confirm that the `resize` event handler is debounced to 100ms to avoid layout thrashing on rapid orientation changes | ALL | 3 | 1 | L | 2 |
| 74 | Ensure the fan capture success state message does not shift the fixed `.fan-capture` bar height — use `min-height` not `height` | V8 | 4 | 1 | L | 2 |
| 75 | Test that tapping outside a modal on `admin.html` closes it and restores fixed element positions without a jump | ADM | 4 | 2 | M | 2 |
| 76 | Verify that the `.keyboard-open` class removal is triggered by `visualViewport resize` event, not just `focusout`, which fires too early on iOS | V8 | 5 | 2 | M | 2 |
| 77 | Use `window.visualViewport.addEventListener('resize', handler)` as the primary keyboard detection mechanism on iOS Safari | ALL | 5 | 2 | M | 1 |
| 78 | When `visualViewport.height` is less than `window.innerHeight * 0.75`, infer keyboard is open and apply `.keyboard-open` | ALL | 5 | 2 | M | 1 |
| 79 | Confirm that the `visualViewport` resize handler is removed on page unload to prevent memory leaks | ALL | 3 | 1 | L | 3 |
| 80 | Test that on `start.html` step 3 (colour/vibe picker), the colour swatches don't shift when the previous text input loses focus | STR | 3 | 2 | M | 3 |
| 81 | Confirm that the genre tag cloud on `start.html` is not inside a fixed container that could shift | STR | 3 | 1 | L | 2 |
| 82 | Verify that ABLE's custom toast/snackbar component uses a fixed position with proper safe-area bottom offset | ALL | 4 | 1 | L | 2 |
| 83 | Ensure the toast/snackbar z-index (200) sits above the bottom nav (100) but below any open modal (300) | ALL | 3 | 1 | L | 2 |
| 84 | Test that the upgrade prompt overlay on `admin.html` does not shift when an input inside it is focused | ADM | 3 | 2 | M | 3 |
| 85 | On `landing.html`, test that the fixed signup bar (if present at mobile) has safe-area bottom padding | LND | 3 | 1 | L | 2 |
| 86 | Confirm that the Spotify import progress overlay on `start.html` uses correct `dvh` height and fixed positioning | STR | 3 | 2 | M | 3 |
| 87 | Audit any `position: fixed` inside a CSS `transform`-animated parent and move it outside the animation scope | ALL | 5 | 3 | H | 1 |
| 88 | Confirm that the bottom nav icons on V8 render within the safe zone and are not clipped by rounded screen corners on iPhone 15 | V8 | 3 | 1 | L | 3 |
| 89 | Add a `padding-bottom` to the main page scroll container that equals the height of `.bottom-nav` so the last content item is never hidden beneath it | V8 | 5 | 1 | L | 1 |
| 90 | Add the same scroll-container bottom padding on `admin.html` to clear its bottom nav bar | ADM | 5 | 1 | L | 1 |
| 91 | Test that expanding an accordion section near the bottom of V8 does not get hidden by `.bottom-nav` after the accordion opens | V8 | 4 | 2 | M | 2 |
| 92 | Verify that the `.fan-capture` bar shrinks or hides when the user has already signed up, freeing bottom space | V8 | 3 | 2 | M | 3 |
| 93 | Add a CSS transition on `padding-bottom` of the scroll container when `.keyboard-open` class changes so the layout shift is smooth | V8 | 3 | 1 | L | 3 |
| 94 | Ensure that `overscroll-behavior: none` is set on `<html>` globally so Safari's rubber-band scroll doesn't reveal gaps behind fixed elements | ALL | 4 | 1 | L | 2 |
| 95 | Test that after closing a modal on `admin.html`, `overflow: hidden` is correctly removed from `<body>` so scrolling resumes | ADM | 4 | 1 | L | 2 |
| 96 | Verify the z-index stack is tested in the glass theme on V8, where `backdrop-filter` on parent elements can create unexpected stacking contexts | V8 | 3 | 2 | M | 3 |
| 97 | On `start.html`, confirm the wizard step indicator dots in the fixed top bar are not clipped by the notch on iPhone 14 Pro | STR | 3 | 1 | L | 3 |
| 98 | Add a dedicated QA checklist item to `docs/QA_SMOKE_TESTS.md` for iOS Safari fixed-position keyboard behaviour | ALL | 3 | 1 | L | 4 |
| 99 | Document the `visualViewport` keyboard detection pattern in a code comment alongside its implementation in every file it's used in | ALL | 2 | 1 | L | 5 |
| 100 | After implementing all safe-area and keyboard fixes, run a full Playwright screenshot audit at 390px viewport to confirm no visual regressions | ALL | 4 | 2 | M | 4 |
