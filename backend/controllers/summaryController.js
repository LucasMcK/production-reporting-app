const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const uploadsDir = path.join(__dirname, '../uploads');

const COLUMN_MAP = {
    B: 'Hours On\n\n',
    C: 'Hours Down\n\n',
    D: 'Gross Prod\n(m3)\n',
    E: 'Oil Production\n(m3)\n',
    F: 'Oil Production\n(BBLS)\n',
    G: 'Sand Production\n(m3)\n',
    H: 'Water Production\n(m3)\n',
    I: 'Recycle\n(m3)\n\n',
    J: 'Oil Shipments\n(m3)\n',
    K: 'Water Shipments\n(m3)\n',
    L: 'Sand Shipments\n(m3)\n',
    M: 'Fluid Out\n(m3)\n\n',
    N: 'Fluid In\n(m3)\n\n',
    O: 'Foam\nLoss\n\n',
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

    // Round all totals to 1 decimal place
    for (const key in totals) {
        totals[key] = parseFloat(totals[key].toFixed(1));
    }

    return totals;
}

module.exports = {
    calculateSummaryTotal,
};
