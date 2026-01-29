import React from 'react';
import './RepoCard.css';

const RepoCard = ({ repo }) => {
    const {
        name,
        description,
        html_url,
        stargazers_count,
        forks_count,
        language,
        updated_at
    } = repo;

    // Format update time
    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const seconds = Math.floor((new Date() - date) / 1000);

        const intervals = {
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `Updated ${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }
        return 'Updated recently';
    };

    return (
        <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card border"
        >
            <div className="repo-card__content">
                {/* Header */}
                <div className="repo-card__header">
                    <span className="material-icons repo-card__icon">folder</span>
                    <h3 className="repo-card__name text-h3">{name}</h3>
                </div>

                {/* Description */}
                <p className="repo-card__description text-body">
                    {description || 'No description available'}
                </p>

                {/* Stats */}
                <div className="repo-card__stats">
                    {language && (
                        <div className="repo-card__stat">
                            <span className="repo-card__stat-dot"></span>
                            <span className="text-caption">{language}</span>
                        </div>
                    )}

                    {stargazers_count > 0 && (
                        <div className="repo-card__stat">
                            <span className="material-icons repo-card__stat-icon">star</span>
                            <span className="text-caption">{stargazers_count}</span>
                        </div>
                    )}

                    {forks_count > 0 && (
                        <div className="repo-card__stat">
                            <span className="material-icons repo-card__stat-icon">fork_right</span>
                            <span className="text-caption">{forks_count}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="repo-card__footer">
                    <span className="text-caption text-gray">{getTimeAgo(updated_at)}</span>
                </div>
            </div>
        </a>
    );
};

export default RepoCard;
