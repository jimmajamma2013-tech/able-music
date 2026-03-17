# ABLE — AI Agents System Analysis
**Date: 2026-03-16**
**Author: Assessment of AI-AGENTS.md, PATH-TO-10.md, FINAL-REVIEW.md**
**Stage: Development agents active; business automation agents partial**

---

## Current State Assessment

ABLE's AI agent infrastructure is the most operationally advanced of all the systems documented. Unlike accounting (spec-only) or investor readiness (metrics pending), the AI agent stack is partially live and actively being used. Claude Code is the daily development environment. Playwright MCP is configured and used for visual verification. Ollama is installed. n8n exists in some form.

The gap is not in the development agent layer — that is functionally a 9/10 system. The gap is in the business operations automation layer: n8n workflows are "active (partial)" by the spec's own admission, PostHog is "planned," and Supabase Edge Functions are Phase 2. The business automation infrastructure exists as architecture without the implementation to back it.

**What is demonstrably live:**
- Claude Code running as primary development agent with MCP tool access
- Playwright MCP configured with viewport specifications and smoke test protocol
- Git worktree parallel agent pattern documented and usable
- Ollama installed on Mac Studio (128GB, M4 Max)
- n8n partially running
- Claude API (Haiku) for bio generation: partial implementation

**What is specified but not fully operational:**
- n8n workflows 1–6: specified in detail, not all live
- PostHog: planned, not deployed
- Supabase Edge Functions: Phase 2
- Weekly financial digest via n8n + FreeAgent API: not live (no FreeAgent account yet)
- Market monitoring workflow: specified, activation status unclear
- Content scheduling helper: specified, not live

**Key infrastructure observation:** The Mac Studio as the sole host for n8n, Ollama, and PostHog creates a single point of failure that the FINAL-REVIEW.md correctly identifies. This is a known architectural risk that should be resolved before launch, not after.

---

## 20-Angle Scoring

### 1. Development Agent Architecture (1–10)
**Score: 9**

Claude Code as the primary development agent is the right call for a product built in vanilla HTML/CSS/JS with no build pipeline. The file editing capabilities, git operations, and Playwright MCP integration create a complete development loop without requiring a human to manually run commands between each change.

The capabilities list (file editing, git operations, Playwright screenshots, bash for parse-checking, subagent dispatch) is complete and accurate. The "what Claude Code does not replace" section — architectural decisions, copy approval, strategy decisions — is the most important framing in the section. An AI agent that knows its own boundaries is more useful than one that tries to replace all human judgment.

Gap: the cost figure (~£60/month) is accurate for current usage but will increase as the product grows and more sessions are needed. The spec should include a cost ceiling and a "what would cause this to exceed £150/month" note, so the expenditure can be monitored.

### 2. Playwright MCP Integration (1–10)
**Score: 10**

The Playwright specification is the most complete section of AI-AGENTS.md. Exact viewports (375px, 430px, 768px), specific things to look for (horizontal scroll, tap targets, theme breakage), and the tab naming convention are all operational and correct.

The instruction "invoke Playwright after every section of code change, not just at the end of a session" is the key discipline that separates good visual verification from perfunctory end-of-session checking. It is correctly stated and should be treated as a hard rule.

No gaps identified.

### 3. Parallel Agent Pattern (1–10)
**Score: 9**

The worktree-based parallel agent pattern (Agent 1: artist pages, Agent 2: admin/onboarding) is architecturally sound. The rules for when to use it (two non-dependent features with clear file boundaries) and when not to (sequential decisions, shared file state) are specific and practical.

Gap: the merge order rule ("admin first if it contains shared localStorage changes, then profile") is correct but could be more specific. What counts as a shared localStorage change? A concrete example would help: "if admin.html changes the structure of `able_v3_profile`, that change must be merged and deployed before able-v7.html changes that read from it."

### 4. Subagent Dispatch (1–10)
**Score: 8**

The use cases for subagent dispatch (competitive research, documentation, code review, screenshot audits) are correctly identified. The "do not use for" list is equally important — sequential decision-making, shared file state, downstream dependencies.

Gap: the spec does not address output quality management for subagent tasks. When two agents are researching competitors in parallel, how are conflicting or inconsistent findings reconciled? A brief note on "how to handle conflicting subagent outputs" would close this gap.

### 5. Parse-Check Protocol (1–10)
**Score: 10**

The parse-check protocol (run `node -e "new Function(src)"` before every commit) is correctly specified as non-negotiable. The specific bash command is included. The instruction "if it throws, the commit does not happen" creates a hard quality gate.

This is operationally the most important quality control mechanism in the entire development workflow. A single JS syntax error in a 3,000-line single-file HTML can silently break an entire page feature. The parse check is the safety net.

No gaps identified.

### 6. n8n Workflow Architecture (1–10)
**Score: 7**

The six workflows are well-specified:
1. New artist sign-up sequence (30-minute delay, personalised welcome, Day 3/7 nudges)
2. Fan sign-up notification (real-time and batch modes)
3. Churn prediction and intervention (14-day inactivity, 30-day cancellation risk)
4. Weekly financial digest (FreeAgent + Stripe → Ollama → Discord)
5. Market monitoring (Alpha Vantage, thresholds, silent if nothing unusual)
6. Content scheduling helper (Ollama Phi-4, Sunday 09:00, Notion output)

The logic for each workflow is detailed enough to implement. The "what this workflow is for" section in Workflow 2 (fan sign-up notification) correctly identifies the emotional significance of the "aha" moment and calibrates the notification copy accordingly.

Gap: failure handling is the primary unresolved gap (identified in PATH-TO-10.md). A Supabase webhook firing when n8n is down creates a silent failure — the artist gets no welcome email. The retry/fallback strategy must be specified before these workflows go live. Suggested minimum: 3 retries with 5-minute exponential backoff; if all fail, log to a Discord alert channel for manual follow-up.

### 7. Ollama Local LLM Infrastructure (1–10)
**Score: 8**

The model selection rationale is sound:
- DeepSeek-R1 70B for reasoning-heavy tasks (financial summaries, strategy analysis)
- Llama 3.3 70B for general writing
- Qwen2.5-Coder 32B for routine code tasks
- Phi-4 14B for fast lightweight automation
- Llama 3.2 3B for classification and routing

The decision matrix (local vs Claude API) is the most operationally valuable table in the document. The principle — sensitive data stays local, high-quality creative output goes to Claude API — is correct and clearly applied.

Gap: the PATH-TO-10.md correctly identifies that model recommendations are based on March 2026 evaluation and should be reviewed quarterly. The spec does not include a formal model evaluation protocol. What does "evaluate a new model" mean in practice? Define a benchmark set of 5 tasks (one from each use case in the decision matrix) and run them against new models quarterly. This prevents arbitrary model switching while ensuring the stack stays current.

### 8. Local vs API Decision Framework (1–10)
**Score: 9**

The decision matrix is honest about trade-offs. "Routine code edits → local (Qwen2.5-Coder) when the task is mechanical" is correct. "New feature development → Claude Code" is correct because context window and MCP tool access are irreplaceable for complex codebase operations.

The cost structure ($90/month total for AI infrastructure) is lean and correctly justified. The Mac Studio's 128GB makes local 70B models viable without quality compromise — this is a genuine cost advantage versus a team paying for API calls at scale.

Gap: the matrix does not address the "borderline task" category — tasks that could plausibly go to either local or Claude API. A simple tiebreaker rule would help: "If the output will be seen directly by an artist (profile copy, email to artist, bio suggestion), use Claude API. If the output is internal (financial summary, monitoring alert, content draft for James to review), use local Ollama."

### 9. Data Privacy Architecture (1–10)
**Score: 7**

The PATH-TO-10.md correctly identifies the data handling gap in the original document: fan email addresses should never be passed to local Ollama models because logs may persist. The guidance (use anonymised IDs instead) is correct.

Gap: the data classification that was flagged as missing in PATH-TO-10.md has not been added to AI-AGENTS.md itself. The gap was identified but not yet closed. Until it is, the privacy boundary between what goes to local models and what stays on the API exists as a principle but not as enforced architecture. Specific data handling rules should be added to AI-AGENTS.md Section 2 as a "Data Handling Rules" subsection, not just referenced in the PATH-TO-10 document.

### 10. Agent-Native Parity Principle (1–10)
**Score: 10**

The agent-native parity principle ("if a human can do it in the UI, an AI agent can do it programmatically") is the most architecturally significant decision in the document. It forces every UI feature to have a corresponding Supabase API endpoint and a Playwright-accessible selector.

The consequence of this principle at the product level: features that only work with a human mouse are not finished. This is a quality gate, not an aspiration. The FINAL-REVIEW.md's restatement — "can a Playwright script complete this feature's core action headlessly? If no: not finished" — is the concrete implementation of the principle.

No gaps identified. This section should be re-read before every new feature is specced.

### 11. PostHog Integration (1–10)
**Score: 5**

The PostHog event schema is correct and complete:
- `page_view` with artistId, source, theme, pageState
- `cta_tap` with ctaLabel, ctaType, zone, source
- `fan_signup` with hasName, hasEmail
- `profile_edit`, `wizard_complete`, `page_state_change`

The fan capture rate calculation (`fan_signups / page_views × 100`) is the right primary metric.

Gap: PostHog is "planned" — not live. The entire analytics architecture exists as specification. Without PostHog live, every reference to "PostHog dashboard," "UTM attribution," and "fan capture rate" in other documents is theoretical. The n8n weekly report that queries PostHog API cannot run without a PostHog instance.

The spec also notes "self-hosted for privacy" but PATH-TO-10 identifies this correctly: the Mac Studio single point of failure problem applies to self-hosted PostHog too. At low volume (under 1M events/month), PostHog Cloud's free tier adequately protects privacy while eliminating the hosting dependency. Consider cloud-hosted PostHog as the V1 deployment.

### 12. Supabase Edge Functions (1–10)
**Score: 4**

Three Phase 2 Edge Functions are specified:
- Fan attribution (which CTA triggered conversion)
- Release performance correlation
- Gig mode performance analysis

These are valuable analytics features. They are correctly deferred to Phase 2. Score of 4 reflects the Phase 2 deferral — the spec is complete and correct, but the execution is zero.

Gap: the spec does not define what "Phase 2" means in terms of trigger conditions. When exactly do these Edge Functions get built? Suggested trigger: "when PostHog and Supabase are both live and processing real data from 50+ active artists." Without a trigger condition, "Phase 2" remains indefinitely deferred.

### 13. Agent Operation Logging (1–10)
**Score: 7**

The logging architecture (PostHog for user-facing events, Supabase agent_log table for automated actions, n8n execution history for workflow runs) is the right three-layer approach. The fields for each automated email log (workflow_id, artist_id, email_type, model_used, sent_at, opened_at) are comprehensive.

The review cadence instruction ("James reviews n8n execution log weekly") is the right discipline. The observation — "a failed re-engagement email is worse than no automation" — correctly identifies that silent failures are the most dangerous class of automation error.

Gap: no alert mechanism for workflow failures that goes beyond James actively checking the n8n log. If n8n fails on a Thursday and James doesn't check until Monday, 4 days of missed artist notifications accumulate. The spec should include an n8n health alert: if any scheduled workflow has not run in the last 25 hours, send a Discord notification to James.

### 14. Cost Management (1–10)
**Score: 9**

The cost structure is transparent and well-documented:
- Claude Code: ~£60/month
- Claude API (copy agents): ~£5/month
- Ollama: £0/month
- n8n (self-hosted): ~£10/month
- PostHog (self-hosted): ~£15/month
- **Total: ~£90/month**

This is an exceptionally lean AI infrastructure for the capability delivered. The observation that "the Mac Studio's 128GB means it can run 70B models without compromises" is accurate and important for the cost calculation — a team using Claude API for all tasks at similar volume would pay significantly more.

Gap: the cost is based on "current usage levels." As ABLE grows, the Claude Code usage will increase (more features to build, more complex edits) and the Resend/email costs from n8n-triggered emails will scale with artist count. A cost projection at 500 artists would help with financial planning. Estimate: Claude Code ~£100/month, email infrastructure ~£30/month, analytics ~£15/month → total ~£155/month at 500 artists. Still lean.

### 15. Mac Studio Dependency Risk (1–10)
**Score: 5**

The FINAL-REVIEW.md correctly flags this as "Mac Studio single point of failure." n8n, Ollama, and PostHog all running on one machine creates a non-trivial operational risk. If the Mac Studio is offline (power cut, hardware failure, travel), automation stops.

The suggested mitigation (move n8n to a VPS or cloud instance at £10–15/month on Railway or Render) is the correct solution. This should be a pre-launch requirement, not a post-launch aspiration. An artist who expects a welcome email 30 minutes after sign-up and doesn't receive one because James's home power went out is a support ticket and a trust loss.

Score of 5 reflects that the risk is known and documented but not yet resolved.

### 16. Ollama Output Quality Control (1–10)
**Score: 6**

The FINAL-REVIEW.md correctly identifies that local models produce variable output quality. The suggested quality filters (minimum word count, absence of hallucinated URLs, sentiment check before send) are reasonable but not yet implemented.

The specific risk: an Ollama-generated re-engagement email that contains a hallucinated URL (e.g. a fake ABLE dashboard link) sent to an artist would be a product trust incident. The "output validation before send" step in n8n must be specified and built.

Gap: add an n8n quality filter step before every Ollama-generated email send: minimum 20 words, contains the artist's name variable (confirming personalisation fired), does not contain URLs other than able.fm and admin.html domains. This is a 15-minute n8n configuration step that prevents the worst class of AI email failure.

### 17. Claude API Copy Quality (1–10)
**Score: 8**

The bio generation agent (Claude Haiku, 3 options, under 80 words each, first person, no superlatives) is well-specified. The prompt structure follows ABLE's copy philosophy correctly. The instruction to re-read `docs/systems/copy/SPEC.md` before any prompt change is the right operational discipline.

The Phase 2 copy agents table (press release generator, lyric formatter, sync brief matching, gig description writer) is appropriately lightweight — a roadmap, not a spec.

Gap: the bio generation agent has no explicit test suite. Before the "Suggest bio" button is shown to artists, run 20 test bios for real artists (or fictional artist profiles) and review against the copy philosophy. Define "pass" criteria: no superlatives, no exclamation marks, under 80 words, first person, specific (not generic). Document one example pass and one example fail for calibration.

### 18. Error Handling Strategy (1–10)
**Score: 4**

This is the primary identified gap in PATH-TO-10.md and it remains unresolved. The document describes success paths for every workflow. It does not describe failure paths.

Specific failure scenarios that need handling:
- n8n down when Supabase webhook fires → retry queue
- Ollama timeout → fall back to fixed template email
- Resend rate limit → queue next-day delivery, alert James
- Supabase connection error from n8n → retry 3 times, then alert
- Discord API rate limit for notifications → queue and batch

None of these are specified. Score of 4 reflects that this is a critical operational gap for a system that will be running automated communications to paying artists.

### 19. Documentation Freshness Protocol (1–10)
**Score: 7**

The FINAL-REVIEW.md correctly states that this document "should be accurate as of the date it was last edited" and lists specific update triggers (new model evaluated, new workflow built, Edge Functions go live, PostHog active, Claude API pricing changes).

Gap: the "never let it drift more than one month behind reality" instruction is an aspiration without a mechanism. Add a calendar reminder: first Monday of each month, open AI-AGENTS.md, verify the Appendix table is accurate (which agents are "Active" vs "Planned"). Update the date at the top. This takes 5 minutes and ensures the document stays trustworthy.

### 20. Business Intelligence Value (1–10)
**Score: 7**

The agent stack collectively delivers genuine business intelligence that a solo founder could not maintain manually: weekly financial digests, market monitoring, fan capture rate reports, artist engagement data. This transforms James from "checking dashboards daily" to "receiving signals when something needs attention."

The target state — "the tools are working together, you are reading signals, not polling dashboards" — is correctly articulated in PATH-TO-10.md as the 10/10 condition.

Gap: no dashboard consolidation. The agent stack currently sends signals to Telegram/Discord across multiple channels. There is no single "morning briefing" view that summarises all key signals. An n8n workflow that aggregates: yesterday's artist sign-ups, MRR delta, any market thresholds crossed, any P0/P1 support tickets, and the weekly content calendar — delivered as a single Discord message each morning — would be more valuable than six separate notification channels.

---

## Gap Summary

| Gap | Severity | When to address |
|---|---|---|
| Error handling for all 6 workflows | Critical | Before first n8n workflow goes live |
| Data privacy rules not added to main doc | High | Before any fan data passes through n8n |
| Mac Studio single point of failure | High | Before launch — move n8n to VPS |
| PostHog not deployed | High | Before first artist signs up |
| Ollama output quality filter not built | High | Before any Ollama email sends |
| Model evaluation protocol not defined | Medium | Quarterly review cadence |
| n8n health alert mechanism | Medium | Before first workflow goes live |
| Bio generation test suite not run | Medium | Before "Suggest bio" ships |
| Morning briefing consolidation | Low | After all workflows are live |
| Phase 2 trigger conditions undefined | Low | When PostHog is live |

---

## Competitive Context

ABLE's AI infrastructure is, for a solo-founder B2C SaaS, unusually mature and well-considered. Most comparable products at this stage have: an email provider sending templated sequences, and a single analytics tool. ABLE's architecture is closer to what a 5-person team would build: local LLMs for operational tasks, Claude API for quality-sensitive output, Playwright for automated testing, n8n for orchestration.

The cost efficiency is the primary competitive advantage here. The Mac Studio + Ollama combination means ABLE can run 70B parameter model tasks for approximately £0 marginal cost. Competitors running OpenAI API for all AI tasks would pay £50–200/month for equivalent volume at the operational scale ABLE is planning.

The risk is the operational concentration — all intelligence on one machine. Competitors on cloud infrastructure have redundancy that ABLE does not yet have.

---

## What "10/10" Looks Like for This System

1. **All 6 n8n workflows live and verified:** Each workflow has been tested end-to-end with real Supabase data. Error handling is live for all failure modes. Weekly n8n execution log reviewed.

2. **PostHog deployed and tracking all 6 event types:** Fan capture rate calculable per artist. UTM attribution flowing from landing.html through to Supabase profile creation.

3. **Mac Studio is not the only host:** n8n running on Railway or Render. Ollama models synced to a cloud instance as fallback (or accepted as offline-capable — explicitly designed to fail gracefully).

4. **Quality filters on all Ollama outputs:** No hallucinated URL has ever appeared in a sent email. Every n8n email has been validated before send.

5. **Agent-native parity confirmed for all 13+ features:** Every feature built to Checkpoint 13 has a Playwright headless test that passes. The parity principle is not aspirational — it is evidenced.

6. **Morning briefing operational:** One consolidated Discord message at 08:00 UK time, every day, containing all signals that require James's attention. Zero unnecessary dashboard checking.

**Current distance from 10/10:** Development agent layer is approximately 9/10. Business operations layer is approximately 4/10. Aggregate: **6/10** — a strong foundation with critical operational gaps that must close before the business automation layer is trusted for artist-facing communications.

---

*Next action: Specify failure handling for each n8n workflow before any workflow goes live. Add data privacy rules to AI-AGENTS.md. Move n8n to a VPS or cloud host before first paying artist signs up.*
