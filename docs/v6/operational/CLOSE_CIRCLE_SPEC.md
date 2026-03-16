# ABLE — Close Circle: Supporter System Spec
**Version 1.0 — 2026-03-14**
**Status: ACTIVE**

*The supporter / close-circle system for ABLE. The product name is "Close Circle."*

---

## 1. Product Framing

Close Circle is ABLE's supporter access layer. It lets the right fans move closer to an artist through meaningful access to moments — early releases, supporter-only streams, close circle dispatches, first ticket access.

**It is not a content subscription.** The artist is not expected to post constantly to justify supporter payments. Supporters get earlier, closer access to what the artist is already doing.

**Public name:** Close Circle
**Internal/system language:** supporter tier (short: `supporter`)
**Fan-facing identity:** supporter
**What gated content/moments are called:** close circle access

**What this is never called:**
Membership, subscription, premium tier, fan club, VIP, exclusive content, creator content, locked content.

### The strongest imported lesson from paid-closeness platforms

People will pay for closeness if it feels meaningful. On ABLE, closeness means earlier access to real moments — not a feed of low-value posts.

---

## 2. Core Support Model

**One recurring tier.** Not multiple tiers.

Multi-tier systems force fans to compare and decide at the moment of highest enthusiasm. They force artists to create differentiated value at each level. One tier removes all of that. The question is simply: *Do you want to be close?*

### The Close Circle tier

| Field | Value |
|---|---|
| Billing | Monthly recurring |
| Amount | Artist-set. Suggested range: £3–£12/month. Default: £5. |
| Currency | Artist's local currency (GBP default) |
| Cancellation | Any time. No lock-in. No guilt mechanics. |
| Platform fee | ABLE takes a percentage (rate TBD in commercial model, not this spec) |

### One-off support

Also exists, separately. "Support once" — a lighter-weight appreciation gesture. **Does not grant Close Circle access.** If one-off support unlocked the same access as recurring, the recurring model collapses. One-off support is appreciation, not relationship.

One-off support appears as a secondary option: `"Support once →"` below the main Close Circle CTA. Lower visual weight. No access gating attached.

---

## 3. What Close Circle Unlocks

**Principle:** supporter access unlocks **moments**, not content feeds.

### V1 unlock set

| Access type | Description | Tied to |
|---|---|---|
| Early access to releases | Supporters hear a track/EP before DSPs/public | Release moment |
| First ticket access | 24–48hr window before public sale | Show moment |
| Supporter-only streams | Private listening session, acoustic set, Q&A | Livestream moment |
| Close circle dispatches | Supporter-only text/audio/link update from artist. Infrequent by design. | Standalone (dispatch type) |
| Early access to merch drops | Supporters order before general release | Merch moment |
| Replay access | After public stream ends, replay is supporter-only | Livestream moment (ended lifecycle) |
| Acoustic / demo versions | Artist-chosen alternate release shared only with supporters | Release moment variant |

### Principle of restraint

The artist does not have to use all of these. An artist who creates one supporter-only stream per quarter and gives early access to releases has a complete, functional Close Circle. Minimum output expectation: zero. The system sets honest expectations from day one.

---

## 4. Fan Progression Model

Four levels. A path, not a funnel.

```
Public visitor
   ↓
Fan (email sign-up)
   ↓
Supporter (Close Circle — recurring monthly)
   ↓
Private / invite-only (artist-controlled, not a purchasable tier)
```

### Visibility at each level

| Element | Public visitor | Fan | Supporter |
|---|---|---|---|
| Artist profile | Full | Full | Full |
| Public moments | Visible | Visible + reminders | Visible + reminders |
| Supporter-only moments | Teaser (lock ring, no content) | Teaser | Full access |
| Early access windows | Not shown | Not shown | Visible and accessible |
| Close circle dispatches | Not shown | Not shown | Full |
| Private/invite-only moments | Not shown | Not shown | Visible if on invite list |

**Private / invite-only** is not a tier fans buy. The artist invites specific supporters to something specific — a listening session for 20 people, a small private event. Handled through the moment engine with an explicit invite list. Supporters are the pool the artist draws from; not all supporters get every private moment.

---

## 5. Canonical Supporter / Entitlement Model

### Supporter state object

```javascript
{
  artistHandle: 'mayabeats',
  fanEmail: 'fan@example.com',
  tier: 'supporter',          // 'none' | 'supporter'
  status: 'active',           // 'active' | 'paused' | 'cancelled'
  joinedAt: 1741875600000,    // Unix ms
  monthlyAmount: 5.00,
  currency: 'GBP',
  entitlements: {
    earlyAccess: true,
    supporterStreams: true,
    replayAccess: true,
    dispatches: true,
    inviteEligible: true       // eligible for invite-only moments — not guaranteed
  }
}
```

### Moment object — access extension

```javascript
// Extends canonical Moment from MOMENT_ENGINE_SPEC.md
{
  // ... existing Moment fields ...
  access: {
    level: 'supporter',         // 'public' | 'fan' | 'supporter' | 'invite'
    earlyAccessHours: 48,       // hours before public release (releases/merch/tickets)
    inviteList: [],             // email list for 'invite' level
    teaserVisible: true,        // whether locked moments show teaser to non-supporters
    teaserText: 'Close circle gets this first'
  }
}
```

### Entitlement resolution

```javascript
function canAccess(fanState, moment) {
  const level = moment.access.level
  if (level === 'public') return true
  if (level === 'fan') return fanState.tier !== 'none'
  if (level === 'supporter') return fanState.tier === 'supporter' && fanState.status === 'active'
  if (level === 'invite') return moment.access.inviteList.includes(fanState.fanEmail)
  return false
}

function isInEarlyWindow(moment) {
  const releaseMs = new Date(moment.date + 'T00:00:00').getTime()
  const windowMs = (moment.access.earlyAccessHours || 0) * 3600000
  return Date.now() >= (releaseMs - windowMs) && Date.now() < releaseMs
}
```

---

## 6. Public Profile Integration (`able-v6.html`)

### Entry point — hero area

A quiet tertiary line below the secondary hero CTA when Close Circle is active:

```
[Stream "Chalk" →]   [Pre-save →]
─────────────────────────────────
Join the close circle  →
```

Plain text with a subtle arrow. Not a button. Not a banner. An invitation. Suppressed when the top card is already promoting a supporter moment.

### Supporter-only moments in calendar / upcoming

Appear as dots in the World Map month grid with a lock-ring variant: a slightly muted circle ring rather than a filled dot. On tap, the panel shows locked or unlocked version based on fan state.

**For supporters:** moment shows fully. No badge, no special decoration. The absence of the lock ring is the signal.

**For non-supporters (teaserVisible: true):**

```
┌─────────────────────────────────────┐
│  ○  Private listening session       │  ← lock-ring + type label
│     Thursday, 8pm                   │
│     "Close circle gets this first"  │
│  [Join the close circle →]          │
└─────────────────────────────────────┘
```

### Early access windows

**Supporter view (in-window):**
```
┌─────────────────────────────────────┐
│  ●  Early access                    │
│     Strange Winter EP               │
│     48 hours before release         │
│  [Listen now →]                     │
└─────────────────────────────────────┘
```

**Non-supporter view (same window):**
```
┌─────────────────────────────────────┐
│  ○  Close circle early access       │
│     Strange Winter EP               │
│     Public release in 2 days        │
│  [Join the close circle →]          │
└─────────────────────────────────────┘
```

Non-supporters are told when the public gets it. The invitation is implicit, not pressuring.

### What does NOT appear on the public profile

- Supporter count or earnings data
- "Become my patron" language
- Tier comparison tables
- "You're missing out" messaging
- A dedicated Members / Club page
- Prominent banners or interstitials asking people to subscribe

---

## 7. Locked / Unlocked UX

### Close Circle join flow

Half-sheet slides up from bottom on tapping any "Join the close circle →" CTA:

```
┌─────────────────────────────────────────────────────┐
│  [Artist photo]  [Artist name]                      │
│  £[amount]/month                                    │
│  [Artist-set intro, max 160 chars]                  │
│                                                     │
│  Email    [              ]                          │
│  Payment  [              ]                          │
│                                                     │
│  [ Join the close circle ]                          │
│  £[amount]/month · Cancel any time                  │
└─────────────────────────────────────────────────────┘
```

No "Subscribe," no "Buy access," no "Become a member."

### Locked → unlocked on successful join

When the half-sheet dismisses after join:
- Supporter-only moment cards crossfade from locked to unlocked: lock ring fades out (300ms), content fades in (350ms, 100ms offset)
- Hero area: `"Join the close circle →"` fades out → `"Close circle · Active"` quiet label with accent dot
- No confetti, no celebration. Access arrives quietly. The content is the reward.

---

## 8. Top Card / Campaign Object Integration

### Promotion priority (extending MOMENT_ENGINE_SPEC.md)

```
Manual override
Gig (tonight)
Live release (≤14d)
Supporter-only stream — live now            ← new
Supporter early access — in window          ← new
Pre-release (upcoming)
Near-future (≤7d, any type)
Profile default
```

### Top card copy for supporter states

| State | Top card chip | Hero CTA |
|---|---|---|
| Supporter stream live, fan IS supporter | `"Live · Close circle"` | `"Watch now →"` |
| Supporter stream live, fan NOT supporter | Not promoted — profile default shows | — |
| Early access in window, fan IS supporter | `"Early access · Close circle"` | `"Listen now →"` |
| Early access in window, fan NOT supporter | `"Out in [N] days"` (standard pre-release chip) | `"Pre-save →"` |

**The non-supporter never sees a top card that actively excludes them.** They see the appropriate public-facing state.

---

## 9. Calendar Integration

Supporter-only moments appear in the World Map grid with a lock-ring dot variant (muted circle ring, not filled).

Early access windows appear as a half-filled dot — visible to everyone:
- Supporters: `"[Track] — early access now"` with stream CTA
- Non-supporters: `"Close circle early access · [Track] releases in [N] days"` with join CTA

---

## 10. Admin Model (`admin.html`)

### Close Circle section in admin nav

Dedicated section. Not buried in settings.

### Setup controls

**1. On/Off toggle**
`"Close Circle: On / Off"` — off by default.

**2. Monthly amount**
Number field. Pre-filled £5. `"Most artists set £3–£12/month"` shown as guidance.

**3. What you're offering**
Non-configurable checklist — shows what supporter access includes. The artist configures gating per-moment, not here.

**4. Close Circle intro text**
Max 160 chars. Appears in join half-sheet. Default: `"Get closer to [name]'s music. Early access, close circle sessions, and more."`

### Per-moment supporter gating

Each moment in admin has a `"Close Circle"` toggle:
- Off by default
- When on: `"Early access hours"` field appears (for releases/merch/tickets) or moment is marked supporter-only (for streams/dispatches)
- Preview indicator: `"Supporters see this [X]h early / Non-supporters see [public date]"`

### Dispatches (new moment type)

Simple composer in admin:
- Text field, max 500 chars
- Optional: SoundCloud link / YouTube link / image URL
- Audience: Close Circle always (this type is always supporter-only)
- Posted with `"Send to close circle"` — appears in supporters' World Map as a moment
- No feed view, no posting history in admin — dispatches are moments, not CMS entries

### Preview toggle

`"See as supporter / See as fan / See as visitor"` — same pattern as Showcase Mode preview.

### Supporter stats

Minimal card: `[N] supporters · £[X]/month · [Y] active this month`. No funnel, no churn rate.

---

## 11. Onboarding (`start.html`)

**Close Circle is not in first-run onboarding.**

Introduced after the artist publishes their profile and creates their first moment. A single contextual card appears in Campaign HQ (once only):

```
┌─────────────────────────────────────────────┐
│  Let your closest fans in                   │
│  Set up Close Circle to give supporters     │
│  early access and closer moments.           │
│  [Set up Close Circle →]                    │
└─────────────────────────────────────────────┘
```

Dismissed once → gone. Artist finds Close Circle in admin nav when ready.

No "You're missing out on £X/month." No urgency framing.

---

## 12. Landing Page (`landing.html`)

**Position:** After World Map demo, before Professional Discovery section.

**Treatment:** One panel. Not a pricing table. Not a feature grid.

Visual: phone showing a supporter-only stream moment — `"Close circle · Live now"` chip, artist name, RSVP count.

Copy:

> *Some fans want to be closer. Close Circle gives them a way.*
>
> *Early access. Supporter-only sessions. Close circle dispatches. Meaningful moments for the people who show up.*
>
> *From £3/month · Artist-set · Fans can cancel any time*

**What this never says:** monetise, earn, subscribe, premium tier, fan club, creator economy.

---

## 13. Shareability

**Principle: invitations, not advertisements.**

### Supporter stream share card (before live)

- Artist artwork / performance photo — full bleed upper 60%
- Artist name in display font
- `"Private listening session · Close circle"` — one line
- Date + time
- `ablemusic.co/[handle]` at the bottom — *not* the join link

Why not the join link: the card circulates on social media. The fan who is curious taps the ABLE link, finds the Close Circle entry point naturally. Hard conversion links in share cards feel pushy.

### Early access drop share card

- Release artwork
- `"Supporters get this first"`
- `"Out to everyone [date]"`
- `ablemusic.co/[handle]`

### Close circle dispatch

Dispatches are private. The artist may share a blank-front card: `"Something for the close circle →"` with the ABLE link. Content stays private; the existence of the dispatch is public.

---

## 14. Visual / Interaction / Performance Layer

### Lock-ring icon

A simple circle with a small gap at the top — not a padlock. Reads as "a circle not yet closed." Inline SVG, 16×16px. White 70% on dark, black 50% on light.

### Join sheet animation

- Slides up from bottom: `translateY(100%) → translateY(0)`, 350ms spring easing `cubic-bezier(0.34,1.56,0.64,1)`
- Backdrop: `rgba(0,0,0,0) → rgba(0,0,0,0.55)`, 300ms
- Content inside: staggered reveal — avatar → name/amount → intro → inputs → CTA, 60ms apart, `opacity: 0 → 1` + `translateY(6px) → 0`
- Dismiss: `translateY(0) → translateY(100%)`, 250ms acceleration easing

### Locked → unlocked transition

- Lock ring: `opacity: 1 → 0`, 300ms
- Content: `opacity: 0 → 1`, 350ms, 100ms offset
- Hero Close Circle entry: text swap with crossfade, 200ms

### Performance

- Join sheet in DOM but `display: none` until needed — no render blocking
- Supporter state checked once on page load from localStorage (v1 prototype) or lightweight API (v2+), cached for session
- Supporter-only content (stream embeds, audio) not loaded until entitlement confirmed

### Reduced-motion

`prefers-reduced-motion: reduce`: all transition durations ≤150ms, transforms disabled. Lock-ring fade: instant.

---

## 15. V1 Scope

### In V1

| Feature | Notes |
|---|---|
| One recurring supporter tier | Artist-set monthly amount |
| One-off support ("support once") | No access gating |
| Close Circle admin section | Toggle, amount, intro text, preview |
| Per-moment supporter gating | Toggle + early access hours per moment |
| Close circle dispatches | Text/link composer, supporter-only |
| Supporter-only stream type | Access-gated via Live Moments system |
| Early access windows | Hours-before-public for releases, merch, tickets |
| Replay access for ended streams | Automatic for supporter tier |
| Locked moment cards with teaser | Teasertext + join CTA for non-supporters |
| Half-sheet join flow | Email + payment |
| Supporter state (localStorage prototype) | Fan state persisted locally |
| Top card promotion for supporter moments | Early access window + live supporter streams |
| Close Circle landing panel | One section, not a pricing table |

### Deferred (Phase 2+)

| Feature | Reason |
|---|---|
| Multiple tiers | Complexity for marginal benefit |
| Supporter analytics dashboard | Backend required |
| Direct messaging / DMs | Product scope, support obligation |
| Comment sections | Community infrastructure |
| Supporter email broadcasts | Email infrastructure (Phase 2) |
| Invite-only moment management UI | Prototype: direct email list; UI is Phase 2 |
| Supporter-only showcase | Showcase + supporter integration |
| Annual plans | Billing complexity |
| Physical perks | Fulfilment logistics |

### Never

| Feature | Reason |
|---|---|
| Tip jars / tipping culture | Degrading for artists |
| Gamification (badges, levels, points) | Wrong register |
| Superfan public rankings | Invasive, unhealthy dynamics |
| Creator chat rooms | ABLE is not Discord |
| Paid one-to-one video calls | Exploitable, creates labour expectations |
| Unlock-per-post paywalling | Content mill model |
| Fan leaderboards based on spend | Manipulative |

---

## 16. The Three User-Facing Truths

These are the product truths the landing page, onboarding, and copy reduce to:

**1. Some fans want to be closer. Close Circle gives them a way.**
Not every fan. The right ones. The ones who keep showing up.

**2. Support unlocks real moments — not posts.**
Early access to what you're already making. A closer seat at things you're already doing. No content machine required.

**3. The relationship belongs to you.**
You set the terms. You decide what's in the close circle. Your fans, your calendar, your price.

---

## 17. The 10/10 Standard

Close Circle is complete when:

1. An artist can set it up in under five minutes
2. A fan can join without confusion or friction
3. The first supporter-only moment feels meaningful and worth the amount paid
4. The artist can go quiet for six weeks, release something, and find their supporters heard it first — without a single complaint about the silence
5. The profile does not look like a paywall to a non-supporter
6. The supporter does not feel like a customer in a transaction — they feel like someone who chose to stay close
7. The artist does not feel obligated to post to justify the monthly support
8. The system earns recurring revenue without ever using the word "subscribe"

This is the standard. Close Circle is ready when it clears all eight without workarounds.

---

*This spec is the single source of truth for Close Circle decisions. Implementation references MOMENT_ENGINE_SPEC.md for the canonical Moment object and access extension defined here. Amendments update this document directly.*
