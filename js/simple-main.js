/**
 * Portfolio Main Logic (Simple Version)
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Portfolio Initialized');

    // Initialize Category Tabs
    initCategoryTabs();

    // Initialize Smooth Scrolling
    initSmoothScrolling();

    // Initialize Contact Form
    initContactForm();
});

// Category Tabs Functionality
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tabs li');
    const sections = document.querySelectorAll('.achievement-section');

    if (tabs.length === 0) return;

    console.log('📂 Initializing category tabs:', tabs.length);

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const target = tab.getAttribute('data-target');

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Hide all sections
            sections.forEach(s => s.classList.remove('active-section'));

            // Show target section
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add('active-section');
            }
        });
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    console.log('🔗 Initializing smooth scrolling:', navLinks.length);

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    console.log('📧 Initializing contact form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        alert('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
    });
}
