const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const Task = sequelize.define('t_tasks', {
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Users: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
    defaultValue: []
  },
  Attachments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  StartAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  EndAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Priority: {
    type: DataTypes.STRING,
    allowNull: true
  },
  State: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = { Task };