# VA Strategy — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is delegation so well-designed that the VA's first output is usable — not because they're exceptional, but because the brief was specific enough that exceptional wasn't required.

---

## Moment 1: The Brief That Comes Back Right First Time

**What it is:** Every task delegated to the VA — AI or human — has a brief format that takes under 3 minutes to write and produces output that requires under 5 minutes to edit. The format is not a template with fill-in-the-blank fields. It is a four-sentence structure: (1) What the output is. (2) Who it is for. (3) What they should feel after reading it. (4) One specific constraint that would otherwise be missed.

The VA never guesses at the constraint. The brief supplies it. If it is an artist outreach DM, the constraint is "do not mention the word platform." If it is a support response, the constraint is "do not use the word 'unfortunately.'" One constraint, stated plainly, is worth four paragraphs of tone guidance.

**Why it's 20/10:** The failure mode of most delegation is not capability — it is underspecification. A VA (AI or human) who receives "write an outreach DM for this artist" and produces something generic is not failing. They are succeeding at the task as described. The 20/10 brief gives them the one specific signal that turns a generic output into a precise one.

**Exact implementation:**

The four-sentence brief format — applied to the 20 VA prompts in VA-STRATEGY.md as a review layer:

```
Brief format:
1. OUTPUT: [What the deliverable is, in one noun phrase]
2. AUDIENCE: [Specifically who reads or receives this]
3. FEELING: [What the reader should feel immediately after reading — one emotion or state]
4. CONSTRAINT: [The one thing that would not otherwise be obvious but changes the output significantly]
```

Example — artist outreach DM:
```
OUTPUT: A direct message to send to an independent artist via Instagram
AUDIENCE: An artist aged 22-30 who gets 20+ DMs per week from tools and platforms
FEELING: Curious — the message is specific enough that they wonder how the sender knows about their work
CONSTRAINT: Never mention a category of product ("link-in-bio", "fan management", "platform"). Reference what the product does, not what it is.
```

This brief structure takes 90 seconds to write. It replaces a paragraph of context the VA would otherwise have to infer. The inference error rate drops from 30% to under 5%.

The 20 system prompts in VA-STRATEGY.md §Part 4 should each have this brief structure prepended as a comment line at the top:

```javascript
// BRIEF: DM for an artist. AUDIENCE: indie artist 22-30, high DM volume.
// FEELING: curious specificity. CONSTRAINT: no category words ("platform", "link-in-bio").
const ARTIST_OUTREACH_PROMPT = `You write personalised DMs...`
```

---

## Moment 2: The Three Things Only James Does

**What it is:** A standing rule, reviewed monthly, that specifies exactly three categories of work that James does and no one else — not the AI VA, not a human VA, not a co-founder if one appears. The three are:

1. **Product decisions about what ABLE will not build.** The NEVER-SHIP list is James's. Any feature that touches scope, philosophy, or the fundamental "who is this for" question is a James decision. A VA can draft options. James chooses.

2. **Relationships with specific artists where ABLE's existence depends on the outcome.** The first 50 artists are not a demographic — they are people with names. Conversations with them are not delegatable. James calls them. James replies personally.

3. **Copy on any surface where tone has been wrong before.** Any page or email section that has received feedback about feeling off — that surface is James's to rewrite. The VA can draft, but James edits from scratch if it has failed before.

Everything outside these three categories is a delegation candidate. The test: "Would this output be better if James did it, or just different?" If it is just different, delegate it.

**Why it's 20/10:** Most founders under-delegate because the criteria for what is delegatable are unclear. The three-category rule converts the question from "should I delegate this?" (hard) to "is this one of the three things?" (easy). The precision of the three categories is what makes the rule workable. Four categories starts to require interpretation. Two categories is too broad. Three is the number.

**Exact implementation:**

The three categories are written into a physical card (or a pinned note in Bear/Obsidian) that James reads at the start of every work week. The format:

```
This week, James does:
1. NO-BUILD decisions (what ABLE will not ship)
2. Artist relationships (first 50 names — talk to them directly)
3. Tone repairs (any copy that has received a "feels off" signal)

Everything else has a VA home. If you are about to do something that is not one of these three — ask why.
```

The card is reviewed monthly. If one of the three is no longer accurate (e.g. by Year 2, the first 50 artists are no longer the core relationship set), it is rewritten. The list is not permanent — it is current.

n8n automation: a weekly Telegram message at 08:00 Monday sends the three-category reminder. Not as a checklist — as a single sentence: "Three things this week: [1], [2], [3]. Delegate the rest."

---

## Moment 3: The Human VA Brief So Clear It Works at Half Attention

**What it is:** When a human VA is eventually hired (at £2k MRR per the VA-STRATEGY.md trigger), their first week is not orientation — it is brief calibration. Every task in Week 1 comes with a written brief that follows the four-sentence format above plus one additional element: an example of a good output and an example of a bad output, side by side, with one sentence explaining the difference.

The good/bad examples are from real past work — a real DM that an artist replied to positively, and a real DM that received no response. The VA reads both, reads one sentence of explanation, and has a calibrated understanding of the quality standard that would take three verbal conversations to establish otherwise.

**Why it's 20/10:** Human VAs calibrate to the quality bar they're shown, not the quality bar they're told. Words like "warm but direct" mean different things to different people. A specific example — "this is warm but direct; this is warm but vague" — is unambiguous. The brief that includes examples reduces the iteration cycle from 5 rounds to 2. At 10–15 hours per week, that compression is worth more than a salary increase.

**Exact implementation:**

For each VA task category in VA-STRATEGY.md §Part 3 (communication drafts, research synthesis, etc.), create a one-page brief template that includes:

```markdown
## Task: [Category name]

**Four-sentence brief format:**
- Output:
- Audience:
- Feeling:
- Constraint:

**Good example:**
[Paste real example — a DM that got a reply, a summary that was acted on]

**Why it worked:**
[One sentence: the specific thing that made it effective]

**Bad example:**
[Paste real example — a DM that got no reply, a summary that missed the point]

**Why it didn't:**
[One sentence: the specific thing that made it ineffective]

**Review criteria:**
[How James will evaluate the output — what he will check in under 2 minutes]
```

These briefs are created as the first task for the AI VA before the human VA is hired. The AI VA generates first-draft examples using real ABLE outputs from the prompt library. James curates the good/bad examples from that output. The document is ready before the human VA's first day.

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when James's first task to the human VA comes back in the first attempt as something he would have written himself — not because the VA is exceptional, but because the brief gave them everything they needed to find the right register before they typed a word.
