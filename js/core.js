/**
 * PHAKAMIN T. Portfolio Core Logic
 * Optimized for performance and high-impact visual design.
 */

class PortfolioCore {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        // Mark as JS enabled
        document.body.classList.add('js-enabled');

        // Core component initialization
        this.initSmoothScrolling();
        this.initCategoryTabs();
        this.initHeaderEffect();
        this.initScrollToTop();
        
        // Skip heavy animations if reduced motion is requested
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.initScrollAnimations();
            this.initCometAnimation();
        }
    }

    /**
     * Smooth scrolling for internal anchor links
     */
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Tab switching logic for the Achievements page
     */
    initCategoryTabs() {
        const tabs = document.querySelectorAll('.category-tabs li');
        if (!tabs.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-target');
                const sections = document.querySelectorAll('.achievement-section');

                // Update active state for tabs and sections
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                sections.forEach(section => {
                    if (section.id === targetId) {
                        section.classList.add('active-section');
                    } else {
                        section.classList.remove('active-section');
                    }
                });
            });
        });
    }

    /**
     * Scroll-aware header styling
     */
    initHeaderEffect() {
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

    /**
     * Scroll-to-top button visibility and action
     */
    initScrollToTop() {
        const btn = document.getElementById('scroll-to-top');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                btn.style.display = 'block';
                setTimeout(() => btn.style.opacity = '1', 10);
            } else {
                btn.style.opacity = '0';
                setTimeout(() => {
                    if (btn.style.opacity === '0') btn.style.display = 'none';
                }, 300);
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * Intersection Observer for staggered entry animations
     */
    initScrollAnimations() {
        const animateElements = [
            '.about-card', '.skills-category', '.tech-item', 
            '.beacon-item', '.achievement-card'
        ];

        animateElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('animate-ready');
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

        // Staggered reveal
        setTimeout(() => {
            document.querySelectorAll('.animate-ready').forEach(el => observer.observe(el));
        }, 100);

        this.observers.push(observer);
    }

    /**
     * High-performance comet parallax effect
     */
    initCometAnimation() {
        const comet = document.getElementById('hero-comet');
        if (!comet) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const triggerHeight = window.innerHeight;
                    
                    if (scrollY < triggerHeight) {
                        const scrollPercent = scrollY / triggerHeight;
                        comet.style.opacity = scrollPercent > 0.05 ? '1' : '0';
                        
                        // Parallax calculation
                        const xPos = -150 + (scrollPercent * (window.innerWidth + 300));
                        const yPos = 15 + (scrollPercent * 20);
                        
                        comet.style.left = `${xPos}px`;
                        comet.style.top = `${yPos}%`;
                        comet.style.transform = `rotate(${-15 + (scrollPercent * 5)}deg) translateZ(0)`;
                    } else {
                        comet.style.opacity = '0';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => new PortfolioCore());
