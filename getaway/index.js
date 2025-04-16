const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/auth', async (req, res) => {
  try {
    console.log(req.message, req.originalUrl, req.body, req.headers);
    const response = await axios({
        method: req.method,
        url: 'http://localhost:5000' + req.originalUrl, // Используем req.path вместо req.originalUrl
        data: req.body,
        headers: {
            ...req.headers,
            host: 'localhost:5000'
        }
    });
    console.log(response);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error in proxy:', error.message); // Логирование ошибки
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
