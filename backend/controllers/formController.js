// files general purpose: define functions that handle logic related to form submissions

// import Node.js' built-in path module for working with file and directory paths
const path = require('path');
// import Node.js' built-in fs module to interact with the file system (e.g., check if file exists)
const fs = require('fs');
// import xlsx library for reading and writing Excel files
const XLSX = require('xlsx');

// handleFormSubmission purpose overview:
    // accepts form data from a POST request
    // writes data into an Excel file inside the uploads folder
    // either creates a new workbook or writes to an existing one
    // ensures the data is saved in a consistent tabular format under the "Reports" sheet
    // this function gets called whenever a user submits a form
exports.handleFormSubmission = (req, res) => {

    // create local variables from input fields
    const { reportName, reportDate, volume } = req.body; 

    // validate that all required fields are present
    if (!reportName || !reportDate || !volume) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // define path where the Excel file should be saved
    const uploadPath = path.join(__dirname, '../uploads/report-data.xls'); 

    // check if the workbook exists   
    let workbook;
    
    // yes? load existing workbook
    if (fs.existsSync(uploadPath)) {
        workbook = XLSX.readFile(uploadPath);
    // no? create new blank workbook
    } else {
        workbook = XLSX.utils.book_new();
    }

    // set sheet name to 'Reports'
    const sheetName = 'Reports';

    // retrieve worksheet if it already exists
    let worksheet = workbook.Sheets[sheetName];

    // create object representing new row of data to be added
    const newRow = { reportName, reportDate, volume };

    // if worksheet does not exist, execute the following if statement
    if (!worksheet) {
        // create 2D array where:
            // first row is column headers
            // second row is actual data
        const data = [Object.keys(newRow), Object.values(newRow)];
        // convert data into Excel worksheet
        worksheet = XLSX.utils.aoa_to_sheet(data);
        // add new worksheet to the workbook under 'Report'
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    // if worksheet does exist, execute the following else statement
    } else {
        // convert current worksheet to a 2D array so we can work with it in plain JavaScript
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // add new row of data to end of array
        sheetData.push(Object.values(newRow));
        // convert updated 2D array back into worksheet
        const newWorksheet = XLSX.utils.aoa_to_sheet(sheetData);
        // replace old worksheet with new one
        workbook.Sheets[sheetName] = newWorksheet;
    }

    // write workbook to the file system in .xls (BIFF8) format
    XLSX.writeFile(workbook, uploadPath, { bookType: 'biff8' });

    // success message
    res.status(200).json({ message: 'Form submitted and saved to Excel!' });
};