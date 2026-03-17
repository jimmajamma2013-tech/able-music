# Dimension F6 — Disabled State
**Category:** Interaction States & Motion
**Phase:** 7 (Interactions)
**Status:** Not started

A disabled control communicates intent: "this exists, but it is not available to you right now." That communication only works if the visual treatment and the accessibility layer agree. Full compliance requires three things in combination: opacity of 40% or less (enough to be visually distinct from an enabled state), `cursor: not-allowed` on the element, and `aria-disabled="true"` on any element that cannot use the native `disabled` attribute (anchor tags, custom button-like divs, tier-gated preview areas). The HTML `disabled` attribute alone is insufficient — it removes the element from keyboard focus, which hides tier-locked features from screen-reader users. The combination of `aria-disabled="true"` and a `tabindex="0"` with appropriate keyboard handling is the correct pattern for gold-lock previews.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add `aria-disabled="true"` to all `<button disabled>` elements in admin.html's broadcast panel that currently rely on the HTML `disabled` attribute alone, to ensure screen readers announce the disabled reason | ADM | 5 | 1 | L | 1 |
| 2 | Add `cursor: not-allowed` to the `.section-order-btn:disabled` rule in admin.html (currently `cursor: default`) to match the pointer convention used elsewhere | ADM | 3 | 1 | L | 1 |
| 3 | Change the opacity on the broadcast "Send to fans" disabled button in admin.html from the default browser greying to an explicit `opacity: 0.4` that matches the ABLE design token system | ADM | 3 | 1 | L | 1 |
| 4 | Add `aria-disabled="true"` to the section re-order "Move up" and "Move down" buttons in admin.html when they are at the boundary position (index 0 or last), which currently only set the `disabled` HTML attribute | ADM | 3 | 1 | L | 1 |
| 5 | Add `cursor: not-allowed` to the `.ai-trigger:disabled` rule in admin.html — currently the rule sets `opacity: .45` only | ADM | 3 | 1 | L | 1 |
| 6 | Ensure all tier-gated preview elements in admin.html that are visually blurred have `aria-disabled="true"` and a descriptive `aria-label` explaining the tier requirement | ADM | 4 | 2 | L | 1 |
| 7 | Add a `[disabled]` CSS rule in admin.html that applies `opacity: 0.4` universally as a base, so future disabled elements are covered without per-element rules | ADM | 4 | 1 | L | 1 |
| 8 | Add `cursor: not-allowed` to the static "Send a message" placeholder button in admin.html connections panel (currently uses only `cursor: not-allowed` in inline style — move to a CSS class) | ADM | 2 | 1 | L | 2 |
| 9 | Audit every `<button>` in admin.html that uses `opacity: 0.5` without a `disabled` attribute and add the HTML `disabled` attribute or `aria-disabled="true"` to make the disabled state semantically correct | ADM | 4 | 2 | L | 1 |
| 10 | Add a CSS rule for `button[disabled], button[aria-disabled="true"]` that sets `pointer-events: none` in addition to `opacity: 0.4` to prevent any click handlers from firing on disabled buttons | ADM | 4 | 1 | L | 1 |
| 11 | Add `aria-disabled="true"` to the up/down reorder buttons on the snap-card list in admin.html when the card is at the first or last position | ADM | 3 | 1 | L | 1 |
| 12 | Replace the inline `cursor:not-allowed` style on the placeholder "Send a message" button in admin.html with a shared `.btn--disabled` CSS class that also sets `opacity: 0.4` | ADM | 2 | 1 | L | 2 |
| 13 | Add a visible `not-allowed` cursor to any `<a>` tag that represents a disabled navigation item or a tier-locked link in admin.html — anchor tags do not inherit the browser's default disabled cursor | ADM | 3 | 1 | L | 2 |
| 14 | Audit start.html for any "Next" buttons that become disabled when required fields are empty — confirm they have both `disabled` and `aria-disabled="true"` and `opacity: 0.4` | STR | 4 | 1 | L | 1 |
| 15 | Add a `title` attribute to every disabled button in admin.html explaining why it is disabled (e.g., `title="Complete your profile to enable broadcasts"`) to assist mouse users | ADM | 3 | 1 | L | 2 |
| 16 | Add `aria-disabled="true"` to the "Move up" button for the first recommendation in admin.html `moveRec()` boundary case | ADM | 2 | 1 | L | 2 |
| 17 | Add `aria-disabled="true"` to the "Move down" button for the last recommendation in admin.html `moveRec()` boundary case | ADM | 2 | 1 | L | 2 |
| 18 | Ensure the tier-locked stat cards in admin.html have `aria-disabled="true"` and not merely a CSS blur — the blur alone does not communicate disabled status to assistive technology | ADM | 4 | 2 | L | 2 |
| 19 | Confirm that the CTA primary button on able-v8.html is never in a visually disabled state without a corresponding `aria-disabled="true"` — fan-facing pages must not silently block interactions | V8 | 4 | 1 | L | 2 |
| 20 | Add `opacity: 0.4` and `cursor: not-allowed` to any gig mode toggle that is unavailable on the free tier in admin.html | ADM | 3 | 1 | L | 2 |
| 21 | Ensure the free-tier snap-card add button beyond the 1-card limit shows `aria-disabled="true"`, `opacity: 0.4`, and `cursor: not-allowed` rather than just being hidden | ADM | 4 | 1 | L | 1 |
| 22 | Add a `.is-disabled` utility class in admin.html that sets `opacity: 0.4`, `cursor: not-allowed`, `pointer-events: none`, and `aria-disabled: true` via a JS helper for non-native elements | ADM | 4 | 2 | L | 1 |
| 23 | Verify that the "Preview" button in admin.html's broadcast panel sets both `disabled` HTML attribute and `aria-disabled="true"` consistently rather than alternating between the two patterns | ADM | 3 | 1 | L | 2 |
| 24 | Add `aria-disabled="true"` to the campaign-state buttons in admin.html Campaign HQ when a state is already active and a second tap would be a no-op | ADM | 3 | 1 | L | 2 |
| 25 | Ensure the "Export fans" button in admin.html is disabled (`disabled` + `aria-disabled="true"` + `opacity: 0.4`) when fan count is 0 rather than exporting an empty file | ADM | 3 | 1 | L | 2 |
| 26 | Add `cursor: not-allowed` to the `[disabled]` styles in landing.html for the email input and CTA button when the form is in the submitted/locked state | LND | 3 | 1 | L | 2 |
| 27 | Ensure start.html's CTA buttons are visually disabled at `opacity: 0.4` (not the default browser 0.5) when step validation fails, using an explicit CSS rule | STR | 3 | 1 | L | 2 |
| 28 | Add a `[aria-disabled="true"]` style rule in the shared CSS that provides a consistent visual treatment for all custom-role disabled elements across admin and profile | ALL | 4 | 2 | L | 2 |
| 29 | Ensure the "Move section up" / "Move section down" buttons in the admin section-order panel update their `aria-disabled` attribute dynamically in JS when the array position changes | ADM | 3 | 2 | M | 2 |
| 30 | Add `aria-disabled="true"` to the bounce-in animation trigger on able-v8.html for any interactive element that is intentionally inert before profile data loads | V8 | 2 | 1 | L | 3 |
| 31 | Ensure the admin gig-mode button reads as `aria-pressed` rather than `aria-disabled` when active, to avoid conflating "active" with "disabled" states | ADM | 3 | 2 | M | 2 |
| 32 | Add `aria-disabled="true"` to the broadcast subject-line AI assist button when the body text is empty and the action would be meaningless | ADM | 2 | 1 | L | 3 |
| 33 | Ensure the snap-card "duplicate" action is disabled (`disabled` + `aria-disabled="true"`) when the artist is on free tier and already at the 1-card limit | ADM | 3 | 1 | L | 2 |
| 34 | Add a minimum `opacity: 0.4` rule to the `[disabled]` selector on start.html's form buttons to override the default browser 0.5 opacity | STR | 2 | 1 | L | 2 |
| 35 | Ensure that all dynamically generated disabled buttons in admin.html (e.g., those built via `innerHTML` strings with `disabled` in the string) also receive `aria-disabled="true"` in the same template string | ADM | 4 | 2 | M | 2 |
| 36 | Add a visual `not-allowed` cursor to the past-show indicator `<span>` in admin.html's show card that uses `opacity: 0.5` but is not actually a button | ADM | 1 | 1 | L | 5 |
| 37 | Ensure the "Confirm" reorder buttons on the fan list in admin.html are disabled with both `disabled` and `aria-disabled="true"` when no reorder change has been made | ADM | 2 | 1 | L | 3 |
| 38 | Add `cursor: not-allowed` to the `.ep-ai-use:disabled` rule in able-v8.html which currently only sets `opacity: 0.4` | V8 | 2 | 1 | L | 3 |
| 39 | Ensure that `pointer-events: none` is set on all disabled elements in admin.html's broadcast panel so that a click on a disabled element does not bubble to a parent handler | ADM | 3 | 1 | L | 2 |
| 40 | Add `aria-disabled="true"` to the tier-locked analytics sections in admin.html, not just a CSS opacity and blur, so screen readers announce that the section is unavailable on the current tier | ADM | 4 | 2 | L | 2 |
| 41 | Ensure the presave CTA button on able-v8.html becomes disabled (`disabled` + `aria-disabled="true"` + `opacity: 0.4`) after a fan has already submitted their email in the current session | V8 | 3 | 1 | L | 3 |
| 42 | Add a `title` tooltip to disabled tier-locked elements in admin.html that says "Available on Artist Pro" rather than leaving the user to guess why the control is inert | ADM | 3 | 1 | L | 3 |
| 43 | Audit all `<input disabled>` elements in admin.html to confirm they have `aria-disabled="true"` — native `disabled` on inputs removes them from focus order, which can disorient keyboard navigation | ADM | 3 | 1 | L | 2 |
| 44 | Ensure the broadcast textarea on admin.html that is `disabled` pending upgrade has `aria-disabled="true"` and a `placeholder` that explains the tier gate | ADM | 3 | 1 | L | 2 |
| 45 | Add `aria-disabled="true"` to the snap-card "Edit" button when the card is in a locked tier-gate state | ADM | 2 | 1 | L | 3 |
| 46 | Ensure the "Remove" button on a snap card that is required (e.g., a minimum of 1 must remain) is disabled with `disabled`, `aria-disabled="true"`, and `opacity: 0.4` | ADM | 2 | 1 | L | 3 |
| 47 | Add a consistent `filter: grayscale(0.3)` to all disabled image-based controls (e.g., platform pill icons) in admin.html to reinforce the disabled state beyond opacity alone | ADM | 2 | 2 | M | 4 |
| 48 | Ensure that when the artist is in free tier, the "Schedule broadcast" button is `aria-disabled="true"` and shows the "Artist" tier label in the tooltip | ADM | 3 | 1 | L | 3 |
| 49 | Add an explicit `tabindex="-1"` to all `pointer-events: none` disabled elements in admin.html that are not native `<button disabled>` elements, to remove them from focus order | ADM | 3 | 2 | L | 2 |
| 50 | Ensure the "Delete fan" action in admin.html is disabled for the last fan on the list (cannot remove all fans) — add `disabled`, `aria-disabled="true"`, and a tooltip | ADM | 2 | 1 | L | 4 |
| 51 | Add `aria-disabled="true"` to the "Apply campaign state" buttons in admin.html when the artist has no release date set and pre-release mode is unavailable | ADM | 3 | 1 | L | 3 |
| 52 | Ensure the "Save" button on any admin form section that has no unsaved changes is visually disabled at `opacity: 0.4` and has `aria-disabled="true"` to prevent unnecessary saves | ADM | 3 | 1 | L | 3 |
| 53 | Add `cursor: not-allowed` to the section visibility toggles in admin.html when the section is locked at the current tier | ADM | 2 | 1 | L | 3 |
| 54 | Ensure the "Add show" button in admin.html is disabled for free-tier users beyond the show limit — `disabled`, `aria-disabled="true"`, `opacity: 0.4`, and a tier tooltip | ADM | 3 | 1 | L | 3 |
| 55 | Add `aria-disabled="true"` to the analytics date-range picker in admin.html when the date range exceeds the free-tier 30-day window | ADM | 3 | 1 | L | 3 |
| 56 | Ensure the "Broadcast to all fans" button is `aria-disabled="true"` when fan count is 0 — not just visually greyed | ADM | 3 | 1 | L | 3 |
| 57 | Add `opacity: 0.4` to the "Move down" boundary button in the snap-card reorder UI on admin.html — currently uses `opacity: .2` which is below the 40% minimum threshold | ADM | 2 | 1 | L | 3 |
| 58 | Ensure landing.html's email input is `disabled` after successful submission and has `aria-disabled="true"` so screen readers announce the submitted state | LND | 3 | 1 | L | 2 |
| 59 | Add `aria-disabled="true"` to the "Next" button on start.html step 1 when the artist name field is empty | STR | 4 | 1 | L | 2 |
| 60 | Ensure start.html's colour picker "Continue" button is disabled with `disabled` + `aria-disabled="true"` when no accent colour has been selected | STR | 3 | 1 | L | 2 |
| 61 | Add `cursor: not-allowed` to all `[disabled]` inputs across start.html — native disabled inputs adopt the default disabled cursor but this is browser-inconsistent | STR | 2 | 1 | L | 3 |
| 62 | Add `aria-disabled="true"` to the "Generate bio" AI button in start.html when the artist name field is empty (no input to work with) | STR | 3 | 1 | L | 3 |
| 63 | Ensure the "Skip" button in start.html never appears disabled (it should always be actionable) — add an automated test to verify this invariant | STR | 3 | 2 | L | 3 |
| 64 | Add a CSS rule targeting `a[aria-disabled="true"]` in admin.html that applies `opacity: 0.4`, `cursor: not-allowed`, and `pointer-events: none` so disabled links are visually consistent with disabled buttons | ADM | 3 | 1 | L | 2 |
| 65 | Ensure that the platform-link delete button in admin.html is disabled with `aria-disabled="true"` when there is only one platform link remaining (to prevent an empty state) | ADM | 2 | 1 | L | 4 |
| 66 | Audit all JS-generated button strings in admin.html (e.g., show card template, fan row template) to ensure `disabled` buttons in those strings also include `aria-disabled="true"` in the HTML output | ADM | 4 | 2 | M | 2 |
| 67 | Add `opacity: 0.4` (not `0.5`) to the "past" label in show cards in admin.html for consistency with the design token system's disabled opacity standard | ADM | 2 | 1 | L | 3 |
| 68 | Add `aria-disabled="true"` to the "pending" credit label in admin.html fan/connection list (the `<span style="opacity: 0.5">pending</span>`) to clarify its non-interactive status | ADM | 2 | 1 | L | 4 |
| 69 | Ensure the "Upgrade to Artist" CTA within tier-locked overlays in admin.html is never disabled — it should always be fully interactive as the primary escape from the locked state | ADM | 4 | 1 | L | 2 |
| 70 | Add `aria-disabled="true"` to the "Edit release" button in admin.html when the release has already gone live and is in the 14-day post-release window | ADM | 3 | 1 | L | 4 |
| 71 | Ensure all disabled form inputs on admin.html have a `background-color` derived from the design token system (e.g., `var(--dash-field)` at reduced opacity) rather than browser-default grey | ADM | 3 | 2 | M | 3 |
| 72 | Add `aria-disabled="true"` to the gig-mode "Extend by 2 hours" button in admin.html when the maximum extension limit has been reached | ADM | 2 | 1 | L | 4 |
| 73 | Ensure the fan sign-up form submit button on able-v8.html is `disabled` and `aria-disabled="true"` while the email input is empty, preventing empty submissions | V8 | 4 | 1 | L | 2 |
| 74 | Add a visual treatment for disabled radio buttons in start.html's vibe selector — currently browser-default, which is visually inconsistent with ABLE's design tokens | STR | 2 | 2 | M | 4 |
| 75 | Add `aria-disabled="true"` to the snap-card "Move to top" action in admin.html when the card is already first in the list | ADM | 2 | 1 | L | 4 |
| 76 | Ensure the "Remove platform" button in admin.html is `aria-disabled="true"` when the removal would leave the artist with zero platform links | ADM | 2 | 1 | L | 4 |
| 77 | Add a global `prefers-reduced-motion` guard to the disabled state's `opacity` transition so the fade from enabled to disabled does not animate for users who prefer no motion | ALL | 2 | 1 | L | 4 |
| 78 | Ensure that all disabled controls in admin.html still have at least a 3:1 contrast ratio between the disabled text colour and the background, meeting WCAG 1.4.3 exception requirements | ADM | 3 | 2 | M | 3 |
| 79 | Add `aria-disabled="true"` to the "Copy embed code" button in admin.html when the profile is not yet published | ADM | 2 | 1 | L | 4 |
| 80 | Ensure disabled buttons across all four pages consistently use `opacity: 0.4` — audit and correct any instances of `opacity: 0.5`, `opacity: 0.55`, or `opacity: 0.45` to standardise | ALL | 3 | 2 | L | 3 |
| 81 | Add `aria-disabled="true"` to the "Schedule for later" broadcast option in admin.html when it is gated behind the Artist Pro tier | ADM | 3 | 1 | L | 3 |
| 82 | Ensure the delete-account button in admin.html settings is never shown as disabled — it should always be accessible even if behind a confirmation step | ADM | 3 | 1 | L | 3 |
| 83 | Add a `transition: opacity var(--dur-fast) var(--ease-standard)` to the `[disabled]` rule in admin.html so buttons animate smoothly into and out of the disabled state | ADM | 2 | 1 | L | 4 |
| 84 | Audit start.html for any wizard step where the "Back" button becomes disabled — ensure it never does, so users can always navigate backwards without being trapped | STR | 3 | 1 | L | 3 |
| 85 | Add `aria-disabled="true"` to the "Use this bio" AI assist accept button in admin.html when no AI draft is present | ADM | 2 | 1 | L | 4 |
| 86 | Ensure landing.html's waitlist CTA button enters a disabled state (`disabled` + `aria-disabled="true"` + `opacity: 0.4`) on successful form submission and does not reset on page refresh | LND | 3 | 2 | M | 4 |
| 87 | Add `cursor: not-allowed` to the "Add snap card" button on admin.html when the free-tier card limit is reached | ADM | 2 | 1 | L | 3 |
| 88 | Ensure the inline "Edit name" control on able-v8.html is never in a disabled state unless the artist explicitly locks their profile — a locked profile should show a tooltip explaining why | V8 | 2 | 1 | L | 5 |
| 89 | Add `aria-disabled="true"` to any tab in admin.html's navigation that is tier-locked (e.g., the Analytics tab on free tier) | ADM | 3 | 2 | M | 3 |
| 90 | Ensure that the fan list pagination "Previous" button is `aria-disabled="true"` when on the first page and "Next" is `aria-disabled="true"` on the last page | ADM | 2 | 1 | L | 4 |
| 91 | Add `pointer-events: none` alongside `aria-disabled="true"` to the recommendation `moveRec()` boundary buttons in admin.html to prevent JS click events even when the browser skips pointer events | ADM | 2 | 1 | L | 4 |
| 92 | Write a Playwright test that asserts all `[disabled]` buttons also have `aria-disabled="true"` on admin.html at page load | ADM | 3 | 3 | L | 5 |
| 93 | Write a Playwright test that asserts no disabled button has an opacity above 0.4 on admin.html | ADM | 3 | 3 | L | 5 |
| 94 | Add `aria-disabled="true"` to the referral "Copy link" button in admin.html when referrals are not yet enabled on the current tier | ADM | 2 | 1 | L | 5 |
| 95 | Ensure the "Add merch" button in admin.html is `aria-disabled="true"` when the merch limit for the current tier has been reached | ADM | 3 | 1 | L | 3 |
| 96 | Add a disabled state to the video-embed URL field on admin.html when a live release is active and editing is locked — `disabled`, `aria-disabled="true"`, with a tooltip "Unlock after the release window closes" | ADM | 2 | 1 | L | 5 |
| 97 | Ensure the "Save section order" confirm button in admin.html is `aria-disabled="true"` when no changes have been made to the order since the last save | ADM | 2 | 1 | L | 4 |
| 98 | Add `aria-disabled="true"` to the "Resend fan email" action in admin.html when the fan's email has bounced and re-sending is blocked | ADM | 3 | 1 | L | 5 |
| 99 | Add a visual disabled treatment to the `<select>` dropdowns in admin.html that uses `opacity: 0.4` rather than browser-default grey, and ensure they have `aria-disabled="true"` when disabled | ADM | 2 | 2 | M | 4 |
| 100 | Document the full disabled-state pattern (opacity, cursor, aria-disabled, pointer-events, tabindex) in docs/systems/DESIGN_SYSTEM_SPEC.md as a named component pattern so all future additions follow the same approach | ALL | 3 | 2 | L | 5 |
