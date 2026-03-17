# ABLE — Cycle 5 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 4 Wave 2**
**Scores entering Cycle 5: UX system 7.2/10 · World map 7.0/10 · Tier gates 6.5/10 · Data architecture 6.8/10 · Page state 7.5/10 · UI system 7.5/10**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — UX system polish | 7.2/10 | 8.5/10 | Fan sign-up friction, empty states, first-run flow gaps |
| B — Tier gates polish | 6.5/10 | 8.0/10 | Gold lock copy, gated feature previews, upgrade flow |
| C — Page state system | 7.5/10 | 8.8/10 | Pre-release countdown accuracy, gig toggle copy, auto-state transitions |
| D — UI system tokens | 7.5/10 | 8.8/10 | Remaining hardcoded hex values, component consistency |
| E — World map / shows polish | 7.0/10 | 8.5/10 | Shows section on artist profile, event card design |

---

## Dimension A — UX System Polish
*Score: 7.2/10 → target 8.5/10. Reduce friction in the fan and artist experience.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Fan sign-up button state: after successful sign-up, button should read "You're on the list." (not the generic success toast) — verify `handleFanSignup()` updates button text | V8 | 5 | 1 | L | 1 |
| 2 | Fan form email validation: show inline error "That doesn't look like an email." on invalid email before submit — not after — use `oninput` check after first submit attempt | V8 | 4 | 2 | L | 1 |
| 3 | Snap card link validation: when artist saves a snap card URL, check `new URL(val)` — if invalid, show inline error "That doesn't look like a link." before saving | ADM | 4 | 2 | L | 1 |
| 4 | CTA URL validation: when saving ctaPrimary.url or ctaSecondary.url in admin, check URL validity — warn inline if not a valid URL | ADM | 4 | 2 | L | 1 |
| 5 | Bio save feedback: when bio is saved (onblur), flash the adminBio border green for 600ms — subtle confirmation that the save happened | ADM | 3 | 1 | L | 1 |
| 6 | Name save feedback: same as bio — flash name field border on save | ADM | 3 | 1 | L | 1 |
| 7 | Fan list scroll to new: when a fan is starred or a new fan arrives, briefly highlight the row (background flash) to draw attention | ADM | 3 | 2 | M | 2 |
| 8 | Profile preview live update: "View page →" in topbar — add a subtle tooltip "Opens your live page in a new tab" for first-time users (localStorage key `able_preview_used`) | ADM | 2 | 1 | L | 2 |
| 9 | Mobile nav active state: verify `.mn-item.active` is set when `showPage()` runs on mobile — check the mobile nav item highlight code | ADM | 4 | 1 | L | 1 |
| 10 | Empty snap card body: snap card with no body text and no link renders as a near-blank card — show "(No description)" in grey in render if both empty | ADM | 3 | 1 | L | 1 |
| 11 | Completeness bar animation: `completenessFill` width change should transition (CSS transition already on the bar) — verify `transition: width 0.4s ease` is on `.completeness-fill` | ADM | 2 | 1 | L | 1 |
| 12 | Start.html mobile spacing: verify start.html wizard cards have correct bottom padding at 375px — no content cut off by mobile browser chrome | STR | 4 | 1 | L | 1 |
| 13 | Fan confirmation pending state: when `confirmed === false`, fan row shows "pending" label — verify this reads from `f.confirmed` not `f.double_opted_in` (two different fields, only one is set server-side) | ADM | 4 | 1 | M | 1 |
| 14 | Show "first fan" moment: when `able_fans` goes from 0 to 1, show a one-time toast: "Your first fan. That's real." (dismiss key: `able_first_fan`) | V8/ADM | 5 | 2 | L | 1 |
| 15 | Input focus ring: verify all `field-input` elements show `:focus-visible` ring consistent with `--dash-acc` colour — grep for `focus-visible` in admin CSS | ADM | 3 | 1 | L | 1 |

---

## Dimension B — Tier Gates Polish
*Score: 6.5/10 → target 8.0/10. Gold lock copy and upgrade flow UX.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 16 | Gold lock copy — snap cards: current overlay says "Unlimited snap cards". Update to "One snap card on free. Unlimited on Artist." — specific, honest, not hype | ADM | 4 | 1 | L | 1 |
| 17 | Gold lock copy — broadcasts: current overlay says generic. Update to: "You have [N] people waiting to hear your news. Send them something. Artist plan — £9/mo." — personalised with real fan count | ADM | 5 | 2 | L | 1 |
| 18 | Gold lock copy — fan CRM: update to "Your fans are there. See where they came from, what they tapped. Artist Pro — £19/mo." | ADM | 4 | 1 | L | 1 |
| 19 | Gold lock hover state: when artist hovers over a gold lock overlay, the underlying blurred content should subtly come into focus (blur reduces from blur(8px) to blur(4px)) — visual tease | ADM | 3 | 2 | M | 2 |
| 20 | Free plan fan cap gate: when fan count reaches 100 on free, fan sign-up form on able-v8.html should still capture the email but show: "We'll keep this safe. Sign up to unlock your full list." — not a hard block | V8 | 5 | 3 | M | 2 |
| 21 | Tier badge in sidebar: verify `tier-badge` shows current tier accurately — reads from `able_tier` — verify the badge is updated by `applyTierPill()` on every page load | ADM | 3 | 1 | L | 1 |
| 22 | Upgrade CTA placement: the "Artist plan — £9/mo →" link in the fan cap nudge should also appear in the completeness bar when score < 30% and tier is free — encourage setup before fans arrive | ADM | 3 | 2 | M | 2 |
| 23 | Gold lock analytics blur: Pro analytics section (`gold-lock[data-tier="artist-pro"]`) — verify blur is visible on mobile, not clipped | ADM | 3 | 1 | L | 1 |
| 24 | Tier gate on snap card limit: when free tier has 1 snap card and tries to add another, the `addSnapCard()` function early-returns via `_freeLocked` — verify this also disables the `dc-action` button | ADM | 4 | 1 | L | 1 |
| 25 | Label tier — multi-artist admin: label tier shows 10 artist pages. Verify `able_tier === 'label'` shows a "Switch artist" dropdown in the topbar — or surfaces a placeholder if not yet built | ADM | 3 | 2 | M | 3 |

---

## Dimension C — Page State System
*Score: 7.5/10 → target 8.8/10. Campaign state transitions and copy.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 26 | Pre-release countdown precision: verify countdown on able-v8.html uses `releaseDate + 'T00:00:00'` (midnight artist timezone) not UTC midnight | V8 | 4 | 1 | M | 1 |
| 27 | Gig mode expiry copy: when gig mode expires (24h), admin should show a one-time toast: "Gig mode off. Hope it went well." (dismiss key: `able_gig_expired_${isoDay}`) | ADM | 4 | 2 | L | 1 |
| 28 | State indicator in topbar: admin topbar shows current campaign state — verify it updates when `toggleGigHQ()` runs — spot check `#topbarStateChip` or equivalent | ADM | 3 | 1 | L | 1 |
| 29 | Pre-release auto-switch alert: when `releaseDate` has passed and page auto-switches to `live`, show admin a toast: "Your release is live. Page is now in live mode." (one per releaseDate, key: `able_live_notif_${releaseDate}`) | ADM | 5 | 2 | M | 1 |
| 30 | Live → profile auto-switch: 14 days after releaseDate, page auto-switches to `profile` mode — add admin toast: "14 days since release. Page is back to profile mode." (key: `able_profile_notif_${releaseDate}`) | ADM | 4 | 2 | M | 2 |
| 31 | Campaign HQ state radio: verify `stateOverride === null` when "Auto" is selected — not `'auto'` string — check Campaign HQ radio handler | ADM | 4 | 1 | L | 1 |
| 32 | Pre-release copy personalisation: countdown card on able-v8.html shows artist's release title if set (`profile.releaseName`) — verify `releaseName` is used in countdown heading | V8 | 4 | 1 | L | 1 |
| 33 | Gig mode share: admin Gig mode section — add a "Share tonight's link" button that copies `ablemusic.co/handle?utm_source=tonight` to clipboard | ADM | 3 | 2 | L | 2 |
| 34 | Post-release engagement: 2 days after switching to live mode, if fan count hasn't increased, show nudge: "Release day was [date]. Share your ABLE link to reach more fans." | ADM | 4 | 3 | M | 3 |
| 35 | State history: admin shows a compact state history log — "Switched to pre-release 12 Mar · went live 19 Mar" — stored in profile.stateHistory[] array | ADM | 3 | 4 | M | 3 |

---

## Dimension D — UI System Tokens
*Score: 7.5/10 → target 8.8/10. Eliminate hardcoded values, sharpen component consistency.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 36 | Audit inline #888: grep admin.html for `color:#888` and `color: #888` — replace with `color:var(--t3)` — hardcoded greys bypass theme | ADM | 3 | 2 | L | 1 |
| 37 | Audit inline rgba opacity: grep admin.html for `rgba(255,255,255,.3)` and similar — replace with CSS token where it repeats 3+ times | ADM | 2 | 2 | M | 2 |
| 38 | Button hover states: verify all primary `.btn-primary`-equivalent buttons in admin have `:hover` background darken — not just opacity change | ADM | 3 | 1 | L | 1 |
| 39 | Input disabled state: when `field-input` is `disabled`, verify it shows `cursor:not-allowed` and `opacity:0.5` — not just default OS greying | ADM | 2 | 1 | L | 1 |
| 40 | Focus trap in sheets: `openFanDetailSheet()`, `addShowSheet`, snap card edit — verify pressing Escape closes them — check `keydown` handler in each | ADM | 4 | 2 | L | 1 |
| 41 | Sheet backdrop click to close: fan detail sheet, show add sheet — clicking the dark overlay should close — verify `backdrop.addEventListener('click', closeSheet)` | ADM | 3 | 2 | L | 1 |
| 42 | Sheet animation: sheets slide up from bottom (`transform: translateY(100%) → 0`) — verify transition runs on open AND close — check JS toggle for closing animation | ADM | 3 | 2 | M | 2 |
| 43 | Stat card skeleton: `skel` class adds pulsing placeholder — verify `skel` class is removed after `animateCount()` runs (not left permanently on elements) | ADM | 2 | 1 | L | 1 |
| 44 | Dashboard card max-width: some `dash-card` elements have inline `max-width:560px` — verify this is consistent or extract to a BEM modifier `.dash-card--narrow` | ADM | 2 | 2 | L | 2 |
| 45 | Toast z-index: `#adminToast` z-index should be above sheets — verify toast appears above fan detail sheet when both are open | ADM | 3 | 1 | L | 1 |

---

## Dimension E — World Map / Shows Polish
*Score: 7.0/10 → target 8.5/10. Shows on artist profile, event card copy and design.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 46 | Shows section empty state on profile: when no shows are listed, shows section on able-v8.html is either hidden or shows placeholder — verify it hides cleanly (no broken DOM) | V8 | 4 | 1 | L | 1 |
| 47 | Show card ticket button: when `s.ticketUrl` is set, event card on able-v8.html shows "Get tickets →" button — verify it opens in `_blank` with `rel="noopener"` | V8 | 4 | 1 | L | 1 |
| 48 | Past shows visual: shows that have passed (date < today) should show 50% opacity on able-v8.html (matches admin) — verify able-v8.html filters or visually dims past events | V8 | 3 | 1 | L | 1 |
| 49 | Featured show highlight: when `s.featured === true`, event card gets a distinct treatment (accent border or "Featured" label) — verify this renders on able-v8.html | V8 | 3 | 2 | L | 1 |
| 50 | Show count in profile completeness: completeness bar includes shows — already fixed C4 #43 — verify the able-v8.html `renderShows()` reads from `able_shows` (not `profile.events`) | V8 | 4 | 1 | L | 1 |
| 51 | Shows section heading copy: "Shows" is accurate but flat — if artist has upcoming shows, show count: "Shows · 2 upcoming" — if only past: "Shows" — computed in `renderShows()` | V8 | 3 | 2 | L | 2 |
| 52 | Venue display: show card on profile renders venue name only — add city if available (`s.city`) — "Fabric · London" not just "Fabric" | V8 | 3 | 1 | L | 1 |
| 53 | No ticket URL state: when `s.ticketUrl` is absent, show card renders without a button — verify there's no empty `<a href="">` hanging in the DOM | V8 | 3 | 1 | L | 1 |
| 54 | Shows JSON-LD completeness: `injectEventStructuredData()` uses `ev.date + 'T12:00:00'` — verify it falls back gracefully when `ev.date` is null | V8 | 3 | 1 | L | 1 |
| 55 | Admin shows sort: `renderShowsList()` sorts by `s.date` ascending — but admin shows are loaded from `able_shows` not `profile.events` — verify they're in sync after add/remove | ADM | 4 | 1 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (fan button state) → #2 (email validation) → #9 (mobile nav active) → #14 (first fan moment) → #16 (snap lock copy) → #17 (broadcast copy personalised) → #21 (tier badge verify) → #24 (snap card limit gate) → #26 (countdown precision) → #27 (gig expiry toast) → #29 (live mode toast) → #31 (state radio null check) → #32 (release title in countdown) → #36 (audit #888) → #38 (button hover) → #40 (Escape close sheets) → #41 (backdrop click close) → #43 (skel class removed) → #45 (toast z-index) → #46 (shows empty state) → #47 (ticket button) → #48 (past shows dim) → #52 (venue + city) → #53 (no ticket href) → #54 (JSON-LD null fallback) → #55 (shows sync verify)

**Wave 2 (after Wave 1 committed):**
#3 (snap URL validation), #4 (CTA URL validation), #5/#6 (save feedback flash), #7 (fan highlight), #11 (completeness transition), #13 (confirmed vs double_opted_in), #19 (gold lock hover), #22 (upgrade CTA in completeness), #28 (state chip verify), #30 (profile mode toast), #33 (gig share button), #37 (rgba audit), #42 (sheet close animation), #44 (dash-card modifier), #49 (featured show), #51 (shows count heading)

**Wave 3 (polish):**
#8 (preview tooltip), #10 (empty snap body), #12 (start.html spacing), #15 (focus ring audit), #20 (fan cap flow), #23 (blur on mobile), #25 (label tier), #34 (post-release nudge), #35 (state history)
