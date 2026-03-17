# ABLE — Founder State Analysis
**Written: 2026-03-16 | Read this before opening 500-STEPS.md**
**Update this document at the end of every 30-day sprint.**

> This is an honest audit of where James is as a founder. Not aspirational. Not demoralising. Just true. If you can't read this without flinching, that's information too.

---

## The Summary Verdict

You are a technically capable, product-obsessed solo founder with a working prototype, a genuine product insight, and a meaningful moat baked into the core mechanic. You have not yet shipped to real users. You have not yet charged anyone money. You have not yet formed a company. The gap between where you are and where you need to be is real — but it is a 90-day gap, not a 3-year gap. That is the honest position.

---

## Scored State Assessment

### 1. Product Readiness — 6.5 / 10

**What's true:**
- able-v7.html is the most technically complete version yet. The page state system (pre-release / live / gig / profile) is a genuine differentiator — no other link-in-bio tool operates at the campaign-moment level.
- admin.html has fan list, shows, gig toggle, nudge system, and breakdown bars. It is more sophisticated than most competitors at V1.
- start.html onboarding wizard is 3 steps with live preview. Clear and working.
- landing.html exists. Copy philosophy is documented and upheld.
- Supabase credentials are configured. Backend integration is spec'd but not wired.

**Where the gaps are:**
- No Supabase write path yet. All data lives in localStorage. The moment an artist clears their browser, their profile is gone.
- No authentication. Any URL can see any profile. GDPR fan capture has no legal basis without auth and a consent framework.
- fan.html is partially built — fan journey is incomplete end-to-end.
- No custom domain per artist. All profiles load from the same HTML file. Artist branding is isolated to localStorage data, not URL.
- No email delivery. Fan sign-ups are captured but no confirmation email, no welcome sequence.
- No payment integration. Stripe is not wired. The tier system is fully specced but not live.
- Playwright smoke tests exist as a concept, not as a passing suite.
- No PWA manifest. Artists cannot install this on their home screen.
- SEO / OG cards spec'd but bugs known (2 critical per STATUS.md).

**Score rationale:** The product is real and the core insight is valid. But it is not yet shippable to paying customers without the Supabase auth + write path. That is the single most critical blocker.

---

### 2. Personal Readiness — 6 / 10

**What's true:**
- You are deeply invested in this. The documentation depth alone (80+ files, design spec scores, authority docs) shows obsessive attention to quality.
- You understand the users. You have spent real time with the copy philosophy, genre vibes, and platform voice. This is unusual for a solo technical founder.
- You are still employed. This is a runway advantage and a focus disadvantage simultaneously.
- You are working alone. The velocity achievable solo with AI assistance is high — but the blind spots compound without a second perspective.

**Where the gaps are:**
- You have more documentation than shipped product. The ratio needs to invert in the next 30 days.
- No evidence of having conversations with real artists about the product yet. The first 10 artists need to exist as contacts before launch, not discovered during launch.
- The employment situation creates cognitive load. You are context-switching between a job and a startup, which is the hardest mode to sustain.
- The C5/C6 health situation is real. Ignoring it during a crunch is not a strategy — it is a debt that compounds. A health protocol needs to be embedded in the roadmap, not bolted on at the end.
- Decision velocity: the planning / documentation depth suggests some hesitation before shipping. This is a pattern to watch and break in the next 90 days.

**Score rationale:** You have the right qualities. The gaps are structural (time, conversations, health), not dispositional. Fixable within the 90-day window.

---

### 3. Business Structure — 2 / 10

**What's true:**
- No company formed. UK Ltd or sole trader decision is unresolved.
- No bank account in the company's name.
- No Stripe account connected.
- No terms of service, privacy policy, or cookie notice on any live page.
- No ICO registration (required for collecting personal data in the UK).
- No contracts of any kind.

**Where the gaps are:**
- This is the most critical non-product gap. You cannot legally collect fan emails, charge artists, or describe yourself as a business without this infrastructure.
- The UK Ltd setup takes 24 hours and costs £12 via Companies House. There is no good reason this has not happened.
- GDPR compliance requires a privacy policy and a lawful basis for processing personal data before you collect a single fan email in production.
- Stripe setup requires a business entity or sole trader declaration.

**Score rationale:** This is a 2 because the knowledge of what needs doing is there, but the actions have not been taken. Week 1 of the roadmap resolves this entirely. It is not complex — it is just not done.

---

### 4. Market Positioning — 8 / 10

**What's true:**
- The core moat is real: ABLE is the only link-in-bio tool that models the artist's moment (pre-release / live / gig / default). This is not a marginal improvement on Linktree — it is a different model of what a link-in-bio is for.
- The copy philosophy is differentiated and defensible. "Artist Before Label" is a genuine stance, not a slogan.
- The target customer (independent artists, not hobbyists, not megastars) is well-defined and achievable.
- Market sizing documents exist. The competitive intelligence is thorough.
- The tier system (Free → Artist → Artist Pro → Label) maps cleanly to the customer journey.

**Where the gaps are:**
- No one outside this project knows ABLE exists. Market positioning only matters once someone sees it.
- The landing page exists but is not live at a public URL that can be shared.
- No social proof. No testimonials. No artist case studies. These need to be manufactured in the first 60 days — which means getting real artists on the platform immediately.
- "Premium" positioning needs to be validated. The assumption that independent artists will pay £9/mo for a better link-in-bio is plausible but unconfirmed.

**Score rationale:** The thinking is strong. The execution trail (actual artists, testimonials, case studies) is absent. This is a high-score potential area that requires real-world validation.

---

### 5. Runway — 5 / 10

**What's true:**
- You are currently employed, which means personal runway is not zero.
- ABLE has no revenue, no burn, and no external costs beyond any SaaS tools in use.
- Domain costs, Supabase free tier, and Netlify free tier mean the product can operate for free until meaningful scale.
- No external investors means no dilution and no pressure — but also no war chest.

**Where the gaps are:**
- The job exit trigger is approximately £5,000 MRR (per investor readiness docs). At £9/mo average, that is roughly 555 paying artists. That number is achievable but requires 12–18 months at realistic growth rates, not 90 days.
- There is no contingency plan if employment situation changes unexpectedly.
- No financial model projecting from current state (£0 MRR) to job exit trigger with assumptions laid out.
- No seed fundraising prep. If you wanted to raise £150k–£250k pre-seed to accelerate, the materials are not ready.

**Score rationale:** Safe right now. The clock starts when you launch. The 90-day plan must include the first paying artists as a milestone, even if revenue is small.

---

### 6. Team — 1 / 10

**What's true:**
- It is just you.
- The AI agent infrastructure (per docs/systems/ai-agents/) is genuinely used and accelerates output significantly.
- There is documented thinking on when and how to hire.

**Where the gaps are:**
- No co-founder. This is the single biggest risk factor for an early-stage startup. Not because you cannot execute alone, but because investors are wary of it, and the cognitive / emotional load of solo founding is severe.
- No advisors on record. One or two music industry or SaaS advisors with a formal advisor agreement (0.1–0.25% equity over 2–4 year vesting) would materially help with credibility, warm introductions, and judgment.
- No VA, no part-time help. The artist success function (onboarding artists, answering questions, gathering feedback) will consume disproportionate time if not considered now.
- No designer relationship. Design is handled in the product, but brand identity work (logo, social assets) appears to be in progress without a clear owner.

**Score rationale:** Team is the weakest dimension. It does not need to be fixed in 90 days, but the advisor relationships should start in the first 30 days, and a co-founder conversation should happen in the first 60 days if a right candidate surfaces.

---

### 7. Mental Preparation — 7 / 10

**What's true:**
- The clarity of vision is strong. You know what ABLE is and, critically, what it is not.
- The documentation discipline suggests a structured mind rather than a chaotic one.
- The copy philosophy adherence across all docs shows values alignment — you have not drifted toward the easy, generic path.
- The health goals (C5/C6, longevity) signal self-awareness beyond the startup tunnel vision.

**Where the gaps are:**
- The transition from planning mode to shipping mode is the hardest psychological shift for a detail-oriented founder. There is evidence of over-documentation as a proxy for execution. This is worth naming and watching.
- Solo founding is emotionally hard in ways that do not show up in planning documents. The moments where nothing is working, no one responds, and you question everything — those are coming. They need to be pre-empted with support structures (peer founder relationships, mentor conversations, weekly review rituals).
- No public accountability structure. Sharing progress publicly (even a simple weekly tweet) dramatically increases execution pressure in a positive way.

**Score rationale:** Psychologically well-resourced for the challenge, with specific gaps around the planning-to-shipping transition and solo founder resilience. Both are manageable with intentional structure.

---

## Summary Scorecard

| Dimension | Score | Primary Gap |
|---|---|---|
| Product readiness | 6.5/10 | Supabase write path + auth not built |
| Personal readiness | 6/10 | Too much planning, not enough conversations with real artists |
| Business structure | 2/10 | No company, no T&Cs, no ICO registration |
| Market positioning | 8/10 | Strong insight, zero social proof |
| Runway | 5/10 | No paying customers, no financial model |
| Team | 1/10 | Solo, no advisors, no co-founder |
| Mental preparation | 7/10 | Planning-to-shipping transition risk |
| **Overall** | **5/10** | **Too early, but closer than you think** |

---

## The Three Things That Would Move This Most

### 1. Get 3 real artists on the platform in the next 14 days.
Not a promise. Not a DM thread. Actual profiles built, actual fan sign-up links shared. The feedback from 3 real users will compress 3 months of planning into 2 weeks of real signal.

### 2. Form the company and connect Stripe before you onboard artist number one.
Every hour you operate without legal infrastructure is a liability. This takes one afternoon. Do it first.

### 3. Stop adding to the documentation, start shipping.
The strategy docs are genuinely excellent. They are also done. The next unit of value is a real artist using the product on their Instagram bio — not another spec file.

---

## What James Is Actually Good At (Do Not Underestimate This)

- Product taste. ABLE does not look or read like a template. The design sensibility is clear and consistent.
- Copy. The copy philosophy is unusually good for a solo technical founder. Most founders cannot write. James can.
- Systems thinking. The data architecture, CTA zones, tier system — all coherent and defensible.
- Pace of learning. The velocity of documentation improvement across sessions suggests rapid iteration.

These are real advantages in a crowded market. They are not sufficient alone — but paired with 90 days of focused execution, they are enough to get to the first signal.

---

*Next: read 500-STEPS.md. Every step is concrete. Start with step 1 today.*
