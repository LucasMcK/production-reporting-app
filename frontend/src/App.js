import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import FilesPage from './pages/FilesPage';
import HomePage from './pages/HomePage';
import FormSubmissionPage from '../src/pages/FormPage';

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

export default App;
