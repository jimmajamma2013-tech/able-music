# ABLE Surface — Onboarding Wizard (`start.html`)
**Status: ACTIVE**
**Last updated: 2026-03-14**

*How the identity and campaign engines translate into the first-run artist experience.*

---

## What this surface is

The first thing a new artist touches. 5 questions. 90 seconds. At the end, they have a live page that looks like their world.

The wizard collects the minimum needed to make the profile genuinely personal from day one. Everything else is in admin.

---

## The 5 steps

| Step | Question | What it captures | Engine |
|---|---|---|---|
| 1 | Name + vibe | `profile.name`, `profile.vibe`, `profile.bio`, `profile.platforms[0]` (Spotify) | Guided Identity (genre) |
| 2 | How does your music feel? | `profile.identity.feel` | Guided Identity (feel quadrant) |
| 3 | Your colour | `profile.accent` | Guided Identity (accent) |
| 4 | How it feels (theme) | `profile.theme` | Guided Identity (theme) |
| 5 | One thing, front and centre | `profile.ctaPrimary`, `profile.ctaSecondary` | Moment Engine (objective seed) |

---

## Step 2 detail — feel selection

The feel step is the most important addition in Checkpoint 11. Four options:

| Button label | Slug | CSS cascade effect |
|---|---|---|
| "Stripped back" | `intimate-raw` | 150ms snap, flat cards, desaturated images |
| "Warm and cinematic" | `intimate-refined` | 600ms decel, soft radius, warm sepia tint |
| "Underground and direct" | `bold-raw` | 200ms spring, sharp corners, full contrast |
| "Clean and confident" | `bold-refined` | 350ms confident spring, medium radius |

`selectFeel(feel)` sets `P.feel` and updates `data-feel` on the live preview shell in real time.

---

## Save schema

On wizard completion (`goStep('done')`), writes to `localStorage('able_v3_profile')`:

```javascript
{
  name, handle, bio, vibe, accent, theme, genres,
  stateOverride: null,
  ctaPrimary:    { label, url },
  ctaSecondary:  { label, url },
  platforms:     [ { label: 'Spotify', url: spotifyUrl, type: 'spotify' } ],
  identity: {
    genre:        P.vibe,
    feel:         P.feel || 'bold-refined',
    accent:       P.accent,
    accentSource: 'artist',
    refinements:  { darkness:0, spacing:0, sharpness:0, contrast:0, warmth:0 }
  }
}
```

Also writes legacy `able_profile` key for backwards compat.

---

## Live preview

The right pane (or "See your page →" toggle on mobile) renders `able-v6.html` in an iframe or scrollable preview. Updates on every step without page reload. `data-feel` on the preview shell updates in real time when artist selects a feel option.

---

## Copy rules (onboarding-specific)

- "Your music plays here" — not "Add your streaming links"
- Genre step: vibe names, not genre taxonomy labels (e.g. "Electronic / Club", not "EDM")
- Feel step: human descriptions only — never show the slug (`bold-raw`)
- Progress indicator: "Step N of 5" — honest count
- Done state: "Your page exists now." — not "You're all set!"

Full copy register: `core/COPY_AND_DESIGN_PHILOSOPHY.md`

---

## What onboarding does NOT collect

- Release date (add in admin after first publish)
- Events (add in admin)
- Merch (add in admin)
- Support packs (add in admin)
- Snap cards (add in admin)
- World Map moments (add in admin)

The wizard produces a beautiful, complete-feeling profile from just 5 answers. The rest is admin.
