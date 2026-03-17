# Feature: Launch Squad
**Status: 📋 Specced, not built | Phase 2**

---

## What it is

An artist creates a "launch squad" from their fan list — their most dedicated fans, manually selected or auto-suggested from most-engaged. On release day, squad members receive a coordinated pack and one-tap action options to amplify the release simultaneously.

This is ABLE's answer to the activation problem: how does an independent artist create a coordinated launch moment without a team, a label, or a budget?

---

## How it works

**Pre-release (artist side):**
- Artist selects fans from their list as squad members (manually or auto-suggested based on engagement)
- ABLE generates: early listen link, shareable card pack, suggested captions per platform, countdown reminder

**On release day (squad side):**
- Squad members receive a notification: "You're in [Artist]'s launch squad for [Release Name]. Here's what to do on [date]."
- One-tap action options: stream it, share the card, repost the reel, leave a comment
- Actions are sequenced — not all at once, coordinated timing

**Post-release (artist side):**
- Artist sees squad activity: who shared, when, what drove clicks back to the profile

---

## Why it matters

The hardest problem for independent artists is not making music — it is creating the appearance of momentum on release day. Algorithmic platforms reward early velocity. An artist with 20 coordinated fans sharing simultaneously performs better than one with 200 passive followers. Launch Squad turns the fan list into a release team.

---

## Relationship to other features

- Requires `able_fans` with engagement data (source, return visits, click history)
- Builds on the pre-release campaign state — squad activation happens during `pre-release` and `live` states
- Connects to email broadcasts — the squad notification is a targeted broadcast to a subset of the fan list
- Connects to Close Circle — Close Circle members are natural candidates for the launch squad

---

## Storage (when built)

```javascript
able_launch_squad: [{ email, addedTs, releaseId, actionsCompleted: [] }]
able_launch_packs: [{ releaseId, cardUrl, caption, streamUrl, activationDate }]
```

---

## Phase classification

**Phase 2** — requires:
1. Fan list with engagement data to auto-suggest members
2. Email broadcast infrastructure (Resend bulk)
3. Shareable card generation (Canvas API or pre-generated)
4. Real-time activity tracking

Cannot be built until the core fan capture and email loop is solid. The squad is only as strong as the list it is drawn from.

---

## Spec reference

`docs/reference/research/DISCOVERY_AND_GROWTH.md` — Launch Squad concept
`docs/V8_BUILD_AUTHORITY.md` — AI agent horizon mentions superfan mobilisation
