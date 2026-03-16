# ABLE — Phase 0: Fear Maps & Mental Models
**Created: 2026-03-15 | Part of the 100-section review process**

> Use this document before every section review. Every design decision should pass through: "what does this feel like to someone with these fears?"

---

## USER TYPE 1: THE ACTIVE RELEASING UK ARTIST

**Who this is:** Declan, 27, makes indie-folk-electronic music in Manchester. 12k Instagram followers, 4,800 Spotify monthly listeners. Releases 3 singles a year. Currently uses Linktree. Has tried Mailchimp once.

---

### Fear Map

**Fear 1: "This will be abandoned in 6 months and my fans' emails will be gone."**
This is the biggest fear and the hardest to address with copy. Every tool Declan has adopted has either pivoted, raised prices suddenly, or just stopped working. He's adopted Bandcamp fully, and they sold to Songtradr and nearly shut down. His fear is real. He doesn't say it out loud but it's behind every "I'll think about it."

→ Design implication: Emphasis on data portability. "Export your fan list anytime" must be findable, not buried. The 0% cut claim addresses revenue model sustainability indirectly.

**Fear 2: "I'll set this up and it'll look worse than what I have now."**
Declan currently has a plain Linktree. He knows it looks generic but at least it looks clean. His biggest risk with switching is visual regression — ending up with something that looks "overdone" or "try-hard." He's also scared of looking like he's performing success he hasn't earned.

→ Design implication: The onboarding preview must show him something genuinely beautiful at step 3, not step 15. The default state must be 10/10 before he's done anything. The design system should feel like it elevates rather than decorates.

**Fear 3: "I'll spend an hour setting this up and it won't make any difference."**
He's done this before with other tools. Set up a Mailchimp campaign once. Spent 2 hours. Got 8 signups in a year. The effort-to-outcome ratio felt terrible. ABLE needs to deliver a visible outcome fast — preferably before he's finished onboarding.

→ Design implication: Show him what "done" looks like before he starts. The live preview in onboarding, updating in real time as he fills in each answer, must feel like something is being built. The moment he sees his Spotify artwork automatically pulled in is the moment he believes.

**Fear 4: "My fans won't be able to find the sign-up and I'll look like I'm begging for emails."**
This is subtle but real. Independent artists are acutely aware of the line between "staying connected" and "desperate ask." The email capture must feel like it's coming from him, not from the platform. "Stay close." feels right. "Sign up for my mailing list" feels like the 2007 internet.

→ Design implication: Fan capture copy law: first person, specific to what they get. "Just me. No spam." The sign-up form should feel like an invitation from the artist, not a marketing funnel.

**Fear 5: "This costs £9 a month and I have no way to justify that to myself."**
He already pays £17/year for DistroKid, £10/month for Canva. He's not afraid of tools. But £9/month for something he's unsure about is a different calculation. The fear is specifically: what if I sign up, pay for 3 months, and never send a broadcast or do anything with the fan list?

→ Design implication: The free tier must deliver clear visible value before the upgrade ask. The moment the upgrade ask comes (100 fan signups) must be framed as a celebration, not a upsell. "These are 100 people who asked to hear from you" is correct.

**Fear 6: "The tech is going to confuse me at a critical moment — like when I'm about to drop something."**
The worst version of this fear: it's 11pm the night before a release and the embed isn't working. Or the pre-release countdown is showing the wrong date. Technical failure at high-stakes moments is the nightmare scenario. Artists don't have tech support.

→ Design implication: The campaign state machine must be robust. The pre-release flow must be dead simple and visually confirmable. No ambiguity about what state the page is in.

---

### Mental Model

Declan thinks of his artist profile as **his digital home** — the thing that represents him when he's not in the room. He thinks in metaphors of a physical venue poster, not a web product. "My page" not "my website." He doesn't think in features — he thinks in the question "does this feel like me?"

He also thinks of the release cycle as **the only time that matters.** Between releases, he's dormant — just an Instagram bio with a Spotify link. At release time, everything matters. That 2-week window is when he'd actually use ABLE's campaign features. ABLE needs to be so obvious to use in that window that he doesn't have to think.

**His decision process:**
1. Sees ABLE (via producer recommendation or "Made with ABLE" footer on an artist he respects)
2. Thinks "that's a good-looking page" — feels ABLE is worth exploring
3. Lands on landing.html — wants to see what the page looks like when it's doing something
4. Signs up free — wants to see what his page looks like with his own content
5. Adds Spotify link — page populates
6. Has 5–10 fans sign up over a few weeks
7. Release is coming — activates pre-release countdown
8. 80 fans sign up during the pre-release / live window
9. Hits 100 fan cap — upgrades
10. Never goes back to Linktree

**Where he drops off (risk moments):**
- Step 3: Landing page demo doesn't clearly show the page "shifting with the moment" — he doesn't get it, bounces
- Step 4: Sign-up form too many fields, or sends him through too many screens before he sees his page
- Step 5: Spotify import fails or pulls wrong data — trust collapses
- Step 8: Pre-release feature confusing — he skips it and ABLE becomes just another Linktree
- Step 9: 100 fan cap feels like a punishment not a celebration — he resents the product

---

## USER TYPE 2: THE COLOMBIAN RELEASING ARTIST

**Who this is:** Valentina, 24, makes Latin urban and alternative pop music in Medellín. 28k Instagram followers, active on TikTok. Releases a single every 6–8 weeks. Uses Linktree (English only), some Beacons. Speaks English but her audience is Spanish-speaking.

---

### Fear Map

**Fear 1: "Another gringo product that doesn't understand how we work."**
This is the defining fear for the Colombian market. Valentina has tried multiple US tools that assume everyone uses Mailchimp, has a US bank account, and thinks in USD. When she's reached out to support she gets back boilerplate that clearly wasn't written for her context. ABLE is another tool she has to adapt herself to — unless it signals early that it was designed for her.

→ Design implication: The landing page and onboarding must not assume US/UK context. Any social proof with real artist names (vs "Independent Artist, UK") should include Latin artists where possible. The Colombian launch must feel like ABLE was waiting for this market, not arriving in it.

**Fear 2: "The payment will fail and I'll lose my page."**
Payment anxiety in Colombia is real. International credit cards are common among connected artists but not universal. The fear is mid-month: card charges, payment fails, page goes down, fans see nothing. She's seen this with streaming services.

→ Design implication: Clear communication about what happens if payment fails (grace period, data preserved). Local payment methods in Phase 2 are essential. This is not optional for scale.

**Fear 3: "My fans won't sign up because they don't know why they should."**
Colombian fans have different expectations. The fan relationship is different — WhatsApp groups, direct DMs, physical shows are the primary connection. Email as the connection mechanism is a UK/US concept. Valentina worries her fans will see an email sign-up and think "this is weird" rather than "yes."

→ Design implication: The fan capture copy, when translated to Spanish, must feel native to Colombian culture — not translated English. "Quédate cerca." instead of "Stay close." The "I'm in" button must feel like a Colombian phrase, not a literal translation. This is why Option C (bilingual by default) is ultimately the right path.

**Fear 4: "If this doesn't work in Spanish, half my audience won't sign up."**
Her Instagram bio is in Spanish. Her fans read Spanish. If the sign-up form is in English, a percentage won't engage. She knows this but isn't sure how to solve it with current tools.

→ Design implication: Fan-facing copy must be translatable. The artist profile should support language selection. This is Phase 2 build work but the architecture must support it from the start (CSS variables for font, not hard-coded text).

**Fear 5: "I'll pay and then the pesos to pounds conversion will hit me."**
Pricing in GBP is a red flag for a Colombian artist. Even $9/month in USD is psychologically distant. £9 in GBP is worse — currency conversion uncertainty adds cognitive overhead to every billing cycle.

→ Design implication: For Colombia launch, price in USD. Consider regional tier ($5/mo) once data exists. Don't launch in GBP for Colombian users.

---

### Mental Model

Valentina thinks of her page primarily through the lens of her **Instagram bio link**. That's her only reference frame for what ABLE is replacing. She thinks of the bio link as the one URL she can change — it's her "billboard." She's less familiar with the concept of an artist profile as a standalone destination.

She thinks of her release cycle differently from Declan. She's releasing more frequently (every 6–8 weeks) with less lead time — a single drops when it's ready, not after a 3-month campaign. This means the pre-release state is less relevant to her but the **live state** (day-of to 2-week window) is extremely important. Gig mode may also matter a lot — she plays more frequently.

Her WhatsApp-first communication style means she values **immediacy and directness.** Complex navigation menus, multi-step flows, anything that requires more than 2 taps to understand — she exits. Her attention is calibrated to TikTok scroll speed.

**Her decision process:**
1. Sees a Colombia-based artist she respects using ABLE (critical — peer validation in Colombian scene is everything)
2. Profile loads fast, feels local somehow (even if in English), visual language resonates
3. Signs up because the Spotify import looks genuinely effortless
4. Shares with 2 producers in Medellín immediately — this is how product spreads here
5. Puts page live before onboarding is complete because she needs to post it

**Where she drops off:**
- Step 1: If the social proof is all UK indie folk artists, this product feels foreign — bounces
- Step 3: If Spotify import requires knowing her "artist ID" rather than just her name or profile URL — drops off immediately
- Step 5: If the page feels like an English-first product with small print at the bottom — shares nothing, stays on Linktree

---

## USER TYPE 3: THE FAN (VISITING AN ARTIST PROFILE)

**Who this is:** A 19-year-old who clicked on an artist's Instagram bio link. They don't know what ABLE is. They don't care. They're there for the artist.

---

### Fear Map (or rather: confusion/friction points)

**Friction 1: "What is this page?"**
The fan doesn't want to learn a new platform. They clicked a link in a bio to do something specific — stream a track, buy a ticket, see a date. If the page doesn't immediately make clear what the artist is doing right now, the fan is gone in under 4 seconds.

→ Design implication: The page must make one thing clear in 0.5 seconds: "This is [Artist Name]'s page and right now they are doing [X]." The state chip (pre-release / live / gig) and the top card must do this job. No loading spinners, no "welcome to ABLE" messaging, no platform chrome.

**Friction 2: "Why should I give my email?"**
The fan doesn't have a relationship with ABLE. The only reason to sign up is the artist. The sign-up ask must come from the artist's voice, not the platform's.

→ Design implication: "Stay close. Just me. No spam." works because it sounds like the artist wrote it. Generic "Subscribe to updates" is death.

**Friction 3: "Is this a scam / spam thing?"**
New generation fans are trained to be suspicious of any email sign-up that feels platform-driven. The GDPR double opt-in confirmation email is actually protective here — it signals legitimacy. The artist's name in the confirmation subject line is essential.

**Non-fear (important to note):** The fan doesn't care at all that ABLE exists. The platform should be invisible. "Made with ABLE" in the footer is the only brand moment. This is correct.

---

## USER TYPE 4: THE MANAGER / LABEL SETTING UP ARTISTS

**Who this is:** Sophie, 31, manages 4 artists. Time is her scarcest resource. She's used Linktree, Beacons, and Feature.fm. She's competent technically.

---

### Fear Map

**Fear 1: "This will take me more time than Linktree."**
Every new tool is a time investment. Sophie's calculation is simple: if setting up ABLE for one artist takes more than 20 minutes, it's not worth the switch even if the product is better.

→ Design implication: The Spotify import must do 80% of the work in 10 seconds. The artist hands her their Spotify artist URL. She pastes it. The profile is essentially set up. This is the manager conversion flow.

**Fear 2: "I'll set this up for an artist and they'll break it trying to edit it."**
Her real fear is losing control — she sets up a clean page and 2 days later the artist has made it a mess. She needs to trust that the edit UX is constrained enough that accidental destruction is impossible.

**Fear 3: "I have to do this for 4 artists separately and there's no batch management."**
The Label tier (10 profiles) exists for her. But she needs to understand this exists before she does the math on whether ABLE is worth the switch for all her artists.

---

## SUMMARY: THE FEAR MATRIX

| Fear | Who has it | Which part of product addresses it |
|---|---|---|
| "This will be abandoned" | UK artist | Data portability copy, 0% cut claim |
| "Will look worse than my Linktree" | UK artist | Beautiful default state, Spotify import populates instantly |
| "Takes an hour, no visible outcome" | UK + Colombian artist | Onboarding preview shows changes live, instant Spotify pull |
| "Email capture feels desperate" | UK artist | First-person fan capture copy, artist voice |
| "Can't justify £9/month" | UK artist | 100 fan cap moment framed as celebration |
| "Tech fails at critical moment" | UK artist | Campaign state machine, pre-release clarity |
| "Another US tool" | Colombian artist | Social proof with Latin artists, possible bilingual UI |
| "Payment will fail" | Colombian artist | Grace periods, local payment methods Phase 2 |
| "Fans won't understand English sign-up" | Colombian artist | Bilingual support Phase 2, native Spanish copy |
| "What is this page?" | Fan | Top card + state chip, immediate clarity |
| "Why give my email?" | Fan | Artist-voice fan capture, "Just me. No spam." |
| "Will take more time than Linktree" | Manager | Spotify import 10-second setup |

---

## APPLYING THESE FEARS TO SECTION REVIEWS

Before scoring any section, ask:

1. **Which user type is landing here first?** (Landing page = all types. Artist profile = fan first, artist second. Admin = artist only. Onboarding = artist only.)
2. **What is their primary fear at this moment?**
3. **Does this section resolve that fear or accidentally trigger it?**
4. **What is the single most important thing this section must communicate in under 3 seconds?**
5. **Could a 13-year-old in Medellín with moderate English literacy figure this out without any instruction?**

These 5 questions override all aesthetic considerations. Design serves function. Function serves the specific person with their specific fear.

---

*Read this before every section deep-dive. The score for any section is ultimately: does it reduce fear and increase trust for the person who needs it most?*
