const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/uploads', express.static('uploads')); // serve files publicly
app.use('/upload', uploadRoutes);

app.listen(5001, () => {
  console.log('Backend running on http://localhost:5001');
});