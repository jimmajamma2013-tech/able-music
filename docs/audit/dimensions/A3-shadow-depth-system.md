# Dimension A3 — Shadow and Depth System
**Category:** Visual Design & Design System
**Phase:** 2 (Visual)
**Status:** In progress via Wave system

*A coherent shadow system communicates elevation and separates layers without visual noise. Currently able-v8.html has one named `--shadow-card` token (varying by theme) but most other shadow values are hardcoded throughout all four files. The absence of `--shadow-lift` and `--shadow-glow` tokens means card hover states, modal overlays, and accent-glow effects all use unique raw `box-shadow` values that cannot be globally tuned. This dimension maps every shadow usage and defines a complete named system.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Define `--shadow-card` token in V8 `:root` for dark theme: `0 4px 28px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04)` — already declared, verify it is used exclusively and not bypassed | V8 | 4 | 1 | L | 1 |
| 2 | Define `--shadow-card` token in V8 `:root` for light theme: `0 2px 16px rgba(0,0,0,0.07)` — already declared; verify it overrides the dark value correctly under `[data-theme="light"]` | V8 | 4 | 1 | L | 1 |
| 3 | Define `--shadow-card` token in V8 `:root` for glass theme: `0 2px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.10)` — already declared; verify glass card surfaces use this | V8 | 4 | 1 | L | 1 |
| 4 | Define `--shadow-card` token in V8 `:root` for contrast theme: `0 2px 16px rgba(0,0,0,0.8)` — already declared; verify maximum-black backgrounds use high-opacity shadow | V8 | 4 | 1 | L | 1 |
| 5 | Add `--shadow-lift` token to V8 `:root` covering the hover/lifted state: `0 12px 40px rgba(0,0,0,0.6)` — currently hardcoded on `.release-card:hover` and similar | V8 | 4 | 1 | L | 1 |
| 6 | Add `--shadow-lift` light theme variant to V8 `:root` under `[data-theme="light"]`: `0 8px 32px rgba(0,0,0,0.12)` — currently the light theme has no named lift shadow | V8 | 4 | 1 | L | 1 |
| 7 | Add `--shadow-glow` token to V8 `:root`: `0 8px 40px var(--color-accent-glow)` — currently hardcoded on `.btn-primary` and hero CTA elements | V8 | 4 | 1 | L | 1 |
| 8 | Add `--shadow-glow` contrast theme variant to V8 `:root` under `[data-theme="contrast"]`: `0 0 0 1px var(--color-accent)` — contrast theme uses border-as-shadow, not colour diffusion | V8 | 3 | 1 | L | 2 |
| 9 | Add `--shadow-modal` token to V8 `:root`: `0 32px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)` — currently hardcoded on the bottom sheet element | V8 | 3 | 1 | L | 2 |
| 10 | Add `--shadow-modal` light theme variant: `0 32px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)` | V8 | 3 | 1 | L | 2 |
| 11 | Add `--shadow-flat` token to V8 `:root` for subtle surface separation: `0 1px 0 rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.5)` — currently used on the tab bar | V8 | 3 | 1 | L | 2 |
| 12 | Add `--shadow-flat` light theme variant: `0 1px 0 rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.08)` | V8 | 3 | 1 | L | 2 |
| 13 | Define `--shadow-card` token in admin `:root`: `0 2px 8px rgba(0,0,0,.08)` — currently hardcoded on `.dash-card` | ADM | 4 | 1 | L | 1 |
| 14 | Define `--shadow-flat` token in admin `:root`: `0 1px 4px rgba(0,0,0,.06)` — currently hardcoded on `.dash-card` overflow container | ADM | 3 | 1 | L | 2 |
| 15 | Define `--shadow-lift` token in admin `:root` for the hover state on interactive cards: `0 4px 16px rgba(0,0,0,.12)` — admin card hovers currently have no shadow lift | ADM | 3 | 1 | L | 2 |
| 16 | Add `--shadow-focus` token to admin: `0 0 0 2px var(--dash-bg), 0 0 0 4px var(--acc), 0 0 0 6px rgba(var(--acc-rgb), 0.25)` — currently inlined in `:focus-visible` rule | ADM | 4 | 1 | L | 1 |
| 17 | Add `--shadow-focus` token to V8: `0 0 0 2px transparent, 0 0 0 3px rgba(var(--color-accent-rgb), 0.80), 0 0 0 6px rgba(var(--color-accent-rgb), 0.12)` — currently scattered across multiple focus rules | V8 | 4 | 1 | L | 1 |
| 18 | Replace all hardcoded `box-shadow` values on `.release-card` hover state in V8 with `--shadow-lift` token | V8 | 3 | 1 | L | 2 |
| 19 | Replace hardcoded `box-shadow: 0 12px 48px rgba(0,0,0,0.75)` on the edit panel drawer in V8 with `--shadow-modal` token | V8 | 2 | 1 | L | 3 |
| 20 | Replace `box-shadow: 0 -4px 32px rgba(0,0,0,0.5)` on the snap card sheet footer in V8 with a `--shadow-up` token | V8 | 2 | 1 | L | 3 |
| 21 | Add `--shadow-up` token to V8 `:root` for upward-casting shadow on bottom sheets and fixed nav bars: `0 -4px 32px rgba(0,0,0,0.5)` | V8 | 3 | 1 | L | 2 |
| 22 | Add `--shadow-up` light theme variant to V8: `0 -4px 32px rgba(0,0,0,0.08)` (lighter opacity for light theme) | V8 | 3 | 1 | L | 2 |
| 23 | Add `--shadow-hero` token to V8 for the top card/hero image shadow: `0 0 0 1px rgba(255,255,255,0.05), 0 32px 120px rgba(0,0,0,0.9)` | V8 | 3 | 1 | L | 2 |
| 24 | Replace `box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 32px 120px rgba(0,0,0,0.9)` on `.hero-wrap` with `var(--shadow-hero)` | V8 | 3 | 1 | L | 2 |
| 25 | Contrast theme (`[data-theme="contrast"]`): all `box-shadow` colour values must be pure white or transparent — no grey-diffuse shadows on pure black backgrounds; add contrast-specific overrides for each shadow token | V8 | 4 | 2 | M | 2 |
| 26 | Contrast theme: remove `--shadow-card` diffuse shadow entirely under contrast theme — the visual separation should come from `border: 1px solid rgba(255,255,255,0.2)` which is already set | V8 | 4 | 1 | L | 2 |
| 27 | Glass theme: `--shadow-card` currently has both diffuse shadow AND white border (`0 0 0 1px rgba(255,255,255,0.10)`) — the border creates edge definition while the shadow adds depth behind glass; confirm both are needed | V8 | 3 | 1 | L | 2 |
| 28 | Glass theme: ensure `--shadow-glow` (accent glow) is more prominent on glass than dark theme — the glass backdrop makes glow effects pop more; increase glow opacity from 0.35 to 0.45 under glass theme | V8 | 3 | 1 | L | 3 |
| 29 | Glass theme: `backdrop-filter: blur(28px) saturate(180%)` on card surfaces creates its own visual depth — the additional `box-shadow` should be lighter than on opaque dark cards; verify glass `--shadow-card` opacity | V8 | 3 | 1 | L | 3 |
| 30 | Admin `.dash-card` currently has no named shadow token — add `box-shadow: var(--shadow-card)` to the rule and define the token in `:root` | ADM | 4 | 1 | L | 1 |
| 31 | Admin stat cards have no shadow at all (`box-shadow: 0 2px 8px rgba(0,0,0,.08)` is the only instance) — confirm this is intentional: admin stat cards are flat by design (content-dense, no lift) | ADM | 3 | 1 | L | 2 |
| 32 | Admin `.mode-card` has no explicit `box-shadow` — it uses border for definition; confirm this is correct for the admin surface (tiled cards with border-only separation) | ADM | 3 | 1 | L | 2 |
| 33 | Admin sidebar and top bar are on the `--dash-shell` surface (dark navy) — shadows on these elements are not appropriate since they sit at the edge of the viewport; confirm no erroneous shadows exist on `.sidebar` or `.top-bar` | ADM | 2 | 1 | L | 3 |
| 34 | Add `--shadow-amber-glow` token to admin: `0 3px 12px rgba(var(--acc-rgb),.3)` — currently hardcoded on `.tb-btn-acc` | ADM | 3 | 1 | L | 2 |
| 35 | Replace hardcoded `box-shadow: 0 3px 12px rgba(var(--acc-rgb),.3)` on `.tb-btn-acc` with `var(--shadow-amber-glow)` | ADM | 3 | 1 | L | 2 |
| 36 | Add `--shadow-amber-glow-hover` token to admin: `0 5px 18px rgba(var(--acc-rgb),.4)` for the hover lift on `.tb-btn-acc:hover` | ADM | 2 | 1 | L | 3 |
| 37 | Add `--shadow-glow` to admin pointing to `--shadow-amber-glow` — this creates a semantic alias that mirrors V8's concept | ADM | 2 | 1 | L | 3 |
| 38 | Landing `.nav` uses `box-shadow: 0 1px 3px rgba(8,16,40,0.3)` — replace with a `--shadow-nav` token | LND | 2 | 1 | L | 3 |
| 39 | Landing `.btn-primary` uses `box-shadow: 0 2px 14px rgba(var(--accent-rgb),0.28), 0 1px 3px rgba(var(--accent-rgb),0.18)` — this is the CTA button glow; define as `--shadow-cta-glow` | LND | 3 | 1 | L | 2 |
| 40 | Replace hardcoded CTA glow on landing `.btn-primary` and `.btn-next` on start.html with `--shadow-cta-glow` token | LND | 3 | 1 | L | 2 |
| 41 | Start.html `.btn-next` uses `0 4px 18px rgba(var(--acc-rgb),.38)` — replace with `--shadow-cta-glow` token | STR | 3 | 1 | L | 2 |
| 42 | Landing demo phone uses `0 48px 120px rgba(0,0,0,0.85), 0 16px 40px rgba(0,0,0,0.6)` — this is a decorative product mockup shadow; define as `--shadow-device` for reuse if phone mockup appears elsewhere | LND | 2 | 1 | L | 4 |
| 43 | Confirm the landing `pricing-card` uses the `--shadow-card` token (or a landing-specific card shadow) not a hardcoded value | LND | 3 | 1 | L | 2 |
| 44 | V8 fan capture form focus state: `box-shadow: 0 0 0 3px var(--color-accent-soft)` — this is a form-focus shadow, should be `--shadow-field-focus` token | V8 | 3 | 1 | L | 3 |
| 45 | V8 field focus glow: `-webkit-box-shadow: 0 0 0 100px var(--color-surface) inset` (autofill override) — this is a special case that cannot be tokenised meaningfully; document as intentional hardcode | V8 | 2 | 1 | L | 4 |
| 46 | V8 bottom sheet (`.booking-sheet`) uses `0 -4px 32px rgba(0,0,0,0.5)` — replace with `--shadow-up` token | V8 | 3 | 1 | L | 2 |
| 47 | V8 stat counter pulse animation uses `box-shadow: 0 0 0 0 rgba(accent, 0.5)` → `0 0 0 6px rgba(accent, 0)` — this is an animated glow ring; cannot fully tokenise keyframe endpoints but the initial colour reference should use `--color-accent-rgb` | V8 | 3 | 1 | L | 3 |
| 48 | V8 fan capture success pulse uses a keyframe animation with box-shadow — confirm it uses `--color-accent-rgb` for the pulse colour, not a hardcoded value | V8 | 3 | 1 | L | 2 |
| 49 | V8 `.snap-card` has no explicit shadow — determine if snap cards should have `--shadow-card` or be flat (they are inside a section that already has card shadow) | V8 | 3 | 1 | L | 3 |
| 50 | V8 clip cards (`.clip-card`) have no explicit shadow — confirm they should be flat since they are media items, not information cards | V8 | 2 | 1 | L | 4 |
| 51 | V8 merch cards have no explicit shadow — confirm they use `--shadow-card` consistent with release cards | V8 | 3 | 1 | L | 3 |
| 52 | V8 show/events cards have no explicit shadow — confirm if events table rows should have a flat or card shadow treatment | V8 | 2 | 1 | L | 4 |
| 53 | V8 support pack cards have `box-shadow` on hover (`0 4px 20px rgba(0,0,0,0.35)`) — replace with `--shadow-lift` | V8 | 2 | 1 | L | 3 |
| 54 | V8 world map section (`.world-map`) has no shadow on the map container — check whether the map needs `--shadow-card` to lift it from the page background | V8 | 2 | 1 | L | 4 |
| 55 | V8 pill buttons (quick action pills) have no shadow — confirm they are intentionally flat (pills read as surface controls, not elevated cards) | V8 | 2 | 1 | L | 4 |
| 56 | V8 hero CTA buttons have `--shadow-glow` (accent glow) — confirm the ghost/secondary button has NO shadow (ghost buttons do not cast light) | V8 | 3 | 1 | L | 2 |
| 57 | V8 toast notification (`--z-toast: 9999`) has `background: var(--color-accent)` — confirm it also has a `--shadow-modal`-level elevation shadow since it sits above all other content | V8 | 3 | 1 | L | 3 |
| 58 | V8 edit FAB (floating action button) at bottom-right of profile should have `--shadow-lift` to float above scroll content | V8 | 3 | 1 | L | 2 |
| 59 | V8 tab bar has `--shadow-flat` (`0 -1px 0 rgba(255,255,255,0.04), 0 -16px 48px rgba(0,0,0,0.5)`) — this is an upward shadow; confirm it is using `var(--shadow-flat)` or `var(--shadow-up)` | V8 | 3 | 1 | L | 2 |
| 60 | V8 contrast theme tab bar: the upward shadow should be `0 -1px 0 rgba(255,255,255,0.2)` (maximum contrast border only); add this under `[data-theme="contrast"]` | V8 | 3 | 1 | L | 2 |
| 61 | Admin `.field-input:focus` uses `box-shadow: 0 0 0 3px rgba(var(--acc-rgb), 0.18)` — replace with `--shadow-field-focus` token in admin | ADM | 3 | 1 | L | 2 |
| 62 | Admin field focus ring and the `:focus-visible` global rule are two different mechanisms — ensure they are not double-applying shadows | ADM | 3 | 1 | L | 2 |
| 63 | Admin `.live-chip` has a `6px` dot indicator with no shadow — confirm a subtle glow (`0 0 4px rgba(artist-accent-rgb, 0.5)`) should be added to the live indicator dot | ADM | 2 | 1 | L | 4 |
| 64 | Confirm that no element on any page uses `text-shadow` without a corresponding token — `text-shadow` is part of the depth system | ALL | 2 | 1 | L | 4 |
| 65 | V8 artist name on hero: `text-shadow: 0 2px 16px rgba(0,0,0,0.7)` is hardcoded on the phone preview in start.html — define as `--text-shadow-hero` token | STR | 2 | 1 | L | 4 |
| 66 | Landing phone preview `.ph-n` has `text-shadow: 0 2px 12px rgba(0,0,0,.5)` hardcoded — should use the same `--text-shadow-hero` token | LND | 2 | 1 | L | 4 |
| 67 | V8 hero artwork loading uses `box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06)` for the inner border on the placeholder — define as `--shadow-inset-border` token | V8 | 2 | 1 | L | 4 |
| 68 | V8 light theme hero artwork: `box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06)` — add this as the light theme variant of `--shadow-inset-border` | V8 | 2 | 1 | L | 4 |
| 69 | Confirm admin `.sb-artist` avatar uses `box-shadow: 0 0 0 1.5px rgba(255,255,255,.18)` — this is a ring/halo effect; define as `--shadow-avatar-ring` | ADM | 2 | 1 | L | 4 |
| 70 | Start.html confetti canvas (`#confettiCanvas`) has no shadow — confirm this is correct (canvas is decorative overlay, not a UI surface) | STR | 1 | 1 | L | 5 |
| 71 | Landing comparison table `border:1px solid var(--border)` provides edge definition without shadow — confirm this is intentional (tables are flat, not elevated) | LND | 2 | 1 | L | 4 |
| 72 | Landing feature cards use `border: 1px solid var(--border); border-radius: 18px` but no shadow — confirm feature cards are intentionally flat (they are informational tiles, not action cards) | LND | 2 | 1 | L | 4 |
| 73 | Landing pricing cards should have a subtle shadow to lift them from the section background — add `--shadow-card` to landing `:root` and apply to `.pricing-card` | LND | 3 | 1 | L | 2 |
| 74 | V8 recommendation cards (`.rec-item`) have no explicit shadow — determine if they should have `--shadow-card` or flat treatment | V8 | 2 | 1 | L | 4 |
| 75 | V8 credits section cards (`.credit-item`) have no shadow — confirm flat treatment is intentional (credits are a list, not elevated cards) | V8 | 2 | 1 | L | 5 |
| 76 | V8 close circle button in the edit bar uses a circular shape — confirm it has a `--shadow-lift` to float above the profile content | V8 | 2 | 1 | L | 4 |
| 77 | Confirm that the `box-shadow` on `::before` and `::after` pseudo-elements (used for the loading curtain in admin) uses a token | ADM | 2 | 1 | L | 4 |
| 78 | V8 glass theme: `--color-accent-glow` under glass should not create a double-glow effect when accent fills are placed over the backdrop — test this visually and reduce glow opacity if needed | V8 | 3 | 2 | M | 3 |
| 79 | Confirm the admin theme chip (`.theme-chip.on`) uses `box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 0 0 1px var(--dash-border)` — this is a subtle selected-state indicator; define as `--shadow-selected` | ADM | 2 | 1 | L | 4 |
| 80 | V8 state chip (`.state-chip`) that shows campaign state — confirm it has no shadow (chip/badge elements should be flat, using background colour for status) | V8 | 2 | 1 | L | 4 |
| 81 | Write a shadow elevation chart in `docs/systems/DESIGN_SYSTEM_SPEC.md` mapping each named token to its intended usage: flat→card→lift→modal→toast | ALL | 4 | 2 | L | 3 |
| 82 | Add the contrast theme rule: remove ALL diffuse box-shadows under `[data-theme="contrast"]` — replace with `border: 1px solid rgba(255,255,255,0.2)` for every element that uses `--shadow-card` | V8 | 4 | 2 | M | 2 |
| 83 | Verify the glass theme background image is actually present before applying glass card shadows — if no background image exists, glass shadows look wrong; confirm `applyBackground()` guards this | V8 | 4 | 2 | M | 2 |
| 84 | V8 waveform visualiser (if present in listen section) — confirm any container uses `--shadow-card` not a hardcoded value | V8 | 2 | 1 | L | 4 |
| 85 | V8 video embed (iframe) container uses `overflow:hidden; border-radius: var(--r-lg)` — confirm it also applies `--shadow-card` for elevation | V8 | 2 | 1 | L | 4 |
| 86 | Confirm the `.able-toast` at V8's z-index 9999 has a strong shadow (`--shadow-modal` level) to read clearly over any content | V8 | 3 | 1 | L | 2 |
| 87 | Admin `.sb-qr-canvas` has `border-radius: 8px` but no shadow — confirm the QR code is flat (surrounded by white, visually self-defining) | ADM | 1 | 1 | L | 5 |
| 88 | Start.html wizard cards (each step container) should have `--shadow-card` to lift them from the dark page background | STR | 3 | 1 | L | 2 |
| 89 | Start.html phone preview frame uses `box-shadow: 0 40px 80px rgba(0,0,0,.6)` — define this as `--shadow-device` token | STR | 2 | 1 | L | 4 |
| 90 | Confirm V8 `--shadow-card` is applied via `box-shadow: var(--shadow-card)` on the `.release-card` class, not on release card sub-elements | V8 | 3 | 1 | L | 2 |
| 91 | V8 fan capture block: the email input field container should have `--shadow-flat` as a recessed/inset treatment to distinguish it from the surrounding card | V8 | 2 | 1 | L | 4 |
| 92 | V8 platform pills should have NO shadow — they are flat interactive tags, and a shadow would compete with the card-level elevation below them | V8 | 2 | 1 | L | 4 |
| 93 | Confirm the gig mode "on tonight" indicator badge has a subtle red glow (`box-shadow: 0 0 8px rgba(244,100,66,0.4)`) to signal urgency | V8 | 3 | 1 | L | 3 |
| 94 | Landing `.nav` scroll shadow (`box-shadow: 0 1px 8px rgba(var(--accent-rgb),0.22)`) is accent-tinted — this is unusual for nav shadow; reconsider whether a neutral shadow is more appropriate | LND | 2 | 1 | L | 4 |
| 95 | Confirm the admin nudge card has a subtle shadow to draw attention when a nudge first appears — the nudge is a call-to-action, slightly elevated from surrounding content | ADM | 2 | 1 | L | 4 |
| 96 | Confirm zero instances of `filter: drop-shadow()` used as a substitute for `box-shadow` — drop-shadow behaves differently and should only be used on SVGs | ALL | 3 | 1 | L | 3 |
| 97 | Confirm that no animated property is `box-shadow` — box-shadow animations trigger compositing cost; all glow animations should use opacity on a pseudo-element instead | ALL | 4 | 2 | M | 2 |
| 98 | V8 pulse animation on fan capture CTA uses `box-shadow` in a `@keyframes` — replace with an opacity-animated `::after` pseudo-element to avoid compositing | V8 | 4 | 2 | M | 3 |
| 99 | Admin button hover shadow (`box-shadow:0 5px 18px rgba(var(--acc-rgb),.4)`) uses `box-shadow` in transition — replace hover shadow with transform-based lift to avoid box-shadow animation | ADM | 3 | 2 | M | 3 |
| 100 | Final audit: document all shadow token values in `docs/systems/DESIGN_SYSTEM_SPEC.md` with elevation level, dark/light/glass/contrast variants, and rule: "never animate box-shadow — use opacity on pseudo-elements" | ALL | 4 | 2 | L | 6 |

## Wave Summary
**Wave 1 — Define the six core shadow tokens**: items #1, #2, #3, #4, #5, #6, #7, #13, #16, #17, #30
**Wave 2 — Replace hardcoded shadows with tokens**: items #8, #9, #10, #11, #12, #14, #15, #18, #20, #21, #22, #23, #24, #25, #26, #27, #34, #35, #38, #39, #40, #41, #43, #46, #56, #58, #59, #60, #61, #73, #82, #83, #86, #88
**Wave 3 — Component-level shadow decisions**: items #19, #28, #29, #31, #32, #33, #36, #37, #44, #47, #48, #49, #50, #51, #52, #53, #57, #62, #63, #78, #79, #80, #90, #93, #94, #96, #97
**Wave 4 — Fine detail and decorative shadows**: items #42, #45, #54, #55, #64, #65, #66, #67, #68, #69, #71, #72, #74, #75, #76, #77, #84, #85, #87, #89, #91, #92, #95
**Wave 5 — Animation performance**: items #98, #99
**Wave 6 — Documentation and final audit**: items #81, #100
