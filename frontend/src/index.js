// files general purpose: main entry point of the React application

// import React to enable JSX and component creation
import React from 'react';
// import ReactDOM—the client rendering API
import ReactDOM from 'react-dom/client';
// import App to define overall structure and routing for application.
import App from './App';
// import global stylesheet to apply to all pages
import './index.css';

// find root element in index.html and initialize it as React root node
const root = ReactDOM.createRoot(document.getElementById('root'));
// render App component to root node to start application
root.render(<App />);