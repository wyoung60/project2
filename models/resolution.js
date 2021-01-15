module.exports = (sequelize, DataTypes) => {
  const Resolution = sequelize.define("Resolution", {
    title: DataTypes.STRING,
    mind: DataTypes.BOOLEAN,
    body: DataTypes.BOOLEAN,
    knowledge: DataTypes.BOOLEAN,
    
  });
  Resolution.associate = (models, options) => {
    Resolution.belongsTo(models.User, options)
    Resolution.hasMany(models.Goals)
}
  return Resolution;
};
