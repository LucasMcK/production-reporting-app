const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // file extension
    const baseName = path.basename(file.originalname, ext); // filename without extension
    cb(null, `${baseName}`);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  console.log('Received file:', req.file.originalname);

  res.json({ message: `File ${req.file.originalname} uploaded successfully`, file: req.file });
});

app.listen(5001, () => {
  console.log('Backend running on port 5001');
});