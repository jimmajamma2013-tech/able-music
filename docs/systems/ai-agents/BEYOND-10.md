# AI Agents — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when the agent system makes you feel like you have a second developer who works while you sleep, never asks questions mid-task, and leaves a Playwright-verified commit with a note that says "ready to review."

---

## Moment 1: The Friday Night Commit

**What it is:** You dispatch a scoped build task at 23:15 on a Friday, go to sleep, and at 07:15 Saturday you receive a Telegram notification: "Admin fan list — export button + source filter complete. Playwright verified at 375px and 430px. Parse check passed. Branch: feat/fan-list-export. Ready to review."

**Why it's 20/10:** Not just automation. The specific emotional register of this: waking up with something done that wasn't done when you went to sleep. Not a draft. Not a question. A finished, tested, reviewable piece of work. This is what changes the pace of the project.

**Exact implementation:**

The dispatch brief template that makes this possible. Every brief sent to a Claude Code agent must contain all six fields or the agent will generate one question before doing anything:

```
DISPATCH BRIEF — [date] [time]
File: able-v7.html / admin.html / start.html / landing.html (pick one)
Scope: [one sentence — what the feature does from the user's perspective]
Acceptance criteria:
  - [specific thing that must be true when done — testable]
  - [specific thing that must be true when done — testable]
  - [specific thing that must be true when done — testable]
Design constraints:
  - Token: [CSS variable name] for any new colour
  - Mobile: no horizontal scroll at 375px, tap targets min 44px
  - Copy: read docs/systems/copy/SPEC.md before writing any UI text
Do not:
  - [anything the agent might mistakenly change or approach differently]
  - [e.g. "do not touch the Campaign HQ section"]
Playwright check: screenshot at 375px and 430px after build. Include screenshots in commit message body.
Parse check: run node -e "new Function(...)" after every JS edit.
Commit to branch: feat/[name]
Notify when done: Telegram (n8n workflow: dispatch-complete)
```

The Telegram notification setup:
- n8n workflow: triggered by a `git push` to any `feat/` branch
- Message template: "[Branch name] — [commit message]. Playwright: [pass/fail]. Parse check: [pass/fail]. Ready to review."
- Webhook: configured in `.claude/settings.json` as a post-commit hook
- The message arrives at `@jcuthbert_able` Telegram bot
- 07:15 filter: the n8n workflow is configured to batch any notifications between 23:00–07:00 and deliver them at 07:15 as a single message, not as a 3am ping

---

## Moment 2: The Agent That Never Asks

**What it is:** A Claude Code agent that receives a dispatch brief and completes the task — from first read to commit — without sending a single clarification question. The brief was specific enough. The agent had enough context. The work happened.

**Why it's 20/10:** Every question an agent asks mid-task is a context failure on the dispatcher's part. At 20/10, the dispatch brief template eliminates ambiguity before the agent starts. The agent becomes genuinely autonomous. The quality of the brief is the quality of the output.

**Exact implementation:**

The three categories of questions that agents ask, and the brief elements that eliminate each:

**Category 1: "What file should I edit?"**
Eliminated by: specifying the exact file in the brief. Not "the admin dashboard" — `admin.html`. Not "the profile page" — `able-v7.html`. One file, named.

**Category 2: "What should the copy say?"**
Eliminated by: a brief that includes either exact copy strings or a pointer to the copy spec. `"Read docs/systems/copy/SPEC.md before writing any UI text"` is sufficient. If you want specific strings, include them: `"Empty state copy: 'No shows yet. When you add one, fans on your page will see it straight away.'"`.

**Category 3: "I'm not sure if I should change X while I'm in here"**
Eliminated by: the "Do not" section of the brief. This is the most important field. Every time an agent question has required a clarification, the root cause has been an undeclared constraint. "Do not touch the Campaign HQ section." "Do not change any CSS variables — only add new ones." "Do not modify the existing fan sign-up form."

The brief template above handles all three categories. The dispatch habit that makes the agent system work as a second developer: spend 10 minutes writing the brief, save 60 minutes of back-and-forth. The 10 minutes is the work. The agent does the rest.

Additional reliability rule: for any task that touches more than one section of a file, the brief should include a "sequential steps" field in order. The agent should complete step 1, parse-check, then step 2, parse-check, then Playwright, then commit. This prevents the agent from doing all the work in one block and discovering a parse error that invalidates multiple changes at once.

---

## Moment 3: The Agent System Becomes a Second Developer

**What it is:** The moment the agent infrastructure shifts from "Claude Code helps with specific tasks" to "there are effectively two developers working on ABLE simultaneously" — one human, one agent, with clear lane ownership and a merge process that works.

**Why it's 20/10:** This is not just productivity. It is the structural reason ABLE can be built at a pace that a solo founder cannot sustain alone. The agent handles implementation of well-specified features. James handles architecture, copy approval, strategy, and the decisions that require taste. The combination is more capable than either alone.

**Exact implementation:**

The lane ownership system that makes parallel development work without collisions:

```
Agent lane (clearly agent-owned):
  - Implementation of specced features in admin.html and start.html
  - Documentation writing (SPEC.md, PATH-TO-10.md files)
  - CSS token additions and theme verification
  - Playwright smoke test execution and screenshot audit
  - Subagent research tasks (competitive analysis, API docs)

James lane (never delegated):
  - Architectural decisions (new data structures, new localStorage keys)
  - Copy approval (every text change against copy/SPEC.md)
  - Product decisions (what to build next)
  - Strategy and positioning
  - Any change that affects able-v7.html hero section or Campaign HQ

Merge protocol:
  - Agent always works on a feat/ branch
  - James reviews via `git diff main..feat/[name]` before merging
  - Merge only after Playwright screenshots reviewed
  - If a diff touches a James-lane file, it needs conversation before merge
```

The signal that the system has arrived at 20/10: James opens a branch diff, reads it, checks the Playwright screenshots, and merges — in under 10 minutes — because the work is correct and complete and the brief was specific. The question "did the agent do what I meant?" is replaced by "the brief said what I meant, so of course it did."

---

## The 20/10 test

You know the agent system has crossed from excellent to extraordinary when you review a Friday night commit on Saturday morning, merge it without a single change, and go make coffee — because the brief was right and the agent did exactly what it said it would.
