const express = require('express');
const upload = require('../storageConfig');
const { handleFileUpload } = require('../controllers/uploadController');
const { handleManualForm } = require('./filesRoutes');
const ExcelJS = require('exceljs');

const router = express.Router();

router.post('/upload', (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    handleFileUpload(req, res);
  });
});

exports.handleFormSubmission = async (req, res) => {
  try {
    const { reportName, reportDate, volume } = req.body;

    if (!reportName || !reportDate || !volume) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new workbook and add a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    // Define columns (you can customize this)
    worksheet.columns = [
      { header: 'Report Name', key: 'reportName', width: 30 },
      { header: 'Report Date', key: 'reportDate', width: 20 },
      { header: 'Volume', key: 'volume', width: 15 },
    ];

    // Add a single row with the form data
    worksheet.addRow({ reportName, reportDate, volume });

    // Generate a unique filename
    const timestamp = Date.now();
    const safeReportName = reportName.replace(/\W+/g, '_'); // sanitize filename
    const fileName = `${safeReportName}_${timestamp}.xlsx`;

    // Full path to save
    const uploadPath = path.join(__dirname, '../uploads', fileName);

    // Save workbook to disk
    await workbook.xlsx.writeFile(uploadPath);

    res.status(200).json({ message: 'Form data saved as Excel file.', fileName });
  } catch (error) {
    console.error('Error saving Excel file:', error);
    res.status(500).json({ message: 'Failed to save Excel file.' });
  }
};

module.exports = router;
