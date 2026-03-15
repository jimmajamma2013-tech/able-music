# ABLE — Current Build Status
**Updated: 2026-03-15 (session 5) | Update this file at the end of every session.**

---

## Active branch
`v2-simplified`

---

## What's built and working

### able-v7.html (Artist Profile — ACTIVE)
- [x] Four themes: Dark, Light, Contrast, Glass
- [x] Hero CTA zone (max 2, accent + ghost)
- [x] Quick Action pills (max 4/6 + overflow) + owner ghost placeholder
- [x] Page state system (profile / pre-release / live / gig)
- [x] Gig mode (24hr toggle, tickets front)
- [x] Fan sign-up capture (email, stored to able_fans)
- [x] CTA click tracking (stored to able_clicks)
- [x] Page view tracking (stored to able_views)
- [x] Top card: video / artwork / embed
- [x] Music section with release cards + owner empty state
- [x] Events / bento grid + owner empty state
- [x] Merch / merch-bento-grid + owner empty state
- [x] Snap cards + owner empty state
- [x] Support section + owner empty state
- [x] Recommendations section + owner empty state
- [x] Platform pills
- [x] Accent colour system (single CSS var, artist-owned)
- [x] Identity system (applyIdentity() — data-feel CSS system)
- [x] Spring-feel motion system
- [x] Micro-interactions: B1, B3, B4, B9, B18, B19, C1, C2, C4, C5, C6, D1, D2, D5+D12, D20, E1, E4+E6, E9, E11, E15, F1+F9, F15, G1, G5, G7+E18, H1+H3, H4, H5, H9, I2, I5, I7, A4, A6, A10/D3, A11
- [x] A10/D3 platform pill entrance — horizontal wave (translateX -8px→0, 220ms, 50ms stagger)
- [x] B3/B4 CTA press flash + glow (color-mix lighter accent + ::after opacity pulse)
- [x] E11 error message delayed reveal (400ms after shake, not simultaneous)
- [x] F15 accent shimmer on artwork placeholder (loading state)
- [x] H9 pre-release ambient intensification (0.12+0.16×(1-daysLeft/14), clamped 0.12–0.28)
- [x] Tab scroll sync (I7)
- [x] A4 sticky artist bar — frosted glass, fan-view only, triggers at 70% hero scroll
- [x] A11 artist name scale compression on scroll — lerp 48px→24px over hero height
- [x] E15 email blur validation — validate on blur, clear on retype
- [x] Section header fade-in on scroll (I2)
- [x] World map (calendar view with moments)
- [x] Section ordering + visibility system
- [x] Owner-aware mode (edit bar, placeholder states vs fan view)
- [x] Made with ABLE footer + referral slug
- [x] Support note copy — explicit "0% ABLE cut, Stripe fee only" (§10 compliance)
- [x] Copy compliance: snap card lock overlay — removed "Unlock" (banned word)
- [x] C7 gig badge glow pulse confirmed (badge-glow-pulse keyframe on .hero__state-chip--gig::after)
- [x] D15 platform pill first-load shimmer confirmed (session-flagged, .pill-shimmer-once)
- [x] prefers-reduced-motion CSS throughout confirmed
- [x] touch-action: manipulation on * confirmed

### admin.html (Artist Dashboard)
- [x] Campaign HQ (page state control)
- [x] Stats view with counter animation (G14 — first load, session-flagged)
- [x] Fan list with stagger animation (D13 — first load)
- [x] Gig mode countdown bar (C16 — depletion bar with time remaining)
- [x] Snap card management (CRUD)
- [x] Connections panel
- [x] Profile identity card (genre, feel, nudges)
- [x] Section order + visibility toggles
- [x] Analytics page (top clicks, activity feed)
- [x] E3 bio char count — fades in amber at 80+ chars, red at 110+
- [x] Broadcast page (Pro tier locked)
- [x] First-run checklist (auto-dismisses when all done)
- [x] Your World moments panel
- [x] §9.1 moment 2 — pre-release trial nudge card (session-flagged, dismissible)
- [x] §9.1 moment 3 — gig mode trial nudge card (session-flagged, dismissible)
- [x] Copy compliance: fan cap CTA — removed "Upgrade to keep growing" (banned), direct artist-voice copy
- [x] Copy compliance: pre-release nudge — removed "unlocks" (banned word)
- [x] Copy compliance: export empty state — removed "get started" (banned phrase)
- [x] "0% taken by ABLE. Stripe standard fee only" in support setup flow confirmed (§10)

### start.html (Onboarding Wizard)
- [x] Pre-step 0: Spotify/music link import
- [x] Artist name, vibe/genre, accent colour
- [x] CTA type selection
- [x] Release info capture
- [x] Guided identity system (feel selection, AI vibe match)
- [x] Live preview phone (Reel slot, snap cards, music, merch)
- [x] E10 progress bar spring easing (--spring, 0.55s)
- [x] Copy compliance: wizard step 0 message — removed "Let's get started" → "A few details first"

### landing.html
- [x] Marketing landing page
- [x] Interactive proof demo phone (4 states + theme cycle)
- [x] Pricing: £0/£9/£19/£49 (correct per V6 authority)
- [x] FAQ
- [x] Links correctly to able-v7.html
- [x] Auth button fixed: magic link "Sign in →" (removed incorrect Google OAuth button)
- [x] "Most popular" badge removed from Artist pricing card (explicitly forbidden by LANDING.md)
- [x] Google OAuth hero button removed — ABLE uses magic link only (§2.7); unused CSS cleaned up
- [x] Copy compliance: free tier CTA — "Get started free" → "Your page is free →"
- [x] Copy compliance: FAQ — removed "convert" (banned word)

---

## In progress / planned next

### High priority
- [x] Fan dashboard (fan.html) — Following feed (Today/This week), Discover (Emerging/Connected/By vibe/Just dropped), Near me — copy-compliant, demo data, spec-aligned
- [x] A4/A11 sticky hero collapse + artist name compression — DONE

### Medium priority
- [ ] Supabase auth (magic link — so artists own data, not just localStorage)
- [ ] Press pack / EPK auto-generation
- [ ] Freelancer profile (freelancer.html) — spec at `docs/v6/operational/FREELANCER_SPEC.md`
- [ ] Netlify deploy + ablemusic.co DNS

### Future (Year 2+)
- [ ] PostHog analytics integration
- [ ] Email broadcasts backend (Resend)
- [ ] ABLE Distribution (white-label)
- [ ] ABLE Sync (licensing marketplace)
- [ ] Artist discovery page (non-algorithmic)

---

## Known issues
*(Add issues here as they are discovered)*

---

## Last session summary (session 5)
Deep spec research sweep of all remaining operational docs. Confirmed all Phase 1 features complete. 8 commits:
- start.html: Google/Apple OAuth removed — ABLE uses magic link only (§2.7 / V1_SCOPE.md)
- admin.html: WCAG 2.2 AA focus visibility + aria-labels on icon-only delete buttons
- admin.html: copy link 300ms accent flash per V5_RESEARCH_ADDENDUM §10
- landing.html: "Fan CRM" → "Broadcasts + advanced fan list" in pricing
- start.html: eyebrow "Let's get you set up" → "Your music"
- able-v7.html: fan limit banner exact copy per §9.1 ("Your list is full. These are 100 people...")
- landing.html: "Nothing to live page" → "Zero to live page"
- admin.html: empty states — specific ABLE voice (shows, merch, support)

Operational spec docs verified (all Phase 2+): PROFESSIONAL_DISCOVERY, DISCOVERY_DIRECTORY_SPEC, MOMENT_CALENDAR_INTEGRATION, WORLD_MAP_CROSS_PRODUCT, SHOWCASE_INTERACTION_LAYER, CLOSE_CIRCLE_SPEC, STREAMING_MOMENTS_SPEC, LIVE_MOMENTS_UI_SPEC, SHOWCASE_CAMPAIGN_MODE_SPEC.

File sizes (gzipped): able-v7.html 78kB · admin.html 45kB · start.html 31kB · landing.html 18kB · fan.html 10kB — all within 340kB budget.

## Last session summary (session 4)
Full spec compliance audit across all 4 active files against V6_BUILD_AUTHORITY.md, COPY_AND_DESIGN_PHILOSOPHY.md, LANDING.md, and V5_RESEARCH_ADDENDUM.md. 6 commits:
- landing.html: removed "Most popular" badge from Artist pricing card (LANDING.md explicit rule)
- able-v7.html: support note rewritten — explicit "0% ABLE cut, Stripe fee only" per §10
- admin.html: fan cap CTA — "Upgrade to keep growing" removed, direct artist-voice copy
- all files: copy sweep — removed "unlock", "get started", "convert", "unlocks" across all active files
- landing.html: FAQ "convert" removed, rewritten in ABLE voice
- landing.html: Google OAuth hero button removed entirely (§2.7 magic link only); unused CSS cleaned up

## Last session summary (session 3)
- admin.html: §9.1 moment 2 — pre-release trial nudge card (launches when future release date saved)
- admin.html: §9.1 moment 3 — gig mode trial nudge card (launches when gig mode activated)
- start.html: E10 progress bar fixed — now uses --spring easing (was incorrectly --ease)
- able-v7.html: A10/D3 pill entrance fixed — horizontal wave translateX(-8px)→0 (was vertical translateY)
- landing.html: removed incorrect "Sign in with Google" button — ABLE uses magic link (§2.7)

---

## Checkpoint log
| Checkpoint | SHA | What shipped |
|---|---|---|
| cp11 | a30ad33 | All owner empty states, micro-interaction polishes, pricing accuracy |
| cp10 | 47beb81 | data-feel CSS system + applyIdentity() |
| cp9 | (see git log) | |
| cp8 | (see git log) | |
| cp7 | (see git log) | |

---

## How to update this file
At the end of every build session:
1. Check off completed items
2. Add newly discovered issues
3. Update "Last session summary"
4. Update the date at the top
