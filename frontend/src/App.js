import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/Upload/UploadPage';
import FilesPage from './pages/Files/FilesPage';
import HomePage from './pages/Home/HomePage';
import FormSubmissionPage from './pages/Form/FormPage';

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
