# Dimension I10 — Terms of Service
**Category:** Legal, Compliance & Accessibility
**Phase:** 9

*terms.html exists and contains a reasonable starting point. However it has significant gaps when measured against what a UK company collecting personal data on behalf of third-party controllers (the artists) actually needs. The ToS must clearly define acceptable use, content ownership, fan data ownership, ABLE's right to suspend, liability limitations, payment terms (before Stripe is added), and governing law. It must also be accepted at account creation — not just linked in the footer.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm terms.html exists at `/terms.html` — it does; status confirmed | TRM | 5 | 1 | L | 1 |
| 2 | Confirm terms.html is linked from start.html artist onboarding — the artist must agree before creating an account | STR | 5 | 1 | H | 1 |
| 3 | Confirm terms.html is linked from admin.html account settings | ADM | 4 | 1 | M | 2 |
| 4 | Confirm terms.html is linked from landing.html footer | LND | 4 | 1 | M | 2 |
| 5 | Confirm terms.html is linked from the privacy.html page (cross-reference between legal docs) | PRV | 3 | 1 | L | 2 |
| 6 | Confirm the artist explicitly accepts the terms at account creation — a checkbox "I agree to the Terms of Use and Privacy Policy" is required; the "Create account" button must not be clickable until this is ticked | STR | 5 | 2 | H | 1 |
| 7 | Confirm the acceptance checkbox is not pre-ticked — UK GDPR Article 7(2) and ICO guidance both require affirmative action | STR | 5 | 1 | H | 1 |
| 8 | Confirm the acceptance moment is logged — store the timestamp, terms version, and IP/device identifier alongside the artist's account record | STR | 5 | 3 | H | 1 |
| 9 | Add a terms version number to terms.html — e.g. "Version 1.0" alongside the "Last updated" date | TRM | 5 | 1 | M | 1 |
| 10 | Add a "Last updated" date field to terms.html and establish a process to update it on every edit — currently shows "March 2026" | TRM | 4 | 1 | L | 1 |
| 11 | Add a section clearly defining what ABLE is — "ABLE is a platform that enables independent musicians (artists) to build direct relationships with their fans. ABLE provides the tools; the relationship belongs to the artist and the fan." | TRM | 4 | 2 | L | 1 |
| 12 | Expand the acceptable use section — current version lists harassment, illegal content, spam, and impersonation; add: no scraping, no reselling the platform, no automated access without permission, no circumventing tier restrictions | TRM | 5 | 2 | M | 1 |
| 13 | Add a prohibition on uploading content that infringes third-party intellectual property rights — music, artwork, and imagery on the artist's page must be owned or licensed | TRM | 5 | 2 | H | 1 |
| 14 | Add a prohibition on uploading illegal content — child exploitation material, content that incites violence, content that violates UK law | TRM | 5 | 1 | H | 1 |
| 15 | Add a prohibition on using ABLE to facilitate fraud — fake artist accounts, fake fan sign-ups, clickfraud | TRM | 5 | 1 | H | 1 |
| 16 | Expand the "Artist accounts" section — add that artists are responsible for complying with the law in their jurisdiction when using ABLE (tax obligations, music licensing, etc.) | TRM | 4 | 2 | M | 2 |
| 17 | Add a section on content ownership — current version is good ("You keep full ownership of your music, artwork, and content") but add: ABLE receives a limited licence to display, store, and cache the content for platform operation | TRM | 5 | 2 | H | 1 |
| 18 | Define the scope of ABLE's content licence explicitly — "non-exclusive, royalty-free, worldwide licence to display, store, transmit, and cache your content solely for the purposes of operating ABLE on your behalf" | TRM | 5 | 2 | H | 1 |
| 19 | Add a clause stating the content licence terminates when the artist deletes their account — ABLE cannot continue to use or display content after the account is closed | TRM | 5 | 2 | H | 2 |
| 20 | Add a section on fan data ownership — current version addresses this in "Fan sign-ups" but it should be a dedicated section: "Fan email addresses collected through your ABLE page are your data. You are the data controller. ABLE processes this data on your behalf." | TRM | 5 | 2 | H | 1 |
| 21 | Add a clause clarifying that fan data collected through ABLE may only be used by the artist for direct communication about their own music and related activities — not sold, not shared, not used for unrelated marketing | TRM | 5 | 2 | H | 1 |
| 22 | Add a clause stating that artists are solely responsible for complying with data protection law when contacting their fans — ABLE provides the infrastructure but does not control the communications | TRM | 5 | 2 | H | 1 |
| 23 | Add a clause stating that ABLE will delete the artist's fan data if ABLE is instructed to do so by the artist — right to erasure flows upstream | TRM | 5 | 2 | H | 2 |
| 24 | Add an ABLE's right to suspend section — currently covered in "Termination" but insufficient; add: ABLE may suspend or terminate accounts immediately for: ToS violations, legal compliance reasons, non-payment, fraudulent activity | TRM | 5 | 2 | H | 1 |
| 25 | Add to the suspension section: if suspended for non-payment, the account is suspended (not deleted) for 30 days; artist can reactivate by paying the outstanding balance | TRM | 4 | 2 | M | 2 |
| 26 | Add to the suspension section: if suspended for ToS violation, artist is notified and given 48 hours to appeal before account deletion | TRM | 4 | 2 | M | 2 |
| 27 | Add a data access before closure clause — currently present ("we will give you a chance to export your data first") but make it time-specific: artist has 30 days from suspension notice to export data | TRM | 5 | 2 | H | 2 |
| 28 | Add a liability limitation section — current "Availability" section implies but does not state a liability cap; add: ABLE's liability is limited to the subscription fees paid in the 3 months preceding the claim | TRM | 5 | 3 | H | 2 |
| 29 | Add a disclaimer of consequential damages — ABLE is not liable for loss of revenue, loss of fans, or business losses arising from platform downtime | TRM | 5 | 2 | H | 2 |
| 30 | Add a disclaimer for third-party links — ABLE is not responsible for the content or practices of third-party websites (streaming platforms, ticket vendors) linked from artist pages | TRM | 4 | 1 | M | 2 |
| 31 | Add a disclaimer for user-generated content — ABLE does not endorse or take responsibility for content published by artists on their pages | TRM | 4 | 1 | M | 2 |
| 32 | Add payment terms for when Stripe is added — do not add these until Stripe is actually integrated, but document as a placeholder section: "Payment terms will be added when paid subscription features are enabled" | TRM | 4 | 2 | L | 2 |
| 33 | Add the subscription model description when tiers are live — monthly subscription, billed in advance, priced in GBP | TRM | 4 | 3 | M | 3 |
| 34 | Add a refund policy when subscriptions are live — recommend: pro-rata refund for cancellations within 14 days (UK Consumer Contracts Regulations 2013 cooling-off right for digital services) | TRM | 5 | 3 | H | 3 |
| 35 | Add the 14-day cooling-off right explicitly — under UK Consumer Rights Act 2015, consumers have 14 days to cancel a digital service contract without reason | TRM | 5 | 3 | H | 3 |
| 36 | Add a cancellation policy when subscriptions are live — how to cancel, what happens to the account, whether data is retained | TRM | 4 | 3 | M | 3 |
| 37 | Add data deletion on account cancellation — artist's data (profile, fan list, analytics) deleted within 30 days of cancellation; artist can export first | TRM | 5 | 3 | H | 3 |
| 38 | Add an age requirement section — state the minimum age (recommend 13+ for free/artist tiers, 18+ for payment features) | TRM | 5 | 2 | H | 1 |
| 39 | Add a parental consent section for under-18s — ABLE cannot verify age but must state the requirement; artists under 18 must have parental consent | TRM | 4 | 2 | M | 2 |
| 40 | Add a governing law section — "These Terms are governed by the laws of England and Wales" | TRM | 5 | 1 | H | 1 |
| 41 | Add a jurisdiction section — "Any dispute arising from these Terms will be resolved in the courts of England and Wales" | TRM | 5 | 1 | H | 1 |
| 42 | Add a severability clause — "If any part of these Terms is found to be unenforceable, the rest remains in force" | TRM | 4 | 1 | L | 2 |
| 43 | Add a waiver clause — "Failure to enforce any provision does not constitute a waiver of that provision" | TRM | 3 | 1 | L | 3 |
| 44 | Add a force majeure clause — ABLE is not liable for failures caused by events beyond its reasonable control | TRM | 3 | 2 | L | 3 |
| 45 | Add an entire agreement clause — "These Terms, together with the Privacy Policy, constitute the entire agreement between ABLE and the artist" | TRM | 4 | 1 | L | 2 |
| 46 | Add a contact email for legal matters — `legal@ablemusic.co` or `hello@ablemusic.co` with a subject line guidance | TRM | 4 | 1 | L | 1 |
| 47 | Confirm `hello@ablemusic.co` (currently listed) is actively monitored for legal correspondence | TRM | 5 | 1 | H | 1 |
| 48 | Add ABLE's registered company name and address when incorporation is complete — required for enforceable UK terms | TRM | 5 | 3 | H | 2 |
| 49 | Add the company registration number when incorporated | TRM | 5 | 1 | H | 2 |
| 50 | Add a VAT number when applicable | TRM | 4 | 1 | L | 3 |
| 51 | Add a notice for changes section — must notify artists when ToS are materially changed; currently states "we may update these terms" but doesn't specify how notice is given | TRM | 5 | 2 | H | 2 |
| 52 | Specify that notice of material ToS changes will be given by email with at least 14 days before the changes take effect | TRM | 5 | 2 | H | 2 |
| 53 | Add a clause that continued use after the effective date of ToS changes constitutes acceptance — standard but must be explicit | TRM | 4 | 1 | M | 2 |
| 54 | Add a section on DMCA/copyright takedown procedure — even as a UK company, ABLE will receive DMCA notices from US rightsholders; a designated contact and response procedure reduces liability | TRM | 4 | 3 | M | 3 |
| 55 | Add a section on the UK equivalent — ECHR Article 10 / CJEU safe harbour: ABLE as a hosting platform has limited liability for user content if it acts promptly on valid takedown requests | TRM | 4 | 3 | M | 3 |
| 56 | Add a section defining the Artist's obligations re: music licensing — if an artist embeds a streaming link, they are responsible for having the underlying music licensed; ABLE does not warrant licensing | TRM | 4 | 2 | M | 2 |
| 57 | Add a section on ABLE's status as a hosting platform (not a record label, not a manager, not a booking agent) — prevents artists from mistaking the platform's role | TRM | 3 | 2 | L | 2 |
| 58 | Add a prohibition on using ABLE's brand, logo, or trademarks without permission | TRM | 4 | 2 | M | 3 |
| 59 | Add a section on beta/early access terms — while in early access, features may change, data may be migrated, and pricing may change; early access users are notified before any paid features launch | TRM | 4 | 2 | M | 2 |
| 60 | Add a section on API access (if/when an API is offered) — acceptable use, rate limits, attribution requirements | TRM | 3 | 3 | L | 4 |
| 61 | Add a section on embedding and sharing — artists can embed their ABLE page using ABLE-provided embed codes; third-party embedding without permission is not permitted | TRM | 3 | 2 | L | 3 |
| 62 | Add a section on dispute resolution — before legal action, parties agree to attempt resolution by email | TRM | 3 | 2 | L | 3 |
| 63 | Consider adding an alternative dispute resolution (ADR) clause — directing disputes to an accredited ADR body reduces litigation risk | TRM | 3 | 3 | L | 4 |
| 64 | Confirm terms.html is accessible by keyboard — the back link is an anchor, all text is readable, no broken navigation | TRM | 4 | 1 | L | 1 |
| 65 | Confirm terms.html text contrast meets WCAG AA — same palette as privacy.html; `#e0e6f0` on `#0d0e1a` passes | TRM | 4 | 1 | L | 1 |
| 66 | Confirm terms.html link contrast meets WCAG AA — `#e05242` accent on `#0d0e1a` | TRM | 4 | 1 | M | 1 |
| 67 | Confirm terms.html has correct `<meta name="robots" content="noindex">` — legal documents should not appear in search results to avoid creating confusing duplicate content | TRM | 3 | 1 | L | 1 |
| 68 | Confirm terms.html is served with `Cache-Control: no-cache` — always serve fresh legal documents | TRM | 4 | 2 | M | 2 |
| 69 | Add `<link rel="canonical">` to terms.html | TRM | 2 | 1 | L | 3 |
| 70 | Confirm the terms.html back link works from an external referrer — `javascript:history.back()` may fail if the user arrived directly | TRM | 2 | 1 | L | 3 |
| 71 | Confirm terms.html has `lang="en"` — or consider `lang="en-GB"` for a UK-law document | TRM | 3 | 1 | L | 2 |
| 72 | Add a plain-English summary box at the top of terms.html — "In short: you own your music and your fan list. Use ABLE honestly. We'll be honest with you." | TRM | 4 | 2 | L | 3 |
| 73 | Confirm terms.html does not contain legalese that contradicts the ABLE brand voice — the current version is relatively plain but review against the copy philosophy | TRM | 4 | 2 | L | 2 |
| 74 | Confirm the terms URL is stable and permanent — `ablemusic.co/terms` or `ablemusic.co/terms.html` must not change | TRM | 5 | 2 | M | 2 |
| 75 | Add a canonical URL redirect from `/terms` to `/terms.html` in netlify.toml | TRM | 3 | 1 | L | 2 |
| 76 | Add a section on freelancer profiles (when the freelancer layer is built) — the ToS must cover the freelancer use case: credits display, portfolio, rate card, booking enquiry | TRM | 4 | 4 | M | 3 |
| 77 | Add a section on credit attribution — confirmed credits on ABLE become live links; unconfirmed credits are plain text; artists must not add false credits | TRM | 4 | 3 | M | 3 |
| 78 | Add a section on the "no guarantees" nature of the platform — ABLE does not guarantee any number of fans, any revenue, any career outcome | TRM | 4 | 1 | L | 2 |
| 79 | Add a section on analytics data — ABLE does not guarantee analytics accuracy; approximate figures are provided for informational purposes | TRM | 3 | 1 | L | 2 |
| 80 | Add a section on the relationship between ABLE and streaming platforms (Spotify, Apple Music, etc.) — ABLE is not affiliated with or endorsed by these platforms | TRM | 3 | 1 | L | 2 |
| 81 | Add an indemnification clause — artists agree to indemnify ABLE against claims arising from their content or their use of the platform | TRM | 4 | 2 | M | 2 |
| 82 | Review the indemnification clause for balance — a one-sided indemnification clause may be considered unfair under the Unfair Terms in Consumer Contracts Regulations (now Consumer Rights Act 2015, Schedule 2) | TRM | 4 | 3 | H | 3 |
| 83 | Confirm all clauses are reviewed for compliance with the Consumer Rights Act 2015 — unfair terms in B2C contracts are unenforceable | TRM | 5 | 4 | H | 3 |
| 84 | Confirm the liability limitation clause complies with the Unfair Contract Terms Act 1977 (UCTA) — liability for death or personal injury caused by negligence cannot be excluded | TRM | 5 | 3 | H | 3 |
| 85 | Confirm terms.html is screened for the banned phrase list — no marketing language in a legal document | TRM | 3 | 1 | L | 2 |
| 86 | Add a section on the label tier — what extra permissions and obligations apply when one account manages multiple artists | TRM | 4 | 3 | M | 3 |
| 87 | Ensure the fan-facing terms are addressed — fans are not directly contracting with ABLE (they're signing up to an artist's list), but ABLE's terms should acknowledge this and confirm that fan data rights are handled via the Privacy Policy | TRM | 5 | 3 | H | 2 |
| 88 | Consider whether a separate fan-facing privacy notice on the sign-up form is required, or whether the main privacy policy link suffices | TRM | 4 | 3 | M | 2 |
| 89 | Confirm terms.html addresses the situation where an artist who is on a free tier and exceeds the 100 fan limit — state what happens (gradual restriction or immediate block?) | TRM | 4 | 2 | M | 2 |
| 90 | Confirm terms.html addresses data portability on downgrade — if an artist downgrades from Artist Pro to Free, they retain their fan list data even if the fan count exceeds the free tier limit | TRM | 5 | 3 | H | 2 |
| 91 | Add a definitions section at the top of the terms — define "Artist", "Fan", "User", "Platform", "Content", "Profile", "Fan list" to ensure unambiguous reading | TRM | 4 | 3 | L | 3 |
| 92 | Confirm the definitions are used consistently throughout the terms | TRM | 3 | 2 | L | 3 |
| 93 | Add a version history / changelog section to terms.html — or maintain a separate changelog — showing what changed in each version | TRM | 3 | 3 | L | 4 |
| 94 | Confirm terms.html and privacy.html are cross-linked to each other — "See our Privacy Policy for how we handle personal data" | TRM | 4 | 1 | L | 2 |
| 95 | Have terms.html reviewed by a UK commercial solicitor before ABLE signs its first artist — the liability limitation and content ownership sections in particular | TRM | 5 | 5 | H | 2 |
| 96 | Register any trademarks that need protecting before launch — "ABLE Music" or "ablemusic" — this strengthens the brand protection clauses in the terms | TRM | 3 | 5 | L | 4 |
| 97 | Confirm terms.html does not make promises ABLE cannot keep — e.g. "we will always notify you before changes" is a binding commitment; ensure all stated commitments are operationally achievable | TRM | 5 | 2 | H | 2 |
| 98 | Confirm the "Availability" section is not a guarantee of 99.9% uptime — it should say "we aim to keep ABLE running reliably" not "we guarantee..." | TRM | 4 | 1 | M | 1 |
| 99 | Confirm terms.html is reviewed and updated before each significant platform change — new features, new tiers, Supabase migration, Stripe integration | TRM | 5 | 3 | H | 3 |
| 100 | Final check: have a UK-qualified solicitor read terms.html and privacy.html together and confirm they are coherent, consistent, and compliant with UK law before the first paid artist account is created | TRM | 5 | 5 | H | 3 |

## Wave Summary
**Wave 1 — Legal must-haves before first artist account**: items #1–#2, #6–#11, #13–#15, #17–#18, #20–#22, #24, #38, #40–#41, #46–#47, #64–#67, #73–#74, #85, #98
**Wave 2 — Complete legal coverage**: items #3–#5, #12, #16, #19, #23, #25–#32, #37, #39, #42–#45, #48–#53, #56–#57, #59, #68, #71, #78–#82, #87–#90, #94, #97
**Wave 3 — Post-incorporation and subscription launch**: items #28–#29, #33–#36, #54–#55, #58, #60–#63, #69–#70, #72, #75–#77, #83–#84, #86, #91–#93, #95
**Wave 4 — Long-term governance**: items #50, #60, #63, #93, #96, #99–#100
