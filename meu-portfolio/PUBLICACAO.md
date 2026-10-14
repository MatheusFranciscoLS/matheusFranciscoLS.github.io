# Checklist de publicação

Nada abaixo foi executado. Cada passo de publicação espera a aprovação de Matheus.

## Antes de publicar
- [ ] Revisar os prints (PC e celular, claro e escuro, PT e EN) e aprovar a direção.
- [ ] Confirmar o texto sobre a loja: "O sistema está no ar e começa a ser usado no balcão da loja".
- [ ] Ler os dois currículos em PDF (`public/assets/curriculo-pt.pdf` e `-en.pdf`) e aprovar. O telefone e o e-mail estão no PDF, como no currículo atual.
- [ ] Decidir sobre o formulário de contato (removido nesta versão; ficam e-mail, WhatsApp, LinkedIn e GitHub) e sobre o número do WhatsApp (só no link, não aparece escrito na página).
- [x] `Economia Solidária` fica entre os 4 projetos, apresentada como TCC do SENAI (o repositório `ProjetoFinal` é um fork do trabalho em grupo).

## Publicar (somente depois do "pode publicar")
1. Fazer o merge da branch `redesign/portfolio` na `main` (ou publicar a partir de um worktree limpo dela). Nunca commitar a troca `iot-plataforma.webp` por `.png`.
2. Criar um worktree limpo da `main` já com o redesign: `git worktree add ../portfolio-publicar main`.
3. Dentro de `meu-portfolio/` do worktree: `npm ci`, `npm run lint`, `npm run build`.
4. Conferir `dist/index.html`, `dist/en/index.html` e `dist/estudo-de-caso-cognivault/` (pt e en).
5. `npx gh-pages -d dist` (publica na branch `gh-pages`).
6. Remover o worktree: `git worktree remove ../portfolio-publicar`.

## Depois de publicar
- [ ] Abrir `/`, `/en/` e as duas páginas do estudo de caso no celular e no PC.
- [ ] Testar o link do LinkedIn e do GitHub nos perfis (mesmos endereços de antes).
- [ ] Colar a URL no LinkedIn Post Inspector para atualizar a prévia (imagem nova da home).
- [ ] Enviar `https://matheusfranciscols.github.io/sitemap.xml` no Google Search Console.
- [ ] Trocar o currículo anexado no LinkedIn e nas candidaturas pelos PDFs novos.
- [ ] Domínio próprio e analytics: só depois, conforme `DOMAIN_AND_ANALYTICS.md`.
