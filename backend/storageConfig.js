const multer = require('multer');
const path = require('path');

const allowedExtensions = ['.xls'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname),
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
