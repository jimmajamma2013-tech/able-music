# Dimension J9 — First Artist Experience
**Category:** Launch Readiness & Cross-Page Coherence
**Phase:** 10 (Launch)
**Status:** Not started

Complete first-artist journey walked end-to-end manually: arrive at landing → click CTA → complete onboarding → see profile → open admin → add first CTA → share profile → sign up as a fan → see fan appear in admin. Every step works and feels intentional. This dimension is the human quality gate before any other artist is given access. Full compliance means the experience is not just technically functional but emotionally coherent: the artist feels like ABLE was built specifically for them, that each step was considered, and that it is worth sharing with their fans. Any step that feels clunky, generic, or unfinished will be the last step that artist takes before leaving.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Walk the full first-artist journey on a clean browser profile (no prior localStorage) and document every friction point | ALL | 5 | 2 | H | 1 |
| 2 | Confirm the landing page hero CTA label is specific and compelling — not "Get started" but something that communicates the value | LND | 5 | 1 | H | 1 |
| 3 | Confirm the landing page CTA leads directly to `start.html` with no intermediate confirmation step | LND | 5 | 1 | H | 1 |
| 4 | Confirm `start.html` wizard first screen loads in under 1.5 seconds on a 4G connection | STR | 5 | 2 | H | 1 |
| 5 | Confirm the wizard first screen communicates what the artist is about to create — specific to ABLE's value, not a generic "Create account" | STR | 5 | 1 | H | 1 |
| 6 | Confirm the wizard progress indicator is visible and accurate throughout all steps | STR | 4 | 1 | M | 2 |
| 7 | Confirm the wizard back button works on every step and does not lose the artist's previously entered data | STR | 5 | 1 | H | 1 |
| 8 | Confirm the artist name field accepts the full expected input range (1–50 characters, non-ASCII, apostrophes) | STR | 4 | 1 | M | 2 |
| 9 | Confirm the artist name field has a label and placeholder that reflect the ABLE copy voice — not "Enter your name" | STR | 4 | 1 | M | 2 |
| 10 | Confirm the genre/vibe selection step shows options that represent the actual range of independent artists | STR | 4 | 2 | M | 2 |
| 11 | Confirm the accent colour picker defaults to a visually compelling colour, not a random or ugly default | STR | 4 | 1 | M | 2 |
| 12 | Confirm the accent colour preview in the wizard shows how the colour will look on the artist's profile | STR | 4 | 2 | M | 2 |
| 13 | Confirm the CTA type selector options are clear and specific — the artist must know exactly what each option does | STR | 4 | 1 | M | 2 |
| 14 | Confirm the release info step is clearly optional — not all artists are releasing something right now | STR | 4 | 1 | M | 2 |
| 15 | Confirm the wizard final step shows a live preview of the profile before the artist commits | STR | 5 | 3 | M | 2 |
| 16 | Confirm the wizard completion message uses ABLE copy voice — not "You're all set!" | STR | 5 | 1 | H | 1 |
| 17 | Confirm the wizard redirects to `admin.html` with `?source=onboarding` so admin can show a welcome state | STR | 4 | 1 | M | 2 |
| 18 | Confirm `admin.html` welcome state on first arrival is warm and specific — uses the artist's name | ADM | 5 | 1 | H | 1 |
| 19 | Confirm the admin greeting is "Good to see you, [Name]." — warm, one beat, done | ADM | 5 | 1 | H | 1 |
| 20 | Confirm the admin welcome state shows the artist's profile URL and a prominent "View my profile" button | ADM | 5 | 1 | H | 1 |
| 21 | Confirm the admin welcome state shows a "Share profile" action with one tap | ADM | 5 | 1 | H | 1 |
| 22 | Confirm the admin nudge system shows one meaningful, specific first action — not a wall of tasks | ADM | 4 | 2 | M | 2 |
| 23 | Confirm the first nudge references what the artist actually set up in the wizard — not a generic prompt | ADM | 4 | 2 | M | 2 |
| 24 | Confirm the artist can add their first CTA in admin in under 3 steps and under 60 seconds | ADM | 5 | 2 | H | 1 |
| 25 | Confirm adding a CTA in admin immediately updates able-v7.html — verify by opening both in separate tabs | ADM | 5 | 2 | H | 1 |
| 26 | Confirm the "View my profile" link in admin opens able-v7.html in a new tab | ADM | 4 | 1 | M | 2 |
| 27 | Confirm able-v7.html renders the artist's name prominently above the fold on first load | V8 | 5 | 1 | H | 1 |
| 28 | Confirm able-v7.html renders the artist's chosen accent colour correctly on first load | V8 | 5 | 1 | H | 1 |
| 29 | Confirm able-v7.html renders in the default campaign state (profile) when no override is set | V8 | 5 | 1 | H | 1 |
| 30 | Confirm able-v7.html loads in under 2 seconds on a 4G connection from a cold cache | V8 | 5 | 2 | H | 1 |
| 31 | Confirm able-v7.html looks correct on the artist's own device (iPhone SE or similar smallest target) | V8 | 5 | 1 | H | 1 |
| 32 | Confirm the hero section of able-v7.html shows the CTA the artist just added in admin | V8 | 5 | 1 | H | 1 |
| 33 | Confirm the artist can share their profile URL from the admin dashboard with one tap | ADM | 5 | 1 | H | 1 |
| 34 | Confirm the share URL is `https://ablemusic.co/[slug]` not a file path or localhost | ADM | 5 | 1 | H | 1 |
| 35 | Confirm the artist can sign up as a fan on their own profile (using a second device or incognito) | V8 | 5 | 2 | H | 1 |
| 36 | Confirm the fan sign-up form on able-v7.html is immediately visible without scrolling on a 375px screen | V8 | 5 | 1 | H | 1 |
| 37 | Confirm the fan sign-up form label is in ABLE copy voice — not "Subscribe" or "Join my list" | V8 | 5 | 1 | H | 1 |
| 38 | Confirm the fan sign-up shows a clear success state after submission — not just a spinner that disappears | V8 | 5 | 1 | H | 1 |
| 39 | Confirm the fan confirmation email arrives in the inbox within 30 seconds of sign-up | NET | 5 | 1 | H | 1 |
| 40 | Confirm the fan confirmation email shows the correct artist name — not a template placeholder | NET | 5 | 1 | H | 1 |
| 41 | Confirm the fan confirmation email shows the correct artist accent colour in the CTA button | NET | 4 | 2 | M | 2 |
| 42 | Confirm the signed-up fan appears in `admin.html` fan list within 5 seconds of sign-up | ADM | 5 | 1 | H | 1 |
| 43 | Confirm the fan entry in admin shows the correct email address and timestamp | ADM | 4 | 1 | M | 2 |
| 44 | Confirm the admin fan list empty state (before any fans) shows a meaningful message in ABLE voice | ADM | 4 | 1 | M | 2 |
| 45 | Confirm the admin fan list does not say "No fans yet" — write in ABLE voice: "When people sign up, they'll appear here." | ADM | 4 | 1 | M | 2 |
| 46 | Confirm the artist can star a fan in admin and the star persists across page reload | ADM | 3 | 1 | L | 3 |
| 47 | Confirm the admin analytics section shows 1 view (artist's own visit), 1 sign-up, and the correct tap count | ADM | 4 | 1 | M | 2 |
| 48 | Confirm analytics numbers are formatted correctly — not "1.0" but "1" | ADM | 3 | 1 | L | 3 |
| 49 | Confirm analytics metric labels use ABLE copy voice — not "Conversion Rate" but something human | ADM | 4 | 1 | M | 2 |
| 50 | Confirm the campaign state selector in admin is easy to find and clearly labelled | ADM | 4 | 1 | M | 2 |
| 51 | Confirm the artist can switch to gig mode with a single tap and see the confirmation in admin | ADM | 4 | 2 | M | 2 |
| 52 | Confirm able-v7.html reflects the gig state immediately after it is activated in admin | V8 | 4 | 2 | M | 2 |
| 53 | Confirm the gig state fan experience is intentional — "on tonight" messaging is prominent and feels urgent | V8 | 4 | 2 | M | 2 |
| 54 | Confirm the artist can set a release date in admin and see the pre-release state on their profile | ADM | 4 | 2 | M | 2 |
| 55 | Confirm the pre-release countdown in able-v7.html is visible and counts down in real time | V8 | 4 | 2 | M | 2 |
| 56 | Confirm the pre-release copy is in the artist's voice — not "Release in X days" but first-person | V8 | 4 | 1 | M | 2 |
| 57 | Confirm the admin snap cards section allows the artist to add a card in under 60 seconds | ADM | 3 | 2 | L | 3 |
| 58 | Confirm the snap card appears on able-v7.html immediately after being added in admin | ADM | 3 | 2 | L | 3 |
| 59 | Confirm there is no moment in the first artist journey where the artist sees a blank page for more than 2 seconds | ALL | 5 | 2 | H | 1 |
| 60 | Confirm there is no moment in the journey where the artist sees a raw JSON error or a stack trace | ALL | 5 | 1 | H | 1 |
| 61 | Confirm the admin browser tab shows the artist's name — not "admin.html" or a generic title | ADM | 3 | 1 | L | 3 |
| 62 | Confirm able-v7.html browser tab shows the artist's name in the title | V8 | 4 | 1 | M | 2 |
| 63 | Confirm the landing → start transition is instant — no perceptible loading delay between pages | LND | 4 | 2 | M | 2 |
| 64 | Confirm the start → admin transition after wizard completion feels like a reward — not an abrupt redirect | STR | 4 | 2 | M | 2 |
| 65 | Confirm the first-artist experience is tested by someone other than the developer — cold start test | ALL | 5 | 1 | H | 1 |
| 66 | Confirm the tester did not receive any verbal instructions before using the product | ALL | 5 | 1 | H | 1 |
| 67 | Record the first-artist session (with permission) using a screen recorder to review friction points | ALL | 4 | 1 | L | 2 |
| 68 | Confirm the tester successfully completed all steps without asking for help | ALL | 4 | 1 | H | 1 |
| 69 | Document every friction point the tester encountered and resolve all P1 issues before launch | ALL | 5 | 2 | H | 1 |
| 70 | Confirm the admin page for a new artist does not show blank charts or "No data" for every metric | ADM | 4 | 2 | M | 2 |
| 71 | Confirm the admin zero state for views says something true and human — not "You have 0 views" | ADM | 4 | 1 | M | 2 |
| 72 | Confirm able-v7.html shows a meaningful demo/preview state when accessed without a profile | V8 | 4 | 2 | M | 2 |
| 73 | Confirm the first CTA the artist adds in admin appears correctly in the hero zone of able-v7.html | V8 | 5 | 1 | H | 1 |
| 74 | Confirm the CTA button on able-v7.html uses the artist's accent colour | V8 | 5 | 1 | H | 1 |
| 75 | Confirm the CTA button label on able-v7.html exactly matches what the artist typed in admin | V8 | 4 | 1 | M | 2 |
| 76 | Confirm the fan sign-up form copy changes correctly with campaign state | V8 | 4 | 2 | M | 2 |
| 77 | Confirm the artist's first impression of the admin dashboard is uncluttered — not an overwhelming wall of cards | ADM | 4 | 2 | M | 2 |
| 78 | Confirm all admin sections the artist will use in their first session are above the fold or within one scroll | ADM | 4 | 2 | M | 2 |
| 79 | Confirm the admin top navigation makes it clear where the artist is at all times | ADM | 3 | 2 | L | 3 |
| 80 | Confirm the share action on admin copies the correct URL format and shows a confirmation toast | ADM | 4 | 1 | M | 2 |
| 81 | Confirm the share action toast copy is in ABLE voice — not "Copied to clipboard!" but "Link copied." | ADM | 4 | 1 | M | 2 |
| 82 | Confirm the admin profile editor saves instantly or has a clearly visible save button | ADM | 4 | 2 | M | 2 |
| 83 | Confirm the admin profile editor shows a save confirmation in ABLE voice — not "Saved!" | ADM | 3 | 1 | L | 3 |
| 84 | Confirm the onboarding wizard does not ask for an email or password — there is no authentication yet | STR | 4 | 1 | M | 2 |
| 85 | Confirm the tier "free" badge (if shown) in admin does not make the artist feel like a second-class user | ADM | 3 | 2 | L | 3 |
| 86 | Confirm locked pro features use the gold lock pattern with specific value propositions — not just "Upgrade" | ADM | 3 | 2 | L | 3 |
| 87 | Confirm locked features do not dominate the admin view — they should be secondary to what the artist can do today | ADM | 4 | 2 | M | 2 |
| 88 | Confirm the first-artist experience includes sharing the profile on at least one real social platform and confirming the link preview works | ALL | 4 | 2 | M | 2 |
| 89 | Confirm the full journey (landing → profile published and shared) takes under 5 minutes for a motivated artist | ALL | 5 | 1 | H | 1 |
| 90 | Confirm the wizard has no more than 5 steps — each additional step loses a measurable percentage of users | STR | 4 | 2 | M | 2 |
| 91 | Confirm the artist does not need to read any documentation to complete the full first journey | ALL | 4 | 1 | M | 2 |
| 92 | Confirm the admin header greeting updates correctly for different times of day | ADM | 3 | 1 | L | 4 |
| 93 | Confirm the first-artist experience is repeated with a second test artist (different name, accent, CTA type) | ALL | 4 | 2 | M | 2 |
| 94 | Collect written feedback from the first tester and address all P1 issues before inviting more test users | ALL | 5 | 2 | H | 1 |
| 95 | Confirm the full journey works on an iPhone SE (375px) — the smallest target device | ALL | 5 | 1 | H | 1 |
| 96 | Confirm the full journey works on a mid-range Android device (e.g. Samsung Galaxy A series) | ALL | 4 | 2 | M | 2 |
| 97 | Confirm the admin "Campaign HQ" section is the first thing the artist sees after the welcome state | ADM | 4 | 2 | M | 2 |
| 98 | Confirm there are no orphaned steps in the wizard that write data but are no longer shown in the flow | STR | 3 | 2 | L | 3 |
| 99 | Confirm the copy on every screen of the first-artist journey has been reviewed against the copy doctrine — no banned phrases | ALL | 4 | 2 | M | 2 |
| 100 | Confirm `STATUS.md` is updated to mark J9 complete with the date of the first-artist live walkthrough and the name of the tester | DOC | 2 | 1 | L | 6 |
