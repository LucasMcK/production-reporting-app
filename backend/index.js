const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Enable CORS for your frontend origin
app.use(cors({ origin: 'http://localhost:3000' }));

// Configure multer for file upload (in-memory storage or disk)
const upload = multer({ dest: 'uploads/' }); // saves files to 'uploads' folder

// POST route to receive file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // File info is in req.file
  console.log('Received file:', req.file.originalname);

  // Respond with success message
  res.json({ message: `File ${req.file.originalname} uploaded successfully` });
});

// Start the server
app.listen(5001, () => {
  console.log('Backend running on port 5001');
});
