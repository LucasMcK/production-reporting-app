// files general purpose: main entry point for backend server

// import the Express library to define routes
const express = require('express');
// import cors middleware to enable cross origin requests - frontend being a different port from backend
const cors = require('cors');
// imports route handlers for file uploads
const uploadRoutes = require('./routes/uploadRoutes');
// import route handlers for retrieving uploaded files
const filesRoutes = require('./routes/filesRoutes');
// import route handlers for form submission
const formRoutes = require('./routes/formRoutes');
// initialize Express application
const app = express();
// set backend port to 5001
const PORT = process.env.PORT || 5001;

// enable cors for all routes and methods
app.use(cors());
// middleware that parses incoming requests with JSON payloads
app.use(express.json());
// allow users to download files stored in the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// mount routes at root path
app.use('/', uploadRoutes);
app.use('/', filesRoutes);
app.use('/', formRoutes);



// log used to tell which port server is running on
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});