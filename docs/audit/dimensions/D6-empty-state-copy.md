# Dimension D6 — Empty State Copy
**Category:** Copy, Voice & Messaging
**Phase:** 4 (Copy)
**Status:** Draft — code-grounded

Every empty state is a teaching moment. When an artist opens a section and sees nothing, they need to understand what should be there, why it matters, and what the first action is. "No data yet" fails all three tests. Full compliance means every empty panel, every zero-stat, every blank list, and every first-run experience has copy that teaches, motivates, and points to the next action — in ABLE voice, without exclamation marks, without SaaS filler. An artist opening admin.html for the first time should be able to navigate the entire product using only the empty-state copy as a guide.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | admin.html line 3906: `'No fans yet — share your link.'` — replace with `'When fans sign up on your page, they'll appear here. Your list. Your relationship. No algorithm in the way.'` (spec canonical) | ADM | 5 | 1 | L | 1 |
| 2 | admin.html line 4384: `'No shows listed yet. Add one and ABLE will surface it to fans on your page automatically.'` — "ABLE will surface it" is platform language; replace with `'No shows listed yet. Add one and it appears on your page automatically.'` | ADM | 4 | 1 | L | 1 |
| 3 | admin.html line 5469: identical duplicate of the shows empty state at line 4384 — fix both; confirm they share one source of truth (single render function) | ADM | 3 | 1 | L | 2 |
| 4 | admin.html line 3146: `'No updates yet. Add one to post a note, link, or snippet on your profile.'` — "post" is a banned verb; replace with `'No snap cards yet. Add one — a note, a link, or a moment — and it lives on your page.'` | ADM | 4 | 1 | L | 1 |
| 5 | admin.html line 3168: `'No clips yet. Add one to share a video moment with your fans.'` — "share with your fans" is marketing language; replace with `'No clips yet. Add a video moment and it plays on your page.'` | ADM | 3 | 1 | L | 2 |
| 6 | admin.html line 5097: `'No releases yet. Paste a Spotify, YouTube, SoundCloud, or Bandcamp URL below — title and artwork fill in automatically.'` — this is well-written; confirm it is retained as-is | ADM | 2 | 1 | L | 3 |
| 7 | admin.html line 6057: `'Nothing in the shop yet. Add a piece and fans can tap straight to it from your page.'` — confirm this is retained; it is clean and direct | ADM | 2 | 1 | L | 3 |
| 8 | admin.html line 6168: `'No support packs yet. Add one and fans can contribute directly — 0% goes to ABLE, Stripe fee only.'` — clean; confirm retained | ADM | 2 | 1 | L | 3 |
| 9 | admin.html line 3266–3267: `'No recommendations yet. Share artists who've shaped your sound.'` — good; confirm retained | ADM | 2 | 1 | L | 3 |
| 10 | admin.html line 3390: `'No clicks recorded yet — share your page to start seeing data.'` — confirm retained; direct and specific | ADM | 2 | 1 | L | 3 |
| 11 | admin.html line 6497–6500: activity feed empty state uses emoji (`📡`) and generic title `'Nothing yet'` — emoji banned in admin; replace icon with a CSS indicator; keep body copy `'Put your link in your Instagram bio — the first tap shows up here.'` | ADM | 3 | 2 | M | 2 |
| 12 | admin.html line 4652: second occurrence of fan list empty state in a mini-list context: `'No fans yet — share your link.'` — sync with the canonical string from item 1 | ADM | 3 | 1 | L | 1 |
| 13 | admin.html line 6567: `'No upcoming moments yet. Add shows in the Events page, or add a moment here.'` — "moments" is an internal term; replace with `'No upcoming shows. Add one in the Events page and it appears here automatically.'` | ADM | 3 | 1 | L | 2 |
| 14 | admin.html line 2713: `'No upcoming moments yet. Add your first.'` — duplicate of the above; same fix | ADM | 3 | 1 | L | 2 |
| 15 | admin.html zero-stat for click rate (line 6375): `'Share your link to see taps'` (day 1) and `'No clicks yet'` (subsequent) — confirm these two strings exist and are correct; "taps" is the right word | ADM | 2 | 1 | L | 3 |
| 16 | admin.html: no empty state for the fan star list when no fans are starred — add a zero-state visible only when the Starred filter is active: `'No starred fans yet. Tap the star on any fan card to keep them close.'` | ADM | 3 | 2 | M | 2 |
| 17 | admin.html: no empty state for the fan source breakdown when all sources are zero — add: `'Source data shows once fans start signing up.'` | ADM | 3 | 2 | M | 2 |
| 18 | admin.html: fan search empty state — when a search returns no results, show: `'No fans match that search.'` rather than a blank list | ADM | 4 | 2 | M | 2 |
| 19 | admin.html: fan filter empty state — when Instagram / TikTok / Spotify filter returns no results, show: `'No fans from [source] yet.'` rather than a blank list | ADM | 3 | 2 | M | 2 |
| 20 | admin.html: credits section on a release with no credits — if the credits list is empty after fetch, show: `'No credits added yet. Add a producer, mixer, or collaborator.'` | ADM | 3 | 2 | M | 2 |
| 21 | able-v8.html: music section is hidden when empty — confirm the section uses `hidden` attribute and never renders an empty section to fans; no visible empty state on the fan-facing page | V8 | 5 | 1 | L | 1 |
| 22 | able-v8.html: events/shows section is hidden when empty — same confirmation; shows section must not be visible with zero shows | V8 | 5 | 1 | L | 1 |
| 23 | able-v8.html: snap cards section `aria-label="Updates"` (line 5660) is hidden when empty — confirm `hidden` applied when `snapCards` array is empty | V8 | 4 | 1 | L | 1 |
| 24 | able-v8.html: merch section hidden when empty — confirm `hidden` applied | V8 | 4 | 1 | L | 1 |
| 25 | able-v8.html: support section hidden when empty — confirm `hidden` applied | V8 | 4 | 1 | L | 1 |
| 26 | able-v8.html: recs section hidden when empty — confirm `hidden` applied; `'Worth hearing'` heading must not show with no recommendations | V8 | 4 | 1 | L | 1 |
| 27 | able-v8.html: clips section hidden when empty — confirm `hidden` applied | V8 | 4 | 1 | L | 1 |
| 28 | able-v8.html: if fan capture is hidden (artist toggled off) but all other sections are also empty, the page should show a graceful not-yet-live state, not a completely blank page | V8 | 4 | 2 | M | 2 |
| 29 | fan.html line 1242: `'Find artists from their pages, or look through Discover.'` — reasonable but passive; replace with `'Follow an artist and they'll appear here. Find them through their page link, or browse Discover.'` | FAN | 3 | 1 | L | 2 |
| 30 | fan.html: Discover tab empty state (when no artists in the Discover pool) — needs a copy string: `'No artists in Discover yet. We're growing the network.'` — confirm this exists or add it | FAN | 3 | 2 | M | 2 |
| 31 | fan.html: Near Me empty state — needs: `'No artists near you on ABLE yet. Share the platform with artists you know.'` — confirm this exists | FAN | 2 | 2 | M | 3 |
| 32 | fan.html: upcoming shows tab empty state — needs: `'No upcoming shows from artists you follow. Check their pages directly.'` | FAN | 3 | 2 | M | 3 |
| 33 | fan.html: new drops tab empty state — needs: `'No new drops from artists you follow. When they release something, it'll be here.'` | FAN | 3 | 2 | M | 3 |
| 34 | start.html: no empty states expected in the wizard — but if Spotify import returns zero results, confirm the UI explains this clearly and does not leave the artist on a blank step | STR | 4 | 1 | L | 2 |
| 35 | admin.html: the `'section-empty-badge'` (line 1937) reads `'Empty'` — this is an admin-only badge shown when a section is visible but has no content; the tooltip says `'Visible but has no content — fans will see an empty section'`; confirm this is correct and consistent with the fan-facing hide logic | ADM | 4 | 1 | L | 1 |
| 36 | admin.html: the empty-badge logic (line 7928–7929) must trigger on all five major sections (music, shows, snap cards, merch, support) — audit which sections currently trigger it and which are missing | ADM | 3 | 2 | M | 2 |
| 37 | admin.html: if the artist has set a release date but added no release — the pre-release campaign state is active but no countdown target exists — this is a content gap that needs a nudge: `'Set a release URL so fans have something to pre-save.'` | ADM | 4 | 2 | M | 2 |
| 38 | admin.html: if gig mode is on but no shows are listed — the gig page state fires but fans see no event card — add a gate: can't enable gig mode without at least one show, or add an inline nudge: `'Add a show first so fans know where to get tickets.'` | ADM | 5 | 2 | M | 1 |
| 39 | admin.html: connections page empty state — if no platform links are connected, show: `'No platform links yet. Add Spotify, Apple Music, or anywhere fans find you.'` | ADM | 3 | 1 | L | 2 |
| 40 | admin.html: the fan broadcast compose area (when locked by tier gate) shows a blurred UI — when unlocked and the broadcast history is empty, show: `'No broadcasts sent yet. Write one and send it directly to your list.'` | ADM | 3 | 2 | M | 2 |
| 41 | admin.html: analytics page — when there is no view data, the stat strip should not show zeros with no context; add a day-1 empty state: `'Stats appear once your first fan visits your page.'` | ADM | 4 | 2 | M | 1 |
| 42 | admin.html line 6351: `'No data yet'` returned from a stat calculation function — this string must never reach the UI; all stat zero-states must be explicitly handled before rendering | ADM | 4 | 1 | L | 1 |
| 43 | admin.html: the milestone cards are well-written (line 3786 has `'100 fans. This is the free tier limit — and it means 100 people found you on their own.'`) — confirm all milestone strings are this quality and none use SaaS filler | ADM | 3 | 1 | L | 2 |
| 44 | admin.html: when exports return no data (fan list is empty and CSV export is triggered), `showToast('No fans yet — share your page to see who shows up.', 'amber')` (line 4117) — this is correct; confirm retained | ADM | 2 | 1 | L | 3 |
| 45 | admin.html: the Your World Map section (shows section on dashboard) line 2713 shows `'No upcoming moments yet. Add your first.'` — "moments" is inconsistent with "shows" everywhere else; change to `'No upcoming shows. Add one in the Events page and it appears here automatically.'` | ADM | 3 | 1 | L | 2 |
| 46 | admin.html: the quick-look strip at the top of the fans page — `<strong id="fcbCount">0</strong> on your list` and `/ 100 on free plan` — these are clean; confirm they render before any fans sign up (day 1 state) | ADM | 2 | 1 | L | 3 |
| 47 | admin.html: no empty state for the analytics "CTA taps" breakdown — when no clicks have been recorded, the breakdown panel should show: `'No taps recorded yet. Once someone taps a button on your page, it shows up here.'` | ADM | 4 | 2 | M | 2 |
| 48 | admin.html: the source breakdown section (where fans came from) — empty state when all sources are zero: `'Source data shows as fans sign up. Share your page link to start seeing where they come from.'` | ADM | 4 | 2 | M | 2 |
| 49 | admin.html: the activity feed on the home tab — if no events have fired, line 6497–6500 shows the `'Nothing yet'` empty state (with emoji) — the body is good; remove emoji, update title from `'Nothing yet'` to `'No activity yet.'` | ADM | 3 | 1 | L | 1 |
| 50 | admin.html: when the snap card limit is hit on free tier, the `showToast('Add as many Updates as you want on Artist plan.')` fires (line 5619) — this is a toast not an empty state, but it serves as the empty-of-remaining-slots state; replace with `'You've used your free snap card. Unlimited cards on Artist plan.'` | ADM | 4 | 1 | L | 1 |
| 51 | admin.html: the nudge bar (line 2660–2663) in the free tier reads `'Free plan. Broadcasts, full analytics, and deeper fan insight when you're ready.'` — confirm this is never shown when the fan list is empty (would be confusing on day 0) | ADM | 3 | 1 | L | 2 |
| 52 | admin.html: the first-run checklist (FRC) step 1 — `'Copy your link'` button (line 2483) — if the artist hasn't set a slug yet, this step should show `'Set your URL first — then copy it.'` | ADM | 3 | 2 | M | 2 |
| 53 | admin.html: the Profile page visual preview — when the artist has no artwork set, the preview shows an empty artwork container; add an inline hint: `'Add artwork in Releases to see it here.'` | ADM | 3 | 2 | M | 2 |
| 54 | admin.html: the "Your vibe" section — when no genre has been selected, show: `'No genre or vibe set. It shapes how your page looks and feels.'` | ADM | 3 | 2 | M | 3 |
| 55 | admin.html: the artist name field on the Profile page — when empty, the placeholder is `'Artist name'`; add a field hint below: `'This is what fans see at the top of your page.'` | ADM | 2 | 1 | L | 3 |
| 56 | admin.html: the bio field — when empty on initial load, show a field hint: `'One or two sentences about who you are. In your voice.'` | ADM | 3 | 2 | M | 3 |
| 57 | admin.html: the Campaign HQ section — when the artist has no release date set and page state is `profile`, show the natural mode description `'Your page in its natural state — recent music, your links, fan sign-up.'` (line 4828) — confirm this description is already visible in the UI | ADM | 3 | 1 | L | 2 |
| 58 | admin.html: the pre-release arc node tooltip (line 2568) — confirm the tooltip copy is visible and correct; empty state for that arc node before a release date is set | ADM | 2 | 1 | L | 3 |
| 59 | able-v8.html: the fan capture section — when no artist name is set in profile, the trust line `'Just {artist}. No spam.'` renders as `'Just . No spam.'` — this is an empty state bug; fall back to `'Just the artist. No spam.'` | V8 | 4 | 1 | L | 1 |
| 60 | able-v8.html: the `'What's coming'` section heading (line 5544) appears in pre-release state — if the section renders with no release date (edge case), remove the section entirely rather than showing `'What's coming'` with no content | V8 | 3 | 2 | M | 2 |
| 61 | start.html: the Spotify import step — if the artist skips Spotify and enters a name manually, the profile preview at the top of step 3 shows nothing until a name is typed; add a placeholder in the preview: `'Your name goes here.'` | STR | 3 | 2 | M | 3 |
| 62 | start.html: the vibe/genre selection step — if the artist proceeds without selecting a vibe, the page defaults to the first option silently; the empty state should make the default explicit: `'No vibe selected — defaulting to the first option.'` | STR | 2 | 2 | L | 3 |
| 63 | admin.html: the "Your links" section — if no platform links have been added, show: `'No streaming links yet. Add Spotify, Apple Music, or any URL.'` | ADM | 3 | 2 | M | 2 |
| 64 | admin.html: the merch section — if no merch is added but the section is toggled visible, the empty badge fires — confirm the nudge reads: `'Nothing in the shop yet. Add a piece and fans can tap straight to it from your page.'` | ADM | 3 | 1 | L | 2 |
| 65 | admin.html: the support section — if no support packs are added but section is toggled visible, confirm the empty badge fires and nudge reads the line 6168 copy | ADM | 3 | 1 | L | 2 |
| 66 | admin.html: the clips section — if no clips are added but the section is visible, confirm empty badge fires with: `'No clips yet. Add a video moment and it plays on your page.'` | ADM | 3 | 1 | L | 2 |
| 67 | admin.html: the recommendations section — if no recs are added but visible, empty badge fires; body reads `'No recommendations yet. Share artists who've shaped your sound.'` (line 3266) — confirm retained | ADM | 2 | 1 | L | 3 |
| 68 | admin.html: confirm none of the empty state strings contain exclamation marks — scan all `innerHTML` assignments in the JS rendering functions | ADM | 4 | 1 | L | 1 |
| 69 | admin.html: confirm none of the empty state strings use the word "content" as a noun (e.g. "No content yet") — "content" is too generic | ADM | 3 | 1 | L | 2 |
| 70 | admin.html: confirm none of the empty state strings use "Get started" as a call to action — replace any instances with a specific action verb | ADM | 4 | 1 | L | 1 |
| 71 | admin.html: the connections page — when Spotify is not connected, show: `'Not connected. Paste your Spotify artist URL to link your profile.'` | ADM | 3 | 1 | L | 2 |
| 72 | admin.html: the connections page — when Apple Music is not connected, show a similar specific prompt rather than a generic placeholder | ADM | 3 | 1 | L | 3 |
| 73 | admin.html: the broadcast page — when the artist has zero fans, disable the send button and show: `'You'll be able to send once fans have signed up.'` | ADM | 4 | 2 | M | 2 |
| 74 | admin.html: the scheduled broadcasts list (if implemented) — empty state: `'No scheduled sends. Compose one and pick a send time.'` | ADM | 2 | 2 | M | 3 |
| 75 | admin.html: the broadcast send history list — empty state: `'No broadcasts sent yet. Your first send will appear here.'` | ADM | 2 | 2 | M | 3 |
| 76 | fan.html: the `'Me'` tab — when the fan has no profile data set, show: `'Fill in your name and we'll personalise your artist feed.'` | FAN | 2 | 2 | M | 3 |
| 77 | fan.html: the `'Artists'` discovery tab — if the network is empty at MVP, show: `'No artists listed yet. Share ABLE with artists you know.'` | FAN | 3 | 2 | M | 3 |
| 78 | fan.html: the notifications/updates feed — empty state: `'Nothing yet. When artists you follow post an update, it appears here.'` | FAN | 3 | 2 | M | 3 |
| 79 | fan.html: if no artists have been followed, suppress the notification badge entirely rather than showing a zero | FAN | 3 | 2 | M | 3 |
| 80 | landing.html: the landing page has no user-visible empty states — but confirm that the proof strip numbers (£0, 100%, 5 min, 4, 0) are hardcoded rather than data-driven and cannot show blank | LND | 2 | 1 | L | 3 |
| 81 | admin.html: the view count stat — day 1 empty state: `'Share your link to see your first visitor.'` — confirm this fires on the first load before any views are recorded | ADM | 4 | 1 | L | 1 |
| 82 | admin.html: the fan sign-up rate stat — day 1 empty state: `'Sign-up rate shows once you have at least one view and one fan.'` | ADM | 3 | 2 | M | 2 |
| 83 | admin.html: the Campaign HQ — when the profile is completely new (no name, no data), should the campaign state be locked until a name is set? Confirm current logic and add a gate if absent | ADM | 4 | 2 | M | 2 |
| 84 | admin.html: the artist link preview in the settings page — if no slug is set, renders `'ablemusic.co/yourname'` as placeholder; confirm this is clearly a placeholder and not a live URL | ADM | 3 | 1 | L | 2 |
| 85 | admin.html: the embed preview area for releases — when a URL is entered but the oEmbed fetch is in progress, show a loading state rather than an empty container | ADM | 3 | 2 | M | 2 |
| 86 | admin.html: the embed preview area — when oEmbed fetch fails, show: `'Preview not available. The link is still saved.'` | ADM | 4 | 1 | L | 1 |
| 87 | admin.html: the gig mode expiry — when gig mode expires, the page returns to profile state; confirm the admin shows a notification rather than silently switching: `'Gig mode ended. Your page is back to your profile.'` | ADM | 4 | 2 | M | 2 |
| 88 | admin.html: the early access billing toast fires on plan upgrade buttons (lines 3433, 3548): `'Billing coming soon — currently in early access.'` — this is an empty state for the billing flow; confirm this is temporary and will be replaced with real billing UI | ADM | 3 | 1 | L | 2 |
| 89 | admin.html: the `'Your page is live.'` first-run celebration state in the FRC — confirm this state has copy that grounds the artist in what comes next, not just a celebration moment | ADM | 4 | 2 | M | 2 |
| 90 | admin.html: when the artist has zero clicks and zero fans after 7+ days, show a contextual nudge on the home tab: `'Your page has been live for a week. Share your link to see who shows up.'` | ADM | 4 | 3 | M | 3 |
| 91 | admin.html: the weekly fan chart — when it shows zero for all days, the chart renders empty bars; add an overlay: `'Share your link this week to see fans appear here.'` | ADM | 3 | 3 | M | 3 |
| 92 | admin.html: the daily view chart — same as above when all days are zero | ADM | 3 | 3 | M | 3 |
| 93 | admin.html: the connections page — Instagram link section — if Instagram handle is not set, show: `'Add your Instagram handle so fans know where to find you.'` | ADM | 3 | 2 | M | 3 |
| 94 | admin.html: the connections page — TikTok handle section — if not set, show: `'Add your TikTok handle.'` | ADM | 2 | 1 | L | 3 |
| 95 | admin.html: the snap card published/draft state — when a snap card exists but is in draft, it should not fire the empty state; confirm draft cards are counted in the `'No snap cards yet'` logic correctly (drafted cards exist but are unpublished) | ADM | 3 | 2 | M | 2 |
| 96 | admin.html: the release card — when a release URL has been entered but no metadata has been fetched yet, show: `'Fetching details...'` not a blank card | ADM | 4 | 2 | M | 1 |
| 97 | admin.html: the shows list — when a show has passed (past date), confirm expired shows either hide or move to a `'Past shows'` section, not remain in the active list making it appear populated when it shouldn't | ADM | 3 | 2 | M | 2 |
| 98 | fan.html: the fan page search — when search returns no artists: `'No artists found for that search.'` | FAN | 2 | 1 | L | 3 |
| 99 | All pages: audit every `innerHTML = ''` assignment that clears a list — each must be followed by a check that sets the appropriate empty state copy; a cleared list with no empty state is invisible to the artist | ALL | 4 | 2 | M | 2 |
| 100 | All pages: document all empty state strings in `docs/systems/copy/SPEC.md` §empty-states — they must be part of the canonical copy system so future developers have a single reference | ALL | 4 | 2 | M | 2 |
