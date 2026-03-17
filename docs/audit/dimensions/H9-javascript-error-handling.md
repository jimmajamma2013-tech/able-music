# Dimension H9 — JavaScript Error Handling
**Category:** Security, Data & Performance
**Phase:** 8 (Security)
**Status:** Not started

Unhandled JavaScript errors in a production application cause silent data loss, broken UI states, and confusing experiences for users who have no idea what went wrong. In ABLE's architecture — a vanilla single-file app with no framework error boundaries — every async operation is a potential silent failure point. `JSON.parse()` on localStorage data, `fetch()` calls to Netlify functions, Supabase queries, and oEmbed operations must all have explicit try/catch blocks. Unhandled promise rejections appear only in the browser console; fans and artists never see them. Full compliance means every async path has a try/catch, every `JSON.parse` is guarded, `window.onerror` and `window.addEventListener('unhandledrejection')` catch any remaining escapes, and `console.error` logs all caught errors in development.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add `window.addEventListener('unhandledrejection', e => console.error('Unhandled rejection:', e.reason))` to all four active pages | ALL | 5 | 1 | M | 1 |
| 2 | Add `window.onerror = (msg, src, line, col, err) => console.error('Global error:', msg, err)` to all four active pages | ALL | 5 | 1 | M | 1 |
| 3 | Wrap `JSON.parse(localStorage.getItem('able_v3_profile'))` in a try/catch in `V8` — this is the most critical parse, as a crash here produces a blank page for the fan | V8 | 5 | 1 | H | 1 |
| 4 | Wrap `JSON.parse(localStorage.getItem('able_v3_profile'))` in a try/catch in `admin.html` | ADM | 5 | 1 | H | 1 |
| 5 | Wrap `JSON.parse(localStorage.getItem('able_v3_profile'))` in a try/catch in `start.html` | STR | 5 | 1 | H | 1 |
| 6 | Wrap `JSON.parse(localStorage.getItem('able_fans'))` in a try/catch in `admin.html` | ADM | 5 | 1 | H | 1 |
| 7 | Wrap `JSON.parse(localStorage.getItem('able_clicks'))` in a try/catch in `admin.html` | ADM | 4 | 1 | M | 1 |
| 8 | Wrap `JSON.parse(localStorage.getItem('able_views'))` in a try/catch in `admin.html` | ADM | 4 | 1 | M | 1 |
| 9 | Wrap `JSON.parse(localStorage.getItem('able_shows'))` in a try/catch in `V8` and `admin.html` | ALL | 4 | 1 | M | 1 |
| 10 | Wrap `JSON.parse(localStorage.getItem('able_tier'))` in a try/catch in `admin.html` | ADM | 4 | 1 | M | 1 |
| 11 | Wrap `JSON.parse(localStorage.getItem('able_dismissed_nudges'))` in a try/catch in `admin.html` | ADM | 3 | 1 | L | 1 |
| 12 | Wrap `JSON.parse(localStorage.getItem('able_starred_fans'))` in a try/catch in `admin.html` | ADM | 3 | 1 | L | 1 |
| 13 | Wrap `JSON.parse(localStorage.getItem('admin_visit_dates'))` in a try/catch in `admin.html` | ADM | 3 | 1 | L | 1 |
| 14 | Create a `safeParseJSON(str, fallback)` utility that wraps JSON.parse and returns `fallback` on error — use it for every localStorage read | ALL | 5 | 2 | M | 1 |
| 15 | Replace all bare `JSON.parse(localStorage.getItem(...))` calls with `safeParseJSON(localStorage.getItem(...), fallback)` | ALL | 5 | 3 | H | 1 |
| 16 | Wrap the fan sign-up `fetch()` call in `V8` in a try/catch — a network failure must not leave the form in a broken state | V8 | 5 | 1 | H | 1 |
| 17 | Show a user-facing error message in `V8` if the fan sign-up fetch fails: "Something went wrong. Please try again." | V8 | 4 | 1 | M | 1 |
| 18 | Wrap the `fetch('/.netlify/functions/fan-confirmation')` call in a try/catch in `V8` with a minimum 5-second timeout | V8 | 5 | 2 | H | 1 |
| 19 | Wrap the `fetch('/.netlify/functions/spotify-import')` call in `admin.html` in a try/catch | ADM | 4 | 1 | M | 1 |
| 20 | Show a user-facing error message in `admin.html` if the Spotify import fetch fails: "Couldn't reach Spotify. Check the URL and try again." | ADM | 4 | 1 | M | 1 |
| 21 | Wrap the `fetch('/.netlify/functions/oembed-proxy')` call in `admin.html` in a try/catch | ADM | 4 | 1 | M | 1 |
| 22 | Show a user-facing error message in `admin.html` if the oEmbed fetch fails: "Couldn't load the embed. Check the URL and try again." | ADM | 4 | 1 | M | 1 |
| 23 | Wrap the `fetch('/.netlify/functions/ai-copy')` call in `admin.html` in a try/catch | ADM | 4 | 1 | M | 1 |
| 24 | Wrap the `fetch('/.netlify/functions/linktree-import')` call in `admin.html` in a try/catch | ADM | 4 | 1 | M | 1 |
| 25 | Wrap the `fetch('/.netlify/functions/ticketmaster-import')` call in `admin.html` in a try/catch | ADM | 3 | 1 | M | 1 |
| 26 | Wrap all Supabase `await supabase.from(...).select(...)` calls in try/catch once backend is live | ALL | 5 | 2 | H | 1 |
| 27 | Check the `.error` property on every Supabase response: `const { data, error } = await supabase.from(...).select(...); if (error) throw error;` | ALL | 5 | 2 | H | 1 |
| 28 | Wrap `await supabase.auth.getSession()` in a try/catch in `admin.html` | ADM | 5 | 1 | H | 1 |
| 29 | Wrap `await supabase.auth.signInWithOtp()` in a try/catch in `start.html` | STR | 5 | 1 | H | 1 |
| 30 | Show a user-facing error in `start.html` if magic link send fails: "Couldn't send the link. Check your email and try again." | STR | 4 | 1 | M | 1 |
| 31 | Wrap all Netlify function handler bodies in `admin.html` API calls in a try/catch that catches both `fetch` network errors and non-OK responses | ADM | 5 | 2 | H | 1 |
| 32 | Check `response.ok` on every `fetch()` response before calling `response.json()` — a non-OK response with a JSON error body should throw a descriptive error | ALL | 5 | 2 | H | 1 |
| 33 | Do not call `response.json()` on responses with `Content-Type: text/html` — Netlify error pages return HTML, not JSON | ALL | 4 | 1 | M | 1 |
| 34 | Wrap `response.json()` calls in a try/catch separate from the `fetch()` try/catch — they can fail independently | ALL | 4 | 2 | M | 2 |
| 35 | Add `AbortController` timeouts to all `fetch()` calls — a hung network request must not leave the UI in a loading spinner forever | ALL | 5 | 3 | H | 1 |
| 36 | Set a 10-second timeout for the fan sign-up fetch — fans are on mobile with variable connectivity | V8 | 4 | 2 | M | 1 |
| 37 | Set a 15-second timeout for the Spotify import fetch — the function makes multiple external API calls | ADM | 4 | 2 | M | 1 |
| 38 | Set a 8-second timeout for the oEmbed proxy fetch | ADM | 4 | 2 | M | 1 |
| 39 | Handle `AbortError` specifically in fetch catch blocks — show "Request timed out. Please check your connection." | ALL | 4 | 2 | M | 1 |
| 40 | Verify that no `async` function in any active page is called without `await` or `.catch()` — unhandled async functions produce unhandled promise rejections | ALL | 5 | 2 | H | 1 |
| 41 | Audit all `addEventListener` callbacks that contain async logic — the event listener itself cannot be `async` without a wrapping try/catch or `.catch()` | ALL | 4 | 2 | H | 1 |
| 42 | Convert `btn.addEventListener('click', async () => { ... })` patterns to include internal try/catch | ALL | 4 | 2 | H | 1 |
| 43 | Verify `console.error` is called in every catch block — silent swallowing of errors makes debugging impossible | ALL | 5 | 2 | M | 1 |
| 44 | Do not call `console.log` in catch blocks in production — use `console.error` and make the message developer-readable | ALL | 3 | 1 | L | 2 |
| 45 | Remove all bare `try { ... } catch (e) {}` catch blocks that swallow errors silently — every catch must at minimum `console.error` the error | ALL | 5 | 2 | H | 1 |
| 46 | Wrap `document.querySelector()` results before calling methods on them — if the selector returns `null`, calling `.addEventListener` throws a `TypeError` | ALL | 4 | 2 | H | 1 |
| 47 | Use optional chaining `?.` when accessing DOM elements that may not exist: `document.querySelector('#cta')?.addEventListener(...)` | ALL | 4 | 2 | M | 1 |
| 48 | Audit all `getElementById()` calls — if the element is expected to always exist, add an assertion; if not, add an optional chaining guard | ALL | 4 | 2 | M | 1 |
| 49 | Wrap the `IntersectionObserver` callback in `V8` in a try/catch — errors in IO callbacks are swallowed by the browser | V8 | 3 | 1 | M | 2 |
| 50 | Wrap the `PerformanceObserver` callback in a try/catch if used | ALL | 3 | 1 | L | 2 |
| 51 | Add error handling to the `DOMContentLoaded` event listener in `admin.html` — wrap the entire initialisation block in try/catch | ADM | 5 | 2 | H | 1 |
| 52 | Add error handling to the `DOMContentLoaded` event listener in `V8` — same | V8 | 5 | 2 | H | 1 |
| 53 | Add error handling to the `DOMContentLoaded` event listener in `start.html` — same | STR | 4 | 2 | H | 1 |
| 54 | Add error handling to the `DOMContentLoaded` event listener in `landing.html` — same | LND | 3 | 1 | M | 2 |
| 55 | Show a visible "Something went wrong" error state in `admin.html` if the DOMContentLoaded initialisation throws — the artist must not see a blank screen | ADM | 5 | 2 | H | 1 |
| 56 | Show a visible error state in `V8` if the profile render throws — the fan must see at least the artist's name and primary CTA | V8 | 5 | 2 | H | 1 |
| 57 | Implement a minimal render fallback in `V8` — if localStorage is unavailable or corrupted, render the page with default/placeholder values | V8 | 5 | 3 | H | 2 |
| 58 | Implement a minimal render fallback in `admin.html` — if localStorage is unavailable, show an empty state with a "Set up your profile" prompt | ADM | 4 | 2 | M | 2 |
| 59 | Wrap the `switch (campaignState)` block in `V8` in a try/catch — an unexpected state value should not crash the page | V8 | 4 | 1 | M | 1 |
| 60 | Add a `default:` case to all `switch` statements that logs a warning if an unexpected value is encountered | ALL | 3 | 1 | L | 2 |
| 61 | Wrap the gig-mode expiry check in `admin.html` in a try/catch — `Date.now()` comparisons on a corrupted timestamp should not crash | ADM | 3 | 1 | M | 1 |
| 62 | Wrap all `new Date()` calls on user-supplied date strings in try/catch — invalid date strings produce `Invalid Date` objects that propagate silently | ALL | 4 | 1 | M | 1 |
| 63 | Add an `isValidDate(d)` guard: `d instanceof Date && !isNaN(d)` — use before any date formatting or comparison | ALL | 4 | 1 | M | 1 |
| 64 | Wrap the release date countdown logic in `V8` in a try/catch — a bad date string must not crash the countdown | V8 | 4 | 1 | M | 1 |
| 65 | Wrap the `setInterval()` countdown callback in `V8` in a try/catch — errors in intervals run silently | V8 | 4 | 1 | M | 1 |
| 66 | Verify the `clearInterval()` cleanup is called when the countdown completes — prevents the interval from running forever | V8 | 3 | 1 | M | 2 |
| 67 | Wrap image `onload` and `onerror` handlers in try/catch — errors in these callbacks can go unnoticed | V8 | 3 | 1 | L | 2 |
| 68 | Add an `onerror` handler to the hero artwork `<img>` in `V8` — if the image fails to load, show a fallback gradient or placeholder | V8 | 4 | 1 | M | 1 |
| 69 | Add an `onerror` handler to the OG image tag — if the image fails to load, do not crash the page | ALL | 2 | 1 | L | 3 |
| 70 | Wrap the confetti animation in `start.html` in a try/catch — third-party animation libraries can throw | STR | 3 | 1 | L | 2 |
| 71 | Wrap the chart rendering in `admin.html` in a try/catch — if the analytics array is empty or malformed, the chart should render empty, not throw | ADM | 4 | 1 | M | 1 |
| 72 | Wrap localStorage.setItem calls in try/catch for `QuotaExceededError` (see H6) — this is the overlap between H6 and H9 | ALL | 5 | 1 | H | 1 |
| 73 | Log the specific error code and message in every `QuotaExceededError` catch block | ALL | 3 | 1 | L | 2 |
| 74 | Wrap clipboard API calls in `admin.html` (share URL, copy fan list) in a try/catch — clipboard access fails in some browser contexts | ADM | 3 | 1 | M | 1 |
| 75 | Show a fallback "Copy this link:" text input when navigator.clipboard.writeText() fails | ADM | 3 | 1 | M | 2 |
| 76 | Wrap `navigator.share()` calls in a try/catch — Web Share API throws if the user dismisses the sheet | V8 | 3 | 1 | M | 1 |
| 77 | Check `navigator.share` availability before calling it — it is undefined in desktop Chrome | V8 | 4 | 1 | M | 1 |
| 78 | Wrap `navigator.geolocation.getCurrentPosition()` calls in error handling — the second argument to getCurrentPosition is the error handler | ALL | 3 | 1 | M | 2 |
| 79 | Wrap service worker registration in a try/catch: `if ('serviceWorker' in navigator) { try { await navigator.serviceWorker.register(...) } catch(e) { ... } }` | ALL | 3 | 1 | L | 2 |
| 80 | Avoid using `throw` inside `finally` blocks — it suppresses the original error | ALL | 3 | 1 | M | 2 |
| 81 | Avoid re-throwing errors with `throw err.message` — always re-throw the original error object `throw err` to preserve the stack trace | ALL | 4 | 1 | M | 1 |
| 82 | Ensure all custom `Error` objects are created with `new Error()`, not with plain strings — plain string throws lose stack traces | ALL | 3 | 1 | L | 2 |
| 83 | Create a `handleError(err, context)` utility in `shared/` that logs to `console.error` in development and sends to an error reporting service in production | ALL | 4 | 3 | M | 3 |
| 84 | Wire `window.onerror` and `window.addEventListener('unhandledrejection')` to `handleError()` once it exists | ALL | 4 | 2 | M | 3 |
| 85 | Consider integrating Sentry (CDN version) for production error tracking — a single `<script>` in `<head>` captures all JS errors | ALL | 4 | 3 | M | 4 |
| 86 | Alternatively, send caught errors to a Netlify function `error-log.js` that writes to a Supabase table | ALL | 3 | 4 | M | 4 |
| 87 | Add a parse-check step to the development workflow: `node -e "const fs=require('fs'); new Function(fs.readFileSync('able-v7.html','utf8').match(/<script[^>]*>([\s\S]*?)<\/script>/g).join(''))"` | ALL | 4 | 2 | M | 1 |
| 88 | Run the JS parse check in the pre-commit hook — prevents broken syntax from being committed | ALL | 5 | 2 | H | 1 |
| 89 | Verify there are no `debugger` statements in any active page | ALL | 4 | 1 | H | 1 |
| 90 | Verify there are no `console.log` statements in any active page (only `console.error` in catch blocks) | ALL | 3 | 1 | L | 2 |
| 91 | Write a Playwright test that loads `V8` with a corrupted `able_v3_profile` value in localStorage and asserts the page does not display a JS error dialog | V8 | 5 | 2 | H | 2 |
| 92 | Write a Playwright test that loads `admin.html` with a corrupted `able_fans` value and asserts the fan list renders empty rather than crashing | ADM | 4 | 2 | M | 2 |
| 93 | Write a Playwright test that simulates a failing fan sign-up fetch (block the network) and asserts a user-facing error message appears | V8 | 5 | 2 | H | 2 |
| 94 | Write a Playwright test that simulates a failing Spotify import fetch and asserts the admin panel shows a friendly error, not a blank state | ADM | 4 | 2 | M | 2 |
| 95 | Ensure error messages shown to users never contain raw error strings (e.g. `Error: fetch failed`) — translate to user-friendly copy | ALL | 3 | 2 | M | 2 |
| 96 | Verify that error states in `V8` preserve the artist's primary CTA — even if the full profile fails to render, the fan should still be able to tap the primary action | V8 | 5 | 2 | H | 1 |
| 97 | Add a `data-testid="error-boundary"` attribute to all error state containers — makes Playwright tests more robust | ALL | 2 | 1 | L | 3 |
| 98 | Document the error handling strategy in `docs/systems/error-states/SPEC.md` — include which errors are user-visible and which are developer-only | ALL | 3 | 2 | L | 4 |
| 99 | Add error handling coverage to the Playwright smoke test checklist | ALL | 3 | 1 | L | 4 |
| 100 | Mark this dimension complete in `docs/STATUS.md` once all async paths are wrapped and the corrupted-data Playwright tests pass | ALL | 2 | 1 | L | 4 |

## Wave Summary

| Wave | Focus | Items |
|---|---|---|
| 1 | Critical — global error handlers, localStorage parse guards, fetch try/catch, response.ok checks, async listener guards, parse-check hook | 1–18, 26–33, 35–36, 40–48, 51–56, 59, 61–65, 68, 71–72, 76–77, 80–82, 87–89, 96 |
| 2 | User-facing error states, timeout handling, Playwright tests, remaining guards | 19–25, 34, 37–39, 49–50, 57–58, 60, 66–67, 70, 73–75, 78–79, 90–95 |
| 3 | Shared error utility, wiring to global handlers | 83–84, 97 |
| 4 | Production error tracking — Sentry or custom | 85–86, 98–100 |
