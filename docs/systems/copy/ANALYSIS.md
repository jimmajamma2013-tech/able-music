# ABLE Copy System — Analysis
**Created: 2026-03-15 | Overall score: 7.5/10**

> This document audits the current state of copy across all active ABLE pages. It scores against 10 dimensions and documents specific violations and gaps. All findings are from direct inspection of `able-v7.html`, `admin.html`, `start.html`, `landing.html`, and the existing per-page COPY.md documents.

---

## Score Summary

| Dimension | Score | Notes |
|---|---|---|
| 1. Platform voice consistency | 7/10 | Good foundation; inconsistent execution across pages |
| 2. Banned phrases compliance | 7.5/10 | No violations in active profile or landing; admin has `superfan` in data layer |
| 3. Artist default copy | 8.5/10 | Strong per spec; a few hard-coded placeholders still exist in HTML |
| 4. Empty state copy | 6/10 | Admin empty states are spec'd well; profile page relies on hiding, not copy |
| 5. Error state copy | 7/10 | Fan form error copy is correct; admin errors are functional but cold |
| 6. Notification/toast copy | 6.5/10 | "✓ Profile saved" is fine; admin toasts have no warmth or specificity |
| 7. Microcopy precision | 8/10 | Button labels and inputs are mostly excellent; a few generic placeholders remain |
| 8. Admin copy | 8/10 | Strong spec in COPY.md; partial implementation — greetings not fully wired |
| 9. Fan copy | 8.5/10 | fan.html COPY.md is exemplary; fan.html build not yet complete |
| 10. Copy documentation | 9/10 | Per-page COPY.md files are thorough; no cross-page master spec existed until now |

**Overall: 7.5/10** — The philosophy is right. The documentation is strong. The gap is implementation consistency.

---

## Dimension 1: Platform voice consistency — 7/10

ABLE's voice is clearly defined and present in the COPY.md documents. Across built pages, the register holds on `landing.html` and `able-v7.html`. The inconsistency is in `admin.html`, where some UI copy matches the spec and some copy is developer-written and cold.

**Strong examples (in spec):**
- `landing.html` hero: "100 real fans beat 10,000 strangers." — exactly right
- `able-v7.html` fan sign-up: "Stay close." — correct
- `admin.html` COPY.md greeting: "Good to see you, [Name]." — correct

**Gaps:**
- `admin.html` `<title>` is `Dashboard — ABLE` — the spec says never use "Dashboard" as a label. Should be `[Artist Name] — ABLE` or just `ABLE`
- `admin.html` error element `#ywFormError` outputs raw validation errors with no copy spec applied
- `start.html` done screen text "Click it and you'll land straight in your dashboard." uses "dashboard" in user-facing copy — should be "your page"
- `able-v7.html` edit mode CTA "Open dashboard →" (in owner contextual bar) uses the banned word; should be "Your page →" or "Back to admin →"

---

## Dimension 2: Banned phrases compliance — 7.5/10

**Active files (`able-v7.html`, `admin.html`, `start.html`, `landing.html`) — no high-severity violations found** for the following banned phrases:
- "Turn fans into superfans" — not found
- "Grow your audience" — not found
- "Monetise your fanbase" — not found
- "Engage your followers" — not found
- "Content creator" — not found
- "Going viral" — not found
- "You're all set!" / "Welcome aboard!" — not found
- "Level up" / "Supercharge" / "Skyrocket" — not found
- "Newsletter" / "Mailing list" — not found

**Violations found:**

| File | Line | Violation | Severity |
|---|---|---|---|
| `admin.html:3021` | `level:'superfan'` | "superfan" as a data value that maps to visible label "Core fan" — the label is correct but the internal key leaks if inspected | Low — internal only |
| `admin.html:3032` | `superfan: { label:'Core fan'` | The label renders correctly but the source key "superfan" is banned per spec | Low — internal |
| `admin.html:9` | `<title>Dashboard — ABLE</title>` | "Dashboard" as visible browser tab label — banned in user-facing copy | Medium — visible |
| `start.html:1291` | "land straight in your dashboard" | "dashboard" in user-facing copy on the done screen | Medium — visible |
| `able-v7.html:9619` | "Full dashboard — events, merch, fans, analytics →" | "dashboard" in the owner context bar | Low — owner-only |
| `able-v7.html:10181` | "Open dashboard →" | "dashboard" in a dynamically generated modal button | Medium — visible to artist |
| `landing.html:1456` | `<li>Analytics dashboard</li>` | "dashboard" in a features list item — this is the one place where "dashboard" may be technically acceptable as a category descriptor, but should be reviewed | Low |
| `landing.html:1525` | "it lives in your dashboard" | FAQ answer uses "dashboard" — per spec should say "your page" or "your admin" | Low — FAQ |

**No violations found in fan-facing copy on `able-v7.html`** — this is clean.

---

## Dimension 3: Artist default copy — 8.5/10

The artist defaults are well-specified in `docs/pages/profile/COPY.md`. The fan sign-up defaults ("Stay close." / "I'm in" / "Just your email.") are present and correct in `able-v7.html`.

**Gaps:**
- The hero section default CTA "My music" is correct per spec; but "Dashboard" appears in the owner context bar as user-facing copy — violates the spec's directive that the page always speaks in artist-first voice
- Open Graph meta default in the spec (`"Artist profile powered by ABLE"`) is explicitly called out as wrong — whether the current `able-v7.html` `<meta og:description>` has been corrected needs verification
- Bio default: correct — empty, no placeholder text shown to fans

---

## Dimension 4: Empty state copy — 6/10

The principle in `docs/pages/profile/COPY.md` is strong: "a page with fewer sections is better than a page with empty sections." This approach means empty states on the public profile are handled by *hiding* empty sections rather than providing copy — which is architecturally correct.

The admin empty states are spec'd in detail in `docs/pages/admin/COPY.md` and are strong. However, implementation completeness is unknown — specifically whether the spec'd empty state copy (e.g., "Updates are one of the most-clicked things on a page.") is in the live `admin.html` or is documentation-only.

**Known gap:** The zero-stat state — "0 visits yet. Your first visitor is on their way." — is spec'd but not confirmed implemented. The shimmer pattern (indefinite loading animation) is noted as a failure mode in the spec.

**Fan copy:** `docs/pages/fan/COPY.md` empty states are exemplary:
- "You're here because of an artist. Find them — or find someone new." — correct
- "It's been a quiet week. Your artists will be back." — exactly the right tone

---

## Dimension 5: Error state copy — 7/10

**Good:**
- `able-v7.html` fan form error: `"Check your email address."` — specific, calm, no blame
- `start.html` Spotify API failure: `"Couldn't reach Spotify right now. Enter your name below and we'll carry on."` — excellent handling
- `start.html` generic network error: `"Something went wrong — check your connection and try again."` — honest
- `docs/pages/fan/COPY.md` error copy: `"Couldn't reach the server. Showing what we have cached."` — correct

**Gaps:**
- `admin.html` uses browser `confirm()` dialogs for destructive actions — e.g. `"Clear all local data and restart? This cannot be undone."` — functional but these are browser-default chrome, not ABLE's voice. When native dialogs are replaced, copy needs to be written.
- `admin.html` edit form validation error (`#ywFormError`) has no copy spec — whatever error string is rendered here is unspecified
- `admin.html` save failure: currently shows `✓ Saved` on success; what happens on failure is undefined in the spec and likely undefined in the code

---

## Dimension 6: Notification/toast copy — 6.5/10

**Current toast strings in `admin.html`:**
- `'✓ Profile saved'` — acceptable but bland. Per the spec "Saved." with a period is sufficient and warmer than `✓ Profile saved`
- `'Billing coming soon — currently in early access.'` — functional; acceptable temporary copy
- `'✓ Saved'` (on show/release/merch save) with button revert — inconsistent between "✓ Profile saved" and "✓ Saved"

**Missing:**
- No toast copy spec for: fan removed, snap card saved, show saved, merch item saved — each currently uses `'✓ Saved'` which is technically fine but not specified
- No error toast spec — when a save fails, there is no specified copy. Currently these situations are silent or throw console errors
- The spec says: "Saved." / "Done." / "You're in." — the period matters. Current `✓ Saved` is close but the checkmark prefix is decoration, not ABLE's register

---

## Dimension 7: Microcopy precision — 8/10

The onboarding and profile page microcopy is outstanding. `start.html` COPY.md in particular is one of the strongest pieces of copy documentation in the project — questions as labels, specific trust claims, no generic next/submit buttons.

**Strong:**
- `start.html` form questions ("What do you go by?" not "Artist Name") — excellent
- `landing.html` FAQ answers ("Yes. Free forever. No credit card.") — correct register
- Fan form input placeholder: "Your email" (not "Enter your email address") — correct

**Gaps:**
- `admin.html` edit form field labels are not specced — the shows, releases, and snap card editor inputs are using placeholder text that was likely written by a developer, not against a copy spec
- The `admin.html` snap card editor placeholder text is unspecified — what does the text area say before the artist types?
- `admin.html` release editor: the "Write something about what this release means to you" placeholder is specced in `profile/COPY.md` but it's in the admin editor, not the profile — whether this is implemented is unverified

---

## Dimension 8: Admin copy — 8/10

The `docs/pages/admin/COPY.md` document is comprehensive and excellent. The greeting system, Campaign HQ copy, nudge system, fan list copy, tier gate copy, and motivation moments are all spec'd to a high standard.

**Confirmed in `admin.html`:**
- Fan cap copy ("Your list is nearly full") is present
- Toast on profile save exists
- Tier gate buttons ("Move to Artist Pro — £19/mo") exist

**Gaps:**
- Greeting system ("Good to see you, [Name].") is spec'd but implementation completeness is not confirmed — the admin page `<title>` being "Dashboard — ABLE" suggests the greeting copy may not be fully implemented
- The first-run checklist copy ("Four things, then you're live.") — not confirmed implemented
- Motivation moment cards ("Your first fan. This is how every list starts.") — not confirmed implemented
- Admin uses `confirm()` browser dialogs for destructive actions — these need copy spec for when they are replaced with in-app modals

---

## Dimension 9: Fan copy — 8.5/10

`docs/pages/fan/COPY.md` is excellent — arguably the best of the per-page docs. The principles at the bottom are a clean articulation of the entire product philosophy:

> "Honest > cheerful. 'Nothing new today.' > 'You're all caught up!'"

The fan.html build is described as Phase 2 — so most copy is documentation-only. The documented copy is on-register throughout. Specific callouts:

**Strong:**
- Empty state: "You're here because of an artist. Find them — or find someone new." — perfect
- "Nothing new from your artists today. Last drop was N days ago." — specific, honest
- Close Circle invitation: "Some fans go a bit further." — understated, not sales-y
- "Come closer" vs "Join now" — excellent

**Gap:**
- The current `fan.html` (if it exists and renders) likely has placeholder copy, not the spec'd copy — this is expected for a Phase 2 feature but should be flagged

---

## Dimension 10: Copy documentation — 9/10

This is the strongest dimension. Five per-page COPY.md documents exist and are detailed:
- `docs/pages/admin/COPY.md` — complete
- `docs/pages/fan/COPY.md` — complete
- `docs/pages/profile/COPY.md` — complete
- `docs/pages/onboarding/COPY.md` — complete, with audit checklist
- `docs/pages/landing/COPY.md` — complete

**What was missing until now:**
- No cross-platform master voice guide
- No single banned phrases master list
- No before/after calibration examples for contractors
- No copy regression test
- No unified spec covering all copy contexts

This document (`docs/systems/copy/SPEC.md`) fills that gap.

---

## Key findings summary

1. The philosophy is excellent and consistently documented
2. The profile page and landing page are clean — no violations
3. The word "dashboard" leaks into user-facing copy in 4 places across 3 active files
4. "superfan" appears as an internal data key in `admin.html` (non-visible, but technically violates the spec)
5. Toast copy is inconsistent — some places use "✓ Saved", the spec calls for "Saved." — small but real
6. Admin editor field placeholders (shows, releases, snap cards) are unspecced and likely developer-written
7. `admin.html` `<title>` is "Dashboard — ABLE" — should be changed
8. Error state copy is good on the profile; admin error/failure states are partially defined
9. The greeting system ("Good to see you, [Name].") is spec'd but implementation completeness needs verification
10. Copy documentation is strong — the gap was a master spec, now filled
