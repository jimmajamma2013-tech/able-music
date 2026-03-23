-- ABLE Music — Supabase Schema
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/jgspraqrnjrerzhnnhtb/sql
-- Idempotent: safe to re-run. CREATE TABLE IF NOT EXISTS + ADD COLUMN IF NOT EXISTS throughout.
--
-- NOTE: profiles.id is TEXT (not UUID) — matches the localStorage able_artist_id format.
-- All profile_id foreign-key columns in fans/clicks/views are also TEXT for the same reason.
-- RLS policies use auth.uid()::text to compare with these text IDs.

-- ── PROFILES ─────────────────────────────────────────────────────────────────
-- One row per artist. Upserted on every profile save from admin.html.
create table if not exists public.profiles (
  id              text primary key,
  -- Identity
  name            text,
  handle          text,
  bio             text,
  location        text,
  -- Appearance
  accent          text default '#e05242',
  theme           text default 'dark',
  vibe            text default 'indie',
  identity        text,  -- JSON string
  -- Campaign
  hero_tag        text,
  page_state      text default 'profile',
  state_override  text,
  release_date    text,
  -- Content (JSON strings — JSON.stringify'd by JS before storage)
  release_json    text,
  releases        text,
  cta_primary     text,
  cta_secondary   text,
  top_card        text,
  platforms       text,
  snap_cards      text,
  recommendations text,
  moments         text,
  close_circle    text,
  -- Sections
  events          text,
  merch           text,
  support         text,
  shows           text,
  section_visibility text,
  section_order   text,
  -- Timestamps
  updated_at      bigint,
  created_at      bigint
);

-- Add any columns missing from an earlier schema version (idempotent)
alter table public.profiles add column if not exists identity           text;
alter table public.profiles add column if not exists releases           text;
alter table public.profiles add column if not exists events             text;
alter table public.profiles add column if not exists merch              text;
alter table public.profiles add column if not exists support            text;
alter table public.profiles add column if not exists section_visibility text;
alter table public.profiles add column if not exists section_order      text;
alter table public.profiles add column if not exists snap_cards         text;
alter table public.profiles add column if not exists recommendations    text;
alter table public.profiles add column if not exists moments            text;
alter table public.profiles add column if not exists close_circle       text;
alter table public.profiles add column if not exists shows              text;

-- ── PROFILES RLS ─────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- Anyone can read any profile (fan visits ablemusic.co/artistname)
drop policy if exists "profiles_public_read" on public.profiles;
create policy "profiles_public_read" on public.profiles
  for select using (true);

-- Only the authenticated owner can insert or update their own row
-- auth.uid()::text = id: cast uuid auth.uid() to text to match profiles.id (text)
drop policy if exists "profiles_owner_write"  on public.profiles;
drop policy if exists "profiles_owner_update" on public.profiles;
create policy "profiles_owner_write"  on public.profiles
  for insert with check (auth.uid()::text = id);
create policy "profiles_owner_update" on public.profiles
  for update using (auth.uid()::text = id);

-- ── FANS ─────────────────────────────────────────────────────────────────────
-- One row per fan sign-up. profile_id is TEXT matching profiles.id.
create table if not exists public.fans (
  id          uuid primary key default gen_random_uuid(),
  profile_id  text not null,
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
  for select using (auth.uid()::text = profile_id);
create policy "fans_public_insert" on public.fans
  for insert with check (true);

-- ── CLICKS ───────────────────────────────────────────────────────────────────
create table if not exists public.clicks (
  id          uuid primary key default gen_random_uuid(),
  profile_id  text not null,
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
  for select using (auth.uid()::text = profile_id);
create policy "clicks_public_insert" on public.clicks
  for insert with check (true);

-- ── VIEWS ────────────────────────────────────────────────────────────────────
create table if not exists public.views (
  id          uuid primary key default gen_random_uuid(),
  profile_id  text not null,
  ts          bigint,
  source      text,
  user_agent  text,
  created_at  timestamptz default now()
);

alter table public.views enable row level security;

drop policy if exists "views_artist_read"   on public.views;
drop policy if exists "views_public_insert" on public.views;
create policy "views_artist_read" on public.views
  for select using (auth.uid()::text = profile_id);
create policy "views_public_insert" on public.views
  for insert with check (true);

-- ── INDEXES ──────────────────────────────────────────────────────────────────
create index if not exists profiles_handle_idx   on public.profiles(handle);
create index if not exists fans_profile_ts_idx   on public.fans(profile_id, ts);
create index if not exists clicks_profile_ts_idx on public.clicks(profile_id, ts);
create index if not exists views_profile_ts_idx  on public.views(profile_id, ts);
