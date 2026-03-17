# ABLE — 500-Step 90-Day Founder Roadmap
**Start date: 2026-03-16 | End date: 2026-06-13**
**Read every morning. Tick every step. This is the operating system for the next 90 days.**

> These are not suggestions. They are the actual ordered actions required to go from solo founder with a prototype to a live product with paying customers and a credible path to £1M ARR. Every step is specific, executable, and sequenced correctly. Do not skip steps to do later ones — the order is load-bearing.

---

## WEEK 1–2: Foundation Sprint
**Objective: Legal entity formed, environment stable, backend write path connected, working production deploy.**
**Dates: 2026-03-16 to 2026-03-29**

### Legal & Business Infrastructure

- [ ] 1. Go to companies house online (https://www.gov.uk/limited-company-formation) — take 25 minutes, register ABLE Music Ltd (or ABLE Labs Ltd if you prefer the broader scope). Cost: £12.
- [ ] 2. Choose SIC code 62012 (Business and domestic software development) as primary.
- [ ] 3. Nominate yourself as sole director.
- [ ] 4. Set registered office (your address is fine for now — can use a virtual address service from week 3 if preferred).
- [ ] 5. Save Companies House authentication code somewhere secure — you will need it for every annual confirmation statement.
- [ ] 6. Open a business bank account. Monzo Business or Starling Business both allow same-day setup with no monthly fee until you need features. Apply immediately after company formation.
- [ ] 7. Note the company registration number — add it to the footer of landing.html and start.html within 48 hours of formation.
- [ ] 8. Register for ICO (Information Commissioner's Office) — https://ico.org.uk/registration. Cost: £40/year. Required before collecting a single fan email address in production. Takes 10 minutes.
- [ ] 9. Write a one-paragraph privacy policy using ICO's template generator. This must be on every page that collects personal data before launch.
- [ ] 10. Write a one-paragraph terms of service. Cover: what ABLE is, that it is a beta, no uptime guarantees, content ownership stays with artists, acceptable use.
- [ ] 11. Add privacy policy page to the repo as a simple HTML file (privacy.html). Link it from the footer of every page.
- [ ] 12. Add terms page to the repo (terms.html). Link it from the footer of every page.
- [ ] 13. Create a Stripe account at stripe.com — use the company email, not personal.
- [ ] 14. Complete Stripe identity verification (requires company details, bank account, government ID scan).
- [ ] 15. Create three Stripe products: ABLE Artist (£9/mo), ABLE Artist Pro (£19/mo), ABLE Label (£49/mo). Do not yet build the payment UI — just create the products so they have stable IDs.
- [ ] 16. Note each Stripe price ID somewhere in the docs. These are load-bearing for future payment integration.
- [ ] 17. Set up a dedicated email address for ABLE: hello@ablemusic.co (or your domain). Do not use a personal Gmail for any outbound artist comms.
- [ ] 18. Set up Google Workspace Business Starter (£5.99/mo) or Zoho Mail (free) for the company email — pick one and commit.
- [ ] 19. Create a separate password manager vault entry for all ABLE credentials: Stripe, Supabase, Companies House, ICO, domain registrar, Netlify.
- [ ] 20. Verify you own the production domain (ablemusic.co or able.fm — check which is live). Add DNS records if not already pointed at Netlify.

### Development Environment

- [ ] 21. Run `git status` — confirm you are on `v2-simplified` branch and nothing is accidentally staged.
- [ ] 22. Create a new branch called `v1-launch` from `v2-simplified`. All launch-blocking work goes here.
- [ ] 23. Verify Supabase project is alive: open https://jgspraqrnjrerzhnnhtb.supabase.co in a browser and confirm the dashboard loads.
- [ ] 24. Check Supabase free tier limits: 500MB database, 1GB storage, 50,000 monthly active users. Confirm this is sufficient for V1.
- [ ] 25. Open Supabase Table Editor. Create `profiles` table with columns: id (uuid, primary key), artist_name (text), bio (text), accent (text), theme (text), state_override (text), release_date (timestamptz), created_at (timestamptz default now()), updated_at (timestamptz).
- [ ] 26. Create `fans` table in Supabase: id (uuid), artist_id (uuid FK → profiles.id), email (text), signed_up_at (timestamptz), source (text), campaign_state (text).
- [ ] 27. Create `clicks` table: id (uuid), artist_id (uuid FK), label (text), type (text), clicked_at (timestamptz), source (text).
- [ ] 28. Create `views` table: id (uuid), artist_id (uuid FK), viewed_at (timestamptz), source (text).
- [ ] 29. Create `shows` table: id (uuid), artist_id (uuid FK), venue (text), date (date), doors_time (time), ticket_url (text), featured (boolean).
- [ ] 30. Enable Row Level Security (RLS) on all five tables in Supabase. This is not optional — without RLS, any user can read or write any row.
- [ ] 31. Write RLS policy for `profiles`: SELECT is public (anyone can read a profile), INSERT/UPDATE/DELETE requires auth.uid() = id.
- [ ] 32. Write RLS policy for `fans`: INSERT is public (fans can sign up without auth), SELECT/UPDATE/DELETE requires auth.uid() matching the artist_id's profile owner.
- [ ] 33. Write RLS policy for `clicks` and `views`: INSERT is public, SELECT requires artist ownership.
- [ ] 34. Write RLS policy for `shows`: full CRUD requires artist ownership.
- [ ] 35. Enable Supabase Auth. Go to Auth → Settings. Enable Email provider. Disable phone.
- [ ] 36. Set Supabase Auth email templates: confirm signup email should say "Welcome to ABLE. Confirm your email to finish setting up your profile." — no generic copy.
- [ ] 37. Add the Supabase JS CDN script tag to the `<head>` of able-v7.html, admin.html, start.html, and landing.html: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`.
- [ ] 38. Create `shared/supabase.js` — a single file that initialises the Supabase client with the project URL and anon key. Import this in every HTML file rather than duplicating the init code.
- [ ] 39. In `shared/supabase.js`, write a `getArtistProfile(artistSlug)` function that queries `profiles` by a slug field. Add `slug` column to the `profiles` table if not already present.
- [ ] 40. Write a `saveProfile(profileData)` function in `shared/supabase.js` that upserts to the `profiles` table. This replaces the localStorage write in admin.html.

### Supabase Auth Integration

- [ ] 41. In start.html, replace the "Done" button handler with a Supabase magic link sign-up call: `supabase.auth.signInWithOtp({ email })`. The artist signs up via their email — no password.
- [ ] 42. Add a loading state to the start.html done button: spinner while the magic link email sends, then "Check your inbox" state.
- [ ] 43. Create a `confirm.html` page — this is where Supabase redirects after the artist clicks the magic link. It reads the session from the URL hash, stores it, and redirects to admin.html.
- [ ] 44. In admin.html, on page load, check `supabase.auth.getSession()`. If no session, redirect to start.html.
- [ ] 45. In admin.html, read the artist's profile from Supabase using the authenticated user's ID. Fall back to localStorage only if Supabase read fails.
- [ ] 46. In admin.html, write profile saves to Supabase as the primary destination. Mirror to localStorage as a resilience layer.
- [ ] 47. Add a sign-out button in admin.html header (small, unobtrusive — not a primary action). Calls `supabase.auth.signOut()`, clears localStorage, redirects to start.html.
- [ ] 48. Test the full auth flow end-to-end: start.html → magic link email → confirm.html → admin.html → profile saved to Supabase. Verify the profile row appears in the Supabase dashboard.
- [ ] 49. In able-v7.html, read the artist profile from Supabase by slug (URL parameter: `?artist=slug`). This means each artist's page is unique by URL, not by localStorage.
- [ ] 50. Handle the case where `?artist=` param is missing in able-v7.html: show a "Profile not found" state with a link back to ablemusic.co rather than a blank page.

### Fan Capture Write Path

- [ ] 51. In able-v7.html fan sign-up form, write the submission to `supabase.from('fans').insert(...)` using the artist's ID from the loaded profile.
- [ ] 52. Include `campaign_state` in the fan insert row — capture what state the profile was in when the fan signed up (pre-release, live, gig, profile). This is P0 CRM data.
- [ ] 53. Write `source` to the fans row — read from the `?utm_source` URL parameter if present, else 'direct'.
- [ ] 54. On fan sign-up success, write to `supabase.from('clicks').insert(...)` as a synthetic "fan-signed-up" click event for analytics.
- [ ] 55. Test fan sign-up: land on able-v7.html?artist=testslug, enter email, submit. Verify row appears in Supabase fans table with correct artist_id, campaign_state, and source.

### Production Deploy

- [ ] 56. Verify Netlify is connected to the correct GitHub branch for production deploys.
- [ ] 57. Set Netlify environment variables: SUPABASE_URL and SUPABASE_ANON_KEY. (Even though these are currently hard-coded in the JS, start the habit now — you will move to env vars before launch.)
- [ ] 58. Set the Supabase redirect URL in Auth settings to your production domain (e.g., https://ablemusic.co/confirm).
- [ ] 59. Deploy the `v1-launch` branch to a Netlify preview URL (not production yet). Verify the preview URL loads without errors.
- [ ] 60. Open the Playwright MCP and run a basic smoke test against the preview URL: navigate to landing page, verify H1 is visible, no console errors.

### Copy & Legal Compliance

- [ ] 61. Add a cookie banner to landing.html, start.html, able-v7.html, and admin.html. This does not need to be elaborate — a one-line bar with "We use cookies for authentication and analytics. [OK]" is sufficient for MVP.
- [ ] 62. Add the ICO registration number to the privacy policy page once registration is confirmed.
- [ ] 63. Add the Companies House registration number and registered address to the footer of landing.html.
- [ ] 64. Add a GDPR-compliant consent checkbox to the fan sign-up form on able-v7.html: "I agree to receive updates from [Artist Name]. ABLE's privacy policy applies." The checkbox must be unchecked by default.
- [ ] 65. Ensure the fan sign-up form cannot submit without the checkbox checked. Add client-side validation.
- [ ] 66. Write the welcome email copy for the fan confirmation sequence (the email that goes out when a fan signs up). Keep it in the artist's voice, not ABLE's: "[Artist Name] has your email. When something real happens, you'll hear first." Store this copy in docs/systems/email/SPEC.md for later automation.
- [ ] 67. Write the artist welcome email copy for after the magic link confirmation: "You're in. Your profile is live. Here's your link: [URL]. Share it when you're ready." No exclamation marks.
- [ ] 68. Review every piece of copy in start.html against the VOICE-BIBLE.md banned phrases list. Fix any violations.
- [ ] 69. Review every piece of copy in admin.html against the VOICE-BIBLE.md banned phrases list. Fix any violations.
- [ ] 70. Review the landing.html hero section copy. Confirm it does not say "grow your audience", "monetise your fanbase", or any variant. If it does, fix it.

### Health Protocol — Week 1 Baseline

- [ ] 71. Book a physiotherapy appointment for C5/C6 assessment if one is not already scheduled. This is not optional. Calendar block it.
- [ ] 72. Set a daily screen limit: no computer after 10pm during the 90-day sprint. Protect sleep — sleep is cognitive performance.
- [ ] 73. Set two focus blocks per day: 07:00–09:00 (before work) and 20:00–22:00 (evening). Mark these as immovable in your calendar.
- [ ] 74. Set up a standing/walking desk arrangement or standing reminder for every 45 minutes if you do not already have one. Non-negotiable for C5/C6.
- [ ] 75. Write down your 3 most important ABLE tasks for the coming week every Sunday evening. Do not start Monday without this list.

---

## WEEK 3–4: V1 Complete
**Objective: All P0 bugs fixed, Playwright test suite passing, GDPR in place, profile shareable with a real URL.**
**Dates: 2026-03-30 to 2026-04-12**

### Bug Fix: Known P0 Issues

- [ ] 76. Fix SEO / OG cards — 2 critical bugs noted in STATUS.md. Open able-v7.html, check `<meta property="og:image">` is populated from the profile data. Fix if missing.
- [ ] 77. Fix `<meta property="og:title">` to use artist name from profile, not a hardcoded string.
- [ ] 78. Fix `<meta property="og:description">` to use artist bio from profile, truncated at 160 characters.
- [ ] 79. Verify Twitter/X card tags are also populated: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
- [ ] 80. Test OG card rendering by pasting a live URL into https://cards-dev.twitter.com/validator and https://developers.facebook.com/tools/debug/. Both should show the artist name and artwork.
- [ ] 81. Fix the two hardcoded `#888` colour values in admin.html (lines ~44 and ~1288 per STATUS.md). These should reference design tokens.
- [ ] 82. Verify all 4 themes (Dark, Light, Contrast, Glass) render correctly in able-v7.html after the token fix. Spot-check each theme for obvious visual breaks.
- [ ] 83. Fix copy violations in admin.html: the 8 "dashboard" violations noted in STATUS.md. Replace with contextually correct language per VOICE-BIBLE.md.
- [ ] 84. Fix toast inconsistency noted in STATUS.md copy audit. All success toasts should use the same pattern.
- [ ] 85. Fix the live data architecture bug noted in STATUS.md. Read `docs/systems/data-architecture/SPEC.md` for the specific issue and fix it.
- [ ] 86. Verify the CTA dedupe rule: open able-v7.html with a profile that has a streaming link in the Hero zone. Confirm it does not also appear in Quick Actions or any section.
- [ ] 87. Verify max CTA counts: Hero zone ≤ 2, Quick Actions ≤ 4 (narrow) / 6 (wide). Add validation logic in able-v7.html that silently drops extras rather than rendering them.
- [ ] 88. Test iframe containment at 375px viewport width. Open Chrome DevTools, set to 375px, scroll through able-v7.html. No horizontal overflow permitted.
- [ ] 89. Test iframe containment at 375px for admin.html. Same rule.
- [ ] 90. Test start.html at 375px. All 3 wizard steps must be fully visible without horizontal scroll.

### Playwright Test Suite

- [ ] 91. Create `tests/smoke.js` (or `tests/smoke.spec.js` if using Playwright test runner). This file is the canonical smoke test.
- [ ] 92. Write test: navigate to the Netlify preview URL of able-v7.html?artist=testslug. Assert page loads without JS console errors.
- [ ] 93. Write test: verify the fan sign-up form is visible. Fill in email + check consent checkbox. Submit. Assert success state is shown.
- [ ] 94. Write test: verify the hero CTA is visible and has a non-empty href.
- [ ] 95. Write test: navigate to start.html. Complete all 3 steps. Assert the done screen is shown.
- [ ] 96. Write test: navigate to admin.html without a session. Assert redirect to start.html occurs.
- [ ] 97. Write test: navigate to landing.html. Assert H1 is visible. Assert no 404 resources in network requests.
- [ ] 98. Write test: check all 4 theme classes can be applied to able-v7.html by URL param or toggle. Assert no CSS layout breaks.
- [ ] 99. Run all Playwright tests against the preview URL. All must pass before merging to main.
- [ ] 100. Document any flaky tests and why they are flaky. Fix flakiness before launch, not after.

### Profile URL System

- [ ] 101. Finalise the slug format for artist URLs: lowercase, hyphens only, max 30 characters. Example: `ablemusic.co/artists/nina-fox`.
- [ ] 102. Add slug validation to start.html wizard — when the artist enters their name, auto-generate a slug and show them the URL they will get.
- [ ] 103. Allow slug editing in the wizard (edit icon next to the preview URL). Validate uniqueness client-side by checking Supabase.
- [ ] 104. Decide the URL structure: subdomain (nina.ablemusic.co) vs path (/artists/nina). For V1, use the path structure — subdomains require wildcard SSL and DNS complexity you don't need yet.
- [ ] 105. Configure Netlify redirects: any URL matching `/artists/:slug` should serve able-v7.html. This is a `_redirects` file entry: `/artists/* /able-v7.html 200`.
- [ ] 106. Test the redirect: navigate to `ablemusic.co/artists/nina-fox`. Confirm able-v7.html loads and reads the correct profile from Supabase by parsing the slug from `window.location.pathname`.
- [ ] 107. Test a non-existent slug: navigate to `/artists/does-not-exist`. Confirm the 404/not-found state is shown — not a blank page.
- [ ] 108. In admin.html, show the artist's shareable URL prominently: "Your link: ablemusic.co/artists/[slug]" with a copy-to-clipboard button. This is the primary value delivery moment.
- [ ] 109. Add a "View your page" button in admin.html that opens the artist's public URL in a new tab.
- [ ] 110. Verify that the copy-to-clipboard button on the admin header works on both iOS Safari and Chrome Android (clipboard API behaves differently — test both).

### Mobile Polish

- [ ] 111. Test tap target sizes across able-v7.html on a real phone (or iPhone simulator at 375px). All interactive elements must be ≥44px tall.
- [ ] 112. Test tap target sizes on admin.html. Fix any element under 44px.
- [ ] 113. Verify safe area insets are handled: `padding-bottom: env(safe-area-inset-bottom)` on the bottom nav in admin.html for iPhone with home bar.
- [ ] 114. Verify the fan sign-up email input on able-v7.html shows the email keyboard on iOS (input type="email").
- [ ] 115. Verify the fan sign-up form submit button is accessible via keyboard Enter on desktop.
- [ ] 116. Open able-v7.html on a real Android device and scroll through all sections. Note any rendering issues.
- [ ] 117. Open admin.html on a real Android device. Tap through all major interactions. Note any issues.
- [ ] 118. Open start.html on a real phone. Complete the wizard end-to-end on mobile. Note any usability issues.
- [ ] 119. Fix all issues noted in steps 116–118. Prioritise anything that blocks an artist from completing setup.
- [ ] 120. Test the glass theme on a device with a GPU — backdrop-filter requires hardware acceleration and may be slow on older devices. Decide whether to add a `prefers-reduced-motion` or CPU-budget fallback.

### Performance Baseline

- [ ] 121. Run Lighthouse on the Netlify preview URL of able-v7.html. Record scores in docs/systems/analytics/SPEC.md.
- [ ] 122. Run Lighthouse on landing.html. Record scores.
- [ ] 123. Run Lighthouse on start.html. Record scores.
- [ ] 124. Identify the top 3 performance issues from Lighthouse results. Fix any that are trivially addressable (uncompressed images, render-blocking resources).
- [ ] 125. Ensure DM Sans font is loaded with `font-display: swap` to prevent FOUT blocking render.
- [ ] 126. Ensure Barlow Condensed is also loaded with `font-display: swap`.
- [ ] 127. Ensure the Supabase JS CDN is loaded with `defer` attribute — it does not need to block page render.
- [ ] 128. Verify there are no synchronous `<script>` tags in the `<head>` of any HTML file (except inline critical CSS).
- [ ] 129. Add `rel="preconnect"` to the Google Fonts CDN request in each HTML file header.
- [ ] 130. Set a target: able-v7.html Lighthouse Performance score ≥ 80 before artist #1 signs up.

### GDPR Completion

- [ ] 131. Add a "Request data deletion" link to admin.html footer. This can currently go to mailto:hello@ablemusic.co with subject "Data deletion request" — Supabase row deletion can be automated later.
- [ ] 132. Add a "Download my data" link to admin.html footer — same mailto pattern for now.
- [ ] 133. Add "Unsubscribe" handling to the fan sign-up confirmation email copy. Even if emails are not yet automated, document how a fan would unsubscribe when the email system is built.
- [ ] 134. Verify the GDPR consent checkbox on the fan sign-up form is not pre-checked under any circumstances — check in all 4 profile states (profile, pre-release, live, gig).
- [ ] 135. Write a data retention policy (one paragraph) and add it to privacy.html: fan emails are retained until the artist deletes them or the artist closes their account.

### Analytics Instrumentation

- [ ] 136. Add click tracking to every CTA in able-v7.html — write to `supabase.from('clicks').insert(...)` on every CTA tap.
- [ ] 137. Add page view tracking to able-v7.html — write to `supabase.from('views').insert(...)` on page load, with the artist_id, timestamp, and utm_source.
- [ ] 138. Add Fathom Analytics or Plausible Analytics to landing.html (privacy-preserving, no GDPR consent required). Cost: £9/mo for Fathom. This is worth paying.
- [ ] 139. Add the same Fathom/Plausible snippet to able-v7.html (use the same site ID).
- [ ] 140. Verify that analytics events fire correctly by checking the Supabase dashboard after a test page visit.
- [ ] 141. In admin.html, build a simple analytics read: query the `views` table for the current artist and display total views in the last 7 days.
- [ ] 142. Query the `fans` table for total fan count and display it in admin.html.
- [ ] 143. Query the `clicks` table grouped by label and display a simple breakdown in admin.html — what are people tapping?
- [ ] 144. Add a "last updated" timestamp to the admin analytics section so the artist knows when data was last refreshed.
- [ ] 145. Test the admin analytics section with seeded data: manually insert 5 view rows and 2 fan rows for a test artist_id. Confirm the counts display correctly.

### Final V1 Checklist

- [ ] 146. Merge `v1-launch` branch into `main` after all Playwright tests pass. Tag the commit: `git tag v1.0.0`.
- [ ] 147. Deploy v1.0.0 to production (Netlify production deploy, not preview).
- [ ] 148. Verify the production URL loads correctly and is served over HTTPS.
- [ ] 149. Verify the Supabase redirect URL is correct for the production domain.
- [ ] 150. Send a test magic link to yourself. Complete the full flow on your phone. Artist profile live at ablemusic.co/artists/[your-slug]. Share the link. Confirm it renders correctly.

---

## WEEK 5–6: First 10 Artists
**Objective: 10 real artists with live profiles, at least 3 with fans captured, first feedback loop running.**
**Dates: 2026-04-13 to 2026-04-26**

### Artist #1–3: Personal Network (Warm)

- [ ] 151. Write a list of every artist you know personally or semi-personally. Include anyone who is actively releasing music, has 500+ Instagram followers, and has sent a link in bio at any point. Aim for 20 names.
- [ ] 152. Rank the list: who would benefit most from ABLE right now? Filter to artists who have a release coming up or are actively playing shows — these are the highest-value V1 users.
- [ ] 153. DM artist #1 (personal message, not copy-paste): "I've been building something I think could actually be useful for you. It's a better version of your link-in-bio — it knows what you're doing right now, not just what links you have. Can I show you?" This is not a pitch. It is a question.
- [ ] 154. DM artist #2 with the same approach, personalised with a specific reference to their current campaign (a release they have coming, a show they have announced).
- [ ] 155. DM artist #3. Same approach.
- [ ] 156. Follow up within 48 hours if no response. Keep it to one follow-up — do not be the person who sends four messages.
- [ ] 157. For each artist who responds, do a live setup call (30 minutes via Facetime / Zoom / in person). You walk them through start.html, they see their page live. This is onboarding, not a demo. The goal is a live profile, not a signed agreement.
- [ ] 158. After each setup call, stay on the call while the artist copies their new ABLE link and updates their Instagram bio. This single action is the activation event. Do not let the call end without it.
- [ ] 159. After each live setup, send a follow-up message: "Your page is live. Anyone who taps your bio link will see [Artist Name] exactly how you want them to. Let me know when you get your first sign-up." This creates a shared milestone.
- [ ] 160. Create a simple Notion page (or a text file) as your Artist CRM for V1: name, signup date, profile URL, Instagram handle, current fans captured, last contact date. Update it weekly.

### Artist #4–7: Extended Network (Warm + Warm-ish)

- [ ] 161. Identify 10 more artists via Instagram: search hashtags relevant to UK independent music (#indieuk, #ukindieartist, #independentmusic). Look for artists with 1k–20k followers — small enough to care, big enough to have real fans.
- [ ] 162. Before DMing, spend 2 minutes on each artist's profile. Find one specific, real thing to reference. This is not optional — generic outreach has near-zero conversion.
- [ ] 163. DM artist #4: reference something specific about their music or their current situation. Ask if they would be interested in trying an early version of ABLE.
- [ ] 164. DM artist #5. Same. Personalised.
- [ ] 165. DM artist #6. Same. Personalised.
- [ ] 166. DM artist #7. Same. Personalised.
- [ ] 167. Do not DM more than 6–8 artists per day on Instagram — the platform rate-limits outreach and will reduce your message delivery.
- [ ] 168. For each interested response, schedule a setup call within 48 hours. Momentum dies if you schedule calls for 2 weeks out.
- [ ] 169. During each setup call for artists 4–7, observe their experience of start.html without guiding them. Where do they hesitate? What do they ask? Write down every friction point.
- [ ] 170. After 4 setup calls, review the friction notes. Fix the top 2–3 most common friction points in start.html before onboarding artists 8–10.

### Artist #8–10: Feedback-Informed Onboarding

- [ ] 171. Apply the start.html friction fixes from step 170 before artist #8.
- [ ] 172. Onboard artist #8. Note new friction points.
- [ ] 173. Onboard artist #9. Note new friction points.
- [ ] 174. Onboard artist #10. Note new friction points.
- [ ] 175. After 10 artists, compile all friction notes into a single document: `docs/systems/artist-success/ONBOARDING-FRICTION.md`. This becomes the V1.1 feature backlog.

### First Feedback Loop

- [ ] 176. After each artist has had their profile live for 5+ days, send them a short DM: "Anything not working the way you expected? Anything you wish it did differently?" This is not a survey — it is a conversation.
- [ ] 177. Compile all qualitative feedback into a single thread in your Artist CRM (Notion or text file). Tag each piece of feedback as: Bug, Friction, Missing Feature, or Delight.
- [ ] 178. Share back what you are fixing with each artist: "Based on what you told me, I've changed [X]." This closes the feedback loop and builds loyalty.
- [ ] 179. Identify the single most-requested missing feature across the 10 artists. Add it to the V1.1 backlog with a priority score.
- [ ] 180. Ask at least 3 of the 10 artists if they would be willing to give you a short written testimonial. Frame it: "One or two sentences about what changed when you had a better link in your bio." This is social proof that lands on the landing page.

### Artist Success Infrastructure

- [ ] 181. Write a welcome email sequence for new artists (3 emails, 3 days apart). Email 1: "You're set up. Here's your link." Email 2: "How to tell if it's working (your first 5 fans)." Email 3: "Three things artists do in the first week to get fans signing up." Store in docs/systems/email/SPEC.md.
- [ ] 182. Build a basic email trigger: when a new row is inserted into the `profiles` table, send email 1 from the welcome sequence. Use Resend (resend.com) — it has a free tier and excellent API. This does not require a complex automation system.
- [ ] 183. Set up a Resend account. Add the domain verification DNS records. This will take 24–48 hours to propagate.
- [ ] 184. Write the Resend API call in a Netlify serverless function (`functions/send-welcome.js`). Keep it simple: POST to `/api/send-welcome` with `{ artistEmail, artistName, profileUrl }`.
- [ ] 185. Test the welcome email: trigger it with your own email. Confirm it arrives, looks correct, and the link works.
- [ ] 186. Add the welcome email trigger to the auth flow: after the artist confirms their magic link and their profile is created in Supabase, call `/api/send-welcome`.
- [ ] 187. Create a simple status page for artists: a single paragraph on ablemusic.co/status saying "ABLE is in early access. Some features are still being built. If something isn't working, email hello@ablemusic.co." This sets expectations correctly.
- [ ] 188. Set up a shared Gmail or a Notion inbox aggregator for all support emails — you will get them from the first week. Do not let them pile up unanswered for more than 24 hours.
- [ ] 189. Write a 5-question feedback form (Tally or Typeform, both free) to send after 2 weeks of usage. Keep it short: what do you use most, what's missing, would you pay £9/mo for this, why/why not. This is how you calibrate willingness to pay.
- [ ] 190. Add the 2-week feedback form link to email 3 of the welcome sequence.

### Social Media Presence — Artist-Facing

- [ ] 191. Set up an Instagram account for ABLE: @able.fm or @ablemusic. Set the bio to something honest: "A better link in bio for independent artists. Early access." No emojis, no marketing speak.
- [ ] 192. Post a single "we exist" post: a screenshot or screen recording of an artist profile (with permission). Caption: "We built this for artists who are serious about what they're doing. [profile link]."
- [ ] 193. Follow every artist on your platform. Comment genuinely on their posts (not "great track!" — something specific and real).
- [ ] 194. Set up a TikTok account for ABLE. Do not pressure yourself to post — just claim the handle before someone else does.
- [ ] 195. Post one behind-the-scenes reel of the build: "Building a better link in bio for independent artists. Here's how it works." 60 seconds. No script — just show the product. This is not marketing; it is transparency.

---

## WEEK 7–8: Fan Flywheel
**Objective: 100 total fans captured across all artist pages, first email sequence sent, flywheel beginning to run.**
**Dates: 2026-04-27 to 2026-05-10**

### Flywheel Mechanics

- [ ] 196. Review all 10 artist profiles in admin.html. Identify which artists have enabled fan capture and which have not. For those who have not, DM them to check the setting.
- [ ] 197. Verify the fan sign-up form is correctly wired in all 10 profiles. Open each profile URL and attempt to sign up with a test email. Confirm the row appears in Supabase.
- [ ] 198. Check the source field on every fan sign-up row in Supabase. If source is null for any rows, fix the UTM capture logic in able-v7.html.
- [ ] 199. Check the campaign_state field on every fan sign-up row. If null, fix the state-capture logic.
- [ ] 200. Send a check-in DM to each of the 10 artists: "How many sign-ups have you got so far? Anything stopping people from signing up?" The goal is to understand if artists are actively promoting their link.

### Artist Activation — Getting Artists to Promote

- [ ] 201. The most common reason artists have zero fans is that they updated their link once and forgot about it. Write a short tips thread to send to all 10 artists: 3 things they can do to get their first 10 fans this week.
- [ ] 202. Tip 1 (send to all artists): Add your ABLE link to your Instagram Stories with a sticker link. Stories have 3–4x more reach than posts for direct links.
- [ ] 203. Tip 2: Post a specific reason for people to sign up right now — e.g., "I'm dropping something in 3 weeks. Sign up to hear it first." The call to action needs a reason.
- [ ] 204. Tip 3: Reply to the first 5 people who sign up manually (find them in your admin, recognise their email if possible). Thank them personally. This turns a transaction into a relationship.
- [ ] 205. Build a leaderboard view in admin.html for your own internal use (not public-facing): a simple query to see total fans per artist, sorted descending. This tells you which artists are driving the most activation. Use this to understand who your best performers are.

### Email Delivery — First Sequence

- [ ] 206. Confirm the Resend domain is verified and emails are delivering to major providers (Gmail, Outlook) without going to spam.
- [ ] 207. Test email delivery to a Gmail address, a Hotmail/Outlook address, and an Apple Mail address. All three should land in inbox, not spam.
- [ ] 208. Check email rendering in Gmail app on Android. Confirm it looks correct and the CTA button is tappable.
- [ ] 209. Check email rendering on iPhone Mail. Confirm it looks correct.
- [ ] 210. If any emails are going to spam, check the email headers: confirm SPF, DKIM, and DMARC records are set correctly for your sending domain.
- [ ] 211. Build the artist-to-fan email trigger: in admin.html, add a "Send update to fans" button (behind a Pro tier gate for now — this is a teaser, not functional). Clicking it shows a modal with: "This feature is coming to Artist Pro. £19/month includes direct email to your fans." This plants the seed for the upgrade.
- [ ] 212. Write a "fan milestone" email that goes from ABLE to the artist (not to fans) when they hit 10 fans. Content: "[Name], you just hit 10 fans on ABLE. Here's who they are. Keep going." Trigger this from a Supabase webhook or scheduled function.
- [ ] 213. Write the same milestone email for 25 fans, 50 fans, and 100 fans.
- [ ] 214. Build a simple Netlify function `functions/fan-milestone.js` that can send these milestone emails. Trigger it via a Supabase database webhook (Supabase → Webhooks → trigger on fans INSERT, call the function with the artist_id).
- [ ] 215. Test the milestone trigger: insert a fan row in Supabase that brings a test artist to exactly 10 fans. Confirm the milestone email arrives.

### 100-Fan Target

- [ ] 216. Check total fan count across all artists. If below 25 at this point, the activation rate is too low — artists are not promoting their links.
- [ ] 217. Identify the top 2 artists by fan count. DM them: "You're leading the early group on fans. What have you been doing to get sign-ups?" Capture their answer — it becomes a case study.
- [ ] 218. Identify the 2 artists with zero or near-zero fans. DM them: "Has your link been in your Instagram bio? If not, let's fix that now." Offer to hop on a 15-minute call to help them promote it.
- [ ] 219. Run a simple experiment: ask one artist to post an Instagram Story with their ABLE link and "I'm dropping a new track soon, sign up to hear it first." Track whether their fan count increases in the 24 hours following.
- [ ] 220. Track the result of step 219 in your Artist CRM. If the Story drove 5+ sign-ups for that artist, document this as the primary activation mechanic and share it with all other artists.
- [ ] 221. If total fans across all artists hits 50, this is the first real milestone. Acknowledge it internally. Write it in your weekly review.
- [ ] 222. If total fans hits 100, this is V1 validation. Document the date. Screenshot the Supabase dashboard. This is investor evidence.

### Product Iteration — V1.1

- [ ] 223. Review the onboarding friction notes from weeks 5–6. Pick the top 3 friction items to fix in this sprint.
- [ ] 224. Fix friction item #1 in start.html.
- [ ] 225. Fix friction item #2 in start.html or admin.html.
- [ ] 226. Fix friction item #3.
- [ ] 227. Re-run Playwright smoke tests after each fix. All must pass.
- [ ] 228. Review the "Missing Features" tags in your artist feedback. Identify if any are quick wins (under 2 hours to build). Build the top one.
- [ ] 229. If the most-requested feature is the email broadcast to fans: spec it in detail before building it. Read docs/systems/email/SPEC.md, add the broadcast feature spec, then build a V1 of it.
- [ ] 230. If the most-requested feature is something else: follow the same spec-then-build discipline. Do not hack features in — spec them first, even a one-paragraph spec.

### Shows Integration

- [ ] 231. Verify that the shows system (able_shows localStorage + Supabase shows table) is fully wired between admin.html and able-v7.html.
- [ ] 232. Verify that shows display correctly in able-v7.html when the profile is in `gig` state.
- [ ] 233. Test adding a show via admin.html. Confirm it appears immediately in able-v7.html.
- [ ] 234. Test the Ticketmaster integration if built. If not yet built, add it to the V1.1 backlog with high priority — manually adding shows is a friction point for active artists.
- [ ] 235. Add a "Feature this show" toggle in admin.html to mark one show as the primary promoted event. This should surface that show in the hero area in gig mode.

---

## WEEK 9–10: Social Proof + Monetisation Unlock
**Objective: First 3 paying artists, testimonials on landing page, pricing page live.**
**Dates: 2026-05-11 to 2026-05-24**

### Social Proof Gathering

- [ ] 236. Follow up with the 3 artists you asked for testimonials in week 5–6. If they have not responded, send a nudge with a specific prompt: "Two sentences about what it was like before ABLE vs after." Make it easy.
- [ ] 237. For any artists who have captured 10+ fans, ask for a case study quote: "I got X fans in my first week. Before this, I didn't even know how many people tapped my bio link."
- [ ] 238. Take a screenshot of the Supabase fans table showing real data (redact the email addresses). This is raw social proof for investor conversations.
- [ ] 239. Write a case study paragraph for the most active artist on your platform. Format: problem → solution → result. Keep it under 100 words.
- [ ] 240. Add the testimonials to landing.html. Place them in the section below the hero. Real names, real photos if they consent. No initials and fake avatars.
- [ ] 241. Add the case study paragraph to landing.html or a separate `/case-study` page.
- [ ] 242. Take screenshots of real artist profiles (with permission) and add them to landing.html as product previews. Real > mockups always.
- [ ] 243. Post an artist testimonial on the ABLE Instagram: screenshot the quote, credit the artist, tag them. This is mutually beneficial — they get visibility, you get credibility.
- [ ] 244. Add a "Trusted by [N] independent artists" counter to landing.html once N ≥ 10. Keep it accurate — do not inflate it.
- [ ] 245. Ask one artist if they would record a 30-second video testimonial. An authentic, slightly rough video testimonial converts better than polished copy.

### Monetisation: Stripe Payment Integration

- [ ] 246. Review the Stripe product and price IDs created in week 1 (step 15–16). Confirm they are still correct.
- [ ] 247. Build the upgrade flow: in admin.html, clicking any Pro-gated feature should trigger a modal showing what the upgrade includes and a "Upgrade — £9/month" button.
- [ ] 248. The "Upgrade" button calls Stripe Checkout: create a Netlify function `functions/create-checkout.js` that creates a Stripe Checkout session and returns the URL. Redirect the user to the Stripe-hosted checkout page.
- [ ] 249. Pass the artist's email and Supabase user ID as metadata in the Stripe Checkout session. This is how you link a Stripe payment to a Supabase profile.
- [ ] 250. Create a Stripe webhook endpoint: Netlify function `functions/stripe-webhook.js`. Listen for `checkout.session.completed` event. When received, update the artist's `profiles.tier` column in Supabase to 'artist'.
- [ ] 251. Add `tier` column to the `profiles` table in Supabase: enum or text field, values: 'free', 'artist', 'pro', 'label'. Default: 'free'.
- [ ] 252. Verify the webhook by using Stripe's test mode and the Stripe CLI (`stripe listen --forward-to localhost:8888/functions/stripe-webhook`).
- [ ] 253. Test the full payment flow: upgrade to Artist tier, complete test payment (card: 4242 4242 4242 4242), confirm `profiles.tier` updates to 'artist' in Supabase.
- [ ] 254. Test the free → artist tier gate: before payment, confirm Pro features show the locked state. After payment, confirm they unlock.
- [ ] 255. Handle payment failure: if the Stripe Checkout is abandoned, no tier change should occur. Test this: start checkout, hit back button. Confirm tier remains 'free'.
- [ ] 256. Handle subscription cancellation: create a `customer.subscription.deleted` webhook handler that reverts the artist's tier to 'free'.
- [ ] 257. Handle failed payment (card declined): create a `invoice.payment_failed` handler that sends an email to the artist: "Your ABLE subscription payment failed. Update your payment details: [Stripe billing portal URL]."
- [ ] 258. Add a "Manage subscription" link in admin.html that opens the Stripe Customer Portal. This allows artists to update payment details, download invoices, or cancel.
- [ ] 259. Test the Stripe Customer Portal redirect. Confirm it loads correctly and shows the artist's subscription details.
- [ ] 260. Verify that Stripe subscription data is stored correctly: each artist's `stripe_customer_id` and `stripe_subscription_id` should be stored in the `profiles` table for reference.

### First Paying Artists

- [ ] 261. Identify the 3 artists most likely to pay based on engagement: most fans captured, most profile views, most admin logins.
- [ ] 262. DM artist #1 of the three: "I'm opening up the paid tier this week. It includes [specific feature they have mentioned wanting]. £9/month. Would you want to be one of the first?" Personal, not broadcast.
- [ ] 263. DM artist #2 of the three with the same personalised approach.
- [ ] 264. DM artist #3.
- [ ] 265. For each artist who converts to paid: send them a personal thank-you message. Not automated. Not a template. One sentence from you, directly.
- [ ] 266. Record the first payment amount and date. This is your MRR Day 1. Write it down. It matters more than the amount.
- [ ] 267. If zero of the three convert despite the ask, that is signal. Do not panic — do a post-mortem. Were they using the product actively? Did the feature gap cause the hesitation? Was the price the objection? Record the actual objection verbatim.
- [ ] 268. Send the 2-week feedback form (from step 189) to any artists who have not yet completed it. Include a specific ask: "If you were going to pay for this, what would have to be true?"
- [ ] 269. Analyse the "willingness to pay" responses. This is pricing signal. If multiple artists say "I'd pay for X but not for Y", that tells you which feature gates to prioritise.
- [ ] 270. Set MRR milestone: the first £27 in MRR (3 paying artists at £9/mo) is the proof of concept for monetisation. It is not financial freedom. It is signal that the model works.

### Pricing Page

- [ ] 271. Build a `/pricing` page on landing.html or as pricing.html. Three columns: Free, Artist (£9/mo), Artist Pro (£19/mo). Label tier can be "Contact us" for now.
- [ ] 272. For each tier, list the 5 most important features included, not all features. People skim pricing pages — lead with what matters.
- [ ] 273. Mark the Artist tier as "Most popular" — this is a conversion anchor even before you have data to support it.
- [ ] 274. Include a FAQ section at the bottom of the pricing page: "Can I switch plans?", "What happens to my fans if I cancel?", "Is there a free trial?". Answer these honestly.
- [ ] 275. Link the pricing page from landing.html navigation. Add it to the footer of every page.

### Brand Identity

- [ ] 276. Review the current logo assets. Do you have a logo that works at 16x16 (favicon), 512x512 (app icon), and as an SVG wordmark?
- [ ] 277. If the logo is not complete: define a 48-hour brief. The brief is: a wordmark in Barlow Condensed, the word "ABLE" with a subtle modification that signals music without being literal. Hire a freelancer on Fiverr or Contra for £50–£100, or design it yourself if you have the taste for it.
- [ ] 278. Add the favicon (16x16 .ico or .png) to all HTML files.
- [ ] 279. Add the 512x512 app icon to the PWA manifest when you build it in week 11.
- [ ] 280. Create a simple brand kit document (internal only): logo, colours, fonts, don'ts. This takes 2 hours and prevents drift when you start creating social assets.

---

## WEEK 11–12: Growth + Investor Readiness
**Objective: 25+ artists, 500+ fans captured, MRR > £50, investor narrative ready, growth mechanics active.**
**Dates: 2026-05-25 to 2026-06-07**

### Scale to 25 Artists

- [ ] 281. Now that the product works for 10 artists and friction is documented, expand outreach. DM 20 more artists this week using the personalised approach from weeks 5–6.
- [ ] 282. Ask your existing 10 artists for referrals: "Is there another artist you know who would benefit from having a better link in their bio?" Warm referrals convert 3–5x better than cold outreach.
- [ ] 283. Post a "we have X artists on the platform" update on the ABLE Instagram. Make it specific: "10 independent artists. 200 fans captured. We're early but it's working."
- [ ] 284. Write a LinkedIn post (from James's personal LinkedIn) about the problem ABLE solves. Frame it from an artist's perspective: "Every independent artist has 1000 people who would sign up for updates if they were asked correctly. Most aren't asking correctly." Do not hard-sell ABLE — describe the problem. The curious will ask.
- [ ] 285. Identify 3 UK music blogs, newsletters, or podcasts that cover independent artists. Example: DIY Magazine, Ditto Music Blog, Music Business Worldwide. Research the editor or host.
- [ ] 286. Write a short pitch (100 words) to each: not a press release, but a personal note: "I've built a tool for independent artists that's already being used by [N] artists to capture their first 100 direct fans. Happy to talk or demo if it's relevant to what you cover." Send to all 3.
- [ ] 287. Follow up on any media outreach after 5 days. One follow-up only.
- [ ] 288. Identify 3 music industry Facebook groups or Slack communities (e.g., Indie Collective, Music Biz Worldwide Slack) where independent artists hang out. Join them and spend a week being genuinely helpful before mentioning ABLE.
- [ ] 289. After being genuinely present in one of those communities for a week: share ABLE organically when it is relevant. "I built something for this exact problem — [link]." Context matters. Do not post it as an advertisement.
- [ ] 290. Set a goal: 25 active artists by end of week 12. "Active" means: profile live, at least 1 fan captured, logged in to admin in the last 14 days.

### PWA Build

- [ ] 291. Create `manifest.json` in the repo root: name "ABLE", short_name "ABLE", start_url "/artists/[slug]", display "standalone", background_color "#0d0e1a", theme_color "#0d0e1a", icons array with 192x192 and 512x512 PNG.
- [ ] 292. Link the manifest from able-v7.html: `<link rel="manifest" href="/manifest.json">`.
- [ ] 293. Create a service worker (`sw.js` in the repo root). V1 service worker: cache the core assets (HTML, CSS, JS, fonts) on first install. Serve from cache when offline.
- [ ] 294. Register the service worker in able-v7.html: `if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')`.
- [ ] 295. Test PWA installability on Android Chrome: navigate to an artist profile, confirm the "Add to Home Screen" prompt appears.
- [ ] 296. Test PWA installability on iOS Safari: confirm the Share → Add to Home Screen path works.
- [ ] 297. Test offline mode: install the PWA on Android, switch to airplane mode, open the app. Confirm the artist profile loads from cache.
- [ ] 298. Add `apple-mobile-web-app-capable` meta tag and `apple-touch-icon` link to able-v7.html for iOS PWA support.
- [ ] 299. Verify that the standalone PWA mode removes the browser chrome (address bar). The profile should look like a native app.
- [ ] 300. Add the PWA to your V1.1 launch notes. This is a meaningful differentiator over Linktree — Linktree is not installable as a PWA.

### Investor Readiness

- [ ] 301. Read docs/systems/investor-readiness/INVESTOR-READINESS.md in full.
- [ ] 302. Fill in every [INSERT] placeholder in that document with real current data.
- [ ] 303. Write a one-page summary of ABLE (the "one-pager"). Sections: What it is (2 sentences), Problem (2 sentences), Solution (2 sentences), Traction (real numbers — artists, fans, MRR), Team (1 sentence — "Sole founder, [background]"), Ask (if raising) or "We are not raising — building to default alive." Keep it to one page, A4 format.
- [ ] 304. Write the ABLE pitch narrative: a 3-minute verbal explanation of what ABLE is and why now. The structure: start with the artist's experience, not the product. "An independent artist releases a track. She tweets it. 200 people see it. 12 tap the link. 3 follow through. She never finds out who those 3 are. ABLE changes that." Practice this out loud 5 times.
- [ ] 305. Identify 5 UK-based angel investors or pre-seed funds who invest in music tech or creator tools. Research them: what have they invested in, what do they care about?
- [ ] 306. For each of the 5 investors: find a warm introduction path. LinkedIn mutual connections, music industry contacts, community members. A warm intro from someone they trust is 10x more effective than a cold email.
- [ ] 307. Do not yet contact any investors. The goal in week 11 is preparation. You approach investors when you have: 25+ artists, 500+ fans, at least 1 paying customer, and a clean deck. Not before.
- [ ] 308. Build a simple investor update template: a monthly one-page email covering MRR, artists, fans, key milestones, key learning. You will send this starting next month — even before you have investors, writing it sharpens your thinking.
- [ ] 309. Read Paul Graham's essay "Do Things That Don't Scale". Then ask yourself: have you done everything in your power to manually help each of your 10 artists succeed, or have you been waiting for the product to do the work?
- [ ] 310. Read the ABLE docs/systems/investor-strategy/INVESTOR-STRATEGY.md document. Identify any gaps between the narrative there and the current reality. Update the strategy doc to reflect reality.

### Analytics and Reporting Baseline

- [ ] 311. Build a simple internal dashboard (a private Notion page or a static HTML file not linked publicly) that shows: total artists, total fans, total page views (last 30 days), total CTA clicks (last 30 days), MRR, and churn (if any).
- [ ] 312. Update this dashboard weekly every Monday. Do not skip weeks — the trend is what matters, not the absolute number.
- [ ] 313. Identify your top performing artists by fan capture rate (fans per 100 profile views). What are they doing differently? Can you codify and share it?
- [ ] 314. Calculate the fan capture conversion rate: fans / views. Benchmark: 5% is reasonable for V1, 10%+ is excellent. If you are below 3%, investigate why — is the sign-up form visible? Is the copy compelling?
- [ ] 315. Check which CTA labels are getting the most clicks across all artist profiles. Are certain button labels outperforming others? Share this insight with artists.
- [ ] 316. Check which source values are driving the most fans: direct, instagram, tiktok, linktree (for artists who have not fully migrated yet). This is paid acquisition insight before you spend a penny on ads.
- [ ] 317. Verify Fathom/Plausible is tracking correctly on landing.html. Check the referral sources — where is landing page traffic coming from?
- [ ] 318. Set up a weekly 30-minute analytics review habit: every Monday morning, open the internal dashboard, update the numbers, write one insight. This takes 30 minutes and compounds dramatically over 90 days.
- [ ] 319. Write a growth model: if each artist has 1000 Instagram followers and converts 3% to ABLE fans, and each artist has an average 5% fan capture rate on their ABLE page, what does growth look like at 25, 50, 100, 250 artists? Build a simple spreadsheet.
- [ ] 320. Share the growth model in docs/systems/growth-strategy/ as GROWTH-MODEL.md. This becomes part of the investor story.

### Copy Refinement Pass

- [ ] 321. Read landing.html from top to bottom in a browser. Read it as a potential artist who has never heard of ABLE. What confuses you? What is unconvincing? Note 5 things.
- [ ] 322. Fix the top 2 confusing or unconvincing things on landing.html.
- [ ] 323. Read start.html as a new artist completing the wizard for the first time. Note any step where you are unsure what to do.
- [ ] 324. Fix the top friction point in start.html copy.
- [ ] 325. Read admin.html as an artist who has been using ABLE for 2 weeks. Does the data make sense? Is the language clear? Is anything patronising or overly technical?
- [ ] 326. Fix the top 2 copy issues in admin.html.
- [ ] 327. Re-read the VOICE-BIBLE.md. Has any new copy drifted from the voice? Fix it.
- [ ] 328. Audit the email sequences (welcome email, fan milestone emails) against the copy philosophy. Fix any violations.
- [ ] 329. Audit the tier gate copy: every "upgrade" prompt must say specifically what the artist gets, not just "upgrade to unlock". Fix any generic prompts.
- [ ] 330. Write the ABLE "About" page (about.html or a section on landing.html). Two paragraphs: what ABLE is for, and why it exists. No fluff. Direct and honest.

### Team Formation — First Steps

- [ ] 331. Write a 1-paragraph job description for an advisor: "Music industry professional with artist management or label experience. 2–4 hours per month. Advisory equity: 0.1–0.25% over 2 years." Keep it internal for now.
- [ ] 332. Identify 3 specific people from your network who fit this description. They do not need to be famous — they need to be knowledgeable and genuinely care about independent artists.
- [ ] 333. Reach out to advisor candidate #1. Not a formal ask — a coffee conversation: "I've been building something in the independent music space. I'd value your perspective on whether I'm solving the right problem."
- [ ] 334. Reach out to advisor candidate #2 for the same conversation.
- [ ] 335. If both conversations go well, formalise with a short advisor agreement: 2-year vesting, cliff at 6 months, 0.1% equity for 2–4 hours per month. Use a standard UK advisor agreement template (SeedLegals has a free one).

### Health Check — Week 11

- [ ] 336. Have you attended the physiotherapy appointment you booked in step 71? If not, book it again now. Do not defer it further.
- [ ] 337. Review your average sleep hours over the last 2 weeks. If below 7 hours regularly, this is a performance issue — address it.
- [ ] 338. Are the two daily focus blocks (07:00–09:00, 20:00–22:00) being respected? If not, diagnose why and adjust the times to ones you can protect.
- [ ] 339. Are you taking at least 2 days per week entirely off ABLE work? If no, this is unsustainable. Schedule it.
- [ ] 340. Write a one-paragraph note to yourself about how you are feeling about the project at week 11. Honest. Not performative. This is for you.

---

## WEEK 13: Review, Retrospective, V2 Plan
**Objective: Honest retrospective, documented learnings, V2 sprint planned, next 90 days outlined.**
**Dates: 2026-06-08 to 2026-06-13**

### Retrospective

- [ ] 341. Pull all data: total artists, total fans, total page views, total CTA clicks, MRR, paying artists, churn. Write them down in one place.
- [ ] 342. Compare against the targets set at the start of this roadmap: 10 artists (week 5–6), 100 fans (week 7–8), first payment (week 9–10), 25 artists (week 11–12).
- [ ] 343. For each target you hit: what did you do that worked? Write one sentence.
- [ ] 344. For each target you missed: what stopped you? Be specific and honest. Not "didn't have time" — why didn't you have time, and what would you change?
- [ ] 345. What was the single biggest surprise of the 90 days? (Something you did not anticipate — positive or negative.)
- [ ] 346. What was the single highest-leverage action of the 90 days? (The one thing that, if you had done it 2 weeks earlier, would have accelerated everything else.)
- [ ] 347. What did you spend time on that did not matter? (Be ruthless — documentation that was not read, features that were not used, etc.)
- [ ] 348. What do the artists on the platform actually use? Run a feature usage audit: in Supabase, check which features are populated in the profiles table. What percentage of artists have: bio, accent colour, release date, shows, snap cards? This is real usage data.
- [ ] 349. What do the artists on the platform not use? Features with near-zero adoption are candidates for removal or redesign — not for more marketing.
- [ ] 350. Write a retrospective document: docs/systems/founder-roadmap/RETROSPECTIVE-90.md. 500 words maximum. Problem, action, result, learning for each major initiative.

### Product Review — What V2 Is

- [ ] 351. Review the V1.1 backlog (the friction notes and feature requests from weeks 5–10). Which items are still unresolved?
- [ ] 352. Review the "Missing Features" tags in your artist feedback document. Which are still unbuilt?
- [ ] 353. What is the one feature that would make artists 2x more likely to recommend ABLE to another artist? This is the V2 anchor feature.
- [ ] 354. What is the one feature that would make artists 2x more likely to convert from free to paid? This is the monetisation V2 focus.
- [ ] 355. Write the V2 feature list as a prioritised backlog, not a wish list. For each item: problem it solves, user who needs it most, effort estimate (S/M/L), and whether it is P0, P1, or P2.
- [ ] 356. Identify P0 items in V2 — things that block artists from succeeding that you cannot ship without.
- [ ] 357. Identify the fan.html state: how complete is it? What is missing? Is it functional enough to share with any of the 10 artists' fans?
- [ ] 358. If fan.html is not yet functional: make it a V2 P0. The fan side of the flywheel is critical for network effects.
- [ ] 359. Review the freelancer.html status: still at 0/10 per STATUS.md. Decide: is this V2 or V3? If V2, it needs a spec in the next 30 days. If V3, mark it clearly and do not let it distract from artist/fan work.
- [ ] 360. Write a V2 90-day plan header (not the full 500 steps yet — that comes after this review). Headline goals: X artists, X fans, £X MRR, X key features shipped.

### Financial Review

- [ ] 361. Total all revenue received in the 90-day sprint. Even if it is £27, write it down.
- [ ] 362. Total all costs: ICO registration (£40), Stripe fees (1.4% + 20p per transaction), Resend (likely still free), Fathom/Plausible (£9/mo × 3 = £27), any domain costs. What did the 90 days cost?
- [ ] 363. Calculate gross margin: (revenue − direct costs) / revenue. For a SaaS product at this stage, gross margin should be above 85%. If it is lower, identify the cost driver.
- [ ] 364. Calculate CAC (Customer Acquisition Cost): total hours spent on artist acquisition × your hourly rate estimate ÷ paying artists. This is not a formal number yet — but it tells you if the acquisition approach is sustainable.
- [ ] 365. Project MRR growth: if you added N paying artists this sprint and your conversion rate from free → paid is X%, what does MRR look like at 90, 180, 270 days at the same rate?
- [ ] 366. Identify the job exit trigger: £5,000 MRR = approximately 555 paying artists at £9/mo average. At current growth rate, when does this happen? Write the date.
- [ ] 367. Is the current growth rate sufficient to reach job exit within 18 months? If not, what would need to change: more artists acquired, higher conversion rate, or higher average price?
- [ ] 368. Review the investor readiness documents. Are you closer to or further from a pre-seed raise than at the start? What changed?
- [ ] 369. Decide: are you raising or building to default alive? This decision affects everything — pace, dilution, hiring, product scope. Write down the answer and the reasoning.
- [ ] 370. If raising: set a target raise amount, a timeline, and a use-of-funds breakdown (2 sentences each). If not raising: set a target date and MRR for the next decision point about raising.

### Social Proof Compilation

- [ ] 371. Collect all testimonials gathered in the 90 days. How many do you have? What are the strongest ones?
- [ ] 372. Update landing.html with the strongest testimonials from the 90-day sprint.
- [ ] 373. Write a "90-day update" post for the ABLE Instagram: real numbers, real artists, honest about what worked and what did not. This is not a brag — it is a signal that you are real and building in public.
- [ ] 374. Post the update. Tag the artists who gave permission to be mentioned.
- [ ] 375. Write a LinkedIn post from James's personal profile about the 90-day sprint. What did you learn? What surprised you? Do not make it a product advertisement — make it a genuine founder reflection. These posts build long-term audience trust.

### Documentation and Ops Cleanup

- [ ] 376. Update CONTEXT.md to reflect the current active files and system state.
- [ ] 377. Update STATUS.md with current build state, what shipped in V1, and what is in the V2 backlog.
- [ ] 378. Archive any docs that are no longer accurate — move to _archive/ with a deprecation note.
- [ ] 379. Review the data architecture: are all localStorage keys still matching the Supabase table columns 1:1 as required by the rules? Fix any drift.
- [ ] 380. Verify all RLS policies are still correct and have not been accidentally disabled during development.
- [ ] 381. Run a full Playwright test suite on the production URL. All tests must pass. Fix any that are failing.
- [ ] 382. Check Stripe dashboard: are all subscription states correct? Any zombie subscriptions, failed payments, or uncaught webhook failures?
- [ ] 383. Check Supabase dashboard: any tables approaching free tier limits? Any slow queries? Any missing indexes?
- [ ] 384. Check Netlify build log: any warnings or deprecations to address?
- [ ] 385. Update the docs/FILE-STRUCTURE.md to reflect any new files created in the sprint.

### Investor Evidence Package

- [ ] 386. Compile a "proof of traction" folder: screenshots of Supabase dashboard (fans table, total count), artist profile screenshots (with permission), any testimonials received, Stripe dashboard showing first payments.
- [ ] 387. Write a product demo script: a 5-minute walkthrough of ABLE from artist perspective (start.html → admin.html → profile → fan sign-up → analytics). Practice this until you can do it smoothly.
- [ ] 388. Record a 3-minute screen recording of the demo using Loom or similar. This is your first product demo video. It does not need to be polished — it needs to be real.
- [ ] 389. Identify whether the warm intro paths to the 5 investors identified in step 305–306 are ready to activate. Are the numbers sufficient to have the conversation now, or do you need another sprint?
- [ ] 390. Make the go/no-go decision: approach investors now or wait for the next sprint with stronger metrics? Write down your reasoning.

### Next 90 Days — V2 Header

- [ ] 391. Set the V2 objective in one sentence: "By 2026-09-11, ABLE will have [N] paying artists, [N] total fans, £[X] MRR, and fan.html will be live."
- [ ] 392. Identify the three highest-leverage initiatives for V2 (not features — initiatives). Example: "Partner with 3 independent music blog editors for referral pipeline." or "Launch email broadcasts feature to drive paid conversion."
- [ ] 393. Write the V2 sprint plan header in docs/systems/founder-roadmap/V2-SPRINT.md. Just the header section — the full 500 steps can be written at the start of V2.
- [ ] 394. Identify the personal development priority for V2: is it founder skills (fundraising, hiring), product skills (specific technical gap), or external (community, PR)?
- [ ] 395. Book a personal review session with yourself at the start of V2: what kind of founder do you want to be by the end of V2? Write it down.

### Final 5 Steps: The Launch Moment

- [ ] 396. On the final day of the sprint, open ABLE in a browser. Navigate to your own artist profile URL.
- [ ] 397. Read the profile as if you are a fan seeing it for the first time. Does it feel real? Does it feel like an artist who is serious about their work? If yes: you have built something worth defending.
- [ ] 398. Email hello@ablemusic.co from your personal email as if you are an artist you don't know: "I heard about ABLE from [a friend]. How do I sign up?" — then respond to that email as the founder. This is your customer service baseline check.
- [ ] 399. Write a note to yourself about why you started this. Not the market opportunity. Not the business model. The specific moment when you decided this needed to exist. Keep this note. Read it when the hard weeks come — and they will come.
- [ ] 400. Commit everything. Push to main. The V1 sprint is complete.

---

## STEPS 401–500: Ongoing Infrastructure (Parallel to All Weeks)

*These steps do not belong to a specific week — they are practices and infrastructure items to complete as they become relevant, ideally completing all of them by week 12.*

### Security

- [ ] 401. Enable Supabase MFA (multi-factor authentication) for your own Supabase account.
- [ ] 402. Enable 2FA on the Stripe dashboard account.
- [ ] 403. Enable 2FA on Netlify.
- [ ] 404. Enable 2FA on the company email account.
- [ ] 405. Enable 2FA on Companies House (if supported).
- [ ] 406. Review the Supabase API keys: confirm only the anon key is used in client-side JS. The service role key must never be in any HTML file.
- [ ] 407. Check all HTML files for any hardcoded credentials (Stripe keys, service role keys). Remove any found.
- [ ] 408. Add a `Content-Security-Policy` header in Netlify `_headers` file to prevent XSS attacks.
- [ ] 409. Add `X-Frame-Options: DENY` header to prevent clickjacking.
- [ ] 410. Add `Referrer-Policy: no-referrer-when-downgrade` header.

### Developer Experience

- [ ] 411. Create a `.env.example` file listing all environment variables needed (without values). This is for your future self and any future team member.
- [ ] 412. Create a CONTRIBUTING.md (one page) describing the dev setup, the no-bundler philosophy, and the commit conventions.
- [ ] 413. Write a CHANGELOG.md. Start with v1.0.0 entry covering all V1 features.
- [ ] 414. Set up a pre-commit hook (`.git/hooks/pre-commit`) that runs a basic JS parse check on any modified HTML files.
- [ ] 415. Document the Netlify functions pattern: every serverless function goes in `/functions/`, uses the standard Netlify Functions format, and is tested locally with `netlify dev` before deployment.
- [ ] 416. Create a `functions/` directory README explaining each function's purpose.
- [ ] 417. Create a `shared/` directory README explaining each shared file's purpose.
- [ ] 418. Add a `tests/README.md` explaining how to run the Playwright suite.
- [ ] 419. Verify `shared/able.js` is not duplicating any logic that is now in `shared/supabase.js`. Remove duplicates.
- [ ] 420. Ensure `shared/style.css` contains no page-specific styles — only tokens, utilities, and shared components.

### Email Infrastructure

- [ ] 421. Verify Resend domain DKIM record is set correctly (check with mail-tester.com).
- [ ] 422. Verify SPF record includes Resend's sending servers.
- [ ] 423. Set up DMARC record: `v=DMARC1; p=none; rua=mailto:hello@ablemusic.co` as a starting configuration.
- [ ] 424. Test email rendering in Outlook 365 (notoriously difficult). Fix any rendering issues.
- [ ] 425. Set up a plain-text fallback for every HTML email.
- [ ] 426. Write the "first fan" notification email that goes to the artist when their first fan signs up. Content: "[Name], someone just signed up via your ABLE page. They came from [source]. Your first fan."
- [ ] 427. Test the first-fan email trigger.
- [ ] 428. Write the "weekly fan report" email that goes to artists every Monday: fans this week, total fans, top source, most clicked CTA. Keep it brief — 5 lines of data, no more.
- [ ] 429. Build the weekly fan report as a scheduled Netlify function or Supabase Edge Function (run every Monday at 08:00 UTC).
- [ ] 430. Test the weekly fan report with a test artist account.

### Supabase Operations

- [ ] 431. Enable Supabase point-in-time recovery (requires Pro plan — note this as a milestone action when you upgrade beyond the free tier).
- [ ] 432. Set up a daily Supabase export via the CLI (`supabase db dump`) as a local backup. Automate this if possible.
- [ ] 433. Review the Supabase query performance for the most common queries: profiles by slug, fans by artist_id, clicks by artist_id. Add indexes if missing.
- [ ] 434. Add index on `fans.artist_id` if not already present.
- [ ] 435. Add index on `clicks.artist_id` if not already present.
- [ ] 436. Add index on `views.artist_id` if not already present.
- [ ] 437. Add index on `profiles.slug` for fast profile lookup by URL.
- [ ] 438. Review the RLS policies monthly: as features are added, new tables may be created without RLS. Make this a calendar item.
- [ ] 439. Set up a Supabase Edge Function for the fan milestone email system — more reliable than a Netlify function for database-triggered logic.
- [ ] 440. Test the Edge Function deployment and invocation.

### Growth Infrastructure

- [ ] 441. Add UTM tracking to all ABLE-generated artist URLs shared from admin.html: `?utm_source=able&utm_medium=admin&utm_campaign=profile-share`.
- [ ] 442. Document the UTM taxonomy in docs/systems/analytics/SPEC.md so all future tracking is consistent.
- [ ] 443. Build a simple referral system: each artist gets a unique referral code. If another artist signs up via their referral link, track it. Do not yet reward it — just track it.
- [ ] 444. Design the referral reward (when you build it out): one month free on Artist tier for each successful referral. This is a low-cost growth mechanic.
- [ ] 445. Add a "Tell an artist about ABLE" button in admin.html that generates a pre-filled message: "I've been using ABLE for my link in bio and it's been useful — [profile URL]. Worth checking out if you want more from your bio link."

### Competitive Intelligence

- [ ] 446. Set up a monthly competitive review habit: 30 minutes, check Linktree, Beacons, Koji, Fanlink for new feature releases. Log observations in docs/COMPETITIVE_INTELLIGENCE.md.
- [ ] 447. Identify ABLE's strongest differentiation relative to each competitor. Is it still the campaign-moment system? Or has something else emerged as the real moat?
- [ ] 448. Check whether any competitor has launched something similar to the pre-release/gig/live state system. If yes, document it and sharpen ABLE's positioning.
- [ ] 449. Identify one thing each competitor does significantly better than ABLE in V1. These are the V2 competitive threats.
- [ ] 450. Write a one-paragraph competitive positioning statement that you could use in an investor conversation: "ABLE is the only [X] that [Y]. Unlike [Z], we [W]." Fill in with real, defensible claims.

### Mental Fitness Protocol

- [ ] 451. Every Sunday evening: write 3 wins from the past week (any size), 1 thing to improve, and 3 priorities for the coming week. This takes 10 minutes and replaces rumination.
- [ ] 452. Every morning: before opening a computer, write down the single most important task for the day. Not a list — one task. This is your north star for that day.
- [ ] 453. Find one other solo founder to have a weekly 30-minute check-in with. Not advice-giving — just "here's what I'm working on, here's what's hard". This is accountability without hierarchy.
- [ ] 454. If you have not found a solo founder peer by week 4: join Indie Hackers, YC's Startup School, or a UK founder community (The Entrepreneur's Network, London Startup Club) and introduce yourself.
- [ ] 455. Read one founder memoir or case study per month. Not a productivity book — a real account of someone who built something. Recommendation: Phil Knight's Shoe Dog. Understanding that the path is non-linear is protective against despair when things are non-linear.
- [ ] 456. If you feel yourself procrastinating on a specific task for more than 3 days: do not skip it. Do it first, for 25 minutes, before anything else the next morning. Procrastination is almost always fear of failure or fear of contact (e.g., fear of DM rejection). Name it.
- [ ] 457. Do not check metrics first thing in the morning. Build first. Check metrics in the evening. Metrics in the morning create anxiety that corrupts the build session.
- [ ] 458. Keep a failure log: when something does not work (an artist churns, a feature is ignored, an approach fails), write it down with your theory of why. Do not let failures be invisible — make them legible.
- [ ] 459. At the end of every month: re-read step 399 (why you started). Add one sentence to it. Let it grow.
- [ ] 460. When you feel like you are behind: re-read ANALYSIS.md. You were always going to be in this position. The question is never "am I behind?" — the question is "what is the next step?"

### Financial Practices

- [ ] 461. Set up a simple income/expense spreadsheet for ABLE Ltd from day one. One row per transaction. Columns: date, description, amount, category (revenue/cogs/operating), Stripe/bank reference.
- [ ] 462. Keep personal and company finances completely separate from day one. Every ABLE expense goes through the company bank account or is formally expensed from personal.
- [ ] 463. Set a quarterly date to file any HMRC requirements. Companies House confirmation statement is due annually (first one due 12 months after incorporation).
- [ ] 464. Research whether to register for VAT immediately or after the VAT threshold (£90,000 revenue per year). At this stage: no need to register yet. Note the threshold and revisit when MRR approaches £7,500/month.
- [ ] 465. Keep a "runway in months" calculation: company costs per month ÷ company cash. Update monthly. Never let this drop below 6 months without a plan.
- [ ] 466. When you reach £500 MRR: pay yourself a token salary of £500/month from the company. This is symbolic but important — it makes ABLE feel real and establishes the payroll practice.
- [ ] 467. When you reach £2,000 MRR: review the salary. At £5,000 MRR and above: pay yourself enough to cover your personal overheads. The transition from employed to self-employed requires this runway clarity.
- [ ] 468. Identify the total personal monthly overhead: rent, food, phone, transport, subscriptions. This is your job exit floor — you need ABLE to reliably cover this before leaving employment.
- [ ] 469. Write the job exit decision criteria explicitly: "I will leave my job when ABLE has had £X MRR for 3 consecutive months and I have £Y in savings as runway." Keep this document. Revisit it quarterly.
- [ ] 470. Do not leave your job before the criteria in step 469 are met, regardless of excitement or pressure. The employed founder position is a competitive advantage — it buys you time to build correctly rather than desperately.

### Community and Network

- [ ] 471. Connect with 5 other music tech founders on LinkedIn over the course of the 90 days. Not for leads — for peer perspective. People who understand the specific challenge of building for musicians.
- [ ] 472. Identify the 3 most influential voices in the independent music space in the UK (artist managers, music journalists, label heads who champion indie). Follow them, engage genuinely.
- [ ] 473. Identify 2 potential non-equity partnerships: a digital distributor (DistroKid, TuneCore, Amuse) or a live venue platform (Skiddle, Dice) that could refer artists to ABLE. Research their partnership or API programs.
- [ ] 474. Draft a one-paragraph partnership pitch for the strongest candidate: what ABLE offers their users, what we want in return (a newsletter mention or integration), and why it is in their interest.
- [ ] 475. Send the partnership pitch to one candidate. Do not send to all three simultaneously — start with the one where you have the warmest connection.
- [ ] 476. If any of your 10 artists have meaningful audiences (10k+ followers): ask them if they would post a genuine Instagram Story about using ABLE. Not an ad. Not scripted. "Here's what I've been using for my bio link — [link]." This is organic seeding.
- [ ] 477. If an artist posts organically about ABLE: repost it on the ABLE Instagram with a genuine caption. Thank them specifically.
- [ ] 478. Build a "wall of profiles" on landing.html: a grid of artist profile screenshots (with permission) showing variety of use — different genres, different vibes, different accent colours. This is proof of concept at a glance.
- [ ] 479. Identify one music industry event or conference happening in the UK in the next 6 months (Great Escape, SXSW London, Midem). Research the cost and whether attendance would create artist acquisition opportunities.
- [ ] 480. If the event is within budget and timing: register. Physical presence at one relevant event per quarter is a high-leverage founder activity that cannot be replicated by DMs.

### Product Depth — V1 Completeness

- [ ] 481. Audit the snap cards feature: are they being used by any of the 10 artists? What content are they putting in them?
- [ ] 482. Audit the connections section: are any artists using it? Is the UI clear for what goes there?
- [ ] 483. Audit the support section (merch, tip jar, etc.): is any artist using this? What is the friction?
- [ ] 484. Audit the pre-release countdown: is any artist using this? Does it work correctly on mobile?
- [ ] 485. Audit the gig mode toggle: does any artist use it? Is the 24-hour auto-reset working?
- [ ] 486. For each underused feature: is it an awareness problem (artists don't know it exists), a friction problem (too hard to set up), or a relevance problem (doesn't fit their use case)?
- [ ] 487. Fix the top awareness problem: add a tooltip or first-run nudge in admin.html for any feature used by fewer than 20% of artists.
- [ ] 488. Fix the top friction problem: simplify the setup for the least-used but most-wanted feature.
- [ ] 489. Review the nudge system in admin.html: are the nudges relevant? Are they being dismissed permanently or temporarily? Are any nudges firing repeatedly when they should not?
- [ ] 490. Fix any broken nudge logic. A nudge that fires when it should not creates distrust in the admin experience.

### Closing Steps

- [ ] 491. Write a personal letter to your future self: "By 2026-12-31, I want ABLE to have [X]. Here is the one belief I am holding about this work: [Y]." Seal it. Open it on 31st December.
- [ ] 492. Create a shared/tokens.css file if not already existing: extract all CSS custom properties into a single source of truth file. Reference it from all HTML files.
- [ ] 493. Run a full accessibility audit on able-v7.html using axe DevTools (free Chrome extension). Aim for 0 critical violations.
- [ ] 494. Run the same accessibility audit on admin.html and start.html.
- [ ] 495. Fix any critical accessibility violations found. Focus on: missing alt text, insufficient colour contrast, unlabelled form fields.
- [ ] 496. Add `aria-label` to all icon-only buttons across all pages.
- [ ] 497. Add `role="main"` to the main content area of each page.
- [ ] 498. Confirm all form inputs have associated `<label>` elements (not just placeholder text).
- [ ] 499. Update ANALYSIS.md with honest scores at the end of the 90-day sprint. Compare to the starting scores. This is your founder growth record.
- [ ] 500. Read step 399 one more time. Then build.

---

*This document is a living checklist. When a step becomes irrelevant, mark it as such and explain why. When a step needs splitting, split it. The number 500 is not sacred — the execution is.*
