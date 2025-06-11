const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err);
      return res.status(500).json({ message: 'Failed to read files' });
    }

    const fileUrls = files.map(file => `http://localhost:5001/uploads/${file}`);
    res.json(fileUrls);
  });
});

module.exports = router;