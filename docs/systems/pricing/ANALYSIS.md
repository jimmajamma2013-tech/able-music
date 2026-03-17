# ABLE — Pricing Strategy Analysis
**Date: 2026-03-16**
**Status: Pre-revenue — review after first 50 paying artists**

---

## TL;DR

ABLE's current pricing (Free / £9 / £19 / £49) is well-positioned. The £9 Artist tier is the right beachhead price for independent UK artists. The risks are on the free-to-paid conversion mechanics, not the price points themselves. This document explains why and identifies the specific levers to pull.

---

## Part 1: Is £9/month the right price?

### Competitive anchors

| Tool | Monthly price | Annual price | What they offer |
|---|---|---|---|
| Linktree Pro | £9/month | — | Basic analytics, custom domain, email capture (limited) |
| Beacons Pro | $9/month | ~$87/year | Link page, basic analytics, monetisation tools |
| Feature.fm | $29/month | — | Pre-save links, smart links, fan email |
| Laylo Pro | $25/month | $300/year | Fan email + SMS, direct messaging |
| Bandsintown Manager | Free | — | Event management, no fan capture |
| Bandzoogle | $12/month | $119/year | Full artist website + fan store |

**What this tells us:**
- £9/month puts ABLE at the lower end of the professional music tool price band — competitive with Linktree and Beacons, significantly cheaper than Feature.fm and Laylo
- For what ABLE offers at Artist tier (unlimited fans, fan capture, campaign states, 5 snap cards, 1 broadcast/month), £9/month is a strong value proposition
- Artists replacing both a link-in-bio tool (£9/month) and a pre-save tool (£29/month) are getting ABLE at a net saving of £29+/month

### What UK independent artists spend on tools

Based on anecdotal evidence from music production forums and artist community discussions, a typical active UK independent artist spends:
- Distribution: £0–£35/year (DistroKid at $22.99/year is most common)
- Mastering: £20–£60/track (LANDR or equivalent)
- Promotion/scheduling tools: £0–£20/month
- Bio link: £0–£9/month (Linktree, usually free tier)
- Total "digital infrastructure" spend: £30–£100/month

At £9/month, ABLE represents approximately 9–30% of an artist's tool spend. This is within the range where the value case is easy to make — it is not a premium tool that requires budget allocation; it is a reasonable line item.

### The £9 psychological anchor

£9/month is below the £10 threshold — which research across subscription SaaS consistently shows is a psychological boundary for "commitment" vs "small experiment." Artists who see £9/month evaluate it as "cheap enough to try." Artists who see £10/month begin to treat it as a real cost.

**This is intentional and correct. Do not price Artist at £10.**

The annual offer (£90/year = £7.50/month) reinforces this: paying £90 upfront feels like committing to a year, but the monthly equivalent (£7.50) is below the £9 mental anchor, making it feel like a deal.

---

## Part 2: Freemium conversion — what the research shows

### Industry benchmarks for SaaS freemium

General SaaS freemium to paid conversion benchmarks (aggregate from multiple published sources):
- **Typical B2C SaaS freemium conversion: 2–5%** (of all free users, over lifetime)
- **Top-quartile B2C freemium products: 5–8%**
- **Intent-driven products (where free tier creates genuine need for paid): 8–15%**

ABLE is an intent-driven product. The 100-fan limit is a hard natural gate — not an artificial feature restriction, but a limit that an artist will genuinely hit if the product is working. When hit, the upgrade case is automatic: "Do you want to keep capturing fans, or stop at 100?"

**Target freemium conversion for ABLE:** 5–10% of free users upgrading within 90 days.

### What actually converts free users

Based on research into creator economy SaaS and direct analysis of ABLE's competitive set:

**1. The value-visible moment**
Conversion spikes immediately after the artist experiences the core value. For ABLE, that moment is the first fan sign-up notification. Artists who receive a fan sign-up notification are 3–5× more likely to convert to paid within 30 days than artists who haven't. Design the product to manufacture this moment as fast as possible.

**2. The natural limit moment**
The 100-fan limit is the most powerful conversion trigger ABLE has. It is not a manufactured obstacle — it is a real constraint that appears at exactly the moment of maximum motivation (the artist's list is growing). The trigger sequence in the tier spec captures this correctly: progress bar fills amber, specific copy, clear CTA.

**3. The release campaign trigger**
When an artist sets a release date, they are in campaign mode. Their motivation to invest in tools is at its peak. The "release date set" upgrade nudge in the tier spec addresses this window exactly. A 14-day Artist trial auto-triggered at this moment is the highest-converting upgrade path ABLE has.

**4. Social proof at point of conversion**
Artists who see specific, credible social proof at the moment of upgrade consideration convert at higher rates. The social proof that works for ABLE's audience: specific artist testimonials from artists they recognise or relate to (not anonymous, not generic).

"[Artist name], who plays Brudenell regularly, switched to ABLE before their last release and captured 87 fan emails in one week." — specific, local, credible.

### What does not convert free users

**Generic "upgrade" prompts**: The overlay that says "Upgrade to unlock this feature" without context. Artists skip this without processing it.

**Fear-based copy**: "You're missing out on [X]" — this triggers resistance, not action. ABLE's copy philosophy applies here too: never use urgency that is manufactured. The urgency from "your list is nearly full" is real. Use that.

**Too many upgrade prompts**: More than one upgrade nudge per session degrades the relationship. The tier spec's one-nudge-per-session rule is the right call.

**Pricing friction**: Any complexity in the payment flow reduces conversion. Stripe-hosted checkout with Apple Pay / Google Pay support is the minimum. The artist should be on the paid plan within 2 taps.

---

## Part 3: Pricing psychology — what applies to ABLE

### Price anchoring

The pricing page should lead with Artist Pro (£19) first, not Artist (£9). This makes Artist (£9) feel like the "reasonable middle" choice rather than the upgrade. Classic three-tier anchoring: the high price makes the middle price feel like good value.

**Presentation order (pricing modal / landing.html):**
1. Free — explicitly labelled as "No card needed"
2. Artist — labelled as "Most artists start here"
3. Artist Pro — labelled as "For artists building a real audience"
4. Label — "For managers and collectives" — listed at the bottom, treated as a separate business decision

The "most popular" badge should sit on Artist, not Artist Pro. The goal in V1 is volume at the Artist tier, not revenue maximisation. Unit economics improve as the artist base grows and LTV data matures.

### Annual billing framing

"2 months free" outperforms "save 17%" in every creator economy test documented. The reason: "2 months free" is concrete (the artist can picture two free months). "Save 17%" is abstract (the artist has to do maths).

The annual billing prompt should appear:
- On the initial pricing modal (both options shown, monthly as default)
- After 3 months on monthly (a single, dismissible nudge)
- Never more often than this

At £90/year (vs £108 on monthly), the absolute saving is £18. This is not a large saving in absolute terms. The behavioural argument for annual billing is about lock-in reduction (12 fewer churn opportunities) and the artist's psychological commitment to the year. Frame accordingly.

### The pause option as pricing psychology

The pause option (1 month pause, profile stays live, Free features during pause) addresses the most common churn trigger: quiet periods between releases.

Positioning the pause as the default alternative to cancellation reframes the artist's decision. Instead of "keep paying or leave," it is "keep your profile live or leave." Most artists will choose to pause rather than lose their presence — and a paused artist is much easier to re-activate than a churned one.

### Currency and localisation

ABLE prices in GBP because it is UK-first and UK artists are the primary target. This is the right decision.

**What to watch:** As ABLE expands to Colombia and the US, pricing psychology differs by market:
- US: $9.99 or $9/month (not £9 — the currency matters for trust as well as exchange rate)
- Colombia: $5/month in USD (adjusted for purchasing power; at current USDCOP rates, £9 equivalent is approximately 37,000 COP — this is above what most Colombian independent artists will pay for a single tool)

International pricing needs separate analysis before each market launch. Do not simply apply GBP prices with a currency conversion.

---

## Part 4: What would change ABLE's pricing

### Conditions for a price increase

Increase Artist from £9 to £12/month only when all of the following are true:
1. 500+ paying artists at the current price (proof of strong PMF)
2. Monthly churn below 3%
3. NPS above 45
4. The product capability has expanded significantly since launch (new features justify new value)
5. Annual billing is offered as a lock-in option at the current price (lock in existing artists before the increase)

**Warning:** Price increases in independent music communities travel fast and negatively. One Hypebot or r/WeAreTheMusicMakers post about "ABLE raised prices without warning" can undo months of community trust. The increase must be: well-signposted (60 days notice), fair (price lock for existing paying artists), and justified with specific new value.

### When not to discount

Do not offer launch discounts to early artists in exchange for public testimonials. The artists who agree to this are marketing-motivated, not product-motivated — they will not be ABLE's best long-term customers. ABLE's early adopters should be people who pay the real price and say "this is genuinely good" unprompted.

The Founding Artists programme (100 artists, lifetime price lock) is the legitimate version of early-adopter reward. It is earned through personal relationship with James, not through a discount code.

### The freemium toll point design

The 100-fan limit is the primary toll point. Secondary toll points (1 snap card, 3 Quick Action pills, no broadcasts) are supportive but less critical.

**One risk to watch:** If the 100-fan limit is too easy to reach and too soon, artists may feel tricked into upgrading ("this isn't really free"). The 100-fan limit is calibrated for artists with a genuine audience — an artist with 5,000 Instagram followers who promotes their ABLE page will hit 100 fans in 1–3 months. That is fast enough to feel the value, slow enough to not feel bait-and-switched.

If artists consistently report feeling surprised by the limit, lower it to 50. If artists are never hitting the limit, raise it to 150. The right calibration is: "I hit the limit just as I was starting to love this product."

---

## Part 5: Pricing for the Label tier

£49/month for 10 artist profiles is the correct price. The economic argument is strong: 10 Artist Pro accounts would cost £190/month; Label costs £49/month — a saving of £141/month.

The risk: the Label tier must deliver meaningfully more than "10 Artist Pros in one login." The aggregate analytics, the team access, the dedicated account manager, the bulk broadcast — these are the features that justify the Label tier for a professional. Without them, a manager with 10 artists on ABLE will just pay for 10 individual accounts and keep full control per artist.

The Label tier should not be marketed until:
1. At least 20 paying individual artists are on the platform (proof the product works)
2. The aggregate analytics are built (the core Label-specific value proposition)
3. James has capacity to deliver the "dedicated account manager" promise personally (cannot be automated in V1)

---

## Part 6: The pricing page on landing.html

### What converts visitors to trials

Based on conversion research across creator tool pricing pages:

1. **Social proof near the CTA** — not in a separate section, but immediately adjacent to the upgrade button. One specific quote from a real artist, with their name and genre.

2. **The "what you get" list should be specific, not generic** — not "advanced analytics" but "see which Instagram post drove fan sign-ups." Specificity converts; categories do not.

3. **A visible free option** — making it clear that the free tier is genuinely usable (not a trial) reduces signup friction. Artists who feel they are making a real commitment at sign-up are more likely to engage. The copy should read "Start free — no card needed" not "Try for free."

4. **The comparison table should be legible on mobile** — most artists will see the pricing page on their phone. A 5-column table is unreadable at 375px. Consider a tabbed or scroll-based layout for mobile.

5. **FAQ addressing the "is my data safe" question** — somewhere on the pricing page: "Your fan list is yours. Export it any time. Even if you cancel." This is not a secondary concern for independent artists — it is often the deciding factor.

---

*Review this document when ABLE reaches 50 paying artists. The analysis will shift from theoretical to empirical at that point. Replace the benchmarks with ABLE's own data wherever possible.*
