const express = require("express");
const router = express.Router();
const passport = require("passport");

// @desc   Google Auth
// @route  /auth/google

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc   Google Auth Callback
// @route  /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// @desc   Github Auth
// @route  /auth/github

router.get("/github", passport.authenticate("github"));

// @desc   Github Auth Callback
// @route  /auth/github/callback

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
