import React from 'react';
import './Badge.css';

const Badge = ({ text, variant = 'default' }) => {
    return (
        <div className={`badge badge--${variant}`}>
            <span className="text-label">{text}</span>
        </div>
    );
};

export default Badge;
