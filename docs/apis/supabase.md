# ABLE — Supabase Spec
**Created: 2026-03-16 | Covers: auth, database, storage, RLS**

> Supabase is ABLE's backend when the product graduates beyond localStorage. This file covers everything needed to configure the project, wire up auth, and migrate local data. The complete SQL schema and RLS policies live in `docs/systems/data-architecture/SPEC.md`. This file covers the integration layer: how client code talks to Supabase, what keys are safe where, and what to do first.

---

## Project details

| Key | Value |
|---|---|
| Project URL | `https://jgspraqrnjrerzhnnhtb.supabase.co` |
| Anon key | `sb_publishable_pRmYph3-GYIeZEeKyY1_sg_5sOPkQp_` |
| CDN (no npm) | `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>` |

**Anon key:** Safe to include in client-side HTML. Row Level Security (RLS) policies enforce access control — the anon key alone cannot read private data.

**Service role key:** Never in HTML files. Netlify functions only. Bypasses all RLS policies. Get it from Supabase Dashboard → Project Settings → API → `service_role`.

---

## What Supabase handles for ABLE

- **Auth:** Magic link email authentication for artists (and eventually fans)
- **Database:** All persistent data once artists are authenticated — profiles, fans, events, clicks, views
- **Storage:** Artist artwork, avatar images (Phase 2 — not built yet)
- **Realtime:** Live updates for fan.html feed (Phase 3 — not built yet)

---

## Tables (summary)

Full SQL definitions with all columns, indexes, and constraints are in `docs/systems/data-architecture/SPEC.md §2`. Summary for quick orientation:

| Table | Maps from localStorage | Primary use |
|---|---|---|
| `profiles` | `able_v3_profile` | Artist profile data — name, bio, accent, theme, CTAs, state |
| `fans` | `able_fans` | Fan sign-ups — email, source, opt-in, starred status |
| `events` | `able_shows` | Show/gig data — venue, date, tickets |
| `clicks` | `able_clicks` | CTA tap events for artist analytics |
| `views` | `able_views` | Page view events for artist analytics |
| `ui_preferences` | `able_dismissed_nudges` | UI state (dismissed nudges) — not exported, not critical |

**Note on localStorage keys:** These map 1:1 to Supabase tables. Do not rename localStorage keys — the migration function depends on this alignment.

---

## Auth flow: magic link

ABLE uses magic link (OTP email) for authentication. No passwords. No Google/Apple OAuth. This is a confirmed product decision.

```javascript
// Add to HTML pages that need auth (start.html step 3, admin.html sign-in)
const { createClient } = supabase;
const client = createClient(
  'https://jgspraqrnjrerzhnnhtb.supabase.co',
  'sb_publishable_pRmYph3-GYIeZEeKyY1_sg_5sOPkQp_'
);

// Trigger magic link
async function sendMagicLink(email) {
  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'https://ablemusic.co/admin.html',
    },
  });
  if (error) throw error;
  // Show: "Check your email — a sign-in link is on its way."
}

// On admin.html load — check for existing session
client.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    // Artist is authenticated
    // Call flushToSupabase(client, session.user.id) to migrate localStorage data
  }
});
```

Supabase stores the session token in localStorage automatically. The artist stays signed in until the token expires or they sign out.

---

## Data migration: localStorage → Supabase

On first sign-in, local data is flushed to Supabase tables using `flushToSupabase()`. The full reference implementation is in `docs/systems/data-architecture/SPEC.md §3`.

```javascript
// Called once, immediately after SIGNED_IN event
async function flushToSupabase(supabaseClient, artistId) {
  // Upserts: profile, fans, shows
  // Skips: clicks/views (flush separately, analytics are lower priority)
  // Returns: { success: boolean, errors: [] }
}
```

After migration, localStorage becomes a write-through cache. Reads continue from localStorage for performance; writes go to both localStorage and Supabase.

---

## Row Level Security (RLS)

**RLS must be enabled before the project is live.** Without it, all data in all tables is publicly readable and writable.

Key policies (full SQL is in `docs/systems/data-architecture/SPEC.md §2`):

```sql
-- Profiles: public can read (fan-facing pages need this)
--           only the artist can write their own profile
CREATE POLICY "profiles: public read"
  ON profiles FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "profiles: artist update"
  ON profiles FOR UPDATE USING (auth.uid() = artist_id);

-- Fans: anyone can insert (sign-up from able-v7.html is unauthenticated)
--       only the artist who owns the fans can read them
CREATE POLICY "fans: public insert"
  ON fans FOR INSERT WITH CHECK (true);

CREATE POLICY "fans: artist read own"
  ON fans FOR SELECT USING (
    artist_id IN (SELECT id FROM profiles WHERE artist_id = auth.uid())
  );

-- Clicks and views: anyone can insert (fan taps), only artist can read
CREATE POLICY "clicks: public insert"  ON clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "views: public insert"   ON views  FOR INSERT WITH CHECK (true);
```

---

## Writing data from client pages

Once auth is wired, client pages write to Supabase using the anon client. RLS ensures each artist can only affect their own rows.

```javascript
// Save profile after admin.html edit
async function syncProfile() {
  const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  const { data: { user } } = await client.auth.getUser();
  if (!user) return; // not authenticated — stay in localStorage-only mode

  await client.from('profiles').upsert({
    artist_id: user.id,
    name: profile.name,
    accent: profile.accent,
    // ... other fields mapped from AbleProfile interface
    updated_at: new Date().toISOString(),
  }, { onConflict: 'artist_id' });
}

// Fan sign-up (unauthenticated write — RLS allows this)
async function writeFanToSupabase(fan, artistProfileId) {
  await client.from('fans').upsert({
    artist_id: artistProfileId,
    email: fan.email,
    source: fan.source,
    opt_in: fan.optIn ?? false,
    signed_up_at: new Date(fan.ts).toISOString(),
  }, { onConflict: 'artist_id,email', ignoreDuplicates: true });
}
```

---

## Required environment variables (for Netlify functions)

```
SUPABASE_URL               → https://jgspraqrnjrerzhnnhtb.supabase.co
SUPABASE_SERVICE_ROLE_KEY  → Supabase Dashboard → Project Settings → API → service_role
```

Client-side code uses the anon key directly in HTML (it is safe to be public).

---

## Current score and path to complete

**Score: 3/10 → 9/10**

This is the single biggest backend gap.

What exists: project configured, anon key and URL known, CDN available.

What needs doing — in this order:
1. Run the SQL from `docs/systems/data-architecture/SPEC.md §2` in Supabase SQL editor to create all tables
2. Enable RLS on all tables and apply the policies from the same file
3. Configure Supabase magic link email template with ABLE-voice copy (see `docs/apis/resend.md`)
4. Wire `signInWithOtp()` into `admin.html` sign-in flow
5. Implement `onAuthStateChange` handler to call `flushToSupabase()` on first sign-in
6. Migrate all admin.html write operations to dual-write (localStorage + Supabase)
7. Migrate all fan sign-up writes in `able-v7.html` to write to both localStorage and Supabase `fans` table
