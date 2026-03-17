# Pre-Shift Execution Log
**Track every action completed toward the shift. Updated as each item is done.**
**Created: 2026-03-16 | Review: weekly**

> This is not a plan. It is a log of what has actually been completed.
> Items move from `PRE-SHIFT-CHECKLIST.md` to this file when they are done.
> Read `PATHWAY.md` for full context on why each item matters.

---

## Company Setup

- [ ] ABLE Labs Ltd incorporated at Companies House — target: this week
  - Date completed:
  - Company number:
  - Director name confirmed:
  - SIC code used (suggested: 62012 — Business and domestic software development):
  - Notes:

- [ ] Registered office service in place (keeps home address off public register)
  - Date completed:
  - Provider used (1st Formations / QCF / other):
  - Annual cost: £
  - Renewal date:
  - Notes:

- [ ] Domain (ablemusic.co) transferred to company name (not personal)
  - Date completed:
  - Registrar:
  - Renewal date:
  - Notes:

- [ ] Social media account recovery tied to company email (not personal Gmail)
  - Date completed:
  - Accounts updated: Instagram / TikTok / Twitter / other:
  - Notes:

---

## Financial Foundation

- [ ] Monthly personal spend calculated from 3 months of bank statements
  - Date calculated:
  - Average monthly spend: £
  - Method used (bank export / spreadsheet / other):
  - Notes:

- [ ] Emergency fund target calculated (6 × monthly spend)
  - Date calculated:
  - Target amount: £
  - Based on monthly spend of: £
  - Notes:

- [ ] Emergency fund vehicle opened (Marcus / Chip / Chase UK / other)
  - Date completed:
  - Provider:
  - Current interest rate: %
  - Notes:

- [ ] Emergency fund — current balance and gap
  - Last updated:
  - Current amount: £
  - Target: £
  - Gap: £
  - Monthly contribution: £
  - Notes:

- [ ] ISA maxed for current tax year (£20,000 annual allowance)
  - Date completed or target date:
  - Provider (Vanguard / other):
  - Fund selected (FTSE All-World / LifeStrategy 80% / other):
  - Amount contributed this tax year: £
  - Notes:

- [ ] Employer pension: transfer value statement obtained
  - Date obtained:
  - Current pension provider:
  - Transfer value: £
  - Notes:

- [ ] Pension decision made: consolidate to SIPP or leave in employer scheme
  - Date decided:
  - Decision:
  - Accountant confirmed:
  - Notes:

---

## Business Finance

- [ ] Starling Business account open and operational
  - Date completed:
  - Sort code:
  - Notes: (requires Companies House confirmation — open immediately after incorporation)

- [ ] FreeAgent connected to Starling
  - Date connected:
  - Monthly cost: £19
  - First 3 months of transactions visible: Y / N
  - Notes:

- [ ] Accountant engaged and briefed on ABLE revenue model
  - Date engaged:
  - Name / firm:
  - Annual fee: £
  - Confirmed understanding of: SaaS revenue recognition / R&D tax credits / director salary structure
  - First meeting date:
  - Notes:

- [ ] R&D tax credit eligibility assessed
  - Date assessed:
  - Accountant's verdict:
  - Estimated qualifying spend: £
  - Estimated credit value: £
  - Notes:

- [ ] Director salary vs dividend structure agreed with accountant
  - Date agreed:
  - Planned director salary: £ /year (target near £6,396 LEL)
  - Dividend strategy confirmed:
  - Notes:

- [ ] 3 months operating costs in Starling business account
  - Target amount: £
  - Current amount: £
  - Date target reached:
  - Notes:

- [ ] Stripe live in production (real payments, not test mode)
  - Date completed:
  - First real payment processed: Y / N
  - Date of first real payment:
  - Webhook reliability confirmed: Y / N
  - Notes:

- [ ] VAT registration decision made
  - Date decided:
  - Decision (voluntary registration Y / N):
  - Threshold monitoring: current annual run-rate £ / threshold £90,000
  - Notes:

- [ ] First self-assessment tax bill estimated (including payment on account)
  - Date estimated:
  - Accountant's estimate for Year 1: £
  - Payment on account noted and budgeted: Y / N
  - Notes:

---

## Legal and Compliance

- [ ] Privacy policy published at ablemusic.co/privacy
  - Date published:
  - Template source (Genie AI / solicitor / other):
  - Legal review completed: Y / N
  - Reviewer / cost: £
  - Last reviewed:
  - Notes:

- [ ] Terms of service published at ablemusic.co/terms
  - Date published:
  - Key clauses confirmed: fan data belongs to artist / IP / governing law (England & Wales)
  - Legal review completed: Y / N
  - Reviewer / cost: £
  - Notes:

- [ ] GDPR fan deletion flow tested end-to-end
  - Date tested:
  - Tested steps: Supabase record deleted / email provider contact deleted / event tracking anonymised
  - Tester (James / external):
  - Notes:

- [ ] Fan consent checkbox implemented in fan sign-up form
  - Date implemented:
  - Confirmed: `consent: true, consentMethod: 'explicit_checkbox'` stored in fan record
  - Playwright test written: Y / N
  - Notes:

- [ ] IP assignment: code and brand assets formally assigned to ABLE Labs Ltd
  - Date completed:
  - Method (Genie AI agreement / solicitor-drafted):
  - Assets covered: codebase / domain names / brand assets / other:
  - Notes:

- [ ] Trade mark search: "ABLE" checked at UKIPO in Class 41 and Class 42
  - Date completed:
  - Result (clear / conflicts found):
  - Registration filed: Y / N
  - Application number (if filed):
  - Estimated grant date (4+ months):
  - Notes:

---

## Insurance

- [ ] Income protection insurance: quotes obtained
  - Date quoted:
  - Providers quoted: British Friendly / Holloway Friendly / LV= / other:
  - Quote 1: £/month for £/month benefit
  - Quote 2: £/month for £/month benefit
  - Quote 3: £/month for £/month benefit
  - C5/C6 exclusion noted: Y / N (expected — see PATHWAY.md §2)
  - Notes:

- [ ] Income protection: policy in place
  - Date activated:
  - Provider:
  - Monthly premium: £
  - Monthly benefit: £
  - Waiting period (deferred period):
  - Notes:

- [ ] Private health insurance: quotes obtained
  - Date quoted:
  - Providers: AXA Health / Bupa / other:
  - Monthly premium: £
  - Key exclusions noted (C5/C6 pre-existing likely excluded for 2 years):
  - Notes:

- [ ] Private health insurance: policy in place
  - Date activated:
  - Provider:
  - Monthly premium: £
  - Notes:

- [ ] Group life insurance gap assessed
  - Current employer cover: x salary
  - Replacement needed (if dependents): Y / N
  - Action taken:
  - Notes:

---

## Tools and Systems

- [ ] n8n weekly digest running (MRR + artist metrics, every Monday)
  - Date built:
  - Confirmed receiving: Y / N
  - Data sources: Stripe MRR / Supabase artist count / other:
  - Notes:

- [ ] n8n pre-shift trigger alert built (fires when MRR > £5k for 3 consecutive months)
  - Date built:
  - Test triggered: Y / N (test with £1 threshold)
  - Notification method (email / Slack / other):
  - Notes:

- [ ] Notion pre-shift dashboard created
  - Date created:
  - URL:
  - Updated weekly: Y / N
  - Notes:

- [ ] 1Password: all critical credentials stored
  - Date completed:
  - Accounts covered: Stripe / Supabase / Netlify / GitHub / HMRC / Companies House / Resend / PostHog
  - 2FA enabled on all: Y / N
  - Notes:

- [ ] PostHog: events flowing, funnel defined, dashboard readable in 2 minutes
  - Date confirmed:
  - Funnel defined: landing → start → admin first login → first fan sign-up → first upgrade
  - Notes:

- [ ] Uptime monitoring in place (UptimeRobot or Uptime Kuma)
  - Date set up:
  - Monitors: ablemusic.co / Supabase endpoint / other:
  - Alert method (email / SMS):
  - Notes:

- [ ] Supabase upgraded to Pro (daily backups, no inactivity pauses)
  - Date upgraded:
  - Monthly cost: £25
  - Backup confirmed running: Y / N
  - Notes:

---

## Hardware and Workspace

- [ ] Mac Studio M4 Max: received and set up
  - Date received:
  - Ollama installed with models (DeepSeek-R1 70B / Llama 3.3 70B / Qwen2.5-Coder 32B / Phi-4 14B):
  - Claude Code configured: Y / N
  - n8n running as persistent service: Y / N
  - Time Machine to external SSD running: Y / N
  - Notes:

- [ ] External display on monitor arm at exact eye level (C5/C6 requirement)
  - Date set up:
  - Display model:
  - Arm model:
  - Eye level confirmed (no looking up or down): Y / N
  - Notes:

- [ ] Standing desk / converter in place and used daily
  - Date set up:
  - Type (sit-stand desk / converter / other):
  - Notes:

- [ ] Ergonomic keyboard and vertical mouse / trackball in use
  - Date: keyboard:
  - Date: mouse:
  - Keyboard model:
  - Mouse model:
  - Notes:

- [ ] Red light therapy panel in place, 10-minute daily protocol established
  - Date set up:
  - Panel model:
  - Protocol established (when / how long per day):
  - Notes:

- [ ] UPS protecting Mac Studio
  - Date set up:
  - Model (APC Back-UPS / Eaton / other):
  - Notes:

---

## Personal Readiness

- [ ] Active physiotherapy relationship in place (not just a name — a booked appointment, regular schedule)
  - Date of first appointment:
  - Physio name and practice:
  - Specialisation confirmed (cervical disc):
  - Monthly maintenance schedule agreed: Y / N
  - Notes:

- [ ] Routine test: one full week working from home on ABLE only — patterns noted
  - Date of week:
  - Key findings (what was missing / what worked):
  - Adjustments to make before full-time:
  - Notes:

- [ ] Loneliness plan completed:
  - Co-working space identified: Name / location:
  - Founder peer group found (Indie Hackers / MicroConf / local):
  - Weekly coffee meeting scheduled: Y / N
  - Notes:

- [ ] 5 specific people identified to hear the exit news personally before public announcement
  - Person 1:
  - Person 2:
  - Person 3:
  - Person 4:
  - Person 5:
  - Notes:

- [ ] Therapist or coach identified for Year 1
  - Date identified:
  - Name:
  - Booking method / frequency:
  - Notes:

---

## ABLE Product Readiness

- [ ] All 5 pages pass Playwright smoke tests
  - Date confirmed: able-v7.html / admin.html / start.html / landing.html / fan.html
  - Notes:

- [ ] 50+ active artists (logged in last 30 days)
  - Date confirmed:
  - Count:
  - Notes:

- [ ] 10+ paying artists
  - Date confirmed:
  - Count:
  - Revenue: £ MRR
  - Notes:

- [ ] NPS survey sent and results reviewed
  - Date sent:
  - Response rate:
  - NPS score:
  - Top 3 themes from responses:
  - Notes:

- [ ] Real device tested: iPhone Safari iOS 17+
  - Date tested:
  - Issues found and resolved: Y / N
  - Notes:

---

## Social Media Handles

- [ ] Instagram: @ablemusic or handle confirmed
  - Handle:
  - Account in company name: Y / N
  - Notes:

- [ ] TikTok: handle confirmed
  - Handle:
  - Account in company name: Y / N
  - Notes:

- [ ] Twitter/X: handle confirmed
  - Handle:
  - Notes:

---

## Health Setup (before exit, not after)

- [ ] NHS GP registered at current address
  - Confirmed: Y / N
  - Notes:

- [ ] Most recent C5/C6 medical notes obtained (for insurance applications)
  - Date obtained:
  - Notes:

- [ ] Private health insurance active before group scheme lapses on exit day
  - Policy start date:
  - Employer scheme end date:
  - Gap: Y / N (must be zero)
  - Notes:

---

## Monthly Review Log

| Date | Items completed this month | Score (see PATHWAY.md PATH-TO-10.md) | Notes |
|---|---|---|---|
| 2026-03-16 | Log created | 3/10 | Nothing executed yet |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

---

## Exit Day Actions (complete on the day notice is handed in)

- [ ] Resignation letter sent (written evening before, slept on, sent morning)
  - Date sent:
  - Final working day agreed:
  - Handover plan agreed: Y / N
  - Notes:

- [ ] P45 date confirmed with HR
  - Date confirmed:
  - P45 date:
  - Notes:

- [ ] HMRC self-employment registration completed (hmrc.gov.uk, 10 minutes)
  - Date registered:
  - UTR number:
  - Notes:

- [ ] Accountant notified, exit date confirmed, Year 1 planning call booked
  - Date notified:
  - Planning call date:
  - Notes:

- [ ] LinkedIn updated: "Founder, ABLE"
  - Date updated:
  - Notes:

- [ ] TikTok + Instagram: "I handed in my notice today" post
  - Date posted:
  - Notes:

- [ ] Personal email to founding artists (first 10): "I'm all in"
  - Date sent:
  - Artists emailed:
  - Notes:

- [ ] Celebration: specific plan, specific people, marked as significant
  - Plan:
  - Date:
  - Notes:

---

*This log is James's property. It is the living record of the shift, not a spec.*
*Update it within 24 hours of completing each item — not retrospectively at the end of the month.*
*Cross-reference: `PATHWAY.md` for full context. `PRE-SHIFT-CHECKLIST.md` for the status overview.*
