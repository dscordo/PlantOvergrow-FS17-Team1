var express = require("express");
var router = express.Router();
const { ensureUserLoggedIn } = require("../middleware/guards");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ message: "Welcome to Plant Overgrow! Try /users" });
});


module.exports = router;
