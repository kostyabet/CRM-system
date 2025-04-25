const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESSTOKENSECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Недействительный токен' });

    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };