document.addEventListener("DOMContentLoaded", () => {
  /* --- 1. Menu Mobile --- */
  const menuIcon = document.querySelector(".mobile-menu-icon");
  const navLinks = document.querySelector(".nav-links");

  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuIcon.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
    });
  }

  /* --- 2. Reveal on Scroll (Animação ao rolar) --- */
  const observerOptions = {
    threshold: 0.1, // Ativa quando 10% do elemento aparece
    rootMargin: "0px 0px -50px 0px", // Pequena margem para não ativar muito cedo
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Para de observar depois que animou
      }
    });
  }, observerOptions);

  // Seleciona os elementos novos do layout moderno
  const elementsToAnimate = document.querySelectorAll(
    ".hero-text, .hero-image-wrapper, .tech-box, .about-content, .timeline-row, .contact-box"
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("hidden"); // Adiciona opacidade 0 inicial via JS para não piscar
    observer.observe(el);
  });

  /* --- 3. Lightbox (Zoom nas imagens) --- */
  function openLightbox(src) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    // Estilo inline para garantir que funcione sem CSS extra
    overlay.style.cssText =
      "position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;backdrop-filter:blur(5px);animation:fadeIn 0.3s;";

    const img = document.createElement("img");
    img.src = src;
    img.style.cssText =
      "max-width:90%;max-height:90%;border-radius:8px;box-shadow:0 0 20px rgba(112,0,255,0.5);transform:scale(0.9);transition:0.3s;";

    // Pequeno delay para animação de zoom
    setTimeout(() => (img.style.transform = "scale(1)"), 10);

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => overlay.remove());
  }

  // Adiciona click nas imagens dos projetos
  document.querySelectorAll(".proj-img").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(img.src));
  });
});
