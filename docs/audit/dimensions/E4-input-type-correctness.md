# Dimension E4 — Input Type Correctness
**Category:** Mobile UX & Touch
**Phase:** 3 (Mobile)
**Status:** Not started

Every `<input>` element must declare the semantically correct `type` attribute. On iOS and Android, the `type` determines which keyboard is presented to the user — `type=email` shows the `@` key prominently, `type=tel` shows a numeric dial pad, `type=number` shows a numeric keypad, `type=url` shows a `.com` key, and `type=date` opens the native date picker. Using `type=text` for any of these fields forces users to switch keyboards manually, increasing friction and reducing form completion rates. Full compliance means every input across all four ABLE pages has been audited, every `type` attribute is correct, and supplementary attributes (`inputmode`, `autocomplete`, `autocapitalize`) are also set so the browser can assist the user as much as possible.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Change the fan email capture `<input>` on V8 from `type=text` to `type=email` | V8 | 5 | 1 | L | 1 |
| 2 | Add `autocomplete="email"` to the fan email capture field on V8 | V8 | 5 | 1 | L | 1 |
| 3 | Add `inputmode="email"` to the fan email capture field on V8 as a belt-and-suspenders reinforcement | V8 | 4 | 1 | L | 1 |
| 4 | Add `autocapitalize="off"` to the fan email capture field on V8 so iOS does not capitalise the first character | V8 | 4 | 1 | L | 1 |
| 5 | Add `autocorrect="off"` to the fan email capture field on V8 so iOS autocorrect does not mangle email addresses | V8 | 4 | 1 | L | 1 |
| 6 | Add `spellcheck="false"` to the fan email capture field on V8 | V8 | 3 | 1 | L | 1 |
| 7 | Audit the `admin.html` profile edit modal — confirm the artist email field uses `type=email` | ADM | 5 | 1 | L | 1 |
| 8 | Add `autocomplete="email"` to the artist email field in the `admin.html` profile edit modal | ADM | 4 | 1 | L | 1 |
| 9 | Audit `start.html` step 1 — confirm the artist name field uses `type=text` with `autocomplete="name"` | STR | 4 | 1 | L | 1 |
| 10 | Audit `start.html` — confirm any email field in the wizard uses `type=email` | STR | 5 | 1 | L | 1 |
| 11 | On `start.html`, add `autocomplete="email"` to every email input in the wizard | STR | 4 | 1 | L | 1 |
| 12 | Audit `landing.html` early-access signup form — confirm email field uses `type=email` | LND | 5 | 1 | L | 1 |
| 13 | Add `autocomplete="email"` to the `landing.html` early-access signup email field | LND | 4 | 1 | L | 1 |
| 14 | Add `autocapitalize="off"` to every email input across all four pages | ALL | 4 | 1 | L | 1 |
| 15 | Add `autocorrect="off"` to every email input across all four pages | ALL | 4 | 1 | L | 1 |
| 16 | Audit `admin.html` CTA editor — if any field takes a URL, confirm it uses `type=url` | ADM | 4 | 1 | L | 1 |
| 17 | Add `autocomplete="url"` to any URL input field in the `admin.html` CTA editor | ADM | 3 | 1 | L | 1 |
| 18 | Audit `admin.html` show/event editor — confirm the ticket URL field uses `type=url` | ADM | 4 | 1 | L | 1 |
| 19 | Add `autocomplete="url"` to the ticket URL field in `admin.html` | ADM | 3 | 1 | L | 1 |
| 20 | Add `inputmode="url"` to every URL field as a belt-and-suspenders reinforcement for `type=url` | ADM | 3 | 1 | L | 1 |
| 21 | Audit `start.html` — confirm any Spotify/Apple Music link field uses `type=url` | STR | 4 | 1 | L | 1 |
| 22 | Audit `start.html` — confirm any website/social link field uses `type=url` | STR | 4 | 1 | L | 1 |
| 23 | Audit `admin.html` snap card editor — confirm any link field uses `type=url` | ADM | 4 | 1 | L | 1 |
| 24 | Audit `admin.html` merch item editor — confirm the product URL field uses `type=url` | ADM | 4 | 1 | L | 1 |
| 25 | Audit `admin.html` — confirm any phone/contact field uses `type=tel` | ADM | 3 | 1 | L | 2 |
| 26 | Add `autocomplete="tel"` to any phone number field in `admin.html` | ADM | 3 | 1 | L | 2 |
| 27 | Audit `start.html` — confirm no numeric-only fields (e.g., release year) use `type=text` when `type=number` is appropriate | STR | 3 | 1 | L | 2 |
| 28 | For any price/cost field in `admin.html` merch editor, confirm `type=number` with `inputmode="decimal"` | ADM | 3 | 1 | L | 2 |
| 29 | Add `min="0"` and `step="0.01"` to any price field in `admin.html` using `type=number` | ADM | 3 | 1 | L | 2 |
| 30 | Audit `admin.html` show/event editor date field — confirm it uses `type=date` or `type=datetime-local` | ADM | 4 | 1 | L | 2 |
| 31 | Audit `admin.html` show time field — confirm it uses `type=time` | ADM | 3 | 1 | L | 2 |
| 32 | Confirm that `type=date` inputs on `admin.html` fall back gracefully to `type=text` with a placeholder like `YYYY-MM-DD` for unsupported browsers | ADM | 3 | 2 | M | 3 |
| 33 | Add `autocomplete="bday"` to any date-of-birth field if present across any page | ALL | 2 | 1 | L | 3 |
| 34 | Add `autocomplete="given-name"` to the artist first-name field on `start.html` | STR | 3 | 1 | L | 2 |
| 35 | Add `autocomplete="nickname"` or `autocomplete="username"` to the artist stage-name / handle field on `start.html` | STR | 3 | 1 | L | 2 |
| 36 | Add `autocomplete="organization"` if a band/label name field exists on any page | ALL | 2 | 1 | L | 3 |
| 37 | Confirm that the artist bio `<textarea>` has `autocapitalize="sentences"` so the first word of each sentence is capitalised | ADM | 3 | 1 | L | 2 |
| 38 | Confirm that search inputs (if any) use `type=search` with `inputmode="search"` for the correct mobile keyboard | ALL | 3 | 1 | L | 2 |
| 39 | Add `enterkeyhint="search"` to any search input so the keyboard return key shows the magnifying glass icon | ALL | 3 | 1 | L | 2 |
| 40 | Add `enterkeyhint="go"` to all URL fields so the keyboard return key shows the Go/open action | ALL | 3 | 1 | L | 2 |
| 41 | Add `enterkeyhint="send"` to the fan email capture field on V8 to signal the submit action on the keyboard | V8 | 4 | 1 | L | 1 |
| 42 | Add `enterkeyhint="next"` to intermediate form fields on `start.html` so the return key advances to the next field | STR | 4 | 1 | L | 2 |
| 43 | Add `enterkeyhint="done"` to the last field of each wizard step on `start.html` | STR | 3 | 1 | L | 2 |
| 44 | Add `enterkeyhint="done"` to the last field in every `admin.html` modal form | ADM | 3 | 1 | L | 2 |
| 45 | Verify that `type=number` fields on mobile do not show increment/decrement spinner arrows — hide them with CSS for a cleaner mobile appearance | ALL | 2 | 1 | L | 4 |
| 46 | Add CSS to hide `input[type=number]::-webkit-inner-spin-button` and `outer-spin-button` on all number inputs | ALL | 2 | 1 | L | 4 |
| 47 | For any percentage field (e.g., split percentage), use `type=number` with `min=0`, `max=100`, and `inputmode="numeric"` | ALL | 3 | 1 | L | 2 |
| 48 | For any promo/discount code field, use `type=text` with `autocapitalize="characters"` and `autocomplete="off"` | ALL | 2 | 1 | L | 3 |
| 49 | Audit `admin.html` — confirm the accent colour hex input uses `type=text` with `pattern="^#[0-9A-Fa-f]{6}$"` for validation | ADM | 3 | 1 | L | 2 |
| 50 | Add `inputmode="none"` to the colour picker hex field so the mobile keyboard does not appear while a colour wheel is visible | ADM | 3 | 1 | L | 2 |
| 51 | Confirm that the `landing.html` email signup also includes a `name` field with `autocomplete="name"` | LND | 3 | 1 | L | 2 |
| 52 | Verify no `<input type=text>` exists anywhere in `start.html` that should be `type=email` — run a grep audit | STR | 5 | 1 | L | 1 |
| 53 | Verify no `<input type=text>` exists anywhere in `admin.html` that should be `type=url` — run a grep audit | ADM | 5 | 1 | L | 1 |
| 54 | Verify no `<input type=text>` exists anywhere in V8 that should be `type=email` — run a grep audit | V8 | 5 | 1 | L | 1 |
| 55 | Verify no `<input type=text>` exists anywhere in `landing.html` that should be `type=email` — run a grep audit | LND | 4 | 1 | L | 1 |
| 56 | Add `autocomplete="new-password"` to any password creation field to prevent browser autofill of a saved password | ALL | 3 | 1 | L | 2 |
| 57 | Add `autocomplete="current-password"` to any login password field across all pages | ALL | 3 | 1 | L | 2 |
| 58 | Confirm that `type=password` fields exist for any password inputs (there should be no plain-text password fields) | ALL | 5 | 1 | L | 1 |
| 59 | For the Instagram/TikTok handle fields on `start.html`, use `type=text` with `autocapitalize="off"` and `autocorrect="off"` | STR | 4 | 1 | L | 1 |
| 60 | For any social-handle field, add `inputmode="text"` and `pattern="^@?[a-zA-Z0-9._]+$"` for client-side format validation | STR | 3 | 1 | L | 2 |
| 61 | Confirm that streaming platform URL fields (Spotify, Apple Music) on `start.html` have `type=url` and validate against expected URL prefixes | STR | 4 | 1 | L | 2 |
| 62 | Add `pattern="https://.*"` to all `type=url` fields so non-URL strings show a validation error before submission | ALL | 4 | 1 | L | 2 |
| 63 | Confirm that `type=url` fields on mobile show the correct keyboard with `.com` shortcut (verify it is rendering correctly in Safari) | ALL | 4 | 1 | L | 2 |
| 64 | Confirm that `type=email` fields on iOS show the `@` key without requiring the user to switch layouts | ALL | 5 | 1 | L | 1 |
| 65 | Verify that the `admin.html` release date picker uses a native `type=date` rather than a custom JS date picker (native is faster on mobile) | ADM | 4 | 2 | M | 2 |
| 66 | Style the native `type=date` input on `admin.html` to match the ABLE design system tokens rather than leaving it as the browser default | ADM | 3 | 2 | M | 3 |
| 67 | Add a `<datalist>` to the genre/vibe text field on `start.html` so the most common genres are suggested without requiring a custom component | STR | 3 | 2 | M | 3 |
| 68 | Confirm that `<textarea>` elements have a `rows` attribute set to a sensible default so they don't render as single-line on mobile | ALL | 3 | 1 | L | 2 |
| 69 | Set `resize: vertical` on all `<textarea>` elements and remove the default `resize: both` so users cannot break the horizontal layout | ALL | 3 | 1 | L | 2 |
| 70 | For the bio `<textarea>` on `admin.html`, add `maxlength="280"` and a live character counter | ADM | 4 | 2 | M | 3 |
| 71 | Confirm that `<select>` elements use the native `<select>` tag (not custom JS dropdowns) for genre, tier, and state fields on mobile | ALL | 4 | 2 | M | 2 |
| 72 | Add `autocomplete="off"` to the invite/promo code field (if present) to prevent autofill popups interfering with the field | ALL | 2 | 1 | L | 3 |
| 73 | Confirm that hidden inputs `type=hidden` are used for non-user-facing values (e.g., source tracking) rather than visible text fields | ALL | 3 | 1 | L | 2 |
| 74 | Audit all `<input>` elements without an explicit `type` attribute and add `type=text` explicitly (untyped inputs default to `text` but this is not declared) | ALL | 3 | 1 | L | 2 |
| 75 | Confirm that the `name` attribute is set on every `<input>` and `<textarea>` for future form serialisation compatibility | ALL | 3 | 1 | L | 2 |
| 76 | Confirm that the `id` attribute is set on every form input and matches a corresponding `<label for="...">` element | ALL | 4 | 1 | L | 2 |
| 77 | Wrap every input group in a `<label>` element (implicit label) or connect it via `for`/`id` (explicit label) — no label-less inputs | ALL | 4 | 2 | M | 2 |
| 78 | Add `aria-label` to inputs that intentionally have no visible label (e.g., the standalone fan email bar) | V8 | 4 | 1 | L | 2 |
| 79 | Add `aria-describedby` pointing to error message elements for all validated inputs | ALL | 3 | 2 | M | 3 |
| 80 | Add `aria-required="true"` to all required fields | ALL | 3 | 1 | L | 2 |
| 81 | Add the `required` HTML attribute to all mandatory fields so native browser validation can fire | ALL | 4 | 1 | L | 2 |
| 82 | Confirm that `novalidate` is only placed on forms that have custom JS validation — do not suppress native validation without a replacement | ALL | 4 | 1 | L | 2 |
| 83 | Test that `type=email` validation fires correctly on V8 when a user submits a malformed email address | V8 | 5 | 1 | L | 2 |
| 84 | Test that `type=email` validation fires correctly on `landing.html` for the early-access form | LND | 4 | 1 | L | 2 |
| 85 | Test that `type=url` validation fires correctly on `admin.html` for the ticket URL field | ADM | 4 | 1 | L | 2 |
| 86 | Confirm that validation error messages are shown inline below the field, not as browser alert dialogs | ALL | 4 | 2 | M | 2 |
| 87 | Confirm that `type=email` on iOS does not trigger autocorrect replacing part of the email — use `autocorrect="off"` as a guard | ALL | 4 | 1 | L | 1 |
| 88 | Confirm the correct keyboard appears when running in PWA standalone mode (iOS tends to behave differently for PWA form focus) | ALL | 3 | 2 | M | 3 |
| 89 | Add Playwright test: assert `document.querySelector('#fan-email').type === 'email'` on V8 | V8 | 4 | 2 | M | 3 |
| 90 | Add Playwright test: assert every `input[name*="url"]` on `admin.html` has `type === 'url'` | ADM | 3 | 2 | M | 3 |
| 91 | Add Playwright test: assert every `input[name*="date"]` on `admin.html` has `type === 'date'` | ADM | 3 | 2 | M | 3 |
| 92 | Document all input types in a short HTML comment above each form block listing the field name, type, autocomplete, and inputmode | ALL | 2 | 1 | L | 5 |
| 93 | Confirm that the `inputmode` attribute is only set to valid values: `none`, `text`, `decimal`, `numeric`, `tel`, `search`, `email`, `url` | ALL | 3 | 1 | L | 2 |
| 94 | After fixing all `type` attributes, run a cross-browser test in Chrome Android to confirm keyboards are also correct on Android | ALL | 4 | 2 | M | 3 |
| 95 | After fixing all `type` attributes, test on a physical iOS device (not just Simulator) to confirm keyboards match expectations | ALL | 5 | 2 | M | 3 |
| 96 | Confirm that `type=number` does not break paste operations on iOS — pasted values should be accepted by the field | ALL | 3 | 2 | M | 3 |
| 97 | For any percentage input, consider `type=text` with `inputmode="numeric"` instead of `type=number` to allow more flexible paste behaviour | ALL | 2 | 1 | L | 4 |
| 98 | Add a QA checklist item to `docs/QA_SMOKE_TESTS.md` that verifies correct input types on all forms after every major HTML change | ALL | 3 | 1 | L | 4 |
| 99 | Create a single grep audit command that checks for `type=text` on any field whose `name` or `id` contains "email", "url", "phone", or "date" | ALL | 3 | 2 | M | 4 |
| 100 | After all fixes are applied, run a full Lighthouse accessibility audit on all four pages and confirm no form-field type warnings remain | ALL | 4 | 2 | M | 4 |
