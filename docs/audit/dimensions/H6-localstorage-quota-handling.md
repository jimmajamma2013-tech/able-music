# Dimension H6 — localStorage Quota Handling
**Category:** Security, Data & Performance
**Phase:** 8 (Security)
**Status:** Not started

Browsers enforce a 5MB localStorage quota per origin. ABLE stores click events, view events, fan sign-ups, profile data, show lists, and snap card content all in localStorage. Click and view events accumulate indefinitely unless pruned; a single active artist could generate thousands of entries within weeks. When the quota is breached, every subsequent `localStorage.setItem()` call throws a `QuotaExceededError`. If this error is uncaught, critical operations — saving the artist's profile, recording a fan sign-up, logging a CTA tap — will silently fail. Full compliance means all `localStorage.setItem()` calls are wrapped in try/catch, old analytics events are pruned before they can fill the quota, the artist's core profile and fan list are always preserved, and a graceful error state is shown rather than a crash.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Wrap every `localStorage.setItem()` call across all active pages in a try/catch that catches `QuotaExceededError` | ALL | 5 | 3 | H | 1 |
| 2 | In the `QuotaExceededError` catch block, attempt to prune the oldest click events from `able_clicks` and retry the `setItem()` call | ALL | 5 | 2 | H | 1 |
| 3 | In the `QuotaExceededError` catch block, attempt to prune the oldest view events from `able_views` and retry the `setItem()` call | ALL | 5 | 2 | H | 1 |
| 4 | Define a priority hierarchy for localStorage keys: `able_v3_profile` and `able_fans` are sacred and must never be pruned | ALL | 5 | 1 | H | 1 |
| 5 | Define `able_clicks` and `able_views` as prunable — these are analytics and can be lost without user harm | ALL | 4 | 1 | M | 1 |
| 6 | Define `able_shows`, `able_dismissed_nudges`, `able_starred_fans` as low-priority prunable — recoverable from user action | ALL | 3 | 1 | M | 1 |
| 7 | Implement a `pruneOldEvents(key, maxCount)` utility function that reads an array from localStorage, slices it to the most recent `maxCount` items, and writes it back | ALL | 5 | 2 | H | 1 |
| 8 | Call `pruneOldEvents('able_clicks', 500)` automatically when the click array exceeds 500 entries | V8 | 4 | 1 | M | 1 |
| 9 | Call `pruneOldEvents('able_views', 500)` automatically when the view array exceeds 500 entries | V8 | 4 | 1 | M | 1 |
| 10 | Implement a `getStorageUsage()` utility that estimates total localStorage usage in bytes by summing `key.length + value.length` for all keys | ALL | 4 | 2 | M | 1 |
| 11 | Call `getStorageUsage()` before any large write and trigger proactive pruning if usage exceeds 3.5MB (70% of the 5MB limit) | ALL | 4 | 2 | M | 1 |
| 12 | Cap `able_clicks` at 1000 entries maximum — entries beyond this cap provide minimal additional analytical value | ADM | 4 | 1 | M | 1 |
| 13 | Cap `able_views` at 1000 entries maximum | ADM | 4 | 1 | M | 1 |
| 14 | Cap `admin_visit_dates` at 60 entries (already documented in data architecture) — verify the cap is enforced in code | ADM | 3 | 1 | M | 1 |
| 15 | Wrap `JSON.parse(localStorage.getItem('able_v3_profile'))` in `admin.html` in a try/catch | ADM | 5 | 1 | H | 1 |
| 16 | Wrap `JSON.parse(localStorage.getItem('able_v3_profile'))` in `V8` in a try/catch | V8 | 5 | 1 | H | 1 |
| 17 | Wrap `JSON.parse(localStorage.getItem('able_v3_profile'))` in `start.html` in a try/catch | STR | 5 | 1 | H | 1 |
| 18 | Wrap `JSON.parse(localStorage.getItem('able_clicks'))` in `admin.html` in a try/catch | ADM | 5 | 1 | H | 1 |
| 19 | Wrap `JSON.parse(localStorage.getItem('able_views'))` in `admin.html` in a try/catch | ADM | 5 | 1 | H | 1 |
| 20 | Wrap `JSON.parse(localStorage.getItem('able_fans'))` in `admin.html` in a try/catch | ADM | 5 | 1 | H | 1 |
| 21 | Wrap `JSON.parse(localStorage.getItem('able_shows'))` in `admin.html` in a try/catch | ADM | 4 | 1 | M | 1 |
| 22 | Wrap `JSON.parse(localStorage.getItem('able_shows'))` in `V8` in a try/catch | V8 | 4 | 1 | M | 1 |
| 23 | Wrap `JSON.parse(localStorage.getItem('able_tier'))` in `admin.html` in a try/catch | ADM | 4 | 1 | M | 1 |
| 24 | Wrap `JSON.parse(localStorage.getItem('able_gig_expires'))` in `admin.html` in a try/catch | ADM | 3 | 1 | M | 1 |
| 25 | Wrap `JSON.parse(localStorage.getItem('able_dismissed_nudges'))` in `admin.html` in a try/catch | ADM | 3 | 1 | L | 1 |
| 26 | Wrap `JSON.parse(localStorage.getItem('able_starred_fans'))` in `admin.html` in a try/catch | ADM | 3 | 1 | L | 1 |
| 27 | When `JSON.parse` throws, log the error with `console.error` and return an appropriate default (empty array, null, or empty object) | ALL | 4 | 1 | M | 1 |
| 28 | When `JSON.parse` returns `null` (key not found), handle it explicitly — do not attempt property access on `null` | ALL | 5 | 2 | H | 1 |
| 29 | Write a `safeGet(key, defaultValue)` utility that wraps `JSON.parse(localStorage.getItem(key))` and returns `defaultValue` on error or absence | ALL | 5 | 2 | M | 1 |
| 30 | Write a `safeSet(key, value)` utility that wraps `localStorage.setItem(key, JSON.stringify(value))`, catches `QuotaExceededError`, and triggers pruning | ALL | 5 | 2 | H | 1 |
| 31 | Replace all raw `localStorage.getItem` + `JSON.parse` patterns in `admin.html` with calls to `safeGet()` | ADM | 5 | 3 | H | 1 |
| 32 | Replace all raw `localStorage.setItem` + `JSON.stringify` patterns in `admin.html` with calls to `safeSet()` | ADM | 5 | 3 | H | 1 |
| 33 | Replace all raw `localStorage.getItem` + `JSON.parse` patterns in `V8` with calls to `safeGet()` | V8 | 5 | 2 | H | 1 |
| 34 | Replace all raw `localStorage.setItem` + `JSON.stringify` patterns in `V8` with calls to `safeSet()` | V8 | 5 | 2 | H | 1 |
| 35 | Replace all raw `localStorage` calls in `start.html` with `safeGet()` / `safeSet()` | STR | 4 | 2 | M | 1 |
| 36 | Add a `storageAvailable()` check on page load in `admin.html` — if localStorage is entirely unavailable (private browsing mode in some browsers), show a graceful warning | ADM | 4 | 2 | M | 2 |
| 37 | Implement the `storageAvailable()` check as: attempt to `setItem('__test__', '1')` and `removeItem('__test__')` in a try/catch | ALL | 4 | 1 | M | 2 |
| 38 | If `storageAvailable()` returns false, show a non-blocking banner in `admin.html`: "Your browser is blocking data storage. Some features may not save." | ADM | 4 | 2 | M | 2 |
| 39 | If `storageAvailable()` returns false on `V8`, fan sign-up and CTA tracking will fail silently — show no error to the fan but log to `console.error` | V8 | 3 | 2 | M | 2 |
| 40 | Measure the current localStorage footprint in a test scenario — create a script that simulates 30 days of activity and measures the final storage size | ALL | 4 | 3 | L | 2 |
| 41 | Calculate worst-case storage usage: 1000 click events × ~100 bytes = 100KB, 1000 view events × ~60 bytes = 60KB, 50 fans × ~50 bytes = 2.5KB, profile ~2KB — total ~165KB, well within 5MB | ALL | 3 | 2 | L | 2 |
| 42 | Verify that each click event object is minimal — store only `{label, type, ts, source}` (4 fields) and no additional metadata | V8 | 3 | 1 | L | 2 |
| 43 | Verify that each view event object is minimal — store only `{ts, source}` (2 fields) | V8 | 3 | 1 | L | 2 |
| 44 | Verify that each fan object is minimal — store only `{email, ts, source}` (3 fields) | V8 | 3 | 1 | L | 2 |
| 45 | If snap card content includes embedded images or large text, cap each snap card body at 500 characters | ADM | 3 | 1 | M | 2 |
| 46 | Implement `exportAndClearAnalytics()` in `admin.html` — allows artists to download all click/view data as CSV and then clear those arrays from localStorage | ADM | 4 | 3 | M | 3 |
| 47 | Show a storage usage indicator in `admin.html` settings — display `X% of available browser storage used` | ADM | 3 | 3 | L | 3 |
| 48 | Add a `Clear analytics data` button in `admin.html` — allows artists to manually free space without clearing their profile or fan list | ADM | 4 | 2 | M | 3 |
| 49 | Add a `Clear all data` option in `admin.html` settings — for the artist to reset their ABLE profile completely (with confirmation dialog) | ADM | 3 | 2 | M | 4 |
| 50 | Ensure the reset function in `admin.html` clears all ABLE-specific localStorage keys but does not clear other sites' storage | ADM | 4 | 1 | M | 3 |
| 51 | Enumerate all ABLE localStorage keys in a single `ABLE_KEYS` constant and use it for both the reset function and the storage usage calculation | ALL | 3 | 2 | L | 3 |
| 52 | Test `QuotaExceededError` handling manually: fill localStorage to capacity in browser DevTools and verify the page does not crash | ALL | 5 | 2 | H | 2 |
| 53 | Test that after filling localStorage to capacity, saving the artist profile still succeeds (because `able_v3_profile` should be tiny relative to the fill) | ADM | 5 | 2 | H | 2 |
| 54 | Test that after filling localStorage to capacity, a fan sign-up triggers the pruning logic and the sign-up succeeds on retry | V8 | 5 | 3 | H | 2 |
| 55 | Test the `storageAvailable()` check by entering private browsing mode in Safari (which blocks localStorage) | ADM | 4 | 2 | M | 2 |
| 56 | Test the `storageAvailable()` check by entering private browsing mode in Firefox | ADM | 4 | 2 | M | 2 |
| 57 | Test the `storageAvailable()` check by entering private browsing mode in Chrome | ADM | 4 | 2 | M | 2 |
| 58 | Test that the 60-day cap on `admin_visit_dates` is enforced — add 65 entries and verify only the latest 60 are retained | ADM | 3 | 2 | L | 2 |
| 59 | Test that the 1000-entry cap on `able_clicks` is enforced — add 1001 events and verify only 1000 are retained | V8 | 4 | 2 | M | 2 |
| 60 | Test that the 1000-entry cap on `able_views` is enforced — add 1001 events and verify only 1000 are retained | V8 | 4 | 2 | M | 2 |
| 61 | Verify that fan sign-ups (`able_fans`) are never pruned automatically — they represent real contacts and must not be lost | V8 | 5 | 1 | H | 1 |
| 62 | Verify that `able_v3_profile` is never included in the auto-prune flow | ALL | 5 | 1 | H | 1 |
| 63 | Consider writing a `localStorage.js` shared utility in `shared/` containing `safeGet`, `safeSet`, `pruneOldEvents`, `storageAvailable`, and `getStorageUsage` | ALL | 4 | 3 | M | 2 |
| 64 | Load `shared/localStorage.js` via a `<script>` tag in each active page rather than duplicating the utility functions inline | ALL | 3 | 2 | L | 3 |
| 65 | Ensure `shared/localStorage.js` has no dependencies and runs before any other ABLE script on the page | ALL | 4 | 1 | M | 2 |
| 66 | Add error event listener for `window.addEventListener('error', ...)` in `admin.html` to catch uncaught `QuotaExceededError` as a safety net | ADM | 4 | 1 | M | 2 |
| 67 | Add error event listener for unhandled promise rejections in `admin.html`: `window.addEventListener('unhandledrejection', ...)` | ADM | 4 | 1 | M | 2 |
| 68 | When a `QuotaExceededError` is caught and pruning still cannot free enough space, show a toast in `admin.html`: "Storage is full. Export your data to free space." | ADM | 4 | 2 | M | 2 |
| 69 | Ensure the toast does not block the artist from accessing their profile — use a dismissable non-modal notification | ADM | 3 | 1 | L | 3 |
| 70 | When storage is full and the fan sign-up on `V8` fails, do not show an error to the fan — the sign-up call to the Netlify function should still proceed (the localStorage record is a backup, not the source of truth) | V8 | 5 | 2 | H | 1 |
| 71 | Plan the localStorage-to-Supabase migration path — once Supabase is live, localStorage becomes a write-through cache and storage pressure is relieved | ALL | 4 | 1 | L | 3 |
| 72 | Document the localStorage storage budget in `docs/systems/data-architecture/SPEC.md` — include per-key byte estimates and the pruning policy | ALL | 3 | 2 | L | 4 |
| 73 | Use `localStorage.removeItem()` to delete pruned keys rather than setting them to an empty value — reduces footprint more aggressively | ALL | 3 | 1 | L | 2 |
| 74 | When resetting `able_clicks` or `able_views` to an empty array during emergency pruning, preserve the `lastPrunedAt` timestamp so analytics dashboards know there is a gap | ADM | 2 | 2 | L | 4 |
| 75 | When a fan sign-up is lost due to storage failure, attempt to send the email confirmation via the Netlify function anyway — the function is the reliable path | V8 | 5 | 2 | H | 1 |
| 76 | Consider using `sessionStorage` for transient UI state (e.g. wizard step progress) instead of `localStorage` — reduces the quota pressure | STR | 3 | 2 | L | 3 |
| 77 | Verify that `start.html` wizard does not write large intermediate state to localStorage — only the final profile should be written | STR | 3 | 1 | M | 2 |
| 78 | Verify that `admin.html` does not write draft states for unsaved edits to localStorage — drafts can accumulate | ADM | 3 | 1 | M | 2 |
| 79 | Add a monthly automatic pruning trigger in `admin.html` — on each admin load, if the last prune was more than 30 days ago, run `pruneOldEvents()` proactively | ADM | 3 | 2 | M | 3 |
| 80 | Store the `lastPrunedAt` timestamp in `localStorage.setItem('able_last_prune', Date.now())` after each prune cycle | ADM | 2 | 1 | L | 3 |
| 81 | Verify that `localStorage.clear()` is never called — it would delete non-ABLE data in the same origin | ALL | 5 | 1 | H | 1 |
| 82 | Grep all active pages for `localStorage.clear()` and remove any occurrences | ALL | 5 | 1 | H | 1 |
| 83 | Verify that `localStorage.key()` and `localStorage.length` iteration loops exist nowhere in ABLE code — they could accidentally expose or overwrite non-ABLE keys | ALL | 3 | 1 | M | 2 |
| 84 | Test the behaviour of `safeSet()` when localStorage is entirely unavailable (e.g. security settings blocking it) — must not throw to the caller | ALL | 4 | 2 | M | 2 |
| 85 | Test that `safeGet()` returns the default value when the key does not exist | ALL | 4 | 1 | L | 2 |
| 86 | Test that `safeGet()` returns the default value when the stored value is corrupted JSON | ALL | 5 | 1 | M | 1 |
| 87 | Test that `safeGet()` returns the default value when the stored value is a non-JSON string | ALL | 4 | 1 | M | 2 |
| 88 | Verify that the `pruneOldEvents()` function keeps the most recent entries, not the oldest — sort by `ts` descending before slicing | ALL | 4 | 1 | H | 1 |
| 89 | Verify that the prune function handles the case where the stored value is not an array — return empty array and continue | ALL | 4 | 1 | M | 1 |
| 90 | Add unit tests for `safeGet()`, `safeSet()`, `pruneOldEvents()`, and `storageAvailable()` using Node.js with a mock `localStorage` | ALL | 4 | 3 | M | 2 |
| 91 | Ensure `safeSet()` does not swallow errors other than `QuotaExceededError` — rethrow unexpected errors | ALL | 3 | 1 | M | 2 |
| 92 | Add a `DOMException` name check in the catch block: `if (e instanceof DOMException && e.name === 'QuotaExceededError')` — do not conflate quota errors with other storage errors | ALL | 4 | 1 | M | 1 |
| 93 | Note that `QuotaExceededError` is named `NS_ERROR_DOM_QUOTA_REACHED` in Firefox — use `e.name` check, not `e.message`, to handle cross-browser variation | ALL | 4 | 1 | M | 1 |
| 94 | Add a `STORAGE_KEYS` enum constant listing all ABLE localStorage keys — ensures consistency and prevents key name typos | ALL | 3 | 2 | L | 3 |
| 95 | Use the `STORAGE_KEYS` enum in all `safeGet()` / `safeSet()` calls rather than raw strings | ALL | 3 | 2 | L | 3 |
| 96 | Verify that `able_gig_expires` stores a Unix timestamp (number), not a Date object — `JSON.stringify(new Date())` produces an ISO string, which `Date.now()` comparisons would misinterpret | ADM | 3 | 1 | M | 2 |
| 97 | Document the prune policy and priority hierarchy in `docs/systems/data-architecture/SPEC.md` | ALL | 3 | 1 | L | 4 |
| 98 | Add a Playwright smoke test that fills localStorage to 4MB and verifies the admin page loads and saves without crashing | ADM | 4 | 3 | M | 2 |
| 99 | Add the storage quota handling verification to the launch checklist in `docs/audit/100-DIMENSIONS.md` | ALL | 2 | 1 | L | 4 |
| 100 | Mark this dimension complete in `docs/STATUS.md` once all `setItem` calls are wrapped and the quota test passes | ALL | 2 | 1 | L | 4 |

## Wave Summary

| Wave | Focus | Items |
|---|---|---|
| 1 | Critical — wrap all setItem/getItem, safeGet/safeSet utilities, fan/profile priority protection, prune logic | 1–35, 42–44, 61–62, 70, 75, 81–82, 86, 88–89, 92–93 |
| 2 | Storage availability check, quota tests, shared utility module | 36–41, 45–46, 52–60, 63–67, 73, 76–78, 83–85, 87, 90–91, 98 |
| 3 | UX improvements — export, usage indicator, clear button, session storage, monthly prune | 46–51, 68–69, 71, 74, 76, 79–80, 94–95 |
| 4 | Documentation, enum, STATUS update | 72, 74, 97, 99–100 |
