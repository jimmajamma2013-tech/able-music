-- ABLE Music — Supabase Schema
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/jgspraqrnjrerzhnnhtb/sql
-- Idempotent: safe to re-run. CREATE TABLE IF NOT EXISTS + ADD COLUMN IF NOT EXISTS throughout.
-- All tables use UUID primary keys and map 1:1 to localStorage keys.

-- ── PROFILES ─────────────────────────────────────────────────────────────────
-- One row per artist. Upserted on every profile save from admin.html.
create table if not exists public.profiles (
  id              uuid primary key default gen_random_uuid(),
  -- Identity
  name            text,
  handle          text unique,
  bio             text,
  location        text,
  -- Appearance
  accent          text default '#e05242',
  theme           text default 'dark',
  vibe            text default 'indie',
  identity        jsonb,
  -- Campaign
  hero_tag        text,
  page_state      text default 'profile',
  state_override  text,
  release_date    text,
  -- Content (structured blobs — 1:1 with localStorage values)
  release_json    jsonb,
  releases        jsonb,
  cta_primary     jsonb,
  cta_secondary   jsonb,
  top_card        jsonb,
  platforms       jsonb,
  snap_cards      jsonb,
  recommendations jsonb,
  moments         jsonb,
  close_circle    jsonb,
  -- Sections
  events          jsonb,
  merch           jsonb,
  support         jsonb,
  shows           jsonb,
  section_visibility jsonb,
  section_order   jsonb,
  -- Timestamps
  updated_at      bigint,
  created_at      timestamptz default now()
);

-- Add any columns missing from an earlier schema version (idempotent)
alter table public.profiles add column if not exists identity           jsonb;
alter table public.profiles add column if not exists releases           jsonb;
alter table public.profiles add column if not exists events             jsonb;
alter table public.profiles add column if not exists merch              jsonb;
alter table public.profiles add column if not exists support            jsonb;
alter table public.profiles add column if not exists section_visibility jsonb;
alter table public.profiles add column if not exists section_order      jsonb;
alter table public.profiles add column if not exists snap_cards         jsonb;
alter table public.profiles add column if not exists recommendations    jsonb;
alter table public.profiles add column if not exists moments            jsonb;
alter table public.profiles add column if not exists close_circle       jsonb;
alter table public.profiles add column if not exists shows              jsonb;

-- ── PROFILES RLS ─────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- Anyone can read any profile (fan visits ablemusic.co/artistname)
drop policy if exists "profiles_public_read" on public.profiles;
create policy "profiles_public_read" on public.profiles
  for select using (true);

-- Only the authenticated owner can insert or update their own row
-- auth.uid() = id: the profile row ID must match the Supabase auth user ID
drop policy if exists "profiles_owner_write"  on public.profiles;
drop policy if exists "profiles_owner_update" on public.profiles;
create policy "profiles_owner_write"  on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_owner_update" on public.profiles
  for update using (auth.uid() = id);

-- ── FANS ─────────────────────────────────────────────────────────────────────
-- One row per fan sign-up. Upserted with onConflict profile_id,email.
create table if not exists public.fans (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  email       text not null,
  source      text,
  ts          bigint,
  created_at  timestamptz default now(),
  unique (profile_id, email)
);

alter table public.fans enable row level security;

-- Artist reads their own fans; fans insert themselves anonymously
drop policy if exists "fans_artist_read"   on public.fans;
drop policy if exists "fans_public_insert" on public.fans;
create policy "fans_artist_read" on public.fans
  for select using (
    auth.uid() = profile_id
  );
create policy "fans_public_insert" on public.fans
  for insert with check (true);

-- ── CLICKS ───────────────────────────────────────────────────────────────────
-- One row per CTA click event.
create table if not exists public.clicks (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  label       text,
  type        text,
  source      text,
  ts          bigint,
  created_at  timestamptz default now()
);

alter table public.clicks enable row level security;

drop policy if exists "clicks_artist_read"   on public.clicks;
drop policy if exists "clicks_public_insert" on public.clicks;
create policy "clicks_artist_read" on public.clicks
  for select using (auth.uid() = profile_id);
create policy "clicks_public_insert" on public.clicks
  for insert with check (true);

-- ── VIEWS ────────────────────────────────────────────────────────────────────
-- One row per page view event.
create table if not exists public.views (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  ts          bigint,
  source      text,
  user_agent  text,
  created_at  timestamptz default now()
);

alter table public.views enable row level security;

drop policy if exists "views_artist_read"   on public.views;
drop policy if exists "views_public_insert" on public.views;
create policy "views_artist_read" on public.views
  for select using (auth.uid() = profile_id);
create policy "views_public_insert" on public.views
  for insert with check (true);

-- ── INDEXES ──────────────────────────────────────────────────────────────────
-- Profile lookups by handle (unique — .single() in v8 requires exactly one row)
create unique index if not exists profiles_handle_idx on public.profiles(handle);

-- Analytics queries filter by profile_id + ts range
create index if not exists fans_profile_ts_idx   on public.fans(profile_id, ts);
create index if not exists clicks_profile_ts_idx on public.clicks(profile_id, ts);
create index if not exists views_profile_ts_idx  on public.views(profile_id, ts);
