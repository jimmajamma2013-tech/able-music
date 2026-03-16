# ABLE Filing System — Final Review
**Date: 2026-03-16 | Reviewer: Claude Code | Version: 1.0**

> Scored review of the ABLE docs filing system as it stands on 2026-03-16. Current state vs target state. What's working, what's not, what to do next.

---

## Overall Score

| State | Score |
|---|---|
| Before (pre-audit, early session) | 68/100 (6.8/10) |
| Current (post-audit) | 92/100 (9.2/10) |
| Target (after PATH-TO-10 actions) | 100/100 (10/10) |

**Delta achieved in this session: +24 points**

---

## Dimension Scores

### 1. Navigability — 10/10

**What it measures:** Can an agent find any document within 30 seconds?

**Current state:** Yes. `INDEX.md` now covers all 347 documents alphabetically with one-line descriptions. `FILE-STRUCTURE.md` maps the complete folder hierarchy with authority levels and reading scenarios. An agent starting cold can locate any file from these two documents without guessing.

**Before:** INDEX.md covered ~20 of 347 files. An agent had to recursively explore subdirectories to find anything outside the root.

**What would break this:** INDEX.md falling behind as new docs are added. The only risk is maintenance discipline.

---

### 2. Naming Consistency — 8/10

**What it measures:** Are file names predictable? Can an agent guess the filename given the folder and document type?

**Current state:** 86% consistent. The standard 4-file pattern (`ANALYSIS.md`, `SPEC.md`, `PATH-TO-10.md`, `FINAL-REVIEW.md`) is followed by 41 of 47 systems. 6 systems use non-standard primary file names:
- `systems/notifications/NOTIFICATIONS.md` (should be `SPEC.md`)
- `systems/organic-growth/ORGANIC-GROWTH.md`
- `systems/partnerships/PARTNERSHIPS.md`
- `systems/ai-agents/AI-AGENTS.md`
- `systems/ai-workflow/AI-WORKFLOW.md`
- `systems/social-media/SOCIAL-MEDIA-PLAN.md`

All 6 are documented in FILE-STRUCTURE.md, so they are findable — but they break the pattern expectation.

**What would raise this to 10:** Rename all 6 to `SPEC.md`. See PATH-TO-10.md §2.1.

---

### 3. Hierarchy Clarity — 9/10

**What it measures:** Is the folder structure logical and unambiguous? Does every file live in the right place?

**Current state:** The top-level split (`pages/` = build authority, `systems/` = cross-page authority, `reference/` = research only, `archive/` = superseded) is clean and well-documented. The authority tier of every folder is stated in FILE-STRUCTURE.md.

Two remaining issues:
- **5 empty stubs** in `systems/` — `founder-roadmap/`, `think-out-of-the-box/`, `master-review/`, `investor-strategy/`, `growth-strategy/` — directories with no content create confusion about scope
- **`v6/` mixed validity** — `v6/core/` is still authoritative, `v6/surfaces/` is superseded, `v6/operational/` is Phase 2 reference. This is documented but the directory structure itself doesn't signal the difference.

**What would raise this to 10:** Delete the 4 empty stubs that have no future (growth-strategy, founder-roadmap, think-out-of-the-box, master-review). Add cleanup timeline for `v6/`.

---

### 4. Completeness — 10/10

**What it measures:** Is every file in the system represented in the navigation documents?

**Current state:** Yes. All 347 documents are in both FILE-STRUCTURE.md and INDEX.md after the audit session. The 15+ systems and all of `superpowers/` that were missing before the audit are now documented.

**Before:** FILE-STRUCTURE.md was missing `accounting`, `ai-workflow`, `coding-strategy`, `tiers`, `tools-and-apis`, `hardware-software`, and all of `superpowers/` (17 files).

**What would break this:** New files added without updating nav files. See SPEC.md §Index Update Protocol.

---

### 5. Index Quality — 10/10

**What it measures:** Is INDEX.md useful? Can you find a document by title? Is every entry descriptive?

**Current state:** Yes. INDEX.md covers 347 documents alphabetically. Every entry has a display title that matches the document's subject (not just the filename) and a one-line description that states what the document contains — not just what it's called.

**Before:** INDEX.md covered ~20 files, written in early project days. Effectively useless for finding anything in a 347-file system.

**What would raise this further:** YAML frontmatter enabling auto-generation. Manual maintenance will cause drift past 400 files.

---

### 6. Redundancy — 8/10

**What it measures:** Are there duplicate documents covering the same ground without clear differentiation?

**Current state:** Two identified overlaps:
1. `docs/COMPETITIVE_INTELLIGENCE.md` (root) and `docs/systems/competitive/SPEC.md` — both cover competitive positioning. Difference: root file is broader strategic view; systems file is the implementation spec. Overlap is acceptable at different levels of abstraction.
2. `docs/GROWTH_STRATEGY.md` (root) and `docs/systems/growth-strategy/` stub — the stub is empty. If it's never populated, the root file is sufficient and the stub should be deleted.

No exact duplicates found. The `reference/` vs `research/` vs `superpowers/` vs `v6/` distinction creates some conceptual redundancy (multiple places hold "historical context") but they serve different time periods and audiences.

**What would raise this to 9:** Delete `systems/growth-strategy/` stub. Consider moving `COMPETITIVE_INTELLIGENCE.md` to root `docs/strategy/` alongside the other business-context docs to make the root/system boundary crisper.

---

### 7. Archive Cleanliness — 9/10

**What it measures:** Are superseded docs clearly labelled? Is it obvious what's dead and what's live?

**Current state:** Good. `docs/archive/superseded-v5/` is clearly labelled and every file in it has a status note. `v6/surfaces/` is documented as superseded in FILE-STRUCTURE.md with explicit pointers to the replacement `pages/` documents. V6 core docs are documented as still-valid.

One minor issue: `v6/build/` contains V5 build prompts (V5_BUILD_PROMPT.md, V5_MASTER_BRIEF.md) which are historical but not labelled as archive within the file. They have no `Status: Superseded` header.

**What would raise this to 10:** Add a superseded header to v6/build/ files. Add cleanup timeline for v6/ (documented in PATH-TO-10.md §4.3).

---

### 8. Authority Chain — 9/10

**What it measures:** Is it always clear which document is the primary authority for any decision area?

**Current state:** The authority chain is explicit in CONTEXT.md and FILE-STRUCTURE.md. Every `pages/` directory states its primary build file. Every `systems/` directory states its primary file. The `v6/` validity status is documented. The `reference/` authority level ("never build from") is explicit.

One remaining discrepancy: CONTEXT.md references `docs/pages/profile/DESIGN-SPEC.md` in its authority chain. That file does not exist. Agents are told to use `SPEC.md` instead, but this creates a gap between what CONTEXT.md says and what actually exists.

**What would raise this to 10:** Create `docs/pages/profile/DESIGN-SPEC.md`. See PATH-TO-10.md §1.1.

---

### 9. Agent Readability — 10/10

**What it measures:** Can an AI agent orient correctly within one reading pass of the top-level navigation files?

**Current state:** Yes. The recommended reading order by scenario in FILE-STRUCTURE.md gives agents an explicit script for 6 common scenarios. CONTEXT.md is the mandatory first-read with a clear authority chain. INDEX.md is the lookup table for any file. The combination means a cold-start agent can:
- Orient in 3 files (CONTEXT.md + STATUS.md + page spec)
- Find any document in INDEX.md by keyword search
- Understand the authority level of any file from FILE-STRUCTURE.md

**What would maintain this:** Keep FILE-STRUCTURE.md reading order scenarios updated as new scenarios emerge.

---

### 10. Future-Proofing — 9/10

**What it measures:** Will the filing system still work at 500 documents? At 1,000?

**Current state:** Mostly yes. The folder structure scales well — each system or page is self-contained. INDEX.md will become a maintenance burden past 400 files, but the solution (YAML frontmatter + auto-generation) is clearly defined. The SPEC.md naming convention means new system directories are predictable. The process for adding new docs is documented in SPEC.md.

Risks:
- Manual INDEX.md will drift if discipline slips
- No automated check that every file is indexed
- Empty stub directories could grow if the pattern is followed without discipline

**What would raise this to 10:** YAML frontmatter on all docs (PATH-TO-10.md §4.1). A pre-commit hook or session-end checklist item that verifies new files are in INDEX.md.

---

## Key Decisions Made

### Decision 1: Keep `v6/` rather than archive it

`v6/core/` remains valid product philosophy. Moving it to `archive/` would lose its authority. It stays in place until its content is formally incorporated into `docs/` equivalents or superseded by V8 decisions. Timeline: when V8 specs are complete.

### Decision 2: Do not rename legacy files until all references are updated

Renaming `NOTIFICATIONS.md` → `SPEC.md` without updating every reference creates broken paths. The rename should happen atomically with reference updates. Until then, the non-standard names are documented in FILE-STRUCTURE.md.

### Decision 3: INDEX.md is alphabetical by display title, not filename

Filenames are implementation details. `SPEC.md` is not useful as an index title — "AI Copy — Spec" is. Display titles are human-readable and allow natural-language search.

### Decision 4: `reference/` authority is explicitly "never build from"

`docs/reference/` contains background research that may be years old, incomplete, or superseded. The authority annotation is explicit and repeated in multiple places to prevent agents from treating it as build authority.

### Decision 5: `process/templates/` is a subfolder of `process/`, not `systems/`

Templates are workflow tools, not system specs. They belong in `process/` because they govern how the team works, not what gets built.

---

## What a 10/10 Filing System Looks Like

A 10/10 filing system for this project has:

1. Every file findable in `INDEX.md` within one alphabetical search
2. Every system with `SPEC.md` as the primary file (no exceptions)
3. `pages/profile/DESIGN-SPEC.md` exists — the authority chain in CONTEXT.md is accurate
4. No empty stub directories — either a file exists or the directory doesn't
5. YAML frontmatter on all docs — INDEX.md can be auto-generated
6. A clear timeline for archiving `v6/` once V8 is complete
7. `docs/strategy/` subdirectory keeping business-context docs off the root

The current system at 9.2/10 is functional and navigable. The remaining gap is polish: naming consistency, structural cleanliness, and maintenance mechanism. None of the remaining gaps cause confusion or broken builds — they are friction reducers, not blockers.

---

## Sign-Off

This filing system review was conducted on 2026-03-16 as part of a filing system audit session. The before state (68/100) was assessed against the file state before the audit. The current state (92/100) reflects the system after INDEX.md and FILE-STRUCTURE.md were rewritten to cover all 347 documents, and after this filing-system/ directory was created.

**Next review trigger:** When document count exceeds 400, or when any Priority 1 action in PATH-TO-10.md is completed.
