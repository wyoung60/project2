module.exports = (sequelize, DataTypes) => {
  const Goals = sequelize.define("Goals", {
    goal: DataTypes.STRING,
    resolutionID: DataTypes.INTEGER,
  });
  return Goals;
};
