const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');
const filesRoutes = require('./routes/filesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', uploadRoutes);

app.use('/files', filesRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});