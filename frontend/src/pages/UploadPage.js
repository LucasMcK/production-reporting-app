import React, { useState } from 'react';
import '../styles/UploadPage.css';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setStatus('');
      const res = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      setStatus(res.ok ? data.message : data.message || 'Upload failed');
    } catch (err) {
      setStatus('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
        />
    <div className="button-group">
      <Button type="primary" disabled={loading} as="button" htmlType="submit">
        {loading ? 'Uploading...' : 'Upload'}
      </Button>
      <Link to="/files">
        <Button type="secondary">View Files</Button>
      </Link>
    </div>

      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default UploadForm;