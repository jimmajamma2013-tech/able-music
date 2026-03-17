# Pathway — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is a Wednesday morning in October 2027 in Porto where the resignation letter has been sitting in drafts for four months, the checklist is entirely green, and handing in notice feels less like a decision than a formality.

---

## Moment 1: The Tuesday the Trigger Turns Green

**What it is:** The exit trigger turns green not as a realisation but as an event. n8n monitors the five trigger conditions from PATHWAY.md Part 11 as automated checks. On the Tuesday that all five are simultaneously true for the first time, James receives a Telegram message at 08:00:

"All five conditions are green. MRR: £5,247 (Month 3 confirmed). Churn: 3.2%. Emergency fund: £18,400. Operating buffer: £4,800. Tier diversity: Artist + Artist Pro both active. This is the window."

The message contains no instruction. It contains no link. It is a statement of fact. James already knows what to do — the PATHWAY.md has told him, in specific detail, exactly what happens next. The automation just confirms that now is when it happens.

**Why it's 20/10:** The moment the trigger turns green must be a real event, not a spreadsheet calculation done on a Sunday afternoon. An event that arrives in Telegram at 08:00 on a Tuesday with specific numbers is the equivalent of a phone ringing with the news you've been waiting for. The form of delivery matters. The 20/10 version treats the trigger as a threshold crossed, not a box checked.

**Exact implementation:**

n8n scheduled flow — runs daily at 07:30, delivers at 08:00 if all conditions are met:

```javascript
// n8n Code node — trigger condition check
const stripe      = $input.item.json.stripe    // MRR and churn from Stripe API
const savings     = $input.item.json.savings   // Balance from Starling API
const operating   = $input.item.json.operating // Balance from Starling business account
const tiers       = $input.item.json.tiers     // Active subscription tiers from Stripe

const conditions = {
  mrr:       stripe.mrr >= 5000,
  churn:     stripe.monthlyChurn < 0.05,
  emergency: savings.balance >= 18000,
  buffer:    operating.balance >= (stripe.monthlyCosts * 3),
  diversity: tiers.filter(t => t.revenue > 0).length >= 2,
}

const allGreen = Object.values(conditions).every(Boolean)

// Track how many consecutive months
const prevMonths = parseInt($getWorkflowStaticData('consecutive_green_months') || '0')
const months = allGreen ? prevMonths + 1 : 0
$setWorkflowStaticData('consecutive_green_months', months)

if (months >= 3) {
  return [{
    trigger:  true,
    mrr:      stripe.mrr,
    churn:    (stripe.monthlyChurn * 100).toFixed(1),
    emergency: savings.balance,
    operating: operating.balance,
    tiers:    tiers.filter(t => t.revenue > 0).map(t => t.name).join(' + '),
    months,
  }]
}
return [{ trigger: false }]
```

Telegram message template:
```
All five conditions are green.

MRR: £{mrr} (Month {months} confirmed)
Churn: {churn}%
Emergency fund: £{emergency}
Operating buffer: £{operating}
Tier diversity: {tiers}

This is the window.
```

---

## Moment 2: The Resignation Letter That Has Been Waiting

**What it is:** The resignation letter is written at least 4 months before it is sent — not as a plan but as a document. It sits in a folder called `/pathway/resignation-letter.md` in the ABLE docs. James reads it once a month as part of the pre-shift checklist review. Each time he reads it, he edits one phrase that has drifted — a sentence that no longer sounds like him, a reference that is now outdated. By the time the trigger fires, the letter has been read and refined twelve times. It is already his voice, exactly. He does not write it on the day. He sends it.

The letter is not stored in the project repo (that is public-facing). It is in a private Bear note or Obsidian vault, linked from the checklist. The act of reading it monthly is the rehearsal. The day he sends it, he is not performing a resignation — he is completing a task he has been preparing for since the letter was first written.

**Why it's 20/10:** EXIT-SCRIPT.md specifies the resignation conversation in detail — what to say, what not to say, how to handle the counter-offer. The letter that precedes the conversation is the proof that the decision was made long ago, not today. An employer who receives a letter that reads with certainty and warmth, that has clearly been thought through, is less likely to push back than one who receives a letter that feels reactive. The letter's age is in its confidence. The 20/10 version earns that confidence by being four months old.

**Exact implementation:**

Add to `PRE-SHIFT-CHECKLIST.md` as a monthly recurring item:

```
[ ] Read the resignation letter (~/pathway/resignation-letter.md)
    — Is the opening sentence still exactly right?
    — Is the description of ABLE still accurate?
    — Does it still sound like you?
    — Edit one sentence if anything has drifted.
    — Note the date you read it: [date]
```

The letter template structure (not the content — that is James's to write):

```markdown
# Resignation Letter — [Name of manager]
Last edited: [date]
Written: [original date]

[Opening line — context before conclusion]

[What ABLE is — one sentence, honest, no numbers]

[Notice period offer — specific, professional]

[Handover intention — concrete, not vague]

[Closing — warm, specific to the relationship]
```

The letter is complete when every sentence has been read and confirmed at least three times. The four-month minimum is the structural guarantee of that confirmation.

---

## Moment 3: The First Friday Afternoon

**What it is:** The last day of the notice period ends at 17:30. From 17:31, James does not open his laptop. He opens something else — a notebook, a drink, a door. The evening is already planned: the five people who get the personal call before the public post know they are getting it. The LinkedIn post is drafted and scheduled for 18:00. The TikTok is filmed before the last day and queued. The email to the founding artists is written and ready.

The morning after — a Saturday — James does not work. He has the Playwright tests running automatically. He has n8n sending him the morning digest. He has uptime monitoring watching the site. The product is working. He does not need to check. He has a Saturday.

The 20/10 version of the exit is not the moment of notice — it is the Saturday. A Saturday with no obligation to the job, no access required to the employer's systems, no feeling of something unfinished. That Saturday is what all the preparation was for.

**Why it's 20/10:** Most founders who leave employment describe the first week as exhausting, anxious, and formless. The 20/10 version is structured. Not by tasks — by the absence of tasks that were previously unavoidable. The Saturday is a specific, plannable thing. If James has ever said "I just want a normal Saturday where I'm not thinking about the job," that Saturday is the measure of whether the exit was done right.

**Exact implementation:**

Add to the exit day checklist in PATHWAY.md §Part 8, items 9 and 10:

```
9. [Friday afternoon] The personal calls are made. The posts are queued. The emails are written.
   Not sending from the laptop: from the phone, standing up, facing out.

10. [Friday 17:30] Close the laptop.
    The product is being watched by n8n, UptimeRobot, and PostHog alerts.
    You are not one of those watchers tonight.
    The Saturday is yours. Use it accordingly.
```

The founding artist email is written in advance and set to send via Loops at 09:00 Saturday morning — so they receive it when James is not checking his phone but the message reaches them at a good time. The email is personal (each one addressed by name, with one specific detail from their last conversation), not a broadcast. It is queued individually via the n8n personalisation flow (prompt #8 in VA-STRATEGY.md).

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when the resignation conversation takes exactly 20 minutes, goes exactly as rehearsed, and the strongest emotion James feels walking out of the meeting is not relief or anxiety — it is the satisfaction of something completed that was prepared so thoroughly it was already done.
