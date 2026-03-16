# Complaint Resolution — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when a complaint becomes a case study — when a problem that arrived as frustration leaves as a feature, and the artist who sent it tells their community what happened.

---

## Moment 1: The Support Response That Gets Tweeted

**What it is:** An artist messages ABLE support: their Spotify import failed the night before their release. It is 19:30. They are three hours from their Instagram live. They message via Discord. The response arrives in 14 minutes. The problem is diagnosed, resolved manually, and the import data is in their admin within 40 minutes. The final message in the thread: "Your release page is ready. Sorry for the timing — I've filed the import bug and it won't happen to another artist tonight."

Three days later, unprompted, the artist posts on Twitter: "shoutout to @ablemusic — fixed my import issue same day, personally. Rare."

**Why it's 20/10:** The response time and the resolution are table stakes. The phrase "it won't happen to another artist tonight" is the line that earns the tweet. It tells the artist that their problem was not just handled — it was the reason a fix happened. They contributed to the product. That is a fundamentally different relationship than "thanks for your feedback."

**Exact implementation:**

The structural change that makes this response possible — the support response template for P1 import failures includes a mandatory fifth step:

```
Standard P1 import failure response (template in COMPLAINT-RESOLUTION.md):
1. Acknowledge the specific problem
2. State the most likely cause
3. Provide the fix (manual import where needed)
4. Confirm resolution
5. [NEW] State what happens next: "I've filed this as a bug — ref [Notion ticket ID].
   It's in the next sprint."
```

Step 5 is the line that changes the relationship. It requires the person handling support to actually file the bug ticket before sending the final response — not as a follow-up intention, but as a done action referenced in the message.

The Notion complaints log entry format that enables this (add one column to the existing table):

| Column | Type | Notes |
|---|---|---|
| Bug ticket reference | Text | Notion issue ID or GitHub issue # — required for any P0/P1 resolution |

When the fix ships, close the loop: reply to the original support thread (even days later): "The import fix is live as of [date]. That one's fixed because you flagged it."

This loop — complaint → fix → notification to the person who reported it — is the behaviour that produces the tweet. It is not a "support strategy." It is treating the artist's frustration as the starting point of a product improvement, and telling them when the improvement landed.

---

## Moment 2: The GDPR Deletion That Doesn't Feel Legal

**What it is:** An artist requests account deletion. The process takes 47 seconds of their time: one email confirming their identity, one reply saying "scheduled for [date], reply anytime to cancel." Seven days later, the deletion happens. The confirmation email arrives. It reads: "Your ABLE account and all your data has been deleted. Thank you for having been here. I hope whatever comes next goes well."

They expected a legal notice. They got something that sounded like a person.

**Why it's 20/10:** GDPR compliance is mandatory. The emotional register of the process is a choice. Most platforms send auto-generated legal boilerplate that makes the user feel like they are dealing with a corporation. ABLE's deletion flow says the same legally required things in copy that sounds like a human wrote it to another human. That distinction — the difference between "Data deletion request processed" and "Thank you for having been here" — is the difference between a forgettable interaction and one the artist might mention.

**Exact implementation:**

The deletion confirmation email (exact copy — do not template-ise this into corporate language):

```
Subject: Your ABLE account has been deleted

Hi [Name],

Done. Your profile, fan list, click and view history, and account credentials are gone.

If you want to know exactly what was deleted: your artist profile, all your fan sign-ups, every CTA click and page view we stored, your snap cards, and your login. Gone.

What wasn't deleted: anonymised aggregate statistics with no link back to you — standard GDPR retained data for system reporting. Nothing that identifies you.

If you ever want to come back, you'd start fresh — a new account, a clean slate. Everything from before is gone, which is the point.

Thank you for having been here. I hope whatever comes next goes well.

[Name, ABLE]
```

The legal requirements met in this email:
- Confirmation that deletion occurred: "Done."
- Scope of deletion: enumerated specifically
- Retained data explained with GDPR basis: "anonymised aggregate statistics... standard GDPR retained data"
- Process reference: implied by the detail

The 47-second user experience spec:
- Identity confirmation: reply from registered email — one action
- Deletion acknowledgement: template 7, which arrives within 24 hours of the request
- Cooling period communication: included in the same email — "scheduled for [date], reply to cancel"
- No further interaction required from the artist unless they change their mind

The three things this flow never does:
1. Never uses the phrase "Your request has been received and is being processed"
2. Never sends a separate "identity verification code" that requires an extra step
3. Never sends a final email with a legal disclaimer longer than the farewell sentence

---

## Moment 3: The Complaint That Ships in Two Weeks

**What it is:** An artist reports: "When I switch to gig mode and then switch back, the countdown bar jumps instead of animating — looks broken." It is a P2 bug. Medium priority. It goes into the Notion complaints log with a bug ticket. Twelve days later, the artist gets a reply: "This one's fixed — pushed this afternoon. The bar animates now. Thanks for spotting it."

They did not expect to hear back about a cosmetic bug report. They definitely did not expect "it's fixed" two weeks after they filed it.

**Why it's 20/10:** The expectation gap. A P2 cosmetic bug in most products either gets deprioritised indefinitely or generates a "we've noted your feedback" auto-response. An artist who reported it and received a personal "it's fixed, thanks for spotting it" three weeks later has experienced the full complaints-to-product pipeline. They did not just get their bug fixed. They learned that ABLE listens, prioritises, and closes the loop.

**Exact implementation:**

The complaints-to-product pipeline (closing the loop is the missing piece in most support systems):

Step 1: Bug is reported via any channel. Support handler files it in Notion complaints log with:
- Issue type: "UI bug"
- Severity: P2
- Root cause: "Countdown bar mount animation missing — not transitioned from computed state"
- Product change triggered: Yes — "Add 300ms CSS transition to `.gig-bar-fill` on mount after 50ms delay"

Step 2: Bug is added to the next sprint's fixes list. Not the backlog — the next sprint.

Step 3: Fix is implemented. Parse check passes. Playwright verifies the animation at 375px and 430px. Commit includes the Notion ticket reference in the commit message: `fix(admin): gig bar mount animation — closes notion/[id]`.

Step 4 (the differentiator): On the day the fix ships, go back to the original support thread and reply: "This one's fixed — pushed this afternoon. The bar animates now. Thanks for spotting it."

This step requires knowing which support thread to go back to. That's why the Notion complaints log includes "Artist (anonymised)" and "Channel." The log makes the close-the-loop step possible.

The copy register for the close-the-loop message:
- Maximum 2 sentences
- First sentence: states the specific fix ("This one's fixed")
- Second sentence: thanks them, specifically ("Thanks for spotting it")
- Never: "We appreciate your patience" or "Thank you for helping us improve"
- Always: sounds like a developer who cares, not a support bot that closed a ticket

The monthly pattern review (first day of each month, 20 minutes):
The most common complaint type determines the next sprint's first item. This is the mechanic that converts individual complaints into systemic improvements. If "mobile layout" appears three months in a row, that is not a support problem — it is a product problem that support is absorbing.

---

## The 20/10 test

You know the complaint resolution system has crossed from excellent to extraordinary when artists report bugs to ABLE not out of frustration but because they expect the fix to ship — and they want to be the one who found it.
