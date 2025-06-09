const express = require('express');
const multer = require('multer');
const { handleFileUpload } = require('../controllers/uploadController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // stores files in /uploads

router.post('/', (req, res, next) => {
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
