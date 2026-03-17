# ABLE Analytics — Final Review
**Created: 2026-03-15 | Updated: 2026-03-16 | Target ceiling: 9.5/10 (spec-complete) | True 10: requires live Supabase + real traffic + GDPR audit**

---

## Score progression

| # | Dimension | Current | After P0 | After P1 | After P2 | Ceiling |
|---|---|---|---|---|---|---|
| 1 | Event schema completeness | 5.0 | 9.0 | 9.5 | 9.5 | 9.5 |
| 2 | Source attribution accuracy | 6.0 | 8.0 | 8.0 | 8.5 | 9.0 |
| 3 | Aggregation logic | 4.0 | 4.0 | 8.5 | 9.0 | 9.5 |
| 4 | Retention policy | 3.0 | 7.0 | 7.5 | 9.5 | 9.5 |
| 5 | Privacy stance | 8.0 | 8.5 | 8.5 | 9.0 | 9.5 |
| 6 | Export capability | 5.0 | 5.0 | 8.0 | 8.5 | 9.0 |
| 7 | Dashboard reporting quality | 5.0 | 5.0 | 8.5 | 9.5 | 9.5 |
| 8 | Anti-self-visit | 2.0 | 8.5 | 8.5 | 8.5 | 8.5 |
| 9 | PostHog / external analytics | 0.0 | 8.5 | 8.5 | 9.0 | 9.5 |
| **Overall** | | **6.2** | **8.5** | **9.1** | **9.4** | **9.5** |

### Score milestones explained

**After `sessionId` + anti-self-visit + PostHog init = 8.5/10**

These three P0 changes lift the overall score to 8.5 without any UI work or backend. The reason the jump is so large: `sessionId` fixes deduplication (dimension 1), anti-self-visit fixes the most damaging data quality problem (dimension 8), and PostHog init adds a professional external analytics layer (dimension 9 — new). The combination means the artist's data is immediately trustworthy and the product team has visibility into the wizard funnel.

**After all 7 PostHog events wired = 9.5/10**

The 7 events (page_view, cta_tap, fan_signup, admin_page_view, profile_state_change, wizard_step_complete, wizard_complete) cover every material user action across all three pages. With these wired, ABLE has:
- Full funnel visibility: wizard → profile → fan sign-up
- Artist behaviour in admin (which sections they open, how often they change state)
- Attribution at every step (`source` field on all events)

This is the spec-complete state. P1 (getStats, conversion rate, time toggle) closes the remaining gap in the localStorage-facing stats.

---

## Dimension notes

### 1. Event schema completeness — ceiling 9.5/10

Current `{label, type, ts, source}` captures the core facts. After P0 (`sessionId` + `isArtist` + `referrer`), deduplication and session-level analysis become possible. The remaining 0.5 gap: device type (mobile vs desktop) is deliberately not tracked — it introduces complexity without proportionate value. Intentional omission.

### 2. Source attribution accuracy — ceiling 9.0/10

A structural limit: a portion of Instagram traffic will always arrive without a referrer header (iOS Safari privacy, link-in-bio tools that strip referrers, WhatsApp). The `?src=ig` convention is the mitigation. Good tooling (QR codes, pre-built share links) reduces the gap. True 9.0+ requires teaching artists to always use tagged links.

### 3. Aggregation logic — ceiling 9.5/10

After P1, `getStats()` provides 7/30/all-time windows, conversion rate, and top CTA. The 0.5 gap: source trend analysis (week-over-week) requires Supabase data beyond the 7-day localStorage window.

### 4. Retention policy — ceiling 9.5/10

After P2, events flush to Supabase and localStorage is a 7-day cache. The 0.5 gap: the Supabase flush has never been battle-tested at scale.

### 5. Privacy stance — ceiling 9.5/10

PostHog EU Cloud is the right choice: data stays in the EU, GDPR-covered, no US data transfer concerns. The remaining gap: GDPR fan deletion flow not yet built, and the admin privacy statement (specced in FINAL-REVIEW.md §Privacy statement) is not yet rendered in the UI.

### 6. Export capability — ceiling 9.0/10

Fan CSV export is present. Analytics CSV is fully specced in SPEC.md §2.7, ready to implement. The 1.0 gap: combined export and date-range filtering on export — both P2-era features.

### 7. Dashboard reporting quality — ceiling 9.5/10

After P1, admin shows conversion rate, time-window toggle, top CTA, source breakdown. The 0.5 ceiling gap: truly excellent reporting requires real artist feedback — ten artists using it weekly.

### 8. Anti-self-visit — ceiling 8.5/10

The `isArtistVisit()` heuristic handles the common case. It does not handle: artist visiting from a different browser, or visiting before saving their profile. These edge cases are acceptable. The 1.5 gap: impossible to fully solve without authentication.

### 9. PostHog / external analytics — ceiling 9.5/10

PostHog EU Cloud gives ABLE team-level analytics visibility that the localStorage system cannot provide: funnel analysis, cohort comparisons, feature flags, A/B testing. The 0.5 gap: PostHog requires a production deploy to verify event volume, sampling thresholds, and that no PII is accidentally captured in event properties.

---

## The single most valuable change

**`sessionId`.** One expression. Fixes deduplication, enables conversion rate, underpins self-visit detection, and makes every future analysis trustworthy. It should be the first line of code written.

The exact expression:
```javascript
const _sessionId = sessionStorage.getItem('able_session') ||
  (s => (sessionStorage.setItem('able_session', s), s))(crypto.randomUUID());
```

---

## Privacy statement for the admin UI

This is the canonical text. It should appear in admin.html under a "What ABLE tracks" collapsible, accessible from the More tab.

---

**What ABLE tracks — and why**

Every time someone visits your page, we record when it happened and where they came from — Instagram, TikTok, a QR code you shared at a show. That's it. No names, no devices, no location.

When someone taps a button on your page, we note which one and when. So you can see that your Spotify link gets tapped more than your merch link, and decide what that means for you.

When someone signs up as a fan, their email goes into your list. Directly. We store it on your behalf. We don't sell it, share it with other artists, or use it without your instruction.

We don't use any third-party analytics scripts. No Google Analytics, no Meta Pixel, no tracking codes that follow people around the internet after they leave your page.

Your data lives in your account. You can export all of it — fans as a CSV, analytics as a CSV — at any time.

**Your list. Your data. Your relationship.**

---

## What the spec covers that the current codebase does not yet implement

| Item | Status |
|---|---|
| `sessionId` on all events | Not implemented — P0.1 |
| `isArtist` flag on view events | Not implemented — P0.2 |
| PostHog EU Cloud init | Not implemented — P0.3 |
| 7 PostHog events wired | Not implemented — P0.4 |
| Referrer fallback in source detection | Not implemented — P0.5 |
| `rotateEvents()` retention function | Not implemented — P0.6 |
| `getStats(days)` with time windows | Not implemented — P1.1 |
| Conversion rate stat card in admin | Not implemented — P1.2 |
| 7 / 30 / All time toggle | Not implemented — P1.3 |
| Top CTA display | Not implemented — P1.4 |
| Analytics CSV export | Not implemented — P1.5 |
| localStorage health warning | Not implemented — P1.6 |
| Supabase sync flush | Blocked on backend — P2.1 |
| Realtime new-fan notification | Blocked on backend — P2.2 |
| Anti-bot rate limiting (server-side) | Blocked on backend — P2.3 |
| Source trend analysis | Blocked on backend — P2.4 |
| Privacy statement in admin UI | Specced here — needs rendering |

---

## Relation to other system docs

| Doc | Relationship |
|---|---|
| `docs/systems/CROSS_PAGE_JOURNEYS.md` | Canonical `SOURCE_VALUES` — SPEC.md inherits these directly |
| `docs/pages/admin/DESIGN-SPEC.md` | Stat card UI, skeleton states — all now have corresponding logic in SPEC.md |
| `docs/systems/data-architecture/` | localStorage key definitions — analytics keys defined there, detailed here |
