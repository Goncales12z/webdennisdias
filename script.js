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

// 3. Fundo Animado Tech/AI (Canvas)
const canvas = document.getElementById("tech-background");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particlesArray;

  // Verifica se estamos na página de Eficiências (procura pela seção específica)
  const isEficiencias = document.getElementById("eficiencias") !== null;

  // Caracteres que representam Dados e Estatística
  const dataSymbols = "010101∑∫πμσΔΩx̄%";

  // Ajusta o tamanho do canvas para a janela inteira
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Objeto do Mouse para interação
  let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80),
  };

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  // Classe de Partícula
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
      // Atribui um símbolo aleatório a esta partícula
      if (isEficiencias) {
        this.text = dataSymbols.charAt(Math.floor(Math.random() * dataSymbols.length));
      }
    }

    // Desenha a partícula
    draw() {
      if (isEficiencias) {
        // Modo Data Science (Símbolos)
        ctx.font = "bold " + (this.size * 3 + 8) + "px Consolas, monospace";
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
      } else {
        // Modo Padrão (Bolinhas)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    
    update() {
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  
  function init() {
    particlesArray = [];
    // Se for eficiencias usa menos particulas (10000), se for normal usa mais (9000)
    let divider = isEficiencias ? 10000 : 9000;
    let numberOfParticles = (canvas.height * canvas.width) / divider;
    
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 3 + 1;
      let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
      let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
      let directionX = Math.random() * 2 - 1;
      let directionY = Math.random() * 2 - 1;
      let color = "#2c3e50"; // Cor padrão (Cinza Escuro)
      
      // Se for a página de dados, usa a cor Accent (Azul) para os símbolos também
      if (isEficiencias) {
        color = "#3498db";
      }

      particlesArray.push(
        new Particle(x, y, directionX, directionY, size, color),
      );
    }
  }


  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connect();
  }

  // Desenha linhas entre partículas e o mouse
  function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
      // Conexão com o mouse
      let dx = particlesArray[a].x - mouse.x;
      let dy = particlesArray[a].y - mouse.y;
      let distance = dx * dx + dy * dy;

      if (distance < 25000) { // Distância para conectar ao mouse
        ctx.strokeStyle = "rgba(52, 152, 219, 0.5)"; // Azul (Accent)
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }

      // Conexão entre partículas (Rede Neural)
      for (let b = a; b < particlesArray.length; b++) {
        let dx2 = particlesArray[a].x - particlesArray[b].x;
        let dy2 = particlesArray[a].y - particlesArray[b].y;
        let distance2 = dx2 * dx2 + dy2 * dy2;

        if (distance2 < (canvas.width / 7) * (canvas.height / 7)) {
          let opacityValue = 1 - distance2 / 18000; // Ajuste fino da opacidade da linha
          
          if (isEficiencias) {
            ctx.strokeStyle = "rgba(52, 152, 219," + opacityValue + ")"; // Azul Tech (Dados)
          } else {
            ctx.strokeStyle = "rgba(44, 62, 80," + opacityValue + ")"; // Cinza Padrão (Molecular)
          }

          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Redimensionamento da janela
  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  });

  init();
  animate();
}
