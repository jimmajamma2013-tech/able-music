# Landing Page — Full Spec
**File: `landing.html` | Updated: 2026-03-15**
**Current score: 4.5/10 → Target: 9/10**

> This document is the single source of truth for the landing page. Build from this, not from the current file.

---

## THE JOB OF THIS PAGE

Convert a curious independent artist into someone who starts building their profile. That's it. Everything on this page is either helping that happen or getting in the way of it.

**Three visitors land here:**
1. **New artist** — heard about ABLE, wants to understand what it is before signing up. They need to *see* it working before they commit to anything.
2. **Linktree switcher** — already using a bio link tool, needs a reason to switch. They know the problem, they need to see ABLE is the better solution.
3. **Fan** — clicked "Made with ABLE" on an artist's profile. They have no idea what ABLE is and don't particularly care. They need a gentle path that doesn't force them into artist onboarding.

---

## SECTION 1 — NAVIGATION BAR

**Height:** 56px
**Position:** Sticky — transparent initially, light frosted glass blur(12px) backdrop on scroll
**Background on scroll:** rgba(9, 9, 15, 0.85) with backdrop-filter blur(12px)

**Layout:**
```
[ABLE wordmark]                    [Sign in]  [Your page is free →]
```

**Left:** ABLE wordmark — clean, medium weight, 18px. Not too big. The product does the talking.

**Right, two items only:**
- "Sign in" — ghost/text style, 14px, subdued. For returning artists.
- "Your page is free →" — accent-filled pill, 14px, 36px height. The primary CTA. Arrow symbol included.

**On mobile (375px):** Wordmark left. Single button right: "Start →" (shorter label, same accent fill). Sign in moves to the bottom of the page or into a sheet.

**What NOT to do:**
- No hamburger menu — there are only 2 links
- No "Features / Pricing / Blog / About" — navigation is the product's enemy here. Every scroll anchor can be reached by scrolling.
- No "Sign up" — the copy is "Your page is free" not "Sign up." These feel different.

**Why this nav, not the current one:**
The current nav creates confusion by showing "Sign in" and "Get started" without any context about what each does. A new visitor doesn't know if "sign in" = they've been here before or if "get started" = they're about to sign up. The new nav is unambiguous: one path for returners (Sign in), one for newcomers (free page).

---

## SECTION 2 — HERO

**Height:** 100vh on desktop, auto (scroll) on mobile
**Layout:** Two-column on desktop (text left, phone right). Stacked on mobile.

### Left column — The pitch

**Eyebrow** (small, above headline): `For independent artists`
→ 12px, letter-spaced, accent colour, uppercase. Sets context before the headline lands.

**Headline:** `100 real fans beat 10,000 strangers.`
→ 56px on desktop, 40px on mobile. DM Sans 700 or Barlow Condensed 700. This line is not changed. Research confirms it resonates with the primary demographic. The period is intentional — it's a statement, not an invitation.

**Sub-headline:**
`Your page shifts with your moment. Release day. Tonight's gig. What's dropping next. And every fan who signs up — that email is yours. Forever.`
→ 20px desktop, 17px mobile. DM Sans 400. Line-height 1.6. Not squeezed. Room to breathe.

**Primary CTA:**
`Your page is free →`
→ Height: 52px. Padding: 0 32px. Background: accent (#e05242 default, or a strong mid-energy colour). Text: white, 17px, medium weight. Border radius: 12px. This button must feel substantial — not a timid pill. On hover: slight brightness increase + tiny translate(-1px, -1px) with box-shadow.

**Secondary CTA below button:**
`Already have a page? Sign in →`
→ 14px, subdued text, inline below the button. Not a button — a text link.

**Trust line** (very small, below CTAs):
`No card required. Free forever.`
→ 12px, muted colour. One line. Removes risk.

### Right column — The demo phone

**This is the most critical element on the page. It must show a real artist profile, not a mockup.**

**Phone dimensions:** 390px wide × 844px tall (iPhone 14 Pro ratio). On desktop: shown at 70% scale = ~273px wide, ~590px tall. This is larger than the current 280px mock.

**What's inside the phone:**

Default state (Profile): Shows an artist called "Luna" (fictional but real-looking). Electronic vibe — dark background, cyan accent, Barlow Condensed display font. Top card: YouTube Short embed playing silently, 9:16 portrait ratio. Below: "Stay close." fan sign-up. Platform pills visible. The page looks alive.

The phone frame: SVG phone frame overlay. Subtle reflection on screen. Slight shadow. No thick bezels — modern smartphone proportions.

**Real embeds required (no CSS mockups):**
- YouTube Short: use a publicly embeddable music Short (e.g. any music video short, or ABLE's own demo content). `?autoplay=1&mute=1&loop=1` so it plays silently on load without user interaction.
- Spotify embed: use a real track embed for the "Live" state.

**On mobile:** Phone moves below text. Scaled to fit viewport width with generous padding.

---

## SECTION 3 — THE DEMO ("See it shift")

**Headline:** `Your page knows what you're doing.`
**Sub:** `It shifts automatically. Release dropping. Show tonight. New music out. The page responds.`

**Layout:** Full-width section. Dark background (#09090f). Phone centred with 4 state buttons arranged around/below it.

### The 4 state buttons

These are the proof of the core product. They must be:
- Large enough to be clearly tappable: minimum 48px height, 120px wide
- Visually distinct from each other — each one represents a different energy
- Clearly labelled with what they represent, not just a label

| Button | Label | Sub-label | Accent |
|---|---|---|---|
| 1 | Profile | "Always on. Beautiful by default." | Neutral/white |
| 2 | Pre-release | "Something's coming." | Purple / indigo |
| 3 | Live | "It's out. Stream it now." | Green |
| 4 | Gig Tonight | "Show tonight. Tickets front." | Red/amber |

When a button is tapped/clicked:
- The demo phone animates to that state (cross-fade, 300ms)
- The state chip inside the phone updates
- The top card content changes
- The hero CTA text changes to reflect the state

**Phone in each state:**

**Profile state:** Artwork hero. Artist name prominent. Platform pills. Fan capture. The "default beautiful" — no campaign pressure.

**Pre-release state:** Countdown timer (days/hours/mins). Top card: artwork with subtle ambient glow intensifying (H9 animation). "Hear it first →" CTA primary. "pre-release" chip glowing.

**Live state:** Spotify embed playing the track. "Stream now →" CTA primary. "New release" badge. Everything points at the music.

**Gig Tonight state:** Top card: venue name + time, large. "Get tickets →" dominant CTA, full width. Gig badge with pulse glow. The page looks urgent.

**Below the states:**
`Artists don't change their Linktree on release day. ABLE changes for you.`
→ 18px, italic, centred. Quiet but pointed.

---

## SECTION 4 — THE LINKTREE MOMENT

**This section is for the switcher. Direct, not aggressive.**

**Layout:** Two columns — left: copy. Right: side-by-side comparison (simple, no complex table).

**Headline:** `You've had a Linktree for 2 years.`
**Sub:** `What does it know about your release dropping in 3 days?`

**The comparison (simple text, not a feature table):**

```
Linktree                          ABLE
────────────────────────────────────────────────────────────
Same links on release day         Page shifts to release mode
Same links when you're gigging    Gig mode activates, tickets front
0 emails collected                Every sign-up is your email list
Links belong to Linktree          Your fans belong to you
```

**Switch CTA:**
`Paste your Linktree — we'll import your links →`
→ This is the single strongest CTA for switchers. A ghost button (outlined, not filled). Below it: `"Spotify, Apple Music, YouTube, Bandcamp — anything we recognise becomes a native ABLE link. Unknown links import as custom buttons."` in small copy.

**This triggers the Linktree import flow in onboarding** — artist pastes their linktr.ee URL, onboarding auto-detects it and jumps to the import step.

---

## SECTION 5 — FAN OWNERSHIP

**Headline:** `Every email is yours. Forever.`

**Body:**
`When a fan signs up on your page, that email goes straight to your list. Not ours. If ABLE closes tomorrow — unlikely, but — you export your list and leave with everything. We take 0%. No commission. No lock-in.`

**The specific claim that converts:**
`If you have 500 fans who signed up on your ABLE page, those 500 emails are yours. You own that relationship. ABLE is the conduit, not the room.`

**Layout:** Single column, centred. Large type, generous line-height. Feels like a statement of values, not a feature list.

**No CTA in this section** — it's a trust-builder, not a conversion moment. Let the words land.

---

## SECTION 6 — HOW IT WORKS (3 steps)

**Headline:** `From zero to live in under 5 minutes.`

**Step 1:**
Icon: link/import
Headline: `Paste your Spotify or Linktree link.`
Body: `We pull your artist name, artwork, and links. Your page is mostly set up before you've typed a single word.`

**Step 2:**
Icon: lightning/shift
Headline: `Your page knows your moment.`
Body: `Set a release date — the page shifts to pre-release mode. Release drops — it shifts to live. Playing tonight? One tap for gig mode. Back to profile when it's done. Automatic.`

**Step 3:**
Icon: email/fans
Headline: `Every sign-up builds your list.`
Body: `Fans tap "Stay close." — that email is yours instantly. Watch your list grow in real time. When you're ready to reach them, they're there.`

**Layout:** Horizontal on desktop (3 columns), vertical on mobile. Each step: icon above, headline, body. Clean, no visual noise.

**CTA below:** `Your page is free →` (repeat of hero CTA — section conversion point)

---

## SECTION 7 — PRICING

**Current state:** This section is mostly correct. Minor improvements needed.

**Headline:** `Simple pricing. No surprises.`

**4 tiers:**

| Tier | Price | 1-line description | Key line |
|---|---|---|---|
| Free | £0/mo | "Your page, forever." | 100 fan sign-ups, 1 snap card, all campaign states |
| Artist | £9/mo | "Everything an active artist needs." | Unlimited sign-ups, all features, broadcasts |
| Artist Pro | £19/mo | "For artists building a serious fanbase." | Full fan data, email broadcasts, Close Circle |
| Label | £49/mo | "For managers handling multiple artists." | 10 artist pages, team access, aggregate data |

**Rules:**
- No "Most popular" badge (explicitly banned per V6 authority)
- "Your page is free →" CTA on the Free tier, not "Get started free"
- Each tier card: the headline benefit first, then the feature list
- Pro tier: Show the broadcast feature specifically — that's the conversion trigger

---

## SECTION 8 — FAQ

**Keep current FAQ structure, update copy where needed.**

**Questions to ensure are answered:**
1. "Is it really free?" — Yes. Free forever. No credit card.
2. "What happens to my Linktree?" — Import your links in one step. Keep Linktree if you want or remove it.
3. "Do I need a Spotify page?" — No. Works with SoundCloud, Bandcamp, YouTube, or nothing at all.
4. "Who owns my fans' emails?" — You do. 100%. We can't contact them. You can export anytime.
5. "How is this different from Linktree?" — Your page shifts with what you're doing. Linktree doesn't know you're releasing something in 3 days.
6. "What if I'm not releasing anything?" — Your evergreen profile is beautiful on its own. Most artists use the Profile state 90% of the time.
7. "Can I cancel?" — Yes, any time. Your page stays live on the free tier.

---

## SECTION 9 — FOOTER

**Layout:** Two columns (left: nav links, right: legal + fan path)

**Left:**
- ABLE wordmark
- "Sign in" link
- "Start free →" link
- Twitter / Instagram links (if ABLE has these)

**Right:**
- Privacy Policy
- Terms of Service
- `Not an artist?` — small text, then "Find artists on ABLE →" linking to fan.html or a discover page.

**Bottom bar:**
`© 2026 ABLE Music Ltd. Built for artists, not algorithms.`

---

## CRITICAL TECHNICAL REQUIREMENTS

**Demo phone embeds (non-negotiable):**
- YouTube Short: real iframe with `?autoplay=1&mute=1&playsinline=1&loop=1`
- Spotify: real iframe embed with a track (not a CSS mockup)
- SoundCloud: if shown in demo, real visual widget
- Embeds must be contained inside the phone frame — no overflow
- Must not cause layout shift (CLS) — dimensions set before load

**Performance:**
- Hero must be LCP ≤ 2.5s — no render-blocking resources
- Demo phone embeds lazy-load: load on intersection with demo section, not on page load
- Font loading: preload DM Sans, Barlow Condensed

**Mobile:**
- Phone demo moves below text on mobile
- State buttons become horizontal scroll row on mobile (no wrapping)
- All tap targets ≥ 48px

**Animation:**
- Hero entrance: content fades up (translateY 20px → 0, opacity 0→1, 600ms, spring ease)
- Phone entrance: scales in from 0.95 to 1 (400ms, spring ease)
- State transitions: cross-fade 300ms between states
- Only `opacity` and `transform` — no animating width/height/box-shadow

---

## WHAT IT MUST FEEL LIKE

Landing on this page should feel like landing on a product that was designed by someone who understands musicians. Not SaaS. Not another growth-hacking tool. Something that gets it.

The tone is: confident, direct, respectful. "We know you've seen a hundred tools like this. This one is different. Here's exactly why." No hyperbole, no emoji, no exclamation marks. Just the truth, clearly stated.

The visual language: dark, editorial, music-industry. The demo phone should look like something you'd actually want your artist page to look like. If the demo is beautiful, the conversion rate follows.

The test: a 24-year-old independent artist in Manchester, slightly cynical about SaaS tools, lands here from a recommendation. Within 10 seconds they should think: "OK, that's different. I want to see what mine looks like." That curiosity is the conversion moment.

---

## CURRENT GAPS (What needs building/changing)

| Gap | Severity | Fix |
|---|---|---|
| Demo phone is 280px, CSS mockup | P0 | Rebuild to 390px with real YouTube + Spotify iframes |
| State buttons too small and understated | P1 | Rebuild as proper labelled cards, 48px height |
| Linktree comparison section barely exists | P1 | Add full section 4 as specced above |
| Fan entry point missing entirely | P2 | Add to footer: "Not an artist? Find artists on ABLE →" |
| Hero CTAs lack visual weight | P1 | 52px height, heavier type, more accent presence |
| No real social proof | P2 | Add 2–3 real artist names + quotes when artists exist |
| Privacy policy doesn't exist | P1 (legal) | Required before real users sign up |
