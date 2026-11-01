# Matheus Francisco: Portfólio

Código do portfólio de [Matheus Francisco](https://matheusfranciscols.github.io), desenvolvedor full-stack júnior em Limeira, SP. O site apresenta cinco sistemas publicados, cada um com o problema que resolve, o que foi construído e como foi provado que funciona.

## O que o site mostra

- **Sistemas no ar:** a primeira tela confere, no navegador de quem visita, se cada um dos cinco sistemas responde.
- **Vardão Central:** o sistema que uma revenda Husqvarna usa todos os dias (balcão, CRM, financeiro e estoque). Código privado; tem [estudo de caso](https://matheusfranciscols.github.io/estudo-de-caso-vardao-central/).
- **Site da Vardão Máquinas:** o site institucional da mesma empresa (A Vardão, assistência técnica, linhas de produtos e contato). Código privado, da empresa; tem [estudo de caso](https://matheusfranciscols.github.io/estudo-de-caso-vardao-maquinas/).
- **Plataforma IoT Industrial** e **BusinessFlow:** código aberto, com README e decisões técnicas. A Plataforma IoT também tem [estudo de caso](https://matheusfranciscols.github.io/estudo-de-caso-plataforma-iot/).
- **Economia Solidária:** TCC do SENAI, feito em equipe (minha parte: o front-end em React).
- Conteúdo completo em português e inglês, tema claro e escuro, currículo em PDF e navegação acessível.

## Como é feito

React 19 e Vite, com CSS próprio e fontes locais (`@fontsource`). O build pré-renderiza as páginas em HTML (`scripts/prerender.mjs`), então o conteúdo já vem dentro do HTML em português (`/`) e em inglês (`/en/`). Os estudos de caso são páginas estáticas em `meu-portfolio/public/`. Não há analytics nem scripts de terceiros.

Os textos e os projetos ficam em `meu-portfolio/src/content.js`. Os currículos em PDF são gerados de `meu-portfolio/curriculos/*.html` e a imagem de compartilhamento de `meu-portfolio/og/`.

## Desenvolvimento local

```bash
cd meu-portfolio
npm install
npm run dev
```

Validação:

```bash
npm run lint
npm run build
```

Publicação no GitHub Pages:

```bash
npm run deploy
```
