# ABLE Platform Admin — Path from 0/10 to 10/10
**Created: 2026-03-16 | Status: ACTIVE**

---

## Where we start

Score: 0/10. No admin tooling exists. Everything requires direct Supabase dashboard access and manual SQL. This is the expected state before any artists have signed up.

The path to 10 has three phases. Each phase is scoped to the platform maturity it needs to match. Building ahead of that maturity is wasted time.

---

## P0 — Before any artists sign up
**Target score: 6/10**
**Cost: 2–3 hours. No new code. No build step.**

### What to do

**1. Write and test the SQL query library (this is `SPEC.md`)**

The SQL library in `SPEC.md` already exists as documentation. To activate it, run each query against the real Supabase database and confirm they return the expected results. Fix any schema mismatches (e.g., if the `status` column does not yet exist on profiles, add it).

Checklist:
- [ ] `platform_summary` query runs and returns sane numbers
- [ ] Artist list query returns correct columns
- [ ] GDPR fan-find query finds a test fan
- [ ] GDPR fan-delete query removes the test fan and cascades to fan_actions
- [ ] Tier override query updates a test profile correctly
- [ ] Admin actions log table created in Supabase
- [ ] `status` column added to profiles (if not present)

**2. Configure Supabase service_role key in Netlify**

The service_role key bypasses RLS. It must never appear in client-side code. It lives only in Netlify environment variables:

```
SUPABASE_URL          = https://jgspraqrnjrerzhnnhtb.supabase.co
SUPABASE_SERVICE_KEY  = [service_role key from Supabase Settings > API]
ADMIN_SECRET          = [generate: openssl rand -hex 32]
```

Add these to Netlify: Site settings > Environment variables.

**3. Deploy `admin-stats.js` and `admin-artist.js` Netlify functions**

These are specified in `SPEC.md`. Deploy and smoke-test:
- `curl -H "Authorization: Bearer $ADMIN_SECRET" https://ablemusic.co/.netlify/functions/admin-stats`
- Should return platform summary JSON.

**4. Save the SQL library somewhere accessible**

The queries in `SPEC.md` should be copy-pasteable. Consider saving the most-used queries as saved queries in the Supabase SQL editor (Supabase allows saving named queries). Name them:
- `admin: platform summary`
- `admin: all artists`
- `admin: find fan by email`
- `admin: gdpr delete fan`
- `admin: top artists by fans`
- `admin: signups by day`

### What P0 gives you

| Dimension | Before P0 | After P0 |
|---|---|---|
| Artist management | 0/10 | 5/10 — can view, find, suspend, delete via SQL |
| Fan management | 0/10 | 6/10 — can find and delete fans by email |
| Platform analytics | 0/10 | 5/10 — platform summary query runs in seconds |
| Billing management | 0/10 | 1/10 — tier can be overridden but no Stripe visibility |
| Content moderation | 0/10 | 0/10 — no change |
| Feature flags | 0/10 | 0/10 — no change |
| Impersonation | 0/10 | 0/10 — no change |
| Support management | 0/10 | 2/10 — admin_actions log exists |
| Operational visibility | 0/10 | 2/10 — Netlify logs accessible |
| Legal compliance | 0/10 | 6/10 — GDPR delete query exists and works |

**Overall: 0/10 → 6/10**

P0 is the SQL library. The queries *are* the admin tool at this stage. It is a real working solution — not a polished UI, but a complete operational capability.

---

## P1 — After first 10 artists (or first paying subscription)
**Target score: 8/10**
**Cost: 1–2 days build. One HTML file. No framework.**

### Trigger

Build P1 when:
- 10+ artists are signed up and active, OR
- First artist upgrades to a paid tier, OR
- First time running the SQL queries feels slow or error-prone

### What to build

**`platform-admin.html`** — a purpose-built admin page behind a hard password gate.

Minimum viable scope for P1:

1. **Password gate** — simple. Check `sessionStorage` for admin token. If not set, show login form. POST to `admin-auth` Netlify function. On success, store token in `sessionStorage` and reload.

2. **Stats strip** — pull from `admin-stats.js`. Display total artists by tier, total fans, new signups this week.

3. **Artist list table** — paginated, searchable. Columns: handle, name, email, tier, fan count, last active, status. Click row → artist detail.

4. **Artist detail drawer** — summary, stats, tier change, suspend/unsuspend, delete. All backed by `admin-artist.js`.

5. **Fan search** — search by email across all artists. Show which artist(s) they signed up under. GDPR delete button with confirm dialog.

6. **Admin action log** — table of recent admin_actions, newest first.

That is P1. It is not pretty. It does not need to be.

Do NOT build at P1:
- Content moderation queue (P2)
- Feature flags (P2)
- Charts/graphs (P2)
- GDPR request queue (P2 — manage via direct email for now)

### What P1 gives you

| Dimension | After P0 | After P1 |
|---|---|---|
| Artist management | 5/10 | 9/10 — full UI, search, suspend, tier change |
| Fan management | 6/10 | 8/10 — cross-platform search, GDPR delete button |
| Platform analytics | 5/10 | 7/10 — stats strip, basic table view |
| Billing management | 1/10 | 3/10 — tier override UI, still no Stripe link |
| Content moderation | 0/10 | 0/10 — no change |
| Feature flags | 0/10 | 0/10 — no change |
| Impersonation | 0/10 | 2/10 — "view profile" link to artist's page |
| Support management | 2/10 | 5/10 — action log visible in UI |
| Operational visibility | 2/10 | 4/10 — Netlify logs still separate |
| Legal compliance | 6/10 | 8/10 — GDPR delete in UI with confirmation + audit trail |

**Overall: 6/10 → 8/10**

---

## P2 — At 100+ artists or first compliance pressure
**Target score: 10/10**
**Cost: 3–5 days build.**

### Trigger

Build P2 when:
- 100+ artists are active, OR
- First GDPR SAR (Subject Access Request) arrives, OR
- First content moderation issue is reported, OR
- Revenue is meaningful enough to need visibility

### What to build

**1. Stripe revenue dashboard**

Stripe webhook (`stripe-webhook.js` Netlify function) already specified in `BACKEND_SCHEMA.md`. Add a `subscriptions` table that mirrors Stripe subscription data:

```sql
CREATE TABLE subscriptions (
  id               TEXT PRIMARY KEY,
  profile_id       TEXT REFERENCES profiles(id),
  stripe_sub_id    TEXT UNIQUE NOT NULL,
  status           TEXT NOT NULL,    -- 'active' | 'past_due' | 'cancelled' | 'trialing'
  tier             TEXT NOT NULL,
  amount_pence     INTEGER NOT NULL,
  currency         TEXT NOT NULL DEFAULT 'gbp',
  current_period_end INTEGER,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at       INTEGER NOT NULL,
  updated_at       INTEGER NOT NULL
);
```

Platform admin shows: MRR, tier breakdown by revenue, churned subscriptions this month, past-due accounts.

**2. Content moderation queue**

Add `moderation_status` column to relevant tables:

```sql
ALTER TABLE snap_cards ADD COLUMN moderation_status TEXT NOT NULL DEFAULT 'ok';
-- 'ok' | 'flagged' | 'removed'
ALTER TABLE profiles ADD COLUMN moderation_status TEXT NOT NULL DEFAULT 'ok';
```

Moderation queue: shows all items with `moderation_status = 'flagged'`. Actions: Approve (set back to 'ok') | Remove (set to 'removed', content stops rendering).

Flagging mechanism: A `POST /api/report` endpoint that creates a flag record. At V1, flags are created by James manually from the admin UI. At V2, a "Report" option can be added to the public profile page for fans.

**3. Feature flag management**

`feature_flags` table (specified in `SPEC.md`). Admin UI: toggle flags on/off, target specific artist IDs.

**4. Impersonation / "view as artist"**

Admin can generate a short-lived impersonation token for any artist:

```js
// netlify/functions/admin-impersonate.js
// Creates a time-limited session token scoped to a specific profile
// Redirects to admin.html with that token in the URL
// Token expires after 15 minutes
// All actions taken while impersonating are logged in admin_actions
```

Used for: debugging artist-reported issues, QA testing on live data.

**5. GDPR request queue (formalised)**

`gdpr_requests` table:

```sql
CREATE TABLE gdpr_requests (
  id           TEXT PRIMARY KEY,
  email        TEXT NOT NULL,
  request_type TEXT NOT NULL,    -- 'delete' | 'export' | 'rectification'
  received_at  INTEGER NOT NULL,
  fulfilled_at INTEGER,
  notes        TEXT,
  status       TEXT NOT NULL DEFAULT 'pending'  -- 'pending' | 'fulfilled' | 'rejected'
);
```

`POST /api/gdpr/request` endpoint: fans or artists submit requests. James fulfils from the queue UI. 30-day SLA tracked automatically.

**6. Operational alerting**

- Daily summary email to James: new signups, failed payments, GDPR requests pending
- Netlify build status badge on admin page
- Supabase database size / row count alerts

### What P2 gives you

| Dimension | After P1 | After P2 |
|---|---|---|
| Artist management | 9/10 | 10/10 |
| Fan management | 8/10 | 10/10 |
| Platform analytics | 7/10 | 10/10 |
| Billing management | 3/10 | 9/10 |
| Content moderation | 0/10 | 9/10 |
| Feature flags | 0/10 | 9/10 |
| Impersonation | 2/10 | 9/10 |
| Support management | 5/10 | 8/10 |
| Operational visibility | 4/10 | 8/10 |
| Legal compliance | 8/10 | 10/10 |

**Overall: 8/10 → 10/10**

---

## Score summary

| Phase | Trigger | Score | Key unlock |
|---|---|---|---|
| Baseline | Today | 0/10 | — |
| P0 — SQL library | Now (before launch) | 6/10 | GDPR compliance + basic control |
| P1 — HTML admin | 10 paying artists | 8/10 | Real UI + GDPR delete button |
| P2 — Full build | 100+ artists | 10/10 | Billing, moderation, impersonation |

---

## The one thing to do right now

Copy the SQL queries from `SPEC.md` into saved queries in the Supabase SQL editor. That alone moves the score from 0 to 5. It takes 20 minutes and requires no code changes.

Do it before the first artist signs up, not after.
