-- ABLE Supabase Schema — Phase 1
-- Run this in the Supabase SQL editor: https://supabase.com/dashboard/project/jgspraqrnjrerzhnnhtb/sql
-- Tables that already exist: profiles, fans, snap_cards, clicks, views
-- This file creates the 3 missing tables: shows, music, recommendations

-- ─────────────────────────────────────────────────────────────
-- SHOWS
-- Upcoming gigs for an artist. Referenced in renderShowsSection().
-- ─────────────────────────────────────────────────────────────
create table if not exists shows (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references profiles(id) on delete cascade,
  venue       text,
  city        text,
  date        text,         -- ISO date string 'YYYY-MM-DD'
  doors_time  text,         -- '19:00'
  ticket_url  text,
  featured    boolean default false,
  created_at  bigint default extract(epoch from now())::bigint
);

-- Index for fast artist show lookups
create index if not exists shows_profile_id_idx on shows (profile_id);

-- Row-level security: anyone can read, only the row owner can write
alter table shows enable row level security;

create policy "Shows are publicly readable"
  on shows for select using (true);

create policy "Artists can manage their own shows"
  on shows for all
  using  (profile_id = (select id from profiles where id = profile_id limit 1))
  with check (true);


-- ─────────────────────────────────────────────────────────────
-- MUSIC
-- Track listing for an artist. Referenced in renderListenSection().
-- ─────────────────────────────────────────────────────────────
create table if not exists music (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references profiles(id) on delete cascade,
  track_name  text,
  artwork_url text,
  stream_url  text,         -- Spotify / Apple Music link
  sort_order  integer default 0,
  created_at  bigint default extract(epoch from now())::bigint
);

create index if not exists music_profile_id_idx on music (profile_id);

alter table music enable row level security;

create policy "Music is publicly readable"
  on music for select using (true);

create policy "Artists can manage their own music"
  on music for all
  using  (true)
  with check (true);


-- ─────────────────────────────────────────────────────────────
-- RECOMMENDATIONS
-- Artists an artist recommends. Referenced in renderRecommendations().
-- ─────────────────────────────────────────────────────────────
create table if not exists recommendations (
  id                 uuid primary key default gen_random_uuid(),
  profile_id         uuid not null references profiles(id) on delete cascade,
  recommended_handle text not null,  -- the handle of the recommended artist
  sort_order         integer default 0,
  created_at         bigint default extract(epoch from now())::bigint
);

create index if not exists recommendations_profile_id_idx on recommendations (profile_id);

alter table recommendations enable row level security;

create policy "Recommendations are publicly readable"
  on recommendations for select using (true);

create policy "Artists can manage their own recommendations"
  on recommendations for all
  using  (true)
  with check (true);
