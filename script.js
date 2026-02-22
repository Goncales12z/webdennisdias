// 1. Navegação Suave (Smooth Scroll)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Impede o pulo seco padrão do navegador

    const destino = document.querySelector(this.getAttribute("href"));
    destino.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// 2. Animação de Revelar ao Rolar a Página (Scroll Reveal)
// Cria um observador que vigia os elementos na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Se o elemento estiver visível na tela
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

// Pega todos os elementos que têm a classe 'hidden' no HTML
const hiddenElements = document.querySelectorAll(".hidden");

// Manda o observador vigiar cada um deles
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("transition-overlay");

  // 1. Ao carregar: Remove a cortina e dá fade-in no corpo
  window.addEventListener("load", () => {
    overlay.classList.add("loaded");
    document.body.classList.add("fade-in");
  });

  // 2. Captura todos os links internos para criar a transição de saída
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Verifica se é um link interno (não começa com http nem é um ID #)
      if (
        href &&
        !href.startsWith("http") &&
        !href.startsWith("#") &&
        !link.target
      ) {
        e.preventDefault(); // Para o carregamento imediato

        overlay.classList.remove("loaded");
        overlay.classList.add("leaving");

        // Espera a animação da cortina terminar (0.6s) para mudar de página
        setTimeout(() => {
          window.location.href = href;
        }, 600);
      }
    });
  });
});
