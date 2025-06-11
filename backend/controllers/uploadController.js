const path = require('path');
const fs = require('fs');

exports.handleFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  res.status(200).json({
    message: 'File uploaded successfully.',
    file: req.file.originalname,
  });
};

exports.listUploadedFiles = (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to list files.' });
    }

    res.status(200).json(files);
  });
};
