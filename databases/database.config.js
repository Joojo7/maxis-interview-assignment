const { Sequelize } = require("sequelize");
const db = new Sequelize("sqlite::memory:");

module.exports = db;
