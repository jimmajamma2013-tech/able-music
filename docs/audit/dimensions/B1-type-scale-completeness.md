# Dimension B1 — Type Scale Completeness
**Category:** Typography & Spacing
**Phase:** 5

A defined scale (`--text-xs` through `--text-5xl`) must cover every font-size value used across all four pages. No arbitrary pixel values should exist outside a token declaration. The admin page has no formal type scale matching the profile/landing token set, and several hardcoded sizes exist at 8px, 8.5px, 9px, 9.5px, and 10px that either sit below accessible thresholds or lack token equivalents.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | `--text-xs` token resolves to 11px on V8 — confirm this is the floor value across the whole scale and document it | V8 | 3 | 1 | L | 1 |
| 2 | `--text-sm` at 13px — add to scale definition comment confirming intentional gap from 11px to 13px | V8 | 2 | 1 | L | 1 |
| 3 | `--text-base` at 15px — verify body copy consistently uses this token, not raw 15px | V8 | 3 | 1 | L | 1 |
| 4 | `--text-lg` at 17px — audit every instance of raw `17px` font-size on V8 and replace with token | V8 | 2 | 1 | L | 1 |
| 5 | `--text-xl` at 20px — audit every instance of raw `20px` on V8 and replace | V8 | 2 | 1 | L | 1 |
| 6 | `--text-2xl` at 24px — audit raw `24px` on V8 and replace with token | V8 | 2 | 1 | L | 1 |
| 7 | `--text-3xl` at 32px — currently used for stat values and countdown numbers; confirm token usage | V8 | 3 | 1 | L | 1 |
| 8 | `--text-4xl` at 40px — only defined, check if it is actually referenced anywhere on V8 | V8 | 2 | 1 | L | 1 |
| 9 | `--text-hero` clamp(48px, 14vw, 80px) — this is a V8-specific token; add `--text-5xl` alias for cross-page consistency | V8 | 3 | 1 | L | 1 |
| 10 | Add `--text-5xl` token (maps to `--text-hero`) so all four pages share a common top-of-scale name | ALL | 3 | 1 | L | 1 |
| 11 | Admin has no `--text-xs` through `--text-5xl` token set — font-sizes are all raw px values; add the scale | ADM | 5 | 2 | M | 2 |
| 12 | Admin `.stat-value` uses raw `32px` — replace with `--text-3xl` or equivalent admin scale token | ADM | 4 | 1 | L | 2 |
| 13 | Admin `.page-title` uses raw `22px` — no token covers this; add `--text-xxl: 22px` to admin scale | ADM | 3 | 1 | L | 2 |
| 14 | Admin `.topbar-title` uses raw `16px` — map to a scale token | ADM | 2 | 1 | L | 2 |
| 15 | Admin `.chq-title` uses raw `13px` — map to `--text-sm` equivalent | ADM | 2 | 1 | L | 2 |
| 16 | Admin `.dc-title` uses raw `13px` — same as above, needs token | ADM | 2 | 1 | L | 2 |
| 17 | Admin `.stat-label` uses raw `10px` — below V8's `--text-xs: 11px` floor; raise to 11px and tokenise | ADM | 4 | 1 | L | 2 |
| 18 | Admin `.stat-delta` uses raw `11px` — map to `--text-xs` equivalent | ADM | 2 | 1 | L | 2 |
| 19 | Admin `.snap-eyebrow` uses raw `9.5px` — this is below the accessible floor; raise to 10px minimum and tokenise | ADM | 5 | 1 | L | 2 |
| 20 | Admin `.sb-section` uses raw `9.5px` — same issue; raise and tokenise | ADM | 4 | 1 | L | 2 |
| 21 | Admin `.sb-artist-url` uses raw `10px` — at the threshold; needs token | ADM | 2 | 1 | L | 2 |
| 22 | Admin `.sb-qr-download` uses raw `10px` — tokenise | ADM | 2 | 1 | L | 2 |
| 23 | Admin `.field-label` uses raw `10px` — tokenise | ADM | 3 | 1 | L | 2 |
| 24 | Admin `.field-hint` uses raw `11px` — map to `--text-xs` | ADM | 2 | 1 | L | 2 |
| 25 | Admin `.empty-state-body` uses raw `12px` — add `--text-mini: 12px` to admin scale | ADM | 2 | 1 | L | 2 |
| 26 | Admin `.mc-hint` uses raw `10px` — tokenise | ADM | 2 | 1 | L | 2 |
| 27 | Admin has several instances of raw `8px` font-size (sidebar demo preview) — below any reasonable threshold; audit and remove or raise | ADM | 4 | 2 | M | 2 |
| 28 | Admin `.recs-type-badge` uses raw `8px` — this is the single smallest value in the codebase; raise to 10px minimum | ADM | 4 | 1 | L | 2 |
| 29 | Admin `font-size: 8.5px` in campaign state UI — too small for any real text; raise to 10px | ADM | 4 | 1 | L | 2 |
| 30 | Landing has no `--text-*` scale tokens — all font-sizes are raw px or clamp() values | LND | 5 | 2 | M | 2 |
| 31 | Landing hero headline `clamp(52px, 6vw, 84px)` — document as `--text-display-hero` token | LND | 3 | 1 | L | 2 |
| 32 | Landing `.section__title` `clamp(34px, 4.5vw, 58px)` — document as `--text-display-section` token | LND | 3 | 1 | L | 2 |
| 33 | Landing `.section__sub` at `16px` — map to a defined token | LND | 2 | 1 | L | 2 |
| 34 | Landing `.hero__sub` at `clamp(17px, 1.8vw, 20px)` — document as named token | LND | 2 | 1 | L | 2 |
| 35 | Landing `.proof__stat` at `44px` — add `--text-proof: 44px` token | LND | 2 | 1 | L | 2 |
| 36 | Landing `.hero-feature__title` at `20px` — map to `--text-xl` equivalent | LND | 2 | 1 | L | 2 |
| 37 | Landing `.hero-feature__desc` at `14px` — raw value with no token; add `--text-body-sm: 14px` | LND | 2 | 1 | L | 3 |
| 38 | Landing `.feature-card__desc` at `12.5px` — fractional value; round to 13px and tokenise | LND | 3 | 1 | L | 3 |
| 39 | Landing `.step__desc` at `13px` — map to scale token | LND | 2 | 1 | L | 3 |
| 40 | Landing `.pricing-card__desc` at `13px` — same; map to token | LND | 2 | 1 | L | 3 |
| 41 | Landing footer copy size `12px` — tokenise | LND | 2 | 1 | L | 3 |
| 42 | Landing `.nav__link` at `13px` — tokenise | LND | 2 | 1 | L | 3 |
| 43 | Landing `9px` and `10px` values in demo mockup elements inside landing — these are decorative previews, confirm they don't need real accessibility | LND | 2 | 1 | L | 3 |
| 44 | Landing `.comparison-header span` at `12px` — tokenise | LND | 2 | 1 | L | 3 |
| 45 | start.html has no `--text-*` tokens — all raw px; add shared scale or map to V8 tokens | STR | 4 | 2 | M | 2 |
| 46 | start.html step header `52px` raw — add `--text-display` token for wizard hero number | STR | 3 | 1 | L | 2 |
| 47 | start.html `.field-hint` at `11.5px` — fractional value; round to 12px and tokenise | STR | 3 | 1 | L | 2 |
| 48 | start.html `.field-error-msg` at `11.5px` — same fractional issue | STR | 3 | 1 | L | 2 |
| 49 | start.html `.step-indicator` at `12px` — tokenise | STR | 2 | 1 | L | 2 |
| 50 | start.html `.cg-hint` at `9.5px` — below floor; raise to 11px minimum | STR | 4 | 1 | L | 2 |
| 51 | start.html `.cg-sm .cg-hint` at `9px` — the smallest value in start.html; below threshold; raise | STR | 5 | 1 | L | 2 |
| 52 | start.html `.cta-eyebrow` at `9px` — raise to 10px minimum | STR | 4 | 1 | L | 2 |
| 53 | start.html `.colour-where-label` at `10px` — tokenise | STR | 2 | 1 | L | 3 |
| 54 | start.html `.done-next__label` at `13px` — tokenise | STR | 2 | 1 | L | 3 |
| 55 | V8 `.snap-eyebrow` (on profile page) equivalent — audit if snap card eyebrow text uses `--text-xs` or raw px | V8 | 3 | 1 | L | 2 |
| 56 | V8 hero section: `font-size: 10px` on fan trust text — currently `--text-xs` token; verify token resolves correctly | V8 | 3 | 1 | L | 1 |
| 57 | V8 countdown number size uses `clamp(56px, 16vw, 96px)` raw — add `--text-countdown` token | V8 | 3 | 1 | L | 2 |
| 58 | V8 `.platform-pill` text at `var(--text-xs)` — confirm token usage is correct | V8 | 2 | 1 | L | 1 |
| 59 | V8 `.release-card` meta text — audit each meta line for raw px vs token | V8 | 2 | 1 | L | 2 |
| 60 | V8 `.snap-card` body text — audit for raw px vs token | V8 | 2 | 1 | L | 2 |
| 61 | V8 `.events-row` venue/date text sizes — confirm tokenised | V8 | 2 | 1 | L | 2 |
| 62 | V8 `.merch-card` price and description sizes — confirm tokenised | V8 | 2 | 1 | L | 2 |
| 63 | V8 fan capture form label at 10px — confirm at or above `--text-xs` token | V8 | 3 | 1 | L | 1 |
| 64 | V8 `.hero__eyebrow` at 11px raw — map to `--text-xs` | V8 | 2 | 1 | L | 1 |
| 65 | V8 `.bio-strip__text` at `var(--text-base)` — confirm this is correct and tokens are used throughout bio | V8 | 2 | 1 | L | 1 |
| 66 | V8 tab bar label text — audit for token usage | V8 | 2 | 1 | L | 2 |
| 67 | V8 CTA hero button text at `var(--text-base)` — confirm large enough for primary action on mobile | V8 | 3 | 1 | L | 1 |
| 68 | V8 secondary CTA text at `var(--text-xs)` — verify this is not too small for a call to action | V8 | 3 | 1 | L | 1 |
| 69 | Define and document `--text-5xl` as the max scale step, currently missing — `--text-4xl` is the ceiling | V8 | 2 | 1 | L | 1 |
| 70 | Write a comment block in V8 `:root` naming all scale steps and their intended use (xs=labels, sm=meta, base=body, etc.) | V8 | 2 | 1 | L | 1 |
| 71 | Admin has inline style blocks containing raw `font-size` values — grep and replace with tokens | ADM | 4 | 2 | M | 3 |
| 72 | Landing `font-size: 9px` inside demo phone mockup — confirm this is decorative only, add `aria-hidden` | LND | 2 | 1 | L | 3 |
| 73 | Landing `font-size: 7.5px` inside demo preview — same as above; confirm decorative | LND | 2 | 1 | L | 3 |
| 74 | Landing `font-size: 6px` appears at least twice in demo elements — below all accessible thresholds; confirm `aria-hidden` | LND | 3 | 1 | L | 3 |
| 75 | Landing `font-size: 5px` — single occurrence in demo mockup lock icon; confirm `aria-hidden` | LND | 2 | 1 | L | 3 |
| 76 | Align admin scale with V8 scale wherever semantic equivalent exists — same step names, same values | ADM | 3 | 2 | M | 3 |
| 77 | Admin `.gold-lock-overlay .glo-title` at raw `14px` — add to admin scale token | ADM | 2 | 1 | L | 3 |
| 78 | Admin `.upgrade-bar-text` at raw `12px` — tokenise | ADM | 2 | 1 | L | 3 |
| 79 | Admin `.chq-state-btn` label at raw `11px` — map to `--text-xs` | ADM | 2 | 1 | L | 3 |
| 80 | Admin `.tier-badge` text at raw `11px` — tokenise | ADM | 2 | 1 | L | 3 |
| 81 | Admin `.page-next-moment` at raw `11px` — tokenise | ADM | 2 | 1 | L | 3 |
| 82 | Admin `.ai-time` at raw `10px` — tokenise | ADM | 2 | 1 | L | 3 |
| 83 | Admin `.ai-body` at raw `12px` — tokenise | ADM | 2 | 1 | L | 3 |
| 84 | start.html `.how-to-step` at `12.5px` — fractional; round to 13px and tokenise | STR | 2 | 1 | L | 3 |
| 85 | start.html import preview name `14px` — tokenise | STR | 2 | 1 | L | 3 |
| 86 | start.html `.moment-card__icon` at `22px` — this is for emoji, confirm sizing is intentional | STR | 1 | 1 | L | 4 |
| 87 | FAQ answer font-size on landing — currently not explicitly set; falls back to base; add explicit token reference | LND | 3 | 1 | L | 3 |
| 88 | FAQ answer line-height — not set explicitly in FAQ CSS; add explicit value | LND | 2 | 1 | L | 3 |
| 89 | Landing pricing feature list item font-size — not explicitly declared; audit and tokenise | LND | 2 | 1 | L | 3 |
| 90 | V8 bottom sheet form label sizes — confirm all use `--text-sm` or `--text-xs` tokens | V8 | 2 | 1 | L | 3 |
| 91 | V8 toast message font-size at raw `13px` — inline style in JS; map to token or at least constant | V8 | 2 | 1 | L | 3 |
| 92 | V8 `#fan-capture-sub` text at `var(--text-sm)` — confirm correct token | V8 | 2 | 1 | L | 2 |
| 93 | Audit all `clamp()` values across all four pages — each clamp should have a named token equivalent | ALL | 4 | 2 | M | 3 |
| 94 | Create a single shared token comment block in DESIGN_SYSTEM_SPEC.md listing all scale steps — acts as source of truth | ALL | 3 | 2 | L | 3 |
| 95 | V8 `--lh-label` is referenced but is it defined? Confirm definition in `:root` | V8 | 3 | 1 | L | 1 |
| 96 | V8 `--lh-tight`, `--lh-body` — confirm both defined in `:root` | V8 | 3 | 1 | L | 1 |
| 97 | V8 `--ls-d` and `--ls-label` — confirm both defined in `:root` | V8 | 3 | 1 | L | 1 |
| 98 | Admin `font-size:22px` on `#homeGreeting` — same value as `.page-title`; if both exist, confirm they use same token | ADM | 2 | 1 | L | 2 |
| 99 | Ensure no page uses `em` for font-size (compound scaling risk) — all should be px or rem via tokens | ALL | 3 | 1 | L | 2 |
| 100 | Add a CI grep test (in QA smoke test doc) that fails if any `font-size` value outside the defined token set appears in CSS | ALL | 4 | 2 | L | 5 |

## Wave Summary
- **Wave 1** — 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 56, 57, 58, 63, 64, 65, 66, 67, 68, 69, 70, 92, 95, 96, 97
- **Wave 2** — 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 45, 46, 47, 48, 49, 50, 51, 52, 55, 59, 60, 61, 62, 98, 99
- **Wave 3** — 37, 38, 39, 40, 41, 42, 43, 44, 53, 54, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 87, 88, 89, 90, 91, 93, 94
- **Wave 4** — 86
- **Wave 5** — 100
- **Wave 6** — (none)
