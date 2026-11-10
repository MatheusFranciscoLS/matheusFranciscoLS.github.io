# Métricas publicadas e como foram contadas

Este arquivo registra de onde vem cada número do portfólio, dos currículos e dos estudos de caso, para qualquer pessoa conseguir repetir a conta. Se um número não puder ser comprovado, ele sai dos materiais públicos.

Regra: **arquivo de teste, suíte e caso de teste são coisas diferentes** e nunca são somados nem trocados entre si.

## Vardão Central (repositório privado)

Base da contagem: commit `5c65745` (04/11/2026), checkout limpo. Os comandos rodam na raiz do repositório privado.

| Número | Valor | O que é | Como contar | Situação |
|---|---|---|---|---|
| Arquivos de teste do back-end | 222 | arquivos `*.test.ts` | `git ls-files 'backend/src/**' \| grep -E '\.test\.ts$' \| wc -l` | Contagem estática. A execução está na seção "Execução dos testes" |
| Arquivos de teste do front-end | 87 | arquivos que o Vitest executa (`src/**/*.test.{ts,tsx}`, conforme `frontend/vitest.config.ts`) | `git ls-files frontend/src \| grep -E '\.test\.(ts\|tsx)$' \| wc -l` | Contagem estática e execução (abaixo) |
| Especificações E2E | 23 | arquivos `*.spec.mjs` do Playwright em `frontend/e2e` | `git ls-files frontend/e2e \| grep -E '\.spec\.mjs$' \| wc -l` | Contagem estática. A execução está na seção "Execução dos testes" |
| Migrations | 91 | pastas com `migration.sql` em `backend/prisma/migrations` (o `migration_lock.toml` não conta) | `git ls-files backend/prisma/migrations \| grep -c '/migration.sql$'` | Contagem estática |
| Modelos Prisma | 49 | blocos `model` em `schema.prisma` (os 7 `enum` não contam) | `grep -c '^model ' backend/prisma/schema.prisma` | Contagem estática |
| Testes Vitest do front-end | 623 em 274 suítes | casos de teste individuais; "suíte" é cada `describe` | `npm ci --prefix . --workspaces=false` e `npx vitest run` dentro de `frontend` | **Executado em 10/11/2026 num checkout limpo: 87 arquivos, 274 suítes, 623 testes, 623 passaram, 0 falharam** |

Por que antes apareciam 85 arquivos Vitest: a cópia local estava cinco dias atrasada. Os dois arquivos que faltavam são `frontend/src/lib/maquina-do-cliente.test.ts` e `frontend/src/lib/quote-file-name.test.ts`.

Por que antes apareciam 110 arquivos de teste no front-end: a conta somava os 23 specs do Playwright aos 87 do Vitest. Esses dois grupos são diferentes e não se somam.

### Afirmações retiradas por falta de evidência verificável

- "1.107 comparações automáticas", "75 cenários" e "nenhuma diferença acima de 1 centavo". O número aparece apenas em uma anotação interna do projeto, referente a uma comparação feita com dados fictícios, e a própria anotação registra uma diferença máxima de 1,4 centavo. O código dessa comparação não está no repositório. Não é possível repetir a conta, então o número saiu.
- "Migração do ERP conferida ao centavo". As regras do ERP foram reproduzidas no sistema e têm testes. O importador dos dados reais está pronto e testado com dados fictícios. Importar os dados reais é decisão do dono da loja.
- "Mais de 2.000 testes", "mais de 1.400 no back-end" e "70 de ponta a ponta": eram somas de casos de teste que não foram executados. Saíram.

## Execução dos testes do Vardão Central (10/11/2026)

Tudo foi executado num clone limpo do repositório privado (commit `5c65745`, 04/11/2026), numa máquina local, com PostgreSQL 18 descartável e dados fictícios. Nenhum banco de produção, credencial real ou dado de cliente foi usado. Os testes do Vardão Central são diferentes dos testes deste portfólio: o CI verde do portfólio não prova nada sobre o sistema.

| Suíte | Comando | Executados | Aprovados | Falhos | Não executados |
|---|---|---|---|---|---|
| Vitest (front-end) | `npm ci --prefix . --workspaces=false` e `npx vitest run`, dentro de `frontend` | 623 em 274 suítes e 87 arquivos | 623 | 0 | 0 |
| Back-end | `npm run build` e `node --test --test-concurrency=1 "dist/**/*.test.js"`, dentro de `backend` | 1.491 | 1.488 | 3 | 0 |
| E2E Playwright | `npx playwright test -c e2e/playwright.config.mjs`, dentro de `frontend`, contra backend e front locais e banco recém-criado | 70 em 23 arquivos | 70 | 0 | 0 |
| Busca determinística do CI do back-end | `npm run benchmark:parts:ci` | 50 casos | 50 (Top-1 100%, Recall@5 100%) | 0 | 0 |
| `prisma validate` e carregador do Gemini | `npx prisma validate` e o `node -e` do CI | 2 verificações | 2 | 0 | 0 |

Ambiente do back-end: variáveis iguais às do CI (`DATABASE_URL` para o banco local, `RABBITMQ_URL` apontando para uma porta sem servidor, chaves de mentira) e a guarda `guard-test-database` confirmando "Banco local". As 91 migrations foram aplicadas por inteiro. Como o computador não tem a extensão pgvector, o script da loja simulada troca só as colunas vetoriais por texto.

**As 3 falhas do back-end** são os testes de integração do RabbitMQ (publicar e consumir, dead-letter e reconexão). Todos terminam com `ECONNREFUSED`, porque não há servidor RabbitMQ neste ambiente (o CI do projeto usa um contêiner). São falhas de ambiente, e não foram contornadas nem removidas. Matheus informou que executou esses 3 testes manualmente, com um broker, e que passaram. Não tenho o log dessa execução, então a tabela acima mantém o que eu medi (1.488 aprovados e 3 falhos), e o estudo de caso publica 1.491 aprovados com essa ressalva.

**E2E.** Na primeira execução completa, 68 de 70 passaram. Os 2 que falharam (um de Compras e Despesas e outro de Registro de vendas, ambos no perfil Financeiro) criam um registro com data fixa de 05/10/2026 e esperam vê-lo na lista, mas a tela abre filtrada no mês corrente (novembro). Era um defeito do teste, que dependia da data da execução. A correção troca a data fixa pelo primeiro dia do mês corrente nos dois testes, sem remover nenhum teste nem enfraquecer nenhuma verificação (2 arquivos, 6 linhas; o patch foi entregue ao Matheus para revisão). Com ela, a suíte completa passou: 70 de 70, num banco recém-criado. Uma segunda execução num banco já usado falhou em 3 testes de orçamento por sobras da execução anterior (linhas duplicadas no orçamento): os E2E exigem banco novo, como no CI. Essa correção do teste **não está aplicada no repositório privado**: está só no patch, para revisão.

**Histórico de execuções anteriores** (nas conversas de 16 a 30/10): Vitest 85 arquivos e 610 testes aprovados em 30/10; back-end com 1.427 testes e 2 falhas em 25/10; E2E com 69 testes aprovados em 25/10. São de commits anteriores ao `5c65745`, por isso não substituem a execução acima.

### Por que o CI do Vardão Central parou
A última execução do "CogniVault CI" é de 26/10/2026 e todos os jobs terminaram sem executar nenhum passo, com a mensagem do GitHub: "The job was not started because recent account payments have failed or your spending limit needs to be increased". Desde então o workflow está desativado manualmente, e os commits seguintes não rodaram CI. Em 04/11 um workflow do mesmo repositório rodou normalmente num runner Windows, o que indica que as Actions voltaram a funcionar. Reativar o CI e conferir a cobrança e o limite de gastos é decisão do dono da conta e não foi feito.

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
