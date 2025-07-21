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
            { selector: '.achievement-card', class: 'animate-on-scroll' },
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
        // Simple hover effects for cards
        document.querySelectorAll('.achievement-card, .tech-item').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    setupTypewriterEffect() {
        const subtitle = document.querySelector('.hero-content h2');
        if (!subtitle) return;

        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid var(--primary-color)';

        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        };

        setTimeout(typeWriter, 800);
    }

    setupStaggeredAnimations() {
        const animateStaggeredElements = () => {
            document.querySelectorAll('.tech-grid .tech-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 100);
            });
        };

        // Trigger when skills section comes into view
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStaggeredElements();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    }

    setupHoverEffects() {
        // Add magnetic effect to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                this.addMagneticEffect(e.target);
            });

            btn.addEventListener('mouseleave', (e) => {
                this.removeMagneticEffect(e.target);
            });
        });

        // Add ripple effect to cards
        document.querySelectorAll('.achievement-card, .tech-item').forEach(card => {
            card.addEventListener('click', (e) => {
                this.createRippleEffect(e);
            });
        });
    }

    addMagneticEffect(element) {
        const rect = element.getBoundingClientRect();

        const mouseMoveHandler = (e) => {
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.1;
            const moveY = y * 0.1;

            element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        };

        element.addEventListener('mousemove', mouseMoveHandler);
        element._mouseMoveHandler = mouseMoveHandler;
    }

    removeMagneticEffect(element) {
        if (element._mouseMoveHandler) {
            element.removeEventListener('mousemove', element._mouseMoveHandler);
            delete element._mouseMoveHandler;
        }
        element.style.transform = '';
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(139, 90, 60, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 0;
        `;

        button.style.position = 'relative';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.getElementById('hero');
            if (hero) {
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px)`;

                // Update particles position
                this.particles.forEach((particle, index) => {
                    const speed = (index % 3 + 1) * 0.5;
                    particle.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        });
    }

    // Header scroll effect
    setupHeaderScrollEffect() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    }

    // Scroll to top button
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
        });

        // Smooth scroll to top
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Loading animation
    static createLoadingAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--gradient-warm);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease;
            }
            
            .loading-content {
                text-align: center;
                color: var(--text-dark);
            }
            
            .loading-spinner {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(139, 90, 60, 0.3);
                border-top: 3px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            
            .loading-text {
                font-size: 1.2rem;
                font-weight: 500;
                animation: pulse 2s ease-in-out infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
        `;
        document.head.appendChild(style);

        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading Portfolio...</div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Remove loading overlay after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 500);
            }, 1000);
        });
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.particles.forEach(particle => particle.remove());
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create loading animation
    PortfolioAnimations.createLoadingAnimation();

    // Initialize main animations after a short delay
    setTimeout(() => {
        window.portfolioAnimations = new PortfolioAnimations();
    }, 100);
});

// Add smooth reveal animation for page navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for page transitions
    const style = document.createElement('style');
    style.textContent = `
        .page-transition {
            opacity: 0;
            animation: pageReveal 0.8s ease forwards;
        }
        
        @keyframes pageReveal {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .section-reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .section-reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Add page transition class to body
    document.body.classList.add('page-transition');

    // Add section reveal animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-reveal');
    });

    // Setup intersection observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
