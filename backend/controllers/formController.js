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

        if (!fs.existsSync(uploadPath)) {
            await fsExtra.copy(templatePath, uploadPath);
            console.log('Template copied to uploads folder');
        }

        const workbook = XLSX.readFile(uploadPath);

        const sheetName = 'Reports';
        let worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
            const data = [Object.keys(formData), Object.values(formData)];
            worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        } else {
            const sheetData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
            });
            sheetData.push(Object.values(formData));
            const newWorksheet = XLSX.utils.aoa_to_sheet(sheetData);
            workbook.Sheets[sheetName] = newWorksheet;
        }

        XLSX.writeFile(workbook, uploadPath, { bookType: 'biff8' });

        res.status(200).json({ message: 'Form submitted and saved to Excel!' });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
