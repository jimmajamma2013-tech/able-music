# ABLE Filing System — Path to 10
**Date: 2026-03-16 | Authority: Gap analysis | Version: 1.0**

> Current score: **9.2/10**. This document identifies what's preventing a 10, with specific action items and file paths. Ordered by priority.

---

## Current Score vs Target

| Dimension | Current | Target | Gap |
|---|---|---|---|
| Navigability | 10/10 | 10/10 | None |
| Naming consistency | 8/10 | 10/10 | 6 non-standard primary files |
| Hierarchy clarity | 9/10 | 10/10 | 5 empty stubs; v6 surface naming |
| Completeness | 10/10 | 10/10 | None |
| Index quality | 10/10 | 10/10 | None |
| Redundancy | 8/10 | 9/10 | 2 overlapping root + system docs |
| Archive cleanliness | 9/10 | 10/10 | v6/surfaces needs cleaner labelling |
| Authority chain | 9/10 | 10/10 | 1 CONTEXT.md discrepancy (profile DESIGN-SPEC.md) |
| Agent readability | 10/10 | 10/10 | None |
| Future-proofing | 9/10 | 10/10 | No index-drift prevention mechanism |

**Overall: 9.2/10 → target 10/10**

---

## Priority 1 — Critical (blocks authority chain)

### 1.1 Create `pages/profile/DESIGN-SPEC.md`

**Problem:** `CONTEXT.md` references `docs/pages/profile/DESIGN-SPEC.md` as the authority for the most-important page in the product. The file does not exist. Every session that reads CONTEXT.md is pointed at a non-existent file.

**Current workaround:** `pages/profile/SPEC.md` is used instead. This works but breaks the authority chain stated in CONTEXT.md and FILE-STRUCTURE.md.

**Action:**
- Create `docs/pages/profile/DESIGN-SPEC.md` as the master build spec for `able-v7.html`
- Either: write it as a superset of `SPEC.md` (preferred), or: rename `SPEC.md` to `DESIGN-SPEC.md` and update all references
- Update CONTEXT.md line: "Use `SPEC.md` for profile until DESIGN-SPEC.md is created" → remove that note
- Update `docs/FILE-STRUCTURE.md` Pages Directory table: `pages/profile/` row, Build Spec column
- Update `docs/INDEX.md`: rename the "Artist Profile — Spec" entry to "Artist Profile — Design Spec"

**Files to touch:**
- `docs/pages/profile/DESIGN-SPEC.md` (create)
- `/Users/jamescuthbert/Desktop/ABLE  MERGED/CONTEXT.md` (update reference)
- `docs/FILE-STRUCTURE.md` (update table row)
- `docs/INDEX.md` (update entry)

---

## Priority 2 — High (naming consistency)

### 2.1 Standardise non-standard primary file names

**Problem:** 6 systems use a non-SPEC.md primary file name. When an agent looks for `SPEC.md` in a system directory, it doesn't find it — it has to read FILE-STRUCTURE.md to discover the non-standard name. This adds cognitive overhead and breaks the pattern expectation.

**Non-standard files:**

| System | Current primary | Should be |
|---|---|---|
| `systems/notifications/` | `NOTIFICATIONS.md` | `SPEC.md` |
| `systems/organic-growth/` | `ORGANIC-GROWTH.md` | `SPEC.md` |
| `systems/partnerships/` | `PARTNERSHIPS.md` | `SPEC.md` |
| `systems/ai-agents/` | `AI-AGENTS.md` | `SPEC.md` |
| `systems/ai-workflow/` | `AI-WORKFLOW.md` | `SPEC.md` |
| `systems/social-media/` | `SOCIAL-MEDIA-PLAN.md` | `SPEC.md` |

**Recommended approach:** Rename to `SPEC.md`. Do not create redirect stubs — just update references atomically.

**For each rename:**
1. Rename the file
2. Update `docs/FILE-STRUCTURE.md` — the Primary file column for that row
3. Update `docs/INDEX.md` — rename the entry
4. Search for any other references to the old filename across the docs

**Note on `systems/team/TEAM.md` and `systems/hardware-software/SETUP.md`:** These are lower priority as their names are descriptive and there is only one file in each directory. Address after the 6 above.

**Note on `systems/transcendence/`:** Has 3 non-standard files (`WHAT-11-LOOKS-LIKE.md`, `11-AUDIT.md`, `NEVER-SHIP.md`). These are descriptive and intentional — leave as-is, they don't break the primary-file expectation since the system has multiple peer files.

---

## Priority 3 — Medium (structural cleanliness)

### 3.1 Resolve the 5 empty stub directories

**Problem:** 5 system directories exist with no content. They appear in FILE-STRUCTURE.md as "Stub (empty)". An agent navigating systems/ will find directories that contain nothing, which is noise.

**Empty stubs:**
- `docs/systems/founder-roadmap/`
- `docs/systems/think-out-of-the-box/`
- `docs/systems/master-review/`
- `docs/systems/investor-strategy/`
- `docs/systems/growth-strategy/`

**Decision required for each:** Populate or delete.

**Populate if:** There's a real spec to write, and the system is genuinely separate from existing docs.
**Delete if:** The territory is already covered by another system, or the plan to build this out is indefinitely deferred.

**Recommended decisions:**
- `growth-strategy/` — overlaps with root `GROWTH_STRATEGY.md`. Delete stub; root file is sufficient.
- `investor-strategy/` — real need, no current content. Keep stub but mark status as "Deferred" in FILE-STRUCTURE.md.
- `founder-roadmap/` — overlaps with James's superpowers docs. Delete stub; the content lives in `superpowers/plans/`.
- `think-out-of-the-box/` — no clear scope. Delete stub.
- `master-review/` — unclear scope, no urgency. Delete stub.

**Action:**
- For each deleted stub: remove directory, remove row from `FILE-STRUCTURE.md` Systems table, remove from `INDEX.md` if present

### 3.2 Move business-context docs to `docs/strategy/`

**Problem:** 5 root-level files are business/investor context rather than orientation docs. They dilute the root level, which should be exclusively session-start and product-authority files.

**Files to move:**
- `docs/GROWTH_STRATEGY.md` → `docs/strategy/GROWTH_STRATEGY.md`
- `docs/EXECUTION_RISK.md` → `docs/strategy/EXECUTION_RISK.md`
- `docs/MARKET_SIZING.md` → `docs/strategy/MARKET_SIZING.md`
- `docs/MARKET_VALIDATION.md` → `docs/strategy/MARKET_VALIDATION.md`
- `docs/COMPETITIVE_INTELLIGENCE.md` → `docs/strategy/COMPETITIVE_INTELLIGENCE.md`

**Action:** Create `docs/strategy/`, move files, update both nav files, check for any CONTEXT.md references.

**Note:** This is a structural improvement, not urgent. Only do this when the root file count exceeds 20 and it becomes genuinely noisy to navigate.

---

## Priority 4 — Low (future-proofing)

### 4.1 Add YAML frontmatter to all docs

**Problem:** `INDEX.md` now covers 347 files but is maintained manually. As the project grows past 400 files, manual maintenance will cause drift. The correct long-term solution is YAML frontmatter on every doc that enables auto-generation.

**Proposed frontmatter format:**
```yaml
---
title: "Artist Profile — Spec"
description: "Primary build spec for able-v7.html"
folder: pages/profile
authority: primary
status: active
updated: 2026-03-16
---
```

**Action:** Adopt this format for all new docs immediately. Retrofit existing docs incrementally. Script to generate INDEX.md from frontmatter can be written when coverage reaches 80%+.

### 4.2 Add `docs/systems/filing-system/` to nav files

**Current state:** The 3 files in `docs/systems/filing-system/` (FILING-SYSTEM-ANALYSIS.md, SPEC.md, PATH-TO-10.md, FINAL-REVIEW.md) are not yet in `FILE-STRUCTURE.md` or `INDEX.md`. They need to be added.

**Action:**
- Add `filing-system/` row to `FILE-STRUCTURE.md` Systems Subdirectories table
- Add all 4 files to `INDEX.md` under F

### 4.3 Document the `v6/` cleanup timeline

**Problem:** `v6/surfaces/` is superseded but not deleted. `v6/operational/` and `v6/engines/` are Phase 2 reference. There is no documented plan for when these will be archived.

**Action:** Add a note in FILE-STRUCTURE.md under the `v6/` section:
- `v6/surfaces/` — archive when all 6 pages have `DESIGN-SPEC.md` (currently 4/6)
- `v6/core/` — merge into system/page docs when V8 specs are complete, then archive
- `v6/operational/` and `v6/engines/` — keep until Phase 2 build starts

---

## Score Projection

| Action | Score delta |
|---|---|
| Create `pages/profile/DESIGN-SPEC.md` (1.1) | +0.3 (authority chain) |
| Standardise 6 primary file names (2.1) | +0.5 (naming consistency) |
| Resolve 5 empty stubs (3.1) | +0.2 (hierarchy clarity) |
| Move 5 docs to `docs/strategy/` (3.2) | +0.1 (hierarchy clarity) |
| Add filing-system/ to nav files (4.2) | +0.1 (completeness) |
| YAML frontmatter (4.1) | +0.1 (future-proofing) |
| v6/ cleanup timeline (4.3) | +0.05 (archive cleanliness) |

**Projected score after Priority 1–2 actions: 9.7–9.8/10**
**Projected score after all actions: 10/10**

---

## Quick Reference — Specific File Paths

All paths are relative to the project root `/Users/jamescuthbert/Desktop/ABLE  MERGED/`:

```
# Priority 1
docs/pages/profile/DESIGN-SPEC.md                           CREATE
CONTEXT.md                                                   UPDATE (remove DESIGN-SPEC.md note)
docs/FILE-STRUCTURE.md                                       UPDATE (pages/profile/ row)
docs/INDEX.md                                                UPDATE (Artist Profile entry)

# Priority 2
docs/systems/notifications/NOTIFICATIONS.md                  RENAME → SPEC.md
docs/systems/organic-growth/ORGANIC-GROWTH.md                RENAME → SPEC.md
docs/systems/partnerships/PARTNERSHIPS.md                    RENAME → SPEC.md
docs/systems/ai-agents/AI-AGENTS.md                          RENAME → SPEC.md
docs/systems/ai-workflow/AI-WORKFLOW.md                      RENAME → SPEC.md
docs/systems/social-media/SOCIAL-MEDIA-PLAN.md               RENAME → SPEC.md
docs/FILE-STRUCTURE.md                                       UPDATE (6 rows)
docs/INDEX.md                                                UPDATE (6 entries)

# Priority 3.1
docs/systems/growth-strategy/                                DELETE stub
docs/systems/founder-roadmap/                                DELETE stub
docs/systems/think-out-of-the-box/                           DELETE stub
docs/systems/master-review/                                  DELETE stub
docs/FILE-STRUCTURE.md                                       UPDATE (remove 4 rows)

# Priority 4.2
docs/FILE-STRUCTURE.md                                       UPDATE (add filing-system/ row)
docs/INDEX.md                                                UPDATE (add 4 filing-system/ entries under F)
```
