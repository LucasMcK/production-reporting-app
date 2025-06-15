// files general purpose: define route for listing files stored in 'uploads' folder

// import the Express library to define routes
const express = require('express');
// create new router instance - this allows organization of routes in seperate files instead of one file
const router = express.Router();
// import function for handling file list
const { listUploadedFiles } = require('../controllers/fileController');

// return files - mounted on endpoint /files
router.get('/', listUploadedFiles);

// export router object for use in other files
module.exports = router;