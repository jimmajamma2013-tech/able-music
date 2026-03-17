# AI-AGENTS.md — Final Review
**Reviewed: 2026-03-16**

---

## Summary verdict: Production-ready at 9.4/10

AI-AGENTS.md is the right document for a technical founder building a product at this stage. It makes concrete decisions (not "we might use Ollama" but "Phi-4 for email drafts, DeepSeek-R1 for financial summaries") while remaining honest about what is Phase 2 versus what is active.

---

## Structural review

| Section | Quality | Notes |
|---|---|---|
| Development agents | 10/10 | Claude Code, Playwright, parallel patterns all well-specified |
| Business operations (n8n) | 9.5/10 | Six workflows specified with enough detail to implement |
| AI copy agents | 9/10 | Bio agent well-specified; Phase 2 table is appropriately lightweight |
| Data and analytics agents | 9/10 | PostHog events list is complete; Edge Functions correctly deferred |
| Agent-native parity | 10/10 | Principle is clearly stated and justified |
| Local LLM infrastructure | 9/10 | Decision matrix is honest and useful |
| Agent operation log | 9/10 | Logging fields are correct; review cadence is appropriate |

---

## Decisions this document makes explicit

1. **Claude Code is the primary development environment.** Local Ollama models do not replace it for code generation on ABLE.
2. **Sensitive data never leaves local infrastructure.** Financial summaries, market data, and personal artist/fan information route through Ollama, not Claude API.
3. **Fan email addresses are not passed to any LLM model** — only anonymised IDs.
4. **All UI actions must have Playwright-accessible selectors.** This is a quality gate, not a nice-to-have.
5. **Every significant automated action is logged.** Silent failures are worse than no automation.
6. **Model selection is specific and justified**, not vague ("we use AI for this").

---

## Architectural risks acknowledged

**Mac Studio single point of failure:** n8n, Ollama, and PostHog (if self-hosted locally) all run on one machine. If the Mac Studio is offline, automation stops. Mitigation: move n8n to a VPS or cloud instance before launch (£10–15/month on Railway or Render). PostHog can also be cloud-hosted at low volume.

**Ollama output quality variability:** Local models produce variable output quality, especially for longer emails. The workflows should include quality filters: minimum word count, absence of hallucinated URLs, sentiment check before send.

**n8n version drift:** Self-hosted n8n needs periodic updates. Schedule a monthly maintenance window.

---

## The agent-native parity section

This is the most important section in the document. It is the architectural principle that prevents ABLE from becoming a product that works for humans but not for agents. It must be re-read before every new feature is specced.

The test: can a Playwright script complete this feature's core action headlessly? If no: not finished.

---

## What happens when this document needs updating

Update when:
- A new model is evaluated and replaces an existing one (update Section 6 with date and reason)
- A new n8n workflow is built (add to Section 2)
- Supabase Edge Functions go live (update Section 4, remove "Phase 2" labels)
- PostHog moves from planned to active (update Section 4 and Appendix)
- Claude API pricing changes significantly (update cost structure in Section 6)

This is a living technical spec. It should be accurate as of the date it was last edited. Never let it drift more than one month behind reality.

---

## Final check: does this document read like ABLE?

Yes. It is direct and specific. It uses concrete numbers (£60/month, 40GB, 3 retries) rather than vague descriptions. It acknowledges trade-offs honestly. It does not overstate what AI can do or understate what it costs.

The one place to watch: as AI capabilities improve rapidly, some of the "Phase 2 only" items may become Phase 1 sooner than expected. The document's review cadence should catch this.
