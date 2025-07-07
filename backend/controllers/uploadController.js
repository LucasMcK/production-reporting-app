const path = require('path');
const fs = require('fs');
const upload = require('../storageConfig');

exports.handleFileUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    return res.status(200).json({
        message: 'File uploaded successfully.',
        file: {
            originalName: req.file.originalname,
            storedName: req.file.filename,
            size: req.file.size,
            path: req.file.path,
            mimetype: req.file.mimetype,
        },
    });
};
