const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/auth', createProxyMiddleware({
  target: 'http://auth-service:5000', // имя сервиса в docker-compose
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '', // удаляет /auth из пути при проксировании
  },
}));

app.listen(8080, () => {
  console.log('Gateway running on port 8080');
});
