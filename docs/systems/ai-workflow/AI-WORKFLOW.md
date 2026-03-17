# ABLE — AI Workflow at 10/10
**Version: 1.0 | Written: 2026-03-16**
**Status: Active — primary authority for how James works with AI agents**

> The goal is not to type less. The goal is to think better and decide faster. Every optimisation in here serves that end.

---

## The honest current state

You are probably at 6–7 out of 10. Here is why that number is what it is, and not lower.

**What is working well:**
- Agent dispatch is fast and scoped
- Parallel agents in worktrees are being used correctly
- Git commit messages are functioning as a session log
- Playwright MCP runs after significant changes
- CONTEXT.md and STATUS.md exist and are current — agents have orientation
- The memory system captures preferences and decisions across sessions

**What is not at 10:**
- No notifications when agents complete — you have to be watching the terminal
- No way to check on a running session from your phone
- No daily brief automatically prepared before you open your laptop
- No escalation path when an agent hits a decision it cannot make without you
- Decisions made in sessions are not uniformly captured — they live in git commit messages and occasionally in docs, but not in one searchable place
- Sessions start cold — recalling where you were takes mental effort that should be automated away
- The gap between "agent finishes" and "you know it finished" can be hours if you stepped away

The target is a working arrangement where the agent stack produces output, you get notified, you make decisions from your phone or your desk, and the build continues without your constant presence.

---

## Part 1: Session structure (how every session should run)

### The session start ritual

Every session opens the same way. Claude Code should do this automatically, without being asked:

1. Run `git log --oneline --since="24 hours ago"` — show what was built in the last 24 hours
2. Check `docs/STATUS.md` — state the current build stage in one sentence
3. List any uncommitted changes
4. State the one most urgent thing based on STATUS.md
5. Stop and wait. Do not fill silence with suggestions.

**The brief you get should look like:**

```
Last 24 hours: 2 commits
  3ced25e feat(admin): fan list + shows page — filter pills, source badges
  d70a78c feat(admin): shared bottom sheet component

Current build stage: Admin dashboard — CRM section pending
Uncommitted changes: none

Most urgent: fan.html fan dashboard — spec in docs/pages/fan/DESIGN-SPEC.md

Ready. What should we build today?
```

That is 10 seconds of reading. You make one decision and the session has a direction.

### The session end commitment

Every session ends with:
1. A git commit with a descriptive message (not "updates" — a real sentence about what changed and why)
2. If a significant decision was made, one line added to `docs/STATUS.md` under "Last session"
3. If you're about to walk away for more than 2 hours, send the Telegram session-end message (see Part 2)

This takes 90 seconds. It means the next session starts with full context, not from memory.

### One goal per session

Before any code is written, state one sentence: "Today's goal is [X]."

Not a list. Not several things. One thing. This is not a productivity trick — it is how you prevent sessions from drifting into five half-finished improvements that collectively move nothing forward.

The goal can be small. "Fix the gig mode toggle" is a valid session goal. The point is that at the end of the session you know whether you achieved it.

---

## Part 2: Telegram notification system

Yes, you can get Telegram messages when agents complete, when background tasks finish, when Supabase events fire. This is not complicated to set up. It changes the working model from "watch the terminal" to "get on with your life, be notified when something needs you."

Full setup instructions: `docs/systems/ai-workflow/TELEGRAM-SETUP.md`

### What to receive on Telegram

**Send immediately (high signal):**

| Event | Message format |
|---|---|
| New artist sign-up | "New artist: [name] — signed up via [source]" |
| Fan milestone | "Maya Solis just hit 100 fans." |
| First fan for any artist | "[Artist name]'s first fan just signed up." |
| Payment received | "New Artist Pro subscriber. £19/mo." |
| Production error | "ERROR: [function name] failed for [artist] at [time]" |
| Agent session complete | "Agent done: [task name]. [X] commits. No errors." |

**Send as a daily digest (08:00):**

```
Morning. Yesterday:
- 3 new artists
- 47 new fans across 12 artists
- £0 revenue
- Build: 2 commits (admin dashboard, shows section)
- Errors: none
```

Silent if nothing notable happened. A quiet day should be quiet.

**Send weekly (Monday 09:00):**

```
Week of [date]:
MRR: £X (↑£Y)
New paying artists: X
Churned: X
Top artist by fan capture: [name] ([X]%)
Errors this week: none
```

**Never send:**
- Every page view
- Every individual fan sign-up once the platform has volume (batch these)
- Build agent progress updates while working — only completion
- Routine n8n workflow confirmations
- Anything that requires no decision from you

The signal discipline is more important than the notification setup. A noisy alert system trains you to ignore it. Guard the channel.

### Adding Telegram to agent completions

Until n8n is fully operational, append this to the end of every background agent's task instructions when you dispatch them:

```
When this task is complete, run this command:

curl -s -X POST "https://api.telegram.org/bot{TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "{CHAT_ID}",
    "text": "Agent complete: [task name]\n[X] commits\nBranch: [branch name]"
  }'
```

This is the minimal version. It requires no n8n. It fires when the agent runs the curl command at the end of its task.

The proper version (Phase 2): n8n monitors the `agent_log` Supabase table. Agents write a completion row. n8n sends the Telegram notification. This means the notification infrastructure is independent of the agent's behaviour.

---

## Part 3: Working smarter with parallel agents

### The correct parallel pattern

You currently dispatch one agent and wait. The better pattern: dispatch two non-dependent agents, do something else, review both when notified.

**What can run in parallel:**

| Agent 1 | Agent 2 |
|---|---|
| Feature build in `able-v7.html` | Documentation for that feature |
| Feature build in `admin.html` | Playwright smoke test spec writing |
| Competitive research | Feature spec writing |
| Copy review of one page | Code review of another page |

**What cannot run in parallel:**
- Two agents touching the same file
- Agent 2 whose scope depends on Agent 1's output
- Any agent task that changes a data structure used by another agent's target

### The dispatch brief format

Every agent dispatch should include exactly:

1. **Goal**: one sentence — what is the end state?
2. **Files to touch**: explicit list — what gets edited?
3. **Files not to touch**: explicit exclusions if there is any ambiguity
4. **Authority docs to read first**: which specs govern this work?
5. **Completion criteria**: how will the agent know it is done?
6. **Notification**: the curl command to send Telegram when done (see Part 2)

This format takes 2 minutes to write and saves 20 minutes of back-and-forth clarification. It is worth it every time.

### Context preservation between sessions

The git commit message is the session log. Treat it as such.

A good commit message:
```
feat(admin): fan CRM — filter by source, star fans, export list

Added filter pills (source: all/ABLE/link/social), star toggle per fan,
export button (CSV, Phase 2). State stored in able_starred_fans localStorage.
Decision: deferred bulk email to Phase 2 — needs backend first.
```

That commit message contains: what was built, how it works, where the state lives, and what was decided against and why. Future-you and future-Claude can reconstruct the context from that in 10 seconds.

Bad commit messages that lose context:
- "admin updates"
- "fixed stuff"
- "WIP"
- "various improvements"

---

## Part 4: Memory system — what to keep, what to prune

The Claude memory system at `/Users/jamescuthbert/.claude/projects/-Users-jamescuthbert-Desktop-ABLE--MERGED/memory/` is one of the highest-leverage tools in the stack. It is only useful if it is current.

### What belongs in memory

**High-value entries (always keep current):**
- Current sprint goal — what this week's build priority is
- Current page being worked on — which file is active
- Standing decisions — choices made that should not be revisited ("decided: no social feed, ever")
- Feedback rules — how you prefer to work ("minimal interruptions", "small scoped changes only")
- Things not to do again — mistakes that were corrected and should not recur

**Entries that go stale (prune monthly):**
- Specific file status entries that are now superseded
- References to files that no longer exist in their described form
- Historical decisions about versions that are now archived

### The weekly memory review (10 minutes, Sunday)

```
1. Open /Users/jamescuthbert/.claude/projects/-Users-jamescuthbert-Desktop-ABLE--MERGED/memory/
2. Read MEMORY.md — delete any stale entries
3. Add: what was the main thing built this week?
4. Add: any new standing decisions?
5. Add: any new "never do this again" entries?
6. Save
```

This investment compounds. Claude Code is only as well-oriented as its memory. A 10-minute weekly review prevents 30 minutes of re-explaining context per session.

### The sprint goal memory entry

Add this to MEMORY.md and update it every Monday:

```
## Current sprint goal (week of [date])
[One sentence describing the build priority this week]
```

At the start of every session, Claude reads this and knows which direction to pull without you having to restate it.

---

## Part 5: Slash commands to add

These should be created as custom Claude Code slash commands in `.claude/commands/`. Each is a markdown file with the instruction set.

### `/morning`
The daily start-of-session ritual. Runs automatically what should already be happening:
```
git log --oneline --since="24 hours ago"
cat docs/STATUS.md (current build stage section only)
git status (uncommitted changes)
Report back in the session brief format. Then wait.
```

### `/status`
Pull the current build state from `docs/STATUS.md` and report it in two sentences:
- What is built and at what score
- What is next

### `/commit`
Smart commit with the correct format:
- Stage all changed files by name (not `git add .`)
- Ask: "Commit message?" — one sentence, present tense
- Run parse-check on any modified JS files
- Commit with Co-Authored-By: Claude
- Confirm with the commit hash

### `/scores`
Read each active page's DESIGN-SPEC.md and report current 20-angle scores in a table. Useful for a weekly progress check without opening multiple docs.

### `/review`
Run the 20-angle framework against the current page being worked on. Compare against the DESIGN-SPEC target scores. Identify the three lowest-scoring angles. That is the build queue.

### `/agent [task]`
Dispatch a background subagent with the standard dispatch brief format. Prompt for: goal, files to touch, authority docs, completion criteria. Then format the dispatch correctly and send.

### `/deploy` (Phase 2, when Netlify is connected)
Trigger a Netlify deploy, monitor the build log, and send a Telegram notification on success or failure.

---

## Part 6: The n8n → Claude API → Telegram intelligence pipeline

This is the Phase 2 business intelligence layer. It is not operating yet. When it is, you get a business that surfaces the right information at the right moment without you having to query anything.

### The pipeline

```
Supabase trigger (new fan / new artist / payment / error)
  → n8n workflow
    → Claude API (Haiku): generate plain-English summary
      → Telegram: message to James
```

**Example output:**
- "3 artists signed up today. All listed their genre as indie/folk. Your page is attracting a specific audience — consider a targeted post for indie artists this week."
- "Maya Solis had 12 fan sign-ups from a single Instagram story today. Her fan capture rate is 8.4% — highest on the platform this week."
- "2 failed Stripe charges today. One may be an expired card. FreeAgent link: [url]"

This is the "business that thinks" model. You make decisions. The system surfaces what you need to make them well.

### What not to automate yet

Until the artist base is above 50 paying accounts, the n8n intelligence pipeline is premature. The signal-to-noise ratio on a small base is too low for useful pattern detection. Build it when the data volume justifies it. Building it now is infrastructure cost with no information value.

The Telegram notification system (Part 2) is worth building now, because it is simple and serves the development workflow immediately. The intelligence pipeline waits for production data.

---

## Part 7: The weekly AI operating rhythm

This is the operational cadence. Not aspirational — this is what the 10/10 working arrangement looks like in practice.

### Daily

**Automated (n8n fires these without any action from you):**
- 07:00: Market monitoring check (silent if nothing outside threshold)
- 08:00: Daily digest to Telegram (silent if nothing notable)
- 09:00: Churn check (flags at-risk artists internally)

**Your 2–3 hour Claude Code session:**
- Open with `/morning` command
- State one session goal
- Build
- End with git commit containing a real message
- If stepping away: send the session-end Telegram message

### Weekly

**Automated (Monday 09:00):** Weekly business digest to Telegram

**Semi-automated (Sunday evening, 10 minutes):**
- Review memory files — prune stale, add new
- Review git log for the week — what was shipped?
- Set next week's sprint goal in MEMORY.md

**Active review (30 minutes, any day):**
- Check n8n execution log — any silent failures?
- Check PostHog (when live) — any surprising patterns?
- Review `docs/STATUS.md` — still accurate?

### Monthly

- Which agents delivered the most value? Which are running but not used?
- Which automations are generating noise vs signal? Kill the noise ones.
- Are memory files still accurate? Do a full prune.
- Check for new Claude Code features or MCP servers that could help.
- Review the sprint goals from the past month — did you build what you intended?

---

## Part 8: Escalation paths — when the agent needs a decision

The current model: agents hit a decision point, they either make an assumption (risky) or ask in the terminal (requires you to be watching). Neither is at 10.

### The correct escalation chain

1. **Agent can decide with available context:** agent decides, documents the decision in the commit message, continues
2. **Agent needs a clarification but it is not urgent:** agent completes what it can, writes a clear question in the terminal, sends a Telegram message: "Decision needed: [question]. Non-urgent — review when convenient."
3. **Agent cannot continue without a decision:** agent commits its progress, reports what was completed and what is blocked, sends Telegram: "Blocked: [reason]. Need decision on [specific question] before continuing."
4. **Agent encounters a potential destructive action:** agent stops immediately, does not proceed, sends Telegram: "Stopped: about to [action]. This is irreversible. Confirm before I continue."

**The critical one is level 4.** Destructive actions — deleting files, resetting branches, overwriting data — must never proceed without explicit confirmation. The Telegram message is the safety layer when you are not at the terminal.

### What counts as an escalation-worthy decision

**Always escalate:**
- Any action that cannot be undone (file deletion, branch reset, data overwrite)
- Architecture changes that affect multiple files
- Copy changes that change the meaning of something on the public page
- Anything that touches pricing, tier gates, or payment flows

**Agents can decide without escalating:**
- Which specific HTML/CSS approach to use within a known spec
- Whether to add a comment or use a variable name
- Order of operations within a clearly scoped task
- Code formatting and consistency choices

The escalation system only works if the boundary is respected in both directions. An agent that escalates everything is as bad as an agent that escalates nothing.

---

## Summary: the path from 6 to 10

| Gap | Fix | Effort |
|---|---|---|
| No notifications when agents complete | Add Telegram curl to agent dispatch brief | 30 minutes |
| Cold session starts | Add `/morning` slash command | 1 hour |
| Stale memory files | Weekly 10-minute review | Ongoing |
| No sprint goal tracking | Add sprint goal to MEMORY.md each Monday | 5 minutes/week |
| Decisions lost between sessions | Commit messages as decision log | Discipline, no setup needed |
| No business intelligence layer | n8n + Telegram pipeline | Phase 2 — when 50+ paying artists |
| No phone-accessible status | Telegram daily digest | 2 hours setup |
| Agent escalation is unclear | Escalation chain defined above | Documented — apply it |

The biggest jump — from 6 to 8 — comes from the Telegram setup and the session start ritual. Those two changes cost less than 2 hours to implement and change the daily working experience immediately.

The jump from 8 to 10 comes from the n8n intelligence pipeline and consistent memory maintenance. That is a Phase 2 build and a weekly discipline.

---

*See also:*
- `docs/systems/ai-workflow/TELEGRAM-SETUP.md` — full setup with exact commands
- `docs/systems/ai-workflow/PATH-TO-10.md` — prioritised action list with effort estimates
- `docs/systems/ai-agents/AI-AGENTS.md` — full agent infrastructure specification
