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
                if (network === 'copy') { navigator.clipboard.writeText(pageUrl).then(() => { button.textContent = 'Copied'; setTimeout(() => { button.textContent = 'Copy Link'; }, 1600); }); return; }
                window.open(shareLinks[network], '_blank', 'noopener,noreferrer,width=700,height=620');
            });
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
            if (!items.length) { list.innerHTML = '<p class="comments-note">Be the first to leave a thoughtful comment on this article.</p>'; return; }
            list.innerHTML = items.map((item) => `<article class="comment-item"><strong>${item.name}</strong><time>${item.date}</time><p>${item.comment}</p></article>`).join('');
        }
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = new FormData(form);
            const nextItem = { name: data.get('name').toString().trim(), email: data.get('email').toString().trim(), comment: data.get('comment').toString().trim(), date: new Date().toLocaleString() };
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
