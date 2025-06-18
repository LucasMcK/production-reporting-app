// files general purpose: define route for manual data entry

// import the Express library to define routes
const express = require('express');
// create new router instance - this allows organization of routes in separate files
const router = express.Router();
// import the function that handles form submission logic
const { handleFormSubmission } = require('../controllers/formController');

// define POST /form route using the imported handler
router.post('/form', handleFormSubmission);

module.exports = router;
