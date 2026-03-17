# ABLE CRM — Final Review
**Created: 2026-03-16**

---

## Build vs buy: confirmed custom

The decision is not close. Every off-the-shelf CRM treats fans as email subscribers. ABLE's CRM treats fans as people who showed up at a specific moment in an artist's story. These are fundamentally different data models, and no amount of custom field configuration on Mailchimp or Kit changes that.

The five reasons the decision is non-negotiable:

**1. No off-the-shelf CRM understands campaign states.**
Mailchimp does not know that the artist was in `pre-release` mode when a fan signed up. It cannot tell the artist "47 people joined during your Echoes pre-release" because it has no concept of a pre-release. It just sees 47 sign-ups in a date range. The date range is an approximation of the moment. The campaign state IS the moment.

**2. No off-the-shelf CRM preserves the "which release triggered this sign-up" context.**
The fan who signed up because they saw a pre-save countdown for Echoes is a different relationship than the fan who signed up because they were at the Oslo show. Both might have come from Instagram. Both signed up in March 2026. The source and the date are the same. The story is completely different. Only a CRM embedded in the page that knows what was on that page when the fan arrived can preserve this distinction.

**3. No off-the-shelf CRM speaks in artist voice.**
Mailchimp's UI calls fans "subscribers" and "contacts." It talks about "campaigns" and "automation sequences" and "list hygiene." These are the correct words for an email marketing platform. They are entirely wrong for an artist managing the people who care about their music. The vocabulary difference is not superficial — it shapes how the artist thinks about their relationship with fans. ABLE's CRM uses "people on your list", "who showed up", "your list, your relationship." These are not just copy differences. They are product philosophy.

**4. The fan relationship IS the product — it cannot be outsourced.**
ABLE's two-sentence product description is: "A page that knows what campaign moment you're in. And a list of people who arrived during that moment." If the list is managed in Mailchimp, ABLE is just a conversion-optimised link-in-bio with a Mailchimp integration. That is a dramatically weaker product. The CRM is what makes ABLE different from Linktree. Delegating it to a third party destroys the differentiation.

**5. Data portability is a promise, not a feature.**
ABLE's 0% lock-in principle means the artist can export everything and leave with their relationships intact. This works because ABLE controls the data format. If the fan list lived in Mailchimp, the artist's ability to export depends on Mailchimp's export tools, pricing, and feature availability. ABLE's export is a one-click CSV that always includes all fields — including the music-native context fields that no external CRM would even have.

---

## What the ABLE CRM does that nothing else does

**Every fan record is a story.**
When they signed up, from what, during what campaign, with which release active. The artist opens a fan record and sees: "Signed up on gig night — The Jazz Café, 14 March." That is not a row in a spreadsheet. That is a relationship with context.

**The artist always owns the relationship directly.**
No ABLE lock-in. Export in one click. The list is theirs. The relationship is theirs. ABLE is infrastructure, not a gatekeeper.

**Broadcasts feel like messages, not campaigns.**
Plain text. From the artist's name. Max 500 words. No template, no drag-and-drop, no A/B test. The constraints are intentional. The fan who receives the email should feel like the artist sat down and wrote to them — not like they're in a Mailchimp sequence.

**The CRM knows what the artist is going through.**
When the release ends and the page drops back to profile mode, ABLE says: "203 people signed up during your Echoes campaign. You haven't written to them since. Want to?" No generic CRM can do this because no generic CRM knows when the release ended. ABLE does.

---

## Current score and trajectory

**Current CRM score: 4/10**

This is honest. The foundation is sound — fan capture works, source tracking works, export works, search works, star works. But the differentiation (music-context at sign-up, level system, campaign breakdown) is almost entirely unbuilt. An artist using the current CRM is getting approximately the same capability as a Google Sheet.

**Score after P0 (localStorage, no backend): 7/10**
The most important change — `campaignState` captured at sign-up — is a 20-line change in able-v7.html. It is the highest-ROI change in the entire product backlog. After P0, ABLE's CRM is demonstrably different from any alternative.

**Score after P2 (Supabase + broadcasts): 9/10**
The product is now a genuine CRM with segments, broadcasts, and auto-nudges. The artist has a tool that understands their career, not just their email list.

**Score after P3 (full feature set): 10/10**
Activity tracking, geography, broadcast analytics, individual contact. This is a professional fan relationship management system that happens to be built into the artist's page.

---

## The risk to avoid: scope creep into an email platform

The specific features ABLE must not build, regardless of artist requests:

**Visual email template editor.** The moment the compose flow has a drag-and-drop block editor, broadcasts feel like marketing. The artist starts thinking about design instead of content. The fan starts receiving emails that look like newsletters. The relationship degrades.

**Email sequence automation (drip campaigns).** "Welcome series", "release series", "fan reactivation sequence" — these are Mailchimp features that belong in Mailchimp. ABLE's broadcast is always artist-initiated, present-tense, and specific. Automated sequences are the opposite of that.

**A/B testing for emails.** When the artist can test two subject lines, they optimise for open rate rather than writing the best possible message. This is a category error. ABLE is not in the open rate optimisation business.

**"Best time to send" AI suggestion.** Same problem. Optimising for deliverability metrics rather than authentic communication.

**Open-rate-first analytics.** Showing open rates as the primary KPI teaches artists to think about their fans as conversion metrics. Show them how many people their music reached. Don't show them a 42.3% open rate.

If any of these features are requested, the answer is: "That belongs in Mailchimp. You can export your list and use it there if you want those features. ABLE does something different."

---

## Integration note: CRM and email system

The CRM spec (this document and SPEC.md) and the email system spec (`docs/systems/email/SPEC.md`) are deliberately separate but tightly coupled:

- The email system defines the content and tone of emails (what gets sent and how it sounds)
- The CRM defines the relationship data model and fan management UI (who gets sent to and what we know about them)
- The bridge between them is `campaignState` — a field on the fan record (CRM) that determines which email variant is sent (email system)

This means P0.1 (capturing `campaignState` at sign-up) is load-bearing for both systems. Until it is done, the fan confirmation email cannot be fully campaign-aware even though the email copy variants are already specced.

**The single most important next action for the CRM:** implement P0.1.

---

## The CRM is the heart of ABLE's value proposition

The profile page is the first impression. The CRM is the relationship. Without the CRM, ABLE is a prettier Linktree. With the CRM — especially with campaign context captured at sign-up — ABLE is the only tool that lets an independent artist know not just that they have fans, but what moment in their story brought each person there.

That is worth building well. It cannot be bought off the shelf.
