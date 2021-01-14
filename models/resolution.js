module.exports = (sequelize, DataTypes) => {
  const Resolution = sequelize.define("resolution", {
    title: DataTypes.STRING,
    mind: DataTypes.BOOLEAN,
    body: DataTypes.BOOLEAN,
    knowledge: DataTypes.BOOLEAN,
  });
  return Resolution;
};
