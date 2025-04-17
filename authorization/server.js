const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// Initialize the express app and middleware
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Import and use the auth routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});