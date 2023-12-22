let { User, Profile, TagPost, Post, Tag } = require("../models/index");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

class FrontController {
  static async showHome(req, res) {
    try {
      let successMessage = req.query.success;

      res.render("home", { successMessage });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async registerForm(req, res) {
    try {
      let { errors } = req.query;
      let splittedErrors = errors?.split(",");
      res.render("register", { errors: splittedErrors });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async handleRegister(req, res) {
    try {
      const { email, username, fullName, birthday, gender, password } =
        req.body;

      const newUser = await User.create({
        username: username,
        email: email,
        password: password,
        role: "user",
      });

      await Profile.create({
        fullName: fullName,
        birthday: birthday,
        gender: gender,
        UserId: newUser.id,
      });
      const successMessage = "Registered successfully! Please login.";
      res.redirect(`/?success=${successMessage}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let inputErrors = error.errors.map((el) => el.message);
        console.log(inputErrors);

        res.redirect(`/register?errors=${inputErrors}`);
      } else {
        res.send(error);
        console.log(error);
      }
    }
  }

  static async loginForm(req, res) {
    try {
      const errors = req.query.errors;
      res.render("login", { errors });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async handleLogin(req, res) {
    try {
      let { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username: {
            [Op.iLike]: `${username}`,
          },
        },
      });

      if (user) {
        let isValidPassword = bcrypt.compareSync(password, user.password);
        if (isValidPassword) {
          req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role,
          };
          res.redirect("/posts");
        }
      } else {
        let errorMessage = `wrong username or password!`;
        res.redirect(`/login?errors=${errorMessage}`);
      }
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async handleLogout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.redirect("/");
        }
      });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }
}

module.exports = FrontController;
