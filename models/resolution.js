module.exports = (sequelize, DataTypes) => {
  const Resolution = sequelize.define("Resolution", {
    title: DataTypes.STRING,
    mind: DataTypes.BOOLEAN,
    body: DataTypes.BOOLEAN,
    knowledge: DataTypes.BOOLEAN,
  });
  Resolution.associate = (models) => {
    Resolution.belongsTo(models.User);
    Resolution.hasMany(models.Goals);
  };
  return Resolution;
};
