# ABLE — Launch Sequence: Final Review
**Date: 2026-03-16 | System: Phase 0 → Phase 3 launch strategy**

---

## Is the Phase 0/1/2/3 strategy realistic?

The structure is realistic. The timelines are tight but not dishonest.

Phase 0 (founder's page + 5 real fans + named list of 10) is a weekend of focused work if James sits down and does it. The spec does not underestimate this — it explicitly says "can be done in a weekend if focused" and then provides the checklist. That is honest.

Phase 1 (10 artists, 2 weeks) is tight but doable if the list is warm. Ten people who already trust James and are already making music can be onboarded in a week with 1:1 conversations. The limiting factor is whether the product is stable enough for a non-technical musician to complete start.html without James watching over their shoulder. That is the real Phase 0 test.

Phase 2 (50 artists, word of mouth) is where the spec starts to feel slightly optimistic. Going from 10 to 50 on word of mouth requires either: (a) the 10 beta artists are actively sharing the product, or (b) the "Made with ABLE" footer is already generating inbound. Neither is guaranteed. The spec accounts for this by making the Phase 2 success criteria the gate — not a fixed timeline.

Phase 3 (public launch, press, producer seeding) is correctly deferred. The spec does not try to launch publicly before proof exists. This is the right call.

**The realistic risk in the timeline is Phase 2, not Phase 0 or Phase 1.** Ten people who know James is a small enough cohort to manage personally. Going from 10 to 50 without a systematic referral mechanism is word-of-mouth only, which is uncontrollable.

---

## Are the "first 10 artists" criteria specific enough?

The criteria in the spec are more specific than most early-stage products would require, and that is intentional.

Required criteria:
- James can reach them directly (phone, DM, email)
- Actively making music
- At least some social presence
- Honest people who will give real feedback

Preferred criteria:
- Genre variety (at least 4 different vibes)
- Some with upcoming releases or gigs
- 2 non-UK based
- 1 less digitally fluent

The criteria are specific enough for their purpose: preventing James from filling the list with easy yeses (friends who will say "great mate" and never use it). The "less digitally fluent" criterion is particularly valuable — it tests onboarding for the user who will make up the majority of the eventual market.

**The one gap:** the criteria don't address timeline urgency. An artist who is actively gigging or releasing in the next 3 months has a real reason to set up campaign states. An artist between projects will likely use the profile mode only. The private beta should include at least 2–3 artists with an imminent release or gig — otherwise the campaign state system goes untested in the most important scenario.

---

## Does the founder's page as proof content hold up?

Yes. The logic is correct and the spec makes it non-negotiable for good reason.

The founder's page is not a nice-to-have. It is the only honest answer to "does this actually work?" A product built for artists, shown to artists by its founder, with no live page of the founder's own is a credibility problem. Every artist James approaches will either ask to see an example or silently judge the invite by whether James is dogfooding his own product.

The `LANDING_SPOTLIGHT` constant referenced in PATH-TO-10.md — using James's profile as the hero demo on landing.html — is smart. It replaces a generic mockup with a real, functional page. It proves the product in two seconds. If the page is compelling, visitors understand ABLE before reading a word of copy.

**The condition the spec does not state explicitly:** the founder's page has to be genuinely compelling, not just technically complete. "Real name, real music, real bio" is the minimum bar. The page also needs to demonstrate at least one campaign state working — ideally pre-release or live, showing the countdown or stream CTA front-and-centre. A static profile with no active state misses the most differentiating feature.

---

## What could go wrong? What's the biggest risk?

**Biggest risk: The product breaks on a musician's actual phone during onboarding.**

Not in testing. In real life. An artist opens start.html on their Samsung Galaxy on a patchy 4G connection in a green room before a show. The wizard freezes at Step 2. They move on and never come back.

ABLE's audience is not developers. They will not open DevTools and report a console error. They will tap once, get confused, and abandon. The product has been built and tested by one developer on specific devices. The Playwright tests run on a simulated 375px viewport, not a real 390px iPhone 15. The gap between "passes smoke tests" and "works for a real musician" is real and only closed by testing on real devices with real people.

**Secondary risk: Beta artists don't put the link in their bio.**

If the 10 beta artists complete onboarding, have live pages, and then don't replace their Linktree link with the ABLE link, the product has failed at its core purpose. The Phase 1 success criteria (8 of 10 artists with the link in bio) exists to catch this. But the reason artists won't put the link in their bio is always the same: the page isn't compelling enough for them to trust it with their audience. That is a product problem, not a distribution problem.

**The risk that is not in the spec: James doesn't do Phase 0.**

The spec is well-written and complete. The hardest thing about it is that it requires James to sit down, create a real artist page, and share it with real people. Every other item in the launch sequence is contingent on this one action. If Phase 0 doesn't happen, the spec is a document, not a launch.

---

## Is there anything missing from the launch checklist?

**Missing: a "soft no" protocol.**

The spec covers what happens when artists give positive feedback. It does not cover what to do if an artist from the beta list declines or goes quiet after onboarding. At 10 artists, a single dropout means 10% of the beta cohort is gone. Having a list of 12–15 artists and a simple "if X drops out, approach Y" protocol would make Phase 1 more robust.

**Missing: a decision on email confirmation testing.**

Phase 0 item P0.3 (5 real fan sign-ups) requires the confirmation email to arrive correctly. But the email system (Resend) is not yet wired. If emails are not live by Phase 0, the fan sign-up confirmation is either missing or a localStorage-only experience with no email. The spec should state explicitly: "email confirmation must be live before Phase 0.3 is attempted."

**Missing: a "first public URL" decision.**

At what point does landing.html become publicly accessible? Right now it is a file on a local machine. Before Phase 1, it needs to be deployed. The spec assumes this happens but does not include a deployment step. Netlify (the planned hosting) requires no build pipeline — it is a drag-and-drop deploy. But it still needs to happen. Add a P0 item: "Deploy to ablemusic.co. Test the live URL on mobile data."

---

## Final score: 7.5/10

**What earns the 7.5:**
- The phase structure is correct and sequenced properly (prove → show → grow → scale)
- The "first 10 artists" criteria prevent the most common early-stage mistake (social proof from people who won't actually use it)
- The Phase 1 → Phase 2 gate criteria are specific and measurable
- The contingency planning (what if Phase 2 produces no upgrades) is honest and actionable
- The "Made with ABLE" footer as Phase 2 passive loop is correctly prioritised

**What keeps it from 9:**
- No deployment step in the checklist (the product needs to be live at a real URL)
- No contingency for beta artist dropouts
- Email confirmation wiring is assumed but not gated
- The product risk (real-device testing) is mentioned in ANALYSIS.md but not turned into a specific Phase 0 action
- "First 10 artists" criteria don't mandate artists with imminent releases — the campaign state system goes mostly untested without them

The strategy is ready to execute. The bottleneck has never been the plan. The bottleneck is starting Phase 0.
