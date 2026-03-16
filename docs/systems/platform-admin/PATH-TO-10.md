# ABLE Platform Admin — Path to 10
**Updated: 2026-03-16 | Status: ACTIVE**

> The SQL queries are written. Nothing has been run. The 35-minute P0 plan is below — exact operations in exact order. After that: n8n weekly digest spec. After that: full build triggers.

---

## Current score: 0/10 (queries ready, nothing executed)

The 12 SQL queries in SPEC.md are complete and correct. The `admin_actions` log table is designed. The Netlify functions are specced. None of this is operational because none of it has been run against the real Supabase database yet.

---

## The 35-minute P0 plan: zero to operational before first artist

This is the exact sequence of 5 SQL operations that takes platform admin from 0 to functional. Run these in the Supabase SQL Editor. In this order. Before the first artist signs up.

### Operation 1: Add missing schema columns (5 minutes)

Paste and run each statement separately. Confirm "Success" on each.

```sql
-- Add status column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active';
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
COMMENT ON COLUMN profiles.status IS 'active | suspended | deleted — admin-controlled';
```

```sql
-- Create admin actions audit log
CREATE TABLE IF NOT EXISTS admin_actions (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  target_type  TEXT NOT NULL,
  target_id    TEXT NOT NULL,
  action       TEXT NOT NULL,
  value        TEXT,
  reason       TEXT,
  performed_at INTEGER NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::INTEGER
);

CREATE INDEX IF NOT EXISTS idx_admin_actions_target ON admin_actions(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_admin_actions_performed_at ON admin_actions(performed_at);
```

Confirm: both statements return Success. If `status` column already exists, the `IF NOT EXISTS` prevents an error.

---

### Operation 2: Run the platform summary query (3 minutes)

Paste this query and run it. This is the first real look at platform state.

```sql
SELECT
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist')                                    AS total_artists,
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'free')                  AS free_artists,
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'artist')                AS artist_tier,
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'pro')                   AS pro_tier,
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'label')                 AS label_tier,
  (SELECT COUNT(*) FROM fans)                                                                       AS total_fans,
  (SELECT COUNT(*) FROM fans WHERE double_opted_in = 1)                                            AS confirmed_fans,
  (SELECT COUNT(*) FROM views)                                                                      AS total_views,
  (SELECT COUNT(*) FROM clicks)                                                                     AS total_clicks;
```

**Save this query** — click the Save button in the Supabase SQL Editor. Name it exactly: `admin: platform summary`. This becomes the Monday morning check.

---

### Operation 3: Test the GDPR deletion path (15 minutes)

This is the most important operation. Do not skip it. Do not defer it.

**Step 3a: Create a test fan record**

```sql
-- Create a disposable test fan record
INSERT INTO fans (id, profile_id, email, source, double_opted_in, created_at, ts)
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM profiles WHERE profile_type = 'artist' LIMIT 1),
  'gdpr-test-delete@able-internal.co',
  'direct',
  0,
  EXTRACT(EPOCH FROM NOW())::INTEGER,
  EXTRACT(EPOCH FROM NOW())::INTEGER
);
```

If no artist profile exists yet, skip to Step 3b with a known test email from your existing data.

**Step 3b: Find all records for the test email**

```sql
-- GDPR: find fan by email — run this BEFORE any deletion
SELECT
  f.id AS fan_id,
  f.email,
  f.source,
  f.double_opted_in,
  f.created_at,
  p.handle AS artist_handle,
  p.name   AS artist_name
FROM fans f
JOIN profiles p ON f.profile_id = p.id
WHERE f.email = 'gdpr-test-delete@able-internal.co';
```

Save this query as: `admin: gdpr — find fan records`

Expected result: 1 row for the test fan. Confirm you can see it.

**Step 3c: Delete the test fan**

```sql
-- GDPR: delete fan — fan_actions cascade automatically via ON DELETE CASCADE
-- Run Step 3b first to confirm you have the right record

DELETE FROM fans
WHERE email = 'gdpr-test-delete@able-internal.co';

-- Verify deletion:
SELECT COUNT(*) AS remaining FROM fans WHERE email = 'gdpr-test-delete@able-internal.co';
-- Must return 0
```

Save the DELETE + verify pair as: `admin: gdpr — delete fan`

**Step 3d: Verify cascade worked**

```sql
SELECT COUNT(*) FROM fan_actions
WHERE fan_id NOT IN (SELECT id FROM fans);
-- Should return 0 — all orphaned fan_actions cleaned up
```

If this returns > 0, the `ON DELETE CASCADE` is not working as expected. Check the schema FK definition. Do not proceed to launch without this returning 0.

**Step 3e: Test purchase anonymisation (if support_purchases table exists)**

```sql
-- Anonymise financial records for deleted fan (do not delete — retain for Stripe reconciliation)
-- Only run this if the fan email exists in support_purchases
SELECT COUNT(*) FROM support_purchases WHERE fan_email = 'gdpr-test-delete@able-internal.co';
-- If > 0, run:
UPDATE support_purchases
SET fan_email = 'gdpr-deleted-' || id
WHERE fan_email = 'gdpr-test-delete@able-internal.co';
```

Save as: `admin: gdpr — anonymise purchases`

**Completion check:** You should now have run a GDPR deletion end-to-end against real Supabase infrastructure and confirmed it works. This is the non-negotiable before launch.

---

### Operation 4: Test tier override (5 minutes)

```sql
-- Override: set tier for an artist
-- Replace 'artisthandle' with a real handle from your profiles table

-- Step 1: Find the artist
SELECT id, handle, name, email, tier
FROM profiles
WHERE handle = 'artisthandle';

-- Step 2: Override tier
UPDATE profiles
SET
  tier = 'pro',
  updated_at = EXTRACT(EPOCH FROM NOW())::INTEGER
WHERE handle = 'artisthandle';

-- Step 3: Confirm
SELECT handle, name, tier FROM profiles WHERE handle = 'artisthandle';
-- Must show tier = 'pro'

-- Step 4: Reset to original
UPDATE profiles
SET
  tier = 'free',
  updated_at = EXTRACT(EPOCH FROM NOW())::INTEGER
WHERE handle = 'artisthandle';
```

Save the override query (Steps 2–3) as: `admin: override tier`

---

### Operation 5: Save all 12 queries as named queries (7 minutes)

Open SPEC.md. For each of the 12 query blocks, paste into the SQL Editor and save with the corresponding name:

| Query name | Section in SPEC.md |
|---|---|
| `admin: platform summary` | §9 "Platform summary" |
| `admin: all artists` | §1 "All artists, newest first" |
| `admin: artists by tier` | §1 "Artists filtered by tier" |
| `admin: find artist by email` | §2 "Find by email" |
| `admin: find artist by handle` | §2 "Find by handle" |
| `admin: fan count per artist` | §3 "Fan count per artist" |
| `admin: gdpr — find fan records` | §4 "Find all records for a fan email" |
| `admin: gdpr — delete fan` | §5 "Delete fan + cascade" |
| `admin: gdpr — anonymise purchases` | §5 "Anonymise support_purchases" |
| `admin: suspend artist` | §6 "Suspend an artist" |
| `admin: override tier` | §8 "Override an artist's tier" |
| `admin: full artist data` | §12 "Everything about one artist" |

After this step, every critical admin operation is a named query — open Supabase, find the query by name, fill in the placeholder, run.

---

**Score after 35-minute P0: 0/10 → 8/10**

8/10 at this stage is honest. The SQL library is a complete operational capability for the first 50 artists. The missing 2 points are the UI layer (P1 HTML admin) and the automated alerting (n8n digest).

---

## The three critical SQL queries (copy-paste ready)

### 1. Fan deletion (GDPR) — complete flow

Replace `'fan@example.com'` with the actual email address. Run each statement sequentially.

```sql
-- GDPR FAN DELETION — run in sequence
-- Step 1: Review all records before deletion
SELECT
  f.id         AS fan_id,
  f.email,
  f.source,
  f.double_opted_in,
  f.created_at,
  p.handle     AS artist_handle
FROM fans f
JOIN profiles p ON f.profile_id = p.id
WHERE f.email = 'fan@example.com';

-- Step 2: Delete (cascade to fan_actions via FK)
DELETE FROM fans
WHERE email = 'fan@example.com';

-- Step 3: Verify deletion
SELECT COUNT(*) AS remaining FROM fans WHERE email = 'fan@example.com';
-- Must return 0

-- Step 4: Anonymise any financial records
UPDATE support_purchases
SET fan_email = 'gdpr-deleted-' || id
WHERE fan_email = 'fan@example.com';

-- Step 5: Log the action
INSERT INTO admin_actions (id, target_type, target_id, action, value, reason, performed_at)
VALUES (
  gen_random_uuid()::text,
  'fan',
  'fan@example.com',
  'gdpr_delete',
  NULL,
  'GDPR deletion request received [date] — all records deleted and purchases anonymised',
  EXTRACT(EPOCH FROM NOW())::INTEGER
);
```

---

### 2. Artist suspension — with reason logging

Replace `'artisthandle'` and `'[reason]'`. Run sequentially.

```sql
-- ARTIST SUSPENSION
-- Step 1: Confirm the artist
SELECT id, handle, name, email, tier, status
FROM profiles
WHERE handle = 'artisthandle';

-- Step 2: Suspend (set status + tier)
UPDATE profiles
SET
  status     = 'suspended',
  tier       = 'suspended',
  updated_at = EXTRACT(EPOCH FROM NOW())::INTEGER
WHERE handle = 'artisthandle';

-- Step 3: Confirm
SELECT handle, name, status, tier FROM profiles WHERE handle = 'artisthandle';

-- Step 4: Log the action (replace [artist_id] with the UUID from Step 1)
INSERT INTO admin_actions (id, target_type, target_id, action, value, reason, performed_at)
VALUES (
  gen_random_uuid()::text,
  'profile',
  '[artist_id]',
  'set_status',
  'suspended',
  '[reason for suspension]',
  EXTRACT(EPOCH FROM NOW())::INTEGER
);
```

To unsuspend, replace Step 2 with:
```sql
UPDATE profiles
SET
  status     = 'active',
  tier       = 'free',   -- or 'artist' | 'pro' if they were paid — check admin_actions history
  updated_at = EXTRACT(EPOCH FROM NOW())::INTEGER
WHERE handle = 'artisthandle';
```

---

### 3. Tier override — manual upgrade, beta access, correction

Replace `'artisthandle'` and the target tier. Valid values: `'free'` | `'artist'` | `'pro'` | `'label'`.

```sql
-- TIER OVERRIDE
-- Step 1: Confirm current tier
SELECT id, handle, name, email, tier, status
FROM profiles
WHERE handle = 'artisthandle';

-- Step 2: Override
UPDATE profiles
SET
  tier       = 'pro',   -- replace with target tier
  updated_at = EXTRACT(EPOCH FROM NOW())::INTEGER
WHERE handle = 'artisthandle'
  AND status = 'active'; -- safety guard: do not override suspended accounts unintentionally

-- Step 3: Confirm
SELECT handle, name, tier FROM profiles WHERE handle = 'artisthandle';

-- Step 4: Log
INSERT INTO admin_actions (id, target_type, target_id, action, value, reason, performed_at)
VALUES (
  gen_random_uuid()::text,
  'profile',
  '[artist_id]',
  'set_tier',
  'pro',
  '[reason: beta access / manual upgrade / billing correction]',
  EXTRACT(EPOCH FROM NOW())::INTEGER
);
```

---

## n8n weekly digest workflow spec

Build this when n8n is set up (Phase 2, after Supabase is live). Triggers every Monday at 09:00.

### Workflow: Monday Weekly Digest

**Trigger:** Schedule — every Monday at 09:00

**Node 1: Supabase — new artists this week**
```sql
SELECT COUNT(*) AS new_artists
FROM profiles
WHERE profile_type = 'artist'
  AND created_at > EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days')::INTEGER;
```

**Node 2: Supabase — new fans this week**
```sql
SELECT COUNT(*) AS new_fans
FROM fans
WHERE created_at > EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days')::INTEGER;
```

**Node 3: Supabase — total MRR (from subscriptions table)**
```sql
SELECT
  COALESCE(SUM(amount_pence), 0) / 100.0 AS mrr
FROM subscriptions
WHERE status = 'active';
```

**Node 4: Stripe — failed payments this week**

HTTP Request node: GET `https://api.stripe.com/v1/invoices?status=open&created[gte]=[7_days_ago_unix]`
Authorization: `Bearer {{ $env.STRIPE_SECRET_KEY }}`

Count the invoices in the response.

**Node 5: Supabase — platform totals**
```sql
SELECT
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist') AS total_artists,
  (SELECT COUNT(*) FROM fans) AS total_fans;
```

**Node 6: Telegram — send digest**

Message template:
```
Morning. Week of {{ $('Schedule').item.json.date }}.

New artists: {{ $('Node1').item.json.new_artists }}
New fans: {{ $('Node2').item.json.new_fans }}
MRR: £{{ $('Node3').item.json.mrr }}
Failed payments: {{ $('Node4').item.json.count }}

Total artists: {{ $('Node5').item.json.total_artists }}
Total fans: {{ $('Node5').item.json.total_fans }}
```

**Condition:** Only send if `new_artists > 0 OR new_fans > 0 OR failed_payments > 0`. Silent Monday if nothing happened.

---

## Score projections

| Phase | Trigger | Score | Key capability |
|---|---|---|---|
| Today | Nothing run | 0/10 | — |
| After 35-min P0 | Before first artist signs up | 8/10 | GDPR-ready, tier control, platform visibility |
| After n8n weekly digest | Supabase live + 50+ artists | 9.5/10 | Automated monitoring, no manual checks needed |
| After P1 HTML admin | 10 paying artists | 8/10 → 9/10 (UI layer) | Full admin UI, GDPR delete button, audit log |
| Full P2 | 100+ artists | 10/10 | Billing view, moderation queue, impersonation |

---

## The one non-negotiable

Test the GDPR deletion path (Operation 3 in the 35-minute plan) before any real user data enters the system.

Not read the queries. Not plan to run them. Actually run them against a real database record and confirm the cascade works.

If a GDPR deletion request arrives and that test has not been done, James is guessing. Under GDPR, guessing is not acceptable. 15 minutes of testing now eliminates that risk permanently.
