const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @desc   Homepage
// @route  /

router.get("/", (req, res) => {
  res.render("index", {
    layout: "main",
  });
  // try {
  //   const user = await User.find({ user: req.user.id }).lean();

  //   console.log(user);
  // } catch (err) {
  //   console.error(err);
  //   res.redirect("/error/500", {
  //     err,
  //   });
  // }
});

router.get("/login", (req, res) => {
  res.render("Login", {
    layout: "login",
  });
});

module.exports = router;
