// routes/uploadRoutes.js

const express = require('express');
const upload = require('../middleware/multerConfig'); // use custom config
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

module.exports = router;
