# ABLE V6 — Documentation Architecture Addendum
**Created:** 2026-03-13
**Authority level:** Addenda (rank 2 in authority chain — subordinate only to V6_BUILD_AUTHORITY.md)

---

## Purpose

This addendum defines how the v6 documentation system is structured, what governs each tier, and the rules for keeping it coherent as the build progresses. It is the authoritative record of the documentation architecture decisions made at the start of the v6 cycle.

Read this if you are:
- Starting a new session and need to understand where to look for things
- Adding a new document and are unsure where to put it
- Resolving a conflict between two documents
- Deciding whether something needs to be committed to the authority chain or can stay in reference

---

## The core problem this architecture solves

Over the v3–v5 cycle, the `docs/` folder accumulated 25+ files with no declared precedence. Later documents corrected earlier ones, but the corrections were fragmented across addenda that themselves accumulated contradictions. By the end of the v5 cycle, answering "what font does the Pop vibe use?" required cross-referencing four documents, two of which gave different answers.

V6 solves this with a strict authority chain. One document wins. Every contradiction gets resolved at the top of the chain. Reference docs inform but do not override.

---

## Directory structure

```
docs/
├── v6/                          ← Active build authority (read this first)
│   ├── 00_AUTHORITY_ORDER.md    ← First file to read in any session
│   ├── 01_V6_SCOPE_AND_STATUS.md
│   ├── 02_MIGRATION_FROM_V5.md
│   ├── core/                    ← Highest authority
│   │   ├── V6_BUILD_AUTHORITY.md
│   │   ├── VISUAL_SYSTEM.md
│   │   └── COPY_AND_DESIGN_PHILOSOPHY.md
│   ├── build/                   ← Build specs
│   │   ├── V5_BUILD_PROMPT.md   (v5.4 — complete phase structure)
│   │   └── V5_MASTER_BRIEF.md   (synthesised brief)
│   ├── addenda/                 ← Targeted corrections
│   │   ├── V5_RESEARCH_ADDENDUM.md  (26 correction sections)
│   │   └── V6_DOCUMENTATION_ARCHITECTURE.md  (this file)
│   └── operational/             ← System-specific detail
│       ├── BACKEND_SCHEMA.md
│       ├── SUPERFAN_SCORING_ALGORITHM.md
│       ├── FAN_DASHBOARD_SPEC.md
│       ├── FREELANCER_SPEC.md
│       ├── PROFESSIONAL_DISCOVERY.md
│       └── DISCOVERY_DIRECTORY_SPEC.md
│
├── reference/                   ← Informs; does not override
│   ├── research/
│   │   ├── USER_RESEARCH.md
│   │   ├── DESIGN_RESEARCH_2026.md
│   │   ├── MASTER_PLAN.md
│   │   ├── PLATFORM_STRATEGY.md
│   │   ├── PRODUCT_HIERARCHY_AND_TRUST.md
│   │   ├── INTEGRATIONS_AND_AI_RESEARCH.md
│   │   ├── DISCOVERY_AND_GROWTH.md
│   │   ├── ECOSYSTEM_AND_PARTNERSHIPS.md
│   │   └── 2026-03-13-top-minds-insights.md
│   ├── design-system/
│   │   └── 2026-03-10-v3-design-brainstorm.md
│   └── micro-interactions/      ← 100-interaction library (10 files)
│       └── [all micro-interaction files]
│
└── archive/                     ← Historical only — do not cite
    └── superseded-v5/
        ├── PRODUCT_SPEC.md
        ├── ROADMAP.md
        ├── QA_SMOKE_TESTS.md
        └── [old v3 plans and specs]
```

---

## Authority chain (precedence, highest to lowest)

| Rank | File | What it controls |
|---|---|---|
| 1 | `docs/v6/core/V6_BUILD_AUTHORITY.md` | Final decisions on every resolved contradiction. Hard law. |
| 2 | `docs/v6/addenda/V5_RESEARCH_ADDENDUM.md` | 26 sections of targeted corrections to the build spec |
| 3 | `docs/v6/build/V5_BUILD_PROMPT.md` | Phase structure, component checklist, build sequence |
| 4 | `docs/v6/build/V5_MASTER_BRIEF.md` | Synthesised brief — companion and summary to build prompt |
| 5 | `docs/v6/core/VISUAL_SYSTEM.md` | Fonts, accent values, vibe specs |
| 6 | `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` | Copy register, tone, banned phrases |

**When two ranked files conflict:** the higher rank always wins. No exceptions. The lower-ranked file is wrong (or outdated) — update the higher-ranked file with the correct decision if necessary.

---

## Tier definitions

### Core (`docs/v6/core/`)

The final word on design decisions, resolved contradictions, and implementation law.

**Rules:**
- Anything written here overrides everything else, no exceptions
- Before adding to core, check all other v6 docs to confirm no unresolved dependency
- Every correction lives here, not scattered in addenda
- Core docs should get shorter over time as decisions consolidate

### Build specs (`docs/v6/build/`)

The "how to build it" documentation — phases, component checklist, micro-interaction catalogue.

**Rules:**
- Treat V5_BUILD_PROMPT.md as the construction brief
- Where it conflicts with core, core wins
- V5_MASTER_BRIEF.md is a digest — useful for orienting quickly, not for fine detail

### Addenda (`docs/v6/addenda/`)

Targeted corrections and precision-adds to build specs. Addenda exist because the build prompt is long and editing it inline risks breaking its structure.

**Rules:**
- Addenda correct specific sections of build docs — they must name what they are correcting
- Where an addendum conflicts with core, core wins
- Where an addendum conflicts with build spec, the addendum wins (it is newer)
- Over time, addenda should be consolidated into cleaner core docs — do not let them compound indefinitely

### Operational (`docs/v6/operational/`)

Implementation-ready specs for specific subsystems: fan scoring, schema, freelancer profile, discovery directory.

**Rules:**
- Subordinate to all of the above
- Where operational conflicts with core, core wins
- Use for Phase 2+ features: freelancer, studio, fan feed, discovery directory
- Safe to reference during Phase 1 build but do not implement until the relevant phase

### Reference (`docs/reference/`)

The research foundation that produced the v6 decisions. Contains user research, competitive analysis, design inspiration, and the micro-interaction library.

**Rules:**
- Reference docs **inform** but do not override authority chain documents
- If a reference doc contains a useful insight not captured in the authority chain, promote it: write the decision into `V6_BUILD_AUTHORITY.md`, commit it, done
- Do not cite reference docs to justify a v6 implementation decision — cite the authority chain document where the decision is captured instead
- Reference docs do not need to be kept in sync with v6 decisions

### Archive (`docs/archive/`)

Historical files retained for vocabulary reference and historical context only.

**Rules:**
- Never cite archive files as current build authority
- Never resurrect archive content without promoting it through the authority chain first
- Files in archive are superseded — if they contain something useful, it should already be in the authority chain

---

## Decision routing

When you need to make a build decision:

```
1. Check V6_BUILD_AUTHORITY.md first
   → Is the decision there? Follow it.

2. Check V5_RESEARCH_ADDENDUM.md
   → Does an addendum section address it?

3. Check V5_BUILD_PROMPT.md
   → Is there a spec section covering it?

4. Check VISUAL_SYSTEM.md (for design) or COPY_AND_DESIGN_PHILOSOPHY.md (for copy)
   → Does the relevant core doc cover it?

5. Still unresolved?
   → Open V6_BUILD_AUTHORITY.md
   → Add a new entry in the relevant section
   → Resolve it — do not leave it open
   → Commit

Never: leave a decision unresolved in a note, comment, or conversation
Never: resolve a decision in a reference or archive doc
```

---

## Rules for adding new documents

**Before creating a new doc:**
1. Does this decision already exist somewhere in the authority chain? If yes — update that file, don't create a new one.
2. Is this a build decision, a research insight, or historical context? That determines the tier.
3. Does this correct something already written? Add it as a named addendum section, not a new file.

**Naming:**
- Core: `SCREAMING_SNAKE.md`
- Build: `V5_` or `V6_` prefix to signal which cycle it belongs to
- Addenda: descriptive name of what the addendum addresses
- Operational: `SUBSYSTEM_NAME.md`
- Reference: original filename — do not rename research docs
- Archive: original filename — do not rename, just prefix with context in a header

---

## Consolidation plan

The current authority chain is still longer than ideal. As v6 stabilises:

1. Once all addendum corrections have been proven in the build → merge addenda into core docs, delete addendum files
2. Once the build spec (V5_BUILD_PROMPT.md) is fully implemented → move to archive
3. As operational features get built → move specs into the relevant phase documentation
4. Target: by v6 stable release, `docs/v6/core/` should be self-contained without needing to consult addenda or build specs

---

## What this addendum does not cover

Implementation decisions belong in `V6_BUILD_AUTHORITY.md`. If you read something in this architecture doc that seems to conflict with a build decision, `V6_BUILD_AUTHORITY.md` wins.

This addendum covers only: how docs are structured, how to navigate them, and how to maintain them.
