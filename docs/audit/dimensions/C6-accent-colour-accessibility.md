# Dimension C6 — Accent Colour Accessibility
**Category:** Colour, Contrast & Themes
**Phase:** 6 (Colour)
**Status:** Not started

The artist-set accent colour is the single most consequential colour decision in the ABLE design system. It controls hero CTA button fills, the fan capture submit button, platform pill hover states, focus rings, section dividers, snap card tints, and the ambient glow behind artwork. Because any artist can set any hex value, a naive implementation will silently produce failing contrast ratios on the most important interactive elements on the page. The `applyDerivedTokens()` function must enforce two constraints: (1) a minimum luminance floor and maximum luminance ceiling to prevent near-black and near-white accents, and (2) a WCAG-derived `--color-on-accent` calculation that selects either white or the dark base colour (#0d0e1a) based on which produces the higher contrast ratio against the chosen accent. Without this, default accents like orange (#e07b3a) produce white-on-orange at ~2.8:1 — a critical failure on the fan capture button. Full compliance means every artist's chosen accent, including arbitrary custom hex values, results in readable text across all four themes with no flash of inaccessible colour.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm whether `applyDerivedTokens()` currently calculates `--color-on-accent` dynamically or only uses a static fallback | V8 | 5 | 1 | H | 1 |
| 2 | Implement `getLuminance(r, g, b)` using the WCAG relative luminance formula inside or alongside `applyDerivedTokens()` | V8 | 5 | 2 | H | 1 |
| 3 | Implement `getContrastRatio(lum1, lum2)` using the WCAG formula `(lighter + 0.05) / (darker + 0.05)` | V8 | 5 | 2 | H | 1 |
| 4 | In `applyDerivedTokens()`, calculate contrast of #ffffff against accent and contrast of #0d0e1a against accent | V8 | 5 | 2 | H | 1 |
| 5 | Set `--color-on-accent` to whichever of #ffffff or #0d0e1a yields the higher contrast ratio | V8 | 5 | 2 | H | 1 |
| 6 | Verify the fan capture submit button uses `--color-on-accent` for its label text — this is the highest-risk element | V8 | 5 | 1 | H | 1 |
| 7 | Verify the hero primary CTA button uses `--color-on-accent` for its label text | V8 | 5 | 1 | H | 1 |
| 8 | Test on-accent derivation with default accent #e07b3a (orange) — white gives ~2.8:1 (fails), dark #0d0e1a gives ~7.6:1 | V8 | 5 | 1 | H | 1 |
| 9 | Test on-accent derivation with rock vibe accent #e05242 (red) — white ~3.8:1 fails AA for normal text, dark passes | V8 | 5 | 1 | H | 1 |
| 10 | Test on-accent derivation with hiphop vibe accent #f4b942 (gold) — white ~2.2:1 fails, dark #0d0e1a ~8.7:1 passes | V8 | 5 | 1 | H | 1 |
| 11 | Test on-accent derivation with indie vibe accent #7ec88a (sage) — white ~2.7:1 fails, dark ~7.7:1 passes | V8 | 5 | 1 | H | 1 |
| 12 | Test on-accent derivation with electronic vibe accent #06b6d4 (cyan) — white ~3.3:1 fails, dark ~6.4:1 passes | V8 | 4 | 1 | M | 1 |
| 13 | Test on-accent derivation with R&B vibe accent #e06b7a (pink) — white ~3.5:1 fails, dark ~6.1:1 passes | V8 | 4 | 1 | M | 1 |
| 14 | Test on-accent derivation with pop vibe accent #9b7cf4 (purple) — white ~4.5:1 borderline, dark ~4.7:1 borderline | V8 | 4 | 1 | M | 1 |
| 15 | Test on-accent derivation with acoustic vibe accent #d4a96a (tan) — white ~2.5:1 fails, dark ~8.6:1 passes | V8 | 4 | 1 | M | 1 |
| 16 | Implement minimum luminance constraint: reject accents with relative luminance below ~0.09 (near-black) | V8 | 4 | 2 | M | 1 |
| 17 | Implement maximum luminance constraint: reject accents with relative luminance above ~0.85 (near-white) | V8 | 4 | 2 | M | 1 |
| 18 | When an accent is clamped by min/max luminance constraint, adjust towards nearest safe hue-preserving value | V8 | 3 | 3 | M | 2 |
| 19 | Verify that the CSS fallback `--color-on-accent: #ffffff` in base styles is replaced by JS before any CTA is visible | V8 | 4 | 1 | H | 1 |
| 20 | Verify the CSS fallback `--color-accent: #e05242` in base styles produces a passing on-accent if JS is slow | V8 | 4 | 1 | M | 1 |
| 21 | Confirm `applyDerivedTokens()` runs on `DOMContentLoaded` before the hero CTA is interactive | V8 | 5 | 1 | H | 1 |
| 22 | Measure whether a flash of white text on orange occurs before `applyDerivedTokens()` runs (FOAC) | V8 | 3 | 2 | M | 2 |
| 23 | Verify that changing the accent in admin triggers a re-run of `applyDerivedTokens()` on the profile preview | ADM | 5 | 1 | H | 1 |
| 24 | Verify that the accent colour input field in admin validates the hex value before calling `applyDerivedTokens()` | ADM | 4 | 1 | M | 1 |
| 25 | Verify that an empty string submission from the admin accent field does not crash `applyDerivedTokens()` | ADM | 3 | 1 | M | 1 |
| 26 | Verify `hexToRgb()` helper handles 3-character shorthand hex inputs (#abc → #aabbcc) | V8 | 3 | 1 | M | 1 |
| 27 | Verify `hexToRgb()` handles uppercase hex inputs (#E05242 as well as #e05242) | V8 | 3 | 1 | L | 1 |
| 28 | Confirm `hexToRgb()` returns null for invalid input and `applyDerivedTokens()` falls back gracefully | V8 | 3 | 1 | M | 1 |
| 29 | Verify that `--color-accent-rgb` is updated atomically alongside `--color-accent` in `applyDerivedTokens()` | V8 | 4 | 1 | M | 1 |
| 30 | Verify that all `rgba(var(--color-accent-rgb), 0.x)` tint uses still render correctly after accent change | V8 | 3 | 2 | M | 2 |
| 31 | Verify the focus ring on dark theme: outer ring = `--color-accent`, inner gap = `--color-bg` — accent must pass 3:1 on page bg | V8 | 5 | 1 | H | 1 |
| 32 | Verify the focus ring when focused element has `--color-accent` background — inner ring colour must adapt to on-accent | V8 | 5 | 2 | H | 1 |
| 33 | Verify ghost button border `color-mix(in srgb, var(--color-accent) 45%, transparent)` meets WCAG 1.4.11 (3:1) on dark card | V8 | 4 | 2 | M | 1 |
| 34 | Verify platform pill hover background (accent tint) does not obscure the pill label text | V8 | 3 | 1 | M | 1 |
| 35 | Verify `--color-state-pre: #fbbf24` (warm yellow) as text on dark card `--color-card: #12152a` — calculate | V8 | 3 | 1 | M | 1 |
| 36 | Verify `--color-state-live: #ef4444` (red) as text on dark card — may pass only as large text | V8 | 3 | 1 | M | 1 |
| 37 | Verify `--color-state-gig` on dark card — confirm the gig state colour is readable at normal text size | V8 | 3 | 1 | H | 1 |
| 38 | Verify `--color-state-prof: #06b6d4` (cyan) as text on dark card | V8 | 3 | 1 | M | 1 |
| 39 | Verify admin `--acc: #c9a84c` (gold) used for `.tb-btn-acc` button: text #121a24 on gold — calculate ratio | ADM | 4 | 1 | M | 1 |
| 40 | Verify landing `.btn-cta` button: gold (#c9a84c) background with dark text on dark navy page — calculate | LND | 4 | 1 | M | 1 |
| 41 | Verify landing secondary CTA if it uses an accent colour — confirm text on accent passes | LND | 3 | 1 | M | 1 |
| 42 | Confirm start.html CTAs use a static accent or call `applyDerivedTokens()` — determine which applies | STR | 4 | 1 | M | 1 |
| 43 | Verify vibe selector tile in start.html: accent background with label text on selected state | STR | 4 | 2 | M | 1 |
| 44 | Verify each of the 7 vibe tiles in start.html shows accessible text/background contrast on selection | STR | 4 | 2 | M | 1 |
| 45 | Confirm start.html vibe preview reruns `applyDerivedTokens()` when an accent is selected in the wizard | STR | 4 | 2 | M | 2 |
| 46 | Verify admin amber focus ring on cream passes WCAG 1.4.11 (3:1) — amber ring on cream is the weakest combination | ADM | 4 | 1 | H | 1 |
| 47 | Test an intentionally bad accent (#000000 pure black) — confirm min luminance constraint corrects it | V8 | 4 | 1 | M | 2 |
| 48 | Test an intentionally bad accent (#ffffff pure white) — confirm max luminance constraint corrects it | V8 | 4 | 1 | M | 2 |
| 49 | Test an intentionally bad accent (#ff0000 pure red) — confirm the on-accent correction selects dark text | V8 | 4 | 1 | M | 2 |
| 50 | Verify accent accessibility in contrast theme — contrast theme must override any artist accent with a pre-approved high-contrast value | V8 | 4 | 2 | H | 2 |
| 51 | Verify accent accessibility in light theme — on light (#f0ede8 base) the on-accent text override must recalculate | V8 | 4 | 2 | M | 1 |
| 52 | Confirm light theme accent override runs inside or after `applyDerivedTokens()` not before it | V8 | 4 | 2 | H | 1 |
| 53 | Verify that `--color-on-accent` for mid-luminance accents like pop purple (#9b7cf4) is explicitly handled | V8 | 4 | 2 | H | 1 |
| 54 | Verify that the admin preview panel (if iframe) correctly receives the updated `--color-on-accent` after an accent change | ADM | 4 | 2 | M | 2 |
| 55 | Verify `--color-accent-glow` (rgba accent 0.35) is decorative — confirm it is never the sole indicator of meaning | V8 | 2 | 1 | L | 2 |
| 56 | Verify `--color-accent-soft` (rgba accent 0.12 tint) is decorative and never used as a background for text | V8 | 2 | 1 | L | 2 |
| 57 | Verify snap card accent tint `color-mix(in srgb, var(--color-accent) X%, transparent)` with all 7 vibes | V8 | 3 | 2 | M | 2 |
| 58 | Verify hero backdrop accent tint (`color-mix` 92% bg + 8% accent) does not create a blended colour that fails text | V8 | 3 | 2 | M | 2 |
| 59 | Check that accent derivation does not silently modify the artist's stored hex — clamped value must be display-only | ADM | 3 | 2 | M | 2 |
| 60 | Define artist-facing message in admin when their chosen accent is adjusted for accessibility: concise, non-technical | ADM | 3 | 2 | L | 3 |
| 61 | Add real-time contrast ratio preview in admin when artist changes their accent colour | ADM | 4 | 3 | L | 3 |
| 62 | Verify that saving an accent in admin correctly persists to `able_v3_profile.accent` in localStorage | V8 | 5 | 1 | M | 1 |
| 63 | Verify fan-facing page reads accent from localStorage and runs `applyDerivedTokens()` on load correctly | V8 | 5 | 1 | M | 1 |
| 64 | Verify `--color-accent` is applied to the `<html>` root element so all child components inherit it | V8 | 3 | 1 | L | 1 |
| 65 | Confirm the accent derivation runs atomically — no intermediate tick between old accent tokens and new ones | V8 | 3 | 2 | M | 2 |
| 66 | Verify admin colour swatch in profile identity section reflects stored accent visually | ADM | 2 | 1 | L | 1 |
| 67 | Verify admin does not allow empty string submission from accent colour field | ADM | 3 | 1 | M | 1 |
| 68 | Verify that a custom arbitrary hex entered in admin runs through full `applyDerivedTokens()` luminance check | ADM | 5 | 1 | H | 1 |
| 69 | Verify the upgrade gradient in admin uses colours that are not required for reading information | ADM | 2 | 1 | L | 2 |
| 70 | Check the accent-based section divider border `rgba(var(--color-accent-rgb), 0.4)` on dark card — decorative, not text | V8 | 2 | 1 | L | 2 |
| 71 | Verify that all `color-mix()` accent tints degrade gracefully in browsers that do not support `color-mix` | V8 | 3 | 2 | M | 2 |
| 72 | Confirm `getLuminance()` uses the correct sRGB linearisation formula — not a simplified approximation | V8 | 4 | 1 | M | 1 |
| 73 | Add a comment inside `applyDerivedTokens()` documenting the on-accent derivation algorithm | V8 | 3 | 1 | L | 3 |
| 74 | Add comments inside `applyDerivedTokens()` documenting the min/max luminance constraints and their values | V8 | 2 | 1 | L | 3 |
| 75 | Verify that the email template accent colour (fetched from saved profile) also gets contrast-checked before being embedded | ALL | 3 | 2 | M | 3 |
| 76 | Verify fan.html (when built) uses the artist's accent and runs the same `applyDerivedTokens()` derivation | ALL | 3 | 3 | M | 4 |
| 77 | Verify the accent and on-accent are included in the Supabase `profiles` table schema for backend migration | ALL | 3 | 2 | L | 4 |
| 78 | Document all 7 default vibe accents with their white contrast and dark contrast ratios in DESIGN_SYSTEM_SPEC.md | ALL | 3 | 2 | L | 4 |
| 79 | Add an accent contrast table to DESIGN_SYSTEM_SPEC.md showing which on-accent value each preset selects | ALL | 2 | 2 | L | 4 |
| 80 | Include a tooltip or onboarding hint in start.html explaining that ABLE automatically ensures text is readable | STR | 2 | 2 | L | 3 |
| 81 | Verify the accent selection screen in start.html does not show any vibe tile with illegible text on its accent swatch | STR | 4 | 1 | M | 1 |
| 82 | Verify the landing page hero section uses its accent colours in a way that maintains WCAG AA on all text | LND | 4 | 1 | M | 1 |
| 83 | Test the landing page amber CTA (#c9a84c) at 375px — confirm button label passes 4.5:1 at small size | LND | 4 | 1 | M | 1 |
| 84 | Verify landing page CTA hover state accent change — on-accent text must still pass after hover colour shift | LND | 4 | 1 | M | 1 |
| 85 | Verify start.html progress bar uses accent colour only as a decorative indicator, not as text | STR | 2 | 1 | L | 2 |
| 86 | Check start.html colour picker (if it exists) enforces minimum contrast on preview | STR | 4 | 2 | M | 2 |
| 87 | Confirm that admin accent preview correctly shows `--color-on-accent` text on the accent swatch in real-time | ADM | 3 | 2 | M | 2 |
| 88 | Verify `applyDerivedTokens()` handles an accent value passed with a leading `#` and without one | V8 | 3 | 1 | M | 1 |
| 89 | Test that the on-accent calc produces stable output when called multiple times with the same accent (idempotent) | V8 | 3 | 1 | L | 1 |
| 90 | Verify that the contrast theme accent override does not persist to localStorage and only applies at render time | V8 | 3 | 2 | M | 2 |
| 91 | Verify that the glass theme does not change the required contrast ratios — the backdrop behind CTAs affects the effective background | V8 | 4 | 2 | H | 2 |
| 92 | Test accent accessibility specifically in glass theme — blurred background reduces effective contrast | V8 | 4 | 2 | H | 2 |
| 93 | Verify the glass theme CTA button still uses `--color-accent` fill (not transparent) so on-accent is predictable | V8 | 4 | 1 | H | 1 |
| 94 | Add a Playwright check that loads each of the 7 vibes and reads computed `color` of `.btn-primary` | ALL | 5 | 4 | L | 5 |
| 95 | Add a Playwright check that verifies the computed `background-color` of `.btn-primary` with each vibe | ALL | 5 | 4 | L | 5 |
| 96 | Add a Playwright check that calculates contrast ratio of on-accent text vs accent background for each vibe | ALL | 5 | 4 | L | 5 |
| 97 | Add a Playwright check that verifies the fan capture submit button passes 4.5:1 with each default vibe | ALL | 5 | 4 | L | 5 |
| 98 | Add a Playwright check that loads admin, changes accent to #f4b942, and verifies the profile preview on-accent updates | ADM | 4 | 3 | L | 5 |
| 99 | Add unit test for `getLuminance()` and `getContrastRatio()` — 6 known values and expected outputs | V8 | 4 | 3 | L | 5 |
| 100 | Write a Playwright test that enters an invalid near-white accent in admin and confirms the clamped accent is used | ADM | 4 | 3 | L | 5 |

## Wave Summary

| Wave | Points | Theme |
|---|---|---|
| 1 | 1–17, 19–29, 31–44, 46, 51–53, 62–68, 72, 81–84, 88–89, 93 | Core on-accent derivation, all 7 vibe checks, luminance constraints, fan capture, admin, start.html, landing |
| 2 | 18, 22–23, 30, 32, 45, 47–50, 54–58, 65, 69–71, 85–87, 90–92 | FOAC, clamping UX, tint verification, contrast/glass theme, custom accents |
| 3 | 60–61, 73–75, 80 | UX copy, documentation, email, onboarding hint |
| 4 | 76–79 | Design system documentation, Supabase schema |
| 5 | 94–100 | Automated Playwright and unit tests |
