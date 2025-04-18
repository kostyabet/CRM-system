const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/config');

exports.test = async (req, res) => {
  res.status(200).json({ message: 'This is test message' });
}

// Регистрация нового пользователя
exports.register = async (req, res) => {
  const { email, password } = req.body;

  // Проверка, существует ли уже пользователь
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await User.hashPassword(password);
  const user = new User(email, hashedPassword);
  await User.save(user);

  res.status(201).json({ message: 'User registered successfully' });
};

// Логин пользователя
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
  res.json({ token });
};
