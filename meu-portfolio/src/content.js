export const SITE = 'https://matheusfranciscols.github.io';
export const EMAIL = 'matheusf.ls@hotmail.com';
export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/matheusfranciscols',
  github: 'https://github.com/MatheusFranciscoLS',
  whatsapp: 'https://wa.me/5519981911214?text=Ol%C3%A1%20Matheus%2C%20vi%20seu%20portf%C3%B3lio.',
};

export const paths = {
  pt: { home: '/', resume: '/assets/curriculo-pt.pdf', resumeName: 'Matheus-Francisco-Curriculo.pdf' },
  en: { home: '/en/', resume: '/assets/curriculo-en.pdf', resumeName: 'Matheus-Francisco-Resume.pdf' },
};

// Os cinco sistemas, na ordem de importância.
const systems = {
  vardao: {
    id: 'vardao-central',
    name: 'Vardão Central',
    live: 'https://vardao-central.vercel.app',
    img: '/assets/vardao-central/balcao.png',
    stack: 'React · TypeScript · Node.js · PostgreSQL · Prisma · RabbitMQ · Playwright',
  },
  site: {
    id: 'vardao-maquinas',
    name: 'Site da Vardão Máquinas',
    live: 'https://vardaomaquinas.com.br',
    img: '/assets/vardao-site/home.png',
    stack: 'Next.js · React · TypeScript · Tailwind CSS',
  },
  businessflow: {
    id: 'businessflow',
    name: 'BusinessFlow',
    live: 'https://flowbusiness.vercel.app',
    code: 'https://github.com/MatheusFranciscoLS/BusinessFlow',
    img: '/assets/businessflow.webp',
    stack: 'React · Node.js · Express · PostgreSQL · Prisma',
  },
  iot: {
    id: 'plataforma-iot',
    name: 'Plataforma IoT Industrial',
    live: 'https://plataforma-iot-industrial.vercel.app',
    code: 'https://github.com/MatheusFranciscoLS/plataforma-iot-industrial',
    img: '/assets/iot/miniatura.png',
    stack: 'Java · Spring Boot · React · RabbitMQ · WebSockets · PostgreSQL · Docker',
  },
  economia: {
    id: 'economia-solidaria',
    name: 'Economia Solidária',
    live: 'https://economia-solidaria-frontend.vercel.app',
    code: 'https://github.com/MatheusFranciscoLS/ProjetoFinal',
    img: '/assets/p2.webp',
    stack: 'React · Firebase · Material UI',
  },
};

export const content = {
  pt: {
    meta: {
      title: 'Matheus Francisco | Desenvolvedor full-stack júnior',
      jobTitle: 'Desenvolvedor full-stack júnior',
      ogAlt: 'Capa do portfólio de Matheus Francisco, desenvolvedor full-stack júnior: Construo sistemas que ficam no ar, com a lista dos cinco sistemas publicados.',
      description:
        'Desenvolvedor full-stack júnior em Limeira, SP. Criei sozinho o sistema de gestão de uma revenda de máquinas, em uso diário. Java, Spring Boot, React e Node.js.',
    },
    ui: {
      skip: 'Ir para o conteúdo',
      nav: { systems: 'Sistemas', method: 'Como trabalho', path: 'Trajetória', contact: 'Contato' },
      theme: 'Alternar tema claro e escuro',
      otherLangLabel: 'Read this page in English',
    },
    hero: {
      kicker: 'Desenvolvedor full-stack júnior · Limeira, SP',
      available: 'Aberto a vagas',
      name: 'Matheus Francisco',
      contact: 'Falar comigo',
      title: 'Construo sistemas que ficam no ar.',
      lead:
        'Trabalho desde 2017 no balcão de revendas de máquinas e desenvolvo software a partir de problemas reais da operação. Desenvolvi sozinho o sistema que a Vardão Máquinas usa todos os dias, além do site da empresa. Busco minha primeira vaga como desenvolvedor full-stack júnior e também considero oportunidades de entrada em TI.',
      stack: 'Java · Spring Boot · React · Node.js · TypeScript · PostgreSQL',
      primary: 'Ver os sistemas',
      secondary: 'Baixar currículo',
    },
    systemsSection: {
      title: 'Sistemas',
      intro: 'Cinco projetos publicados. O principal é o Vardão Central, em operação diária em uma empresa; os outros quatro mostram outras áreas e tecnologias.',
      problem: 'O problema',
      built: 'O que eu construí',
      proof: 'Evidências',
      stack: 'Tecnologias',
      study: 'Ler o estudo de caso',
      live: 'Abrir o sistema',
      demo: 'Abrir a demonstração',
      code: 'Ver o código',
      items: [
        {
          ...systems.vardao,
          tag: 'Projeto principal · sistema em uso diário',
          kind: 'Sistema de gestão de uma revenda, em operação diária',
          summary:
            'Sistema que a Vardão Máquinas, revenda autorizada Husqvarna em Limeira, usa no balcão, no comercial, no financeiro e no estoque. Projeto individual: levantei as necessidades na própria loja, defini as regras de negócio, a arquitetura e os testes, e sigo mantendo o sistema.',
          problem:
            'Para responder "qual é a peça e quanto custa", o balcão abria um catálogo em PDF, uma planilha de preços e um ERP antigo. Um código errado gerava devolução, e o financeiro ficava em outro sistema.',
          built: [
            'Balcão: busca por código, peça ou modelo, vista explodida e orçamento em PDF e WhatsApp, com validação do código da peça.',
            'Comercial: CRM com quadro de negociações, ranking de clientes, cross selling e reativação de clientes.',
            'Financeiro: DRE, fluxo de caixa, capital de giro e curva ABC, com as regras do ERP antigo reproduzidas.',
            'Estoque: itens a pedir, faltas, prateleiras e encomendas de peças para clientes.',
            'Arquitetura: React e TypeScript no front-end, API em Node.js, PostgreSQL com Prisma (49 modelos e 91 migrations), fila RabbitMQ para a leitura de catálogos em PDF e acesso por perfil conferido no servidor.',
          ],
          proof: [
            'As regras do ERP antigo foram reproduzidas no sistema e cada uma tem testes automatizados.',
            'Testes executados localmente em 10/11/2026, em ambiente isolado (não são resultados de CI): 1.491 no back-end, 623 no front-end (Vitest) e 70 E2E (Playwright), todos aprovados.',
            'O estudo de caso explica o método de contagem e os limites dessas medições.',
          ],
          imgAlt: 'Balcão do Vardão Central: busca de peça com o orçamento ao lado, numa loja simulada com dados fictícios.',
          study: '/estudo-de-caso-vardao-central/',
          liveNote: 'O acesso exige o login da loja. O código é privado; posso apresentar a arquitetura e trechos do código numa conversa.',
        },
        {
          ...systems.site,
          tag: 'Complementa o Vardão Central',
          kind: 'Site institucional da empresa, em produção',
          summary: 'O site institucional da Vardão Máquinas, revenda e assistência técnica autorizada Husqvarna em Limeira, feito para o cliente encontrar a empresa no Google e chegar ao vendedor. Enquanto o Vardão Central atende a operação interna, o site atende o cliente externo.',
          built: [
            'Design e desenvolvimento completos em Next.js e TypeScript: a empresa, a assistência técnica, as linhas de produtos, avaliações de clientes e contato em todas as páginas.',
            'Páginas geradas a partir de dados tipados: título, descrição, dados estruturados, sitemap e navegação acompanham o conteúdo, sem configurar o SEO página a página.',
            'Experiência do cliente: busca, guias de peças e artigos para escolher, botão de WhatsApp com a mensagem contextualizada e aviso de cookies em que recusar não prejudica a navegação.',
          ],
          liveLabel: 'Abrir o site',
          study: '/estudo-de-caso-vardao-maquinas/',
          imgAlt: 'Página inicial do site da Vardão Máquinas, com a fachada da loja e os motivos para comprar na Vardão.',
        },
        {
          ...systems.businessflow,
          tag: '2026',
          kind: 'SaaS de gestão para pequenos negócios',
          summary: 'Plataforma multiempresa em que cada negócio cuida de clientes, financeiro, agenda e chamados num só painel.',
          built: [
            'Isolamento entre empresas: cada registro pertence a uma empresa, e uma empresa nunca vê os dados de outra.',
            'Autenticação com JWT e refresh token, limite de requisições e registro de auditoria (quem fez o quê).',
            'Integrações: importação de extrato bancário (OFX), relatórios em PDF e API com chave para sistemas externos.',
            'Back-end com testes automatizados e CI no GitHub.',
          ],
          imgAlt: 'Tela de login do BusinessFlow.',
        },
        {
          ...systems.iot,
          tag: '2026',
          kind: 'Telemetria industrial em tempo real',
          summary: 'Sensores enviam leituras a uma API em Java; uma fila RabbitMQ avisa um gateway Node, que entrega os dados ao painel React por WebSocket, com alertas em tempo real.',
          built: [
            'API em Java 21 e Spring Boot, com Spring Security (JWT) e persistência em PostgreSQL por JPA e Flyway.',
            'Mensageria com RabbitMQ e tempo real por WebSocket; se o tempo real falhar, a leitura continua gravada e o painel passa a consultar a API.',
            'Testes na API Java (parte contra PostgreSQL real), no painel React e no navegador, com CI no GitHub a cada alteração.',
            'Demonstração com telemetria simulada e botão "Simular falha".',
          ],
          imgAlt: 'Painel com temperatura, rotação e vibração de três máquinas.',
          study: '/estudo-de-caso-plataforma-iot/',
        },
        {
          ...systems.economia,
          tag: '2024 · TCC SENAI · projeto em equipe',
          kind: 'Marketplace de produtores locais',
          summary: 'Conecta pequenos produtores de Limeira a consumidores, com cadastro de lojas e mapa. Desenvolvido em equipe, como trabalho de conclusão do curso técnico.',
          built: [
            'Minha contribuição: o front-end em React, a integração com a API e o estado da aplicação.',
            'Recursos do projeto: login e dados no Firebase, rotas protegidas e validação de CPF e CNPJ.',
          ],
          imgAlt: 'Página inicial do Economia Solidária.',
        },
      ],
      more: 'No GitHub há também repositórios de estudo e de cursos, que mostram como minha prática evoluiu.',
      moreLink: 'Ver todos no GitHub',
    },
    method: {
      title: 'Como trabalho',
      items: [
        {
          title: 'Entendo o problema antes do código',
          text: 'Nove anos de atendimento no balcão me ensinaram a perguntar o que a pessoa precisa resolver. Levanto a necessidade com quem usa e a transformo em regras de negócio, como fiz no Vardão Central.',
        },
        {
          title: 'Valido com testes',
          text: 'Regras de negócio protegidas por testes automatizados e, nos projetos de código aberto, CI no GitHub. No Vardão Central, as regras do ERP antigo foram reproduzidas e testadas.',
        },
        {
          title: 'Publico e documento',
          text: 'Os cinco projetos estão publicados. Os de código aberto têm README com instruções para rodar, decisões técnicas e próximos passos; o Vardão Central, que é privado, tem um estudo de caso.',
        },
      ],
    },
    path: {
      title: 'Trajetória',
      intro: 'No balcão desde 2017, programando desde 2022.',
      items: [
        { when: '2024 a 2028', what: 'Ciência da Computação, Anhembi Morumbi', text: 'Em andamento, conclusão prevista em outubro de 2028.' },
        { when: '2022 a 2024', what: 'Técnico em Desenvolvimento de Sistemas, SENAI', text: 'Java, banco de dados, web e mobile. TCC em 2024: Economia Solidária.' },
        { when: 'set/2020 até hoje', what: 'Vendedor, Vardão Máquinas', text: 'Loja familiar, revenda autorizada Husqvarna. Vendas consultivas, compras, estoque e apoio ao financeiro. Desenvolvi o Vardão Central e um CRM para acompanhar clientes e leads, além do site da empresa.' },
        { when: 'set/2017 a set/2020', what: 'Auxiliar de estoque e vendas → Vendedor, Yamashita Tratores', text: 'Entrada em set/2017 como auxiliar; promoção a vendedor em out/2017. Atendimento consultivo e venda técnica de maquinário agrícola.' },
      ],
      skillsTitle: 'Tecnologias',
      skills: [
        ['Back-end', 'Java, Spring Boot, Spring Security, Node.js, Express, TypeScript, APIs REST'],
        ['Front-end', 'React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS'],
        ['Dados e infraestrutura', 'PostgreSQL, MySQL, Prisma, Firebase, Supabase, RabbitMQ, Docker'],
        ['Práticas', 'Testes automatizados, CI no GitHub, Git, Scrum e Kanban'],
        ['Inglês', 'Intermediário'],
      ],
      coursesTitle: 'Cursos',
      courses: [
        'Programação Java, SENAI, 120h (2022)',
        'Programação de Banco de Dados, SENAI, 120h (2024)',
        'Ciência da Computação de Harvard no Brasil, Fundação Estudar, 70h (2025)',
        'AWS Academy Graduate - AWS Academy Cloud Foundations (2022)',
        'AI-900, Fundamentos de IA no Azure, Fundação Bradesco, 16h (2025)',
      ],
    },
    contact: {
      title: 'Vamos conversar',
      intro: 'Meu objetivo principal é uma vaga como desenvolvedor full-stack júnior, mas também considero oportunidades de entrada em outras áreas de TI. Fale comigo por e-mail, WhatsApp ou LinkedIn.',
      email: 'E-mail',
      copy: 'Copiar e-mail',
      copied: 'E-mail copiado',
      whatsapp: 'WhatsApp',
      whatsappText: 'Enviar mensagem',
      resume: 'Baixar currículo (PDF)',
    },
    footer: 'Matheus Francisco, Limeira, SP.',
  },

  en: {
    meta: {
      title: 'Matheus Francisco | Junior Full-Stack Developer',
      jobTitle: 'Junior Full-Stack Developer',
      ogAlt: 'Portfolio cover of Matheus Francisco, Junior Full-Stack Developer: I build systems that stay live, with the list of the five published systems.',
      description:
        'Junior Full-Stack Developer in Limeira, Brazil. I built a machinery dealership’s management system on my own, in daily use. Java, Spring Boot, React and Node.js.',
    },
    ui: {
      skip: 'Skip to content',
      nav: { systems: 'Systems', method: 'How I work', path: 'Background', contact: 'Contact' },
      theme: 'Toggle light and dark theme',
      otherLangLabel: 'Ler esta página em português',
    },
    hero: {
      kicker: 'Junior Full-Stack Developer · Limeira, Brazil',
      available: 'Open to roles',
      name: 'Matheus Francisco',
      contact: 'Get in touch',
      title: 'I build systems that stay live.',
      lead:
        'I have worked at machinery dealership counters since 2017 and develop software from real operational problems. I built, on my own, the system that Vardão Máquinas uses every day, as well as the company website. I am looking for my first role as a junior full-stack developer and also consider entry-level IT opportunities.',
      stack: 'Java · Spring Boot · React · Node.js · TypeScript · PostgreSQL',
      primary: 'See the systems',
      secondary: 'Download résumé',
    },
    systemsSection: {
      title: 'Systems',
      intro: 'Five published projects. The main one is Vardão Central, in daily operation at a company; the other four show different areas and technologies.',
      problem: 'The problem',
      built: 'What I built',
      proof: 'Evidence',
      stack: 'Technologies',
      study: 'Read the case study',
      live: 'Open the system',
      demo: 'Open the demo',
      code: 'See the code',
      items: [
        {
          ...systems.vardao,
          tag: 'Main project · system in daily use',
          kind: 'Management system of a dealership, in daily operation',
          summary:
            'The system that Vardão Máquinas, an authorized Husqvarna dealer in Limeira, uses at the counter, in sales, finance and inventory. A solo project: I gathered the needs in the store itself, defined the business rules, the architecture and the tests, and I keep maintaining the system.',
          problem:
            'To answer "which part is it and how much", the counter opened a PDF catalog, a price spreadsheet and an old ERP. A wrong code led to a return, and finance lived in another system.',
          built: [
            'Counter: search by code, part or model, exploded view and quotes by PDF and WhatsApp, with validation of the part code.',
            'Sales: a CRM with a deal board, customer ranking, cross-selling and reactivation of idle customers.',
            'Finance: income statement, cash flow, working capital and ABC analysis, with the old ERP’s rules reproduced.',
            'Inventory: items to order, shortages, shelves and special parts orders for customers.',
            'Architecture: React and TypeScript front end, Node.js API, PostgreSQL with Prisma (49 models and 91 migrations), a RabbitMQ queue for reading PDF catalogs and role-based access checked on the server.',
          ],
          proof: [
            'The old ERP’s rules were reproduced in the system and each one has automated tests.',
            'Tests run locally on 10 Nov 2026, in an isolated environment (not CI results): 1,491 back end, 623 front end (Vitest) and 70 end-to-end (Playwright), all passing.',
            'The case study explains how the numbers were counted and the limits of these measurements.',
          ],
          imgAlt: 'Vardão Central counter: part search with the quote alongside, in a simulated store with fictional data.',
          study: '/estudo-de-caso-vardao-central/en/',
          liveNote: 'Access requires a store login. The code is private; I can present the architecture and code excerpts in a conversation.',
        },
        {
          ...systems.site,
          name: 'Vardão Máquinas website',
          tag: 'Complements Vardão Central',
          kind: 'Institutional company website, in production',
          summary: 'The institutional website of Vardão Máquinas, an authorized Husqvarna dealer and service center in Limeira, built so customers can find the company on Google and reach a salesperson. While Vardão Central serves the internal operation, the website serves the external customer.',
          built: [
            'Complete design and development in Next.js and TypeScript: the company, the service workshop, the product lines, customer reviews and a contact option on every page.',
            'Pages generated from typed data: title, description, structured data, sitemap and navigation follow the content, with no page-by-page SEO setup.',
            'Customer experience: search, parts guides and articles to help choose, a WhatsApp button that carries context, and a cookie notice where declining does not hurt browsing.',
          ],
          liveLabel: 'Open the website',
          study: '/estudo-de-caso-vardao-maquinas/en/',
          imgAlt: 'Home page of the Vardão Máquinas website, with the store front and the reasons to buy from Vardão.',
        },
        {
          ...systems.businessflow,
          tag: '2026',
          kind: 'Management SaaS for small businesses',
          summary: 'A multi-company platform where each business handles customers, finance, scheduling and support tickets in one dashboard.',
          built: [
            'Isolation between companies: every record belongs to a company, and a company never sees another one’s data.',
            'JWT authentication with refresh tokens, rate limiting and an audit log (who did what).',
            'Integrations: bank statement import (OFX), PDF reports and an API key for external systems.',
            'Back end with automated tests and CI on GitHub.',
          ],
          imgAlt: 'BusinessFlow login screen.',
        },
        {
          ...systems.iot,
          name: 'Industrial IoT Platform',
          tag: '2026',
          kind: 'Real-time industrial telemetry',
          summary: 'Sensors send readings to a Java API; a RabbitMQ queue notifies a Node gateway, which delivers the data to the React dashboard over WebSocket, with real-time alerts.',
          built: [
            'Java 21 and Spring Boot API, with Spring Security (JWT) and PostgreSQL persistence through JPA and Flyway.',
            'Messaging with RabbitMQ and real time over WebSocket; if real time fails, the reading is still saved and the dashboard falls back to polling the API.',
            'Tests on the Java API (some against a real PostgreSQL), the React dashboard and the browser, with CI on GitHub on every change.',
            'Demo with simulated telemetry and a "Simulate failure" button.',
          ],
          imgAlt: 'Dashboard with temperature, speed and vibration for three machines.',
          study: '/estudo-de-caso-plataforma-iot/en/',
        },
        {
          ...systems.economia,
          name: 'Solidarity Economy',
          tag: '2024 · SENAI capstone · team project',
          kind: 'Local producers marketplace',
          summary: 'Connects small producers in Limeira with consumers, with store sign-up and a map. Built as a team, as the capstone of the technical course.',
          built: [
            'My contribution: the React front end, the API integration and application state.',
            'Project features: login and data on Firebase, protected routes and CPF and CNPJ validation.',
          ],
          imgAlt: 'Solidarity Economy home page.',
        },
      ],
      more: 'My GitHub also has study and course repositories that show how my practice has evolved.',
      moreLink: 'See all on GitHub',
    },
    method: {
      title: 'How I work',
      items: [
        {
          title: 'I understand the problem before the code',
          text: 'Nine years of counter service taught me to ask what the person needs to solve. I gather the need from the people who use the system and turn it into business rules, as I did in Vardão Central.',
        },
        {
          title: 'I validate with tests',
          text: 'Business rules protected by automated tests and, in the open-source projects, CI on GitHub. In Vardão Central, the old ERP’s rules were reproduced and tested.',
        },
        {
          title: 'I publish and document',
          text: 'All five projects are published. The open-source ones have READMEs with run instructions, technical decisions and next steps; Vardão Central, which is private, has a case study.',
        },
      ],
    },
    path: {
      title: 'Background',
      intro: 'At the counter since 2017, programming since 2022.',
      items: [
        { when: '2024 to 2028', what: 'Computer Science, Anhembi Morumbi', text: 'In progress, expected October 2028.' },
        { when: '2022 to 2024', what: 'Technical course in Systems Development, SENAI', text: 'Java, databases, web and mobile. Capstone in 2024: Solidarity Economy.' },
        { when: 'Sep 2020 to today', what: 'Sales Representative, Vardão Máquinas', text: 'Family-owned authorized Husqvarna dealer. Consultative sales, purchasing, inventory and finance support. I built Vardão Central and a CRM to track customers and leads, as well as the company website.' },
        { when: 'Sep 2017 to Sep 2020', what: 'Stock and sales assistant → Sales Representative, Yamashita Tratores', text: 'Joined in Sep 2017 as an assistant and was promoted to Sales Representative in Oct 2017. Consultative service and technical sales of farm machinery.' },
      ],
      skillsTitle: 'Technologies',
      skills: [
        ['Back end', 'Java, Spring Boot, Spring Security, Node.js, Express, TypeScript, REST APIs'],
        ['Front end', 'React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS'],
        ['Data and infrastructure', 'PostgreSQL, MySQL, Prisma, Firebase, Supabase, RabbitMQ, Docker'],
        ['Practices', 'Automated testing, CI on GitHub, Git, Scrum and Kanban'],
        ['English', 'Intermediate'],
      ],
      coursesTitle: 'Courses',
      courses: [
        'Java Programming, SENAI, 120h (2022)',
        'Database Programming, SENAI, 120h (2024)',
        'Computer Science, Harvard in Brazil, Fundação Estudar, 70h (2025)',
        'AWS Academy Graduate - AWS Academy Cloud Foundations (2022)',
        'AI-900, Azure AI Fundamentals, Fundação Bradesco, 16h (2025)',
      ],
    },
    contact: {
      title: 'Let’s talk',
      intro: 'My primary goal is a junior full-stack developer role, but I am also open to entry-level opportunities across IT. Reach me by email, WhatsApp or LinkedIn.',
      email: 'Email',
      copy: 'Copy email',
      copied: 'Email copied',
      whatsapp: 'WhatsApp',
      whatsappText: 'Send a message',
      resume: 'Download résumé (PDF)',
    },
    footer: 'Matheus Francisco, Limeira, Brazil.',
  },
};
