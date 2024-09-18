const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST, // Hostname
    dialect: 'mysql', // Dialect (MySQL)
    dialectModule: mysql,
    dialectOptions: {
    },
  }
);


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
