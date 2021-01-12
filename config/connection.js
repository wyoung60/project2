//Dependencies
const Sequelize = require("sequelize");

//Connection to mySQL
const sequelize = new Sequelize("resolution_db", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

//Export connection
module.exports = sequelize;
