# Dimension A10 — Cross-Page Visual Coherence
**Category:** Visual Design & Design System
**Phase:** 2 (Visual)
**Status:** Not started

A user moving from landing.html → start.html → able-v8.html → admin.html must experience visual continuity: the same typeface family, the same colour temperature, the same motion language, and the same interaction patterns, even though each page serves a different context. Currently: landing.html uses `DM Sans` + `Barlow Condensed` at a dark `#09090f` base; start.html uses `DM Sans` + `Barlow Condensed` at a `#0d0e14` base; V8 uses `DM Sans` + vibe-overridden font + `Barlow Condensed` at `#0d0e1a`; admin.html uses `Plus Jakarta Sans` + `Barlow Condensed` at `#09090f`. The typography shift from `DM Sans` (profile/landing) to `Plus Jakarta Sans` (admin) is intentional and documented in brand doctrine — but the motion language, spacing rhythm, shadow depth, and interactive affordances must still feel cohesive. Full compliance means the transition between any two adjacent pages in the user journey feels like a product shift, not a separate product.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm that `DM Sans` is the body typeface on both landing.html and V8 (it is), and add a code comment on each page stating this is a deliberate brand-unity choice per `docs/systems/brand-identity/DOCTRINE.md` | LND | 3 | 1 | L | 1 |
| 2 | Confirm that `Barlow Condensed` is used for display headings on all four pages and add a comment on any page where it is currently absent | ALL | 4 | 1 | L | 1 |
| 3 | Confirm landing.html uses the same `--spring: cubic-bezier(0.34,1.56,0.64,1)` and `--ease: cubic-bezier(0.25,0.46,0.45,0.94)` easing tokens as V8 and start.html | LND | 4 | 1 | L | 1 |
| 4 | Confirm admin.html uses the same spring and ease easing values — add them to its `:root` if absent | ADM | 4 | 1 | L | 1 |
| 5 | Confirm all four pages use the same duration tokens: `--dur-fast: 0.14s`, `--dur: 0.16s`, `--dur-slow: 0.22s` | ALL | 4 | 1 | L | 1 |
| 6 | Confirm landing.html defines `--dur-fast`, `--dur`, `--dur-slow` in its `:root` block or imports them from `shared/style.css` | LND | 3 | 1 | L | 1 |
| 7 | Confirm start.html's transition durations match the token values (currently `transition:border-color .2s, box-shadow .2s` at line 172 should use `var(--dur-slow)`) | STR | 3 | 1 | L | 1 |
| 8 | Replace hardcoded `transition:color .15s` values in landing.html nav with `var(--dur-fast)` | LND | 3 | 1 | L | 1 |
| 9 | Replace hardcoded `transition: background 200ms` values in landing.html with `var(--dur-slow)` | LND | 3 | 1 | L | 1 |
| 10 | Replace hardcoded `transition:color .3s` values in start.html with `var(--dur-slow)` | STR | 3 | 1 | L | 1 |
| 11 | Confirm the background colour of landing.html (`#09090f`) and admin.html (`#09090f`) and V8 (`#0d0e1a`) are intentionally different shades of near-black, and document the two-surface model in `docs/systems/DESIGN_SYSTEM_SPEC.md` | ALL | 3 | 1 | L | 1 |
| 12 | Confirm the `--color-bg` token is defined and used in V8 and matches `#0d0e1a` (not `#09090f`) | V8 | 3 | 1 | L | 1 |
| 13 | Confirm landing.html's background (`#09090f`) matches the admin background token (`--bg: #09090f`) to create visual continuity for the operator journey (artist → dashboard) | LND | 3 | 1 | L | 1 |
| 14 | Confirm start.html's background (`#0d0e14`) is intentionally close to the V8 background (`#0d0e1a`) to feel like a preview of the profile page | STR | 3 | 1 | L | 1 |
| 15 | If start.html's `#0d0e14` diverges from V8's `#0d0e1a` by more than 5 luminance points without a documented reason, align them | STR | 2 | 1 | L | 1 |
| 16 | Confirm that the artist's name animates from start.html's completion screen into V8's hero name using the `view-transition-name: artist-name` CSS at start.html line 153 | STR | 5 | 2 | M | 2 |
| 17 | Confirm that the `@view-transition { navigation: auto }` rule in start.html also exists in V8 and that both pages define `view-transition-name: artist-name` on the correct elements | V8 | 5 | 2 | M | 2 |
| 18 | Test the cross-document view transition in Chrome 115+ (Playwright) and confirm the artist name morphs smoothly from start.html to V8 | ALL | 5 | 3 | M | 2 |
| 19 | Add a fallback for browsers that do not support `@view-transition` — confirm the transition degrades to a standard navigation without a white flash | ALL | 3 | 2 | M | 2 |
| 20 | Confirm that the accent colour chosen in start.html is immediately visible in V8 on first load without a flash of the default accent | V8 | 4 | 1 | L | 2 |
| 21 | Confirm that the artist name entered in start.html renders in the correct font on V8 without any layout shift as the font loads | V8 | 4 | 1 | L | 2 |
| 22 | Confirm that the vibe selected in start.html is applied in V8 on first load without a momentary default-vibe flash | V8 | 4 | 1 | L | 2 |
| 23 | Confirm that the CTA label set in start.html wizard step is rendered correctly on V8's hero CTA on first load | V8 | 3 | 1 | L | 2 |
| 24 | Confirm that the V8 page's title (`<title>`) shows the artist's name from start.html on first post-wizard load, not a generic fallback | V8 | 3 | 1 | L | 2 |
| 25 | Confirm that moving from V8 (fan-facing profile) to admin.html uses the same background colour transition (both `#0d0e1a` / `#09090f` — very close near-black, not a jarring light-to-dark shift) | ALL | 3 | 1 | L | 2 |
| 26 | Confirm that the admin.html greeting ("Good to see you, [Name]") uses the same name the artist set in start.html | ADM | 3 | 1 | L | 2 |
| 27 | Confirm that admin.html shows the correct vibe-preview tile reflecting the artist's current vibe so the transition from V8 to admin feels connected | ADM | 3 | 1 | M | 2 |
| 28 | Confirm that the landing.html hero CTA ("Get started") navigates to start.html — and that the colour temperature of landing and start are visually adjacent | LND | 4 | 1 | L | 2 |
| 29 | Confirm that the landing.html phone mockup renders the same accent colour as the default profile preview (indie green `#7ec88a`) so that what the artist sees in the demo matches what they create | LND | 3 | 1 | L | 2 |
| 30 | Confirm that the landing.html phone mockup uses `DM Sans` for its body text (same as V8) and `Barlow Condensed` for the artist name, creating an accurate visual expectation | LND | 3 | 1 | L | 2 |
| 31 | Confirm that button heights are consistent across pages: 48px on V8, landing, and start.html CTAs (landing's `switcher-cta` is `height:48px` per the computed style) | ALL | 4 | 2 | M | 3 |
| 32 | Confirm that button font size is consistent: 15px or 14px at 600 weight on all four pages for primary CTAs | ALL | 4 | 1 | L | 3 |
| 33 | Confirm that the `pressed` interaction state (scale down + opacity dip) is implemented identically on V8 and start.html CTAs | V8 | 3 | 2 | M | 3 |
| 34 | Confirm that the `pressed` interaction state is implemented on admin.html primary action buttons using the same spring easing | ADM | 3 | 2 | M | 3 |
| 35 | Confirm that the `pressed` interaction state is implemented on landing.html CTAs | LND | 3 | 2 | M | 3 |
| 36 | Confirm that focus ring styling is visually consistent across all four pages: same colour (accent or amber), same blur, same offset | ALL | 4 | 2 | M | 3 |
| 37 | Confirm that hover states on links and buttons use the same opacity or colour-shift values across all four pages | ALL | 3 | 2 | M | 3 |
| 38 | Confirm that form inputs look identical (or deliberately differentiated for page context) across start.html, admin.html, and V8's join sheet | ALL | 3 | 1 | L | 3 |
| 39 | Confirm that error states on form inputs use the same visual treatment (red border, error copy below) across start.html, admin.html, and V8 | ALL | 3 | 2 | M | 3 |
| 40 | Confirm that empty states use the same visual vocabulary (faded icon, 14px copy, optional ghost CTA) across all four pages | ALL | 3 | 1 | L | 3 |
| 41 | Confirm that the toast component looks identical on V8 and admin.html — same height, background, font, padding, and animation | ALL | 4 | 1 | L | 3 |
| 42 | Confirm that success copy in toasts follows the same voice and style across V8 and admin (honest, specific, no exclamation marks) | ALL | 3 | 1 | L | 3 |
| 43 | Confirm that loading states use the same spinner design (same icon, same animation duration) across all four pages | ALL | 3 | 1 | L | 3 |
| 44 | Confirm that the scrollbar style (if custom) is consistent across all four pages on browsers that support custom scrollbars | ALL | 2 | 1 | L | 3 |
| 45 | Confirm that the page-level `font-size: 16px` baseline and `line-height: 1.5` default are identical across all four pages | ALL | 3 | 1 | L | 3 |
| 46 | Confirm that `Plus Jakarta Sans` in admin.html has the same weight/style variants loaded as `DM Sans` in V8 (Regular 400, Medium 500, Semi-Bold 600, Bold 700) | ADM | 3 | 1 | L | 3 |
| 47 | Confirm that the heading hierarchy (h1 → display font, h2 → display font, h3 → body font) is consistent across all four pages | ALL | 4 | 1 | L | 3 |
| 48 | Confirm that the body text colour (`--color-text` or `--dash-t1`) reads as the same off-white `#f0f0f5` on dark backgrounds across all pages, not a mix of `#fff`, `#f0f0f5`, and `rgba(255,255,255,0.9)` | ALL | 3 | 1 | L | 3 |
| 49 | Confirm that secondary text (captions, metadata) uses the same `rgba(255,255,255,0.55)` or equivalent token across all four pages, not page-specific values | ALL | 3 | 1 | L | 3 |
| 50 | Confirm that tertiary text (disabled, placeholder) uses the same `rgba(255,255,255,0.3)` equivalent token across all pages | ALL | 3 | 1 | L | 3 |
| 51 | Confirm that the section spacing rhythm (24px section gap at mobile, 40px at desktop) is consistent across V8, start, and admin — document any intentional deviation | ALL | 3 | 2 | M | 4 |
| 52 | Confirm that horizontal padding inside page containers is consistent: `16px` at mobile, `24px` at tablet across all four pages | ALL | 3 | 2 | M | 4 |
| 53 | Confirm that the card inner padding is consistent: `16px` or `20px` on all four pages (admin may differ for density) | ALL | 3 | 1 | L | 4 |
| 54 | Confirm that the `DM Sans` to `Plus Jakarta Sans` font shift from V8 to admin.html does not produce a noticeable optical-size difference that makes admin feel larger or smaller than the profile | ADM | 3 | 1 | L | 4 |
| 55 | If optical size diverges, adjust `Plus Jakarta Sans` base size in admin to achieve visual parity with `DM Sans` at 15px | ADM | 3 | 2 | M | 4 |
| 56 | Confirm that the `Barlow Condensed` display heading renders at the same optical size on landing.html and admin.html by testing at the same viewport width | LND | 3 | 1 | L | 4 |
| 57 | Confirm that landing.html does not introduce a third font family (`font-editorial: 'Barlow Condensed'` and `font-body: var(--font)` — check if `--font-body` alias is necessary or redundant) | LND | 2 | 1 | L | 4 |
| 58 | Confirm that the landing.html phone mockup does not render fonts from a different family than V8 uses (mockup should use `DM Sans` + artist's vibe font) | LND | 3 | 1 | L | 4 |
| 59 | Confirm that start.html's progress indicator animation feels consistent with V8's page entrance animations in terms of spring character and duration | STR | 3 | 1 | L | 4 |
| 60 | Confirm that start.html's step-transition animations (enter-fwd, enter-back) use the same spring easing token as V8's card entrance animations | STR | 3 | 1 | L | 4 |
| 61 | Confirm that admin.html's section entrance animations (if any) use the same easing tokens as V8, so the transition between pages does not feel like a different animation library | ADM | 3 | 1 | L | 4 |
| 62 | Confirm that landing.html's `fade-up` entrance animations use `var(--ease)` not a hardcoded easing value | LND | 3 | 1 | L | 4 |
| 63 | Confirm that `prefers-reduced-motion` media query disables animations consistently across all four pages (not just V8) | ALL | 4 | 2 | M | 4 |
| 64 | Add `@media (prefers-reduced-motion: reduce)` blocks to landing.html if absent | LND | 4 | 1 | L | 4 |
| 65 | Add `@media (prefers-reduced-motion: reduce)` blocks to start.html if absent | STR | 4 | 1 | L | 4 |
| 66 | Add `@media (prefers-reduced-motion: reduce)` blocks to admin.html if absent | ADM | 4 | 1 | L | 4 |
| 67 | Confirm that the ABLE logo/brand mark renders identically (same size, same colour, same position) across all four pages in the nav | ALL | 3 | 1 | L | 4 |
| 68 | Confirm that the page `<title>` naming convention is consistent: "ABLE — [Page Name]" across all four pages | ALL | 2 | 1 | L | 4 |
| 69 | Confirm that the meta `description` copy follows the same voice and length across all four pages | ALL | 2 | 1 | L | 4 |
| 70 | Confirm that OG card images use the same design language and feel like they belong to one product | ALL | 3 | 1 | L | 4 |
| 71 | Add a Playwright journey test that navigates landing → start → V8 → admin and takes a screenshot at each step, visually confirming no jarring transition | ALL | 5 | 3 | M | 5 |
| 72 | Add a Playwright test confirming the cross-document view transition from start.html to V8 fires correctly in a Chromium build | ALL | 5 | 3 | M | 5 |
| 73 | Add a Playwright test confirming the accent colour is the same in start.html's completion preview and V8's first load | ALL | 4 | 2 | M | 5 |
| 74 | Add a Playwright test confirming button heights are 48px on all four pages | ALL | 3 | 2 | M | 5 |
| 75 | Add a Playwright test confirming the toast component renders identically on V8 and admin.html | ALL | 3 | 2 | M | 5 |
| 76 | Confirm that the colour of interactive affordances (underlines, border highlights) is consistent across all four pages — always the page's primary accent, never a hardcoded blue | ALL | 3 | 1 | L | 5 |
| 77 | Confirm that the light theme on landing.html (if present) uses the same cream `#f0ede8` background as V8's light theme, not a different off-white | LND | 3 | 1 | L | 5 |
| 78 | Confirm that the light theme on start.html (if present) uses the same cream background as V8 | STR | 3 | 1 | L | 5 |
| 79 | Confirm that admin.html's light theme (if present) uses the admin's warm-light equivalent and does not use V8's profile light background | ADM | 3 | 1 | L | 5 |
| 80 | Confirm that all four pages share the same `box-shadow` depth scale for cards and elevated elements (from `docs/systems/DESIGN_SYSTEM_SPEC.md` shadow spec) | ALL | 3 | 2 | M | 5 |
| 81 | Confirm that start.html's card shadows match V8's card shadows at the same elevation tier | STR | 3 | 1 | L | 5 |
| 82 | Confirm that landing.html's feature card shadows match V8's card shadows visually | LND | 3 | 1 | L | 5 |
| 83 | Confirm that admin.html's stat cards use a shadow consistent with its tighter elevation system | ADM | 3 | 1 | L | 5 |
| 84 | Confirm that the `--color-card` surface colour is the same `#12152a` in V8 and start.html — and that admin's `--dash-card` is the admin-equivalent, documented as intentionally different | ALL | 3 | 1 | L | 5 |
| 85 | Confirm that the border colour on cards is consistent: `rgba(255,255,255,0.07)` on V8 and start.html, documented equivalent in admin | ALL | 3 | 1 | L | 5 |
| 86 | Document the intended cross-page visual contract (which tokens must match, which may diverge, and why) in `docs/systems/CROSS_PAGE_JOURNEYS.md` | ALL | 4 | 2 | L | 5 |
| 87 | Document the font substitution rule (DM Sans → Plus Jakarta Sans on admin) and the visual parity approach in `docs/systems/brand-identity/DOCTRINE.md` | ALL | 3 | 1 | L | 5 |
| 88 | Document the background colour divergence (profile `#0d0e1a` vs dashboard `#09090f`) and the design intent in `docs/systems/DESIGN_SYSTEM_SPEC.md` | ALL | 2 | 1 | L | 5 |
| 89 | Run a user journey audit with a real user (or stakeholder review) navigating landing → start → profile → admin and collecting feedback on any jarring transitions | ALL | 5 | 3 | M | 5 |
| 90 | Fix any jarring transitions identified in the user journey audit, prioritising font, colour, or motion inconsistencies over cosmetic differences | ALL | 5 | 3 | H | 5 |
| 91 | Confirm that the `Barlow Condensed` font is preloaded on all four pages (not just V8) to prevent a FOUT on the first display heading | ALL | 4 | 1 | L | 5 |
| 92 | Confirm that `DM Sans` is preloaded on V8, start.html, and landing.html | LND | 3 | 1 | L | 5 |
| 93 | Confirm that `Plus Jakarta Sans` is preloaded on admin.html | ADM | 3 | 1 | L | 5 |
| 94 | Confirm that no page loads a font that no other page uses, avoiding a typography inconsistency visible only on one page | ALL | 2 | 1 | L | 5 |
| 95 | Confirm that landing.html's `--font-editorial` alias resolves to `Barlow Condensed` and is not introducing a third display typeface | LND | 3 | 1 | L | 5 |
| 96 | Confirm that all four pages render correctly on iOS Safari 16+ and do not show font rendering differences due to system font fallback order | ALL | 4 | 2 | M | 6 |
| 97 | Confirm that all four pages render correctly on Android Chrome and do not show font rendering differences | ALL | 4 | 2 | M | 6 |
| 98 | Add the cross-page coherence contract to the `CLAUDE.md` working rules with a note that any new page must share easing tokens, duration tokens, and the shared component system | ALL | 3 | 1 | L | 6 |
| 99 | Schedule a quarterly cross-page coherence review to check for visual drift introduced by new feature work | ALL | 2 | 1 | L | 6 |
| 100 | Update this dimension's status to "Complete" once the Playwright journey test passes, the user audit findings are resolved, and the cross-page contract is documented | ALL | 2 | 1 | L | 6 |
