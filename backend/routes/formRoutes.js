// files general purpose: define route for manual data entry

const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const XLSX = require('xlsx');

const router = express.Router();

const UPLOADS_DIR = path.join(__dirname, '../uploads');
const TEMPLATE_PATH = path.join(__dirname, '../templates/');

// POST /form
router.post('/form', async (req, res) => {
  const { workbookName, formData } = req.body;

  if (!workbookName || !formData) {
    return res.status(400).json({ error: 'Missing workbook name or form data.' });
  }

  const workbookPath = path.join(UPLOADS_DIR, `${workbookName}.xlsx`);

  try {
    let workbook;

    // Check if workbook already exists
    if (await fs.pathExists(workbookPath)) {
      workbook = XLSX.readFile(workbookPath);
      console.log('Workbook exists. Loaded for editing.');
    } else {
      // If not, copy the template to create a new workbook
      await fs.copyFile(TEMPLATE_PATH, workbookPath);
      workbook = XLSX.readFile(workbookPath);
      console.log('Workbook created from template.');
    }

    // Get first worksheet
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    // Convert to JSON so we can append
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Append new formData
    jsonData.push(formData);

    // Convert back to sheet
    const updatedSheet = XLSX.utils.json_to_sheet(jsonData);
    workbook.Sheets[worksheetName] = updatedSheet;

    // Save updated workbook
    XLSX.writeFile(workbook, workbookPath);

    res.json({ message: 'Workbook updated successfully.', file: `${workbookName}.xlsx` });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;