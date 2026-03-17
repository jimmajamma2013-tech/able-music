# ABLE — Cycle 6 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 5 Wave 2**
**Scores entering Cycle 6: Data architecture 6.8/10 · Tier gates 7.0/10 · UI system 7.5/10 · UX system 7.8/10 · World map 8.0/10**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Data architecture | 6.8/10 | 8.0/10 | Fan dedup, `able_views` over-write, fan cap enforcement, consent field coverage |
| B — Tier gates | 7.0/10 | 8.5/10 | Remaining C5 Wave 3 tier items; broadcast lock copy personalised; label tier placeholder |
| C — UI system tokens | 7.5/10 | 8.8/10 | Remaining hardcoded `#888`, rgba audit, prefers-reduced-motion |
| D — UX system (C5 Wave 3) | 7.8/10 | 9.0/10 | Empty snap body, start.html mobile, fan cap flow, post-release nudge |
| E — Performance | (8.0) | 8.8/10 | Lighthouse baselines, lazy-load audit, will-change audit |

---

## Dimension A — Data Architecture
*Score: 6.8/10 → target 8.0/10. Defensive writes, cap enforcement, consent coverage.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Fan dedup on sign-up: before pushing to `able_fans`, check if email already exists — `fans.some(f => f.email.toLowerCase() === email.toLowerCase())` — if yes, skip write and show "You're already on the list." | V8 | 5 | 1 | L | 1 |
| 2 | `able_views` 500-entry cap: `trackView()` already has QuotaExceeded prune, but no proactive cap — add `if (views.length >= 500) views.splice(0, 100)` before push | V8 | 3 | 1 | L | 1 |
| 3 | `able_clicks` 500-entry cap: same pattern as #2 in `trackCTATap()` | V8 | 3 | 1 | L | 1 |
| 4 | Fan `consentTs` on all new sign-ups: verify every fan write includes `consentTs: Date.now()` and `consentVersion: 'v1'` — grep all fan push sites | V8/ADM | 4 | 1 | L | 1 |
| 5 | Fan spam guard: if the same email signs up within 60s (check `f.ts > Date.now() - 60000`), show "You're already on the list." without writing again | V8 | 4 | 2 | L | 1 |
| 6 | LocalStorage full state — admin: when `setLS()` catches `QuotaExceededError` and cannot free space, show: "Export your fans as CSV, then clear old data." — link to export button | ADM | 4 | 2 | L | 1 |
| 7 | `safeLS` null-parse guard: verify `safeLS()` returns the default value (not throws) on malformed JSON — `try { return JSON.parse(v) || def } catch { return def }` | ALL | 3 | 1 | L | 1 |
| 8 | Fan `level` field default: fan object written at sign-up should always include `level: 'listener'` as default — verify this field is present in the sign-up write | V8 | 3 | 1 | L | 1 |
| 9 | `able_shows` dedup: `openAddShowSheet` save handler — check if a show with the same venue + date already exists before pushing | ADM | 3 | 2 | L | 2 |
| 10 | Profile schema migration guard: when loading `able_v3_profile`, if `profile.topCard` is absent, initialise it as `{}` — prevents `Cannot read properties of undefined` on `profile.topCard.artworkUrl` | ADM/V8 | 4 | 1 | L | 1 |
| 11 | Fan `source` normalisation on write: when writing a new fan, normalise source at write time (not just at read time) — `source: normaliseSource(rawSource)` | V8 | 3 | 1 | L | 1 |
| 12 | `able_dismissed_nudges` cap: cap at 50 entries — oldest trimmed first — prevents unbounded growth | ADM | 2 | 1 | L | 1 |
| 13 | Admin visit dates prune: already prunes at 60 — verify it doesn't include duplicate same-day entries (check `visits[visits.length - 1] !== today` guard is in place) | ADM | 2 | 1 | L | 1 |
| 14 | Fan CRM export: `exportFansCSV()` includes all fields — verify `level`, `consentVersion`, `campaignState` are present in the header row of the CSV | ADM | 4 | 1 | L | 1 |
| 15 | `fan.html` data source: fan.html currently has no localStorage backing — stub `able_followed_artists` as `[]` and render a graceful empty state: "Follow an artist to see their updates here." | FAN | 4 | 2 | M | 2 |

---

## Dimension B — Tier Gates
*Score: 7.0/10 → target 8.5/10. Remaining tier gate copy and upgrade flow items.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 16 | Broadcast lock copy — personalised: current overlay uses generic text — update to: "You have [N] people waiting to hear your news. Send them something. Artist Pro — £19/mo." using real fan count | ADM | 5 | 2 | L | 1 |
| 17 | Fan CRM lock copy: update to "Your fans are there. See where they came from, what they tapped. Artist Pro — £19/mo." | ADM | 4 | 1 | L | 1 |
| 18 | Label tier — multi-artist admin: verify `able_tier === 'label'` — if label tier, show a "Switch artist" placeholder row in the topbar (disabled, copy: "Multi-artist view — coming soon") | ADM | 3 | 2 | M | 2 |
| 19 | Free plan fan cap gate: when fan count reaches 100 on free, fan sign-up form on able-v8.html shows: "We'll keep this safe. Sign up to unlock your full list." — not a hard block | V8 | 5 | 3 | M | 2 |
| 20 | Tier gate on show count: free tier should only allow 3 upcoming shows — verify there's no UI guard needed (shows are unlimited currently — confirm this is intentional per pricing spec) | ADM | 3 | 1 | L | 1 |
| 21 | Gold lock analytics blur on mobile: Pro analytics section — verify blur is not clipped by `overflow: hidden` on a parent container at 390px | ADM | 3 | 1 | L | 1 |
| 22 | Upgrade flow from snap limit: when free tier tries to add a second snap card, the early-return should also set focus on the `_freeLocked` trigger — verify `.glo-btn` is focusable | ADM | 3 | 1 | L | 1 |
| 23 | Tier gate visual test: open DevTools, set `localStorage.setItem('able_tier','free')`, reload — verify all 3 gold-lock sections are blurred, overlay is visible, CTAs are disabled | ADM | 4 | 1 | L | 1 |
| 24 | Artist Pro trial hook: when tier is free and fan count >= 10, show a one-time nudge card (dismiss key: `able_trial_nudge`): "10 fans in. Ready to send them a message? Try Artist Pro free for 7 days." | ADM | 5 | 3 | M | 3 |
| 25 | Upgrade CTA click tracking: clicking the upgrade link in the completeness bar or gold overlay should log to `able_clicks` as `{label: 'upgrade-cta', type: 'upgrade', ts}` — useful for funnel data | ADM | 3 | 2 | L | 2 |

---

## Dimension C — UI System Tokens
*Score: 7.5/10 → target 8.8/10. Eliminate remaining hardcoded values; prefers-reduced-motion audit.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 26 | Audit inline `#888`: grep admin.html for `color:#888` and `color: #888` — replace with `color:var(--t3)` | ADM | 3 | 2 | L | 1 |
| 27 | Audit inline `rgba(255,255,255,.3)` and similar: grep for `rgba(255,255,255,.` — replace with CSS token where repeats 3+ times | ADM | 2 | 2 | M | 2 |
| 28 | Button hover darken: verify all primary button equivalents (`.tb-btn-acc`, `.glo-btn`) have `:hover` background darken — not just opacity change | ADM | 3 | 1 | L | 1 |
| 29 | Input disabled state: verify `.field-input[disabled]` shows `cursor:not-allowed; opacity:0.5` — grep for `disabled` styled inputs | ADM | 2 | 1 | L | 1 |
| 30 | `prefers-reduced-motion` admin audit: wrap non-essential transitions/animations in `@media (prefers-reduced-motion: no-preference)` — at minimum: `.fan-row-stagger`, `.star-flash`, `.gig-strip` transitions | ADM | 4 | 3 | L | 2 |
| 31 | Toast z-index: verify `#adminToast` z-index is above fan detail sheet (`z-index:1001` or higher) — check both open simultaneously | ADM | 3 | 1 | L | 1 |
| 32 | Sheet animation: `.admin-sheet` slides up — verify the close animation runs (transform back to `translateY(100%)`) before `hidden` is set — check `closeAdminSheet()` | ADM | 3 | 2 | M | 2 |
| 33 | Stat card skeleton cleanup: verify `.skel` class is removed from all stat value elements after `animateCount()` fires — grep for `.skel` removal in stat update code | ADM | 2 | 1 | L | 1 |
| 34 | `var` declarations: grep admin.html for `var ` (space after var) — replace with `const`/`let` | ADM | 2 | 1 | L | 1 |
| 35 | Focus ring on field inputs: verify all `.field-input` elements show `:focus-visible` ring using `--acc` colour — grep for `focus-visible` in admin CSS | ADM | 3 | 1 | L | 1 |

---

## Dimension D — UX System (C5 Wave 3 items)
*Score: 7.8/10 → target 9.0/10. Completing C5 Wave 3 carry-overs.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 36 | Empty snap card body: snap card with no body text and no link renders near-blank — show "(No description)" in `var(--t3)` colour if both body and link are empty | ADM | 3 | 1 | L | 1 |
| 37 | Start.html mobile spacing: verify start.html wizard cards have correct bottom padding at 375px — no content cut off by mobile browser chrome | STR | 4 | 1 | L | 1 |
| 38 | Fan cap soft gate UX: when fan count is >= 95 on free tier, the sign-up form on able-v8.html still captures but adds: "We'll keep this safe. Upgrade to unlock your full list." inline below the button | V8 | 5 | 3 | M | 2 |
| 39 | Post-release nudge 2 days: 2 days after switching to live mode, if fan count hasn't increased since release day, show: "Release day was [date]. Share your ABLE link to reach more fans." (dismiss key: `able_post_release_nudge_${releaseDate}`) | ADM | 4 | 3 | M | 2 |
| 40 | Preview tooltip first time: "View page →" topbar button — show tooltip "Opens your live page in a new tab" on first visit (localStorage key `able_preview_used`) | ADM | 2 | 1 | L | 2 |
| 41 | Profile preview button destination: verify admin topbar "View page →" button opens `able-v8.html?handle=HANDLE&owner=true` — not just `able-v8.html` | ADM | 4 | 1 | L | 1 |
| 42 | Mobile nav active state: verify `.mn-item.active` is set when `showPage()` runs on mobile | ADM | 4 | 1 | L | 1 |
| 43 | State history log: admin shows a compact state history — "Switched to pre-release 12 Mar · went live 19 Mar" — stored in `profile.stateHistory[]` array, max 10 entries | ADM | 3 | 4 | M | 3 |
| 44 | 30-day milestone artist nudge: when `admin_visit_dates` spans > 30 unique calendar days, show nudge: "30 days in. [N] fans. [M] clicks. That's yours." — dismiss key: `30day-milestone` | ADM | 4 | 3 | M | 3 |
| 45 | Focus trap in sheets: fan detail sheet, add show sheet — pressing Escape closes them (C5 #40 added global Escape handler — verify it hits the correct sheet when multiple could be open) | ADM | 3 | 1 | L | 1 |

---

## Dimension E — Performance
*Score: ~8.0/10 → target 8.8/10. Lighthouse baselines, asset loading, motion budget.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 46 | Lighthouse baseline — able-v8.html: run Lighthouse mobile throttled — record LCP, FCP, CLS, TBT, Score — write to `docs/systems/qa-testing/PERF-BASELINE-2026-03-17.md` | V8 | 5 | 2 | L | 1 |
| 47 | Lighthouse baseline — admin.html: same for admin — LCP and Score | ADM | 4 | 2 | L | 1 |
| 48 | Image lazy-load verify: all `<img>` below-the-fold on able-v8.html must have `loading="lazy"` — grep and fix any missing | V8 | 4 | 1 | L | 1 |
| 49 | Font preload bold weight: add `<link rel="preload" as="font" href="..." crossorigin>` for Barlow Condensed Bold woff2 — the weight used in display headings | ALL | 3 | 1 | L | 1 |
| 50 | `requestAnimationFrame` on admin stat writes: wrap fan count, click count, view count DOM writes in `requestAnimationFrame()` — prevents forced reflow on simultaneous stat updates | ADM | 3 | 2 | L | 2 |
| 51 | `will-change` audit: grep all 4 active pages for `will-change:` — for each, verify parent has `isolation: isolate` | ALL | 3 | 2 | L | 2 |
| 52 | Unused CSS audit: grep admin.html for classes defined in `<style>` that have no matching `class=` in the HTML — flag, do not delete automatically | ADM | 2 | 2 | M | 2 |
| 53 | AbortController on fan sign-up: wrap the Netlify `fan-confirmation` fetch in AbortController with 8000ms — after timeout show: "Email confirmation taking a while. Check your inbox in a moment." | V8 | 4 | 2 | M | 1 |
| 54 | Netlify function 404 state: when `fan-confirmation.js` returns 404, show: "Can't reach the confirmation server. Your email is saved — we'll reach out." | V8 | 3 | 2 | L | 1 |
| 55 | `window.onerror` admin: verify `window.onerror` handler is set on admin.html to catch uncaught JS errors | ADM | 3 | 1 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (fan dedup) → #2 (views cap) → #3 (clicks cap) → #4 (consentTs verify) → #5 (spam guard) → #6 (localStorage full) → #7 (safeLS guard) → #8 (level default) → #10 (topCard guard) → #11 (source on write) → #12 (nudges cap) → #14 (CSV fields) → #16 (broadcast copy personalised) → #17 (CRM lock copy) → #20 (show count gate check) → #21 (blur mobile) → #22 (snap focus) → #23 (tier visual test) → #26 (audit #888) → #28 (button hover) → #29 (input disabled) → #31 (toast z-index) → #33 (skel cleanup) → #34 (var→const) → #35 (focus ring) → #36 (empty snap body) → #37 (start.html spacing) → #41 (preview button dest) → #42 (mobile nav active) → #45 (Escape sheets) → #46/#47 (Lighthouse) → #48 (lazy-load) → #53 (AbortController) → #54 (404 state) → #55 (window.onerror)

**Wave 2 (after Wave 1 committed):**
#9 (shows dedup), #15 (fan.html empty state), #18 (label tier placeholder), #19 (fan cap soft gate), #25 (upgrade CTA tracking), #27 (rgba audit), #30 (prefers-reduced-motion), #32 (sheet close animation), #38 (fan cap UX), #39 (post-release nudge), #40 (preview tooltip), #49 (font preload), #50 (RAF stats), #51 (will-change), #52 (unused CSS)

**Wave 3 (polish — do last):**
#13 (visit dedup verify), #24 (Artist Pro trial hook), #43 (state history log), #44 (30-day milestone nudge)
