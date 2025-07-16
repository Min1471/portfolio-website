// Portfolio Website JavaScript - Clean Object-Oriented Version

// Application initialization
document.addEventListener('DOMContentLoaded', function () {
    const portfolioApp = new PortfolioApp();
    portfolioApp.init();
});

// Main Portfolio Application Class
class PortfolioApp {
    constructor() {
        this.components = [];
    }

    init() {
        // Initialize all components
        this.components = [
            new SmoothScrolling(),
            new MobileNavigation(),
            new TabSwitching(),
            new ScrollAnimations(),
            new ContactForm(),
            new SkillsAnimation(),
            new AchievementSidebar()
        ];

        // Initialize each component
        this.components.forEach(component => {
            if (component.isAvailable()) {
                component.init();
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
        const { name, email, message } = Object.fromEntries(formData);

        if (!this.validateForm(name, email, message)) {
            return;
        }

        this.showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        event.target.reset();
    }

    validateForm(name, email, message) {
        if (!name || !email || !message) {
            this.showNotification('Please fill in all fields', 'error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
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
                    'Cloud Computing Architecture',
                    'Software Engineering Principles',
                    'Cybersecurity and Privacy',
                    'Project Management in IT'
                ],
                achievements: [
                    'Graduated with Distinction Average (75%+)',
                    'Completed capstone project on ML-based recommendation systems',
                    'Published research paper on data privacy',
                    'Teaching Assistant for 2 courses',
                    'Dean\'s List for academic excellence'
                ],
                skills: ['Python', 'R', 'SQL', 'Apache Spark', 'AWS', 'Machine Learning', 'Data Engineering']
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
                    'Electromagnetic Field Theory'
                ],
                achievements: [
                    'Graduated with First Class Honours (GPA 3.8/4.0)',
                    'Outstanding Student Award 2021',
                    'Senior project on IoT communication systems',
                    'Research assistant in Communications Lab',
                    'IEEE Student Member'
                ],
                skills: ['MATLAB', 'VHDL', 'C/C++', 'PCB Design', 'Signal Processing', 'IoT', 'Embedded Systems']
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
                    'Successfully completed 80-hour intensive program',
                    'Developed AI strategy proposal for manufacturing company',
                    'Networked with industry professionals from 15+ countries',
                    'Presented group project on AI implementation roadmap'
                ],
                skills: ['Business Intelligence', 'AI Strategy', 'Process Automation', 'Data Analytics', 'Industry 4.0']
            },
            'outstanding-paper': {
                title: 'InciT Outstanding Paper Award',
                completed: 'November 2022',
                type: 'Academic Recognition',
                category: 'certificate',
                institution: 'Council of IT Deans in Thailand (CITT)',
                grade: 'Outstanding Paper Award',
                overview: 'Recognition for exceptional research paper presented at the national academic conference. The paper focused on innovative approaches to IoT security in smart city applications.',
                subjects: [
                    'IoT Security Frameworks',
                    'Smart City Infrastructure',
                    'Cybersecurity in Connected Devices',
                    'Privacy-Preserving Technologies',
                    'Network Security Protocols'
                ],
                achievements: [
                    'Selected from 200+ submitted papers',
                    'Presented at national conference with 500+ attendees',
                    'Published in conference proceedings',
                    'Invited for follow-up research collaboration',
                    'Featured in university newsletter'
                ],
                skills: ['Research Methodology', 'Academic Writing', 'IoT Security', 'Conference Presentation', 'Peer Review']
            },
            // Professional Experiences
            'web-developer-intern': {
                title: 'Service Engineer Intern',
                completed: 'August 2023',
                type: 'Professional Experience',
                category: 'experience',
                institution: 'AIT Service Co.,LTD.',
                duration: '15 months (June 2022 - August 2023)',
                overview: 'Hands-on internship experience in service engineering and web development. Worked closely with senior engineers on client projects and internal tools.',
                responsibilities: [
                    'Developed responsive web applications using React and Node.js',
                    'Collaborated with engineering teams on service optimization',
                    'Participated in code reviews and team meetings',
                    'Implemented service monitoring and maintenance tools',
                    'Tested and debugged applications across multiple platforms',
                    'Contributed to technical documentation'
                ],
                achievements: [
                    'Successfully delivered 5 client projects on time',
                    'Improved service efficiency by 30%',
                    'Received excellent performance review',
                    'Extended internship due to outstanding performance',
                    'Mentored 2 new interns in final month'
                ],
                skills: ['React.js', 'Node.js', 'JavaScript', 'Service Engineering', 'Git', 'Agile Development', 'Technical Documentation']
            },
            'teaching-assistant': {
                title: 'Teaching Assistant',
                completed: 'November 2022',
                type: 'Academic Position',
                category: 'experience',
                institution: 'UNSW Sydney',
                duration: '1 semester (July - November 2022)',
                overview: 'Teaching assistant role for undergraduate web development and database courses. Responsible for tutorial sessions, assignment marking, and student support.',
                responsibilities: [
                    'Conducted weekly tutorial sessions for 25+ students',
                    'Assisted students with web development and database assignments',
                    'Marked assignments and provided constructive feedback',
                    'Held office hours for individual student consultations',
                    'Supported course coordinator with curriculum development',
                    'Supervised practical lab sessions'
                ],
                achievements: [
                    'Received 4.8/5.0 student evaluation rating',
                    'Helped improve course pass rate by 15%',
                    'Developed supplementary learning materials',
                    'Recognized for outstanding teaching contribution',
                    'Invited to continue role in following semester'
                ],
                skills: ['Teaching', 'Web Development', 'Database Systems', 'Student Mentoring', 'Curriculum Design', 'Communication']
            },
            'freelance-developer': {
                title: 'Freelance Web Developer',
                completed: 'Ongoing',
                type: 'Self-Employment',
                category: 'experience',
                institution: 'Independent Contractor',
                duration: '3+ years (2020 - Present)',
                overview: 'Independent web development services for various clients including small businesses, startups, and individuals. Specializing in modern web technologies and responsive design.',
                responsibilities: [
                    'Built custom websites and web applications for diverse clients',
                    'Provided ongoing maintenance and support services',
                    'Consulted on technology stack selection and architecture',
                    'Managed project timelines and client communications',
                    'Implemented e-commerce solutions and payment integrations',
                    'Optimized websites for performance and SEO'
                ],
                achievements: [
                    'Successfully completed 25+ projects',
                    'Maintained 98% client satisfaction rate',
                    'Built recurring revenue stream through maintenance contracts',
                    'Expanded client base through referrals',
                    'Developed expertise in multiple technology stacks'
                ],
                skills: ['Full-Stack Development', 'Client Management', 'Project Planning', 'WordPress', 'E-commerce', 'SEO']
            },
            // Projects
            ecommerce: {
                title: 'E-Commerce Platform',
                completed: 'December 2022',
                type: 'Full-Stack Application',
                category: 'project',
                github: 'https://github.com/yourusername/ecommerce-project',
                demo: 'https://demo-ecommerce.yoursite.com',
                overview: 'This e-commerce platform was developed as my final project for the Web Development course at UNSW. It\'s a fully functional online store with product listings, user authentication, shopping cart, and payment processing capabilities.',
                technologies: [
                    'Frontend: React, Redux, CSS Modules',
                    'Backend: Node.js, Express, MongoDB',
                    'Authentication: JWT, bcrypt',
                    'Payment Processing: Stripe API',
                    'Deployment: AWS EC2, Nginx'
                ],
                features: [
                    'Responsive design for all device sizes',
                    'User authentication and profile management',
                    'Product search and filtering',
                    'Shopping cart functionality',
                    'Secure checkout process',
                    'Order history and tracking',
                    'Admin dashboard for inventory management'
                ]
            },
            chatbot: {
                title: 'AI Chatbot',
                completed: 'September 2023',
                type: 'Machine Learning Project',
                category: 'project',
                github: 'https://github.com/yourusername/ai-chatbot',
                demo: 'https://chatbot-demo.yoursite.com',
                overview: 'An intelligent chatbot built using natural language processing techniques. The bot can understand user queries and provide relevant responses based on trained models.',
                technologies: [
                    'Language: Python',
                    'Framework: TensorFlow, NLTK',
                    'Database: PostgreSQL',
                    'API: Flask REST API',
                    'Frontend: React, Socket.io'
                ],
                features: [
                    'Natural language understanding',
                    'Real-time conversation',
                    'Context awareness',
                    'Multi-language support',
                    'Intent recognition',
                    'Entity extraction',
                    'Conversation history'
                ]
            },
            dashboard: {
                title: 'Data Visualization Dashboard',
                completed: 'June 2023',
                type: 'Interactive Analytics Tool',
                category: 'project',
                github: 'https://github.com/yourusername/data-dashboard',
                demo: 'https://dashboard-demo.yoursite.com',
                overview: 'A comprehensive data visualization dashboard that allows users to explore and analyze large datasets through interactive charts and graphs.',
                technologies: [
                    'Frontend: Vue.js, D3.js',
                    'Visualization: Chart.js, Plotly',
                    'Backend: Python, FastAPI',
                    'Database: MongoDB, Redis',
                    'Deployment: Docker, Kubernetes'
                ],
                features: [
                    'Interactive data visualizations',
                    'Real-time data updates',
                    'Custom chart creation',
                    'Data filtering and sorting',
                    'Export functionality',
                    'Responsive design',
                    'Multi-user collaboration'
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
        content += this.renderSkillsSection(achievement);

        if (achievement.category === 'project') {
            content += this.renderProjectActionButton();
        }

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
        return `
            <div class="project-links">
                <a href="${achievement.github}" target="_blank" class="project-link github">
                    <span class="link-icon">🔗</span>
                    <span class="link-text">GitHub Repository</span>
                </a>
                <a href="${achievement.demo}" target="_blank" class="project-link demo">
                    <span class="link-icon">🌐</span>
                    <span class="link-text">Live Demo</span>
                </a>
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

    static renderProjectActionButton() {
        return `
            <div class="project-section">
                <a href="achievements/project.html" class="btn btn-primary" target="_blank">
                    View Full Project Details
                </a>
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
