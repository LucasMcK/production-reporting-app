// routes/uploadRoutes.js

const express = require('express');
const upload = require('../storageConfig'); // use custom config
const router = express.Router();

// POST /upload - single file upload
router.post('/', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err.message);
      return res.status(403).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', file: req.file });
  });
});

app.use('/files', express.static(path.join(__dirname, 'uploads')));

app.get('/uploads', (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads');
  
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        console.error('Error reading uploads directory:', err);
        return res.status(500).json({ message: 'Error reading uploads directory' });
      }
  
      res.json({ files });
    });
  });

module.exports = router;