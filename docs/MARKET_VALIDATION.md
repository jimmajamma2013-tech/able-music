# ABLE Market Validation Framework
**Last updated: 2026-03-15**
**Stage: Pre-revenue. First 10 paying artists is the only milestone that matters right now.**

---

## The discipline before the framework

Market validation is often used as a reason to delay shipping. "We need more research" is how tools get built in endless pre-launch. ABLE is at Checkpoint 13. The product exists. The validation that matters now is not "is there a market?" (there clearly is — 175,000 PRS artists in the UK are using fragmented, expensive, or feature-poor alternatives). The validation that matters is: "does this specific product, at this specific price, solve a felt enough pain that real artists pay for it?"

That question can only be answered by getting 10 paying artists and interviewing all of them.

---

## The single most important early metric: LTV:CAC ratio

**Cost-per-acquisition (CPA)** = total spend on acquisition (time, money, tools) divided by number of artists who become paying subscribers.

**Lifetime value (LTV)** = average monthly revenue per artist × (1 / monthly churn rate).

Example: £9/mo ARPU × (1 / 0.03 monthly churn) = £300 LTV at 3% churn.

**The ratio that matters:** LTV:CAC should be at least 3:1 to be a viable business. At £300 LTV, ABLE can afford to spend up to £100 to acquire each paying artist and still be healthy. Above £100 CPA, the math breaks unless LTV improves (higher ARPU or lower churn).

**Why this is the most important single metric:**
It tells you whether the business model works independent of growth rate. A business with 10 paying artists and a 5:1 LTV:CAC is fundamentally healthy and just needs more time. A business with 100 paying artists and a 0.8:1 LTV:CAC is a structural problem no amount of growth will fix.

**When to calculate it:** Monthly, starting from the first paying artist. Track CPA per channel separately — you will find that some channels produce artists with far higher LTV than others (referrals typically have lower churn than Product Hunt signups, for example).

---

## The 10-paying-artists milestone: exactly how to get there in 30 days

This is not a marketing exercise. It is a sales exercise. At this stage, artists don't find you — you find them.

### Week 1: Identify 50 candidates
Search criteria: UK-based independent artists who have released music in the last 6 months, have a Linktree or Beacons in their bio, and have between 1,000 and 50,000 Instagram or Spotify followers (large enough to care about fan capture, small enough that they're doing this themselves).

How to find them: search Instagram for UK music hashtags (#ukindiemusic, #ukfolk, #ukhiphop, #uklivemusic), click on posts from the last 30 days, check their bio for a link-in-bio tool. Cross-reference with Spotify to confirm they're releasing actively.

Build a simple spreadsheet: name, Instagram handle, current link-in-bio tool, estimated followers, any notes about their recent release.

### Week 2: DM 50 artists
Message template (adapt as needed, do not copy-paste identically):

"Hey [name] — I saw your recent track [specific track name]. I'm building a link-in-bio specifically for musicians that handles pre-save campaigns and fan email capture differently to Linktree. Would you be willing to spend 20 minutes with me to see if it's any use to you? No pitch — I'm genuinely trying to understand if it solves a real problem."

Key: mention a specific track. Do not use a template they can detect. The DM that works is the one that shows you looked at them.

Target: 15–20% response rate from 50 DMs = 8–10 conversations.

### Week 3: Onboarding calls
In the call (20 minutes):
- 5 minutes: ask the interview questions (see below) — let them talk
- 10 minutes: show them the product live (screen share or a pre-prepared ABLE page for their artist type)
- 5 minutes: answer questions, explain pricing, ask if they want to try it

Offer: first month free. If they want to continue after 30 days, they go to the £9 Artist tier. No credit card required at this stage — friction is the enemy.

### Week 4: Convert to paid
At the 30-day mark, follow up with each trial artist. Ask: "Did it do anything useful?" If yes, invite them to continue at £9/mo. If no, ask what was missing.

Expected conversion: 40–60% of trial artists who were active (had a live page with real visitors). This gives you 4–6 paying artists from 50 DMs.

To hit 10 paying artists in 30 days: run two parallel outreach waves of 50 DMs each, or supplement with producer introductions (see GROWTH_STRATEGY.md).

---

## 50 evangelical users vs 500 lukewarm users

This distinction is fundamental to how early-stage tools succeed or fail.

**50 evangelical users:**
- They refer other artists without being asked
- They post about their ABLE page unprompted on social media
- They give detailed, specific feedback that improves the product
- They defend ABLE when someone says "why not just use Linktree?"
- They upgrade to Pro when you ship a Pro feature they care about
- Their churn rate approaches zero

**500 lukewarm users:**
- They signed up from a Product Hunt post and haven't logged in since
- Their pages are half-complete (no CTA, no fan sign-up)
- They don't respond to onboarding emails
- They churn after one month
- They never told anyone about ABLE

**Why the former wins:** 50 evangelical users generate referrals, press mentions, testimonials, and product insights. 500 lukewarm users generate noise, distorted analytics, and a false sense of traction. They also depress your NPS and activation rate, making it harder to diagnose what's actually broken.

**How to get evangelical users:** personal onboarding, genuine follow-up, fast response to their feedback, shipping the specific thing they asked for and telling them you did it. The relationship at this stage is the product.

**The test:** after 60 days, email every active artist and ask: "Have you told any other artists about ABLE?" If the answer is yes from fewer than 20% of them, you do not have evangelical users yet. Keep onboarding personally until the number reaches 40%.

---

## The interview script

Run this with every artist who signs up, before they have fully set up their page. Run it again 30 days after they've been using it. The before/after comparison is where the real insight lives.

### The 5 questions

**Question 1: "What do you currently use to send people from your social bio to your music — and what bothers you most about it?"**
Listen for: specific friction points (Linktree fees, Beacons commission, Feature.fm email limits, "it just looks generic"). These are the exact pain points ABLE should address in its copy and onboarding. If they say nothing bothers them about their current tool, ask "what would make you switch tomorrow?" — this reveals the latent dissatisfaction.

**Question 2: "When someone clicks your link-in-bio today, what do you most want them to do?"**
Listen for: stream a track, sign up for updates, buy a ticket, buy merch. This reveals which CTA type matters most to this artist. If the majority say "sign up for updates," the fan email capture is the primary value. If the majority say "stream my track," the platform pill prominence matters more. Use this to prioritise the product roadmap.

**Question 3: "How do you currently stay in contact with your most dedicated listeners?"**
Listen for: Instagram DMs, email newsletters (MailChimp, etc.), Discord, none. The "none" answer is the highest-value signal — this artist has no direct relationship with their audience despite possibly having thousands of followers. ABLE's core value proposition is exactly for them.

**Question 4: "Have you ever done a pre-save campaign before a release? What tool did you use, and did it feel worth the effort?"**
Listen for: whether they know what a pre-save is, whether they've tried it, what the experience was. Artists who've tried pre-save campaigns with Feature.fm or SubmitHub and found it clunky are exactly the target. Artists who've never done one are an education opportunity — the pre-release state in ABLE is a built-in campaign mechanic, not just a feature.

**Question 5: "If I told you ABLE takes 0% of your revenue and you own the fan email list directly — does that matter to you, or is it just a nice-to-have?"**
This is the filter question. The answer reveals whether the no-cut, artist-ownership positioning is a purchase driver or just marketing copy. If they say "that's the main reason I'd switch" — you have a core value message. If they say "I'm not selling anything anyway so it doesn't matter" — their path to ABLE is through a different angle (probably the profile quality and campaign modes).

**What to do with the answers:** Log them. Look for patterns across 10+ interviews. The patterns are the product strategy. If 8 out of 10 artists say the same thing bothers them about their current tool, fix that thing first.

---

## NPS measurement

**When to ask:** 30 days after the artist has had a live page with real traffic. Not at onboarding, not at sign-up — these capture intent, not experience.

**How to ask:** A single-question email. "How likely are you to recommend ABLE to another artist? Score 1–10." Follow with: "What's the main reason for your score?" The qualitative answer is more useful than the number at this stage.

**What the score means:**
- 0–6: Detractor. Something specific has gone wrong. Email them directly: "I saw your score — I'd really like to understand what's not working. Would you be up for a 10-minute call?" Do not let detractors silently churn.
- 7–8: Passive. They're using it, not loving it. Ask: "What would have to change for you to score it 9 or 10?" This is your roadmap.
- 9–10: Promoter. Ask: "Would you be willing to tell another artist about ABLE?" If yes, ask who they have in mind.

**NPS = % Promoters − % Detractors.** Target: 40+ by Month 3. World-class SaaS is 50+. For a tool at this stage, 40 is a strong signal that the core product works.

**At what point does NPS become statistically meaningful:** 30+ responses. Below that, one or two outliers skew the number. Use it directionally from 10+ responses, but don't make pivotal decisions on it until 30+.

---

## The feedback → build loop

### The rule: only build what 3+ artists independently asked for

One artist asking for a feature is a data point. Three artists independently asking for the same thing — without being prompted — is a pattern. The pattern is the signal.

**How to run the loop:**
1. After each interview, log the top 3 things the artist mentioned wanting or found frustrating
2. Weekly: review the log. Look for items that appear 3+ times
3. Monthly: pick the top item from the log and ship it (or a version of it)
4. Email the artists who mentioned it: "You mentioned X was missing. We just shipped it." This closes the feedback loop visibly and creates loyalty.

**What not to build from feedback:** Features that are complex, one-off, or contradict the product philosophy. An artist asking for "TikTok-style video integration" or "a built-in shop" is providing useful information about their needs, but it doesn't mean ABLE should build those things — it means you should be able to explain clearly why ABLE doesn't and what it does instead.

**The three categories of feedback:**
- **Fix it** (product is broken or confusing) — highest priority, ship fast
- **Add it** (something missing that fits the product) — follow the 3-artist rule
- **Rethink it** (the feedback suggests a fundamental misalignment) — take it seriously, discuss before acting

---

## A/B tests to run on landing.html in the first 90 days

Keep these simple. At this traffic volume, statistical significance takes longer to achieve, so test the biggest differences first.

**Test 1: Headline**
A: "Your fan relationship, no algorithm in the way." (current positioning — artist ownership)
B: "A link-in-bio that knows what release week looks like." (campaign-mode positioning)
Metric: time on page, scroll depth, click on the "Get started" CTA.
Run for: 3 weeks or 200 visits, whichever comes first.

**Test 2: Social proof placement**
A: Artist testimonial quotes at the bottom of the page (standard)
B: Artist testimonial quotes directly under the hero headline (immediate credibility)
Metric: CTA click rate.
Prerequisite: you need at least 3 real artist testimonials to run this test.

**Test 3: Pricing page clarity**
A: Free / Artist (£9) / Pro (£19) tier table
B: Start with Artist tier as the anchor, show Free as a downgrade, show Pro as an upgrade
Metric: proportion of signups choosing paid vs free.

**Test 4: CTA copy**
A: "Get started free"
B: "Build your page"
C: "Claim your ABLE page"
Metric: click-through rate on the hero CTA.

**Tools:** For a single-file HTML app, the simplest A/B test is URL parameter routing — `?variant=b` serves a different headline. Log which variant each user sees and track conversions in localStorage alongside existing events. No third-party tool needed.

---

## The decision framework: scale, pivot, or kill

### Scale: doubling down on what works
Signal: LTV:CAC is above 3:1, NPS is above 40, at least one acquisition channel is producing converting artists at volume. You have at least 20 evangelical users.
Action: pour more time into the working channel. Resist the urge to diversify — find the thing that works and do more of it.

### Pivot: changing the approach but keeping the infrastructure
Signal: artists are signing up but not activating (onboarding problem), or activating but not paying (monetisation/value problem), or paying but churning (inter-release value problem). Each of these is a different pivot — not a direction change, but a specific intervention.
Action: the feedback → build loop identifies the intervention. Run the interview script again specifically looking for the disconnect point.

### Kill: stopping and redirecting effort
Signal: kill signals as defined in EXECUTION_RISK.md. Specifically: NPS below 20 after 30 responses and no improvement over two product iterations, or CPA above £50 with no clear path down, or 0 paying artists after 150 sign-ups.
Action: don't rush the kill decision. Run one deliberate pivot (change one thing, wait 60 days) before concluding the model doesn't work.

---

## What real product-market fit looks like for an artist tool

PMF is not a metric. It's a pattern of behaviours.

**Leading indicators (you're heading toward PMF):**
- Artists refer other artists before you've asked them to
- Artists email you directly when something breaks (they care enough to tell you)
- Artists update their ABLE page for every new release without being prompted
- When you announce a new feature, existing artists say "finally"
- Churn is concentrated among artists who never activated — not among actively using artists

**The PMF moment:** when you stop having to explain why ABLE is better than Linktree because artists are already telling each other. Until that happens, you don't have PMF — you have promising early signals, which is fine at this stage.

**What PMF is not:**
- 1,000 sign-ups without activation
- Press coverage without paying users
- A high NPS from 5 responses
- An artist with a million followers using it once and posting about it

---

## Survey to send to 200 artists before building anything else

**The context:** ABLE has a clear product direction (the campaign-aware profile, fan capture, artist identity) but there are unresolved questions about priority and missing features. This survey fills those gaps before more dev time is committed.

**Distribution:** DM to 200 UK independent artists who have released in the last 6 months. Offer: £5 Amazon voucher for completion (increases response rate significantly, costs £1,000 total — worth it for the data quality).

**The survey (8 questions, 4 minutes):**

1. "What tool do you currently use in your social bio to link fans to your music?" (Multiple choice: Linktree / Beacons / Feature.fm / my own website / none / other)

2. "When a new fan clicks your link-in-bio, what do you most want them to do first?" (Multiple choice: stream/save my music / sign up to my email list / buy a ticket / buy merch / follow me on Spotify / other)

3. "Do you currently collect email addresses from your fans?" (Yes — I have a list / I've tried but it's hard to set up / I want to but don't know how / I don't think email is worth it)

4. "How much do you currently spend per month on tools for promoting your music?" (£0 / £1–10 / £11–25 / £26–50 / £50+)

5. "Have you ever run a pre-save campaign before a release?" (Yes, it worked well / Yes but it was too much effort / No but I want to / No and I'm not sure what it is)

6. "What's the biggest frustration with your current link-in-bio or music promotion setup?" (Open text — 50 words max)

7. "If a tool handled your fan email capture, pre-save campaigns, and link-in-bio in one place for £9/month — would you pay for that?" (Definitely yes / Probably yes / Maybe / Probably not / Definitely not)

8. "What would need to be true for you to switch from your current setup to something new?" (Open text — 50 words max)

**What to do with the results:**
- Q1: Channel mix tells you what competitive displacement you're targeting
- Q2: CTA priority data directly informs the hero CTA defaults in the product
- Q3: Current fan capture sophistication tells you how much education the onboarding needs
- Q4: Tool spend data validates the £9 price point or suggests adjustment
- Q5: Pre-save familiarity tells you whether pre-release state needs an explainer
- Q6: Open text — the most valuable data in the survey. Cluster responses by theme.
- Q7: Demand signal. If below 40% say "definitely/probably yes," the price or value framing needs work
- Q8: Switching cost data. The answers tell you exactly what barrier to remove first.

Run this survey before building any new features. It is more valuable than another month of development.
