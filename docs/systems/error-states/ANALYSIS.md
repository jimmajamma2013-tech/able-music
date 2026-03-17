# ABLE — Error States: Analysis
**Created: 2026-03-16 | Score: 3.5/10**

> Scored across 8 dimensions. Most pages assume the happy path. This is a systematic audit of what breaks and what the user sees when it does.

---

## Scoring rubric
- **0**: No handling — crash or silent failure
- **3**: Partial handling — caught but no user feedback
- **5**: Error caught + generic message shown
- **7**: Error caught + specific, helpful message + basic recovery
- **9**: All of the above + graceful degradation + Playwright-tested
- **10**: As above + real device tested + offline-first design

---

## Dimension 1 — Network failure

**Score: 2/10**

**What currently happens:**
- able-v7.html loads entirely from localStorage on first visit after setup. Static HTML + CSS loads fine offline.
- admin.html: Same — no network dependencies in current build.
- start.html: Spotify import (`fetch` to Spotify API) silently fails if offline. No user feedback. User stares at a spinner or blank field.
- fan.html: No network dependency in current demo build.

**What should happen:**
- admin.html: Quiet amber banner when `navigator.onLine === false`. Non-blocking.
- start.html: Spotify import failure distinguished from network failure vs. URL error. "No connection — skip for now and fill in manually."
- able-v7.html: No banner needed — page works from localStorage. Silent is correct here.

**Gap:** `window.addEventListener('offline/online')` is not implemented anywhere. Spotify import has no network error branch.

---

## Dimension 2 — localStorage corruption

**Score: 1/10**

**What currently happens:**
- Every page calls `JSON.parse(localStorage.getItem('able_v3_profile'))` directly.
- If the value is malformed JSON (truncated write, manual edit, browser bug): unhandled `SyntaxError`.
- In able-v7.html: page renders nothing — artist name, profile data, CTAs all fail silently.
- In admin.html: likely JS execution stops mid-init. Dashboard shows blank or partial state.

**What should happen:**
- All localStorage reads wrapped in `try/catch` with a named fallback.
- On corruption: log a `console.warn`, return the fallback value, continue rendering.
- admin.html should show a recovery nudge: "Your profile data may be corrupted. Re-import from Spotify or contact support."

**Gap:** Zero `try/catch` wrapping on localStorage reads across any page. This is a P0 fix.

---

## Dimension 3 — Form validation

**Score: 4/10**

**Fan sign-up email (able-v7.html):**
- Basic HTML5 `type="email"` validation exists — catches obviously malformed addresses.
- No custom validation message. Browser default error tooltip (inconsistent across browsers, ugly).
- No duplicate check: same email can be submitted multiple times.
- No feedback on empty submit.

**Wizard inputs (start.html):**
- Artist name field: required, but no visible error state on empty submit — just blocks progression.
- Spotify URL: no validation on URL format before the fetch fires. Submitting `"hello"` will fire a fetch that fails silently.
- Release date: no validation that date is in the future.

**What should happen:**
- Custom inline error copy: specific, positioned under the field, disappears on correction.
- Duplicate email: "You're already on the list." (not an error — a reassurance).
- Spotify URL: validate pattern before firing fetch. `/open.spotify.com\/artist\//` regex check.

**Gap:** No custom error copy anywhere. Browser defaults only.

---

## Dimension 4 — Spotify import failure

**Score: 2/10**

**Failure modes:**
1. URL is not a Spotify artist URL (wrong format)
2. URL is valid format but artist doesn't exist (404 from Spotify API)
3. Rate limit hit (429)
4. Network offline
5. API key missing / invalid (401)

**What currently happens:**
- start.html fires a fetch to Spotify. On failure: the `catch` block likely exists (basic) but shows no user-facing message.
- User sees: nothing changes. The fields stay empty. No indication of what went wrong.
- User doesn't know whether to wait, retry, or give up.

**What should happen:**
- Each failure mode has a distinct, brief error message directly under the Spotify URL field.
- All failures offer a "Skip and fill in manually" escape.
- Rate limit: "Spotify is busy — try again in a moment, or fill in manually."
- 404: "Couldn't find that artist. Double-check the URL, or skip and fill in."
- Network: "No connection — skip for now and continue."

**Gap:** No per-failure-mode copy. No "skip" escape from import failure.

---

## Dimension 5 — Image load failure

**Score: 1/10**

**What currently happens:**
- able-v7.html: artwork `<img>` has no `onerror` handler. On 404: broken image icon (browser default). This is the most visible failure mode in production — artwork URL changes or CDN outage = broken hero.
- admin.html: same.
- start.html: Spotify artwork URL cached in localStorage — can go stale. No fallback.

**What should happen:**
- `onerror` on every `<img>` that loads from a URL.
- Fallback: initials avatar — first letter of artist name, rendered on accent colour background, as an SVG data URI.
- Fallback is indistinguishable from intentional design — looks like a choice, not a break.

**Gap:** Zero `onerror` handlers in current codebase. This is a P0 fix.

---

## Dimension 6 — Empty state vs error state distinction

**Score: 4/10**

**What currently happens:**
- admin.html fan list: shows "No fans yet" when `able_fans` is empty — this is correct empty state copy.
- admin.html stats: shows "0" — correct, not an error.
- admin.html shows/events: likely shows nothing if `able_shows` is empty. No empty state copy specced.
- able-v7.html with no profile data: likely renders with fallback strings ("Artist Name") — not clearly wrong but not clearly an empty state either.

**Problem:**
- Empty state (no data yet) and error state (data should be here but isn't) look identical. User can't tell if their shows didn't save or if they just haven't added any.
- No visual differentiation: empty state icons/illustrations vs. error state (red/amber indicator + retry action).

**What should happen:**
- Empty state: neutral, encouraging. "No shows added yet. Add your first."
- Error state: amber indicator, specific. "Couldn't load your shows. Try refreshing."
- Two distinct CSS classes: `.state-empty` and `.state-error`. Never use the same component for both.

**Gap:** No `.state-error` component exists. Empty and error states conflated in current implementation.

---

## Dimension 7 — Error copy quality

**Score: 3/10**

**What currently exists:**
- admin.html: "No fans yet" — good.
- Form validation: browser defaults ("Please fill in this field") — bad.
- Spotify import: likely "Something went wrong" or nothing — bad.
- Network errors: nothing — bad.
- Most errors: silent fail or browser default.

**Copy quality failures:**
- Generic: "Something went wrong" tells the user nothing and implies it's their fault.
- Passive: "Error loading profile" — doesn't say what to do.
- Inconsistent register: some places use ABLE's voice, others use browser/system defaults.
- Missing escape: most errors have no recovery action offered alongside the message.

**What should happen:**
- Every error message: says what happened, why (if knowable), what to do next.
- Matches ABLE register: honest, direct, not alarming.
- Examples in SPEC.md.

**Gap:** No error copy audit has been done. SPEC.md will be the canonical reference.

---

## Dimension 8 — Recovery paths

**Score: 3/10**

**What currently happens:**
- localStorage corruption: no recovery path. Artist is stuck.
- Spotify import failure: no skip/retry. Artist may abandon wizard.
- Network offline: no toast, no indicator, no queue for retry.
- Image failure: no fallback, no retry.

**What should happen:**
- Every error must offer at least one recovery action:
  - Retry the operation
  - Skip and continue with fallback
  - Contact support (as last resort, not first)
- No error should require a page reload as the only path forward.
- Errors that self-resolve (network comes back online) should auto-recover and confirm.

**Gap:** Recovery actions are entirely absent. The user's only current option is reload or abandon.

---

## Overall score: 3.5/10

| Dimension | Score |
|---|---|
| Network failure | 2/10 |
| localStorage corruption | 1/10 |
| Form validation | 4/10 |
| Spotify import failure | 2/10 |
| Image load failure | 1/10 |
| Empty vs error state distinction | 4/10 |
| Error copy quality | 3/10 |
| Recovery paths | 3/10 |
| **Average** | **2.5/10** |
| **With spec-complete improvements** | **9/10** |

The gap is not subtle. The current build is entirely happy-path. Every error reveals the seams.

See SPEC.md for the canonical fix patterns, PATH-TO-10.md for prioritised implementation.
