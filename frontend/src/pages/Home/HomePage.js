// files general purpose: define home page

// import React to enable JSX and component creation
import React from 'react';
// imports Link for client-side navigation between routes without page reload
import { Link } from 'react-router-dom';
// import custom reusable Button component
import Button from '../../components/Button/Button.js';
// import custom reusable Logo component
import Logo from '../../components/Logo/Logo.js';
// import global stylesheet
import '../../index.css';
// import page specific stylesheet
import './HomePage.css';

// declares functional component HomePage
function HomePage() {
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

// export component to be used elsewhere
export default HomePage;