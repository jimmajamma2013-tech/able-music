# ABLE — Filing System Specification
**Date: 2026-03-16 | Authority: Process standard | Version: 1.0**

> This is the canonical specification for how all documentation in the ABLE project is organised, named, and maintained. Every agent and developer must follow this spec when creating, moving, or updating docs.

---

## Purpose

The filing system exists to serve two goals:

1. **Agent orientation in under 60 seconds** — any Claude Code session should be able to orient completely from `CONTEXT.md` + `FILE-STRUCTURE.md` without reading more than 3 files.
2. **Zero ambiguity about authority** — it must always be clear which document is the build-authoritative source for any given page or system.

---

## Canonical Folder Hierarchy

```
docs/
├── [root-level files]        — Orientation, strategy, session tools (max ~20 files)
├── apis/                     — External API specifications
├── pages/                    — Per-page design and build specs
├── systems/                  — Cross-page system specs
│   └── filing-system/        — This system's own spec
├── personas/                 — User archetypes
├── process/                  — Session workflow, templates
│   └── templates/            — Reusable doc templates
├── reference/                — Research only — never build authority
│   ├── research/             — Reference research documents
│   ├── micro-interactions/   — Micro-interaction research (9 categories)
│   └── design-system/        — Design research and brainstorms
├── research/                 — Recent focused research sessions
├── superpowers/              — Deep-dive AI planning sessions (historical)
│   ├── plans/                — Planning session outputs
│   └── specs/                — Spec outputs from planning sessions
├── archive/                  — Superseded docs only
│   └── superseded-v5/        — V5-era legacy docs
└── v6/                       — V6-era docs (partially still valid)
    ├── core/                 — Still-valid product truth
    ├── surfaces/             — Superseded page specs
    ├── engines/              — Phase 2 engine designs
    ├── operational/          — Operational specs
    ├── data/                 — Data model (still valid)
    ├── addenda/              — V6 addenda (mostly superseded)
    └── build/                — V5/V6 build prompts (archive)
```

### Authority tier of each folder

| Folder | Authority tier | Build from? |
|---|---|---|
| `pages/` | Primary build authority | Yes — always |
| `systems/` | Primary build authority | Yes — always |
| `[root-level files]` | Primary product authority | Yes — for strategy/product truth |
| `v6/core/` | Still-valid product truth | Yes — for design philosophy |
| `v6/operational/` | Phase 2 reference | Reference only |
| `v6/engines/` | Phase 2 reference | Reference only |
| `apis/` | Primary API build authority | Yes — when integrating |
| `process/` | Session process | Yes — for workflow |
| `personas/` | Supporting context | Reference |
| `reference/` | Research only | Never build from |
| `research/` | Research reference | Reference, informs spec |
| `superpowers/` | Historical context | Never build from |
| `archive/` | Vocabulary reference only | Never build from |
| `v6/surfaces/` | Superseded | Never build from |

---

## Naming Conventions

### Folder names

- All folder names use **kebab-case**: `filing-system/`, `ai-workflow/`, `tier-gates/`
- No underscores in folder names
- No spaces in folder names
- Short and descriptive (2–3 words max)

### File names

**Key navigation files use SCREAMING-SNAKE-CASE:**

```
CONTEXT.md
FILE-STRUCTURE.md
INDEX.md
STATUS.md
ABLE_STRATEGY.md
V8_BUILD_AUTHORITY.md
VOICE-BIBLE.md
BUILD-READY-INDEX.md
PRE-BUILD-CHECKLIST.md
```

**System files (within `systems/` subdirectories) use SCREAMING-SNAKE-CASE:**

The standard 4-file pattern per system:

| File | Purpose |
|---|---|
| `ANALYSIS.md` | Current state audit — what's built, what's broken, scored |
| `SPEC.md` | Build-ready spec — exact implementation |
| `PATH-TO-10.md` | Prioritised gap analysis and improvement actions |
| `FINAL-REVIEW.md` | Overall score, key decisions, sign-off |

`SPEC.md` is always the primary file. It is the file an agent reads to know what to build. If a system has a non-standard primary file name (e.g., `NOTIFICATIONS.md`), it is considered a legacy exception — new systems must use `SPEC.md`.

**Page files (within `pages/` subdirectories) use SCREAMING-SNAKE-CASE:**

The standard file set per page:

| File | Purpose |
|---|---|
| `DESIGN-SPEC.md` | Master build document — exact HTML, CSS, JS, copy, all sections |
| `SPEC.md` | Interim spec — used as primary if DESIGN-SPEC.md not yet created |
| `ANALYSIS.md` | Current state audit (where applicable) |
| `PATH-TO-10.md` | Prioritised improvements |
| `COPY.md` | All visible copy strings for the page |
| `USER-JOURNEYS.md` | User flows specific to this page |
| `20-ANGLE-ANALYSIS.md` | 20-angle quality audit |
| `FINAL-20-ANGLE-REVIEW.md` | First review pass |
| `FINAL-20-ANGLE-REVIEW-2.md` | Second/final review pass (highest authority) |
| `STRATEGY-REVIEW-FINAL.md` | Strategic alignment check |

`DESIGN-SPEC.md` is always the primary file for pages where it exists. `SPEC.md` is used as the primary where `DESIGN-SPEC.md` has not yet been created.

**Research and dated files use ISO-date kebab-case:**

```
2026-03-15-fan-closeness-mechanics.md
2026-03-14-james-master-strategy.md
```

All files in `research/`, `superpowers/plans/`, and `superpowers/specs/` use this format.

**API files use lowercase kebab-case:**

```
spotify.md
stripe.md
oembed.md
```

---

## Root-Level Files vs Subfolder Files

### Root-level files (`docs/[file].md`)

Root-level files are for:

1. **Orientation docs** that every session reads: `CONTEXT.md`, `STATUS.md`, `FILE-STRUCTURE.md`, `INDEX.md`
2. **Product-wide strategy and authority**: `ABLE_STRATEGY.md`, `V8_BUILD_AUTHORITY.md`, `VISION_MASTER_SPEC.md`, `VOICE-BIBLE.md`
3. **Session tools**: `BUILD-READY-INDEX.md`, `PRE-BUILD-CHECKLIST.md`, `LLM_CONTEXT_BUNDLE.md`
4. **Cross-cutting trackers**: `DECISION-LOG.md`, `MASTER-CHECKLIST.md`
5. **Business context docs**: `COMPETITIVE_INTELLIGENCE.md`, `GROWTH_STRATEGY.md`, `EXECUTION_RISK.md`, `MARKET_SIZING.md`, `MARKET_VALIDATION.md`

Root-level files must be genuinely cross-cutting. If a document is specific to a page or system, it belongs in `pages/` or `systems/` — not at root.

**Target maximum**: ~20 root-level files. If this grows beyond 25, create a `docs/strategy/` subdirectory and move business-context docs (GROWTH_STRATEGY.md, EXECUTION_RISK.md, MARKET_SIZING.md, MARKET_VALIDATION.md) there.

### Subfolder files

Everything else belongs in a subfolder. The rule is: if an agent can find a file from `CONTEXT.md` + `FILE-STRUCTURE.md`, the file is in the right place. If an agent would have to guess, it's misplaced.

---

## Archive Rules

### What goes in `archive/`

- Documents that have been **fully superseded** by a current document that covers the same ground
- Documents where the content is **no longer valid** (deprecated features, abandoned approaches)
- Documents that are kept only for **vocabulary reference** (knowing what terms were used in v5)

### What stays in `v6/`

- `v6/core/` — still-valid product philosophy. Keep here until content is formally incorporated into a `docs/` equivalent.
- `v6/surfaces/` — superseded page specs. Label them clearly as superseded; do not delete until all pages have `DESIGN-SPEC.md`.
- `v6/operational/` and `v6/engines/` — Phase 2 reference. Keep until Phase 2 build starts, then migrate to `systems/` or `pages/`.

### What never goes in archive

- Any document that is still a valid reference, even if superseded for build purposes
- Documents being actively updated
- Documents containing data that isn't duplicated elsewhere

### Archive file naming

Archive files keep their original names — do not rename on archiving. Add a frontmatter note:

```
> **Status: Superseded** — Superseded by `[replacement file path]`. Kept for vocabulary reference.
```

---

## INDEX.md and FILE-STRUCTURE.md — Sync Rules

These two navigation files serve different purposes and must both be maintained:

| File | Purpose | Format | When updated |
|---|---|---|---|
| `FILE-STRUCTURE.md` | Folder-by-folder map with context, authority level, reading order | Tables by directory | When any file is added, moved, or removed |
| `INDEX.md` | Alphabetical index of every doc — find any file fast | Alphabetical by title with one-line descriptions | When any file is added, moved, renamed, or removed |

### Rules for keeping them in sync

1. **Every new file must be added to both** — no exceptions.
2. **Every renamed file must be updated in both** — search for the old name and replace.
3. **Every moved file must be updated in both** — old path out, new path in.
4. **Every deleted or archived file must be removed from both** (or noted as archived in the Archive section of INDEX.md).

These files drift when updates happen to one but not the other. The filing system is only as good as these two files.

---

## Index Update Protocol

### When to update

Update `INDEX.md` and `FILE-STRUCTURE.md`:
- Immediately when creating a new document
- Immediately when renaming a document
- Immediately when moving a document to a different folder
- Immediately when archiving or deleting a document
- At the end of every session in which any doc changes were made

### Format for INDEX.md entries

Each entry follows this exact format:

```
- [Display Title](relative/path/from/docs/to/file.md) — One-line description of what the file contains
```

- Display title: Human-readable, not the filename (e.g., "Artist Profile — Spec", not "SPEC.md")
- Path: Relative from `docs/` root, no leading slash
- Description: One line, specific — what does an agent learn from this file? Never "See also" or "Refer to". State what is in it.

### Format for FILE-STRUCTURE.md entries

Each section has a table with at minimum: `File`, `Purpose/What's in it`, `Status`. Systems tables also include `Primary file`.

### Who updates

Any agent or developer adding, moving, or renaming files is responsible for updating both nav files in the same commit. Do not defer this. A file that exists but is not in `FILE-STRUCTURE.md` and `INDEX.md` is effectively invisible to future agents.

---

## How New Docs Get Added

### For a new system

1. Create a subdirectory under `docs/systems/` in kebab-case: `docs/systems/new-system/`
2. Create `SPEC.md` first — the primary build spec
3. Create `ANALYSIS.md`, `PATH-TO-10.md`, `FINAL-REVIEW.md` as needed
4. Add the system to `FILE-STRUCTURE.md` under the Systems Subdirectories table
5. Add each file to `INDEX.md` under the correct alphabetical section
6. If the system is relevant to `CONTEXT.md`, add a reference there

### For a new page

1. Create a subdirectory under `docs/pages/`: `docs/pages/new-page/`
2. Start with `SPEC.md` or `DESIGN-SPEC.md`
3. Add `COPY.md`, `USER-JOURNEYS.md` early — copy and flows needed before building
4. Add `PATH-TO-10.md`, `FINAL-REVIEW.md` after the first build pass
5. Add the page to `FILE-STRUCTURE.md` in the Pages Directory table
6. Add each file to `INDEX.md`

### For a new research file

1. Place in `docs/research/` with ISO-date prefix: `2026-MM-DD-topic-description.md`
2. Add to `FILE-STRUCTURE.md` under the `research/` section
3. Add to `INDEX.md`
4. When the research informs a decision, update the relevant `SPEC.md` — research files do not replace specs

### For a new root-level file

1. Ask: could this go in `systems/` or `pages/` instead? If yes, it should go there.
2. If genuinely cross-cutting, add to root. Update both nav files.
3. If the root file count exceeds 20, consider creating `docs/strategy/` for business-context docs.

---

## Naming Rules Summary

| Type | Convention | Example |
|---|---|---|
| Folder names | kebab-case | `filing-system/`, `ai-workflow/` |
| Key orientation files | SCREAMING-SNAKE-CASE | `FILE-STRUCTURE.md`, `INDEX.md` |
| System primary files | SCREAMING-SNAKE-CASE | `SPEC.md`, `ANALYSIS.md` |
| Page primary files | SCREAMING-SNAKE-CASE | `DESIGN-SPEC.md`, `COPY.md` |
| Dated research/planning | ISO-date kebab | `2026-03-15-topic.md` |
| API files | lowercase kebab | `spotify.md`, `stripe.md` |
| Legacy exceptions | Keep as-is | `NOTIFICATIONS.md` (do not rename) |

### Renaming legacy files

Non-standard primary file names (e.g., `NOTIFICATIONS.md`, `ORGANIC-GROWTH.md`, `PARTNERSHIPS.md`, `AI-AGENTS.md`, `AI-WORKFLOW.md`, `SOCIAL-MEDIA-PLAN.md`, `TEAM.md`) are legacy exceptions. They should not be renamed until:

1. A decision is made to rename them
2. All references to the old name are updated (CONTEXT.md, FILE-STRUCTURE.md, INDEX.md, any SPEC that links to them)
3. Both navigation files are updated atomically in the same commit

Do not rename these files incrementally or the filing system will have broken paths.

---

## Filing System Self-Reference

The filing system documents itself under `docs/systems/filing-system/`:

| File | Purpose |
|---|---|
| `FILING-SYSTEM-ANALYSIS.md` | Audit of the filing system state (before/after scores, actions taken) |
| `SPEC.md` | This file — the canonical filing system specification |
| `PATH-TO-10.md` | Gap analysis and highest-priority fixes |
| `FINAL-REVIEW.md` | Scored review of the filing system as it stands |

These four files follow the same 4-file system pattern used by all other `systems/` directories.

---

## Enforcement

There is no automated enforcement. The filing system relies on discipline.

The practical check: after any session that creates or moves docs, ask: "If a new agent started tomorrow with only `CONTEXT.md` and `FILE-STRUCTURE.md`, could they find every file I created today within 30 seconds?" If no, update the nav files before closing the session.
