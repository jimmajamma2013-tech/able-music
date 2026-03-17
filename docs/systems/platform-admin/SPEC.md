# ABLE Platform Admin — Full Specification
**Created: 2026-03-16 | Status: ACTIVE**

---

## Overview

Two-phase build:

- **V1 — SQL Query Library:** A documented set of pre-written Supabase SQL queries James runs in the Supabase SQL editor. No UI. No build time. Operational control from day one.
- **V2 — `platform-admin.html`:** A purpose-built admin page behind a hard auth gate. Full platform management UI.

V1 is sufficient for the first 50 artists. V2 is built before 100 artists or before the first GDPR request that feels stressful to handle manually — whichever comes first.

---

## V1 — SQL Query Library

### How to use

1. Log into `https://app.supabase.com`
2. Open the ABLE project
3. Go to SQL Editor
4. Paste the relevant query from this library
5. Replace placeholder values (marked `'placeholder'`) with real values
6. Run

All queries below are safe to read-only unless noted with `-- WRITE OPERATION`. Write operations are irreversible where noted.

---

### 1. View all artists

```sql
-- All artists, newest first
SELECT
  id,
  handle,
  name,
  email,
  tier,
  page_state,
  created_at,
  updated_at
FROM profiles
WHERE profile_type = 'artist'
ORDER BY created_at DESC;
```

```sql
-- Artists filtered by tier
SELECT
  id,
  handle,
  name,
  email,
  tier,
  created_at
FROM profiles
WHERE profile_type = 'artist'
  AND tier = 'free'  -- change to 'artist' | 'pro' | 'label' as needed
ORDER BY created_at DESC;
```

```sql
-- Artists sorted by last activity (most recently updated)
SELECT
  id,
  handle,
  name,
  email,
  tier,
  updated_at
FROM profiles
WHERE profile_type = 'artist'
ORDER BY updated_at DESC;
```

---

### 2. Find a specific artist

```sql
-- Find by email
SELECT *
FROM profiles
WHERE email = 'artist@example.com';
```

```sql
-- Find by handle
SELECT *
FROM profiles
WHERE handle = 'luna';
```

```sql
-- Find by partial name match
SELECT id, handle, name, email, tier
FROM profiles
WHERE LOWER(name) LIKE '%luna%';
```

---

### 3. View all fans across all artists

```sql
-- All fans, newest sign-ups first
SELECT
  f.id,
  f.email,
  f.source,
  f.double_opted_in,
  f.created_at,
  p.handle AS artist_handle,
  p.name AS artist_name
FROM fans f
JOIN profiles p ON f.profile_id = p.id
ORDER BY f.created_at DESC;
```

```sql
-- Fan count per artist
SELECT
  p.handle,
  p.name,
  COUNT(f.id) AS fan_count
FROM profiles p
LEFT JOIN fans f ON f.profile_id = p.id
WHERE p.profile_type = 'artist'
GROUP BY p.id, p.handle, p.name
ORDER BY fan_count DESC;
```

---

### 4. GDPR — find a fan by email (across all artists)

```sql
-- Find all records for a fan email
-- Run this first before any deletion — review what you'll delete
SELECT
  f.id AS fan_id,
  f.email,
  f.source,
  f.double_opted_in,
  f.gdpr_ip,
  f.created_at,
  f.ts,
  p.handle AS artist_handle,
  p.name AS artist_name
FROM fans f
JOIN profiles p ON f.profile_id = p.id
WHERE f.email = 'fan@example.com';
```

```sql
-- Also check support_purchases for this fan email
SELECT
  sp.id,
  sp.fan_email,
  sp.amount_paid,
  sp.currency,
  sp.status,
  sp.purchased_at,
  pak.label AS pack_label,
  p.handle AS artist_handle
FROM support_purchases sp
JOIN support_packs pak ON sp.pack_id = pak.id
JOIN profiles p ON pak.profile_id = p.id
WHERE sp.fan_email = 'fan@example.com';
```

---

### 5. GDPR — delete a fan (all records)

**-- WRITE OPERATION — irreversible**

The `fans` table has `ON DELETE CASCADE` to `fan_actions`. Delete the fan row and actions cascade automatically. Run the find query first to confirm you have the right record.

```sql
-- Step 1: Confirm the fan ID
SELECT id, email, profile_id, created_at
FROM fans
WHERE email = 'fan@example.com';

-- Step 2: Delete (replace fan_id with the actual UUID from step 1)
-- fan_actions will cascade-delete automatically via ON DELETE CASCADE
DELETE FROM fans
WHERE email = 'fan@example.com';

-- Step 3: Confirm deletion
SELECT COUNT(*) AS remaining
FROM fans
WHERE email = 'fan@example.com';
-- Should return 0
```

Note: `support_purchases` is NOT cascade-deleted because financial records may need to be retained for Stripe reconciliation and tax purposes. Anonymise instead:

```sql
-- Anonymise purchase records (replace email with hashed placeholder, retain financial data)
UPDATE support_purchases
SET fan_email = 'gdpr-deleted-' || id
WHERE fan_email = 'fan@example.com';
```

---

### 6. Suspend an artist

**-- WRITE OPERATION**

ABLE does not have a `status` column in the current schema. The most practical suspension mechanism at V1 is setting `tier = 'suspended'` — the artist dashboard will show no paid features, and the public profile can be gated by checking tier in the profile render logic.

```sql
-- Suspend an artist
UPDATE profiles
SET
  tier = 'suspended',
  updated_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE handle = 'artisthandle';
-- Replace 'artisthandle' with the actual handle

-- Confirm
SELECT handle, name, tier FROM profiles WHERE handle = 'artisthandle';
```

```sql
-- Unsuspend an artist (restore to their previous tier — you need to know what it was)
UPDATE profiles
SET
  tier = 'free',  -- or 'artist' | 'pro' | 'label' depending on their plan
  updated_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE handle = 'artisthandle';
```

**Note:** Before V2 is built, add a `status` column to profiles when the backend schema is first applied:
```sql
ALTER TABLE profiles ADD COLUMN status TEXT NOT NULL DEFAULT 'active';
-- Valid values: 'active' | 'suspended' | 'deleted'
CREATE INDEX idx_profiles_status ON profiles(status);
```

This is cleaner than overloading `tier`. The query library should be updated to use `status` once the column exists.

---

### 7. Delete an artist and all their data

**-- WRITE OPERATION — irreversible — do not run without confirming the artist has requested deletion**

Because foreign keys are defined with `ON DELETE CASCADE` in the schema, deleting the `profiles` row cascades to: `releases`, `tracks`, `credits`, `events`, `merch_items`, `support_packs`, `fans`, `fan_actions`, `clicks`, `views`, `snap_cards`, `broadcasts`.

```sql
-- Step 1: Confirm you have the right artist
SELECT id, handle, name, email, tier, created_at
FROM profiles
WHERE handle = 'artisthandle';

-- Step 2: Check what will be deleted (do this before deletion)
SELECT
  (SELECT COUNT(*) FROM fans WHERE profile_id = p.id) AS fans,
  (SELECT COUNT(*) FROM clicks WHERE profile_id = p.id) AS clicks,
  (SELECT COUNT(*) FROM views WHERE profile_id = p.id) AS views,
  (SELECT COUNT(*) FROM releases WHERE profile_id = p.id) AS releases,
  (SELECT COUNT(*) FROM events WHERE profile_id = p.id) AS events,
  (SELECT COUNT(*) FROM snap_cards WHERE profile_id = p.id) AS snap_cards
FROM profiles p
WHERE p.handle = 'artisthandle';

-- Step 3: Delete (replace with actual handle)
DELETE FROM profiles
WHERE handle = 'artisthandle';

-- All related data cascades. Confirm:
SELECT COUNT(*) FROM profiles WHERE handle = 'artisthandle';
-- Should return 0
```

---

### 8. Override an artist's tier

**-- WRITE OPERATION**

```sql
-- Set tier manually (for manual upgrades, beta access, compensation)
UPDATE profiles
SET
  tier = 'artist',  -- 'free' | 'artist' | 'pro' | 'label'
  updated_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE handle = 'artisthandle';
```

---

### 9. Platform stats

```sql
-- Total artist count by tier
SELECT
  tier,
  COUNT(*) AS count
FROM profiles
WHERE profile_type = 'artist'
GROUP BY tier
ORDER BY count DESC;
```

```sql
-- Artist signups by day (last 30 days)
SELECT
  DATE(TO_TIMESTAMP(created_at)) AS signup_date,
  COUNT(*) AS new_artists
FROM profiles
WHERE profile_type = 'artist'
  AND created_at > EXTRACT(EPOCH FROM NOW() - INTERVAL '30 days')::BIGINT
GROUP BY signup_date
ORDER BY signup_date ASC;
```

```sql
-- Total fans across all artists
SELECT COUNT(*) AS total_fans
FROM fans;
```

```sql
-- Total fans with double opt-in confirmed
SELECT COUNT(*) AS confirmed_fans
FROM fans
WHERE double_opted_in = 1;
```

```sql
-- Platform summary (single query)
SELECT
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist') AS total_artists,
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'free') AS free_artists,
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'artist') AS artist_tier,
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'pro') AS pro_tier,
  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'label') AS label_tier,
  (SELECT COUNT(*) FROM fans) AS total_fans,
  (SELECT COUNT(*) FROM fans WHERE double_opted_in = 1) AS confirmed_fans,
  (SELECT COUNT(*) FROM views) AS total_views,
  (SELECT COUNT(*) FROM clicks) AS total_clicks;
```

---

### 10. Top artists by fan count

```sql
SELECT
  p.handle,
  p.name,
  p.tier,
  COUNT(f.id) AS fan_count,
  p.created_at
FROM profiles p
LEFT JOIN fans f ON f.profile_id = p.id
WHERE p.profile_type = 'artist'
GROUP BY p.id, p.handle, p.name, p.tier, p.created_at
ORDER BY fan_count DESC
LIMIT 20;
```

---

### 11. Recently active artists (by updated_at)

```sql
SELECT
  handle,
  name,
  email,
  tier,
  TO_TIMESTAMP(updated_at) AS last_active
FROM profiles
WHERE profile_type = 'artist'
ORDER BY updated_at DESC
LIMIT 50;
```

---

### 12. Check an artist's full data (for support)

```sql
-- Everything about one artist in one place
SELECT
  p.*,
  (SELECT COUNT(*) FROM fans WHERE profile_id = p.id) AS fan_count,
  (SELECT COUNT(*) FROM clicks WHERE profile_id = p.id) AS total_clicks,
  (SELECT COUNT(*) FROM views WHERE profile_id = p.id) AS total_views,
  (SELECT COUNT(*) FROM releases WHERE profile_id = p.id) AS release_count,
  (SELECT COUNT(*) FROM events WHERE profile_id = p.id) AS event_count,
  (SELECT COUNT(*) FROM snap_cards WHERE profile_id = p.id) AS snap_card_count,
  (SELECT COUNT(*) FROM broadcasts WHERE profile_id = p.id) AS broadcast_count
FROM profiles p
WHERE p.handle = 'artisthandle';
```

---

## V1 Netlify Functions for admin

Two protected serverless functions. Both require a shared secret (`ADMIN_SECRET` env var in Netlify) passed as `Authorization: Bearer <secret>` header. Not artist-accessible.

### `netlify/functions/admin-stats.js`

Returns platform-wide stats JSON. Powers any future simple admin dashboard.

```js
// netlify/functions/admin-stats.js
const { createClient } = require('@supabase/supabase-js')

exports.handler = async (event) => {
  // Auth check
  const auth = event.headers.authorization || ''
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorised' }) }
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY  // service_role key — bypasses RLS
  )

  // Run platform summary query
  const { data, error } = await supabase.rpc('admin_platform_summary')
  if (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
}
```

Supabase SQL function to create:

```sql
CREATE OR REPLACE FUNCTION admin_platform_summary()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'total_artists',   (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist'),
    'free_artists',    (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'free'),
    'artist_tier',     (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'artist'),
    'pro_tier',        (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'pro'),
    'label_tier',      (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND tier = 'label'),
    'total_fans',      (SELECT COUNT(*) FROM fans),
    'confirmed_fans',  (SELECT COUNT(*) FROM fans WHERE double_opted_in = 1),
    'total_views',     (SELECT COUNT(*) FROM views),
    'total_clicks',    (SELECT COUNT(*) FROM clicks),
    'new_artists_7d',  (SELECT COUNT(*) FROM profiles WHERE profile_type = 'artist' AND created_at > EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days')::BIGINT),
    'new_fans_7d',     (SELECT COUNT(*) FROM fans WHERE created_at > EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days')::BIGINT)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### `netlify/functions/admin-artist.js`

Update an artist's tier or status. Used when V1 SQL access isn't available.

```js
// netlify/functions/admin-artist.js
const { createClient } = require('@supabase/supabase-js')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  // Auth check
  const auth = event.headers.authorization || ''
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorised' }) }
  }

  const { handle, action, value, reason } = JSON.parse(event.body || '{}')

  if (!handle || !action) {
    return { statusCode: 400, body: JSON.stringify({ error: 'handle and action required' }) }
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  )

  let update = { updated_at: Math.floor(Date.now() / 1000) }

  switch (action) {
    case 'set_tier':
      // value: 'free' | 'artist' | 'pro' | 'label' | 'suspended'
      update.tier = value
      break
    case 'set_status':
      // value: 'active' | 'suspended'
      update.status = value
      break
    default:
      return { statusCode: 400, body: JSON.stringify({ error: `Unknown action: ${action}` }) }
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(update)
    .eq('handle', handle)
    .select('id, handle, name, tier')
    .single()

  if (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }

  // Log the action (requires admin_actions table — see below)
  await supabase.from('admin_actions').insert({
    id: crypto.randomUUID(),
    target_type: 'profile',
    target_id: data.id,
    action,
    value,
    reason: reason || null,
    performed_at: Math.floor(Date.now() / 1000)
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, profile: data })
  }
}
```

Admin actions log table (add to schema):

```sql
CREATE TABLE admin_actions (
  id           TEXT PRIMARY KEY,
  target_type  TEXT NOT NULL,        -- 'profile' | 'fan'
  target_id    TEXT NOT NULL,
  action       TEXT NOT NULL,        -- 'set_tier' | 'set_status' | 'gdpr_delete' | 'tier_override'
  value        TEXT,
  reason       TEXT,
  performed_at INTEGER NOT NULL
);

CREATE INDEX idx_admin_actions_target ON admin_actions(target_type, target_id);
CREATE INDEX idx_admin_actions_performed_at ON admin_actions(performed_at);
```

---

## V2 — `platform-admin.html`

Specification for the dedicated platform admin page. Build when: first 10 paying artists have signed up, OR when SQL queries feel slow/risky for the volume of admin tasks needed.

### Authentication

Not behind Supabase auth. Behind a separate hard gate:

- IP allowlist (Netlify environment variable: `ADMIN_ALLOWED_IPS`) — checked at Netlify edge function level
- Admin secret (bcrypt-hashed password, stored in `ADMIN_SECRET_HASH` env var)
- On successful auth, sets a session token in `sessionStorage` — not `localStorage` (cleared when browser closes)
- No "remember me" — admin sessions always short-lived

```
GET  /platform-admin.html    → shows login gate if no valid session
POST /api/admin-auth         → validates password, returns session token
```

### URL

`/platform-admin` or `/_/admin` — not guessable, not linked from anywhere public. No meta tags, `noindex` header.

---

### Page sections

#### Header

```
ABLE Platform Admin
[James — logged in since 14:32] [Sign out]
```

Simple. No ABLE branding. Functional header only.

---

#### Stats strip (always visible)

```
Total artists: 214   Active this week: 67   Total fans: 8,402   Revenue (MRR): £1,843
Free: 156   Artist: 41   Pro: 15   Label: 2
```

Pulls from `admin-stats.js` function. Refreshes on page load. Manual refresh button.

---

#### Artist list table

Columns: Handle | Name | Email | Tier | Fans | Status | Last active | Actions

- Search input: searches handle, name, email in real time
- Filter pills: All | Free | Artist tier | Pro | Label | Suspended
- Sort: signup date (default) | last active | fan count | alphabetical
- Rows: click to expand artist detail panel (drawer from right)
- Actions per row: Suspend | Change tier | View profile | Delete

Pagination: 50 per page.

---

#### Artist detail panel (right drawer)

Opens when a row is clicked. Shows:

- Profile summary (name, handle, email, tier, created date)
- Stats: fan count, total views (all time), total clicks (all time)
- Recent activity (last 5 fan sign-ups, last 5 clicks)
- Current page state (profile / pre-release / live / gig)
- Release info (title, type, date)
- Platform links (list)
- Admin actions (change tier, suspend, delete) with required reason field
- Action log (all previous admin actions on this profile)

---

#### Fan management

Separate tab. Not the primary view.

- Search by email across all artists
- Results show: fan ID, email, which artist, sign-up date, double opt-in status, source
- Actions: GDPR delete (with confirmation dialog + reason log) | View all fan records

---

#### Platform stats dashboard

Third tab.

- Artist growth chart: line chart, daily new artists, last 30/90 days
- Fan growth chart: daily new fans, last 30/90 days
- Tier distribution: bar chart
- Top artists by fan count: table, top 20
- Revenue trend: if Stripe webhook data is available — MRR over time

All charts: plain `<canvas>` with Chart.js CDN. No React. No build step.

---

#### Content moderation queue

Fourth tab. Not needed at launch — add at P2.

- Flagged items (manual flag endpoint, not automated at V1)
- Review queue: snap card body | artist bio | artwork URLs
- Actions: Approve | Remove | Suspend artist

---

#### Feature flag management

Fifth tab. Simple key-value store:

```sql
CREATE TABLE feature_flags (
  key         TEXT PRIMARY KEY,
  enabled     BOOLEAN NOT NULL DEFAULT FALSE,
  description TEXT,
  enabled_for TEXT  -- NULL = all artists, JSON array of profile IDs for targeted rollout
);
```

UI: table of flags, toggle on/off, edit enabled_for list.

---

#### GDPR request queue

Sixth tab.

Manual workflow at V1:
1. James receives email from fan requesting deletion
2. Logs it here: email + request date + type (delete / export)
3. Runs the GDPR query from the SQL library
4. Marks request as fulfilled + date
5. Sends confirmation to fan

This is a paper trail, not automated. It becomes automated at P2 with a `POST /api/gdpr/request` endpoint that creates a ticket in this queue.

---

### Design

Admin-only. Not seen by artists. Not held to ABLE design standards — functional clarity wins.

```css
/* platform-admin.html tokens */
--bg:      #0a0a0a;
--surface: #141414;
--border:  #2a2a2a;
--text:    #e8e8e8;
--muted:   #888888;
--danger:  #e05242;
--warn:    #f4b942;
--safe:    #4caf77;
--font:    'Plus Jakarta Sans', system-ui, sans-serif;
```

No spring animations. No themes. No micro-interactions. Tables and forms that work.

---

## Supabase RLS for admin

The platform admin page uses `SUPABASE_SERVICE_KEY` (the service_role key), which bypasses all RLS policies by design. This key:

- Is never exposed in front-end code
- Only ever used in Netlify server functions
- Is stored in Netlify environment variables, never in the codebase

The anon key used in `admin.html` (artist dashboard) is scoped by RLS to the authenticated artist's own data. The service_role key used in admin functions sees everything.

```
SUPABASE_URL           = https://jgspraqrnjrerzhnnhtb.supabase.co
SUPABASE_SERVICE_KEY   = [service_role key — never commit this]
ADMIN_SECRET           = [long random string — set in Netlify env vars]
```

---

*This spec is the primary build reference for the ABLE platform admin system. V1 SQL library is operational immediately. V2 HTML page is built at the P1 milestone (first 10 paying artists).*
