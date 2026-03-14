# ABLE V1 — Scope, Priorities, and Exclusions
**Status: ACTIVE — single source of truth for what is in v1.**
**Last updated: 2026-03-14**

*Replaces the scattered "Deferred to Phase 2" sections across individual engine specs.*

---

## What v1 is

V1 is the version that ships. It is complete enough to be genuinely useful to a real artist, beautiful enough to be their primary link-in-bio, and controlled enough to be maintainable by a small team.

V1 is not a demo. V1 is not a beta. V1 is a real product with real limits — and those limits are a feature, not a compromise.

---

## Build status — able-v6.html (as of 2026-03-14)

| Component | Status | Commit |
|---|---|---|
| Design system (7 vibes × 4 themes × 4 feel quadrants) | Complete | `47beb81` |
| Campaign state machine (profile / pre-release / live / gig) | Complete | `d0169e3` |
| State 4 (near-future): ≤7d hero chip | Complete | `04f5476` |
| CTA zone architecture (3 zones, caps, dedupe) | Complete | `ae19721` |
| §7.2 Phase 1 interactions (17 must-builds) | Complete | `69193bf` |
| §7.1 animation rule compliance | Complete | `7d2acd1` |
| Hero artwork blur-up | Complete | `69193bf` |
| Card bloom (rAF + IntersectionObserver) | Complete | `69193bf` |
| Fan capture + localStorage schema | Complete | `12a273a` |
| Artist World Map (public profile) | Complete | `2a426b9` |
| Artist World Map (admin "Your World") | Complete | `2a426b9` |
| Artist World Map (landing demo) | Complete | `2a426b9` |
| Close Circle — surface layer (hero entry, join sheet, lock-ring dots) | Complete | `37a6073` |
| Guided Identity — `data-feel` CSS system + `applyIdentity()` | Complete | `47beb81` |
| Admin theme persistence | Complete | `7d2acd1` |

---

## V1 feature set — what is in

### Artist profile (`able-v6.html`)
- 7 genre vibes × 4 themes × 4 feel quadrants — full identity system
- Campaign state machine — profile / pre-release / live / gig / near-future
- Hero: artwork / video / embed top card; artist name; state chip; bio strip
- 3 CTA zones (Hero max 2, Quick Actions max 6, Section Actions max 2 each)
- Platform pills (up to 8, horizontal scroll)
- Fan capture with GDPR double opt-in (screenful 3 placement)
- Listen section (Spotify / SoundCloud / YouTube embeds)
- Shows section (manual entry; geo-aware surfacing; smart expiry)
- Snap cards (horizontal scroll; up to 6)
- Merch section (with or without image; price overlay)
- Support packs (Stripe Connect; 0% ABLE cut)
- Credits (collapsed accordion)
- Recommendations (artist picks; max 5)
- Artist World Map (month grid; 8 moment types; 4 access tiers; half-sheet panel)
- Close Circle entry point (hero tertiary link + supporter gate)
- Guided Identity System (genre + feel + moment auto-compute)
- Footer ("Made with ABLE" on free; hidden on paid)
- All 17 Phase 1 micro-interactions
- WCAG 2.2 AA compliance across all themes + vibes

### Admin dashboard (`admin.html`)
- Campaign HQ (state control, release date, gig toggle)
- Profile Identity card (genre, feel, AI nudge buttons, mini-preview)
- Theme switcher (persistence via `data-theme`)
- Fan list (email, timestamp, source, confirmed status)
- Analytics (click events, view events, source breakdown)
- "Your World" moment map (admin view of World Map)
- QR code generator (accent-coloured, PNG download)
- Snap cards CRUD — **Phase 2** (admin UI; profile renders from localStorage for now)

### Onboarding (`start.html`)
- 5-step wizard: name + vibe → feel → colour → theme → CTA
- Saves `profile.identity` alongside `able_v3_profile`
- Live preview updates as artist steps through

### Landing page (`landing.html`)
- World Map demo state
- Feel quadrant cycling demo (3-state crossfade)
- Honest pricing section (£0 / £9 / £19 / £49)

### Backend (Supabase — ships with v1)
- Magic link auth
- `profiles`, `fans`, `events`, `releases`, `merch`, `clicks`, `snap_cards`, `credits` tables
- localStorage → Supabase 1:1 key map (flush-and-sync migration)
- Stripe Connect for artist payouts
- Resend for transactional email (double opt-in, broadcasts)
- Netlify for static hosting + edge functions

---

## Phase 2 — what comes next (ordered by priority)

### High priority (ships soon after v1)
1. **Snap cards CRUD in admin** — artists can create/edit/delete snap cards without code
2. **Supabase auth + read path** — live profiles from database, not localStorage
3. **Email broadcasts** — Artist Pro tier, Resend delivery, double opt-in list
4. **Custom domains** — `artist.com` → `able.fm/artist` (CNAME)
5. **Fan dashboard (fan.html)** — fans see artists they follow, upcoming shows, new drops
6. **Close Circle payments** — Stripe subscription for supporter tier
7. **Showcase / Campaign Mode** — shareable campaign objects, press mode
8. **Onboarding feel step wiring** — profile.identity.feel applied to live preview in start.html

### Medium priority
9. **Multi-genre blend** — second genre at reduced weight in identity system
10. **Admin feel picker** — inline feel change without going back to onboarding
11. **Linktree importer** — paste Linktree URL, auto-populate platforms
12. **Mailchimp / Kit export sync** — one-way fan list export
13. **Secondary accent colour** — Artist tier
14. **Background image / gradient editor** — Artist tier
15. **Globe heatmap analytics** — where fans are coming from, geographically
16. **Setlist mode** — at-gig display for set list, integrates with Shows section
17. **Saved style variants (3)** — Artist Pro
18. **Campaign-specific styles** — Artist Pro

### Later
19. **Fan feed** — in-app feed of artist activity for fans
20. **Professional / freelancer profile layer** — credits, rate card, portfolio, booking
21. **Press pack** — `able.fm/name/press` with downloadable assets
22. **Story Mode** — video assembly from moments
23. **Rooms / Stage Can** — fan community, tipping
24. **Ablers referral programme** — needs subscriber base first
25. **Custom artist sending domains** — Phase 2+
26. **Social commerce (Fourthwall / Shopify connect)** — external link cards only in v1
27. **Printful POD integration** — Phase 3
28. **Cloudflare edge migration** — Phase 2 infrastructure (D1 + Workers + R2)
29. **Velocity leaderboard / discovery** — needs user base
30. **Skeleton loading system (hero/CTAs/bio)** — §7.2 #5 — deferred from v1

---

## Never — what will not be built (regardless of phase)

These are not "later." They are the things ABLE is explicitly not.

| Not building | Why |
|---|---|
| Open CSS editor | Kills coherence of the identity system |
| Arbitrary font upload | The vibe system IS the font system |
| Full colour palette editor (unlimited) | One accent colour is the design |
| AI-generated layouts | Structure stays fixed |
| "Surprise me" random generation | Artists want intention, not randomness |
| Per-section style overrides | Identity is whole-profile |
| Animation speed sliders | Personality is not configurable at that level |
| Engagement analytics (likes, comments) | ABLE is not a social platform |
| Public artist rating or review system | Trust safety + anti-gaming |
| Fan direct messages | Not a messaging platform |
| Fan gamification / leaderboards | Not a loyalty points scheme |
| Pay-per-post fan content | The relationship model is not paywall-first |
| "Going viral" anywhere in copy | Ever |

---

## V1 engine scope (quick reference)

| Engine | V1 | Phase 2 |
|---|---|---|
| Moment Engine | campaign states, world map, near-future bridge | streaming moments (live now), big calendar full UI |
| Guided Identity | genre + feel + moment + AI nudges | multi-genre, custom font pairing, per-campaign style |
| Close Circle | hero entry, join sheet, locked world map cells, supporter gate | Stripe subscription, dispatches, replay access |
| Showcase | spec complete | full implementation |
| Credits / Pro | artist-side credits display | freelancer profiles, professional discovery |
| Fan Product | fan capture, fan list, basic analytics | fan dashboard, broadcasts, superfan scoring |

---

## The decision standard for scope questions

When something new is proposed, apply this test in order:

1. Does it contradict `PRODUCT_TRUTH.md`? → It's out.
2. Does it require architecture not yet built? → Phase 2 at earliest.
3. Can the product launch without it? → If yes, probably Phase 2.
4. Does it make free-tier profiles look better without unlocking paid gates? → Probably V1.
5. Does it make the product harder to explain? → Phase 2 or never.

---

*This document is updated after each checkpoint. It is the complete V1 contract.*
