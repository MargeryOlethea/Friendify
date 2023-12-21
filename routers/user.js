const user = require("express").Router();
const UserController = require("../controllers/userController");
const upload = require("../multerSetup");

// user.get("/")
// user.get("/:UserId/edit")
// user.post("/:UserId/edit")
// user.get("/:UserId/delete")
// user.get("/:UserId/posts")
// user.get("/:UserId/posts/:PostId/like")
// user.get("/:UserId/posts/:PostId/share")
// user.get("/:UserId/posts/:PostId/delete")

module.exports = user;
UserController;
