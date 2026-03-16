# ABLE Accounting System — Path to 10
**What makes this accounting system a 10/10 across every dimension**

---

## How to read this file

Each angle is scored on the current state of the spec and the gap to a 10. The path to 10 is the specific action, not a vague goal.

---

## 1. Legal Compliance

**What a 10 looks like:** Every HMRC and Companies House obligation met, on time, every time. No penalties, no surprises. Accounts filed before the deadline, CT600 submitted, VAT returns current, Confirmation Statement paid.

**Current state:** Spec is comprehensive. Legal obligations are identified. No active company yet.

**Path to 10:**
- Incorporate Ltd company with accountant's guidance (not DIY — get it right first time)
- Set calendar reminders: CT filing deadline, VAT return dates (quarterly), Confirmation Statement
- Retain a specialist SaaS-aware accountant, not a high-street generalist
- Use FreeAgent's built-in filing reminders — they surface deadlines automatically
- Never miss a Confirmation Statement (it's only £34 and Companies House can strike you off for non-compliance)
- **Annual review:** bring accountant in for a 30-minute review each April

---

## 2. MRR Tracking

**What a 10 looks like:** MRR is known to the penny, every Sunday morning, without opening Stripe. Broken into components (new, expansion, churn, contraction). Tracked against the monthly target. A clear trend line visible week-over-week.

**Current state:** Metric definitions are correct in the spec. No live implementation yet.

**Path to 10:**
- Build a simple MRR dashboard in PostHog or a Notion database — updated weekly automatically via Stripe webhook
- Track all 5 MRR components separately, not just a gross number
- Set a Sunday night ritual: review MRR, note the delta vs last week, record one observation ("3 Artists churned this week — all signed up in the same week, check onboarding that week")
- Create a MRR forecast: if growth rate holds, when does £5k MRR arrive? Update every month.
- Alert: if MRR drops >5% week-over-week, investigate immediately. Churn events cluster.
- **Target signal:** when MRR tracking becomes boring because it only goes up

---

## 3. Stripe Integration for Accounting

**What a 10 looks like:** Every Stripe payout hits FreeAgent automatically, correctly categorised, with the Stripe fee already separated. Month-end reconciliation takes 10 minutes, not 2 hours. Deferred revenue for annual plans handled without manual calculation.

**Current state:** Architecture is correct in the spec. Not yet live.

**Path to 10:**
- Enable FreeAgent's Stripe integration on day one of first paid user
- Configure Stripe Revenue Recognition before taking first annual subscription
- Enable Stripe Tax before first EU customer
- Set payout frequency to weekly (reduces reconciliation noise)
- Create expense categories in FreeAgent that map exactly to Stripe fee types
- **Test:** run one complete month with no manual entries — everything should appear automatically
- **Annual audit check:** spot-check 3 random months — reconcile Stripe dashboard totals to FreeAgent totals. They should match to within rounding.

---

## 4. R&D Tax Relief

**What a 10 looks like:** First R&D claim filed within 60 days of first accounting year-end. Claim covers all qualifying activities. A specialist handles it. Net tax saving in Year 1 exceeds £10,000.

**Current state:** Qualifying activities are identified and documented in the spec. No claim process started (company not yet incorporated).

**Path to 10:**
- Start the time log on the day of first qualifying work — not the day of incorporation, the day you write code that counts as R&D. Today is a qualifying day if any of the listed activities are being developed.
- Write the "technology uncertainty" notes monthly, not at year-end. Memory of what was uncertain in September 2026 will be poor in March 2027.
- Identify R&D specialist now. WhisperClaims has a free scoping call — take it. Understanding what a specialist needs changes how you log work from day one.
- Budget for specialist fee: assume 15% of the claim value. At Year 1 estimate, that's ~£2,500 — still net positive by £10,000+.
- **Never claim DIY.** R&D claims attract HMRC scrutiny. A claim from a specialist survives investigation; a DIY claim often doesn't.

---

## 5. EU VAT Handling

**What a 10 looks like:** From the moment the first EU artist becomes a paid subscriber, VAT is correctly collected, tracked by country, and reported quarterly via OSS. No penalty, no back-tax liability, no surprise audit.

**Current state:** Spec identifies the OSS obligation and the Stripe Tax solution. Not yet activated.

**Path to 10:**
- Enable Stripe Tax before accepting any payment — it adds 0.5% to transactions but removes all VAT calculation liability
- Register for UK VAT OSS via HMRC before the first EU paid user (not after — there is no grace period for digital services)
- Stripe Tax generates the country-by-country report needed for the OSS quarterly return — export it, send to accountant
- Test: place a test subscription from a French card and verify Stripe correctly charges 20% French VAT
- **Edge case:** UK VAT is separate from EU OSS. When UK VAT registration is triggered, configure Stripe Tax for UK separately.
- Review annually: new EU member states, changed rates, new obligations

---

## 6. Burn Rate Visibility

**What a 10 looks like:** Every Monday morning, the current monthly burn rate is known exactly. If revenue stopped tomorrow, the runway (in months) is known. This number influences every hiring, tooling, and marketing spend decision.

**Current state:** Cost structure is documented in the spec. No live dashboard yet.

**Path to 10:**
- Set up a single spreadsheet: monthly revenue, monthly fixed costs, monthly variable costs, net burn/profit
- Link to FreeAgent: FreeAgent's profit & loss report is exportable — import it monthly
- Know the number without checking: when burn rate is tracked consistently, you absorb it. "We're at £200/month above revenue right now" should be as automatic as knowing your bank balance.
- Create a burn rate alert: if monthly costs exceed (revenue + £500), investigate before paying any new invoices
- **The goal:** arrive at zero burn the moment MRR exceeds infrastructure costs (~£94/month). That's the first profitability milestone. Should happen at ~£200 MRR.
- Runway calculation: minimum 6 months cash in the business account at all times

---

## 7. LTV:CAC Tracking

**What a 10 looks like:** After 6 months of paid users, LTV:CAC is calculated, understood, and improving. CAC is tracked per channel (organic, Reddit, producer seeding, paid). LTV is segmented by tier (Artist LTV vs. Pro LTV are different numbers).

**Current state:** Definitions are correct. No data yet.

**Path to 10:**
- Track acquisition source for every paid user from day one — UTM parameters on all links, Stripe customer metadata
- Calculate CAC per channel monthly: "The 3 artists who came from Reddit this month cost £0 to acquire (1 hour of time at notional £0 cash CAC). The 2 who came from the TikTok test cost £28 each."
- Calculate blended LTV quarterly: (ARPU / monthly churn rate). At Year 1, use industry benchmarks for churn (3–5%) until you have your own data.
- Segment: what's the LTV of an artist who was referred by a producer vs. one who found ABLE organically? The answer changes the strategy.
- **Target signal:** LTV:CAC above 5:1 on at least one channel means that channel is worth scaling
- Review LTV:CAC before every marketing spend decision

---

## 8. Toolstack Simplicity

**What a 10 looks like:** The entire accounting stack can be explained to a new accountant in 10 minutes. No zombie subscriptions, no redundant tools, no data living in multiple places. One source of truth for every financial figure.

**Current state:** Stack is correctly specified (FreeAgent + Stripe + Dext). Not yet operational.

**Path to 10:**
- Resist adding tools for their own sake. Every addition adds reconciliation complexity.
- FreeAgent is sufficient until £500k ARR. Do not adopt Xero until the limitations are actually felt.
- Annual audit of the toolstack: is every subscription earning its cost? Dext at £20/month only makes sense if ABLE has regular variable expenses. At V1 with primarily online costs (auto-imported by FreeAgent from Stripe), Dext may be overkill — evaluate at 6 months.
- Keep all financial data accessible from FreeAgent. Never let accounting data fragment across Notion, Stripe, FreeAgent, and a spreadsheet with no single source of truth.
- **The simplicity test:** can a substitute accountant pick up the books in an afternoon? If yes, the stack is right.

---

## 9. Artist Payout Clarity

**What a 10 looks like:** When Close Circle and direct fan support payments are live, artist payouts are handled with zero ambiguity. Artists know exactly what they receive, when they receive it, and what ABLE's cut is. There is no confusion about whose money is whose.

**Current state:** Spec correctly establishes that ABLE is pass-through only in V1. No fan-to-artist transactions yet.

**Path to 10:**
- Maintain strict accounting separation: subscription revenue and platform fee revenue are separate line items
- When artist payouts begin: generate an artist-facing payout summary (how much was collected, Stripe's fee, ABLE's fee if any, net to artist)
- ABLE should never benefit from delayed artist payouts. Stripe Connect is T+2. Match this exactly.
- If ABLE ever holds artist money for any reason (e.g., dispute resolution): segregate it in a separate named account. Do not mix with operating funds. This is not just good practice — it avoids the FCA definition of a payment institution.
- **Regulatory check:** before launching any artist-to-fan direct payment feature, confirm with a solicitor that the structure doesn't trigger FCA payment institution registration. Standard Stripe Connect does not — but changes to the flow need review.
- Document the payout architecture in writing for every phase change

---

## 10. Annual Accounts Process

**What a 10 looks like:** Annual accounts are filed without stress, on time, with no last-minute reconstruction of transactions. The accountant has everything they need in 2 hours of prep time, not 20.

**Current state:** Process described at a high level. Not yet operational.

**Path to 10:**
- Start of each accounting year: send accountant a kickoff email confirming period dates, any changes to the business structure, and any unusual transactions expected
- Monthly habit: reconcile FreeAgent to bank statement. Takes 20 minutes. Eliminates the year-end scramble.
- Keep a "for accountant" folder in Google Drive: any document that seems significant goes in here immediately (large invoices, contract with new contractors, any communication from HMRC, VAT registration correspondence)
- End of year (March 31): send accountant the FreeAgent access + the "for accountant" folder. That should be 90% of what they need.
- **Timeline target:** accounts filed and tax paid by the 7-month mark (not the 9-month legal deadline). Earlier filing means earlier certainty. No last-minute stress.
- Review meeting: 30 minutes with accountant reviewing the accounts before filing — catches errors and surfaces planning opportunities (e.g., "you could make a £5k pension contribution this year to reduce CT")
