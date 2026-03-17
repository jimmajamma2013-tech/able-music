# Dimension I6 — Keyboard Navigation
**Category:** Legal, Compliance & Accessibility
**Phase:** 9

*WCAG 2.1 AA (Success Criterion 2.1.1) requires that all functionality is operable via keyboard. In the UK, the Public Sector Bodies Accessibility Regulations 2018 makes WCAG 2.1 AA a legal requirement for public-facing digital services, and the Equality Act 2010 creates reasonable adjustment duties for commercial digital products. Full keyboard accessibility is non-negotiable before the first real user. This dimension covers tab order, focus management, keyboard interaction patterns, and focus trap behaviour across all four active pages.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add a "Skip to main content" link as the first focusable element on every page — allows keyboard users to bypass navigation and jump to primary content | ALL | 5 | 2 | L | 1 |
| 2 | Confirm the "Skip to main content" link is visible on focus — it may be visually hidden but must appear when focused (not `display:none` or `visibility:hidden`) | ALL | 5 | 1 | H | 1 |
| 3 | Confirm the "Skip to main content" link target (`#main` or `#content`) exists and is focusable | ALL | 5 | 1 | H | 1 |
| 4 | Audit the tab order on landing.html — verify it follows the visual reading order top-to-bottom, navigation first, then main content, then footer | LND | 4 | 2 | L | 1 |
| 5 | Audit the tab order on start.html — verify the wizard step fields receive focus in the correct order; step 1 fields, then the Next button, not skipping to unrelated elements | STR | 4 | 2 | L | 1 |
| 6 | Audit the tab order on able-v8.html — verify Hero CTAs are reachable before Quick Action pills, which are reachable before section-level actions | V8 | 4 | 2 | L | 1 |
| 7 | Audit the tab order on admin.html — verify the sidebar nav links are reachable in order, then the main content area | ADM | 4 | 2 | L | 1 |
| 8 | Confirm no element has `tabindex` set to a value greater than 0 — positive tabindex values break natural tab order and are a WCAG failure | ALL | 5 | 2 | H | 1 |
| 9 | Confirm all interactive elements (buttons, links, inputs, checkboxes) are natively focusable — no `<div>` or `<span>` with click handlers that are not also keyboard-accessible | ALL | 5 | 2 | H | 1 |
| 10 | Confirm the landing page navigation bar links are keyboard accessible and visually focused when tabbed to | LND | 4 | 1 | L | 1 |
| 11 | Confirm the landing page FAQ accordion keyboard operation — each accordion trigger is a `<button>`, focusable, activatable with Enter and Space, and the panel opens | LND | 4 | 2 | L | 1 |
| 12 | Confirm the FAQ accordion closes on Escape key when the panel is open and focus is inside the panel | LND | 3 | 2 | L | 2 |
| 13 | Confirm the landing CTA buttons are reachable by keyboard and show a visible focus ring | LND | 5 | 1 | H | 1 |
| 14 | Confirm the pricing tier toggle (if present on landing) is keyboard accessible | LND | 4 | 2 | L | 1 |
| 15 | Confirm the wizard step navigation on start.html uses keyboard-accessible buttons — "Next" and "Back" buttons are `<button>` elements, not `<div>` click handlers | STR | 5 | 1 | H | 1 |
| 16 | Confirm the vibe/genre selector in start.html is keyboard accessible — each vibe option should be selectable with Enter or Space | STR | 4 | 2 | M | 1 |
| 17 | Confirm the colour picker in start.html (artist accent colour) is keyboard accessible — tab to the colour input, type a hex value, confirm with Enter | STR | 4 | 2 | M | 2 |
| 18 | Confirm the CTA type selector in start.html is keyboard accessible | STR | 4 | 2 | M | 2 |
| 19 | Confirm the platform links section in start.html is keyboard accessible — adding and removing platform URLs using keyboard only | STR | 4 | 3 | M | 2 |
| 20 | Confirm start.html progress indicator does not intercept keyboard focus — it should be decorative, not an interactive element | STR | 3 | 1 | L | 2 |
| 21 | Confirm the admin sidebar navigation is keyboard accessible — all sidebar links are reachable by Tab and activated by Enter | ADM | 4 | 2 | L | 1 |
| 22 | Confirm the admin top bar buttons are keyboard accessible — profile avatar, help, and settings buttons | ADM | 4 | 1 | L | 1 |
| 23 | Confirm the Campaign HQ panel is keyboard accessible — all four campaign state buttons can be focused and activated by keyboard | ADM | 5 | 2 | M | 1 |
| 24 | Confirm the gig mode toggle in admin is keyboard accessible — the toggle can be focused with Tab and activated with Enter or Space | ADM | 5 | 2 | M | 1 |
| 25 | Confirm the theme picker in admin is keyboard accessible — each theme option can be selected by keyboard | ADM | 4 | 2 | L | 2 |
| 26 | Confirm admin form fields (artist name, bio, social links) are all keyboard accessible with correct tab order | ADM | 4 | 1 | L | 1 |
| 27 | Confirm the fan list in admin is keyboard accessible — can navigate through fans, star/unstar, and trigger export using keyboard | ADM | 4 | 3 | M | 2 |
| 28 | Confirm snap cards in admin can be created, reordered, and deleted using keyboard only | ADM | 4 | 4 | M | 2 |
| 29 | Confirm drag-and-drop reordering of snap cards has a keyboard alternative — e.g. "Move up" and "Move down" buttons that are keyboard accessible | ADM | 4 | 3 | M | 2 |
| 30 | Confirm the platform pills on able-v8.html are keyboard accessible — each pill is a link (`<a>`) with a visible focus ring | V8 | 4 | 1 | L | 1 |
| 31 | Confirm the Hero CTA buttons on able-v8.html are keyboard accessible — primary and secondary CTAs | V8 | 5 | 1 | H | 1 |
| 32 | Confirm the fan capture form on able-v8.html is fully keyboard accessible — tab to email field, type, tab to submit button, press Enter | V8 | 5 | 1 | H | 1 |
| 33 | Confirm the snap card accordion on able-v8.html is keyboard accessible — trigger is a `<button>`, panel opens on Enter/Space | V8 | 4 | 2 | L | 2 |
| 34 | Confirm the show/events section on able-v8.html is keyboard accessible — ticket links and show info are reachable | V8 | 4 | 1 | L | 1 |
| 35 | Confirm the merch section on able-v8.html is keyboard accessible — all purchase links are reachable | V8 | 4 | 1 | L | 1 |
| 36 | Confirm all modal dialogs have correct keyboard focus trap — when a modal opens, focus moves to the modal; Tab cycles only within the modal; Escape closes the modal | ALL | 5 | 3 | H | 1 |
| 37 | Confirm focus returns to the trigger element when a modal is closed — the user does not lose their place in the tab order | ALL | 5 | 2 | H | 1 |
| 38 | Confirm bottom sheets have the same keyboard trap behaviour as modals — Tab cycles within the sheet, Escape closes it | ALL | 5 | 3 | H | 1 |
| 39 | Confirm bottom sheet focus returns to the trigger when closed | ALL | 5 | 2 | H | 1 |
| 40 | Confirm the admin tab bar (if present on mobile) is keyboard accessible — can navigate between tabs using keyboard | ADM | 4 | 2 | L | 2 |
| 41 | Confirm the admin tab panels only contain focusable elements from the active panel — inactive panel content should have `display:none` or `visibility:hidden` to remove from tab order | ADM | 5 | 2 | H | 2 |
| 42 | Confirm the snackbar/toast notification is keyboard dismissible — pressing Escape or reaching the dismiss button via Tab should close the toast | ALL | 4 | 2 | L | 2 |
| 43 | Confirm the toast does not trap keyboard focus — it appears, can be dismissed, but Tab should not be required to close it; it should auto-dismiss | ALL | 4 | 2 | M | 2 |
| 44 | Confirm tooltips are keyboard triggerable — hoverable tooltips must also appear on keyboard focus of the trigger element | ALL | 4 | 2 | M | 2 |
| 45 | Confirm tooltips dismiss on Escape key | ALL | 4 | 2 | M | 2 |
| 46 | Confirm the admin sidebar collapse/expand toggle (if present) is keyboard accessible | ADM | 3 | 1 | L | 2 |
| 47 | Confirm the "Add new CTA" workflow in admin is keyboard accessible end-to-end — open the form, fill in fields, submit, close | ADM | 4 | 3 | M | 2 |
| 48 | Confirm the "Add show" workflow in admin is keyboard accessible end-to-end | ADM | 4 | 3 | M | 2 |
| 49 | Confirm the "Add snap card" workflow in admin is keyboard accessible end-to-end | ADM | 4 | 3 | M | 2 |
| 50 | Confirm the profile artist name hero on able-v8.html does not receive keyboard focus — it is display text, not interactive | V8 | 3 | 1 | L | 2 |
| 51 | Confirm the artist artwork/video hero area does not have stray focusable elements that interrupt the tab flow | V8 | 4 | 1 | L | 2 |
| 52 | Confirm the play button on any embedded audio preview is keyboard accessible | V8 | 4 | 2 | M | 2 |
| 53 | Confirm the `<iframe>` embed elements are not themselves keyboard-focusable when using `tabindex="-1"` is appropriate — or confirm that keyboard-focusing the iframe is intentional and useful | V8 | 4 | 2 | M | 2 |
| 54 | Test keyboard navigation on landing.html in Chrome — Tab through all interactive elements and document any that are skipped or out of order | LND | 5 | 3 | L | 2 |
| 55 | Test keyboard navigation on start.html in Chrome — Tab through the full wizard flow | STR | 5 | 3 | L | 2 |
| 56 | Test keyboard navigation on able-v8.html in Chrome — Tab through all interactive elements including fan capture form | V8 | 5 | 3 | L | 2 |
| 57 | Test keyboard navigation on admin.html in Chrome — Tab through all sections and all modals | ADM | 5 | 3 | L | 2 |
| 58 | Test keyboard navigation in Firefox — confirm tab order and focus ring visibility match Chrome | ALL | 4 | 3 | L | 3 |
| 59 | Test keyboard navigation in Safari macOS — confirm that Tab navigation works (requires "Use keyboard navigation to move focus between controls" enabled in System Preferences) | ALL | 4 | 3 | L | 3 |
| 60 | Confirm focus ring is visible against the dark theme background — three-layer focus ring must be distinguishable from `--color-card` and `--color-bg` | ALL | 5 | 2 | H | 1 |
| 61 | Confirm focus ring is visible against the light theme background — cream surface with dark focus ring | ALL | 5 | 2 | H | 1 |
| 62 | Confirm focus ring is visible against the glass theme — backdrop-blur surfaces require additional contrast for the focus ring | ALL | 5 | 3 | H | 2 |
| 63 | Confirm focus ring is visible against the contrast theme (pure black) — the three-layer ring design should handle this | ALL | 5 | 2 | H | 1 |
| 64 | Confirm focus ring is visible when the artist accent colour is the element's background — the ring must be visible against any accent colour | ALL | 5 | 2 | H | 2 |
| 65 | Confirm `outline: none` is never used without an explicit replacement focus style — grep for instances | ALL | 5 | 1 | H | 1 |
| 66 | Confirm `outline: 0` is never used without a replacement — same as `outline: none` | ALL | 5 | 1 | H | 1 |
| 67 | Confirm `user-select: none` on decorative elements does not also prevent keyboard selection of text in adjacent focusable elements | ALL | 3 | 1 | L | 2 |
| 68 | Confirm no `pointer-events: none` is applied to elements that also need to receive keyboard focus | ALL | 4 | 2 | M | 2 |
| 69 | Confirm the `.visually-hidden` or `sr-only` class used for accessibility text does not use `display: none` (which removes from accessibility tree) but uses the clip/position technique | ALL | 5 | 1 | H | 1 |
| 70 | Confirm keyboard activation of links opens the correct target — keyboard Enter on a `<a href="...">` should behave identically to a mouse click | ALL | 4 | 1 | L | 1 |
| 71 | Confirm keyboard activation of buttons triggers the correct action — keyboard Enter/Space on a `<button>` should behave identically to a mouse click | ALL | 4 | 1 | L | 1 |
| 72 | Confirm the admin filter/search inputs (if any) are keyboard accessible and do not trap focus | ADM | 4 | 2 | L | 2 |
| 73 | Confirm the date picker inputs for show dates and release dates are keyboard navigable — native `type="date"` inputs are keyboard accessible; custom date pickers need specific ARIA pattern | ADM | 4 | 2 | M | 2 |
| 74 | Confirm the colour hex input in the admin profile settings is keyboard accessible | ADM | 4 | 1 | L | 1 |
| 75 | Confirm the admin tier upgrade CTA (gold lock overlay) includes a keyboard-accessible button | ADM | 4 | 2 | L | 2 |
| 76 | Confirm the gold lock overlay backdrop does not block keyboard access to the underlying content in a way that creates a confusing experience | ADM | 4 | 2 | M | 2 |
| 77 | Confirm the fan sign-up success state receives appropriate focus — after successful submission, focus should move to the success message so keyboard users know it worked | V8 | 5 | 2 | H | 2 |
| 78 | Confirm the fan sign-up error state receives focus — after validation failure, focus should move to the error message | V8 | 5 | 2 | H | 2 |
| 79 | Confirm form submission via Enter key works on the fan capture email field — pressing Enter in the field should submit the form | V8 | 5 | 1 | H | 1 |
| 80 | Confirm the wizard form submission via Enter key works on each step — pressing Enter in a text field should advance to the next step | STR | 4 | 2 | M | 2 |
| 81 | Confirm the admin save/update button can be activated by keyboard — Tab to it, Enter to activate | ADM | 5 | 1 | H | 1 |
| 82 | Confirm destructive actions (delete show, delete snap card, delete CTA) have keyboard-accessible confirmation dialogs | ADM | 4 | 3 | M | 2 |
| 83 | Confirm confirmation dialogs have keyboard focus trap — Tab cycles between "Confirm" and "Cancel", Escape cancels | ADM | 5 | 2 | H | 2 |
| 84 | Confirm "Cancel" is the default focused element in destructive confirmation dialogs — reduces risk of accidental deletion by keyboard users | ADM | 4 | 2 | M | 2 |
| 85 | Write a Playwright keyboard navigation test for landing.html — Tab through all interactive elements and assert each is focusable | LND | 4 | 5 | L | 3 |
| 86 | Write a Playwright keyboard navigation test for start.html — Tab through the wizard and submit step 1 using keyboard only | STR | 4 | 5 | L | 3 |
| 87 | Write a Playwright keyboard navigation test for able-v8.html — Tab to fan capture form, submit by keyboard | V8 | 5 | 5 | L | 3 |
| 88 | Write a Playwright keyboard navigation test for admin.html — Tab to the campaign state selector and activate a state | ADM | 4 | 5 | L | 3 |
| 89 | Confirm keyboard navigation works on admin.html at both 375px (mobile layout) and 1200px (desktop layout) — mobile layout may have different interactive element positions | ADM | 4 | 3 | L | 2 |
| 90 | Confirm the bottom tab bar on mobile admin (if present) is keyboard accessible at 375px | ADM | 4 | 2 | L | 2 |
| 91 | Confirm the Spotify import workflow in admin is keyboard accessible — the URL input and the "Import" button | ADM | 4 | 2 | L | 2 |
| 92 | Confirm the connections panel in admin (linking streaming platforms) is keyboard accessible | ADM | 4 | 2 | L | 2 |
| 93 | Confirm the release card in admin is keyboard accessible — editing release info, removing a release | ADM | 4 | 2 | L | 2 |
| 94 | Confirm the QR code display in admin (if present) does not trap keyboard focus | ADM | 3 | 1 | L | 2 |
| 95 | Audit all `<a>` elements without `href` attributes — these are not keyboard focusable by default; if they function as buttons, convert them to `<button>` elements | ALL | 5 | 2 | H | 1 |
| 96 | Audit all `role="button"` attributes — these elements require explicit keyboard handling (`keydown` listener for Enter and Space) | ALL | 5 | 2 | H | 1 |
| 97 | Confirm `tabindex="-1"` is used correctly — only on elements that should receive programmatic focus but not be in the natural tab order (e.g. modal container, section headings that receive focus on route change) | ALL | 4 | 2 | M | 2 |
| 98 | Test the full admin workflow keyboard-only on a real iOS device with a connected Bluetooth keyboard — iOS Safari handles keyboard navigation differently from desktop | ADM | 4 | 4 | L | 3 |
| 99 | Run axe-core accessibility audit on each page and resolve all "keyboard" category violations before first user | ALL | 5 | 3 | H | 2 |
| 100 | Final check: navigate the complete fan sign-up journey — landing → start.html → able-v8.html fan capture → admin.html — using only keyboard, no mouse or touch, on a desktop browser; every step must be completable | ALL | 5 | 3 | H | 4 |

## Wave Summary
**Wave 1 — Structural keyboard access (WCAG blockers)**: items #1–#3, #8–#9, #13, #15, #21, #23–#24, #30–#32, #36–#39, #60–#61, #63, #65–#66, #69–#71, #79, #81, #95–#97
**Wave 2 — Page-by-page tab order audit**: items #4–#7, #10–#12, #14, #16–#20, #22, #25–#29, #33–#35, #40–#53, #62, #64, #67–#68, #72–#78, #80, #82–#84, #89–#90, #93–#94
**Wave 3 — Automated tests and cross-browser**: items #54–#59, #85–#88, #91–#92, #98–#99
**Wave 4 — Final verification**: item #100
