# ABLE — Score Traceability: Every Gap, Every Fix, Every Ceiling
**Created: 2026-03-15**

For each aspect below 10/10, this doc maps:
- **What's blocking it** — the specific reason it isn't 10
- **Research that addresses it** — which of the 6 research docs applies
- **Pre-build step** — which of the 100 pre-build steps resolves it
- **Build step** — which implementation step delivers it
- **Realistic ceiling** — honest assessment of whether 10 is achievable through code alone

Score key: Now → Vision → Ceiling

---

## ARTIST JOURNEY

### 1. First impression — 8 → 9 → 9
**Blocking 10:** The landing page currently relies on manufactured copy and a demo phone. Real social proof (live artists on the platform, real testimonials from real names) is what takes it from 9 to 10. That cannot be engineered — it requires actual users who've had genuine experiences.
**Research:** Competitive moat (confirms positioning sentence: "Linktree doesn't know you have a release dropping")
**Pre-build:** Step 70 (landing copy update), Step 27 (moat articulation)
**Build:** Step 94 (landing.html positioning update)
**Ceiling:** 9. The final point requires real user evidence that doesn't exist yet.

---

### 2. Onboarding — 8 → 9 → 9
**Blocking 10:** The wizard is strong. The gap is the transition from wizard → admin.html — there's a jarring context switch between the warm onboarding tone and the more functional dashboard. A first-run guided experience in admin.html (not a modal tour — a quiet contextual "here's what to do next") would close this.
**Research:** Magic link auth research (transition from auth → dashboard)
**Pre-build:** Step 46 (artist profile design decisions), Step 74 (micro-copy moments)
**Build:** Step 15 (auth smoke test reveals transition quality), Step 95 (landing.html freelancer section adds another onboarding entry)
**Ceiling:** 9. 10 requires user testing to validate the exact moment of friction — which we don't have data on yet.

---

### 3. Time to value — 7 → 8 → 8
**Blocking 10:** "Time to value" for an artist is when they get their first real fan sign-up from a real person who cares. That is inherently weeks away from onboarding, not minutes. No amount of UX work changes this — it's an external dependency on the artist sharing their page and someone clicking it. The 8 ceiling is what we can reach through UX (faster setup, better preview, earlier "wow" moments).
**Research:** Fan retention mechanics (what triggers fans to sign up — informs how to frame the "wow")
**Pre-build:** Step 15 (artist pain point research), Step 74 (micro-copy)
**Build:** Step 36 (spam folder hint improves first email delivery), Step 7 (confirmation email quality)
**Ceiling:** 8. The final gap is real-world.

---

### 4. Core job completion — 9 → 9 → 10
**Blocking 10:** able-v7.html is genuinely excellent. The 1-point gap is: artists currently set up their profile but can't fully trust it — because it's in localStorage, not a real database. One artist on a new device loses everything. That destroys the 10.
**Research:** N/A — this is a known technical gap
**Pre-build:** Step 77 (Supabase schema), Step 85 (localStorage → Supabase migration)
**Build:** Steps 1–5 (foundation auth + data layer)
**Ceiling:** 10. This is fixable. Supabase auth + real data storage closes the gap entirely.

---

### 5. Navigation intuition (admin) — 7 → 8 → 9
**Blocking 10:** admin.html is well-organised now. As more features land (Close Circle, credits, broadcasts, advanced analytics), the nav complexity grows. A 10 requires either: navigation that scales gracefully as features are added, or a deliberate progressive disclosure model where advanced features don't appear until the artist needs them.
**Research:** N/A — this is a design architecture decision
**Pre-build:** Step 33 (admin architecture decision), Step 45 (micro-interaction list for admin)
**Build:** Step 51 (Close Circle revenue panel), Step 89 (analytics view) — both add nav items
**Ceiling:** 9. A 10 requires real users to validate the navigation model under feature load, which we won't have at launch.

---

### 6. Mobile experience — 9 → 9 → 10
**Blocking 10:** Already 9. The gap is the admin.html experience on mobile — it was designed desktop-first. Artists increasingly manage from their phones.
**Research:** N/A
**Pre-build:** Step 6 (Playwright visual audit of all pages at 375px)
**Build:** Step 96 (full Playwright regression at 375px)
**Ceiling:** 10. This is an audit and fix job — no conceptual gaps.

---

### 7. Visual polish — 9 → 9 → 10
**Blocking 10:** The artist profile is very polished. admin.html has some rougher edges (form inputs, table layouts, some spacing inconsistency). The gap is a consistency audit, not a redesign.
**Research:** N/A
**Pre-build:** Step 10 (micro-interactions still missing), Step 91 (v8 visual changes list)
**Build:** Step 96 (visual regression catches regressions), Step 99 (accessibility audit catches contrast issues)
**Ceiling:** 10. Achievable through consistent audit and fix.

---

### 8. Copy & voice — 8 → 9 → 10
**Blocking 10:** Current copy compliance is high. The remaining gap is new feature copy: Close Circle, credits, broadcasts — none of these exist yet. They'll need careful first-pass writing.
**Research:** Close Circle pricing (provides copy templates), Credit verification (provides peer-confirm copy)
**Pre-build:** Steps 64–74 (all copy decisions made before build), Step 73 (copy compliance review)
**Build:** Steps 41, 47, 66–68 (Close Circle, credits, broadcast copy)
**Ceiling:** 10. With copy decisions made before build (pre-build steps 64–74), this is achievable.

---

### 9. CTA architecture — 8 → 8 → 9
**Blocking 10:** The 3-zone architecture is solid. The gap: with Close Circle, credits, and new sections added, the global dedupe rule becomes harder to enforce. A test that verifies no URL appears in multiple zones would catch regressions.
**Research:** N/A
**Pre-build:** Step 45 (micro-interaction + CTA spec)
**Build:** Step 97 (Playwright CTA audit — every CTA clicked, no duplicates, no broken links)
**Ceiling:** 9. A 10 requires the deduplication rule to hold under real-world artist data, which requires user testing.

---

### 10. Feature completeness — 8 → 9 → 9
**Blocking 10:** Close Circle, broadcasts (Pro), press pack, and distribution are still unbuilt. These are all in the spec. Full feature completeness (as designed) would be a 9. A 10 would require features not yet conceived.
**Research:** Competitive moat (confirms what features matter most vs competitors)
**Pre-build:** Step 99 (V8_BUILD_AUTHORITY.md resolves scope)
**Build:** Steps 39–55 (Close Circle), 91–93 (broadcasts)
**Ceiling:** 9. The press pack and distribution features are Phase 2+ and genuinely beyond current scope.

---

### 11. Data ownership — 4 → 9 → 10
**The biggest single gap.** localStorage means an artist's fan list doesn't survive a browser clear. "Your list. Your relationship." rings hollow if you can lose it.
**Research:** Magic link auth research (activation patterns), Competitive moat (data ownership as differentiator)
**Pre-build:** Step 77 (schema), Step 78 (RLS policies), Step 85 (migration strategy)
**Build:** Steps 1–5 (entire foundation group)
**Ceiling:** 10. This is pure engineering. Supabase auth + RLS + sync closes the gap fully.

---

### 12. Emotional resonance — 9 → 9 → 10
**Blocking 10:** "Artist Before Label" is felt throughout. The final point requires the product to deliver on its promise under real conditions — specifically, an artist getting their first fan sign-up and seeing it in their dashboard, knowing that email is theirs forever. That feeling is not designed in code. It emerges from the whole system working correctly.
**Research:** Close Circle pricing (the psychology of "I'm with you"), Competitive moat (what makes ABLE distinct)
**Pre-build:** Step 74 (signature copy moments)
**Build:** Step 3 (fans table + Supabase sync — the fan list being real is what makes the emotion real)
**Ceiling:** 10. But only after real use. At launch it's still 9.

---

### 13. Retention mechanism — 7 → 9 → 9
**Blocking 10:** Artists return to admin when something changes (new fans, new stats). Currently there's no push/notification to bring them back when something happens while they're away.
**Research:** Fan retention research (what triggers habit loops — same logic applies to artist side)
**Pre-build:** Step 84 (service worker for push), Step 81 (event taxonomy)
**Build:** Step 68 (push notifications for peer-confirm), Step 52 (Stripe webhook for Close Circle events)
**Ceiling:** 9. Push notifications help. A 10 requires habit formation over weeks of real use.

---

### 14. Discovery — 3 → 7 → 8
**The hardest gap for artists.** Artists currently bring all their own traffic. ABLE has no mechanism for new people to find them through the platform.
**Research:** Non-algorithmic discovery (directory architecture), Competitive moat (confirms this is a structural advantage vs Linktree)
**Pre-build:** Steps 28–32 (directory design decisions)
**Build:** Steps 76–83 (directory)
**Ceiling:** 8. A 9+ requires network effects — artists discovering other artists, fans discovering artists through other fans' activity. That requires critical mass that can't be designed in.

---

### 15. Trust signals — 8 → 9 → 10
**Blocking 10:** "0% ABLE cut" copy exists. Missing: a clear privacy policy linked from all sign-up points, GDPR-compliant unsubscribe on all emails.
**Research:** Magic link auth (email templates include unsubscribe)
**Pre-build:** Step 73 (copy compliance), Pre-build step 12/13 (privacy + GDPR in implementation plan)
**Build:** Steps 12–13 (privacy policy, GDPR opt-out)
**Ceiling:** 10. Achievable. It's copy and legal text, not a hard design problem.

---

### 16. Upgrade path — 6 → 8 → 9
**Blocking 10:** The gold lock pattern exists. The Pro features (broadcasts, full fan CRM, advanced analytics) aren't built yet, so the upgrade prompt says "you'll get this" but the thing itself isn't demonstrably visible. Artists can't see the value they're upgrading to.
**Research:** Close Circle pricing (what motivates upgrade decisions)
**Pre-build:** Step 85 (migration strategy means Pro data is real), Step 33 (admin architecture decision)
**Build:** Steps 91–93 (broadcasts), Step 89 (analytics view), Step 51 (Close Circle revenue)
**Ceiling:** 9. A 10 requires real testimonials from Pro users saying "this changed my numbers." Not designable.

---

### 17. Platform integration — 7 → 8 → 9
**Blocking 10:** Current integrations (Spotify import, platform pills, Bandsintown) work. A 10 would require deeper integrations — streaming stats fed directly into admin analytics, Bandsintown auto-sync working reliably, DistroKid credit matching.
**Research:** N/A — these are future infrastructure decisions
**Pre-build:** Step 80 (function placement), Step 82 (attribution param standard)
**Build:** Step 86 (platform preference tracking)
**Ceiling:** 9. Deeper integrations require third-party API access and reliability that's outside ABLE's control.

---

### 18. Error & empty states — 8 → 8 → 10
**Blocking 10:** Current empty states are good for v7. New features (Close Circle, credits, broadcasts) will need new empty states. All must be ABLE-voice, specific, not generic.
**Research:** N/A
**Pre-build:** Step 69 (admin empty states written before build), Step 52 (fan.html zero states)
**Build:** Step 97 (Playwright CTA audit catches any broken states)
**Ceiling:** 10. This is write-the-copy-and-implement. No conceptual gap.

---

### 19. Identity expression — 9 → 9 → 10
**Blocking 10:** The 7-vibe system, accent colour, 4 themes — already excellent. The gap: the identity system doesn't yet extend into new surfaces (fan.html, freelancer.html). When those surfaces launch, the artist's vibe should be reflected in how their content appears there too.
**Research:** N/A
**Pre-build:** Step 43 (identity system confirmed for v8), Step 54 (fan.html design system)
**Build:** Steps 25, 65 (themes on fan.html and freelancer.html)
**Ceiling:** 10. It's an extension of the existing system. No new concepts required.

---

### 20. End-to-end coherence — 8 → 9 → 10
**Blocking 10:** The arc from landing → wizard → profile → admin is coherent. The gaps: (a) the transition from wizard to admin still feels like two separate products, (b) what happens when an artist's fan list lives in Supabase instead of localStorage — does the admin still feel instantaneous?
**Research:** Magic link auth (transition UX)
**Pre-build:** Step 85 (migration strategy), Step 33 (admin architecture)
**Build:** Steps 1–5 (foundation), Step 15 (auth smoke test validates end-to-end)
**Ceiling:** 10. With Supabase properly wired and a smooth wizard→admin transition, this is achievable.

---

## ARTIST SUMMARY

| Aspect | Now | Vision | Ceiling | Fixable by code? |
|---|---|---|---|---|
| First impression | 8 | 9 | 9 | No — needs real social proof |
| Onboarding | 8 | 9 | 9 | No — needs user testing |
| Time to value | 7 | 8 | 8 | No — real-world dependency |
| Core job | 9 | 9 | **10** | **Yes — Supabase** |
| Navigation | 7 | 8 | 9 | Mostly — needs real usage data |
| Mobile | 9 | 9 | **10** | **Yes — audit + fix** |
| Visual polish | 9 | 9 | **10** | **Yes — consistency audit** |
| Copy & voice | 8 | 9 | **10** | **Yes — pre-write all new copy** |
| CTA clarity | 8 | 8 | 9 | Mostly — deduplication needs real data |
| Feature completeness | 8 | 9 | 9 | No — Phase 2+ features beyond scope |
| Data ownership | 4 | 9 | **10** | **Yes — Supabase** |
| Emotional resonance | 9 | 9 | 10 | After real use only |
| Retention | 7 | 9 | 9 | Mostly — habit needs weeks of use |
| Discovery | 3 | 7 | 8 | Mostly — network effects need critical mass |
| Trust signals | 8 | 9 | **10** | **Yes — privacy policy + GDPR** |
| Upgrade path | 6 | 8 | 9 | Mostly — needs real Pro users |
| Platform integration | 7 | 8 | 9 | Mostly — third-party API limits |
| Error states | 8 | 8 | **10** | **Yes — write copy + implement** |
| Identity expression | 9 | 9 | **10** | **Yes — extend to new surfaces** |
| End-to-end coherence | 8 | 9 | **10** | **Yes — with Supabase wired** |

**Achievable 10s through code: 8 out of 20**
**Hard ceiling (real-world dependencies): 9 out of 20**
**Realistic post-v8 artist score: 186/200 (93%)**

---

## FAN JOURNEY

### 1. First impression — 6 → 7 → 8
**Blocking 10:** The fan's first impression is always the artist profile page — not an ABLE landing. ABLE is invisible on first contact. A 10 would require fans to have a reason to seek ABLE directly, which only happens after network effects: "I heard about ABLE from another fan." That's a word-of-mouth dynamic, not a design decision.
**Research:** Fan retention (what makes fans come back), Competitive moat (ABLE's no-algorithm positioning)
**Pre-build:** Step 20 (what makes fans feel close), Step 64 (fan sign-up copy for all 4 states)
**Build:** Step 36 (spam folder hint — first post-sign-up experience)
**Ceiling:** 8. The fan's first impression will always be filtered through the artist.

---

### 2. Onboarding — 4 → 8 → 9
**Blocking 10:** The magic link activation flow needs to feel completely seamless. If the email goes to spam, or the link expires before they click it, or the loading state feels broken — the onboarding score drops.
**Research:** Magic link auth (full template + loading states + failure handling)
**Pre-build:** Step 79 (email architecture), Step 36 (spam hint copy)
**Build:** Steps 7–8 (confirmation email + magic link landing), Steps 36–38 (spam hint, failure states)
**Ceiling:** 9. Email delivery is partly outside ABLE's control (spam filters). A 10 would require zero email delivery failures, which isn't achievable.

---

### 3. Time to value (cold visit) — 9 → 9 → 10
**Blocking 10:** Already 9. The fan lands and immediately sees artist content with no friction. The final point is page load speed — if the page loads in under 1 second on a mobile network, it's a 10.
**Research:** N/A
**Pre-build:** Step 86–87 (performance budgets + Core Web Vitals targets)
**Build:** Step 98 (performance audit)
**Ceiling:** 10. LCP < 2.5s is achievable. Sub-1s on fast 3G requires further optimisation but is possible.

---

### 4. Core job (staying close) — 4 → 8 → 9
**Blocking 10:** The fan dashboard (fan.html) needs to be genuinely useful every day. "Genuinely useful" requires real data — real artists who post, real shows, real drops. A half-built dashboard with demo data never reaches a 10.
**Research:** Fan retention (Today strip triggers, what makes fans return)
**Pre-build:** Steps 46–54 (fan dashboard design decisions)
**Build:** Steps 16–30 (entire fan dashboard group)
**Ceiling:** 9. A 10 requires the "morning briefing" habit to form through real use over weeks.

---

### 5. Navigation intuition — 5 → 8 → 9
**Blocking 10:** Following / Discover / Near me tabs are the right structure. The gap is: as the dashboard grows, the Discover section could become complex. A 10 requires the fan to never feel lost.
**Research:** Fan retention (what fans want: finite, personal, done in 60 seconds)
**Pre-build:** Step 46 (fan.html architecture spec)
**Build:** Step 22 (Discover section), Step 30 (Playwright visual test)
**Ceiling:** 9. Structural simplicity is achievable. A 10 requires real user feedback.

---

### 6. Mobile experience — 8 → 9 → 10
**Blocking 10:** fan.html inherits the same motion system as able-v7.html. Full 10 requires the same micro-interaction density.
**Research:** N/A
**Pre-build:** Step 54 (fan.html design system confirmed)
**Build:** Steps 26–27 (fan.html mobile polish + micro-interactions)
**Ceiling:** 10. Achievable — it's applying the existing system to a new surface.

---

### 7. Visual polish — 6 → 8 → 9
**Blocking 10:** fan.html will be polished but it's a new surface. The first version always has rough edges that user testing reveals. A second iteration pass after real use reaches 9. A 10 requires multiple iteration cycles.
**Research:** N/A
**Pre-build:** Steps 46–54 (fan.html design decisions)
**Build:** Steps 16–30 (fan dashboard build)
**Ceiling:** 9. First build plus one iteration.

---

### 8–9. Copy & CTA — 7 → 8 → 10
**Blocking 10:** Fan-facing copy is minimal and correct right now. New copy (fan dashboard, activation emails, Close Circle ask) needs to be written to the same standard.
**Research:** Close Circle pricing (copy templates), Magic link auth (email templates)
**Pre-build:** Steps 64–74 (all copy written before build)
**Build:** Steps 42–43 (Close Circle copy), Steps 17–22 (fan dashboard copy)
**Ceiling:** 10. Copy decisions made in advance + compliance check = achievable.

---

### 10. Feature completeness — 3 → 8 → 9
**Blocking 10:** fan.html will be built to spec. A 10 would require Close Circle, notifications, fan social graph (following other fans) — some of which are Phase 2+.
**Research:** Fan retention (which features actually drive return visits)
**Pre-build:** Step 29 (scope decision — what's v8 vs post-v8)
**Build:** Steps 16–38 (fan dashboard + activation)
**Ceiling:** 9. Phase 2+ features (fan social graph, notifications) are beyond current scope.

---

### 11. Data control — 3 → 7 → 9
**Blocking 10:** Fan data control requires: clear privacy policy, one-click unsubscribe, ability to delete account and all data, ability to see what data is held. GDPR-compliant by design.
**Research:** Magic link auth (unsubscribe in email templates)
**Pre-build:** Step 12 (privacy policy), Step 13 (GDPR opt-out)
**Build:** Steps 12–14 (privacy, GDPR, data export)
**Ceiling:** 9. A 10 requires legal review of the privacy policy — which is outside this build.

---

### 12. Emotional resonance — 6 → 8 → 9
**Blocking 10:** The concept of "direct artist relationship, no algorithm" is powerful. The emotion peaks when the fan uses the dashboard and sees an update from an artist they care about that they would have missed on Instagram. That emotion requires real data — a real artist who posted something real.
**Research:** Close Circle pricing (belongingness and identity psychology), Fan retention
**Pre-build:** Step 20 (what makes fans feel close), Step 74 (signature copy moments)
**Build:** Steps 47–48 (early access, first ticket access — the moments that make closeness feel real)
**Ceiling:** 9. A 10 requires the platform to have enough artists that the feed is consistently interesting.

---

### 13. Retention — 2 → 8 → 9
**The biggest fan gap.** The fan has no reason to return right now. The morning briefing concept is right — it needs to be built and then tested in real conditions.
**Research:** Fan retention (Today strip triggers, the 60-second briefing concept)
**Pre-build:** Steps 46–48 (Today strip, following feed, Discover — all defined before build)
**Build:** Steps 17, 31–32 (Today strip + event-triggered activation emails)
**Ceiling:** 9. Daily habit formation requires weeks of real use with real artist activity.

---

### 14. Discovery — 2 → 8 → 9
**Blocking 10:** The Discover section (Emerging / Connected / By vibe / Near me) is designed correctly. A 10 would require the "Connected" tab — "artists followed by artists I follow" — which requires a fan social graph that's Phase 2.
**Research:** Non-algorithmic discovery (Discover section architecture)
**Pre-build:** Step 48 (Discover section spec)
**Build:** Step 22 (Discover section)
**Ceiling:** 9. "Connected" tab requires social graph, Phase 2.

---

### 15–20. Trust, support, integration, empty states, identity, coherence
**Summary:** These all follow the pattern above. Trust and empty states reach 10 through engineering (privacy policy, GDPR, specific zero states). Fan identity and coherence reach 9 — the final point requires real use and iteration.

**Fan identity specifically:** The fan currently has no visible presence in the product. Close Circle ("you've been in Jordan's close circle since October") and the longitudinal relationship display begin to give fans an identity. A 10 requires a fan social graph — following other fans, being seen as a committed listener. Phase 2.

---

## FAN SUMMARY

| Aspect | Now | Vision | Ceiling | Fixable by code? |
|---|---|---|---|---|
| First impression | 6 | 7 | 8 | No — filtered through artist |
| Onboarding | 4 | 8 | 9 | Mostly — email delivery outside control |
| Time to value | 9 | 9 | **10** | **Yes — performance audit** |
| Core job | 4 | 8 | 9 | Mostly — needs real artist activity |
| Navigation | 5 | 8 | 9 | Mostly — needs user feedback |
| Mobile | 8 | 9 | **10** | **Yes — extend existing system** |
| Visual polish | 6 | 8 | 9 | Mostly — needs iteration pass |
| Copy & voice | 7 | 8 | **10** | **Yes — pre-write all copy** |
| CTA clarity | 7 | 8 | **10** | **Yes — build + Playwright audit** |
| Feature completeness | 3 | 8 | 9 | Mostly — Phase 2+ beyond scope |
| Data control | 3 | 7 | 9 | Mostly — needs legal review |
| Emotional resonance | 6 | 8 | 9 | No — needs real artist activity |
| Retention | 2 | 8 | 9 | Mostly — habit needs real use |
| Discovery | 2 | 8 | 9 | Mostly — social graph is Phase 2 |
| Trust signals | 6 | 8 | **10** | **Yes — privacy + GDPR** |
| Support/monetisation | 7 | 8 | 9 | Mostly — needs real transaction data |
| Cross-platform links | 8 | 8 | **10** | **Yes — audit + fix** |
| Empty states | 4 | 7 | **10** | **Yes — write + implement** |
| Fan identity | 2 | 7 | 8 | Mostly — social graph Phase 2 |
| Coherence | 3 | 8 | 9 | Mostly — needs real use to validate |

**Achievable 10s through code: 6 out of 20**
**Hard ceiling (real-world / Phase 2): 9 out of 20**
**Realistic post-v8 fan score: 172/200 (86%)**

---

## FREELANCER JOURNEY

### Structural note
The freelancer layer is currently 0% built. The scores below are honest assessments of what a first build can achieve.

| Aspect | Now | Post-build ceiling | Fixable by code? |
|---|---|---|---|
| First impression | 1 | 8 | Mostly — word-of-mouth acquisition can't be designed |
| Onboarding | 1 | **10** | **Yes — clear spec exists, build it** |
| Time to value | 1 | 9 | Mostly — credit links need active artists |
| Core job (profile + bookings) | 1 | **10** | **Yes — build freelancer.html to spec** |
| Navigation | 1 | 9 | Mostly — simpler than artist, but needs testing |
| Mobile | 5 | **10** | **Yes — same design system** |
| Visual polish | 5 | **10** | **Yes — same design system** |
| Copy & voice | 4 | **10** | **Yes — research provides copy templates** |
| CTA clarity | 1 | **10** | **Yes — Book me / Listen to work is clear** |
| Feature completeness | 1 | 9 | Mostly — freelancer tiers Phase 2 |
| Data control | 2 | 9 | Mostly — same Supabase + GDPR work |
| Emotional resonance | 8 | 9 | Mostly — "the work speaks" needs real credits |
| Retention | 3 | 8 | Mostly — booking enquiries need real volume |
| Discovery | 8 | **10** | **Yes — credit link mechanism, build it** |
| Trust signals | 3 | 9 | Mostly — peer-confirmed credits need critical mass |
| Upgrade path | 2 | 7 | No — freelancer tier model not designed |
| Platform integration | 2 | 8 | Mostly — SoundCloud/Vimeo embeds |
| Empty states | 1 | **10** | **Yes — write copy + implement** |
| Identity expression | 4 | **10** | **Yes — role tag + vibe system** |
| End-to-end coherence | 3 | **10** | **Yes — credit → profile → booking is a closed loop** |

**Achievable 10s through code: 9 out of 20**
**Hard ceiling: 9 out of 20**
**Realistic post-v8 freelancer score: 176/200 (88%)**

---

## THE HONEST GAPS — THINGS THAT CANNOT BE ENGINEERED TO 10

These aspects have hard ceilings below 10 that no amount of code fixes:

| Aspect | Why it can't be 10 |
|---|---|
| Artist first impression | Requires real social proof from real named artists |
| Artist time to value | First fan sign-up is an external event |
| Artist discovery | Network effects require critical mass of users |
| Artist upgrade path | Requires testimonials from real Pro users |
| Fan first impression | Filtered through artist page, not ABLE's own surface |
| Fan onboarding | Email delivery (spam) is outside ABLE's control |
| Fan retention | Daily habit requires weeks of real use with real data |
| Fan discovery | "Connected" tab requires social graph (Phase 2) |
| Fan data control | Legal review of privacy policy required |
| Fan emotional resonance | Requires real artist activity in the platform |
| Freelancer first impression | Word-of-mouth acquisition can't be designed |
| Freelancer upgrade path | Freelancer tier model not yet designed |
| Freelancer trust signals | Peer-confirmed credits need critical mass to be compelling |

**Summary: 13 aspects across all three personas have real-world ceilings. 47 aspects are achievable at 10 through code, design, and copy alone.**

---

## WHAT THE PRE-BUILD 100 STEPS MUST CLOSE

Mapping the gaps back to the pre-build steps:

| Gap | Pre-build step that closes it |
|---|---|
| Copy for all new features | Steps 64–74 — all copy written before build |
| Fan dashboard architecture | Steps 46–54 — every section defined |
| Freelancer profile architecture | Steps 55–63 — every section defined |
| Supabase schema | Step 77 — every table, every column |
| RLS policies | Step 78 |
| Email architecture | Step 79 |
| Event taxonomy | Step 81 |
| Attribution params | Step 82 |
| Stripe architecture | Step 83 |
| Performance budgets | Steps 86–87 |
| Freelancer tier model | Step 63 (decide scope) + Step 99 (V8_BUILD_AUTHORITY) |
| Scope boundary (v8 vs Phase 2) | Step 29, Step 90 (done criteria), Step 99 |
| V8_BUILD_AUTHORITY.md | Step 99 — resolves everything; nothing starts without it |

---

## THE SINGLE MOST IMPORTANT INSIGHT

The scores that can't reach 10 through code share one characteristic: **they require other people**. Social proof, real fan activity, word-of-mouth, critical mass, real booking enquiries — these are network effects and organic growth dynamics. They cannot be engineered. They can only be earned by shipping something real and letting real people use it.

The right framing is: **build to the 9 ceiling as fast as possible. Get real people using it. The final point on each aspect comes from them, not from you.**

Everything in the 100 pre-build steps and 100 build steps is in service of shipping fast enough that the real-world dynamics can begin.
