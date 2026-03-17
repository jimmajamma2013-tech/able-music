# Dimension J4 — Cross-Page Journey Integrity
**Category:** Launch Readiness & Cross-Page Coherence
**Phase:** 10 (Launch)
**Status:** Not started

Full end-to-end journey tested: landing → start.html → able-v8.html → admin.html. Data flows correctly between each step. No page expects data that the previous page doesn't write. This dimension exists because the four pages were built semi-independently and each makes assumptions about what the previous page wrote to localStorage. The known gap — `start.html` writes `able_profile` (legacy key) while `admin.html` reads `able_v3_profile` — means a new artist who completes onboarding arrives in their dashboard to find it empty. That is a catastrophic first impression and a confirmed launch blocker that must be resolved before any real artist is sent through the flow.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Fix the key mismatch: `start.html` writes to `able_profile` but `admin.html` reads from `able_v3_profile` — update `start.html` to write `able_v3_profile` | STR | 5 | 2 | H | 1 |
| 2 | Add a migration shim in `admin.html` onload: if `able_v3_profile` is missing but `able_profile` exists, copy and rename it | ADM | 5 | 2 | H | 1 |
| 3 | Confirm `start.html` writes a complete `able_v3_profile` object with all fields `admin.html` expects: `name`, `bio`, `accent`, `theme`, `stateOverride`, `releaseDate`, `releaseTitle`, `ctaType` | STR | 5 | 2 | H | 1 |
| 4 | Confirm `admin.html` reads `able_v3_profile` on every load and populates the dashboard fields correctly | ADM | 5 | 2 | H | 1 |
| 5 | Confirm `able-v7.html` reads `able_v3_profile` and renders the correct artist name on page load | V8 | 5 | 2 | H | 1 |
| 6 | Confirm `able-v7.html` reads `able_v3_profile.accent` and applies it to `--color-accent` on the document root | V8 | 5 | 2 | H | 1 |
| 7 | Confirm `able-v7.html` reads `able_v3_profile.theme` and applies the correct theme class to the document root | V8 | 5 | 2 | H | 1 |
| 8 | Confirm `able-v7.html` reads `able_v3_profile.stateOverride` and renders the correct campaign state (profile/pre-release/live/gig) | V8 | 5 | 2 | H | 1 |
| 9 | Walk the full journey manually on a clean browser profile with no prior localStorage: landing.html → start.html → able-v7.html → admin.html | ALL | 5 | 2 | H | 1 |
| 10 | Confirm the landing.html CTA "Get started" links to `start.html` with the correct URL (no broken path) | LND | 5 | 1 | H | 1 |
| 11 | Confirm `start.html` final step redirects to `admin.html` after writing profile data | STR | 5 | 1 | H | 1 |
| 12 | Confirm `admin.html` shows the artist's name from the wizard on first arrival — not a placeholder like "Your name" | ADM | 5 | 1 | H | 1 |
| 13 | Confirm `admin.html` "View profile" link routes to `able-v7.html` and the profile shows the correct artist name | ADM | 5 | 1 | H | 1 |
| 14 | Confirm `admin.html` "Share profile" copies a URL that resolves to able-v7.html (not able-v3.html or a dead link) | ADM | 5 | 1 | H | 1 |
| 15 | Confirm `able-v7.html` fan sign-up writes to `able_fans` array in localStorage | V8 | 5 | 1 | H | 1 |
| 16 | Confirm `admin.html` fan list reads from `able_fans` and displays the signed-up fan | ADM | 5 | 1 | H | 1 |
| 17 | Confirm `able-v7.html` CTA taps write to `able_clicks` array in localStorage | V8 | 4 | 1 | M | 2 |
| 18 | Confirm `admin.html` analytics section reads from `able_clicks` and shows tap count correctly | ADM | 4 | 1 | M | 2 |
| 19 | Confirm `able-v7.html` page load writes to `able_views` array in localStorage | V8 | 4 | 1 | M | 2 |
| 20 | Confirm `admin.html` analytics section reads from `able_views` and shows view count correctly | ADM | 4 | 1 | M | 2 |
| 21 | Confirm `admin.html` profile editor saves changes back to `able_v3_profile` and the changes appear immediately on able-v7.html | ADM | 5 | 2 | H | 1 |
| 22 | Confirm `admin.html` show scheduler writes to `able_shows` array in localStorage | ADM | 4 | 2 | M | 2 |
| 23 | Confirm `able-v7.html` events section reads from `able_shows` and renders shows correctly | V8 | 4 | 2 | M | 2 |
| 24 | Confirm `admin.html` tier selection writes to `able_tier` key in localStorage | ADM | 4 | 1 | M | 2 |
| 25 | Confirm `able-v7.html` reads `able_tier` and applies the correct tier restrictions | V8 | 3 | 1 | L | 3 |
| 26 | Confirm `admin.html` gig mode toggle writes `able_gig_expires` as a Unix timestamp | ADM | 4 | 2 | M | 2 |
| 27 | Confirm `able-v7.html` reads `able_gig_expires` and switches to gig state if the timestamp is in the future | V8 | 4 | 2 | M | 2 |
| 28 | Confirm gig mode auto-expires after 24 hours — `able-v7.html` must not stay in gig state after `able_gig_expires` passes | V8 | 4 | 2 | M | 2 |
| 29 | Confirm `admin.html` dismissed nudges writes to `able_dismissed_nudges` and the nudge does not reappear after dismissal | ADM | 3 | 1 | L | 3 |
| 30 | Confirm `admin.html` starred fans writes to `able_starred_fans` and the star state persists across page reload | ADM | 3 | 1 | L | 3 |
| 31 | Confirm `admin.html` `admin_visit_dates` is written on every admin load — used for nudge timing logic | ADM | 3 | 1 | L | 3 |
| 32 | Confirm `start.html` sets a `source` parameter in the redirect URL so `admin.html` can show a welcome state on first load | STR | 4 | 2 | M | 2 |
| 33 | Confirm `admin.html` detects first-time arrival (`source=onboarding`) and shows a welcome message, not the default dashboard | ADM | 4 | 2 | M | 2 |
| 34 | Confirm the `start.html` → `able-v7.html` preview link shows the correct profile before the artist ever visits admin | STR | 4 | 2 | M | 2 |
| 35 | Confirm `able-v7.html` renders a useful empty state (not a blank page) when no `able_v3_profile` exists in localStorage | V8 | 4 | 2 | M | 2 |
| 36 | Confirm `admin.html` renders a useful empty state when no `able_v3_profile` exists (e.g. artist navigates directly to /admin.html) | ADM | 4 | 2 | M | 2 |
| 37 | Confirm `start.html` renders a useful empty state when accessed directly without a prior session | STR | 3 | 1 | L | 3 |
| 38 | Confirm landing.html renders correctly for a user who has already completed onboarding — it must not break or show stale state | LND | 3 | 1 | L | 3 |
| 39 | Test the journey on Safari Private Browsing — confirm localStorage is available and data flows correctly (Safari Private limits localStorage) | ALL | 4 | 2 | M | 2 |
| 40 | Test the journey on Firefox Private Browsing — confirm localStorage behaves correctly | ALL | 3 | 2 | L | 3 |
| 41 | Confirm all four pages read from the same key names — run a grep for `localStorage.getItem` across all four files and audit the key list | ALL | 5 | 2 | H | 1 |
| 42 | Confirm all four pages write to the same key names — run a grep for `localStorage.setItem` across all four files and audit the key list | ALL | 5 | 2 | H | 1 |
| 43 | Document the canonical localStorage key registry in `docs/systems/data-architecture/SPEC.md` with which page writes each key and which pages read it | DOC | 4 | 2 | M | 2 |
| 44 | Confirm the `able_v3_profile` schema is fully documented with all fields and their default values | DOC | 4 | 2 | M | 2 |
| 45 | Confirm `start.html` does not leave any orphaned keys from previous wizard iterations (e.g. `able_wizard_step`, `able_draft`) | STR | 3 | 1 | L | 3 |
| 46 | Confirm the test artist profile used in QA matches the real wizard output — do not use a manually crafted localStorage fixture | ALL | 4 | 1 | M | 2 |
| 47 | Confirm `admin.html` correctly parses `able_v3_profile` even when optional fields are absent — no crashes on missing `releaseTitle` | ADM | 4 | 2 | M | 2 |
| 48 | Confirm `able-v7.html` correctly parses `able_v3_profile` even when optional fields are absent | V8 | 4 | 2 | M | 2 |
| 49 | Confirm that saving an edit in `admin.html` does not overwrite fields set by `start.html` that admin does not expose in its UI | ADM | 4 | 2 | H | 2 |
| 50 | Confirm the release date countdown in `able-v7.html` uses the same date string format that `admin.html` writes — ISO 8601 | V8 | 4 | 1 | M | 2 |
| 51 | Test the campaign state auto-switch: set a release date 2 days in the future in admin, reload V8, confirm pre-release state | ADM | 4 | 2 | M | 2 |
| 52 | Test the campaign state auto-switch: set a release date to today in admin, reload V8, confirm live state | ADM | 4 | 2 | M | 2 |
| 53 | Test the campaign state auto-switch: set a release date 15 days in the past in admin, reload V8, confirm profile state | ADM | 4 | 2 | M | 2 |
| 54 | Confirm `stateOverride` set in admin.html correctly overrides the auto-computed state in V8 | ADM | 4 | 2 | M | 2 |
| 55 | Confirm `stateOverride` of `null` (cleared in admin) restores auto-computed state in V8 | ADM | 4 | 1 | M | 2 |
| 56 | Confirm the snap cards written in `admin.html` are read and rendered correctly in `able-v7.html` | ADM | 4 | 2 | M | 2 |
| 57 | Confirm CTA links added in `admin.html` appear in the correct zone in `able-v7.html` (hero vs pills) | ADM | 4 | 2 | M | 2 |
| 58 | Confirm the global CTA dedupe rule is enforced: the same URL cannot appear in Hero AND Quick Actions zones simultaneously | V8 | 4 | 2 | M | 2 |
| 59 | Confirm that deleting a CTA in `admin.html` removes it from `able-v7.html` on next load | ADM | 4 | 1 | M | 2 |
| 60 | Confirm the bio text saved in `admin.html` renders correctly in `able-v7.html` — test with special characters (apostrophes, ampersands) | ADM | 3 | 1 | L | 3 |
| 61 | Confirm the accent colour picker in `admin.html` updates `able-v7.html` immediately (live preview) or on save | ADM | 4 | 2 | M | 2 |
| 62 | Confirm the theme selector in `admin.html` updates `able-v7.html` correctly for all four themes | ADM | 4 | 2 | M | 2 |
| 63 | Confirm that the profile picture/avatar saved in `admin.html` (if applicable) appears in `able-v7.html` | ADM | 3 | 2 | L | 3 |
| 64 | Confirm `start.html` collects and writes `able_tier` as `"free"` for all new artists | STR | 4 | 1 | M | 2 |
| 65 | Confirm locked tier features in `admin.html` show the gold lock overlay and do not write data to localStorage silently | ADM | 3 | 2 | L | 3 |
| 66 | Test the journey with a long artist name (50+ characters) — confirm nothing overflows or truncates incorrectly across pages | ALL | 3 | 1 | L | 3 |
| 67 | Test the journey with a non-ASCII artist name (e.g. Japanese characters) — confirm localStorage and rendering handle it correctly | ALL | 3 | 2 | L | 3 |
| 68 | Test the journey with an artist name containing HTML characters (`<`, `>`, `"`, `&`) — confirm XSS is prevented at every render point | ALL | 5 | 2 | H | 1 |
| 69 | Confirm `able-v7.html` escapes the artist name before inserting into the DOM | V8 | 5 | 1 | H | 1 |
| 70 | Confirm `admin.html` escapes artist-supplied content before inserting into the DOM | ADM | 5 | 1 | H | 1 |
| 71 | Confirm `able-v7.html` correctly falls back to a demo/sample profile when loaded as a Netlify preview URL | V8 | 3 | 2 | L | 4 |
| 72 | Confirm that navigating directly to `able-v7.html` (not via the wizard) shows a usable demo state, not a blank page | V8 | 4 | 2 | M | 2 |
| 73 | Confirm `admin.html` shows a "Set up your profile" nudge when accessed before completing the wizard | ADM | 3 | 2 | L | 3 |
| 74 | Confirm `landing.html` "Log in" CTA routes to `admin.html` and the returning artist's dashboard loads correctly | LND | 4 | 1 | M | 2 |
| 75 | Confirm the returning artist journey (re-opening admin.html on a device where they previously completed setup) loads their data instantly | ADM | 5 | 1 | H | 1 |
| 76 | Confirm `admin.html` `admin_visit_dates` array is capped at 60 entries — prevents unbounded localStorage growth | ADM | 3 | 1 | L | 3 |
| 77 | Confirm `able_views` array does not grow unboundedly — implement a rolling window of the last 500 events | V8 | 3 | 2 | L | 3 |
| 78 | Confirm `able_clicks` array does not grow unboundedly — same rolling window strategy | V8 | 3 | 2 | L | 3 |
| 79 | Confirm the fan sign-up confirmation sent by the Netlify function uses the correct artist name from the POSTed payload, not a stale localStorage value | NET | 4 | 1 | M | 2 |
| 80 | Confirm the source tracking UTM parameter from `landing.html` → `start.html` is preserved and written to `able_v3_profile.source` | LND | 3 | 2 | L | 4 |
| 81 | Confirm `start.html` wizard progress is saved to localStorage so a mid-wizard refresh does not lose all input | STR | 4 | 2 | M | 2 |
| 82 | Confirm the wizard back button correctly loads the previous step's saved values from localStorage | STR | 3 | 2 | L | 3 |
| 83 | Confirm that completing `start.html` a second time (re-onboarding) overwrites the existing profile gracefully | STR | 3 | 2 | L | 3 |
| 84 | Confirm there is no orphaned data from the `able_profile` legacy key causing silent conflicts | ALL | 4 | 1 | M | 2 |
| 85 | Write an integration test script (Playwright) that walks the full 4-page journey and asserts localStorage state at each step | ALL | 4 | 4 | L | 3 |
| 86 | Write an integration test that asserts the fan sign-up flow writes the correct record to `able_fans` | V8 | 4 | 3 | L | 3 |
| 87 | Write an integration test that asserts the shows list written in admin renders correctly in V8 | ADM | 3 | 3 | L | 4 |
| 88 | Confirm the `docs/systems/CROSS_PAGE_JOURNEYS.md` document reflects the actual current data flow, not the planned flow | DOC | 3 | 2 | L | 3 |
| 89 | Update `docs/systems/data-architecture/SPEC.md` to reflect the resolution of the `able_profile` vs `able_v3_profile` naming inconsistency | DOC | 3 | 1 | L | 3 |
| 90 | Confirm the Netlify `[[redirects]]` rule does not intercept requests to `start.html` or `admin.html` — they must be served as-is | NET | 4 | 1 | M | 2 |
| 91 | Confirm that refreshing `admin.html` mid-session does not lose the artist's unsaved edits — auto-save or a warning dialog | ADM | 3 | 3 | L | 4 |
| 92 | Confirm `start.html` does not leave wizard draft data (`able_wizard_*` keys) in localStorage after completion | STR | 3 | 1 | L | 3 |
| 93 | Confirm the artist's profile URL is shown prominently in `admin.html` so they can share it immediately after onboarding | ADM | 4 | 1 | M | 2 |
| 94 | Confirm the profile URL shown in `admin.html` uses the correct production domain (not localhost or a preview URL) | ADM | 4 | 1 | M | 2 |
| 95 | Confirm `able-v7.html` does not render artist-specific profile data from a different localStorage origin (cross-origin isolation) | V8 | 3 | 1 | L | 3 |
| 96 | Test the full journey on a device where localStorage is at its storage quota — confirm graceful error messages | ALL | 3 | 2 | L | 4 |
| 97 | Confirm `admin.html` can clear all ABLE localStorage data via a "Reset" dev option (for testing/onboarding restart) | ADM | 3 | 2 | L | 4 |
| 98 | Confirm the fan journey (arriving at able-v7.html cold from a social link) does not read or depend on any artist localStorage keys | V8 | 4 | 1 | M | 2 |
| 99 | Confirm the `CONTEXT.md` active files list names `able-v7.html`, not `able-v8.html` (no such file exists yet) | DOC | 3 | 1 | L | 2 |
| 100 | Confirm `STATUS.md` is updated to mark J4 complete with the date the full end-to-end journey was manually walked | DOC | 2 | 1 | L | 6 |
