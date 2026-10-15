#!/bin/sh
# Gera og/capa-linkedin.png (1584x396) a partir de og/capa-linkedin.html, com o Edge.
# Uso, na pasta meu-portfolio: sh og/gerar-capa-linkedin.sh
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
D="$(cd "$(dirname "$0")" && pwd)"
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1584,396 --virtual-time-budget=3000 \
  --screenshot="$(cygpath -w "$D/capa-linkedin.png")" \
  "file:///$(cygpath -m "$D/capa-linkedin.html")" >/dev/null 2>&1
