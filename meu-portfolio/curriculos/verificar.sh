#!/bin/sh
# Confere os PDFs dos currículos: em dia com os HTMLs, uma página A4 e conteúdo esperado.
# Uso, na pasta meu-portfolio: sh curriculos/verificar.sh [pasta-dos-pdfs]
# Precisa do pdftotext (pacote poppler-utils). Termina com erro se algo falhar.
set -eu

D="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
ASSETS="${1:-$D/../public/assets}"
FAIL=0
erro() { echo "ERRO: $*" >&2; FAIL=1; }

command -v pdftotext >/dev/null 2>&1 || { echo "pdftotext não encontrado (instale poppler-utils)." >&2; exit 2; }

ATUAL="$(cd "$D" && cat curriculo-pt.html curriculo-en.html estilo.css | tr -d '\r' | sha256sum | cut -d' ' -f1)"
SALVO="$(tr -d '[:space:]' < "$D/../public/assets/curriculo-source.sha256")"
if [ "$ATUAL" != "$SALVO" ]; then
  erro "curriculo-source.sha256 não corresponde aos HTMLs atuais. Rode: sh curriculos/gerar.sh e versione os PDFs."
fi

for lang in pt en; do
  PDF="$ASSETS/curriculo-$lang.pdf"
  [ -s "$PDF" ] || { erro "$PDF não existe ou está vazio"; continue; }
  TEXTO="$(pdftotext -enc UTF-8 "$PDF" - | tr -s "[:space:]" " ")"
  PAGINAS="$(pdftotext "$PDF" - | tr -cd '\f' | wc -c | tr -d ' ')"
  [ "$PAGINAS" = "1" ] || erro "curriculo-$lang.pdf tem $PAGINAS páginas (esperado: 1)"
  grep -a -o '/MediaBox *\[[^]]*\]' "$PDF" | grep -q '\[0 0 59[45]\.[0-9]* 841\.[0-9]*\]' || erro "curriculo-$lang.pdf não está em A4"

  contem() { printf '%s' "$TEXTO" | grep -q -F -- "$1" || erro "curriculo-$lang.pdf não contém: $1"; }
  nao_contem() { if printf '%s' "$TEXTO" | grep -q -i -F -- "$1"; then erro "curriculo-$lang.pdf contém texto proibido: $1"; fi; }

  contem "Yamashita Tratores"
  contem "AWS Academy Graduate - AWS Academy Cloud Foundations"
  contem "623"
  for proibido in "CogniVault" "1.107" "1,107" "110 " "300 mil" "2.000" "Cloud Practitioner" "pré-intermediário" "pre-intermediate" "Out 2017" "Oct 2017 -" "cerca de 200" "about 200"; do
    nao_contem "$proibido"
  done
  if [ "$lang" = "pt" ]; then
    contem "Desenvolvedor full-stack júnior"
    contem "Auxiliar de estoque e vendas, depois Vendedor"
    contem "Set 2017 - Set 2020"
    contem "Inglês: intermediário"
    contem "1.491"
    contem "70 E2E"
  else
    contem "Junior Full-Stack Developer"
    contem "Sep 2017 - Sep 2020"
    contem "Stock and sales assistant, then Sales Representative"
    contem "English: intermediate"
    contem "1,491"
    contem "70 end-to-end"
  fi
done

if [ "$FAIL" = "0" ]; then echo "PDFs conferidos: em dia, 1 página A4 cada e conteúdo esperado."; fi
exit "$FAIL"
