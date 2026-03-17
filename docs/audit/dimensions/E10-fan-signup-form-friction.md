# Dimension E10 — Fan Sign-Up Form Friction
**Category:** Mobile UX & Touch
**Phase:** 3 (Mobile)
**Status:** Not started

The fan email capture on V8 is ABLE's single most important conversion moment. Every millisecond of friction between a fan's intent to sign up and their confirmation reduces conversion. Full compliance means the form is a single field, uses `type=email` with `autocomplete="email"`, auto-focuses when the fan scrolls to it (but not on page load), submits on the return key, has a 44px submit button that is easy to tap with a thumb, shows a success state within 200ms of submission, persists the signed-up state to localStorage so the fan never sees the form again, and the entire flow from tap to confirmed is achievable in under 3 seconds on a mid-tier device. This dimension covers the end-to-end quality of that single interaction.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Change the fan email capture `<input>` from `type=text` to `type=email` | V8 | 5 | 1 | L | 1 |
| 2 | Add `autocomplete="email"` to the fan email field | V8 | 5 | 1 | L | 1 |
| 3 | Add `inputmode="email"` to the fan email field | V8 | 4 | 1 | L | 1 |
| 4 | Add `autocapitalize="off"` to the fan email field | V8 | 4 | 1 | L | 1 |
| 5 | Add `autocorrect="off"` to the fan email field | V8 | 4 | 1 | L | 1 |
| 6 | Add `spellcheck="false"` to the fan email field | V8 | 3 | 1 | L | 1 |
| 7 | Add `enterkeyhint="send"` to the fan email field so the keyboard return key reads "send" or "go" | V8 | 4 | 1 | L | 1 |
| 8 | Add a `keydown` event listener that submits the form when `event.key === 'Enter'` is pressed on the email input | V8 | 5 | 1 | L | 1 |
| 9 | Ensure the submit button is a minimum of 44px in height for tap-target compliance | V8 | 5 | 1 | L | 1 |
| 10 | Ensure the submit button is at least 80px wide so it is easy to tap with a thumb without precision aiming | V8 | 4 | 1 | L | 1 |
| 11 | Use the artist accent colour (`--color-accent`) for the submit button background so it is visually prominent | V8 | 4 | 1 | L | 1 |
| 12 | Add `touch-action: manipulation` to the submit button to eliminate the 300ms tap delay | V8 | 4 | 1 | L | 1 |
| 13 | Add `cursor: pointer` to the submit button for desktop users | V8 | 2 | 1 | L | 4 |
| 14 | Show a loading spinner on the submit button within 1 animation frame of tap — do not wait for the async callback | V8 | 5 | 1 | L | 1 |
| 15 | Disable the submit button and add `pointer-events: none` while the submission is in flight to prevent double-submit | V8 | 5 | 1 | L | 1 |
| 16 | Show the fan sign-up success state within 200ms of tap — use an optimistic update that confirms immediately and validates asynchronously | V8 | 5 | 2 | M | 1 |
| 17 | The success state should replace the form field and submit button with a confirmation message: "You're on the list." | V8 | 5 | 1 | L | 1 |
| 18 | Animate the success state transition using a `transform: scale(1) + opacity: 1` entrance animation from `scale(0.8) + opacity: 0` | V8 | 4 | 1 | L | 2 |
| 19 | The success state animation must complete within 200ms so the total time from tap to confirmed feeling is under 400ms | V8 | 5 | 1 | L | 1 |
| 20 | Persist the success state to `localStorage` key `able_fan_signup_[artistId]` so returning visitors never see the form again | V8 | 5 | 1 | L | 1 |
| 21 | On page load, check localStorage for existing fan sign-up state and immediately hide the form if already signed up | V8 | 5 | 1 | L | 1 |
| 22 | If the fan is already signed up, replace the fan capture bar with a quieter "Welcome back" message or hide it entirely | V8 | 4 | 1 | L | 2 |
| 23 | Confirm the fan capture section does not show an empty form for a split second before the localStorage check runs — inline the check in a synchronous `<script>` | V8 | 5 | 2 | M | 1 |
| 24 | Add a `name="email"` attribute to the email input for future server-side form compatibility | V8 | 3 | 1 | L | 2 |
| 25 | Add a `required` attribute to the email field so native validation fires before the JS handler | V8 | 4 | 1 | L | 1 |
| 26 | Add inline validation: if the email format is invalid when the user taps submit, show an error below the field within 100ms | V8 | 5 | 2 | M | 1 |
| 27 | The inline validation error message should be specific: "Enter a valid email like name@example.com" | V8 | 4 | 1 | L | 2 |
| 28 | Validate the email with a regex pattern — at minimum check for presence of `@` and a dot in the domain | V8 | 4 | 1 | L | 1 |
| 29 | Do not block submission for edge-case valid email formats (e.g., `user+tag@domain.co.uk`) | V8 | 3 | 1 | L | 2 |
| 30 | Add a `aria-label="Your email"` to the email input field for screen reader users | V8 | 4 | 1 | L | 1 |
| 31 | Add `aria-describedby="fan-email-error"` to the email input pointing to the error message element | V8 | 3 | 1 | L | 2 |
| 32 | Add `aria-live="polite"` to the error message element so screen readers announce validation errors | V8 | 3 | 1 | L | 2 |
| 33 | Add `aria-live="polite"` to the success state container so screen readers announce successful sign-up | V8 | 4 | 1 | L | 2 |
| 34 | Add `role="status"` to the success message container | V8 | 3 | 1 | L | 2 |
| 35 | Confirm that the placeholder text in the email input ("Your email" or similar) disappears immediately on focus — no delayed transition | V8 | 3 | 1 | L | 2 |
| 36 | Set the placeholder to "Your email" rather than "Enter your email address" — shorter, faster to scan | V8 | 3 | 1 | L | 2 |
| 37 | Use the copy "Stay close." as the label/heading above the fan capture section — not "Sign up for updates" | V8 | 4 | 1 | L | 2 |
| 38 | Ensure the submit button copy is a short action verb: "In" or "Sign up" — not "Subscribe" or "Submit" | V8 | 4 | 1 | L | 2 |
| 39 | Confirm that the fan capture section is visible without scrolling for at least 50% of users (place it at or near the top of the content below the hero) | V8 | 5 | 2 | M | 2 |
| 40 | Alternatively, use a sticky bottom bar for fan capture so it is always visible without the user needing to scroll to it | V8 | 5 | 3 | M | 2 |
| 41 | If a sticky bottom fan capture bar is used, confirm it does not obscure the bottom navigation bar | V8 | 5 | 2 | M | 2 |
| 42 | If a sticky bottom bar is used, confirm it clears `env(safe-area-inset-bottom)` | V8 | 5 | 1 | L | 1 |
| 43 | Confirm the sticky bar shrinks or dismisses after the user has scrolled past a certain point so it doesn't obstruct content exploration | V8 | 3 | 2 | M | 3 |
| 44 | Confirm the sticky bar does not appear at all if the user is already signed up (localStorage check) | V8 | 5 | 1 | L | 1 |
| 45 | Add a gentle entrance animation to the sticky fan capture bar when it first appears (slide up from bottom, 250ms, ease-out) | V8 | 3 | 1 | L | 3 |
| 46 | Confirm the fan capture bar entrance animation respects `prefers-reduced-motion: reduce` | V8 | 3 | 1 | L | 2 |
| 47 | Confirm that the fan capture bar does not animate on every page load — only on first appearance | V8 | 3 | 1 | L | 2 |
| 48 | Add an `id="fan-capture"` to the fan capture section for anchor-link targeting | V8 | 2 | 1 | L | 3 |
| 49 | Confirm the form is wrapped in a `<form>` element with a `submit` event handler (not just a button click handler) for better native form behaviour | V8 | 4 | 1 | L | 1 |
| 50 | Add `action="#"` or `action="javascript:void(0)"` to the `<form>` to prevent page reload on form submit | V8 | 4 | 1 | L | 1 |
| 51 | Add `method="post"` to the `<form>` element as a semantic signal even though the actual submission is via JS | V8 | 2 | 1 | L | 3 |
| 52 | Confirm that pressing Enter in the email field does not submit the form if the email is visibly empty — show the empty-field validation state | V8 | 4 | 1 | L | 1 |
| 53 | Confirm that the email field shows a red `outline` or `border` using a `--color-error` token on invalid state | V8 | 4 | 1 | L | 2 |
| 54 | Confirm the invalid state styling matches the ABLE design system tokens and does not hardcode a hex colour | V8 | 3 | 1 | L | 2 |
| 55 | Add a haptic feedback call `navigator.vibrate(10)` on successful submission on Android (iOS does not support this — check first) | V8 | 2 | 1 | L | 5 |
| 56 | Confirm the submit button label changes to a checkmark icon (not text) in the success state to communicate completion without requiring reading | V8 | 4 | 1 | L | 2 |
| 57 | Add a micro-bounce animation to the checkmark icon in the success state (scale from 0 to 1.1 to 1.0, 200ms) | V8 | 3 | 1 | L | 3 |
| 58 | Track the fan sign-up event to `able_clicks` localStorage immediately on success for analytics | V8 | 4 | 1 | L | 1 |
| 59 | Track the fan sign-up event with a `source` attribute from the URL query string for attribution | V8 | 4 | 1 | L | 2 |
| 60 | Save the fan record to `able_fans` localStorage immediately: `{ email, ts: Date.now(), source }` | V8 | 5 | 1 | L | 1 |
| 61 | When Supabase is available, also POST the fan record to the `fans` table asynchronously after the local save | V8 | 5 | 2 | M | 2 |
| 62 | If the Supabase POST fails, queue the record in a `able_fans_pending` localStorage key and retry on next page load | V8 | 4 | 2 | M | 3 |
| 63 | Confirm the retry logic for pending fans flushes on `admin.html` load as well as V8 load | V8 | 3 | 2 | M | 3 |
| 64 | Deduplicate fan sign-ups by email — if the email already exists in `able_fans`, show a "You're already on the list" success message instead | V8 | 4 | 1 | L | 2 |
| 65 | Trim whitespace from the email input value before validation and storage | V8 | 4 | 1 | L | 1 |
| 66 | Lowercase the email before storage to prevent duplicate `User@EXAMPLE.com` and `user@example.com` entries | V8 | 4 | 1 | L | 1 |
| 67 | Confirm that the fan sign-up count on `admin.html` updates within the same session — if the artist is testing their own page | ADM | 4 | 2 | M | 2 |
| 68 | Test the entire fan sign-up flow on a physical iPhone SE at 375px using mobile data (not WiFi) | V8 | 5 | 2 | M | 2 |
| 69 | Test the fan sign-up on a physical iPhone 14 at 390px | V8 | 5 | 2 | M | 2 |
| 70 | Test the fan sign-up at 667×375 (iPhone SE landscape) and confirm the form is usable | V8 | 4 | 2 | M | 2 |
| 71 | Confirm the sign-up form works correctly in all four themes: dark, light, glass, contrast | V8 | 4 | 2 | M | 2 |
| 72 | Confirm the email input field is styled consistently in all four themes (no hardcoded colours that conflict with light or glass themes) | V8 | 4 | 1 | L | 2 |
| 73 | Confirm the success state message is legible in all four themes | V8 | 4 | 1 | L | 2 |
| 74 | Test that the iOS keyboard autocomplete suggestion for email (e.g., suggesting a saved email address) populates the field correctly | V8 | 4 | 1 | L | 2 |
| 75 | Test that accepting an iOS autocomplete suggestion then tapping the submit button works without requiring the user to tap the field again | V8 | 4 | 1 | L | 2 |
| 76 | Confirm that `autofocus` is NOT set on the email field — auto-focusing on page load immediately opens the keyboard, which is disruptive | V8 | 5 | 1 | L | 1 |
| 77 | If a sticky bar is used, confirm that tapping the sticky bar area focuses the input — the whole bar should be tappable | V8 | 4 | 1 | L | 2 |
| 78 | Confirm that the fan capture section has a distinct visual container (border, background change, or section heading) that makes it clearly a sign-up zone | V8 | 3 | 1 | L | 2 |
| 79 | Confirm that the section heading above the form uses first-person copy from the artist's perspective: "Stay close." not "Sign up" | V8 | 4 | 1 | L | 2 |
| 80 | Add a sub-copy line below the heading that explains value: "I'll let you know about new music, shows, and things that matter." | V8 | 4 | 1 | L | 2 |
| 81 | Confirm the sub-copy line is max 1 line on iPhone SE (375px) — do not let it wrap to 3 lines | V8 | 3 | 1 | L | 2 |
| 82 | Confirm the sub-copy does not use banned phrases ("Subscribe to updates", "Be the first to know") per the copy philosophy | V8 | 4 | 1 | L | 1 |
| 83 | Add a privacy micro-copy line below the button: "No spam. Unsubscribe any time." — small, subdued, but there | V8 | 3 | 1 | L | 2 |
| 84 | Ensure the privacy micro-copy uses `--color-text-muted` token and is rendered at 12px (it is not an input so it is exempt from the 16px rule) | V8 | 3 | 1 | L | 2 |
| 85 | Add Playwright test: fill the email field, press Enter, assert success state appears within 500ms | V8 | 5 | 2 | M | 3 |
| 86 | Add Playwright test: tap the submit button, assert button shows loading state within 300ms | V8 | 5 | 2 | M | 3 |
| 87 | Add Playwright test: submit an invalid email and assert inline error message appears | V8 | 4 | 2 | M | 3 |
| 88 | Add Playwright test: submit a valid email, assert the record is saved to `localStorage.able_fans` | V8 | 4 | 2 | M | 3 |
| 89 | Add Playwright test: reload the page after sign-up and assert the form is hidden (signed-up state persisted) | V8 | 5 | 2 | M | 3 |
| 90 | Add Playwright test: submit a duplicate email (already in `able_fans`) and assert the deduplication message appears | V8 | 3 | 2 | M | 3 |
| 91 | Confirm the Playwright test suite runs the fan sign-up tests at both 375px and 390px viewport widths | V8 | 4 | 2 | M | 3 |
| 92 | Measure and record the time from button tap to success state appearance using `performance.now()` in the test suite | V8 | 3 | 3 | M | 4 |
| 93 | Assert in the test that the tap-to-success time is under 200ms for localStorage-only submissions | V8 | 5 | 2 | M | 3 |
| 94 | Confirm that the fan count displayed on `admin.html` updates in real time if the artist is viewing the dashboard in the same browser session | ADM | 3 | 2 | M | 3 |
| 95 | Confirm that the admin fan list sorts newest sign-ups to the top by default | ADM | 3 | 1 | L | 2 |
| 96 | Confirm that `admin.html` shows the email address of the most recent sign-up in a "Latest fan" quick-stat card | ADM | 3 | 1 | L | 2 |
| 97 | Confirm the whole fan capture flow is GDPR compliant: no email is stored without the user explicitly submitting the form | V8 | 5 | 1 | L | 1 |
| 98 | Add a QA checklist item: "Sign up as a fan on V8 on a physical iPhone SE and confirm success appears within 200ms of tap" | V8 | 5 | 1 | L | 4 |
| 99 | Document the optimistic update + localStorage-first pattern in a code comment in V8 so future developers understand the intent | V8 | 2 | 1 | L | 5 |
| 100 | After all fan sign-up friction fixes, run a Playwright conversion-flow audit and confirm the round-trip from page load to signed up is achievable in under 10 seconds on 3G | V8 | 5 | 2 | M | 4 |
