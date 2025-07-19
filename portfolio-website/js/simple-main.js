// Simplified Portfolio JavaScript - Focus on Core Functionality

console.log('🚀 Simplified Portfolio JS loaded');

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 DOM loaded, initializing portfolio...');

    // Initialize Achievement Tabs
    initAchievementTabs();

    // Initialize Achievement Buttons  
    initAchievementButtons();

    // Initialize Smooth Scrolling
    initSmoothScrolling();

    // Initialize Contact Form
    initContactForm();

    console.log('✅ Portfolio initialization complete');
});

// Achievement Tabs Functionality
function initAchievementTabs() {
    const tabs = document.querySelectorAll('.category-tabs li');
    const sections = document.querySelectorAll('.achievement-section');

    console.log('📋 Initializing achievement tabs:', tabs.length);

    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            const target = tab.getAttribute('data-target');
            console.log('🖱️ Tab clicked:', target);

            // Update tab states
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update section visibility
            sections.forEach(s => s.classList.remove('active-section'));
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add('active-section');
                console.log('✅ Section shown:', target);
            }
        });
    });
}

// Achievement Button Functionality
function initAchievementButtons() {
    const buttons = document.querySelectorAll('[data-achievement], [data-project]');
    console.log('🔘 Initializing achievement buttons:', buttons.length);

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const achievement = button.getAttribute('data-achievement');
            const project = button.getAttribute('data-project');
            const key = achievement || project;

            console.log('🖱️ Achievement button clicked:', key);
            showAchievementSidebar(key);
        });
    });
}

// Sidebar Functionality
function showAchievementSidebar(key) {
    const sidebar = document.getElementById('project-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const title = document.getElementById('sidebar-title');
    const content = document.getElementById('sidebar-content');

    if (!sidebar || !overlay || !title || !content) {
        console.error('❌ Sidebar elements not found');
        return;
    }

    // Get achievement data
    const data = getAchievementData(key);
    if (!data) {
        console.error('❌ No data found for:', key);
        return;
    }

    // Update sidebar content
    title.textContent = data.title;
    content.innerHTML = generateSidebarContent(data);

    // Show sidebar
    sidebar.classList.add('active');
    overlay.classList.add('active');

    console.log('✅ Sidebar shown for:', key);
}

// Close sidebar functionality
function closeSidebar() {
    const sidebar = document.getElementById('project-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// Initialize sidebar close handlers
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = document.getElementById('close-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // ESC key to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
});

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    console.log('🔗 Initializing smooth scrolling:', navLinks.length);

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
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

// Achievement Data
function getAchievementData(key) {
    const data = {
        'masters-degree': {
            title: 'Master of Information Technology',
            type: 'Academic Degree',
            institution: 'UNSW Sydney',
            date: '2025',
            grade: 'Specialized in Data Science and Data Engineering',
            description: 'Comprehensive master\'s program focusing on advanced topics in information technology, with particular emphasis on data science methodologies and data engineering practices.',
            technologies: ['Python', 'SQL', 'Machine Learning', 'Data Analysis', 'Cloud Computing'],
            features: [
                'Advanced data science techniques',
                'Large-scale data processing',
                'Machine learning implementation',
                'Industry collaboration projects',
                'Research methodology'
            ]
        },
        'bachelors-degree': {
            title: 'Bachelor of Electrical Engineering',
            type: 'Academic Degree',
            institution: 'Thammasat University',
            date: '2022',
            grade: 'First Class Honours',
            description: 'Comprehensive electrical engineering program with specialization in electrical communication engineering. Achieved First Class Honours demonstrating excellence in technical and theoretical knowledge.',
            technologies: ['MATLAB', 'C/C++', 'Circuit Design', 'Signal Processing', 'Communication Systems'],
            features: [
                'Electrical circuit analysis and design',
                'Signal processing and communications',
                'Control systems engineering',
                'Power systems analysis',
                'Microprocessor programming'
            ]
        },
        'ai-training': {
            title: 'AI for Business and Industry Training Program',
            type: 'Professional Certificate',
            institution: 'AMEICC',
            date: '2022',
            description: 'Comprehensive training program focusing on practical applications of artificial intelligence and machine learning in business and industrial contexts.',
            technologies: ['AI', 'Machine Learning', 'Business Intelligence', 'Data Analytics'],
            features: [
                'AI strategy development',
                'Machine learning implementation',
                'Business process optimization',
                'Industry case studies',
                'Practical AI applications'
            ]
        },
        'outstanding-paper': {
            title: 'InciT Outstanding Paper Award',
            type: 'Academic Recognition',
            institution: 'Council of IT Deans in Thailand (CITT)',
            date: '2022',
            description: 'Recognition for outstanding research paper presented at academic conference, demonstrating excellence in information technology research.',
            features: [
                'Original research contribution',
                'Peer-reviewed publication',
                'Conference presentation',
                'Academic recognition',
                'Research excellence'
            ]
        },
        'service-engineer-intern': {
            title: 'Service Engineer Intern',
            type: 'Work Experience',
            institution: 'AIT Service Co.,LTD.',
            duration: 'June 2022 - August 2022',
            description: 'Hands-on internship experience in engineering services, involving design, prototyping, and maintenance of various projects and electrical equipment.',
            technologies: ['Engineering Design', 'Prototyping', 'Equipment Maintenance', 'Project Management'],
            features: [
                'Project design and development',
                'Equipment prototyping',
                'Maintenance procedures',
                'Technical documentation',
                'Team collaboration'
            ]
        },
        'shop-assistant': {
            title: 'Shop Assistant',
            type: 'Work Experience',
            institution: 'Walsh Bay Local',
            duration: '2020 - Present',
            description: 'Customer service role focused on delivering exceptional customer experiences and maintaining high service standards.',
            features: [
                'Customer service excellence',
                'Communication skills',
                'Problem-solving abilities',
                'Team collaboration',
                'Retail operations'
            ]
        },
        'conference-management': {
            title: 'Conference Management Application',
            type: 'Software Project',
            description: 'Full-stack web and mobile application for managing conferences, built with modern technologies including React frontend, FastAPI backend, and multiple database systems.',
            technologies: ['React', 'FastAPI', 'Redis', 'SQL', 'MongoDB'],
            features: [
                'User registration and authentication',
                'Conference scheduling system',
                'Speaker management',
                'Real-time notifications',
                'Multi-platform support'
            ],
            github: 'https://github.com/yourusername/conference-management',
            demo: 'https://conference-app-demo.com'
        },
        'chatbot': {
            title: 'AI Chatbot - Terrible Idea Hackathon',
            type: 'Machine Learning Project',
            description: 'Creative AI chatbot developed for a hackathon that intentionally provides terrible presentation advice. A humorous take on AI assistance that demonstrates natural language processing capabilities.',
            technologies: ['Python', 'Natural Language Processing', 'Machine Learning', 'API Integration'],
            features: [
                'Natural language understanding',
                'Contextual responses',
                'Humorous interaction design',
                'Real-time conversation',
                'API integration'
            ],
            github: 'https://github.com/yourusername/terrible-chatbot'
        },
        'emotion': {
            title: 'Emotional Classification Study',
            type: 'Research Project',
            description: 'Comprehensive study comparing various machine learning and deep learning methods for classifying emotions in text data. Implemented using PyTorch and scikit-learn frameworks.',
            technologies: ['PyTorch', 'scikit-learn', 'Python', 'NLP', 'Deep Learning'],
            features: [
                'Multiple ML algorithm comparison',
                'Deep learning implementation',
                'Text preprocessing pipeline',
                'Performance evaluation',
                'Research methodology'
            ],
            github: 'https://github.com/yourusername/emotion-classification'
        },
        'adaptive-noise-cancellation': {
            title: 'Adaptive Noise Cancellation',
            type: 'Research Project',
            date: '2022',
            description: 'Advanced research project implementing neural network approaches for environmental noise reduction. Published findings contribute to the field of audio signal processing.',
            technologies: ['Neural Networks', 'Signal Processing', 'Python', 'Audio Processing', 'Research'],
            features: [
                'Neural network implementation',
                'Real-time noise reduction',
                'Environmental adaptation',
                'Performance optimization',
                'Academic publication'
            ],
            ieee: 'https://ieeexplore.ieee.org/document/your-paper-id'
        }
    };

    return data[key] || null;
}

// Generate sidebar content HTML
function generateSidebarContent(data) {
    let html = '';

    // Meta information
    html += '<div class="project-meta">';
    if (data.type) html += `<div class="project-type">${data.type}</div>`;
    if (data.institution) html += `<div class="project-institution">${data.institution}</div>`;
    if (data.date) html += `<div class="project-date">${data.date}</div>`;
    if (data.duration) html += `<div class="project-duration">${data.duration}</div>`;
    if (data.grade) html += `<div class="project-grade">${data.grade}</div>`;
    html += '</div>';

    // Links
    if (data.github || data.demo || data.ieee) {
        html += '<div class="project-links">';
        if (data.github) {
            html += `<a href="${data.github}" target="_blank" class="project-link github">
                <span class="link-icon">🐙</span> View on GitHub
            </a>`;
        }
        if (data.demo) {
            html += `<a href="${data.demo}" target="_blank" class="project-link demo">
                <span class="link-icon">🚀</span> Live Demo
            </a>`;
        }
        if (data.ieee) {
            html += `<a href="${data.ieee}" target="_blank" class="project-link ieee">
                <span class="link-icon">📄</span> IEEE Paper
            </a>`;
        }
        html += '</div>';
    }

    // Description
    if (data.description) {
        html += '<div class="project-section">';
        html += '<h4>Description</h4>';
        html += `<p>${data.description}</p>`;
        html += '</div>';
    }

    // Technologies
    if (data.technologies && data.technologies.length > 0) {
        html += '<div class="project-section">';
        html += '<h4>Technologies Used</h4>';
        html += '<ul class="tech-list">';
        data.technologies.forEach(tech => {
            html += `<li>${tech}</li>`;
        });
        html += '</ul>';
        html += '</div>';
    }

    // Features
    if (data.features && data.features.length > 0) {
        html += '<div class="project-section">';
        html += '<h4>Key Features</h4>';
        html += '<ul class="features-list">';
        data.features.forEach(feature => {
            html += `<li>${feature}</li>`;
        });
        html += '</ul>';
        html += '</div>';
    }

    return html;
}
