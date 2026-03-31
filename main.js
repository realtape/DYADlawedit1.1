document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    document.querySelectorAll('.share-buttons').forEach((group) => {
        const pageUrl = window.location.href;
        const pageTitle = group.dataset.shareTitle || document.title;
        group.querySelectorAll('.share-btn').forEach((button) => {
            button.addEventListener('click', () => {
                const network = button.dataset.shareNetwork;
                const encodedUrl = encodeURIComponent(pageUrl);
                const encodedTitle = encodeURIComponent(pageTitle);
                const shareLinks = { facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` };
                if (network === 'copy') { navigator.clipboard.writeText(pageUrl).then(() => { button.textContent = 'Enlace copiado'; setTimeout(() => { button.textContent = 'Copiar enlace'; }, 1600); }); return; }
                window.open(shareLinks[network], '_blank', 'noopener,noreferrer,width=700,height=620');
            });
        });
    });

    document.querySelectorAll('.lead-intake-form').forEach((form) => {
        const feedback = form.querySelector('.lead-intake-feedback');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = new FormData(form);
            const nombre = (data.get('nombre') || '').toString().trim();
            const tema = (data.get('tema') || '').toString().trim();
            const horario = (data.get('horario') || '').toString().trim();
            const canal = (data.get('canal') || '').toString().trim();
            const mensaje = (data.get('mensaje') || '').toString().trim();
            if (!nombre || !tema || !mensaje) {
                if (feedback) feedback.textContent = 'Completa tu nombre, el tema y una breve descripcion para preparar mejor el mensaje.';
                return;
            }
            const text = [
                'Hola, quiero una consulta con DYADLAW.',
                `Nombre: ${nombre}`,
                `Tema: ${tema}`,
                horario ? `Mejor horario: ${horario}` : '',
                canal ? `Canal preferido: ${canal}` : '',
                `Situacion: ${mensaje}`,
                `Pagina: ${window.location.href}`
            ].filter(Boolean).join('\n');
            const waUrl = `https://wa.me/18584801077?text=${encodeURIComponent(text)}`;
            if (feedback) feedback.textContent = 'Abriendo WhatsApp con tu mensaje prellenado.';
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
    });

    document.querySelectorAll('.comments-panel').forEach((panel) => {
        const thread = panel.dataset.commentThread;
        const form = panel.querySelector('.comment-form');
        const list = panel.querySelector('.comment-list');
        const key = `dyadlaw-comments:${thread}`;
        function readComments() { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (error) { return []; } }
        function saveComments(items) { localStorage.setItem(key, JSON.stringify(items)); }
        function renderComments() {
            const items = readComments();
            if (!items.length) { list.innerHTML = '<p class="comments-note">Se la primera persona en dejar un comentario en este articulo.</p>'; return; }
            list.innerHTML = items.map((item) => `<article class="comment-item"><strong>${item.name}</strong><time>${item.date}</time><p>${item.comment}</p></article>`).join('');
        }
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = new FormData(form);
            const nextItem = { name: data.get('name').toString().trim(), email: data.get('email').toString().trim(), comment: data.get('comment').toString().trim(), date: new Date().toLocaleString('es-US', { dateStyle: 'medium', timeStyle: 'short' }) };
            if (!nextItem.name || !nextItem.email || !nextItem.comment) { return; }
            const items = readComments();
            items.unshift(nextItem);
            saveComments(items);
            form.reset();
            renderComments();
        });
        renderComments();
    });
});
