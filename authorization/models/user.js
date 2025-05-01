const { Sequelize, DataTypes } = require('sequelize');
const sequelizeString = require('./../config/sequelizeString');
const sequelize = new Sequelize(sequelizeString);

const User = sequelize.define('t_users', {
  photoURL: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://example.com/default-photo.png', // Default photo URL
  },
  login: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = { User, sequelize };