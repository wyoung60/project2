module.exports = (sequelize, DataTypes) => {
  const Goals = sequelize.define("Goals", {
    goal: DataTypes.STRING,
  });
  Goals.associate = (models) => {
    Goals.belongsTo(models.Resolution);
  };
  return Goals;
};
