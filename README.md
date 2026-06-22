# 🚀 Portfólio Profissional | Matheus Francisco

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

Portfólio de Engenharia de Software desenvolvido com foco em alta performance, arquitetura componentizada e Experiência do Usuário (UX). 

Acesse o projeto em produção: **[matheusfranciscols.github.io](https://matheusfranciscols.github.io)**

---

## 🧠 Decisões de Arquitetura (Por que React?)

Este projeto foi inicialmente prototipado em HTML/CSS puro e posteriormente **refatorado para React + Vite**. O objetivo da migração foi aplicar padrões de desenvolvimento de software em larga escala, incluindo:

* **Arquitetura Orientada a Dados (Data-Driven):** Os projetos não estão "chumbados" no código. Eles são consumidos de um array centralizado (`data/projects.js`) e renderizados dinamicamente, facilitando a manutenção e escalabilidade.
* **Context API (Internacionalização):** Gerenciamento de estado global implementado do zero para suportar troca instantânea de idiomas (PT/EN) sem recarregar a página e sem uso de bibliotecas pesadas de terceiros (como `i18next`).
* **CSS Modular & CSS Variables:** Sistema de Design (Design System) construído com variáveis globais nativas, permitindo a transição fluida entre Tema Claro e Tema Escuro (Dark/Light Mode).
* **Performance (Lazy Loading):** Imagens e assets estáticos utilizam carregamento assíncrono para garantir pontuação máxima no Google Lighthouse.

## ⚙️ Funcionalidades e UX

- 🌓 **Dark/Light Mode:** Integrado com o `localStorage` para salvar a preferência do usuário.
- 🌐 **Multi-idioma:** Tradução completa e dinâmica.
- 📱 **100% Responsivo:** Mobile First adaptável para qualquer tela.
- 🔍 **Filtro de Projetos:** Renderização condicional baseada na categoria do projeto (Backend, Full-Stack, Frontend).
- ✉️ **Formulário Dinâmico:** Envio de e-mails processado via Fetch API com controle de estados (Loading, Success, Error).

## 🛠️ Como rodar o projeto localmente

Para clonar e rodar esta aplicação, você precisará do [Git](https://git-scm.com) e do [Node.js](https://nodejs.org/en/download/) instalados na sua máquina.

```bash
# Clone este repositório
$ git clone [https://github.com/MatheusFranciscoLS/matheusfranciscols.github.io.git](https://github.com/MatheusFranciscoLS/matheusfranciscols.github.io.git)

# Acesse a pasta do projeto
$ cd meu-portfolio

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev