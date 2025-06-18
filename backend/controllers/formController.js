const fsExtra = require('fs-extra');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

exports.handleFormSubmission = async (req, res) => {
    try {
        const { workbookName, formData } = req.body;

        if (!workbookName || !formData) {
            return res
                .status(400)
                .json({ message: 'Missing workbookName or formData' });
        }

        const {
            year,
            month,
            location,
            quadrantLSD,
            section,
            township,
            range,
            meridian,
        } = formData;

        if (
            !year ||
            !month ||
            !location ||
            !quadrantLSD ||
            !section ||
            !township ||
            !range ||
            !meridian
        ) {
            return res
                .status(400)
                .json({ message: 'Missing mandatory fields in formData' });
        }

        const uploadPath = path.join(__dirname, '../uploads', workbookName);
        const templatePath = path.join(
            __dirname,
            '../templates/base_template.xls'
        );

        // Copy template if workbook doesn't exist
        if (!fs.existsSync(uploadPath)) {
            await fsExtra.copy(templatePath, uploadPath);
            console.log('Template copied to uploads folder');
        }

        // Read the workbook
        const workbook = XLSX.readFile(uploadPath);

        // Construct the worksheet name using the naming convention
        const sheetName = `${quadrantLSD}-${section}-${township}-${range}-${meridian}`;

        let worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
            // Create new worksheet with header row + first row of data
            const data = [Object.keys(formData), Object.values(formData)];
            worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
            console.log(`Worksheet '${sheetName}' created.`);
        } else {
            // Append data to existing worksheet
            const sheetData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
            });
            sheetData.push(Object.values(formData));
            const newWorksheet = XLSX.utils.aoa_to_sheet(sheetData);
            workbook.Sheets[sheetName] = newWorksheet;
            console.log(`Worksheet '${sheetName}' updated.`);
        }

        // Save workbook back to disk
        XLSX.writeFile(workbook, uploadPath, { bookType: 'biff8' });

        res.status(200).json({ message: 'Form submitted and saved to Excel!' });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
