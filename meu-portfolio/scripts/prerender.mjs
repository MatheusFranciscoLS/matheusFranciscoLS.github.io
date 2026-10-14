// Gera HTML estático de / (português) e /en/ (inglês) com o conteúdo já dentro da página.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { content, SITE } from '../src/content.js';

const { render } = await import(pathToFileURL(resolve('.ssr/entry-server.js')).href);
const template = readFileSync('dist/index.html', 'utf8').replaceAll('\r\n', '\n');

const swap = (html, from, to) => {
  if (!html.includes(from)) throw new Error(`Texto não encontrado no HTML: ${from.slice(0, 40)}`);
  return html.replaceAll(from, to);
};

const pt = swap(template, '<!--app-->', render('pt'));
writeFileSync('dist/index.html', pt);

let en = swap(template, '<!--app-->', render('en'));
en = swap(en, '<html lang="pt-BR">', '<html lang="en">');
en = swap(en, content.pt.meta.title, content.en.meta.title);
en = swap(en, content.pt.meta.description, content.en.meta.description);
en = swap(en, `href="${SITE}/" />\n    <link rel="alternate" hreflang="pt-BR"`, `href="${SITE}/en/" />\n    <link rel="alternate" hreflang="pt-BR"`);
en = swap(en, '<meta property="og:url" content="https://matheusfranciscols.github.io/"', '<meta property="og:url" content="https://matheusfranciscols.github.io/en/"');
en = swap(en, 'content="pt_BR"', 'content="en_US"');
mkdirSync('dist/en', { recursive: true });
writeFileSync('dist/en/index.html', en);
console.log('Páginas geradas: dist/index.html e dist/en/index.html');
