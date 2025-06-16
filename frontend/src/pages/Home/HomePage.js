import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.js';
import Logo from '../../components/Logo/Logo.js';
import '../../index.css';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="container" style={{ width: '750px' }}>
      <Logo size={450} />
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
