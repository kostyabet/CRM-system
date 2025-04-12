const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/auth', createProxyMiddleware({
  target: 'http://auth-service:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '',
  },
}));

app.listen(8080, () => {
  console.log('Gateway running on port 8080');
});
