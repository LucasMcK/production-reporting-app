import React from 'react';
import '../styles/HomePage.css';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default function HomePage() {
  return (
    <div className="home-container">
      <Logo size={300} />
      <h1>Welcome to the Production Reporting Web Application</h1>
      <p>Upload files and view reports all in one place.</p>
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
