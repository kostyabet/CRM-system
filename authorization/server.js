const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});