# Dimension E6 — Scroll Behaviour
**Category:** Mobile UX & Touch
**Phase:** 3 (Mobile)
**Status:** Not started

Scroll quality is one of the most visceral indicators of app quality on mobile. Jank — dropped frames, stutters, or visual glitches during scroll — immediately signals "amateur product" to a user. ABLE's primary audience is iPhones, where scroll performance is judged against the native iOS standard. Full compliance means every page scrolls at 60fps with no layout shift, no parallax glitch, no content popping in or out, and no sticky elements causing repaints. Key mitigations include promoting scroll-involved elements to GPU layers with `will-change: transform`, setting `contain: paint` on heavy sections, using `transform` rather than `top`/`left` for sticky elements, and ensuring `-webkit-overflow-scrolling: touch` (or its modern equivalent) is set for any overflow scroll container.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add `will-change: transform` to the `.nav` top bar on all pages to promote it to its own compositor layer | ALL | 5 | 1 | L | 1 |
| 2 | Add `will-change: transform` to the `.bottom-nav` bar on V8 and `admin.html` | V8 | 5 | 1 | L | 1 |
| 3 | Add `will-change: transform` to the `.fan-capture` sticky bar on V8 | V8 | 4 | 1 | L | 1 |
| 4 | Set `overscroll-behavior: none` on `<html>` globally to prevent the browser pull-to-refresh and overscroll rubber-band from interfering with fixed elements | ALL | 4 | 1 | L | 1 |
| 5 | Set `overscroll-behavior: contain` on any overflow scroll container (modals, bottom sheets, fan list) to prevent scroll bleed to the page body | ALL | 4 | 1 | L | 1 |
| 6 | Add `-webkit-overflow-scrolling: touch` to all `overflow: auto` and `overflow: scroll` containers for momentum scrolling on iOS | ALL | 4 | 1 | L | 1 |
| 7 | Add `scroll-behavior: smooth` to `<html>` for anchor-link navigation on `landing.html` | LND | 3 | 1 | L | 2 |
| 8 | Ensure `scroll-behavior: smooth` is only applied on `prefers-reduced-motion: no-preference` to respect accessibility settings | ALL | 4 | 1 | L | 2 |
| 9 | Set `contain: paint` on the hero artwork/video section on V8 so the GPU only repaints that layer during artwork transitions | V8 | 4 | 1 | L | 2 |
| 10 | Set `contain: paint` on each snap card on V8 to prevent snap card repaints from triggering a full page repaint | V8 | 3 | 1 | L | 2 |
| 11 | Set `contain: paint` on each music section item on V8 | V8 | 3 | 1 | L | 2 |
| 12 | Set `contain: layout` on the events/bento grid on V8 to isolate its layout from the rest of the scroll container | V8 | 3 | 1 | L | 2 |
| 13 | Set `contain: layout` on the analytics cards in `admin.html` | ADM | 3 | 1 | L | 2 |
| 14 | Ensure that hero artwork on V8 uses `object-fit: cover` and a fixed `aspect-ratio` instead of height in `vh` to avoid reflow during scroll | V8 | 4 | 1 | L | 1 |
| 15 | Confirm there are no `scroll` event listeners on V8 that call `getBoundingClientRect()` in the handler — move these to `IntersectionObserver` | V8 | 5 | 2 | M | 1 |
| 16 | Confirm there are no `scroll` event listeners on `admin.html` that call `getBoundingClientRect()` in the handler | ADM | 5 | 2 | M | 1 |
| 17 | Replace any `scroll` event-based parallax with `@scroll-timeline` or `IntersectionObserver` for GPU-offloaded scroll effects | V8 | 4 | 3 | M | 3 |
| 18 | Confirm that all `IntersectionObserver` callbacks on V8 are debounced or deferred with `requestAnimationFrame` | V8 | 4 | 2 | M | 2 |
| 19 | Add `requestAnimationFrame` wrapping to any DOM mutation triggered by scroll position on V8 | V8 | 4 | 2 | M | 2 |
| 20 | Ensure images on V8 all have explicit `width` and `height` attributes (or `aspect-ratio` CSS) to prevent layout shift during scroll as images load | V8 | 5 | 2 | M | 1 |
| 21 | Ensure images on `landing.html` all have explicit `width` and `height` attributes | LND | 4 | 2 | M | 1 |
| 22 | Ensure images on `admin.html` (artist avatar, artwork thumbnails) have `width` and `height` attributes | ADM | 4 | 1 | L | 1 |
| 23 | Add `loading="lazy"` to all below-the-fold images on V8 to prevent layout shift from eager image loads | V8 | 4 | 1 | L | 1 |
| 24 | Add `loading="lazy"` to all below-the-fold images on `landing.html` | LND | 4 | 1 | L | 1 |
| 25 | Set a `min-height` placeholder on lazy-loaded image containers on V8 so there is no layout shift when images load | V8 | 4 | 1 | L | 1 |
| 26 | Confirm that the hero artwork on V8 is NOT lazy-loaded — above-the-fold images must load eagerly | V8 | 5 | 1 | L | 1 |
| 27 | Add `fetchpriority="high"` to the hero artwork `<img>` on V8 | V8 | 4 | 1 | L | 1 |
| 28 | Add `fetchpriority="high"` to the hero image on `landing.html` | LND | 3 | 1 | L | 1 |
| 29 | Confirm no iframe on V8 (YouTube embed, Spotify embed) causes layout shift when it loads — set explicit `height` and `aspect-ratio` | V8 | 5 | 2 | M | 1 |
| 30 | Wrap iframes on V8 in a fixed-aspect-ratio container (`padding-top: 56.25%` technique or `aspect-ratio: 16/9`) | V8 | 4 | 1 | L | 1 |
| 31 | Confirm that expanding the YouTube/Spotify iframe does not cause the rest of the page to reflow | V8 | 4 | 2 | M | 2 |
| 32 | Confirm that the music player section on V8 has a fixed height reserved before the player loads to prevent layout shift | V8 | 4 | 2 | M | 2 |
| 33 | Test CLS (Cumulative Layout Shift) on V8 using Lighthouse and target a score below 0.1 | V8 | 5 | 2 | M | 2 |
| 34 | Test CLS on `landing.html` using Lighthouse and target below 0.1 | LND | 4 | 2 | M | 2 |
| 35 | Test CLS on `start.html` and `admin.html` using Lighthouse | STR | 3 | 2 | M | 2 |
| 36 | Add `font-display: swap` to all Google Fonts imports to prevent invisible text during font load causing visual shift on scroll | ALL | 4 | 1 | L | 1 |
| 37 | Preload the primary webfont (DM Sans or Plus Jakarta Sans) in `<head>` using `<link rel=preload as=font>` | ALL | 4 | 2 | M | 2 |
| 38 | Confirm sticky section headers on `admin.html` (if any) use `position: sticky` with `top: 0` and a `background-color` token to avoid transparent-over-content glitches | ADM | 3 | 1 | L | 2 |
| 39 | Confirm sticky section headers have `z-index` set so they correctly layer above the scrolling content below them | ADM | 3 | 1 | L | 2 |
| 40 | Confirm that `position: sticky` elements on V8 do not glitch when a parent container has `overflow: hidden` (this breaks sticky) | V8 | 4 | 2 | H | 1 |
| 41 | Audit all `overflow: hidden` on parent elements of sticky children on V8 and replace with `overflow: clip` where possible | V8 | 4 | 2 | M | 2 |
| 42 | Audit all `overflow: hidden` on parent elements of sticky children on `admin.html` | ADM | 4 | 2 | M | 2 |
| 43 | Confirm that `transform` on a parent element does not create a new positioning context that breaks `position: sticky` children | ALL | 4 | 2 | H | 1 |
| 44 | Test scroll behaviour on iPhone SE at 375px — scroll the full V8 profile page at speed and confirm no dropped frames | V8 | 5 | 2 | M | 2 |
| 45 | Test scroll behaviour on iPhone 14 at 390px on the same full-scroll test | V8 | 5 | 2 | M | 2 |
| 46 | Test scroll behaviour on the `admin.html` fan list section with 50+ fans loaded | ADM | 4 | 2 | M | 3 |
| 47 | Test scroll behaviour on `landing.html` full-page scroll | LND | 4 | 2 | M | 2 |
| 48 | Confirm that the bottom sheet drag interaction on `admin.html` uses `touch-action: pan-y` so scroll doesn't conflict with drag | ADM | 4 | 1 | L | 2 |
| 49 | Confirm that the fan list scroll container on `admin.html` has `overflow-y: auto` (not `scroll`) to avoid always-visible scrollbars on iPad | ADM | 3 | 1 | L | 2 |
| 50 | Add CSS `scrollbar-width: none` and `::-webkit-scrollbar { display: none }` to any scroll containers that should have native-feel invisible scrollbars | ALL | 3 | 1 | L | 3 |
| 51 | Confirm that horizontal scrollable sections (if any) on V8 use `scroll-snap-type: x mandatory` and `scroll-snap-align: start` for smooth snap scrolling | V8 | 4 | 1 | L | 2 |
| 52 | Confirm that horizontal scroll sections have `overscroll-behavior-x: contain` so horizontal scroll doesn't trigger browser back/forward | V8 | 4 | 1 | L | 2 |
| 53 | Confirm that scroll snap containers on V8 have `-webkit-overflow-scrolling: touch` for momentum on iOS | V8 | 3 | 1 | L | 2 |
| 54 | Audit all CSS `animation` and `transition` declarations to ensure they only animate `transform` and `opacity` — animating `width`, `height`, `top`, `left`, or `margin` triggers layout | ALL | 5 | 2 | M | 1 |
| 55 | Replace any `height` animation on expand/collapse sections with `max-height` or a `scaleY` transform animation | ALL | 4 | 2 | M | 2 |
| 56 | Confirm that accordion/expand animations on V8 (snap cards, show details) use `transform` not `height` changes | V8 | 4 | 2 | M | 2 |
| 57 | Confirm that accordion/expand animations on `admin.html` (settings sections) use `transform` not `height` changes | ADM | 3 | 2 | M | 2 |
| 58 | Confirm that the bottom sheet open/close animation on `admin.html` uses `transform: translateY()` exclusively | ADM | 4 | 1 | L | 1 |
| 59 | Confirm that modals on `admin.html` fade in with `opacity` and `transform: scale()` only — no layout-triggering properties | ADM | 4 | 1 | L | 1 |
| 60 | Remove any `box-shadow` transitions on scroll-visible elements — box-shadow transitions can cause repaints | ALL | 3 | 1 | L | 3 |
| 61 | Use `filter: drop-shadow()` instead of `box-shadow` on animated card elements to keep shadow on the GPU compositor layer | ALL | 3 | 2 | M | 4 |
| 62 | Confirm that the star/like button tap animation on V8 uses `transform: scale()` only | V8 | 3 | 1 | L | 2 |
| 63 | Confirm that the fan sign-up success animation on V8 uses `transform` and `opacity` only | V8 | 3 | 1 | L | 2 |
| 64 | Add `content-visibility: auto` to below-the-fold sections on V8 to defer layout and paint work until sections enter the viewport | V8 | 4 | 2 | M | 3 |
| 65 | Add `contain-intrinsic-size: 0 500px` alongside `content-visibility: auto` on V8 sections to prevent layout shift when sections are skipped | V8 | 3 | 2 | M | 3 |
| 66 | Add `content-visibility: auto` to major sections of `landing.html` that are below the fold | LND | 3 | 2 | M | 3 |
| 67 | Confirm that `content-visibility: auto` does not break IntersectionObserver-triggered entrance animations by prematurely skipping rendering | V8 | 3 | 2 | M | 3 |
| 68 | Confirm that all entrance animations on V8 are triggered by `IntersectionObserver` with `threshold: 0.1` (not `scroll` event) | V8 | 4 | 2 | M | 2 |
| 69 | Confirm that entrance animation keyframes only use `transform` and `opacity` — no `margin`, `padding`, or `height` changes | V8 | 4 | 1 | L | 2 |
| 70 | Set `animation-fill-mode: both` on all entrance animations so elements start in their pre-animation state and don't flash | V8 | 3 | 1 | L | 2 |
| 71 | Confirm that all animations are paused via `animation: none` under `@media (prefers-reduced-motion: reduce)` | ALL | 4 | 1 | L | 2 |
| 72 | Confirm that scroll-linked progress bars (if any on `landing.html`) use `IntersectionObserver` or `ScrollTimeline` not a `scroll` event listener | LND | 3 | 2 | M | 3 |
| 73 | Check that no `window.addEventListener('scroll', ...)` handler exists without throttling to `requestAnimationFrame` | ALL | 5 | 2 | M | 1 |
| 74 | Confirm that the Spotify import progress bar on `start.html` uses `transform: scaleX()` for smooth animated progress | STR | 3 | 1 | L | 2 |
| 75 | Confirm that the wizard step progress bar on `start.html` uses `transform: scaleX()` | STR | 3 | 1 | L | 2 |
| 76 | Check that loading skeleton shimmer animations use `background-position` animation (runs on GPU) rather than `opacity` pulse | ALL | 3 | 1 | L | 3 |
| 77 | Confirm that the admin stats panel does not re-render on every scroll event — it should only update when data changes | ADM | 4 | 2 | M | 2 |
| 78 | Confirm that the fan list on `admin.html` uses a virtual scroll approach if the list exceeds 100 items | ADM | 3 | 3 | M | 5 |
| 79 | Ensure that the `admin.html` performance stats chart (if present) does not run continuous `requestAnimationFrame` loops when not in view | ADM | 3 | 2 | M | 3 |
| 80 | Confirm that the merch section on V8 does not cause a reflow when product images load — set explicit `aspect-ratio` | V8 | 3 | 1 | L | 2 |
| 81 | Confirm that show/event cards on V8 have fixed heights or explicit `min-height` to prevent layout shift when event data loads | V8 | 4 | 1 | L | 1 |
| 82 | Add Playwright test: scroll V8 from top to bottom and assert no layout shift using PerformanceObserver CLS metric | V8 | 4 | 3 | M | 3 |
| 83 | Add Playwright test: scroll `landing.html` and assert CLS below 0.1 | LND | 3 | 3 | M | 3 |
| 84 | Run Chrome DevTools Performance recording on V8 mobile simulation and verify no red/yellow frames during scroll | V8 | 4 | 2 | M | 3 |
| 85 | Run Chrome DevTools Performance recording on `landing.html` mobile simulation | LND | 3 | 2 | M | 3 |
| 86 | Confirm that iOS Safari's `requestAnimationFrame` fires at 60fps during scroll on V8 (use frame timing markers) | V8 | 4 | 3 | M | 3 |
| 87 | Confirm that the glass theme on V8 does not cause excessive repaints from `backdrop-filter: blur()` on scroll — test with DevTools Layers panel | V8 | 4 | 3 | H | 3 |
| 88 | If the glass theme causes jank, reduce `blur()` radius or restrict `backdrop-filter` to fixed elements only | V8 | 4 | 2 | M | 3 |
| 89 | Confirm that no event listener causes `document.body.style` to be updated during scroll (any style mutation during scroll causes a full repaint) | ALL | 5 | 2 | H | 1 |
| 90 | Confirm that theme switching (dark/light/glass/contrast) on V8 does not cause a full page repaint that creates a visible flash during scroll | V8 | 3 | 2 | M | 3 |
| 91 | Verify that the pull-to-refresh gesture on iOS does not interfere with the fan capture bar or bottom nav positioning | V8 | 3 | 2 | M | 3 |
| 92 | Confirm that long-press on images on V8 does not interfere with scroll momentum | V8 | 2 | 1 | L | 4 |
| 93 | Test that scrolling with one thumb (bottom-of-screen thumb zone) on iPhone SE is smooth and not accidentally triggering tap events | V8 | 3 | 2 | M | 3 |
| 94 | Confirm that the countdown timer on V8 (pre-release state) does not trigger a layout reflow every second | V8 | 3 | 2 | M | 2 |
| 95 | Update the countdown timer to only mutate text content (not add/remove DOM nodes) on each tick to avoid reflows | V8 | 3 | 2 | M | 2 |
| 96 | Add `paint-order: stroke fill` to any SVG icons in scrollable areas to prevent repaint on hover states during scroll | ALL | 2 | 1 | L | 5 |
| 97 | Confirm that the `.bottom-nav` active state indicator (underline, dot) changes use `transform` or `opacity` not `width` or `height` | V8 | 3 | 1 | L | 2 |
| 98 | Add a QA checklist item to `docs/QA_SMOKE_TESTS.md` for scroll performance: "Scroll V8 on a physical iPhone SE and confirm smooth 60fps" | ALL | 3 | 1 | L | 4 |
| 99 | Document the `will-change`, `contain`, and `overscroll-behavior` strategy in a CSS comment block at the top of V8's performance rules section | V8 | 2 | 1 | L | 5 |
| 100 | After all scroll optimisations, run a Web Vitals audit and confirm LCP, CLS, and INP all pass Core Web Vitals thresholds | ALL | 4 | 2 | M | 4 |
