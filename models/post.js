"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "UserId" });
      // define association here
    }
  }
  Post.init(
    {
      caption: DataTypes.TEXT,
      image: DataTypes.TEXT,
      like: DataTypes.INTEGER,
      share: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    },
  );
  return Post;
};