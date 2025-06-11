// middleware/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const allowedExtensions = ['.xls']; // Add more extensions if needed

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // store in /uploads
  },
  filename: function (req, file, cb) {
    const baseName = path.basename(file.originalname);
    cb(null, `${baseName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error('Only .xls files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
