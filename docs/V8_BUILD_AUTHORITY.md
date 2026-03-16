# ABLE V8 — Build Authority
**Created: 2026-03-15**
**Status: ACTIVE — supersedes all v6 authority docs on every point it addresses.**
**Source material: 11 research docs + V6_BUILD_AUTHORITY.md + PRODUCT_TRUTH.md + V1_SCOPE.md + all engine specs + CANONICAL_OBJECT_MODEL.md + INTEGRATIONS_AND_AI_RESEARCH.md + PLATFORM_STRATEGY.md**

---

## 0. The Root Truth

**"The relationship between artist and fan belongs to them. Not to a platform."**

Every feature decision flows from this. ABLE is the door, not the room. The conduit, not the platform. The conversion layer, not the community. When a fan signs up on ABLE, their email belongs to the artist — not ABLE. When ABLE closes, the artist takes their list and leaves. The relationship survives the platform.

This is not a marketing angle. It is the reason the product exists.

---

## 1. The Three User Journeys — Do Not Conflate

### 1.1 Artist journey
`start.html` → `able-v7.html` (their live page, public) → `admin.html` (dashboard)

The artist is the primary customer. Everything is designed to give them control, real data, and genuine connection with fans — without making them feel like a marketer.

**Current state:** Artist profile (8/10 with demo data, 3/10 empty). Admin (5/10 — edit mode broken, auth gate dead). Onboarding (7/10 — AI import stub not wired).

**What gets it to 10:**
- Spotify paste → profile 70% populated in 10 seconds
- Campaign state machine fires automatically
- AI writes the bio before they have to
- Fan list grows visibly with every share
- Gig mode tells the right story for tonight (including post-show state)
- Edit mode is clean, one system, every zone covered
- Credits become a live link to the people they made music with

### 1.2 Fan journey
`able-v7.html` (from artist's social bio link) → `fan.html` (Phase 2 — real data)

The fan doesn't know or care what ABLE is. They clicked a link. They should feel like they landed somewhere the artist actually built — not a generic service page.

**Current state:** Artist profile fan experience (7/10 with data). Fan sign-up optimistic UI (7/10). Fan.html with real data (2/10 — currently demo-only).

**What gets it to 10:**
- Profile feels like the artist's world, not a platform (conduit principle)
- Stream in 2 taps without leaving the page
- Sign-up is one field in the artist's voice — ceremony, not a form
- Confirmation email sounds like the artist wrote it
- fan.html shows them: artists they follow, shows nearby, new drops — all real, not demo
- Post-show moment captured (gig mode shifts after show end)
- Close Circle feels like an offer, not a subscription product
- "Your list. Not Spotify's." — they understand what they signed up for

### 1.3 Freelancer journey
`freelancer-start.html` → `freelancer.html` → admin variant (shared admin.html, freelancer layers activated)

Discovered via credits on artist release cards. A credit with an ABLE handle becomes a live link. A credit without one is plain text. That asymmetry is the entire acquisition mechanic.

**Current state:** 0/10 — `freelancer.html` does not exist. `freelancer-start.html` does not exist.

**What gets it to 10:**
- Credits on artist profiles are live links to their profile
- Profile leads with credits — this is the trust signal, not a badge or rating
- Portfolio proves the sound before anything else
- Availability is honest and current (auto-expiry prevents ghost profiles)
- Booking enquiry is 4 fields, no marketplace signals
- Peer-confirm is one tap from a notification

---

## 2. The Recursive Data Model — How Everything Connects

This is the graph that makes ABLE a system, not a collection of pages.

```
┌─────────────────────────────────────────────────────────────────┐
│ ARTIST PROFILE (able-v7.html)                                   │
│                                                                 │
│  releases[].credits[credit]  ──────────────────────────────────►│
│  moments[]                   ──────────────────────────────────►│
│  fans[]                      ──────────────────────────────────►│
│  shows[]                     ──────────────────────────────────►│
│  recommendations[]           ──────────────────────────────────►│
│  closeCircle{}               ──────────────────────────────────►│
└───────────────────────────────┬─────────────────────────────────┘
                                │ credit with ableHandle
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│ FREELANCER PROFILE (freelancer.html)                              │
│                                                                   │
│  credits[] ← auto-populated from confirmed credits on artists     │
│  "Artists I've worked with" ← auto from Artist.releases.credits   │
│  portfolio → links back to Artist profiles                        │
│  Tap credit → artist's ABLE profile at that release               │
└───────────────────────────────────────────────────────────────────┘

                                │ fan signs up on artist profile
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│ FAN DASHBOARD (fan.html / ablemusic.co/me)                             │
│                                                                   │
│  Today strip ← artist.moments[] where date = today ± 48h          │
│  Following strip ← followed artist cards                          │
│  Near me ← artist.shows[] where city = fan.location               │
│  Discover ← Spotify related artists + credits network              │
│  Close Circle status ← FanSupporterState per artist               │
│  Superfan score ← computed across all followed artists             │
└───────────────────────────────────────────────────────────────────┘

                                │ artist manages everything
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│ ADMIN DASHBOARD (admin.html)                                      │
│                                                                   │
│  Campaign HQ ← profile.stateOverride, releaseDate                │
│  Fan list ← able_fans[] (confirmed vs unconfirmed)                │
│  "Your World" ← profile.moments[] (admin view of World Map)      │
│  Credits management ← releases[].credits[]                       │
│  Close Circle settings ← profile.closeCircle{}                   │
│  Analytics ← able_clicks[], able_views[], source breakdown        │
│  QR code ← accent-coloured, `?src=qr`                            │
└───────────────────────────────────────────────────────────────────┘
```

### 2.1 Data that flows between profiles (the recursive layer)

**Artist → Freelancer (via credits):**
When artist adds `releases[release].credits[{name: 'Maya Beats', role: 'Producer', ableHandle: 'mayabeats', confirmed: false}]` and Maya accepts the peer-confirm notification → `confirmed: true` → credit becomes live link on artist profile → fans and other artists tap it → land on Maya's freelancer profile.

**Freelancer → Artist (auto-population):**
Maya's `credits[]` array is auto-populated from all `confirmed: true` credits across all artist profiles on ABLE. Her "Artists I've worked with" section auto-generates from this.

**Artist → Fan Dashboard:**
- New moment (show, release, livestream) → appears in fan's Today strip for all fans who follow this artist
- Gig mode activated → fan dashboard shows "Playing tonight" for local fans
- Pre-release state → fan dashboard shows countdown for fans of this artist
- Close Circle dispatch → appears as priority item in fan's Today strip (supporter-gated)

**Fan Dashboard → Artist (superfan scoring — internal, artist-visible only):**
Fan actions flow back as signals: page visits, CTA taps, supporter join, show attendance, broadcast opens → superfan score computed → artist sees "You have 12 superfans in Manchester" in analytics.

### 2.2 Spotify auto-population flow (the zero-friction onboarding)

**Trigger:** Artist pastes Spotify profile URL during onboarding.

```
1. Extract Spotify artist ID from URL: open.spotify.com/artist/{ID}

2. Spotify Web API (client credentials, no OAuth):
   → Artist name, images, genres
   → Top tracks (titles, artwork, 30s previews)
   → Full discography (albums/EPs/singles with artwork + dates)
   → Related artists (seeds "Artists I Recommend" section)

3. Artist name → Last.fm artist.getInfo:
   → listeners (30-day unique) — display as "Last.fm listeners", never as "monthly listeners"
   → bio.summary — fallback bio if artist hasn't written one
   → tags → genre detection → vibe preset suggestion

4. Artist name → Ticketmaster Discovery API (single platform key, no per-artist setup):
   → All upcoming shows with venue, city, date, ticket URL
   → Auto-populates Events section

5. (Async) MusicBrainz by name + Spotify ID:
   → Any matched credits → pre-populate releases[].credits[]
```

**Total artist effort:** Paste one URL. Profile 70% complete in under 10 seconds. This eliminates the empty-state problem entirely.

**Display rules:**
- Never label Last.fm listeners as "Spotify monthly listeners" — Spotify's monthly listener count is not in any public API endpoint. Label correctly or show only in artist dashboard.
- `followers.total` and `popularity` from Spotify are deprecated and should not be shown as audience metrics.

---

## 3. Design System — Canonical Values (Unchanged from V6)

### 3.1 Vibe table

| Vibe | Display font | Weight | Accent | r-mult | ls-display |
|---|---|---|---|---|---|
| Electronic/Club | Barlow Condensed | 700, uppercase | `#06b6d4` cyan | 0.6 | 0.06em |
| Hip Hop/Rap | Oswald | 700, uppercase | `#f4b942` gold | 0.7 | 0.04em |
| R&B/Soul | Cormorant Garamond | 600 italic | `#e06b7a` rose | 1.2 | 0.02em |
| Indie/Alt | Space Grotesk | 700 | `#7ec88a` sage | 1.0 | -0.01em |
| Pop | Barlow Condensed | 700 | `#9b7cf4` indigo | 1.4 | 0.03em |
| Rock/Metal | Oswald | 700, uppercase | `#e05242` red | 0.6 | 0.08em |
| Acoustic/Folk | Lora | 700, serif | `#d4a96a` ochre | 1.3 | 0.01em |

Body font (all vibes, artist profile): **DM Sans**
Admin dashboard body font: **Plus Jakarta Sans** (separate file, do not mix)

### 3.2 Theme tokens
Dark / Light / Glass / Contrast — exact values in `V6_BUILD_AUTHORITY.md §3.2`. These are unchanged.

### 3.3 Performance budgets (hard)
LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.10 · HTML ≤ 340kB gzipped

### 3.4 Rendering law (local-first)
1. Render from localStorage immediately — no waiting for APIs
2. Refresh remote data in background
3. External API failure → degrade to cached data → manual data → hidden section. Never blank a section shell.

---

## 4. The AI Layer — Complete Spec

Provider: Claude API (Anthropic). Never use AI to replace the artist's creative output. Only to assist their voice.

### 4.1 System prompt prefix (all ABLE AI requests)
```
You are a copy assistant for ABLE, a platform for independent musicians.
Write in the artist's voice: first person, honest, direct, no marketing language.
Never use: "superfans", "monetise", "grow your audience", "content creator",
"going viral", exclamation marks, generic SaaS phrases.
Write short. Say one true thing. Stop.
```

### 4.2 AI feature matrix

| Feature | Model | Rate limit | Tier | Surface | Trigger |
|---|---|---|---|---|---|
| Bio writer | Sonnet | 10/day | Artist | Onboarding + Admin identity card | Artist enters 3 words about their sound |
| CTA variants | Haiku | 30/day | Artist+ | Admin CTA editor | Artist edits primary/secondary CTA |
| Snap card copy | Haiku | 20/day | Artist Pro | Snap card creator | Artist creates new card |
| Caption pack (3× on publish) | Haiku | 20/day | Artist+ | Snap card after publish | Card published |
| Show description writer | Haiku | 20/day | Artist | Shows editor | Artist adds new show |
| Release campaign planner (6-week calendar) | Sonnet | 3/day | Artist Pro | Campaign HQ | Release date set |
| Fan message personalisation (3 variants) | Haiku | 10/day | Artist Pro | Broadcast composer | Opening draft |
| Genre detection → vibe suggestion | Haiku | 5/onboarding | Free | Onboarding step 2 | Spotify URL parsed |
| AI mastering (LANDR) | External | — | Artist Pro | Pre-distribution panel | Artist uploads track |
| Voice dispatch (ElevenLabs) | External | — | Artist Pro | Close Circle dispatches | Phase 3 |

### 4.3 AI output rules
- Always show as suggestion, never auto-apply
- 3 variants when possible (fan preference data: variety increases adoption)
- Inline dismissable: "Use this" / "Try again" / "Write my own"
- Rate limit failures: show graceful message, not an error state

### 4.4 AI agent horizon (12–24 months — design architecture to support, don't build yet)
- Release campaign agent: ingests release date → builds full content calendar, creates snap cards, sets CTA modes
- Fan re-engagement agent: identifies cold fans, writes personalised subjects, schedules send
- Superfan mobilisation agent: drafts personalised messages to top 10 superfans for launch squads
- Playlist pitch agent: prepares pitch email with track data + curator shortlist

The artist profile + fan data is the context window. Every feature that collects structured data is also building the agent's knowledge base.

---

## 5. Campaign State Machine (Unchanged — Working)

```javascript
function computeState(profile) {
  if (profile.stateOverride && profile.stateOverride !== 'auto') return profile.stateOverride
  const now = Date.now()
  const release = profile.releaseDate ? new Date(profile.releaseDate).getTime() : null
  if (!release) return 'profile'
  if (now < release) return 'pre-release'
  if (now < release + 14 * 86400000) return 'live'
  return 'profile'
}
// Gig: manual toggle, auto-expires 24h (able_gig_expires). Overrides all other states.
// Near-future: any public moment ≤7 days → hero chip appears.
```

### 5.1 Gig mode — V8 improvements

**Two states, not one:**
- **Pre-show state** (current): ticket CTA primary, venue/time prominent
- **Post-show state** (new): triggered by artist-set show-end time. CTA shifts from "Get tickets" to "Stay close" (fan sign-up primary). Merch secondary. "Catch the next one" tertiary.

**New: "Tonight note" field**
A free-text 2–3 sentence field in admin when activating gig mode. Displayed above the ticket CTA on the public profile. Artist writes something human ("I've been looking forward to tonight for weeks. The room is small. It's going to be good."). This single addition is the highest-leverage gig mode improvement available.

**New: "Going tonight" tap**
A lightweight social signal fans give on the gig mode page. Visible counter ("12 people going tonight"). Feeds into artist dashboard as attendance signal. Creates social proof for undecided visitors without manufactured scarcity.

**New: Post-show notification**
When gig mode ends, send a brief push to fans on artist's list: "[Artist name]'s next date is [X]. Hope the show was good." Captures the post-concert depression window (fans in peak receptivity for 3–7 days after a great show).

---

## 6. Fan Activation Chain — The Critical Fix

This chain is currently broken. Every link must be wired for the fan journey to reach 10.

```
Fan taps artist's bio link
  → lands on able-v7.html
  → sees campaign state appropriate content (conduit principle)
  → taps "Stay close."
  → confetti + echo fires (optimistic UI — already works)
  → Supabase: fan record created {double_opted_in: false, source: 'instagram'|etc}
  → Resend: confirmation email sent (artist voice, not ABLE brand voice)
     Subject: "Confirm you want to hear from [Artist Name]"
     Body: "[Artist name] asked me to check this is actually you.
            [Confirm link]
            If you didn't sign up, ignore this."
  → Fan confirms → double_opted_in: true → opted_in_at timestamp
  → Fan can now receive broadcasts, Close Circle dispatches
  → Fan visits again → fan.html pulls their followed artist data from Supabase
  → Today strip shows real moments (not demo)
```

### 6.1 fan.html — Real data architecture

**Section order (from FAN_DASHBOARD_SPEC.md):**
1. Header: "Good morning." + date + location-aware greeting
2. **Today strip** (48-hour activity window): new drop, show tonight, show this week — time-stamped, single-tap action. Empty state: "Nothing new today — last activity [N days ago]." Always honest, never padded.
3. **Following strip**: artist cards — latest release, next show, unread dispatches
4. **Near me**: artists playing ≤14 days away in fan's city. If no location: "Enter your city →". If no shows: "No shows from your artists near [city] soon."
5. **Discover tabs**: Connected (via credits network), Emerging (velocity-based), New to ABLE
6. **Close Circle**: for each followed artist where fan is a supporter — status, recent dispatches
7. **Fan settings**: notification preferences per artist, privacy, export list

**Cold-start strategy (critical for 30-day retention):**
- After fan signs up from an artist's page → immediately surface 2–3 connected or similar artists: "People who follow [ARTIST] also follow..."
- Single tap to follow
- Target: fan leaves with 3 followed artists minimum
- Internal data across music platforms: users who follow 3+ artists have dramatically higher 30-day retention than 1–2

**Realistic engagement targets for fan.html:**
- Weekly active: 25–35% of registered fans (not daily — music fans are weekly ritual users)
- Notification open rate: 25–40% (if specific and timely)
- 30-day retention: 40–55% (if cold-start handled)
- Frequency cap: maximum 1 push notification per day, regardless of events

---

## 7. Close Circle — V8 Wiring

The surface layer exists (hero entry, join sheet, lock-ring dots on World Map). The payment layer is not wired. V8 must complete this.

### 7.1 What Close Circle is

Not a content subscription. Not a Patreon. The framing that converts: **"You are part of what I am building. This is how we stay close."**

The psychology: fans who pay £5/month are not calculating cost-per-content-unit. They are expressing an identity (someone who shows up) and making a relationship-maintenance payment. This is the patronage zone.

### 7.2 Price and copy

- Default: £5/month. Range: £3–£12. Rounded prices only. No charm pricing (no £4.99).
- Copy: "Stay closer. A small group of people get things a bit earlier — new music before it's out, first shot at tickets, occasional messages that don't go everywhere. £5 a month. You can leave whenever."
- Never: "Exclusive content", "Join the community", "Become a supporter", "Get closer to [Artist]"
- "You can leave any time" is a retention tool, not a liability statement. Counterintuitively increases retention by framing membership as choice.

### 7.3 What supporters get (V1)

| Entitlement | What it means |
|---|---|
| Early access | Hear releases before public drop — framed as "the artist trusts you" |
| Supporter streams | Private listening sessions, access to livestream moments |
| Replay access | Past supporter sessions stay available |
| Dispatches | Direct updates in the artist's voice, not algorithm-mediated |

### 7.4 Stripe architecture

- Stripe Connect for artist payouts
- 0% ABLE cut (Stripe standard fee only: 1.4% + 20p UK cards)
- Easy pause option (not cancel-only) — fans who pause return at higher rates than fans who cancel
- Show how long they've been in the circle — longitudinal visibility ("You've been a supporter since March")
- ABLE creates Stripe Product + Price via API. Artist never logs into Stripe.

### 7.5 Churn prevention

Leading churn cause: **inconsistent artist presence**. Not about content volume. One honest personal message every 3 weeks is enough. Zero messages for 2 months is not. ABLE cannot control this but can prompt it.

- "Close circle first" messaging on every release: artist explicitly acknowledges the group before posting publicly
- Easy pause option
- Show membership duration in fan dashboard

---

## 8. Credits and Freelancer Ecosystem

### 8.1 How credits become discovery

```
Artist releases track
  → Artist adds credit: {name: 'Maya Beats', role: 'Producer', ableHandle: 'mayabeats'}
  → Maya receives push notification: "[Artist] credits you as Producer on '[Track]' — confirm?"
  → Maya taps "Confirm" (one tap)
  → confirmed: true
  → Credit on artist profile becomes live link: "Produced by Maya Beats →"
  → Fan taps it → lands on Maya's freelancer profile
  → Another artist taps it → sees Maya's work, rate card, availability
  → Maya receives booking enquiry
```

### 8.2 Peer-confirm UX (one-tap required)

The confirmation must be one tap from the notification. "Did you produce '[Track]' by [Artist]?" Yes / No. Anything more and compliance drops to near-zero. The freelancer has clear incentive: a confirmed credit makes their credit a live link. An unconfirmed one is plain text.

### 8.3 Freelancer profile architecture (`freelancer.html`)

Same design system, tokens, and themes as artist profile. One profile model with activated layers — no `profileType` flag. Freelancer layer disables: campaign states, fan capture, snap cards, gig mode, top card campaign. Artist layer disables: credits hero, portfolio, rate card, booking sheet. Both profile types managed via shared admin.html with context-appropriate sections shown/hidden per activated layer. (Per PROFESSIONAL_ECOSYSTEM_SPEC.md — supersedes FREELANCER_SPEC.md.)

**Tab bar (freelancer-specific):**
Home · Credits · Work · Rates · Contact

**Sections in order:**
1. Identity header: photo (80px circle), name, role tag ("Producer · Manchester"), location, hero CTAs ("Book me" / "Listen to work")
2. Credits (most important): artwork + release title + artist name + ✓ (if confirmed) + year. Collapsed to 4, expandable.
3. Portfolio: audio (SoundCloud/direct, max 6), video (YouTube, max 3), photos (grid, max 9). No ABLE hosting v1.
4. Rate card (optional): services, price format (fixed/range/get in touch), availability (Open/Selective/Closed). Auto-expiry: "Open" reverts to "Selective" after 30 days.
5. Booking enquiry (bottom sheet): 4 fields — name, email, what you're working on, what you need. No budget field, no service dropdown, no marketplace signals.
6. Artists on ABLE (auto-generated): avatars of confirmed-credit artists. Only shown when ≥2 confirmed credits exist.

### 8.4 Freelancer onboarding (`freelancer-start.html`)

**Steps:**
1. What do you do? (role multi-select)
2. Import your credits (search releases by artist name → ABLE matches → checkboxes → unverified credits added + peer-confirm sent)
3. Add a portfolio sample (SoundCloud or YouTube URL, skip option)
4. Set availability + booking preference

**Done screen:** "Your profile is live at ablemusic.co/[handle]" + share options + email signature snippet

---

## 9. Copy Principles — Complete Reference

### 9.1 Voice law

| Never write | Write instead |
|---|---|
| "Turn fans into superfans" | "Your most dedicated listeners" |
| "Grow your audience" | "Reach people who care" |
| "Monetise your fanbase" | "Let people support you directly" |
| "Engage your followers" | "Stay close to the people who show up" |
| "Content creator" | "Artist" |
| "Going viral" | Never. Anywhere. |
| Exclamation marks on dashboard copy | One beat, done. |
| Generic SaaS micro-copy | Artist voice |

### 9.2 Fan capture copy (settled)

| Don't use | Use |
|---|---|
| "Sign up" | "Stay close." |
| "Subscribe" | "I'm in" |
| "Get updates" | "Count me in" |
| "Join the list" | "Let's stay close" |
| Second-person CTA | First-person CTA (90% conversion uplift) |

Trust line: "Just [Artist Name]. No spam."
Supporting text: "I'll only reach out when something's actually happening."

### 9.3 Upgrade triggers — language rules

| Works | Banned |
|---|---|
| "Send your record to the 87 people who asked for it" | "Unlock email broadcasts" |
| "You have 23 fans in Manchester — upgrade to see who they are" | "Advanced analytics" |
| "Your list is full — these people want to hear from you" | "Upgrade to continue" |

Gold lock pattern: blurred preview + specific value overlay. Show exactly what they get.

### 9.4 Gig mode copy

- "I'm playing tonight" not "Gig mode activated"
- "Come if you're near" not "Purchase tickets"
- "Tonight note" written by artist, not generated by platform
- Never fake scarcity. Genuine scarcity ("It's a small room. There are tickets left but not many.") converts. Manufactured urgency doesn't.

### 9.5 Close Circle copy (from research — tested patterns)

**Artist profile placement:**
> "Stay closer.
> A small group of people get things a bit earlier — new music before it's out, first shot at tickets, occasional messages that don't go everywhere. £5 a month. You can leave whenever."

**Fan dashboard — returning fan:**
> "You've been following [Artist Name] since [month]. Some fans go a bit further — they hear new music a few days early, they get first access to shows. It's £5 a month, directly to [Artist Name]."
>
> "Keep things as they are, or come closer."

**Email — behavioural trigger (minimum 14 days after sign-up, or after 2+ opened messages):**
Subject: `A bit closer, if you want`

---

## 10. Integration Stack — Final Priority

### 10.1 Auto-population (onboarding — single Spotify URL paste)

1. **Ticketmaster Discovery API** — free, single platform key, events by artist name. Primary events source.
2. **Spotify Web API** — artist photos, top tracks, discography, genre. No monthly listener count (not available via any public endpoint).
3. **YouTube Data API v3** — latest video, thumbnail, embed. Best social API available.
4. **Last.fm artist.getInfo** — 30-day listeners (honest metric label), bio text, tags.
5. **MusicBrainz** (async) — credits enrichment. 1 req/sec limit enforced. Background job, not real-time.

**Bandsintown note:** API keys are per-artist, not platform-wide. Primary events source is now Ticketmaster. Bandsintown remains as opt-in for artists who have Bandsintown For Artists accounts.

### 10.2 Export/sync (builds trust via data portability)

- **CSV export**: always, every tier, one-click. This is a core trust signal.
- **Mailchimp export**: Artist Pro — one-click, new fans auto-sync
- **Kit export**: Artist Pro — same as Mailchimp
- **Beehiiv export**: Artist Pro — via v2 API

### 10.3 Build natively (don't integrate)

- Pre-save links (Spotify API + ABLE fan capture = better than Hypeddit/Toneden)
- Email broadcasts (ABLE owns the relationship — externalising breaks the trust model)
- Analytics dashboard (this is the moat — own it completely)
- Press pack at `ablemusic.co/handle/press` (data already in ABLE — just a render layer, Phase 2)
- Fan CRM + superfan scoring (core product, never outsource)

### 10.4 Link paste only (no API worth building)

Instagram, TikTok, X/Twitter, all distribution platforms, Apple Music, Tidal, Bandcamp, all PROs, all sync platforms, all booking platforms.

---

## 11. Technical Architecture — Key Decisions

### 11.1 Single-file per page — maintained

v8 stays as single HTML files. No bundler, no framework, no npm. This is not a constraint — it is a feature. The entire profile renders from HTML + inline critical CSS with no dependency on any external call. Local-first performance is only achievable this way.

### 11.2 Backend (Supabase — v1)

Stack: Supabase (PostgreSQL + Auth + Storage + Edge Functions) · Netlify (static hosting + edge functions) · Stripe (payments) · Resend (email delivery)

All localStorage keys map 1:1 to Supabase table rows. No renaming.

### 11.3 Freelancer profile type

**One profile, activated layers** (PROFESSIONAL_ECOSYSTEM_SPEC.md). No hard `profileType` enum. A user can have artist layers, freelancer layers, or both active simultaneously. Admin.html shows context-appropriate sections per which layers are active. Not a separate admin page — same codebase, sections toggled.

### 11.4 Directory — post-v8

`ablemusic.co/artists` directory is explicitly post-v8 scope. Rationale: the directory requires an artist base large enough that browsing feels rewarding. Launching it before that threshold creates a ghost town experience — the worst possible first impression of a discovery feature. Build when there are 500+ active artists on ABLE.

### 11.5 Showcase mode — partially v8

The campaign state machine (profile / pre-release / live / gig) already delivers 80% of Showcase value. Full Showcase mode (press kit layout, shareable campaign objects, static OG image generation) is Phase 2. V8 does not need to implement this fully — the state machine covers the core use case.

---

## 12. The Three Uncopyable Structural Advantages

These are the moat. Keep building them.

**1. The artist owns the fan's email address.**
When ABLE closes, the artist takes their list. No other platform offers this as the primary value proposition. Spotify's eventual superfan tier will keep fan relationships inside Spotify's walled garden — ABLE's differentiation stays strong because the ownership is ours. "Your list. Not Spotify's."

**2. The campaign state machine transforms the entire profile based on what the artist is doing right now.**
Patreon, Community, Substack — none have an equivalent. Spotify has Countdown Pages but only within their ecosystem. The full pre-release → live → profile → gig cycle, each with its own visual hierarchy, is a product that cannot be quickly copied because it requires the identity system, the state machine, and the conduit principle to all work together.

**3. The freelancer credit network creates compound discovery.**
No platform in the landscape — not Patreon, Community, Weverse, UnitedMasters, or bemyfriends — connects fans to the producers and collaborators behind the music. This creates network effects: fans find new artists through the producers they follow; artists find collaborators through credits they see on other artists' profiles. It requires simultaneous artist adoption and freelancer adoption. First mover advantage is real.

---

## 13. Build Order — What Must Be Wired in V8

Ordered by impact on user story score × build complexity. High-impact, lower-complexity first.

### Phase 1 — Broken things first (currently 3–5/10 → 8/10)

1. **Spotify auto-import** (start.html): paste URL → Ticketmaster + Spotify + Last.fm → profile populated. This eliminates the empty state problem and gets the artist journey to 8/10 immediately.

2. **Clean edit mode** (admin.html + able-v7.html): drop V1 FAB + slide panel system. Keep V2 floating pill, rebuild to cover all zones — profile fields, CTAs, snap cards, shows, releases, credits. Auto-save to Supabase on every field change (debounced 800ms).

3. **Fan sign-up → confirmation email** (Supabase + Resend): `able_fans` write to Supabase → Resend sends confirmation. Artist voice template. This completes the only fan touchpoint they never see but determines whether they're a real subscriber.

4. **Auth gate fix** (admin.html): Drop `able_session` check (never set). Replace with clean Supabase `onAuthStateChange`. Magic link flow already wired in start.html.

### Phase 2 — Activation chain (currently 2/10 → 7/10)

5. **fan.html real data pipe**: follows stored in Supabase `fan_follows` table → Today strip pulls from `moments` table → Near me pulls from `shows` table. Cold-start: surface 2–3 connected artists immediately post-sign-up.

6. **Close Circle + Stripe**: Stripe Connect for artist setup → Stripe subscription for fan join flow. Pause option. Duration display in fan dashboard.

7. **AI features**: bio writer (Sonnet, admin identity card), CTA variants (Haiku, admin CTA editor), caption pack (Haiku, fires after snap card publish). 3-variant output, inline dismissable UI.

8. **Gig mode improvements**: tonight note field, post-show state (CTA shift after show-end time), "Going tonight" tap counter, post-show notification via Resend.

### Phase 3 — Ecosystem (currently 0/10 → live)

9. **Credits peer-confirm flow**: push notification to freelancer on credit add → one-tap confirm → `confirmed: true` → live link on artist profile.

10. **freelancer-start.html**: 4-step onboarding wizard with credit import step. Share on completion.

11. **freelancer.html**: Credits hero, portfolio, rate card, booking enquiry sheet. Freelancer layers activated in shared admin — one profile model.

### Phase 4 — Scale features

12. **Email broadcasts** (Artist Pro): Resend bulk send, double opt-in list only, open/click analytics.

13. **Release campaign planner AI**: Sonnet agent → 6-week content calendar with snap cards + CTA modes. Artist Pro gate.

14. **Superfan scoring**: Internal algorithm, artist-visible only, never shown to fan. Powers "You have 12 superfans in Manchester" in analytics.

15. **Directory** (`ablemusic.co/artists`): Only after 500+ active artists. Vibe tiles, velocity-based rising sort, editorial spotlight (named contributor, dated, weekly rotation).

---

## 14. Scoring — What Gets Each Journey to 10

### Artist journey (currently ~5/10 → target 9/10 after Phase 1–2)

| Moment | Current | V8 target |
|---|---|---|
| First impression (profile with data) | 8/10 | 9/10 |
| First impression (empty state) | 3/10 | 8/10 (Spotify auto-import) |
| Onboarding completion | 6/10 | 9/10 (one URL → 70% populated) |
| Edit mode | 4/10 | 9/10 (one clean system) |
| Fan list visibility | 7/10 | 8/10 |
| Gig mode | 7/10 | 9/10 (tonight note, post-show state) |
| Campaign state machine | 8/10 | 9/10 (no change needed) |
| AI assistance | 3/10 (stub) | 8/10 |
| Credits + freelancer connection | 3/10 (display only) | 8/10 (live links) |
| Close Circle | 4/10 (UI only, no payment) | 8/10 (Stripe wired) |

### Fan journey (currently ~4/10 → target 9/10 after Phase 1–2)

| Moment | Current | V8 target |
|---|---|---|
| Landing on profile | 8/10 | 9/10 |
| Streaming music (conduit) | 7/10 | 9/10 |
| Sign-up UX | 7/10 | 8/10 |
| Confirmation email | 0/10 (not wired) | 9/10 |
| fan.html with real data | 2/10 | 8/10 |
| Near me (shows) | 2/10 | 8/10 |
| Cold-start (following 1 artist) | 2/10 | 7/10 |
| Close Circle (fan side) | 3/10 | 8/10 |
| Gig night experience | 5/10 | 8/10 |
| Post-show capture | 0/10 | 8/10 |

### Freelancer journey (currently 0/10 → target 8/10 after Phase 3)

| Moment | Current | V8 target |
|---|---|---|
| Discovery via artist credits | 3/10 (plain text only) | 9/10 (live links) |
| Profile completeness | 0/10 (doesn't exist) | 8/10 |
| Credits display | 0/10 | 9/10 |
| Portfolio | 0/10 | 8/10 |
| Booking flow | 0/10 | 9/10 |
| Peer-confirm | 0/10 | 8/10 |

---

## 15. What V8 Does Not Build

Explicitly deferred. Architecture must not block them.

| Not building in v8 | Reason |
|---|---|
| Discovery directory (`ablemusic.co/artists`) | Needs user base first. Ghost town = worst impression. |
| Full Showcase mode | Campaign state machine covers 80% of the need. Full UI post-v8. |
| Story Mode (video assembly) | Phase 3+ |
| Rooms / Stage Can (fan community) | Not a community platform — this is off-brand scope |
| Press pack (`ablemusic.co/handle/press`) | Phase 2 — render layer on existing data |
| Ablers referral programme | Needs subscriber base first |
| Custom artist domains | Phase 2 |
| Email custom sending domains | Phase 2 |
| Globe heatmap analytics | Phase 2 |
| LANDR mastering integration | Phase 2+ (requires B2B partnership) |
| ElevenLabs voice cloning | Phase 3 |
| Stem separation (LALAL.AI) | Phase 3 |
| Linktree importer | High value but not blocking v1; build in Phase 2 as conversion tool |
| Velocity leaderboard | Needs user base |
| Setlist mode | Phase 2 |

**Never building (ever):**
Open CSS editor, arbitrary font upload, unlimited colour palette, AI-generated layouts, artist rating/review system, fan direct messages, fan gamification/leaderboards, pay-per-post fan content, "going viral" anywhere in copy.

---

## 16. The V8 Done Criteria

The build is shippable when:

**Artist profile (`able-v7.html`):**
- [ ] Spotify auto-import works (URL → populated profile in <10 seconds)
- [ ] All 4 campaign states render correctly across all 7 vibes × 4 themes
- [ ] Clean edit mode covers all 6 zones (identity, CTAs, quick actions, sections, snap cards, shows/releases)
- [ ] Gig mode has tonight note + post-show state
- [ ] Credits display confirmed/unconfirmed visual treatment + live link when ableHandle exists
- [ ] All 17 Phase 1 micro-interactions wired
- [ ] WCAG 2.2 AA on all themes + vibes
- [ ] CLS < 0.10, LCP < 2.5s, HTML < 340kB gzipped

**Admin (`admin.html`):**
- [ ] Supabase auth works (magic link → `able_artist_id` bound)
- [ ] Fan list shows real data (confirmed vs unconfirmed)
- [ ] Campaign HQ controls all state transitions
- [ ] Credits management: add, confirm, delete
- [ ] "Your World" shows artist moments

**Fan activation chain:**
- [ ] Fan sign-up → Supabase write → Resend confirmation email in artist voice
- [ ] `double_opted_in: true` on confirmation

**fan.html:**
- [ ] Real artist data from Supabase (not demo)
- [ ] Today strip shows real moments from followed artists
- [ ] Near me section with Ticketmaster-powered shows
- [ ] Cold-start: 2–3 suggested artists shown immediately after sign-up

**Freelancer:**
- [ ] `freelancer.html` exists and renders with freelancer layers activated (one profile model)
- [ ] Credits display with confirmed/unconfirmed visual treatment
- [ ] Booking enquiry bottom sheet (4 fields, no marketplace signals)
- [ ] Peer-confirm notification + one-tap confirm

**Close Circle:**
- [ ] Stripe subscription wired (fan join → payment → entitlements granted)
- [ ] Pause option exists
- [ ] Artist can set price, intro text, enable/disable

**AI:**
- [ ] Bio writer (Sonnet, 10/day, Artist tier)
- [ ] CTA variants (Haiku, 30/day, Artist+ tier)
- [ ] Caption pack (Haiku, 20/day, fires on snap card publish, Artist+ tier)

---

## 17. Authority Chain

When any document disagrees with this file, this file wins.

1. **This file** — `V8_BUILD_AUTHORITY.md`
2. `V6_BUILD_AUTHORITY.md` — for design system details, micro-interaction law, performance law, accessibility law not addressed here
3. `CANONICAL_OBJECT_MODEL.md` — for all shared data structures
4. `PRODUCT_TRUTH.md` — for any feature that seems to contradict the root truth
5. Engine specs (`engines/`) — for any detail not addressed in 1–4
6. Research docs (`docs/research/`) — for copy, placement, and UX decisions
7. All other files — reference only

---

*This document is the build authority for v8. Read it before touching code. Where it is silent, read V6_BUILD_AUTHORITY.md. Where that is silent, read CANONICAL_OBJECT_MODEL.md. The build can proceed.*
