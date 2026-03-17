# Dimension D7 — Error State Copy
**Category:** Copy, Voice & Messaging
**Phase:** 4 (Copy)
**Status:** Not started

Error messages are the most trust-sensitive copy in the product. An artist who hits a broken form and reads "Error 500: Internal Server Error" has just learned that ABLE does not care about them. An artist who reads "Your show didn't save. Try once more — if it keeps happening, reach out." has learned that ABLE is on their side. Full compliance means every error scenario — form validation, network failure, Spotify timeout, localStorage corruption, quota exceeded, auth failure — has a human-written message that maintains ABLE voice, names what failed, and offers a clear next action. No technical error codes surface to users. No "Something went wrong." without specific context.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Replace "Something went wrong." with a specific error message naming the operation that failed | ALL | 5 | 1 | L | 1 |
| 2 | Replace "Error 500" or any HTTP status code shown to users with a human description of what failed | ALL | 5 | 1 | L | 1 |
| 3 | Replace "Network error" with "Couldn't connect right now. Check your signal and try again." | ALL | 5 | 1 | L | 1 |
| 4 | Replace "Something went wrong. Try again or use the skip link." on the Spotify step with "Couldn't reach Spotify right now. Skip and enter your name below." | STR | 5 | 1 | L | 1 |
| 5 | Replace "Failed to save" on any save operation with "[specific thing] didn't save. Try once more." | ADM | 5 | 1 | L | 1 |
| 6 | Replace "Invalid email" form validation with "That doesn't look like an email." | ALL | 4 | 1 | L | 1 |
| 7 | Replace "This field is required" with a context-specific message echoing the field label | ALL | 4 | 1 | L | 1 |
| 8 | Replace "Email already in use" with "There's already a page for that email. Sign in instead." | ALL | 4 | 1 | L | 1 |
| 9 | Replace "Invalid URL" on any CTA URL validation with "That URL doesn't look right. Make sure it starts with https://" | ALL | 4 | 1 | L | 1 |
| 10 | Replace "Unauthorised" or "403 Forbidden" with "You don't have access to this. Sign in again." | ALL | 5 | 1 | L | 1 |
| 11 | Replace "Session expired" with "You've been signed out. Sign back in to continue." | ALL | 5 | 1 | L | 1 |
| 12 | Replace "QuotaExceededError" or device storage full error with "Your device storage is full. Some changes may not save." | V8 | 4 | 1 | L | 1 |
| 13 | Replace "LocalStorage unavailable" or private browsing storage error with "Your browser is blocking local storage. Some things won't save until you change that setting." | V8 | 4 | 1 | L | 2 |
| 14 | Replace any "JSON parse error" or data corruption message with "Your profile data looks like it got corrupted. Let's reset it." with a specific recovery CTA | ALL | 5 | 2 | M | 1 |
| 15 | Add a data corruption recovery flow with the copy "Your page data looks off. We can reset it — you'll need to set it up again." | ADM | 5 | 3 | H | 2 |
| 16 | Replace "Upload failed" with "That file didn't upload. Check the file size is under [X]MB and try again." | ADM | 4 | 1 | L | 1 |
| 17 | Replace "File too large" with "That file is too large. Keep it under [X]MB." | ADM | 4 | 1 | L | 1 |
| 18 | Replace "Invalid file type" with "That file type won't work here. Use [accepted types]." | ADM | 4 | 1 | L | 1 |
| 19 | Replace "Spotify connection failed" with "Couldn't connect to Spotify. Try again — or skip and enter your details manually." | ALL | 4 | 1 | L | 1 |
| 20 | Replace "No Spotify results" with "Nothing came up. Try a different spelling, or skip below." | STR | 4 | 1 | L | 1 |
| 21 | Replace "Rate limit exceeded" with "Too many requests. Wait a moment and try again." | ALL | 4 | 1 | L | 1 |
| 22 | Replace "Supabase connection error" with "Couldn't connect right now. Your local changes are safe — try again in a moment." | ALL | 5 | 1 | L | 1 |
| 23 | Confirm no raw Supabase error object is ever shown to users — all Supabase errors must be caught and translated | ALL | 5 | 2 | H | 1 |
| 24 | Replace "CORS error" with a user-friendly network description — CORS errors should never surface to users | ALL | 5 | 1 | L | 1 |
| 25 | Confirm all try/catch blocks in admin.html have a user-visible error message, not just a console.error | ADM | 5 | 3 | M | 1 |
| 26 | Confirm all try/catch blocks in able-v8.html have a user-visible error message | V8 | 5 | 3 | M | 1 |
| 27 | Confirm all try/catch blocks in start.html have a user-visible error message | STR | 5 | 3 | M | 1 |
| 28 | Confirm all try/catch blocks in landing.html have user-visible error handling for any dynamic content | LND | 3 | 2 | M | 2 |
| 29 | Replace "Email confirmation failed" with "Couldn't confirm your email right now. Try the link again — it's valid for 24 hours." | ALL | 4 | 1 | L | 2 |
| 30 | Replace "Magic link expired" with "That sign-in link has expired. Request a new one." | ALL | 4 | 1 | L | 2 |
| 31 | Replace "Magic link already used" with "You've already used that link. Request a new one to sign in." | ALL | 4 | 1 | L | 2 |
| 32 | Replace "Fan sign-up failed" on the V8 fan capture form with "Couldn't save your email right now. Try again." | V8 | 5 | 1 | L | 1 |
| 33 | Confirm the fan capture form has an error state that does not clear the fan's email from the input on failure | V8 | 5 | 1 | M | 2 |
| 34 | Replace "Show save failed" with "That show didn't save. Try once more." with a single retry CTA | ADM | 4 | 1 | L | 1 |
| 35 | Replace "Release update failed" with "That release didn't update. Try once more." | ADM | 4 | 1 | L | 1 |
| 36 | Replace "Profile save failed" with "Your page didn't save. Try once more — if it keeps happening, reach out." | ADM | 5 | 1 | L | 1 |
| 37 | Replace "Snap card save failed" with "That snap card didn't save. Try once more." | ADM | 4 | 1 | L | 1 |
| 38 | Replace "Gig mode toggle failed" with "Gig mode didn't switch. Try once more." | ADM | 4 | 1 | L | 1 |
| 39 | Confirm all error toasts in admin.html auto-dismiss after 5 seconds with no action, or persist until dismissed if they require action | ADM | 4 | 2 | M | 2 |
| 40 | Confirm all error toasts have a dismiss button so artists are never stuck reading an error that can't be closed | ADM | 4 | 1 | M | 2 |
| 41 | Replace "Error" as a standalone toast heading with the specific failure name — "Show not saved", "Profile not saved" | ADM | 4 | 1 | L | 1 |
| 42 | Confirm error toasts do not stack more than two deep — a third error replaces the oldest | ADM | 3 | 2 | M | 3 |
| 43 | Replace "Try again" as a standalone error CTA with the specific operation — "Try saving again", "Try uploading again" | ALL | 3 | 1 | L | 2 |
| 44 | Confirm the retry CTA on network errors names the specific action being retried | ALL | 3 | 1 | L | 2 |
| 45 | Replace "Contact support" as an error recovery CTA with "Reach out to us" and a direct email link | ALL | 3 | 1 | L | 2 |
| 46 | Confirm the fan confirmation email delivery failure message (to the artist in admin) reads "That email didn't send. The fan is still on your list." | ADM | 4 | 2 | M | 2 |
| 47 | Replace "oEmbed fetch failed" error on snap card media with "Couldn't load that preview. Check the link and try again." | ADM | 3 | 1 | L | 2 |
| 48 | Replace "Playlist import failed" with "Couldn't load that playlist. Make sure it's public, then try again." | ADM | 3 | 1 | L | 2 |
| 49 | Confirm all form validation errors appear inline below the relevant field, not at the top of the form | ALL | 4 | 2 | M | 2 |
| 50 | Confirm form validation errors are associated with their field via aria-describedby for screen readers | ALL | 4 | 2 | M | 2 |
| 51 | Replace "Required" as a field label suffix with nothing — required fields should be indicated structurally, not via a label suffix | ALL | 3 | 1 | L | 2 |
| 52 | Confirm the fan sign-up form on V8 shows the error in the same typographic style as the success echo to avoid visual panic | V8 | 4 | 2 | M | 3 |
| 53 | Replace "Sign-ups are paused right now. Check back soon." with "The list is full right now." | V8 | 3 | 1 | L | 2 |
| 54 | Confirm the "list is full" message on V8 is artist-authored and not platform-authored — it reads as if the artist configured it | V8 | 3 | 1 | L | 3 |
| 55 | Replace "Fan limit reached" admin toast with "You've hit 100 fans — that's the free plan limit. Your list is locked until you upgrade or export some fans." | ADM | 4 | 1 | L | 2 |
| 56 | Replace "Export failed" with "The export didn't complete. Try again — your fan data is safe." | ADM | 4 | 1 | L | 2 |
| 57 | Replace "Delete failed" on any delete operation with "[specific thing] couldn't be deleted. Try again." | ADM | 4 | 1 | L | 2 |
| 58 | Confirm the show-delete confirmation dialog has an error state if deletion fails | ADM | 3 | 2 | M | 3 |
| 59 | Replace "Image upload error" with "That image didn't upload. Check it's a JPG or PNG under 5MB." | ADM | 4 | 1 | L | 2 |
| 60 | Confirm the Spotify import error state in admin offers both a retry and a manual-entry fallback | ADM | 4 | 1 | L | 2 |
| 61 | Replace "Cannot read property of undefined" and all JS runtime errors shown to users with a caught error message | ALL | 5 | 3 | H | 1 |
| 62 | Add a global window.onerror handler in admin.html that catches uncaught errors and shows a friendly recovery message | ADM | 4 | 3 | H | 2 |
| 63 | Add a global window.onerror handler in able-v8.html for uncaught errors | V8 | 4 | 3 | H | 2 |
| 64 | Confirm the V8 profile page degrades gracefully if Supabase is unreachable — showing cached localStorage data rather than an error screen | V8 | 5 | 2 | H | 2 |
| 65 | Confirm admin.html degrades gracefully if Supabase is unreachable — the artist can still edit from localStorage | ADM | 5 | 2 | H | 2 |
| 66 | Replace "Page not found" for invalid artist profile slugs with "This page isn't live yet." | V8 | 4 | 1 | L | 2 |
| 67 | Confirm the 404 error state on V8 has a back link to ABLE's homepage | V8 | 3 | 1 | L | 2 |
| 68 | Replace "Unauthorized" auth error with "You need to sign in to do that." | ALL | 4 | 1 | L | 1 |
| 69 | Confirm all error messages end with a period, not a question mark or exclamation mark | ALL | 4 | 2 | L | 2 |
| 70 | Confirm all error messages are written in second person addressing the user, not third person describing the system | ALL | 4 | 2 | L | 2 |
| 71 | Replace "The system encountered an error" with the specific failure in first or second person | ALL | 5 | 1 | L | 1 |
| 72 | Confirm all error states have a next-action CTA — never a dead-end error with no path forward | ALL | 5 | 2 | M | 2 |
| 73 | Confirm the onboarding email resend error reads "Couldn't send the link. Try again in a moment." | STR | 4 | 1 | L | 2 |
| 74 | Confirm the admin page load error (corrupt localStorage) shows a guided reset: "Your page data looks off. We can help you start fresh." | ADM | 5 | 3 | H | 2 |
| 75 | Replace "Profile not found" with "Your page isn't set up yet. Build it in a couple of minutes." | ADM | 4 | 1 | L | 2 |
| 76 | Confirm network connectivity errors have a specific recovery instruction based on what the artist was doing | ALL | 4 | 2 | M | 2 |
| 77 | Replace "Subscription error" on any tier payment failure with "There was a problem with your subscription. Check your payment details." | ALL | 4 | 1 | L | 2 |
| 78 | Confirm all Stripe payment errors surface a human message, never a Stripe error code | ALL | 5 | 2 | M | 2 |
| 79 | Replace "Payment failed" with "That payment didn't go through. Check your card details and try again." | ALL | 5 | 1 | L | 2 |
| 80 | Confirm the artist welcome email delivery failure is silently retried server-side rather than showing an error to the artist | ALL | 4 | 2 | H | 3 |
| 81 | Confirm validation error states use the ABLE accent colour for highlighting, not a jarring red | ALL | 3 | 2 | M | 3 |
| 82 | Replace "URL is too long" URL validation error with "That URL is too long. Shorten it and try again." | ALL | 3 | 1 | L | 2 |
| 83 | Replace "Name too short" validation error on artist name with "What do you go by? Give it at least two characters." | STR | 3 | 1 | L | 2 |
| 84 | Replace "Name too long" validation error with "That's a bit long. Try a shorter version." | STR | 3 | 1 | L | 2 |
| 85 | Confirm the "incorrect format" error on any date input reads "That date doesn't look right." | ADM | 3 | 1 | L | 2 |
| 86 | Replace "Date in the past" validation on release date with "That date has already passed. Pick a future date." | ADM | 3 | 1 | L | 2 |
| 87 | Confirm the show date validation reads "That show date has already passed." when an artist adds a past date | ADM | 3 | 1 | L | 2 |
| 88 | Replace "Tick price cannot be empty" with "Add a ticket price, or mark the show as free." | ADM | 3 | 1 | L | 2 |
| 89 | Confirm the crop tool error for images reads "That crop didn't apply. Try dragging the crop again." | ADM | 2 | 1 | L | 3 |
| 90 | Replace "Permission denied" on browser notification permission with "Turn on notifications in your browser settings to get show reminders." | V8 | 3 | 1 | L | 2 |
| 91 | Confirm the service worker registration failure is silent — it should never show an error to the fan | V8 | 4 | 1 | M | 2 |
| 92 | Replace "Cache update failed" with silence — cache errors should never surface to users | V8 | 4 | 1 | M | 2 |
| 93 | Confirm the iframe oEmbed load error replaces the failed iframe with a text link rather than a broken embed | V8 | 3 | 2 | M | 3 |
| 94 | Replace "Embed failed to load" with "Couldn't load that embed. View it directly →" with a fallback link | V8 | 3 | 1 | L | 2 |
| 95 | Confirm the admin preview panel error reads "Preview unavailable right now." with a reload link | ADM | 3 | 1 | L | 2 |
| 96 | Confirm all inline error messages in admin forms clear when the user starts correcting the field | ADM | 4 | 2 | M | 3 |
| 97 | Confirm all error copy in admin has been reviewed for exclamation marks and none exist | ADM | 4 | 1 | L | 2 |
| 98 | Confirm all error copy on V8 maintains first-person artist voice even in error — e.g. "My page couldn't load right now." | V8 | 3 | 2 | M | 3 |
| 99 | Audit all JavaScript catch blocks across all four pages for the string "Something went wrong" and replace each with a specific message | ALL | 5 | 3 | L | 1 |
| 100 | Run a systematic error injection test (block network, corrupt localStorage, exceed quota) and document every error message shown, verifying all are in ABLE voice | ALL | 5 | 3 | H | 6 |
