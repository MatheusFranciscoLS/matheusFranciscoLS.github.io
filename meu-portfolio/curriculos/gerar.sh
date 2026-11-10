#!/bin/sh
# Gera os PDFs a partir dos HTMLs revisados. Compatível com Git Bash/Windows e Linux.
# Uso, na pasta meu-portfolio: sh curriculos/gerar.sh
set -eu

D="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
ASSETS="$D/../public/assets"

if [ -n "${EDGE_BIN:-}" ]; then
  BROWSER="$EDGE_BIN"
elif [ -n "${BROWSER:-}" ]; then
  BROWSER="$BROWSER"
elif command -v microsoft-edge >/dev/null 2>&1; then
  BROWSER="$(command -v microsoft-edge)"
elif command -v google-chrome >/dev/null 2>&1; then
  BROWSER="$(command -v google-chrome)"
elif command -v google-chrome-stable >/dev/null 2>&1; then
  BROWSER="$(command -v google-chrome-stable)"
elif command -v chromium >/dev/null 2>&1; then
  BROWSER="$(command -v chromium)"
elif command -v chromium-browser >/dev/null 2>&1; then
  BROWSER="$(command -v chromium-browser)"
elif [ -x "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" ]; then
  BROWSER="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
else
  echo "Navegador Chromium/Edge não encontrado. Defina BROWSER ou EDGE_BIN." >&2
  exit 1
fi

for lang in pt en; do
  OUTPUT="$ASSETS/curriculo-$lang.pdf"
  if command -v cygpath >/dev/null 2>&1; then
    OUTPUT="$(cygpath -w "$OUTPUT")"
    INPUT="file:///$(cygpath -m "$D/curriculo-$lang.html")"
  else
    INPUT="file://$D/curriculo-$lang.html"
  fi
  "$BROWSER" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
    --print-to-pdf="$OUTPUT" "$INPUT" >/dev/null
  echo "PDF gerado: curriculo-$lang.pdf"
done
