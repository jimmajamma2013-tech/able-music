# Dimension B4 — Landing Font Alignment
**Category:** Typography & Spacing
**Phase:** 5

Landing.html has a CSS comment referencing Fraunces italic but loads no such font — instead `--font-editorial` aliases to Barlow Condensed. The section title mixes italic Barlow Condensed (editorial feel) with uppercase Barlow Condensed (display feel) in a split-personality typographic treatment. The question is whether the gap between landing's editorial tone and the product's display tone is intentional brand differentiation or accumulated drift.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm the Fraunces reference at landing.html line 266 is dead — no Fraunces font is loaded on any page | LND | 5 | 1 | L | 1 |
| 2 | Remove or update the comment: "Editorial contrast: the key word goes Fraunces italic in terracotta" — this is misleading since the font is Barlow Condensed | LND | 3 | 1 | L | 1 |
| 3 | Document the deliberate decision: landing uses Barlow Condensed italic as "editorial" rather than a separate serif typeface | LND | 4 | 1 | L | 1 |
| 4 | V8 profile page uses Barlow Condensed exclusively for display — no italic | V8 | 3 | 1 | L | 1 |
| 5 | Landing uses Barlow Condensed italic for `.section__title` and `.quote__text` — V8 never uses italic | LND | 4 | 1 | L | 1 |
| 6 | Decide: should the italic-Barlow editorial style extend to V8, or remain landing-only? Document in DESIGN_SYSTEM_SPEC.md | ALL | 5 | 1 | L | 1 |
| 7 | The current treatment (italic Barlow on landing, not on product) creates a visual step-down when user moves from landing to onboarding | LND | 4 | 1 | L | 1 |
| 8 | Assess whether the landing editorial feel is intentionally warmer/more aspirational to attract cold traffic | LND | 3 | 1 | L | 1 |
| 9 | Assess whether the product feel (no italic, all caps display) is intentionally more functional and artist-focused | V8 | 3 | 1 | L | 1 |
| 10 | If the gap is intentional: document it as "landing = aspirational editorial; product = functional display" | ALL | 4 | 1 | L | 1 |
| 11 | If the gap is drift: decide which direction to unify — extend italic Barlow into V8 or remove italic Barlow from landing | ALL | 4 | 1 | L | 2 |
| 12 | Landing `--font-editorial` token is identical to `--font-d` — this duplication serves no purpose if they're the same font | LND | 3 | 1 | L | 1 |
| 13 | V8 also has `--font-editorial` token identical to `--font-d` — confirm it is unused on V8 | V8 | 3 | 1 | L | 1 |
| 14 | If `--font-editorial` is unused on V8, remove the token declaration from V8 `:root` to reduce confusion | V8 | 3 | 1 | L | 2 |
| 15 | start.html has no `--font-editorial` token — confirm none of the wizard screens use it | STR | 2 | 1 | L | 1 |
| 16 | Admin has no `--font-editorial` token — confirm correct | ADM | 2 | 1 | L | 1 |
| 17 | The landing `.section__title` structure: `<h2><em>word</em> REST IN BARLOW CAPS</h2>` — the em renders in Barlow italic while the rest renders in Barlow uppercase | LND | 4 | 1 | L | 1 |
| 18 | The contrast between italic Barlow (lowercase, italic) and uppercase Barlow (all-caps, normal) within the same headline — evaluate if this is visually coherent or jarring | LND | 4 | 1 | L | 1 |
| 19 | Landing `.section__title em` font-weight is 500 — while the headline uses 700/900; test this weight contrast visually | LND | 3 | 1 | L | 2 |
| 20 | Landing `.section__title em` letter-spacing is -0.02em — while parent has -0.02em; these match, which may be unintentional | LND | 2 | 1 | L | 2 |
| 21 | Landing `.section__title` body: `font-style: italic` — italic on a condensed sans-serif is heavily synthesised if italic variant not loaded | LND | 4 | 1 | L | 1 |
| 22 | Load Barlow Condensed italic variant on landing to prevent synthesised italic: add `ital,wght@1,500;1,700` to font request | LND | 4 | 1 | M | 2 |
| 23 | Landing `.quote__text` uses italic Barlow Condensed at `16px` — at 16px italic Barlow Condensed is hard to read; test readability | LND | 4 | 1 | L | 1 |
| 24 | Landing `.quote__text` max-width 680px at this size — this is potentially 90+ characters per line; this is too wide for italic body text | LND | 4 | 1 | L | 1 |
| 25 | The quote attribution `.quote__cite` uses `font-family: var(--font)` DM Sans normal — the font switch from italic Barlow to DM Sans normal for attribution is abrupt | LND | 3 | 1 | L | 2 |
| 26 | Evaluate whether the Fraunces typeface should actually be loaded for the quote/testimonial section — it would genuinely differentiate from the rest of the product | LND | 3 | 2 | M | 3 |
| 27 | If Fraunces is added: load only the italic weight (1 style, 1 weight) — the lightest possible addition | LND | 3 | 2 | M | 3 |
| 28 | If Fraunces is added: it should only appear on landing.html — never bleed into V8 or admin | LND | 3 | 1 | L | 3 |
| 29 | If Fraunces is added: update `--font-editorial` to `'Fraunces', 'Barlow Condensed', sans-serif` | LND | 3 | 1 | M | 3 |
| 30 | If Fraunces is not added: remove the comment reference and accept Barlow Condensed italic as the editorial voice | LND | 3 | 1 | L | 2 |
| 31 | The user journey from landing to onboarding: landing has Barlow italic editorial feel → start.html has Barlow display + DM Sans body | ALL | 4 | 1 | L | 1 |
| 32 | start.html's hero step number in Barlow Condensed at 52px matches the landing's headline energy — this transition works | STR | 3 | 1 | L | 1 |
| 33 | start.html body copy in DM Sans matches landing's body copy in DM Sans — consistent | STR | 3 | 1 | L | 1 |
| 34 | The landing → start.html transition primarily loses the italic treatment — evaluate if this reads as a shift from marketing to utility | ALL | 3 | 1 | L | 2 |
| 35 | start.html → V8 transition: both use DM Sans body and Barlow Condensed display, with DM Sans `--font-editorial` alias on V8 — should be seamless | ALL | 3 | 1 | L | 1 |
| 36 | V8 → admin transition: DM Sans → Plus Jakarta Sans body is the main typographic shift; evaluate if this feels intentional | ALL | 4 | 1 | L | 2 |
| 37 | Document the intended typographic personality for each page: landing (editorial+bold), onboarding (clean+guiding), profile (personal+expressive), admin (professional+functional) | ALL | 3 | 1 | L | 3 |
| 38 | Landing hero headline font-variation-settings — confirm no `font-variation-settings` is being applied (could affect Barlow Condensed) | LND | 2 | 1 | L | 2 |
| 39 | V8 font-variation-settings — confirm not applied to `var(--font-d)` anywhere | V8 | 2 | 1 | L | 2 |
| 40 | The landing headline uses `text-transform: uppercase` on the non-italic portion — this uppercase treatment disappears on V8's artist hero which is all-caps by content, not CSS | LND | 2 | 1 | L | 2 |
| 41 | Landing `.section__sub` uses DM Sans 400 at 16px — matches V8 bio copy exactly in tone | LND | 2 | 1 | L | 1 |
| 42 | Landing `.hero__sub` uses DM Sans 400 at clamp(17–20px) — slightly larger than V8 body text; evaluate if this difference is needed | LND | 2 | 1 | L | 2 |
| 43 | Landing `.hero-feature__title` uses no explicit font, inherits DM Sans — this matches V8 section headings | LND | 2 | 1 | L | 1 |
| 44 | Landing `.hero-feature__desc` inherits DM Sans — consistent with V8 body copy | LND | 2 | 1 | L | 1 |
| 45 | Landing `.feature-card__title` at `font-weight: 800` — DM Sans 800 is bold but ensure this weight is loaded | LND | 3 | 1 | L | 2 |
| 46 | Landing feature cards use DM Sans 800 — this is heavier than anything in V8 or admin; unique to landing cards | LND | 2 | 1 | L | 2 |
| 47 | Landing `.comparison-header` uses `letter-spacing: 0.1em` small caps — this pattern exists on landing only; confirm not needed on V8 | LND | 2 | 1 | L | 2 |
| 48 | Landing proof strip numbers use Barlow Condensed at `44px` — matches the scale of V8 stat cards; good visual bridge | LND | 3 | 1 | L | 1 |
| 49 | The ABLE logo on landing uses Barlow Condensed at `20px letter-spacing:.06em` — confirm same treatment on V8 logo | LND | 3 | 1 | L | 1 |
| 50 | V8 profile name in Barlow Condensed is full-width, no letter-spacing restriction — very different character from landing's nav logo treatment | V8 | 2 | 1 | L | 2 |
| 51 | Evaluate whether the landing `--font-editorial` alias causes future confusion if a developer adds Fraunces — the alias already exists, making the addition tempting | ALL | 2 | 1 | L | 2 |
| 52 | If Fraunces is decided against: rename `--font-editorial` to `--font-d-italic` or just use `--font-d` directly | ALL | 3 | 1 | L | 3 |
| 53 | The brand identity DOCTRINE.md should state clearly: ABLE does not use a serif typeface anywhere | ALL | 4 | 1 | L | 2 |
| 54 | If a serif (Fraunces) is added to landing only: DOCTRINE.md should document the exception and the reason | ALL | 3 | 1 | L | 3 |
| 55 | V8 has a `--font-editorial` token pointing to Barlow Condensed — this is named aspirationally but used nowhere; either use it for something or remove it | V8 | 2 | 1 | L | 2 |
| 56 | Landing `.quiet-line` section uses `font-size: 18px` inheriting DM Sans — this mid-page text break is in body font; consider if a single Barlow Condensed word here would punch better | LND | 2 | 1 | L | 3 |
| 57 | Landing proof stat label at `font-family: var(--font-editorial)` weight 700 — confirm this renders in Barlow Condensed (not synthesised) since Barlow Condensed 700 is loaded | LND | 3 | 1 | L | 1 |
| 58 | Landing proof stat number at `font-family: var(--font-editorial)` weight 700, `font-size: 44px` — confirm no italic applied here | LND | 2 | 1 | L | 1 |
| 59 | landing `.section__eyebrow` uses `letter-spacing: 0.18em` — consistent with admin's eyebrow labels? Admin uses 0.06em; this inconsistency is intentional (different surfaces) | LND | 2 | 1 | L | 2 |
| 60 | The visual gap between landing (polished editorial) and V8 (personal expressive) may actually be correct — landing sells the platform, V8 expresses the artist | ALL | 3 | 1 | L | 2 |
| 61 | The step-down from landing to onboarding is where the editorial drop happens — onboarding should feel clean, not editorial, since it's a task | STR | 3 | 1 | L | 2 |
| 62 | Document the transition intention: landing is the only page with editorial italic treatment — it represents the platform's voice, not the artist's voice | ALL | 3 | 1 | L | 3 |
| 63 | Test the landing → start.html visual transition in a browser at full viewport — does the font shift feel intentional or accidental? | ALL | 4 | 2 | L | 2 |
| 64 | Compare landing's headline colour temperature (warm terracotta accent) with V8's artist accent colour — landing uses a fixed accent while V8 adapts | LND | 2 | 1 | L | 2 |
| 65 | Landing italic Barlow at section titles: does the `font-style: italic` property on a condensed sans-serif produce a visually appealing result or an optical compromise? Test a screenshot | LND | 4 | 2 | M | 2 |
| 66 | If synthesised italic is visually poor: either load Barlow Condensed italic or switch to a different differentiation technique (colour, weight contrast) | LND | 4 | 2 | M | 2 |
| 67 | V8's hero name is never italic — this is correct for an artist name, which should read as powerful not stylised | V8 | 2 | 1 | L | 1 |
| 68 | Admin never uses italic — correct for a functional dashboard | ADM | 2 | 1 | L | 1 |
| 69 | start.html never uses italic — correct for a task-focused wizard | STR | 2 | 1 | L | 1 |
| 70 | Landing is the only page that could legitimately use italic as an editorial device — if isolated to landing, the italic Barlow treatment is defensible | LND | 3 | 1 | L | 2 |
| 71 | Landing `.hero__eyebrow` pill: `letter-spacing: 0.10em` — check if this eyebrow uses DM Sans (body) or Barlow Condensed (display) | LND | 2 | 1 | L | 2 |
| 72 | Landing hero eyebrow uses `var(--font)` DM Sans — correct; body font for the small label above the headline | LND | 2 | 1 | L | 1 |
| 73 | Make a final call on the Fraunces question in this wave — once decided, all subsequent type work should assume the answer | ALL | 5 | 1 | L | 1 |
| 74 | If "accept the gap" is the decision: add a note in DESIGN_SYSTEM_SPEC.md saying landing's italic treatment is intentional marketing voice | ALL | 3 | 1 | L | 2 |
| 75 | If "close the gap" is the decision: extend Barlow Condensed italic to V8 section titles and update font request | ALL | 3 | 2 | M | 2 |
| 76 | If "add Fraunces" is the decision: update landing font request, add `--font-editorial: 'Fraunces'` fallback, test | LND | 3 | 2 | M | 3 |
| 77 | Barlow Condensed italic — if added to the font request, costs approximately 15-20KB extra; document this cost | LND | 2 | 1 | L | 3 |
| 78 | Fraunces italic — if added, a single-style subset would cost approximately 25-40KB; document this cost | LND | 2 | 1 | L | 3 |
| 79 | After resolution: update `--font-editorial` token definition on all pages that use it to reflect the final decision | ALL | 4 | 1 | M | 3 |
| 80 | After resolution: test all four pages' visual output at the landing→onboarding transition | ALL | 4 | 2 | M | 3 |
| 81 | Landing `.footer-cta__title` font — this closing headline is the final impression before conversion; confirm it uses the strongest display treatment | LND | 4 | 1 | L | 2 |
| 82 | Landing `.footer-cta__sub` body copy — confirm DM Sans body font consistent with rest of landing | LND | 2 | 1 | L | 2 |
| 83 | Audit landing for any direct `font-family: 'Fraunces'` or `font-family: Fraunces` string — should be zero | LND | 3 | 1 | L | 1 |
| 84 | Audit all four pages for `font-family: 'Fraunces'` string — should be zero on all | ALL | 3 | 1 | L | 1 |
| 85 | Landing `font-style: italic` appears in two places — `.section__title` and `.quote__text` — confirm these are the only italic instances | LND | 3 | 1 | L | 1 |
| 86 | Test landing on a device that doesn't support synthesised italic — some older Android fonts render synthesised italic very poorly | LND | 3 | 2 | M | 3 |
| 87 | Consider `font-synthesis: none` on `--font-editorial` usage to prevent synthesised italic if the real italic variant isn't loaded | LND | 3 | 1 | M | 2 |
| 88 | If `font-synthesis: none` is added, the text will render as upright Barlow Condensed when italic variant not available — confirm this fallback is acceptable | LND | 3 | 1 | M | 2 |
| 89 | V8 never specifies `font-style: italic` anywhere — this is correct | V8 | 2 | 1 | L | 1 |
| 90 | admin.html never specifies `font-style: italic` anywhere — this is correct | ADM | 2 | 1 | L | 1 |
| 91 | start.html never specifies `font-style: italic` — this is correct | STR | 2 | 1 | L | 1 |
| 92 | The visual quality of landing's typography should be the highest of all four pages — it's the cold-traffic impression | LND | 4 | 1 | L | 1 |
| 93 | Barlow Condensed as a typeface: it is a condensed grotesque, not an editorial serif — using it italic as an "editorial" gesture is a creative choice that works if the result looks good | LND | 3 | 1 | L | 1 |
| 94 | Test landing headline at 375px mobile — the clamp bottoms out at 52px for the hero; confirm the italic Barlow is readable at this size | LND | 4 | 2 | L | 2 |
| 95 | Test landing `.section__title` clamp at 375px — bottoms out at 34px; confirm italic Barlow is readable | LND | 3 | 2 | L | 2 |
| 96 | After font alignment decision, update the landing.html code comment at line 266 to accurately describe what the code actually does | LND | 2 | 1 | L | 2 |
| 97 | After font alignment decision, update DESIGN_SYSTEM_SPEC.md section on editorial font | ALL | 2 | 1 | L | 3 |
| 98 | After font alignment decision, update the brand-identity DOCTRINE.md | ALL | 2 | 1 | L | 3 |
| 99 | Consider running a 5-person user test on the landing → onboarding visual transition and asking "did anything feel jarring?" | ALL | 3 | 3 | L | 5 |
| 100 | Final output: one sentence in CONTEXT.md that states the font alignment decision — "Landing uses Barlow Condensed italic as editorial device. Product pages use Barlow Condensed display only. This is intentional." or "ABLE uses Barlow Condensed throughout. No separate editorial typeface." | ALL | 4 | 1 | L | 3 |

## Wave Summary
- **Wave 1** — 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 17, 18, 21, 23, 24, 31, 32, 33, 35, 41, 43, 44, 48, 57, 58, 67, 68, 69, 72, 73, 83, 84, 85, 89, 90, 91, 92, 93
- **Wave 2** — 11, 14, 19, 20, 22, 25, 34, 36, 38, 39, 40, 42, 45, 46, 47, 49, 50, 51, 53, 55, 59, 60, 61, 63, 64, 65, 66, 70, 71, 74, 75, 81, 82, 87, 88, 94, 95, 96
- **Wave 3** — 26, 27, 28, 29, 30, 37, 52, 54, 56, 62, 76, 77, 78, 79, 80, 86, 97, 98, 100
- **Wave 4** — (none)
- **Wave 5** — 99
- **Wave 6** — (none)
