# ABLE — 10-Prompt Engineering Roadmap

Each prompt = one focused PR-sized chunk of work. Max 3–6 files touched.
Prompts build on each other — do not skip ahead.

---

## Prompt 1 — Stabilise Primitives: CSS Variables & Card Shell

**Goal:** Lock in the design token layer and a single reusable Able Card CSS component so all future cards are consistent.

**Why first:** Every subsequent prompt depends on a stable card shell and colour system. Retrofitting tokens later is painful.

**Work:**
- Audit and consolidate all `color`, `background`, `border-radius`, `font-size` values into a single `--token-*` CSS custom property block at the top of the file
- Define the three theme contexts (`.theme-light`, `.theme-dark`, `.theme-image`) and ensure all tokens resolve correctly in each
- Create `.able-card` CSS class with fixed header/body/footer anatomy and correct overflow/containment rules
- Ensure iframe inside `.able-card__body` respects `max-width: 100%; overflow: hidden`
- Remove any inline styles that duplicate token values

**Files touched:** `able-merged.html` (CSS block only)

**Acceptance test:** AC-08, AC-09, S2-01 through S2-06

---

## Prompt 2 — Quick Actions: Polish & Wire-Up

**Goal:** Make the Quick Actions pill row on the profile feel premium and reliable.

**Work:**
- Ensure all active Action Links appear as pills below hero (no slice(2) or positional filtering)
- Pill row wraps gracefully at 375px — no horizontal scroll
- Empty state: hide the pill row entirely (no blank space) when 0 links are active
- Diagram in the Action Links tab stays in sync with: active preview mode, ctaState changes, artist name edits
- Smoke test all AC-01, AC-02

**Files touched:** `able-merged.html` (JS `updatePreviewCTA`, `applyDashboardDataToProfile`, pill row CSS)

**Acceptance test:** AC-01, AC-02, S5-01 through S5-09, S11-02, S11-03

---

## Prompt 3 — Section Action Buttons: Data-Driven Wiring

**Goal:** Remove all keyword/regex-based section button logic and replace with explicit data reads.

**Work:**
- Rewrite `updateSectionActionBtns()` to read from `able_music_releases`, `able_events`, `able_merch`
- Music button: first release → first non-empty platform URL (Spotify → Apple → SoundCloud → YouTube)
- Events button: first upcoming event (date ≥ today) with a `ticketUrl`
- Merch button: `able_merch.shopUrl`
- Hide any button whose source data is empty/missing (AC-18)
- Call `updateSectionActionBtns()` from `updatePageState()` on every mode switch

**Files touched:** `able-merged.html` (JS only — `updateSectionActionBtns`, callers)

**Acceptance test:** AC-03, AC-10, AC-12, AC-13, AC-18, S7-02 through S7-04, S8-02

---

## Prompt 4 — Display Modes: Tracklist / Embeds / Both

**Goal:** Per-release display mode toggle that actually works across all three states.

**Work:**
- Add display mode selector (Tracklist | Embeds | Both) to each release card in admin
- Persist choice per-release in `able_music_releases[n].displayMode`
- Profile renderer switches card body based on `displayMode`:
  - `tracklist` → clean `<ol>` rows: number · title · duration, no buttons
  - `embeds` → iframe embed inside card body
  - `both` → card with tracklist rows in body + Open button in header (no iframe)
- Enforce: zero buttons inside tracklist rows (AC-04)

**Files touched:** `able-merged.html` (Music tab HTML for the toggle, profile renderer JS)

**Acceptance test:** AC-04, AC-05, S6-04 through S6-08

---

## Prompt 5 — Credits: First-Class on Cards

**Goal:** Credits on every release card work reliably — collapsed by default, expandable, correct count.

**Work:**
- Each release in `able_music_releases` has `credits: [{ name, role }]`
- Admin: credits editor on each release card (add/remove rows)
- Profile: Able Card footer shows "N credits" toggle; expanded reveals name · role list
- Credits are collapsed on page load
- Credits toggle does NOT reload or flash the card

**Files touched:** `able-merged.html` (Music admin card HTML, profile card footer JS/HTML)

**Acceptance test:** AC-06, S9-01 through S9-04

---

## Prompt 6 — Credits Section: Profile Page

**Goal:** Standalone Credits section on the profile, deduplicated and ordered.

**Work:**
- Aggregate all credits from all `able_music_releases[n].credits` arrays
- Deduplicate by `name` (case-insensitive); merge roles
- Order by frequency (most-credited first)
- Render as a section below Merch: avatar (initial if no image) · name · roles (comma-joined)
- Admin Credits tab: global credits editor (names that appear across multiple releases)

**Files touched:** `able-merged.html` (Credits section renderer, Credits tab HTML)

**Acceptance test:** AC-11, S9-05

---

## Prompt 7 — Theme & Image Mode Polish

**Goal:** Background Image mode feels genuinely premium — not just a background swap.

**Work:**
- Hero scrim: `linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)`
- Cards in image mode: `background: rgba(0,0,0,0.55); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px)`
- Audit all text elements for WCAG AA contrast against the card background
- Accent colour: if user hasn't set one, auto-extract dominant colour from hero image using canvas sampling (5×5 grid, average non-white non-black)
- Accent must pass contrast check against card background; fall back to `#7B61FF` if not

**Files touched:** `able-merged.html` (CSS image mode rules, JS accent extraction)

**Acceptance test:** AC-08, AC-09, S2-03, S2-05

---

## Prompt 8 — Admin Parity & QA Pass

**Goal:** Admin dashboard matches spec — no missing fields, no broken flows.

**Work:**
- Verify all localStorage keys exist and populate correctly (see §11 of PRODUCT_SPEC)
- Profile tab: ensure `avatarUrl`, `heroImageUrl`, `accentColor` fields exist and save
- Handle field: ensure QR code updates when handle changes (AC-15)
- Audit all `console.error` sources and fix (AC-16)
- Run full QA_SMOKE_TESTS.md and fix all ❌ items
- Fix any mobile layout issues at 375px (S11 suite)

**Files touched:** `able-merged.html` (targeted fixes only — no structural changes)

**Acceptance test:** Full QA_SMOKE_TESTS.md suite — target 0 ❌

---

## Prompt 9 — Fan Sign-Up Stub

**Goal:** Placeholder infrastructure for fan email capture — no real backend yet.

**Work:**
- Add "Fan Sign-Up" section toggle in admin (off by default)
- When on: renders a simple email input + CTA button on the profile
- On submit: stores email in `able_fan_signups` localStorage array (stub — no API call)
- Shows confirmation message ("Thanks, we'll be in touch")
- Admin: fan sign-ups count shown in a read-only field ("12 sign-ups stored locally")
- Clear note in UI: "Sign-ups stored locally. Connect an email provider to sync."

**Files touched:** `able-merged.html` (Fan Sign-Up section HTML, minimal JS)

**Acceptance test:** Section hidden by default, visible when toggled, submission works, count increments

---

## Prompt 10 — Catch-Up Feed Stub

**Goal:** Skeleton of the Catch-Up feed — architecture in place, no real content yet.

**What Catch-Up is:**
- A calm, finite, daily update surface for artists you follow
- NOT infinite scroll — a fixed set of updates per day (max 5)
- Updates appear once, are marked read, and don't reappear

**Work:**
- Add "Updates" tab to the profile (stub, visible to logged-in fans only — use a `?preview=catchup` query param for now)
- Feed renders a static array of mock update cards: `{ type: 'release'|'event'|'post', date, content }`
- "Mark all read" button clears the feed for the day (stores read date in localStorage)
- Feed is empty after marking read — shows "You're all caught up" state
- No API, no real data — purely structural

**Files touched:** `able-merged.html` (Catch-Up tab HTML, minimal JS stub)

**Acceptance test:** Tab appears with `?preview=catchup`, cards render, mark-read clears feed, empty state shows

---

## File Slice Request Order

When starting each prompt, request these file slices in order to avoid hitting context limits:

```bash
# 1. CSS tokens block (top of <style>)
sed -n '1,500p' able-merged.html

# 2. Target function by name (grep for exact location first)
grep -n "function updateSectionActionBtns" able-merged.html
grep -n "function updatePreviewCTA" able-merged.html
grep -n "function rebuildUIFromState" able-merged.html
grep -n "function applyDashboardDataToProfile" able-merged.html

# 3. Read ±50 lines around a function
sed -n '14265,14340p' able-merged.html

# 4. Read a specific HTML section
sed -n '12142,12350p' able-merged.html
```

Always confirm line numbers before editing — they shift as content is added.
