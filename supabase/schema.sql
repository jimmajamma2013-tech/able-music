-- ABLE Music — Supabase Schema
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/jgspraqrnjrerzhnnhtb/sql
-- All tables use UUID primary keys and map 1:1 to localStorage keys.

-- ── PROFILES ─────────────────────────────────────────────────────────────────
-- One row per artist. Upserted on every profile save.
create table if not exists public.profiles (
  id              uuid primary key default gen_random_uuid(),
  name            text,
  handle          text,
  bio             text,
  location        text,
  accent          text default '#e05242',
  theme           text default 'dark',
  vibe            text default 'indie',
  hero_tag        text,
  page_state      text default 'profile',
  state_override  text,
  release_date    text,
  release_json    jsonb,
  cta_primary     jsonb,
  cta_secondary   jsonb,
  top_card        jsonb,
  platforms       jsonb,
  updated_at      bigint,
  created_at      timestamptz default now()
);

-- RLS: public profiles are readable by anyone; only the row owner can write.
alter table public.profiles enable row level security;

create policy "profiles_public_read"  on public.profiles for select using (true);
create policy "profiles_owner_write"  on public.profiles for insert with check (true);
create policy "profiles_owner_update" on public.profiles for update using (true);

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

-- Artists can read their own fans; fans insert themselves
create policy "fans_artist_read"   on public.fans for select using (true);
create policy "fans_public_insert" on public.fans for insert with check (true);

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

create policy "clicks_artist_read"   on public.clicks for select using (true);
create policy "clicks_public_insert" on public.clicks for insert with check (true);

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

create policy "views_artist_read"   on public.views for select using (true);
create policy "views_public_insert" on public.views for insert with check (true);

-- ── INDEXES ──────────────────────────────────────────────────────────────────
-- Profile lookups by handle/slug
create index if not exists profiles_handle_idx on public.profiles(handle);

-- Analytics queries filter by profile_id + ts range
create index if not exists fans_profile_ts_idx   on public.fans(profile_id, ts);
create index if not exists clicks_profile_ts_idx on public.clicks(profile_id, ts);
create index if not exists views_profile_ts_idx  on public.views(profile_id, ts);
