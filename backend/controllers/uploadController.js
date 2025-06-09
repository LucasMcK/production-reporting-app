const handleFileUpload = (req, res) => {
    console.log("File received:", req.file);
    res.status(200).json({ message: 'File uploaded successfully' });
  };
  
module.exports = { handleFileUpload };