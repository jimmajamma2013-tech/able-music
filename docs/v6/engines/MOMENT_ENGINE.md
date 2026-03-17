# ABLE — Moment Engine
**Status: ACTIVE**
**Last updated: 2026-03-14**
**Detail specs:** `operational/MOMENT_ENGINE_SPEC.md`, `operational/MOMENT_CALENDAR_SPEC.md`, `operational/LIVE_MOMENTS_UI_SPEC.md`, `operational/STREAMING_MOMENTS_SPEC.md`

---

## What this engine does

The Moment Engine is the heart of the product. Everything time-sensitive flows through it. It decides:

- What the artist profile is currently emphasising (campaign state)
- What access level each moment has (public / fan / supporter / invite)
- What the World Map shows and when
- When hero emphasis shifts automatically

The Moment Engine drives the profile without the artist having to touch anything after setup. That's its job.

---

## The five campaign states

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
// Gig: manual admin toggle. Auto-expires 24h (able_gig_expires timestamp). Overrides all other states.
// Near-future: not a named state — a bridge condition when a moment is ≤7 days out.
```

| State | Trigger | What the profile emphasises |
|---|---|---|
| `profile` | Default / 14+ days post-release | Bio, latest release stream CTA |
| `pre-release` | Release date set in future | Countdown chip, pre-save CTA |
| `live` | Release date reached | Top card media, stream CTA leads |
| `gig` | Manual 24hr toggle | Venue/date prominent, ticket CTA full-width |
| Near-future bridge | Any moment ≤7 days out | World Map hero chip, reminder CTA |

State drives section order and CTA prominence. The Guided Identity Engine handles visual personality — these are separate concerns.

---

## The Moment object

The canonical Moment is defined in `data/CANONICAL_OBJECT_MODEL.md §3`. Moments are the atomic unit of the World Map and the Close Circle access system.

Key fields that the Moment Engine reads:

```javascript
{
  type:    'show' | 'release' | 'livestream' | 'early_access' | 'rehearsal' |
           'interview' | 'session' | 'remix' | 'collab',
  date:     ISO date string,
  active:   boolean,
  access:  'public' | 'fan' | 'supporter' | 'invite'
}
```

The Moment Engine uses `date` to determine near-future status (≤7 days) and expired status. It uses `access` to determine World Map cell rendering (open dot / lock-ring dot / private cell).

---

## World Map

The World Map is the public-facing timeline of an artist's moment history and upcoming activity. It is not a social feed — it is a record.

- Grid: 12 months × moment types. Cells fill as moments are added.
- 4 access tiers: public → fan → supporter → invite
- Lock-ring dots for supporter/invite cells when fan is not entitled
- Half-sheet panel on cell tap: moment detail + appropriate CTA
- State 4 bridge: if any public moment is ≤7 days out → hero chip appears

**Detail:** `operational/MOMENT_CALENDAR_SPEC.md`, `operational/WORLD_MAP_CROSS_PRODUCT.md`

---

## Live Moments and Streaming Moments

When an artist is actively streaming (livestream type moment, `active: true`):

- World Map cell glows (pulsing dot)
- Hero can surface "Live now" chip with join CTA
- Supporter-gated streams show lock state to non-supporters
- One-off stream access (not recurring) is a fan-side entitlement

**V1 status:** Spec complete. Implementation Phase 2.
**Detail:** `operational/LIVE_MOMENTS_UI_SPEC.md`, `operational/STREAMING_MOMENTS_SPEC.md`

---

## Big Calendar (upcoming moments surface)

The full calendar view of an artist's upcoming moments — shows, releases, streams, sessions — in a scrollable month-by-month layout. Integrates with the World Map grid.

**V1 status:** Spec complete (`operational/MOMENT_CALENDAR_SPEC.md`). UI implementation Phase 2.

---

## What the Moment Engine does NOT do

- Set visual personality (that's Guided Identity)
- Handle payment or access gating logic (that's Close Circle)
- Decide copy or section naming (that's copy register in `core/COPY_AND_DESIGN_PHILOSOPHY.md`)
- Drive the fan dashboard (that's Fan Product engine)
