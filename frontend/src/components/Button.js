import React from 'react';
import '../styles/Button.css';

function Button({ type = 'primary', children, ...props }) {
  const className = type === 'secondary' ? 'btn btn-secondary' : 'btn btn-primary';
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export default Button;