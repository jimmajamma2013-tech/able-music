# Solution: Banned phrases — recurring copy compliance failures
**Commits:** `0a91eb9`, `fb56213`, `e0bd543`, `4th session copy sweep`
**Date:** Multiple sessions (recurring problem)
**Files affected:** `admin.html`, `able-v7.html`, `landing.html`, `start.html`

---

## Problem

Across multiple build sessions, banned SaaS phrases kept appearing in user-facing copy — sometimes introduced by new features, sometimes inherited from placeholder text that was never updated. The most recurring violations:

1. `"Upgrade to keep growing"` — in the fan cap upgrade bar in admin.html
2. `"Turn fans into superfans"` — in landing.html feature descriptions
3. `"Convert"` — in landing.html FAQ answers
4. `"Get started!"` — in wizard CTA and landing.html free tier button
5. `"Let's get started"` — in wizard step 0 eyebrow
6. `"Sign in with Google"` button — in landing.html hero and start.html (ABLE is magic-link only)
7. `"unlock"` / `"unlocks"` — in tier gate copy and snap card lock overlay
8. `"Fan CRM dashboard"` — in landing.html pricing description

These phrases make ABLE sound like Linktree, Mailchimp, or generic SaaS. The brand requires a specific voice.

## Root cause

Three causes:
1. **Placeholder text**: Initial UI scaffolding used generic SaaS copy ("Get started", "You're all set") as placeholders. They were never replaced.
2. **Agent drift**: When AI agents add new features, they default to industry-standard copy unless explicitly constrained. The copy rules exist in CLAUDE.md and `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` but are not read unless specifically prompted.
3. **No automated check**: There was no grep/lint rule to catch banned phrases before commit.

## Solution

**Per-phrase fixes:**

| Banned | Replaced with | File |
|---|---|---|
| "Upgrade to keep growing" | "47 of 100 fans." (fan count context) | admin.html `#upgradeBarText` |
| "Get started free" (landing CTA) | "Your page is free →" | landing.html |
| "Let's get started" (wizard) | "A few details first" | start.html |
| "unlock" (snap card overlay) | "This card is for your close circle" | able-v7.html |
| "unlocks" (pre-release nudge) | "Put a release date in..." | admin.html |
| "convert" (FAQ) | Rewritten in ABLE voice | landing.html |
| "Fan CRM dashboard" (pricing) | "Broadcasts + advanced fan list" | landing.html |
| "Sign in with Google" (button) | Removed entirely | landing.html, start.html |

## Pattern

**Rule:** Before committing any user-facing copy, run the banned phrase check:
```bash
grep -rn "superfan\|Grow your\|Monetise\|Content creator\|Going viral\|Get started!\|You're all set\|unlock\|Upgrade to keep\|convert your\|Fan CRM\|Sign in with Google" able-v7.html admin.html start.html landing.html
```
Zero results = compliant.

**Rule:** When a tier gate needs copy, never say "Upgrade to [do X]". Say what the artist gets: "Reach up to 2,000 fans directly." (specific value) with a secondary "When you're ready →" (not "Upgrade").

**Rule:** The free tier CTA on landing must never feel like a lead-gen hook. "Your page is free →" states a fact. "Get started free!" makes a promise that feels like a funnel trap.

**Rule:** ABLE uses magic link auth only. If any component ever introduces a Google/Apple OAuth button — remove it. This is a permanent product decision, not a V1 scope limit.

## How to check

Run the grep above. Also check:
- Any `<button>` or `<a>` with `Upgrade` in the text — review for compliance
- Any `<a>` with `google` or `apple` in `href` or text — must not exist in auth context
- Profile page: all artist-voice copy must be first person ("I'm playing tonight", not "Artist is playing")
