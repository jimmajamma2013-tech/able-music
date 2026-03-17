# ABLE — Superfan Scoring Algorithm
**Version: 1.0 | Created: 2026-03-13 | Feeds: Phase 9 of v5 build**

The superfan score is the most important data ABLE gives an artist. It answers the question no platform currently answers: *who actually cares about my music?* Not who has the most followers. Not who streams the most. Who shows up.

---

## Design principles

1. **Fans never see their score** — they see their tier and what unlocks next. Score is internal; progression is visible.
2. **Actions speak louder than streams** — a fan who buys one ticket outweighs one who streamed 100 times and never clicked anything else.
3. **Recency matters** — old engagement decays. A fan who was active 8 months ago and has gone quiet is not a superfan anymore.
4. **Artist-specific** — scores are per artist-fan pair, not global. A fan can be a Listener on one ABLE page and Inner Circle on another.
5. **No score gaming** — actions that could be gamed (clicking the same link repeatedly) are capped. Only first-time or meaningful repeat actions count.

---

## Scoring model

### Action weights

| Action | Points | Cap | Notes |
|---|---|---|---|
| **Email sign-up** | 100 | once | Foundational — this is why ABLE exists |
| **Page visit** | 2 | 10/day | Repeat visits signal genuine interest |
| **CTA click (primary)** | 15 | 3/week per CTA | Clicking the same thing 50 times ≠ 50× value |
| **CTA click (secondary)** | 8 | 3/week per CTA | |
| **Platform pill tap** | 5 | 2/week per platform | Spotify, Apple Music etc. |
| **Merch item tap** | 12 | 5/week | Browsing intent signal |
| **Support pack tap** | 20 | 2/week | High intent |
| **Support pack purchase** | 200 | once per pack | Highest single signal |
| **Merch purchase (connected store)** | 150 | once per item | Via Shopify/Bandcamp connect |
| **Ticket purchase (via Bandsintown)** | 180 | once per show | |
| **Email opened (broadcast)** | 25 | once per email | |
| **Email link clicked (broadcast)** | 40 | once per email | |
| **Snap card interaction** | 8 | 3/week | Tap to expand, long-press, share |
| **Shared artist page** | 80 | 3/lifetime | Sharing is a strong signal of advocacy |
| **Referral led to sign-up** | 150 | unlimited | Each new fan they brought in |
| **Pre-save** | 60 | once per release | Committed enough to pre-save |
| **QR code scan (offline)** | 120 | once per device | High-intent offline discovery |
| **Page load state = gig + clicked ticket** | +50 bonus | once per gig | Right-place-right-time bonus |

---

## Tier thresholds

| Tier | Name | Minimum score | Display colour |
|---|---|---|---|
| 1 | Listener | 100 (sign-up) | `--color-text-3` (muted) |
| 2 | Fan | 250 | `rgba(var(--color-accent-rgb), 0.6)` |
| 3 | Supporter | 600 | `var(--color-accent)` |
| 4 | Superfan | 1,400 | `var(--color-accent)` + glow |
| 5 | Inner Circle | 3,000+ OR artist-granted | Gold `#f4b942` — always |

**Inner Circle override**: Artist can manually add any fan to Inner Circle regardless of score. This is intentional — the artist may know things ABLE doesn't (the friend who's been at every show, the fan who sent a letter). Inner Circle grants should be noted in the fan's record as "artist-granted" vs "earned."

---

## Time decay

Scores decay toward zero over time without fresh engagement. This prevents old fans from permanently occupying high tiers without recent activity.

### Decay function

```js
function decayedScore(rawScore, lastActivityDate) {
  const daysSinceActivity = (Date.now() - lastActivityDate) / 86400000

  if (daysSinceActivity <= 30) return rawScore               // full score up to 30 days
  if (daysSinceActivity <= 90) {
    const decay = (daysSinceActivity - 30) / 60              // 0 → 1 over days 30–90
    return rawScore * (1 - decay * 0.3)                      // max 30% decay at 90 days
  }
  if (daysSinceActivity <= 180) {
    const decay = (daysSinceActivity - 90) / 90              // 0 → 1 over days 90–180
    return rawScore * 0.7 * (1 - decay * 0.3)               // 70% → 49% over this period
  }
  if (daysSinceActivity <= 365) {
    const decay = (daysSinceActivity - 180) / 185
    return rawScore * 0.49 * (1 - decay * 0.4)              // 49% → 29% at 1 year
  }
  return rawScore * 0.25                                      // floor: 25% after 1 year
}
```

**Why a floor (not zero):** A fan who bought a ticket 18 months ago and went silent still showed up. That deserves some credit. A hard zero would be unjust.

**Purchases never decay to zero**: Any transaction (merch, ticket, support pack) has a decay floor of 40% of its base score, regardless of time. Money spent is a fact, not a recency signal.

```js
function decayedPurchaseScore(rawScore, lastActivityDate) {
  const base = decayedScore(rawScore, lastActivityDate)
  return Math.max(base, rawScore * 0.4)
}
```

---

## Multipliers

Applied after decay. Stacked multiplicatively, capped at 2.5× total.

| Condition | Multiplier | Why |
|---|---|---|
| Fan has been on the list for > 6 months | 1.1× | Loyalty signal |
| Fan has been on the list for > 12 months | 1.2× | Sustained loyalty |
| Fan opened the last 3 consecutive emails | 1.15× | Active attention |
| Fan signed up via QR code (offline) | 1.2× | Strongest discovery signal |
| Fan referred 3+ new fans | 1.3× | Amplifier — rare and valuable |
| Fan present at ≥ 3 gig-mode sessions | 1.25× | Serial attender |

---

## Score recalculation schedule

- **Real-time**: Page visit, CTA click, sign-up, snap card interaction (these update on action)
- **Hourly**: Email open/click (email provider webhook latency)
- **Daily at 2am**: Decay recalculation for all fans (background job — not user-facing)
- **On purchase event**: Immediate, then decay recalculation for that fan

In localStorage (pre-backend): recalculate on admin.html load and on page unload. Store `lastCalculated` timestamp. Recalculate if > 1 hour old.

---

## What the artist sees

### Fan list card (compact)
```
[Avatar initials]  Amara L.
                   Joined 4 months ago · from Instagram
                   ●●●○○  Supporter
```

### Fan detail sheet (taps to open)
```
AMARA L.
Supporter  ●●●○○

Score: 847 pts  (decayed: 712 pts)
Last active: 3 days ago

Activity breakdown:
  Signed up           +100
  CTA clicks (23×)    +180
  Email opens (8×)    +200
  Bought: "Dissolve"  +200  (Bandcamp)
  Shared page (1×)    +80
  Page visits (42×)   +20  [capped]

Next tier: Superfan (1,400 pts)
Gets you: early ticket access, exclusive stems

[ Send personal message ]  [ Add to Inner Circle ]
```

### What artists never see
- The raw algorithm or weighting
- Comparison between fans (no "Amara scores higher than Tom" UI)
- Any metric that could feel invasive to the fan

---

## Fan-facing tier display

Fans see their tier on their fan dashboard (fan.html). They never see a number.

```
You're a Supporter on Mara J.'s page.
━━━━━━━━━━━━━●──────────────────
                         Superfan unlocks:
                         · Early ticket access
                         · Exclusive stems
```

Progress bar fills toward the next tier. No percentage shown — just a visual position. This creates motivation without anxiety.

**Fan tier names are fixed** (not artist-customisable in v5 — a future Pro feature). The Inner Circle name can be customised: artist can rename it to "The Room" or "Core" or their own term.

---

## localStorage implementation (pre-backend)

```js
const SUPERFAN_WEIGHTS = {
  signup: 100, visit: 2, cta_primary: 15, cta_secondary: 8,
  pill: 5, merch_tap: 12, support_tap: 20, support_purchase: 200,
  merch_purchase: 150, ticket_purchase: 180, email_open: 25,
  email_click: 40, snap_interaction: 8, share: 80,
  referral_signup: 150, presave: 60, qr_scan: 120
}

const CAPS = {
  visit: { count: 10, period: 'day' },
  cta_primary: { count: 3, period: 'week' },
  cta_secondary: { count: 3, period: 'week' },
  pill: { count: 2, period: 'week' },
  snap_interaction: { count: 3, period: 'week' }
}

const TIER_THRESHOLDS = [
  { name: 'listener', min: 100, max: 249 },
  { name: 'fan', min: 250, max: 599 },
  { name: 'supporter', min: 600, max: 1399 },
  { name: 'superfan', min: 1400, max: 2999 },
  { name: 'inner_circle', min: 3000, max: Infinity }
]

function getTier(score) {
  return TIER_THRESHOLDS.find(t => score >= t.min && score <= t.max)?.name || 'listener'
}
```

Fan records in `able_fans`:
```js
{
  email: 'amara@example.com',
  ts: 1741875600000,           // sign-up timestamp
  source: 'instagram',
  score: 847,                  // raw score
  decayedScore: 712,           // last calculated decayed score
  lastActivity: 1741789200000, // timestamp of most recent action
  lastCalculated: 1741876000000,
  actions: [                   // FIFO, max 100 entries
    { type: 'signup', ts: 1741875600000, pts: 100 },
    { type: 'cta_primary', ts: 1741879200000, pts: 15 },
    // ...
  ],
  tier: 'supporter',
  artistGranted: false         // true if artist manually added to Inner Circle
}
```

---

*This document is the authoritative scoring spec. Claude building v5 Phase 9 must implement this exactly. Do not invent alternative scoring models.*
