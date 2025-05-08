const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/sequelize');
const tasksRoutes = require('./routes/tasksRoutes');
const priorityRoutes = require('./routes/priorityRoutes');
const stateRoutes = require('./routes/stateRoutes');
const { initDefaultStates } = require('./models/state');
const { initDefaultPriorities } = require('./models/priority');

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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Sequelize
sequelize.sync({ alter: true }) // { force: true } если хочешь пересоздавать
  .then(async () => {
    await initDefaultStates();
    await initDefaultPriorities();
    console.log('Таблицы синхронизированы');
  })
  .catch(err => console.error('Ошибка синхронизации', err));

// Import and use the auth routes
app.use('/tasks', tasksRoutes);
app.use('/priority', priorityRoutes);
app.use('/state', stateRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, err => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log(`Server running on port ${PORT}`);
});