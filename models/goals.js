module.exports = (sequelize, DataTypes) => {
  //Calls/creates goals table in database
  const Goals = sequelize.define("Goals", {
    //Adds columns to table with string and boolean values
    goal: DataTypes.STRING,
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
  //Links the table to the resolution table
  Goals.associate = (models) => {
    Goals.belongsTo(models.Resolution);
  };
  return Goals;
};
