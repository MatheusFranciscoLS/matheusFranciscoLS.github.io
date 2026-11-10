# Checklist de revisão e publicação

O trabalho está na branch `portfolio/repositionamento-profissional-2026`, no PR #2. Nada foi mesclado nem publicado. O merge e a publicação exigem aprovação explícita de Matheus depois da revisão final.

## Antes de aprovar o PR

- [ ] GitHub Actions: `Portfolio checks` verde no PR (instalação, conferência dos PDFs versionados, lint, build, rotas e regeneração dos PDFs). Ainda não confirmado: depende da execução do CI após o último commit.
- [x] `npm ci`, `npm run lint` e `npm run build` executados localmente em checkout limpo, sem erros.
- [ ] Conferir visualmente desktop e celular, tema claro e escuro, português e inglês.
- [ ] Conferir os dois estudos de caso do Vardão Central.
- [ ] Revisar `METRICAS.md`: cada número publicado tem origem e critério de contagem.
- [x] Matheus confirmou que o Vardão Central é usado todos os dias na loja e que ele o desenvolveu sozinho (concepção, arquitetura, implementação, banco de dados, integrações, testes e evolução). O estudo de caso, a página principal e os currículos o apresentam como projeto individual.
- [x] Prints do Vardão Central recapturados numa loja simulada com dados 100% fictícios (marca, modelo, códigos, cliente e preços inventados) e inspecionados um a um.
- [x] Matheus confirmou que a importação dos dados reais do ERP foi feita.
- [x] PDFs regenerados localmente a partir dos HTMLs finais (Edge) e conferidos com `sh curriculos/verificar.sh`: hash em dia, uma página A4 cada e texto esperado.
- [ ] Geração dos PDFs no GitHub Actions (Chrome do runner): pendente de confirmação no CI. O comando `npm run deploy` também os regenera antes do build.
- [ ] Confirmar com Matheus qualquer informação biográfica ou resultado comercial que não tenha comprovação suficiente.
- [ ] Revisar links externos e testar as rotas geradas em `dist/`.

## Revisão final (10/11/2026)
- [x] PDFs em português e inglês abertos num leitor (pdf.js): uma página A4 cada, sem cortes.
- [x] Estudos de caso da Vardão Máquinas e da Plataforma IoT e a página principal (PT e EN) revisados em desktop e celular (375 px): sem rolagem horizontal, sem imagem quebrada; contraste calculado sem falhas nos temas claro e escuro.
- [x] SEO e acessibilidade básica: título, descrição, canonical, hreflang (também nos estudos de caso, adicionado agora), og/twitter com texto alternativo, JSON-LD por idioma, um h1 por página, imagens com alt e link "Ir para o conteúdo" em todas as páginas (adicionado nos estudos de caso).
- [x] Correção dos 2 testes E2E dependentes de data validada no repositório do sistema: 70 de 70 num banco novo. Falta decidir a integração dessa correção.
- [ ] Decidir se reativa o CI do Vardão Central (desativado manualmente por limite de uso do GitHub Actions) e se integra a correção dos testes ao repositório do sistema.

## Publicar (somente após aprovação explícita)

1. Conferir que o PR #2 continua apontando para `main` e que os checks estão verdes.
2. Fazer merge do PR #2.
3. Em um checkout limpo da `main`, executar dentro de `meu-portfolio/`: `npm ci`, `npm run lint` e `npm run build`.
4. Conferir `dist/index.html`, `dist/en/index.html`, os estudos de caso e os PDFs.
5. Publicar com `npm run deploy` (o script `predeploy` executa o build novamente).
6. Confirmar no site público as rotas `/`, `/en/` e os estudos de caso em português e inglês.

## Depois da publicação

- [ ] Abrir o site em desktop e celular, em tema claro e escuro.
- [ ] Testar os downloads dos currículos em português e inglês.
- [ ] Testar os links de GitHub, LinkedIn, WhatsApp e os links dos projetos.
- [ ] Atualizar a prévia de compartilhamento no LinkedIn Post Inspector.
- [ ] Conferir o sitemap no Google Search Console.
- [ ] Substituir o currículo anexado ao LinkedIn e às candidaturas pelos PDFs publicados.

## Observações técnicas

- O painel de status verifica apenas o carregamento do favicon de cada endereço. Não é um health check da aplicação, API ou banco de dados.
- O código-fonte do sistema é privado; as informações técnicas públicas foram limitadas a evidências verificáveis, sem expor código ou dados internos.
- Domínio próprio e analytics ficam fora deste PR.
