# Dimension G5 — Release Date Edge Cases
**Category:** Core Product Logic & User Flows
**Phase:** 1 (Foundation)
**Status:** Not started

The campaign state machine is the beating heart of the artist profile. It determines what a fan sees when they land — a countdown and pre-save prompt, a celebration of a fresh drop, or a steady evergreen profile. This dimension covers every edge case in that state logic: what happens when an artist sets a release date in the past, what the system does when they change a future date mid-countdown, how the 14-day "live" window is calculated, and how timezone differences between the artist's browser and the fan's browser affect rendering. Full compliance means zero silent failures — every possible combination of `releaseDate`, `stateOverride`, and `able_gig_expires` produces a deterministic, documented, and tested output. The system must be self-correcting: a corrupted or ambiguous date never strands the profile in a broken intermediate state; it falls back gracefully to `profile` mode.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Document the canonical state resolution order: gig-override → pre-release → live → profile as a comment block at the top of the state-calculation function | ALL | 3 | 1 | L | 1 |
| 2 | Guard against `releaseDate` being `null` — if null, skip date comparisons and return `"profile"` immediately | V8 | 5 | 1 | H | 1 |
| 3 | Guard against `releaseDate` being an empty string — treat same as null | V8 | 5 | 1 | H | 1 |
| 4 | Guard against `releaseDate` being a non-ISO string (e.g. "next friday") — `Date.parse` returns `NaN`; catch and fallback | V8 | 5 | 2 | H | 1 |
| 5 | Guard against `releaseDate` being a valid ISO string but representing an invalid date (e.g. "2026-02-30") — `isNaN(new Date(...))` check required | V8 | 5 | 2 | H | 1 |
| 6 | When an artist sets a release date in the past on the admin form, immediately display a warning: "This date is in the past — your profile will show as Live" | ADM | 4 | 2 | L | 1 |
| 7 | When release date is in the past and within 14 days, auto-resolve to `"live"` state — verify this path is explicitly coded and tested | V8 | 5 | 2 | H | 1 |
| 8 | When release date is more than 14 days in the past, auto-resolve to `"profile"` state — verify this path is explicitly coded | V8 | 5 | 2 | H | 1 |
| 9 | The 14-day live window boundary should be calculated as `releaseDate + (14 * 24 * 60 * 60 * 1000)` in milliseconds, not as a day-of-month comparison | V8 | 4 | 2 | M | 1 |
| 10 | Verify the 14-day live window is inclusive of the release date itself (day 0 counts as day 1 of the live window) | V8 | 3 | 1 | M | 1 |
| 11 | Document what time on the release date the state flips from pre-release to live — midnight UTC, midnight local, or exact ISO timestamp time component | ALL | 4 | 2 | M | 1 |
| 12 | Store release dates with a time component in ISO format (e.g. "2026-04-01T00:00:00") so the flip time is unambiguous | ALL | 4 | 2 | M | 2 |
| 13 | When an artist changes a future release date to a different future date, confirm the countdown recalculates immediately on V8 without requiring a page reload | V8 | 4 | 2 | M | 2 |
| 14 | When an artist changes a future release date to a past date, confirm the profile transitions to live/profile state immediately in admin preview | ADM | 4 | 2 | M | 2 |
| 15 | When an artist removes a release date entirely (clears the field), confirm the profile returns to `"profile"` state rather than crashing | V8 | 5 | 2 | H | 1 |
| 16 | Verify that deleting `able_v3_profile.releaseDate` key entirely (not setting to null but omitting the key) is also handled | V8 | 4 | 2 | M | 1 |
| 17 | `stateOverride` field set to a non-valid string (e.g. "campaign") should be ignored and fall through to date-based logic | V8 | 4 | 1 | M | 1 |
| 18 | `stateOverride = "gig"` with an expired `able_gig_expires` timestamp must resolve to date-based state, not remain stuck on gig | V8 | 5 | 2 | H | 1 |
| 19 | `able_gig_expires` stored as a string instead of Unix integer (e.g. localStorage coercion) should be parsed with `parseInt` before comparison | V8 | 4 | 1 | M | 1 |
| 20 | `able_gig_expires` of `0` or negative should be treated as expired | V8 | 3 | 1 | L | 1 |
| 21 | When gig mode expires mid-session (user leaves tab open for hours), the profile should auto-refresh state without requiring manual reload | V8 | 3 | 3 | M | 3 |
| 22 | Implement a `setInterval` or `requestAnimationFrame` watchdog that re-evaluates state every 60 seconds for long-lived sessions | V8 | 3 | 3 | M | 3 |
| 23 | Countdown timer on pre-release state must recalculate from live UTC time, not from the time the page was loaded, to avoid drift | V8 | 4 | 2 | M | 2 |
| 24 | Countdown reaching zero must auto-transition the UI to live state without a page reload | V8 | 4 | 3 | M | 2 |
| 25 | When countdown reaches zero, fire an analytics event `{label: "release_live", type: "state_change", ts: ..., source: ...}` | V8 | 3 | 2 | L | 3 |
| 26 | Document the timezone assumption: release dates are stored in browser-local ISO strings, displayed relative to the viewing fan's locale | ALL | 3 | 1 | L | 1 |
| 27 | Add a timezone offset note in the admin release date input: "Date is in your local time (browser timezone)" | ADM | 3 | 1 | L | 2 |
| 28 | Avoid `toLocaleDateString()` for countdown calculations — use only numeric comparisons on `Date.getTime()` | V8 | 4 | 1 | M | 1 |
| 29 | Fan in a timezone 12+ hours ahead of artist may see release go live before intended — document this as a known limitation in admin copy | ADM | 3 | 1 | L | 2 |
| 30 | Admin campaign HQ section should show a live preview of the current computed state at all times, not just on save | ADM | 4 | 3 | M | 2 |
| 31 | Admin live preview should update in real-time when the artist changes the release date input field | ADM | 3 | 2 | L | 3 |
| 32 | When artist sets `stateOverride = "pre-release"` manually without a release date, the countdown section must handle missing date gracefully (show no timer, not NaN:NaN:NaN) | V8 | 5 | 2 | H | 1 |
| 33 | When artist sets `stateOverride = "live"` manually without a release date, the live state UI must render correctly without a date reference | V8 | 4 | 2 | M | 2 |
| 34 | Verify that `stateOverride = "profile"` forces profile state even when a future release date exists — manual override should always win | V8 | 4 | 1 | M | 1 |
| 35 | Add explicit unit-test-style assertions as inline comments documenting each state transition boundary in the calc function | ALL | 3 | 2 | L | 2 |
| 36 | Create a `getProfileState(profile, now)` pure function that takes a snapshot and a timestamp — makes all edge cases testable in isolation | ALL | 4 | 2 | L | 2 |
| 37 | Verify that the pure `getProfileState` function is the single authoritative source called by both V8 and admin.html — no duplicated logic | ALL | 5 | 2 | H | 2 |
| 38 | Add defensive check: if `new Date(releaseDate).getTime()` is `NaN`, log a warning to console (not production console.log, but a dedicated debug mode flag) | ALL | 3 | 1 | L | 2 |
| 39 | When release date is set to today's date, confirm the profile enters live state immediately on that day (not pre-release) | V8 | 4 | 1 | M | 1 |
| 40 | When release date is set to tomorrow, confirm the profile shows pre-release countdown showing approximately 24 hours | V8 | 4 | 1 | M | 1 |
| 41 | When release date is exactly 14 days ago (to the millisecond), confirm state is still `"live"` not `"profile"` | V8 | 3 | 1 | M | 1 |
| 42 | When release date is 14 days and 1 second ago, confirm state resolves to `"profile"` | V8 | 3 | 1 | M | 1 |
| 43 | Verify leap year dates are handled correctly — "2028-02-29" is a valid date and should not be coerced | ALL | 2 | 1 | L | 3 |
| 44 | Verify year-boundary edge case: release date of "2026-12-31" transitions correctly to live/profile in early January 2027 | V8 | 3 | 1 | L | 2 |
| 45 | Verify DST (daylight saving time) transitions do not cause countdown to jump by 1 hour for users in DST-observing locales | V8 | 3 | 2 | M | 3 |
| 46 | Admin form date input should use `<input type="date">` with `min` attribute set to today's date — past dates allowed but warned | ADM | 3 | 1 | L | 2 |
| 47 | When admin saves a release date change, update `able_v3_profile` in localStorage immediately and trigger a state-recalc event | ADM | 5 | 2 | M | 1 |
| 48 | V8 should listen for `storage` events on `able_v3_profile` and recalculate state when admin changes data in another tab | V8 | 4 | 3 | M | 3 |
| 49 | Document that `able_v3_profile.releaseDate` is the canonical date field and no other key stores release date | ALL | 3 | 1 | L | 1 |
| 50 | Verify start.html wizard release date field writes to `able_v3_profile.releaseDate` in exactly the same ISO format that admin.html reads | STR | 5 | 2 | H | 1 |
| 51 | Verify that if start.html is completed with no release date, `able_v3_profile.releaseDate` is either absent or explicitly `null` — not an empty string | STR | 4 | 1 | M | 1 |
| 52 | If `able_v3_profile` is entirely absent from localStorage, V8 should render in a graceful "artist hasn't set up yet" state, not crash | V8 | 5 | 2 | H | 1 |
| 53 | If `able_v3_profile` is malformed JSON (parse error), wrap `JSON.parse` in try/catch and fall back to default profile shape | V8 | 5 | 1 | H | 1 |
| 54 | Default profile shape used as fallback should be documented as a constant: `DEFAULT_PROFILE = { stateOverride: null, releaseDate: null, ... }` | ALL | 3 | 1 | L | 1 |
| 55 | Verify the pre-release countdown displays days, hours, minutes, seconds — not just hours:minutes:seconds for multi-day countdowns | V8 | 3 | 2 | L | 2 |
| 56 | Countdown display must not show negative values after the release date passes — clamp to zero before the auto-transition fires | V8 | 4 | 1 | M | 1 |
| 57 | Admin dashboard state indicator (the "You are currently in X mode" pill) must reflect the computed state, not a cached snapshot | ADM | 4 | 2 | M | 2 |
| 58 | When artist activates gig mode, set `able_gig_expires` to `Date.now() + (24 * 60 * 60 * 1000)` — document the 24-hour window explicitly | ADM | 4 | 1 | L | 1 |
| 59 | Gig mode activation should write both `stateOverride = "gig"` and `able_gig_expires` atomically — no partial writes | ADM | 5 | 2 | H | 1 |
| 60 | If `stateOverride = "gig"` is present but `able_gig_expires` is absent, treat as expired rather than permanent gig | V8 | 4 | 1 | M | 1 |
| 61 | Gig mode deactivation (manual or expiry) should clear `stateOverride` to null, not leave it as "gig" with a past expiry | ADM | 4 | 2 | M | 2 |
| 62 | Admin campaign HQ should show time remaining in gig mode when active: "Gig mode active — expires in 14h 22m" | ADM | 3 | 2 | L | 3 |
| 63 | When gig mode expires, send a push/in-app notification (future: for now log to `admin_visit_dates` next visit trigger) | ADM | 2 | 3 | L | 5 |
| 64 | Test case: artist sets release date 30 days out, waits, then changes it to 5 days out — state should flip to pre-release with new correct countdown | V8 | 5 | 2 | H | 2 |
| 65 | Test case: artist sets release date today (goes live), then changes it to yesterday — should remain live (still within 14 days) | V8 | 4 | 2 | M | 2 |
| 66 | Test case: artist sets release date 20 days ago, then changes it to 5 days ago — state should flip from profile to live | V8 | 4 | 2 | M | 2 |
| 67 | Test case: artist has live state, activates gig mode, gig expires — profile should return to live (not profile) if still within 14-day window | V8 | 5 | 2 | H | 2 |
| 68 | Test case: two browser tabs open — artist saves new release date in tab A (admin), fan view in tab B (V8) should update via storage event | V8 | 3 | 3 | M | 3 |
| 69 | Test case: `releaseDate` set to "1970-01-01T00:00:00" (Unix epoch) — should resolve to profile state without divide-by-zero errors in countdown | V8 | 3 | 1 | L | 2 |
| 70 | Test case: `releaseDate` set far in the future ("2099-12-31") — countdown should display years correctly or gracefully cap | V8 | 2 | 2 | L | 4 |
| 71 | Admin release date field should accept and display the saved date correctly on revisit — verify round-trip ISO serialisation | ADM | 4 | 2 | M | 1 |
| 72 | Admin date input should show the previously saved date pre-populated when admin re-opens campaign HQ | ADM | 3 | 2 | L | 2 |
| 73 | When start.html wizard skips the release date step, admin.html should handle undefined gracefully and prompt to add a date | ADM | 4 | 2 | M | 2 |
| 74 | V8 pre-release banner should render correctly even if artist name is very long (overflow, truncation) | V8 | 2 | 1 | L | 3 |
| 75 | V8 live state banner should not show a countdown (it's live, not pending) — verify timer element is hidden in live state | V8 | 3 | 1 | L | 1 |
| 76 | V8 profile state must not show any release-related UI if no release date is set — no ghost elements, no empty containers | V8 | 3 | 1 | L | 1 |
| 77 | Verify that changing state from pre-release to profile does not leave orphan countdown interval running in memory | V8 | 3 | 2 | M | 2 |
| 78 | `clearInterval` must be called before setting a new interval when state recalculates | V8 | 4 | 1 | M | 1 |
| 79 | State recalculation on storage event should debounce (50ms) to prevent thrashing on rapid successive writes | V8 | 3 | 2 | L | 3 |
| 80 | Verify that `Date.now()` is used consistently throughout (not a mix of `new Date().getTime()` and `Date.now()`) | ALL | 2 | 1 | L | 2 |
| 81 | Add a `STATE_TRANSITIONS` comment block documenting all valid transitions and which ones are reversible | ALL | 3 | 1 | L | 2 |
| 82 | Landing page (landing.html) must not reference `able_v3_profile` — it has no artist context | LND | 3 | 1 | M | 1 |
| 83 | start.html wizard should not attempt to compute campaign state — that is V8/admin territory only | STR | 3 | 1 | M | 1 |
| 84 | When admin displays a live preview of V8 in an iframe, that iframe should read the same localStorage (same origin) — verify no cross-origin iframe used | ADM | 4 | 1 | M | 1 |
| 85 | Document that state is always computed client-side and never persisted as a computed value — only inputs (releaseDate, stateOverride, gig_expires) are stored | ALL | 3 | 1 | L | 1 |
| 86 | Add a human-readable "next state change" note in admin: "Your profile will leave Live mode on [date]" | ADM | 3 | 2 | L | 3 |
| 87 | For the `"live"` state, show the release date in human-readable form on V8 hero: "Out now — released [Month Day]" | V8 | 3 | 2 | L | 3 |
| 88 | If the release date field is visible on V8 and the date is today, display "Today" not the full date string | V8 | 2 | 2 | L | 4 |
| 89 | Verify that all state-dependent UI elements (banners, CTAs, countdowns) are inside a single `renderState()` call — no scattered conditional renders | V8 | 4 | 3 | M | 2 |
| 90 | `renderState()` must be idempotent — calling it twice with the same state produces identical DOM output | V8 | 4 | 2 | M | 2 |
| 91 | Add a console-level debug mode flag (`ABLE_DEBUG = true`) that logs each state transition with before/after values — stripped in production | ALL | 2 | 2 | L | 4 |
| 92 | If localStorage is unavailable (private browsing on some browsers), catch the QuotaExceededError and render in a safe read-only mode | ALL | 4 | 2 | H | 2 |
| 93 | Verify that the Playwright smoke test suite includes a test for past release date → profile state path | ALL | 4 | 3 | M | 2 |
| 94 | Verify that the Playwright smoke test suite includes a test for future release date → pre-release state path | ALL | 4 | 3 | M | 2 |
| 95 | Verify that the Playwright smoke test suite includes a test for release date within 14 days ago → live state path | ALL | 4 | 3 | M | 2 |
| 96 | Verify that the Playwright smoke test suite includes a test for gig mode activation and expiry | ALL | 4 | 3 | M | 3 |
| 97 | Write a single shared state-test fixture that seeds localStorage with each scenario before each test | ALL | 3 | 3 | L | 3 |
| 98 | Error boundary: if state calculation throws at runtime, catch the error, report it to a future error-logging endpoint, and fall back to `"profile"` | ALL | 4 | 2 | M | 2 |
| 99 | State logic should be extracted to `shared/state.js` so both V8 and admin.html import the same function — no logic duplication | ALL | 5 | 3 | M | 2 |
| 100 | Write a human-readable decision table for release date edge cases and include it as a comment in `shared/state.js` so future contributors understand all branches | ALL | 3 | 1 | L | 2 |
