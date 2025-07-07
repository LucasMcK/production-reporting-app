const express = require('express');
const router = express.Router();

const fileController = require('../controllers/fileController');

router.get('/files', fileController.listUploadedFiles);
router.delete('/delete/:filename', fileController.handleDelete);

module.exports = router;
