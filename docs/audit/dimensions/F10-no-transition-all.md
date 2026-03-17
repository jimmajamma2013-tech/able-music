# Dimension F10 — No Transition All
**Category:** Interaction States & Motion
**Phase:** 7 (Interactions)
**Status:** Not started

`transition: all` is a performance trap and a maintenance liability. It causes the browser to watch every animatable CSS property on an element for changes — including layout properties like `width`, `height`, `padding`, and `display`, which trigger layout recalculation on every frame of the transition. It also makes it impossible to reason about what is actually transitioning when a state change occurs. Full compliance is a binary measure: a grep for `transition: all` and `transition:all` across all four active pages must return zero results. Every transition must explicitly name the properties it animates. This dimension is verifiable in under a minute and has zero legitimate exceptions.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Run `grep -n "transition:\s*all" able-v8.html admin.html start.html landing.html` and record the baseline count — establish the current state before making any changes | ALL | 5 | 1 | L | 1 |
| 2 | If any instance of `transition: all` is found in able-v8.html, replace each with explicit properties covering only `background-color`, `color`, `border-color`, `opacity`, `transform`, and `box-shadow` as appropriate to the element's behaviour | V8 | 5 | 1 | L | 1 |
| 3 | If any instance of `transition: all` is found in admin.html, replace each with explicit named properties | ADM | 5 | 1 | L | 1 |
| 4 | If any instance of `transition: all` is found in start.html, replace each with explicit named properties | STR | 5 | 1 | L | 1 |
| 5 | If any instance of `transition: all` is found in landing.html, replace each with explicit named properties | LND | 5 | 1 | L | 1 |
| 6 | After the initial grep, run `grep -n "transition:all"` (no space) across all four pages as a second pass — some minified inline styles omit the space | ALL | 4 | 1 | L | 1 |
| 7 | Add a CI/pre-commit grep check that blocks any commit containing `transition: all` or `transition:all` across able-v8.html, admin.html, start.html, and landing.html | ALL | 5 | 2 | L | 1 |
| 8 | Add the `transition: all` ban to CONTEXT.md's "CSS token rules" section so it appears in every session's orientation read | ALL | 3 | 1 | L | 2 |
| 9 | Add the ban to the CLAUDE.md project guide's "Working rules for autonomous development" section as an explicit rule | ALL | 3 | 1 | L | 2 |
| 10 | Add the ban to docs/systems/DESIGN_SYSTEM_SPEC.md as a CSS anti-pattern, alongside the rationale (layout thrashing, unpredictable animation surfaces) | ALL | 2 | 1 | L | 3 |
| 11 | Audit all `<style>` blocks in able-v8.html for the pattern `transition: all [duration] [easing]` which would be caught by a partial-match grep — ensure the search pattern covers variations | V8 | 4 | 1 | L | 1 |
| 12 | Audit all inline `style` attributes in able-v8.html for `transition: all` — inline styles containing `transition: all` would not appear in a simple CSS grep | V8 | 4 | 1 | L | 1 |
| 13 | Audit all JavaScript `style.transition = '...'` assignments in able-v8.html for any that use `'all'` as the property — grep for `\.transition\s*=.*'all\b` | V8 | 4 | 1 | L | 1 |
| 14 | Audit all JavaScript `style.transition = '...'` assignments in admin.html for any that assign `'all'` | ADM | 4 | 1 | L | 1 |
| 15 | Audit all JavaScript `style.transition = '...'` assignments in start.html for any that assign `'all'` | STR | 4 | 1 | L | 1 |
| 16 | Audit all JavaScript `style.transition = '...'` assignments in landing.html for any that assign `'all'` | LND | 4 | 1 | L | 1 |
| 17 | Search for `transition: all` within any `<template>` literals or `innerHTML` strings in admin.html's JavaScript — these would not be caught by a CSS grep | ADM | 4 | 1 | L | 1 |
| 18 | Search for `transition: all` within any `innerHTML` strings in able-v8.html's JavaScript | V8 | 4 | 1 | L | 1 |
| 19 | Search for `transition: all` within any `innerHTML` strings in start.html's JavaScript | STR | 3 | 1 | L | 1 |
| 20 | Search for `transition: all` within any `innerHTML` strings in landing.html's JavaScript | LND | 3 | 1 | L | 1 |
| 21 | Wherever `transition: all` is replaced in able-v8.html, verify the replacement covers only the properties that actually change in the hover/active/focus state for that element — not a catch-all replacement | V8 | 3 | 2 | M | 2 |
| 22 | Wherever `transition: all` is replaced in admin.html, verify the replacement covers only the relevant properties | ADM | 3 | 2 | M | 2 |
| 23 | Wherever `transition: all` is replaced in start.html, verify the replacement covers only the relevant properties | STR | 3 | 2 | M | 2 |
| 24 | Wherever `transition: all` is replaced in landing.html, verify the replacement covers only the relevant properties | LND | 3 | 2 | M | 2 |
| 25 | After each replacement, run the relevant page in Chrome DevTools' Performance panel and confirm no layout recalculation is triggered by the transition that was not there before | ALL | 3 | 2 | L | 3 |
| 26 | Check shared/style.css (if it exists and is used by any of the four pages) for `transition: all` occurrences | ALL | 4 | 1 | L | 1 |
| 27 | Check shared/able.js (if it injects styles dynamically) for `transition: all` occurrences | ALL | 4 | 1 | L | 1 |
| 28 | After the grep returns zero, record the zero-count as a passing result in the ABLE audit report for dimension F10 | ALL | 3 | 1 | L | 1 |
| 29 | Add a Playwright test that greps the served HTML of each page and asserts zero occurrences of `transition: all` or `transition:all` | ALL | 4 | 3 | L | 4 |
| 30 | Ensure any future AI-generated or LLM-suggested CSS additions are reviewed for `transition: all` before being committed — add this to the code review checklist | ALL | 3 | 1 | L | 3 |
| 31 | Check that no CSS frameworks or third-party snippet pastes have introduced `transition: all` — search all `<link rel="stylesheet">` sources linked from any of the four pages | ALL | 3 | 1 | L | 2 |
| 32 | If `transition: all` is found in any CDN-loaded stylesheet, open a note in docs/audit documenting the source and that it is uncontrolled third-party code | ALL | 2 | 1 | L | 3 |
| 33 | Add the following grep command to the ABLE dev runbook: `grep -rn "transition:\s*all" able-v8.html admin.html start.html landing.html` and document that it should return empty | ALL | 2 | 1 | L | 4 |
| 34 | Ensure the sw.js service worker does not inject any stylesheets or inline `transition: all` rules into served pages | ALL | 2 | 1 | L | 3 |
| 35 | Verify that Netlify edge functions or redirects do not inject any stylesheets with `transition: all` | ALL | 2 | 1 | L | 3 |
| 36 | Add the zero-result `transition: all` grep check to the ABLE pre-build checklist in docs/PRE-BUILD-CHECKLIST.md | ALL | 2 | 1 | L | 4 |
| 37 | Add the `transition: all` check to the ABLE MASTER-CHECKLIST.md as a binary pass/fail item | ALL | 2 | 1 | L | 4 |
| 38 | Ensure that start.html's wizard step transitions (which previously may have used `transition: all` for simplicity) explicitly name only `opacity` and `transform` | STR | 3 | 1 | L | 2 |
| 39 | Ensure that landing.html's FAQ accordion animation explicitly names `max-height` and `opacity` rather than `all` — accordion patterns are a common source of `transition: all` | LND | 3 | 1 | L | 2 |
| 40 | Ensure that admin.html's section visibility toggles explicitly name `opacity` and `max-height` rather than `all` | ADM | 3 | 1 | L | 2 |
| 41 | Ensure that any collapsible panels in admin.html (e.g., Campaign HQ sections) name only `height`, `opacity`, and `padding` in their transitions — not `all` | ADM | 3 | 1 | L | 2 |
| 42 | Ensure that the snap-card expand/collapse interaction in admin.html names explicit transition properties | ADM | 2 | 1 | L | 3 |
| 43 | Ensure that the fan detail drawer open/close transition in admin.html names `transform` and `opacity` only | ADM | 2 | 1 | L | 3 |
| 44 | Ensure that platform pill hover states in able-v8.html name `background`, `color`, and `transform` explicitly | V8 | 2 | 1 | L | 3 |
| 45 | Ensure that CTA button hover states in able-v8.html name `background`, `box-shadow`, and `transform` explicitly | V8 | 3 | 1 | L | 2 |
| 46 | Ensure that input focus states in start.html name `border-color` and `box-shadow` explicitly | STR | 3 | 1 | L | 2 |
| 47 | Ensure that input focus states in admin.html name `border-color` and `box-shadow` explicitly | ADM | 3 | 1 | L | 2 |
| 48 | Ensure that link hover states in landing.html name `color` and `text-decoration-color` explicitly | LND | 2 | 1 | L | 3 |
| 49 | Ensure that modal overlay transitions name `opacity` and `pointer-events` explicitly, not `all` | ALL | 3 | 1 | L | 2 |
| 50 | Ensure that the CC (credit card/show card) sheet entry transition on able-v8.html names `transform` and `opacity` explicitly | V8 | 2 | 1 | L | 3 |
| 51 | Ensure the presave form transition on able-v8.html names `opacity` and `max-height` only | V8 | 2 | 1 | L | 3 |
| 52 | Ensure the fan sign-up form collapse/expand on able-v8.html names `opacity` and `max-height` only | V8 | 2 | 1 | L | 3 |
| 53 | Ensure admin sidebar collapse/expand transitions name `width` and `opacity` only | ADM | 2 | 1 | L | 3 |
| 54 | Ensure the tier-lock overlay on admin.html names `opacity` and `backdrop-filter` only in its transition | ADM | 2 | 1 | L | 3 |
| 55 | Ensure snap-card hover states in able-v8.html name `transform` and `box-shadow` explicitly | V8 | 2 | 1 | L | 3 |
| 56 | Ensure show-card hover states in admin.html name `background` and `transform` explicitly | ADM | 2 | 1 | L | 3 |
| 57 | Ensure fan-row hover states in admin.html name `background` only | ADM | 2 | 1 | L | 3 |
| 58 | Ensure the milestoneCard dismiss transition in admin.html names `opacity` and `transform` explicitly | ADM | 2 | 1 | L | 3 |
| 59 | Ensure toast show/hide transitions in admin.html name `opacity` and `transform` only | ADM | 2 | 1 | L | 3 |
| 60 | Ensure the `able-toast` element's transition in admin.html explicitly names `opacity` | ADM | 2 | 1 | L | 3 |
| 61 | Ensure landing.html navigation link hover states name `color` only | LND | 2 | 1 | L | 3 |
| 62 | Ensure landing.html hero CTA button hover states name `background`, `box-shadow`, and `transform` explicitly | LND | 2 | 1 | L | 3 |
| 63 | Ensure the `.switcher-cta` button transition in landing.html lists all six properties explicitly (as it currently does) and does not collapse to `all` if refactored | LND | 2 | 1 | L | 3 |
| 64 | Ensure start.html wizard card enter/exit transitions name `opacity` and `transform` only | STR | 2 | 1 | L | 3 |
| 65 | Ensure start.html's genre chip hover states name `background`, `color`, and `border-color` explicitly | STR | 2 | 1 | L | 3 |
| 66 | Ensure start.html's colour-swatch hover states name `transform` and `box-shadow` explicitly | STR | 2 | 1 | L | 3 |
| 67 | Ensure that any Google Fonts or web font loading CSS injected into the page does not contain `transition: all` | ALL | 2 | 1 | L | 3 |
| 68 | Ensure that manifest.json's theme-color changes (if animated via meta tag update) do not use `transition: all` patterns in any associated JS | ALL | 1 | 1 | L | 5 |
| 69 | Add `transition: all` to the list of banned CSS patterns in the project's eslint or stylelint configuration if a linter is added in future | ALL | 2 | 2 | L | 5 |
| 70 | After the final zero-count is confirmed, add a comment in CONTEXT.md noting the date `transition: all` was eliminated and who verified it | ALL | 2 | 1 | L | 5 |
| 71 | Ensure that the `able-v3.html` file (which is in the repo but not actively edited) does not serve as a source of copy-paste `transition: all` for future developers — add a deprecation comment at the top of that file | V8 | 1 | 1 | L | 6 |
| 72 | Ensure that the `able-v6.html` file similarly has a deprecation comment warning against copying its CSS patterns | V8 | 1 | 1 | L | 6 |
| 73 | Check `privacy.html` and `terms.html` for `transition: all` — they are not in the primary four but exist in the repo | ALL | 2 | 1 | L | 3 |
| 74 | Check `fan.html` for `transition: all` — it is listed as "in progress" and may have early-draft patterns | ALL | 2 | 1 | L | 2 |
| 75 | Check `logo-preview.html` and `_icon-gen.html` for `transition: all` — they are helper files that should also comply | ALL | 1 | 1 | L | 5 |
| 76 | After all replacements, run a performance profile on admin.html's dashboard load and confirm the reduction in layout recalculation warnings | ADM | 3 | 2 | L | 4 |
| 77 | After all replacements, run a performance profile on able-v8.html and confirm the same | V8 | 3 | 2 | L | 4 |
| 78 | Document the performance impact (before/after layout recalculation count) in docs/audit/dimensions/F10-no-transition-all.md once remediation is complete | ALL | 2 | 1 | L | 5 |
| 79 | Ensure that the ABLE component library (if extracted to COMPONENT-LIBRARY.md or a shared CSS file) does not contain any `transition: all` in its example code | ALL | 2 | 1 | L | 4 |
| 80 | Ensure that any AI-generated code snippets from Claude sessions are reviewed for `transition: all` before being pasted into active files — add this as a standing instruction in CLAUDE.md | ALL | 3 | 1 | L | 3 |
| 81 | After zero-count is confirmed, write a passing test result entry in docs/audit/100-DIMENSIONS.md for this dimension | ALL | 2 | 1 | L | 5 |
| 82 | Ensure the Playwright `smoke-v7-full.png` screenshot test does not mask visual regressions caused by `transition: all` by taking a baseline screenshot after removal | V8 | 2 | 2 | L | 5 |
| 83 | Ensure the admin smoke test takes a new baseline screenshot after any `transition: all` removal to update the visual regression baseline | ADM | 2 | 2 | L | 5 |
| 84 | Add a note to the ABLE HANDOFF.md that `transition: all` is banned and the project is verified clean as of the audit date | ALL | 2 | 1 | L | 5 |
| 85 | Confirm that the `--dur-fast: .14s` token is not accidentally interpreted as `transition: all .14s` in any shorthand — `transition` shorthand without a property name defaults to `all` | ALL | 3 | 1 | L | 2 |
| 86 | Confirm that `transition: background var(--dur-fast)` on line 2906 of able-v8.html is not a shorthand that could resolve to `all` in older browsers — add an explicit easing function to make it fully specified | V8 | 2 | 1 | L | 3 |
| 87 | Confirm that `transition: background var(--dur-fast)` on line 2947 of able-v8.html is similarly fully specified | V8 | 2 | 1 | L | 3 |
| 88 | Confirm that `transition: background var(--dur-fast) var(--ease-standard)` is the canonical form for all background-only transitions in able-v8.html | V8 | 2 | 1 | L | 3 |
| 89 | Ensure that any vendor-prefixed transition rules (e.g., `-webkit-transition`) that use `all` are also eliminated — run `grep -n "\-webkit-transition.*all"` | ALL | 2 | 1 | L | 2 |
| 90 | Ensure that any `transition` rules using the `initial`, `inherit`, or `unset` keywords do not accidentally produce `transition: all initial` | ALL | 2 | 1 | L | 3 |
| 91 | Confirm that the `fan.html` page (in-progress) uses explicit transition properties from its very first commit, establishing the correct pattern early | V8 | 3 | 1 | L | 2 |
| 92 | Add the `transition: all` check to the `START-BUILDING.md` onboarding doc's CSS section so any new contributor learns the rule immediately | ALL | 2 | 1 | L | 4 |
| 93 | Ensure that pasted design-reference CSS from `design-references/` directory, if ever adopted, is audited for `transition: all` before use | ALL | 1 | 1 | L | 5 |
| 94 | Ensure that the `tests/` directory Playwright helpers do not inject any test-only stylesheets containing `transition: all` | ALL | 2 | 1 | L | 4 |
| 95 | Ensure that any future CSS reset or normalise stylesheet added to the project does not include `transition: all` in its reset rules | ALL | 2 | 1 | L | 3 |
| 96 | Ensure `netlify/` edge function responses do not inject stylesheets with `transition: all` | ALL | 1 | 1 | L | 5 |
| 97 | After all clean-up, include the `transition: all` grep output (showing zero results) as an appendix in the docs/audit/100-DIMENSIONS.md report | ALL | 2 | 1 | L | 6 |
| 98 | Confirm that the current `able-v8.html` already has zero `transition: all` instances (the context notes suggest this was fixed in Wave 0) — document the confirmation date | V8 | 3 | 1 | L | 1 |
| 99 | Confirm that admin.html, start.html, and landing.html also have zero `transition: all` instances — run the grep now and record the result | ALL | 4 | 1 | L | 1 |
| 100 | Mark dimension F10 as passing in the audit scorecard once the grep returns zero results across all four pages and the CI check is in place | ALL | 5 | 1 | L | 1 |
