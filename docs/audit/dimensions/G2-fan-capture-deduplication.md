# Dimension G2 — Fan Capture Deduplication
**Category:** Core Product Logic & User Flows
**Phase:** 1 (Foundation)
**Status:** Not started

*The fan list is an artist's most valuable asset on ABLE. If a fan signs up twice with the same email address and two records are created, the artist's stats are inflated, email broadcasts are sent twice to the same person, and the "first fan" milestone can fire incorrectly. Deduplication must be enforced at the point of submission — the second attempt should return a different confirmation than a new sign-up, handle the UX gracefully, and never create a duplicate record. This dimension covers the full deduplication logic in able-v8.html, the grace handling UX, the edge case of case-insensitive matching, and the analytics impact of deduplication.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Before adding to able_fans, check if the email (case-insensitive) already exists in the array | V8 | 5 | 1 | H | 1 |
| 2 | Return a different response for duplicate sign-up: "You're already on [Artist]'s list." not the success message | V8 | 5 | 1 | L | 1 |
| 3 | Normalise email to lowercase before comparison and before storage | V8 | 5 | 1 | M | 1 |
| 4 | Do not fire a fan-count increment when a duplicate email submits | V8 | 5 | 1 | M | 1 |
| 5 | Do not fire the first-fan milestone when a duplicate email submits | V8 | 4 | 1 | M | 1 |
| 6 | Duplicate response should use warm language: "You're already on the list. You won't miss anything." | V8 | 4 | 1 | L | 2 |
| 7 | Do not fire an analytics click event for duplicate sign-up submissions | V8 | 4 | 1 | M | 1 |
| 8 | Test edge case: fan signs up with EMAIL@DOMAIN.COM after already being on list as email@domain.com | V8 | 4 | 1 | M | 1 |
| 9 | Test edge case: fan signs up with trailing whitespace in email field | V8 | 3 | 1 | L | 2 |
| 10 | Trim email value before comparison and before storage | V8 | 4 | 1 | L | 1 |
| 11 | The duplicate confirmation message must not show any artist-side data (fan count, etc.) | V8 | 3 | 1 | L | 2 |
| 12 | When Supabase is added, deduplication must happen server-side — not rely on client-side check alone | V8 | 5 | 3 | H | 4 |
| 13 | Supabase unique constraint on email+artist_id pair must be set at database level | V8 | 5 | 2 | H | 4 |
| 14 | Client-side dedup check remains as an optimistic UX improvement even after server-side dedup exists | V8 | 3 | 2 | L | 4 |
| 15 | Handle localStorage parse errors gracefully — if able_fans is corrupted, default to empty array, not crash | V8 | 4 | 1 | H | 1 |
| 16 | Add deduplication to the admin "manual add fan" flow if one exists | ADM | 4 | 1 | M | 2 |
| 17 | Admin fan list display must not show duplicate emails — add dedup on read if duplicates somehow exist | ADM | 4 | 1 | M | 2 |
| 18 | Admin fan count stat must count unique emails only | ADM | 4 | 1 | M | 1 |
| 19 | If duplicates exist in localStorage (legacy data), deduplicate on load in admin | ADM | 3 | 2 | M | 3 |
| 20 | Write a utility function `getUniqueFans()` that deduplicates on read for display and count purposes | V8 | 3 | 2 | L | 3 |
| 21 | Verify that the fan sign-up form disables the submit button while the dedup check is in progress | V8 | 3 | 1 | L | 2 |
| 22 | Duplicate email submission must not create a race condition if user double-taps the submit button | V8 | 4 | 2 | M | 2 |
| 23 | On double-tap, ensure the submit button is disabled after the first tap to prevent concurrent submissions | V8 | 4 | 1 | M | 2 |
| 24 | Test: submit form twice rapidly — only one record should appear in able_fans | V8 | 5 | 1 | M | 1 |
| 25 | Duplicate confirmation styling must be distinct from success: use muted blue/neutral instead of accent colour | V8 | 3 | 1 | L | 3 |
| 26 | Duplicate confirmation must auto-dismiss after the same delay as success (3–4 seconds) | V8 | 2 | 1 | L | 4 |
| 27 | The duplicate check must run before any async call (localStorage check is synchronous) | V8 | 4 | 1 | L | 1 |
| 28 | Document the dedup behaviour in a code comment above the fan submission handler | V8 | 2 | 1 | L | 5 |
| 29 | Test edge case: fan submits with plus-aliased email (artist+able@gmail.com) after being on list as artist@gmail.com — these are different emails, no dedup | V8 | 3 | 2 | L | 3 |
| 30 | Duplicate check must be case-insensitive regardless of RFC-2822 technical case-sensitivity | V8 | 4 | 1 | M | 1 |
| 31 | If fan email is already starred in admin, duplicate submission should not un-star them | ADM | 3 | 1 | M | 3 |
| 32 | Admin "fan added" celebration (first fan, 10 fans, 100 fans) milestones must count unique fans only | ADM | 4 | 1 | M | 1 |
| 33 | If able_fans grows beyond 5000 entries (unlikely but possible), dedup check must not block the UI thread | V8 | 3 | 3 | M | 5 |
| 34 | The fan capture form's email field should have autocomplete="email" to reduce typos that create pseudo-duplicates | V8 | 3 | 1 | L | 2 |
| 35 | Test: is the dedup check applied to the Spotify import fan list if/when that feature exists? | V8 | 3 | 2 | M | 5 |
| 36 | Admin fan export CSV must contain only unique emails | ADM | 4 | 1 | M | 2 |
| 37 | When exporting fans, preserve the earliest timestamp for each unique email | ADM | 3 | 2 | M | 3 |
| 38 | Admin fan list search must search across deduplicated emails | ADM | 3 | 1 | L | 3 |
| 39 | Test: source attribution for duplicate sign-up — should not overwrite the original source | V8 | 4 | 1 | M | 2 |
| 40 | Duplicate sign-up from a different UTM source should not update the original attribution | V8 | 4 | 1 | M | 2 |
| 41 | Admin "newest fan" display must show the actual newest unique fan, not the most recent submission | ADM | 3 | 1 | M | 2 |
| 42 | If a fan unsubscribes (when I4 is implemented), they must be able to re-subscribe without dedup blocking them | V8 | 4 | 2 | M | 4 |
| 43 | The unsubscribe state must be stored separately from the fan array — not by deleting the record | V8 | 4 | 2 | M | 4 |
| 44 | Re-subscribe after unsubscribe must create a new timestamp but keep the original sign-up date | V8 | 3 | 2 | M | 5 |
| 45 | Test dedup with a fan list that has been manually edited (admin remove fan, then fan re-signs-up) | V8 | 4 | 2 | M | 3 |
| 46 | The dedup check regex or comparison function must be unit-testable in isolation | V8 | 3 | 2 | L | 4 |
| 47 | Write a test case: "given existing fan 'user@example.com', submitting 'USER@EXAMPLE.COM' should return duplicate response" | V8 | 4 | 1 | L | 2 |
| 48 | Write a test case: "given existing fan 'user@example.com', submitting 'user2@example.com' should return success" | V8 | 4 | 1 | L | 2 |
| 49 | Write a test case: "given empty fan list, submitting valid email should return success" | V8 | 4 | 1 | L | 1 |
| 50 | Write a test case: "given 100-fan free tier limit, duplicate submission should return duplicate response not limit error" | V8 | 4 | 1 | M | 2 |
| 51 | Free tier fan limit check must run AFTER dedup check — duplicate submissions don't count toward limit | V8 | 5 | 1 | H | 1 |
| 52 | Audit the sequence: validate email format → dedup check → tier limit check → store → respond | V8 | 5 | 1 | M | 1 |
| 53 | Email format validation must run before dedup check (no point deduping invalid emails) | V8 | 3 | 1 | L | 2 |
| 54 | Dedup logic must be in a named, documented function — not inline in the submit handler | V8 | 3 | 2 | L | 4 |
| 55 | The named dedup function must return a typed result: { isDuplicate: boolean, existingEntry: FanEntry | null } | V8 | 3 | 2 | L | 4 |
| 56 | Test dedup behaviour when localStorage is unavailable (private browsing, storage blocked) | V8 | 4 | 2 | M | 3 |
| 57 | If localStorage is unavailable, fail gracefully — show success (can't know if duplicate, so assume not) | V8 | 3 | 2 | M | 3 |
| 58 | Log dedup events to console.debug in development only — not in production | V8 | 2 | 1 | L | 5 |
| 59 | Confirm that the dedup check runs correctly after artist changes their page slug | V8 | 3 | 2 | M | 4 |
| 60 | Confirm that fan lists from different artists cannot interfere — each artist's able_fans is scoped | V8 | 5 | 1 | H | 1 |
| 61 | Document that when Supabase is added, each fan record will have artist_id as a foreign key | V8 | 3 | 1 | L | 4 |
| 62 | Admin manual fan removal must not affect dedup logic (fan can re-sign-up after removal) | ADM | 3 | 2 | M | 3 |
| 63 | Dedup check performance: for 1000 fans, check completes in < 1ms | V8 | 3 | 2 | L | 4 |
| 64 | Dedup check should use Array.prototype.some() for O(n) early exit rather than filter | V8 | 2 | 1 | L | 3 |
| 65 | Test: if the fan submit button is triggered by Enter key on mobile keyboard, dedup still applies | V8 | 4 | 1 | M | 2 |
| 66 | The duplicate message accessibility: it must be announced by screen reader (aria-live or focus move) | V8 | 3 | 2 | L | 3 |
| 67 | The duplicate message must be distinct from validation error messages in visual design | V8 | 3 | 1 | L | 3 |
| 68 | Test: fan signs up at exactly the 100-fan free tier limit — should they be added? Yes, limit is 100 max stored | V8 | 4 | 1 | M | 2 |
| 69 | Test: duplicate email at the 100-fan limit — should return duplicate message, not limit-reached message | V8 | 5 | 1 | H | 1 |
| 70 | If the fan form is in a modal or bottom sheet, the duplicate response must display within that container | V8 | 3 | 2 | M | 3 |
| 71 | Duplicate message text must not contain the word "error" — it is not an error | V8 | 3 | 1 | L | 2 |
| 72 | Duplicate message must not say "already registered" — fans don't "register" | V8 | 4 | 1 | L | 2 |
| 73 | Test: two tabs of the same profile — fan signs up in Tab 1, Tab 2 should reflect the updated list | V8 | 3 | 3 | M | 5 |
| 74 | Consider using localStorage StorageEvent to sync across tabs | V8 | 2 | 3 | M | 6 |
| 75 | Audit that the dedup normalisation (lowercase, trim) is also applied consistently to admin fan search | ADM | 3 | 1 | L | 3 |
| 76 | Admin starred fans array (able_starred_fans) stores emails that must also be lowercased for consistency | ADM | 3 | 1 | M | 3 |
| 77 | If a fan's email appears in able_starred_fans but not in able_fans (removed fan), handle gracefully | ADM | 3 | 2 | M | 3 |
| 78 | Test: star a fan, then remove them, then they re-sign-up — should their star status be preserved? | ADM | 3 | 3 | M | 5 |
| 79 | Define the expected behaviour for star persistence on re-sign-up in docs | ADM | 2 | 1 | L | 5 |
| 80 | Dedup check should happen in the sign-up handler, not in a setTimeout or async callback | V8 | 4 | 1 | M | 1 |
| 81 | Test the dedup logic from the Playwright smoke test suite | V8 | 5 | 2 | M | 2 |
| 82 | Add Playwright test: submit email twice, confirm second submission shows duplicate message | V8 | 4 | 2 | L | 3 |
| 83 | Add Playwright test: submit email, verify only one record in localStorage | V8 | 4 | 2 | L | 3 |
| 84 | Confirm the fan count displayed on the stat card does not increment on duplicate | V8 | 4 | 1 | M | 1 |
| 85 | Admin fan count badge must not show stale value after a duplicate submission | ADM | 3 | 2 | M | 2 |
| 86 | Test: localStorage read returns wrong type (null, string, not array) — handle all cases in dedup check | V8 | 4 | 1 | H | 1 |
| 87 | The dedup check must work correctly if able_fans contains entries with missing fields (partial writes) | V8 | 3 | 2 | M | 2 |
| 88 | Dedup check: if an entry in able_fans has no email field, skip it rather than crash | V8 | 3 | 1 | M | 2 |
| 89 | After Supabase migration, client-side dedup becomes secondary — document the two-layer strategy | V8 | 3 | 1 | L | 5 |
| 90 | Consider a soft dedup warning in admin if admin ever detects multiple entries for same email | ADM | 2 | 3 | L | 6 |
| 91 | The duplicate confirmation message on V8 must have the same visual weight as the success message | V8 | 3 | 1 | L | 3 |
| 92 | The duplicate response timing should feel as fast as the success response (< 200ms) | V8 | 3 | 1 | L | 2 |
| 93 | Verify that the form auto-clears after duplicate response, ready for a different email | V8 | 3 | 1 | L | 3 |
| 94 | Verify that keyboard focus returns to email input after duplicate response dismisses | V8 | 3 | 1 | L | 3 |
| 95 | The submit button re-enables after duplicate response so user can try a different email | V8 | 4 | 1 | M | 2 |
| 96 | Analytics: do not log a "fan_signup_attempt" event for duplicate — only for successful new sign-ups | V8 | 3 | 1 | M | 2 |
| 97 | Consider logging a separate "fan_duplicate_attempt" analytics event for product insight | V8 | 2 | 1 | L | 5 |
| 98 | Dedup logic code must be reviewed after every change to the fan capture form | V8 | 5 | 1 | L | 1 |
| 99 | Write a code comment at the top of the fan submission handler documenting the dedup behaviour | V8 | 3 | 1 | L | 3 |
| 100 | Test the full dedup flow end-to-end with Playwright: sign up, sign up again, check admin fan count is 1 | V8 | 5 | 2 | M | 1 |
