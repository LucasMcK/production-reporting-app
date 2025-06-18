const ExcelJS = require('exceljs');
const fs = require('fs-extra');
const path = require('path');

function cloneWorksheet(sourceSheet, targetSheet) {
    targetSheet.columns = sourceSheet.columns.map((col) => ({
        header: col.header,
        key: col.key,
        width: col.width,
        style: col.style,
    }));

    sourceSheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        const targetRow = targetSheet.getRow(rowNumber);
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const targetCell = targetRow.getCell(colNumber);
            targetCell.value = cell.value;
            if (cell.style) {
                targetCell.style = { ...cell.style };
            }
            if (sourceSheet._merges && sourceSheet._merges[cell.address]) {
                targetSheet.mergeCells(cell.address);
            }
        });
        targetRow.commit();
    });
}

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
            dayOfMonth,
        } = formData;

        if (!workbookName) {
            return res
                .status(400)
                .json({ message: 'workbookName is mandatory' });
        }

        if (!quadrantLSD || !section || !township || !range || !meridian) {
            return res
                .status(400)
                .json({ message: 'Missing mandatory fields for sheet name' });
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
            const templateSheet = workbook.getWorksheet('Well Template');
            if (!templateSheet) {
                return res
                    .status(500)
                    .json({
                        error: '"Well Template" sheet is missing in the workbook',
                    });
            }

            const existingSheet = workbook.getWorksheet(sheetName);
            if (existingSheet) {
                workbook.removeWorksheet(existingSheet.id);
            }

            worksheet = workbook.addWorksheet(sheetName);
            cloneWorksheet(templateSheet, worksheet);

            workbook.removeWorksheet(templateSheet.id);

            console.log(
                `Created new worksheet: ${sheetName} with full template copy`
            );
        }

        const baseRow = parseInt(dayOfMonth, 10);
        const insertAtRow = Number.isInteger(baseRow)
            ? baseRow + 6
            : worksheet.actualRowCount + 1;

        const row = worksheet.getRow(insertAtRow);
        const keys = Object.keys(formData);

        // Start writing at column B (column 2)
        keys.forEach((key, i) => {
            const colIndex = i + 2; // B = 2, C = 3, ...
            row.getCell(colIndex).value = formData[key];
        });

        row.commit();
        await workbook.xlsx.writeFile(uploadsPath);

        res.status(200).json({
            message: `Form saved to ${sheetName} at row ${insertAtRow}, starting at column B`,
        });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
