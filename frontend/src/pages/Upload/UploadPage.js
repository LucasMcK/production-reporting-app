// files general purpose: define page for single file upload

// import React and hook useState to manage local state
import React, { useState } from 'react';
// imports Link for client-side navigation between routes without page reload
import { Link } from 'react-router-dom';
// import custom reusable Button component
import Button from '../../components/Button/Button.js';
// import custom reusable Logo component
import Logo from '../../components/Logo/Logo.js';
// import page specific stylesheet
import './UploadPage.css';

// declares functional component UploadForm
function UploadForm() {
    // initialize state for storing selected file
    const [file, setFile] = useState(null);
    // state variable to hold status messages
    const [status, setStatus] = useState('');
    // initialize loading state to indicate if file is still being uploaded
    const [loading, setLoading] = useState(false);

    // define asyncronus event handler for file submission
    const handleSubmit = async (e) => {
        // prevent default form behaviour which would reload the page
        e.preventDefault();

        // return status message and stop further execution if no file is selected
        if (!file) {
            setStatus('Please select a file first.');
            return;
        }

        // create formData object
        const formData = new FormData();
        // append selected file to formData under key 'file'
        formData.append('file', file);

        try {
            // indicate upload has started
            setLoading(true);
            // clear any previous status
            setStatus('');

            // send file to backend via POST request
            const res = await fetch('http://localhost:5001/upload', {
                method: 'POST',
                body: formData,
            });

            // parse response as JSON
            const data = await res.json();
            // display server's success message or error based on upload result
            setStatus(res.ok ? data.message : data.message || 'Upload failed');
        } catch (err) {
            // display a network error if an exception occurs
            setStatus('Network error.');
        } finally {
            // set loading state to false to prevent infinite loading
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ width: "600px" }}>
            <Logo size={300} />
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

// export component to be used elsewhere
export default UploadForm;