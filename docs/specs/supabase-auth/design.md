# Supabase Auth — Design
**Feature:** Magic link authentication for artists
**Status:** Draft — pending requirements approval
**Depends on:** requirements.md approved

---

## Supabase project

- URL: `https://jgspraqrnjrerzhnnhtb.supabase.co`
- Anon key: `sb_publishable_pRmYph3-GYIeZEeKyY1_sg_5sOPkQp_`
- CDN (no npm needed): `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`

---

## Data model

### localStorage → Supabase mapping

| localStorage key | Supabase table | Notes |
|---|---|---|
| `able_v3_profile` | `profiles` | Row keyed to `auth.users.id` |
| `able_fans` | `fans` | Rows keyed to `artist_id` |
| `able_clicks` | `clicks` | Rows keyed to `artist_id` |
| `able_views` | `views` | Rows keyed to `artist_id` |
| `able_shows` | `events` | Rows keyed to `artist_id` |
| `able_clips` | `clips` | Rows keyed to `artist_id` |
| `able_tier` | `profiles.tier` | Stored on the profile row |
| `able_gig_expires` | `profiles.gig_expires` | Unix timestamp on profile |

`able_dismissed_nudges` and `admin_visit_dates` remain localStorage-only (device-specific UI state, not worth syncing).

### Supabase `profiles` table (key columns)

```sql
id          uuid  references auth.users not null primary key
handle      text  unique not null
name        text
bio         text
accent      text  default '#e05242'
theme       text  default 'dark'
tier        text  default 'free'
gig_expires bigint
state_override text
release     jsonb
ctas        jsonb
platform_links jsonb
created_at  timestamptz default now()
updated_at  timestamptz default now()
```

---

## Sign-in UI

### Location
`admin.html` — shown when no active session is detected on page load.

### States

**State 1 — Sign-in prompt** (no session)
```
[ABLE wordmark]
"Sign in with your email."
[email input]
[Send link →]
```
- Amber `--acc` send button
- No password field
- No Google/Apple buttons — ever
- Below the input: "We'll send a one-click link. No password needed."

**State 2 — Link sent** (after form submit)
```
"Check your email."
"A sign-in link is on its way to [email]."
[Resend ↗]  (shows after 60s)
```

**State 3 — Error** (send failed)
```
"Couldn't send that link."
"Check the address and try again."
```
- Specific error message — never silent failure

### Sign-out
- Sidebar: artist name + "Sign out" (small, below avatar)
- Confirm: no dialog — single tap signs out
- Post sign-out: redirect to sign-in prompt; localStorage preserved

---

## Auth flow (technical)

```javascript
// Init on every page
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check session on admin.html load
const { data: { session } } = await supabase.auth.getSession();
if (!session) showSignIn();
else initDashboard(session.user);

// Send magic link
await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.href } });

// Listen for auth state changes (handles redirect after clicking link)
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') initDashboard(session.user);
  if (event === 'SIGNED_OUT') showSignIn();
});
```

---

## Data sync strategy

### Write path (admin.html mutations)
All save functions (`saveProfile()`, `saveShow()`, `saveSnapCard()`, etc.) currently write to localStorage. After auth:
1. Write to localStorage first (immediate UI feedback)
2. Then async write to Supabase
3. On Supabase error: queue for retry, surface toast "Saved locally. Will sync when online."

### Read path (able-v7.html — public profile)
Public profiles must read from Supabase (not visitor's localStorage):
1. Extract `handle` from URL path
2. Query `profiles` table: `SELECT * FROM profiles WHERE handle = $handle`
3. Query related tables: `events`, `clips`, `fans` (count only — no PII on public page)
4. Fall back to `able_v3_profile` localStorage only if Supabase unreachable

### First sign-in migration
```javascript
async function migrateToSupabase(userId) {
  const profile = safeGet('able_v3_profile');
  const fans = safeGet('able_fans') || [];
  const shows = safeGet('able_shows') || [];
  const clips = safeGet('able_clips') || [];

  // Upsert profile
  await supabase.from('profiles').upsert({ id: userId, ...profile });

  // Batch insert fans, shows, clips
  if (fans.length) await supabase.from('fans').upsert(fans.map(f => ({ ...f, artist_id: userId })));
  if (shows.length) await supabase.from('events').upsert(shows.map(s => ({ ...s, artist_id: userId })));
  if (clips.length) await supabase.from('clips').upsert(clips.map(c => ({ ...c, artist_id: userId })));

  safeSet('able_migration_done', true);
}
```

---

## Error states

| Scenario | User sees | System does |
|---|---|---|
| Supabase unreachable on sign-in | "Couldn't reach the server. Try again in a moment." | No action |
| Magic link expired (1hr TTL) | "That link has expired. Sign in again." | Supabase auto-handles; redirect to sign-in |
| Session expired mid-session | Amber toast: "Session expired. Sign in again →" | Clears session, shows sign-in in sidebar |
| Sync write fails | Toast: "Saved locally. Will sync when online." | Queue write to localStorage key `able_sync_queue` |
| Migration fails mid-way | Toast: "Setup incomplete. Some data may not be synced." | Flag `able_migration_partial`, retry on next load |

---

## Copy decisions

- Sign-in heading: "Sign in with your email." (not "Welcome to ABLE" / "Log in")
- Link sent: "Check your email." (not "We sent you an email!")
- Sign-out button: "Sign out" (not "Log out" / "Disconnect")
- Session expired toast: "Session expired. Sign in again →" (not "You've been logged out")
