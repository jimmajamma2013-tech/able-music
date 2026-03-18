# C+D Dimensions — Wave 1 Code Changes
**Generated: 2026-03-18 | Agent scan of all C/D dimension files**

~95 items requiring code edits across V8 (able-v8.html), ADM (admin.html), LND (landing.html), STR (start.html)

---

## C Dimensions (Colour, Contrast & Themes)

### C1 — WCAG AA Contrast Compliance
- [ ] 1: V8 — Verify `--color-text-2` (rgba) contrast on card; if fails, increase opacity
- [ ] 2: V8 — Verify `--color-text-3` contrast; if fails at 3.2:1 on dark card, raise opacity
- [ ] 3: V8 — Audit all `--color-text-3` uses to confirm large-text-only or decorative
- [ ] 4: ADM — Verify `--dash-amber` (#f4b942) is never used as text on cream; flag violations
- [ ] 5: ADM — Verify admin focus ring (#c9a84c amber on #e4dfd7 cream) passes 3:1; fix if fails

### C2 — Light Theme Completeness
- [ ] 1: V8 — Override hero artist name white text to dark in light theme
- [ ] 2: V8 — Adjust hero gradient overlay for light theme text readability
- [ ] 3: V8 — Verify accent is contrast-safe for all 7 vibes in light (indie → #5a9e67, electronic → #0e8fa3)
- [ ] 4: V8 — Add accent overrides for light theme failing vibes (hiphop gold, acoustic tan, etc.)
- [ ] 5: V8 — Verify `applyDerivedTokens()` runs on theme switch, not just load

### C3 — Glass Theme Completeness
- [ ] 1: V8 — List all backdrop-filter selectors; count simultaneous layers (max 3)
- [ ] 2: V8 — Define glass token block (`--color-bg: transparent`, card rgba values)
- [ ] 3: V8 — Verify or add `-webkit-backdrop-filter` prefix alongside `backdrop-filter`
- [ ] 4: V8 — Define fallback background for glass when no artwork (dark gradient)
- [ ] 5: V8 — Fix background-attachment to `scroll` not `fixed` (iOS mobile bug)

### C4 — Contrast Theme Completeness
- [ ] 1: V8 — Define `[data-theme="contrast"]` token block (#000000 base, #ffffff text)
- [ ] 2: V8 — Test all 7 vibe accents on black; override failing ones (rock, R&B, etc.)
- [ ] 3: V8 — Verify focus ring white/bright in contrast theme
- [ ] 4: V8 — Implement `@media (prefers-contrast: more)` → auto-apply contrast theme
- [ ] 5: ADM — Add `@media (prefers-contrast: more)` to admin; raise `--dash-t3` to #444444

### C5 — Admin Light-Mode Palette
- [ ] 1: ADM — Fix `.rel-status-upcoming` text (#f4b942 amber) to `--dash-link` (#8c6200)
- [ ] 2: ADM — Fix `.rel-status-current` text (#34c759 green) to `--dash-green` (#1e9650)
- [ ] 3: ADM — Fix `.snap-btn.published` text (#7ec88a sage) to `--dash-green`
- [ ] 4: ADM — Fix `.ci-btn-connected` text if sage fails contrast

### C6 — Accent Colour Accessibility
- [ ] 1: V8 — Implement `getLuminance()` and `getContrastRatio()` WCAG formulas
- [ ] 2: V8 — In `applyDerivedTokens()`, calculate `--color-on-accent` (white vs #0d0e1a) based on contrast
- [ ] 3: V8 — Implement min luminance (0.09) and max luminance (0.85) clamping
- [ ] 4: V8 — Verify fan capture submit button uses `--color-on-accent` for text

### C7 — Focus Ring Visibility
- [ ] 1: V8 — Verify three-layer focus ring uses `[data-theme]` scoped token block
- [ ] 2: V8 — Fix inner gap layer for accent-filled buttons (use button bg, not page bg)
- [ ] 3: V8 — Test focus ring with all 7 vibe accents on dark card; override failures
- [ ] 4: V8 — Override focus ring in light theme to `--color-text` (#1a1a2e) for failing accents
- [ ] 5: ADM — Fix admin focus ring if amber on cream fails 3:1 (use `--dash-text` dark)

### C8 — Status Colour System
- [ ] 1: ADM — Add non-colour indicator to live state pill (icon shape + label)
- [ ] 2: ADM — Add non-colour indicator to gig state pill (distinct from live)
- [ ] 3: ADM — Add text label suffix to all source badges (IG / SP / TT / Direct)
- [ ] 4: V8 — Fix pre-release state "Check back soon" → "The list is full right now"

### C9 — Hardcoded Value Elimination
- [ ] 1: ALL — Run grep for hardcoded hex values; replace #0d0e1a → `var(--color-bg)`, etc.
- [ ] 2: V8 — Replace hardcoded #ffffff text → `var(--color-text)` or `var(--color-on-accent)`
- [ ] 3: V8 — Replace hardcoded rgba(224, 82, 66, 0.x) → `rgba(var(--color-accent-rgb), 0.x)`
- [ ] 4: ADM — Replace hardcoded #e4dfd7, #f8f5f0, #1a1a2e → dashboard token variables
- [ ] 5: ALL — Define missing RGB tokens (`--color-accent-rgb`, `--acc-rgb`, `--dash-shell-rgb`)

### C10 — Dark Mode Media Query
- [ ] 1: V8 — Implement theme resolution: (1) localStorage → (2) prefers-color-scheme → (3) dark default
- [ ] 2: V8 — Add `@media (prefers-contrast: more)` override (highest priority)
- [ ] 3: V8 — Move theme-init script to `<head>` to prevent FOWT (flash of wrong theme)
- [ ] 4: V8 — Verify `applyDerivedTokens()` runs on load, before first paint
- [ ] 5: ADM — Confirm admin never applies `@media (prefers-color-scheme: dark)` — always light

---

## D Dimensions (Copy, Voice & Messaging)

### D1 — Banned Phrase Compliance
- [ ] 1: STR — Replace "Something went wrong. Try again…" with "Couldn't complete that step. Try again or use the skip link below."
- [ ] 2: STR — Fix Spotify confirm button "let's go" → "continue"
- [ ] 3: ADM — Fix fan reach text "followers" → specific copy about email reach
- [ ] 4: ADM — Fix snap empty state "post a note" → "share a note"

### D2 — Campaign State Copy Coverage
- [ ] 1: V8 — Fix gig-state fan capture heading to "I'm playing tonight."
- [ ] 2: V8 — Fix pre-release fan capture heading to "You signed up right before something."
- [ ] 3: V8 — Implement state-driven fan capture sub text in `renderFanCapture()`
- [ ] 4: ADM — Fix admin Campaign HQ profile-state pill label to "Live" (not "Profile")
- [ ] 5: ALL — Verify fan confirmation email subject changes per campaign state (pre-release, gig, live)

### D3 — First-Person Artist Voice
- [ ] 1: V8 — Replace "Music by [Artist]" section heading with "My music"
- [ ] 2: V8 — Replace "Shows" section heading with "I'm playing" or keep neutral
- [ ] 3: V8 — Fix fan capture sub text "The artist will reach out" → "I'll reach out"
- [ ] 4: V8 — Replace snap card heading "Posted by [Artist]" with first-person or no byline
- [ ] 5: V8 — Replace "Support [Artist]" CTA with "Support me"

### D4 — CTA Verb Directness
- [ ] 1: ALL — Replace "Submit" on any form → "Save", "Send", or "Confirm"
- [ ] 2: STR — Replace "Continue" on onboarding buttons with specific action verb
- [ ] 3: ALL — Replace "Click here" with descriptive verb phrase
- [ ] 4: ADM — Replace "OK" confirmation dialogs with specific outcome ("Delete show")
- [ ] 5: ADM — Replace generic "Yes"/"No" with outcome labels ("Delete it" / "Keep it")

### D5 — Onboarding Copy Progression
- [ ] 1: STR — Confirm step 1 heading is "What's happening right now?" (not generic form label)
- [ ] 2: STR — Confirm moment cards are canonical labels: "Just me, being an artist", "Something's coming", "Music just dropped", "I'm playing tonight"
- [ ] 3: STR — Replace Spotify confirm button "Looks right — let's go" → "Looks right — continue"
- [ ] 4: STR — Replace "Something went wrong" error with "Couldn't reach Spotify right now. Skip and enter your name below."
- [ ] 5: STR — Replace "Check your inbox. Click it and you'll see your page." → use tap language for mobile

### D6 — Empty State Copy
- [ ] 1: ADM — Fix fans empty state to canonical: "When fans sign up on your page, they'll appear here. Your list. Your relationship."
- [ ] 2: ADM — Fix shows empty state "ABLE will surface it" → "it appears on your page automatically"
- [ ] 3: ADM — Fix snap cards empty state "post a note" → "share a note, a link, or a moment"
- [ ] 4: ADM — Fix activity feed empty state emoji + "Nothing yet" → "No activity yet" (remove emoji)
- [ ] 5: ADM — Add empty states for filter results ("No fans match that search", "No fans from [source] yet")

### D7 — Error State Copy
- [ ] 1: STR — Replace "Something went wrong" fallback with "Couldn't complete that step. Try again or use the skip link below."
- [ ] 2: ADM — Replace QuotaExceededError text to "Your device is running low on storage. Export your fans as CSV to free space."
- [ ] 3: ADM — Verify offline toast accuracy (if changes are NOT saved offline, state that clearly)
- [ ] 4: ADM — Replace "Copy failed" with "Couldn't copy — try selecting and copying manually."
- [ ] 5: STR — Add Spotify import error message to the UI when import fails (not just console)

### D8 — Tier Gate Copy
- [ ] 1: ADM — Fix all truncated `GATE_COPY` entries ending with "Artist." → "Artist plan."
- [ ] 2: ADM — Standardise CTA button verb across all gates (replace "Move" with "Switch to" or "Unlock")
- [ ] 3: ADM — Verify `applyGates()` function is called on page load (line 7259)
- [ ] 4: ADM — Wire the `id="broadcastGloSub"` element if it's meant for dynamic content injection
- [ ] 5: ADM — Replace generic upgrade bar CTA "See what's included →" with "See what Artist plan includes →"

### D9 — Landing Page Headline Conversion
- [ ] 1: LND — Verify hero headline "100 real fans beat 10,000 strangers." is never changed without conversion test
- [ ] 2: LND — Consider resharpening hero eyebrow from "For independent artists" → "For artists without a label"
- [ ] 3: LND — Verify "Your page is free →" CTA remains unchanged (canonical)
- [ ] 4: LND — Verify "You've had a Linktree for 2 years. What does it know about your release?" remains (best conversion heading)
- [ ] 5: LND — Verify "100 real fans beat 10,000 strangers." landing page copy never uses exclamation marks

### D10 — Cross-Page Vocabulary
- [ ] 1: ALL — **Decide canonical user-facing name**: snap cards as "Snap cards" or "Updates"? Document decision.
- [ ] 2: ADM — Once decision made, update nav label, page title, empty state, gate copy, ARIA labels to canonical
- [ ] 3: ADM — Replace all `moments` user-facing strings with "shows"
- [ ] 4: ADM — Fix `followers` → "fans" (admin.html line 3874)
- [ ] 5: ALL — Standardise pre-save hyphenation: `pre-save` in all user-facing copy
