const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.prototype.validPassword = (password) => {
      return bcrypt.compareSync(password, this.password);
  };
  User.addHook("beforeCreate", (user) => {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  })
  return User;
};
