# ABLE — Freelancer Auth System: Honest Audit
**Date: 2026-03-16**
**Status: Pre-build — spec complete, zero implementation**

---

## What this document is

This is the honest baseline. Every score below reflects what is actually built and running, not what is specced or planned. SPEC.md is a 530-line document. That document is not implementation. This audit treats them as separate things.

---

## Implementation scores by component

### Auth implementation: 0/10

Not built. No freelancer sign-up flow exists. No `profile_type` field is set during account creation. No `freelancer-start.html` file exists. No Supabase Auth magic link flow is configured for any user type — artists currently use localStorage; there is no magic link auth for anyone on the platform yet.

What the score means: a freelancer cannot currently create an ABLE account, log in, or maintain a session. The auth system for freelancers is zero lines of operational code.

What exists in the spec: §1 of SPEC.md has a complete and correct auth architecture decision (magic link primary, Discord optional). The decision is right. It has not been executed.

What this does not block: the artist-facing product (which uses localStorage, not Supabase Auth) can ship independently. Freelancer auth is a Phase 2 dependency.

---

### Credit verification flow: 0/10

Not built. No credit data exists in the product. No `able_credits` table exists in Supabase. No `credits` field exists on artist release cards in `admin.html`. No notification system fires when a credit is claimed or confirmed.

What the score means: the credit verification state machine (confirmed/pending/unverified) is completely unimplemented. A freelancer cannot claim a credit. An artist cannot confirm one. The trust mechanism that gives the entire freelancer system its value does not exist operationally.

What exists in the spec: §2 of SPEC.md has a complete bilateral verification flow — both freelancer-initiated and artist-initiated paths, state transitions, 30-day pending expiry, anti-abuse rate limits, and the 5-unconfirmed cap. This spec is one of the strongest parts of the system design.

Critical dependency that must be addressed before credits can be built: the artist release card in `admin.html` has no `credits` array field. This field must be added to the release data model before any freelancer joins the platform — otherwise artists build release cards without credits and a retroactive migration is required. This is a pre-work item, not a freelancer-phase item.

---

### Discord integration: 0/10

Not built. No Discord application exists in the Discord Developer Portal. No OAuth 2.0 callback route exists. No `discord_user_id` field exists in any Supabase table. No "Connect Discord" button exists in any settings UI.

What the score means: the optional Discord connection path does not exist in any form. Not the OAuth flow, not the badge, not the DM notification routing, not the server membership check.

What exists in the spec: §1.3–§1.5 of SPEC.md is technically precise — correct scopes (`identify`, `email`, `guilds.members.read`), correct 10-step OAuth flow, correct error handling, correct determination that Discord is optional enrichment not primary auth. The spec is implementation-ready. The implementation is zero.

Note on priority: Discord integration is Step 4 in PATH-TO-10.md. Steps 1–3 (magic link auth, core profile, credit verification) must be completed first. Starting Discord before credits would be building decoration before the walls are up.

---

### Profile claiming flow: 0/10

Not built. No mechanism exists for a freelancer to claim credits that have already been attributed to them by artists. No lookup by handle or display name is implemented. No notification fires when a new freelancer's registration matches existing credit references. No plain-text-to-live-link conversion exists.

What the score means: the "discovered via credits" mechanic — the primary organic acquisition vector for freelancers — is operationally absent. A freelancer cannot join ABLE and see their existing credits. The growth loop the spec relies on does not exist.

What exists in the spec: §11 of SPEC.md identifies this correctly as "not optional" and "the primary organic acquisition vector." PATH-TO-10.md Step 7 covers the discovery link implementation. Both are correct. Neither is built.

Dependencies: profile claiming requires (1) freelancer auth to exist, (2) a `credits` array on artist release cards, and (3) a lookup mechanism (handle or fuzzy display name match). None of these three prerequisites exist.

---

### Magic link setup: 0/10 — not configured

Not configured. Supabase Auth is available (the project exists: `jgspraqrnjrerzhnnhtb.supabase.co`) but magic link email authentication is not enabled or tested for any user type. The current product uses localStorage exclusively, not Supabase sessions.

What the score means: the Supabase project exists and could support magic link auth. The auth flow has not been configured, the email templates have not been set, the redirect URLs have not been registered, and no user-facing UI for magic link sign-in exists anywhere in the product.

What needs to happen before this becomes 1/10: enable email magic link in Supabase Auth dashboard, set the redirect URL (`ablemusic.co/auth/callback`), configure the email template (subject: "Sign in to ABLE"), and write the `handleAuthCallback()` function in at least one page. This is approximately 2 hours of work. It unblocks everything else.

---

## The dependency chain (what must be built in what order)

The spec is correct that freelancer auth requires artist adoption of credits first. Here is the exact build order, starting from today:

```
NOW (before freelancers are invited):
1. Add credits[] array to artist release data model in admin.html
   — even as plain text strings ["Maya Beats", "Sable"]
   — this costs 2 hours now and avoids a migration later
   — without this, every release card built before freelancers join has no credit field

PHASE 2 START (when Supabase auth is being built):
2. Enable Supabase magic link auth for artists first
   — one auth system for all user types
   — artist onboarding migrates from localStorage to Supabase session
   — this is the prerequisite for any Supabase-backed auth

3. Add profileType: 'freelancer' to Supabase account creation
   — wizard branches at "I'm an artist" / "I'm a creative professional"
   — freelancer-start.html (5 steps per SPEC.md §8)
   — freelancer profile schema in Supabase (separate from artist schema)

4. Build credit claim flow
   — freelancer enters handle → system searches credits[] on release records
   — pending state created → artist notification
   — artist confirms/denies → state update

5. Build artist credit-adding UI in admin.html
   — releases section gains "Add credit" search field
   — name → ABLE handle lookup → if on ABLE, link. If not, plain text.
   — this is artist-side work but required before freelancer credit claims have matching records

6. Build profile claiming (plain text → live link conversion)
   — on freelancer account creation, scan existing release credits for name matches
   — notify freelancer of any matches → they confirm
   — links go live on artist release cards

7. Discord OAuth (optional, after 1–6 are solid)
8. Premium tier + booking deposits (Phase 3)
```

This order is non-negotiable. Attempting to build Discord before magic link auth, or credit claiming before the `credits[]` field exists on releases, will create either broken flows or expensive migrations.

---

## Summary scorecard

| Component | Score | Primary gap |
|---|---|---|
| Auth implementation | 0/10 | Not built — magic link not configured |
| Credit verification flow | 0/10 | Not built — no credits data model, no notification system |
| Discord integration | 0/10 | Not built — no Discord app, no OAuth callback, no badge |
| Profile claiming flow | 0/10 | Not built — no handle lookup, no plain-text-to-link conversion |
| Magic link setup | 0/10 | Not configured — Supabase project exists, auth not enabled |

**System aggregate: 0/10 implementation, 9/10 specification**

The spec (SPEC.md + PATH-TO-10.md + FINAL-REVIEW.md) is one of the most complete system designs in the ABLE codebase. The execution is zero. This is the correct state for a Phase 2 system — but it means the system's overall score (spec × execution) is closer to 2–3/10 until implementation begins.

The single most valuable pre-work action: add the `credits[]` array to the artist release data model today, before more release cards are created without it. This is the only step in the build order that has a time-sensitive window — everything else can wait until Phase 2 begins.
