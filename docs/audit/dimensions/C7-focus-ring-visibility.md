# Dimension C7 — Focus Ring Visibility
**Category:** Colour, Contrast & Themes
**Phase:** 6 (Colour)
**Status:** Not started

ABLE uses a three-layer focus ring defined as `0 0 0 2px var(--bg), 0 0 0 4px var(--accent), 0 0 0 6px rgba(var(--accent-rgb), 0.25)`. Layer one is an inner gap in the page background colour, layer two is a solid accent-coloured ring, and layer three is a soft glow. This architecture works well in dark mode but faces three critical failure modes: (1) the accent ring must pass WCAG 2.1 SC 1.4.11 non-text contrast of 3:1 against adjacent colours, (2) the inner gap layer must use the actual background colour of the element under focus — not the page background — when a button has an accent fill, and (3) the glass theme has no predictable background, making the inner gap layer invisible. Each of the four themes (dark, light, glass, contrast) requires individual verification, and admin.html uses a different focus ring specification with `--acc` amber on cream.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm the three-layer focus ring CSS rule exists and uses `var(--bg)`, `var(--accent)`, and `rgba(var(--accent-rgb), 0.25)` | ALL | 5 | 1 | H | 1 |
| 2 | Verify the focus ring is applied to `:focus-visible` not `:focus` — keyboard-only, not pointer | ALL | 4 | 1 | M | 1 |
| 3 | Confirm `:focus` outline is set to `none` and only `:focus-visible` shows the ring | ALL | 4 | 1 | M | 1 |
| 4 | Verify the focus ring on dark theme: default accent ring (#e05242) on dark card (#12152a) — calculate WCAG 1.4.11 3:1 | V8 | 5 | 1 | H | 1 |
| 5 | Verify the focus ring outer glow (layer 3) does not bleed outside the viewport on elements near the screen edge | ALL | 3 | 1 | M | 1 |
| 6 | Verify that platform pills show the focus ring correctly — pills have rounded corners, ring must follow pill shape | V8 | 4 | 1 | M | 1 |
| 7 | Verify hero primary CTA button focus ring: inner gap layer must use `--color-accent` not `--color-bg` as the button has an accent fill | V8 | 5 | 2 | H | 1 |
| 8 | Fix the inner gap layer for accent-filled buttons — the inner gap should match the button background (`--color-accent`) not the page background | V8 | 5 | 2 | H | 1 |
| 9 | Verify hero ghost CTA button focus ring — ghost button has transparent background, inner gap should use page background | V8 | 4 | 1 | M | 1 |
| 10 | Verify fan capture input field focus ring — input background is card colour, inner gap must use card colour | V8 | 5 | 1 | H | 1 |
| 11 | Verify fan capture submit button focus ring — accent-filled button, same inner gap issue as primary CTA | V8 | 5 | 2 | H | 1 |
| 12 | Verify the snap card focus ring — cards are on card background, confirm ring layers are correct | V8 | 3 | 1 | M | 1 |
| 13 | Verify the section link focus rings (music, events, merch, support sections) | V8 | 3 | 1 | M | 1 |
| 14 | Verify the nav/header area focus ring if any interactive elements exist in the header | V8 | 3 | 1 | M | 1 |
| 15 | Test focus ring on dark theme with all 7 vibe accents — accent ring must pass 3:1 on dark card for each | V8 | 5 | 2 | H | 1 |
| 16 | Test focus ring with indie sage accent (#7ec88a) on dark card (#12152a) — sage on dark navy, calculate | V8 | 4 | 1 | H | 1 |
| 17 | Test focus ring with electronic cyan accent (#06b6d4) on dark card — calculate | V8 | 4 | 1 | M | 1 |
| 18 | Test focus ring with pop purple accent (#9b7cf4) on dark card — calculate | V8 | 4 | 1 | M | 1 |
| 19 | Test focus ring with acoustic tan accent (#d4a96a) on dark card — calculate | V8 | 4 | 1 | M | 1 |
| 20 | Fix any accent that fails 3:1 against dark card in the focus ring — either raise accent luminance or use a contrast-override ring | V8 | 5 | 3 | H | 1 |
| 21 | Verify focus ring on light theme: accent ring on cream `--color-bg: #f0ede8` — calculate contrast for each vibe | V8 | 5 | 2 | H | 1 |
| 22 | Test focus ring with default accent #e07b3a (orange) on cream #f0ede8 — orange on cream may fail 3:1 | V8 | 5 | 1 | H | 1 |
| 23 | Test focus ring with rock red #e05242 on cream #f0ede8 — calculate | V8 | 4 | 1 | H | 1 |
| 24 | Test focus ring with hiphop gold #f4b942 on cream #f0ede8 — gold on cream is the weakest combination | V8 | 5 | 1 | H | 1 |
| 25 | Fix light theme focus ring for accents that fail — override the ring to use `--color-text` (#1a1a2e) in light theme | V8 | 5 | 2 | H | 1 |
| 26 | Verify the light theme focus ring inner gap uses `#f0ede8` cream not `#0d0e1a` dark navy | V8 | 4 | 1 | H | 1 |
| 27 | Confirm `[data-theme="light"]` CSS block overrides `--bg` so the inner gap layer picks up the cream floor | V8 | 4 | 1 | H | 1 |
| 28 | Verify focus ring on glass theme: the inner gap layer uses `transparent` or the element own background | V8 | 5 | 3 | H | 1 |
| 29 | Determine whether the glass theme focus ring needs a stronger outer ring (4px solid instead of 2px gap + 2px ring) | V8 | 4 | 2 | H | 2 |
| 30 | Test glass theme focus ring against a bright artwork image in the background — ring must be visible | V8 | 4 | 3 | H | 2 |
| 31 | Test glass theme focus ring against a dark artwork image — ring must be visible against both | V8 | 4 | 3 | H | 2 |
| 32 | Implement a white outline fallback for glass theme focus ring when accent ring may be obscured | V8 | 4 | 3 | H | 2 |
| 33 | Verify focus ring on contrast theme: pure black background, white or high-contrast ring | V8 | 5 | 2 | H | 1 |
| 34 | Confirm contrast theme overrides `--accent` in the focus ring to a high-luminance value (not a mid-tone vibe accent) | V8 | 5 | 2 | H | 1 |
| 35 | Verify contrast theme inner gap uses `#000000` black to match the contrast theme background | V8 | 4 | 1 | H | 1 |
| 36 | Verify admin focus ring uses `--acc: #c9a84c` amber on cream `--dash-bg: #e4dfd7` — amber on cream may fail 3:1 | ADM | 5 | 1 | H | 1 |
| 37 | Calculate amber (#c9a84c) vs cream (#e4dfd7) contrast ratio for WCAG 1.4.11 compliance | ADM | 5 | 1 | H | 1 |
| 38 | Fix admin focus ring if amber on cream fails 3:1 — use `--dash-text` (#1a1a2e) ring instead | ADM | 5 | 2 | H | 1 |
| 39 | Verify admin focus ring on `--dash-shell` (#1a1a2e dark navy) tab bar — amber on dark navy passes 3:1 | ADM | 4 | 1 | M | 1 |
| 40 | Verify admin focus ring on accent-filled `.tb-btn-acc` button — inner gap must match button background | ADM | 4 | 2 | H | 1 |
| 41 | Verify admin field focus ring — input fields use `--dash-field` (#e4dfd7) background, ring must account for this | ADM | 4 | 1 | M | 1 |
| 42 | Verify admin card focus ring for all interactive card elements — `.chq-state-btn`, `.gig-strip` | ADM | 3 | 1 | M | 1 |
| 43 | Verify start.html CTA button focus ring — wizard uses profile accent, confirm ring is correct | STR | 4 | 1 | H | 1 |
| 44 | Verify start.html vibe selector tile focus ring — tile has accent background on hover/focus | STR | 4 | 1 | H | 1 |
| 45 | Verify start.html input field focus rings in wizard steps | STR | 4 | 1 | M | 1 |
| 46 | Verify start.html progress step indicator focus if it is keyboard-accessible | STR | 3 | 1 | M | 1 |
| 47 | Verify landing page focus rings: `.btn-cta` primary button, navigation links, footer links | LND | 4 | 1 | M | 1 |
| 48 | Verify landing `.btn-cta` focus ring — gold (#c9a84c) accent ring on dark navy landing background — calculate | LND | 4 | 1 | M | 1 |
| 49 | Verify landing CTA button focus: inner gap must use the landing page dark background not the button fill | LND | 4 | 1 | M | 1 |
| 50 | Verify landing navigation link focus rings on dark background | LND | 3 | 1 | M | 1 |
| 51 | Check the `outline-offset` value — rings should have 2px minimum offset so the inner gap is visible | ALL | 3 | 1 | M | 1 |
| 52 | Confirm focus ring does not get clipped by `overflow: hidden` on parent containers | ALL | 4 | 2 | H | 1 |
| 53 | Verify `.bento-grid` cards — grid item overflow may clip focus ring on child buttons | V8 | 3 | 2 | H | 1 |
| 54 | Verify `.quick-pills` container does not clip focus ring on platform pills | V8 | 3 | 2 | H | 1 |
| 55 | Verify the merch bento grid cells — overflow clipping is common in grid layouts | V8 | 3 | 2 | H | 1 |
| 56 | Verify the events list rows — overflow clipping check | V8 | 3 | 2 | M | 1 |
| 57 | Verify that the scroll container on mobile does not clip focus rings for off-screen items | V8 | 3 | 2 | M | 1 |
| 58 | Test focus ring keyboard navigation through the entire profile page on dark theme at 375px | V8 | 4 | 2 | M | 2 |
| 59 | Test focus ring keyboard navigation through the entire profile page on light theme at 375px | V8 | 4 | 2 | M | 2 |
| 60 | Test focus ring keyboard navigation through admin at 375px | ADM | 4 | 2 | M | 2 |
| 61 | Test focus ring keyboard navigation through start.html wizard at 375px | STR | 4 | 2 | M | 2 |
| 62 | Test focus ring keyboard navigation through landing page at 375px | LND | 3 | 2 | M | 2 |
| 63 | Verify focus ring is visible on mobile iOS Safari — Safari has different focus ring rendering | ALL | 5 | 2 | H | 2 |
| 64 | Confirm that `:focus-visible` is supported in target browsers — add `focus` fallback for older Safari | ALL | 4 | 2 | M | 2 |
| 65 | Test focus ring with a custom artist accent near mid-luminance (#9b7cf4 purple) — this is the edge case | V8 | 4 | 1 | M | 1 |
| 66 | Verify that the focus ring `box-shadow` does not compound with other existing `box-shadow` values on buttons | ALL | 3 | 2 | M | 1 |
| 67 | Verify that the third layer (soft glow) does not obscure surrounding text or UI elements | ALL | 2 | 1 | L | 2 |
| 68 | Verify the focus ring transition animation — ABLE uses spring easing for interactions; confirm ring appears immediately without animation delay | ALL | 3 | 2 | M | 2 |
| 69 | Check that focus ring does not trigger layout shift — `box-shadow` should not affect document flow | ALL | 3 | 1 | L | 1 |
| 70 | Verify modal/overlay focus trap includes correct focus ring styling inside the modal | V8 | 3 | 2 | M | 2 |
| 71 | Verify fan capture sheet focus ring when sheet is open — sheet may have a different effective background | V8 | 4 | 2 | M | 2 |
| 72 | Verify admin modal focus ring if admin uses modal dialogs | ADM | 3 | 2 | M | 2 |
| 73 | Verify dropdown menu items have visible focus rings — connections dropdown, CTA type selector | ADM | 3 | 1 | M | 1 |
| 74 | Verify native `<select>` element focus ring in admin — platform-specific rendering | ADM | 3 | 1 | M | 1 |
| 75 | Verify radio button and checkbox focus rings in admin settings | ADM | 3 | 1 | M | 1 |
| 76 | Verify toggle switch focus ring in admin (theme toggle, gig mode toggle) | ADM | 4 | 1 | M | 1 |
| 77 | Verify icon-only button focus rings — icon buttons need the same three-layer ring, not just the default browser outline | ALL | 3 | 1 | M | 1 |
| 78 | Verify dismiss button (×) focus rings on nudge strips and snap cards | ADM | 3 | 1 | M | 1 |
| 79 | Verify upgrade lock overlay focus trap ring — if user can tab into upgrade overlay | ADM | 3 | 2 | M | 2 |
| 80 | Verify focus ring does not appear on scroll-only containers — `tabindex="-1"` scroll containers must be excluded | ALL | 3 | 1 | L | 1 |
| 81 | Add `@media (forced-colors: active)` override to ensure focus ring is visible in Windows High Contrast Mode | ALL | 4 | 2 | M | 3 |
| 82 | Verify the forced-colors override uses `Highlight` system colour for the focus ring | ALL | 4 | 2 | M | 3 |
| 83 | Confirm that `prefers-reduced-motion` does not suppress the focus ring appearance — ring must still show, just without animation | ALL | 4 | 1 | M | 1 |
| 84 | Verify all focus rings in the `.events-section` — show rows and ticket links | V8 | 3 | 1 | M | 1 |
| 85 | Verify all focus rings in the `.merch-section` or `.merch-bento-grid` | V8 | 3 | 1 | M | 1 |
| 86 | Verify all focus rings in the `.support-section` — patron and tip jar links | V8 | 3 | 1 | M | 1 |
| 87 | Verify the `.connections-section` platform links focus ring on profile | V8 | 3 | 1 | M | 1 |
| 88 | Verify focus ring on `.release-card` in admin if the card is interactive | ADM | 2 | 1 | L | 1 |
| 89 | Verify focus ring on `.ai-suggestion` dismiss button | ADM | 2 | 1 | L | 1 |
| 90 | Verify focus ring on `.arc-node` campaign arc step if it is keyboard-accessible | ADM | 2 | 1 | L | 1 |
| 91 | Verify focus ring on `.snap-sort` drag handles — keyboard draggable elements need visible focus | ADM | 3 | 2 | M | 2 |
| 92 | Verify `focus-within` ring (if used on form groups) does not create confusing double-ring visuals | ALL | 2 | 1 | L | 2 |
| 93 | Document the three-layer focus ring specification and the per-theme override rules in DESIGN_SYSTEM_SPEC.md | ALL | 3 | 2 | L | 4 |
| 94 | Document why the inner gap layer must match the element background (not page background) for filled buttons | ALL | 3 | 1 | L | 4 |
| 95 | Add the admin focus ring override rule to admin.html CSS as a named comment block | ADM | 2 | 1 | L | 4 |
| 96 | Write Playwright test that tabs through all interactive elements on dark theme and screenshots each focused state | ALL | 4 | 4 | L | 5 |
| 97 | Write Playwright test that tabs through all interactive elements on light theme and screenshots each focused state | ALL | 4 | 4 | L | 5 |
| 98 | Write Playwright test that checks `box-shadow` computed value of `.btn-primary` when focused contains three layers | ALL | 4 | 3 | L | 5 |
| 99 | Write Playwright test that confirms no `overflow: hidden` on platform pills container clips focus ring | V8 | 3 | 3 | L | 5 |
| 100 | Write Playwright test that verifies focus ring is visible in glass theme against a loaded artwork image | V8 | 4 | 4 | L | 5 |

## Wave Summary

| Wave | Points | Theme |
|---|---|---|
| 1 | 1–27, 33–45, 47–57, 65–66, 69, 73–78, 80, 83–90 | Existence, dark/light/contrast theme rings, admin, start.html, landing, overflow clipping |
| 2 | 28–32, 58–64, 67–68, 70–72, 79, 91–92 | Glass theme, keyboard nav testing, mobile Safari, modal focus traps, drag handles |
| 3 | 81–82 | Forced colours / Windows High Contrast Mode |
| 4 | 93–95 | Documentation |
| 5 | 96–100 | Automated Playwright focus tests |
