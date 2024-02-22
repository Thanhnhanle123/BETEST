require('dotenv').config(); // Load .env
const { Sequelize } = require('sequelize');

const dbConfigSqlite = {
    dialect: 'sqlite',
    storage: process.env.DB_NAME, // Specify the path to your SQLite database file
}

const sequelize = new Sequelize(dbConfigSqlite);

module.exports = sequelize;
