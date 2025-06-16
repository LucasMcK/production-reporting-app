// files general purpose: define main application entry point and set routing between all pages

// import React to enable JSX and component creation
import React from 'react';
// import routing components from React Router:
    // BrowserRouter: handles navigation via the browser's address bar
    // Routes: container for all route definitions
    // Route: maps individual paths to components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import four main page components of the application
import UploadPage from './pages/Upload/UploadPage';
import FilesPage from './pages/Files/FilesPage';
import HomePage from './pages/Home/HomePage';
import FormSubmissionPage from './pages/Form/FormPage';

// declares functional component App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/form" element={<FormSubmissionPage />} />
      </Routes>
    </Router>
  );
}

// export component to be used elsewhere
export default App;