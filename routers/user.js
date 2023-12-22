const user = require("express").Router();
const UserController = require("../controllers/userController");
const upload = require("../multerSetup");
const express = require("express");

user.use("/assets", express.static("assets"));

const adminAuthorization = function (req, res, next) {
  if (req.session.user.role === "admin") {
    next();
  } else {
    const errorMessage = "Only admin can access this feature!";
    res.redirect(`/posts?errors=${errorMessage}`);
  }
};

user.get("/:UserId", UserController.showUserDetail);
user.get("/:UserId/posts/:PostId/like", UserController.addLike);
user.get("/:UserId/posts/:PostId/share", UserController.addShare);
user.get(
  "/:UserId/posts/:PostId/delete",
  adminAuthorization,
  UserController.deletePost,
);
user.get("/:UserId/edit", UserController.editForm);
user.post(
  "/:UserId/edit",
  upload.single("profilePicture"),
  UserController.handleEdit,
);
user.get("/:UserId/delete", adminAuthorization, UserController.deleteUser);

module.exports = user;
UserController;
