/* =========================================================
   SCRIPT.JS — MINIMAL LUX INTERACTIONS
   Suave • Profissional • Elegante
========================================================= */

// Smooth scroll (nativo e cross-browser)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 60,
      behavior: "smooth",
    });
  });
});

// Reveal On Scroll
const revealElements = document.querySelectorAll(
  ".section, .card, .hero-text, .hero-avatar, .tech-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* =========================================================
   LIGHTBOX SUPER MINIMALISTA
========================================================= */

function createLightbox(images, startIndex = 0) {
  let index = startIndex;

  // Overlay
  const overlay = document.createElement("div");
  overlay.className = "lux-lightbox";
  overlay.innerHTML = `
    <div class="lux-lightbox-inner">
      <button class="lux-close">×</button>
      <img class="lux-image" src="${images[index]}">
      <button class="lux-prev">‹</button>
      <button class="lux-next">›</button>
    </div>
  `;

  document.body.appendChild(overlay);

  const img = overlay.querySelector(".lux-image");
  const closeBtn = overlay.querySelector(".lux-close");
  const nextBtn = overlay.querySelector(".lux-next");
  const prevBtn = overlay.querySelector(".lux-prev");

  function updateImage() {
    img.src = images[index];
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    updateImage();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    updateImage();
  });

  closeBtn.addEventListener("click", () => overlay.remove());

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.addEventListener("keydown", function keyHandler(e) {
    if (!document.body.contains(overlay)) {
      document.removeEventListener("keydown", keyHandler);
      return;
    }
    if (e.key === "Escape") overlay.remove();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });
}

// Botões "Screenshots"
document.querySelectorAll(".lightbox").forEach((btn) => {
  btn.addEventListener("click", () => {
    const images = JSON.parse(btn.dataset.images || "[]");
    if (images.length > 0) createLightbox(images, 0);
  });
});

// Clique na própria imagem do projeto
document.querySelectorAll(".project-card img").forEach((img) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    const btn = img.closest(".project-card").querySelector(".lightbox");
    if (!btn) return createLightbox([img.src], 0);
    btn.click();
  });
});

/* =========================================================
   SET YEAR AUTOMATICALLY
========================================================= */

const yearEl = document.getElementById("ano");
if (yearEl) yearEl.textContent = new Date().getFullYear();
