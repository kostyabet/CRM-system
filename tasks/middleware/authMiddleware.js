const jwt = require('jsonwebtoken');
const { debug, warn } = require('./../kafka/logger');

const accessTokenSecret = process.env.ACCESSTOKENSECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    warn('Токен отсутствует');
    return res.status(401).json({ message: 'Токен отсутствует' });
  }

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) {
      warn('Недействительный токен');
      return res.status(403).json({ message: 'Недействительный токен' });
    }

    debug('Токен действителен');
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };