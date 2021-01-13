module.exports = (sequelize, DataTypes) => {
  const Goals = sequelize.define("Goals", {
    goal: DataTypes.STRING,
    resolution: DataTypes.INTEGER,
  });
  return Goals;
};
