# ABLE — Cycle 8 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 7**
**Scores entering Cycle 8: Data architecture 7.5/10 · Tier gates 7.5/10 · World map 8.0/10 · UI system 8.0/10 · Error states 8.0/10**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Data architecture depth | 7.5/10 | 8.5/10 | Multi-device localStorage sync signal; `able_views` session dedup; `able_clicks` dedup; fan `campaignState` field |
| B — Tier gates enforcement | 7.5/10 | 8.8/10 | Client-side hard cap on free fan list at 100; show count gate verified; label tier multi-artist stub; Pro blur on mobile |
| C — World map polish | 8.0/10 | 8.8/10 | Venue map grouping; show sort order; empty state copy; gig countdown live in shows section |
| D — UI system completeness | 8.0/10 | 8.8/10 | Input focus-visible ring audit; form-field consistent heights; disabled-state CSS; sheet backdrop colour |
| E — Error states UI | 8.0/10 | 8.8/10 | Fan sign-up network failure UX; admin load failure recovery copy; empty-list error vs empty-list normal differentiation |

---

## Dimension A — Data Architecture Depth
*Score: 7.5/10 → target 8.5/10. Cleaner writes, session dedup, schema completeness.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | `able_views` session dedup: before pushing a new view, check if a view with the same `sessionId` (or same minute timestamp within 60s) already exists — skip if so | V8 | 4 | 2 | L | 1 |
| 2 | `sessionId` on view writes: add `sessionId: sessionStorage.getItem('_able_sid') \|\| Math.random().toString(36).slice(2)` to every view object pushed to `able_views` — first write sets `_able_sid` in sessionStorage | V8 | 4 | 2 | L | 1 |
| 3 | Fan `campaignState` on write: when a fan signs up, capture the current campaign state (`profile`/`pre-release`/`live`/`gig`) and store as `fan.campaignState` | V8 | 3 | 1 | L | 1 |
| 4 | Fan `deviceType` on write: add `deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'` to fan sign-up write — feeds future CRM segmentation | V8 | 3 | 1 | L | 1 |
| 5 | Click `sessionId` on write: match the session ID pattern — add `sessionId` to each `able_clicks` entry at write time | V8 | 3 | 1 | L | 1 |
| 6 | `able_views` schema `path` field: add `path: location.pathname` to each view write so admin can later show per-page breakdown | V8 | 2 | 1 | L | 1 |
| 7 | `profile.updatedAt` on every save: `saveCampaignHQ()` and `saveProfile()` should set `profile.updatedAt = Date.now()` — enables "last updated" display and migration ordering | ADM | 3 | 1 | L | 1 |
| 8 | `profile.createdAt` on first write: `start.html` wizard final save should set `profile.createdAt = Date.now()` if not already set — enables "days on ABLE" metric | STR | 3 | 1 | L | 1 |
| 9 | Fan list `sortedAt`: when admin exports CSV, add `exportedAt: new Date().toISOString()` as a header comment (or footer row) — audit trail | ADM | 2 | 1 | L | 2 |
| 10 | `able_clicks` `campaignState` field: match fan pattern — each click writes `campaignState` at tap time | V8 | 3 | 1 | L | 1 |
| 11 | View count admin: `statViews` in admin only counts views where the source ≠ `owner` — verify `isOwnerVisit()` guards `trackView()` or filter at display time | ADM | 4 | 2 | L | 1 |
| 12 | `able_shows` `createdAt` field: `openAddShowSheet` save handler — if no `createdAt`, add `createdAt: Date.now()` to the show object before push | ADM | 2 | 1 | L | 1 |
| 13 | Fan `utmCampaign` on write: if `utm_campaign` is in sessionStorage (set by UTM bridge), write it to the fan object as `utmCampaign` — parallel to `campaignName` | V8 | 3 | 1 | L | 2 |
| 14 | Fans `consentVersion` audit: grep all fan push sites — verify every write includes `consentVersion: 'v1'` — if admin import path exists, verify that too | ADM | 4 | 1 | L | 1 |
| 15 | LocalStorage size indicator: when profile completeness updates, also estimate localStorage bytes used (`JSON.stringify(localStorage).length`) and log to console in dev mode only | ADM | 2 | 2 | L | 3 |

---

## Dimension B — Tier Gates Enforcement
*Score: 7.5/10 → target 8.8/10. Harden client-side caps; complete visual gate coverage.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 16 | Free tier hard fan cap at 100: when free tier has >= 100 fans, fan sign-up form shows: "This list is full. The artist will reach out when they expand." — no new fan written | V8 | 5 | 2 | M | 1 |
| 17 | Show count gate — free tier: free tier allows max 3 upcoming shows — if adding a 4th, show: "Add up to 3 shows on free. Artist plan removes the limit." — block the save | ADM | 4 | 2 | M | 1 |
| 18 | Fan CRM export gate: free tier cannot export fans CSV — clicking export shows upgrade prompt: "Export your full list. Artist plan — £9/mo." | ADM | 4 | 2 | M | 1 |
| 19 | Snap card limit copy: the existing free-tier snap card limit (1 card) shows a generic lock — update overlay to: "Add more moments to your page. Artist plan — £9/mo." | ADM | 3 | 1 | L | 1 |
| 20 | Analytics blur contrast: the `.gold-blur` filter on analytics section — verify it reads as blurred but not fully hidden at 390px on real Safari — check blur value is ≥4px | ADM | 3 | 1 | L | 1 |
| 21 | Label tier: when `able_tier === 'label'`, show a "Manage artists →" placeholder entry in the admin topbar (disabled button, `title="Multi-artist view — coming soon"`) | ADM | 3 | 3 | M | 2 |
| 22 | Upgrade prompt click tracking: every tier-gate overlay CTA click should log `{label:'tier-gate-[section]', type:'upgrade', ts}` to `able_clicks` — fan CRM, snap, broadcast, analytics | ADM | 3 | 2 | L | 1 |
| 23 | Broadcast gate — personalised fan count: update broadcast overlay to read real fan count from `able_fans.length` — "You have [N] people waiting." — already partially done in C6 — verify dynamic count is correct | ADM | 4 | 1 | L | 1 |
| 24 | Free tier badge in admin topbar: when `able_tier === 'free'`, show a small "Free plan" badge next to the plan name in settings — subtle, non-intrusive | ADM | 3 | 2 | L | 2 |
| 25 | Tier gate on campaign broadcasts: verify that clicking "Send broadcast" when tier=free both shows the overlay AND does not submit any form/fetch | ADM | 5 | 1 | L | 1 |

---

## Dimension C — World Map Polish
*Score: 8.0/10 → target 8.8/10. Shows UX, gig countdown, empty state copy.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 26 | Show sort order: `renderShowsSection()` should sort shows by `date` ascending — nearest date first — verify current sort | V8 | 4 | 1 | L | 1 |
| 27 | Past shows filter: shows with `date < today (ISO)` should not render in the public profile — verify current filter uses correct UTC comparison | V8 | 4 | 1 | L | 1 |
| 28 | Gig countdown in shows section: when gig mode is active and there's a featured show, show a live countdown in the show card: "Tonight — doors open at [time]" with seconds | V8 | 4 | 3 | M | 2 |
| 29 | Empty shows state — owner view: when `isOwnerVisit()` and no shows exist, show: "No shows yet. Add your first one in your dashboard." with a link to admin | V8 | 3 | 2 | L | 1 |
| 30 | Empty shows state — fan view: when not owner and no shows, show nothing (hide the section entirely) rather than an empty state | V8 | 3 | 1 | L | 1 |
| 31 | Ticket URL "Buy tickets" label: if `show.ticketUrl` is set but `show.ticketLabel` is absent, default the button text to "Get tickets" (not "Buy tickets") — matches ABLE copy tone | V8 | 3 | 1 | L | 1 |
| 32 | Show venue character limit: admin add-show form — venue input `maxlength="60"` — show character count: "[N]/60" when > 40 chars | ADM | 2 | 1 | L | 2 |
| 33 | Featured show visual: in the shows section, `featured: true` show gets a subtle accent-coloured left border or tag — differentiates tonight's show from others | V8 | 3 | 2 | L | 2 |
| 34 | Show date display: format as "Sat 22 Mar" not "2026-03-22" — use `new Date(date).toLocaleDateString('en-GB', {weekday:'short', day:'numeric', month:'short'})` — verify format in `renderShowsSection` | V8 | 3 | 1 | L | 1 |
| 35 | Admin shows list — empty state: when no shows in admin, show: "No upcoming shows. Add your first →" linking to the add-show sheet button | ADM | 3 | 1 | L | 1 |

---

## Dimension D — UI System Completeness
*Score: 8.0/10 → target 8.8/10. Audit remaining inconsistencies.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 36 | Input focus-visible ring — admin: verify all `.field-input` elements show `:focus-visible` outline using `--acc` colour at 2px — check `outline: 2px solid var(--acc); outline-offset: 2px` | ADM | 4 | 1 | L | 1 |
| 37 | Input focus-visible ring — start.html: same audit for start.html wizard inputs — `.field-input:focus-visible` | STR | 3 | 1 | L | 1 |
| 38 | Sheet backdrop opacity: `#adminSheetBackdrop` — verify it uses `rgba(0,0,0,0.5)` (not transparent) and transitions in — check `background` and `transition` | ADM | 2 | 1 | L | 1 |
| 39 | Disabled input cursor: verify `.field-input:disabled { cursor: not-allowed; opacity: 0.5; }` is present in admin CSS | ADM | 2 | 1 | L | 1 |
| 40 | Button active scale — admin CTAs: verify `.tb-btn-acc:active`, `.glo-btn:active` both have `transform: scale(0.96)` feedback | ADM | 3 | 1 | L | 1 |
| 41 | Consistent input height: all `.field-input` elements should compute the same height (approx 48px including padding) — verify no stray line-height differences | ADM | 2 | 2 | L | 2 |
| 42 | Toast dismiss button: `#adminToast` — verify there is a dismiss button (`×`) or that the toast auto-dismisses after 4s — check `showToast()` timeout | ADM | 3 | 1 | L | 1 |
| 43 | Placeholder text colour: verify admin `.field-input::placeholder` uses `var(--t3)` — no hardcoded rgba | ADM | 2 | 1 | L | 1 |
| 44 | Card hover state — fan rows: `.fan-list-row:hover` background — verify it uses a token (`rgba(var(--dash-amber-rgb),.06)`) not a hardcoded colour | ADM | 2 | 1 | L | 1 |
| 45 | Gold lock overlay backdrop: `.gold-lock .gold-overlay` — verify it uses `rgba(248,245,240,0.88)` (token-derived) not hardcoded hex | ADM | 2 | 1 | L | 1 |

---

## Dimension E — Error States UI
*Score: 8.0/10 → target 8.8/10. Visible error copy for key failure modes.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 46 | Fan sign-up network error: when `fetch('/api/fan-confirmation')` fails (non-CORS, 5xx), show inline below the form: "Saved locally. You'll get a confirmation when you're back online." | V8 | 5 | 2 | M | 1 |
| 47 | Supabase save failure toast: when `supabase.from('fans').insert()` fails, show toast: "Fan saved locally. We'll sync when you're back." — not a red error, a reassurance | V8 | 4 | 2 | M | 1 |
| 48 | Admin load error — profile missing: if `safeLS('able_v3_profile', null) === null`, show a recovery card: "Profile not found. Start fresh →" with a link to start.html | ADM | 4 | 2 | L | 1 |
| 49 | Shows parse failure guard: `renderShowsSection()` — wrap the entire render in try/catch — if it throws, hide the section silently (do not white-screen) | V8 | 4 | 1 | L | 1 |
| 50 | Admin stats parse guard: wrap the stat aggregation block in try/catch — on failure, set all stat elements to `—` and log error to `console.warn` | ADM | 3 | 2 | L | 1 |
| 51 | Email validation error copy: when fan email is invalid format, show: "Check that email address — we want to get this right." not "Invalid email" | V8 | 3 | 1 | L | 1 |
| 52 | Fan sign-up duplicate message: current "You're already on the list." — verify it uses the correct ABLE voice (direct, warm, not clinical) | V8 | 3 | 1 | L | 1 |
| 53 | Admin empty fan list: when fans array is empty (not loading, truly empty), show: "No one yet. Share your page to start building your list." — not just a blank list | ADM | 4 | 1 | L | 1 |
| 54 | Snap card render error: if a snap card object is malformed (missing body/title), render a fallback card with `(Empty card)` — do not skip it silently | ADM | 2 | 1 | L | 2 |
| 55 | date input fallback: for browsers where `type="date"` renders as text, the release date field in start.html should show a placeholder `YYYY-MM-DD` and validate with a regex | STR | 3 | 1 | L | 2 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (view session dedup) → #2 (sessionId on views) → #3 (fan campaignState) → #4 (fan deviceType) → #5 (click sessionId) → #6 (views path field) → #7 (profile updatedAt) → #8 (profile createdAt) → #10 (click campaignState) → #11 (owner-view stat filter) → #14 (consentVersion audit) → #16 (free fan hard cap) → #17 (show count gate) → #18 (CSV export gate) → #19 (snap overlay copy) → #20 (analytics blur check) → #22 (upgrade click tracking) → #23 (broadcast fan count verify) → #25 (broadcast form guard) → #26 (show sort) → #27 (past show filter) → #29 (empty shows owner) → #30 (empty shows fan) → #31 (ticket label) → #34 (show date format) → #35 (admin shows empty) → #36 (focus ring admin) → #37 (focus ring start) → #38 (sheet backdrop) → #39 (disabled cursor) → #40 (button active scale) → #42 (toast dismiss) → #43 (placeholder colour) → #46 (network error UX) → #48 (profile missing card) → #49 (shows parse guard) → #50 (stats parse guard) → #51 (email error copy) → #52 (duplicate message audit) → #53 (empty fan list copy)

**Wave 2 (after Wave 1 committed):**
#9 (CSV exportedAt), #12 (show createdAt), #13 (utmCampaign on fan), #21 (label tier placeholder), #24 (free tier badge), #28 (gig countdown live), #32 (venue char count), #33 (featured show visual), #41 (input height audit), #44 (fan row hover token), #45 (gold overlay rgba), #47 (supabase save toast), #54 (snap card fallback), #55 (date input fallback)

**Wave 3 (polish):**
#15 (localStorage size indicator), #21 (label tier multi-artist)
