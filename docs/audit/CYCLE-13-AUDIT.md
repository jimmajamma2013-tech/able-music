# ABLE — Cycle 13 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 12**
**Scores entering Cycle 13: World map 8.6/10 · Accessibility 8.7/10 · Copy system 9.2/10 · Artist tools 9.1/10 · Email 7.5/10**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — World map | 8.6/10 | 9.2/10 | Gig countdown, show click-through, near-me personalisation |
| B — Accessibility (WCAG 2.2 AA) | 8.7/10 | 9.2/10 | VoiceOver flows, reduced-motion admin, keyboard fan form |
| C — Email system | 7.5/10 | 8.5/10 | Confirmation email copy, artist welcome, fan unsubscribe deep link |
| D — Artist tools | 9.1/10 | 9.4/10 | Profile completeness edge cases, snap card image, gig flow polish |
| E — Copy system | 9.2/10 | 9.5/10 | Snap card empty state, released-out badge, remaining banned phrase audit |

---

## Dimension A — World Map
*Score: 8.6/10 → target 9.2/10. Gig show countdown and click-through.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Gig countdown in world map: when state is `gig`, a countdown chip in the map header shows "Tonight: doors 8pm" — verify `#gigCountdown` updates from `able_shows` featured show | V8 | 4 | 2 | M | 1 |
| 2 | Show click-through: tapping a show row in the world map tab navigates to the ticket URL in a new tab — verify `renderShowsSection()` includes `href` on show items | V8 | 4 | 1 | L | 1 |
| 3 | Map empty state: when artist has no fan location data, map shows "Your fans are all over. Share your link." — verify empty state copy | V8 | 3 | 1 | L | 1 |
| 4 | Near-me shows: shows tab inside world map renders venue/date/ticket for all upcoming shows — verify sorted ascending by date | V8 | 4 | 1 | L | 1 |
| 5 | Featured show accent: `.show-item--featured` has `border-left: 3px solid var(--color-accent)` — verify this token is present | V8 | 2 | 1 | L | 1 |
| 6 | World map tab active on gig night: when state is `gig`, the shows tab is active by default — verify `setActiveTab('shows')` is called inside `renderWorldMap()` on gig state | V8 | 3 | 1 | L | 1 |
| 7 | Map cell tooltip: `.wm-cell:not(.wm-cell--empty)` shows a tooltip with country name on hover — verify `title` attribute is present | V8 | 2 | 2 | L | 2 |
| 8 | World map total fan count: the `#worldFanCount` element shows total confirmed fans — verify it updates when fans are added | V8 | 3 | 1 | L | 1 |
| 9 | Shows count badge: if artist has 2+ upcoming shows, the shows tab label shows "Shows (N)" — verify badge updates from `able_shows` | V8 | 3 | 2 | M | 2 |
| 10 | Sold-out state: when `show.soldOut` is true, show the sold-out badge and disable the ticket button — verify logic in `renderShowsSection()` | V8 | 3 | 1 | L | 1 |
| 11 | Past show filter: shows older than 24h after `show.date` should be hidden — verify the 24h trailing filter is in `renderShowsSection()` | V8 | 3 | 1 | L | 1 |
| 12 | Show date formatting: `show.date` renders as `"Wed 18 Mar"` (day + date + month) — verify `toLocaleDateString('en-GB', {weekday:'short',day:'numeric',month:'short'})` is used | V8 | 2 | 1 | L | 1 |

---

## Dimension B — Accessibility (WCAG 2.2 AA)
*Score: 8.7/10 → target 9.2/10. Keyboard, reduced-motion, screen reader completeness.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 13 | `prefers-reduced-motion` in admin: `.gold-blur { transition: filter .35s }` and snap card animation should be suppressed — add `@media (prefers-reduced-motion: reduce)` rules in admin.html CSS | ADM | 3 | 2 | L | 1 |
| 14 | Fan list keyboard navigation: `.fan-list-row` is `div` not `button` — verify each row has `tabindex="0"` and `keydown` enter/space to open detail sheet | ADM | 4 | 2 | M | 1 |
| 15 | Platform links accessible name: `.platform-pill` elements — verify each has `aria-label="Listen on [Platform]"` (not just an icon) | V8 | 3 | 1 | L | 1 |
| 16 | Snap card dismiss accessible: snap card close button `×` — verify it has `aria-label="Dismiss [card title]"` | V8 | 3 | 1 | L | 1 |
| 17 | Show ticket button accessible: "Get tickets" button — verify it has `aria-label="Get tickets for [show.venue] on [date]"` | V8 | 3 | 2 | M | 2 |
| 18 | Admin modal focus trap: when admin sheet opens, focus should be trapped inside — verify first focusable element receives focus and Tab wraps | ADM | 4 | 2 | M | 2 |
| 19 | Fan form error focus: when fan email validation fails, focus moves to the error message — verify `errorEl.focus()` is called after setting error text | V8 | 3 | 1 | L | 1 |
| 20 | CTA button contrast: `--color-accent` against `--color-bg` — verify contrast ratio meets WCAG 4.5:1 for the default red (#e05242 on #0d0e1a) | V8 | 4 | 1 | L | 1 |
| 21 | Skip to content link: `<a class="skip-link" href="#main-content">Skip to content</a>` at top of able-v8.html — verify it exists and is positioned off-screen | V8 | 3 | 2 | M | 2 |
| 22 | Admin sidebar landmark: `<nav>` wraps admin navigation menu — verify `role="navigation"` or proper `<nav>` element | ADM | 3 | 1 | L | 1 |
| 23 | Countdown timer accessible: `#countdown` element — verify `aria-label` reads "Releasing in X days" dynamically | V8 | 3 | 2 | M | 2 |
| 24 | Image alt text: `.release-card img` — verify `alt` is set to release title, not empty | V8 | 3 | 1 | L | 1 |

---

## Dimension C — Email System
*Score: 7.5/10 → target 8.5/10. Fan confirmation copy and artist welcome.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 25 | Fan confirmation subject line: `fan-confirmation.js` sends "You're in." — verify subject is `"You're in, [artistName]'s got you."` not generic "Confirmation" | API | 4 | 1 | L | 1 |
| 26 | Fan confirmation body copy: verify body includes artist accent colour as inline CTA button background — not plain link | API | 3 | 2 | M | 2 |
| 27 | Artist welcome email: when artist completes wizard, verify `artist-welcome.js` netlify function exists and is wired to `start.html` `submitWizard()` completion | ADM | 4 | 3 | M | 2 |
| 28 | Unsubscribe deep link: fan confirmation email footer has `?action=unsubscribe&artist=[slug]&email=[encoded]` URL — verify it resolves to `fan.html` unsubscribe handler | API | 4 | 1 | L | 1 |
| 29 | Fan confirmation personalised: when artist is in pre-release state and has a `releaseTitle`, confirmation body includes "P.S. [title] drops [date]. You'll be the first." | API | 4 | 2 | M | 2 |
| 30 | Email rate guard: `fan-confirmation.js` — verify it returns 429 if the same email is submitted more than 3× in 60 seconds | API | 3 | 2 | M | 2 |
| 31 | Email from address: verify `from` in fan-confirmation is `ABLE <noreply@ablemusic.co>` not a Resend default | API | 3 | 1 | L | 1 |
| 32 | Email plain text fallback: `fan-confirmation.js` sends both HTML and `text` versions — verify `text` field is set (not just `html`) | API | 3 | 1 | L | 1 |
| 33 | Artist fan alert email: when new fan signs up, artist receives a brief "New fan: [email] from [source]" notification — verify `artist-fan-alert.js` exists or is planned | API | 3 | 2 | M | 2 |
| 34 | Email preview in admin: a "Preview confirmation email" button in admin shows the email template in a `<pre>` block or modal — not critical but drives artist confidence | ADM | 3 | 3 | M | 3 |

---

## Dimension D — Artist Tools
*Score: 9.1/10 → target 9.4/10. Profile completeness edge cases and snap card image.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 35 | Snap card image upload: snap cards with `type: 'image'` — verify `addSnapCard()` supports an optional image URL field | ADM | 4 | 3 | M | 2 |
| 36 | Completeness 100% at wizard exit: when start.html wizard finishes, admin `completenessPct` should compute ≥80% — verify name+bio+CTA+artwork from wizard all write to `able_v3_profile` | ADM | 4 | 1 | L | 1 |
| 37 | Platform URL validation error message: `validatePlatformUrl()` shows field-level error "That doesn't look like a [Platform] URL." — verify message is platform-specific | ADM | 3 | 1 | L | 1 |
| 38 | Show count cap on free tier: free artists are capped at 3 shows — verify `renderShowsList()` enforces this cap and shows a specific gate message | ADM | 3 | 1 | L | 1 |
| 39 | Profile name maxlength: `#profileName` input has `maxlength="60"` — verify attribute is present | ADM | 2 | 1 | L | 1 |
| 40 | Bio character count token: bio textarea shows remaining characters using CSS counter — verify `data-remaining` attribute is updated by JS on each input event | ADM | 3 | 1 | L | 1 |
| 41 | Accent colour contrast auto-feedback: when artist picks a very light accent on dark theme, show a subtle warning "This might be hard to read on the dark theme" if contrast < 3.0 | ADM | 3 | 2 | M | 2 |
| 42 | Wizard re-entry: if artist navigates back to start.html with existing profile, wizard pre-fills name/bio — verify `prefillWizard()` or equivalent reads from `able_v3_profile` | STR | 3 | 1 | L | 1 |
| 43 | Top card video URL validation: when artist pastes a YouTube/Vimeo URL as top card, verify `isSafeMediaUrl()` rejects non-oEmbed sources | ADM | 4 | 1 | L | 1 |
| 44 | Snap card drag reorder: snap cards have drag handles — verify `dragstart`/`dragover`/`drop` handlers are wired and `able_v3_profile.snapCards` order updates | ADM | 3 | 2 | M | 2 |
| 45 | Credits artist-link: when a credit is confirmed, `renderRec()` renders the artist name as a link to their ABLE profile if their handle is known | ADM | 4 | 2 | M | 2 |

---

## Dimension E — Copy System
*Score: 9.2/10 → target 9.5/10. Final edge-case copy audit.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 46 | Snap card empty state: no snap cards — empty state reads "No updates yet. Add a snap card to tell fans what's happening." — verify copy | ADM | 2 | 1 | L | 1 |
| 47 | Released-out badge phrasing: `.show-item__sold-out-badge` shows "Sold out" (not "SOLD OUT" or "Unavailable") — verify | V8 | 2 | 1 | L | 1 |
| 48 | Fan list empty state: no fans — reads "No fans yet. Share your link and your list begins." — verify copy not generic "No results" | ADM | 3 | 1 | L | 1 |
| 49 | Admin nudge copy audit: all nudge cards — verify none use "Grow", "Boost", "Engage", or "Monetise" | ADM | 3 | 1 | L | 1 |
| 50 | Pro upsell copy specificity: all `glo-sub` elements — verify they describe the specific outcome ("See where fans came from") not generic promise ("Unlock analytics") | ADM | 3 | 1 | L | 1 |
| 51 | Platform pill label: "Spotify" / "Apple Music" pills — verify they use the full brand name not abbreviation | V8 | 2 | 1 | L | 1 |
| 52 | Fan capture heading in gig state: verify heading reads "On tonight. Stay close." (not "Get on my list" generic fallback) | V8 | 3 | 1 | L | 1 |
| 53 | Campaign HQ empty state: no release set — reads "No release set. Add a title and date to start your campaign." — verify | ADM | 3 | 1 | L | 1 |
| 54 | Profile page meta description: `<meta name="description">` updates to artist bio when profile loads — verify `applyProfile()` writes to `document.querySelector('meta[name="description"]')` | V8 | 3 | 1 | L | 1 |
| 55 | Fan email validation copy: `"That doesn't look right — try a different email?"` — verify exact copy matches (not "Invalid email address") | V8 | 3 | 1 | L | 1 |
| 56 | Show ticket copy: "Get tickets" button — verify not "Buy tickets" or "Book now" (artist voice: casual, direct) | V8 | 2 | 1 | L | 1 |
| 57 | Admin error banner copy: offline banner reads "You're offline. Changes save locally and sync when you're back." — verify | ADM | 3 | 1 | L | 1 |
| 58 | Gig mode off confirmation: when artist turns off gig mode, toast reads "Gig mode off." — not "Disabled." | ADM | 2 | 1 | L | 1 |
| 59 | Completeness nudge copy: first-missing nudge — verify copy reads "Add your [missing thing]. It's the thing artists forget first." style — not "Complete your profile" | ADM | 3 | 1 | L | 1 |
| 60 | Fan detail sheet copy: fan name is email — verify sheet heading uses first part of email (`email.split('@')[0]`) not the full address | ADM | 2 | 1 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (gig countdown verify) → #2 (show click-through verify) → #3 (map empty state) → #4 (near-me shows sorted) → #5 (featured show accent) → #6 (map tab gig active) → #8 (world fan count verify) → #10 (sold-out state verify) → #11 (past show filter verify) → #12 (show date format) → #13 (reduced-motion admin) → #14 (fan row keyboard nav) → #15 (platform pill aria) → #16 (snap card close aria) → #19 (fan form error focus) → #20 (CTA contrast verify) → #22 (admin sidebar landmark) → #24 (release card alt) → #25 (confirmation subject) → #28 (unsubscribe deep link) → #31 (email from address) → #32 (email plain text) → #36 (completeness wizard exit) → #37 (platform URL error message) → #38 (show count cap verify) → #39 (name maxlength) → #40 (bio char count) → #42 (wizard re-entry) → #43 (top card URL validation) → #46 (snap empty state) → #47 (sold-out badge) → #48 (fan list empty state) → #49 (nudge copy audit) → #50 (glo-sub specificity) → #51 (platform pill label) → #52 (gig fan capture heading) → #53 (CHQ empty state) → #54 (meta description) → #55 (email validation copy) → #56 (get tickets copy) → #57 (offline banner copy) → #58 (gig off toast) → #59 (completeness nudge) → #60 (fan detail heading)

**Wave 2 (after Wave 1 committed):**
#7 (map cell tooltip), #9 (shows count badge), #17 (ticket button aria), #18 (admin focus trap), #21 (skip to content), #23 (countdown aria), #26 (email CTA button), #27 (artist welcome email), #29 (confirmation personalised), #30 (email rate guard), #33 (fan alert email), #35 (snap card image), #41 (accent contrast warn), #44 (snap drag reorder), #45 (credits link)

**Wave 3 (polish):**
#34 (email preview in admin)
