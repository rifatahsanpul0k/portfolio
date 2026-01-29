import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', onClick, icon, fullWidth = false }) => {
    return (
        <button
            className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''}`}
            onClick={onClick}
        >
            {icon && <span className="material-icons btn__icon">{icon}</span>}
            <span className="btn__text">{children}</span>
        </button>
    );
};

export default Button;
