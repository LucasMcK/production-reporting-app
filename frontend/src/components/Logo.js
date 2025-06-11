import React from 'react';
import '../styles/Logo.css';

export default function Logo({ size = 100 }) {
  return (
    <img
      src="/images/avalon-logo.png"
      alt="Avalon Logo"
      className="logo"
      style={{ width: size }}
    />
  );
}
