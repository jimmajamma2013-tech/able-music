# ABLE — Hard-Won Lessons
**Living document. Add lessons as they're earned. Never delete. Last updated: 2026-03-16.**

> These are ABLE-specific lessons from actual build sessions. Each entry has a rule, why it matters, and how to verify.

---

## JS Safety

**Rule:** Parse-check every `<script>` block after editing using `node -e "require('fs').readFileSync('file.html','utf8').match(/<script[^>]*>([\s\S]*?)<\/script>/g)?.forEach(b=>{try{new Function(b.replace(/<\/?script[^>]*>/g,''))}catch(e){console.error(e.message)}})"`.
**Why:** A syntax error in any inline script block silently breaks all JS on the page — no bundler catches it.
**How to check:** Run the parse-check command above; zero output = pass. Any error message = fix before committing.

**Rule:** Never use `eval()` or `innerHTML` with untrusted data.
**Why:** No sanitisation layer exists — ABLE has no DOMPurify or equivalent.
**How to check:** `grep -n "eval(\|innerHTML.*\+" able-v7.html` should return zero hits in JS context.

**Rule:** Wrap all top-level initialisation in `DOMContentLoaded`.
**Why:** Single-file HTML — scripts run inline; DOM may not be ready otherwise.
**How to check:** Confirm all `document.getElementById` calls outside of event handlers are inside a `DOMContentLoaded` listener.

**Rule:** All `localStorage` access must use `try/catch` with `JSON.parse`.
**Why:** localStorage can be blocked (private browsing, quota exceeded) or corrupt — a parse error kills the whole init path.
**How to check:** `grep -n "localStorage.getItem\|JSON.parse" able-v7.html | grep -v "try\|safeGet"` — should be empty; use `safeGet()`/`safeSet()` wrappers everywhere.

**Rule:** Use `async/await` over raw `.then()` chains.
**Why:** Error propagation is cleaner; unhandled rejections are easier to spot.
**How to check:** Search for `.then(` in JS blocks — each should have a matching `.catch()`.

---

## CSS Tokens

**Rule:** Never use inline styles except where value is computed dynamically by JS (e.g. `el.style.setProperty('--color-accent', val)`).
**Why:** Inline styles bypass the token system — a single token rename breaks drift silently.
**How to check:** `grep -n "style=\"" able-v7.html` — each hit must be a JS-driven dynamic value, not a hardcoded colour or spacing literal.

**Rule:** Always use CSS custom properties from `:root` — never hardcode colour hex values in CSS rules.
**Why:** ABLE's accent system (`--color-accent`) is artist-owned; hardcoded colours break theme switching.
**How to check:** `grep -n "#[0-9a-fA-F]\{3,6\}" able-v7.html` in the `<style>` block — only token definitions at `:root` and theme overrides are acceptable.

**Rule:** Spacing uses the 4px grid tokens: `--sp-1` (4px) through `--sp-16` (64px). Use `--tap-min: 44px` for touch targets.
**Why:** Consistent rhythm. Arbitrary pixel values accumulate into layout drift.
**How to check:** Scan any new CSS rules for raw `px` values that aren't on the 4px grid.

---

## Theme System

**Rule:** All 4 themes (Dark / Light / Glass / Contrast) must be verified after any CSS change.
**Why:** Themes override `:root` tokens — a change that looks fine in Dark may break Light or Contrast text contrast.
**How to check:** In Playwright, cycle `data-theme` attribute through `dark`, `light`, `glass`, `contrast` and take a screenshot of each.

**Rule:** Glass theme requires a background image to be meaningful — never demo Glass without `bg-image` set.
**Why:** Glass uses `backdrop-filter: blur(28px) saturate(180%)` — on a solid colour it looks broken.
**How to check:** In the Glass theme test, confirm `#profile-bg` has a background-image applied.

**Rule:** Contrast theme must have minimum 4.5:1 text contrast ratio everywhere.
**Why:** WCAG 2.2 AA — ABLE commits to accessibility as a product value.
**How to check:** Run axe or manually check contrast of body text against background in the Contrast theme.

**Rule:** Admin dashboard uses its own separate token set (`--dash-*`) — never mix artist profile tokens into admin CSS.
**Why:** The admin accent is Amber (`#c9a84c` / `--acc`) not the artist's accent colour.
**How to check:** Confirm admin CSS only references `--bg`, `--card`, `--acc`, `--dash-*` variables — not `--color-accent`.

---

## CTA Architecture

**Rule:** Hero CTAs max 2: primary (accent fill, `#cta-primary`) and secondary (ghost, `#cta-secondary`). Never add a third.
**Why:** A third hero CTA dilutes conversion — the artist's most important action must dominate.
**How to check:** Count `.btn-primary` and `.btn-secondary` inside `#hero-ctas` — must be ≤ 2 each.

**Rule:** Quick Action pills max 4 on narrow viewports / 6 on wide. Overflow goes behind a "+ N more" toggle.
**Why:** Mobile screen space is finite — pill overflow loses the artist's primary CTAs below the fold.
**How to check:** At 375px viewport, count visible pills; verify overflow toggle shows for any beyond the cap.

**Rule:** Section Actions max 2 per section (Music, Events, Merch, Support).
**Why:** Sections have their own conversion moment — more than 2 actions per section creates choice paralysis.
**How to check:** Count action buttons/links inside each `<section>` — must be ≤ 2.

**Rule:** Global dedupe — same URL cannot appear in Hero CTAs and Quick Actions simultaneously. Hero wins.
**Why:** Duplicates erode click-through signal in analytics and make the page feel undesigned.
**How to check:** After `renderCTAs()`, compare `href` values across all three zones for duplicates.

---

## Mobile Rules

**Rule:** Minimum 44px tap target for every interactive element — use `min-height: var(--tap-min)` or padding.
**Why:** iOS HIG and WCAG 2.5.5 — below 44px causes mis-taps on a phone held in one hand.
**How to check:** In Playwright at 375px, use axe `target-size` rule or visually inspect buttons.

**Rule:** No horizontal scroll at 375px viewport width.
**Why:** Horizontal scroll on mobile is a hard UX failure — hides content, breaks PWA feel.
**How to check:** `await page.setViewportSize({width:375,height:812})` then `page.evaluate(()=>document.body.scrollWidth > 375)` must return false.

**Rule:** All iframes must be contained — set `max-width: 100%` and use `aspect-ratio` not fixed heights.
**Why:** Spotify, YouTube, and SoundCloud embeds overflow the card at 375px without explicit containment.
**How to check:** At 375px, scroll to the music section and confirm no iframe exceeds viewport width.

---

## Copy Rules

**Rule:** Never write the banned phrases: "Turn fans into superfans", "Grow your audience", "Monetise your fanbase", "Engage your followers", "Content creator", "Going viral", "Get started!", "You're all set!".
**Why:** ABLE's brand voice is direct, honest, anti-SaaS. These phrases signal everything ABLE is not.
**How to check:** `grep -rn "superfan\|Grow your\|Monetise\|Content creator\|Going viral\|Get started!\|You're all set" able-v7.html admin.html start.html landing.html`

**Rule:** No exclamation marks in dashboard copy.
**Why:** Dashboard is a professional tool. Exclamation marks feel condescending to a serious artist.
**How to check:** `grep -n "!" admin.html` — flag any in user-visible text strings (excluding JS operators).

**Rule:** Profile page copy is written in the artist's voice (first person).
**Why:** The profile belongs to the artist — "I'm playing tonight" not "Artist is playing tonight".
**How to check:** Read all user-visible strings in able-v7.html hero/bio/state sections — verify first person where artist-authored.

**Rule:** Dashboard greetings: "Good to see you, [Name]." — warm, one beat, done. Never "Welcome back!" or "Hey there!".
**Why:** ABLE treats artists as peers, not users. Generic SaaS greetings break that register.
**How to check:** Read `#homeGreeting` content and the `buildGreetingSub()` output branches.

---

## localStorage Keys

**Rule:** Never rename localStorage keys. Current canonical keys are locked.
**Why:** Keys map 1:1 to future Supabase table rows — renaming breaks data migration.
**How to check:** Cross-reference any `localStorage.setItem` key strings against the table in CONTEXT.md — they must match exactly.

**Rule:** The `able_starred_fans` key is deprecated — new code should use `Fan.isStarred` on the fan object.
**Why:** The starred state was migrated to the fan object in a V8 session — two sources of truth causes drift.
**How to check:** New fan-starring code should update the fan object in `able_fans`, not `able_starred_fans`.

**Rule:** `able_profile` is a legacy wizard key — admin.html runs `migrateWizardKey()` on load to merge it into `able_v3_profile`.
**Why:** The wizard originally wrote to `able_profile`; all subsequent code reads `able_v3_profile`.
**How to check:** Confirm `migrateWizardKey()` exists and is called in admin.html's init path.

---

## File Safety

**Rule:** Never touch `index.html`, `_archive/*`, `able-v3.html`, or `able-v6.html`.
**Why:** `index.html` is redirect-only; archive files are dead versions — edits cause confusion with no benefit.
**How to check:** Before committing, run `git diff --name-only` and verify none of these files appear.

**Rule:** Active files are exactly four: `able-v7.html`, `admin.html`, `start.html`, `landing.html`. `fan.html` is in progress.
**Why:** Every other .html file in the root is superseded or has a specific locked purpose.
**How to check:** `git diff --name-only HEAD` — flag any HTML edits outside the five active files.

**Rule:** `screenshots/` is Playwright audit output — never reference these paths in code.
**Why:** Screenshot filenames are ephemeral — they'll break when Playwright regenerates.
**How to check:** `grep -rn "screenshots/" able-v7.html admin.html start.html landing.html` should return zero.

---

## Commit Pattern

**Rule:** Commit after each logical chunk using conventional commits: `feat(scope):`, `fix(scope):`, `docs(scope):`, `chore(scope):`.
**Why:** Atomic commits make bisect, review, and rollback fast. Mixed commits obscure what changed.
**How to check:** `git log --oneline -10` — each commit should be one concern, not "fix lots of stuff".

**Rule:** Never force-push, never `rm -rf`, never `git reset --hard` without explicit instruction from James.
**Why:** Destructive git operations on the only working copy lose days of work.
**How to check:** These commands should never appear in automated scripts.

---

## Hallucination Guard

**Rule:** Never claim "tests pass", "it works", or "verified" without showing actual output.
**Why:** The single biggest failure mode in AI-assisted dev is confident assertions without evidence — they waste debugging time.
**How to check:** Every claim about functionality must be accompanied by Playwright output, a parse-check result, or a specific git SHA.

**Rule:** When in doubt about what's built, read the file — don't assume from memory.
**Why:** The codebase changes every session. Session memory is unreliable for code state.
**How to check:** Use `Read` or `Grep` to verify before asserting.
