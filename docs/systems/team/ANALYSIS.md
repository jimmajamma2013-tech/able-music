# ABLE — Team System: Analysis
**Date: 2026-03-16 | Status: Solo founder phase | Analyst: Claude Code**

---

## Overview

ABLE is a solo-founder company. James does everything. The team spec is comprehensive for the stages it covers, honest about salary ranges, clear about hire order, and grounded in the specific context of building for independent musicians. This analysis examines the current state, the decisions the spec makes correctly, the gaps that exist, and a realistic assessment of the AI agent vs. human staffing question that shapes every hiring decision.

---

## 1. Current Team State — Score: honest assessment

**Team size:** 1 (James)
**AI augmentation:** Claude Code for product development (confirmed operational), Ollama local LLMs pending Mac Studio M4 Max arrival
**External support:** None confirmed (no VA, no contractor, no freelancer relationships formalised)
**Revenue:** £0 MRR (pre-launch)

The solo founder phase is correctly described in TEAM.md as "the highest-leverage phase of the company." Direct contact with every decision, full context on every product choice, zero communication overhead. The cost is time — specifically the overlap between product building and the relationship work (artist calls, community management) that becomes necessary as soon as artists are using the product.

The current constraint is not team — it is product and user acquisition. No hire changes that constraint.

---

## 2. AI Agent vs. Human Staffing Decision Matrix

The VA-STRATEGY.md document gives the clearest picture of where AI handles the work. Synthesising across both documents:

| Task category | AI agent appropriate? | Human required? | Current tool |
|---|---|---|---|
| Code generation and editing | Yes — core use case | No (architectural decisions: yes) | Claude Code |
| First-draft communication | Yes — Phi-4 14B | Review by James | Ollama (pending) |
| Research synthesis | Yes — DeepSeek-R1 70B | Review by James | Ollama (pending) |
| Artist onboarding calls | No — relationship-critical | Yes — James directly | James |
| Discord community management | Partial — FAQ responses | Yes for judgment calls | Pending CM hire |
| Customer support triage | Yes — classification | Human for complex cases | Pending |
| Content creation (first drafts) | Yes — Phi-4 14B | Voice review essential | Ollama (pending) |
| Product strategy decisions | Advisory only | James always decides | Local LLM + Claude Code |
| Investor relations | Advisory drafts only | James always | Local LLM + Claude Code |
| Financial management | No meaningful AI role | James + FreeAgent | FreeAgent |
| Legal/compliance | Reference only | Solicitor for review | Genie AI |
| Marketing execution | Drafts: yes. Posting: James | James approves all copy | Ollama (pending) |

**The key constraint:** All AI assistance requires hardware (Mac Studio M4 Max) that has not yet arrived. Until then, the VA layer is Claude Code and external Claude API — which is functional but more expensive per use than the local LLM stack would be. The gap between "spec complete" and "operational" is the Mac Studio delivery date.

**The honest assessment of AI vs. human for ABLE specifically:**
The AI stack handles volume and routine exceptionally well. The one thing it consistently underperforms on is ABLE's specific voice — local LLMs will drift toward generic SaaS language without careful system prompting and review. The 20 system prompts in VA-STRATEGY.md address this directly, but they need to be battle-tested against real outputs before being trusted for anything public-facing.

---

## 3. First Hire Decision — Community Manager / Artist Success

The spec correctly identifies this as the first hire at £2k MRR. The reasoning is sound: at 50+ active artists, artist calls consume 8–10 hours per week. That time must be freed for product development or the product stagnates.

**The non-negotiable criteria are correctly defined:**
- Music background required (not optional)
- Discord-native
- Clear written communicator

**What the spec gets right:** The hire is described as a "product intelligence function wearing a customer success hat." This framing is important — it prevents the hire from being treated as support overhead and ensures the person is selected for insight, not just responsiveness.

**What the spec is missing:**

*Freelancer option before full hire:*
Between solo James and first hire, there is a gap period where specific tasks could be handled by a contractor: a freelance copywriter for the monthly newsletter, a part-time moderator for Discord, a music industry assistant for artist outreach. This is not in the spec and should be. The freelancer approach delays the fixed cost of a hire while testing whether the role is genuinely needed.

*The BIMM/music school alumnus advantage:*
The spec lists job boards (Music Jobs, The Dotted Line, LinkedIn) but misses the highest-quality source: ABLE's own early adopters. An artist who uses ABLE and also has experience in music industry relations or community management is a better CM candidate than anyone found via a job board. Ask the first 50 artists.

*Onboarding structure:*
The spec mentions 2 hours of artist call listening before Day 1 but lacks a structured first-week plan. The PATH-TO-10 correctly flagged this as a gap. Add: Day 1 (accounts set up, read CLAUDE.md + CONTEXT.md + the copy philosophy), Days 2–3 (shadow 3 artist calls, access to all active support tickets for context), Week 1 (handle 3 support tickets with James reviewing responses before sending), Week 2 (first solo artist call with James available for async backup).

---

## 4. Second Hire Decision — Engineer

**Timing:** £5k MRR

**The spec is realistic about the constraint:** The engineer salary (£55–70k) is a stretch at £5k MRR. Monthly payroll would be approximately £7,800 (CM full-time + engineer). At £5k MRR with approximately £1,500 in infrastructure and operational costs, the margin is thin.

**Bridge option the spec doesn't address:** A fractional or part-time engineer (20 hours/week at £400–500/day) before a full-time hire. This could provide the Supabase architecture and code review capacity that James needs without the full salary commitment. Contra and Toptal are the right platforms for this.

**Technical requirements are correctly scoped:**
- Full-stack JS/TypeScript
- Supabase or PostgreSQL background
- Netlify/Vercel deployment familiarity
- No build pipeline dogma — "comfortable with direct-edit codebase" is a specific requirement that filters out engineers who would want to introduce webpack or Next.js

**The "music fan preferred" criterion deserves more weight.** An engineer who genuinely cares about independent music will make better product decisions than one who treats it as a consulting engagement. This should be evaluated in the interview: "Walk me through an independent artist you follow and how they manage their audience relationship." Someone who has never thought about this cannot build ABLE effectively.

---

## 5. Third Hire Decision — Marketing and Content

**Timing:** £8k MRR

The spec correctly places marketing third. Before £8k MRR, James is the marketing voice and that is the right state. A marketing hire before PMF is confirmed either reinforces the wrong message or undermines James's authentic founder voice.

**The critical risk at this stage:** Marketing hire at £8k MRR assumes healthy margins. If CAC is high or churn is significant, £8k MRR may not support the additional £2,600/month payroll. Monitor the unit economics before committing.

**"Not a growth hacker" is not just a preference — it is the most important filtering criterion.** An individual who thinks in engagement bait and viral mechanics will damage ABLE's relationship with its artist community. The interview test: show them five ABLE-brand posts and five generic creator-economy posts. Can they identify why the ABLE posts are different? Can they write in that register? If not, pass.

---

## 6. Co-Founder Consideration — Score: not addressed in spec

**The gap:** TEAM.md does not address whether James is actively seeking or open to a co-founder. This is a significant omission for a company at the current stage.

**The honest assessment:**
- A co-founder with complementary skills (e.g., strong commercial/sales background for partnerships and Label tier sales, or engineering background for the Supabase architecture) would address two of the most time-sensitive bottlenecks
- A co-founder with 10–15% equity reduces CAC on those skills from salary cost to equity — potentially attractive at this stage
- The risk: co-founder fit is harder to assess than employee fit, and co-founder conflict is the leading cause of early-stage company failure

**The practical question:** If James could find a music industry commercial person who would do Label tier sales and partnership development for 15% equity and no salary until £5k MRR, would the company move faster? Probably yes. Is finding that person a good use of the next 90 days? Only if James has a specific person in mind. Random co-founder searches at this stage are a distraction.

**Recommendation:** Add a brief section to TEAM.md on co-founder consideration — the criteria, the equity range, and the explicit decision to either pursue actively or table until post-PMF.

---

## 7. Advisory Board — Score: not addressed in spec

The spec does not mention an advisory board. For a music platform, advisors with specific industry credibility serve multiple functions: warm introductions to music schools and management companies, credibility signal to music press, sounding board for product decisions.

**Potential advisory profiles worth pursuing at current stage:**
- A UK independent music manager with 5+ active artist clients — would accelerate Label tier sales and management company partnerships
- A music journalist at DIY Magazine or Hypebot — would accelerate press relationships and product credibility
- A music technology founder who has been through product-market fit in the creator tool space — would provide perspective on the PMF journey

**The deal structure for advisors at this stage:** 0.25–0.5% equity with a 2-year vest, in exchange for 2–3 hours/month of active introduction-making (not just advisory calls). No salary. Clear scope: if they don't make introductions, the equity doesn't vest.

---

## 8. Equity Structure — Score: 7/10

The spec mentions equity "to be considered at Series A" and the PATH-TO-10 correctly identifies this as evasive — early hires will ask about it. The recommendation to be explicit is right.

**The honest position at current stage:**
ABLE has no outside investment. The company is 100% James's equity. Early employees at this stage take a bet — they are joining before proof of model.

**A defensible equity policy for the first 3 hires:**
- Community Manager (PT → FT): 0.25–0.5% with 4-year vest, 1-year cliff, subject to company surviving to £5k MRR. Not promised at hire; offered at 6-month review if both parties want to formalise.
- Engineer: 0.5–1% with standard 4-year vest terms. Offered at hire for a candidate who could earn more elsewhere but believes in the mission.
- Marketing: 0.25–0.5% with 4-year vest, 1-year cliff.

These numbers are small by VC-backed standards but honest for a bootstrapped pre-Series-A company. The candidate who accepts understands they are taking a bet. Being clear about this is more trustworthy than vague promises.

---

## 9. Team Culture Assessment — Score: 10/10

The five culture principles (async first, results-based, artist-obsessed, direct communication, health is infrastructure) are not aspirational corporate values — they are specific, testable behaviours.

**What is exceptional:**
- "Health is infrastructure" with direct reference to James's C5/C6 condition. This is honest and builds trust with potential hires. It signals that the company is built for real human capacity, not heroic availability.
- "No performance in communication — no performative enthusiasm, no fake positivity." This is the copy philosophy applied to internal culture. It is unusual and valuable.
- "Mistakes are discussed, fixed, and learned from. No blame culture." This needs to be demonstrated, not just stated. The first time a mistake happens, James's response will set the culture permanently.

**What needs operationalisation:**
- "New hires: 2 hours of artist call listening before their first day" requires a library of recorded calls. Does this exist? If not, the onboarding spec is incomplete.
- "All team members encouraged to set up an ABLE profile" — this needs to be a Day 1 action item, not an encouragement.

---

## 10. Remote Infrastructure — Score: 9/10

Tool choices are well-justified. Notion over Google Workspace, Discord over Slack, Loom over Zoom standups, Linear over Jira. Each choice reflects a bias toward clarity and directness over corporate infrastructure.

**The one tool missing:** A shared design system reference. The design tokens in CLAUDE.md are correct but there is no Figma file (correctly deferred to when a designer joins) and no lightweight visual reference document for the CM and marketing hires who will need to create on-brand content without building a page. A simple one-page brand reference (colours, fonts, logo files, tone examples) would enable the first non-engineering hires to produce on-brand content from Day 1.

---

## 11. Summary and Priority Gaps

| Area | Score | Priority gap |
|---|---|---|
| Current team (solo) | 10/10 (appropriate for stage) | Get AI stack operational (Mac Studio) |
| First hire criteria | 9/10 | Add freelancer bridge option |
| Second hire criteria | 8/10 | Add fractional engineer option |
| Third hire criteria | 8/10 | Timeline risk at margins |
| Co-founder consideration | 0/10 | Not addressed at all |
| Advisory board | 0/10 | Not addressed at all |
| Equity structure | 6/10 | Evasive — needs a clear position |
| Team culture | 10/10 | Needs operationalisation details |
| Remote infrastructure | 9/10 | Needs brand reference document |

**The two most important additions to the spec:**
1. A co-founder consideration section — explicit decision to pursue or table
2. An equity policy for the first 3 hires — specific numbers or a clear "no equity until Series A" with rationale

Both of these will be asked in the first serious hiring conversation. Having thought through the answer in advance is worth 30 minutes of spec work.
