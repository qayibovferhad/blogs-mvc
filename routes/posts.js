const express = require("express");
const app = express();
const router = express.Router();
const { posts } = require("../models/data");

router.post("/submit-post", (req, res) => {
  const { title, content, fullName, userName } = req.body;
  const newPost = {
    title,
    content,
    fullName,
    userName,
    date_created: new Date().toUTCString(),
  };
  posts.push(newPost);
  res.redirect("/");
});

router.get("/create", (req, res) => {
  res.render("create", {
    buttonText: Boolean(req.cookies.token) ? "Log Out" : "Log In",
  });
});
module.exports = router;
