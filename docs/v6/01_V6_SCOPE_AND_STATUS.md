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

| Component | Status |
|---|---|
| `able-v6.html` | Not started — awaiting final authority confirmation |
| Design system (tokens, themes, vibes) | Fully specced in authority docs |
| Micro-interactions | Fully specced — 17 must-builds identified |
| Campaign states | Fully specced — state machine documented |
| Fan capture + GDPR | Fully specced |
| Admin slide-up panel | Specced |
| localStorage schema | Frozen |
| Supabase migration path | Planned |
| Fan feed (fan.html) | Deferred to Phase 2 |
| Studio/freelancer mode | Deferred to Phase 2 |
