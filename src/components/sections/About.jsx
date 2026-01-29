import React from 'react';
import { profileData } from '../../data/profile';
import './About.css';

const About = () => {
    return (
        <section className="about border-b" id="about">
            <div className="about__container">
                {/* Header */}
                <div className="about__header border-b">
                    <div className="about__header-content">
                        <span className="text-caption">ABOUT_ME // BACKGROUND</span>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="about__grid">
                    {/* Education */}
                    <div className="about__section border-r">
                        <div className="about__section-content">
                            <span className="material-icons about__icon">school</span>
                            <h3 className="text-h1 about__title">Education</h3>
                            <div className="about__info">
                                <p className="text-body">{profileData.education.degree}</p>
                                <p className="text-caption text-gray">{profileData.university}</p>
                                <p className="text-caption text-gray">Expected Graduation: {profileData.graduationYear}</p>
                            </div>
                        </div>
                    </div>

                    {/* Career Goal */}
                    <div className="about__section border-r">
                        <div className="about__section-content">
                            <span className="material-icons about__icon">flight_takeoff</span>
                            <h3 className="text-h1 about__title">Career Goal</h3>
                            <div className="about__info">
                                <p className="text-body">{profileData.careerGoal}</p>
                                <div className="about__languages">
                                    {profileData.languages.map((lang, index) => (
                                        <div key={index} className="about__language">
                                            <span className="text-caption">{lang.name}</span>
                                            <span className="text-label text-accent">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Research Interests */}
                    <div className="about__section">
                        <div className="about__section-content">
                            <span className="material-icons about__icon">science</span>
                            <h3 className="text-h1 about__title">Research Interests</h3>
                            <div className="about__info">
                                {profileData.researchInterests.map((interest, index) => (
                                    <div key={index} className="about__interest">
                                        <span className="about__bullet">■</span>
                                        <span className="text-caption">{interest}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="about__description border-t">
                    <p className="text-body text-gray-dark">{profileData.about}</p>
                </div>
            </div>
        </section>
    );
};

export default About;
