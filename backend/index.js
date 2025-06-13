const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', uploadRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
