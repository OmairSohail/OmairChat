const express = require("express");
const router = express.Router();

// @desc   Homepage
// @route  /

router.get("/", (req, res) => {
  res.render("Login", {
    layout: "login",
  });
});

module.exports = router;