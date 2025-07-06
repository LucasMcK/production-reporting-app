import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.js';
import './HomePage.css';

function HomePage() {
    const [recentFiles, setRecentFiles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/files')
            .then((res) => res.json())
            .then((data) => {
                // Optional: Sort if backend doesn't return newest first
                const sorted = [...data].sort((a, b) => {
                    const dateA = new Date(a.uploadTime || 0);
                    const dateB = new Date(b.uploadTime || 0);
                    return dateB - dateA;
                });
                setRecentFiles(sorted.slice(0, 5));
            })
            .catch((err) => {
                console.error('Error fetching recent files:', err);
            });
    }, []);

    return (
        <div className="container">
            <div className="intro-text">
                <div>
                    <h1>Production Reporting Application</h1>
                </div>
                <div>
                    <p>Track, export, and manage production data</p>
                </div>
            </div>

            <div className="sub-container">
                <h2>Actions</h2>
                <div className="button-group">
                    <Link to="/upload">
                        <Button
                            type="tertiary"
                            imgSrc="/images/upload-icon.png"
                        >
                            Upload Files
                        </Button>
                    </Link>
                    <Link to="/files">
                        <Button
                            type="tertiary"
                            imgSrc="/images/view-file-icon.png"
                        >
                            View All Files
                        </Button>
                    </Link>
                    <Link to="/form">
                        <Button
                            type="tertiary"
                            imgSrc="/images/submit-form-icon.png"
                        >
                            Submit Form
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="sub-container">
                <h2>Recently Uploaded Files</h2>
                {recentFiles.length === 0 ? (
                    <p>No recent files found.</p>
                ) : (
                    <ul className="recent-files-list">
                        {recentFiles.map((fileUrl, idx) => (
                            <li key={idx}>
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {decodeURIComponent(
                                        fileUrl.split('/').pop()
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default HomePage;
