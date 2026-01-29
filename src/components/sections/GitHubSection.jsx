import React from 'react';
import { useGitHubProfile, useGitHubRepos, useGitHubActivity } from '../../hooks/useGitHub';
import ProfileStats from '../github/ProfileStats';
import RepoCard from '../github/RepoCard';
import ActivityFeed from '../github/ActivityFeed';
import './GitHubSection.css';

const GitHubSection = () => {
    const { profile, loading: profileLoading, error: profileError } = useGitHubProfile();
    const { repos, loading: reposLoading, error: reposError } = useGitHubRepos(6, 'updated');
    const { events, loading: eventsLoading, error: eventsError } = useGitHubActivity(10);

    const loading = profileLoading || reposLoading || eventsLoading;
    const error = profileError || reposError || eventsError;

    return (
        <section className="github-section border-b" id="github">
            {/* GitHub Section Header */}
            <div className="github-section__main-header border-b">
                <div className="github-section__main-header-content">
                    <span className="github-section__main-title text-display-small">GITHUB</span>
                    <span className="text-caption text-gray">LIVE_DATA_FROM_GITHUB_API</span>
                </div>
            </div>

            {/* Profile Stats */}
            {profileLoading ? (
                <div className="github-section__loading">
                    <span className="text-body">Loading GitHub profile...</span>
                </div>
            ) : profileError ? (
                <div className="github-section__error">
                    <span className="text-body">Unable to load GitHub profile</span>
                </div>
            ) : (
                <ProfileStats profile={profile} />
            )}

            <div className="github-section__container">
                {/* Section Header */}
                <div className="github-section__header border-b">
                    <span className="text-caption github-section__title">GITHUB_LIVE // RECENT_REPOSITORIES</span>
                    <span className="text-caption text-gray">AUTO_UPDATED</span>
                </div>

                {/* Repositories Grid */}
                {reposLoading ? (
                    <div className="github-section__loading-grid">
                        <span className="text-body text-gray">Fetching repositories...</span>
                    </div>
                ) : reposError ? (
                    <div className="github-section__error-grid">
                        <span className="text-body">Unable to load repositories</span>
                    </div>
                ) : (
                    <div className="github-section__repos-grid">
                        {repos.map((repo) => (
                            <RepoCard key={repo.id} repo={repo} />
                        ))}
                    </div>
                )}

                {/* Activity Feed */}
                <div className="github-section__activity border-t">
                    <div className="github-section__activity-content">
                        {eventsLoading ? (
                            <span className="text-body text-gray">Loading activity...</span>
                        ) : eventsError ? (
                            <span className="text-body">Unable to load activity</span>
                        ) : (
                            <ActivityFeed events={events} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GitHubSection;
