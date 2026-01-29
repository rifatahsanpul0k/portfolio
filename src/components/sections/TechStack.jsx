import React from 'react';
import { techStackData } from '../../data/techStack';
import Badge from '../common/Badge';
import './TechStack.css';

const TechStack = () => {
    return (
        <section className="tech-stack border-b">
            {/* Header */}
            <div className="tech-stack__header border-b">
                <span className="tech-stack__title text-caption">ENGINEERING_CORE // TECH_STACK</span>
                <span className="tech-stack__count text-caption text-gray">TOTAL_MODULES: 08</span>
            </div>

            {/* Tech Grid */}
            <div className="tech-stack__grid">
                {techStackData.map((tech, index) => {
                    const IconComponent = tech.icon;

                    return (
                        <div
                            key={tech.id}
                            className={`tech-stack__item ${index < techStackData.length - 1 ? 'border-r' : ''}`}
                        >
                            <div className="tech-stack__item-content">
                                {/* Real Tech Icon */}
                                <div className="tech-stack__icon">
                                    <IconComponent className="tech-stack__icon-svg" />
                                </div>

                                {/* Tech Info */}
                                <div className="tech-stack__info">
                                    <span className="tech-stack__name text-caption">{tech.name}</span>
                                    <Badge
                                        text={tech.level}
                                        variant="default"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default TechStack;
