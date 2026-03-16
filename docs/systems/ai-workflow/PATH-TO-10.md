# ABLE — AI Workflow: Path to 10
**Version: 2.0 | Updated: 2026-03-16**

> Prioritised by impact-to-effort ratio. Telegram is P0. Everything else follows.

---

## Current score: 6.5 / 10

The foundation is solid. The feedback loop is not. That is the entire gap. Fix the feedback loop and the score jumps to 8.5 before anything complex is built.

---

## P0: Telegram setup — do this today, before anything else
**Score impact: 6.5 → 8.5**
**Total effort: under 2 hours**

This is the highest-leverage action in the entire system. Not building something. Not writing docs. Setting up a bot. 20 minutes. Every subsequent session is better because of it.

---

### Step 1: Create the bot (5 minutes)

1. Open Telegram on your phone
2. Search for `@BotFather` — blue verification tick
3. Tap Start, then send: `/newbot`
4. Name: `ABLE Operations`
5. Username: `able_ops_bot` (must end in `bot`)
6. BotFather replies with a token — looks like: `1234567890:ABCdef_ghijklmno-pqrst`
7. Do not close this screen yet

---

### Step 2: Get your chat ID (3 minutes)

1. Search for your new bot by username in Telegram
2. Send it any message — "hi" is fine
3. Open Terminal and run this (replace `{TOKEN}` with your bot token):

```bash
curl -s "https://api.telegram.org/bot{TOKEN}/getUpdates" | python3 -m json.tool
```

4. In the JSON output, find `"chat": { "id": 123456789 }` — that number is your chat ID
5. If the array is empty, send another message to the bot and retry immediately

---

### Step 3: Test the connection (2 minutes)

Run this (replace both placeholders):

```bash
curl -s -X POST "https://api.telegram.org/bot{TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": {CHAT_ID}, "text": "ABLE Operations: connection confirmed."}'
```

You should receive a Telegram message within 2 seconds. If not, check for extra spaces in the token.

---

### Step 4: Store credentials (5 minutes)

**In 1Password** — create a Login entry named "ABLE Ops Telegram Bot":
- Username: `able_ops_bot`
- Password: (the bot token)
- Notes: `Chat ID: [your chat ID]`

**In `~/.zshrc`** — add these two lines:

```bash
export TELEGRAM_BOT_TOKEN="your_token_here"
export TELEGRAM_CHAT_ID="your_chat_id_here"
```

Then add the reusable notification function:

```bash
notify_telegram() {
  local message="$1"
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -H "Content-Type: application/json" \
    -d "{\"chat_id\": ${TELEGRAM_CHAT_ID}, \"text\": \"$message\"}" > /dev/null
}
```

Run `source ~/.zshrc` to load it, then test: `notify_telegram "Test: shell function works."`

After Step 4 you are done. The bot is live. You receive Telegram messages from the command line.

---

### Step 5: Add to agent dispatch briefs (30 minutes, ongoing)

At the bottom of every background agent task brief, add:

```
When this task is complete:
1. Commit all changes with a descriptive message
2. Run this Playwright smoke test
3. Send this notification:

curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": ${TELEGRAM_CHAT_ID}, \"text\": \"Agent done: [TASK NAME]\n[X] commits. Playwright: [passed/failed].\nBranch: [branch]\"}"

If blocked before completion:
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": ${TELEGRAM_CHAT_ID}, \"text\": \"Blocked: [TASK NAME]\nReason: [reason]\nDecision needed: [question]\"}"
```

This is the working model change. You stop watching terminals. You start getting notified.

---

**Score after Steps 1–5: 6.5 → 8.5/10**

The jump is real because Telegram fixes angle 3 (notifications), unlocks angle 7 (parallel dispatch), and makes the daily operating rhythm viable.

---

## P0 continued: `/morning` slash command — create this today
**Score impact: included in the 8.5**
**Effort: 45 minutes**

The session start ritual. Solves cold session starts permanently.

### Create the directory and file

```bash
mkdir -p "/Users/jamescuthbert/Desktop/ABLE  MERGED/.claude/commands"
```

Then create `.claude/commands/morning.md` with the exact content specified below.

---

### Exact content of `.claude/commands/morning.md`

See the file at `/Users/jamescuthbert/Desktop/ABLE  MERGED/.claude/commands/morning.md` — written as part of this PATH-TO-10 update. The file is the command. Its presence in `.claude/commands/` makes `/morning` available in every Claude Code session.

**The command produces this output format — exactly:**

```
Last 24 hours: [X commits]
  [hash] [message]
  [hash] [message]

Current build stage: [one sentence from STATUS.md "Current build stage" section]

Uncommitted changes: [none / file list]

Today's P0: [first item from BUILD-READY-INDEX.md, or "nothing queued — check STATUS.md"]

---
Ready. What are we building?
```

One paragraph. 10 seconds to read. Session starts with full context.

---

## Phase 1: Discipline actions (no setup required)
**Score impact: 8.5 → 9.0**
**Effort: 5 minutes today, 5–10 minutes per week ongoing**

These cost nothing to implement. They cost discipline to maintain. Both are high-value.

### Sprint goal in MEMORY.md

Add this to MEMORY.md right now:

```
## Current sprint goal (week of 2026-03-16)
[One sentence: what is the build priority this week?]
```

Update it every Monday. Claude reads it at session start and orientates to the week's priority without being told.

### Commit message `Decision:` lines

Every commit where a non-trivial choice was made should include a `Decision:` line:

```
feat(admin): fan CRM — filter by source, star fans, export list

Added filter pills (source: all/ABLE/link/social), star toggle per fan,
export button (CSV, Phase 2). State stored in able_starred_fans.
Decision: deferred bulk email to Phase 2 — needs backend first.
```

No setup. No tool. Just the discipline to write it. Pays off every session from now on.

### Session end commitment

Before closing any session longer than 2 hours:
1. Git commit with a real message
2. One line in STATUS.md under "Last session" — what was built, what is next
3. If stepping away for 4+ hours: `notify_telegram "Session end: [what was built]. Next: [what's queued]."`

90 seconds. Makes the next session's `/morning` output accurate.

---

## Phase 2: Slash command set (1–2 hours, this week)
**Score impact: 9.0 → 9.5**

All six commands are created as markdown files in `.claude/commands/`:

| Command | File | Purpose |
|---|---|---|
| `/morning` | `morning.md` | Daily start ritual — P0, create first |
| `/status` | `status.md` | Two-sentence build state report |
| `/commit` | `commit.md` | Smart commit with format enforcement |
| `/scores` | `scores.md` | Table of all system scores from DESIGN-SPEC docs |
| `/review` | `review.md` | 20-angle review against current spec |
| `/agent` | `agent.md` | Dispatch brief format enforcer |

The `/morning` command is the priority. The others are refinements.

---

## Phase 3: n8n + daily digest (Phase 2, after 50 paying artists)
**Score impact: 9.5 → 10/10**

### Trigger

Do not build this before 50 paying artists. Under that threshold, the data volume produces noise, not signal.

### What to build

Three n8n workflows:

**1. Daily digest (08:00 every day)**

Queries Supabase for: new artists yesterday, new fans yesterday, total platform summary. Sends Telegram if anything notable happened. Silent if the day was quiet.

```
Morning. Yesterday:
- [N] new artists
- [N] new fans across [N] artists
- MRR: £[X]
- Errors: none
```

**2. Weekly business summary (Monday 09:00)**

```
Week of [date]:
MRR: £[X] (↑£[Y] from last week)
New paying artists: [N]
Churned: [N]
Top artist by fan capture: [name] ([X] fans this week)
```

**3. Supabase event triggers**

- New artist sign-up → Telegram immediately
- First fan for any artist → Telegram immediately
- Payment received → Telegram immediately
- Production error (Netlify function failure) → Telegram immediately

### n8n setup guide reference

Full setup in `docs/systems/ai-workflow/TELEGRAM-SETUP.md` §7.

---

## Score projections

| After | Actions completed | Score |
|---|---|---|
| Now | Nothing | 6.5/10 |
| Today | Telegram Steps 1–4 + `/morning` created | 8.0/10 |
| This week | Telegram Steps 1–5 (in all dispatches) + sprint goal + session end habit | 8.5/10 |
| Next 2 weeks | Full slash command set + commit discipline consistent | 9.0/10 |
| Month 2+ | n8n workflows live + 30 days of discipline proving the system | 9.5/10 |
| 30 days of consistency | System runs reliably, memory stays current, no session starts cold | 10/10 |

The jump from 8.5 to 10 is not a build problem. It is a consistency problem. The infrastructure at 8.5 is sufficient. The remaining 1.5 points are earned by proving the system works reliably over time — sessions always start with `/morning`, commits always have real messages, STATUS.md is always current. That is 30 days of discipline, not another afternoon of setup.

---

## The single most important thing to do right now

Set up Telegram. Steps 1–4. 20 minutes. This afternoon.

Then create `.claude/commands/morning.md`. 45 minutes.

Those two actions change how every future session starts and ends. Nothing else in this list matters more.
