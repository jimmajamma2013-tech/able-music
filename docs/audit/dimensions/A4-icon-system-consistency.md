# Dimension A4 — Icon System Consistency
**Category:** Visual Design & Design System
**Phase:** 2 (Visual)
**Status:** Not started

All inline SVGs across ABLE's four active pages must originate from a single logical icon library (Lucide), render at consistent size tokens (`--icon-sm: 16px`, `--icon-md: 20px`, `--icon-lg: 24px`), and share a uniform stroke weight of `1.5` at 20–24 px and `2` at 12–16 px. Currently the codebase mixes `stroke-width` values of `1.5`, `1.6`, `1.8`, `2`, and `3`, pixel sizes of `10`, `11`, `12`, `13`, `14`, `15`, and `24`, and `viewBox` origins across `0 0 10 10`, `0 0 12 12`, `0 0 14 14`, and `0 0 24 24`. Full compliance means every decorative SVG is drawn from one source, rendered via a `iconSVG()` helper or `<use>` sprite reference, and scales through defined tokens so changing the stroke weight across the entire product is a one-line edit.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Define CSS custom properties `--icon-sm: 16px`, `--icon-md: 20px`, `--icon-lg: 24px` in the `:root` block of every page's `<style>` tag | ALL | 5 | 1 | L | 1 |
| 2 | Standardise all SVG `stroke-width` values to `1.5` for 20–24 px icons and `2` for 12–16 px icons, with the rule documented in a code comment above the first icon usage | ALL | 5 | 2 | M | 1 |
| 3 | Replace the `stroke-width="3"` spinner path at V8 line 5496 with `stroke-width="1.5"` at 24 px to match the standard | V8 | 4 | 1 | L | 1 |
| 4 | Replace every `stroke-width="1.8"` icon in V8 (lines 5777–5825, social platform pills) with `stroke-width="1.5"` | V8 | 3 | 1 | L | 1 |
| 5 | Replace every `stroke-width="1.6"` icon in V8 (lines 5538–5543, pagination arrows) with `stroke-width="1.5"` | V8 | 3 | 1 | L | 1 |
| 6 | Replace the `width="10" height="10"` back-arrow at V8 line 5274 (`stroke-width="1.8"`) with a 16 px Lucide `chevron-left` at `stroke-width="2"` | V8 | 3 | 1 | L | 1 |
| 7 | Replace the `stroke-width="2"` credits-chevron at V8 lines 5694–5695 (24 px viewBox) with `stroke-width="1.5"` to match the 24 px standard | V8 | 3 | 1 | L | 1 |
| 8 | Normalise all `viewBox="0 0 14 14"` icons in admin.html to `viewBox="0 0 16 16"`, scaling path coordinates proportionally | ADM | 4 | 2 | M | 1 |
| 9 | Normalise all `viewBox="0 0 12 12"` icons in admin.html to `viewBox="0 0 16 16"`, scaling path coordinates proportionally | ADM | 4 | 2 | M | 1 |
| 10 | Replace the `width="15" height="15"` play icon at admin.html line 2384 with a canonical 16 px Lucide `play` | ADM | 3 | 1 | L | 1 |
| 11 | Replace the `width="13" height="13"` clock icon at admin.html line 2413 with a 16 px Lucide `clock` at `stroke-width="2"` | ADM | 3 | 1 | L | 1 |
| 12 | Replace the `width="11" height="11"` Instagram icon at admin.html line 3570 with a 16 px social icon from the shared sprite | ADM | 2 | 1 | L | 1 |
| 13 | Replace the `width="11" height="11"` share icon at admin.html line 3564 with a 16 px Lucide `share-2` | ADM | 2 | 1 | L | 1 |
| 14 | Upgrade the six `width="12" height="12"` plus icons at admin.html lines 3084, 3108, 3138, 3160, 3281, 3357 to 16 px, keeping `viewBox="0 0 12 12"` scaled to `0 0 16 16` | ADM | 3 | 2 | M | 1 |
| 15 | Create a JS helper `iconSVG(name, size='md')` in `shared/able.js` that returns a correctly sized inline SVG string using the `--icon-sm/md/lg` values | ALL | 5 | 3 | M | 2 |
| 16 | Replace the JS-embedded link icon at V8 line 7454 (`stroke-width="2"`, hard-coded `width="24"`) with `iconSVG('link', 'md')` | V8 | 3 | 1 | M | 2 |
| 17 | Replace the JS-injected play icon at V8 line 9515 (`fill="currentColor"`, `width="24"`) with `iconSVG('play', 'lg')` | V8 | 3 | 1 | M | 2 |
| 18 | Audit all admin.html JS template literals for icon SVG strings and replace each with `iconSVG()` calls | ADM | 3 | 2 | M | 2 |
| 19 | Introduce a CSS utility class `.icon` with `display:block; flex-shrink:0; width:var(--icon-md); height:var(--icon-md)` and apply it to all icon-hosting elements | ALL | 3 | 2 | L | 2 |
| 20 | Introduce `.icon--sm` and `.icon--lg` modifier classes overriding `.icon` dimensions with `--icon-sm` and `--icon-lg` respectively | ALL | 2 | 1 | L | 2 |
| 21 | Apply the `.icon` class to all SVGs currently sized via HTML `width`/`height` attributes and remove those attributes | ALL | 3 | 3 | M | 2 |
| 22 | Add `aria-hidden="true"` to every purely decorative SVG in admin.html that currently lacks it | ADM | 3 | 2 | L | 2 |
| 23 | Add `aria-hidden="true"` to every purely decorative SVG in start.html that currently lacks it | STR | 3 | 2 | L | 2 |
| 24 | Add `aria-hidden="true"` to every purely decorative SVG in landing.html that currently lacks it | LND | 3 | 2 | L | 2 |
| 25 | Add `focusable="false"` to every `<svg>` element to prevent IE/Edge focus trapping | ALL | 2 | 1 | L | 2 |
| 26 | Remove all redundant `fill="none"` attributes from SVGs that already inherit `fill: none` from a parent CSS rule | ALL | 2 | 1 | L | 2 |
| 27 | Ensure no icon SVG has a hardcoded `color` attribute — all must use `stroke="currentColor"` or `fill="currentColor"` | ALL | 3 | 1 | L | 2 |
| 28 | Standardise all `stroke-linecap` values to `round` across all icons unless a deliberate `butt` exception is documented | ALL | 3 | 2 | M | 2 |
| 29 | Standardise all `stroke-linejoin` values to `round` across all icons unless a deliberate `miter` exception is documented | ALL | 3 | 2 | M | 2 |
| 30 | Add a lint comment block at the top of each page's first SVG usage documenting the icon contract (`--icon-sm 16px / --icon-md 20px / --icon-lg 24px, stroke 2/1.5`) | ALL | 2 | 1 | L | 2 |
| 31 | Ensure every icon in V8 quick-action pills is exactly 20 px `--icon-md` with `stroke-width="1.5"`, auditing the full `.pill` set | V8 | 3 | 1 | L | 3 |
| 32 | Ensure every icon in V8 hero CTAs (`.btn-primary`, `.btn-secondary`) is `--icon-md` (20 px) | V8 | 3 | 1 | L | 3 |
| 33 | Ensure every icon in V8 snap cards is 20 px `--icon-md` with `stroke-width="1.5"` | V8 | 3 | 1 | L | 3 |
| 34 | Ensure the gold lock overlay icon in V8 uses `--icon-lg` (24 px) at `stroke-width="1.5"` | V8 | 3 | 1 | L | 3 |
| 35 | Ensure bottom sheet close buttons across V8 all use the same Lucide `x` icon at `--icon-md` | V8 | 3 | 1 | L | 3 |
| 36 | Ensure the fan sign-up sheet close icon in V8 is the standard `--icon-md` Lucide `x` | V8 | 2 | 1 | L | 3 |
| 37 | Ensure V8 events bento grid icons use `--icon-sm` at `stroke-width="2"` for inline text decoration contexts | V8 | 2 | 1 | L | 3 |
| 38 | Ensure V8 merch section icons use `--icon-md` with `stroke-width="1.5"` consistently | V8 | 2 | 1 | L | 3 |
| 39 | Ensure V8 support packs section icons use `--icon-md` with `stroke-width="1.5"` consistently | V8 | 2 | 1 | L | 3 |
| 40 | Ensure V8 freelancer credits section icons use `--icon-md` with `stroke-width="1.5"` consistently | V8 | 2 | 1 | L | 3 |
| 41 | Ensure fan join sheet form input prefix icons in V8 use `--icon-sm` (16 px) | V8 | 2 | 1 | L | 3 |
| 42 | Confirm stat card icons in admin.html all render at the same pixel size with the same stroke weight | ADM | 3 | 1 | L | 3 |
| 43 | Confirm nudge card icons in admin.html all render at the same pixel size with the same stroke weight | ADM | 3 | 1 | L | 3 |
| 44 | Confirm gold lock overlay icon in admin.html uses `--icon-lg` (24 px) at `stroke-width="1.5"` | ADM | 3 | 1 | L | 3 |
| 45 | Confirm bottom sheet close buttons in admin.html all use the same Lucide `x` icon at `--icon-md` | ADM | 3 | 1 | L | 3 |
| 46 | Confirm Campaign HQ section icons in admin.html all use `--icon-md` at `stroke-width="1.5"` | ADM | 3 | 1 | L | 3 |
| 47 | Confirm Fan List section icons in admin.html all use `--icon-md` at `stroke-width="1.5"` | ADM | 3 | 1 | L | 3 |
| 48 | Confirm Connections section icons in admin.html all use `--icon-md` at `stroke-width="1.5"` | ADM | 3 | 1 | L | 3 |
| 49 | Confirm Analytics section icons in admin.html all use `--icon-md` at `stroke-width="1.5"` | ADM | 3 | 1 | L | 3 |
| 50 | Confirm Events section icons in admin.html all use `--icon-md` at `stroke-width="1.5"` | ADM | 3 | 1 | L | 3 |
| 51 | Confirm admin sidebar navigation chevrons are consistently `--icon-sm` (16 px) at `stroke-width="2"` | ADM | 2 | 1 | L | 3 |
| 52 | Confirm start.html wizard step indicator icons use `--icon-sm` (16 px) | STR | 2 | 1 | L | 3 |
| 53 | Confirm start.html primary action button icons use `--icon-md` (20 px) | STR | 2 | 1 | L | 3 |
| 54 | Confirm the external-link icon appended to outbound CTAs in V8 is `--icon-sm` (16 px) at `stroke-width="2"` | V8 | 2 | 1 | L | 3 |
| 55 | Confirm landing.html nav icons use `--icon-md` with `stroke-width="1.5"` | LND | 2 | 1 | L | 3 |
| 56 | Confirm landing.html feature grid icons use `--icon-md` with `stroke-width="1.5"` | LND | 3 | 1 | L | 3 |
| 57 | Confirm landing.html pricing section checkmarks/icons use `--icon-md` with `stroke-width="1.5"` | LND | 3 | 1 | L | 3 |
| 58 | Replace the `stroke-width="2"` on all admin.html `plus` icons at `0 0 12 12` viewBoxes with `stroke-width="2"` on normalised `0 0 16 16` viewBoxes | ADM | 2 | 1 | L | 3 |
| 59 | Flag the `width="8" height="28"` decorative bar chart graphic at admin.html line 2330 as a data visualisation element, not an icon, with a code comment | ADM | 1 | 1 | L | 3 |
| 60 | Ensure platform brand icons (Spotify, YouTube, SoundCloud) are classified as brand assets and exempted from stroke-weight rules — add a code comment making this explicit | ALL | 2 | 1 | L | 3 |
| 61 | Replace `fill="#1DB954"` on the Spotify bar icon in landing.html line 548 with `--brand-spotify: #1DB954` defined in `:root` | LND | 2 | 1 | L | 4 |
| 62 | Replace `fill="#FF0000"` on the YouTube icon in landing.html line 585 with `--brand-youtube: #FF0000` defined in `:root` | LND | 2 | 1 | L | 4 |
| 63 | Ensure every `<svg>` with an accessible label uses `role="img"` and `aria-label` rather than an embedded `<title>` element | ALL | 3 | 2 | L | 4 |
| 64 | Create an SVG sprite file `icons/sprite.svg` containing all icon symbols referenced across pages | ALL | 5 | 4 | M | 4 |
| 65 | Replace all inline icon SVG bodies with `<use href="icons/sprite.svg#icon-[name]">` references once the sprite is in place | ALL | 4 | 4 | H | 4 |
| 66 | Inject the sprite `<svg>` inline at page top via a `fetch()` on load so `<use>` references work on both file:// and http:// origins | ALL | 3 | 2 | M | 4 |
| 67 | Add a Playwright test that counts distinct `stroke-width` values in the DOM and fails if any value other than `1.5` or `2` is found on a 24/20 or 16/12 px icon respectively | ALL | 4 | 3 | M | 4 |
| 68 | Add a Playwright visual regression step capturing icon sizes at 375 px and 390 px widths after each significant icon change | ALL | 4 | 3 | M | 4 |
| 69 | Add a pre-commit grep script to `package.json` that exits non-zero if any HTML file contains `stroke-width` values other than `1.5` or `2` outside of brand asset comments | ALL | 4 | 2 | L | 4 |
| 70 | Confirm that no icon has a hardcoded pixel `px` value inside SVG path data (all coordinates must be unitless) | ALL | 2 | 1 | L | 4 |
| 71 | Document the icon system (source library, size tokens, stroke contract) in `docs/systems/DESIGN_SYSTEM_SPEC.md` under a new "Icon System" section | ALL | 3 | 1 | L | 4 |
| 72 | Document the `.icon`, `.icon--sm`, `.icon--lg` CSS utility classes in `docs/systems/DESIGN_SYSTEM_SPEC.md` | ALL | 2 | 1 | L | 4 |
| 73 | Export `--icon-sm/md/lg` values to a design-token JSON or `tokens.css` file for future tooling integration | ALL | 2 | 1 | L | 4 |
| 74 | Confirm icon colours in light theme render with sufficient contrast after inheriting `currentColor` from their parent | ALL | 3 | 1 | L | 4 |
| 75 | Confirm icon colours in glass theme remain legible against blurred backgrounds at all opacity levels | ALL | 3 | 1 | L | 4 |
| 76 | Confirm icon colours in contrast theme render as pure `#ffffff` on black backgrounds | ALL | 3 | 1 | L | 4 |
| 77 | Ensure all `<img>` elements used as icon substitutes (e.g. platform logos) have `width`/`height` attributes matching the icon token values | ALL | 2 | 1 | L | 4 |
| 78 | Audit landing.html phone-mockup internal icons for size consistency; document any deliberate scale deviations in a comment | LND | 2 | 1 | L | 4 |
| 79 | Confirm the `width="22" height="22"` Spotify circle in landing.html line 562 is documented as a brand asset at 24 px `--icon-lg` | LND | 2 | 1 | L | 4 |
| 80 | Confirm the `width="28" height="20"` YouTube pill in landing.html line 585 is annotated as a brand lockup, not subject to icon size tokens | LND | 1 | 1 | L | 4 |
| 81 | Ensure the V8 recommendations strip tag icons use `--icon-sm` at `stroke-width="2"` | V8 | 2 | 1 | L | 4 |
| 82 | Ensure every icon in the V8 artist credits section uses `--icon-md` at `stroke-width="1.5"` | V8 | 2 | 1 | L | 4 |
| 83 | Add an `<!-- ICON CONTRACT: Lucide source, --icon-sm 16px / --icon-md 20px / --icon-lg 24px, stroke-width 2/1.5 -->` comment near the first icon in each HTML file | ALL | 2 | 1 | L | 5 |
| 84 | After icon normalisation, perform a full Playwright visual diff between old and new screenshots to confirm zero unexpected regressions | ALL | 4 | 2 | M | 5 |
| 85 | Add an optional accessible `<title>` inside each sprite `<symbol>` for icons that serve as interactive controls | ALL | 2 | 2 | L | 5 |
| 86 | Add a CI step that diffs `icons/sprite.svg` against the previous commit and fails if any symbol is removed without a `<!-- deprecated -->` comment | ALL | 3 | 2 | M | 5 |
| 87 | Add graceful `<img>` fallback for `<use>` sprite references in browsers where SVG external reference is unsupported | ALL | 2 | 2 | M | 5 |
| 88 | Validate that no icon symbol ID is duplicated in the sprite | ALL | 2 | 1 | L | 5 |
| 89 | Confirm no orphaned symbols remain in the sprite after any future icon removal — cross-reference against all `<use>` references | ALL | 2 | 1 | L | 5 |
| 90 | Build a static HTML catalogue at `icons/index.html` listing all sprite symbols with names and pixel-size previews | ALL | 3 | 2 | L | 5 |
| 91 | Update `docs/audit/dimensions/A4-icon-system-consistency.md` status to "Complete" and add before/after SVG size samples once Wave 1–2 fixes are shipped | ALL | 2 | 1 | L | 5 |
| 92 | Add a Playwright test asserting that all `.pill svg` elements in V8 render at exactly 20 px | V8 | 3 | 2 | M | 5 |
| 93 | Add a Playwright test asserting that all `.btn-primary svg` and `.btn-secondary svg` in V8 render at exactly 20 px | V8 | 3 | 2 | M | 5 |
| 94 | Add a Playwright test asserting all `.icon--lg` elements render at exactly 24 px in all four pages | ALL | 3 | 2 | M | 5 |
| 95 | Confirm V8 ambient glow pseudo-elements (`::before`, `::after`) do not accidentally render beside icon elements due to misplaced positioning | V8 | 2 | 1 | L | 5 |
| 96 | Confirm every icon `<svg>` in admin.html that is nested inside a `<button>` inherits the button's disabled state visually (opacity reduction) | ADM | 2 | 1 | L | 5 |
| 97 | Confirm every icon `<svg>` in V8 that is nested inside a `<button>` or `<a>` inherits the disabled or pressed state visually | V8 | 2 | 1 | L | 5 |
| 98 | Cross-reference the completed icon sprite against all four pages to confirm 100% coverage with zero inline SVGs remaining outside of brand assets | ALL | 3 | 2 | M | 6 |
| 99 | Schedule a quarterly icon audit to verify any new icons added comply with the size and stroke contract, referencing this dimension | ALL | 2 | 1 | L | 6 |
| 100 | Add the icon system contract to the onboarding section of `CLAUDE.md` so all future contributors are aware of the standard before touching any SVG | ALL | 3 | 1 | L | 6 |
