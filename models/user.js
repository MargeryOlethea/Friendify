"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "UserId" });
      User.hasMany(models.Post, { foreignKey: "UserId" });
      // define association here
    }

    get usernameAt() {
      return `@${this.username}`;
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isUnique: async function (value) {
            const user = await User.findOne({ where: { username: value } });
            if (user) {
              throw new Error("Username is already taken!");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required!",
          },
          notEmpty: {
            msg: "Email can't be empty!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required!",
          },
          notEmpty: {
            msg: "Password can't be empty!",
          },
          len: {
            args: [8, 50],
            msg: "Your password must be at least 8 characters",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (User, options) => {
          let hashedPassword = bcrypt.hashSync(User.password, 10);
          User.password = hashedPassword;
          User.email = User.email.toLowerCase();
          User.username = User.username.toLowerCase();
        },
      },
    },
  );
  return User;
};
