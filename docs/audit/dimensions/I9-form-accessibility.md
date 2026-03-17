# Dimension I9 — Form Accessibility
**Category:** Legal, Compliance & Accessibility
**Phase:** 9

*Every form in ABLE must be fully accessible to users with visual, motor, and cognitive disabilities. WCAG 2.1 AA requires that form fields have programmatically determinable names (SC 4.1.2), that error messages are clearly associated with the fields they relate to (SC 3.3.1), that labels are visible or equivalent (SC 1.3.1), and that required fields are identified (SC 3.3.2). ABLE has forms on every page — fan capture, artist onboarding, admin profile settings, and the booking/support forms. Each must meet the full standard.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm the fan capture email field has a visible label or `sr-only` label — confirm the current label text accurately describes the field ("Email address" not "Email") | V8 | 5 | 1 | H | 1 |
| 2 | Confirm the `sr-only` (screen-reader-only) label on the fan capture form is implemented using the clip technique, not `display:none` or `visibility:hidden` | V8 | 5 | 1 | H | 1 |
| 3 | Confirm the `<label>` element is correctly associated with the email `<input>` via `for`/`id` pairing — not just proximity | V8 | 5 | 1 | H | 1 |
| 4 | Confirm the fan capture email field has `type="email"` for correct keyboard display on mobile | V8 | 5 | 1 | H | 1 |
| 5 | Confirm the fan capture email field has `autocomplete="email"` — helps browsers autofill and reduces friction for returning fans | V8 | 4 | 1 | L | 2 |
| 6 | Confirm the fan capture email field has `inputmode="email"` as a belt-and-braces hint for older iOS | V8 | 3 | 1 | L | 3 |
| 7 | Confirm the fan capture email field placeholder text is not the only label — placeholder disappears on input and fails SC 3.3.2 | V8 | 5 | 1 | H | 1 |
| 8 | Confirm the error message for an invalid email submission is programmatically associated with the email field via `aria-describedby` | V8 | 5 | 2 | H | 1 |
| 9 | Confirm the error message element uses `role="alert"` so it is announced immediately on injection | V8 | 5 | 1 | H | 1 |
| 10 | Confirm the error message is injected into the DOM before focus is moved — screen readers need the content in the DOM to announce it | V8 | 5 | 1 | H | 1 |
| 11 | Confirm the error message text is specific — "Enter a valid email address" not "Invalid input" | V8 | 4 | 1 | M | 1 |
| 12 | Confirm `aria-invalid="true"` is set on the email field when it fails validation, and removed when it is corrected | V8 | 5 | 2 | H | 1 |
| 13 | Confirm the fan capture form has no other required fields beyond email — if any are added in future, each must have `aria-required="true"` | V8 | 4 | 1 | L | 1 |
| 14 | Confirm the fan capture submit button text is descriptive of the action — not "Submit" but the actual CTA text (e.g. "Stay close") | V8 | 5 | 1 | H | 1 |
| 15 | Confirm the fan capture GDPR consent text is associated with the form — it should be inside the `<form>` element or referenced by the form via `aria-describedby` | V8 | 5 | 2 | H | 1 |
| 16 | Confirm the fan capture success state is announced — either via `aria-live` region or by moving focus to the success message | V8 | 5 | 2 | H | 1 |
| 17 | Confirm the fan capture form has an accessible name — `<form aria-label="Sign up to [Artist]'s list">` | V8 | 4 | 2 | M | 2 |
| 18 | Audit all form fields in admin.html for visible labels — every input, select, and textarea must have a `<label>` element that is visible | ADM | 5 | 2 | H | 1 |
| 19 | Confirm the artist name field in admin has a visible label "Artist name" and correct `for`/`id` association | ADM | 5 | 1 | H | 1 |
| 20 | Confirm the bio textarea in admin has a visible label "Bio" and correct association | ADM | 5 | 1 | H | 1 |
| 21 | Confirm the bio textarea has a character count indicator that is accessible — `aria-describedby` pointing to the count element | ADM | 4 | 2 | M | 2 |
| 22 | Confirm the release title field in admin has a visible label | ADM | 4 | 1 | M | 1 |
| 23 | Confirm the release date input in admin has a visible label "Release date" | ADM | 5 | 1 | H | 1 |
| 24 | Confirm the release date input uses `type="date"` — native date picker is keyboard accessible and screen reader compatible | ADM | 5 | 1 | H | 1 |
| 25 | Confirm the release date input has `aria-describedby` pointing to a hint about the date format | ADM | 3 | 2 | L | 3 |
| 26 | Confirm the Spotify URL field in admin has a visible label "Spotify URL" | ADM | 4 | 1 | M | 1 |
| 27 | Confirm the Spotify URL field has `type="url"` | ADM | 4 | 1 | M | 1 |
| 28 | Confirm the Spotify URL field has `inputmode="url"` for correct mobile keyboard | ADM | 3 | 1 | L | 3 |
| 29 | Confirm the accent colour hex input has a visible label "Accent colour" | ADM | 4 | 1 | M | 1 |
| 30 | Confirm the accent colour hex input has `aria-describedby` pointing to a hint about the hex format | ADM | 3 | 2 | L | 3 |
| 31 | Confirm the colour input has a colour preview that is accessible — a coloured swatch should have an `aria-label` describing the current colour value | ADM | 4 | 2 | M | 2 |
| 32 | Confirm the CTA label field in admin has a visible label | ADM | 4 | 1 | M | 1 |
| 33 | Confirm the CTA URL field in admin has a visible label and `type="url"` | ADM | 4 | 1 | M | 1 |
| 34 | Confirm the show venue field has a visible label "Venue" | ADM | 4 | 1 | M | 1 |
| 35 | Confirm the show date field has a visible label "Date" and uses `type="date"` | ADM | 5 | 1 | H | 1 |
| 36 | Confirm the show time field has a visible label "Doors time" and uses `type="time"` | ADM | 4 | 1 | M | 1 |
| 37 | Confirm the show ticket URL field has a visible label "Ticket link" and `type="url"` | ADM | 4 | 1 | M | 1 |
| 38 | Confirm show form fields are grouped in a `<fieldset>` with a `<legend>` — "Add a show" as the legend | ADM | 4 | 2 | M | 2 |
| 39 | Confirm the snap card form fields are grouped with a `<fieldset>` — "Add a snap card" as the legend | ADM | 4 | 2 | M | 2 |
| 40 | Confirm the CTA editing form fields are grouped with a `<fieldset>` | ADM | 4 | 2 | M | 2 |
| 41 | Confirm the support pack form fields (if applicable) are grouped with a `<fieldset>` | ADM | 4 | 2 | M | 2 |
| 42 | Confirm the booking enquiry form fields are grouped with a `<fieldset>` and `<legend>` | V8 | 4 | 2 | M | 2 |
| 43 | Confirm the booking enquiry form has accessible validation — each required field has `aria-required="true"` and errors are associated via `aria-describedby` | V8 | 5 | 2 | H | 2 |
| 44 | Audit all wizard form fields in start.html for visible or sr-only labels | STR | 5 | 2 | H | 1 |
| 45 | Confirm the artist name field in start.html has a visible label | STR | 5 | 1 | H | 1 |
| 46 | Confirm the artist name field in start.html has `autocomplete="name"` | STR | 4 | 1 | L | 2 |
| 47 | Confirm the CTA URL field in start.html has `type="url"` | STR | 4 | 1 | M | 1 |
| 48 | Confirm the release name field in start.html has a visible label | STR | 4 | 1 | M | 1 |
| 49 | Confirm the release date field in start.html has a visible label and uses `type="date"` | STR | 5 | 1 | H | 1 |
| 50 | Confirm error messages on wizard steps are shown adjacent to the relevant field and associated via `aria-describedby` | STR | 5 | 2 | H | 1 |
| 51 | Confirm validation errors in start.html use `role="alert"` | STR | 5 | 1 | H | 1 |
| 52 | Confirm the wizard "Next" button is disabled (visually and via `aria-disabled`) when required fields are empty | STR | 4 | 2 | M | 2 |
| 53 | Confirm the wizard step transition announces the new step to screen readers — the step title should receive focus or be in an `aria-live` region | STR | 5 | 2 | H | 1 |
| 54 | Confirm the wizard completion state announces correctly — "Your ABLE page is ready" should be announced | STR | 4 | 2 | M | 2 |
| 55 | Confirm all admin save/update buttons have descriptive labels — "Save profile" not just "Save" | ADM | 4 | 1 | L | 2 |
| 56 | Confirm all admin delete buttons have destructive intent communicated — "Delete snap card" not just "Delete" | ADM | 4 | 1 | M | 2 |
| 57 | Confirm the admin form section headers ("About you", "Your release", "Your shows") are actual `<h2>` or `<h3>` elements, not styled `<div>` elements | ADM | 4 | 1 | M | 1 |
| 58 | Confirm admin form field labels are positioned above the field (not as floating labels that overlap the input) — floating labels have poor screen reader support | ADM | 4 | 1 | L | 1 |
| 59 | Confirm the character counter on the bio textarea in admin is associated via `aria-describedby` and updates as the user types | ADM | 4 | 2 | M | 2 |
| 60 | Confirm the character counter is announced politely — not assertive — to avoid interrupting the user while typing | ADM | 3 | 2 | L | 3 |
| 61 | Confirm the platform URL inputs in admin (Spotify, Apple Music, Instagram etc.) each have individual visible labels | ADM | 4 | 1 | M | 1 |
| 62 | Confirm platform URL inputs have the correct `type="url"` | ADM | 4 | 1 | M | 1 |
| 63 | Confirm platform URL inputs have `autocomplete="url"` hint | ADM | 3 | 1 | L | 3 |
| 64 | Confirm the admin email field (if present for account settings) has `type="email"` and `autocomplete="email"` | ADM | 4 | 1 | M | 2 |
| 65 | Confirm the admin password field (if present) has `type="password"` and `autocomplete="current-password"` | ADM | 4 | 1 | M | 2 |
| 66 | Confirm the sign-up/login form in start.html (when Supabase auth is added) has all accessibility attributes — email `type="email"`, magic link instructions readable by screen readers | STR | 5 | 3 | H | 3 |
| 67 | Confirm the search field in admin fan list (if present) has a visible label or `aria-label="Search fans"` | ADM | 4 | 1 | M | 2 |
| 68 | Confirm the filter controls in admin fan list (if present) have correct `<label>` associations | ADM | 4 | 2 | M | 2 |
| 69 | Confirm all `<select>` elements have associated `<label>` elements | ALL | 5 | 1 | H | 1 |
| 70 | Confirm all `<textarea>` elements have associated `<label>` elements | ALL | 5 | 1 | H | 1 |
| 71 | Confirm all `<input type="checkbox">` elements have associated labels | ALL | 5 | 1 | H | 1 |
| 72 | Confirm all `<input type="radio">` elements are in a `<fieldset>` with `<legend>` describing the group | ALL | 5 | 2 | H | 1 |
| 73 | Confirm no form field uses `title` attribute as its only label — `title` is not reliably announced by all screen readers | ALL | 5 | 1 | H | 1 |
| 74 | Confirm no form field uses `placeholder` as its only label — placeholder disappears when content is entered | ALL | 5 | 1 | H | 1 |
| 75 | Confirm the vibe/genre selector in start.html uses `<fieldset>` with `<legend>Vibe</legend>` and each option is a labelled radio input or uses the ARIA radio group pattern | STR | 5 | 3 | H | 2 |
| 76 | Confirm the theme selector in admin uses the same radio group pattern | ADM | 4 | 2 | M | 2 |
| 77 | Confirm all form validation runs before submission and provides summary of errors — for complex forms (admin profile), a summary at the top of the form is helpful | ADM | 4 | 4 | M | 3 |
| 78 | Confirm focus is moved to the first error field (or error summary) after a failed form submission | ALL | 5 | 2 | H | 2 |
| 79 | Confirm required fields are visually identified — asterisk (*) with a legend "* required" near the top of the form | ALL | 4 | 1 | L | 2 |
| 80 | Confirm the visual asterisk for required fields is `aria-hidden="true"` on the asterisk character itself — the field's `aria-required="true"` is the accessible signal | ALL | 4 | 2 | M | 2 |
| 81 | Confirm error states persist after the user corrects one field and attempts resubmission — do not clear all errors on any keystroke | ALL | 4 | 2 | M | 2 |
| 82 | Confirm the form does not auto-advance past a field without explicit user action (e.g. date field should not jump to next field when all digits are entered) | ALL | 4 | 1 | M | 2 |
| 83 | Confirm autofill/autocomplete works correctly on all forms — `autocomplete` attributes enable browsers to prefill data which reduces cognitive load | ALL | 4 | 2 | L | 2 |
| 84 | Confirm no form fields have `autocomplete="off"` unless there is a documented security reason — disabling autocomplete increases cognitive friction | ALL | 4 | 1 | M | 2 |
| 85 | Confirm the success state after admin profile save is announced — either via toast/snackbar with `role="status"` or focus movement to a success heading | ADM | 5 | 2 | H | 2 |
| 86 | Test the fan capture form with VoiceOver on iOS — swipe to the email field, hear the label, type, swipe to submit, hear the button label, activate, hear the success message | V8 | 5 | 4 | M | 3 |
| 87 | Test the admin profile form with VoiceOver on macOS — navigate all fields, trigger a validation error, confirm error announcement | ADM | 5 | 4 | M | 3 |
| 88 | Test start.html wizard with VoiceOver — complete all wizard steps using VoiceOver | STR | 4 | 4 | M | 3 |
| 89 | Run axe-core form audit on each page — resolve all `serious` and `critical` form accessibility violations | ALL | 5 | 3 | H | 2 |
| 90 | Confirm the form on any modal (e.g. "Add show" modal) has the same accessibility standards as standalone forms | ADM | 4 | 2 | M | 2 |
| 91 | Confirm the form inside the bottom sheet has the same accessibility standards | ALL | 4 | 2 | M | 2 |
| 92 | Confirm that `<button type="submit">` is used for form submission — not `<button>` without type (defaults to submit but is implicit) or `<a>` tags | ALL | 4 | 1 | M | 1 |
| 93 | Confirm that `<button type="button">` is used for non-submit buttons within forms — prevents accidental form submission | ALL | 5 | 1 | H | 1 |
| 94 | Confirm the booking enquiry form fields: name, email, message, availability — each with visible labels and `aria-required="true"` on required fields | V8 | 5 | 2 | H | 2 |
| 95 | Confirm the support pack form (fan-to-artist payment): amount selector and message field both have accessible labels | V8 | 4 | 2 | M | 2 |
| 96 | Confirm no form fields have a visible label that does not match the field's accessible name — the visible label and `aria-label`/`aria-labelledby` must be consistent | ALL | 5 | 2 | H | 1 |
| 97 | Confirm the fan sign-up form meets the "minimal friction" requirement — single field, visible label (sr-only acceptable), clear CTA, submit on Enter, no unnecessary fields | V8 | 5 | 1 | H | 1 |
| 98 | Confirm that when a form is submitted with an incomplete required field, the focus moves to that field — not stays on the submit button | ALL | 5 | 2 | H | 2 |
| 99 | Confirm the "forgot what I typed" scenario is handled — if a user leaves the form and returns, partially-entered data should be recoverable (browser autofill / form restoration) | ALL | 3 | 2 | L | 3 |
| 100 | Final check: complete every form on every page using keyboard only with VoiceOver enabled — fan capture on v8, all wizard steps on start.html, admin profile, add show, add snap card; every field is discoverable, every error is announced, every success is confirmed | ALL | 5 | 4 | H | 4 |

## Wave Summary
**Wave 1 — WCAG blockers (labels, errors, required states)**: items #1–#4, #7–#16, #18–#20, #22–#24, #26, #29, #32–#37, #44–#45, #49–#51, #53, #57, #69–#74, #92–#93, #96–#98
**Wave 2 — Complete semantic structure**: items #5–#6, #17, #21, #25, #27–#28, #30–#31, #38–#43, #46–#48, #52, #54–#56, #58–#65, #67–#68, #75–#76, #78–#85, #90–#91, #95
**Wave 3 — Testing and validation**: items #66, #77, #86–#89, #94, #99
**Wave 4 — Final verification**: item #100
