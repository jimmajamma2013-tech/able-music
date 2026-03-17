# Dimension I3 — Fan Data Export
**Category:** Legal, Compliance & Accessibility
**Phase:** 9

*Artists must be able to export their complete fan list as a CSV at any time and on any tier. Fan data export is simultaneously a GDPR right to data portability obligation (the artist as controller must be able to provide this data) and a core product promise — ABLE's differentiation from algorithm-owned platforms is that the artist owns their fan relationships. Locking export behind a paid tier would contradict this promise and expose ABLE to a GDPR enforcement risk.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Locate the current fan export implementation in admin.html — identify the exact function and the button that triggers it | ADM | 5 | 1 | L | 1 |
| 2 | Confirm fan export is accessible on the free tier — the export button must not be behind a gold lock overlay or disabled for free users | ADM | 5 | 1 | H | 1 |
| 3 | Confirm fan export is accessible on Artist tier | ADM | 5 | 1 | H | 1 |
| 4 | Confirm fan export is accessible on Artist Pro tier | ADM | 5 | 1 | H | 1 |
| 5 | Confirm fan export is accessible on the Label tier | ADM | 5 | 1 | H | 1 |
| 6 | Confirm the export button is keyboard accessible — can be reached by Tab and activated by Enter/Space | ADM | 4 | 1 | L | 1 |
| 7 | Confirm the export button has a minimum 44px tap target on mobile | ADM | 4 | 1 | L | 1 |
| 8 | Confirm the export button has an accessible label — `aria-label="Export fan list as CSV"` or visible text that is unambiguous | ADM | 4 | 1 | L | 1 |
| 9 | Confirm the CSV includes the fan's email address as the first column | ADM | 5 | 1 | H | 1 |
| 10 | Confirm the CSV includes the signup date and time as a separate column | ADM | 5 | 1 | H | 1 |
| 11 | Confirm the signup date format in the export — ISO 8601 (`2026-03-17T14:32:00Z`) is unambiguous and recommended | ADM | 4 | 1 | M | 1 |
| 12 | Consider providing a human-readable date column alongside the ISO date — "17 March 2026 14:32" — for artists who open CSVs in Excel without date parsing | ADM | 3 | 2 | L | 3 |
| 13 | Confirm the CSV includes the source attribution as a column (e.g. "instagram", "tiktok", "direct", "qr-code") | ADM | 5 | 1 | H | 1 |
| 14 | Confirm the CSV includes the campaign state at the time of sign-up as a column (e.g. "profile", "pre-release", "live", "gig") | ADM | 4 | 2 | M | 2 |
| 15 | Add the consent timestamp as a column in the export — this is essential GDPR evidence; the artist (as controller) must be able to demonstrate when consent was given | ADM | 5 | 2 | H | 1 |
| 16 | Add the consent version identifier as a column in the export — e.g. "v1" | ADM | 5 | 2 | H | 1 |
| 17 | Add the starred status as a boolean column ("starred": true/false or 1/0) | ADM | 3 | 1 | L | 2 |
| 18 | Confirm the column headers in the exported CSV are clear and descriptive — "email", "signup_date", "source", "campaign_state", "consent_timestamp", "consent_version", "starred" | ADM | 4 | 1 | L | 1 |
| 19 | Confirm the CSV is encoded in UTF-8 with BOM (`\uFEFF` prefix) — this ensures correct character display when opened in Microsoft Excel on Windows | ADM | 4 | 2 | M | 1 |
| 20 | Test the CSV export with an email containing non-ASCII characters (e.g. `üniform@example.com`) — UTF-8 with BOM must handle these correctly | ADM | 3 | 2 | L | 2 |
| 21 | Test the CSV export with a fan source containing a comma (e.g. if source were "instagram, story") — values containing commas must be quoted in the CSV | ADM | 4 | 2 | M | 2 |
| 22 | Test the CSV export with a fan email containing a double-quote character — CSV must escape double quotes by doubling them | ADM | 3 | 2 | L | 2 |
| 23 | Confirm the filename format of the downloaded CSV — recommend `able-fans-[artist-name]-[date].csv` for clarity when an artist manages multiple exports | ADM | 4 | 1 | L | 1 |
| 24 | Confirm the date in the filename uses ISO format (`2026-03-17`) to ensure correct alphabetical sorting | ADM | 3 | 1 | L | 2 |
| 25 | Confirm the download is triggered via a Blob URL + anchor click pattern and not a server-side download request — this keeps the export working on free tier without any backend | ADM | 5 | 2 | H | 1 |
| 26 | Verify the Blob URL is revoked after the download triggers — `URL.revokeObjectURL(url)` prevents memory leaks | ADM | 3 | 1 | L | 2 |
| 27 | Confirm the export does not fail silently — if the fan list is empty, a meaningful message is shown ("You don't have any fans yet") rather than downloading an empty or broken file | ADM | 4 | 1 | M | 1 |
| 28 | Define what happens when there are 0 fans — should the export button still appear? Recommend yes, showing an empty CSV with headers only (rather than no file), or a helpful explanation | ADM | 3 | 2 | L | 2 |
| 29 | Test export with exactly 0 fans — verify the downloaded CSV contains only the header row and is a valid CSV | ADM | 4 | 2 | L | 2 |
| 30 | Test export with 1 fan — verify correct output | ADM | 4 | 1 | L | 1 |
| 31 | Test export with 100 fans — verify no performance issues, no truncation | ADM | 4 | 2 | L | 2 |
| 32 | Test export with 2,000 fans (Artist Pro limit) — verify the Blob creation and download does not hang on mobile | ADM | 4 | 3 | M | 3 |
| 33 | Add a privacy reminder shown to the artist before or after export — "This file contains personal data. Store it securely and do not share it with third parties." | ADM | 4 | 2 | M | 2 |
| 34 | Confirm the privacy reminder is dismissible and does not block the export — it should be advisory, not a gate | ADM | 3 | 1 | L | 2 |
| 35 | Consider logging each export event in the admin analytics — timestamp, number of fans exported, tier — for GDPR accountability (Article 5(2) accountability principle) | ADM | 4 | 3 | M | 3 |
| 36 | Add an export audit trail to the `able_clicks` or a new `able_exports` localStorage key — stores `{ts, fanCount}` per export | ADM | 3 | 2 | L | 3 |
| 37 | Confirm export audit trail entries are included when migrating to Supabase — the `exports` table should record who exported when | DOC | 4 | 2 | M | 3 |
| 38 | Confirm export is also available when admin.html is accessed on the Label tier for any of the 10 managed artist pages — not just the primary account | ADM | 4 | 3 | M | 3 |
| 39 | Add a "Export all artists" option for Label tier — a single CSV with all fans across all managed artists, with an `artist_name` column as identifier | ADM | 3 | 5 | L | 4 |
| 40 | Confirm the export function reads from the `able_fans` localStorage key correctly — verify key name matches the canonical schema | ADM | 5 | 1 | H | 1 |
| 41 | Confirm the export function reads starred fans from `able_starred_fans` and joins this information to the main fan list correctly | ADM | 4 | 2 | M | 2 |
| 42 | Add an option to export starred fans only — a second export button or a toggle — useful for artists who want to contact their most engaged fans | ADM | 3 | 3 | L | 3 |
| 43 | Confirm the "export starred only" option clearly labels the downloaded file to distinguish it from a full export (`able-fans-starred-...csv`) | ADM | 3 | 1 | L | 3 |
| 44 | Confirm the exported CSV does not include any data that was not stated in the privacy policy — no hidden fields | ADM | 5 | 1 | H | 1 |
| 45 | Confirm the exported CSV format is documented in the privacy policy — "Your fan list can be exported as a CSV containing: email, signup date, source, campaign state, consent record" | PRV | 4 | 2 | M | 2 |
| 46 | Confirm the exported CSV does not include ABLE internal IDs or system metadata that would confuse artists or expose internal architecture | ADM | 3 | 1 | L | 2 |
| 47 | Confirm the export is triggered by the artist action only — no automated export, no third-party access to the exported file | ADM | 5 | 1 | H | 1 |
| 48 | After Supabase migration: confirm the export function queries the `fans` Supabase table with the correct `artist_id` filter — never export another artist's fans | ADM | 5 | 3 | H | 3 |
| 49 | After Supabase migration: confirm the export uses the Supabase anon key with RLS (Row Level Security) policies that restrict a user to their own fans | ADM | 5 | 3 | H | 3 |
| 50 | After Supabase migration: confirm the export function handles large datasets via pagination or streaming — do not `SELECT *` without limit on a table that could have millions of rows | ADM | 4 | 4 | M | 3 |
| 51 | Confirm the export button is clearly findable in the admin UI — should be visible on the main fans panel without requiring additional navigation | ADM | 4 | 1 | L | 1 |
| 52 | Confirm the export button is not buried inside a settings page — artists should not need to hunt for a basic data right | ADM | 4 | 1 | L | 1 |
| 53 | Confirm the export function has a loading state — on large fan lists, the Blob creation takes a moment; the button should show feedback | ADM | 3 | 2 | L | 2 |
| 54 | Confirm the export function has an error state — if the Blob creation fails (e.g. browser storage issue), the artist is told and the export does not silently fail | ADM | 4 | 2 | M | 2 |
| 55 | Confirm the export button copy uses a direct verb — "Export fan list" or "Download CSV" not "Get data" or "Fan export" | ADM | 4 | 1 | L | 1 |
| 56 | Confirm the copy around the export explains what the fan will receive — "CSV includes email, signup date, source, and consent record" | ADM | 4 | 1 | L | 2 |
| 57 | Add a "last exported" timestamp display near the export button — shows the artist when they last exported, helpful for keeping their external tools in sync | ADM | 3 | 2 | L | 3 |
| 58 | Verify the export function is not exposed as an API endpoint without authentication — no `/api/export-fans` route without Supabase auth guard | ADM | 5 | 2 | H | 2 |
| 59 | Write a Playwright smoke test for the export function — sign up a test fan, open admin, click export, verify a CSV file download is triggered | ADM | 5 | 4 | L | 3 |
| 60 | Write a unit test for the CSV generation function — given a known input array of fan objects, verify the output CSV string matches the expected format | ADM | 4 | 3 | L | 3 |
| 61 | Confirm the export function handles the case where `able_fans` contains malformed JSON — wrap the `JSON.parse` in a try/catch | ADM | 4 | 1 | M | 2 |
| 62 | Confirm the export function handles the case where `able_fans` is `null` (key exists but value is null) — treat as empty array | ADM | 4 | 1 | M | 2 |
| 63 | Confirm the export function handles the case where a fan object is missing expected fields (e.g. no `source` field) — output empty string for missing fields rather than "undefined" | ADM | 4 | 2 | M | 2 |
| 64 | Confirm email addresses in the export are not normalised (lowercased/trimmed) without recording that transformation — if normalisation happens at sign-up, document it; if at export, don't | ADM | 3 | 1 | L | 2 |
| 65 | Add an `imported_from` column to the CSV schema for when ABLE adds a fan import feature — allows artists to distinguish between fans captured directly and imported lists | ADM | 2 | 2 | L | 4 |
| 66 | Add a `notes` column to the fan record schema for future use — artists may want to annotate specific fans (e.g. "met at Manchester gig") | ADM | 2 | 3 | L | 4 |
| 67 | Confirm the export does not include deleted or unsubscribed fans — or if it does, they are clearly labelled with `unsubscribed: true` and the unsubscribe date | ADM | 5 | 2 | H | 2 |
| 68 | Define whether unsubscribed fans are hard-deleted from the list or soft-deleted (retained with an `unsubscribed` flag) — soft-delete is better for GDPR accountability; document the decision | ADM | 5 | 3 | H | 2 |
| 69 | If soft-deleted, confirm unsubscribed fans are excluded from the default export but can be included in a "full audit" export option | ADM | 4 | 3 | M | 3 |
| 70 | Add an `unsubscribed_at` column to the fan schema for fans who have unsubscribed — store the ISO timestamp of the unsubscribe event | ADM | 5 | 2 | H | 2 |
| 71 | Add `unsubscribe_source` column — "email-link", "admin-manual", "data-request" to distinguish how the fan was removed | ADM | 3 | 2 | L | 3 |
| 72 | Confirm the export distinguishes between fans who signed up during different campaign states in the column headers and values — this data is useful for artist analytics | ADM | 3 | 2 | L | 3 |
| 73 | Confirm the export is triggered client-side only — no server request is made that could expose the fan list to ABLE's infrastructure unnecessarily | ADM | 5 | 1 | H | 1 |
| 74 | Add the artist's name and ABLE page URL to the exported CSV metadata row (row 0, before headers) or in the filename — helps artists identify which file belongs to which page when they have multiple exports | ADM | 3 | 2 | L | 3 |
| 75 | Confirm the MIME type of the downloaded file is set to `text/csv` not `application/octet-stream` — ensures browsers open/handle the file correctly | ADM | 4 | 1 | L | 1 |
| 76 | Test the export download on iOS Safari — Blob downloads behave differently on iOS; verify the file downloads correctly rather than opening in browser | ADM | 4 | 3 | M | 2 |
| 77 | Test the export download on Chrome Android — verify the file goes to the downloads folder | ADM | 4 | 2 | M | 2 |
| 78 | Test the export download on Firefox desktop | ADM | 3 | 2 | L | 3 |
| 79 | Verify the export works correctly when the artist's fan list is in the `able_fans` key (not `able_fans_v2` or any other variant that might exist from schema migrations) | ADM | 5 | 1 | H | 1 |
| 80 | Add a visual indicator on the admin fans panel showing the total number of fans, so artists have a sanity check that the export contains the expected number of rows | ADM | 4 | 1 | L | 1 |
| 81 | Confirm the fan count in the export CSV matches the fan count shown in the admin UI | ADM | 5 | 2 | H | 1 |
| 82 | Confirm there is no cap on the number of fans that can be exported on any tier — exporting is a data right, not a feature | ADM | 5 | 1 | H | 1 |
| 83 | Confirm the export does not time out for very large lists — use a Web Worker for CSV generation if list exceeds 10,000 fans to avoid blocking the main thread | ADM | 3 | 5 | L | 4 |
| 84 | Add a data responsibility notice in the admin email broadcast section — "Only send emails to fans who signed up through ABLE. Do not upload this list to a platform that will re-purpose it." | ADM | 4 | 2 | L | 3 |
| 85 | Confirm the export function is documented in the admin help text or onboarding flow — artists should know it exists, especially if they want to migrate to a dedicated ESP | ADM | 3 | 2 | L | 2 |
| 86 | Consider adding a "direct import to Mailchimp/Klaviyo" feature in the future — but confirm this is out of scope for V1 and not inadvertently built | ADM | 2 | 5 | L | 4 |
| 87 | Confirm the export function's source code is reviewed for any unintentional data exposure — e.g. does it accidentally include artist's private notes or internal metadata? | ADM | 5 | 2 | H | 2 |
| 88 | Confirm the export is available immediately after the first fan signs up — no minimum fan count required | ADM | 4 | 1 | L | 1 |
| 89 | Add a contextual help tooltip near the export button explaining what the export contains and what it can be used for | ADM | 3 | 2 | L | 3 |
| 90 | Confirm the export function does not rate-limit artists from exporting — there is no business reason to limit how often artists access their own data | ADM | 4 | 1 | L | 1 |
| 91 | Confirm the CSV column order is consistent across all exports regardless of browser or OS — do not rely on JavaScript object key order for column ordering; use an explicit column array | ADM | 5 | 2 | H | 1 |
| 92 | Confirm the first row of the CSV is always the header row — no BOM byte causes the first header to be corrupted in some parsers | ADM | 4 | 2 | M | 1 |
| 93 | Consider adding a JSON export option alongside CSV — useful for developers importing to custom systems | ADM | 2 | 3 | L | 4 |
| 94 | Confirm that when future email broadcast feature is built, it uses the same `able_fans` data source as the export — no divergence between what is exported and what can be emailed | ADM | 5 | 2 | H | 3 |
| 95 | Add a "data portability" section to privacy.html describing the CSV export — confirms the right to portability is honoured | PRV | 4 | 2 | M | 2 |
| 96 | Confirm the export copy in the admin is in the ABLE voice — "Download your fan list" not "Export data" | ADM | 3 | 1 | L | 2 |
| 97 | Verify the export button is visible without scrolling on a standard 812px screen height (iPhone 13 landscape) | ADM | 3 | 1 | L | 2 |
| 98 | Verify the export button is visible on a 667px screen height (iPhone SE) — may require scrolling but must not require knowing it exists | ADM | 3 | 1 | L | 2 |
| 99 | Add a Playwright test that: adds 3 test fans to localStorage, opens admin, clicks export, reads the downloaded file, and verifies correct CSV content including all required columns | ADM | 4 | 4 | L | 3 |
| 100 | Final check: download an export on every tier (mock free and pro tier states), verify the file opens correctly in Excel (Mac and Windows), Google Sheets, and Numbers, and all 100 fan records are present with correct column values | ADM | 5 | 3 | M | 4 |

## Wave Summary
**Wave 1 — Core functionality and legal requirements**: items #1–#16, #18–#19, #23, #25–#27, #30, #40–#41, #44, #47, #51–#52, #55, #73, #75, #79, #81–#82, #88, #91–#92
**Wave 2 — Data integrity and edge cases**: items #17, #20–#22, #24, #28–#29, #31, #33–#34, #46, #53–#54, #61–#64, #67–#68, #70, #76–#77, #80
**Wave 3 — Audit trail, access control, and Supabase**: items #35–#39, #42–#43, #45, #48–#50, #56–#58, #69, #71–#74, #84–#87
**Wave 4 — Testing, UX polish, and future-proofing**: items #32, #59–#60, #65–#66, #78, #83, #85–#86, #89–#90, #93–#100
