# Dimension C4 — Contrast Theme Completeness
**Category:** Colour, Contrast & Themes
**Phase:** 6

The Contrast theme must meet WCAG AAA (7:1 minimum for normal text) on all elements. It uses a pure black (#000000) base with white text (#ffffff) and must override the artist's chosen accent colour if that accent fails 4.5:1 on black (which most saturated mid-tones do). The theme also needs to work for admin.html, which currently has no Contrast theme variant, and must respond correctly to the system-level `prefers-contrast: more` media query. The Contrast theme is the least visually tested of the four themes in the current build.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm `[data-theme="contrast"]` CSS block exists and overrides all surface tokens | able-v8.html | 5 | 1 | H | 1 |
| 2 | Verify `--color-bg: #000000` is set in contrast token block | able-v8.html | 5 | 1 | H | 1 |
| 3 | Verify `--color-surface: #0a0a0a` in contrast theme | able-v8.html | 4 | 1 | M | 1 |
| 4 | Verify `--color-card: #111111` in contrast theme | able-v8.html | 4 | 1 | M | 1 |
| 5 | Verify `--color-text: #ffffff` in contrast theme | able-v8.html | 5 | 1 | H | 1 |
| 6 | Verify `--color-text-2: rgba(255,255,255,0.85)` in contrast theme — 85% white on black is ~18:1 (AAA passes) | able-v8.html | 4 | 1 | M | 1 |
| 7 | Verify `--color-text-3: rgba(255,255,255,0.65)` in contrast theme — 65% white on black is ~12:1, passes AAA | able-v8.html | 4 | 1 | M | 1 |
| 8 | Confirm whether `--color-text-3` in contrast should be raised to 80%+ for true AAA on all element sizes | able-v8.html | 3 | 1 | M | 1 |
| 9 | Verify the artist accent colour in contrast theme — default (#e07b3a) on black = ~4.2:1, fails 4.5:1 AA | able-v8.html | 5 | 2 | H | 1 |
| 10 | Define `--color-accent` override in contrast theme — must be a high-luminance colour that passes 4.5:1 on black | able-v8.html | 5 | 2 | H | 1 |
| 11 | Determine the contrast-theme accent strategy: override to white/yellow, or enforce minimum luminance? | able-v8.html | 5 | 2 | H | 1 |
| 12 | Verify no artist vibe accent colour passes 4.5:1 on #000000 without override — test all 7 | able-v8.html | 5 | 2 | H | 1 |
| 13 | Confirm the hiphop accent #f4b942 on black — expected ~8.7:1, passes — may not need override | able-v8.html | 4 | 1 | M | 1 |
| 14 | Check indie accent #7ec88a on black — ~6.1:1, passes 4.5:1 but may need AAA check at 7:1 | able-v8.html | 4 | 1 | M | 1 |
| 15 | Check electronic accent #06b6d4 on black — ~5.0:1, passes AA but fails AAA | able-v8.html | 4 | 1 | M | 1 |
| 16 | Check rock accent #e05242 on black — ~3.6:1, fails AA, must override | able-v8.html | 5 | 2 | H | 1 |
| 17 | Check R&B accent #e06b7a on black — ~3.8:1, fails AA, must override | able-v8.html | 5 | 2 | H | 1 |
| 18 | Check pop accent #9b7cf4 on black — ~4.5:1, borderline AA | able-v8.html | 4 | 1 | M | 1 |
| 19 | Check acoustic accent #d4a96a on black — ~5.6:1, passes AA | able-v8.html | 3 | 1 | L | 1 |
| 20 | Implement `[data-theme="contrast"]` accent override for all failing vibes | able-v8.html | 5 | 3 | H | 1 |
| 21 | Verify the focus ring in contrast theme — ring must be highly visible on black backgrounds | able-v8.html | 5 | 1 | H | 1 |
| 22 | Confirm focus ring uses white or very bright accent in contrast theme | able-v8.html | 5 | 1 | H | 1 |
| 23 | Check that the three-layer focus ring (bg/outline/glow) works on pure black | able-v8.html | 4 | 1 | M | 1 |
| 24 | Verify hero CTA primary button in contrast theme — accent background, on-accent text | able-v8.html | 5 | 2 | H | 1 |
| 25 | Check hero CTA ghost button in contrast theme — border must be clearly visible on black | able-v8.html | 4 | 1 | M | 1 |
| 26 | Verify ghost button text in contrast theme — white text on transparent bg on black | able-v8.html | 4 | 1 | M | 1 |
| 27 | Check platform pills in contrast theme — pill borders must be clearly visible | able-v8.html | 4 | 1 | M | 1 |
| 28 | Verify platform pill text and icon in contrast theme | able-v8.html | 3 | 1 | M | 1 |
| 29 | Check fan capture section in contrast theme — heading, input, submit | able-v8.html | 5 | 1 | M | 1 |
| 30 | Verify fan capture input border in contrast theme — must be clearly defined | able-v8.html | 4 | 1 | M | 1 |
| 31 | Check snap card borders/separation in contrast theme — cards must be distinguishable from background | able-v8.html | 4 | 1 | M | 1 |
| 32 | Verify snap card text in contrast theme | able-v8.html | 3 | 1 | L | 1 |
| 33 | Check release cards in contrast theme | able-v8.html | 3 | 1 | L | 1 |
| 34 | Check events card in contrast theme | able-v8.html | 3 | 1 | L | 1 |
| 35 | Check merch card in contrast theme | able-v8.html | 3 | 1 | L | 1 |
| 36 | Verify countdown in contrast theme — numbers must be white on very dark background | able-v8.html | 4 | 1 | M | 1 |
| 37 | Check bottom sheets in contrast theme — sheets are `--color-panel` (#111111), text should be white | able-v8.html | 3 | 1 | L | 1 |
| 38 | Verify nav bar in contrast theme — tabs must be distinguishable, active state must be clear | able-v8.html | 4 | 1 | M | 1 |
| 39 | Check section headings and dividers in contrast theme | able-v8.html | 2 | 1 | L | 1 |
| 40 | Verify state pills (pre-release, live, gig, profile) in contrast theme — no hue-only differentiation | able-v8.html | 4 | 2 | M | 1 |
| 41 | Confirm all state indicators use text labels in addition to colour in contrast theme | able-v8.html | 4 | 1 | M | 1 |
| 42 | Check the pulsing "live" dot in contrast theme — animation must not be the only indicator | able-v8.html | 3 | 1 | M | 1 |
| 43 | Verify that decorative elements (ambient glow, gradient overlays) are suppressed in contrast theme | able-v8.html | 3 | 2 | M | 2 |
| 44 | Check that the hero ambient glow is removed or reduced in contrast theme | able-v8.html | 3 | 2 | M | 2 |
| 45 | Verify backdrop-filter usage in contrast theme — should be suppressed for clarity | able-v8.html | 3 | 2 | M | 2 |
| 46 | Check that no CSS gradient obscures text in contrast theme | able-v8.html | 4 | 2 | M | 1 |
| 47 | Verify the hero text-shadow is retained in contrast theme for legibility | able-v8.html | 3 | 1 | L | 1 |
| 48 | Check border visibility throughout contrast theme — card borders must be 1px solid white or near-white | able-v8.html | 4 | 1 | M | 1 |
| 49 | Confirm `--color-card` (#111111) is sufficiently distinguishable from `--color-bg` (#000000) in contrast | able-v8.html | 4 | 1 | M | 1 |
| 50 | Verify that interactive element hover states are clearly visible in contrast theme | able-v8.html | 4 | 1 | M | 1 |
| 51 | Check disabled state colours in contrast theme — must be visually distinct from enabled but still meet 3:1 | able-v8.html | 3 | 1 | M | 1 |
| 52 | Verify the gold lock overlay in contrast theme — overlay on blurred content | able-v8.html | 3 | 2 | M | 2 |
| 53 | Check that `applyDerivedTokens()` is called with override logic when `data-theme="contrast"` | able-v8.html | 5 | 2 | H | 1 |
| 54 | Verify `--color-accent-soft` (rgba accent 0.12) is visible in contrast theme — may need higher opacity | able-v8.html | 3 | 2 | M | 2 |
| 55 | Check `--color-accent-glow` (rgba accent 0.35) in contrast theme — glow should be suppressed or increased | able-v8.html | 3 | 2 | M | 2 |
| 56 | Determine if admin.html needs a Contrast theme variant — currently always light | admin.html | 4 | 4 | M | 3 |
| 57 | Check if admin responds to `@media (prefers-contrast: more)` — currently no implementation | admin.html | 4 | 3 | M | 3 |
| 58 | Confirm what triggers Contrast mode: manual only (data-theme="contrast"), system (prefers-contrast), or both | able-v8.html | 5 | 2 | M | 1 |
| 59 | Implement `@media (prefers-contrast: more)` to auto-apply contrast theme if no user override | able-v8.html | 5 | 3 | M | 2 |
| 60 | Verify that a user-set theme (stored in localStorage) overrides the system prefers-contrast | able-v8.html | 4 | 2 | M | 1 |
| 61 | Check that contrast theme is a selectable option in admin theme switcher | admin.html | 4 | 1 | M | 1 |
| 62 | Verify contrast theme option is correctly saved and rendered in profile preview | admin.html | 4 | 2 | M | 1 |
| 63 | Confirm contrast theme option exists in start.html theme selection step | start.html | 3 | 1 | M | 2 |
| 64 | Verify start.html previews contrast theme correctly during onboarding | start.html | 3 | 2 | M | 2 |
| 65 | Check that all link colours in contrast theme are clearly distinguishable from body text | able-v8.html | 4 | 1 | M | 1 |
| 66 | Verify error state colours in contrast theme — must not rely on red alone | able-v8.html | 3 | 1 | M | 1 |
| 67 | Check form validation error messages in contrast theme | able-v8.html | 3 | 1 | M | 1 |
| 68 | Verify success/confirmation messages in contrast theme | able-v8.html | 3 | 1 | L | 1 |
| 69 | Check `--color-panel` (#111111) and `--color-panel-raised` (#1a1a1a) separation in contrast — barely different | able-v8.html | 3 | 2 | M | 2 |
| 70 | Verify the hero overlay gradient in contrast theme does not produce a completely opaque black rectangle | able-v8.html | 4 | 2 | M | 2 |
| 71 | Check the ABLE logo/wordmark in contrast theme — must be white | able-v8.html | 3 | 1 | M | 1 |
| 72 | Verify social sharing meta tags still work correctly for contrast-theme pages | able-v8.html | 1 | 1 | L | 3 |
| 73 | Test contrast theme with a screen magnifier (simulates low-vision user) | able-v8.html | 3 | 3 | L | 3 |
| 74 | Verify that the contrast theme does not over-suppress images (artwork must still show) | able-v8.html | 3 | 1 | M | 1 |
| 75 | Check transition smoothness when switching to/from contrast theme | able-v8.html | 2 | 1 | L | 2 |
| 76 | Confirm contrast theme does not affect landing.html (landing is a static always-dark page) | landing.html | 3 | 1 | L | 1 |
| 77 | Check landing.html accessibility for users who have system contrast preference set | landing.html | 3 | 2 | M | 3 |
| 78 | Verify there is no CSS specificity conflict where contrast theme rules are overridden by vibe rules | able-v8.html | 4 | 2 | H | 1 |
| 79 | Confirm `[data-theme="contrast"]` has higher specificity than `[data-vibe="*"]` rules | able-v8.html | 5 | 2 | H | 1 |
| 80 | Verify that `applyDerivedTokens()` runs after contrast theme is applied and respects contrast rules | able-v8.html | 4 | 2 | H | 1 |
| 81 | Check that smooth scroll and spring animations are still present in contrast theme (not accessibility concern) | able-v8.html | 2 | 1 | L | 2 |
| 82 | Verify fan capture input autofill styles in contrast theme — WebKit autofill uses its own colouring | able-v8.html | 3 | 2 | M | 2 |
| 83 | Run VoiceOver with contrast theme active to verify no accessibility regressions | able-v8.html | 4 | 2 | M | 3 |
| 84 | Run Playwright screenshot of all sections in contrast theme for visual inspection | able-v8.html | 5 | 2 | L | 2 |
| 85 | Document all contrast theme token values in design system spec | docs | 2 | 2 | L | 4 |
| 86 | Add comment in CSS explaining the AAA (7:1) requirement for contrast theme | able-v8.html | 2 | 1 | L | 3 |
| 87 | Verify that the "Contrast" label in the theme switcher is understandable to non-technical artists | admin.html | 2 | 1 | L | 2 |
| 88 | Check that fan.html (if built) also supports contrast theme | fan.html | 2 | 3 | M | 4 |
| 89 | Verify the skip link in contrast theme — must be very visible when focused | able-v8.html | 4 | 1 | M | 1 |
| 90 | Check the `rel-status` pills in contrast theme — green/yellow/grey must be distinguishable | able-v8.html | 3 | 1 | M | 1 |
| 91 | Verify the snap card "published" indicator in contrast theme | able-v8.html | 2 | 1 | L | 2 |
| 92 | Confirm the page title/meta theme-color for contrast theme is updated to #000000 | able-v8.html | 2 | 1 | L | 2 |
| 93 | Check that the edit FAB (artist's own view) is clearly visible in contrast theme | able-v8.html | 3 | 1 | M | 1 |
| 94 | Verify the bio expand/collapse in contrast theme | able-v8.html | 2 | 1 | L | 2 |
| 95 | Write a contrast audit table specifically for contrast theme: every interactive element and its AAA ratio | docs | 3 | 3 | L | 4 |
| 96 | Verify section backgrounds don't add any tint/colour that reduces contrast of text above them | able-v8.html | 4 | 1 | M | 1 |
| 97 | Check bottom tab bar active indicator in contrast theme — must be clearly distinguishable | able-v8.html | 4 | 1 | M | 1 |
| 98 | Ensure contrast theme test is part of the Playwright smoke test suite | tests | 4 | 3 | L | 5 |
| 99 | Add contrast theme to the list of themes verified in the QA checklist | docs | 2 | 1 | L | 4 |
| 100 | Document the prefers-contrast media query behaviour and localStorage override logic | docs | 2 | 2 | L | 4 |

## Wave Summary

| Wave | Points | Theme |
|---|---|---|
| 1 | 1–55, 58–68, 70–71, 74–80, 89–90, 93, 96–97 | Token verification, accent overrides, element checks, specificity |
| 2 | 43–45, 52–55, 59, 69, 75, 81–82, 84, 87, 91–94 | Decorative suppression, media query, screenshots |
| 3 | 56–57, 63–64, 72–73, 76–77, 83, 86 | Admin contrast, real device testing, VoiceOver |
| 4 | 85, 88, 95, 99–100 | Documentation, fan.html |
| 5 | 98 | Automated regression |
