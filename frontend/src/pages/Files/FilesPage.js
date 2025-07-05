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

    if (loading)
        return <p className="status-message status-info">Loading files...</p>;
    if (!files.length)
        return <p className="status-message status-error">No files found</p>;

    const filteredFiles = files.filter(
        (file) =>
            (!year || file.includes(year)) &&
            (!month || file.includes(month)) &&
            (!location || file.toLowerCase().includes(location.toLowerCase()))
    );

    return (
        <div className="container" style={{ width: '600px' }}>
            <h2>Files</h2>
            <Workbook
                yearValue={year}
                onYearChange={handleYearChange}
                monthValue={month}
                onMonthChange={handleMonthChange}
                searchValue={location}
                onLocationChange={handleLocationChange}
            />

            {!filteredFiles.length ? (
                <p className="status-message status-error">No files found</p>
            ) : (
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
            )}

            <Link to="/upload">
                <Button type="primary">Upload Files</Button>
            </Link>
        </div>
    );
}

export default FilesPage;
