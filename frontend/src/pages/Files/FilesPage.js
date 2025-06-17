// files general purpose: define page for viewing and downloading files

// import React and two hooks:
// useEffect: to perform side effects like fetching data
// useState: to manage local state
import React, { useEffect, useState } from 'react';
// import Link for client-side navigation without page reload
import { Link } from 'react-router-dom';
// import custom reusable Button component
import Button from '../../components/Button/Button.js';
// import custom reusable SearchBar component
import SearchBar from '../../components/LocationInput/LocationInput.js';
// import page specific stylesheet
import './FilesPage.css';

// declares functional component FilesPage
function FilesPage() {
    // initialize state files to hold array of file URLs fetched from the backend
    const [files, setFiles] = useState([]);
    // initialize loading state to indicate if files are still being fetched
    const [loading, setLoading] = useState(true);
    // initialize query state to store search input text from user
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [location, setLocation] = useState('');
    // handlers to update year, month, and location state from SearchBar input
    const handleYearChange = (val) => setYear(val);
    const handleMonthChange = (val) => setMonth(val);
    const handleLocationChange = (val) => setLocation(val);

    // run the following code once the component mounts
    useEffect(() => {
        // send GET request to backend to fetch list of files
        fetch('http://localhost:5001/files')
            // parse JSON response
            .then((res) => res.json())
            // update files state with received data and set loading state to false
            .then((data) => {
                setFiles(data);
                setLoading(false);
            })
            // log erros and set loading state to false to prevent infinite loading
            .catch((err) => {
                console.error('Error fetching files:', err);
                setLoading(false);
            });
        // empty dependency array to ensure effect only runs once on mount
    }, []);

    // display loading message while files are being fetched
    if (loading)
        return <p className="status-message status-info">Loading files...</p>;
    if (!files.length)
        return <p className="status-message status-error">No files found</p>;

    // filter files to only include those matching search query
    const filteredFiles = files.filter(
        (file) =>
            (!year || file.includes(year)) &&
            (!month || file.includes(month)) &&
            (!location || file.toLowerCase().includes(location.toLowerCase()))
    );

    return (
        <div className="container" style={{ width: '600px' }}>
            <h2>Files</h2>
            <SearchBar
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

// export component to be used elsewhere
export default FilesPage;
