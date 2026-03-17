# ABLE — Freelancer Auth + Features: Path to 10/10
**System:** Freelancer Auth + Features
**Date:** 2026-03-16

---

## Current state assessment

The base freelancer spec (FREELANCER_SPEC.md) is solid on profile components and the discovery mechanism. The auth architecture decision is locked (magic link primary, Discord optional — see SPEC.md §1.2). Extended features (Discord, before/after player, advanced enquiry analytics, specialisms for discovery) are fully specced.

**Spec quality: 9/10** (all major decisions resolved, implementation-ready)
**Execution: 0/10** (auth not configured, credits not built, Discord not connected, profile claiming not built)
**System score: 4/10** (the spec raises the floor; the execution gap holds it here)

---

## Path to 10 — exact implementation order

The implementation order is non-negotiable. Each step has a hard dependency on the previous one. Building out of order creates either broken flows or expensive retroactive migrations.

---

### Pre-work: Add `credits[]` to artist release data model in admin.html
**Required before any freelancer is invited. Not a freelancer-phase item — a now item.**
**Score impact: unblocks the whole system**

Before any freelancer joins the platform, artist release cards need a `credits` array field. Every release card created without this field will require a retroactive migration later. This is the one step with a time-sensitive window.

**What to add to the release object in admin.html:**
```javascript
// In the release/music section data model, add:
credits: [
  // { name: 'Maya Beats', role: 'Production', handle: null }  // before freelancer joins
  // { name: 'Maya Beats', role: 'Production', handle: 'maya-beats' }  // after they join
]
```

The `handle` field is null until a matching freelancer account exists. When it is populated, the release card renders the credit as a live link. When null, it renders as plain text. The field costs nothing to add and unlocks the entire "discovered via credits" growth mechanic.

**Admin.html change:** In the release/music add form, add a credits field:
```html
<div class="rel-credits-list" id="relCreditsList"></div>
<button class="rel-add-credit-btn" onclick="addRelCredit()">+ Add credit</button>
```
With a small sub-form per credit: name (text), role (text, auto-suggested from specialism taxonomy).

---

### Step 1: Magic link auth — one auth system, two profile types
**Moves score to: 7/10** (spec + working auth is a significant jump)

The same Supabase magic link system that serves artists also serves freelancers. One auth implementation, not two. The only difference is a `profile_type` field set at account creation.

**Supabase Auth configuration:**
1. Enable "Email" provider in Supabase Auth dashboard (Settings → Auth → Providers)
2. Set redirect URL: `https://ablemusic.co/auth/callback` (and `http://localhost:3000/auth/callback` for development)
3. Customise the magic link email template (Supabase Auth → Email Templates):
   - Subject: "Sign in to ABLE"
   - Body: "Here's your sign-in link. It expires in 10 minutes. If you didn't request this, ignore it."

**Account creation flow:**
```javascript
// freelancer-start.html Step 1 — role selection triggers account creation
async function createFreelancerAccount(email, roles) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: 'https://ablemusic.co/auth/callback?type=freelancer',
      data: {
        profile_type: 'freelancer',
        roles: roles,  // ['producer', 'mixing_engineer'] etc
      }
    }
  })
  if (error) throw error
  showMagicLinkSentUI(email)
}
```

**Profile record created on first sign-in (auth callback handler):**
```javascript
// In the auth callback page (auth/callback.html or handled in each page's DOMContentLoaded):
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session) {
    const profileType = session.user.user_metadata?.profile_type || 'artist'
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', session.user.id)
      .maybeSingle()

    if (!existing) {
      // First sign-in — create profile record
      await supabase.from('profiles').insert({
        id:           session.user.id,
        email:        session.user.email,
        profile_type: profileType,
        handle:       null,  // set in Step 2 of wizard
        created_at:   new Date().toISOString(),
      })
    }

    // Route to correct dashboard
    if (profileType === 'freelancer') {
      window.location.href = '/freelancer-start.html'
    } else {
      window.location.href = '/start.html'
    }
  }
})
```

**Supabase profile schema additions for freelancer:**
```sql
-- Add to profiles table:
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_type text DEFAULT 'artist';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS roles text[];           -- ['producer', 'mixing_engineer']
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS primary_specialism text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location_city text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS availability_status text DEFAULT 'open';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS availability_from date;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS rate_card jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS portfolio jsonb[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS discord_user_id text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS discord_username text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS discord_in_able_server boolean DEFAULT false;
```

**freelancer-start.html wizard:** 5 steps per SPEC.md §8. The partial profile is saved at each step so the freelancer can resume if they abandon mid-wizard. Account creation happens at Step 1 (email + role selection) — the profile is live from that point, even if incomplete.

**Score rationale:** Working auth + profile schema + wizard = the freelancer can exist on the platform. Every subsequent feature (credits, Discord, booking) builds on this foundation. 7/10 because the profile is live but no credits exist yet, making the profile itself low-value.

---

### Step 2: Credit verification system — both flows, full state machine
**Moves score to: 9/10**

This is the most important step. Credits are what makes the freelancer profile valuable. A profile with confirmed credits from artists the fan already loves is a trusted referral. A profile without credits is an anonymous self-claim.

**Supabase credits table:**
```sql
CREATE TABLE credits (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  freelancer_id    uuid REFERENCES profiles(id) ON DELETE CASCADE,
  artist_id        uuid REFERENCES profiles(id),           -- null if artist not on ABLE
  release_id       text,                                    -- references release record
  release_title    text NOT NULL,
  artist_name      text NOT NULL,
  freelancer_name  text NOT NULL,                          -- how they're credited on the release
  role             text NOT NULL,                          -- 'Production', 'Mixing', etc.
  state            text DEFAULT 'pending',                 -- 'confirmed' | 'pending' | 'unverified'
  initiated_by     text NOT NULL,                          -- 'freelancer' | 'artist'
  confirmed_at     timestamptz,
  expires_at       timestamptz,                            -- 30 days from created_at for pending
  created_at       timestamptz DEFAULT now()
);
```

**Freelancer-initiated flow:**
1. Freelancer searches for a release or artist name in their credits dashboard
2. If artist is on ABLE: credit created as `pending`, `expires_at = now() + 30 days`
3. Artist receives in-app notification + email: "Maya Beats says she worked on your track '[title]'. Can you confirm?"
   - "Yes, she did" → `state = 'confirmed'`, `confirmed_at = now()`
   - "No, this isn't right" → credit deleted, freelancer notified: "The artist wasn't able to confirm this credit."
   - No response → at `expires_at`, cron job sets `state = 'unverified'`
4. If artist is not on ABLE: credit created as `unverified` immediately

**Artist-initiated flow (from admin.html release credits field):**
1. Artist edits a release and adds a credit: name + role, optional ABLE handle search
2. If freelancer is on ABLE: credit created as `pending` on freelancer's profile
3. Freelancer receives notification: "[Artist] credited you on '[release]'. Confirm you're happy to be associated with this release."
   - "Yes" → `state = 'confirmed'`
   - "No" → credit deleted, artist notified
4. Artist's confirmation is implicit in creating the credit — they don't need to confirm again

**Anti-abuse implementation:**
```javascript
// Rate limit check before creating a credit (server-side Supabase Edge Function):
const { count } = await supabase
  .from('credits')
  .select('id', { count: 'exact' })
  .eq('freelancer_id', userId)
  .eq('initiated_by', 'freelancer')
  .gte('created_at', new Date(Date.now() - 86400000).toISOString())

if (count >= 10) {
  throw new Error('You can add up to 10 credits per day.')
}

// Public profile cap: max 5 unconfirmed credits visible
// Implemented at render time, not in the database
```

**30-day pending expiry cron (Supabase Edge Function or n8n):**
```javascript
// Runs daily — expire pending credits older than 30 days:
await supabase
  .from('credits')
  .update({ state: 'unverified', confirmed_at: null })
  .eq('state', 'pending')
  .lt('expires_at', new Date().toISOString())
```

**Score rationale:** With working auth + credit verification, the freelancer profile has actual value. An engineer with 5 confirmed credits from artists on ABLE is discoverable and credible. 9/10 because the booking system, Discord, and premium features are not built — but the core value proposition is live.

---

### Step 3: Discord OAuth — optional connection, 3 scopes, Community badge
**Moves score to: 9.5/10**

Discord is added after credits because it is enrichment, not foundation. A freelancer with confirmed credits and no Discord badge is more valuable than a freelancer with Discord connected and no credits.

**Discord Developer Portal setup (one-time, done by James):**
1. Create application at `discord.com/developers/applications`
2. Add OAuth2 redirect URI: `https://ablemusic.co/auth/discord/callback`
3. Request only these scopes: `identify`, `email`, `guilds.members.read`
4. Store client ID and client secret in Netlify environment variables

**Frontend — "Connect Discord" button in freelancer settings:**
```javascript
function connectDiscord() {
  var params = new URLSearchParams({
    client_id:     DISCORD_CLIENT_ID,
    redirect_uri:  'https://ablemusic.co/auth/discord/callback',
    response_type: 'code',
    scope:         'identify email guilds.members.read',
    state:         generateRandomState(),  // CSRF protection
  })
  window.location.href = 'https://discord.com/api/oauth2/authorize?' + params
}
```

**Callback handler (Netlify serverless function — `netlify/functions/discord-callback.js`):**
```javascript
// Exchange code for access_token, then:
// 1. GET /api/v9/users/@me → get discord_user_id, username, avatar_url
// 2. GET /api/v9/users/@me/guilds/members/[ABLE_SERVER_ID] → check server membership
// 3. Store in Supabase profiles table
// 4. Redirect back to freelancer settings with success/error param
```

**Error states:**
- Discord API returns 503: "Discord is having issues right now — try again later. Your profile is not affected."
- User not in ABLE Discord server: connect succeeds, badge not shown, copy: "Join the ABLE Discord to get your Community badge."
- OAuth denied by user: no state change, return to settings.

The Discord DM booking notification (Phase 2) requires an ABLE Discord bot. That is a separate build item. The OAuth connection unlocks the badge immediately; DM notifications require the bot to exist.

---

### Step 4: Full profile, booking relay, and premium tier
**Moves score to: 10/10**

The remaining items (full portfolio including before/after player, booking relay, availability auto-expiry, full dashboard, discovery link analytics, premium tier) are Phase 3 items. They require the auth and credits foundation to be solid first.

**Full details in PATH-TO-10.md Steps 5–8 (original numbering, unchanged).**

---

## The dependency chain stated clearly

```
NOW:
add credits[] to admin.html release data model
                ↓
PHASE 2:
enable Supabase magic link auth (artists first, then freelancers)
                ↓
build freelancer-start.html wizard + profile schema
                ↓
build credits table + both verification flows + anti-abuse
(simultaneously: build artist-side credit-adding UI in admin.html)
                ↓
build profile claiming: new freelancer account → scan existing credits[] → match → convert plain text to link
                ↓
build "discovered via" link on artist release cards (live links for confirmed credits)
                ↓
Discord OAuth (optional, enrichment only)
                ↓
booking relay + availability auto-expiry + full dashboard
                ↓
premium tier + booking deposits (Stripe Connect)
```

Building Discord before credits is building the badge before the wall. Building profile claiming before artist credits[] exist means there is nothing to claim. The order protects against wasted work.

---

## Honest ceilings

**The credits system requires artist adoption first.** The freelancer profile is only as valuable as the credits backing it up. If there are 20 freelancers on ABLE but their artists haven't confirmed any credits, the profiles look weak. The credit confirmation flow must be a priority in artist onboarding, not an afterthought.

**Discord will help but won't be transformative.** The ABLE Community badge is a nice signal. Discord DM notifications are a genuine convenience. But the core value — verified credits, booking enquiries, professional profile — doesn't depend on Discord at all. Build Discord as enrichment, not infrastructure.

**The before/after player is genuinely differentiating** for mixing and mastering engineers. No other platform has this. It is a direct demonstration of skill, not a portfolio link. Prioritise building it correctly over building it fast.

**Free freelancers may strain infrastructure at scale.** If ABLE has 10,000 active freelancers on the free tier, the enquiry relay and notification systems become meaningful infrastructure costs. Model this before Scale. The Phase 2 Premium tier is partly a response to this — highly active freelancers who want analytics are also the ones most likely to value and pay for Premium.
