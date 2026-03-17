# Dimension B2 — Font Loading Efficiency
**Category:** Typography & Spacing
**Phase:** 5

Only font weights actually used in CSS should be loaded via Google Fonts. Each page currently makes independent font requests with inconsistent weight sets — V8 loads Barlow Condensed 700 only while landing loads 700/800/900, and admin loads Plus Jakarta Sans 400–700. The font display strategy, preconnect tags, and fallback stack quality are inconsistent across the four pages.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | V8 loads `DM Sans` weights 400/500/600/700 plus italic 400 — audit which weights are actually used in CSS | V8 | 4 | 1 | L | 1 |
| 2 | V8 DM Sans weight 300 is not loaded — confirm no rule uses `font-weight: 300` on V8 | V8 | 2 | 1 | L | 1 |
| 3 | V8 loads `Barlow Condensed` weight 700 only — confirm no CSS rule requests weight 800 or 900 on V8 | V8 | 3 | 1 | L | 1 |
| 4 | V8 `--font-d-weight` token — what value does it resolve to? Confirm it matches loaded weight | V8 | 3 | 1 | L | 1 |
| 5 | V8 DM Sans italic 400 loaded — audit if any italic DM Sans is actually rendered on V8 | V8 | 3 | 1 | L | 1 |
| 6 | V8 font link uses `display=swap` — confirm this is intentional and not `optional` (optional better for repeat visits) | V8 | 3 | 1 | L | 1 |
| 7 | V8 has both `<link rel="preconnect">` and `<link rel="preload" as="style">` — verify the preload fires before render-blocking | V8 | 3 | 1 | L | 1 |
| 8 | V8 has `crossorigin` on fonts.gstatic.com preconnect — required for cross-origin font files; confirm present | V8 | 3 | 1 | L | 1 |
| 9 | V8 noscript fallback font link present — confirm it matches the preload href exactly | V8 | 2 | 1 | L | 1 |
| 10 | V8 system font fallback stack: `system-ui, sans-serif` — confirm this is an acceptable FOUT fallback for DM Sans | V8 | 2 | 1 | L | 1 |
| 11 | Landing loads `DM Sans` weights 400/500/600/700 and italic 400 — audit which weights are actually used on landing | LND | 4 | 1 | L | 1 |
| 12 | Landing loads `Barlow Condensed` weights 700/800/900 — audit which are actually used: hero headline uses 900, proof stat uses 700, section title uses 900 | LND | 4 | 1 | L | 1 |
| 13 | Landing loads Barlow Condensed 800 — confirm any CSS rule uses `font-weight: 800` on landing | LND | 3 | 1 | L | 1 |
| 14 | Landing has `--font-editorial` aliased to `'Barlow Condensed'` — no Fraunces is actually loaded despite comment in CSS saying "Fraunces italic" | LND | 5 | 1 | L | 1 |
| 15 | Landing CSS comment at line 266: "Editorial contrast: the key word goes Fraunces italic in terracotta" — Fraunces is not in the font link; this is dead/aspirational code; clarify or remove comment | LND | 3 | 1 | L | 1 |
| 16 | Landing font request includes both DM Sans and Barlow Condensed in a single URL — confirm this is the most efficient single-request approach vs two separate preloads | LND | 2 | 1 | L | 2 |
| 17 | Landing uses `display=swap` — same question as V8: should landing use `optional` for repeat visits once fonts are cached? | LND | 2 | 1 | L | 2 |
| 18 | Landing has `<link rel="preconnect">` for fonts.googleapis.com but no separate preconnect for fonts.gstatic.com — add fonts.gstatic.com preconnect with crossorigin | LND | 4 | 2 | L | 2 |
| 19 | Landing noscript fallback present — verify href matches preload href exactly | LND | 2 | 1 | L | 1 |
| 20 | Admin loads `Plus Jakarta Sans` weights 400/500/600/700 via Google Fonts — audit which weights are actually used | ADM | 4 | 1 | L | 1 |
| 21 | Admin loads `Barlow Condensed` weights 500/600/700 — V8 only needs 700; confirm admin actually uses 500 and 600 | ADM | 3 | 1 | L | 1 |
| 22 | Admin Barlow Condensed 500 — find every `font-weight: 500` rule using `var(--font-d)` in admin | ADM | 3 | 1 | L | 1 |
| 23 | Admin Barlow Condensed 600 — find every `font-weight: 600` rule using `var(--font-d)` in admin | ADM | 3 | 1 | L | 1 |
| 24 | Admin `.stat-value` uses Barlow Condensed `font-weight: 700` — confirm 700 is in the admin font link | ADM | 3 | 1 | L | 1 |
| 25 | Admin Plus Jakarta Sans weight 400 — confirm at least one rule uses 400 weight (not just 500+) | ADM | 2 | 1 | L | 2 |
| 26 | Admin uses `font-display: swap` on its font link — verify | ADM | 3 | 1 | L | 1 |
| 27 | Admin has `<link rel="preconnect">` for fonts.googleapis.com — confirm also has fonts.gstatic.com preconnect | ADM | 3 | 1 | L | 1 |
| 28 | Admin noscript fallback font link present — confirm exact href match | ADM | 2 | 1 | L | 1 |
| 29 | Admin system font fallback: `'Plus Jakarta Sans', sans-serif` — add more specific fallback before `sans-serif` | ADM | 2 | 1 | L | 3 |
| 30 | start.html loads `DM Sans` with optical size axis `9..40` weights 300–700 — this is a larger request than V8's equivalent | STR | 3 | 1 | L | 1 |
| 31 | start.html loads DM Sans weight 300 — audit if any rule in start.html uses `font-weight: 300` | STR | 3 | 1 | L | 1 |
| 32 | start.html loads `Barlow Condensed` weights 600/700/800 — confirm weight 600 is actually used in start.html CSS | STR | 3 | 1 | L | 1 |
| 33 | start.html Barlow Condensed 800 — the wizard step hero uses weight 800; confirm this is the only use | STR | 2 | 1 | L | 1 |
| 34 | start.html uses `display=swap` — consistent with other pages | STR | 2 | 1 | L | 1 |
| 35 | start.html has `<link rel="preconnect">` for fonts.googleapis.com — confirm fonts.gstatic.com preconnect is also present | STR | 3 | 1 | L | 1 |
| 36 | start.html noscript fallback — confirm present and correct | STR | 2 | 1 | L | 1 |
| 37 | All four pages make separate Google Fonts requests — consider whether a shared font stylesheet would reduce DNS lookups (Netlify edge headers approach) | ALL | 3 | 3 | M | 4 |
| 38 | V8 loads Plus Jakarta Sans from a hardcoded string in JS for the `admin-preview` component — this weight set may differ from admin's loaded weights | V8 | 3 | 2 | M | 3 |
| 39 | V8 dynamically loads vibe fonts at runtime (Hip Hop, R&B, etc.) — confirm these are loaded with `display=swap` | V8 | 4 | 1 | L | 2 |
| 40 | V8 dynamic vibe font loading: `_loadedFonts` Set prevents double-loading — confirm Barlow Condensed and DM Sans are pre-populated in this set | V8 | 3 | 1 | L | 1 |
| 41 | V8 vibe fonts loaded with `display=swap` appended to URL — confirm this is in the `link.href` construction | V8 | 3 | 1 | L | 2 |
| 42 | V8 vibe font `googleFont: null` for Electronic and Pop vibes — these use Barlow Condensed which is pre-loaded; confirm no redundant second request | V8 | 2 | 1 | L | 2 |
| 43 | Define which vibes require additional fonts beyond the base Barlow/DM Sans pair — document in DESIGN_SYSTEM_SPEC.md | V8 | 2 | 1 | L | 3 |
| 44 | Measure the total font bytes loaded on first visit to each page — document the number and set a budget (<50KB font bytes target) | ALL | 3 | 2 | L | 4 |
| 45 | V8 renders hero artist name in Barlow Condensed — if the font hasn't loaded, what does it fall back to? Test FOUT on throttled connection | V8 | 3 | 2 | M | 3 |
| 46 | Landing hero headline FOUT fallback — `'Barlow Condensed', 'DM Sans', sans-serif` means DM Sans on FOUT; confirm this is acceptable | LND | 3 | 1 | L | 3 |
| 47 | Admin FOUT fallback for Barlow Condensed stat values — falls back to `sans-serif`; confirm acceptable | ADM | 2 | 1 | L | 3 |
| 48 | Consider `font-display: optional` for non-critical decorative fonts to avoid FOUT entirely on fast displays | ALL | 2 | 2 | M | 4 |
| 49 | V8 `<link rel="preload" as="style">` pattern (load-then-apply) — confirm this is the correct approach for all four pages and not render-blocking | ALL | 3 | 1 | L | 1 |
| 50 | DM Sans italic weight loaded on V8 and landing — audit every italic text node rendered; confirm italic DM Sans is actually needed | V8 | 2 | 1 | L | 2 |
| 51 | landing.html `.quote__text` uses `font-style: italic` and `font-family: var(--font-editorial)` — since `--font-editorial` resolves to Barlow Condensed (not Fraunces), no italic variant is loaded for Barlow; this will render as synthesised italic | LND | 4 | 1 | L | 1 |
| 52 | landing.html `.section__title em` uses Barlow Condensed in `font-style: italic` — same synthesised italic issue | LND | 4 | 1 | L | 1 |
| 53 | Barlow Condensed italic variants are available on Google Fonts — decide whether to load them or remove the italic styling | LND | 4 | 2 | M | 2 |
| 54 | DM Sans Variable (opsz axis) loaded on V8 with `9..40` — this is the variable font range; confirm the browser actually uses variable font features or if static weights would be smaller | V8 | 3 | 2 | M | 3 |
| 55 | start.html uses the optical size axis format for DM Sans loading — V8 also uses it; confirm admin and landing use consistent format | ALL | 2 | 1 | L | 2 |
| 56 | Admin loads static weights (not optical size axis) for Plus Jakarta Sans — this means two different DM Sans formats across the product | ADM | 2 | 1 | L | 3 |
| 57 | Audit if `font-weight: 600` DM Sans is used on V8 — it's loaded but may not be used | V8 | 2 | 1 | L | 2 |
| 58 | Audit if `font-weight: 500` DM Sans is used on V8 — confirm used | V8 | 2 | 1 | L | 2 |
| 59 | Audit if `font-weight: 700` DM Sans is used on V8 — confirm used (CTA button text) | V8 | 2 | 1 | L | 2 |
| 60 | Audit if `font-weight: 400` DM Sans is used on V8 — confirm used (body copy) | V8 | 2 | 1 | L | 2 |
| 61 | Admin `font-weight: 800` appears in two places — confirm Plus Jakarta Sans 800 is loaded or available | ADM | 4 | 1 | L | 1 |
| 62 | Admin Plus Jakarta Sans 800 not in the font link (only 400–700 loaded) — either add 800 to request or change to 700 | ADM | 5 | 1 | L | 1 |
| 63 | All pages should have `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` — verify landing and start.html have this | LND | 4 | 1 | L | 1 |
| 64 | start.html missing crossorigin attribute on fonts.gstatic.com preconnect — add it | STR | 4 | 1 | L | 1 |
| 65 | The `onload="this.onload=null;this.rel='stylesheet'"` pattern used on all pages — confirm this is the correct async font loading pattern (it is) and document why | ALL | 2 | 1 | L | 1 |
| 66 | V8 font request URL uses `opsz` axis — confirm this doesn't break on Safari iOS 14 which has limited variable font support | V8 | 3 | 2 | M | 3 |
| 67 | Consider whether a local font fallback (`@font-face` with woff2 self-hosted) would be faster for the two primary fonts | ALL | 2 | 3 | M | 5 |
| 68 | Landing `.hero__platforms-label` at `letter-spacing: 0.5px` — confirm DM Sans 600 is loaded for this element | LND | 2 | 1 | L | 2 |
| 69 | Landing proof strip uses `.proof__stat` at `font-family: var(--font-editorial)` weight 700 — confirm Barlow Condensed 700 loaded | LND | 2 | 1 | L | 1 |
| 70 | Admin `.chq-title` uses `font-family: var(--font)` which is Plus Jakarta Sans — confirm weight 700 loaded | ADM | 2 | 1 | L | 1 |
| 71 | V8 toast uses hardcoded `'DM Sans', sans-serif` in JS — not a font loading issue but a token usage issue that could drift | V8 | 2 | 1 | L | 3 |
| 72 | Check total number of font variants loaded across all pages combined — if all pages open in same session, browser fetches each page's unique font weights | ALL | 2 | 2 | L | 4 |
| 73 | V8 `--font-body` token — confirm it resolves to `'DM Sans', system-ui, sans-serif` (check `:root` declaration) | V8 | 2 | 1 | L | 1 |
| 74 | Admin `--font` token — confirm it resolves to `'Plus Jakarta Sans', sans-serif` | ADM | 2 | 1 | L | 1 |
| 75 | landing.html `--font` resolves to `'DM Sans', system-ui, sans-serif` — same as V8; confirm landing and V8 font tokens are identical | LND | 2 | 1 | L | 1 |
| 76 | start.html `--font` resolves to `'DM Sans', sans-serif` — slightly different fallback from V8 (`system-ui` missing); align | STR | 2 | 1 | L | 2 |
| 77 | landing.html `--font-d` resolves to `'Barlow Condensed', 'DM Sans', sans-serif` — same as V8; confirm consistent | LND | 2 | 1 | L | 1 |
| 78 | start.html `--font-d` resolves to `'Barlow Condensed', sans-serif` — missing DM Sans in fallback chain; align with V8 | STR | 3 | 1 | L | 2 |
| 79 | After removing any unused font weights, verify no visual regressions by screenshot comparison | ALL | 4 | 2 | M | 3 |
| 80 | Document font loading architecture decisions in DESIGN_SYSTEM_SPEC.md — why swap vs optional, why preload pattern | ALL | 2 | 1 | L | 4 |
| 81 | Consider adding `size-adjust` CSS descriptor if switching to a system font fallback to reduce CLS on font swap | ALL | 2 | 3 | H | 5 |
| 82 | V8 has `<link rel="preload" href="supabase.js" as="script">` before the font preload — confirm script preload doesn't delay font loading | V8 | 3 | 1 | L | 2 |
| 83 | V8 has `<link rel="preload" href="unsplash image">` — hero image preload should not block font rendering | V8 | 2 | 1 | L | 2 |
| 84 | Admin has no image preload — confirm this is intentional (no LCP image) | ADM | 2 | 1 | L | 2 |
| 85 | start.html has no image preload — confirm intentional | STR | 2 | 1 | L | 2 |
| 86 | Audit `font-weight: bold` keyword usage across all pages — should be explicit numeric values for consistency | ALL | 2 | 1 | L | 2 |
| 87 | V8 loads DM Sans with the `ital` axis — measure byte size difference vs a non-italic variant; italic may not justify the extra bytes | V8 | 2 | 2 | L | 4 |
| 88 | Admin `font-weight: 900` — confirm this is not used in admin CSS (only 400–700 loaded) | ADM | 4 | 1 | L | 1 |
| 89 | V8 `font-weight: 900` — only Barlow Condensed 700 loaded on V8; confirm no rule requests 900 | V8 | 4 | 1 | L | 1 |
| 90 | Verify Google Fonts `subset=latin` is appended for all dynamic vibe font loads in V8 to reduce file size | V8 | 3 | 1 | L | 2 |
| 91 | Landing `<link rel="preload" as="style">` pattern — confirm preload fires before first paint, not deferred | LND | 3 | 1 | L | 1 |
| 92 | Admin `<link rel="preload" as="style">` — same verification | ADM | 3 | 1 | L | 1 |
| 93 | Consider whether the non-critical admin section fonts (Barlow Condensed for stat values) could load after critical path | ADM | 2 | 2 | M | 4 |
| 94 | V8 system font fallback `system-ui` renders as San Francisco on iOS — test how different this looks from DM Sans during FOUT | V8 | 2 | 2 | L | 3 |
| 95 | landing.html `system-ui` fallback — same FOUT quality check | LND | 2 | 2 | L | 3 |
| 96 | start.html missing `system-ui` in fallback — the wizard shows for ~1s in the wrong font if DM Sans is slow; add | STR | 3 | 1 | L | 2 |
| 97 | After any font loading changes, run a Lighthouse performance audit and document the FCP score | ALL | 3 | 2 | L | 4 |
| 98 | Document in CONTEXT.md the exact font weights loaded per page to prevent future drift | ALL | 2 | 1 | L | 3 |
| 99 | Confirm all four pages use `https` for Google Fonts URLs (not `http`) — modern browsers should upgrade but verify | ALL | 2 | 1 | L | 1 |
| 100 | Add font loading to QA smoke tests — check that the correct font renders at the hero heading after page load | ALL | 3 | 2 | L | 5 |

## Wave Summary
- **Wave 1** — 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 21, 22, 23, 24, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 40, 49, 51, 52, 61, 62, 63, 65, 69, 70, 73, 74, 75, 77, 88, 89, 91, 92, 99
- **Wave 2** — 16, 17, 18, 25, 29, 39, 41, 42, 50, 53, 55, 57, 58, 59, 60, 64, 68, 76, 78, 82, 83, 84, 85, 86, 90, 96
- **Wave 3** — 38, 43, 45, 46, 47, 54, 56, 66, 71, 79, 94, 95
- **Wave 4** — 37, 44, 48, 72, 80, 87, 93, 97
- **Wave 5** — 67, 81, 100
- **Wave 6** — (none)
