# Dimension F8 — Spring Easing Usage
**Category:** Interaction States & Motion
**Phase:** 7 (Interactions)
**Status:** Not started

Spring easing — `cubic-bezier(0.34,1.56,0.64,1)` — communicates physical presence. It overshoots slightly, like something with weight and momentum. That overshoot is only appropriate when an element is moving through space: a card scaling up, a panel sliding into view, a button reacting to a tap. When applied to opacity or colour transitions, spring easing produces a brief flash-above-target effect that looks broken rather than bouncy. Decel easing — `cubic-bezier(0.25,0.46,0.45,0.94)` — is the correct choice for state changes: fades, colour shifts, and anything that changes appearance rather than position. Full compliance means spring easing is audited out of every opacity, colour, background, and border-colour transition across all four pages, and that decel (or standard) easing is applied in its place.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | On line 2315 of able-v8.html, the `opacity 0.15s` component of the transition uses no easing — replace with `var(--ease-standard)` (not spring) and verify the combined transition reads `opacity var(--dur-fast) var(--ease-standard)` | V8 | 4 | 1 | L | 1 |
| 2 | On line 2351 of able-v8.html, `opacity 0.15s` in the same rule has no easing — replace with `opacity var(--dur-fast) var(--ease-standard)` to prevent inconsistency when the spring transform and opacity animate together | V8 | 4 | 1 | L | 1 |
| 3 | On line 476 of start.html, `opacity .2s var(--spring)` uses spring easing on an opacity transition — replace with `opacity var(--dur) var(--ease-decel)` | STR | 4 | 1 | L | 1 |
| 4 | On line 610 of start.html, the same pattern `opacity .2s var(--spring)` applies spring to opacity — replace with `opacity var(--dur) var(--ease-decel)` | STR | 4 | 1 | L | 1 |
| 5 | On line 476 of start.html, `background .2s var(--spring)` applies spring to a colour property — replace with `background var(--dur) var(--ease-standard)` | STR | 3 | 1 | L | 1 |
| 6 | On line 610 of start.html, `background .2s var(--spring)` applies spring to a colour property — replace with `background var(--dur) var(--ease-standard)` | STR | 3 | 1 | L | 1 |
| 7 | On line 476 of start.html, `color .2s var(--spring)` applies spring to a colour property — replace with `color var(--dur) var(--ease-standard)` | STR | 3 | 1 | L | 1 |
| 8 | On line 610 of start.html, `color .2s var(--spring)` applies spring to a colour property — replace with `color var(--dur) var(--ease-standard)` | STR | 3 | 1 | L | 1 |
| 9 | On line 476 of start.html, `border-color .2s var(--spring)` applies spring to a border-colour property — replace with `border-color var(--dur) var(--ease-standard)` | STR | 3 | 1 | L | 1 |
| 10 | On line 610 of start.html, `border-color .2s var(--spring)` applies spring to a border-colour property — replace with `border-color var(--dur) var(--ease-standard)` | STR | 3 | 1 | L | 1 |
| 11 | On line 476 of start.html, `box-shadow .2s var(--spring)` applies spring to a shadow property — replace with `box-shadow var(--dur) var(--ease-decel)` | STR | 3 | 1 | L | 1 |
| 12 | On line 610 of start.html, `box-shadow .2s var(--spring)` applies spring to a shadow property — replace with `box-shadow var(--dur) var(--ease-decel)` | STR | 3 | 1 | L | 1 |
| 13 | On line 176 of landing.html, `opacity 0.15s` is paired with `transform 0.2s var(--spring)` — ensure the opacity component uses `var(--ease-standard)` not spring | LND | 3 | 1 | L | 1 |
| 14 | On line 327 of landing.html, `opacity 0.15s` is paired with `transform 0.3s var(--spring)` — ensure opacity uses `var(--ease-standard)` | LND | 3 | 1 | L | 1 |
| 15 | On line 944 of landing.html, `opacity 0.15s` is paired with `transform 0.2s var(--spring)` — ensure opacity uses `var(--ease-standard)` | LND | 3 | 1 | L | 1 |
| 16 | Audit all `transition` rules containing `var(--ease-spring)` in able-v8.html and verify none of them include `opacity` as a transitioned property — create a grep report | V8 | 4 | 1 | L | 1 |
| 17 | Audit all `transition` rules containing `var(--ease-spring)` in admin.html and verify none include `opacity`, `color`, `background`, or `border-color` | ADM | 4 | 1 | L | 1 |
| 18 | On line 866 of admin.html, `transition: transform .2s cubic-bezier(0.34,1.56,0.64,1), background .2s` — the background component should use `var(--ease-standard)` not default, and the spring should be restricted to transform | ADM | 3 | 1 | L | 1 |
| 19 | On line 993 of admin.html, `transition: transform .15s cubic-bezier(0.34,1.56,0.64,1), box-shadow .15s` — replace the box-shadow component with `var(--ease-decel)` explicit easing | ADM | 3 | 1 | L | 1 |
| 20 | Verify that `transition: transform var(--dur-fast) var(--ease-spring), opacity var(--dur-fast) var(--ease-standard)` on line 660 of able-v8.html correctly separates spring (transform) from standard (opacity) — this is compliant, confirm and document as a reference pattern | V8 | 3 | 1 | L | 1 |
| 21 | Verify that `transition: transform var(--dur-fast) var(--ease-spring), opacity var(--dur-fast) var(--ease-standard)` on line 1257 of able-v8.html is compliant — confirm spring is on transform only | V8 | 3 | 1 | L | 1 |
| 22 | Verify the same pattern on line 1343 of able-v8.html and confirm compliance | V8 | 3 | 1 | L | 1 |
| 23 | Verify that line 1911 of able-v8.html separates spring on transform from non-spring on other properties | V8 | 3 | 1 | L | 1 |
| 24 | Verify that line 2558 of able-v8.html separates spring on transform from non-spring on other properties | V8 | 3 | 1 | L | 1 |
| 25 | Verify that line 3410 of able-v8.html separates spring on transform from non-spring on other properties | V8 | 3 | 1 | L | 1 |
| 26 | Ensure the snap-card fade-in on able-v8.html uses `var(--ease-decel)` for its opacity transition — snap cards appear, they do not bounce in | V8 | 3 | 1 | L | 2 |
| 27 | Ensure tooltip fade-ins on able-v8.html use `var(--ease-decel)` not spring for their opacity component | V8 | 3 | 1 | L | 2 |
| 28 | Ensure the toast notification fade-in on admin.html uses `var(--ease-decel)` for opacity — toast is a state change, not a physical arrival | ADM | 3 | 1 | L | 2 |
| 29 | Ensure the milestone card animation in admin.html uses spring for the scale/transform component but not for opacity — the current `milestoneEnter` keyframe should be audited | ADM | 3 | 2 | M | 2 |
| 30 | Ensure the `stateSpringIn` keyframe in admin.html uses spring only on the transform/scale axis, not on opacity | ADM | 3 | 1 | L | 2 |
| 31 | Ensure the `echo-enter` keyframe on able-v8.html does not apply spring easing to opacity — verify the `animation-timing-function` is not spring | V8 | 3 | 1 | L | 2 |
| 32 | Ensure the `pill-bloom` keyframe on able-v8.html uses spring only on scale/transform, not on opacity | V8 | 3 | 1 | L | 2 |
| 33 | Ensure the `badge-glow-pulse` keyframe on able-v8.html does not apply spring to its opacity keyframes | V8 | 2 | 1 | L | 2 |
| 34 | Ensure the `section-pulse` keyframe on able-v8.html does not apply spring to opacity | V8 | 2 | 1 | L | 2 |
| 35 | Ensure the `tonight-pulse` keyframe on able-v8.html does not apply spring to opacity | V8 | 2 | 1 | L | 2 |
| 36 | Ensure the `ghostShimmer` keyframe on able-v8.html uses linear easing (or `ease-in-out`) not spring — shimmer is a continuous loop animation | V8 | 2 | 1 | L | 3 |
| 37 | Ensure the `wm-attention` keyframe on able-v8.html does not apply spring easing to background-color or opacity keyframes | V8 | 2 | 1 | L | 3 |
| 38 | Ensure the `wmSlideLeft` and `wmSlideRight` keyframes on able-v8.html use decel for opacity and spring (if any) only for transform | V8 | 2 | 1 | L | 3 |
| 39 | Ensure `transition: transform var(--dur-mid) var(--ease-accel)` on line 587 of able-v8.html is appropriate — accel easing on transform is acceptable for exit animations, confirm this is an exit context | V8 | 2 | 1 | L | 3 |
| 40 | Ensure the `glow-breathe` keyframe on able-v8.html uses `ease-in-out` not spring — a breathing animation should not overshoot | V8 | 2 | 1 | L | 3 |
| 41 | Ensure the `gig-flash` keyframe on able-v8.html uses a linear or ease-in-out timing function for its colour flashes — spring on colour produces a visible overshoot artefact | V8 | 2 | 1 | L | 3 |
| 42 | Ensure the `gradient-rotate` keyframe in able-v8.html uses `linear` timing — gradient rotation should be constant speed | V8 | 2 | 1 | L | 3 |
| 43 | Ensure the `aurora-shift` keyframe in able-v8.html uses `ease-in-out` not spring — atmospheric effects should be smooth | V8 | 2 | 1 | L | 3 |
| 44 | Ensure the `grain-drift` keyframe in able-v8.html uses `linear` timing — grain drift should be imperceptible and constant | V8 | 2 | 1 | L | 4 |
| 45 | Ensure the `tab-icon-bounce` keyframe in able-v8.html uses spring easing only on the transform/scale axis — this is a physical bounce, spring is correct here, confirm it is isolated to transform | V8 | 3 | 1 | L | 2 |
| 46 | Ensure the `shake` keyframe in able-v8.html uses `ease-in-out` not spring — a validation shake should not overshoot | V8 | 3 | 1 | L | 2 |
| 47 | Ensure the `confetti-fly` keyframe in able-v8.html can use spring easing on transform (confetti is physical) but not on opacity — the fade-out should use linear | V8 | 2 | 2 | M | 3 |
| 48 | Ensure the `gloss-pass` keyframe in able-v8.html uses linear timing — a gloss highlight sweep should be constant velocity | V8 | 2 | 1 | L | 3 |
| 49 | Ensure the `pulse-dot` keyframe in able-v8.html uses `ease-in-out` not spring — opacity pulses should be smooth | V8 | 2 | 1 | L | 3 |
| 50 | Ensure the `shimmer` keyframe in admin.html uses linear easing — skeleton shimmer should be constant velocity | ADM | 2 | 1 | L | 3 |
| 51 | Ensure the `shimmer` keyframe in able-v8.html uses linear easing consistently with admin.html | V8 | 2 | 1 | L | 3 |
| 52 | Ensure the `fadeInUp` keyframe in admin.html uses decel easing (`var(--ease-decel)`) not spring — it's an entrance along the Y axis but is a UI state change, not a physical object | ADM | 2 | 1 | L | 3 |
| 53 | Ensure the `fanRowIn` keyframe in admin.html uses decel for opacity and spring or decel (not accel) for transform | ADM | 2 | 1 | L | 3 |
| 54 | Ensure the `livePulse2` keyframe in admin.html uses linear or ease-in-out not spring — it pulses opacity and scale together, spring on opacity is not appropriate | ADM | 2 | 1 | L | 3 |
| 55 | Ensure the `subLineFadeIn` keyframe in admin.html uses decel for its opacity transition | ADM | 2 | 1 | L | 3 |
| 56 | Ensure the `fadeSlide` keyframe in admin.html uses decel for opacity | ADM | 2 | 1 | L | 3 |
| 57 | Ensure the `stepIn-fwd` and `stepIn-back` keyframes in start.html use decel for opacity transitions | STR | 2 | 1 | L | 3 |
| 58 | Ensure the `stepIn` base keyframe in start.html uses decel for opacity | STR | 2 | 1 | L | 3 |
| 59 | Ensure the `slideDown` keyframe in start.html uses decel for opacity | STR | 2 | 1 | L | 3 |
| 60 | Ensure the `ai-slide-in` keyframe in start.html uses spring only on transform and decel on opacity | STR | 2 | 1 | L | 3 |
| 61 | Ensure the `rec-pulse` keyframe in landing.html uses ease-in-out not spring for its opacity pulse | LND | 2 | 1 | L | 3 |
| 62 | Ensure the `heroIn` keyframe in landing.html uses decel for opacity | LND | 2 | 1 | L | 3 |
| 63 | Ensure the `fadeDown` keyframe in landing.html uses decel for opacity | LND | 2 | 1 | L | 3 |
| 64 | Ensure the `dp-pulse` keyframe in landing.html uses ease-in-out for its opacity pulse | LND | 2 | 1 | L | 3 |
| 65 | Ensure the `ctaPulse` and `artPulse` keyframes in landing.html use ease-in-out for opacity-based pulsing | LND | 2 | 1 | L | 3 |
| 66 | Ensure the `faqSlide` keyframe in landing.html uses decel for opacity | LND | 2 | 1 | L | 3 |
| 67 | Ensure the `cta-drift` keyframe in landing.html uses ease-in-out for any opacity components | LND | 2 | 1 | L | 4 |
| 68 | Audit all JS-set `style.transition` values in able-v8.html and verify that any spring easing in those values is applied only to transform or scale, not to opacity or colour | V8 | 3 | 2 | L | 2 |
| 69 | Audit all JS-set `style.transition` values in admin.html for the same spring-on-opacity violation | ADM | 3 | 2 | L | 2 |
| 70 | Define `--ease-spring` as an alias for `cubic-bezier(0.34,1.56,0.64,1)` in landing.html's `:root` block — it is used by raw value currently | LND | 3 | 1 | L | 1 |
| 71 | Define `--ease-decel` as an alias for `cubic-bezier(0.25,0.46,0.45,0.94)` in landing.html's `:root` block — it is used by raw value currently | LND | 3 | 1 | L | 1 |
| 72 | Add a `--ease-standard: cubic-bezier(0.4,0,0.2,1)` token to landing.html's `:root` block for standard UI state transitions (hover, focus) | LND | 2 | 1 | L | 2 |
| 73 | Add an `--ease-accel` token to landing.html's `:root` block for exit/accelerate transitions | LND | 2 | 1 | L | 2 |
| 74 | Replace raw `cubic-bezier(0.34,1.56,0.64,1)` values in landing.html's transition rules with `var(--ease-spring)` after the token is defined | LND | 3 | 1 | L | 1 |
| 75 | Replace raw `cubic-bezier(0.25,0.46,0.45,0.94)` values in landing.html's transition rules with `var(--ease-decel)` | LND | 3 | 1 | L | 1 |
| 76 | Document the rule "spring on transform/scale only — never on opacity, color, background, or border-color" in docs/systems/MICRO_INTERACTIONS_SPEC.md as a named rule | ALL | 3 | 1 | L | 4 |
| 77 | Add this rule to CONTEXT.md's "CSS token rules" section so it appears in every session's fast-orientation read | ALL | 2 | 1 | L | 4 |
| 78 | Confirm that the `transition: transform var(--dur-fast) var(--ease-spring), opacity var(--dur-fast) var(--ease-standard)` pattern used in the compliant hover states of able-v8.html is used as the canonical reference example in the design system docs | V8 | 2 | 1 | L | 4 |
| 79 | Ensure the `gloss-pass` animation on able-v8.html's CTA button does not apply spring to background-position — a gloss sweep is constant velocity | V8 | 2 | 1 | L | 4 |
| 80 | Ensure the profile state-change animation in admin.html Campaign HQ uses spring for scale and decel for opacity as separate transition components | ADM | 3 | 2 | M | 2 |
| 81 | Ensure the platform pill scale animation on able-v8.html (`pill-scale-in` keyframe) uses spring only for scale | V8 | 2 | 1 | L | 3 |
| 82 | Ensure the `pill-shimmer` keyframe uses linear timing — shimmer is not a physical movement | V8 | 2 | 1 | L | 3 |
| 83 | Ensure the `pill-bloom` keyframe does not apply spring to the opacity component at any keyframe step | V8 | 2 | 1 | L | 3 |
| 84 | Confirm that the CC (credit-card/show-card) sheet entry `transition: transform var(--dur-slow) var(--ease-spring)` on line 3275 of able-v8.html is compliant — transform-only spring is correct | V8 | 2 | 1 | L | 2 |
| 85 | Confirm that the backdrop transition on the same CC sheet uses `var(--ease-decel)` for its opacity transition and not spring | V8 | 3 | 1 | L | 2 |
| 86 | Ensure the presave countdown number transition on able-v8.html uses decel not spring — digit changes are state changes, not physical arrivals | V8 | 2 | 2 | M | 3 |
| 87 | Ensure the snap card modal slide-in on admin.html uses spring on transform and decel on opacity | ADM | 3 | 1 | L | 2 |
| 88 | Ensure the fan-detail drawer on admin.html uses spring on transform (slide) and decel on the backdrop opacity | ADM | 3 | 1 | L | 2 |
| 89 | Confirm admin.html's `card.style.transition = 'opacity 0.4s'` (line 3798) uses no easing — add `var(--ease-decel)` to make it explicit | ADM | 2 | 1 | L | 3 |
| 90 | Confirm admin.html's `frcCard.style.transition = 'opacity 0.4s'` (line 8233) adds explicit `var(--ease-decel)` | ADM | 2 | 1 | L | 3 |
| 91 | Write a Playwright visual regression test that verifies the fan sign-up button on able-v8.html does not visually overshoot when hovered (detecting spring-on-opacity misuse) | V8 | 3 | 4 | L | 5 |
| 92 | Verify that the `--ease-spring` token in able-v8.html's `:root` is defined as `cubic-bezier(0.34,1.56,0.64,1)` and not any other value — document its canonical value | V8 | 2 | 1 | L | 2 |
| 93 | Verify that the `--ease-decel` token in able-v8.html's `:root` is defined as `cubic-bezier(0.25,0.46,0.45,0.94)` and document its canonical value | V8 | 2 | 1 | L | 2 |
| 94 | Ensure any new developer adding a transition to any page reads the spring easing rule before writing the transition — add a code comment above the easing token definitions | ALL | 2 | 1 | L | 5 |
| 95 | Confirm that the `wm-attention` keyframe's animation does not cause a visible flash due to spring-on-background-color — if it does, switch to `ease-in-out` | V8 | 2 | 2 | M | 3 |
| 96 | Ensure the `bounce-in` keyframe referenced in context notes uses spring only on scale and decel on opacity | V8 | 3 | 1 | L | 2 |
| 97 | Ensure the `slide-up` keyframe referenced in context notes uses decel for opacity and can use spring for transform | V8 | 3 | 1 | L | 2 |
| 98 | Add a grep rule to the ABLE development checklist: before committing any CSS, run `grep "ease-spring.*opacity\|opacity.*ease-spring"` and ensure the count is zero | ALL | 3 | 2 | L | 4 |
| 99 | Add a grep rule to the ABLE development checklist: run `grep "var(--spring).*opacity\|opacity.*var(--spring)"` across start.html and landing.html to catch alias-based violations | ALL | 3 | 2 | L | 4 |
| 100 | After all spring easing corrections are complete, run a cross-page animation review at 0.25x playback speed in Chrome DevTools to visually confirm no opacity transitions overshoot | ALL | 4 | 3 | L | 5 |
