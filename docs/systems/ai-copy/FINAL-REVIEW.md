# ABLE — AI Copy System: Final Review
**Created: 2026-03-16 | Spec-complete target: 8.5/10 | True 10 requires real usage data**

> Post-spec review. Scores reflect projected state after P0–P2 implementation. The function exists and works at a basic level — all scores in the "after P1" column are achievable without new infrastructure.

---

## Score progression

| # | Dimension | Current | After P0 | After P1 | After P2 | Ceiling |
|---|---|---|---|---|---|---|
| 1 | Voice quality | 5/10 | 7/10 | 8/10 | 9/10 | 9.5 — requires artist satisfaction data |
| 2 | Banned phrase compliance | 6/10 | 9/10 | 9/10 | 9.5/10 | 10 — requires 90-day clean production record |
| 3 | Context awareness | 4/10 | 7/10 | 8.5/10 | 9/10 | 9.5 — requires accepted copy learning in prod |
| 4 | Rate limiting | 2/10 | 6/10 | 7/10 | 9/10 | 9.5 — per-artist Supabase limiting |
| 5 | Model choice | 6/10 | 8/10 | 8/10 | 8/10 | 9 — Haiku quality ceiling for captions |
| 6 | Prompt engineering | 5/10 | 7.5/10 | 8.5/10 | 9/10 | 9.5 — few-shot calibration |
| 7 | Fallback behaviour | 3/10 | 8/10 | 8/10 | 8/10 | 9 — fallbacks are human-written, cannot get to 10 without artist preference data |
| 8 | Integration quality | 4/10 | 6/10 | 8.5/10 | 9/10 | 9.5 — attribution from caption to outcome |
| **Overall** | **4.4/10** | **7.3/10** | **8.2/10** | **8.8/10** | **~9.5** |

**Spec-complete target: 8.5/10** (achievable after P0+P1 without Supabase)

---

## Dimension notes

### 1. Voice quality — ceiling 9.5/10

After P0, the system prompt includes vibe and feel context blocks. An R&B/intimate prompt and an Electronic/expansive prompt produce meaningfully different suggestions. After P1, the artist's accepted copy history is passed back as style context, tightening the loop.

The remaining 0.5 gap to ceiling: voice quality is ultimately subjective. The only reliable measure is whether artists accept suggestions without editing them — and that requires 30+ days of real usage to validate. The spec cannot close this gap.

---

### 2. Banned phrase compliance — ceiling 10/10

After P0, the system prompt explicitly bans all known phrases, detection runs on every output, and violations are logged. The ceiling is technically 10 — the banned patterns are known, the detection is systematic, and the Playwright test catches regressions.

The honest gap: new SaaS copy clichés will emerge that are not on the current banned list. The list must be maintained as the product evolves. "Monetise" was once not a marketing phrase. Compliance requires ongoing curation, not just a one-time fix.

---

### 3. Context awareness — ceiling 9.5/10

After P0: vibe and feel context blocks are live. After P1: full bio passed, accepted copy as style example. The ceiling gap: the model has no access to the artist's actual writing samples beyond their bio. If an artist's Instagram captions are in a distinctive voice, that voice is invisible to the AI. Closing this gap would require importing the artist's social posts as context — a future feature, not a current gap.

---

### 4. Rate limiting — ceiling 9.5/10

After P0: IP-based limiting (20/day). After P2: per-artist Supabase limiting (10/day). The remaining 0.5 gap to ceiling: rate limiting will always have adversarial edge cases. A determined abuser with a VPN and rotating IPs bypasses IP limits. Per-artist limits require auth, which adds friction. The design accepts this at current scale.

---

### 5. Model choice — ceiling 9/10

Bio mode moves to Sonnet at P0, which is the correct decision. CTA and caption stay on Haiku. The ceiling for this dimension is 9 rather than 10 because Haiku has a genuine quality ceiling for caption generation — it produces serviceable copy but lacks the register nuance of Sonnet. At current cost constraints, Haiku for captions is the right call. When the product scales and the economics shift, caption mode could move to Sonnet.

---

### 6. Prompt engineering — ceiling 9.5/10

After P0: vibe/feel context blocks. After P1: accepted copy as style example. The remaining gap: few-shot examples would further improve output quality. Adding 2–3 before/after examples directly in the prompt (not just banned phrases) would narrow the gap between "sounds like ABLE copy" and "sounds like this specific artist." This is a prompt iteration task — no code change required, just careful example selection.

---

### 7. Fallback behaviour — ceiling 9/10

After P0, every error state returns curated human-written fallbacks. The ceiling is 9 rather than 10 because human-written defaults are, by definition, generic. They are better than an error, but they are not better than a good generation. The quality of the fallback experience improves only if we add more fallbacks with more specificity — which requires real artist feedback on which defaults they actually used.

---

### 8. Integration quality — ceiling 9.5/10

After P1: structured output with confidence scores, labels, and model metadata. Accepted copy tracking in localStorage. The remaining 0.5 gap: attribution. When an artist uses an AI-generated caption and posts it, ABLE currently has no way to know whether the post performed well. Closing this gap would require social platform webhooks or manual artist reporting — both Phase 3 concerns.

---

## What 8.5/10 means

Spec-complete 8.5/10 means:
- All three modes produce on-register output for all 7 vibes and all 4 feels
- No banned phrases in 100 consecutive test generations
- Fallbacks return when the API is unavailable
- The bio mode uses Sonnet
- Rate limiting is live (IP-based minimum)
- Accepted suggestions are recorded
- The client handles structured output with confidence scores

It does not mean:
- Artist satisfaction has been measured
- The system has been in production for 90 days clean
- The few-shot calibration has been tuned on real accepted copy

---

## The single most important change

**P0.2 — Add genre/feel context to system prompt.** This is the change that moves the system from "AI copy generator" to "ABLE AI copy generator." Without vibe and feel context, every artist receives suggestions from the same generic register. With it, an R&B/intimate artist receives suggestions that could not be mistaken for an Electronic/expansive artist's copy. That specificity is what makes the feature feel like ABLE rather than ChatGPT.

---

## What this spec covers that the current function does not implement

| Item | Status |
|---|---|
| `vibeId` and `feel` as system prompt context | Not implemented — P0.2 |
| Bio mode → Sonnet routing | Not implemented — P0.4 |
| Banned phrase detection on output | Not implemented — P0.5 |
| Curated fallback suggestions | Not implemented — P0.6 |
| Server-side rate limiting | Not implemented — P0.3 |
| Structured output with confidence scores | Not implemented — P1.1 |
| Full bio passed (not truncated) | Not implemented — P1.2 |
| Accepted copy recorded to localStorage | Not implemented — P1.4 |
| Client-side rate limit display | Not implemented — P1.3 |
| Per-artist Supabase rate limiting | Blocked on backend — P2.1 |
| Improvement loop from accepted suggestions | Blocked on backend — P2.2 |
| Playwright regression test | Not started — P2.3 |
