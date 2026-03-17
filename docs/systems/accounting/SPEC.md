# ABLE — Accounting System Spec
**Last updated: 2026-03-16**
**Status: Working spec — review before any financial or pricing decision**

---

## Section 1: Company Financial Structure

ABLE operates as a UK Ltd company. Financial obligations from incorporation:

### Corporation Tax
- Rate: 19% on profits up to £50,000 / 25% above £250,000 (marginal relief between)
- Filing: CT600 annual return to HMRC within 9 months of accounting year-end
- Payment: within 9 months and 1 day of year-end
- Action: set aside 19–25% of all net profit in a separate "tax pot" account from day one

### VAT
- Compulsory registration: when rolling 12-month turnover hits £90,000
- Voluntary registration: consider once ABLE is buying B2B services with significant VAT (Supabase Pro, Netlify, any agency costs). Input VAT reclaim makes this worthwhile earlier than the threshold.
- **Digital services to EU customers:** OSS (One Stop Shop) registration may be required for B2C digital services regardless of the £90,000 UK threshold. Set this up before the first EU paying subscriber.
- **Action:** Register voluntarily at £30–40k ARR to claim input VAT and establish clean records before the threshold forces it.

### Payroll / PAYE
- If James takes a salary: PAYE registration required, RTI submissions monthly to HMRC
- Optimal structure for a single director: salary at personal allowance threshold (£12,570/year) + dividends above that
- Dividend tax rates: 8.75% basic rate / 33.75% higher rate — significantly lower than income tax + NI on salary
- **Action:** Take £12,570/year salary (tax-free with personal allowance) + dividends from profit. Saves approximately £4,000–6,000/year vs taking salary only.
- NI implication: salary at £12,570 just below the Lower Profits Limit — check with accountant whether to pay voluntary NI contributions for State Pension entitlement

### Annual Accounts + Companies House
- Annual accounts: prepared by accountant, filed at Companies House (within 9 months of year-end for private companies)
- Confirmation statement: filed at Companies House annually (£34 fee) — confirms directors, shareholders, registered address
- Accounting year-end: set to 31 March (aligns with UK tax year — simplifies planning)

### R&D Tax Relief
See Section 7 — this is one of the most impactful financial levers available to ABLE.

---

## Section 2: Revenue Recognition

How ABLE correctly records income — critical for accurate MRR tracking and tax filing.

### Monthly Subscriptions
- Recognised in full in the month received
- Stripe charges on subscription anniversary date → that month's revenue
- Simple: month billed = month recognised

### Annual Subscriptions (when offered)
- **Deferred revenue** — do not recognise all at once
- Example: artist pays £108 upfront for annual Artist tier
- Record: £9 revenue per month over 12 months
- Balance sheet: remaining unearned amount sits in "deferred revenue" liability
- Stripe Revenue Recognition handles this automatically if configured — set up before first annual subscription is taken

### Commission Income (Phase 2 — Close Circle / Support Packs)
- Recognised when the underlying transaction completes and settles in Stripe
- Not when the fan places the order — only when funds clear
- Example: fan pays artist £10 via Close Circle. ABLE's 0% cut in V1 — but if/when a platform fee is introduced, it's recognised at settlement.
- Refunds: process in the same accounting period where possible. If a refund crosses an accounting period, create a credit note in the original period.

### Stripe Connect Payouts (artist-to-fan transactions)
- ABLE is a pass-through. Artist money flows from fan → Stripe → artist.
- ABLE does not hold artist funds. ABLE's revenue is only the subscription fee.
- This is important for VAT and regulatory purposes — ABLE is not acting as a payment processor or money transmitter.

---

## Section 3: Key Financial Metrics — Track from Day One

| Metric | Definition | How to calculate | Target |
|---|---|---|---|
| **MRR** | Monthly Recurring Revenue | Sum of all active monthly subscriptions | Track from first paid user |
| **ARR** | Annual Run Rate | MRR × 12 | Target: £60k ARR (£5k MRR) = job exit trigger |
| **Churn rate** | % of paying users who cancel per month | Churned MRR / Starting MRR | Target: <3%/month |
| **Net Revenue Retention** | MRR retained + expansions / starting MRR | (Retained + Upgrades) / Start MRR | Target: >100% (expansions offset churn) |
| **LTV** | Average revenue per customer lifetime | ARPU / monthly churn rate | Target: >£150 |
| **CAC** | Cost to acquire one paying customer | Total acquisition spend / new paid users | Target: <£30 |
| **LTV:CAC** | Return on acquisition investment | LTV / CAC | Target: >5:1 |
| **Gross margin** | Revenue minus direct COGS | (Revenue - Hosting/API costs) / Revenue | Target: >90% |
| **Burn rate** | Net monthly cash outflow | Monthly spend - monthly revenue | Must know this number every month |
| **Runway** | Months until cash runs out | Cash in bank / burn rate | Minimum 6 months always |
| **Payback period** | Months to recoup CAC from one customer | CAC / ARPU | Target: <4 months |

### MRR Tracking Template

Track these components separately each month:
- **New MRR** — revenue from new subscribers
- **Expansion MRR** — revenue from upgrades (Artist → Pro → Label)
- **Churn MRR** — revenue lost from cancellations
- **Contraction MRR** — revenue lost from downgrades
- **Net New MRR** = New + Expansion - Churn - Contraction

This breakdown tells you what's driving growth. If expansion MRR is high, tier gates are working. If churn MRR spikes, there's a retention problem.

---

## Section 4: Software Toolstack

Recommended stack for a UK-based indie SaaS at ABLE's stage:

### Primary: FreeAgent (£19/month)
- UK-specific accounting software built for Ltd companies and freelancers
- Excellent for: PAYE, self-assessment, VAT returns, corporation tax prep
- Stripe integration: auto-imports Stripe payouts and invoices
- Companies House integration: confirms filing dates
- Used by thousands of UK indie founders — good support resources
- **ABLE's recommended primary tool from incorporation**

### Stripe Revenue Recognition (free with Stripe)
- Handles deferred revenue for annual subscriptions automatically
- Revenue waterfall reports out of the box
- Set up subscription billing rules on day one — retroactive cleanup is painful
- Access: Stripe Dashboard → Revenue Recognition

### Dext / Receipt Bank (£15–25/month)
- Mobile app: photograph receipts → auto-categorises expenses
- Integrates with FreeAgent: expenses appear automatically
- Essential for AWS/Netlify/Supabase invoices, any travel, equipment
- **Set up from day one.** Reconstructing a year of expenses from bank statements is brutal.

### When to move to Xero
- Xero makes sense at £200k+ ARR or when you have employees/multiple directors
- Costs more, has more integrations for scale (Salesforce, HubSpot, etc.)
- Not needed for V1 or V2. FreeAgent is sufficient through £500k ARR for a SaaS business.

### Bank account
- **Tide or Monzo Business** — UK business accounts, free or low-cost, integrate with FreeAgent
- Avoid high-street banks for the first 2 years — slower, worse integrations, higher fees
- Separate business and personal from day one. Never mix transactions.

---

## Section 5: Stripe Integration for Accounting

When Stripe is live, this is the financial data flow:

### Revenue flow
```
Fan/Artist pays → Stripe processes → Stripe deducts fees → Stripe pays out to ABLE bank (daily default) → FreeAgent imports payout → Accountant reconciles
```

### Stripe fees (UK, 2026)
- **European cards (UK/EU):** 1.4% + 20p per successful charge
- **Non-European cards (US, etc.):** 2.9% + 30p per successful charge
- **Dispute fee:** £15 per chargeback (refunded if you win)
- **Currency conversion:** +2% if charging in non-GBP
- **Note:** These fees must be factored into pricing. At £9/month Artist tier: Stripe takes ~15p. Net revenue: £8.85. Gross margin calculation should use net-of-Stripe-fees revenue.

### Payout schedule
- Default: daily payouts to linked bank account (T+2 in UK)
- Alternative: weekly or monthly payouts — reduces bank reconciliation complexity
- **Recommendation:** weekly payouts. Reduces number of FreeAgent import events. Easier to reconcile.

### Stripe Connect (artist-to-fan transactions — Phase 2)
- When Close Circle / fan support payments go live, Stripe Connect handles the split
- ABLE's fee (if introduced) is taken at charge time as `application_fee_amount`
- Stripe's Connect fee is ~0.25% + 25p per payout transfer
- ABLE holds artist money only during Stripe's settlement period (2 business days max). This is not "holding" funds in a regulatory sense — standard Stripe Connect behaviour.
- Maintain clear accounting separation: subscription revenue vs. platform fee revenue

### Key Stripe reports to run monthly
- Monthly summary: gross revenue, refunds, fees, net
- Failed charges report: revenue at risk
- Subscription revenue report: MRR snapshot
- Top customers report: identify high-value artists for retention attention

---

## Section 6: Expenses and Cost of Goods

ABLE's cost structure at V1 (near-zero marginal cost is what makes SaaS attractive):

### Fixed monthly costs (infrastructure)
| Item | Provider | Cost | Category |
|---|---|---|---|
| Hosting | Netlify Pro | £19/month | COGS |
| Database/storage | Supabase Pro | £25/month | COGS |
| Transactional email | Resend | £10/month (scale) | COGS |
| Domain | Namecheap / Cloudflare | £1.25/month (£15/year) | Fixed |
| Accounting software | FreeAgent | £19/month | Operating |
| Receipt capture | Dext | £20/month | Operating |
| Analytics | PostHog (free <1M events) | £0/month | COGS |

**Total fixed infrastructure: ~£94/month**

### Variable costs (scale with usage)
| Item | Provider | Est. cost | Trigger |
|---|---|---|---|
| AI copy assistance | Anthropic (Claude API) | £50–200/month | Scales with AI feature usage |
| Stripe fees | Stripe | ~1.5–2% of GMV | Scales with revenue |
| Email broadcasts | Resend | Pay per send | Scales with active Pro users |
| Supabase overages | Supabase | Per GB/requests | Scales with user base |

### Gross margin calculation
At £5k MRR:
- Revenue: £5,000
- Stripe fees: ~£80 (at avg 1.6%)
- Hosting/infra: ~£100
- API costs: ~£100
- **Gross profit: ~£4,720**
- **Gross margin: ~94.4%**

This is typical for a well-run SaaS. Maintain >90% gross margin at all stages. If it drops below 90%, find the COGS leak.

### Developer costs
At V1, James is the sole developer. His time is not a COGS line item — it is founder equity. When contractors or employees are hired, engineer costs become COGS (for product work) or OpEx (for business ops).

---

## Section 7: R&D Tax Relief — Do Not Skip

**ABLE almost certainly qualifies. This is potentially worth £5,000–20,000 in tax relief per year at maturity.**

### The basics
HMRC offers R&D Tax Relief to UK companies carrying out research and development work. For SMEs (revenue under £100m, fewer than 500 employees):
- Additional 86% deduction on qualifying R&D costs (as of April 2023 reform)
- Or a 10% RDEC credit (if already loss-making, the RDEC is cashable)
- Net effect: HMRC effectively subsidises ~21.5p in every £1 of qualifying R&D spend

### What qualifies as ABLE's R&D
ABLE's qualifying activities (document these):
- Development of the **campaign state engine** — novel real-time page switching system based on release dates and manual triggers. No off-the-shelf solution does this.
- Development of the **fan attribution system** — attributing fan sign-ups to specific traffic sources (Instagram, TikTok, direct) in a privacy-compliant way without third-party cookies.
- Development of the **AI copy generation system** — integration of Claude API for artist-voice bio writing, CTA copy variants, and release caption generation. Integration with a novel prompt engineering system tailored to music industry voice registers.
- Development of the **Spotify import / auto-profile population** — parsing and transforming Spotify Web API data into ABLE profile format, with genre detection and vibe preset mapping.
- Development of the **credit network graph** — producer/artist credit confirmation system with bilateral verification and live profile linking.

### What does NOT qualify
- Routine website development (standard layout, navigation, forms)
- Bug fixes on existing functionality
- Design work (unless it involves technical innovation)

### What to record now (from day one)
1. **Time log:** For every hour spent on the qualifying activities above, record date + description + hours. Even a simple spreadsheet. This is what the claim is built on.
2. **Technology uncertainty record:** Write a short note (1–2 paragraphs) for each qualifying activity explaining: what the technical challenge was, what uncertainty existed, what approaches were tried, what worked.
3. **Subcontractor costs:** If any contractors are paid to work on qualifying R&D, their invoices are claimable.

### Who handles the claim
Use an R&D specialist, not a general accountant. Firms like **WhisperClaims**, **R&D Solutions**, or **Ayming** handle this for 10–20% of the tax saving (so it's de-risked — they take a cut only if the claim succeeds).

**When to make first claim:** Once the first accounting year is complete (so: ~12 months after incorporation). Don't leave it — HMRC allows claims up to 2 years after the accounting period, but letting them lapse loses real money.

**Realistic value at Year 1:**
- If James spends 1,500 hours on R&D at notional £50/hour rate = £75,000 qualifying spend
- 86% additional deduction = £64,500 additional deduction
- 25% corporation tax saved = £16,125
- Minus R&D specialist fee (15%): ~£2,419
- **Net saving: ~£13,706** in the first year alone

---

## Section 8: VAT Position

### UK domestic VAT
- Threshold: £90,000 rolling 12-month turnover
- Rate: 20% standard rate on digital services
- When to register voluntarily: at ~£40k ARR — input VAT on Netlify, Supabase, Anthropic API, and any contractor invoices (all B2B services carry VAT) becomes reclaimable
- Flat Rate Scheme: available for businesses with taxable turnover under £150k. Rate for IT sector is ~14.5%. May be simpler than standard VAT if input purchases are low. Compare at registration point.

### EU digital services VAT
- If ABLE has B2C customers in EU countries (artists buying subscriptions from France, Germany, etc.), EU VAT applies from the first sale — there is no de minimis threshold for digital services
- **OSS (One Stop Shop):** register for EU VAT OSS via HMRC. File a single quarterly return covering all EU countries. This is the correct route for a UK SaaS selling into EU.
- **Action:** Register for OSS before taking first EU paid subscriber. Stripe can collect the correct EU VAT if configured — set this up in Stripe Tax settings.

### Colombian and international VAT
- Colombia has IVA (19% on digital services from foreign providers)
- At V1 volumes, Colombian revenue is likely below Colombia's foreign provider registration threshold
- Monitor: when Colombian ARR exceeds ~$60k USD equivalent, seek Colombian tax advice
- Argentina, Chile, Mexico all have similar digital services tax obligations — build the accounting structure to accommodate this when Latin American expansion accelerates

### Stripe Tax
- Stripe Tax can automatically calculate, collect, and remit VAT/sales tax in supported jurisdictions
- Enable from the outset. The cost is 0.5% of transactions where Stripe manages tax — worth it vs. the compliance overhead of manual VAT calculation.

---

## Summary: What to Set Up Before First Paid User

- [ ] UK Ltd company incorporated
- [ ] Business bank account open (Tide or Monzo Business)
- [ ] FreeAgent account set up, connected to bank
- [ ] Dext set up for receipt capture
- [ ] Stripe account configured with weekly payouts
- [ ] Stripe Revenue Recognition enabled
- [ ] Stripe Tax enabled
- [ ] Time log spreadsheet created for R&D tracking
- [ ] Accounting year-end set to 31 March
- [ ] Accountant engaged (find one familiar with SaaS/R&D claims — not a generalist high-street firm)
