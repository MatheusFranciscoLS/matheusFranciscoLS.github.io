#!/bin/sh
# Gera os PDFs dos currículos com o Edge, sem cabeçalho nem rodapé do navegador.
# Uso, na pasta meu-portfolio: sh curriculos/gerar.sh
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
D="$(cd "$(dirname "$0")" && pwd)"
for l in pt en; do
  "$EDGE" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$(cygpath -w "$D/../public/assets/curriculo-$l.pdf")" \
    "file:///$(cygpath -m "$D/curriculo-$l.html")" >/dev/null 2>&1
done
