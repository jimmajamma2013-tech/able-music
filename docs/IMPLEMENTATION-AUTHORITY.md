# ABLE — Implementation Authority
**Date: 2026-03-16**
**Phase: Post-review, pre-launch implementation**
**Overall product score: 7.4/10 → target 8.5+ before warm launch**

---

## Implementation posture

ABLE has been reviewed deeply across all major surfaces. The product is strong per-surface. The gaps are cross-page: activation chains with broken links, trust leaks, and a few missing first moments that matter.

The next value comes entirely from implementation, not more review.

---

## GPT directional guidance — explicit response

**1. Next gains come from building, not more review** — Agree. Every major surface has been reviewed and scored. The remaining work is implementation. Adding another review layer now would be productive avoidance.

**2. Implementation sequence matters almost as much as the changes** — Agree strongly. Building the first-fan moment before wiring the email that delivers the first fan would be wasteful. The sequence is: (1) wire activation chains, (2) fix trust leaks, (3) surface magic moments, (4) add strategic pre-work.

**3. Right implementation is high-leverage, coherent, launch-relevant, quality-raising, trust-preserving, maturity-increasing** — Agree. The tasks below all pass this test. Scope expansion (new pages, new features) does not.

**4. Product should get richer only where that increases quality, not noise** — Agree. Credits handle field is the only "new" field added — and it directly enables a strategic capability already designed and specced. Everything else is fixing or completing.

**5. Every step should answer: why now, why this file, why this before the next** — Agree. Applied below for each task.

**6. Claude should identify what it would actually change** — Agree. See exact task definitions below.

**7. Best next work increases: coherence, activation, premium feel, trust continuity, maturity, launch confidence** — Agree. Task 1 (fan confirmation URL) scores highest on activation + coherence. Task 2 (Near me location) scores highest on trust. Task 3 (first-fan moment) scores highest on activation + product maturity. Task 4 (credits handle) scores highest on strategic foundation.

---

## The 10 highest-leverage implementation tasks

### 1. Wire fan confirmation email → fan dashboard link with ?artist= context
- **What**: Update `netlify/functions/fan-confirmation.js` to include a fan dashboard link pointing to `fan.html?artist={slug}&ref=email-confirm` in the email body
- **Why**: The entire fan arrival system built into `fan.html` (`initArrival()`, `renderFirstVisitState()`, `renderColdStart()`) does nothing unless the fan lands with `?artist=` in the URL. Right now every fan who clicks the email CTA lands cold on the artist profile, not on fan.html, and no context passes through. This is a 3-line change that unlocks the entire fan activation system.
- **Surface**: `netlify/functions/fan-confirmation.js`
- **Difficulty**: Very low
- **Lift**: Very high — unlocks all arrival state logic built into fan.html
- **Type**: Launch-critical / cross-page continuity

### 2. Near me location capture UI (fan.html)
- **What**: On first Near me tab visit, if `fan_location` is not set, show a minimal location input ("Where are you based?") rather than hardcoded "London, UK". Save to `fan_location` localStorage. Display saved location in the header once set.
- **Why**: Hardcoded "London, UK" is a direct trust breach for anyone not in London. It claims to know the user's location but doesn't. Trust breaches in the first 30 seconds of using a product are fatal. This is not a polish issue — it is a truth issue.
- **Surface**: `fan.html`
- **Difficulty**: Low
- **Lift**: High (trust)
- **Type**: Launch-critical / trust

### 3. First-fan moment in admin.html
- **What**: When the admin home page detects that `able_fans` has exactly 1 entry AND the `able_first_fan_seen` flag has not been set, surface a specific moment: "Your first fan. [email]. That email is yours — no platform decides whether they hear from you." Set the flag to prevent repeat display.
- **Why**: This is ABLE's magic moment. An artist who gets their first fan through ABLE needs to understand what just happened. Currently it lands as a number. The number is not the point. The relationship is the point.
- **Surface**: `admin.html`
- **Difficulty**: Low
- **Lift**: Very high (activation, retention)
- **Type**: Launch-critical / emotional design

### 4. Add `handle` field to credits in admin.html + render as live links in able-v7.html
- **What**: Credits in admin.html already have `name` and `role` fields. Add `handle` (the freelancer's ABLE handle). In `able-v7.html`, render confirmed credits (handle non-null) as tappable links, unconfirmed as plain text at 70% opacity.
- **Why**: The `credits[]` array already exists. Adding `handle` costs 5 minutes and completes the data model. The rendering asymmetry (confirmed = live link, unconfirmed = plain text) is the entire trust mechanic for the freelancer layer. Without it, the acquisition path is invisible.
- **Surface**: `admin.html`, `able-v7.html`
- **Difficulty**: Low
- **Lift**: High (strategic foundation — unlocks freelancer discovery)
- **Type**: Strategic / quality

### 5. Copy audit: "Feed" creep, "Snap cards" vs "Updates", campaign mode vocabulary
- **What**: Systematic surface-by-surface check against `docs/systems/copy/SPEC.md`. Target: "Feed" used anywhere in UI text (should not appear), "Snap cards" in admin (should be "Updates from you"), "Campaign" vs "Page mode" inconsistency.
- **Why**: Vocabulary inconsistency is the most visible signal of product immaturity. Every vocabulary violation breaks the feeling of one coherent product.
- **Surface**: `admin.html`, `fan.html`, `able-v7.html`
- **Difficulty**: Medium (many small edits)
- **Lift**: High (coherence, maturity)
- **Type**: Quality / coherence

### 6. Campaign mode tooltips in admin.html
- **What**: Each campaign state (Profile, Pre-release, Live, Gig) gets a one-sentence explanation visible on hover/tap next to the mode selector.
- **Why**: The mode system is powerful but opaque to first-time users. "Pre-release" is not self-explanatory for an artist who has never used a release campaign tool. One sentence per mode, contextual, removes the comprehension barrier without cluttering the UI.
- **Surface**: `admin.html`
- **Difficulty**: Low
- **Lift**: Medium-high (activation, comprehension)
- **Type**: Quality / activation

### 7. First-visit state for artist profile (able-v7.html)
- **What**: When an artist visits their own profile for the first time (via `?owner=true&first=true` param or localStorage flag set by start.html), show a brief "This is what your fans see" context strip that dismisses on scroll or tap.
- **Why**: The artist finishing the wizard and seeing their profile for the first time is a moment. It currently lands without acknowledgement.
- **Surface**: `able-v7.html`
- **Difficulty**: Low
- **Lift**: Medium (activation)
- **Type**: Quality / activation

### 8. Profile completeness signal in admin.html
- **What**: Calculate a completeness percentage from the artist's profile data (release added, bio set, photo/artwork uploaded, shows added, platform links set) and show it as a subtle bar or percentage in the profile section, with specific text about what's missing.
- **Why**: An artist who has done 40% of their profile doesn't know what's missing. Specificity ("Add a release to enable pre-release mode") is far more valuable than a generic percentage.
- **Surface**: `admin.html`
- **Difficulty**: Medium
- **Lift**: Medium (activation)
- **Type**: Quality / activation

### 9. Verify PWA icons render on real devices
- **What**: Use Playwright to screenshot the installed PWA icon on iOS/Android simulation. Verify no blank or broken icon.
- **Why**: Broken home screen icons destroy premium feel instantly and silently.
- **Surface**: PWA assets (`/icons/icon-192.png`, `/icons/icon-512.png`)
- **Difficulty**: Low
- **Lift**: Medium (polish, trust)
- **Type**: Quality / polish

### 10. Post-gig greeting in admin.html
- **What**: When gig mode expires, the next time the artist opens admin, show a specific greeting: "Last night at [venue]. [N] fans joined." This is already specced in DESIGN-SPEC.md §5.2.
- **Why**: The post-gig reveal is specced and valuable but not yet wired. It closes the loop on what gig mode achieves.
- **Surface**: `admin.html`
- **Difficulty**: Low
- **Lift**: Medium (emotional design, product maturity)
- **Type**: Quality / activation

---

## Single most important task

**Wire fan-confirmation.js to pass `?artist=slug&ref=email-confirm` in the fan dashboard link.**

Why it's first: Every other fan activation improvement — the arrival state, the cold-start suggestions, the first-visit context — was built into fan.html but has no entry point in production. This 3-line change is the bridge between the email system and the fan activation system. Without it, no fan ever arrives with context.

---

## Exact implementation order

1. `netlify/functions/fan-confirmation.js` — fan dashboard link with `?artist=&ref=email-confirm`
2. `fan.html` — Near me location capture (fix trust breach)
3. `admin.html` — first-fan moment (magic moment)
4. `admin.html` + `able-v7.html` — credits handle field + live link rendering
5. Copy audit (admin.html, fan.html) — vocabulary consistency
6. `admin.html` — campaign mode tooltips
7. `able-v7.html` — first-visit artist state
8. `admin.html` — post-gig greeting (wire existing spec)

---

## What should wait

- Profile completeness signal (medium complexity, not launch-critical)
- PWA icon verification (Playwright check — needs real device or simulator)
- Freelancer start page (freelancer-start.html) — Phase 2; wait for first freelancer
- Supabase migration — Phase 2; all localStorage keys are correct
- Email broadcasts backend — Phase 2; requires Supabase auth
- Reels/Clips feed — Phase 2
- Globe heatmap — Phase 2
- Close Circle payments — Phase 2 (Stripe not wired)

---

## What should be refused

- Any new page creation that isn't freelancer-start.html or the professional profile
- Features that widen ABLE's scope beyond artist/fan/freelancer
- Star ratings or marketplace signals anywhere in the professional layer
- Push notifications (requires service worker with push registration — Phase 2)
- Any social or fan-to-fan features (this is not a social network)
- Any mechanism that references "followers" count publicly
- Re-designing any page that already scores 9+ on its spec

---

## Exact task definitions (first 4)

### Task 1: fan-confirmation.js fan dashboard link
- **Goal**: Fan clicking the email CTA (or a secondary link in the email) lands on `fan.html?artist={slug}&ref=email-confirm`, triggering `initArrival()` which auto-follows the artist and shows first-visit state
- **Files**: `netlify/functions/fan-confirmation.js`
- **Authority**: `docs/CROSS-PAGE-10-REVIEW.md`, `docs/pages/fan/PATH-TO-10.md`
- **Done when**: Email CTA button URL = `${baseUrl}/fan.html?artist=${slug}&ref=email-confirm`
- **Checks**: Read the file, verify the URL is correct, no regression to artist profile CTA

### Task 2: fan.html Near me location capture
- **Goal**: First time user opens Near me tab, if no `fan_location` stored, show a single input "Where are you based?" + save. Location displays in the header. Never hardcode a city.
- **Files**: `fan.html`
- **Authority**: `docs/CROSS-PAGE-10-REVIEW.md`
- **Done when**: Near me header shows saved location OR capture input; demo data still shows but the trust breach is resolved
- **Checks**: JS parse-check; verify `fan_location` is read/written correctly

### Task 3: admin.html first-fan moment
- **Goal**: When `able_fans.length === 1` AND `able_first_fan_seen` is not set, render a specific moment in the admin home: artist sees first fan's email with copy "That email is yours." Flag is set to prevent repeat.
- **Files**: `admin.html`
- **Authority**: `docs/CROSS-PAGE-10-REVIEW.md` §2 "The single most important activation improvement"
- **Done when**: First fan in localStorage triggers a visible, specific card/panel in admin home. Second load does not repeat it.
- **Checks**: JS parse-check; manually verify localStorage flag logic

### Task 4: admin.html credits handle + able-v7.html rendering
- **Goal**: Credits have a `handle` input field in admin. In able-v7.html, credits with non-null handle render as `<a href="/[handle]">[name]</a>` at full opacity; credits with null handle render as `<span>[name]</span>` at 70% opacity.
- **Files**: `admin.html`, `able-v7.html`
- **Authority**: `docs/systems/freelancer-auth/STRATEGY-REVIEW-FINAL.md`, `docs/pages/profile/DESIGN-SPEC.md`
- **Done when**: Admin credit form has 3 fields (name, role, handle); profile renders credits with live-link asymmetry
- **Checks**: JS parse-check both files; verify credit rendering doesn't break existing release card layout

---

## Build chunks

**Chunk A — Activation wiring** (Tasks 1 + 3)
These two together activate the most important moments in the fan and artist journeys. No visual redesign, no new pages — just wiring what was already specced.

**Chunk B — Trust fixes** (Task 2)
The Near me location capture is isolated to fan.html and has no dependencies. Do it cleanly in one edit.

**Chunk C — Strategic foundation** (Task 4)
Credits handle field + rendering is a small data model addition and one rendering change. Do both files in one chunk to keep the change coherent.

**Chunk D — Vocabulary and copy** (Task 5 + campaign tooltips)
Systematic copy pass after all structural changes are done. Copy changes after structural changes, not before — otherwise you audit copy that then gets moved around.

---

## Final-phase build doctrine

From here, every build task must:

1. **Have a clear activation or trust justification** — if it doesn't improve how an artist understands what ABLE does for them, or how a fan arrives and stays, it waits.
2. **Be completable in one focused session** — no open-ended exploratory builds until Supabase is live.
3. **Follow the vocabulary in `docs/systems/copy/SPEC.md`** — every new string of UI text must be checked against it before committing.
4. **Not widen scope** — ABLE is one product, three user types, zero social network features.
5. **Preserve the calm register** — no exclamation marks, no progress-bar gamification, no SaaS micro-copy.
6. **Store the decision in a file** — if an implementation decision is made, it goes into the relevant spec/authority doc before the session ends.

---

## What brings ABLE closest to 10 right now

In order:
1. Wiring the fan email arrival chain (activation gap — currently no fan ever lands with context)
2. Near me location honesty (trust — directly broken for non-London users)
3. First-fan moment (magic moment — the most important emotional beat in the product is currently absent)
4. Credits handle rendering (strategic foundation — every release without it needs retroactive migration)
5. Resend domain verification (external, James-only — without this, no email flows work in production)

Items 1–4 are implemented in this session.
Item 5 is a manual task at resend.com/domains — documented here so it doesn't get forgotten.
