# ABLE Label Tier — Admin UX Spec
**Created: 2026-03-16 | Status: PRE-BUILD — authoritative for first Label customer**
**Applies to: admin.html, Supabase schema, Stripe billing**

This document specifies the Label tier (£49/month) UX and data architecture. It does not exist yet. Read it before the first Label customer signs up, and build from it directly when that milestone is reached.

---

## 1. Account model

### Recommendation: Parent account with managed artist slots

A Label account is a single Supabase user (one email address, one magic link login) that owns a collection of artist `profiles` rows — up to 10. These are called **managed profiles**.

This is the simpler V1 approach. The alternative — separate artist accounts under a parent organisation — requires an `organisations` table, invite flows, separate auth for each artist, and a permission checking layer on every API call. That is a meaningful build and should be deferred to V2.

**V1 model:**

```
label_account (Supabase auth user)
  └─ profiles (up to 10 rows, profile_type = 'artist')
       Each profile is a full artist profile
       All owned by the same auth.uid
```

**Supabase schema addition:**

```sql
-- Add to profiles table
ALTER TABLE profiles ADD COLUMN label_owner_id TEXT REFERENCES auth.users(id);
ALTER TABLE profiles ADD COLUMN label_slot_index INTEGER; -- 1–10, null if not label-managed

CREATE INDEX idx_profiles_label_owner ON profiles(label_owner_id);
```

`label_owner_id` is set to the Label account's Supabase auth UID when the label manager creates or claims an artist profile. For solo artists on any other tier, this field is NULL.

**localStorage (pre-Supabase):**

The existing `able_tier` key is used. When `able_tier === 'label'`, a second key `able_label_profiles` stores the array of managed profiles:

```javascript
// able_label_profiles — JSON array, up to 10 entries
[
  { id: 'uuid-1', name: 'Luna', handle: 'luna', slot: 1 },
  { id: 'uuid-2', name: 'Marz', handle: 'marz', slot: 2 }
]

// able_active_profile_id — string UUID
// Which profile is currently in context in admin.html
'uuid-1'
```

**All existing localStorage keys (`able_v3_profile`, `able_fans`, `able_clicks`, etc.) continue to work as-is.** When a label manager switches profiles, the active keys are swapped out in memory (or prefixed by profile ID). See §3 for the switching mechanism.

---

## 2. Profile switcher

### 2.1 Where it lives

The profile switcher appears in the **admin header** — the top bar of admin.html. It is always visible when `able_tier === 'label'` and `able_label_profiles.length > 1`.

Single-artist accounts (Free, Artist, Artist Pro) never see this component. It does not appear in their admin.

### 2.2 Component design

**A compact dropdown in the header bar, left side, next to the ABLE wordmark.**

Not a sidebar or tab bar. Rationale:
- Tab bars would collapse the existing admin bottom navigation on mobile
- A sidebar for 10 artists adds too much chrome for a single admin session
- A dropdown is fast, obvious, and takes zero persistent space

```
[ABLE]  [Luna ▾]  ···  [Home] [Fans] [Analytics] [More]
```

When tapped, the dropdown opens as a **bottom sheet on mobile**, an **inline dropdown on desktop** (320px wide, anchored to the switcher button).

### 2.3 Bottom sheet content (mobile)

```
────────────────────────────
  Your artists               [+ Add artist]
────────────────────────────

  ● Luna                     ← active (amber dot)
    luna.able.fm · 847 fans

  ○ Marz
    marz.able.fm · 312 fans

  ○ Concrete Cities
    concretecities.able.fm · 1,204 fans

  ○ Empty slot (4/10 used)   ← greyed, tappable to create
  ○ Empty slot
  ...
────────────────────────────
  Manage billing   →
  Label overview   →
────────────────────────────
```

- Active profile has an amber dot and is visually distinct (slightly brighter row)
- Tapping any other artist switches immediately — no confirmation required
- The "+ Add artist" button in the top-right corner opens the onboarding wizard (start.html) in label-managed mode (see §6)
- "Empty slot" rows are shown so the manager can see remaining capacity (e.g. "4/10 used")
- "Label overview" navigates to the aggregate analytics view (see §3)

### 2.4 Switching behaviour

When a manager taps a different artist:

1. The sheet closes
2. The admin header updates to show the new artist name
3. The admin page re-renders to show that artist's data
4. `able_active_profile_id` updates to the new profile UUID
5. All localStorage reads for the session context now resolve against the selected profile

**No page reload.** Switching is in-memory: `switchToProfile(profileId)` reads the selected profile's data from localStorage (keyed by profile ID, e.g. `able_profile_uuid-2`) and updates the view.

**localStorage key strategy for multi-profile:**

Solo artists: `able_v3_profile`, `able_fans`, etc. (existing, unchanged)

Label-managed profiles: `able_profile_${id}`, `able_fans_${id}`, `able_clicks_${id}`, `able_views_${id}`, etc.

When the backend lands, this is replaced by fetching per `profile_id` from Supabase — same structure, different data source.

### 2.5 Performance

Profile data is loaded once per session into a JS object keyed by profile ID. Switching is a synchronous lookup — there is no network call per switch. The aggregate analytics view (§3) loads all profiles on initial page load.

---

## 3. Aggregate analytics dashboard

### 3.1 Entry point

"Label overview" link in the profile switcher bottom sheet. Also accessible from a persistent "Overview" tab in the admin navigation (Label tier only — hidden on all other tiers).

### 3.2 What a manager sees

The label overview is a single-scroll page. It does not replace any artist's individual admin — it is a read-only bird's-eye view.

**Layout:**

```
────────────────────────────────────────
  Your artists
  [7 days ▾]           ← time window filter

  Total fans     Total views   Total clicks
  2,363          18,240        4,107

────────────────────────────────────────
  Artists                  Fans   Views   CTR
  ──────────────────────────────────────
  Luna             ████░   847    6,420   18%
  Concrete Cities  ███░░   1,204  8,180   15%
  Marz             █░░░░   312    3,640   9%
────────────────────────────────────────
  Recent activity
  ──────────────────────────
  8 min ago   Marz — new fan (TikTok)
  14 min ago  Luna — 12 views (spike)
  1 hr ago    Concrete Cities — new fan (direct)
────────────────────────────────────────
```

**Stat row (top):** Three counts. Calculated as a sum across all managed profiles for the selected time window. Time window options: 7 days (default), 30 days, all time.

**Artist table:** One row per managed profile, sorted by fan count descending. Each row shows:
- Artist name
- A proportional bar chart (width relative to highest-fan artist = 100%)
- Total fans (all time)
- Page views (selected window)
- Click-through rate (clicks / views, selected window)
- Tapping any row navigates directly to that artist's admin (switches profile context)

**Recent activity feed:** Real-time event stream across all managed profiles. Shows the last 20 events chronologically. Each event is tagged with which artist it belongs to. Events: new fan sign-up, page view spike (>2x recent average), new release published, gig mode activated.

### 3.3 What is not shown here

Individual fan emails are never shown in the aggregate view. The fan count is the only fan data surfaced at the label level. See §7 for the explicit data isolation spec.

There are no broadcast controls here. Email broadcasts are always sent from within a specific artist's admin, never from the label overview.

---

## 4. Permissions model

### 4.1 V1: Label manager has full control

In V1, there is no granular permissions system. The Label account holder can do everything for every managed profile. If an artist wants to edit their own profile, the label manager shares the admin access (same login session) or the label manager edits on their behalf.

This is the correct V1 scope. Granular permissions add significant complexity (invite flows, role-based API checks, UI for managing team members) and are not required to deliver the Label tier's core value.

**Explicitly deferred to V2:** artist-level logins, read-only vs. read-write roles, restricting specific actions per artist.

### 4.2 V2 permissions model (spec for future build)

When the first label customer requests that their artists can log in separately, build this:

**Roles:**

| Role | Who has it | What they can do |
|---|---|---|
| `label_owner` | The billing account holder | Everything: create/delete artist profiles, manage billing, see aggregate analytics, full edit on all profiles |
| `label_manager` | Invited by label_owner | Full edit on all profiles, no billing access, no delete-profile |
| `artist_editor` | Invited, scoped to one profile | Edit their own profile only: bio, releases, events, merch, snap cards. Cannot see fan emails (that is label_manager and above) |
| `artist_viewer` | Invited, scoped to one profile | View-only: can see their own stats but not edit anything |

**V2 schema additions:**

```sql
CREATE TABLE label_members (
  id           TEXT PRIMARY KEY,
  label_owner_id TEXT NOT NULL REFERENCES auth.users(id),
  member_user_id TEXT NOT NULL REFERENCES auth.users(id),
  role         TEXT NOT NULL, -- 'label_manager' | 'artist_editor' | 'artist_viewer'
  profile_id   TEXT,          -- NULL = applies to all profiles; set = scoped to one
  invited_at   INTEGER NOT NULL,
  accepted_at  INTEGER,
  status       TEXT DEFAULT 'pending' -- 'pending' | 'active' | 'revoked'
);

CREATE INDEX idx_label_members_owner ON label_members(label_owner_id);
CREATE INDEX idx_label_members_member ON label_members(member_user_id);
```

**Invite flow (V2):**
1. Label owner opens admin → Settings → Team
2. Enters invitee's email, selects role, optionally scopes to a specific artist
3. ABLE sends a magic link invite email
4. Invitee clicks link, sets up their own ABLE login, and is added to the label's team
5. Their admin.html shows only the profiles they have access to

**This is a meaningful V2 build. Do not start until a label customer asks for it explicitly.**

---

## 5. Billing

### 5.1 One subscription, 10 profile slots

Label billing is a single Stripe subscription at £49/month. It covers up to 10 artist profiles under one account. There is no per-profile charge within the Label tier.

The 10-profile cap is enforced in the UI and API — not by Stripe. Stripe sees one subscription.

**Stripe objects:**

```
Customer: label@management-company.com
  └─ Subscription: able_label_monthly
       product:  prod_able_label
       price:    price_able_label_49gbp  (£49/month recurring)
       metadata:
         able_tier: label
         max_profiles: 10
```

The `stripe_customer_id` and `stripe_subscription_id` are stored on the **label owner's** profile row (the billing profile, not each artist profile).

```sql
-- Billing is attached to one profile row — the label account's own row
UPDATE profiles
SET
  stripe_customer_id = 'cus_xxx',
  stripe_subscription_id = 'sub_xxx',
  tier = 'label'
WHERE id = 'label-owner-profile-id';
```

### 5.2 What happens when subscription cancels

Stripe sends a `customer.subscription.deleted` webhook.

The webhook handler:
1. Finds all `profiles` rows where `label_owner_id` matches the cancelling customer
2. Sets their `tier` to `'free'` (or `'artist'` if they were previously on that tier — store previous tier in metadata)
3. Does not delete any data. The artist profiles remain, the fans remain, everything is preserved.
4. On next admin.html login, the label manager sees a banner: "Your Label plan has ended. Your artist pages are still here on the Free plan."

### 5.3 Over the 10-profile cap

The "+ Add artist" button in the switcher is disabled when `able_label_profiles.length >= 10`. Clicking it shows a message: "You've reached 10 artist pages. Get in touch if you need more."

There is no automatic upsell to a higher tier at V1 — email James directly. This will change if/when an Enterprise tier is added.

### 5.4 Proration (mid-cycle changes)

Not applicable for V1 — there is only one Label price point. If the manager upgrades from Artist Pro mid-cycle, Stripe handles proration automatically via its default behaviour (charge for remaining days at new rate, credit unused days at old rate).

---

## 6. Artist onboarding under Label

### 6.1 Two modes

A label manager can create an artist profile in two ways:

**Mode A — Label manager sets it up themselves.**
The most common flow at launch. The label manager goes through start.html on behalf of the artist. The resulting profile is immediately visible in their switcher.

**Mode B — Artist sets up their own profile, label manager claims it.**
Not built at V1. Defer. The complexity of a claim/invite flow is not justified until a label customer asks for it.

### 6.2 Label-managed onboarding flow (Mode A — V1)

1. Label manager is in admin.html, profile switcher open
2. Taps "+ Add artist"
3. start.html opens with a URL param: `?mode=label&owner=${labelOwnerId}`
4. Wizard runs as normal — name, vibe, accent colour, CTA type, release info
5. On completion, the new profile is created with `label_owner_id` set to the label manager's UID
6. Manager is redirected back to admin.html with the new profile auto-selected in the switcher

**One change to start.html for label mode:** The welcome heading changes from "Your page." to "A new artist page." The rest of the wizard is identical.

**Copy for the wizard header in label mode:**
- Step 1: "Who's the artist?" (not "What's your artist name?")
- Step 4 done screen: "Their page is ready." (not "You're live.")

This is the only copy change. No structural changes to start.html.

### 6.3 What the artist sees (before V2 permissions)

At V1, the artist does not have their own login. If the label manager wants the artist to be able to view or edit their admin, the label manager shares access directly (same session). This is a known limitation of V1 and is acceptable — most managed artists at this price point expect the label to handle the admin.

---

## 7. Data isolation

This section is explicit and non-negotiable. The rule is:

**Label managers can see aggregate stats across all their artists. They cannot see individual fan emails for any artist.**

### 7.1 What label managers can see

| Data | Accessible to label manager? |
|---|---|
| Fan count (total, per artist) | Yes |
| Page views (total, per artist) | Yes |
| CTA click counts (total, per artist) | Yes |
| Click-through rate | Yes |
| Recent activity feed (events, not emails) | Yes |
| Individual fan emails | No |
| Individual fan sign-up timestamps | No |
| Fan source attribution (Instagram, TikTok, etc.) | Only as aggregate breakdown (e.g. "42% from Instagram") — not per-fan |
| Fan tier (listener / fan / supporter / superfan) | Only aggregate distribution — not per-fan |

### 7.2 Why this matters

Artists sign their fans up using their own page. The fans are trusting the artist, not the label. Even if the label pays for the infrastructure, the fan relationship belongs to the artist. This is central to ABLE's product philosophy.

It is also a practical trust decision: if a label could see every fan's email, artists would be reluctant to use ABLE for fear of the label owning their audience. By making this a hard technical constraint, ABLE differentiates itself as a platform that protects artists.

### 7.3 Technical enforcement

**localStorage (V1):** Each artist's fan list is stored under a profile-scoped key (`able_fans_${profileId}`). The aggregate analytics view computes counts only — it never iterates over individual email addresses and never surfaces them in the UI.

**Supabase (when backend lands):** Row Level Security is the primary enforcement mechanism.

```sql
-- Fans table RLS
-- Artists can see their own fans (all fields)
CREATE POLICY "artist_can_read_own_fans" ON fans
  FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE id = auth.uid()
    )
  );

-- Label managers can count fans per profile but not read email fields
-- This requires a separate aggregate view or a restricted function
CREATE OR REPLACE FUNCTION label_fan_counts(p_label_owner_id TEXT)
RETURNS TABLE(profile_id TEXT, fan_count BIGINT) AS $$
  SELECT profile_id, COUNT(*) AS fan_count
  FROM fans
  WHERE profile_id IN (
    SELECT id FROM profiles WHERE label_owner_id = p_label_owner_id
  )
  GROUP BY profile_id;
$$ LANGUAGE sql SECURITY DEFINER;
```

The label manager's session only ever calls `label_fan_counts()` — a function that returns counts, not email rows. There is no RLS policy that grants label managers read access to the `fans` table's `email` or `gdpr_ip` columns.

**A label manager must never be able to construct a query that returns fan email addresses, even via a joins or the aggregate stats endpoint.**

---

## 8. V1 vs V2 scope

### 8.1 What is the minimum Label tier that's actually valuable?

A label manager's core need is: see all 10 artists in one place, switch between them quickly, understand which ones are performing. That is the whole value prop for V1.

**V1 label tier delivers:**
- [ ] Profile switcher (dropdown/bottom sheet) in admin header
- [ ] Up to 10 managed artist profiles under one login
- [ ] Label overview page: aggregate stats + artist table + activity feed
- [ ] Label-managed onboarding (label manager runs wizard on behalf of artist)
- [ ] One Stripe subscription covering all 10 profiles
- [ ] Data isolation: fan emails never shown at label level

**Estimated build time for V1 label tier:** 2–3 days of focused work once Supabase auth is live. The switcher is the largest UI piece (~half a day). The aggregate analytics view pulls from existing data structures (~1 day).

### 8.2 What is deferred to V2?

| Feature | Why deferred |
|---|---|
| Artist-level logins | Requires invite flows, role-based API checks, V2 permissions model |
| Permissions (read-only vs. edit) | Requires `label_members` table and per-action role checks |
| Label-level email broadcasts | Risky without explicit per-artist consent. Defer until product-legal review. |
| Bulk profile actions (e.g. change all artists to pre-release simultaneously) | Useful but not V1 scope — adds complexity to Campaign HQ |
| API access for label | Requires API key management, documented endpoints, rate limiting at label level |
| Aggregate CSV export (fan counts per artist) | Low demand, non-urgent |
| White-label domain (all 10 artists on one domain) | Year 2+ |
| Custom label branding in admin | Not needed until label accounts are in double digits |

### 8.3 The honest V1 bar

The Label tier is worth £49/month if a manager can:
1. Log in once and see all their artists
2. Switch between them in under 3 seconds
3. See at a glance which artist is doing best this week
4. Set up a new artist page without requiring the artist to be present

Everything else is nice-to-have. Build to that bar first.

---

## 9. New localStorage keys for Label tier

Following the existing key naming conventions (all keys map 1:1 to Supabase when backend lands):

| Key | Value | Purpose |
|---|---|---|
| `able_tier` | `"label"` | Existing key — triggers label UX |
| `able_label_profiles` | JSON array `[{id, name, handle, slot}]` | All managed artist profiles |
| `able_active_profile_id` | UUID string | Currently selected profile in admin |
| `able_profile_${id}` | Profile JSON | Per-artist profile data (mirrors `able_v3_profile` format) |
| `able_fans_${id}` | Fan array | Per-artist fan list |
| `able_clicks_${id}` | Click events array | Per-artist click tracking |
| `able_views_${id}` | View events array | Per-artist view tracking |
| `able_shows_${id}` | Shows array | Per-artist shows |
| `able_label_switcher_dismissed` | `"1"` | Whether switcher onboarding tooltip has been shown |

**Do not rename any of these keys once shipped.**

---

## 10. Open questions for the first Label customer

Before the first label signs up, resolve these:

1. **Does the artist's fan list belong to the label or the artist if the relationship ends?** Recommended answer: the artist. If the label account is deleted or the artist is removed from the label, that artist's profile and fans should be transferable to a standalone account. Spec the offboarding flow before the first label customer.

2. **Can a label manager broadcast to all artists' fans simultaneously?** Current recommendation is no (see §8.2). But confirm this with the first label customer's expectations before they sign up.

3. **What happens if a label wants 11+ profiles?** Current answer: contact us. Decide then whether to raise the cap, create a higher tier, or offer a per-seat model.

4. **Is the £49/month price right for V1?** It is £5/artist/month at full capacity (10 artists), vs. £9/month for a solo Artist tier. That is good value. Validate that label managers perceive it as fair before locking the price.

---

*This spec is the primary authority for the Label tier build. No Label UX should be implemented without aligning to this document first. Update it before implementing if anything here is wrong.*
