# Checklist de revisão e publicação

O trabalho está na branch `portfolio/repositionamento-profissional-2026`, no PR #2. Nada foi mesclado nem publicado. O merge e a publicação exigem aprovação explícita de Matheus depois da revisão final.

## Antes de aprovar o PR

- [ ] GitHub Actions: `npm ci`, `npm run lint` e `npm run build` aprovados.
- [ ] Conferir visualmente desktop e celular, tema claro e escuro, português e inglês.
- [ ] Conferir os dois estudos de caso do Vardão Central.
- [x] Geração dos PDFs a partir dos HTMLs validada no GitHub Actions; os dois arquivos foram conferidos em uma página A4. O comando `npm run deploy` também os regenera automaticamente antes do build.
- [ ] Confirmar com Matheus qualquer informação biográfica ou resultado comercial que não tenha comprovação suficiente.
- [ ] Revisar links externos e testar as rotas geradas em `dist/`.

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
