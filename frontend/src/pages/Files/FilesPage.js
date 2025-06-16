import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import '../../index.css';
import './FilesPage.css';


function FilesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

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

  const filteredFiles = files.filter(file =>
    file.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container" style={{ width: '600px' }}>
      <h2>Files</h2>
      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul className="files-list">
        {filteredFiles.map((url, idx) => (
          <li key={idx}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {decodeURIComponent(url.split('/').pop())}
            </a>
          </li>
        ))}
      </ul>
        <Link to="/upload">
          <Button type="primary">Upload Files</Button>
        </Link>
    </div>
  );
}

export default FilesPage;