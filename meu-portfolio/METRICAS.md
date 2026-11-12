# Métricas publicadas e como foram contadas

Este arquivo registra de onde vem cada número do portfólio, dos currículos e dos estudos de caso, para qualquer pessoa conseguir repetir a conta. Se um número não puder ser comprovado, ele sai dos materiais públicos.

Regra: **arquivo de teste, suíte e caso de teste são coisas diferentes** e nunca são somados nem trocados entre si.

## Vardão Central (repositório privado)

Base da contagem: estado do repositório em 04/11/2026, checkout limpo. Os comandos rodam na raiz do repositório privado.

| Número | Valor | O que é | Como contar | Situação |
|---|---|---|---|---|
| Arquivos de teste do back-end | 222 | arquivos `*.test.ts` | `git ls-files 'backend/src/**' \| grep -E '\.test\.ts$' \| wc -l` | Contagem estática. A execução está na seção "Execução dos testes" |
| Arquivos de teste do front-end | 87 | arquivos que o Vitest executa (`src/**/*.test.{ts,tsx}`, conforme `frontend/vitest.config.ts`) | `git ls-files frontend/src \| grep -E '\.test\.(ts\|tsx)$' \| wc -l` | Contagem estática e execução (abaixo) |
| Especificações E2E | 23 | arquivos `*.spec.mjs` do Playwright em `frontend/e2e` | `git ls-files frontend/e2e \| grep -E '\.spec\.mjs$' \| wc -l` | Contagem estática. A execução está na seção "Execução dos testes" |
| Migrations | 91 | pastas com `migration.sql` em `backend/prisma/migrations` (o `migration_lock.toml` não conta) | `git ls-files backend/prisma/migrations \| grep -c '/migration.sql$'` | Contagem estática |
| Modelos Prisma | 49 | blocos `model` em `schema.prisma` (os 7 `enum` não contam) | `grep -c '^model ' backend/prisma/schema.prisma` | Contagem estática |
| Testes Vitest do front-end | 623 em 274 suítes | casos de teste individuais; "suíte" é cada `describe` | `npm ci --prefix . --workspaces=false` e `npx vitest run` dentro de `frontend` | **Executado em 10/11/2026 num checkout limpo: 87 arquivos, 274 suítes, 623 testes, 623 passaram, 0 falharam** |

Recontagem em 10/11/2026, depois da integração da correção de datas dos E2E (que só mudou 2 arquivos de teste): 222 arquivos de teste no back-end, 87 no front-end, 23 specs E2E, 91 migrations e 49 modelos, sem nenhuma diferença em relação à tabela.

Por que antes apareciam 85 arquivos Vitest: a cópia local estava cinco dias atrasada. Dois arquivos de teste tinham sido adicionados nesse intervalo.

Por que antes apareciam 110 arquivos de teste no front-end: a conta somava os 23 specs do Playwright aos 87 do Vitest. Esses dois grupos são diferentes e não se somam.

### Afirmações retiradas por falta de evidência verificável

- "1.107 comparações automáticas", "75 cenários" e "nenhuma diferença acima de 1 centavo". O número aparece apenas em uma anotação interna do projeto, referente a uma comparação feita com dados fictícios, e a própria anotação registra uma diferença máxima de 1,4 centavo. O código dessa comparação não está no repositório. Não é possível repetir a conta, então o número saiu.
- "Migração do ERP conferida ao centavo". As regras do ERP foram reproduzidas no sistema e têm testes. O importador foi testado com dados fictícios e, segundo o Matheus, já foi usado na importação dos dados reais da loja (a tela de importação do sistema existe). Não há evidência no repositório de uma conferência dos totais importados, então a afirmação "conferida ao centavo" continua fora.
- "Mais de 2.000 testes", "mais de 1.400 no back-end" e "70 de ponta a ponta": eram somas de casos de teste que não foram executados. Saíram.

## Execução dos testes do Vardão Central (10/11/2026)

Tudo foi executado num clone limpo do repositório privado (estado de 04/11/2026), numa máquina local, com PostgreSQL 18 descartável e dados fictícios. Nenhum banco de produção, credencial real ou dado de cliente foi usado. Os testes do Vardão Central são diferentes dos testes deste portfólio: o CI verde do portfólio não prova nada sobre o sistema.

| Suíte | Comando | Executados | Aprovados | Falhos | Não executados |
|---|---|---|---|---|---|
| Vitest (front-end) | `npm ci --prefix . --workspaces=false` e `npx vitest run`, dentro de `frontend` | 623 em 274 suítes e 87 arquivos | 623 | 0 | 0 |
| Back-end | `npm run build` e `node --test --test-concurrency=1 "dist/**/*.test.js"`, dentro de `backend`, com RabbitMQ 3.13.7 (Erlang 26.2.5.14) local e banco novo | 1.491 | 1.491 | 0 | 0 |
| E2E Playwright | `npx playwright test -c e2e/playwright.config.mjs`, dentro de `frontend`, contra backend e front locais e banco recém-criado | 70 em 23 arquivos | 70 | 0 | 0 |
| Busca determinística do CI do back-end | `npm run benchmark:parts:ci` | 50 casos | 50 (Top-1 100%, Recall@5 100%) | 0 | 0 |
| `prisma validate` e carregador do Gemini | `npx prisma validate` e o `node -e` do CI | 2 verificações | 2 | 0 | 0 |

Ambiente do back-end: variáveis iguais às do CI (`DATABASE_URL` para o banco local, `RABBITMQ_URL` apontando para uma porta sem servidor, chaves de mentira) e a trava de segurança do projeto, que recusa bancos hospedados, confirmando "Banco local". As 91 migrations foram aplicadas por inteiro. Como o computador não tem a extensão pgvector, o script da loja simulada troca só as colunas vetoriais por texto.

**Back-end e RabbitMQ.** Na primeira execução, 1.488 dos 1.491 passaram: as 3 falhas eram os testes de integração do RabbitMQ (publicar e consumir, dead-letter e reconexão), que terminavam em `ECONNREFUSED` porque não havia broker no computador. Depois baixei os binários oficiais para Windows, em pasta temporária e sem instalar nada no sistema (Erlang/OTP 26.2.5.14, `otp_win64_26.2.5.14.zip`, 165.746.668 bytes, SHA-256 `5281e404…ad1a`, do repositório `erlang/otp`; RabbitMQ 3.13.7, `rabbitmq-server-windows-3.13.7.zip`, 32.208.726 bytes, SHA-256 `eb1967ad…a102`, do repositório `rabbitmq/rabbitmq-server`; a mesma série 3.13 do contêiner do CI), subi o broker em `127.0.0.1:5672` com o usuário padrão de teste e rodei a suíte completa de novo, num banco novo e com o código real (sem os ajustes que usei só para capturar as telas). Resultado: **1.491 executados, 1.491 aprovados, 0 falhos, 0 não executados**.

**E2E.** Na primeira execução completa, 68 de 70 passaram. Os 2 que falharam (um de Compras e Despesas e outro de Registro de vendas, ambos no perfil Financeiro) criavam um registro com data fixa de 05/10/2026 e esperavam vê-lo na lista, mas a tela abre filtrada no mês corrente (novembro). Era um defeito do teste, que dependia da data da execução. A correção troca a data fixa pelo primeiro dia do mês corrente nos dois testes, sem remover nenhum teste nem enfraquecer nenhuma verificação (2 arquivos, 6 linhas). Ela foi aplicada numa cópia de trabalho do repositório do sistema e validada com a suíte completa, num banco novo: **70 executados, 70 aprovados, 0 falhos**. A correção foi integrada à linha principal do projeto em 10/11/2026 (2 arquivos de teste, sem mudança no código do sistema). Uma execução anterior num banco já usado falhou em 3 testes de orçamento por sobras da execução anterior: os E2E exigem banco novo, como no CI.

**Histórico de execuções anteriores** (16 a 30/10): Vitest 85 arquivos e 610 testes aprovados em 30/10; back-end com 1.427 testes e 2 falhas em 25/10; E2E com 69 testes aprovados em 25/10. São de versões anteriores do código, por isso não substituem a execução acima.

### Situação do CI do Vardão Central
O workflow de CI do projeto (GitHub Actions) funcionou durante o desenvolvimento. O histórico do GitHub mostra 1.987 execuções: 1.423 aprovadas, 199 com falha e 365 canceladas por concorrência, e a última aprovada é de 25/10/2026. O Matheus desativou o workflow manualmente porque os créditos e limites de uso do GitHub Actions se esgotaram, e não o reativou: os commits seguintes não rodaram CI. Isso não é um defeito do pipeline. Reativá-lo, e consumir créditos, depende só da decisão dele, e não foi feito. Os resultados desta seção vêm de uma execução local manual em 10/11/2026, em ambiente isolado, e são independentes do histórico do pipeline.

### Onde cada número do Vardão Central aparece

- **Página inicial e estudo de caso:** quantidades de testes executados (1.491, 623 e 70) e, no estudo de caso, também as de arquivos (222, 87 e 23), sempre rotuladas como arquivos ou testes.
- **Currículos:** quantidades de testes executados (1.491, 623 e 70).
- **Cobertura de código:** o projeto não tem relatório de cobertura (não há ferramenta de cobertura configurada nos `package.json`), então nenhum percentual de cobertura é publicado.

## Plataforma IoT Industrial (repositório público)

Estado de `main` em 10/11/2026 (commit `270ec73`, de 18/10/2026). Os números de 17/10/2026 que continuam no estudo de caso (carga com k6, Lighthouse, 7 registros de decisão) não foram medidos de novo.

| Número | Valor | Como contar | Situação |
|---|---|---|---|
| Testes do painel React | 179 em 11 arquivos | `npx vitest run` dentro de `painel-react` | **Executado em 10/11/2026: 179 passaram, 0 falharam.** Eram 172 em 17/10/2026; a demonstração instantânea acrescentou testes |
| Testes da API Java | 208 | contagem das anotações `@Test` e `@ParameterizedTest` em `iot-core/src/test` (26 arquivos) | Contagem estática, igual ao número publicado em 17/10/2026. Não foi executado em 10/11 (10 desses testes só rodam no CI, com PostgreSQL real) |
| Testes no navegador (Playwright) | 9 | contagem de `test(` em `e2e` | Contagem estática |

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

## Revalidação de 11/11/2026 (redesign do portfólio)

### Vardão Central
Recontagem no estado de `origin/main` em 11/11/2026 (último commit do dia, às 17h14): 91 migrations, 49 modelos Prisma, 87 arquivos Vitest e 23 specs E2E, sem mudança. Arquivos de teste do back-end: **224** (eram 222 em 04/11/2026; 2 arquivos novos nos commits de 11/11). O estudo de caso continua citando 222 arquivos porque a execução dos testes (1.491, 623 e 70) foi feita sobre o estado de 04/11/2026, e o texto diz isso. Os testes não foram executados de novo sobre os commits de 11/11.

Afirmações do portfólio e do carrossel de 12/11 conferidas no código (`origin/main`): busca por código que devolve só o código exato e a substituição oficial (`fast-search.controller.ts`); IA que escolhe numa lista fechada de peças da máquina (`routes/index.ts`); importação do ERP em modo de ensaio, com totais esperados, conferência ao centavo depois de gravar e opção de desfazer (`scripts/import-erp-financeiro.ts`); parcelas em centavos que fecham no total (`utils/financeiro-vendas.ts` e teste "parcelas fecham o centavo"); atalhos de teclado do balcão (`lib/results-keyboard.ts` e `ShellV2.tsx`).

### Plataforma IoT Industrial
208 anotações `@Test` em `iot-core/src/test` (`git grep -o -E '@(Test|ParameterizedTest)\b'`), igual ao publicado. Java 21, Spring Security, JPA, Flyway e AMQP conferidos no `pom.xml`; o gateway usa Socket.IO (`servidor-node/package.json`). Período do repositório: 19/05/2026 a 18/10/2026.

### BusinessFlow
Período do repositório: 23/11/2025 a 30/10/2026. Conferido no código: separação por empresa, refresh token, `express-rate-limit`, auditoria, importação OFX, geração de PDF e chave de API; 23 arquivos de teste e workflow `ci.yml`. A demonstração pública (perfil gestor e perfil cliente, dados fictícios e somente leitura) mostra: resumo executivo, carteira de clientes, cofre de documentos, DRE, tarefas e prazos, financeiro, trilha de auditoria, equipe, privacidade, configurações e o portal do cliente. As telas do portfólio são capturas dessa demonstração. O portfólio separa o que foi visto na demonstração do que foi conferido no código, e não afirma persistência de dados a partir da demonstração.

### Cursos e formação (documentos originais conferidos)
| Item | Documento | Dados |
|---|---|---|
| Técnico em Desenvolvimento de Sistemas | Diploma SENAI "Luiz Varga" | Concluído em 13/12/2024; diploma emitido em 16/04/2025 |
| Programação Java | Certificado SENAI | 120 h, 25/07/2022 a 04/10/2022, emitido em 14/01/2025 |
| Programação de Banco de Dados | Certificado SENAI | 120 h, 26/02/2024 a 08/04/2024, emitido em 14/01/2025 |
| AWS Academy Cloud Foundations | Certificado SENAI "Implantação de Serviços em Nuvem" | 40 h, 03/09/2022 a 26/11/2022, emitido em 14/01/2025. Curso de formação; não é certificação oficial da AWS |
| Ciência da Computação de Harvard no Brasil | Certificado Fundação Estudar | 70 h, emitido em 03/02/2025 |
| Trilha Banco de Dados | Certificado Fundação Bradesco | 38 h, 30/01/2025 |
| AI-900: Fundamentos de IA no Azure | Certificado Fundação Bradesco | 16 h, 20/01/2025 a 08/03/2025, curso autoinstrucional; não é o exame da Microsoft |

A previsão de conclusão de Ciência da Computação (outubro de 2028) não tem documento nesta conferência; vem das versões anteriores aprovadas pelo Matheus.
