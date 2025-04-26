require('dotenv').config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env;

const sequelizeString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

console.log('Sequelize connection string:', sequelizeString);
module.exports = sequelizeString;