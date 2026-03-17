# AI Workflow — BEYOND 10
**The 20/10 push | Created: 2026-03-16**

---

## The 20/10 moment

Every Friday at 22:00, an automated agent runs. It reads four things: the git log from the past 7 days (what was actually built), STATUS.md (what the declared state of the product is), the 20-angle scores (where the current gaps are), and PostHog or localStorage analytics data (what users are actually doing).

It writes a 200-word brief. The brief lands in Telegram before James wakes up on Saturday morning.

The brief has three parts. What changed this week — specific (three commits merged, the social media BEYOND-10 doc was written, the partnerships approach to BIMM was specced). What it means — one sentence of interpretation, not reporting (the documentation work this week is outpacing the product work, which is the correct ratio at this stage). And one question.

The question is not generic. It is not "what should we build next?" It is the question the data is actually asking:

> "The analytics show fans are dropping off before the sign-up form. Is the form too far down the page, or is the copy not compelling enough?"

One question. Specific. Answerable. The brief ends there.

James wakes up on Saturday with a one-question agenda. Not a to-do list. Not a retrospective. A single, specific, answerable question that determines what the next week's work is focused on.

That is the AI workflow at 20/10. Not running tasks. Asking the right question.

---

## The exact specification

**Agent name:** `weekly-review`

**Trigger:** Cron job, every Friday at 22:00 local time. Runs via n8n on the Mac Studio.

**Inputs read:**
1. `git log --since="7 days ago" --oneline` — the commit list, not the diff
2. `docs/STATUS.md` — current declared product state
3. The most recent 20-angle scores file in `docs/systems/master-review/`
4. PostHog project API → `events?event=pageview&days=7` and `events?event=fan_signup&days=7` (or localStorage analytics if PostHog is not yet live)

**Processing logic:**

Step 1 — extract the commit messages and group by file touched. Not the raw git log. A processed summary: "5 commits — 3 to docs/systems (documentation work), 1 to able-v7.html (profile fix), 1 to admin.html (fan list)."

Step 2 — compare git activity to STATUS.md declared state. If STATUS.md says "active: able-v7.html" but no commits touched that file this week, flag the gap.

Step 3 — find the lowest score in the 20-angle review. Note the angle and the score.

Step 4 — compare the PostHog data pattern to the known product surface. If fan sign-up events are low relative to page views, the question is about the sign-up form. If page views are low overall, the question is about distribution. If both are reasonable, the question is about retention.

Step 5 — generate the 200-word brief using this template:

---

**ABLE — Weekly Review (w/e [date])**

**What changed:**
[2–3 bullet points, each one specific. Commit-level specificity. No fluff.]

**What it means:**
[One sentence. A real interpretation, not a summary. What is the pattern? Is the ratio of documentation to code work right? Is the lowest-score angle getting attention? Is this a good week or a drift week?]

**The question:**
[One sentence. The specific question that the data is asking. Not a strategy question. An actionable, answerable question that determines what Saturday morning's work is about.]

---

**Delivery:** Telegram message to James's personal bot. The message arrives Friday night. It is read Saturday morning, ideally before opening the laptop.

**What happens if inputs are unavailable:**
- If PostHog returns an error: use the note "PostHog unavailable this week — question is drawn from 20-angle score gaps only."
- If git log returns fewer than 3 commits: the brief notes "light week" — no fabrication, no invented analysis.
- If STATUS.md has not been updated in 14+ days: the brief flags this as the question. "STATUS.md was last updated [date]. Is the document still accurate?"

---

## The example brief in full

This is what the 20/10 brief looks like on a real week.

---

**ABLE — Weekly Review (w/e 2026-03-20)**

**What changed:**
- 6 documentation commits — BEYOND-10 files for all 5 systems, partnerships BIMM approach specced
- 1 product commit — admin.html fan list source badge fix
- No commits to able-v7.html or start.html

**What it means:**
Documentation-to-product ratio is 6:1 this week — which is right for the strategy phase, but able-v7.html hasn't been touched in 9 days. The product surface that fans actually see is static.

**The question:**
The fan sign-up form on able-v7.html has not been updated in 3 weeks and the last social post drove 47 profile views with 0 sign-ups. Is the form too far down the page, or is the copy not compelling enough?

---

That is the full brief. 120 words. One question. James reads it with coffee before opening the laptop and knows exactly what the morning is about.

---

## The discipline this requires

The agent is only as useful as the inputs it reads. Three things need to be maintained for this to work:

**1. Commit messages must be specific.** A commit message that says "updates" or "fixes" produces a useless git log. The agent reads commit messages as semantic data. The required format: `type(scope): description — reason`. If the commit message discipline from `AI-WORKFLOW.md` is followed, the agent gets clean data automatically.

**2. STATUS.md must be updated after every significant change.** The agent uses STATUS.md as the declared state. If STATUS.md says "active: able-v7.html" but the product hasn't changed in three weeks, the gap the agent surfaces is the right question. But if STATUS.md itself is stale, the gap is invisible.

**3. The Saturday question must be answered.** The agent produces one question per week. If James reads the question and does not act on it, the system breaks. Not technically — it keeps running. But the feedback loop is severed. The question needs to produce a decision: "Yes, we're fixing the form position" or "No, we're leaving it — here's why." That decision, even as a note in MEMORY.md, closes the loop.

---

## What competitors would have to become to match this

No music platform startup is running a weekly autonomous review agent that connects git history to user analytics to a single actionable question. They are either doing manual retrospectives (which take 90 minutes, happen irregularly, and produce long lists nobody executes) or they are not doing retrospectives at all.

To match this, a competitor would need: an AI workflow that is genuinely integrated into the development rhythm (not just a ChatGPT tab open), a data architecture that connects product state to usage data, and a discipline to act on the question the data asks rather than the question they wished it had asked. The last part is the hardest. Most founders use analytics to confirm their existing instincts, not to challenge them.

---

## Why this matters for ABLE's trajectory

The compounding problem in solo founder product development is disconnection — the gap between what is being built and what users are actually doing grows wider every week that no one is auditing the link between them. At a larger company, this is a product manager's job. At ABLE, it is either automated or it doesn't happen.

The weekly brief is not a reporting tool. It is a calibration tool. It keeps the work connected to the reality. One question per week, consistently answered, means ABLE's product development is responsive to evidence rather than assumption.

Over a year, that is 52 evidence-driven course corrections. Each one small. The compounding effect is a product that has stayed closer to what artists actually need than anything built without it.
