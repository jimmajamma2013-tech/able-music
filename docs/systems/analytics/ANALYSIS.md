# ABLE Analytics Schema — Analysis
**Created: 2026-03-15 | Overall score: 6.2/10**

> This document audits the current analytics implementation across 8 dimensions. Starting point before the full spec is written.

---

## Scoring summary

| # | Dimension | Score | Status |
|---|---|---|---|
| 1 | Event schema completeness | 5/10 | Basic fields only — missing sessionId, referrer |
| 2 | Source attribution accuracy | 6/10 | `?src=` works but fallback detection not implemented |
| 3 | Aggregation logic | 4/10 | Raw counts only — no time-window filtering, no conversion rate |
| 4 | Retention policy | 3/10 | No rotation — localStorage will bloat indefinitely |
| 5 | Privacy stance | 8/10 | No third-party scripts, no IP — strong foundation |
| 6 | Export capability | 5/10 | Fan CSV specced in admin DESIGN-SPEC, analytics CSV not yet built |
| 7 | Dashboard reporting quality | 5/10 | Source breakdown bars exist, but no conversion rate or time windows |
| 8 | Anti-self-visit | 2/10 | No artist detection — artist page refreshes inflate view count |

**Overall: 6.2/10**
Current estimate (from brief) was 6/10 — this audit finds broadly the same picture.

---

## Dimension 1 — Event schema completeness: 5/10

### What exists
```javascript
// able_clicks
{ label: string, type: string, ts: number, source: string }

// able_views
{ ts: number, source: string }

// able_fans
{ email: string, ts: number, source: string }
```

### What's missing
- **`sessionId`** — without this, there's no way to deduplicate a refresh vs a new visitor. A fan who refreshes 10 times counts as 10 views.
- **`referrer`** — `document.referrer` captures traffic origin when `?src=` isn't in the URL (e.g. a link posted on WhatsApp with no UTM params). Not stored at all currently.
- **`url`** on click events — no record of which destination was tapped. Makes `label` the only identifier, which breaks if labels change.
- **`isArtist`** flag — no way to exclude artist's own views from stats.
- **`clickCount`** per session — no rate limiting. Single session could fire 100 clicks.

### Gap impact
Without `sessionId`, conversion rate is meaningless (clicks ÷ refreshes, not clicks ÷ unique visitors). This is the most important missing field.

---

## Dimension 2 — Source attribution accuracy: 6/10

### What exists
`?src=ig`, `?src=tt`, `?src=qr` etc. stored against every event. Canonical values defined in `CROSS_PAGE_JOURNEYS.md`.

### What's missing
- **Referrer-based fallback**: if an artist pastes their link on Instagram without the `?src=ig` parameter, the visit is recorded as `direct`. A visitor from Instagram's in-app browser would be missed.
- **Consistency**: the source detection logic isn't centralised — each page that writes to `able_views` or `able_clicks` may implement differently.
- **`other` category**: referrals from sites outside the known list (blogs, YouTube descriptions, Linktree) are currently untracked.
- **`twitter`** is in the referrer fallback plan but not in the canonical `SOURCE_VALUES` object.

### Gap impact
Source breakdown bars in admin will under-report Instagram traffic by a meaningful margin if artists don't always use `?src=ig` links (they won't — they'll just paste the URL sometimes).

---

## Dimension 3 — Aggregation logic: 4/10

### What exists
Admin shows total counts: total views, total clicks, total fans. Source breakdown bars from raw counts.

### What's missing
- **Time-window filtering**: no 7-day or 30-day view. "Total clicks ever" is far less useful than "clicks this week". An artist whose profile has been live for 6 months will see stats dominated by old data.
- **Conversion rate**: `fans / views * 100` — the single most important metric. Not computed anywhere.
- **Top CTA**: which specific CTA is getting tapped most. Useful for understanding what fans respond to.
- **Click type breakdown**: platform vs CTA vs snap card clicks — grouped for clarity.
- **Sparklines**: specced in admin DESIGN-SPEC (show/hide based on `getDataDaySpan >= 3`) but aggregation function not written.
- **Delta vs yesterday**: `+3 today` hint exists in admin spec but the computation function isn't formalised.

### Gap impact
Without time windows and conversion rate, the stats section gives artists a historical ledger but not actionable signal. An artist can't tell "is my page working this week?"

---

## Dimension 4 — Retention policy: 3/10

### What exists
None. Events accumulate in localStorage indefinitely.

### What's missing
- **Rotation**: no rule for pruning old events. A profile live for 12 months with daily traffic could accumulate 10,000+ view events. LocalStorage has a ~5MB limit per origin. Each view event is ~80 bytes (JSON), so ~62,000 events before hitting the limit — reachable within 1-2 years for active artists.
- **Supabase sync trigger**: no logic to flush old events to Supabase and clear from localStorage.
- **Warning to artist**: no alert when localStorage is approaching the limit.
- **Fan retention policy**: fans should never be deleted from localStorage without explicit artist action. Separate from analytics events.

### Gap impact
Low risk in the short term (< 6 months). High risk for artists who are active early adopters. Needs a defined policy before Supabase is added.

---

## Dimension 5 — Privacy stance: 8/10

### What exists
- No third-party analytics scripts (no GA, no Mixpanel, no Meta Pixel)
- No IP addresses stored
- Fan emails in artist's own localStorage only
- No cross-artist data access possible (same-origin isolation)

### What's missing
- **Formal privacy statement**: nothing in the admin UI tells the artist what ABLE tracks and why
- **Fan-facing disclosure**: no mention on the artist profile that fan sign-up stores their email
- **GDPR data deletion flow**: no mechanism for a fan to request deletion of their email from an artist's list
- **`isArtist` exclusion**: currently no flag to differentiate artist vs fan views — artist's own page visits inflate public-facing stats (privacy concern in reverse: artist's own behaviour looks like fan activity)

### Score note
8/10 because the fundamentals are correct — no third-party tracking is a strong position. The gaps are transparency and process, not technical violations.

---

## Dimension 6 — Export capability: 5/10

### What exists
Fan CSV export is specced in `admin/DESIGN-SPEC.md` section 8.2 with the button and `exportFansCSV()` function reference. Present in the admin UI.

### What's missing
- **Analytics CSV export**: no spec or implementation for exporting raw views/clicks data. An artist cannot download their analytics history.
- **Full export**: combined export (fans + analytics + shows) for artist data portability.
- **Date range filter on export**: export last 30 days vs all time.

### Gap impact
Fan export is the most important (directly useful — mailchimp import etc.). Analytics export is secondary but becomes important for artists who want to analyse in a spreadsheet.

---

## Dimension 7 — Dashboard reporting quality: 5/10

### What exists
Admin shows 4 stat cards: Views, Clicks, Fans, (implied) Click rate. Source breakdown bars. "Day 1 ✦" zero state. Streak signal (5 of last 7 days).

### What's missing
- **Conversion rate** as a first-class metric displayed prominently
- **7-day / 30-day toggle** — currently all-time only
- **Top CTA display** — "What fans tapped most this week"
- **Source trend** — is Instagram traffic growing vs last week?
- **Empty state with interpretation**: not just "0 views" but "Share your link to start seeing visitors" with specific advice
- **Comparative context**: "3 fans this week" alone means nothing — context would be "You had 0 last week" or a benchmark

### Score note
The stat card design is solid (Barlow Condensed 28px values, skeleton states, Day 1 handling). The gap is in what those cards compute, not how they look.

---

## Dimension 8 — Anti-self-visit: 2/10

### What exists
Nothing. No mechanism to detect or exclude artist views from their own page stats.

### What's missing
- **Artist detection**: if `localStorage.getItem('able_v3_profile')` is set, the visitor is almost certainly the artist. This flag should mark the view as `isArtist: true` and exclude it from displayed stats.
- **Session-level dedup**: even without artist detection, refreshing the page should not count as multiple views — requires `sessionId` in `sessionStorage`.
- **Admin preview views**: when artist visits `able-v7.html` from the "Edit page →" link, those views should not be counted.
- **Rate limiting**: no protection against bots or repeated clicks. A single bad actor could spam clicks to test the system.

### Gap impact
High. An artist who checks their own page every day will inflate their view count significantly. Their conversion rate will look artificially low. This erodes trust in the numbers.

---

## Key findings

1. **The most urgent gap is `sessionId`** — it underpins deduplication, conversion rate accuracy, and anti-self-visit all at once. One field addition fixes three problems.

2. **Aggregation is the second priority** — raw totals exist; time-windowed stats and conversion rate do not. These are what make the numbers useful rather than just present.

3. **Privacy fundamentals are strong** — the decision not to use third-party scripts is the right one and should be stated explicitly in the admin UI as a trust signal for artists.

4. **Retention needs a defined policy before Supabase is added** — the migration from localStorage to Supabase needs a clear rule for what moves, what stays, and what's pruned.

5. **Anti-self-visit is easy to fix and disproportionately important** — detecting `able_v3_profile` in localStorage takes 3 lines of code and meaningfully improves stat accuracy from day one.
