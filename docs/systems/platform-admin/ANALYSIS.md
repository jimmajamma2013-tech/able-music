# ABLE Platform Admin — Current State Analysis (Updated)
**Updated: 2026-03-16 | Status: ACTIVE**

> The SQL query library is written and ready. Nothing has been run yet. The admin panel does not exist as a proper interface. This document audits what James can actually do today, what he needs before the first artist signs up, and what he needs before the first 50 artists.

---

## What James can actually do today

**Today's answer: everything requires direct Supabase dashboard navigation.**

To do any administrative task right now, James opens `https://app.supabase.com`, finds the ABLE project, and either:
- Browses the Table Editor (row-by-row, no aggregate views)
- Types raw SQL into the SQL Editor (from memory or from SPEC.md)

The 12 SQL queries in SPEC.md are ready. None of them have been saved as named queries in the Supabase SQL editor. None have been tested against the real database. The queries are documentation. They are not operational tooling yet.

**Specific capability assessment today:**

| Task | Can James do it today? | How? |
|---|---|---|
| See all artists and their tiers | Yes | Table Editor → profiles table → filter profile_type = 'artist' |
| Find a specific artist by email | Yes | Table Editor → search, or raw SQL |
| Delete a fan (GDPR) | Technically yes | Must manually find records across fans, fan_actions, support_purchases — no query saved to guide this |
| Suspend an artist | Yes | Table Editor → find row → edit tier column |
| Override tier | Yes | Table Editor → find row → edit tier column |
| See platform stats (total artists, fans) | No | Would require running COUNT queries manually |
| See signups by day | No | Would require a GROUP BY query from memory |
| See which artists have the most fans | No | Would require a JOIN query from memory |

The honest summary: basic lookups work. Anything that requires a query (stats, GDPR across tables, joined data) is error-prone without the query library saved and ready.

---

## What the SQL library gives James (when activated)

Once the 12 queries are saved in the Supabase SQL editor as named queries, James gains:

**Immediate operational capability:**
- Platform summary in one query: total artists by tier, total fans, total views, total clicks
- Artist list with fan count: sorted by fans, tier, or signup date
- Artist lookup by email, handle, or partial name
- Full artist data dump for support: all stats in one query, one artist
- GDPR fan deletion: find all records first, delete with confirmed query, verify deletion
- Tier override: update with timestamp, confirm result
- Artist suspension: set tier to 'suspended', confirm
- Fan count per artist: sorted descending

**What it does not give:**
- Any UI. Still requires Supabase dashboard login.
- Any Stripe visibility. Revenue requires opening Stripe separately.
- Any alerting. Platform errors, failed payments, and unusual patterns are invisible.
- Content moderation. No flagging mechanism, no moderation queue.
- Operational visibility. Netlify logs require Netlify login; they do not surface in Supabase.

---

## What James needs before the first artist signs up

Three things. That is all. They take 35 minutes total.

### Action 1: Save the 12 SQL queries in Supabase (20 minutes)

Go to the Supabase SQL Editor. For each of the 12 queries in SPEC.md, paste the query and save it with a consistent naming convention:

```
admin: platform summary
admin: all artists (newest first)
admin: all artists (by tier)
admin: find artist by email
admin: find artist by handle
admin: fan count per artist
admin: gdpr — find fan records
admin: gdpr — delete fan
admin: suspend artist
admin: override tier
admin: top artists by fans
admin: full artist data (support)
```

After saving, run each one with a test value to confirm it executes without error. Fix any schema mismatches — the queries assume `profile_type`, `double_opted_in`, `status` columns exist. If they do not, add them before first artist sign-up.

This is the "35 minutes of P0" plan — see PATH-TO-10.md for exact sequence.

### Action 2: Add `status` column to profiles table (5 minutes)

```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active';
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
-- Valid values: 'active' | 'suspended' | 'deleted'
```

The existing SPEC.md queries use `tier = 'suspended'` as a workaround. The `status` column is cleaner — `tier` should describe what a user has paid for, not whether they are suspended. Adding this column now avoids a schema migration later.

### Action 3: Create `admin_actions` table (5 minutes)

```sql
CREATE TABLE IF NOT EXISTS admin_actions (
  id           TEXT PRIMARY KEY,
  target_type  TEXT NOT NULL,
  target_id    TEXT NOT NULL,
  action       TEXT NOT NULL,
  value        TEXT,
  reason       TEXT,
  performed_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_actions_target ON admin_actions(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_admin_actions_performed_at ON admin_actions(performed_at);
```

Every suspension, deletion, and tier override should be logged here with a reason. This is the audit trail. If a GDPR request comes in, the audit trail proves the action was taken.

**After these three actions: James can manage the platform competently for the first 50 artists.**

---

## What James needs before the first 50 artists

### A tested GDPR deletion path

Before any real artist signs up, the GDPR deletion query must have been run against a real database record (a test fan) and confirmed to work. Not read. Executed.

The exact test:
1. Create a test fan record in the fans table (insert directly via Table Editor or SQL)
2. Run `admin: gdpr — find fan records` with the test email — confirm all records show
3. Run `admin: gdpr — delete fan` with the test email
4. Run `admin: gdpr — find fan records` again — confirm 0 results
5. Check fan_actions table — confirm cascade deletion worked
6. Check support_purchases — confirm anonymisation query works if test purchase exists

This takes 15 minutes and means James can respond to a GDPR request with confidence, not with scramble.

### A working tier override (tested)

Same principle. Run a test:
1. Find a test profile
2. Run the tier override query: set to 'pro'
3. Confirm the profile shows 'pro' in the profiles table
4. Reset to 'free'
5. Confirm

If this test fails (schema mismatch, wrong column name), fix it before first artist signs up — not after.

### Stripe webhook handler (separate from SQL library)

The most dangerous silent failure at launch is a paid subscription's card expiring without ABLE knowing. The Stripe webhook handler that listens for `customer.subscription.deleted` and `invoice.payment_failed` events and updates the artist's tier accordingly must be live before the first paid subscription. This is separate from the admin SQL library — it is backend infrastructure, not admin tooling.

---

## What James needs before the first 50 artists

Beyond the basics above, the P1 threshold is:

### Usage dashboard

At 20–30 artists, the platform summary query runs daily becomes a meaningful check. At 50 artists, running SQL queries individually for basic questions feels slow. This is the trigger for building `platform-admin.html` — when SQL queries feel repetitive for the volume of tasks needed.

### Churn alerts

When the first paid subscriptions exist, a weekly check for `status = 'past_due'` subscriptions is essential. The n8n weekly digest (specced in PATH-TO-10.md) handles this automatically. Before n8n is live, a Monday Supabase query: find any profiles where `tier != 'free'` but the Stripe subscription status is not 'active'.

### Broadcast capability

At 30+ artists, the ability to send a message to all artists ("we deployed a new feature", "maintenance window tonight") is needed. This is either a Buttondown/Mailchimp-style email blast to all artist email addresses (extractable from Supabase with one query) or a Netlify function that emails all artists programmatically. Either way, the artist email list query is:

```sql
SELECT name, email FROM profiles
WHERE profile_type = 'artist' AND status = 'active'
ORDER BY created_at ASC;
```

This is operational from day one.

---

## Score: current vs target

| Dimension | Today (nothing run) | After 35-min P0 | After P1 HTML admin |
|---|---|---|---|
| Artist management | 1/10 | 6/10 | 9/10 |
| Fan management | 1/10 | 6/10 | 8/10 |
| Platform analytics | 0/10 | 5/10 | 7/10 |
| GDPR compliance | 0/10 | 7/10 | 9/10 |
| Billing visibility | 0/10 | 1/10 | 3/10 |
| Operational visibility | 0/10 | 2/10 | 4/10 |
| **Overall** | **0/10** | **6/10** | **8/10** |

The jump from 0 to 6 is entirely in the hands of James running SQL queries for 35 minutes. No code to write. No files to create. Just open Supabase, paste queries, save them, test them.

The jump from 6 to 8 requires building `platform-admin.html` — a one-day build triggered at 10 paying artists.
