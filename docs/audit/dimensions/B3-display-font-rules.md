# Dimension B3 — Display Font Usage Rules
**Category:** Typography & Spacing
**Phase:** 5

Barlow Condensed is the display font for hero names, stat values, countdowns, and section-level numbers. It must never appear at body-copy sizes or for paragraph text. Plus Jakarta Sans (admin) and DM Sans (profile/landing/onboarding) must not cross-contaminate surfaces. GPT finding: admin section headings should use Barlow Condensed for display-level hierarchy but currently use Plus Jakarta Sans at regular weight.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | V8 `.hero__name` uses `font-family: var(--font-d)` — confirm Barlow Condensed is applied | V8 | 4 | 1 | L | 1 |
| 2 | V8 `--font-d` token defined as `'Barlow Condensed', system-ui, sans-serif` — confirm in `:root` | V8 | 3 | 1 | L | 1 |
| 3 | V8 hero name uses `var(--font-d-weight)` — what does this resolve to? Confirm it's 700+ | V8 | 3 | 1 | L | 1 |
| 4 | V8 `.stat-value` class uses `font-family: var(--font-d)` — confirm Barlow Condensed on stats | V8 | 4 | 1 | L | 1 |
| 5 | V8 countdown numbers use `font-size: clamp(56px, 16vw, 96px)` — confirm `font-family: var(--font-d)` is also set | V8 | 4 | 1 | L | 1 |
| 6 | V8 vibe overrides change `--font-d` per vibe — confirm every vibe override also sets a `--font-d-weight` | V8 | 4 | 1 | L | 1 |
| 7 | V8 vibe Acoustic sets `--font-display-weight: 400` — this is the lightest display weight; confirm Barlow Condensed weight 400 renders well at hero sizes | V8 | 3 | 1 | L | 2 |
| 8 | V8 vibe Hip Hop overrides `--font-d` — confirm it still uses Barlow Condensed (not a third-party font that would require loading) | V8 | 3 | 1 | L | 2 |
| 9 | V8 vibe R&B sets `--font-display-weight: 500` — confirm Barlow Condensed 500 is available (not loaded on V8 which only requests 700) | V8 | 5 | 1 | M | 1 |
| 10 | V8 vibe Indie sets `--font-display-weight: 500` — same concern; 500 weight not in V8 font request | V8 | 5 | 1 | M | 1 |
| 11 | V8 vibe Acoustic sets `--font-display-weight: 400` — 400 weight not in V8 Barlow Condensed request (only 700 loaded) | V8 | 5 | 1 | M | 1 |
| 12 | V8 font request loads only `Barlow+Condensed:wght@700` — needs to also load 400, 500, 800 for all vibe weights | V8 | 5 | 2 | M | 1 |
| 13 | V8 vibe Pop sets `--font-display-weight: 800` — weight 800 not in V8 Barlow Condensed request | V8 | 5 | 1 | M | 1 |
| 14 | V8 vibe Rock sets `--font-display-weight: 700` — this is the only weight in the V8 request; Rock is the only working vibe for display font | V8 | 4 | 1 | L | 1 |
| 15 | V8 vibe Electronic uses `--font-d: 'Barlow Condensed'` with `--font-display-weight` not explicitly set — falls to default; confirm default | V8 | 3 | 1 | L | 1 |
| 16 | Confirm Barlow Condensed is never used at font-sizes below 18px on V8 — below 18px it loses its display-font character | V8 | 4 | 1 | L | 1 |
| 17 | V8 `--ls-d` token for display font letter-spacing — confirm value is -0.01em or similar (tighter than body) | V8 | 3 | 1 | L | 1 |
| 18 | V8 `.platform-pill` text uses `var(--font-body)` not `var(--font-d)` — confirm correct (pills should not use display font) | V8 | 2 | 1 | L | 1 |
| 19 | V8 CTA button text uses `var(--font-body)` not `var(--font-d)` — confirm correct | V8 | 2 | 1 | L | 1 |
| 20 | V8 bio text uses `var(--font-body)` — confirm Barlow Condensed is not used for bio copy | V8 | 3 | 1 | L | 1 |
| 21 | V8 `.fan-capture__heading` — which font? Confirm it uses `var(--font-body)` for the call-to-action text | V8 | 3 | 1 | L | 1 |
| 22 | V8 `.fan-capture__sub` — confirm `var(--font-body)` not display font | V8 | 2 | 1 | L | 1 |
| 23 | V8 section headings (Music, Shows, etc.) — are these using `var(--font-d)` or `var(--font-body)` at bold weight? Confirm design intent | V8 | 3 | 1 | L | 2 |
| 24 | V8 `.events-row` heading text — confirm font usage | V8 | 2 | 1 | L | 2 |
| 25 | V8 `.snap-card` heading — confirm `var(--font-body)` bold, not display font | V8 | 2 | 1 | L | 2 |
| 26 | V8 release card track title — confirm which font; display font could work here at large size | V8 | 2 | 1 | L | 2 |
| 27 | Admin `--font-d` is `'Barlow Condensed'` — confirm only used for stat values, not for body copy in admin | ADM | 4 | 1 | L | 1 |
| 28 | Admin `.stat-value` uses `font-family: var(--font-d)` — correct usage | ADM | 3 | 1 | L | 1 |
| 29 | Admin `.page-title` uses `font-family: var(--font)` (Plus Jakarta Sans) at `22px` bold — GPT finding: this should use Barlow Condensed for display hierarchy | ADM | 4 | 1 | L | 2 |
| 30 | Admin `#homeGreeting` uses `font-family: var(--font)` at `22px` — GPT finding: the dashboard greeting could use Barlow Condensed for personality | ADM | 3 | 1 | L | 3 |
| 31 | Admin section headers (Campaign HQ title, etc.) use `var(--font)` — consider whether Barlow Condensed would improve visual hierarchy | ADM | 3 | 1 | L | 3 |
| 32 | Admin `.chq-title` at `13px` uppercase — this is too small for Barlow Condensed; correct to stay with Plus Jakarta Sans | ADM | 3 | 1 | L | 1 |
| 33 | Admin sidebar logo uses `font-family: var(--font-d)` at `22px` — correct Barlow Condensed usage for the ABLE wordmark | ADM | 3 | 1 | L | 1 |
| 34 | Admin sidebar logo in light mode uses `font-family: var(--font-d)` at `15px` — confirm Barlow Condensed at 15px is still legible | ADM | 4 | 1 | L | 2 |
| 35 | Admin sidebar logo at 15px: Barlow Condensed below 18px is borderline — consider raising to 16px minimum for the sidebar condensed text | ADM | 3 | 1 | L | 2 |
| 36 | Admin `font-family:var(--font-d)` on `#ciqSbTitle` — confirm this is the sidebar artist name, which is a legitimate display-font use | ADM | 2 | 1 | L | 1 |
| 37 | Admin `.milestone-text` uses `font-family:var(--font)` — confirm correct (milestones are body copy) | ADM | 2 | 1 | L | 1 |
| 38 | Admin `.empty-state-title` and `.empty-state__title` — confirm both use `var(--font)` not display font | ADM | 2 | 1 | L | 1 |
| 39 | Landing `.hero__wordmark` uses `font-family: var(--font-d)` — correct use of Barlow Condensed for ABLE logo | LND | 3 | 1 | L | 1 |
| 40 | Landing hero headline uses `font-family: var(--font-d)` at `clamp(52px, 6vw, 84px)` — correct display font usage | LND | 3 | 1 | L | 1 |
| 41 | Landing hero headline `em` span uses `font-family: var(--font-editorial)` — this aliases to Barlow Condensed; confirm it's still Barlow Condensed, not a different font | LND | 4 | 1 | L | 1 |
| 42 | Landing `.section__title` has mixed fonts: base uses `var(--font-editorial)` italic, `em` inside uses `var(--font-d)` — confirm this intentional split | LND | 4 | 1 | L | 1 |
| 43 | Landing `.proof__stat` uses `font-family: var(--font-editorial)` at `44px` — resolves to Barlow Condensed; correct display use | LND | 3 | 1 | L | 1 |
| 44 | Landing `.quote__text` uses `font-family: var(--font-editorial)` italic — resolves to Barlow Condensed italic; confirm this is intentional | LND | 3 | 1 | L | 2 |
| 45 | Landing `.nav__logo` uses `font-family: var(--font-d)` — correct for ABLE wordmark in nav | LND | 2 | 1 | L | 1 |
| 46 | Landing body paragraph copy (`.hero__sub`, `.section__sub`) uses `var(--font)` DM Sans — confirm no Barlow Condensed bleeds into body copy | LND | 3 | 1 | L | 1 |
| 47 | Landing `.hero-feature__title` at `20px` uses no explicit font-family — inherits DM Sans from body; confirm this is correct (should not be Barlow Condensed) | LND | 2 | 1 | L | 1 |
| 48 | Landing `.hero-feature__desc` at `14px` — confirm inherits DM Sans body font | LND | 2 | 1 | L | 1 |
| 49 | Landing `.feature-card__title` at `14px` uses no explicit font — confirm inherits DM Sans | LND | 2 | 1 | L | 1 |
| 50 | Landing footer CTA headline — confirm which font is used for the large CTA text at page bottom | LND | 2 | 1 | L | 2 |
| 51 | start.html step hero number uses `font-family: var(--font-d)` at `52px` — correct display use | STR | 3 | 1 | L | 1 |
| 52 | start.html step label (eyebrow above hero) uses `font-family: var(--font)` — confirm correct | STR | 2 | 1 | L | 1 |
| 53 | start.html `.nav-brand` uses `font-family: var(--font-d)` — correct for ABLE wordmark in wizard nav | STR | 2 | 1 | L | 1 |
| 54 | start.html body copy, hints, and field labels all use `var(--font)` — confirm no Barlow Condensed in form copy | STR | 3 | 1 | L | 1 |
| 55 | start.html `.cta-name` uses `font-family: var(--font-d)` at `15px` — Barlow Condensed at 15px is borderline; confirm this is for the CTA label chip, not body text | STR | 3 | 1 | L | 2 |
| 56 | start.html CTA preview label uses `var(--font-d)` — a small preview chip; confirm this is intentional at that size | STR | 2 | 1 | L | 2 |
| 57 | Define the minimum size rule for Barlow Condensed in DESIGN_SYSTEM_SPEC.md — recommend 16px minimum | ALL | 3 | 1 | L | 2 |
| 58 | Document which elements on each page are permitted to use `var(--font-d)` — create an approved-use list | ALL | 3 | 1 | L | 3 |
| 59 | V8 admin-preview component rendered inside profile (bottom bar) uses Plus Jakarta Sans inline — confirm this doesn't bleed Plus Jakarta Sans into the fan-facing page render | V8 | 3 | 2 | M | 3 |
| 60 | V8 admin-preview `.preview-artist-name` — which font? Should use Barlow Condensed as that's what the fan sees | V8 | 3 | 1 | L | 2 |
| 61 | Check every `font-family` value in admin.html CSS for any DM Sans reference — should be zero | ADM | 4 | 1 | L | 1 |
| 62 | Check every `font-family` value in V8 CSS for any Plus Jakarta Sans reference — should be zero (except in the admin-preview layer) | V8 | 4 | 1 | L | 1 |
| 63 | Check every `font-family` value in landing.html CSS for any Plus Jakarta Sans reference — should be zero | LND | 4 | 1 | L | 1 |
| 64 | Check every `font-family` value in start.html CSS for any Plus Jakarta Sans reference — should be zero | STR | 4 | 1 | L | 1 |
| 65 | V8 `.able-toast` uses hardcoded `'DM Sans', sans-serif` string — should use `var(--font-body)` token | V8 | 2 | 1 | L | 2 |
| 66 | V8 OG card SVG generation in JS uses hardcoded `font-family="DM Sans, sans-serif"` — this is an SVG attribute not CSS; acceptable but document the exception | V8 | 1 | 1 | L | 3 |
| 67 | Audit all inline `style` attributes in HTML on all four pages for hardcoded font-family strings | ALL | 3 | 2 | M | 2 |
| 68 | Admin has inline style blocks in JS-rendered HTML with hardcoded font-size/family values — audit each | ADM | 3 | 2 | M | 2 |
| 69 | Landing `.comparison-header span` uses no explicit font — confirm inherits DM Sans at small caps styling | LND | 2 | 1 | L | 2 |
| 70 | V8 `font-family: var(--font-body)` vs `font-family: var(--font)` — V8 uses `--font-body` while admin uses `--font`; these are parallel tokens for different surfaces; confirm intentional | ALL | 3 | 1 | L | 1 |
| 71 | start.html uses `var(--font)` mapping to DM Sans — consistent with landing and V8 | STR | 2 | 1 | L | 1 |
| 72 | The ABLE logo wordmark appears on all four pages — confirm it always uses `var(--font-d)` Barlow Condensed bold on each | ALL | 3 | 1 | L | 1 |
| 73 | V8 `--font-editorial` token defined as `'Barlow Condensed', 'DM Sans', sans-serif` — same as `--font-d`; are two separate tokens needed, or should there be one canonical display token? | V8 | 3 | 1 | L | 2 |
| 74 | Landing defines `--font-editorial` same as above — the editorial token is an alias; document this explicitly | LND | 2 | 1 | L | 2 |
| 75 | Decide whether `--font-editorial` and `--font-d` should be distinct (Fraunces vs Barlow Condensed) or merged — document the decision | ALL | 4 | 1 | L | 2 |
| 76 | V8 `.countdown-label` text — confirm which font; countdown numbers use `var(--font-d)` but do labels? | V8 | 2 | 1 | L | 2 |
| 77 | V8 countdown unit labels (DAYS, HRS, MINS) at `11px` uppercase — confirm font; at 11px Barlow Condensed would be hard to read | V8 | 4 | 1 | L | 2 |
| 78 | If countdown labels use Barlow Condensed at 11px, switch to `var(--font-body)` at that size | V8 | 4 | 1 | L | 2 |
| 79 | V8 `.section-label` or section heading elements — audit whether any use Barlow Condensed at small sizes | V8 | 3 | 1 | L | 2 |
| 80 | Admin fan list row font — confirm all fan list text uses Plus Jakarta Sans | ADM | 2 | 1 | L | 1 |
| 81 | Admin campaign state button labels use `font-family: var(--font)` — confirm; these should not be Barlow Condensed | ADM | 2 | 1 | L | 1 |
| 82 | Admin modal/sheet titles — confirm which font; section sheet titles might benefit from Barlow Condensed | ADM | 2 | 1 | L | 3 |
| 83 | Admin `.gig-label` at `12px` bold uses no explicit font — confirm inherits Plus Jakarta Sans | ADM | 2 | 1 | L | 1 |
| 84 | Landing `.step__number` circles (1/2/3) — confirm font for the step numbers; if large enough, Barlow Condensed is appropriate | LND | 2 | 1 | L | 2 |
| 85 | Landing pricing card tier name heading — which font? At large size, Barlow Condensed would reinforce display hierarchy | LND | 3 | 1 | L | 2 |
| 86 | Landing `.footer-cta__title` large headline — confirm `var(--font-d)` or `var(--font-editorial)` for the closing CTA headline | LND | 3 | 1 | L | 2 |
| 87 | start.html colour picker label `ABLE ARTIST` uses `font-family: var(--font-d)` — correct brand use | STR | 2 | 1 | L | 1 |
| 88 | start.html CTA type selector chips — confirm font-family on the chip text | STR | 2 | 1 | L | 2 |
| 89 | start.html theme chip labels use `var(--font)` — correct for UI choice labels | STR | 2 | 1 | L | 1 |
| 90 | After V8 vibe font mismatch is fixed (items 9–13), test all 7 vibes render correctly with Barlow Condensed weights | V8 | 5 | 2 | M | 2 |
| 91 | Document display-font rule as: "Barlow Condensed is for hero names, large stats, countdowns, section numbers at ≥18px. Nothing else." | ALL | 3 | 1 | L | 3 |
| 92 | V8 `font-weight: var(--font-display-weight, var(--font-d-weight))` fallback chain — confirm `--font-d-weight` is defined in `:root` | V8 | 3 | 1 | L | 1 |
| 93 | Admin `.ai-suggestion` content text uses `var(--font)` — confirm Barlow Condensed never appears in AI suggestion cards | ADM | 2 | 1 | L | 1 |
| 94 | V8 release card track title and album name — confirm font-family | V8 | 2 | 1 | L | 2 |
| 95 | V8 `#fan-capture-heading` — confirm `var(--font-body)` for this call-to-action heading, not display font | V8 | 3 | 1 | L | 1 |
| 96 | Landing `.pricing-card__tier` tier name label — confirm it uses `var(--font-d)` for the tier level (Free, Artist, Pro) | LND | 3 | 1 | L | 2 |
| 97 | V8 bottom sheet section headings — which font? Sheets are admin-context; confirm Plus Jakarta Sans not used in V8 sheets | V8 | 3 | 1 | L | 2 |
| 98 | Add a lint rule to QA smoke tests: grep for any `font-family` string literal (not `var()`) outside `:root` declarations | ALL | 3 | 2 | L | 5 |
| 99 | Confirm admin `--font-d-weight` token value — it may not be defined, defaulting to browser default | ADM | 3 | 1 | L | 2 |
| 100 | Write display-font usage table in DESIGN_SYSTEM_SPEC.md listing every approved use of `var(--font-d)` across all four pages with sizes | ALL | 3 | 1 | L | 4 |

## Wave Summary
- **Wave 1** — 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 28, 32, 33, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 61, 62, 63, 64, 70, 71, 72, 80, 81, 83, 87, 89, 92, 93, 95
- **Wave 2** — 7, 8, 23, 24, 25, 26, 29, 34, 35, 50, 55, 56, 57, 60, 65, 67, 68, 69, 73, 74, 75, 76, 77, 78, 79, 84, 85, 86, 88, 90, 94, 96, 97, 99
- **Wave 3** — 30, 31, 58, 59, 66, 82, 91
- **Wave 4** — 100
- **Wave 5** — 98
- **Wave 6** — (none)
