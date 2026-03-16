# ABLE CRM — Analysis
**Created: 2026-03-16 | System score: in progress**

---

## The core question: build vs buy

### Off-the-shelf CRM options for musicians

| Tool | Cost | Music-specific? | Artist data ownership | Notes |
|---|---|---|---|---|
| Mailchimp | £0–£300/mo | No | Partial — list is portable but context is not | Generic email tool. Artists find it impersonal, clunky, and entirely the wrong register. The UI assumes a marketing team, not an independent musician. |
| Kit (formerly ConvertKit) | £9–£100/mo | Somewhat | Yes | Popular with creators in general. Not music-moment-aware. No concept of a release campaign, gig mode, or pre-save window. Treats all sign-ups as interchangeable. |
| Customer.io | £100+/mo | No | Yes | Developer-friendly and genuinely powerful for behavioural automation. Way too complex and expensive for independent artists. Would require an engineer to operate effectively. |
| Beehiiv | £0–£40/mo | No | Yes | Newsletter-first tool. No artist page, no campaign states, no music moments. The product assumes you want to grow a publication, not manage a fan relationship. |
| HubSpot | £0–£2000+/mo | No | Partial — locked features at scale | Enterprise CRM designed for sales teams. Wrong in every dimension: wrong vocabulary, wrong UX assumptions, wrong price tier, wrong relationship model. |
| Mailerlite | £0–£50/mo | No | Yes | Simpler than Mailchimp, cheaper, still generic. Newsletter-forward. No artist context, no campaign integration. |
| Brevo (Sendinblue) | £0–£80+/mo | No | Yes | Transactional + marketing hybrid. Used mainly by e-commerce. No concept of artist identity or fan relationship. |

---

### The fundamental problem with all off-the-shelf CRMs for ABLE

None of them know what a "release", a "gig mode", or a "pre-release countdown" is.

A fan who signed up from a TikTok reel the day before a single drop is not just an "email subscriber." They are a moment-specific relationship. They arrived at a particular point in the artist's story. The context of that arrival — which release was active, which campaign state the page was in, where they came from, whether they went on to pre-save — is the data that makes the relationship meaningful. That context is lost in any generic CRM the moment the export CSV is imported.

When an artist imports their fans into Mailchimp, they become a flat list. No one in that tool knows that 47 of those people signed up during the Midnight EP pre-release week, or that 12 signed up the night of the Oslo show when gig mode was on. That narrative is gone.

**ABLE's CRM is not a fan list manager. It is a relationship ledger that knows the story of how every fan arrived.**

No off-the-shelf tool can do this without custom integration work that would cost more than building the CRM natively — and would still not be as well-integrated with the artist's page states.

---

### The integration argument

Even if an artist was willing to accept the context loss, integration with an external CRM would require:

1. A webhook pipe from fan sign-ups on able-v7.html to the third-party CRM
2. Custom fields on every subscriber record to capture `campaignState`, `releaseId`, `source`
3. The artist to learn and manage a second tool with a different UX and vocabulary
4. The third-party tool to remain in sync with ABLE's page states in real time
5. ABLE to maintain API credentials for every CRM provider each artist uses

This is untenable. The CRM must be native.

---

### Verdict: ABLE builds a custom, music-native CRM

The fan CRM is not a feature of ABLE. It is one of the two core value propositions of the product (alongside the campaign-aware profile page). It cannot be delegated to Mailchimp without destroying the reason artists would choose ABLE over a free Linktree + Mailchimp combination.

The CRM is the moat. It is music-native because it is embedded in a music-native page. The two cannot be separated.

---

## Current CRM score: audit of admin.html

Scored against 10 dimensions of fan management capability. Based on actual code audit of admin.html (current build, 2026-03-16).

### 1. Fan record completeness — 5/10

**What exists:** `{ email, ts, source, confirmed }`. The `source` field is captured (ig, tt, sp, direct), timestamp is stored, and confirmation status is tracked.

**What is missing:** `name` (optional, artist-added), `optIn` (marketing consent flag — the `optIn` field exists in the data spec but is not consistently captured at sign-up), `consentMethod`, `jurisdiction`, `double_opted_in`, and critically: `campaignState` at sign-up (what state was the page in when this person joined?). The fan record has no music context whatsoever beyond the raw source. Two fans who both came from Instagram are indistinguishable — one could have signed up during pre-release, one during gig mode, but the record treats them identically.

---

### 2. Fan segmentation — 4/10

**What exists:** Filter pills on the Fans page (All / Instagram / TikTok / Spotify / Direct). Source-based filtering works. The stat strip shows total, this week, and social percentage.

**What is missing:** Date-range filtering, campaign-state filtering ("fans who signed up during pre-release"), level filtering, starred-only view, or any combination of the above. Segments are single-dimension and source-only. There is no concept of "fans who signed up during my Vortex campaign."

---

### 3. Fan tagging / levelling — 2/10

**What exists:** The `exportFans()` function hardcodes `level: 'listener'` for all fans in the CSV export — meaning levels exist as a concept in the export format but are entirely fictional. No actual level is ever set on any fan record. There is no UI to assign a level to a fan. The `able_starred_fans` key (a separate string array) provides a binary starred state, but it is explicitly marked as deprecated in the data architecture spec (to be migrated to `Fan.isStarred`).

**What is missing:** Any real level system (core / supporter / fan / listener). Tags. The ability to distinguish between a casual one-time visitor who signed up and a fan who comes back repeatedly.

---

### 4. Fan search — 6/10

**What exists:** A working search input that filters the fan list by email in real time. Local, instant, functional.

**What is missing:** Search by name (the `name` field is not captured), search by tag, search by note. Fuzzy matching — the search is a simple `includes()` substring check, not full-text. Acceptable at V1 scale (< 500 fans in localStorage) but will need Supabase full-text when scale increases.

---

### 5. Export (CSV) — 6/10

**What exists:** Two export mechanisms: a data URI export button on the Fans page (exports Email, Source, Joined from the rendered list) and an `exportFans()` function (exports Email, Level, Source, Joined). Both work. The export is always available regardless of tier — correctly implemented per the 0% lock-in principle.

**What is missing:** The export currently includes only 3–4 fields. A complete export should include: starred status, opt-in status, name (if known), tags, notes, campaign state at sign-up, and confirmed status. The `level` column in the current export is hardcoded as `listener` for everyone — this is misleading. The export is functional but thin.

---

### 6. Fan contact (individual) — 2/10

**What exists:** The fan detail sheet (opened by tapping a fan row) shows a "Send a message" button that is disabled and tier-gated behind an "Artist" badge overlay. It exists as a visual prompt but does not function.

**What is missing:** Any actual mechanism to email an individual fan directly from within ABLE. This requires Resend integration, which is spec'd in the email system but not yet wired to individual fan contact. At present the artist's only option is to copy the fan's email manually and send from their own email client.

---

### 7. Broadcast (email all fans) — 3/10

**What exists:** A "Send to fans" page (`page-broadcast`) exists in admin.html. It has a compose area and a disabled "Send to fans" button gated behind the Pro tier. The Netlify function `fan-confirmation.js` handles confirmation emails (fan → artist direction), and the email spec defines a release reminder broadcast and a gig reminder broadcast.

**What is missing:** The broadcast function itself is not wired. The artist cannot send a broadcast from the current build. The compose UI exists but is non-functional. The rate limiting logic, audience selection (all vs segment), and the send-to-Resend pipe are all unbuilt. This is correctly Phase 2 / Artist Pro.

---

### 8. Automation (welcome email, milestone emails) — 4/10

**What exists:** `netlify/functions/fan-confirmation.js` — the fan confirmation email is built and specced. It is campaign-state-aware: the email body changes based on whether the artist was in profile / pre-release / live / gig mode when the fan signed up. This is the most music-native part of the current email system and is genuinely differentiated. The artist welcome email (Email 2 in the email spec) is specced but its Netlify function trigger is unclear from the build state.

**What is missing:** The fan confirmation email is specced to include the page state context — but `page_state` must be passed from able-v7.html at sign-up time, and the current fan record in localStorage does not capture `campaignState`. There is a spec-to-code gap here. Milestone emails (fan joins → artist is notified) do not exist. A "Day 7" check-in email to artists (one of the most impactful retention tools for early-stage products) is not built.

---

### 9. GDPR compliance — 5/10

**What exists:** The "Remove from list" button in the fan detail sheet deletes the fan from localStorage — this is a functional right-to-erasure implementation for the localStorage phase. The fans page shows "These emails are yours. ABLE never contacts your fans without your permission." The data architecture spec documents the `optIn` and `unsubscribedAt` fields as required additions.

**What is missing:** `optIn` is not consistently set to `true` at sign-up in the current build (the fan sign-up form in able-v7.html needs to explicitly write this). There is no `consentMethod` or `jurisdiction` field. The GDPR subject access request flow (export all data for a specific email) does not exist. The fan confirmation email includes an unsubscribe link (via Resend), but the webhook handler for unsubscribe → remove from `able_fans` is not wired. The `able_starred_fans` separate key is a GDPR gap — if an artist deletes a fan, their email remains in the starred list.

---

### 10. Music-context awareness — 2/10

**What exists:** Source tracking (ig / tt / sp / direct / qr) — this is the only music-adjacent context. The source breakdown bars show the artist where their fans are coming from in terms of platform origin.

**What is missing:** This is the most critical gap in the current CRM. No fan record stores which campaign state the artist was in at sign-up. No fan record stores which release was active. No fan record stores whether the fan pre-saved (click event exists separately but is not joined to the fan record). The fan confirmation email is specced to be campaign-state-aware, but the `page_state` token must be passed through and it is not currently captured in the persistent fan record. The CRM has no memory of musical moments — it only knows where a fan came from socially, not where they arrived in the artist's story.

---

### Overall current CRM score: 4/10

| Dimension | Score |
|---|---|
| 1. Fan record completeness | 5/10 |
| 2. Fan segmentation | 4/10 |
| 3. Fan tagging / levelling | 2/10 |
| 4. Fan search | 6/10 |
| 5. Export (CSV) | 6/10 |
| 6. Fan contact (individual) | 2/10 |
| 7. Broadcast (all fans) | 3/10 |
| 8. Automation (welcome / milestone) | 4/10 |
| 9. GDPR compliance | 5/10 |
| 10. Music-context awareness | 2/10 |
| **Overall** | **3.9 → 4/10** |

---

### Why 4/10 is not a crisis

The foundation is sound. The fan list renders correctly, source filtering works, starred fans work, export works, search works, and the data architecture is spec'd cleanly for migration to Supabase. The biggest gaps (music-context awareness, levelling, individual contact) are structural additions, not redesigns. The path to 7/10 is achievable within the localStorage phase without a backend.

The 4/10 is honest. A product that claims fan relationship management but captures `{ email, ts, source }` and nothing about the moment the fan arrived is only partially delivering on the promise. The good news is that the moment ABLE captures `campaignState` at sign-up, the differentiation from every off-the-shelf tool becomes concrete and visible.
