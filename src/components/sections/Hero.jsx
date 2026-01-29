import React from 'react';
import { profileData } from '../../data/profile';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero border-b" id="about">
            <div className="hero__container">
                <div className="hero__title-wrapper">
                    <h1 className="hero__name">{profileData.name}</h1>
                    <p className="hero__role">{profileData.role}</p>
                </div>

                <div className="hero__bottom">
                    <div className="hero__description">
                        <span className="hero__bullet">■</span>
                        <span className="hero__description-text text-body text-gray-dark">
                            CSE Student at {profileData.university}<br />
                            Building modern web applications • Graduating {profileData.graduationYear}<br />
                            Career Goal: {profileData.careerGoal}
                        </span>
                    </div>

                    <div className="hero__status">
                        <div className="hero__status-indicator"></div>
                        <span className="text-caption">STUDENT_ID: {profileData.studentId}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
