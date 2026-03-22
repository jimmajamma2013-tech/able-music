# ABLE Product Decision Spec
## Top Card, CTA, and Source-Aware Behaviour

**Version:** 1.0
**Date:** 2026-03-22
**Status:** Approved — primary build authority for top card and CTA logic

---

## 1. CORE PRINCIPLE

**The page is a conversion engine, not a profile.** Every fan arrives from somewhere specific, at a specific temperature, into an artist moment with a specific objective. The top card and CTA stack exist to match those three variables and produce the highest-probability next action.

### Governing rule

**State determines the CTA family. Source and temperature determine its position and framing.**

1. **State** sets the default CTA family — what type of action the page is built around.
2. **Source** determines top card media format, and can adjust CTA position (primary vs secondary) or suppress a family that is redundant or exceeds the ask ceiling.
3. **Temperature** (derived from source) controls how aggressive the lead ask can be. State cannot override an ask ceiling — it can only enforce the family.

When state and source conflict:
- Time-sensitive state (pre-release ≤72h, release day, gig) → state locks the CTA family. Source adjusts framing and media only.
- Steady-state profile → source controls media format and can reorder the CTA stack.

**Cold source exception during pre-release:** If source is TikTok or YouTube Shorts (cold, algorithm-served) and state is pre-release, the pre-save family remains active but may be secondary. A warm-up action (stream teaser, watch clip) can lead as primary. The pre-save must still be reachable without scroll. This is the only case where source overrides CTA position during a time-sensitive state.

### Ask ceilings by source

| Source | Maximum ask | Rationale |
|---|---|---|
| TikTok | Stream the song | Cold, algorithm-served, zero prior relationship |
| Instagram | Pre-save or email | Intentional tap, medium warmth |
| YouTube | Watch + subscribe | Content-seeking, accepts depth |
| Spotify | Fan capture (email) | Already listening, highest organic warmth |
| Email / SMS | Complete the specific campaign action | Retained fan, maximum trust |
| QR (real life) | Tickets or email sign-up | Physical intent, highest threshold |
| Direct link | Hear music, soft follow | Peer trust, no earned credibility |

### AI's role

AI is an advisor, not a director. It has three jobs:

1. **Recommend a complete preset** (top card + CTA stack) from three artist inputs: current moment, primary source, primary objective. Artist confirms — does not configure from scratch.
2. **Detect mismatches** between the artist's configuration and their stated objective. Flag, do not auto-fix.
3. **Suggest copy** (fan capture heading, CTA label, light nudge text) as a starting point the artist edits — never final copy.

AI does not: set strategy, auto-apply changes, personalise per individual fan, or generate the artist's voice. It narrows choices — never expands them. It presents one recommendation and one alternative. Never a menu.

---

## 2. DECISION SYSTEM

### Inputs

| Input | Source | Controls |
|---|---|---|
| Campaign state | Artist-configured | CTA family, section order, state chip |
| Top card media | Artist-set | Media shown in hero |
| Source | UTM / referral | Media format, CTA position, source pill |
| Release data | Artist-set | Countdown, auto-transition to live |
| Show data | Artist-set | Gig card, ticket link, auto-expiry |

### Decision priority order

```
1. Is a time-sensitive state active?
   (gig / pre-release ≤72h / release day)
   YES → state locks CTA family.
         Source adjusts media format and CTA framing only.
         EXCEPTION: cold short-form source (TikTok / YT Shorts) during pre-release
         → warm-up action may lead as primary; pre-save remains secondary and reachable.

2. Is the artist in steady-state profile mode?
   YES → source controls media format and CTA position.
         State provides default CTA family.
         Apply ask ceiling for the source. Do not exceed it.

3. Does the fan's source conflict with the primary CTA family?
   (e.g. Spotify source + "stream on Spotify" CTA)
   YES → suppress that CTA family for this source. Elevate next-best.
```

### Top card rules

**The top card contains:** One media item. One primary CTA. Optional secondary CTA. Optional light nudge. Optional source pill. Optional state indicator (countdown, "Out now", "Playing tonight").

**The top card never contains:** Navigation, competing equal-weight CTAs, social feeds, biography as primary, multiple media items.

**Allowed media formats by state:**

| State | Preferred format |
|---|---|
| Profile | Artist's defining media (video embed or artwork + audio) |
| Pre-release | Teaser clip or countdown over artwork |
| Live | The release — playable immediately |
| Gig | Show information card (venue / time / tickets) |
| Merch push | Product photography or artist-with-product |
| Support push | Personal message — artist-facing, intimate |

**Source → media format preference (profile mode only):**

| Source | Preferred format |
|---|---|
| TikTok / Instagram / YouTube | Video embed — continue the video experience |
| Spotify | Artwork + audio player — audio-forward |
| Email / QR | Whatever the campaign specifies |
| Direct link | Artist's strongest single piece of media |

### Light nudge

A light nudge is a single line of contextual text that sits between the top card media and the primary CTA button. It provides the minimum context needed to motivate the action when that context is not already self-evident.

**What it is:** 5–8 words maximum. One line. Not a headline. Not a subheading. A whisper that lowers friction without adding clutter.

**Examples by state:**

| State / context | Example nudge |
|---|---|
| Pre-release | *"Before it drops."* |
| Pre-release, cold source | *"The song from the video — save it."* |
| Release day | *"First week matters. Stream it now."* |
| Gig | *"Doors in three hours."* |
| Fan capture | *"No algorithm. Just you and me."* |

**When it appears:**
- CTA requires context the media does not provide (pre-save for cold traffic unfamiliar with what pre-save means)
- Time-sensitivity adds genuine urgency (gig mode, release day)
- Artist's campaign objective is non-obvious from the media alone

**When it does not appear:**
- CTA label is already self-explanatory ("Stream it now" on release day)
- State chip or countdown already carries the context ("Dropping Friday" + pre-save CTA — nudge is redundant)
- Fan arrives from email (they already have context from the message)
- Gig state when speed matters — remove friction, not add text

**Rules:**
- Never restates the CTA label
- Never uses urgency-faking phrases ("Don't miss", "Last chance", "Act now")
- Set by artist as optional text; AI can suggest, artist approves
- Blank = hidden — it is optional, not structural

### CTA families

**Five active families. Two hero slots.**

| Family | Primary when | Never primary when | Best sources |
|---|---|---|---|
| Listen / Stream | Live, profile | Pre-release, Spotify source (redundant), gig | YouTube, Instagram, TikTok, direct |
| Pre-save | Pre-release (may be secondary for cold sources) | Any other state | Any — cold sources need teaser or nudge first |
| Tickets | Gig state always | No show exists | QR, event context, email |
| Fan capture (Stay close) | Profile, post-gig, Spotify source | Release day, gig | Spotify, QR, email, direct |
| Watch | Video push, video-source arrivals | Audio-only contexts, gig | YouTube, TikTok, Instagram |

### Engagement CTAs — defined separately

Engagement CTAs ask the fan to do something on behalf of the artist — amplify, extend, create. They require effort with no direct fan benefit. They are the highest-friction ask in the system and should only surface after consumption has occurred on the visit.

*What counts as engagement:* Share, add to playlist, use this sound (TikTok), repost, react, comment.

*What does not count as engagement:* Watch and stream (consumption), fan capture (retention), follow (treated as weak retention, not engagement).

| Engagement CTA | When primary | When secondary | MVP |
|---|---|---|---|
| Add to playlist | Post-release push, warm Spotify source | After stream CTA on release day | Yes |
| Share | Almost never | After stream on release day, post-gig | Yes — native share only |
| Use this sound | TikTok-specific post-release only | Never secondary in other contexts | No — Phase 2 |
| Repost / React | Never | Never | No |

**Engagement vs adjacent families — practical distinction:**

- **Watch / Listen** = consumption. Fan gets something. Zero friction. Always appropriate as a first ask.
- **Fan capture** = retention. Fan trades an email for ongoing access. Low friction, high long-term value.
- **Engagement** = amplification. Fan does work for the artist. Only appropriate after warmth is established — meaning the fan has consumed something on this visit or is a known returning fan.

Never surface an engagement CTA before a consumption or retention CTA has been presented. Engagement is a downstream ask, not a lead.

**CTA function types — know the difference:**

- **Conversion** — meaningful trackable commitment: pre-save, stream, watch, fan capture
- **Retention** — direct channel ownership: fan capture (email) — the most valuable long-term action in the system
- **Commerce** — money changes hands: tickets, merch, support
- **Engagement** — fan amplifies on behalf of the artist — downstream only, never cold

Fan capture is the most undervalued CTA in the system. A Spotify fan who signs up for email is worth more than ten TikTok page views. Optimise for it aggressively in warm-source, steady-state contexts.

**Later families (not hero CTAs in MVP):** Merch / Shop, Support, Follow / Subscribe, Use This Sound.

### Source-aware behaviour rules

**What changes by source:**
1. Top card media format (video-first vs audio-first)
2. Primary CTA family suppression (no "stream on Spotify" for Spotify source)
3. CTA position adjustment (pre-save demoted to secondary for cold short-form during pre-release)
4. Fan capture heading copy (source-tuned, optional)
5. Source pill display ("Found through Instagram")

**What never changes by source:**
- Artist name and visual identity
- Accent colour
- Page layout and section structure
- Section order (only state changes this)
- Font system

**Maximum three things change per source.** If a proposed adaptation is a fourth variable, reject it.

### Guardrails

**CTA:**
- Hero: max 2 CTAs (primary + secondary). Hard limit.
- Quick-action pills: max 4 mobile / 6 wide.
- Per section: max 2.
- Same URL cannot appear in multiple zones. Hero wins deduplication.
- Primary and secondary cannot share a destination.
- In gig state, primary CTA is always tickets-related. Not editable in standard mode.
- Engagement CTAs cannot be primary unless consumption has been established on the visit.

**State:**
- States are mutually exclusive. No co-active states.
- Max 6 named states. Map niche moments to existing states + CTA adjustment — never add new states.
- Gig auto-expires 24h after show time.
- Pre-release auto-transitions to live on release date.

**Adaptation:**
- Adaptation is invisible — happens before first render, never visibly swaps after load.
- No per-individual fan personalisation. Source-category adaptation only.

**Artist-facing:**
- Artist sees max 3 CTA options in the primary CTA picker (filtered by state).
- AI presents 1 recommendation + 1 alternative. Never a menu.
- AI never auto-applies. Always requires confirmation.

---

## 3. MVP VS LATER

### MVP — build this

**States:** Profile, pre-release, live, gig. Auto-transition pre-release → live on release date. Gig auto-expires 24h.

**Top card:** Three formats — artwork + audio player, video embed (YouTube / TikTok URL), state overlay (countdown or show card). Artist sets one media item. State overlay sits on top.

**CTA hero families:** Listen, pre-save, tickets, fan capture, watch. Two hero slots. System suggests by state, artist confirms.

**Engagement CTAs in MVP:** Add to playlist and native share only. Secondary position only. Never primary in MVP.

**Light nudge:** Artist can set optional nudge text (5–8 words). AI suggests based on state. Shown above primary CTA button. Blank = hidden.

**CTA rigidity in MVP:** State locks the CTA family. Source suppresses redundant families (Spotify → suppress stream). Cold short-form + pre-release → pre-save is secondary, warm-up action leads. These are fixed rules, not learned behaviour.

**Source tracking:** UTM on all artist-shared links. Log source → page view, source → CTA click, source → fan capture. No adaptive media behaviour yet — track the data, use in Phase 2.

**AI preset flow:** Three questions → one named preset → artist confirms. Four presets: "Getting noticed," "Building to the drop," "It's out," "Playing tonight." Fixed logic, not a trained model.

**Source pill:** Display only. Cosmetic in MVP.

---

### Phase 2 — after MVP is live and data exists

- Source-adaptive top card (TikTok → video; Spotify → audio-forward, suppress stream CTA; email → single-CTA stripped layout)
- Merch and support CTA families in hero (Artist tier and above)
- Merch push and support push states
- Use This Sound engagement CTA (TikTok-specific, post-release only)
- AI mismatch detection from conversion data
- Source → conversion funnel reporting in artist analytics
- Nudge text correlation data — which nudges associate with higher CTA conversion

---

### Phase 3 — only after Phase 2 has signal

- AI-suggested CTA label and nudge variants from cross-artist conversion patterns
- Multi-state campaign planner (pre-release → live → post-release arc in one flow)
- Returning fan detection via fan capture cookie — different experience for fans who already signed up
- Cold-source warm-up sequence: TikTok fan returns → engagement CTA surfaces on second visit, not first

---

### Never attempt these

- Per-individual fan personalisation
- AI that auto-applies page changes without artist sign-off
- More than 6 campaign states
- AI writing final copy
- Engagement CTAs as primary for cold or first-visit traffic
- Source-adaptive behaviour before 8 weeks of clean source data
