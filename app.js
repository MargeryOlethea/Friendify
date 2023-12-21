const express = require("express");
const session = require("express-session");
const router = require("./routers");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
app.use(
  session({
    secret: "rahasia Margery sama Akbar, xixixi",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  }),
);

app.use(router);
app.listen(port, () => {
  console.log(`Friendify listening on port ${port}`);
});
