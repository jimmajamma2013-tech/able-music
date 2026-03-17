# Dimension A5 — Component Inventory
**Category:** Visual Design & Design System
**Phase:** 2 (Visual)
**Status:** Not started

Every reusable UI component — buttons, pills, cards, bottom sheets, stat cards, snap cards, and gold lock overlays — should be implemented exactly once and shared across pages, not re-implemented per page with slight variations. Currently, ABLE's four active HTML files each contain their own button styles (`.btn-primary` in V8, `.sb-btn` in admin, pill-style CTAs in start.html, and `switcher-cta` in landing), their own card radius/shadow values, and their own sheet patterns, creating inconsistent visual weight and compounding maintenance burden. Full compliance means a `shared/components.css` (and optionally `shared/components.js`) holds the single source of truth for each component, and each page imports only what it needs with page-level overrides expressed through CSS custom properties, not by rewriting the component.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Audit all four pages and produce a written list of every component class name, noting duplicates and variations (`.btn-primary` vs `.sb-btn` vs `.switcher-cta` vs `.cta-btn`) | ALL | 5 | 2 | L | 1 |
| 2 | Define the canonical primary button spec (height 48px, padding 0 24px, `--r-sm` radius, accent fill, `DM Sans` 600 15px) in `shared/components.css` under `.btn-primary` | ALL | 5 | 2 | M | 1 |
| 3 | Define the canonical secondary/ghost button spec (border `1.5px solid rgba(255,255,255,0.18)`, transparent fill, same height/font) in `shared/components.css` under `.btn-secondary` | ALL | 5 | 2 | M | 1 |
| 4 | Replace admin.html's `.sb-btn` primary button style with the shared `.btn-primary` class, adjusting only the amber accent via `--acc` override | ADM | 5 | 2 | M | 1 |
| 5 | Replace landing.html's `.switcher-cta` with the shared `.btn-secondary` class, removing the duplicate `border-radius: 10px` and `font-family: var(--font-body)` overrides | LND | 4 | 2 | M | 1 |
| 6 | Replace start.html's inline pill-style CTAs (`.cta-pill`, `border-radius:100px` buttons) with the shared `.btn-primary` class | STR | 4 | 2 | M | 1 |
| 7 | Define the canonical `.pill` component (platform/link pill) in `shared/components.css` covering height, padding, font, radius `--r-pill`, and `bloom` / `shimmer` animations | ALL | 4 | 3 | M | 1 |
| 8 | Define the canonical `.card` component in `shared/components.css` with `background: var(--color-card)`, `border-radius: var(--r-lg)`, and a standard `border: 1px solid rgba(255,255,255,0.07)` | ALL | 4 | 2 | M | 1 |
| 9 | Define the canonical `.bottom-sheet` component in `shared/components.css` covering `position: fixed`, `bottom: 0`, `border-radius: var(--r-xl) var(--r-xl) 0 0`, `backdrop-filter`, and the drag-handle element | ALL | 5 | 3 | M | 1 |
| 10 | Define the canonical `.stat-card` component in `shared/components.css` covering the value/label/trend layout, min-height, and border | ADM | 4 | 2 | M | 1 |
| 11 | Define the canonical `.snap-card` component in `shared/components.css` covering the icon-slot, title, body, and CTA affordance | V8 | 4 | 3 | M | 1 |
| 12 | Define the canonical `.gold-lock` overlay component in `shared/components.css` covering the blurred preview, overlay panel, icon, headline, and upgrade CTA | ALL | 4 | 3 | M | 1 |
| 13 | Add `<link rel="stylesheet" href="shared/components.css">` to all four pages and remove the now-redundant inline button rules | ALL | 5 | 2 | H | 1 |
| 14 | Remove the V8-specific `.btn-primary` and `.btn-secondary` CSS rules that duplicate what is now in `shared/components.css`, keeping only V8-specific overrides | V8 | 4 | 2 | M | 2 |
| 15 | Remove the admin-specific button rules that duplicate `shared/components.css`, keeping only amber-accent overrides | ADM | 4 | 2 | M | 2 |
| 16 | Remove the start.html-specific button rules that duplicate `shared/components.css`, keeping only wizard-context overrides | STR | 4 | 2 | M | 2 |
| 17 | Remove the landing.html-specific button rules that duplicate `shared/components.css`, keeping only marketing-page overrides | LND | 4 | 2 | M | 2 |
| 18 | Confirm `.pill` in V8 and any pill variant in start.html both reference the shared `.pill` component without reimplementing `height`, `padding`, or font rules | V8 | 3 | 2 | M | 2 |
| 19 | Confirm that admin.html's `.chip` or tag elements reference the shared `.pill` component rather than re-specifying `border-radius: 100px` inline | ADM | 3 | 2 | M | 2 |
| 20 | Confirm landing.html feature-badge pills reference the shared `.pill` component | LND | 3 | 2 | M | 2 |
| 21 | Consolidate the V8 fan-join bottom sheet and the V8 presave sheet into a single shared `.bottom-sheet` component implementation with content slots | V8 | 4 | 3 | H | 2 |
| 22 | Consolidate admin.html's modal/drawer panels into a single shared `.bottom-sheet` component implementation | ADM | 4 | 3 | H | 2 |
| 23 | Confirm start.html's multi-step overlay uses the shared `.bottom-sheet` component for its slide-up container | STR | 3 | 2 | M | 2 |
| 24 | Confirm that every `.card` in V8 (music card, events card, merch card, snap card container) uses the shared card token baseline with only content-specific overrides on top | V8 | 3 | 2 | M | 2 |
| 25 | Confirm that every card in admin.html (stat card, nudge card, show card, snap card management tile) uses the shared card token baseline | ADM | 3 | 2 | M | 2 |
| 26 | Confirm that every card in landing.html (feature cards, testimonial tiles, pricing tier cards) uses the shared card token baseline | LND | 3 | 2 | M | 2 |
| 27 | Confirm that every card in start.html (vibe selector tile, CTA preview card, theme preview card) uses the shared card token baseline | STR | 3 | 2 | M | 2 |
| 28 | Define a canonical `.input` component in `shared/components.css` covering `height: 48px`, `border-radius: var(--r-sm)`, border, background, font, focus ring | ALL | 4 | 2 | M | 2 |
| 29 | Replace start.html's input styles (`border-radius:10px`, hardcoded `padding:13px 15px`) with the shared `.input` class | STR | 3 | 2 | M | 2 |
| 30 | Replace admin.html's various input styles (multiple hardcoded `border-radius:10px` rules across sections) with the shared `.input` class | ADM | 3 | 2 | M | 2 |
| 31 | Replace V8's join-sheet email input with the shared `.input` class | V8 | 3 | 1 | M | 2 |
| 32 | Define a canonical `.toast` component in `shared/components.css` based on the `able-toast` implementation currently duplicated across V8 and admin.html | ALL | 4 | 2 | M | 2 |
| 33 | Remove the V8-specific `.able-toast` inline CSS at V8 line 5216 and replace with the shared `.toast` component | V8 | 3 | 1 | M | 2 |
| 34 | Remove the admin-specific `.able-toast` inline CSS at admin.html line 2288 and replace with the shared `.toast` component | ADM | 3 | 1 | M | 2 |
| 35 | Define a canonical `.badge` component in `shared/components.css` for status badges (`border-radius: var(--r-pill)`, `padding: 3px 8px`, font-size 11px, weight 600) | ALL | 3 | 2 | M | 3 |
| 36 | Replace all V8 badge variants (state badge, "on tonight" tag, tier tag) with the shared `.badge` component, using modifier classes for colour | V8 | 3 | 2 | M | 3 |
| 37 | Replace all admin.html badge variants (tier badge, connection status tag, show date badge) with the shared `.badge` component | ADM | 3 | 2 | M | 3 |
| 38 | Replace all landing.html badge variants (feature tag, live indicator badge) with the shared `.badge` component | LND | 3 | 2 | M | 3 |
| 39 | Replace all start.html badge variants (step counter badge, vibe label) with the shared `.badge` component | STR | 3 | 2 | M | 3 |
| 40 | Define a canonical `.avatar` component in `shared/components.css` for artist avatar circles (`border-radius: 50%`, token sizes `--avatar-sm/md/lg`) | ALL | 3 | 2 | M | 3 |
| 41 | Replace V8 artist avatar elements with the shared `.avatar` component | V8 | 3 | 1 | M | 3 |
| 42 | Replace admin.html avatar elements (sidebar avatar, fan list avatars) with the shared `.avatar` component | ADM | 3 | 1 | M | 3 |
| 43 | Replace landing.html testimonial avatar elements with the shared `.avatar` component | LND | 2 | 1 | M | 3 |
| 44 | Define a canonical `.divider` component (`height: 1px`, `background: rgba(255,255,255,0.06)`, `margin: 0`) in `shared/components.css` | ALL | 2 | 1 | L | 3 |
| 45 | Replace all per-page `<hr>` or manually styled horizontal rules with the shared `.divider` class | ALL | 2 | 2 | L | 3 |
| 46 | Define a canonical `.progress-bar` component (used in V8 presave countdown and admin stats) in `shared/components.css` | ALL | 3 | 2 | M | 3 |
| 47 | Replace V8 progress bar rules with the shared `.progress-bar` component | V8 | 3 | 1 | M | 3 |
| 48 | Replace admin.html progress bar rules with the shared `.progress-bar` component | ADM | 3 | 1 | M | 3 |
| 49 | Define a canonical `.section-heading` component (`font-family: var(--font-display)`, `font-size: clamp()`, `font-weight: 700`, `letter-spacing`) in `shared/components.css` | ALL | 3 | 2 | M | 3 |
| 50 | Replace per-page section heading styles in V8 with the shared `.section-heading` class | V8 | 3 | 2 | M | 3 |
| 51 | Replace per-page section heading styles in admin.html with the shared `.section-heading` class | ADM | 3 | 2 | M | 3 |
| 52 | Replace per-page section heading styles in landing.html with the shared `.section-heading` class | LND | 3 | 2 | M | 3 |
| 53 | Replace per-page section heading styles in start.html with the shared `.section-heading` class | STR | 3 | 2 | M | 3 |
| 54 | Define a canonical `.empty-state` component (icon + headline + body copy + optional CTA) in `shared/components.css` for zero-data views | ALL | 3 | 2 | M | 3 |
| 55 | Replace the V8 empty music section placeholder with the shared `.empty-state` component | V8 | 3 | 1 | M | 3 |
| 56 | Replace admin.html's empty fan list, empty shows list, and empty snap cards states with the shared `.empty-state` component | ADM | 3 | 2 | M | 3 |
| 57 | Define a canonical `.loading-spinner` component in `shared/components.css` referencing the standard spinner SVG from the icon system | ALL | 3 | 2 | M | 3 |
| 58 | Replace all per-page spinner implementations with the shared `.loading-spinner` component | ALL | 3 | 2 | M | 3 |
| 59 | Define a canonical `.overlay-backdrop` component (`position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px)`) in `shared/components.css` | ALL | 3 | 2 | M | 4 |
| 60 | Replace V8's per-page overlay backdrop rules with the shared `.overlay-backdrop` component | V8 | 3 | 1 | M | 4 |
| 61 | Replace admin.html's per-page overlay backdrop rules with the shared `.overlay-backdrop` component | ADM | 3 | 1 | M | 4 |
| 62 | Define a canonical `.tooltip` component in `shared/components.css` with `position: absolute`, `background`, font size, `border-radius: var(--r-sm)`, and `z-index: var(--z-tooltip)` | ALL | 3 | 2 | M | 4 |
| 63 | Replace admin.html's per-page tooltip styles (currently `z-index: 9999`, `white-space: nowrap`) with the shared `.tooltip` component | ADM | 3 | 1 | M | 4 |
| 64 | Replace V8's per-page tooltip styles with the shared `.tooltip` component | V8 | 3 | 1 | M | 4 |
| 65 | Define a canonical `.snap-card__cta` link button style in `shared/components.css` for the snap card's tap-to-open affordance | V8 | 3 | 2 | M | 4 |
| 66 | Define a canonical `.gold-lock__cta` upgrade button style in `shared/components.css` using `--acc` (amber) for the upgrade action | ALL | 3 | 2 | M | 4 |
| 67 | Confirm that start.html's vibe-selector tiles re-use the `.card` component and do not introduce a third card implementation | STR | 3 | 1 | M | 4 |
| 68 | Confirm that start.html's theme-preview tiles re-use the `.card` component | STR | 3 | 1 | M | 4 |
| 69 | Confirm that landing.html's phone mockup frame is not sharing class names with page card components, preventing style bleed | LND | 2 | 1 | L | 4 |
| 70 | Define a canonical `.form-label` component in `shared/components.css` for form field labels (font-size 12px, weight 500, letter-spacing 0.04em, `var(--color-text-2)`) | ALL | 2 | 1 | L | 4 |
| 71 | Replace per-page form label styles in start.html with the shared `.form-label` class | STR | 2 | 1 | L | 4 |
| 72 | Replace per-page form label styles in admin.html with the shared `.form-label` class | ADM | 2 | 1 | L | 4 |
| 73 | Replace per-page form label styles in V8's join sheet with the shared `.form-label` class | V8 | 2 | 1 | L | 4 |
| 74 | Define a canonical `.select` component in `shared/components.css` for `<select>` dropdown elements, consistent with `.input` sizing | ALL | 2 | 2 | M | 4 |
| 75 | Replace admin.html `<select>` styles with the shared `.select` component | ADM | 2 | 1 | M | 4 |
| 76 | Replace start.html `<select>` styles with the shared `.select` component | STR | 2 | 1 | M | 4 |
| 77 | Define a canonical `.checkbox` / `.toggle` component in `shared/components.css` for toggle switches used in admin.html | ADM | 3 | 2 | M | 4 |
| 78 | Replace admin.html per-section toggle implementations with the shared `.toggle` component | ADM | 3 | 2 | M | 4 |
| 79 | Define a canonical `.notice` component (informational banner, `border-left: 3px solid var(--color-accent)`, `padding: 12px 16px`, `border-radius: var(--r-sm)`) in `shared/components.css` | ALL | 2 | 1 | L | 4 |
| 80 | Replace admin.html nudge card banners with the shared `.notice` component where applicable | ADM | 2 | 1 | L | 4 |
| 81 | Add JSDoc comments to every exported component in `shared/components.css` describing usage and custom property hooks | ALL | 2 | 2 | L | 5 |
| 82 | Add a Playwright test that asserts `.btn-primary` computed height is 48px on all four pages | ALL | 3 | 2 | M | 5 |
| 83 | Add a Playwright test that asserts `.card` computed `border-radius` matches `--r-lg` on all four pages | ALL | 3 | 2 | M | 5 |
| 84 | Add a Playwright test that asserts `.bottom-sheet` `border-radius` applies `--r-xl` on the top-left and top-right corners on all pages that use it | ALL | 3 | 2 | M | 5 |
| 85 | Add a Playwright test that asserts `.toast` appears at the top of the viewport within 300 ms of the triggering action | ALL | 3 | 2 | M | 5 |
| 86 | Document all shared components, their custom property hooks, and modifier classes in `docs/systems/DESIGN_SYSTEM_SPEC.md` under a "Components" section | ALL | 3 | 2 | L | 5 |
| 87 | Document the `.gold-lock` component pattern — blur level, overlay opacity, amber CTA — in `docs/systems/tier-gates/SPEC.md` | ALL | 3 | 1 | L | 5 |
| 88 | Confirm that removing per-page button CSS does not break any page at 375 px or 390 px viewport widths by running Playwright mobile tests | ALL | 4 | 2 | M | 5 |
| 89 | Confirm that removing per-page card CSS does not break any page layout at any standard breakpoint | ALL | 4 | 2 | M | 5 |
| 90 | Confirm that the shared `.bottom-sheet` component passes the 44px drag-handle tap-target requirement on mobile | ALL | 4 | 1 | L | 5 |
| 91 | Confirm that the shared `.btn-primary` meets the 44px minimum tap-target height requirement on all pages | ALL | 4 | 1 | L | 5 |
| 92 | Confirm that the shared `.pill` component meets the 44px minimum tap-target height requirement or is accompanied by an invisible tap-target expansion | ALL | 4 | 1 | L | 5 |
| 93 | Confirm that `shared/components.css` does not import any Google Fonts or external resources — fonts remain the responsibility of each page's `<head>` | ALL | 2 | 1 | L | 5 |
| 94 | Confirm that all four theme variants (dark, light, glass, contrast) still work correctly after all shared component rules are applied | ALL | 5 | 2 | M | 5 |
| 95 | Confirm that all seven vibe variants still produce correct visual output for every shared component after the component migration | V8 | 4 | 2 | M | 5 |
| 96 | Confirm that the admin amber accent (`--acc: #f4b942`) does not bleed into V8 shared component styles due to cascade order | ADM | 3 | 1 | M | 5 |
| 97 | After all per-page component CSS is removed, run a `grep` pass for orphaned class names no longer used in any HTML and remove them | ALL | 2 | 1 | L | 6 |
| 98 | Add the shared component architecture to `CLAUDE.md` working rules so future contributors know to edit `shared/components.css` rather than per-page `<style>` blocks | ALL | 3 | 1 | L | 6 |
| 99 | Produce a final component inventory table in `docs/systems/DESIGN_SYSTEM_SPEC.md` listing every canonical component name, its CSS file location, and its custom property hooks | ALL | 3 | 1 | L | 6 |
| 100 | Schedule a monthly component audit to catch any new per-page reimplementations introduced by future feature work | ALL | 2 | 1 | L | 6 |
