# Domínio próprio e analytics

## Domínio recomendado

`matheusfrancisco.dev` é a opção principal por ser curto, profissional e alinhado a desenvolvimento de software. A consulta preliminar não encontrou registro DNS, mas a disponibilidade precisa ser confirmada no registrador no momento da compra.

Não adicione `CNAME` ao repositório antes de o domínio estar registrado e sob seu controle.

Depois da compra:

1. Adicione `www.matheusfrancisco.dev` como domínio personalizado em **GitHub → Settings → Pages**.
2. No registrador, crie um `CNAME` de `www` para `matheusfranciscols.github.io`.
3. Configure o domínio raiz com os registros recomendados pela documentação atual do GitHub Pages.
4. Aguarde a validação e ative **Enforce HTTPS**.
5. Atualize `homepage`, canonical, Open Graph, sitemap e o link do perfil do GitHub para o domínio novo.

## Analytics com privacidade

O portfólio está preparado para Umami. A integração só é carregada quando as duas variáveis abaixo existem no build:

```env
VITE_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
VITE_UMAMI_WEBSITE_ID=seu-website-id
```

Eventos preparados:

- abertura de projetos e códigos;
- download do currículo por idioma;
- cliques em GitHub, LinkedIn, WhatsApp e e-mail;
- envio bem-sucedido do formulário de contato.

Nenhum dado é enviado enquanto o Website ID não for configurado.

