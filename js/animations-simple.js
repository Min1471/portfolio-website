class PortfolioAnimations {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        document.body.classList.add('js-enabled');

        this.setupScrollAnimations();
        this.setupSimpleHoverEffects();
        this.setupScrollToTop();
        this.setupHeaderScrollEffect();
        this.addAnimationClasses();
    }

    addAnimationClasses() {
        const animateElements = [
            { selector: '.about-card', class: 'animate-on-scroll' },
            { selector: '.skills-category', class: 'animate-on-scroll' },
            { selector: '.tech-item', class: 'animate-on-scroll' },
            { selector: '.contact-info', class: 'animate-fade-in' },
            { selector: '.contact-form', class: 'animate-fade-in' }
        ];

        animateElements.forEach(({ selector, class: className }) => {
            document.querySelectorAll(selector).forEach((el) => {
                el.classList.add(className);
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('[class*="animate-"]').forEach(el => {
            observer.observe(el);
        });

        this.observers.push(observer);
    }

    setupSimpleHoverEffects() {
        // Simple hover effects for tech items only - using CSS transitions instead of JS
        const style = document.createElement('style');
        style.textContent = `
            .tech-item {
                transition: transform 0.2s ease !important;
            }
            .tech-item:hover {
                transform: translateY(-2px) !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupHeaderScrollEffect() {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            lastScrollY = window.scrollY;
        }, { passive: true });
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (!scrollToTopBtn) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        // Smooth scroll to top
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Clean up observers when needed
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});
