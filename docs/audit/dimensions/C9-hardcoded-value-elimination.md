# Dimension C9 — Hardcoded Value Elimination
**Category:** Colour, Contrast & Themes
**Phase:** 6 (Colour)
**Status:** Not started

Every colour in ABLE's CSS rules must reference a named design token via `var(--token-name)`. Hardcoded hex values, `rgb()`, and `rgba()` with literal hex components in CSS rules are banned — they break theme switching, make future rebrand work multiplicative in effort, and create silent contrast failures when the token system is updated but the hardcoded value is not. The known categories of violation are: (1) brand-partner colours (Spotify #1DB954, Instagram gradient) which are intentional but must still be wrapped in named tokens like `--brand-spotify`; (2) pre-token fallback backgrounds in able-v8.html using hardcoded #0d0e1a navy; (3) admin.html bottom sheet and modal overlays using hardcoded cream values; (4) rgba() calls with numeric channel values that should reference `--color-accent-rgb`. The audit target is zero hardcoded colour values in production CSS rules, verified by grep. Documented exceptions (brand colours, video standard black) must be in a named token with a code comment explaining the exception.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Run `grep -n '#[0-9a-fA-F]\{3,6\}' able-v8.html` to produce a full list of hardcoded hex values | V8 | 5 | 1 | L | 1 |
| 2 | Run `grep -n '#[0-9a-fA-F]\{3,6\}' admin.html` to produce a full list of hardcoded hex values | ADM | 5 | 1 | L | 1 |
| 3 | Run `grep -n '#[0-9a-fA-F]\{3,6\}' start.html` to produce a full list | STR | 5 | 1 | L | 1 |
| 4 | Run `grep -n '#[0-9a-fA-F]\{3,6\}' landing.html` to produce a full list | LND | 5 | 1 | L | 1 |
| 5 | Triage the grep output into: intentional brand exceptions, pre-token fallbacks, and true violations | ALL | 5 | 2 | L | 1 |
| 6 | Replace any hardcoded `#0d0e1a` in CSS rules with `var(--color-bg)` | V8 | 4 | 1 | M | 1 |
| 7 | Replace any hardcoded `#12152a` with `var(--color-card)` | V8 | 4 | 1 | M | 1 |
| 8 | Replace any hardcoded `#1a1f3d` with `var(--color-surface)` | V8 | 4 | 1 | M | 1 |
| 9 | Replace any hardcoded `#e05242` or `#e07b3a` with `var(--color-accent)` | V8 | 4 | 1 | M | 1 |
| 10 | Replace any hardcoded `rgba(224, 82, 66, 0.x)` with `rgba(var(--color-accent-rgb), 0.x)` | V8 | 4 | 1 | M | 1 |
| 11 | Replace any hardcoded `rgba(224, 123, 58, 0.x)` with `rgba(var(--color-accent-rgb), 0.x)` | V8 | 4 | 1 | M | 1 |
| 12 | Replace any hardcoded `#ffffff` in CSS rules with `var(--color-text)` or `var(--color-on-accent)` as appropriate | V8 | 4 | 2 | M | 1 |
| 13 | Replace any hardcoded `rgba(255, 255, 255, 0.x)` with `rgba(var(--color-text-rgb), 0.x)` and define `--color-text-rgb` | V8 | 4 | 2 | M | 1 |
| 14 | Replace any hardcoded `#1DB954` with a named token `--brand-spotify: #1DB954` defined in the token block | V8 | 3 | 1 | L | 1 |
| 15 | Replace any hardcoded Instagram gradient colours with `--brand-instagram-start` and `--brand-instagram-end` tokens | V8 | 3 | 1 | L | 1 |
| 16 | Replace any hardcoded `#000000` pure black in CSS rules with `var(--color-bg)` or a named `--black` token | V8 | 3 | 1 | M | 1 |
| 17 | Replace any hardcoded `#fbbf24` (pre-release amber) with `var(--color-state-pre)` | V8 | 3 | 1 | M | 1 |
| 18 | Replace any hardcoded `#ef4444` (live red) with `var(--color-state-live)` | V8 | 3 | 1 | M | 1 |
| 19 | Replace any hardcoded `#f46442` (gig orange) with `var(--color-state-gig)` | V8 | 3 | 1 | M | 1 |
| 20 | Replace any hardcoded `#06b6d4` (profile cyan) with `var(--color-state-prof)` | V8 | 3 | 1 | M | 1 |
| 21 | Replace any hardcoded `#e4dfd7` in admin CSS with `var(--dash-bg)` | ADM | 4 | 1 | M | 1 |
| 22 | Replace any hardcoded `#f8f5f0` in admin CSS with `var(--dash-card)` | ADM | 4 | 1 | M | 1 |
| 23 | Replace any hardcoded `#1a1a2e` in admin CSS with `var(--dash-shell)` or `var(--dash-text)` as appropriate | ADM | 4 | 1 | M | 1 |
| 24 | Replace any hardcoded `#f4b942` in admin CSS with `var(--dash-amber)` or `var(--acc)` | ADM | 4 | 1 | M | 1 |
| 25 | Replace any hardcoded `#c9a84c` in admin CSS with `var(--acc)` | ADM | 4 | 1 | M | 1 |
| 26 | Replace any hardcoded `#555555` in admin CSS with `var(--dash-t2)` | ADM | 3 | 1 | M | 1 |
| 27 | Replace any hardcoded `#595959` in admin CSS with `var(--dash-t3)` | ADM | 3 | 1 | M | 1 |
| 28 | Replace any hardcoded `#8c6200` with `var(--dash-link)` | ADM | 3 | 1 | M | 1 |
| 29 | Replace any hardcoded `#1e9650` with `var(--dash-green)` | ADM | 3 | 1 | M | 1 |
| 30 | Replace any hardcoded `#c04030` with `var(--dash-red)` | ADM | 3 | 1 | M | 1 |
| 31 | Replace any hardcoded `#cdc8c0` with `var(--dash-border)` | ADM | 3 | 1 | M | 1 |
| 32 | Replace hardcoded `#d4cfc8` in admin bottom sheet with `var(--dash-border)` or define `--dash-border-heavy` | ADM | 4 | 1 | M | 1 |
| 33 | Replace hardcoded `#e0dbd4` in admin CSS with the nearest token or define `--dash-divider` | ADM | 4 | 1 | M | 1 |
| 34 | Replace hardcoded `#f5f2ee` in admin CSS with `var(--dash-card)` or define `--dash-card-raised` | ADM | 4 | 1 | M | 1 |
| 35 | Replace hardcoded `#c4880a` in admin with `var(--dash-link)` or a darker amber token | ADM | 4 | 1 | M | 1 |
| 36 | Replace any hardcoded `rgba(26, 26, 46, 0.x)` in admin with `rgba(var(--dash-shell-rgb), 0.x)` and define the rgb token | ADM | 3 | 2 | M | 1 |
| 37 | Replace any hardcoded `rgba(244, 185, 66, 0.x)` in admin with `rgba(var(--acc-rgb), 0.x)` and define `--acc-rgb` | ADM | 4 | 2 | M | 1 |
| 38 | Replace any hardcoded overlay colours in admin modals (#000 or rgba black) with a named `--dash-overlay` token | ADM | 3 | 1 | M | 1 |
| 39 | Replace any hardcoded `#0f1117` or similar near-black in landing CSS with `var(--lnd-bg)` | LND | 3 | 1 | M | 1 |
| 40 | Replace any hardcoded `#c9a84c` in landing CSS with `var(--lnd-accent)` or `var(--acc)` | LND | 3 | 1 | M | 1 |
| 41 | Replace any hardcoded white `#fff` text colours in landing with `var(--lnd-text)` | LND | 3 | 1 | M | 1 |
| 42 | Replace any hardcoded grey values in landing footer with named tokens | LND | 2 | 1 | L | 1 |
| 43 | Replace any hardcoded hex values in start.html CSS with token references | STR | 3 | 1 | M | 1 |
| 44 | Define `--brand-spotify: #1DB954` in a brand-token block at the top of each file that uses it | ALL | 3 | 2 | L | 2 |
| 45 | Define `--brand-instagram-start: #f09433` and `--brand-instagram-end: #bc1888` in brand-token blocks | ALL | 3 | 2 | L | 2 |
| 46 | Define `--brand-tiktok: #010101` in brand-token blocks | ALL | 2 | 1 | L | 2 |
| 47 | Define `--brand-youtube: #FF0000` in brand-token blocks | ALL | 2 | 1 | L | 2 |
| 48 | Add a code comment next to each brand token explaining why the hardcoded value is intentional | ALL | 2 | 1 | L | 2 |
| 49 | Verify that `rgba()` calls referencing `--color-accent-rgb` all parse correctly after token definition | V8 | 4 | 1 | M | 1 |
| 50 | Verify no hardcoded hex values exist inside `@keyframes` rules that should be tokens | ALL | 3 | 2 | M | 2 |
| 51 | Check `@keyframes` transitions for hardcoded rgba() values in glow or pulse animations | V8 | 3 | 2 | M | 2 |
| 52 | Check the `.pre-release-glow` keyframe animation for hardcoded amber rgba values | V8 | 3 | 2 | M | 2 |
| 53 | Check the `.live-pulse` keyframe animation for hardcoded red rgba values | V8 | 3 | 2 | M | 2 |
| 54 | Check the `.gig-beat` keyframe animation for hardcoded orange rgba values | V8 | 3 | 2 | M | 2 |
| 55 | If CSS custom properties do not animate in `@keyframes` in the target browsers, define static rgba equivalents with comments | ALL | 3 | 3 | M | 3 |
| 56 | Verify `box-shadow` values in CSS rules do not contain hardcoded rgba values | ALL | 3 | 2 | M | 2 |
| 57 | Verify `text-shadow` values do not contain hardcoded rgba values | ALL | 2 | 1 | L | 2 |
| 58 | Verify `border` and `outline` property values do not contain hardcoded hex colours | ALL | 3 | 1 | M | 1 |
| 59 | Verify `background-image: linear-gradient()` calls use token references not hex values | ALL | 4 | 2 | M | 1 |
| 60 | Verify `background: conic-gradient()` if used — same rule applies | ALL | 2 | 1 | L | 2 |
| 61 | Check admin upgrade gradient for hardcoded hex values in the gradient stops | ADM | 3 | 1 | M | 1 |
| 62 | Check landing hero gradient for hardcoded hex values | LND | 3 | 1 | M | 1 |
| 63 | Check landing tier card gradient backgrounds for hardcoded values | LND | 3 | 1 | M | 1 |
| 64 | Check the artist profile hero gradient overlay for hardcoded navy values | V8 | 4 | 1 | M | 1 |
| 65 | Verify `color-mix()` calls reference token variables not hardcoded hex values | ALL | 3 | 1 | M | 1 |
| 66 | Verify `filter: drop-shadow()` calls do not use hardcoded colour values | ALL | 2 | 1 | L | 2 |
| 67 | Verify SVG `fill` and `stroke` attributes set inline in HTML use `currentColor` or CSS custom properties | ALL | 3 | 2 | M | 2 |
| 68 | Verify SVG icons embedded in CSS `content:` or `background-image: url()` do not hardcode colours | ALL | 3 | 2 | M | 2 |
| 69 | Define `--lnd-bg`, `--lnd-text`, `--lnd-accent` token block at the top of landing.html | LND | 4 | 2 | M | 2 |
| 70 | Define `--str-bg`, `--str-text` token block at the top of start.html if missing | STR | 3 | 2 | M | 2 |
| 71 | Define `--dash-overlay`, `--dash-card-raised`, `--dash-divider` tokens in admin.html if missing | ADM | 3 | 2 | M | 2 |
| 72 | Define `--acc-rgb` token in admin.html alongside `--acc` | ADM | 4 | 2 | M | 1 |
| 73 | Define `--dash-shell-rgb` token alongside `--dash-shell` in admin.html | ADM | 3 | 2 | M | 1 |
| 74 | Define `--color-text-rgb` token alongside `--color-text` in able-v8.html | V8 | 3 | 2 | M | 1 |
| 75 | After replacing hardcoded values, re-run the grep to verify zero violations in production CSS rules | ALL | 5 | 1 | L | 1 |
| 76 | Write a CI-style grep script that runs after every build and reports hardcoded hex values | ALL | 4 | 3 | L | 4 |
| 77 | Document the list of intentional brand colour exceptions in DESIGN_SYSTEM_SPEC.md | ALL | 3 | 2 | L | 4 |
| 78 | Add a comment block at the top of each file listing all documented hardcoded exceptions | ALL | 3 | 2 | L | 4 |
| 79 | Verify that JS `style.setProperty()` calls use token names not hardcoded hex strings | ALL | 4 | 1 | H | 1 |
| 80 | Check `applyDerivedTokens()` — it sets `--color-accent` from a hex string; confirm the input is validated | V8 | 4 | 1 | H | 1 |
| 81 | Check JS `document.documentElement.style.setProperty` calls for any hardcoded colour values | ALL | 4 | 1 | H | 1 |
| 82 | Verify JS event handlers that apply visual states (gig mode on/off) use token-mapped class changes not inline style hex values | ADM | 4 | 1 | H | 1 |
| 83 | Verify the theme switcher JS applies a `data-theme` attribute, not inline style tokens | ALL | 4 | 1 | H | 1 |
| 84 | Verify that `localStorage` theme persistence reads a theme name, not a hex value | ALL | 4 | 1 | M | 1 |
| 85 | Verify that campaign state switching JS applies state classes, not inline CSS colour values | V8 | 4 | 1 | H | 1 |
| 86 | Verify the Spotify import JS does not hardcode Spotify green in any injected HTML or style attributes | V8 | 3 | 1 | M | 1 |
| 87 | Verify the fan capture confirmation toast uses token-based colours not inline style | V8 | 3 | 1 | M | 1 |
| 88 | Verify admin nudge JS injection uses classes not inline style colour values | ADM | 3 | 1 | M | 1 |
| 89 | Check admin analytics rendering — if chart is drawn on canvas, confirm canvas fillStyle uses computed token values | ADM | 3 | 2 | M | 2 |
| 90 | Check start.html vibe preview JS — confirm it applies token class (data-vibe) not inline CSS colour values | STR | 3 | 1 | M | 1 |
| 91 | Verify the admin QR code SVG generation does not embed hardcoded colours | ADM | 2 | 2 | L | 2 |
| 92 | After all replacements are complete, run a final grep audit across all 4 files and document the verified-clean state | ALL | 5 | 1 | L | 4 |
| 93 | Add `pre-commit` hook documentation note — team should run the grep check before committing CSS changes | ALL | 3 | 2 | L | 4 |
| 94 | Verify that shared utilities in `shared/able.js` and `shared/style.css` if present also pass the no-hardcoded rule | ALL | 4 | 1 | M | 1 |
| 95 | Verify that any injected third-party embed CSS (Spotify, Bandcamp) does not inject hardcoded colours into ABLE's own CSS scope | V8 | 2 | 2 | L | 3 |
| 96 | Write Playwright test that greps the computed stylesheet on each page and reports any CSSStyleRule with a literal hex colour | ALL | 5 | 4 | L | 5 |
| 97 | Write Playwright test that changes theme from dark to light and verifies no element retains the dark hex colour (#0d0e1a) in computed style | ALL | 4 | 4 | L | 5 |
| 98 | Write Playwright test that verifies `document.documentElement.style.getPropertyValue('--color-bg')` matches the current theme spec | ALL | 4 | 3 | L | 5 |
| 99 | Write Playwright test that loads profile with a gold accent (#f4b942) and confirms `rgba` tints derive from `--color-accent-rgb` not a hardcoded string | V8 | 4 | 3 | L | 5 |
| 100 | Write a grep-based Playwright assertion that zero CSS rules in the `<style>` block of each file contain a literal `#` hex not inside a comment | ALL | 5 | 4 | L | 5 |

## Wave Summary

| Wave | Points | Theme |
|---|---|---|
| 1 | 1–43, 49, 58–65, 72–75, 79–90, 94 | Initial grep audit, all hex replacement by token, JS inline style checks, shared utilities |
| 2 | 44–48, 50–57, 60, 66–68 | Brand token definitions, keyframe animation exceptions, SVG colours |
| 3 | 55, 69–71, 95 | New token definitions for missing tokens, third-party scoping |
| 4 | 76–78, 92–93 | CI grep script, documentation, clean-state record |
| 5 | 96–100 | Automated Playwright token enforcement tests |
