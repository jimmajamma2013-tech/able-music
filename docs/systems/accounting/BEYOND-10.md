# Accounting — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when the accounting system produces moments of relief, not just compliance — when the numbers arriving in your bank account confirm that the structure you built was right.

---

## Moment 1: The R&D Credit Landing

**What it is:** The specific moment the first R&D tax credit hits the ABLE business bank account — a real sum, potentially £13,000+ — which arrives because you logged your hours from day one, wrote the technology uncertainty notes monthly, and used a specialist.

**Why it's 20/10:** This is not a refund. It is HMRC validating that what you built is genuinely novel. The campaign state engine, the fan attribution system, the AI copy integration — they count as research and development. The credit is proof that the work is real. It also funds the next six months of operations without a single new subscriber.

**Exact implementation:**
- Create `r&d-log.csv` on the day you write your first qualifying line of code. Columns: `date`, `hours`, `system` (e.g. "campaign-state-engine"), `description`, `uncertainty` (brief note on what wasn't known at the start). One row per working day. Takes 2 minutes.
- Add a monthly recurring task (first Sunday of the month): write a `technology-uncertainty-note` for each active R&D system. Format: one paragraph, 100–150 words. What was the technical challenge? What approaches were tried? What worked? Save to `docs/rd-evidence/YYYY-MM.md`.
- Use WhisperClaims for the first claim. Their scoping call (free) will confirm qualifying activities and set expectations. Budget for their 15% fee in the "tax pot" account alongside the 19–25% corporation tax reserve.
- When the credit arrives: record the exact Supabase commit hash and admin.html version number that was in production on the day the claim was assessed. That specificity is what makes a claim robust under HMRC scrutiny.
- The specific copy for the bank statement moment, written in your own log: "Year 1 R&D credit: £[amount]. Campaign state engine, fan attribution, AI copy integration. Confirmed qualifying by WhisperClaims. [Date]. This funded [number] months of runway."

---

## Moment 2: The Portugal Calculation

**What it is:** The exact financial model that proves the Portugal NHR move pays for itself — run in a spreadsheet before the move, verified in FreeAgent six months after it.

**Why it's 20/10:** The decision to move is not just lifestyle. It is financial. When the model shows that a £30k salary paid to yourself in Portugal costs £X less in combined UK/PT tax than the same salary in the UK, the move stops being a dream and becomes an obvious financial decision. The moment the model closes with a positive number, the anxiety about "can I afford this?" is replaced by "I cannot afford not to."

**Exact implementation:**
The pre-move comparison model (build this in a spreadsheet before booking the flight):

```
UK structure (current):
- Salary: £12,570 (at personal allowance, zero income tax, NI: ~£480/yr)
- Dividends: £[profit - £12,570]
- Dividend tax at basic rate: 8.75% on dividends above £1,000 allowance
- Total personal tax: £[calculate]
- Cost of living: £[monthly spend × 12]
- Net disposable: £[salary + dividends - tax - living costs]

Portugal NHR structure (post-move):
- NHR status: 10% flat tax on foreign-source income for 10 years
- Company remains UK Ltd (no corporate relocation needed for Phase 1)
- Dividends from UK Ltd to Portuguese resident: taxed at 10% (NHR) vs 8.75% UK basic rate
  — difference is small, but cost of living is the primary gain
- Monthly cost of living in Lisbon/Porto vs London: approximately 35–45% lower
- Savings on rent alone: £[London rent] - £[Lisbon rent] × 12
- Net disposable: £[calculate]

The number that changes the decision: [Portugal disposable] - [UK disposable] = £[annual gain]
Divide by monthly living costs in Portugal to see: [N] months of additional runway per year.
```

Run this model with real numbers before the move. Verify it against actual FreeAgent data six months after. The goal is to close the loop: the model predicted £X, the actuals show £Y, the difference is £Z. Document why the difference exists. This is the financial rigour that means the next location decision (Colombia? Tbilisi?) gets the same treatment — and you trust the model because you verified it once.

---

## Moment 3: The Stress-Free HMRC Envelope

**What it is:** Receiving a letter from HMRC — or seeing an HMRC-related email — and feeling nothing. Not dread, not the start of a sick feeling. Nothing. Because the system works.

**Why it's 20/10:** For most independent business owners, HMRC correspondence triggers a cascade of low-grade panic. For ABLE at 20/10, it is the equivalent of a bill arriving in the post: something to process, not something to fear. This state is achievable. It requires the right infrastructure to have been built before the correspondence arrives.

**Exact implementation:**
- Before ABLE makes its first pound: create a "for accountant" folder in iCloud Drive. Every HMRC letter, VAT registration correspondence, CT600 filing confirmation, R&D claim receipt goes here immediately on receipt. No sorting, no analysis — just file it. At year-end, this folder is your accountant's starting point.
- Set a dedicated "tax pot" bank account (a Tide or Monzo pot, not a separate account). Every week, transfer 22% of any revenue received. Not monthly — weekly. The accumulation is visible and automatic.
- Monthly: spend 20 minutes reconciling FreeAgent to the bank statement. Not 2 hours at year end. 20 minutes monthly. This converts "I have no idea if the numbers are right" into "I know exactly where we are."
- Annual: file accounts by month 7, not month 9. Two months early. This single habit removes the end-of-year scramble. Your accountant has time to review properly. You have time to act on any tax planning opportunities they surface ("you could make a £5k pension contribution before year-end to reduce corporation tax").
- The test that proves this is working: a VAT inspection notice arrives. You spend 45 minutes pulling together the requested documents from the "for accountant" folder and FreeAgent. You send them. You hear nothing further. That is 20/10 accounting.

---

## The 20/10 test

You know the accounting system has crossed from excellent to extraordinary when a tax year closes, you pay the amount FreeAgent predicted two months ago, and there is nothing to explain to your accountant because everything was already documented.
