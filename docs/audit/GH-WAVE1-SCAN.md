# G+H Dimensions — Wave 1 Code Changes
**Generated: 2026-03-18 | Agent scan of all G/H dimension files**

~210 items requiring code edits across V8, ADM, STR, LND, netlify/functions/

---

## G1 — Campaign State Transitions
- [ ] ADM: `computeEffectiveState()` and `computeState()` differ in gig check order — reconcile
- [ ] V8+ADM: `computeState()` returns `'gig-post'` but `computeEffectiveState()` doesn't — add gig-post handling
- [ ] V8+ADM: `computeEffectiveState()` fallback disagrees — both default to `'profile'` not `'live'`
- [ ] ADM: No guard when artist sets `stateOverride: 'pre-release'` with past date — add validation
- [ ] ADM: `_gigCountdownInterval` not cleared on natural expiry — add cleanup
- [ ] V8: Add `'gig-post'` to `STATE_PROMOTIONS` map
- [ ] V8: Guard: `stateOverride: 'auto'` should be falsy — fix comparison logic
- [ ] ADM: Verify `loadCampaignHQ()` called in main init sequence

## G2 — Fan Capture Deduplication
- [ ] V8: Before push: check email case-insensitive, reject duplicate
- [ ] V8: Return "You're already on [Artist]'s list" for duplicate
- [ ] V8: Normalize email to lowercase before comparison and storage
- [ ] V8: Skip fan-count increment on duplicate submission
- [ ] V8: Skip first-fan milestone fire on duplicate
- [ ] V8: Do not fire analytics click event for duplicate sign-up
- [ ] V8: Trim email before comparison and storage
- [ ] ADM: Count unique emails in fan count stat (not total array length)
- [ ] V8: Free tier fan-cap check runs AFTER dedup
- [ ] V8: If `able_fans` corrupted (not array), default to empty array

## G3 — CTA Deduplication Enforcement
- [ ] ADM: `savePrimaryCTA()` must check if URL exists in quickActions
- [ ] ADM: Compare CTAs by URL, not label
- [ ] ADM: Normalize URL comparison (trailing slash, case, www removal)
- [ ] V8: Last-resort guard: if `renderQuickActions()` receives URL in hero, skip it
- [ ] V8: If hero CTAs share URL, render only first one

## G4 — Gig Mode Expiry
- [ ] ADM: Countdown reaching zero: remove gig_expires, clear stateOverride, recompute state
- [ ] ADM: `computeEffectiveState()`: expired gigExp → don't return stateOverride='gig'
- [ ] V8: After gig expires, `computeState()` must NOT return stateOverride='gig' — add expiry guard
- [ ] ADM: Clear `_gigCountdownInterval` via `clearInterval()` on expiry
- [ ] ADM: On admin load: if `able_gig_expires` present and expired — run cleanup immediately
- [ ] V8: If stateOverride='gig' but gig_expires absent/expired → return auto-state

## G5 — Release Date Edge Cases
- [ ] V8: Guard: `releaseDate` null → return `'profile'`
- [ ] V8: Guard: `releaseDate` empty string → treat as null
- [ ] V8: Guard: non-ISO string → catch NaN, fallback
- [ ] V8: Guard: invalid date "2026-02-30" → `isNaN(new Date(...))` check
- [ ] V8: Removing `releaseDate` entirely → handle gracefully

## G6 — Tier Gate Enforcement
- [ ] ALL: Create `getTier()` helper: read able_tier, validate, default to "free"
- [ ] V8: When cap reached, show "This artist's fan list is currently full"
- [ ] STR: start.html writes `able_tier = "free"` on completion

## G7 — localStorage Schema
- [ ] ALL: Define `STORAGE_KEYS` constant: all canonical keys
- [ ] ALL: All localStorage reads use STORAGE_KEYS.X not raw strings
- [ ] ALL: All localStorage.getItem() wrapped in try/catch
- [ ] ALL: All localStorage.setItem() wrapped in try/catch

## G8 — Analytics Event Fidelity
- [ ] V8: Hero CTA tap: push `{label, type: "hero-cta", ts, source}`
- [ ] V8: Per-element 300ms debounce on all CTAs — no duplicate events
- [ ] ALL: Create `trackClick(label, type)` utility in shared/analytics.js

## G9 — Source Attribution Capture
- [ ] V8: Parse URL params at first line (already done, verify)
- [ ] V8: Priority: ref → source → utm_source (already done, verify)
- [ ] V8: Store resolved source in module-level SESSION_SOURCE constant
- [ ] V8: Default to "direct" when no params
- [ ] V8: Sanitize: trim, lowercase, limit 100 chars, strip <>"'
- [ ] ADM: "Copy link" button copies with ?ref=instagram

## G10 — First Visit State
- [ ] V8: Define `able_artist_claimed` as canonical V8 first-visit gate
- [ ] V8: If absent/falsy on load, show "This is your page — share it" banner
- [ ] V8: Check `able_artist_claimed` before analytics fire
- [ ] STR: Don't set able_artist_claimed in wizard

## H1 — XSS Prevention
- [ ] V8+ADM: Validate accent hex format before CSS: `/^#[0-9a-fA-F]{6}$/`
- [ ] V8: Audit `?ref=` param — never reflected unescaped
- [ ] V8: XSS test: `<script>alert(1)</script>` in artist name → no alert

## H2 — Content Security Policy
- [ ] netlify.toml: Add CSP header block (default-src, script-src, style-src, font-src, img-src, connect-src, frame-src, object-src, base-uri, form-action)

## H3 — Supabase Key Handling
- [ ] ALL: Grep for sbp_ prefix — must be zero
- [ ] ALL: Anon key only in active HTML files, not archived

## H4 — oEmbed SSRF Protection
- [ ] netlify: Add AbortController timeout to oEmbed fetch() — 5s
- [ ] netlify: Add max response size limit 64KB
- [ ] netlify: Sanitize oEmbed html field: strip all tags except <iframe>
- [ ] netlify: Email validation upgrade: `/^[^\s@]{1,64}@[^\s@]{1,255}$/`
- [ ] netlify: Validate accentHex, artistSlug format

## H5 — Input Validation
- [ ] netlify: Upgrade fanEmail validation from includes('@') to RFC regex
- [ ] netlify: Max length email 254, artistName 100, url 2048
- [ ] netlify: Create `_validate.js` shared validation utility
- [ ] ADM+V8: Client-side validation: email format, max length

## H6 — localStorage Quota Handling
- [ ] ALL: Wrap every localStorage.setItem() in try/catch (verify safeSet exists)
- [ ] V8: Auto-prune able_clicks/able_views at 500 entries
- [ ] ADM: Cap able_clicks/able_views at 1000 entries (verify enforced)
- [ ] ALL: Create `pruneOldEvents(key, maxCount)` utility

## H7 — First Contentful Paint
- [ ] ALL: Google Fonts loaded non-blocking: `media="print" onload="this.media='all'"`
- [ ] V8: Move accent colour script to <head> to prevent colour flash
- [ ] V8: Move theme class application to <head> to prevent theme flash
- [ ] V8: Add `loading="eager" fetchpriority="high"` to hero artwork img
- [ ] V8: Add `loading="lazy"` to all below-fold images
- [ ] V8: Add aspect-ratio CSS to artwork containers (prevent CLS)

## H8 — Image Optimisation
- [ ] V8: Set Unsplash ?w=800&q=75&fm=webp&auto=format
- [ ] V8: Add `decoding="async"` to non-critical images
- [ ] netlify.toml: Cache-Control immutable for image files

## H9 — JavaScript Error Handling
- [ ] ALL: Add window.onerror and unhandledrejection handlers
- [ ] ALL: Create `safeParseJSON(str, fallback)` utility
- [ ] ALL: Replace bare JSON.parse() with safeParseJSON()
- [ ] V8: Wrap fan sign-up fetch() with 5-second AbortController timeout
- [ ] ALL: Guard document.querySelector() results before method calls
- [ ] ALL: Verify no console.log in committed code

## H10 — Data Migration Readiness
- [ ] docs: Sync canonical localStorage key list in CLAUDE.md and SPEC.md
- [ ] docs: Write full CREATE TABLE DDL in SPEC.md
- [ ] docs: Write migration spec: function, dual-source, rollback plan
