# Freelancer Profile Page — Specification
**File: `freelancer.html` | Created: 2026-03-16 | Status: Pre-build — strategy only**

---

## 1. PURPOSE

`freelancer.html` is the professional profile for music-industry freelancers on ABLE: producers, mixing engineers, mastering engineers, session musicians, videographers, photographers, graphic designers, and other creative professionals who work behind or alongside recording artists.

**Primary job:** A visitor (artist, fan, or industry professional) lands on this page and immediately understands who this person is, what they make, and whether they're available to work. They can reach out in under 30 seconds.

**The conduit principle applies differently here.** On the artist profile, ABLE disappears and the artist's world fills the screen. On the freelancer profile, ABLE still disappears — but what fills the screen is evidence of work: credits on real releases, audio and video samples, clear availability, and a way to get in touch without friction.

**What it must feel like:** A page built by someone serious about their craft. Not a portfolio template. Not a marketplace listing. A professional home that is discoverable only because the work earned it.

**What it must not feel like:** SoundBetter. Fiverr. LinkedIn. A marketplace. A job application. A brand deck.

---

## 2. WHAT MAKES IT DIFFERENT FROM THE ARTIST PROFILE

### Structural differences

| Feature | Artist profile | Freelancer profile |
|---|---|---|
| Campaign states | Yes (profile / pre-release / live / gig) | No — freelancers don't have release campaigns |
| Fan capture form | Yes | No — freelancers have clients, not fans |
| Gig mode | Yes | No |
| Snap cards | Yes | No — replaced by portfolio items |
| Top card | Artwork / video / countdown | Portfolio hero (audio waveform or video reel) |
| Hero CTAs | Stream / pre-save / tickets | "Get in touch" + "Hear the work" |
| Tab bar | Home / Listen / Shows / Merch / Support | Home / Credits / Work / Rates / Contact |
| Discovery path | Fan taps link-in-bio | Anyone taps a credit link on an artist's release card |
| Urgency register | High — time-sensitive campaigns | Low — availability is a state, not a countdown |
| Social proof | Fan sign-up count (private) | Peer-confirmed credits on real ABLE profiles |

### Shared features

- Same design system: Surface 1 tokens (Midnight Navy, DM Sans, Barlow Condensed, spring easing)
- Same theme system: Dark / Light / Glass / Contrast
- Same accent variable: freelancer picks their accent, same mechanism as artist vibe colour
- Same bottom sheet interaction pattern for the booking enquiry form
- Same mobile-first 375px base with 44px tap targets

---

## 3. AUDIENCE

### Primary visitor: The working artist

An independent artist who has heard of this producer or seen the credit on a release they know. They are here to answer three questions quickly:

1. Have they worked with artists like me?
2. Are they available?
3. What does it cost, roughly?

They do not want to read a bio. They want evidence.

### Secondary visitor: The music fan

A fan who loved the production on a track, tapped the "Produced by" credit on the artist's ABLE page, and landed here by curiosity. They are not hiring. They may follow if there is a follow mechanism. They will look at the portfolio. They represent passive discovery — their tap is the beginning of the freelancer's reputation spreading organically.

### Tertiary visitor: The industry professional

A label A&R, music supervisor, or manager who heard a name and is vetting someone. They want credits and portfolio. They will not fill in a form — they'll find the person's email or have their assistant reach out. The profile needs to pass this vetting even if it doesn't convert them directly.

### Profile owner: The freelancer

They update their availability, add new credits, add portfolio samples. They receive and respond to booking enquiries. Their admin experience is a variant of the existing admin.html — same design system, different sections.

---

## 4. THE CREDIT SYSTEM: THE WHOLE MECHANISM

This is not a secondary feature. The credit system is the reason the page exists.

### How it works

```
Freelancer produces a track for an artist with an ABLE profile
  ↓
Freelancer adds a credit on their own profile: "Produced 'Echoes' — Nadia"
  ↓
Credit shows as unverified (no ✓ badge)
  ↓
ABLE sends a peer-confirmation request to Nadia:
  "Maya says she produced your track 'Echoes' — right?"
  [Confirm] [Not quite] [Ask me later]
  ↓
Nadia taps Confirm (one tap — that's the whole interaction)
  ↓
Credit gets ✓ badge on Maya's freelancer profile
Artist's release card on Nadia's ABLE page shows "Produced by Maya Beats ●" (live link)
  ↓
Anyone who taps "Maya Beats" on Nadia's release card lands on Maya's freelancer profile
  ↓
Credit discovery flywheel: every confirmed credit is a passive acquisition channel
```

### What makes the credit valuable

A confirmed credit on a real ABLE artist profile is worth more than any self-reported credential because:

1. **It is contextual**: the visitor hears the track and then finds the producer. The ear has already been converted before the profile loads.
2. **It is peer-verified**: another person confirmed it. Not a platform badge — an actual person with their name on the release.
3. **It is linked both ways**: the credit on the artist's page points to the freelancer's profile; the credit on the freelancer's profile points back to the artist's release. The graph is bidirectional.
4. **It cannot be bought**: there is no paid "featured producer" position. Credits exist because the work happened.

### Unverified credits

Credits the freelancer adds that the artist has not yet confirmed are shown with visual distinction — smaller opacity, no ✓, no link from the artist's page. They are not hidden. They are not presented as verified facts. The display is honest.

This matters because: omission errors are common in the industry (95% of collaborators are not properly credited on streaming platforms — Muso.AI). A freelancer who genuinely worked on a release should not be invisible just because the artist hasn't responded to a confirmation request yet. The unverified state is honest, not punitive.

### Peer-confirmation flow (detail)

The confirmation notification to the artist is:
- Delivered to admin.html as a notification card (not email first — meet them where they already are)
- One tap to confirm. Three options: Confirm / Not quite / Ask me later
- "Not quite" opens a freeform note field: "What would you like to correct?" — goes back to the freelancer
- "Ask me later" snoozes for 7 days then re-notifies once
- If no response after 30 days: credit remains unverified, no further prompts (artists who have moved on shouldn't be harassed)

### Credits the artist adds

The richer flow: when an artist is filling in a release on their own page, they add credit fields. If the name they type matches an ABLE handle, the system auto-links it. The freelancer receives a notification: "Nadia credited you on 'Echoes' — do you want to add this to your profile?" One tap to accept.

---

## 5. SECTIONS AND ORDER

### Section 1: Identity header (above the fold)

```
[Photo — 80px circle avatar]

MAYA BEATS
Producer · Manchester

[Get in touch]   [Hear the work]
```

- Name: Barlow Condensed, display font, artist's accent colour
- Role tag: from taxonomy (Producer / Mixing Engineer / Mastering Engineer / Session Musician / Videographer / Photographer / Graphic Designer / Other). Up to 2 roles shown inline: "Producer · Mixer"
- Location: city-level only
- Avatar: optional — defaults to coloured initial monogram using accent colour
- Hero CTAs: max 2. Primary = "Get in touch" (opens booking form bottom sheet). Secondary = "Hear the work" (scrolls to portfolio).
- Availability chip: small pill below the CTAs — "Taking on work" (green dot) / "Selective" (amber dot) / "Not booking" (dim). Not a CTA — status signal only.

### Section 2: Credits (the most important section)

```
Credits ──────────────────────────────────────
[Artwork]  Dissolve — Single          Nadia      ✓   2026
[Artwork]  Dream in Blue              Jordan R.  ✓   2025
[Artwork]  After Hours                Cleo Sol   ✓   2025
[Artwork]  Unravel (EP)               Novo Amor      2025
           + 8 more credits
```

- Sorted: confirmed credits first, then unverified, within each group by recency
- ✓ = peer-confirmed. No badge = unverified self-claim (distinct but not hidden)
- Release artwork pulled from the artist's ABLE profile (if configured)
- Artwork fallback: coloured initial tile using artist's accent colour
- Tap a confirmed credit → navigates to that artist's ABLE profile, opens at that release
- Tap an unverified credit → no link (nowhere to go; artist may not have an ABLE profile)
- Collapsed to 4 by default, "Show all [N] credits" expands with spring entrance
- Empty state: "Credits appear here once artists confirm them. Add your first below."

### Section 3: Artists on ABLE (auto-generated social proof)

```
Artists on ABLE ──────────────────────────────
[Avatar] Nadia   [Avatar] Jordan R.   [Avatar] Cleo Sol   + 3 more
```

- Auto-populated only from confirmed credits where the artist has an active ABLE profile
- Hidden if < 2 confirmed ABLE credits (don't show an empty or near-empty section)
- Each avatar taps to that artist's profile
- Label: "Artists on ABLE" not "Clients" — "Clients" is transactional, not what ABLE is

### Section 4: Portfolio (work samples)

```
Work ─────────────────────────────────────────
▶ [Waveform]  "Dissolve" — stem mix preview    2:14
              Production and arrangement for Nadia's debut single
▶ [Waveform]  "After Hours" — production cut   1:48
▶ [Thumb]     "Unravel" — studio session video
```

- Audio: SoundCloud embed or direct URL. Max 6 items.
- Video: YouTube embed. Max 3 items.
- Each item has an optional one-line note written by the freelancer
- Photo grid for photographers/videographers: max 9 images. External-hosted (no ABLE storage in v1).
- Portfolio items are not credits — they are samples of work. A credit proves the work happened; a portfolio item lets someone hear or see it.
- Empty state: "Add a SoundCloud or YouTube link to share your work."

### Section 5: Rates and availability

```
Working together ─────────────────────────────
Production            From £300/track
Mixing                £150–£250/track
Stem mixing           £80/track
Full EP package       Let's talk

Availability          Taking on work now
Response time         Usually within 2 days
```

- Freelancer controls whether to show rates. Many prefer "get in touch" for all items — both are valid.
- Three price formats per service line: fixed / range / "Let's talk"
- Availability states: "Taking on work now" / "Selective right now" / "Not booking at the moment"
- Availability auto-expiry: "Taking on work now" auto-transitions to "Selective" after 30 days unless the freelancer re-confirms. Prevents ghost profiles.
- Response time: optional field. Practically useful; reduces enquiry anxiety for the artist.
- Section is hidden entirely if the freelancer has not filled it in (no empty section shown to visitors)

### Section 6: Booking enquiry (bottom sheet)

Triggered by "Get in touch" CTA. Not a separate page — a bottom sheet.

```
Get in touch with Maya
────────────────────────────────────────────
Your name             [                   ]
Your email            [                   ]
What you're working on  [                 ]
What you need           [                 ]

[ Send ]
```

Four fields, no more:
1. Name (text)
2. Email (email)
3. What you're working on (text, ~100 chars — the project)
4. What you need from Maya (text, ~200 chars — the ask)

Optional fifth field (shown only if the enquirer is or may be on ABLE): "Your ABLE page (optional): ablemusic.co/ [ ]" — lets the freelancer see the artist's profile before deciding whether to reply.

No budget field. No service dropdown. No file upload. The form opens a conversation; it does not complete a transaction.

Confirmation: "Sent. Maya will get back to you." (Not "Your enquiry has been submitted and will be processed." — that's a support ticket, not a creative conversation.)

Rate limiting: max 3 enquiries per day per email per freelancer.

---

## 6. PAGE URL AND HANDLE SYSTEM

`ablemusic.co/@mayabeats` or `ablemusic.co/mayabeats` — same URL namespace as artists. Handle is unique across both types. The profile renders differently based on `profileType: 'freelancer'` in the profile data.

---

## 7. DATA ARCHITECTURE (localStorage → Supabase)

```js
// localStorage key: able_freelancer_profile
{
  profileType: 'freelancer',
  name: 'Maya Beats',
  handle: 'mayabeats',
  role: ['producer', 'mixer'],         // from role taxonomy
  location: 'Manchester',
  bio: 'Short one-line bio',
  accent: '#f4b942',
  theme: 'dark',
  vibe: 'hiphop',
  avatar: null,                        // URL or null (fallback: initial monogram)
  availability: 'open',                // 'open' | 'limited' | 'closed'
  availabilitySetAt: 1741875600000,    // Unix ms — used for auto-expiry
  responseTime: 'Usually within 2 days',
  rateCard: {
    shown: true,
    services: [
      { name: 'Production', price: 'from £300/track' },
      { name: 'Mixing', price: '£150–£250/track' }
    ]
  },
  portfolio: [
    { type: 'audio', url: '...', label: 'Production and arrangement for Nadia', credit: 'Dissolve — Nadia' },
    { type: 'video', url: '...', label: 'Studio session for Unravel EP' }
  ],
  credits: [
    {
      releaseTitle: 'Dissolve',
      artistName: 'Nadia',
      artistHandle: 'nadia',      // null if artist not on ABLE
      role: 'producer',
      year: 2026,
      confirmed: true,
      artworkUrl: '...',
      releaseId: 'nadia-dissolve'
    }
  ],
  bookingCTA: { type: 'form' },        // 'form' | 'link'
  bookingUrl: null                     // if type === 'link'
}
```

**New localStorage key: `able_booking_enquiries`** (freelancer admin side):
```js
[{
  id: 'uuid',
  from_name: 'James',
  from_email: 'james@...',
  project: 'Debut EP, indie folk, 6 tracks',
  ask: 'Looking for mixing. Aiming to release in June.',
  from_able_handle: 'james-music',    // if provided
  ts: 1741875600000,
  read: false,
  replied: false
}]
```

---

## 8. FREELANCER ONBOARDING (freelancer-start.html — separate wizard)

Entry: landing.html "Are you a music professional?" section → "Set up your profile →"

**Step 1: What do you do?**
Role selection (multi-select): Producer / Mixing Engineer / Mastering Engineer / Recording Engineer / Session Musician / Videographer / Photographer / Graphic Designer / Other

**Step 2: Add your credits**
Search by artist name on ABLE → "Did you work on any of these?" → checkboxes → adds as unverified credits, fires peer-confirmation requests automatically.
Skip option: "I'll add credits later."

**Step 3: Add a work sample**
Paste a SoundCloud or YouTube link. One sample. More in dashboard.
Skip option.

**Step 4: Set availability**
"Taking on work now" / "Selective right now" / "Not booking at the moment"
Booking preference: form on ABLE (default) / link to Calendly or external booking page

**Done screen:**
"Your profile is live at ablemusic.co/[handle]"
Share options: copy link, WhatsApp, Instagram
"Add to your email signature: Maya Beats · Producer · ablemusic.co/mayabeats"

---

## 9. TIER SYSTEM FOR FREELANCERS

The tier gates are different from artist tiers:

| Tier | Price | What the freelancer gets |
|---|---|---|
| Free | £0 | Live profile, 2 portfolio items, 1 unverified credit, basic availability toggle |
| Pro | £9/mo | Unlimited portfolio items, unlimited credits, booking enquiry inbox, availability auto-expiry, analytics (who viewed, where from) |

Note: freelancer tiers are separate from artist tiers. An artist on the Artist tier does not automatically get freelancer features — these are distinct profile types that may exist for the same person.

---

## 10. WHAT THIS PAGE IS NOT

- Not a marketplace. There is no search ranking, no paid placement, no bidding.
- Not LinkedIn. There are no connections, no endorsements, no activity feed.
- Not SoundBetter. There are no platform fees on transactions, no review system that gatekeeps visibility.
- Not a portfolio tool for generalists. This is music-specific. Credits are linked to real releases. The ecosystem is the context.
- Not a social network. There is no follower count, no like mechanism, no algorithm.

The page exists because a credit on a real artist's ABLE profile pointed here. That is the entire discovery mechanism. Everything on the page exists to convert that traffic into a conversation.
