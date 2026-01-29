import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [activeSection, setActiveSection] = useState('about');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false); // Close mobile menu after click
        }
    };

    // Toggle Mobile Menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Detect active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'github', 'projects', 'skills', 'contact'];
            const scrollPosition = window.scrollY + 150;

            // Check sections in reverse order to find the current one
            for (let i = sections.length - 1; i >= 0; i--) {
                const sectionId = sections[i];
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop } = element;
                    if (scrollPosition >= offsetTop) {
                        setActiveSection(sectionId);
                        return;
                    }
                }
            }

            // Default to 'about' if at the very top
            setActiveSection('about');
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'about', label: 'About', icon: 'person' },
        { id: 'github', label: 'GitHub', icon: 'code' },
        { id: 'projects', label: 'Projects', icon: 'work' },
        { id: 'skills', label: 'Skills', icon: 'psychology' },
        { id: 'contact', label: 'Contact', icon: 'mail' }
    ];

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <div className="header__logo-icon">
                        <span className="material-icons">terminal</span>
                    </div>
                    <span className="text-h2">RIFAT_PULOCK</span>
                </div>

                {/* Mobile Menu Toggle (Three Dots) */}
                <button className="header__mobile-toggle" onClick={toggleMobileMenu} aria-label="Menu">
                    <span className="material-icons">more_vert</span>
                </button>

                {/* Navigation */}
                <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
                    {navItems.map((item) => (
                        <div
                            key={item.id}
                            className={`header__nav-item ${activeSection === item.id ? 'header__nav-item--active' : ''}`}
                            onClick={() => scrollToSection(item.id)}
                        >
                            <span className="material-icons header__nav-icon">{item.icon}</span>
                            <span className="text-caption">{item.label}</span>
                        </div>
                    ))}

                    {/* Mobile CTA (shown inside menu on small screens) */}
                    <button
                        className="header__hire-btn header__cta-mobile"
                        onClick={() => scrollToSection('contact')}
                    >
                        <span className="text-caption">Get In Touch</span>
                    </button>
                </nav>

                {/* Desktop CTA (hidden on mobile) */}
                <button
                    className="header__hire-btn header__cta-desktop"
                    onClick={() => scrollToSection('contact')}
                >
                    <span className="text-caption">Get In Touch</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
