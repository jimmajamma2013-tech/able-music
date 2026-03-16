# ABLE — Master Review Protocol
**System:** Master Review
**Created:** 2026-03-16
**Status:** ACTIVE — the meta-system for reviewing all other systems
**Authority:** This document governs when and how ABLE documentation is reviewed, scored, and driven toward 10/10 coherence

---

## PART 1 — What a Master Review Is

A Master Review is not a reading session. It is an active scoring and editing session with a single goal: **coherence**.

Coherence means: every document in the ABLE documentation system points in the same direction, scores are honest, gaps are explicitly known, and the entire ABLE strategy functions as one unified whole rather than a collection of individual files that happen to live in the same folder.

**The core question of every Master Review:**
> "If someone read every single document in this folder, would they have a perfect, coherent, actionable understanding of ABLE — or would they find contradictions, gaps, and confusion?"

A Master Review happens:
- After a significant wave of doc creation (like a strategy sprint)
- At the start of every build sprint (before first line of code)
- Every 30 days minimum during active development
- After any significant product decision (tier change, feature add/remove, pivot)

---

## PART 2 — The Master Review Sequence

A complete Master Review takes 3–4 hours. It runs in 7 phases. Do not skip phases. Do not reorder.

---

### Phase 1 — Index Check (30 minutes)

**Goal:** Confirm the file index matches reality.

**Steps:**

1. Run: `find docs/ -name "*.md" | sort` — get the complete file list
2. Open `docs/FILE-STRUCTURE.md` — is it current?
3. Cross-reference: every file that exists should be in the index. Every file in the index should exist.
4. For every file in `docs/systems/` — check it has at minimum: `SPEC.md` (or equivalent primary doc), `PATH-TO-10.md`, `FINAL-REVIEW.md`
5. For every page in `docs/pages/` — check it has all 9 stage documents: `SPEC.md`, `20-ANGLE-ANALYSIS.md`, `USER-JOURNEYS.md`, `COPY.md`, `PATH-TO-10.md`, `DESIGN-SPEC.md`, `STRATEGY-REVIEW-FINAL.md`, `FINAL-20-ANGLE-REVIEW.md`, `FINAL-20-ANGLE-REVIEW-2.md`
6. Update `docs/FILE-STRUCTURE.md` to match reality before proceeding

**Output:** Updated index, list of missing files

---

### Phase 2 — Coherence Audit (60 minutes)

**Goal:** Find contradictions between documents.

**Read in this sequence:**
1. `CONTEXT.md`
2. `docs/ABLE_STRATEGY.md`
3. `docs/V8_BUILD_AUTHORITY.md`
4. `docs/systems/tiers/SPEC.md`
5. `docs/systems/data-architecture/SPEC.md`
6. One spot-check per page: read `docs/pages/[page]/SPEC.md` for each of the 6 pages

**For each contradiction found, document:**
- Document A says: [X]
- Document B says: [Y]
- Which is authoritative? (resolve using `docs/v6/00_AUTHORITY_ORDER.md` and `docs/V8_BUILD_AUTHORITY.md` — V8 wins on every point it addresses)
- Action: update the non-authoritative document immediately

**Common contradiction categories to look for:**
- Domain name: `ablemusic.co` vs `ablemusic.co` — one must win, all docs must agree
- Fan cap numbers: free tier cap must be identical across all mentions (currently: 100 fans)
- Tier pricing: £0 / £9 / £19 / £49 — must be identical across all docs
- Page file names: `able-v7.html` is the artist profile — any reference to `able-v3.html`, `able-v6.html` as active is wrong
- Scores: CONTEXT.md scores vs FINAL-REVIEW.md scores — FINAL-REVIEW.md is the authoritative score
- Freelancer journey: `freelancer-start.html` + `freelancer.html` vs references to separate admin panel — V8_BUILD_AUTHORITY.md is the authority (one profile model, activated layers)

**Output:** Contradiction table, all resolved before Phase 3

---

### Phase 3 — Completeness Check (30 minutes)

**Goal:** Identify every document that should exist but doesn't.

**Checklist per page (6 pages):**

| Doc | Profile | Admin | Onboarding | Landing | Fan | Freelancer |
|---|---|---|---|---|---|---|
| SPEC.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| 20-ANGLE-ANALYSIS.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| USER-JOURNEYS.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| COPY.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| PATH-TO-10.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| DESIGN-SPEC.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| STRATEGY-REVIEW-FINAL.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| FINAL-20-ANGLE-REVIEW.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| FINAL-20-ANGLE-REVIEW-2.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |

**Checklist per system (check the 3 minimum docs for all 40+ systems):**

For each `docs/systems/[system]/` directory: verify `SPEC.md` (or equivalent named primary doc), `PATH-TO-10.md`, `FINAL-REVIEW.md` exist. Systems with non-standard naming (organic-growth, partnerships, notifications, social-media, ai-agents, ai-workflow, team, transcendence) need special attention — their primary doc may be named differently (e.g. `ORGANIC-GROWTH.md`, `AI-AGENTS.md`).

**Gap priority classification:**

- **P0** — Missing document blocks building. Without it, a developer would make wrong decisions.
- **P1** — Missing document reduces quality but doesn't block building.
- **P2** — Missing document is aspirational — adds depth but isn't currently needed.

**Output:** Completeness table with priority ratings for each gap

---

### Phase 4 — Score Audit (45 minutes)

**Goal:** Create a master scorecard of all current honest scores.

Pull the current score from each `FINAL-REVIEW.md` (not from CONTEXT.md — the review docs are more current). Where no FINAL-REVIEW.md exists, read the SPEC.md for a current-state score.

Fill the master scorecard:

| System / Page | Current Score | Source Doc | Target | Gap | Priority Action |
|---|---|---|---|---|---|

Then identify:
- Which systems claim 10/10 but have not been build-verified?
- Which systems have scores in CONTEXT.md that don't match their own FINAL-REVIEW.md?
- Which systems are below 7/10 and blocking the critical path?

**Critical path systems** (score below 7 here = P0 gap):
- `docs/pages/profile/` — artist profile is the core product
- `docs/systems/data-architecture/` — every page reads/writes this
- `docs/systems/email/` — fan capture value depends on this
- `docs/systems/tier-gates/` — conversion model depends on this
- `docs/systems/crm/` — the relationship ledger

**Output:** Master scorecard table, P0 underperformers identified

---

### Phase 5 — The Gap Find (45 minutes)

**Goal:** Think from first principles. Find what the docs haven't covered.

This is the hardest phase. It requires stepping away from the docs and thinking about the product from the user's perspective — specifically looking for what no document has articulated yet.

**The questions:**

1. **User type gap:** Is there a user type who is not fully represented? (The fan who discovers ABLE without an artist referral. The manager who sets up 5 artists at once. The event promoter who wants to connect with multiple ABLE artists for a show.)

2. **Feature gap:** Is there a feature in `admin.html` or `able-v7.html` that isn't documented in strategy? (Check the "What's built" section of STATUS.md — anything built but not specced is a gap.)

3. **Revenue gap:** Is there a revenue stream discussed but not specced? (Close Circle / fan support packs / label tier pricing — are all fully modelled in `docs/systems/monetisation/SPEC.md`?)

4. **Legal / compliance gap:** GDPR, PECR, UK DSA. Is there a scenario in the fan sign-up flow, email broadcasts, or data export where ABLE's spec doesn't cover the legal requirement? Check `docs/systems/legal-compliance/SPEC.md` — is it current?

5. **Journey gap:** Are there edge cases in the user journey that nobody has mapped? (Artist sets release date → release passes → artist forgets to update → page is stuck in "live" state. What happens? Where is this specced?)

6. **Competitive gap:** Is there a competitor move that would damage ABLE that isn't in the risk register? Check `docs/ABLE_STRATEGY.md` section "What Kills This" — is it complete?

7. **Scale gap:** Is there anything in the current architecture that breaks at 500 artists, 5,000 fans per artist, or 10,000 fan sign-ups per day? Where is this documented?

8. **Beyond-10 gap:** Is there a "killer feature" that's been discussed but not specced? Check `docs/systems/killer-features/` — is everything from discussions in `docs/superpowers/` captured here?

For each gap found, assign:
- Priority: P0 (blocks launch) / P1 (pre-launch) / P2 (post-launch)
- Action: create doc / update existing doc / build task / defer to roadmap
- Owner: James / AI agent / research session

**Output:** Gap table with priorities and actions

---

### Phase 6 — The 10+ Push (30 minutes)

**Goal:** Challenge every document that claims to be at 10/10.

For each system or page scoring 10/10 or close to it:

1. Apply at least one technique from `docs/systems/think-out-of-the-box/` (if this directory has content) or apply lateral thinking directly:
   - Inversion: what would make this the worst possible version of itself?
   - First-principles: if this system didn't exist, what would the product miss?
   - Competitor test: could a good team at Linktree or Beacons read this spec and build something better? What would they add?
   - Time test: is this spec still correct in 12 months? What assumption is buried in it that ages badly?

2. Ask: "Is there genuinely nothing left, or is this an assumption?"

3. If a 10.5 exists: document it in the system's `PATH-TO-10.md` under a section labelled **"Beyond 10"**. These are not immediate actions — they are the next frontier.

**Output:** "Beyond 10" entries added to relevant PATH-TO-10.md files, at least one per system at 10/10

---

### Phase 7 — Update and Commit (30 minutes)

**Goal:** Leave the codebase better than you found it.

1. Apply all corrections from Phase 2 (contradictions fixed)
2. Create any missing P0 documents identified in Phase 3
3. Create tasks for all P1 gaps from Phase 5 (add to STATUS.md under "Planned next")
4. Update `docs/STATUS.md` with new state and Master Review date
5. Update `MEMORY.md` with key insights from this review
6. Update `docs/FILE-STRUCTURE.md` if any new files were created
7. Commit: `git commit -m "docs(review): master review [date] — [X] contradictions fixed, [Y] gaps found, [Z] scores updated"`

---

## PART 3 — The "Try Again" Protocol

After completing a full Master Review and actioning all P0 and P1 gaps:

- Wait minimum 48 hours (fresh eyes find what tired eyes miss)
- Run Phases 1–6 again from scratch
- Do not refer to the previous review's notes until you've completed Phase 3

**The rationale:** The first pass fixes what you can see. The second pass finds what was hiding behind what you just fixed. This is consistently where the most valuable discoveries happen.

**Repeat until:** Two consecutive Master Reviews find zero new material gaps (material = P0 or P1 priority).

This is the definition of "documentation done": not a single perfect review, but two consecutive reviews with nothing material to add.

---

## PART 4 — Master Review Triggers

### Mandatory triggers (run without being asked)

- A new page is spec'd through all 8 stages (Strategy → Build cycle complete)
- A new system doc set is created (SPEC + PATH-TO-10 + FINAL-REVIEW)
- Any significant product decision is made (tier pricing change, feature add/remove, scope change)
- Before any build sprint begins
- After any build sprint completes (to capture what the build revealed about the spec)
- Monthly, on the 1st — even if nothing has changed. Docs drift.

### Optional triggers (use judgment)

- After reading a competitor announcement (Linktree, Beacons, Feature.fm)
- After a conversation with a real artist reveals an unmet need
- After any music industry event (awards season, DSP policy changes, streaming royalty shifts)
- After a research session that produced new user insights
- When something in the build "doesn't feel right" — sometimes this is a code problem, but sometimes it signals a spec gap

---

## PART 5 — The Master Scorecard Template

Run a Master Review → fill in this template → save as `docs/systems/master-review/CURRENT-REVIEW.md` (overwrite the previous version, or date-stamp as `REVIEW-[YYYY-MM-DD].md`).

```markdown
# Master Review — [Date]

## Phase 1: Index
- Total .md files: [X]
- Total pages docs: [X] / 54 expected (6 pages × 9 docs)
- Total systems: [X] directories
- Files not in FILE-STRUCTURE.md: [list or "none"]
- Missing expected files: [list or "none"]
- Index updated: [yes / no — what changed]

## Phase 2: Contradictions Found
| Contradiction | Doc A says | Doc B says | Resolution | Updated |
|---|---|---|---|---|

## Phase 3: Completeness Gaps
| Page / System | Missing Files | Priority | Action |
|---|---|---|---|

## Phase 4: Score Summary
| System / Page | Score | Source | Target | Action |
|---|---|---|---|---|

## Phase 5: New Gaps Found
| Gap | Priority | Action | Owner |
|---|---|---|---|

## Phase 6: Beyond-10 Candidates
| Document | Potential 10+ | Added to PATH-TO-10 |
|---|---|---|

## Overall Assessment
- Total .md files: [X]
- Pages at all 9 stages complete: [X]/6
- Systems with full doc set (SPEC + PATH-TO-10 + FINAL-REVIEW): [X]/[total]
- Systems at 9+ score: [X]
- Systems at 10/10: [X]
- Systems below 7/10 (P0): [X]
- Critical gaps (P0): [X]
- Contradictions fixed this review: [X]
- Next review: [date]
- Definition of done: [2 consecutive reviews with zero new P0/P1 gaps — currently on review N]
```

---

## PART 6 — Parallel Agent Dispatch Protocol

For full-scale reviews, dispatch agents in parallel to cover more ground faster:

**Agent 1 — Pages audit**
Brief: "Read every doc in `docs/pages/`. For each page, confirm all 9 stage documents exist. Score the SPEC.md and FINAL-20-ANGLE-REVIEW-2.md against the 10/10 standard. Report: missing docs, honest scores, top 3 gaps per page."

**Agent 2 — Systems audit (core product systems)**
Brief: "Read every doc in `docs/systems/` for: data-architecture, email, tier-gates, crm, analytics, error-states, pwa, notifications. Report: missing docs, honest scores, contradictions with CONTEXT.md, top 2 gaps per system."

**Agent 3 — Systems audit (growth and business systems)**
Brief: "Read every doc in `docs/systems/` for: growth-loop, monetisation, launch-sequence, marketing, organic-growth, partnerships, competitive, legal-compliance, accounting. Report: missing docs, honest scores, top 2 gaps per system."

**Agent 4 — Cross-system coherence check**
Brief: "Read `CONTEXT.md`, `V8_BUILD_AUTHORITY.md`, `ABLE_STRATEGY.md`, then read the SPEC.md of every system. Your only job is finding contradictions: where does one doc say X and another say Y on the same topic? Report every contradiction with both source quotes."

**Synthesis rule:** Agent findings return to James for decisions. Agents flag contradictions; they do not resolve them. Only James decides which document is authoritative when two conflict on a point of product strategy. Agents can resolve technical contradictions (wrong file name, wrong version number) independently.

---

## PART 7 — What "Done" Looks Like

ABLE strategy documentation is "done" when all of the following are true simultaneously:

**1. Every page has all 9 stage documents**
All 6 pages × 9 docs = 54 page documents. No exceptions.

**2. Every system has its 3 minimum documents**
SPEC.md (or named equivalent), PATH-TO-10.md, FINAL-REVIEW.md. For all 40+ systems.

**3. Two consecutive Master Reviews find zero new material gaps**
Material = P0 or P1 priority. P2 gaps may still exist — those are aspirational, not blocking.

**4. All 20-angle scores are at 9+ with honest reasoning**
Any score that remains at 9 must have a written explanation of why 10 is blocked (e.g. "social proof requires 500 real users — honest ceiling until launch"). Unexplained 9s are not acceptable.

**5. The developer test passes**
A skilled developer can build any page from the docs alone, without asking a single question. If they ask a question, the answer must be in the docs. After the answer is provided, update the relevant doc so the question is answered permanently.

**6. The founder test passes**
James can hand these docs to a new hire and have them understand ABLE completely — what it is, what it's for, how it works, what to build next — within 4 hours of reading. If they can't, the docs are too complex, too scattered, or contain too many internal references that don't resolve.

**7. The coherence test passes**
The core thesis — "The relationship between artist and fan belongs to them. ABLE is the conduit." — is reflected, not contradicted, by every document in the system. If any document contradicts this thesis, it is wrong regardless of when it was written.

---

## PART 8 — Scoring the Master Review System Itself

This system is scored against 5 dimensions (not the full 20-angle framework, which is for pages):

| Dimension | Score | Notes |
|---|---|---|
| Completeness of protocol | — | Does it cover everything needed for a real review? |
| Actionability | — | Can an agent follow this without asking questions? |
| Trigger coverage | — | Does it specify when to run without being told? |
| Agent-readability | — | Is it clear enough for a cold-start agent? |
| Coherence with the build process | — | Does it connect to PROCESS.md and the 8-stage build cycle? |

Current score of this protocol: see `FINAL-REVIEW.md` in this directory.

---

*Read this document before every Master Review session. It is not background — it is the operating procedure.*
