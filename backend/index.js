const express = require('express');
const cors = require('cors');
const path = require('path');

const uploadRoutes = require('./routes/uploadRoutes');
const filesRoutes = require('./routes/filesRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/upload', uploadRoutes);

app.use('/files', filesRoutes);

app.get('/', (req, res) => {
  res.send('Welcome! Use POST /upload to upload files and GET /files to view them.');
});

app.listen(5001, () => {
  console.log('Backend running on http://localhost:5001');
});
