# ABLE — Current Build Status
**Updated: 2026-03-15 (session 2) | Update this file at the end of every session.**

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
- [x] Micro-interactions: B1, D1, D2, C1, F1+F9, E1, E4+E6, G1, G7+E18, C2, C6, A6, D5+D12, E9, G5, H1+H3, H4, C4, C5, D20, I5, I7, H5, B19, B9, A4, A11, E15
- [x] Tab scroll sync (I7)
- [x] A4 sticky artist bar — frosted glass, fan-view only, triggers at 70% hero scroll
- [x] A11 artist name scale compression on scroll — lerp 48px→24px over hero height
- [x] E15 email blur validation — validate on blur, clear on retype
- [x] Section header fade-in on scroll (I2)
- [x] World map (calendar view with moments)
- [x] Section ordering + visibility system
- [x] Owner-aware mode (edit bar, placeholder states vs fan view)
- [x] Made with ABLE footer + referral slug

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

### start.html (Onboarding Wizard)
- [x] Pre-step 0: Spotify/music link import
- [x] Artist name, vibe/genre, accent colour
- [x] CTA type selection
- [x] Release info capture
- [x] Guided identity system (feel selection, AI vibe match)
- [x] Live preview phone (Reel slot, snap cards, music, merch)

### landing.html
- [x] Marketing landing page
- [x] Interactive proof demo phone (4 states + theme cycle)
- [x] Pricing: £0/£9/£19/£49 (correct per V6 authority)
- [x] FAQ
- [x] Links correctly to able-v7.html

---

## In progress / planned next

### High priority
- [ ] Fan dashboard (fan.html) — spec at `docs/v6/operational/FAN_DASHBOARD_SPEC.md` — Phase 12
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

## Last session summary
- able-v7.html: A4 sticky artist bar (frosted glass, fan-view, 70% hero trigger), A11 name compression (lerp 48→24px), E15 blur validation
- able-v7.html: fixed pop vibe --ls-d 0.04em → 0.03em per V6_BUILD_AUTHORITY §3.1
- admin.html: E3 bio char count — hidden until 80+ chars, amber→red colour ramp

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
