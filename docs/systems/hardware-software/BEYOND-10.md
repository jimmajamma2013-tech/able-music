# Hardware & Software — BEYOND 10
**The 20/10 push | Created: 2026-03-16**

---

## The 20/10 moment

It is 07:15 on a Tuesday. The red light panel has been on for 12 minutes. The desk is at standing height — it will stay there for the first 90 minutes, which is the C5/C6 protocol and also the time when James's thinking is clearest. The Mac Studio completed its overnight work while James slept.

Telegram has three messages. The first is from the n8n weekly review agent: it ran at 22:00 last night and produced the Friday brief (it arrived early this week because James triggered it manually on Monday). The second is a completion notification from Claude Code: "Agent completed. 3 files written, 0 errors. Commit 4e2a91c pushed to v2-simplified." The third is from the n8n market digest agent: a three-line summary of what happened in music tech overnight. One of the items is about a new Spotify API endpoint. James reads it, notes it is relevant to the Spotify integration spec, and opens a note in Obsidian.

The music playing is something an artist James follows released two days ago. Not a playlist. A specific record by a specific person. He listened to it yesterday on a walk. He is listening to it again now because it is good and because keeping up with the music being made by the kind of artist ABLE is built for is part of the job. The environment is not aspirational — it is connected to the purpose.

The first three actions of the day:
1. Read the Telegram brief. Note the one question. Open STATUS.md. Decide whether the question changes today's agenda.
2. Review the agent's overnight commit. Open able-v7.html in the browser. Confirm the change looks right in a 375px viewport.
3. Open the ABLE admin demo profile. Check it as a first-time artist would.

The laptop opens at 07:20. The first hour of real work starts with full context, not cold.

---

## The exact morning setup

**Physical environment:**

The desk (FlexiSpot E7 Pro) is preset to standing height from the night before. The first 90 minutes standing is non-negotiable — it is the C5/C6 protocol and also the most productive period. The chair does not appear until the desk descends at 08:45.

The red light panel (Mito Red Light MitoMID) is on the moment James enters the room. 630/850nm wavelength, 10–15 minutes, positioned 15–20cm from the neck and upper back. It runs during the Telegram read and the first actions. By the time the laptop opens, it has completed its protocol.

The display: Dell U2723QE at the correct height — top edge at or just below eye level. Critical for C5/C6. The monitor arm (Ergotron LX) allows exact positioning in 10 seconds if the setup was disturbed.

The room is quiet for the first 30 minutes. Then music.

**The music:**

A specific rule: whatever plays in the first working hour is something a real independent artist released in the last 7 days. Not an algorithm-generated playlist. Not a mood playlist. A specific record that James chose because he was paying attention to what was being released.

The reason this is in the system spec rather than a personal preference note: the environment shapes the work. James is building a product for artists who are releasing music into the world right now. The morning in which he hears what that world sounds like is not the same as the morning in which he puts on a background playlist. The connection is real. The rule is: choose the music before the morning starts. This takes 90 seconds the night before.

**The screen at 07:20:**

Three windows are open at session start, nothing else:
1. Telegram desktop — the overnight messages
2. Terminal — the output of the last agent run (the Mac Studio ran agents while James slept)
3. CLAUDE.md — the project brief, as a reminder of what matters before the code opens

The browser does not open until after the Telegram read. No social media until after the first work block is complete.

**The Ollama state:**

Overnight agents used DeepSeek-R1:70b and llama3.2 for documentation and code review tasks. These are loaded in memory. The Mac Studio M4 Max 128GB has sufficient memory to hold multiple models simultaneously — no loading time on the first query of the day.

If James wants to work with a model immediately (strategy question, copy review), he opens Open WebUI in the browser and types. No terminal, no model pull command, no wait. The environment is ready.

---

## The three first actions in full

**Action 1 — Read the brief (3 minutes)**

Telegram is open. The overnight messages are read in sequence: n8n weekly brief (if Friday night) → agent completion notification → market digest.

The market digest deserves a specific note: it is three lines, maximum. The n8n workflow is configured to produce no more than this. If the digest is longer, the configuration is wrong. Three lines: one thing that happened in music tech, one thing that happened in the music industry, and one question the digest raises for ABLE. Reading time: 45 seconds.

If the weekly brief is present: read it in full (under 2 minutes). Note the one question. Decide: does this change today's agenda? Write the answer in MEMORY.md under "This week's question." Even if the answer is "no — staying on current track." The discipline is the loop, not the answer.

**Action 2 — Verify overnight agent work (5 minutes)**

The completion notification contains a commit hash. Open the terminal. Run `git show [hash] --stat` — a one-line summary of what changed. Not the full diff unless something looks wrong. Then open the changed file in the browser at 375px width. Does it look right? Does it feel right? The artist who clicks this page tomorrow morning does not know what changed last night. They just see the result.

This takes 5 minutes if the agent's work is clean. If something looks wrong, it is flagged before the day's main work begins. Catching a broken change at 07:25 is significantly better than discovering it at 14:00.

**Action 3 — Check the product as a user (5 minutes)**

Open the ABLE admin demo profile. Not the code. The running product. Click three things. Sign up as a fake fan. Check the fan appeared in the admin list.

This is the 5-minute smoke test. Not a formal QA run. Just the physical act of being a user of the product every morning. The reason: subtle regressions are invisible when you are reading code. They are immediately visible when you are clicking through a page you know well. This 5-minute action has caught more real issues than any automated test in the early stage.

---

## What competitors would have to become to match this

The 20/10 morning environment is not a hardware specification. Any founder can buy the same desk and red light panel. What competitors cannot match is the integration: a workspace where the overnight AI work feeds into the first action of the day, where the music playing is a deliberate connection to the users being served, and where the C5/C6 protocol is infrastructure rather than aspiration.

To match this, a competitor founder would need: a local AI stack capable of meaningful overnight work (requires the hardware investment and the workflow discipline), a notification system that surfaces relevant results without creating anxiety, and a health protocol that is specific enough to be followed rather than general enough to be ignored. Most founders have none of these systematically. Some have one.

---

## Why this matters for ABLE's trajectory

The C5/C6 condition is not a side note. It is the central constraint on James's capacity to build ABLE. A day that starts with the wrong physical setup accumulates cervical tension across the session. That tension reduces cognitive quality in the afternoon, disrupts sleep, and compounds across the week. The morning protocol is not wellness theatre — it is productivity infrastructure.

The connection between environment and purpose is not soft. An artist building a product for independent musicians who starts each day hearing what those musicians are releasing right now is doing a different kind of research than one who doesn't. It takes 90 seconds the night before. The return is a founder who is paying attention to the world the product lives in.

The 20/10 workspace is the one that makes the best work inevitable. Not by being the most impressive setup. By being the most intentional one.
