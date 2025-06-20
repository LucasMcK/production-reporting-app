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
        });
        targetRow.commit();
    });

    const mergesToKeep = ['M5:R5', 'W5:X5', 'AF5:AF6', 'AH5:AM5', 'AN5:AS5'];
    mergesToKeep.forEach((range) => {
        targetSheet.mergeCells(range);
    });
}

function columnLetterToNumber(letter) {
    return letter
        .toUpperCase()
        .split('')
        .reduce(
            (r, c, i) =>
                r +
                (c.charCodeAt(0) - 64) * Math.pow(26, letter.length - i - 1),
            0
        );
}

exports.handleFormSubmission = async (req, res) => {
    try {
        const { workbookName, formData } = req.body;

        if (!workbookName || !formData) {
            return res
                .status(400)
                .json({ message: 'Missing workbookName or formData' });
        }

        const { quadrantLSD, section, township, range, meridian, dayOfMonth } =
            formData;

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
                return res.status(500).json({
                    error: '"Well Template" sheet is missing in the workbook',
                });
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

        const excludedKeys = new Set([
            'dayOfMonth',
            'year',
            'month',
            'location',
            'quadrantLSD',
            'section',
            'township',
            'range',
            'meridian',
            'oil',
            'water',
            'sand',
            'initialTankGauge',
        ]);

        const isFirstDay = parseInt(dayOfMonth, 10) === 1;

        const oilRow = worksheet.getRow(41);
        const waterRow = worksheet.getRow(42);
        const sandRow = worksheet.getRow(43);
        const gaugeRow1 = worksheet.getRow(40);
        const gaugeRow2 = worksheet.getRow(44);

        if (isFirstDay) {
            gaugeRow1.getCell(5).value = formData.initialTankGauge ?? 0;
            oilRow.getCell(5).value = formData.oil ?? 0;
            waterRow.getCell(5).value = formData.water ?? 0;
            sandRow.getCell(5).value = formData.sand ?? 0;
            gaugeRow2.getCell(5).value = formData.initialTankGauge ?? 0;
        } else {
            formData.initialTankGauge = gaugeRow1.getCell(5).value || 0;
            formData.oil = oilRow.getCell(5).value || 0;
            formData.water = waterRow.getCell(5).value || 0;
            formData.sand = sandRow.getCell(5).value || 0;
        }

        const row = worksheet.getRow(insertAtRow);
        const keys = Object.keys(formData).filter(
            (key) => !excludedKeys.has(key)
        );

        keys.forEach((key, i) => {
            const colIndex = i + 2;
            const val = formData[key];

            if (
                typeof val === 'number' ||
                key.toLowerCase().includes('rpm') ||
                key.toLowerCase().includes('psi')
            ) {
                row.getCell(colIndex).value = isNaN(val) ? 0 : val;
            } else {
                row.getCell(colIndex).value = val ?? '';
            }
        });

        row.commit();

        // Add SUM formulas to row 38
        const sumRow = worksheet.getRow(38);
        const sumColumns = [
            'B',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'O',
            'P',
            'Q',
            'R',
            'T',
            'U',
            'V',
        ];

        sumColumns.forEach((colLetter) => {
            const colNumber = columnLetterToNumber(colLetter);
            const formula = `SUM(${colLetter}7:${colLetter}37)`;
            sumRow.getCell(colNumber).value = { formula };
        });

        sumRow.commit();

        await workbook.xlsx.writeFile(uploadsPath);

        res.status(200).json({
            message: `Form saved to ${sheetName}: updated row ${insertAtRow}`,
        });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
