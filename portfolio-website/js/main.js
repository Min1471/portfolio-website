// Portfolio Website JavaScript - Main functionality

document.addEventListener('DOMContentLoaded', function () {

    // Smooth scrolling for navigation links
    initSmoothScrolling();

    // Mobile navigation toggle
    initMobileNavigation();

    // Tab functionality for achievements page
    initTabSwitching();

    // Scroll animations
    initScrollAnimations();

    // Contact form validation (if you add a form later)
    initContactForm();

    // Skills progress animation
    initSkillsAnimation();
});

// Smooth scrolling for internal links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile navigation toggle functionality
function initMobileNavigation() {
    // Create mobile menu button if it doesn't exist
    const nav = document.querySelector('nav');
    if (nav && window.innerWidth <= 768) {
        const menuButton = createMobileMenuButton();
        nav.parentElement.insertBefore(menuButton, nav);

        menuButton.addEventListener('click', function () {
            nav.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
    }
}

function createMobileMenuButton() {
    const button = document.createElement('button');
    button.className = 'mobile-menu-toggle';
    button.innerHTML = '☰';
    button.setAttribute('aria-label', 'Toggle navigation menu');
    return button;
}

// Tab switching functionality for achievements page
function initTabSwitching() {
    const tabs = document.querySelectorAll('.category-tabs li');
    const sections = document.querySelectorAll('.achievement-section');

    if (tabs.length === 0) return; // Not on achievements page

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all sections with fade effect
            sections.forEach(section => {
                section.classList.remove('active-section');
            });

            // Show the target section with fade effect
            const targetSection = document.getElementById(this.getAttribute('data-target'));
            if (targetSection) {
                setTimeout(() => {
                    targetSection.classList.add('active-section');
                }, 150);
            }
        });
    });
}

// Scroll animations for elements coming into view
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.achievement-card, .skill-tag, .tech-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Contact form validation (for future use)
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Skills animation on scroll
function initSkillsAnimation() {
    const skillTags = document.querySelectorAll('.skill-tag');

    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Array.from(skillTags).indexOf(entry.target) * 100}ms`;
                entry.target.classList.add('skill-animate');
            }
        });
    }, { threshold: 0.5 });

    skillTags.forEach(skill => {
        skillObserver.observe(skill);
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Handle window resize
window.addEventListener('resize', function () {
    // Re-initialize mobile navigation if needed
    if (window.innerWidth > 768) {
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.remove('mobile-active');
        }
        const menuButton = document.querySelector('.mobile-menu-toggle');
        if (menuButton) {
            menuButton.classList.remove('active');
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const nav = document.querySelector('nav');
        const menuButton = document.querySelector('.mobile-menu-toggle');
        if (nav && nav.classList.contains('mobile-active')) {
            nav.classList.remove('mobile-active');
            if (menuButton) menuButton.classList.remove('active');
        }
    }
});