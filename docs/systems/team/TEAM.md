# ABLE — Team Operating System
**Version: 1.0 | Written: 2026-03-16 | Author: James Cuthbert**
**Status: Active — reference before every hiring decision**

---

## Philosophy in one sentence

The team exists to serve the artist. Every hire must deepen ABLE's understanding of, and relationship with, independent musicians — not add overhead.

---

## Section 1: Solo founder phase (now — £5k MRR)

James does everything. This is not a failure state — it is the highest-leverage phase of the company. The decisions made here, and the understanding built from direct contact with artists, become the foundation everything else is built on.

### What James handles directly

**Product development**
- AI-assisted via Claude Code (see `docs/systems/ai-agents/AI-AGENTS.md`)
- All HTML/CSS/JS files edited directly — no build pipeline overhead
- Feature prioritisation driven by artist calls, not speculation

**Marketing and social media**
- First 90 days: James posts personally. No agency, no contractor.
- Reason: the copy voice needs to be authentic and the strategy needs to be tested before it can be delegated. Outsourcing before learning is expensive and slow.
- Channels: Instagram, TikTok, LinkedIn (for industry/manager reach)
- Goal for first 90 days: 1,000 followers, 50 email sign-ups, 20 artist signups

**Artist onboarding calls**
- First 50 artists: James personally onboards every one.
- This is not optional and not negotiable. These calls are product research.
- What to learn: where they found ABLE, what they tried to do first, what confused them, what delighted them, what they're releasing next
- Format: 20-minute video call, Loom recording for future reference
- When to hand off: after the first Community Manager hire, once a playbook has been written

**Customer support**
- Email + Discord. Target: <24-hour response.
- Use every support ticket as product input. If the same question arrives twice, something in the UI needs to change.

**Finance and accounting**
- FreeAgent for bookkeeping and invoices
- Target: <2 hours/week
- Monthly financial review: last Sunday of each month, 1 hour

**Legal**
- Standard contracts via Genie AI
- Privacy policy and ToS: reviewed by a solicitor once before launch, then maintain internally
- GDPR compliance: documented in `docs/systems/legal-compliance/SPEC.md`

### The core discipline

Do not hire until a role is undeniably blocking growth. The signal is not "this is taking time". The signal is "this is preventing something important from happening." Time spent doing something yourself, while learning, is not wasted. Time preventing a critical decision from being made is.

---

## Section 2: First hire — Community Manager / Artist Success (£2k MRR)

### Why this role first

ABLE's product-market fit is inseparable from artist relationships. The feedback loop of artist calls → product decisions → better artist experience is the engine. At £2k MRR, James has proven the model is working. The question becomes: can James simultaneously deepen the product and maintain the artist relationships that make the product trustworthy?

The answer is no. Artist calls take 8–10 hours/week when there are 50+ active artists. That time must be freed.

A Community Manager who genuinely understands artists is not support overhead — they are a product intelligence function wearing a customer success hat.

### The non-negotiables

- Music background required. They must have been in a band, managed artists, worked at a venue, released music, or worked in music journalism. They need to understand why an independent artist cares about owning their fan list. If they don't understand this instinctively, they cannot do the job.
- Discord-native. ABLE's community lives there. This person needs to be comfortable owning a Discord.
- Clear communicator in writing. All support is async. They write well.

### Role spec

**Hours:** Part-time (20 hrs/week) at hire. Full-time at £5k MRR.

**Salary:**
- Part-time: £11,000–14,000/yr (pro-rated from £22–28k full-time)
- Full-time: £22,000–28,000/yr
- Location: Remote-first, UK-based preferred for timezone alignment

**Responsibilities:**
- Discord community management: daily check, artist questions, content spotlights
- Artist onboarding calls: own the full playbook (James writes it first, then hands off)
- Support tickets: triage and resolve. Flag product issues to James.
- Spotlight content: one artist spotlight per week for social (Instagram/TikTok)
- Weekly sync with James: 30 minutes, async Loom preferred

**Not their job:** Writing marketing copy for ABLE. Doing product development. Making pricing decisions.

### How to find them

1. **Music Jobs** (musicjobs.com) — job board used by UK music industry professionals
2. **The Dotted Line** — music industry careers newsletter and job board
3. **LinkedIn**: search "artist relations manager", "music community manager", "indie music coordinator"
4. **Discord communities**: post in production and music industry Discord servers (create a real post, not a recruitment spam)
5. **Word of mouth via artists**: ask the first 30 ABLE artists if they know someone

### Interview process (applies to all hires — see Section 7)

1. 20-minute call: are they passionate about independent music and what ABLE is doing?
2. Paid trial task: handle 3 mock artist support tickets, draft 1 Discord announcement (2 hours, compensated)
3. 1-hour final conversation with James
4. Decision within 48 hours

---

## Section 3: Second hire — Engineer (£5k MRR)

### Why second

At £5k MRR with a solo technical founder, growth will hit a product speed ceiling. The Supabase backend needs proper architecture. The codebase is growing in complexity. Claude Code handles the day-to-day, but architectural decisions and quality assurance need a human who lives in the code.

This is not a replacement for AI-assisted development — it is a collaborator who understands both the product and the stack deeply enough to make the calls that AI tools need direction on.

### Role spec

**Salary:** £55,000–70,000/yr
**Location:** Remote-first, async-first. UK or European timezone strongly preferred.

**Technical requirements:**
- Full-stack JavaScript/TypeScript
- Supabase experience, or strong PostgreSQL + serverless background
- Netlify/Vercel deployment familiarity
- No build pipeline dogma — this is a direct-edit codebase and they need to be comfortable with that

**Strongly preferred:**
- Music fan (not required, but the product context matters enormously)
- Has worked on a consumer product used by creative professionals

**Responsibilities:**
- Own the codebase alongside James — shared understanding, not "James's codebase plus a hire"
- Lead on Supabase backend architecture when it goes beyond localStorage
- Code review on all significant changes
- Own QA testing (Playwright smoke tests, device testing)
- Performance and accessibility audits
- On-call (lightweight — this is a small product, not enterprise infrastructure)

**What they don't own:**
- Product decisions (James)
- Copy and design (James)
- Artist relationships (Community Manager)

### Finding them

- LinkedIn: "full-stack developer Supabase", "TypeScript developer remote"
- Indie Hackers job board (builds for indie products — right energy)
- Contra (talent marketplace for independent contributors)
- Referrals from music tech communities

---

## Section 4: Third hire — Marketing and Content (£8k MRR)

### Why third

At £8k MRR, ABLE has product-market fit, a growing artist base, and needs to scale acquisition. The Community Manager owns artist success. The engineer owns the product. James still owns strategy. But content production — Instagram, TikTok, newsletter, artist spotlights — cannot remain a solo-James operation at this stage.

### Role spec

**Salary:** £28,000–35,000/yr
**Location:** Remote-first

**Requirements:**
- Experience in music, creator economy, or indie brand marketing
- Strong content instincts — knows what feels right for a brand that values authenticity
- Video-literate (can shoot and edit basic TikTok/Reels content)
- Not a "growth hacker" — ABLE's voice is not that, and someone who thinks in engagement bait will damage the brand

**Responsibilities:**
- Instagram and TikTok: own the calendar, shoot content, draft copy (James approves)
- Newsletter: one per month to artists, one per month to fans (James provides brief)
- Artist spotlights: 2/month — write-up + social content
- Manage content scheduling tools
- Coordinate with Community Manager on Discord spotlights

**What they don't own:**
- Strategy (James)
- Artist relationships (Community Manager)
- Technical copy / product announcements (James approves all of these)

---

## Section 5: Team culture at ABLE

These are not aspirational. They are the conditions James will work in, and therefore the conditions the team works in.

### Async first

No unnecessary meetings. A meeting requires a reason and an outcome. A 30-minute Loom is almost always better than a 30-minute call.

- Updates go in Notion or Discord, not in meetings
- Questions that need discussion: scheduled in advance, time-boxed
- No daily standups — weekly async check-in via Loom

### Results-based

Hours worked are irrelevant. Did the thing get done? Is the artist experiencing what we wanted them to experience? That is the measure.

- Each person owns their area. Ownership means accountability.
- Blockers are flagged early, not hidden until a deadline
- Mistakes happen. They are discussed, fixed, and learned from. No blame culture.

### Artist-obsessed

Every team member must understand the target user deeply. This is not a tagline.

- New hires: 2 hours of artist call listening before their first day
- All team members encouraged to set up an ABLE profile (even if they're not musicians)
- Product decisions always come back to: "what does this mean for the artist experience?"

### Direct communication

ABLE's copy philosophy applies internally. Say what you mean. Be kind but not vague. Corporate language is a way of avoiding clarity — avoid it.

- Feedback is direct and specific: "this copy doesn't match the ABLE voice because..." not "this feels a bit off"
- Disagreements are aired, not suppressed. James is not always right.
- No performance in communication — no performative enthusiasm, no fake positivity

### Health is infrastructure

ABLE's founder has a C5/C6 disk condition that affects working capacity on some days. This is not hidden — it is built into how the company works.

- Flexible hours for medical needs, for everyone
- Async work patterns make this practical, not just a policy
- Deep work blocks (focus time without interruptions) are protected
- The expectation is communication if capacity is limited — not pretending it isn't

---

## Section 6: Remote work infrastructure

### Tools

| Tool | Use | Who sets it up |
|---|---|---|
| **Notion** | All documentation, projects, meeting notes, handbooks | James — on first hire |
| **Linear** | Bug tracking and feature development | James — before engineer hire |
| **Discord** | Team chat (separate server from ABLE artist community) | James — now |
| **Loom** | Async video updates, onboarding recordings, feedback | Individual use |
| **Figma** | Design work (Phase 2, when dedicated designer joins) | Designer — not yet |
| **1Password Teams** | Shared credentials management | James — on first hire |
| **FreeAgent** | Finance, payroll, invoices | James — now |
| **Resend** | Transactional email | James — on Supabase backend |

### Not used (and why)

- **Slack**: too expensive per seat relative to Discord for a small team, and ABLE's community is already in Discord
- **Jira**: too heavy for a team of under 10. Linear is faster and cleaner.
- **Google Workspace**: Notion replaces docs. Proton Mail for email.
- **Zoom**: Loom + occasional Google Meet. No standing Zoom calls.

### Working hours expectation

Core overlap: 10:00–16:00 UK time for anyone needing real-time collaboration. Outside of that, async.

---

## Section 7: Hiring principles

### What ABLE will not do

- Hire for "culture fit" as a proxy for demographic homogeneity. Culture fit means: do they understand the product, do they communicate directly, and do they care about independent music.
- Hire someone who doesn't use or couldn't use independent music platforms. If they've never thought about what it means to be an independent artist, they will make product decisions that feel wrong.
- Hire for a role 6 months before it is actually needed. Early hiring creates overhead before it creates value.
- Use agencies or recruiters for the first 5 hires. Direct sourcing gives signal about whether someone is proactively interested in ABLE.

### The interview process

Lean and fast. Three steps.

**Step 1 — 20-minute conversation**
One question: is this person passionate about what ABLE is doing? Do they understand the problem independently? Can they articulate why owned fan relationships matter to an artist?

If yes: move on. If no: don't try to convince them. The person who needs convincing will not do the job well.

**Step 2 — Paid trial task**
2–4 hours. Compensated at a fair hourly rate, regardless of outcome.

Examples by role:
- Community Manager: handle 3 mock artist support tickets + draft a Discord announcement for a new feature
- Engineer: fix a specific bug in the codebase + write a short technical note explaining your approach
- Marketing: write 3 Instagram captions for 3 different scenarios (release day, gig tonight, quiet Tuesday)

This is not unpaid labour. It is a real glimpse at how they work.

**Step 3 — 1-hour final conversation with James**
Not a formal interview. A real conversation. Does this feel like someone I can work with closely? Do they ask good questions? Do they push back when something seems wrong?

**Decision: within 48 hours of Step 3.**
No long deliberation. If it is not a clear yes, it is a no.

### Offer

- Salary, role scope, remote working expectations in writing
- 3-month probation with honest monthly check-ins
- No non-compete clauses. People own their careers.
- Equity: to be considered at Series A stage if it comes. Not promised.

---

## Appendix: Team growth at a glance

| Stage | MRR | Team | Monthly payroll |
|---|---|---|---|
| Now | £0–2k | James only | £0 |
| First hire | £2k | James + CM (part-time) | ~£1,000 |
| Full-time CM | £5k | James + CM (FT) | ~£2,100 |
| Engineer | £5k+ | James + CM + Engineer | ~£7,800 |
| Marketing hire | £8k+ | James + CM + Engineer + Marketing | ~£10,400 |

Note: these are estimates. Actual payroll depends on salary negotiation and mix of full-time vs part-time.

The rule: each new hire should be directly associated with a growth unlock. Not "it would be nice to have help with this." A specific bottleneck that this person removes.
