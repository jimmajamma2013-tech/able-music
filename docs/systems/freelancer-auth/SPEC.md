# ABLE — Freelancer Authentication + Extended Features Spec
**System:** Freelancer Auth + Features
**Version:** 1.0
**Date:** 2026-03-16
**Status:** ACTIVE — extends and upgrades FREELANCER_SPEC.md (v6 operational). Where this document conflicts, this document wins.

---

## 0. The freelancer proposition restated

Freelancers on ABLE are not social network users. They are professionals whose reputation is built on credited work. The discovery path is through the artists they've worked with — not through SEO, not through a directory, not through cold outreach.

**The key insight:** Every release a freelancer works on is a passive acquisition channel. Maya Beats produces a track for an ABLE artist. The credit is a live link. A fan who loves the production follows it. Another artist who wants that sound follows it. Maya doesn't need to market herself. The work speaks.

This changes the authentication requirement significantly: **the auth system must support peer-verified identity, not just email-verified identity.** A fake "Maya Beats" who claims credits without peer confirmation would undermine the trust that makes the whole system valuable.

---

## 1. Authentication decision: Discord vs email vs both

### 1.1 The question

Should ABLE use Discord as the primary or sole authentication method for freelancers, given that musicians are on Discord and it could signal community membership?

### 1.2 Evaluation

**Discord auth pros:**
- Musicians and producers are genuinely on Discord
- Community feel — ABLE Discord server membership can be verified at auth time
- Real-name optional — Discord handles allow pseudonymous creative identities
- Can verify server membership: `guilds.members.read` scope lets ABLE check if the user is in the ABLE Discord server before showing a "ABLE Community Member" badge
- Discord login is familiar to the target demographic
- Could power future "receive bookings via Discord DM" feature (enquiry notification sent as DM, not just email)

**Discord auth cons:**
- Not all freelancers use Discord. A 45-year-old mastering engineer may not have a Discord account. Requiring it would exclude a meaningful segment.
- Discord is a third-party dependency. If Discord changes its API, goes down, or changes OAuth scopes, ABLE's auth breaks.
- Discord has had outages and API instability. Primary auth cannot depend on Discord uptime.
- Privacy: some users are uncomfortable linking their Discord identity (where they may have said things they wouldn't want associated with their professional profile) to a public work profile.
- KYC/identity: Discord auth proves you own a Discord account. It does not prove you are who you say you are as a professional. Peer credit verification is the actual trust mechanism.

**Verdict: Discord as optional social login, not primary auth.**

Magic link email is the primary and always-available authentication method. Discord is an optional "connect your Discord" feature that unlocks specific capabilities. An artist or freelancer who has never used Discord can use ABLE in full without ever touching Discord.

### 1.3 Auth architecture

**Primary auth: Magic link email (Supabase Auth)**
- User enters email address
- Supabase sends a magic link (6-digit OTP or click-to-authenticate)
- Session established, JWT stored
- Works for all user types: artists, freelancers, fans (when fan.html is built)
- No password. No password reset flow. No password complexity rules. None of these problems.

**Optional: Discord OAuth 2.0**
- Available after initial account creation (not at signup — add it in settings)
- "Connect Discord" in profile settings
- OAuth flow: ABLE → Discord Developer Portal → `identify` + `email` + `guilds.members.read` scopes
- Stored in Supabase on `profiles` table: `discord_user_id`, `discord_username`, `discord_avatar_url`
- Never exposed to other users directly
- Discord ID is internal-only. What's shown on the profile: "ABLE Community Member" badge (if server verified), Discord username as optional display field (artist/freelancer chooses whether to show it)

### 1.4 Discord capabilities unlocked

When a freelancer connects Discord:

1. **ABLE Community Member badge** — if they are a member of the ABLE Discord server (verified via `guilds.members.read`), their profile shows a subtle "ABLE Community" badge. This signals: this person is engaged with the platform, not just a random profile.

2. **Discord notification routing (Phase 2)** — when a booking enquiry comes in, in addition to email, the freelancer can receive a Discord DM from the ABLE bot. The DM includes: enquirer name, project description, and a link to the enquiry in their ABLE dashboard. Useful for freelancers who live in Discord more than email.

3. **Discord handle display (optional)** — freelancer can choose to show their Discord handle on their profile, making it easy for potential clients to reach them informally. Not shown by default.

### 1.5 Discord technical spec

**Scopes required:**
- `identify` — read user's Discord ID, username, avatar
- `email` — read email (for linking to ABLE account, not stored publicly)
- `guilds.members.read` — check if user is in ABLE's Discord server (server ID stored in ABLE environment config)

**Flow:**
```
1. User clicks "Connect Discord" in settings
2. Redirect to Discord OAuth: https://discord.com/api/oauth2/authorize
   ?client_id=[ABLE_DISCORD_CLIENT_ID]
   &redirect_uri=[ABLE_DOMAIN]/auth/discord/callback
   &response_type=code
   &scope=identify%20email%20guilds.members.read
3. User approves
4. Discord redirects to /auth/discord/callback?code=[auth_code]
5. Server exchanges code for access_token via Discord token endpoint
6. Server calls /api/v9/users/@me to get user data
7. Server calls /api/v9/users/@me/guilds/members/[ABLE_SERVER_ID] to check membership
8. Store: discord_user_id, discord_username, discord_avatar_url in Supabase
9. Store: discord_in_able_server: true | false
10. Return user to settings page — badge shown if server member
```

**Error handling:**
- Discord API down: show error, "Try again later — your ABLE profile is not affected"
- User not in ABLE Discord server: connect succeeds, badge not shown, copy: "Join the ABLE Discord to get your Community badge"
- OAuth denied by user: no state change, return to settings cleanly

---

## 2. Credit verification system (authoritative spec)

The credit system is ABLE's core trust mechanism for freelancers. Credits that are peer-verified are fundamentally different from credits that are self-claimed. The UI must make this distinction visible at a glance.

### 2.1 Credit states

| State | Display | Meaning |
|---|---|---|
| Confirmed | ✓ tick, full opacity | Artist confirmed: "Yes, [freelancer] worked on this release" |
| Pending | ○ hollow dot, 70% opacity | Freelancer added credit, waiting for artist confirmation |
| Unverified | — no marker, 50% opacity | Artist is not on ABLE — cannot confirm digitally |

**Never hide unverified credits.** They still have value (real work was done) — they just carry less trust weight. The visual hierarchy communicates the difference without obscuring the record.

### 2.2 Credit confirmation flow (freelancer-initiated)

1. Freelancer searches for a release or artist name in their credits dashboard
2. If the artist is on ABLE: credit is created in `pending` state + artist receives notification
3. Notification to artist: "Maya Beats says she worked on your track 'Dissolve' (Single, 2026). Can you confirm?"
   - Options: "Yes, she did" / "No, this isn't right" / "I'll deal with this later"
4. Artist confirms → credit moves to `confirmed` state, gets ✓ tick
5. Artist denies → credit is removed from freelancer's profile entirely (with a note to the freelancer: "The artist wasn't able to confirm this credit")
6. Artist ignores → credit stays `pending` for 30 days, then auto-expires to `unverified` state

**Peer verification, not self-reported:** Both parties must acknowledge the credit before it reaches confirmed status. This is the system's integrity mechanism.

### 2.3 Credit confirmation flow (artist-initiated)

The more common and more valuable flow: artist adds credits when publishing a release, tagging ABLE freelancers directly.

1. Artist creates/edits a release in admin.html
2. In the credits field: "Add credit — search by name or ABLE handle"
3. If freelancer is on ABLE: credit is created as `pending` on the freelancer's profile + freelancer receives notification: "Mara J. has added you as a credit on 'Dissolve'. Want to confirm?"
4. Freelancer confirms → ✓ confirmed
5. Freelancer denies → removed

This flow is smoother because the artist is the originator — their confirmation is implicit in creating the credit. The freelancer just confirms they're happy to be publicly associated with the release.

### 2.4 Spotify credits import (Phase 2)

ABLE will not attempt to parse Spotify credits in V1. The Spotify API does not reliably return producer/mixer credits for all releases, and the data quality is inconsistent. In Phase 2:

- Artist pastes a Spotify track or album URL
- ABLE pulls liner notes / credits if available via the Spotify metadata API
- ABLE proposes credit matches based on names (fuzzy match against ABLE freelancer profiles)
- Artist reviews matches and confirms
- This is an enrichment flow, not an auto-import — the artist always confirms

### 2.5 Credit trust rules

- Maximum 5 unconfirmed (pending/unverified) credits shown on a public profile — the rest are hidden
- This prevents a spam of uncredentialed claims on a new profile
- Confirmed credits: no cap
- If a freelancer has 0 confirmed credits and 5 pending: profile shows as "New to ABLE — credits pending verification"
- No confirmed credits → no endorsement badge → limited bookings. The system incentivises getting first credits confirmed quickly.

### 2.6 Anti-abuse

- Rate limit: maximum 10 new credit claims per day per freelancer
- Confirmed-credit-to-total-credits ratio displayed internally (for ABLE moderation, not public)
- Artists can report false credits: "This person did not work on my release" — ABLE reviews and removes
- First 5 externally-visible credits on any new profile go through a 48-hour manual review queue (per V6_BUILD_AUTHORITY.md §12 trust and safety decision)

---

## 3. Rate card spec

The rate card is optional but high-converting. Freelancers who show rates attract clients who are ready to work. Those who hide rates filter for clients who will negotiate.

### 3.1 Data model

```js
rateCard: {
  shown: true,              // artist's choice to display or not
  currency: 'GBP',         // 'GBP' | 'USD' | 'EUR' — auto-detected from IP, switchable
  services: [
    {
      name: 'Production',
      priceType: 'from',    // 'fixed' | 'range' | 'from' | 'enquire'
      priceMin: 300,        // pence/cents (integer to avoid float issues)
      priceMax: null,       // null if priceType !== 'range'
      unit: 'per_track',    // 'per_track' | 'per_day' | 'per_half_day' | 'per_project' | 'per_hour'
      notes: ''             // optional short note, max 60 chars
    }
  ],
  responseTime: '2–3 days', // free text, max 30 chars
  enquiryPreference: 'form' // 'form' | 'email' | 'calendly' | 'cal'
}
```

### 3.2 Service taxonomy

Standard service names (auto-suggested, customisable):
- Production, Mixing, Mastering, Stem mixing, Recording, Session musician
- Music video, Photography, Graphic design, PR, Tour management, Sync licensing

Custom service name: allowed (max 40 chars). Custom names are not indexed for discovery (prevents spam tags).

### 3.3 Price display

- GBP: "From £300/track" — symbol before number, no space
- USD: "From $400/track"
- EUR: "From €350/track"
- "Get in touch" shown as plain text (no price, no confusion)
- Range: "£150–£250/track" — en-dash not hyphen

### 3.4 Enquiry routing

**Option A: ABLE enquiry form (default)**
- Booking bottom sheet opens (see §5)
- Enquiry sent to freelancer's email via ABLE relay
- Protects freelancer's email address

**Option B: External booking link**
- Calendly or Cal.com URL
- Displayed as a direct "Book a call" button that opens the external link
- Used by freelancers who prefer calendar-based scheduling

**Option C: Direct email**
- Only shown if freelancer explicitly enables it
- Displayed as `[username]@[domain]` — not a mailto: link (reduces spam from scrapers)

---

## 4. Availability status system

### 4.1 States

| Status | Dot colour | Copy on profile | Booking CTA state |
|---|---|---|---|
| Open | Green `#22c55e` | "Open for new work" | "Book me" — fully active |
| Available from | Amber `#f4b942` | "Available from [date]" | "Get in touch for future projects" |
| Limited | Amber | "Limited availability" | "Book me" — active, may decline |
| Not taking bookings | Red `#ef4444` | "Not taking bookings" | CTA hidden (replaced with "Check back soon") |

### 4.2 Auto-expiry (prevents stale profiles)

- "Open" status auto-reverts to "Limited" after 30 days without re-confirmation
- Freelancer receives email at day 25: "You're still showing as 'Open for new work' — is that still right?"
- Confirmation is one click: "Yes, still open" or "Update my availability"
- "Limited" status does not auto-expire
- "Available from [date]" auto-switches to "Open" on that date (unless freelancer has updated it)

### 4.3 Admin controls

In the freelancer's dashboard:
- Availability toggle: three-state selector (not a text field — reduces friction)
- "Available from" date: calendar picker
- "Notify me when my status is about to expire" — toggle (on by default)

---

## 5. Booking enquiry system

### 5.1 Bottom sheet form spec

```
Get in touch with Maya
──────────────────────────────────────────────────────────
Your name           [                                    ]
Your email          [email input, inputmode=email        ]
What you need       [textarea, 3 rows                   ]
Budget range        [select: Under £200 / £200–500 /
                     £500–1000 / £1000+ / Not sure       ]
Your ABLE page      able.fm/ [  optional  ]
Project timeline    [select: ASAP / Within 1 month /
                     1–3 months / Just exploring         ]

[ Send enquiry ]
```

**Required fields:** Your name, Your email, What you need
**Optional:** Budget range, Your ABLE page, Project timeline

### 5.2 Enquiry relay (privacy protection)

The enquiry is sent to the freelancer's registered email via ABLE's email infrastructure (Resend). The fan/artist never receives the freelancer's direct email address unless the freelancer chooses to reply.

**Email to freelancer:**
- Subject: "Booking enquiry from [Name] via ABLE"
- Body: name, email, project description, budget, timeline, ABLE page link (if provided)
- CTA: "Reply to [Name]" — pre-populates their email client with the enquirer's email as To
- Note: "This enquiry was sent via your ABLE page. Reply directly to respond — ABLE will not be involved in your conversation."

### 5.3 Rate limiting

- Max 3 enquiries per day per email address per freelancer (prevents spam)
- Max 20 enquiries per day per freelancer total (abnormal volume notification sent to ABLE admin)
- If same email sends 3 enquiries to same freelancer in 24h: "You've already contacted Maya — she'll get back to you when she can"

### 5.4 Enquiry analytics (freelancer-facing)

In the freelancer dashboard:
- Enquiries received this week / month / total
- Enquiry source: which credit or which discovery path generated it (if trackable)
- "Most enquiries come from your credit on Mara J.'s 'Dissolve'" — highest-value acquisition insight

---

## 6. Portfolio system (extended from base spec)

### 6.1 Before/after comparison player

A new portfolio item type specific to mixing and mastering engineers. Two audio players side-by-side (or stacked on mobile):

```
Before (Raw)                After (Finished)
[▶ Waveform display]        [▶ Waveform display]
"Unprocessed stem"          "Final master"
```

- Play is synchronised: tapping play on either starts both from the same position
- Only one can be playing at a time (plays the one tapped, pauses the other)
- Shows the transformation the engineer delivered
- Implementation: two separate audio elements, JS-managed sync
- Audio source: direct URL (artist uploads to their own SoundCloud / R2 in Phase 2) or ABLE R2 direct upload

### 6.2 Portfolio item data model

```js
portfolio: [
  {
    id: 'uuid',
    type: 'audio' | 'video' | 'photo_grid' | 'before_after',
    label: 'Produced and arranged for Novo Amor EP (2025)',  // max 80 chars
    creditRef: 'release_id_if_applicable',  // links to credit entry
    // for type === 'audio':
    audioUrl: 'https://soundcloud.com/...',   // oEmbed-compatible URL
    // for type === 'video':
    videoUrl: 'https://youtube.com/...',      // oEmbed-compatible URL
    thumbnailUrl: null,                       // auto-generated from YouTube if null
    // for type === 'photo_grid':
    images: ['url1', 'url2', ...],           // max 9 images
    // for type === 'before_after':
    beforeUrl: 'https://...',
    afterUrl: 'https://...',
    beforeLabel: 'Unprocessed stem',
    afterLabel: 'Final master',
    // shared:
    published: true,
    ts: 1741875600000
  }
]
```

### 6.3 Portfolio limits

| Tier | Audio | Video | Photo grid | Before/after |
|---|---|---|---|---|
| Free freelancer | 2 | 1 | 1 | 1 |
| Premium freelancer (Phase 2) | Unlimited | 6 | 3 | Unlimited |

Phase 2 freelancer Premium tier (£9/month) unlocks unlimited portfolio items and analytics on which items drive enquiries.

### 6.4 oEmbed loading

Portfolio items use oEmbed embeds — no ABLE hosting required in V1.

- SoundCloud: oEmbed endpoint `https://soundcloud.com/oembed?url=[url]&format=json`
- YouTube: standard iframe embed via URL shape detection
- Vimeo: oEmbed endpoint `https://vimeo.com/api/oembed.json?url=[url]`
- External audio (direct file URL): HTML5 `<audio>` element with custom waveform visualiser (using Web Audio API — basic amplitude display, not full waveform unless file is served with CORS)

---

## 7. Specialisms (discovery tags)

### 7.1 Taxonomy

Primary specialisms (searchable, one of these appears under the name on the profile header):
```
Recording Engineer / Mixing Engineer / Mastering Engineer / Producer /
Beatmaker / Songwriter / Session Musician / Music Videographer /
Photographer / Graphic Designer / PR / Tour Manager / Sync Agent
```

Secondary specialisms (additional context, not shown on header, used for discovery):
- Genre: Acoustic, Electronic, Hip-Hop, R&B, Pop, Rock, Classical, Jazz, World, Afrobeats, etc.
- Skills: Vocal tuning, Drum programming, Orchestral arrangement, Field recording, Live recording, etc.

### 7.2 Limits

- Max 1 primary specialism shown prominently (on profile header)
- Max 2 additional specialisms shown on profile
- Max 5 secondary specialisms (for discovery matching, not all shown publicly)

### 7.3 Discovery use (Phase 2)

When ABLE's discovery directory is built (DISCOVERY_DIRECTORY_SPEC.md Phase 2), specialisms are the primary search filter. "Find me a mixing engineer in Manchester who works in R&B" requires: primary specialism + location + genre tag.

In V1: specialisms appear on the profile but are not yet searchable via ABLE directory.

---

## 8. Freelancer onboarding (updated from base spec)

### Wizard: freelancer-start.html

**Step 1: What do you do?**
- Role selection grid (primary): Producer / Mixing Engineer / Mastering Engineer / Recording Engineer / Session Musician / Music Videographer / Photographer / Other
- Multi-select allowed (Producer + Mixer is common, max 3 selections)
- Each role has a 1-line description: "Producer — create beats, arrange tracks, produce sessions"
- Sets vibe default (auto-suggested, changeable): Electronic default for producers, Folk for acoustic session musicians, etc.

**Step 2: Where have you worked? (credit import)**
- "Search for an artist or release you've worked on"
- Search against: (a) ABLE artist profiles (instant), (b) free text (creates unverified credit)
- "Did you work on any of these?" → checkboxes for matched releases
- On confirm: unverified credit created + artist receives peer-confirmation notification
- Skip option: "I'll add credits later — my page is still live"

**Step 3: Connect Discord (optional)**
- "Connect Discord to get your ABLE Community Member badge"
- One-click Discord OAuth flow
- Skip is prominent and guilt-free: "Skip — you can do this later in settings"
- Completion note: "Optional — this just adds a badge, it doesn't affect your profile or bookings"

**Step 4: Add your first portfolio sample**
- Paste a SoundCloud, YouTube, or Vimeo link
- Preview loads inline (oEmbed)
- Add a one-line label: "What did you do on this track?"
- Skip option: "I'll add samples later"

**Step 5: Set availability + booking preference**
- Three-state availability toggle: "Open for new work" / "Limited availability" / "Not taking bookings"
- Booking preference: "Use ABLE's contact form" / "Link to my Calendly / Cal.com" + URL input
- Rate card optional: "Add rates now" or "I'll add rates later"

**Done screen:**
- "Your profile is live at able.fm/[handle]"
- Share panel: copy link, WhatsApp share, Instagram story share card (auto-generated with handle)
- "Add to your email signature": copy-text snippet — "[Name] · [Role] · able.fm/[handle]"
- "Your profile is stronger with confirmed credits — we've sent confirmation requests to [N] artists"

---

## 9. Freelancer dashboard

The freelancer dashboard is a separate view from the artist dashboard. Same visual system, different sections.

### Dashboard sections

**Overview:**
- Profile completeness score (0–100%) — checklist: photo, bio, 1 credit, 1 portfolio item, rate card, availability set
- Enquiries this week
- Profile views this week
- "Your profile is [X]% complete" with one action card: "Add a portfolio sample to stand out"

**Credits:**
- Full credits list (all states: confirmed, pending, unverified)
- Pending credits with action: "Awaiting confirmation from [artist name]" + "Remind them"
- Unverified credits with note: "[Artist] isn't on ABLE yet — this credit shows with reduced prominence until they join"
- Add credit button + search flow

**Portfolio:**
- Portfolio items grid
- Add/remove/reorder portfolio items
- Item analytics (Phase 2: "This item drove 3 enquiries")

**Enquiries:**
- Incoming enquiries list
- Each enquiry: name, what they need, budget, when it arrived, whether replied
- Bulk dismiss (for clearly irrelevant enquiries)
- Reply button → opens email client with pre-fill

**Availability:**
- Status toggle (3 states)
- "Available from" date picker (if set)
- Rate card editor
- "Last updated [date]" — transparency for freelancer's own reference

**Settings:**
- Email, handle, display name
- Discord connection (connect / disconnect)
- Booking preference (form / Calendly / direct email)
- Notification preferences: email on new enquiry, email on credit confirmation, weekly digest

---

## 10. Freelancer tier and pricing

**V1: Free for all freelancers.** No subscription charge. The freelancer ecosystem must reach critical mass before monetising it.

**Rationale:** The freelancer credits system drives artist retention and acquisition. Artists see credits on releases. Artists trust ABLE more because real producers are verified on the platform. Charging freelancers in Phase 1 would slow the credits ecosystem adoption, which would reduce platform value for artists — the paying customers.

**Phase 2: Premium Freelancer tier (£9/month)**

Unlocks:
- Unlimited portfolio items (vs 2 audio, 1 video, 1 photo grid, 1 before/after on Free)
- Portfolio item analytics: which items drive enquiries
- Enquiry analytics: which credits drive enquiries, best time of day to respond, etc.
- Featured placement: "Featured" flag on profile in credits display (artists see it more prominently)
- Custom domain: `able.fm/studio` or custom domain with freelancer handle
- Discord booking notifications (DM from ABLE bot on new enquiry)
- Priority support

**Phase 2: Booking deposit facilitation (for Premium freelancers)**
- Freelancer sets a deposit amount (e.g. 30% of day rate)
- Enquiry flow includes: "Pay deposit to secure this booking — £[amount]"
- Stripe Connect (Express) — same architecture as artist Support Packs
- ABLE takes 3% on booking deposits
- No requirement to use this — freelancers can still manage payments offline

---

## 11. The "discovered via" link (critical growth mechanism)

When an artist's release card shows a freelancer credit, fans and other artists can tap the freelancer's name and land on their profile.

This is not optional. It is not a future feature. It is the primary organic acquisition vector for freelancers.

**Implementation:**
- Credit on release card: `<a href="/[freelancer_handle]">[Freelancer Name]</a>` if they have an ABLE profile
- Credit on release card: `<span>[Freelancer Name]</span>` (plain text, not a link) if they don't have an ABLE profile yet
- The difference between "link" and "plain text" is the visible incentive to join ABLE
- When a freelancer joins, their existing credits (where artists have already named them) auto-convert to links
- Notification to freelancer on first profile-link conversion: "Your credit on Mara J.'s 'Dissolve' is now a live link to your profile."

**Analytics for freelancer:**
- In dashboard: "X people found your profile via credits this month"
- Per-credit: which releases are driving the most profile visits
- This data is the core value of the freelancer Premium tier — understanding which work to do more of

---

*Authority: this file is the canonical freelancer auth and features spec. For the base freelancer profile spec (sections, tabs, rendering), see `docs/v6/operational/FREELANCER_SPEC.md`. For the credits ecosystem, see `docs/v6/engines/CREDITS_ECOSYSTEM.md`. For Stripe Connect architecture, see `docs/systems/monetisation/SPEC.md`.*
