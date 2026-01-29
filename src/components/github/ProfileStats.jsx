import React from 'react';
import './ProfileStats.css';

const ProfileStats = ({ profile }) => {
    if (!profile) return null;

    const {
        avatar_url,
        name,
        bio,
        public_repos,
        followers,
        following,
        location,
        html_url
    } = profile;

    return (
        <div className="profile-stats border-b">
            <div className="profile-stats__container">
                {/* Avatar & Info */}
                <div className="profile-stats__main">
                    <img
                        src={avatar_url}
                        alt={name || 'GitHub Avatar'}
                        className="profile-stats__avatar"
                    />

                    <div className="profile-stats__info">
                        <h2 className="profile-stats__name text-h1">{name}</h2>
                        <p className="profile-stats__bio text-body text-gray-dark">{bio}</p>
                        {location && (
                            <div className="profile-stats__location">
                                <span className="material-icons">location_on</span>
                                <span className="text-caption">{location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="profile-stats__numbers">
                    <div className="profile-stats__stat">
                        <span className="profile-stats__stat-value text-display-small">{public_repos}</span>
                        <span className="profile-stats__stat-label text-caption">REPOSITORIES</span>
                    </div>

                    <div className="profile-stats__stat border-l">
                        <span className="profile-stats__stat-value text-display-small">{followers}</span>
                        <span className="profile-stats__stat-label text-caption">FOLLOWERS</span>
                    </div>

                    <div className="profile-stats__stat border-l">
                        <span className="profile-stats__stat-value text-display-small">{following}</span>
                        <span className="profile-stats__stat-label text-caption">FOLLOWING</span>
                    </div>
                </div>

                {/* Link */}
                <a
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-stats__link"
                >
                    <span className="text-caption">VIEW_FULL_PROFILE</span>
                    <span className="material-icons">arrow_forward</span>
                </a>
            </div>
        </div>
    );
};

export default ProfileStats;
