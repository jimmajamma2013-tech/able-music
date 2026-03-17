# ABLE — Peer-Confirmation & Credit Verification: Research & Design Spec

**Prepared: 2026-03-15**
**Status: Research complete — ready for implementation decisions**

---

## 1. What the research found: lessons from other systems

### 1.1 LinkedIn endorsements — the cautionary tale

LinkedIn endorsements launched in 2012 and reached hundreds of millions of uses almost immediately. They are the canonical example of a low-friction confirmation system that destroyed its own signal.

**What they got right:** The mechanic was almost zero-effort. One click, no writing required, you could endorse someone from a notification prompt before even visiting their profile. Completion rates were extremely high.

**What went catastrophically wrong:** Because endorsements were low-effort and reciprocal ("you endorse me, I'll endorse you"), they inflated to meaninglessness within 18 months. A mid-level manager accumulating 99+ endorsements for "Microsoft Office" or "Leadership" became a joke. Recruiters stopped reading the section entirely. The credibility of the system collapsed not despite its ease, but because of it. When confirmation costs nothing, it signals nothing.

**The mechanism of failure:** There was no contextual gate. Anyone could endorse anyone for anything, including skills they'd never witnessed. There was no "what did you actually work on together?" anchor. The endorsement was detached from a specific piece of work.

**The critical lesson for ABLE:** The difference between a LinkedIn endorsement and an ABLE confirmation is that the ABLE confirmation is anchored to a specific release on a specific artist's profile. It is not "do you endorse Maya as a producer?" — it is "did Maya produce this EP?" That anchor is what prevents the inflation problem. The question has a factual answer. Either she did or she didn't.

### 1.2 LinkedIn recommendations — the effort problem

LinkedIn recommendations require written prose. They carry significantly more trust signal than endorsements. Recruiters read them. They matter.

**Completion rate: extremely low.** Most LinkedIn users who request a recommendation never receive one. The written-prose requirement is the cliff — not because the endorser doesn't want to help, but because writing takes time and sits in the mental queue with every other writing task someone hasn't got around to.

**When recommendations do get written:** Almost always shortly after the working relationship ends, when the moment is fresh and the motivation is high. Requests made 6 months after a project ends almost never get fulfilled.

**The lesson for ABLE:** Writing a confirmation must not be required. The artist's confirmation should be a binary: yes, this person worked on this. No prose. No rating. No review. One tap.

### 1.3 Discogs — the closest analogue

Discogs is the most instructive reference point because it solves the exact same problem in music: who made what.

**How it works:** Credits on Discogs are crowd-sourced. Any registered user can submit a release with a credits list. Credits must be transcribed directly from the physical release — what is printed on the sleeve is what goes in. Community voting handles disputes.

**What Discogs gets right for ABLE:**
- Credits anchored to a specific physical artefact (the release) — not floating claims
- No third-party trust authority — trust is distributed
- Edit history is permanent and transparent
- Incorrect credits can be disputed and corrected

**What Discogs cannot teach ABLE:**
- Discogs has no concept of a living professional whose career is affected by credits
- Discogs is entirely post-hoc and archival. ABLE credits are live and career-affecting
- Discogs has no peer-to-peer confirmation — it's community-based, not individual consent

**The lesson:** The anchor-to-release model is right. But because credits affect real professionals' livelihoods in real time, you need a faster, more personal resolution path than community vote.

### 1.4 GitHub contributor attribution — automatic, not confirmed

GitHub attribution is automatic — a merged commit is the proof. This model does not translate to music. There is no equivalent digital artefact that proves Maya Beats produced a track.

**What GitHub does teach ABLE:** The best verification is implicit in the act itself. If ABLE eventually connects to distributor metadata (DistroKid, TuneCore — ISRC integration), a match between a credited name and streaming metadata is the closest music gets to a "merged commit." Phase 2 feature. For v1, peer confirmation is right.

### 1.5 IMDb crew credits — asymmetric trust model

IMDb uses community challenge and editorial review as a backstop. The key principle: trust evidence should scale with the claim's weight. A mastering engineer crediting themselves on 2 releases is low-risk. A producer claiming 50 high-profile credits is a higher-risk claim.

**The lesson:** ABLE doesn't need a manual review queue. But rate-limiting and pattern-detection matter: a professional claiming many new credits all at once, especially on artists who haven't confirmed them, is a signal worth flagging quietly.

### 1.6 Two-sided review completion — the Airbnb simultaneous reveal

Airbnb's double-blind review system (reviews only publish after both parties submit, or after 14 days) found:
- Higher total completion vs. sequential reveal
- Reduced retaliatory/reciprocal inflation
- Slightly lower (more honest) average scores
- "Curiosity pull" — you wanted to see what they wrote, so you wrote yours

**What drives completion in two-sided systems:**
1. Curiosity about what the other party said
2. Knowing your action has an effect
3. Time pressure — a window closes
4. Low friction — one step, not many
5. Personal relevance — this credit matters to you specifically

**What kills completion:**
1. No time pressure
2. Feeling like admin
3. Writing required
4. No visible consequence of not doing it
5. Too late — the working relationship feels distant

---

## 2. Core design principles

**Principle 1: The anchor is the release, not the person.**
The confirmation question is always: "Did [name] work on [specific release]?" Factual. Yes/no. Not a general endorsement.

**Principle 2: The artist's effort ceiling is one tap.**
The confirmation UI must be completable in under 5 seconds without reading anything longer than one sentence.

**Principle 3: Timing is the most important variable.**
Ask immediately after the release is added to their profile, when the project is fresh and the relationship is recent. Asking 8 months later has near-zero completion rate.

**Principle 4: Peer-to-peer, not platform-mediated.**
Notification language must feel like it's coming from Maya, not from ABLE. "Maya Beats says she mixed your EP" not "ABLE has received a credit claim."

**Principle 5: Unconfirmed credits exist but are visually distinguished.**
Don't block the freelancer's profile pending confirmation. Unconfirmed credits show, muted. Confirmed credits are full opacity + ✓ + live link.

**Principle 6: Dispute is the edge case, not the centre.**
95% of credits are accurate. Design for that. The "Not me" path exists but doesn't dominate the UI.

---

## 3. The flows

### Flow A: Artist adds a credit (primary path)

```
ARTIST ADDS RELEASE IN ADMIN
│
├── Optional "Credits" step during release creation:
│   "Anyone else worked on this? Add their name so they get
│    discovered through your music."
│
├── Artist enters: Role (dropdown) + Name (text) + ABLE handle (optional)
│
├── Credit saved immediately as unconfirmed
│
├── IF freelancer has an ABLE account:
│   └── ABLE sends notification to freelancer
│       Credit shows on freelancer profile, muted
│       Freelancer confirms or dismisses
│       On confirm → both profiles update: full opacity + ✓
│
└── IF freelancer has no ABLE account:
    └── Credit shows as plain text on the artist's release (no link)
        If they later join ABLE → they can claim the credit
        Artist gets: "Maya Beats just joined ABLE — confirm her credit?"
```

### Flow B: Freelancer claims a credit (onboarding or admin)

```
FREELANCER ONBOARDING — Step 2: "Find your credits"
│
├── Search by artist name or release title
│   ABLE matches against existing artist profiles
│
├── "Did you work on any of these?"
│   [Artwork] Resonance EP — Atlas Sound
│   [Artwork] Blue Coat — Mara J.
│   User checks the ones they worked on → role from dropdown
│
├── Credits added to freelancer profile as unconfirmed
│
└── ABLE sends notification to each affected artist:
    "Maya Beats says she produced Resonance EP. Is that right?"
    [Yes, that's right] [Not me] [Later]
    → On confirm: credit confirmed on both profiles
```

### Flow C: Freelancer adds a credit retrospectively (from admin)

```
FREELANCER ADMIN → Credits section → "Add a credit"
│
├── Artist name / Release title → search → select
│   Role dropdown
│
├── If artist is on ABLE:
│   Credit unconfirmed, artist notified
│
└── If artist not on ABLE:
    Credit self-claimed only — muted, no ✓, no link
```

---

## 4. The notification — detailed design

### Push notification

```
From: ABLE

Maya Beats · Produced your EP
"She says she mixed Resonance EP.
Is that right?"

[Yes]  [Not me]
```

**The confirmation must be completable from the notification shade without entering the app.** iOS and Android both support notification action buttons. This is the most important design decision.

### In-app notification card

```
┌─────────────────────────────────────────────┐
│  [Avatar]  Maya Beats                       │
│            says she mixed your EP           │
│                                             │
│  Resonance EP · 2026                        │
│  Produced by Maya Beats                     │
│                                             │
│  [Yes, that's right]    [Not me]            │
│                                             │
│  Tap the credit to see Maya's profile →     │
└─────────────────────────────────────────────┘
```

### Email fallback (artist inactive 7+ days)

**Subject:** `Maya Beats wants to be credited on your EP`

```
Hi [Name],

Maya Beats says she produced Resonance EP — your release on ABLE.

If that's right, confirm it and her name will link to her ABLE profile
when people look at your credits.

[Yes, Maya worked on this]

If you don't recognise this, just ignore it.

—
ABLE
```

Notes:
- Subject uses her name, not ABLE's name — personal not platform
- One action. "Ignore it" is not a button, it's a sentence
- No "You have [N] pending credit confirmations" — that is admin-speak

---

## 5. Copy for every touchpoint

All copy checked against ABLE's `COPY_AND_DESIGN_PHILOSOPHY.md`.

### Artist adding a credit
- Prompt: "Anyone else worked on this?"
- Sub-text: "Add their name and they'll get discovered through your music."
- Role dropdown placeholder: "What did they do?"
- Name field placeholder: "Their name"
- Handle field placeholder: "Their ABLE handle — optional"
- CTA: "Add credit"

### Notification to freelancer (artist credits them)
- Push: "[Artist name] credited you on [Release] · Confirm it's you →"
- In-app: "[Artist name] added you as [Role] on [Release]. Confirm so the credit goes live on your profile."
- Button 1: "Yes, that's me"
- Button 2: "That's not right"
- Button 3 (ghost): "Remind me later"

### Notification to artist (freelancer claims a credit)
- Push: "[Name] says they [role] your [Release] · Right?"
- In-app: "[Name] says they [role] on [Release]. Is that right?"
- Button 1: "Yes, that's right"
- Button 2: "Not me"
- (No "Later" — if it's their release, they should know immediately)

### Confirmation success state
- For freelancer (after artist confirms): "Credit confirmed. It's live on your profile."
- For artist (after they confirm): "Done. Maya's name now links to her profile."

### Unconfirmed credit labels
- On freelancer's public profile: no label — muted opacity and absent ✓ is the signal
- In freelancer admin: "Awaiting confirmation from [Artist]" — small, grey
- If no artist ABLE account: "Artist not on ABLE yet"

### Status in artist admin (release credits list)
```
Producer     Maya Beats       Waiting for Maya to confirm
Mixer        Jake Barlow  ✓   Confirmed
Mastering    Chris Davies     Not on ABLE yet
```

---

## 6. Failure states and edge cases

### Artist never confirms
Credit remains unconfirmed indefinitely. Shows muted, no ✓, no link. One follow-up after 14 days. After that: silence. Chasing is annoying and contradicts ABLE's character.

**Should unconfirmed credits be visible on the fan-facing profile?** Yes — but without a link. Blocking the credit entirely punishes the freelancer for the artist's inaction. The ✓ is the trust signal; its absence is neutral.

Exception: a disputed credit ("Not me" pressed) goes dark immediately. Disputed ≠ unconfirmed.

### Artist inactive (60+ days)
After one follow-up at 14 days, no further prompting. Phase 2: if inactive 90+ days, credit status changes to "Unverifiable — artist inactive" with a distinct visual treatment.

### Freelancer edits a confirmed credit
If they change the name or role after an artist has confirmed, the confirmed status resets. Artist needs to reconfirm. Prevents gaming.

### Malicious false credits
Three natural defences:
1. Artist's "Not me" tap — resolves active cases fast
2. Rate limiting on new accounts — first 5 credits from new accounts flagged internally
3. Unconfirmed state — a false credit on an inactive artist shows without link, without ✓, triggers no discovery. Damage ceiling is low.

For v1, this is adequate. Formal dispute/moderation in Phase 2 if abuse patterns emerge. Don't build abuse prevention before there's evidence of abuse.

### Two people with the same name
The handle (@mayabeats) is the canonical identifier, not the display name. The credit object always uses the handle when one exists.

---

## 7. The full flow diagram

```
FREELANCER SIDE                          ARTIST SIDE
─────────────────────────────────────────────────────────────────

TRIGGER: Freelancer claims a credit      TRIGGER: Artist adds a credit
         ↓                                         ↓
         Credit saved as unconfirmed               Credit saved as unconfirmed
         Profile shows credit muted                Release shows credit as plain text
         ↓                                         ↓
         ABLE sends notification →  →  →  → Artist receives notification
                                              "[Name] says they [role] your
                                              [Release]. Right?"
                                              [Yes, that's right]  [Not me]
                                              ↓
                                    ┌─────── Artist taps "Yes, that's right"
                                    │        Credit confirmed on release card
                                    │        Credit confirmed on freelancer profile
                                    │        Both sides notified (one line, no fanfare)
                                    │        [END — happy path]
                                    │
                                    ├────── Artist taps "Not me"
                                    │        Credit goes dark on both profiles
                                    │        Freelancer notified to check admin
                                    │
                                    └────── Artist does nothing
                                             14-day follow-up (once only)
                                             Credit stays unconfirmed indefinitely
                                             No further prompting

FREELANCER SEES:                         ARTIST SEES (release credits):
─────────────                            ─────────────────────────────
Confirmed:   full opacity + ✓ + link     Maya Beats ✓  (confirmed — linked)
Unconfirmed: muted, no ✓, no link        Jake Barlow   (waiting for Jake)
Disputed:    not shown                   Chris Davies  (not on ABLE yet)
```

---

## 8. v1 scope

**Must have:**
- Credit object: role + name + ableHandle + confirmed + confirmedAt
- Unconfirmed: 0.65 opacity, no ✓, no link
- Confirmed: full opacity + ✓ + live link
- Peer-confirm: artist credits freelancer → notification → one-tap confirm
- Peer-confirm: freelancer claims credit → artist notification → one-tap confirm
- "Not me" → credit goes dark immediately
- 14-day follow-up (once only)
- Rate limiting: first 5 credits from new accounts flagged

**Defer to Phase 2:**
- Email fallback for dormant artists
- "Artist inactive" status (90 days)
- ISRC/distributor metadata match
- Dispute escalation beyond "Not me"

**Never:**
- Writing required for confirmation
- Star ratings or reviews on credits
- "Verified Professional" paid tier
- Gamification of credit counts

---

## 9. Why this avoids LinkedIn's failure

| LinkedIn endorsements | ABLE credit confirmation |
|---|---|
| Detached from any specific work | Anchored to a specific release |
| Any connection can endorse any skill | Only the artist on the release can confirm |
| No factual question | Factual yes/no: "did this person work on this?" |
| Reciprocal by design — drives inflation | No reciprocity — artist has nothing to gain |
| No consequence for false endorsements | "Not me" immediately removes the credit |
| Signal diluted across hundreds of skills | Signal concentrated on named releases |

---

## The one sentence

**"Mutual recognition, not a platform judgment."** ABLE doesn't verify credits. Two people who worked together recognise each other — that's the trust. The platform makes the recognition visible.

---

*Sources: LinkedIn endorsement research (LinkedFusion, YourStory, The Undercover Recruiter), Discogs Database Guidelines, IMDb community forums, GitHub All Contributors, Airbnb review paper (Fradkin, Grewal, Holtz — Marketing Science), Braze push notification best practices, SoundBetter credit system.*
