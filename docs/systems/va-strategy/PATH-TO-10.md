# VA Strategy — Path to 10/10
**Written: 2026-03-16**

## Current state assessment: 9.0/10

The VA strategy is complete in philosophy, stack specification, use case mapping, and the 20-prompt library. It covers the full stack from hardware through to human VA hiring criteria. The prompt library is specific enough to actually use.

## What would take it to a perfect 10

### Gap 1: The n8n workflow templates are described but not built (0.4 points)

Part 3 (Category 5, Monitoring) describes what the n8n automations should do. But the actual n8n workflow JSON — the importable file that creates the workflows instantly — doesn't exist yet.

**Actions:**
- Build the 5 core n8n workflows (documented in Category 5) once Mac Studio arrives
- Export each as JSON and store in `docs/systems/va-strategy/n8n-workflows/`
- This makes the automation layer runnable in a day, not a week

### Gap 2: Model evaluation criteria is missing (0.3 points)

The stack specifies DeepSeek-R1 70B, Phi-4 14B, and Llama 3.2 3B. But it doesn't specify:
- How to evaluate if a newer model should replace one of these
- What benchmarks matter for ABLE's specific use cases
- When to move from a 70B to a 34B if the Mac Studio's throughput is too slow

**Add a model evaluation section:** quarterly check on Ollama model leaderboards (specifically MMLU, HumanEval, and the MT-Bench for instruction following). If a model in the same size class scores more than 10% higher across multiple benchmarks, test it against the prompt library before switching.

### Gap 3: The prompt library needs quality grading after real use (0.3 points)

The 20 prompts are written speculatively — they haven't been tested against real tasks yet. Some will need refinement after the first few uses.

**System:** After each use of a prompt, rate it 1-3 (1=needed heavy editing, 2=needed light editing, 3=used as-is). After 10 uses, prompts rated below 1.5 average get rewritten. Log this in a simple Notion table alongside the prompt library.

## Path to 10/10 in order

1. Get Mac Studio M4 Max (hardware dependency — not skippable)
2. Day 1 of Mac Studio: install Ollama, pull all 3 models, install Open WebUI, set up n8n
3. Load all 20 prompts into Open WebUI as saved commands
4. Build the 5 monitoring automations in n8n and export as JSON
5. After 30 days: review prompt quality scores and rewrite any below 1.5 average
6. Add model evaluation criteria (30-minute task)

---

*The VA strategy is limited by hardware, not specification. The plan is complete. The bottleneck is the Mac Studio's arrival.*
