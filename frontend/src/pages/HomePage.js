import React from 'react';
import '../styles/HomePage.css';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Production Reporting</h1>
      <p>Manage your file uploads and reports easily.</p>
      <div className="button-group">
        <Link to="/upload">
          <Button type="primary">Upload Files</Button>
        </Link>    
        <Link to="/files">
          <Button type="secondary">View Files</Button>
        </Link>
      </div>
    </div>
  );
}
