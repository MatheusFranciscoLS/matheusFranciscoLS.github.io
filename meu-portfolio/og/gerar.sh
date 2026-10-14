#!/bin/sh
# Gera public/assets/og-matheus-francisco.png (1200x630) a partir de og/og.html, com o Edge.
# Uso, na pasta meu-portfolio: sh og/gerar.sh
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
D="$(cd "$(dirname "$0")" && pwd)"
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=3000 \
  --screenshot="$(cygpath -w "$D/../public/assets/og-matheus-francisco.png")" \
  "file:///$(cygpath -m "$D/og.html")" >/dev/null 2>&1
