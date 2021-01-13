//Dependencies
// const Sequelize = require("sequelize");
// //Connection to DB
// const sequelize = require("../config/connection");

// const sequelize = require("../config/connection");

// Resolution model for DB
// const Resolution = sequelize.define("resolution", {
//   title: Sequelize.STRING,
//   //Add the remaining parameters
// });

// Resolution.sync();

module.exports = (sequelize, DataTypes) => {
  const Resolution = sequelize.define("resolution", {
    title: DataTypes.STRING,
  });
  return Resolution;
};
