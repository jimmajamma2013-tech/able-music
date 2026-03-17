# Dimension I4 — Fan Unsubscribe
**Category:** Legal, Compliance & Accessibility
**Phase:** 9

*Every fan who signs up must have a clear, unconditional, and instant way to leave the artist's list. This is simultaneously a UK GDPR right to erasure (Article 17), a PECR requirement for commercial email, and a basic product integrity promise. The unsubscribe mechanism must work end-to-end — from the link in the email, through the confirmation flow, to the actual removal of the fan's data.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm an unsubscribe link is present in every fan confirmation email sent from ABLE — this is a PECR requirement | V8 | 5 | 2 | H | 1 |
| 2 | Confirm the unsubscribe link is in the footer of every subsequent email sent by the artist to their fan list | V8 | 5 | 2 | H | 1 |
| 3 | Confirm the unsubscribe link uses a URL that includes a secure token identifying the fan — e.g. `ablemusic.co/unsubscribe?token=abc123` — not a plaintext email parameter | V8 | 5 | 3 | H | 1 |
| 4 | Confirm the unsubscribe token is non-guessable — use a UUID or HMAC-signed identifier, not a sequential ID or plain email address in the URL | V8 | 5 | 3 | H | 1 |
| 5 | Confirm the unsubscribe URL is unique per fan per artist — a fan following two artists should have two different unsubscribe tokens | V8 | 5 | 3 | H | 2 |
| 6 | Confirm clicking the unsubscribe link requires no login — fans must not need an ABLE account to unsubscribe | V8 | 5 | 2 | H | 1 |
| 7 | Confirm clicking the unsubscribe link requires no additional steps beyond a single confirmation — no "are you sure?" email, no multi-step form | V8 | 4 | 2 | M | 1 |
| 8 | Confirm the unsubscribe page confirms to the fan what has happened — "You've been removed from [Artist]'s list." not just a blank page or a 200 OK response | V8 | 4 | 2 | M | 1 |
| 9 | Confirm the unsubscribe confirmation message names the artist whose list the fan has left — avoids confusion for fans following multiple artists | V8 | 4 | 2 | M | 1 |
| 10 | Confirm the unsubscribe confirmation page offers no upsell, no re-subscribe prompt, and no "tell us why" survey — respect the fan's decision | V8 | 4 | 1 | L | 2 |
| 11 | Confirm the unsubscribe action is permanent unless the fan re-signs-up themselves — no "undo" option that could confuse whether they are subscribed | V8 | 4 | 1 | M | 2 |
| 12 | Define whether unsubscribed fans are soft-deleted (marked as `unsubscribed: true`) or hard-deleted from the `able_fans` array — and document the decision | ADM | 5 | 2 | H | 1 |
| 13 | Recommend soft-delete for GDPR accountability — the artist (as data controller) needs to be able to demonstrate that a fan who later claims "you emailed me after I unsubscribed" did in fact unsubscribe on a specific date | ADM | 5 | 2 | M | 1 |
| 14 | Ensure soft-deleted fans are never included in email sends, fan count stats, or export by default — the `unsubscribed: true` flag must be respected everywhere | ADM | 5 | 2 | H | 1 |
| 15 | Store the `unsubscribedAt` ISO timestamp on the fan record when they unsubscribe | ADM | 5 | 2 | H | 1 |
| 16 | Store the `unsubscribeSource` on the fan record — "email-link", "admin-manual", "data-request", "account-deletion" | ADM | 4 | 2 | M | 2 |
| 17 | Confirm the admin fan list view shows unsubscribed fans distinctly (e.g. greyed out with an "unsubscribed" label) when viewing a full list | ADM | 4 | 2 | M | 2 |
| 18 | Confirm the admin fan count stat excludes unsubscribed fans — the artist's "47 fans" stat should reflect active subscribers only | ADM | 4 | 2 | M | 1 |
| 19 | Add an unsubscribed count visible somewhere in admin — "3 unsubscribed" shown below the active fan count, so artists have full visibility | ADM | 3 | 2 | L | 3 |
| 20 | Confirm the admin does not show unsubscribed fans alongside active fans without differentiation — mixing them would mislead the artist about their list quality | ADM | 4 | 1 | M | 1 |
| 21 | Add an "unsubscribed fans" section in the export — optional toggle to include soft-deleted fans in the CSV with their unsubscribe timestamp, for full GDPR audit trail | ADM | 4 | 3 | M | 3 |
| 22 | Confirm the artist cannot manually re-subscribe a fan who unsubscribed via email link — the fan must take that action themselves | ADM | 5 | 2 | H | 2 |
| 23 | Confirm the artist CAN manually remove a fan from their list (admin-initiated removal) — this is a right the artist has as the data controller | ADM | 4 | 2 | M | 2 |
| 24 | Confirm admin-initiated removal is logged with `unsubscribeSource: "admin-manual"` and the timestamp | ADM | 4 | 2 | M | 2 |
| 25 | Confirm a fan who manually unsubscribes can re-sign-up through the artist's ABLE page — a returning fan giving fresh consent is a valid new subscription | V8 | 5 | 2 | H | 1 |
| 26 | Confirm that re-signing-up creates a new fan record with a new consent timestamp — the old unsubscribed record should not be overwritten | V8 | 5 | 3 | H | 2 |
| 27 | Confirm the re-sign-up flow does not show the fan a "you're already subscribed" error — they unsubscribed, so the system should treat fresh consent as a new sign-up | V8 | 4 | 2 | M | 2 |
| 28 | Confirm the unsubscribe flow works without JavaScript — the link in the email should point to a URL that processes the unsubscribe server-side, not a client-side JavaScript function | V8 | 5 | 4 | H | 2 |
| 29 | Design the unsubscribe Netlify function — receives the token, looks up the fan record, marks as unsubscribed in Supabase, returns a confirmation page | V8 | 5 | 5 | H | 2 |
| 30 | Ensure the unsubscribe Netlify function is not susceptible to token enumeration — rate-limit requests and use non-guessable tokens | V8 | 5 | 3 | H | 2 |
| 31 | Ensure the unsubscribe Netlify function handles expired tokens gracefully — if a fan clicks a very old unsubscribe link, show a helpful message not a 500 error | V8 | 3 | 2 | L | 3 |
| 32 | Ensure the unsubscribe Netlify function handles already-unsubscribed tokens gracefully — "you've already been removed from this list" is a valid and helpful response | V8 | 4 | 2 | M | 2 |
| 33 | Ensure the unsubscribe Netlify function handles invalid tokens gracefully — show a generic "this link doesn't work" page, not an internal error | V8 | 4 | 2 | M | 2 |
| 34 | Confirm the unsubscribe Netlify function sets correct HTTP status codes — 200 for success, not 302 redirect to a page that might not load | V8 | 3 | 1 | L | 3 |
| 35 | For the pre-Supabase localStorage phase: document the gap — the unsubscribe link in emails cannot trigger a localStorage update in a different browser session; acknowledge this and document the interim workaround (manual removal by artist) | ADM | 5 | 2 | M | 1 |
| 36 | During the localStorage phase: ensure the fan confirmation email includes a data request contact email — "to remove yourself from this list before we launch our full unsubscribe system, email privacy@ablemusic.co" | V8 | 5 | 2 | H | 1 |
| 37 | Track the total number of unsubscribes as a metric in admin analytics — unsubscribe rate is a signal of list health | ADM | 3 | 3 | L | 3 |
| 38 | Notify the artist when a fan unsubscribes — a subtle notification in the admin dashboard ("1 new unsubscribe") rather than an email per unsubscribe | ADM | 3 | 3 | L | 3 |
| 39 | Ensure the artist notification of unsubscribe does not name the fan — "Someone left your list" not "emily@example.com unsubscribed"; the fan's privacy is respected even in departure | ADM | 4 | 2 | M | 3 |
| 40 | Confirm GDPR right to erasure requests (Article 17) are handled within one calendar month — unsubscribe alone is not a full erasure; erasure removes all stored data about the fan | ADM | 5 | 4 | H | 3 |
| 41 | Define the difference between "unsubscribe" (opt out of emails, keep the record) and "erasure" (delete all data) in the privacy policy and admin help text | PRV | 5 | 2 | M | 2 |
| 42 | Add a "Request full data deletion" option in the admin — the artist can process a fan's erasure request from the admin panel | ADM | 4 | 4 | M | 3 |
| 43 | Confirm full data deletion removes all traces of the fan record, not just the email — timestamp, source, consent record, analytics events associated with that fan | ADM | 5 | 3 | H | 3 |
| 44 | After Supabase migration: confirm the deletion is cascaded — removing a fan from `fans` table also removes their records from any linked tables | ADM | 5 | 3 | H | 3 |
| 45 | Confirm an audit log entry is created when a fan record is fully deleted — who deleted it (artist or ABLE), when, and in response to what (erasure request or artist action) | ADM | 5 | 3 | M | 3 |
| 46 | Confirm the unsubscribe process is tested on the current development build — manually trigger the flow and verify the fan is removed from the admin list | ADM | 5 | 2 | H | 1 |
| 47 | Write a Playwright smoke test: sign up a fan, open admin, manually remove them, verify fan count decrements and fan no longer appears in list | ADM | 5 | 4 | L | 3 |
| 48 | Confirm the unsubscribe confirmation page is accessible — correct semantic HTML, heading structure, focus management | V8 | 4 | 2 | L | 2 |
| 49 | Confirm the unsubscribe confirmation page is mobile-first — same design tokens and layout as the main ABLE brand | V8 | 3 | 2 | L | 2 |
| 50 | Confirm the unsubscribe confirmation page does not require the fan to be logged in or have an ABLE account | V8 | 5 | 1 | H | 1 |
| 51 | Confirm the unsubscribe link in the email is a full HTTPS URL, not a relative path — email clients will not resolve relative URLs | V8 | 5 | 1 | H | 1 |
| 52 | Confirm the unsubscribe link text in emails is clear — "Unsubscribe" rather than a small legal note at the bottom | V8 | 4 | 1 | M | 1 |
| 53 | Confirm the unsubscribe link is visually distinct from other links in the email — not hidden in a wall of grey text | V8 | 4 | 1 | M | 2 |
| 54 | Confirm the unsubscribe link is at least 44px tap target height in the email — mobile email clients need tappable links | V8 | 4 | 2 | M | 2 |
| 55 | Test the unsubscribe link in Gmail on iOS — verify it renders as a link, not a phone number auto-detected by iOS | V8 | 3 | 2 | L | 3 |
| 56 | Test the unsubscribe link in Apple Mail on iOS | V8 | 3 | 2 | L | 3 |
| 57 | Test the unsubscribe link in Outlook on desktop | V8 | 3 | 2 | L | 3 |
| 58 | Confirm the unsubscribe mechanism is not affected by email image blocking — the unsubscribe is a text link, not an image map | V8 | 4 | 1 | L | 1 |
| 59 | Confirm the unsubscribe token in the URL is URL-safe — base64url encoded or UUID, not standard base64 which contains `+` and `/` characters that can break URLs | V8 | 5 | 2 | H | 2 |
| 60 | Confirm the unsubscribe token is stored in the fan record at the time of sign-up — both in localStorage and Supabase — not generated at email-send time | ADM | 5 | 3 | H | 2 |
| 61 | Confirm token rotation on re-subscribe — if a fan unsubscribes and re-subscribes, they get a new token; the old token is invalidated | ADM | 4 | 3 | M | 3 |
| 62 | Add the `unsubscribeToken` field to the `able_fans` schema in `docs/systems/data-architecture/SPEC.md` | DOC | 5 | 1 | M | 1 |
| 63 | Add the `unsubscribed` boolean field to the schema | DOC | 5 | 1 | H | 1 |
| 64 | Add the `unsubscribedAt` ISO timestamp field to the schema | DOC | 5 | 1 | H | 1 |
| 65 | Add the `unsubscribeSource` enum field to the schema | DOC | 4 | 1 | M | 2 |
| 66 | Confirm the Supabase `fans` table (when created) has columns for all of the above: `unsubscribe_token`, `unsubscribed`, `unsubscribed_at`, `unsubscribe_source` | DOC | 5 | 2 | H | 2 |
| 67 | Confirm Supabase RLS policies prevent a fan from unsubscribing another fan by guessing tokens — the unsubscribe function should use service-role key or a properly scoped policy | ADM | 5 | 3 | H | 3 |
| 68 | Confirm the unsubscribe process is mentioned in the fan confirmation email body not just the footer — "you can leave at any time" at the top of the email reduces anxiety about signing up | V8 | 4 | 2 | L | 2 |
| 69 | Confirm the admin bulk email feature (Artist Pro) automatically appends the unsubscribe link to every email — artists must not be able to send emails without it | ADM | 5 | 3 | H | 3 |
| 70 | Confirm the unsubscribe link in broadcast emails is unique per fan, not a single shared link — shared links allow one fan to unsubscribe all fans | ADM | 5 | 3 | H | 3 |
| 71 | Confirm the unsubscribe mechanism complies with the Spam Act equivalent in the UK — PECR requires a working unsubscribe mechanism in all commercial electronic communications | V8 | 5 | 2 | H | 1 |
| 72 | Confirm the unsubscribe is processed immediately — not "within 5-10 business days"; PECR requires the unsubscribe to be actioned "as soon as reasonably practicable"; instant is achievable | V8 | 5 | 2 | H | 1 |
| 73 | Confirm ABLE does not send any further emails to a fan after they unsubscribe — the confirmation email is the last contact | V8 | 5 | 2 | H | 1 |
| 74 | Define whether the fan receives a confirmation email after unsubscribing — one final email "you've been removed" is helpful and creates a paper trail; but ensure this is the only further contact | V8 | 3 | 2 | L | 2 |
| 75 | If a post-unsubscribe confirmation email is sent: confirm it does not require re-opt-in to receive it — it is a transactional confirmation, not a marketing email | V8 | 4 | 2 | M | 2 |
| 76 | Confirm the artist cannot override the unsubscribe — once a fan has unsubscribed, the artist's admin cannot add them back to the active list manually | ADM | 5 | 2 | H | 2 |
| 77 | Confirm ABLE's own platform communications to artists have a separate unsubscribe mechanism — artists must be able to unsubscribe from ABLE emails | STR | 4 | 3 | M | 2 |
| 78 | Confirm the unsubscribe page is not indexed by search engines — `<meta name="robots" content="noindex">` on the unsubscribe confirmation page | V8 | 3 | 1 | L | 2 |
| 79 | Confirm the unsubscribe token in the URL is not logged by web analytics tools — strip the token before logging the page view | V8 | 4 | 2 | M | 2 |
| 80 | Confirm Netlify's server logs do not permanently retain the unsubscribe token in access logs — if they do, set a log retention policy | V8 | 3 | 3 | L | 3 |
| 81 | Confirm the unsubscribe page is served over HTTPS — any unsubscribe URL must be HTTPS to prevent token interception | V8 | 5 | 1 | H | 1 |
| 82 | Confirm the unsubscribe Netlify function validates the token length and format before querying the database — prevents injection attacks | V8 | 5 | 2 | H | 2 |
| 83 | Confirm the unsubscribe Netlify function uses parameterised queries (Supabase client handles this) — no raw SQL construction | V8 | 5 | 2 | H | 2 |
| 84 | Confirm the unsubscribe page does not expose the artist's name in the page title or URL — the URL should contain only the token, not identifying artist information | V8 | 3 | 1 | L | 3 |
| 85 | Confirm the unsubscribe confirmation page has clear ABLE branding so the fan understands who processed their request | V8 | 3 | 2 | L | 2 |
| 86 | Confirm the unsubscribe confirmation page has a link back to ablemusic.co — not to the artist's profile, as the fan has just left it | V8 | 2 | 1 | L | 3 |
| 87 | Confirm the unsubscribe mechanism handles the case where the fan's email address has changed since sign-up — the token identifies the record, not the email, so this is handled | V8 | 4 | 1 | L | 2 |
| 88 | Confirm the unsubscribe mechanism handles concurrent unsubscribe requests for the same token — idempotent behaviour required; second request should succeed silently | V8 | 4 | 2 | M | 3 |
| 89 | Add the unsubscribe mechanism details to the privacy policy — "Fans can unsubscribe by clicking the unsubscribe link in any artist email. This takes effect immediately." | PRV | 5 | 1 | M | 1 |
| 90 | Add the unsubscribe mechanism details to the terms of service — artists are required to use ABLE's email system which includes mandatory unsubscribe links | TRM | 4 | 1 | M | 2 |
| 91 | Confirm the admin shows the unsubscribe link URL format to artists so they understand it is being handled — optional transparency feature | ADM | 2 | 2 | L | 4 |
| 92 | Add an admin feature for the artist to see when a fan last received an email and whether they unsubscribed after it — connects email activity to list health | ADM | 3 | 5 | L | 4 |
| 93 | Confirm the unsubscribe mechanism works across all artist profile themes — not just the default dark theme | V8 | 3 | 1 | L | 2 |
| 94 | Consider a "manage preferences" page instead of a hard unsubscribe — this is better UX but adds complexity; document the decision for V2 | DOC | 2 | 5 | L | 4 |
| 95 | Confirm the unsubscribe link in the email footer uses the artist's confirmed sender domain, not a generic ABLE domain — this aids deliverability | V8 | 4 | 3 | M | 3 |
| 96 | Confirm the current Resend integration (when active) supports per-fan unsubscribe links via its API — verify this capability exists before designing around it | V8 | 5 | 2 | H | 2 |
| 97 | Document the interim unsubscribe process for the period before Supabase is live — fan emails a request; ABLE or artist manually removes from localStorage; confirm response within 30 days | DOC | 5 | 2 | H | 1 |
| 98 | Add the interim process to the privacy policy — "During our early access period, unsubscribe requests are processed manually within 7 days. Email privacy@ablemusic.co." | PRV | 5 | 2 | H | 1 |
| 99 | Set a target date for replacing the interim process with the automated Supabase-backed unsubscribe function — makes the gap timeboxed rather than open-ended | DOC | 4 | 1 | M | 1 |
| 100 | Final check: send a test fan confirmation email, click the unsubscribe link, confirm the fan is removed from the list, confirm no further emails are sent, confirm the admin reflects the change | V8 | 5 | 2 | H | 4 |

## Wave Summary
**Wave 1 — Legal must-haves before first fan email**: items #1–#2, #6–#9, #12–#15, #25, #35–#36, #46, #50–#52, #62–#64, #71–#73, #81, #89, #97–#99
**Wave 2 — Complete the mechanism**: items #3–#5, #10–#11, #16–#20, #22–#24, #26–#29, #32–#34, #37, #41, #48, #51, #58–#61, #66, #68
**Wave 3 — Supabase and post-launch hardening**: items #28–#31, #38–#45, #47, #49, #53–#57, #67, #69–#70, #74–#77, #82–#84, #87–#90, #95–#96
**Wave 4 — UX polish and future features**: items #21, #37, #69, #78–#80, #85–#86, #88, #91–#94, #100
