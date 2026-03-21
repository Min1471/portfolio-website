class PortfolioAnimations {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        // Mark as JS enabled to allow for conditional styling
        document.body.classList.add('js-enabled');

        // Only setup animations if user hasn't requested reduced motion
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.setupScrollAnimations();
        }

        this.setupHeaderScrollEffect();
        this.setupScrollToTop();
        this.addAnimationClasses();
    }

    addAnimationClasses() {
        // Apply animate-ready class to elements we want to animate
        // This class starts at opacity 0 ONLY if .js-enabled is on the body
        const animateElements = [
            '.about-card',
            '.skills-category',
            '.tech-item',
            '.contact-info',
            '.contact-form',
            '.achievement-card'
        ];

        animateElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('animate-ready');
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animate-in class to trigger the transition
                    entry.target.classList.add('animate-in');
                    // Once animated, we don't need to observe it anymore
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Wait a small bit for the DOM to be fully ready before observing
        setTimeout(() => {
            document.querySelectorAll('.animate-ready').forEach(el => {
                observer.observe(el);
            });
        }, 100);

        this.observers.push(observer);
    }

    setupHeaderScrollEffect() {
        const header = document.querySelector('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (!scrollToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                scrollToTopBtn.style.display = 'block';
                setTimeout(() => scrollToTopBtn.style.opacity = '1', 10);
            } else {
                scrollToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (scrollToTopBtn.style.opacity === '0') {
                        scrollToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        }, { passive: true });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});
