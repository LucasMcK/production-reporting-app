import React from 'react';
import './Button.css';

function Button({ type = 'primary', children, imgSrc, imgAlt = '', ...props }) {
    const className =
        type === 'tertiary'
            ? 'btn btn-tertiary'
            : type === 'secondary'
              ? 'btn btn-secondary'
              : type === 'home'
                ? 'btn btn-home'
                : 'btn btn-primary';

    return (
        <button className={className} {...props}>
            {imgSrc && <img src={imgSrc} alt={imgAlt} className="btn-icon" />}
            <span>{children}</span>
        </button>
    );
}

export default Button;
