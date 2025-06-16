// files general purpose: define page for manual data entry form submission

// import React and hook useState to manage local state
import React, { useState } from 'react';
// import custom reusable Button component
import Button from '../../components/Button/Button.js';
// import global stylesheet
import '../../index.css';
// import page specific stylesheet
import './FormPage.css';

// declares functional component FormSubmissionPage
function FormSubmissionPage() {
    // state variable to hold text input for report name
    const [reportName, setReportName] = useState('');
    // state variable to hold date input
    const [reportDate, setReportDate] = useState('');
    // state variable to hold volume input
    const [volume, setVolume] = useState('');
    // state variable to hold status messages
    const [status, setStatus] = useState('');

    // define asyncronus event handler for form submission
    const handleFormSubmit = async (e) => {
        // prevent default form behaviour which would reload the page
        e.preventDefault();
  
        // create payload object from current form values
        const payload = {
            reportName,
            reportDate,
            volume,
        };
  
        // send POST request to backend endpoint /form with JSON payload
        try {
            const res = await fetch('http://localhost:5001/form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });      
  
        // parse JSON response
        const data = await res.json();

        // send back message based on success or failure of POST request
        setStatus(res.ok ? 'Form submitted successfully!' : data.message || 'Submission failed');
        // catch errors and set network error response message
        } catch (err) {
            setStatus('Network error.');
        }
    };  

    return (
        <div className="container" style={{ width: '1000px' }}>
            <h2>Manual Data Entry Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                    <label htmlFor="reportName">Report Name</label>
                    <input
                        id="reportName"
                        className="form-input"
                        type="text"
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        required
                    />
  
                    <label htmlFor="reportDate">Report Date</label>
                    <input
                        id="reportDate"
                        className="form-input"
                        type="date"
                        value={reportDate}
                        onChange={(e) => setReportDate(e.target.value)}
                        required
                    />
                </div>
  
                <label htmlFor="volume">Volume</label>
                <input
                    id="volume"
                    className="form-input"
                    type="text"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    required
                />
  
                <Button type="primary">Submit Form</Button>
  
                {status && <p className="status-message">{status}</p>}
            </form>
        </div>
    );  
}

// export component to be used elsewhere
export default FormSubmissionPage;