# ABLE Surface — Landing Page (`landing.html`)
**Status: ⛔ SUPERSEDED — DO NOT USE FOR BUILD DECISIONS**
**Last updated: 2026-03-14 | Superseded: 2026-03-15**

> **This document is superseded by `docs/pages/landing/DESIGN-SPEC.md`.**
> The V8 strategy process produced a 9.65/10 complete build spec. Use that.
> This file is retained for historical reference only.

---

*How the product truth and engines translate into the marketing landing page.*

---

## What this surface is

The page that convinces an artist to try ABLE. It has one job: prove the three things a new artist needs to believe before they sign up (defined in `PRODUCT_TRUTH.md`).

1. The page is beautiful — specific to the artist, not a template
2. Fans can actually do something here — stream, buy a ticket, sign up
3. The relationship stays yours — fan list, 0% cut, export any time

Everything else on the landing page is in service of those three proofs.

---

## Key demo components

### Phone mockup
The phone shows a real artist profile — not a screenshot, not a placeholder. It rotates through demo states to show the system's range.

Current demo states:
- **`dp-wm`** — World Map state: fan taps a month cell, half-sheet panel slides up
- **Feel cycling demo** — same artist, cycling through 3 feel quadrants with 3s crossfade: `intimate-refined` → `bold-raw` → `bold-refined`. Caption: "Built around your sound, your mood, and your moment."

No mention of genres, templates, or themes in captions.

### Pricing section
Honest, specific. Four tiers.

| Tier | Price | Headline |
|---|---|---|
| Free | £0 | "A real page. Yours from day one." |
| Artist | £9/mo | "For artists taking it seriously." |
| Artist Pro | £19/mo | "Full fan CRM. Broadcasts. Advanced analytics." |
| Label | £49/mo | "10 artist pages. Team access." |

**Annual:** "Save 2 months." Never default to annual.

**No "Most Popular" badge.** No artificially inflated crossed-out prices. No dark patterns.

---

## Copy rules (landing-specific)

The landing page never says:
- "template" — there are no templates
- "grow your audience" — say "reach people who care"
- "content creator" — say "artist"
- "going viral" — never

The landing page does say:
- "Your page. Your list. Your relationship." — the core truth
- "Zero ABLE cut on support income. Stripe fees only." — direct
- "Export your fan list any time." — explicit ownership
- "No algorithm deciding what your fans see." — the contrast

**Full copy register:** `core/COPY_AND_DESIGN_PHILOSOPHY.md`

---

## Conduit principle on the landing page

The phone mockup must show real native embeds — a Spotify widget, a YouTube thumbnail, an event card with a full-bleed venue image. Not placeholder screenshots. The conduit principle (`core/V6_BUILD_AUTHORITY.md §17`) applies here: show the content being experienced, not linked to.

---

## What the landing page does NOT do

- Explain how ABLE works technically (no "how it works" section — show, don't explain)
- Pitch artists as "content creators" or "influencers"
- Use a comparison table that positions ABLE against Linktree (implication is fine; direct comparison is fragile)
- Show pricing as a grid of feature bullets (show value, not feature lists)
- Promise features that are Phase 2 (everything shown must be real and live)
