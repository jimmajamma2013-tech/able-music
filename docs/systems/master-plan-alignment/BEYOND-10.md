# Master Plan Alignment — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the week where every decision made — in code, in docs, in how James spent Tuesday — points at the same destination.

---

## Moment 1: The STATUS.md That Orients in 90 Seconds

**What it is:** A `docs/STATUS.md` maintained to the standard where any person — a new co-founder, a returning-from-holiday James, a fresh Claude Code session — reads it and knows the complete build state in 90 seconds.

**Why it's 20/10:** Direction drift does not happen in dramatic moments. It happens in the accumulation of sessions where nobody is quite sure what the current state is, so something gets rebuilt, or the wrong thing gets polished, or a decision that was already made gets re-debated. STATUS.md maintained at 20/10 standard eliminates this. It is not a project management tool. It is a shared reality — the single document that means everyone (human or AI) starts from the same place.

**Exact implementation:**

`docs/STATUS.md` — exact structure, maintained after every meaningful session:

```markdown
# ABLE — Build Status
**Last updated: [YYYY-MM-DD HH:MM]**

## What is live right now
[One sentence per active file: what it does and what state it's in]
- `able-v7.html` — Artist public profile. All 4 campaign states working. Fan capture live.
- `admin.html` — Artist dashboard. Campaign HQ, fan list, analytics. Shows page working.
- `start.html` — Onboarding wizard. 3 steps + done screen. Functional.
- `landing.html` — Marketing page. Static. No known issues.

## P0 right now
[The single most important build task — one sentence, links to the spec]
Spotify import: read from the artist's Spotify profile URL and pre-populate release cards.
Spec: `docs/systems/spotify-import/SPEC.md`. ETA: next session.

## Known issues
[Actual bugs or regressions — not aspirational gaps]
- Glass theme: backdrop-filter drops to 0fps on iPhone 12 and older. Known, not blocking.

## What was just shipped
[Last 3 commits, one line each]
- feat: fan CRM campaignState field — captures which mode fan signed up in
- fix: gig mode expiry — was not resetting to profile state after timestamp passed
- docs: investor-readiness PATH-TO-10 — gap analysis and action plan

## Next 3 actions
1. [First specific action — file + feature]
2. [Second specific action]
3. [Third specific action — or "TBD after P0 lands"]
```

The rule: if STATUS.md was not updated in this session, update it before the session ends. 3 minutes. Every time.

---

## Moment 2: The Decision Filter in Practice

**What it is:** A week where the decision filter from `MASTER-PLAN-ALIGNMENT.md` Part 4 is applied to three real decisions — and one of them gets a "no" that saves two weeks of misdirected work.

**Why it's 20/10:** The decision filter has five questions. Most decisions pass four and stumble on one. The one that stumbles is usually the most revealing question — often "does this get James closer to £5k MRR?" when the answer is "it makes the product marginally better for existing users but does nothing for acquisition." That clarity — the realisation that a week of polish work answers the wrong question at this stage — is the filter working. The filter saves time not by making decisions faster, but by making the right decision once rather than the wrong decision twice.

**Exact implementation:**

The filter, applied as a literal checklist before any work block above 4 hours:

```
Decision: [what you're about to do]
Date: [today]

1. Does this get closer to £5k MRR?           [Yes / No / Unclear]
2. Does this support the nomad lifestyle?      [Yes / No / Neutral]
3. Does this support the C5/C6 condition?      [Yes / No / Neutral]
4. Does this use the £30k budget wisely?       [Yes / No / N/A]
5. Does this increase the AI leverage advantage? [Yes / No / Neutral]

Score: [X/5 yes]
Decision: [Go / No-go / Defer to: date]
```

If a decision scores 2 or below — stop. Run the 24-hour rule. Come back to it tomorrow.

The format is not important. The habit is. When the filter becomes a reflex rather than a procedure, it is working at 20/10.

---

## Moment 3: The Week Everything Points the Same Direction

**What it is:** A week where the commit messages, the doc updates, the investor update email, the marketing post, and the health log all tell the same story — progress toward the same destination, measured in different dimensions.

**Why it's 20/10:** Alignment is easy to describe and difficult to sustain. The practical test is this: pick any action taken this week — a specific commit, a specific hour of work — and trace it back to the North Star. If the chain is broken anywhere, the alignment system is not working. When the chain is unbroken — commit serves P0, P0 serves MRR, MRR serves job exit, job exit serves nomad lifestyle — the week feels different. There is no wasted motion. Not because every moment was productive, but because nothing was working against anything else.

**Exact implementation:**

Weekly 5-minute check — run every Sunday, before the week review, before planning Monday:

```
This week's most important action: [one sentence]
Does it trace to the North Star?
  → Does it serve: [specific domain]?
  → Does that domain serve: job exit / health / nomad lifestyle / ABLE growth?
  → Is the chain unbroken?

If yes: note it. The alignment system is working.
If no: what broke the chain? [One honest sentence]
       What would have been the right action instead? [One sentence]
```

This is not a productivity review. It is a direction check. The goal is not to do more. The goal is to do the right things — and to notice quickly when something drifts.

The monthly alignment review from the SPEC then aggregates the weekly checks. The quarterly review is where course corrections happen. But the weekly check is what prevents the drift from accumulating in the first place.

---

## The 20/10 test

James looks at the last 30 days of commits, decisions, and health log entries and can trace each one back to the North Star without having to justify any of them. Nothing contradicts anything else.

---

*See also: `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` — the 10 domains, alignment check template, decision filter, and quarterly review process*
