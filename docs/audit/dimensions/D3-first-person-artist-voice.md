# Dimension D3 — First-Person Artist Voice
**Category:** Copy, Voice & Messaging
**Phase:** 4 (Copy)
**Status:** Not started

The artist profile page (able-v8.html) is the artist speaking to their fans. Every line of copy on that page should read as if the artist wrote it themselves — first person, direct, specific. "I'm playing tonight" not "This artist is performing tonight." "My music" not "Music." "I'll keep you close" not "Stay updated." When a fan lands on the page they should feel like they are standing in front of the artist, not reading a product listing. Full compliance means zero third-person references to the artist on the fan-facing profile page, and every piece of copy that ABLE provides as a default starts in first person.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm the fan capture heading for profile state "Stay close." reads as an artist invitation and not a platform instruction — it should feel like the artist is saying it | V8 | 5 | 1 | L | 1 |
| 2 | Replace any third-person section heading such as "Music by [Artist]" with first-person "My music" | V8 | 5 | 1 | L | 1 |
| 3 | Replace any "Shows" section heading with "I'm playing" or leave as "Shows" only if it reads as a neutral label, not a third-person description | V8 | 4 | 1 | L | 1 |
| 4 | Replace the fan capture sub text "The artist will reach out when something's happening." with "I'll reach out when something's happening." | V8 | 5 | 1 | L | 1 |
| 5 | Replace "Follow [Artist Name] for updates" in any V8 social proof or follow prompt with a first-person invitation | V8 | 5 | 1 | L | 1 |
| 6 | Confirm the gig-state fan capture heading "I'm playing tonight." is first-person and not inadvertently changed to third-person in any code path | V8 | 5 | 1 | L | 1 |
| 7 | Replace "Listen to [Artist]'s latest release" with "My latest" or "Hear it now" on any release card heading | V8 | 4 | 1 | L | 1 |
| 8 | Replace "Check out [Artist]'s merch" or any third-person merch heading with "My stuff" or a first-person equivalent | V8 | 4 | 1 | L | 1 |
| 9 | Confirm the fan confirmation echo "You're in. I'll keep you close." maintains first-person even when populated from a template string | V8 | 5 | 1 | L | 1 |
| 10 | Audit all snap card default copy for third-person references and replace each with a first-person prompt artists can then edit | V8 | 4 | 2 | L | 1 |
| 11 | Replace "This artist accepts support via" on any support section label with "You can support me directly" | V8 | 5 | 1 | L | 1 |
| 12 | Replace "About [Artist Name]" as a bio section label with no label (let the bio text speak) or "About me" | V8 | 4 | 1 | L | 2 |
| 13 | Replace any "Get [Artist]'s updates" CTA text with "Stay close." | V8 | 5 | 1 | L | 1 |
| 14 | Confirm the pre-release fan capture personalised heading "[Title] drops [date]. Hear it early." reads as artist-voiced — it omits "I" but the possessive "my" is implied; confirm it does not accidentally read as a third-party announcement | V8 | 3 | 1 | L | 2 |
| 15 | Replace "View [Artist]'s shows" as a shows section CTA with "See where I'm playing" | V8 | 4 | 1 | L | 1 |
| 16 | Replace "Support [Artist]" as a support CTA button label with "Support me" or use the artist's custom support label | V8 | 4 | 1 | L | 1 |
| 17 | Confirm the events section renders "I'm playing at [Venue]" or just the venue name, never "Performing at [Venue]" in third person | V8 | 4 | 1 | L | 2 |
| 18 | Replace "See all releases by [Artist]" with "All my releases" | V8 | 3 | 1 | L | 2 |
| 19 | Confirm the bio placeholder text shown in the onboarding preview uses first-person example copy such as "I make music for 3am drives." | STR | 4 | 1 | L | 1 |
| 20 | Replace "This page was created by [Artist]" in any footer or attribution line with no attribution, or "Page by [Artist]" | V8 | 3 | 1 | L | 2 |
| 21 | Confirm the GDPR consent text "By signing up, [artist] can contact you" is the only third-person reference on the page and is marked as a legal statement | V8 | 3 | 1 | L | 3 |
| 22 | Confirm the og:description does not describe the artist in third person when a bio is available — prefer pulling the first sentence of the bio | V8 | 3 | 2 | M | 3 |
| 23 | Confirm the schema.org Person description field uses the artist's bio text directly rather than a generated third-person description | V8 | 3 | 2 | M | 3 |
| 24 | Replace "Connect with [Artist]" as a section or CTA heading with "Stay close." or remove it | V8 | 4 | 1 | L | 1 |
| 25 | Confirm the email placeholder text in the fan capture form reads "Your email" not "[Artist]'s mailing list — enter email" | V8 | 4 | 1 | L | 2 |
| 26 | Replace the merch section heading "Merch" with "My stuff" or an artist-set custom label if the default section heading is an artist-facing label | V8 | 3 | 1 | L | 2 |
| 27 | Confirm the support section default heading is "Support me" not "Support [Artist]" or "Buy [Artist] a coffee" | V8 | 4 | 1 | L | 1 |
| 28 | Replace any aria-label that says "Follow [Artist Name] on Spotify" with "Listen on Spotify" — the follow instruction is the platform's job | V8 | 3 | 1 | L | 2 |
| 29 | Confirm the pre-release countdown label reads "Until [Release title]" not "Until [Artist]'s [Release title]" | V8 | 3 | 1 | L | 2 |
| 30 | Confirm the live-state hero label "[Release title] — out now" does not prepend the artist name making it read as a third-person announcement | V8 | 3 | 1 | L | 2 |
| 31 | Confirm all tab bar labels ("Listen", "Shows", "Merch", "Support") are neutral navigation labels and not third-person headings | V8 | 2 | 1 | L | 3 |
| 32 | Replace "Discover more about [Artist]" in any expand or read-more prompt with "Read more" or remove | V8 | 3 | 1 | L | 2 |
| 33 | Confirm demo profile bio in the onboarding preview uses first person: "My music is built for spaces where it can breathe." | STR | 3 | 1 | L | 2 |
| 34 | Replace the snap card default heading "Posted by [Artist]" with a first-person prompt or no byline | V8 | 4 | 1 | L | 1 |
| 35 | Confirm event card text reads "I'm at [Venue]" or just "[Venue]" — never "[Artist] is playing at [Venue]" | V8 | 4 | 1 | L | 1 |
| 36 | Confirm the post-gig fan capture heading "Were you there tonight?" is first-person artist perspective — it implies the artist was there too | V8 | 3 | 1 | L | 3 |
| 37 | Replace "Sign up to hear from [Artist]" with "Stay close." on any above-fold fan capture CTA | V8 | 5 | 1 | L | 1 |
| 38 | Confirm the near-future state heading "Remind me." is ambiguous enough to work as first-person (artist inviting) or second-person (fan requesting) — if ambiguous, make it explicitly first-person | V8 | 2 | 1 | L | 4 |
| 39 | Confirm the release card "Stream" button label is always "Stream now" not "Stream [Artist]'s music" | V8 | 3 | 1 | L | 2 |
| 40 | Replace "Find [Artist] on your favourite platform" in any streaming links section with "Find me on" | V8 | 4 | 1 | L | 1 |
| 41 | Confirm the shows "sold out" label is just "Sold out" not "[Artist]'s show is sold out" | V8 | 2 | 1 | L | 3 |
| 42 | Replace "Join [Artist]'s fan list" with "Get on my list" | V8 | 4 | 1 | L | 1 |
| 43 | Confirm the fan-capture-2 secondary module heading matches the fan-capture primary heading in voice — if primary is first-person, secondary must also be | V8 | 4 | 1 | L | 2 |
| 44 | Confirm all default snap card body copy templates use "I" not the artist name — e.g. "I'm working on something." not "[Artist] is working on something." | V8 | 4 | 2 | L | 2 |
| 45 | Replace "Listen to the latest from [Artist]" with "Latest" or "My latest" | V8 | 4 | 1 | L | 1 |
| 46 | Confirm the streaming platform pill labels use "Spotify" not "Listen on Spotify to [Artist]'s music" | V8 | 2 | 1 | L | 3 |
| 47 | Replace the booking or contact section heading "Book [Artist]" with "Get in touch" if applicable | V8 | 3 | 1 | L | 2 |
| 48 | Confirm the freelancer credit attribution on the release card reads "Mixed by [Name]" not "[Artist]'s track mixed by [Name]" | V8 | 3 | 1 | L | 3 |
| 49 | Confirm the support pack label default is "Support my work" not "Support [Artist]'s work" | V8 | 4 | 1 | L | 1 |
| 50 | Confirm the "Unsubscribe" link text in fan confirmation email is not "Unsubscribe from [Artist]'s list" but simply "Leave the list" | ALL | 3 | 1 | L | 2 |
| 51 | Audit all admin.html nudge copy for accidental third-person references to the artist and replace each with second-person ("your page", "your fans") | ADM | 3 | 2 | L | 2 |
| 52 | Confirm the admin show-builder sheet confirms a show was added with "Show added." not "[Artist]'s show was saved." | ADM | 2 | 1 | L | 3 |
| 53 | Confirm all default release card placeholders in admin use "My [release type]" not "[Artist]'s [release type]" | ADM | 3 | 1 | L | 2 |
| 54 | Confirm the snap card preview in admin shows first-person placeholder copy so artists understand the voice before they write | ADM | 3 | 1 | L | 2 |
| 55 | Replace "Artist profile" as the admin page title shown in the tab or header with the artist's name dynamically | ADM | 3 | 1 | L | 2 |
| 56 | Confirm the landing.html feature descriptions that describe what the profile looks like use first-person example copy in screenshots or illustrations | LND | 3 | 2 | M | 3 |
| 57 | Confirm the start.html mini preview card uses first-person copy in the demo bio and CTA fields | STR | 4 | 1 | L | 2 |
| 58 | Confirm start.html step 1 framing is addressed to the artist in second person ("you") or first person ("your page") not as an instruction about the artist | STR | 3 | 1 | L | 2 |
| 59 | Confirm start.html vibe selection labels do not add third-person description such as "[Artist] sounds like X" | STR | 3 | 1 | L | 2 |
| 60 | Confirm the onboarding preview shows the artist their page as it will look to a fan, with first-person copy correctly rendered | STR | 4 | 2 | M | 2 |
| 61 | Confirm no error message on V8 addresses the fan in third person ("The artist's page failed to load") — use "This page couldn't load right now." | V8 | 3 | 1 | L | 2 |
| 62 | Replace any V8 loading state copy that says "[Artist] is loading" with a neutral loading indicator or "One moment." | V8 | 3 | 1 | L | 2 |
| 63 | Confirm the gig-state "I'm playing tonight." fan capture heading is visually distinct from the hero, so fans do not conflate the hero "On tonight" label and the capture heading | V8 | 3 | 2 | M | 3 |
| 64 | Confirm no V8 tooltip references the artist in third person — tooltips should either be absent from fan-facing surfaces or be written in first person | V8 | 2 | 1 | L | 3 |
| 65 | Confirm the support section renders the artist's custom label if set, and the first-person default "Support me" if not — never generates a third-person label automatically | V8 | 4 | 1 | L | 2 |
| 66 | Replace any "Buy tickets to see [Artist]" event CTA with "Get tickets" | V8 | 4 | 1 | L | 1 |
| 67 | Confirm the "free show" or "no tickets needed" label on events reads as "Free entry" not "[Artist]'s show is free" | V8 | 2 | 1 | L | 3 |
| 68 | Confirm the recommendations section heading is "Artists I rate" or "People you should hear" — never "[Artist] recommends" in third person | V8 | 3 | 1 | L | 2 |
| 69 | Confirm the credits section heading on the freelancer profile is a first-person artist statement such as "I worked on" not "Works featuring [Freelancer]" | V8 | 3 | 1 | L | 3 |
| 70 | Replace the portfolio section heading "Portfolio of [Freelancer Name]" with "My work" | V8 | 3 | 1 | L | 2 |
| 71 | Confirm the rate card section is headed "What I charge" or "My rates" not "[Freelancer]'s rates" | V8 | 3 | 1 | L | 2 |
| 72 | Confirm the booking enquiry form heading reads "Get in touch" or "Book me" not "Book [Freelancer Name]" | V8 | 3 | 1 | L | 2 |
| 73 | Confirm all artist-facing admin copy uses second person ("your fans", "your page") so there is no confusion between how the admin speaks to the artist and how the profile speaks to fans | ADM | 3 | 2 | L | 2 |
| 74 | Audit the landing page feature mockup screenshots for any visible third-person copy strings that would contradict the first-person design spec | LND | 3 | 2 | M | 3 |
| 75 | Confirm the fan.html artist card heading uses the artist name only — not "Artist: [Name]" or "Profile: [Name]" | ALL | 2 | 1 | L | 3 |
| 76 | Replace "Powered by ABLE" footer attribution on V8 with nothing, or with a subtle "Made with ABLE" | V8 | 2 | 1 | L | 4 |
| 77 | Confirm the "ABLE" branding anywhere on V8 does not use copy that speaks about the artist from a third-person platform perspective | V8 | 3 | 1 | L | 2 |
| 78 | Confirm the fan capture email field placeholder "your@email.com" is lowercase and not "[Artist]'s list — email" | V8 | 4 | 1 | L | 2 |
| 79 | Confirm snap card timestamp label does not include "[Artist] posted on [date]" — just the date or relative time | V8 | 3 | 1 | L | 2 |
| 80 | Confirm snap card link label reads "Read more" not "Read more about [Artist]" | V8 | 2 | 1 | L | 3 |
| 81 | Confirm the event "past show" label reads "Past" not "[Artist] played this show" | V8 | 2 | 1 | L | 3 |
| 82 | Replace any "Merch designed by [Artist]" caption with the item title only | V8 | 2 | 1 | L | 3 |
| 83 | Confirm the near-future show heading "Remind me." is shown as an artist invitation — add a tooltip for fan context if needed | V8 | 2 | 2 | L | 4 |
| 84 | Confirm the "out of stock" merch label reads "Out of stock" not "[Artist]'s item is out of stock" | V8 | 2 | 1 | L | 3 |
| 85 | Confirm the platform link aria-label reads "Listen on Spotify" not "Visit [Artist]'s Spotify profile" | V8 | 3 | 1 | L | 2 |
| 86 | Confirm the merch "Buy now" CTA does not include the artist name and reads simply "Buy" or the artist's custom label | V8 | 3 | 1 | L | 2 |
| 87 | Confirm the profile page document title renders as "[Artist Name] — ABLE" not "ABLE — [Artist Name]'s page" | V8 | 2 | 1 | L | 3 |
| 88 | Confirm the release card secondary CTA "Add to playlist" or "Save" does not include the artist name | V8 | 2 | 1 | L | 3 |
| 89 | Confirm the gig "Doors [Time]" label is just the time and does not read "[Artist] opens doors at [Time]" | V8 | 2 | 1 | L | 3 |
| 90 | Confirm the fan capture module is not labeled "Sign up to [Artist]'s list" anywhere in the DOM — including hidden elements read by screen readers | V8 | 4 | 1 | L | 2 |
| 91 | Confirm section aria-labels do not describe sections as belonging to the artist in third person — e.g. use "Music section" not "[Artist]'s music section" | V8 | 3 | 1 | L | 2 |
| 92 | Confirm the image alt text for artist artwork reads "[Release title] artwork" not "[Artist Name]'s artwork for [Release title]" — shorter is better for screen reader flow | V8 | 3 | 1 | L | 2 |
| 93 | Confirm the profile page rendered correctly in the start.html preview uses first-person copy in all populated demo fields | STR | 4 | 2 | M | 2 |
| 94 | Confirm the admin "preview your page" button or link leads to the V8 page without injecting any admin-context third-person copy | ADM | 3 | 1 | L | 2 |
| 95 | Replace the snap card admin empty-state with a first-person prompt: "Add a note, a link, or a moment. Your fans will see it on your page." | ADM | 3 | 1 | L | 2 |
| 96 | Confirm the landing page feature walkthrough copy that describes the artist profile experience uses first-person example strings | LND | 3 | 2 | M | 3 |
| 97 | Replace any "Created by [Artist]" page attribution in the V8 source with "Page by [Artist]" in the footer — shorter and less platform-claim | V8 | 2 | 1 | L | 4 |
| 98 | Audit all V8 JavaScript-injected strings (innerHTML, textContent) for any third-person references generated at runtime | V8 | 4 | 3 | M | 3 |
| 99 | Confirm the artist recommendations strip on V8 reads "Artists I rate" not "Recommended by [Artist]" | V8 | 3 | 1 | L | 2 |
| 100 | Run a Playwright snapshot of the V8 profile in each campaign state and manually verify zero third-person artist references appear on screen | V8 | 5 | 3 | M | 6 |
