# Supabase Auth — Tasks
**Feature:** Magic link authentication for artists
**Status:** Draft — pending design approval
**Estimated total:** ~8 hours
**Depends on:** design.md approved

---

## Build order

Tasks must be completed in sequence. Each has a verification step before moving on.

---

### Task 1 — Add Supabase CDN to active pages
**File:** `able-v7.html`, `admin.html`, `start.html`
**Time:** 15 min
**What:** Add `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>` before the closing `</head>` in all three files. Add `const SUPABASE_URL` and `const SUPABASE_ANON_KEY` constants at the top of each file's main `<script>` block.
**Verify:** `grep -n "supabase-js@2" able-v7.html admin.html start.html` — three hits.

---

### Task 2 — Create Supabase `profiles` table
**File:** Supabase dashboard SQL editor (external task — James's manual step)
**Time:** 20 min
**What:** Run the SQL from `design.md` §Data model to create the `profiles` table with RLS policies.
```sql
-- RLS: artists can only read/write their own row
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "artist owns profile" ON profiles
  FOR ALL USING (auth.uid() = id);
-- Public profiles are readable by anyone
CREATE POLICY "public profile read" ON profiles
  FOR SELECT USING (true);
```
**Verify:** Supabase table editor shows `profiles` table with all columns.

---

### Task 3 — Sign-in UI in admin.html
**File:** `admin.html`
**Time:** 1.5 hr
**What:**
1. Add `#auth-screen` div with sign-in form (email input + "Send link →" button)
2. Add State 2 "Check your email" div (hidden by default)
3. Add State 3 error div (hidden by default)
4. CSS: match admin token set (`--bg`, `--acc`, `--font`)
5. Hide `#auth-screen` and show `#app-shell` when session is active

Copy exact strings from design.md — do not invent new copy.

**Verify:** Load admin.html with no localStorage. Sign-in screen appears. Sign-in screen is hidden when `able_session` exists (test with a mock).

---

### Task 4 — Magic link send function
**File:** `admin.html` (inline JS)
**Time:** 1 hr
**What:**
```javascript
async function sendMagicLink(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin + '/admin.html' }
  });
  if (error) showSignInError(error.message);
  else showLinkSent(email);
}
```
Add 60s resend timer. Handle the `SIGNED_IN` auth state change event to call `initDashboard()`.

**Verify:** In Supabase dashboard → Auth → Users — a test sign-in attempt appears. Email arrives in inbox within 60 seconds.

---

### Task 5 — Session check on admin.html load
**File:** `admin.html`
**Time:** 30 min
**What:** In `DOMContentLoaded`, before calling `renderProfile()`:
```javascript
const { data: { session } } = await supabase.auth.getSession();
if (!session) { showAuthScreen(); return; }
initDashboard(session.user);
```
Auth state listener handles sign-in redirect:
```javascript
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') { hideAuthScreen(); initDashboard(session.user); }
  if (event === 'SIGNED_OUT') { showAuthScreen(); }
});
```
**Verify:** Clear all storage, load admin.html — sign-in screen shown. Set a valid session token in cookies — dashboard loads.

---

### Task 6 — First sign-in migration
**File:** `admin.html`
**Time:** 1.5 hr
**What:** Implement `migrateToSupabase(userId)` from design.md. Call it when `SIGNED_IN` fires and `able_migration_done` is not set. Add error handling per design.md error states table.
**Verify:** Create a test artist with existing localStorage data. Sign in. Check Supabase dashboard → Table Editor → `profiles` row exists with correct data.

---

### Task 7 — Write path: save functions → Supabase
**File:** `admin.html`
**Time:** 2 hr
**What:** Update the 8 main save functions to write to Supabase after localStorage:
- `saveProfile()` → upsert `profiles`
- `saveShow()` / `removeShow()` → upsert/delete `events`
- `saveSnapCard()` / `removeSnapCard()` → upsert/delete `snap_cards`
- `saveClip()` / `removeClip()` → upsert/delete `clips`
- Fan fan-write stays localStorage for now (V1 scope)

Pattern for each:
```javascript
async function saveProfile() {
  const profile = buildProfileObject();
  safeSet('able_v3_profile', profile); // immediate
  try {
    await supabase.from('profiles').upsert({ id: currentUserId, ...profile });
  } catch (e) {
    queueSync('profiles', profile); // retry queue
  }
}
```
**Verify:** Make a profile change in admin. Check Supabase → profiles table — row updated within 2 seconds.

---

### Task 8 — Read path: able-v7.html reads from Supabase
**File:** `able-v7.html`
**Time:** 1.5 hr
**What:** Extract `handle` from URL. Fetch from Supabase before falling back to localStorage:
```javascript
async function loadProfileData() {
  const handle = getHandleFromURL(); // e.g. 'maya' from ablemusic.co/maya
  if (handle) {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('handle', handle).single();
      if (data) return data;
    } catch (e) { /* fall through to localStorage */ }
  }
  return safeGet('able_v3_profile');
}
```
**Verify:** Set a profile in Supabase directly. Load able-v7.html?handle=testartist. Profile data from Supabase renders correctly.

---

### Task 9 — Sign-out
**File:** `admin.html`
**Time:** 20 min
**What:** Add "Sign out" below the artist name in the sidebar. Wire to `supabase.auth.signOut()`. Post sign-out: `showAuthScreen()`, do NOT clear localStorage.
**Verify:** Sign out. Auth screen shows. Load admin.html fresh. Sign-in screen shown (not dashboard). localStorage `able_v3_profile` still exists.

---

## Post-build verification

- [ ] Fresh device (clear all storage): sign in → data migrates → dashboard loads
- [ ] Second device: sign in → Supabase data loads → matches first device
- [ ] Supabase offline: admin.html loads from localStorage without error
- [ ] able-v7.html: public profile loads from Supabase by handle
- [ ] No Google OAuth button anywhere
- [ ] Copy exactly matches design.md strings
- [ ] 375px: sign-in screen has no horizontal scroll, email input ≥ 44px

## Known dependencies (pre-auth tasks that must be done first)

- `able_sync_queue` key added to CONTEXT.md data architecture table
- Supabase tables created (Task 2 — James's manual step)
- `RESEND_API_KEY` set in Netlify env (for fan confirmation emails post-auth)
