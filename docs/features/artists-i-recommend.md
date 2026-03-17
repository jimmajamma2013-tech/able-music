# Feature: Artists & Professionals I Recommend
**Status: 📋 Specced — needs full design treatment | Phase 1.5 (partial) / Phase 2 (full)**

---

## What this feature actually is

Two distinct sub-features that live together on the artist's profile page under a single section:

1. **Artists I'm into** — other musicians the artist publicly endorses. Personal taste, not algorithmic. "These are the artists I think you should know about."

2. **People I work with** — producers, mixers, photographers, videographers the artist has worked with and vouches for. Professional trust, not a directory listing.

Together they do something no other link-in-bio tool does: they position the artist as a node in a community, not an isolated page. An artist who recommends others is more trusted than one who only promotes themselves. And every recommendation is a discovery path for the fan.

---

## Why this needs to be 10/10

This feature is structurally important for three reasons:

**1. Discovery flywheel.**
Fan follows Artist A → sees Artist A recommends Artist B → taps through to Artist B's ABLE page → follows Artist B. That is organic, peer-endorsed discovery. It does not require an algorithm. It does not require ABLE to run ads. It compounds naturally as more artists are on the platform.

**2. Freelancer acquisition mechanic.**
The "People I work with" strip is the entire freelancer onboarding funnel. A producer who has worked with 5 artists on ABLE but hasn't joined yet sees their name as plain text on 5 profiles. The moment they join and confirm their credits, all 5 become live links. The asymmetry (confirmed = live link, unconfirmed = plain text) is what creates the incentive. This must be maintained by design — never automatically make unconfirmed credits into links.

**3. Artist positioning.**
An artist who publicly endorses collaborators and peers is implicitly telling their fans: I am part of something. This is culturally important in independent music. Being connected is a form of credibility. ABLE should make that visible without requiring artists to manage it manually.

---

## The section design (profile page view)

### Visual structure

```
┌─────────────────────────────────────────────────────┐
│  People worth knowing                                │
│                                                      │
│  [Avatar] Maya Beats                [Follow →]       │
│           Electronic producer · London               │
│                                                      │
│  [Avatar] Tendai                    [See page →]     │
│           Soul / R&B · Birmingham                    │
│                                                      │
│  ────────────────────────                            │
│                                                      │
│  [Avatar] Jamie Ennals              [See page →]     │
│           Mix engineer                               │
│           → worked on: Echoes, Before the Rain       │
└─────────────────────────────────────────────────────┘
```

**Section heading options (artist chooses):**
- "People worth knowing"
- "Artists I rate"
- "People I work with"
- "The team" (for more collaborative artists)

The section heading is editable. It should feel like the artist wrote it, not like a platform label.

### Card design

Each card:
- Artist accent left border (3px) — for artists, uses their own ABLE accent colour. For professionals, uses the current artist's accent.
- Avatar (40×40px, `border-radius: 8px`) — pulls from ABLE profile or Spotify/Last.fm
- Name (fw-medium, 15px)
- Role or genre + city (fw-regular, 13px, text-2)
- Release credits for professionals: "→ worked on: [release names]" (13px, text-3) — max 2 releases shown
- CTA: "Follow on ABLE →" (if fan is viewing) or "See their page →" — uses artist's accent colour

### Confirmed vs unconfirmed (professional cards only)

| State | Visual | CTA |
|---|---|---|
| Confirmed (pro has ABLE profile) | Full card with avatar + live link | "See their profile →" |
| Unconfirmed (pro not on ABLE yet) | Name + role only, no avatar, no link | No CTA — plain text |

The unconfirmed state is intentionally minimal. It shows the credit honestly without implying a profile exists. When the professional joins and confirms, it upgrades automatically.

---

## How recommendations are sourced

### Artists

**Seeded from:** Spotify related artists API during wizard import — pre-populated as suggestions the artist can confirm or remove.

**Manually added:** Artist can add by ABLE handle or Spotify URL. Search-as-you-type against artists already on ABLE. If not on ABLE, can still add their Spotify profile — shows as "Not on ABLE yet" with a quiet invite prompt.

**Mutual endorsement signal (Phase 2):** If Artist A recommends Artist B and Artist B recommends Artist A, both profiles show the connection. Not surfaced visually as "mutual" but creates a stronger edge in the discovery graph.

### Professionals

**Seeded from:** Credits on the artist's releases. When an artist adds a release and credits a producer, that credit automatically generates a potential professional card.

**Confirmed via:** The professional joins ABLE and claims the credit. They see "You've been credited by [Artist] — confirm this credit to get a live link on their profile."

**Manual addition:** Artist can add a professional directly by name, role, and (optionally) ABLE handle or website.

---

## What the fan does with this section

**Follow flow:** Fan sees an artist card → taps "Follow on ABLE →" → either goes to artist's ABLE profile directly (if they have one) or to fan.html with a "New artist discovered" prompt.

**Professional discovery:** Fan sees a producer credit → taps "See their profile →" → lands on the producer's freelancer profile. This is not something fans typically look for, but music-interested fans who care about the craft will follow these links. Over time, a producer's profile gets fan followers who are drawn to their aesthetic.

---

## Admin management

### Artist side

```
Connections tab in admin
├── Artists I recommend
│   ├── [confirmed artists — live on profile]
│   ├── [pending invites — "invited to ABLE"]
│   └── [+ Add artist] (search ABLE or Spotify)
└── People I work with
    ├── [confirmed professionals — live link on profile]
    ├── [unconfirmed credits — plain text on profile]
    └── [+ Add credit] (name, role, release)
```

### Professional side (in their freelancer admin)

```
Credits tab
├── Confirmed credits (live links on artist profiles)
├── Pending credits (waiting for confirmation)
└── Incoming: "[Artist] credited you on [Release] — confirm?"
```

---

## Storage schema

```javascript
// In able_v3_profile
connections: {
  artists: [
    {
      ableHandle: string,        // null if not on ABLE
      spotifyId: string,
      name: string,
      genre: string,
      city: string,
      accent: string,            // their ABLE accent
      confirmed: boolean,        // artist confirmed this recommendation
      addedTs: number,
    }
  ],
  professionals: [
    {
      ableHandle: string,        // null if not on ABLE
      name: string,
      role: string,              // 'producer' | 'mixer' | 'photographer' | 'videographer' | string
      releases: [string],        // release titles they worked on
      confirmed: boolean,        // professional has joined ABLE and claimed credit
      addedTs: number,
    }
  ]
}
```

---

## Phase classification

**Partial Phase 1.5 (can ship with V1 as a simple version):**
- Artist manually adds other ABLE handles they want to feature
- Plain display: name + genre + "See their page →"
- No Spotify seeding, no credit confirmation system
- Value: positions the artist as connected, creates organic discovery paths

**Full Phase 2 (requires freelancer layer + Spotify import):**
- Spotify seeding of related artists
- Credit confirmation system for professionals
- Confirmed vs unconfirmed visual distinction
- Mutual endorsement graph

The Phase 1.5 version is a simple content block. The Phase 2 version is a discovery and acquisition engine.

---

## Copy register

- Section heading: written in the artist's voice, not platform language
- Professional card: "→ worked on: Echoes, Before the Rain" — conversational, not "Credits: Echoes"
- Empty state: "Add the artists you rate and the people you work with. It helps fans discover their world through yours."
- Invite prompt (for non-ABLE artists): "They're not on ABLE yet — want to invite them?" — quiet, one line, not aggressive

---

## Spec reference

`docs/V8_BUILD_AUTHORITY.md` §2 — Spotify import seeding
`docs/reference/research/DISCOVERY_AND_GROWTH.md` — organic discovery via credits
`CLAUDE.md` — freelancer acquisition mechanic (§3 Freelancer journey)
`docs/pages/profile/DESIGN-SPEC.md` — profile section architecture
