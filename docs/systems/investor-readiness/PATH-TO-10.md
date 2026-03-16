# ABLE — Investor Readiness: PATH-TO-10
**Written: 2026-03-16**
**Status: Active — this is the gap analysis and action plan**

> This document maps the distance between where investor readiness is today and where it needs to be before any raise conversation starts. It is a working to-do list, not a strategy document.

---

## Current Score Assessment

### INVESTOR-READINESS.md itself: 10/10 (the spec is complete)

The specification is thorough. The gap is execution — building the materials and collecting the metrics described.

---

## Gap Analysis: Where Things Stand Today

### Metrics readiness

| Metric | Status | Gap |
|---|---|---|
| MRR | Not yet live — product pre-launch | Need Stripe live + first paying customers |
| MRR growth rate | Not applicable yet | Need 3 months of paying customers |
| Artist count | Has local test data only | Need Supabase live with real sign-ups |
| Free → paid conversion | Not measurable yet | Need 100+ free artists to measure cohort |
| Monthly churn | Not measurable yet | Need 3+ months of paying customers |
| ARPU | Not yet live | Need Stripe live |
| CAC | Partial — organic only | Need first channel test with attribution |
| LTV | Projected only | Derived from churn + ARPU once live |
| LTV:CAC | Projected only | Derived from CAC + LTV |
| NPS | Zero responses | Need Tally.so survey set up and sent |
| Fan capture rate | Not connected | Need PostHog + Supabase live |
| 90-day retention | Not measurable | Need 90 days of real users |

**Score today: 2/10 on metrics readiness.** The spec is complete; the data is not.

---

## Action Plan: Steps to 10/10

### Step 1: Stripe live + first paying customers (prerequisite for most metrics)

**What:**
- Stripe subscription billing live (Artist tier £9/mo, Artist Pro £19/mo, Label £49/mo)
- First paying customers onboarded

**How:**
- Stripe integration lives in `admin.html` — verify it's wired to live keys, not test keys
- First 20 artist outreach wave (producer seeding strategy from `docs/ABLE_STRATEGY.md`)
- Target: first 10 paying artists within 60 days of launch

**Unlocks:** MRR, ARPU, churn rate (after 60 days), LTV:CAC calculation

---

### Step 2: Supabase live + attribution tracking

**What:**
- Supabase in production (not local/dev)
- Fan sign-ups writing to Supabase `fans` table
- Page views writing to Supabase `views` table or PostHog

**How:**
- Verify Supabase project `jgspraqrnjrerzhnnhtb` has production tables populated
- Add PostHog snippet to `able-v7.html` with utm_source pass-through
- Test: visit a profile via `?utm_source=instagram`, sign up as fan, verify attribution in Supabase

**Unlocks:** Fan capture rate, source attribution, the "fan list" demo moment

---

### Step 3: NPS survey setup

**What:**
- A Tally.so (or Typeform) survey with the standard NPS question
- Triggered automatically 30 days after artist sign-up
- Responses tracked in a simple spreadsheet

**How:**
1. Create survey at tally.so: "On a scale of 0–10, how likely are you to recommend ABLE to another artist? [Optional: What's the main reason for your score?]"
2. Add survey link to the 30-day automated email sequence (when email is live via Resend)
3. Until email automation is live: manually send to every artist at 30 days post-sign-up
4. Track responses in a Google Sheet with NPS score, response text, date, artist name

**Target:** First NPS data from first 30 artists. Minimum 30 responses before reporting to investors.

---

### Step 4: Build the one-page metrics summary document

**What:**
- A Google Doc template matching the table in `INVESTOR-READINESS.md` Part 1
- Updated monthly on the 1st of each month
- Exported as PDF and uploaded to the data room

**How:**
1. Create Google Doc: `ABLE Metrics — [Month YEAR]`
2. Fill in every field from Stripe and Supabase on the first of each month
3. Export to PDF, add to data room `1 — Immediate Access` folder
4. Archive previous month's version in a `Archive` subfolder

---

### Step 5: Build the Google Drive data room

**What:**
- Google Drive folder: `ABLE — Investor Data Room`
- Three subfolders: `1 — Immediate Access`, `2 — After First Meeting`, `3 — Under NDA`
- Initial contents populated

**Contents checklist:**

Tier 1 (immediate):
- [ ] Company overview one-pager (draft from INVESTOR-STRATEGY.md content)
- [ ] Metrics snapshot (from Step 4)
- [ ] Product demo video (from Step 6)
- [ ] Team bio one-pager

Tier 2 (after first meeting):
- [ ] Financial model spreadsheet (from INVESTOR-READINESS.md Part 3)
- [ ] Market sizing PDF (from docs/MARKET_SIZING.md)
- [ ] Competitive landscape PDF (from docs/competitive/)
- [ ] Traction evidence PDF (screenshots of real data)
- [ ] Use of funds one-pager

Tier 3 (NDA):
- [ ] Supabase schema export
- [ ] Revenue by cohort (once 3+ months of data exists)
- [ ] Churn analysis
- [ ] Cap table (currently: James 100%)

---

### Step 6: Record the product demo video

**What:**
- 4–5 minute screen recording of the full artist journey
- Following the script in INVESTOR-READINESS.md Part 4
- Uploaded as Loom (private link) or YouTube (unlisted)

**Prerequisites:**
- able-v7.html deployed and loaded with a real-looking artist profile
- admin.html deployed and showing real (or convincing demo) fan data
- Mobile viewport simulation set up (DevTools → 375px)

**When to record:**
- After at least 5 real artists have used the product (so the admin demo shows real data)
- After the first real fan sign-up has occurred (show it happening, not simulated)
- Record fresh every 4–6 weeks — products evolve and the demo must stay current

---

### Step 7: Start the pre-raise investor list

**What:**
- 15 people identified who match the investor archetypes in INVESTOR-STRATEGY.md Part 7
- Monthly update email initiated (even before any revenue)
- Notes on each person: how known, what they invest in, what they could introduce

**Format:**
```
Name | Connection | Archetype | Music background | First contact date | Last update sent | Notes
```

**Start with:**
- Music industry contacts James already knows
- Producers in the seeding programme (they're insiders — may know angels)
- UK startup ecosystem contacts (not music-specific but trustworthy)

**The goal:** By the time ABLE has 100 paying artists, at least 5 people on this list have been receiving monthly updates for 3+ months. They're warm before the raise conversation starts.

---

### Step 8: Build the financial model spreadsheet

**What:**
- A Google Sheets model with the structure from INVESTOR-READINESS.md Part 3
- Three scenarios (conservative / base / optimistic)
- 12 months of monthly projections
- Linked to real inputs (update Stripe MRR monthly)

**How:**
1. Create the spreadsheet structure (columns: month, free artists, paying artists, new free signups, conversion, churn, MRR, costs, net)
2. Build the three scenario tabs
3. Add a summary tab showing the key milestones under each scenario
4. Lock the formula cells; only inputs are editable
5. Add a "Actuals vs Model" tab once real data starts flowing

**Rule:** Never share the model without walking through it once yourself first. Find your own errors before an investor does.

---

### Step 9: Set up the monthly investor update process

**What:**
- A repeating calendar reminder: "Investor update email — send by 3rd of each month"
- A template in email drafts (from INVESTOR-READINESS.md Part 6)
- A BCC list maintained separately

**Process:**
1. On the 1st of each month: pull metrics from Stripe and Supabase
2. Update the metrics snapshot document
3. Write the 200-word update using the template
4. Send to the BCC list
5. File a copy in `ABLE — Correspondence` folder

**Start sending even before the first paying customer.** The first few updates might be: "Product is live. First outreach is underway. No paying customers yet — here's what I'm watching." That level of transparency builds trust precisely because you're not hiding the early stage.

---

### Step 10: Establish the NDA and data room sharing process

**What:**
- A simple one-page NDA template (Google Docs, send via DocuSign or HelloSign)
- A clear process for advancing an investor through the data room tiers

**Process:**
1. Investor expresses interest → send Tier 1 materials (no NDA)
2. First meeting / call → send Tier 2 materials
3. Investor signals they want to go deeper → send NDA for signature → share Tier 3

**NDA template:** Get a UK-standard NDA from a solicitor (1-hour consultation, ~£200). Do not use a template from the internet for anything material.

---

## Milestone Gates to Investor Readiness

| Gate | What it takes | Why it matters |
|---|---|---|
| Gate 1: "I have numbers" | First 10 paying artists, Stripe live | Can talk to anyone with real MRR |
| Gate 2: "I have a story" | 50 paying artists, NPS from 20 responses | Pre-seed conversation territory |
| Gate 3: "I'm raise-ready" | 100 paying artists, NPS 35+, churn under 6%, one channel under £20 CAC | Per INVESTOR-STRATEGY.md minimums |
| Gate 4: "I'm raising" | 200+ paying artists, 3+ months trend data, data room complete | Active fundraise begins |

**Current gate:** Pre-Gate 1. Product is built; customers are next.

---

## The Most Common Investor Question ABLE Isn't Ready For Yet

"Show me 90-day cohort retention."

This requires 90 days of real users. There is no shortcut. The answer right now is: "We don't have 90 days of data yet. Here's what we have." That's an honest answer and an acceptable one at pre-seed, as long as the product is clearly working.

The plan: by the time ABLE has the first serious investor conversation, there should be at least 60 days of real user data. The 90-day retention number will be partial (the earliest cohort) but real. "Our first cohort is 75 days in and retention is tracking at 55%" is a credible early answer.

---

*Updated: 2026-03-16*
*Path-to-10 for the broader investor readiness system. The main document is `INVESTOR-READINESS.md`.*
