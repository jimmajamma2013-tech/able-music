# Dimension E8 — Slow Network UX
**Category:** Mobile UX & Touch
**Phase:** 3 (Mobile)
**Status:** Not started

A significant portion of ABLE's users will be on mobile data at venues, in transit, or in areas with poor connectivity. On a throttled 3G connection (1.5 Mbps down, 750 Kbps up, 300ms RTT), any async action that shows no feedback within 300ms feels broken. Every button tap, form submit, data load, and image request must have a loading state. Full compliance means every async operation on all four pages has a visible loading indicator that appears within one animation frame of the triggering action, skeleton screens stand in for content that loads from the network (fan count, show dates, stats), and error states are shown when the network fails rather than silent emptiness.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add an immediate visual loading state to the fan email submit button on V8 — disable the button and show a spinner within 1 frame of tap | V8 | 5 | 1 | L | 1 |
| 2 | Add `pointer-events: none` and `opacity: 0.6` to the fan submit button while the submission is pending to prevent double-submit | V8 | 5 | 1 | L | 1 |
| 3 | Add a loading spinner inside the fan submit button that appears within 300ms of tap on V8 | V8 | 5 | 1 | L | 1 |
| 4 | Ensure the fan submit button's loading state is triggered by the tap event itself (not the async callback) so feedback is instant | V8 | 5 | 1 | L | 1 |
| 5 | Add a skeleton screen for the fan count number on `admin.html` analytics panel that shows while the Supabase query is in flight | ADM | 5 | 2 | M | 1 |
| 6 | Add a skeleton screen for the page view count on `admin.html` analytics panel | ADM | 5 | 2 | M | 1 |
| 7 | Add a skeleton screen for the CTA click count on `admin.html` | ADM | 5 | 2 | M | 1 |
| 8 | Add a skeleton screen for the conversion rate metric on `admin.html` | ADM | 4 | 2 | M | 1 |
| 9 | Add skeleton screens for each fan list row on `admin.html` while the fan list loads | ADM | 4 | 2 | M | 1 |
| 10 | Add a skeleton screen for the show/event cards on V8 while event data loads from localStorage or Supabase | V8 | 4 | 2 | M | 1 |
| 11 | Add a skeleton screen for the snap cards section on V8 while snap card data loads | V8 | 4 | 2 | M | 1 |
| 12 | Add a skeleton screen for the music section on V8 while track data loads | V8 | 4 | 2 | M | 1 |
| 13 | Add a skeleton screen for the hero artist artwork on V8 while the image loads on slow networks | V8 | 5 | 2 | M | 1 |
| 14 | Add a low-resolution blurred placeholder image for the V8 hero artwork (technique: load a tiny 10px version first then replace with full-res) | V8 | 4 | 3 | M | 3 |
| 15 | Implement CSS shimmer animation on all skeleton screens using `background: linear-gradient(90deg, ...)` animation | ALL | 4 | 2 | M | 2 |
| 16 | Define a reusable `.skeleton-pulse` CSS class with the shimmer animation so all skeleton screens are consistent | ALL | 4 | 1 | L | 1 |
| 17 | Apply `.skeleton-pulse` to all stat number placeholders on `admin.html` | ADM | 4 | 1 | L | 1 |
| 18 | Apply `.skeleton-pulse` to all card placeholder rectangles in the fan list on `admin.html` | ADM | 4 | 1 | L | 1 |
| 19 | Apply `.skeleton-pulse` to the snap card grid placeholders on V8 | V8 | 3 | 1 | L | 1 |
| 20 | Ensure skeleton screens use the ABLE dark background token `--color-card: #12152a` as their base colour | V8 | 3 | 1 | L | 2 |
| 21 | Ensure skeleton screens on `admin.html` use the admin background token `--bg: #09090f` | ADM | 3 | 1 | L | 2 |
| 22 | Add a loading state to the `admin.html` "Save profile" button — show spinner immediately on tap | ADM | 5 | 1 | L | 1 |
| 23 | Add a loading state to the `admin.html` "Add show" button | ADM | 4 | 1 | L | 1 |
| 24 | Add a loading state to the `admin.html` "Delete show" button | ADM | 4 | 1 | L | 1 |
| 25 | Add a loading state to the `admin.html` "Add snap card" button | ADM | 4 | 1 | L | 1 |
| 26 | Add a loading state to the `admin.html` "Enable gig mode" toggle — show a brief spinner before the mode activates | ADM | 4 | 1 | L | 1 |
| 27 | Add a loading state to the `admin.html` "Connect Spotify" / "Import" action | ADM | 5 | 2 | M | 1 |
| 28 | Add a loading state to the `start.html` "Continue" / "Next" wizard step button when async validation is running | STR | 4 | 1 | L | 1 |
| 29 | Add a loading state to the `start.html` Spotify import step — show a progress indicator while the Netlify function fetches data | STR | 5 | 2 | M | 1 |
| 30 | Show a progress percentage on the Spotify import loading screen on `start.html` (estimate based on typical API latency) | STR | 3 | 2 | M | 3 |
| 31 | Add a loading state to the `landing.html` early-access email submit button | LND | 4 | 1 | L | 1 |
| 32 | Ensure all loading states have a timeout: if an operation takes longer than 8 seconds, show an error state rather than an infinite spinner | ALL | 5 | 2 | M | 1 |
| 33 | Define a `showError()` utility function that displays an inline error message below the relevant element when a network request fails | ALL | 4 | 2 | M | 1 |
| 34 | Show a specific error message "Couldn't save — check your connection and try again" for any failed save operation on `admin.html` | ADM | 5 | 2 | M | 1 |
| 35 | Show a specific error message for failed fan sign-up on V8: "Couldn't sign you up — try again in a moment" | V8 | 5 | 2 | M | 1 |
| 36 | Show a specific error message for failed early-access signup on `landing.html` | LND | 4 | 2 | M | 1 |
| 37 | Add a "Retry" button to all error states so the user can retry without reloading the page | ALL | 4 | 2 | M | 2 |
| 38 | Add `navigator.onLine` check before any Supabase request — show an offline message immediately if the device has no network at all | ALL | 4 | 2 | M | 2 |
| 39 | Add a `window.addEventListener('offline', ...)` handler that shows a persistent banner when connectivity is lost | ALL | 4 | 2 | M | 2 |
| 40 | Add a `window.addEventListener('online', ...)` handler that hides the offline banner and retries any pending operations when connectivity returns | ALL | 4 | 2 | M | 2 |
| 41 | Use `fetch` with a `signal: AbortController.signal` and a 10-second timeout on all network requests | ALL | 4 | 2 | M | 2 |
| 42 | Confirm that `AbortController` timeout errors are caught and show a user-friendly error message, not a console error | ALL | 4 | 1 | L | 2 |
| 43 | Add optimistic updates to fan sign-up on V8 — immediately show the success state, then roll back if the server returns an error | V8 | 4 | 3 | H | 3 |
| 44 | Add optimistic updates to admin snap card add on `admin.html` | ADM | 3 | 3 | H | 4 |
| 45 | Add optimistic updates to admin show add on `admin.html` | ADM | 3 | 3 | H | 4 |
| 46 | On slow networks, ensure the artist name and CTA buttons on V8 appear immediately from localStorage before any images load | V8 | 5 | 2 | M | 1 |
| 47 | On V8, render the text content of the profile from localStorage synchronously before any async image or embed loads | V8 | 5 | 2 | M | 1 |
| 48 | On `admin.html`, render stat numbers from localStorage immediately on page load, then overwrite with fresh Supabase data when it arrives | ADM | 5 | 2 | M | 1 |
| 49 | On `admin.html`, render the fan list from localStorage immediately, then refresh from Supabase in the background | ADM | 5 | 2 | M | 1 |
| 50 | Confirm that the 3G simulation in Chrome DevTools shows content appearing on V8 within 3 seconds on first load | V8 | 5 | 2 | M | 2 |
| 51 | Confirm that `landing.html` renders its above-the-fold content within 3 seconds on 3G simulation | LND | 4 | 2 | M | 2 |
| 52 | Confirm that `start.html` step 1 is interactive within 3 seconds on 3G simulation | STR | 4 | 2 | M | 2 |
| 53 | Confirm that `admin.html` shows the dashboard skeleton within 3 seconds on 3G simulation | ADM | 4 | 2 | M | 2 |
| 54 | Add a `<link rel=preconnect>` for the Supabase CDN URL in each page's `<head>` to reduce DNS lookup time | ALL | 4 | 1 | L | 1 |
| 55 | Add a `<link rel=dns-prefetch>` for Google Fonts CDN to reduce font load latency | ALL | 3 | 1 | L | 1 |
| 56 | Add a `<link rel=preconnect>` for YouTube's embed CDN on V8 if a YouTube embed is present | V8 | 3 | 1 | L | 2 |
| 57 | Add a `<link rel=preconnect>` for Spotify's embed CDN on V8 | V8 | 3 | 1 | L | 2 |
| 58 | Add `loading="lazy"` to all below-the-fold images to defer their network requests | ALL | 4 | 1 | L | 1 |
| 59 | Use `srcset` on the V8 hero artwork `<img>` to serve a smaller image on mobile (avoid serving a 2400px image to a 390px screen) | V8 | 4 | 2 | M | 2 |
| 60 | Serve all images in WebP format (with JPEG fallback) to reduce file size on slow networks | ALL | 4 | 3 | M | 3 |
| 61 | Add a `<link rel=preload as=image>` for the V8 hero artwork in `<head>` so it starts fetching immediately | V8 | 4 | 1 | L | 1 |
| 62 | Inline critical CSS in `<style>` blocks in `<head>` on all pages to eliminate a render-blocking CSS file request | ALL | 4 | 3 | M | 3 |
| 63 | Defer all non-critical JS with `defer` attribute on `<script>` tags | ALL | 4 | 1 | L | 1 |
| 64 | Use `async` for third-party scripts (analytics, embed JS) and `defer` for ABLE's own scripts | ALL | 4 | 1 | L | 1 |
| 65 | Confirm that the Service Worker (when implemented) caches all static assets so repeat visits on slow networks are instant | ALL | 5 | 4 | M | 5 |
| 66 | Confirm that the Service Worker caches the last known localStorage state so the dashboard renders offline | ADM | 4 | 4 | M | 5 |
| 67 | Add a `Cache-Control: max-age=31536000, immutable` header for all static assets via `netlify.toml` | ALL | 4 | 1 | L | 2 |
| 68 | Add a `Cache-Control: no-cache` header for HTML files so they are always re-fetched but served quickly from browser cache while validating | ALL | 4 | 1 | L | 2 |
| 69 | Minify all HTML, CSS, and inline JS before deploying to Netlify to reduce payload size | ALL | 3 | 3 | M | 4 |
| 70 | Enable Brotli or Gzip compression on Netlify for all text assets | ALL | 4 | 1 | L | 2 |
| 71 | Confirm that the `netlify.toml` enables asset compression for `.html`, `.css`, and `.js` MIME types | ALL | 4 | 1 | L | 2 |
| 72 | Add a network-aware loading strategy: if `navigator.connection.effectiveType === '2g'`, disable the Spotify embed and show a link instead | V8 | 3 | 2 | M | 4 |
| 73 | Add a `save-data` header check: if the user has Data Saver enabled, serve simplified content without embeds | V8 | 3 | 2 | M | 4 |
| 74 | Add skeleton loader CSS using `--skeleton-bg` token so skeleton colours are theming-aware across dark/light/glass/contrast | ALL | 3 | 1 | L | 2 |
| 75 | Confirm that skeleton loaders are removed immediately when data is available — no skeleton flickering if localStorage loads in < 16ms | ALL | 4 | 1 | L | 2 |
| 76 | Add a minimum skeleton display time of 200ms to prevent a flash of skeleton followed immediately by content (flash is confusing) | ALL | 3 | 1 | L | 3 |
| 77 | Test the `admin.html` dashboard on a 3G throttled profile in Chrome DevTools and record which elements lack loading states | ADM | 5 | 2 | M | 2 |
| 78 | Test V8 on a 3G throttled profile and record which elements lack loading states | V8 | 5 | 2 | M | 2 |
| 79 | Add Playwright test: throttle network to 3G, load V8, assert skeleton appears within 300ms | V8 | 4 | 3 | M | 3 |
| 80 | Add Playwright test: throttle network to 3G, submit fan email, assert button loading state appears within 300ms | V8 | 4 | 3 | M | 3 |
| 81 | Add Playwright test: throttle network to 3G, load `admin.html`, assert skeleton stats appear | ADM | 4 | 3 | M | 3 |
| 82 | Add Playwright test: throttle network to 3G, trigger Spotify import on `start.html`, assert progress indicator appears | STR | 3 | 3 | M | 3 |
| 83 | Confirm that all async operations use `try/catch` blocks and never throw unhandled promise rejections | ALL | 5 | 2 | M | 1 |
| 84 | Confirm that unhandled promise rejections are caught globally and show a toast error message rather than a blank UI | ALL | 4 | 2 | M | 1 |
| 85 | Implement a global `unhandledrejection` event listener that shows an ABLE-styled error toast | ALL | 4 | 2 | M | 2 |
| 86 | Test that the global error handler fires and shows a toast when Supabase is unreachable | ALL | 4 | 2 | M | 2 |
| 87 | Confirm that error toasts have a dismiss button and auto-dismiss after 5 seconds | ALL | 3 | 1 | L | 2 |
| 88 | Confirm that error toasts stack if multiple errors occur simultaneously — don't replace one with another | ALL | 3 | 2 | M | 3 |
| 89 | Add `aria-live="polite"` to the toast container so screen readers announce errors | ALL | 3 | 1 | L | 2 |
| 90 | Confirm that the `landing.html` email form shows a success message even if the network is slow — use optimistic UI with rollback | LND | 3 | 2 | M | 3 |
| 91 | After a successful fan sign-up on V8, persist the confirmation to localStorage so repeat visitors see the success state immediately | V8 | 4 | 1 | L | 2 |
| 92 | After a successful early-access signup on `landing.html`, persist to localStorage so the form is hidden on return visits | LND | 3 | 1 | L | 2 |
| 93 | Add a LCP (Largest Contentful Paint) target of under 2.5 seconds on 4G as a documented performance budget | ALL | 4 | 1 | L | 3 |
| 94 | Add an FID/INP target of under 100ms as a documented performance budget | ALL | 4 | 1 | L | 3 |
| 95 | Run a Lighthouse performance audit on V8 in mobile mode and target a score above 85 | V8 | 5 | 2 | M | 3 |
| 96 | Run a Lighthouse performance audit on `landing.html` in mobile mode and target a score above 90 | LND | 4 | 2 | M | 3 |
| 97 | Run a Lighthouse performance audit on `admin.html` in mobile mode and target a score above 80 | ADM | 4 | 2 | M | 3 |
| 98 | Add a QA checklist item: "Throttle to 3G in Chrome DevTools and confirm every button shows feedback within 300ms" | ALL | 4 | 1 | L | 4 |
| 99 | Document the loading state pattern (show spinner on tap, disable button, handle timeout, show error) in a code comment in each file | ALL | 2 | 1 | L | 5 |
| 100 | After all slow-network fixes, record a Playwright network trace at 3G throttle and compare LCP before and after to confirm improvement | ALL | 4 | 2 | M | 4 |
