# ABLE — Cycle 10 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 9**
**Scores entering Cycle 10: Data architecture 8.0/10 · CRM 8.0/10 · Tier gates 8.2/10 · Error states 8.4/10 · Fan journey 8.5/10**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Data architecture | 8.0/10 | 8.8/10 | Fan writeback to fan.html following; safeLS coverage for all new keys; session state persisted |
| B — CRM | 8.0/10 | 8.8/10 | Fan search UX, starred fan export, fan row keyboard nav, fan list sort |
| C — Tier gates | 8.2/10 | 8.8/10 | Gold lock refinement: preview blur quality, gate copy specificity, free tier feature parity |
| D — Error states | 8.4/10 | 9.0/10 | Network offline banner, Supabase retry logic, form submit disabled while in-flight |
| E — Fan journey | 8.5/10 | 9.2/10 | Second echo animation, fan follow writeback, fan consent version tracking, near-full CTA polish |

---

## Dimension A — Data Architecture
*Score: 8.0/10 → target 8.8/10. Strengthen schema consistency and cross-page data integrity.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Fan writeback completeness: `writeFanFollow()` in able-v8.html writes to `able_fan_following` — verify it includes artist `name`, `handle`, `accent` so fan.html can render follow cards without a network call | V8 | 4 | 2 | L | 1 |
| 2 | Profile `updatedAt` on every save: admin `saveProfilePage()` and `saveCampaignHQ()` already write `updatedAt` — verify `saveIdentityPage()` also sets it (identity saves skip the field) | ADM | 3 | 1 | L | 1 |
| 3 | Admin visit tracking guard: `recordAdminVisit()` uses `setLS` — wrap entire function in try/catch in case localStorage is full | ADM | 3 | 1 | L | 1 |
| 4 | Fan dedup on load: when `initFanForms()` runs, check `sessionStorage.able_this_fan_email` — if set, skip fan form render and go straight to echo state | V8 | 3 | 1 | L | 1 |
| 5 | Fan `joinedAt` field: new fans written in form-1 already get `ts` — verify form-2 fan entries also get `joinedAt: new Date().toISOString()` (ISO string, not unix) for Supabase compatibility | V8 | 3 | 1 | L | 1 |
| 6 | `able_shows` schema version: add `_schemaVersion: 1` sentinel to shows array root on first save — enables future migrations | ADM | 2 | 1 | L | 2 |
| 7 | Fan starred state sync: `able_starred_fans` is a set of email strings — verify `renderFanList()` reads this key correctly and starred state persists on page reload | ADM | 3 | 1 | L | 1 |
| 8 | Click log TTL: `able_clicks` grows unbounded — when appending, trim to last 2000 entries: `clicks.splice(0, Math.max(0, clicks.length - 2000))` | ADM | 3 | 1 | L | 1 |
| 9 | View log TTL: same trimming needed for `able_views` — trim to last 2000 entries on write | V8 | 3 | 1 | L | 1 |
| 10 | Profile `slug` field: `profile.handle` is the display slug — verify `saveProfilePage()` also writes `profile.slug = profile.handle` so both keys are populated for Supabase migration | ADM | 3 | 1 | L | 1 |
| 11 | Shows `id` field: `openAddShowSheet()` saves shows without a stable `id` — add `id: 'show_' + Date.now()` to each new show so future Supabase rows have a primary key | ADM | 4 | 1 | L | 1 |

---

## Dimension B — CRM
*Score: 8.0/10 → target 8.8/10. Fan management UI completeness and usability.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 12 | Fan search debounce: `filterFans()` called on every keypress — debounce by 150ms to avoid jank on large lists | ADM | 3 | 1 | L | 1 |
| 13 | Fan row keyboard: each fan row in the fan list — verify pressing Enter opens the fan detail sheet (same as click) | ADM | 3 | 2 | L | 2 |
| 14 | Fan list sort UI: add sort dropdown (Newest / Oldest / Starred first / Source) above fan list — updates `renderFanList()` call with sort param | ADM | 4 | 3 | M | 2 |
| 15 | Fan source badge: each fan row shows a coloured source pill — verify existing `fan-source` badge uses a CSS token colour map (not hardcoded) | ADM | 2 | 1 | L | 1 |
| 16 | Starred fan CSV: when exporting, starred fans sort first in the CSV — apply same sort as UI | ADM | 3 | 1 | L | 1 |
| 17 | Fan count in tab label: `tab-fans` aria-label should read "Fans — N total" — set dynamically on fan list render | ADM | 2 | 1 | L | 1 |
| 18 | Fan list empty search: when search returns no results, show "No fans match [query]" — not a blank list | ADM | 3 | 1 | L | 1 |
| 19 | Fan week/month stat refresh: stats in home dashboard recalculate correctly after new fan sign-up — verify `loadRealStats()` is called after any fan write | ADM | 3 | 1 | L | 1 |
| 20 | Fan streak display: `statStreak` shows days with any activity (views + clicks + fans) — verify the streak logic counts fan sign-ups as activity | ADM | 2 | 1 | L | 2 |
| 21 | Fan delete undo: when a fan is soft-deleted (`deleted_at` set), show a 5s undo toast: "Fan removed. Undo?" | ADM | 3 | 2 | M | 2 |

---

## Dimension C — Tier Gates
*Score: 8.2/10 → target 8.8/10. Gold lock pattern polish, gate copy specificity.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 22 | Gold lock blur quality: `.gold-lock-overlay` uses `filter:blur(6px)` on the content behind — verify the blur radius matches spec (6px) and renders correctly on Safari | ADM | 3 | 1 | L | 1 |
| 23 | Upgrade CTA specificity: current gate copy says "Artist plan — £9/mo →" — verify each gate has specific value: broadcasts gate → "Send broadcasts on Artist plan", fan export → "Export your list on Artist plan", snap cards → "Add unlimited Updates on Artist plan" | ADM | 4 | 2 | L | 1 |
| 24 | Free tier badge in topbar: header should show a subtle "Free" tier badge next to the artist name on free tier — drives awareness without being aggressive | ADM | 3 | 2 | M | 2 |
| 25 | Tier gate preview rendering: blurred preview should show real data from localStorage, not placeholder lorem — so the artist sees their own content gated | ADM | 4 | 3 | M | 2 |
| 26 | Fan limit nudge copy: `fan-limit-banner` shows when fan count ≥ 95 on free tier — verify copy reads "You're 5 from your limit. Artist plan takes you to 2,000." (specific number) | V8 | 4 | 1 | L | 1 |
| 27 | Tier gate on release scheduler: setting a release date while on free tier — verify no gate (release dates are free) but post-release email broadcast is gated | ADM | 3 | 1 | L | 1 |
| 28 | Artist Pro trial hook: the "Try Artist Pro free for 30 days" nudge — verify it only fires once (localStorage flag) and fires at the right milestone (first 100 fans) | ADM | 3 | 1 | L | 1 |
| 29 | Label tier UI: `able_tier = 'label'` — verify the label tier removes all limits in JS (fan cap, show cap, export gate) | ADM | 4 | 1 | L | 1 |
| 30 | Gate animation: gold lock overlay fades in on `display:block` — add 150ms opacity transition `opacity: 0 → 1` | ADM | 2 | 1 | L | 1 |

---

## Dimension D — Error States
*Score: 8.4/10 → target 9.0/10. Offline resilience and graceful degradation.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 31 | Offline banner: add an `online`/`offline` event listener — when offline, show a subtle non-intrusive banner "No connection. Your data is saved locally." | ADM | 4 | 2 | L | 1 |
| 32 | Online recovery: when `online` event fires after offline, dismiss the banner and show "Back online." toast (green, 3s) | ADM | 3 | 1 | L | 1 |
| 33 | Fan form submit disabled during flight: while fan sign-up fetch is in-flight, disable the submit button with `aria-disabled="true"` — prevent double-submit | V8 | 4 | 1 | L | 1 |
| 34 | Admin crash recovery: if `renderFanList()` throws, catch and show "Couldn't load fan list. Try refreshing." in the fan list container | ADM | 3 | 1 | L | 1 |
| 35 | Shows load error: if `_renderShowsSectionImpl()` throws (C8 #49 guard exists) — also log a console warning with the error message for debugging | V8 | 2 | 1 | L | 1 |
| 36 | Clipboard failure: `copyPageUrl()` `.catch()` is missing — add `.catch(() => showToast('Copy failed — try again.', 'amber'))` | ADM | 3 | 1 | L | 1 |
| 37 | localStorage quota: when `setLS()` throws (quota exceeded), show a warning toast "Storage nearly full — some data may not save." once (session flag) | ADM | 4 | 2 | M | 2 |
| 38 | Supabase timeout on admin load: `sbSyncProfile()` has no timeout — if Supabase is slow, admin feels stuck. Add `AbortController` 10s timeout | ADM | 3 | 2 | M | 2 |
| 39 | Release date parse guard: if `profile.releaseDate` is a malformed string, `new Date()` returns `Invalid Date` — guard `computeState()` with `isNaN(releaseTs)` check | V8 | 4 | 1 | L | 1 |
| 40 | Fan form network error: if Supabase fan write fails (network), the fan is still in localStorage — verify toast says "Saved locally. Will sync when back online." not "Error" | V8 | 3 | 1 | L | 1 |

---

## Dimension E — Fan Journey
*Score: 8.5/10 → target 9.2/10. Echo polish, fan.html follow flow, consent UX.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 41 | Fan echo second animation: form-2 success (`confirmP` element appended) — add `animation: echo-enter 280ms var(--ease-decel) both` via JS class after append | V8 | 3 | 1 | L | 1 |
| 42 | Fan `consentVersion` field: all new fan rows write `consentVersion: '2026-03-16'` (already set) — verify form-2 also writes the same `consentVersion` string | V8 | 3 | 1 | L | 1 |
| 43 | Fan form 1 — near-full gate: when fan count ≥ 95 on free tier, the form still submits but shows soft nudge below button — verify nudge text reads "Almost full — [N] spots left." | V8 | 4 | 1 | L | 1 |
| 44 | Fan echo personalised: when artist has a release in `pre-release` or `live` state, the echo text personalises: "You're in. [Release title] drops [date]. First to know." | V8 | 4 | 2 | M | 2 |
| 45 | Fan GDPR copy date: `consentText` hardcodes `2026-03-16` as the consent version date — update to a dynamic date computed on sign-up | V8 | 2 | 1 | L | 1 |
| 46 | Fan form 2 trust text: form-2 shows `fan-trust-2` — verify it reads the same personalised trust copy as form-1 (artist name substituted) | V8 | 3 | 1 | L | 1 |
| 47 | Fan follow writeback: `writeFanFollow()` sets `able_fan_following` — verify the follow entry includes `followedAt: new Date().toISOString()` for fan.html feed ordering | V8 | 3 | 1 | L | 1 |
| 48 | Fan dedup message on form-2: when duplicate email on form-2, show "You're already on the list." in the error span (currently just validation animation) | V8 | 3 | 1 | L | 1 |
| 49 | Fan capture heading state: for `gig` state, fan capture heading — verify it reads "On tonight. Stay close." not the default "Stay close." | V8 | 3 | 1 | L | 1 |
| 50 | Fan.html follow count: `writeFanFollow()` writes to localStorage `able_fan_following` — verify fan.html reads this key on load and renders artist cards correctly | FAN | 4 | 2 | M | 2 |
| 51 | Fan form mobile keyboard: `fan-email` input has `enterkeyhint="go"` — verify this triggers form submit on mobile keyboard (Go button) — test with Chrome DevTools mobile | V8 | 3 | 1 | L | 1 |
| 52 | Fan confirmation email timing: the email send fires immediately after fan write — verify there's no double-send if the fan form submits twice in quick succession | V8 | 4 | 1 | L | 1 |
| 53 | Fan near-full banner owner: `fan-limit-banner` shows on fan page for owners at 95+ fans (verified C7) — verify the banner text includes the dynamic remaining count ("5 spots left") | V8 | 3 | 1 | L | 1 |
| 54 | Consent text accuracy: form-2 uses the same GDPR consent text as form-1 — verify both have identical `consentText` strings written to the fan record | V8 | 3 | 1 | L | 1 |
| 55 | Fan profile picture: fan.html shows artist avatar or artwork in follow cards — verify `writeFanFollow()` also writes `artworkUrl` or `topCard.artworkUrl` to the follow entry | FAN | 4 | 2 | M | 2 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (writeFanFollow completeness) → #2 (saveIdentityPage updatedAt) → #3 (recordAdminVisit guard) → #4 (fan dedup on load) → #5 (form-2 joinedAt) → #7 (starred sync verify) → #8 (click log TTL) → #9 (view log TTL) → #10 (profile slug field) → #11 (shows id field) → #12 (fan search debounce) → #15 (fan source badge tokens) → #16 (starred CSV sort) → #17 (fan tab label) → #18 (fan empty search) → #19 (stats refresh after fan write) → #22 (gold lock blur) → #23 (upgrade CTA specificity) → #26 (fan limit nudge copy) → #27 (release gate verify) → #28 (Pro trial hook verify) → #29 (label tier limits) → #30 (gate animation) → #31 (offline banner) → #32 (online recovery) → #33 (submit disabled during flight) → #34 (fan list error guard) → #35 (shows error log) → #36 (clipboard failure catch) → #39 (release date parse guard) → #40 (fan network error toast) → #41 (echo-2 animation) → #42 (form-2 consentVersion) → #43 (near-full gate verify) → #45 (consent date dynamic) → #46 (form-2 trust text) → #47 (followedAt timestamp) → #48 (form-2 dedup message) → #49 (gig state heading) → #51 (enterkeyhint verify) → #52 (double-send guard) → #53 (near-full banner count) → #54 (consent text parity)

**Wave 2 (after Wave 1 committed):**
#6 (schema version), #13 (fan row keyboard), #14 (fan list sort), #20 (streak fan activity), #21 (fan delete undo), #24 (free tier badge), #25 (tier gate preview real data), #37 (localStorage quota toast), #38 (Supabase timeout), #44 (echo personalised), #50 (fan.html follow count), #55 (fan profile picture)

**Wave 3 (polish):**
All remaining refinements
