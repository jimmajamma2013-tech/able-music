# ABLE V6 — Scope and Status
**Created:** 2026-03-13
**Status:** ACTIVE — v6 is the current build target.

---

## What v6 is

V6 is the next complete build of the ABLE artist profile page. Target file: `able-v6.html`.

It is not a minor iteration of v3. It is a clean-sheet implementation informed by: 80+ design references, 200-person primary user research, 100-interaction micro-interaction library, and a full competitive analysis. The v5 documentation cycle produced the planning artefacts. V6 is what gets built from them.

## What v6 inherits from v5

V6 inherits **decisions**, not wording.

Specifically promoted:
- The complete design token system (7 vibes × 4 themes)
- The campaign state machine (profile / pre-release / live / gig)
- The CTA zone architecture (3 zones, strict caps, global dedupe rule)
- The full micro-interaction library (100 interactions, 17 must-builds)
- The localStorage → Supabase schema (key names frozen)
- The copy register (banned words, section naming, fan capture voice)
- All resolved contradictions (Spotify monthly listeners, Mid theme, fan capture placement, performance budgets)

V6 does not inherit:
- Any ambiguous or contradicted wording from v5 docs
- The `Mid` theme
- `able-v5.html` as a target filename
- "First Meaningful Paint" language
- Spotify monthly listener count as an expected field
- Bandsintown as mandatory

## What v6 does not build (deferred)

See Section 15 of `V6_BUILD_AUTHORITY.md` for the full deferred list. Summary:
Rooms, Press Pack, Story Mode, Ablers, Studio mode, Fan feed, Globe heatmap, Discovery leaderboard, Fourthwall/Shopify connect, Printful POD, Cloudflare migration.

## Rules for working in v6

1. V6 authority chain is the active workspace. Start here before opening any research doc.
2. Promote decisions into `V6_BUILD_AUTHORITY.md`, not into addenda that compound forever.
3. Reference docs inspire; they do not override.
4. Archive is for history. Do not resurrect archive content without promoting it through the authority chain.
5. Every new decision that affects implementation must be committed to `V6_BUILD_AUTHORITY.md` or the operational docs — not left in notes, chat, or comments.
6. Future cleanup goal: as v6 stabilises, consolidate the addenda into cleaner core docs. Reduce the authority chain length over time.

---

## Current build status

**Last updated: 2026-03-14 — Checkpoint 8 complete. Specs: Moment Engine, Live Moments, Showcase Interaction Layer added.**

| Component | Status |
|---|---|
| `able-v6.html` | **COMPLETE through Checkpoint 8** — see checkpoint log below |
| Design system (tokens, 7 vibes, 4 themes) | Complete — all tokens live in `able-v6.html` |
| Campaign state machine (profile/pre-release/live/gig) | Complete |
| State 4 (near-future): world map moment ≤7d → hero chip | Complete — `04f5476` |
| CTA zone architecture (3 zones, caps, dedupe) | Complete |
| §7.2 Phase 1 interactions (17 must-builds) | Complete — all 17 shipped |
| §7.1 animation rule compliance | Complete — btn glow uses `::after` opacity, no box-shadow loops |
| Hero artwork blur-up | Complete |
| Card bloom (two-system: rAF + IntersectionObserver) | Complete |
| Paste flash (400ms fade per §7.2 #16) | Complete |
| Error shake (−8/8/−5/5px, 0.4s ease-out) | Complete |
| Edit backdrop (55% opacity per §7.2 #13) | Complete |
| Panel asymmetric timing (350ms spring in / 250ms accel out) | Complete |
| Admin theme persistence | Complete — `data-theme` chips hydrate from `able_v3_profile.theme` |
| Fan capture + localStorage schema | Complete — keys frozen |
| **Artist World Map** — public profile | Complete — `2a426b9` — month grid, 8 types, 4 tiers, half-sheet panel, auto-population, State 4 bridge |
| **Artist World Map** — admin "Your World" | Complete — `ywInit`, `ywRenderMomentList` in `admin.html` |
| **Artist World Map** — landing demo state | Complete — `dp-wm` state in `landing.html` |
| Professional ecosystem spec | Spec complete (`df492b6`) — implementation Phase 2 |
| Showcase / Campaign Mode spec | Spec complete (`72f5d0d`) — implementation Phase 2 |
| Showcase interaction layer spec | Spec complete — companion to showcase spec |
| Live Moments / Streaming Moments spec | Spec complete (`8c18580`, `1def3b3`) — implementation Phase 2 |
| Moment Engine unified spec | Spec complete (`b562ecb`) — canonical Moment object defined |
| Supabase migration path | Planned — localStorage keys map 1:1 to table rows |
| Snap cards CRUD (admin) | Deferred to Phase 2 |
| Supabase auth + read path | Deferred to Phase 2 |
| Fan feed (fan.html) | Deferred to Phase 2 |
| Professional/studio profile layer | Deferred to Phase 2 |
| Skeleton loading system (hero/CTAs/bio) | Deferred to Phase 2 — §7.2 #5 |
| Full hero content crossfade on state change | Deferred to Phase 2 — §7.2 #9 |

---

## Checkpoint log

| # | Commit | Description |
|---|---|---|
| 1 | `d0169e3` | Foundation — shell, tokens, state machine |
| 2 | `dceb907` | Hero + state machine wiring |
| 3 | `ae19721` | CTA architecture + Quick Action pills |
| 4 | `12a273a` | Main content flow (music, events, merch, support) |
| 5 | `69193bf` | Interaction layer — §7.2 Phase 1 |
| 6 | `69193bf` | a11y + performance pass |
| 7 | `7d2acd1` | §7.1 + §7.2 audit fixes; admin theme persistence |
| 8 | `2a426b9` | Artist World Map — State 4 + hero wire-up; V3_KEY fix |

### Checkpoint 7 spot-check matrix (12/12 pass)

Verified via Playwright DOM evaluation (headless screenshots are blank in dark mode; structural checks confirm correctness).

| Theme | State | Verified |
|---|---|---|
| Dark | profile | ✓ |
| Dark | pre-release | ✓ |
| Dark | live | ✓ |
| Dark | gig | ✓ |
| Light | profile | ✓ |
| Light | live | ✓ |
| Glass | profile | ✓ |
| Glass | live | ✓ |
| Contrast | profile | ✓ |
| Contrast | live | ✓ |
| Dark | card bloom (hero visible) | ✓ |
| Dark | card bloom (below-fold IO) | ✓ |
