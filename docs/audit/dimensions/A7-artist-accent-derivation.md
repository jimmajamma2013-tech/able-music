# Dimension A7 — Artist Accent Derivation
**Category:** Visual Design & Design System
**Phase:** 2 (Visual)
**Status:** Not started

`applyDerivedTokens(root, accentHex, rMult)` is the single function responsible for transforming an artist's chosen hex colour into the full set of derived tokens: `--color-accent`, `--color-accent-rgb`, `--color-accent-glow`, `--color-accent-soft`, `--color-accent-subtle`, `--r-sm/md/lg/xl`, and `--color-on-accent`. It must work correctly for every legal hex value an artist can set, including light accents (which require dark on-accent text), pure saturated primaries, and near-black or near-white values. Currently `--color-on-accent` appears to be set to `#ffffff` statically in the `:root` CSS default and overridden only in the light-theme block — not derived dynamically from luminance. The ambient tint (`--color-ambient`) is not set by `applyDerivedTokens()` and remains at `0,0,0` unless artwork triggers it. Full compliance means the derivation is luminance-correct, all tokens are set atomically in one call, the function is tested against all seven vibe default accents plus edge cases, and no page has a surface that ignores `--color-accent` in favour of a hardcoded hex.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add relative luminance calculation to `applyDerivedTokens()` so `--color-on-accent` is derived as `#0d0e1a` when accent luminance > 0.18 and `#ffffff` when luminance is at or below 0.18 | V8 | 5 | 2 | M | 1 |
| 2 | Test the luminance derivation against the hip hop amber `#f4b942` (light — should produce dark on-accent text) | V8 | 5 | 1 | L | 1 |
| 3 | Test the luminance derivation against the acoustic warm amber `#d4a96a` (borderline — confirm correct branch) | V8 | 5 | 1 | L | 1 |
| 4 | Test the luminance derivation against the pop purple `#9b7cf4` (medium — confirm correct branch) | V8 | 4 | 1 | L | 1 |
| 5 | Test the luminance derivation against the electronic cyan `#06b6d4` (medium — confirm correct branch) | V8 | 4 | 1 | L | 1 |
| 6 | Test the luminance derivation against the rock red `#e05242` (medium-dark — confirm correct branch) | V8 | 4 | 1 | L | 1 |
| 7 | Test the luminance derivation against the indie green `#7ec88a` (medium-light — confirm correct branch) | V8 | 4 | 1 | L | 1 |
| 8 | Test the luminance derivation against a near-white accent `#f0f0f0` (should produce dark on-accent text) | V8 | 4 | 1 | L | 1 |
| 9 | Test the luminance derivation against a near-black accent `#111111` (should produce white on-accent text) | V8 | 4 | 1 | L | 1 |
| 10 | Test the luminance derivation against a pure saturated red `#ff0000` and confirm the branch is correct | V8 | 3 | 1 | L | 1 |
| 11 | Confirm `hexToRgb()` handles both 3-character shorthand `#rgb` and 6-character `#rrggbb` formats without error | V8 | 4 | 1 | L | 1 |
| 12 | Add handling in `hexToRgb()` for hex values passed without a leading `#` to prevent silent `NaN` breakage | V8 | 4 | 1 | L | 1 |
| 13 | Add a fallback in `applyDerivedTokens()` that uses the vibe default accent when `accentHex` is `undefined`, `null`, or an empty string | V8 | 5 | 1 | L | 1 |
| 14 | Confirm `applyDerivedTokens()` sets `--color-accent-rgb` as a comma-separated string without the `rgb()` wrapper so it can be used in `rgba(var(--color-accent-rgb), 0.1)` expressions | V8 | 5 | 1 | L | 1 |
| 15 | Audit all CSS rules using `rgba(var(--color-accent-rgb), ...)` in V8 and confirm they all resolve correctly when `--color-accent-rgb` is set by `applyDerivedTokens()` | V8 | 4 | 2 | M | 1 |
| 16 | Confirm `--color-accent-glow` (`rgba(r,g,b,0.35)`) is used in V8 for glows and halos and not duplicated with a hardcoded `rgba` value | V8 | 3 | 1 | L | 1 |
| 17 | Confirm `--color-accent-soft` and `--color-accent-subtle` (both `rgba(r,g,b,0.12)`) serve distinct purposes or consolidate them into one token | V8 | 3 | 1 | M | 1 |
| 18 | Confirm the `document.documentElement.style.setProperty('--color-accent-rgb', ...)` cascade in `applyDerivedTokens()` is necessary and not a duplicate of the `root.style.setProperty` call | V8 | 2 | 1 | L | 1 |
| 19 | Confirm that setting `--color-accent-rgb` on `document.documentElement` ensures scroll-position CSS at the `html` level picks up the correct value | V8 | 3 | 1 | L | 1 |
| 20 | Add `--color-accent-dim` (`rgba(r,g,b,0.06)`) as a new derived token for extremely subtle hover-state background washes | V8 | 3 | 2 | M | 2 |
| 21 | Add `--color-accent-border` (`rgba(r,g,b,0.25)`) as a derived token for accent-tinted borders, replacing hardcoded `rgba(var(--color-accent-rgb),0.25)` values in V8 | V8 | 3 | 2 | M | 2 |
| 22 | Add `--color-accent-focus` (`rgba(r,g,b,0.35)`) as a derived token for focus ring shadows, replacing the hardcoded value at V8 line 716 | V8 | 3 | 1 | M | 2 |
| 23 | Confirm the radius token formula in `applyDerivedTokens()` uses `Math.round()` on each computed value to prevent sub-pixel anti-aliasing inconsistencies | V8 | 3 | 1 | L | 2 |
| 24 | Add a comment in code making explicit that `--r-pill` is intentionally excluded from rMult scaling in `applyDerivedTokens()` | V8 | 2 | 1 | L | 2 |
| 25 | Confirm that after `applyDerivedTokens()` runs, `getComputedStyle(shell).getPropertyValue('--r-sm')` returns `Math.round(4 * rMult) + 'px'` | V8 | 4 | 1 | L | 2 |
| 26 | Confirm that after `applyDerivedTokens()` runs, `--r-md` equals `Math.round(8 * rMult)px` | V8 | 4 | 1 | L | 2 |
| 27 | Confirm that after `applyDerivedTokens()` runs, `--r-lg` equals `Math.round(16 * rMult)px` | V8 | 4 | 1 | L | 2 |
| 28 | Confirm that after `applyDerivedTokens()` runs, `--r-xl` equals `Math.round(24 * rMult)px` | V8 | 4 | 1 | L | 2 |
| 29 | Add a maximum clamp to `--r-xl` derivation (`Math.min(Math.round(24 * rMult), 32)`) to prevent pop vibe (rMult 1.4 = 33.6 px) from creating visually broken card corners | V8 | 3 | 1 | L | 2 |
| 30 | Add a minimum clamp to `--r-sm` derivation (`Math.max(Math.round(4 * rMult), 2)`) to prevent very sharp vibes from reaching 0 px | V8 | 2 | 1 | L | 2 |
| 31 | Confirm the `[data-theme="light"]` CSS block overrides `--color-on-accent` with the correct luminance-appropriate dark value for all seven vibe default accents | V8 | 4 | 2 | M | 2 |
| 32 | Confirm that when `applyDerivedTokens()` is called with the light theme active, the `--color-on-accent` it sets does not conflict with the CSS `[data-theme="light"]` rule | V8 | 4 | 1 | M | 2 |
| 33 | Move `--color-on-accent` derivation entirely to JS in `applyDerivedTokens()` and remove the conflicting CSS light-theme override to establish a single source of truth | V8 | 4 | 2 | M | 2 |
| 34 | Add a `--color-on-accent-muted` token derived as `rgba(on-accent-r, on-accent-g, on-accent-b, 0.7)` for secondary text on accent surfaces | V8 | 3 | 2 | M | 2 |
| 35 | Audit all V8 surfaces that hardcode `color: #ffffff` or `color: #0d0e1a` inside accent-fill contexts and replace with `color: var(--color-on-accent)` | V8 | 5 | 2 | M | 2 |
| 36 | Confirm `.btn-primary` uses `background: var(--color-accent)` and `color: var(--color-on-accent)` | V8 | 5 | 1 | L | 2 |
| 37 | Confirm the gold lock overlay CTA uses `--acc` (amber) not `--color-accent`, since it is a platform action not an artist action | V8 | 3 | 1 | L | 2 |
| 38 | Confirm all `.pill` active/selected states use `background: var(--color-accent)` and `color: var(--color-on-accent)` | V8 | 4 | 1 | L | 2 |
| 39 | Confirm the hero ambient gradient at V8 line 787 updates immediately when `applyDerivedTokens()` changes `--color-accent-rgb` | V8 | 3 | 1 | L | 3 |
| 40 | Replace the hardcoded opacity in the hero section-divider gradient with `--color-accent-glow` token | V8 | 2 | 1 | L | 3 |
| 41 | Confirm focus rings use `--color-accent-focus` token instead of inline `rgba(var(--color-accent-rgb), 0.12)` at V8 line 719 | V8 | 3 | 1 | L | 3 |
| 42 | Confirm the hero CTA hover glow at V8 line 669 uses `--color-accent-focus` | V8 | 3 | 1 | L | 3 |
| 43 | Remove the hardcoded fallback `224,82,66` from the `rgba()` at V8 line 669 — `applyDerivedTokens()` should have run by this point | V8 | 3 | 1 | L | 3 |
| 44 | Remove the hardcoded fallback `224,82,66` from the `rgba()` at V8 line 1200 | V8 | 3 | 1 | L | 3 |
| 45 | Confirm the fan-join email input focus ring uses `--color-accent-focus` | V8 | 3 | 1 | L | 3 |
| 46 | Confirm the snap card focus ring uses `--color-accent-focus` | V8 | 3 | 1 | L | 3 |
| 47 | Confirm the pill focus ring uses `--color-accent-focus` | V8 | 3 | 1 | L | 3 |
| 48 | Confirm the support-pack focus ring uses `--color-accent-focus` | V8 | 3 | 1 | L | 3 |
| 49 | Confirm the rec-item focus ring uses `--color-accent-focus` | V8 | 3 | 1 | L | 3 |
| 50 | Add `--color-accent` and `--color-accent-rgb` to admin.html's scope so an artist-accent live-preview in admin applies correctly | ADM | 4 | 2 | M | 3 |
| 51 | Confirm admin.html's live-preview panel calls `applyDerivedTokens()` with the current artist accent when the colour picker changes | ADM | 4 | 2 | M | 3 |
| 52 | Confirm start.html's preview card uses `applyDerivedTokens()` to show the selected accent in real time during the wizard | STR | 4 | 1 | M | 3 |
| 53 | Confirm start.html's accent derivation uses the same `applyDerivedTokens()` from `shared/able.js`, not a local reimplementation | STR | 4 | 1 | L | 3 |
| 54 | Confirm `applyDerivedTokens()` is called synchronously so no flash of unstyled accent occurs between page load and JS execution | V8 | 4 | 1 | L | 3 |
| 55 | Add `will-change: color, background-color` to `.btn-primary` and `.pill` to hint the GPU when the accent changes | V8 | 2 | 1 | L | 3 |
| 56 | Update the CSS comment at V8 line 64 (`--color-accent: artist-set (default #e05242)`) to reflect the actual default indie accent `#7ec88a` | V8 | 2 | 1 | L | 3 |
| 57 | Confirm the `:root` CSS default `--color-accent-rgb: 224,123,58` at V8 line 124 matches the actual default vibe accent or is overridden before paint | V8 | 4 | 1 | L | 3 |
| 58 | Update the `:root` CSS default `--color-accent-rgb` to the indie green RGB `126,200,138` so there is no flash of the wrong accent between CSS load and JS execution | V8 | 4 | 1 | L | 3 |
| 59 | Update the `:root` CSS default `--color-accent` hex value to `#7ec88a` (indie default) for the same reason | V8 | 4 | 1 | L | 3 |
| 60 | Add a `prefers-color-scheme: light` media query block setting the correct light-mode accent defaults before `applyDerivedTokens()` runs | V8 | 3 | 2 | M | 3 |
| 61 | Add a Playwright test that loads V8 with each of the seven vibes and asserts `--color-on-accent` matches the expected luminance-derived value | V8 | 5 | 3 | M | 4 |
| 62 | Add a Playwright test that loads V8 with the hip hop vibe and confirms `.btn-primary` text is dark (`#0d0e1a`) | V8 | 4 | 2 | M | 4 |
| 63 | Add a Playwright test that loads V8 with the acoustic vibe and confirms `.btn-primary` text is dark | V8 | 4 | 2 | M | 4 |
| 64 | Add a Playwright test setting a near-white custom accent and confirming `--color-on-accent` is dark | V8 | 4 | 2 | M | 4 |
| 65 | Add a Playwright test setting a near-black custom accent and confirming `--color-on-accent` is white | V8 | 4 | 2 | M | 4 |
| 66 | Add a Playwright test setting an invalid accent `#gg0000` and confirming the fallback accent is applied without a JS error | V8 | 3 | 2 | M | 4 |
| 67 | Add a Playwright test loading V8 with no accent in localStorage and confirming the vibe default accent is applied | V8 | 3 | 2 | M | 4 |
| 68 | Add a Playwright test checking `getComputedStyle(shell).getPropertyValue('--r-sm')` is non-zero after `applyDerivedTokens()` runs | V8 | 3 | 2 | M | 4 |
| 69 | Add a Playwright test that changes the accent via the admin colour picker and confirms reloading V8 shows the new accent immediately | ALL | 4 | 3 | M | 4 |
| 70 | Confirm `applyDerivedTokens()` does not accidentally override `--acc` (admin amber) when called within an admin context | ADM | 4 | 1 | L | 4 |
| 71 | Confirm `applyDerivedTokens()` only operates on the `root` element passed to it and does not reach into admin-namespaced tokens | ADM | 4 | 1 | L | 4 |
| 72 | Add a `try/catch` around the `hexToRgb` call in `applyDerivedTokens()` with graceful fallback to the vibe default | V8 | 4 | 1 | L | 4 |
| 73 | Confirm calling `applyDerivedTokens()` multiple times with the same value is idempotent (no visible flicker or redundant repaints) | V8 | 3 | 1 | L | 4 |
| 74 | Confirm calling `applyDerivedTokens()` with a new value within the same animation frame does not cause a FOUC between old and new accent | V8 | 3 | 1 | L | 4 |
| 75 | Batch the `root.style.setProperty()` calls in `applyDerivedTokens()` by writing all values before any forced reflow, ensuring a single-frame repaint | V8 | 3 | 2 | M | 4 |
| 76 | Confirm the ambient glow tint from artwork (canvas sampling) correctly overrides `--color-ambient` independently of `--color-accent-rgb` with no cross-contamination | V8 | 3 | 1 | L | 4 |
| 77 | Add a `--color-ambient` derivation step to `applyDerivedTokens()` that sets a sensible ambient default based on accent RGB when no artwork tint is available | V8 | 3 | 2 | M | 4 |
| 78 | Confirm `--color-accent-soft` (opacity 0.12) is sufficiently distinct from a new `--color-accent-dim` (opacity 0.06) before adding the new token | V8 | 2 | 1 | L | 4 |
| 79 | Add JSDoc to `applyDerivedTokens(root, accentHex, rMult)` listing every CSS custom property it sets and the formula used | V8 | 3 | 1 | L | 5 |
| 80 | Add JSDoc to `hexToRgb(hex)` specifying accepted input formats, return type, and edge case handling | V8 | 2 | 1 | L | 5 |
| 81 | Export `applyDerivedTokens()` and `hexToRgb()` from `shared/able.js` so start.html and admin.html import the same canonical implementation | ALL | 4 | 2 | M | 5 |
| 82 | Replace start.html's local accent preview logic with the shared `applyDerivedTokens()` from `shared/able.js` | STR | 4 | 2 | M | 5 |
| 83 | Replace admin.html's colour picker preview logic with the shared `applyDerivedTokens()` from `shared/able.js` | ADM | 4 | 2 | M | 5 |
| 84 | Confirm the shared `applyDerivedTokens()` in `shared/able.js` does not have side-effects that break admin's amber accent system | ADM | 4 | 1 | M | 5 |
| 85 | Document `applyDerivedTokens()` in `docs/systems/data-architecture/SPEC.md` as a core runtime function | ALL | 2 | 1 | L | 5 |
| 86 | Document the luminance threshold used for `--color-on-accent` derivation (0.18 relative luminance) in a code comment | V8 | 2 | 1 | L | 5 |
| 87 | Confirm the admin colour picker enforces a minimum WCAG AA contrast check on the chosen accent and shows a warning when the artist picks an inaccessible colour | ADM | 4 | 3 | M | 5 |
| 88 | Add the contrast warning copy to `docs/systems/copy/SPEC.md` under "Admin — colour picker accessibility nudge" | ADM | 2 | 1 | L | 5 |
| 89 | Confirm the accent system works when `able_v3_profile` is corrupt or absent — `applyDerivedTokens()` must degrade to the vibe default | V8 | 4 | 1 | L | 5 |
| 90 | Add a unit test (Node parse check + assertion) for the luminance calculation in `applyDerivedTokens()` | V8 | 3 | 2 | M | 5 |
| 91 | Add a unit test for `hexToRgb()` covering 3-char shorthand, 6-char, missing `#`, and invalid input | V8 | 3 | 2 | M | 5 |
| 92 | Confirm artist-set accents in `able_v3_profile.accent` are always stored as full 6-character lowercase hex strings, normalising on write | V8 | 3 | 1 | L | 5 |
| 93 | Add normalisation in the admin colour picker save handler to always lowercase and zero-pad hex values before persisting | ADM | 3 | 1 | L | 5 |
| 94 | Confirm the Supabase `profiles` table `accent` column will enforce a 7-character hex format constraint when backend launches | ALL | 3 | 2 | M | 5 |
| 95 | Confirm `applyDerivedTokens()` is invoked once on page load via a single `init()` call and is not called redundantly before first render | V8 | 3 | 1 | L | 5 |
| 96 | Add performance tracing to confirm `applyDerivedTokens()` completes in under 1 ms on an entry-level mobile device | V8 | 3 | 2 | M | 6 |
| 97 | Confirm the full derived token set is applied before the first `requestAnimationFrame` fires so no frame renders with stale tokens | V8 | 4 | 1 | L | 6 |
| 98 | Document the final token list output of `applyDerivedTokens()` in `docs/systems/DESIGN_SYSTEM_SPEC.md` under "Accent Derivation Tokens" | ALL | 3 | 1 | L | 6 |
| 99 | After all improvements are shipped, run a Playwright accessibility audit on each of the seven vibes to confirm WCAG AA compliance for all accent-coloured interactive elements | V8 | 4 | 2 | M | 6 |
| 100 | Update this dimension's status to "Complete" once all Playwright and unit tests pass for all seven vibes | ALL | 2 | 1 | L | 6 |
