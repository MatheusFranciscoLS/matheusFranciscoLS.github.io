import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { content, SITE } from './src/content.js';

// Preenche as etiquetas do index.html com os textos em português (a versão em inglês é gerada em scripts/prerender.mjs).
const htmlTokens = () => ({
  name: 'html-tokens',
  transformIndexHtml: (html) =>
    html
      .replaceAll('%TITLE%', content.pt.meta.title)
      .replaceAll('%DESC%', content.pt.meta.description)
      .replaceAll('%URL%', `${SITE}/`)
      .replaceAll('%LOCALE%', 'pt_BR'),
});

export default defineConfig({
  plugins: [react(), htmlTokens()],
});
