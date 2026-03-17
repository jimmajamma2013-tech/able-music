# ABLE Surface — Admin Dashboard (`admin.html`)
**Status: ⛔ SUPERSEDED — DO NOT USE FOR BUILD DECISIONS**
**Last updated: 2026-03-14 | Superseded: 2026-03-15**

> **This document is superseded by `docs/pages/admin/DESIGN-SPEC.md`.**
> The V8 strategy process produced a 9.7/10 complete build spec. Use that.
> This file is retained for historical reference only.

---

*How product engines translate into the artist admin dashboard.*

---

## What this surface is

Where the artist manages everything. They land here after onboarding and after every session. The admin is a separate file (`admin.html`) in V1 — the spec notes a future direction of admin-as-slide-up-panel on the same page, which is Phase 2.

Design language: Plus Jakarta Sans (body), Barlow Condensed (display), `--acc: #f4b942` amber admin accent. Different from the artist profile's tokens — intentionally.

---

## Sections and engine ownership

| Section | Engine | V1 status |
|---|---|---|
| Campaign HQ | Moment Engine | Complete |
| Profile Identity card | Guided Identity | Complete (`admin.html` — implementation plan written) |
| "Your World" moment map | Moment Engine + Close Circle | Complete |
| Fan list | Fan Product | Complete |
| Analytics (clicks, views, sources) | Fan Product | Complete |
| Theme switcher | Guided Identity | Complete |
| QR code generator | Fan Product | Complete |
| Snap cards CRUD | — | Phase 2 |
| Broadcast composer | Fan Product (Artist Pro) | Phase 2 |
| Close Circle admin panel | Close Circle | Phase 2 (payment wiring) |
| Connections (Spotify, YouTube) | — | Phase 2 |

---

## Campaign HQ

The most important section. Controls what state the profile is in.

- State selector: profile / pre-release / live / gig
- Release date picker (drives auto-switch between pre-release → live → profile)
- Gig mode toggle (24hr, auto-expires via `able_gig_expires` timestamp)
- Live preview: shows current profile state at a glance

State machine is defined in `engines/MOMENT_ENGINE.md`. Admin controls `profile.stateOverride` and `profile.releaseDate`.

---

## Profile Identity card

After Campaign HQ. Reads `profile.identity` from localStorage.

- Genre: current vibe label + "Change →"
- Feel: current quadrant label ("Bold and refined") + "Change →"
- 5 nudge buttons: Darker / More space / Softer / Bolder / Warmer
- Nudge usage: Free = 3 total uses (tracked in `able_nudge_uses`); Artist+ = unlimited
- Mini-preview strip (390×180px cropped hero render, updates on nudge)

Implementation plan: `docs/superpowers/plans/2026-03-14-guided-identity-onboarding.md`

---

## Theme switcher

Chip bar: Dark / Light / Glass / Contrast. Selection persists to `profile.theme`. Live preview updates on tap. Implementation complete — `data-theme` on shell element, hydrated from `able_v3_profile.theme`.

---

## "Your World" moment map (admin view)

The artist's view of their World Map — can add, edit, and remove moments. Different from the public-facing World Map (read-only, fan-facing).

- `ywInit()` and `ywRenderMomentList()` functions in `admin.html`
- Shows moment access levels, edit state, active/inactive toggle

---

## Copy rules (admin-specific)

- Greetings: "Good to see you, [Name]." — warm, one beat, done
- No exclamation marks on dashboard copy
- No generic SaaS micro-copy ("You're all set!", "Get started!")
- Stats copy: specific and honest ("87 people tapped your Spotify link. 14 in the last 24 hours.")
- Upgrade prompts: always state the specific value ("You have 23 fans in Manchester. Upgrade to see who they are before your show there.")

Full copy register: `core/COPY_AND_DESIGN_PHILOSOPHY.md`
