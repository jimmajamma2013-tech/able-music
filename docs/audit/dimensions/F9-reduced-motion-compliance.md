# Dimension F9 — Reduced Motion Compliance
**Category:** Interaction States & Motion
**Phase:** 7 (Interactions)
**Status:** Not started

Approximately 35% of users with vestibular disorders report that motion on screen triggers symptoms including dizziness and nausea. The `prefers-reduced-motion: reduce` media query exists for them. Full compliance does not mean "remove all animation when reduced motion is on" — it means replacing motion-based animation with equivalent non-motion feedback. Transitions should collapse to instant (the `0.01ms !important` pattern already in use on able-v8.html is correct). Continuous background animations (aurora, gradient rotate, grain drift, marquee scroll) must stop entirely. Entrance animations must be replaced by immediate opacity changes. Pulsing and bouncing keyframes must stop. Every single `@keyframes` animation across all four pages must have a corresponding `@media (prefers-reduced-motion: reduce)` block that either sets `animation: none` or replaces motion with a non-motion equivalent. Zero exemptions without explicit documentation.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add a `@media (prefers-reduced-motion: reduce)` block in admin.html that disables the `shimmer` animation on skeleton elements — currently there is no reduced-motion override for shimmer | ADM | 5 | 1 | L | 1 |
| 2 | Add a `@media (prefers-reduced-motion: reduce)` block in admin.html that sets `animation: none` for `fadeInUp` — entrance animations must not play for reduced-motion users | ADM | 4 | 1 | L | 1 |
| 3 | Add a `@media (prefers-reduced-motion: reduce)` block in admin.html that sets `animation: none` for `milestoneEnter` — milestone cards should appear instantly, not animate in | ADM | 4 | 1 | L | 1 |
| 4 | Add a `@media (prefers-reduced-motion: reduce)` block in admin.html that sets `animation: none` for `stateSpringIn` | ADM | 4 | 1 | L | 1 |
| 5 | Add a `@media (prefers-reduced-motion: reduce)` block in admin.html that sets `animation: none` for `livePulse2` — the live indicator dot must stop pulsing | ADM | 4 | 1 | L | 1 |
| 6 | Add a `@media (prefers-reduced-motion: reduce)` block in admin.html that sets `animation: none` for `fanRowIn` | ADM | 3 | 1 | L | 1 |
| 7 | Add a `@media (prefers-reduced-motion: reduce)` block in admin.html that sets `animation: none` for `subLineFadeIn` | ADM | 3 | 1 | L | 1 |
| 8 | Add a `@media (prefers-reduced-motion: reduce)` block in admin.html that sets `animation: none` for `fadeSlide` | ADM | 3 | 1 | L | 1 |
| 9 | Add a `@media (prefers-reduced-motion: reduce)` block in start.html that sets `animation: none` for `stepIn`, `stepIn-fwd`, and `stepIn-back` — the single block at line 135 covers the `:root` transition override but the keyframes still fire | STR | 4 | 1 | L | 1 |
| 10 | Add a `@media (prefers-reduced-motion: reduce)` block in start.html that sets `animation: none` for `slideDown` | STR | 3 | 1 | L | 1 |
| 11 | Add a `@media (prefers-reduced-motion: reduce)` block in start.html that sets `animation: none` for `ai-slide-in` | STR | 3 | 1 | L | 1 |
| 12 | Add a `@media (prefers-reduced-motion: reduce)` block in landing.html that sets `animation: none` for `rec-pulse` | LND | 4 | 1 | L | 1 |
| 13 | Add a `@media (prefers-reduced-motion: reduce)` block in landing.html that sets `animation: none` for `marquee-scroll` — a continuously scrolling marquee is a vestibular trigger and must stop entirely | LND | 5 | 1 | L | 1 |
| 14 | Add a `@media (prefers-reduced-motion: reduce)` block in landing.html that sets `animation: none` for `heroIn` — the hero section should be immediately visible | LND | 4 | 1 | L | 1 |
| 15 | Add a `@media (prefers-reduced-motion: reduce)` block in landing.html that sets `animation: none` for `fadeDown` | LND | 3 | 1 | L | 1 |
| 16 | Add a `@media (prefers-reduced-motion: reduce)` block in landing.html that sets `animation: none` for `dp-pulse` — the device preview pulse must stop | LND | 4 | 1 | L | 1 |
| 17 | Add a `@media (prefers-reduced-motion: reduce)` block in landing.html that sets `animation: none` for `faqSlide` | LND | 3 | 1 | L | 1 |
| 18 | Add a `@media (prefers-reduced-motion: reduce)` block in landing.html that sets `animation: none` for `ctaPulse` | LND | 3 | 1 | L | 1 |
| 19 | Add a `@media (prefers-reduced-motion: reduce)` block in landing.html that sets `animation: none` for `artPulse` | LND | 3 | 1 | L | 1 |
| 20 | Add a `@media (prefers-reduced-motion: reduce)` block in landing.html that sets `animation: none` for `cta-drift` — a drifting motion is a vestibular trigger | LND | 4 | 1 | L | 1 |
| 21 | Verify that the existing `@media (prefers-reduced-motion: reduce)` block in able-v8.html (line 378) covers all 24 `@keyframes` defined in that file — enumerate any that are missing a corresponding override | V8 | 5 | 2 | L | 1 |
| 22 | Add a reduced-motion override for `gradient-rotate` in able-v8.html — the background gradient rotation must stop for reduced-motion users | V8 | 5 | 1 | L | 1 |
| 23 | Add a reduced-motion override for `aurora-shift` in able-v8.html — the aurora background animation must stop | V8 | 5 | 1 | L | 1 |
| 24 | Add a reduced-motion override for `grain-drift` in able-v8.html — the grain overlay drift must stop | V8 | 4 | 1 | L | 1 |
| 25 | Verify the existing reduced-motion override for `glow-breathe` in able-v8.html (line 910) correctly stops the breathing animation — confirm with a manual test | V8 | 3 | 1 | L | 1 |
| 26 | Verify the existing reduced-motion override for `gig-flash` in able-v8.html — confirm the flash animation stops fully | V8 | 4 | 1 | L | 1 |
| 27 | Verify the existing reduced-motion override for `badge-glow-pulse` in able-v8.html (line 1039) stops the glow | V8 | 3 | 1 | L | 1 |
| 28 | Add a reduced-motion override for the `wm-attention` keyframe in able-v8.html — the attention animation on the watermark should stop | V8 | 3 | 1 | L | 1 |
| 29 | Add a reduced-motion override for `wmSlideLeft` and `wmSlideRight` keyframes in able-v8.html — these slide animations must not fire | V8 | 3 | 1 | L | 1 |
| 30 | Add a reduced-motion override for `shake` in able-v8.html — error shake animations must not play for reduced-motion users; use a border-color change as the alternative feedback | V8 | 4 | 1 | L | 1 |
| 31 | Add a reduced-motion override for `confetti-fly` in able-v8.html — the confetti celebration must not run; use a text-based "🎉 First fan!" message instead | V8 | 4 | 1 | L | 1 |
| 32 | Verify the existing reduced-motion override for `ghostShimmer` in able-v8.html (line 2789) correctly stops the shimmer | V8 | 3 | 1 | L | 1 |
| 33 | Add a reduced-motion override for `pulse-dot` in able-v8.html — the live indicator dot pulse must stop; use a static dot at full opacity instead | V8 | 3 | 1 | L | 1 |
| 34 | Verify the existing reduced-motion override for `tab-icon-bounce` in able-v8.html (line 682) works correctly — the icon should not bounce | V8 | 3 | 1 | L | 1 |
| 35 | Verify the existing reduced-motion override for `pill-bloom` in able-v8.html (line 1478) stops the bloom animation | V8 | 3 | 1 | L | 1 |
| 36 | Verify the existing reduced-motion override for `pill-scale-in` in able-v8.html (line 1490) stops the scale animation | V8 | 3 | 1 | L | 1 |
| 37 | Verify the existing reduced-motion override for `pill-shimmer` in able-v8.html (line 1508) stops the shimmer | V8 | 3 | 1 | L | 1 |
| 38 | Verify the existing reduced-motion override for `section-pulse` in able-v8.html (line 1709) stops the pulse | V8 | 3 | 1 | L | 1 |
| 39 | Verify the existing reduced-motion override for `echo-enter` in able-v8.html (line 1874) stops the entrance | V8 | 3 | 1 | L | 1 |
| 40 | Verify the existing reduced-motion override for `tonight-pulse` in able-v8.html (line 2750) stops the gig-mode pulse | V8 | 3 | 1 | L | 1 |
| 41 | Confirm the `transition-duration: 0.01ms !important` override in the existing reduced-motion block on able-v8.html (line 742) also covers CSS custom properties used in `animation-duration` where animations are not explicitly set to `none` | V8 | 4 | 2 | M | 2 |
| 42 | Add a `@media (prefers-reduced-motion: reduce)` block to the existing single block in admin.html (line 91) that sets `transition-duration: 0.01ms !important` on all elements, consistent with able-v8.html's approach | ADM | 5 | 1 | L | 1 |
| 43 | Add a `transition-duration: 0.01ms !important` rule to start.html's existing reduced-motion block (line 135) to collapse all transitions, not just animation durations | STR | 4 | 1 | L | 1 |
| 44 | Add a full `@media (prefers-reduced-motion: reduce)` block to landing.html (currently has blocks at 143, 1104, 1120 but no global transition collapse) that sets `transition-duration: 0.01ms !important` on all elements | LND | 5 | 1 | L | 1 |
| 45 | Add a reduced-motion override in admin.html that stops `animation: shimmer` on any element with class `.skeleton` or similar shimmer placeholders | ADM | 4 | 1 | L | 1 |
| 46 | Ensure the `gloss-pass` keyframe in able-v8.html has a reduced-motion override that sets `animation: none` | V8 | 3 | 1 | L | 2 |
| 47 | Add a JS guard in able-v8.html's confetti function that checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skips confetti entirely, providing a toast message instead | V8 | 4 | 2 | M | 1 |
| 48 | Add a JS guard in admin.html's `showMilestone()` function that checks `prefers-reduced-motion` and skips the spring animation on the milestone card, showing it statically instead | ADM | 3 | 2 | M | 2 |
| 49 | Add a JS guard in start.html's step-transition function that checks `prefers-reduced-motion` and swaps between steps with an instant opacity change instead of a slide animation | STR | 4 | 2 | M | 1 |
| 50 | Add a JS guard in landing.html's scroll animation observer (if any) that disables scroll-triggered entrance animations when `prefers-reduced-motion` is set | LND | 4 | 2 | M | 2 |
| 51 | Ensure the `marquee-scroll` animation in landing.html is controlled by a JS check against `prefers-reduced-motion` in addition to the CSS `@media` override, to handle dynamic theme changes | LND | 4 | 2 | M | 2 |
| 52 | Add a `@media (prefers-reduced-motion: reduce)` override in landing.html that sets `animation-play-state: paused` on the marquee wrapper as a belt-and-suspenders approach | LND | 4 | 1 | L | 1 |
| 53 | Add reduced-motion overrides for any CSS animations triggered by JavaScript `classList.add()` in able-v8.html — if the animation class is added dynamically, ensure the `@media` block covers the selector | V8 | 3 | 2 | M | 2 |
| 54 | Add reduced-motion overrides for any CSS animations triggered by `classList.add()` in admin.html | ADM | 3 | 2 | M | 2 |
| 55 | Ensure the existing `@media (prefers-reduced-motion: reduce)` blocks in able-v8.html are consolidated into as few blocks as possible (ideally one at the end of the `<style>`) to make auditing easier | V8 | 2 | 2 | L | 4 |
| 56 | Ensure the existing `@media (prefers-reduced-motion: reduce)` block in admin.html is positioned at the end of the `<style>` section so it cannot be overridden by later rules | ADM | 2 | 1 | L | 3 |
| 57 | Ensure start.html's existing `@media (prefers-reduced-motion: reduce)` block is at the end of the `<style>` section | STR | 2 | 1 | L | 3 |
| 58 | Add a `@media (prefers-reduced-motion: reduce)` override for `animation: bounce-in` wherever it is used in any of the four pages | ALL | 3 | 1 | L | 2 |
| 59 | Add a `@media (prefers-reduced-motion: reduce)` override for any `animation: slide-up` usage across the four pages | ALL | 3 | 1 | L | 2 |
| 60 | Add a `@media (prefers-reduced-motion: reduce)` block in landing.html that sets `animation: none` for `rec-pulse` — the recording/live indicator pulse is a vestibular concern | LND | 4 | 1 | L | 1 |
| 61 | Ensure the presave countdown timer animation on able-v8.html (digit flip or number change) respects `prefers-reduced-motion` — for reduced-motion users, update the number without any transition | V8 | 3 | 2 | M | 2 |
| 62 | Test all four pages with Chrome DevTools' "Emulate CSS media feature prefers-reduced-motion" set to `reduce` and document any animations that still play | ALL | 5 | 2 | L | 1 |
| 63 | Add a Playwright smoke test that sets `prefers-reduced-motion: reduce` via page emulation and asserts that no `@keyframes` animations are running after 500ms on able-v8.html | V8 | 4 | 4 | L | 5 |
| 64 | Add the same Playwright reduced-motion test for admin.html | ADM | 4 | 4 | L | 5 |
| 65 | Add the same Playwright reduced-motion test for start.html | STR | 4 | 4 | L | 5 |
| 66 | Add the same Playwright reduced-motion test for landing.html | LND | 4 | 4 | L | 5 |
| 67 | Ensure the gig-mode "tonight" pulsing animation on able-v8.html has a reduced-motion override that renders the indicator as a static amber dot at full opacity | V8 | 3 | 1 | L | 2 |
| 68 | Ensure the live-release "stream now" shimmer effect on able-v8.html's CTA button has a reduced-motion override | V8 | 3 | 1 | L | 2 |
| 69 | Ensure any entrance animation on admin.html's dashboard panels uses a reduced-motion override that simply sets `opacity: 1` instantly rather than animating | ADM | 3 | 1 | L | 2 |
| 70 | Ensure the fan sign-up success animation (if it uses a keyframe) on able-v8.html has a reduced-motion override | V8 | 3 | 1 | L | 2 |
| 71 | Ensure the milestone card spring-in animation in admin.html has a reduced-motion override that makes the card appear instantly at full opacity | ADM | 3 | 1 | L | 2 |
| 72 | Add a `@media (prefers-reduced-motion: reduce)` override for admin.html's `wm-attention` keyframe that was added to the existing block | ADM | 2 | 1 | L | 2 |
| 73 | Ensure the `ai-slide-in` animation in start.html has a reduced-motion override that shows the AI suggestion without the slide | STR | 3 | 1 | L | 2 |
| 74 | Ensure the snap-card reveal animation on able-v8.html has a reduced-motion override | V8 | 2 | 1 | L | 3 |
| 75 | Ensure the echo/reply interaction animation on able-v8.html has a reduced-motion override | V8 | 2 | 1 | L | 3 |
| 76 | Ensure the campaign state transition animation on admin.html has a reduced-motion override that performs an instant DOM swap | ADM | 3 | 1 | L | 2 |
| 77 | Add a note at the top of each file's `<style>` block indicating the line number of the `prefers-reduced-motion` override block so future developers can find it quickly | ALL | 2 | 1 | L | 5 |
| 78 | Ensure that any SVG animations (e.g., animated SVG logo in the favicon) across the four pages stop when `prefers-reduced-motion: reduce` is set | ALL | 3 | 2 | L | 3 |
| 79 | Add a reduced-motion override for any CSS `animation` applied to the fan email input's success state on able-v8.html | V8 | 2 | 1 | L | 3 |
| 80 | Ensure the loading shimmer skeleton animation on admin.html is covered by the reduced-motion block — static grey fill should replace the moving shimmer | ADM | 3 | 1 | L | 2 |
| 81 | Ensure the `livePulse2` indicator in admin.html Campaign HQ has a reduced-motion override that shows a static green dot at full opacity | ADM | 3 | 1 | L | 2 |
| 82 | Ensure any parallax scroll effect on landing.html is disabled under `prefers-reduced-motion` | LND | 4 | 2 | M | 2 |
| 83 | Add a reduced-motion override for the CTA button hover transform (scale) on landing.html — button hover should be a colour change only, not a scale, for reduced-motion users | LND | 3 | 1 | L | 2 |
| 84 | Add a reduced-motion override for CTA button hover transforms on able-v8.html — scale transforms should collapse to instant or be replaced by opacity changes | V8 | 3 | 1 | L | 3 |
| 85 | Ensure the `tab-icon-bounce` in able-v8.html's bottom nav has a reduced-motion override that disables the bounce entirely, keeping a simple opacity change | V8 | 3 | 1 | L | 2 |
| 86 | Add a `prefers-reduced-motion` listener in able-v8.html's JavaScript that dynamically enables or disables motion-sensitive features if the user changes the preference mid-session | V8 | 3 | 3 | M | 4 |
| 87 | Add the same dynamic `prefers-reduced-motion` listener to admin.html | ADM | 3 | 3 | M | 4 |
| 88 | Ensure any drag-and-drop reorder animations on admin.html (section order, snap cards) respect `prefers-reduced-motion` — the drag ghost should not animate | ADM | 2 | 2 | M | 3 |
| 89 | Ensure the presave countdown pulsing ring on able-v8.html (if present) has a reduced-motion override that removes the ring and uses a static border | V8 | 3 | 1 | L | 2 |
| 90 | Add a reduced-motion override that stops the aurora background animation on the start.html onboarding wizard step backgrounds | STR | 3 | 1 | L | 2 |
| 91 | Ensure landing.html's `@media (prefers-reduced-motion: no-preference)` blocks at lines 1104 and 1120 have corresponding overrides in the `reduce` block for the same selectors | LND | 4 | 1 | L | 2 |
| 92 | Ensure the JS `reducedMotion` check already in landing.html (line 1924) is used to gate all JS-triggered animations in that file, not just the one it currently guards | LND | 4 | 2 | M | 2 |
| 93 | Audit start.html for any JS-triggered animations (e.g., `classList.add('animate')`) and wrap each with a `prefers-reduced-motion` guard | STR | 3 | 2 | M | 2 |
| 94 | Document in docs/systems/MICRO_INTERACTIONS_SPEC.md the complete list of animations that are allowed under reduced motion (none — all must have `animation: none` or instant-opacity fallback) | ALL | 3 | 1 | L | 4 |
| 95 | Add a checklist item to the ABLE pre-commit checklist: "Has every new `@keyframes` animation been added to the reduced-motion override block?" | ALL | 3 | 1 | L | 4 |
| 96 | Ensure the `wm-attention` animation on able-v8.html's existing reduced-motion blocks covers this keyframe — cross-check against the list at lines 3805 and 3878 | V8 | 2 | 1 | L | 2 |
| 97 | Ensure the `gloss-pass` keyframe on able-v8.html is covered by a reduced-motion override near line 4794 | V8 | 2 | 1 | L | 2 |
| 98 | Ensure admin.html's existing reduced-motion block at line 91 is comprehensive enough to cover dynamically injected elements (fan rows, show cards, snap cards built via `innerHTML`) by targeting general selectors | ADM | 3 | 2 | M | 3 |
| 99 | Add a manual QA step to the ABLE release checklist: "Test all pages with system reduced-motion enabled on iOS (Settings → Accessibility → Reduce Motion) and on macOS" | ALL | 4 | 1 | L | 4 |
| 100 | Ensure start.html's confetti or celebration animation (if added as part of F5 success states) is wrapped with a `prefers-reduced-motion` guard before it is committed | STR | 4 | 2 | M | 3 |
