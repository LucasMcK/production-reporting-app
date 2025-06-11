import React, { useEffect, useState } from 'react';
import '../styles/FilesPage.css';

function FilesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/files')
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching files:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-message">Loading files...</p>;
  if (!files.length) return <p className="no-files-message">No files found</p>;

  return (
    <div className="files-container">
      <h2 className="files-heading">Files</h2>
      <ul className="files-list">
        {files.map((url, idx) => (
          <li key={idx} className="file-item">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="file-link"
            >
              {decodeURIComponent(url.split('/').pop())}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilesPage;
