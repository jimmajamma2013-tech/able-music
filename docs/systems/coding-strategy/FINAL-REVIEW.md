# ABLE — Coding Strategy: Final Review
**Is this coding standard strict enough? Is it specific enough for a build agent?**
**Date: 2026-03-16**

---

## Is the coding standard strict enough to prevent quality regression?

**Overall answer: yes, with one known gap.**

The SPEC.md covers the most common regression vectors:
- Hardcoded colours (the single most frequent quality regression in single-file HTML projects)
- Bare localStorage reads (the most common source of runtime errors in this architecture)
- Missing `rel="noopener"` on external links (security + browser warning regression)
- Missing `aria-label` on icon buttons (accessibility regression)
- `innerHTML` with unescaped user content (XSS regression)
- Missing `prefers-reduced-motion` (accessibility regression that appeared in this build)

The known gap is **specificity in error state coverage**. SPEC.md covers what happens when localStorage is empty or malformed, but it does not spec what the UI must show in each case. A build agent following SPEC.md would write safe code that doesn't crash — but might show a blank section rather than a meaningful empty state. The design spec for each page covers empty states, but SPEC.md should reference this more explicitly.

**Recommendation:** Add one sentence to SPEC.md §JS.3 (JSON.parse try/catch rule): "On catch, render the canonical empty state for the section — not a blank space and not a console.error only."

---

## Are the patterns specific enough to be followed by a build agent without human review?

**Overall answer: mostly yes, with two areas needing more specificity.**

**Area 1: CSS token discoverability**

SPEC.md tells an agent "use CSS tokens always" and lists the canonical token names for both files. However, if an agent is working on `start.html` or `landing.html` — which have lighter token sets — it may not know which tokens from `able-v7.html`'s system are available. A build agent that assumes `--color-text` exists in `start.html` will produce code that renders incorrectly.

**Fix:** Add a "token availability matrix" to SPEC.md — a table showing which token namespaces are available in which files. Until then, an agent should always read the `:root` block of the target file before writing any CSS.

**Area 2: The right sync function to call**

SPEC.md says "all mutations call `syncProfile()`" but does not document the function signature or where it is defined in each file. An agent working in `admin.html` might call `syncProfile()` correctly; an agent working in a new file would not know to define it first.

**Fix:** SPEC.md should include a note that `syncProfile()` is the canonical mutation point and its implementation is in the `<script>` block of each relevant file. For new files, the pattern must be implemented from scratch rather than imported.

---

## Are there patterns in this standard that a build agent might misinterpret?

**Three potential misinterpretations:**

**1. "No hardcoded hex outside `:root`" — the SVG data URI exception**

Build agents tend to apply rules literally. The rule says "no hardcoded hex outside `:root`", but SVG data URIs (grain texture, icon sprites) require hardcoded colours because CSS variables cannot be interpolated into data URIs. An agent that follows the rule literally would either break SVG data URIs or refuse to write them.

The exception is documented in SPEC.md ("In SVG data URIs, use a comment documenting which token value the hardcoded colour represents") but a careful build agent should be prompted to check for this exception before flagging a data URI colour as a violation.

**2. Easing token naming inconsistency**

The single most dangerous inconsistency in the codebase for a build agent: `able-v7.html` uses `--ease-spring`, `admin.html` uses `--spring`. They are the same value, different names. An agent working across files could apply the wrong token and produce code that technically uses a valid CSS variable but refers to an undefined one in the target file.

This is documented in PATH-TO-10.md as P2.3. Until it is resolved, every build agent session must begin with: "Check which easing token names are defined in `:root` of the target file. Use only those names."

**3. The `debounce()` requirement for input handlers**

SPEC.md says "debounce all input handlers at 300ms". But `admin.html` does not currently have a named `debounce()` utility function. An agent following the spec correctly would attempt to call `debounce()` and find it undefined. The agent must define the utility function if it is not present — SPEC.md should make this explicit.

---

## What is the single most important coding standard?

**CSS tokens — hardcoded colours are the most common quality regression.**

Here is why this is true, and why it matters more than the others:

Every other quality regression is self-limiting. A missing `aria-label` affects one button. A bare `localStorage.getItem()` breaks one data path. A missing `rel="noopener"` is a security issue but only on that one link.

A hardcoded colour is different. The ABLE codebase has four themes. Every section of every page must render correctly on Dark, Light, Glass, and Contrast. When a colour is hardcoded, the theme system cannot reach it. The component works on one theme and is wrong on the others — often subtly wrong (readable but too high contrast, or too low, or the wrong brand feel). These bugs are invisible in normal testing because development happens on the dark theme. They appear only when a user switches to light mode or when an artist with the Contrast theme visits their own profile.

CSS token violations also compound: one hardcoded value in a component used 12 times means 12 instances to fix when the theme changes. The token system reduces this to zero.

The concrete rule to internalise: **before shipping any section, grep for `#[0-9a-fA-F]{3,6}` in the CSS of that section — any hit outside of `:root` is a defect.**

---

## Score: 8/10

**What this means:**
The coding standard is comprehensive, honest about known gaps, and specific enough for most build decisions. A build agent reading SPEC.md, ANALYSIS.md, and PATH-TO-10.md has enough context to write code that matches the existing codebase pattern without causing the most common regressions.

**What keeps it from 10:**

1. **Token availability matrix missing** — an agent cannot confidently know which tokens are available in `start.html` or `landing.html` without reading those files' `:root` blocks first. SPEC.md should include this.

2. **Easing token inconsistency unresolved** — the discrepancy between `--ease-spring` (v7) and `--spring` (admin) is documented and flagged but not yet fixed. Until it is fixed, this is a live trap for any agent working across files.

3. **Empty state behaviour on error not specced** — SPEC.md covers graceful degradation at the data layer (no crash, use fallback) but does not specify what the UI must render when data is absent. This is in the design specs for each page, not in the coding spec — a gap worth bridging.

**Path to 10 for this document:**

1. Add a token availability matrix table: file × token namespace × available (yes/no)
2. Resolve the easing token inconsistency (PATH-TO-10.md P2.3) — then remove the warning from this doc
3. Add one paragraph to SPEC.md §JS.3 specifying the UI expectation when `safeLS()` returns the fallback value

---

## Using this document in a build session

Before any build session, a build agent should read these four documents in order:

1. `CONTEXT.md` — active files, canonical keys, authority order
2. `docs/systems/coding-strategy/SPEC.md` — the rules (read once per project, refresh per session)
3. `docs/systems/coding-strategy/ANALYSIS.md` — honest current state (know what's already broken before adding more)
4. `docs/systems/coding-strategy/PATH-TO-10.md` — the P0 list (check: am I about to introduce a known defect pattern?)

Then open the target file's `:root` block and confirm which tokens are available before writing any CSS.

Then begin the build loop from PROCESS.md §8b.
