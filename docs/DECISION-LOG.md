# ABLE — Decision Log
**Created: 2026-03-16 | Purpose: prevent relitigating resolved decisions.**

When a build agent or collaborator asks "why is this designed this way?" — this document answers it. Every entry records what was decided, why, and what was rejected. Entries marked LOCKED do not get reopened without a specific product reason and explicit authorisation.

---

## Magic link auth only (no Google/Apple OAuth)

**Date:** 2026-03-13
**Decision:** ABLE uses magic link (passwordless email) as the only auth method. No Google OAuth, no Apple Sign In.
**Why:** ABLE's user base is artist-type personalities (INFP, INFJ, ISFP — see `COPY_AND_DESIGN_PHILOSOPHY.md`). These users are allergic to anything that feels corporate or tracking-adjacent. Google/Apple OAuth implies data-sharing with those platforms. Magic link is private, trust-preserving, and has no third-party auth dependency. It also aligns with the artist/label audience's slight technical distrust of large platforms. A magic link email is also a point of contact ABLE already owns — it builds the habit of checking for ABLE emails, which matters when broadcast features ship.
**What was rejected:** Google OAuth (adds Google as an implicit third party, reads as "another tech company collecting data"), Apple Sign In (iOS-only, excludes Android artists, and Apple's privacy prompts create uncertainty at sign-in), username/password (too much friction and requires password reset flows that are never done well).
**Status:** LOCKED

---

## localStorage first (no Supabase at launch)

**Date:** 2026-03-13
**Decision:** Phase 1 launches with localStorage as the data layer. Supabase is the v1 backend migration target, not a day-1 requirement. All localStorage keys map 1:1 to Supabase table rows.
**Why:** The fastest path to a working, testable, shippable product is zero backend dependency. A localStorage-first product can be deployed as a static file with no server. Every localStorage key is already named and structured to mirror the Supabase schema, so the migration is a flush-to-API call, not a schema redesign. This decision also reduces the blast radius of early mistakes — bad data in localStorage hurts one user, not the entire database.
**What was rejected:** Building Supabase from day one (adds infrastructure complexity, auth dependency, and deployment requirements before the product is validated), Cloudflare D1 (architecturally valid v2 migration path — not the v1 target per `V6_BUILD_AUTHORITY.md` §2.12).
**Status:** LOCKED — do not rename localStorage keys. The 1:1 mapping is load-bearing.

---

## "dashboard" is a banned word in user-facing copy

**Date:** 2026-03-13
**Decision:** The word "dashboard" never appears in visible UI copy on any ABLE page — not in page titles, navigation labels, admin screen headers, or any user-facing text.
**Why:** "Dashboard" is SaaS vocabulary. It implies metrics, KPIs, management tooling — the language of corporate software. ABLE's users are artists, not marketing managers. Using "dashboard" makes the admin feel like it belongs to a different product. The admin home screen is simply "Home" or carries no label at all. This is a subtle but significant signal to the artist: "you are not being managed here."
**What was rejected:** "Dashboard" as a navigation label (common in Linktree, Later, and similar tools — we are not those tools), "Control panel" (worse — even more corporate), "Your stats" as the admin home title (reductive — the admin is more than stats).
**Status:** LOCKED

---

## Single accent colour system (not multi-accent)

**Date:** 2026-03-13
**Decision:** Each artist's page uses one accent colour, controlled by a single CSS custom property (`--color-accent`). The entire visual brand of the page — CTAs, borders, glows, state chips, pills — derives from that one variable.
**Why:** More than one accent colour per artist page creates visual noise. Artists are not graphic designers — asking them to manage a multi-colour system adds cognitive load at the exact point we want zero friction. One variable means one decision, and the result is a page that always feels coherent. The vibe system (7 genre presets) provides a sensible default for that single variable, with full artist override.
**What was rejected:** Two accent colours (primary + secondary — doubles the decision without doubling the value), a colour palette picker (overwhelming, wrong moment for that level of design tooling), no colour control at all (ABLE pages would look identical — the accent is the most powerful differentiator between profiles).
**Status:** LOCKED

---

## 4 campaign states (not more, not fewer)

**Date:** 2026-03-13
**Decision:** The page state machine has exactly four states: `profile`, `pre-release`, `live`, `gig`. No fifth state.
**Why:** Four states cover the complete lifecycle of an active artist: existing as a presence (profile), building anticipation for a release (pre-release), capitalising on a release moment (live), capitalising on a show moment (gig). Every scenario an independent artist encounters fits one of these four. Adding a fifth state (e.g., "tour mode", "hiatus", "collab") would require UI complexity that outweighs the value for 95% of users. The states auto-switch based on dates, so the system stays accurate without artist management overhead.
**What was rejected:** More states (tour mode — gig mode covers individual show promotion; "hiatus" — profile state covers dormancy; "collab" — not a campaign state, it's an artist relationship), fewer states (no gig mode — loses the highest-converting live show use case; no pre-release — loses the single highest-intent moment for fan sign-ups).
**Status:** LOCKED

---

## Fan list cap at 100 on free tier

**Date:** 2026-03-13
**Decision:** Free tier artists can capture up to 100 fan email sign-ups. At 95 fans, a progress bar and specific nudge appear. At 100, the sign-up form stops accepting new fans and a specific upgrade message is shown.
**Why:** 100 is enough to prove the value of ABLE's fan capture (a new artist seeing 100 real sign-ups understands immediately what they have), but it creates genuine scarcity. The 100-fan limit is the highest-intent upgrade trigger — an artist at capacity is an artist whose page is working. They know what they're losing by not upgrading. The copy at this moment is critical: "Your list is full. These are 100 people who asked to hear from you. Don't leave them waiting." — this is empathy, not lock-out.
**What was rejected:** 50 fans (too low — many artists would hit this before the value is proven), 250 fans (too high — reduces upgrade urgency at the most valuable moment), unlimited free (removes the clearest upgrade trigger; Linktree's free plan limitation is a known conversion driver).
**Status:** LOCKED

---

## 0% cut on support payments (Stripe fee only)

**Date:** 2026-03-13
**Decision:** ABLE takes 0% of artist support pack transactions. The artist receives the full payment minus Stripe's standard processing fee (1.4% + 20p for UK cards).
**Why:** Trust. This is the single most trust-building financial decision ABLE can make. Competitor platforms take 5–20% of creator revenue. ABLE's position is explicitly anti-intermediary. Taking a cut on support payments would undermine every other brand message on the platform. The business model is subscription, not transaction revenue. This also removes the ethical complexity of ABLE profiting from fan generosity directed at artists. The copy is explicit about this on the profile, the landing page, and the admin setup flow: "0% taken by ABLE. Stripe standard fee only."
**What was rejected:** 5% platform fee (standard for Patreon-style platforms — conflicts directly with ABLE's brand positioning), 0% with a small monthly add-on for support features (too complex; the simplicity of "0%" is the message), no support payments at all in v1 (this feature is too high-value for artist trust to defer).
**Status:** LOCKED

---

## "ABLE" in all caps (not "Able" or "able")

**Date:** 2026-03-13
**Decision:** The brand name is always written "ABLE" — all capitals, no exceptions in brand copy.
**Why:** All-caps treatment signals a proper noun with confidence. "Able" looks like an adjective. "able" looks like a mistake. "ABLE" reads as a name. This is consistent with how music-industry brands operate (AWAL, LANDR, ISRC — the industry uses acronym-style caps for platform names). It also shortens the visual footprint of the word while increasing its legibility as a brand mark.
**What was rejected:** Title case "Able" (looks like a common word, not a brand name), lowercase "able" (looks unfinished or stylised in a way that doesn't match the premium positioning).
**Status:** LOCKED

---

## Pricing in £ GBP (not $ USD first — UK launch)

**Date:** 2026-03-13
**Decision:** All prices on landing.html and in the product are shown in £ GBP. USD pricing is Phase 2.
**Why:** ABLE launches in the UK. The founder is UK-based, the initial artist community is UK-based, and the Stripe account is configured for GBP. Showing USD prices to UK artists creates immediate friction and questions about currency conversion. Launching in one currency and doing it right is better than launching in two and handling both badly. The £/$ conversion is straightforward when USD pricing is added.
**What was rejected:** Dual-currency display at launch (adds Stripe complexity and UI complexity before the product is validated), USD first (wrong market, wrong default).
**Status:** LOCKED for v1. Revisit for US launch.

---

## No "Most popular" badge in pricing

**Date:** 2026-03-13
**Decision:** No tier in the pricing table carries a "Most popular" badge, "Recommended" label, or any equivalent visual indicator.
**Why:** Every SaaS product does this. It is a known dark pattern — it implies social proof that the company doesn't have, creates artificial hierarchy, and talks down to the reader. ABLE's landing page copy is explicitly targeted at sceptical, intelligent, independent artists. An artist who has used any SaaS product in the last 10 years recognises this badge as a manipulation. Showing it would break the trust the rest of the page is working to build. The pricing headline "Start free. Stay if it works." already communicates the right hierarchy: start free, upgrade if the value is real.
**What was rejected:** "Most popular" badge on the Artist tier (the standard Linktree/Beacons approach — wrong for ABLE's positioning), "Best value" badge on the Pro tier (same pattern, different words).
**Status:** LOCKED

---

## The ✦ symbol (not ✧ or ★)

**Date:** 2026-03-13
**Decision:** ABLE's decorative star/sparkle symbol is ✦ (U+2726, Black Four Pointed Star), not ✧ (White Four Pointed Star) or ★ (Black Star) or any other variant.
**Why:** ✦ is compact, geometric, and works at small sizes without becoming a blob. It reads as a premium accent rather than a rating (★) or a generic sparkle (✧). It is used sparingly — as a decorative mark in the "Made with ABLE" footer and in brand contexts, not as a content element. Its four-pointed form subtly echoes the four campaign states.
**What was rejected:** ★ (too associated with reviews and ratings — wrong connotation), ✧ (open form — lighter and less assertive than ABLE's visual register), ⚡ and other emoji (too casual for the premium register).
**Status:** LOCKED

---

## Font: DM Sans body + Barlow Condensed display (not other pairings)

**Date:** 2026-03-13
**Decision:** Artist profile (able-v7.html) uses DM Sans for body text and Barlow Condensed 700 for display (artist name, section headers, release titles). Admin (admin.html) uses Plus Jakarta Sans for body text and Barlow Condensed for display.
**Why:** DM Sans is a humanist grotesque that reads as warm but not soft — exactly right for a music platform. It is not a cold geometric (not Inter). Barlow Condensed at 700 weight reads as poster confidence — it is the font of a venue marquee and a concert bill, which is exactly what an artist name needs. The combination earns authority without being aggressive. Plus Jakarta Sans on admin is slightly more businesslike, which reinforces the "backstage" feel of the admin surface.
**What was rejected:** Plus Jakarta Sans as the profile body (correct for admin, too businesslike for fan-facing context — resolved in `V6_BUILD_AUTHORITY.md` §2.11), Nunito as a display alternative for Pop vibe (too soft — resolved ibid. §2.9), Inter (cold and generic — ABLE needs warmth), custom or variable fonts (payload cost at ABLE's target HTML budget).
**Status:** LOCKED

---

## No Google/Facebook tracking pixels (privacy-first analytics)

**Date:** 2026-03-13
**Decision:** ABLE does not embed Google Analytics, Google Tag Manager, Facebook Pixel, or any third-party tracking script on artist pages (able-v7.html). Analytics are first-party only, stored in localStorage and synced to Supabase.
**Why:** An artist's fan-facing page should not hand data about their fans to Google or Meta. That data belongs to the artist, not to a third-party ad network. ABLE's analytics spec (`docs/systems/analytics/`) provides all the meaningful first-party data an artist needs: page views by source, CTA clicks by type, fan sign-up rate. Artists who understand what ABLE does not do (track fans for ad targeting) trust it more, not less. This is a concrete differentiator against Linktree and Beacons, which both embed third-party analytics by default.
**What was rejected:** Google Analytics (useful but hands fan data to Google — wrong for the brand), Facebook Pixel (immediately disqualifying for the artist audience's values), PostHog with cloud storage (Phase 2 option — self-hosted PostHog is on the roadmap), Mixpanel (same concerns as GA).
**Status:** LOCKED for v1. Self-hosted PostHog is the planned v2 addition.

---

## 14-day "live" window after release before reverting to profile state

**Date:** 2026-03-13
**Decision:** After a release date is reached, the page stays in `live` state for 14 days, then automatically reverts to `profile` state.
**Why:** The week after a release is the highest-traffic, highest-intent moment for an artist. Maintaining `live` state for 14 days captures the long tail of discovery (people who saw a review or recommendation a week after release) without leaving the page stuck in "release mode" forever. 14 days is based on how long a new release typically stays in "new release" editorial placement on streaming platforms. After 14 days, the release is no longer "news" — it becomes part of the catalogue, which is what `profile` state represents.
**What was rejected:** 7 days (too short — misses discovery traffic from slower-moving publications), 30 days (too long — an artist with multiple releases would have overlapping live windows creating state confusion), no auto-revert (requires the artist to manually reset the state — most won't, leaving stale "out now" states indefinitely).
**Status:** LOCKED
