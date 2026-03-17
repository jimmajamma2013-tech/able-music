# Dimension B10 — Paragraph Measure
**Category:** Typography & Spacing
**Phase:** 5 (Typography)
**Status:** Not started

Paragraph measure — the width of a text column in characters — is the most consistently ignored typographic constraint in web design. The optimal reading measure for body copy is 60–75 characters per line. Lines wider than 75 characters force the eye to travel too far between line ends, causing readers to lose their place and slowing comprehension. This affects ABLE most acutely on the landing page (where artist bios, FAQ answers, and the value proposition sub-copy often span the full container width at desktop), and on the admin page (where nudge card descriptions and instruction text can stretch to fill fluid columns). On V8, the artist bio paragraph is the primary concern — it spans the full 430px iOS shell width with no `max-width` or `max-ch` constraint, meaning at 18px that produces approximately 38–42 characters per line (too narrow) rather than the issue being too wide, but once a small artist name creates a wider hero container, this must be verified. Full compliance means all long-form body text blocks (artist bio, FAQ answers, landing sub-copy, onboarding instructions, feature card descriptions) have an explicit `max-width` of no more than `65ch` applied in CSS, ensuring readable line lengths regardless of container width.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Define `--measure-body: 65ch` and `--measure-wide: 75ch` as CSS custom properties in the `:root` block of every page | ALL | 5 | 1 | L | 1 |
| 2 | Apply `max-width: var(--measure-body)` to the V8 artist bio paragraph element | V8 | 5 | 1 | L | 1 |
| 3 | Apply `max-width: var(--measure-body)` to all LND `<p>` elements in hero and section sub-copy | LND | 5 | 1 | L | 1 |
| 4 | Apply `max-width: var(--measure-body)` to all LND FAQ answer text blocks | LND | 5 | 1 | L | 1 |
| 5 | Apply `max-width: var(--measure-body)` to all LND feature card description paragraphs | LND | 4 | 1 | L | 1 |
| 6 | Apply `max-width: var(--measure-body)` to all LND "how it works" step description paragraphs | LND | 4 | 1 | L | 1 |
| 7 | Apply `max-width: var(--measure-body)` to all ADM nudge card body text paragraphs | ADM | 4 | 1 | L | 1 |
| 8 | Apply `max-width: var(--measure-body)` to the ADM gold lock overlay description paragraph | ADM | 4 | 1 | L | 1 |
| 9 | Apply `max-width: var(--measure-body)` to the STR onboarding instruction paragraphs at each step | STR | 4 | 1 | L | 1 |
| 10 | Apply `max-width: var(--measure-body)` to the STR "how to find this" hint panel text | STR | 3 | 1 | L | 1 |
| 11 | Apply `max-width: var(--measure-body)` to the LND testimonial quote text blocks | LND | 4 | 1 | L | 1 |
| 12 | Apply `max-width: var(--measure-body)` to the LND pricing card description paragraphs | LND | 3 | 1 | L | 1 |
| 13 | Apply `max-width: var(--measure-body)` to the LND footer CTA sub-copy paragraph | LND | 3 | 1 | L | 1 |
| 14 | Apply `max-width: var(--measure-body)` to the V8 snap card body text paragraphs | V8 | 3 | 1 | L | 1 |
| 15 | Apply `max-width: var(--measure-body)` to the V8 fan capture section instruction paragraph | V8 | 3 | 1 | L | 1 |
| 16 | Apply `max-width: var(--measure-body)` to the ADM empty state description paragraph in the fan list | ADM | 3 | 1 | L | 1 |
| 17 | Apply `max-width: var(--measure-body)` to the ADM empty state description in the analytics section | ADM | 3 | 1 | L | 1 |
| 18 | Apply `max-width: var(--measure-body)` to the V8 support section benefit description paragraphs | V8 | 3 | 1 | L | 2 |
| 19 | Apply `max-width: var(--measure-body)` to the V8 merch item description text | V8 | 3 | 1 | L | 2 |
| 20 | Apply `max-width: var(--measure-body)` to the STR done screen "what happens next" instruction paragraphs | STR | 3 | 1 | L | 2 |
| 21 | Audit the V8 artist bio at 375px viewport — confirm the current line length produces 38–50 characters per line and does not need the measure constraint | V8 | 5 | 2 | L | 1 |
| 22 | Audit the V8 artist bio at 430px viewport — confirm the line length is still within the 60–75ch comfortable range | V8 | 5 | 2 | L | 1 |
| 23 | Audit the LND hero sub-copy at 375px — confirm line length is comfortable (30–50 chars is acceptable at this size) | LND | 4 | 2 | L | 1 |
| 24 | Audit the LND hero sub-copy at 1440px desktop — this is most likely where the too-wide problem appears; confirm measure constraint is applied | LND | 5 | 2 | L | 1 |
| 25 | Audit LND feature card descriptions at 1440px — confirm `max-width` constraint prevents excessively long lines | LND | 4 | 2 | L | 1 |
| 26 | Audit LND FAQ answers at 1440px — confirm measure constraint prevents lines wider than 75 characters | LND | 5 | 2 | L | 1 |
| 27 | Audit ADM nudge cards at 375px — confirm text wraps at a comfortable measure within the card width | ADM | 4 | 2 | L | 1 |
| 28 | Audit ADM Campaign HQ description text at 375px — confirm legible measure | ADM | 4 | 2 | L | 1 |
| 29 | Confirm V8 fan capture section instruction text is centred and constrained so it reads as a focused moment, not a sprawling paragraph | V8 | 4 | 1 | L | 2 |
| 30 | Confirm STR step instruction text is centred and constrained on STR so long instructions don't run edge-to-edge | STR | 4 | 1 | L | 2 |
| 31 | Confirm LND section sub-headlines (`--text-xl` sized) are also measure-constrained — large sub-headings that run too wide lose impact | LND | 4 | 1 | L | 2 |
| 32 | Confirm the V8 snap card body text `max-width` does not conflict with the snap card component width (it should be set relative to the card, not the viewport) | V8 | 3 | 2 | M | 2 |
| 33 | Confirm the ADM nudge card body text `max-width` is relative to the nudge card container, not the page width | ADM | 3 | 2 | M | 2 |
| 34 | Confirm `max-width: var(--measure-body)` does not clip text on the smallest (375px) mobile viewport where containers are already narrow | ALL | 4 | 2 | L | 2 |
| 35 | On mobile (375px), confirm that `--measure-body: 65ch` is effectively wider than the viewport so the constraint is only active at larger sizes | ALL | 4 | 2 | L | 2 |
| 36 | Consider adding a media query that relaxes `--measure-body` to `none` below 480px where the viewport itself is the natural constraint | ALL | 3 | 2 | M | 3 |
| 37 | Apply `max-width: var(--measure-body)` to the LND "artists on ABLE" section intro paragraph | LND | 3 | 1 | L | 2 |
| 38 | Apply `max-width: var(--measure-body)` to any LND section that uses a `.section__sub` element | LND | 4 | 1 | L | 2 |
| 39 | Apply `max-width: var(--measure-wide)` to the LND comparison section intro paragraph (wider measure acceptable for shorter context-setting copy) | LND | 3 | 1 | L | 2 |
| 40 | Confirm the V8 pre-release state "coming soon" description paragraph uses a measure constraint | V8 | 3 | 1 | L | 2 |
| 41 | Confirm the V8 gig mode intro paragraph (if any) uses a measure constraint | V8 | 3 | 1 | L | 2 |
| 42 | Confirm STR "why this matters" or contextual explanation text at each wizard step uses a measure constraint | STR | 3 | 1 | L | 2 |
| 43 | Confirm LND proof strip item descriptions (short 1–2 sentence explanations) are constrained within their column width | LND | 3 | 1 | L | 2 |
| 44 | Confirm ADM freelancer bio paragraph uses a measure constraint | ADM | 3 | 1 | L | 2 |
| 45 | Confirm ADM freelancer rate card service description text uses a measure constraint | ADM | 3 | 1 | L | 2 |
| 46 | Confirm ADM freelancer booking enquiry confirmation message paragraph uses a measure constraint | ADM | 3 | 1 | L | 2 |
| 47 | Apply `max-width: var(--measure-body)` to the V8 connections section collaborator bio text (if present) | V8 | 2 | 1 | L | 3 |
| 48 | Apply `max-width: var(--measure-body)` to the STR colour choice description text | STR | 2 | 1 | L | 3 |
| 49 | Apply `max-width: var(--measure-body)` to the STR import explanation text | STR | 3 | 1 | L | 3 |
| 50 | Apply `max-width: var(--measure-body)` to the STR CTA type explanation text | STR | 3 | 1 | L | 3 |
| 51 | Confirm the LND "what is ABLE" section intro paragraph is constrained at desktop breakpoints | LND | 4 | 1 | L | 2 |
| 52 | Confirm the LND hero `p` tag does not extend wider than `65ch` at any desktop viewport width | LND | 5 | 2 | L | 1 |
| 53 | Confirm that measure constraints use `ch` units (width of the "0" character) rather than `em` for accurate character-count targeting | ALL | 4 | 1 | L | 2 |
| 54 | Confirm that `max-width` measure constraints are applied to the text element itself, not a parent wrapper, to prevent accidental layout breaks | ALL | 3 | 2 | M | 2 |
| 55 | Confirm that centred text blocks on LND use `margin-inline: auto` alongside `max-width: var(--measure-body)` to stay visually centred | LND | 3 | 1 | L | 2 |
| 56 | Confirm that centred text blocks on V8 fan capture section use `margin-inline: auto` alongside `max-width` | V8 | 3 | 1 | L | 2 |
| 57 | Confirm that left-aligned text blocks (ADM nudge cards, STR instructions) use `max-width` without centring to maintain left alignment | ADM | 2 | 1 | L | 3 |
| 58 | Confirm V8 snap card body text does not collide with card padding when measure constraint is applied | V8 | 3 | 2 | M | 3 |
| 59 | Test V8 artist bio measure constraint at 430px — confirm it is effective and bio does not feel pinched | V8 | 4 | 2 | L | 3 |
| 60 | Test LND hero sub-copy measure constraint at 1440px — confirm the text column looks deliberately framed, not cut short | LND | 5 | 2 | L | 3 |
| 61 | Test LND FAQ answer measure at 1440px — confirm reading experience feels like a quality content page | LND | 5 | 2 | L | 3 |
| 62 | Test ADM nudge card text measure at 375px — confirm it reads as a focused, tight card rather than a wide announcement | ADM | 4 | 2 | L | 3 |
| 63 | Test STR step instruction text at 375px — confirm measure constraint does not make instructions feel chopped | STR | 4 | 2 | L | 3 |
| 64 | Confirm that headline text (h1, h2, h3) is explicitly excluded from the measure constraint — headlines benefit from full-width presence | ALL | 3 | 1 | L | 2 |
| 65 | Confirm that stat display numbers on ADM are explicitly excluded from measure constraints | ADM | 2 | 1 | L | 2 |
| 66 | Confirm that CTA button text is explicitly excluded from measure constraints | ALL | 2 | 1 | L | 2 |
| 67 | Confirm that nav and tab bar text is explicitly excluded from measure constraints | ALL | 2 | 1 | L | 2 |
| 68 | Confirm that label/eyebrow text is explicitly excluded from measure constraints | ALL | 2 | 1 | L | 2 |
| 69 | Confirm LND pricing card feature list items (short bullet phrases) are excluded from measure constraints — they are self-contained | LND | 2 | 1 | L | 3 |
| 70 | Apply `max-width: var(--measure-body)` to any fan-facing confirmation message text on V8 (post sign-up, post CTA tap) | V8 | 3 | 1 | L | 3 |
| 71 | Apply `max-width: var(--measure-body)` to any ADM success message description text | ADM | 3 | 1 | L | 3 |
| 72 | Apply `max-width: var(--measure-body)` to any error message body text across all four pages | ALL | 3 | 1 | L | 3 |
| 73 | Apply `max-width: var(--measure-body)` to the ADM tier upgrade modal description paragraph | ADM | 3 | 1 | L | 3 |
| 74 | Apply `max-width: var(--measure-body)` to the ADM Campaign HQ state description text that appears below the state selector | ADM | 3 | 1 | L | 3 |
| 75 | Apply `max-width: var(--measure-body)` to any toast notification body text on ADM that exceeds a single line | ADM | 2 | 1 | L | 4 |
| 76 | Apply `max-width: var(--measure-body)` to the STR completion screen "share your profile" instruction paragraph | STR | 3 | 1 | L | 3 |
| 77 | Confirm that V8 in glass theme doesn't have overlapping text when measure constraint is applied against a background artwork | V8 | 4 | 2 | M | 3 |
| 78 | Confirm that V8 in light theme doesn't have readability issues when measure constraint produces multi-line bio text | V8 | 3 | 2 | M | 3 |
| 79 | Confirm that V8 in contrast theme renders constrained paragraphs correctly with full opacity | V8 | 3 | 2 | M | 3 |
| 80 | Confirm LND mobile (375px) feature card descriptions fill their card width appropriately — at 375px the measure constraint should not be narrower than the card | LND | 3 | 2 | L | 3 |
| 81 | Confirm ADM mobile (375px) nudge card descriptions fill the card width without excessive white space | ADM | 3 | 2 | L | 3 |
| 82 | Add a Playwright screenshot test that captures V8 bio section at 1440px width to confirm measure constraint is visually active | V8 | 3 | 3 | L | 4 |
| 83 | Add a Playwright screenshot test that captures LND FAQ section at 1440px width to confirm measure constraint | LND | 3 | 3 | L | 4 |
| 84 | Add a Playwright screenshot test that captures LND hero sub-copy at 1440px to confirm measure constraint | LND | 4 | 3 | L | 4 |
| 85 | Document `--measure-body: 65ch` and `--measure-wide: 75ch` in DESIGN_SYSTEM_SPEC.md with the typographic rationale | ALL | 3 | 1 | L | 4 |
| 86 | Document which element types receive measure constraints in DESIGN_SYSTEM_SPEC.md (paragraphs, descriptions, bios, FAQ answers) | ALL | 3 | 1 | L | 4 |
| 87 | Document which element types are excluded from measure constraints in DESIGN_SYSTEM_SPEC.md (headlines, labels, buttons, stats) | ALL | 3 | 1 | L | 4 |
| 88 | Add measure constraint to CLAUDE.md working rules: "all long-form body paragraphs must have max-width: var(--measure-body)" | ALL | 3 | 1 | L | 4 |
| 89 | Add measure to QA checklist: "check all long-form paragraphs have max-width constraint at 1440px" | ALL | 3 | 1 | L | 5 |
| 90 | Confirm V8 snap card body text has not been excluded from measure constraints because snap cards have fixed card widths that handle the constraint naturally | V8 | 2 | 1 | L | 3 |
| 91 | Confirm that LND two-column sections use the card column as the natural measure constraint rather than applying `max-width` to individual paragraphs | LND | 3 | 2 | M | 3 |
| 92 | Confirm that ADM card-based sections use the card width as the natural constraint, with `max-width` only needed in full-width sections | ADM | 3 | 2 | M | 3 |
| 93 | Confirm that STR single-column layout at 375px produces natural measure constraint without needing explicit `max-width` on every paragraph | STR | 3 | 2 | L | 3 |
| 94 | Identify any LND desktop section where body text is inside a 1-column full-width container and needs explicit measure constraint (the primary risk) | LND | 5 | 2 | L | 2 |
| 95 | Identify any ADM desktop section with full-width description text that needs explicit measure constraint | ADM | 4 | 2 | L | 2 |
| 96 | Identify any V8 desktop or large-screen scenario where the profile renders wider than 430px and bio text would need the measure constraint | V8 | 3 | 2 | L | 2 |
| 97 | Confirm V8 renders in a max-width constrained container (e.g., `max-width: 430px; margin-inline: auto`) so measure constraints on V8 elements are already bounded | V8 | 4 | 1 | L | 1 |
| 98 | Confirm LND has a maximum content container width (e.g., 1200px) and that body text within it still needs `--measure-body` as sections use full-width backgrounds | LND | 4 | 1 | L | 1 |
| 99 | After all measure constraints applied, conduct a reading-speed assessment by reading the LND FAQ aloud at 1440px — confirm comfortable eye travel | LND | 4 | 2 | L | 5 |
| 100 | Final audit: confirm no long-form paragraph (3+ lines at desktop viewport) exists anywhere on any page without an explicit measure constraint | ALL | 5 | 2 | L | 6 |
