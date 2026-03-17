# ABLE — GPT Review Prompt
**Paste this prompt FIRST, then paste the doc content below it.**

---

You are acting as a world-class product, strategy, and business reviewer. You have deep expertise in:
- B2C SaaS product design and UX
- Music industry and independent artist economics
- Platform business models and network effects
- UK startup law, GDPR compliance, and company structure
- Growth strategy, pricing psychology, and conversion optimisation
- Investor-readiness and fundraising
- Brand identity and copy voice
- Technical architecture for web platforms
- Community-led growth and creator economy

You are reviewing **ABLE (Artist Before Label)** — a premium mobile-first platform for independent musicians. ABLE gives artists a conversion profile (link-in-bio), fan capture, campaign states (pre-release/live/gig), and direct fan relationships with zero algorithm.

The founder is James. He is pre-launch, working solo, planning to move to Portugal. The product is fully designed and documented but not yet deployed.

---

## YOUR REVIEW TASK

Go through the documentation provided and review ABLE across every dimension below. Be specific. Name actual files, copy strings, features, or gaps. Do not give generic feedback. Score each dimension 1–10. Where a score is below 8, explain exactly what would push it higher.

---

## THE 100 DIMENSIONS

### PRODUCT VISION & STRATEGY (1–10)
1. Clarity of the core problem being solved
2. Uniqueness of the solution vs existing tools
3. Moat — how defensible is this really?
4. The "campaign state" system — is this a genuine innovation or a nice-to-have?
5. Platform vs tool — is ABLE positioned correctly?
6. The three-user-type model (artist / fan / freelancer) — is this coherent or too ambitious?
7. The "zero algorithm" positioning — does it resonate, or is it a weakness?
8. Long-term vision — is there a clear path from tool to platform?
9. Network effects — are they real and does the spec account for them?
10. Mission clarity — is "Artist Before Label" a mission or a tagline?

### MARKET & COMPETITIVE POSITION (11–20)
11. Market size — is the UK indie music market large enough?
12. Competitive differentiation vs Linktree
13. Competitive differentiation vs LayloFM
14. Competitive differentiation vs ToneDen
15. Competitive differentiation vs Spotify for Artists
16. The most dangerous competitor not yet in the docs
17. Timing — is 2026 the right moment for this?
18. Geographic focus — UK-first, then where?
19. Beachhead segment — are the first 200 target artists well-defined?
20. Market entry strategy — is producer seeding the right first move?

### PRODUCT DESIGN & UX (21–30)
21. Artist profile page — does the design serve the artist's goal?
22. Campaign state UX — does the fan experience change meaningfully per state?
23. Fan capture flow — is the sign-up frictionless enough?
24. Admin dashboard — is it genuinely usable on mobile post-gig?
25. Onboarding wizard — will artists complete it?
26. Empty states — do they teach rather than abandon?
27. The four-theme system — is Glass/Light/Dark/Contrast a real differentiator?
28. Micro-interactions — are they specified in enough detail?
29. The bottom sheet pattern — is it consistent across the product?
30. Accessibility — is WCAG AA achievable with this design?

### COPY & VOICE (31–40)
31. The copy philosophy — is it genuinely distinctive or just "not SaaS"?
32. Banned phrases list — are there gaps?
33. Campaign-state copy variants — are all 4 states covered for every surface?
34. Fan confirmation email — does it feel personal or automated?
35. Onboarding copy — does it get out of the artist's way?
36. Error state copy — does it maintain voice under stress?
37. Tier gate copy — does it respect the artist while making the case?
38. The "Your list. Your relationship." positioning — is it strong enough?
39. Landing page headline — will it convert a sceptical indie artist?
40. The overall reading age and tone — right for the audience?

### BUSINESS MODEL & MONETISATION (41–50)
41. Free tier — is it generous enough to drive adoption?
42. Artist tier at £9/month — is the value obvious?
43. Artist Pro at £19/month — is the jump justified?
44. Label tier at £49/month — is there a real market here?
45. Stripe Connect 5% fee — is "we only earn when you earn" credible?
46. Support Packs — do artists understand what they're selling?
47. Close Circle — is this a feature or a full product?
48. The upgrade trigger moments — are the 7 moments right?
49. The gold lock pattern — does it inform or frustrate?
50. Projected revenue at 10/50/100/500 artists — is it sustainable?

### GROWTH & ACQUISITION (51–60)
51. The growth loop — is the ?ref= attribution genuinely viral?
52. Producer seeding strategy — is it realistic?
53. BIMM partnership — is this the right first institutional move?
54. Instagram strategy — is the two-phone post a real launch moment?
55. Word of mouth mechanics — what triggers an artist to recommend ABLE?
56. The "I make music too →" fan-to-artist conversion — will it work?
57. Launch sequence — is the soft launch plan solid?
58. Press strategy — are the 3 named journalists the right targets?
59. Lead generation — are the DM templates strong enough?
60. Growth at 50 artists — what does the model look like?

### TECHNICAL ARCHITECTURE (61–70)
61. localStorage → Supabase migration — is the path clear?
62. Data model — does it capture the right signals?
63. `campaignState` at fan sign-up — is this the killer data point?
64. The analytics event schema — is it complete?
65. oEmbed security — is the SSRF fix adequate?
66. Email infrastructure — is Resend the right choice at scale?
67. PWA implementation — is the spec complete?
68. Performance — will it load in under 2 seconds on a 4G connection?
69. No build pipeline — is this a strength or a long-term liability?
70. Supabase as the single backend — is this a single point of failure?

### LEGAL & COMPLIANCE (71–75)
71. GDPR compliance — are the P0 gaps fixable before first user?
72. Company structure — is incorporating before first revenue the right call?
73. Portugal NHR timing — is the tax strategy sound?
74. R&D tax relief — is £13,700 net saving realistic?
75. Privacy policy and terms — are they adequately specified?

### OPERATIONS & EXECUTION (76–85)
76. Solo founder risk — is the execution plan realistic for one person?
77. AI workflow — can Claude Code agents genuinely replace a developer?
78. The /morning command — is the daily ritual solid?
79. Documentation quality — is this level of docs a strength or over-engineering?
80. The free stack — is £0/month to £53/month at £1k MRR achievable?
81. Build-your-own tools — is the 15-tool strategy realistic?
82. Time to first artist — based on the plan, when is that realistically?
83. Time to £5k MRR — is the 6-month exit trigger achievable?
84. The exit trigger formula — is 5 conditions the right gate?
85. Portugal move — is the timing aligned with the business plan?

### INVESTOR READINESS (86–90)
86. Is ABLE investable at pre-launch?
87. The data story — is "ABLE knows which fans chose to show up" compelling to investors?
88. The demo spec — will the live pre-release countdown impress?
89. The pre-raise list strategy — when should James start building it?
90. What round size is appropriate given the plan?

### CONFIDENCE & RISK (91–100)
91. Biggest single risk to this product succeeding
92. Most likely reason it fails in Year 1
93. The assumption most likely to be wrong
94. What the first 10 artists will actually say about it
95. What artists will not understand without explanation
96. What will surprise James once real artists are using it
97. The feature that will be requested most in Month 1
98. The feature that looks important but isn't
99. One thing ABLE could do that no competitor could copy for 2 years
100. Overall: is this ready? Score out of 10 and a one-paragraph verdict.

---

## OUTPUT FORMAT

For each dimension: `[N]. [Score/10] — [One sentence finding] → [Specific action if below 8]`

Then at the end:
- Top 10 strengths
- Top 10 gaps
- 5 things to do before launch (in order)
- The one paragraph verdict

Do not soften your assessment. James needs the truth, not encouragement.
