# ABLE Accounting System — Final Review
**5 quality gate questions before this system is considered complete**

---

These are the questions that expose gaps. If any answer is "no" or "unclear," the system is not at 10.

---

## Q1: Can ABLE survive an HMRC enquiry tomorrow?

An HMRC enquiry could arrive at any time, covering corporation tax, VAT, PAYE, or R&D claims. If HMRC requested a full review of ABLE's books for any given year, would the records be complete, clean, and defensible?

**What a "yes" requires:**
- Every Stripe transaction is in FreeAgent, correctly categorised, reconciled to bank statements
- All expenses have receipts (stored in Dext, attached to FreeAgent transactions)
- R&D time logs are detailed, dated, and backed by technology uncertainty notes
- VAT returns are filed and paid, with supporting records
- Annual accounts are filed, signed, and stored
- Any director loans or unusual transactions are documented with clear rationale

**Current gap:** No live company yet. This question becomes a live review checklist at the end of every financial quarter.

**When to answer "yes" with confidence:** after the first full financial year, reviewed by the accountant, with clean records from day one.

---

## Q2: Does every financial decision trace back to a metric in this spec?

Every pricing change, tier gate decision, marketing spend, and tooling purchase should be justifiable against the metrics defined in Section 3. If a decision can't be traced to MRR, CAC, LTV, churn, or gross margin, it probably shouldn't be made.

**Test cases:**
- "Should ABLE spend £500 on a TikTok ad test?" → Yes: estimated CAC <£30? What's the target artist count from this? What does that add to MRR?
- "Should ABLE offer a 50% discount to first 10 users?" → What does this do to LTV? What's the CAC offset? Will these users be good retention signals or price-sensitive churners?
- "Should ABLE add a new tool (e.g., Intercom for support)?" → Does the cost appear in the burn rate? Does it reduce churn enough to justify the gross margin impact?

**Path to yes:** before any significant financial decision (>£100), run it through the metric framework first. Note the expected impact. Review in 30 days.

---

## Q3: Is the R&D claim preparation realistic and defensible?

R&D claims are scrutinised more heavily since 2023 HMRC reforms. The claim for ABLE's first year needs to be specific about which activities qualify, what the technical uncertainty was, and what James's time allocation was.

**What a defensible claim looks like:**
- Time log with daily entries, not monthly estimates
- Each qualifying activity has a one-paragraph "technical uncertainty statement" — written at the time, not reconstructed
- The claim is prepared by a specialist (not self-filed)
- The claim document references specific code components, not just "built a website"

**Red flags that get claims rejected:**
- Generic descriptions ("developed software features")
- Time estimates that are suspiciously round numbers
- Activities that are routine maintenance, not innovation
- No contemporaneous evidence (logs written after the fact)

**Current state:** Qualifying activities are identified. Time log not yet started (no live company).

**When to answer "yes":** when the time log has 90 days of entries and the technology uncertainty notes exist for at least 3 of the 5 qualifying activities.

---

## Q4: Does the VAT and EU compliance setup actually work — tested, not assumed?

Stripe Tax and OSS registration can be configured in theory and still fail in practice. A French artist who subscribes to ABLE Artist tier and receives an invoice with the wrong VAT rate creates a real liability — both for the artist's own VAT return and for ABLE's OSS filing.

**Test this before going live with EU paid users:**
1. Create a Stripe test subscription with a French billing address
2. Verify: does Stripe charge 20% French VAT?
3. Generate the invoice: does it show the correct VAT number and rate?
4. Export the Stripe Tax report: does it correctly categorise this transaction as France / FR-VAT / standard rate?
5. Does FreeAgent correctly import this with the VAT element separated?

**Also test:** UK voluntary VAT registration (when triggered). Place a test UK transaction and verify UK VAT at 20% is correctly applied and appears in FreeAgent as a separate VAT liability.

**When to answer "yes":** after a complete end-to-end test with a real EU test transaction, and after confirmation from the accountant that the OSS filing matches the Stripe Tax export.

---

## Q5: Is the salary/dividend structure actually optimised for James's tax position?

The salary/dividend split described in Section 1 (£12,570 salary + dividends from profit) is the standard recommendation but the optimal structure depends on James's specific circumstances — specifically: pension contributions, other income sources, whether NHR in Portugal is active (which changes everything), whether James takes on a co-founder or contractor, and the company's profit trajectory.

**Scenarios where the standard structure is NOT optimal:**
- If James moves to Portugal and activates NHR: NHR provides a 10% flat rate on foreign-source income for 10 years. A UK company paying dividends to a Portuguese-resident director is foreign-source income under NHR. The entire dividend/salary structure needs to be designed around this.
- If the company is making losses (early stage): salary is fully deductible but dividends can only be paid from distributable profits. In a loss year, salary may be the only tax-efficient extraction method.
- If there's a pension: employer contributions from the company are a pre-tax expense — can significantly reduce corporation tax. At Artist Pro scale, contributing £20k/year to a SIPP from the company is worth ~£5,000 in CT savings.

**Action items:**
- Engage a tax advisor (not just an accountant — a specialist who works with UK Ltd company directors and expats) before the first tax year-end
- Specifically ask about: NHR implications, pension contribution timing, and the optimal salary level given NI thresholds
- Don't implement the salary/dividend structure without a personalised review — the spec gives the framework but the numbers need to be confirmed against James's specific position

**When to answer "yes":** after a 1-hour consultation with a UK tax advisor (ideally one familiar with NHR/Portuguese tax treaty) has confirmed or adjusted the recommended structure.
