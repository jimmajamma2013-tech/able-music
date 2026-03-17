# Dimension A6 — Vibe System Integrity
**Category:** Visual Design & Design System
**Phase:** 2 (Visual)
**Status:** Not started

All seven ABLE genre vibes — Electronic, Hip Hop, R&B, Indie, Pop, Rock, and Acoustic — must produce a fully coherent, visually intentional artist profile page. No vibe may leave a design token unset (falling through to a mismatched default), produce an unreadable text combination, fail to override the display font, leave the radius multiplier at the wrong scale for the genre, or show jarring motion timing that contradicts the vibe's energy level. The VIBES config in V8 drives `applyDerivedTokens()` and `loadVibeFont()`, setting `accent`, `rMult`, and the display font — but CSS vibe blocks must also define timing tokens, letter-spacing, and ambient tint. Full compliance means loading each of the seven `data-vibe` values, verifying 100% token coverage visually and programmatically, and confirming no single vibe produces a broken or incomplete appearance.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | For each of the seven vibes, confirm that the `VIBES` config object in V8 defines all three required keys: `font`, `googleFont` (or `null`), `accent`, and `rMult` — log any missing key as a P0 bug | V8 | 5 | 1 | L | 1 |
| 2 | Confirm that `applyDerivedTokens()` is called with the correct `rMult` for every vibe on page load and on profile change by adding a `console.assert` that is stripped before commit | V8 | 5 | 1 | L | 1 |
| 3 | Verify that `data-vibe="electronic"` renders `Barlow Condensed` (already in-page preload) without a font-load delay | V8 | 5 | 1 | L | 1 |
| 4 | Verify that `data-vibe="hiphop"` triggers a Google Fonts request for `Oswald:wght@700` and the font loads before first paint on a warm connection | V8 | 4 | 2 | M | 1 |
| 5 | Verify that `data-vibe="rnb"` triggers a Google Fonts request for `Cormorant+Garamond:ital,wght@1,600` and loads correctly | V8 | 4 | 2 | M | 1 |
| 6 | Verify that `data-vibe="indie"` triggers a Google Fonts request for `Space+Grotesk:wght@700` and loads correctly | V8 | 4 | 2 | M | 1 |
| 7 | Verify that `data-vibe="pop"` uses `Barlow Condensed` (already preloaded) with no additional network request | V8 | 4 | 1 | L | 1 |
| 8 | Verify that `data-vibe="rock"` uses `Oswald:wght@700` (shared with hiphop) and the `_loadedFonts` cache prevents a duplicate request | V8 | 4 | 1 | L | 1 |
| 9 | Verify that `data-vibe="acoustic"` triggers a Google Fonts request for `Lora:wght@700` and loads correctly | V8 | 4 | 2 | M | 1 |
| 10 | Confirm that each vibe's CSS `[data-vibe]` block in V8 defines `--dur`, `--dur-fast`, `--dur-slow`, and `--spring` overrides appropriate to that genre's energy | V8 | 4 | 2 | M | 1 |
| 11 | Add `--dur-fast`, `--dur`, and `--dur-slow` tokens to the `[data-vibe="electronic"]` block if not already set — electronic should use faster timing than indie | V8 | 4 | 1 | M | 1 |
| 12 | Add timing tokens to the `[data-vibe="acoustic"]` block ensuring slower, more organic easing than the default | V8 | 4 | 1 | M | 1 |
| 13 | Add timing tokens to the `[data-vibe="rock"]` block ensuring sharp, low-duration transitions consistent with the genre's energy | V8 | 3 | 1 | M | 1 |
| 14 | Add timing tokens to the `[data-vibe="rnb"]` block ensuring smooth, slightly slower transitions consistent with the genre's intimacy | V8 | 3 | 1 | M | 1 |
| 15 | Confirm that all seven vibe CSS blocks define `--font-d` family and `--letter-spacing-display` (the two visible tokens that change per vibe) | V8 | 5 | 2 | M | 1 |
| 16 | Confirm that the `[data-theme="light"]` overrides at V8 lines 175–177 cover all seven vibes with appropriate light-theme accent alternatives | V8 | 4 | 2 | M | 1 |
| 17 | Add a light-theme accent override for `data-vibe="hiphop"` if not present (default amber `#f4b942` may clash with the light cream background) | V8 | 3 | 1 | M | 1 |
| 18 | Add a light-theme accent override for `data-vibe="rock"` if not present (default red `#e05242` may render too aggressively on cream) | V8 | 3 | 1 | M | 1 |
| 19 | Add a light-theme accent override for `data-vibe="rnb"` if not present | V8 | 3 | 1 | M | 1 |
| 20 | Add a light-theme accent override for `data-vibe="pop"` if not present | V8 | 3 | 1 | M | 1 |
| 21 | Add a light-theme accent override for `data-vibe="acoustic"` if not present | V8 | 3 | 1 | M | 1 |
| 22 | Confirm the glass theme works correctly for each vibe — the `backdrop-filter: blur(28px) saturate(180%)` must be visible regardless of accent colour | V8 | 4 | 2 | M | 2 |
| 23 | Confirm the contrast theme works correctly for each vibe — pure black background, maximum contrast text, no accent surface fills that reduce legibility | V8 | 4 | 2 | M | 2 |
| 24 | Run a Playwright screenshot test loading each of the seven vibes at `data-theme="dark"` and visually diff against a baseline to confirm no regression | V8 | 5 | 3 | M | 2 |
| 25 | Run a Playwright screenshot test loading each vibe at `data-theme="light"` | V8 | 4 | 3 | M | 2 |
| 26 | Run a Playwright screenshot test loading each vibe at `data-theme="glass"` | V8 | 4 | 3 | M | 2 |
| 27 | Run a Playwright screenshot test loading each vibe at `data-theme="contrast"` | V8 | 4 | 3 | M | 2 |
| 28 | Confirm that `applyVibe()` is called with the correct vibe on every `renderProfile()` invocation, not just on initial load | V8 | 5 | 1 | L | 2 |
| 29 | Confirm that switching vibes programmatically (e.g. in the admin preview) updates all derived tokens without requiring a page reload | V8 | 4 | 2 | M | 2 |
| 30 | Confirm that `applyVibe()` gracefully falls back to `indie` when called with an unknown vibe string | V8 | 4 | 1 | L | 2 |
| 31 | Confirm that the hero artist name (`font-family: var(--font-d)`) visibly changes font when switching between vibes (Electronic Barlow vs Acoustic Lora vs R&B Cormorant) | V8 | 5 | 1 | L | 2 |
| 32 | Confirm that the `--letter-spacing-display` token visually distinguishes the tight-condensed electronic/rock vibes from the loose-spaced indie/pop vibes | V8 | 4 | 1 | L | 2 |
| 33 | Confirm that the CTA buttons reflect the correct `rMult`-derived `--r-sm` radius for each vibe (electronic rMult 0.6 = very sharp; pop rMult 1.4 = rounder) | V8 | 4 | 1 | M | 2 |
| 34 | Confirm that the card radius visually changes between the most extreme vibes (electronic rMult 0.6 vs pop rMult 1.4) — the difference must be perceptible | V8 | 4 | 1 | M | 2 |
| 35 | Confirm the ambient glow tint (`--color-ambient`) is recalculated correctly when switching vibe and accent, not left as a stale value | V8 | 3 | 1 | M | 2 |
| 36 | Add an assertion in the `applyVibe()` function that `rMult` is always a positive number, logging a warning if it is zero or undefined | V8 | 3 | 1 | L | 2 |
| 37 | Confirm that the hero campaign state badges adapt to each vibe's accent colour without becoming unreadable | V8 | 3 | 1 | M | 2 |
| 38 | Confirm that the vibe-specific `VIBE_CTA_DEFAULTS` labels (e.g. "Listen" for electronic, "Vibe with me" for R&B) are all defined and plausible for the genre | V8 | 4 | 1 | L | 2 |
| 39 | Add a `VIBE_CTA_DEFAULTS` entry for any vibe currently missing one, ensuring every vibe has both a `primary` and `secondary` label | V8 | 4 | 1 | L | 2 |
| 40 | Confirm that the acoustic vibe's `rMult: 1.3` produces visibly rounded cards compared to rock's `rMult: 0.6` in a side-by-side Playwright comparison | V8 | 3 | 2 | M | 3 |
| 41 | Confirm that Cormorant Garamond italic (R&B vibe) renders legibly at the hero name font-size on both iOS Safari and Android Chrome | V8 | 4 | 2 | M | 3 |
| 42 | Confirm that Lora (acoustic vibe) renders correctly at all hero heading sizes when loaded from Google Fonts | V8 | 3 | 2 | M | 3 |
| 43 | Confirm that Oswald (hip hop / rock vibe) renders at the correct weight (700) and does not fall back to the DM Sans system font on slow connections | V8 | 4 | 2 | M | 3 |
| 44 | Confirm that Space Grotesk (indie vibe) renders at weight 700 and produces a visually distinct appearance from DM Sans at the hero size | V8 | 3 | 2 | M | 3 |
| 45 | Add `font-display: swap` to each dynamically-loaded Google Fonts URL in `loadVibeFont()` to ensure the display font never blocks content rendering | V8 | 4 | 1 | L | 3 |
| 46 | Confirm the `_loadedFonts` Set correctly prevents double-loading when `applyVibe()` is called multiple times with the same vibe | V8 | 3 | 1 | L | 3 |
| 47 | Add error recovery in `loadVibeFont()` that sets `data-vibe-font-error="[vibe]"` on the shell element when a Google Fonts request fails, so CSS can apply a safe fallback | V8 | 3 | 2 | M | 3 |
| 48 | Confirm that the fallback font for `Cormorant Garamond` (R&B) is visually acceptable — `Georgia, serif` rather than `system-ui, sans-serif` | V8 | 3 | 1 | M | 3 |
| 49 | Confirm that the fallback font for `Lora` (acoustic) is `Georgia, serif` not the generic `sans-serif` | V8 | 3 | 1 | M | 3 |
| 50 | Confirm that the fallback font for `Space Grotesk` (indie) degrades to `DM Sans` (already loaded) rather than `system-ui` | V8 | 3 | 1 | L | 3 |
| 51 | Verify that the `pre-release` state amber overlay at `[data-campaign-state="pre-release"] .hero__ambient` does not clash with the electronic vibe's cyan accent | V8 | 3 | 1 | M | 3 |
| 52 | Verify that the `live` state warm-red overlay at `[data-campaign-state="live"] .hero__ambient` does not clash with the R&B vibe's pink accent | V8 | 3 | 1 | M | 3 |
| 53 | Verify that the `gig` state overlay does not clash with any of the seven vibe accents at any of the four theme settings | V8 | 3 | 2 | M | 3 |
| 54 | Confirm the identity refinement sliders (darkness, spacing, sharpness, contrast) work correctly on top of each vibe and do not override the vibe's `rMult`-derived radius unexpectedly | V8 | 3 | 2 | M | 3 |
| 55 | Confirm that `applyIdentity()` and `applyVibe()` do not conflict when both are called on the same render cycle — vibe should set base tokens, identity should layer deltas | V8 | 4 | 2 | M | 3 |
| 56 | Document the call order `applyVibe()` → `applyIdentity()` in a code comment at both function definitions | V8 | 2 | 1 | L | 3 |
| 57 | Confirm that all pill `bloom` animations in V8 respect the vibe's `--spring` easing token rather than hard-coding `cubic-bezier(0.34,1.56,0.64,1)` | V8 | 3 | 1 | M | 3 |
| 58 | Confirm that the hero card entrance animation respects the vibe's `--dur` token and produces faster entrances for electronic/rock and slower ones for acoustic | V8 | 3 | 1 | M | 3 |
| 59 | Add a written spec comment above each `[data-vibe]` CSS block describing the design intent (e.g. `/* Electronic: high energy, sharp edges, cyan, fast motion */`) | V8 | 2 | 1 | L | 3 |
| 60 | Confirm that the admin dashboard vibe preview (if present) correctly reflects the artist's current vibe setting without requiring a tab reload | ADM | 3 | 1 | M | 3 |
| 61 | Confirm that the start.html vibe selector step shows the correct accent colour preview for each of the seven vibes in its swatch tiles | STR | 4 | 1 | M | 3 |
| 62 | Confirm that selecting a vibe in start.html and completing onboarding correctly persists the vibe to `able_v3_profile.vibe` | STR | 5 | 1 | L | 3 |
| 63 | Confirm that V8 reads `profile.vibe` on render and calls `applyVibe()` with the persisted value rather than defaulting to `indie` every time | V8 | 5 | 1 | L | 3 |
| 64 | Confirm that the admin colour-picker change correctly calls `applyDerivedTokens()` with the new accent, not just storing the value for the next page load | ADM | 4 | 1 | M | 4 |
| 65 | Confirm that the admin vibe-change UI (if present) calls `applyVibe()` immediately to preview the new vibe in any live-preview iframe | ADM | 3 | 2 | M | 4 |
| 66 | Add a VIBES config sanity-check function `validateVibes()` that runs on page load in development builds and logs warnings for any missing keys | V8 | 3 | 2 | L | 4 |
| 67 | Confirm that the electronic vibe's tight radius (rMult 0.6) does not make the pill components look clipped or broken at 375 px viewport | V8 | 3 | 1 | L | 4 |
| 68 | Confirm that the pop vibe's wide radius (rMult 1.4) does not cause `--r-xl` to exceed the card height and create a visually broken circle shape | V8 | 3 | 1 | L | 4 |
| 69 | Add a clamp to `applyDerivedTokens()` so `--r-xl` never exceeds half the card height (e.g. `Math.min(Math.round(24 * rMult), 32)`) | V8 | 3 | 2 | M | 4 |
| 70 | Confirm the R&B vibe's serif italic display font does not cause layout overflow on small screens at the hero artist name size | V8 | 3 | 1 | L | 4 |
| 71 | Confirm the acoustic vibe's `Lora` font does not cause hero name text to be significantly narrower than other vibes, leaving awkward whitespace in the hero card | V8 | 3 | 1 | L | 4 |
| 72 | Test all seven vibes on an iPhone SE (375 px) at 2x pixel density and confirm no font rendering or layout breakage | V8 | 4 | 2 | M | 4 |
| 73 | Test all seven vibes on an iPhone 14 Pro (390 px) and confirm no layout regressions | V8 | 4 | 2 | M | 4 |
| 74 | Confirm that setting `data-vibe` in the HTML default to `indie` (as at V8 line 5298) is correctly overridden by `applyVibe()` on JS load, so no user ever sees the wrong vibe | V8 | 5 | 1 | L | 4 |
| 75 | Add a `noscript` fallback CSS block that applies the `indie` vibe tokens statically, ensuring the page is usable without JavaScript | V8 | 3 | 2 | M | 4 |
| 76 | Confirm the acoustic vibe's warm amber accent (`#d4a96a`) meets WCAG AA contrast against the default dark background `#0d0e1a` | V8 | 4 | 1 | L | 4 |
| 77 | Confirm the electronic vibe's cyan accent (`#06b6d4`) meets WCAG AA contrast against the default dark background | V8 | 4 | 1 | L | 4 |
| 78 | Confirm the pop vibe's purple accent (`#9b7cf4`) meets WCAG AA contrast against the default dark background | V8 | 4 | 1 | L | 4 |
| 79 | Confirm the indie vibe's green accent (`#7ec88a`) meets WCAG AA contrast against the default dark background | V8 | 4 | 1 | L | 4 |
| 80 | Confirm the R&B vibe's pink accent (`#e06b7a`) meets WCAG AA contrast against the default dark background | V8 | 4 | 1 | L | 4 |
| 81 | Confirm the rock vibe's red accent (`#e05242`) meets WCAG AA contrast against the default dark background | V8 | 4 | 1 | L | 4 |
| 82 | Confirm the hip hop vibe's amber accent (`#f4b942`) meets WCAG AA contrast against the default dark background | V8 | 4 | 1 | L | 4 |
| 83 | Add all seven default vibe accent colours to the WCAG contrast test suite in the audit dimension A6-related Playwright file | V8 | 3 | 2 | M | 4 |
| 84 | Verify that `--color-on-accent` is correctly set to `#0d0e1a` (dark) or `#ffffff` (light) for each vibe's default accent by `applyDerivedTokens()` using a luminance check | V8 | 5 | 2 | M | 4 |
| 85 | Add luminance-based `--color-on-accent` derivation inside `applyDerivedTokens()` if it is not already there (check relative luminance, not just a static override) | V8 | 5 | 2 | M | 4 |
| 86 | Confirm that the hip hop vibe's amber accent (`#f4b942`), which is light, triggers `--color-on-accent: #0d0e1a` in `applyDerivedTokens()` | V8 | 4 | 1 | L | 4 |
| 87 | Confirm that the acoustic vibe's warm amber (`#d4a96a`) triggers `--color-on-accent: #0d0e1a` in `applyDerivedTokens()` | V8 | 4 | 1 | L | 4 |
| 88 | Document the seven VIBES config entries in `docs/v6/core/VISUAL_SYSTEM.md` with a rationale for each accent and rMult choice | V8 | 3 | 1 | L | 5 |
| 89 | Document the vibe-to-font mapping in `docs/systems/brand-identity/DOCTRINE.md` with reasoning for each typeface selection | V8 | 3 | 1 | L | 5 |
| 90 | Document the vibe timing token overrides in `docs/systems/MICRO_INTERACTIONS_SPEC.md` under a "Vibe timing" section | V8 | 2 | 1 | L | 5 |
| 91 | Add a Playwright test that sets each vibe, reads `getComputedStyle(shell).getPropertyValue('--r-sm')` and asserts it equals `Math.round(4 * VIBES[vibe].rMult) + 'px'` | V8 | 4 | 3 | M | 5 |
| 92 | Add a Playwright test that sets each vibe and asserts `document.fonts.check('700 1em ' + VIBES[vibe].font)` returns `true` within 2 seconds | V8 | 4 | 3 | M | 5 |
| 93 | Add a Playwright test that sets each vibe and asserts `getComputedStyle(shell).getPropertyValue('--color-accent')` matches the VIBES config value | V8 | 4 | 2 | M | 5 |
| 94 | Add a Playwright test asserting that the hero artist name element computed `font-family` begins with the expected vibe font for each of the seven vibes | V8 | 4 | 3 | M | 5 |
| 95 | Confirm that `VIBES` is exported from `shared/able.js` (or duplicated with a comment) so admin.html can use the same config to drive its vibe-change preview | ALL | 3 | 2 | M | 5 |
| 96 | Confirm that start.html's vibe swatch previews derive accent colour from the same `VIBES` config object rather than hardcoding accent hex values | STR | 3 | 2 | M | 5 |
| 97 | Perform a full visual QA pass of all 7 vibes × 4 themes = 28 combinations at 375 px and record findings in `docs/STATUS.md` | V8 | 5 | 3 | M | 5 |
| 98 | Fix any of the 28 vibe × theme combinations that produce a broken or unpolished appearance discovered during the QA pass | V8 | 5 | 4 | H | 5 |
| 99 | Add the vibe system integrity test matrix (28 combinations) to the Playwright smoke test suite as a gated check | V8 | 4 | 3 | M | 6 |
| 100 | Update this dimension's status to "Complete" in `docs/audit/dimensions/A6-vibe-system-integrity.md` once all 28 combinations pass Playwright and WCAG checks | V8 | 2 | 1 | L | 6 |
