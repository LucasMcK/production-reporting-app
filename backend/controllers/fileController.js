const path = require('path');
const fs = require('fs');

exports.listUploadedFiles = (req, res) => {
    const uploadsDir = path.join(__dirname, '../uploads');

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ message: 'Failed to read files' });
        }

        const filteredFiles = files.filter((file) => !file.startsWith('.'));
        const fileUrls = filteredFiles.map(
            (file) => `http://localhost:5001/uploads/${file}`
        );

        res.json(fileUrls);
    });
};

exports.handleDelete = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).json({ message: 'Error deleting file.' });
        }
        res.json({ message: 'File deleted successfully.' });
    });
};
