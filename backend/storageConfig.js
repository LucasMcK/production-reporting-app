// files general purpose: configure how files are uploaded using multer

// import multer package for handling file uploads
const multer = require('multer');
// import Node.js' built-in path module for working with file and directory paths
const path = require('path');
// defines .xls as the only extensions allowed during upload
const allowedExtensions = ['.xls'];

// specifies storage location and filename
const storage = multer.diskStorage({
  // store uploaded files in the 'uploads' folder
  destination: (req, file, cb) => cb(null, 'uploads/'),
  // keep original filename
  filename: (req, file, cb) => cb(null, file.originalname),
});

// only accept files with accepted extension
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    // log error message if file has different extension from .xls
    return cb(new Error('Only .xls files are allowed'), false);
  }
  // accept file if extension is .xls
  cb(null, true);
};

// create multer instance using defined storage settings and file filter
const upload = multer({ storage, fileFilter });

// export configuration so it can be used in other files
module.exports = upload;