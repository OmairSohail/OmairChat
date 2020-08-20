const express = require("express");
const router = express.Router();

// @desc   Error 404
// @route  /error/404

router.get("/404", async (req, res) => {
  res.render("error/404");
});

// @desc   Error 500
// @route  /error/500

router.get("/500", (req, res) => {
  res.render("error/500");
});

module.exports = router;
