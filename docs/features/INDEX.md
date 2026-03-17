# ABLE — Feature Index
**Last updated: 2026-03-16**

> One file per feature. Each file covers: what it is, how it works, current status, files touched, and spec reference.
> V1 = required for warm-network launch. Phase 2 = post-launch.

---

## V1 Launch Features

| # | Feature | File | Status |
|---|---|---|---|
| 1 | Campaign States | [campaign-states.md](campaign-states.md) | ✅ Built |
| 2 | Fan Capture & Sign-up | [fan-capture.md](fan-capture.md) | ✅ Built — form unification needed |
| 3 | Confirmation Email | [confirmation-email.md](confirmation-email.md) | ✅ Built — env var must be set |
| 4 | Artist Profile Page | [artist-profile.md](artist-profile.md) | ✅ Built |
| 5 | Admin Dashboard | [admin-dashboard.md](admin-dashboard.md) | ✅ Built |
| 6 | Onboarding Wizard | [onboarding-wizard.md](onboarding-wizard.md) | ✅ Built |
| 7 | Analytics | [analytics.md](analytics.md) | ✅ Built — tracker placement fix needed |
| 8 | Snap Cards | [snap-cards.md](snap-cards.md) | ✅ Built |
| 9 | Shows & Events | [shows-events.md](shows-events.md) | ✅ Built |
| 10 | Quick Action Pills | [quick-actions.md](quick-actions.md) | ✅ Built |
| 11 | Gig Mode & QR | [gig-mode.md](gig-mode.md) | ✅ Built |
| 12 | Theme System | [theme-system.md](theme-system.md) | ✅ Built |
| 13 | Social Sharing / OG | [social-sharing.md](social-sharing.md) | ⚠️ og-default.jpg missing |
| 14 | Day 1 Share Card | [day1-share-card.md](day1-share-card.md) | ✅ Built |
| 15 | Spotify Import | [spotify-import.md](spotify-import.md) | ⚠️ Partial — prefetch only |
| 16 | Tier Gates | [tier-gates.md](tier-gates.md) | ⚠️ Specced, partially built |

## Phase 2 Features

| # | Feature | File | Status |
|---|---|---|---|
| 17 | Fan Dashboard | [fan-dashboard.md](fan-dashboard.md) | 🔄 Spec complete, build started |
| 18 | Fan Feed (Following view) | [fan-feed.md](fan-feed.md) | 🔄 Spec complete — requires Supabase for multi-artist |
| 19 | Artists & Professionals I Recommend | [artists-i-recommend.md](artists-i-recommend.md) | 📋 Specced — seeded by Spotify import |
| 20 | Launch Squad | [launch-squad.md](launch-squad.md) | 📋 Specced — requires fan list + email broadcasts |
| 21 | Close Circle | [close-circle.md](close-circle.md) | 📋 Spec complete, not built |
| 22 | Freelancer Layer | [freelancer-layer.md](freelancer-layer.md) | 📋 Spec complete, not built |
| 23 | Discovery / Directory | [discovery.md](discovery.md) | 📋 Concept only |
| 24 | PWA | [pwa.md](pwa.md) | 📋 Spec complete, not built |
| 25 | Supabase Backend | [supabase-backend.md](supabase-backend.md) | 📋 Schema ready, not wired |
| 26 | Email Broadcasts | [email-broadcasts.md](email-broadcasts.md) | 📋 Spec complete, not built |

---

## Status key

| Symbol | Meaning |
|---|---|
| ✅ Built | Working in live code |
| ⚠️ Partial | Exists but has known gaps |
| 🔄 In progress | Being built now |
| 📋 Specced | Documented, not yet in code |
