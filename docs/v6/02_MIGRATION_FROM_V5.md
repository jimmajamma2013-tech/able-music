# ABLE V6 — Migration from V5
**Created:** 2026-03-13

---

## Files promoted into v6 authority

| Original path | New path | Classification |
|---|---|---|
| `docs/V6_BUILD_AUTHORITY.md` | `docs/v6/core/V6_BUILD_AUTHORITY.md` | Core authority — top of chain |
| `docs/VISUAL_SYSTEM.md` | `docs/v6/core/VISUAL_SYSTEM.md` | Core — fonts and vibes authoritative |
| `docs/COPY_AND_DESIGN_PHILOSOPHY.md` | `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` | Core — copy register |
| `docs/V5_BUILD_PROMPT.md` (v5.4) | `docs/v6/build/V5_BUILD_PROMPT.md` | Build spec — phases and structure |
| `docs/V5_MASTER_BRIEF.md` | `docs/v6/build/V5_MASTER_BRIEF.md` | Build brief — companion to prompt |
| `docs/V5_RESEARCH_ADDENDUM.md` | `docs/v6/addenda/V5_RESEARCH_ADDENDUM.md` | Addenda — 26 correction sections |

## Files promoted to v6 operational

| Original path | New path | Notes |
|---|---|---|
| `docs/BACKEND_SCHEMA.md` | `docs/v6/operational/BACKEND_SCHEMA.md` | Still relevant for Supabase |
| `docs/SUPERFAN_SCORING_ALGORITHM.md` | `docs/v6/operational/SUPERFAN_SCORING_ALGORITHM.md` | V6 Phase 1+ |
| `docs/FAN_DASHBOARD_SPEC.md` | `docs/v6/operational/FAN_DASHBOARD_SPEC.md` | Phase 2 spec — keep accessible |
| `docs/FREELANCER_SPEC.md` | `docs/v6/operational/FREELANCER_SPEC.md` | Phase 2 spec |
| `docs/PROFESSIONAL_DISCOVERY.md` | `docs/v6/operational/PROFESSIONAL_DISCOVERY.md` | Phase 2 spec |
| `docs/DISCOVERY_DIRECTORY_SPEC.md` | `docs/v6/operational/DISCOVERY_DIRECTORY_SPEC.md` | Phase 2 spec |

## Files moved to reference (inform but do not override)

| Original path | New path |
|---|---|
| `docs/USER_RESEARCH.md` | `docs/reference/research/USER_RESEARCH.md` |
| `docs/DESIGN_RESEARCH_2026.md` | `docs/reference/research/DESIGN_RESEARCH_2026.md` |
| `docs/MASTER_PLAN.md` | `docs/reference/research/MASTER_PLAN.md` |
| `docs/PLATFORM_STRATEGY.md` | `docs/reference/research/PLATFORM_STRATEGY.md` |
| `docs/PRODUCT_HIERARCHY_AND_TRUST.md` | `docs/reference/research/PRODUCT_HIERARCHY_AND_TRUST.md` |
| `docs/INTEGRATIONS_AND_AI_RESEARCH.md` | `docs/reference/research/INTEGRATIONS_AND_AI_RESEARCH.md` |
| `docs/DISCOVERY_AND_GROWTH.md` | `docs/reference/research/DISCOVERY_AND_GROWTH.md` |
| `docs/ECOSYSTEM_AND_PARTNERSHIPS.md` | `docs/reference/research/ECOSYSTEM_AND_PARTNERSHIPS.md` |
| `docs/brainstorms/2026-03-13-top-minds-insights.md` | `docs/reference/research/2026-03-13-top-minds-insights.md` |
| `docs/brainstorms/2026-03-10-v3-design-brainstorm.md` | `docs/reference/design-system/2026-03-10-v3-design-brainstorm.md` |
| `docs/micro-interactions/` (all 10 files) | `docs/reference/micro-interactions/` |

## Files archived (historical — do not use as authority)

| Original path | New path | Reason |
|---|---|---|
| `docs/PRODUCT_SPEC.md` | `docs/archive/superseded-v5/PRODUCT_SPEC.md` | Legacy v1 spec — vocabulary ref only |
| `docs/ROADMAP.md` | `docs/archive/superseded-v5/ROADMAP.md` | Legacy v1/v2 engineering roadmap |
| `docs/QA_SMOKE_TESTS.md` | `docs/archive/superseded-v5/QA_SMOKE_TESTS.md` | v3-specific — superseded by v6 |
| `docs/superpowers/plans/` | `docs/archive/superseded-v5/` | Old v3 plans |
| `docs/superpowers/specs/` | `docs/archive/superseded-v5/` | Old v3 specs |

## Active contradictions still to resolve

None currently known. `V6_BUILD_AUTHORITY.md` has explicitly resolved all contradictions identified across the full corpus. If new contradictions surface during the build:

1. Open `V6_BUILD_AUTHORITY.md`
2. Find the relevant section
3. Update it with the resolution
4. Commit — do not leave the contradiction in a note or comment

## CLAUDE.md update required

`CLAUDE.md` (project root) still references old doc paths under `docs/`. The following paths need updating after this reorganisation:

| Old path | New path |
|---|---|
| `docs/PRODUCT_HIERARCHY_AND_TRUST.md` | `docs/reference/research/PRODUCT_HIERARCHY_AND_TRUST.md` |
| `docs/PLATFORM_STRATEGY.md` | `docs/reference/research/PLATFORM_STRATEGY.md` |
| `docs/VISUAL_SYSTEM.md` | `docs/v6/core/VISUAL_SYSTEM.md` |
| `docs/DISCOVERY_AND_GROWTH.md` | `docs/reference/research/DISCOVERY_AND_GROWTH.md` |
| `docs/ECOSYSTEM_AND_PARTNERSHIPS.md` | `docs/reference/research/ECOSYSTEM_AND_PARTNERSHIPS.md` |
| `docs/PRODUCT_SPEC.md` | `docs/archive/superseded-v5/PRODUCT_SPEC.md` |
| `docs/QA_SMOKE_TESTS.md` | `docs/archive/superseded-v5/QA_SMOKE_TESTS.md` |
