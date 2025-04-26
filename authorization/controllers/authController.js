const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenSecret = process.env.ACCESSTOKENSECRET;
const refreshTokenSecret = process.env.REFRESHTOKENSECRET;

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, login: user.login, role: user.role },
    accessTokenSecret,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, login: user.login },
    refreshTokenSecret,
    { expiresIn: '30m' }
  );

  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  try {
    const { login, password, firstName, lastName, phone, email, role } = req.body;
    
    const existing = await User.findOne({ where: { login } });

    if (existing) {
      return res.status(400).json({ message: `Пользователь с таким login: ${login} уже существует.` });
    }
    
    const hash_password = await bcrypt.hash(password, 10);
    const user = await User.create({
      login,
      password: hash_password,
      firstName,
      lastName,
      phone,
      email,
      role,
    });

    res.status(201).json({
      message: 'Пользователь создан',
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

exports.login = async (req, res) => {
  try {
    const { login, pass: password } = req.body;

    const user = await User.findOne({ where: { login } });
    if (!user) {
      return res.status(401).json({ message: `Пользователь с login: ${login} не найден.` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    const { accessToken, refreshToken } = generateToken(user);

    res.status(200).json({
      message: 'Успешный вход',
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

exports.refreshToken = async (req, res) => {
  const { token: refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh токен отсутствует' });
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);

    const { newAccessToken, newRefreshToken } = generateToken(decoded);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    return res.status(403).json({ message: 'Неверный или просроченный refresh токен' });
  }
}

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}