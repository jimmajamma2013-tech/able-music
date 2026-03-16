# ABLE Execution Risk Register
**Last updated: 2026-03-15**
**Format: Likelihood (1–5) × Impact (1–5) = Risk Score. Ranked highest first.**

---

## Preamble

James is building ABLE while employed full-time (£60k/yr), building alone, with no external funding, no co-founder, and no dedicated team. This is not a liability — it is a specific operational context that shapes every risk. The risks that matter most are not "what if a competitor copies us" but "what if James runs out of time" and "what if the first 20 users don't activate." Both are more likely and more damaging than anything a competitor can do in the next 12 months.

---

## The 5 biggest execution risks, ranked

### Risk 1: No-activation failure — artists sign up but don't launch a real page
**Likelihood: 4 | Impact: 5 | Score: 20**

This is the most common failure mode for self-serve creative tools. Artists sign up, poke around, don't finish setting up their profile, and churn before ever experiencing the value. The product is compelling once it's live — the gap between "signed up" and "real page with a fan" is the critical failure point.

**Why this happens:** The setup flow requires decisions (accent colour, CTA type, release state) that feel overwhelming without guidance. Artists abandon at the point of highest cognitive load.

**Mitigation:**
- Personal onboarding for every artist in the first 60 days. DM them after sign-up. Offer to set up their page in a 20-minute call. This does not scale, but it doesn't need to yet — it generates the insight that shapes the automated onboarding.
- An "incomplete profile" email at 48 hours post-signup: specific, warm, not generic. "You started your ABLE page — the hardest bit is picking your accent colour. Here's how [Artist Name] did it."
- Track activation rate obsessively: define "activated" as a page with at least 1 real fan sign-up captured. This is the metric that matters, not "users signed up."
- A guided setup checklist on the admin dashboard with 5 specific steps. Completion percentage is a leading indicator of activation.

**Kill signal:** If 30-day activation rate (signed up → at least 1 fan sign-up captured) is below 25% after 50 sign-ups, the onboarding flow is broken. Fix it before scaling acquisition.

---

### Risk 2: James's time running out — employment vs. project conflict
**Likelihood: 4 | Impact: 5 | Score: 20**

James has a full-time job. ABLE is built in the margins. The risk is not that the job ends (that might be net positive for ABLE) but that job demands spike (a project crunch, a performance review, a difficult period) and ABLE goes dark for 3–6 weeks at a critical moment.

**Why this matters:** Early users are forgiving of product gaps. They are not forgiving of feeling abandoned. If James disappears during the critical first-user onboarding window, churn follows.

**Mitigation:**
- Design ABLE to be largely self-serve from Day 1. Every manual process (setup calls, support DMs) should be a temporary placeholder while an automated version is designed.
- Build a "minimum viable presence" protocol: if James has a crunch week, the one thing that still happens is the weekly X post and responding to user DMs within 48 hours. Everything else can pause.
- Set a trigger: if ABLE is generating £500/mo MRR, evaluate job exit. If generating £1,500/mo, start planning it actively. Do not wait for certainty.
- AI agents handle documentation and non-critical code. James handles: user conversations, product decisions, copy, and the things that require a human with full context.

**Personal risk extension:** C5/C6 health. If James's disk condition flares significantly, desk time gets rationed. The mitigation is the same: make ABLE resilient to 2-week gaps. Infrastructure does not break. Support queue is manageable. Automated sequences run.

---

### Risk 3: Competitive response — Beacons or Linktree adds music-specific features
**Likelihood: 3 | Impact: 4 | Score: 12**

Linktree has 50M users, $37M ARR, and engineering resources to ship new features. If they decide to build a music-specific tier with campaign modes and fan capture, they can hypothetically do it fast.

**Why this is less scary than it sounds:** Linktree's product culture is horizontal and generic — they serve everyone from musicians to influencers to politicians. Building genuine music-specific depth (the four profile states, the fan relationship model, the artist identity philosophy) requires a product decision to be different, not just a feature addition. Their incentives are to stay broad. Beacons is a better-designed tool but has trust issues (1.8/5 Trustpilot) and takes revenue from artists — that structural position is hard to walk back from.

**Monitoring plan:**
- Check Beacons and Linktree product changelogs monthly
- Set a Google Alert for "[Beacons/Linktree] music" and "[Beacons/Linktree] artist"
- Subscribe to both products' free tiers — use them actively, watch what they ship

**Response trigger:** If either competitor ships a genuine campaign-mode equivalent (pre-release state, live state, fan email capture with no revenue cut), ABLE needs to accelerate on the identity differentiation — the things that can't be copied by adding a feature: the copy philosophy, the artist community, the depth of the artist profile.

**What to do if they move:** Do not pivot to compete feature-for-feature. Deepen on what they will not do: artist identity at depth, UK-specific market focus, the producer credits ecosystem, the genuine no-cut position. Make the gap in values, not just features.

---

### Risk 4: Seasonal churn — artists leave after release cycles complete
**Likelihood: 4 | Impact: 3 | Score: 12**

An independent artist's engagement with their own promotion peaks around a release and drops significantly in the 3–4 months after. If artists only see ABLE as a "release campaign tool," they will churn once the campaign is over and re-subscribe before the next one.

**Why this is a structural risk, not just a product bug:** Churn after release cycles is real across all artist tools. The question is whether ABLE can create enough inter-release utility to justify the monthly fee during quiet periods.

**Mitigation — inter-release value:**
- The persistent profile (profile state) is valuable even between releases — it's the artist's permanent link-in-bio, their fan list captures, their platform connections
- The fan list itself is inter-release value: growing the list matters between releases, not just during them
- Snap cards can be updated to reflect what the artist is doing between releases: in-studio, touring, collaborating
- Artist stats (views, fan sign-ups, link clicks) are genuinely interesting between releases — make the dashboard compelling to check weekly, not just during campaigns

**Mitigation — churn timing:**
- Identify the "post-release churn window" (likely 4–6 weeks after a release date passes) from user data
- Send a proactive email at Week 3 post-release: "Your release campaign is winding down. Here's what artists do with ABLE between drops." Reframe the value.
- Offer an annual plan at 20% discount — reduces month-to-month churn risk and locks in revenue

**Target:** sub-3%/mo churn. At 5%+ monthly churn, the business cannot grow — each new artist is replacing one who just left.

---

### Risk 5: Single-file HTML technical debt accumulates to a breaking point
**Likelihood: 3 | Impact: 3 | Score: 9**

`able-v3.html` is a single HTML file containing all CSS, all JavaScript, and all markup. This works cleanly at current scale. As features compound, the file risks becoming unmaintainable — slow to load, impossible to debug, requiring careful coordination to avoid conflicts between JS blocks.

**What triggers a rewrite decision:**
- File size exceeds 500KB (current: estimate ~150KB)
- Playwright smoke tests start failing due to unintended interactions between JS blocks
- Load time on real mobile devices (not dev tools) exceeds 3 seconds
- A new feature requires modifying more than 5 sections of the file to implement correctly

**The rewrite plan when it's needed:**
- Do not start the rewrite while still acquiring the first users — the product finding is more important than the technical cleanliness at this stage
- When the rewrite happens: move to a component structure (HTML partials, shared CSS, shared JS modules) without introducing a build pipeline unless absolutely necessary
- The target is the same stack (HTML + CSS + vanilla JS) but modularised into sensible files: `profile.html`, `shared/tokens.css`, `shared/theme.css`, `shared/profile.js`
- Supabase integration (when backend lands) is the most natural forcing function for refactoring — the JS that currently reads/writes localStorage will need to be replaced anyway

**Near-term mitigation:** Keep JS blocks clearly commented and namespaced. Parse-check after every edit (`node -e "new Function(src)"`). Run Playwright smoke tests after every major change.

---

## Contingency scenarios by channel

### If producer seeding fails (response rate below 5%)
Switch to: direct artist outreach via Twitter/Instagram. Find artists who have posted about their Linktree or link-in-bio setup in the last 30 days. DM with a specific observation about their page and an offer to show an alternative.

### If SEO produces no traffic in 90 days
Audit: are the articles indexed? (Search Google: site:ablemusic.co) Are they targeting keywords with genuine search volume? (Check with Ahrefs free tier or Ubersuggest.) Is the site being crawled? (Add a sitemap, check Search Console.) SEO rarely "fails" — it's usually a crawlability or indexation problem, not a strategy problem.

### If Reddit strategy gets banned or downvoted
Do not retaliate or create alternative accounts. Accept the ban and shift effort to X and press. Reddit is a useful but not essential channel.

### If Product Hunt launch underperforms (below 50 votes)
This is fine. A quiet PH launch is not a failure signal for the product. Do not draw strategic conclusions from it. The metric that matters is whether the artists who signed up from PH activate and convert — not the vote count.

### If the press ignores ABLE entirely
Shift from top-down (pitching journalists) to bottom-up (building visible artists on the platform). When an artist with 50,000 Instagram followers uses ABLE visibly, the press comes to you. The most powerful PR is an artist saying "I built my page on ABLE" to their audience.

---

## Competitor monitoring plan

**Monthly cadence:**
- Check Beacons changelog and Twitter for new feature announcements
- Check Linktree's "What's new" page and their blog
- Check Feature.fm pricing page — any changes to the email metering limit are a direct competitive signal
- Search "Hypeddit" on Twitter for user sentiment — if they ship a persistent profile, it's a competitive threat

**Quarterly:**
- Buy the cheapest paid tier of each competitor and actively test new features
- Run an updated comparison table internally (not necessarily published each quarter)
- Read the Trustpilot reviews for each competitor — not to gloat, but to understand what artists are actually frustrated by

**What triggers an immediate response:**
- Beacons removes its revenue cut from the free tier (structural repositioning)
- Linktree ships a music-specific product (not a feature, a product)
- A new entrant with significant funding (>$5M) enters the music link-in-bio space

---

## Kill signals

These are specific metrics that mean ABLE has a structural problem requiring a pivot, not just more effort.

1. **30-day activation rate below 20% after 100 sign-ups and 2 onboarding iterations.** If artists consistently sign up and leave without building a real page, the product is not solving a felt pain.
2. **NPS below 20 after 30 responses.** If artists who are using ABLE don't recommend it, there is no word-of-mouth engine — and without that, acquisition becomes infinitely expensive.
3. **Churn above 8%/mo for 3 consecutive months.** This means the inter-release value is not landing. The product needs to change, not just the marketing.
4. **Cost-per-acquisition exceeds £50 without a clear path to reduce it.** At a £9/mo ARPU, a £50 CPA takes 5.5 months to recover (ignoring churn). Not viable.
5. **No paying artist after 150 sign-ups.** If no one converts to paid after 150 free users, the monetisation moment is wrong (wrong price, wrong trigger, wrong value communication).

**What "pivot" means in ABLE's context:**
Not abandoning the product. The infrastructure (artist profile, fan capture, campaign modes) is reusable. A pivot might mean: repositioning ABLE as a tool for managers who set up pages for multiple artists (B2B2C), or focusing exclusively on a narrower vertical (UK electronic artists, UK singer-songwriters), or shifting the business model (annual-only plans, or a flat lifetime deal to seed the initial user base).

---

## The "if nothing works" plan

If after 12 months and genuine effort across the above channels, ABLE has fewer than 20 paying artists and below-NPS engagement, the following options are available — all of which reuse what's been built:

**Option A: Pivot to B2B — sell to managers, not artists**
Music managers handle 5–20 artists each. If ABLE becomes a tool managers use to set up pages for their roster, the sales cycle changes (one manager = multiple artists) and the value proposition changes (time-saving for the manager, not just fan capture for the artist). The product barely changes. The marketing and sales motion changes completely.

**Option B: Narrow the vertical to a specific scene**
Instead of "all independent UK artists," target "UK singer-songwriters on YouTube" or "UK electronic artists releasing on Bandcamp." Smaller TAM, higher specificity, better word-of-mouth in a tight scene. The product does not change. The positioning, copy, and acquisition channels become scene-specific.

**Option C: Lifetime deal via AppSumo**
This is a cash injection and user acquisition mechanism at the cost of ARR purity. Sell a lifetime deal at £199 (covering ~18 months of Artist tier). Use the cash to fund 6 more months of development and marketing. AppSumo's user base is not ABLE's ideal customer, but some will be, and the feedback from 200 users is extremely valuable.

**Option D: Open source the profile layer, monetise the analytics + fan CRM**
Make the artist profile (able-v3.html) open source — a genuinely useful tool for artists who want to self-host. Monetise only the backend features: fan list storage, email broadcasts, analytics dashboard, campaign modes. This removes the friction at the top of funnel and creates a clearer line between free value and paid value.

None of these represent failure. They represent using what's been built to find a working model.
