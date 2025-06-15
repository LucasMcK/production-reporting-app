const express = require('express');
const router = express.Router();
const { handleFileUpload } = require('../controllers/uploadController');
const upload = require('../storageConfig');

router.post('/upload', upload.single('file'), handleFileUpload);

module.exports = router;