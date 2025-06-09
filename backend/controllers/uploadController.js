exports.handleFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  console.log('File received:', req.file);

  res.status(200).json({
    message: 'File uploaded successfully.',
    file: req.file,
  });
};
