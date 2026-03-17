# ABLE — Cycle 12 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 11**
**Scores entering Cycle 12: CRM 8.6/10 · Data architecture 8.7/10 · Tier gates 8.7/10 · Error states 8.8/10 · UX system 8.5/10**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — CRM | 8.6/10 | 9.2/10 | Fan list sort UI, fan row keyboard nav, fan delete undo polish |
| B — Data architecture | 8.7/10 | 9.2/10 | Multi-artist safety, safeLS coverage audit, schema version sentinel |
| C — Tier gates | 8.7/10 | 9.2/10 | Server enforcement missing; gate preview real data; free tier badge |
| D — Error states | 8.8/10 | 9.3/10 | Supabase timeout guard, localStorage quota warning, Supabase retry |
| E — UX system | 8.5/10 | 9.2/10 | Fan journey echo personalisation, Near-full CTA, fan.html follow flow |

---

## Dimension A — CRM
*Score: 8.6/10 → target 9.2/10. Fan management completeness.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Fan list sort UI: add sort dropdown (Newest / Oldest / Starred first / Source) above fan list — updates `renderFanList()` call with sort param | ADM | 4 | 3 | M | 2 |
| 2 | Fan source badge tokens: each fan row shows a coloured source pill — verify `fan-source` badge uses CSS token colour map via `--source-ig`, `--source-sp`, etc. | ADM | 2 | 1 | L | 1 |
| 3 | Starred fan CSV: when exporting, starred fans sort first in the CSV — apply same sort as UI | ADM | 3 | 1 | L | 1 |
| 4 | Fan week/month stat refresh: verify `loadRealStats()` is called after any fan write (new sign-up, delete) | ADM | 3 | 1 | L | 1 |
| 5 | Fan count in tab label updates after delete: after soft-delete undo resolution, verify fan count in `mn-fans` aria-label refreshes | ADM | 2 | 1 | L | 1 |
| 6 | Fan search clears on tab navigate: when switching to fan tab, `fansSearch` value should persist but the list should re-render with existing search | ADM | 2 | 1 | L | 1 |
| 7 | Fan detail sheet: clicking fan row opens detail sheet with `email`, `source`, `ts`, `campaignState`, `isStarred` — verify all fields render | ADM | 3 | 1 | L | 1 |
| 8 | Fan detail close: pressing Escape on the fan detail sheet closes it (same as close button) | ADM | 3 | 1 | L | 1 |
| 9 | Fan export includes joinedAt: CSV export function `exportFansCSV()` — verify the `joinedAt` field is included as a column | ADM | 3 | 1 | L | 1 |
| 10 | Fan filter pill count: show count next to each filter pill: "All (23)", "Instagram (8)", etc. | ADM | 3 | 2 | L | 2 |
| 11 | Fan starred count: show starred count in a badge on the "Starred" filter pill | ADM | 2 | 1 | L | 1 |
| 12 | Fan row avatar initials: `.fan-avatar` shows email initial — verify it updates to first letter of email, not always 'F' | ADM | 2 | 1 | L | 1 |
| 13 | Fan detail sheet: "Mark as close" star button in fan detail sheet — verify it persists star state on close and reopening | ADM | 3 | 1 | L | 1 |
| 14 | Fan list row hover background: `.fan-list-row:hover` — verify it shows a subtle background highlight | ADM | 2 | 1 | L | 1 |
| 15 | Fan search placeholder: `fansSearch` placeholder reads "Search fans…" — verify it's set | ADM | 2 | 1 | L | 1 |

---

## Dimension B — Data Architecture
*Score: 8.7/10 → target 9.2/10. Schema robustness and Supabase readiness.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 16 | Schema version sentinel: add `_schemaVersion: 1` to `able_shows` on first write — enables future migrations | ADM | 2 | 1 | L | 1 |
| 17 | Profile `updatedAt` on identity save: `saveIdentityPage()` — verify it stamps `updatedAt: new Date().toISOString()` | ADM | 3 | 1 | L | 1 |
| 18 | Click log TTL verify: `rotateEvents('able_clicks', ...)` — verify it trims to 2000 entries on write | ADM | 2 | 1 | L | 1 |
| 19 | Fan `ts` field on form-2: verify form-2 fan write includes `ts: Date.now()` (unix ms) alongside `joinedAt` (ISO) | V8 | 3 | 1 | L | 1 |
| 20 | `able_v3_profile` null guard: `safeLS(V3_KEY, {})` used everywhere — verify no code path does `profile.x.y` without a null check on `profile.x` | ADM | 3 | 2 | M | 2 |
| 21 | Show `sortOrder` field: when a show is moved (reordered), verify the `sortOrder` field on each show record is updated correctly | ADM | 3 | 1 | L | 1 |
| 22 | Profile `handle` guard: `profile.handle` used in Supabase sync — verify `syncProfile()` skips sync if `handle` is null or empty | ADM | 4 | 1 | L | 1 |
| 23 | Fan `source` normalisation on write: verify fan form writes `source: normaliseSource(SESSION_SOURCE)` — not raw UTM strings | V8 | 3 | 1 | L | 1 |
| 24 | Admin visit cap: `admin_visit_dates` trimmed to last 60 — verify `recordAdminVisit()` slices to 60 entries | ADM | 2 | 1 | L | 1 |
| 25 | `able_clicks` `type` field present on all writes: every `clicks.push()` must include `type` — audit call sites | ADM | 3 | 1 | L | 1 |
| 26 | Profile backup key: before any destructive profile write, verify `setLS('able_v3_profile_bak', current)` is called in `saveProfilePage()` | ADM | 3 | 1 | L | 1 |
| 27 | Release card `id` field: `openReleaseEdit()` creates releases without a stable `id` — verify `id: 'rel_' + Date.now()` is present | ADM | 3 | 1 | L | 1 |
| 28 | Fan `campaignState` on form-2: verify form-2 also writes `campaignState` to the fan record (same as form-1) | V8 | 3 | 1 | L | 1 |
| 29 | Merch `id` field: when saving merch items, verify each has a stable `id: 'merch_' + Date.now()` | ADM | 2 | 1 | L | 1 |
| 30 | `able_fans` dedup guard: on fan form-1 submit, verify duplicate email is caught before write (not just after) | V8 | 4 | 1 | L | 1 |

---

## Dimension C — Tier Gates
*Score: 8.7/10 → target 9.2/10. Gate preview polish and copy refinement.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 31 | Gate preview real data: blurred preview behind gold lock shows real data from localStorage — not placeholder lorem | ADM | 4 | 3 | M | 2 |
| 32 | Free tier badge topbar: header shows subtle "Free" tier badge when on free tier — drives awareness without being aggressive | ADM | 3 | 1 | L | 1 |
| 33 | Broadcast gate copy: broadcast gate says "Send broadcasts on Artist plan" — not generic "Upgrade" | ADM | 4 | 1 | L | 1 |
| 34 | Fan export gate copy: fan export gate says "Export your list on Artist plan" — not generic | ADM | 4 | 1 | L | 1 |
| 35 | Tier gate on broadcast: verify free tier cannot actually trigger a broadcast (JS gate enforced, not just UI hidden) | ADM | 4 | 1 | L | 1 |
| 36 | Artist Pro trial hook: "Try Artist Pro free for 30 days" nudge fires once (localStorage flag) at first 100 fans | ADM | 3 | 1 | L | 1 |
| 37 | Label tier: `able_tier = 'label'` removes all JS limits (fan cap, show cap, export gate) — verify `tierAtLeast('artist-pro')` covers label | ADM | 4 | 1 | L | 1 |
| 38 | Fan limit nudge specific copy: `fan-limit-banner` at 95+ fans reads "You're [N] from your limit. Artist plan takes you to 2,000." — dynamic N | V8 | 4 | 1 | L | 1 |
| 39 | Gate animation spec check: gold lock overlay appears with 150ms opacity fade — verify `animation: gloFadeIn 150ms ease-out` exists | ADM | 2 | 1 | L | 1 |
| 40 | Snap card gate: at 1 snap card on free tier, adding another shows specific gate copy "Add unlimited Updates on Artist plan" | ADM | 3 | 1 | L | 1 |
| 41 | CRM gate copy: fan export / broadcasts gold overlay — verify `glo-title` reads the feature name, not "Pro Feature" | ADM | 3 | 1 | L | 1 |
| 42 | Artist Pro upsell on analytics: advanced analytics section — verify gold lock shows "See full analytics on Artist Pro" | ADM | 3 | 1 | L | 1 |
| 43 | Tier check on Supabase sync: `syncProfile()` includes `tier` in the profile payload — verify tier field is written | ADM | 3 | 1 | L | 1 |
| 44 | Free tier snap card disabled state: add button is `disabled` + tooltip when at 1-card limit — verify tooltip text is specific | ADM | 2 | 1 | L | 1 |
| 45 | Tier badge click: clicking tier badge navigates to settings (upgrade section) — verify `onclick="showPage('settings')"` is present | ADM | 2 | 1 | L | 1 |

---

## Dimension D — Error States
*Score: 8.8/10 → target 9.3/10. Supabase resilience and quota handling.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 46 | Supabase timeout on admin load: `sbSyncProfile()` has no timeout — add `AbortController` 10s timeout to prevent hung loading | ADM | 3 | 2 | M | 2 |
| 47 | localStorage quota warning: when `setLS()` throws (quota exceeded), show "Storage nearly full — some data may not save." toast once per session | ADM | 4 | 2 | M | 1 |
| 48 | Admin crash recovery copy: the catch block at admin init shows "Dashboard failed to load." — verify it includes the Refresh button | ADM | 3 | 1 | L | 1 |
| 49 | Fan form network error copy: if Supabase fan write fails, toast says "Saved locally. Will sync when back online." not "Error" | V8 | 3 | 1 | L | 1 |
| 50 | Shows load error console warning: if `_renderShowsSectionImpl()` throws, verify `console.warn('[ABLE] shows render error:', err)` is present | V8 | 2 | 1 | L | 1 |
| 51 | Snap card save error: if `setLS()` fails during snap save, show "Couldn't save — storage might be full." toast | ADM | 3 | 1 | L | 1 |
| 52 | Platform URL validation error message: `validatePlatformUrl()` shows field-level error on bad URL — verify error reads "That doesn't look like a [platform] URL." | ADM | 3 | 1 | L | 1 |
| 53 | Release date invalid string guard: `new Date(profile.releaseDate)` — verify `isNaN()` guard is present in all render paths (not just `computeState()`) | V8 | 3 | 1 | L | 1 |
| 54 | Empty fans array guard: `safeLS('able_fans', [])` — verify every fan map/filter call has `|| []` fallback | ADM | 3 | 1 | L | 1 |
| 55 | Admin session expiry notice: if Supabase auth token expires mid-session, show "Session expired. Refresh to continue." — not a blank state | ADM | 3 | 2 | M | 2 |

---

## Dimension E — UX System
*Score: 8.5/10 → target 9.2/10. Fan journey and echo personalisation.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 56 | Fan echo personalised: when artist has pre-release or live state, echo reads "You're in. [Release title] drops [date]. First to know." | V8 | 4 | 2 | M | 2 |
| 57 | Fan consent date dynamic: `consentText` currently uses hardcoded date — compute dynamically as `new Date().toISOString().slice(0,10)` on sign-up | V8 | 2 | 1 | L | 1 |
| 58 | Fan form 2 trust text: verify `fan-trust-2` text includes artist name substitution (same as form-1) | V8 | 3 | 1 | L | 1 |
| 59 | Fan mobile keyboard: `fan-email` has `enterkeyhint="go"` — verify this submits the form on mobile Go button | V8 | 3 | 1 | L | 1 |
| 60 | Fan confirmation double-send guard: fan email send fires immediately — verify no double-send if form submits twice in quick succession | V8 | 4 | 1 | L | 1 |
| 61 | Fan consent text parity: form-1 and form-2 both write identical `consentText` to fan record — verify | V8 | 3 | 1 | L | 1 |
| 62 | fan.html follow count: `writeFanFollow()` writes to `able_fan_following` — verify fan.html reads this key on load and renders artist cards | FAN | 4 | 2 | M | 2 |
| 63 | fan.html profile picture: verify `writeFanFollow()` includes `artworkUrl` or top card artwork URL in the follow entry | FAN | 4 | 1 | L | 1 |
| 64 | Fan streak display: streak in admin shows days with any activity — verify fan sign-ups count (not just admin visits) | ADM | 2 | 1 | L | 2 |
| 65 | Empty snap card state message: when no snap cards, empty state reads "No updates yet. Add a snap card to tell fans what's happening." — verify | ADM | 2 | 1 | L | 1 |
| 66 | Gig fan capture personalised: in gig state, verify fan capture heading reads "On tonight. Stay close." (verified C11 ✓) | V8 | 2 | 1 | L | 1 |
| 67 | Artist onboarding completion: after wizard completes, admin greeting reads "Good to see you, [Name]." — verify name is passed through | ADM | 3 | 1 | L | 1 |
| 68 | Fan capture aria-label dynamic: `aria-label="Join [artist]'s list"` — verify it updates when profile name changes (live edit) | V8 | 3 | 1 | L | 1 |
| 69 | Release countdown chip label: countdown chip reads "Dropping [date]" — verify `renderCountdown()` uses this format | V8 | 3 | 1 | L | 1 |
| 70 | Post-live state: 14+ days after release, `computeState()` returns `profile` — verify the auto-switch clears `stateOverride='live'` | V8 | 3 | 1 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#2 (fan source badge) → #3 (starred CSV) → #4 (stats after fan write) → #5 (fan count after delete) → #7 (fan detail fields) → #8 (fan detail Escape) → #9 (export joinedAt) → #11 (starred count pill) → #12 (fan avatar initials) → #13 (fan detail star persist) → #14 (fan row hover) → #15 (search placeholder) → #16 (schema version) → #17 (identity updatedAt) → #18 (click TTL verify) → #19 (form-2 ts) → #21 (show sortOrder) → #22 (handle guard) → #23 (source normalised) → #24 (visit cap) → #25 (clicks type field) → #27 (release id) → #28 (form-2 campaignState) → #29 (merch id) → #30 (fan dedup guard) → #32 (free tier badge) → #33 (broadcast gate copy) → #34 (export gate copy) → #35 (broadcast gate enforce) → #36 (Pro trial hook) → #37 (label tier limits) → #38 (fan limit nudge) → #39 (gate animation) → #40 (snap gate copy) → #41 (CRM glo-title) → #43 (tier in sync) → #44 (snap disabled tooltip) → #45 (tier badge click) → #47 (localStorage quota warning) → #48 (crash recovery copy) → #49 (fan network error toast) → #50 (shows error warning) → #51 (snap save error) → #52 (platform URL error) → #53 (release date guard all paths) → #54 (fans array guard) → #57 (consent date dynamic) → #58 (form-2 trust text) → #59 (enterkeyhint verify) → #60 (double-send guard) → #61 (consent parity) → #63 (fan.html artworkUrl) → #65 (snap empty state) → #67 (greeting after wizard) → #68 (aria-label live) → #69 (countdown chip label) → #70 (post-live state clear)

**Wave 2 (after Wave 1 committed):**
#1 (fan list sort UI), #10 (filter pill counts), #20 (null guard audit), #26 (profile backup), #31 (gate preview real data), #42 (analytics gate), #46 (Supabase timeout), #55 (session expiry), #56 (echo personalised), #62 (fan.html follow count), #64 (streak fan activity)

**Wave 3 (polish):**
All remaining refinements
