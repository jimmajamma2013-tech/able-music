# Landing Page — 20-Angle Deep Dive
**Created: 2026-03-15**
**Overall current score: 4.5/10 → Target: 9/10**

---

## HIGH-LEVEL: WHAT THIS PAGE MUST DO

One job: **Convert a curious independent artist into someone who starts building their profile.**

But there are three sub-jobs that must all happen simultaneously:
1. **Convince** the sceptic that this isn't another Linktree clone — the page shifts with their moment
2. **Show** the product actually working, not describe it in words — a live demo that plays music
3. **Lower the barrier** to zero — free, no card required, paste one link and you're 80% set up

The landing page fails if any one of these three jobs isn't done. Currently, job 2 (show) is almost completely undelivered (CSS mockup, 280px phone). Jobs 1 and 3 are partially done but underweight.

**The ruling question for every angle below:** Does this part help an independent artist in Manchester with 12k Instagram followers understand what ABLE does and want to try it for free right now?

---

## THE 20 ANGLES

---

### 1. FIRST 3 SECONDS
**Score: 5/10**

What a new visitor understands in 3 seconds before any scroll or read:
- There is a headline: "100 real fans beat 10,000 strangers" — strong, gets attention
- There is a phone demo — but it looks like a mockup, not a real product
- There are buttons — but their weight doesn't match the stakes

**What's wrong:** The demo phone is too small (280px) and clearly fake. An independent artist with a trained eye for design will clock this in 1 second. The product sells itself on beautiful design — if the demo looks unpolished, the credibility gap is instant.

**Path to 10:**
- Phone must be 390px wide with real embeds playing
- The YouTube Short must be visibly playing (muted autoplay, loop)
- The phone frame must look like a real device — not a rounded rectangle
- Headline stays. Sub-copy tightened to match the urgency of the headline
- One clear CTA in the 3-second scan zone — "Your page is free →" — not buried

---

### 2. THE PRODUCT DEMO (The most important element)
**Score: 2/10**

This is the entire thesis of the landing page and it doesn't work.

**What's wrong:**
- The demo phone is a CSS box with fake Spotify/YouTube elements drawn in HTML
- 280px width — at that size, you can't see what the product actually looks like
- The 4 state buttons above the demo are so understated they're barely noticed
- There is no visible evidence that the page "shifts" — the switching feels like swapping a CSS class, not experiencing a live product moment

**This is a P0. Not a P1. Nothing else on this page matters until the demo works.**

The demo is the product's entire pitch. "Your page shifts with your moment" — if you can't show someone what "shifts" means in 5 seconds, the page fails.

**Path to 10:**
- Phone: 390px wide. Real YouTube Short embed (portrait, 9:16 aspect). Autoplay muted, loop.
- 4 state buttons redesigned as proper visual cards with a state chip preview inside them
- Each state: the phone content changes with a cross-fade (300ms). The CTA inside the phone changes. The state chip changes.
- Pre-release state: countdown timer ticking in real time. That visual is unforgettable.
- Live state: Spotify embed with a real track playing
- Gig state: "TONIGHT" text large in the phone, ticket CTA dominant
- The transition animation itself communicates the concept — the page is *alive*

---

### 3. HEADLINE COPY
**Score: 7/10**

"100 real fans beat 10,000 strangers." is correct and strong. Don't touch it.

**What's wrong:** The score is 7, not 10, because:
- The sub-headline currently is a bit long and loses the tightness of the headline
- There's no "eyebrow" above the headline contextualising who this is for
- The rhythm breaks after the comma — "and every fan who signs up — that email is yours" starts to feel like a feature description rather than a continuation of the emotional claim

**Path to 10:**
- Add eyebrow: "For independent artists" — 12px, letter-spaced, accent colour. Sets the audience before the headline fires.
- Rework sub to: "Your page shifts with your moment. Release day. Tonight's gig. What's dropping next. Every fan who signs up — that email is yours. Forever." The full-stop rhythm matches the headline's rhythm. Each sentence is a complete thought.
- Keep the headline exactly as is.

---

### 4. CTA DESIGN AND WEIGHT
**Score: 4/10**

The primary CTA button ("Your page is free →") exists but feels like an afterthought.

**What's wrong:**
- Current button is too small — appears to be ~38px height, moderate padding
- The colour may not have enough contrast against the dark background
- "Your page is free →" is the right copy but the visual weight doesn't match its importance
- The secondary path ("Sign in") is visually too close in weight to the primary CTA

**The rule:** The primary CTA should be the second-most visible thing on the page after the headline. Nothing else should compete with it in visual weight.

**Path to 10:**
- Primary CTA: 52px height, 32px horizontal padding. Accent fill (#e05242 or stronger). Text: white 17px medium weight.
- Hover: brightness(1.08) + translate(-1px, -2px) + soft box-shadow. Spring ease.
- Secondary CTA: plain text link style, 14px, significantly lower visual weight. "Already have a page? Sign in →"
- Trust line below: "No card. No commitment. Free forever." in 12px muted grey.

---

### 5. COPY VOICE (Does every line sound like ABLE?)
**Score: 6/10**

Most of the copy is in the right register. Some sections drift.

**What's wrong:**
- Some feature-section copy sounds like standard SaaS: "Build your fan base with powerful tools for..." — wrong tone
- The pricing section has some lines that feel generic
- The FAQ has a couple of answers that sound corporate

**The test for every line:** Would an independent artist roll their eyes at this? Does it sound like someone who understands music, or like a marketer who understands artists in theory?

**Path to 10:**
- Audit every line of body copy against the banned phrases list
- The Linktree comparison section should sound like: "You've had a Linktree for 2 years. What does it know about your release dropping in 3 days?" — conversational, direct, slightly pointed
- FAQ answers should sound like a human wrote them, not a help centre article
- Remove: any word ending in "-ise" that means "make money from your audience"
- The pricing section: lead with what each tier *delivers*, not what it *includes*

---

### 6. THE LINKTREE SWITCHER PITCH
**Score: 3/10**

This is the primary acquisition message for ~80% of ABLE's target market. It's barely there.

**What's wrong:**
- The comparison between ABLE and Linktree is never made explicit
- There's no direct statement of: "Linktree shows the same links on release day as on a quiet Tuesday. ABLE knows you're releasing something."
- There's no quick-switch CTA: "Paste your Linktree link — we'll import everything"
- The "import" feature might be the strongest single hook for switchers and it's invisible on the landing page

**Big picture connection:** The landing page exists to convert curious artists. The majority of those artists currently use Linktree. If the page doesn't speak directly to that experience, it's leaving the biggest conversion opportunity on the table.

**Path to 10:**
- Dedicated section (Section 4 in the SPEC): "You've had a Linktree for 2 years. What does it know about your release dropping in 3 days?"
- Simple side-by-side comparison (text, not a table): Linktree: same links every day / ABLE: page shifts with your moment
- CTA in this section: "Paste your Linktree — we'll import your links →" (ghost button, leads to onboarding with Linktree import pre-activated)
- Below: "Spotify, Apple Music, YouTube, SoundCloud — we recognise them all. Unknown links become custom buttons."

---

### 7. MOBILE EXPERIENCE (Artists live on their phones)
**Score: 5/10**

The page technically renders on mobile but several things break the experience.

**What's wrong:**
- Demo phone at 280px on a 375px screen takes up 75% of width — too large relative to the text, not enough breathing room
- State buttons likely wrap or truncate on mobile
- CTA buttons may not be 48px tap targets throughout
- The nav collapses but may not have a clear mobile-first CTA

**Big picture connection:** A significant percentage of artists who see ABLE will see it on their phone (via a recommendation, a tap on "Made with ABLE" from another artist's profile, or a TikTok ad). If mobile is broken, half the funnel is broken.

**Path to 10:**
- Mobile layout: text stacks above demo phone
- Demo phone: full width of mobile viewport minus 32px padding (343px on 375px screen)
- State buttons: horizontal scroll row on mobile (no wrapping), each button minimum 48px height
- All tap targets across the page: minimum 48px
- Nav on mobile: wordmark + single "Start →" CTA (44px height)
- Hero CTA: full width on mobile (margin: 0 16px, width: calc(100% - 32px))

---

### 8. PERFORMANCE (Does it load fast enough?)
**Score: 5/10**

File sizes are within budget but the demo section poses a real LCP risk.

**What's wrong:**
- If the YouTube and Spotify iframes load on page load, they will delay LCP significantly
- No evidence of font preloading (DM Sans, Barlow Condensed)
- Background gradients and backdrop-filter on the nav can cause paint delays

**Path to 10:**
- Demo embeds: lazy-load using Intersection Observer. Only load iframes when the demo section enters the viewport. Show a poster image until then.
- YouTube poster: use `<img src="https://img.youtube.com/vi/[ID]/maxresdefault.jpg">` as placeholder — loads fast, looks great, triggers iframe on click or on intersection
- Preload critical fonts: `<link rel="preload" as="font">` for DM Sans and Barlow Condensed
- Test with Lighthouse after every major change. LCP target ≤ 2.5s on mobile 4G.

---

### 9. SOCIAL PROOF (Why should I believe this is real?)
**Score: 2/10**

Currently almost no social proof exists.

**What's wrong:**
- No artist names, testimonials, or specific claims about real users
- No numbers (though there aren't real ones yet — honest absence is better than fake numbers)
- The product is new so real social proof is hard, but its absence makes the page feel unproven

**Big picture connection:** Independent artists are cynical about tools. They've been burned by platforms that promised everything and delivered little. Social proof from a peer they respect carries enormous weight. This is also why the producer seeding strategy matters — the most credible social proof for a Manchester indie artist is "Joe Beats (who produced your favourite EP) uses ABLE."

**Path to 10:**
- Short term (before real users): Use the demo well — a beautiful, real-looking demo IS proof that someone who knows music made this
- Medium term (after seeding 20 producers): Add 3–4 artist names + one-line quotes. Not "This changed my life" — something specific: "My first release on ABLE got 47 email sign-ups in 3 days. I've never had that from Linktree."
- Never fabricate — leave this section out until it's real. Honest absence is better than fake proof.
- Consider: "Built by an independent artist" framing somewhere — James is the target user. That's authentic social proof in itself.

---

### 10. TRUST SIGNALS (Is this safe to sign up for?)
**Score: 4/10**

A new visitor has several trust questions that currently aren't answered clearly.

**The questions:**
- "Will they spam me?" → No clear answer
- "Is my credit card going to be charged?" → "No card required" exists but is small
- "Can I delete my account?" → Not mentioned
- "Is this a real company?" → No indication

**Path to 10:**
- Under the primary CTA: "No card. No commitment. Free forever." — 12px, visible
- In FAQ: "Can I cancel?" → "Yes, any time. Your page stays live on the free tier with no changes."
- Privacy policy link in footer (requires building the privacy policy page first — P1 legal requirement)
- "Data export anytime" mentioned somewhere — this builds trust for UK artists who know about GDPR
- Consider: one small trust badge area — not SSL padlock nonsense, but: "Artists own their fan data. Always."

---

### 11. VISUAL HIERARCHY (Can you scan and understand?)
**Score: 5/10**

A scan of the page currently doesn't tell a clear story.

**What's wrong:**
- Multiple visual weights competing on the page
- The demo and the headline are in tension — neither is clearly the hero
- Section breaks aren't sharp enough — hard to tell where one section ends and the next begins

**Path to 10:**
- One dominant visual on each section. In the hero: headline IS dominant (largest text on page). Phone is supporting cast.
- Section breaks: full-width dividers (1px, subtle), or significant padding (80px+ between sections on desktop)
- Background variation between sections: hero (#09090f) → demo (slightly lighter, #111118) → Linktree section (strong dark) → pricing (slightly differentiated) — variation creates rhythm
- Each section should have one thing that stands out at a glance, even to someone who doesn't read

---

### 12. THE SWITCHER PATHWAY (From landing to imported Linktree)
**Score: 2/10**

The journey from "I saw ABLE, I want to see if it's better than Linktree" to "my links are imported and my page is live" should be seamless. Currently it's broken.

**What's wrong:**
- No "paste your Linktree" CTA on the landing page
- Even if they start onboarding, the Linktree import doesn't exist yet (P0 Netlify function)
- The connection between "landing page Linktree pitch" → "onboarding Linktree import" → "links imported + page live" is the most powerful funnel ABLE has — and it's currently fiction

**Path to 10:**
- Landing page: Section 4 with "Paste your Linktree →" CTA
- This CTA links to `start.html?import=linktree` — pre-activates the Linktree import step
- Onboarding step 0: if `?import=linktree` param, opens directly to "paste your Linktree URL" input
- Netlify function: `linktree-import` — fetches public HTML, parses links, maps known platforms
- Onboarding: shows checkboxes: "These were on your Linktree — which should we import?"
- Result: artist has a populated ABLE profile in under 3 minutes

---

### 13. PRICING CLARITY (Does the free tier feel real?)
**Score: 6/10**

Pricing section exists and is structurally correct.

**What's wrong:**
- "Free forever" isn't prominent enough — some visitors will be sceptical that "free" has a catch
- The feature lists under each tier are too dense — hard to scan
- The upgrade trigger for Free → Artist isn't communicated (the 100 fan cap)
- No monthly/annual toggle — industry standard, adds perceived value

**Path to 10:**
- Free tier headline: "Your page is free. Always." — not "Free / £0/mo" — the copy sells it
- Under each tier: 3 bullet points max, each starting with a specific outcome (not a feature)
- "What triggers the upgrade?" explained subtly under Free tier: "When 100 fans sign up, you'll want to keep growing. That's Artist tier."
- Annual pricing (not required for v1 but worth noting): 2 months free on annual creates a natural upsell

---

### 14. EMOTIONAL RESONANCE (Does it get it?)
**Score: 6/10**

The headline is emotionally resonant. The rest of the page less so.

**What's wrong:**
- The page talks about features (campaign states, email capture) more than it talks about the feeling
- The experience of having 47 real fans' emails after a release — that feeling is what ABLE sells, not "campaign states"
- Most artists don't know they want campaign states. They know they want to feel like their release mattered.

**Path to 10:**
- The fan ownership section (Section 5 in SPEC) should describe the feeling, not the feature: "You release something. 47 people sign up to hear from you. Those are real people. They raised their hand. That email list is what you're building every time someone lands on your page."
- The demo phone, in the Live state, should visibly show "47 fans signed up" or equivalent — making the abstract concrete
- The "Gig Tonight" state should show an excited urgency — the page itself should feel like a show is happening

---

### 15. THE "13-YEAR-OLD" TEST (Is this too complicated?)
**Score: 5/10**

A 16-year-old with a SoundCloud page and no Spotify artist profile should be able to understand what ABLE is and sign up for free without needing to understand terms like "campaign states," "CTA zones," or "oembed."

**What's wrong:**
- "Campaign states" is used in some copy — jargon
- The demo switching mechanism might not be immediately obvious — "what am I supposed to do with these buttons?"
- "Pre-release" is clear but "Live" (as a state name) is potentially confusing — does it mean livestream?

**Path to 10:**
- Replace "campaign states" with "your page knows your moment" in all public-facing copy
- State names for public use: "Profile" → "Your page" / "Pre-release" → "Something's coming" / "Live" → "It's out now" / "Gig" → "I'm playing tonight"
- Demo section: add a micro-instruction above the state buttons: "Tap to see how your page changes →" — obvious, not condescending
- "No Spotify? No problem." — add this line somewhere visible. Many young artists have SoundCloud or Bandcamp but not Spotify for Artists.

---

### 16. THE SINGLE THING THEY REMEMBER
**Score: 6/10**

If someone closes the tab, what sticks?

Currently: "100 real fans beat 10,000 strangers" — this is memorable. Good.

**What's wrong:** The second memorable thing should be the demo — "I saw the page shift from a normal profile to this countdown timer in real time." But currently the demo doesn't create that memory because it doesn't really work.

**Path to 10:** Fix the demo (Angle #2). When the demo works, closing the tab means: "That headline. And that phone that changed when I pressed the button. I want to see what mine looks like."

---

### 17. FAN ENTRY POINT (What if it's not an artist?)
**Score: 1/10**

A fan who lands here from "Made with ABLE" on an artist's profile has no path.

**What's wrong:** There is zero acknowledgement that non-artists might land here. The entire page assumes artist intent. A fan lands here, sees "100 real fans beat 10,000 strangers," has no idea what to do, and leaves.

**Big picture connection:** At scale, a significant % of landing page visitors will be fans. Those fans might become artists. Or they might want to explore artists on ABLE. Losing them entirely wastes an acquisition opportunity.

**Path to 10:**
- Footer: "Not an artist? Find artists you love on ABLE →" — small text, links to fan.html or future discovery page
- This one line solves the problem. Don't over-engineer it. No separate fan landing page needed yet.

---

### 18. DISCOVERABILITY / SEO
**Score: 3/10**

The page currently has minimal SEO consideration.

**What's wrong:**
- No clear `<title>` and `<meta description>` reflecting the product
- The headline and key copy should be in semantic HTML (`<h1>`, `<h2>`) for crawler visibility
- "Link in bio for independent musicians" is a high-value search term not currently targeted

**Path to 10:**
- `<title>`: "ABLE — Link in bio for independent artists | Build your fan list"
- `<meta description>`: "Your page shifts with your moment. Release day, gig night, new drop — ABLE knows. Every fan sign-up goes straight to your list. Free forever."
- Hero headline in `<h1>`, section headlines in `<h2>` — semantic structure
- Image alt tags on the phone demo
- Note: SEO is a long game — organic search won't be a primary channel for 12+ months. Do the basics now, don't invest heavily.

---

### 19. AI RED TEAM — What would kill the conversion?
**Score: n/a (threat analysis)**

Playing devil's advocate: what would make an intelligent, cynical artist NOT sign up after landing here?

**Threat 1: "The demo looks fake."**
→ Impact: HIGH. Artists are design-literate. A CSS mockup demo destroys credibility.
→ Kill: Real YouTube/Spotify embeds. If they can't see it, they won't believe it.

**Threat 2: "I don't understand what makes this different from Linktree."**
→ Impact: HIGH. If the Linktree comparison isn't explicit, most visitors won't work it out themselves.
→ Kill: Section 4 (Linktree comparison) must exist and must be direct.

**Threat 3: "Why would I give them my email? What's the catch?"**
→ Impact: MEDIUM. "Free forever" and "no card" address this, but they need to be more visible.
→ Kill: Prominent trust line under CTA. Privacy-first language in fan ownership section.

**Threat 4: "I've seen 10 tools like this and they all have the same pitch."**
→ Impact: MEDIUM. The headline is distinctive. The demo makes it real if it works.
→ Kill: The demo doing its job (Angle #2) is the primary defence.

**Threat 5: "I'll do it later."**
→ Impact: HIGH — later means never. No urgency mechanism on a free product.
→ Kill: "Your page is live in 5 minutes" communicates low time cost. The Spotify/Linktree import making it nearly instant is the urgency — not artificial scarcity.

---

### 20. THE NORTH STAR TEST — Does this page earn the product?
**Score: 4/10**

The ABLE product, when it's working at its best, is a 9/10 experience. The landing page should be a 9/10 preview of that experience — in design quality, in copy confidence, in visual polish.

**The current page doesn't earn the product it's selling.**

If ABLE is premium for artists — a product that takes their identity seriously, that shifts with them, that feels like it was designed for their specific context — then the landing page should feel that way too. Right now it feels like a competent early SaaS product page. It doesn't have the character of the product behind it.

**Path to 10:**
- The landing page must feel as good as the artist profile. Same dark editorial aesthetic. Same typographic confidence. Same motion quality.
- The demo phone should be the most beautiful thing on the page — not a functional element but a showcase piece
- Every decision on this page should ask: "Does this feel like ABLE, or does it feel like 'a tool'?"
- When the answer is consistently ABLE, the north star score goes to 9.

---

## OVERALL SCORE BREAKDOWN

| Angle | Score | Priority |
|---|---|---|
| 1. First 3 seconds | 5 | P1 |
| **2. Product demo** | **2** | **P0** |
| 3. Headline copy | 7 | P2 |
| 4. CTA design and weight | 4 | P1 |
| 5. Copy voice | 6 | P2 |
| **6. Linktree switcher pitch** | **3** | **P1** |
| 7. Mobile experience | 5 | P1 |
| 8. Performance | 5 | P1 |
| 9. Social proof | 2 | P2 (blocked — needs real users) |
| 10. Trust signals | 4 | P1 |
| 11. Visual hierarchy | 5 | P1 |
| **12. Switcher pathway (end-to-end)** | **2** | **P0** |
| 13. Pricing clarity | 6 | P2 |
| 14. Emotional resonance | 6 | P1 |
| 15. "13-year-old" test | 5 | P1 |
| 16. Single thing they remember | 6 | P2 |
| 17. Fan entry point | 1 | P2 |
| 18. Discoverability / SEO | 3 | P3 |
| 19. AI red team | — | Ongoing |
| 20. North star test | 4 | P0 (governs everything) |

**Average: 4.2/10**

---

## THE 5 THINGS THAT MOVE THE NEEDLE MOST

If there were only 5 changes to make:

1. **Build a real demo phone** (390px, real YouTube Short, real Spotify, switching states) — moves #2 from 2→9
2. **Add the Linktree comparison section** with a "paste your Linktree" CTA — moves #6 and #12 from 2-3→8
3. **Rebuild the CTA buttons** to match the stakes (52px, weighted, spring hover) — moves #4 from 4→8
4. **Add eyebrow + tighten sub-headline** in hero — moves #3 from 7→9 and #1 from 5→8
5. **Rewrite the fan ownership section** to describe the feeling, not the feature — moves #14 from 6→9

Do these 5 and the landing page goes from 4.2 → ~7.5 overall.
