// files general purpose: define route for listing files stored in 'uploads' folder

// import the Express library to define routes
const express = require('express');
// import Node.js' built-in path module for working with file and directory paths
const path = require('path');
// import Node.js' built-in fs module to interact with the file system (e.g., check if file exists)
const fs = require('fs');
// import function for handling file list
const { listUploadedFiles } = require('../controllers/fileController');

// create new router instance - this allows organization of routes in seperate files instead of one file
const router = express.Router();

// return files - mounted on endpoint /files
router.get('/', listUploadedFiles);

// export router object for use in other files
module.exports = router;