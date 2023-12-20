const post = require("./post");
const user = require("./user");

const router = require("express").Router();

router.use("/users", user);
router.use("/posts", post);

module.exports = router;
