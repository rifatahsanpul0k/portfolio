const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'rifatahasan';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * GitHub API Service
 * Handles all GitHub API calls with caching and error handling
 */

// Helper: Check if cached data is still valid
const isCacheValid = (timestamp) => {
    if (!timestamp) return false;
    return Date.now() - timestamp < CACHE_DURATION;
};

// Helper: Get from cache
const getFromCache = (key) => {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        if (isCacheValid(timestamp)) {
            return data;
        }
        localStorage.removeItem(key);
        return null;
    } catch (error) {
        console.error('Cache read error:', error);
        return null;
    }
};

// Helper: Save to cache
const saveToCache = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (error) {
        console.error('Cache write error:', error);
    }
};

// Helper: Fetch with error handling
const fetchGitHub = async (endpoint) => {
    try {
        const response = await fetch(`${GITHUB_API_BASE}${endpoint}`);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('GitHub API fetch error:', error);
        throw error;
    }
};

/**
 * Fetch user profile
 */
export const fetchUserProfile = async () => {
    const cacheKey = `github_profile_${GITHUB_USERNAME}`;

    // Check cache first
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    // Fetch from API
    const data = await fetchGitHub(`/users/${GITHUB_USERNAME}`);

    // Save to cache
    saveToCache(cacheKey, data);

    return data;
};

/**
 * Fetch user repositories
 * @param {number} perPage - Number of repos to fetch
 * @param {string} sort - Sort order (updated, created, pushed, full_name)
 */
export const fetchUserRepos = async (perPage = 6, sort = 'updated') => {
    const cacheKey = `github_repos_${GITHUB_USERNAME}_${sort}_${perPage}`;

    // Check cache first
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    // Fetch from API
    const data = await fetchGitHub(`/users/${GITHUB_USERNAME}/repos?sort=${sort}&per_page=${perPage}&type=owner`);

    // Save to cache
    saveToCache(cacheKey, data);

    return data;
};

/**
 * Fetch user public events (activity)
 * @param {number} perPage - Number of events to fetch
 */
export const fetchUserEvents = async (perPage = 10) => {
    const cacheKey = `github_events_${GITHUB_USERNAME}_${perPage}`;

    // Check cache first
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    // Fetch from API
    const data = await fetchGitHub(`/users/${GITHUB_USERNAME}/events/public?per_page=${perPage}`);

    // Save to cache
    saveToCache(cacheKey, data);

    return data;
};

/**
 * Fetch repository languages
 * @param {string} repoName - Repository name
 */
export const fetchRepoLanguages = async (repoName) => {
    const cacheKey = `github_languages_${GITHUB_USERNAME}_${repoName}`;

    // Check cache first
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    // Fetch from API
    const data = await fetchGitHub(`/repos/${GITHUB_USERNAME}/${repoName}/languages`);

    // Save to cache
    saveToCache(cacheKey, data);

    return data;
};

/**
 * Clear all GitHub API cache
 */
export const clearGitHubCache = () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith('github_')) {
            localStorage.removeItem(key);
        }
    });
};

/**
 * Format GitHub event for display
 */
export const formatEvent = (event) => {
    const type = event.type;
    const repo = event.repo.name;
    const createdAt = new Date(event.created_at);

    let action = '';
    let details = '';

    switch (type) {
        case 'PushEvent':
            const commits = event.payload.commits?.length || 0;
            action = `Pushed ${commits} commit${commits > 1 ? 's' : ''}`;
            details = event.payload.commits?.[0]?.message || '';
            break;
        case 'CreateEvent':
            action = `Created ${event.payload.ref_type}`;
            details = event.payload.ref || repo;
            break;
        case 'PullRequestEvent':
            action = `${event.payload.action} pull request`;
            details = event.payload.pull_request?.title || '';
            break;
        case 'IssuesEvent':
            action = `${event.payload.action} issue`;
            details = event.payload.issue?.title || '';
            break;
        case 'WatchEvent':
            action = 'Starred';
            details = repo;
            break;
        case 'ForkEvent':
            action = 'Forked';
            details = repo;
            break;
        default:
            action = type.replace('Event', '');
            details = repo;
    }

    return {
        id: event.id,
        type,
        action,
        details,
        repo,
        createdAt,
        timeAgo: getTimeAgo(createdAt)
    };
};

/**
 * Get time ago string
 */
const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
};

export default {
    fetchUserProfile,
    fetchUserRepos,
    fetchUserEvents,
    fetchRepoLanguages,
    clearGitHubCache,
    formatEvent
};
