import React from 'react';
import './Header.css';

const Header = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="header">
            <div className="header__container">
                {/* Logo */}
                <div className="header__logo">
                    <div className="header__logo-icon">
                        <span className="material-icons">code</span>
                    </div>
                    <div className="text-h2">RIFAT_PULOCK</div>
                </div>

                {/* Navigation */}
                <nav className="header__nav">
                    <div className="header__nav-item" onClick={() => scrollToSection('about')}>
                        <span className="text-caption">About</span>
                    </div>
                    <div className="header__nav-item header__nav-item--active" onClick={() => scrollToSection('projects')}>
                        <span className="text-caption">Projects</span>
                    </div>
                    <div className="header__nav-item" onClick={() => scrollToSection('skills')}>
                        <span className="text-caption">Skills</span>
                    </div>
                    <div className="header__nav-item" onClick={() => scrollToSection('contact')}>
                        <span className="text-caption">Contact</span>
                    </div>
                </nav>

                {/* CTA Button */}
                <div className="header__cta">
                    <button className="header__hire-btn" onClick={() => scrollToSection('contact')}>
                        <span className="text-caption">Get In Touch</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
