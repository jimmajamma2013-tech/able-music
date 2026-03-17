# CRM for the Shift — Using Your Own Tools to Manage Your Own Transition
**Created: 2026-03-16**

> The meta-layer: James uses ABLE's own thinking and infrastructure to manage the most important professional transition of his life. If ABLE is good enough to trust with an artist's fan relationships, it is good enough to organise this.

---

## The thesis

ABLE's core insight — that artists should own the direct relationship with their fans, not rent it from a platform — applies here. James owns his own transition. The tools are in place. This document maps them.

The "CRM for the shift" is not a single tool. It is a coordinated system across five tools, each handling the domain it is best at. The goal: James has a single weekly review moment where he can see progress across every domain simultaneously, in under 10 minutes.

---

## The five tools

### 1. Notion — The Pathway Dashboard

**What it tracks:** The financial checklist, legal checklist, personal readiness, and the overall pre-shift score.

**Structure:**

```
Notion: ABLE Shift Dashboard
├── Pre-Shift Tracker (database view of PRE-SHIFT-CHECKLIST.md)
│   ├── Financial (personal) — 15 items
│   ├── Financial (business) — 12 items
│   ├── Legal/compliance — 10 items
│   ├── Product — 10 items
│   ├── Infrastructure — 8 items
│   ├── Hardware/workspace — 8 items
│   └── Personal — 6 items
├── Monthly Financial Snapshot
│   ├── MRR (current month, 3-month average)
│   ├── Personal savings balance
│   ├── Business account balance
│   ├── Emergency fund progress (% of target)
│   └── ISA balance
└── Decision Log (any major decision: date, what, why)
```

**Why Notion for this:** It is the best tool for free-form tracking of items that have uneven completion rhythms. Some checklist items will sit at "In progress" for months. Notion handles this gracefully. Linear does not.

**Rhythm:** Updated in the weekly Sunday review (30 minutes). Takes 10 minutes of that to update all financial numbers and tick completed items.

---

### 2. Linear — Product and Bug Tracking

**What it tracks:** P0 and P1 bugs that are blockers for the shift. Product features that are preconditions for exit (NPS survey build, GDPR deletion flow, Stripe webhook reliability).

**The pre-shift project in Linear:**

Create a project called `Pre-Shift P0s` in Linear:
- Filter: label "pre-shift-blocker"
- These are the issues that must reach "Done" before exit
- If any item in this project is open on exit day, the exit is delayed

**Why this matters:** Without a designated label, pre-shift blockers can get buried in the general product backlog. Making them a separate named project means you see them every time you open Linear.

---

### 3. FreeAgent — The Financial Dashboard

**What it tracks:** Business revenue, expenses, corporation tax estimate, VAT liability, and — crucially — MRR trend.

**The three numbers to read weekly:**
1. **MRR**: Is it above £5k? Has it been above £5k for 3 consecutive months?
2. **Business account balance**: Is there 3 months of operating costs in there?
3. **Monthly burn rate**: What is the business costing to run? Is it sustainable?

**The monthly P&L:**
FreeAgent generates this automatically. The metric to watch as the exit approaches: is net profit per month (after salary/dividends drawn) positive? If the business is profitable at £5k MRR and covering personal expenses — the trigger is genuinely hit, not just nominally.

**The first-year tax estimate:**
FreeAgent can estimate corporation tax liability as the year progresses. Watch this number and transfer the estimated liability to a separate "tax reserve" within the Starling account (Starling supports multiple "Spaces" which are essentially virtual sub-accounts). Do not spend money that is actually HMRC's.

---

### 4. n8n — The Financial Nervous System

**What it does:** Automates the financial reporting loop so the numbers are always current without manual effort.

**The weekly digest n8n sends to Slack/email (already planned in Part 2 of the master strategy):**
```
Monday 08:00 — weekly digest:
→ Stripe: MRR this week vs last week
→ New paying artists this week
→ Churn this week
→ Business account balance (via FreeAgent API or manual update)
→ PostHog: artist activation rate, fan sign-up rate
```

**The pre-shift trigger alert:**
Build a specific n8n flow:
```
Every 1st of the month:
→ Pull MRR from Stripe
→ Check against 3-month rolling average
→ If MRR > £5,000 AND 3-month average > £5,000:
   → Send alert: "Pre-shift trigger condition met this month. Review PRE-SHIFT-CHECKLIST.md."
→ If not met: silence
```

This means James does not need to manually check whether the trigger condition is met. The system tells him.

---

### 5. The 300-Artist Spreadsheet — James's Personal CRM

The 300-artist outreach list (referenced in the master strategy as the founding-artist CRM) is built in Notion or a simple Google Sheet. It tracks:

| Artist | Platform | Followers | Genre | Status | Notes | ABLE | Paying |
|---|---|---|---|---|---|---|---|
| Name | TikTok/SC/IG | 12k | Indie/Alt | Contacted | — | Yes | No |

This is the top-of-funnel pipeline for ABLE's growth. For the shift, it doubles as James's measure of product-market fit:
- When 50 of these 300 are active on ABLE and posting about it → the producer seeding strategy is working
- When 10 of these 300 have upgraded to Artist tier → there is genuine willingness to pay in James's personal network
- When 3 of these 300 have referred 5 more artists each → organic growth has started

**Update cadence:** Weekly, during the same Sunday review. Takes 15 minutes to mark who has been contacted, who has responded, who is active on ABLE.

---

## The weekly review (30 minutes, Sunday evening)

**Minute 1–5: FreeAgent**
- Open FreeAgent. Read MRR. Read business account balance. Is there anything unusual (unexpected charge, missed payment from a paying artist)?

**Minute 5–10: Notion pre-shift tracker**
- Any items moved to Done this week?
- Any items now In Progress that were Not Started?
- Update the monthly financial snapshot with current numbers.

**Minute 10–15: Linear**
- Are any pre-shift P0s blocked?
- What did we ship this week?

**Minute 15–20: 300-artist spreadsheet**
- Who did I contact this week?
- Who responded?
- Any ABLE sign-ups from this week's outreach?

**Minute 20–25: n8n digest review**
- Did the Monday digest fire correctly?
- Any anomalies in the Stripe numbers?
- PostHog: is artist activation rate healthy?

**Minute 25–30: 5-sentence log entry**
Write the week's log. Five sentences. What moved, what is stuck, one thing for next week.

---

## The information architecture (no duplication)

| Domain | Tool | Single source of truth |
|---|---|---|
| Business finances | FreeAgent | Never in Notion or a spreadsheet |
| Personal finances | Notion (manual monthly update) | One number per category |
| Product bugs / blockers | Linear | Not in Notion or a doc |
| Artist outreach pipeline | Notion or Google Sheet | Not in Linear |
| Automation and alerts | n8n | Not manually checked — it tells you |
| This checklist | PRE-SHIFT-CHECKLIST.md | The git repo is the record |

The discipline: when something belongs in FreeAgent, it does not also go in Notion. When a bug belongs in Linear, it does not also go in a doc. Information in two places means one of them is wrong.

---

## The ABLE self-referential note

ABLE's artist profiles do something James's competitors don't: they give the artist a direct, owned view of their fan list — people who asked to hear from them, not borrowed from a platform. The artist knows where they stand.

The Pathway system does this for James's own transition. He does not need to guess at whether he is ready to exit. He has a live view of every domain. When the checklist is green and the MRR trigger fires, the decision is not a leap — it is a confirmation of what is already measured and prepared for.

That is the point. That is what good infrastructure does.
