const express = require('express');
const multer = require('multer');
const { handleFileUpload } = require('../controllers/uploadController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), handleFileUpload);

module.exports = router;
