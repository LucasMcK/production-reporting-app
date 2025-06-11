const express = require('express');
const upload = require('../storageConfig');
const router = express.Router();
const { handleFileUpload, listUploadedFiles } = require('../controllers/uploadController');

router.post('/', upload.single('file'), handleFileUpload);
  
router.get('/files', listUploadedFiles);
  
module.exports = router;