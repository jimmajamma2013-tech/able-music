# ABLE Analytics — Final Review
**Created: 2026-03-15 | Target ceiling: 9.5/10 (spec-complete) | True 10: requires live Supabase + real traffic + GDPR audit**

---

## Final scores per dimension

| # | Dimension | Current | After P0 | After P1 | After P2 | Ceiling |
|---|---|---|---|---|---|---|
| 1 | Event schema completeness | 5.0 | 7.5 | 8.0 | 9.0 | 9.5 |
| 2 | Source attribution accuracy | 6.0 | 8.0 | 8.0 | 8.5 | 9.0 |
| 3 | Aggregation logic | 4.0 | 4.0 | 8.5 | 9.0 | 9.5 |
| 4 | Retention policy | 3.0 | 7.0 | 7.5 | 9.5 | 9.5 |
| 5 | Privacy stance | 8.0 | 8.0 | 8.5 | 9.0 | 9.5 |
| 6 | Export capability | 5.0 | 5.0 | 8.0 | 8.5 | 9.0 |
| 7 | Dashboard reporting quality | 5.0 | 5.0 | 8.5 | 9.5 | 9.5 |
| 8 | Anti-self-visit | 2.0 | 7.5 | 7.5 | 8.0 | 8.5 |
| **Overall** | | **6.2** | **7.6** | **8.6** | **9.3** | **9.5** |

---

## Dimension notes

### 1. Event schema completeness — ceiling 9.5/10
Current `{label, type, ts, source}` captures the core facts. After `sessionId` is added (P0), deduplication and session-level analysis become possible. The remaining 0.5 gap to ceiling is that we never capture anything about the device type (mobile vs desktop), which would be useful for layout decisions, but tracking this introduces complexity that isn't worth it in the short term. This is a deliberate omission.

### 2. Source attribution accuracy — ceiling 9.0/10
The 1.0 gap to ceiling is structural: a portion of Instagram traffic will always arrive without a referrer header (iOS Safari privacy restrictions, link-in-bio tools that strip referrers, WhatsApp shares). No client-side solution fully bridges this. The `?src=ig` convention is the mitigation — good artist tooling (QR codes, pre-built share links) reduces the gap. True 9.0+ requires teaching artists to always use tagged links.

### 3. Aggregation logic — ceiling 9.5/10
After P1, `getStats()` provides 7/30/all-time windows, conversion rate, and top CTA. The 0.5 gap to ceiling is the source trend analysis (week-over-week comparison), which requires Supabase data to be meaningful beyond 7-day windows.

### 4. Retention policy — ceiling 9.5/10
After P2, events are flushed to Supabase and localStorage acts as a 7-day cache. The rotation policy (90 days views, 180 days clicks, fans never deleted) is intentional. The 0.5 gap to ceiling reflects that the Supabase flush has never been battle-tested at scale.

### 5. Privacy stance — ceiling 9.5/10
The fundamentals are strong and were correct from the start. The ceiling gap reflects two things: (1) GDPR fan deletion flow not yet built — fans cannot formally request removal; (2) the privacy statement in the admin UI exists in the spec but isn't rendered yet. Both are solvable and neither represents a genuine privacy failure.

### 6. Export capability — ceiling 9.0/10
Fan CSV export is specced and partially built. Analytics CSV is fully specced in SPEC.md §2.7 and ready to implement. The 1.0 gap to ceiling is the combined export (fans + analytics + shows in one download) and date-range filtering on export — both P2-era features.

### 7. Dashboard reporting quality — ceiling 9.5/10
After P1, admin shows conversion rate, time-window toggle, top CTA, and source breakdown with proportional bars. After P2, source trend analysis closes the final gap. The 0.5 ceiling gap reflects that truly excellent reporting requires real artist feedback — ten artists using it weekly, telling us which numbers they actually look at and which they ignore.

### 8. Anti-self-visit — ceiling 8.5/10
The `isArtistVisit()` heuristic handles the common case: artist checks their own page on the same browser where they set up their profile. It does not handle: artist visiting from a different browser, artist visiting before they've saved their profile, or a genuine fan whose email address happens to be in the artist's localStorage. These edge cases are acceptable given the heuristic's simplicity. The 1.5 gap to ceiling reflects the impossibility of perfect isolation without authentication.

---

## Overall assessment

The analytics system goes from a raw events ledger (useful as a data store, not useful as a decision tool) to a genuinely informative artist dashboard in two implementation phases. P0 and P1 together can be built in a single focused session — they require no backend, no new UI components, just careful JavaScript. P2 is blocked on Supabase, which is the right dependency.

**The single most valuable change is `sessionId`.** It fixes deduplication, enables conversion rate, underpins self-visit detection, and makes every future analysis more trustworthy. It should be the first line of code written.

**The second most valuable change is `getStats(7)`.** Seven-day stats with conversion rate is what turns the admin from a vanity counter into a tool an artist genuinely opens to answer "is this working?"

---

## Privacy statement for the admin UI

This is the canonical text. It should appear in admin.html under a "What ABLE tracks" collapsible section, accessible from the More tab or a settings page.

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
| Referrer fallback in source detection | Not implemented — P0.3 |
| `rotateEvents()` retention function | Not implemented — P0.4 |
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
| Fan export button | Specced in admin DESIGN-SPEC, partially implemented |
| Privacy statement in admin UI | Specced here — needs rendering |

---

## Relation to other system docs

| Doc | Relationship |
|---|---|
| `docs/systems/CROSS_PAGE_JOURNEYS.md` | Canonical `SOURCE_VALUES` — SPEC.md inherits these directly |
| `docs/pages/admin/DESIGN-SPEC.md` | Stat card UI, skeleton states, `resolveStats()`, `checkStreak()` — all now have corresponding logic in SPEC.md |
| `docs/pages/admin/SPEC.md` | Fan list, export button, milestone system — analytics events feed these |
| `docs/systems/data-architecture/` | localStorage key definitions — analytics keys (`able_views`, `able_clicks`, `able_fans`) defined there, detailed here |
