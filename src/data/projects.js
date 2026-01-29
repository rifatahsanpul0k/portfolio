export const projectsData = [
    {
        id: 1,
        name: 'SHOPYONLINE',
        category: 'Fullstack',
        type: 'featured',
        icon: 'shopping_cart',
        description: 'Full-stack e-commerce platform built with PERN stack, featuring AI-powered search, Stripe payment integration, and comprehensive admin dashboard for inventory and order management.',
        badge: { text: 'PRODUCTION', variant: 'new' },
        stats: {
            'Tech_Stack': 'PERN Stack',
            'Features': 'AI Search + Payments',
            'Status': 'Live'
        },
        features: [
            'AI-powered product search',
            'Stripe payment integration',
            'Admin Dashboard',
            'Real-time inventory management'
        ],
        technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe API']
    },
    {
        id: 2,
        name: 'NEONEST',
        category: 'Fullstack',
        icon: 'child_care',
        titleStyle: 'bold',
        badge: { text: 'University Project', variant: 'default' },
        stats: {
            'Type': 'Healthcare App',
            'Stack': 'Full-Stack',
            'Course': 'SE Lab'
        },
        description: 'Mother & Baby Care application developed as Software Engineering Lab project',
        technologies: ['React', 'Node.js', 'Express', 'Database']
    },
    {
        id: 3,
        name: 'TRUST_GAP_PKI',
        category: 'Security',
        icon: 'security',
        titleStyle: 'spaced',
        badge: { text: 'Cybersecurity', variant: 'default' },
        stats: {
            'Focus': 'RSA Encryption',
            'Type': 'PKI Demo',
            'Algorithms': 'RSA + CA'
        },
        description: 'Certificate Authority simulation demonstrating RSA encryption and PKI concepts',
        technologies: ['Python', 'RSA Cryptography', 'PKI']
    },
    {
        id: 4,
        name: 'TELEGRAM_BOT',
        category: 'Automation',
        icon: 'smart_toy',
        titleStyle: 'underline',
        badge: { text: 'Automation', variant: 'default' },
        stats: {
            'Type': 'Location Bot',
            'API': 'Telegram',
            'Updates': 'Automated'
        },
        description: 'Automated location tracking bot using Telegram API',
        technologies: ['Python', 'Telegram Bot API', 'Automation']
    }
];

export const filterCategories = ['All', 'Fullstack', 'Security', 'Automation'];
