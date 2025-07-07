import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.js';
import './UploadPage.css';

function UploadForm() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

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

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div
            className={`container ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
        >
            <form className="upload-form" onSubmit={handleSubmit}>
                <div
                    className={`drop-zone ${dragActive ? 'active' : ''}`}
                    onClick={() => inputRef.current.click()}
                >
                    <p>
                        {file
                            ? file.name
                            : 'Drag and drop a file here, or click to select one'}
                    </p>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                    />
                </div>

                <div className="button-group">
                    <Button
                        type="tertiary"
                        disabled={loading}
                        as="button"
                        htmlType="submit"
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </Button>
                    <Link to="/files">
                        <Button type="tertiary">View Files</Button>
                    </Link>
                </div>
            </form>
            {status && <p className="status-message">{status}</p>}
        </div>
    );
}

export default UploadForm;
