# Platform Admin — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when James can resolve any artist's issue, answer any operational question, and take any required action in under 5 minutes — from anywhere in the world on a mobile browser.

---

## Moment 1: The Monday Morning Digest

**What it is:** Every Monday at 09:00, a Telegram message arrives summarising the past week — new artists, MRR movement, top fan capture, any at-risk artists — in under 100 words.

**Why it's 20/10:** The Telegram digest is not a dashboard. It is a briefing. The difference is that a dashboard requires active attention — you have to go to it, interpret it, and extract the signal. A briefing arrives, delivers the signal, and asks nothing more. When the digest lands at 09:00 Monday, James knows the platform state before opening a laptop. He knows if something needs attention. He knows if it was a good week. The entire Monday morning orientation takes 30 seconds. The operational clarity this creates compounds over 52 weeks.

**Exact implementation:**

n8n workflow trigger: `Schedule — Every Monday 09:00 UK time`

n8n HTTP Request nodes:
1. `GET /.netlify/functions/admin-stats` → platform summary JSON
2. Stripe API `GET /v1/subscriptions?limit=100&created[gte]=[last_monday_ts]` → new paying artists
3. Supabase query via HTTP: top artist by fan captures in last 7 days

n8n message composition node — exact Telegram format:

```
ABLE — Week of [DD Month]

Artists:    [N] total · [N] paying (+[N] this week)
MRR:        £[X] ([+/-X%] from last week)
Fans:       [N] new this week · [N] total

Top capture: [artist name] — [N] fans this week
At risk:    [N] artists with no views in 14d

[One line if anything needs action: "Luna hasn't logged in for 16 days — worth a message."]
```

If there are no at-risk artists: the "At risk" line is omitted. If MRR is unchanged: "[same as last week]". The message stays under 100 words. It is a status, not a report.

The n8n workflow also checks: if any artist has been on the free tier for 30+ days with 80+ fans (upgrade trigger threshold), add a line: "Upgrade opportunity: [handle] — [N] fans, still on free."

---

## Moment 2: The Artist Issue Resolved in Under 5 Minutes

**What it is:** An artist messages to say their page isn't showing the right state, or a fan can't be deleted, or they've hit the 100-fan cap and want to know their options. James has the SQL query, the admin function call, or the tier override ready in under 5 minutes.

**Why it's 20/10:** Most platform ops problems require either a developer (slow) or a complex admin UI (expensive to build). The ABLE platform admin approach — a documented SQL library for V1, a clean admin UI for V2 — means every operational scenario has a prepared, tested response. When an artist contacts ABLE with a problem, the experience is: the problem is resolved before they've refreshed their inbox. That speed — compared to a support ticket that takes 48 hours — is the operational equivalent of a premium product.

**Exact implementation:**

The V1 SQL query library from `SPEC.md` must be kept in a bookmark-accessible location — either the Supabase SQL editor saved query list or a private `ops.md` file that opens in under 10 seconds on mobile.

The 5-minute resolution protocol for the five most common artist issues:

**Issue: "My page is stuck in the wrong state"**
```sql
-- Check current state
SELECT handle, name, page_state, updated_at FROM profiles WHERE handle = 'artisthandle';
-- Update if needed (WRITE)
UPDATE profiles SET page_state = 'profile', updated_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE handle = 'artisthandle';
```
Time: 90 seconds.

**Issue: "A fan's email is wrong — can you remove it?"**
Use the GDPR delete query from SQL library §5. Confirm with artist before running.
Time: 2 minutes including confirmation exchange.

**Issue: "I've hit my 100-fan limit and I want to upgrade"**
```
1. Send Stripe upgrade link directly: stripe.com/pay/[artist's customer portal link]
2. Once upgraded, no manual action needed — Stripe webhook updates tier in Supabase
```
Time: 1 minute.

**Issue: "Can you give me a free month while I figure this out?"**
```sql
-- Override tier to 'artist' temporarily (WRITE — note reason)
UPDATE profiles SET tier = 'artist', updated_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE handle = 'artisthandle';
-- Log it in admin_actions
INSERT INTO admin_actions VALUES (gen_random_uuid(), 'profile', '[profile_id]',
  'tier_override', 'artist', 'Goodwill — artist reported onboarding issue, 1 month free', NOW());
```
Time: 3 minutes.

---

## Moment 3: The SQL Query That Answers Any Question in 3 Seconds

**What it is:** The SQL query library in `SPEC.md` is complete enough that any operational question — "which artists haven't logged in this week", "what is the average fan capture rate per active artist this month", "which artists have shows coming up in the next 7 days" — can be answered by pasting a pre-written query.

**Why it's 20/10:** Operational intelligence should not depend on a dashboard being built first. The SQL library means the intelligence exists from day one, without a UI. When an investor asks "how many of your active artists have more than 50 fans?", the answer is available in 30 seconds. When James wants to know which artists to personally reach out to this week, the query is already written. The library is the admin intelligence layer before the admin UI exists.

**Exact implementation:**

Three additional queries to add to the SQL library in `SPEC.md`, covering the most operationally useful cases not already covered:

```sql
-- Artists with 80+ fans still on free tier (upgrade opportunity)
SELECT handle, name, email, tier,
  (SELECT COUNT(*) FROM fans WHERE profile_id = p.id) AS fan_count
FROM profiles p
WHERE profile_type = 'artist' AND tier = 'free'
  AND (SELECT COUNT(*) FROM fans WHERE profile_id = p.id) >= 80
ORDER BY fan_count DESC;
```

```sql
-- Artists with no page view in last 14 days (at-risk of churn)
SELECT p.handle, p.name, p.email, p.tier,
  MAX(v.ts) AS last_view_ts,
  TO_TIMESTAMP(MAX(v.ts)) AS last_view_date,
  (SELECT COUNT(*) FROM fans WHERE profile_id = p.id) AS fan_count
FROM profiles p
LEFT JOIN views v ON v.profile_id = p.id
WHERE p.profile_type = 'artist'
GROUP BY p.id, p.handle, p.name, p.email, p.tier
HAVING MAX(v.ts) < EXTRACT(EPOCH FROM NOW() - INTERVAL '14 days')::BIGINT
   OR MAX(v.ts) IS NULL
ORDER BY last_view_ts ASC NULLS FIRST;
```

```sql
-- Fan capture rate per artist (views vs sign-ups, last 30 days)
SELECT
  p.handle,
  p.name,
  p.tier,
  COUNT(DISTINCT v.id) AS views_30d,
  COUNT(DISTINCT f.id) AS fans_30d,
  ROUND(
    CASE WHEN COUNT(DISTINCT v.id) > 0
    THEN COUNT(DISTINCT f.id)::NUMERIC / COUNT(DISTINCT v.id) * 100
    ELSE 0 END, 1
  ) AS capture_rate_pct
FROM profiles p
LEFT JOIN views v ON v.profile_id = p.id
  AND v.ts > EXTRACT(EPOCH FROM NOW() - INTERVAL '30 days')::BIGINT
LEFT JOIN fans f ON f.profile_id = p.id
  AND f.created_at > EXTRACT(EPOCH FROM NOW() - INTERVAL '30 days')::BIGINT
WHERE p.profile_type = 'artist'
GROUP BY p.id, p.handle, p.name, p.tier
ORDER BY capture_rate_pct DESC;
```

---

## The 20/10 test

Monday digest arrives at 09:00. James reads it in 45 seconds. One artist is flagged as at-risk. He sends them a message from his phone. Problem identified, personal contact made, resolved — before opening the laptop.

---

*See also: `docs/systems/platform-admin/SPEC.md` — V1 SQL library, Netlify functions, and V2 platform admin page spec*
