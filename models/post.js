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
      Post.belongsToMany(models.Tag, { through: models.TagPost });
      // define association here
    }
  }
  Post.init(
    {
      caption: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Caption is required!",
          },
          notEmpty: {
            msg: "Caption can't be empty!",
          },
        },
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image is required!",
          },
          notEmpty: {
            msg: "Image can't be empty!",
          },
        },
      },
      like: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      share: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    },
  );
  return Post;
};
