# ABLE — Telegram Bot Setup
**Version: 1.0 | Written: 2026-03-16**

> Set this up once. Takes 20 minutes. Changes the working model permanently.

---

## Step 1: Create the bot

1. Open Telegram on your phone or desktop
2. Search for `@BotFather` — it has a blue verification tick
3. Start a conversation and send: `/newbot`
4. When asked for a name: `ABLE Operations`
5. When asked for a username: `able_ops_bot` (or `able_notifications_bot` — must end in `bot`)
6. BotFather responds with a token: `1234567890:ABCdef_ghijklmno-pqrst`
7. **Save this token somewhere safe** — 1Password is the right place

---

## Step 2: Get your personal chat ID

1. Open a new chat with the bot you just created (search for its username)
2. Send any message — just "hi" is fine
3. In a terminal, run this (replace `{TOKEN}` with your bot token):

```bash
curl -s "https://api.telegram.org/bot{TOKEN}/getUpdates" | python3 -m json.tool
```

4. In the JSON response, find the `chat` object:
```json
{
  "message": {
    "chat": {
      "id": 123456789,
      "first_name": "James",
      "type": "private"
    }
  }
}
```

5. The `id` number is your personal chat ID. Save it alongside the token.

---

## Step 3: Test the connection

Replace both values and run this:

```bash
curl -s -X POST "https://api.telegram.org/bot{TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": {CHAT_ID},
    "text": "ABLE Operations: connection confirmed."
  }'
```

You should receive a Telegram message within 2 seconds.

---

## Step 4: Store credentials safely

Add both values to 1Password as a "Login" entry named "ABLE Ops Telegram Bot":
- Username: `able_ops_bot`
- Password: (the bot token)
- Notes: `Chat ID: {your chat ID}`

**Never commit the token to git.** Never paste it into a doc that syncs to cloud without encryption.

For use in terminal/scripts, store as environment variables:

```bash
# Add to ~/.zshrc or ~/.bash_profile
export TELEGRAM_BOT_TOKEN="your_token_here"
export TELEGRAM_CHAT_ID="your_chat_id_here"
```

Then in any script:
```bash
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": ${TELEGRAM_CHAT_ID}, \"text\": \"$MESSAGE\"}"
```

---

## Step 5: The reusable notification function

Add this function to your shell profile (`~/.zshrc`):

```bash
notify_telegram() {
  local message="$1"
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -H "Content-Type: application/json" \
    -d "{\"chat_id\": ${TELEGRAM_CHAT_ID}, \"text\": \"$message\"}" > /dev/null
}
```

Usage anywhere in terminal:
```bash
notify_telegram "Agent complete: fan list refactor — 3 commits, no errors."
```

---

## Step 6: Add to agent dispatch instructions

At the bottom of every background agent task brief, include:

```
When this task is complete:
1. Commit all changes with a descriptive message
2. Run this notification:

curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": ${TELEGRAM_CHAT_ID}, \"text\": \"Agent done: [TASK NAME]\n[X] commits\nBranch: [branch]\"}"

If the task could not be completed, send:
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": ${TELEGRAM_CHAT_ID}, \"text\": \"Blocked: [TASK NAME]\nReason: [reason]\nDecision needed: [question]\"}"
```

---

## Step 7: n8n Telegram integration (Phase 2)

When n8n is set up:

1. In n8n, go to **Settings → Credentials → Add Credential**
2. Search for "Telegram"
3. Enter your bot token
4. Save as "ABLE Ops Bot"

Every n8n workflow can now end with a **Telegram node**:
- Node type: "Telegram"
- Credential: "ABLE Ops Bot"
- Operation: "Send Message"
- Chat ID: `{{ $env.TELEGRAM_CHAT_ID }}`
- Text: the message you want to send

### n8n workflow message templates

**New artist sign-up:**
```
New artist: {{ $json.name }}
Source: {{ $json.signup_source }}
Genre: {{ $json.genre || "not set" }}
```

**New fan milestone (100, 500, 1000):**
```
{{ $json.artist_name }} just hit {{ $json.fan_count }} fans.
```

**Weekly digest (Monday 09:00):**
```
Morning. Week of {{ $json.week_start }}:
- New artists: {{ $json.new_artists }}
- New fans: {{ $json.new_fans }}
- MRR: £{{ $json.mrr }}
- MRR change: {{ $json.mrr_delta }}
- Errors: {{ $json.error_count }}
```

**Production error:**
```
ERROR: {{ $json.function_name }} failed
Artist: {{ $json.artist_id }}
Time: {{ $json.timestamp }}
Message: {{ $json.error_message }}
```

---

## Quick reference

| Item | Where it is |
|---|---|
| Bot token | 1Password: "ABLE Ops Telegram Bot" |
| Chat ID | 1Password: "ABLE Ops Telegram Bot" (notes field) |
| Shell function | `~/.zshrc` — `notify_telegram()` |
| n8n credential | Settings → Credentials → "ABLE Ops Bot" |

---

## Troubleshooting

**No message received:**
- Check the token has no extra spaces
- Check you sent a message to the bot before calling `getUpdates`
- The bot must receive at least one message before `getUpdates` returns a chat ID

**`getUpdates` returns empty array:**
- Send another message to the bot, then immediately retry `getUpdates`
- The update window expires after a few minutes

**Telegram returns 400:**
- The `chat_id` must be an integer, not a string — check the JSON formatting
- Special characters in the message text need escaping or use `parse_mode: "HTML"`

**Works in terminal but not in n8n:**
- Check the Telegram credential in n8n uses the correct token
- Check the Chat ID field has no quotes around the number
