const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Enable CORS for your frontend origin
app.use(cors({ origin: 'http://localhost:3000' }));

// Configure multer storage to keep original filenames (with timestamp to avoid overwriting)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname); // file extension
    const baseName = path.basename(file.originalname, ext); // filename without extension
    // Compose new filename: original name + timestamp + extension
    cb(null, `${baseName}-${timestamp}${ext}`);
  }
});

const upload = multer({ storage });

// POST route to receive file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // File info is in req.file
  console.log('Received file:', req.file.originalname);

  // Respond with success message including the saved filename
  res.json({ message: `File ${req.file.originalname} uploaded successfully`, file: req.file });
});

// Start the server
app.listen(5001, () => {
  console.log('Backend running on port 5001');
});