const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/user');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const { log } = require('./kafka/logger');
require('./kafka/consumer');

// Initialize the express app and middleware
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: function(origin, callback) {
    // Разрешаем доступ для localhost и IP-адресов в диапазоне 192.168.*
    if (!origin || 
        /^http:\/\/localhost(:\d+)?$/.test(origin) || 
        /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/.test(origin)) {
      callback(null, true);  // Разрешаем запросы
    } else {
      callback(new Error('Not allowed by CORS'));  // Отказываем всем остальным
    }
  },
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
  log('INFO', `Server running on port ${PORT}`);
});