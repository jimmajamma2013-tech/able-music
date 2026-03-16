# Filing System — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when a new agent session starts, reads three files, and builds the right thing without a single clarifying question.

---

## Moment 1: The 60-Second Orient

**What it is:** A session start experience where Claude Code reads `CONTEXT.md` alone and emerges with a complete, accurate picture of the current build state — active files, in-progress work, blockers, next action — without reading more than two additional files.

**Why it's 20/10:** Most codebases waste the first 15–20 minutes of a session on orientation. The agent reads the wrong files, asks questions that a good index would have answered, or starts a build that was already done. When `CONTEXT.md` is maintained to the standard in the SPEC, this friction disappears. The first commit in a session happens faster. The right thing gets built. The session ends with more done than a session that started with a poorly-maintained index would accomplish in twice the time. That efficiency compounds.

**Exact implementation:**

`CONTEXT.md` must contain, in this exact order:

1. **Active files table** — the six fields: `File | Role | Status | Last changed | Current state | Next action`. Not a paragraph. A table. An agent reads tables faster than prose.

2. **In-progress work** — a single bullet: "Currently building: [exact feature name] in [exact file]. Status: [% complete or 'blocked on X']." One bullet. Not a section.

3. **The one thing** — "Next action: [specific, implementable instruction]." One sentence. Not a list of options.

4. **Token budget note** — "Reading CONTEXT.md + FILE-STRUCTURE.md exhausts ~4k tokens. Read no additional docs unless the task requires a specific system spec."

The rule for maintaining `CONTEXT.md`: update it at the end of every session. It takes 3 minutes. It saves 20 minutes at the start of every subsequent session. The person who skips the update is taxing every future session.

---

## Moment 2: The Decision That Is Never Made Twice

**What it is:** Every resolved decision — "Discord auth is optional, not primary", "credits use peer-verification not self-reporting", "copy never says 'content creator'" — lives in a SPEC.md and is findable from `INDEX.md` in under 30 seconds.

**Why it's 20/10:** The most expensive thing in any long-running project is relitigating decisions that were already made well. An agent or developer who doesn't know that Discord auth was evaluated and deliberately made optional will evaluate it again, reach the same conclusion, and document it somewhere that doesn't get read. When every decision has a home that's indexed, the project accumulates wisdom rather than repeating it. The filing system is the mechanism that converts individual good decisions into institutional knowledge.

**Exact implementation:**

Every SPEC.md that documents a decision must include a "Decision record" section with this structure:

```markdown
## Decision: [Decision name]
**Made:** [YYYY-MM-DD]
**Status:** Resolved — do not reopen without new evidence

**The question:** [One sentence — what was evaluated]
**The answer:** [One sentence — what was decided]
**Why:** [2–4 sentences of reasoning — enough to understand without re-reading everything]
**What was rejected:** [One sentence on the alternative — prevents someone re-proposing it]
```

`INDEX.md` must be searchable by decision keyword, not just by file name. If the index can't answer "where is the auth decision?" in 30 seconds, it's not maintaining itself at the right standard.

The maintenance protocol: any agent that creates a new SPEC entry or resolves an open question must add or update a Decision record and update `INDEX.md` in the same commit. Non-negotiable.

---

## Moment 3: The New Person in 20 Minutes

**What it is:** A new team member — a future co-founder, an advisor, a contractor — sits down and reads `CONTEXT.md`, `FILE-STRUCTURE.md`, and the `V8_BUILD_AUTHORITY.md` table of contents, and understands the product, the architecture, the data model, and the current build state in 20 minutes.

**Why it's 20/10:** The filing system is not just for AI agents. It is the product's institutional memory, and institutional memory determines how fast a team can grow. When a second person joins, their time-to-productive-contribution is measured in days if the docs are good and weeks if they're not. The 20-minute orient test is the standard that makes fast onboarding possible.

**Exact implementation:**

The 20-minute reading list (this is the onboarding spec — not a suggestion, a sequence):

```
Minute 0–5:   CONTEXT.md — active files, current build state, next action
Minute 5–10:  FILE-STRUCTURE.md — where everything lives and why
Minute 10–15: V8_BUILD_AUTHORITY.md — all resolved product decisions, table format
Minute 15–20: docs/pages/ index for the one page most relevant to their first task
```

After reading, the new person should be able to answer without asking:
- What are the four active HTML files?
- What does `campaignState` mean?
- Where does fan data live?
- What is the copy rule about "content creator"?
- What is the current P0 build task?

The filing system scores 20/10 on this moment when all five questions are answerable from those four docs. If any are not, that is a gap in the system, not a gap in the reader.

---

## The 20/10 test

A new session starts, `CONTEXT.md` is read, the first commit lands within 12 minutes — building the right feature, in the right file, with the right copy register — without a clarifying question.

---

*See also: `docs/systems/filing-system/SPEC.md` — canonical filing system specification*
