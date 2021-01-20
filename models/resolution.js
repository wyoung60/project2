module.exports = (sequelize, DataTypes) => {
  //Defines resolution table, columns, and tables
  const Resolution = sequelize.define("Resolution", {
    title: DataTypes.STRING,
    mind: DataTypes.BOOLEAN,
    body: DataTypes.BOOLEAN,
    knowledge: DataTypes.BOOLEAN,
  });
  //Links the table to user and goals table
  Resolution.associate = (models) => {
    Resolution.belongsTo(models.User);
    Resolution.hasMany(models.Goals);
  };
  return Resolution;
};
