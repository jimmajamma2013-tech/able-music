# ABLE — Launch Sequence: Path to 10/10
**Created: 2026-03-16**

> This is the checklist. SPEC.md is the strategy. ANALYSIS.md is the diagnosis. FINAL-REVIEW.md is the score.
> Work through this in order. Do not skip items. Each item has a clear done state.

---

## Phase 0 — Before any artist touches the product

### P0.1 — James's own ABLE page
**Done when:** A live URL exists that James is comfortable sharing with a musician he respects.

- [ ] Complete start.html onboarding wizard with real data (not test data)
- [ ] Real bio written in James's actual voice
- [ ] At least 1 real music link or creative work linked
- [ ] Accent colour and vibe chosen deliberately
- [ ] Hero CTAs pointing to something real
- [ ] Fan sign-up wording feels genuine
- [ ] Page loads cleanly at 375px, 390px, and 430px
- [ ] Page URL noted and saved

**Confidence check:** Would James share this URL in a DM to an artist he knows and say "this is what I built"? If yes: done. If not: keep working.

---

### P0.2 — End-to-end flow tested personally
**Done when:** James has completed every step below without errors, in a clean browser.

- [ ] Clear all localStorage (DevTools → Application → Clear All)
- [ ] Open landing.html — does the value proposition land in under 10 seconds?
- [ ] Tap hero CTA — does start.html open?
- [ ] Complete wizard with Spotify URL (if Spotify import is wired) or manually
- [ ] Arrive at able-v7.html — is the page compelling?
- [ ] Open admin.html — does the greeting appear? Is the dashboard navigable?
- [ ] Set campaign state to "pre-release" with a future date — does the page switch?
- [ ] Set campaign state to "gig" — does the page switch? Does the countdown appear?
- [ ] Sign up as a fan (incognito window) — does the flow complete?
- [ ] Check admin.html fan list — does the fan appear with the correct source?
- [ ] Activate gig mode, wait for auto-deactivate at midnight (or manually test the logic)

**Bug log:** Any failure above = P0 bug. Log it, fix it, retest before moving forward.

---

### P0.3 — 5 real fan sign-ups on James's page
**Done when:** James's own page has 5 real fan emails in the fan list from real people.

- [ ] Share the page URL with 5 real people (friends, genuine music listeners, people who'd care)
- [ ] Confirm the sign-up flow works for each person
- [ ] Confirm each fan appears in admin.html with a source
- [ ] Confirm the confirmation email arrives and sounds right

**Note:** These are real people. Don't ask them to "test" anything. Ask them to sign up because you're sharing something you made. The difference matters.

---

### P0.4 — Named beta artist list
**Done when:** A document exists with 10 named artists, contact method, and why they're on the list.

- [ ] List 10 artists James knows personally or has a genuine warm path to
- [ ] For each: name, contact method, genre/vibe, why they're a good fit
- [ ] For each: confirm at least 1 active social account or recent release
- [ ] Genre check: at least 4 different vibes from the 7-vibe system represented
- [ ] At least 1 artist who is less digitally fluent (tests onboarding for non-technical users)
- [ ] At least 2 who are not UK-based (tests international relevance)
- [ ] James is confident each will say yes to a personal invitation

**Format:** This can be a simple list in a text doc or a note. It does not need to be a spreadsheet.

---

### P0.5 — Smoke test suite passing
**Done when:** Playwright smoke tests cover all critical paths and pass on a clean run.

- [ ] Test: start.html wizard completes without errors
- [ ] Test: able-v7.html renders correctly for each of the 4 campaign states
- [ ] Test: fan sign-up stores correctly to localStorage
- [ ] Test: admin.html fan list shows sign-ups with correct source
- [ ] Test: campaign state change in admin reflects on able-v7.html
- [ ] Test: gig mode activates and deactivates correctly
- [ ] Test: all 4 themes (Dark / Light / Glass / Contrast) render without layout breaks at 375px
- [ ] Test: no horizontal scroll at 375px on any page

---

## Phase 1 — Private beta (10 artists, 2 weeks)

### P1.1 — Onboarding infrastructure ready
**Done when:** James can onboard each artist smoothly without improvising.

- [ ] Onboarding script written (not a script to read — a set of talking points James knows cold)
- [ ] WhatsApp group or Discord channel created for beta artists
- [ ] Feedback template written: 3 questions James will ask at end of Week 1 and Week 2
- [ ] Fix turnaround target communicated to beta artists: "I'll fix anything reported within 48 hours"
- [ ] James's availability confirmed: he can respond to messages within 4 hours during Phase 1

---

### P1.2 — All 10 artists onboarded
**Done when:** 10 artists have live pages.

For each artist:
- [ ] Personal outreach made (not a group message — individual conversations)
- [ ] 1:1 onboarding conversation completed (in person, call, or voice notes)
- [ ] Artist has completed start.html wizard
- [ ] Artist's page is live at their URL
- [ ] Artist has the WhatsApp/Discord channel link
- [ ] Artist has been shown how to access admin.html

---

### P1.3 — 100 real fan sign-ups
**Done when:** Aggregate fan count across all 10 pages reaches 100.

- [ ] Track sign-up count weekly (check admin.html for each artist, or check Supabase when live)
- [ ] If any artist is below 5 fans after Week 1: check if their link is in their bio, offer to help
- [ ] Confirm source tracking is working: sources visible in fan list for each artist

---

### P1.4 — Week 1 feedback collected
**Done when:** James has heard from at least 8 of 10 artists about their first week.

- [ ] Send Week 1 prompt to all 10 artists (via WhatsApp/Discord, individually)
- [ ] Log every piece of feedback received
- [ ] Identify the top 3 friction points across all feedback
- [ ] Fix at least 1 friction point before Week 2 prompt

---

### P1.5 — Week 2 feedback and gate check
**Done when:** Phase 1 success criteria are met (see SPEC.md).

- [ ] Send Week 2 prompt to all 10 artists
- [ ] Log feedback
- [ ] Check all Phase 1 success criteria:
  - [ ] 10 live pages
  - [ ] 100 fan sign-ups
  - [ ] 3 artists with campaign state set
  - [ ] Average "would you keep using this?" score ≥7/10
  - [ ] No P0 bugs outstanding
  - [ ] 8 of 10 artists have link in bio
  - [ ] At least 3 things fixed that artists flagged

---

## Phase 2 — Soft launch

### P2.1 — "Here's what I built" post
**Done when:** The post is written, reviewed, and scheduled.

- [ ] Post written in James's voice — founder story, not product announcement
- [ ] No feature lists, no pricing, no exclamation marks
- [ ] Ends with a personal invitation to reach out, not a CTA button
- [ ] Includes a link to James's own ABLE page (the proof)
- [ ] Reviewed by one other person who knows James well (does it sound like him?)
- [ ] Posted on the platform where James has an actual music-adjacent audience
- [ ] Not cross-posted to every platform at once — start where the audience is real

---

### P2.2 — Press kit exists
**Done when:** A shareable document (PDF or webpage) covers the basics for any journalist or blogger who asks.

- [ ] 1–2 paragraph product description (in ABLE's voice, not a press release)
- [ ] 3 key facts (e.g. "0% cut on fan support income", "campaign-aware profile", "artist owns the fan relationship")
- [ ] James's name, role, and contact email
- [ ] 2–3 screenshots or the live URL to James's page
- [ ] 1 quote from a beta artist (with their permission)

**Note:** This does not need to be designed. A Google Doc is fine for Phase 2.

---

### P2.3 — Phase 2 success criteria check
**Done when:** All Phase 2 criteria are met (see SPEC.md).

- [ ] 50 live artist pages
- [ ] 500 real fan sign-ups
- [ ] 1 paid tier upgrade
- [ ] "Made with ABLE" footer generating ≥5 inbound artist registrations
- [ ] Average NPS ≥50
- [ ] No P0 bugs outstanding
- [ ] 10 artists logging into admin.html at least once per week

---

## What's left after Path-to-10 is complete

Items deliberately deferred — not forgotten:

| Item | Why deferred | When to pick up |
|---|---|---|
| Supabase auth | localStorage sufficient for Phase 1 | Before Phase 2 goes wide |
| fan.html | Not needed for artist beta | Phase 2 (when fans need a reason to return) |
| Email broadcasts | Artist Pro gate — needs paying artists first | After first paid upgrades |
| Freelancer profiles | Phase 2 entirely | After £2k MRR |
| Custom domains | Nice-to-have, not conversion-critical | Phase 3 |
| Stripe payments | Needed for support packs | Phase 2, after first paid artist tier |
| Referral link generation | Needed for affiliate loop | Before Phase 3 public launch |
| Music press outreach | Needs proof first | Phase 3 |
| Producer seeding programme | Highest-ROI channel | Phase 3 milestone 1 |
