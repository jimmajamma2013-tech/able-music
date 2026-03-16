# ABLE — Hardware & Software Setup
**Date: 2026-03-16 | Owner: James Cuthbert**

> This document is the complete physical and digital infrastructure for building and running ABLE as a solo founder with AI leverage. It covers every machine, peripheral, tool, and protocol.

---

## Part 1: Hardware

### 1.1 Primary Workstation — Mac Studio M4 Max (128GB unified memory)

**Why this specific machine:**

The 128GB unified memory configuration is the single most important technical decision in the stack. Unified memory means RAM and VRAM are the same pool — when you run a 70B parameter LLM locally, the full model weight (approximately 45GB at Q4 quantisation) loads into memory alongside Claude Code, VS Code, Safari, and your development environment simultaneously without swapping.

On any machine with less than 128GB:
- DeepSeek-R1 70B would compete with your OS for RAM and either refuse to load or run at degraded speeds
- Qwen2.5-Coder 32B + Claude Code + browser open simultaneously would cause paging to disk, degrading inference from 20–40 tokens/second to under 5

On 128GB, the full working stack (local LLMs + dev environment + browser + n8n) uses approximately 80–100GB. You have headroom.

**M4 Max Neural Engine:**
The M4 Max processes tokens at 3–4x the speed of M3 Max on-chip inference. A 70B model runs at approximately 15–25 tokens/second on M4 Max vs. 5–8 on M3. For coding tasks with Ollama where you're waiting for a 2,000-token response, the difference is 2 minutes vs. 7 minutes. Across hundreds of daily tasks, this is a significant time and friction reduction.

**It is a workstation, not a laptop:**
The Mac Studio is stationary — the tradeoff (no display, no battery) is the correct one for your primary base. You are not carrying this machine. For travel, you have a separate machine. The Mac Studio stays at your desk and runs Ollama models, n8n automations, and Playwright tests continuously without throttling from a thermal budget.

**RAM configuration for local LLMs:**
Ollama allocates memory dynamically per model. At 128GB you can hold two large models in memory simultaneously:
- DeepSeek-R1 70B (~45GB) + Qwen2.5-Coder 32B (~20GB) = 65GB for inference
- Remaining 63GB: macOS + apps + Chrome/Safari + VS Code + n8n comfortably
- For maximum inference speed: close Chrome and VS Code during a heavy reasoning session — frees ~8–12GB and reduces interference

**Thermal management:**
The Mac Studio uses a large axial fan (quieter than Mac Pro but more capable than MacBook) and the M4 Max chip is engineered to sustain peak compute longer than mobile chips. In practice:
- Light development and web work: fanless or inaudible
- Sustained Ollama inference (running a 70B model for 30+ minutes): fan audible but not loud
- Playwright browser tests + Ollama + n8n simultaneously: moderate fan activity
- What to do: the Mac Studio does not overheat under sustained compute. Unlike MacBook Pros which throttle under sustained load, the Studio's thermal headroom is large enough to run at full speed indefinitely. No intervention required. Ensure the machine is on a hard surface with rear vent clear (minimum 5cm clearance behind unit).

**Backup strategy:**
- Code: Git is primary. Commit after every logical change. GitHub repo is the remote backup. The code never lives only on your local machine.
- Documents: `docs/` folder is inside the Git repo — backed up with every push.
- Machine: Time Machine to external SSD, scheduled hourly when at main workstation. Monthly bootable clone via SuperDuper or Carbon Copy Cloner.

---

### 1.2 Peripherals

**Display: Dell UltraSharp 27" 4K USB-C — U2723QE**

Recommended over LG UltraFine because:
- USB-C single-cable connection to Mac Studio: power, data, and display in one cable
- IPS Black panel: better contrast ratio (2000:1 vs 1200:1 on standard IPS) — more comfortable for dark theme code editing
- Factory colour calibration (Delta-E < 2) — accurate for reviewing ABLE's visual design
- Rock-solid build quality, 5-year Dell warranty with advanced exchange
- 90W power delivery over USB-C (enough to charge a MacBook Pro if needed on travel)
- Price: approximately £500–600

Setup: Position at arm's length (50–70cm). Top of screen at or just below eye level — critical for your C5/C6 condition. See ergonomics protocol in section 1.5.

**Keyboard: Keychron K8 Pro (or Q1 Pro) — wireless, low-profile, tenkeyless**

For C5/C6 herniated disk, the keyboard position directly affects shoulder elevation and wrist posture. Key considerations:
- Tenkeyless (no numpad): brings mouse closer to keyboard, reducing shoulder abduction
- Low-profile switches: reduces wrist dorsiflexion compared to standard height keyboards
- Wireless: allows repositioning freely without cable management constraints
- Optional: split ergonomic keyboard (Kinesis Advantage360 or ZSA Moonlander) — if wrist and shoulder tension is ongoing, the split design allows elbows at 90° with wrists in neutral position naturally

Current recommendation for immediate comfort without re-learning muscle memory: **Keychron K8 Pro** with low-profile red switches (light actuation, no audible click for sustained typing comfort).

If you find wrist tension persisting after 2 weeks: upgrade to **ZSA Moonlander** or **Kinesis Advantage360**. The re-learning period is approximately 2–4 weeks but the long-term ergonomic benefit for C5/C6 is material.

**Mouse: Logitech MX Vertical**

A vertical mouse keeps the hand in a handshake orientation rather than palm-down (pronated). This:
- Eliminates forearm pronation, reducing tension on the cervical-thoracic chain
- Reduces wrist extension, which contributes to shoulder and neck fatigue
- Directly relevant for C5/C6: the nerve compression from the herniated disk is aggravated by sustained awkward upper limb posture

The MX Vertical has a good sensor, rechargeable via USB-C, connects via Bluetooth or Logi Bolt receiver, and works well on most surfaces. Price: approximately £100–120.

Alternative if you prefer a trackball: **Kensington Expert Mouse Wireless Trackball** — eliminates arm movement entirely, reduces fatigue further. Slightly larger learning curve.

**Desk: FlexiSpot E7 Pro Standing Desk (or equivalent)**

For C5/C6, prolonged sitting is one of the most damaging activities. The disc is under 3x more compression sitting than standing. A motorised sit/stand desk is not optional — it is therapeutic.

Specification to look for:
- Dual-motor frame: more stable at standing height than single-motor
- 100–125cm standing height range (accommodates your height range when standing)
- Memory presets: one-button switching between your sitting height and standing height
- Weight capacity: 100kg+ (accommodates Mac Studio, display, peripherals)

**FlexiSpot E7 Pro** is consistently recommended in ergonomic reviews at a mid-range price (~£400–500 for frame, add desktop). If you already have a desktop surface you like, the frame-only option is available.

Use protocol: alternate 25 minutes sitting with 5–10 minutes standing (align with Pomodoro breaks). After 90 minutes total: 5-minute walk. See full protocol in section 1.5.

**Chair: HM Aeron (Size B) or HAG Capisco**

For the seated periods:
- **Herman Miller Aeron (Size B)**: the reference ergonomic chair. PostureFit SL supports both sacral and lumbar curve. The mesh back eliminates heat buildup. Tilt limiter set to forward tilt encourages pelvis forward and reduces lumbar flexion. Price: £800–1,200 new, £300–600 refurbished. Refurbished from a reputable dealer is an excellent option.
- **HAG Capisco**: designed specifically for sit/stand work. Can be used high (like a saddle stool) at standing desk height during transitions. Less conventional but highly ergonomic for disc conditions.

If budget is constrained right now: any chair with a lumbar roll or adjustable lumbar support is better than nothing. The Autonomous ErgoChair Pro (~£350) is a good mid-range option.

**Monitor Arm: Ergotron LX**

The display should not sit on its stand for daily use. A monitor arm:
- Allows precise height adjustment to eye level (critical for C5/C6 — neck flexion looking down is one of the worst sustained postures for a cervical disc)
- Allows screen to be pulled closer or pushed back depending on task
- Frees desk surface space

Ergotron LX handles up to 11.3kg and 34" displays — appropriate for the Dell U2723QE. Price: approximately £120. VESA mount compatibility: verify the Dell U2723QE is VESA 100x100 (it is).

**UPS: APC Back-UPS Pro 1500VA (BX1500M or BPN1350M2)**

Power loss during an Ollama inference run, a Playwright test session, or worse — during a Git rebase — can corrupt work. A UPS provides:
- 10–30 minutes of runtime on Mac Studio (the M4 Max is power-efficient — approximately 60–120W typical load)
- Surge protection on the line
- Time to save and gracefully shut down during an extended outage

The APC Back-UPS Pro 1500VA (~£150–200) is appropriate. Connect Mac Studio, display, and any external drives to the UPS-protected outlets. Connect the Mac's USB-C hub or peripherals to the surge-only outlets.

**Storage: Samsung T9 4TB NVMe External SSD**

Ollama stores models in `~/.ollama/models` by default. On a Mac Studio's internal SSD this is wasteful — models are large (20–80GB each), and you want to preserve the internal SSD's life for the OS and applications.

The Samsung T9 connects over USB 3.2 Gen 2 (20Gbps) — fast enough that model loading from the T9 is virtually indistinguishable from internal SSD. It fits in a pocket.

**Configuring Ollama to use the external SSD:**
Set the `OLLAMA_MODELS` environment variable before Ollama starts:
```bash
# Add to ~/.zshrc:
export OLLAMA_MODELS="/Volumes/Samsung T9/ollama-models"
```
Ensure the drive is mounted before launching Ollama. If the drive is not present, Ollama will fall back to its default path — add a check to your startup script.

**Audio: Sony WH-1000XM5 (or Sennheiser Momentum 4 Wireless)**

ABLE is a music platform. You will spend significant time testing audio features, reviewing artist content, and evaluating how music sounds in context. Cheap headphones give you an inaccurate picture of what artists and fans are experiencing.

The Sony WH-1000XM5 has:
- Class-leading active noise cancellation — useful for deep work in noisy environments (co-working spaces, cafes when nomading)
- Accurate sound signature with good bass extension — representative of how most listeners experience music
- 30-hour battery, USB-C charging
- Multipoint Bluetooth (can connect to Mac Studio and iPhone simultaneously)

Alternative for more accurate sound (less consumer-tuned): **Sennheiser Momentum 4 Wireless** — slightly more reference-tuned, excellent for evaluating music as the artist intended.

Price range: £250–350 either option.

**Webcam: Elgato Facecam Pro (or Insta360 Link)**

For Loom recordings (artist onboarding calls, marketing walkthroughs, async communication):
- **Elgato Facecam Pro**: 4K60fps, fixed lens tuned for desk distance, excellent low-light performance. No driver required — UVC compliant. ~£200
- **Insta360 Link**: AI tracking (follows you if you move), 4K, good auto-exposure. Useful if you move around during recordings. ~£180

Either is a significant step up from the built-in camera on a MacBook Pro for professional-looking Loom content.

---

### 1.3 Travel Setup (Digital Nomad Configuration)

**Primary travel machine: MacBook Pro M4 Pro 36GB**

36GB unified memory is enough for:
- Claude Code + VS Code + Safari simultaneously without swapping
- Qwen2.5-Coder 32B and Phi-4 14B local models (lighter inference for travel)
- n8n can run locally on the MacBook if the Mac Studio is off
- Day-to-day ABLE development work

It cannot run DeepSeek-R1 70B or Llama 3.3 70B at full speed — for heavy reasoning tasks when travelling, use Claude API (Claude Code) instead of local inference.

**Portable monitor: ASUS ZenScreen MB16QHD (16", 2560×1600 USB-C)**

A 16" portable monitor weighing approximately 900g extends the travel workspace significantly. Connected via USB-C (single cable for video and power from the MacBook). This is the correct tradeoff: light enough to carry everywhere, enough screen space to have code and a browser open simultaneously. Price: approximately £200–250.

Do not carry a full-size 27" monitor while travelling. The portable option is genuinely useful; a heavy monitor is a liability.

**Power adaptors:**

| Destination | Plug type | Notes |
|---|---|---|
| Portugal | Type F (Schuko) | EU standard — buy a UK→EU adaptor or a GaN multi-adaptor |
| Colombia | Type A/B | Same as North America — US plugs work natively |
| Dubai (UAE) | Type G | Same as UK — UK plugs work natively |
| Thailand | Type A/B/C | Permissive — UK plugs often fit, but carry an adaptor |

Universal recommendation: **Satechi 165W GaN USB-C charger** (4 ports: 2x USB-C, 2x USB-A) with a **Condor travel adaptor set** (4 in 1, all regions). One adaptor covers you everywhere. Total weight: under 300g for the pair.

**VPN: Mullvad**

Mullvad is the recommendation over ProtonVPN for the following reasons:
- No account — you pay with a random account number. No email address associated with your subscription.
- Accepts cash and cryptocurrency — maximum privacy
- WireGuard protocol by default — faster and more reliable than OpenVPN
- No-logging policy, independently audited
- £5/month flat

Use on all public WiFi (co-working spaces, cafes, hotels) without exception. Artists' data, fan data, Supabase credentials — all of these are in transit during a normal working session. Unencrypted public WiFi is a real risk.

Additionally useful: Mullvad allows you to appear as a UK IP address when needed (banking, some tools that restrict by region).

**Portable SSD for travel backups: Samsung T7 Shield 2TB**

The T7 Shield is rugged (IP65 rating — dust and water resistant) and lightweight (~100g). Carry this in your bag at all times when travelling. Time Machine-style manual backups every few days. Cost: approximately £130.

Do not rely on Git alone when travelling — the T7 is insurance against losing a machine between commits.

---

### 1.4 RAM Allocation — Local LLMs vs. System

At 128GB (Mac Studio), the practical allocation is:

| Component | RAM usage |
|---|---|
| macOS + background services | 8–12GB |
| Chrome / Safari (10 tabs) | 4–8GB |
| VS Code + extensions | 1–3GB |
| n8n (self-hosted) | 500MB–2GB |
| Claude Code + tools | 1–2GB |
| DeepSeek-R1 70B (Q4) | ~44GB |
| Qwen2.5-Coder 32B (Q4) | ~20GB |
| **Total with two large models** | ~80–90GB |
| **Headroom** | 38–48GB |

You can run both large models simultaneously with a full development environment open. No need to unload models between tasks.

At 36GB (MacBook Pro), the allocation is tighter:

| Component | RAM usage |
|---|---|
| macOS + apps | 6–10GB |
| Qwen2.5-Coder 32B (Q4) | ~20GB |
| Phi-4 14B (Q4) | ~9GB |
| **Total with two models** | ~35–39GB |

On the MacBook, you can run Qwen2.5-Coder OR Phi-4 alongside a working development environment, but not both large models simultaneously. Phi-4 is usually sufficient for quick tasks on the road.

---

### 1.5 Ergonomics Protocol — C5/C6 Specific

This is not optional. A herniated cervical disc that worsens has consequences for both your health and your ability to work. The setup cost is a one-time investment; the ongoing cost is discipline with the protocol.

**Screen position:**
- Top edge of the display at or just below eye level when sitting upright
- Screen tilted slightly backward (5–10°) so the viewing angle is neutral
- Screen at arm's length (approximately 60cm)
- Never look down at a laptop screen for extended periods — if working from the MacBook without external display, use a laptop stand (Nexstand or Roost) and a separate keyboard/mouse

**Keyboard and mouse position:**
- Elbows at approximately 90° (forearms roughly parallel to floor)
- Wrists in neutral position — no dorsiflexion (wrists bent up) or ulnar deviation
- Keyboard flat or with negative tilt (front edge slightly higher than back) rather than raised at the back — the raised-back position encourages wrist extension
- Mouse at the same height as the keyboard, directly adjacent — avoid reaching out or across for the mouse

**Break schedule:**
- 25 minutes working → 5-minute break (Pomodoro cadence, enforced by Focus Flow app or simple timer)
- Stand at least once every hour
- On every break: stand, take 3–5 deep breaths, do 2–3 shoulder rolls and neck retractions (chin tuck — not neck circles)
- Every 90 minutes: a proper break (5–10 minutes walking, not scrolling a phone)

**Neck chin-tuck exercise (most important single exercise for C5/C6):**
Gently retract the chin straight back (as if making a double chin). Hold for 3 seconds, release. Repeat 10 times. This decompresses the posterior cervical discs and corrects forward head posture. Do this every Pomodoro break. Source: McKenzie Method — authoritative reference at mckenzieinstitute.org.

**Red light therapy:**
- Device: **Mito Red Light MitoMID** (630nm and 850nm dual-wavelength, ~£300–450)
- Protocol: 10–20 minutes per session, 5–10cm distance, targeting upper back and neck
- Timing: morning is ideal (photobiomodulation research suggests morning application has better circadian alignment), but any consistent time is fine
- Frequency: daily
- The 850nm near-infrared wavelength penetrates tissue to the disc level and has evidence for reducing inflammatory markers in disc tissue. 630nm works at the surface layer (skin, surface muscle)
- Can be used while standing at your desk reading — no active attention required

**Sleep position:**
- On your back: place a pillow under your knees to reduce lumbar and cervical extension
- On your side: place a pillow between your knees to keep the spine neutral, and use a cervical pillow (Tempur-Pedic or similar) that fills the space between ear and shoulder
- Never on your stomach — this hyperextends the cervical spine for hours and is directly contraindicated for cervical disc herniations

---

## Part 2: Software Stack

### 2.1 Development

**Claude Code**
Primary AI development agent. Currently configured with Playwright MCP for automated browser testing. The development loop runs: you write a brief → Claude Code implements → Playwright MCP verifies → you approve.

Key settings: see `docs/systems/hardware-software/SETUP.md Part 3` for `.claude/settings.json` configuration.

Cost: approximately £60/month (Pro subscription, heavy usage).

**VS Code**
Editor for reviewing diffs, reading files, and light editing when not issuing agent instructions. Not the primary development environment — Claude Code is. VS Code is the inspection tool.

Essential extensions:
- **GitLens** — inline git blame, history, and diff visualisation
- **Error Lens** — inline error highlighting without opening the Problems panel
- **Prettier** — formatting on save (even for single-file HTML/JS, keeps things clean)
- **ES Lint** — catches JS errors before they reach the browser
- **Live Server** — serve HTML files locally with hot reload for rapid visual checking
- **Tailwind CSS IntelliSense** — if Tailwind is ever introduced
- **Auto Rename Tag** — renames paired HTML tags simultaneously

Theme: **One Dark Pro** or **Catppuccin Mocha** — dark themes reduce eye strain for long sessions.

**Terminal: Warp**
Warp is recommended over iTerm2 because:
- AI command suggestions inline (useful for remembering git and CLI flags)
- Block-based output: each command's output is a discrete block you can collapse, search, and copy
- Collaborative sessions: share a terminal session URL (useful when debugging with an async collaborator)
- SSH sessions with persistent reconnect

If you prefer a simpler, proven tool: **iTerm2** with Oh My Zsh and the Powerlevel10k theme is the industry-standard choice. More stable, less opinionated.

**Git configuration:**
```bash
# Global config
git config --global user.name "James Cuthbert"
git config --global user.email "james@ablemusic.co"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main
git config --global pull.rebase false

# SSH signing (recommended over GPG — simpler setup)
git config --global gpg.format ssh
git config --global user.signingKey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```

Generate an Ed25519 key if you don't have one:
```bash
ssh-keygen -t ed25519 -C "james@ablemusic.co"
```
Add the public key to GitHub → Settings → SSH keys → Signing Keys.

**Node.js via nvm:**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install LTS (currently Node 20)
nvm install --lts
nvm use --lts
nvm alias default node
```
Keep on LTS (Long-Term Support) channel. Do not chase latest versions for a stable production environment.

**Playwright:**
Installed and configured via MCP. For standalone CLI use:
```bash
npm install -g @playwright/test
playwright install chromium webkit
```

---

### 2.2 Local AI

**Ollama**
Runtime for local LLMs. Install at `ollama.com/download` — native macOS app.

Models to install and their purposes:

| Model | Pull command | Approx size | Primary use |
|---|---|---|---|
| DeepSeek-R1 70B | `ollama pull deepseek-r1:70b` | ~45GB | Strategy, complex reasoning, architecture decisions |
| Llama 3.3 70B | `ollama pull llama3.3:70b` | ~45GB | General writing, fast iteration, editing |
| Qwen2.5-Coder 32B | `ollama pull qwen2.5-coder:32b` | ~20GB | Code generation, code review, routine dev tasks |
| Phi-4 14B | `ollama pull phi4` | ~9GB | Quick lookups, email drafts, fast responses |
| Llama 3.2 3B | `ollama pull llama3.2:3b` | ~2GB | Always-on monitoring, n8n inline tasks, instant |

Model storage on Samsung T9:
```bash
# In ~/.zshrc:
export OLLAMA_MODELS="/Volumes/Samsung T9/ollama-models"
```

Performance settings — in `~/.ollama/config` or via environment:
```bash
export OLLAMA_NUM_PARALLEL=2     # Run 2 concurrent requests
export OLLAMA_MAX_LOADED_MODELS=2 # Keep 2 models warm in memory
```

**Open WebUI** (optional, recommended)
A browser-based chat interface for Ollama models. Useful for long-form conversations with DeepSeek-R1 where the chat format is more natural than the CLI.

Install via Docker:
```bash
docker run -d --name open-webui \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  --add-host=host.docker.internal:host-gateway \
  ghcr.io/open-webui/open-webui:main
```
Access at `http://localhost:3000`. Connect to Ollama at `http://host.docker.internal:11434`.

Memory allocation note: Open WebUI itself uses very little RAM (~200MB). The model RAM usage is entirely in Ollama.

---

### 2.3 Automation

**n8n (self-hosted on Mac Studio)**
The central automation layer. Connects Supabase, email, market data, Slack/Discord, accounting.

Install natively (preferred over Docker for Mac — better performance, no VM overhead):
```bash
npm install -g n8n
n8n start
```
Access at `http://localhost:5678`.

To run n8n as a persistent background service (survives restarts):
```bash
# Install pm2
npm install -g pm2

# Start n8n with pm2
pm2 start n8n -- start
pm2 save
pm2 startup  # Follow the instructions it outputs
```

Key workflows to build (in priority order):
1. New Supabase artist signup → Loops welcome sequence trigger
2. New fan capture → admin analytics update
3. Daily market digest (07:00) → Ollama analysis → Telegram notification
4. Weekly financial summary → FreeAgent pull → Telegram digest
5. Artist inactivity (14 days no login) → re-engagement email trigger

**Docker Desktop**
Install from `docker.com`. Used for Open WebUI (above) and any other containerised services.

Recommended Docker resource allocation (Mac Studio 128GB):
- CPUs: 8 (of available)
- Memory: 8GB (conservative — increase if running more containers)
- Swap: 2GB

**Cron jobs (outside n8n):**
Only for things that must run even when n8n is down:
```bash
# Edit crontab:
crontab -e

# Daily Time Machine backup verification (run at 06:00):
0 6 * * * tmutil latestbackup >> ~/logs/time-machine.log 2>&1

# Weekly git status check across all repos (Sunday 09:00):
0 9 * * 0 find ~/Projects -name ".git" -maxdepth 3 -exec git -C {} status --short \; >> ~/logs/git-status.log 2>&1
```

---

### 2.4 Design

**Figma**
Browser-based — no installation needed. Use for wireframes, component mockups, and any design work that needs to be shared with collaborators or future designers.

Workspace organisation: one Figma file per major surface (`Artist Profile`, `Admin Dashboard`, `Onboarding`, `Landing Page`). Use the design tokens from `CLAUDE.md` as Figma variables to keep parity between design and code.

**ImageOptim**
Free macOS app. Drag-and-drop compression for PNG, JPEG, and SVG. Use before adding any image asset to an ABLE HTML file. Target: under 200KB for any image used in a web page.

Download at `imageoptim.com`.

**ScreenStudio**
For beautiful product demo recordings — adds device frames, backgrounds, zoom/pan, and export suitable for marketing. Use for:
- Artist onboarding demo recordings
- LinkedIn / Twitter product previews
- Loom recordings for artist outreach

Alternative for 3D device mockups: **Rotato** — renders product screenshots inside realistic iPhone/MacBook frames. Good for landing page hero images.

---

### 2.5 Productivity

**Notion**
ABLE project management workspace. Structure:
- ABLE Roadmap database (feature status, priority, owner)
- Artist outreach tracker (300 targets in Stage 1 — see master strategy)
- Meeting notes database (all artist calls, tagged by artist name)
- Weekly review template (Monday: review previous week, set current week's one goal)

Keep Notion for project management and notes. Do not use it for technical documentation (use the `docs/` folder in the repo — it's versioned and closer to the code).

**Linear**
Bug and feature issue tracking. Preferred over Jira because:
- Fast keyboard-driven interface (everything accessible via cmd+K)
- Designed for small, fast-moving teams
- Cycles (like sprints) are lightweight and optional
- Integrates with GitHub for automated issue status updates on PR merge

Use for: tracking bugs found during Playwright audits, feature requests from artist interviews, release planning.

**1Password**
All credentials — no exceptions. Every service, every API key, every Supabase password. Organise into vaults:
- **Personal** — personal accounts
- **ABLE Labs** — all business credentials (Stripe, Supabase, Resend, Netlify, etc.)
- **Shared** — if/when you have team members

Enable family sharing (or team) from day one even if you are the only member — easier to add people later.

Browser extension installed in Chrome and Safari. SSH key integration via 1Password CLI for automated credential access in scripts.

Cost: approximately £4/month.

**Loom**
Record and share video messages — used for:
- Personal artist outreach (a 90-second Loom referencing their specific music is far more effective than a text email)
- Async onboarding walkthrough for new artists
- Bug reports to yourself (record exactly what you did and what broke)

Free tier: 25 videos, 5 minutes each — enough for early stage. Upgrade to Starter (~£8/month) when this becomes limiting.

**Calendly**
Embedded in admin.html for booking artist onboarding calls. Use the free tier for basic scheduling. Connect to your primary calendar. Set availability windows that protect your deep work hours (see Focus modes below).

---

### 2.6 Communication

**Discord — primary community + team comms**
Not Slack. Discord because:
- Free for all tiers relevant to early-stage ABLE
- Voice + text + threads — sufficient for all async communication
- Familiar to the artist and music community (most independent musicians are already on Discord)
- Community channels (artist-facing ABLE community) and team channels (internal, private) can coexist in the same server with role-based permissions

Server structure:
- `#general` — team channel
- `#build-log` — Claude Code commits auto-posted via webhook
- `#n8n-alerts` — n8n automation notifications
- `#artists-general` — community channel for artists using ABLE
- `#feedback` — feature requests from artists

**Whereby — video calls**
No download required for the person joining — artists join via browser link. This reduces friction for onboarding calls: you send a link, they click it, they are in the call. No app install, no account creation required.

Cost: approximately £12/month for Pro (custom meeting room URL, unlimited meetings).

**Telegram — personal n8n notifications**
n8n can send Telegram messages to your personal account via the Telegram Bot API. Use for:
- Daily market digest (morning, brief, actionable only if something requires attention)
- Weekly financial summary
- Critical alerts (Supabase down, payment failure, high error rate)

Telegram is preferable to email for alerts because it arrives in a separate channel, does not blend with business email, and can be muted easily.

Setup: create a bot via @BotFather in Telegram → get API token → use the Telegram node in n8n.

---

### 2.7 Finance

**FreeAgent**
UK-focused accounting software. Key integrations:
- Starling Business bank account: automatic transaction import via open banking
- Self Assessment: auto-calculates tax liability
- VAT: auto-computes quarterly VAT return
- Invoicing: create and send invoices from within FreeAgent

Cost: approximately £19/month (Sole Trader or Ltd Company plan depending on structure).

Connect to Starling immediately on ABLE Labs Ltd incorporation. Every transaction is categorised from day one. Do not defer this — re-doing months of bank statements is painful.

**Stripe Dashboard**
Revenue monitoring. Use the default Stripe Dashboard for revenue tracking — no custom tool needed until MRR is above £10k/month. At that point, a Stripe → n8n → custom analytics integration becomes valuable.

Key metrics to monitor weekly: MRR, new subscriptions, churned subscriptions, net MRR change.

**BullionVault**
For physical gold and silver position management. UK-based, FCA regulated, insured vault storage in London, Zurich, New York. Access via browser — no app required (though an app exists). Check position once per week alongside your market digest, not daily.

---

### 2.8 Security

**1Password** — see section 2.5.

**Mullvad VPN** — see section 1.3.

**Little Snitch** (recommended)
Little Snitch monitors all outgoing network connections from your Mac and alerts you when an app connects to the internet for the first time. This is particularly valuable because:
- You will run code from Claude Code agents — Little Snitch ensures you can verify what is actually connecting to the internet
- Identifies background processes sending data you weren't aware of

Cost: approximately £40 one-time. Download at `obdev.at/products/littlesnitch`.

Alternative (free, open source): **LuLu** by Patrick Wardle — same concept, free. Less polished UI.

**FileVault — verify it is on:**
System Settings → Privacy & Security → FileVault → must show "FileVault is turned on." If it is off, enable it. Full disk encryption means if your Mac is stolen or lost, the data is unreadable without your password.

On M-series Macs, FileVault uses the Secure Enclave for key storage and has no measurable performance impact.

**Two-factor authentication — Authy**
Install Authy for TOTP codes. Do not use SMS 2FA for any critical account — use TOTP (Authy) or hardware key.

Authy is preferred over Google Authenticator because:
- Encrypted cloud backup (recoverable if you lose your phone)
- Multi-device sync (access codes on iPhone and iPad without re-scanning QR codes)

Every account that offers 2FA should have it enabled. Critical accounts: GitHub, Netlify, Supabase, Stripe, 1Password, domain registrar, Cloudflare.

---

### 2.9 macOS System Settings

**Night Shift:** System Settings → Displays → Night Shift → Schedule: Sunset to Sunrise. Reduces blue light emission in the evening, supporting circadian rhythm and sleep quality. Relevant to both general health and the C5/C6 recovery protocol (poor sleep delays disc healing).

**Do Not Disturb:** System Settings → Focus → add a "Deep Work" focus mode. Schedule for your primary build hours (e.g., 09:00–13:00 and 15:00–19:00). Allow: Calendar alerts, calls from specific contacts. Block: everything else.

**Hot corners (recommended configuration):**
- Top right: Mission Control (see all spaces and windows)
- Bottom right: Lock screen (when walking away from desk)
- Bottom left: Desktop (clear all windows quickly)
- Top left: Screensaver (optional)

Set in System Settings → Desktop & Dock → Hot Corners.

**Mission Control spaces — recommended organisation:**
- Space 1: ABLE development (VS Code + Terminal + Browser/DevTools)
- Space 2: Communication (Discord + Email)
- Space 3: Reference (Notion + Docs + Research)
- Space 4: Personal (personal browsing, non-work)

Assign apps to specific spaces: right-click the app in Dock → Options → Assign to [space].

**Focus modes:**
- **Deep Work:** Block all notifications. Allow Calendar and selected contacts. Active during primary build hours.
- **Work:** Standard notification settings, all work apps. Active during reactive hours.
- **Personal:** Block all work app notifications. Active after 20:00 and weekends (your discretion — the C5/C6 recovery protocol explicitly requires proper rest periods).

---

## Part 3: Development Environment Configuration

### 3.1 Claude Code — `.claude/settings.json`

Current configuration at `/Users/jamescuthbert/Desktop/ABLE  MERGED/.claude/settings.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "type": "stdio"
    }
  },
  "permissions": {
    "allow": [
      "Bash(git:*)",
      "Bash(node:*)",
      "Bash(npx:*)",
      "Bash(npm:*)",
      "Bash(ls:*)",
      "Bash(mkdir:*)",
      "Bash(cp:*)",
      "Bash(mv:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(git reset --hard:*)",
      "Bash(git checkout -- :*)"
    ]
  }
}
```

Best practices:
- Never add environment variables or API keys to `settings.json` — it is committed to git
- Add new MCP servers here when they are validated (n8n MCP, Supabase MCP when available)
- The deny list is a safety net, not a complete security boundary — Claude Code operates within the repository's trust boundary regardless

### 3.2 Git Global Configuration

**Global `.gitignore` at `~/.gitignore_global`:**
```
# macOS
.DS_Store
.AppleDouble
.LSOverride
._*
.Spotlight-V100
.Trashes

# Environment
.env
.env.local
.env.*.local
*.local

# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*

# Build output
dist/
build/
.next/
.nuxt/

# Editor
.vscode/
.idea/
*.swp
*.swo

# Secrets
*.pem
*.key
credentials.json
service-account.json
```

Register globally:
```bash
git config --global core.excludesfile ~/.gitignore_global
```

**SSH key setup for GitHub:**
```bash
# Generate key
ssh-keygen -t ed25519 -C "james@ablemusic.co" -f ~/.ssh/id_ed25519_github

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519_github

# Add to ~/.ssh/config:
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github

# Test connection
ssh -T git@github.com
```

Add the public key to GitHub → Settings → SSH and GPG keys → New SSH key.

### 3.3 Environment Variables Management

**Local development:**
- `.env` files live in the project root and are never committed (`.gitignore` enforced)
- Reference from code using `process.env.VARIABLE_NAME`
- Maintain a `.env.example` file (committed) that lists all required variables with placeholder values

```bash
# .env.example (committed — no real values)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=re_xxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxx
```

**Production (Netlify):**
All environment variables set in Netlify dashboard → Site settings → Environment variables. Never hardcoded in functions or HTML.

**Testing Netlify functions locally:**
```bash
npm install -g netlify-cli
netlify login
netlify dev  # Starts local dev server at localhost:8888 with function emulation
```
`netlify dev` emulates the production environment including environment variable injection from your local `.env` file.

### 3.4 Browser Configuration for Development

**Chrome — primary development browser:**
- DevTools: F12 or Cmd+Option+I
- Mobile emulation: DevTools → Toggle device toolbar (Cmd+Shift+M) — set to iPhone 14 Pro (393×852) for primary ABLE testing
- Extensions: React DevTools (for any React work), Lighthouse (performance auditing), axe DevTools (accessibility)
- Profile: use a separate Chrome profile for ABLE development to avoid mixing personal bookmarks and extensions

**Safari — iOS testing:**
ABLE's primary user is an iPhone owner. Safari on macOS is the closest proxy to Mobile Safari behaviour. Test in Safari after any change to:
- CSS animations and transitions (WebKit handles these differently to Blink)
- Video embeds (Safari has stricter autoplay policies)
- Backdrop-filter (the Glass theme — WebKit requires vendor prefix in some versions)
- Form input behaviour (iOS Safari keyboard pushes the viewport up — verify layout holds)

Enable Safari developer tools: Safari → Settings → Advanced → Show features for web developers.

**Firefox — accessibility testing:**
Firefox's accessibility inspector is excellent for checking colour contrast ratios and ARIA attribute coverage. Use when building new components to verify WCAG 2.1 AA compliance.

---

## Part 4: Backup and Resilience

### 4.1 Code Backup

Git is the primary backup for all code. Rules:
- Commit after every logical chunk (as per CLAUDE.md rule 6)
- Never work directly on `main` — always branch
- Push to remote (GitHub) at the end of every working session
- If a session ends with uncommitted work: at minimum, `git stash` — never leave modified files without any form of version snapshot

GitHub private repository. Ensure 2FA is enabled on GitHub with Authy.

### 4.2 Documents and Strategy

The `docs/` folder is inside the Git repository. Every strategy document, system spec, and planning document is versioned and backed up with every push. This is intentional — documentation is as important as code.

Secondary backup: Time Machine includes everything in `~/Desktop/ABLE  MERGED` (verify the folder is not excluded from Time Machine backups).

### 4.3 Machine Backup

**Time Machine:**
- Connect external SSD (Samsung T9 2TB, separate from the Ollama model drive, or partition the 4TB T9)
- System Preferences → Time Machine → Select Backup Disk → choose the external SSD
- Frequency: hourly by default when drive is connected — leave the drive connected at your main workstation
- Retention: Time Machine keeps hourly backups for 24 hours, daily for a month, weekly beyond that

**Bootable clone — monthly:**
SuperDuper (free for basic backup) or Carbon Copy Cloner (£35 one-time). Creates a bootable copy of the entire Mac Studio drive. If the internal SSD fails, you boot from the clone and are operational within minutes.

Schedule: first Sunday of each month, runs automatically when the clone drive is connected.

**Recovery time objective:**
If Mac Studio fails completely:
- MacBook Pro is available and configured
- GitHub has all code
- Time Machine has documents, models are on external SSD
- Target: operational on MacBook Pro within 30 minutes

### 4.4 Supabase Data

- Free plan: 7 days point-in-time recovery
- Pro plan (£25/month): daily backups, 30 days retention

Upgrade to Pro before ABLE has real user data (any production artist or fan data). The data is the product — losing it is not recoverable in the way code is.

For critical pre-production safety: export the Supabase database manually weekly:
```bash
# Via Supabase CLI
supabase db dump --db-url "postgresql://..." > backup-$(date +%Y%m%d).sql
```
Store the export in a private, encrypted location (1Password Document or Cryptomator-encrypted folder on the Samsung T9).

---

## Part 5: The Nomad Configuration

### 5.1 Standard Operating Procedure for Each Location

Before leaving for a new location:
1. Full Time Machine backup completed and verified
2. All Git changes committed and pushed to remote
3. Mullvad VPN configured for destination country's servers
4. Check if any critical services have IP allowlists that need updating (Supabase, for example, can restrict by IP)
5. Pack: MacBook Pro, Samsung T7 Shield 2TB, portable monitor, GaN charger, universal travel adaptor, headphones

On arrival:
1. Connect to accommodation WiFi only via Mullvad VPN (turn on Mullvad before connecting to local WiFi — always)
2. Buy a local SIM for mobile data backup (primary backup internet source when accommodation WiFi is unreliable)
3. Test Supabase, GitHub, and Netlify connectivity
4. Verify n8n on the Mac Studio at home is still running (connect to home via SSH if needed)

### 5.2 Location-Specific Notes

**Portugal (UTC+0/+1 — Western European Time):**
- Same timezone as the UK (UTC+0 winter, UTC+1 summer) — zero adjustment for UK business hours
- D8 Digital Nomad Visa required for stays over 90 days (income threshold: approximately €3,040/month gross)
- SIM recommendation: NOS or Vodafone PT — good coverage in Lisbon, Porto, and Algarve
- Co-working: Second Home (Lisbon), The Base (Porto), Remote Work Portugal list at remoteworkporugal.com
- Power: Type F (Schuko) — buy UK→EU adaptors before travelling

**Colombia, Medellín (UTC-5):**
- UK is UTC-5 + 5 hours ahead = morning in UK is morning in Medellín (ideal overlap)
- 90-day tourist visa on entry for UK passport holders, extendable
- SIM recommendation: Claro Colombia or Tigo — 4G coverage good in El Poblado
- Co-working: Selina (El Poblado), Espacio Vacío, Homework
- Power: Type A/B — same as North America, adaptor not needed for UK plugs in most cases (or carry a universal adaptor)
- Internet note: speeds variable — always confirm fibre availability at accommodation before booking. Budget for a mobile data backup plan (Claro prepaid data is inexpensive).

**Dubai (UTC+4):**
- UK is UTC+4 - 4 hours = UK morning is midday in Dubai (good for UK calls in your afternoon)
- Tourist visa: UK passport holders get free 30-day visa on arrival (extendable to 60 days online)
- SIM recommendation: du or Etisalat (e&) — both have good coverage
- Power: Type G — same as UK, no adaptor needed
- Internet: excellent in hotels and co-working spaces. Potential VPN requirement note: UAE technically restricts VoIP via consumer VPNs but WireGuard protocol (Mullvad) typically works without issue. Verify before critical calls.
- Cost note: Dubai is significantly more expensive than the other nomad locations. Budget ~£2,500–4,000/month for comfortable accommodation and living.

**Thailand, Chiang Mai (UTC+7):**
- UK is UTC+7 - 7 hours = 7am UK time is 2pm in Chiang Mai. UK business hours are late afternoon/evening in Chiang Mai.
- Strategy: do deep build work in the morning (your morning), handle any UK async comms in the afternoon
- LTR Visa (Long-Term Resident) requires proof of £40k/yr income — when that threshold is met, apply. Until then: tourist visa + border run or METV (Multiple Entry Tourist Visa)
- SIM: DTAC or AIS — both excellent, True Move also reliable
- Co-working: Punspace, CAMP (free WiFi in Maya Mall), MANGO co-working
- Power: Type A/B/C — Type C works, but carry a universal adaptor for older sockets

### 5.3 Time Zone Management

Tools that are time-zone-aware and need configuration when location changes:
- Calendly: update your local timezone in Calendly settings — it will adjust booking availability display for visitors
- n8n: set the n8n instance timezone. n8n running on Mac Studio at home will run in UK time regardless of your location — this is correct, as your automations should fire at UK times unless you specifically configure otherwise
- Cron jobs: run in the Mac Studio's timezone — review the schedule if you move the Mac Studio

Working rhythm for non-UK timezones:
- Morning work block: deep build work, no external communication
- Afternoon work block: UK async responses, Discord, email
- Evening (optional): if timezone gap makes UK calls necessary in your evening, limit to 2x per week — protect your evenings for recovery

### 5.4 Offline Capability

Tools that work fully offline:
- Ollama: local models run with no internet connection — this is the primary advantage for travel on slow or unreliable WiFi
- VS Code: fully offline
- Git local operations (commit, branch, diff): offline — push/pull requires internet
- Local n8n instance: runs offline but workflows that call external APIs will fail

Tools that require internet:
- Claude Code (Claude API): requires internet — on poor WiFi, use local Ollama instead
- Supabase: cloud database — read/write requires internet
- Netlify: deployment requires internet
- Stripe: payment processing requires internet
- GitHub push/pull: requires internet

Practical implication: on a plane, you can develop, commit locally, run Ollama, and write documentation. You cannot push, deploy, or access Supabase until you land. This is fine.

---

## Summary — Operating Costs

| Category | Tool | Monthly cost |
|---|---|---|
| Development | Claude Code | ~£60 |
| Automation | n8n (self-hosted) | £0 |
| Database | Supabase (Pro when live) | £0 → £25 |
| Email | Loops.so | £0 → £49 |
| Email delivery | Resend | £0 → £15 |
| Analytics | PostHog (self-hosted) | £0 |
| Accounting | FreeAgent | £19 |
| Legal | Genie AI | £50 |
| Password management | 1Password | £4 |
| VPN | Mullvad | £5 |
| Video calls | Whereby | £12 |
| Video recording | Loom | £0 → £8 |
| Source control | GitHub | £0 (private repos free) |
| **Total pre-revenue** | | **~£150–170/mo** |
| **Total at scale** | | **~£250–280/mo** |

The infrastructure cost is negligible at any meaningful revenue level. The Mac Studio and peripherals are a one-time capital investment with a 5–7 year useful life.
