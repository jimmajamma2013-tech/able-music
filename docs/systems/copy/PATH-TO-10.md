# ABLE Copy System — Path to 10
**Created: 2026-03-15 | Starting score: 7.5/10 | Target: 9.5/10 (spec-complete)**

> Three levels of improvement. P0 takes the copy system from 7.5 to 8.5. P1 takes it to 9.5. P2 completes the system with automated regression and AI-assisted copy — that's the 10.

---

## P0 — Score: 7.5 → 8.5
**Priority: High. Fix violations and lock the foundation.**

These are the corrections that address confirmed violations and missing spec. All P0 items are in active files (`able-v7.html`, `admin.html`, `start.html`, `landing.html`) or are documentation gaps.

---

### P0.1 — Write the full banned phrases list
**Status:** Done — see `docs/systems/copy/SPEC.md` section 2.3.
**What was done:** Extended the CLAUDE.md banned list with 30+ additional phrases covering SaaS micro-copy, artist-profile specific bans, punctuation rules, and fan-page specific bans.
**Verification:** Any developer or contractor can now check any line of copy against the complete list before shipping.

---

### P0.2 — Fix `admin.html` `<title>`
**File:** `admin.html`
**Current:** `<title>Dashboard — ABLE</title>`
**Correct:** `<title>ABLE</title>` (or dynamically `[Artist Name] — ABLE` when name is known)
**Why:** "Dashboard" is banned in user-facing copy. The browser tab is user-facing.
**Effort:** 1 line change.

---

### P0.3 — Fix "dashboard" in `start.html` done screen
**File:** `start.html`
**Current (line 1291):** `"Click it and you'll land straight in your dashboard."`
**Correct:** `"Click it and you'll see your page."`
**Why:** "dashboard" in user-facing copy. The done screen is the artist's first impression of the product.
**Effort:** 1 line change.

---

### P0.4 — Fix "dashboard" in `able-v7.html` owner context bar
**File:** `able-v7.html`
**Current (line 9619):** `"Full dashboard — events, merch, fans, analytics →"`
**Correct:** `"Manage your page — events, merch, fans, analytics →"` or `"Your ABLE page →"` linking to admin
**Also fix (lines 10181, 10204):** `"Open dashboard →"` → `"Go to admin →"` or `"Manage this →"`
**Why:** Owner-mode copy — the artist sees this. "Dashboard" is banned.
**Effort:** 2–3 line changes.

---

### P0.5 — Fix "dashboard" in `landing.html` FAQ
**File:** `landing.html`
**Current (line 1525):** `"it lives in your dashboard"`
**Correct:** `"it lives in your admin page"` or `"it's yours — export it any time from your ABLE page"`
**Also review (line 1456):** `<li>Analytics dashboard</li>` — in a features list. Can remain if it functions as a category descriptor, but better as `<li>Analytics</li>`.
**Effort:** 1–2 line changes.

---

### P0.6 — Rename `superfan` data key in `admin.html`
**File:** `admin.html`
**Current (lines 3021, 3026, 3032):** `level:'superfan'` as a localStorage/data value; maps to visible label `'Core fan'`
**Correct:** Change the internal key to `'core'` — the display label is already correct. This prevents the banned word appearing in inspector/logs.
**Code change:**
```js
// Change:
level:'superfan'
// To:
level:'core'

// And update the level map:
// Change:
superfan: { label:'Core fan', bg:..., color:... }
// To:
core: { label:'Core fan', bg:..., color:... }
```
**Effort:** 3 changes in one file. Small but clean.

---

### P0.7 — Standardise toast copy in `admin.html`
**File:** `admin.html`
**Current inconsistency:** Some toasts say `'✓ Profile saved'`, some say `'✓ Saved'`. The spec says `"Saved."` — period, no checkmark prefix in the string itself (the checkmark is a UI concern, not copy).
**Correct toast strings:**
| Action | Current | Correct |
|---|---|---|
| Profile save | `'✓ Profile saved'` | `'Profile saved.'` or `'Saved.'` |
| Show save | `'✓ Saved'` | `'Show saved.'` |
| Release save | `'✓ Saved'` | `'Release saved.'` or `'Saved.'` |
| Merch save | `'✓ Saved'` | `'Saved.'` |
| Snap card save | `'✓ Saved'` | `'Saved.'` |
| Support pack save | `'✓ Saved'` | `'Saved.'` |
| Fan removed | (unspecified — silent or error) | `'Removed.'` |
| Snap card deleted | (unspecified) | `'Removed.'` |

**Effort:** Audit all `showToast()` calls. Approximately 8–12 changes.

---

### P0.8 — Spec admin editor field placeholders
**Gap:** The shows, releases, snap cards, and merch editors in `admin.html` have input field placeholders that were written without a copy spec. These need auditing against the banned phrases list and the register.
**Action:** Audit all `placeholder` attributes in admin form inputs. Flag any that use:
- Generic form-speak ("Enter venue name", "Type here", "Add description")
- Any banned phrases
- Any all-caps labels that sound like a database field

**Correct register examples:**
- Show venue input placeholder: `"e.g. The Brudenell Social Club"` ← specific, not "Venue name"
- Release title placeholder: `"What's it called?"` ← question form, not "Release title"
- Snap card text area placeholder: `"One thought. A sentence. Something happening."` ← artist voice
- Merch item name placeholder: `"e.g. Tour tee — black"` ← specific

**Effort:** Read through admin.html form editors and update placeholder strings. ~15–20 placeholders to review.

---

### P0.9 — Verify greeting system is implemented
**Check:** Does `admin.html` render "Good to see you, [First Name]." as the greeting?
**Check:** Is the dynamic sub-greeting system (from `docs/pages/admin/COPY.md`) wired up or documentation-only?
**Action:** If the greeting is static or absent, implement the basic greeting using `profile.name` first token. Sub-greeting can be Phase 1 minimum: day-0 only ("Your page is live.") with the full system as P1.

---

## P1 — Score: 8.5 → 9.5
**Priority: Medium. Systematic audit and implementation of remaining copy specs.**

---

### P1.1 — Empty state copy audit across all admin sections
**What:** Verify that the empty state copy from `docs/pages/admin/COPY.md` is implemented in `admin.html` for each section.

**Sections to check:**
| Section | Spec copy | Confirmed implemented? |
|---|---|---|
| Music | "Add your music. Paste a Spotify, YouTube, SoundCloud, or Bandcamp link." | To verify |
| Shows | "Playing anywhere soon? Add the venue and date — your fans can get tickets without leaving your page." | To verify |
| Snap cards | "Updates are one of the most-clicked things on a page. Tell fans what's happening." | To verify |
| Connections | "Paste your platform links. We'll turn them into native embeds fans can use without leaving your page." | To verify |
| Merch | "Got merch? Add your store link and up to 3 featured items." | To verify |
| Fan support | "Let people support you directly. No platform takes a cut." | To verify |

**Action:** For each section, check the empty state rendering in `admin.html`. Update any that are generic ("No items added") to the spec'd copy.

---

### P1.2 — Toast copy audit — replace all generic toasts
**What:** Audit all toast messages across all active files. Replace any that use:
- "Success!"
- "Error!"
- "Done!" (acceptable but can be more specific)
- Any toast with an exclamation mark

**Additional toast copy to spec:**
| Trigger | Correct toast |
|---|---|
| Fan sign-up (profile page) | "You're in." (already implemented — verify) |
| Page link copied | "Copied." |
| Profile auto-saved | "Saved." |
| Show deleted | "Removed." |
| Image upload success | "Photo set." |
| Slug changed | "URL updated." |
| Gig mode enabled | "Gig mode on." |
| Gig mode disabled | "Gig mode off." |
| Export downloaded | "CSV downloaded." |
| Billing CTA (placeholder) | "Billing coming soon — you'll be the first to know." (warmer than current) |

---

### P1.3 — Error state copy spec for admin
**What:** The admin has no full error state copy spec. Define it.

**Scenarios to cover:**

**Save failure (network):**
> "Couldn't save that. Check your connection and try again."

**Image upload failure:**
> "That didn't upload. Try again with a smaller file, or a different format."

**Invalid URL in music/merch/shows editor:**
> "That URL doesn't look right — check it and try again."

**oEmbed failure (can't fetch link preview):**
> "We couldn't read that link. Try the direct Spotify or YouTube URL."

**Fan removal failure:**
> "Couldn't remove that. Try again."

**Slug conflict (URL already taken):**
> "That URL is taken. Try a different one."

**Auth expired / magic link expired:**
> "Your sign-in link has expired. Request a new one below."

**Admin section load failure:**
> "Couldn't load this section. Refresh the page."

---

### P1.4 — Implement motivation moment cards in admin
**What:** The `docs/pages/admin/COPY.md` specifies milestone cards ("Your first fan. This is how every list starts."). Verify these are implemented. If not, implement them using the exact copy from the spec.

**Milestones:**
- Fan #1: "Your first fan. This is how every list starts."
- Fan #10: "10 fans. 10 people who said yes."
- Fan #50: "50 fans. 50 people your music reached directly."
- Fan #100: "100 fans. This is the free tier limit — and it means 100 people found you on their own."
- First click data: "It's working. People are tapping your links."

---

### P1.5 — Implement dynamic admin greeting
**What:** Full implementation of the dynamic sub-greeting system from the admin COPY.md spec.

**States to implement (minimum viable set):**
1. Day 0: "Your page is live."
2. Pre-release active, >3 days: "[N] days until [release title]."
3. Pre-release active, 1–3 days: "[N] days. Your page is set."
4. Pre-release today: "[Release title] is out today."
5. Live state, days 1–7: "[Release title] is out. This is your window."
6. Gig mode active: "You're on tonight."
7. Quiet/default: "Your page, your list, your relationship."

All 8 states can wait for P2 — the first 3 are sufficient for the greeting system to feel alive.

---

### P1.6 — fan.html copy implementation (when Phase 2 begins)
**What:** When fan.html enters active development, all copy must be pulled from `docs/pages/fan/COPY.md` — not written inline by a developer.
**Action:** Before any copy goes into fan.html, check every string against the fan COPY.md document. The existing fan.html file (if it exists) likely has placeholder or developer-written copy that must be replaced.

Key corrections from the COPY.md:
- "Feed" tab → "Following"
- "No one in your feed yet" → "You're here because of an artist. Find them — or find someone new."
- "You're all caught up" → "— you're up to date —"
- "Emerging artists" filter → "New to ABLE"
- "By vibe" filter → "By sound"
- "Creatives" section label → "The people behind the music"
- "Change" link on location → "Change city"

---

## P2 — Score: 9.5 → 10
**Priority: Future. Systematic enforcement and AI assistance.**

P2 is not buildable until the P0 and P1 foundations are in place. These are the final pieces that make copy a **system**, not just a style guide.

---

### P2.1 — Playwright copy regression test
**What:** A Playwright test that scans all visible text on all active pages against the banned phrases list. Runs automatically and fails the test suite if a banned phrase is detected.

**Implementation spec:**
```js
// copy-regression.test.js
// Pages to scan: landing.html, start.html, able-v7.html, admin.html, fan.html
// Banned phrases: the master list from docs/systems/copy/SPEC.md section 2.3
// Test: for each page, extract all visible text nodes. Check for banned phrases.
// Failure output: "COPY VIOLATION: Found 'Get started' in admin.html line ~X.
//                  Correct copy: [alternative]"
```

**Banned phrase scan list (for the test):**
- "superfan" (case-insensitive, word boundary)
- "content creator"
- "going viral"
- "grow your audience"
- "monetis" (catches both spellings)
- "you're all set"
- "welcome aboard"
- "mailing list"
- "newsletter"
- "level up"
- "supercharge"
- "skyrocket"
- "get started" (as a CTA — not in a sentence like "to get started on your page")
- "engage your"
- "turn fans into"
- "subscribers" (as a user-facing label)
- Exclamation marks in any text node outside of artist-generated content

**Note:** The test needs to exclude `_archive/`, `design-references/`, and `mockups/` directories — these are not live pages.

---

### P2.2 — AI copy suggestion spec (future Netlify function)
**What:** When artists are editing their profile, ABLE can offer copy improvement suggestions. This is a Netlify serverless function that calls Claude (or similar) with the artist's current copy and returns suggested improvements.

**Spec:**

**Trigger:** Artist opens bio editor. After 3+ seconds idle in the field, a subtle "Suggestions" link appears.

**Prompt template (sent to Claude):**
```
You are ABLE's copy advisor. ABLE is a platform for independent musicians.
The copy register is: direct, first-person, understated, warm without being effusive.
UK product — understatement is appropriate. Never use: [banned phrases list].
Always write in the artist's first person.

The artist's current bio is: "[current bio text]"

Suggest 3 alternative versions that:
1. Are shorter than the original if possible
2. Use first-person present tense
3. Sound like the artist wrote it, not a platform
4. Follow the copy register above

Return only the 3 suggestions, numbered. No preamble. No explanation.
```

**UI spec:**
- Inline, below the editor (not a modal)
- Shows 3 suggestions as tappable rows
- Tapping a suggestion populates the field but does not auto-save (artist must still tap Save)
- Dismiss button (×) — hides the suggestions and does not show again for this session
- Label above suggestions: "A few alternatives to consider."

**What this is not:**
- Not automatic rewriting
- Not a grammar checker
- Not a "make this more engaging" tool
- Not a platform-voiced suggestion engine

**Cost estimate:** ~1000 tokens per suggestion call. At scale, add caching for common bio patterns.

---

### P2.3 — Copy documentation pipeline
**What:** When copy changes are made in code, the relevant COPY.md document should be updated in the same commit. This is a process rule, not a technical implementation.

**Rule:** Any PR that changes user-facing copy strings must include an update to the relevant COPY.md document. If the changed copy is not covered by any existing COPY.md, it must be added to `docs/systems/copy/SPEC.md`.

**Verification:** The Playwright copy regression test (P2.1) enforces correctness. This rule enforces documentation completeness.

---

## Score tracking

| Level | Changes | Score |
|---|---|---|
| Current | — | 7.5/10 |
| After P0 | 9 targeted fixes, banned phrases master list, `superfan` key renamed | 8.5/10 |
| After P1 | Empty states implemented, toast audit complete, error state spec written, greeting dynamic | 9.5/10 |
| After P2 | Playwright copy regression live, AI suggestion spec delivered | 10/10 |
