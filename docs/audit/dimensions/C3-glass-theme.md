# Dimension C3 — Glass Theme Completeness
**Category:** Colour, Contrast & Themes
**Phase:** 6

The Glass theme applies `backdrop-filter: blur(28px) saturate(180%)` to surfaces, creating a frosted-glass effect over the artist's background artwork. It is a key visual differentiator for ABLE and is used by artists who want a cinematic feel. The theme has multiple compounding risks: it depends on a background image to look correct, it uses multiple nested backdrop-filter layers (each has performance cost), it has no standardised fallback for Firefox which does not support backdrop-filter by default in all configurations, and contrast ratios on glass surfaces are inherently variable because the background image changes.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Audit every element that applies `backdrop-filter` in able-v8.html — list all selectors | able-v8.html | 4 | 1 | M | 1 |
| 2 | Count total backdrop-filter layers on a single screen — more than 3 simultaneous layers causes Safari perf issues | able-v8.html | 4 | 2 | H | 1 |
| 3 | Check the nav bar in Glass theme — `backdrop-filter: blur(20px) saturate(180%)` at line 595 | able-v8.html | 3 | 1 | M | 1 |
| 4 | Check whether `[data-theme="glass"]` has a CSS token block defined — confirm `--color-bg: transparent` and card overrides | able-v8.html | 5 | 1 | H | 1 |
| 5 | Verify `--color-card: rgba(255,255,255,0.08)` in glass theme — this is very transparent, text must still pass contrast | able-v8.html | 5 | 2 | H | 1 |
| 6 | Verify `--color-card-raised: rgba(255,255,255,0.12)` in glass — slightly more opaque than card | able-v8.html | 3 | 1 | M | 1 |
| 7 | Check `--color-text` (#f0ede8) in glass theme — same as dark, but background is now variable artwork | able-v8.html | 5 | 2 | H | 1 |
| 8 | Check `--color-text-2` (rgba(240,237,232,0.75)) in glass theme — 75% vs 60% in dark, deliberate increase for glass | able-v8.html | 4 | 2 | H | 1 |
| 9 | Check `--color-text-3` (rgba(240,237,232,0.55)) in glass — will fail over bright artwork sections | able-v8.html | 4 | 2 | H | 1 |
| 10 | Verify `--color-panel` (#1a1a24) and `--color-panel-raised` (#22222e) in glass theme — these are solid, not glass | able-v8.html | 3 | 1 | M | 1 |
| 11 | Define the `--backdrop` CSS variable — check if it's declared or if glass uses inline backdrop-filter rules | able-v8.html | 4 | 2 | M | 1 |
| 12 | Confirm glass theme sets `data-theme="glass"` attribute on the shell element | able-v8.html | 5 | 1 | H | 1 |
| 13 | Verify artist artwork is set as a CSS background on the shell in glass mode | able-v8.html | 4 | 2 | H | 1 |
| 14 | Check what happens when glass theme is selected but `artworkUrl` is null in localStorage — no background | able-v8.html | 5 | 2 | H | 1 |
| 15 | Define a fallback background for glass theme when no artwork is present (dark gradient) | able-v8.html | 5 | 2 | H | 1 |
| 16 | Verify the fallback ensures text still passes contrast when no artwork | able-v8.html | 5 | 1 | H | 1 |
| 17 | Check the `@supports (backdrop-filter: blur(1px))` rule — is there a fallback for non-supporting browsers? | able-v8.html | 4 | 2 | H | 1 |
| 18 | Define fallback for Firefox (no backdrop-filter) — use semi-opaque solid backgrounds | able-v8.html | 4 | 2 | M | 1 |
| 19 | Verify the `@supports` fallback actually produces readable text in Firefox | able-v8.html | 5 | 3 | H | 2 |
| 20 | Check hero section in glass theme — `--color-bg` is transparent, hero may float over artwork | able-v8.html | 4 | 2 | M | 1 |
| 21 | Verify hero artist name in glass theme — dark overlay gradient needed for readability | able-v8.html | 5 | 2 | H | 1 |
| 22 | Check hero ambient glow element in glass theme — should be visible and not fight the artwork | able-v8.html | 3 | 2 | M | 2 |
| 23 | Verify hero CTA buttons in glass theme — backdrop on buttons? Or solid accent fill? | able-v8.html | 4 | 2 | M | 1 |
| 24 | Check platform pills in glass theme — pill backgrounds must be legible | able-v8.html | 3 | 2 | M | 1 |
| 25 | Verify snap cards in glass theme — card uses rgba(255,255,255,0.08), text must be readable | able-v8.html | 4 | 2 | H | 1 |
| 26 | Check snap card backdrop-filter — do snap cards each apply their own backdrop-filter? | able-v8.html | 3 | 2 | M | 1 |
| 27 | Verify release cards in glass theme — album art on glass card | able-v8.html | 3 | 2 | M | 1 |
| 28 | Check events card in glass theme | able-v8.html | 3 | 2 | M | 1 |
| 29 | Check merch card in glass theme | able-v8.html | 3 | 2 | M | 1 |
| 30 | Verify fan capture section in glass theme — this is a critical conversion section | able-v8.html | 5 | 2 | H | 1 |
| 31 | Check fan capture input field in glass theme — frosted input on frosted background | able-v8.html | 4 | 2 | M | 1 |
| 32 | Verify fan capture submit button in glass theme — accent button over glass | able-v8.html | 4 | 2 | M | 1 |
| 33 | Check the countdown card in glass theme (pre-release state) | able-v8.html | 3 | 2 | M | 1 |
| 34 | Verify bottom sheets in glass theme — sheets use `--color-panel` (#1a1a24) which is solid | able-v8.html | 4 | 1 | L | 1 |
| 35 | Check bottom sheet backdrop scrim in glass theme — dark scrim over glass background | able-v8.html | 3 | 1 | L | 1 |
| 36 | Verify nav bar in glass theme — already applies its own backdrop-filter at line 595 | able-v8.html | 3 | 1 | M | 1 |
| 37 | Check the section headings on a fully transparent glass background | able-v8.html | 4 | 2 | M | 1 |
| 38 | Verify section dividers/separators are visible in glass theme | able-v8.html | 2 | 1 | L | 2 |
| 39 | Check `--color-accent-soft` (rgba accent 0.12) tint visibility in glass — very faint on transparent | able-v8.html | 3 | 2 | M | 2 |
| 40 | Verify ghost button `.btn-secondary` border in glass theme — rgba accent 0.45 on glass | able-v8.html | 3 | 2 | M | 1 |
| 41 | Check focus ring visibility in glass theme — `--color-accent` outline on glass card | able-v8.html | 5 | 2 | H | 1 |
| 42 | Verify skip link in glass theme — skip link appears over the glass content | able-v8.html | 2 | 1 | L | 2 |
| 43 | Check the `saturate(180%)` value — over-saturated artwork can produce harsh visual artefacts | able-v8.html | 3 | 2 | M | 2 |
| 44 | Confirm the blur radius (28px? or 20px?) — source of truth: CLAUDE.md says 28px, code says 20px for nav | able-v8.html | 3 | 1 | M | 1 |
| 45 | Standardise blur radius across all glass elements to one defined token | able-v8.html | 3 | 2 | M | 2 |
| 46 | Check performance: measure paint time with glass theme active vs dark theme on a mid-range Android | able-v8.html | 4 | 3 | H | 3 |
| 47 | Verify glass theme iframe containment — any embedded iframes (Spotify, YouTube) must not bleed through the glass | able-v8.html | 4 | 2 | H | 1 |
| 48 | Check `<iframe>` elements in glass theme — no backdrop-filter on the iframe | able-v8.html | 3 | 2 | M | 1 |
| 49 | Verify background-attachment behaviour on mobile in glass theme — `fixed` background causes bugs on iOS | able-v8.html | 5 | 2 | H | 1 |
| 50 | Confirm background-attachment is `scroll` or `local` not `fixed` in glass mode | able-v8.html | 5 | 1 | H | 1 |
| 51 | Check background-size and background-position cover the full viewport in glass | able-v8.html | 3 | 1 | L | 1 |
| 52 | Verify artwork image is loaded before glass theme is applied (no blank page flash) | able-v8.html | 4 | 2 | M | 2 |
| 53 | Check theme switcher in admin — can artist preview glass theme before publishing? | admin.html | 4 | 2 | M | 2 |
| 54 | Verify that selecting glass in admin and saving correctly stores `theme: "glass"` in localStorage | admin.html | 4 | 1 | M | 1 |
| 55 | Check that glass theme is applied on able-v8.html when profile.theme === "glass" | able-v8.html | 5 | 1 | H | 1 |
| 56 | Confirm the `[data-theme="glass"]` attribute is being set correctly in JS | able-v8.html | 5 | 1 | H | 1 |
| 57 | Verify glass theme on start.html — does onboarding preview glass correctly? | start.html | 2 | 2 | M | 3 |
| 58 | Check whether glass theme is offered as an option in start.html vibe selector | start.html | 2 | 1 | L | 2 |
| 59 | Verify `--color-surface` is transparent in glass theme (not just `--color-bg`) | able-v8.html | 3 | 1 | M | 1 |
| 60 | Check that the shell wrapper element has a correctly styled background in glass mode | able-v8.html | 4 | 2 | M | 1 |
| 61 | Audit z-index layering in glass mode — glass layers must not interfere with modal/sheet z-indexes | able-v8.html | 3 | 2 | M | 2 |
| 62 | Verify the top card (video/artwork area) in glass mode — full-bleed vs contained | able-v8.html | 4 | 2 | M | 1 |
| 63 | Check the gig mode "on tonight" strip in glass theme — accent orange/red on glass | able-v8.html | 3 | 2 | M | 1 |
| 64 | Verify the "live" state pulsing dot in glass theme — visibility | able-v8.html | 3 | 1 | L | 2 |
| 65 | Check support packs in glass theme — pack card on translucent background | able-v8.html | 3 | 2 | M | 1 |
| 66 | Verify the credits section in glass theme | able-v8.html | 2 | 1 | L | 2 |
| 67 | Check the "see more" expand buttons in glass theme | able-v8.html | 2 | 1 | L | 2 |
| 68 | Verify profile header avatar in glass theme — circular avatar over glass | able-v8.html | 2 | 1 | L | 2 |
| 69 | Check text-shadow on hero name in glass theme — needed for legibility over bright artwork | able-v8.html | 4 | 1 | M | 1 |
| 70 | Verify the hero gradient overlay is retained in glass mode (needed for hero text readability) | able-v8.html | 5 | 1 | H | 1 |
| 71 | Check that `will-change: transform` is not applied to glass elements unnecessarily | able-v8.html | 3 | 1 | M | 2 |
| 72 | Verify `-webkit-backdrop-filter` is present alongside `backdrop-filter` for Safari compatibility | able-v8.html | 5 | 1 | H | 1 |
| 73 | Check that all instances of backdrop-filter include `-webkit-backdrop-filter` counterpart | able-v8.html | 5 | 1 | H | 1 |
| 74 | Verify the page is not completely broken in Firefox (baseline usability without backdrop-filter) | able-v8.html | 5 | 2 | H | 2 |
| 75 | Check reduced-motion behaviour in glass theme — backdrop-filter animations must respect `prefers-reduced-motion` | able-v8.html | 3 | 2 | M | 2 |
| 76 | Confirm hover effects on glass cards don't compound the backdrop-filter (re-applying blur on hover) | able-v8.html | 3 | 2 | M | 2 |
| 77 | Verify that a smooth theme-switch transition exists when switching to/from glass | able-v8.html | 3 | 2 | M | 2 |
| 78 | Check the edit FAB button in glass theme (artist's own view) | able-v8.html | 2 | 1 | L | 2 |
| 79 | Verify forms inside bottom sheets use solid backgrounds in glass theme (sheets use `--color-panel`) | able-v8.html | 3 | 1 | L | 1 |
| 80 | Check that multiple backdrop-filter layers don't visually stack blur incorrectly | able-v8.html | 3 | 2 | M | 2 |
| 81 | Test glass theme on a device with GPU limitations — software-rendered blur causes major performance issues | all | 4 | 4 | H | 3 |
| 82 | Measure Interaction to Next Paint (INP) in glass theme vs dark theme | able-v8.html | 3 | 3 | M | 3 |
| 83 | Add `content-visibility: auto` consideration for off-screen glass sections | able-v8.html | 2 | 2 | L | 3 |
| 84 | Verify glass theme artwork is background-image on the right element (html/body/shell) | able-v8.html | 4 | 1 | M | 1 |
| 85 | Check that artwork background doesn't scroll with the page in glass mode (desired to stay fixed) | able-v8.html | 3 | 2 | M | 1 |
| 86 | Confirm the ABLE wordmark visibility in glass theme | able-v8.html | 3 | 1 | M | 1 |
| 87 | Verify pill overflow toggle button in glass theme — "more" button on translucent background | able-v8.html | 2 | 1 | L | 2 |
| 88 | Check error/success toast messages in glass theme — toast background vs glass | able-v8.html | 2 | 1 | L | 2 |
| 89 | Verify the fan confirmation overlay in glass theme — success state readability | able-v8.html | 4 | 1 | M | 1 |
| 90 | Check the gold lock overlay in glass theme — blurred preview + overlay on glass | able-v8.html | 3 | 2 | M | 2 |
| 91 | Run Playwright screenshots of glass theme with dark artwork | able-v8.html | 5 | 2 | L | 2 |
| 92 | Run Playwright screenshots of glass theme with light/bright artwork | able-v8.html | 5 | 2 | H | 2 |
| 93 | Run Playwright screenshots of glass theme with no artwork | able-v8.html | 5 | 2 | H | 2 |
| 94 | Document glass theme requirements (needs artwork, fallback behaviour) in a comment block | able-v8.html | 3 | 1 | L | 3 |
| 95 | Add glass theme to the design system spec with token values and performance budget | docs | 3 | 2 | L | 4 |
| 96 | Define the maximum number of simultaneous backdrop-filter layers as a performance rule | docs | 2 | 1 | L | 4 |
| 97 | Verify glass theme does not affect admin.html — admin never uses glass | admin.html | 3 | 1 | L | 1 |
| 98 | Test glass theme on Safari iOS 17 (primary target) with a real device | able-v8.html | 5 | 3 | M | 3 |
| 99 | Test glass theme on Chrome Android (secondary target) | able-v8.html | 4 | 3 | M | 3 |
| 100 | Write Playwright test that loads glass theme and verifies no JS errors, no blank sections | able-v8.html | 4 | 3 | L | 5 |

## Wave Summary

| Wave | Points | Theme |
|---|---|---|
| 1 | 1–45, 47–56, 59–73, 79, 84–89, 97 | Token audit, element checks, fallbacks, -webkit- prefixes |
| 2 | 19, 46, 52–53, 58, 61, 64–68, 71, 74–78, 80, 90–93 | Firefox fallback, performance, Playwright screenshots |
| 3 | 46, 57, 81–83, 94, 98–99 | Performance testing, real devices, documentation |
| 4 | 95–96 | Design system documentation |
| 5 | 100 | Automated regression test |
