const { Sequelize } = require('sequelize');
const sequelizeString = require('./../config/sequelizeString');
const sequelize = new Sequelize(sequelizeString);
module.exports = { sequelize };