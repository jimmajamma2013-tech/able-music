# Dimension B5 — Line Height System
**Category:** Typography & Spacing
**Phase:** 5

All line heights across all four pages should use one of three defined values: tight (1.1–1.2 for display text), reading (1.5–1.65 for body copy), and loose (1.7–1.8 for long-form). Currently V8 defines `--lh-tight`, `--lh-body`, and a label variant, while admin and landing use a mix of raw numeric values and no tokens. Several elements have no explicit line-height set at all, inheriting browser defaults that differ from the system.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | V8 defines `--lh-tight` — confirm its value is in the 1.1–1.2 range | V8 | 3 | 1 | L | 1 |
| 2 | V8 defines `--lh-body` — confirm its value is in the 1.5–1.65 range | V8 | 3 | 1 | L | 1 |
| 3 | V8 defines `--lh-label` — confirm its value and whether it's part of the three-tier system or an additional step | V8 | 3 | 1 | L | 1 |
| 4 | V8 hero name uses `line-height: var(--lh-tight)` — correct; display text at 1.1–1.2 | V8 | 3 | 1 | L | 1 |
| 5 | V8 hero name: at 80px+ line height of 1.1 means 88px of leading — confirm this doesn't clip descenders at large sizes | V8 | 3 | 1 | L | 1 |
| 6 | V8 `.bio-strip__text` uses `line-height: 1.65` — this is hardcoded, not using `--lh-body` token; replace | V8 | 3 | 1 | L | 1 |
| 7 | V8 countdown numbers use `line-height: 1` — this is tighter than `--lh-tight`; confirm intentional for countdown display | V8 | 3 | 1 | L | 1 |
| 8 | V8 stat values use `line-height: 1` — same tight treatment; confirm consistent with countdown | V8 | 2 | 1 | L | 1 |
| 9 | V8 `.release-description` or release card body uses `line-height: var(--lh-body)` — confirm | V8 | 2 | 1 | L | 1 |
| 10 | V8 `.fan-capture__sub` — confirm explicit line-height set using token | V8 | 2 | 1 | L | 1 |
| 11 | V8 platform pills at `var(--text-xs)` — confirm line-height is set explicitly (tiny text needs controlled leading) | V8 | 3 | 1 | L | 1 |
| 12 | V8 `.snap-card` body text — confirm line-height token used | V8 | 2 | 1 | L | 2 |
| 13 | V8 events row venue/date — confirm explicit line-height | V8 | 2 | 1 | L | 2 |
| 14 | V8 merch card description — confirm explicit line-height | V8 | 2 | 1 | L | 2 |
| 15 | V8 bottom sheet form fields — confirm `line-height: var(--lh-body)` on text areas | V8 | 2 | 1 | L | 2 |
| 16 | V8 CTA button text: buttons typically use `line-height: 1` or no line-height; confirm intentional | V8 | 2 | 1 | L | 2 |
| 17 | V8 breadcrumb/eyebrow labels — confirm explicit line-height | V8 | 2 | 1 | L | 2 |
| 18 | V8 `line-height: 1.3` appears at line 1127 — this is between tight (1.1) and reading (1.5); add a named token for this mid-value or map to nearest standard | V8 | 3 | 1 | L | 2 |
| 19 | V8 has `line-height: var(--lh-label)` on some elements — define `--lh-label` if not yet in `:root` | V8 | 3 | 1 | L | 1 |
| 20 | Admin has no `--lh-*` tokens defined — all line-heights are raw numeric values or inherited | ADM | 5 | 2 | M | 2 |
| 21 | Admin `.field-textarea` uses `line-height: 1.5` — raw value; map to `--lh-body` when admin scale is added | ADM | 3 | 1 | L | 2 |
| 22 | Admin `.field-hint` uses `line-height: 1.4` — between tight and reading; add a named value | ADM | 3 | 1 | L | 2 |
| 23 | Admin `.empty-state-body` uses `line-height: 1.55` — raw value; closest to reading (1.5–1.65); tokenise | ADM | 2 | 1 | L | 2 |
| 24 | Admin `.dc-body` fan-list description text — confirm explicit line-height set | ADM | 2 | 1 | L | 2 |
| 25 | Admin `.ai-text` suggestion text uses `line-height: 1.45` — slightly below reading; raw value; tokenise | ADM | 2 | 1 | L | 2 |
| 26 | Admin fan entry rows — confirm each row element has explicit line-height | ADM | 2 | 1 | L | 2 |
| 27 | Admin `.milestone-text` uses implicit line-height — set explicitly | ADM | 2 | 1 | L | 2 |
| 28 | Admin `.gig-hint` uses implicit line-height — small text at 10px with inherited leading is unpredictable | ADM | 3 | 1 | L | 2 |
| 29 | Admin campaign HQ release note text — confirm explicit line-height | ADM | 2 | 1 | L | 2 |
| 30 | Admin `.page-sub` at `13px` — confirm explicit line-height set | ADM | 2 | 1 | L | 2 |
| 31 | Admin upgrade bar text — confirm explicit line-height | ADM | 2 | 1 | L | 3 |
| 32 | Admin gold lock overlay body text `.glo-sub` — confirm explicit line-height | ADM | 2 | 1 | L | 3 |
| 33 | Admin `#homeGreeting` — confirm explicit line-height; page greeting at 22px needs tight or default leading | ADM | 2 | 1 | L | 2 |
| 34 | Add `--lh-tight: 1.1`, `--lh-body: 1.6`, `--lh-hint: 1.45` to admin `:root` | ADM | 4 | 2 | M | 2 |
| 35 | Landing `.hero__sub` uses `line-height: 1.7` — raw value; within the loose range; tokenise | LND | 3 | 1 | L | 2 |
| 36 | Landing `.section__sub` uses `line-height: 1.7` — consistent with `.hero__sub` but raw; tokenise | LND | 3 | 1 | L | 2 |
| 37 | Landing `.hero-feature__desc` uses `line-height: 1.7` — raw value; tokenise | LND | 2 | 1 | L | 2 |
| 38 | Landing `.feature-card__desc` uses `line-height: 1.6` — within reading range; raw value; tokenise | LND | 2 | 1 | L | 2 |
| 39 | Landing `.step__desc` uses `line-height: 1.7` — raw value; tokenise | LND | 2 | 1 | L | 2 |
| 40 | Landing `.pricing-card__desc` uses `line-height: 1.6` — raw value; tokenise | LND | 2 | 1 | L | 2 |
| 41 | Landing `.footer-cta__sub` uses `line-height: 1.65` — raw value; tokenise | LND | 2 | 1 | L | 2 |
| 42 | Landing `.quote__text` uses `line-height: 1.75` — raw value; tokenise | LND | 2 | 1 | L | 2 |
| 43 | Landing `.quiet-line` uses `line-height: 1.5` — raw value; tokenise | LND | 2 | 1 | L | 2 |
| 44 | Landing hero headline uses `line-height: 0.90` — below 1.0; correct for large display headlines but unusual; confirm intentional | LND | 3 | 1 | L | 1 |
| 45 | Landing hero headline at `line-height: 0.90` — confirm no ascender clipping at mobile sizes | LND | 3 | 2 | L | 2 |
| 46 | Landing `.section__title` uses `line-height: 1.02` — just above 1.0; correct for large editorial headlines; confirm token | LND | 3 | 1 | L | 2 |
| 47 | Landing proof stat value uses `line-height: 0.9` (implicitly, as condensed display) — confirm no clipping | LND | 2 | 1 | L | 2 |
| 48 | Add `--lh-tight`, `--lh-display`, `--lh-body`, `--lh-loose` tokens to landing `:root` | LND | 4 | 2 | M | 2 |
| 49 | start.html body text uses `line-height: 1.65` — raw value; tokenise | STR | 3 | 1 | L | 2 |
| 50 | start.html `.field-hint` uses `line-height: 1.5` — raw value; tokenise | STR | 2 | 1 | L | 2 |
| 51 | start.html hint steps `ol` uses `line-height: 1.9` — loose; at the top of the range; confirm this is appropriate for instructional list items | STR | 3 | 1 | L | 2 |
| 52 | start.html `line-height: 1.9` is above even the loose range (1.7–1.8) — evaluate if this should be capped at 1.8 | STR | 3 | 1 | L | 2 |
| 53 | start.html `.how-to-note` uses `line-height: 1.6` — raw value; tokenise | STR | 2 | 1 | L | 2 |
| 54 | start.html import hint copy uses `line-height: 1.5` — raw value; tokenise | STR | 2 | 1 | L | 2 |
| 55 | start.html textarea uses `line-height: 1.5` — raw value; tokenise | STR | 2 | 1 | L | 2 |
| 56 | start.html `.done-next__desc` body text — confirm explicit line-height | STR | 2 | 1 | L | 2 |
| 57 | start.html step hero number at Barlow Condensed 52px — confirm `line-height: 0.9` or similar tight value set | STR | 3 | 1 | L | 2 |
| 58 | Add `--lh-tight`, `--lh-body`, `--lh-hint` tokens to start.html `:root` | STR | 4 | 2 | M | 2 |
| 59 | V8 hero name line-height at clamp(72px–108px) — confirm `--lh-tight` doesn't produce excessive leading at max size | V8 | 3 | 1 | L | 2 |
| 60 | V8 `.bio-strip__text` with long artist bios (200+ chars) — at 1.65 line-height and 15px, confirm readability on 375px | V8 | 4 | 2 | L | 2 |
| 61 | All long-form text elements across all pages — confirm `line-height` is in the 1.65–1.75 reading range | ALL | 4 | 2 | L | 2 |
| 62 | All display text elements (stats, hero names, countdowns) — confirm `line-height: 1` or `--lh-tight` | ALL | 3 | 2 | L | 2 |
| 63 | All label/eyebrow text — confirm `line-height: var(--lh-label)` or equivalent | ALL | 3 | 2 | L | 2 |
| 64 | Check all form field `line-height` values — textarea needs at least 1.5, single-line inputs can use 1 | ALL | 3 | 2 | L | 2 |
| 65 | V8 mobile: at 375px, body text at `--lh-body` — confirm no text collision when content is dense | V8 | 3 | 2 | L | 3 |
| 66 | Admin at 375px — confirm column layouts don't create text collision with current line-height values | ADM | 3 | 2 | L | 3 |
| 67 | Landing at 375px — confirm `.hero__sub` at `line-height: 1.7` doesn't create awkward multi-line leading | LND | 3 | 2 | L | 3 |
| 68 | Document the three-tier line-height system in DESIGN_SYSTEM_SPEC.md with clear definitions and permitted values | ALL | 3 | 1 | L | 3 |
| 69 | After tokenisation: grep for any remaining raw line-height numeric values outside token declarations | ALL | 4 | 2 | L | 3 |
| 70 | Check admin `.topbar-title` at `16px` — does it have explicit line-height or inherit from browser? | ADM | 2 | 1 | L | 2 |
| 71 | V8 `body` element `line-height` — confirm it's explicitly set to `var(--lh-body)` in base styles | V8 | 4 | 1 | L | 1 |
| 72 | Admin `body` element line-height — confirm explicitly set | ADM | 4 | 1 | L | 1 |
| 73 | Landing `body` element line-height — confirm explicitly set | LND | 4 | 1 | L | 1 |
| 74 | start.html `body` element line-height — confirm explicitly set | STR | 4 | 1 | L | 1 |
| 75 | V8 `html { line-height: 1.5 }` or equivalent base reset — confirm present | V8 | 3 | 1 | L | 1 |
| 76 | The browser default line-height is ~1.2 — all four pages should override this explicitly to avoid inherited values | ALL | 3 | 1 | L | 1 |
| 77 | V8 error message text (form validation, API errors) — confirm explicit line-height set | V8 | 2 | 1 | L | 2 |
| 78 | Admin error message text — confirm explicit line-height | ADM | 2 | 1 | L | 2 |
| 79 | start.html `.field-error-msg` at `11.5px` — confirm explicit line-height; small text needs controlled leading | STR | 3 | 1 | L | 2 |
| 80 | V8 tooltip text — confirm explicit line-height set on any tooltip or popover elements | V8 | 2 | 1 | L | 3 |
| 81 | Admin tooltip text — confirm explicit line-height | ADM | 2 | 1 | L | 3 |
| 82 | V8 campaign state countdown unit labels — confirm explicit line-height; small uppercase text needs tight control | V8 | 3 | 1 | L | 2 |
| 83 | V8 `line-height: var(--lh-body)` on the bio text at line 1183 — confirm the token reference is present and not still the raw 1.65 value | V8 | 4 | 1 | L | 1 |
| 84 | V8 pre-release state copy — confirm all text in pre-release overlay uses correct line-height tokens | V8 | 2 | 1 | L | 2 |
| 85 | V8 gig mode overlay text — confirm explicit line-height | V8 | 2 | 1 | L | 2 |
| 86 | Landing FAQ answers — confirm explicit `line-height` in the 1.65–1.75 range for the longer answer text | LND | 3 | 1 | L | 2 |
| 87 | Landing FAQ question text — confirm explicit line-height | LND | 2 | 1 | L | 2 |
| 88 | Landing pricing feature list items — confirm explicit line-height for the bullet list text | LND | 2 | 1 | L | 2 |
| 89 | The three-tier system: verify that no line-height value below 1.45 appears on body text across any page | ALL | 4 | 2 | L | 3 |
| 90 | The three-tier system: verify that no line-height value above 1.8 appears on body text (too loose) | ALL | 3 | 2 | L | 3 |
| 91 | Exception: very small text (10–11px) can benefit from higher line-height (1.7–1.8) to aid legibility | ALL | 2 | 1 | L | 3 |
| 92 | V8 `--lh-label` usage: confirm which elements use this token and that the value is appropriate | V8 | 2 | 1 | L | 2 |
| 93 | Admin fan list email row — at 13px, confirm explicit line-height prevents text from touching adjacent rows | ADM | 2 | 1 | L | 3 |
| 94 | Admin snap card list items in the admin snap manager — confirm line-height per row | ADM | 2 | 1 | L | 3 |
| 95 | V8 `.release-card` track list items — confirm explicit line-height per track row | V8 | 2 | 1 | L | 2 |
| 96 | start.html `.moment-card__desc` at `12px` — confirm explicit line-height in reading range | STR | 2 | 1 | L | 2 |
| 97 | Add line-height to the QA checklist: "all visible text elements have explicit line-height" | ALL | 3 | 1 | L | 4 |
| 98 | After tokenisation: verify via screenshot that no text line-height feels too cramped or too airy on any page | ALL | 4 | 2 | L | 4 |
| 99 | Check if admin's `font-size: 16px` base on `html` implies a `line-height` — confirm it also sets `line-height` | ADM | 2 | 1 | L | 1 |
| 100 | Final check: three line-height values only across all four pages — tight (display), reading (body), hint (small) — any value outside these three must be justified | ALL | 4 | 2 | M | 4 |

## Wave Summary
- **Wave 1** — 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 19, 44, 71, 72, 73, 74, 75, 76, 83, 99
- **Wave 2** — 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 70, 77, 78, 79, 82, 84, 85, 86, 87, 88, 92, 95, 96
- **Wave 3** — 31, 32, 65, 66, 67, 68, 69, 80, 81, 89, 90, 91, 93, 94
- **Wave 4** — 97, 98, 100
- **Wave 5** — (none)
- **Wave 6** — (none)
