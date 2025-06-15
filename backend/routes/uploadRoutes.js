// files general purpose: define route for handling single file upload

// import the Express library to define routes
const express = require('express');
// create new router instance - this allows organization of routes in seperate files instead of one file
const router = express.Router();
// import function for handling single file upload
const { handleFileUpload } = require('../controllers/uploadController');
// import file configuration requirements
const upload = require('../storageConfig');

// upload single file based on configuration requirements and forward it to handleFileUpload for handling
router.post('/upload', upload.single('file'), handleFileUpload);

// export router object for use in other files
module.exports = router;