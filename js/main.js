// Single Page Portfolio Application JavaScript

// Application initialization
document.addEventListener('DOMContentLoaded', function () {
    const portfolioApp = new PortfolioApp();
});

// Main Portfolio Application Class
class PortfolioApp {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        // Initialize all components for single-page application
        this.components = [
            new SinglePageNavigation(),
            new AchievementTabs(),
            new AchievementSidebar(),
            new ContactForm(),
            new ScrollAnimations(),
            new MobileNavigation(),
            new AdaptiveTextColor()
        ];

        console.log('Initializing components:', this.components.length);

        // Initialize each component
        this.components.forEach((component, index) => {
            console.log(`Checking component ${index}:`, component.constructor.name, 'Available:', component.isAvailable());
            if (component.isAvailable()) {
                component.init();
                console.log(`Initialized component:`, component.constructor.name);
            } else {
                console.log(`Skipped component:`, component.constructor.name);
            }
        });

        // Set up global event listeners
        this.setupGlobalEvents();
    }

    setupGlobalEvents() {
        // Window resize handler
        window.addEventListener('resize', () => {
            this.components.forEach(component => {
                if (component.onResize) {
                    component.onResize();
                }
            });
        });

        // Global keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.components.forEach(component => {
                if (component.onKeydown) {
                    component.onKeydown(e);
                }
            });
        });
    }
}

// Single Page Navigation Component
class SinglePageNavigation extends Component {
    constructor() {
        super();
    }

    isAvailable() {
        return document.querySelector('nav a[href^="#"]') !== null;
    }

    setup() {
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
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

    setupActiveNavigation() {
        // Update active navigation based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));

                    // Add active class to current section's nav link
                    const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
}

// Achievement Tabs Component
class AchievementTabs extends Component {
    constructor() {
        super();
    }

    isAvailable() {
        return document.querySelector('.category-tabs') !== null;
    }

    setup() {
        this.setupTabSwitching();
    }

    setupTabSwitching() {
        const categoryTabs = document.querySelectorAll('.category-tabs li');
        const achievementSections = document.querySelectorAll('.achievement-section');

        console.log('Setting up achievement tabs:', categoryTabs.length, 'tabs found');
        console.log('Achievement sections found:', achievementSections.length);

        categoryTabs.forEach((tab, index) => {
            console.log(`Tab ${index}:`, tab.textContent, 'data-target:', tab.getAttribute('data-target'));

            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const target = tab.getAttribute('data-target');
                console.log('Tab clicked:', target);

                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                // Hide all achievement sections
                achievementSections.forEach(section => {
                    section.classList.remove('active-section');
                });

                // Show target section
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.classList.add('active-section');
                    console.log('Showing section:', target);
                } else {
                    console.error('Target section not found:', target);
                }
            });
        });
    }
}

// Base Component Class
class Component {
    constructor() {
        this.isInitialized = false;
    }

    isAvailable() {
        return true; // Override in subclasses
    }

    init() {
        if (this.isInitialized) return;
        this.isInitialized = true;
        this.setup();
    }

    setup() {
        // Override in subclasses
    }

    onResize() {
        // Override in subclasses if needed
    }

    onKeydown(event) {
        // Override in subclasses if needed
    }
}

// Smooth Scrolling Component
class SmoothScrolling extends Component {
    setup() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });
    }

    handleSmoothScroll(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Mobile Navigation Component
class MobileNavigation extends Component {
    constructor() {
        super();
        this.nav = null;
        this.menuButton = null;
    }

    isAvailable() {
        return document.querySelector('nav') !== null;
    }

    setup() {
        this.nav = document.querySelector('nav');
        if (window.innerWidth <= 768) {
            this.createMobileMenuButton();
        }
    }

    createMobileMenuButton() {
        this.menuButton = document.createElement('button');
        this.menuButton.className = 'mobile-menu-toggle';
        this.menuButton.innerHTML = '☰';
        this.menuButton.setAttribute('aria-label', 'Toggle navigation menu');

        this.nav.parentElement.insertBefore(this.menuButton, this.nav);
        this.menuButton.addEventListener('click', this.toggleMenu.bind(this));
    }

    toggleMenu() {
        this.nav.classList.toggle('mobile-active');
        this.menuButton.classList.toggle('active');
    }

    onResize() {
        if (window.innerWidth > 768 && this.nav) {
            this.nav.classList.remove('mobile-active');
            if (this.menuButton) {
                this.menuButton.classList.remove('active');
            }
        }
    }

    onKeydown(event) {
        if (event.key === 'Escape' && this.nav && this.nav.classList.contains('mobile-active')) {
            this.nav.classList.remove('mobile-active');
            if (this.menuButton) {
                this.menuButton.classList.remove('active');
            }
        }
    }
}

// Tab Switching Component
class TabSwitching extends Component {
    constructor() {
        super();
        this.tabs = [];
        this.sections = [];
    }

    isAvailable() {
        return document.querySelectorAll('.category-tabs li').length > 0;
    }

    setup() {
        this.tabs = document.querySelectorAll('.category-tabs li');
        this.sections = document.querySelectorAll('.achievement-section');

        this.tabs.forEach(tab => {
            tab.addEventListener('click', this.handleTabClick.bind(this));
        });
    }

    handleTabClick(event) {
        const clickedTab = event.target;

        // Remove active class from all tabs
        this.tabs.forEach(tab => tab.classList.remove('active'));
        clickedTab.classList.add('active');

        // Hide all sections
        this.sections.forEach(section => section.classList.remove('active-section'));

        // Show target section with fade effect
        const targetSection = document.getElementById(clickedTab.getAttribute('data-target'));
        if (targetSection) {
            setTimeout(() => {
                targetSection.classList.add('active-section');
            }, 150);
        }
    }
}

// Scroll Animations Component
class ScrollAnimations extends Component {
    constructor() {
        super();
        this.observer = null;
    }

    setup() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), observerOptions);

        const animateElements = document.querySelectorAll('.achievement-card, .skill-tag, .tech-item, .contact-item');
        animateElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }
}

// Contact Form Component
class ContactForm extends Component {
    constructor() {
        super();
    }

    isAvailable() {
        return document.querySelector('#contact-form') !== null;
    }

    setup() {
        const contactForm = document.querySelector('#contact-form');
        contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const { name, email, subject, message } = Object.fromEntries(formData);

        if (!this.validateForm(name, email, message)) {
            return;
        }

        // Show loading state
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Send email using EmailJS or Formspree
        this.sendEmail(name, email, subject, message)
            .then(() => {
                this.showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                event.target.reset();
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
                this.showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    }

    async sendEmail(name, email, subject, message) {
        // Option 1: Using Formspree (recommended - easy setup)
        const formspreeEndpoint = 'https://formspree.io/f/mgvzalwy'; // Replace with your Formspree form ID

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            // Fallback: Try to open default email client
            const emailBody = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:phakamintanti47600@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            window.open(mailtoLink);

            throw error;
        }
    }

    validateForm(name, email, message) {
        if (!name || !email || !message) {
            this.showNotification('Please fill in all required fields.', 'error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Skills Animation Component
class SkillsAnimation extends Component {
    constructor() {
        super();
        this.skillObserver = null;
    }

    isAvailable() {
        return document.querySelectorAll('.skill-tag').length > 0;
    }

    setup() {
        const skillTags = document.querySelectorAll('.skill-tag');

        this.skillObserver = new IntersectionObserver(
            this.handleSkillIntersection.bind(this),
            { threshold: 0.5 }
        );

        skillTags.forEach(skill => {
            this.skillObserver.observe(skill);
        });
    }

    handleSkillIntersection(entries) {
        const skillTags = document.querySelectorAll('.skill-tag');

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(skillTags).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 100}ms`;
                entry.target.classList.add('skill-animate');
            }
        });
    }
}

// Achievement Data Manager
class AchievementDataManager {
    constructor() {
        this.data = this.initializeData();
    }

    initializeData() {
        return {
            // Degrees & Certificates
            'masters-degree': {
                title: 'Master of Information Technology',
                completed: 'February 2025',
                type: 'Academic Degree',
                category: 'degree',
                institution: 'UNSW Sydney',
                grade: 'Distinction Average',
                overview: 'Comprehensive master\'s program focused on advanced information technology concepts, specializing in data science and data engineering. The program covered cutting-edge technologies and methodologies in the IT field.',
                subjects: [
                    'Advanced Database Systems',
                    'Machine Learning and Data Mining',
                    'Big Data Analytics',
                    'Data Structures and Algorithms',
                    'Principles of Programming',
                    'Project Management in IT'
                ],
                achievements: [
                    'Graduated with Distinction',
                    'Completed capstone project on Conference management application',
                ],
                skills: ['Python', 'C', 'SQL', 'Apache Spark', 'Machine Learning', 'Data Engineering']
            },
            'bachelors-degree': {
                title: 'Bachelor of Electrical Engineering',
                completed: 'May 2022',
                type: 'Academic Degree',
                category: 'degree',
                institution: 'Thammasat University',
                grade: 'First Class Honours',
                overview: 'Comprehensive electrical engineering program with specialization in electrical communication engineering. Strong foundation in mathematics, physics, and engineering principles.',
                subjects: [
                    'Circuit Analysis and Design',
                    'Digital Signal Processing',
                    'Communication Systems',
                    'Microprocessor Systems',
                    'Control Systems Engineering',
                    'Power Electronics',
                    'Electromagnetic Field Theory',
                    'Antenna Array Design'
                ],
                achievements: [
                    'Graduated with First Class Honours (GPA 3.75/4.0)',
                    'Senior project on digital signal processing using AI',
                    'Research paper entered in national academic conference',
                ],
                skills: ['MATLAB', 'Signal Processing', 'IoT', 'Embedded Systems', 'Power Electronics']
            },
            'ai-training': {
                title: 'AI for Business and Industry Training Program',
                completed: 'December 2022',
                type: 'Professional Certificate',
                category: 'certificate',
                institution: 'AMEICC (AEM-METI Economic and Industrial Cooperation Committee)',
                grade: 'Certificate of Completion',
                overview: 'Intensive training program focused on practical applications of artificial intelligence and machine learning in business and industrial contexts. Covered real-world case studies and implementation strategies.',
                subjects: [
                    'AI Fundamentals for Business',
                    'Machine Learning Applications in Industry',
                    'Data Analytics for Decision Making',
                    'AI Ethics and Governance',
                    'Automation and Process Optimization',
                    'Industry 4.0 Technologies'
                ],
                achievements: [
                    'Developed AI strategy proposal for manufacturing company',
                    'Networked with industry professionals from Japan and Thailand',
                    'Hands-on experience with AI training and tools'
                ],
                skills: ['AI Strategy', 'Data Analytics', 'Industry 4.0']
            },
            'outstanding-paper': {
                title: 'InciT Outstanding Paper Award',
                completed: 'November 2022',
                type: 'Academic Recognition',
                category: 'certificate',
                institution: 'Council of IT Deans in Thailand (CITT)',
                grade: 'Outstanding Paper Award',
                overview: 'Research in AI deep learning model for reducing the environmental noise.',
                subjects: [
                    'Artificial Intelligence in signal processing',
                ],
                achievements: [
                    'Enter IEEE Xplore Digital Library',
                ],
                skills: ['Research Methodology', 'Academic Writing', 'AI', 'Conference Presentation', 'Digital Signal Processing'],
                publications: [
                    {
                        title: 'Adaptive Noise Cancellation Using a Fully Connected Network: A Lesson Learned',
                        year: 2023,
                        link: 'https://ieeexplore.ieee.org/document/10067499'
                    }
                ]
            },
            // Professional Experiences
            'service-engineer-intern': {
                title: 'Service Engineer Intern',
                completed: 'June 2022 - August 2022',
                type: 'Professional Experience',
                category: 'experience',
                institution: 'AIT Service Co.,LTD.',
                duration: '2 months (June 2022 - August 2022)',
                overview: 'Designing and prototyping several projects. Also troubleshooting and maintaining electrical equipments.',
                responsibilities: [
                    'Designed and prototyped conveyer belt projects',
                    'Designed electrical plan for building',
                    'Assisted in troubleshooting electrical equipments',
                    'Customer interaction and support'
                ],
                achievements: [
                    'Successfully create 3 prototype using solidworks',
                    'The prototypes were used in real-world applications',
                    'Fixed many electrical equipments'
                ],
                skills: ['solidworks', 'electrical troubleshooting', 'customer support', 'communication']
            },
            'shop-assistant': {
                title: 'Shop Assistant',
                completed: 'Ongoing',
                type: 'Part-Time Position',
                category: 'experience',
                institution: 'Walsh Bay Local',
                duration: 'Ongoing',
                overview: 'Shop assistant role responsible for customer service, inventory management, and sales support.',
                responsibilities: [
                    'Provided excellent customer service and assistance',
                    'Managed inventory and restocked shelves',
                    'Assisted customers with product selection and inquiries',
                    'Processed transactions and handled cash register',
                    'Maintained cleanliness and organization of the store',
                    'Collaborated with team members to achieve sales targets'
                ],
                achievements: [],
                skills: ['Customer Service', 'Sales', 'Inventory Management', 'Communication', 'Teamwork']
            },
            // Projects
            'conference-management': {
                title: 'Conference Management Application',
                completed: 'May 2025',
                type: 'Web Application with Mobile App for attendees',
                category: 'project',
                github: 'This project is private',
                demo: '-- No demo available for this project --',
                overview: 'This conference management application was developed as my final project for the Web Development course at UNSW. It\'s a fully functional platform for managing conference events, including attendee registration, session management, and speaker management.',
                technologies: [
                    'Frontend: React, dashboard, CSS Modules',
                    'Backend: Python, SQLite, Redis, MongoDB',
                    'Authentication: JWT',
                    'Payment Processing: -',
                    'Deployment: Docker'
                ],
                features: [
                    'Responsive design for all device sizes',
                    'User authentication and profile management',
                    'Session scheduling and management',
                    'Speaker management and tracking',
                    'Real-time notifications and updates',
                    'Analytics dashboard for event organizers',
                    'Real-time analytics and reporting',
                    'Filtering and sorting of sessions',
                ]
            },
            chatbot: {
                title: 'AI Chatbot',
                completed: 'September 2023',
                type: 'Machine Learning Project',
                category: 'project',
                github: 'https://github.com/Min1471/Terrible_Idea',
                demo: '-- No demo available for this project --',
                overview: 'An AI chatbot using natural language processing to understand and respond to users in a funny way as a co-presenter in meetings.',
                technologies: [
                    'Language: Python',
                    'AI: HuggingFace Transformers'
                ],
                features: [
                    'Natural language understanding',
                    'Real-time conversation',
                ]
            },
            emotion: {
                title: 'Emotional Classification Study using Various Machine Learning and Deep Learning Methods',
                completed: 'Aug 2024',
                type: 'Machine Learning Project',
                category: 'project',
                github: 'https://github.com/Min1471/Emotional-Classification-Study-using-Various-Machine-Learning-and-Deep-Learning-Methods',
                demo: '-- No demo available for this project --',
                overview: 'Using various machine learning and deep learning methods to classify emotions in text data.',
                technologies: [
                    'Language: Python',
                    'Libraries: scikit-learn, TensorFlow, Keras, NLTK',
                    'Models: Logistic Regression, SVM, Random Forest, GRU, LSTM, Bi-GRU, Bi-LSTM, BERT'
                ],
                features: [
                    'Data preprocessing and cleaning',
                    'Feature extraction using TF-IDF and word embeddings',
                    'Model training and evaluation',
                    'Hyperparameter tuning',
                    'Performance comparison of different models'
                ]
            },
            'adaptive-noise-cancellation': {
                title: 'Adaptive Noise Cancellation Using a Fully Connected Network: A Lesson Learned',
                completed: 'May 2022',
                type: 'Research Project',
                category: 'project',
                github: '-- No GitHub repository available for this project --',
                demo: '-- No demo available for this project --',
                overview: 'Ambient noise causes annoying difficulty for listeners, especially in online learning and work-from-home environments such as during the COVID-19 pandemic. The aim of this work was to employ the neural network to mitigate such ambient noise in the online environment. The software was designed, implemented, and tested on 4 types of noise. The algorithm used was a fully connected network. The results indicated that the standard fully connected network might not be an effective solution for a specific situation. Nonetheless, the processing time was very low, making it possible for real-time application on standalone devices. The implementation using leaky ReLu, creating leaky networks, offered slightly better results in English speeches, i.e. an average of 1.382 and 0.4389 in the PESQ and STOI, respectively. The Thai leaky networks, on another hand, exhibited an average of 3.111 and 0.7096 in PESQ and STOI, respectively.',
                technologies: [
                    'Programming Language: Matlab',
                ],
                features: [
                    'Real-time audio processing',
                    'Adaptive filtering techniques',
                    'Performance evaluation against Thai and English Language'
                ],
                skills: ['MATLAB', 'Signal Processing', 'Neural Networks', 'Audio Processing', 'Research Methodology'],
                publications: [
                    {
                        title: 'Adaptive Noise Cancellation Using a Fully Connected Network: A Lesson Learned',
                        year: 2023,
                        link: 'https://ieeexplore.ieee.org/document/10067499'
                    }
                ]
            }
        };
    }

    getAchievement(key) {
        return this.data[key] || null;
    }

    getAllAchievements() {
        return this.data;
    }
}

// Sidebar Content Renderer
class SidebarContentRenderer {
    static render(achievement) {
        let content = this.renderMetaSection(achievement);

        if (achievement.category === 'project') {
            content += this.renderProjectLinks(achievement);
        }

        content += this.renderOverview(achievement);
        content += this.renderCategorySpecificSections(achievement);

        // Add publications section if available
        if (achievement.publications) {
            content += this.renderPublicationsSection(achievement);
        }

        content += this.renderSkillsSection(achievement);

        return content;
    }

    static renderMetaSection(achievement) {
        return `
            <div class="project-meta">
                <span class="project-date">Completed: ${achievement.completed}</span>
                <span class="project-type">${achievement.type}</span>
                ${achievement.institution ? `<span class="project-institution">${achievement.institution}</span>` : ''}
                ${achievement.grade ? `<span class="project-grade">${achievement.grade}</span>` : ''}
                ${achievement.duration ? `<span class="project-duration">${achievement.duration}</span>` : ''}
            </div>
        `;
    }

    static renderProjectLinks(achievement) {
        const hasValidGithub = achievement.github &&
            achievement.github.startsWith('http') &&
            !achievement.github.includes('This project is private') &&
            !achievement.github.includes('No GitHub repository available');

        const hasValidDemo = achievement.demo &&
            achievement.demo.startsWith('http') &&
            !achievement.demo.includes('No demo available');

        // Check if this is the adaptive noise cancellation project with IEEE publication
        const hasIEEEPublication = achievement.publications &&
            achievement.publications.length > 0 &&
            achievement.publications[0].link &&
            achievement.publications[0].link.includes('ieeexplore.ieee.org');

        // Only render the section if there's at least one valid link or IEEE publication
        if (!hasValidGithub && !hasValidDemo && !hasIEEEPublication) {
            return '';
        }

        let linksHtml = '';

        if (hasValidGithub) {
            linksHtml += `
                <a href="${achievement.github}" target="_blank" class="project-link github">
                    <span class="link-icon">🔗</span>
                    <span class="link-text">GitHub Repository</span>
                </a>
            `;
        }

        if (hasValidDemo) {
            linksHtml += `
                <a href="${achievement.demo}" target="_blank" class="project-link demo">
                    <span class="link-icon">🌐</span>
                    <span class="link-text">Live Demo</span>
                </a>
            `;
        }

        // Add IEEE publication link for adaptive noise cancellation project
        if (hasIEEEPublication) {
            linksHtml += `
                <a href="${achievement.publications[0].link}" target="_blank" class="project-link ieee">
                    <span class="link-icon">📚</span>
                    <span class="link-text">IEEE Publication</span>
                </a>
            `;
        }

        return `
            <div class="project-links">
                ${linksHtml}
            </div>
        `;
    }

    static renderOverview(achievement) {
        return `
            <div class="project-section">
                <h4>Overview</h4>
                <p>${achievement.overview}</p>
            </div>
        `;
    }

    static renderCategorySpecificSections(achievement) {
        switch (achievement.category) {
            case 'project':
                return this.renderProjectSections(achievement);
            case 'degree':
            case 'certificate':
                return this.renderAcademicSections(achievement);
            case 'experience':
                return this.renderExperienceSections(achievement);
            default:
                return '';
        }
    }

    static renderProjectSections(achievement) {
        return `
            <div class="project-section">
                <h4>Technologies Used</h4>
                <ul class="tech-list">
                    ${achievement.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-section">
                <h4>Key Features</h4>
                <ul class="features-list">
                    ${achievement.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    static renderAcademicSections(achievement) {
        let content = '';

        if (achievement.subjects) {
            content += `
                <div class="project-section">
                    <h4>Key Subjects/Topics</h4>
                    <ul class="tech-list">
                        ${achievement.subjects.map(subject => `<li>${subject}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (achievement.achievements) {
            content += `
                <div class="project-section">
                    <h4>Key Achievements</h4>
                    <ul class="features-list">
                        ${achievement.achievements.map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        return content;
    }

    static renderExperienceSections(achievement) {
        let content = '';

        if (achievement.responsibilities) {
            content += `
                <div class="project-section">
                    <h4>Key Responsibilities</h4>
                    <ul class="tech-list">
                        ${achievement.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (achievement.achievements) {
            content += `
                <div class="project-section">
                    <h4>Key Achievements</h4>
                    <ul class="features-list">
                        ${achievement.achievements.map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        return content;
    }

    static renderSkillsSection(achievement) {
        if (!achievement.skills) return '';

        return `
            <div class="project-section">
                <h4>Skills Developed/Used</h4>
                <div class="skills-tags">
                    ${achievement.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                </div>
            </div>
        `;
    }

    static renderPublicationsSection(achievement) {
        return `
            <div class="project-section">
                <h4>📚 Publications</h4>
                <div class="publications-list">
                    ${achievement.publications.map(pub => `
                        <div class="publication-item">
                            <div class="publication-title">
                                <a href="${pub.link}" target="_blank" rel="noopener noreferrer">
                                    ${pub.title}
                                </a>
                            </div>
                            <div class="publication-year">${pub.year}</div>
                            <div class="publication-link">
                                <a href="${pub.link}" target="_blank" rel="noopener noreferrer" class="external-link">
                                    <span class="link-icon">🔗</span>
                                    <span class="link-text">View Paper</span>
                                </a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Achievement Sidebar Component
class AchievementSidebar extends Component {
    constructor() {
        super();
        this.dataManager = new AchievementDataManager();
        this.sidebar = null;
        this.overlay = null;
        this.closeBtn = null;
        this.sidebarTitle = null;
        this.sidebarContent = null;
    }

    isAvailable() {
        return document.getElementById('project-sidebar') !== null;
    }

    setup() {
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.sidebar = document.getElementById('project-sidebar');
        this.overlay = document.getElementById('sidebar-overlay');
        this.closeBtn = document.getElementById('close-sidebar');
        this.sidebarTitle = document.getElementById('sidebar-title');
        this.sidebarContent = document.getElementById('sidebar-content');
    }

    attachEventListeners() {
        // Achievement buttons
        const achievementButtons = document.querySelectorAll('[data-achievement], [data-project]');
        achievementButtons.forEach(button => {
            button.addEventListener('click', this.handleAchievementClick.bind(this));
        });

        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', this.closeSidebar.bind(this));
        }

        // Overlay click
        if (this.overlay) {
            this.overlay.addEventListener('click', this.closeSidebar.bind(this));
        }
    }

    handleAchievementClick(event) {
        const achievementKey = event.target.getAttribute('data-achievement') ||
            event.target.getAttribute('data-project');

        const achievement = this.dataManager.getAchievement(achievementKey);

        if (achievement) {
            this.showAchievementDetails(achievement);
        }
    }

    showAchievementDetails(achievement) {
        this.updateSidebarTitle(achievement.title);
        this.updateSidebarContent(achievement);
        this.openSidebar();
    }

    updateSidebarTitle(title) {
        if (this.sidebarTitle) {
            this.sidebarTitle.textContent = title;
        }
    }

    updateSidebarContent(achievement) {
        if (this.sidebarContent) {
            this.sidebarContent.innerHTML = SidebarContentRenderer.render(achievement);
        }
    }

    openSidebar() {
        this.sidebar.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeSidebar() {
        this.sidebar.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    onKeydown(event) {
        if (event.key === 'Escape' && this.sidebar.classList.contains('active')) {
            this.closeSidebar();
        }
    }
}

// Debug: Simple test to verify JavaScript is loading
console.log('✅ JavaScript file loaded successfully');

// Debug: Test tab functionality manually
window.testTabs = function () {
    const tabs = document.querySelectorAll('.category-tabs li');
    const sections = document.querySelectorAll('.achievement-section');
    console.log('📋 Tabs found:', tabs.length);
    console.log('📄 Sections found:', sections.length);

    tabs.forEach((tab, index) => {
        console.log(`Tab ${index}: "${tab.textContent.trim()}" -> data-target="${tab.getAttribute('data-target')}"`);
    });

    sections.forEach((section, index) => {
        console.log(`Section ${index}: id="${section.id}" active="${section.classList.contains('active-section')}"`);
    });
};

// Debug: Test button functionality manually
window.testButtons = function () {
    const buttons = document.querySelectorAll('[data-achievement], [data-project]');
    console.log('🔘 Achievement/Project buttons found:', buttons.length);

    buttons.forEach((button, index) => {
        const achievement = button.getAttribute('data-achievement');
        const project = button.getAttribute('data-project');
        console.log(`Button ${index}: "${button.textContent.trim()}" -> ${achievement || project}`);
    });
};

// Run tests after DOM loads
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        console.log('🧪 Running manual tests...');
        if (window.testTabs) window.testTabs();
        if (window.testButtons) window.testButtons();
    }, 1000);
});

// Adaptive Text Color System
class AdaptiveTextColor {
    constructor() {
        this.header = null;
        this.navLinks = [];
        this.observer = null;
        this.lastBackgroundBrightness = null;
    }

    isAvailable() {
        return document.querySelector('header') !== null;
    }

    init() {
        this.header = document.querySelector('header');
        this.navLinks = Array.from(document.querySelectorAll('nav a'));

        if (!this.header || this.navLinks.length === 0) {
            console.log('AdaptiveTextColor: Required elements not found');
            return;
        }

        this.setupIntersectionObserver();
        this.setupScrollListener();
        this.updateTextColor(); // Initial update

        console.log('AdaptiveTextColor: Initialized');
    }

    setupIntersectionObserver() {
        // Create intersection observer to detect background content
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.analyzeBackgroundBrightness(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '-60px 0px 0px 0px', // Account for header height
            threshold: 0.1
        });

        // Observe all sections that could be behind the header
        const sections = document.querySelectorAll('section, .hero, .about, .achievements, .contact');
        sections.forEach(section => this.observer.observe(section));
    }

    setupScrollListener() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateTextColor();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    analyzeBackgroundBrightness(element) {
        if (!element) return 'light';

        const style = window.getComputedStyle(element);
        const backgroundColor = style.backgroundColor;
        const backgroundImage = style.backgroundImage;

        // Parse RGB values from background color
        let brightness = 'light';

        if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
            const rgb = backgroundColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
                const r = parseInt(rgb[0]);
                const g = parseInt(rgb[1]);
                const b = parseInt(rgb[2]);

                // Calculate relative luminance
                const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                brightness = luminance > 0.5 ? 'light' : 'dark';
            }
        }

        // Check for gradient backgrounds
        if (backgroundImage && backgroundImage !== 'none') {
            // For gradients, assume mixed background
            brightness = 'mixed';
        }

        // Check if element has dark/light classes
        if (element.classList.contains('dark-section') ||
            element.classList.contains('bg-dark')) {
            brightness = 'dark';
        } else if (element.classList.contains('light-section') ||
            element.classList.contains('bg-light')) {
            brightness = 'light';
        }

        return brightness;
    }

    updateTextColor() {
        // Get the element currently behind the header
        const headerRect = this.header.getBoundingClientRect();
        const elementBehind = document.elementFromPoint(
            headerRect.left + headerRect.width / 2,
            headerRect.top + headerRect.height + 10
        );

        if (!elementBehind) return;

        // Find the closest section or main content element
        const section = elementBehind.closest('section, main, .hero, .about, .achievements, .contact') || elementBehind;
        const brightness = this.analyzeBackgroundBrightness(section);

        // Force update every time for better debugging
        this.applyTextColor(brightness);
        this.lastBackgroundBrightness = brightness;
    }

    applyTextColor(brightness) {
        // Remove existing brightness classes and data attributes
        this.header.classList.remove('bg-light', 'bg-dark', 'bg-mixed');
        this.header.removeAttribute('data-bg');

        // Add appropriate class and data attribute
        this.header.classList.add(`bg-${brightness}`);
        this.header.setAttribute('data-bg', brightness);

        // Update nav links individually for better control
        this.navLinks.forEach(link => {
            link.classList.remove('over-light', 'over-dark');

            if (brightness === 'dark') {
                link.classList.add('over-dark');
            } else {
                link.classList.add('over-light');
            }
        });

        console.log(`AdaptiveTextColor: Updated to ${brightness} mode, header element:`, this.header);
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}


