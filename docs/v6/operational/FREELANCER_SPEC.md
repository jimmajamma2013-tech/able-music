# ABLE — Freelancer Layer Spec
**Version: 1.0 | Created: 2026-03-13 | Build phase: Phase 13**

The freelancer layer is ABLE's second profile type. Producers, mixers, photographers, videographers, session musicians, and other music-industry creatives get a professional profile — discovered not through a directory, but through the artists they've worked with.

**The insight:** The best signal a freelancer can have is that a credible artist credits them on a real release. That credit, on the artist's ABLE page, is a live link. The fan who loved the production of that track can follow it to the producer's profile. The artist who wants to hire someone with that sound can see exactly who made it.

No cold outreach. No algorithm. The work speaks.

---

## Who the freelancer is

- **Producers**: beatmakers, studio producers, electronic artists who produce for others
- **Mixers and engineers**: mixing, mastering, recording engineers
- **Session musicians**: guitarists, bassists, string players, session vocalists
- **Visual creatives**: photographers, videographers, directors
- **Other**: press/PR coordinators, graphic designers, tour managers

They are not artists (though they may be both). They earn from their craft, not from performing. Their career depends on credits, portfolio, and referrals. ABLE gives them a professional home that lives inside the music ecosystem where their reputation is already being built.

---

## The discovery path (critical — this is the whole mechanism)

```
Artist releases a track
→ Artist adds credit: "Produced by Maya Beats"
→ Maya Beats has an ABLE freelancer profile
→ Credit becomes a live link: able.fm/mayabeats
→ Fan of the track taps it → lands on Maya's profile
→ Another artist taps it → sees Maya's work, rate card, availability
→ Maya gets a booking enquiry
```

Without a freelancer profile on ABLE, the credit is still shown — but as plain text with no link. The incentive to join is the link becoming live and the discovery it enables.

**Maya doesn't need to market herself.** Every release she works on is a passive acquisition channel.

---

## Freelancer profile components

### URL: `able.fm/@[handle]` or `able.fm/[handle]` (same URL space as artists — handle is unique across both types)

### Visual distinction from artist profiles
- Same design system (themes, vibes, tokens)
- **No campaign states** (no pre-release / live / gig modes — freelancers don't have releases)
- **No fan capture form** — freelancers don't have fans, they have clients
- **No snap cards** — replaced by portfolio items
- Primary CTA is a **booking enquiry** or **contact**, not a streaming link
- Header tag: small "Producer" / "Mixer" / "Photographer" label below name

---

### Section 1: Identity header

```
[Photo — 80px circle]

MAYA BEATS
Producer · Manchester

[Book me]   [Listen to work]
```

- Name in vibe display font (freelancer chooses their vibe — it sets the aesthetic register of their profile)
- Role tag: "Producer" / "Mixing Engineer" / "Photographer" / etc. (one primary, up to 2 secondary)
- Location: city-level
- Two hero CTAs:
  - Primary: "Book me" → enquiry form (bottom sheet) or external booking link
  - Secondary: "Listen to work" → scrolls to portfolio

---

### Section 2: Credits (most important section)

```
Credits
──────────────────────────────────────────────────
[Artwork]  Dissolve — Single         Mara J.    ✓   2026
[Artwork]  Unravel (EP)              Novo Amor  ✓   2025
[Artwork]  Dream in Blue             Jordan R.      2025
[Artwork]  After Hours               Cleo Sol   ✓   2025
           + 14 more credits
```

- Artwork pulled from artist's release (if configured in ABLE)
- ✓ = peer-confirmed or distributor-verified (see PRODUCT_HIERARCHY_AND_TRUST.md §5)
- No ✓ = unverified self-claim — still shown, but with visual distinction
- Collapsed to 4 by default. "Show all [N] credits" expands with spring entrance.
- Tap credit → opens the artist's ABLE profile at that release
- **This section is the trust signal.** Verified credits on real ABLE profiles is the most credible portfolio a freelancer can have.

---

### Section 3: Portfolio

Audio, video, and photo samples directly linked to their work.

```
Work samples
──────────────────────────────────────────────────
▶ [Waveform]  "Dissolve" — stem mix preview      2:14
▶ [Waveform]  "After Hours" — production cut      1:48
▶ [Thumb]     "Unravel" — studio session video
[Photo grid]  Mara J. press shots
```

- **Audio**: SoundCloud or direct URL embed (not Spotify — Spotify links don't give audio control). Max 6 items.
- **Video**: YouTube embed, max 3 items
- **Photos**: Instagram grid or direct image grid, max 9 images
- No hosting on ABLE servers (v5 — future Pro feature may allow direct upload to R2)
- Portfolio items can be labelled: the freelancer writes one line of context ("Production and arrangement for Novo Amor's 2025 EP")

---

### Section 4: Rate card (optional — freelancer's choice)

```
Working together
──────────────────────────────────────────────────
Production          From £300/track
Mixing              £150–£250/track
Stem mixing         £80/track
Full EP package     Get in touch

Availability        Open for new work
Response time       Usually 2–3 days
```

- Freelancer sets whether to show rates (many prefer "get in touch" to filter enquiries)
- Three options per service: fixed price / range / "get in touch"
- Availability status: "Open for new work" / "Limited availability" / "Not taking bookings"
  - Status shows as a small dot: green / amber / red
  - Auto-expires: "Open" auto-reverts to "Limited" after 30 days unless re-confirmed (prevents stale availability)

---

### Section 5: Booking enquiry (bottom sheet, triggered by "Book me" CTA)

```
Get in touch with Maya
──────────────────────────────────────────────────────────
Your name           [                    ]
Your email          [                    ]
What you need       [                    ]
Your ABLE page      able.fm/ [           ]   (optional)

[ Send enquiry ]
```

- Sends to freelancer's registered email via ABLE (protects privacy — fan/artist never gets their direct email unless they choose to reply)
- Freelancer receives: name, email, project description, and (if filled) a link to the enquirer's ABLE profile
- ABLE profile link field: if the enquirer is an artist on ABLE, the freelancer can immediately see who they are, check their style, and make an informed decision before replying
- Rate limiting: max 3 enquiries per day per email address per freelancer

---

### Section 6: Artists I've worked with (social proof, auto-generated)

```
Artists on ABLE
──────────────────────────────────────────────────
[Mara J. avatar]  [Novo Amor avatar]  [Cleo Sol avatar]  + 4 more
```

- Auto-populated from confirmed credits on ABLE artist profiles
- Only shown if ≥ 2 confirmed credits exist
- Taps to the relevant artist profiles
- Label says "Artists on ABLE" (not "clients" — too transactional)

---

## Onboarding wizard (freelancer-start.html)

Separate from artist onboarding. Shares design but has different steps.

**Step 1: What do you do?**
- Role selection: Producer / Mixing Engineer / Recording Engineer / Session Musician / Photographer / Videographer / Other
- Multi-select allowed (Producer + Mixer is common)
- Sets the vibe default (Electronic for producers, Folk for acoustic session musicians etc. — auto-suggested, changeable)

**Step 2: Import your credits (optional but high-value)**
- Search for releases by artist name → ABLE matches against artist profiles
- "Did you work on any of these?" → checkboxes → adds unverified credits
- Artist gets peer-confirmation notification automatically
- Skip option: "I'll add credits later"

**Step 3: Add a portfolio sample**
- Paste a SoundCloud or YouTube link
- One sample to start — more can be added in dashboard
- Skip option

**Step 4: Set availability + booking preference**
- "Open for new work" / "Limited" / "Not taking bookings"
- CTA preference: enquiry form on ABLE (default) / link out to external booking (e.g., Calendly)

**Done screen:**
- "Your profile is live at able.fm/[handle]"
- Share options: copy link, WhatsApp, Twitter, Instagram
- "Add to your email signature" — copy a text snippet: "Maya Beats · Producer · able.fm/mayabeats"

---

## Technical notes for Phase 13 build

### Profile type flag
```js
// In able_v3_profile (freelancer variant):
{
  profileType: 'freelancer',   // 'artist' | 'freelancer' — determines which sections render
  name: 'Maya Beats',
  handle: 'mayabeats',
  role: ['producer', 'mixer'], // from role taxonomy
  location: 'Manchester',
  bio: '...',                  // one-line professional bio
  accent: '#f4b942',
  theme: 'dark',
  vibe: 'hiphop',
  availability: 'open',        // 'open' | 'limited' | 'closed'
  availabilitySetAt: 1741875600000,
  rateCard: {
    shown: true,
    services: [
      { name: 'Production', price: 'from £300/track' },
      { name: 'Mixing', price: '£150–£250/track' }
    ]
  },
  portfolio: [
    { type: 'audio', url: '...', label: '...', credit: 'Dissolve — Mara J.' },
    { type: 'video', url: '...', label: '...' }
  ],
  bookingCTA: { type: 'form' },  // 'form' | 'link'
  bookingUrl: null,              // if type === 'link'
  credits: [/* populated from confirmed credits on artist profiles */]
}
```

### able-v5.html rendering logic
```js
const isFreelancer = profile.profileType === 'freelancer'

// Sections that DO NOT render for freelancers:
// - Campaign state system (no state tags, no state switcher)
// - Fan capture form
// - Snap cards
// - Gig mode

// Sections that render differently:
// - Hero CTAs: "Book me" + "Listen to work" instead of stream/stream
// - Top card: portfolio hero instead of artwork/video campaign card
// - Tab bar: Home / Credits / Work / Rates / Contact (not Home/Listen/Shows/Merch/Support)
```

### Freelancer tab bar
| Tab | Icon | Section |
|---|---|---|
| Home | person | Identity + credits overview |
| Credits | verified | Full credits list |
| Work | play | Portfolio |
| Rates | card | Rate card + availability |
| Contact | envelope | Booking enquiry form |

---

## What makes this different from LinkedIn

- **Music-specific**: credits are real release credits, not self-reported job titles
- **Discoverable through artists**: the acquisition channel is the work itself
- **No connections/followers**: this is a portfolio, not a social graph
- **No endorsements**: verification comes from confirmed credits, not peer votes
- **One-tap booking**: no InMail, no connection request, just an enquiry form

---

*Freelancer layer: Phase 13. The artist profile must be complete and credits system must be in place (Phase 6–7) before this phase begins. The freelancer profile reuses 80% of the artist profile rendering code — it is not a separate design system.*
