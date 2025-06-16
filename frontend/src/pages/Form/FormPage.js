import React, { useState } from 'react';
import './FormPage.css';
import Button from '../../components/Button/Button.js';

function FormSubmissionPage() {
  const [reportName, setReportName] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [volume, setVolume] = useState('');
  const [status, setStatus] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      reportName,
      reportDate,
      volume,
    };
  
    try {
      const res = await fetch('http://localhost:5001/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });      
  
      const data = await res.json();
      setStatus(res.ok ? 'Form submitted successfully!' : data.message || 'Submission failed');
    } catch (err) {
      setStatus('Network error.');
    }
  };  

  return (
    <div className="form-container">
      <h2 className="form-heading">Manual Data Entry Form</h2>
  
      <form onSubmit={handleFormSubmit}>
        <div className="form-groups-row">
          <div className="form-group">
            <label className="form-label" htmlFor="reportName">Report Name</label>
            <input
              id="reportName"
              className="form-input"
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group">
            <label className="form-label" htmlFor="reportDate">Report Date</label>
            <input
              id="reportDate"
              className="form-input"
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              required
            />
          </div>
        </div>
  
        <div className="form-group">
          <label className="form-label" htmlFor="volume">Volume</label>
          <input
            id="volume"
            className="form-input"
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            required
          />
        </div>
  
        <Button type="primary">Submit Form</Button>
  
        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );  
}

export default FormSubmissionPage;