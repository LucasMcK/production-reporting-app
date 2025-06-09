const express = require('express');
const path = require('path');
const app = express();
const uploadRoutes = require('./routes/uploadRoutes');

app.use(express.json());
app.use('/upload', uploadRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});