const express = require("express");
const app = express();
const router = express.Router();
const crypto = require("crypto");
const { users } = require("../models/data");
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/submit-login", (req, res) => {
  const { userName, password } = req.body;
  if (users.find((u) => u.username === userName && u.password === password)) {
    const token = crypto.randomBytes(16).toString("hex");
    res.cookie("token", token, { maxAge: 90000 });
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
module.exports = router;
