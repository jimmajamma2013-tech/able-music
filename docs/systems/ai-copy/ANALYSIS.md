# ABLE — AI Copy System: Analysis
**File: `netlify/functions/ai-copy.js` | Created: 2026-03-16**

> Audit of the current AI copy generator. Scored across 8 dimensions. This is the honest starting state before SPEC.md defines the target.

---

## Scores — current state

| # | Dimension | Score | Notes |
|---|---|---|---|
| 1 | Voice quality | 5/10 | See below |
| 2 | Banned phrase compliance | 6/10 | See below |
| 3 | Context awareness | 4/10 | See below |
| 4 | Rate limiting | 2/10 | See below |
| 5 | Model choice | 6/10 | See below |
| 6 | Prompt engineering quality | 5/10 | See below |
| 7 | Fallback behaviour | 3/10 | See below |
| 8 | Integration quality | 4/10 | See below |
| **Overall** | | **4.4/10** | Pre-spec state |

---

## Dimension 1: Voice quality — 5/10

The system prompt tells the model to sound "direct, specific, human — never marketing-speak" and to sound "like the artist themselves, not a brand." That is the right instruction. The gap is that the system prompt gives the model no way to know what that specific artist's voice actually sounds like.

The current prompt receives `artistName` and `genre` as the only identity signals. An Electronic producer from Manchester and a Folk singer-songwriter from Bristol both receive the same `bio` prompt structure — only the genre string differs. The model has no access to:

- The artist's existing bio (truncated to 120 chars in some modes, not passed in others)
- Their tone words or mood keywords from the wizard
- Their feel quadrant (`raw`, `refined`, `intimate`, `expansive`)
- Examples of their own writing (captions, past bio text)

Without these, Claude Haiku produces technically correct copy that matches the genre convention but does not sound like a specific person. An Electronic artist gets "crafting sonic landscapes" instead of whatever their actual voice is. The genre cliché problem is real and present.

Score of 5 because the instruction layer is directionally right but the context layer is nearly empty.

---

## Dimension 2: Banned phrase compliance — 6/10

The system prompt explicitly prohibits: "superfan", "grow your audience", "content creator", "going viral", "monetise", "engage". This is the right list and it is enforced at the system prompt level, which is better than not enforcing it at all.

The gaps:

**1. "Turn fans into..." patterns are not explicitly blocked.** The phrase "turn fans into superfans" is blocked (because "superfan" is blocked), but variations like "turn casual listeners into devoted fans" or "convert followers into paying supporters" are not blocked and Haiku will generate them.

**2. "Boost" and "level up" are not in the banned list.** These are SaaS-adjacent phrases that appear frequently in AI-generated marketing copy and would be invisible to ABLE's copy register.

**3. No before/after examples in the prompt.** The CLAUDE.md copy philosophy has 10 explicit before/after rewrites that define the register. None of these are in the system prompt. Haiku has no calibration examples to distinguish "Stay close." from "Subscribe to get updates."

**4. No test for the output.** The function returns whatever Claude generates. There is no post-processing step that scans for known banned phrases and either retries or filters. If a banned phrase slips through, it surfaces in the UI.

Score of 6: the explicit bans are good, the implicit register gaps are significant.

---

## Dimension 3: Context awareness — 4/10

The function accepts: `artistName`, `genre`, `bio`, `keywords`, `ctaType`, `cardContent`, `campaignState`, `releaseTitle`.

What it does not use cohesively:

- **`bio` is capped at 120 characters** in the context string — enough to pass a flavour but not enough for the model to understand the artist's voice pattern. If an artist has a 300-word bio and their distinctive phrasing is in sentence three, it is invisible.
- **`feel` is not accepted at all.** The onboarding wizard captures a feel quadrant (`raw` / `refined` / `intimate` / `expansive`). This is one of the most distinctive signals ABLE has about how an artist wants to be perceived. It is not passed to the AI copy function.
- **`vibe` as a design concept is not passed.** The 7-vibe table (Electronic/Club, Hip Hop/Rap, etc.) maps to specific aesthetic conventions. The copy function receives a freeform `genre` string — not the canonical vibe ID. If an artist typed "deep house & ambient" in the genre field, the model has no connection to ABLE's Electronic/Club vibe conventions.
- **`campaignState` context in caption mode is thin.** For `live` state, the prompt says `Their ${releaseTitle || 'release'} just dropped.` — that is the entirety of the context. No streaming URL, no release date, no format (EP/single/album), no mood of the release.

Score of 4: the right fields exist in the schema but they are either not used, capped too low, or missing the most distinctive inputs.

---

## Dimension 4: Rate limiting — 2/10

The function comment is direct: "Rate limiting: 1 call per session enforced client-side (honour system). Server-side: no additional rate limiting at this tier — rely on Anthropic quotas."

This is a deliberate decision at this stage — but it is a real risk:

- **No IP-based rate limiting.** A single IP can make unlimited POST requests. If the function URL is discovered or scraped, the Anthropic API key is exposed to unlimited cost.
- **Client-side "honour system" is not rate limiting.** Any developer tools user or curl request bypasses it entirely.
- **Anthropic quotas are a cost backstop, not a rate limit.** When the quota is hit, the function returns 503 — but by then the cost has already been incurred.
- **No per-artist daily limit server-side.** The spec calls for 10 requests per artist per day. This is not enforced anywhere in the function.

Score of 2: acknowledged gap with accepted technical debt. The risk is real.

---

## Dimension 5: Model choice — 6/10

Claude Haiku is the right choice for real-time UI suggestions: fast (sub-2s), cheap (~$0.001 per call), and capable enough for short copy generation. The function currently uses `claude-haiku-4-5-20251001`.

The gap is in quality ceiling:

**Bio mode is quality-sensitive.** An artist's bio is the most visible copy on their page. Getting a bio wrong is more damaging than getting a CTA wrong. Haiku produces serviceable bios but lacks the nuance for register-perfect copy. A Sonnet-class model would meaningfully improve bio quality. The MASTER.md notes that `claude-sonnet-4-6` should be used for the bio writer — the current implementation uses Haiku for all three modes including bio.

**Caption mode is latency-sensitive.** Social captions are low-stakes and high-speed — Haiku is well-suited. Artists expect copy suggestions in real time and are less likely to use the first suggestion verbatim for a caption than for a bio.

**CTA mode is the best fit for Haiku.** 2–4 word button labels, constrained output, fast feedback loop.

Recommendation: split models by mode — Haiku for CTA and caption, Sonnet for bio. The current implementation uses Haiku for everything.

Score of 6: correct choice for two of three modes, wrong choice for the highest-stakes mode.

---

## Dimension 6: Prompt engineering quality — 5/10

Strengths:
- The output format instruction is clear: "Return EXACTLY 3 numbered suggestions, one per line, nothing else: 1. 2. 3."
- The CTA prompt has a useful typeMap that translates technical CTA types into plain descriptions ("pre-saving a release before it drops").
- Bio prompt constraints are explicit: "1 sentence, max 20 words, in first person if it flows naturally."

Gaps:
- **No examples in any prompt.** Few-shot examples dramatically improve output quality for register-sensitive copy. The system prompt bans phrases but never shows the model what on-register copy looks like. Even two before/after examples per mode would meaningfully improve output.
- **Genre is passed as free text, not a structured type.** The model receives "Electronic, R&B / Soul" as a string. It has no connection to ABLE's canonical vibe conventions (Cormorant Garamond / rose / intimate for R&B, Barlow Condensed / cyan / expansive for Electronic).
- **The caption prompt lists no positive examples of the target register.** "Instagram/TikTok style — personal voice, not brand voice" is correct but imprecise. An on-register example would be worth 50 words of instruction.
- **Max tokens at 512 is correct** for the current output format (three short suggestions). This is well-calibrated.

Score of 5: structurally sound, quality ceiling constrained by missing examples.

---

## Dimension 7: Fallback behaviour — 3/10

Current behaviour when the Claude API is unavailable: the function returns `{ error: 'AI service temporarily unavailable' }` (502) or `{ error: 'Internal error' }` (500).

The function has no fallback suggestions. If the API is down, the UI receives an error with no copy to show the artist.

There are no curated human-written defaults:
- No defaults by genre
- No defaults by CTA type
- No defaults by campaign state

For a feature that is part of the onboarding flow (the wizard has a "suggest my bio" moment), API unavailability means the artist sees an error and has to write their own copy with no starting point. For artists who are already uncertain about their bio, this is the worst possible moment to show an error.

Score of 3: the error handling is technically correct (proper HTTP codes, clean JSON error body) but the product experience of an API-down state is unresolved.

---

## Dimension 8: Integration quality — 4/10

The function interface is well-designed:
- Clear input schema with mode + context fields
- Consistent `{ suggestions: string[] }` response shape
- CORS headers correct for Netlify function pattern
- Error responses are consistent JSON

Gaps in integration:

**1. No confidence scores.** All three suggestions are returned with equal weight. The UI has no way to indicate "this one is a better fit for your genre" or "this is the most direct option." The artist must evaluate all three with no guidance.

**2. `suggestions` is always a flat `string[]`.** There is no structured metadata: no `confidence`, no `mode` echo, no `reasoning` field. If the UI wants to surface anything about why a suggestion was made, it has no data to work with.

**3. The parseSuggestions function has a known fragility.** The fallback "split by double newline" path returns raw chunks from the model response without any validation. If Haiku returns something unexpected (a preamble, a markdown header, an apology line), the fallback could return junk strings as suggestions.

**4. No tracking of accepted suggestions.** When an artist accepts a suggestion and uses it as their bio, nothing is recorded. The system cannot learn which suggestions get used and cannot improve its defaults over time.

Score of 4: the plumbing works but the data model is too simple for the product to grow.

---

## What the current system is good for

The current implementation is a working proof of concept. It:
- Generates three options in a consistent format
- Enforces the most important banned phrases
- Returns fast (Haiku latency ~500ms)
- Handles API errors without crashing

What it is not:
- A system that reliably generates on-register ABLE copy
- Protected against abuse
- Capable of learning from artist behaviour
- Designed to degrade gracefully when the API is unavailable

The gap from 4.4 to 8.5+ requires: richer context input, model split by mode, fallback defaults, rate limiting, and structured output. These are all defined in SPEC.md.
