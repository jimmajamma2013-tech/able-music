# Figma MCP Setup

The Figma MCP (`figma-developer-mcp` by Framelink) lets Claude read your Figma files directly — extracting tokens, components, and layouts, and verifying that what's built matches the design.

---

## Step 1: Get your Figma API key

1. Go to [figma.com](https://figma.com) and sign in
2. Click your profile picture (top-left) → **Settings**
3. Scroll to **Personal access tokens**
4. Click **Generate new token**
5. Name it something like `Claude Code — ABLE`
6. Copy the token (you won't see it again)

---

## Step 2: Add your key to Claude settings

Open `~/.claude/settings.json` and find this block:

```json
"figma": {
  "command": "npx",
  "args": [
    "-y",
    "figma-developer-mcp",
    "--figma-api-key",
   figd_h7ocsfo8AC254Q1SAcyVQnaSFPxAcPExuptfj3qPs
  ],
  "env": {}
}
```

Replace `FIGMA_API_KEY_PLACEHOLDER` with your actual token:

```json
"figma": {
  "command": "npx",
  "args": [
    "-y",
    "figma-developer-mcp",
    "--figma-api-key",
    "figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  ],
  "env": {}
}
```

Save the file, then restart Claude Code for the MCP to connect.

---

## Step 3: Verify it's working

In a new Claude Code session, ask:

> "List the available Figma tools"

You should see tools like `get_file`, `get_node`, `get_styles`, `get_components` appear.

---

## How to use it

### Read a Figma file
Paste a Figma file URL and ask Claude to read it:

> "Read my Figma file at https://www.figma.com/file/ABC123/ABLE-Design-System and extract the colour tokens"

Claude will pull the design data directly — no export needed.

### Verify implementation matches design
> "Compare the hero section in able-v7.html against the Hero frame in my Figma file [URL]. Flag any spacing, colour, or typography differences."

### Extract design tokens
> "Extract all colour styles and text styles from my Figma file [URL] and tell me if they match the tokens in CLAUDE.md"

### Check a specific component
> "Read the Fan Signup Card component from my Figma file [URL] and check whether the implementation in able-v7.html matches it."

---

## ABLE-specific use cases

| Use case | What to say to Claude |
|---|---|
| Verify accent colour implementation | "Check that --color-accent matches the accent swatch in my Figma file [URL]" |
| Audit typography | "Compare font sizes and weights in the Hero section of able-v7.html against the Figma frame [URL]" |
| Push a built component to Figma | "I've built the Snap Card component. Create a Figma frame from it that I can add to my design system." |
| Extract spacing system | "Read my Figma file and extract the spacing scale — I want to verify it matches the 8px grid in CLAUDE.md" |
| Sync design tokens | "My Figma file has updated brand colours. Read it and tell me which CSS custom properties in able-v7.html need updating." |

---

## Notes

- The MCP runs via `npx` — no global install needed, it downloads on first use
- Your API key gives read access to files you own or have been shared on
- The key is stored in `~/.claude/settings.json` — keep that file private, do not commit it
- Figma rate limits: 1000 requests/minute on Personal plan, sufficient for normal use

