import React, { useEffect, useState } from 'react';

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

  if (loading) return <p>Loading files...</p>;
  if (!files.length) return <p>No files found</p>;

  return (
    <div>
      <h2>Files</h2>
      <ul>
        {files.map((url, idx) => (
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
    </div>
  );  
}

export default FilesPage;