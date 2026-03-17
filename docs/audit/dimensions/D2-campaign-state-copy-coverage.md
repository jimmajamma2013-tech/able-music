# Dimension D2 — Campaign State Copy Coverage
**Category:** Copy, Voice & Messaging
**Phase:** 4 (Copy)
**Status:** Not started

All four campaign states — profile, pre-release, live, and gig — must have unique, correct copy on every surface where state affects what the artist or fan sees. A state that shares copy with another state is invisible to the people it is meant to reach. Full coverage means: fan capture heading, fan capture CTA, fan trust text, fan capture sub text, artist hero label, artist hero CTA, admin Campaign HQ pill label, admin state description, and fan confirmation email subject all have a distinct, spec-compliant string for each state. Any surface that does not change with state is a compliance gap.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Fix the gig-state fan capture heading from "I'll let you know about future dates." to "I'm playing tonight." per copy spec | V8 | 5 | 1 | L | 1 |
| 2 | Fix the pre-release fan capture heading from "Be the first to hear it." to "You signed up right before something." per copy spec | V8 | 5 | 1 | L | 1 |
| 3 | Fix the live-state fan capture heading from "Stay on everything I do." to "Stay close." per copy spec | V8 | 5 | 1 | L | 1 |
| 4 | Add "Just your email." as a prefix to the profile-state fan capture sub text so it reads "Just your email. I'll reach out when something's actually happening." | V8 | 4 | 1 | L | 1 |
| 5 | Implement state-driven fan capture sub text in renderFanCapture() so sub text updates per state rather than always showing the static default | V8 | 5 | 3 | M | 1 |
| 6 | Add pre-release state sub text: "[Release title] comes out in [N] days. You'll hear it first." with fallback "Something's coming. You'll hear it first." | V8 | 4 | 2 | M | 1 |
| 7 | Add live-state sub text: "[Release title] is out. You can stream it from here." as the per-state default | V8 | 4 | 2 | M | 1 |
| 8 | Add gig-state sub text: "Sign up and I'll keep you close after the show." as the per-state default | V8 | 4 | 2 | M | 1 |
| 9 | Verify the fan capture section is never left hidden at runtime — audit all code paths through renderFanCapture() that could leave the section in a hidden state | V8 | 5 | 1 | H | 1 |
| 10 | Fix the admin Campaign HQ profile-state pill label from "Profile" to "Live" per copy spec section 2.6b | ADM | 4 | 1 | M | 1 |
| 11 | Fix the admin Campaign HQ profile-state description from "Your page in its natural state…" to "Your page is live. Put the link in your bio." | ADM | 3 | 1 | L | 2 |
| 12 | Verify fan confirmation email subject changes per campaign state — a static generic subject for all states is a P0 gap | ALL | 5 | 3 | M | 1 |
| 13 | Implement pre-release state fan confirmation email subject as "[Release title] — [N] days" with dynamic title and day count | ALL | 5 | 3 | M | 1 |
| 14 | Implement gig-state fan confirmation email subject as "Tonight at [Venue]" — this is the most impactful transactional subject line in the product | ALL | 5 | 3 | M | 1 |
| 15 | Implement live-state fan confirmation email subject as "[Release title] is out" with dynamic title | ALL | 4 | 3 | M | 2 |
| 16 | Verify the profile-state fan echo confirmation on V8 reads "You're in. I'll keep you close." and does not persist incorrect text after state change | V8 | 4 | 1 | L | 2 |
| 17 | Add state-aware fan echo confirmation text: in pre-release show "You're in. I'll reach out when it's out.", in gig show "You're in. See you there." | V8 | 3 | 2 | M | 3 |
| 18 | Verify the pre-release hero label renders as "[Release title] — [N] days" and is dynamically computed | V8 | 4 | 2 | M | 2 |
| 19 | Verify the pre-release hero CTA renders as "Pre-save [Release title]" and includes the dynamic title | V8 | 4 | 2 | M | 2 |
| 20 | Verify the live-state hero label renders as "[Release title] — out now" dynamically | V8 | 4 | 2 | M | 2 |
| 21 | Verify the live-state hero CTA renders as "Stream [Release title]" dynamically | V8 | 4 | 2 | M | 2 |
| 22 | Verify the gig-state hero label renders as "On tonight" and is visually prominent in the hero area | V8 | 4 | 2 | M | 2 |
| 23 | Verify the gig-state hero CTA renders as "Get tickets" | V8 | 4 | 1 | L | 2 |
| 24 | Verify gig-state hero shows venue and time as "[Venue], [City]. Doors [Time]." including the period after the time | V8 | 3 | 2 | M | 3 |
| 25 | Verify computeState() in V8 and admin.html produce identical state output for the same localStorage input — divergence means artist sees one state, fan sees another | ALL | 5 | 2 | H | 1 |
| 26 | Fix the live-state admin Campaign HQ pill to use "Out now" instead of "Live" so it is visually distinct from the default profile-state pill also labeled "Live" | ADM | 3 | 1 | L | 2 |
| 27 | Verify the pre-release admin Campaign HQ description renders as "[Release title] drops on [Date]. Pre-release mode is on." dynamically | ADM | 3 | 2 | M | 2 |
| 28 | Verify the live-state admin Campaign HQ description renders as "[Release title] is out. You have [N] days in live mode." dynamically | ADM | 3 | 2 | M | 2 |
| 29 | Verify the gig-state admin Campaign HQ description renders as "Your page is in gig mode. It auto-resets in [N] hours." dynamically | ADM | 3 | 2 | M | 2 |
| 30 | Implement the post-gig admin greeting: "Last night at [Venue]. [N] fans joined." shown on the first admin load after gig mode expires | ADM | 5 | 2 | M | 1 |
| 31 | Hide the campaign timeline arc in admin Campaign HQ when gig mode is active so artists do not see an ambiguous overlay of two state systems | ADM | 3 | 2 | M | 3 |
| 32 | Replace the generic auto-hint text "Before the date → Pre-release (pre-save CTA) · On the date → Live…" with the specific state description once a release date is set | ADM | 3 | 1 | L | 2 |
| 33 | Verify the "Announce" arc node description shown on hover matches the profile-state copy spec description | ADM | 3 | 2 | M | 3 |
| 34 | Verify the "After" arc node description shown on hover matches the profile-state copy spec description since both map to the same state | ADM | 2 | 1 | L | 4 |
| 35 | Verify the gig countdown label renders as "Resets in [Nh Nm]" with correct h and m abbreviations rather than a colon-separated time format | ADM | 2 | 1 | L | 3 |
| 36 | Verify the pre-release countdown on V8 profile shows label text "Until [Release title]" rather than a generic "Countdown" label | V8 | 4 | 1 | L | 2 |
| 37 | Confirm that when gig mode expires the page state returns to the correct prior computed state and does not remain in gig visually | V8 | 4 | 2 | M | 2 |
| 38 | Confirm the secondary fan capture module (fan-capture-2) uses the same state-aware heading as the primary module | V8 | 4 | 1 | L | 1 |
| 39 | Verify the profile-state hero shows no state label injected by computeState() — artist name and bio only | V8 | 3 | 1 | L | 2 |
| 40 | Document the gig-post and near-future extension states officially in the copy spec or remove them from CAPTURE_VARIANTS to avoid spec drift | ALL | 3 | 2 | L | 3 |
| 41 | Verify the gig-post fan capture heading "Were you there tonight?" is only triggered after gig mode has expired, not during an active gig | V8 | 3 | 1 | M | 3 |
| 42 | Verify the near-future fan capture heading "Remind me." is only triggered when a show is within a short threshold, not randomly | V8 | 3 | 1 | M | 3 |
| 43 | Add the "Just your email." opener to the pre-release state sub text so the trust signal is present in the highest-intent state | V8 | 3 | 1 | L | 2 |
| 44 | Verify the live-state admin Campaign HQ shows how many days remain in the 14-day live window so artists know when the page will auto-flip | ADM | 3 | 2 | M | 2 |
| 45 | Verify admin state descriptions are read from a single STATE_DESCRIPTIONS object rather than being scattered across inline template strings | ADM | 3 | 2 | M | 3 |
| 46 | Add a state-contextual og:description for the pre-release state: "[Release title] drops [date]. Sign up to hear it first." | V8 | 3 | 2 | M | 4 |
| 47 | Add a state-contextual og:description for the gig state: "[Artist] is playing tonight at [Venue]." | V8 | 3 | 2 | M | 4 |
| 48 | Add a state-contextual og:description for the live state: "[Release title] is out now." | V8 | 3 | 2 | M | 4 |
| 49 | Verify the pre-release fan capture CTA "Tell me first" is rendered from CAPTURE_VARIANTS and not hard-coded elsewhere | V8 | 3 | 1 | L | 3 |
| 50 | Verify the live-state fan capture CTA "Count me in" is rendered from CAPTURE_VARIANTS and not hard-coded elsewhere | V8 | 3 | 1 | L | 3 |
| 51 | Verify the gig-state fan capture CTA "Let me know" is rendered from CAPTURE_VARIANTS and not hard-coded elsewhere | V8 | 3 | 1 | L | 3 |
| 52 | Verify the profile-state fan capture CTA "I'm in" is rendered from CAPTURE_VARIANTS and not hard-coded elsewhere | V8 | 3 | 1 | L | 3 |
| 53 | Verify the profile-state fan trust text "Just {artist}. No spam." interpolates the artist name at runtime | V8 | 4 | 1 | M | 2 |
| 54 | Verify the live-state fan trust text "Just {artist}. No spam." interpolates the artist name at runtime | V8 | 4 | 1 | M | 2 |
| 55 | Confirm the pre-release trust text "First listen, nothing else." does not use the artist name interpolation (it is release-focused, not artist-focused) | V8 | 2 | 1 | L | 4 |
| 56 | Confirm the gig trust text "Show news only." does not accidentally render as "Just {artist}. Show news only." by inheriting from a default | V8 | 3 | 1 | L | 3 |
| 57 | Verify admin Campaign HQ section title "Campaign" is consistent with all in-page references to "Campaign mode" — align to one term | ADM | 2 | 1 | L | 4 |
| 58 | Verify the "Gig tonight" strip label and the "Gig mode" pill label are visually placed so artists do not read them as two separate modes | ADM | 2 | 2 | M | 3 |
| 59 | Add the parenthetical "pre-save CTA" to the internal arc hint so it is visible only in admin context and does not bleed to fan-facing copy | ADM | 2 | 1 | L | 4 |
| 60 | Verify the arc node "Release day" label is not visible to artists as a permanent page state name but only as a timeline milestone | ADM | 2 | 1 | L | 4 |
| 61 | Confirm the admin Campaign HQ does not display a "Profile" pill while the actual page is in live state due to a computeState mismatch | ADM | 4 | 1 | M | 2 |
| 62 | Verify the auto-gig nudge text "You have a show today. Gig mode puts tickets front and centre." reads as direct admin advice, not fan-facing copy | ADM | 3 | 1 | L | 3 |
| 63 | Verify that switching from pre-release to profile state via admin removes the countdown from V8 within one page load | V8 | 4 | 2 | H | 2 |
| 64 | Verify that switching from live to profile state via admin removes the "Out now" label from the V8 hero within one page load | V8 | 4 | 2 | H | 2 |
| 65 | Add a "gig-expired" admin greeting: "Your page is back to normal." shown after the post-gig greeting has been dismissed | ADM | 3 | 2 | M | 3 |
| 66 | Verify the gig state activates correctly when the artist taps the toggle during a campaign period that already has a release date set | ALL | 4 | 1 | H | 2 |
| 67 | Verify the gig mode auto-expiry runs on both admin.html and able-v8.html so the fan does not see gig state hours after it should have reset | ALL | 5 | 2 | H | 1 |
| 68 | Confirm the profile-state confirmation email subject is the spec default "confirmation of list join" and not empty when no state-specific subject applies | ALL | 3 | 2 | M | 3 |
| 69 | Verify that all six CAPTURE_VARIANTS keys match the state values returned by computeState() with exact string equality | V8 | 4 | 1 | M | 2 |
| 70 | Confirm that the pre-release state hero does not show "Out now" if the release date is today but has not yet passed in the artist's timezone | V8 | 3 | 2 | M | 3 |
| 71 | Verify the gig "On tonight" hero label is shown above the fold on mobile at 375px without being hidden by the artist name | V8 | 4 | 1 | M | 2 |
| 72 | Confirm the live-state "Stream [Release title]" CTA links to the correct streaming URL and not a fallback placeholder | V8 | 5 | 1 | H | 2 |
| 73 | Confirm the gig-state "Get tickets" CTA links to the correct ticket URL from the most recent show with featured flag | V8 | 5 | 1 | H | 2 |
| 74 | Verify no campaign state injects copy that uses a banned phrase — cross-reference D1 audit for any state-specific copy violations | ALL | 4 | 2 | L | 2 |
| 75 | Confirm the pre-release fan capture heading personalised variant "[title] drops [date]. Hear it early." only shows when both title and releaseDate are present | V8 | 3 | 1 | M | 3 |
| 76 | Confirm the live-state fan capture personalised heading "[title] is out now." only shows when a title is set and has a non-empty string | V8 | 3 | 1 | M | 3 |
| 77 | Add an admin nudge copy for the first time pre-release state activates: "Pre-release is on. Your page now shows a countdown." | ADM | 3 | 2 | M | 3 |
| 78 | Add an admin nudge copy for the first time live state activates: "[Release title] is out. Your page updated automatically." | ADM | 3 | 2 | M | 3 |
| 79 | Verify the Campaign HQ "What fans see right now" preview label is visible in all four states, not just the default profile state | ADM | 3 | 1 | L | 3 |
| 80 | Confirm that the stateOverride value "auto" triggers computeState() logic rather than being passed as a literal state string | V8 | 4 | 1 | H | 2 |
| 81 | Verify the admin Campaign HQ arc node for "After" shows the correct profile-state description and not a unique "post-release" copy string | ADM | 2 | 1 | L | 4 |
| 82 | Verify the pre-release state description in Campaign HQ hides the generic three-state hint once a release date is confirmed | ADM | 3 | 2 | M | 2 |
| 83 | Confirm that admin.html and able-v8.html use identical timezone logic when computing whether releaseDate has passed | ALL | 4 | 2 | H | 2 |
| 84 | Add a visible 14-day countdown in the admin live-state description so artists always know when their page will auto-flip to profile | ADM | 3 | 2 | M | 3 |
| 85 | Confirm the gig mode toggle is visible and accessible in all four base campaign states so artists can activate it at any time | ADM | 4 | 1 | L | 2 |
| 86 | Confirm the fan capture section heading element tag is h2 not h3 in all four states so screen readers announce the section heading correctly | V8 | 3 | 1 | L | 3 |
| 87 | Confirm the "On tonight" hero label has sufficient colour contrast against the artist accent colour in all four ABLE themes | V8 | 4 | 1 | M | 2 |
| 88 | Confirm the "[Release title] — [N] days" hero label truncates gracefully on mobile at 375px for titles longer than 20 characters | V8 | 3 | 1 | M | 3 |
| 89 | Verify the pre-release state "Tell me first" CTA has the same visual weight as the profile-state "I'm in" CTA so sign-up intent does not drop | V8 | 3 | 1 | M | 3 |
| 90 | Document the complete per-state copy matrix covering all 6 variant states in a single reference table in the copy spec | ALL | 3 | 2 | L | 3 |
| 91 | Confirm the live-state fan trust text uses artist name interpolation matching the profile-state version for consistency | V8 | 2 | 1 | L | 4 |
| 92 | Confirm the gig-post state is only accessible when gig mode has just expired (within a 2-hour window) not permanently after any past gig | V8 | 3 | 1 | M | 3 |
| 93 | Verify the near-future state is only triggered by a show within a configurable threshold (e.g. 7 days) and not by a show in the distant future | V8 | 3 | 1 | M | 3 |
| 94 | Add a line to the artist onboarding completion screen naming the campaign state the artist is currently in: "Your page is live in profile mode." | STR | 3 | 2 | M | 4 |
| 95 | Audit all four admin Campaign HQ state description strings for banned phrases per D1 and fix any violations found | ADM | 4 | 1 | L | 1 |
| 96 | Verify that the profile-state fan capture heading "Stay close." ends with a period and is not "Stay close" without punctuation | V8 | 3 | 1 | L | 2 |
| 97 | Verify that the gig-state fan capture heading "I'm playing tonight." ends with a period and reads as a confident first-person statement | V8 | 3 | 1 | L | 2 |
| 98 | Confirm the admin Campaign HQ correctly reflects the active state after a page refresh and does not revert to a stale cached state | ADM | 4 | 1 | M | 2 |
| 99 | Confirm that switching state in admin.html reflects on able-v8.html on next load without requiring a cache clear | ALL | 4 | 1 | H | 2 |
| 100 | Run a Playwright smoke test across all four campaign states verifying heading, CTA, trust text, and admin pill label for each | ALL | 5 | 3 | M | 6 |
