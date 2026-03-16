# ABLE — Investor Readiness Pack
**Version: 1.0 | Written: 2026-03-16**
**Status: Active — update metrics monthly before any investor conversation**

> This is the PRACTICAL pack. The narrative, thesis, and exit map live in `docs/systems/investor-strategy/INVESTOR-STRATEGY.md`. This document is about what an investor will ask for and what you need to have ready the moment someone says "send me your numbers."

---

## Part 1: The 12 Metrics That Matter

For each metric: what it is, how to calculate it, where to find it, and what "good" looks like for ABLE's stage.

---

### 1. MRR — Monthly Recurring Revenue

**What it is:** Total subscription revenue collected in a given calendar month. The single most important number for a SaaS company.

**How to calculate:** Sum of all active subscription charges in the month. Include any annual subscriptions pro-rated to monthly. Exclude one-off payments, refunds, and failed charges.

```
MRR = (count of Artist tier subscribers × £9) + (count of Pro tier × £19) + (count of Label tier × £49)
```

**Where to find it:** Stripe Dashboard → Revenue → Monthly recurring revenue. Or Stripe's MRR report under Billing → Overview.

**What "good" looks like:**
- Pre-seed raise ready: £1,000–£2,000 MRR
- Meaningful signal: £5,000 MRR (job exit trigger)
- Seed raise ready: £5,000–£10,000 MRR
- Series A territory: £50,000+ MRR

**Current:** [INSERT — check Stripe dashboard]

---

### 2. MRR Growth Rate (Month-over-Month %)

**What it is:** The percentage increase in MRR from one month to the next. Investors use this to project trajectory — a flat MRR line tells a different story than a 20% compound curve.

**How to calculate:**
```
MoM growth % = ((MRR this month − MRR last month) / MRR last month) × 100
```

**Where to find it:** Stripe Dashboard → Revenue trend. Or calculate manually from FreeAgent monthly P&L.

**What "good" looks like:**
- Early stage (under £2k MRR): 20–50% month-over-month is credible
- Growth stage (£2k–£10k MRR): 15–25% is strong
- Consistency matters more than any single month's spike — three months of steady growth > one big month

**Current trend (3-month view):**
- 3 months ago: £[X]
- 2 months ago: £[X]
- Last month: £[X]
- Trend: [Up / Flat / Down]

---

### 3. Artist Count (Total, Paying, Active Last 30 Days)

**What it is:** Three separate numbers that tell different parts of the story. Total is vanity; paying is the real number; active is the health number.

**How to calculate:**
```
Total artists = COUNT(*) FROM profiles
Paying artists = COUNT(*) FROM profiles WHERE tier IN ('artist', 'pro', 'label') AND status = 'active'
Active (30d) = COUNT(*) FROM profiles WHERE last_seen >= NOW() - INTERVAL '30 days'
```

**Where to find it:** Supabase Dashboard → Table Editor → profiles. Or run the SQL above in Supabase SQL Editor.

**What "good" looks like:**
- Active/total ratio above 40% signals genuine product-market fit (not just sign-up-and-forget)
- Paying/total ratio: your free-to-paid conversion (see metric 4 below)
- 100 paying artists = pre-seed raise threshold (per investor-strategy doc)
- 500 paying artists = seed raise threshold

**Current:**
- Total artists: [INSERT]
- Paying artists: [INSERT]
- Active last 30 days: [INSERT]
- Active/total ratio: [CALCULATE]

---

### 4. Free-to-Paid Conversion Rate

**What it is:** The percentage of artists who signed up on the free tier and subsequently upgraded to a paid tier. The critical health metric for a freemium SaaS.

**How to calculate:**
```
Conversion rate % = (artists who have ever upgraded / total artists who signed up on free) × 100
```

Note: also track the time-to-convert — how many days between free sign-up and first paid charge. If it's over 90 days, the conversion trigger may need work.

**Where to find it:** Supabase — join profiles table to Stripe webhook events for subscription creation. Or Stripe's cohort conversion report under Billing → Customers.

**What "good" looks like:**
- Industry benchmark for SaaS tools with a hard feature gate: 8–12%
- ABLE's target: 15% (the 100-fan cap is a natural, felt limit — not an arbitrary feature gate)
- Below 5%: the gate isn't compelling enough, or the product isn't delivering enough value before it
- Above 20%: exceptional — but verify it's sustainable before using it as a headline number

**Current:** [INSERT] %

**The key question to answer:** Are artists converting because they hit the 100-fan cap (good — the gate is working) or for another reason? Ask in the exit survey.

---

### 5. Monthly Churn Rate

**What it is:** The percentage of paying artists who cancel their subscription in a given month. The most important retention metric. A high churn rate means you're filling a leaky bucket.

**How to calculate:**
```
Monthly churn % = (artists who cancelled in the month / active paying artists at start of month) × 100
```

Distinguish between:
- **Voluntary churn:** artist chose to cancel
- **Involuntary churn:** failed payment (card expired, etc.) — recoverable with dunning

**Where to find it:** Stripe Dashboard → Billing → Churn. Or Stripe Sigma for custom queries.

**What "good" looks like:**
- Elite: under 2%/month (annual retention 78%+)
- Strong: 2–3%/month (annual retention 70–78%)
- Acceptable: 3–5%/month (annual retention 54–70%)
- Problem: above 5%/month — fix before scaling acquisition
- ABLE target: sub-3% (achievable given the fan list lock-in — artists don't want to lose their list)

**Current:** [INSERT] %/month

**Watch for:** Seasonal patterns. Artists may churn after their release window closes. If churn spikes in months 3–4 post-sign-up, the inter-release product value needs work.

---

### 6. Average Revenue Per User (ARPU)

**What it is:** The average monthly subscription value per paying artist. Tells you whether tier mix is healthy.

**How to calculate:**
```
ARPU = MRR / count of paying artists
```

**Where to find it:** Calculated from Stripe MRR and paying artist count.

**What "good" looks like:**
- Artist tier only (£9): ARPU = £9
- Artist + Pro mix (60/30 split): ARPU ≈ £12
- Artist + Pro + Label (60/25/15): ARPU ≈ £14
- Target at scale: £12/month blended (the number used in all investor projections)

**Current:** £[CALCULATE — MRR / paying artists]

**Watch for:** ARPU declining over time (new artists signing up disproportionately on free or base tier — healthy as long as conversion follows). ARPU increasing = product expanding value at higher tiers.

---

### 7. Customer Acquisition Cost (CAC)

**What it is:** How much it costs to acquire one paying artist. The companion metric to LTV. Tells you whether each acquisition channel is economically sustainable.

**How to calculate:**
```
CAC = total marketing and sales spend in the month / new paying artists acquired in the month
```

Track separately per channel:
- Organic / word of mouth: effective CAC = £0 (producer seeding cost divided by referrals)
- TikTok paid: total TikTok spend / TikTok-attributed paying sign-ups
- Reddit organic: time cost (estimate at £[James's hourly rate]) / Reddit-attributed paying sign-ups
- Producer seeding: cost of 20 free Pro accounts (£380/mo) / artists referred who convert to paid

**Where to find it:** Ad platform dashboards (TikTok Ads Manager, Meta Ads Manager) + Stripe + attribution data from PostHog (utm_source on landing page).

**What "good" looks like:**
- Under £20: excellent for this ARPU — 1.7-month payback period
- £20–30: acceptable, especially if LTV is £200+
- £30–50: investigate — either reduce spend or improve conversion
- Above £50: unsustainable at £9/mo ARPU unless LTV is confirmed above £200

**Current (by channel):**
- Organic / word of mouth: £[INSERT]
- Paid channels: £[INSERT]
- Producer seeding: £[INSERT]
- Blended CAC: £[INSERT]

---

### 8. Lifetime Value (LTV)

**What it is:** The predicted total revenue from one paying artist over their lifetime as a customer. The key variable in determining whether a CAC is sustainable.

**How to calculate:**
```
LTV = ARPU / monthly churn rate

Example: £12 ARPU / 3% churn = £400 LTV
Example: £12 ARPU / 5% churn = £240 LTV
```

For a more sophisticated version: LTV = ARPU × average months retained. At 3% churn, average months = 1/0.03 = 33 months.

**Where to find it:** Calculated from ARPU and churn rate (both from Stripe). At early stage, you'll use projected churn, not historical — be clear about that distinction when presenting.

**What "good" looks like:**
- £200+: viable business
- £300+: healthy unit economics at CAC under £30
- £400+: strong — signals the product is genuinely sticky
- LTV above £400 at 3% churn and £12 ARPU is realistic and defensible

**Current (projected):** £[CALCULATE — ARPU / churn rate]

---

### 9. LTV:CAC Ratio

**What it is:** The ratio of lifetime value to acquisition cost. The single most important unit economics metric for investors. Must be above 3:1 to be considered investable. Above 5:1 is strong.

**How to calculate:**
```
LTV:CAC = LTV / CAC

Example: £400 LTV / £25 CAC = 16:1 (excellent)
Example: £300 LTV / £50 CAC = 6:1 (strong)
Example: £200 LTV / £40 CAC = 5:1 (acceptable)
Example: £150 LTV / £60 CAC = 2.5:1 (not investable)
```

**Where to find it:** Calculated from LTV and CAC (above).

**What "good" looks like:**
- 3:1 minimum (the SaaS standard "investability threshold")
- 5:1 or better: strong for a pre-seed raise
- 10:1+: exceptional — either the product is very sticky or CAC is very low (often organic products)
- Note: if CAC is £0 (pure organic), LTV:CAC is infinite — still good, but investors will ask "what happens when organic plateaus?"

**Current:** [CALCULATE — LTV / blended CAC]

---

### 10. Net Promoter Score (NPS)

**What it is:** A measure of artist satisfaction and likelihood to recommend ABLE. Survey question: "On a scale of 0–10, how likely are you to recommend ABLE to another artist?" Promoters (9–10) minus Detractors (0–6) = NPS. Ranges from -100 to +100.

**How to calculate:**
```
NPS = (% Promoters − % Detractors)
Promoters = respondents who gave 9 or 10
Passives = respondents who gave 7 or 8
Detractors = respondents who gave 0–6
```

**Where to find it:** Tally.so survey sent to artists after 30 days of use. Link in admin.html onboarding sequence. Track responses in Tally.so dashboard.

**Survey cadence:**
- First NPS: 30 days after sign-up (they've experienced at least one release cycle)
- Second NPS: 90 days (they've had time to use the fan list)
- Annual NPS pulse: sent to all active artists in January

**What "good" looks like:**
- Below 20: fix the product before raising
- 20–35: acceptable — find out what detractors are saying
- 35–50: strong for a pre-seed raise
- Above 50: exceptional — lead with this number
- Pre-seed raise minimum: NPS above 35 from at least 30 responses

**Current:** [INSERT — NPS score from Tally.so] (from [X] responses)

---

### 11. Fan Capture Rate

**What it is:** The percentage of profile visitors who sign up as fans. The metric that proves the core product promise — that ABLE converts platform attention into owned relationships.

**How to calculate:**
```
Fan capture rate = (fan sign-ups in the period / unique profile visitors in the period) × 100
```

Track this per artist to identify outliers: which artists are converting above the average? What are they doing differently?

**Where to find it:**
- Fan sign-ups: Supabase `fans` table (count of rows per artist per period)
- Profile visitors: PostHog event `page_view` on able-v7.html, grouped by artist slug

**What "good" looks like:**
- Below 3%: the page isn't compelling enough, or the sign-up ask is too buried
- 3–6%: acceptable — comparable to email list capture on artist websites
- 6–10%: strong — better than most newsletter sign-up pages
- Above 10%: exceptional — verify the traffic quality (low-quality traffic inflates this)
- ABLE target: 8%+

**Current (platform average):** [INSERT] %

**The leading indicator:** Fan capture rate by campaign state. Pre-release mode should be highest (urgency of countdown). Gig mode should be second (FOMO of tonight's show). If these don't outperform the default profile state, the campaign mechanics aren't working.

---

### 12. Artist Retention (90-day)

**What it is:** The percentage of artists who are still using ABLE 90 days after sign-up. The most honest measure of whether the product creates ongoing value — not just a first-week spike.

**How to calculate:**
```
90-day retention = (artists who signed up 90 days ago AND have been active in the last 14 days) / (artists who signed up 90 days ago) × 100
```

"Active" = logged into admin.html, updated their profile, or had a fan sign up via their page.

**Where to find it:** Supabase — join profiles created_at with last_seen (or PostHog cohort analysis for the activity definition).

**What "good" looks like:**
- Below 30%: serious product problem — fix before acquiring more artists
- 30–45%: acceptable for a tool with an obvious inter-release dead zone
- 45–60%: strong — the inter-release utility is working
- Above 60%: excellent — comparable to the best creator tools
- ABLE target: 50%+ (ambitious but achievable if admin.html is genuinely useful between campaigns)

**Current:** [INSERT] % (from [X] cohort, measured [DATE])

---

## The One-Page Metrics Summary

Print this table before every investor meeting. Handwrite the current numbers in pen — it signals you know them cold.

```
ABLE — METRICS SNAPSHOT
Date: [DATE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVENUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MRR:                £[X]        ([±X%] from last month)
MRR 3-month trend:  £[X] → £[X] → £[X]
ARPU:               £[X]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARTISTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total artists:      [X]
Paying artists:     [X]
Active (30d):       [X]
Free → paid conv:   [X]%
Monthly churn:      [X]%
90-day retention:   [X]%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UNIT ECONOMICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LTV (projected):    £[X]
Blended CAC:        £[X]
LTV:CAC:            [X]:1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT HEALTH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NPS:                [X]  (from [X] responses)
Fan capture rate:   [X]%
Fans captured:      [X] total

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MY WEAKEST METRIC RIGHT NOW:
[One honest sentence. Investors trust founders who know their weak spot.]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Rule:** Never walk into an investor meeting unable to explain your weakest metric. Name it first. Explain what you're doing about it. This signals self-awareness and builds trust faster than polished answers about your strongest metric.

---

## Part 2: The Investor Data Room

A Google Drive folder, shared under NDA. Structured in three tiers by information sensitivity.

### Setup

1. Create a Google Drive folder: `ABLE — Investor Data Room`
2. Inside it, create three subfolders: `1 — Immediate Access`, `2 — After First Meeting`, `3 — Under NDA`
3. Share `1 — Immediate Access` without NDA. Share `2` after first meeting. `3` only after NDA is signed.
4. Use Google Drive's "Share with specific people" not a public link — you want to know who's looking.

---

### Tier 1 — Share immediately (no NDA required)

These materials should be ready to share within 24 hours of any investor expressing interest.

**1.1 — Company overview (one page, PDF)**

What it contains:
- ABLE in one sentence
- The problem (specific, with named competitors and their failures)
- The solution (four campaign states + fan capture + 0% revenue cut)
- The market (UK SAM: 35,000 artists, £5M ARR potential)
- The team (James, founder-market fit, AI leverage)
- Current stage and what you're raising

Format: one A4 page, PDF export from a clean document. ABLE brand colours. No deck format — a one-pager signals confidence.

File name: `ABLE-Company-Overview-[MONTH-YEAR].pdf`

**1.2 — Metrics snapshot (one page, PDF)**

The filled-in table from Part 1 above. Printed, photographed, and uploaded as PDF. Or typeset in a clean document. The point: it is specific, honest, and current.

File name: `ABLE-Metrics-[MONTH-YEAR].pdf`

**1.3 — Product demo video (5 minutes, unlisted YouTube or Loom)**

See Part 4 for the full script. This is the most important asset in the data room. An investor who watches 5 minutes of the product working is worth ten who read a deck.

File name / link: `ABLE-Product-Demo-[VERSION].loom` (or YouTube unlisted URL)

**1.4 — Team bio (one page, PDF)**

James's background:
- 15+ years in digital product
- Founded ABLE in [YEAR]
- Built the full product (profile, admin, onboarding, landing) as a solo developer augmented by AI agents
- Background: [specific previous roles — fill in with real experience]
- Founder-market fit: deep understanding of the musician's aversion to marketing-speak; product philosophy is a direct expression of this

One line on what's missing and how it's being addressed: "No music industry insider relationships yet. Mitigation: the producer seeding strategy is designed to build these from the inside out, not from industry connections in."

File name: `ABLE-Team-[MONTH-YEAR].pdf`

---

### Tier 2 — Share after first meeting

These materials go deeper. Share them only after a genuine first meeting conversation — they reward curiosity and signal progress without overwhelming the first impression.

**2.1 — Financial model (Google Sheets or Excel)**

See Part 3 for the full model template. The file must be:
- Bottom-up (inputs James can defend on the spot)
- Three scenarios (conservative / base / optimistic)
- 12 months of projections
- No circular references, no broken formulas, no hidden cells

Rule: never share a financial model you can't explain every cell of. An investor who finds a formula error or an assumption you can't defend will lose confidence faster than any weak metric.

File name: `ABLE-Financial-Model-[MONTH-YEAR].xlsx`

**2.2 — Market sizing document**

Source: `docs/MARKET_SIZING.md` and `docs/MARKET_VALIDATION.md`. The investor-facing version should be a clean PDF, not the raw markdown. Include sources for every number. Never round up TAM to the nearest convenient billion.

File name: `ABLE-Market-Sizing-[MONTH-YEAR].pdf`

**2.3 — Competitive landscape**

A table and a narrative. The table: compare ABLE to Linktree, Beacons, Feature.fm, Big Link on the dimensions that matter (campaign states, fan ownership, revenue cut, Spotify import, analytics depth, price). The narrative: two paragraphs on why the competition's architecture makes it hard to copy what ABLE is doing.

Do not bash competitors. Be factual. "Beacons charges 9% on its free tier" is a fact. "Beacons is terrible" is an opinion that signals insecurity.

File name: `ABLE-Competitive-Landscape-[MONTH-YEAR].pdf`

**2.4 — Traction evidence**

Screenshots, in order of credibility:
1. Paying artist subscriptions visible in Stripe (redact card numbers; keep names or initials)
2. Fan sign-ups in Supabase (show the table, not just a count)
3. NPS survey responses (verbatim, with artist consent where named)
4. One or two artist profile screenshots showing real content (with artist permission)
5. Any press mentions or community posts (Reddit, Twitter, Discord) that are unprompted

Rule: no staged screenshots, no demo data presented as real. Investors will ask "is this real data?" — the answer must always be yes.

File name: `ABLE-Traction-Evidence-[MONTH-YEAR].pdf`

**2.5 — Use of funds**

A one-page breakdown of exactly what the raise buys. Specific roles, specific costs, specific milestones. No "general working capital." See the deployment plan in `docs/systems/investor-strategy/INVESTOR-STRATEGY.md` Part 4 for the full breakdown.

File name: `ABLE-Use-of-Funds-[MONTH-YEAR].pdf`

---

### Tier 3 — Under NDA only

These go to serious investors who are clearly moving toward a term sheet. Do not share under casual interest.

**3.1 — Supabase data architecture**

The full schema: tables, relationships, keys. Shows technical thoughtfulness. Also surfaces the data moat story concretely — an investor who sees the `fans`, `clicks`, and `views` tables mapped per artist understands immediately what ABLE is accumulating.

**3.2 — Revenue by cohort**

Cohort analysis: for each month's intake of new paying artists, show their MRR contribution over subsequent months. This is the definitive proof of retention and the health of the subscription model.

**3.3 — Churn analysis**

Which artists churned, when, and the exit survey data on why. Investors who have backed SaaS companies before will ask for this. The honest analysis of churn reasons is a sign of maturity, not vulnerability.

**3.4 — Cap table**

If any equity has been granted (to advisors, co-founders, or previous investors), the cap table must be clean and available. At solo-founder stage: James owns 100%. This is an excellent position to be in. When advisors are brought on: equity via SAFE or option pool, never informal arrangement.

---

## Part 3: The Financial Model Template

A 12-month bottom-up model. Every input is something James can defend in a live conversation.

### Core inputs (month 1 = current state)

| Input | Value | How to determine |
|---|---|---|
| Starting paying artists (month 1) | [current number] | Stripe dashboard |
| Monthly new free sign-ups | Conservative: 10 / Base: 25 / Optimistic: 60 | Based on channel plan |
| Free → paid conversion rate | 8% (Conservative) / 12% (Base) / 20% (Optimistic) | Industry benchmark; 15% is ABLE's target once trigger is working |
| Monthly churn rate | 5% (Conservative) / 3.5% (Base) / 2% (Optimistic) | Target; adjust to actuals once data exists |
| ARPU | £11 (Conservative) / £12 (Base) / £14 (Optimistic) | 70/20/10 tier mix; adjust as actuals emerge |
| Hosting costs | £44/month | Netlify + Supabase (current) |
| Email costs | £10/month | Resend |
| AI API costs | £100/month | Claude API for copy generation |
| James's salary draw | £0 (pre-£5k MRR) / £2,000 (post-£5k MRR) | Personal decision; visible in model |

### Monthly model mechanics

For each month M:

```
New paying artists (M) = Free sign-ups (M-1) × conversion rate + new direct paid sign-ups
Churned artists (M) = Paying artists (M-1) × monthly churn rate
Paying artists (M) = Paying artists (M-1) + New paying (M) − Churned (M)
MRR (M) = Paying artists (M) × ARPU
Costs (M) = Hosting + Email + AI + James's salary draw + any one-off costs
Net (M) = MRR (M) − Costs (M)
```

### Milestone snapshots under each scenario

**Conservative scenario** (8% conversion, 5% churn, £11 ARPU, 10 new free/mo):

| Month | Free artists | Paying | MRR | Costs | Net |
|---|---|---|---|---|---|
| 1 | [start] | [start] | £[X] | ~£154 | £[X] |
| 3 | [calc] | [calc] | £[X] | ~£154 | £[X] |
| 6 | [calc] | [calc] | £[X] | ~£154 | £[X] |
| 9 | [calc] | [calc] | £[X] | ~£154 | £[X] |
| 12 | [calc] | [calc] | £[X] | ~£154 | £[X] |

**Base scenario** (12% conversion, 3.5% churn, £12 ARPU, 25 new free/mo):

| Month | Free artists | Paying | MRR | Costs | Net |
|---|---|---|---|---|---|
| 3 | [calc] | [calc] | £[X] | ~£154 | £[X] |
| 6 | [calc] | [calc] | £[X] | ~£154 | £[X] |
| 9 | [calc] | [calc] | £[X] | ~£154 | £[X] |
| 12 | [calc] | [calc] | £[X] | ~£154 | £[X] |

**Optimistic scenario** (20% conversion, 2% churn, £14 ARPU, 60 new free/mo):

| Month | Free artists | Paying | MRR | Costs | Net |
|---|---|---|---|---|---|
| 3 | [calc] | [calc] | £[X] | ~£154 | £[X] |
| 6 | [calc] | [calc] | £[X] | ~£154 | £[X] |
| 9 | [calc] | [calc] | £[X] | ~£154 | £[X] |
| 12 | [calc] | [calc] | £[X] | ~£154 | £[X] |

**Note:** The actual spreadsheet lives at `[Google Drive link — insert when created]`. The model above shows the structure; populate with actual numbers before any investor meeting. Never present projected numbers as actuals.

### The financial model rules

1. **Every input has a source.** "10 new free sign-ups per month" — explain: this is the current organic rate / this is what the producer seeding should generate / this is what the TikTok test suggested.

2. **No hidden hockey sticks.** If the model shows explosive growth in month 8, explain what changes in month 8. "We assume the paid acquisition channel starts working" is not a valid answer unless you can show why month 8 specifically.

3. **Costs are real.** Include everything: hosting, email, API costs, any contractor time, any tool subscriptions. Do not show a model where costs are £0.

4. **Show the break-even month clearly.** At what MRR does ABLE cover its running costs? At current costs (~£154/month), break-even is approximately 14 artists at £11 ARPU. This is actually a very favourable cost structure — say so.

5. **Salary draw is explicit.** At what MRR does James start paying himself? At what point? This matters to investors because it tells them whether the model assumes James is working for free indefinitely.

---

## Part 4: The Product Demo Script

**Format:** Screen recording. 4–5 minutes. No narration required for the self-serve version — product actions speak. For a live demo with voiceover, use the cues below.

**Setup before recording:**
- Clean browser, no personal tabs visible
- Pre-load able-v7.html with a compelling artist profile (real content, not placeholder)
- Pre-load admin.html with genuine fan data and analytics
- Use a real artist persona: "Mara Yusuf — UK indie-soul artist, 12,000 Instagram followers, just announced a release"
- Disable browser notifications

---

**[0:00–0:45] — The fan experience**

Open able-v7.html on a mobile viewport (375px width, simulated in browser DevTools).

Show: the profile hero. Artist name, artwork, the current campaign state. If it's pre-release mode, the countdown is live. If gig mode, the ticket CTA is prominent.

Scroll slowly. Show: music section, embedded track playable without leaving the page. Show: events card if there's a show. Show: the fan sign-up.

No voiceover needed here. Let the profile load and the quality speak.

**[0:45–1:30] — Fan signs up**

Click "Stay close." (or current fan CTA). The sign-up modal appears. Enter a real-looking email. Submit.

Show: the confirmation. "You're on Mara's list."

No voiceover. But if recording with narration: "A fan visits from Instagram. They sign up. That email belongs to Mara — not ABLE, not Instagram. It's hers."

**[1:30–2:30] — Artist logs in**

Switch to admin.html. Show the dashboard overview. Metrics visible: page views today, fans this week, latest sign-up.

Navigate to the fan list. Show the list with real (or realistic demo) entries: email, source (Instagram / direct / TikTok), timestamp.

If narrating: "The artist sees every fan who signed up, where they came from, and when. This is the most important screen in ABLE."

**[2:30–3:30] — Release campaign**

Navigate to Campaign HQ in admin.html. Show the campaign state selector. Switch from Profile to Pre-release. Enter a release date.

Switch back to able-v7.html. Show the page transformation: countdown timer, pre-save CTA prominent.

If narrating: "This is what Linktree can't do. The page changed. The moment the release date is set, every fan who visits sees the countdown, not the default profile."

**[3:30–4:30] — The comparison moment**

Open a generic Linktree profile in a second browser tab. The contrast is visual and immediate: a list of links, no campaign awareness, no fan capture, no way for a fan to stay connected.

No narration needed. Let the viewer make the comparison.

If narrating: "This is a Linktree. It's a list. It doesn't know that Mara's album drops in 8 days. It doesn't know who visited. It won't capture an email. The fan who clicks through is gone."

**[4:30–5:00] — Close**

Return to admin.html. Show the fan list growing in real time (or the existing list). Hold on it for 5 seconds.

If narrating: "100 fans who chose to stay close. That's worth more than 10,000 Instagram followers who might see the post or might not. This is what ABLE is for."

**End screen (if producing a polished version):**
- `ablemusic.co` / `able.fm`
- "Made for independent musicians."
- Contact: james@able.fm

---

**Demo script notes:**
- Never say "and here you can see that..." — show, don't narrate
- The mobile viewport is essential — ABLE is a mobile-first product and the demo must reflect this
- If recording for an investor who will watch once: 4 minutes is the absolute maximum
- For a live demo in a meeting: let the investor ask what they want to see next — use this script as a menu, not a sequential obligation

---

## Part 5: The Press Pack

For music journalists, blogs, and podcast hosts — not primarily for investors, but investor credibility comes partly from press coverage.

### ABLE at a glance (everything a journalist needs on one page)

**One-sentence description:**
"ABLE is a professional home for independent musicians — a page that captures fans, tracks engagement, and gives artists their data back."

**Longer description (one paragraph):**
ABLE is a campaign platform for independent musicians — built on the insight that an artist's promotional reality changes entirely between a release dropping, a show tonight, and a quiet writing period. Unlike generic link-in-bio tools, ABLE's profile adapts to the artist's current moment. It captures fan emails directly (0% cut, artist-owned data), understands the release cycle, and gives artists analytics that streaming platforms deliberately withhold. Built for the independent artist who has 10,000 Instagram followers but zero emails.

**Three proof points:**
*(Fill in with real data when available. Placeholder format:)*
1. "ABLE artists capture [X]% more fan emails per profile view than the industry average for artist websites."
2. "[X]% of fans who sign up on ABLE profiles have visited at least three times in the subsequent 30 days."
3. "Artists using ABLE's pre-release countdown mode see [X]% higher fan sign-up rates compared to default profile mode."

**Founder quote (pre-written — James to approve before use):**
"Independent artists are the most creative people in music. They deserve better than a generic link-in-bio tool. ABLE is built specifically for them — not for 'creators', not for 'influencers', but for musicians who are releasing records and playing shows and building something real."

**Press contact:** james@able.fm

**High-res assets:**
- ABLE logo (light and dark versions): [Google Drive link]
- Product screenshots — artist profile in each of the four states: [Google Drive link]
- Artist profile mockup on iPhone: [Google Drive link]

**Fact sheet (one page PDF):**
- Founded: [YEAR]
- Based: UK
- Founder: James Cuthbert
- Focus: Independent musicians, active releasing artists
- Pricing: Free tier available; Artist tier £9/mo, Artist Pro £19/mo, Label £49/mo
- Market: 175,000 PRS-registered UK musicians; 4–5M globally
- USP: Profile states that change with the artist's release cycle; 0% revenue cut; artist-owned fan data
- Press assets: able.fm/press (or Google Drive — link here)

**Artist testimonials:**
*(3 testimonials needed — fill in when available. Format:)*
- "[Quote]." — [Artist name], [genre], [city]

---

## Part 6: The Investor Update Email Template

**Sent monthly to 10–15 people on the pre-raise list.** Plain text. No formatting tricks. 200 words maximum.

```
Subject: ABLE — [Month] [Year] Update

MRR: £X (±X% from last month)
Artists: X total, X paying

---

One win:
[One specific thing that worked. "Artist X referred three colleagues after seeing their fan list hit 40 emails" is better than "word of mouth is working."]

One challenge:
[One honest thing that isn't working yet. Investors who get updates without any challenges stop trusting them. "Free → paid conversion is at 7%, below our 12% target. Testing new copy on the upgrade gate this week." is the right level of specificity.]

One metric I'm watching closely:
[The forward-looking signal. "Fan capture rate per profile — currently at 6.2%, targeting 8%. This is the number that tells me whether the campaign states are doing their job."]

One ask:
[A specific question where their input helps. Never "any thoughts?" — that's a waste of their time and yours. "We're deciding between Hypebot and Music Ally for our first press pitch — which has better reach with UK independent artists in your experience?"]

James
---
ABLE — ablemusic.co / able.fm
```

**The rules for this email:**

1. **Monthly, without exception.** A missed month sends a signal. If a month is genuinely bad, that's the most important update to send.

2. **200 words maximum.** Long updates signal disrespect for their time. If you can't say it in 200 words, you don't know what matters.

3. **Numbers first, context second.** MRR and artist count are the first things they read. Everything else is commentary.

4. **The "one challenge" is not optional.** This is the line that builds trust. An investor who sees you being honest about weaknesses in month 3 will believe your strengths in month 9.

5. **The "one ask" must be answerable in 2 minutes.** "What are your thoughts on our Colombia strategy?" requires 20 minutes to answer properly. "Have you ever worked with an artist community in Medellin?" can be answered in 30 seconds.

6. **BCC all recipients.** Keep the list private. They don't need to see who else is on it.

---

## Part 7: The Pre-Meeting Checklist

Run this checklist before every investor meeting or call. The goal: walk in with nothing to look up.

### 48 hours before

- [ ] Pull current metrics from Stripe and Supabase. Fill in the one-page metrics summary.
- [ ] Review the metrics trend for the past 3 months. Know the story before they ask.
- [ ] Identify your weakest metric. Prepare one sentence on what you're doing about it.
- [ ] Check the data room is current. Update any documents with stale dates.
- [ ] Confirm the product demo video is current (within the last 4 weeks). If not, record a new one.

### Day of meeting

- [ ] Know the investor's background (LinkedIn, portfolio, previous investments). Do not ask them to introduce themselves if you can research it.
- [ ] Have the one-page metrics summary in front of you (printed if in person).
- [ ] Know the three key numbers without looking: MRR, paying artists, NPS.
- [ ] Prepare one relevant question for them based on their portfolio: "You backed [Company] — their [specific thing] seems relevant to how we're thinking about [ABLE thing]. Did that pan out?"

### During the meeting

- [ ] Lead with the product, not the pitch. Ask: "Would you like to see the product first?"
- [ ] State your weakest metric before they ask. It signals integrity.
- [ ] End with a specific next step. "Should I send you the financial model?" or "Can I introduce you to one of our artists?" Not: "Let's stay in touch."

### After the meeting (same day)

- [ ] Send a follow-up email within 4 hours. Subject: "ABLE — materials from today." Attach what was discussed.
- [ ] Note: what did they focus on? What did they question? This is free product and positioning research.
- [ ] Add them to the monthly update list if they expressed genuine interest. Ask first.

---

*This document is reviewed and updated monthly. Last updated: 2026-03-16.*
*The narrative strategy, investment thesis, and exit map live in `docs/systems/investor-strategy/INVESTOR-STRATEGY.md`.*
