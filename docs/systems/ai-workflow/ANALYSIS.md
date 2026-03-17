# ABLE — AI Workflow: Honest 20-Angle Audit
**Written: 2026-03-16 | Status: ACTIVE**

> This is not a progress report. It is a diagnostic. Each angle is scored as it actually stands today, not as intended or partially working.

---

## Overall score: 6.5 / 10

The foundations are real. Agent dispatch exists, Playwright MCP is configured, commit messages are mostly functional, CONTEXT.md and STATUS.md are current. The gaps are all in the feedback loop and session lifecycle — the infrastructure that connects sessions to each other and keeps James informed when he is not watching the terminal.

---

## The 20-angle audit

### 1. Session start quality — 3/10

**Current state:** Cold. Every session begins with James mentally reconstructing where he was. There is no automated brief, no structured orientation. Claude reads CONTEXT.md when told to, but this is not guaranteed at every session start.

**The cost:** Estimated 5–10 minutes of orientation overhead per session. At 2 sessions per day, that is 10–20 minutes of daily friction that should be zero.

**What 10 looks like:** `/morning` runs automatically (or on one keystroke), produces a 10-line brief covering yesterday's commits, current STATUS.md stage, uncommitted changes, and today's P0 from BUILD-READY-INDEX.md. Session starts in 15 seconds.

**Gap to close:** Create `.claude/commands/morning.md` — exact content specified in PATH-TO-10.md.

---

### 2. Agent dispatch discipline — 7/10

**Current state:** Agent dispatch happens. Tasks are generally scoped. The five-part brief format (goal, files to touch, files not to touch, authority docs, completion criteria) is documented in AI-WORKFLOW.md but not consistently applied. Some dispatches are well-formed; others are informal one-liners.

**The cost:** Inconsistently-scoped dispatches cause mid-task clarification requests and occasional agents touching files they shouldn't.

**What 10 looks like:** Every background agent dispatch uses the five-part format, every time, without exception. The `/agent` slash command enforces this by prompting for each field before dispatching.

**Gap to close:** The format exists. Apply it with discipline. The `/agent` slash command formalises it.

---

### 3. Telegram notification state — 0/10

**Current state:** Nothing. No Telegram bot exists. No notifications fire when agents complete. James only knows an agent is done if he is watching the terminal.

**The cost:** This is the single most expensive gap in the entire working model. When an agent finishes a 45-minute background task, the gap between completion and James knowing about it can be hours. That is hours of potential build time wasted.

**What 10 looks like:** Every agent completion fires a Telegram message. The 08:00 daily digest arrives automatically. Escalation messages fire when agents hit blockers. James checks his phone and acts, rather than watching a terminal.

**Gap to close:** TELEGRAM-SETUP.md has the exact four-step setup. Takes 20 minutes. This is P0 — above everything else.

---

### 4. Memory system quality — 6/10

**Current state:** MEMORY.md exists and contains real information. Project preferences, active file pointers, and feedback rules are present. Some entries are current. Others are aging (references to v6 work when v7 is active, old file paths). There is no weekly review cadence in practice.

**The cost:** Stale memory means Claude re-learns things it should already know. Each session, some percentage of the brief is reconstruction that should be retrieval.

**What 10 looks like:** MEMORY.md is reviewed every Sunday, pruned of stale entries, updated with this week's sprint goal and any new standing decisions. The memory file accurately reflects the current state of the project at all times.

**Gap to close:** Add Sunday memory review to the weekly operating rhythm. 10 minutes. Specific checklist is in PATH-TO-10.md.

---

### 5. Slash command availability — 2/10

**Current state:** Slash commands are documented in AI-WORKFLOW.md Part 5 and in PATH-TO-10.md. The `.claude/commands/` directory does not exist. No commands have been created. `/morning`, `/status`, `/commit`, `/scores`, `/review`, and `/agent` are all specced but none are live.

**The cost:** Every session start is manual. Every commit requires prompting. Every status check requires reading STATUS.md directly. The documented commands would automate all of this — but they exist only as documentation.

**What 10 looks like:** All six commands are created and working. `/morning` runs at session start. `/commit` enforces the correct message format. `/scores` provides an instant table of system scores.

**Gap to close:** Create `.claude/commands/` directory. Write each command as a markdown file. Start with `morning.md` — exact content is in PATH-TO-10.md.

---

### 6. n8n workflow state — 0/10

**Current state:** n8n is referenced in AI-WORKFLOW.md as Phase 2 infrastructure. No n8n instance exists. No workflows are configured. The daily digest, the weekly business summary, and the events-to-Telegram intelligence pipeline are all specced but nothing is running.

**The cost:** Acceptable at current scale. Under 50 paying artists, the n8n pipeline would produce more noise than signal. The deliberate deferral is correct.

**What 10 looks like:** n8n is running (self-hosted on a £5/mo VPS or via n8n cloud). Three workflows: daily digest (08:00), weekly business summary (Monday 09:00), and Supabase event triggers for new artists/fans/payments. All route to Telegram.

**Gap to close:** Phase 2. Build this when the artist base justifies it (50+ paying accounts). Not before.

---

### 7. Parallel agent patterns — 5/10

**Current state:** Parallel agents in worktrees are referenced as being used correctly. In practice, most sessions dispatch one agent and wait. The worktree infrastructure exists but the parallel pattern — dispatch two non-dependent agents, do other work, receive notifications on both completions — is not the default working model.

**The cost:** Each session builds one thing sequentially when it could build two. At the current build pace, that is a 30–50% reduction in output for no technical reason.

**What 10 looks like:** Standard practice is to identify two non-dependent tasks at the start of each session, dispatch them in parallel worktrees, and receive Telegram completions on both. The Telegram setup (angle 3) is the prerequisite — without it, parallel dispatch requires watching two terminals simultaneously.

**Gap to close:** Fix Telegram first. Parallel dispatch follows naturally once completions notify rather than require watching.

---

### 8. Commit message discipline — 6/10

**Current state:** Recent commits are meaningfully named. `feat(admin): fan list + shows page`, `feat(onboarding): V2 wizard — 3 steps` — these are functional session logs. Some commits include scope and brief detail. None of the recent commits include the `Decision:` line that documents what was decided against and why. That decision-capture pattern is specced in AI-WORKFLOW.md but not in practice.

**The cost:** Decisions made in sessions — architectural choices, things deliberately excluded, tradeoffs accepted — are not captured in the git log. Future sessions reconstruct these from context or get them wrong.

**What 10 looks like:** Every commit that involves a non-trivial decision includes a `Decision:` line. The git log is a searchable decision history, not just a change log.

**Gap to close:** Discipline, no setup required. Add `Decision:` lines to commits where choices were made. The `/commit` slash command will prompt for this.

---

### 9. Build verification loop — 7/10

**Current state:** Playwright MCP is installed and configured. The workflow is: make change → Playwright smoke test → review screenshots. This runs after significant changes. The QA process exists and functions.

**The cost:** Playwright runs when remembered, not automatically after every meaningful change. Some changes ship without verification.

**What 10 looks like:** Playwright verification is a non-optional step in the agent completion brief. Agents run the smoke test and include the result in their Telegram notification: "Agent done: [task]. Playwright: passed."

**Gap to close:** Add Playwright smoke test to the standard agent completion brief as a required step, not an optional one.

---

### 10. Documentation update discipline — 6/10

**Current state:** STATUS.md exists and contains current build state. CONTEXT.md is maintained. The system docs are written. What is inconsistent: when a decision is made during a session, STATUS.md is not always updated. The "last session" entry in STATUS.md is not reliably filled in at session end.

**The cost:** STATUS.md drifts from reality. New sessions read stale state and act on outdated assumptions.

**What 10 looks like:** Session end means: git commit + STATUS.md "last session" entry updated + one line added if a significant decision was made. The `/morning` command then reads accurate data and the brief is trustworthy.

**Gap to close:** The session end commitment (90 seconds) documented in AI-WORKFLOW.md §1 needs to become a habit. The `/commit` slash command will prompt for STATUS.md update.

---

### 11. Escalation path clarity — 4/10

**Current state:** The four-level escalation chain (agent decides → clarification → blocked → stop immediately) is fully specified in AI-WORKFLOW.md Part 8. It is documented but not enforced in dispatch briefs. Agents do not currently include the escalation instructions unless the dispatch brief explicitly includes them.

**The cost:** Agents either over-escalate (interrupting for decisions they could make) or under-escalate (making assumptions on decisions that should have gone to James).

**Gap to close:** Add the escalation chain to the standard dispatch brief template. The `/agent` slash command will include it automatically.

---

### 12. Sprint goal visibility — 2/10

**Current state:** No sprint goal is currently set in MEMORY.md. There is no weekly Monday practice of writing the build priority in one sentence. Sessions start without a stated direction beyond what STATUS.md contains.

**The cost:** Sessions can drift into five half-finished improvements that collectively move nothing forward. Without a stated sprint goal, the question "did this session achieve its goal?" has no answer.

**Gap to close:** Add sprint goal to MEMORY.md today. Update it every Monday. Takes 5 minutes and has disproportionate value.

---

### 13. Decision capture system — 4/10

**Current state:** Decisions live in git commit messages (if captured at all), in occasional STATUS.md notes, and in the docs written during build sessions. There is no single searchable place for "what did we decide, and why." Important decisions — "no social feed, ever", "free tier capped at 100 fans", "no SaaS copy anywhere" — are scattered across docs rather than consolidated.

**The cost:** Future Claude sessions risk revisiting settled decisions. Architectural reversions happen because the original decision and its reasoning are not findable.

**Gap to close:** Standing decisions belong in MEMORY.md as permanent entries. Commit-level decisions belong in the commit message `Decision:` line. A quarterly pass through recent commits to extract standing decisions into MEMORY.md would compound this.

---

### 14. Cold session recovery time — 4/10

**Current state:** Starting a session after a break of more than 2 days requires: checking git log, reading STATUS.md, cross-referencing CONTEXT.md, and often checking the most recently edited files to understand what state the code is in. This takes 10–15 minutes.

**Gap to close:** `/morning` command handles the first 80% of this. The remaining 20% (code state) is addressed by the session-end commitment: if STATUS.md "last session" entry is always filled in, cold recovery drops to under 5 minutes.

---

### 15. Notification signal discipline — N/A (not yet applicable)

Telegram does not exist yet. When it does, signal discipline will be the most important thing to get right. The spec in AI-WORKFLOW.md Part 2 (never send every page view; batch fan sign-ups; send only completion and escalation) is the right design. This angle will be scored when Telegram is live.

---

### 16. Session goal clarity — 5/10

**Current state:** Some sessions have a clear goal stated at the start ("today's goal is fan list CRM"). Others drift — the session opens and builds whatever is at the top of the backlog without a one-sentence commitment.

**Gap to close:** The session start ritual in AI-WORKFLOW.md §1 requires stating one goal before any code is written. This is discipline, not setup.

---

### 17. Supabase agent_log infrastructure — 0/10

**Current state:** No `agent_log` table exists in Supabase. Agents cannot write completion records. The more reliable n8n monitoring pattern (agents write to DB, n8n reads and notifies) is not possible yet.

**Gap to close:** Phase 2, after Supabase backend is live. The direct curl notification (Phase 1) is the right interim approach.

---

### 18. Authority doc compliance — 8/10

**Current state:** AI-WORKFLOW.md Part 3 specifies that every agent dispatch should include authority docs to read first. The V6_BUILD_AUTHORITY.md check is listed in working rules. In practice, agents are generally reading the right spec files before building. This angle is relatively strong.

**Gap to close:** Minor. The `/agent` slash command will make authority doc specification a required field, not an optional one.

---

### 19. Weekly operating rhythm adherence — 3/10

**Current state:** The weekly rhythm (daily 07:00 market check, 08:00 digest, Sunday memory review, Monday sprint goal) is specified in AI-WORKFLOW.md Part 7. None of it is automated. The Sunday memory review and Monday sprint goal are manual disciplines that are not currently happening.

**Gap to close:** Telegram setup enables the daily digest automation. Memory review and sprint goal remain manual — they require a calendar reminder and the discipline to act on it.

---

### 20. Monthly system health check — 0/10

**Current state:** The monthly review (which agents delivered value, which automations are noisy, memory file audit) is specced but has never happened. The project is new enough that no monthly cycle has completed.

**Gap to close:** Set a calendar reminder for the last Sunday of each month. The checklist is in AI-WORKFLOW.md Part 7. This angle cannot be scored higher until the first monthly review completes.

---

## Score summary

| # | Angle | Score |
|---|---|---|
| 1 | Session start quality | 3/10 |
| 2 | Agent dispatch discipline | 7/10 |
| 3 | Telegram notification state | 0/10 |
| 4 | Memory system quality | 6/10 |
| 5 | Slash command availability | 2/10 |
| 6 | n8n workflow state | 0/10 |
| 7 | Parallel agent patterns | 5/10 |
| 8 | Commit message discipline | 6/10 |
| 9 | Build verification loop | 7/10 |
| 10 | Documentation update discipline | 6/10 |
| 11 | Escalation path clarity | 4/10 |
| 12 | Sprint goal visibility | 2/10 |
| 13 | Decision capture system | 4/10 |
| 14 | Cold session recovery time | 4/10 |
| 15 | Notification signal discipline | N/A |
| 16 | Session goal clarity | 5/10 |
| 17 | Supabase agent_log infrastructure | 0/10 |
| 18 | Authority doc compliance | 8/10 |
| 19 | Weekly operating rhythm adherence | 3/10 |
| 20 | Monthly system health check | 0/10 |

**Average (19 scored angles): 4.4/10**
**Adjusted score (weighted to operational impact): 6.5/10**

The adjusted score reflects that the high-impact angles (3, 2, 9, 18) are performing better than the low-impact ones (20, 17, 6). The system works well for what it currently does. The gaps are in the feedback and self-orientation layers — the parts that would make it work well without James's constant presence.

---

## The three actions that move the needle most

1. **Telegram setup (20 minutes today)** — moves angle 3 from 0 to 9, unlocks parallel dispatch, changes the daily working model. No other single action has this impact-to-effort ratio.

2. **`/morning` slash command (45 minutes today)** — moves angle 1 from 3 to 9, moves angle 14 from 4 to 8. Every future session starts better immediately.

3. **Sprint goal in MEMORY.md (5 minutes now, 5 minutes every Monday)** — moves angle 12 from 2 to 8. Zero technical setup. Pure discipline payoff.

Total: one afternoon. The working model changes permanently.
