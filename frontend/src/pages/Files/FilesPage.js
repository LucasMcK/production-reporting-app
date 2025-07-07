import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.js';
import Workbook from '../../components/WorkbookInput/WorkbookInput.js';
import './FilesPage.css';
import '../../index.css';

function FilesPage() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [location, setLocation] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 5;

    const handleYearChange = (val) => setYear(val);
    const handleMonthChange = (val) => setMonth(val);
    const handleLocationChange = (val) => setLocation(val);

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

    useEffect(() => {
        setCurrentPage(1);
    }, [year, month, location]);

    const filteredFiles = files.filter(
        (file) =>
            (!year || file.includes(year)) &&
            (!month || file.includes(month)) &&
            (!location || file.toLowerCase().includes(location.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredFiles.length / filesPerPage);
    const startIndex = (currentPage - 1) * filesPerPage;
    const currentFiles = filteredFiles.slice(
        startIndex,
        startIndex + filesPerPage
    );

    const handleDelete = async (filename) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${filename}"?`
        );
        if (!confirmed) return;

        try {
            const res = await fetch(
                `http://localhost:5001/delete/${filename}`,
                {
                    method: 'DELETE',
                }
            );

            if (res.ok) {
                setFiles((prev) =>
                    prev.filter((file) => !file.includes(filename))
                );
            } else {
                alert('Failed to delete file.');
            }
        } catch (err) {
            console.error('Error deleting file:', err);
            alert('Error deleting file.');
        }
    };

    return (
        <div className="container" style={{ width: '600px' }}>
            <h2>Files</h2>
            <p style={{ textAlign: 'center' }}>
                View all workbooks in the database or search for workbooks based
                on their year, month, or location.
            </p>
            <Workbook
                heading="Search Workbooks"
                yearValue={year}
                onYearChange={handleYearChange}
                monthValue={month}
                onMonthChange={handleMonthChange}
                searchValue={location}
                onLocationChange={handleLocationChange}
                style={{
                    border: '2px solid #01426a',
                    borderRadius: '12px',
                    padding: '2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                    color: '#333',
                    marginBottom: '0rem',
                    transition:
                        'background-color 0.2s ease, border-color 0.2s ease',
                }}
            />
            {loading ? (
                <p className="status-message status-info">Loading files...</p>
            ) : !filteredFiles.length ? (
                <p className="status-message status-error">No files found</p>
            ) : (
                <>
                    <ul className="files-list">
                        <h2 style={{ marginTop: '1rem' }}>File list</h2>
                        {currentFiles.map((url, idx) => {
                            const fileName = decodeURIComponent(
                                url.split('/').pop()
                            );

                            return (
                                <li key={idx} className="file-item">
                                    <div className="file-content">
                                        <span className="file-name">
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                            >
                                                {fileName}
                                            </a>
                                        </span>
                                        <div className="file-actions">
                                            <button
                                                className="icon-btn download-btn"
                                                onClick={() =>
                                                    window.open(url, '_blank')
                                                }
                                                title="Download"
                                            >
                                                <img
                                                    src="/images/download-icon.png"
                                                    alt="Download"
                                                    className="icon-img"
                                                />
                                            </button>
                                            <button
                                                className="icon-btn delete-btn"
                                                onClick={() =>
                                                    handleDelete(fileName)
                                                }
                                                title="Delete"
                                            >
                                                <img
                                                    src="/images/trash-icon.png"
                                                    alt="Delete"
                                                    className="icon-img"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div
                        className="pagination-controls"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '1rem 0',
                        }}
                    >
                        <Button
                            type="tertiary"
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                        >
                            Back
                        </Button>
                        <span style={{ margin: '0 1rem' }}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            type="tertiary"
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}

            <div className="button-group">
                <Link to="/upload">
                    <Button type="tertiary">Upload Files</Button>
                </Link>
                <Link to="/form">
                    <Button type="tertiary">Submit Form</Button>
                </Link>
            </div>

            <div className="home-button-group">
                <Link to="/">
                    <Button type="home" imgSrc="/images/home-icon.png" />
                </Link>
            </div>
        </div>
    );
}

export default FilesPage;
