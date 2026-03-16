# ABLE — Session Checklist
*Condensed. One page. Fast to scan.*
*Full detail: `docs/MASTER-CHECKLIST.md`*

---

## START OF SESSION

- [ ] Read `CONTEXT.md`
- [ ] Read `docs/STATUS.md`
- [ ] `git branch` — confirm correct branch
- [ ] `git status` — confirm clean working tree
- [ ] If BUILD session: Playwright screenshot any page (confirms MCP is live)
- [ ] If STRATEGY session: check `docs/MASTER-CHECKLIST.md` Part 2 — confirm what's missing

---

## DURING STRATEGY WORK

- [ ] Every new doc set: ANALYSIS → SPEC → PATH-TO-10 → FINAL-REVIEW (4 minimum)
- [ ] Full page: add USER-JOURNEYS → COPY → DESIGN-SPEC → STRATEGY-REVIEW → FINAL-20-ANGLE → FINAL-20-ANGLE-2
- [ ] FINAL-20-ANGLE-2 is mandatory — challenge every ceiling from pass 1
- [ ] 20-angle scoring on every analysis. Show full scorecard table every pass.
- [ ] Every score shown honestly — never inflate a ceiling
- [ ] Every copy string checked against `docs/systems/copy/SPEC.md` + `docs/VOICE-BIBLE.md`
- [ ] Cross-reference new docs against existing docs for consistency

---

## DURING BUILD WORK

- [ ] Read `DESIGN-SPEC.md` for the page before writing a single line of code
- [ ] Write this sentence before coding: "This page is for [user], who fears [fear], and the P0 thing that must work is [P0]."
- [ ] Parse-check every JS block: `node -e "new Function(src)"`
- [ ] Playwright screenshot after every section (375px, 390px, 768px, 1280px)
- [ ] All 4 themes tested after any CSS change (Dark, Light, Glass, Contrast)
- [ ] Mobile at 375px — no horizontal scroll, all tap targets ≥44px
- [ ] Commit after every logical chunk
- [ ] No "dashboard" in any user-facing string
- [ ] No "superfan" anywhere — use `core`
- [ ] No exclamation marks in admin/dashboard copy
- [ ] No force-push, no `rm -rf`, no `reset --hard`

---

## END OF SESSION

- [ ] All changes committed — descriptive messages
- [ ] `docs/STATUS.md` updated (session summary + newly discovered issues)
- [ ] Playwright smoke test on changed pages
- [ ] Mark completed items in `docs/MASTER-CHECKLIST.md`
- [ ] New bugs added to `docs/STATUS.md` known issues
- [ ] Date updated at top of `docs/MASTER-CHECKLIST.md`

---

## Banned phrases (never ship these)

`superfan` · `dashboard` · `get started` · `unlock` · `grow your audience` · `turn fans into` · `monetis` · `going viral` · `content creator` · `you're all set` · `welcome aboard` · `mailing list` · `newsletter` · `level up` · `supercharge` · `engage your` · `subscribers` · `!` (in admin copy)

## P0 outstanding (do these before any build)

- `admin.html` L44 + L1288: `#888` → `#777777` (WCAG fail)
- `able-v7.html`: OG image — only write tag when URL is absolute (not blob:)
- `able-v7.html`: `<meta name="description">` — update dynamically from `profile.bio`
- `able_profile` vs `able_v3_profile`: canonicalise to `able_v3_profile` everywhere
- Focus ring glow: add to `admin.html`, `start.html`, `landing.html`
- Toast copy: audit all `showToast()` calls in `admin.html` (P0.7)
- Form placeholders: audit all `placeholder` attributes in admin editors (P0.8)
