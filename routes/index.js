var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
    description:
      "Render view with the given options and optional callback fn. When a callback function is given a response will not be made automatically, otherwise a response of 200 and text/html is given.",
  });
});

module.exports = router;
