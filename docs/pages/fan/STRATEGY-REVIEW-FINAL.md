# fan.html — Strategy Review Final
**Date: 2026-03-15**
**Score baseline: 5.85/10 | Score after P0+P1: 8.8/10 | Score after P2: 9.4/10**

---

fan.html has the right structure but fails at the moment of arrival. A fan who just signed up through an artist's page and clicks through to fan.html sees a generic dashboard. That moment — the first arrival — is the fan relationship's most fragile point. Fix that and the page jumps from 5.8 to 8.0 without touching the existing tabs.

---

## The arrival problem as governing insight

Every other issue on this page — the empty states, the cold-start gap, the missing orientation — is a downstream consequence of a single design omission: the link from an artist's profile to fan.html carries no context.

A fan signs up through Nadia's page. They tap "Your ABLE page →". They land on fan.html. The page has no idea it was Nadia who sent them. So it shows either demo data or a blank state with a generic message about following artists. The fan, who came here because of Nadia and in the context of Nadia, is given nothing.

This is not a subtle UX problem. It is the first experience a new fan has of the product beyond the artist's own page. If it fails — if the fan lands on something that feels generic and unrelated to why they signed up — the page loses them before it has earned a second visit.

The fix is architectural, not cosmetic. The `?artist=slug&ref=signup` URL parameter scheme is a 20-line change that makes every subsequent visit coherent. With it: fan arrives, fan sees Nadia's content, fan gets 2–3 connected artist suggestions, fan leaves following 3 artists. Without it: fan arrives, fan sees nothing meaningful, fan doesn't come back.

This is the governing insight. Everything else is secondary.

---

## fan.html's unique role

fan.html is not a social feed. It is not a recommendation engine. It is not Instagram or TikTok.

It is a place where fans go because they care about specific artists they chose to follow. Every item they see is from someone they actively wanted to hear from. Nothing is ranked. Nothing is promoted. Nothing is served by a machine.

This distinction has direct design consequences:

**The Following tab is the product.** Not Discover. Not Near me. The fan's list of artists, and what is happening with those artists right now — that is the primary job. Discover is a tool for expanding the list. Near me is a tool for acting on it. But the Following tab is why the page exists.

**The Today strip is the core promise.** "If something happened today with an artist you follow, you will see it here." That is the entire value proposition. It must never be empty without explanation. It must never show things the fan didn't ask for. It must be newest first, always.

**Discovery is honest, not algorithmic.** The Connected filter — artists discovered through production credits and human relationships — is the most ABLE-specific feature on the entire page. It is not a recommendation algorithm. It is a map of real music industry relationships. It should be the default Discover filter precisely because it is nothing like what any other platform offers.

---

## The "Today strip" as the core promise

The Today strip is the simplest, most important element on fan.html. It answers one question: "Did any artist I follow release something new in the last 24 hours?"

Current state: Today strip works structurally but fails in two ways.

**First:** When it is empty, it says "Nothing new today." with no context. This is fine for a returning fan who has been checking daily. It is disorienting for a fan who has not opened the page in a week. The fix is copy that acknowledges the last time something happened: "Nothing new today. [Artist name] posted something yesterday." or "It's been a quiet week. Your artists will be back."

**Second:** The ordering within Today is not reliably newest-first. A sort by `b.age - a.age` before the Today/This week split resolves this. It is a one-line change.

Neither of these is difficult. Together they make the Today strip feel like a reliable morning check rather than an uncertain lookup.

---

## Copy philosophy violations currently present

The current build has six vocabulary violations that undermine the premium positioning:

| Violation | Location | Fix |
|---|---|---|
| "Your feed" | `<title>` | `ABLE` |
| "No one in your feed yet" | Empty following state | "You're following nobody yet." |
| "Feed" | Bottom tab bar label | "Following" |
| "You're all caught up" | Caught-up state | "— you're up to date —" |
| "Updated moments ago" | Caught-up sub-line | Remove entirely |
| "We'll show you shows..." | Near me empty state | "No shows near [City] right now." |
| "Update" | Snap card type badge | "From the artist" |

These are not cosmetic corrections. "Feed" is a word that carries the entire ideology of algorithmic social media. It belongs to TikTok and Instagram. Using it on ABLE sends a signal — however unintended — that this page works the same way. It does not. The word must go.

"You're all caught up" is generic SaaS. It belongs on a task management app or an email client. fan.html is a place where fans stay close to music they love. The copy must reflect that register.

All seven violations are fixable in under 20 minutes. They should be the first changes made when implementation begins.

---

## Score trajectory

| Phase | Score | What changes |
|---|---|---|
| Baseline | 5.85/10 | Current state |
| P0 complete | 7.5/10 | Arrival URL scheme, empty state rewrites, page title fix, cold-start suggestions |
| P1 complete | 8.8/10 | Discover defaults + Near me location + pre-release strip + source tracking + notification pip |
| P2 complete | 9.4/10 | PWA + offline graceful state + Supabase realtime |
| Supabase live | ~10/10 | Real data, push notifications, Close Circle with Stripe |

The gap between P2 complete (9.4) and a theoretical 10 is Supabase realtime. Not design. Not copy. Not structure. The page becomes a 10 when a fan's feed updates in real time because an artist just dropped something, without the fan having to reload the page.

---

## Build priority

**P0 first. No exceptions.**

The arrival flow and empty state fixes are prerequisite to everything else. A page that fails on first arrival cannot retain fans. Cold-start suggestions, personalised greetings, and correct page title cost almost nothing to implement. They are the first commits.

**P1 second — completeness, not polish.**

Discover tab defaults, Near me location input, pre-release strip, source tracking. These are features that make the page complete for v1. They are not enhancements — they are the page working as specified.

**P2 third — permanence.**

PWA manifest, offline handling, Supabase realtime. These make the page reliable across visits and devices. They are the bridge between the localStorage prototype and the production product.

**Close Circle is the Phase 2 anchor.**

Without Close Circle, fan.html is an information page. With Close Circle, it becomes a place fans invest in. The £5/month direct payment (artist keeps everything) is a trust signal unlike anything a platform has offered music fans. The invitation copy is already written in COPY.md. The section needs to exist — even as a stub with the correct copy and no payment flow — before Phase 2 ships. A stub that says "Some fans go a bit further..." is better than no Close Circle at all.

---

## What the current build has right (preserve these)

**The structure.** Following / Discover / Near me is the correct three-part architecture. This should not change.

**The design language.** Dark theme matching artist profiles, individual accent colours per artist, DM Sans, spring easing, card radii. The page already feels like it belongs in the same world as the artist profiles fans came from.

**The Following view architecture.** Today / This week is honest, temporal, non-algorithmic. It does not rank by engagement. It shows items in the order they happened. This is the right call and it must not change.

**The Connected filter.** Discovery through production credits is ABLE-specific and non-algorithmic. It is the most interesting feature in the Discover tab. It should be the default.

**Mobile performance.** Single HTML file, localStorage-first render, lazy tab loading, proper iOS handling. The technical foundations are solid.

---

## What fan.html must never become

These are not aspirational constraints — they are existential ones. Each represents a path that other platforms have taken and that directly undermines ABLE's reason to exist.

**No global trending.** What's trending is the algorithm. ABLE is the antidote.

**No fan-to-fan features.** This is not a community platform. No comments, no fan profiles, no fan follows. The relationship is artist-fan. Not fan-fan.

**No gamification.** No streaks, no badges, no superfan rankings visible to the fan. The relationship with an artist is not a game.

**No advertising.** The moment an ad appears in the Following view, the trust model collapses. The fan gave their email for an unmediated relationship with an artist. That is the contract.

**No "For You" tab.** The algorithmic foot in the door. ABLE's Discover logic is based on taste and human relationships — not engagement metrics. A "For You" tab implies the platform knows better. It does not.

---

## Conclusion

fan.html is in a good place architecturally. The structure, design language, and core logic are right. The gaps are executional, not strategic. The P0 changes — arrival URL scheme, empty state rewrites, page title fix — are all achievable in the current single-file HTML, require no backend, and push the product from 5.85/10 to 7.5/10.

The most important single truth about this page: it exists to serve the relationship between artist and fan. Every feature decision should be judged by whether it makes that relationship more direct, more honest, and more resilient. Not whether it increases time-on-page. Not whether it drives shares. Whether artist and fan stay closer because of it.

That is what ABLE is for.
