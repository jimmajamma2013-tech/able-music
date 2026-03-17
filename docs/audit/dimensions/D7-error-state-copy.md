# Dimension D7 — Error State Copy
**Category:** Copy, Voice & Messaging
**Phase:** 4 (Copy)
**Status:** Draft — code-grounded

Error messages are the most trust-sensitive copy in the product. An artist who hits a broken form and reads "Error 500" has learned that ABLE does not care about them. An artist who reads "Your show didn't save. Try once more — if it keeps happening, reach out." has learned ABLE is on their side. Full compliance means every error scenario — form validation, network failure, Spotify timeout, localStorage corruption, quota exceeded, auth failure — has a human-written message that maintains ABLE voice, names what failed, and offers a clear next action. No technical error codes surface to users. No "Something went wrong." without specific context. The spec ban is explicit: `'Something went wrong'` is a banned phrase.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | start.html line 1769: `err.message \|\| 'Something went wrong. Try again or use the skip link.'` — BANNED PHRASE; replace fallback with `'Couldn\'t complete that step. Try again or use the skip link below.'` | STR | 5 | 1 | L | 1 |
| 2 | start.html line 1701: `'Import failed. Try the skip link below.'` — this is the error thrown when Spotify import returns an error from the server; confirm it surfaces correctly and that `result.data.error` is always a human-readable string before it can override this fallback | STR | 4 | 1 | L | 1 |
| 3 | admin.html line 4422: `'Your device is running low on storage. Time to sync your data.'` — "Time to sync" implies a sync feature that doesn't exist yet; replace with `'Your device is running low on storage. Export your fans as CSV to free space.'` | ADM | 3 | 1 | L | 1 |
| 4 | admin.html line 4449: `"No connection — your changes will save when you're back online."` — confirm this is accurate; if changes are NOT actually queued offline, change to `'No connection — reconnect to save your changes.'` to avoid misleading the artist | ADM | 5 | 2 | M | 1 |
| 5 | admin.html line 4452: `'Back online.'` — clean; confirm retained | ADM | 1 | 1 | L | 3 |
| 6 | admin.html line 4456: `'No connection — working offline.'` — duplicate of line 4449; confirm both fire in the correct scenario and consolidate if they fire on the same event | ADM | 3 | 1 | L | 2 |
| 7 | admin.html line 4556: `'Copy failed'` — too bare; replace with `'Couldn\'t copy — try selecting and copying manually.'` | ADM | 2 | 1 | L | 2 |
| 8 | admin.html line 5844: `'Add a video URL first.'` — correct and direct; confirm retained | ADM | 1 | 1 | L | 3 |
| 9 | admin.html line 6031: `'Add an artist name first.'` — correct; confirm retained | ADM | 1 | 1 | L | 3 |
| 10 | admin.html line 7636: `'Add your artist name first.'` — correct; confirm retained | ADM | 1 | 1 | L | 3 |
| 11 | admin.html line 7646: `'Add your artist name first.'` — second occurrence; same note | ADM | 1 | 1 | L | 3 |
| 12 | admin.html line 8263: `'Could not copy — try manually.'` — acceptable; but "manually" is vague; consider `'Could not copy — select the URL and copy it yourself.'` | ADM | 1 | 1 | L | 3 |
| 13 | admin.html: any `catch` block that calls `showToast` without a human string — audit all catch blocks and confirm no technical error message can surface; each catch must have a hardcoded human fallback | ADM | 5 | 2 | M | 1 |
| 14 | start.html line 1333: `'Enter your artist name to continue.'` — the field error on the name field; this is direct and specific; confirm retained | STR | 1 | 1 | L | 3 |
| 15 | start.html line 1388: `'Enter a valid email to continue.'` — direct and specific; confirm retained | STR | 1 | 1 | L | 3 |
| 16 | start.html: the Spotify import error field `iSpotifyImportErr` (line 1198) — confirm what message populates this element when the import fails; it must never show a raw API error string | STR | 4 | 1 | L | 1 |
| 17 | start.html line 1814: `"Couldn't read that Linktree — try pasting your links manually."` — well-written; confirm retained | STR | 1 | 1 | L | 3 |
| 18 | able-v8.html line 8774: `'Check your email address.'` — the fan sign-up email validation error; spec-compliant; confirm retained | V8 | 1 | 1 | L | 3 |
| 19 | able-v8.html: fan sign-up form — if the form submission fails (network error), confirm there is a specific error message: `'Couldn\'t save your sign-up. Try again — or check your signal.'` | V8 | 5 | 2 | M | 1 |
| 20 | able-v8.html: fan cap reached — the fan-facing message when sign-ups are paused; current text unknown; confirm it does not use SaaS language; canonical: `'Sign-ups are paused right now. Check back soon.'` — if fan cap is hit, this must be in artist voice | V8 | 4 | 1 | L | 1 |
| 21 | able-v8.html: oEmbed / music embed load failure — if a Spotify or YouTube embed fails to load in the page, there must be a graceful fallback that doesn't leave a broken iframe visible | V8 | 4 | 2 | M | 2 |
| 22 | admin.html: the profile save operation — if `setLS` fails (which triggers QuotaExceededError), the quota toast (line 4422) fires; confirm this is the only path and no silent save failure is possible | ADM | 5 | 2 | M | 1 |
| 23 | admin.html: the profile save — if a field fails validation before save, the current behavior is unknown; confirm either inline field errors or a toast fires with a specific message | ADM | 4 | 2 | M | 1 |
| 24 | admin.html: the accent colour save — `showToast('Accent saved.')` (line 8022); no error case visible; confirm what happens if the colour is invalid | ADM | 2 | 1 | L | 3 |
| 25 | admin.html: the gig mode expiry — if the gig timer fires but the localStorage write fails, confirm the UI does not silently keep showing gig mode | ADM | 3 | 2 | M | 2 |
| 26 | admin.html: the slug save — if the slug contains invalid characters, confirm the field error fires with: `'Lowercase letters, numbers, and hyphens only.'` | ADM | 3 | 1 | L | 2 |
| 27 | admin.html: the slug save — if the slug is already taken (once backend lands), the error must be: `'That URL is taken. Try a variation.'` not a generic save failure | ADM | 3 | 2 | M | 3 |
| 28 | admin.html: the Spotify artist URL import on the connections page — if the URL is invalid, confirm the error is: `'That doesn\'t look like a Spotify artist URL. Make sure it starts with open.spotify.com/artist/'` | ADM | 3 | 2 | M | 2 |
| 29 | admin.html: the shows sheet — if a show is saved with no venue name, confirm either a validation error fires or a default is applied | ADM | 3 | 2 | M | 2 |
| 30 | admin.html: the shows sheet — if a show is saved with a past date, confirm whether this is allowed or blocked; if blocked, the error must be: `'That date has passed. Pick a future date.'` | ADM | 3 | 2 | M | 2 |
| 31 | admin.html: the shows sheet — if a ticket URL is entered but invalid (not a URL), confirm error: `'That doesn\'t look like a URL. Make sure it starts with https://'` | ADM | 3 | 2 | M | 2 |
| 32 | admin.html: the release URL validation — if a non-music URL is entered, confirm error: `'That URL isn\'t from a platform we recognise. Paste a Spotify, YouTube, SoundCloud, or Bandcamp link.'` | ADM | 4 | 2 | M | 2 |
| 33 | admin.html: the oEmbed fetch for releases — if the fetch times out, confirm: `'Couldn\'t load preview — the link is still saved. Check it on the platform.'` | ADM | 4 | 1 | L | 1 |
| 34 | admin.html: the CTA URL field validation — if a URL is invalid, confirm error: `'That URL doesn\'t look right. Make sure it starts with https://'` | ADM | 4 | 1 | L | 1 |
| 35 | admin.html: the fan level/star save — `showToast('Saved.')` fires on success (line 4064); confirm the error path (if save fails) has a corresponding toast | ADM | 3 | 2 | M | 2 |
| 36 | admin.html: the fan export CSV — if the fan list is empty and export is triggered, `showToast('No fans yet — share your page to see who shows up.', 'amber')` fires (line 4117); this is correct; confirm retained | ADM | 2 | 1 | L | 3 |
| 37 | admin.html: the clip video URL validation — `'Add a video URL first.'` (line 5844) — confirm this fires if the field is empty, not just if null | ADM | 2 | 1 | L | 3 |
| 38 | admin.html: the clip save success — `'Clip added. Toggle it live when ready.'` (line 5873) — confirm there is an error path if the save fails | ADM | 3 | 2 | M | 2 |
| 39 | admin.html: the recommendation artist name — `'Add an artist name first.'` (line 6031) fires if the name field is empty; confirm retained | ADM | 1 | 1 | L | 3 |
| 40 | admin.html: the recommendation save — `showToast('Saved.')` (line 6095) on success; confirm error path | ADM | 2 | 2 | M | 3 |
| 41 | admin.html: the merch save — `showToast('Saved.')` (line 6272); confirm error path | ADM | 2 | 2 | M | 3 |
| 42 | admin.html: the support pack save — `showToast('Saved.')` (line 6301); confirm error path | ADM | 2 | 2 | M | 3 |
| 43 | admin.html: the profile save — `showToast('Profile saved.')` (line 7884) on success; confirm error path if localStorage write fails | ADM | 4 | 2 | M | 1 |
| 44 | admin.html: the magic link send — start.html line 2066–2069: `if (error) { ... console.warn('Magic link error:', error.message); }` — this logs but may not surface to the user; ensure the artist sees: `'Couldn\'t send your sign-in link. Try again or check your email address.'` | STR | 5 | 2 | M | 1 |
| 45 | start.html: if the Supabase magic link send succeeds but the artist never clicks the link — no error state, but the done copy must acknowledge the situation: `'Check your inbox — and your spam folder.'` | STR | 3 | 1 | L | 2 |
| 46 | able-v8.html: if localStorage is corrupted and the profile cannot be parsed, confirm the page shows a graceful fallback rather than a blank or broken page | V8 | 5 | 2 | M | 1 |
| 47 | admin.html: if localStorage is corrupted and the profile cannot be parsed, confirm the admin shows a recovery path: `'Something went wrong loading your profile. Try refreshing. If it keeps happening, contact us.'` — note: this is the ONLY context where a "something went wrong" variant is acceptable, since the cause is genuinely unknown | ADM | 5 | 2 | M | 1 |
| 48 | admin.html: the `console.error('[ABLE] localStorage write error')` call (start.html line 1572) — confirm a user-facing toast also fires when this happens | STR | 4 | 2 | M | 1 |
| 49 | All pages: confirm no raw `Error` object `.message` property ever reaches a user-facing string without being sanitised; `err.message` from browser APIs or fetch can include technical strings | ALL | 5 | 2 | M | 1 |
| 50 | All pages: confirm no HTTP status codes (404, 500, 403, etc.) surface in any user-facing string | ALL | 5 | 1 | L | 1 |
| 51 | admin.html: the state change toasts (line 4901–4906) — `'Profile mode.'`, `'Pre-release.'`, `'Live.'`, `'Gig mode on.'` — these are success toasts not errors; confirm the fallback `|| 'Saved.'` never fires silently if an unknown state is computed | ADM | 3 | 1 | L | 2 |
| 52 | admin.html: the `'Billing coming soon — currently in early access.'` toast (lines 3433, 3548) — this is a temporary placeholder; audit that this toast does not appear in contexts where billing is required (e.g. if the artist tries to perform an action that requires a paid plan, the gate must fire, not a toast) | ADM | 4 | 1 | L | 1 |
| 53 | admin.html: the moment save — `showToast('Moment updated.')` (line 6903) on success; confirm error path | ADM | 2 | 2 | M | 3 |
| 54 | admin.html: if the artist tries to delete a fan and the delete fails, confirm: `'Couldn\'t remove that fan. Try again.'` | ADM | 3 | 2 | M | 3 |
| 55 | admin.html: the snap card save — `showToast('Saved.')` (line 5691); confirm the error path if the save fails | ADM | 3 | 2 | M | 2 |
| 56 | admin.html: the snap card limit toast (line 5619): `'Add as many Updates as you want on Artist plan.'` — this is a soft gate, not an error; but the wording is passive; replace with `'You\'ve used your free snap card. Artist plan removes the limit.'` | ADM | 3 | 1 | L | 1 |
| 57 | admin.html: the copy URL operations — `showToast('Copied.')` on success (line 4555) and `'Copy failed'` on failure (line 4556); the failure copy needs to be more helpful (see item 7) | ADM | 2 | 1 | L | 2 |
| 58 | admin.html: the gig mode toggle — if enabling gig mode succeeds, the STATE_TOAST fires `'Gig mode on.'`; if disabling, nothing fires (falls back to `'Saved.'`); add explicit: `'Gig mode off. Your page is back to your profile.'` | ADM | 3 | 1 | L | 2 |
| 59 | admin.html: the upgrade bar dismiss — confirm no toast fires when dismissed; just a silent removal is correct | ADM | 1 | 1 | L | 3 |
| 60 | start.html: the wizard next-step validation — if the artist tries to advance without completing a required field, the field error fires; confirm no secondary "generic" error also fires | STR | 3 | 1 | L | 2 |
| 61 | fan.html: the fan sign-up from the fan dashboard (if applicable) — confirm error handling mirrors able-v8.html's fan capture form | FAN | 3 | 2 | M | 3 |
| 62 | fan.html: if the fan page fails to load an artist's profile (network error), confirm there is a graceful state: `'Couldn\'t load that artist right now. Try refreshing.'` | FAN | 4 | 2 | M | 2 |
| 63 | All pages: the `'Add ablemusic.co/[slug] to your bio.'` fallback toast (admin line 8280) fires when the Clipboard API fails; confirm the artist knows what to do: `'Copy this URL and add it to your bio: ablemusic.co/[slug]'` | ADM | 3 | 1 | L | 2 |
| 64 | admin.html: the UTM copy buttons (ig, tt, etc.) — if clipboard fails, confirm a fallback toast fires | ADM | 2 | 2 | M | 3 |
| 65 | start.html: the Linktree import — if the Linktree URL entered is not valid, confirm: `'That doesn\'t look like a Linktree URL. Try pasting just the username part (linktree/yourname).'` | STR | 3 | 1 | L | 2 |
| 66 | start.html: the Linktree import — if the Linktree page is private or empty, confirm line 1814 fires and not a generic error | STR | 3 | 1 | L | 2 |
| 67 | admin.html: all `console.warn` calls — confirm none of them are the only signal for a user-visible failure; every warn must have a corresponding user-facing message | ADM | 4 | 2 | M | 1 |
| 68 | admin.html: the first-run checklist — if the artist's profile URL is not set when they try to copy their link, confirm an error fires: `'Set your URL first — then you can copy it.'` | ADM | 4 | 2 | M | 1 |
| 69 | admin.html: the profile link copy button (line 8277) — `'Link copied — paste it in your bio.'` on success; confirm failure fires a useful alternative | ADM | 2 | 1 | L | 2 |
| 70 | All pages: review every `try { ... } catch(e) {}` block — any catch with an empty body is a silent failure and is not acceptable; each must either log and show a toast or log and gracefully degrade | ALL | 5 | 2 | M | 1 |
| 71 | able-v8.html: the world map section — if a show date cannot be parsed, confirm no broken cell appears; fall back to hiding that cell rather than showing an error | V8 | 3 | 2 | M | 2 |
| 72 | admin.html: the artist slug field — if the slug is too short (e.g. empty string), confirm: `'Your URL needs at least one character.'` | ADM | 3 | 1 | L | 2 |
| 73 | admin.html: the artist slug field — if the slug starts with a hyphen or number, confirm validation error fires with a specific message | ADM | 2 | 2 | L | 3 |
| 74 | start.html: the email field — if the artist enters an email that already has an ABLE account, confirm: `'There\'s already a page for that email. Sign in instead.'` rather than a generic validation error | STR | 4 | 2 | M | 2 |
| 75 | admin.html: the Supabase auth flow — if the session token expires mid-session, confirm the artist is shown: `'Your session ended. Sign in again to keep going.'` rather than a blank or broken admin | ADM | 5 | 2 | M | 2 |
| 76 | admin.html: the broadcast send — if the send fails (network or server error), confirm: `'Your broadcast didn\'t send. Try once more.'` | ADM | 5 | 2 | M | 2 |
| 77 | admin.html: the broadcast send — if the artist tries to send to zero fans, confirm a gate fires before the send: `'You\'ll need at least one fan to send a broadcast.'` | ADM | 4 | 2 | M | 2 |
| 78 | admin.html: the image upload (if implemented for artwork) — if the file is too large, confirm: `'That file is too large. Use an image under [X]MB.'` | ADM | 3 | 2 | M | 3 |
| 79 | admin.html: the image upload — if the file type is wrong, confirm: `'That file type isn\'t supported. Use JPEG, PNG, or WebP.'` | ADM | 3 | 2 | M | 3 |
| 80 | admin.html: the tier gate `checkTierGate` function (line 7077–7083) — when `featureName` is unknown, it `console.warn` and `return true` (fails open); this means tier gates silently do nothing for unknown features; add a visible dev-mode indicator | ADM | 3 | 2 | M | 2 |
| 81 | admin.html: the snap card sort — if `moveSnapCard` fails because the card doesn't exist, confirm a silent no-op rather than a visible error is the correct behaviour | ADM | 2 | 2 | L | 3 |
| 82 | admin.html: the release sort order — if a release move operation fails, confirm no toast fires and the UI reverts correctly | ADM | 2 | 2 | L | 3 |
| 83 | admin.html: the release delete — if the delete fails, confirm: `'Couldn\'t remove that release. Try again.'` | ADM | 3 | 2 | M | 3 |
| 84 | admin.html: the show delete — if the delete fails, confirm: `'Couldn\'t remove that show. Try again.'` | ADM | 3 | 2 | M | 3 |
| 85 | admin.html: the recommendation delete — if delete fails, confirm error fires | ADM | 2 | 2 | M | 3 |
| 86 | admin.html: the snap card delete — if delete fails, confirm error fires | ADM | 2 | 2 | M | 3 |
| 87 | admin.html: the clip delete — if delete fails, confirm error fires | ADM | 2 | 2 | M | 3 |
| 88 | All pages: confirm no `alert()` calls exist anywhere — all user-facing messages must go through the toast system or inline field errors | ALL | 4 | 1 | L | 1 |
| 89 | All pages: confirm no `confirm()` calls exist for destructive actions — replace with inline confirmation patterns (two-step buttons or a sheet) | ALL | 3 | 3 | M | 3 |
| 90 | admin.html: the export CSV — if the browser does not support the download attribute, confirm a fallback fires: `'Automatic download not available. Right-click the link and choose Save.'` | ADM | 2 | 2 | L | 3 |
| 91 | All pages: all user-facing error strings must end with a period — scan for strings that end mid-sentence without punctuation | ALL | 2 | 1 | L | 2 |
| 92 | All pages: confirm no error string uses the word "please" — `'Please try again'` is passive; replace with active forms | ALL | 3 | 1 | L | 2 |
| 93 | All pages: confirm no error string uses "Oops" — too informal for ABLE's register | ALL | 3 | 1 | L | 2 |
| 94 | All pages: confirm no error string uses "Uh oh" or "Hmm" — same reason | ALL | 3 | 1 | L | 2 |
| 95 | All pages: confirm no error string uses an exclamation mark | ALL | 4 | 1 | L | 1 |
| 96 | admin.html: the offline banner — confirm it dismisses automatically when the connection is restored (line 4452 fires `'Back online.'`) and does not persist after reconnection | ADM | 3 | 1 | L | 2 |
| 97 | able-v8.html: the pre-save CTA — if the pre-save link is missing (no URL configured), confirm the CTA is hidden rather than pointing to a dead link | V8 | 5 | 1 | L | 1 |
| 98 | admin.html: confirm the quota exceeded toast (line 4422) also provides a way to recover — the current `'Export your fans as CSV'` direction from item 3 satisfies this; after fix, confirm the updated copy is clear about what "export" achieves in terms of freeing storage | ADM | 3 | 1 | L | 2 |
| 99 | All pages: compile a master list of all error strings across all pages and add them to `docs/systems/error-states/SPEC.md` — this spec file exists but may not reflect the current codebase state | ALL | 4 | 2 | M | 2 |
| 100 | All pages: confirm every error message is accessible — `role="alert"` on inline field errors, `aria-live="polite"` on toasts; the toast system uses this correctly (admin line 4439); confirm V8 fan form errors also use `role="alert"` | ALL | 5 | 1 | L | 1 |
