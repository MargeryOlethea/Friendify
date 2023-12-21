const post = require("express").Router();
const PostController = require("../controllers/postController");

post.use(function (req, res, next) {
  if (!req.session.user) {
    let errorMessage = `Please login first!`;
    res.redirect(`/login?errors=${errorMessage}`);
  } else {
    next();
  }
});

post.get("/", PostController.showPosts);
// post.get("/addpost")
// post.post("/addpost")
// post.get("/:PostId/like")
// post.get("/:PostId/share")
// post.get("/:PostId/delete")

module.exports = post;
PostController;
