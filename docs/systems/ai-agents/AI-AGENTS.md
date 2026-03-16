# ABLE — AI Agent Infrastructure
**Version: 1.0 | Written: 2026-03-16 | Author: James Cuthbert**
**Status: Active — primary authority for all AI agent decisions**

---

## What this document is

ABLE runs on two parallel AI infrastructures:

1. **Development agents** — the stack that builds and maintains the product (Claude Code, Playwright MCP, worktree patterns)
2. **Business operations agents** — the stack that runs the company (n8n, Ollama, Supabase Edge Functions, PostHog)

This document specifies both. It also defines the "agent-native parity" principle: every UI action a human can take must also be triggerable programmatically. ABLE is not just AI-assisted — it is designed to be AI-operable.

---

## Section 1: Development Agents

### Claude Code — primary development agent

**Role:** Building and maintaining all ABLE HTML/CSS/JS files.

**Configuration:**
- `.claude/settings.json` — MCP servers and permission rules
- Playwright MCP configured for visual verification
- Permissions: auto-allow git, read, and node operations; deny `rm -rf`, force-push, `reset --hard`

**Capabilities:**
- File editing (direct HTML/CSS/JS, no build pipeline)
- Git operations (commit, branch, status, diff)
- Playwright screenshot verification at multiple viewports
- bash execution for parse-checking JS blocks
- Subagent dispatch for parallel tasks

**What Claude Code owns:**
- All file edits in `able-v7.html`, `admin.html`, `start.html`, `landing.html`, `fan.html`
- Shared utilities in `shared/able.js`, `shared/style.css`
- All documentation in `docs/systems/`

**What Claude Code does not replace:**
- Architectural decisions (James)
- Copy approval (James — every text change must be reviewed against `docs/systems/copy/SPEC.md`)
- Strategy decisions (James)
- Decisions about what to build next (James, informed by artist calls)

**Cost:** ~£60/month at current usage. The highest-ROI line item in the stack.

---

### Playwright MCP — visual verification agent

**Role:** Screenshots and interaction testing after every significant build section.

**When to invoke:**
- After every section of code change (not just at the end of a session)
- After any CSS change that touches themes, layout, or spacing
- After any new component is added
- When something "looks right" but needs verification at 375px, 430px, and 768px

**Viewports to check:**
- 375px (iPhone SE — minimum supported)
- 430px (iPhone 15 Pro — primary design target)
- 768px (iPad / large phone landscape)

**What to look for:**
- Horizontal scroll at 375px (never acceptable)
- Tap targets under 44px (never acceptable)
- Theme breakage (test Dark → Light → Glass → Contrast in sequence)
- Content overflow / text truncation that shouldn't happen
- CTA zones are intact (Hero max 2, Quick Actions max 6, Section Actions max 2)

**Process spec:** See `docs/process/PROCESS.md` Stage 8.4 for the full Playwright smoke test protocol.

**Tab naming:** Always set `document.title` to reflect the current task so open tabs are identifiable. Format: `"ABLE — [task description] — [viewport]"`

---

### Parallel agent pattern

Two features can be built simultaneously in isolated git worktrees.

**Structure:**
- Agent 1: artist-facing pages (`able-v7.html`, `landing.html`, `fan.html`)
- Agent 2: admin and onboarding (`admin.html`, `start.html`)

**Rules:**
- Each agent works in its own worktree (`git worktree add`)
- No shared file state between worktrees during active development
- James reviews both outputs before merging
- Merge order: admin first (if it contains shared data/localStorage changes), then profile

**When to use it:**
- Two non-dependent features are clearly scoped
- Each feature has a clear file boundary
- James has capacity to review both outputs

**When not to use it:**
- Tasks requiring sequential decisions (e.g., design the data structure, then build it)
- Tasks touching the same file from both agents
- When the outcome of Agent 1 changes what Agent 2 should do

**Protocol:** See `docs/superpowers/` skills for dispatching parallel agents.

---

### Subagent dispatch pattern

Used for parallel research, parallel documentation, and parallel code review.

**Use for:**
- Competitive analysis (multiple competitors researched simultaneously)
- Documentation writing (multiple spec sections drafted in parallel)
- Code review (multiple files reviewed simultaneously for a given concern)
- Screenshot audits of multiple pages simultaneously

**Do not use for:**
- Tasks with shared file state
- Tasks requiring sequential decision-making
- Anything where Agent 2's scope depends on what Agent 1 found

---

### Parse-check protocol

Every JS block edited must pass a parse check before commit:

```bash
node -e "new Function(require('fs').readFileSync('able-v7.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1])"
```

If it throws, the commit does not happen. No exceptions.

---

## Section 2: Business Operations Agents (n8n + Ollama)

ABLE's operational automation runs on n8n (self-hosted) with Ollama for local LLM tasks. This keeps sensitive business data off third-party AI APIs and keeps the marginal cost of automation near zero.

**Infrastructure:** n8n on Mac Studio. Ollama on Mac Studio (128GB unified memory — see Section 6 for model selection).

---

### Workflow 1: New artist sign-up sequence

**Trigger:** Supabase `INSERT` on `profiles` table

**Steps:**
1. Wait 30 minutes (let the artist explore before the first contact)
2. Send welcome email via Resend
   - Subject: "You're on ABLE. Here's what to do first."
   - Personalised based on import source:
     - Spotify import: "We pulled in your releases — your page is already showing your music."
     - Linktree import: "We've kept your links — now they work harder."
     - Scratch: "Let's get your page set up. It takes 5 minutes."
3. Log to PostHog: `artist_signup_email_sent` event

**Day 1 email goal:** Get the artist back to their page within 24 hours. One clear CTA. No features list.

**Day 3 — if no CTA has been set:**
- Trigger: Supabase query (n8n scheduled) checks `profiles` where `cta_count = 0` and `created_at < now - 3 days`
- Ollama Phi-4 generates personalised nudge copy based on: artist name, genre (if set), source
- Email sent via Resend: "Your page is live but there's nothing for fans to do yet."
- One CTA: "Add your first link — 30 seconds."

**Day 7 — weekly page summary:**
- Views, fan sign-ups, CTA clicks from the past 7 days
- Plain numbers, no spin
- If all zeros: "Your page had no visitors this week. Share the link — that's the only way to change this." (direct, not discouraging)

---

### Workflow 2: Fan sign-up notification to artist

**Trigger:** Supabase `INSERT` on `fans` table

**Real-time mode (default for Artist tier):**
- Email to artist within 60 seconds
- Subject: "Someone just signed up to hear from you"
- Body: "[Name] signed up" (if name provided) or "A new fan signed up" (if email only)
- One line: "You now have [X] fans on your list."
- No marketing copy. Just the fact.

**Batch mode (artist can switch to this in preferences):**
- n8n: daily 08:00 summary
- "You had [X] fan sign-ups yesterday. Total: [Y]."
- Triggered only if count > 0 (no email on dead days)

**What this workflow is for:** The moment an artist gets their first fan sign-up is the "aha" moment of the product. The notification must feel significant without being hyperbolic. One new fan is genuinely meaningful. Treat it that way.

---

### Workflow 3: Churn prediction and intervention

**Trigger:** n8n scheduled check, daily 09:00

**Logic:**
1. Query Supabase: artists with `last_login < now - 14 days`
2. For Artist tier accounts: Ollama generates personalised re-engagement email
   - Input to Ollama: artist name, last login date, last activity (profile view count from last 7 days), current page state
   - Prompt: "Write a short re-engagement email (under 100 words) for an independent musician who hasn't logged into their artist dashboard for 14 days. Tone: warm, direct, no jargon. Don't beg. Reference what they're missing, not what they're doing wrong."
   - Output: email draft → reviewed by n8n template → sent via Resend
3. For Artist Pro tier: flag to James/Community Manager in Discord (personal touch, not automated)
4. At 30 days no login → cancellation risk flag
   - Automated discount offer: "Stay for another month at half price — £4.50 instead of £9."
   - This is a one-time offer per account, tracked in Supabase

**What to measure:** Open rate and re-activation rate for these emails. If open rate < 20%, the subject lines need work. If re-activation rate < 5%, the 14-day trigger is too early.

---

### Workflow 4: Weekly financial digest

**Trigger:** Every Monday, 08:00 UK time

**Sources:**
- FreeAgent API: MRR, new subscriptions, cancellations, outstanding invoices
- Stripe API: payment success rate, failed charges, refunds

**Processing:**
- Ollama DeepSeek-R1: generates plain-English summary
- Prompt: "You are summarising a weekly financial snapshot for a solo SaaS founder. Be direct, no padding, no encouragement. Just the numbers and what they mean. If something needs attention, say so."

**Output format (Discord message to James):**
```
Week of [date]
MRR: £X (↑£Y vs last week)
New paying artists: X
Churned: X
Net: ±X
Failed charges: X (needs attention if > 3)
Outstanding invoices: £X
```

No graphs, no dashboard links. Just the information. James can go deeper in FreeAgent if needed.

---

### Workflow 5: Market monitoring

**Trigger:** Daily, 07:00 UK time

**Data sources:**
- Alpha Vantage API: S&P500, BTC, ETH, Gold, GBP/USD
- Compared against threshold values stored in n8n (James sets these)

**Logic:**
- Silent if nothing is outside threshold
- Message to James on Discord if a threshold is crossed
- Ollama DeepSeek-R1: single-sentence context — "BTC is down 8% in 24 hours, currently at $X."

**What this is not:** Investment advice or trading signals. It is a monitoring system so James isn't caught off-guard by market moves that affect personal financial planning.

**Threshold examples (James adjusts):**
- S&P500: ±3% in 24 hours
- BTC: ±10% in 24 hours
- GBP/USD: ±2% in 24 hours (relevant to ABLE's GBP-first pricing)

---

### Workflow 6: Content scheduling helper

**Trigger:** Every Sunday, 09:00

**Input to Ollama Phi-4:**
- New artists who signed up in the past 7 days (names, genres)
- Any releases flagged as "live" in the past 7 days
- Any milestones reached (50 artists, 1,000 total fans, etc.) — from Supabase query

**Output:** Notion page with 7 post draft ideas:
- 3 artist spotlight ideas (based on recent signups)
- 2 product education posts (based on features artists may not be using)
- 1 milestone/social proof post (if applicable)
- 1 "behind the product" post (James's perspective — always the highest-engagement format)

**Important:** These are draft ideas, not final copy. James or the Community Manager reviews and rewrites before scheduling. Ollama generates the angle, not the voice.

**Why Notion and not directly to a scheduling tool:** Because every piece of content needs a human review before it goes out. The bottleneck should be review quality, not idea generation.

---

## Section 3: AI Copy Agents (Claude API via Netlify Functions)

### `ai-copy.js` — artist bio generation

**Trigger:** Artist clicks "Suggest bio" in `admin.html`

**Input:**
- `artistName` (string)
- `genre` (string, from profile)
- `vibe` (string array, from wizard)
- `keyReleases` (array of track/album titles, optional)
- `homeTown` (string, optional)

**Prompt structure:**
```
You are writing an artist bio for a page called ABLE — a platform for independent musicians.
The bio appears on the artist's public profile page. It is written in first person.
Rules: under 80 words. No superlatives. No "rising star", "passionate", "journey". Direct and specific.
Write 3 options that feel different from each other — one factual, one more personal, one more stylistic.
Artist: [name]. Genre: [genre]. Vibe: [vibe]. Releases: [releases]. Town: [hometown].
```

**Output:** 3 bio options displayed inline in `admin.html`. Artist selects one or edits directly.

**Model:** Claude Haiku (speed + cost: ~£0.02 per call)

**Copy voice check:** Before any prompt change, re-read `docs/systems/copy/SPEC.md`. The AI must write in ABLE's register even when the artist will edit it.

---

### Phase 2 copy agents (not built yet)

| Agent | Model | Task | Trigger |
|---|---|---|---|
| Press release generator | Claude Sonnet | Draft a release-day press release | Artist in "live" page state |
| Lyric sheet formatter | Claude Haiku | Format pasted lyrics to consistent structure | Admin.html lyric section |
| Sync brief matching | Claude Opus | Match artist catalogue to sync brief keywords | Sync section (Phase 2 feature) |
| Gig description writer | Claude Haiku | Write event description from venue + date | Shows section in admin |

**When to build these:** When the artist base reaches 200+ active artists. Until then, the bio suggestion is the only copy agent that needs to exist.

---

## Section 4: Data and Analytics Agents

### PostHog (self-hosted for privacy)

**Why self-hosted:** Artist audience data — even anonymised page view data — should not leave ABLE's infrastructure. PostHog's open-source version running on a VPS costs ~£15/month and keeps data fully owned.

**Events tracked:**

| Event | Properties | Fired by |
|---|---|---|
| `page_view` | `artistId`, `source`, `theme`, `pageState` | `able-v7.html` on load |
| `cta_tap` | `artistId`, `ctaLabel`, `ctaType`, `zone`, `source` | `able-v7.html` on click |
| `fan_signup` | `artistId`, `source`, `hasName`, `hasEmail` | `able-v7.html` on submit |
| `profile_edit` | `field`, `artistId` | `admin.html` on save |
| `wizard_complete` | `artistId`, `importSource`, `timeToComplete` | `start.html` on finish |
| `page_state_change` | `artistId`, `from`, `to` | `admin.html` on toggle |

**Custom metric — fan capture rate:**
```
fan_capture_rate = (fan_signups / page_views) × 100
```
Tracked per artist. The single most important performance metric for an individual profile.

**Weekly automated report:**
- n8n queries PostHog API every Monday
- Top 10 artists by fan capture rate (anonymised for community sharing if permission granted)
- Platform-wide stats: total page views, total signups, median fan capture rate

---

### Supabase Edge Functions (Phase 2)

These are not yet built. They go on the roadmap when Supabase backend is live.

**Fan attribution (Phase 2):**
- When a fan signs up, store which CTA triggered the conversion (`fans.conversion_cta`)
- This allows per-CTA conversion rate analysis
- Artists can see: "Pre-save got 23 signups. Spotify link got 2."

**Release performance correlation (Phase 2):**
- Compare fan sign-up rate in 7 days pre-release vs 7 days post-release
- Surface this in admin.html: "Your last release brought in 34 new fans in its first week."

**Gig mode performance (Phase 2):**
- Fan sign-ups and CTA taps during gig mode periods vs profile mode
- This quantifies the value of the page state system with real artist data

---

## Section 5: Agent-native parity principle

Every ABLE feature must be accessible to an AI agent. This is not a future consideration — it must be built into every feature from the start.

### The rule

> If a human can do it in the UI, an AI agent can do it programmatically.

### What this means in practice

**UI actions:** Every button, form submission, and toggle must have a Playwright-accessible selector and a Supabase API equivalent.

**Data:** The localStorage schema is fully documented (see `docs/systems/data-architecture/SPEC.md`). An AI agent with access to this schema can write a complete profile directly, without touching the UI.

**Admin actions with API equivalents required:**
- Update artist bio → `PATCH /profiles/:id`
- Add a show → `POST /events`
- Change page state → `PATCH /profiles/:id` with `stateOverride`
- Broadcast email to fans → `POST /broadcasts`

**Playwright smoke tests must pass headlessly.** If a feature only works with a real human mouse, it is not finished.

### Why this matters

The same infrastructure that lets Playwright verify the UI lets a future internal automation tool manage profiles, run experiments, and onboard artists programmatically. Agent-native parity is not an engineering luxury — it is the scalability foundation.

---

## Section 6: Local LLM Infrastructure

James's Mac Studio (128GB unified memory) runs Ollama for all automation tasks. This is the correct architecture: routine business operations run locally (free, private, fast), complex creative and development tasks run on Claude API (higher quality, worth the cost).

### Models installed

| Model | Size | Best for |
|---|---|---|
| DeepSeek-R1 70B | ~40GB | Deep reasoning, strategy analysis, financial summaries, complex multi-step tasks |
| Llama 3.3 70B | ~40GB | General writing, email drafts, content ideas, fast iteration |
| Qwen2.5-Coder 32B | ~20GB | Routine code generation, script writing, cheaper than Claude for simple code tasks |
| Phi-4 14B | ~8GB | Fast lightweight tasks — email drafts, quick lookups, always-on monitoring workflows |
| Llama 3.2 3B | ~2GB | Ultra-fast classification and routing — "is this a support question or a feature request?" |

### Decision matrix: local vs API

| Task | Use | Reason |
|---|---|---|
| Automated email drafts | Local (Phi-4 or Llama 3.3) | Volume makes API cost significant; quality threshold is met locally |
| Weekly financial digest | Local (DeepSeek-R1) | Sensitive data should not leave local infrastructure |
| Market monitoring | Local (DeepSeek-R1) | Private financial context |
| Artist bio generation | Claude API (Haiku) | Quality bar is higher; artist will see this output directly |
| Press release (Phase 2) | Claude API (Sonnet) | High-quality creative output for a high-stakes context |
| New feature development | Claude Code | Context window, codebase access, and MCP tools make it irreplaceable |
| Routine code edits | Local (Qwen2.5-Coder) | When the task is mechanical (rename a variable, fix a typo), local is faster |
| Architecture decisions | Claude Code + James | AI provides options; James decides |

### Running Ollama

Ollama runs as a background service on Mac Studio. n8n connects via `http://localhost:11434`.

Pulling a model:
```bash
ollama pull deepseek-r1:70b
ollama pull llama3.3:70b
ollama pull qwen2.5-coder:32b
ollama pull phi4:14b
ollama pull llama3.2:3b
```

Checking running models:
```bash
ollama list
```

### Cost structure

At current usage levels:
- Claude Code: ~£60/month
- Claude API (copy agents): ~£5/month (low volume)
- Ollama: £0/month (local)
- n8n (self-hosted): ~£10/month (VPS or Mac Studio power)
- PostHog (self-hosted): ~£15/month (VPS)
- Total AI infrastructure: ~£90/month

This is a remarkably low cost for a fully automated business operations stack. The Mac Studio's 128GB means it can run 70B models without compromises that would affect output quality.

---

## Section 7: Agent operation log

Every significant automated action should be logged. Not for debugging alone — for understanding.

**Where to log:**
- PostHog: user-facing events (page views, CTA taps, fan signups)
- Supabase `agent_log` table (Phase 2): automated business actions (emails sent, workflows triggered, churn flags raised)
- n8n execution history: workflow runs, errors, latency

**What to log for each automated email:**
- `workflow_id` (which n8n workflow)
- `artist_id`
- `email_type` (welcome, nudge, weekly_summary, churn_intervention)
- `model_used` (if Ollama)
- `sent_at`
- `opened_at` (from Resend webhook, Phase 2)

**Review cadence:** James reviews the n8n execution log weekly. If a workflow is failing silently, it is worse than no automation at all — a failed re-engagement email is an artist who didn't hear from ABLE when they should have.

---

## Appendix: Agent stack summary

| Agent | Type | Runs on | Cost/month | Status |
|---|---|---|---|---|
| Claude Code | Development | Claude API | ~£60 | Active |
| Playwright MCP | Visual verification | Local | £0 | Active |
| n8n | Workflow automation | Mac Studio | ~£10 | Active (partial) |
| Ollama | Local LLM | Mac Studio | £0 | Active |
| Claude API (Haiku) | Copy generation | Claude API | ~£5 | Partial (bio only) |
| PostHog | Analytics | Self-hosted VPS | ~£15 | Planned |
| Supabase Edge Functions | Data agents | Supabase | ~£0–5 | Phase 2 |
