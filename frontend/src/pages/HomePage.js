import React from 'react';
import '../styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Production Reporting</h1>
      <p>Manage your file uploads and reports easily.</p>

      <div className="home-buttons">
        <a href="/upload" className="btn btn-primary">Upload Files</a>
        <a href="/files" className="btn btn-secondary">View Files</a>
      </div>
    </div>
  );
}
