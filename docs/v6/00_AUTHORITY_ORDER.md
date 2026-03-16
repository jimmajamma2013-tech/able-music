# ABLE — Authority Order
**Status: ACTIVE — read this first.**
**Last updated: 2026-03-15 | V8 strategy layer added**

---

## ⚡ V8 Strategy Layer — supersedes surfaces/* for ALL build decisions

The V8 strategy process (2026-03-15) produced complete, scored build specs for every page and system. These are the primary build authority:

| Page/System | Build authority doc | Score |
|---|---|---|
| `able-v7.html` | `docs/pages/profile/DESIGN-SPEC.md` | 9.7/10 |
| `admin.html` | `docs/pages/admin/DESIGN-SPEC.md` | 9.7/10 |
| `start.html` | `docs/pages/onboarding/DESIGN-SPEC.md` | 9.9/10 |
| `landing.html` | `docs/pages/landing/DESIGN-SPEC.md` | 9.65/10 |
| `fan.html` | `docs/pages/fan/DESIGN-SPEC.md` | in progress |
| Design tokens | `docs/systems/DESIGN_SYSTEM_SPEC.md` | 9.5/10 |
| Micro-interactions | `docs/systems/MICRO_INTERACTIONS_SPEC.md` | 9.5/10 |
| Copy system | `docs/systems/copy/SPEC.md` | in progress |
| Data architecture | `docs/systems/data-architecture/SPEC.md` | in progress |
| All other systems | `docs/systems/[system]/SPEC.md` | in progress |

**`docs/v6/surfaces/*` are DEPRECATED** — each has a superseded notice pointing to the correct V8 doc.

---

## The six-layer structure

ABLE's documentation is organised into six layers. Read the layer that's relevant to your task. You do not need to read all layers for every session.

```
Layer 0  —  Core Product Truth       PRODUCT_TRUTH.md
Layer 1  —  V1 Scope and Status      V1_SCOPE.md
Layer 2  —  Core Technical Rules     core/V6_BUILD_AUTHORITY.md
Layer 3  —  Product Engines          engines/
Layer 4  —  Canonical Object Model   data/CANONICAL_OBJECT_MODEL.md
Layer 5  —  Surface Translation      surfaces/
```

Visual/interaction/performance rules live in `core/V6_BUILD_AUTHORITY.md §3–7` and `core/VISUAL_SYSTEM.md`. Copy register lives in `core/COPY_AND_DESIGN_PHILOSOPHY.md`.

---

## Authority chain (highest to lowest)

When any two documents disagree, the higher-ranking document wins. No exceptions.

1. **`PRODUCT_TRUTH.md`** — what ABLE is. Nothing overrides this.
2. **`V1_SCOPE.md`** — what is in v1, what is deferred, what is never.
3. **`core/V6_BUILD_AUTHORITY.md`** — all resolved technical decisions.
4. **`core/VISUAL_SYSTEM.md`** — authoritative vibe table, font values, accent values.
5. **`core/COPY_AND_DESIGN_PHILOSOPHY.md`** — copy register, voice, banned phrases.
6. **`engines/*`** — engine logic (subordinate to core; authoritative within engine domain).
7. **`data/CANONICAL_OBJECT_MODEL.md`** — object shapes (subordinate to engines; wins over individual spec JS models).
8. **`surfaces/*`** — rendering rules (subordinate to everything above).
9. **`operational/*`** — implementation detail for specific systems (backing reference for engine docs).
10. **`docs/reference/*`** — research foundation (inform but do not override v6 authority).
11. **`docs/archive/*`** — historical only. Do not cite as current authority.

---

## What to read for each task type

| Task | Read first | Then read |
|---|---|---|
| Starting a new session | `PRODUCT_TRUTH.md`, `V1_SCOPE.md` | Relevant engine + surface |
| Building `able-v6.html` | `V1_SCOPE.md`, `core/V6_BUILD_AUTHORITY.md` | `surfaces/ARTIST_PROFILE.md` |
| Adding a feature | `PRODUCT_TRUTH.md`, `V1_SCOPE.md` | Relevant engine doc |
| Changing copy | `core/COPY_AND_DESIGN_PHILOSOPHY.md` | Relevant surface doc |
| Visual/token work | `core/V6_BUILD_AUTHORITY.md §3`, `core/VISUAL_SYSTEM.md` | `engines/GUIDED_IDENTITY.md` |
| Identity system | `engines/GUIDED_IDENTITY.md` | `data/CANONICAL_OBJECT_MODEL.md §4` |
| Moment/campaign work | `engines/MOMENT_ENGINE.md` | `surfaces/ARTIST_PROFILE.md` |
| Close Circle / supporter | `engines/CLOSE_CIRCLE.md` | `data/CANONICAL_OBJECT_MODEL.md §5` |
| Onboarding | `surfaces/ONBOARDING.md` | `engines/GUIDED_IDENTITY.md` |
| Admin dashboard | `surfaces/ADMIN.md` | Relevant engine docs |
| Data model / schema | `data/CANONICAL_OBJECT_MODEL.md` | `core/V6_BUILD_AUTHORITY.md §6.2` |

---

## Settled decisions quick-reference

Often-confused points. The answer is here so you don't have to dig.

| Question | Answer |
|---|---|
| Body font for profile? | DM Sans — not Plus Jakarta Sans (that's admin only) |
| How many themes? | 4: Dark, Light, Glass, Contrast. Mid does not exist. |
| How many feel quadrants? | 4: intimate-raw, intimate-refined, bold-raw, bold-refined |
| Target file? | `able-v6.html` |
| Backend for v1? | Supabase (not Cloudflare D1 — that's a v2 option) |
| Electronic r-mult? | 0.6 |
| Pop display font? | Barlow Condensed 700 |
| Spotify monthly listeners in UI? | No — not available via public API |
| Bandsintown required? | No — optional enrichment only |
| Performance metric? | LCP / INP / CLS — not FMP |
| Fan capture placement? | After hero, bio, and pills (screenful 3) — not above fold |
| Admin accent colour? | Amber `#f4b942` — different from artist accent |
| ABLE cut on support income? | 0% — Stripe fees only |
| Close Circle tier count? | 1 (single recurring tier — artist-set price) |
| V1 admin type? | Separate `admin.html` file — slide-up panel is Phase 2 |

---

## Rule

Any decision not addressed in the v6 authority chain → promote it to `core/V6_BUILD_AUTHORITY.md`, resolve it, commit it. Do not leave it unresolved in reference files, chat, or comments.

---

## Build status

See `V1_SCOPE.md` for the full checkpoint log and component status table.

Current: **Checkpoint 10 complete** — Guided Identity System `data-feel` CSS live.
