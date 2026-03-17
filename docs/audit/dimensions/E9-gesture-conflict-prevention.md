# Dimension E9 — Gesture Conflict Prevention
**Category:** Mobile UX & Touch
**Phase:** 3 (Mobile)
**Status:** Not started

On iOS Safari, the browser reserves the left and right edges of the screen for the system-level back/forward swipe gesture. Any ABLE component that uses horizontal swipe close to the viewport edge will compete with this gesture, resulting in accidental browser navigation. Bottom sheets must use vertical-only swipe (`touch-action: pan-y`). Horizontal carousels must not extend to the viewport edge without buffering. There must be no competing pull-to-refresh gesture on admin pages where the body has `overscroll-behavior: none`. Full compliance means every interactive gesture in ABLE is isolated to its container, never conflicts with iOS system gestures, and has the correct `touch-action` property set to give the browser unambiguous signal about which axes are intentional.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add `touch-action: pan-y` to all bottom sheet components on `admin.html` so vertical swipe-to-dismiss is explicit and horizontal swipe is passed to the browser | ADM | 5 | 1 | L | 1 |
| 2 | Add `touch-action: pan-y` to the modal drag handle on `admin.html` | ADM | 5 | 1 | L | 1 |
| 3 | Add `touch-action: pan-y` to the `.fan-capture` bar on V8 to prevent accidental horizontal gesture interference | V8 | 4 | 1 | L | 1 |
| 4 | Add `touch-action: pan-x` to any horizontal scroll carousel or pill row on V8 that should scroll sideways | V8 | 4 | 1 | L | 1 |
| 5 | Add `touch-action: pan-x` to the quick-action pills overflow scroll container on V8 | V8 | 4 | 1 | L | 1 |
| 6 | Add `touch-action: pan-x` to the platform pill scroll row on V8 | V8 | 3 | 1 | L | 1 |
| 7 | Set `overscroll-behavior-x: none` on the `<body>` element on all pages to prevent horizontal overscroll from triggering browser navigation | ALL | 5 | 1 | L | 1 |
| 8 | Set `overscroll-behavior-y: contain` on all overflow scroll containers (fan list, event list, snap card list) to prevent vertical overscroll from triggering pull-to-refresh | ALL | 4 | 1 | L | 1 |
| 9 | Set `overscroll-behavior: none` on `<html>` on `admin.html` to fully prevent both pull-to-refresh and swipe navigation from competing with ABLE gestures | ADM | 4 | 1 | L | 1 |
| 10 | Confirm that no horizontal swipe gesture area on V8 sits within 20px of the left or right viewport edge — add `margin` or `padding` buffer if needed | V8 | 5 | 2 | M | 1 |
| 11 | Confirm that no horizontal swipe gesture area on `admin.html` sits within 20px of the viewport edge | ADM | 5 | 2 | M | 1 |
| 12 | Confirm that the snap card row (if horizontally scrollable) has at least 16px padding from the left viewport edge to create a dead zone for the browser gesture | V8 | 4 | 2 | M | 1 |
| 13 | Confirm that the music track list does not use any horizontal swipe-to-action (e.g., swipe-to-delete) that would conflict with the browser back gesture | V8 | 4 | 1 | L | 1 |
| 14 | Confirm that the fan list on `admin.html` does not use swipe-to-delete if that would conflict with browser back swipe | ADM | 4 | 1 | L | 1 |
| 15 | If a swipe-to-delete pattern is needed on `admin.html`, implement it as a long-press context menu instead of a horizontal swipe | ADM | 3 | 3 | M | 4 |
| 16 | Confirm that the `start.html` wizard does not use a horizontal swipe gesture to advance steps — use the Next button only | STR | 4 | 2 | M | 1 |
| 17 | If `start.html` does use a swipe-to-advance gesture, remove it or add a 20px edge buffer and `touch-action` constraint | STR | 4 | 2 | M | 1 |
| 18 | Add `touch-action: manipulation` to all buttons and interactive tap targets across all pages to disable double-tap zoom on those elements | ALL | 4 | 1 | L | 1 |
| 19 | Confirm that `touch-action: manipulation` is applied to every `<button>`, `<a>`, and custom interactive `<div>`/`<span>` | ALL | 4 | 1 | L | 1 |
| 20 | Add `user-select: none` to all non-text interactive elements to prevent accidental text selection when users are tapping quickly | ALL | 3 | 1 | L | 2 |
| 21 | Confirm that `user-select: none` is not applied to text content (artist bio, track names, fan emails) — users may want to copy those | ALL | 3 | 1 | L | 2 |
| 22 | Confirm that the bottom sheet on `admin.html` uses a `pointermove` handler (not `touchmove`) for drag detection — `pointermove` works for both touch and mouse | ADM | 3 | 2 | M | 2 |
| 23 | Confirm that the bottom sheet drag handler calls `event.preventDefault()` only when the gesture is clearly intentional (velocity above threshold) | ADM | 4 | 2 | M | 2 |
| 24 | Confirm that `event.preventDefault()` is not called on passive event listeners — this logs a browser warning and degrades scroll performance | ALL | 5 | 2 | M | 1 |
| 25 | Change any `touchstart` or `touchmove` listeners that call `preventDefault()` to be non-passive by passing `{ passive: false }` explicitly | ALL | 4 | 2 | M | 1 |
| 26 | Confirm that all `scroll` event listeners are registered as `{ passive: true }` to allow the browser to scroll without waiting for JS | ALL | 5 | 1 | L | 1 |
| 27 | Confirm that all `touchstart` listeners that do NOT call `preventDefault()` are registered as `{ passive: true }` | ALL | 4 | 1 | L | 1 |
| 28 | Confirm that all `wheel` event listeners are `{ passive: true }` | ALL | 3 | 1 | L | 2 |
| 29 | Test the bottom sheet drag on a physical iPhone to confirm it does not trigger browser back navigation when swiping the sheet left | ADM | 5 | 2 | M | 2 |
| 30 | Test that swiping horizontally on the quick-action pills on V8 does not trigger browser back navigation | V8 | 5 | 2 | M | 2 |
| 31 | Test that tapping the back button area (top-left of iOS Safari) while on V8 does not accidentally trigger any V8 gesture handler | V8 | 4 | 2 | M | 2 |
| 32 | Confirm that the V8 hero swipe-up gesture (if present for bio expand) uses `touch-action: pan-y` to prevent conflicts with horizontal browser gestures | V8 | 4 | 1 | L | 2 |
| 33 | Confirm that there is no competing vertical pull-to-refresh zone at the top of V8 when `overscroll-behavior: none` is set | V8 | 3 | 1 | L | 2 |
| 34 | Confirm that `admin.html` does not implement any custom pull-to-refresh (the native one is disabled by `overscroll-behavior: none`) | ADM | 3 | 1 | L | 2 |
| 35 | Confirm that the colour picker on `admin.html` (if it uses a drag interaction to pick a hue) has `touch-action: none` to prevent scroll interference | ADM | 3 | 1 | L | 2 |
| 36 | Confirm that the accent colour hue slider on `admin.html` uses `touch-action: pan-x` so it only accepts horizontal drag | ADM | 4 | 1 | L | 2 |
| 37 | Add `touch-action: pan-x` to the brightness/saturation sliders on the colour picker (if present) | ADM | 3 | 1 | L | 2 |
| 38 | Confirm that the `start.html` genre/vibe colour swatches use `touch-action: manipulation` to prevent double-tap zoom on the small swatches | STR | 3 | 1 | L | 2 |
| 39 | Confirm that map or embed components (if any) on `admin.html` have `pointer-events: none` when the user is just viewing, and only activate on explicit tap | ADM | 3 | 2 | M | 3 |
| 40 | Confirm that the `landing.html` testimonial carousel (if present) uses `touch-action: pan-x` and has a 20px edge buffer | LND | 3 | 1 | L | 2 |
| 41 | If `landing.html` has a vertical scroll-jacking effect (sections that snap on scroll), confirm it does not conflict with iOS native scroll behaviour | LND | 4 | 2 | H | 2 |
| 42 | Remove any `scroll-snap-type: y mandatory` on the top-level `<body>` or `<html>` element on `landing.html` — this creates conflict with iOS momentum scroll | LND | 4 | 1 | L | 2 |
| 43 | Use `scroll-snap-type: y proximity` instead of `mandatory` if section snapping is needed, to be less aggressive | LND | 3 | 1 | L | 2 |
| 44 | Confirm that the `start.html` wizard does not intercept the iOS swipe-back gesture — the wizard should allow swipe-back to leave the wizard | STR | 4 | 2 | M | 2 |
| 45 | If `start.html` blocks the swipe-back gesture, add a visible "Back" button as an alternative | STR | 4 | 1 | L | 2 |
| 46 | Add a `pointercancel` event handler to all gesture implementations so drags are cleanly cancelled if another gesture takes over | ALL | 3 | 2 | M | 3 |
| 47 | Confirm that all `pointerdown` gesture handlers have a corresponding `pointerup` and `pointercancel` cleanup so gesture state is never stuck | ALL | 4 | 2 | M | 2 |
| 48 | Test that the bottom sheet on `admin.html` correctly handles a `pointercancel` (e.g., incoming call interrupt) and snaps back cleanly | ADM | 3 | 2 | M | 3 |
| 49 | Confirm that rapid successive taps on the fan submit button on V8 do not queue multiple submissions — use `pointer-events: none` after first tap | V8 | 5 | 1 | L | 1 |
| 50 | Confirm that rapid successive taps on any admin action button do not queue multiple server calls | ADM | 4 | 1 | L | 1 |
| 51 | Add a 300ms debounce to all button tap handlers that trigger network requests | ALL | 4 | 1 | L | 2 |
| 52 | Confirm that the 300ms debounce does not create a perceptible delay in visual feedback — show the loading state immediately but debounce the API call | ALL | 4 | 2 | M | 2 |
| 53 | Confirm that ABLE does not use `click` event listeners where `pointerup` is more appropriate for faster mobile responsiveness (300ms click delay on older iOS) | ALL | 3 | 2 | M | 3 |
| 54 | Confirm that `touch-action: manipulation` on buttons eliminates the 300ms click delay on modern iOS without using `FastClick` | ALL | 4 | 1 | L | 1 |
| 55 | Confirm that no third-party library introduces a `FastClick` polyfill — this causes double-tap bugs on modern iOS | ALL | 4 | 1 | L | 1 |
| 56 | Confirm that `<a href>` links use native HTML navigation rather than `preventDefault` + JS routing — native navigation triggers the correct iOS swipe-back gesture | ALL | 4 | 1 | L | 2 |
| 57 | Confirm that the back button on `admin.html` (if it navigates to the previous page) uses `history.back()` so iOS swipe-back also works | ADM | 3 | 1 | L | 2 |
| 58 | Confirm that no global `document.addEventListener('touchmove', preventDefault)` is added — this blocks all scrolling | ALL | 5 | 1 | L | 1 |
| 59 | Confirm that no global `document.addEventListener('touchstart', preventDefault)` is added — this blocks all taps | ALL | 5 | 1 | L | 1 |
| 60 | Test the full V8 page by attempting iOS swipe-back (from left edge) and confirm it navigates to the referrer without issues | V8 | 4 | 2 | M | 2 |
| 61 | Test iOS swipe-forward after swipe-back on V8 and confirm the page is restored correctly | V8 | 3 | 2 | M | 3 |
| 62 | Test iOS swipe-back on `admin.html` and confirm it navigates correctly | ADM | 3 | 2 | M | 2 |
| 63 | Test iOS swipe-back on `start.html` and confirm it navigates back through wizard steps or exits as expected | STR | 4 | 2 | M | 2 |
| 64 | Confirm that two-finger scroll gestures (used by some iOS users) work correctly on all scroll containers | ALL | 3 | 2 | M | 3 |
| 65 | Confirm that pinch-to-zoom still works on V8 despite any `touch-action` rules — do not prevent zoom on the main content | V8 | 4 | 2 | M | 2 |
| 66 | Confirm that `touch-action: manipulation` (used on buttons) does not prevent pinch-to-zoom on the parent page container | ALL | 4 | 1 | L | 2 |
| 67 | Confirm that the three-dot / overflow menu on `admin.html` (if present) does not use a long-press that conflicts with iOS's long-press for copy/paste | ADM | 3 | 2 | M | 3 |
| 68 | If a long-press context menu is used on `admin.html`, ensure it triggers after 400ms (beyond the iOS long-press threshold of 300ms for copy menu) | ADM | 3 | 2 | M | 3 |
| 69 | Add `contextmenu` event suppression to long-press elements to prevent the native iOS context menu from appearing alongside ABLE's | ADM | 3 | 1 | L | 3 |
| 70 | Confirm that drag-to-reorder snap cards on `admin.html` (if present) uses `touch-action: none` during the drag and restores it after | ADM | 3 | 3 | M | 4 |
| 71 | Confirm that drag-to-reorder does not interfere with the page scroll when the user is dragging near the top or bottom of the scroll area | ADM | 3 | 3 | M | 4 |
| 72 | Implement auto-scroll for drag-to-reorder so the list scrolls as the user drags an item near the top or bottom edge | ADM | 2 | 4 | M | 5 |
| 73 | Confirm that the snap card reorder auto-scroll does not conflict with the iOS momentum scroll or overscroll behaviour | ADM | 3 | 3 | M | 5 |
| 74 | Confirm that any swipe-to-reveal action (e.g., on a fan list row) snaps to a fully open or fully closed state and does not leave an item half-open | ADM | 3 | 2 | M | 3 |
| 75 | Add a velocity-based snap decision for swipe-to-reveal: if velocity > 500px/s, complete the swipe; if less, snap back | ADM | 3 | 3 | M | 4 |
| 76 | Confirm that the wizard step indicator dots on `start.html` are not tappable targets that create touch conflicts with swipe navigation | STR | 3 | 1 | L | 2 |
| 77 | Confirm that the `landing.html` sticky nav does not intercept scroll events that should scroll the page | LND | 3 | 1 | L | 2 |
| 78 | Confirm that iframe embeds on V8 (YouTube, Spotify) have `pointer-events: none` initially and only activate on a tap — this prevents iframes from swallowing all scroll events | V8 | 4 | 2 | M | 2 |
| 79 | Add a tap-to-activate overlay on iframes on V8 so the user must intentionally engage the embed before it intercepts touch events | V8 | 4 | 3 | M | 3 |
| 80 | Test that scrolling past a Spotify embed on V8 does not stall scroll momentum (embed swallowing touch events) | V8 | 5 | 2 | M | 2 |
| 81 | Test that scrolling past a YouTube embed on V8 does not stall scroll momentum | V8 | 5 | 2 | M | 2 |
| 82 | Add `allow-pointer-lock` to iframes only when the user has tapped to activate them | V8 | 3 | 2 | M | 3 |
| 83 | Add Playwright test: simulate a swipe from left edge (x: 5) to right on V8 and assert browser navigation occurred (no ABLE handler intercepted) | V8 | 4 | 3 | M | 3 |
| 84 | Add Playwright test: swipe horizontally on the quick-action pill row and assert horizontal scroll occurred correctly | V8 | 3 | 3 | M | 3 |
| 85 | Add Playwright test: drag the admin bottom sheet handle downward and assert the sheet closes | ADM | 3 | 3 | M | 3 |
| 86 | Confirm that no `mousemove`-only gesture handler exists without a corresponding `pointermove` handler for touch compatibility | ALL | 4 | 2 | M | 2 |
| 87 | Confirm that all gesture handlers use `pointer` events (not `mouse` or `touch`) for unified desktop/mobile support | ALL | 4 | 2 | M | 2 |
| 88 | Add a `touch-action: none` property to the accent colour wheel on `admin.html` to give ABLE full control during drag | ADM | 3 | 1 | L | 2 |
| 89 | Confirm that switching away from `admin.html` while a gesture is in progress (e.g., tap the home button mid-drag) correctly resets all gesture state | ADM | 3 | 2 | M | 3 |
| 90 | Add `document.addEventListener('visibilitychange', resetAllGestureState)` to clean up any in-progress gesture state when the tab becomes hidden | ALL | 3 | 2 | M | 3 |
| 91 | Confirm that ABLE's gesture implementation does not disable iOS's accessibility-driven gestures (VoiceOver swipe navigation) | ALL | 4 | 2 | M | 2 |
| 92 | Test VoiceOver swipe navigation on V8 to confirm it is not blocked by `touch-action` or `pointer-events` rules | V8 | 4 | 3 | M | 3 |
| 93 | Confirm that `role="region"` and `tabindex="0"` are set on scroll containers so they are reachable by assistive technology swipe navigation | ALL | 3 | 2 | M | 3 |
| 94 | Review all `pointer-events: none` rules to ensure they are only applied when the element is intentionally non-interactive (not as a layout hack) | ALL | 3 | 1 | L | 2 |
| 95 | Confirm that removing `pointer-events: none` from any element does not accidentally make non-interactive elements intercept taps | ALL | 3 | 2 | M | 2 |
| 96 | Add a Playwright test: on `admin.html`, tap outside an open bottom sheet and confirm the sheet closes and gesture state resets | ADM | 4 | 2 | M | 3 |
| 97 | Document the `touch-action` strategy in a CSS comment block: which containers use `pan-x`, `pan-y`, `manipulation`, and `none` and why | ALL | 2 | 1 | L | 5 |
| 98 | Add a QA checklist item: "Test browser back-swipe on all four pages from a physical iPhone and confirm no ABLE gesture intercepts it" | ALL | 4 | 1 | L | 4 |
| 99 | Add a QA checklist item: "Test horizontal scroll of quick-action pills on V8 and confirm no browser navigation occurs" | V8 | 4 | 1 | L | 4 |
| 100 | After all gesture fixes, run a full Playwright gesture audit suite at 390px and confirm all interactions complete without gesture conflicts | ALL | 4 | 2 | M | 4 |
