# Master Review — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is a review that an agent runs cold, without context, and produces results that James cannot distinguish from his own — because the protocol is specific enough to remove the reviewer from the equation.

---

## Moment 1: The Score That Earns Its Number

**What it is:** Every score in the master review has a one-sentence justification that follows an immovable format: "This system is at [N]/10 because [specific thing that is missing/imprecise/not yet proven] prevents it from being [N+1]/10." If nothing prevents it from being higher, the score is higher. If the score is 10/10, the justification reads: "This system is at 10/10. There is no known improvement that does not require external conditions not yet in place." A score without a justification in this format is not a score — it is a placeholder.

**Why it's 20/10:** The failure mode of most scoring systems is that 9/10 becomes "good enough" — a social shorthand for "we're satisfied." A score that requires a specific justification for why it is not higher forces the reviewer to either find the gap or confirm that no gap exists. Both outcomes are useful. An unexplained 9/10 is a 7/10 with better PR.

**Exact implementation:**

In `MASTER-REVIEW-PROTOCOL.md`, the Phase 4 score table is extended with a mandatory justification column:

```markdown
## Phase 4: Score Summary

| System / Page | Score | Justification (why not N+1?) | Source | Next action |
|---|---|---|---|---|
| seo-og | 7/10 | SSR is not live — crawlers see fallback content, not artist data | FINAL-REVIEW.md | Build Netlify edge function (Level 2 canonical) |
| spotify-import | 9/10 | No persistent import cache — returning artists re-import on new sessions | FINAL-REVIEW.md | Add 7-day localStorage TTL |
| tier-gates | 8/10 | Gate copy uses static strings — does not use artist's real fan count | SPEC.md | Implement dynamic copy function |
```

The justification column is mandatory. The master scorecard template in PROTOCOL.md §PART 5 is updated to require it:

```markdown
## Phase 4: Score Summary
<!-- RULE: Every score must have a justification. Format: "N/10 because [specific gap]."
     A score with no justification is rejected — return to Phase 4 and complete it. -->
```

An agent running a master review that produces a score table without justifications is running an incomplete review. The protocol document now makes this explicit and non-optional.

---

## Moment 2: The Contradiction Table That Resolves Itself

**What it is:** When Phase 2 of the master review finds a contradiction between two documents, the resolution is not just "update the non-authoritative document." The protocol specifies a three-step resolution that prevents the same contradiction recurring: (1) Update the non-authoritative document. (2) Add a note to the authoritative document: "This point supersedes [Document X] on [specific topic]." (3) Add the topic to a standing `SETTLED_DECISIONS.md` file — a running list of decisions that have been made and documented, with the authoritative source named.

The next master review reads `SETTLED_DECISIONS.md` first. Any document that contradicts a settled decision is immediately flagged as out of date, without needing to re-discover the contradiction from first principles.

**Why it's 20/10:** The standard master review finds and fixes contradictions in isolation. The 20/10 version treats each contradiction as a signal that a decision has not been formally documented. `SETTLED_DECISIONS.md` is the institutional memory that prevents the same debate from recurring. The third master review should not re-debate fan cap numbers. That decision is settled. The document says so.

**Exact implementation:**

Create `/Users/jamescuthbert/Desktop/ABLE  MERGED/docs/SETTLED_DECISIONS.md` as a standing file, initially populated from all known contradictions resolved to date:

```markdown
# ABLE — Settled Decisions
**Purpose:** Decisions that have been made, documented, and are no longer open for debate.
**Authority:** V8_BUILD_AUTHORITY.md supersedes all. This file records specifics.

| Decision | Resolution | Authoritative doc | Date settled |
|---|---|---|---|
| Free tier fan cap | 100 fans (not 50, not 250) | tiers/SPEC.md §1 | 2026-03-16 |
| Active artist profile file | able-v7.html (not v3, not v6) | CLAUDE.md active files table | 2026-03-16 |
| Domain | ablemusic.co (not ablefm, not able.fm) | CONTEXT.md | 2026-03-16 |
| Tier pricing | £0 / £9 / £19 / £49 | tiers/SPEC.md §1 | 2026-03-16 |
| Admin accent colour | #f4b942 amber (not artist accent, which is variable) | CLAUDE.md design tokens | 2026-03-16 |
| ABLE takes 0% on fan support | 0% — Stripe standard fee only | tiers/SPEC.md §Close Circle | 2026-03-16 |
```

Phase 2 of the master review protocol is updated:

```markdown
### Phase 2 — Coherence Audit (60 minutes)

**Step 0 (new):** Read `docs/SETTLED_DECISIONS.md` before any other document.
Any contradiction with a settled decision in this file is a P0 error — fix it before proceeding.
Add any newly resolved contradictions to SETTLED_DECISIONS.md before closing Phase 2.
```

---

## Moment 3: The Cold-Start Agent Test

**What it is:** After every major documentation sprint, a fresh agent is given a single instruction: "Run a master review of the ABLE documentation. Use `docs/systems/master-review/MASTER-REVIEW-PROTOCOL.md` as your operating procedure. Produce the completed scorecard in `docs/systems/master-review/CURRENT-REVIEW.md`." The agent has no prior context. No conversation history. No briefing from James.

The output of this cold-start test is compared to James's own assessment. If they agree on scores within 1 point on every system, the protocol is working. If they disagree by more than 1 point on any system, the protocol has a gap — either the scoring criteria are not specific enough, or the source documents are not clear enough. The disagreement itself is the finding.

**Why it's 20/10:** A protocol that only works when the person who wrote it runs it is not a protocol — it is a personal habit. The 20/10 version is testable by a cold agent. Every gap between the agent's output and James's expectation is a spec deficiency, not a capability deficiency. The cold-start test converts the review from a personal quality check into a system quality check.

**Exact implementation:**

The cold-start test is added to the Master Review protocol as a post-review step:

```markdown
## PART 9 — Cold-Start Validation (run after every major doc sprint)

**Trigger:** Any sprint that creates or significantly modifies 5 or more system documents.

**Procedure:**
1. Start a fresh conversation with no prior context.
2. Paste only the following instruction: "Run a master review of the ABLE documentation.
   Use docs/systems/master-review/MASTER-REVIEW-PROTOCOL.md as your operating procedure.
   Produce the completed scorecard in docs/systems/master-review/COLD-START-REVIEW.md."
3. Do not answer any clarifying questions — if the agent asks, the protocol has a gap.
   Note the question in the protocol update log.

**Comparison:**
After the cold-start review is complete, compare:
- Scores: note any divergence > 1 point per system
- Contradictions found: did the agent find the same ones?
- Gaps identified: any gap the agent found that James's review missed (or vice versa)?

**Pass/fail:**
- Pass: agent scores match within 1 point on all systems; no new material gaps missed.
- Fail: agent and James disagree by more than 1 point on any system, OR the agent asks
  a question that indicates a protocol gap.

**On fail:** Update the protocol to address the specific gap, then re-run the cold-start test.
Repeat until the test passes twice consecutively.
```

The cold-start test results are stored in `COLD-START-REVIEW.md` (not the same file as `CURRENT-REVIEW.md`) — so both the standard review and the cold-start review are visible for comparison.

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when a cold-start agent runs the master review without a single clarifying question, produces a scorecard that matches James's own assessment within 1 point on every system, and finds one gap James missed — because the protocol is specific enough to enable a fresh reviewer to see what familiarity made invisible.
