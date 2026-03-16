# The Pathway — Everything in Place Before the Shift
**Created: 2026-03-16 | Review: monthly**

> "The shift is not a single day. It's a 6-month preparation that culminates in a clear, confident decision."

The goal of this system: when James reaches the exit trigger (£5k MRR sustained for 3 consecutive months), every single thing is already in place. The resignation feels inevitable — a formality confirming what is already true — not a leap into the unknown.

This document is the master. `PRE-SHIFT-CHECKLIST.md` is the monthly progress tracker. Everything else in this folder is a deep-dive into one domain.

---

## The thesis

Most people exit employment by deciding to leave and then figuring out the rest. That approach works sometimes. For James, it would be a mistake.

The C5/C6 condition means that high-stress, unplanned situations have a physical cost — not just a psychological one. The financial complexity of sole-trader/director income, self-assessment, NI Class 2 and 4, loss of group life insurance, pension decisions, and the Portugal NHR timing requires preparation, not improvisation. And the psychological dimension — identity, structure, loneliness, health — is the part that no financial checklist covers but most people discover the hard way in Month 2.

The Pathway system treats the exit as a project. It has a start date (now), a trigger (£5k MRR for 3 months), and a completion criterion (every item on the pre-shift checklist is done). Between now and the trigger, the work is preparation. The day you hand in notice, you are stepping into a structure you already built.

---

## Part 1: The Exit Trigger — Defined Precisely

The number is £5,000 MRR. But the number alone is not the trigger. The full trigger is:

### The green-light conditions (ALL must be true)

**Revenue:**
- [ ] £5,000+ MRR for 3 consecutive complete calendar months
- [ ] MRR is from recurring subscriptions — not one-off payments, grants, or consulting work that inflates a single month
- [ ] Churn is below 5%/month (base is growing, not churning faster than you acquire)
- [ ] At least 2 revenue tiers active (not all revenue concentrated in one plan — diversity signals a real market)
- [ ] At least one visible path to £10k MRR within 6 months of exiting (based on current trajectory and identified lever)

**Cash:**
- [ ] 3 months operating costs in business bank account (Starling) — separate from personal money
- [ ] 6 months personal expenses in instant-access savings (not investments, not pension — liquid cash)
- [ ] Personal emergency fund: approximately £18,000 if current monthly spend is £3,000

**Compliance:**
- [ ] Privacy policy live at ablemusic.co/privacy
- [ ] Terms of service live at ablemusic.co/terms
- [ ] GDPR fan deletion flow working and tested
- [ ] Self-assessment registration with HMRC ready to file the moment you become self-employed
- [ ] Accountant engaged and fully briefed on ABLE's revenue model

**Team:**
- [ ] Community manager identified — not necessarily hired, but a specific named person with a written role spec, candidate researched, conversation started. You should not go full-time into a solo founder role with no support structure.

**Product:**
- [ ] No P0 bugs open
- [ ] All 5 pages pass Playwright smoke tests
- [ ] Error monitoring in place and clean
- [ ] Fan sign-up to confirmation email: working and tested

### The no-go conditions (do NOT shift even at £5k MRR if any of these are true)

**Health:**
- C5/C6 is in an acute flare at the planned exit date. Do not make a major life decision from inside physical pain. Push the exit date 4 weeks and reassess. The job will still be there. The MRR will still be there.

**Product:**
- ABLE has an unresolved major technical incident (data loss risk, payment failure, security issue). Fix this first. Exiting a job while the product is on fire is a compounding disaster.

**Revenue:**
- All paying accounts are on a single tier. This signals either a pricing problem or a narrow user base. You need tier diversity before it's safe to treat MRR as durable.

**Finance:**
- Personal savings are below 4 months. The buffer is not optional — it is the insurance that lets you make good decisions instead of panicked ones during the first year.

**Mental state:**
- You are in a prolonged low period, not a temporary bad week. The exit decision should be made from a high state, not a desperate one. Build the decision from clarity.

---

## Part 2: Financial Preparation

This is the domain most people under-prepare. The financial gap between "employed" and "self-employed director" is larger than people expect, and the costs of getting it wrong are both financial and psychological.

### Personal finances

**Emergency fund — build this first**

Target: 6 months of personal expenses in instant-access savings.
- Calculate your actual monthly spend (not an estimate — look at the last 3 months of bank statements)
- If that is £3,000/month, the target is £18,000
- Vehicle: Marcus (Goldman Sachs), Chip, or Chase UK savings — all pay competitive rates and are instant-access
- This money is inert. Do not invest it. Do not put it in the ISA. It must be able to land in your current account within 24 hours.
- Do not exit employment until this is full.

**ISA — use your employed income while you have it**

- Max your Stocks & Shares ISA: £20,000/year
- Vehicle: Vanguard Lifestrategy 80% or Vanguard FTSE All-World — low cost, globally diversified
- The tax advantage compounds forever. Gains inside the ISA are never taxed.
- Urgency: while you're on PAYE at £60k, you have regular income to draw from. As a director, dividend timing will govern when money is available. Max the ISA now.
- Employer salary sacrifice into pension: if your employer offers this, it reduces taxable income. Use it this year — this is the last year you have an employer PAYE contribution.

**Pension — understand it before you leave**

The default response is "I'll just leave my workplace pension where it is." That is fine, but understand:
- Get a transfer value statement from your current pension provider
- Decide: consolidate into a SIPP (Self-Invested Personal Pension via Vanguard, Hargreaves Lansdown, or PensionBee) or leave in the employer scheme
- A SIPP gives you full investment control. The employer scheme may have better terms. Get the numbers from both and compare.
- As a self-employed director, you can still contribute to a pension (via SIPP) and get 25% basic rate tax relief. At any reasonable salary, this remains worth doing.

**Income protection insurance — not optional given C5/C6**

Income protection pays 60–70% of your pre-disability income if you cannot work due to illness or injury. For someone with a known cervical disc condition, this is not an unlikely scenario — it is a real one.
- Get quotes before you exit. Premiums are lower when you're younger and healthier (relatively).
- Pre-existing conditions: C5/C6 will likely be listed as an exclusion or attract a loading. Get this information before you exit employment, because the group income protection on your employer scheme lapses on your last day and you may not realise what you've lost.
- Provider: British Friendly, Holloway Friendly, or LV= for self-employed income protection.
- The premium: roughly £50–80/month for a £2,500/month benefit. This is not optional.

**Life insurance — note the gap**

Your employer likely has group life insurance (typically 4x salary). This ends the day you leave. If you have dependents, replace this with a term life policy. If no dependents, this is lower priority, but be aware the gap exists.

**Mortgage or rent — tell them**

- If you have a mortgage: some mortgage providers require notification if your employment status changes. Check your mortgage terms. This is not usually an issue for existing mortgages but refinancing while self-employed requires 2 years of accounts in most cases — plan accordingly.
- If renting: your rental agreement may reference employment status. If it does and you go self-employed, technically you should notify your landlord. Most landlords don't care as long as the rent is paid. Use judgment.

**Standing orders audit**

Before you exit, audit every direct debit and standing order:
- What can be cancelled without affecting the business or life quality?
- What is on auto-renewal that you might miss?
- What changes in price as a business expense vs personal expense?
- Create a separate list of personal monthly expenses (P&L for your life) — you need to know this number precisely.

### Business finances

**ABLE Labs Ltd — incorporate now**

- Companies House online: £50, 24 hours
- Use a registered office service (e.g., 1st Formations or QCF — £50/year) to keep your home address off the public register
- Structure decision: trade initially as ABLE Labs Ltd. Create ABLE Music Ltd as a subsidiary only if you take investment or need ring-fenced liability — otherwise the added admin cost is not worth it yet.

**Starling Business account — open now**

- Free business current account, excellent API, integrates cleanly with FreeAgent
- Open before you have revenue — the account setup process takes longer than expected and requires Companies House confirmation
- Keep business and personal money completely separate from day one

**FreeAgent — connect to Starling**

- £19/month accounting software built for freelancers and small limited companies
- Automatic transaction import from Starling
- Generates quarterly VAT returns and corporation tax estimates
- Self-assessment return generation (saves accountant time = saves money)
- Run this for 3+ months before the exit so your accountant has real data to work with

**Stripe — live before exit**

- Not just in test mode. Real payments. Real webhooks.
- Understand your fee structure: 1.5% + 20p for UK cards (standard Stripe rate)
- Set up the Stripe dashboard so you can read it clearly. MRR is your northstar metric and it should be visible without exporting anything.
- Confirm webhook reliability — if Stripe webhooks to Supabase are dropping, fix this before it affects paying artists.

**VAT**

- Registration threshold: £90,000 taxable turnover (2024/25). At £5k MRR = £60k/yr, you are under the threshold.
- Voluntary registration: you can register voluntarily before the threshold. This lets you reclaim VAT on business purchases. But it adds quarterly filing obligations. Discuss with your accountant whether voluntary registration is worth it at your revenue level.
- The rule of thumb: once you can see the threshold approaching (within 18 months at current growth), begin the registration process. Do not wait until you breach it.

**Accountant — engage now, not at exit**

- Budget: £1,000–1,500/year for a tech-savvy UK startup accountant
- Find one who: understands SaaS revenue recognition, knows R&D tax credits, and won't charge extra for a Zoom call
- R&D tax credits: ABLE is almost certainly eligible — the development of novel software for artists qualifies. An R&D tax credit claim can generate a 20–33% rebate on qualifying development costs. At £10k of qualifying spend, that is £2,000–3,300 back. Your accountant needs to flag this from Year 1.
- Director salary vs dividends: the standard approach for a UK limited company is to pay yourself a small salary (at or near the National Insurance Lower Earnings Limit, currently £6,396/year) and take the rest as dividends. Dividends are taxed at a lower rate than salary. Your accountant will set this up. Do not guess at this structure.

**Tax preparation — understand the year of change**

The year you exit employment will be a complex tax year:
- Part of the year is PAYE (employer deducts tax at source)
- Part of the year is self-employed / director income
- You will need to file a self-assessment return for that year
- Register with HMRC as self-employed on the day you leave (or the week before) — online, 10 minutes, HMRC Government Gateway. They require registration by 5 October following the end of the tax year you became self-employed.
- Your P45 from your employer goes in your self-assessment return. Get it confirmed before your last day.
- Budget for the first self-assessment tax bill — it will include a "payment on account" for the following year (essentially HMRC asking you to pre-pay 50% of the estimated next year's tax alongside the current year's bill). First-timers are always caught off-guard by this. Know about it in advance.

**National Insurance as self-employed**

As an employee, NI is deducted automatically. As a director:
- Class 1 NI: deducted on your salary component (same as an employee, on salary above the threshold)
- Class 2 NI: flat rate (£3.45/week in 2024/25) — automatically included in your self-assessment return
- Class 4 NI: 9% on profits between £12,570 and £50,270, then 2% above that
- Your accountant will calculate this. Budget approximately 25% of director income for tax and NI combined in Year 1.

---

## Part 3: Legal and Compliance

### ABLE product compliance (must be done before real users)

**Privacy policy**
- Written in plain English, published at ablemusic.co/privacy
- Must cover: what data is collected (email addresses, usage events, profile data), how it is stored (Supabase, EU region), how it is used (to provide the service), how users can request deletion, and who to contact
- Genie AI templates are a useful starting point. Have the final version reviewed by an AI legal service or a UK solicitor (typically £200–400)
- Tack on: data processor agreements with Supabase, Resend/Loops, and Stripe (these are typically GDPR-standard from those providers — check their DPA pages)

**Terms of service**
- Published at ablemusic.co/terms
- Key clauses: acceptable use (no copyright infringement, no misleading content), IP ownership (artist retains IP of their content; ABLE takes a limited licence to display it), payment terms, subscription cancellation policy, governing law (England and Wales)
- Non-negotiable clause: fan data belongs to the artist. Make this explicit. It is a competitive differentiator and a trust signal.

**GDPR fan deletion flow**
- Artist can delete individual fan records from admin.html
- Fan can request deletion of their own data via a link in any email they've received from the artist
- Deletion must propagate: Supabase record deleted, Resend/Loops contact deleted, event tracking anonymised
- Test this manually before you have paying artists. A GDPR request you can't fulfil is a £17.5M fine risk (scaled to your size, likely a £10,000–50,000 ICO penalty in practice — but the reputational damage is worse)

**CAN-SPAM / email compliance**
- All marketing emails include: physical address (your registered office is fine), clear unsubscribe mechanism, sender name identifying ABLE
- Transactional emails (fan sign-up confirmation, password reset) are exempt from some CAN-SPAM rules but must still identify the sender
- Loops/Resend will handle the unsubscribe mechanism automatically if configured correctly — verify this before launch

**Cookie/localStorage notice**
- ABLE uses localStorage for profile data, no third-party cookies — decision made: no banner required at V1 (see CONTEXT.md)
- Review this if you add PostHog, Google Analytics, or any third-party that drops cookies

### Company legal

**Registered office**
- Use a registered office service (QCF, 1st Formations, or similar — £30–50/year). Keeps your home address off Companies House public register.
- Important: your home address, once on the register, is extremely difficult to remove.

**IP assignment**
- All code, brand, domain names, and content you've created should formally belong to ABLE Labs Ltd — not to James Cuthbert personally.
- A simple IP assignment agreement (one page, can be generated by Genie AI) transfers your existing work into the company.
- This matters when you seek investment, sell the business, or bring in a co-founder. It also protects you personally from liability.

**Shareholder agreement**
- If you ever bring in a co-founder or give equity to an employee, you need a shareholders' agreement. Have a template ready but do not over-engineer this before there is another shareholder.
- Vesting cliff: if and when you give equity, use a 12-month cliff with 4-year vesting. This is standard.

**Trade mark search**
- Before investing heavily in the "ABLE" brand, run a trade mark search in Class 41 (music/entertainment services) and Class 42 (software/technology services) on the UK Intellectual Property Office database.
- If "ABLE" is clear, register it. UK trade mark registration: approximately £170 for one class, £50 per additional class. Process takes 4+ months.
- This is lower priority in Year 1 but must be done before any serious marketing spend or investment conversations.

**Domain ownership**
- ablemusic.co — confirm this is registered in ABLE Labs Ltd's name, not your personal name. If it's in your personal name, transfer it.
- Similarly: any associated social media accounts should have recovery options (email, phone) tied to the company, not your personal accounts.

---

## Part 4: Product Readiness

The product must be genuinely stable before James goes full-time — not because instability is disqualifying, but because the psychological pressure of "this is my only income" changes decision-making in unhelpful ways. Decisions made from financial anxiety are almost always worse than decisions made from stability.

The test is not "is the product perfect?" It is "can the product run for 2 weeks without me touching it and not break?"

**Smoke tests:**
- [ ] All 5 pages pass Playwright smoke tests (able-v7.html, admin.html, start.html, landing.html, fan.html)
- [ ] No P0 bugs open in Linear
- [ ] Browser console clean on all pages — no errors in production
- [ ] HTTPS working, domain resolving, OG images correct
- [ ] Fan sign-up to confirmation email: tested on multiple email providers (Gmail, Outlook, Hotmail)
- [ ] Campaign state machine: all 4 states tested (profile, pre-release, live, gig)
- [ ] Admin fan list: displays correctly with 0 fans, 1 fan, and 100+ fans
- [ ] Stripe webhook: payment confirmed → artist account upgraded → works on first attempt (test this with a real £1 test payment before exiting)

**User validation:**
- [ ] At least 50 artists using the product actively (logged in within the last 30 days)
- [ ] At least 10 paying artists (proof of willingness to pay)
- [ ] NPS survey sent and received — you need to know what is and is not working before you go full-time
- [ ] No known mobile bugs on iPhone Safari iOS 17+ or Chrome Android

**Monitoring:**
- [ ] Uptime monitoring in place: UptimeRobot or Uptime Kuma watching ablemusic.co
- [ ] Supabase upgraded to Pro (daily backups, 30-day retention, no automatic pauses on inactivity)
- [ ] n8n artist welcome sequence: running and tested end-to-end with a real artist
- [ ] Resend/Loops: DKIM configured, bounce handling set, sending reputation clean

---

## Part 5: Infrastructure Readiness

**Hosting and delivery:**
- [ ] Netlify: consider Pro if function invocations are high (check function usage dashboard)
- [ ] Custom domain on Netlify: HTTPS auto-renewing, no manual certificate management needed
- [ ] CDN: Netlify's CDN is on by default — confirm assets (images, fonts) are loading fast globally using WebPageTest.org or PageSpeed Insights

**Database:**
- [ ] Supabase Pro: £25/month, daily backups, 30-day retention. The free tier pauses your database after 7 days of inactivity — this is not acceptable for a live product.
- [ ] Row-level security (RLS) configured and tested: each artist should only be able to read and write their own data
- [ ] Backup export: run a manual backup export once and confirm the format is usable

**Email:**
- [ ] Resend or Loops: verified sending domain, DKIM and DMARC configured
- [ ] Bounce rate: below 2% (anything above risks your sending reputation being flagged)
- [ ] Unsubscribe handling: test the full unsubscribe flow — click unsubscribe → confirm removed from list

**Analytics:**
- [ ] PostHog: events flowing correctly (page views, fan sign-ups, CTA clicks, campaign state changes)
- [ ] Funnel defined: landing.html → start.html → admin.html first login → first fan sign-up → first upgrade
- [ ] Dashboard readable: you can open PostHog and understand what is happening in 2 minutes

**Automation:**
- [ ] n8n: artist welcome sequence (Day 1, 3, 7) tested with a real email address
- [ ] n8n: weekly financial digest running and readable
- [ ] n8n: churn re-engagement trigger tested (no login for 14 days → email fires)

**Secrets and access:**
- [ ] 1Password: all credentials stored (Supabase, Stripe, Netlify, Resend, PostHog, HMRC, Companies House)
- [ ] No hardcoded secrets in any committed code — verify with a grep for known key patterns before exit
- [ ] Two-factor authentication: enabled on all critical accounts (Stripe, Supabase, Netlify, GitHub, email provider)
- [ ] GitHub: repository is private, main branch is protected (no force-push)

---

## Part 6: Hardware and Workspace Readiness

The workspace is not an afterthought. For someone with a C5/C6 condition, the physical setup directly affects working capacity. A badly set up workspace is a slow-burn injury. A well set up workspace is a health asset.

**Primary workstation (Mac Studio M4 Max):**
- [ ] Received and set up
- [ ] Ollama installed with key models downloaded (DeepSeek-R1 70B, Llama 3.3 70B, Qwen2.5-Coder 32B, Phi-4 14B)
- [ ] Claude Code configured
- [ ] n8n running as a persistent service (not just when manually started)
- [ ] PostHog configured if self-hosted
- [ ] Time Machine backup: to external 4TB SSD (Samsung T9) configured and running daily

**Physical ergonomics — non-negotiable given C5/C6:**
- [ ] External display: 4K (LG UltraFine, Dell UltraSharp, or similar) on a monitor arm at exact eye level — you should not be looking up or down at the screen
- [ ] Standing desk converter or full standing desk: in place and used daily. Sitting for 8 hours is not viable with a herniated disc.
- [ ] Chair: properly adjusted so feet are flat on floor, hips slightly above knee level. If using a saddle chair or kneeling chair, trial it for 2 weeks before committing.
- [ ] Keyboard: low-profile or split ergonomic keyboard to keep wrists neutral. Microsoft Sculpt Ergonomic or Kinesis Freestyle are proven.
- [ ] Mouse: vertical mouse (Logitech MX Vertical) or trackball (Kensington Expert Mouse) to keep forearm in neutral position
- [ ] Red light therapy panel (Mito Red Light or similar): positioned at neck/upper back level. Use 10 minutes/day while reading or thinking.

**Power and connectivity:**
- [ ] UPS (uninterruptible power supply): protects Mac Studio from power cuts. APC Back-UPS or Eaton is sufficient. A power cut without UPS can corrupt in-progress n8n flows or database writes.
- [ ] Internet: primary broadband plus a backup mobile hotspot (Smarty or iD Mobile on Three network — good data allowances). You should be able to keep working through a broadband outage.

**Travel setup (for nomad phase):**
- [ ] MacBook Pro M4 Pro: ready for travel. Syncs to Mac Studio via iCloud/GitHub — no data lives solely on the laptop.
- [ ] Travel monitor: ASUS ZenScreen or similar 15.6" USB-C portable monitor — lightweight enough to carry, eliminates laptop-only neck strain
- [ ] Travel ergonomic keyboard: Logitech MX Keys Mini (compact but proper key travel)
- [ ] Laptop stand: Nexstand K2 or Roost — gets screen to eye level in a coffee shop or co-working space
- [ ] 65W GaN charger: powers MacBook Pro and charges other devices from a single socket

---

## Part 7: Personal Readiness

This is the section most checklists miss entirely. It is also the section where most exits fail — not financially, but personally. A technically well-prepared exit can still be psychologically brutal if the personal dimension hasn't been thought through.

### Health

**C5/C6 status at exit:**
Ideally, James exits employment during a stable, non-acute period. This is a controllable factor: do not set a firm exit date that falls inside a known high-stress period (major product launch, family event, anything that spikes cortisol). The exit should happen during a relative calm.

The requirement: have an active physiotherapy relationship in place before you exit. Not "I know a physio I could call." An active relationship — someone who knows your case, who you see monthly for maintenance, and who you can call when something changes. This continuity matters because your employer's Bupa/healthcare scheme ends on exit day.

Private healthcare:
- AXA Health or Bupa individual policy: approximately £80–150/month for a 44-year-old
- The C5/C6 pre-existing condition will likely be excluded for 2 years (standard exclusion period) or permanently
- Get quotes before you exit. The policy is still valuable for everything that is not C5/C6.

**The exit day health rule:** If you are in acute pain on the day you planned to hand in notice — delay by 4 weeks. The job is not going anywhere. Making a major life decision from inside pain distorts both the decision and the aftermath.

### Support system

Before you exit, you need people in your life who:
1. Know specifically what ABLE is and why it matters to you — not just "James is doing a startup"
2. Have capacity to receive a call when things are hard (Month 2 is typically the hardest)
3. Will not introduce doubt during the vulnerable early months — not because doubt is wrong, but because there will be a time for honest appraisal and it is not Week 3

The counterpart: identify one or two people who will give you honest challenge. Not constant support, but someone who will say "that product decision doesn't make sense, tell me more." You need this too, and you should designate them in advance rather than accidentally receiving it from someone who doesn't understand the context.

### Identity

The job title is not James. But after years of employment, it is woven into routine, social identity, and self-concept in ways that only become visible when it is removed. The question to answer in the months before exit (not on exit day):

"Who am I on a Tuesday afternoon when I haven't shipped anything, haven't spoken to anyone, and the to-do list isn't getting shorter?"

This is not a dramatic question. It is a practical one. The answer determines how you spend the first month. If the answer is solid — you know what you value, how you rest, who you are outside the output — then the transition will be grounded. If you haven't thought about this, the first month will contain more existential difficulty than it needs to.

### Routine testing

Before you exit, test the rhythm:
- Take a week's annual leave and deliberately work on ABLE full-time from home
- Note: when do you start working? When do you stop? Do you have lunch? Do you go outside?
- The patterns that emerge in a one-week test are the patterns you'll be managing full-time
- Identify what you need to deliberately add that the office structure was providing implicitly: human contact, movement, a hard stop at the end of the day

This test is not optional. It will surface issues you need to design for before they become problems in Month 1.

### Loneliness — plan for it explicitly

Solo founder plus remote plus no colleagues is an isolation risk. Plan the antidote before it is needed:

- **Co-working**: identify one co-working space in your area or base city. Even one day a week changes the energy of the week. Second Home, Fora, WeWork, or a local independent space.
- **Discord community**: ABLE should have an artist community Discord from early on — this is social infrastructure for both artists and for you.
- **Founder peer group**: find 2–3 other solo SaaS founders at a similar stage. Indie Hackers, MicroConf community, or London founder networks. Monthly video call. You are not alone in building alone.
- **Coffee meetings**: schedule one coffee meeting per week with someone outside ABLE — a producer, an artist, a tech person, an old colleague. This is not networking. It is maintenance of perspective.

### Mental health — name it directly

The first year of solo founder life has a predictable emotional arc: initial euphoria (freedom), followed by the reality of the grind (Month 2–3), followed by a trough (Month 4–6 when the early honeymoon is over but the business hasn't accelerated yet), followed by stabilisation.

Most people who fail to stick with it quit in the trough. Not because the business has failed, but because they don't have the support to hold their nerve through a hard stretch.

Preparation:
- Identify a therapist or coach before you need one — not after you're already in the trough. A therapist who knows your context from Day 1 is more useful than one you find in Month 4 when you're already struggling.
- Weekly review practice: 5 sentences every Sunday. What changed this week. Keep the log. In the trough, reading your own log from 3 months earlier shows you how far you've come and that things do move.

### The celebration plan

When you hand in notice, mark it. This is a significant event.
- Who are the 5 people who should hear this from you directly, before you post anything publicly?
- What does the celebration look like? Not a party necessarily — something that makes it feel real and significant.
- This is also the launch of the James-is-all-in-on-ABLE story. The TikTok post, the Instagram, the message to your 10 founding artists — these are both personal and strategic. Make them feel honest.

---

## Part 8: The Exit Day Checklist

Things to do the day James hands in his notice:

1. Write the resignation letter the evening before. Sleep on it. Send it the next morning. Keep it warm and professional — this employer may refer clients, become a customer, or introduce you to someone valuable in Year 2.
2. Agree the final working day and handover plan in the resignation meeting. Do not leave this undefined.
3. Get a confirmed P45 date from HR.
4. Register with HMRC as self-employed (online, hmrc.gov.uk, 10 minutes).
5. Tell the people who need to know before it becomes common knowledge: accountant, close family, any co-founders or key people in ABLE.
6. Update LinkedIn: title "Founder, ABLE — the independent artist's professional home." No hyperbole. Direct.
7. Post: "I handed in my notice today. Building something for independent musicians full-time." On TikTok and Instagram. This is marketing and accountability simultaneously.
8. Send a personal email to your founding artists (the 10 who were earliest): "I'm all in. Expect more from me." This email matters.
9. Set an auto-reply on your work email for the final period: direct people to your personal email and note that you're moving on to a new venture.
10. Open something you enjoy. This day matters. Let it be felt.

---

## Part 9: The First 30 Days Full-Time

This is the most dangerous period. The structure that was previously imposed (commute, colleagues, calendar) is gone. The to-do list is infinite. The natural response is to try to do everything. That response produces nothing.

**Week 1: Resist building. Talk to artists.**

Schedule 5 conversations with current or potential artists in the first week. Not to sell. To understand. "What's the hardest thing about your release this month?" "What do you wish ABLE did that it doesn't?" "What would make you recommend this to another artist?"

Record the calls (with consent). Feed transcripts to Claude. Extract the top 3 recurring themes. Those themes are the sprint backlog for Week 2.

Do not touch the codebase in Week 1 unless there is a live bug affecting paying artists.

**Week 2: One sprint, one priority.**

Take the single most important thing that came from the artist conversations. Build it. Ship it. Tell those 5 artists what you built and why.

One thing done is worth ten things half-started.

**Week 3: Hire.**

If MRR is at £5k going full-time, the community manager role is now self-funding. Begin the process:
- Post the role spec on Twitter/X, Indie Hackers, and in relevant Discord communities
- The right person is probably already in the ABLE Discord or in the music production community — someone who understands both the artistic world and operational logistics
- Part-time first (10 hours/week) — this is the test before full commitment
- The hire changes the energy. You are no longer completely alone in this.

**Week 4: Review.**

Ask the honest questions:
- Is MRR still growing?
- Are artists happy (check NPS, check support tickets)?
- Is the routine working? (Are you rested or running on adrenaline?)
- What would make Month 2 better than Month 1?

Write the answers down. Five sentences. The log starts here.

---

## Part 10: The Portugal / Nomad Transition

The exit from employment and the transition to Portugal/nomad life are two separate events. Do not conflate them.

**Recommended sequence:**
1. Exit employment. Remain UK-based for 3–6 months.
2. Get 2+ years of self-assessment returns filed (or at minimum 1 full year with a current-year projection) — UK bank accounts and some financial products require 2 years of accounts from a director.
3. Apply for Portugal D8 Digital Nomad Visa once ABLE revenue is demonstrably stable and above the €760/month income threshold (the visa requirement — not the sustainability threshold; ABLE will be well above this by exit).
4. Apply for Non-Habitual Resident (NHR) status in Portugal on arrival. This must be done in the first year of residency. The 10-year favourable tax treatment on foreign-sourced income starts from NHR approval.
5. Maintain a UK address (family home or registered address service) for company registration, banking, and HMRC correspondence. Do not break UK ties prematurely.
6. Get cross-border UK/Portugal tax advice before moving. The interaction of UK corporate tax, director salary, dividends, and Portuguese NHR is specific and requires professional guidance.

The nomad rhythm (from master strategy):
**3 months Portugal → 2 months Thailand → 1 month Dubai → 3 months Colombia → repeat**

This is a Year 2 consideration. At exit, the priority is stability. Get the business running smoothly on full-time attention before adding the complexity of international movement.

---

*Read monthly. Update as items complete. When every section is green, the shift is ready.*
*Cross-reference: `PRE-SHIFT-CHECKLIST.md` for the monthly tracker.*
