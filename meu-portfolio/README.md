# Aplicação do portfólio

Aplicação React + Vite do portfólio profissional de Matheus Francisco.

## Scripts

- `npm run dev`: ambiente de desenvolvimento
- `npm run lint`: validação estática
- `npm run build`: build de produção
- `npm run deploy`: publicação da pasta `dist` na branch `gh-pages` (rode a partir de um worktree limpo da `main`)

Os textos em português e inglês e os projetos ficam em `src/content.js`. O build (`npm run build`) gera `dist/index.html` (português) e `dist/en/index.html` (inglês) já com o conteúdo dentro do HTML.

Os currículos em PDF são gerados de `curriculos/curriculo-pt.html` e `curriculo-en.html` com `sh curriculos/gerar.sh` (usa o Edge).

## Domínio próprio e analytics

O site novo não carrega analytics nem scripts de terceiros. O roteiro para domínio próprio e uma possível medição anônima está em [`DOMAIN_AND_ANALYTICS.md`](./DOMAIN_AND_ANALYTICS.md) e só deve ser aplicado quando o domínio estiver registrado.
