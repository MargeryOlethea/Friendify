let { User, Profile, TagPost, Post, Tag } = require("../models/index");
const numberFormat = require("../helpers/numberFormat");
const formatDate = require("../helpers/formatDate");

class UserController {
  static async showUserDetail(req, res) {
    try {
      const isUser = req.session.user;
      const { UserId } = req.params;

      const user = await User.findByPk(UserId, {
        include: [
          { model: Profile },
          { model: Post, include: [{ model: Tag, through: TagPost }] },
        ],
      });

      const successMessage = req.query.success;
      const errorMessage = req.query.errors;

      res.render("user", {
        user,
        isUser,
        numberFormat,
        successMessage,
        errorMessage,
        formatDate,
      });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async addLike(req, res) {
    try {
      const { PostId, UserId } = req.params;
      const post = await Post.findByPk(PostId);
      await post.increment("like", { by: 1 });

      res.redirect(`/users/${UserId}`);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async deletePost(req, res) {
    try {
      const { UserId, PostId } = req.params;

      await Post.destroy({ where: { id: PostId } });
      const successMessage = "Success delete post";
      res.redirect(`/users/${UserId}?success=${successMessage}`);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async addShare(req, res) {
    try {
      const { PostId, UserId } = req.params;
      const post = await Post.findByPk(PostId);
      await post.increment("share", { by: 1 });
      res.redirect(`/users/${UserId}`);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { UserId } = req.params;
      const user = await User.findByPk(UserId);
      await User.destroy({ where: { id: UserId } });
      const successMessage = `Success deleted user`;
      res.redirect(`/posts?success=${successMessage}`);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async editForm(req, res) {
    try {
      const { UserId } = req.params;
      const sessionUser = req.session.user;
      const isUser = req.session.user;

      let { errors } = req.query;
      let splittedErrors = errors?.split(",");

      const user = await User.findByPk(UserId, { include: [Profile] });

      if (+UserId === sessionUser.id || sessionUser.role === "admin") {
        res.render("editForm", { user, isUser, errors: splittedErrors });
      } else {
        const errorMessage = `You are not authorised to edit this account`;
        res.redirect(`/users/${UserId}?errors=${errorMessage}`);
      }
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async handleEdit(req, res) {
    try {
      const { fullName, about, gender } = req.body;
      const path = req.file?.path;
      const { UserId } = req.params;

      await Profile.update(
        {
          fullName: fullName,
          about: about,
          gender: gender,
        },
        { where: { UserId: UserId } },
      );

      if (path) {
        await Profile.update(
          {
            profilePicture: path,
          },
          { where: { UserId: UserId } },
        );
      }
      let successMessage = `Successfully update profile!`;
      res.redirect(`/users/${UserId}?success=${successMessage}`);
    } catch (error) {
      const { UserId } = req.params;
      if (error.name === "SequelizeValidationError") {
        let inputErrors = error.errors.map((el) => el.message);
        console.log(inputErrors);

        res.redirect(`/users/${UserId}/edit?errors=${inputErrors}`);
      } else {
        res.send(error);
        console.log(error);
      }
    }
  }
}

module.exports = UserController;
