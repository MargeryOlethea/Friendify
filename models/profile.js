"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: "UserId" });
      // define association here
    }

    get age() {
      const today = new Date();
      let birthDate = new Date(this.birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      let month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    get formatDate() {
      const dateIso = this.birthday.toISOString();
      return dateIso.split("T")[0];
    }
  }
  Profile.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `name is required!`,
          },
          notEmpty: {
            msg: "Name can't be empty!",
          },
        },
      },
      about: {
        type: DataTypes.TEXT,
        defaultValue: `Your bio`,
      },
      profilePicture: {
        type: DataTypes.TEXT,
        defaultValue: "/assets/userImage.jpg",
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Birthday is required!`,
          },
          notEmpty: {
            msg: "Birthday can't be empty!",
          },
          isAtLeast13YearsOld(value) {
            const today = new Date();
            const umur = today.getFullYear() - new Date(value).getFullYear();

            if (umur < 13) {
              throw new Error("Age should be a minimum of 13 years!");
            }
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Gender is required!",
          },
          notEmpty: {
            msg: "Gender can't be empty!",
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    },
  );
  return Profile;
};
