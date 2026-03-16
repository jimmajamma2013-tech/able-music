# ABLE — Accounting System Analysis
**Date: 2026-03-16**
**Author: Assessment of accounting/SPEC.md, PATH-TO-10.md, FINAL-REVIEW.md**
**Stage: Pre-revenue, pre-incorporation**

---

## Current State Assessment

ABLE's accounting system exists entirely as specification. The company is not yet incorporated as a UK Ltd. No Stripe account is live. No FreeAgent account exists. No R&D time logs have been started. The financial structure, revenue recognition model, tax obligations, and software toolstack are all correctly documented and ready to execute — but the gap between "complete spec" and "live accounting system" is substantial.

This is the correct state for the current product stage. A company that incorporated and set up full accounting infrastructure before having a single paying customer would be over-investing in process. The spec documents the right decisions. The question is whether those decisions are made at the right time.

**What exists and is correct:**
- UK Ltd company structure decision (correct for a SaaS with global ambitions)
- Revenue recognition model for monthly and annual subscriptions
- R&D tax relief qualification assessment with specific qualifying activities named
- Toolstack selection (FreeAgent, Dext, Stripe Revenue Recognition)
- EU VAT / OSS obligation identified before first EU customer
- Salary/dividend structure outlined (with appropriate caveats about personalised advice)
- Burn rate tracking framework
- MRR component definitions (new, expansion, churn, contraction, net new)

**What does not yet exist:**
- Incorporated UK Ltd company
- Business bank account
- Any accounting software instance
- R&D time logs
- Any financial data whatsoever
- An engaged accountant
- Stripe live keys
- A single metric with a real number in it

---

## 20-Angle Scoring

### 1. Legal Structure Decision (1–10)
**Score: 8**

UK Ltd is the right entity. It separates personal and business liability, enables the dividend/salary split, creates the structure for R&D claims, and signals professionalism to investors. The spec correctly identifies this without hedging into "maybe sole trader to start" territory — the sole trader path creates accounting headaches when you incorporate later.

Gap: company not yet incorporated. Score reflects quality of decision, not execution.

### 2. Corporation Tax Planning (1–10)
**Score: 7**

The 19%/25% tiered rate is correct (as of April 2023 reform). The instruction to "set aside 19–25% of net profit immediately" is the right discipline. The CT600 filing timeline (9 months after year-end) is accurate.

Gap: no year-end established, no tax pot opened, no accountant engaged. Conceptually sound, operationally zero.

### 3. VAT Position (1–10)
**Score: 8**

The spec correctly identifies the £90,000 threshold, the voluntary registration argument at £30–40k ARR, the flat-rate scheme option, and — critically — the EU digital services VAT obligation from the first sale. The OSS registration requirement is one of the most commonly missed obligations by UK SaaS founders going international; having it documented before launch is worth noting.

Gap: the voluntary registration decision point (£30–40k ARR) is correctly positioned but the decision criteria could be sharper. The spec says "input VAT reclaim makes this worthwhile earlier" — add the calculation showing at what monthly B2B invoice spend voluntary registration becomes net positive.

### 4. R&D Tax Relief (1–10)
**Score: 7**

The five qualifying activities are well-identified and specific:
- Campaign state engine
- Fan attribution system (privacy-compliant, no third-party cookies)
- AI copy generation with novel prompt engineering
- Spotify import / auto-profile population
- Credit network graph with bilateral verification

The Year 1 value estimate (£13,706 net of specialist fees) is credible and conservative. The instruction to start time logs from "today if qualifying work is being done" is correct — not from incorporation.

Gap: no time log started. The biggest risk in the R&D claim is not technical qualification — it is retrospective memory reconstruction. Every day without a log is a recoverable loss in Year 1 but an unrecoverable one after 2 years (claim deadline).

### 5. Salary/Dividend Structure (1–10)
**Score: 6**

The £12,570 salary + dividends framework is textbook-correct for a UK Ltd director. The NI implication note (voluntary Class 2/3 for State Pension) is a detail most founders miss. The Portugal NHR flag in FINAL-REVIEW.md is the most important caveat in the entire document — it correctly identifies that the standard UK structure could be suboptimal if James establishes Portuguese tax residency.

Gap: the NHR analysis is flagged as a question rather than answered. James should either commit to a jurisdictional decision or explicitly document that the NHR strategy is under consideration and the salary/dividend structure is provisional. The current state is correct — consulting a specialist before implementing — but it is a known unknown that needs resolution before the first salary draw.

Score of 6 reflects the "pending personalised advice" status, not the quality of what's written.

### 6. Revenue Recognition (1–10)
**Score: 9**

The monthly vs annual subscription treatment is correct. The deferred revenue concept (annual subscriptions: £9/month recognised, not £108 upfront) is industry-standard and the Stripe Revenue Recognition configuration requirement is correctly flagged as "set up before first annual subscription."

The Stripe Connect pass-through architecture (ABLE is not holding artist funds, not acting as a payment institution) is an important regulatory positioning that most small platforms get wrong.

Only minor gap: no explicit note on how to handle refunds that cross accounting periods. The spec mentions it for commission income but not for subscriptions.

### 7. MRR Tracking Architecture (1–10)
**Score: 8**

The five-component MRR model (new, expansion, churn, contraction, net new) is the right framework. The target tracking system (Sunday morning ritual, trend line week-over-week) is practical. The alert mechanism (>5% week-over-week drop triggers investigation) is specific and actionable.

Gap: no live implementation. Score reflects design quality. When Stripe goes live, the first MRR calculation will be done manually — the spec does not include the specific Stripe report paths to run. Add a "first MRR calculation" micro-procedure: which reports to pull, in which order, to produce the five-component breakdown for the first time.

### 8. Burn Rate Visibility (1–10)
**Score: 7**

The spec correctly identifies fixed costs (~£94/month infrastructure) and variable costs (AI API, Stripe fees, email scale). The "minimum 6 months runway always" rule is the right floor. The instruction to know burn rate "without checking" — absorbed through consistent tracking — is the right discipline for a solo founder.

Gap: the first profitability milestone calculation ("~£200 MRR covers all infrastructure") is based on the £94/month fixed cost figure. This is correct for current toolstack only. When accounting software (£19/month FreeAgent) and receipt capture (£20/month Dext) are added, fixed costs rise to ~£133/month. The break-even MRR is closer to £150 — still achievable quickly, but the spec should use the full cost figure.

### 9. Stripe Integration (1–10)
**Score: 8**

The Stripe integration architecture (weekly payouts, Revenue Recognition, Stripe Tax) is correctly specified. The fee structure is accurate (European cards: 1.4% + 20p). The instruction to set up Stripe Tax before the first payment — not the first EU payment — is correct practice.

Gap: the spec describes what to configure but not where in the Stripe dashboard to find each setting. For a first-time Stripe setup, a "Stripe configuration checklist" (3-4 specific settings with dashboard paths) would close the gap between reading and doing.

### 10. EU/OSS VAT Compliance (1–10)
**Score: 8**

OSS registration via HMRC is the correct route for UK-based companies selling B2C digital services in the EU. The instruction to register before the first EU paid subscriber is correct — there is no de minimis for digital services to EU consumers. The Stripe Tax test procedure (test a French card, verify 20% VAT) is specific and executable.

Gap: the spec does not address what happens during the OSS registration processing period (which can take 6–8 weeks). If an EU subscriber converts before registration is complete, there is a transitional compliance risk. Add a holding instruction: "Do not actively market to EU subscribers until OSS registration confirmation is received."

### 11. Toolstack Quality (1–10)
**Score: 9**

FreeAgent + Stripe + Dext is the correct stack for this stage and revenue level. The "when to move to Xero" guidance (£200k+ ARR or employees) prevents premature upgrade. The bank recommendation (Tide or Monzo Business over high-street banks) is correct for integration quality and cost.

Gap: Dext is flagged as potentially overkill at V1 if expenses are primarily online (auto-imported). The spec notes this but leaves the decision open. Given that ABLE's primary expenses are all digital B2B invoices (Netlify, Supabase, Anthropic API) — all of which auto-import via FreeAgent's Stripe connection or bank feed — Dext may not justify its £20/month until there are physical receipts (travel, equipment, events). Remove Dext from the "before first paid user" checklist; add a trigger: "Set up Dext when monthly physical expenses exceed £100."

### 12. LTV:CAC Framework (1–10)
**Score: 7**

The LTV:CAC definitions are correct. The channel-by-channel tracking instruction (UTM parameters on all acquisition links) is the right methodology. The "review before every marketing spend decision" instruction will prevent the most common CAC waste.

Gap: no data yet. The benchmarks (LTV >£150, CAC <£30, LTV:CAC >5:1) are aspirational but not grounded in ABLE-specific data. The payback period target (<4 months) is achievable only at sub-£25 CAC with £9/month ARPU — the maths work, but barely. At first raising, be prepared to explain how the payback period improves with tier migration to Pro.

### 13. Annual Accounts Process (1–10)
**Score: 7**

The year-end rhythm (March 31, aligned with UK tax year) is a good decision. The accountant kickoff email template, the "for accountant" Google Drive folder, and the monthly reconciliation habit are all practically correct.

Gap: the spec assumes a SaaS-aware accountant is already identified. Finding an accountant who understands SaaS metrics, R&D claims, and potentially international tax structures (Portugal NHR) is not a trivial task in the UK. The spec should include a "how to find the right accountant" subsection: specific questions to ask when vetting (Do you work with SaaS companies? Have you filed R&D claims? Do you have clients with international residency?).

### 14. HMRC Compliance Readiness (1–10)
**Score: 6**

The FINAL-REVIEW.md question "Can ABLE survive an HMRC enquiry tomorrow?" is the right stress test. The answer is currently "no" — not because the accounting is wrong, but because there is no accounting yet.

Gap: the compliance checklist (CT600, VAT returns, Confirmation Statement, PAYE if salary drawn) is correct but unprioritised. For a pre-revenue company in the first 12 months, the actual obligation list is shorter: Confirmation Statement (year after incorporation, £34), first year CT600 (due 9 months after first accounting year-end). No VAT until threshold. No PAYE until salary is drawn. The spec presents the full mature company compliance picture without a clear "Year 1 actual obligations" section.

### 15. GDPR / Financial Data Handling (1–10)
**Score: 6**

The accounting spec does not address GDPR implications for financial data. Fan email addresses, artist profile data, and subscription data all constitute personal data under GDPR and must be handled accordingly. FreeAgent stores customer (artist) billing data; Supabase stores fan data. Both have GDPR implications.

Gap: the accounting spec and the complaint resolution spec both touch GDPR but from different angles. A single note cross-referencing the GDPR deletion procedure in the complaint resolution spec — specifically noting that a deletion request must include cancellation of the Stripe subscription and removal from FreeAgent customer records — would close this gap.

### 16. International Tax Exposure (1–10)
**Score: 6**

The Colombian IVA note (19% on digital services, threshold ~$60k USD ARR) is the most specific international tax observation in the spec. The general acknowledgment that Argentina, Chile, Mexico have similar obligations is directionally correct.

Gap: the Portugal NHR analysis is flagged but unresolved. If James establishes Portuguese tax residency, the entire UK salary/dividend optimisation changes. This is not just a "consult a specialist" note — it is a strategic decision that affects the company's financial architecture. The spec should either: (a) document the NHR analysis in full (10-year flat 10% rate on foreign-source income, implications for the UK-sourced dividend), or (b) explicitly defer it to a separate document and set a decision deadline.

### 17. Pension Contributions (1–10)
**Score: 5**

The FINAL-REVIEW.md mentions employer pension contributions as a CT reduction strategy ("contributing £20k/year to a SIPP from the company is worth ~£5,000 in CT savings at Artist Pro scale"). This is correct and potentially significant — but it is buried in a footnote rather than given its own treatment.

Gap: a solo founder with no employees and no pension contributions is leaving money on the table from the first profitable year. Even at £1k MRR, a modest employer contribution (£3–5k/year) meaningfully reduces the CT liability. This deserves a dedicated section in the spec, not a parenthetical.

### 18. Cash Flow Discipline (1–10)
**Score: 8**

The "never mix business and personal transactions" instruction is the most important accounting discipline for a first-time company director, and it is stated clearly. The "tax pot" concept (set aside 19–25% of net profit from day one) is excellent practice that most founders discover only after receiving their first CT bill.

Gap: the spec does not address the timing mismatch between Stripe payouts (daily/weekly) and tax obligations (quarterly VAT, annual CT). A simple cash flow calendar — showing when each obligation falls due and how to reserve for it — would make this section 10/10.

### 19. Contractor/Freelancer Accounting (1–10)
**Score: 5**

The spec is almost entirely focused on the solo-founder scenario. When ABLE hires its first contractor (designer, developer, community manager), there are specific accounting obligations: IR35 assessment (is the contractor inside or outside?), invoice processing, expense treatment. The spec does not address this at all.

Gap: add a brief "first contractor" section covering: IR35 basics for a solo-founder company, invoice requirements (must have invoice number, VAT number if registered, description of services), and the accounting treatment (contractor invoices as operating expenses, VAT reclaimable if registered).

### 20. Financial Model Integration (1–10)
**Score: 7**

The MRR tracking framework in the accounting spec and the financial model in the investor readiness spec should be the same underlying data. Currently they are defined in separate documents with overlapping but not identical frameworks.

Gap: the investor model uses "conservative/base/optimistic" scenarios; the accounting spec tracks actuals. These need to be reconciled into a single spreadsheet where actuals populate automatically and scenarios are recalculated against them. The spec correctly identifies that FreeAgent exports are the primary data source — but the link between FreeAgent export and the investor model spreadsheet is not documented.

---

## Gap Summary

| Gap | Severity | When to address |
|---|---|---|
| Company not yet incorporated | Critical | Before first paying customer |
| No R&D time logs started | High | Today — qualifying work is underway |
| No accountant identified | High | Before incorporation |
| Dext timing is premature | Low | Reassess at 3 months post-launch |
| Salary/dividend pending NHR decision | Medium | Before first salary draw |
| No Year 1 obligations-only checklist | Medium | Before incorporation |
| No pension strategy | Medium | At first profitable year |
| Portugal NHR unresolved | High | 90-day decision deadline |
| No contractor accounting section | Low | Before first contractor engagement |
| Financial model not linked to FreeAgent | Medium | When Stripe is live |

---

## Competitive Context

ABLE's accounting needs are standard for a UK-based SaaS startup at pre-revenue stage. The distinguishing factors versus a typical SaaS:

**Music sector nuance:** Artists pay monthly subscriptions but their own revenue is seasonal (album cycles, tour seasons). This may create seasonal MRR patterns — spikes around New Year (planning a release year) and drops in summer. The accounting system should be designed to distinguish seasonal churn from structural churn.

**Stripe Connect complexity (Phase 2):** When fan-to-artist payment flows are introduced, ABLE's accounting becomes significantly more complex than a pure SaaS. The spec correctly identifies that ABLE is a pass-through — but the FCA payment institution analysis needs to be confirmed by a solicitor before any direct payment feature is built. This is not an accounting question, but it has accounting implications.

**R&D claims in UK music tech:** Competitors like Linktree and Beacons are US-headquartered and cannot claim UK R&D relief. This is a genuine competitive advantage in the cost structure. A UK-based competitor (Big Link, a smaller UK-native tool) would face the same accounting environment. ABLE's head start on R&D documentation is a real differentiator if the claim is well-prepared.

---

## What "10/10" Looks Like for This System

A 10/10 accounting system for ABLE means:

1. **Incorporated and configured:** UK Ltd company live, business bank account open, FreeAgent connected to Tide/Monzo, Stripe payout schedule weekly, Stripe Tax live, Stripe Revenue Recognition configured.

2. **R&D claim submission-ready:** 90+ days of time logs, technology uncertainty notes for all 5 qualifying activities, R&D specialist identified and briefed.

3. **HMRC enquiry-survivable:** Every Stripe transaction in FreeAgent, receipts attached, R&D logs complete, CT600 filed on time, VAT returns current, Confirmation Statement paid.

4. **Salary/dividend structure optimised:** Personalised advice received, NHR decision made, implementation live.

5. **Metrics real-time:** MRR known every Sunday without opening Stripe. Burn rate known every Monday without opening FreeAgent. LTV:CAC tracked per channel from the first paying customer.

6. **Quarterly rhythm established:** The first quarterly OSS VAT return filed (if EU customers). Monthly reconciliation habit embedded. Annual accounts filed by month 7, not month 9.

**Current distance from 10/10:** The spec is a 9/10. The execution is 1/10. The aggregate system score is approximately **4/10** — a complete plan with zero operational substance. This is appropriate for the current stage and will change rapidly once incorporation and the first paying customer happen.

---

*Next action: Engage an accountant familiar with SaaS companies and R&D claims before incorporation. Start the R&D time log today — the campaign state engine development is qualifying work.*
