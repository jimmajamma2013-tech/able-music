# ABLE — Fan Dashboard Spec (fan.html)
**Version: 1.0 | Created: 2026-03-13 | Build phase: Phase 12**

The fan dashboard is the second most important surface in ABLE after the artist profile. It is where fans live — where they check on artists they care about, find out what's happening, and feel close without being marketed to.

**The guiding principle:** The fan dashboard should feel like a well-curated morning briefing, not a social feed. Finite, personal, done in 60 seconds.

---

## What fans want (from USER_RESEARCH.md)

1. **What's new** — did any artist I follow drop something or announce a show?
2. **What's nearby** — is anyone playing near me this week?
3. **Am I close** — what's my relationship with the artists I care about?
4. **Easy way in** — if something is interesting, get me there in one tap

What fans do NOT want:
- Infinite scroll
- Algorithmic recommendations from strangers
- Notifications they didn't ask for
- Pressure to upgrade or spend money

---

## Page structure

### URL: `ablemusic.co/me` (authenticated fan) or `ablemusic.co/fan` (unauthenticated → sign-up prompt)

### Authentication
- Magic link email (same system as artist auth)
- Fan account auto-created on first email sign-up on any artist page
- If a fan has signed up to ≥1 artist, they can activate their fan dashboard by clicking a link in any ABLE confirmation email
- No password. No separate sign-up step. The email they used IS their account.

---

## Sections (in order, mobile-first)

### 1. Header bar (56px, fixed top)

```
[ABLE wordmark — small]          [Fan avatar initials]
```

- No back button (this is the home)
- Avatar taps to open fan settings sheet

---

### 2. Today strip (conditional — only shown if there is something new)

```
Today · Thursday                                4 updates
─────────────────────────────────────────────────────────
○  Mara J.          New single — "Dissolve"    12 mins ago
○  Cleo Sol         Playing London in April     2 hrs ago
○  Novo Amor        New EP out Friday           Yesterday
○  Loyle Carner     Merch drop — ltd run        Yesterday
```

- Date-grouped: **Today** / **This week** / **Last week**
- Type chips: coloured dots — `#e05242` release, `#fbbf24` event, `#7ec88a` merch, `var(--color-accent)` message
- **Maximum 7 days back.** Older items do not appear. When exhausted: "You're all caught up." — honest, respectful.
- Tap any row → opens that artist's profile at the relevant section (releases, events, etc.)
- **No infinite scroll.** This is a briefing, not a feed.

---

### 3. Artists you follow (horizontal scroll strip)

```
 [Mara J.]   [Novo Amor]   [Cleo Sol]   [Loyle Carner]   +
  Supporter    Listener      Fan           Fan
```

- Circular avatar (64px)
- Tier badge below name — no number, just name
- Ordered by: artists with updates first, then alphabetical
- `+` opens artist search (search all ABLE artists by name — not algorithmic discovery)
- Tap artist → goes to their profile

---

### 4. Upcoming shows (geo-aware)

```
Shows near you
──────────────────────────────────────────
Mara J.              Bristol, SWX          Fri 21 Mar
Cleo Sol             London, Roundhouse    Sat 5 Apr
Novo Amor            Manchester, O2 Ritz   Sun 13 Apr
```

- Powered by Bandsintown events synced to artist profiles
- Only shows from artists the fan follows
- Geo-aware: fan's city inferred from IP on first load (not stored, not tracked) — can be manually set in settings
- If no shows near them: "No shows near you right now. Check back as tours are announced."
- Tap event → opens artist profile at the Shows section (tickets CTA is there)

---

### 5. Your status (superfan progress cards)

One card per artist followed. Collapsed into a horizontal strip by default; expand to see all.

```
Mara J.
You're a Supporter  ●●●○○
Next: Superfan → early ticket access
```

- Only shown for artists where the fan has a score above Listener
- Listeners see nothing here — not shown, not teased. You earn visibility by engaging.
- Progress bar fills toward next tier
- Tap → opens artist profile with fan capture re-confirm (deepens the relationship)

---

### 6. New releases from followed artists (condensed list)

```
New music
──────────────────────────────────────────
[artwork]  Dissolve — Single          Mara J.       3 days ago
[artwork]  Unravel (EP)               Novo Amor     5 days ago
[artwork]  Dream in Blue              Jordan Rakei   1 week ago
```

- Last 30 days only
- Tap → opens artist profile at Listen section
- If no new music in 30 days: hide section entirely. Never show an empty section.

---

### 7. Fan settings (bottom sheet, tap avatar to open)

```
Your ABLE
─────────────────────────────────
Email          amara@example.com
City           Bristol  [edit]

Notifications
☑ New music from artists I follow
☑ Shows near me
☐ Merch drops
☐ Messages from artists

Artists I follow (12)       [manage]
Fan since                   March 2026

Export my data              [CSV]
Delete my account           [delete]
```

- Notification preferences stored in localStorage (pre-backend) then synced
- "Export my data" gives them their full engagement history across all artists — ABLE's data portability promise extends to fans too
- "Delete my account" is one confirmation dialog, then gone. No dark patterns.

---

## Data model

```js
// Fan account — stored in able_fan_account
{
  email: 'amara@example.com',
  created: 1741875600000,
  city: 'Bristol',               // optional, fan-set
  notifPrefs: {
    newMusic: true,
    shows: true,
    merch: false,
    messages: false
  },
  followedArtists: [             // derived from able_fans across all artists
    {
      handle: 'maraj',
      artistName: 'Mara J.',
      joinedTs: 1741875600000,
      source: 'instagram',
      tier: 'supporter',
      score: 712
    }
  ],
  lastSeen: 1741960000000
}
```

The `followedArtists` array is constructed from the fan's email existing in each artist's `able_fans` list. Pre-backend: the fan dashboard is only possible when hosted (not local file) because it needs to cross-reference multiple artist fan lists. In localStorage-only mode, show only the artist whose page the fan is currently viewing.

---

## Technical notes for Phase 12 build

- **Auth gate**: If `able_fan_token` is absent from localStorage, show sign-in prompt: "Enter the email you used to follow an artist" → sends magic link → sets `able_fan_token`.
- **No SSR required**: All fan data fetchable client-side via API routes (see BACKEND_SCHEMA.md). Single-page JS app patterns work fine.
- **Performance**: Digest view loads from a single `GET /api/fan/feed` call that returns pre-aggregated updates. Not N calls to N artist profiles.
- **OG meta for fan.html**: `<meta property="og:title" content="Your artists on ABLE">` — no fan-specific data in OG (privacy).
- **fan.html is NOT able-v5.html** — it is a separate file. A fan who taps an artist in their dashboard is taken to that artist's `able-v5.html` profile, not a fan-specific view of it.

---

## Empty states (all in fan voice — no template language)

| State | Copy |
|---|---|
| No artists followed | "Sign up on an artist's page to see them here." (with a search field below) |
| No updates today | "Nothing new today. Check back tomorrow." |
| No shows near you | "No shows near you right now. Check as tours are announced." |
| No recent releases | section hidden entirely |
| Account not activated | "You're already on [Artist]'s list. Tap to see all your artists." |

---

## What fan.html is NOT

- Not a social network. Fans don't see each other.
- Not a discovery engine. Artists appear because the fan chose them.
- Not a notification spam machine. No red badges, no push unless opted in.
- Not a store. No "buy this" pressure. Merch drops are mentioned; that's it.

---

*Fan dashboard build: Phase 12. Do not build before Phase 11 (press pack) is complete. The fan-facing infrastructure (fan capture, sign-up flow, email delivery) must be solid before building the dashboard on top of it.*
