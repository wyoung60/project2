//Dependencies
const Sequelize = require("sequelize");

//Connection to mySQL
<<<<<<< HEAD
const sequelize = new Sequelize("database_name", "root", "password", {
=======
const sequelize = new Sequelize("resolution_db", "root", "", {
>>>>>>> 83ea06b9ea06ecdfc53ceb3efc5bcd2f156e6cfb
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
