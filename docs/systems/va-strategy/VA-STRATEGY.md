# ABLE — Virtual Assistant Strategy
**Version: 1.0 | Written: 2026-03-16 | Status: Authoritative**

> This document defines the AI VA layer that runs on James's Mac Studio and handles routine tasks automatically, freeing judgment capacity for the work that actually requires a human.

---

## Part 1: The Core Concept

When you have the Mac Studio M4 Max with 128GB unified memory, you can run 70B parameter local LLMs at near-zero cost, 24 hours a day. That changes the economics of delegation entirely.

The goal is not to automate everything. The goal is to automate everything that doesn't require irreplaceable human judgment — so that the hours you spend thinking are spent on decisions, relationships, and strategy rather than on drafting, summarising, and classifying.

**The operating principle:** James talks to his AI VA for anything routine. The VA handles first drafts, research synthesis, data summaries, monitoring, and classifications. James reviews, edits, and decides. The VA never decides. James never writes a first draft if the VA can write a good enough one.

This compresses the execution loop. A task that used to take 45 minutes (read → think → draft → edit → send) becomes 8 minutes (prompt → read output → edit → send).

### What the VA is not

- Not a replacement for judgment on strategy, product decisions, or relationship management
- Not an autonomous agent that acts without James reviewing the output
- Not a single tool — it is a layered stack where different models handle different task types
- Not something you build once and leave — it needs periodic review as models improve

---

## Part 2: The VA Stack

This is the full hardware and software configuration for when the Mac Studio M4 Max arrives.

### Hardware foundation

**Mac Studio M4 Max — 128GB unified memory**
- Runs 70B models at usable inference speeds (approx. 8-15 tokens/second for DeepSeek-R1 70B)
- 24/7 operation — no cloud costs, no API limits, no latency for external calls
- Available on the home network from any device (phone, iPad, laptop)
- Total cost of running locally vs. Claude API at equivalent usage volume: 90%+ cheaper at scale

### The local LLM layer — Ollama

Ollama manages local model installation, updates, and API serving.

**Install:** `brew install ollama`

**Models to load at setup:**

| Model | Size | Role | When to use |
|---|---|---|---|
| `deepseek-r1:70b` | ~40GB | The "thinking" model | Complex tasks, strategy questions, research synthesis, multi-step analysis |
| `phi4:14b` | ~8GB | The "doing" model | Fast drafts, email responses, summaries, classifications |
| `llama3.2:3b` | ~2GB | The "monitoring" model | Always-on triggers, fast classifications, webhook routing |

All three fit in 128GB with room to spare for OS and applications.

**Ollama serve command:** `ollama serve` — starts the API server at `localhost:11434`. Set this as a launch daemon so it starts on boot.

### The interface — Open WebUI

Open WebUI is a browser-based chat interface that talks to the Ollama API. It looks and feels like ChatGPT but runs entirely on your machine.

**Install:**
```bash
docker run -d -p 3000:80 \
  -v open-webui:/app/backend/data \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

**Access:** `http://localhost:3000` — or from any device on the home network via `http://[mac-studio-ip]:3000`

**Key features to configure at setup:**
- Create separate "Workspaces" for ABLE tasks, personal tasks, and market monitoring
- Pre-load system prompts (see Part 4 for the prompt library)
- Enable conversation history — unlike Claude Code, conversations persist indefinitely
- Set up model routing: different default models for different workspaces

### The orchestration layer — n8n

n8n is the workflow engine that connects the AI layer to everything else. It receives webhooks, routes to the right model, and sends outputs to the right place.

**Install (self-hosted):**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Access:** `http://localhost:5678`

n8n connects:
- Supabase (new artist sign-ups, support ticket webhooks)
- Stripe (payment events)
- Gmail (incoming email routing)
- Telegram (outgoing notifications to James)
- Ollama API (sending tasks to the local LLMs)
- Resend/Loops (triggering email sequences)

---

## Part 3: VA Use Cases — What to Delegate

Organised by task category, model to use, and how to think about review.

---

### Category 1: Communication drafts

**Model:** Phi-4 14B (fast, good at tone-matching)

**Use cases:**
- "Draft a DM to [artist] who commented on [post]"
- "Draft a response to this support email: [paste email]"
- "Write 3 Instagram captions for a post about [topic]"
- "Draft an Abler outreach email for this music producer: [paste their bio]"
- "Write a follow-up to the investor I spoke to on [date], referencing [what we discussed]"

**How to review:**
Read it once. Ask: does this sound like me? If not, tell the VA "more direct" or "less formal" or "shorter." Two rounds of editing maximum — if it's taking more than that, write it yourself.

**Time saving:** 15-25 minutes per draft → 5-8 minutes with VA draft.

**What the VA consistently gets wrong here:** tone drift toward corporate language and vague encouragements. Edit these out. The ABLE copy philosophy applies even in personal communications.

---

### Category 2: Research synthesis

**Model:** DeepSeek-R1 70B (the thinking model — takes longer but produces structured analysis)

**Use cases:**
- "Summarise these 5 competitor announcements and tell me what they mean for ABLE"
- "Read this 40-page investor report on the creator economy and give me the 5 most relevant insights for a music-focused platform"
- "Analyse these 30 artist DMs and identify the 3 most common underlying frustrations"
- "What does the literature say about churn in SaaS for creator tools? Give me the 5 strongest findings."

**How to review:**
Read the synthesis critically. Ask: is this a reasonable interpretation of the source? Are there important caveats being omitted? The model will sometimes be overconfident about ambiguous signals. Flag these to yourself before acting.

**Time saving:** 2-3 hours of reading → 20-30 minutes of prompting + reviewing synthesis.

---

### Category 3: Data analysis

**Model:** DeepSeek-R1 70B

**Use cases:**
- "Here's this week's PostHog data [paste]. What's the most important single thing to act on?"
- "MRR this month: £X. Last month: £Y. Artist count: Z. Churn: N. What does this say?"
- "Here are 20 fan sign-up events from the last week. What are the patterns?"
- "These are the 5 features artists have asked for most in support emails this month. Rank them by likely retention impact."

**How to review:**
The model is good at identifying patterns. It is less good at knowing what's actually important for your specific business context. Always apply the filter: "does this analysis account for [context I know that the model doesn't]?"

**Time saving:** 30-60 minutes of manual analysis → 5-10 minutes of prompting + a quick reality check.

---

### Category 4: First-pass strategy

**Model:** DeepSeek-R1 70B — then always review with Claude Code for anything that becomes a decision

**Use cases:**
- "I'm thinking about adding [feature]. What are the 5 strongest arguments for and against, from the perspective of an independent artist platform?"
- "Draft an angel investor update email based on these metrics: [metrics]. Keep it under 300 words."
- "What should I prioritise this week given these inputs: [list]? Argue the case for each option."

**CRITICAL RULE:** The VA provides analysis. You make the decision. Never implement a product change, financial decision, or strategic pivot because a local LLM told you to. Use it to stress-test your thinking, not to replace it.

When to use Claude Code vs. local VA:
- Local VA (DeepSeek-R1): first-pass thinking, quick drafts, data synthesis
- Claude Code: complex multi-file product decisions, architectural questions, code review
- Both: run the same strategy question through both and compare. Disagreement between them is useful signal.

**Time saving:** 45-90 minutes of structured thinking → 20-30 minutes with a VA-generated framework to react to.

---

### Category 5: Monitoring and alerts

**Model:** Llama 3.2 3B + n8n (always-on, triggered by webhooks)

These run automatically without any prompt from James.

**What to monitor:**

| Trigger | Source | Action |
|---|---|---|
| New artist signs up | Supabase webhook → n8n | n8n fires welcome email sequence via Loops |
| Artist hasn't logged in for 14 days | Supabase scheduled query → n8n | Ollama Phi-4 generates personalised re-engagement message → sent via Loops |
| New support ticket (in-app "Report an issue") | Supabase webhook → n8n | Telegram message to James: "New P[X] ticket: [summary]" |
| Payment fails | Stripe webhook → n8n | Telegram alert + automated retry email to artist |
| Page views spike (3x daily average) | PostHog webhook → n8n | Telegram: "Your page traffic spiked — [artist name] had [X] views in the last hour" |
| New artist with suspicious profile data | Supabase webhook → Llama 3B classification | Flag to James if: company-style name, "Records" or "Music Group" in bio, bulk import patterns |
| MRR drops more than 10% in a week | Stripe → n8n scheduled query | Telegram: "MRR alert: down £X this week. Current: £Y. Worth reviewing." |

**The philosophy on monitoring:** You get signal, not noise. If something is worth noticing, James gets a Telegram message. If it's not actionable, it doesn't generate a notification.

---

## Part 4: VA Prompt Library

These are the 20 core prompts, ready to load into Open WebUI as saved commands. Each is designed to produce usable output on the first pass.

---

### 1. Instagram caption generator (ABLE voice)

**Model:** Phi-4 14B
**System prompt:**
```
You write Instagram captions for James Cuthbert, the founder of ABLE — a platform for independent musicians. ABLE's voice is direct, honest, and warm without being corporate. No exclamation marks. No hashtag lists. Captions are 2-4 sentences. They sound like a real person talking to other real people, not a brand talking at an audience. Never use: "excited to share", "can't wait to", "game-changing", "incredible journey", or any marketing language. Reference the artist community, the craft of music-making, or the act of building something real.
```
**User prompt template:**
```
Write 3 Instagram captions for a post about [TOPIC]. The tone should be [casual/reflective/direct]. Keep them under 150 characters each.
```

---

### 2. Support ticket first response

**Model:** Phi-4 14B
**System prompt:**
```
You are drafting a first-response support email for ABLE, a platform for independent musicians. ABLE's support voice: human, direct, no corporate language. Always acknowledge the specific issue. Never say "Happy to help!", "Great question!", or "I understand your frustration." Start by naming what the issue is. Be specific about what the next step is and when it will happen. Sign off warmly but briefly. If you need information from them to resolve the issue, ask for exactly the information needed — no more.
```
**User prompt template:**
```
Support ticket received via [channel]. Issue: [paste ticket text].
Draft a first response. Priority: [P0/P1/P2/P3].
```

---

### 3. Weekly business digest

**Model:** DeepSeek-R1 70B
**System prompt:**
```
You are James's business analyst. You receive weekly operational data about ABLE and produce a plain-English digest. Format: 5 bullet points maximum. Each bullet covers one domain: revenue, growth, product, support, and one wildcard observation. No tables. No fluff. Write as though talking to someone who knows the business well and just wants the important signal from the noise.
```
**User prompt template:**
```
Here is this week's data:

MRR: £[X] (last week: £[Y])
New artist sign-ups: [N]
Paying artist count: [N]
Fan sign-ups across all artist pages: [N]
Support tickets opened: [N], closed: [N]
Notable events: [list anything significant]

Write the weekly digest.
```

---

### 4. Artist outreach DM

**Model:** Phi-4 14B
**System prompt:**
```
You write personalised DMs for James to send to independent artists, inviting them to try ABLE. The DM must: reference something specific about that artist (their music, a recent post, their genre, their audience size), be under 100 words, not use the word "platform", not sound like an automated message, not start with "Hi", and not make promises you can't keep. The goal is a real conversation, not a conversion. End with a genuine question or invitation, not a call-to-action.
```
**User prompt template:**
```
Artist name: [name]
Their genre/vibe: [description]
Something specific about them: [reference to their music, posts, or recent activity]
Where I'll send this: [Instagram DM / Twitter DM]

Write the outreach message.
```

---

### 5. Feature debate (for vs against)

**Model:** DeepSeek-R1 70B
**System prompt:**
```
You are a product strategist advising on ABLE, a link-in-bio and fan relationship platform for independent musicians. When asked to evaluate a feature, produce a structured analysis: 5 arguments FOR (strongest case), 5 arguments AGAINST (strongest objections), and a one-paragraph recommendation. Do not be neutral — make a clear recommendation with reasoning. You are a peer advisor, not a consultant hedging their bets.
```
**User prompt template:**
```
Feature under consideration: [feature description]
Context: [why this is being considered]
Current artist count: [N]
Current MRR: £[X]

Should ABLE build this? Argue both sides and give a clear recommendation.
```

---

### 6. Investor update email

**Model:** DeepSeek-R1 70B
**System prompt:**
```
You write investor update emails for early-stage founders. The email should be: under 300 words, honest (including what's not working), specific about metrics, and personal rather than corporate. Do not use the words "traction", "momentum", "exciting", "journey", or "passionate." The tone is a confident founder updating a trusted advisor — not a pitch, not a report, not a press release.
```
**User prompt template:**
```
Period: [month/quarter]
MRR: £[X] (change from last period: [+/-£Y])
Artist count: [N paying, N total]
Key win: [what went well]
Key challenge: [what didn't]
What I'm focused on next: [1-2 things]
Any asks of the investor: [optional]

Write the investor update.
```

---

### 7. Content idea generator

**Model:** Phi-4 14B
**System prompt:**
```
You generate social media and content ideas for James Cuthbert, who is building ABLE while managing a C5/C6 disk injury, transitioning to a nomadic lifestyle, and documenting what it's like to build a business using AI tools. Content themes: honest founder journey, independent music scene, building in public, remote working, AI as a leverage tool, health and longevity. No "tips" listicles. No motivational quotes. Ideas should be specific and original, not derivative of what every founder on Twitter posts.
```
**User prompt template:**
```
Generate 10 content ideas for [platform: Twitter/Instagram/Substack].
Format: one sentence per idea. Include the hook/angle, not just the topic.
```

---

### 8. Churn re-engagement message

**Model:** Phi-4 14B
**System prompt:**
```
You write re-engagement messages for artists who haven't logged into their ABLE dashboard in 14+ days. The message should: reference something real about their account (page views, fan count), not be desperate or pushy, feel like a check-in not a retention alert, and include one specific, actionable thing they could do. Under 100 words. No subject line needed — this will be part of an automated email sequence.
```
**User prompt template:**
```
Artist name: [first name]
Days since last login: [N]
Their page views in the last 14 days: [N]
Their fan count: [N]
Last action they took: [set CTA / added show / changed bio / etc]

Write the re-engagement message.
```

---

### 9. Competitor analysis brief

**Model:** DeepSeek-R1 70B
**System prompt:**
```
You analyse competitors to ABLE — link-in-bio tools, fan relationship platforms, and music artist pages. When given competitor information, produce: what they do well, what they do poorly, what ABLE could learn from them, and what ABLE should not copy. Be specific and critical — not diplomatic. ABLE's differentiation is: campaign state system (page shifts based on what the artist is doing right now), owned fan data (not held hostage to the platform), direct artist voice (no algorithmic layer). Evaluate competitors against these specifically.
```
**User prompt template:**
```
Competitor: [name]
Recent news/updates: [paste any relevant information]
Their main angle: [what they claim to be]

Analyse this competitor through the ABLE lens.
```

---

### 10. Artist onboarding call prep

**Model:** Phi-4 14B
**System prompt:**
```
You prepare James for 20-minute onboarding calls with artists who are trying ABLE. Given information about the artist, produce: 3 things to ask them (genuine curiosity, not leading questions), 2 things to show them that will resonate with their specific situation, and 1 potential objection they might raise with a direct response. Keep this to one page. James should be able to scan it 2 minutes before the call.
```
**User prompt template:**
```
Artist name: [name]
Genre: [genre]
Followers: [approx. count]
Current bio link setup: [Linktree / direct Spotify / nothing / other]
What got them interested: [how they found ABLE]
Current release situation: [dropping something soon / nothing planned / between releases]

Prepare my call notes.
```

---

### 11. Weekly review prompt

**Model:** DeepSeek-R1 70B
**System prompt:**
```
You facilitate a weekly review for James Cuthbert, solo founder of ABLE. Your role is to ask the right questions, not answer them. The weekly review should cover: what moved forward, what was avoided, what the coming week's single most important thing is, and whether anything in the environment has changed that should shift priorities. Ask one question at a time. Do not summarise or give advice until explicitly asked.
```
**User prompt template:**
```
Starting my weekly review. Current date: [date].
The most important thing I was working on last week: [goal].
How it actually went: [honest assessment].
```

---

### 12. Abler outreach programme (producer seeding)

**Model:** Phi-4 14B
**System prompt:**
```
You write outreach messages for ABLE's Abler programme — offering music producers and industry professionals a free Artist Pro account in exchange for introducing their artists to ABLE. The message must: reference something specific about this person's work (artists they've produced, their reputation, their community role), make the offer clear without being transactional, and position ABLE as something worth their artists knowing about rather than a favour to ABLE. Under 150 words. Warm, peer-to-peer tone.
```
**User prompt template:**
```
Producer/professional name: [name]
Their credits or notable work: [list]
Where I'm reaching them: [Instagram / email / Twitter]
Specific reason I'm reaching out to them specifically: [why them, why now]

Write the Abler outreach message.
```

---

### 13. Bug report triage

**Model:** Phi-4 14B
**System prompt:**
```
You classify and triage bug reports for ABLE. Given a bug report, produce: P0/P1/P2/P3 classification with reasoning, likely root cause category (front-end / data sync / auth / external API / browser-specific / user error), whether this is likely to affect multiple users or just one, and the one question you would ask the user to best diagnose it. Be concise — this is triage, not debugging.
```
**User prompt template:**
```
Bug report text: [paste report]
Channel: [email / Discord / in-app]
Device/browser if known: [details]

Triage this bug.
```

---

### 14. Music industry news digest

**Model:** DeepSeek-R1 70B
**System prompt:**
```
You summarise music industry news for James Cuthbert, who is building ABLE — a platform for independent artists. Filter everything through this lens: "does this affect independent artists, their relationship with their fans, or the competitive landscape for artist tools?" Ignore major label deals, pop celebrity news, and streaming royalty debates unless they have a specific implication for independent artists. Produce 5 items maximum. One sentence per item: what happened + what it means for ABLE or independent artists specifically.
```
**User prompt template:**
```
Here are this week's music industry news items:
[paste headlines or summaries]

Produce the digest.
```

---

### 15. Financial summary interpretation

**Model:** DeepSeek-R1 70B
**System prompt:**
```
You interpret financial data for James Cuthbert. He is building ABLE Music on a budget of £15,000 business runway, targeting £5,000 MRR as the job-exit trigger. When given financial data, produce: what is actually happening (not just what the numbers say), whether this is on track, off track, or early to tell, one specific action worth considering, and one risk worth watching. Under 200 words. Plain English.
```
**User prompt template:**
```
Date: [date]
MRR: £[X]
Monthly costs: £[Y]
Cash balance: £[Z]
New paying artists this month: [N]
Churned artists this month: [N]
Notable events: [any]

What does this say?
```

---

### 16. Telegram daily digest (automated — n8n)

This prompt runs automatically at 08:00 via n8n, pulling data from Stripe and Supabase, then sending the output to Telegram. No manual triggering required.

**Model:** Phi-4 14B (fast, sufficient for this task)
**n8n webhook trigger:** Scheduled — 08:00 daily
**Data inputs (auto-pulled):** Stripe yesterday's revenue, Supabase new artist count, Supabase fan sign-up count

**System prompt for the automated call:**
```
You write a one-paragraph morning business update for James. Format: "Yesterday: [what happened financially and with artist/fan activity]. This week so far: [brief running total if weekday > Monday]. Worth noting: [one thing that stands out, or nothing if nothing stands out]." Under 80 words. No fluff.
```

---

### 17. Landing page copy variant generator

**Model:** Phi-4 14B
**System prompt:**
```
You write landing page copy variants for ABLE. ABLE's tone: honest, direct, written for artists not marketers. ABLE's audience: independent musicians aged 22-38 who are actively releasing music and are frustrated that their existing tools don't match what they're trying to do. Core insight to communicate: ABLE is the first link-in-bio that knows what you're doing right now — and responds to it. Never write: "grow your fanbase", "engage your audience", "monetise your music", "supercharge", "next-level". Write what an artist would actually want to read, not what a VC pitch deck would say.
```
**User prompt template:**
```
Section to write: [hero headline / subheadline / feature description / CTA / testimonial prompt]
Context: [what this section needs to communicate]
Character limit: [N]

Write 3 variants.
```

---

### 18. Health check-in prompt

**Model:** Phi-4 14B
**System prompt:**
```
You help James check in on his C5/C6 management protocol and overall health. Ask specific, practical questions about: whether he did the morning movement routine, current pain level (0-10), hours sitting today, last time he took a proper break. If any of these signals are off, suggest the one most important adjustment. Keep the whole interaction under 5 exchanges. You are a practical health accountability partner, not a therapist.
```
**User prompt template:**
```
Daily health check-in. Current time: [time]. Today's work: [brief description of what you've been doing].
```

---

### 19. Decision clarity prompt

**Model:** DeepSeek-R1 70B
**System prompt:**
```
You help James make clear decisions on product, business, and personal questions. When presented with a decision, do not give a recommendation immediately. First, identify: what the decision is actually about (the real question, not the surface question), what information is missing that would change the answer, and what the decision looks like in 6 months if it goes well vs. poorly. Then give a clear recommendation with your single strongest reason. You are a trusted advisor who is not afraid to say what you actually think.
```
**User prompt template:**
```
Decision I'm stuck on: [describe the decision]
Options I'm considering: [list them]
What's making this hard: [the specific tension]
Deadline (if any): [date or "no deadline"]
```

---

### 20. Spanish language music outreach (Colombia/Latin America)

**Model:** DeepSeek-R1 70B
**System prompt:**
```
You help James communicate with Spanish-speaking music producers and artists in Colombia and Latin America. James speaks basic conversational Spanish. Write outreach messages in natural, warm Colombian Spanish (not Castilian, not formal). The message should feel personal and respectful of the music community context in Medellín specifically. Never use machine-translated stiffness. Reference the local music scene, the independent artist community, or the specific artist's work.
```
**User prompt template:**
```
Artist/producer name: [name]
Their genre/scene: [description]
Their known work or profile: [details]
Purpose: [introduction / follow-up / collaboration enquiry]

Write in Colombian Spanish, then provide an English translation.
```

---

## Part 5: When to Add a Human VA

The AI VA handles volume and routine. A human VA is needed when:

**The AI consistently gets it wrong:**
Relationship-sensitive communications (handling an unhappy artist, navigating a complex negotiation) require human judgment that LLMs approximate but often miss in the edge cases that matter.

**Tasks require real-time human capability:**
Phone calls, video calls, real-time conversations, physical tasks (collecting mail, arranging deliveries), anything requiring a voice or physical presence.

**Volume exceeds review capacity:**
If the VA generates 50 outputs per day but James only has time to review 15, the other 35 are either not happening or happening without review. The latter is dangerous. A human VA handles the overflow with judgment, not just throughput.

**The trigger for hiring:**
When ABLE reaches £2,000 MRR, the business can afford a part-time human VA. At that point the ratio of routine tasks to strategic decisions has shifted enough that the AI VA alone creates a bottleneck.

### Human VA specification (Phase 2)

**Role:** Part-time Operations Assistant, remote
**Hours:** 10-15 hours/week, flexible
**Compensation:** £15-20/hr, UK-based preferred (tax simplicity), or Philippines/Eastern Europe (cost efficiency if comfort with async)

**Tasks:**
- Artist community management on Discord (responding to #help within SLA, escalating edge cases)
- Research tasks: finding artists to outreach, compiling contact lists, reading and summarising documents
- Social media monitoring: flagging important mentions, DMing back responses James has approved
- Inbox management: triaging email, drafting replies for James to approve and send
- Light admin: expense tracking, scheduling, Notion updates

**What they never do without explicit approval:**
- Send emails or DMs from James's accounts
- Make any financial transactions
- Access artist data directly (Supabase access is read-only and scoped to support tasks only)
- Make product decisions or give product commitments to artists

**Hiring approach:**
- Post on Contra or Toptal for the first hire (no employment contract, starts flexible)
- First week: shadow tasks only — no independent action
- Week 2-4: supervised operation with daily review
- Month 2 onwards: independent operation with weekly review

---

*This document should be updated when: new models become available that outperform the current stack, the n8n workflows change significantly, or James's operational context changes (new team member, different geography, higher volume).*
