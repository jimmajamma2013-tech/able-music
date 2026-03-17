# Dimension I1 — GDPR Consent Mechanism
**Category:** Legal, Compliance & Accessibility
**Phase:** 9

*Fan sign-up on ABLE involves UK GDPR consent. The artist is the data controller; ABLE is the processor. Every element of the consent mechanism — the text shown, how it is presented, what is stored — must meet UK GDPR Article 13 requirements before any real fan email is collected. A single non-compliant consent mechanism exposes both the artist and ABLE to ICO enforcement.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Audit the current fan capture form in able-v8.html — identify the exact consent text string shown to fans below the email field | V8 | 5 | 1 | L | 1 |
| 2 | Confirm no pre-ticked checkbox exists on the fan capture form — UK GDPR Article 7(2) requires freely given, unambiguous, affirmative action | V8 | 5 | 1 | H | 1 |
| 3 | Confirm the consent text is visible without scrolling on a 375px screen — it must not be hidden below the fold or collapsed | V8 | 5 | 1 | H | 1 |
| 4 | Name the artist as the data controller in the consent text — "You're signing up to [Artist Name]'s list" not "You're signing up to ABLE" | V8 | 5 | 2 | H | 1 |
| 5 | Name ABLE explicitly as the data processor in the consent text or linked privacy policy — "powered by ABLE" with link to privacy.html | V8 | 4 | 1 | M | 1 |
| 6 | State the purpose of data collection in plain English in or immediately adjacent to the consent text — "so [Artist] can email you about their music and shows" | V8 | 5 | 1 | H | 1 |
| 7 | Confirm the legal basis used is consent (Article 6(1)(a)) not legitimate interest — fan email capture requires explicit consent; legitimate interest cannot be used for direct marketing under PECR | V8 | 5 | 1 | H | 1 |
| 8 | Confirm consent granularity — fan signs up for communications from that artist only, not ABLE platform marketing or other artists | V8 | 4 | 1 | M | 1 |
| 9 | Ensure the consent text explicitly states the fan can unsubscribe at any time — this is required under Article 7(3) | V8 | 5 | 1 | H | 1 |
| 10 | Link the privacy policy (privacy.html) from the consent text — the link must be visible and tappable (min 44px target) on mobile | V8 | 5 | 1 | M | 1 |
| 11 | Audit the secondary fan capture form (if one exists further down the page in gig or pre-release state) for the same consent requirements | V8 | 5 | 2 | H | 1 |
| 12 | Check whether the consent text changes with campaign state — pre-release ("sign up to be notified") vs profile ("stay close") must both satisfy consent requirements | V8 | 4 | 2 | M | 2 |
| 13 | Verify the font size of the consent text is at least 12px — smaller text can be challenged as not sufficiently prominent under GDPR recital 32 | V8 | 4 | 1 | L | 1 |
| 14 | Verify the colour contrast of the consent text against the background meets WCAG AA (4.5:1) — low-contrast consent text can be argued as not sufficiently prominent | V8 | 4 | 1 | L | 1 |
| 15 | Confirm the consent text is not using a dismissible tooltip or popover — it must be persistently visible at the point of consent | V8 | 5 | 1 | H | 1 |
| 16 | Timestamp the consent at the exact moment of form submission — store `consentTimestamp: new Date().toISOString()` in the fan record | V8 | 5 | 2 | H | 1 |
| 17 | Store the exact consent text string shown to the fan at the time of sign-up alongside the fan record — if the text changes later, the record must reflect what the fan actually consented to | V8 | 5 | 3 | H | 2 |
| 18 | Store the consent version identifier alongside each fan record — enables proof of what the fan consented to if text is updated | V8 | 4 | 2 | M | 2 |
| 19 | Store the consent mechanism (e.g. "email-capture-v1-fan-form") alongside the fan record to distinguish from any future consent flows | V8 | 3 | 1 | L | 3 |
| 20 | Confirm fan records in `able_fans` include a `consentText` field or a `consentVersion` reference before any Supabase migration — adding it retroactively is harder | ADM | 5 | 2 | H | 1 |
| 21 | Ensure the sign-up confirmation email sent to the fan confirms what they signed up for — "You signed up to hear from [Artist]" — this doubles as evidence of consent | V8 | 5 | 2 | H | 2 |
| 22 | Confirm the sign-up confirmation email does not add additional processing purposes beyond those stated at the point of consent — e.g. do not add ABLE newsletter unless separately consented | V8 | 5 | 1 | H | 1 |
| 23 | Check whether the fan confirmation email is currently implemented or stubbed — if stubbed, it is a legal gap until the first real email is sent | V8 | 5 | 1 | H | 1 |
| 24 | Verify the sign-up confirmation email includes an unsubscribe link — required under PECR and expected under UK GDPR best practice | V8 | 5 | 2 | H | 2 |
| 25 | Confirm the unsubscribe mechanism in the confirmation email works end-to-end — clicking it must remove the fan from the list or clearly process the removal | V8 | 5 | 3 | H | 2 |
| 26 | Confirm no double opt-in is currently in use — this is not required under UK GDPR but is best practice; document the decision either way | V8 | 3 | 1 | L | 3 |
| 27 | Consider implementing double opt-in as an artist tier feature — artists with Artist Pro could enable it; document the product decision | ADM | 3 | 4 | L | 4 |
| 28 | Ensure the artist-specific consent text dynamically inserts the artist's name — static "sign up to this artist's list" fails if the artist's name is not in the text | V8 | 5 | 1 | H | 1 |
| 29 | Confirm the fan capture form does not have autocomplete="off" on the email field — this creates unnecessary friction and is not required for GDPR compliance | V8 | 3 | 1 | L | 2 |
| 30 | Check whether consent is required again if a fan signs up for a second artist on ABLE — consent is per-artist (per data controller), not per platform | V8 | 4 | 3 | M | 3 |
| 31 | Confirm no email is sent to a fan before they submit the form — no pre-capture marketing based on browsing behaviour | V8 | 5 | 1 | H | 1 |
| 32 | Confirm the form submission cannot be triggered programmatically without user action — no auto-submit after field blur or similar | V8 | 5 | 1 | H | 1 |
| 33 | Verify the consent capture in start.html artist onboarding — the artist must consent to ABLE's data processing of their own data before creating an account | STR | 4 | 2 | M | 2 |
| 34 | Verify start.html does not use a pre-ticked "I agree to terms" checkbox — same GDPR affirmative action requirement applies | STR | 5 | 1 | H | 1 |
| 35 | Confirm the terms and privacy links in start.html are to the live privacy.html and terms.html, not placeholder URLs | STR | 4 | 1 | M | 1 |
| 36 | Document in the admin dashboard that the artist (as data controller) is responsible for sending compliant communications to fans — this is a legal fact they need to understand | ADM | 4 | 2 | L | 3 |
| 37 | Add a short "data responsibility" reminder on the admin fan list page — "These fans have consented to hear from you. Use this list responsibly." | ADM | 3 | 1 | L | 3 |
| 38 | Ensure the admin export function preserves the consent timestamp in the exported CSV — artists must be able to demonstrate consent to fans who challenge it | ADM | 5 | 2 | H | 2 |
| 39 | Ensure the admin export function preserves the consent version or text string in the exported CSV — see item 38 | ADM | 5 | 2 | H | 2 |
| 40 | Confirm fan sign-up records are stored securely — not accessible to other artists or unauthenticated parties (relevant now via localStorage isolation, critical post-Supabase) | ADM | 5 | 1 | H | 1 |
| 41 | Confirm the fan capture form does not send data to any analytics platform before submission — no keystroke capture, no form field tracking | V8 | 5 | 1 | H | 1 |
| 42 | Confirm no third-party scripts on the fan-facing page capture the email field before it is submitted — audit any loaded scripts | V8 | 5 | 2 | H | 1 |
| 43 | Verify that the `able_fans` localStorage key is not readable by any cross-origin script — localStorage is same-origin by default, but verify no postMessage exposure | V8 | 5 | 1 | M | 2 |
| 44 | Document the legal basis mapping for each data processing activity: fan sign-up (consent), analytics (legitimate interest), artist profile (contract), payment (contract) | DOC | 4 | 3 | L | 3 |
| 45 | Prepare a Record of Processing Activities (ROPA) document — required under UK GDPR Article 30 for organisations processing personal data of EU/UK data subjects | DOC | 5 | 5 | M | 4 |
| 46 | Confirm a Data Processing Agreement (DPA) between ABLE (processor) and each artist (data controller) exists — Article 28 requires a written DPA between controller and processor | DOC | 5 | 5 | H | 3 |
| 47 | Draft a minimal DPA and include it as an accepted document during artist onboarding — artists clicking "Create account" should accept the DPA as part of the terms | STR | 5 | 4 | H | 3 |
| 48 | Confirm the DPA specifies: subject matter, duration, nature and purpose of processing, type of personal data, categories of data subjects, artist's instructions to ABLE | DOC | 5 | 4 | H | 3 |
| 49 | Confirm the consent text does not use double negatives — "uncheck this box if you do not want to not receive emails" is a GDPR failure | V8 | 5 | 1 | H | 1 |
| 50 | Test the consent text in a readability tool — Flesch reading ease score should be above 60 (plain English requirement) | V8 | 4 | 2 | L | 2 |
| 51 | Ensure the consent text does not say "by submitting you agree" — this is a passive consent pattern; UK ICO guidance requires clear affirmative action | V8 | 5 | 1 | H | 1 |
| 52 | Verify the fan is not considered to have consented by merely scrolling past the form — consent must be an active step | V8 | 5 | 1 | H | 1 |
| 53 | Confirm the GDPR statement is not hidden inside an expandable "learn more" section that most users would skip — minimum required text must be visible | V8 | 5 | 1 | H | 1 |
| 54 | Audit all campaign states: in gig mode, does the fan capture form still show compliant consent text, or does the urgency of the moment tempt truncation? | V8 | 5 | 2 | H | 2 |
| 55 | Audit the pre-release state fan capture — "pre-save" capture must still include consent text with the same standard | V8 | 5 | 2 | H | 2 |
| 56 | Confirm consent is re-sought if the artist changes the stated purpose — e.g. an artist who initially collected emails for "music updates" cannot later use them for "merchandise promotions" without fresh consent | DOC | 4 | 3 | M | 4 |
| 57 | Add a `consentPurpose` field to the fan record schema — stores the purpose stated at sign-up ("music updates", "show announcements", "pre-save notification") | V8 | 4 | 2 | M | 2 |
| 58 | Confirm the artist cannot retroactively alter the stated purpose for previously captured fans via the admin dashboard — purpose limitation is a GDPR principle | ADM | 5 | 3 | H | 3 |
| 59 | Verify the artist is notified when a fan's email bounces persistently — continuing to store and contact a bounced email with no valid basis is a data quality issue under UK GDPR Article 5(1)(d) | ADM | 3 | 4 | L | 4 |
| 60 | Ensure ABLE's own marketing to artists (e.g. product update emails) is separately consented — the artist's agreement to the ToS should include a separate opt-in for ABLE communications | STR | 4 | 2 | M | 3 |
| 61 | Confirm there is no "refer a friend" or "share your details" flow that would transfer fan data to a third party without consent | V8 | 5 | 1 | H | 1 |
| 62 | Confirm the consent text does not promise anything ABLE cannot currently deliver — e.g. "your data will never be shared" is too absolute if Supabase (a processor) is used | V8 | 4 | 2 | M | 2 |
| 63 | Ensure the consent text version history is maintained — if the text is updated, old versions must be retrievable to prove what a fan who signed up before the update consented to | DOC | 5 | 3 | M | 3 |
| 64 | Store the IP address or device identifier of the consenting fan — UK ICO recommends storing technical identifiers as part of consent evidence records | V8 | 4 | 3 | M | 3 |
| 65 | Evaluate whether storing IP addresses creates additional GDPR obligations — IP addresses are personal data under UK GDPR; if stored, must be disclosed in privacy policy | DOC | 4 | 2 | M | 3 |
| 66 | Confirm the fan capture form has a visible label for the email field (not just placeholder text) — accessible and legally sound | V8 | 4 | 1 | L | 1 |
| 67 | Confirm the fan capture form has an accessible error state — if a fan submits an invalid email, the error is associated with the field and explains what is wrong | V8 | 4 | 1 | L | 1 |
| 68 | Ensure the form does not silently fail — if submission fails (network error, localStorage full), the fan must be told their sign-up did not complete | V8 | 5 | 2 | H | 2 |
| 69 | Confirm the success state after fan sign-up confirms what the fan has actually consented to — not just "Done!" but "You're on [Artist]'s list." | V8 | 4 | 1 | M | 1 |
| 70 | Verify the consent text is preserved in the `able_fans` array in localStorage — currently the array likely stores `{email, ts, source}` but not `consentText` | V8 | 5 | 2 | H | 1 |
| 71 | Add `consentText` field to the `able_fans` schema definition in `docs/systems/data-architecture/SPEC.md` | DOC | 5 | 1 | M | 1 |
| 72 | Add `consentVersion` field (e.g. `"v1"`) to the `able_fans` schema definition | DOC | 4 | 1 | L | 1 |
| 73 | Add `consentTimestamp` field to the `able_fans` schema definition (separate from sign-up timestamp in case of two-step flow) | DOC | 5 | 1 | M | 1 |
| 74 | Confirm the Supabase `fans` table (when created) includes `consent_text`, `consent_version`, and `consent_timestamp` columns | DOC | 5 | 2 | H | 2 |
| 75 | Draft the canonical consent text string for profile state and store it in the codebase as a named constant — not inlined in the HTML | V8 | 4 | 2 | M | 2 |
| 76 | Draft the canonical consent text string for pre-release state — different purpose ("be first to hear") but must still satisfy consent requirements | V8 | 4 | 2 | M | 2 |
| 77 | Draft the canonical consent text string for gig mode — "sign up tonight" urgency copy must still name the artist and include unsubscribe notice | V8 | 4 | 2 | M | 2 |
| 78 | Draft the canonical consent text string for live (post-release) state — streaming CTA context but email capture still present | V8 | 4 | 2 | M | 2 |
| 79 | Review all four consent text variants with a plain-English lens — no legal jargon, no passive voice, no double negatives | DOC | 4 | 2 | L | 3 |
| 80 | Submit draft consent texts to a GDPR specialist or use ICO guidance checklist before first real user — this is a £10 check now vs enforcement later | DOC | 5 | 3 | M | 3 |
| 81 | Confirm the privacy policy linked from the consent text is accessible via HTTPS with a valid SSL certificate — linked broken/HTTP pages undermine trust | LND | 4 | 1 | M | 1 |
| 82 | Confirm privacy.html is linked from the fan-facing profile page footer as well as the fan capture form | V8 | 4 | 1 | L | 1 |
| 83 | Confirm privacy.html is linked from start.html artist onboarding | STR | 4 | 1 | L | 1 |
| 84 | Confirm privacy.html is linked from the landing page footer | LND | 4 | 1 | L | 1 |
| 85 | Confirm terms.html is linked from start.html artist onboarding — artists must agree to terms before creating an account | STR | 5 | 1 | H | 1 |
| 86 | Confirm the privacy policy link in the fan capture consent text opens in the same tab (not `target="_blank"`) or clearly signals a new tab opens — do not break the sign-up flow | V8 | 3 | 1 | L | 2 |
| 87 | Confirm the fan cannot sign up without being shown the consent text — test by disabling CSS and verifying the text is in the DOM, not injected dynamically after render | V8 | 5 | 1 | H | 1 |
| 88 | Confirm the consent text is included in the page's initial HTML, not loaded asynchronously — consent must be present before the form is usable | V8 | 5 | 1 | H | 1 |
| 89 | Add a `data-consent-version` attribute to the fan capture form element — enables automated testing to verify correct consent text is present | V8 | 3 | 1 | L | 3 |
| 90 | Write a Playwright smoke test that checks the consent text is present and visible on the fan capture form before the submit button | V8 | 4 | 3 | L | 3 |
| 91 | Write a Playwright smoke test that verifies no pre-ticked checkboxes exist on any form across all pages | ALL | 5 | 3 | H | 3 |
| 92 | Confirm the ICO registration fee has been paid (or that ABLE qualifies for an exemption) before first real user data is collected — processing personal data without registration is an ICO offence | DOC | 5 | 2 | H | 2 |
| 93 | Document the ICO registration reference number in the privacy policy once registered — standard practice for UK data controllers | DOC | 3 | 1 | L | 4 |
| 94 | Confirm ABLE has a documented data breach response procedure — required under UK GDPR Article 33 (72-hour notification to ICO) | DOC | 5 | 4 | H | 3 |
| 95 | Confirm fan data deletion requests are fulfilled within one calendar month — UK GDPR Article 17 right to erasure | ADM | 5 | 4 | H | 3 |
| 96 | Confirm fan data access requests (Subject Access Requests) can be fulfilled within one calendar month — UK GDPR Article 15 | ADM | 5 | 4 | H | 3 |
| 97 | Confirm fan data portability requests (email the fan a copy of their data in machine-readable format) can be fulfilled — UK GDPR Article 20 | ADM | 4 | 4 | M | 3 |
| 98 | Confirm artist accounts can be fully deleted including all associated fan data — right to erasure applies upstream too | ADM | 5 | 4 | H | 3 |
| 99 | Add "Last updated" date to consent text version control in codebase — any change to consent text must bump the version and the date | DOC | 4 | 1 | L | 2 |
| 100 | Final check: walk through the complete fan sign-up flow on a 375px device and verify the consent text is readable, prominent, accurate, and the sign-up creates a record with consent timestamp, consent text version, and artist attribution | V8 | 5 | 2 | H | 4 |

## Wave Summary
**Wave 1 — Legal blockers** (must be done before first fan email is collected): items #1–#15, #20–#24, #28–#35, #40–#43, #49–#53, #66–#70, #81–#88, #92
**Wave 2 — Consent record completeness**: items #16–#19, #24–#25, #38–#39, #57, #71–#74
**Wave 3 — Documentation and DPA**: items #44–#48, #56, #58–#60, #62–#65
**Wave 4 — Polish, verification, and testing**: items #26–#27, #36–#37, #50, #54–#55, #75–#80, #89–#91, #93–#100
