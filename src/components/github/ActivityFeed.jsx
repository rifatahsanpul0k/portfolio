import React from 'react';
import { formatEvent } from '../../services/githubApi';
import './ActivityFeed.css';

const ActivityFeed = ({ events }) => {
    if (!events || events.length === 0) {
        return (
            <div className="activity-feed">
                <p className="text-body text-gray">No recent activity</p>
            </div>
        );
    }

    const formattedEvents = events.slice(0, 8).map(formatEvent);

    return (
        <div className="activity-feed">
            <div className="activity-feed__header">
                <span className="text-caption">RECENT_ACTIVITY</span>
                <span className="text-caption text-gray">LAST_8_EVENTS</span>
            </div>

            <div className="activity-feed__list">
                {formattedEvents.map((event) => (
                    <div key={event.id} className="activity-feed__item border-b">
                        <div className="activity-feed__icon">
                            <span className="material-icons">
                                {getIconForType(event.type)}
                            </span>
                        </div>

                        <div className="activity-feed__content">
                            <div className="activity-feed__action">
                                <span className="text-caption">{event.action}</span>
                                <span className="text-caption text-gray">• {event.timeAgo}</span>
                            </div>

                            {event.details && (
                                <p className="activity-feed__details text-body">
                                    {event.details}
                                </p>
                            )}

                            <span className="activity-feed__repo text-caption text-gray">
                                {event.repo}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper to get icon for event type
const getIconForType = (type) => {
    const iconMap = {
        'PushEvent': 'upload',
        'CreateEvent': 'add_circle',
        'PullRequestEvent': 'merge',
        'IssuesEvent': 'error_outline',
        'WatchEvent': 'star',
        'ForkEvent': 'fork_right',
        'DeleteEvent': 'delete'
    };

    return iconMap[type] || 'code';
};

export default ActivityFeed;
