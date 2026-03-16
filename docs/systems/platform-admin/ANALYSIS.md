# ABLE Platform Admin — Current State Analysis
**Created: 2026-03-16 | Status: ACTIVE**

---

## What this document is

This is an honest assessment of James's ability to manage the ABLE platform right now. Not `admin.html` — that is the artist's dashboard for their own page. This is the founder-level ability to see and control the entire platform: every artist, every fan, billing, moderation, compliance.

---

## What exists today

Nothing. Zero.

James currently has no purpose-built tool to manage the ABLE platform. The only way to do anything administrative today is to log into the Supabase dashboard at `https://app.supabase.com` and interact with tables directly. That means:

- To view all artists: browse the `profiles` table in the Supabase table editor
- To suspend an artist: find their row and manually edit the `tier` column
- To delete an artist: manually cascade-delete across 10+ tables or run raw SQL
- To find a fan for a GDPR request: search the `fans` table by email
- To view platform growth: count rows in Supabase and do maths manually
- To check billing: open Stripe separately, cross-reference against Supabase by email
- To check for errors: log into Netlify and read function logs

This is workable at zero artists. It breaks down fast. At 50 artists it becomes painful. At 200 it becomes a liability — legally, operationally, and practically.

---

## Dimension scores (today)

### 1. Artist management — 0/10
No way to view all artists in a single view. No search by name, email, or handle. No suspend/unsuspend action. No delete action (would require manually cascading across profiles, fans, clicks, views, releases, events, merch_items, support_packs, snap_cards, broadcasts). No tier override without direct SQL. No last-active visibility.

### 2. Fan management — 0/10
No cross-platform fan view. Each artist's fans are scoped to that artist in the Supabase table editor. Finding a specific fan by email requires knowing which artist they signed up under, or running a raw SQL query. GDPR deletion requires identifying all records across fans, fan_actions, support_purchases — no tooling exists to do this.

### 3. Platform analytics — 0/10
No total artist count. No tier distribution. No daily/weekly/monthly signups. No churn data. No fan count across all artists. No view/click totals. All of this data exists in Supabase — there is simply no surface to view it.

### 4. Billing management — 0/10
Stripe is a separate system. Supabase stores `stripe_customer_id` and `stripe_subscription_id` on the profiles table, but there is no view that shows subscription status, failed payments, or revenue. Knowing who is paying, at what tier, and whether their payment is current requires cross-referencing Stripe and Supabase manually by email.

### 5. Content moderation — 0/10
No flagging mechanism. No moderation queue. No way to see recently added snap cards, artist bios, or profile artwork across the platform. If an artist uploads something inappropriate, there is no system to catch it. Discovery would require a user report or manual periodic table scans.

### 6. Feature flags — 0/10
No feature flag system exists. There is no `feature_flags` table, no environment-level config, and no per-artist beta access mechanism. Rolling out a new feature to a subset of artists means either modifying code or manually updating tier values.

### 7. Impersonation / "view as artist" — 0/10
No way to log in as a specific artist to debug their experience. Diagnosing artist-reported issues requires asking the artist to describe what they see, or building a separate test account.

### 8. Support ticket management — 0/10
No support system. No ticket queue. No contact form that routes to a tracked inbox. An artist who emails support gets a reply from an email client — nothing logged, nothing tracked, no history.

### 9. Operational visibility — 0/10
No error monitoring. Netlify function logs exist but require logging into Netlify to read, are not searchable, and expire. No alerting on failed payments, failed fan-capture emails, or failed Spotify imports. No uptime monitoring.

### 10. Legal compliance tooling — 0/10
GDPR data export and deletion are specified in `BACKEND_SCHEMA.md` as API endpoints (`GET /api/fan/export`, `DELETE /api/fan/:fanId`), but they are not built. A GDPR deletion request today requires manually running SQL across multiple tables. A data portability request (SAR) cannot be fulfilled without writing custom queries.

---

## Baseline score: 0/10

This is not a criticism — it is the expected state at day zero of a pre-launch product. Every platform starts here. The important thing is to understand exactly what this means operationally, what breaks first, and when to build what.

---

## The real operational risk at zero

The risk is not "James can't see a pretty dashboard." The risk is:

1. **A GDPR deletion request arrives.** An artist or fan asks James to delete all their data. Under GDPR, James has 30 days to comply. Without tooling, this requires finding and deleting records across 10+ tables manually. Miss something and it is a compliance failure.

2. **An artist uses ABLE to post something harmful.** There is no moderation system. Discovery depends on external reports. Time to action depends on James being available.

3. **A subscription payment fails and James doesn't know.** The artist's tier doesn't downgrade automatically. They continue using Pro features on a lapsed payment.

4. **An artist reports a bug.** James cannot reproduce it because he cannot see their data without navigating raw Supabase tables.

5. **James needs to check how the platform is growing.** There is no number to look at.

The SQL query library described in `SPEC.md` resolves items 1, 3, 4, and 5 at minimal cost. Content moderation and alerting require more build — but they are P2, not P0.

---

*This analysis should be re-scored after each build phase. Target: 7/10 after V1 SQL library, 8/10 after P1 HTML admin, 10/10 after P2 full build.*
