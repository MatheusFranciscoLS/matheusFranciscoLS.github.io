document.addEventListener("DOMContentLoaded", () => {
  /* 1. Menu Mobile */
  const menuIcon = document.querySelector(".mobile-menu-icon");
  const navLinks = document.querySelector(".nav-links");

  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuIcon.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
    });
  }

  /* 2. Reveal on Scroll */
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      ".hero-text, .hero-visual, .tech-box, .about-text, .certs-wrapper, .project-card, .contact-box"
    )
    .forEach((el) => {
      el.classList.add("hidden");
      observer.observe(el);
    });

  /* 3. Botão Voltar ao Topo */
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) backToTopBtn.classList.add("show-btn");
      else backToTopBtn.classList.remove("show-btn");
    });
  }

  /* 4. Função Copiar E-mail */
  window.copyEmail = function () {
    const email = "matheusf.ls@hotmail.com";
    const btnText = document.getElementById("copyText");

    navigator.clipboard
      .writeText(email)
      .then(() => {
        const originalText = btnText.innerText;
        btnText.innerText = "✅ Copiado!";
        setTimeout(() => (btnText.innerText = originalText), 2000);
      })
      .catch((err) => console.error("Erro:", err));
  };

  /* 5. Ano Automático */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* --- 6. Envio de Formulário sem Redirecionar (AJAX) --- */
  const form = document.getElementById("contact-form");

  async function handleSubmit(event) {
    event.preventDefault(); // Impede o redirecionamento para a página branca

    const status = document.createElement("p"); // Cria msg de status
    status.style.textAlign = "center";
    status.style.marginTop = "10px";

    const btn = form.querySelector("button");
    const originalBtnText = btn.innerText;

    btn.innerText = "Enviando...";
    btn.disabled = true;

    const data = new FormData(event.target);

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML = "✅ Mensagem enviada com sucesso!";
          status.style.color = "#4ade80"; // Verde
          form.reset(); // LIMPA OS CAMPOS AQUI
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML = "❌ Erro ao enviar. Tente novamente.";
            }
            status.style.color = "#f87171"; // Vermelho
          });
        }
      })
      .catch((error) => {
        status.innerHTML = "❌ Erro de conexão.";
        status.style.color = "#f87171";
      })
      .finally(() => {
        btn.innerText = originalBtnText;
        btn.disabled = false;
        form.appendChild(status); // Mostra a mensagem abaixo do botão

        // Remove a mensagem depois de 4 segundos
        setTimeout(() => status.remove(), 4000);
      });
  }

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});
