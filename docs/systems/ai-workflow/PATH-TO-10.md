# ABLE — AI Workflow: Path to 10
**Version: 1.0 | Written: 2026-03-16**

> Prioritised by impact-to-effort ratio. Do the top items first.

---

## Current score: 6–7 / 10

The foundation is solid — agent dispatch, git workflow, Playwright verification, structured docs. The gaps are all in the feedback loop: you do not know what agents have done unless you are watching, and sessions do not start with automatic orientation.

---

## Phase 1: High impact, low effort (do this week)

### 1. Telegram bot — agent completion notifications
**Effort:** 30 minutes
**Impact:** +1.5 points
**Why first:** Changes the working model immediately. You no longer need to be at the terminal to know when an agent finishes. Every subsequent session benefits.

Steps: `docs/systems/ai-workflow/TELEGRAM-SETUP.md`

**Done when:** You receive a Telegram message from a test agent run.

---

### 2. Add sprint goal to MEMORY.md every Monday
**Effort:** 5 minutes/week, ongoing
**Impact:** +0.5 points
**Why:** Claude reads the memory file at session start. A current sprint goal means every session starts oriented to the week's priority without you restating it.

Format to add to MEMORY.md:
```
## Current sprint goal (week of [date])
[One sentence: what is the build priority this week?]
```

**Done when:** The sprint goal entry is in MEMORY.md and Claude references it at the next session start.

---

### 3. Session start ritual — `/morning` command
**Effort:** 45 minutes to create `.claude/commands/morning.md`
**Impact:** +1 point
**Why:** Cold session starts cost 5–10 minutes of orientation that should be automated. The `/morning` command does `git log`, checks STATUS.md, and reports the one most urgent thing.

Contents of `.claude/commands/morning.md`:
```markdown
Run the following at the start of every session:

1. Run: git log --oneline --since="24 hours ago"
2. Run: git status
3. Read the "Current build stage" section of docs/STATUS.md
4. Report in this exact format:

---
Last 24 hours: [X commits]
[list each commit: hash + message]

Current build stage: [one sentence from STATUS.md]
Uncommitted changes: [none / list files]

Most urgent: [one thing from STATUS.md "next" section]
---

Then wait. Do not suggest anything. Do not fill silence.
```

**Done when:** `/morning` produces the correct brief on first use.

---

### 4. Commit message discipline — decisions as documentation
**Effort:** No setup. Discipline only.
**Impact:** +0.5 points
**Why:** The git log is your session history. If messages are vague, context is lost between sessions. If they capture decisions made, context is preserved forever.

**Template to use:**
```
type(scope): what was built in one sentence

Optional second sentence with: how it works, where state is stored.
Optional: Decision: [what was decided against and why]
```

**Done when:** Every commit in the next week contains at least one real sentence.

---

## Phase 2: Medium effort, high sustained value (next 2–4 weeks)

### 5. Telegram daily digest via n8n
**Effort:** 3–4 hours (n8n setup + workflow creation)
**Impact:** +1 point
**Why:** The 08:00 daily brief means you start each day with one glance at Telegram knowing the state of the platform — new artists, new fans, errors. No need to log in anywhere.

**Prerequisite:** Supabase backend live (the digest queries real data).
**For now:** Start with a manual script that reads localStorage export data if backend is not live.

---

### 6. Structured agent dispatch brief format
**Effort:** 1 hour (document the format, apply it going forward)
**Impact:** +0.5 points
**Why:** Consistent dispatch briefs reduce back-and-forth clarification and agent mistakes. The format in AI-WORKFLOW.md Part 3 is the standard.

**Done when:** Every agent dispatch in the next week uses the five-section format (goal, files to touch, files not to touch, authority docs, completion criteria).

---

### 7. Weekly memory review — 10 minutes every Sunday
**Effort:** 10 minutes/week, ongoing
**Impact:** +0.5 points (compounds over time)
**Why:** Memory files go stale within 2–3 weeks without maintenance. Stale memory means Claude re-learns things that should already be known. The review keeps the memory sharp.

**Checklist:**
1. Is `Current sprint goal` still accurate?
2. Is `project_active_file.md` pointing to the right file?
3. Are there any feedback entries that are now outdated?
4. What decision was made this week that should be recorded?

---

### 8. Escalation chain — formalise in agent dispatch briefs
**Effort:** 30 minutes to add to the standard brief template
**Impact:** +0.5 points
**Why:** Right now, agents either make assumptions when blocked or stop and wait. The escalation chain in AI-WORKFLOW.md Part 8 gives agents a clear behaviour tree for decisions, clarifications, and blockers.

---

## Phase 3: Investment for scale (Month 2+)

### 9. n8n intelligence pipeline — events → Claude Haiku → Telegram
**Effort:** 8–12 hours (multiple n8n workflows, Supabase triggers, Telegram integration)
**Impact:** +1 point (when artist base is 50+)
**Why:** Transforms platform data into actionable insight delivered to your phone. Not worth building before 50 paying artists — the signal isn't there yet.

**Prerequisite:** Supabase backend live, n8n fully operational, 50+ active artists.

---

### 10. Custom slash commands — full set
**Effort:** 3 hours (create all six commands in `.claude/commands/`)
**Impact:** +0.5 points
**Commands:** `/morning`, `/status`, `/scores`, `/commit`, `/review`, `/agent`

---

### 11. Supabase `agent_log` table + n8n monitoring
**Effort:** 4 hours
**Impact:** +0.5 points
**Why:** Agents write completion entries to `agent_log`. n8n monitors the table and sends Telegram. This decouples the notification from the agent's direct curl call — more reliable, better logging.

---

## Score projections

| After | Actions completed | Estimated score |
|---|---|---|
| Today | Nothing | 6–7 |
| Week 1 | Items 1–4 | 8 |
| Week 3 | Items 1–7 | 8.5 |
| Month 2 | Items 1–10 | 9 |
| Month 3+ | All items + n8n pipeline live | 10 |

---

## The one thing that matters most

If you only do one thing from this list: **set up Telegram notifications for agent completions.**

Everything else is refinement. That one change removes the biggest friction in the current working model — not knowing when agents are done without watching the terminal. From that point, you can step away, do other work, and come back when notified. That is the working model at 10.

---

*Full specification: `docs/systems/ai-workflow/AI-WORKFLOW.md`*
*Setup guide: `docs/systems/ai-workflow/TELEGRAM-SETUP.md`*
