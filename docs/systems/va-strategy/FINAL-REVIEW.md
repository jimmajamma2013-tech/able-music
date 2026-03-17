# VA Strategy — Final Review
**Written: 2026-03-16**

## Quality score: 9.0/10

## What makes this system strong

**The model routing is specific.** Most "local LLM setup" guides say "use a big model for complex tasks." This one specifies exactly which model handles which task category and why — DeepSeek-R1 70B for thinking, Phi-4 14B for doing, Llama 3.2 3B for monitoring. That specificity means the day you set this up, you already know which model to reach for.

**The prompt library is production-ready.** These aren't example prompts — they are system prompts and user prompt templates that can be copied directly into Open WebUI. The ABLE voice instructions are embedded in the system prompts so every output is on-brand without manually prompting for it each time. This is the detail most prompt libraries miss.

**The human VA hiring criteria is honest.** The "what they never do without explicit approval" section is the most important part of the human VA spec. Getting this wrong — giving a VA access they shouldn't have — is a common and costly mistake. Defining the boundaries before hiring means they get written into the role description, not discovered after an incident.

**The use case organisation matches cognitive load.** Task categories (draft/research/analysis/strategy/monitoring) map to how you actually think about what to delegate. "I have a research task" → Category 2, DeepSeek-R1 70B. Clear without having to consult the document every time.

## What needs to be live before this system has real value

1. Mac Studio M4 Max — the hardware foundation
2. One day of setup (Ollama, Open WebUI, n8n, load prompts)
3. Consistent habit: for every communication draft, reach for the VA before starting from scratch

## Most important insight from building this system

The VA strategy only works if James uses it — and he'll only use it consistently if it's faster than doing things manually. The critical habit is: **prompt first, edit after.** Not "I'll write this myself because it's faster to not prompt the VA and wait for output." That reasoning is always locally true (writing a specific thing yourself feels faster in the moment) and globally false (the VA's output is almost always 70% of the way there, and 5 minutes of editing beats 25 minutes of writing from scratch).

The one rule that makes the whole system work: **never write a first draft if a VA prompt can produce it.**

The VA is not a shortcut. It is a leverage tool. The output still requires your judgment. But the blank page problem — the most time-consuming part of any written task — disappears entirely.

That single shift, consistently applied across every communication draft and research synthesis, is worth 90 minutes per day. At 5 days a week, that's 7.5 hours of focused capacity returned to the work that actually needs a human.
