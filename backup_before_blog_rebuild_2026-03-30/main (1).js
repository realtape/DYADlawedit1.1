document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Track sections for fade-in effect
    const fadeElements = document.querySelectorAll('.glass-card, .section-title, .intro-text, .intro-img, .stat-item');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Custom Scroll Observer for Header Transparency
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(2, 6, 23, 0.95)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.background = 'rgba(2, 6, 23, 0.8)';
            header.style.padding = '1rem 0';
        }
    });

    // Language Toggle Mockup
    const langBtn = document.getElementById('langBtn');
    let currentLang = 'EN';

    langBtn.addEventListener('click', () => {
        if (currentLang === 'EN') {
            langBtn.textContent = 'ENGLISH';
            currentLang = 'ES';
            // In a real app, this would trigger a translations function
            console.log('Language switched to Spanish');
        } else {
            langBtn.textContent = 'ESPAÑOL';
            currentLang = 'EN';
            console.log('Language switched to English');
        }
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Helper for animations
window.addEventListener('load', () => {
    // Force fade-in for hero elements
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero div');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});
