const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { log } = require('./kafka/logger');
const logRoutes = require('./routes/logRoutes');

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

// Import and use the auth routes
app.use('/log', logRoutes);

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, err => {
  if (err) {
    log('log_service', 'ERR', `Error starting server ${err}`);
    return;
  }
  log('log_service', 'INFO', `Server running on port ${PORT}`);
});