# Dimension A1 — Token Completeness
**Category:** Visual Design & Design System
**Phase:** 2 (Visual)
**Status:** In progress via Wave system

*Every CSS value across all four pages must trace back to a named design token. No hardcoded hex, rem, opacity, or numeric value may appear outside a token declaration. This dimension covers the full surface area of un-tokenised values across able-v8.html, admin.html, start.html, and landing.html — the foundation on which all other visual consistency depends.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Replace hardcoded `#0a0b10` (--color-bg value) with the token wherever used outside `:root` declaration | V8 | 4 | 1 | L | 1 |
| 2 | Replace hardcoded `#0f1624` used as `theme-color` meta and in `rgba(15,22,36,0.92)` navbar on landing with `--bg` token | LND | 3 | 1 | L | 1 |
| 3 | Replace hardcoded `#0f1624` used as `theme-color` meta on start.html with `--bg` token reference | STR | 3 | 1 | L | 1 |
| 4 | Replace hardcoded `#09090f` admin body background with `--bg` token in any inline fallback or JS-set value | ADM | 3 | 1 | L | 1 |
| 5 | Declare `--color-state-pre: #fbbf24` as a token on V8 `:root` — currently declared but not consistently referenced in JS-generated HTML (fan capture section hardcodes the colour) | V8 | 3 | 1 | L | 1 |
| 6 | Replace `color:#121a24` hardcoded on `.tb-btn-acc` in admin with a `--dash-on-acc` semantic token | ADM | 3 | 1 | L | 1 |
| 7 | Replace `color:#121a24` hardcoded on `.btn-next` and `.done-open` in start.html with `--on-acc` token | STR | 3 | 1 | L | 1 |
| 8 | Add `--color-on-acc` token to admin `:root` mapping to `#121a24` and replace all 6+ hardcoded instances | ADM | 3 | 2 | L | 1 |
| 9 | Replace `#1DB954` (Spotify green) hardcoded in landing demo phone with a `--color-spotify` token | LND | 2 | 1 | L | 2 |
| 10 | Replace `#FF0000` (YouTube red) hardcoded in landing demo phone with a `--color-youtube` token | LND | 2 | 1 | L | 2 |
| 11 | Replace `#c86858` hardcoded in landing dark demo phone CTA with a `--dp-accent` token scoped to the demo phone component | LND | 2 | 1 | L | 2 |
| 12 | Replace `rgba(200,104,88,0.32)` button shadow on landing with the token-derived `--color-accent-glow` pattern | LND | 2 | 1 | L | 2 |
| 13 | Replace `#7ec88a` (green status colour) hardcoded in admin `.ci-btn-connected` with a `--dash-green` token reference | ADM | 3 | 1 | L | 1 |
| 14 | Replace `rgba(120,200,138,.1)` and `rgba(120,200,138,.25)` hardcoded on `.ci-btn-connected` with token derivations from `--dash-green` | ADM | 3 | 1 | L | 1 |
| 15 | Replace `rgba(52,199,89,.15)` and `#34c759` on `.rel-status-current` with `--dash-green` token | ADM | 3 | 1 | L | 1 |
| 16 | Replace `rgba(244,185,66,.15)` and `#f4b942` on `.rel-status-upcoming` with `--dash-amber` token | ADM | 3 | 1 | L | 1 |
| 17 | Replace `rgba(224,82,66,.5)` and `#e05242` on `.snap-btn.del:hover` with a `--dash-red` token reference | ADM | 3 | 1 | L | 1 |
| 18 | Replace `rgba(244,100,66,.4)` and `rgba(244,100,66,.06)` on `.mode-card.gig-mode` with a `--dash-gig` named token | ADM | 3 | 1 | L | 1 |
| 19 | Replace `#f46442` on `.mode-card.gig-mode.on` border-color with `--dash-gig` token | ADM | 2 | 1 | L | 2 |
| 20 | Declare `--dash-gig: #f46442` in admin `:root` to cover all gig-mode colour references | ADM | 3 | 1 | L | 1 |
| 21 | Replace `rgba(251,191,36,.12)` in `.chq-state-pill.pre` with token-derived value from existing `--color-state-pre` or new `--dash-pre` | ADM | 2 | 1 | L | 2 |
| 22 | Replace `rgba(239,68,68,.12)` in `.chq-state-pill.live` with token from `--dash-red` | ADM | 2 | 1 | L | 2 |
| 23 | Replace `#5c4e00`, `#6b4a00`, `#a01010`, `#8c3200` hardcoded text colours on campaign pills with semantic tokens | ADM | 2 | 2 | L | 3 |
| 24 | Replace `rgba(138,180,206,0.10)` border token on landing/start — currently re-declared as literal rather than referencing `--border` token | LND | 3 | 1 | L | 1 |
| 25 | Ensure `--border` token on start.html is the same declaration pattern as on landing.html (both use `rgba(138,180,206,0.10)` but via different token names `--border` vs implicit) | STR | 2 | 1 | L | 2 |
| 26 | Replace `opacity: 0.18` on noise SVG background image in able-v8.html with a `--noise-opacity` token | V8 | 1 | 1 | L | 5 |
| 27 | Replace `1.5px` border-width on `.field-input` in admin with a `--border-width` token (`--bw: 1.5px`) | ADM | 2 | 1 | L | 3 |
| 28 | Replace `1px` border-width on `.mode-card` in admin (different from `.field-input`) — both should use same `--bw` token | ADM | 2 | 1 | L | 3 |
| 29 | Add `--shadow-lift` token to admin `:root` covering the `0 2px 8px rgba(0,0,0,.08)` value on `.dash-card` | ADM | 3 | 1 | L | 2 |
| 30 | Add `--shadow-lift` token to V8 `:root` covering the `0 12px 40px rgba(0,0,0,0.6)` hover lift value | V8 | 3 | 1 | L | 2 |
| 31 | Replace `0 1px 4px rgba(0,0,0,.06)` on `.dash-card` overflow container with `--shadow-flat` token | ADM | 2 | 1 | L | 3 |
| 32 | Replace hardcoded `0.7` opacity in `--shadow-card` value (dark theme) with a `--shadow-dark-opacity` reference | V8 | 1 | 1 | L | 5 |
| 33 | Add `--overlay-bg` token to V8 replacing inline `rgba(10,11,16,0.82)` used in `.hero-overlay` and similar elements | V8 | 3 | 1 | L | 2 |
| 34 | Replace `rgba(15,22,36,0.92)` navbar background on landing with `--overlay-bg` token | LND | 3 | 1 | L | 2 |
| 35 | Replace `rgba(15,22,36,0.92)` navbar background on start.html with `--overlay-bg` token | STR | 3 | 1 | L | 2 |
| 36 | Add `--z-nav: 100` token to start.html replacing the hardcoded `z-index: 100` on `.nav` | STR | 3 | 1 | L | 2 |
| 37 | Add `--z-overlay: 9000` token to V8 replacing the hardcoded `z-index: 9000` on the full-screen overlay | V8 | 3 | 1 | L | 2 |
| 38 | Add `--z-toast: 9999` token replacing all four `z-index: 9999` instances on `.able-toast`, skip-links, and tooltips in V8 | V8 | 3 | 2 | L | 2 |
| 39 | Add `--z-sheet: 2000` token replacing `z-index: 2000` / `2001` on bottom sheet and its overlay in V8 | V8 | 3 | 1 | L | 2 |
| 40 | Add `--z-nav: 50` token to admin replacing `z-index: 50` on `.top-bar` sticky element | ADM | 3 | 1 | L | 2 |
| 41 | Add `--z-sidebar: 100` token to admin replacing `z-index: 100` on `.sidebar` fixed element | ADM | 3 | 1 | L | 2 |
| 42 | Replace `9000` hardcoded z-index on admin loading curtain with `--z-curtain` token | ADM | 3 | 1 | L | 2 |
| 43 | Declare `--dur-instant: 80ms` consistently — V8 has it but admin uses `.14s` as shorthand; unify to a single token name and value | ALL | 3 | 2 | M | 2 |
| 44 | Replace raw `0.15s` transition on `.nav__link:hover` in landing with `--dur-fast` token | LND | 3 | 1 | L | 1 |
| 45 | Replace raw `0.2s` transition on `.ph-p` (phone preview pill) in start/landing with `--dur-mid` or `--dur` token | LND | 2 | 1 | L | 2 |
| 46 | Replace raw `0.3s` transition on `.ph-scrim` in start.html with `--dur-slow` token | STR | 2 | 1 | L | 2 |
| 47 | Replace raw `200ms` transition duration on `.switcher-cta` in landing with `--dur-mid` token | LND | 2 | 1 | L | 2 |
| 48 | Audit all `transition:` declarations in admin for raw `ms/s` values not using `--dur-fast`, `--dur`, `--dur-slow` tokens — at least 8 instances found | ADM | 3 | 2 | L | 2 |
| 49 | Add `--ease-spring` token to V8 `:root` for `cubic-bezier(0.34,1.56,0.64,1)` — currently only referenced in comments | V8 | 3 | 1 | L | 2 |
| 50 | Add `--ease-decel` token to V8 `:root` for `cubic-bezier(0.25,0.46,0.45,0.94)` | V8 | 3 | 1 | L | 2 |
| 51 | Replace `var(--ease,ease)` fallback pattern in admin (used on `.tb-btn-ghost`, `.sb-view-btn`) with actual easing token | ADM | 3 | 2 | L | 2 |
| 52 | Declare `--text-xs` through `--text-5xl` scale tokens and replace any raw `font-size: Xpx` values in admin not already using the scale | ADM | 3 | 2 | L | 3 |
| 53 | Declare `--text-xs` through `--text-5xl` scale tokens in V8 `:root` and verify all `font-size` uses reference them | V8 | 3 | 2 | L | 3 |
| 54 | Replace `letter-spacing: .12em` on `.stat-label` in admin with a `--ls-label` token (`0.12em`) | ADM | 2 | 1 | L | 3 |
| 55 | Replace `letter-spacing: .16em` on `.field-label` in admin with `--ls-label-wide` token (`0.16em`) — two different values in same file for same semantic purpose | ADM | 3 | 1 | L | 3 |
| 56 | Replace `letter-spacing: .2em` on `.sb-section` in admin sidebar with `--ls-eyebrow` token | ADM | 2 | 1 | L | 3 |
| 57 | Replace `letter-spacing: 0.10em` on admin-style label in landing with `--ls-label` token | LND | 2 | 1 | L | 3 |
| 58 | Add `--lh-tight: 1.1`, `--lh-read: 1.55`, `--lh-loose: 1.7` tokens to all pages and replace inline line-height values | ALL | 2 | 3 | L | 4 |
| 59 | Replace `line-height: 1.45` on `.ai-suggestion-item` in admin with `--lh-read` token | ADM | 1 | 1 | L | 4 |
| 60 | Replace `line-height: 1.4` on `.field-hint` in admin with `--lh-read` token | ADM | 1 | 1 | L | 4 |
| 61 | Add `--radius-card` semantic alias token pointing to `--r-lg` for card elements — removes ambiguity about which `--r-*` token cards use | ALL | 3 | 1 | L | 3 |
| 62 | Replace `border-radius: 12px` hardcoded on `.sb-artist` in admin sidebar with `--r-lg` token | ADM | 2 | 1 | L | 3 |
| 63 | Replace `border-radius: 10px` hardcoded on `.sb-item`, `.sb-view-btn` in admin with `--r-md` token | ADM | 2 | 1 | L | 3 |
| 64 | Replace `border-radius: 14px` on admin `.dash-card` with `--r-xl` or `--r-card` token (currently different from the `--r-lg: 12px` token value) | ADM | 3 | 1 | M | 3 |
| 65 | Replace `border-radius: 8px` (admin nav link area) with `--r-md` token (value matches but not tokenised) | ADM | 2 | 1 | L | 3 |
| 66 | Replace `border-radius: 5px` on `.ai-suggestion-label > span` in admin with `--r-sm` token | ADM | 1 | 1 | L | 4 |
| 67 | Replace hardcoded `36px` stat value font-size on `.stat-value` in admin with a display text scale token | ADM | 2 | 1 | L | 3 |
| 68 | Replace hardcoded `32px` stat value font-size on `.stat-value` in admin (different rule, same class) — reconcile the duplicate | ADM | 3 | 1 | L | 3 |
| 69 | Add `--sp-7: 28px` and `--sp-9: 36px` tokens to admin to close gaps in the spacing scale | ADM | 2 | 1 | L | 3 |
| 70 | Replace `padding: 18px 20px` on admin `.dash-card` with `--sp-5` / `--sp-5` token references | ADM | 2 | 1 | L | 3 |
| 71 | Replace `padding: 28px` in landing `.main` content wrapper with `--sp-8` token | LND | 2 | 1 | L | 3 |
| 72 | Replace `gap: 12px` hardcoded in `.sb-footer` admin with `--sp-3` token | ADM | 1 | 1 | L | 4 |
| 73 | Replace hardcoded `opacity: 0.5` on disabled states with `--opacity-disabled` token (`0.4`) | ALL | 3 | 2 | L | 3 |
| 74 | Replace `opacity: 0.5` used for `--font-d-style` italic fallback references with a named opacity token | V8 | 1 | 1 | L | 5 |
| 75 | Add `--color-text` / `--color-text-2` / `--color-text-3` to admin's `:root` to match V8's naming — admin uses `--dash-text`, `--dash-t2`, `--dash-t3` which are surface-2-scoped | ADM | 3 | 2 | M | 3 |
| 76 | Replace `rgba(255,255,255,.04)` background on `.hint-steps` in start.html with a `--color-surface` token reference | STR | 2 | 1 | L | 3 |
| 77 | Replace `rgba(255,255,255,.08)` border on `.hint-steps` in start.html with `--color-border` token | STR | 2 | 1 | L | 3 |
| 78 | Replace `rgba(10,16,38,.58)` background on `.how-to` in start.html with `--color-surface` token | STR | 2 | 1 | L | 3 |
| 79 | Replace `rgba(255,255,255,.06)` on `.confetti-backdrop` in start.html with `--color-surface` token | STR | 2 | 1 | L | 3 |
| 80 | Replace `rgba(255,255,255,0.06)` on the vibe-preview container in start.html with `--color-surface` | STR | 2 | 1 | L | 3 |
| 81 | Add `--color-success: #34c759` token to V8 `:root` replacing hardcoded `#34c759` used on fan sign-up success state | V8 | 3 | 1 | L | 2 |
| 82 | Add `--color-warning: #f4b942` token to V8 `:root` replacing hardcoded value on countdown elements | V8 | 3 | 1 | L | 2 |
| 83 | Add `--color-error: #e05050` or `#ef4444` token to start.html `:root` replacing `--err: #e05050` (non-standard name) | STR | 3 | 1 | L | 2 |
| 84 | Verify `--color-state-live: #ef4444` in V8 matches the hardcoded `#ef4444` values used in campaign-state JS — create single source of truth | V8 | 3 | 1 | L | 2 |
| 85 | Replace `rgba(220,80,60,.6)` error border on `.field-error` in start.html with token-derived value from `--err` | STR | 3 | 1 | L | 2 |
| 86 | Replace `rgba(220,80,60,.12)` error glow on `.field-error` in start.html with token-derived value from `--err` | STR | 2 | 1 | L | 2 |
| 87 | Add `--color-ambient` token to V8 (already declared as `0,0,0` rgb triplet) — verify it is actually used in ambient gradient derivation, not just declared | V8 | 3 | 1 | M | 2 |
| 88 | Replace hardcoded `#121212` on landing dark demo phone footer area with `--bg-deep` or `--color-bg` token | LND | 2 | 1 | L | 3 |
| 89 | Replace `#000` hardcoded on landing demo phone Dynamic Island notch area with `--color-bg` token | LND | 1 | 1 | L | 5 |
| 90 | Replace `#1a1a2e` hardcoded text colour on `.tb-btn-acc` in admin with a semantic `--on-acc` token scoped to admin | ADM | 3 | 1 | L | 1 |
| 91 | Replace `#1a1a2e` hardcoded on `.chq-state-pill.profile` text with semantic token | ADM | 2 | 1 | L | 3 |
| 92 | Replace hardcoded `width:120px; height:120px` on `.sb-qr-canvas` with `--qr-size` dimension token | ADM | 1 | 1 | L | 5 |
| 93 | Replace hardcoded `width:36px; height:36px` avatar in admin sidebar with `--avatar-sm` dimension token | ADM | 2 | 1 | L | 4 |
| 94 | Replace hardcoded `width:48px; height:48px` on `.empty-state__icon` in admin with `--icon-lg` dimension token | ADM | 2 | 1 | L | 4 |
| 95 | Add `--max-w-content: 680px` token to V8 replacing any hardcoded max-width on bio and long-form content | V8 | 2 | 1 | L | 4 |
| 96 | Replace `min-height: 44px` hardcoded on interactive elements in start.html with `--tap-target: 44px` token | STR | 4 | 1 | L | 1 |
| 97 | Grep confirm zero instances of raw `#e05242` (legacy default accent) remaining outside token declarations — replace any found | ALL | 3 | 1 | L | 1 |
| 98 | Verify `--color-accent-soft` and `--color-accent-subtle` in V8 `:root` are not both `rgba(accent,0.12)` — they are identical, which is redundant; consolidate to one token | V8 | 2 | 1 | L | 3 |
| 99 | Add `--font-size-stat: 32px` token to admin and replace `.stat-value` font-size reference | ADM | 2 | 1 | L | 4 |
| 100 | Final grep audit: run `grep -n '#[0-9a-fA-F]\{3,6\}' *.html` and confirm zero results outside `:root` token declaration blocks and `<meta>` tags | ALL | 5 | 2 | L | 6 |

## Wave Summary
**Wave 1 — Foundation** (do first, unblocks others): items #1, #2, #3, #4, #5, #6, #7, #8, #13, #14, #15, #16, #17, #18, #20, #24, #43, #44, #81, #82, #83, #84, #85, #86, #90, #96, #97
**Wave 2 — Named tokens for structural values**: items #9, #10, #11, #12, #19, #21, #22, #29, #30, #33, #34, #35, #36, #37, #38, #39, #40, #41, #42, #45, #46, #47, #48, #49, #50, #51, #75, #87
**Wave 3 — Typography and spacing tokens**: items #23, #25, #52, #53, #54, #55, #56, #57, #61, #62, #63, #64, #65, #67, #68, #69, #70, #71, #72, #73, #76, #77, #78, #79, #80, #98
**Wave 4 — Fine-grained polish tokens**: items #26, #27, #28, #31, #32, #58, #59, #60, #66, #74, #88, #89, #91, #92, #93, #94, #95, #99
**Wave 5 — Edge case and derived values**: items #19, #32, #66, #74, #89, #92
**Wave 6 — Final verification**: item #100 — full grep audit confirming zero hardcoded values outside `:root`
