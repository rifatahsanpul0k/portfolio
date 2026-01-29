import React from 'react';
import Badge from '../common/Badge';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    const { name, icon, titleStyle, badge, stats } = project;

    return (
        <div className="project-card border-r border-b">
            {/* Header with title and badge */}
            <div className="project-card__header">
                <div className="project-card__title-wrapper">
                    {icon && (
                        <div className="project-card__icon">
                            <span className="material-icons">{icon}</span>
                        </div>
                    )}
                    <h3 className={`project-card__title text-h1 ${titleStyle ? `project-card__title--${titleStyle}` : ''}`}>
                        {name}
                    </h3>
                </div>
                {badge && (
                    <div className="project-card__badge">
                        <Badge text={badge.text} variant={badge.variant} />
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="project-card__stats border-t">
                {Object.entries(stats).map(([key, value], index) => {
                    const isLastInRow = (index + 1) % 2 === 0;
                    const isLastRow = index >= Object.keys(stats).length - 2;

                    return (
                        <div
                            key={key}
                            className={`project-card__stat ${!isLastInRow ? 'border-r' : ''} ${!isLastRow ? 'border-b' : ''}`}
                        >
                            <span className="project-card__stat-label text-label text-gray">{key}</span>
                            <span className="project-card__stat-value text-stat">{value}</span>
                        </div>
                    );
                })}

                {/* Arrow Button */}
                <div className="project-card__arrow">
                    <span className="material-icons">arrow_forward</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
