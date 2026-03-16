# ABLE Analytics — Path to 10
**Created: 2026-03-15 | Starting score: 6.2/10 | Target: 9.5/10 (spec-complete)**

> Organised by priority tier. Each tier includes score delta, specific tasks, and acceptance criteria.

---

## Starting state

**6.2/10** — Basic event schema exists. Raw counts display in admin. Source tracking is present in theory. No session dedup, no aggregation logic, no retention policy, no artist self-visit detection.

---

## P0 — Foundation (6.2 → 7.5)

These are fixes to existing behaviour that are causing misleading data right now. They require no backend and no new UI.

### P0.1 — Add `sessionId` to all events

**Why now:** Without sessionId, a fan who refreshes 3 times counts as 3 views. Conversion rate is unusable.

**Tasks:**
- Implement `getOrCreateSessionId()` using `sessionStorage` + `crypto.randomUUID()`
- Add `sessionId` field to every `recordView()`, `recordClick()`, and fan sign-up write
- Add dedup check in `recordView()`: skip if this sessionId already has a view entry

**Acceptance criteria:**
- Refreshing able-v7.html 5 times creates exactly 1 view event
- Every event in `able_views`, `able_clicks`, `able_fans` has a non-null `sessionId`
- Different browser sessions (close + reopen tab) produce different sessionIds

---

### P0.2 — Artist self-visit detection

**Why now:** An artist who checks their own page daily inflates their view count and suppresses their conversion rate. Trust in the numbers erodes immediately.

**Tasks:**
- Implement `isArtistVisit()` — check `localStorage.getItem('able_v3_profile')`
- Add `isArtist: true` flag to view events recorded during artist visits
- Update `getStats()` aggregation to filter `!v.isArtist` from the view count

**Acceptance criteria:**
- Artist visits their own page → view event has `isArtist: true`
- Admin stats do not count artist's own visits in view total
- Fan who visits (no `able_v3_profile` in their localStorage) is counted normally

---

### P0.3 — Fix source detection logic

**Why now:** Artists will sometimes paste their link without `?src=ig`. Instagram in-app browser traffic will be attributed as `direct`. Source breakdown bars in admin will be inaccurate.

**Tasks:**
- Implement `detectSource()` with the two-pass logic: `?src=` param first, `document.referrer` fallback
- Handle Instagram's redirect URL (`l.instagram.com`) in referrer check
- Handle TikTok's shortened URL (`vm.tiktok.com`) in referrer check
- Add `twitter` / `x.com` to referrer checks (currently absent from `SOURCE_VALUES`)
- Cache result as `_pageSource` — run once per page load, not per event
- Store `document.referrer` (if non-empty) on view events as `referrer` field

**Acceptance criteria:**
- Visit via Instagram with `?src=ig` → source = `ig`
- Visit via Instagram without `?src=ig` → source = `ig` (referrer fallback)
- Visit with no referrer and no param → source = `direct`
- Visit from unknown blog → source = `other`

---

### P0.4 — Define and implement retention/rotation policy

**Why now:** Before any artist accumulates significant data, the policy needs to exist. Retroactive pruning is lossy.

**Tasks:**
- Implement `rotateEvents(key, events, maxDays)` — prune and re-write in one atomic operation
- Set retention: `able_views` 90 days, `able_clicks` 180 days, `able_fans` never auto-deleted
- Call `rotateEvents` inside `recordView()` and `recordClick()` — passive rotation on every write
- Implement `checkLocalStorageHealth()` — estimate bytes used, flag if > 4MB
- Wire `checkLocalStorageHealth()` to admin.html load (log to console for now; admin UI warning in P1)

**Acceptance criteria:**
- Adding a view event with a date > 90 days ago results in it being pruned on next write
- `able_fans` is never touched by rotation
- `checkLocalStorageHealth()` returns `{ usedBytes, warningThreshold }` with correct values

---

**Score after P0: 7.5/10**

| Dimension | Before | After |
|---|---|---|
| Event schema completeness | 5 | 7.5 |
| Source attribution accuracy | 6 | 8 |
| Aggregation logic | 4 | 4 (unchanged — next tier) |
| Retention policy | 3 | 7 |
| Anti-self-visit | 2 | 7.5 |
| Others | unchanged | unchanged |

---

## P1 — Useful stats (7.5 → 8.5)

These make the analytics meaningful rather than just present. Artist can now answer "is my page working this week?"

### P1.1 — `getStats()` with time-window filtering

**Tasks:**
- Implement `getStats(days)` as specced in SPEC.md §2.4
- Support `days = 7`, `days = 30`, `days = null` (all time)
- Replace raw `localStorage.getItem` calls in admin.html with `getStats(7)` call
- Admin home: show 7-day stats by default

**Acceptance criteria:**
- `getStats(7)` returns only events from the last 7 calendar days
- `getStats(null)` returns all events regardless of age
- Switching between 7-day and 30-day updates all 4 stat cards simultaneously

---

### P1.2 — Conversion rate as first-class admin metric

**Tasks:**
- Add conversion rate to `StatsResult` (already specced)
- Add 4th stat card to admin home: "Click rate" — `fans / views * 100`
- Zero state: if views = 0, show "—" not "0%" (avoids division by zero display confusion)
- Tooltip / label: "of visitors signed up" — specific, not generic

**Acceptance criteria:**
- Conversion rate shown as "4.2%" with "of visitors signed up" sub-label
- If 0 views: displays "—"
- Updates when time window is toggled

---

### P1.3 — 7 / 30 / All time toggle in admin stats

**Tasks:**
- Add toggle row above stat cards: "7 days | 30 days | All time"
- Default: 7 days
- Persist selection in `sessionStorage` (not localStorage — resets on next visit is fine)
- Toggle re-runs `getStats()` and updates all 4 cards + source breakdown bars

**Acceptance criteria:**
- Toggle visible on admin home stats section
- Switching "30 days" updates all stat values within 100ms
- Selected state is visually distinct (amber underline or filled pill)

---

### P1.4 — Top CTA display in admin

**Tasks:**
- Add "What fans tapped most" row below stat cards
- Shows top 3 labels from `clickBreakdown` (from `getStats()`)
- Each row: label, count, and mini bar (proportional to top result)
- Empty state: "No taps yet — share your link to see what resonates"

**Acceptance criteria:**
- Top CTA list shows up to 3 entries, sorted by count descending
- Mini bar accurately reflects proportion (top item = 100% width)
- Updates when time window toggle changes

---

### P1.5 — Analytics CSV export

**Tasks:**
- Implement `exportAnalyticsCSV()` and `downloadCSV()` as specced in SPEC.md §2.7
- Add "Export analytics →" button in admin (secondary, below fan export button)
- Downloads two files: `able-views.csv`, `able-clicks.csv`

**Acceptance criteria:**
- Button visible in admin (Analytics section or Fans page secondary)
- Downloads correct CSVs with right columns
- If no events: button is disabled with "No data yet" tooltip
- URL commas are escaped in the clicks CSV

---

### P1.6 — localStorage health warning in admin

**Tasks:**
- Wire `checkLocalStorageHealth()` to admin.html page load
- If `warningThreshold` is true: show nudge in admin home "Your analytics history is nearly full — we'll tidy it up when you connect to the cloud."
- Nudge should be dismissible and not re-show until next day

**Acceptance criteria:**
- Nudge appears when localStorage > 4MB
- Nudge is dismissible
- Nudge does not appear when localStorage is healthy

---

**Score after P1: 8.5/10**

| Dimension | Before P1 | After P1 |
|---|---|---|
| Aggregation logic | 4 | 8.5 |
| Dashboard reporting quality | 5 | 8.5 |
| Export capability | 5 | 8 |
| Others | see P0 | unchanged |

---

## P2 — Realtime and durability (8.5 → 9.5)

These require Supabase backend to be live. Cannot be completed in localStorage-only mode.

### P2.1 — Supabase sync pattern (flush old events)

**Tasks:**
- Implement flush function: read events older than 7 days, batch-insert to Supabase `views` + `clicks` tables
- On confirmed insert: delete those events from localStorage
- Trigger on admin.html load (online only — check `navigator.onLine`)
- Keep last 7 days in localStorage as fast cache

**Acceptance criteria:**
- Events older than 7 days are flushed to Supabase on admin load
- After flush, localStorage only contains last 7 days of events
- If offline: flush is skipped, no data loss
- Historical stats (30-day, all-time) query Supabase when needed

---

### P2.2 — Realtime new-fan notification in admin

**Tasks:**
- Implement Supabase realtime subscription on `fans` table filtered by `artist_id`
- On INSERT: show toast "A new fan just joined from [source]."
- Append fan to fan list in real time (no page refresh required)
- Trigger milestone check after each new fan

**Acceptance criteria:**
- Fan signs up on able-v7.html → toast appears in admin.html within 2 seconds
- Fan appears in fan list without refresh
- Milestone toast fires if count crosses threshold
- Source is displayed in the toast (e.g. "from Instagram")

---

### P2.3 — Basic anti-bot filtering

**Tasks:**
- Rate limit: max 10 click events per session (already in SPEC.md §2.3 `recordClick`)
- Rate limit: if more than 50 view events from the same IP in 10 minutes (Supabase server-side check), flag as suspect
- Suspect events tagged `isSuspect: true` in Supabase — excluded from stats display
- No bot filtering in localStorage-only mode (client-side only, easily gamed — deprioritise until Supabase)

**Acceptance criteria:**
- Session that fires 11 click events has the 11th dropped silently
- Supabase function flags IP-based repeat views
- Suspect events are not counted in `getStats()` output

---

### P2.4 — Source trend over time (admin analytics section)

**Tasks:**
- Add "Sources" chart to admin Analytics section (accessible via bottom nav)
- Show source breakdown for 7-day and 30-day windows side by side
- Highlight source with biggest week-over-week growth ("Instagram is up this week")
- Requires Supabase for 30-day data (localStorage only has 7 days after P2.1)

**Acceptance criteria:**
- Source breakdown chart shows all active sources proportionally
- Week-over-week comparison visible for 30-day window
- No chart if fewer than 3 days of data (matches sparkline rule)

---

**Score after P2: 9.5/10**

| Dimension | Before P2 | After P2 |
|---|---|---|
| Aggregation logic | 8.5 | 9 |
| Retention policy | 7 | 9.5 |
| Dashboard reporting quality | 8.5 | 9.5 |
| Anti-self-visit | 7.5 | 8 (P2.3 improves bot side) |

---

## What gets to 10

A score of 10 requires live Supabase with real traffic, external verification, and formal process — not just code completeness.

| Requirement | Why it matters |
|---|---|
| Supabase live with real multi-artist traffic | Validates that RLS policies work, that events survive browser clears, that realtime subscription scales |
| Playwright analytics tests | Automated test: fan visits page → event written → admin shows correct count. Prevents regressions. |
| GDPR data deletion request flow | Fan emails [privacy@ablemusic.co] → artist is notified → deletion from Supabase confirmed. Required for EU compliance. |
| Privacy audit (independent review) | Third-party confirmation that no cross-site data leaks, no third-party calls |
| Artist feedback on stat usefulness | 10 artists using admin weekly → feedback that the stats are genuinely useful for decisions (not just present) |

---

## Implementation order summary

```
P0 (now, localStorage only):
  P0.1 sessionId → P0.2 artist detection → P0.3 source fallback → P0.4 retention

P1 (now, localStorage only):
  P1.1 getStats() → P1.2 conversion rate → P1.3 time toggle → P1.4 top CTA → P1.5 CSV export → P1.6 health warning

P2 (when Supabase is live):
  P2.1 flush sync → P2.2 realtime fans → P2.3 anti-bot → P2.4 source trends

→ 10: real traffic + tests + GDPR + audit
```
