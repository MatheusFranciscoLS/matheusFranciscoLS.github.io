#!/bin/sh
# Gera os PDFs a partir dos HTMLs revisados e atualiza public/assets/curriculo-source.sha256.
# Compatível com Git Bash/Windows e Linux.
# Uso, na pasta meu-portfolio: sh curriculos/gerar.sh
# Navegador: defina BROWSER (ou EDGE_BIN) com o caminho do executável. Sem isso, procura
# Chrome/Chromium e depois o Edge. Em caso de falha, o log do navegador é mostrado.
set -eu

D="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
ASSETS="${OUT_DIR:-$D/../public/assets}"

if [ -n "${EDGE_BIN:-}" ]; then
  BROWSER="$EDGE_BIN"
elif [ -n "${BROWSER:-}" ]; then
  BROWSER="$BROWSER"
else
  BROWSER=""
  for candidate in google-chrome google-chrome-stable chromium chromium-browser microsoft-edge; do
    if command -v "$candidate" >/dev/null 2>&1; then
      BROWSER="$(command -v "$candidate")"
      break
    fi
  done
  if [ -z "$BROWSER" ] && [ -x "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" ]; then
    BROWSER="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
  fi
fi

if [ -z "$BROWSER" ] || { [ ! -x "$BROWSER" ] && ! command -v "$BROWSER" >/dev/null 2>&1; }; then
  echo "Navegador Chromium/Chrome/Edge não encontrado. Defina BROWSER ou EDGE_BIN com o caminho do executável." >&2
  exit 1
fi
echo "Navegador: $BROWSER"
"$BROWSER" --version 2>/dev/null || true

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK" 2>/dev/null || true' EXIT

for lang in pt en; do
  OUTPUT="$ASSETS/curriculo-$lang.pdf"
  LOG="$WORK/navegador-$lang.log"
  PROFILE="$WORK/perfil-$lang"
  if command -v cygpath >/dev/null 2>&1; then
    OUTPUT_ARG="$(cygpath -w "$OUTPUT")"
    INPUT="file:///$(cygpath -m "$D/curriculo-$lang.html")"
    PROFILE_ARG="$(cygpath -w "$PROFILE")"
  else
    OUTPUT_ARG="$OUTPUT"
    INPUT="file://$D/curriculo-$lang.html"
    PROFILE_ARG="$PROFILE"
  fi
  rm -f "$OUTPUT"
  # Alguns navegadores deixam processos vivos depois de gravar o PDF: limita o tempo e
  # confere o arquivo. Perfil temporário evita travar em perfis já abertos.
  timeout 60s "$BROWSER" --headless=new --disable-gpu --no-sandbox \
    --disable-dev-shm-usage --disable-background-mode --disable-extensions \
    --no-first-run --no-default-browser-check --no-pdf-header-footer \
    --user-data-dir="$PROFILE_ARG" \
    --print-to-pdf="$OUTPUT_ARG" "$INPUT" >"$LOG" 2>&1 || true
  # Em alguns navegadores o comando volta antes de o arquivo terminar de ser gravado:
  # espera até 60 s o PDF aparecer.
  tentativas=0
  while [ ! -s "$OUTPUT" ] && [ "$tentativas" -lt 60 ]; do
    sleep 1
    tentativas=$((tentativas + 1))
  done
  if [ -s "$OUTPUT" ]; then
    # Confere que o arquivo parou de crescer antes de seguir.
    tamanho_antes="$(wc -c < "$OUTPUT")"
    sleep 1
    while [ "$(wc -c < "$OUTPUT")" != "$tamanho_antes" ]; do
      tamanho_antes="$(wc -c < "$OUTPUT")"
      sleep 1
    done
  fi
  if [ ! -s "$OUTPUT" ]; then
    echo "Falha ao gerar curriculo-$lang.pdf. Saída do navegador:" >&2
    tail -n 40 "$LOG" >&2 || true
    exit 1
  fi
  echo "PDF gerado: curriculo-$lang.pdf"
done

# Hash dos arquivos-fonte: permite ao verificar.sh saber se os PDFs versionados estão em dia.
(cd "$D" && cat curriculo-pt.html curriculo-en.html estilo.css | tr -d '\r' | sha256sum | cut -d' ' -f1) > "$ASSETS/curriculo-source.sha256"
echo "Hash dos fontes atualizado: curriculo-source.sha256"
