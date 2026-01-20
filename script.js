document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header Logic
    const header = document.querySelector('.site-header');

    // Header Glow Effect
    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        header.style.setProperty('--mouse-x', `${x}px`);
        header.style.setProperty('--mouse-y', `${y}px`);

        // Ensure the glow is visible
        header.style.backgroundImage = `radial-gradient(120px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1), transparent 100%)`;
    });

    header.addEventListener('mouseleave', () => {
        // Reset to default background when mouse leaves
        header.style.backgroundImage = '';
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes
    document.querySelectorAll('.service-card, .section-title, .hero-content > *, .step-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(el);
    });

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
