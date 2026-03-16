#!/bin/bash
# Capture admin.html screenshot for GPT review
# Usage: ./screenshot.sh [optional-label]
# e.g.  ./screenshot.sh home
#       ./screenshot.sh profile

LABEL=${1:-"admin"}
FOLDER="docs/GPT-REVIEW/screenshots"
TIMESTAMP=$(date +"%H%M")
FILE="$FOLDER/${TIMESTAMP}-${LABEL}.png"

# Open the file in Chrome
open -a "Google Chrome" "file://$(pwd)/admin.html"

echo "Opening admin.html... taking screenshot in 3 seconds."
sleep 3

# Capture the frontmost window (-x = no sound)
screencapture -x -o -w "$FILE" 2>/dev/null || screencapture -x "$FILE"

echo "Saved: $FILE"

# Open the folder in Finder so you can drag into GPT
open "$FOLDER"
