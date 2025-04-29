const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/user');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

// Initialize the express app and middleware
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:3000'],
  credentials: true
}));

// Sequelize
sequelize.sync({ alter: true }) // { force: true } если хочешь пересоздавать
  .then(() => console.log('Таблицы синхронизированы'))
  .catch(err => console.error('Ошибка синхронизации', err));

// Import and use the auth routes
app.use('/auth', authRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  
  console.log(`Server running on port ${PORT}`);
});