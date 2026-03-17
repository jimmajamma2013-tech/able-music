# Dimension I8 — ARIA Correctness
**Category:** Legal, Compliance & Accessibility
**Phase:** 9 (Legal)
**Status:** Not started

ARIA (Accessible Rich Internet Applications) attributes extend native HTML semantics to make dynamic, JavaScript-driven interfaces understandable to assistive technology. Incorrect ARIA usage is worse than no ARIA at all — a misused `role` or a missing `aria-expanded` can actively mislead screen reader users and cause navigation failures. ABLE's current implementation has several known gaps: snap card accordions use `aria-expanded` but are missing `aria-controls`; status badges lack `role="status"` or `role="alert"`; icon-only buttons lack `aria-label`; and some ARIA roles are applied to non-interactive elements. Full correctness means every ARIA attribute follows the WAI-ARIA 1.2 specification, every role is matched with the required owned elements and properties, and no ARIA attribute creates a contradiction with the element's native HTML semantics.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add `aria-controls="[panel-id]"` to every accordion toggle button in `able-v7.html` to complete the accordion pattern | V8 | 5 | 1 | L | 1 |
| 2 | Add matching `id` attributes to every accordion panel in `able-v7.html` so `aria-controls` references resolve correctly | V8 | 5 | 1 | L | 1 |
| 3 | Add `role="status"` to the campaign state badge ("On tonight", "Pre-save now") in `able-v7.html` | V8 | 4 | 1 | L | 1 |
| 4 | Add `role="alert"` to all error messages in the fan sign-up form in `able-v7.html` | V8 | 5 | 1 | L | 1 |
| 5 | Add `role="alert"` to all error messages in the onboarding wizard in `start.html` | STR | 5 | 1 | L | 1 |
| 6 | Add `role="alert"` to all error messages in `admin.html` (save failures, network errors) | ADM | 5 | 1 | L | 1 |
| 7 | Confirm that `aria-expanded` is toggled between `true` and `false` (not removed) when accordions open and close in `able-v7.html` | V8 | 5 | 1 | L | 1 |
| 8 | Add `aria-expanded="false"` as the initial state (not omitted) on all collapsed accordions in `able-v7.html` | V8 | 4 | 1 | L | 1 |
| 9 | Add `aria-selected="true/false"` to tab items in any tab interface in `admin.html` | ADM | 4 | 1 | L | 1 |
| 10 | Add `role="tablist"` to the container of any tab interface in `admin.html` | ADM | 4 | 1 | L | 1 |
| 11 | Add `role="tab"` to individual tab buttons in `admin.html` | ADM | 4 | 1 | L | 1 |
| 12 | Add `role="tabpanel"` to each tab content panel in `admin.html` | ADM | 4 | 1 | L | 1 |
| 13 | Link each `role="tab"` to its `role="tabpanel"` via `aria-controls` in `admin.html` | ADM | 4 | 1 | L | 1 |
| 14 | Add `aria-labelledby` on each `role="tabpanel"` pointing to its associated tab button | ADM | 3 | 1 | L | 2 |
| 15 | Confirm no `role="button"` is applied to native `<button>` elements — this is a redundant role that may confuse some AT | ALL | 3 | 1 | L | 2 |
| 16 | Confirm no `role="link"` is applied to native `<a>` elements — redundant and potentially confusing | ALL | 3 | 1 | L | 2 |
| 17 | Confirm no ARIA role is applied to a `<div>` that is purely decorative with no interactive children | ALL | 4 | 2 | L | 2 |
| 18 | Confirm `role="switch"` is used (not `role="checkbox"`) for the gig mode toggle in `admin.html` | ADM | 4 | 1 | L | 1 |
| 19 | Confirm `aria-checked="true/false"` is set correctly and toggled on every `role="switch"` element in `admin.html` | ADM | 4 | 1 | L | 1 |
| 20 | Confirm `role="dialog"` is applied to every bottom sheet and modal in `able-v7.html` | V8 | 4 | 1 | L | 1 |
| 21 | Confirm `aria-modal="true"` is set on every `role="dialog"` element to prevent AT browsing outside the dialog | V8 | 4 | 1 | L | 2 |
| 22 | Confirm `aria-labelledby` references a visible title on every `role="dialog"` in `able-v7.html` | V8 | 4 | 1 | L | 2 |
| 23 | Confirm `aria-labelledby` references a visible title on every `role="dialog"` in `admin.html` | ADM | 4 | 1 | L | 2 |
| 24 | Confirm `aria-describedby` is set on dialogs that have a body description (e.g. the fan sign-up sheet description text) | V8 | 3 | 1 | L | 3 |
| 25 | Confirm that `aria-hidden="true"` is applied to the page background when a dialog is open, not to the dialog itself | V8 | 4 | 2 | M | 2 |
| 26 | Remove any `aria-hidden="true"` applied to interactive elements (buttons, links, inputs) — this is invalid and hides them from AT | ALL | 5 | 2 | M | 1 |
| 27 | Confirm `aria-disabled="true"` is used instead of just `disabled` attribute on custom interactive components in `admin.html` | ADM | 3 | 1 | L | 2 |
| 28 | Confirm `aria-disabled` elements are still focusable (unlike `disabled` elements) so keyboard users know they exist but cannot activate | ADM | 3 | 1 | L | 3 |
| 29 | Add `aria-required="true"` to the email input in the fan capture form in `able-v7.html` | V8 | 4 | 1 | L | 1 |
| 30 | Add `aria-required="true"` to all required fields in the onboarding wizard in `start.html` | STR | 4 | 1 | L | 1 |
| 31 | Add `aria-invalid="true"` to any input in `able-v7.html` that has a validation error, and remove it when the error is cleared | V8 | 5 | 2 | M | 1 |
| 32 | Add `aria-invalid="true"` to any input in `start.html` that has a validation error | STR | 4 | 2 | M | 1 |
| 33 | Add `aria-invalid="true"` to any input in `admin.html` that has a validation error | ADM | 4 | 2 | M | 1 |
| 34 | Confirm `aria-describedby` on each input points to the correct error message element ID and updates when different errors appear | V8 | 4 | 2 | M | 2 |
| 35 | Add `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` to the onboarding wizard progress bar in `start.html` | STR | 3 | 1 | L | 2 |
| 36 | Add `aria-valuetext` to the progress bar in `start.html` for a human-readable description (e.g. "Step 2 of 5") | STR | 3 | 1 | L | 2 |
| 37 | Confirm `aria-live` regions are not nested inside each other in any page — nested live regions have inconsistent AT behaviour | ALL | 4 | 2 | M | 2 |
| 38 | Confirm `aria-live="assertive"` is reserved for critical errors only — not used for non-urgent status updates | ALL | 3 | 1 | L | 2 |
| 39 | Confirm `aria-atomic="true"` is set on live regions where the entire message should be re-read (not just the changed portion) | ALL | 3 | 1 | L | 3 |
| 40 | Confirm that `role="listbox"` is used correctly on any custom dropdown in `admin.html` with `role="option"` on each item | ADM | 4 | 2 | M | 2 |
| 41 | Add `aria-selected="true/false"` to each `role="option"` in any custom dropdown in `admin.html` | ADM | 4 | 2 | M | 2 |
| 42 | Confirm the currently focused option in a custom listbox uses `aria-activedescendant` on the parent listbox | ADM | 3 | 2 | M | 3 |
| 43 | Confirm `role="menu"` is not used for navigation links in `landing.html` — `role="menu"` is for application menus (File/Edit/View), not site nav | LND | 4 | 1 | M | 2 |
| 44 | Confirm `role="menuitem"` is not used for navigation links — use `<nav>` with `<a>` elements instead | LND | 4 | 1 | M | 2 |
| 45 | Add `role="region"` with `aria-label` to named content sections in `able-v7.html` that are not covered by standard landmarks | V8 | 3 | 2 | L | 3 |
| 46 | Confirm that the fan count stat in `admin.html` does not use `role="heading"` on a visual number — use a `<p>` with `aria-label` | ADM | 3 | 1 | L | 2 |
| 47 | Confirm `role="img"` is used on CSS background images that convey meaning, with an `aria-label` | ALL | 3 | 2 | M | 3 |
| 48 | Confirm `role="presentation"` is not applied to any element that has focusable children — this hides children from AT | ALL | 4 | 2 | M | 2 |
| 49 | Confirm `role="none"` is not applied to elements with focusable children for the same reason | ALL | 4 | 1 | M | 2 |
| 50 | Add `aria-current="page"` to the active bottom nav tab in `able-v7.html` | V8 | 4 | 1 | L | 2 |
| 51 | Add `aria-current="page"` to the active bottom nav tab in `admin.html` | ADM | 4 | 1 | L | 2 |
| 52 | Remove `aria-current` from all non-active tabs in the bottom nav when a different tab becomes active | V8 | 3 | 1 | L | 2 |
| 53 | Confirm `aria-pressed="true/false"` is used on toggle buttons (not `aria-checked`, which is for checkboxes) | ALL | 3 | 1 | L | 2 |
| 54 | Confirm `aria-haspopup="true"` is set on buttons that open a dropdown, menu, or dialog in `admin.html` | ADM | 3 | 1 | L | 3 |
| 55 | Confirm `aria-haspopup` value matches the popup type: `"dialog"`, `"listbox"`, `"menu"`, etc. rather than always using `"true"` | ADM | 3 | 1 | L | 3 |
| 56 | Confirm that the snap card component does not use `role="region"` with the same label for multiple cards — labels must be unique | V8 | 3 | 1 | L | 3 |
| 57 | Audit all `id` attribute values across `able-v7.html` for uniqueness — duplicate IDs break `aria-labelledby` and `aria-describedby` | V8 | 5 | 2 | M | 1 |
| 58 | Audit all `id` attribute values across `admin.html` for uniqueness | ADM | 5 | 2 | M | 1 |
| 59 | Audit all `id` attribute values across `start.html` for uniqueness | STR | 4 | 2 | M | 1 |
| 60 | Audit all `id` attribute values across `landing.html` for uniqueness | LND | 3 | 2 | M | 1 |
| 61 | Confirm `aria-label` text on icon buttons does not start with the element's role (e.g. "button close" — VoiceOver appends "button" automatically) | ALL | 3 | 1 | L | 2 |
| 62 | Confirm `aria-label` text on links does not start with "link" for the same reason | ALL | 3 | 1 | L | 2 |
| 63 | Confirm no ARIA attribute uses an ID reference (`aria-labelledby`, `aria-describedby`, `aria-controls`) pointing to an element that doesn't exist in the DOM | ALL | 5 | 2 | M | 1 |
| 64 | Add `aria-hidden="true"` to the loading spinner icon in any async operation, as the `aria-live` region handles the announcement | ALL | 2 | 1 | L | 3 |
| 65 | Confirm the gig mode countdown element is not a `<time>` element with a live region — `<time>` does not broadcast to AT automatically | V8 | 3 | 1 | L | 2 |
| 66 | Confirm `aria-label` values are not duplicated across multiple distinct interactive elements on the same page | ALL | 4 | 2 | M | 2 |
| 67 | Confirm `aria-expanded` is not placed on the panel element (which is shown/hidden) but only on the trigger button | V8 | 4 | 1 | L | 2 |
| 68 | Add `aria-roledescription` to custom carousel components (if added) to give AT users a clearer description of the component type | V8 | 2 | 1 | L | 5 |
| 69 | Confirm `role="group"` with `aria-labelledby` is used for related form fields that lack a `<fieldset>` in `start.html` | STR | 3 | 2 | M | 3 |
| 70 | Confirm `role="group"` with `aria-labelledby` is used for the CTA builder section in `admin.html` | ADM | 3 | 2 | M | 3 |
| 71 | Confirm that `role="separator"` is used only for visual dividers that are meaningful to the page structure, not for decoration | ALL | 2 | 1 | L | 4 |
| 72 | Confirm `aria-orientation` is set on any slider component in `admin.html` (`horizontal` or `vertical`) | ADM | 2 | 1 | L | 4 |
| 73 | Add `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` to any range slider in `admin.html` | ADM | 3 | 1 | L | 3 |
| 74 | Confirm that `role="tooltip"` is used correctly on tooltip elements with an `aria-describedby` association on the trigger | ALL | 3 | 1 | L | 3 |
| 75 | Confirm tooltip elements with `role="tooltip"` are not focusable themselves — only their trigger should receive focus | ALL | 3 | 1 | L | 3 |
| 76 | Confirm `aria-live` regions are present in the DOM from page load (not dynamically injected) so AT registers them | ALL | 4 | 2 | M | 2 |
| 77 | Confirm `aria-live` regions are initially empty and content is injected dynamically — injecting pre-filled content with `aria-live` does not trigger announcement | ALL | 4 | 2 | M | 2 |
| 78 | Confirm no `aria-hidden="true"` is placed on a `<body>` element or a top-level container while focus is inside it | ALL | 5 | 1 | H | 1 |
| 79 | Run the W3C Nu HTML Checker on every page to catch ARIA attribute errors flagged at the markup level | ALL | 4 | 2 | L | 2 |
| 80 | Run the axe DevTools browser extension on every page and resolve all "critical" ARIA violations | ALL | 5 | 2 | L | 2 |
| 81 | Run the axe DevTools browser extension on every page and resolve all "serious" ARIA violations | ALL | 4 | 2 | L | 2 |
| 82 | Document the ARIA pattern used for each complex widget (accordion, dialog, tabs, switch) in code comments | ALL | 3 | 2 | L | 3 |
| 83 | Add a link to the relevant WAI-ARIA Authoring Practices pattern in code comments for each complex component | ALL | 2 | 1 | L | 4 |
| 84 | Confirm `aria-label` on the ABLE logo mark in each page is consistent (always "ABLE Music") | ALL | 2 | 1 | L | 3 |
| 85 | Confirm the theme selector (Dark/Light/Glass/Contrast) in `able-v7.html` uses `role="radiogroup"` with `role="radio"` items | V8 | 3 | 2 | M | 3 |
| 86 | Confirm the active theme radio option uses `aria-checked="true"` | V8 | 3 | 1 | L | 3 |
| 87 | Confirm `aria-label` on the fan email input placeholder-only design reads "Your email address" or similar, not the placeholder text itself | V8 | 5 | 1 | L | 1 |
| 88 | Add `aria-live="polite"` to the "Saving…" / "Saved" state indicator in `admin.html` | ADM | 3 | 1 | L | 2 |
| 89 | Confirm the `role="banner"` landmark (applied to `<header>`) is used at most once per page | ALL | 3 | 1 | L | 2 |
| 90 | Confirm the `role="contentinfo"` landmark (applied to `<footer>`) is used at most once per page | ALL | 3 | 1 | L | 2 |
| 91 | Confirm `role="complementary"` (`<aside>`) is only used for content that is tangentially related to the main content | ALL | 2 | 1 | L | 4 |
| 92 | Confirm `role="search"` is applied to any search input container in `admin.html` | ADM | 3 | 1 | L | 3 |
| 93 | Confirm `aria-label` on the search landmark describes what is being searched (e.g. "Search your fan list") | ADM | 3 | 1 | L | 3 |
| 94 | Add `aria-sort` to sortable column headers in the fan list table in `admin.html` if table sorting is implemented | ADM | 3 | 2 | M | 4 |
| 95 | Confirm the notification badge on a tab (e.g. "3 new fans") is included in the tab's `aria-label` (e.g. "Fans, 3 new") | ADM | 3 | 1 | L | 3 |
| 96 | Confirm `aria-busy="true"` is correctly removed once async data has loaded in `admin.html` | ADM | 3 | 2 | M | 3 |
| 97 | Confirm all ARIA attribute values are lowercase strings where strings are required (e.g. `aria-expanded="true"` not `aria-expanded="True"`) | ALL | 3 | 1 | L | 2 |
| 98 | Confirm all boolean ARIA attributes use string `"true"` / `"false"` not JavaScript boolean `true` / `false` in HTML attributes | ALL | 4 | 1 | L | 2 |
| 99 | Run a manual ARIA audit using browser developer tools accessibility tree inspection on each page | ALL | 5 | 3 | L | 2 |
| 100 | Create an ARIA pattern library document listing every ARIA pattern used in the codebase with correct implementation examples for future contributors | ALL | 3 | 3 | L | 4 |
