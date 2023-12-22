const formatDate = require("../helpers/formatDate");
const numberFormat = require("../helpers/numberFormat");
let { User, Profile, TagPost, Post, Tag } = require("../models/index");
const { Op } = require("sequelize");

class PostController {
  static async showPosts(req, res) {
    try {
      const custom = req.query.custom;
      const option = {
        include: [
          { model: User, include: [Profile] },
          { model: Tag, through: "PostTag" },
        ],
      };

      if (custom === "newest" || !custom) {
        option.order = [["updatedAt", "DESC"]];
      }

      if (custom === "most likes") {
        option.order = [["like", "DESC"]];
      }

      if (custom === "zero likes") {
        option.where = { like: { [Op.eq]: 0 } };
      }

      const posts = await Post.findAll(option);

      const isUser = req.session.user;

      const successMessage = req.query.success;
      const errorMessage = req.query.errors;

      res.render("posts", {
        posts,
        successMessage,
        errorMessage,
        numberFormat,
        formatDate,
        isUser,
      });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async addLike(req, res) {
    try {
      const { PostId } = req.params;
      const post = await Post.findByPk(PostId);
      await post.increment("like", { by: 1 });

      res.redirect("/posts");
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async deletePost(req, res) {
    try {
      const { PostId } = req.params;
      await Post.destroy({ where: { id: PostId } });

      const successMessage = "Success delete post";
      res.redirect(`/posts?success=${successMessage}`);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async addShare(req, res) {
    try {
      const { PostId } = req.params;
      const post = await Post.findByPk(PostId);
      await post.increment("share", { by: 1 });

      res.redirect("/posts");
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async addForm(req, res) {
    try {
      const isUser = req.session.user;

      let { errors } = req.query;
      let splittedErrors = errors?.split(",");

      res.render("addPage", { isUser, errors: splittedErrors });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async handleAdd(req, res) {
    try {
      const { caption, tag } = req.body;
      const { user } = req.session;
      const path = req.file?.path;

      const tagArray = tag.split(",").map((tag) => tag.trim());
      console.log(tagArray);

      const post = await Post.create({
        caption: caption,
        image: path,
        UserId: user.id,
      });

      for (let tagName of tagArray) {
        let [tag, created] = await Tag.findOrCreate({
          where: { name: tagName },
        });
        await post.addTag(tag);
      }

      res.redirect("/posts");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let inputErrors = error.errors.map((el) => el.message);
        console.log(inputErrors);

        res.redirect(`/posts/addPost?errors=${inputErrors}`);
      } else {
        res.send(error);
        console.log(error);
      }
    }
  }
}

module.exports = PostController;
