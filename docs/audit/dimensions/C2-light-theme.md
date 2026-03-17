# Dimension C2 — Light Theme Completeness
**Category:** Colour, Contrast & Themes
**Phase:** 6

The Light theme on able-v8.html uses a warm cream base (#f5f2ec surface, #ffffff card) with dark text (#0d0e1a). It is a separate visual palette from the admin cream palette and must be independently verified. Every element that renders correctly in the default Dark theme must also render correctly in Light — no white-on-white, no invisible borders, no broken gradients, no illegible text. Admin is always light but uses a different palette and is audited separately in C5.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Verify hero artist name (white hardcoded in hero text-shadow rule) is overridden to dark in light theme | able-v8.html | 5 | 1 | H | 1 |
| 2 | Confirm hero gradient overlay is adjusted in light theme so text remains readable | able-v8.html | 5 | 2 | H | 1 |
| 3 | Check bio text renders as `--color-text` (#0d0e1a) not white in light theme | able-v8.html | 4 | 1 | M | 1 |
| 4 | Verify `.bio-strip__more` button text in light theme — was previously `--color-text-2`, confirm it uses accent in light | able-v8.html | 4 | 1 | M | 1 |
| 5 | Check that `--color-accent` in light theme is contrast-safe (indie accent overridden to #5a9e67, electronic to #0e8fa3) — verify all 7 vibes | able-v8.html | 5 | 2 | H | 1 |
| 6 | Verify platform pill background in light theme — dark card pill on white card may be invisible | able-v8.html | 4 | 2 | M | 1 |
| 7 | Check platform pill border colour in light theme — transparent or too light | able-v8.html | 3 | 1 | M | 1 |
| 8 | Verify platform pill text and icon colour in light theme | able-v8.html | 3 | 1 | M | 1 |
| 9 | Check platform pill hover state in light theme — background tint may be invisible on white | able-v8.html | 3 | 1 | M | 1 |
| 10 | Verify `.hero__ambient` glow element in light theme — glow on dark artwork on a light page | able-v8.html | 3 | 2 | M | 2 |
| 11 | Check hero backdrop overlay in light theme — should it be lighter or have a different gradient? | able-v8.html | 4 | 2 | M | 2 |
| 12 | Verify nav bar in light theme — if nav uses `--color-bg` for background, may become cream | able-v8.html | 3 | 1 | L | 1 |
| 13 | Check nav bar border in light theme — dark border on cream | able-v8.html | 2 | 1 | L | 1 |
| 14 | Verify nav icons and labels in light theme — dark icons on cream background | able-v8.html | 3 | 1 | L | 1 |
| 15 | Check snap cards in light theme — card background (#ffffff on #f5f2ec), text (#0d0e1a) | able-v8.html | 4 | 1 | M | 1 |
| 16 | Verify snap card divider line in light theme — colour must be visible against white card | able-v8.html | 2 | 1 | L | 1 |
| 17 | Check snap card media thumbnail in light theme — no visual issues | able-v8.html | 2 | 1 | L | 1 |
| 18 | Verify countdown numbers and labels in light theme — dark text on which background? | able-v8.html | 4 | 1 | M | 1 |
| 19 | Check countdown card border/background in light theme — pre-release state card | able-v8.html | 3 | 1 | M | 1 |
| 20 | Verify pre-save CTA button in light theme — accent fill with on-accent text | able-v8.html | 4 | 1 | M | 1 |
| 21 | Check fan capture section in light theme — background, heading, subtext | able-v8.html | 4 | 1 | M | 1 |
| 22 | Verify fan capture input field in light theme — border, placeholder, text | able-v8.html | 4 | 1 | M | 1 |
| 23 | Check fan capture submit button in light theme — on-accent must use dark text override | able-v8.html | 4 | 1 | H | 1 |
| 24 | Verify fan capture trust text in light theme — small secondary text on light background | able-v8.html | 3 | 1 | M | 1 |
| 25 | Check release cards in light theme — card border becomes visible on cream surface | able-v8.html | 3 | 1 | M | 1 |
| 26 | Verify release card credit line text in light theme — `--color-text-2` at 60% on white | able-v8.html | 3 | 1 | M | 1 |
| 27 | Check release card play overlay in light theme — dark overlay on light card | able-v8.html | 3 | 1 | M | 1 |
| 28 | Verify merch card in light theme — price, title, stock label all readable | able-v8.html | 3 | 1 | M | 1 |
| 29 | Check events card in light theme — date, venue, ticket CTA | able-v8.html | 3 | 1 | M | 1 |
| 30 | Verify support pack card in light theme — price and description text | able-v8.html | 3 | 1 | M | 1 |
| 31 | Check section headings in light theme — large text on cream surface | able-v8.html | 2 | 1 | L | 1 |
| 32 | Verify bottom sheets in light theme — sheet background, handle, text | able-v8.html | 4 | 1 | M | 1 |
| 33 | Check bottom sheet input fields in light theme — field border and text | able-v8.html | 3 | 1 | M | 1 |
| 34 | Check bottom sheet close button in light theme — icon visibility | able-v8.html | 2 | 1 | L | 1 |
| 35 | Verify `.btn-secondary` ghost button in light theme — `[data-theme="light"] .btn-secondary { border-color: rgba(0,0,0,0.20); }` — 20% black border may be too faint | able-v8.html | 4 | 1 | M | 1 |
| 36 | Check ghost button hover state in light theme | able-v8.html | 3 | 1 | M | 1 |
| 37 | Verify hero CTA primary button in light theme with hiphop accent (gold) — dark text on gold, readable | able-v8.html | 4 | 1 | M | 1 |
| 38 | Check hero CTA primary button in light theme with indie accent (#5a9e67) — white or dark text? | able-v8.html | 4 | 1 | M | 1 |
| 39 | Verify the `--color-accent-soft` tint (rgba accent 0.12) on white card in light theme — may be invisible | able-v8.html | 3 | 1 | L | 2 |
| 40 | Check the hero ambient glow in light theme — rgba accent glow on a light background | able-v8.html | 3 | 2 | M | 2 |
| 41 | Verify CSS specificity: `[data-theme="light"]` rules must win over base dark rules | able-v8.html | 5 | 2 | H | 1 |
| 42 | Confirm no `!important` in dark theme rules that block light theme overrides | able-v8.html | 4 | 2 | H | 1 |
| 43 | Check that JavaScript-applied inline styles (from `applyDerivedTokens`) work correctly in light theme | able-v8.html | 4 | 2 | M | 1 |
| 44 | Verify the `--color-card-raised` (#f8f5f2) is actually distinguishable from `--color-card` (#ffffff) in light theme | able-v8.html | 3 | 1 | L | 1 |
| 45 | Check `--color-surface` (#ede9e2) vs `--color-card` (#ffffff) — is 3-level elevation visible in light? | able-v8.html | 3 | 1 | L | 2 |
| 46 | Verify `.hero__credit-line` colour in light theme — `rgba(13,14,26,0.4)` at 40% on light surface | able-v8.html | 3 | 1 | M | 1 |
| 47 | Check light theme on start.html — does start.html have a light theme variant at all? | start.html | 3 | 2 | M | 2 |
| 48 | Verify light theme on landing.html — landing is always dark-ish navy, does it have a light mode? | landing.html | 3 | 2 | M | 3 |
| 49 | Check that the `[data-theme="light"][data-vibe="indie"]` specificity rule for #5a9e67 is actually applied | able-v8.html | 4 | 1 | M | 1 |
| 50 | Verify `[data-theme="light"][data-vibe="electronic"]` override for #0e8fa3 — confirm in browser | able-v8.html | 4 | 1 | M | 1 |
| 51 | Identify any other vibes that fail contrast in light theme beyond indie and electronic | able-v8.html | 5 | 2 | H | 1 |
| 52 | Check hiphop (#f4b942) in light theme — gold accent on cream almost certainly fails | able-v8.html | 5 | 2 | H | 1 |
| 53 | Check R&B accent (#e06b7a) in light theme — pink on cream, borderline | able-v8.html | 4 | 2 | M | 1 |
| 54 | Check pop accent (#9b7cf4) in light theme — purple on cream, borderline | able-v8.html | 4 | 2 | M | 1 |
| 55 | Check acoustic accent (#d4a96a) in light theme — tan on cream likely fails | able-v8.html | 4 | 2 | H | 1 |
| 56 | Add `[data-theme="light"][data-vibe="hiphop"]` override for a passing gold | able-v8.html | 5 | 2 | H | 1 |
| 57 | Add `[data-theme="light"][data-vibe="rnb"]` override if needed | able-v8.html | 4 | 1 | M | 1 |
| 58 | Add `[data-theme="light"][data-vibe="pop"]` override if needed | able-v8.html | 4 | 1 | M | 1 |
| 59 | Add `[data-theme="light"][data-vibe="acoustic"]` override for passing warm tan | able-v8.html | 4 | 2 | H | 1 |
| 60 | Verify that `applyDerivedTokens()` is called again when theme switches (not just on page load) | able-v8.html | 4 | 2 | H | 1 |
| 61 | Check the `--color-panel` (#ffffff) and `--color-panel-text` (#0d0e1a) in light theme — panel component | able-v8.html | 3 | 1 | L | 1 |
| 62 | Verify gig mode "on tonight" tag in light theme — background and text | able-v8.html | 3 | 1 | M | 1 |
| 63 | Check state pill in live mode in light theme — red used for live state | able-v8.html | 3 | 1 | M | 1 |
| 64 | Verify progress/skeleton loader colours in light theme | able-v8.html | 2 | 1 | L | 2 |
| 65 | Check colour-mix() usage in light theme — `color-mix(in srgb, var(--color-bg) 88%, transparent)` produces cream in light | able-v8.html | 3 | 2 | M | 2 |
| 66 | Verify `[data-theme="light"] .btn-secondary` text (`--color-text-2`) on cream background — 60% dark on cream | able-v8.html | 3 | 1 | M | 1 |
| 67 | Check admin gold lock overlay in context — admin is always light, but verify overlay text on cream | admin.html | 3 | 1 | M | 1 |
| 68 | Verify the edit FAB button in light theme (if present on able-v8.html) | able-v8.html | 2 | 1 | L | 2 |
| 69 | Check theme toggle control in admin — does setting "Light" in admin preview the profile in light? | admin.html | 4 | 2 | M | 2 |
| 70 | Verify admin preview iframe renders light theme correctly when selected | admin.html | 4 | 2 | M | 2 |
| 71 | Check the scroll bar (WebKit) colour in light theme — may show as dark on a light page | able-v8.html | 1 | 1 | L | 3 |
| 72 | Verify selection colour (`::selection`) in light theme | able-v8.html | 1 | 1 | L | 3 |
| 73 | Check `--color-text-3` usage at 38% dark on white — borderline; audit every instance | able-v8.html | 4 | 2 | M | 1 |
| 74 | Run Playwright screenshot of all sections in light theme for visual inspection | able-v8.html | 5 | 2 | L | 2 |
| 75 | Check snap card "updated" timestamp text at `--color-text-3` in light theme | able-v8.html | 3 | 1 | M | 1 |
| 76 | Verify divider lines are visible in light theme — `--color-text-3` opacity may be too faint | able-v8.html | 2 | 1 | L | 1 |
| 77 | Check the hero backdrop-filter nav in light theme (Glass override should not apply in Light) | able-v8.html | 3 | 1 | M | 1 |
| 78 | Verify overflow/truncation ellipsis is visible in light theme for long artist names | able-v8.html | 2 | 1 | L | 2 |
| 79 | Check that `transition` rules for theme switching don't flash dark between themes | able-v8.html | 3 | 2 | M | 2 |
| 80 | Verify theme is applied before first paint (no FODT — Flash of Dark Theme) | able-v8.html | 4 | 2 | M | 2 |
| 81 | Check credits section in light theme — text and background | able-v8.html | 3 | 1 | L | 1 |
| 82 | Verify rec-item links in light theme — colour and underline | able-v8.html | 3 | 1 | L | 1 |
| 83 | Check section divider tint in light theme — accent tint on cream surface | able-v8.html | 2 | 1 | L | 1 |
| 84 | Verify tour dates header in light theme | able-v8.html | 2 | 1 | L | 1 |
| 85 | Check "sold out" label in light theme — likely red; red on cream needs verify | able-v8.html | 3 | 1 | M | 1 |
| 86 | Verify merch "add to cart" button in light theme | able-v8.html | 3 | 1 | L | 1 |
| 87 | Check the ABLE wordmark/logo visibility in light theme — if SVG uses white fill | able-v8.html | 4 | 1 | H | 1 |
| 88 | Verify focus ring in light theme — `--color-accent` outline must be visible on white card | able-v8.html | 5 | 1 | H | 1 |
| 89 | Check bottom sheet backdrop scrim in light theme — rgba black may be too heavy on light page | able-v8.html | 2 | 1 | L | 2 |
| 90 | Verify modal header separator line in light theme | able-v8.html | 2 | 1 | L | 2 |
| 91 | Check gradient behind hero text in light theme — is gradient present at all? | able-v8.html | 4 | 2 | M | 2 |
| 92 | Verify that `[data-theme="light"]` attribute is correctly set by JS theme switcher | able-v8.html | 5 | 1 | M | 1 |
| 93 | Test light theme persists correctly across page reload via localStorage | able-v8.html | 4 | 1 | M | 1 |
| 94 | Document all light-theme-specific CSS overrides in a single block for maintainability | able-v8.html | 3 | 2 | L | 4 |
| 95 | Check admin.html: `--dash-shell` (#1a1a2e) is the dark tab bar used within the always-light admin — verify it's not mistaken for "light theme" | admin.html | 3 | 1 | M | 1 |
| 96 | Confirm admin never inherits `[data-theme="light"]` rules from profile CSS — two separate surfaces | admin.html | 4 | 1 | M | 1 |
| 97 | Check that fan.html (if built) inherits the same light theme token system | fan.html | 2 | 2 | L | 3 |
| 98 | Write Playwright test: set theme=light, take screenshot, compare against golden | able-v8.html | 4 | 3 | L | 5 |
| 99 | Add all light theme accent overrides to a dedicated comment block with rationale | able-v8.html | 2 | 1 | L | 4 |
| 100 | Document the light theme colour palette in docs/systems/DESIGN_SYSTEM_SPEC.md with all token values | all | 3 | 2 | L | 4 |

## Wave Summary

| Wave | Points | Theme |
|---|---|---|
| 1 | 1–46, 49–68, 72–77, 87–88, 92–96 | Hero, text, pills, cards, CTAs, vibes — all visible element checks |
| 2 | 47–48, 64–65, 78–91 | Compound backgrounds, transitions, cross-page, visual inspection |
| 3 | 97 | fan.html light theme |
| 4 | 94, 99–100 | Documentation |
| 5 | 98 | Automated screenshot regression |
