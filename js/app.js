// --- DICIONÁRIO DE TRADUÇÃO COMPLETO ---
const translations = {
  pt: {
    // Menu
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",

    // Hero
    "hero.badge": "Disponível para projetos",
    "hero.role": "Desenvolvedor Full-Stack",
    "hero.subrole": "Java, Spring Boot & React",
    "hero.bio":
      "Crio aplicações modernas, rápidas e escaláveis unindo a robustez do Java + Spring Boot com a flexibilidade do React. Tenho forte atuação na construção de arquiteturas distribuídas, microsserviços e mensageria, entregando soluções completas do backend à nuvem. Tenho visão técnica e prática — construo soluções de ponta a ponta, priorizando código limpo, performance e experiência do usuário.",
    "hero.ctaPrimary": "Ver Projetos",
    "hero.ctaSecondary": " Ver Repositórios",
    "hero.xpYears": "8+",
    "hero.xpText": "Anos de Exp. Profissional",

    // Stats Hero
    "hero.stat1Title": "Engenharia de Software",
    "hero.stat1Desc": "Código limpo e escalável.",
    "hero.stat2Title": "Projetos Full-Stack",
    "hero.stat2Desc": "Aplicações de ponta a ponta.",

    // IMPACTO / DIFERENCIAIS
    "value.title": "Meu Impacto no Time",
    "value.subtitle":
      "Não sou apenas um codificador. Trago visão de negócio e maturidade profissional.",
    "value.card1.title": "Autonomia & Resolução",
    "value.card1.desc":
      "Não espero ordens, busco soluções. Minha bagagem comercial me ensinou a resolver problemas de forma independente e proativa.",
    "value.card2.title": "Código com Propósito",
    "value.card2.desc":
      "Entendo que o software existe para resolver uma dor. Foco em entregar valor real, não apenas em escrever linhas de código.",
    "value.card3.title": "Comunicação Assertiva",
    "value.card3.desc":
      "Traduzo requisitos técnicos para linguagem de negócio e vice-versa, facilitando o alinhamento entre equipes e stakeholders.",

    // Sobre
    "about.badge": "Minha Jornada",
    "about.title":
      "Visão estratégica,<br> <span class='text-gradient'>execução técnica.</span>",
    "about.desc1":
      "Com <strong>8 anos de experiência profissional</strong>, desenvolvi uma visão estratégica forte: entender pessoas, problemas e entregar soluções reais.",
    "about.desc2":
      "Hoje aplico essa experiência no desenvolvimento de software, criando sistemas completos que combinam arquitetura sólida, UX intuitiva e código escalável. Meu objetivo é simples: transformar ideias em produtos funcionais e eficientes.",
    "about.cv": "Baixar Currículo PDF",
    "about.certs": "Formação & Certificados",

    // Skills
    "about.skill1": "💡 Resolução de Problemas",
    "about.skill2": "🤝 Negociação",
    "about.skill3": "🗣️ Comunicação Clara",
    "about.skill4": "⚡ Autonomia",
    "about.skill5": "🔄 Adaptabilidade",

    // Certificados
    "cert.cs": "Ciência da Computação",
    "cert.cs.desc": "Bacharelado — Anhembi Morumbi (Em curso)",
    "cert.tec": "Técnico em Desenv. de Sistemas",
    "cert.tec.desc": "Formação Completa — SENAI (2022 - 2024)",
    "cert.java": "Java & Banco de Dados",
    "cert.java.desc": "Formação Específica (240h) — SENAI",
    "cert.aws": "AWS Cloud Practitioner",
    "cert.aws.desc": "Infraestrutura e Nuvem",

    // Tech Stack
    "tech.title": "Tecnologias & Ferramentas",
    "tech.subtitle":
      "Meu arsenal técnico para construir soluções escaláveis e de alta performance.",
    "tech.backend": "Back-end & Dados",
    "tech.frontend": "Front-end Moderno",
    "tech.devops": "DevOps & Ferramentas",

    // Projetos
    "projects.title": "Soluções em Software",
    "projects.subtitle":
      "Aplicações full-stack desenvolvidas com foco em performance, escalabilidade e experiência do usuário.",
    "projects.viewAll": "Ver tudo no GitHub →",

    // TIPOS DOS PROJETOS (Tags do Cabeçalho do Card)
    "p1.type": "Microsserviços",
    "p2.type": "Full-Stack",
    "p3.type": "Full-Stack",
    "p4.type": "Front-end",

    // PROJETO 1 (Destaque - IoT)
    "p1.title": "Plataforma IoT",
    "p1.desc":
      "Arquitetura de microsserviços em tempo real. Monitoramento de telemetria de máquinas integrando simulador Python, mensageria com RabbitMQ, API Core em Java (Spring Boot), Gateway Node.js com WebSockets e interface React protegida por JWT.",
    "p1.tag1": "RabbitMQ",
    "p1.tag2": "WebSockets",
    "p1.tag3": "Docker",

    // PROJETO 2 (Business Flow)
    "p2.title": "Business Flow",
    "p2.desc":
      "Sistema completo de gestão empresarial, reunindo financeiro, CRM de clientes e relatórios PDF. Inclui tabela dinâmica, cálculos automáticos e filtros avançados.",
    "p2.tag1": "Prisma ORM",
    "p2.tag2": "Upload Multer",
    "p2.tag3": "Relatórios PDF",

    // PROJETO 3 (Economia Solidária)
    "p3.title": "Economia Solidária",
    "p3.desc":
      "Plataforma full-stack criada para conectar pequenos produtores e consumidores. Sistema completo com autenticação, upload de imagens, cadastro de produtos e painel de gestão.",
    "p3.tag1": "Firebase Storage",
    "p3.tag2": "Arquitetura Modular",
    "p3.tag3": "Auth JWT",

    // PROJETO 4 (Chat FURIA)
    "p4.title": "Chat FURIA",
    "p4.desc":
      "Interface moderna para comunidade de fãs. Versão Front-End com foco em UX, gamificação visual, componentização limpa e alta performance.",
    "p4.tag1": "CSS Puro",
    "p4.tag2": "Gamification UI",
    "p4.tag3": "React Hooks",

    // Contato
    "contact.title": "Pronto para somar ao time.",
    "contact.subtitle": "Me chame e vamos conversar sobre oportunidades.",
    "contact.whats": " WhatsApp",
    "contact.copy": "📧 Copiar E-mail",
    "contact.send": "Enviar Agora",
    "contact.copied": "✅ Copiado!",
    "contact.direct": "Ou envie uma mensagem direta:",

    // Form
    "form.name": "Seu Nome",
    "form.email": "Seu Email",
    "form.message": "Como posso ajudar?",
  },

  en: {
    // Menu
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero
    "hero.badge": "Available for hire",
    "hero.role": "Full-Stack Developer",
    "hero.subrole": "Java, Spring Boot & React",
    "hero.bio":
      "I build modern, fast, and scalable applications combining the robustness of Java + Spring Boot with the flexibility of React. I have a strong focus on building distributed architectures, microservices, and messaging, delivering complete solutions from the backend to the cloud. I have a technical and practical vision — building end-to-end solutions, prioritizing clean code, performance, and user experience.",
    "hero.ctaPrimary": "View Projects",
    "hero.ctaSecondary": " GitHub Repos",
    "hero.xpYears": "8+",
    "hero.xpText": "Years Pro Experience",

    // Stats Hero
    "hero.stat1Title": "Software Engineering",
    "hero.stat1Desc": "Clean and scalable code.",
    "hero.stat2Title": "Full-Stack Projects",
    "hero.stat2Desc": "End-to-end applications.",

    // IMPACT / VALUE SECTION
    "value.title": "My Impact on the Team",
    "value.subtitle":
      "I'm not just a coder. I bring business vision and professional maturity.",
    "value.card1.title": "Autonomy & Resolution",
    "value.card1.desc":
      "I don't wait for orders, I seek solutions. My commercial background taught me to solve problems independently and proactively.",
    "value.card2.title": "Purposeful Code",
    "value.card2.desc":
      "I understand software exists to solve pain points. I focus on delivering real value, not just writing lines of code.",
    "value.card3.title": "Clear Communication",
    "value.card3.desc":
      "I bridge the gap between technical requirements and business language, facilitating alignment across teams and stakeholders.",

    // About
    "about.badge": "My Journey",
    "about.title":
      "Strategic vision,<br> <span class='text-gradient'>technical execution.</span>",
    "about.desc1":
      "With <strong>8 years of professional experience</strong>, I developed a strong strategic vision: understanding people, problems, and delivering real solutions.",
    "about.desc2":
      "Today I apply this experience in software development, creating complete systems that combine solid architecture, intuitive UX, and scalable code. My goal is simple: transform ideas into functional and efficient products.",
    "about.cv": "Download Resume (PDF)",
    "about.certs": "Education & Certs",

    // Skills
    "about.skill1": "💡 Problem Solving",
    "about.skill2": "🤝 Negotiation",
    "about.skill3": "🗣️ Clear Communication",
    "about.skill4": "⚡ Autonomy",
    "about.skill5": "🔄 Adaptability",

    // Certs
    "cert.cs": "Computer Science",
    "cert.cs.desc": "Bachelor's Degree — Anhembi Morumbi (Ongoing)",
    "cert.tec": "Systems Development Tech",
    "cert.tec.desc": "Full Technical Course — SENAI (2022 - 2024)",
    "cert.java": "Java & Database",
    "cert.java.desc": "Specific Training (240h) — SENAI",
    "cert.aws": "AWS Cloud Practitioner",
    "cert.aws.desc": "Infrastructure & Cloud",

    // Tech
    "tech.title": "Tech Stack & Tools",
    "tech.subtitle":
      "My technical arsenal for building scalable and high-performance solutions.",
    "tech.backend": "Back-end & Data",
    "tech.frontend": "Modern Front-end",
    "tech.devops": "DevOps & Tools",

    // Projects Intro
    "projects.title": "Software Solutions",
    "projects.subtitle":
      "Full-stack applications developed with a focus on performance, scalability, and user experience.",
    "projects.viewAll": "View all on GitHub →",

    // TIPOS DOS PROJETOS (Tags do Cabeçalho do Card)
    "p1.type": "Microservices",
    "p2.type": "Full-Stack",
    "p3.type": "Full-Stack",
    "p4.type": "Front-end",

    // PROJECT 1 (Highlight - IoT)
    "p1.title": "IoT Platform",
    "p1.desc":
      "Real-time microservices architecture for machine telemetry monitoring. Integrates a Python simulator, RabbitMQ messaging, Java (Spring Boot) Core API, Node.js Gateway with WebSockets, and a JWT-secured React interface.",
    "p1.tag1": "RabbitMQ",
    "p1.tag2": "WebSockets",
    "p1.tag3": "Docker",

    // PROJECT 2 (Business Flow)
    "p2.title": "Business Flow",
    "p2.desc":
      "Complete business management system, gathering finance, CRM, and PDF reports. Includes dynamic tables, automatic calculations, and advanced filters.",
    "p2.tag1": "Prisma ORM",
    "p2.tag2": "Upload Multer",
    "p2.tag3": "PDF Reports",

    // PROJECT 3 (Solidarity Economy)
    "p3.title": "Solidarity Economy",
    "p3.desc":
      "Full-stack platform created to connect small local producers and consumers. Complete system with authentication, image upload, product registration, and management panel.",
    "p3.tag1": "Firebase Storage",
    "p3.tag2": "Modular Arch",
    "p3.tag3": "Auth JWT",

    // PROJECT 4 (Chat FURIA)
    "p4.title": "Chat FURIA",
    "p4.desc":
      "Modern interface for a fan community. Front-End version focused on UX, visual gamification, clean componentization, and high performance.",
    "p4.tag1": "Pure CSS",
    "p4.tag2": "Gamification UI",
    "p4.tag3": "React Hooks",

    // Contact
    "contact.title": "Ready to join your team.",
    "contact.subtitle": "Reach out and let's discuss opportunities.",
    "contact.whats": " WhatsApp",
    "contact.copy": "📧 Copy E-mail",
    "contact.send": "Send Now",
    "contact.copied": "✅ Copied!",
    "contact.direct": "Or send a direct message:",

    // Form
    "form.name": "Your Name",
    "form.email": "Your Email",
    "form.message": "How can I help you?",
  },
};

// --- FUNÇÃO DE TRADUÇÃO ROBUSTA ---
window.changeLanguage = function (lang) {
  // 1. Atualiza Textos
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = translations[lang][key];
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });

  // 2. Atualiza Botões Ativos
  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.querySelector(
    `.lang-btn[onclick="changeLanguage('${lang}')"]`,
  );
  if (activeBtn) activeBtn.classList.add("active");

  // 3. TROCA O ARQUIVO DO CURRÍCULO
  const cvLink = document.getElementById("cv-link");
  if (cvLink) {
    if (lang === "en") {
      cvLink.href = "assets/curriculo-en.pdf";
    } else {
      cvLink.href = "assets/curriculo-pt.pdf";
    }
  }

  // 4. Salva preferência
  localStorage.setItem("preferredLang", lang);
};

// --- INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang") || "pt";
  changeLanguage(savedLang);
  initContactForm();

  // Menu Mobile
  const menuIcon = document.querySelector(".mobile-menu-icon");
  const navLinks = document.querySelector(".nav-links");
  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuIcon.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
    });
  }

  // Animação de Scroll
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("scroll-visible");
    });
  }, observerOptions);
  document.querySelectorAll(".section").forEach((el) => observer.observe(el));

  // Botão Voltar ao Topo
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) backToTopBtn.classList.add("show-btn");
      else backToTopBtn.classList.remove("show-btn");
    });
  }

  // Ano Automático
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// --- FUNÇÃO DE COPIAR EMAIL ---
window.copyEmail = function () {
  const email = "matheusf.ls@hotmail.com";
  const btnText = document.getElementById("copyText");
  const currentLang = document
    .querySelector(".lang-btn.active")
    ?.getAttribute("onclick")
    .includes("'en'")
    ? "en"
    : "pt";

  navigator.clipboard.writeText(email).then(() => {
    const originalText = translations[currentLang]["contact.copy"];
    btnText.innerText = translations[currentLang]["contact.copied"];
    setTimeout(() => (btnText.innerText = originalText), 2000);
  });
};

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const submitBtn = form.querySelector("button[type=submit]");
    const existingMessage = form.querySelector(".success-message");

    if (existingMessage) existingMessage.remove();

    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        form.insertAdjacentHTML(
          "beforeend",
          `<p class="success-message" style="margin-top: 15px; color: #4ade80; font-size: 1rem; text-align: center;">✔️ Mensagem enviada com sucesso!</p>`,
        );
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      alert("Ocorreu um erro inesperado. Tente novamente.");
    }
    submitBtn.textContent = "Enviar Agora";
    submitBtn.disabled = false;
  });
}
