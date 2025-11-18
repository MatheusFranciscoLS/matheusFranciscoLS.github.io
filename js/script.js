document.addEventListener("DOMContentLoaded", () => {
  /* --- FUNÇÃO LIGHTBOX (ZOOM) --- */
  function openLightbox(src) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.style.cssText =
      "position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;backdrop-filter:blur(5px);opacity:0;transition:opacity 0.3s;";

    const img = document.createElement("img");
    img.src = src;
    img.style.cssText =
      "max-width:90%;max-height:90%;border-radius:8px;box-shadow:0 0 20px rgba(112,0,255,0.5);transform:scale(0.9);transition:transform 0.3s;";

    document.body.appendChild(overlay);
    overlay.appendChild(img);

    // Ativa a animação de entrada
    setTimeout(() => {
      overlay.style.opacity = "1";
      img.style.transform = "scale(1)";
    }, 10);

    // Remove ao clicar
    overlay.addEventListener("click", () => {
      overlay.style.opacity = "0";
      img.style.transform = "scale(0.9)";
      setTimeout(() => overlay.remove(), 300);
    });

    // Remove ao pressionar ESC
    window.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape") {
        overlay.click();
        window.removeEventListener("keydown", esc);
      }
    });
  }

  // Ouve o clique nas imagens de projeto
  document.querySelectorAll(".proj-img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src));
  });

  /* ---------------------------------------------------- */
  /* --- LÓGICAS EXISTENTES (MENU, SCROLL, CONTATO) --- */
  /* ---------------------------------------------------- */

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

  /* 5. Função de Envio do Formulário (AJAX) */
  const form = document.getElementById("contact-form");

  async function handleSubmit(event) {
    event.preventDefault();

    const status = document.createElement("p");
    status.style.cssText =
      "text-align: center; margin-top: 10px; font-weight: 600;";

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
          status.style.color = "#4ade80";
          form.reset();
        } else {
          response.json().then((data) => {
            status.innerHTML = "❌ Erro ao enviar. Tente novamente.";
            status.style.color = "#f87171";
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
        form.appendChild(status);
        setTimeout(() => status.remove(), 4000);
      });
  }

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }

  /* 6. Ano Automático */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
