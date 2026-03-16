# PARTNERSHIPS.md — Path to 10
**20-angle analysis of the partnerships specification**
**Date: 2026-03-16**

---

## The 20-Angle Review

Each angle is assessed against the current document. Scores are honest — not rounded up.

---

### 1. Strategic Clarity — Does the WHY come before the WHAT?

**Score: 9/10**

Every partnership now opens with "why this matters" before explaining what ABLE gets. The Spotify integration rationale ("removes the empty state problem") and music school rationale ("15,000 students at the moment of maximum motivation") are specific and honest.

**Gap:** The Resend section explains what ABLE gets but is slightly thin on WHY Resend specifically over competitors (Postmark, SendGrid). A one-sentence explanation would complete it: "Resend is chosen because it has the cleanest developer API, the most generous free tier for early-stage, and is GDPR-native — unlike SendGrid which requires additional DPA configuration."

---

### 2. Prioritisation — Are partnerships ranked by value/feasibility?

**Score: 9/10**

V1/V2/V3 phasing is clear and explicit. P0/P1/P2 priority tags within phases add a second layer of granularity. The Section 7 roadmap with target months ties everything to a timeline.

**Gap:** The commercial partnerships (Section 4) could benefit from an explicit value/effort matrix. Music schools vs management companies are both V3 — but they have very different effort levels and revenue implications. A two-sentence comparison would help prioritisation in practice.

---

### 3. Actionability — Can someone execute the first partnership from this doc alone?

**Score: 9/10**

For technical integrations: yes. Auth flows, rate limits, cache strategies, and fallbacks are specified in enough detail to start building without additional research.

For commercial partnerships: the "who to contact," "what to offer," and "what to ask for" structure makes the first outreach executable. BIMM first, personal outreach, guest lecture offer — that's a concrete first step.

**Gap:** The Spotify section says "no special approval needed for basic data" but the V2 note says "pre-save requires Spotify for Artists partnership agreement." The process for applying for that agreement is not specified. Add: "Apply via Spotify's partner programme at developer.spotify.com/documentation/general/guides/content-linking-guidelines — expect 4–8 week response time."

---

### 4. V1/V2/V3 Phasing — Correctly scoped to build phases?

**Score: 10/10**

The phasing is correct and aligned with the broader product strategy:
- V1 integrations have zero dependencies on paying users (Spotify, Bandsintown, oEmbed, Resend)
- V2 integrations make sense only once the product has proven value (Stripe Connect needs support pack feature, Linktree import needs switchers, PostHog needs analytics questions to answer)
- V3 partnerships require relationship-building and artist base density (music schools need >100 artists to be credible, venue partnerships need event-active users)

No concerns here.

---

### 5. Commercial Terms — Are typical commission/revenue share structures specified?

**Score: 9/10**

The Abler programme commission table is explicit: 20%/25%/30% with duration rationale. Affiliate commissions from SubmitHub, Groover, and Playlist Push are specified as percentage ranges with realistic per-conversion revenue estimates.

The Stripe Connect section specifies ABLE's suggested 5% platform fee with a net-revenue example (£10 Support Pack → £0.22 net to ABLE after fees).

**Gap:** Music school deal structure specifies the discount (30%) but does not specify what ABLE pays (if anything) for school placement. Clarify: "ABLE pays nothing for school placement — this is a value exchange, not a paid sponsorship." That's implicit in the current text but should be explicit.

---

### 6. Partnership Approach — HOW to initiate contact?

**Score: 9/10**

The "who initiates contact," "what to offer in the first conversation," and "what to ask for" structure covers the full negotiation arc for commercial partnerships. The philosophy in Section 8 — "build the integration first, then approach with usage data" — is the correct sequencing and is documented.

**Gap:** The management company section recommends targeting "managers who are also artists or who operate out of small management companies" but doesn't give a concrete example of how to find them (e.g. "Search Spotify for Artists credits, find UK independent artists with 10k+ monthly listeners, check their social bio for management contact"). A single tactical sentence here would move this from strategy to execution.

---

### 7. Risk Assessment — What could go wrong?

**Score: 7/10**

The Stripe section covers the "Stripe ban" risk (from the broader strategy doc) and the Spotify section covers API downtime with a fallback strategy. The Abler programme covers fraud prevention thoroughly.

**What's missing:**
- Spotify could revoke API access if ABLE grows quickly and Spotify sees ABLE as competitive (Linktree lost API access temporarily in 2022). Mitigation: cache all pulled data permanently, not just 24-hour TTL. The profile should always be able to fall back to manually-entered data.
- Bandsintown could shut down (it has had financial difficulties). Mitigation: store all imported shows in `able_shows` and let artists add shows manually — the API is convenience, not dependency.
- Music school partnership could fail if the contact leaves. Mitigation: build the relationship with the institution (email course lead + head of department), not just one person.
- Abler programme could be gamed by music production communities doing reciprocal referrals. Mitigation already specified (minimum activity requirement, 30-day hold) but should be named as a known risk.

**Recommendation:** Add a "Known risks" subsection to each major technical integration in Section 3.

---

### 8. Success Metrics — How do you know a partnership is working?

**Score: 9/10**

The commercial partnerships in Section 4 all have explicit KPIs with numeric targets:
- Music schools: 50 sign-ups in 60 days, 8% paid conversion, 40% 90-day retention
- Management companies: 3/5 roster added in 30 days, 60% 90-day retention, 1 referral per company
- Affiliate programme: £200–500/month by Month 12, 15% click-through on promote feature

The Abler programme in Section 5 has performance stats in the dashboard spec but does not specify what "the programme is working" looks like at 3 months vs 12 months.

**Gap:** Add a success threshold for the Abler programme overall: "The programme is working when Abler-driven conversions account for >20% of total paid sign-ups by Month 6."

---

### 9. ABLE Positioning — Does the doc show ABLE as an equal partner, not a supplicant?

**Score: 10/10**

Section 8 explicitly addresses this. The "what ABLE brings" section is specific and confident — 500–5,000 engaged artists, authentic positioning, referral traffic. The "how to open a conversation" guidance (build first, pitch with data, not with a deck) is the right posture.

The anti-patterns section reinforces this by being explicit about what ABLE won't do — which is as important for positioning as what ABLE will do. A platform with clear limits is credible.

---

### 10. Integration Depth — Are API requirements specified?

**Score: 9/10**

Spotify: OAuth 2.0 PKCE flow with scopes specified, rate limits, TTL, fallback, cost, privacy. Complete.

Bandsintown: API key flow, endpoint URL, rate limits, cache strategy, fallback, cost, V3 extension path. Complete.

oEmbed: URL pattern examples for YouTube and SoundCloud, Spotify iframe embed pattern, cache strategy, fallback, cost, privacy note on `youtube-nocookie.com`. Complete.

Resend: API key auth, Netlify function routing, batch size, queue/retry strategy, cost per tier, GDPR DPA note. Complete.

Stripe Connect: OAuth flow, `application_fee_amount` pattern, account ID storage, fallback. Complete.

**Gap:** Linktree CSV import (V2) is mentioned in Section 2 but not detailed in Section 3. It's lower complexity (file parsing, no API) but a brief spec would complete the picture: "Accept CSV export from Linktree, parse link title and URL fields, prompt artist to map each link to an ABLE CTA type, prefill profile in one step."

---

### 11. Completeness — Are there obvious gaps in partner coverage?

**Score: 8/10**

The spec covers: Spotify, Bandsintown, oEmbed, Resend, Stripe, Linktree CSV, PostHog, SubmitHub/Groover affiliate, music schools, management companies, Abler programme.

**What's not covered:**
- Distribution partners (DistroKid, TuneCore) — these are referenced in the strategy doc but have no spec here. Given that "distribute this release" is a logical CTA on a release snap card, this should have at least a basic affiliate note.
- Mailchimp/Kit export (fan list portability) — artists on Artist Pro should be able to sync their fan list to external email tools. No spec for this.
- Bandcamp (as a store, not just oEmbed) — connecting Bandcamp for merch display is in scope but not specified.

None of these are blockers for V1. They should be in V2 scope.

---

### 12. Language and Voice — Does the copy match ABLE's register?

**Score: 9/10**

The document is written in a direct, non-corporate register throughout. The anti-patterns section in particular sounds like ABLE: "Never take a commission on fan-to-artist payments without full transparency."

**Minor note:** The Abler welcome email subject "You're an Abler. Here's how it works." is functional but slightly flat. The copy philosophy would push for something warmer: "You're in. Here's what you've got." — but this is a minor point for a documentation file, not for the shipped email.

---

### 13. Feasibility — Are any commitments unrealistic for a solo founder?

**Score: 9/10**

The spec is realistic. All V1 technical integrations are solvable in days, not months. The commercial partnership targets (first school deal by Month 4, first management deal by Month 5) assume 1–2 personal conversations per month — achievable.

**Watchpoint:** The Abler dashboard is specified at considerable depth (earnings history, share toolkit, payout settings, leaderboard opt-in). Building all of this in V2 is achievable, but the full spec suggests a month of development work. The MVP Abler dashboard should be: referral link display, conversions count, earnings total, payout button. Everything else is V3.

---

### 14. Scalability — Does the spec hold at 10,000 artists?

**Score: 8/10**

Resend's batch API, Stripe Connect's account-per-artist model, and the caching strategies (24-hour TTL, localStorage + Supabase) all scale without architectural change to 10,000+ artists.

**Gap:** At 10,000 artists the Bandsintown API rate limit (1,000 req/day free tier) becomes a constraint. At 10,000 artists refreshing every 6 hours, that's potentially 40,000 requests/day. Mitigation: move to Bandsintown's paid API (apply for partner access) or implement staggered refresh (not all artists refresh simultaneously — randomise within the 6-hour window). This should be noted as a scaling consideration.

---

### 15. Privacy and Legal — Is the spec GDPR-compliant?

**Score: 9/10**

Privacy implications are documented per integration. DPA coverage is noted for Resend. Fan data protection is explicit throughout. The anti-patterns section explicitly prohibits fan email sharing.

**Gap:** The Abler programme's fraud detection (IP-based duplicate detection) involves processing IP addresses. Under GDPR, IP addresses are personal data. The spec should note: "IP-based fraud detection should not persist IP addresses beyond the 30-day fraud window — delete after review period, don't log permanently."

---

### 16. Developer Handoff — Is this buildable without James?

**Score: 9/10**

The technical sections are detailed enough for a developer unfamiliar with the project to start building. Auth flows, endpoint patterns, fallbacks, and cost structures are all specified.

**Gap:** Caching strategy uses localStorage for all API data, which is correct for the current single-file architecture. But the Supabase migration path (when backend lands) is not addressed. Add a single note: "When Supabase is live, API cache moves from localStorage to a `api_cache` table with artist_id, cache_key, value, expires_at columns. No localStorage keys change — the abstraction layer updates."

---

### 17. Tension with ABLE's Business Model — Are there contradictions?

**Score: 10/10**

The spec is consistent with the strategy document throughout. The 0% commission promise is honoured — ABLE's affiliate revenue comes from third-party tools, not from fan-to-artist transactions. The "no exclusivity" principle is explicit and aligns with the competitive positioning (ABLE is not trying to be the only tool, it's trying to be the essential one).

---

### 18. Defensibility — Could these partnerships be copied?

**Score: 8/10**

Technical integrations (Spotify, Bandsintown, oEmbed) can be copied by any competitor. They are table stakes, not moat.

The Abler programme creates a network of advocates — this is harder to replicate because it requires ABLE's credibility within the artist community to already exist. A competitor launching a referral programme on day one has no Ablers worth having.

The music school and management partnerships, if done well, create institutional relationships that competitors would have to displace — not just match.

**Gap:** The spec doesn't articulate which partnerships are defensible vs. commodity. A brief "defensibility note" per partnership type would be useful for prioritisation.

---

### 19. Coherence — Does the doc tell a single consistent story?

**Score: 9/10**

The document has a clear arc: philosophy first, then technical detail, then commercial detail, then the Abler programme as the centrepiece, then what ABLE refuses to do, then a roadmap. Each section references adjacent sections where relevant.

**Minor gap:** Section 2 (Priority Partnership Stack) references "Linktree CSV import" as a V2 integration but Section 3 (Technical Integration Detail) covers only V1 APIs. A reader might expect Linktree to be detailed in Section 3. Either detail it there or add a note: "V2 technical integrations (Stripe Connect, Linktree CSV, PostHog, Bandcamp oEmbed) will be detailed in a PARTNERSHIPS-V2.md addendum as the product enters V2 build phase."

---

### 20. North Star Alignment — Does the spec serve artists as the ultimate beneficiary?

**Score: 10/10**

Every partnership in the spec either makes the artist's profile more compelling, gives the artist data they own, or pays the artist (Abler commissions, Support Pack payouts). There are no partnerships that intermediate the artist-fan relationship. The anti-patterns section explicitly protects against the ways partnerships typically erode artist value.

The spec is consistent with the product's core thesis: "Artist Before Label."

---

## Overall Score

| Dimension | Score |
|---|---|
| Strategic clarity | 9/10 |
| Prioritisation | 9/10 |
| Actionability | 9/10 |
| V1/V2/V3 phasing | 10/10 |
| Commercial terms | 9/10 |
| Partnership approach | 9/10 |
| Risk assessment | 7/10 |
| Success metrics | 9/10 |
| ABLE positioning | 10/10 |
| Integration depth | 9/10 |
| Completeness | 8/10 |
| Language and voice | 9/10 |
| Feasibility | 9/10 |
| Scalability | 8/10 |
| Privacy and legal | 9/10 |
| Developer handoff | 9/10 |
| Tension with business model | 10/10 |
| Defensibility | 8/10 |
| Coherence | 9/10 |
| North Star alignment | 10/10 |
| **Average** | **9.0/10** |

---

## The Three Things to Fix to Reach 9.5+

**1. Risk assessment (7/10 → 9/10):**
Add a "Known risks and mitigations" subsection to each major integration in Section 3. Four risks are identified above: Spotify API revocation, Bandsintown shutdown, school contact departures, and Abler programme reciprocal gaming. Documenting these takes 20 minutes and makes the spec genuinely more useful.

**2. Scalability at 10,000 artists (8/10 → 9/10):**
Add a scaling note to the Bandsintown section: the 1,000 req/day free tier limit and the staggered refresh solution. This is a known constraint and should be documented before it becomes a surprise.

**3. Linktree CSV import spec (8/10 → 9/10 for completeness):**
Add a brief "V2 technical integrations" section covering Linktree CSV (file parsing spec), PostHog (tracking events to implement), and Bandcamp oEmbed. These are the missing V2 technical details. A paragraph each is sufficient.

---

## Comparison: Old vs New

| Criterion | `ECOSYSTEM_AND_PARTNERSHIPS.md` | `PARTNERSHIPS.md` |
|---|---|---|
| Strategic clarity | 4/10 — WHY implied, not stated | 9/10 — explicit per partner |
| Prioritisation | 3/10 — "build now/next/later" without phasing | 9/10 — V1/V2/V3 + P0/P1/P2 |
| Actionability | 2/10 — no contact info, no sequence | 9/10 — first conversation scripted |
| V1/V2/V3 phasing | 2/10 — absent | 10/10 — explicit |
| Commercial terms | 2/10 — vague ranges mentioned | 9/10 — specific with rationale |
| Partnership approach | 1/10 — entirely absent | 9/10 — who/what/ask structure |
| Risk assessment | 0/10 — absent | 7/10 — present, could be deeper |
| Success metrics | 0/10 — absent | 9/10 — KPIs per partnership |
| ABLE positioning | 4/10 — wishlist tone | 10/10 — equal partner framing |
| Integration depth | 3/10 — mentions APIs, no specs | 9/10 — auth, rate limits, fallbacks |
| **Overall** | **3.5/10** | **9.0/10** |
