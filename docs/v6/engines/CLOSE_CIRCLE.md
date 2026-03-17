# ABLE — Close Circle (Supporter System)
**Status: ACTIVE — spec complete. Payment implementation Phase 2.**
**Last updated: 2026-03-14**
**Detail spec:** `operational/CLOSE_CIRCLE_SPEC.md`

---

## What this engine does

Close Circle is the premium access layer. It lets the right fans move closer to an artist through meaningful access to moments — not through a content feed, not through a paywall, but through genuine proximity.

The artist sets one recurring tier. Fans who join get access to gated moments: early listens, private streams, supporter-only sessions. The relationship stays between artist and fan. ABLE holds the infrastructure, not the relationship.

---

## Core model

**One tier. Artist-set price. Default £5/month.**

Not a membership club. Not a Patreon. Not a subscription box. A way for the fans who care most to stay closest.

One-off support (ko-fi / buy-me-a-coffee style) also exists. It does not grant access gating — it is a direct thank-you, not a tier.

---

## Four-level fan progression

```
Visitor    →  Fan (email sign-up)  →  Supporter (Close Circle)  →  Invite-only
  ↑ public      ↑ fan-gated              ↑ supporter-gated           ↑ private
```

Each level unlocks access to moments at that level. An artist can have moments at any level simultaneously. The World Map shows which cells are locked.

---

## Canonical fan state

```javascript
{
  artistHandle: 'luna',
  fanEmail:     'fan@example.com',
  tier:         'supporter' | 'none',
  status:       'active' | 'paused' | 'cancelled',
  joinedAt:     ISO timestamp,
  monthlyAmount: 5,
  currency:     '£',
  entitlements: {
    earlyAccess:       true,
    supporterStreams:   true,
    replayAccess:      true,
    dispatches:        true,
    inviteEligible:    false
  }
}
```

**Full canonical object:** `data/CANONICAL_OBJECT_MODEL.md §5`

---

## Access resolution

```javascript
function resolveAccess(moment, fanState) {
  const level = moment.access || 'public'
  if (level === 'public') return 'open'
  if (level === 'fan' && fanState.email) return 'open'
  if (level === 'supporter' && fanState.tier === 'supporter' && fanState.status === 'active') return 'open'
  if (level === 'invite' && fanState.inviteEligible) return 'open'
  return 'locked'
}
```

---

## What supporters get (V1)

| Entitlement | Description |
|---|---|
| Early access | Hear releases before public drop |
| Supporter streams | Private livestreams / listening sessions |
| Replay access | Past supporter sessions stay available |
| Dispatches | Direct updates from the artist (not broadcast emails) |

**Not in V1:** Custom invite lists, fan direct messages, supporter-only merch discounts.

---

## Surface layer (V1 — implemented in able-v6.html)

- **Hero entry point:** Tertiary text link "Join the close circle →" below hero CTAs (shown when `cc.enabled` and fan is not yet a supporter)
- **Lock-ring dots:** World Map cells at `access: 'supporter'` or `access: 'invite'` render as open circles (`.wm-dot--locked`) for non-supporters
- **Supporter gate CTA:** Inside World Map panel for locked moments — "Join the close circle →" opens the join sheet
- **Join half-sheet:** `translateY(100%)→translateY(0)` spring animation (350ms). Contains artist name, price, intro text, email field, join CTA.

**Payment wiring:** Phase 2 (Stripe subscription). V1 join flow collects email and marks `profile.supporterSince` locally as prototype.

---

## What Close Circle does NOT do

- Compete with Patreon (ABLE is for the moment relationship, not ongoing content production)
- Gamify fan loyalty (no points, no tiers above supporter, no leaderboards)
- Gate basic profile content (public visitors always see a complete, beautiful profile)
- Send direct messages between artist and fan (not a messaging platform)
- Handle pay-per-post access (the model is access-to-moments, not content subscription)

---

## The three user-facing truths

1. **"Some fans want to be closer."** Close Circle is for them — not for everyone.
2. **"Support unlocks real moments — not posts."** Early access, live sessions, dispatches. Not a content wall.
3. **"The relationship belongs to you."** Artist owns the supporter list. Exports with the rest of the fan list.
