# ABLE — Cycle 16 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 15**
**Scores entering Cycle 16: Fan dashboard 9.4→? · Freelancer profile 8.7→? · Error states 6.0→? · Copy system 9.4→? · SEO/OG 9.4→?**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Fan dashboard | 9.4/10 | 9.7/10 | Show cards, unread badges, artist new-release alerts |
| B — Error states | 6.0/10 | 8.0/10 | Error UI states are the biggest remaining gap; huge ROI |
| C — Accessibility | 9.0/10 | 9.3/10 | VoiceOver untested; keyboard trap audit; colour contrast edge cases |
| D — SEO / OG | 9.4/10 | 9.6/10 | JSON-LD for fan.html; structured data for landing page |
| E — Copy polish | 9.4/10 | 9.6/10 | Admin section empty states, gig mode copy, error toast wording |

---

## Dimension A — Fan dashboard
*Score: 9.4/10 → target 9.7/10. Show cards, alert states, new release badges.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | New release badge: when artist has a release since `lastVisit` — show a "New" pill on their artist card in the Following tab | FAN | 4 | 2 | M | 2 |
| 2 | Show card: when followed artist has a show in the next 30 days — show a show card in the "Coming up" section with venue + date + ticket link | FAN | 4 | 2 | M | 2 |
| 3 | Empty "Coming up" state: when no shows and no releases — show "Nothing announced yet. Check back." (not blank section) | FAN | 3 | 1 | L | 1 |
| 4 | Artist card tap tracking: when fan taps artist card — push `{label:'artist-card',type:'navigation',ts}` to `able_clicks` | FAN | 3 | 1 | L | 1 |
| 5 | `lastVisit` timestamp: set `fan_last_visit` in localStorage on each fan.html load — used for "New" badge calculation | FAN | 3 | 1 | L | 1 |
| 6 | Sort following list: followed artists sorted by most-recently-updated (releaseDate or show date nearest) not by follow order | FAN | 3 | 2 | M | 2 |
| 7 | Unsubscribe confirmation: when fan leaves an artist list — verify a "You've left [artist]'s list." toast fires | FAN | 3 | 1 | L | 1 |
| 8 | Fan page `<title>`: verify it reads "Your artists — ABLE" not a generic title | FAN | 2 | 1 | L | 1 |
| 9 | Fan page meta description: verify `<meta name="description">` is set (fan dashboard is noindex but still good practice) | FAN | 2 | 1 | L | 1 |
| 10 | Fan page keyboard: tab order through artist cards — verify each card is keyboard-focusable with `tabindex="0"` | FAN | 2 | 1 | L | 1 |

---

## Dimension B — Error states
*Score: 6.0/10 → target 8.0/10. Error UI states are the biggest remaining gap.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 11 | Profile load error UI: when `safeLS(V3_KEY, {})` returns `{}` and name is missing — show a friendly "Artist page not found" state instead of blank page | V8 | 5 | 2 | M | 2 |
| 12 | Admin data corruption UI: when `safeLS` returns non-object for profile — show "Something went wrong. Clear cache to reset." with a clear-cache button | ADM | 5 | 2 | M | 2 |
| 13 | Fan sign-up network error: when Supabase fan insert fails — show "Sign-up saved locally. We'll sync when you're back online." (localStorage-first UX) | V8 | 4 | 2 | M | 2 |
| 14 | Embed load error recovery: when embed iframe fails — verify fallback "Listen on [Platform] →" link appears within 4s | V8 | 4 | 1 | L | 1 |
| 15 | Image load error: when artist artwork fails to load — verify a placeholder gradient (accent colour) appears, not a broken img icon | V8 | 4 | 1 | L | 1 |
| 16 | Admin localStorage quota: when `setLS` fails due to quota exceeded — verify toast "Storage full — export your data to free space." fires | ADM | 4 | 1 | L | 1 |
| 17 | Admin offline banner: when navigator.onLine is false — show a subtle banner "You're offline — changes will sync when you reconnect." | ADM | 4 | 2 | M | 2 |
| 18 | CSV export empty guard: when fan list is empty and export is clicked — verify toast "No fans yet — share your page." fires (not silent fail) | ADM | 3 | 1 | L | 1 |
| 19 | Shows date parse error: when `ev.date` is malformed — verify show is skipped silently (no crash, no blank card) | V8 | 3 | 1 | L | 1 |
| 20 | Form validation error styling: fan sign-up — when email is invalid — verify the input has a visible error state (red border or error message below) | V8 | 3 | 1 | L | 1 |

---

## Dimension C — Accessibility
*Score: 9.0/10 → target 9.3/10. VoiceOver parity and keyboard nav audit.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 21 | World-map panel focus trap: when world-map panel is open — verify Tab key cycles within the panel (not escaping to background) | V8 | 4 | 2 | M | 2 |
| 22 | World-map panel close: when panel open — verify Escape key closes it | V8 | 4 | 1 | L | 1 |
| 23 | Fan sign-up form label: `<input type="email">` in fan capture — verify it has a visible `<label>` or `aria-label` (not just placeholder) | V8 | 4 | 1 | L | 1 |
| 24 | Toast `role="alert"`: all toasts — verify they have `role="alert"` and `aria-live="assertive"` for screen reader announcement | ALL | 4 | 1 | L | 1 |
| 25 | Tab bar icon labels: tab bar buttons — verify each has `aria-label` with full name (not just icon) | V8 | 3 | 1 | L | 1 |
| 26 | Admin modal focus return: when admin sheet closes — verify focus returns to the trigger element (fan row that was tapped) | ADM | 3 | 2 | M | 2 |
| 27 | Snap card image alt text: when snap card has imageUrl — verify `alt` is from `card.alt || card.title` (not empty) | ADM | 3 | 1 | L | 1 |
| 28 | Release card artwork alt: release card `<img>` — verify `alt` is `"${release.title} artwork"` not empty | V8 | 3 | 1 | L | 1 |
| 29 | Merch item alt text: merch card `<img>` — verify `alt` is merch item name | V8 | 3 | 1 | L | 1 |
| 30 | Platform pill aria-label: each platform pill — verify `aria-label` includes platform name + "open in new tab" | V8 | 2 | 1 | L | 1 |

---

## Dimension D — SEO / OG
*Score: 9.4/10 → target 9.6/10. Structured data for fan.html and landing.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 31 | Landing page JSON-LD: add `WebApplication` schema with `applicationCategory: "MusicApplication"` and `offers` | LND | 4 | 2 | M | 2 |
| 32 | fan.html `<meta name="robots" content="noindex">`: verify fan dashboard is not indexed (it's personal data) | FAN | 4 | 1 | L | 1 |
| 33 | start.html JSON-LD: add `WebApplication` schema — helps onboarding flow appear in music app searches | STR | 3 | 1 | L | 1 |
| 34 | able-v8.html `og:type`: verify it's `"profile"` for artist pages (not generic "website") | V8 | 3 | 1 | L | 1 |
| 35 | `twitter:label1` + `twitter:data1`: add `"Artist"` / `artist name` meta for rich card previews | V8 | 3 | 1 | L | 1 |
| 36 | Landing `og:image:alt`: verify the OG image has `<meta property="og:image:alt">` describing the image | LND | 3 | 1 | L | 1 |
| 37 | Sitemap.xml: verify it lists all 4 main pages (ablemusic.co, /fan, /start, /landing) with `<lastmod>` | ALL | 3 | 1 | L | 1 |
| 38 | Artist profile `og:image` dynamic: when profile has artworkUrl — verify OG image uses it (not hardcoded default) | V8 | 4 | 1 | L | 1 |
| 39 | `og:url` canonical: verify all pages set `og:url` to their canonical URL | ALL | 3 | 1 | L | 1 |
| 40 | BreadcrumbList for landing: add `BreadcrumbList` JSON-LD (Home > Features) for Google SERP breadcrumbs | LND | 2 | 1 | L | 1 |

---

## Dimension E — Copy polish
*Score: 9.4/10 → target 9.6/10. Admin empty states, error toasts, micro-copy.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 41 | Admin connections empty state: when no credits set — verify copy is "Link to the people you've made music with." not "No credits added" | ADM | 3 | 1 | L | 1 |
| 42 | Admin merch empty state: when no merch items — verify copy is "Something physical. Something they can hold." | ADM | 3 | 1 | L | 1 |
| 43 | Gig mode toast copy: when gig mode expires — verify toast reads "Gig mode off. Back to your profile." not a system message | ADM | 3 | 1 | L | 1 |
| 44 | Fan sign-up success: after successful sign-up — verify the confirmation copy is warm and specific (e.g. "You're on the list. I'll be in touch.") not generic "Success" | V8 | 4 | 1 | L | 1 |
| 45 | Admin section heading "Your fans": verify it reads "Your fans" not "Fan CRM" | ADM | 3 | 1 | L | 1 |
| 46 | Platform pills overflow label: when pills overflow — verify the toggle reads "more" or "+N" not "…" | V8 | 2 | 1 | L | 1 |
| 47 | Admin upgrade bar dismiss: when dismissed — verify it stays dismissed (localStorage `upgrade_bar_dismissed`) across sessions | ADM | 3 | 1 | L | 1 |
| 48 | Snap card "no cards" empty state: verify copy is "Add a card to share something that matters." not "No snap cards" | ADM | 3 | 1 | L | 1 |
| 49 | Error toast wording: storage-quota toast — verify it uses "full" not "exceeded" — friendlier register | ADM | 2 | 1 | L | 1 |
| 50 | Confirmation email subject: fan welcome — verify subject is "You're on [artist]'s list." not "Subscription confirmed" | EMAIL | 4 | 1 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#3 (fan empty "coming up") → #4 (artist card tap tracking) → #5 (lastVisit timestamp) → #7 (unsubscribe toast verify) → #8 (fan page title) → #9 (fan page meta description) → #10 (fan keyboard tabindex) → #14 (embed error recovery verify) → #15 (artwork fallback gradient) → #16 (quota toast verify) → #18 (CSV empty guard) → #19 (shows date parse guard) → #20 (form validation error state) → #22 (wm-panel Escape close) → #23 (fan form aria-label) → #24 (toast role=alert verify) → #25 (tab bar icon aria-label) → #27 (snap card alt text) → #28 (release card alt text) → #29 (merch alt text) → #30 (platform pill aria-label) → #32 (fan.html noindex) → #33 (start.html JSON-LD) → #34 (og:type profile verify) → #35 (twitter:label1) → #36 (landing og:image:alt) → #37 (sitemap verify) → #38 (dynamic og:image verify) → #39 (og:url canonical) → #40 (BreadcrumbList) → #41 (connections empty state) → #42 (merch empty state) → #43 (gig expire toast) → #44 (fan sign-up success copy) → #45 (Your fans heading) → #46 (pills overflow label) → #47 (upgrade bar dismiss persistence) → #48 (snap card empty state) → #49 (error toast wording) → #50 (email subject)

**Wave 2 (after Wave 1 committed):**
#1 (new release badge), #2 (show card in fan.html), #6 (sort following by recency), #11 (profile load error UI), #12 (admin corruption UI), #13 (fan sign-up network error), #17 (admin offline banner), #21 (wm-panel focus trap), #26 (admin modal focus return), #31 (landing JSON-LD)

**Wave 3 (polish):**
Full VoiceOver smoke test on real iPhone · Playwright smoke test run · Manual test at 375px
