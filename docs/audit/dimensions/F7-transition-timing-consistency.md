# Dimension F7 — Transition Timing Consistency
**Category:** Interaction States & Motion
**Phase:** 7 (Interactions)
**Status:** Not started

Every transition in ABLE should draw from the three duration tokens defined in the design system: `--dur-fast: 0.14s`, `--dur: 0.16s`, and `--dur-slow: 0.22s`. These are not arbitrary — they encode a visual rhythm that makes the interface feel like a single designed object rather than a collection of independent components. When raw values like `0.15s`, `0.2s`, `0.3s`, `350ms`, `250ms`, or `200ms` appear, the interface feels inconsistent: some things feel quick, others sluggish, for no apparent reason. Full compliance means a grep across all four pages returns zero raw millisecond or decimal-second duration values in transition rules — every duration is a CSS variable, and every CSS variable is defined once in the `:root` block. Inline JS transitions are the only acceptable exception, and even those should reference the token values via `getComputedStyle`.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Replace `transition: opacity 0.15s, transform 0.2s var(--ease-spring), background 0.15s` on line 2315 of able-v8.html with `transition: opacity var(--dur-fast) var(--ease-standard), transform var(--dur) var(--ease-spring), background var(--dur-fast) var(--ease-standard)` | V8 | 4 | 1 | L | 1 |
| 2 | Replace `transition: transform 0.2s var(--ease-spring), opacity 0.15s` on line 2351 of able-v8.html with `transition: transform var(--dur) var(--ease-spring), opacity var(--dur-fast) var(--ease-standard)` | V8 | 4 | 1 | L | 1 |
| 3 | Replace `transition: opacity 0.25s var(--ease-decel)` on line 2411 of able-v8.html with `transition: opacity var(--dur-slow) var(--ease-decel)` | V8 | 4 | 1 | L | 1 |
| 4 | Replace `transition: transform 0.3s var(--ease-spring)` on line 2419 of able-v8.html with `transition: transform var(--dur-slow) var(--ease-spring)` | V8 | 4 | 1 | L | 1 |
| 5 | Replace `transition: background 0.15s, color 0.15s` on line 2441 of able-v8.html with `transition: background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)` and remove the inline `;` style | V8 | 3 | 1 | L | 1 |
| 6 | Replace `transition: transform 0.32s var(--ease-spring), opacity 0.2s var(--ease-decel)` on line 2455 of able-v8.html with `transition: transform var(--dur-slow) var(--ease-spring), opacity var(--dur) var(--ease-decel)` | V8 | 4 | 1 | L | 1 |
| 7 | Replace `transition: background 0.15s` on lines 2471 and 2485 of able-v8.html with `transition: background var(--dur-fast) var(--ease-standard)` | V8 | 3 | 1 | L | 1 |
| 8 | Replace `transition: transform 350ms var(--ease-spring)` on line 3083 of able-v8.html with `transition: transform var(--dur-slow) var(--ease-spring)` — 350ms is outside the token range and should map to `--dur-slow` or a new `--dur-xslow` token if 350ms is intentional | V8 | 3 | 1 | M | 1 |
| 9 | Replace `transition: transform 250ms var(--ease-decel)` on line 3087 of able-v8.html with `transition: transform var(--dur-slow) var(--ease-decel)` | V8 | 3 | 1 | L | 1 |
| 10 | Replace `transition: transform 350ms cubic-bezier(0.34,1.56,0.64,1)` on line 3305 of able-v8.html with `transition: transform var(--dur-slow) var(--ease-spring)` | V8 | 3 | 1 | L | 1 |
| 11 | Replace `transition: opacity 300ms` on line 3791 of able-v8.html with `transition: opacity var(--dur-slow) var(--ease-standard)` | V8 | 3 | 1 | L | 1 |
| 12 | Replace `transition: opacity 0.3s ease` on line 4348 of able-v8.html with `transition: opacity var(--dur-slow) var(--ease-decel)` | V8 | 3 | 1 | L | 1 |
| 13 | Replace `transition: transform 250ms var(--ease-accel)` on line 4392 of able-v8.html with `transition: transform var(--dur-slow) var(--ease-accel)` | V8 | 3 | 1 | L | 1 |
| 14 | Replace `transition: transform 350ms var(--ease-spring), width 350ms var(--ease-spring)` on line 4771 of able-v8.html with `transition: transform var(--dur-slow) var(--ease-spring), width var(--dur-slow) var(--ease-spring)` | V8 | 3 | 1 | L | 1 |
| 15 | Replace `transition: top 0.15s` on line 4894 of able-v8.html with `transition: top var(--dur-fast) var(--ease-standard)` | V8 | 3 | 1 | L | 1 |
| 16 | Replace `transition: opacity 0.15s` on line 4930 of able-v8.html with `transition: opacity var(--dur-fast) var(--ease-standard)` | V8 | 3 | 1 | L | 1 |
| 17 | Replace `transition: color 0.15s ease, background 0.15s ease, opacity 0.15s ease, transform 0.15s ease` on line 5057 of able-v8.html with token-based transition properties using `var(--dur-fast)` | V8 | 3 | 1 | L | 1 |
| 18 | Replace `transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)` on line 5115 of able-v8.html with `transition: transform var(--dur-slow) var(--ease-decel)` | V8 | 3 | 1 | L | 1 |
| 19 | Replace `transition: color 0.15s, background 0.15s` on line 4956 of able-v8.html with `transition: color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard)` | V8 | 3 | 1 | L | 1 |
| 20 | Replace `transition: transform 300ms var(--ease-decel), opacity 300ms var(--ease-decel)` on line 4986 of able-v8.html with `transition: transform var(--dur-slow) var(--ease-decel), opacity var(--dur-slow) var(--ease-decel)` | V8 | 3 | 1 | L | 1 |
| 21 | Replace `transition: opacity 300ms var(--ease-standard)` on line 5026 of able-v8.html with `transition: opacity var(--dur-slow) var(--ease-standard)` | V8 | 3 | 1 | L | 1 |
| 22 | Replace `transition:border-left-color 300ms ease` on line 652 of admin.html with `transition: border-left-color var(--dur-slow) var(--ease-standard)` | ADM | 3 | 1 | L | 1 |
| 23 | Replace `transition: background-color 200ms ease, border-color 200ms ease` on line 814 of admin.html with `transition: background-color var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)` | ADM | 3 | 1 | L | 1 |
| 24 | Replace `transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)` on line 2176 of admin.html with `transition: transform var(--dur-slow) var(--ease-decel)` | ADM | 3 | 1 | L | 1 |
| 25 | Replace the inline `transition:opacity 0.2s` on line 2572 of admin.html (inside the `chqModeDesc` style attribute) with a CSS class so the duration can use `var(--dur)` | ADM | 3 | 2 | M | 2 |
| 26 | Replace `btn.style.transition = 'background 300ms'` on lines 7397 and 7419 of admin.html with `btn.style.transition = 'background var(--dur-slow)'` | ADM | 3 | 1 | L | 1 |
| 27 | Define `--dur-fast`, `--dur`, and `--dur-slow` tokens in the `:root` block of landing.html — the page currently has no duration tokens and all transitions use raw values | LND | 5 | 1 | L | 1 |
| 28 | Replace `transition: color 0.15s` on line 170 of landing.html with `transition: color var(--dur-fast) var(--ease-standard)` after adding the token | LND | 3 | 1 | L | 1 |
| 29 | Replace `transition: opacity 0.15s, transform 0.2s var(--spring)` on line 176 of landing.html with `transition: opacity var(--dur-fast) var(--ease-standard), transform var(--dur) var(--ease-spring)` | LND | 3 | 1 | L | 1 |
| 30 | Replace `opacity: 0; transition: opacity 0.15s` on line 193 of landing.html with `transition: opacity var(--dur-fast) var(--ease-standard)` | LND | 3 | 1 | L | 1 |
| 31 | Replace `transition: background 0.15s, color 0.15s, border-color 0.15s` on line 313 of landing.html with token-based transitions using `var(--dur-fast)` | LND | 3 | 1 | L | 1 |
| 32 | Replace `transition: opacity 0.15s, transform 0.3s var(--spring)` on line 327 of landing.html with `transition: opacity var(--dur-fast) var(--ease-standard), transform var(--dur-slow) var(--ease-spring)` | LND | 3 | 1 | L | 1 |
| 33 | Replace `transition: background 0.15s, color 0.15s, border-color 0.15s` on line 335 of landing.html with token-based transitions using `var(--dur-fast)` | LND | 3 | 1 | L | 1 |
| 34 | Replace `transition: background 0.3s var(--ease)` on line 390 of landing.html with `transition: background var(--dur-slow) var(--ease-decel)` | LND | 3 | 1 | L | 1 |
| 35 | Replace the six-property `transition:` rule on line 870 of landing.html (`.switcher-cta`) that uses `200ms` with `var(--dur)` for all properties | LND | 3 | 1 | L | 1 |
| 36 | Replace `transition: color 0.3s` on line 905 of landing.html with `transition: color var(--dur-slow) var(--ease-standard)` | LND | 3 | 1 | L | 1 |
| 37 | Replace `transition: border-color 0.2s, box-shadow 0.2s, transform 0.25s var(--spring)` on lines 805, 845, and 918 of landing.html with token-based values | LND | 3 | 1 | L | 1 |
| 38 | Replace `transition: background 0.15s, color 0.15s, border-color 0.15s` on line 942 of landing.html (`.btn-outline`) with `var(--dur-fast)` tokens | LND | 3 | 1 | L | 1 |
| 39 | Replace `transition: opacity 0.15s, transform 0.2s var(--spring)` on line 944 of landing.html (`.btn-accent`) with `var(--dur-fast)` and `var(--dur)` | LND | 3 | 1 | L | 1 |
| 40 | Replace `transition: color 0.15s` on line 1030 of landing.html (`.footer__link`) with `transition: color var(--dur-fast) var(--ease-standard)` | LND | 3 | 1 | L | 1 |
| 41 | Replace the JS inline `tabBar.style.transition = 'transform 200ms var(--ease-accel)'` on line 7188 of able-v8.html with a read from `getComputedStyle` for the `--dur` token | V8 | 2 | 2 | M | 3 |
| 42 | Replace the JS inline `tabBar.style.transition = 'transform 200ms var(--ease-decel)'` on line 7192 of able-v8.html with a token-based value | V8 | 2 | 2 | M | 3 |
| 43 | Replace `chip.style.transition = 'opacity 200ms var(--ease-decel)'` on line 7829 of able-v8.html with `'opacity ' + getComputedStyle(document.documentElement).getPropertyValue('--dur') + ' var(--ease-decel)'` | V8 | 2 | 2 | M | 3 |
| 44 | Replace `e.target.style.transition = 'opacity 200ms var(--ease-decel)'` on line 10321 of able-v8.html with a token-based value read at runtime | V8 | 2 | 2 | M | 3 |
| 45 | Replace `panel.style.transition = 'transform 350ms var(--ease-spring)'` on line 11247 of able-v8.html with `'transform ' + getComputedStyle(…).getPropertyValue('--dur-slow') + ' var(--ease-spring)'` | V8 | 3 | 2 | M | 3 |
| 46 | Replace `panel.style.transition = 'transform 250ms var(--ease-accel)'` on line 11263 of able-v8.html with a token-based value | V8 | 3 | 2 | M | 3 |
| 47 | Add a `--dur-xslow: 0.35s` token to the design system for cases where 350ms is semantically intended (e.g., full-panel sheet entries) so that 350ms has a named token instead of a raw value | ALL | 3 | 1 | L | 2 |
| 48 | Add a `--dur-micro: 0.08s` token for 80ms transitions (e.g., the pressed-state `80ms ease-out` on line 692 of able-v8.html) so all durations including micro-interactions are tokenised | ALL | 2 | 1 | L | 3 |
| 49 | Document the full duration token set (`--dur-micro`, `--dur-fast`, `--dur`, `--dur-slow`, `--dur-xslow`) in docs/systems/DESIGN_SYSTEM_SPEC.md with usage guidance for when each applies | ALL | 3 | 2 | L | 3 |
| 50 | Run a grep of `transition.*[0-9]\.[0-9]s` and `transition.*[0-9]{2,3}ms` across all four pages after each of the above fixes and confirm the count reaches zero | ALL | 5 | 1 | L | 1 |
| 51 | Add the three duration tokens to landing.html's `:root` block before any other landing.html CSS change to unblock all subsequent token substitutions | LND | 5 | 1 | L | 1 |
| 52 | Move the raw `transition: transform .2s cubic-bezier(0.34,1.56,0.64,1)` on line 866 of admin.html to use `var(--spring)` (already defined in admin.html) and `var(--dur)` | ADM | 3 | 1 | L | 1 |
| 53 | Move `transition: transform .15s cubic-bezier(0.34,1.56,0.64,1), box-shadow .15s` on line 993 of admin.html to use `var(--spring)` and `var(--dur-fast)` | ADM | 3 | 1 | L | 1 |
| 54 | Move `transition: transform .2s cubic-bezier(0.34,1.56,0.64,1)` on line 1960 of admin.html to use `var(--spring)` and `var(--dur)` | ADM | 3 | 1 | L | 1 |
| 55 | Verify that `--dur-mid` and `--dur-norm` tokens used in able-v8.html are either aliased to the canonical three tokens or removed — non-canonical token names add confusion | V8 | 3 | 1 | M | 2 |
| 56 | Replace `transition: background var(--dur-mid) var(--ease-standard)` on line 1202 of able-v8.html with `var(--dur)` if `--dur-mid` maps to `0.16s`, or raise an issue if it maps to something else | V8 | 3 | 1 | M | 2 |
| 57 | Replace `transition: opacity var(--dur-mid) var(--ease-decel)` on line 1012 of able-v8.html with `var(--dur)` after confirming `--dur-mid` is the canonical token alias | V8 | 3 | 1 | M | 2 |
| 58 | Ensure start.html uses the same three duration tokens defined in its `:root` block (already present) and that no additional raw millisecond or decimal-second values exist in its CSS | STR | 3 | 2 | L | 2 |
| 59 | Replace `transition: background .2s var(--spring), color .2s var(--spring), …` on line 476 of start.html with `var(--dur)` for all six properties | STR | 3 | 1 | L | 1 |
| 60 | Replace `transition: background .2s var(--spring), color .2s var(--spring), …` on line 610 of start.html with `var(--dur)` for all six properties | STR | 3 | 1 | L | 1 |
| 61 | Add a CI grep rule (or a Playwright test) that runs on every commit and fails if any of the four pages contain a raw decimal-second or millisecond value in a transition property | ALL | 4 | 3 | L | 4 |
| 62 | Ensure the `transition-duration: 0.01ms !important` in the `prefers-reduced-motion` block on line 742 of able-v8.html is preserved as a raw value — this is the correct and intentional override, not a regression | V8 | 3 | 1 | L | 1 |
| 63 | Ensure admin.html defines `--dur-fast`, `--dur`, and `--dur-slow` in its `:root` block to match the canonical token set — admin currently only defines `--spring` and `--ease` variants | ADM | 4 | 1 | L | 1 |
| 64 | After adding duration tokens to admin.html, update all remaining raw-value transitions in that file in a single pass to use the tokens | ADM | 4 | 2 | L | 1 |
| 65 | Ensure start.html's existing `.stepIn` animation uses `var(--dur-slow)` for its `animation-duration` rather than a hardcoded value | STR | 2 | 1 | L | 3 |
| 66 | Verify that the `transition-duration: 100ms` rules in the `prefers-reduced-motion` block on lines 3375–3376 of able-v8.html are intentional (they collapse sheet transitions) and document why they use raw values | V8 | 2 | 1 | L | 3 |
| 67 | Create a token alias `--dur-panel: var(--dur-xslow)` in the design system for full-panel and sheet transitions so the intent is clear even when the underlying duration changes | ALL | 2 | 1 | L | 4 |
| 68 | Add a `--dur-badge: var(--dur-fast)` alias for badge/chip animations to signal that these are always fast-transition contexts | ALL | 1 | 1 | L | 5 |
| 69 | Ensure the admin.html `milestoneEnter` animation uses a token-based duration (`0.35s` is currently raw) — add a `--dur-xslow` token and reference it | ADM | 2 | 1 | L | 3 |
| 70 | Ensure the admin.html `fanRowIn` animation uses a token-based duration rather than a raw value | ADM | 2 | 1 | L | 3 |
| 71 | Ensure the `fadeInUp` animation in admin.html uses token-based duration | ADM | 2 | 1 | L | 3 |
| 72 | Ensure the `stateSpringIn` animation in admin.html uses token-based duration | ADM | 2 | 1 | L | 3 |
| 73 | Ensure the `fadeSlide` animation in admin.html uses token-based duration | ADM | 2 | 1 | L | 3 |
| 74 | Ensure the `stepIn`, `stepIn-fwd`, and `stepIn-back` animations in start.html use token-based durations | STR | 2 | 1 | L | 3 |
| 75 | Ensure the `slideDown` animation in start.html uses a token-based duration | STR | 2 | 1 | L | 3 |
| 76 | Ensure the `ai-slide-in` animation in start.html uses a token-based duration | STR | 2 | 1 | L | 3 |
| 77 | Ensure the `faqSlide` animation in landing.html uses a token-based duration | LND | 2 | 1 | L | 3 |
| 78 | Ensure the `ctaPulse`, `artPulse`, and `dp-pulse` animations in landing.html use token-based durations | LND | 2 | 1 | L | 3 |
| 79 | Ensure the `heroIn` and `fadeDown` animations in landing.html use token-based durations | LND | 2 | 1 | L | 3 |
| 80 | Ensure the `marquee-scroll` animation in landing.html uses a token-based duration (marquee speed may intentionally be longer — document this) | LND | 2 | 1 | L | 4 |
| 81 | Ensure the `rec-pulse` animation in landing.html uses a token-based duration | LND | 2 | 1 | L | 3 |
| 82 | Ensure the `cta-drift` animation in landing.html uses a token-based duration or a named long-form animation token | LND | 2 | 1 | L | 4 |
| 83 | Add a shared comment header in each page's `<style>` block that lists the canonical duration tokens and their intended use cases, so future editors know the system | ALL | 2 | 1 | L | 5 |
| 84 | Ensure that any transition added by the Playwright smoke test helpers in `tests/` uses token values rather than raw milliseconds in its wait duration | ALL | 2 | 2 | L | 5 |
| 85 | Verify that all transitions in admin.html's tier-lock reveal animation (gold lock pattern) use token-based durations | ADM | 2 | 1 | L | 3 |
| 86 | Ensure the campaign-state switch animation in admin.html (200ms intended transition) uses `var(--dur)` after the token is added | ADM | 3 | 1 | L | 2 |
| 87 | Replace all `transition: background 0.15s` shorthand rules across able-v8.html — confirm with grep that `0\.15s` count reaches zero | V8 | 3 | 1 | L | 1 |
| 88 | Replace all `transition: color 0.15s` shorthand rules across able-v8.html — confirm with grep that remaining `0\.15s` count reaches zero | V8 | 3 | 1 | L | 1 |
| 89 | Replace all `transition: opacity 0.15s` shorthand rules across able-v8.html — confirm with grep that remaining `0\.15s` count reaches zero | V8 | 3 | 1 | L | 1 |
| 90 | After all token substitutions are complete, run `grep -n "transition.*[0-9]ms\b\|transition.*\b0\.[0-9]s" able-v8.html admin.html start.html landing.html` and ensure the output is empty (except the known `0.01ms` reduced-motion override) | ALL | 5 | 1 | L | 1 |
| 91 | Add a note in CONTEXT.md under "CSS token rules" that raw transition durations are banned and that the permitted tokens are `--dur-fast`, `--dur`, `--dur-slow`, and `--dur-xslow` | ALL | 2 | 1 | L | 4 |
| 92 | Ensure the `transition: opacity var(--dur-slow) var(--ease-decel)` on line 774 of able-v8.html still uses the canonical spelling after any token rename — it is currently compliant | V8 | 1 | 1 | L | 6 |
| 93 | Ensure the `transition: background var(--dur-fast)` on line 2012 of able-v8.html adds an explicit easing function (`var(--ease-standard)`) for full spec compliance | V8 | 2 | 1 | L | 3 |
| 94 | Ensure `transition: color var(--dur-fast)` on line 2081 of able-v8.html adds an explicit easing function | V8 | 2 | 1 | L | 3 |
| 95 | Ensure `transition: background var(--dur-fast), padding-left var(--dur-fast)` on line 2121 of able-v8.html adds explicit easing functions for both properties | V8 | 2 | 1 | L | 3 |
| 96 | Ensure `transition: color var(--dur-fast)` on line 2276 of able-v8.html adds an explicit easing function | V8 | 2 | 1 | L | 3 |
| 97 | Ensure `transition: color var(--dur-fast)` on line 2297 of able-v8.html adds an explicit easing function | V8 | 2 | 1 | L | 3 |
| 98 | Ensure `transition: color var(--dur-fast)` on line 2359 of able-v8.html adds an explicit easing function | V8 | 2 | 1 | L | 3 |
| 99 | Ensure `transition: color var(--dur-fast)` on line 3061 of able-v8.html adds an explicit easing function | V8 | 2 | 1 | L | 3 |
| 100 | Document the decision to use `--dur-slow` (0.22s) as the ceiling for UI transitions — anything longer should use a named animation (`@keyframes`) rather than a `transition` property, and record this rule in docs/systems/MICRO_INTERACTIONS_SPEC.md | ALL | 3 | 1 | L | 5 |
