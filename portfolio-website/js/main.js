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

    // Project sidebar functionality
    initAchievementSidebar();
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
    // ESC key closes mobile menu and sidebar
    if (e.key === 'Escape') {
        const nav = document.querySelector('nav');
        const menuButton = document.querySelector('.mobile-menu-toggle');
        if (nav && nav.classList.contains('mobile-active')) {
            nav.classList.remove('mobile-active');
            if (menuButton) menuButton.classList.remove('active');
        }

        // Close sidebar on ESC
        const sidebar = document.getElementById('project-sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    }
});

// Project sidebar functionality
// Achievement sidebar functionality (for all types: projects, degrees, experiences)
function initAchievementSidebar() {
    const achievementButtons = document.querySelectorAll('[data-achievement], [data-project]');
    const sidebar = document.getElementById('project-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const closeBtn = document.getElementById('close-sidebar');

    if (!sidebar) return; // Not on achievements page

    // All achievement data
    const achievementData = {
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
            title: 'Web Developer Intern',
            completed: 'December 2023',
            type: 'Professional Experience',
            category: 'experience',
            institution: 'XYZ Technology Solutions',
            duration: '6 months (July - December 2023)',
            overview: 'Hands-on internship experience developing responsive web applications using modern frameworks. Worked closely with senior developers on client projects and internal tools.',
            responsibilities: [
                'Developed responsive web applications using React and Node.js',
                'Collaborated with UX/UI designers on user interface implementation',
                'Participated in code reviews and team meetings',
                'Implemented RESTful APIs and database integrations',
                'Tested and debugged applications across multiple browsers',
                'Contributed to technical documentation'
            ],
            achievements: [
                'Successfully delivered 3 client projects on time',
                'Improved application performance by 25%',
                'Received excellent performance review',
                'Offered full-time position upon graduation',
                'Mentored 2 new interns in final month'
            ],
            skills: ['React.js', 'Node.js', 'JavaScript', 'HTML/CSS', 'Git', 'Agile Development', 'REST APIs']
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
        // Projects (existing data)
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

    // Add click handlers to all achievement buttons
    achievementButtons.forEach(button => {
        button.addEventListener('click', function () {
            const achievementKey = this.getAttribute('data-achievement') || this.getAttribute('data-project');
            const achievement = achievementData[achievementKey];

            if (achievement) {
                showAchievementDetails(achievement);
            }
        });
    });

    // Close button handler
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    // Overlay click handler
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    function showAchievementDetails(achievement) {
        const sidebarTitle = document.getElementById('sidebar-title');
        const sidebarContent = document.getElementById('sidebar-content');

        if (sidebarTitle) {
            sidebarTitle.textContent = achievement.title;
        }

        if (sidebarContent) {
            let content = `
                <div class="project-meta">
                    <span class="project-date">Completed: ${achievement.completed}</span>
                    <span class="project-type">${achievement.type}</span>
                    ${achievement.institution ? `<span class="project-institution">${achievement.institution}</span>` : ''}
                    ${achievement.grade ? `<span class="project-grade">${achievement.grade}</span>` : ''}
                    ${achievement.duration ? `<span class="project-duration">${achievement.duration}</span>` : ''}
                </div>
            `;

            // Add links for projects
            if (achievement.category === 'project') {
                content += `
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

            content += `
                <div class="project-section">
                    <h4>Overview</h4>
                    <p>${achievement.overview}</p>
                </div>
            `;

            // Add different sections based on category
            if (achievement.category === 'project') {
                content += `
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
            } else if (achievement.category === 'degree' || achievement.category === 'certificate') {
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
            } else if (achievement.category === 'experience') {
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
            }

            // Add skills section
            if (achievement.skills) {
                content += `
                    <div class="project-section">
                        <h4>Skills Developed/Used</h4>
                        <div class="skills-tags">
                            ${achievement.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                        </div>
                    </div>
                `;
            }

            // Add action button for projects
            if (achievement.category === 'project') {
                content += `
                    <div class="project-section">
                        <a href="achievements/project.html" class="btn btn-primary" target="_blank">
                            View Full Project Details
                        </a>
                    </div>
                `;
            }

            sidebarContent.innerHTML = content;
        }

        // Show sidebar
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}