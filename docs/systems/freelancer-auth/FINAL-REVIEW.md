# ABLE — Freelancer Auth + Features: Final Review Gate
**System:** Freelancer Auth + Features
**Date:** 2026-03-16

---

## Quality gate — 5 test questions

Before the freelancer system ships, all five questions must be answered "Yes."

---

### Question 1: Does the auth system fail gracefully when Discord is unavailable?

**Test:** Simulate Discord API being down (Playwright: intercept Discord OAuth endpoint, return 503). Attempt to connect Discord from a freelancer profile settings page.

**Pass criteria:**
- ABLE shows a clear error message: "Discord is having issues right now — try again later. Your ABLE profile is not affected."
- The freelancer's existing profile is completely unaffected
- No broken state in the UI (no spinner stuck indefinitely, no blank screen)
- Re-attempting after the error works correctly when Discord is available again
- Magic link auth continues to work perfectly regardless of Discord state

**Fail criteria:**
- Discord outage causes any part of the freelancer profile to break
- Error message references technical details (503, API error) instead of plain language
- No error message at all (silent failure)
- Any auth path that requires Discord to be available

---

### Question 2: Is the credit verification system resistant to false claims?

**Test:** Create a freelancer account (Freelancer A). Claim a credit on a release by Artist B, who is also on ABLE. Do not confirm as Artist B. Attempt to view the credit on Freelancer A's public profile 31 days later.

**Pass criteria:**
- Unconfirmed credit at day 1: shows as `pending` state (hollow dot, 70% opacity) on public profile
- Artist B receives notification and can confirm or deny
- If Artist B denies: credit is removed from Freelancer A's profile, Freelancer A is notified
- If Artist B ignores: credit auto-expires from `pending` to `unverified` at day 30
- Unverified credits beyond the 5-credit limit are hidden (not shown on public profile)
- Rate limit enforced: Freelancer A cannot add more than 10 credits per day

**Fail criteria:**
- Unconfirmed credit appears as `confirmed` on public profile
- No notification sent to Artist B
- No auto-expiry at 30 days
- No limit on unconfirmed credits on public profile
- No rate limiting on credit claims

---

### Question 3: Does the booking enquiry relay protect freelancer privacy?

**Test:** Submit a booking enquiry as a test fan/artist. Check: does the enquirer receive the freelancer's email address at any point before the freelancer replies?

**Pass criteria:**
- Enquirer submits form → confirmation: "Your enquiry has been sent to [Freelancer Name]"
- Freelancer receives email via ABLE relay with enquirer's email in the body (so they can reply)
- Enquirer does not receive any email from the freelancer's address before the freelancer manually replies
- Freelancer's email address is not present in the enquiry confirmation email sent to the enquirer
- Rate limit enforced: 3 enquiries per email per freelancer per 24h

**Fail criteria:**
- Freelancer's email address exposed to enquirer before they choose to reply
- No rate limiting on enquiry submissions
- Enquiry not delivered to freelancer (silent drop)
- Enquiry confirmation email to enquirer includes freelancer's direct email

---

### Question 4: Does the before/after audio comparison player work correctly on mobile?

**Test:** Create a before/after portfolio item with two audio URLs. View on a simulated iPhone 375px viewport. Test all interactions.

**Pass criteria:**
- Both audio players render side-by-side on tablets (≥600px wide)
- Audio players stack vertically on mobile (< 600px) — before on top, after below
- Tapping play on "before" starts it and if "after" is playing, pauses "after"
- Tapping play on "after" starts it and if "before" is playing, pauses "before"
- Pause/play toggle works correctly on each player independently
- Both players show the correct label ("Unprocessed stem" / "Final master")
- No horizontal overflow at 375px
- Tap targets for play buttons are minimum 44×44px

**Fail criteria:**
- Horizontal scroll at 375px
- Playing one player doesn't pause the other
- Play buttons below 44px tap target
- Either player fails to load audio (broken embed)

---

### Question 5: Is the "discovered via credits" link correctly implemented on artist profiles?

**Test:** Create an artist profile with a release. Add a credit: freelancer's name, where the freelancer has an ABLE profile (handle exists in Supabase). View the release card on the public artist profile.

**Pass criteria:**
- Credit renders as a live hyperlink: `<a href="/[freelancer_handle]">[Freelancer Name]</a>`
- Clicking the link navigates to the correct freelancer profile
- If the named freelancer is NOT on ABLE: credit renders as plain text (not a link)
- If the freelancer joins ABLE after being named: their credit on artist profiles auto-converts to links within 24 hours of account creation
- Freelancer receives a notification on first credit-link conversion: "Your credit on [Artist]'s '[Release]' is now a live link."
- Freelancer dashboard shows: profile views that originated from a credit tap (source attribution)

**Fail criteria:**
- Credit renders as plain text even when freelancer is on ABLE
- Dead link (404) when clicking a credit with a valid freelancer handle
- No notification to freelancer on credit conversion
- No source attribution in dashboard analytics

---

## Sign-off

| Version | Date | Q1 | Q2 | Q3 | Q4 | Q5 | Sign-off |
|---|---|---|---|---|---|---|---|
| Phase 13 launch | TBD | — | — | — | — | — | — |
