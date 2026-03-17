# Dimension H7 — First Contentful Paint
**Category:** Security, Data & Performance
**Phase:** 8

FCP under 2 seconds on a 4G mobile connection (10Mbps down, 50ms RTT) is the target. The primary risks are: render-blocking `<link rel="stylesheet">` for Google Fonts, large JavaScript bundles in `<head>`, unoptimised hero artwork, and the flash of empty content before localStorage data loads. The profile page (`able-v8.html`) is the highest-priority surface since it is fan-facing — a slow FCP directly costs fan sign-ups.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk |Wave |
|---|---|---|---|---|---|---|
| 1 | Audit the `<head>` of `able-v8.html` for render-blocking resources — list every `<link rel="stylesheet">` and `<script>` tag | able-v8.html | 5 | 1 | M | 1 |
| 2 | Audit the `<head>` of `admin.html` for render-blocking resources | admin.html | 4 | 1 | M | 1 |
| 3 | Audit the `<head>` of `landing.html` for render-blocking resources | landing.html | 4 | 1 | M | 1 |
| 4 | Audit the `<head>` of `start.html` for render-blocking resources | start.html | 3 | 1 | M | 1 |
| 5 | Verify that Google Fonts are loaded with the non-render-blocking pattern: `<link rel="preconnect" href="https://fonts.googleapis.com">`, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`, then the stylesheet with `media="print" onload="this.media='all'"` — check all four active pages | all pages | 5 | 2 | H | 1 |
| 6 | Verify a `<noscript>` fallback for the Google Fonts `onload` pattern is present on all pages that use it | all pages | 4 | 1 | M | 1 |
| 7 | Verify that `font-display: swap` is appended to the Google Fonts URL via `&display=swap` parameter — confirmed on `landing.html`; check other pages | all pages | 5 | 1 | M | 1 |
| 8 | Add `font-display: swap` to the Fonts URL for any page missing it | all pages | 5 | 1 | M | 1 |
| 9 | Verify that no `<script>` tag in `<head>` lacks `defer` or `async` — any synchronous script in `<head>` blocks HTML parsing | all pages | 5 | 1 | H | 1 |
| 10 | Move the Supabase CDN `<script>` tag to the bottom of `<body>` or add `defer` — confirm it is not in `<head>` without `defer` | able-v8.html | 5 | 1 | H | 1 |
| 11 | Move all `<script>` tags in `able-v8.html` to the end of `<body>` or add `defer` | able-v8.html | 5 | 2 | M | 1 |
| 12 | Move all `<script>` tags in `admin.html` to the end of `<body>` or add `defer` | admin.html | 4 | 2 | M | 1 |
| 13 | Move all `<script>` tags in `landing.html` to the end of `<body>` or add `defer` | landing.html | 4 | 1 | M | 1 |
| 14 | Move all `<script>` tags in `start.html` to the end of `<body>` or add `defer` | start.html | 3 | 1 | M | 1 |
| 15 | Identify the Largest Contentful Paint element on `able-v8.html` — likely the hero artwork image or video | able-v8.html | 5 | 1 | M | 1 |
| 16 | Add `loading="eager"` and `fetchpriority="high"` to the hero artwork `<img>` on `able-v8.html` — the hero image is the LCP element and must not be lazy-loaded | able-v8.html | 5 | 1 | M | 1 |
| 17 | Add `<link rel="preload" as="image" href="[hero-image-url]">` in `<head>` if the hero image URL is known at HTML parse time | able-v8.html | 4 | 2 | M | 2 |
| 18 | Verify that all below-the-fold images have `loading="lazy"` — snap card images, merch images, secondary artwork | able-v8.html | 4 | 1 | M | 1 |
| 19 | Verify that the `lazyload` attribute is correctly applied and working — check whether `IntersectionObserver`-based lazy loading is implemented or whether `loading="lazy"` native attribute is used | able-v8.html | 4 | 1 | M | 1 |
| 20 | Confirm that native `loading="lazy"` is used (not a JS-based polyfill) — the polyfill adds JS execution overhead | able-v8.html | 4 | 1 | M | 1 |
| 21 | Inline critical above-the-fold CSS in a `<style>` block in `<head>` of `able-v8.html` — the critical CSS includes the body background, hero container, and typography tokens | able-v8.html | 5 | 4 | M | 2 |
| 22 | Define "critical CSS" for `able-v8.html`: background colour (`#0d0e1a`), font family fallback stack, hero card dimensions — approximately 200–400 bytes | able-v8.html | 5 | 3 | M | 2 |
| 23 | Inline critical CSS for `landing.html` — above-the-fold includes the hero headline and CTA button | landing.html | 4 | 3 | M | 2 |
| 24 | Inline critical CSS for `admin.html` — the dashboard shell layout | admin.html | 4 | 3 | M | 2 |
| 25 | Inline critical CSS for `start.html` — the wizard first step | start.html | 3 | 3 | M | 3 |
| 26 | Implement a skeleton screen for `able-v8.html` — while localStorage data loads, show a shimmer placeholder for the hero area | able-v8.html | 4 | 3 | M | 2 |
| 27 | Ensure the skeleton screen has the correct dimensions to prevent Cumulative Layout Shift (CLS) when real content replaces it | able-v8.html | 5 | 2 | M | 2 |
| 28 | Verify that the CSS for the skeleton screen is part of the inlined critical CSS — not deferred | able-v8.html | 4 | 2 | M | 2 |
| 29 | Implement a skeleton screen for `admin.html` stat cards — they depend on localStorage data and currently flash empty | admin.html | 4 | 3 | M | 2 |
| 30 | Measure FCP on `able-v8.html` using Lighthouse in Chrome DevTools on a throttled 4G connection — record the current score | able-v8.html | 5 | 1 | M | 1 |
| 31 | Measure FCP on `landing.html` using Lighthouse | landing.html | 4 | 1 | M | 1 |
| 32 | Measure FCP on `admin.html` using Lighthouse | admin.html | 4 | 1 | M | 1 |
| 33 | Measure FCP on `start.html` using Lighthouse | start.html | 3 | 1 | M | 1 |
| 34 | Set a target of Lighthouse Performance score ≥ 90 for `able-v8.html` and `landing.html` | able-v8.html | 5 | 1 | M | 1 |
| 35 | Set a target of Lighthouse Performance score ≥ 75 for `admin.html` — admin is an authenticated tool, slightly lower bar is acceptable | admin.html | 4 | 1 | M | 1 |
| 36 | Verify the `<meta name="viewport" content="width=device-width, initial-scale=1">` tag is present on all pages — its absence causes mobile browsers to render at desktop width | all pages | 4 | 1 | M | 1 |
| 37 | Verify the `<meta charset="UTF-8">` tag is the first element in `<head>` on all pages — the browser can begin parsing immediately without waiting for charset detection | all pages | 3 | 1 | L | 1 |
| 38 | Verify that `able-v8.html` does not fetch any data on initial paint — the page should render from localStorage synchronously, with async Supabase fetch happening after first paint | able-v8.html | 5 | 2 | M | 1 |
| 39 | Verify that `admin.html` renders its shell and skeleton states synchronously from localStorage, with async fetch for updated Supabase data after first paint | admin.html | 4 | 2 | M | 1 |
| 40 | Confirm there is no render-blocking `fetch()` call before the first `DOMContentLoaded` event | all pages | 5 | 2 | H | 1 |
| 41 | Identify and remove any `document.write()` calls — they are render-blocking and should not exist | all pages | 4 | 1 | H | 1 |
| 42 | Verify that the Supabase JS SDK loads asynchronously — it is ~93KB minified and must not block the first paint | all pages | 5 | 1 | H | 1 |
| 43 | Consider conditionally loading the Supabase SDK only on pages that need it — `landing.html` likely does not need Supabase | landing.html | 4 | 2 | M | 2 |
| 44 | Verify that `fan.html` FCP is acceptable — fans arrive via email links, network quality may be worse than expected | fan.html | 4 | 1 | M | 1 |
| 45 | Measure FCP on `fan.html` using Lighthouse | fan.html | 4 | 1 | M | 1 |
| 46 | Add `<link rel="dns-prefetch">` for all third-party hostnames used on the page — `fonts.googleapis.com`, `cdn.jsdelivr.net`, `jgspraqrnjrerzhnnhtb.supabase.co` | all pages | 3 | 1 | L | 2 |
| 47 | Add `<link rel="preconnect">` for Supabase (in addition to Google Fonts) to pre-establish the HTTPS connection | able-v8.html | 3 | 1 | L | 2 |
| 48 | Verify the service worker cache is used for returning visitors — a returning fan should have all assets cached and see an instant FCP | able-v8.html | 5 | 2 | M | 1 |
| 49 | Test FCP for a returning visitor (SW cache hit) — should be under 500ms | able-v8.html | 5 | 2 | M | 2 |
| 50 | Test FCP for a first-time visitor (cold load, no SW cache) — should be under 2000ms on throttled 4G | able-v8.html | 5 | 2 | M | 2 |
| 51 | Verify that the service worker pre-caches the fonts — WOFF2 files for DM Sans should be in the SW precache list | able-v8.html | 4 | 2 | M | 2 |
| 52 | Verify that the service worker pre-caches the critical CSS — the main stylesheet should be in the SW precache list | able-v8.html | 4 | 2 | M | 2 |
| 53 | Verify that the service worker pre-caches `able-v8.html` itself | able-v8.html | 5 | 1 | M | 1 |
| 54 | Audit the total page weight of `able-v8.html` — measure the initial HTML file size | able-v8.html | 4 | 1 | M | 1 |
| 55 | Audit the total page weight of `admin.html` — the file is large (57 innerHTML calls suggests significant JS); measure the file size | admin.html | 4 | 1 | M | 1 |
| 56 | Measure the total blocking time (TBT) for `able-v8.html` on Lighthouse — TBT above 300ms indicates long JavaScript tasks | able-v8.html | 5 | 1 | M | 1 |
| 57 | Measure the Cumulative Layout Shift (CLS) score for `able-v8.html` — target < 0.1 | able-v8.html | 4 | 1 | M | 1 |
| 58 | Identify CLS sources in `able-v8.html`: images without explicit dimensions, fonts swapping (FOUT), content injected above existing content | able-v8.html | 4 | 2 | M | 2 |
| 59 | Add explicit `width` and `height` attributes to all `<img>` tags in `able-v8.html` to prevent layout shifts | able-v8.html | 5 | 2 | M | 1 |
| 60 | Add explicit dimensions to the hero artwork container in `able-v8.html` — prevents CLS when the image loads | able-v8.html | 5 | 1 | M | 1 |
| 61 | Add `aspect-ratio` CSS to artwork containers — prevents CLS for dynamic images loaded from Unsplash/Spotify | able-v8.html | 5 | 1 | M | 1 |
| 62 | Verify the accent colour is applied synchronously from localStorage before first paint — the artist's colour should appear immediately, not flash from default to accent colour | able-v8.html | 4 | 2 | M | 1 |
| 63 | Move the accent colour application script to a `<script>` tag in `<head>` (synchronous, before CSS load) — this prevents the colour flash | able-v8.html | 5 | 2 | M | 1 |
| 64 | Verify that the `admin.html` accent colour application is similarly synchronous | admin.html | 4 | 2 | M | 1 |
| 65 | Test the colour flash: load `able-v8.html` with CPU throttling enabled and confirm no visible default-to-accent flash | able-v8.html | 4 | 2 | M | 2 |
| 66 | Verify that the theme (Dark/Light/Glass/Contrast) is applied before first paint — the theme class should be set synchronously from localStorage | able-v8.html | 4 | 2 | M | 1 |
| 67 | Move theme class application to a `<script>` in `<head>` — same pattern as colour flash prevention | able-v8.html | 4 | 2 | M | 1 |
| 68 | Test the theme flash: load `able-v8.html` in Light theme with CPU throttling — no flash from dark default to light theme | able-v8.html | 4 | 2 | M | 2 |
| 69 | Audit `admin.html` for heavy DOM mutations on load — if it builds the entire dashboard in JS on `DOMContentLoaded`, the Time to Interactive will be poor | admin.html | 4 | 2 | M | 2 |
| 70 | Consider server-side rendering for `able-v8.html` when Supabase is added — Netlify Edge Functions can render the profile page with server-side data, dramatically improving FCP | able-v8.html | 5 | 5 | M | 5 |
| 71 | In the short term (before SSR), use a meta-refresh or HTTP redirect to pre-render the correct state before client JS runs — not a viable approach, noted for context only | able-v8.html | 2 | 1 | L | 5 |
| 72 | Verify that the `<title>` tag is set correctly in the initial HTML (not just in JS) — a title set only by JS causes a flash of wrong title and SEO issues | all pages | 4 | 1 | M | 1 |
| 73 | Add a `<meta name="theme-color">` tag on `able-v8.html` with the default accent colour — this sets the browser chrome colour on mobile immediately, even before CSS loads | able-v8.html | 3 | 1 | L | 2 |
| 74 | Update `<meta name="theme-color">` dynamically via JS once the artist's accent is loaded from localStorage | able-v8.html | 3 | 1 | L | 3 |
| 75 | Verify that Netlify's CDN compression (gzip/brotli) is enabled for HTML files — Netlify enables this by default, but verify it is not disabled by a custom header | netlify.toml | 3 | 1 | M | 1 |
| 76 | Verify that brotli compression is available — Netlify supports brotli on static assets; check the deployed response headers | netlify.toml | 3 | 1 | M | 2 |
| 77 | Confirm that the `Cache-Control: public, max-age=31536000, immutable` for CSS and JS files in `netlify.toml` means repeat visitors load these assets from browser cache with zero network round-trip | netlify.toml | 4 | 1 | M | 1 |
| 78 | Confirm that `Cache-Control: public, max-age=0, must-revalidate` for HTML files ensures fans always get the latest version | netlify.toml | 4 | 1 | M | 1 |
| 79 | Add `<link rel="preload" as="font" href="..." crossorigin>` tags for the most critical font files (DM Sans Regular, DM Sans Medium) to start the font download before the stylesheet is parsed | able-v8.html | 4 | 2 | M | 2 |
| 80 | Verify that font preloads are not added for weights that are not immediately needed above the fold | able-v8.html | 3 | 1 | L | 2 |
| 81 | Run PageSpeed Insights on the deployed `able-v8.html` URL — this provides field data (real users) not just lab data | able-v8.html | 5 | 1 | M | 2 |
| 82 | Run PageSpeed Insights on `landing.html` | landing.html | 4 | 1 | M | 2 |
| 83 | Run WebPageTest with a 4G throttle from London — the primary market | able-v8.html | 4 | 1 | M | 2 |
| 84 | Test FCP on a mid-range Android device (not just iPhone) — Android on Chrome Lite or data-saver mode may behave differently | able-v8.html | 4 | 2 | M | 2 |
| 85 | Verify that the fan sign-up form is visible and interactive before the full page JS finishes loading — the fan capture element must be in the initial HTML, not injected by JS | able-v8.html | 5 | 2 | H | 1 |
| 86 | Confirm that the hero CTAs (primary and secondary buttons) are in the initial HTML — they must be visible before JS runs | able-v8.html | 5 | 1 | H | 1 |
| 87 | Measure Time to Interactive (TTI) on `able-v8.html` — the page must be interactive within 5 seconds on a 4G connection | able-v8.html | 4 | 1 | M | 1 |
| 88 | Measure Speed Index on `able-v8.html` — target < 3.4 seconds | able-v8.html | 4 | 1 | M | 1 |
| 89 | Set a performance budget: FCP < 2s, LCP < 3s, TBT < 200ms, CLS < 0.1, TTI < 5s — document in `docs/STATUS.md` | docs/STATUS.md | 4 | 1 | M | 1 |
| 90 | Add a Playwright performance test that measures FCP using `PerformanceObserver` — run in CI after deployments | able-v8.html | 4 | 4 | M | 3 |
| 91 | Verify that loading `fan.html` does not trigger a network waterfall — if it fetches artist data from Supabase on load, ensure the Supabase SDK is deferred and the fetch only starts after FCP | fan.html | 4 | 2 | M | 2 |
| 92 | Confirm that `start.html` FCP is fast even though it has a confetti animation — the confetti should not load on the initial wizard step | start.html | 3 | 1 | M | 1 |
| 93 | Lazy-load the confetti library in `start.html` — only load it when the final onboarding step is reached | start.html | 3 | 2 | M | 2 |
| 94 | Audit `admin.html` for any chart/sparkline rendering library — if it is loaded eagerly in `<head>`, move it to deferred | admin.html | 4 | 2 | M | 2 |
| 95 | Verify that the countdown timer in pre-release mode does not cause layout reflows — if it updates the DOM every second, ensure it targets only `textContent` of a fixed-width element | able-v8.html | 3 | 1 | M | 2 |
| 96 | Verify the Glass theme blur effect (`backdrop-filter: blur(28px)`) does not cause repaint jank on initial load — it should only activate after the background image is loaded | able-v8.html | 4 | 2 | M | 2 |
| 97 | Verify that no CSS animation plays during the critical rendering path — animations on the hero card should start only after FCP | able-v8.html | 3 | 1 | M | 2 |
| 98 | Run Lighthouse with CPU throttling set to 6x slowdown (the default mobile throttle) and record all scores | able-v8.html | 5 | 1 | M | 2 |
| 99 | Add the Lighthouse score baseline to `docs/STATUS.md` — track it per session so regressions are visible | docs/STATUS.md | 4 | 1 | M | 1 |
| 100 | Mark this dimension complete in `docs/STATUS.md` once FCP < 2s is verified on a throttled 4G Lighthouse audit | docs/STATUS.md | 2 | 1 | L | 4 |

## Wave Summary

| Wave | Focus | Items |
|---|---|---|
| 1 | Critical — identify render-blocking resources, fix font loading, move scripts to bottom, add defer, hero image priority | 1–20, 36–44, 54–56, 72, 75, 77–78, 85–89, 92, 99 |
| 2 | Core Web Vitals — measure and fix FCP/CLS/LCP, skeleton screens, colour/theme flash prevention, service worker | 21–35, 46–53, 57–68, 74, 76, 79–84, 91, 94–98 |
| 3 | Advanced — performance tests, budget, CI | 70, 90 |
| 4 | Measurement baseline and documentation | 100 |
| 5 | Future — SSR via Netlify Edge Functions | 70 |
