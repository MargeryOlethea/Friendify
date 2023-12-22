'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profiles.init({
    fullName: DataTypes.STRING,
    about: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Profiles',
  });
  return Profiles;
};