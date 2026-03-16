# ABLE — Complaint Resolution System
**Version: 1.0 | Written: 2026-03-16 | Status: Authoritative**

> This document defines how ABLE handles every complaint, support request, and piece of negative feedback. It is not a support playbook. It is an operational philosophy with teeth.

---

## Part 1: The Philosophy

Every complaint is a product insight. There are no annoying users — there are signals about what the product gets wrong.

This is not a customer service attitude. It is an engineering attitude applied to relationships. When an artist says "my import didn't work," the correct response is not "sorry about that" — it is: resolve their specific problem, understand why it happened, fix the root cause, and thank them for surfacing it.

### The hierarchy — in this order, always

1. **Resolve the specific issue the person has.** Right now, for them.
2. **Understand the root cause.** Not the symptom — the cause.
3. **Fix the root cause in the product.** If this broke for one person, it will break for others.
4. **Thank the person genuinely.** Not performatively. Specifically.

### What ABLE never does

- Never makes an artist feel stupid for being confused. If they're confused, the product is unclear.
- Never blames the user. "You should have read the docs" is a failure, not an answer.
- Never sends a canned response that doesn't acknowledge the specific issue.
- Never goes silent on an open complaint. Even a "we're looking into this" is better than nothing.
- Never argues about whether something is actually a bug. If they think it's broken, they're correct about their experience.

### The trust dimension

Artists are a tight-knit community. One mishandled complaint does not stay private — it goes to the Discord, the group chat, the comment section. The inverse is also true: one perfectly handled complaint creates a vocal advocate. Handle complaints like the whole community is watching, because they often are.

---

## Part 2: Complaint Channels and SLAs

### Channels

| Channel | Address | Target first response | Target resolution |
|---|---|---|---|
| Email | support@ablemusic.co | 24 hours | 48 hours |
| Discord | #help channel | 4 hours (working hours) | 24 hours |
| In-app | "Report an issue" in admin.html | 24 hours | 48 hours |
| Instagram DM | @ablemusic | 8 hours | 48 hours |
| TikTok DM | @ablemusic | 8 hours | 48 hours |
| X (Twitter) DM | @ablemusic | 8 hours | 48 hours |

Social media DMs get the shortest first-response target because they are public. An unanswered DM is visible to everyone who visits the profile. An answered one is also visible — and shows everyone that ABLE takes care of its artists.

### Priority tiers

**P0 — Respond within 2 hours**
- Artist's page is completely down or returning errors
- Fan data lost or inaccessible
- Billing error (charged incorrectly, wrong amount)
- Account locked or inaccessible

P0 means stop what you're doing. These issues directly damage an artist's relationship with their fans.

**P1 — Respond within 8 hours**
- A core feature is broken (pre-save not working, fan sign-up not capturing, links not working)
- Spotify import failed completely
- Email broadcast not sent
- Release date countdown showing incorrect time

P1 means the product is not working as promised. The artist is relying on ABLE for something and ABLE is failing them.

**P2 — Respond within 24 hours**
- Design or display question
- "How do I do X" request
- Feature is working but confusing
- Feature request

P2 is the volume tier. Most support is here.

**P3 — Respond within 72 hours**
- General feedback ("I'd love it if...")
- Nice-to-have suggestions
- Non-urgent product opinions

P3 items should still get real responses — not dismissals. They're the early signal for what becomes a P0 if you ignore it for long enough.

---

## Part 3: Response Templates

These are full templates for the 10 most common complaint types. Each is written in ABLE's voice: human, direct, warm without being corporate. No exclamation marks. No "Happy to help!" No "Great question!"

Read the COPY_AND_DESIGN_PHILOSOPHY.md before adapting these. The voice matters.

---

### Template 1: "My Spotify import didn't work"

**Subject:** Spotify import — let's sort this

---

Hi [Name],

Sorry the import didn't go through — I can see why that's frustrating, especially if you were trying to get your page set up quickly.

The most common reason this happens is a mismatch between the Spotify artist URL format and what we're expecting. The import needs a standard Spotify artist URL (it looks like `https://open.spotify.com/artist/[ID]`), not a track or album URL.

Here's what to check:
1. Open your Spotify for Artists profile
2. Click the three dots → Share → Copy Artist Link
3. Paste that link into the import field in admin.html

If that still doesn't work, paste the URL you tried into a reply to this email and I'll run it manually for you.

I'll aim to have this sorted within [2 hours / by end of day — depending on P-tier].

[Name, ABLE]

---

**Follow-up commitment:** If manual import needed, confirm it's completed and what was imported.

---

### Template 2: "I can't log in / lost access"

**Subject:** Getting you back in

---

Hi [Name],

Let's get you back in. Account access issues are the most disruptive kind and I want to move fast on this.

A few questions to confirm your identity before I make any changes:

1. What email address is your account registered under?
2. Can you tell me approximately when you created the account? (Even a rough date like "a few weeks ago" is fine)
3. Do you remember the last time you successfully logged in?

Once I've confirmed who I'm talking to I can either reset your access directly or escalate to reset the authentication link immediately.

If this is urgent and your page is being shared right now — your existing ABLE profile is still live and visible to fans. It's just your dashboard access that's affected.

Reply to this and I'll move.

[Name, ABLE]

---

**Follow-up commitment:** Respond within 2 hours of receiving their answers. P0 if they cannot access their account at all.

---

### Template 3: "A fan signed up but I can't see them"

**Subject:** Missing fan sign-up — on it

---

Hi [Name],

That's the last thing you want to see — someone signed up and the data isn't appearing. Let's find out what happened.

Can you tell me:
1. When did they sign up? (Approximate time is fine — "yesterday evening" works)
2. Are you looking in the Fans tab in your admin dashboard?
3. Is this one missing fan, or has nothing been recording recently?

It's possible this is a display lag (the dashboard sometimes takes a few minutes to update), a data sync issue, or something specific to how that fan signed up.

I'll look at your account data on our end in parallel and reply with what I find.

Their sign-up is almost certainly in our system — let's locate it together.

[Name, ABLE]

---

**Follow-up commitment:** Check backend for the sign-up record regardless. If it exists, restore visibility. If it doesn't exist, investigate the sign-up flow for that artist.

---

### Template 4: "My page looks broken on mobile"

**Subject:** Mobile issue — I want to see what you're seeing

---

Hi [Name],

That's important — your ABLE page is meant to work perfectly on mobile, so if it's not, I want to know exactly what's happening.

Can you send me:
1. A screenshot of what you're seeing
2. Which phone and browser you're using (iPhone Safari, Android Chrome, etc.)
3. The URL of your ABLE page

In the meantime, I'll open your page on our test devices to see if I can reproduce what you're describing.

If there's a layout issue specific to your setup, I want to understand it — not just for you, but because if it's happening on your phone it's probably happening on other artists' fans' phones too.

Send the screenshot when you can and I'll come back to you with what I find.

[Name, ABLE]

---

**Follow-up commitment:** Open the artist's live page on multiple test devices. File a P1 bug if reproduced. Reply with findings and ETA for fix.

---

### Template 5: "I was charged but can't access Pro features"

**Subject:** Pro access — let me check this now

---

Hi [Name],

That's not right, and I'm sorry it's happened. Being charged and not getting what you paid for is exactly the kind of thing we need to fix immediately.

I'm checking your account now. Can you confirm the email address on your account so I'm looking at the right one?

Most likely explanation: there's a sync delay between the payment confirmation and the account upgrade — this sometimes takes up to an hour on the first charge. But if it's been longer than that, something's gone wrong and I'll sort it manually.

I'll reply within [1 hour] with what I find. If the payment went through and the access isn't there, I'll grant it manually right now and investigate the sync issue separately.

You should have access to everything you paid for, and you will.

[Name, ABLE]

---

**Follow-up commitment:** Check Stripe for the charge, check Supabase for their tier record, reconcile manually if needed. Reply with what happened and confirmation of access.

---

### Template 6: "How do I cancel my subscription"

**Subject:** Cancelling your subscription

---

Hi [Name],

Of course — you can cancel directly from your admin dashboard:

1. Go to admin.html → Settings
2. Scroll to Billing
3. Click "Cancel subscription" — it will stay active until the end of your current billing period

No penalty, no awkward phone calls.

If there was something specific that wasn't working for you — whether that's a feature, something confusing, or just not the right time — I'm happy to hear it. Not to talk you out of it, but because it helps us understand what's not landing.

If you ever want to come back, everything will be waiting for you.

[Name, ABLE]

---

**Note on retention:** This template does not hold the artist hostage, does not offer a discount unprompted (that signals desperation), and does not interrogate them. It makes cancelling easy, leaves the door open, and creates a genuine invitation to share feedback. That's the right approach.

If they tell you why they're cancelling: listen, respond thoughtfully, address the specific issue. A discount offer is appropriate only if they're cancelling specifically due to price.

---

### Template 7: "I want to delete my account and all my data"

**Subject:** Account deletion — here's what happens

---

Hi [Name],

Understood. You have the right to have your data deleted, and I'll make sure this is handled properly.

Here's what the process looks like:

**What will be deleted:**
- Your artist profile (name, bio, links, all settings)
- Your fan sign-up list (every email address captured via your ABLE page)
- Your click and view history
- Any email broadcasts you've sent via ABLE
- Your account credentials

**What cannot be deleted:**
- Anonymised aggregate statistics (e.g. "total page views in March" in our system-wide data). These have no personal identifier attached to them — your name, email, or any link back to you is removed. This is standard practice under GDPR and we are required to keep aggregate system data for legitimate business reporting.

**Before I proceed:**

I need to confirm your identity. Please reply to this email from the address registered on your ABLE account: [registered email address]. This is to make sure I'm acting on your instructions, not someone else's.

Once confirmed, you have 7 days to change your mind before I execute the deletion. You're not locked in — if you reply and say "go ahead now," I'll do it immediately. The 7 days is a buffer that's there for you, not for ABLE.

After deletion you'll receive a final confirmation email. Your data will be gone within 24 hours of execution.

[Name, ABLE]

---

**Follow-up:** See Part 4 of this document for the full GDPR deletion process.

---

### Template 8: "My email broadcast didn't send"

**Subject:** Broadcast issue — let's find out what happened

---

Hi [Name],

That's a problem — if you sent a broadcast to your fans, it needs to reach them. Let me find out what happened.

Can you tell me:
1. When did you send it? (Date and approximate time)
2. The subject line, so I can find it in the system
3. How many fans were in your list at the time?

I'll check the send logs on our end. Broadcasts can fail silently for a few reasons: list size vs. tier limit, a formatting issue in the email content, or a rare system error. I'll tell you which one it is.

If it failed and didn't send, I'll fix the cause and help you resend. If it sent but fans aren't seeing it, that's a different issue (check junk folders — I'll tell you if there's a deliverability problem on our side).

Reply and I'll move fast on this.

[Name, ABLE]

---

**Follow-up commitment:** Check the Resend/Loops send log for their broadcast. Report the exact status. If it failed, fix the cause, resend, and document the root cause in the complaints log.

---

### Template 9: "I think there's a bug in [feature]"

**Subject:** Bug in [feature] — thanks for flagging

---

Hi [Name],

Good catch — let me look into this.

Can you give me a bit more detail so I can reproduce what you're seeing?

1. What exactly happened? (What did you click, what did you expect, what happened instead)
2. What device and browser are you using?
3. Did it happen once or repeatedly?

Screenshots or a screen recording are incredibly helpful if you can grab them — even a quick phone video is fine.

I'm going to try to reproduce this on my side now, and I'll come back to you with what I find. If it's confirmed, I'll let you know when it's fixed.

One thing: please don't feel like you need to have a "proof" before reporting something that feels wrong. If something looked or behaved unexpectedly, that's worth investigating regardless of whether it reproduces every time.

[Name, ABLE]

---

**Follow-up commitment:** File the bug, reproduce it, prioritise based on impact, reply with confirmed status and ETA. Update them when fixed — they reported it, they deserve to know it's resolved.

---

### Template 10: "I gave someone else access to my account and they changed everything"

**Subject:** Account changes — let's recover what you had

---

Hi [Name],

This is fixable. Let me understand what happened and we'll work through it together.

First, the most important thing: I'm revoking any active sessions on your account right now so the other person can no longer make changes. Before I do this I just need to confirm you're the account owner — please reply from your registered email address.

Once confirmed, I'll:
1. Lock the account to you only
2. Tell you what was changed and when (I can see the edit history)
3. Restore any settings that were overwritten if you tell me what they should be

Going forward: ABLE doesn't currently have multi-user access with different permission levels — that's on our roadmap. For now, the only way to give someone access is to share your full login, which does mean full access.

I'll move fast on the lock. Reply from your registered email and we'll go from there.

[Name, ABLE]

---

**Follow-up commitment:** Lock the account within 1 hour of identity confirmation. Provide an edit history if technically possible. Restore settings. Add this case to the product backlog as evidence for multi-user roles (producer/manager permissions).

---

## Part 4: The GDPR Deletion Process

This process must be followed exactly. GDPR compliance is not optional and artist trust depends on it being handled with care.

### Step-by-step

**Step 1 — Acknowledge (within 24 hours)**
Send Template 7 (above). Confirm you've received the request and explain the process.

**Step 2 — Identity confirmation**
Ask the artist to reply from their registered email address. Do not proceed until this is confirmed. Record the confirmation date and method.

**Step 3 — Explain scope**
Confirm in writing (Template 7 covers this):
- What WILL be deleted: profile, fan list, clicks, views, broadcasts, auth record
- What CANNOT be deleted: anonymised aggregate statistics with no personal identifier

**Step 4 — 7-day cooling period**
Under GDPR you have up to 30 days to action the request from confirmation. ABLE uses a 7-day period as a balance of legal compliance and genuine care. Inform the artist:

> "Your deletion is scheduled for [date, 7 days from today]. If you change your mind before then, just reply to this email and I'll cancel it. After that date, the deletion is irreversible."

If the artist replies "do it now" — do it now. The 7 days is a protection for them, not a delay for ABLE.

**Step 5 — Execute deletion**

Run the following Supabase SQL via the dashboard SQL editor, substituting `{user_id}` with the artist's Supabase auth user ID:

```sql
-- ABLE GDPR deletion — run in order
-- Record: user_id, execution date, operator

BEGIN;

-- Remove all artist-related data
DELETE FROM fans       WHERE artist_id = '{user_id}';
DELETE FROM clicks     WHERE artist_id = '{user_id}';
DELETE FROM views      WHERE artist_id = '{user_id}';
DELETE FROM shows      WHERE artist_id = '{user_id}';
DELETE FROM broadcasts WHERE artist_id = '{user_id}';
DELETE FROM snap_cards WHERE artist_id = '{user_id}';
DELETE FROM releases   WHERE artist_id = '{user_id}';
DELETE FROM credits    WHERE artist_id = '{user_id}';
DELETE FROM profiles   WHERE id = '{user_id}';

COMMIT;
```

Then delete the auth user via the Supabase admin dashboard:
- Go to Authentication → Users
- Find the user by email
- Click the menu → Delete user

Or via the Supabase admin SDK:
```javascript
const { error } = await supabase.auth.admin.deleteUser(user_id)
```

**Important:** Do not delete rows from aggregate/analytics tables that contain no PII. Only delete rows where the user's ID or personal data appears.

**Step 6 — Remove from mailing lists**
- Log into Resend (or Loops, depending on email provider at time of deletion)
- Search for their email address
- Remove from all lists and mark as suppressed (so they don't get re-added by any automated flows)

**Step 7 — Send final confirmation email**

> Hi [Name],
>
> Your ABLE account and all associated data has been deleted.
>
> Deleted: your profile, fan list, click and view history, email broadcasts, and account credentials.
>
> This is permanent and cannot be reversed. If you decide to use ABLE again in the future, you'd start fresh with a new account.
>
> Thank you for having been here. I hope whatever comes next goes well.
>
> [Name, ABLE]

**Step 8 — Log the deletion**
In the complaints log (Notion), record:
- Artist identifier (use a code, not their name, for the record)
- Request date
- Confirmation date
- Execution date
- Operator who ran the deletion
- Any exceptions (e.g. aggregate data retained)

---

## Part 5: Complaints to Product Pipeline

Every complaint is a data point. If you handle it, resolve it, and forget it — you've done one third of the job.

### The complaints log

Maintain a Notion table with the following columns:

| Column | Type | Notes |
|---|---|---|
| Date | Date | When the complaint arrived |
| Channel | Select | Email / Discord / Instagram / TikTok / X / In-app |
| Issue type | Select | Import / Billing / UI bug / Mobile / Data / Access / Feature request / Confusion / Other |
| Severity | Select | P0 / P1 / P2 / P3 |
| Status | Select | Open / Resolved / Escalated |
| Resolution | Text | What was done |
| Root cause | Text | Why it happened (the real reason) |
| Product change triggered | Checkbox + Text | Did this lead to a fix or feature? What? |
| Artist (anonymised) | Text | Optional — use "Artist A", "Artist B" to track repeat contacts |

### Monthly pattern review

First day of each month, spend 20 minutes on the complaints log:

1. Which issue type appears most often? That is your next sprint's first priority.
2. How many P0/P1 incidents did you have? Trending up or down?
3. Which complaints triggered product changes? Are those changes shipped?
4. Are there any artists who contacted support more than once? What is their underlying frustration?

The output is one note: "This month's complaint pattern says [issue type] is the thing to fix. Adding to the next sprint."

### What good looks like

Six months in, the most common complaint type should be changing — because you keep fixing the root causes. If the same issue appears in the top spot for three consecutive months, that's a systemic problem that no amount of support templates will solve.

---

## Part 6: Proactive Prevention

The best complaint resolution is making the complaint unnecessary.

### Error messages in the product

Every error state in the product should:
- Say what went wrong in plain English ("This Spotify URL doesn't look right")
- Say what to do next ("Try copying the link directly from Spotify for Artists")
- Never say "Something went wrong" or "Error 500" without a human-readable explanation

See `docs/systems/error-states/SPEC.md` for the full error states system.

### Loading states

Every async operation must have a visible loading state. No action should complete silently:
- Importing Spotify data: show a progress state
- Sending a broadcast: show "Sending..." and then "Sent to X fans"
- Saving a profile change: show "Saved" confirmation

Silent failures are the worst kind. If someone clicks "Send" and nothing happens, they don't know if they should click again or wait.

### Onboarding explains what happens

The start.html wizard should explain consequences before they happen:
- "When you set a release date, your page will automatically switch to pre-release mode"
- "Your fan sign-ups are saved here — you can export them any time"

No surprises. Artists who understand the system generate fewer "why did this happen?" complaints.

### The persistent help link

admin.html must always have a visible path to support. Not hidden in settings — visible. "Get help" in the navigation or a persistent small link in the footer. Artists should never have to wonder how to reach ABLE.

### Status page (Phase 2)

When ABLE has enough users that platform incidents affect a material number of artists at once, set up a status page at ablemusic.co/status. This alone eliminates the "is it just me?" category of support requests. Use a self-hosted Upptime instance (free, GitHub-based) or a paid service like Statuspage.

---

*This document should be reviewed every 6 months and updated with new complaint types, refined templates, and improved processes. The goal is for this document to get shorter over time — because fewer issues need templates when the product is genuinely excellent.*
