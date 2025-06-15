// files general purpose: define route for manual data entry

// import the Express library to define routes
const express = require('express');
// create new router instance - this allows organization of routes in seperate files instead of one file
const router = express.Router();
// import function for handling form submission
const { handleFormSubmission } = require('../controllers/formController');

// forward data entered to handleFormSubmission for handling
router.post('/form', handleFormSubmission);

// export router object for use in other files
module.exports = router;