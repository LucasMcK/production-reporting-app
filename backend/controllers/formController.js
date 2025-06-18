const ExcelJS = require('exceljs');
const fs = require('fs-extra');
const path = require('path');

exports.handleFormSubmission = async (req, res) => {
    try {
        const { workbookName, formData, targetRow } = req.body;

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

        const sheetName = `${quadrantLSD}-${section}-${township}-${range}-${meridian}`;
        const uploadsPath = path.join(__dirname, '../uploads', workbookName);
        const templatePath = path.join(
            __dirname,
            '../templates/base_template.xlsx'
        );

        const workbook = new ExcelJS.Workbook();

        if (fs.existsSync(uploadsPath)) {
            await workbook.xlsx.readFile(uploadsPath);
            console.log('Loaded existing workbook');
        } else {
            await fs.copy(templatePath, uploadsPath);
            await workbook.xlsx.readFile(uploadsPath);
            console.log('Copied and loaded base template');
        }

        let worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            worksheet = workbook.addWorksheet(sheetName);
            worksheet.columns = Object.keys(formData).map((key) => ({
                header: key,
                key: key,
                style: {
                    font: { name: 'Arial', size: 10 },
                    alignment: { vertical: 'middle', horizontal: 'left' },
                },
            }));
            console.log(`Created new worksheet: ${sheetName}`);
        }

        // Determine the target row (default to next empty row)
        const insertAt =
            parseInt(targetRow, 10) || worksheet.actualRowCount + 1;

        // Write formData at the specific row
        const row = worksheet.getRow(insertAt);
        const values = [];

        // NOTE: ExcelJS uses 1-based column indexes
        Object.keys(formData).forEach((key, i) => {
            values[i + 1] = formData[key];
        });

        row.values = values;
        row.commit();

        await workbook.xlsx.writeFile(uploadsPath);

        res.status(200).json({
            message: `Form saved to ${sheetName} at row ${insertAt}`,
        });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
