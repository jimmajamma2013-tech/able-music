# ABLE — Competitive Positioning Analysis
**Date: 2026-03-16**
**Status: Active — review quarterly**
**Author: Competitive Intelligence v1**

---

## Scoring key

Each dimension is scored on a 0–10 scale relative to primary competitors:
Linktree, Beacons, Big Link (Linkfire), LayloFM.

Score reflects ABLE's *current* advantage, not aspirational positioning.

---

## 1. Product clarity

**Score: 7/10**

The internal product truth is extremely clear: a conversion profile where the fan relationship belongs to the artist. In one sentence: "Your fans, your emails, your relationship — on a page that looks like your world."

The gap: ABLE's clarity lives in the docs and in the team's heads. It is not yet consistently expressed on landing.html. The phone mockup does this job partially — but the headline copy must do more work.

Competitors' clarity:
- Linktree: "Put all your links in one place." (9/10 clarity — brutally simple, even if limiting)
- Beacons: "Everything you need to monetise your audience." (6/10 — tries to do too much)
- Big Link: "The smarter music marketing link." (5/10 — vague, B2B tone)
- LayloFM: "Own your fan relationships." (8/10 — closest to ABLE's truth)

**ABLE's action:** Landing.html headline must match the internal product truth. The clarity is there. It needs to be on the page.

---

## 2. Artist-ownership angle

**Score: 9/10**

This is ABLE's deepest structural differentiator. The principle — the fan relationship belongs to the artist, not to the platform — is the reason the product exists (PRODUCT_TRUTH.md, §2). It is not a feature. It is an architectural decision.

- Linktree: **0/10** — fan emails go nowhere. No capture mechanism.
- Beacons: **4/10** — has email collection but the platform is the middleman.
- Big Link: **2/10** — designed for labels, not artist-owned relationships.
- LayloFM: **8/10** — most direct competitor on this dimension. Email-first, artist keeps the list.

ABLE's advantage over LayloFM: the export-any-time promise, zero platform cut on support income, and the explicit framing ("Your list. Your relationship."). The differentiator is architectural and philosophical simultaneously.

**Score is 9/10 not 10/10 because:** The advantage is real but currently unproven at scale. Until ABLE has a meaningful user base and a track record of artists successfully exporting their lists, the claim is aspirational.

---

## 3. Switching cost to ABLE

**Score: 5/10** (favourable — lower is better for acquisition)

Switching from Linktree to ABLE is genuinely low-friction:
- No data to migrate (Linktree artists have no fan data to bring — Linktree doesn't store it)
- Replace one URL in their bio
- Profile setup via start.html wizard takes under 5 minutes

The friction that does exist:
- Artists who paid for Linktree Pro mid-cycle may wait out the billing period
- Artists with heavily customised Linktree pages may be nervous about rebuild time
- Mental switching cost: "what I have works" inertia — the #1 barrier

**Switching cost actions for ABLE:** A "switching from Linktree" guide (see PATH-TO-10.md, P2) directly addresses the mental friction. The Spotify import feature (docs/systems/spotify-import/SPEC.md) reduces setup time and signals that ABLE understands music.

---

## 4. Switching cost from ABLE

**Score: 7/10** (favourable — higher means artists are retained)

Once an artist is on ABLE and has built a fan list, the switching cost is genuine:
- Their fan emails live in ABLE (accessible but not easily portable to most alternatives)
- Campaign state history, analytics, and CTA click data are ABLE-native
- Their profile design is built around ABLE's identity system — not portable to Linktree's template approach

The intentional exit valve: Artist Pro users can export fan list as CSV any time. This is a trust feature, not a churn driver. Artists who can leave are less likely to feel trapped — and more likely to stay.

**The honest tension:** ABLE's ownership positioning requires that leaving be easy. The export-any-time promise is genuine. The retention comes from value, not lock-in.

---

## 5. Design quality differential

**Score: 8/10**

Honestly assessed: ABLE's visual design is materially better than every primary competitor at the artist profile level.

- Linktree: Generic. The Linktree aesthetic is recognisable and that is the problem. Fans know they are on a link aggregator, not an artist's page.
- Beacons: More customisable than Linktree but still template-feeling. The design ceiling is visible.
- Big Link: Functional. Designed for metadata, not for feel. No visual ambition.
- LayloFM: Cleaner than Linktree but not music-culture native. Feels like a startup product.

ABLE's design advantage is structural, not cosmetic. The identity system (7 genre vibes, accent colour, Barlow Condensed display font, spring easing) means every profile *feels different* while following the same underlying grammar. A metal artist and a lo-fi bedroom producer get the same quality of execution, not the same look.

**Score is 8/10 not 10/10 because:** The design advantage requires the artist to actually set up their profile. A freshly created ABLE profile with no artwork or customisation looks less impressive than a well-worn Linktree. The wizard (start.html) must do enough that even an unmotivated artist ends up with something good.

---

## 6. Music-specific features

**Score: 10/10**

This dimension has no credible competition. No primary competitor has:

- **Page state system**: profile / pre-release / live / gig — auto-switching logic tied to release dates
- **Gig mode**: manual 24hr toggle that converts the entire profile to ticket-front, "on tonight" framing
- **Pre-release countdown**: real-time countdown with pre-save CTA
- **Release window**: automatic live-window mode for the 14 days post-release

Linktree has none of this. Beacons has none of this. Big Link has static links to streaming services. LayloFM has fan capture — but no campaign-aware page states.

This is the clearest, most specific answer to "why ABLE for musicians": the page knows what moment you are in. Linktree never will — it is not designed for it.

---

## 7. Price positioning

**Score: 7/10**

ABLE's free tier is strong. A fully functional profile, fan capture up to 100, basic stats, and one snap card. This is not a crippled demo — it is a working product.

Linktree comparison:
- Linktree Free: basic link page, no analytics, no fan capture — genuinely limited
- Linktree Starter: £5/mo — minimal analytics, basic customisation
- Linktree Pro: £8/mo — full analytics, custom domains, scheduling

ABLE positioning: replaces Linktree Pro (£8/mo) + a basic email tool (£10/mo) = £18/mo competitor spend, replaced by ABLE Artist at £9/mo. Net saving of £9/mo with more capability and artist ownership of the fan relationship.

**Score is 7/10 not higher because:** the value argument is strong but not yet communicated on landing.html clearly enough. Artists must do the maths themselves unless the comparison table is present and accurate.

Beacons comparison: Free tier with monetisation available (30% cut on tips/merch). ABLE's counter is zero revenue cut, which is structurally better for any artist earning through their page.

---

## 8. Network effects

**Score: 3/10 (current) — 7/10 (potential)**

ABLE has limited network effects today. A fan discovering ABLE via one artist's profile does not immediately benefit another artist. The platform is not a network — by design.

However, the embryonic network effects that do exist:
- **Freelancer discovery**: a producer credited on an artist's release card becomes discoverable — their profile accrues value from the artist's audience
- **Fan dashboard (fan.html)**: when a fan follows multiple ABLE artists, they get a single place for upcoming shows and new drops — the fan is now retained on the platform across artists
- **Directory potential**: as artist density grows, an ABLE directory becomes genuinely useful for music discovery (docs/reference/research/DISCOVERY_AND_GROWTH.md)

The honest score today is 3/10. The network effects are not functional at the current scale. This is not a weakness — ABLE does not need network effects to deliver value to its first 10,000 artists. But it is a constraint on the long-term defensibility story.

---

## Summary table

| Dimension | Score | Priority |
|---|---|---|
| Product clarity | 7/10 | Improve on landing.html |
| Artist-ownership angle | 9/10 | Maintain — core differentiator |
| Switching cost to ABLE | 5/10 | Favourable — reduce with guides |
| Switching cost from ABLE | 7/10 | Healthy — trust feature, not trap |
| Design quality differential | 8/10 | Maintain — wizard quality is the risk |
| Music-specific features | 10/10 | Protect — hardest to copy |
| Price positioning | 7/10 | Clarify comparison on landing.html |
| Network effects | 3/10 | Long-term investment, not immediate |

**Overall competitive position: strong for musicians, underdifferentiated in general market. ABLE must be the obvious choice for independent musicians — not a competitor to Linktree across all use cases.**

---

*Review date: 2026-06-16*
