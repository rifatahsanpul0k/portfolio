import { useState, useEffect } from 'react';
import { fetchUserProfile, fetchUserRepos, fetchUserEvents } from '../services/githubApi';

/**
 * Hook to fetch GitHub user profile
 */
export const useGitHubProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                const data = await fetchUserProfile();
                setProfile(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching GitHub profile:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    return { profile, loading, error };
};

/**
 * Hook to fetch GitHub repositories
 */
export const useGitHubRepos = (perPage = 6, sort = 'updated') => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRepos = async () => {
            try {
                setLoading(true);
                const data = await fetchUserRepos(perPage, sort);
                setRepos(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching GitHub repos:', err);
            } finally {
                setLoading(false);
            }
        };

        loadRepos();
    }, [perPage, sort]);

    return { repos, loading, error };
};

/**
 * Hook to fetch GitHub activity events
 */
export const useGitHubActivity = (perPage = 10) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const data = await fetchUserEvents(perPage);
                setEvents(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching GitHub events:', err);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, [perPage]);

    return { events, loading, error };
};

/**
 * Combined hook for all GitHub data
 */
export const useGitHub = () => {
    const profile = useGitHubProfile();
    const repos = useGitHubRepos();
    const activity = useGitHubActivity();

    return {
        profile: profile.profile,
        repos: repos.repos,
        events: activity.events,
        loading: profile.loading || repos.loading || activity.loading,
        error: profile.error || repos.error || activity.error
    };
};
