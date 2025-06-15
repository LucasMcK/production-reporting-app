const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');
const filesRoutes = require('./routes/filesRoutes');
const formRoutes = require('./routes/formRoutes');
const app = express();

app.use(cors());

app.use(express.json());

app.use('/', uploadRoutes);

app.use('/files', filesRoutes);

app.use(express.json());

app.use('/', formRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});