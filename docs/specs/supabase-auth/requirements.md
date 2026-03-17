# Supabase Auth — Requirements
**Feature:** Magic link authentication for artists
**Status:** Draft
**Priority:** High — pre-launch blocker (artists must own their data, not just localStorage)
**Authority:** CONTEXT.md §Supabase · docs/systems/data-architecture/SPEC.md

---

## Context

Currently all artist data lives in localStorage on the artist's device. This means:
- Artists lose their profile if they clear storage or switch devices
- No multi-device access (can't edit on laptop, check stats on phone)
- No way to verify an artist owns a profile (any device can impersonate)
- Fan data (able_fans) is locked to one browser — no backup if device is lost

Supabase magic link auth solves all of this. An artist proves ownership of an email address — once. All data then persists server-side under their account.

ABLE uses **magic link only** — no passwords, no Google OAuth. This is an explicit product decision (CLAUDE.md §2.7, V6_BUILD_AUTHORITY.md). Never introduce OAuth.

---

## Requirements (EARS format)

### Authentication

**REQ-01:** When an artist clicks "Sign in" on admin.html, the system shall send a magic link to their email address via Supabase Auth.

**REQ-02:** When an artist clicks their magic link, the system shall establish a session and redirect to admin.html.

**REQ-03:** When a session is active, the system shall persist the session across page reloads and browser restarts (using Supabase's built-in session persistence).

**REQ-04:** When a session expires, the system shall silently prompt re-authentication without clearing artist data.

**REQ-05:** When an artist signs out, the system shall end their Supabase session but NOT clear localStorage (data persists as fallback).

### Data migration

**REQ-06:** When an artist signs in for the first time on a device, the system shall flush all localStorage data to Supabase tables (one-time migration).

**REQ-07:** When an artist signs in on a second device, the system shall pull their Supabase data into localStorage (replacing any stale local data).

**REQ-08:** The migration shall map each localStorage key to its Supabase table row 1:1 per the mapping in CONTEXT.md.

### Profile ownership

**REQ-09:** When a fan visits `ablemusic.co/[handle]`, the system shall serve the artist's profile data from Supabase (not the visitor's localStorage).

**REQ-10:** When an artist has no active session and visits admin.html, the system shall show a sign-in prompt. Existing localStorage data shall be preserved and shown as a preview.

### Error handling

**REQ-11:** When Supabase is unreachable, the system shall fall back to localStorage silently for reads. Writes shall be queued and retried when connectivity resumes.

**REQ-12:** When magic link email fails to send, the system shall display a specific error message. It shall NOT silently fail.

---

## Out of scope (V1)

- Google / Apple OAuth — ABLE is magic-link only, permanently
- Team access (multiple artists on one account) — Label tier, post-launch
- Password reset — not applicable (magic link has no password)
- Two-factor authentication — Phase 2
- Admin-level artist impersonation — Platform admin, Phase 2

---

## Acceptance criteria

- [ ] Artist can sign in from admin.html using only their email address
- [ ] Artist data persists after clearing localStorage (Supabase is source of truth)
- [ ] Artist can sign in on a second device and see the same data
- [ ] `able-v7.html` reads profile data from Supabase when auth is active
- [ ] localStorage fallback works when Supabase is unreachable
- [ ] No Google OAuth button appears anywhere
- [ ] Magic link email is sent via Supabase (not custom Netlify function)
- [ ] Session persists across page reloads
