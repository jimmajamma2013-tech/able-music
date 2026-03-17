# AI-AGENTS.md — Path to 10/10
**Assessed: 2026-03-16**

---

## Current score: 9.4/10

AI-AGENTS.md is technically accurate, practically structured, and covers both development and operational automation with the right level of detail for the current stage. The agent-native parity principle is well-articulated and actionable.

---

## What gets it to 10/10

### Gap 1: Error handling and failure modes not fully specified (−0.3)

The document describes what workflows do when they succeed. It does not describe what happens when they fail: a Supabase webhook fires but n8n is down; an Ollama call times out; a Resend API rate limit is hit.

**Fix:**
Add a short "Failure handling" sub-section under Section 2:
- n8n failure: log to Discord alert channel, do not retry indefinitely (max 3 retries with exponential backoff)
- Ollama timeout: fall back to a fixed template (pre-written) rather than no email
- Resend rate limit: queue and send next day; alert James if queue > 50 emails

### Gap 2: Model performance notes are not versioned (−0.1)

The model recommendations (Phi-4 for email drafts, DeepSeek-R1 for financial summaries) are based on evaluation as of March 2026. Models iterate quickly. The document should acknowledge this.

**Fix:**
Add a note at the top of Section 6: "Model recommendations are based on evaluation in March 2026. Review this section quarterly — a new model may have superseded one of these."

### Gap 3: Privacy and data handling not addressed (−0.15)

The document instructs that sensitive data stays local (financial summaries, market monitoring) but doesn't specify what counts as "sensitive" for the artist data that passes through n8n workflows.

**Fix:**
Add a "Data handling rules" sub-section:
- Fan email addresses: never passed to local Ollama models (privacy risk if logs are not cleared). Use anonymised IDs instead.
- Artist names: fine to pass to Ollama (non-sensitive, already public)
- Financial data: local only, never to Claude API
- Aggregate stats (fan counts, view counts): fine for any model

---

## What is already at 10/10

- Development agent section is precise about what Claude Code does and does not replace
- Playwright MCP section is specific: exact viewports, exact things to look for
- Parallel agent pattern has clear rules for when to use and when not to
- n8n workflow specs are detailed enough to actually implement
- Local LLM decision matrix is honest about trade-offs
- Agent-native parity principle is well-named and clearly justified
- Cost structure is transparent and realistic
- Parse-check protocol is non-negotiable and stated as such
