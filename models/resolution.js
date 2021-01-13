module.exports = (sequelize, DataTypes) => {
  const Resolution = sequelize.define("resolution", {
    title: DataTypes.STRING,
  });
  return Resolution;
};
