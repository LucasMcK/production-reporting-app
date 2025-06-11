import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null); // hold currently selected file, start as null
  const [status, setStatus] = useState(''); // show messages to user, start as empty string
  const [loading, setLoading] = useState(false); // track whether files are being uploaded or not, start as false

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent browser from doing default submission, which would reload the browser

    // ensure the user selected a file—if not, prompt them to select one.
    if (!file) {
      setStatus('Please select a file first.');
      return;
    }

    const formData = new FormData(); // allows simulation of form submission
    formData.append('file', file); // add file under 'file' key

    try {
      setLoading(true); // try uploading the file
      setStatus(''); // reset status

      // send HTTP request to backend at specified endpoint, wait till response comes back
      const res = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData, // contains file
      });

      const data = await res.json(); // wait for the response

      // parse the response JSON into a JavaScript object data
      if (res.ok) {
        setStatus(`${data.message}`); // success message
      } else {
        setStatus(`${data.message || 'Upload failed'}`); // failure message, set default to 'Upload failed'
      }
    } catch (err) {
      setStatus('Network error.');
    } finally {
      setLoading(false); // set loading back to false to indicate the upload has ended, this will enable the upload button again and update the UI
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
export default App;