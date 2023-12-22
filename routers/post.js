const post = require("express").Router();
const PostController = require("../controllers/postController");
const upload = require("../multerSetup");

const adminAuthorization = function (req, res, next) {
  if (req.session.user.role === "admin") {
    next();
  } else {
    const errorMessage = "Only admin can access this feature!";
    res.redirect(`/posts?errors=${errorMessage}`);
  }
};

post.get("/", PostController.showPosts);
post.get("/addPost", PostController.addForm);
post.post("/addPost", upload.single("image"), PostController.handleAdd);
post.get("/:PostId/like", PostController.addLike);
post.get("/:PostId/share", PostController.addShare);
post.get("/:PostId/delete", adminAuthorization, PostController.deletePost);

module.exports = post;
PostController;
