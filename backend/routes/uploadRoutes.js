const express = require('express');
const { handleFileUpload } = require('../controllers/uploadController');
const upload = require('../storageConfig');

const router = express.Router();

router.post('/upload', upload.single('file'), handleFileUpload);

module.exports = router;