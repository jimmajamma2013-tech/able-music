# Dimension F4 — Loading State Completeness
**Category:** Interaction States & Motion
**Phase:** 7 (Interactions)
**Status:** Not started

Every operation that takes more than 100ms must give the user an immediate signal that something is happening. Without it, users tap again, assume failure, or abandon. Full compliance means: every async fetch, every form submit, every file upload, every AI generation, and every state-change operation has a purpose-built loading indicator proportional to the operation's complexity — skeleton screens for data that populates a layout, a button-level spinner or text swap for single actions, and a stepped progress indicator for multi-stage flows. The loading state must render within one frame of the initiating action and must be cleared on both success and error paths.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add a loading state to the fan sign-up button in `#fan-capture` that swaps inner text to "Signing you up…" and sets `pointer-events: none` while the write is in flight | V8 | 5 | 1 | L | 1 |
| 2 | Add a loading state to the admin profile-save button that replaces its label with a pulsing ellipsis and disables the button until the save resolves | ADM | 5 | 1 | L | 1 |
| 3 | Show a skeleton screen (two `--color-card`-filled rectangles with shimmer animation) in the `#stats-grid` on admin.html while `able_clicks` and `able_views` are being read from localStorage on first paint | ADM | 5 | 2 | M | 1 |
| 4 | Add an inline spinner to the Spotify import button in the admin connections section that activates immediately on click, consistent with the existing `showToast` pattern | ADM | 4 | 1 | L | 1 |
| 5 | Replace the instant DOM swap for campaign state changes in admin Campaign HQ with a 200ms scale + opacity transition plus a "Switching…" label while the state commits to localStorage | ADM | 4 | 2 | M | 1 |
| 6 | Add a loading shimmer to the `#music-section` on able-v8.html while the Spotify iframe resolves — prevents layout shift and blank white box | V8 | 4 | 2 | M | 1 |
| 7 | Add a loading state to the gig mode 24-hour toggle in admin.html that shows "Setting up…" for 300ms before confirming, giving tactile feedback for the timer setup | ADM | 4 | 1 | L | 1 |
| 8 | Add a skeleton card (matching `.show-card` dimensions) in the events section of able-v8.html while `able_shows` loads from localStorage | V8 | 4 | 2 | M | 1 |
| 9 | Implement a step-level progress indicator on start.html that fills a thin accent-coloured bar at the top of the wizard as each step completes, giving a sense of progress through the 5-step flow | STR | 4 | 2 | L | 1 |
| 10 | Add a loading spinner to the AI bio-draft button in admin.html (`.ai-trigger`) that activates on click and clears when the AI response populates the textarea — current disabled state lacks visual momentum | ADM | 4 | 1 | L | 1 |
| 11 | Show a skeleton placeholder in the fan list (`#fan-list`) on admin.html while fan rows are being constructed from `able_fans` — current render is synchronous but will need this when Supabase lands | ADM | 3 | 2 | L | 2 |
| 12 | Add a loading overlay to the merch bento grid on able-v8.html when the section first mounts, covering the grid with a semi-transparent shimmer until product data is present | V8 | 3 | 2 | M | 2 |
| 13 | Replace the bare text "Loading…" fallback in any dynamically populated sections on admin.html with a properly styled skeleton that matches the component's final shape | ADM | 3 | 2 | L | 2 |
| 14 | Add an in-button loading state to the "Send to fans" broadcast button on admin.html (currently `disabled`) that shows a progress state once sending is wired up | ADM | 4 | 1 | L | 2 |
| 15 | Add a loading state to the "Preview" button in the admin broadcast panel that shows a miniature spinner while the preview email renders | ADM | 3 | 1 | L | 2 |
| 16 | Implement a full-screen loading overlay on start.html's final step ("Creating your page…") that blocks interaction and shows animated dots while the wizard commits data to localStorage and redirects | STR | 5 | 2 | M | 1 |
| 17 | Add a loading state to the artist name field on start.html that shows a debounce spinner (after 400ms of inactivity) when slug availability would be checked against Supabase | STR | 3 | 2 | L | 3 |
| 18 | Add a pulsing skeleton to the snap-cards section on able-v8.html while the `able_v3_profile` key is read — prevents the cards from popping in abruptly | V8 | 3 | 2 | M | 2 |
| 19 | Add a loading state to the "Export fans" button in admin.html that shows "Preparing CSV…" for the duration of the Blob construction | ADM | 3 | 1 | L | 2 |
| 20 | Show a skeleton hero on able-v8.html (blurred placeholder image + pulsing title block) for the first 100ms before `able_v3_profile` data paints, preventing a flash of unstyled content | V8 | 4 | 3 | M | 2 |
| 21 | Add a loading state to the CTA link-validator in admin.html when URLs are being checked — show a spinning dot next to each URL field while it resolves | ADM | 3 | 2 | L | 2 |
| 22 | Implement a `data-loading` attribute pattern for all async buttons across admin.html so CSS can target `[data-loading]` uniformly rather than per-button inline styles | ADM | 3 | 2 | L | 2 |
| 23 | Add a loading pulse to the platform pills row on able-v8.html while the profile data paints — avoids a row of empty grey pills appearing before labels render | V8 | 3 | 1 | L | 2 |
| 24 | Add a skeleton screen to the stats chart area in admin.html (line/bar chart) that shows a flat animated rule until chart data is ready | ADM | 3 | 2 | M | 2 |
| 25 | Add a loading state to the "Connect Spotify" OAuth redirect button in admin.html — show "Opening Spotify…" for 1s before redirect so the user knows the tap registered | ADM | 3 | 1 | L | 2 |
| 26 | Show a progress state (step count "2 of 3") in start.html's onboarding wizard during the between-step transition rather than an instant panel swap | STR | 3 | 2 | L | 2 |
| 27 | Add a loading state to the artwork upload button in admin.html — show a progress bar below the dropzone while the image is being read as a DataURL | ADM | 4 | 2 | M | 1 |
| 28 | Add an animated processing state to the admin release-date setter when it recalculates the campaign state — show "Updating…" for 200ms before the state badge changes | ADM | 3 | 1 | L | 2 |
| 29 | Implement a button-level spinner CSS class `.btn--loading` with a 16px inline spinner (border animation) that can be applied to any `.tb-btn` element on admin.html | ADM | 4 | 2 | L | 1 |
| 30 | Add a loading state to the shows-sort drag reorder in admin.html — show a semi-transparent overlay on the card being dragged with "Moving…" text | ADM | 2 | 2 | L | 3 |
| 31 | Implement a skeleton for the "upcoming shows" row on the fan.html page while `able_shows` data is fetched | V8 | 3 | 2 | L | 3 |
| 32 | Add a loading state to the accent colour picker in admin.html when the profile re-renders after a colour change, preventing a flash of the old accent before the new one applies | ADM | 3 | 1 | L | 2 |
| 33 | Add a brief "Saving…" button state to the add-show form submit button on admin.html that clears to "Show added" on success | ADM | 3 | 1 | L | 2 |
| 34 | Show a loading spinner inside the YouTube embed container on able-v8.html while the iframe is loading — use the `iframe.onload` event to remove it | V8 | 3 | 2 | M | 2 |
| 35 | Add a loading state to the "Refresh stats" control on admin.html dashboard that pulses the stats cards while data is being re-read | ADM | 3 | 1 | L | 3 |
| 36 | Implement a `--shimmer-gradient` CSS token used consistently by all skeleton screens across admin.html so shimmer animation is visually uniform | ADM | 2 | 1 | L | 2 |
| 37 | Add a loading state to the slug/URL copy button on admin.html — show a brief "Copying…" state for 300ms before resolving to "Copied ✓" | ADM | 2 | 1 | L | 3 |
| 38 | Add a loading state to the presave CTA on able-v8.html in pre-release state that shows a spinner while the fan email is submitted | V8 | 4 | 1 | L | 2 |
| 39 | Add a staged loading pattern to the admin analytics tab — first paint the empty chart structure, then animate data bars in over 400ms once values are available | ADM | 3 | 3 | M | 3 |
| 40 | Add a loading state to the "Dismiss nudge" action on admin.html that fades the nudge card over 200ms rather than removing it instantly from the DOM | ADM | 2 | 1 | L | 3 |
| 41 | Implement a full-overlay loading state on landing.html's email capture form button while the Resend subscription API call is in flight | LND | 4 | 2 | M | 2 |
| 42 | Add a loading state to the credit-confirm flow in admin.html (professional layer) that shows "Confirming…" on the confirm button while the write resolves | ADM | 3 | 1 | L | 3 |
| 43 | Add a loading state to the rate-card save button in admin.html (freelancer layer) that prevents double-submit and shows "Saving rate card…" | ADM | 3 | 1 | L | 3 |
| 44 | Add a loading skeleton to the credits section on able-v8.html (freelancer layer) while credit data is read from storage | V8 | 3 | 2 | L | 3 |
| 45 | Add a subtle page-level loading bar (2px, accent colour, top of viewport) on start.html that progresses during the wizard step transitions | STR | 3 | 2 | L | 2 |
| 46 | Show a shimmer placeholder in the admin snap-cards list while cards are being read from `able_v3_profile.snapCards` | ADM | 2 | 1 | L | 3 |
| 47 | Add a loading state to the "Add platform link" save action in admin.html — show "Adding…" on the confirm button until the link array is written | ADM | 2 | 1 | L | 3 |
| 48 | Implement a loading state for the themed CSS swap on able-v8.html when the theme is changed in admin — show a 100ms full-screen opacity transition rather than an instant repaint | V8 | 2 | 2 | M | 4 |
| 49 | Add a loading state to the "Generate press pack" action on admin.html that shows a multi-step progress indicator (Gathering info → Writing bio → Formatting) | ADM | 3 | 3 | M | 3 |
| 50 | Add a loading state to the merch item add/edit form in admin.html — button shows "Saving product…" while the array is written | ADM | 2 | 1 | L | 3 |
| 51 | Implement a loading skeleton for the artist profile preview panel in admin.html that shows while the preview iframe loads | ADM | 3 | 2 | M | 3 |
| 52 | Add a loading state to the social proof / plays counter on able-v8.html while stream counts are fetched — show a pulsing number placeholder | V8 | 3 | 2 | M | 3 |
| 53 | Add a loading state to the delete-show confirmation action in admin.html — show "Removing…" on the confirm button for 200ms before the card animates out | ADM | 2 | 1 | L | 3 |
| 54 | Show a skeleton in the admin connections panel while the OAuth token validity is being checked on mount | ADM | 2 | 2 | L | 3 |
| 55 | Add a loading state to the "star fan" action in admin.html fan list — animate the star icon briefly while the write to `able_starred_fans` is in flight | ADM | 2 | 1 | L | 4 |
| 56 | Add a loading indicator to the section re-order drag-and-drop on admin.html while the new order is committed to `able_v3_profile` | ADM | 2 | 1 | L | 4 |
| 57 | Add a loading state to the email validation step in fan sign-up on able-v8.html — show a spinning dot inside the input border while format is being validated | V8 | 3 | 2 | M | 3 |
| 58 | Implement a loading state for the OG image generation call in admin.html (Netlify function) — show "Generating preview image…" with a progress bar | ADM | 3 | 3 | M | 4 |
| 59 | Add a loading state to the "Run smoke test" developer action on admin.html — progress through test steps visually rather than waiting for all results | ADM | 2 | 3 | L | 5 |
| 60 | Add a loading skeleton to the fan activity feed in admin.html while `able_clicks` events are being processed into the timeline | ADM | 3 | 2 | L | 3 |
| 61 | Add a loading state to the upload-avatar flow on admin.html — show an image-shaped shimmer while the file is being read and compressed | ADM | 3 | 2 | M | 3 |
| 62 | Show a loading state in the pre-release countdown component on able-v8.html while the release date is parsed and the interval is initialised | V8 | 2 | 1 | L | 4 |
| 63 | Add a loading state to the "Refresh Spotify data" button in admin.html connections that animates the existing Spotify logo while the fetch is in flight | ADM | 2 | 1 | L | 4 |
| 64 | Implement a loading skeleton for the "Artists like you" discovery strip on able-v8.html while the directory data is fetched | V8 | 3 | 3 | L | 4 |
| 65 | Add a loading state to the booking enquiry submit button on the freelancer profile that shows "Sending enquiry…" while the Supabase write resolves | V8 | 4 | 1 | L | 3 |
| 66 | Add a loading state to the portfolio audio player on the freelancer profile when the audio file is buffering | V8 | 3 | 2 | M | 3 |
| 67 | Implement a global `showButtonLoading(btn, label)` / `clearButtonLoading(btn)` utility in shared/able.js to standardise all button loading patterns across pages | ALL | 4 | 2 | L | 1 |
| 68 | Add a loading state to the admin "Update tier" dev shortcut button that shows "Applying…" for 300ms before the page re-renders with the new tier gates | ADM | 2 | 1 | L | 4 |
| 69 | Show a loading shimmer on the snap-card edit modal in admin.html while the existing card data populates the form fields | ADM | 2 | 1 | L | 4 |
| 70 | Add a loading state to the "Send magic link" button on any future auth screen that shows "Sending link…" for the duration of the Supabase auth call | ALL | 4 | 1 | L | 3 |
| 71 | Add a loading state to the "Remove platform link" action in admin.html — brief "Removing…" state before the pill disappears from the UI | ADM | 2 | 1 | L | 4 |
| 72 | Implement a data-fetching loading state for the admin "Fans over time" sparkline that shows an animated grey rule until data is available | ADM | 3 | 2 | L | 4 |
| 73 | Add a loading overlay to the colour picker popover in admin.html while the contrast check calculation runs after colour selection | ADM | 2 | 2 | M | 4 |
| 74 | Add a loading state to the "Apply theme" action on able-v8.html when triggered from admin — animate the theme token swap rather than an instant jump | V8 | 2 | 2 | M | 4 |
| 75 | Show a brief loading pulse on the "Connections" panel in admin.html when a third-party OAuth status is being polled after redirect return | ADM | 3 | 2 | L | 3 |
| 76 | Add a loading state to the "Toggle section visibility" switches in admin.html that pause interaction for 150ms while the visibility write completes | ADM | 2 | 1 | L | 4 |
| 77 | Implement a loading state for the start.html wizard's "Check availability" slug validation that shows a spinner in the input's trailing position | STR | 3 | 2 | L | 3 |
| 78 | Add a loading state to the video upload/embed input on admin.html when the URL is being validated and the embed is being constructed | ADM | 3 | 1 | L | 3 |
| 79 | Show a skeleton in the "Recent activity" section of admin.html while click events are being read and deduplicated from `able_clicks` | ADM | 2 | 2 | L | 4 |
| 80 | Add a loading state to the "Delete account" confirmation flow in admin settings — show "Deleting everything…" with a progress bar while all localStorage is being cleared | ADM | 3 | 2 | M | 4 |
| 81 | Add a loading pulse to the fan count badge in admin.html sidebar while fans are being counted from `able_fans` on each mount | ADM | 2 | 1 | L | 4 |
| 82 | Implement a loading skeleton for the admin header's artist-name display while `able_v3_profile.name` is being read | ADM | 2 | 1 | L | 4 |
| 83 | Add a loading state to the "Re-order snap cards" drag interaction — animate a 2px accent-coloured insertion line at the drop target during drag | ADM | 2 | 2 | M | 4 |
| 84 | Add a loading overlay to start.html's colour-picker step while the contrast check for the chosen accent against `#0d0e1a` is computed | STR | 2 | 2 | M | 3 |
| 85 | Add a loading state to the landing.html early-access form — show "Joining the list…" on the CTA button while the email is being submitted | LND | 4 | 1 | L | 2 |
| 86 | Implement a page-level skeleton (two grey blocks where nav and hero should be) visible for the first 200ms on landing.html on slow connections | LND | 3 | 3 | M | 4 |
| 87 | Add a loading state to the "Copy share link" action on able-v8.html — show "Copying…" for 400ms before the success state so the user sees feedback on slow clipboard API | V8 | 2 | 1 | L | 4 |
| 88 | Add a loading state to the admin broadcast subject-line AI assist button — consistent with the body-copy `.ai-trigger` loading pattern already in place | ADM | 2 | 1 | L | 4 |
| 89 | Add a loading state to the "Mark show as featured" toggle in admin.html — show a 200ms pulse on the show card while the featured flag is written | ADM | 2 | 1 | L | 4 |
| 90 | Implement a loading pulse for the genre/vibe tag selection step on start.html — show a shimmer while the tag options are being painted | STR | 2 | 1 | L | 4 |
| 91 | Add a loading state to the "Generate OG card" preview in admin.html — show a square aspect-ratio shimmer while the canvas renders | ADM | 3 | 2 | M | 4 |
| 92 | Show a loading state on the admin "Nudges" panel on first mount — pulse the nudge cards while the dismissed-nudges list is read from `able_dismissed_nudges` | ADM | 2 | 1 | L | 5 |
| 93 | Add a skeleton placeholder to the admin changelog / release notes panel while the notes are fetched from the CDN | ADM | 2 | 2 | L | 5 |
| 94 | Implement a global loading-state test suite in the Playwright smoke tests that verifies every async button enters and exits loading state correctly | ALL | 3 | 4 | L | 5 |
| 95 | Add a loading state to the "Create event" save action in admin.html — show "Creating show…" on the button for the duration of the write | ADM | 2 | 1 | L | 4 |
| 96 | Add a pulsing "Connecting…" state to the Supabase realtime subscription initialisation in admin.html so the live-fan-count indicator shows intent before the socket is open | ADM | 3 | 3 | M | 5 |
| 97 | Add a loading state to the rate-card expiry-date field in admin.html (freelancer layer) when the expiry countdown is being calculated on mount | ADM | 2 | 1 | L | 5 |
| 98 | Implement a loading state for the "Publish profile" action in admin.html (when Supabase lands) — show a multi-step progress indicator: Saving → Publishing → Live | ADM | 4 | 3 | M | 5 |
| 99 | Add a loading state to the image optimisation step in start.html when artwork is uploaded — show "Optimising…" with a progress bar below the dropzone | STR | 3 | 2 | M | 4 |
| 100 | Add a loading shimmer to the fan.html dashboard's "Artists you follow" grid while the followed-artist data is fetched from Supabase | V8 | 3 | 3 | L | 5 |
