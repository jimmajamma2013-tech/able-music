# ABLE — Cycle 17 Audit
**Generated: 2026-03-17 | Targeting artist profile, freelancer, world map / page state, error states**
**Scores entering Cycle 17: Artist profile 9.2 · Freelancer 8.7 · World map 9.1 · Page state 9.0 · Error states 7.5**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Artist profile (non-Supabase) | 9.2/10 | 9.5/10 | Biggest page gap; many improvements don't need backend |
| B — Freelancer profile | 8.7/10 | 9.0/10 | Lowest-scoring page; credits + rate card work ready to spec |
| C — World map + page state | 9.0/10 | 9.3/10 | Date grouping edge cases; post-release nudge gap; auto-switch polish |
| D — Error states (remaining) | 7.5/10 | 8.5/10 | Offline page; network-error fan capture; profile load gap |
| E — Admin micro-UX | 9.8/10 | 9.9/10 | Final polish pass before Supabase auth work begins |

---

## Dimension A — Artist profile
*Score: 9.2/10 → target 9.5/10. Non-Supabase improvements only.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Snap card drag-to-reorder: when artist has ≥2 snap cards — enable drag handle on each card so order can be changed; persist order in `able_v3_profile.snapCards` array | V8 | 5 | 3 | M | 2 |
| 2 | Release card skeleton: show 2 skeleton cards in `#listen-section` while `renderListenSection` defers via IntersectionObserver (instead of blank space) | V8 | 4 | 2 | M | 2 |
| 3 | Pre-save copy on CTA: when state = `pre-release` — verify the hero CTA text is "Pre-save" not "Save" (exact label check) | V8 | 4 | 1 | L | 1 |
| 4 | Gig mode hero sub-label: when state = `gig` — verify the hero section shows "On tonight" sub-label below artist name (not just "Gig mode") | V8 | 4 | 1 | L | 1 |
| 5 | Live state release date: when state = `live` — verify release card shows "Out now" label with date formatted as "Released 17 Mar" | V8 | 3 | 1 | L | 1 |
| 6 | Merch section sold-out state: when `item.soldOut === true` — show "Sold out" badge on merch card, disable tap-to-buy (no redirect) | V8 | 4 | 2 | M | 2 |
| 7 | Fan sign-up success animation: after fan signs up — show a brief checkmark animation on the CTA before reverting to "Joined" (currently instant swap) | V8 | 4 | 2 | M | 2 |
| 8 | Snap card video embed: when `card.type === 'video'` and `card.videoUrl` — render an embedded video in the snap card (not just an image) | V8 | 4 | 2 | M | 2 |
| 9 | Profile completeness bar (public): when owner visits their own profile — show a subtle "Your profile is X% complete" nudge (only visible to owner via ?owner=true) | V8 | 3 | 2 | M | 2 |
| 10 | Social proof tag: when artist has ≥10 fans — show a subtle "10 people follow this artist" tag below the fan capture form | V8 | 3 | 2 | M | 2 |

---

## Dimension B — Freelancer profile
*Score: 8.7/10 → target 9.0/10. Credits, rate card, portfolio polish.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 11 | Credits section heading: verify it reads "Credits" not "My work" — must match the ABLE copy voice | FRL | 4 | 1 | L | 1 |
| 12 | Rate card expiry indicator: when rate card has an `expiresAt` date — show "Rate valid until [date]" below the rate (already specced in ORDERING DOCTRINE) | FRL | 4 | 2 | M | 2 |
| 13 | Booking enquiry 4-field validation: verify all 4 fields (name, email, project type, message) are validated before submit — not just email | FRL | 4 | 1 | L | 1 |
| 14 | Credit card unconfirmed state: when a credit is unconfirmed (`confirmed: false`) — verify it renders as plain text (not a link) | FRL | 4 | 1 | L | 1 |
| 15 | Credit card confirmed state: when a credit is confirmed (`confirmed: true`) — verify it renders as a link to the artist's ABLE page | FRL | 5 | 2 | M | 2 |
| 16 | Portfolio audio player: when a portfolio item has `audioUrl` — render an inline `<audio>` player with play/pause control (no external redirect) | FRL | 5 | 3 | H | 2 |
| 17 | "Artists on ABLE" strip: auto-generate a strip of confirmed ABLE artists from the freelancer's confirmed credits (up to 4 shown) | FRL | 4 | 2 | M | 2 |
| 18 | Empty credits state: when no credits — show "Ask the artists you've worked with to confirm your credit on their page." | FRL | 3 | 1 | L | 1 |
| 19 | Freelancer profile `og:type`: verify it's `"profile"` not `"website"` | FRL | 3 | 1 | L | 1 |
| 20 | Freelancer page `<title>`: verify format is "[Name] — [Role] · ABLE" not generic | FRL | 3 | 1 | L | 1 |

---

## Dimension C — World map + page state
*Score: 9.0/10 → target 9.3/10. Date grouping edge cases, post-release nudge, auto-switch polish.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 21 | Post-release nudge: when state switches from `live` to `profile` (14 days after release) — show a one-time nudge in admin: "Your release window closed. Share a follow-up or plan your next one." | ADM | 5 | 2 | M | 2 |
| 22 | Multi-show same-day dot limit: when a calendar cell has ≥4 shows — show 3 dots + "+N" text badge (not 4+ dots overflowing the cell) | V8 | 4 | 1 | L | 1 |
| 23 | World-map moment `timezone` label: when moment has a city — show the city's timezone abbreviation (e.g. "BST", "EST") next to the time in the panel | V8 | 3 | 2 | M | 2 |
| 24 | Gig mode 24h cap UI: when gig mode is active — show remaining time in the Campaign HQ strip: "Gig mode · 4h 23m remaining" (uses existing expiry timestamp) | ADM | 4 | 2 | M | 2 |
| 25 | State auto-switch toast: when state auto-switches from pre-release → live (release date reached) — show a toast "Your release is live." on the artist's next admin visit | ADM | 4 | 1 | L | 1 |
| 26 | State auto-switch toast dismiss: when the live-state toast fires — verify it is dismissed and not shown again (`able_dismissed_nudges` pattern) | ADM | 3 | 1 | L | 1 |
| 27 | World-map panel show count: when panel opens — show "N shows on this date" in the panel header, not just date string | V8 | 3 | 1 | L | 1 |
| 28 | Release countdown precision: when < 1 hour to release — switch from HH:MM:SS to "Less than an hour" copy (humanised) | V8 | 3 | 1 | L | 1 |
| 29 | Past release world-map: when profile is in `profile` state (post-14-days) — hide the calendar entirely for fan view (there's nothing upcoming to show) | V8 | 3 | 1 | L | 1 |
| 30 | Gig show type icon: when a show in the world-map panel has `type: 'headline'` vs `type: 'support'` — show a subtle icon difference (star vs triangle) | V8 | 2 | 2 | M | 3 |

---

## Dimension D — Error states (remaining)
*Score: 7.5/10 → target 8.5/10. Offline page, network-error capture, profile load state.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 31 | Offline fallback page: create `/offline.html` — minimal "You're offline. Check your connection." branded page; reference in `netlify.toml` as 404 fallback | ALL | 5 | 2 | M | 2 |
| 32 | Fan sign-up localStorage-first: when fan form submits and any Supabase call fails — silently fall back to localStorage and show "You're on the list." (not a network error) | V8 | 5 | 2 | M | 2 |
| 33 | Profile load error UI: when `safeLS(V3_KEY, {})` returns `{}` and name is missing — show "This artist hasn't set up their page yet." with a "Find artists →" link | V8 | 4 | 2 | M | 2 |
| 34 | Admin fan delete undo: when fan is deleted — show a toast with "Undo" button for 5s; restore to array if Undo is pressed before dismiss | ADM | 4 | 2 | M | 2 |
| 35 | Shows form error message: when show save fails (date format invalid, missing venue) — show a specific inline error below the field, not just a generic toast | ADM | 4 | 1 | L | 1 |
| 36 | Session expiry notice: when Supabase auth token expires — show a gentle banner "Your session expired. Sign in again to save changes." (deferred until auth lands, but add the UI hook) | ADM | 4 | 2 | M | 2 |
| 37 | Import error recovery: when Spotify import fails silently — show "Import failed. You can still fill in your releases manually." (not a blank state) | V8 | 3 | 1 | L | 1 |
| 38 | Fan form spam guard: when same email submits within 5 minutes — show "You're already on the list." (dedup already exists, but verify the timing guard) | V8 | 3 | 1 | L | 1 |
| 39 | Admin backup export: when localStorage is getting full (≥80% of quota) — offer "Export everything as JSON" in the settings panel alongside the clear-cache button | ADM | 3 | 2 | M | 2 |
| 40 | Snap card load error: when `card.imageUrl` fails to load — show the card text content on a coloured background (accent colour), not a broken image | V8 | 3 | 1 | L | 1 |

---

## Dimension E — Admin micro-UX
*Score: 9.8/10 → target 9.9/10. Final polish before Supabase auth.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 41 | Analytics date range: add a "Last 7 days / 30 days / All time" filter to the stats cards — uses existing `able_views` and `able_clicks` arrays filtered by ts | ADM | 5 | 2 | M | 2 |
| 42 | Fan search keyboard shortcut: `⌘K` / `Ctrl+K` focus the fan search input directly | ADM | 3 | 1 | L | 1 |
| 43 | Fan email copy on click: when fan row is tapped — copy the email to clipboard and show "Copied." toast (quicker than opening the sheet) | ADM | 4 | 1 | L | 1 |
| 44 | Snap card character counter: when editing snap card text — show "47/280" character counter below the textarea (not just on over-limit) | ADM | 3 | 1 | L | 1 |
| 45 | Connections section genre filter: when browsing connections — show a genre filter pill row so artist can narrow to "producers" / "mixers" / "videographers" | ADM | 3 | 2 | M | 2 |
| 46 | Broadcast preview on all tiers: Artist Pro preview of email broadcast should show a real fan count ("Your broadcast will reach 47 fans") not a static demo | ADM | 4 | 1 | L | 1 |
| 47 | Admin `<title>` dynamic: when profile has a name — set `document.title` to "[Name] — ABLE Dashboard" (currently static "ABLE Dashboard") | ADM | 3 | 1 | L | 1 |
| 48 | Shows section sort: when shows are added out of date order — verify the shows list always renders in ascending date order (nearest first) | ADM | 4 | 1 | L | 1 |
| 49 | Admin greeting time-aware: "Good morning / Good afternoon / Good evening, [Name]." — time-of-day salutation | ADM | 3 | 1 | L | 1 |
| 50 | Snap card preview on share: when fan taps share icon on snap card — show a share sheet with card title + ablemusic.co link pre-populated | ADM | 3 | 2 | M | 2 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#3 (pre-save CTA copy verify) → #4 (gig mode hero sub-label) → #5 (live state "Out now") → #11 (credits heading) → #13 (booking enquiry validation) → #14 (credit unconfirmed plain text) → #18 (credits empty state) → #19 (freelancer og:type) → #20 (freelancer title) → #22 (calendar dot limit) → #25 (state auto-switch toast) → #26 (toast dismiss persisted) → #27 (panel show count) → #28 (countdown humanised) → #29 (past release calendar hide) → #35 (shows form error) → #37 (import error recovery) → #38 (fan form timing guard) → #40 (snap card load error) → #42 (fan search keyboard shortcut) → #43 (fan email copy on click) → #44 (snap card character counter) → #46 (broadcast real fan count) → #47 (admin title dynamic) → #48 (shows sort ascending) → #49 (greeting time-aware)

**Wave 2 (after Wave 1 committed):**
#1 (snap card drag reorder), #2 (release skeleton), #6 (merch sold-out), #7 (fan sign-up animation), #8 (snap video embed), #9 (owner completeness bar), #10 (social proof tag), #12 (rate card expiry), #15 (confirmed credit link), #16 (portfolio audio), #17 (artists on ABLE strip), #21 (post-release nudge), #23 (timezone label), #24 (gig remaining time), #31 (offline.html), #32 (fan localStorage-first), #33 (profile load error UI), #34 (fan delete undo), #36 (session expiry hook), #39 (backup export), #41 (analytics date range), #45 (connections genre filter), #50 (snap card share)

**Wave 3 (polish):**
#30 (show type icons) · Playwright smoke test · Manual 375px test · VoiceOver on real iPhone
