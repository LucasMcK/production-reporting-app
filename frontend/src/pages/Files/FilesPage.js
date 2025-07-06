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

    // Load all files on mount
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

    // Reset to page 1 when filters change
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

    return (
        <div className="container" style={{ width: '600px', height: '850px' }}>
            <h2>Files</h2>
            <Workbook
                yearValue={year}
                onYearChange={handleYearChange}
                monthValue={month}
                onMonthChange={handleMonthChange}
                searchValue={location}
                onLocationChange={handleLocationChange}
            />

            {loading ? (
                <p className="status-message status-info">Loading files...</p>
            ) : !filteredFiles.length ? (
                <p className="status-message status-error">No files found</p>
            ) : (
                <>
                    <ul className="files-list">
                        {currentFiles.map((url, idx) => (
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
                    <Button type="primary">Upload Files</Button>
                </Link>
                <Link to="/form">
                    <Button type="primary">Submit Form</Button>
                </Link>
                <Link to="/">
                    <Button type="primary">Home</Button>
                </Link>
            </div>
        </div>
    );
}

export default FilesPage;
