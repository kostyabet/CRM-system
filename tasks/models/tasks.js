const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const Task = sequelize.define('t_tasks', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  users: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
    defaultValue: []
  },
  attachments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  startAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = { Task };