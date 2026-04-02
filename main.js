const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav]");
const pathname = window.location.pathname.toLowerCase();
const currentPath = pathname.split("/").pop() || "index.html";

if (navMenu) {
  navMenu.querySelectorAll("a").forEach(link => {
    if ((link.textContent || "").trim().toUpperCase() === "CONSULTA") {
      link.classList.add("nav-consulta");
      link.setAttribute("href", "https://dyadlaw.com/consulta/");
    }
    link.classList.remove("active");
  });

  const sectionMap = [
    {
      test: () => pathname.includes("/servicios/") || currentPath === "servicios.html",
      section: "services"
    },
    {
      test: () =>
        currentPath === "blog.html" ||
        currentPath === "blog-en.html" ||
        currentPath.startsWith("blog-") ||
        currentPath.startsWith("landing-blog-"),
      section: "blog"
    },
    {
      test: () => currentPath === "contacto.html" || currentPath === "contacto-en.html",
      section: "contact"
    },
    {
      test: () => currentPath === "quienes-somos.html" || currentPath === "quienes-somos-en.html",
      section: "about"
    },
    {
      test: () =>
        currentPath === "index.html" ||
        currentPath === "index-en.html" ||
        pathname.endsWith("/dyadlawedit1.1/"),
      section: "home"
    }
  ];

  const matchedSection = sectionMap.find(item => item.test())?.section;
  if (matchedSection) {
    const activeLink = navMenu.querySelector(`[data-nav-section="${matchedSection}"]`);
    if (activeLink) activeLink.classList.add("active");
  }

  const serviceMenuLinks = navMenu.querySelectorAll(".nav-dropdown-menu a");
  serviceMenuLinks.forEach(link => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (!href) return;
    const normalizedHref = href.replace(/\\/g, "/");
    if (
      normalizedHref.includes("/vawa-en-matrimonio/") && pathname.includes("/vawa-en-matrimonio/")
      || normalizedHref.includes("/vawa-parental/") && pathname.includes("/vawa-parental/")
      || normalizedHref.includes("/visa-t/") && pathname.includes("/visa-t/")
      || normalizedHref.includes("/visa-u/") && pathname.includes("/visa-u/")
      || normalizedHref.includes("/visa-familiar/") && pathname.includes("/visa-familiar/")
    ) {
      link.classList.add("active");
    }
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("open");
  });
}

const yearNode = document.querySelector("[data-year]");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
reveals.forEach(node => io.observe(node));

function attachEngagementSection() {
  const main = document.querySelector("main");
  if (!main || document.querySelector("[data-engagement]")) return;
  const path = window.location.pathname.toLowerCase();
  const page = path.split("/").pop() || "index.html";
  if (path.endsWith("/index.html") || path.endsWith("/") || path === "/") return;
  const isBlogPage =
    page.startsWith("blog-") ||
    page.startsWith("landing-blog-");
  if (!isBlogPage) return;

  const wrap = document.createElement("section");
  wrap.className = "container engagement-wrap";
  wrap.setAttribute("data-engagement", "true");

  const share = document.createElement("article");
  share.className = "share-bar";
  share.innerHTML = `
    <h3>Compartir este contenido</h3>
    <div class="share-actions">
      <button class="share-btn" data-share="facebook" type="button" aria-label="Compartir en Facebook" title="Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.98h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z"/></svg>
        <span class="sr-only">Facebook</span>
      </button>
      <button class="share-btn" data-share="instagram" type="button" aria-label="Compartir en Instagram" title="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm9.2 1.55a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 6.85A5.15 5.15 0 1 1 6.85 12 5.16 5.16 0 0 1 12 6.85zm0 1.8A3.35 3.35 0 1 0 15.35 12 3.35 3.35 0 0 0 12 8.65z"/></svg>
        <span class="sr-only">Instagram</span>
      </button>
      <button class="share-btn" data-share="tiktok" type="button" aria-label="Compartir en TikTok" title="TikTok">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.05 2h2.73c.24 1.42 1.14 2.7 2.42 3.39.8.45 1.72.69 2.67.72v2.9c-1.59-.05-3.16-.45-4.54-1.24v7.18a6 6 0 1 1-5.14-5.94v3c-.45-.15-.93-.18-1.4-.08a3.05 3.05 0 1 0 3.66 2.99V2z"/></svg>
        <span class="sr-only">TikTok</span>
      </button>
      <button class="share-btn" data-share="youtube" type="button" aria-label="Compartir en YouTube" title="YouTube">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 7.2a3.03 3.03 0 0 0-2.13-2.14C19.45 4.5 12 4.5 12 4.5s-7.45 0-9.37.56A3.03 3.03 0 0 0 .5 7.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 4.8 3.03 3.03 0 0 0 2.13 2.14c1.92.56 9.37.56 9.37.56s7.45 0 9.37-.56a3.03 3.03 0 0 0 2.13-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-4.8zM9.6 15.58V8.42L15.86 12 9.6 15.58z"/></svg>
        <span class="sr-only">YouTube</span>
      </button>
      <button class="share-btn" data-share="copy" type="button" aria-label="Copiar enlace" title="Copiar enlace">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.59 13.41a1.99 1.99 0 0 1 0-2.82l3.18-3.18a2 2 0 1 1 2.83 2.83l-1.06 1.06 1.41 1.41 1.06-1.06a4 4 0 1 0-5.66-5.66l-3.18 3.18a4 4 0 0 0 0 5.66l.35.35 1.41-1.41-.34-.36zm2.82-2.82-1.41-1.41-4.95 4.95a4 4 0 1 0 5.66 5.66l3.18-3.18a4 4 0 0 0 0-5.66l-.35-.35-1.41 1.41.35.35a2 2 0 0 1 0 2.83l-3.18 3.18a2 2 0 1 1-2.83-2.83l4.94-4.95z"/></svg>
        <span class="sr-only">Copiar enlace</span>
      </button>
    </div>
  `;

  const commentEnabledPages = new Set([
    "blog-vawa-eligibility.html",
    "blog-vawa-evidence.html",
    "blog-confidentiality.html",
    "blog-tvisa-workpermit.html",
    "blog-tvisa-greencard.html",
    "blog-itin-myths.html"
  ]);

  if (commentEnabledPages.has(page)) {
    const comments = document.createElement("article");
    comments.className = "comments-panel";
    comments.innerHTML = `
      <h3>Comentarios</h3>
      <p class="comments-note">Comparte tu duda o experiencia. Este demo guarda comentarios en tu navegador.</p>
      <form class="comment-form" data-comment-form>
        <label>Nombre
          <input name="name" maxlength="60" required />
        </label>
        <label>Comentario
          <textarea name="message" rows="4" maxlength="1000" required></textarea>
        </label>
        <button class="btn" type="submit">Publicar comentario</button>
      </form>
      <div class="comment-list" data-comment-list></div>
    `;
    wrap.appendChild(comments);
  }
  wrap.appendChild(share);
  main.appendChild(wrap);

  const pageUrl = window.location.href;
  const pageTitle = document.title;

  function copyLink() {
    navigator.clipboard.writeText(pageUrl).catch(() => {});
  }

  share.querySelectorAll("[data-share]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-share");
      if (target === "facebook") {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer,width=640,height=540");
        return;
      }
      if (target === "instagram") {
        copyLink();
        window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
        return;
      }
      if (target === "tiktok") {
        copyLink();
        window.open("https://www.tiktok.com/", "_blank", "noopener,noreferrer");
        return;
      }
      if (target === "youtube") {
        copyLink();
        const q = encodeURIComponent(pageTitle);
        window.open(`https://www.youtube.com/results?search_query=${q}`, "_blank", "noopener,noreferrer");
        return;
      }
      copyLink();
    });
  });

  if (!commentEnabledPages.has(page)) return;

  const comments = wrap.querySelector(".comments-panel");
  if (!comments) return;

  const storageKey = `dyad_comments_${window.location.pathname}`;
  const list = comments.querySelector("[data-comment-list]");
  const form = comments.querySelector("[data-comment-form]");

  function loadComments() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  }

  function saveComments(items) {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  function renderComments() {
    const items = loadComments();
    if (!items.length) {
      list.innerHTML = `<div class="comment-item"><p>Aun no hay comentarios.</p></div>`;
      return;
    }
    list.innerHTML = items
      .map(
        item => `
        <div class="comment-item">
          <strong>${item.name}</strong>
          <p>${item.message}</p>
        </div>
      `
      )
      .join("");
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !message) return;
    const items = loadComments();
    items.unshift({ name, message, at: Date.now() });
    saveComments(items.slice(0, 50));
    form.reset();
    renderComments();
  });

  renderComments();
}

attachEngagementSection();

function initWhatsAppResponder() {
  if (document.querySelector("[data-wa-bot]")) return;

  const bot = document.createElement("aside");
  bot.className = "wa-bot";
  bot.setAttribute("data-wa-bot", "true");
  bot.innerHTML = `
    <button class="wa-bot__fab" type="button" data-wa-toggle aria-label="Abrir chat de WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.3a9.7 9.7 0 0 0-8.3 14.8L2.3 21.7l4.7-1.2A9.7 9.7 0 1 0 12 2.3zm0 17.7c-1.5 0-2.9-.4-4.2-1.1l-.3-.2-2.8.7.7-2.7-.2-.3a7.9 7.9 0 1 1 6.8 3.6zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.8c-.1.2-.3.2-.5.1-1.6-.8-2.7-1.9-3.4-3.3-.1-.2 0-.3.1-.4l.4-.4c.1-.1.2-.2.2-.3l.1-.3c0-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.4c-.1 0-.3.1-.5.3-.2.2-.7.7-.7 1.6s.7 1.8.8 2c.1.1 1.4 2.2 3.5 3 .5.2.9.3 1.2.4.5.2 1 .1 1.3.1.4-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3z"/></svg>
      <span>WhatsApp</span>
    </button>
    <div class="wa-bot__panel" data-wa-panel hidden>
      <div class="wa-bot__head">
        <strong>DYADlaw Bot</strong>
        <button class="wa-bot__close" type="button" data-wa-close aria-label="Cerrar chat">x</button>
      </div>
      <div class="wa-bot__body" data-wa-body>
        <div class="wa-msg wa-msg--bot">Hola, soy el asistente de DYADlaw. Te ayudo a empezar.</div>
      </div>
      <div class="wa-bot__chips">
        <button type="button" data-wa-chip="vawa">Tengo preguntas sobre VAWA</button>
        <button type="button" data-wa-chip="tvisa">Quiero info sobre Visa T</button>
        <button type="button" data-wa-chip="consulta">Agendar una consulta</button>
      </div>
      <form class="wa-bot__composer" data-wa-form>
        <input type="text" name="msg" placeholder="Escribe tu mensaje..." required>
        <button class="btn" type="submit">Enviar</button>
      </form>
    </div>
  `;
  document.body.appendChild(bot);

  const fab = bot.querySelector("[data-wa-toggle]");
  const panel = bot.querySelector("[data-wa-panel]");
  const close = bot.querySelector("[data-wa-close]");
  const body = bot.querySelector("[data-wa-body]");
  const form = bot.querySelector("[data-wa-form]");

  function addBotMessage(text) {
    const node = document.createElement("div");
    node.className = "wa-msg wa-msg--bot";
    node.textContent = text;
    body.appendChild(node);
    body.scrollTop = body.scrollHeight;
  }

  function addUserMessage(text) {
    const node = document.createElement("div");
    node.className = "wa-msg wa-msg--user";
    node.textContent = text;
    body.appendChild(node);
    body.scrollTop = body.scrollHeight;
  }

  function openPanel() {
    panel.hidden = false;
    setTimeout(() => {
      const input = form.querySelector("input[name='msg']");
      if (input) input.focus();
    }, 50);
  }

  function closePanel() {
    panel.hidden = true;
  }

  function respond(text) {
    const t = text.toLowerCase();
    if (t.includes("vawa")) {
      addBotMessage("Si tu caso es VAWA, revisamos elegibilidad, evidencia y seguridad en una consulta confidencial.");
      return;
    }
    if (t.includes("t visa") || t.includes("tvisa") || t.includes("visa t")) {
      addBotMessage("Para T Visa te ayudamos con certificacion, evidencia y permiso de trabajo paso a paso.");
      return;
    }
    if (t.includes("consulta") || t.includes("cita")) {
      addBotMessage("Perfecto. Te puedo conectar directo por WhatsApp para agendar ahora mismo.");
      return;
    }
    if (t.includes("u visa") || t.includes("visa u")) {
      addBotMessage("Para Visa U te guiamos con certificación, evidencia y tiempos estimados del caso.");
      return;
    }
    if (t.includes("familiar")) {
      addBotMessage("En Visa Familiar definimos la mejor ruta según tu parentesco y el estatus de tu familiar.");
      return;
    }
    addBotMessage("Gracias por escribir. Te conecto con nuestro equipo para ayudarte con tu caso.");
  }

  fab.addEventListener("click", () => {
    if (panel.hidden) {
      openPanel();
    } else {
      closePanel();
    }
  });

  close.addEventListener("click", closePanel);

  bot.querySelectorAll("[data-wa-chip]").forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.textContent || "";
      addUserMessage(q);
      respond(q);
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const input = form.querySelector("input[name='msg']");
    const msg = String(input.value || "").trim();
    if (!msg) return;
    addUserMessage(msg);
    respond(msg);
    input.value = "";
    const wa = `https://wa.me/18588776489?text=${encodeURIComponent(msg)}`;
    window.open(wa, "_blank", "noopener,noreferrer");
  });
}

function initLanguageFlags() {
  const shell = document.querySelector(".nav-shell");
  if (!shell || document.querySelector(".lang-switch")) return;

  const current = window.location.pathname.split("/").pop() || "index.html";
  const isEn = current.endsWith("-en.html");

  function esFile(file) {
    if (!file || file === "/") return "index.html";
    return file.replace("-en.html", ".html");
  }

  function enFile(file) {
    if (!file || file === "/" || file === "index.html") return "index-en.html";
    if (file.endsWith("-en.html")) return file;
    return file.replace(".html", "-en.html");
  }

  const mxHref = esFile(current);
  const usHref = enFile(current);

  const wrap = document.createElement("div");
  wrap.className = "lang-switch";
  wrap.innerHTML = `
    <a class="lang-flag ${isEn ? "" : "active"}" href="${mxHref}" aria-label="Ver sitio en español" title="Español">
      <span aria-hidden="true">🇲🇽</span>
    </a>
    <a class="lang-flag ${isEn ? "active" : ""}" href="${usHref}" aria-label="View site in English" title="English">
      <span aria-hidden="true">🇺🇸</span>
    </a>
  `;

  const phoneBtn = shell.querySelector(".phone-btn");
  if (phoneBtn) {
    shell.insertBefore(wrap, phoneBtn);
  } else {
    shell.appendChild(wrap);
  }
}

function initLanguageFlagsV2() {
  const shell = document.querySelector(".nav-shell");
  if (!shell || document.querySelector(".lang-switch")) return;

  const current = window.location.pathname.split("/").pop() || "index.html";
  const isEn = current.endsWith("-en.html");

  const esFile = file => {
    if (!file || file === "/") return "index.html";
    return file.replace("-en.html", ".html");
  };

  const enFile = file => {
    if (!file || file === "/" || file === "index.html") return "index-en.html";
    if (file.endsWith("-en.html")) return file;
    return file.replace(".html", "-en.html");
  };

  const mxHref = esFile(current);
  const usHref = enFile(current);

  const wrap = document.createElement("div");
  wrap.className = "lang-switch";
  wrap.innerHTML = `
    <a class="lang-flag ${isEn ? "" : "active"}" href="${mxHref}" aria-label="Ver sitio en español" title="Español">
      <span aria-hidden="true">🇲🇽</span>
    </a>
    <a class="lang-flag ${isEn ? "active" : ""}" href="${usHref}" aria-label="View site in English" title="English">
      <span aria-hidden="true">🇺🇸</span>
    </a>
  `;

  const phoneBtn = shell.querySelector(".phone-btn");
  if (phoneBtn) {
    shell.insertBefore(wrap, phoneBtn);
  } else {
    shell.appendChild(wrap);
  }
}

function dedupeArticleImages() {
  const heroImg = document.querySelector(".article .article-hero");
  const sidebarImg = document.querySelector(".sidebar .sidebar-card .sidebar-thumb");
  if (!heroImg || !sidebarImg) return;

  const heroSrc = heroImg.currentSrc || heroImg.getAttribute("src") || "";
  const sidebarSrc = sidebarImg.currentSrc || sidebarImg.getAttribute("src") || "";
  if (!heroSrc || !sidebarSrc) return;

  const normalizePath = src => {
    try {
      return new URL(src, window.location.href).pathname.toLowerCase();
    } catch {
      return String(src).toLowerCase();
    }
  };

  const toAssetKey = src => {
    const path = normalizePath(src);
    const filename = path.split("/").pop() || path;
    return filename
      .replace(/\.(jpe?g|png|webp|gif|avif)$/i, "")
      .replace(/-\d+x\d+$/i, "")
      .replace(/-scaled$/i, "");
  };

  const heroPath = normalizePath(heroSrc);
  const sidebarPath = normalizePath(sidebarSrc);
  const heroKey = toAssetKey(heroSrc);
  const sidebarKey = toAssetKey(sidebarSrc);

  // Remove the sidebar image when it is the same asset (including resized/conversion variants).
  if (heroPath === sidebarPath || (heroKey && heroKey === sidebarKey)) {
    sidebarImg.remove();
  }
}

function enhanceFooter() {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const grid = footer.querySelector(".footer-grid");
  if (!grid) return;

  const current = window.location.pathname.split("/").pop() || "index.html";
  const isEn = current.endsWith("-en.html");

  const footerNote = grid.querySelector(".footer-note");
  if (footerNote) {
    footerNote.textContent = isEn
      ? "Attorney advertising. Informational content only."
      : "Publicidad de abogado con contenido meramente informativo.";
  }

  if (!grid.querySelector("[data-footer-contact]")) {
    const contactCol = document.createElement("div");
    contactCol.className = "footer-col";
    contactCol.setAttribute("data-footer-contact", "true");
    contactCol.innerHTML = isEn
      ? `
        <h4>Contact</h4>
        <p><a href="tel:+18584801077">(858) 480-1077</a></p>
        <p>380 S Melrose Dr Ste 101<br>Vista, CA 92081</p>
        <p><a href="https://wa.me/18588776489" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
      `
      : `
        <h4>Contacto</h4>
        <p><a href="tel:+18584801077">(858) 480-1077</a></p>
        <p>380 S Melrose Dr Ste 101<br>Vista, CA 92081</p>
        <p><a href="https://wa.me/18588776489" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
      `;
    grid.appendChild(contactCol);
  }

  if (!grid.querySelector("[data-footer-links]")) {
    const linksCol = document.createElement("div");
    linksCol.className = "footer-col";
    linksCol.setAttribute("data-footer-links", "true");
    linksCol.innerHTML = isEn
      ? `
        <h4>Quick links</h4>
        <p><a href="index-en.html">Home</a></p>
        <p><a href="servicios-en.html">Services</a></p>
        <p><a href="quienes-somos-en.html">About</a></p>
        <p><a href="blog-en.html">Blog</a></p>
        <p><a href="contacto-en.html">Contact</a></p>
      `
      : `
        <h4>Enlaces rápidos</h4>
        <p><a href="index.html">Inicio</a></p>
        <p><a href="servicios.html">Servicios</a></p>
        <p><a href="quienes-somos.html">Quiénes somos</a></p>
        <p><a href="blog.html">Blog</a></p>
        <p><a href="contacto.html">Contacto</a></p>
      `;
    grid.appendChild(linksCol);
  }

  if (!footer.querySelector(".footer-meta")) {
    const legal = document.createElement("p");
    legal.className = "container footer-meta";
    legal.textContent = isEn
      ? "Attorney advertising with informational content only. This content does not constitute individual legal advice. Every case is different and outcomes depend on specific facts. Attorney Shannon Englert is responsible for this content and is an active member of the California Bar."
      : "Publicidad de abogado con contenido meramente informativo. Este contenido no constituye asesoría legal individual. Cada caso es diferente y los resultados dependen de hechos específicos. La abogada Shannon Englert es responsable de este contenido y es miembro activo del California Bar.";
    footer.appendChild(legal);
  }
}

dedupeArticleImages();
enhanceFooter();
initLanguageFlagsV2();
initWhatsAppResponder();
