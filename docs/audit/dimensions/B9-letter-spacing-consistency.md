# Dimension B9 — Letter Spacing Consistency
**Category:** Typography & Spacing
**Phase:** 5 (Typography)
**Status:** Not started

Letter spacing on uppercase labels, eyebrows, and stat headings is one of the clearest signals of a polished typographic system. ABLE currently has a mixed state: some elements use pixel-based values (1.5px, 2.5px) which do not scale with font-size and break at non-standard resolutions, while others use em-based values ranging from 0.06em to 0.18em with no governing rule. The correct system is: all uppercase label text (section eyebrows, CTA type labels, stat category labels, tier badges, step indicators) uses a value in the 0.08–0.14em range expressed exclusively in em units. No pixel-based letter-spacing is permitted anywhere in the codebase. Body copy and display headlines use `letter-spacing: normal` or a value no higher than 0.02em to avoid visual tension. Full compliance produces a codebase where every small-caps or uppercase string has one of two values — `--ls-wide: 0.1em` for primary labels, `--ls-xwide: 0.14em` for the most prominent category markers — and all other text has normal or near-zero tracking.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Define `--ls-wide: 0.1em` and `--ls-xwide: 0.14em` as CSS custom properties in the `:root` block of every page | ALL | 5 | 1 | L | 1 |
| 2 | Audit all `letter-spacing` declarations on V8 and list every pixel-based value found | V8 | 5 | 1 | L | 1 |
| 3 | Audit all `letter-spacing` declarations on ADM and list every pixel-based value found | ADM | 5 | 1 | L | 1 |
| 4 | Audit all `letter-spacing` declarations on LND and list every pixel-based value found | LND | 5 | 1 | L | 1 |
| 5 | Audit all `letter-spacing` declarations on STR and list every pixel-based value found | STR | 5 | 1 | L | 1 |
| 6 | Convert all pixel-based `letter-spacing` values on V8 to em equivalents using the element's font-size as the base | V8 | 5 | 2 | M | 1 |
| 7 | Convert all pixel-based `letter-spacing` values on ADM to em equivalents | ADM | 5 | 2 | M | 1 |
| 8 | Convert all pixel-based `letter-spacing` values on LND to em equivalents | LND | 5 | 2 | M | 1 |
| 9 | Convert all pixel-based `letter-spacing` values on STR to em equivalents | STR | 5 | 2 | M | 1 |
| 10 | Apply `letter-spacing: var(--ls-wide)` to all section eyebrow labels on V8 (e.g., "MUSIC", "SHOWS", "MERCH") | V8 | 4 | 1 | L | 1 |
| 11 | Apply `letter-spacing: var(--ls-wide)` to all section eyebrow labels on ADM | ADM | 4 | 1 | L | 1 |
| 12 | Apply `letter-spacing: var(--ls-wide)` to all section eyebrow labels on LND | LND | 4 | 1 | L | 1 |
| 13 | Apply `letter-spacing: var(--ls-wide)` to all section eyebrow labels on STR | STR | 4 | 1 | L | 1 |
| 14 | Apply `letter-spacing: var(--ls-wide)` to V8 stat category label text | V8 | 3 | 1 | L | 1 |
| 15 | Apply `letter-spacing: var(--ls-wide)` to ADM stat category label text | ADM | 3 | 1 | L | 1 |
| 16 | Apply `letter-spacing: var(--ls-xwide)` to V8 CTA type indicator labels (if uppercase) | V8 | 3 | 1 | L | 2 |
| 17 | Apply `letter-spacing: var(--ls-wide)` to V8 platform pill labels | V8 | 3 | 1 | L | 2 |
| 18 | Apply `letter-spacing: var(--ls-wide)` to ADM tier badge pill text | ADM | 3 | 1 | L | 2 |
| 19 | Apply `letter-spacing: var(--ls-wide)` to ADM Campaign HQ state button labels | ADM | 3 | 1 | L | 2 |
| 20 | Apply `letter-spacing: var(--ls-wide)` to STR step indicator labels | STR | 3 | 1 | L | 2 |
| 21 | Apply `letter-spacing: var(--ls-xwide)` to LND hero eyebrow text above the headline | LND | 4 | 1 | L | 2 |
| 22 | Apply `letter-spacing: var(--ls-wide)` to LND pricing tier label text | LND | 3 | 1 | L | 2 |
| 23 | Apply `letter-spacing: var(--ls-wide)` to LND "how it works" step number labels | LND | 2 | 1 | L | 2 |
| 24 | Confirm V8 hero artist name uses `letter-spacing: normal` or a value no higher than -0.02em (condensed display text should track tight) | V8 | 4 | 1 | L | 2 |
| 25 | Confirm LND hero headline uses `letter-spacing` no higher than 0.01em (large display text should not be over-tracked) | LND | 4 | 1 | L | 2 |
| 26 | Confirm all body paragraph text on V8 uses `letter-spacing: normal` | V8 | 3 | 1 | L | 2 |
| 27 | Confirm all body paragraph text on ADM uses `letter-spacing: normal` | ADM | 3 | 1 | L | 2 |
| 28 | Confirm all body paragraph text on LND uses `letter-spacing: normal` | LND | 3 | 1 | L | 2 |
| 29 | Confirm all body paragraph text on STR uses `letter-spacing: normal` | STR | 3 | 1 | L | 2 |
| 30 | Confirm V8 `.bio-strip__text` uses `letter-spacing: normal` — bio text should never be tracked | V8 | 3 | 1 | L | 2 |
| 31 | Confirm ADM nudge card body text uses `letter-spacing: normal` | ADM | 2 | 1 | L | 2 |
| 32 | Confirm LND FAQ answer text uses `letter-spacing: normal` | LND | 2 | 1 | L | 2 |
| 33 | Confirm STR onboarding instruction paragraphs use `letter-spacing: normal` | STR | 2 | 1 | L | 2 |
| 34 | Remove any `letter-spacing: 0.06em` value on V8 and map to `--ls-wide` (0.1em) or `normal` depending on whether the element is uppercase | V8 | 3 | 1 | L | 2 |
| 35 | Remove any `letter-spacing: 0.18em` value on V8 — 0.18em is above the defined range; reduce to `--ls-xwide: 0.14em` | V8 | 4 | 1 | L | 2 |
| 36 | Remove any `letter-spacing: 0.18em` value on ADM — reduce to `--ls-xwide` | ADM | 4 | 1 | L | 2 |
| 37 | Remove any `letter-spacing: 0.18em` value on LND — reduce to `--ls-xwide` | LND | 4 | 1 | L | 2 |
| 38 | Remove any `letter-spacing: 0.18em` value on STR — reduce to `--ls-xwide` | STR | 4 | 1 | L | 2 |
| 39 | Confirm V8 gig mode "on tonight" badge uses `letter-spacing: var(--ls-wide)` if uppercase | V8 | 2 | 1 | L | 2 |
| 40 | Confirm V8 pre-release countdown unit labels use consistent letter-spacing | V8 | 2 | 1 | L | 2 |
| 41 | Confirm ADM section headings do not use letter-spacing (mixed case headings should not be tracked) | ADM | 3 | 1 | L | 2 |
| 42 | Confirm LND section headings do not use letter-spacing | LND | 3 | 1 | L | 2 |
| 43 | Confirm V8 section headings ("Music", "Shows") do not use letter-spacing | V8 | 3 | 1 | L | 2 |
| 44 | Apply `letter-spacing: var(--ls-wide)` to V8 fan capture section "JOIN" or similar call-to-action label if uppercase | V8 | 2 | 1 | L | 3 |
| 45 | Apply `letter-spacing: var(--ls-wide)` to V8 merch section "MERCH" or similar section marker | V8 | 2 | 1 | L | 3 |
| 46 | Apply `letter-spacing: var(--ls-wide)` to V8 support section tier name label if uppercase | V8 | 2 | 1 | L | 3 |
| 47 | Confirm ADM analytics section "VIEWS", "CLICKS", "FANS" category labels all use `var(--ls-wide)` | ADM | 3 | 1 | L | 2 |
| 48 | Confirm ADM freelancer section "CREDITS", "PORTFOLIO", "RATE CARD" labels use `var(--ls-wide)` | ADM | 2 | 1 | L | 3 |
| 49 | Confirm LND proof strip category labels ("ARTISTS", "FANS") use `var(--ls-wide)` | LND | 3 | 1 | L | 2 |
| 50 | Confirm LND comparison section "ABLE" vs competitor column headers use `var(--ls-wide)` | LND | 3 | 1 | L | 2 |
| 51 | Confirm STR CTA type selector labels use `var(--ls-wide)` if rendered in uppercase | STR | 2 | 1 | L | 3 |
| 52 | Confirm STR genre/vibe chip labels use `var(--ls-wide)` if uppercase | STR | 2 | 1 | L | 3 |
| 53 | Confirm no button text across all pages uses letter-spacing above 0.05em — button labels should not be over-tracked | ALL | 3 | 2 | L | 3 |
| 54 | Confirm V8 CTA button labels use `letter-spacing: normal` or no more than 0.04em | V8 | 3 | 1 | L | 3 |
| 55 | Confirm LND CTA button labels use `letter-spacing: normal` or no more than 0.04em | LND | 3 | 1 | L | 3 |
| 56 | Confirm STR "Next" and "Back" button labels use `letter-spacing: normal` | STR | 2 | 1 | L | 3 |
| 57 | Confirm ADM action button labels ("Save", "Add show", etc.) use `letter-spacing: normal` | ADM | 2 | 1 | L | 3 |
| 58 | Verify V8 light theme does not override letter-spacing tokens in its theme block | V8 | 4 | 2 | M | 3 |
| 59 | Verify V8 glass theme does not override letter-spacing tokens in its theme block | V8 | 4 | 2 | M | 3 |
| 60 | Verify V8 contrast theme does not override letter-spacing tokens in its theme block | V8 | 4 | 2 | M | 3 |
| 61 | Verify ADM light theme (if it exists) does not override letter-spacing tokens | ADM | 3 | 2 | M | 3 |
| 62 | Confirm that dynamically inserted snap card eyebrow text (via JS) applies letter-spacing through CSS classes, not inline styles | V8 | 3 | 2 | M | 3 |
| 63 | Confirm that dynamically inserted CTA labels on V8 apply letter-spacing through CSS classes | V8 | 3 | 2 | M | 3 |
| 64 | Confirm that ADM-generated preview content (fan-facing preview in admin) applies correct letter-spacing tokens | ADM | 3 | 2 | M | 3 |
| 65 | Confirm V8 `.snap-card__tag` or category label uses `var(--ls-wide)` if uppercase | V8 | 2 | 1 | L | 3 |
| 66 | Confirm V8 connections section collaborator role text uses `letter-spacing: normal` (mixed case, not tracked) | V8 | 2 | 1 | L | 3 |
| 67 | Confirm ADM gold lock overlay "PRO" or tier name label uses `var(--ls-xwide)` | ADM | 2 | 1 | L | 3 |
| 68 | Confirm LND pricing card "FREE", "ARTIST", "PRO" tier headers use `var(--ls-xwide)` | LND | 3 | 1 | L | 2 |
| 69 | Confirm LND footer tagline text uses `letter-spacing: normal` | LND | 2 | 1 | L | 3 |
| 70 | Confirm V8 tab bar label text uses `letter-spacing: normal` or `var(--ls-wide)` depending on whether labels are uppercase | V8 | 2 | 1 | L | 3 |
| 71 | Confirm ADM tab bar label text is consistent | ADM | 2 | 1 | L | 3 |
| 72 | Confirm STR progress step labels use consistent `letter-spacing` | STR | 2 | 1 | L | 3 |
| 73 | Confirm V8 `.release-card__label` uses `var(--ls-wide)` if it is an uppercase format indicator (e.g., "SINGLE", "EP") | V8 | 2 | 1 | L | 3 |
| 74 | Confirm V8 `.event-card__status` label (e.g., "TONIGHT", "UPCOMING") uses `var(--ls-wide)` | V8 | 2 | 1 | L | 3 |
| 75 | After converting pixel letter-spacing values to em, visually verify that no label text looks too tight or too airy at small sizes | ALL | 4 | 2 | L | 3 |
| 76 | After applying `--ls-wide` tokens, take a Playwright screenshot of V8 section headers to confirm visual parity with the previous state | V8 | 3 | 2 | L | 3 |
| 77 | After applying `--ls-wide` tokens on LND, take a Playwright screenshot to confirm visual parity | LND | 3 | 2 | L | 3 |
| 78 | Confirm that Barlow Condensed display text on V8 does not have positive letter-spacing applied — condensed faces track poorly with extra spacing | V8 | 4 | 1 | L | 2 |
| 79 | Confirm that Barlow Condensed text on STR step numbers does not have positive letter-spacing | STR | 3 | 1 | L | 2 |
| 80 | Confirm that Plus Jakarta Sans on ADM only has letter-spacing applied to uppercase label elements, not headings | ADM | 3 | 1 | L | 2 |
| 81 | Confirm that DM Sans on V8 only has letter-spacing applied to uppercase label elements | V8 | 3 | 1 | L | 2 |
| 82 | Confirm that `text-transform: uppercase` and `letter-spacing` always appear together on V8 — uppercase without tracking looks amateurish | V8 | 4 | 2 | M | 2 |
| 83 | Confirm that `text-transform: uppercase` and `letter-spacing` always appear together on ADM | ADM | 4 | 2 | M | 2 |
| 84 | Confirm that `text-transform: uppercase` and `letter-spacing` always appear together on LND | LND | 4 | 2 | M | 2 |
| 85 | Confirm that `text-transform: uppercase` and `letter-spacing` always appear together on STR | STR | 4 | 2 | M | 2 |
| 86 | Add a CSS comment in each `:root` block documenting that `--ls-wide` is for uppercase labels and `--ls-xwide` is for high-prominence markers | ALL | 2 | 1 | L | 4 |
| 87 | Confirm V8 "ABLE" wordmark in the profile page header does not have manually applied letter-spacing that conflicts with the font's own tracking | V8 | 2 | 1 | L | 4 |
| 88 | Confirm LND "ABLE" wordmark in the nav does not have manually applied letter-spacing | LND | 2 | 1 | L | 4 |
| 89 | Confirm ADM "ABLE" wordmark in the topbar does not have manually applied letter-spacing | ADM | 2 | 1 | L | 4 |
| 90 | Confirm STR "ABLE" wordmark in the wizard header does not have manually applied letter-spacing | STR | 2 | 1 | L | 4 |
| 91 | Add a Playwright assertion that checks the computed letter-spacing on V8 section eyebrow labels matches `--ls-wide` | V8 | 3 | 3 | L | 4 |
| 92 | Add a Playwright assertion that checks the computed letter-spacing on ADM stat category labels matches `--ls-wide` | ADM | 3 | 3 | L | 4 |
| 93 | Add a Playwright assertion that checks the computed letter-spacing on LND pricing tier headers matches `--ls-xwide` | LND | 3 | 3 | L | 4 |
| 94 | Document the two letter-spacing tokens (`--ls-wide`, `--ls-xwide`) in DESIGN_SYSTEM_SPEC.md with examples of which component types each applies to | ALL | 3 | 1 | L | 4 |
| 95 | Document the rule "no pixel-based letter-spacing, always em" in DESIGN_SYSTEM_SPEC.md | ALL | 3 | 1 | L | 4 |
| 96 | Document the rule "`text-transform: uppercase` always pairs with `letter-spacing: var(--ls-wide)` minimum" in DESIGN_SYSTEM_SPEC.md | ALL | 3 | 1 | L | 4 |
| 97 | Add letter-spacing rules to CLAUDE.md working rules as an explicit constraint for new code | ALL | 3 | 1 | L | 5 |
| 98 | Add letter-spacing to the QA checklist: "no pixel-based letter-spacing; all uppercase labels tracked at 0.08–0.14em" | ALL | 3 | 1 | L | 5 |
| 99 | After all letter-spacing changes, conduct a side-by-side visual comparison at 375px to confirm no regression in label readability | ALL | 4 | 2 | L | 5 |
| 100 | Final audit: confirm that zero `letter-spacing` values expressed in px remain in any non-`:root` CSS rule across all four pages | ALL | 5 | 2 | L | 6 |
