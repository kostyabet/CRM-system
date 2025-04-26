const dbConfig = require('./database.json'); // путь до твоего JSON

const {
  dbUser,
  dbPassword,
  dbHost,
  dbPort,
  dbName
} = dbConfig;

const sequelizeString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

console.log('Sequelize connection string:', sequelizeString);
module.exports = sequelizeString;