#!/bin/sh
# Gera og/banner-github.png (1600x400) a partir de og/banner.html, com o Edge.
# Uso, na pasta meu-portfolio: sh og/gerar-banner.sh
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
D="$(cd "$(dirname "$0")" && pwd)"
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1600,400 --virtual-time-budget=3000 \
  --screenshot="$(cygpath -w "$D/banner-github.png")" \
  "file:///$(cygpath -m "$D/banner.html")" >/dev/null 2>&1
