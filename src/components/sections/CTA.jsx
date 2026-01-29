import React from 'react';
import { profileData } from '../../data/profile';
import Button from '../common/Button';
import './CTA.css';

const CTA = () => {
    return (
        <section className="cta border-t" id="contact">
            <div className="cta__container">
                {/* Left Side - CTA Text & Contact Info */}
                <div className="cta__left border-r">
                    <div className="cta__text-wrapper">
                        <span className="cta__ready text-body">▶ READY_TO_CONNECT?</span>
                        <div className="cta__highlight">
                            <span className="cta__highlight-text">LET'S_BUILD_TOGETHER</span>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="cta__contact-info">
                        <div className="cta__contact-item">
                            <span className="material-icons cta__contact-icon">email</span>
                            <a href={`mailto:${profileData.social.email}`} className="cta__contact-link text-caption">
                                {profileData.social.email}
                            </a>
                        </div>
                        <div className="cta__contact-item">
                            <span className="material-icons cta__contact-icon">phone</span>
                            <a href={`tel:${profileData.social.phone}`} className="cta__contact-link text-caption">
                                {profileData.social.phone}
                            </a>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="cta__social">
                        <a href={profileData.social.github} target="_blank" rel="noopener noreferrer" className="cta__social-link">
                            <span className="text-caption">GITHUB</span>
                        </a>
                        <a href={profileData.social.linkedin} target="_blank" rel="noopener noreferrer" className="cta__social-link">
                            <span className="text-caption">LINKEDIN</span>
                        </a>
                    </div>
                </div>

                {/* Right Side - Action Buttons */}
                <div className="cta__right">
                    <div className="cta__buttons">
                        <Button variant="primary" fullWidth>
                            DOWNLOAD_RESUME
                        </Button>
                        <a href={`mailto:${profileData.social.email}`} style={{ textDecoration: 'none' }}>
                            <Button variant="secondary" fullWidth>
                                SEND_EMAIL
                            </Button>
                        </a>

                        {/* Decorative Arrow */}
                        <div className="cta__arrow-decoration">
                            <span className="material-icons">keyboard_arrow_right</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
