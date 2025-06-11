import React, { useState } from 'react';
//import '../styles/UploadForm';

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
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default UploadForm;