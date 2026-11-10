# Métricas publicadas e como foram contadas

Este arquivo registra de onde vem cada número do portfólio, dos currículos e dos estudos de caso, para qualquer pessoa conseguir repetir a conta. Se um número não puder ser comprovado, ele sai dos materiais públicos.

Regra: **arquivo de teste, suíte e caso de teste são coisas diferentes** e nunca são somados nem trocados entre si.

## Vardão Central (repositório privado)

Base da contagem: commit `5c65745` (04/11/2026), checkout limpo. Os comandos rodam na raiz do repositório privado.

| Número | Valor | O que é | Como contar | Situação |
|---|---|---|---|---|
| Arquivos de teste do back-end | 222 | arquivos `*.test.ts` | `git ls-files 'backend/src/**' \| grep -E '\.test\.ts$' \| wc -l` | Contagem estática. Os testes não foram executados nesta verificação (precisam de banco de dados) |
| Arquivos de teste do front-end | 87 | arquivos que o Vitest executa (`src/**/*.test.{ts,tsx}`, conforme `frontend/vitest.config.ts`) | `git ls-files frontend/src \| grep -E '\.test\.(ts\|tsx)$' \| wc -l` | Contagem estática e execução (abaixo) |
| Especificações E2E | 23 | arquivos `*.spec.mjs` do Playwright em `frontend/e2e` | `git ls-files frontend/e2e \| grep -E '\.spec\.mjs$' \| wc -l` | Contagem estática. Não executados (precisam de navegador e banco) |
| Migrations | 91 | pastas com `migration.sql` em `backend/prisma/migrations` (o `migration_lock.toml` não conta) | `git ls-files backend/prisma/migrations \| grep -c '/migration.sql$'` | Contagem estática |
| Modelos Prisma | 49 | blocos `model` em `schema.prisma` (os 7 `enum` não contam) | `grep -c '^model ' backend/prisma/schema.prisma` | Contagem estática |
| Testes Vitest do front-end | 623 em 274 suítes | casos de teste individuais; "suíte" é cada `describe` | `npm ci --prefix . --workspaces=false` e `npx vitest run` dentro de `frontend` | **Executado em 10/11/2026 num checkout limpo: 87 arquivos, 274 suítes, 623 testes, 623 passaram, 0 falharam** |

Por que antes apareciam 85 arquivos Vitest: a cópia local estava cinco dias atrasada. Os dois arquivos que faltavam são `frontend/src/lib/maquina-do-cliente.test.ts` e `frontend/src/lib/quote-file-name.test.ts`.

Por que antes apareciam 110 arquivos de teste no front-end: a conta somava os 23 specs do Playwright aos 87 do Vitest. Esses dois grupos são diferentes e não se somam.

### Afirmações retiradas por falta de evidência verificável

- "1.107 comparações automáticas", "75 cenários" e "nenhuma diferença acima de 1 centavo". O número aparece apenas em uma anotação interna do projeto, referente a uma comparação feita com dados fictícios, e a própria anotação registra uma diferença máxima de 1,4 centavo. O código dessa comparação não está no repositório. Não é possível repetir a conta, então o número saiu.
- "Migração do ERP conferida ao centavo". As regras do ERP foram reproduzidas no sistema e têm testes. O importador dos dados reais está pronto e testado com dados fictícios. Importar os dados reais é decisão do dono da loja.
- "Mais de 2.000 testes", "mais de 1.400 no back-end" e "70 de ponta a ponta": eram somas de casos de teste que não foram executados. Saíram.

## Site da Vardão Máquinas (repositório privado, não auditado)

Estes números vêm só do sitemap público, conferido em 10/11/2026 (`https://vardaomaquinas.com.br/sitemap.xml`). Eles contam endereços, não páginas únicas de conteúdo.

| Número | Valor | Como contar |
|---|---|---|
| Endereços no sitemap | 202 | contar as linhas `<loc>` |
| Endereços em `/produtos` | 136 | `<loc>` que começam em `/produtos` |
| Endereços em `/novidades/` (artigos) | 37 | `<loc>` que começam em `/novidades/` |
| Endereços em `/acessorios` | 22 | `<loc>` que começam em `/acessorios` |

Retirados: "cerca de 200 páginas" como texto de apresentação (substituído por descrição geral), "11 tipos de mensagem de WhatsApp" e "~24 mil linhas de código", que dependem do código privado.

## Currículos em PDF

`public/assets/curriculo-source.sha256` guarda o hash dos HTMLs e do CSS usados para gerar os PDFs. O script `curriculos/verificar.sh` confere se o hash está em dia, se cada PDF tem uma página A4 e se o texto esperado aparece (e o texto proibido não). O GitHub Actions roda esse script antes e depois de regenerar os PDFs.
