# ABLE — Professional Ecosystem: Definitive Spec
**Created:** 2026-03-14
**Status:** ACTIVE — supersedes FREELANCER_SPEC.md and PROFESSIONAL_DISCOVERY.md where they conflict
**Authority:** This document makes final calls on all professional/credits/discovery/trust/enquiry decisions.

---

## Diagnosis: what was strong, what needed resolution

**Already strong:**
- The core insight: credits as discovery engine. The "IMDb for music" model. Work speaks before search.
- No ratings, no reviews, no price-first marketplace. The differentiation is clear.
- Discovery through quality trails, not browsing directories.
- "Work together" language over "hire" or "book".
- Peer-confirm trust model.

**What needed resolution:**
- Two docs in conflict: FREELANCER_SPEC.md used `profileType: 'freelancer'` (hard separation); PROFESSIONAL_DISCOVERY.md used `?mode=studio` URL (soft mode toggle). These cannot both be right.
- Portfolio section existed in FREELANCER_SPEC but was not in PROFESSIONAL_DISCOVERY — unclear if it's v1 or later.
- "Rate card" language survived despite "Working with me" being the correct replacement.
- Discovery still had a latent "search for professionals" feature that contradicts the credits-first principle.
- The enquiry form had "Your ABLE page" as a field — more elegantly handled as auto-detected if the enquirer is signed in.
- Industry cards (managers, agents) were described in detail but their v1 scope was never resolved.

**What prevents 10/10 today:**
The profile model split. Until that is settled, every other decision sits on an unstable foundation.

---

## 1. Final structural decision: the profile model

**The model: one profile, activated layers.**

There is no `profileType` field. There are no separate profile types. There is no `?mode=studio` URL parameter.

Every ABLE profile is one object. What renders is determined by which sections are active — not by a hard type assignment. This is the correct model because:

- Many people are both: producers who perform, singer-songwriters who mix for others. A hard type forces them to split their identity.
- `?mode=studio` is ephemeral and non-canonical. You can't bookmark the "right" version of someone's profile. URLs must be stable.
- Separate profile types require separate auth, separate admin, separate rendering code. One profile with configured sections is ~30% of the build.

**Two activation states (determined in onboarding, changeable in admin):**

| Activation | What renders |
|---|---|
| **Artist** | Artist hero (campaign states, artwork), Listen, Shows, World Map, Merch, Support, Fan capture |
| **Professional** | Professional hero (role, availability, enquiry CTA), Credits, "What I offer", "Work together" |
| **Both** | Artist hero leads. Professional section appears below Quick Actions, before Listen. |

**The hero is configured by which layers are active:**

- Artist-only: standard artist top card with campaign states
- Professional-only: name + role + availability chip + "Work together" CTA. Clean. No campaign states, no fan capture, no countdown.
- Both: artist hero leads (it is richer, more visual, more emotionally engaging). Professional info is a dedicated section with its own mini-hero: role + availability + "Work together" CTA — visible on scroll, before the music sections.

**URL:** Always `ablemusic.co/[handle]`. One URL. One identity. The profile is the person.

**In admin:** A single toggle — "I also offer professional services" — activates the professional layer. No separate account required.

---

## 2. V1 user model

**First-class v1 users:**

- Artists (with or without professional services)
- Music producers / beatmakers
- Mixing engineers, mastering engineers, recording engineers
- Songwriters (who write for others)
- Session musicians
- Music video directors, photographers

These users get full professional layer support in v1.

**Secondary — supported but not primary focus:**

- Artists looking for collaborators (passive discovery via credit trails — they don't need a special feature; the credit system serves them)
- Fans discovering who made the music they love (read-only — credits are public, profiles are public)

**Out of scope for v1:**

- Graphic designers, web developers (too generic, dilutes the music-native positioning)
- Managers, booking agents, A&Rs — industry card concept deferred to Phase 3
- Music journalists, PR people — not core
- Studios / production houses as team profiles — deferred

**The rule for who's v1:** If their primary work involves being credited on a music release, they're v1. If their work is downstream of that, they wait.

---

## 3. Credits as the engine

Credits are the structural backbone of professional discovery. They live on releases, aggregate on profiles, and form the navigable trust graph.

**The credit object (on a release):**

```json
{
  "role": "Mixed by",
  "name": "Jake Barlow",
  "ableHandle": "jakebarlow",
  "confirmed": true,
  "confirmedAt": "2026-05-01T10:00:00Z"
}
```

**How credits drive each outcome:**

**Trust:** A credit confirmed by both the artist and the professional carries more weight than one added by either alone. The trust is in the mutual agreement, not a third-party badge. Self-added credits show but are visually muted.

**Discovery:** Every confirmed credit on an ABLE release is a live link. Tapping the name navigates to the professional's profile. No search required. The fan or artist who cares enough to tap a credit is already a high-intent visitor.

**Profile growth:** Credits from across ABLE auto-aggregate on the professional's profile. A professional with 12 confirmed credits has a 12-item portfolio they never had to build. Every new artist who joins ABLE and credits them makes their profile stronger without any work from them.

**Recommendations:** "Artists I've worked with" is computed from confirmed credits. "Similar collaborators" is computed from professionals who share credits with overlapping artists. Both are automatic.

**Enquiry intent:** The enquiry form field "How did you find them?" auto-fills with the release context ("Through [Release] by [Artist]") when navigated from a credit. This gives the professional useful context before they respond. The credit trail that brought someone to their profile predicts what kind of project they might be bringing.

**The discovery loop:**

```
Release exists on artist profile
  → Release has credits list
  → Credits list shows: "Mixed by Jake Barlow ✓"
  → Tapping Jake's name → Jake's professional profile
  → Jake's profile shows all his confirmed credits across ABLE
  → "Artists I've worked with" shows the connected artists
  → "Similar collaborators" shows Tom (also mixes, worked with 3 of the same artists)
  → Enquiry CTA: "Work together"
  → Jake receives enquiry with release context
```

**What credits are not:**
- Not a job board. Credits are proof, not listings.
- Not a bidding system. Credits don't create competition.
- Not gamified. There is no "50 verified credits" badge. The credits themselves are the signal.

---

## 4. The v1 professional profile

### URL and identity

`ablemusic.co/[handle]` — same namespace as artist profiles. Handle is unique across both. A producer named Jake Barlow at `ablemusic.co/jakebarlow` has one profile, which may show artist content, professional content, or both depending on their configuration.

### Hero (professional-only or professional layer on combined profile)

```
[Name — display font, same system as artist profiles]
[Role — "Mix Engineer" / "Producer · Songwriter" / "Music Video Director"]
[City — optional, single line]
[Availability chip: ● Available / ◑ Selective / — Not taking projects]

[Work together →]
```

The hero is restrained. No campaign states. No countdown. No fan capture. Its job is to answer: who is this person, what do they do, and how busy are they?

**Availability chip:** Three states, set by the professional in admin, visible on their profile. It is not a booking calendar — it is an honest signal to manage expectations. No auto-expiry in v1 (deferred).

**Primary CTA: "Work together"** — one button, opens enquiry half-sheet. No secondary CTA cluttering the professional hero.

### Section order (professional-only profile)

```
1. Professional hero (name, role, location, availability, CTA)
2. Bio — 2–3 sentences, first person
3. Credits — auto-populated + self-added
4. Artists I've worked with — auto, from confirmed credits
5. Similar collaborators — auto, from shared credit graph
6. What I offer — optional free-form (2–3 sentences, not a pricing table)
```

### Section order (both layers active)

```
1. Artist hero (artwork, campaign state, CTAs)
2. Quick Action pills
3. [Professional section]
   — Role + availability + "Work together" mini-header
   — Credits (collapsed to 4, expandable)
4. World Map
5. Listen
6. Shows
7. Merch
8. Support
9. Fan capture
```

The professional section sits high — after Quick Actions, before Listen — because industry visitors and potential collaborators are the people who need it immediately, and they land on the profile with professional intent.

### Credits section

```
Credits
────────────────────────────────────────────────────
[Art]  Resonance · EP          Atlas Sound    ✓   Mix Engineer     2026
[Art]  Blue Coat · Single      Mara J.        ✓   Production       2026
[Art]  Strange Winter · EP     Oliver Ray          Mix Engineer     2025  ← unconfirmed, muted
[Art]  Chalk · Album           Chalk          ✓   Production       2025
       + 8 more credits
```

- Confirmed credits: full opacity
- Unconfirmed credits: 0.65 opacity on artwork, no ✓
- Collapsed to 4 by default, "Show all [N] credits" expands
- Tapping a credit → navigates to that artist's ABLE profile (at the release if possible)
- Credits from ABLE artist profiles auto-populate. Credits for artists not on ABLE: self-add only (no link, no art — shows artist name in text)

### What I offer (optional)

Free-form text block. Max 200 chars. The professional writes it in their own voice. Not a pricing table. Not a service menu.

Example:
> "I mix records that breathe. Indie, folk, alternative. I work remotely or from my studio in East London. Current rate: £200/track, EP packages available on request."

The professional controls whether this section shows. Default: hidden until they fill it in.

### What is excluded from v1 professional profiles

- Portfolio embeds (audio/video work samples) — deferred to Phase 2
- Rate card table (separate line items per service) — deferred to Phase 2
- Booking calendar integration — deferred
- Team profiles (studio with multiple members) — deferred
- Verified professional tier / paid badge — never (contradicts trust philosophy)
- Any ratings, reviews, or completion metrics — never

---

## 5. Discovery and recommendation system

### The single rule: credits before search

Discovery is powered by credit trails. There is no professional directory browse in v1. This is not a gap — it is the design. A directory implies competition. A credit trail implies trust.

When the graph is dense enough (Phase 3/4), a calm, selective directory may be added — but only as a secondary entry point, never the primary, and never with price sorting or ranking.

### Entry points (v1)

**1. Credits on release cards** — primary. The release card on any artist profile has a Credits section (collapsed by default, one tap to expand). Each confirmed credit is a live link. This is the highest-intent discovery path: the person has already heard the work.

**2. "Artists I've worked with" on professional profiles** — secondary. A professional's profile shows confirmed-credit artists as chips. Tapping one goes to that artist's profile, where the visitor may discover other professionals who worked on those releases.

**3. "Similar collaborators" on professional profiles** — secondary. Up to 4 professionals who share confirmed credits with overlapping artists. Computed automatically. No ranking — alphabetical. Provides "if you're looking at Jake, you might also look at Tom" without competitive energy.

**4. "People in my world" on artist profiles** — curated. The artist manually adds up to 8 people they want to surface. Can include producers, visual artists, other artists. This is editorial, not algorithmic. The artist decides what it says about them.

### "People in my world" (artist-curated)

```
People in my world
────────────────────────────────────────────
[Maya Beats] Producer      [Luca Romano] Mix
[Cass Winters] Video       [Olive] Artist
```

- Curated by the artist. Manual. Maximum 8 entries.
- Can link to ABLE profiles (professional or artist) or just show a name + role with no link.
- Artist chooses the section name from a short list of preset options, or writes their own (max 30 chars). Options: "People in my world" / "People I rate" / "People I make things with" / [custom]
- Never auto-populated from credits. Auto-population would make it a directory. Manual curation makes it a statement.
- Not reciprocal. Being listed does not obligate the listed person to list back.

### Recommendation clarity rules

Artists and professionals are never mixed in the same undifferentiated block.

| Surface | Recommendation type | Contents |
|---|---|---|
| Artist profile | "People in my world" | Curated mix — can be artists or professionals |
| Artist profile | "Artists you might like" | Artists only — existing system |
| Professional profile | "Artists I've worked with" | Artists only — auto from confirmed credits |
| Professional profile | "Similar collaborators" | Professionals only — auto from shared credits |
| Release card | "Made by" | Credits list — professionals and collaborating artists |

Every recommendation has a visible "why" — never a mystery block of faces.

---

## 6. Trust and verification

Three states. Visually quiet. The trust is in the proof itself.

### State 1: Self-added

Artist adds a credit for someone who doesn't have an ABLE profile, or professional adds a credit claiming a release. Shows normally on the professional's profile. Slightly muted artwork (0.65 opacity). No ✓. On the artist's admin view: "Pending confirmation" in small text — but fan-facing, the credit shows without admin scaffolding.

### State 2: Mutually confirmed (v1 verification ceiling)

Both artist and professional have independently added the same credit (matched on `artistId` + `releaseId` + `role`). System auto-detects the match and marks both as confirmed.

Visual treatment: full opacity artwork + a subtle ✓ inline with the role text. Small, unobtrusive. It reads as "genuine" without screaming "certified."

Peer-confirm flow:
1. Artist adds credit with professional's ABLE handle → notification sent
2. Professional sees: "[Artist] credited you as Mix Engineer on [Release] — Confirm?"
3. One tap: "Yes, that's right" / "Not me" / "Later"
4. On confirm → both profiles gain the confirmed state

### State 3: Metadata-sourced (Phase 2)

ISRC match via distributor API (DistroKid, TuneCore, Amuse). When a credit matches streaming metadata, it gains a small "via distributor" attribution. This is the highest-trust state — third-party verified.

Visual treatment: same as confirmed ✓ but with a small distributor logo or "✓✓" to signal the source. Never a large badge.

### What trust is not

- No "Verified Professional" paid tier
- No trust scores or percentages
- No endorsement votes
- No "50 verified credits" milestone badges
- No gamification of the confirmation process

The trust is in the artists themselves. A professional credited on 8 ABLE profiles by 8 real artists is trusted because those artists trust them — not because a platform assigned them a score.

---

## 7. Enquiry and collaboration flow

### CTA: "Work together"

Appears in the professional hero. Also appears at the bottom of the professional profile as a persistent CTA. This is the only booking/contact mechanism in v1.

"Work together" is the right phrase because:
- It positions both parties as equals in a creative collaboration
- It does not imply employment, hiring, or service provision
- It signals the start of a conversation, not a transaction
- It is honest: ABLE connects them; what they do next is theirs

### Enquiry half-sheet

Same UX pattern as the World Map panel — enters from the bottom, covers ~55% viewport, dismissible with swipe down.

**Fields:**

```
Work together with [Name]
─────────────────────────────────────────────────
Your name         [                    ]  (required)
Your email        [                    ]  (required)
What are you working on?
                  [                    ]  (required, 140 chars)
                  e.g. Debut EP, first album, music video for a single
What kind of help are you after?
                  [                              ]  (required, 300 chars)
                  This is the start of a conversation, not a brief.
                  Tell them what you have in mind.
Roughly when?     [            ]  (optional, free text: "This spring" / "No rush")

[ Send ]
```

**What is not in the form:**
- No budget field — marketplace energy
- No deadline (separate from "when") — admin energy
- No "select a service" dropdown — Fiverr energy
- No file upload — overkill for v1
- No "Your ABLE page" field — auto-detected if signed in; for v1 (no auth) this field is dropped entirely. The professional layer only appears when the platform has auth (Phase 2+), so by the time this runs live, enquirers will be identifiable.

**In v1 (no auth, Netlify form):** The form collects all fields and sends to the professional's registered email. A pre-filled subject line: "Enquiry via ABLE — [enquirer name]". If the enquirer mentioned navigating from a credit, include that in the email.

**"How did you find them?" (auto-fill):** Not a form field. If the visitor navigated from a credit tile on an artist's release, the enquiry email to the professional includes a line: "They found you through [Release] by [Artist]." This is added server-side or via a URL param — not a user-visible field.

**After submission:**
- Enquirer sees: "Sent. [Name] will reply to your email when they're ready."
- Professional receives: email with all fields + release context if available
- Rate limiting: 3 enquiries per email address per professional per 7 days

**Artist enquirers vs. anonymous enquirers:** No distinction in v1. In Phase 2 (with auth): if the enquirer has an ABLE profile, their profile link appears in the professional's received email automatically. The professional can tap it to see who they're talking to before responding.

---

## 8. V1 vs deferred

### V1 — build this

| Feature | Notes |
|---|---|
| Professional layer activation on profiles | Role, availability, "Work together" CTA, bio |
| Credits section on release cards | Expandable, confirmed = linked, unconfirmed = plain text |
| Credits auto-aggregate on professional profiles | From confirmed credits on artist profiles |
| Peer-confirm flow | Notification → one-tap confirm → ✓ applied |
| "Artists I've worked with" | Auto from confirmed credits |
| "Similar collaborators" | Auto from shared credit graph, up to 4 |
| "People in my world" | Artist-curated, manual, max 8 |
| "Work together" enquiry form | Netlify form backend, email delivery |
| Professional onboarding path | Role → claim credits → availability → live |
| Professional admin section | Availability, "What I offer", view claimed credits |

### Deferred to Phase 2

| Feature | Reason |
|---|---|
| Work samples / portfolio embeds | Good to have, not core. Credits are the proof. |
| "What I offer" text section | Low priority — bio + credits tell the story |
| Auth-aware enquiry (shows ABLE profile link) | Requires auth system |
| Enquiry inbox in admin | v1 = email. Inbox is Phase 2 with auth. |
| Metadata verification (ISRC/distributor API) | Phase 2 data work |

### Deferred to Phase 3

| Feature | Reason |
|---|---|
| Professional directory / search page | Only valuable when graph is dense. Credits-first must establish itself first. |
| Industry cards (managers, booking agents) | Separate use case, minimal demand in early v1 |
| Per-credit click analytics | Needs auth + analytics infra |
| Rate guidance section (structured) | v1: free-form "What I offer" text is sufficient |

### Never

| Feature | Reason |
|---|---|
| Ratings or reviews | Contradicts the trust philosophy |
| "Top professionals" ranking | Creates competition anxiety, rewards activity not quality |
| Price sorting / filter | Marketplace energy |
| Platform commission on enquiries | ABLE makes the introduction; the relationship is theirs |
| In-platform payment processing | Out of scope entirely |

---

## 9. Integration with the rest of ABLE

### Artist profile

Release cards gain a Credits section. One tap to expand. Each credit: role + name. If name has an ABLE handle: name is a live link. Credits section sits after the track list on a release card, collapsed by default.

"People in my world" is a new section on the artist profile. Position: after the World Map, before or after Listen depending on how many entries the artist has added. Shown only if ≥ 1 entry.

### Credits on release cards (full spec)

```
[Release card expanded]
────────────────────────────────────
Resonance · EP · 2026

[Track list]

Credits
Produced by          Jake Barlow ✓  →
Mixed by             Jake Barlow ✓  →
Mastered by          Chris Davies →
Artwork              Cass Winters →
```

- ✓ = confirmed credit, name is tappable link to professional's profile
- No ✓ = unconfirmed, name shows as plain text (no link, no navigation)
- Credits section is always collapsed. It does not appear unless the artist has added at least one credit to that release.
- Section header: no "Credits" header — just the role/name pairs. Clean. Consistent with ABLE's minimal section labelling.

### Admin — artist

Release editing in admin gains a "Credits" step:
- "Who worked on this?" → Add credit: role (dropdown from role taxonomy) + name (free text) + ABLE handle (optional)
- ABLE handle field: if they enter a valid handle, ABLE sends a confirmation notification
- Artist can see confirmation status in admin (Confirmed / Pending / Not on ABLE)
- No bulk import in v1

### Admin — professional

New admin section for professional layer. Contains:
- Availability status control (three options + save)
- "What I offer" free-form text (optional)
- Credit management: see all credits claimed about them across ABLE, confirm pending confirmations, dispute incorrect credits
- "Work together" CTA: form (default) vs. external link (Calendly, cal.com etc.)

### Onboarding — artist

After the release info step, an optional step:
> "Anyone else worked on this? Add credits so they get discovered through your music."
> [Add a credit] → role + name + ABLE handle

Can be skipped. The credit adds immediately as unconfirmed; professional gets notified to confirm.

### Onboarding — professional

Separate path (separate onboarding page: `professional-start.html`). Steps:

1. **What do you do?** — role selection (multi-select from taxonomy)
2. **Claim your credits** — search for releases on ABLE, "Did you work on this?" → checkbox → self-added (unconfirmed) credits queued. Artists notified to confirm.
3. **Set your availability** — Available / Selective / Not taking projects
4. **Profile live** — "Your profile is at ablemusic.co/[handle]"

### Landing page

The credits-to-discovery story deserves one clear proof moment on the landing page. Not a feature explainer. One line that captures the idea:

> *"Every credit leads somewhere real."*

Or as a demo phone state (optional, after world map state in the cycle): shows a release card with credits expanded, one credit tapping through to a professional profile. Visual proof of the mechanism, under 4 seconds.

The professional ecosystem is not the hero of the landing page — it's a proof point that ABLE is a living ecosystem, not a static page.

---

## 10. Final 10/10 summary

**The model:** One profile. Configurable layers. Artist and professional layers can coexist on a single handle. No separate types. No mode-switching URLs.

**The engine:** Credits on releases. Every confirmed credit is a live edge in the discovery graph. Credits auto-aggregate on professional profiles. The professional's portfolio builds itself through the artists who credit them.

**The discovery:** Credits first. No directory in v1. Entry points: release card credits → professional profile → artists worked with → similar collaborators → further credit trails. Every path is trust-grounded.

**The trust:** Three states (self-added / confirmed / metadata). Visually quiet. A subtle ✓ on confirmed credits. No badges, no scores, no gamification. The proof is in the work.

**The enquiry:** "Work together" CTA. Half-sheet form. Four fields. Sends to professional's email. ABLE makes the introduction; the relationship is theirs.

**The recommendation logic:** Three named recommendation types, each with a clear source. Artists and professionals never mixed in an undifferentiated block.

**The differentiation:** You do not search for a professional on ABLE. You follow music you love until you find the person who made it. The quality trail is the filter. The credit is the proof. The profile is the destination.

This is not a marketplace. It is a music ecosystem where the best signal is the work itself.

---

## Role taxonomy (v1)

Used in credits and professional role labels:

**Production:**
Producer · Beatmaker · Co-Producer · Executive Producer · Arranger

**Engineering:**
Mixing Engineer · Mastering Engineer · Recording Engineer · Stem Mixer

**Performance:**
Session Vocalist · Session Guitarist · Session Bassist · Session Keys · Session Drums · String Player · Brass Player · Choir

**Songwriting:**
Songwriter · Lyricist · Co-Writer

**Visual:**
Music Video Director · Photographer · Cover Artist · Graphic Designer

**Other:**
Cinematographer · Editor · Choreographer · Sound Designer

Each role has a canonical short form for compact display (e.g. "Mix Engineer" → "Mixed by" in credits context). The dropdown in admin shows the full form; the fan-facing credit shows the credit-context form.

---

*This spec supersedes FREELANCER_SPEC.md and PROFESSIONAL_DISCOVERY.md wherever they conflict. Both prior docs remain as research context. New build decisions must refer to this document.*
