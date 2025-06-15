// files general purpose: define functions that handle logic related to viewing files in 'uploads' folder

// import Node.js' built-in path module for working with file and directory paths
const path = require('path');
// import Node.js' built-in fs module to interact with the file system (e.g., check if file exists)
const fs = require('fs');

// listUploadedFiles purpose overview:
	// handles request to root path
	// reads files in the 'uploads' folder
	// sends back list of URLs that point to each file in the folder
exports.listUploadedFiles = (req, res) => {

    // find full path to uploads folder by joining current folder with '../uploads'
    const uploadsDir = path.join(__dirname, '../uploads');
  
    // read all files in the upload folder 
    fs.readdir(uploadsDir, (err, files) => {
        // log errors if something goes wrong while reading the folder
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ message: 'Failed to read files' });
        }
    
        // filter out hidden and system files
        const filteredFiles = files.filter(file => !file.startsWith('.'));
    
        // creates URLs for each file in the folder - this allows users to download them
        const fileUrls = filteredFiles.map(file => `http://localhost:5001/uploads/${file}`);
    
        // send list of URLs as a JSON array
        res.json(fileUrls);
    });
};