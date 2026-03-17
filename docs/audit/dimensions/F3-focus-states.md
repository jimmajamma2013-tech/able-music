# Dimension F3 — Focus State Completeness
**Category:** Interaction States & Motion
**Phase:** 7

*Every focusable element across all four pages must have a three-layer focus ring. No element may suppress focus visibility with `outline: none` without providing an equal or better replacement. This is both an accessibility requirement (WCAG 2.4.11 at AA) and a premium polish signal — a crisp, consistent focus ring reads as professional craftsmanship.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Verify the global `:focus-visible` rule on able-v7.html — confirm it applies the three-layer ring pattern | V7 | 5 | 1 | L | 1 |
| 2 | Verify the global `:focus-visible` rule on admin.html | ADM | 5 | 1 | L | 1 |
| 3 | Verify the global `:focus-visible` rule on start.html | STR | 5 | 1 | L | 1 |
| 4 | Verify the global `:focus-visible` rule on landing.html | LND | 5 | 1 | L | 1 |
| 5 | Confirm the three-layer ring pattern is: `outline: 2px solid var(--color-accent); outline-offset: 3px; box-shadow: 0 0 0 5px rgba(accent-rgb, 0.25)` | ALL | 4 | 1 | L | 1 |
| 6 | Audit every selector that sets `outline: none` or `outline: 0` across able-v7.html — each must have a `:focus-visible` replacement | V7 | 5 | 1 | L | 1 |
| 7 | Audit every `outline: none` in admin.html | ADM | 5 | 1 | L | 1 |
| 8 | Audit every `outline: none` in start.html | STR | 5 | 1 | L | 1 |
| 9 | Audit every `outline: none` in landing.html | LND | 5 | 1 | L | 1 |
| 10 | Verify the modal close button (×) in admin.html has a visible focus ring | ADM | 4 | 1 | L | 1 |
| 11 | Verify the bottom sheet inputs (`.bs-field`) use the three-layer ring on focus, not just `border-color: #c4880a` | ADM | 4 | 1 | L | 1 |
| 12 | Verify admin `.field-input` focus states use the three-layer system, not an ad-hoc border change | ADM | 4 | 1 | L | 1 |
| 13 | Verify start.html text input focus states use the three-layer system | STR | 4 | 1 | L | 1 |
| 14 | Verify the platform pill links on able-v7.html have the three-layer focus ring | V7 | 4 | 1 | L | 1 |
| 15 | Verify FAQ accordion trigger buttons on landing.html have the three-layer focus ring | LND | 3 | 1 | L | 1 |
| 16 | Add a visible skip-to-content link on every page that becomes visible on first Tab press | ALL | 4 | 2 | M | 2 |
| 17 | Verify the skip link itself has a three-layer focus ring when visible | ALL | 4 | 1 | L | 2 |
| 18 | Verify hero CTA buttons on able-v7.html have the three-layer focus ring using `--color-accent` | V7 | 5 | 1 | L | 1 |
| 19 | Verify hero CTA buttons in landing.html have the three-layer focus ring | LND | 4 | 1 | L | 1 |
| 20 | Verify the fan capture email input has the three-layer focus ring | V7 | 5 | 1 | L | 1 |
| 21 | Verify the fan capture submit button has the three-layer focus ring | V7 | 5 | 1 | L | 1 |
| 22 | Verify the admin tab bar navigation items have focus rings when navigated by keyboard | ADM | 4 | 1 | L | 1 |
| 23 | Verify the campaign state buttons (`.chq-state-btn`) have the three-layer focus ring | ADM | 4 | 1 | L | 1 |
| 24 | Verify the gig mode toggle has a three-layer focus ring | ADM | 4 | 1 | L | 1 |
| 25 | Verify all `<select>` elements in admin.html have a custom focus ring (native select focus is inconsistent across browsers) | ADM | 3 | 2 | M | 2 |
| 26 | Verify all `<input type="date">` elements have a custom focus ring | ALL | 3 | 2 | M | 2 |
| 27 | Verify the colour picker input in admin has a focus ring | ADM | 3 | 1 | L | 2 |
| 28 | Verify the admin save button focus uses the amber `--dash-acc` ring, not the artist accent | ADM | 3 | 1 | L | 1 |
| 29 | Verify the snap card edit and delete icon buttons have individual focus rings | ADM | 3 | 1 | L | 2 |
| 30 | Verify the gold lock overlay CTA buttons have a visible focus ring | ADM | 3 | 1 | L | 2 |
| 31 | Confirm focus ring is visible on the Glass theme — check that the blur background doesn't obscure the ring | V7 | 4 | 2 | M | 2 |
| 32 | Confirm focus ring is visible on the Light theme (cream background) | V7 | 4 | 1 | L | 2 |
| 33 | Confirm focus ring is visible on the Contrast theme (pure black) | V7 | 4 | 1 | L | 2 |
| 34 | Confirm focus ring on admin uses `--dash-acc` (amber) not `--color-accent` to avoid cross-surface bleed | ADM | 3 | 1 | L | 1 |
| 35 | Verify the start.html wizard step navigation (prev/next) has three-layer focus rings | STR | 4 | 1 | L | 1 |
| 36 | Verify the start.html genre chips have focus rings | STR | 3 | 1 | L | 1 |
| 37 | Verify the start.html colour swatches have focus rings | STR | 3 | 1 | L | 1 |
| 38 | Verify the start.html Spotify import button has a focus ring | STR | 3 | 1 | L | 1 |
| 39 | Verify all `<a>` tags styled as buttons retain focus-visible appearance | ALL | 4 | 1 | L | 1 |
| 40 | Verify the admin connection card buttons (`.ci-btn`) have focus rings | ADM | 3 | 1 | L | 2 |
| 41 | Verify the admin `.rel-action` links have focus rings | ADM | 2 | 1 | L | 2 |
| 42 | Verify the fan list rows — if any cell is focusable (star, delete), it has a ring | ADM | 3 | 1 | L | 2 |
| 43 | Verify the admin analytics period selector tabs have focus rings | ADM | 2 | 1 | L | 2 |
| 44 | Confirm focus ring outline-offset is at least 2px — no ring that overlaps the element border | ALL | 3 | 1 | L | 1 |
| 45 | Confirm focus ring outline colour has at least 3:1 contrast against the page background (WCAG 2.4.11) | ALL | 5 | 2 | M | 1 |
| 46 | Verify the focus ring third layer (spread shadow) is sized correctly — 5px spread gives enough glow | V7 | 3 | 1 | L | 1 |
| 47 | Check that focus rings are not clipped by `overflow: hidden` on any parent container | ALL | 4 | 2 | M | 2 |
| 48 | Verify the admin modal header close button has a focus ring visible against the dark card background | ADM | 4 | 1 | L | 1 |
| 49 | Verify that modals trap focus correctly — Tab cycles only within the open modal | ADM | 5 | 2 | M | 2 |
| 50 | Verify that Escape key closes modals and returns focus to the triggering element | ADM | 5 | 2 | M | 2 |
| 51 | Verify bottom sheets trap focus when open — keyboard cannot reach content behind the sheet | ADM | 4 | 2 | M | 2 |
| 52 | Verify Escape key closes bottom sheets and returns focus | ADM | 4 | 2 | M | 2 |
| 53 | Verify the able-v7.html merch card links have focus rings | V7 | 3 | 1 | L | 2 |
| 54 | Verify the able-v7.html event "get tickets" links have focus rings | V7 | 3 | 1 | L | 2 |
| 55 | Verify the able-v7.html release "stream" links have focus rings | V7 | 3 | 1 | L | 2 |
| 56 | Confirm `:focus` (not just `:focus-visible`) is not used for styling — `:focus-visible` only | ALL | 3 | 1 | L | 1 |
| 57 | Verify the admin top bar buttons (`.tb-btn`) have focus rings | ADM | 3 | 1 | L | 1 |
| 58 | Verify the landing nav CTA button has a three-layer focus ring | LND | 4 | 1 | L | 1 |
| 59 | Verify the landing footer links have minimal but visible focus rings | LND | 3 | 1 | L | 2 |
| 60 | Verify start.html progress step dots are not focusable unless they represent navigable steps | STR | 2 | 1 | L | 2 |
| 61 | Confirm `tabindex="-1"` is set on decorative elements that should not receive keyboard focus | ALL | 3 | 1 | L | 2 |
| 62 | Confirm `tabindex="0"` is set on custom interactive elements that are not natively focusable (`div` or `span` used as buttons) | ALL | 4 | 1 | L | 1 |
| 63 | Verify the gig mode "on tonight" badge or chip has no keyboard focus (it's decorative) | V7 | 2 | 1 | L | 2 |
| 64 | Confirm the able-v7.html countdown timer numbers are not focusable (they're display-only) | V7 | 2 | 1 | L | 2 |
| 65 | Verify the admin sparkline chart has an accessible text alternative and no keyboard trap | ADM | 3 | 2 | M | 2 |
| 66 | Verify focus ring is not suppressed in any component that uses `::before` or `::after` pseudo-elements for decoration | ALL | 3 | 1 | L | 2 |
| 67 | Confirm that `:focus-visible` polyfill is not needed (all target browsers support it natively as of 2026) | ALL | 2 | 1 | L | 1 |
| 68 | Verify the landing sticky header does not cover focused elements when they scroll into view | LND | 3 | 2 | M | 2 |
| 69 | Add `scroll-margin-top` to sections that are targeted by anchor links — prevents header overlap | LND | 3 | 1 | L | 2 |
| 70 | Verify that `pointer-events: none` elements are also not keyboard-focusable (`tabindex="-1"` or not in tab order) | ALL | 3 | 1 | L | 2 |
| 71 | Check the admin upgrade bar — is the dismiss button keyboard-focusable with a ring? | ADM | 3 | 1 | L | 2 |
| 72 | Verify the admin nudge card dismiss (×) is keyboard-focusable with a ring | ADM | 3 | 1 | L | 2 |
| 73 | Verify the landing mobile nav (if present) has focus rings on all items | LND | 3 | 1 | L | 2 |
| 74 | Confirm that focus rings have `border-radius` matching the element's own radius — pill focus on pill buttons | ALL | 3 | 1 | L | 2 |
| 75 | Verify the snap card (able-v7.html update card) — if interactive, it has a focus ring | V7 | 3 | 1 | L | 2 |
| 76 | Verify the support pack cards on able-v7.html have focus rings on their CTA buttons | V7 | 3 | 1 | L | 2 |
| 77 | Add `focus-within` styles to admin form rows — entire row gets subtle highlight when a field within is focused | ADM | 2 | 1 | L | 3 |
| 78 | Verify the start.html file upload zone has a focus ring when triggered by keyboard | STR | 3 | 1 | L | 2 |
| 79 | Verify the colour picker `<input type="color">` has a three-layer focus ring | ADM | 3 | 1 | L | 2 |
| 80 | Confirm that custom radio-button or checkbox components (theme selector, vibe chips) use proper `role="radio"` + focus ring | STR | 4 | 2 | M | 2 |
| 81 | Verify the admin `.shows-row` delete icon has a focus ring | ADM | 2 | 1 | L | 2 |
| 82 | Verify the admin `.shows-row` edit icon has a focus ring | ADM | 2 | 1 | L | 2 |
| 83 | Confirm admin landing page preview link (open profile) has a focus ring | ADM | 3 | 1 | L | 2 |
| 84 | Verify focus ring alpha/opacity for the glow layer is not too low to be invisible on dark bg | V7 | 3 | 1 | L | 1 |
| 85 | Verify that `prefers-reduced-motion` does not suppress the focus ring (it should suppress animation, not the ring itself) | ALL | 4 | 1 | L | 1 |
| 86 | Confirm the able-v7.html social share button has a focus ring | V7 | 3 | 1 | L | 2 |
| 87 | Confirm the able-v7.html "stream on Spotify" etc. quick action links have individual focus rings, not just the pill container | V7 | 4 | 1 | L | 1 |
| 88 | Confirm admin `.btn-ghost` buttons have the correct (amber) focus ring | ADM | 3 | 1 | L | 2 |
| 89 | Confirm that no two different focusable element types share an identical focus ring style that creates ambiguity about which is focused | ALL | 3 | 2 | M | 3 |
| 90 | Add `:focus-visible` rule for start.html `.done-open` completion button | STR | 3 | 1 | L | 1 |
| 91 | Confirm the admin `.mode-card` campaign type selector cards receive focus if navigable by keyboard | ADM | 4 | 2 | M | 2 |
| 92 | Verify focus ring on the admin `.cta-drag-handle` if it's keyboard-operable | ADM | 2 | 1 | L | 3 |
| 93 | Verify the landing comparison table `<th>` cells are not focusable (they're not interactive) | LND | 2 | 1 | L | 3 |
| 94 | Verify the admin release card `.rel-card` — if it expands on click/enter, it needs a focus ring and role | ADM | 3 | 2 | M | 2 |
| 95 | Audit the admin `.cta-row` items — each should be keyboard-accessible with a focus ring | ADM | 3 | 2 | M | 2 |
| 96 | Verify the admin period date inputs for release scheduling have focus rings | ADM | 2 | 1 | L | 2 |
| 97 | Run a full keyboard Tab-through on each page and log every element that loses visible focus | ALL | 5 | 2 | L | 1 |
| 98 | Run axe or similar audit tool on each page and confirm zero "insufficient focus indicator" violations | ALL | 5 | 2 | L | 1 |
| 99 | Document the three-layer focus ring tokens and values in DESIGN_SYSTEM_SPEC.md for future development | ALL | 3 | 1 | L | 2 |
| 100 | Final check: on each page, confirm the very first Tab press lands on a skip link or the first meaningful interactive element (not the browser chrome) | ALL | 4 | 1 | L | 2 |

## Wave Summary

| Wave | Points | Focus |
|---|---|---|
| Wave 1 | 1–15, 18–24, 28, 34–39, 44–46, 56–58, 62, 67, 84–85, 87, 90, 97–98 | Global rules, core buttons, form inputs, modal/sheet focus, token compliance |
| Wave 2 | 16–17, 25–33, 40–55, 59–66, 68–83, 86, 88, 91–96, 99–100 | Custom controls, overflow clipping, skip links, all states, ARIA roles |
| Wave 3 | 77, 89, 92–93 | Micro-polish, ambiguity audit |
