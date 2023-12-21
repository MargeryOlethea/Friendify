const post = require("./post");
const user = require("./user");
const FrontController = require("../controllers/frontController");
const upload = require("../multerSetup");

const router = require("express").Router();

router.use("/users", user);
router.use("/posts", post);

router.get("/", FrontController.showHome);
router.get("/register", FrontController.registerForm);
router.post("/register", FrontController.handleRegister);
router.get("/login", FrontController.loginForm);
router.post("/login", FrontController.handleLogin);
// router.post("/logout")

// router.get("/addpost", FrontController.renderPost);
// router.post("/addpost", upload.single("photo"), FrontController.addPost);

module.exports = router;
