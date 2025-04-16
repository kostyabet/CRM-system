require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api/auth', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '/api/auth' }, // сохраняем путь как есть
}));

app.listen(8080, () => {
  console.log('Gateway running on port 8080');
});
