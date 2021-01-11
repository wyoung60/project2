//Dependencies
const Sequelize = require("sequelize");
//Connection to DB
const sequelize = require("../config/connection");

//Resolution model for DB
const Resolution = sequelize.define("resolution", {
  title: Sequelize.STRING,
});

Resolution.sync();

module.exports = Resolution;
