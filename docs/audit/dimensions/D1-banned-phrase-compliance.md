# Dimension D1 — Banned Phrase Compliance
**Category:** Copy, Voice & Messaging
**Phase:** 4 (Copy)
**Status:** Not started

ABLE's voice is what separates it from every other link-in-bio tool. The banned phrase list exists because each prohibited phrase carries the smell of generic SaaS — it signals to the artist that this platform was made for marketers, not musicians. Full compliance means every string on every page, in every state, in every email, passes a single test: could a thoughtful independent artist read this and feel seen? No exclamation marks on dashboard copy, no growth-hacking language, no "content creator" anywhere. Compliance is not stylistic preference — it is brand integrity.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | `start.html` line 1768: fallback error string `'Something went wrong. Try again or use the skip link.'` — banned SaaS micro-copy. Fix: `'Couldn\'t reach Spotify right now. Skip and enter your name below.'` | start.html | 4 | 1 | L | 1 |
| 2 | `start.html` line 1761: Spotify confirm button sets text to `'Looks right — let\'s go →'` — "let's go" is a banned phrase (spec §2.3 Category 3). Fix: `'Looks right — continue →'` | start.html | 3 | 1 | L | 1 |
| 3 | `admin.html` line 3864: `'reaches like ${reach} followers.'` — "followers" is explicitly banned (spec §2.3 Category 2 "Followers → say 'your fans'"). Fix: `'${total} fans — email reaches people 4× more reliably than a social post.'` | admin.html | 4 | 1 | L | 1 |
| 4 | `admin.html` line 3136 snap card empty state: `'No updates yet. Add one to post a note, link, or snippet on your profile.'` — "post" as a verb meaning share content is banned (spec §2.3 Category 2). Fix: `'No updates yet. Add one to share a note, link, or snippet.'` | admin.html | 3 | 1 | L | 1 |
| 5 | `able-v8.html` line 8802 (approx): `'Sign-ups are paused right now. Check back soon.'` — "Check back soon" is banned SaaS filler (spec §2.3 Category 3 spirit). Fix: `'The list is full right now.'` | able-v8.html | 2 | 1 | L | 2 |
| 6 | `admin.html` line 4819: `'Builds sign-ups in the run-up.'` — "Builds sign-ups" is growth language. Fix: `'You collect emails before the release lands.'` | admin.html | 3 | 1 | L | 2 |
| 7 | `admin.html` line 4333: `openAdminSheet('🎤', 'Add a show', body)` — emoji `🎤` in admin-written copy. Spec bans emoji in admin copy unless artist-set. Remove emoji, use text only. | admin.html | 3 | 1 | L | 2 |
| 8 | `admin.html` line 7052: `'See your most engaged fans, filter by source, and act on it.'` — "most engaged fans" is metrics-platform language. Fix: `'See which fans came from where, how often they show up, and act on it.'` | admin.html | 2 | 1 | L | 3 |
| 9 | `admin.html` line 2522 tooltip: `'…pushing tickets for a show…'` — "pushing tickets" is marketing language. Fix: `'…flipping to tickets for a show…'` | admin.html | 2 | 1 | L | 3 |
| 10 | `admin.html` line 6233 support pack default: `{ label: 'Buy me a coffee', emoji: '☕' }` — default label uses emoji and casual phrase. Default should be `'Support my work'` with no emoji. | admin.html | 2 | 1 | L | 3 |
| 11 | `admin.html` line 2542 auto-hint: `'Before the date → Pre-release (pre-save CTA)'` — parenthetical "(pre-save CTA)" is internal jargon. Remove parenthetical: `'Before the date → Pre-release'` | admin.html | 2 | 1 | L | 3 |
| 12 | `able-v8.html` line 5516 (approx): QuotaExceededError toast: `'Your device is running low on storage. Time to sync your data.'` — "Time to sync your data" is platform voice. Fix: `'Your device storage is full. Some changes may not save.'` | able-v8.html | 2 | 1 | L | 3 |
| 13 | `start.html` step 3 sub (line 1395): `'Drop your email — we\'ll send you a link so you can always get back to it.'` — "Drop your email" is casual. "get back to it" is vague. Fix: `'Leave your email — we\'ll send a link so you can always return to your page.'` | start.html | 2 | 1 | L | 4 |
| 14 | `able-v8.html` line 5509 (static HTML): trust line `'Your email goes to [artist] — not to ABLE. Unsubscribe any time.'` — at runtime `renderFanCapture()` overwrites this with `'Just {artist}. No spam.'` but the static HTML is misleading to code readers and may be served before JS executes. Align static HTML to spec: `'Just [Artist Name]. No spam.'` | able-v8.html | 3 | 1 | L | 2 |
| 15 | `landing.html` FAQ section heading structure: spec says section title should be `'Questions.'` (single word, period). Current: eyebrow is `'Questions'`, h2 is `'The things people actually ask.'` Consider: remove eyebrow, h2 = `'Questions.'` to match spec exactly. | landing.html | 2 | 1 | L | 4 |
| 16 | `fan.html` line 1242: `'Find artists from their pages, or look through Discover.'` — "look through" is passive. Fix: `'Find artists from their pages, or browse Discover.'` | fan.html | 1 | 1 | L | 5 |
| 17 | `start.html` sent state (line ~1426): `'Click it and you\'ll see your page.'` — "Click it" is desktop-era language. Fix: `'Tap the link and your page is there.'` | start.html | 1 | 1 | L | 5 |
| 18 | `start.html` "How do I find it?" toggle collapse label: `'Hide'` — cold single word. Fix: `'Got it ↑'` | start.html | 1 | 1 | L | 5 |
| 19 | `able-v8.html` CAPTURE_VARIANTS `'profile'` — heading `'Stay close.'` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 20 | `able-v8.html` CAPTURE_VARIANTS `'profile'` — CTA `"I'm in"` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 21 | `able-v8.html` CAPTURE_VARIANTS `'profile'` — trust `'Just {artist}. No spam.'` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 22 | `able-v8.html` CAPTURE_VARIANTS `'pre-release'` — CTA `'Tell me first'` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 23 | `able-v8.html` CAPTURE_VARIANTS `'pre-release'` — trust `'First listen, nothing else.'` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 24 | `able-v8.html` CAPTURE_VARIANTS `'live'` — CTA `'Count me in'` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 25 | `able-v8.html` CAPTURE_VARIANTS `'live'` — trust `'Just {artist}. No spam.'` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 26 | `able-v8.html` CAPTURE_VARIANTS `'gig'` — CTA `'Let me know'` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 27 | `able-v8.html` CAPTURE_VARIANTS `'gig'` — trust `'Show news only.'` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 28 | `able-v8.html` line 5513: post-submit echo `'You\'re in. I\'ll keep you close.'` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 29 | `admin.html` line 3773: first fan milestone `'Your first fan. This is how every list starts.'` — clean. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 30 | `admin.html` line 7051: email broadcasts gate `'Send a message directly to every fan on your list. Artist Pro.'` — clean. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 31 | `admin.html` line 7047: snap cards gate `'Add as many Updates as you want. Artist plan.'` — "Updates" is a vocabulary inconsistency (see D10) but not a banned phrase. Flag for D10. | admin.html | 2 | 1 | L | 3 |
| 32 | `admin.html` line 2592 auto-gig nudge: `'You have a show today. Gig mode puts tickets front and centre.'` — clean. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 33 | `admin.html` line 6981: `'Your page, your list, your relationship.'` — clean. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 34 | `admin.html` line 7014: `'Your page is live.'` — clean. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 35 | `admin.html` gig strip hint: `'Flip this on show day — puts tickets front and centre. Auto-expires in 24 hrs.'` — clean. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 36 | `admin.html` line 4107 toast: `'No fans yet — share your page to see who shows up.'` — "share your page" is admin-context advice, not growth language. Acceptable. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 37 | `landing.html` hero headline: `'100 real fans beat 10,000 strangers.'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 38 | `landing.html` hero primary CTA: `'Your page is free →'` — clean. Matches spec exactly. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 39 | `landing.html` hero trust line: `'No card required. Free forever.'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 40 | `landing.html` diff-band: `'This is not a social network. It is not a marketing tool.'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 41 | `landing.html` footer CTA: `'Free to start. Live in five minutes. Your list, your relationship — no algorithm in the way.'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 42 | `landing.html` footer authenticity: `'Built by an independent artist who got tired of Linktree not knowing when a release was dropping.'` — clean. Specific, insider voice. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 43 | `landing.html` FAQ `'Is it actually free?'` answer: `'Yes. Free forever for a real working page — not a trial, not a watermarked demo.'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 44 | `landing.html` FAQ `'Who owns my fans\' emails?'` answer: `'You do. We cannot contact your fans.'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 45 | `landing.html` features section title: `'Built for the moment you\'re in.'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 46 | `landing.html` features section sub: `'They tapped your link because they already care.'` — clean. Insider perspective. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 47 | `landing.html` features card title: `'Set a date. Your page does the rest.'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 48 | `landing.html` setup section title: `'Live in five minutes'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 49 | `start.html` step A Spotify button: `'Find me on Spotify →'` — clean. First-person, specific. Confirmed. | start.html | 0 | 0 | L | 6 |
| 50 | `start.html` skip link: `'I\'m not on Spotify →'` — clean. First-person, honest. Confirmed. | start.html | 0 | 0 | L | 6 |
| 51 | `start.html` trust line: `'No card. No catch. Your page is free.'` — clean. Matches spec exactly. Confirmed. | start.html | 0 | 0 | L | 6 |
| 52 | `start.html` step 1 title: `'What\'s happening right now?'` — clean. Direct question. Confirmed. | start.html | 0 | 0 | L | 6 |
| 53 | `start.html` step 2 title: `'What do you go by?'` — clean. Matches spec exactly. Confirmed. | start.html | 0 | 0 | L | 6 |
| 54 | `start.html` step 3 title: `'Save your page.'` — clean. Confirmed. | start.html | 0 | 0 | L | 6 |
| 55 | `start.html` done state title: `'Your page is live.'` — clean. Matches spec exactly. Confirmed. | start.html | 0 | 0 | L | 6 |
| 56 | `start.html` step 3 make-real button: `'Make it real →'` — clean. Evocative, not SaaS. Confirmed. | start.html | 0 | 0 | L | 6 |
| 57 | `start.html` moment card labels: `'Just me, being an artist'`, `'Something\'s coming'`, `'Music just dropped'`, `'I\'m playing tonight'` — all clean, artist-voiced. Confirmed. | start.html | 0 | 0 | L | 6 |
| 58 | `fan.html` tab label: `'Following'` — clean. Matches spec (Following not Feed). Confirmed. | fan.html | 0 | 0 | L | 6 |
| 59 | `fan.html` tab label: `'Me'` — clean. Matches spec (Me not Profile). Confirmed. | fan.html | 0 | 0 | L | 6 |
| 60 | `admin.html` recommendations empty state: `'No recommendations yet. Share artists who\'ve shaped your sound.'` — clean. Artist-voiced. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 61 | `admin.html` clips empty state: `'No clips yet. Add one to share a video moment with your fans.'` — clean. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 62 | `admin.html` Campaign HQ: `'Your page in its natural state'` — clean. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 63 | `admin.html` stat labels: `'Visits'`, `'Clicks'`, `'Fans'`, `'Click rate'` — clean. Single-word labels as per spec. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 64 | `admin.html` fan count bar: `'/ 100 on free plan'` — clean. Factual. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 65 | `admin.html` export copy: check `'Export as CSV →'` is the label on the export button. Spec says this exact string. Verify. | admin.html | 2 | 1 | L | 3 |
| 66 | `admin.html` Campaign HQ `chq-title`: `'Campaign'` — neutral section label. Acceptable. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 67 | `admin.html` gig strip label: `'Gig tonight'` — clean. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 68 | `admin.html` save button: `'Update your page →'` — acceptable as a save-action label. "Update" here means save, not "Updates" as a content type. Confirmed clean in context. | admin.html | 0 | 0 | L | 6 |
| 69 | `admin.html` `arModeBadge` text: `'Profile'`, `'Pre-release'`, `'Live'` — these are timeline labels. `'Profile'` is an internal term, not technically a banned phrase. Acceptable. | admin.html | 0 | 0 | L | 6 |
| 70 | `admin.html` arc node labels: `'Announce'`, `'Pre-release'`, `'Release day'`, `'After'` — these are timeline milestone labels. Clean. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 71 | `admin.html` milestone card icon `✦` — typographic character, not an emoji. Spec bans emoji. `✦` is acceptable. | admin.html | 0 | 0 | L | 6 |
| 72 | `admin.html` line 6361: `'Day 1 ✦'` in stats delta — `✦` used as a typographic decoration. Borderline. If spec interpretation is strict, replace `✦` with `'—'` or remove. Low priority. | admin.html | 1 | 1 | L | 5 |
| 73 | `admin.html` "What fans see right now" label — clean admin-context label. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 74 | `admin.html` line 7050: `'You\'ve reached 100 fans. Your next 1,900 are one step away.'` — "one step away" is mildly salesy but specific and truthful. Acceptable. | admin.html | 1 | 1 | L | 6 |
| 75 | `admin.html` line 7053: `'See where your fans come from, what they tap, and when they show up.'` — clean. Specific. Confirmed. | admin.html | 0 | 0 | L | 6 |
| 76 | `admin.html` post-gig greeting spec: `'Last night at [Venue]. [N] fans joined.'` — not yet wired. When implemented, confirm no banned phrases in the greeting. | admin.html | 3 | 2 | M | 3 |
| 77 | `landing.html` FAQ answer about Linktree: `'Most artists who try it switch their bio link over pretty quickly.'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 78 | `landing.html` FAQ answer about Beacons: `'Beacons takes 9% of every sale you make on their free plan. We take 0%'` — clean. Specific, factual. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 79 | `landing.html` proof-lines: `'Changes with your moment'`, `'Leads with the right action'`, `'Music lives in the page'`, `'Your look, exactly'` — all clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 80 | `landing.html` hero micro copy: `'Live in 5 minutes · No platform cut · No lock-in'` — clean. Confirmed. | landing.html | 0 | 0 | L | 6 |
| 81 | `able-v8.html` GDPR consent: `'By signing up, [artist] can contact you about their music.'` — "signing up" is legal-required language. Acceptable exception. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 82 | `able-v8.html` section tab labels: `'Listen'`, `'Shows'`, `'Merch'`, `'Support'` — `'Listen'` is a verb-imperative tab label. For the section heading (not the tab), spec requires `'My music'`. Verify the distinction between tab label and section heading. | able-v8.html | 3 | 2 | M | 3 |
| 83 | `able-v8.html` OG description: `'Music, shows, and more — direct from the artist.'` — "and more" is lazy. `'the artist'` is generic. Fix: `'Music, shows, and everything else — from [Artist Name].'` | able-v8.html | 2 | 1 | L | 4 |
| 84 | Confirmation emails — verify no `'Welcome!'`, `'You\'re subscribed!'`, or `'Thanks for signing up!'` in the Resend templates. These are the most common SaaS phrases in transactional email. Schedule a Resend template audit. | email | 4 | 2 | M | 2 |
| 85 | Confirmation emails — subject line for profile state should be artist-voiced, not generic. Verify `fan-confirmation.js` or Resend template. | email | 4 | 2 | M | 2 |
| 86 | Artist welcome email subject: spec says `'Your ABLE page is live.'` Verify period is included. No exclamation. | email | 3 | 2 | M | 3 |
| 87 | All pages: grep for `'content'` as a noun when referring to music or art. Current scan found no violations. Run dedicated search to confirm. | all | 3 | 1 | L | 2 |
| 88 | All pages: grep for `'community'` when used to mean audience. No violations found. Confirm. | all | 3 | 1 | L | 2 |
| 89 | All pages: grep for `'newsletter'` in user-facing copy. No violations found. Confirm. | all | 3 | 1 | L | 2 |
| 90 | All pages: grep for `'mailing list'` in user-facing copy. No violations found. Confirm. | all | 3 | 1 | L | 2 |
| 91 | All pages: grep for `'audience'` in user-facing copy. No violations found in user-facing UI. Confirm it does not appear in any rendered text visible to artists or fans. | all | 3 | 1 | L | 2 |
| 92 | All pages: grep for `'subscribers'` in user-facing copy. No violations found. Confirm. | all | 3 | 1 | L | 2 |
| 93 | All pages: grep for `'engage'` / `'engagement'` in user-facing copy. No violations found. Confirm. | all | 3 | 1 | L | 2 |
| 94 | All pages: grep for `'viral'` in user-facing copy. No violations found. Confirm. | all | 3 | 1 | L | 2 |
| 95 | `admin.html` page title: spec says never `'Dashboard — ABLE'`. Verify the rendered `<title>` does not contain the word "Dashboard". The title should resolve to `'[Name] — ABLE'` or `'ABLE'`. | admin.html | 2 | 1 | L | 3 |
| 96 | `start.html` vibe labels use emoji: `'🌙 Atmospheric'`, `'🔥 Hype'`, `'🎸 Raw'`, `'🌊 Chill'`. Spec bans emoji in admin copy but is silent on onboarding vibe picker. These are self-identification choices for artists, not platform-written labels. Acceptable. | start.html | 0 | 0 | L | 6 |
| 97 | `start.html` mini preview mock CTA: `'Stream Now'` — this is demo/preview copy, not live copy. No action needed unless it is ever surfaced as a default to real fans. | start.html | 0 | 0 | L | 6 |
| 98 | `able-v8.html` CAPTURE_VARIANTS `'near-future'` — `'Remind me.'` / `"I'm coming"` / `'One email, when it matters.'` — all clean, first-person. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 99 | `able-v8.html` CAPTURE_VARIANTS `'gig-post'` — `'Were you there tonight?'` / `'Let me know'` / `'Next show. Nothing else.'` — clean. Confirmed. | able-v8.html | 0 | 0 | L | 6 |
| 100 | Final pass: after all fixes above are applied, run a full grep across all four HTML files for each Category in spec §2.3 (growth language, platform language, SaaS micro-copy, punctuation, artist-profile bans) and document zero remaining instances. | all | 5 | 3 | L | 6 |

## Wave Summary

| Wave | Focus | Points |
|---|---|---|
| 1 | Critical banned phrase violations — fix immediately | 1, 2, 3, 4 |
| 2 | Near-violations, tone corrections, static HTML alignment | 5, 6, 7, 12, 14, 84, 85, 87–94 |
| 3 | Vocabulary inconsistencies, admin labels, minor jargon | 8, 9, 10, 11, 31, 65, 82, 95 |
| 4 | Low-stakes polish | 13, 15, 83 |
| 5 | Cosmetic edge cases | 16, 17, 18, 72 |
| 6 | Confirmed clean — no action required | All 0-impact rows |
