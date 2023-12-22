const post = require("./post");
const user = require("./user");
const FrontController = require("../controllers/frontController");
const upload = require("../multerSetup");

const router = require("express").Router();

router.get("/register", FrontController.registerForm);
router.post("/register", FrontController.handleRegister);
router.get("/login", FrontController.loginForm);
router.post("/login", FrontController.handleLogin);
router.get("/logout", FrontController.handleLogout);

router.get("/", FrontController.showHome);

router.use(function (req, res, next) {
  if (!req.session.user) {
    let errorMessage = `Please login first!`;
    res.redirect(`/login?errors=${errorMessage}`);
  } else {
    next();
  }
});

router.use("/users", user);
router.use("/posts", post);

// router.get("/addpost", FrontController.renderPost);
// router.post("/addpost", upload.single("photo"), FrontController.addPost);

module.exports = router;
