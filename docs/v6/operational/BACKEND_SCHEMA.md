# ABLE — Backend Schema & API Spec
**Version: 1.1 | Updated: 2026-03-13 | Stack: Supabase + Netlify + Resend + Stripe**
**Authority: subordinate to V6_BUILD_AUTHORITY.md — see Section 2.7 and 2.12 there for the backend decision.**

This document specifies the Supabase v1 backend schema and API surface. Do not rename localStorage keys — they map 1:1 to table columns. The migration from localStorage → Supabase is a flush-and-sync operation.

> **Note on SQL syntax:** Table schemas below are written in SQLite-compatible syntax for readability (close to PostgreSQL). For Supabase/PostgreSQL, adapt types as follows: `INTEGER NOT NULL` timestamps → `BIGINT NOT NULL`; `INTEGER DEFAULT 0` booleans → `BOOLEAN DEFAULT FALSE`; `TEXT PRIMARY KEY` UUIDs → `UUID PRIMARY KEY DEFAULT gen_random_uuid()`; `REAL` → `NUMERIC` or keep `REAL`. The table structure and column names are authoritative; the exact type syntax is PostgreSQL-adapted.

---

## Stack decision (v1 — final)

| Layer | Technology | Why |
|---|---|---|
| Hosting | Netlify | Static files, instant deploys, form handling, free tier for v1 |
| API / serverless | Supabase Edge Functions | Co-located with database, GDPR-compliant RLS built-in |
| Database | Supabase (PostgreSQL) | admin.html already configured, RLS, realtime, REST + GraphQL |
| File storage | Supabase Storage | S3-compatible, integrated with RLS, no extra config |
| Auth | Supabase Auth (magic link) | No passwords, built-in JWT, works with admin.html |
| Email delivery | Resend | Excellent deliverability, simple API, affordable |
| OG images | Netlify Functions + @vercel/og | Dynamic `og:image` per artist |
| Payments | Stripe | Industry standard, supports one-time + recurring, webhook-native |

**On Cloudflare D1:** A Cloudflare Workers + D1 + R2 architecture offers lower latency at global scale by co-locating compute with data. It is the documented v2 infrastructure migration path for when Supabase's latency profile becomes a bottleneck. For v1, Supabase is already configured in `admin.html`, provides Row Level Security (GDPR compliance), and eliminates the overhead of building custom Worker middleware. The localStorage → Supabase schema migration is identical to any other backend.

---

## Database schema (PostgreSQL / Supabase)

### `profiles`
```sql
CREATE TABLE profiles (
  id           TEXT PRIMARY KEY,           -- UUID, matches able_artist_id in localStorage
  handle       TEXT UNIQUE NOT NULL,       -- ablemusic.co/[handle]
  profile_type TEXT NOT NULL DEFAULT 'artist', -- 'artist' | 'freelancer'
  email        TEXT UNIQUE NOT NULL,       -- magic link auth
  name         TEXT NOT NULL,
  bio          TEXT,
  location     TEXT,
  accent       TEXT NOT NULL DEFAULT '#e05242',
  theme        TEXT NOT NULL DEFAULT 'dark',
  vibe         TEXT NOT NULL DEFAULT 'indie',
  hero_tag     TEXT,
  page_state   TEXT DEFAULT 'profile',
  state_override TEXT,
  release_date TEXT,                       -- ISO string
  release_json TEXT,                       -- JSON: { title, type, trackCount, year }
  cta_primary  TEXT,                       -- JSON: { label, url }
  cta_secondary TEXT,                      -- JSON: { label, url }
  top_card     TEXT,                       -- JSON: { type, videoUrl, embedUrl }
  platforms    TEXT,                       -- JSON array: [{ label, url, type }]
  tier         TEXT NOT NULL DEFAULT 'free', -- 'free' | 'artist' | 'pro' | 'label'
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  availability TEXT DEFAULT 'open',        -- freelancer: 'open' | 'limited' | 'closed'
  availability_set_at INTEGER,
  created_at   INTEGER NOT NULL,
  updated_at   INTEGER NOT NULL
);

CREATE INDEX idx_profiles_handle ON profiles(handle);
CREATE INDEX idx_profiles_tier ON profiles(tier);
```

### `releases`
```sql
CREATE TABLE releases (
  id           TEXT PRIMARY KEY,
  profile_id   TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  type         TEXT NOT NULL,              -- 'single' | 'ep' | 'album'
  year         INTEGER,
  artwork_url  TEXT,
  display_mode TEXT DEFAULT 'card',
  platform_url TEXT,
  sort_order   INTEGER DEFAULT 0,
  created_at   INTEGER NOT NULL,

  FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

CREATE TABLE tracks (
  id         TEXT PRIMARY KEY,
  release_id TEXT NOT NULL REFERENCES releases(id) ON DELETE CASCADE,
  num        INTEGER,
  title      TEXT NOT NULL,
  duration   TEXT
);

CREATE TABLE credits (
  id            TEXT PRIMARY KEY,
  release_id    TEXT NOT NULL REFERENCES releases(id) ON DELETE CASCADE,
  credited_name TEXT NOT NULL,
  credited_role TEXT NOT NULL,
  profile_id    TEXT,                      -- NULL if the person is not on ABLE
  verified      TEXT DEFAULT 'unverified', -- 'unverified' | 'peer_confirmed' | 'metadata'
  verified_at   INTEGER,
  created_at    INTEGER NOT NULL
);

CREATE INDEX idx_credits_profile_id ON credits(profile_id);
```

### `events`
```sql
CREATE TABLE events (
  id         TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  venue      TEXT NOT NULL,
  city       TEXT NOT NULL,
  date       TEXT NOT NULL,               -- YYYY-MM-DD
  time       TEXT,
  ticket_url TEXT,
  sold_out   INTEGER DEFAULT 0,           -- boolean
  source     TEXT DEFAULT 'manual',       -- 'manual' | 'bandsintown'
  external_id TEXT,                       -- Bandsintown event ID for dedup
  created_at INTEGER NOT NULL
);

CREATE INDEX idx_events_profile_id ON events(profile_id);
CREATE INDEX idx_events_date ON events(date);
```

### `merch`
```sql
CREATE TABLE merch_items (
  id         TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  price      TEXT,
  image_url  TEXT,
  url        TEXT NOT NULL,
  emoji      TEXT,
  badge      TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL
);
```

### `support_packs`
```sql
CREATE TABLE support_packs (
  id          TEXT PRIMARY KEY,
  profile_id  TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  label       TEXT NOT NULL,
  description TEXT,
  price       REAL NOT NULL,              -- in pence (GBP) or cents (USD)
  currency    TEXT NOT NULL DEFAULT 'gbp',
  pack_type   TEXT DEFAULT 'onetime',     -- 'onetime' | 'monthly' | 'lifetime'
  emoji       TEXT,
  stripe_price_id TEXT,                   -- Stripe Price ID for checkout
  active      INTEGER DEFAULT 1,
  sort_order  INTEGER DEFAULT 0,
  created_at  INTEGER NOT NULL
);

CREATE TABLE support_purchases (
  id              TEXT PRIMARY KEY,
  pack_id         TEXT NOT NULL REFERENCES support_packs(id),
  fan_email       TEXT NOT NULL,
  stripe_payment_intent TEXT,
  amount_paid     REAL NOT NULL,
  currency        TEXT NOT NULL DEFAULT 'gbp',
  status          TEXT DEFAULT 'pending', -- 'pending' | 'complete' | 'refunded'
  purchased_at    INTEGER NOT NULL
);
```

### `fans`
```sql
CREATE TABLE fans (
  id         TEXT PRIMARY KEY,           -- UUID
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  email      TEXT NOT NULL,
  ts         INTEGER NOT NULL,           -- sign-up timestamp
  source     TEXT,                       -- 'instagram' | 'tiktok' | 'direct' | 'qr' | etc.
  score      REAL DEFAULT 100,           -- raw superfan score
  decayed_score REAL DEFAULT 100,
  last_activity INTEGER,
  last_calculated INTEGER,
  tier       TEXT DEFAULT 'listener',    -- 'listener' | 'fan' | 'supporter' | 'superfan' | 'inner_circle'
  artist_granted INTEGER DEFAULT 0,      -- manually added to inner_circle by artist
  double_opted_in INTEGER DEFAULT 0,     -- GDPR: has clicked confirmation email link
  opted_in_at INTEGER,
  gdpr_ip    TEXT,                       -- IP at time of opt-in (hashed, not raw)
  created_at INTEGER NOT NULL,

  UNIQUE(profile_id, email)
);

CREATE INDEX idx_fans_profile_id ON fans(profile_id);
CREATE INDEX idx_fans_email ON fans(email);
CREATE INDEX idx_fans_tier ON fans(tier);
```

### `fan_actions`
```sql
CREATE TABLE fan_actions (
  id         TEXT PRIMARY KEY,
  fan_id     TEXT NOT NULL REFERENCES fans(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,              -- matches SUPERFAN_WEIGHTS keys
  pts        REAL NOT NULL,
  ts         INTEGER NOT NULL,
  meta       TEXT                        -- JSON: e.g. { ctaLabel: 'Stream Now' }
);

CREATE INDEX idx_fan_actions_fan_id ON fan_actions(fan_id);
CREATE INDEX idx_fan_actions_ts ON fan_actions(ts);
```

### `clicks`
```sql
CREATE TABLE clicks (
  id         TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  label      TEXT NOT NULL,
  type       TEXT NOT NULL,              -- 'primary_cta' | 'secondary_cta' | 'pill' | 'snap_card' | 'platform' | 'merch_item'
  ts         INTEGER NOT NULL,
  source     TEXT                        -- UTM source
);

CREATE INDEX idx_clicks_profile_id ON clicks(profile_id);
CREATE INDEX idx_clicks_ts ON clicks(ts);
```

### `views`
```sql
CREATE TABLE views (
  id         TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ts         INTEGER NOT NULL,
  source     TEXT,
  user_agent TEXT                        -- for device breakdown
);

CREATE INDEX idx_views_profile_id ON views(profile_id);
CREATE INDEX idx_views_ts ON views(ts);
```

### `snap_cards`
```sql
CREATE TABLE snap_cards (
  id         TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,              -- 'release' | 'event' | 'merch' | 'text' | 'collab'
  title      TEXT,
  body       TEXT,
  image_url  TEXT,
  cta_label  TEXT,
  cta_url    TEXT,
  sort_order INTEGER DEFAULT 0,
  published  INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL
);
```

### `broadcasts`
```sql
CREATE TABLE broadcasts (
  id          TEXT PRIMARY KEY,
  profile_id  TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject     TEXT NOT NULL,
  body_html   TEXT NOT NULL,
  body_text   TEXT NOT NULL,
  segment     TEXT DEFAULT 'all',        -- 'all' | 'superfans' | 'supporters' | custom JSON
  sent_at     INTEGER,
  recipient_count INTEGER DEFAULT 0,
  open_count  INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  status      TEXT DEFAULT 'draft'       -- 'draft' | 'sending' | 'sent'
);
```

### `magic_links`
```sql
CREATE TABLE magic_links (
  id         TEXT PRIMARY KEY,
  email      TEXT NOT NULL,
  profile_type TEXT DEFAULT 'artist',    -- 'artist' | 'fan'
  token      TEXT NOT NULL UNIQUE,
  expires_at INTEGER NOT NULL,
  used       INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL
);
```

---

## API routes

All routes are Supabase Edge Functions (or Netlify Functions). Base: `ablemusic.co/api/`

### Auth
```
POST /api/auth/magic-link        { email }
                                 → sends magic link email, returns { ok: true }

GET  /api/auth/verify?token=...  → validates token, sets session cookie, redirects to dashboard

POST /api/auth/logout            → clears session cookie
```

### Profile
```
GET  /api/profile/:handle        → public profile data (no auth required)
                                 → returns full profile JSON for rendering able-v6.html

PUT  /api/profile/:handle        [auth] → update profile fields
                                 → validates ownership via session cookie

POST /api/profile                [auth] → create new profile
                                 → returns { handle, id }

GET  /api/profile/:handle/stats  [auth] → views/clicks/fans for last 7/30 days
```

### Fan capture
```
POST /api/fan-capture            { profileId, email, source }
                                 → creates fan record, sends double opt-in email
                                 → returns { ok: true, duplicate: false }

GET  /api/fan/verify?token=...   → marks fan double_opted_in = 1
                                 → redirects to artist profile with ?confirmed=1
```

### Fan dashboard
```
GET  /api/fan/feed               [fan auth] → aggregated updates from all followed artists
                                 → { updates: [...], shows: [...], releases: [...] }

GET  /api/fan/artists            [fan auth] → all artists fan is signed up to
GET  /api/fan/profile            [fan auth] → fan account settings
PUT  /api/fan/profile            [fan auth] → update notification prefs, city
```

### Analytics
```
POST /api/track/click            { profileId, label, type, source }
POST /api/track/view             { profileId, source, userAgent }
```

### Fan management (artist)
```
GET  /api/fans/:profileId        [auth] → paginated fan list with scores + tiers
GET  /api/fans/:profileId/export [auth] → CSV download
PUT  /api/fans/:fanId/tier       [auth] → manually set to inner_circle
POST /api/fans/broadcast         [auth] → send broadcast to segment
```

### Uploads
```
POST /api/upload/artwork         [auth] → multipart, returns R2 URL
POST /api/upload/avatar          [auth] → multipart, returns R2 URL
```

### Payments (Stripe)
```
POST /api/stripe/checkout        { packId, fanEmail } → creates Stripe checkout session
GET  /api/stripe/success?session_id=... → confirms purchase, updates support_purchases
POST /api/stripe/webhook         → Stripe webhook endpoint (signs validated)
```

### AI (Claude proxy)
```
POST /api/ai/bio-writer          [auth] { genres: [], tone: '', keywords: [] }
                                 → returns { suggestions: ['...', '...', '...'] }
POST /api/ai/cta-variants        [auth] { ctaType: '', context: '' }
POST /api/ai/snap-copy           [auth] { cardType: '', content: '' }
```

---

## Migration from localStorage

When backend goes live, migration runs once per artist on first authenticated session:

```js
async function migrateFromLocalStorage(profileHandle) {
  const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}')
  const fans    = JSON.parse(localStorage.getItem('able_fans') || '[]')
  const clicks  = JSON.parse(localStorage.getItem('able_clicks') || '[]')
  const views   = JSON.parse(localStorage.getItem('able_views') || '[]')

  // Flush to API
  await fetch('/api/migrate', {
    method: 'POST',
    body: JSON.stringify({ profile, fans, clicks, views }),
    headers: { 'Content-Type': 'application/json' }
  })

  // Clear localStorage after confirmed flush
  localStorage.removeItem('able_v3_profile')
  localStorage.removeItem('able_fans')
  localStorage.removeItem('able_clicks')
  localStorage.removeItem('able_views')

  // Set migration flag so we don't re-migrate
  localStorage.setItem('able_migrated', '1')
}
```

---

## Rate limiting

All API routes are rate-limited. In Supabase, implement via pg_cron + custom rate limit table or use an edge middleware layer:

| Route | Limit | Window |
|---|---|---|
| `POST /api/fan-capture` | 5 requests | per email per hour |
| `POST /api/auth/magic-link` | 3 requests | per email per 15 minutes |
| `POST /api/track/click` | 200 requests | per IP per hour |
| `POST /api/track/view` | 100 requests | per IP per hour |
| `POST /api/ai/*` | 10 requests | per profile per hour |
| `GET /api/profile/:handle` | 500 requests | per IP per minute |

---

## Auth security notes

- Session cookies: `HttpOnly`, `Secure`, `SameSite=Strict`, 30-day expiry
- Magic link tokens: 32-byte random, expire after 15 minutes, single-use
- All artist-owned routes verify `session.profileId === requestedProfileId`
- Stripe webhooks verified via signature header `Stripe-Signature`
- Supabase Storage uploads: signed upload URLs via `createSignedUploadUrl()` (artist never gets direct storage access)

---

## GDPR compliance

- Fan email + IP stored; IP is hashed (SHA-256, not raw) at rest
- Double opt-in required for EU fans (detect via IP geolocation or always apply double opt-in globally — simpler and safer)
- `GET /api/fan/export` available to fan themselves (data portability)
- Fan delete: `DELETE /api/fan/:fanId` removes all records including fan_actions
- Artist data export: `GET /api/profile/:handle/export` returns full ZIP
- Data retention: inactive fans (no activity > 2 years) are soft-deleted and emailed before deletion

---

*Implement this schema exactly. Do not create new table names or column names not listed here. The localStorage key mapping is: `able_v3_profile` → `profiles`, `able_fans` → `fans`, `able_clicks` → `clicks`, `able_views` → `views`.*
