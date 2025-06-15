const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

exports.handleFormSubmission = (req, res) => {
  const { reportName, reportDate, volume } = req.body;

  if (!reportName || !reportDate || !volume) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const uploadPath = path.join(__dirname, '../uploads/report-data.xls');

  let workbook;
  if (fs.existsSync(uploadPath)) {
    workbook = XLSX.readFile(uploadPath);
  } else {
    workbook = XLSX.utils.book_new();
  }

  const sheetName = 'Reports';
  let worksheet = workbook.Sheets[sheetName];

  const newRow = { reportName, reportDate, volume };

  if (!worksheet) {
    const data = [Object.keys(newRow), Object.values(newRow)];
    worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  } else {
    const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    sheetData.push(Object.values(newRow));
    const newWorksheet = XLSX.utils.aoa_to_sheet(sheetData);
    workbook.Sheets[sheetName] = newWorksheet;
  }

  XLSX.writeFile(workbook, uploadPath, { bookType: 'biff8' });

  res.status(200).json({ message: 'Form submitted and saved to Excel!' });
};
