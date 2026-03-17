-- ABLE v1 — Supabase Setup SQL
-- Paste this into: Supabase Dashboard → SQL Editor → New query → Run
-- Updated: 2026-03-14
-- Stack: Supabase (PostgreSQL) + Netlify + Resend + Stripe
-- Authority: BACKEND_SCHEMA.md (subordinate to V6_BUILD_AUTHORITY.md §2.7 and §2.12)
--
-- NOTE: RLS is disabled on all tables for pre-auth v1 operation.
-- Tighten policies when Supabase Auth (magic link) is wired in.
-- Column types adapted for PostgreSQL:
--   timestamps → BIGINT (unix ms, matching Date.now() in JS)
--   booleans   → BOOLEAN DEFAULT FALSE
--   UUIDs      → TEXT (matches localStorage able_artist_id string)


-- ─────────────────────────────────────────
-- profiles
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id                     TEXT PRIMARY KEY,           -- UUID string from localStorage able_artist_id
  handle                 TEXT UNIQUE,                -- able.fm/[handle] — nullable until auth
  email                  TEXT UNIQUE,                -- magic link auth — nullable until auth
  name                   TEXT,
  bio                    TEXT,
  location               TEXT,
  accent                 TEXT NOT NULL DEFAULT '#e05242',
  theme                  TEXT NOT NULL DEFAULT 'dark',
  vibe                   TEXT NOT NULL DEFAULT 'indie',
  hero_tag               TEXT,
  page_state             TEXT DEFAULT 'profile',
  state_override         TEXT,
  release_date           TEXT,                       -- ISO date string
  release_json           TEXT,                       -- JSON: { title, type, trackCount, year }
  cta_primary            TEXT,                       -- JSON: { label, url }
  cta_secondary          TEXT,                       -- JSON: { label, url }
  top_card               TEXT,                       -- JSON: { type, videoUrl, embedUrl }
  platforms              TEXT,                       -- JSON array: [{ label, url, type }]
  tier                   TEXT NOT NULL DEFAULT 'free', -- 'free' | 'artist' | 'pro' | 'label'
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT,
  created_at             BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000,
  updated_at             BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000
);

ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_profiles_handle ON profiles(handle);
CREATE INDEX IF NOT EXISTS idx_profiles_tier   ON profiles(tier);


-- ─────────────────────────────────────────
-- fans
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fans (
  id              TEXT PRIMARY KEY,           -- UUID string generated in JS
  profile_id      TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  ts              BIGINT NOT NULL,            -- sign-up timestamp (ms)
  source          TEXT,                       -- 'instagram' | 'tiktok' | 'direct' | 'qr' | 'email' | 'other'
  double_opted_in BOOLEAN DEFAULT FALSE,
  opted_in_at     BIGINT,
  created_at      BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000,

  UNIQUE(profile_id, email)
);

ALTER TABLE fans DISABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_fans_profile_id ON fans(profile_id);
CREATE INDEX IF NOT EXISTS idx_fans_email      ON fans(email);


-- ─────────────────────────────────────────
-- clicks
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clicks (
  id         TEXT PRIMARY KEY,               -- UUID string generated in JS
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  label      TEXT NOT NULL,
  type       TEXT NOT NULL,                  -- 'primary_cta' | 'secondary_cta' | 'pill' | 'snap_card' | 'platform' | 'merch_item' | 'support_pack'
  ts         BIGINT NOT NULL,
  source     TEXT                            -- UTM source
);

ALTER TABLE clicks DISABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_clicks_profile_id ON clicks(profile_id);
CREATE INDEX IF NOT EXISTS idx_clicks_ts         ON clicks(ts);


-- ─────────────────────────────────────────
-- views
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS views (
  id         TEXT PRIMARY KEY,               -- UUID string generated in JS
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ts         BIGINT NOT NULL,
  source     TEXT,
  user_agent TEXT
);

ALTER TABLE views DISABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_views_profile_id ON views(profile_id);
CREATE INDEX IF NOT EXISTS idx_views_ts         ON views(ts);


-- ─────────────────────────────────────────
-- snap_cards
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS snap_cards (
  id         TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,                  -- 'release' | 'event' | 'merch' | 'text' | 'collab'
  title      TEXT,
  body       TEXT,
  image_url  TEXT,
  cta_label  TEXT,
  cta_url    TEXT,
  sort_order INTEGER DEFAULT 0,
  published  BOOLEAN DEFAULT TRUE,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000
);

ALTER TABLE snap_cards DISABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────
-- NOTE: The following tables (releases, tracks, credits, events, merch_items,
-- support_packs, support_purchases, broadcasts, fan_actions, magic_links)
-- are specified in BACKEND_SCHEMA.md and will be created when auth + full
-- multi-tenant architecture is implemented. For v1 pre-auth, these are stored
-- as JSON blobs inside the profiles.release_json and related TEXT columns.
-- ─────────────────────────────────────────
