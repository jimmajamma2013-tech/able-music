# ABLE — Lateral Ideas Log
**Created: 2026-03-16 | Status: ACTIVE — living document, updated every session**

---

Add every idea generated from a think-out-of-the-box session here, regardless of how strange it seems. The filter comes later. The graveyard is for ideas that have been evaluated and rejected. This log is for ideas that haven't been evaluated yet, or are worth continuing to explore.

---

## Template

```
## [Date]: [Idea Title]
**Source**: [what triggered this — exercise, competitor research, conversation]
**The idea**: [2-3 sentences]
**Why it could be big**:
**Why it might not work**:
**What would need to be true**:
**Status**: Raw / Exploring / Prototyped / Adopted / Rejected
```

---

## 2026-03-16: "Your Algorithm" — ABLE's Artist-Controlled Recommendation Engine

**Source**: Exercise 1 in THINK-OUT-OF-THE-BOX.md — The Anti-Algorithm Vision

**The idea**: Rather than positioning ABLE as "no algorithm," reframe it as "your algorithm." An artist-owned recommendation engine that runs only on their fan data, for their fans, optimising for real-world connection outcomes — show attendance, direct support, close-circle sign-ups — not engagement metrics.

**Why it could be big**: "No algorithm" is a negative claim — it says what ABLE isn't. "Your algorithm" is a positive claim — it says what ABLE does that nothing else does. Every platform uses an algorithm that serves the platform's interests. ABLE is the only platform whose data processing serves only the artist. That is a profound philosophical distinction. If it can be made simple and visible, it becomes one of ABLE's most powerful selling points — not just a feature but a values statement.

**Why it might not work**: The "algorithm" word has been poisoned by Instagram and TikTok. Artists who are suspicious of algorithms may be suspicious of any algorithm, even one that's on their side. The reframe requires clear communication and may not land immediately.

**What would need to be true**: ABLE would need enough fan data per artist to make meaningful recommendations. This requires scale. In early stages, the "algorithm" is just good analytics — show the artist which fans are most engaged. As the fan list grows, the recommendations become more sophisticated. The philosophy can be communicated before the technical capability exists.

**Status**: Exploring — worth developing the copy angle immediately; technical capability follows scale

---

## 2026-03-16: Verified Human Badge

**Source**: Exercise 4 (AI Artist exercise) in THINK-OUT-OF-THE-BOX.md

**The idea**: A visible, verifiable "human artist" badge on ABLE profiles — linked to a real identity check (not just a ticked box). As AI-generated music becomes ubiquitous, the human artist with a verified identity becomes a distinct and increasingly valuable category.

**Why it could be big**: By 2027-2028, there will be tens of thousands of AI music accounts across platforms. Fans who care about human artistry will have no way to distinguish AI artists from human ones on most platforms. ABLE could be the platform that makes that distinction clear and credible. "Verified on ABLE" becomes a signal of human authenticity in music — valuable to artists, valuable to fans, valuable to ABLE's brand.

**Why it might not work**: Identity verification is technically and legally complex. It requires personal data handling, which adds regulatory overhead. There is also the risk of appearing discriminatory against artists who use AI tools as part of their creative process — the line between "human artist using AI" and "AI artist" is genuinely blurry.

**What would need to be true**: ABLE needs a lightweight identity verification flow that is credible without being invasive. Possibly: email verification + Spotify artist page verification + optional Distrokid/TuneCore account link. Not government ID — that's excessive for the use case. The badge standard should be "clearly a real musician" not "government-verified human being."

**Status**: Raw — worth speccing when AI music becomes a more active cultural conversation (likely 6-12 months)

---

## 2026-03-16: Artist Income Transparency Report

**Source**: Technique 10 (Obvious Thing Nobody Is Doing) in THINK-OUT-OF-THE-BOX.md

**The idea**: A community-submitted, anonymised annual report showing what independent artists actually earn — broken down by streaming, live, merch, direct support (close-circle/Bandcamp/Patreon), sessions, sync, and other. Submitted by ABLE artists, aggregated anonymously, published once a year.

**Why it could be big**: This report would be read by every independent artist and music journalist on the internet. Nothing like it exists with real data. ABLE would become the source of truth for what independent artists actually earn — a position of enormous trust and authority. It would drive significant organic press and artist sign-ups. It would also make a compelling case for close-circle subscriptions: "streaming pays artists £0.003/stream; close-circle subscribers paid an average of £47/year per fan."

**Why it might not work**: Income data is deeply personal. Artists may not want to disclose even anonymously. The sample would be skewed toward ABLE's artist demographic, which may not be representative of all independent artists. The report requires significant curation, design, and editorial to be worth reading.

**What would need to be true**: Minimum 200 artists submitting income data for the report to be meaningful. A clear, trusted anonymisation guarantee. A clean, well-designed report format. A distribution partnership with a music industry publication (The Guardian music, Hypebot, Music Business Worldwide) to amplify on publication.

**Status**: Exploring — potential annual event; could start as a pilot with founding artists cohort

---

## 2026-03-16: Artist Collective Cross-Promotion

**Source**: Exercise 3 (Collective Model) in THINK-OUT-OF-THE-BOX.md

**The idea**: Groups of 5–10 artists who share genre, geography, or ethos can form a collective on ABLE. Each artist's page shows a "You might also love" section, curated by the collective — handwritten recommendations from the artist, not algorithmic suggestions.

**Why it could be big**: This is discovery through relationship rather than algorithm. The recommendation carries the artist's credibility — "I think you'd love [X] because..." is infinitely more powerful than "fans of you also listen to Y." It could become ABLE's organic growth mechanism: new fans join through a collective recommendation, sign up to multiple artists in one session, and become ABLE's stickiest users because they're connected to multiple artists, not just one.

**Why it might not work**: Artists are protective of their fan lists. The collective framing must be clear: this is sharing your recommendation, not your fan list. There is also a curation overhead — artists need to write the recommendation copy. Lazy implementations (auto-generated "similar artist" links) would undermine the whole concept.

**What would need to be true**: A clear UX that makes collective participation feel like endorsement rather than data-sharing. A minimum viable collective feature: one handwritten "you'd love this artist" recommendation per artist page, freely editable, with a direct link to the other artist's profile. No fan data shared. Just the recommendation.

**Status**: Raw — low effort to prototype; worth A/B testing on a willing founding artists group

---

## 2026-03-16: Show Rider — Digital Logistics Page

**Source**: Technique 10 (Obvious Thing Nobody Is Doing) in THINK-OUT-OF-THE-BOX.md

**The idea**: A digital show rider that lives on ABLE — shareable via link with any venue. Contains: load-in time preferences, backline requirements, sound requirements, catering requirements, guest list, accommodation needs, contract contact details. Generated once, shared with every venue by link. The venue can confirm receipt within the same interface.

**Why it could be big**: This is a genuinely daily problem for touring artists. Every show requires logistics communication that currently happens via email, WhatsApp, and PDFs. A single shareable rider link removes friction from every venue booking. It also deepens ABLE's relationship with artists' live business — which is where most of the money is. If ABLE handles the pre-show logistics layer, it becomes part of the artist's touring workflow, not just their online presence.

**Why it might not work**: This is outside ABLE's current product scope. It requires understanding the specific technical vocabulary of live music production (what a backline spec looks like, what a stage plot is) and building it in a way that's usable by both artists and venues. The venue adoption problem is real — venues need to check the rider, not just receive it.

**What would need to be true**: A partnership or integration with venue booking software (Gigmit, Gigtacular, etc.) would accelerate adoption. Alternatively: a simple web form that the artist fills in, generates a clean PDF and shareable link, and venues can open with no login required. This is the MVP.

**Status**: Raw — worth a simple spec; may be a later-stage feature after core product is established

---

## 2026-03-16: Fan Taste Graph — Organic Discovery Network

**Source**: Technique 10 (Obvious Thing Nobody Is Doing) in THINK-OUT-OF-THE-BOX.md

**The idea**: When ABLE has enough fans signed up across enough artists, the overlap between fan lists becomes meaningful data. "Fans of [Artist A] also follow [Artist B]" — not because an algorithm decided they should, but because real people voluntarily signed up for both. Surface this as a discovery feature: "People who follow you also follow these artists."

**Why it could be big**: This is the music industry's version of "customers also bought." But unlike Amazon's system, it's based on genuine fan commitment (signing up for a list) rather than a passive browse. It is the cleanest organic discovery mechanism possible — real fans, real choices, real taste graph. No algorithm, no ad spend.

**Why it might not work**: Requires significant scale to be meaningful. With 100 artists and 10,000 total fans, the overlap data is too thin. With 10,000 artists and 1,000,000 fans, it becomes extraordinarily valuable. This is a product that improves with scale — it needs to be designed and spec'd now but won't be useful until ABLE has meaningful traction.

**What would need to be true**: ~50,000+ fans in the ABLE system across ~2,000+ artists before the data becomes meaningful. Privacy consent from fans for their data to be used in aggregate recommendations. Clear artist controls: opt in to the recommendation network, or opt out.

**Status**: Raw — design the data model now; activate the feature at scale threshold

---

## 2026-03-16: ABLE Founding Artists Programme

**Source**: Technique 6 (Dribbble's invite-only quality signal) in THINK-OUT-OF-THE-BOX.md

**The idea**: 500 founding artists, chosen by application, who receive a permanent "Founding Artist" badge on their ABLE profile. These artists also get: early access to every new feature, a founding artists Slack/Discord channel with direct access to the ABLE team, a lifetime discount on the Artist Pro tier, and their name in the product's credits page.

**Why it could be big**: Creates scarcity and status around early adoption. "I'm a founding artist on ABLE" becomes a signal of taste and credibility in the same way "I was on Dribbble in 2010" did. The founding artists are ABLE's most credible advocates — real artists who chose the platform early and can speak to its quality from experience. This cohort also generates better product feedback than any focus group.

**Why it might not work**: The application process creates friction. Some of the best artists won't apply because they're not self-promoters. The selection process is subjective and could be perceived as gatekeeping. The community requires ongoing moderation and relationship management.

**What would need to be true**: A genuinely good application form — not "tell us about yourself" but "show us one thing about your relationship with your fans that surprised you." Criteria that prioritise genuineness and depth of fan relationship over follower count. A ABLE team member who personally reads every application. No more than 500 accepted in the first cohort.

**Status**: Exploring — worth launching as part of the initial go-to-market strategy

---

## 2026-03-16: Session Musician Payment via ABLE Credits

**Source**: Technique 10 (Obvious Thing Nobody Is Doing) in THINK-OUT-OF-THE-BOX.md

**The idea**: When a producer or session musician is credited on a release via ABLE's credits system, a one-click payment/invoice flow is triggered. The credit record contains the session musician's rate card and contact details. A Stripe-powered invoice is generated from the credit, paid through ABLE, with a PDF sent to both parties.

**Why it could be big**: This turns credits from discovery to operating system. It solves a genuine, daily problem in the music industry. Every session musician and producer has a stack of unpaid or delayed invoices. Every artist/manager has a stack of invoices they haven't processed. ABLE's credits system already captures the work record. Payment is one step further. The transaction fee on session payments could be a meaningful revenue stream.

**Why it might not work**: Financial services regulation is complex. Handling money requires compliance (FCA in the UK, potentially Money Services Business registration). This cannot be built casually — it requires legal and compliance work before launch. Also: the credit system needs to reach critical mass of music professionals before the payment flow is useful.

**What would need to be true**: Legal advice on UK payment facilitation requirements. A clear distinction between "ABLE facilitates introductions and invoicing" vs "ABLE is a payment processor" — the former has lighter regulatory requirements. Stripe Connect is likely the right technical implementation.

**Status**: Raw — worth a legal review before spec'ing technically; potential later-stage revenue stream

---

## 2026-03-16: ABLE as Widget — Embeddable Sign-Up for Any Platform

**Source**: Technique 2 (Remove a Core Feature — no profile page) in THINK-OUT-OF-THE-BOX.md

**The idea**: An ABLE-powered fan sign-up widget that embeds on any website — Bandcamp, Squarespace, Shopify, Substack — as a `<script>` tag or iFrame. The artist's fan list is still stored in ABLE. Analytics still flow to admin.html. The ABLE page becomes optional, not mandatory.

**Why it could be big**: Not every artist wants a profile page. Some have existing websites they love. Some use Bandcamp as their primary presence. Forcing them to use ABLE's profile page in order to access ABLE's fan list is a conversion barrier. An embeddable widget removes that barrier entirely. ABLE becomes the fan database for the independent music internet — wherever artists are, ABLE is behind the sign-up form.

**Why it might not work**: A widget-first approach may dilute the profile page product. If artists don't need to visit ABLE's page, they are less likely to upgrade or invest in the profile. The widget could become a free-tier commodity that undermines the paid product.

**What would need to be true**: The widget would need to be free tier, capturing only basic fan data (email). The upgrade path from widget to full profile would need to be compelling — the widget is the hook, the profile is the product. Design the upgrade prompt carefully: "You have 47 fans signed up via your widget. See who they are — and message them — in your ABLE dashboard."

**Status**: Exploring — worth scoping as a growth/distribution feature; not a core product priority for V1

---

## 2026-03-16: Close Circle Tiered Pricing — Let Artists Set Their Own Levels

**Source**: Technique 6 (Patreon's membership tiers) in THINK-OUT-OF-THE-BOX.md

**The idea**: Instead of a single Close Circle subscription price, artists can set 2-3 tiers: e.g. "Following" (£2/month: updates + early access), "Close" (£5/month: demos + Q&A), "Inside" (£12/month: everything + direct message access). Each tier has a name the artist chooses.

**Why it could be big**: Tiered pricing dramatically increases the number of fans who convert. A fan who won't pay £10/month might pay £2/month. That fan becomes a paying member and frequently upgrades over time. Patreon's data shows that tiered structures consistently outperform single-price memberships for creator income. ABLE's Close Circle is currently single-price — this is leaving money on the table.

**Why it might not work**: More complexity in setup means more friction for artists launching close-circle. An artist who would have launched a single £7/month tier might procrastinate when faced with designing three tiers. The onboarding for tiered close-circle needs to be as simple as single-price, or the complexity kills conversion.

**What would need to be true**: A wizard that makes tier creation feel like naming and filling in three short fields, not a pricing strategy exercise. Sensible defaults: suggested tier names, suggested prices, suggested benefits at each level. The artist can accept the defaults or customise. The default state should be "one tier, reasonable price" — tiering is the upgrade path for artists who want more control.

**Status**: Raw — high value; worth speccing for Close Circle V2

---
