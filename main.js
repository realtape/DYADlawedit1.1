const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav]");
const currentPath = window.location.pathname.split("/").pop() || "index.html";

if (navMenu) {
  navMenu.querySelectorAll("a").forEach(link => {
    if ((link.textContent || "").trim().toUpperCase() === "CONSULTA") {
      link.classList.add("nav-consulta");
      link.setAttribute("href", "https://dyadlaw.com/consulta/");
    }
    link.classList.remove("active");
    const href = link.getAttribute("href") || "";
    if (href === currentPath) {
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
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.7-1.6h1.3V4.8c-.2 0-1-.1-2-.1-2.6 0-4.3 1.5-4.3 4.4V11H8v3h2.3v7h3.2z"/></svg>
        <span class="sr-only">Facebook</span>
      </button>
      <button class="share-btn" data-share="instagram" type="button" aria-label="Compartir en Instagram" title="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.8 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
        <span class="sr-only">Instagram</span>
      </button>
      <button class="share-btn" data-share="tiktok" type="button" aria-label="Compartir en TikTok" title="TikTok">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.8 3h2.7c.3 1.7 1.4 3 3 3.3v2.8a7 7 0 0 1-3-1.1v6.1a5 5 0 1 1-4.2-4.9v2.9a2.2 2.2 0 1 0 1.5 2.1V3z"/></svg>
        <span class="sr-only">TikTok</span>
      </button>
      <button class="share-btn" data-share="youtube" type="button" aria-label="Compartir en YouTube" title="YouTube">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.3a2.8 2.8 0 0 0-2-2C17.8 5 12 5 12 5s-5.8 0-7.6.3a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.7 2.8 2.8 0 0 0 2 2c1.8.3 7.6.3 7.6.3s5.8 0 7.6-.3a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.7zM10 15.5v-7L16 12l-6 3.5z"/></svg>
        <span class="sr-only">YouTube</span>
      </button>
      <button class="share-btn" data-share="copy" type="button" aria-label="Copiar enlace" title="Copiar enlace">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2zm-4 0V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2h-2V5H7v4H5z"/></svg>
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

  wrap.appendChild(share);
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
        <button type="button" data-wa-chip="vawa">VAWA</button>
        <button type="button" data-wa-chip="tvisa">T Visa</button>
        <button type="button" data-wa-chip="consulta">Consulta</button>
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

initWhatsAppResponder();
