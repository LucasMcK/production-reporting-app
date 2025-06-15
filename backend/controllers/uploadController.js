// files general purpose: define functions that handle logic related to file uploads

// imports Node.js' built-in path module for working with file and directory paths
const path = require("path");
// imports storage configuration from seperate file
const upload = require("../storageConfig");
// imports Node.js' built-in fs module to interact with the file system (e.g., check if file exists)
const fs = require("fs");

// handleFileUpload purpose overview:
    // check if a file was included in upload request
    // send predefined error or success message based on whether or not file was included
    // upload file using original name
exports.handleFileUpload = (req, res) => {
    // return error message if no file is included in upload request
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    // upload file using original name and return success message if file is included in upload request
    return res.status(200).json({
        message: "File uploaded successfully.",
        file: req.file.originalname,
    });
};