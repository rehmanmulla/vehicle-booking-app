const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'vehicle_rental',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'rey123',
});

module.exports = sequelize;