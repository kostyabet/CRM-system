const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenSecret = process.env.ACCESSTOKENSECRET;
const refreshTokenSecret = process.env.REFRESHTOKENSECRET;

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, login: user.login },
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
    console.log(req.file, 'req.file');
    const { login, password, firstName, lastName, phone, email, role } = req.body;
    
    const existing = await User.findOne({ where: { login } });

    if (existing) {
      return res.status(400).json({ message: `Пользователь с таким login: ${login} уже существует.` });
    }
    
    const avatarPath = req?.file
      ? req?.file?.path || null
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

    const userData = user.get({ plain: true });
    delete userData.password;

    res.status(200).json({
      message: 'Успешный вход',
      user: userData,
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

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateToken({
      id: decoded?.id,
      login: decoded?.login
    });

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
    user.role = role || user.role;
    user.photoURL = user.photoURL || null;
    await user.save();

    console.log(user);

    res.status(200).json({
      message: 'Данные успешно изменены!',
      user: user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      message: 'Список пользователей',
      users,
    });
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

exports.isExists = async (req, res) => {
  try {
    const { users } = req.body;

    if (!Array.isArray(users)) {
      return res.status(400).json({ message: 'Поле users должно быть массивом.' });
    }

    const exists = checkUsersExists(users);

    res.status(200).json({ exists });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}







exports.checkUsersExists = async (users) => {
  const userIds = users.map(id => Number(id)).filter(id => !isNaN(id));

  const foundUsers = await User.findAll({
    where: {
      id: userIds
    },
    attributes: ['id']
  });

  const exists = foundUsers.map(user => user.id);

  return { exists };
}