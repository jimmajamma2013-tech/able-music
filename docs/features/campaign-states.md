# Feature: Campaign States
**Status: ✅ Built | V1**

---

## What it is

The artist's profile page has four states that change the fan experience based on where the artist is in their release cycle. The page is not a static link-in-bio — it is an intelligent page that knows what moment it is in.

---

## The four states

| State | When | Fan experience |
|---|---|---|
| `profile` | Default / 14+ days post-release | Artist info, latest release stream CTA |
| `pre-release` | Release date set in the future | Countdown timer, pre-save CTA prominent |
| `live` | Release date reached, within 14 days | Top card media front and centre, stream CTA dominant |
| `gig` | Manual 24h toggle activated | Tickets front-and-centre, "On tonight" badge |

---

## How it works

**Auto-switch logic** — computed from release date:

```javascript
function computeAutoState(profile) {
  const now = Date.now()
  const gigExpires = parseInt(localStorage.getItem('able_gig_expires') || '0', 10)
  if (gigExpires && now < gigExpires) return 'gig'
  if (!profile.releaseDate) return 'profile'
  const releaseTime = new Date(profile.releaseDate).getTime()
  if (now < releaseTime) return 'pre-release'
  if (now < releaseTime + 14 * 24 * 3600 * 1000) return 'live'
  return 'profile'
}
```

**Override** — artist can force a state via `profile.stateOverride`. Gig mode is always triggered by `able_gig_expires` timestamp.

**State is read by:**
- `able-v7.html` — to render the correct fan experience
- `admin.html` — for Campaign HQ display and contextual greeting
- `fan-capture` — to tag which state a fan signed up during (`campaignState` field)
- `fan-confirmation.js` — to send state-appropriate confirmation email copy

---

## Files

| File | Role |
|---|---|
| `able-v7.html` | Reads state, renders correct fan experience |
| `admin.html` | Campaign HQ — set release date, activate gig mode, view current state |
| `netlify/functions/fan-confirmation.js` | Uses campaignState to choose email copy |

---

## Storage keys

| Key | Contents |
|---|---|
| `able_v3_profile.releaseDate` | ISO date string for release |
| `able_v3_profile.stateOverride` | Force a specific state |
| `able_gig_expires` | Unix ms timestamp — gig mode auto-deactivates at midnight |

---

## The campaign state is ABLE's signature feature

No other link-in-bio tool does this. The page becomes a pre-save page before the drop, a streaming page on release day, and a tickets page on show night — automatically. This intelligence is the product's core differentiator. Every design decision should make it more visible, not bury it.

---

## Spec reference

`docs/pages/profile/DESIGN-SPEC.md` — campaign state rendering per state
`docs/systems/CROSS_PAGE_JOURNEYS.md` — campaign management journey (§1.3)
