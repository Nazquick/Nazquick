#!/bin/bash
# Quick Style Pitch Studio — rebuilds videos.json from the videos in this folder.
# Double-click after adding or removing videos. The backend reads videos.json.
cd "$(dirname "$0")" || exit 1
shopt -s nullglob nocaseglob
out="videos.json"; tmp="$out.tmp"; n=0; sep=""
printf '[\n' > "$tmp"
for f in *.mp4 *.m4v *.mov *.webm; do
  [ -f "$f" ] || continue
  esc=${f//\\/\\\\}; esc=${esc//\"/\\\"}
  size=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f" 2>/dev/null || echo 0)
  printf '%s  {"file":"%s","size":%s}' "$sep" "$esc" "$size" >> "$tmp"
  sep=$',\n'; n=$((n+1))
done
printf '\n]\n' >> "$tmp"
mv -f "$tmp" "$out"
echo ""
echo "  Quick Style — $n video(s) listed in videos.json"
echo "  Upload this folder (with videos.json) when you publish the site."
echo ""
