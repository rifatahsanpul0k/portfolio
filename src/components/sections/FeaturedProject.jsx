import React from 'react';
import Badge from '../common/Badge';
import './FeaturedProject.css';

const FeaturedProject = ({ project }) => {
    if (!project || project.type !== 'featured') return null;

    const { name, icon, description, badge, stats } = project;

    return (
        <div className="featured-project border-b">
            <div className="featured-project__container">
                {/* Left Side - Project Info */}
                <div className="featured-project__info border-r">
                    <div className="featured-project__header">
                        <span className="text-caption text-gray">Projects / 01</span>
                    </div>

                    <div className="featured-project__content">
                        <div className="featured-project__icon-wrapper">
                            <span className="material-icons featured-project__icon">{icon}</span>
                        </div>

                        <h2 className="text-h1 featured-project__title">{name}</h2>

                        <p className="text-body text-gray-dark featured-project__description">{description}</p>
                    </div>

                    {badge && (
                        <div className="featured-project__badge">
                            <Badge text={badge.text} variant={badge.variant} />
                        </div>
                    )}
                </div>

                {/* Right Side - Stats & Image */}
                <div className="featured-project__right">
                    {/* Stats */}
                    <div className="featured-project__stats border-b">
                        {Object.entries(stats).map(([key, value]) => (
                            <div key={key} className="featured-project__stat border-r">
                                <span className="text-caption text-gray featured-project__stat-label">{key}</span>
                                <span className="text-stat featured-project__stat-value">{value}</span>
                            </div>
                        ))}
                        <div className="featured-project__arrow">
                            <span className="material-icons">arrow_forward</span>
                        </div>
                    </div>

                    {/* Image Placeholder */}
                    <div className="featured-project__image">
                        <div className="featured-project__image-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProject;
