const express = require('express');
const upload = require('../storageConfig');
const { handleFileUpload } = require('../controllers/uploadController');

const router = express.Router();

router.post('/upload', (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    handleFileUpload(req, res);
  });
});

module.exports = router;
