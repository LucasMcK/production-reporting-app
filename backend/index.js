const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');
const filesRoutes = require('./routes/filesRoutes');
const formRoutes = require('./routes/formRoutes');
const { calculateSummaryTotal } = require('./controllers/summaryController');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/summary-total', async (req, res) => {
    try {
        const result = await calculateSummaryTotal();
        res.json(result);
    } catch (err) {
        console.error('Summary calculation failed:', err);
        res.status(500).json({ error: 'Failed to calculate summary total' });
    }
});

app.use('/', uploadRoutes);
app.use('/', filesRoutes);
app.use('/', formRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
