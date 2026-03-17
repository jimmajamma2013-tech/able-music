# Dimension G8 — Analytics Event Fidelity
**Category:** Core Product Logic & User Flows
**Phase:** 1 (Foundation)
**Status:** Not started

Analytics are the only honest signal an artist has about what their fans actually do on their profile. If an event fires with the wrong properties, fires twice on a double-tap, or doesn't fire at all for a campaign state change, the data the artist sees in their dashboard is wrong — and wrong data is worse than no data because it drives bad decisions. This dimension audits every event that should fire: every CTA tap, every page view, every fan sign-up, and every campaign state change. Full compliance means every event has the correct four properties (`label`, `type`, `ts`, `source`), events are deduplicated against double-taps using a debounce or in-flight flag, no event fires from a tier-locked or hidden element, and the admin dashboard's stats are derived from the same arrays (`able_clicks`, `able_views`, `able_fans`) that the event-writing code populates.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Audit every interactive element on V8 and verify each one has a corresponding `able_clicks` push — no silent taps | V8 | 5 | 2 | H | 1 |
| 2 | Every hero CTA button tap must push `{label, type: "hero-cta", ts: Date.now(), source}` to `able_clicks` | V8 | 5 | 1 | H | 1 |
| 3 | Every quick action pill tap must push `{label, type: "quick-action", ts: Date.now(), source}` to `able_clicks` | V8 | 5 | 1 | H | 1 |
| 4 | Every section action tap must push `{label, type: "section-action", ts: Date.now(), source}` to `able_clicks` | V8 | 5 | 1 | H | 1 |
| 5 | Every snap card tap must push `{label, type: "snap-card", ts: Date.now(), source}` to `able_clicks` | V8 | 4 | 1 | M | 1 |
| 6 | Every show "Get tickets" tap must push `{label: venue+date, type: "show-ticket", ts: Date.now(), source}` to `able_clicks` | V8 | 4 | 1 | M | 1 |
| 7 | Every social platform pill tap must push `{label: platform, type: "platform-link", ts: Date.now(), source}` to `able_clicks` | V8 | 4 | 1 | M | 1 |
| 8 | Fan sign-up form submission must push `{email, ts: Date.now(), source}` to `able_fans` | V8 | 5 | 1 | H | 1 |
| 9 | Page view on V8 load must push `{ts: Date.now(), source}` to `able_views` | V8 | 5 | 1 | H | 1 |
| 10 | Page view must push only once per page load — not on every re-render or state recalculation | V8 | 5 | 1 | H | 1 |
| 11 | Verify page view push happens after URL params are parsed so `source` is correctly populated | V8 | 5 | 1 | H | 1 |
| 12 | Campaign state change (e.g. artist saves new state in admin) must push an event to `able_clicks`: `{label: newState, type: "state-change", ts, source: "admin"}` | ADM | 4 | 2 | M | 2 |
| 13 | Gig mode activation must fire a `state-change` event with `label: "gig"` | ADM | 4 | 1 | M | 2 |
| 14 | Gig mode expiry must fire a `state-change` event with `label: "gig-expired"` | ADM | 3 | 2 | M | 3 |
| 15 | Profile switching from pre-release to live (when release date passes) must fire a `state-change` event with `label: "release-live"` | V8 | 4 | 2 | M | 3 |
| 16 | The `label` property on every click event must be a non-empty string — no blank labels, no undefined labels | ALL | 5 | 1 | H | 1 |
| 17 | The `type` property must be from a fixed enum: document all valid type values in `docs/systems/analytics/SPEC.md` | ALL | 4 | 2 | L | 1 |
| 18 | The `ts` property must be `Date.now()` (integer milliseconds since epoch) — never a Date object, never an ISO string | ALL | 5 | 1 | H | 1 |
| 19 | The `source` property must be the captured source attribution string (from URL params) or `"direct"` if no attribution | ALL | 5 | 1 | H | 1 |
| 20 | `source` must never be `undefined` or `null` — always fall back to `"direct"` | ALL | 5 | 1 | H | 1 |
| 21 | Double-tap debounce: each clickable element must be protected with a 300ms debounce — no duplicate events from rapid taps | V8 | 5 | 2 | H | 1 |
| 22 | Debounce must be per-element, not global — tapping two different CTAs quickly should log two events, not one | V8 | 4 | 2 | M | 1 |
| 23 | In-flight flag pattern: if a CTA navigates away or opens a sheet, set a flag to prevent double-fire on the navigation event | V8 | 4 | 2 | M | 2 |
| 24 | Verify that programmatic `element.click()` calls in tests do not fire duplicate events — test harness should bypass analytics | ALL | 3 | 2 | L | 3 |
| 25 | Create a single `trackClick(label, type)` utility function that reads the cached source, builds the event object, and pushes to `able_clicks` | ALL | 5 | 2 | M | 1 |
| 26 | Create a `trackView()` utility that reads the cached source, builds the event object, and pushes to `able_views` | ALL | 5 | 2 | M | 1 |
| 27 | Create a `trackFan(email)` utility that reads the cached source, builds the fan object, and pushes to `able_fans` | ALL | 5 | 2 | M | 1 |
| 28 | All three utilities (`trackClick`, `trackView`, `trackFan`) should be in `shared/analytics.js` — shared across pages | ALL | 5 | 3 | M | 2 |
| 29 | `trackClick` must guard against `safeSet` failure — if localStorage write fails, the click still proceeds (analytics is non-blocking) | ALL | 5 | 1 | H | 1 |
| 30 | Analytics writes must never be in the critical path — fire-and-forget pattern, not awaited | ALL | 5 | 1 | H | 1 |
| 31 | Verify that analytics events are not fired when the artist is previewing their own profile (admin preview iframe) — no self-contamination | ADM | 4 | 2 | M | 2 |
| 32 | Use a `?preview=true` flag or a same-origin postMessage to signal "this is a preview, skip analytics" | ADM | 4 | 3 | M | 3 |
| 33 | Verify that admin.html itself does not fire `able_views` events — page views are a V8-only metric | ADM | 4 | 1 | M | 1 |
| 34 | Verify that start.html does not fire click events to `able_clicks` — wizard interactions are not fan analytics | STR | 4 | 1 | M | 1 |
| 35 | Landing page (landing.html) must not write to any `able_*` analytics key — it has no artist context | LND | 4 | 1 | M | 1 |
| 36 | Verify that admin.html reads `able_clicks` and `able_views` correctly to compute the stats shown in the dashboard | ADM | 5 | 2 | H | 1 |
| 37 | Admin stats: total page views = `able_views.length` — verify this is the formula used | ADM | 4 | 1 | M | 1 |
| 38 | Admin stats: total fan sign-ups = `able_fans.length` — verify this is the formula used | ADM | 4 | 1 | M | 1 |
| 39 | Admin stats: total CTA taps = `able_clicks.filter(e => e.type !== "state-change").length` — exclude internal events | ADM | 4 | 2 | M | 2 |
| 40 | Admin stats: conversion rate = `(fans.length / views.length * 100).toFixed(1) + "%"` — verify this formula and edge case when views=0 | ADM | 4 | 2 | M | 2 |
| 41 | Admin stats must handle `able_clicks = []` (empty array) without crashing — no division by zero, no NaN display | ADM | 5 | 1 | H | 1 |
| 42 | Admin stats must handle `able_views = []` without crashing — show "0 views" not NaN or blank | ADM | 5 | 1 | H | 1 |
| 43 | Verify that admin stats update in real-time when new events arrive via storage events from another tab | ADM | 3 | 3 | M | 3 |
| 44 | Top CTA report in admin: `able_clicks` grouped by `label`, sorted by count descending — verify this is the correct grouping field | ADM | 4 | 2 | M | 2 |
| 45 | Top source report in admin: `able_views` grouped by `source`, sorted by count descending — verify this is the correct field | ADM | 4 | 2 | M | 3 |
| 46 | Fan sign-up source breakdown: `able_fans` grouped by `source` — verify this works correctly with the "direct" fallback | ADM | 4 | 2 | M | 3 |
| 47 | Verify that click events fired from the pre-release state (pre-save CTA) have `type: "hero-cta"` and the correct label | V8 | 4 | 1 | M | 2 |
| 48 | Verify that click events fired from the live state have the correct label reflecting the live state CTA text | V8 | 4 | 1 | M | 2 |
| 49 | Verify that click events fired from gig mode have type "hero-cta" with a label reflecting the ticket CTA | V8 | 4 | 1 | M | 2 |
| 50 | Verify that `able_clicks` entries from different states are distinguishable by label and type — analytics must segment by campaign state | ALL | 4 | 2 | M | 3 |
| 51 | Add a `state` property to click events: `{label, type, ts, source, state: currentProfileState}` — enables per-state analytics | ALL | 4 | 2 | L | 3 |
| 52 | Add a `state` property to view events: `{ts, source, state: currentProfileState}` — valuable for funnel analysis | ALL | 4 | 2 | L | 3 |
| 53 | Ensure `state` property does not break existing admin stats display — admin reads only documented fields | ADM | 3 | 1 | L | 3 |
| 54 | Verify that clicking a CTA that opens an external URL still fires the analytics event before navigating — use `navigator.sendBeacon` fallback if needed | V8 | 5 | 2 | H | 2 |
| 55 | `window.open(url)` CTAs must fire the click event synchronously before opening the new tab | V8 | 4 | 2 | M | 2 |
| 56 | `window.location.href = url` navigations must fire the click event before the navigation — store event in sessionStorage if async needed | V8 | 4 | 2 | H | 2 |
| 57 | Verify that the fan sign-up event and the associated click event do not double-count if the CTA that opens the sign-up form is also tracked | V8 | 4 | 2 | M | 2 |
| 58 | Fan sign-up submit event must only fire after form validation passes — no event on invalid form submission attempts | V8 | 4 | 1 | M | 1 |
| 59 | Fan sign-up event must not fire if the email is already in `able_fans` (duplicate submission) | V8 | 4 | 2 | M | 2 |
| 60 | Verify that the "I'm a fan" or fan-confirm UI step on V8 fires only one event per fan submission, not one per step | V8 | 4 | 2 | M | 2 |
| 61 | Test case: rapid double-tap on hero CTA — verify `able_clicks.length` increases by 1, not 2 | V8 | 5 | 2 | H | 2 |
| 62 | Test case: slow double-tap (500ms apart) on hero CTA — verify `able_clicks.length` increases by 2 (two intentional taps) | V8 | 4 | 2 | M | 2 |
| 63 | Test case: fan submits sign-up form twice with same email — verify `able_fans.length` increases by 1, not 2 | V8 | 5 | 2 | H | 2 |
| 64 | Test case: page load with `?ref=instagram` — verify the view event has `source: "instagram"` | V8 | 5 | 2 | H | 2 |
| 65 | Test case: CTA tap after landing with `?utm_campaign=spring-drop` — verify click event has correct source attribution | V8 | 4 | 2 | M | 2 |
| 66 | Test case: admin saves a new campaign state — verify `able_clicks` has a new state-change entry | ADM | 4 | 2 | M | 2 |
| 67 | Test case: page load with no URL params — verify view event has `source: "direct"` | V8 | 4 | 1 | M | 2 |
| 68 | Playwright smoke test: load V8, verify `able_views.length` is 1 after load | V8 | 5 | 3 | M | 2 |
| 69 | Playwright smoke test: tap a CTA on V8, verify `able_clicks.length` is 1 | V8 | 5 | 3 | M | 2 |
| 70 | Playwright smoke test: submit fan sign-up on V8, verify `able_fans.length` is 1 | V8 | 5 | 3 | M | 2 |
| 71 | Playwright smoke test: rapid double-click a CTA, verify `able_clicks.length` is 1 (debounce working) | V8 | 4 | 3 | M | 3 |
| 72 | Playwright smoke test: load V8 twice, verify `able_views.length` is 2 (views accumulate) | V8 | 4 | 3 | M | 3 |
| 73 | Verify that `able_clicks` does not contain any entry with `label: undefined` or `label: null` — assert before each push | ALL | 5 | 1 | H | 1 |
| 74 | Verify that `able_clicks` does not contain any entry with `ts: undefined` — assert before each push | ALL | 5 | 1 | H | 1 |
| 75 | Add a `validateEvent(event)` guard inside `trackClick` that throws in debug mode and skips silently in production if required fields are missing | ALL | 4 | 2 | M | 2 |
| 76 | Verify that no analytics event is fired on the initial render/paint of V8 other than the page view — no "element appeared" events | V8 | 3 | 2 | L | 2 |
| 77 | Verify that scroll events are not tracked unless explicitly documented as a tracked event type | V8 | 3 | 1 | L | 1 |
| 78 | Verify that hover/focus events are not tracked — only intentional tap/click actions | V8 | 3 | 1 | L | 1 |
| 79 | Document that `able_clicks` is a client-side append-only log — no deletions, no edits, only pushes | ALL | 3 | 1 | L | 1 |
| 80 | When Supabase backend lands, analytics events will be written to remote tables in addition to localStorage — plan for dual-write | ALL | 3 | 2 | L | 4 |
| 81 | Design the dual-write to be additive: write localStorage first, then async POST to Supabase — localStorage is the fallback, not the primary | ALL | 3 | 3 | M | 4 |
| 82 | Verify that the `type` field values used in the codebase exactly match those documented in `docs/systems/analytics/SPEC.md` | ALL | 4 | 2 | M | 1 |
| 83 | Add the `type` enum to `docs/systems/analytics/SPEC.md` if it is not already present: `hero-cta, quick-action, section-action, snap-card, show-ticket, platform-link, fan-signup, page-view, state-change` | ALL | 3 | 1 | L | 1 |
| 84 | Verify that admin.html's analytics display section only renders after data is loaded from localStorage — no flash of empty stats | ADM | 3 | 2 | L | 2 |
| 85 | Admin analytics should show a "No data yet" state when all arrays are empty rather than rendering zeros everywhere | ADM | 3 | 2 | L | 2 |
| 86 | Admin analytics "No data yet" copy: "Share your profile link to start seeing how people engage" — not generic placeholder text | ADM | 3 | 1 | L | 2 |
| 87 | Verify that admin.html doesn't compute analytics on every keypress or input change — compute once on load and on explicit refresh | ADM | 3 | 2 | L | 2 |
| 88 | Admin analytics refresh button should recompute from localStorage without a full page reload | ADM | 3 | 2 | L | 3 |
| 89 | Time-bucketed analytics (events per day) must use UTC day boundaries or consistently use local day boundaries — document which | ALL | 4 | 2 | M | 3 |
| 90 | Day-bucket formula: `new Date(ts).toISOString().slice(0, 10)` for UTC day string — use this consistently | ALL | 3 | 1 | L | 3 |
| 91 | 7-day sparkline on admin stats must only include the last 7 calendar days, not the last 7 events | ADM | 3 | 2 | L | 3 |
| 92 | Verify that the fan sign-up `source` is the URL param source, not the artist's own social link label — these are different concepts | V8 | 4 | 2 | H | 2 |
| 93 | Verify that `trackFan` does not fire if the fan sign-up form is submitted while the fan cap is reached — gate analytics to valid submissions only | V8 | 4 | 1 | M | 1 |
| 94 | Verify that `trackClick` and `trackView` functions are not exported or callable from admin.html context where fan analytics should not originate | ADM | 3 | 2 | M | 2 |
| 95 | Add error handling in `trackClick` for the case where `able_clicks` in localStorage is corrupted — reset to empty array and log warning | ALL | 4 | 2 | M | 2 |
| 96 | Add error handling in `trackView` for the case where `able_views` is corrupted — reset to empty array and log warning | ALL | 4 | 2 | M | 2 |
| 97 | Add error handling in `trackFan` for the case where `able_fans` is corrupted — reset to empty array and log warning | ALL | 5 | 2 | H | 2 |
| 98 | Write `docs/systems/analytics/EVENT-GLOSSARY.md` listing every tracked event, its trigger, required properties, and the page that fires it | ALL | 3 | 2 | L | 2 |
| 99 | Playwright test: load V8 with an empty localStorage state, verify 1 view event is recorded with `source: "direct"` after page load | V8 | 5 | 3 | M | 2 |
| 100 | Playwright test: verify that after 10 rapid CTA taps in quick succession, `able_clicks.length` is at most 4 (debounce every 300ms over ~1.2s) | V8 | 4 | 3 | M | 3 |
