module.exports = (sequelize, DataTypes) => {
  const Goals = sequelize.define("Goals", {
    goal: DataTypes.STRING,
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
  Goals.associate = (models) => {
    Goals.belongsTo(models.Resolution);
  };
  return Goals;
};
