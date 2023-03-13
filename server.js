const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const { posts, users } = require("./models/data");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
app.use(cookieParser());
app.set("view engine", "hbs");
app.use(express.urlencoded());

app.use("/create", (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use(authRouter);
app.use(postRouter);
app.get("/", (req, res) => {
  console.log(req.cookies);
  res.render("index", {
    posts,
    buttonText: Boolean(req.cookies.token) ? "Log Out" : "Log In",
  });
});
app.listen(3000, () => console.log("Express server is started on 3000 port!"));
