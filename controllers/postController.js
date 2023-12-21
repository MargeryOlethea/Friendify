class PostController {
  static async showPosts(req, res) {
    try {
      res.render("posts");
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }
}

module.exports = PostController;
