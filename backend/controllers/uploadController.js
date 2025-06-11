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

exports.listUploadedFiles = (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error reading upload directory:', err);
      return res.status(500).json({ message: 'Unable to read upload directory' });
    }

    // Create full URLs to serve the files
    const fileUrls = files.map((filename) => ({
      filename,
      url: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
    }));

    res.json(fileUrls);
  });
};
