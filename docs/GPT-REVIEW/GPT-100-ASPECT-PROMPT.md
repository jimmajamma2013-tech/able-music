# ABLE — GPT 100-Aspect Review Prompt
**Paste everything below this line into GPT.**

---

You are performing a comprehensive strategic and product review of ABLE (Artist Before Label).

You have access to the live product. Review it before you begin:

- Landing page: https://ablemusic.netlify.app/landing.html
- Artist profile: https://ablemusic.netlify.app/able-v7.html
- Admin dashboard: https://ablemusic.netlify.app/admin.html
- Onboarding wizard: https://ablemusic.netlify.app/start.html

---

## What ABLE is

ABLE is a premium mobile-first platform for independent musicians.

- Artists get a bio link (replaces Linktree) that adapts to their release cycle
- Fans who land sign up with email — artist owns that list forever, no algorithm
- 4 campaign states: profile (default), pre-release (countdown), live (release week), gig (show tonight)
- Artist gets real analytics: who clicked what, when, from where
- Freelancer layer: producers/mixers get a credits-based profile, discovered via artists they've worked with

It is NOT a marketplace, social network, streaming platform, or distributor.

Competitors it replaces: Linktree, Beacons, Laylo, Mailchimp (partially), ToneDen (partially).

Target user: Independent UK artist, 1k–50k listeners, serious about their craft.

Current state: Pre-launch. Core pages built. Backend (Supabase) and billing (Stripe) not yet live.

---

## Your task

Review ABLE across 100 dimensions. Be direct, honest, and adversarial where the product deserves it.

For each dimension give:
- A score out of 10
- One sentence on what's strong
- One sentence on what's missing or at risk
- One specific action that would improve it

Group the 100 dimensions into the 10 categories below. Score each category out of 10 (average of its dimensions). End with an overall score out of 10.

---

## The 100 dimensions

### CATEGORY 1 — Product concept (10 dimensions)
1. Core problem clarity — is the problem real and felt?
2. Solution fit — does ABLE solve the problem better than alternatives?
3. Unique mechanism — is there something here no competitor has?
4. Email moat — is owned email list a defensible differentiator?
5. Campaign states — genuinely useful or ignored by most artists?
6. Freelancer layer — credible acquisition mechanic or distraction?
7. Fan journey — does the fan experience make sense?
8. Artist journey — onboarding to live page to dashboard — is it coherent?
9. Product timing — right time in the market?
10. Concept scalability — does this work at 100 artists? 10,000?

### CATEGORY 2 — Design and UX (10 dimensions)
11. First impression — does the artist profile communicate quality immediately?
12. Mobile experience — does it feel native on iPhone?
13. Visual identity — is the design distinctive vs generic?
14. Information hierarchy — does the page prioritise the right things?
15. CTA clarity — do fans know what to do when they land?
16. Admin dashboard usability — can an artist manage their page without a manual?
17. Onboarding wizard — does it get artists to a live page in under 5 minutes?
18. Landing page — does it convert an artist who's never heard of ABLE?
19. Theme system — do Dark / Light / Glass / Contrast all work?
20. Accessibility — is this usable for people with visual impairments?

### CATEGORY 3 — Copy and messaging (10 dimensions)
21. Landing page headline — does it land the value proposition immediately?
22. Artist profile copy — does it feel like the artist, not a SaaS product?
23. Dashboard copy — warm, direct, zero SaaS micro-copy?
24. Onboarding copy — does it set expectations correctly?
25. Copy consistency — same voice across all 4 pages?
26. Banned phrases — any corporate marketing language still present?
27. Fan capture copy — does "Stay close." do the job?
28. Competitor framing — is the differentiation stated without arrogance?
29. Tier upgrade copy — does it say what you get, not just "upgrade"?
30. Error states — if something breaks, does the copy stay on-brand?

### CATEGORY 4 — Competitive position (10 dimensions)
31. Linktree comparison — clear winner or same-same?
32. Beacons comparison — is 0% take rate now neutralised?
33. Laylo comparison — Instagram DM gap: fatal or manageable?
34. Spotify for Artists — structural moat or temporary gap?
35. Winamp for Creators — threat level honest assessment
36. Switching cost — how hard is it for a Linktree user to switch?
37. Defensibility — can Linktree copy campaign states in 3 months?
38. Network effects — does ABLE get stronger as more artists join?
39. Positioning clarity — can an artist explain ABLE to a friend in one sentence?
40. Category creation — is ABLE creating a new category or fighting in an existing one?

### CATEGORY 5 — Growth and acquisition (10 dimensions)
41. Target artist clarity — is 1k–50k listeners the right segment?
42. First 100 artists strategy — is producer seeding + BBC Introducing credible?
43. Word of mouth mechanics — will artists tell other artists?
44. Freelancer acquisition — credits mechanic: will it actually drive sign-ups?
45. Fan acquisition — does the fan dashboard create pull for more artists?
46. Content marketing — is the Instagram/social strategy executable solo?
47. Referral mechanics — is there a reason to share ABLE with another artist?
48. Paid acquisition — is there a viable paid channel when the time comes?
49. Press and PR — is the story strong enough for music press?
50. Launch sequence — is the go-to-market plan realistic for a solo founder?

### CATEGORY 6 — Monetisation and pricing (10 dimensions)
51. Free tier value — does it give enough to hook without giving away the product?
52. Artist tier (£9/mo) — right price for the UK indie market?
53. Artist Pro tier (£19/mo) — is the jump from £9 justified?
54. Label tier (£49/mo) — right structure and price for small labels?
55. Tier gate UX — gold lock pattern: tasteful or annoying?
56. Conversion path — is free → paid friction low enough?
57. Revenue model sustainability — can this reach £10k MRR solo?
58. Annual pricing — is there a reason to offer annual plans?
59. Churn risk — what makes an artist cancel?
60. LTV potential — what's the realistic lifetime value of an Artist Pro subscriber?

### CATEGORY 7 — Technical architecture (10 dimensions)
61. Stack choice — HTML/CSS/JS + Supabase + Netlify: right for this stage?
62. localStorage → Supabase migration — is the path clean?
63. Performance — does the page load fast on a 4G mobile connection?
64. Security — SSRF vulnerability in oEmbed proxy: how serious?
65. GDPR compliance — missing consent on fan sign-up: how urgent?
66. PWA readiness — manifest.json missing: does it matter now?
67. Error handling — happy path only: what breaks first?
68. Supabase dependency — single point of failure risk?
69. Netlify functions — are the serverless functions production-ready?
70. Scalability — does the architecture hold at 10,000 concurrent profiles?

### CATEGORY 8 — Artist success and retention (10 dimensions)
71. Day 1 experience — does a new artist feel the value within 10 minutes?
72. First milestone — what's the first moment an artist thinks "this is working"?
73. Nudge system — does the dashboard coach artists toward better use?
74. Analytics quality — do the stats tell artists something actionable?
75. Campaign state adoption — will artists actually use pre-release mode?
76. Email value visibility — does the dashboard show why email beats follows?
77. Gig mode UX — is it fast enough to use on a show day?
78. Support experience — what happens when something breaks?
79. Feature discovery — do artists find features they didn't know existed?
80. Long-term stickiness — why does an artist stay on ABLE for 3 years?

### CATEGORY 9 — Execution risk (10 dimensions)
81. Solo founder risk — what breaks first if this is one person?
82. Backend dependency — what can't ship until Supabase is live?
83. Email infrastructure — Resend integration: is it production-ready?
84. Billing system — Stripe unbuilt: what can't be validated until it's live?
85. Legal exposure — GDPR gap: what's the realistic risk before it's fixed?
86. Security exposure — SSRF: what's the realistic risk before it's fixed?
87. Competitor response — if Linktree ships campaign states tomorrow, what's left?
88. Artist churn at free tier — will free users convert or just take and leave?
89. Fan acquisition dependency — does ABLE work if artists don't promote their page?
90. Time to first revenue — realistic estimate to first £1,000 MRR?

### CATEGORY 10 — Strategic vision (10 dimensions)
91. 12-month vision — is the roadmap realistic and prioritised correctly?
92. 3-year vision — does ABLE have a path to being a £10M ARR business?
93. Exit potential — is this acquirable? By whom?
94. Investor story — is the pitch coherent and defensible?
95. Artist-first values — does the product actually live its philosophy?
96. Music industry timing — is 2026 the right moment for this?
97. Platform risk — what happens if Instagram kills bio links?
98. Expansion potential — UK first, then where?
99. Mission clarity — "Artist Before Label" — does the product deliver on that promise?
100. Build this verdict — cold, final, one-line answer: should this be built?

---

## Output format

For each of the 10 categories:

**Category name — X/10**
| # | Dimension | Score | Strong | Risk | Action |
|---|---|---|---|---|---|
| 1 | ... | X/10 | ... | ... | ... |

Then at the end:

**Overall score: X/10**
**Top 3 things that would move the score to a 9**
**Single biggest risk**
**One-line verdict**
