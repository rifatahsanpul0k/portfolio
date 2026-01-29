import {
    SiReact,
    SiNodedotjs,
    SiPostgresql,
    SiExpress,
    SiRedux,
    SiJavascript,
    SiGithub,
    SiStripe
} from 'react-icons/si';

export const techStackData = [
    {
        id: 1,
        name: 'React',
        category: 'Frontend',
        level: 'ADVANCED',
        icon: SiReact
    },
    {
        id: 2,
        name: 'Node.js',
        category: 'Backend',
        level: 'ADVANCED',
        icon: SiNodedotjs
    },
    {
        id: 3,
        name: 'PostgreSQL',
        category: 'Database',
        level: 'INTERMEDIATE',
        icon: SiPostgresql
    },
    {
        id: 4,
        name: 'Express.js',
        category: 'Backend',
        level: 'ADVANCED',
        icon: SiExpress
    },
    {
        id: 5,
        name: 'Redux',
        category: 'Frontend',
        level: 'INTERMEDIATE',
        icon: SiRedux
    },
    {
        id: 6,
        name: 'JavaScript',
        category: 'Language',
        level: 'ADVANCED',
        icon: SiJavascript
    },
    {
        id: 7,
        name: 'Git & GitHub',
        category: 'Tools',
        level: 'ADVANCED',
        icon: SiGithub
    },
    {
        id: 8,
        name: 'Stripe API',
        category: 'Integration',
        level: 'INTERMEDIATE',
        icon: SiStripe
    }
];

export const skillCategories = {
    frontend: ['React', 'Redux', 'HTML5', 'CSS3', 'JavaScript'],
    backend: ['Node.js', 'Express.js'],
    database: ['PostgreSQL', 'PERN Stack'],
    networking: ['Cisco Packet Tracer', 'OSPF', 'DHCP', 'ACLs'],
    security: ['RSA Cryptography', 'PKI'],
    tools: ['Git', 'GitHub', 'Ubuntu', 'Stripe API', 'Telegram Bot API']
};
