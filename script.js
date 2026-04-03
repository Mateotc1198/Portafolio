const portfolioData = {
  hero: {
    name: "Mateo Torres Cardona",
    role: "Desarrollador Frontend",
    photo: {
      src: "fotomia.jpeg",
      alt: "Foto profesional de Mateo Torres Cardona",
    },
    specialty:
      "Enfocado en interfaces web funcionales, limpias y conectadas con soluciones robustas en .NET y bases de datos SQL.",
    description:
      "Desarrollo experiencias web claras y mantenibles, orientadas a resolver necesidades reales con buenas prácticas y una base sólida en desarrollo frontend.",
    actions: [
      {
        label: "Descargar CV",
        href: "cv.pdf",
        style: "primary-button",
      },
      {
        label: "Proyectos",
        href: "#proyectos",
        style: "secondary-button",
      },
      {
        label: "GitHub",
        href: "https://github.com/Mateotc1198",
        style: "ghost-button",
      },
    ],
    highlights: [
      "Interfaces web organizadas, claras y enfocadas en una buena experiencia de usuario.",
      "Experiencia trabajando con C#, .NET, SQL, JavaScript, HTML y CSS.",
      "Desarrollo de soluciones mantenibles con lógica de negocio y gestión de datos.",
    ],
  },
  about: [
    "Soy desarrollador frontend con conocimientos en C#, .NET, SQL, JavaScript, HTML y CSS. Me enfoco en construir aplicaciones web claras, funcionales y bien estructuradas, orientadas a resolver necesidades reales de los usuarios.",
    "Me interesa crear interfaces limpias y fáciles de usar, apoyadas por una lógica sólida y un manejo confiable de la información.",
    "He trabajado en proyectos como Casa Blanca, una aplicación web de reservas hoteleras, donde apliqué ASP.NET MVC 5, SQL Server y buenas prácticas de organización del código para construir una solución mantenible.",
  ],
  technologies: [
    {
      title: "Frontend",
      description:
        "Construcción de interfaces web claras, responsivas y funcionales.",
      tools: ["JavaScript", "HTML", "CSS"],
    },
    {
      title: "Desarrollo",
      description:
        "Implementación de lógica de negocio y aplicaciones con tecnologías Microsoft.",
      tools: ["C#", ".NET", "ASP.NET MVC 5"],
    },
    {
      title: "Bases de datos",
      description:
        "Modelado y consulta de información para sistemas administrativos y transaccionales.",
      tools: ["SQL", "SQL Server"],
    },
    {
      title: "Herramientas",
      description:
        "Flujo de trabajo y control de versiones para desarrollo colaborativo.",
      tools: ["Git", "GitHub", "Visual Studio"],
    },
  ],
  projects: [
    {
      title: "E-commerce MT",
      description:
        "Tienda construida con React utilizando con una página navegable de detalles del producto (PDP), manejo de carrito con cajón lateral (Drawer) deslizante y consumo dinámico de datos de APIs.",
      stack: ["React", "JavaScript", "API Fetch", "CSS3"],
      demo: "https://mateotc1198.github.io/E-Commerse/",
      repo: "https://github.com/Mateotc1198/E-Commerse",
      screenshots: [
        {
          title: "Catálogo General",
          src: "https://github.com/Mateotc1198/E-Commerse/blob/main/assets/screenshots/cart-drawer.png?raw=true",
        },
        {
          title: "Detalles del Producto (PDP)",
          src: "https://raw.githubusercontent.com/Mateotc1198/E-Commerse/main/assets/screenshots/pdp-view.png",
        },
        {
          title: "Cajón del Carrito",
          src: "https://raw.githubusercontent.com/Mateotc1198/E-Commerse/main/assets/screenshots/cart-drawer.png",
        }
      ],
    },
    {
      title: "Casa Blanca",
      description:
        "Aplicación web de reservas hoteleras desarrollada con ASP.NET MVC 5, C# y SQL Server. Permite registrar usuarios, iniciar sesión, consultar hoteles disponibles, crear reservas y administrar el catálogo de hoteles desde un panel administrativo.",
      stack: ["ASP.NET MVC 5", "C#", "SQL Server"],
      demo: "https://mateotc1198.github.io/CasaBlanca/",
      repo: "https://github.com/Mateotc1198/CasaBlanca",
      screenshots: [
        {
          title: "Inicio",
          src: "https://raw.githubusercontent.com/Mateotc1198/CasaBlanca/main/assets/screenshots/home.png",
        },
        {
          title: "Hoteles",
          src: "https://raw.githubusercontent.com/Mateotc1198/CasaBlanca/main/assets/screenshots/hotels.png",
        },
        {
          title: "Reservas",
          src: "https://raw.githubusercontent.com/Mateotc1198/CasaBlanca/main/assets/screenshots/my-bookings.png",
        },
        {
          title: "Panel admin",
          src: "https://raw.githubusercontent.com/Mateotc1198/CasaBlanca/main/assets/screenshots/admin-dashboard.png",
        },
      ],
    },
  ],
  github: {
    description:
      "Comparto proyectos y prácticas enfocados en desarrollo web. Mi perfil reúne soluciones construidas con .NET, bases de datos y tecnologías frontend para mostrar mi proceso y evolución como desarrollador.",
    checklist: [
      "Repositorios con estructura ordenada y propósito claro.",
      "Proyectos orientados a desarrollo web y lógica de negocio.",
      "Uso de GitHub como respaldo de aprendizaje y práctica continua.",
      "Código enfocado en claridad, mantenimiento y funcionalidad.",
    ],
    profileUrl: "https://github.com/Mateotc1198",
  },
  contact: {
    text: "Estoy abierto a oportunidades como desarrollador frontend. Si quieres contactarme para una vacante, colaboración o proyecto, puedes escribirme por correo o visitar mi perfil de GitHub.",
    email: "Mateotorres.cardona@gmail.com",
    links: [
      { label: "GitHub", href: "https://github.com/Mateotc1198" },
      { label: "Email", href: "mailto:Mateotorres.cardona@gmail.com" },
    ],
  },
};

function setTextContent(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function renderHero() {
  setTextContent("hero-name", portfolioData.hero.name);

  const roleEl = document.getElementById("hero-role");
  if (roleEl) {
    roleEl.innerHTML = "";
    const textSpan = document.createElement("span");
    const cursorSpan = document.createElement("span");
    cursorSpan.className = "typing-cursor";
    roleEl.appendChild(textSpan);
    roleEl.appendChild(cursorSpan);

    let i = 0;
    const txt = portfolioData.hero.role;
    const speed = 70;
    function typeWriter() {
      if (i < txt.length) {
        textSpan.textContent += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    setTimeout(typeWriter, 500);
  } else {
    setTextContent("hero-role", portfolioData.hero.role);
  }

  setTextContent("hero-specialty", portfolioData.hero.specialty);
  setTextContent("hero-description", portfolioData.hero.description);

  const actionsContainer = document.getElementById("hero-actions");
  const highlightsContainer = document.getElementById("hero-highlights");
  const photoElement = document.getElementById("hero-photo");

  actionsContainer.innerHTML = "";
  highlightsContainer.innerHTML = "";

  if (photoElement) {
    photoElement.src = portfolioData.hero.photo.src;
    photoElement.alt = portfolioData.hero.photo.alt;
  }

  portfolioData.hero.actions.forEach((action) => {
    const link = document.createElement("a");
    link.className = action.style;
    link.href = action.href;
    link.textContent = action.label;

    if (action.href.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    actionsContainer.appendChild(link);
  });

  portfolioData.hero.highlights.forEach((highlight) => {
    const item = document.createElement("li");
    item.textContent = highlight;
    highlightsContainer.appendChild(item);
  });
}

function renderAbout() {
  portfolioData.about.forEach((paragraph, index) => {
    setTextContent(`about-text-${index + 1}`, paragraph);
  });
}

function renderTechnologies() {
  const techGrid = document.getElementById("tech-grid");
  techGrid.innerHTML = "";

  portfolioData.technologies.forEach((group) => {
    const article = document.createElement("article");
    article.className = "tech-card";
    article.innerHTML = `
      <h3>${group.title}</h3>
      <p>${group.description}</p>
      <div class="pill-group">
        ${group.tools.map((tool) => `<span>${tool}</span>`).join("")}
      </div>
    `;
    techGrid.appendChild(article);
  });
}

function renderProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = "";

  portfolioData.projects.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-card";
    const links = [];

    if (project.demo) {
      links.push(
        `<a href="${project.demo}" target="_blank" rel="noreferrer">Demo</a>`
      );
    }

    if (project.repo) {
      links.push(
        `<a href="${project.repo}" target="_blank" rel="noreferrer">Repositorio</a>`
      );
    }

    const screenshotsMarkup = (project.screenshots || [])
      .map(
        (shot) => `
          <figure class="project-shot">
            <img src="${shot.src}" alt="Captura de ${shot.title} del proyecto ${project.title}" loading="lazy" />
            <figcaption>${shot.title}</figcaption>
          </figure>
        `
      )
      .join("");

    article.innerHTML = `
      <h3>${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <ul class="project-stack">
        ${project.stack.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
      ${screenshotsMarkup
        ? `<div class="project-gallery">${screenshotsMarkup}</div>`
        : ""
      }
    `;
    projectsGrid.appendChild(article);
  });
}

function renderGithub() {
  setTextContent("github-description", portfolioData.github.description);

  const checklist = document.getElementById("github-checklist");
  checklist.innerHTML = "";

  portfolioData.github.checklist.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    checklist.appendChild(listItem);
  });

  const githubLink = document.getElementById("github-link");
  githubLink.href = portfolioData.github.profileUrl;
}

function renderContact() {
  setTextContent("contact-text", portfolioData.contact.text);

  const emailLink = document.getElementById("contact-email");
  emailLink.textContent = portfolioData.contact.email;
  emailLink.href = `mailto:${portfolioData.contact.email}`;

  const contactLinks = document.getElementById("contact-links");
  contactLinks.innerHTML = "";

  portfolioData.contact.links.forEach((linkItem) => {
    const link = document.createElement("a");
    link.className = "secondary-button";
    link.href = linkItem.href;
    link.textContent = linkItem.label;

    if (linkItem.href.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    contactLinks.appendChild(link);
  });
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(
    ".hero-copy, .hero-panel, .section-heading, .about-card, .tech-card, .project-card, .github-card, .contact-card"
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min((index % 6) * 120, 500)}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupTiltEffect() {
  const cards = document.querySelectorAll(
    ".tech-card, .project-card, .about-card, .github-card, .contact-card, .hero-copy, .hero-panel"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      card.style.transition = `none`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
      card.style.transition = `transform 400ms ease, box-shadow 400ms ease, border-color 400ms ease`;
    });
  });
}

renderHero();
renderAbout();
renderTechnologies();
renderProjects();
renderGithub();
renderContact();
setupRevealAnimations();
setupTiltEffect();
