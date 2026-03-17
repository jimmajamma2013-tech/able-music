# Dimension G10 — First Visit State
**Category:** Core Product Logic & User Flows
**Phase:** 1 (Foundation)
**Status:** Not started

First-visit awareness is what separates a platform that treats every person who arrives as a fan from one that recognises the person who built the page. When an artist opens their own profile for the first time — directly after completing start.html or by typing the URL themselves — they should see an orientation overlay or banner: "This is your page — share it." Not the fan experience. Similarly, the first time an artist opens admin.html (before any visits have been logged in `admin_visit_dates`), onboarding nudges should surface proactively: add a bio, connect Spotify, set a release date. This dimension audits both surfaces. Full compliance means the `able_artist_claimed` flag is the single gate for V8 first-visit detection, `admin_visit_dates.length` drives admin nudge logic, neither mechanism fires on subsequent visits, and both can be manually reset for testing without side effects.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Define the `able_artist_claimed` localStorage key as the canonical gate for V8 first-visit detection — document in canonical schema | V8 | 5 | 1 | M | 1 |
| 2 | On V8 first load, if `able_artist_claimed` is absent or falsy, show the "This is your page — share it" banner before fan-facing content | V8 | 5 | 2 | M | 1 |
| 3 | "This is your page — share it" banner must include a share CTA that copies the profile URL to clipboard | V8 | 4 | 2 | L | 2 |
| 4 | Banner must include a dismiss CTA: "Got it" — on dismiss, set `able_artist_claimed = true` and hide the banner | V8 | 4 | 1 | M | 1 |
| 5 | After banner dismiss, the profile must render the full fan-facing experience — no persistent artist-mode overlay | V8 | 4 | 1 | M | 1 |
| 6 | On V8 subsequent loads (when `able_artist_claimed = true`), skip the banner entirely — no flash of the claimed overlay | V8 | 5 | 1 | H | 1 |
| 7 | `able_artist_claimed` check must happen before any analytics events fire — artist self-visit should not pollute `able_views` | V8 | 5 | 2 | H | 1 |
| 8 | If `able_artist_claimed` is false, skip the `trackView()` call — the artist viewing their own page is not a fan visit | V8 | 5 | 2 | H | 1 |
| 9 | If `able_artist_claimed` is true, fire the `trackView()` call as normal — subsequent visits (by fans or the artist) count | V8 | 3 | 2 | M | 2 |
| 10 | Document the ambiguity: once claimed, the artist visiting their own page will also increment view count — this is accepted behaviour | ALL | 3 | 1 | L | 2 |
| 11 | The first-visit banner must be distinct from the fan-facing experience — different visual treatment, not just a toast | V8 | 4 | 3 | M | 2 |
| 12 | First-visit banner copy: "This is your page. Share it and your fans will land here." — direct, not exclamatory | V8 | 4 | 1 | L | 1 |
| 13 | First-visit banner must not use the word "Congratulations" or "You're all set" — per copy philosophy | V8 | 4 | 1 | L | 1 |
| 14 | First-visit banner must include the artist's profile URL in readable form so they can see exactly what their fans will receive | V8 | 3 | 2 | L | 2 |
| 15 | First-visit banner must not obstruct the profile content on mobile — it should slide in from top or overlay as a sheet, not block the whole viewport | V8 | 4 | 2 | M | 2 |
| 16 | First-visit banner tap target for "Got it" must be at least 44px — mobile-first rule | V8 | 3 | 1 | L | 1 |
| 17 | Verify that the first-visit banner only shows when `able_v3_profile` is populated — do not show for an unconfigured profile | V8 | 4 | 2 | M | 1 |
| 18 | If `able_v3_profile` is absent (artist never ran start.html), V8 should show a different state: "This artist hasn't set up their page yet" | V8 | 4 | 2 | M | 1 |
| 19 | The "hasn't set up yet" state must not resemble the first-visit banner — they are different messages for different conditions | V8 | 3 | 2 | L | 2 |
| 20 | Verify that scanning a QR code or tapping a social link with `?ref=instagram` does not trigger the first-visit banner — URL params alone do not indicate artist ownership | V8 | 5 | 2 | H | 1 |
| 21 | The first-visit banner should only appear for visits originating from the same device that ran start.html — `able_artist_claimed` being absent is the proxy | V8 | 5 | 1 | H | 1 |
| 22 | If start.html sets `able_artist_claimed = false` on completion (rather than omitting the key), V8 must treat false as unclaimed | V8 | 4 | 1 | M | 1 |
| 23 | start.html should NOT set `able_artist_claimed` at all on completion — leave it absent so V8's first load triggers the banner | STR | 4 | 1 | M | 1 |
| 24 | Admin.html should not read or write `able_artist_claimed` — it is a V8-only mechanism | ADM | 3 | 1 | L | 1 |
| 25 | After the artist dismisses the banner, admin.html can optionally show a "Your page is live" confirmation on next load — separate mechanism | ADM | 3 | 3 | L | 4 |
| 26 | Admin first-visit nudges are driven by `admin_visit_dates.length === 1` (first ever admin visit) — document this as the canonical trigger | ADM | 5 | 1 | M | 1 |
| 27 | On admin first visit (`admin_visit_dates.length === 1`), show the setup nudge sequence: add bio, connect Spotify, set release date | ADM | 5 | 2 | M | 1 |
| 28 | Setup nudges must be ordered by impact: (1) complete bio, (2) add profile artwork, (3) set a release date, (4) connect Spotify | ADM | 4 | 2 | L | 2 |
| 29 | Each nudge must be independently dismissible — dismissing nudge 1 should not dismiss nudge 2 | ADM | 4 | 2 | M | 2 |
| 30 | Dismissed nudge IDs are stored in `able_dismissed_nudges` — verify the first-visit nudges have stable IDs that don't change | ADM | 4 | 1 | M | 1 |
| 31 | Nudge IDs for first-visit setup: `"first-visit-bio"`, `"first-visit-artwork"`, `"first-visit-release"`, `"first-visit-spotify"` — document these | ADM | 3 | 1 | L | 1 |
| 32 | Verify that nudges do not reappear after dismissal — `able_dismissed_nudges` is checked on every admin load | ADM | 5 | 1 | H | 1 |
| 33 | Nudges for completed tasks must auto-dismiss even if not manually dismissed: if bio is set, the "add bio" nudge should not appear | ADM | 4 | 2 | M | 2 |
| 34 | Nudge completion check: bio nudge auto-hides if `able_v3_profile.bio` is non-empty | ADM | 4 | 1 | M | 2 |
| 35 | Nudge completion check: artwork nudge auto-hides if `able_v3_profile.artworkUrl` or equivalent field is non-empty | ADM | 4 | 1 | M | 2 |
| 36 | Nudge completion check: release date nudge auto-hides if `able_v3_profile.releaseDate` is set | ADM | 4 | 1 | M | 2 |
| 37 | Nudge completion check: Spotify nudge auto-hides if artist's Spotify URL is set in connections | ADM | 4 | 1 | M | 2 |
| 38 | When all first-visit nudges are dismissed or auto-completed, the nudge section should not leave an empty container | ADM | 3 | 2 | L | 2 |
| 39 | Verify that nudges shown on visit 1 are different from ongoing nudges (e.g. "add a show") — first-visit nudges are one-time | ADM | 4 | 2 | M | 2 |
| 40 | Ongoing nudges (e.g. "add a show", "share your profile") use a different trigger mechanism — not `admin_visit_dates.length === 1` | ADM | 4 | 2 | M | 3 |
| 41 | Ongoing nudge logic: show "add a show" nudge if no shows exist and `admin_visit_dates.length > 2` | ADM | 3 | 2 | L | 3 |
| 42 | Admin first-visit copy for bio nudge: "Add a few words about yourself. Your fans want to know who you are." | ADM | 3 | 1 | L | 2 |
| 43 | Admin first-visit copy for artwork nudge: "Add a photo or artwork. Fans see this first." | ADM | 3 | 1 | L | 2 |
| 44 | Admin first-visit copy for release nudge: "Set a release date to start building anticipation." | ADM | 3 | 1 | L | 2 |
| 45 | Admin first-visit copy for Spotify nudge: "Connect your Spotify so fans can stream straight from your profile." | ADM | 3 | 1 | L | 2 |
| 46 | Nudge copy must be action-oriented (one thing to do) — no preamble, no multi-clause sentences | ADM | 3 | 1 | L | 2 |
| 47 | Nudge dismiss affordance must use an X icon with a 44px target — not a tiny close button | ADM | 3 | 1 | L | 1 |
| 48 | Verify that `admin_visit_dates` is populated before nudge logic runs — race condition guard | ADM | 4 | 2 | M | 1 |
| 49 | `admin_visit_dates` append should happen at the top of admin.html's init, before nudge evaluation | ADM | 4 | 1 | M | 1 |
| 50 | Verify the day-deduplication logic for `admin_visit_dates`: same calendar day should not be pushed twice | ADM | 3 | 2 | L | 2 |
| 51 | If `admin_visit_dates` is corrupted or not an array, reset to `[today]` and re-evaluate nudges — treat as first visit | ADM | 4 | 2 | M | 2 |
| 52 | Admin first-visit state must not permanently show if the artist clears all data and re-runs start.html — it should re-trigger fresh | ADM | 3 | 2 | L | 3 |
| 53 | Provide a debug utility in admin: a hidden "Reset first-visit state" button in dev mode that clears `able_artist_claimed` and `admin_visit_dates` | ALL | 3 | 2 | L | 3 |
| 54 | Debug reset must also clear `able_dismissed_nudges` so all nudges re-appear — enables manual QA of the full first-visit flow | ALL | 3 | 2 | L | 3 |
| 55 | Verify that the V8 first-visit banner renders correctly in all 4 themes — dark, light, glass, contrast | V8 | 3 | 2 | M | 2 |
| 56 | Verify the first-visit banner is keyboard-accessible — dismiss button reachable by Tab and activated by Enter/Space | V8 | 3 | 2 | M | 2 |
| 57 | Verify the first-visit banner does not interfere with scroll on mobile — profile content below the banner should still be reachable | V8 | 4 | 2 | M | 2 |
| 58 | Verify the first-visit banner animates in gracefully — fade or slide, not an abrupt DOM insertion | V8 | 3 | 2 | L | 3 |
| 59 | First-visit banner animation must respect `prefers-reduced-motion` — skip the animation if the user prefers reduced motion | V8 | 3 | 2 | M | 3 |
| 60 | Verify that the first-visit banner share CTA uses `navigator.clipboard.writeText` with a graceful fallback for non-supporting browsers | V8 | 4 | 2 | M | 2 |
| 61 | After copying the profile URL, show a micro-confirmation: "Copied" — 1.5 second duration, then revert to "Share" | V8 | 3 | 2 | L | 3 |
| 62 | Admin onboarding nudges must be visible without scrolling on a 375px viewport — they are priority content | ADM | 4 | 2 | M | 2 |
| 63 | Admin nudge cards should visually distinguish from regular admin cards — use a slightly different background or border treatment | ADM | 3 | 2 | L | 3 |
| 64 | Verify that start.html's final step links or redirects to admin.html (not V8) — the artist's first post-setup destination is the dashboard | STR | 5 | 1 | H | 1 |
| 65 | When admin.html loads after start.html for the first time, the dashboard greeting should reference the setup: "Good to see you, [Name]." — no "Welcome back" on a first visit | ADM | 4 | 2 | L | 2 |
| 66 | "Good morning/afternoon/evening" time-of-day greeting is appropriate — "Welcome back" is not appropriate on a first visit | ADM | 3 | 1 | L | 2 |
| 67 | Verify that greeting logic checks `admin_visit_dates.length` before choosing "Good to see you" vs "Welcome back" | ADM | 3 | 2 | L | 3 |
| 68 | On visit 2+ (admin), the greeting returns to the standard: "Good to see you, [Name]." — same either way, no "welcome back" | ADM | 3 | 1 | L | 3 |
| 69 | Test case: clear all localStorage, load V8 directly — banner must appear, analytics must not fire | V8 | 5 | 2 | H | 2 |
| 70 | Test case: dismiss banner, reload V8 — banner must not appear, analytics must fire normally | V8 | 5 | 2 | H | 2 |
| 71 | Test case: load V8 with `?ref=instagram` before claiming — banner appears, no view event fires | V8 | 5 | 2 | H | 2 |
| 72 | Test case: complete start.html, navigate to admin — `admin_visit_dates.length` is 1, nudges visible | STR | 4 | 2 | M | 2 |
| 73 | Test case: dismiss all nudges, reload admin — nudges do not reappear | ADM | 5 | 2 | H | 2 |
| 74 | Test case: set all profile fields that nudges reference (bio, artwork, release, Spotify) — all nudges auto-hide | ADM | 4 | 2 | M | 2 |
| 75 | Test case: load admin for the 10th time — no first-visit nudges should appear unless explicitly re-triggered | ADM | 4 | 2 | M | 2 |
| 76 | Test case: set `able_artist_claimed = true` manually in DevTools, reload V8 — banner must not appear | V8 | 4 | 1 | M | 2 |
| 77 | Test case: set `admin_visit_dates = ["2026-01-01"]` in DevTools, reload admin — nudges should appear as if first visit | ADM | 3 | 2 | L | 3 |
| 78 | Playwright smoke test: load V8 with empty localStorage, verify first-visit banner is present in DOM | V8 | 5 | 3 | M | 2 |
| 79 | Playwright smoke test: click dismiss on first-visit banner, verify `able_artist_claimed` in localStorage is truthy | V8 | 5 | 3 | M | 2 |
| 80 | Playwright smoke test: reload V8 after dismiss, verify first-visit banner is absent from DOM | V8 | 5 | 3 | M | 2 |
| 81 | Playwright smoke test: load admin.html with `admin_visit_dates = ["today"]`, verify at least one nudge card is visible | ADM | 4 | 3 | M | 2 |
| 82 | Playwright smoke test: dismiss a nudge, reload admin, verify that nudge card is absent | ADM | 4 | 3 | M | 2 |
| 83 | Verify that the first-visit banner does not appear in the admin iframe preview of V8 — preview is not an unclaimed first visit | ADM | 4 | 2 | M | 3 |
| 84 | Admin iframe preview should pass a `?preview=true` param, and V8 should skip first-visit checks when this param is present | ADM | 4 | 2 | M | 3 |
| 85 | Verify that `?preview=true` alone cannot suppress analytics for real fan visits — it must only work in same-origin iframe context | V8 | 5 | 2 | H | 3 |
| 86 | Document the entire first-visit detection flow as a decision tree in `docs/systems/CROSS_PAGE_JOURNEYS.md` | ALL | 3 | 2 | L | 3 |
| 87 | Verify that the first-visit state works correctly in private/incognito browsing — if localStorage is unavailable, skip the banner gracefully | V8 | 4 | 2 | M | 2 |
| 88 | In private browsing where localStorage is unavailable, the profile should render the full fan-facing experience by default — no uncloseable banner | V8 | 4 | 2 | M | 2 |
| 89 | The first-visit banner should not contain marketing copy for ABLE itself — it is a utility prompt, not a sales pitch | V8 | 4 | 1 | L | 1 |
| 90 | Verify that the banner does not render in the OpenGraph / social preview crawl — it is a runtime UI element only | V8 | 3 | 1 | L | 2 |
| 91 | Admin nudges must not consume significant vertical space if all are dismissed — the section should collapse to nothing | ADM | 3 | 2 | L | 2 |
| 92 | Verify that new nudge types can be added without breaking existing dismissed-nudge logic — the check is array inclusion, not array length | ADM | 3 | 2 | L | 3 |
| 93 | Verify that the nudge section is not rendered at all if `able_dismissed_nudges` contains all possible nudge IDs | ADM | 3 | 2 | L | 3 |
| 94 | First-visit detection must be a pure, testable function: `isFirstVisit(storage)` → boolean, not an inline DOM check | ALL | 4 | 2 | L | 2 |
| 95 | `isFirstAdminVisit(visitDates)` → boolean — accepts the array, returns true if length === 1 | ADM | 4 | 1 | L | 2 |
| 96 | `shouldShowNudge(nudgeId, dismissedNudges, profile)` → boolean — checks dismissed list and profile completion | ADM | 4 | 2 | L | 2 |
| 97 | All three first-visit utility functions should live in `shared/nudges.js` — reusable, testable, not inline | ALL | 4 | 3 | M | 3 |
| 98 | Document the expected first-visit UX sequence in `docs/systems/CROSS_PAGE_JOURNEYS.md`: start.html → admin (nudges) → V8 (banner) → claim → share | ALL | 3 | 2 | L | 2 |
| 99 | Verify that the first-visit experience is reviewed against the copy philosophy before shipping — no filler, no generic SaaS phrases | ALL | 4 | 1 | L | 1 |
| 100 | Create a manual QA checklist for first-visit flows in `docs/qa/first-visit-qa.md` covering V8 unclaimed, V8 claimed, admin first visit, admin repeat visit, and private browsing | ALL | 3 | 2 | L | 2 |
