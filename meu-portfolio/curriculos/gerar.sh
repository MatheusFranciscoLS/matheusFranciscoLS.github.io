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
  rm -f "$OUTPUT"
  # Some hosted Edge builds keep background processes alive after writing the PDF.
  # Bound the process lifetime, then verify that Chromium actually produced a file.
  timeout 30s "$BROWSER" --headless=new --disable-gpu --no-sandbox \
    --disable-dev-shm-usage --disable-background-mode --disable-extensions \
    --no-first-run --no-default-browser-check --no-pdf-header-footer \
    --print-to-pdf="$OUTPUT" "$INPUT" >/dev/null 2>&1 || true
  if [ ! -s "$OUTPUT" ]; then
    echo "Falha ao gerar curriculo-$lang.pdf" >&2
    exit 1
  fi
  echo "PDF gerado: curriculo-$lang.pdf"
done
