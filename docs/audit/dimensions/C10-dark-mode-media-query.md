# Dimension C10 — Dark Mode Media Query
**Category:** Colour, Contrast & Themes
**Phase:** 6 (Colour)
**Status:** Not started

ABLE has four explicit themes (Dark, Light, Glass, Contrast) managed via `[data-theme]` attributes and persisted in `localStorage`. Currently, no `@media (prefers-color-scheme: dark/light)` or `@media (prefers-contrast: more)` query is used anywhere in the codebase. This means a first-time fan visiting able-v8.html on a device set to Light mode sees the Dark theme, which is a direct conflict with their stated OS preference. The correct behaviour is: use system preference as the default for visitors who have no stored preference, then persist any manual theme selection in localStorage which overrides the system preference on future visits. Admin.html is always-light mode and does not need dark scheme support, but it does need to handle `prefers-contrast: more` by increasing borderline token values. Landing.html and start.html are intentionally dark-navy and must define an explicit position — either they always apply dark regardless of system preference, or they also respond to light mode. Full compliance requires a defined, tested policy for all four pages.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm whether `localStorage` currently stores a `theme` key after a manual selection in able-v8.html | V8 | 5 | 1 | M | 1 |
| 2 | Confirm whether able-v8.html reads `localStorage` theme on load before applying a default | V8 | 5 | 1 | H | 1 |
| 3 | Confirm whether able-v8.html checks `window.matchMedia('(prefers-color-scheme: light)')` at all | V8 | 5 | 1 | H | 1 |
| 4 | Implement the theme resolution order in able-v8.html JS: (1) localStorage → (2) prefers-color-scheme → (3) dark default | V8 | 5 | 2 | H | 1 |
| 5 | Verify that a first-time visitor on a Light-mode device sees the Light theme without any manual action | V8 | 5 | 2 | H | 1 |
| 6 | Verify that a first-time visitor on a Dark-mode device sees the Dark theme | V8 | 5 | 2 | H | 1 |
| 7 | Verify that a returning visitor who previously selected Light theme sees Light regardless of system setting | V8 | 5 | 2 | H | 1 |
| 8 | Verify that a returning visitor who previously selected Dark theme sees Dark regardless of system setting | V8 | 5 | 2 | H | 1 |
| 9 | Verify that if `localStorage` theme is `null` or empty, the system preference is used as fallback | V8 | 5 | 2 | H | 1 |
| 10 | Verify that a manual theme selection persists correctly to `localStorage` under the correct key | V8 | 4 | 1 | M | 1 |
| 11 | Confirm the localStorage key name for theme is consistent — `able_v3_profile.theme` or a dedicated `able_theme` key | V8 | 4 | 1 | M | 1 |
| 12 | Verify the theme key in localStorage maps correctly to `[data-theme="dark"]`, `[data-theme="light"]`, `[data-theme="glass"]`, `[data-theme="contrast"]` | V8 | 4 | 1 | M | 1 |
| 13 | Verify that the Glass theme is never selected as the OS default — Glass requires artwork and cannot be a system-preference fallback | V8 | 4 | 1 | H | 1 |
| 14 | Verify that the Contrast theme is applied when `window.matchMedia('(prefers-contrast: more)')` matches and no localStorage preference exists | V8 | 5 | 2 | H | 1 |
| 15 | Define the full priority order for theme resolution: prefers-contrast: more > localStorage > prefers-color-scheme > dark default | V8 | 5 | 2 | H | 1 |
| 16 | Implement the `prefers-contrast: more` check as the highest-priority override in the theme resolution JS | V8 | 4 | 2 | H | 1 |
| 17 | Verify that switching away from Contrast theme in the UI is possible if the user's OS requests high contrast | V8 | 3 | 2 | M | 2 |
| 18 | Decide and document the ABLE policy: does a manual Contrast selection persist even if OS high-contrast is later turned off? | V8 | 3 | 2 | L | 2 |
| 19 | Add a `matchMedia` change listener for `prefers-color-scheme` so the theme updates live if the user switches OS theme | V8 | 4 | 3 | M | 2 |
| 20 | Verify the live `matchMedia` listener only responds when no manual `localStorage` override is set | V8 | 4 | 2 | H | 2 |
| 21 | Verify that admin.html explicitly does not apply `prefers-color-scheme: dark` — admin is always-light | ADM | 4 | 1 | H | 1 |
| 22 | Confirm there is no `@media (prefers-color-scheme: dark)` block in admin.html CSS | ADM | 4 | 1 | H | 1 |
| 23 | Add `@media (prefers-contrast: more)` block to admin.html that raises borderline tokens (`--dash-t3`, `--dash-t2`) | ADM | 3 | 2 | M | 1 |
| 24 | In admin `prefers-contrast: more`, raise `--dash-t3` from #595959 to #444444 | ADM | 3 | 2 | M | 1 |
| 25 | In admin `prefers-contrast: more`, raise `--dash-t2` from #555555 to #404040 | ADM | 3 | 2 | M | 1 |
| 26 | In admin `prefers-contrast: more`, replace amber focus ring with a high-contrast navy ring | ADM | 4 | 2 | H | 1 |
| 27 | In admin `prefers-contrast: more`, raise `--dash-link` from #8c6200 to a darker brown-gold if current ratio is marginal | ADM | 3 | 2 | M | 2 |
| 28 | Define the landing.html position: always dark-navy regardless of OS preference — add a comment to that effect | LND | 3 | 1 | L | 1 |
| 29 | Verify landing.html does not have any `@media (prefers-color-scheme: light)` block that would override the dark intent | LND | 3 | 1 | M | 1 |
| 30 | Add `@media (prefers-contrast: more)` block to landing.html that raises text/background contrast of borderline pairs | LND | 3 | 2 | M | 2 |
| 31 | Define the start.html position: always dark-navy regardless of OS preference — document this in the wizard spec | STR | 3 | 1 | L | 1 |
| 32 | Verify start.html does not have any OS-preference-triggered theme change | STR | 3 | 1 | M | 1 |
| 33 | Add `@media (prefers-contrast: more)` block to start.html that increases contrast of wizard body text | STR | 3 | 2 | M | 2 |
| 34 | Verify that the theme resolution JS in able-v8.html runs before the first paint — no theme flash | V8 | 5 | 2 | H | 1 |
| 35 | Add the theme resolution script as an inline `<script>` in `<head>` before any CSS that depends on `[data-theme]` | V8 | 5 | 2 | H | 1 |
| 36 | Verify that the inline theme script in `<head>` does not block the parser — it should be minimal and synchronous | V8 | 4 | 2 | M | 1 |
| 37 | Measure flash of wrong theme (FOWT) — load able-v8.html on a Light-mode device and screenshot the first rendered frame | V8 | 4 | 3 | H | 2 |
| 38 | Measure FOWT on a device with `prefers-contrast: more` and no localStorage | V8 | 4 | 3 | H | 2 |
| 39 | Verify that `document.documentElement.setAttribute('data-theme', theme)` is called synchronously in the `<head>` script | V8 | 5 | 2 | H | 1 |
| 40 | Confirm the body's default CSS (before `[data-theme]` is set) uses the same values as `[data-theme="dark"]` to prevent flicker | V8 | 4 | 2 | H | 1 |
| 41 | Test the resolution order on a Contrast-mode device with a stored `light` localStorage preference — Contrast should win | V8 | 4 | 2 | H | 2 |
| 42 | Test the resolution order on a Contrast-mode device with a stored `contrast` localStorage preference — confirm no conflict | V8 | 4 | 2 | M | 2 |
| 43 | Test the resolution order on a Light-mode device with no localStorage — should resolve to Light theme | V8 | 5 | 2 | H | 1 |
| 44 | Test the resolution order on a Dark-mode device with no localStorage — should resolve to Dark theme | V8 | 5 | 2 | H | 1 |
| 45 | Verify the theme toggle UI in able-v8.html updates the `localStorage` key when user manually switches | V8 | 4 | 1 | M | 1 |
| 46 | Verify the theme toggle correctly shows the currently active theme (not always defaulting to icon for dark) | V8 | 3 | 1 | M | 1 |
| 47 | Verify the theme toggle label is accessible to screen readers with a descriptive `aria-label` showing current theme | V8 | 4 | 1 | M | 1 |
| 48 | Verify the theme toggle `aria-label` updates when the theme changes | V8 | 4 | 1 | M | 1 |
| 49 | Confirm that the admin theme selection (if any exists in admin settings) also writes to the same localStorage key | ADM | 3 | 1 | M | 1 |
| 50 | Verify that clearing localStorage (e.g. user clears site data) results in correct OS-preference fallback | V8 | 4 | 2 | M | 2 |
| 51 | Verify that the theme is read from `able_v3_profile` on load — if artist has set a default theme for their page, that overrides OS preference | V8 | 4 | 2 | H | 2 |
| 52 | Define the priority for artist-set default theme vs fan's OS preference — document the decision | V8 | 4 | 2 | L | 2 |
| 53 | Verify that if artist sets a default theme in admin, fans see that theme on first visit (no OS override) | V8 | 4 | 2 | H | 2 |
| 54 | Verify that after seeing the artist-set default, the fan can still manually switch and have that choice persist | V8 | 3 | 2 | M | 2 |
| 55 | Test theme resolution on iOS Safari — matchMedia behaviour can differ on iOS | ALL | 4 | 2 | H | 2 |
| 56 | Test theme resolution on Chrome on Android — verify `prefers-color-scheme` fires correctly | ALL | 4 | 2 | H | 2 |
| 57 | Test theme resolution on Chrome on macOS with system-level Dark Mode enabled | V8 | 4 | 2 | M | 2 |
| 58 | Test theme resolution on Firefox — verify `prefers-color-scheme` and `prefers-contrast` both fire | ALL | 3 | 2 | M | 2 |
| 59 | Verify that `window.matchMedia('(prefers-color-scheme: light)').matches` is used correctly (not the dark version as a negative check) | V8 | 4 | 1 | M | 1 |
| 60 | Verify that `window.matchMedia('(prefers-contrast: more)').matches` is checked before `prefers-color-scheme` | V8 | 4 | 1 | H | 1 |
| 61 | Verify that adding a `matchMedia` listener for `prefers-color-scheme` does not break the theme toggle | V8 | 4 | 2 | H | 2 |
| 62 | Verify that removing `localStorage` theme key while the `matchMedia` listener is active correctly reverts to OS preference | V8 | 3 | 2 | M | 3 |
| 63 | Verify admin does not flash light-to-dark or dark-to-light on load — admin is always-light and must paint cream immediately | ADM | 4 | 2 | H | 1 |
| 64 | Verify that admin `<head>` does not include any theme-resolution script that would apply dark theme | ADM | 4 | 1 | H | 1 |
| 65 | Verify landing.html does not apply a light background on first paint before JS overrides it | LND | 3 | 2 | M | 1 |
| 66 | Confirm that start.html does not respond to OS light mode — wizard is always dark-navy | STR | 3 | 1 | M | 1 |
| 67 | Verify the `<meta name="color-scheme" content="dark light">` tag is present in able-v8.html | V8 | 4 | 1 | M | 1 |
| 68 | Verify the `<meta name="color-scheme" content="light">` is correct for admin.html | ADM | 4 | 1 | M | 1 |
| 69 | Verify the `<meta name="color-scheme" content="dark">` is appropriate for landing.html and start.html | LND | 3 | 1 | L | 1 |
| 70 | Verify that the browser's native UI (address bar, scroll bar) reflects the correct colour scheme via `color-scheme` meta | ALL | 3 | 1 | L | 1 |
| 71 | Add CSS `color-scheme: dark light;` property to the `:root` selector in able-v8.html | V8 | 3 | 1 | L | 1 |
| 72 | Add CSS `color-scheme: light;` property to admin.html `:root` | ADM | 3 | 1 | L | 1 |
| 73 | Verify that form autofill styling (yellow/blue browser background on inputs) is overridden per theme correctly | ALL | 3 | 2 | M | 2 |
| 74 | Verify that `prefers-color-scheme` media query in CSS does not override the `[data-theme]` class — JS should be the single source of truth | V8 | 5 | 2 | H | 1 |
| 75 | Confirm there is no CSS `@media (prefers-color-scheme: light)` block in able-v8.html that would bypass the JS theme system | V8 | 5 | 1 | H | 1 |
| 76 | Confirm there is no CSS `@media (prefers-color-scheme: dark)` block in able-v8.html — all theming is via `[data-theme]` | V8 | 5 | 1 | H | 1 |
| 77 | Document the theme resolution algorithm in a JS comment block at the top of the theme init script | V8 | 3 | 1 | L | 3 |
| 78 | Document the admin always-light policy and the contrast-only `prefers-contrast` exception in DESIGN_SYSTEM_SPEC.md | ALL | 3 | 2 | L | 4 |
| 79 | Document the landing and start always-dark policy with rationale (brand intent) in DESIGN_SYSTEM_SPEC.md | ALL | 2 | 2 | L | 4 |
| 80 | Document the artist-set default theme vs fan OS preference priority decision in CROSS_PAGE_JOURNEYS.md | ALL | 3 | 2 | L | 4 |
| 81 | Verify that the theme resolution handles the edge case where `window.matchMedia` is not available (very old browsers) | V8 | 2 | 2 | M | 3 |
| 82 | Add a try/catch around the `matchMedia` calls in the theme init script | V8 | 3 | 1 | M | 2 |
| 83 | Verify that the theme-init script does not throw on a page with no `[data-theme]` attribute in the DOM yet | V8 | 3 | 1 | M | 1 |
| 84 | Verify that changing OS theme in System Preferences (macOS) while the profile page is open updates the theme live | V8 | 4 | 3 | M | 3 |
| 85 | Verify the live `matchMedia` listener is removed when the page is unloaded to prevent memory leaks | V8 | 2 | 1 | L | 3 |
| 86 | Verify the theme state is communicated to the artist's profile `able_v3_profile` data — so admin can display "current fan-facing theme" | ADM | 3 | 2 | M | 3 |
| 87 | Verify the admin dashboard shows what theme fans currently see on the artist profile | ADM | 3 | 2 | M | 3 |
| 88 | Verify that `prefers-color-scheme` light results in the ABLE Light theme (#f0ede8 base) not a plain white fallback | V8 | 4 | 1 | H | 1 |
| 89 | Verify that the ABLE Light theme applied by system preference passes the same WCAG checks as manual Light theme | V8 | 4 | 1 | M | 1 |
| 90 | Verify that the ABLE Dark theme applied by system preference passes the same WCAG checks as manually set Dark | V8 | 4 | 1 | M | 1 |
| 91 | Verify that the Contrast theme applied via `prefers-contrast: more` is identical to manually selected Contrast | V8 | 4 | 1 | M | 1 |
| 92 | Write Playwright test: simulate `prefers-color-scheme: light` (no localStorage) — verify `data-theme="light"` on `<html>` | V8 | 5 | 3 | L | 5 |
| 93 | Write Playwright test: simulate `prefers-color-scheme: dark` (no localStorage) — verify `data-theme="dark"` on `<html>` | V8 | 5 | 3 | L | 5 |
| 94 | Write Playwright test: set `localStorage.theme = "dark"`, simulate `prefers-color-scheme: light` — verify dark theme wins | V8 | 5 | 3 | L | 5 |
| 95 | Write Playwright test: simulate `prefers-contrast: more` — verify `data-theme="contrast"` regardless of other settings | V8 | 5 | 3 | L | 5 |
| 96 | Write Playwright test: verify no `@media (prefers-color-scheme)` block exists in able-v8.html CSS | V8 | 4 | 2 | L | 5 |
| 97 | Write Playwright test: load admin.html in OS Dark Mode — confirm admin renders with cream background not dark | ADM | 4 | 3 | L | 5 |
| 98 | Write Playwright test: load admin with `prefers-contrast: more` — verify `--dash-t3` computed value is #444444 or darker | ADM | 4 | 3 | L | 5 |
| 99 | Write Playwright test: OS theme changes live while profile page is open — verify `data-theme` updates without reload | V8 | 4 | 4 | L | 5 |
| 100 | Write Playwright test: clear localStorage, load profile on Light-mode device, verify `data-theme="light"` is applied before first user interaction | V8 | 5 | 3 | L | 5 |

## Wave Summary

| Wave | Points | Theme |
|---|---|---|
| 1 | 1–16, 21–29, 31–36, 39–40, 43–47, 49, 59–60, 63–76, 82–83, 88–91 | Resolution order implementation, prefers-contrast admin, page policies, meta tags, CSS guard checks |
| 2 | 17–20, 30, 33, 37–38, 41–42, 50–58, 61, 73, 82 | Live listener, FOWT measurement, edge cases, cross-browser, artist-set default priority |
| 3 | 62, 77, 81, 84–87 | Edge cases, live OS theme change, memory leak, admin reporting |
| 4 | 78–80 | Documentation |
| 5 | 92–100 | Automated Playwright theme resolution tests |
