const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const uploadsDir = path.join(__dirname, '../uploads');

const COLUMN_MAP = {
    B: 'Hours On',
    C: 'Hours Down',
    D: 'Gross Prod m3',
    E: 'Oil Production m3',
    F: 'Oil Production BBLS',
    G: 'Sand Production m3',
    H: 'Water Production m3',
    I: 'Recycle m3',
    J: 'Oil Shipments m3',
    K: 'Water Shipments m3',
    L: 'Sand Shipments m3',
    M: 'Fluid Out m3',
    N: 'Fluid In m3',
    O: 'Foam Loss',
};
const ROW = 39;

async function calculateSummaryTotal() {
    const files = fs
        .readdirSync(uploadsDir)
        .filter((f) =>
            ['.xls', '.xlsx'].some((ext) => f.toLowerCase().endsWith(ext))
        );

    console.log('Excel files found:', files);

    const totals = {};
    Object.values(COLUMN_MAP).forEach((name) => {
        totals[name] = 0;
    });

    for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        const workbook = XLSX.readFile(filePath);

        console.log(`Processing file: ${file}`);
        console.log('Sheets:', workbook.SheetNames);

        if (!workbook.SheetNames.includes('Roll Up')) {
            console.log('No "Roll Up" sheet found, skipping file.');
            continue;
        }

        const sheet = workbook.Sheets['Roll Up'];

        for (const [col, name] of Object.entries(COLUMN_MAP)) {
            const cellRef = `${col}${ROW}`;
            const cell = sheet[cellRef];

            if (!cell) {
                console.log(`Cell ${cellRef} not found in ${file}`);
                continue;
            }

            let value = 0;
            if (typeof cell.v === 'string') {
                value = parseFloat(cell.v.replace(/,/g, ''));
            } else {
                value = parseFloat(cell.v);
            }

            console.log(`Read ${name} (${cellRef}) = ${value} in ${file}`);

            if (!isNaN(value)) {
                totals[name] += value;
            }
        }
    }

    return totals;
}

module.exports = {
    calculateSummaryTotal,
};
