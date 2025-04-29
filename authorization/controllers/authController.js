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
    console.log(req.body, 'req.body');
    const { login, password, firstName, lastName, phone, email, role } = req.body;
    
    const existing = await User.findOne({ where: { login } });

    if (existing) {
      return res.status(400).json({ message: `Пользователь с таким login: ${login} уже существует.` });
    }
    
    console.log(req.file, 'req.file');
    const avatarPath = req.file
      ? `/uploads/avatars/${req.file.filename}`
      : null;
    const hash_password = await bcrypt.hash(password, 10);
    const user = await User.create({
      login,
      password: hash_password,
      firstName,
      lastName,
      phone,
      email,
      role,
      photoURL: avatarPath,
    });

    res.status(201).json({
      message: 'Пользователь создан',
      user: {
        id: user.id,
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.photoURL,
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

exports.update = async (req, res) => {
  try {
    const { login, firstName, lastName, phone, email, role } = req.body;
    
    console.log(req.body, 'req.body');
    console.log(req.user, 'req.user');

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (login && login !== user.login) {
      const existingUser = await User.findOne({ where: { login } });
      if (existingUser) {
        return res.status(400).json({ message: 'Этот логин уже занят' });
      }
    }

    user.login = login || user.login;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.photoURL = photoURL || user.photoURL;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}