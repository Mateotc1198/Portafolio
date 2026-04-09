/* =====================================================================
   PORTAFOLIO — script.js (Optimizado para 60 FPS)
   Siguiendo las mejores prácticas oficiales de GSAP y optimización web.
   ===================================================================== */

// ─── 1. REGISTRO DE PLUGINS (Se hace una sola vez para evitar errores) ────────────
gsap.registerPlugin(ScrollTrigger);

// ─── 2. DATOS DEL PORTAFOLIO (Fuente de verdad centralizada) ───────────────────
const portfolioData = {
  about: {
    description: [
      "Desarrollador de software con un enfoque híbrido: me muevo entre la lógica robusta de .NET y la creación de interfaces dinámicas con React y GSAP. Me obsesiona el detalle, desde la arquitectura de una API hasta la fluidez de una animación en el frontend.",
      "Mi objetivo es construir aplicaciones que no solo cumplan su función, sino que sean rápidas, accesibles y fáciles de mantener. No me quedo con lo que ya sé; busco retos que me obliguen a subir el nivel constantemente."
    ],
    features: [
      { title: "Adaptabilidad", icon: "ph ph-arrows-merge", desc: "Capacidad para integrarme rápidamente a nuevos stacks tecnológicos y flujos de trabajo específicos de la empresa." },
      { title: "Aprendizaje Continuo", icon: "ph ph-student", desc: "Autodidacta apasionado, siempre explorando nuevas herramientas y mejores prácticas para perfeccionar mis habilidades." },
      { title: "Resolución de Problemas", icon: "ph ph-puzzle-piece", desc: "Enfoque analítico para descomponer problemas complejos en soluciones técnicas eficientes y lógicas." }
    ],
    pillars: ["Performance", "Clean Code", "UX Focus"],
    status: {
      location: "Medellín, Colombia",
      availability: "Disponible para proyectos",
      contact: "Mateotorres.cardona@gmail.com"
    }
  },
  technologies: [
    {
      category: "Backend",
      tools: [
        { name: "C#", icon: "devicon-csharp-plain colored" },
        { name: ".NET Core", icon: "devicon-dotnetcore-plain colored" },
        { name: "SQL Server", icon: "devicon-microsoftsqlserver-plain colored" },
        { name: "C++", icon: "devicon-cplusplus-plain colored" },
        { name: "Firebase", icon: "devicon-firebase-plain colored" },
      ]
    },
    {
      category: "Frontend",
      tools: [
        { name: "React", icon: "devicon-react-original colored" },
        { name: "TypeScript", icon: "devicon-typescript-plain colored" },
        { name: "JavaScript", icon: "devicon-javascript-plain colored" },
        { name: "GSAP", icon: "devicon-javascript-plain" },
        { name: "HTML5", icon: "devicon-html5-plain colored" },
        { name: "CSS3", icon: "devicon-css3-plain colored" }
      ]
    },
    {
      category: "Workflow y Deployment",
      tools: [
        { name: "Vite", icon: "devicon-vitejs-plain colored" },
        { name: "Git", icon: "devicon-git-plain colored" },
        { name: "GitHub", icon: "devicon-github-original" },
      ]
    }
  ],
  projects: [
    {
      id: "01",
      title: "MT-Store",
      tagline: "Tienda virtual de tenis para hombre y mujer.",
      stack: ["Javascript", "GSAP", "Firebase", "Vite"],
      image: "MT-Store.png",
      repo: "https://github.com/Mateotc1198/MT-Store"
    },
    {
      id: "02",
      title: "Casa Blanca Reservas",
      tagline: "Sistema de reservas hoteleras con integración SQL y panel administrativo de control total.",
      stack: [".NET MVC 5", "SQL Server", "C#", "JS"],
      image: "https://raw.githubusercontent.com/Mateotc1198/CasaBlanca/main/assets/screenshots/home.png",
      repo: "https://github.com/Mateotc1198/CasaBlanca"
    },
    {
      id: "03",
      title: "Portafolio",
      tagline: "Interfaz de alto impacto, animaciones GSAP.",
      stack: ["HTML", "GSAP", "Vanilla CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3",
      demo: "#",
      repo: "#"
    }
  ],
  // Datos de contacto para inyección dinámica
  contact: {
    email: "Mateotorres.cardona@gmail.com",
    socials: [
      { label: "GitHub", url: "https://github.com/Mateotc1198" },
    ]
  }
};

/* ─── 3. CONFIGURACIÓN GLOBAL DE GSAP ───────────────────────────────────── */
gsap.defaults({ ease: "power2.out", duration: 0.8 });

/* ─── RENDIMIENTO: Patrón Singleton para la posición del ratón ─────────────
   Se usa un solo "listener" de mousemove para todo el sitio.
   Esto evita que múltiples elementos escuchen el evento por separado,
   ahorrando recursos del procesador significativamente. ─────────────────── */
const mouse = { x: -9999, y: -9999, moved: false };
let mouseHandlers = [];

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.moved = true;
}, { passive: true });

// Procesar todas las funciones registradas en un solo "tick" — evita duplicar procesos
gsap.ticker.add(() => {
  if (!mouse.moved) return;
  mouse.moved = false;
  for (let i = 0; i < mouseHandlers.length; i++) {
    mouseHandlers[i](mouse.x, mouse.y);
  }
});

/* ─── 4. EFECTOS ESPECIALES DE FONDO ──────────────────────────────────── */

function initGlows() {
  const glows = gsap.utils.toArray('.glow');
  glows.forEach((glow, i) => {
    // ✅ Promovemos el elemento a una capa de GPU al inicio 
    // Luego solo animamos transformaciones y opacidad para máxima fluidez.
    gsap.set(glow, { force3D: true });
    gsap.to(glow, {
      x: () => (Math.random() - 0.5) * 600,
      y: () => (Math.random() - 0.5) * 600,
      scale: () => 0.8 + Math.random() * 0.4,
      duration: 20 + i * 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    gsap.to(glow, {
      autoAlpha: 0.2 + (i * 0.1),
      duration: 5 + i * 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  });
}

/* ─── 4b. CONSTELACIÓN DE PARTÍCULAS INTERACTIVAS (OPTIMIZADA) ────────── */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  const isMobile = window.innerWidth < 768;
  const dpr = Math.min(window.devicePixelRatio || 1, 2); // Limitamos a 2x para no saturar la GPU en pantallas Retina

  const CFG = {
    count: isMobile ? 25 : 65,          // ✅ El número de partículas varía según la potencia del dispositivo
    linkDist: isMobile ? 90 : 130,
    linkDistSq: 0,                       // ✅ Distancia de conexión pre-calculada al cuadrado (más rápido)
    speed: 0.3,
    rMin: 0.8, rMax: 2.2,
    repelR: 150, repelRSq: 0, repelF: 1.4,
    colorA: '14, 165, 233',
    colorB: '99, 102, 241',
    lineAlpha: 0.18,
    dotAlpha: 0.55,
    cellSize: 0,                         // ✅ Tamaño de celda para la optimización de "Spatial Hash"
  };
  CFG.linkDistSq = CFG.linkDist * CFG.linkDist;
  CFG.repelRSq = CFG.repelR * CFG.repelR;
  CFG.cellSize = CFG.linkDist;

  let W, H, particles = [];
  // ✅ Cuadrícula espacial: Optimiza la búsqueda de vecinos para que sea lineal O(n) en lugar de cuadrática O(n²)
  // Esto permite tener muchas partículas sin que el sitio se ponga lento.
  let grid = {};
  let gridCols = 0, gridRows = 0;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gridCols = Math.ceil(W / CFG.cellSize) + 1;
    gridRows = Math.ceil(H / CFG.cellSize) + 1;
  }

  function makeParticle() {
    const useB = Math.random() > 0.72;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * CFG.speed,
      vy: (Math.random() - 0.5) * CFG.speed,
      r: CFG.rMin + Math.random() * (CFG.rMax - CFG.rMin),
      op: 0.25 + Math.random() * 0.45,
      c: useB ? CFG.colorB : CFG.colorA,
    };
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    const mX = mouse.x, mY = mouse.y;
    const maxV = CFG.speed * 2.8;

    // ✅ Construcción de la rejilla espacial para optimizar cálculos
    grid = {};
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Efecto de repulsión del ratón — usamos distancia al cuadrado para no hacer operaciones de raíz cuadrada (lento)
      const dx = p.x - mX, dy = p.y - mY;
      const dSq = dx * dx + dy * dy;
      if (dSq < CFG.repelRSq && dSq > 0) {
        const d = Math.sqrt(dSq);
        const f = ((CFG.repelR - d) / CFG.repelR) * CFG.repelF;
        p.vx += (dx / d) * f * 0.09;
        p.vy += (dy / d) * f * 0.09;
      }

      p.vx *= 0.985; p.vy *= 0.985;
      if (p.vx > maxV) p.vx = maxV; else if (p.vx < -maxV) p.vx = -maxV;
      if (p.vy > maxV) p.vy = maxV; else if (p.vy < -maxV) p.vy = -maxV;
      p.x += p.vx; p.y += p.vy;

      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      else if (p.x > W) { p.x = W; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      else if (p.y > H) { p.y = H; p.vy *= -1; }

      // Insertar cada partícula en la rejilla para luego buscar solo partículas cercanas
      const col = (p.x / CFG.cellSize) | 0;
      const row = (p.y / CFG.cellSize) | 0;
      const key = col + row * gridCols;
      if (!grid[key]) grid[key] = [];
      grid[key].push(i);
    }

    // ✅ Dibujar líneas usando la rejilla espacial — solo comparamos con partículas en celdas vecinas
    ctx.lineWidth = 1; // Definimos el grosor una sola vez antes del bucle para ganar velocidad
    for (let i = 0; i < particles.length; i++) {
      const pi = particles[i];
      const col = (pi.x / CFG.cellSize) | 0;
      const row = (pi.y / CFG.cellSize) | 0;

      // Comprobamos 4 celdas vecinas (derecha, abajo-izq, abajo, abajo-der) 
      // para evitar procesar la misma pareja de partículas dos veces.
      for (let dc = 0; dc <= 1; dc++) {
        for (let dr = (dc === 0 ? 1 : -1); dr <= 1; dr++) {
          const nc = col + dc;
          const nr = row + dr;
          if (nc < 0 || nc >= gridCols || nr < 0 || nr >= gridRows) continue;
          const key = nc + nr * gridCols;
          const cell = grid[key];
          if (!cell) continue;
          for (let k = 0; k < cell.length; k++) {
            const j = cell[k];
            if (j <= i) continue;
            const pj = particles[j];
            const ddx = pi.x - pj.x;
            const ddy = pi.y - pj.y;
            const dSq = ddx * ddx + ddy * ddy;
            if (dSq >= CFG.linkDistSq) continue;
            const t = 1 - Math.sqrt(dSq) / CFG.linkDist;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(${pi.c},${(t * CFG.lineAlpha).toFixed(2)})`;
            ctx.stroke();
          }
        }
      }
      // También comparamos con partículas dentro de la misma celda
      const ownKey = col + row * gridCols;
      const ownCell = grid[ownKey];
      if (ownCell) {
        for (let k = 0; k < ownCell.length; k++) {
          const j = ownCell[k];
          if (j <= i) continue;
          const pj = particles[j];
          const ddx = pi.x - pj.x;
          const ddy = pi.y - pj.y;
          const dSq = ddx * ddx + ddy * ddy;
          if (dSq >= CFG.linkDistSq) continue;
          const t = 1 - Math.sqrt(dSq) / CFG.linkDist;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.strokeStyle = `rgba(${pi.c},${(t * CFG.lineAlpha).toFixed(2)})`;
          ctx.stroke();
        }
      }
    }

    // ✅ Dibujado por lotes: Pintamos todos los puntos en un solo pase de relleno por color
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // Glow halo
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3, 0, 6.2832);
      ctx.fillStyle = `rgba(${p.c},${(p.op * 0.12).toFixed(2)})`;
      ctx.fill();
      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = `rgba(${p.c},${p.op})`;
      ctx.fill();
    }
  }

  resize();
  particles = Array.from({ length: CFG.count }, makeParticle);
  gsap.ticker.add(tick);

  // ✅ Optimized resize (Debounced) to prevent browser saturation
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  }, { passive: true });
}

/* ─── 4c. MOVIMIENTO DE AURORA (Efecto de luces dinámicas) ─────────────── */
function initAurora() {
  const auroras = gsap.utils.toArray('.aurora');

  function driftAurora(el, baseDur, range, opMin, opMax) {
    // ✅ Promote to GPU layer to prevent flickering and lag
    gsap.set(el, { force3D: true });
    function step() {
      gsap.to(el, {
        xPercent: (Math.random() - 0.5) * range,
        yPercent: (Math.random() - 0.5) * range * 0.4,
        rotation: (Math.random() - 0.5) * 18,
        scaleX: 0.8 + Math.random() * 0.45,
        scaleY: 0.7 + Math.random() * 0.55,
        autoAlpha: opMin + Math.random() * (opMax - opMin),
        duration: baseDur + (Math.random() - 0.5) * 5,
        ease: 'sine.inOut',
        onComplete: step
      });
    }
    step();
  }

  driftAurora(auroras[0], 14, 30, 0.5, 0.9);
  driftAurora(auroras[1], 18, 25, 0.4, 0.8);
  driftAurora(auroras[2], 12, 40, 0.3, 0.7);
  if (auroras[3]) driftAurora(auroras[3], 20, 20, 0.2, 0.6);
}

/* ─── 4d. ESTELA DEL CURSOR (INTERACCIÓN OPTIMIZADA) ───────────────────── */
function initCursorTrail() {
  if (window.innerWidth < 768) return;

  const TOTAL = 8;  // Número de puntos en la estela (ajustado para suavidad y rendimiento)
  const trail = [];

  for (let i = 0; i < TOTAL; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    document.body.appendChild(dot);

    const size = Math.max(2, 6 - i * 0.5);
    const opac = (1 - i / TOTAL) * 0.4 + 0.05;

    gsap.set(dot, {
      width: size, height: size,
      x: -100, y: -100,
      xPercent: -50, yPercent: -50,
      force3D: true  // ✅ GPU layer
    });

    trail.push({
      el: dot,
      op: opac,
      xTo: gsap.quickTo(dot, 'x', { duration: 0.06 + i * 0.05, ease: 'power2' }),
      yTo: gsap.quickTo(dot, 'y', { duration: 0.06 + i * 0.05, ease: 'power2' }),
    });
  }

  let revealed = false;

  // ✅ Usamos un manejador centralizado de ratón para ahorrar memoria
  mouseHandlers.push((mx, my) => {
    if (!revealed) {
      revealed = true;
      trail.forEach((t, i) =>
        gsap.to(t.el, { autoAlpha: t.op, duration: 0.6, delay: i * 0.035 })
      );
    }
    for (let i = 0; i < trail.length; i++) {
      trail[i].xTo(mx);
      trail[i].yTo(my);
    }
  });

  document.addEventListener('mouseleave', () =>
    trail.forEach(t => gsap.to(t.el, { autoAlpha: 0, duration: 0.4 }))
  );
  document.addEventListener('mouseenter', () =>
    trail.forEach((t, i) => gsap.to(t.el, { autoAlpha: t.op, duration: 0.3, delay: i * 0.02 }))
  );
}

function initGlassGeometry() {
  const container = document.querySelector(".glass-shapes-container");
  if (!container) return;

  const isMobile = window.innerWidth < 768;
  const shapeCount = isMobile ? 3 : 6;  // ✅ Reduced from 4/10
  const shapes = [];

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement("div");
    const isCircle = Math.random() > 0.5;
    const size = isMobile ? (40 + Math.random() * 60) : (80 + Math.random() * 180);
    const depth = 0.1 + Math.random() * 0.4;

    shape.className = `glass-shape ${isCircle ? 'shape-circle' : 'shape-square'} ${Math.random() > 0.6 ? 'shape-tint' : ''}`;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;

    gsap.set(shape, {
      x: startX,
      y: startY,
      autoAlpha: 0,
      scale: 0.8,
      rotation: Math.random() * 360,
      force3D: true  // ✅ GPU layer
    });
    container.appendChild(shape);

    gsap.to(shape, {
      autoAlpha: isMobile ? 0.4 : 0.7,
      scale: 1,
      duration: 2.5,
      delay: i * 0.15,
      ease: "expo.out"
    });

    shapes.push({
      el: shape,
      xTo: gsap.quickTo(shape, "x", { duration: 2, ease: "power2.out" }),
      yTo: gsap.quickTo(shape, "y", { duration: 2, ease: "power2.out" }),
      rotTo: gsap.quickTo(shape, "rotation", { duration: 3, ease: "power1.out" }),
      baseX: startX,
      baseY: startY,
      depth: depth
    });

    gsap.to(shape, {
      y: `+=${30 + Math.random() * 50}`,
      x: `+=${20 + Math.random() * 30}`,
      duration: 4 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  const gridXTo = gsap.quickTo(".bg-grid", "x", { duration: 2, ease: "power2.out" });
  const gridYTo = gsap.quickTo(".bg-grid", "y", { duration: 2, ease: "power2.out" });

  // ✅ Manejador centralizado para el efecto de movimiento del fondo (parallax)
  mouseHandlers.push((mx, my) => {
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    const mouseX = mx - halfW;
    const mouseY = my - halfH;

    for (let i = 0; i < shapes.length; i++) {
      const s = shapes[i];
      s.xTo(s.baseX + mouseX * s.depth);
      s.yTo(s.baseY + mouseY * s.depth);
      s.rotTo(mouseX * 0.05 * s.depth * 50);
    }

    gridXTo(mouseX * 0.02);
    gridYTo(mouseY * 0.02);
  });
}

function initMouseInteractions() {
  const spotlight = document.querySelector('.mouse-spotlight');
  if (!spotlight) return;

  // ✅ Usamos transform (x/y) en lugar de left/top para aprovechar la aceleración por hardware
  gsap.set(spotlight, { xPercent: -50, yPercent: -50, force3D: true });
  const xTo = gsap.quickTo(spotlight, "x", { duration: 0.8, ease: "power3.out" });
  const yTo = gsap.quickTo(spotlight, "y", { duration: 0.8, ease: "power3.out" });

  let spotlightVisible = false;

  // ✅ Manejador centralizado — evita llamadas costosas a propiedades del DOM en cada frame
  mouseHandlers.push((mx, my) => {
    if (!spotlightVisible) {
      spotlightVisible = true;
      gsap.to(spotlight, { autoAlpha: 1, duration: 1 });
    }
    xTo(mx);
    yTo(my);
  });

  // ✅ Soporte para pantallas táctiles: El foco aparece al primer toque
  window.addEventListener('touchstart', () => {
    if (!spotlightVisible) {
      spotlightVisible = true;
      gsap.to(spotlight, { autoAlpha: 1, duration: 1 });
    }
  }, { passive: true, once: true });
}

/* ─── 5. RENDERIZACIÓN DINÁMICA DE CONTENIDOS (HTML) ──────────────────── */
function renderAll() {
  // Inyectar el texto de la biografía en la sección "Sobre Mí"
  const aboutText = document.getElementById('about-text-container');
  if (aboutText) {
    aboutText.innerHTML = portfolioData.about.description.map(p => `<p>${p}</p>`).join('');
  }

  // Generar la cuadrícula tipo Bento de la sección "Sobre Mí"
  const bentoGrid = document.getElementById('about-bento-grid');
  if (bentoGrid) {
    let bentoHTML = '';
    portfolioData.about.features.forEach((f, idx) => {
      const isWide = idx === 2; // The third card is wide
      bentoHTML += `
        <div class="bento-card ${isWide ? 'card-wide' : 'card-tall'} reveal-item">
          <div class="card-shine"></div>
          <i class="${f.icon}"></i>
          <h4>${f.title}</h4>
          <p>${f.desc}</p>
        </div>`;
    });
    bentoGrid.innerHTML = bentoHTML;
  }

  // Generar la sección de Tecnologías agrupadas por categorías
  const techCategories = document.getElementById('tech-categories');
  if (techCategories) {
    techCategories.innerHTML = portfolioData.technologies.map(t => `
      <div class="tech-group reveal-item">
        <div class="card-shine"></div>
        <p class="eyebrow">${t.category}</p>
        <div class="tech-tag-list">
          ${t.tools.map(tool => `
            <div class="tech-card">
              <i class="${tool.icon}"></i>
              <span class="tech-label">${tool.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // Generar la lista de proyectos destacados con sus enlaces y stacks
  const projectsList = document.getElementById('projects-list');
  if (projectsList) {
    projectsList.innerHTML = portfolioData.projects.map(p => {
      const links = [];
      if (p.repo && p.repo !== '#') links.push(`<a href="${p.repo}" target="_blank" class="btn btn-text">Repositorio ↗</a>`);

      return `
      <div class="project-card reveal-item">
        <div class="project-image-wrap">
          <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
        </div>
        <div class="project-info">
          <div class="card-shine"></div>
          <span class="project-num">${p.id}</span>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-tagline">${p.tagline}</p>
          <div class="project-stack">
            ${p.stack.map(s => `<span class="project-stack-item">${s}</span>`).join('')}
          </div>
          ${links.length > 0 ? `<div class="project-links">${links.join('')}</div>` : ''}
        </div>
      </div>`;
    }).join('');
  }

  // Generar botones de contacto y enlaces a redes sociales
  const contactLinks = document.getElementById('contact-links');
  if (contactLinks) {
    contactLinks.innerHTML = portfolioData.contact.socials.map(s => `
      <a href="${s.url}" target="_blank" class="btn btn-outline-white magnetic" data-magnetic>${s.label}</a>
    `).join('');
    contactLinks.innerHTML += `<a href="mailto:${portfolioData.contact.email}" class="btn btn-white magnetic" data-magnetic>Correo directo</a>`;
  }
}

/* ─── 6. SISTEMA DE ANIMACIÓN PRINCIPAL (GSAP) ────────────────────────── */

let ctx; // Global GSAP Context

function initAnimations() {
  gsap.set('.reveal-item', { autoAlpha: 0, y: 50 });
  gsap.set('.reveal-text', { autoAlpha: 0, y: 30 });

  // ── División de caracteres para animar títulos letra por letra ───────────
  const titlesToAnimate = gsap.utils.toArray(".hero-title, .section-title");
  titlesToAnimate.forEach(title => {
    const text = title.innerText;
    title.innerHTML = text.split("").map(char =>
      `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
    ).join("");

    // ✅ Usamos solo opacidad y transformaciones — EVITAMOS filter:blur porque obliga al navegador a repintar cada frame (lento)
    gsap.set(title.querySelectorAll(".char"), {
      autoAlpha: 0,
      y: 60,
      skewY: 5
    });
  });

  // ── Hero: Secuencia de entrada coordinada (Timeline) ───────────────────
  const introTl = gsap.timeline({
    defaults: { duration: 1, ease: "power4.out" }
  });

  introTl
    .to(".hero-subtitle", { autoAlpha: 1, y: 0 })
    .to(".hero-title .char", {
      autoAlpha: 1,
      y: 0,
      skewY: 0,
      stagger: 0.02
    }, "<0.2")
    .to([".hero-description", ".hero-actions"], {
      autoAlpha: 1,
      y: 0,
      stagger: 0.1
    }, "<0.4")
    .to(".hero-image-wrap", {
      autoAlpha: 1,
      y: 0,
      duration: 1.5,
      ease: "expo.out"
    }, "<0.2");

  // ── Foto del Hero: Efecto de flotación suave e infinito ──────────────────
  gsap.to(".image-frame", {
    y: -12,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 2
  });

  // ── Títulos de secciones: Aparecen al hacer scroll (ScrollTrigger) ───────
  const sectionTitles = gsap.utils.toArray(".section-title");
  sectionTitles.forEach(title => {
    gsap.to(title.querySelectorAll(".char"), {
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      autoAlpha: 1,
      y: 0,
      skewY: 0,
      duration: 1,
      stagger: 0.02,
      ease: "power4.out"
    });
  });



  // ── Procesamiento por lotes (Batch): Revelado de tarjetas y elementos ───
  ScrollTrigger.batch(".reveal-item", {
    onEnter: (elements) => gsap.to(elements, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
      overwrite: true
    }),
    start: "top 85%",
    once: true
  });

  // ── Efecto Parallax en las imágenes de los proyectos (movimiento al desplazar) ──
  gsap.utils.toArray(".project-img").forEach(img => {
    gsap.fromTo(img,
      { scale: 1.15, y: 0 },
      {
        scale: 1,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest(".project-image-wrap"),
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      }
    );
  });

  // ── Barra de progreso de lectura (Scroll Progress) ─────────────────────
  const progressBar = document.querySelector(".scroll-progress-bar");
  if (progressBar) {
    // ✅ Usamos scaleX en lugar de width — Es procesado por la GPU para mayor suavidad y no afecta al diseño (layout)
    gsap.set(progressBar, { transformOrigin: "left center", scaleX: 0 });
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        gsap.set(progressBar, { scaleX: self.progress });
      }
    });
  }

  // ── Cabecera pegajosa (Sticky Header): Cambia de aspecto al bajar ───────
  ScrollTrigger.create({
    start: "top -40",
    onToggle: self => {
      const header = document.querySelector(".header-inner");
      if (header) {
        gsap.to(header, {
          background: self.isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
          boxShadow: self.isActive ? "0 10px 30px rgba(0,0,0,0.05)" : "none",
          padding: self.isActive ? "8px 24px" : "12px 24px",
          duration: 0.4
        });
      }
    }
  });
}

/* ─── 7. INTERACCIONES AVANZADAS (RATÓN Y HOVER) ──────────────────────── */

function initTiltEffect() {
  const cards = gsap.utils.toArray('.bento-card, .tech-group, .project-info');

  cards.forEach(card => {
    const shine = card.querySelector('.card-shine');

    const xTo = gsap.quickTo(card, "rotateX", { duration: 1, ease: "power3" });
    const yTo = gsap.quickTo(card, "rotateY", { duration: 1, ease: "power3" });
    const shineAlphaTo = shine ? gsap.quickTo(shine, "autoAlpha", { duration: 0.5 }) : null;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y - rect.height / 2) / rect.height) * -10;
      const rotateY = ((x - rect.width / 2) / rect.width) * 10;

      xTo(rotateX);
      yTo(rotateY);

      if (shineAlphaTo) {
        card.style.setProperty('--shine-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--shine-y', `${(y / rect.height) * 100}%`);
        shineAlphaTo(1);
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
      if (shineAlphaTo) shineAlphaTo(0);
    });
  });
}

function initMagneticButtons() {
  const magnets = gsap.utils.toArray('[data-magnetic]');

  magnets.forEach(magnet => {
    const xTo = gsap.quickTo(magnet, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(magnet, "y", { duration: 0.6, ease: "power3" });

    magnet.addEventListener('mousemove', (e) => {
      const rect = magnet.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      xTo((e.clientX - centerX) * 0.35);
      yTo((e.clientY - centerY) * 0.35);
    }, { passive: true });

    magnet.addEventListener('mouseleave', () => {
      gsap.to(magnet, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    });
  });
}

function initTechCardInteractions() {
  const cards = gsap.utils.toArray('.tech-card');
  const colorMap = {
    'react': 'var(--clr-react)',
    'javascript': 'var(--clr-js)',
    'typescript': 'var(--clr-ts)',
    /* ✅ Hint al compositor: Mejora el rendimiento del renderizado de iconos */
    'html5': 'var(--clr-html)',
    'css3': 'var(--clr-css)',
    'c#': 'var(--clr-csharp)',
    '.net core': 'var(--clr-dotnet)',
    'sql server': 'var(--clr-sql)',
    'git': 'var(--clr-git)',
    'github': '#333'
  };

  cards.forEach(card => {
    const label = card.querySelector('.tech-label').innerText.toLowerCase();
    const brandColor = colorMap[label] || 'var(--accent)';

    card.style.setProperty('--card-glow', brandColor);
    card.style.setProperty('--card-glow-soft', `${brandColor}33`);

    gsap.to(card, {
      y: "-=8",
      duration: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 2
    });
  });
}

/* ─── 8. PRELOADER ────────────────────────────────────────────────────── */

/* ─── 8b. ANIMACIONES DE HOVER EN TARJETAS (BRILLO Y TILT) ─────────────── */

function initCardHoverAnimations() {

  /* ══ BENTO CARDS ═══════════════════════════════════════════════════════ */
  gsap.utils.toArray('.bento-card').forEach(card => {
    const icon = card.querySelector('i');
    const h4 = card.querySelector('h4');
    const p = card.querySelector('p');
    const pillars = card.querySelectorAll('.pillar-item');
    const dot = card.querySelector('.status-dot');

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

    tl.to(card, {
      y: -10,
      boxShadow: '0 30px 60px -15px rgba(14,165,233,0.25), 0 0 0 1px rgba(14,165,233,0.15)',
      duration: 0.5
    }, 0);

    if (icon) {
      tl.to(icon, { scale: 1.5, rotation: 15, color: 'var(--accent)', duration: 0.4, ease: 'back.out(2)' }, 0)
        .to(icon, { rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' }, 0.35);
    }

    if (h4) {
      tl.to(h4, { y: -5, letterSpacing: '0.01em', duration: 0.4 }, 0.05);
    }

    if (p) {
      tl.to(p, { y: -3, color: 'var(--text-main)', duration: 0.35 }, 0.1);
    }

    if (pillars.length) {
      tl.to(pillars, {
        x: 10,
        color: 'var(--accent)',
        stagger: { each: 0.07, from: 'start' },
        duration: 0.35,
        ease: 'back.out(1.5)'
      }, 0.08);
    }

    if (dot) {
      tl.add(() => dot.classList.add('dot-fast'), 0);
    }

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => {
      tl.reverse();
      if (dot) dot.classList.remove('dot-fast');
    });
  });

  /* ══ TECH CARDS ════════════════════════════════════════════════════════ */
  gsap.utils.toArray('.tech-card').forEach(card => {
    const icon = card.querySelector('i');
    const label = card.querySelector('.tech-label');



    const tl = gsap.timeline({ paused: true });

    tl.to(card, {
      scale: 1.12,
      boxShadow: '0 20px 40px -10px var(--card-glow-soft), 0 0 0 1px var(--card-glow)',
      duration: 0.4,
      ease: 'back.out(2)'
    }, 0);

    if (icon) {
      tl.to(icon, {
        rotation: 360,
        scale: 1.35,
        color: 'var(--card-glow)',
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, 0);
    }

    if (label) {
      // Movimiento sutil del texto hacia arriba para dar efecto de relieve
      tl.to(label, {
        y: -4,
        letterSpacing: '0.1em',
        color: 'var(--text-main)',
        duration: 0.35,
        ease: 'power2.out'
      }, 0.08);
    }



    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => {
      gsap.set(icon, { rotation: 0 });
      tl.reverse();
    });
  });

/* ══ TARJETAS DE PROYECTOS: Interacciones individuales ═══════════════ */
  gsap.utils.toArray('.project-card').forEach(card => {
    const imageWrap = card.querySelector('.project-image-wrap');
    const num = card.querySelector('.project-num');
    const title = card.querySelector('.project-title');
    const tagline = card.querySelector('.project-tagline');
    const stack = card.querySelectorAll('.project-stack-item');
    const links = card.querySelectorAll('.project-links a');

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

    if (imageWrap) {
      tl.to(imageWrap, {
        rotation: -1.5,
        boxShadow: '0 40px 80px -20px rgba(14,165,233,0.2)',
        duration: 0.6,
        ease: 'power2.out'
      }, 0);
    }

    if (num) {
      tl.to(num, { scale: 1.4, x: 8, color: 'var(--accent)', duration: 0.35, ease: 'back.out(2.5)' }, 0)
        .to(num, { scale: 1, duration: 0.25, ease: 'power3.out' }, 0.32);
    }

    if (title) {
      tl.to(title, { x: 10, duration: 0.45 }, 0.05);
    }

    if (tagline) {
      tl.to(tagline, { x: 7, color: 'var(--text-main)', duration: 0.4 }, 0.1);
    }

    if (stack.length) {
      tl.to(stack, {
        y: -8,
        backgroundColor: 'var(--accent-soft)',
        borderColor: 'rgba(14,165,233,0.4)',
        color: 'var(--accent)',
        stagger: { each: 0.07, from: 'start' },
        duration: 0.35,
        ease: 'back.out(2)'
      }, 0.12);
    }

    if (links.length) {
      tl.to(links, {
        y: -5,
        color: 'var(--accent)',
        stagger: 0.08,
        duration: 0.35,
        ease: 'back.out(1.5)'
      }, 0.18);
    }

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());
  });

  /* ══ TECH GROUP ═══════════════════════════════════════════════════════ */
  gsap.utils.toArray('.tech-group').forEach(group => {
    const eyebrow = group.querySelector('.eyebrow');
    const tl = gsap.timeline({ paused: true });

    if (eyebrow) {
      tl.to(eyebrow, { x: 8, letterSpacing: '0.18em', duration: 0.4, ease: 'power2.out' }, 0);
    }

    group.addEventListener('mouseenter', () => tl.play());
    group.addEventListener('mouseleave', () => tl.reverse());
  });

  /* ══ NAVEGACIÓN: Efecto de subrayado inteligente ═══════════════════════ */
  gsap.utils.toArray('.nav a:not(.nav-contact)').forEach(link => {
    const underline = document.createElement('span');
    underline.className = 'nav-underline';
    link.style.position = 'relative';
    link.appendChild(underline);

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(underline,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.35, ease: 'power3.out' }
    );

    link.addEventListener('mouseenter', () => tl.play());
    link.addEventListener('mouseleave', () => tl.reverse());
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const close = document.querySelector('.nav-close');
  const menu = document.querySelector('.mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !menu || !close) return;

  const tl = gsap.timeline({ paused: true });

  tl.to(menu, {
    autoAlpha: 1,
    duration: 0.4,
    ease: "power2.inOut"
  })
    .from('.mobile-nav-link', {
      y: 30,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2");

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    tl.play();
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = (e) => {
    if (e) e.preventDefault();
    tl.reverse();
    document.body.style.overflow = '';
  };

  close.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));
}

/**
 * Función principal que arranca todos los módulos del sitio
 */
function initApp() {
  document.body.classList.remove('loading');

  ctx = gsap.context(() => {
    initGlows();
    initParticleCanvas();
    initAurora();
    initCursorTrail();
    initAnimations();
    initMouseInteractions();
    initGlassGeometry();
    initMobileMenu();
    initTechCardInteractions();
    initMagneticButtons();
    initResponsiveAnimations();
  });
}

/* ─── 9. RESPONSIVE & ACCESIBILIDAD (gsap.matchMedia) ────────────────── */

function initResponsiveAnimations() {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 800px)",
      isMobile: "(max-width: 799px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { isDesktop, reduceMotion, isMobile } = context.conditions;

      if (reduceMotion) {
        gsap.globalTimeline.timeScale(10);
        return;
      }

      if (isDesktop) {
        // Solo activamos efectos 3D de inclinación y hovers pesados en escritorio
        initTiltEffect();
        initCardHoverAnimations();

        gsap.from(".about-content", {
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%",
            toggleActions: "play none none none",
            once: true
          },
          x: -60,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power3.out"
        });
      }

      if (isMobile) {
        // En móvil, las secciones aparecen centradas y sin desplazamiento lateral
        gsap.set(".about-content", { x: 0, autoAlpha: 1 });
      }
    }
  );
}

/* ─── 10. ARRANQUE ────────────────────────────────────────────────────── */
// Evento principal: Se dispara cuando el HTML está cargado y listo
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initApp();
});
