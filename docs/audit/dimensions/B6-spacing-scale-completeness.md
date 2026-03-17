# Dimension B6 — Spacing Scale Completeness
**Category:** Typography & Spacing
**Phase:** 5

All padding, margin, and gap values should use `--sp-N` tokens. V8 has a defined `--sp-1` through `--sp-16` scale and uses it throughout. Admin.html uses entirely raw pixel values for all spacing. Landing.html uses raw pixel values (88px, 56px, 52px, 24px, etc.) with no token system. start.html is mixed — some token usage but many raw values remain. The admin page is the largest offender with zero spacing token coverage.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | V8 defines `--sp-1: 4px` through `--sp-16: 64px` — confirm the full scale in `:root` | V8 | 3 | 1 | L | 1 |
| 2 | V8 `--sp-1: 4px` — confirm this is used consistently for the tightest spacing (e.g., icon-to-label gap) | V8 | 2 | 1 | L | 1 |
| 3 | V8 `--sp-2: 8px` — confirm used for internal card spacing, pill internal padding | V8 | 2 | 1 | L | 1 |
| 4 | V8 `--sp-3: 12px` — confirm used for between-element gaps within a section | V8 | 2 | 1 | L | 1 |
| 5 | V8 `--sp-4: 16px` — the base unit; confirm it's the most-used token on V8 | V8 | 3 | 1 | L | 1 |
| 6 | V8 `--sp-5: 20px` — confirm used for card internal padding | V8 | 2 | 1 | L | 1 |
| 7 | V8 `--sp-6: 24px` — confirm used for section header bottom margin | V8 | 2 | 1 | L | 1 |
| 8 | V8 `--sp-8: 32px` — confirm used for between-section spacing | V8 | 3 | 1 | L | 1 |
| 9 | V8 `--sp-10: 40px` — confirm used where needed (section top padding) | V8 | 2 | 1 | L | 1 |
| 10 | V8 `--sp-12: 48px` — confirm it's in use and not just declared | V8 | 2 | 1 | L | 1 |
| 11 | V8 `--sp-16: 64px` — confirm this is the largest spacing used and nothing larger appears | V8 | 2 | 1 | L | 1 |
| 12 | V8 missing `--sp-7: 28px` — there's a gap in the scale; check if any 28px value appears and needs this token | V8 | 2 | 1 | L | 2 |
| 13 | V8 missing `--sp-9: 36px` — check if 36px appears anywhere | V8 | 2 | 1 | L | 2 |
| 14 | V8 missing `--sp-11: 44px` — 44px tap target minimum; check if gap between tokens causes a 44px raw value | V8 | 3 | 1 | L | 2 |
| 15 | V8 has `3px` raw values for small visual details (micro-dot, ring sizes) — confirm these intentionally fall outside the scale | V8 | 2 | 1 | L | 2 |
| 16 | V8 has `calc(var(--sp-10) + var(--sp-6))` expressions — confirm these are appropriate where a single token doesn't exist | V8 | 2 | 1 | L | 2 |
| 17 | V8 hero section padding: `var(--sp-10) var(--sp-5) var(--sp-5)` — confirm this correctly applies the triple-value shorthand | V8 | 2 | 1 | L | 1 |
| 18 | V8 content sections primary: `padding-top: var(--sp-10)` — confirm this is the intended section rhythm token | V8 | 3 | 1 | L | 1 |
| 19 | V8 content sections secondary: `padding-top: var(--sp-8)` — confirm the two-level hierarchy (primary vs secondary sections) | V8 | 3 | 1 | L | 1 |
| 20 | V8 section sub-header: `padding-top: var(--sp-6)` — confirm third level | V8 | 2 | 1 | L | 1 |
| 21 | V8 bottom padding under tab bar: `calc(var(--tab-bar-height) + env(safe-area-inset-bottom, 0px) + var(--sp-4))` — confirm this uses tokens correctly | V8 | 3 | 1 | L | 1 |
| 22 | V8 margin on heading before section: `margin: 0 0 var(--sp-6) 0` — confirm token usage | V8 | 2 | 1 | L | 1 |
| 23 | V8 spacing around the CTA buttons: `padding: var(--sp-4) var(--sp-6)` — confirm this produces correct 44px+ tap target | V8 | 3 | 1 | L | 1 |
| 24 | V8 quick action pills: `padding: 3px var(--sp-3)` — the 3px top/bottom is a raw value; not in scale | V8 | 3 | 1 | L | 2 |
| 25 | V8 quick action pill `3px` padding — this is a visual micro-spacing; document as intentional exception to scale | V8 | 2 | 1 | L | 2 |
| 26 | Admin has zero `--sp-*` token declarations — add the same `--sp-1` through `--sp-16` scale to admin `:root` | ADM | 5 | 2 | M | 2 |
| 27 | Admin `.stat-card` uses `padding: 16px 20px` raw — map to `var(--sp-4) var(--sp-5)` | ADM | 4 | 1 | L | 2 |
| 28 | Admin stats row `gap: 14px` — no matching token (between --sp-3:12px and --sp-4:16px); add `--sp-3-5: 14px` or round to `--sp-4` | ADM | 3 | 1 | L | 2 |
| 29 | Admin `.dashboard-section` margin-bottom — audit raw value and tokenise | ADM | 3 | 1 | L | 2 |
| 30 | Admin Campaign HQ section `margin-top: 32px` in CSS — map to `var(--sp-8)` | ADM | 3 | 1 | L | 2 |
| 31 | Admin `.chq-state-btn` padding `4px 12px` — map to `var(--sp-1) var(--sp-3)` | ADM | 2 | 1 | L | 3 |
| 32 | Admin `.fan-row` row padding `6px 12px` raw — map to tokens | ADM | 2 | 1 | L | 3 |
| 33 | Admin `.snap-card` in admin manager `padding: 10px` raw — map to token | ADM | 2 | 1 | L | 3 |
| 34 | Admin button padding `padding: 9px 12px` — map to `var(--sp-2) var(--sp-3)` | ADM | 2 | 1 | L | 3 |
| 35 | Admin tier badge padding `4px 10px` — map to tokens | ADM | 2 | 1 | L | 3 |
| 36 | Admin inline `padding: 5px 14px` on connection buttons — map to tokens | ADM | 2 | 1 | L | 3 |
| 37 | Admin sidebar width, section gaps, and item spacing all use raw px — tokenise all | ADM | 4 | 2 | M | 2 |
| 38 | Admin `gap: 8px` appears in multiple places — map all to `var(--sp-2)` | ADM | 2 | 1 | L | 2 |
| 39 | Admin `margin-bottom: 6px` on stat labels — map to `var(--sp-1)` (4px) or add `--sp-1-5: 6px` | ADM | 2 | 1 | L | 3 |
| 40 | Admin `margin-top: 4px` on stat delta — map to `var(--sp-1)` | ADM | 2 | 1 | L | 3 |
| 41 | Admin `padding: 6px 14px` on topbar action buttons — tokenise | ADM | 2 | 1 | L | 3 |
| 42 | Admin field input `padding: 9px 10px` — map to approximate tokens | ADM | 2 | 1 | L | 3 |
| 43 | Admin `padding-bottom: 20px` on bottom rule in pricing card — map to `var(--sp-5)` | ADM | 2 | 1 | L | 3 |
| 44 | Admin `margin-bottom: 14px` on gold lock title — map to `var(--sp-3)` or `var(--sp-4)` | ADM | 2 | 1 | L | 3 |
| 45 | Landing section padding `88px 48px` desktop — add `--section-padding-y: 88px` and `--section-padding-x: 48px` tokens | LND | 4 | 2 | M | 2 |
| 46 | Landing section padding `56px 20px` mobile — add `--section-padding-y-mobile: 56px` | LND | 4 | 1 | L | 2 |
| 47 | Landing `margin-bottom: 52px` on `.section__sub` — no token for 52px; either add to scale or use `--sp-12: 48px` + adjustment | LND | 3 | 1 | L | 2 |
| 48 | Landing `margin-bottom: 36px` mobile for `.section__sub` — map to approximate token | LND | 2 | 1 | L | 2 |
| 49 | Landing hero section `padding: 0 28px` — no 28px token; map to `--sp-6: 24px` or add `--sp-7: 28px` | LND | 3 | 1 | L | 2 |
| 50 | Landing `gap: 80px` in comparison grid — very large gap; add to landing token set or use inline calc | LND | 2 | 1 | L | 3 |
| 51 | Landing `gap: 40px` in comparison mobile — no token for 40px; map to `--sp-10` | LND | 2 | 1 | L | 3 |
| 52 | Landing hero section `margin-top: 22px` on sub-headline — map to `var(--sp-5)` | LND | 2 | 1 | L | 3 |
| 53 | Landing proof strip item `margin-top: 6px` — map to small token | LND | 2 | 1 | L | 3 |
| 54 | Landing pricing grid `gap: 16px` — can map to `--sp-4` | LND | 2 | 1 | L | 2 |
| 55 | Landing pricing card internal padding — audit all raw values and tokenise | LND | 3 | 1 | L | 2 |
| 56 | Landing footer CTA section padding — audit raw values | LND | 2 | 1 | L | 2 |
| 57 | Landing `margin-bottom: 34px` on footer sub copy — no token for 34px; round to `--sp-8: 32px` | LND | 2 | 1 | L | 3 |
| 58 | Landing `margin-bottom: 16px` — map to `var(--sp-4)` | LND | 2 | 1 | L | 2 |
| 59 | Landing `margin-bottom: 18px` on section title — no token; map to `var(--sp-4)` or add `--sp-4-5: 18px` | LND | 2 | 1 | L | 3 |
| 60 | Landing `margin-bottom: 14px` on eyebrow — map to `var(--sp-3)` | LND | 2 | 1 | L | 2 |
| 61 | Landing `gap: 16px` in pricing grid — map to `var(--sp-4)` | LND | 2 | 1 | L | 2 |
| 62 | start.html body padding `padding: 0 20px 48px` — some mapped to tokens, some raw; audit each | STR | 3 | 1 | L | 2 |
| 63 | start.html step spacing between elements — audit gap values | STR | 3 | 1 | L | 2 |
| 64 | start.html button padding `padding: 13px 24px` — audit if V8 token equivalents exist | STR | 2 | 1 | L | 2 |
| 65 | start.html `.colour-chip` padding `8px 18px` — map to tokens | STR | 2 | 1 | L | 3 |
| 66 | start.html option card padding `padding: 12px 14px` — map to `var(--sp-3) var(--sp-3-5)` | STR | 2 | 1 | L | 3 |
| 67 | start.html `.hint-steps ol` padding-left `18px` — no token for 18px; note as exception | STR | 1 | 1 | L | 4 |
| 68 | start.html form field input padding `11px 14px` — no direct token match; add or round | STR | 2 | 1 | L | 3 |
| 69 | start.html `.import-input` padding `14px 16px` — map to `var(--sp-3) var(--sp-4)` | STR | 2 | 1 | L | 3 |
| 70 | start.html `.done-next__item` padding — audit and tokenise | STR | 2 | 1 | L | 3 |
| 71 | V8 `margin-bottom: var(--sp-6)` on section headings — confirm this is the standard section-heading margin | V8 | 2 | 1 | L | 1 |
| 72 | V8 `padding-top: var(--sp-3)` on sub-sections — confirm correct token for third-level hierarchy | V8 | 2 | 1 | L | 1 |
| 73 | After tokenising admin, audit if any `calc()` expressions use raw numbers instead of token arithmetic | ADM | 3 | 2 | L | 3 |
| 74 | Confirm the scale is 4px-based throughout: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 — these are all multiples of 4 | ALL | 3 | 1 | L | 1 |
| 75 | V8 is 4px-based; admin and landing use values like 6px, 9px, 14px that break the 4px grid — note which break it and whether the deviation is intentional | ALL | 4 | 2 | M | 2 |
| 76 | Admin `padding: 9px 12px` on sidebar items — 9px is not on the 4px scale; evaluate if 8px or 10px would work | ADM | 3 | 1 | L | 3 |
| 77 | Landing `padding: 10px 0` on comparison items — 10px is off-scale; round to 8px or 12px | LND | 2 | 1 | L | 3 |
| 78 | Define a shared spacing reference table in DESIGN_SYSTEM_SPEC.md showing what each `--sp-N` value is used for | ALL | 3 | 1 | L | 3 |
| 79 | Confirm the V8 spacing scale also covers border-width, outline-width values — or document that these use separate tokens | V8 | 2 | 1 | L | 3 |
| 80 | V8 `gap: var(--sp-1)` in quick action pill container — confirm the 4px gap is correct for pills side-by-side | V8 | 2 | 1 | L | 1 |
| 81 | V8 `gap: var(--sp-2)` in CTA grid — confirm 8px gap between hero buttons | V8 | 2 | 1 | L | 1 |
| 82 | V8 `gap: var(--sp-3)` in events row — confirm 12px gap between event elements | V8 | 2 | 1 | L | 1 |
| 83 | After adding admin spacing tokens, run a visual screenshot comparison to ensure no layout shifts | ADM | 4 | 2 | M | 3 |
| 84 | After tokenising landing spacing, run a screenshot comparison | LND | 3 | 2 | M | 3 |
| 85 | Admin `padding: 7px 16px` on topbar badge — 7px is off the 4px scale; round to 6px (--sp-1-5?) or 8px | ADM | 2 | 1 | L | 3 |
| 86 | Admin `padding: 10px` on snap card save button — 10px off scale; round to 8 or 12 | ADM | 2 | 1 | L | 3 |
| 87 | V8 `padding: var(--sp-8) var(--sp-5) var(--sp-6)` on hero section — three-value shorthand; confirm correct mapping | V8 | 2 | 1 | L | 1 |
| 88 | V8 safe-area-inset calc includes token reference — confirm this is the correct pattern for iOS safe areas | V8 | 3 | 1 | L | 1 |
| 89 | Landing `.feature-card` internal padding — audit raw values | LND | 2 | 1 | L | 2 |
| 90 | Landing hero section `gap: 24px` between CTA and platform row — map to `var(--sp-6)` | LND | 2 | 1 | L | 2 |
| 91 | Landing `margin-bottom: 10px` on hero feature label — map to `var(--sp-2)` | LND | 2 | 1 | L | 2 |
| 92 | Landing `.step` `padding: 24px 0` — map to `var(--sp-6) 0` | LND | 2 | 1 | L | 2 |
| 93 | Admin snap card eyebrow margin — audit and tokenise | ADM | 2 | 1 | L | 3 |
| 94 | Admin `.ai-trigger` padding — audit raw values | ADM | 2 | 1 | L | 3 |
| 95 | Admin `margin-top: 1px` on some label elements — sub-token micro-adjustments; document as intentional exceptions | ADM | 1 | 1 | L | 4 |
| 96 | V8 `margin-top: var(--sp-1)` expressions — confirm these are the smallest standard gap used between elements | V8 | 2 | 1 | L | 2 |
| 97 | After full tokenisation: add a grep check in QA smoke tests that finds raw pixel values for padding/margin/gap outside `:root` | ALL | 4 | 2 | L | 5 |
| 98 | V8 `padding: var(--sp-4) var(--sp-5) var(--sp-4)` on section headers — confirm the asymmetric top/bottom is intentional | V8 | 2 | 1 | L | 2 |
| 99 | Confirm start.html has `--sp-*` tokens equivalent to V8 or imports them — currently using raw values | STR | 4 | 2 | M | 2 |
| 100 | Final audit: document every intentional exception to the spacing scale (micro-adjustments, calc expressions, visual tweaks) in DESIGN_SYSTEM_SPEC.md | ALL | 3 | 1 | L | 5 |

## Wave Summary
- **Wave 1** — 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 17, 18, 19, 20, 21, 22, 23, 71, 72, 74, 80, 81, 82, 87, 88
- **Wave 2** — 12, 13, 14, 15, 16, 24, 25, 26, 27, 28, 29, 30, 37, 38, 45, 46, 47, 48, 49, 54, 55, 56, 58, 60, 61, 62, 63, 64, 75, 89, 90, 91, 92, 96, 98, 99
- **Wave 3** — 31, 32, 33, 34, 35, 36, 39, 40, 41, 42, 43, 44, 50, 51, 52, 53, 57, 59, 65, 66, 68, 69, 70, 73, 76, 77, 78, 79, 83, 84, 85, 86, 93, 94
- **Wave 4** — 67, 95
- **Wave 5** — 97, 100
- **Wave 6** — (none)
