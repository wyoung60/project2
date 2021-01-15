module.exports = (sequelize, DataTypes) => {
  const Goals = sequelize.define("Goals", {
    goal: DataTypes.STRING,
    
  });
  Goals.associate = (models, options) => {
    Goals.belongsTo(models.Resolution, options)
}
  return Goals;
};
