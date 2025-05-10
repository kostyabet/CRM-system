const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { info, error: errlog, warn } = require('./../kafka/logger');

const accessTokenSecret = process.env.ACCESSTOKENSECRET;
const refreshTokenSecret = process.env.REFRESHTOKENSECRET;

const generateToken = (user) => {
  try {
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
    
    info('Сгенерированы новые токены.');
    return { accessToken, refreshToken };
  }
  catch (error) {
    throw new Error('Ошибка генерации токена: ' + error.message);
  }
};

exports.register = async (req, res) => {
  try {
    const { login, password, firstName, lastName, phone, email, role } = req.body;

    if (!login || !password || !firstName || !lastName || !phone || !email) {
      warn('Пожалуйста, заполните все обязательные поля.');
      return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля.' });
    }
    
    const existing = await User.findOne({ where: { login } });

    if (existing) {
      warn(`Пользователь с таким login: ${login} уже существует.`);
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

    info('Пользователь успешно зарегистрирован!', { user: user.id });
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
    errlog(`Ошибка регистрации: ${error.message}`);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

exports.login = async (req, res) => {
  try {
    const { login, pass: password } = req.body;

    if (!login || !password) {
      warn('Пожалуйста, заполните все обязательные поля.');
      return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля.' });
    }

    const user = await User.findOne({ where: { login } });
    if (!user) {
      warn(`Пользователь с login: ${login} не найден.`);
      return res.status(401).json({ message: `Пользователь с login: ${login} не найден.` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      warn(`Неверный пароль для пользователя с login: ${login}`);
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    const { accessToken, refreshToken } = generateToken(user);

    const userData = user.get({ plain: true });
    if (!userData) {
      return new Error({ message: 'Ошибка получения данных' });
    }
    delete userData.password;

    info('Пользователь успешно вошёл в систему!', { user: userData.id });
    res.status(200).json({
      message: 'Успешный вход',
      user: userData,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Ошибка входа:', error);
    errlog(`Ошибка входа: ${error.message}`);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

exports.refreshToken = async (req, res) => {
  const { token: refreshToken } = req.body;

  if (!refreshToken) {
    warn('Refresh токен отсутствует');
    return res.status(401).json({ message: 'Refresh токен отсутствует' });
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateToken({
      id: decoded?.id,
      login: decoded?.login
    });

    info('Refresh токен успешно обновлён');
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error('Ошибка обновления токена:', error);
    errlog('Неверный или просроченный refresh токен');
    return res.status(403).json({ message: 'Неверный или просроченный refresh токен' });
  }
}

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      warn(`Пользователь с id: ${req.user.id} не найден.`, { user: req.user.id });
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    info('Пользователь успешно найден!', { user: user.id });
    res.json(user);
  } catch (err) {
    console.error('Ошибка получения пользователя:', err);
    errlog('Ошибка получения пользователя:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

exports.update = async (req, res) => {
  try {
    const { login, firstName, lastName, phone, email, role } = req.body;

    if (!login && !firstName && !lastName && !phone && !email && !role) {
      warn('Нет данных для обновления');
      return res.status(400).json({ message: 'Нет данных для обновления' });
    }

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      warn(`Пользователь с id: ${req.user.id} не найден.`, { user: req.user.id });
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (login && login !== user.login) {
      const existingUser = await User.findOne({ where: { login } });
      if (existingUser) {
        error(`Пользователь с таким логином: ${login} уже существует.`);
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

    info('Данные пользователя успешно обновлены!', { user: user.id });
    res.status(201).json({
      message: 'Данные успешно изменены!',
      user: user
    });
  } catch (err) {
    console.error('Ошибка обновления пользователя:', err);
    errlog('Ошибка обновления пользователя:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    if (!users || users.length === 0) {
      warn('Пользователи не найдены');
      return res.status(404).json({ message: 'Пользователи не найдены' });
    }

    info('Пользователи успешно получены!');
    res.status(200).json({
      message: 'Список пользователей',
      users,
    });
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    errlog(`Ошибка при получении пользователей. ${error}`);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    warn('ID пользователя не указан');
    return res.status(400).json({ message: 'ID пользователя не указан' });
  }

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      warn(`Пользователь с id: ${userId} не найден.`);
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    info('Пользователь успешно найден!', { user: user.id });
    res.status(200).json(user);
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    errlog(`Ошибка при получении пользователя. ${error}`);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

exports.isExists = async (req, res) => {
  try {
    const { users } = req.body;

    if (!Array.isArray(users)) {
      warn('Поле users должно быть массивом.');
      return res.status(400).json({ message: 'Поле users должно быть массивом.' });
    }

    const { exists } = await checkUsersExists(users);

    if (!exists) {
      warn('Ошибка при получении пользователей!');
      return res.status(404).json({ message: 'Ошибка при получении пользователей!' });
    }

    if (exists.length === 0) {
      warn('Пользователи не найдены');
      return res.status(200).json({ exists });
    }

    info('Пользователи успешно найдены!');
    res.status(200).json({ exists });
  } catch (err) {
    console.error('Ошибка при проверке пользователей:', err);
    errlog(`Ошибка при проверке пользователей. ${err}`);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

exports.checkUsersExists = async (users) => {
  const userIds = users.map(id => Number(id)).filter(id => !isNaN(id));

  if (!userIds) {
    warn('Пользователи не найдены');
    return { exists: [] };
  }

  if (userIds.length === 0) {
    warn('Массив userIds пустой!');
    return { exists: [] };
  }

  const foundUsers = await User.findAll({
    where: {
      id: userIds
    },
    attributes: ['id']
  });

  if (!foundUsers) {
    warn('Пользователи не найдены');
    return { exists: [] };
  }

  if (foundUsers.length === 0) {
    warn('Пользователи не найдены');
    return { exists: [] };
  }

  try {
    const exists = foundUsers.map(user => user.id);
    info('Пользователи успешно найдены!');
    return { exists };
  } catch (error) {
    console.error('Ошибка при проверке пользователей:', error);
    errlog(`Ошибка при проверке пользователей. ${error}`);
    return { exists: [] };
  }
}